/**
 * Shearwater Peregrine – behaviour from the Peregrine Operations Manual (RevB) and release notes.
 * See docs/research/shearwater.md.
 *
 * Bühlmann ZHL-16C + gradient factors (Low 45/95, Med 40/85, High 35/75), colour conventions
 * (white normal, yellow warning, flashing red critical), ascent chevrons (1 per 3 m/min), a safety
 * stop with hysteresis (armed past 11 m, starts shallower than 6 m, runs 2.4–8.3 m), deco stop
 * approach/at-stop/violation colouring, priority-ordered yellow banners, no lockouts, no no-fly.
 */
import { ComputerCore, type CorePolicy } from '../../sim/core';
import { depthUnit, fmtDepth, fmtMinSec, pad2, tempValue } from '../../sim/format';
import type { ButtonPress, ComputerSettings, Units } from '../../sim/types';

const POLICY: CorePolicy = {
  startDepthM: 1.6,
  endDepthM: 0.9,
  endDelayS: 60,
  ascentWindowS: 10,
  planningAscentRateMPerMin: 10,
  stopIncrementM: 3,
  tissueModel: 'zhl16c',
  safetyStop: { durationS: 180, deepM: 8.3, shallowM: 2.4, requiredMaxDepthM: 11, whenShallower: 'pause', whenDeeper: 'pause', resetDeeperThanM: 11, surfaceM: 0.9 },
  ceilingToleranceM: 0.1,
};

export const PEREGRINE_GF: Record<number, { low: number; high: number; label: string }> = {
  0: { low: 0.4, high: 0.85, label: 'Med 40/85' },
  1: { low: 0.45, high: 0.95, label: 'Low 45/95' },
  2: { low: 0.35, high: 0.75, label: 'High 35/75' },
};

export type Tone = 'normal' | 'warning' | 'critical' | 'good' | 'title';

export interface PeregrineDisplay {
  units: Units;
  depth: string;
  depthUnit: string;
  chevrons: number;
  chevronTone: Tone;
  timeTitle: string;
  timeValue: string;
  timeSeconds: string;
  surface: boolean;
  slot: { title: string; titleTone: Tone; value: string; valueTone: Tone; check: boolean; arrow: 'up' | 'down' | null; flash: boolean };
  ndl: { value: string; tone: Tone };
  n2Fraction: number;
  persistent: { text: string; tone: Tone } | null;
  gas: { text: string; tone: Tone };
  rowCentre: { title: string; value: string; tone?: Tone };
  rowRight: { title: string; value: string; tone?: Tone; second?: string };
  banner: { header: string; text: string } | null;
  menu: { items: string[]; index: number } | null;
  infoScreen: string | null;
  tissues: number[] | null;
}

type SsStatus = 'none' | 'armed' | 'counting' | 'paused' | 'complete';

const INFO_SCREENS = ['main', 'last-dive', 'mod', 'temp', 'gf', 'tissues', 'det', 'battery', 'pressure', 'clock'] as const;
type InfoScreen = (typeof INFO_SCREENS)[number];

export class ShearwaterPeregrine extends ComputerCore {
  readonly id = 'shearwater-peregrine';
  private ss: { status: SsStatus; remainingS: number } = { status: 'none', remainingS: 180 };
  private banners: Array<{ header: string; text: string }> = [];
  private bannerFired = new Set<string>();
  private info: InfoScreen = 'main';
  private infoShownAtS = 0;
  private menuIndex = -1;
  private menuShownAtS = 0;
  private highPO2S = 0;
  private lastDive: { number: number; maxDepthM: number; timeS: number } | null = null;
  private decoClearedAtS: number | null = null;

  constructor(settings: ComputerSettings) {
    super(POLICY, settings);
  }

  protected gradientFactors(): { low: number; high: number } {
    const gf = PEREGRINE_GF[this.settings.conservatism] ?? PEREGRINE_GF[0];
    return { low: gf.low, high: gf.high };
  }

  private banner(key: string, header: string, text: string): void {
    if (this.bannerFired.has(key)) return;
    this.bannerFired.add(key);
    this.banners.push({ header, text });
    this.emit(header === 'Warning' ? 'warning' : 'info', `${text} (yellow banner – press either button to dismiss)`);
  }

  protected brandTick(dtS: number): void {
    const diving = this.phase === 'dive';
    const duration = Math.max(60, this.settings.safetyStopMinutes * 60);

    // ---- ascent ----
    const over = this.trackAscent(10, dtS);
    if (over && this.ascentOverS >= 10) this.banner('fast', 'Warning', 'FAST ASCENT');
    if (!over) this.bannerFired.delete('fast');

    // ---- safety stop with hysteresis ----
    if (diving && this.settings.safetyStopMinutes > 0 && !this.deco.required) {
      const s = this.ss;
      const inRange = this.depthM >= 2.4 && this.depthM <= 8.3;
      if (s.status === 'none' && this.maxDepthM > 11) {
        s.status = 'armed';
        s.remainingS = duration;
      }
      if (this.decoClearedAtS !== null && (s.status === 'none' || s.status === 'armed')) {
        s.status = 'counting';
        s.remainingS = duration;
        this.decoClearedAtS = null;
      }
      if (s.status === 'armed' && this.depthM < 6) {
        s.status = 'counting';
        this.emit('info', 'Safety stop countdown started (shallower than 6 m)');
      } else if (s.status === 'counting') {
        if (inRange) {
          s.remainingS -= dtS;
          if (s.remainingS <= 0) {
            s.remainingS = 0;
            s.status = 'complete';
            this.emit('info', 'Safety stop complete – clear to surface');
          }
        } else {
          s.status = 'paused';
          this.emit('info', 'Safety stop paused (outside 2.4–8.3 m)');
        }
      } else if (s.status === 'paused' && inRange) s.status = 'counting';
      if ((s.status === 'counting' || s.status === 'paused' || s.status === 'complete') && this.depthM > 11) {
        s.status = 'armed';
        s.remainingS = duration;
        this.emit('info', 'Safety stop reset (deeper than 11 m again)');
      }
    }

    // ---- deco ----
    if (diving && this.deco.required) {
      if (this.ss.status === 'counting') this.ss.status = 'paused';
      if (this.violation.aboveCeilingS > 30) this.banner('missed', 'Warning', 'MISSED DECO STOP');
      if (this.violation.aboveCeilingS === 0) this.bannerFired.delete('missed');
    }

    // ---- NDL / PPO2 / CNS ----
    if (diving && !this.deco.required) {
      if (this.ndlMin <= 5) this.banner('lowndl', 'Alert', 'Low NDL Alert');
      else if (this.ndlMin > 8) this.bannerFired.delete('lowndl');
    }
    if (this.pO2 > this.settings.pO2Max + 0.04) {
      this.highPO2S += dtS;
      if (this.highPO2S > 30) this.banner('ppo2', 'Warning', 'HIGH PPO2');
    } else {
      this.highPO2S = 0;
      this.bannerFired.delete('ppo2');
    }
    if (this.cns > 90) this.banner('cns', 'Warning', 'HIGH CNS');

    // ---- timeouts ----
    if (this.info !== 'main' && this.info !== 'tissues' && this.t - this.infoShownAtS > 10) this.info = 'main';
    if (this.menuIndex >= 0 && this.t - this.menuShownAtS > 10) this.menuIndex = -1;
  }

  protected updateDeco(): void {
    const was = this.deco.required;
    super.updateDeco();
    if (was && !this.deco.required && this.phase === 'dive') this.decoClearedAtS = this.t;
  }

  protected onDiveStart(): void {
    this.ss = { status: 'none', remainingS: this.settings.safetyStopMinutes * 60 };
    this.banners = [];
    this.bannerFired.clear();
    this.decoClearedAtS = null;
  }

  protected onDiveEnd(): void {
    this.lastDive = { number: this.diveNumber, maxDepthM: this.maxDepthM, timeS: this.diveTimeS };
    this.ss = { status: 'none', remainingS: this.settings.safetyStopMinutes * 60 };
  }

  protected noFlySeconds(): number {
    return 0; // Shearwater deliberately shows no "time to fly"
  }

  press(button: string, _kind: ButtonPress): void {
    if (this.banners.length > 0) {
      this.banners.shift();
      return;
    }
    if (button === 'menu') {
      this.menuShownAtS = this.t;
      this.menuIndex = this.menuIndex < 0 ? 0 : (this.menuIndex + 1) % this.menuItems().length;
      return;
    }
    if (button === 'func') {
      if (this.menuIndex >= 0) {
        this.menuIndex = -1;
        return;
      }
      const i = INFO_SCREENS.indexOf(this.info);
      let next = INFO_SCREENS[(i + 1) % INFO_SCREENS.length];
      if (next === 'last-dive' && this.phase === 'dive') next = 'mod';
      this.info = next;
      this.infoShownAtS = this.t;
    }
  }

  private menuItems(): string[] {
    return this.phase === 'dive' ? ['Dive Setup', 'Select Gas'] : this.phase === 'surfaced' ? ['End Dive', 'Dive Setup', 'Dive Log', 'System Setup'] : ['Turn Off', 'Dive Setup', 'Dive Log', 'Start Bluetooth', 'System Setup'];
  }

  private clock(): string {
    const total = (10 * 3600 + Math.floor(this.t)) % 86400;
    const h = Math.floor(total / 3600);
    return `${h % 12 === 0 ? 12 : h % 12}:${pad2(Math.floor((total % 3600) / 60))}${h < 12 ? 'am' : 'pm'}`;
  }

  display(): PeregrineDisplay {
    const u = this.settings.units;
    const diving = this.phase === 'dive';
    const atSurface = !diving;
    const gf = this.gradientFactors();
    const rate = this.ascentRate;
    const chevrons = diving && rate > 0.5 ? Math.min(6, Math.max(1, Math.round(rate / 3))) : 0;
    const chevronTone: Tone = rate > 18 ? 'critical' : rate > 9 ? 'warning' : 'normal';

    // deco / safety stop slot
    let slot: PeregrineDisplay['slot'] = { title: 'SAFETY STOP', titleTone: 'title', value: '', valueTone: 'normal', check: false, arrow: null, flash: false };
    if (diving && this.deco.required) {
      const stop = this.deco.stopDepthM;
      const value = `${fmtDepth(stop, u, 0)}${depthUnit(u)} ${Math.ceil(this.deco.stopTimeMin)}min`;
      if (this.depthM < stop - 0.1) slot = { title: 'DECO STOP', titleTone: 'critical', value, valueTone: 'critical', check: false, arrow: 'down', flash: true };
      else if (this.depthM <= stop + 1.5) slot = { title: 'DECO STOP', titleTone: 'good', value, valueTone: 'normal', check: true, arrow: null, flash: false };
      else if (this.depthM <= stop + 5.1) slot = { title: 'DECO STOP', titleTone: 'warning', value, valueTone: 'normal', check: false, arrow: 'up', flash: false };
      else slot = { title: 'DECO STOP', titleTone: 'critical', value, valueTone: 'normal', check: false, arrow: null, flash: false };
    } else if (diving) {
      const s = this.ss;
      if (s.status === 'armed') slot = { ...slot, value: fmtMinSec(s.remainingS) };
      else if (s.status === 'counting') slot = { ...slot, titleTone: 'good', value: fmtMinSec(s.remainingS), check: true };
      else if (s.status === 'paused') slot = { ...slot, value: fmtMinSec(s.remainingS), valueTone: 'warning' };
      else if (s.status === 'complete') slot = { ...slot, titleTone: 'good', value: 'Complete', valueTone: 'good' };
    }

    const ndlVal = diving ? Math.min(99, Math.max(0, Math.floor(this.ndlMin))) : 0;
    const ndlTone: Tone = diving && this.deco.required ? 'critical' : diving && this.ndlMin <= 5 ? 'warning' : 'normal';
    const n2Fraction = Math.min(1, this.deco.surfGF / (gf.high * 100));

    let persistent: PeregrineDisplay['persistent'] = null;
    const mod = this.modM();
    if (this.depthM > mod + 0.05) persistent = { text: `MOD ${fmtDepth(mod, u, 0)}${depthUnit(u)} ↑`, tone: 'critical' };
    else if (this.depthM > mod - 1.9 && diving) persistent = { text: `MOD ${fmtDepth(mod, u, 0)}${depthUnit(u)}`, tone: 'warning' };
    if (this.cns > 100) persistent = { text: `High CNS ${Math.round(this.cns)}%`, tone: 'critical' };

    const gasText = this.settings.gas.fO2 > 0.215 ? `Nx${Math.round(this.settings.gas.fO2 * 100)}` : 'Air';
    const gasTone: Tone = this.depthM > mod ? 'critical' : 'normal';
    const temp = `${Math.round(tempValue(this.tempC, u))}°${u === 'metric' ? 'C' : 'F'}`;
    const maxText = `${fmtDepth(this.lastDive && atSurface ? this.lastDive.maxDepthM : this.maxDepthM, u)} ${depthUnit(u)}`;

    let rowCentre: PeregrineDisplay['rowCentre'] = { title: 'MAX', value: maxText };
    let rowRight: PeregrineDisplay['rowRight'] = { title: '', value: temp, second: this.clock() };
    let infoScreen: string | null = null;
    let tissues: number[] | null = null;
    switch (this.info) {
      case 'last-dive':
        infoScreen = 'LAST DIVE';
        rowCentre = { title: 'MAX', value: this.lastDive ? `${fmtDepth(this.lastDive.maxDepthM, u)} ${depthUnit(u)}` : '--' };
        rowRight = { title: '#', value: this.lastDive ? `${this.lastDive.number}` : '--', second: this.lastDive ? fmtMinSec(this.lastDive.timeS) : '' };
        break;
      case 'mod':
        infoScreen = 'MOD';
        rowCentre = { title: 'MOD', value: `${fmtDepth(mod, u, 0)} ${depthUnit(u)}` };
        rowRight = { title: 'PPO2', value: this.pO2.toFixed(2), tone: this.pO2 > this.settings.pO2Max ? 'critical' : 'normal' };
        break;
      case 'temp':
        infoScreen = 'TEMP';
        rowCentre = { title: 'CONSERV', value: PEREGRINE_GF[this.settings.conservatism]?.label ?? 'Med 40/85' };
        rowRight = { title: 'CNS', value: `${Math.round(this.cns)} %` };
        break;
      case 'gf':
        infoScreen = 'GF99';
        rowCentre = { title: 'GF99', value: `${Math.round(this.deco.gf99)} %`, tone: this.deco.gf99 > 100 ? 'critical' : this.deco.gf99 > gf.high * 100 ? 'warning' : 'normal' };
        rowRight = { title: 'SurfGF', value: `${Math.round(this.deco.surfGF)} %`, second: `CEIL ${fmtDepth(this.deco.required ? this.deco.ceilingM : 0, u, 0)}` };
        break;
      case 'tissues':
        infoScreen = 'TISSUES';
        tissues = this.snapshot().tissueLoading;
        break;
      case 'det':
        infoScreen = 'DET';
        rowCentre = { title: 'TTS', value: `${Math.ceil(this.deco.ttsMin + (this.ss.status === 'counting' || this.ss.status === 'armed' ? this.ss.remainingS / 60 : 0))}` };
        rowRight = { title: 'Δ+5', value: `${Math.ceil(this.ttsPlus5() - this.deco.ttsMin)}`, second: `@+5 ${Math.ceil(this.ttsPlus5())}` };
        break;
      case 'battery':
        infoScreen = 'BATTERY';
        rowCentre = { title: 'BATTERY', value: '3.9V' };
        rowRight = { title: 'LiIon', value: '4.12V' };
        break;
      case 'pressure':
        infoScreen = 'PRESSURE';
        rowCentre = { title: 'SURF', value: `${Math.round(this.env.surfaceBar * 1000)} mBar` };
        rowRight = { title: 'NOW', value: `${Math.round((this.env.surfaceBar + this.depthM * 0.1) * 1000)}` };
        break;
      case 'clock':
        infoScreen = 'DATE';
        rowCentre = { title: 'DATE', value: '09-Oct-26' };
        rowRight = { title: 'CLOCK', value: this.clock() };
        break;
      default:
        break;
    }

    const banner = this.banners[0] ?? null;
    const surfaceInterval = this.surfaceIntervalS();
    const siText = surfaceInterval >= 96 * 3600 ? `${Math.floor(surfaceInterval / 86400)}d` : `${Math.floor(surfaceInterval / 3600)}h${pad2(Math.floor((surfaceInterval % 3600) / 60))}m`;

    return {
      units: u,
      depth: fmtDepth(this.depthM, u),
      depthUnit: depthUnit(u),
      chevrons,
      chevronTone,
      timeTitle: atSurface ? 'SURFACE' : 'TIME',
      timeValue: atSurface ? (this.diveNumber > 0 ? siText : '0h00m') : `${Math.floor(this.diveTimeS / 60)}`,
      timeSeconds: atSurface ? '' : `:${pad2(this.diveTimeS % 60)}`,
      surface: atSurface,
      slot,
      ndl: { value: `${ndlVal}`, tone: ndlTone },
      n2Fraction,
      persistent,
      gas: { text: gasText, tone: gasTone },
      rowCentre,
      rowRight,
      banner,
      menu: this.menuIndex >= 0 ? { items: this.menuItems(), index: this.menuIndex } : null,
      infoScreen,
      tissues,
    };
  }

  private modM(): number {
    const maxBar = this.settings.pO2Max / this.settings.gas.fO2;
    return Math.max(0, (maxBar - this.env.surfaceBar) / 0.1);
  }

  private ttsPlus5(): number {
    // approximate: TTS grows with stay; use plan after 5 more minutes at depth
    return this.deco.ttsMin + (this.deco.required ? 2 : 0);
  }
}
