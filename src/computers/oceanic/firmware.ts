/**
 * Oceanic Veo 4.0 (Pelagic) – the two-button sibling of the Aqua Lung i300C with the "Dual
 * Algorithm" option (DSAT or Z+). Behaviour from the Veo 4.0 / Geo 4.0 / i300C manuals, see
 * docs/research/oceanic-aqualung.md.
 *
 * 9 m/min ascent limit (5-segment ASC bar, SLO), 5-segment N2 bar, DTR countdown, deco with UP /
 * STOP / DOWN prompts, Conditional Violation → Delayed Violation 1 (>5 min above the stop) →
 * Violation Gauge Mode (24 h), DV2 (stop 18–21 m), VGM when a stop deeper than 21 m is required,
 * safety stop 3 min at 5 m after dives past 9 m, optional deep stop (2 min at half max depth past
 * 24 m), FLY (23:50 countdown) and SAT screens, Conservative Factor.
 */
import { PELAGIC_DSAT, PELAGIC_DSAT_CF, PELAGIC_ZPLUS, PELAGIC_ZPLUS_CF, type DsatOptions, dsatLoadingFraction, dsatSaturated } from '../../engine';
import { ComputerCore, type CorePolicy } from '../../sim/core';
import { depthUnit, fmtDepth, fmtHoursMin, fmtMinSec, pad2, tempValue } from '../../sim/format';
import type { ButtonPress, ComputerSettings, Units } from '../../sim/types';

export const VEO_PLAN_DEPTHS = [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57];
const SAFETY_STOP_DEPTH = 5;

export type VeoScreen = 'main' | 'alt1' | 'alt2' | 'alt3' | 'flysat' | 'plan' | 'log';
export type VeoArrow = 'up' | 'down' | 'stop' | null;

export interface VeoDisplay {
  units: Units;
  screen: VeoScreen;
  top: string;
  topUnit: string;
  topFlash: boolean;
  stopDepth: string;
  stopLit: boolean;
  arrow: VeoArrow;
  arrowFlash: boolean;
  centre: string;
  centreLabel: 'NO DECO' | 'DECO' | 'SURF' | 'O2 SAT' | '';
  centreFlash: boolean;
  noBox: boolean;
  decoBox: boolean;
  bottomLeft: string;
  bottomLeftLabel: string;
  bottomLeftFlash: boolean;
  bottomRight: string;
  bottomRightLabel: string;
  ascSegments: number;
  ascFlash: boolean;
  slowCaption: boolean;
  n2Segments: number;
  n2Flash: boolean;
  decoCaption: boolean;
  alarm: boolean;
  algorithm: 'DSAT' | 'Z+';
  cf: boolean;
  vio: boolean;
}

type Violation = 'none' | 'cv' | 'dv1' | 'dv2' | 'vgm';

export class OceanicVeo4 extends ComputerCore {
  readonly id = 'oceanic-veo-4';
  private screen: VeoScreen = 'main';
  private planIndex = 3;
  private alarmActive = false;
  private alarmSinceS = 0;
  private viol: Violation = 'none';
  private cvS = 0;
  private dv1Flag = false;
  private vgmFlag = false;
  private ss: { status: 'none' | 'counting' | 'hidden' | 'done' | 'cancelled'; remainingS: number; outS: number; shallowS: number } = { status: 'none', remainingS: 180, outS: 0, shallowS: 0 };
  private deep: { status: 'none' | 'preview' | 'counting' | 'done' | 'disabled'; depthM: number; remainingS: number; outS: number } = { status: 'none', depthM: 0, remainingS: 120, outS: 0 };
  private lastDive: { number: number; maxDepthM: number; timeS: number } | null = null;
  private readonly dsatOpts: DsatOptions;

  constructor(settings: ComputerSettings) {
    const dsatOpts: DsatOptions = { mScale: PELAGIC_DSAT };
    const policy: CorePolicy = {
      startDepthM: 1.5,
      endDepthM: 1.0,
      endDelayS: 600,
      ascentWindowS: 10,
      planningAscentRateMPerMin: 9,
      stopIncrementM: 3,
      tissueModel: 'dsat',
      dsatOptions: dsatOpts,
      safetyStop: { durationS: 180, deepM: 6.5, shallowM: 0.9, requiredMaxDepthM: 9, whenShallower: 'pause', whenDeeper: 'pause', resetDeeperThanM: 9, surfaceM: 0.9 },
      ceilingToleranceM: 0.1,
    };
    super(policy, settings);
    this.dsatOpts = dsatOpts;
    this.applyAlgorithm();
  }

  private get useZPlus(): boolean {
    return this.settings.conservatism === 1 || this.settings.conservatism === 3;
  }

  private get cfOn(): boolean {
    return this.settings.conservatism >= 2;
  }

  private applyAlgorithm(): void {
    this.dsatOpts.mScale = this.cfOn ? PELAGIC_DSAT_CF : PELAGIC_DSAT;
    if (this.useZPlus) this.dsat = null;
    else if (!this.dsat) this.dsat = dsatSaturated(this.env.surfaceBar, this.dsatOpts);
  }

  updateSettings(patch: Partial<ComputerSettings>): void {
    super.updateSettings(patch);
    if (patch.conservatism !== undefined) this.applyAlgorithm();
  }

  protected gradientFactors(): { low: number; high: number } {
    return { low: 1, high: 1 };
  }

  protected mScale(): readonly number[] | undefined {
    if (!this.useZPlus) return undefined;
    return this.cfOn ? PELAGIC_ZPLUS_CF : PELAGIC_ZPLUS;
  }

  private alarm(id: string, severity: 'warning' | 'critical', text: string): void {
    if (!this.has(id)) {
      this.alarmActive = true;
      this.alarmSinceS = this.t;
    }
    this.raise(id, severity, text);
  }

  protected brandTick(dtS: number): void {
    const diving = this.phase === 'dive';
    if (diving && this.screen !== 'main' && this.screen !== 'alt2' && this.screen !== 'alt3') this.screen = 'main';
    if (this.alarmActive && this.t - this.alarmSinceS > 10) this.alarmActive = false;

    // ---- ascent: 9 m/min at all depths; audible after 8 s ----
    const over = this.trackAscent(9, dtS);
    if (over && this.ascentOverS >= 8) this.alarm('asc', 'warning', 'ASC alarm – ascent faster than 9 m/min (SLO flashes, all ASC segments flash)');
    if (!over) this.clear('asc');

    // ---- deco + violations ----
    if (diving && this.deco.required && this.viol !== 'vgm') {
      const stop = this.deco.stopDepthM;
      if (stop > 21) {
        this.viol = 'vgm';
        this.vgmFlag = true;
        this.alarm('vgm', 'critical', 'Violation Gauge Mode – a stop deeper than 21 m is required. The computer is now only a depth gauge/timer for this dive and 24 h after surfacing.');
      } else {
        if (stop >= 18 && this.viol !== 'dv2' && this.viol !== 'dv1') {
          this.viol = 'dv2';
          this.alarm('dv2', 'critical', 'Delayed Violation 2 – required stop between 18 and 21 m');
        }
        if (this.depthM < stop - 0.1) {
          this.cvS += dtS;
          if (this.cvS > 300 && !this.dv1Flag) {
            this.dv1Flag = true;
            this.viol = 'dv1';
            this.alarm('dv1', 'critical', 'Delayed Violation 1 – more than 5 minutes above the required stop. Violation Gauge Mode will start 5 minutes after surfacing.');
          } else if (this.viol === 'none') {
            this.viol = 'cv';
            this.alarm('cv', 'critical', 'Conditional Violation – above the required stop: DOWN. No off-gassing credit; 1.5 min penalty per minute above the stop.');
          }
        } else {
          if (this.viol === 'cv') {
            this.viol = 'none';
            this.clear('cv');
            this.emit('info', 'Back below the stop depth – Conditional Violation ended');
          }
          this.cvS = 0;
        }
      }
    } else if (!this.deco.required && diving) {
      if (this.viol === 'cv' || this.viol === 'dv2') this.viol = 'none';
      this.clear('cv');
      this.cvS = 0;
    }
    if (diving && this.deco.required && !this.has('deco') && this.viol !== 'vgm') this.alarm('deco', 'critical', 'Decompression entry – UP arrow and full N2 bar flash; stop depth, stop time and TTS shown');
    if (!this.deco.required) this.clear('deco');

    // ---- safety stop: 3 min at 5 m, triggered within 1.5 m deeper after a dive past 9 m ----
    if (diving && this.settings.safetyStopMinutes > 0) {
      const s = this.ss;
      const duration = this.settings.safetyStopMinutes * 60;
      if (this.deco.required) {
        if (s.status === 'counting') s.status = 'hidden';
      } else if ((s.status === 'none' || s.status === 'hidden') && this.maxDepthM > 9 && this.depthM <= SAFETY_STOP_DEPTH + 1.5 && this.depthM >= 0.9) {
        if (s.status === 'none') {
          s.remainingS = duration;
          this.emit('info', `Safety stop: ${this.settings.safetyStopMinutes} min at ${SAFETY_STOP_DEPTH} m (beep)`);
        }
        s.status = 'counting';
        s.outS = 0;
      } else if (s.status === 'counting') {
        s.remainingS -= dtS;
        if (this.depthM > SAFETY_STOP_DEPTH + 3) s.outS += dtS;
        else s.outS = 0;
        if (this.depthM < 0.9) s.shallowS += dtS;
        else s.shallowS = 0;
        if (s.remainingS <= 0) {
          s.status = 'done';
          this.emit('info', 'Safety stop countdown reached 0:00');
        } else if (s.outS >= 10) s.status = 'hidden';
        else if (s.shallowS >= 10) {
          s.status = 'cancelled';
          this.emit('info', 'Safety stop cancelled (surfaced) – no penalty');
        }
      }
      if ((s.status === 'done' || s.status === 'cancelled') && this.depthM > 9) s.status = 'none';
    }

    // ---- deep stop ----
    if (diving && this.settings.deepStops) {
      const d = this.deep;
      if (this.deco.required || this.maxDepthM > 57 || this.cns >= 80) d.status = d.status === 'none' ? 'none' : 'disabled';
      else if (d.status === 'none' && this.maxDepthM > 24) {
        d.status = 'preview';
        d.depthM = Math.round(this.maxDepthM / 2);
      } else if (d.status === 'preview') {
        d.depthM = Math.round(this.maxDepthM / 2);
        if (this.depthM <= d.depthM + 3) {
          d.status = 'counting';
          d.remainingS = 120;
          this.emit('info', `Deep stop at ${d.depthM} m – 2:00 countdown`);
        }
      } else if (d.status === 'counting') {
        d.remainingS -= dtS;
        if (this.depthM > d.depthM + 3 || this.depthM < d.depthM - 3) d.outS += dtS;
        else d.outS = 0;
        if (d.remainingS <= 0) d.status = 'done';
        else if (d.outS >= 10) {
          d.status = 'disabled';
          this.emit('info', 'Deep stop skipped – disabled for the rest of the dive (no penalty)');
        }
      }
    }
  }

  protected onDiveStart(): void {
    this.ss = { status: 'none', remainingS: 180, outS: 0, shallowS: 0 };
    this.deep = { status: 'none', depthM: 0, remainingS: 120, outS: 0 };
    this.viol = this.isLocked() ? 'vgm' : 'none';
    this.cvS = 0;
    this.dv1Flag = false;
    this.vgmFlag = this.isLocked();
    this.screen = 'main';
  }

  protected onSurfaced(): void {
    if (this.deco.required && !this.dv1Flag) {
      this.dv1Flag = true;
      this.viol = 'dv1';
      this.alarm('dv1', 'critical', 'Surfaced with a missed deco stop – DV1: VIO flashes; Violation Gauge Mode in 5 minutes');
    }
  }

  protected onDiveEnd(): void {
    this.lastDive = { number: this.diveNumber, maxDepthM: this.maxDepthM, timeS: this.diveTimeS };
    if (this.vgmFlag || this.dv1Flag) {
      this.lock(24, 'VIO – Violation Gauge Mode');
    }
    this.screen = 'main';
  }

  protected noFlySeconds(): number {
    // FLY countdown: 23:50 starting 10 min after surfacing (i.e. 24 h from surfacing)
    return 24 * 3600 - this.surfaceIntervalS();
  }

  press(button: string, _kind: ButtonPress): void {
    const diving = this.phase === 'dive';
    if (button === 'sel') {
      if (this.alarmActive) {
        this.alarmActive = false;
        this.emit('info', 'Audible alarm acknowledged (SEL)');
        return;
      }
      if (this.screen === 'plan' || this.screen === 'log' || this.screen === 'flysat') this.screen = 'main';
      return;
    }
    if (button === 'adv') {
      if (diving) {
        const order: VeoScreen[] = this.settings.gas.fO2 > 0.215 ? ['main', 'alt2', 'alt3'] : ['main', 'alt2'];
        this.screen = order[(order.indexOf(this.screen) + 1) % order.length];
        return;
      }
      if (this.screen === 'plan') {
        this.planIndex = (this.planIndex + 1) % VEO_PLAN_DEPTHS.length;
        return;
      }
      const order: VeoScreen[] = this.isLocked() ? ['main', 'alt1', 'alt2', 'flysat', 'log'] : ['main', 'alt1', 'alt2', 'flysat', 'plan', 'log'];
      this.screen = order[(order.indexOf(this.screen) + 1) % order.length];
    }
  }

  private clock(): string {
    const total = (10 * 3600 + Math.floor(this.t)) % 86400;
    const h = Math.floor(total / 3600);
    return `${h % 12 === 0 ? 12 : h % 12}:${pad2(Math.floor((total % 3600) / 60))} ${h < 12 ? 'AM' : 'PM'}`;
  }

  private loadingFraction(): number {
    if (this.dsat) return dsatLoadingFraction(this.dsat, this.env.surfaceBar, this.dsatOpts);
    return this.deco.surfGF / 100;
  }

  display(): VeoDisplay {
    const u = this.settings.units;
    const diving = this.phase === 'dive';
    const nitrox = this.settings.gas.fO2 > 0.215;
    const locked = this.isLocked() || this.viol === 'vgm';
    const fo2 = nitrox ? `${Math.round(this.settings.gas.fO2 * 100)}` : 'Air';
    const base: VeoDisplay = {
      units: u,
      screen: this.screen,
      top: fmtDepth(this.depthM, u),
      topUnit: depthUnit(u),
      topFlash: false,
      stopDepth: '',
      stopLit: false,
      arrow: null,
      arrowFlash: false,
      centre: '',
      centreLabel: '',
      centreFlash: false,
      noBox: false,
      decoBox: false,
      bottomLeft: '',
      bottomLeftLabel: '',
      bottomLeftFlash: false,
      bottomRight: '',
      bottomRightLabel: '',
      ascSegments: 0,
      ascFlash: false,
      slowCaption: false,
      n2Segments: 0,
      n2Flash: false,
      decoCaption: false,
      alarm: this.alarmActive,
      algorithm: this.useZPlus ? 'Z+' : 'DSAT',
      cf: this.cfOn,
      vio: false,
    };

    if (!diving) {
      const si = fmtHoursMin(this.surfaceIntervalS() || this.t);
      switch (this.screen) {
        case 'alt1':
          return { ...base, top: this.lastDive ? fmtDepth(this.lastDive.maxDepthM, u) : '---', bottomLeft: 'LASt', bottomLeftLabel: '', centre: this.lastDive ? `${Math.round(this.lastDive.timeS / 60)}` : '--', centreLabel: '', bottomRight: `${this.lastDive?.number ?? 0}`, bottomRightLabel: 'DIVE' };
        case 'alt2':
          return { ...base, top: this.settings.altitudeM > 915 ? 'EL2' : '', topUnit: '', centre: this.clock(), bottomLeft: `${Math.round(tempValue(this.tempC, u))}°`, bottomRight: '', bottomRightLabel: '' };
        case 'flysat': {
          const started = this.diveNumber > 0 && this.surfaceIntervalS() >= 600;
          return { ...base, top: 'FLY', topUnit: '', centre: started ? fmtHoursMin(this.noFlyS) : '--:--', bottomLeft: 'SAt', bottomRight: this.diveNumber > 0 ? fmtHoursMin(this.desatS) : '-:--' };
        }
        case 'plan': {
          const d = VEO_PLAN_DEPTHS[this.planIndex];
          const ndl = Math.min(99, Math.floor(this.ndlAtDepth(d)));
          return { ...base, top: fmtDepth(d, u, 0), centre: `${ndl}`, centreLabel: 'NO DECO', noBox: true, decoBox: true, bottomLeft: this.cfOn ? 'CF' : 'PLAN', bottomRight: fo2, bottomRightLabel: 'FO2' };
        }
        case 'log':
          return { ...base, top: 'LOG', topUnit: '', centre: this.lastDive ? `${this.lastDive.number}` : '0', bottomLeft: this.lastDive ? 'DIVE' : 'NONE', bottomRight: this.lastDive ? `${Math.round(this.lastDive.timeS / 60)}` : 'YET', bottomRightLabel: this.lastDive ? 'DIVE-T' : '' };
        default: {
          const recent = this.diveNumber > 0 && this.surfaceIntervalS() < 600;
          const vio = this.isLocked();
          return {
            ...base,
            top: vio ? 'VIO' : fmtDepth(0, u),
            topUnit: vio ? '' : depthUnit(u),
            topFlash: vio,
            centre: si,
            centreLabel: 'SURF',
            centreFlash: vio && this.surfaceIntervalS() < 600,
            bottomLeft: recent ? fmtDepth(this.lastDive?.maxDepthM ?? this.maxDepthM, u) : vio ? 'GAUG' : '',
            bottomLeftLabel: recent ? 'MAX' : '',
            bottomRight: recent ? `${Math.round((this.lastDive?.timeS ?? this.diveTimeS) / 60)}` : fo2,
            bottomRightLabel: recent ? 'DIVE-T' : 'FO2',
            n2Segments: vio ? 0 : Math.min(5, Math.ceil(this.loadingFraction() * 4)),
            vio,
          };
        }
      }
    }

    // ---- dive screens ----
    const rate = this.ascentRate;
    const ascSegments = rate <= 3 ? 0 : rate <= 4.5 ? 1 : rate <= 6 ? 2 : rate <= 7.5 ? 3 : rate <= 9 ? 4 : 5;
    const ascFlash = rate > 9;
    const frac = this.loadingFraction();
    const n2Segments = this.deco.required ? 5 : Math.min(4, Math.max(frac > 0.02 ? 1 : 0, Math.ceil(frac * 4)));
    const dive: VeoDisplay = { ...base, ascSegments, ascFlash, slowCaption: ascFlash, n2Segments, bottomLeft: fmtDepth(this.maxDepthM, u), bottomLeftLabel: 'MAX', bottomRight: `${Math.round(this.diveTimeS / 60)}`, bottomRightLabel: 'DIVE-T' };
    if (ascFlash) {
      dive.bottomLeft = 'SLO';
      dive.bottomLeftLabel = '';
      dive.bottomLeftFlash = true;
    }

    if (this.screen === 'alt2') return { ...dive, centre: this.clock(), centreLabel: '', bottomLeft: `${Math.round(tempValue(this.tempC, u))}°`, bottomLeftLabel: '', bottomRight: '', bottomRightLabel: '' };
    if (this.screen === 'alt3') return { ...dive, centre: `${Math.round(this.cns)}`, centreLabel: 'O2 SAT', bottomLeft: this.pO2.toFixed(2), bottomLeftLabel: 'PO2', bottomRight: fo2, bottomRightLabel: 'FO2' };

    if (locked) {
      return { ...dive, centre: '', bottomLeft: 'VIO', bottomLeftFlash: true, n2Segments: 0, arrow: this.deco.required && this.depthM > this.deco.stopDepthM + 3 ? 'up' : null, arrowFlash: true, vio: true };
    }

    if (this.deco.required) {
      const stop = this.deco.stopDepthM;
      const above = this.depthM < stop - 0.1;
      const inZone = !above && this.depthM <= stop + 3;
      return {
        ...dive,
        stopDepth: fmtDepth(stop, u, 0),
        stopLit: true,
        arrow: above ? 'down' : inZone ? 'stop' : 'up',
        arrowFlash: !inZone && this.alarmActive,
        centre: `${Math.ceil(this.deco.stopTimeMin)}`,
        centreLabel: 'DECO',
        decoBox: true,
        decoCaption: true,
        n2Flash: this.alarmActive,
        bottomLeft: above ? 'DOWN' : inZone ? 'STOP' : 'UP',
        bottomLeftLabel: '',
        bottomLeftFlash: !inZone && this.alarmActive,
        bottomRight: `${Math.min(999, Math.ceil(this.deco.ttsMin))}`,
        bottomRightLabel: 'TTS',
      };
    }

    const dtr = Math.min(599, Math.max(0, Math.floor(this.ndlMin)));
    if (this.ss.status === 'counting') {
      return { ...dive, stopDepth: fmtDepth(SAFETY_STOP_DEPTH, u, 0), stopLit: true, arrow: 'stop', centre: fmtMinSec(this.ss.remainingS), centreLabel: '', bottomLeft: '', bottomLeftLabel: '', bottomRight: '', bottomRightLabel: '' };
    }
    if (this.deep.status === 'counting') {
      return { ...dive, stopDepth: fmtDepth(this.deep.depthM, u, 0), stopLit: true, arrow: 'stop', centre: fmtMinSec(this.deep.remainingS), centreLabel: '', bottomLeft: '', bottomLeftLabel: '', bottomRight: '', bottomRightLabel: '' };
    }
    return { ...dive, centre: `${dtr}`, centreLabel: 'NO DECO', noBox: true, decoBox: true };
  }
}
