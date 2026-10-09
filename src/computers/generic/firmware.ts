/**
 * "Generic trainer" – a deliberately plain computer modelled on the generic simulator PADI uses
 * in its Open Water eLearning: DSAT (RDP) no-stop limits, 18 m/min ascent limit, a 3-minute
 * safety stop between 6 m and 3 m. Useful as a baseline before looking at real products.
 */
import { ComputerCore, type CorePolicy } from '../../sim/core';
import { depthUnit, fmtDepth, fmtHoursMin, fmtMinSec, fmtMinutes, fmtTemp } from '../../sim/format';
import type { ButtonPress, ComputerSettings } from '../../sim/types';

const POLICY: CorePolicy = {
  startDepthM: 1.2,
  endDepthM: 0.9,
  endDelayS: 60,
  ascentWindowS: 10,
  planningAscentRateMPerMin: 9,
  stopIncrementM: 3,
  tissueModel: 'dsat',
  safetyStop: {
    durationS: 180,
    deepM: 6,
    shallowM: 3,
    requiredMaxDepthM: 10,
    whenShallower: 'pause',
    whenDeeper: 'pause',
    resetDeeperThanM: 10,
    surfaceM: 1,
  },
  ceilingToleranceM: 0.3,
};

export const GENERIC_ASCENT_LIMIT = 18;
export const GENERIC_PLAN_DEPTHS = [12, 15, 18, 21, 24, 27, 30, 33, 36, 40];

export type GenericScreen = 'surface' | 'dive' | 'plan' | 'log';

export interface GenericDisplay {
  screen: GenericScreen;
  unit: string;
  depth: string;
  maxDepth: string;
  diveTime: string;
  temp: string;
  /** main status line */
  status: 'no-stop' | 'deco' | 'safety' | 'ceiling' | 'surface' | 'missed';
  primaryLabel: string;
  primaryValue: string;
  stopDepth: string;
  stopTime: string;
  tts: string;
  ascentSegments: number;
  ascentAlarm: boolean;
  surfaceInterval: string;
  noFly: string;
  desat: string;
  plan: Array<{ depth: string; ndl: string }>;
  log: { number: number; maxDepth: string; time: string } | null;
  message: string | null;
  diveNumber: number;
}

export class GenericTrainer extends ComputerCore {
  readonly id = 'generic';
  private screen: GenericScreen = 'surface';
  private lastLog: { number: number; maxDepthM: number; timeS: number } | null = null;

  constructor(settings: ComputerSettings) {
    super(POLICY, settings);
  }

  protected gradientFactors(): { low: number; high: number } {
    return { low: 1, high: 1 };
  }

  protected brandTick(dtS: number): void {
    const over = this.trackAscent(GENERIC_ASCENT_LIMIT, dtS);
    if (over) this.raise('ascent', 'warning', `SLOW DOWN – ascending faster than ${GENERIC_ASCENT_LIMIT} m/min`);
    else this.clear('ascent');

    const ss = this.safety.update(this.depthM, this.maxDepthM, dtS, this.deco.required);
    if (ss.status === 'counting' && !this.has('safety')) this.raise('safety', 'info', 'Safety stop started: 3 min between 6 m and 3 m', false);
    if (ss.status === 'done' && this.has('safety')) {
      this.clear('safety');
      this.emit('info', 'Safety stop complete – you may surface');
    }
    if (ss.status === 'none' && this.has('safety')) this.clear('safety');

    if (this.phase === 'dive') {
      this.screen = 'dive';
      if (!this.deco.required && this.ndlMin <= 5) this.raise('ndl', 'warning', 'No-stop time 5 min or less – start your ascent');
      else this.clear('ndl');
      if (this.deco.required) this.raise('deco', 'critical', `Decompression stop required at ${this.deco.stopDepthM} m`);
      else this.clear('deco');
      if (this.violation.aboveCeilingS > 0) this.raise('ceiling', 'critical', 'You are above the ceiling – descend now');
      else this.clear('ceiling');
    } else if (this.screen === 'dive' && this.phase === 'surface') {
      this.screen = 'surface';
    }
  }

  protected onDiveEnd(): void {
    this.lastLog = { number: this.diveNumber, maxDepthM: this.maxDepthM, timeS: this.diveTimeS };
    if (this.deco.required) {
      this.violation = { ...this.violation, kind: 'missed-stop', label: 'MISSED DECO', sinceS: this.t };
      this.emit('critical', 'Surfaced with a decompression obligation. PADI: breathe oxygen, watch for DCS symptoms, no diving for 24 h.');
    }
  }

  protected noFlySeconds(): number {
    // DAN / PADI guidance: 12 h after a single no-stop dive, 18 h after repetitive dives, longer after deco
    const hours = this.decoDives > 0 ? 24 : this.diveNumber > 1 ? 18 : 12;
    return hours * 3600 - this.surfaceIntervalS();
  }

  press(button: string, _kind: ButtonPress): void {
    if (this.phase === 'dive') return;
    if (button === 'mode') {
      const order: GenericScreen[] = ['surface', 'plan', 'log'];
      this.screen = order[(order.indexOf(this.screen) + 1) % order.length];
    }
  }

  display(): GenericDisplay {
    const u = this.settings.units;
    const ss = this.safety.state;
    const inDive = this.phase !== 'surface';
    let status: GenericDisplay['status'] = inDive ? 'no-stop' : 'surface';
    let primaryLabel = 'NO STOP';
    let primaryValue = fmtMinutes(this.ndlMin, 99);
    let message: string | null = null;
    if (this.violation.kind === 'missed-stop' && !inDive) {
      status = 'missed';
      primaryLabel = 'MISSED DECO';
      primaryValue = '--';
      message = 'Do not dive for 24 h';
    } else if (this.deco.required) {
      status = this.violation.aboveCeilingS > 0 ? 'ceiling' : 'deco';
      primaryLabel = 'DECO STOP';
      primaryValue = `${fmtDepth(this.deco.stopDepthM, u, 0)} ${depthUnit(u)}`;
      message = this.violation.aboveCeilingS > 0 ? 'ABOVE CEILING – DESCEND' : null;
    } else if (ss.status === 'counting' || ss.status === 'paused') {
      status = 'safety';
      primaryLabel = 'SAFETY STOP';
      primaryValue = fmtMinSec(ss.remainingS);
      message = ss.status === 'paused' ? 'Return to 3–6 m to resume' : null;
    } else if (ss.status === 'done' && inDive) {
      message = 'Safety stop complete';
    }
    if (this.has('ascent')) message = 'SLOW DOWN';
    const segments = Math.min(5, Math.max(0, Math.round((this.ascentRate / GENERIC_ASCENT_LIMIT) * 5)));
    return {
      screen: this.screen,
      unit: depthUnit(u),
      depth: fmtDepth(this.depthM, u),
      maxDepth: fmtDepth(this.maxDepthM, u),
      diveTime: fmtMinSec(this.diveTimeS),
      temp: fmtTemp(this.tempC, u),
      status,
      primaryLabel,
      primaryValue,
      stopDepth: fmtDepth(this.deco.stopDepthM, u, 0),
      stopTime: `${Math.ceil(this.deco.stopTimeMin)}`,
      tts: `${Math.ceil(this.deco.ttsMin)}`,
      ascentSegments: this.ascentRate > 0.5 ? segments : 0,
      ascentAlarm: this.has('ascent'),
      surfaceInterval: this.diveNumber > 0 ? fmtHoursMin(this.surfaceIntervalS()) : '--:--',
      noFly: this.diveNumber > 0 ? fmtHoursMin(this.noFlyS) : '--:--',
      desat: this.diveNumber > 0 ? fmtHoursMin(this.desatS) : '--:--',
      plan: GENERIC_PLAN_DEPTHS.map((d) => ({ depth: `${fmtDepth(d, u, 0)}`, ndl: fmtMinutes(this.ndlAtDepth(d), 99) })),
      log: this.lastLog ? { number: this.lastLog.number, maxDepth: fmtDepth(this.lastLog.maxDepthM, u), time: fmtMinSec(this.lastLog.timeS) } : null,
      message,
      diveNumber: this.diveNumber,
    };
  }
}
