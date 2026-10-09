import type { SafetyStopState } from './types';

export interface SafetyStopOptions {
  durationS: number;
  /** the countdown runs while shallowM <= depth <= deepM */
  deepM: number;
  shallowM: number;
  /** a stop is only proposed after the dive has been deeper than this */
  requiredMaxDepthM: number;
  /** behaviour when the diver rises above shallowM before the stop is complete */
  whenShallower: 'clear' | 'pause' | 'reset';
  /** behaviour when the diver sinks below deepM (but not deeper than resetDeeperThanM) */
  whenDeeper: 'pause' | 'reset';
  /** descending deeper than this cancels the stop; a new one is proposed on the next ascent */
  resetDeeperThanM: number;
  /** depth considered "surfaced" for violation purposes */
  surfaceM: number;
}

/**
 * Brand-configurable safety-stop state machine. Deco obligations supersede it: while deco is
 * required the countdown is paused.
 */
export class SafetyStopController {
  state: SafetyStopState;
  enabled = true;

  constructor(public opts: SafetyStopOptions) {
    this.state = this.fresh();
  }

  private fresh(): SafetyStopState {
    return {
      status: 'none',
      remainingS: this.opts.durationS,
      durationS: this.opts.durationS,
      mandatory: false,
      shallowM: this.opts.shallowM,
      deepM: this.opts.deepM,
    };
  }

  reset(): void {
    this.state = this.fresh();
  }

  setDuration(durationS: number): void {
    this.opts.durationS = durationS;
    this.enabled = durationS > 0;
    if (this.state.status === 'none') this.state = this.fresh();
  }

  /** Turn the current/next stop into a mandatory one (e.g. after an ascent-rate violation). */
  makeMandatory(extraS = 0): void {
    const s = this.state;
    if (!s.mandatory) s.mandatory = true;
    if (s.status === 'done') {
      s.status = 'pending';
      s.remainingS = Math.max(60, extraS);
      s.durationS = s.remainingS;
      return;
    }
    s.durationS += extraS;
    s.remainingS += extraS;
    if (s.status === 'none') s.status = 'pending';
  }

  update(depthM: number, maxDepthM: number, dtS: number, inDeco: boolean): SafetyStopState {
    const s = this.state;
    if (!this.enabled && !s.mandatory) {
      s.status = 'none';
      return s;
    }
    const o = this.opts;
    const inBand = depthM <= o.deepM + 1e-6 && depthM >= o.shallowM - 1e-6;
    const shallower = depthM < o.shallowM - 1e-6;
    const deeper = depthM > o.deepM + 1e-6;
    const surfaced = depthM < o.surfaceM;

    if (inDeco) {
      if (s.status === 'counting') s.status = 'paused';
      return s;
    }

    switch (s.status) {
      case 'none':
        if (inBand && maxDepthM >= o.requiredMaxDepthM) {
          s.status = 'counting';
          s.remainingS = s.durationS;
        }
        break;
      case 'pending':
        if (inBand) s.status = 'counting';
        else if (surfaced && s.mandatory) s.status = 'violated';
        break;
      case 'counting':
        if (inBand) {
          s.remainingS -= dtS;
          if (s.remainingS <= 0) {
            s.remainingS = 0;
            s.status = 'done';
          }
        } else if (shallower) {
          if (s.mandatory) s.status = surfaced ? 'violated' : 'paused';
          else if (o.whenShallower === 'clear') this.state = { ...this.fresh(), status: 'none' };
          else if (o.whenShallower === 'reset') {
            s.remainingS = s.durationS;
            s.status = 'paused';
          } else s.status = 'paused';
        } else if (deeper) {
          if (depthM > o.resetDeeperThanM) {
            s.remainingS = s.durationS;
            s.status = s.mandatory ? 'pending' : 'none';
          } else {
            if (o.whenDeeper === 'reset') s.remainingS = s.durationS;
            s.status = 'paused';
          }
        }
        break;
      case 'paused':
        if (inBand) s.status = 'counting';
        else if (deeper && depthM > o.resetDeeperThanM) {
          s.remainingS = s.durationS;
          s.status = s.mandatory ? 'pending' : 'none';
        } else if (surfaced) {
          s.status = s.mandatory ? 'violated' : 'none';
          if (!s.mandatory) s.remainingS = s.durationS;
        }
        break;
      case 'done':
        if (deeper && depthM > o.resetDeeperThanM) this.state = this.fresh();
        break;
      case 'violated':
        break;
    }
    return this.state;
  }
}
