/**
 * Brand-agnostic dive-computer core. A concrete computer (Suunto, Shearwater, …) extends this class
 * and supplies: the gradient factors / algorithm choice for its conservatism setting, its own
 * alarm, safety-stop and violation rules (brandTick), its no-fly rule, its button handling and
 * its display model.
 */
import {
  AscentRateMeter,
  type DecoPlan,
  type DsatOptions,
  type DsatTissues,
  type Env,
  type Tissues,
  altitudeToPressureBar,
  barPerMetre,
  cnsRatePerMinute,
  decayCns,
  depthToAmbientBar,
  desaturationMinutes,
  dsatLoadLinear,
  dsatNdl,
  dsatPlanAscent,
  dsatSaturated,
  gf99,
  loadDepthChange,
  ndlMinutes,
  otuRatePerMinute,
  pO2At,
  planAscent,
  saturatedTissues,
  surfGF,
  tissueLoading,
} from '../engine';
import { SafetyStopController, type SafetyStopOptions } from './safetyStop';
import type { Alarm, ButtonPress, ComputerSettings, CoreSnapshot, DecoState, Phase, Sample, Severity, SimEvent, TracePoint, ViolationState } from './types';

export interface CorePolicy {
  /** dive starts when deeper than this (m) */
  startDepthM: number;
  /** diver counts as surfaced when shallower than this (m) */
  endDepthM: number;
  /** the dive is closed after this long at the surface (s) */
  endDelayS: number;
  ascentWindowS: number;
  /** ascent rate assumed when computing time-to-surface and stop schedules */
  planningAscentRateMPerMin: number;
  stopIncrementM: number;
  tissueModel: 'zhl16c' | 'dsat';
  dsatOptions?: DsatOptions;
  safetyStop: SafetyStopOptions;
  /** how far above the ceiling counts as a violation (m) */
  ceilingToleranceM: number;
}

export function emptyDeco(): DecoState {
  return { required: false, ceilingM: 0, stopDepthM: 0, stopTimeMin: 0, ttsMin: 0, stops: [], gf99: 0, surfGF: 0 };
}

export function noViolation(): ViolationState {
  return { kind: 'none', label: '', sinceS: 0, aboveCeilingS: 0 };
}

let eventSeq = 0;

export abstract class ComputerCore {
  abstract readonly id: string;

  protected t = 0;
  protected depthM = 0;
  protected tempC = 24;
  protected phase: Phase = 'surface';
  protected env: Env;
  protected tissues: Tissues;
  protected dsat: DsatTissues | null = null;
  protected meter: AscentRateMeter;
  protected ascentRate = 0;
  protected diveTimeS = 0;
  protected maxDepthM = 0;
  protected depthIntegral = 0;
  protected diveNumber = 0;
  protected surfacedAtS: number | null = null;
  protected ndlMin = 999;
  protected deco: DecoState = emptyDeco();
  protected lastPlan: DecoPlan | null = null;
  protected gfAnchorM = 0;
  protected cns = 0;
  protected otu = 0;
  protected pO2 = 0.21;
  protected safety: SafetyStopController;
  protected violation: ViolationState = noViolation();
  protected lockedUntilS: number | null = null;
  protected lockoutLabel = '';
  protected alarms = new Map<string, Alarm>();
  /** continuous seconds over the ascent-rate limit (brands decide the limit) */
  protected ascentOverS = 0;
  protected ascentViolations = 0;
  protected noFlyS = 0;
  protected desatS = 0;
  /** total number of dives that reached decompression (for brand no-fly rules) */
  protected decoDives = 0;
  private pending: SimEvent[] = [];

  constructor(
    protected readonly policy: CorePolicy,
    public settings: ComputerSettings,
  ) {
    this.env = { surfaceBar: altitudeToPressureBar(settings.altitudeM), water: settings.water };
    this.tissues = saturatedTissues(this.env.surfaceBar);
    if (policy.tissueModel === 'dsat') this.dsat = dsatSaturated(this.env.surfaceBar, policy.dsatOptions);
    this.meter = new AscentRateMeter(policy.ascentWindowS);
    this.safety = new SafetyStopController({ ...policy.safetyStop, durationS: settings.safetyStopMinutes * 60 });
    this.safety.enabled = settings.safetyStopMinutes > 0;
  }

  // ---- brand hooks -------------------------------------------------------------------------
  protected abstract gradientFactors(): { low: number; high: number };
  /** Optional per-compartment M-value scaling (see engine/buhlmann.ts). */
  protected mScale(): readonly number[] | undefined {
    return undefined;
  }
  protected abstract brandTick(dtS: number): void;
  protected abstract noFlySeconds(): number;
  abstract press(button: string, kind: ButtonPress): void;
  abstract display(): unknown;
  protected onDiveStart(): void {}
  protected onSurfaced(): void {}
  protected onDiveEnd(): void {}

  // ---- settings --------------------------------------------------------------------------
  updateSettings(patch: Partial<ComputerSettings>): void {
    Object.assign(this.settings, patch);
    if (patch.altitudeM !== undefined || patch.water !== undefined) {
      this.env = { surfaceBar: altitudeToPressureBar(this.settings.altitudeM), water: this.settings.water };
    }
    if (patch.safetyStopMinutes !== undefined) {
      this.safety.setDuration(patch.safetyStopMinutes * 60);
    }
  }

  // ---- main loop -------------------------------------------------------------------------
  tick(sample: Sample, dtS: number): void {
    const prevDepth = this.depthM;
    this.t = sample.t;
    this.depthM = sample.depthM;
    this.tempC = sample.tempC;
    this.meter.push(sample.t, sample.depthM);
    this.ascentRate = this.meter.rateMPerMin();

    const p = this.policy;
    if (this.phase === 'surface') {
      if (this.depthM >= p.startDepthM) this.startDive();
    } else if (this.phase === 'dive') {
      if (this.depthM < p.endDepthM) {
        this.phase = 'surfaced';
        this.surfacedAtS = this.t;
        this.onSurfaced();
      }
    } else if (this.depthM >= p.startDepthM) {
      this.phase = 'dive';
      this.surfacedAtS = null;
      this.emit('info', 'Dive resumed (surface interval was shorter than the end-of-dive delay)');
    } else if (this.t - (this.surfacedAtS ?? this.t) >= p.endDelayS) {
      this.endDive();
    }

    const minutes = dtS / 60;
    const gas = this.settings.gas;
    this.tissues = loadDepthChange(this.tissues, prevDepth, this.depthM, gas, minutes, this.env);
    if (this.dsat) {
      const start = depthToAmbientBar(prevDepth, this.env.surfaceBar, this.env.water);
      const rate = ((this.depthM - prevDepth) * barPerMetre(this.env.water)) / minutes;
      this.dsat = dsatLoadLinear(this.dsat, start, rate, gas, minutes, p.dsatOptions);
    }

    const amb = depthToAmbientBar(this.depthM, this.env.surfaceBar, this.env.water);
    this.pO2 = pO2At(gas, amb);
    if (this.pO2 >= 0.5) this.cns += cnsRatePerMinute(this.pO2) * minutes;
    else this.cns = decayCns(this.cns, minutes);
    this.otu += otuRatePerMinute(this.pO2) * minutes;

    if (this.phase === 'dive') {
      this.diveTimeS += dtS;
      this.maxDepthM = Math.max(this.maxDepthM, this.depthM);
      this.depthIntegral += this.depthM * dtS;
    }

    this.updateDeco();

    const aboveCeiling = this.deco.required && this.depthM < this.deco.ceilingM - p.ceilingToleranceM;
    if (aboveCeiling) this.violation.aboveCeilingS += dtS;
    else this.violation.aboveCeilingS = 0;

    this.brandTick(dtS);

    if (this.phase !== 'dive') {
      this.desatS = desaturationMinutes(this.tissues, this.env.surfaceBar) * 60;
      this.noFlyS = this.diveNumber > 0 ? Math.max(0, this.noFlySeconds()) : 0;
    }
  }

  protected updateDeco(): void {
    const gf = this.gradientFactors();
    const gas = this.settings.gas;
    const amb = depthToAmbientBar(this.depthM, this.env.surfaceBar, this.env.water);
    let plan: DecoPlan;
    if (this.dsat) {
      this.ndlMin = dsatNdl(this.dsat, amb, gas, this.env.surfaceBar, this.policy.dsatOptions);
      plan = dsatPlanAscent(this.dsat, this.depthM, gas, {
        surfaceBar: this.env.surfaceBar,
        water: this.env.water,
        ascentRateMPerMin: this.policy.planningAscentRateMPerMin,
        lastStopM: this.settings.lastStopM,
        incrementM: this.policy.stopIncrementM,
        dsat: this.policy.dsatOptions,
      });
    } else {
      const ms = this.mScale();
      this.ndlMin = ndlMinutes(this.tissues, amb, gas, gf.high, this.env, 999, ms);
      plan = planAscent(this.tissues, this.depthM, gas, {
        gfLow: gf.low,
        gfHigh: gf.high,
        ascentRateMPerMin: this.policy.planningAscentRateMPerMin,
        lastStopM: this.settings.lastStopM,
        incrementM: this.policy.stopIncrementM,
        env: this.env,
        gfAnchorM: this.gfAnchorM,
        mScale: ms,
      });
      if (plan.decoRequired && this.phase === 'dive' && plan.firstStopM > this.gfAnchorM) this.gfAnchorM = plan.firstStopM;
    }
    this.lastPlan = plan;
    const wasRequired = this.deco.required;
    this.deco = {
      required: plan.decoRequired,
      ceilingM: plan.ceilingM,
      stopDepthM: plan.stops[0]?.depthM ?? 0,
      stopTimeMin: plan.stops[0]?.minutes ?? 0,
      ttsMin: plan.ttsMin,
      stops: plan.stops,
      gf99: gf99(this.tissues, amb),
      surfGF: surfGF(this.tissues, this.env.surfaceBar),
    };
    if (plan.decoRequired && !wasRequired && this.phase === 'dive') {
      this.decoDives++;
      this.emit('warning', 'No-decompression limit exceeded – decompression stop required');
    } else if (!plan.decoRequired && wasRequired && this.phase === 'dive') {
      this.emit('info', 'Decompression obligation cleared');
    }
  }

  private startDive(): void {
    this.phase = 'dive';
    this.surfacedAtS = null;
    this.diveNumber++;
    this.diveTimeS = 0;
    this.maxDepthM = this.depthM;
    this.depthIntegral = 0;
    this.gfAnchorM = 0;
    this.ascentOverS = 0;
    this.ascentViolations = 0;
    this.safety.reset();
    if (!this.isLocked()) this.violation = noViolation();
    this.alarms.clear();
    this.emit('info', `Dive ${this.diveNumber} started`);
    this.onDiveStart();
  }

  private endDive(): void {
    this.phase = 'surface';
    this.emit('info', `Dive ${this.diveNumber} ended (${Math.round(this.diveTimeS / 60)} min, max ${this.maxDepthM.toFixed(1)} m)`);
    this.onDiveEnd();
  }

  // ---- helpers for brands ----------------------------------------------------------------
  /** Track time spent over an ascent-rate limit; returns true while over the limit. */
  protected trackAscent(limitMPerMin: number, dtS: number): boolean {
    const over = this.phase === 'dive' && this.ascentRate > limitMPerMin;
    if (over) {
      if (this.ascentOverS === 0) this.ascentViolations++;
      this.ascentOverS += dtS;
    } else this.ascentOverS = 0;
    return over;
  }

  protected lock(hours: number, label: string): void {
    this.lockedUntilS = this.t + hours * 3600;
    this.lockoutLabel = label;
    this.violation = { ...this.violation, kind: 'lockout', label, sinceS: this.t };
    this.emit('critical', `${label}: computer locked for ${hours} h`);
  }

  isLocked(): boolean {
    return this.lockedUntilS !== null && this.t < this.lockedUntilS;
  }

  protected lockoutRemainingS(): number {
    return this.lockedUntilS === null ? 0 : Math.max(0, this.lockedUntilS - this.t);
  }

  protected raise(id: string, severity: Severity, text: string, audible = true): void {
    if (this.alarms.has(id)) return;
    this.alarms.set(id, { id, severity, text, sinceS: this.t, audible });
    this.emit(severity, text);
  }

  protected clear(id: string): void {
    this.alarms.delete(id);
  }

  protected has(id: string): boolean {
    return this.alarms.has(id);
  }

  protected emit(severity: Severity, text: string): void {
    this.pending.push({ id: ++eventSeq, t: this.t, severity, text, source: this.id });
  }

  drainEvents(): SimEvent[] {
    const out = this.pending;
    this.pending = [];
    return out;
  }

  protected surfaceIntervalS(): number {
    if (this.phase === 'dive' || this.surfacedAtS === null) return 0;
    return this.t - this.surfacedAtS;
  }

  /** NDL the computer would show for an immediate descent to `depthM` (plan mode). */
  ndlAtDepth(depthM: number): number {
    const amb = depthToAmbientBar(depthM, this.env.surfaceBar, this.env.water);
    if (this.dsat) return dsatNdl(this.dsat, amb, this.settings.gas, this.env.surfaceBar, this.policy.dsatOptions);
    return ndlMinutes(this.tissues, amb, this.settings.gas, this.gradientFactors().high, this.env, 999, this.mScale());
  }

  get currentPhase(): Phase {
    return this.phase;
  }

  trace(): TracePoint {
    return {
      t: this.t,
      depthM: this.depthM,
      ndlMin: this.ndlMin,
      ceilingM: this.deco.ceilingM,
      stopDepthM: this.deco.stopDepthM,
      ttsMin: this.deco.ttsMin,
      inDeco: this.deco.required,
      safety: this.safety.state.status,
      ascentRate: this.ascentRate,
    };
  }

  snapshot(): CoreSnapshot {
    return {
      t: this.t,
      phase: this.phase,
      depthM: this.depthM,
      maxDepthM: this.maxDepthM,
      avgDepthM: this.diveTimeS > 0 ? this.depthIntegral / this.diveTimeS : 0,
      tempC: this.tempC,
      diveTimeS: this.diveTimeS,
      diveNumber: this.diveNumber,
      surfaceIntervalS: this.surfaceIntervalS(),
      ascentRateMPerMin: this.ascentRate,
      ndlMin: this.ndlMin,
      deco: this.deco,
      safetyStop: { ...this.safety.state },
      violation: { ...this.violation },
      locked: this.isLocked(),
      lockoutRemainingS: this.lockoutRemainingS(),
      cnsPercent: this.cns,
      otu: this.otu,
      pO2: this.pO2,
      noFlyS: this.noFlyS,
      desatS: this.desatS,
      tissueLoading: tissueLoading(this.tissues, this.env.surfaceBar),
      alarms: [...this.alarms.values()],
    };
  }
}
