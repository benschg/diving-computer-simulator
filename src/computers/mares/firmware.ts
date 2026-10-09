/**
 * Mares Puck Pro+ – single-button computer, "RGBM Mares-Wienke". Behaviour from the Puck Pro /
 * Puck Pro+ manual, see docs/research/mares-cressi.md. Mares publishes no NDL table, so the
 * no-stop limits are approximated with the Cressi RGBM calibration (same algorithm family).
 *
 * Numeric ascent speed with alarm at ≥10 m/min, "uncontrolled ascent" violation (≥12 m/min over
 * two thirds of the ascent on dives deeper than 12 m → 24 h bottom-timer lock), SAFE 3-minute
 * stop between 6 and 3 m, deep stops, deco with deepest stop + asc time, missed-stop alarm
 * (>0.3 m above the stop) and lock-out (>1 m above for >3 min), 3-minute surfacing countdown,
 * no-fly 12/24 h, DESAT and S.I. post-dive screen.
 */
import { CRESSI_SF0, CRESSI_SF1, CRESSI_SF2 } from '../../engine';
import { ComputerCore, type CorePolicy } from '../../sim/core';
import { depthUnit, fmtDepth, fmtHoursMin, fmtMinSec, pad2, tempValue } from '../../sim/format';
import type { ButtonPress, ComputerSettings, Units } from '../../sim/types';

const POLICY: CorePolicy = {
  startDepthM: 1.2,
  endDepthM: 1.2,
  endDelayS: 180,
  ascentWindowS: 8,
  planningAscentRateMPerMin: 10,
  stopIncrementM: 3,
  tissueModel: 'zhl16c',
  safetyStop: { durationS: 180, deepM: 6, shallowM: 3, requiredMaxDepthM: 10, whenShallower: 'pause', whenDeeper: 'pause', resetDeeperThanM: 10, surfaceM: 1.2 },
  ceilingToleranceM: 0.3,
};

export const PUCK_PLAN_DEPTHS = [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48];
export type PuckMenu = 'predive' | 'mode' | 'set' | 'log' | 'plan' | 'pc' | 'info';
export type PuckAlt = 'max' | 'avg' | 'o2' | 'cns' | 'clock' | 'blank';

export interface PuckDisplay {
  units: Units;
  screen: 'postdive' | 'predive' | 'menu' | 'plan' | 'dive' | 'surfacing';
  depth: string;
  depthUnit: string;
  depthBlink: boolean;
  topRightLabel: string;
  topRight: string;
  speed: string;
  speedBlink: boolean;
  ascentIcon: boolean;
  fastIcon: 'off' | 'blink' | 'steady';
  middleLabel: string;
  middleLeft: string;
  middleCentre: string;
  middleRight: string;
  middleRightLabel: string;
  stopMarker: 'none' | 'ok' | 'down';
  diverIcon: boolean;
  bottomLeftLabel: string;
  bottomLeft: string;
  bottomRight: string;
  bottomRightLabel: string;
  n2Segments: number;
  menuText: string;
  pFactor: string;
  noFly: boolean;
  alarm: boolean;
}

export class MaresPuckPro extends ComputerCore {
  readonly id = 'mares-puck-pro';
  private menu: PuckMenu = 'predive';
  private inPlan = false;
  private planIndex = 3;
  private alt: PuckAlt = 'max';
  private altSinceS = 0;
  private fastStartDepth = 0;
  private fastDistance = 0;
  private fastViolation = false;
  private fastBlink = false;
  private missedS = 0;
  private decoViolation = false;
  private deep: { status: 'none' | 'planned' | 'counting' | 'done' | 'cancelled'; depthM: number; remainingS: number } = { status: 'none', depthM: 0, remainingS: 120 };
  private lastDive: { number: number; maxDepthM: number; timeS: number } | null = null;

  constructor(settings: ComputerSettings) {
    super(POLICY, { ...settings, safetyStopMinutes: 3 });
  }

  protected gradientFactors(): { low: number; high: number } {
    return { low: 1, high: 1 };
  }

  protected mScale(): readonly number[] {
    return this.settings.conservatism === 2 ? CRESSI_SF2 : this.settings.conservatism === 1 ? CRESSI_SF1 : CRESSI_SF0;
  }

  protected brandTick(dtS: number): void {
    const diving = this.phase === 'dive';
    const rate = this.ascentRate;

    // ---- ascent speed ----
    const over = this.trackAscent(10, dtS);
    if (over) this.raise('asc', 'warning', 'Ascent rate alarm – 10 m/min or faster (speed value blinks, audible alarm)');
    else this.clear('asc');
    this.fastBlink = diving && rate >= 12 && this.depthM > 12;
    if (diving && rate >= 12) {
      if (this.fastStartDepth === 0) this.fastStartDepth = this.depthM;
      this.fastDistance += (rate * dtS) / 60;
      if (!this.fastViolation && this.fastStartDepth > 12 && this.fastDistance >= (2 / 3) * this.fastStartDepth) {
        this.fastViolation = true;
        this.raise('fast', 'critical', 'Uncontrolled ascent: ≥12 m/min over two thirds of the way up – "fast" icon steady, computer locks for 24 h after surfacing');
      }
    } else if (!this.fastViolation) {
      this.fastStartDepth = 0;
      this.fastDistance = 0;
    }

    // ---- safety stop ----
    const prev = this.safety.state.status;
    const ss = this.safety.update(this.depthM, this.maxDepthM, dtS, this.deco.required);
    if (ss.status === 'counting' && prev !== 'counting' && prev !== 'paused') this.emit('info', 'SAFE: 3-minute safety stop between 6 and 3 m (not mandatory, highly recommended)');
    if (ss.status === 'done' && prev === 'counting') this.emit('info', 'Safety stop complete');

    // ---- deep stop ----
    if (diving) {
      const d = this.deep;
      if (d.status === 'none' && this.maxDepthM >= 24 && (this.ndlMin < 5 || this.deco.required)) {
        d.status = 'planned';
        d.depthM = Math.round(this.maxDepthM / 2);
      } else if (d.status === 'planned') {
        if (Math.abs(this.depthM - d.depthM) <= 1) {
          d.status = 'counting';
          d.remainingS = 120;
          this.emit('info', `DEEP stop at ${d.depthM} m – 2-minute countdown (not mandatory)`);
        } else if (this.depthM < d.depthM - 1) {
          d.status = 'cancelled';
          this.emit('info', 'Deep stop cancelled (ascended past it by more than 1 m)');
        }
      } else if (d.status === 'counting') {
        if (this.depthM < d.depthM - 1) {
          d.status = 'cancelled';
          this.emit('info', 'Deep stop cancelled (ascended past it by more than 1 m)');
        } else if (Math.abs(this.depthM - d.depthM) <= 1) {
          d.remainingS -= dtS;
          if (d.remainingS <= 0) d.status = 'done';
        }
      }
    }

    // ---- deco + missed stop ----
    if (diving && this.deco.required) {
      const stop = this.deco.stopDepthM;
      if (this.depthM < stop - 0.3) {
        this.raise('missed', 'critical', 'Missed deco stop – down triangle, audible alarm, depth and stop depth blink. Off-gassing credit halted.');
        if (this.depthM < stop - 1) this.missedS += dtS;
        if (this.missedS > 180 && !this.decoViolation) {
          this.decoViolation = true;
          this.emit('critical', 'Dive violation: more than 1 m above the stop for over 3 minutes. Next dives within 24 h: bottom timer only.');
        }
      } else {
        this.clear('missed');
        this.missedS = 0;
      }
    } else this.clear('missed');

    // ---- PO2 / CNS ----
    if (diving && this.pO2 > this.settings.pO2Max) this.raise('mod', 'critical', `MOD exceeded – depth blinks, MOD ${fmtDepth(this.modM(), this.settings.units, 1)} m shown`);
    else this.clear('mod');
    if (this.cns >= 75) this.raise('cns', 'warning', 'CNS 75 % – CNS value blinks');

    if (diving && this.alt !== 'max' && this.t - this.altSinceS > 4 && this.alt === 'clock') this.alt = 'blank';
  }

  protected onDiveStart(): void {
    this.alt = 'max';
    this.fastStartDepth = 0;
    this.fastDistance = 0;
    this.fastViolation = false;
    this.missedS = 0;
    this.decoViolation = false;
    this.deep = { status: 'none', depthM: 0, remainingS: 120 };
    this.inPlan = false;
    this.menu = 'predive';
  }

  protected onDiveEnd(): void {
    this.lastDive = { number: this.diveNumber, maxDepthM: this.maxDepthM, timeS: this.diveTimeS };
    if (this.fastViolation) this.lock(24, 'fast – uncontrolled ascent');
    else if (this.decoViolation || this.deco.required) this.lock(24, 'Missed decompression stop');
  }

  protected noFlySeconds(): number {
    const hours = this.decoDives > 0 || this.diveNumber > 1 ? 24 : 12;
    return Math.max(hours * 3600 - this.surfaceIntervalS(), this.desatS);
  }

  press(button: string, kind: ButtonPress): void {
    if (button !== 'button') return;
    if (this.phase === 'dive') {
      if (kind === 'long') return; // backlight
      const order: PuckAlt[] = this.settings.gas.fO2 > 0.215 ? ['max', 'avg', 'o2', 'cns', 'clock', 'blank'] : ['max', 'avg', 'clock', 'blank'];
      this.alt = order[(order.indexOf(this.alt) + 1) % order.length];
      this.altSinceS = this.t;
      return;
    }
    if (this.inPlan) {
      if (kind === 'long') this.inPlan = false;
      else this.planIndex = (this.planIndex + 1) % PUCK_PLAN_DEPTHS.length;
      return;
    }
    if (kind === 'long') {
      if (this.menu === 'plan' && !this.isLocked()) this.inPlan = true;
      return;
    }
    const order: PuckMenu[] = ['predive', 'mode', 'set', 'log', 'plan', 'pc', 'info'];
    this.menu = order[(order.indexOf(this.menu) + 1) % order.length];
  }

  private modM(): number {
    return Math.max(0, (this.settings.pO2Max / this.settings.gas.fO2 - this.env.surfaceBar) / 0.1);
  }

  private clock(): string {
    const total = (10 * 3600 + Math.floor(this.t)) % 86400;
    return `${Math.floor(total / 3600)}:${pad2(Math.floor((total % 3600) / 60))}`;
  }

  display(): PuckDisplay {
    const u = this.settings.units;
    const diving = this.phase === 'dive';
    const nitrox = this.settings.gas.fO2 > 0.215;
    const pFactor = this.settings.conservatism === 2 ? 'p++' : this.settings.conservatism === 1 ? 'p+' : '';
    const base: PuckDisplay = {
      units: u,
      screen: 'predive',
      depth: '---',
      depthUnit: depthUnit(u),
      depthBlink: false,
      topRightLabel: '',
      topRight: '',
      speed: '',
      speedBlink: false,
      ascentIcon: false,
      fastIcon: 'off',
      middleLabel: '',
      middleLeft: '',
      middleCentre: '',
      middleRight: '',
      middleRightLabel: '',
      stopMarker: 'none',
      diverIcon: false,
      bottomLeftLabel: '',
      bottomLeft: '',
      bottomRight: '',
      bottomRightLabel: '',
      n2Segments: Math.min(10, Math.round((this.deco.surfGF / 100) * 10)),
      menuText: '',
      pFactor,
      noFly: false,
      alarm: this.alarms.size > 0,
    };

    if (!diving) {
      if (this.inPlan) {
        const d = PUCK_PLAN_DEPTHS[this.planIndex];
        return { ...base, screen: 'plan', depth: fmtDepth(d, u, 0), middleLabel: 'no deco', middleCentre: `${Math.min(99, Math.floor(this.ndlAtDepth(d)))}`, bottomLeftLabel: 'PLAN', bottomLeft: pFactor };
      }
      if (this.menu !== 'predive') {
        const text = { mode: nitrox ? 'EAN' : 'AIR', set: 'SEt', log: 'LOG', plan: 'PLAN', pc: 'PC rEAdy', info: 'INFO', predive: '' }[this.menu];
        return { ...base, screen: 'menu', menuText: text, middleCentre: this.menu === 'log' && this.lastDive ? `${Math.round(this.lastDive.timeS / 60)}` : '', middleLabel: this.menu === 'log' && this.lastDive ? 'dive time' : '' };
      }
      if (this.phase === 'surfaced') {
        const remaining = Math.max(0, 180 - this.surfaceIntervalS());
        return { ...base, screen: 'surfacing', depth: '---', middleCentre: fmtMinSec(remaining), middleLabel: 'surfacing', bottomLeftLabel: 'dive time', bottomLeft: `${Math.round(this.diveTimeS / 60)}`, bottomRight: `${Math.round(tempValue(this.tempC, u))}`, bottomRightLabel: u === 'metric' ? '°c' : '°f' };
      }
      if (this.diveNumber > 0 && (this.desatS > 0 || this.noFlyS > 0)) {
        return {
          ...base,
          screen: 'postdive',
          depth: `${Math.ceil(this.desatS / 3600)}`,
          depthUnit: 'DESAT',
          topRightLabel: 'no fly',
          topRight: `${Math.ceil(this.noFlyS / 3600)}`,
          middleCentre: this.clock(),
          middleLeft: this.settings.water === 'fresh' ? 'F' : 'S',
          bottomLeftLabel: 's.i.',
          bottomLeft: fmtHoursMin(this.surfaceIntervalS()),
          bottomRight: nitrox ? `${Math.round(this.settings.gas.fO2 * 100)}` : `${Math.round(tempValue(this.tempC, u))}`,
          bottomRightLabel: nitrox ? 'O2 %' : u === 'metric' ? '°c' : '°f',
          noFly: this.noFlyS > 0,
          fastIcon: this.isLocked() && this.lockoutLabel.startsWith('fast') ? 'steady' : 'off',
          diverIcon: this.isLocked() && !this.lockoutLabel.startsWith('fast'),
        };
      }
      return { ...base, screen: 'predive', middleCentre: this.clock(), middleLeft: this.settings.water === 'fresh' ? 'F' : 'S', bottomLeftLabel: 's.i.', bottomLeft: this.diveNumber > 0 ? fmtHoursMin(this.surfaceIntervalS()) : '-:--', bottomRight: nitrox ? `${Math.round(this.settings.gas.fO2 * 100)}` : `${Math.round(tempValue(this.tempC, u))}`, bottomRightLabel: nitrox ? 'O2 %' : u === 'metric' ? '°c' : '°f', topRightLabel: nitrox ? 'MOD' : '', topRight: nitrox ? fmtDepth(this.modM(), u, 0) : '' };
    }

    // ---- dive ----
    const rate = this.ascentRate;
    const moving = Math.abs(rate) > 0.8;
    const d: PuckDisplay = {
      ...base,
      screen: 'dive',
      depth: fmtDepth(this.depthM, u),
      depthBlink: this.has('mod') || this.has('missed'),
      topRightLabel: 'max',
      topRight: fmtDepth(this.maxDepthM, u),
      speed: moving ? `${Math.round(Math.abs(rate))}` : '--',
      speedBlink: this.has('asc'),
      ascentIcon: rate > 0.8,
      fastIcon: this.fastViolation ? 'steady' : this.fastBlink ? 'blink' : 'off',
      bottomLeftLabel: 'dive time',
      bottomLeft: `${Math.min(99, Math.round(this.diveTimeS / 60))}`,
      bottomRight: `${Math.round(tempValue(this.tempC, u))}`,
      bottomRightLabel: u === 'metric' ? '°c' : '°f',
    };
    if (this.alt === 'avg') {
      d.topRightLabel = 'avg';
      d.topRight = fmtDepth(this.snapshot().avgDepthM, u);
    } else if (this.alt === 'o2') {
      d.bottomRight = `${Math.round(this.settings.gas.fO2 * 100)}`;
      d.bottomRightLabel = 'O2 %';
    } else if (this.alt === 'cns') {
      d.bottomRight = `${Math.round(this.cns)}`;
      d.bottomRightLabel = 'CNS%';
    } else if (this.alt === 'clock') {
      d.bottomLeftLabel = '';
      d.bottomLeft = this.clock();
    } else if (this.alt === 'blank') {
      d.topRightLabel = '';
      d.topRight = '';
    }
    if (this.has('mod')) {
      d.topRightLabel = 'MOD';
      d.topRight = fmtDepth(this.modM(), u);
    }

    if (this.isLocked()) {
      return { ...d, middleLabel: 'bottom timer', middleCentre: fmtMinSec(this.diveTimeS), diverIcon: true, n2Segments: 0 };
    }
    if (this.deco.required) {
      const stop = this.deco.stopDepthM;
      const above = this.depthM < stop - 0.3;
      const inRange = !above && this.depthM <= stop + 1;
      return {
        ...d,
        middleLabel: this.deep.status === 'counting' ? 'DEEP deco' : 'deco',
        middleLeft: `${fmtDepth(stop, u, 0)} ${depthUnit(u)}`,
        middleCentre: `${Math.ceil(this.deco.stopTimeMin)}`,
        middleRight: `${Math.min(99, Math.ceil(this.deco.ttsMin))}`,
        middleRightLabel: 'asc',
        stopMarker: above ? 'down' : inRange ? 'ok' : 'none',
        n2Segments: 10,
      };
    }
    if (this.deep.status === 'counting') {
      return { ...d, middleLeft: `${fmtDepth(this.deep.depthM, u, 0)}`, middleLabel: 'DEEP deco', middleCentre: fmtMinSec(this.deep.remainingS) };
    }
    const ss = this.safety.state;
    if (ss.status === 'counting' || ss.status === 'paused') {
      return { ...d, middleLabel: 'SAFE', middleCentre: fmtMinSec(ss.remainingS) };
    }
    return { ...d, middleLabel: 'no deco', middleCentre: `${Math.min(99, Math.max(0, Math.floor(this.ndlMin)))}`, middleLeft: this.deep.status === 'planned' ? `${fmtDepth(this.deep.depthM, u, 0)} DEEP` : '' };
  }
}
