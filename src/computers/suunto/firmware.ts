/**
 * Suunto Zoop Novo – behaviour reconstructed from the Zoop Novo user guide (2021), the Zoop (2011)
 * NDL tables and Suunto's own learning tool. See docs/research/suunto.md.
 *
 * Key behaviours: RGBM-style conservatism (P0/P1/P2 calibrated to the published tables), 10 m/min
 * ascent limit with a mandatory safety stop after >5 s over the limit, recommended 3-min safety
 * stop (3–6 m, dives >10 m), deepstops (half max depth, dives >20 m), continuous ceiling with
 * ASC TIME, "Er" after 3 min above the ceiling and a 48-h algorithm lock, no-fly ≥ 12 h.
 */
import { SUUNTO_P0, SUUNTO_P1, SUUNTO_P2 } from '../../engine';
import { ComputerCore, type CorePolicy } from '../../sim/core';
import { depthUnit, fmtDepth, fmtHoursMin, fmtMinSec, pad2, tempValue } from '../../sim/format';
import type { ButtonPress, ComputerSettings, Units } from '../../sim/types';

const POLICY: CorePolicy = {
  startDepthM: 1.2,
  endDepthM: 1.2,
  endDelayS: 300,
  ascentWindowS: 6,
  planningAscentRateMPerMin: 10,
  stopIncrementM: 3,
  tissueModel: 'zhl16c',
  safetyStop: {
    durationS: 180,
    deepM: 6,
    shallowM: 3,
    requiredMaxDepthM: 10,
    whenShallower: 'clear',
    whenDeeper: 'pause',
    resetDeeperThanM: 10,
    surfaceM: 1.2,
  },
  ceilingToleranceM: 0.2,
};

export const ZOOP_ASCENT_LIMIT = 10;
export const ZOOP_PLAN_DEPTHS = [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45];

export type ZoopMode = 'time' | 'dive' | 'plan' | 'mem';
export type ZoopView = 'max-time' | 'max-temp' | 'o2-po2' | 'clock';
export type ZoopArrow = 'up' | 'down' | 'both' | null;

export interface ZoopCentre {
  kind: 'ndl' | 'deco' | 'stop' | 'mandatory' | 'deepstop' | 'deepstop-plan' | 'surface' | 'error' | 'time' | 'plan' | 'mem' | 'predive';
  big?: string;
  left?: string;
  right?: string;
  rightBlink?: boolean;
  arrow?: ZoopArrow;
  text?: string;
  textBlink?: boolean;
  line1?: string;
  line2?: string;
}

export interface ZoopDisplay {
  mode: ZoopMode;
  units: Units;
  depth: string;
  depthUnit: string;
  depthBlink: boolean;
  labels: { ceiling: boolean; stop: boolean; ascTime: boolean; ascTimeBlink: boolean; noDecTime: boolean };
  centre: ZoopCentre;
  ascentSegments: number;
  ascentBlink: boolean;
  slow: boolean;
  bottomLeft: { value: string; label: string; unit: string };
  bottomRight: { value: string; label: string; unit: string };
  icons: { noFly: boolean; attention: boolean; ac: boolean; battery: boolean; alarm: boolean; er: boolean };
  o2Percent: number;
}

interface DeepStop {
  status: 'none' | 'planned' | 'counting' | 'paused' | 'done' | 'violated';
  depthM: number;
  remainingS: number;
}

export class SuuntoZoopNovo extends ComputerCore {
  readonly id = 'suunto-zoop-novo';
  private mode: ZoopMode = 'dive';
  private view: ZoopView = 'max-time';
  private planIndex = 2;
  private deep: DeepStop = { status: 'none', depthM: 0, remainingS: 60 };
  private mandatoryPending = false;
  private mandatoryViolatedAtS: number | null = null;
  private erPermanent = false;
  private penaltyUntilS = 0;
  private attention = false;
  private slow = false;
  private lastLog: { number: number; maxDepthM: number; timeS: number } | null = null;

  constructor(settings: ComputerSettings) {
    super(POLICY, { ...settings, safetyStopMinutes: 3 });
  }

  protected gradientFactors(): { low: number; high: number } {
    return { low: 1, high: 1 };
  }

  protected mScale(): readonly number[] {
    const base = this.settings.conservatism === 2 ? SUUNTO_P2 : this.settings.conservatism === 1 ? SUUNTO_P1 : SUUNTO_P0;
    if (this.t < this.penaltyUntilS) return base.map((s) => s * 0.85);
    return base;
  }

  protected brandTick(dtS: number): void {
    const diving = this.phase === 'dive';
    if (diving) this.mode = 'dive';

    // ---- ascent rate: 10 m/min; >5 s continuous -> mandatory safety stop ----
    const over = this.trackAscent(ZOOP_ASCENT_LIMIT, dtS);
    this.slow = over;
    if (over) {
      this.raise('slow', 'warning', 'SLOW – ascent faster than 10 m/min (high-priority alarm)');
      if (this.ascentOverS >= 5 && !this.mandatoryPending && !this.deco.required) {
        const extra = Math.min(180, Math.round((this.ascentRate - ZOOP_ASCENT_LIMIT) * 12 + 30));
        this.safety.makeMandatory(extra);
        this.mandatoryPending = true;
        this.emit('warning', `Mandatory safety stop added (${Math.round((this.safety.state.durationS) / 60)} min at 3–6 m) – ascent rate exceeded for more than 5 s`);
      }
    } else {
      this.clear('slow');
      this.mandatoryPending = false;
    }

    // ---- safety stops (recommended + mandatory) ----
    const prev = this.safety.state.status;
    const ss = this.safety.update(this.depthM, this.maxDepthM, dtS, this.deco.required || this.erPermanent);
    if (ss.status === 'counting' && prev !== 'counting' && prev !== 'paused') {
      this.emit('info', ss.mandatory ? 'Mandatory safety stop: wait at the ceiling (3 m) until STOP disappears' : 'Recommended 3-minute safety stop started (STOP icon)');
    }
    if (ss.status === 'done' && prev === 'counting') this.emit('info', 'Safety stop complete');
    if (ss.status === 'violated' && prev !== 'violated') {
      this.mandatoryViolatedAtS = this.t;
      this.attention = true;
      this.penaltyUntilS = this.t + 24 * 3600;
      this.raise('ss-violated', 'critical', 'Mandatory safety stop violated – descend (arrow down, "start descending" beeps for 3 min). Next dives are penalised.');
    }
    if (this.mandatoryViolatedAtS !== null && this.t - this.mandatoryViolatedAtS > 180) this.clear('ss-violated');

    // ---- deepstops: dives deeper than 20 m, stop at half the max depth, 1 min ----
    if (this.settings.deepStops && diving && !this.deco.required && !this.erPermanent) {
      const d = this.deep;
      const planned = Math.round(this.maxDepthM / 2);
      if (this.maxDepthM > 20 && d.status === 'none') {
        d.status = 'planned';
        d.depthM = planned;
      }
      if (d.status === 'planned') {
        d.depthM = planned;
        if (this.depthM <= d.depthM + 1.5 && this.depthM >= d.depthM - 1) {
          d.status = 'counting';
          d.remainingS = 60;
          this.emit('info', `Deepstop at ${d.depthM} m reached – 1-minute countdown (two short beeps)`);
        }
      } else if (d.status === 'counting') {
        if (this.depthM < d.depthM - 1.5) {
          d.status = 'violated';
          this.raise('deep-violated', 'warning', 'Deepstop violated – DEEPSTOP blinks, arrow down. Suunto penalises skipped stops on following dives.');
          this.penaltyUntilS = this.t + 24 * 3600;
        } else if (this.depthM > d.depthM + 3) d.status = 'paused';
        else {
          d.remainingS -= dtS;
          if (d.remainingS <= 0) {
            d.status = 'done';
            this.emit('info', 'Deepstop complete');
          }
        }
      } else if (d.status === 'paused' && this.depthM <= d.depthM + 1.5) d.status = 'counting';
      if (d.status === 'violated' && this.depthM < d.depthM - 6) this.clear('deep-violated');
    }

    // ---- decompression states ----
    if (diving && this.deco.required && !this.erPermanent) {
      const ceiling = this.deco.stopDepthM;
      if (this.depthM < ceiling - this.policy.ceilingToleranceM) {
        this.raise('er', 'critical', 'Above the ceiling – Er blinks: descend within 3 minutes or the algorithm locks');
        if (this.violation.aboveStopS >= 180) {
          this.erPermanent = true;
          this.clear('er');
          this.emit('critical', 'Decompression omitted for more than 3 minutes – algorithm locked (Er). Depth and time continue to work.');
        }
      } else {
        this.clear('er');
        if (this.depthM > ceiling + 3) this.raise('floor', 'info', 'Below the decompression floor – ASC TIME blinks, ascend', true);
        else this.clear('floor');
      }
    } else {
      this.clear('er');
      this.clear('floor');
    }
    if (!diving) this.slow = false;
  }

  protected onDiveStart(): void {
    this.deep = { status: 'none', depthM: 0, remainingS: 60 };
    this.mandatoryPending = false;
    this.mandatoryViolatedAtS = null;
    this.erPermanent = this.isLocked();
    this.view = 'max-time';
  }

  protected onDiveEnd(): void {
    this.lastLog = { number: this.diveNumber, maxDepthM: this.maxDepthM, timeS: this.diveTimeS };
    if (this.erPermanent || this.deco.required) {
      this.lock(48, 'Er – decompression omitted');
    }
    this.erPermanent = false;
  }

  protected noFlySeconds(): number {
    if (this.isLocked()) return this.lockoutRemainingS();
    if (this.desatS < 70 * 60) return 0;
    const si = this.surfaceIntervalS();
    return Math.max(12 * 3600 - si, this.desatS);
  }

  press(button: string, _kind: ButtonPress): void {
    const diving = this.phase === 'dive';
    if (button === 'mode') {
      if (diving) return; // backlight
      const order: ZoopMode[] = ['time', 'dive', 'plan', 'mem'];
      this.mode = order[(order.indexOf(this.mode) + 1) % order.length];
      return;
    }
    if (button === 'select') {
      if (diving) this.emit('info', 'Bookmark added to the dive log');
      return;
    }
    if (this.mode === 'plan') {
      if (button === 'up') this.planIndex = Math.min(ZOOP_PLAN_DEPTHS.length - 1, this.planIndex + 1);
      if (button === 'down') this.planIndex = Math.max(0, this.planIndex - 1);
      return;
    }
    if (this.mode === 'dive') {
      const views: ZoopView[] = this.settings.gas.fO2 > 0.215 ? ['max-time', 'max-temp', 'o2-po2', 'clock'] : ['max-time', 'max-temp', 'clock'];
      const i = views.indexOf(this.view);
      this.view = views[(i + (button === 'up' ? 1 : views.length - 1)) % views.length];
    }
  }

  private clock(): string {
    const total = (10 * 3600 + Math.floor(this.t)) % 86400;
    return `${Math.floor(total / 3600)}:${pad2(Math.floor((total % 3600) / 60))}`;
  }

  private ndlText(min: number): string {
    return min > 99 ? '–' : `${Math.max(0, Math.floor(min))}`;
  }

  display(): ZoopDisplay {
    const u = this.settings.units;
    const diving = this.phase === 'dive';
    const nitrox = this.settings.gas.fO2 > 0.215;
    const ss = this.safety.state;
    const labels = { ceiling: false, stop: false, ascTime: false, ascTimeBlink: false, noDecTime: false };
    let centre: ZoopCentre = { kind: 'ndl', big: '–' };
    let depthBlink = false;
    const locked = this.isLocked() || this.erPermanent;

    if (this.mode === 'time') {
      centre = { kind: 'time', big: this.clock() };
    } else if (this.mode === 'plan') {
      const d = ZOOP_PLAN_DEPTHS[this.planIndex];
      centre = locked ? { kind: 'error', text: 'Er' } : { kind: 'plan', big: this.ndlText(this.ndlAtDepth(d)), line1: 'PLAN NODEC' };
      labels.noDecTime = !locked;
    } else if (this.mode === 'mem') {
      centre = { kind: 'mem', line1: this.lastLog ? `DIVE ${this.lastLog.number}` : 'No dives', line2: this.lastLog ? `${fmtDepth(this.lastLog.maxDepthM, u)} ${depthUnit(u)}  ${Math.round(this.lastLog.timeS / 60)}'` : '' };
    } else if (!diving && this.phase === 'surface' && this.diveNumber === 0) {
      centre = { kind: 'predive', line1: 'DIVE', line2: nitrox ? 'Nitrox' : 'Air' };
    } else if (!diving) {
      centre = { kind: 'surface', line1: `Surf t. ${fmtHoursMin(this.surfaceIntervalS())}`, line2: this.noFlyS > 0 ? `No Fly ${fmtHoursMin(this.noFlyS)}` : '' };
      if (locked) centre = { kind: 'error', text: 'Er', line1: `Surf t. ${fmtHoursMin(this.surfaceIntervalS())}` };
    } else if (locked) {
      centre = { kind: 'error', text: 'Er' };
    } else if (this.deco.required) {
      const ceiling = this.deco.stopDepthM;
      labels.ceiling = true;
      labels.ascTime = true;
      labels.stop = this.depthM <= ceiling + 1.2;
      let arrow: ZoopArrow = null;
      let rightBlink = false;
      let right = `${Math.ceil(this.deco.ttsMin)}`;
      if (this.depthM < ceiling - this.policy.ceilingToleranceM) {
        arrow = 'down';
        right = 'Er';
        rightBlink = true;
        depthBlink = true;
      } else if (this.depthM <= ceiling + 1.2) arrow = 'both';
      else if (this.depthM > ceiling + 3) {
        arrow = 'up';
        labels.ascTimeBlink = true;
      }
      centre = { kind: 'deco', left: fmtDepth(ceiling, u, u === 'metric' ? 1 : 0), right, rightBlink, arrow };
    } else if (ss.mandatory && (ss.status === 'counting' || ss.status === 'paused' || ss.status === 'pending' || ss.status === 'violated')) {
      labels.ceiling = true;
      labels.stop = true;
      const arrow: ZoopArrow = ss.status === 'violated' ? 'down' : ss.status === 'counting' ? 'both' : null;
      const timeText = this.settings.deepStops ? `${Math.ceil(ss.remainingS)}` : `${Math.ceil(ss.remainingS / 60)}`;
      centre = { kind: 'mandatory', left: fmtDepth(3, u, u === 'metric' ? 1 : 0), right: timeText, arrow, text: ss.status === 'pending' ? 'ASCEND TO 3–6 m' : undefined };
    } else if (this.deep.status === 'counting' || this.deep.status === 'paused') {
      labels.ceiling = true;
      labels.stop = true;
      centre = { kind: 'deepstop', left: `${fmtDepth(this.deep.depthM, u, 0)}`, right: `${Math.ceil(this.deep.remainingS)}`, arrow: 'both', text: 'DEEPSTOP' };
    } else if (ss.status === 'counting' && !ss.mandatory) {
      labels.stop = true;
      centre = { kind: 'stop', big: `${Math.ceil(ss.remainingS / 60)}`, text: 'TIME' };
    } else if (this.deep.status === 'planned' && this.depthM > this.deep.depthM + 1.5) {
      labels.ceiling = true;
      labels.noDecTime = true;
      centre = { kind: 'deepstop-plan', left: `${fmtDepth(this.deep.depthM, u, 0)}`, right: this.ndlText(this.ndlMin), text: 'DEEPSTOP', textBlink: this.deep.status === 'planned' && this.has('deep-violated') };
    } else {
      labels.noDecTime = true;
      centre = { kind: 'ndl', big: this.ndlText(this.ndlMin), textBlink: this.has('deep-violated'), text: this.has('deep-violated') ? 'DEEPSTOP' : undefined };
    }

    const rate = Math.max(0, this.ascentRate);
    const segments = diving ? Math.min(15, Math.round(rate)) : 0;

    let bottomLeft = { value: fmtDepth(this.maxDepthM, u), label: 'MAX', unit: depthUnit(u) };
    let bottomRight = { value: `${Math.round(this.diveTimeS / 60)}`, label: 'DIVE TIME', unit: '' };
    if (this.mode === 'time') {
      bottomLeft = { value: '9.10', label: '', unit: '' };
      bottomRight = { value: 'FR', label: '', unit: '' };
    } else if (this.mode === 'plan') {
      bottomLeft = { value: `${Math.round(this.settings.gas.fO2 * 100)}`, label: 'O2%', unit: '' };
      bottomRight = { value: `${this.diveNumber + 1}`, label: '', unit: '' };
    } else if (this.view === 'max-temp') {
      bottomRight = { value: `${Math.round(tempValue(this.tempC, u))}`, label: '', unit: u === 'metric' ? '°C' : '°F' };
    } else if (this.view === 'o2-po2') {
      bottomLeft = { value: `${Math.round(this.settings.gas.fO2 * 100)}`, label: 'O2%', unit: '' };
      bottomRight = { value: this.pO2.toFixed(1), label: 'PO2', unit: '' };
    } else if (this.view === 'clock') {
      bottomLeft = { value: this.clock(), label: '', unit: '' };
      bottomRight = { value: `${Math.round(this.diveTimeS / 60)}`, label: 'DIVE TIME', unit: '' };
    }

    const depthShown = this.mode === 'plan' ? ZOOP_PLAN_DEPTHS[this.planIndex] : this.depthM;
    return {
      mode: this.mode,
      units: u,
      depth: this.mode === 'time' || this.mode === 'mem' ? '' : fmtDepth(depthShown, u),
      depthUnit: depthUnit(u),
      depthBlink,
      labels,
      centre,
      ascentSegments: segments,
      ascentBlink: this.slow,
      slow: this.slow,
      bottomLeft,
      bottomRight,
      icons: {
        noFly: this.noFlyS > 0 && !diving,
        attention: this.attention && !diving,
        ac: diving || this.phase === 'surfaced',
        battery: false,
        alarm: this.alarms.size > 0,
        er: locked,
      },
      o2Percent: Math.round(this.settings.gas.fO2 * 100),
    };
  }

  /** Plan-mode table for the UI (depth → NDL text). */
  planTable(): Array<{ depthM: number; ndl: string }> {
    return ZOOP_PLAN_DEPTHS.map((d) => ({ depthM: d, ndl: this.ndlText(this.ndlAtDepth(d)) }));
  }

  get selectedPlanDepth(): number {
    return ZOOP_PLAN_DEPTHS[this.planIndex];
  }

  // seconds formatting helper exposed for the skin
  static fmt(s: number): string {
    return fmtMinSec(s);
  }
}
