/**
 * Cressi Leonardo (original firmware) – single button, "CRESSI RGBM" (9 tissues, Haldane + RGBM
 * factors). Behaviour from the Leonardo manual; the no-stop limits are calibrated to display
 * readings posted by a Leonardo owner because Cressi prints no table. See docs/research/mares-cressi.md.
 *
 * Ascent arrows at 4/8/12 m/min with SLOW + beeps at 12 m/min, NDL forewarning at 3 min,
 * safety stop 3 min between 6 and 3 m after dives past 10 m, deep stop, deco with first stop +
 * TOTAL ascent time, omitted-stop alarm with a 2-minute grace then the ERROR PROGRAM (48 h),
 * no-fly 12/24/48 h, DESAT and SURF.T on the surface screen.
 */
import { CRESSI_SF0, CRESSI_SF1, CRESSI_SF2 } from '../../engine';
import { ComputerCore, type CorePolicy } from '../../sim/core';
import { depthUnit, fmtDepth, fmtHoursMin, pad2, tempValue } from '../../sim/format';
import type { ButtonPress, ComputerSettings, Units } from '../../sim/types';

const POLICY: CorePolicy = {
  startDepthM: 1.2,
  endDepthM: 1.2,
  endDelayS: 120,
  ascentWindowS: 8,
  planningAscentRateMPerMin: 10,
  stopIncrementM: 3,
  tissueModel: 'zhl16c',
  safetyStop: { durationS: 180, deepM: 6, shallowM: 3, requiredMaxDepthM: 10, whenShallower: 'pause', whenDeeper: 'pause', resetDeeperThanM: 10, surfaceM: 1.2 },
  ceilingToleranceM: 0.3,
};

export const LEONARDO_PLAN_DEPTHS = [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48];
export type LeoMenu = 'predive' | 'log' | 'dive-s' | 'time-s' | 'plan' | 'gage' | 'pclink' | 'hist' | 'system';

export interface LeoDisplay {
  units: Units;
  screen: 'predive' | 'surface' | 'menu' | 'plan' | 'dive' | 'dive-alt' | 'error';
  topLeftLabel: string;
  topLeft: string;
  topLeftUnit: string;
  topRightLabel: string;
  topRight: string;
  topRightUnit: string;
  stageIcon: 'none' | 'deco' | 'stop' | 'deep';
  stageFlash: boolean;
  decoLabel: boolean;
  stopLabel: boolean;
  stopFlash: boolean;
  deepLabel: boolean;
  depthLabel: string;
  depth: string;
  depthUnit: string;
  arrows: number;
  arrowsFlash: boolean;
  slow: boolean;
  downArrow: boolean;
  upArrow: boolean;
  rightLabel: string;
  rightValue: string;
  rightFlash: boolean;
  bottomLeft: string;
  bottomRight: string;
  noFly: boolean;
  nitrox: boolean;
  o2Segments: number;
  altitude: number;
  sf: string;
  menuText: string;
}

export class CressiLeonardo extends ComputerCore {
  readonly id = 'cressi-leonardo';
  private menu: LeoMenu = 'predive';
  private inPlan = false;
  private planIndex = 3;
  private altUntilS = 0;
  private penaltyUntilS = 0;
  private errorProgram = false;
  private omittedS = 0;
  private forewarned = false;
  private deep: { status: 'none' | 'planned' | 'counting' | 'done' | 'cancelled'; depthM: number; remainingS: number } = { status: 'none', depthM: 0, remainingS: 120 };
  private lastDive: { number: number; maxDepthM: number; timeS: number; deco: boolean; slow: boolean } | null = null;
  private slowSeen = false;

  constructor(settings: ComputerSettings) {
    super(POLICY, { ...settings, safetyStopMinutes: 3 });
  }

  protected gradientFactors(): { low: number; high: number } {
    return { low: 1, high: 1 };
  }

  protected mScale(): readonly number[] {
    const base = this.settings.conservatism === 2 ? CRESSI_SF2 : this.settings.conservatism === 1 ? CRESSI_SF1 : CRESSI_SF0;
    return this.t < this.penaltyUntilS ? base.map((s) => s * 0.9) : base;
  }

  protected brandTick(dtS: number): void {
    const diving = this.phase === 'dive';

    // ---- ascent: arrows at 4/8/12, SLOW at 12 ----
    const over = this.trackAscent(12, dtS);
    if (over) {
      this.slowSeen = true;
      this.raise('slow', 'warning', 'SLOW – three arrows flash, BEEP-BEEP: ascent rate 12 m/min or more. Stop ascending until SLOW disappears.');
      if (this.ascentOverS > 30 && this.penaltyUntilS < this.t) {
        this.penaltyUntilS = this.t + 24 * 3600;
        this.emit('warning', 'Prolonged fast ascent – the next dive within the desaturation time will be more conservative (penalty icon)');
      }
    } else this.clear('slow');

    // ---- NDL forewarning ----
    if (diving && !this.deco.required && this.ndlMin <= 3 && !this.forewarned) {
      this.forewarned = true;
      this.raise('forewarn', 'warning', 'Decompression forewarning – NO DECO time down to 3 minutes (sound alarm, NO DECO flashes)');
    }
    if (this.ndlMin > 5) {
      this.forewarned = false;
      this.clear('forewarn');
    }

    // ---- safety stop ----
    const prev = this.safety.state.status;
    const ss = this.safety.update(this.depthM, this.maxDepthM, dtS, this.deco.required || this.errorProgram);
    if (ss.status === 'counting' && prev !== 'counting' && prev !== 'paused') this.emit('info', 'STOP: 3-minute safety stop between 6 and 3 m (not mandatory, strongly recommended)');
    if (ss.status === 'done' && prev === 'counting') this.emit('info', 'Safety stop complete');

    // ---- deep stop ----
    if (diving && this.settings.deepStops && !this.errorProgram) {
      const d = this.deep;
      if (d.status === 'none' && this.maxDepthM >= 24 && (this.ndlMin < 5 || this.deco.required)) {
        d.status = 'planned';
        d.depthM = Math.round(this.maxDepthM / 2);
      } else if (d.status === 'planned') {
        if (Math.abs(this.depthM - d.depthM) <= 1.5) {
          d.status = 'counting';
          d.remainingS = 120;
          this.emit('info', `DEEP STOP at ${d.depthM} m – 2 minutes (sound signal)`);
        } else if (this.depthM < d.depthM - 1.5) d.status = 'cancelled';
      } else if (d.status === 'counting') {
        if (this.depthM < d.depthM - 1.5) {
          d.status = 'cancelled';
          this.emit('info', 'Deep stop omitted – ascent plan recalculated without it');
        } else if (Math.abs(this.depthM - d.depthM) <= 1.5) {
          d.remainingS -= dtS;
          if (d.remainingS <= 0) d.status = 'done';
        }
      }
    }

    // ---- deco / omitted stop → ERROR PROGRAM ----
    if (diving && this.deco.required && !this.errorProgram) {
      const stop = this.deco.stopDepthM;
      if (this.depthM < stop - 0.3) {
        this.omittedS += dtS;
        this.raise('omitted', 'critical', 'Decompression stop omitted – alarm sounds, the down arrow flashes: descend to the stop depth. 2 minutes to correct.');
        if (this.omittedS >= 120) {
          this.errorProgram = true;
          this.clear('omitted');
          this.emit('critical', 'ERROR PROGRAM – STOP flashes. The computer will be unusable for 48 hours (only Logbook and History).');
        }
      } else {
        this.omittedS = 0;
        this.clear('omitted');
        if (this.depthM > stop + 1) this.raise('too-deep', 'info', 'Deeper than the stop by more than 1 m – arrow up flashes', false);
        else this.clear('too-deep');
      }
    } else {
      this.clear('omitted');
      this.clear('too-deep');
    }

    if (diving && this.pO2 > this.settings.pO2Max) this.raise('po2', 'critical', 'PO2 limit reached – PO2 icon flashes, depth shown');
    else this.clear('po2');
    if (this.cns >= 80) this.raise('cns', 'warning', 'O2 toxicity bar near its limit – NITROX flashes');
  }

  protected onDiveStart(): void {
    this.deep = { status: 'none', depthM: 0, remainingS: 120 };
    this.omittedS = 0;
    this.forewarned = false;
    this.slowSeen = false;
    this.errorProgram = this.isLocked();
    this.inPlan = false;
    this.menu = 'predive';
  }

  protected onDiveEnd(): void {
    this.lastDive = { number: this.diveNumber, maxDepthM: this.maxDepthM, timeS: this.diveTimeS, deco: this.decoDives > 0, slow: this.slowSeen };
    if (this.errorProgram || this.deco.required) this.lock(48, 'ERROR PROGRAM – omitted decompression');
    this.errorProgram = false;
  }

  protected noFlySeconds(): number {
    if (this.isLocked()) return this.lockoutRemainingS();
    const hours = this.decoDives > 0 || this.diveNumber > 1 ? 24 : 12;
    return hours * 3600 - this.surfaceIntervalS();
  }

  press(button: string, kind: ButtonPress): void {
    if (button !== 'button') return;
    if (this.phase === 'dive') {
      if (kind === 'short') this.altUntilS = this.t + 4;
      return;
    }
    if (this.inPlan) {
      if (kind === 'long') this.inPlan = false;
      else this.planIndex = (this.planIndex + 1) % LEONARDO_PLAN_DEPTHS.length;
      return;
    }
    if (kind === 'long') {
      if (this.menu === 'plan' && !this.isLocked()) this.inPlan = true;
      return;
    }
    const order: LeoMenu[] = ['predive', 'log', 'dive-s', 'time-s', 'plan', 'gage', 'pclink', 'hist', 'system'];
    this.menu = order[(order.indexOf(this.menu) + 1) % order.length];
  }

  private clock(): string {
    const total = (10 * 3600 + Math.floor(this.t)) % 86400;
    return `${Math.floor(total / 3600)}:${pad2(Math.floor((total % 3600) / 60))}`;
  }

  private modM(): number {
    return Math.max(0, (this.settings.pO2Max / this.settings.gas.fO2 - this.env.surfaceBar) / 0.1);
  }

  display(): LeoDisplay {
    const u = this.settings.units;
    const diving = this.phase === 'dive';
    const nitrox = this.settings.gas.fO2 > 0.215;
    const altitude = this.settings.altitudeM >= 2400 ? 3 : this.settings.altitudeM >= 1500 ? 2 : this.settings.altitudeM >= 700 ? 1 : 0;
    const sf = `SF${this.settings.conservatism}`;
    const temp = `${Math.round(tempValue(this.tempC, u))}°${u === 'metric' ? 'C' : 'F'}`;
    const base: LeoDisplay = {
      units: u,
      screen: 'predive',
      topLeftLabel: '',
      topLeft: '',
      topLeftUnit: '',
      topRightLabel: '',
      topRight: '',
      topRightUnit: '',
      stageIcon: 'none',
      stageFlash: false,
      decoLabel: false,
      stopLabel: false,
      stopFlash: false,
      deepLabel: false,
      depthLabel: 'DEPTH',
      depth: '',
      depthUnit: depthUnit(u),
      arrows: 0,
      arrowsFlash: false,
      slow: false,
      downArrow: false,
      upArrow: false,
      rightLabel: '',
      rightValue: '',
      rightFlash: false,
      bottomLeft: temp,
      bottomRight: '',
      noFly: false,
      nitrox,
      o2Segments: Math.min(5, Math.ceil(this.cns / 20)),
      altitude,
      sf,
      menuText: '',
    };

    if (!diving) {
      if (this.inPlan) {
        const d = LEONARDO_PLAN_DEPTHS[this.planIndex];
        return { ...base, screen: 'plan', depth: fmtDepth(d, u, 0), rightLabel: 'NO DECO', rightValue: `${Math.min(99, Math.floor(this.ndlAtDepth(d)))}`, bottomLeft: 'PLAN', bottomRight: '' };
      }
      if (this.menu !== 'predive') {
        const text = { log: `LOG-${pad2(this.diveNumber)}`, 'dive-s': 'DIVE-S', 'time-s': 'TIME-S', plan: 'PLAN', gage: 'GAGE', pclink: 'PCLINK', hist: 'HIST.', system: 'SYSTEM', predive: '' }[this.menu];
        return { ...base, screen: 'menu', menuText: text, bottomLeft: this.menu === 'log' && this.lastDive ? `${fmtDepth(this.lastDive.maxDepthM, u)} ${depthUnit(u)} · ${Math.round(this.lastDive.timeS / 60)} min` : '' };
      }
      if (this.isLocked()) {
        return { ...base, screen: 'error', stageIcon: 'deco', stageFlash: true, decoLabel: true, stopLabel: true, stopFlash: true, topLeftLabel: 'SURF.T', topLeft: fmtHoursMin(this.surfaceIntervalS()), topRightLabel: 'DESAT', topRight: fmtHoursMin(this.desatS), bottomLeft: this.clock(), noFly: true };
      }
      if (this.diveNumber > 0 && this.desatS > 0) {
        return {
          ...base,
          screen: 'surface',
          topLeftLabel: 'SURF.T',
          topLeft: fmtHoursMin(this.surfaceIntervalS()),
          topRightLabel: 'DESAT',
          topRight: fmtHoursMin(this.desatS),
          decoLabel: this.lastDive?.deco ?? false,
          depthLabel: 'MAX',
          depth: fmtDepth(this.lastDive?.maxDepthM ?? this.maxDepthM, u),
          arrows: this.lastDive?.slow ? 3 : 0,
          slow: this.lastDive?.slow ?? false,
          rightLabel: 'DIVE.T',
          rightValue: `${Math.round((this.lastDive?.timeS ?? this.diveTimeS) / 60)}`,
          bottomLeft: this.clock(),
          noFly: this.noFlyS > 0,
        };
      }
      return { ...base, screen: 'predive', topLeftLabel: 'PO2', topLeft: this.settings.pO2Max.toFixed(1), topRightLabel: nitrox ? 'NITROX' : 'Air', topRight: nitrox ? `${Math.round(this.settings.gas.fO2 * 100)}` : '', topRightUnit: nitrox ? '%' : '', depthLabel: 'MAX DEPTH', depth: fmtDepth(this.modM(), u), rightLabel: '', rightValue: sf, bottomLeft: this.clock() };
    }

    // ---- dive ----
    const rate = this.ascentRate;
    const arrows = rate >= 12 ? 3 : rate >= 8 ? 2 : rate >= 4 ? 1 : 0;
    const d: LeoDisplay = {
      ...base,
      screen: 'dive',
      topLeftLabel: 'MAX',
      topLeft: fmtDepth(this.maxDepthM, u),
      topLeftUnit: depthUnit(u),
      topRightLabel: 'DIVE.T',
      topRight: `${Math.round(this.diveTimeS / 60)}`,
      topRightUnit: 'min',
      depth: fmtDepth(this.depthM, u),
      arrows,
      arrowsFlash: rate >= 12,
      slow: rate >= 12,
    };
    if (this.t < this.altUntilS) {
      return { ...d, screen: 'dive-alt', topLeftLabel: 'PO2', topLeft: this.settings.pO2Max.toFixed(1), topLeftUnit: '', topRightLabel: nitrox ? 'NITROX' : 'Air', topRight: nitrox ? `${Math.round(this.settings.gas.fO2 * 100)}` : '', topRightUnit: nitrox ? '%' : '', depthLabel: 'MAX DEPTH', depth: fmtDepth(this.modM(), u), rightValue: sf };
    }
    if (this.isLocked() || this.errorProgram) {
      return { ...d, screen: 'error', stageIcon: 'deco', stageFlash: true, decoLabel: true, stopLabel: true, stopFlash: true, rightLabel: '', rightValue: '' };
    }
    if (this.deco.required) {
      const stop = this.deco.stopDepthM;
      const above = this.depthM < stop - 0.3;
      const total = Math.ceil(this.deco.ttsMin + 3);
      return {
        ...d,
        topLeftLabel: '',
        topLeft: `${fmtDepth(stop, u, 0)}`,
        topLeftUnit: `${depthUnit(u)}  ${Math.ceil(this.deco.stopTimeMin)} min`,
        stageIcon: 'deco',
        stageFlash: above,
        decoLabel: true,
        deepLabel: this.deep.status === 'counting',
        upArrow: this.depthM > stop + 1,
        downArrow: above,
        rightLabel: 'TOTAL',
        rightValue: `${total}`,
        rightFlash: false,
      };
    }
    const ndl = `${Math.min(99, Math.max(0, Math.floor(this.ndlMin)))}`;
    if (this.deep.status === 'counting') {
      return { ...d, topLeftLabel: '', topLeft: `${fmtDepth(this.deep.depthM, u, 0)}`, topLeftUnit: `${depthUnit(u)}  ${Math.ceil(this.deep.remainingS / 60)} min`, stageIcon: 'deep', deepLabel: true, stopLabel: true, rightLabel: 'NO DECO', rightValue: ndl };
    }
    const ss = this.safety.state;
    if (ss.status === 'counting' || ss.status === 'paused') {
      return { ...d, topLeftLabel: '', topLeft: `${fmtDepth(3, u, 0)}`, topLeftUnit: `${depthUnit(u)}  ${Math.ceil(ss.remainingS / 60)} min`, stageIcon: 'stop', stopLabel: true, rightLabel: 'NO DECO', rightValue: ndl };
    }
    return { ...d, rightLabel: 'NO DECO', rightValue: ndl, rightFlash: this.has('forewarn') };
  }
}
