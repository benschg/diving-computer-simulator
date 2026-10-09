/**
 * Garmin Descent G1 – five-button dive watch with a monochrome memory-in-pixel display.
 * Bühlmann ZHL-16C with gradient factors (Low 45/95, Medium 40/85, High 35/75). Behaviour from the
 * Descent G1 / Mk2i owner's manuals (docs/research/garmin-scubapro.md – partial): dive starts at
 * 1.2 m, End Dive Delay from 1 m, tissue-load gauge (segments at 80 % and 100 %), ascent chevrons
 * (<7.9 good, 7.9–10.1 moderately high, >10.1 m/min too high), "Approaching NDL" alerts at 10 and
 * 5 min, safety-stop gauge after dives past 11 m, deco-stop gauge at 100 % tissue load, 24-hour
 * decompression lockout. Items marked UNVERIFIED in the notes are implemented as best guesses.
 */
import { ComputerCore, type CorePolicy } from '../../sim/core';
import { depthUnit, fmtDepth, fmtHoursMin, fmtMinSec, pad2, tempValue } from '../../sim/format';
import type { ButtonPress, ComputerSettings, Units } from '../../sim/types';

const POLICY: CorePolicy = {
  startDepthM: 1.2,
  endDepthM: 1.0,
  endDelayS: 60,
  ascentWindowS: 10,
  planningAscentRateMPerMin: 9,
  stopIncrementM: 3,
  tissueModel: 'zhl16c',
  safetyStop: { durationS: 180, deepM: 8, shallowM: 2.5, requiredMaxDepthM: 11, whenShallower: 'pause', whenDeeper: 'pause', resetDeeperThanM: 11, surfaceM: 1 },
  ceilingToleranceM: 0.1,
};

export const DESCENT_GF: Record<number, { low: number; high: number; label: string }> = {
  0: { low: 0.4, high: 0.85, label: 'Medium' },
  1: { low: 0.45, high: 0.95, label: 'Low' },
  2: { low: 0.35, high: 0.75, label: 'High' },
};

export type DescentScreen = 'primary' | 'secondary' | 'compass' | 'menu' | 'watch' | 'surface';

export interface DescentDisplay {
  units: Units;
  screen: DescentScreen;
  depth: string;
  depthUnit: string;
  ndl: string;
  gas: string;
  po2: string;
  temp: string;
  time: string;
  tissueSegments: 0 | 1 | 2 | 3;
  chevrons: 0 | 1 | 2 | 3;
  chevronsAlternate: boolean;
  gauge: { kind: 'none' | 'safety' | 'deco'; label: string; value: string; range: string; fraction: number; violated: boolean };
  alert: { title: string; body: string } | null;
  secondary: { hr: string; maxDepth: string; tts: string; surfGf: string };
  surface: { interval: string; noFly: string; tissue: string } | null;
  menu: { items: string[]; index: number } | null;
  clock: string;
  locked: boolean;
}

export class GarminDescentG1 extends ComputerCore {
  readonly id = 'garmin-descent-g1';
  private screen: DescentScreen = 'watch';
  private alert: { title: string; body: string; untilS: number } | null = null;
  private approaching10 = false;
  private approaching5 = false;
  private menuIndex = -1;
  private lastDive: { maxDepthM: number; timeS: number } | null = null;
  private ssStarted = false;

  constructor(settings: ComputerSettings) {
    super(POLICY, settings);
  }

  protected gradientFactors(): { low: number; high: number } {
    const gf = DESCENT_GF[this.settings.conservatism] ?? DESCENT_GF[0];
    return { low: gf.low, high: gf.high };
  }

  private showAlert(title: string, body: string, seconds = 8): void {
    this.alert = { title, body, untilS: this.t + seconds };
  }

  protected brandTick(dtS: number): void {
    const diving = this.phase === 'dive';
    if (diving && (this.screen === 'watch' || this.screen === 'surface')) this.screen = 'primary';
    if (this.alert && this.t > this.alert.untilS) this.alert = null;

    const over = this.trackAscent(10.1, dtS);
    if (over) {
      if (!this.has('ascent')) this.showAlert('Ascent Rate', 'Too high – slow down', 6);
      this.raise('ascent', 'warning', 'Ascent rate too high (more than 10.1 m/min): three chevrons alternate with the outline, vibration and tone');
    } else this.clear('ascent');

    if (diving && !this.deco.required) {
      if (this.ndlMin <= 10 && !this.approaching10) {
        this.approaching10 = true;
        this.showAlert('Approaching NDL', '10 minutes of no-decompression time remaining');
        this.emit('warning', 'Alert: Approaching NDL (10 min)');
      }
      if (this.ndlMin <= 5 && !this.approaching5) {
        this.approaching5 = true;
        this.showAlert('Approaching NDL', '5 minutes of no-decompression time remaining');
        this.emit('warning', 'Alert: Approaching NDL (5 min)');
      }
      if (this.ndlMin > 12) this.approaching10 = false;
      if (this.ndlMin > 7) this.approaching5 = false;
    }

    const prev = this.safety.state.status;
    const ss = this.safety.update(this.depthM, this.maxDepthM, dtS, this.deco.required);
    if (ss.status === 'counting' && prev !== 'counting' && prev !== 'paused') {
      if (!this.ssStarted) this.showAlert('Safety Stop', 'Stay between 2.5 m and 8 m');
      this.ssStarted = true;
      this.emit('info', 'Safety stop gauge: 3-minute countdown (dives deeper than 11 m; counts while you stay in the stop range)');
    }
    if (ss.status === 'done' && prev === 'counting') {
      this.showAlert('Safety Stop', 'Complete');
      this.emit('info', 'Safety stop complete');
    }

    if (diving && this.deco.required) {
      if (!this.has('deco')) {
        this.showAlert('Decompression', `Stop at ${this.deco.stopDepthM} m`);
        this.raise('deco', 'critical', 'Tissue load 100 % – decompression stop gauge shown (stop depth, stop time, TTS)');
      }
      if (this.depthM < this.deco.stopDepthM - 0.1) {
        if (!this.has('ceiling')) this.showAlert('Deco Stop Violated', 'Descend below the stop depth');
        this.raise('ceiling', 'critical', 'Decompression stop violated – descend. More than 3 minutes above the stop locks the dive modes for 24 h.');
      } else this.clear('ceiling');
      if (this.violation.aboveStopS > 180 && !this.has('lockout')) {
        this.raise('lockout', 'critical', 'Decompression lockout: only gauge and apnea modes for 24 hours after surfacing');
      }
    } else {
      this.clear('deco');
      this.clear('ceiling');
    }
  }

  protected onDiveStart(): void {
    this.approaching10 = false;
    this.approaching5 = false;
    this.ssStarted = false;
    this.screen = 'primary';
    this.menuIndex = -1;
  }

  protected onDiveEnd(): void {
    this.lastDive = { maxDepthM: this.maxDepthM, timeS: this.diveTimeS };
    this.screen = 'surface';
    if (this.has('lockout') || this.deco.required) this.lock(24, 'Decompression lockout');
    this.showAlert('Dive saved', `${fmtDepth(this.maxDepthM, this.settings.units)} ${depthUnit(this.settings.units)} · ${Math.round(this.diveTimeS / 60)} min`, 10);
  }

  protected noFlySeconds(): number {
    // Garmin's rule is not public; DAN guidance is used (12 h single no-stop dive, 18 h repetitive, 24 h deco)
    const hours = this.decoDives > 0 ? 24 : this.diveNumber > 1 ? 18 : 12;
    return Math.max(hours * 3600 - this.surfaceIntervalS(), this.desatS);
  }

  private menuItems(): string[] {
    return this.phase === 'dive' ? ['Gas Switch', 'Stop Dive', 'Messages'] : ['Single-Gas', 'Multi-Gas', 'Gauge', 'Apnea', 'Dive Setup'];
  }

  press(button: string, kind: ButtonPress): void {
    const diving = this.phase === 'dive';
    if (this.alert && (button === 'back' || button === 'start')) {
      this.alert = null;
      return;
    }
    switch (button) {
      case 'down':
        if (this.menuIndex >= 0) this.menuIndex = (this.menuIndex + 1) % this.menuItems().length;
        else if (diving || this.screen !== 'watch') {
          const order: DescentScreen[] = ['primary', 'secondary', 'compass'];
          this.screen = order[(order.indexOf(this.screen) + 1) % order.length];
        }
        break;
      case 'up':
        if (this.menuIndex >= 0) this.menuIndex = (this.menuIndex + this.menuItems().length - 1) % this.menuItems().length;
        else if (!diving && kind === 'long') this.menuIndex = 0;
        break;
      case 'start':
        if (this.menuIndex >= 0) {
          const item = this.menuItems()[this.menuIndex];
          this.menuIndex = -1;
          if (item === 'Stop Dive') this.emit('info', 'Stop Dive selected – the dive is saved when you reach the surface');
          else if (!diving) this.screen = 'primary';
        } else if (diving) this.menuIndex = 0;
        else this.screen = this.screen === 'watch' ? 'primary' : 'watch';
        break;
      case 'back':
        if (this.menuIndex >= 0) this.menuIndex = -1;
        else if (kind === 'long' || diving) this.screen = diving ? 'primary' : 'watch';
        else this.screen = 'watch';
        break;
      case 'light':
      default:
        break;
    }
  }

  private clock(): string {
    const total = (10 * 3600 + Math.floor(this.t)) % 86400;
    return `${Math.floor(total / 3600)}:${pad2(Math.floor((total % 3600) / 60))}`;
  }

  display(): DescentDisplay {
    const u = this.settings.units;
    const diving = this.phase === 'dive';
    const gf = this.gradientFactors();
    const load = this.deco.surfGF / (gf.high * 100);
    const tissueSegments: 0 | 1 | 2 | 3 = load >= 1 ? 3 : load >= 0.8 ? 2 : load > 0.02 ? 1 : 0;
    const rate = this.ascentRate;
    const chevrons: 0 | 1 | 2 | 3 = !diving || rate <= 0.5 ? 0 : rate < 7.9 ? 1 : rate <= 10.1 ? 2 : 3;
    const nitrox = this.settings.gas.fO2 > 0.215;
    const ss = this.safety.state;

    let gauge: DescentDisplay['gauge'] = { kind: 'none', label: '', value: '', range: '', fraction: 0, violated: false };
    if (diving && this.deco.required) {
      gauge = {
        kind: 'deco',
        label: 'DECO STOP',
        value: `${fmtDepth(this.deco.stopDepthM, u, 0)} ${depthUnit(u)} · ${Math.ceil(this.deco.stopTimeMin)} min`,
        range: `TTS ${Math.ceil(this.deco.ttsMin)} min`,
        fraction: Math.min(1, Math.max(0, 1 - (this.depthM - this.deco.stopDepthM) / 10)),
        violated: this.depthM < this.deco.stopDepthM - 0.1,
      };
    } else if (diving && (ss.status === 'counting' || ss.status === 'paused' || ss.status === 'done') && this.ssStarted) {
      gauge = {
        kind: 'safety',
        label: ss.status === 'done' ? 'SAFETY STOP COMPLETE' : ss.status === 'paused' ? 'SAFETY STOP PAUSED' : 'SAFETY STOP',
        value: fmtMinSec(ss.remainingS),
        range: `${fmtDepth(2.5, u, 0)}–${fmtDepth(8, u, 0)} ${depthUnit(u)}`,
        fraction: 1 - ss.remainingS / Math.max(1, ss.durationS),
        violated: ss.status === 'paused',
      };
    }

    return {
      units: u,
      screen: this.menuIndex >= 0 ? 'menu' : this.screen,
      depth: fmtDepth(this.depthM, u, 0),
      depthUnit: depthUnit(u),
      ndl: this.isLocked() ? '--' : diving && this.deco.required ? '0' : `${Math.min(99, Math.floor(diving ? this.ndlMin : this.ndlAtDepth(0)))}${!diving || this.ndlMin > 99 ? '+' : ''}`,
      gas: nitrox ? `Nx${Math.round(this.settings.gas.fO2 * 100)}` : 'Air',
      po2: this.pO2.toFixed(2),
      temp: `${tempValue(this.tempC, u).toFixed(1)}°`,
      time: fmtMinSec(this.diveTimeS),
      tissueSegments,
      chevrons,
      chevronsAlternate: chevrons === 3,
      gauge,
      alert: this.alert ? { title: this.alert.title, body: this.alert.body } : null,
      secondary: { hr: `${88 + Math.round(this.depthM / 2)}`, maxDepth: fmtDepth(this.maxDepthM, u, 0), tts: `${Math.ceil(this.deco.ttsMin)}`, surfGf: `${Math.round(this.deco.surfGF)}%` },
      surface: !diving && this.diveNumber > 0 ? { interval: fmtHoursMin(this.surfaceIntervalS()), noFly: fmtHoursMin(this.noFlyS), tissue: `${Math.round(load * 100)}%` } : null,
      menu: this.menuIndex >= 0 ? { items: this.menuItems(), index: this.menuIndex } : null,
      clock: this.clock(),
      locked: this.isLocked(),
    };
  }

  get lastDiveInfo() {
    return this.lastDive;
  }
}
