/**
 * DSAT model (Rogers & Powell) – the model behind the PADI Recreational Dive Planner and the
 * "DSAT" algorithm option on Oceanic / Aqua Lung / Pelagic computers.
 *
 * 14 nitrogen compartments with surfacing M-values (M0) only; it is a no-decompression model.
 * M0 values as tabulated by E. C. Baker, "Understanding M-values" (fsw, absolute).
 * Educational implementation – not for planning real dives.
 */
import { SURFACE_PRESSURE_BAR, WATER_VAPOUR_BAR } from './constants';
import { AIR, type Gas, fN2 } from './gas';

export const DSAT_HALF_TIMES: readonly number[] = [5, 10, 20, 30, 40, 60, 80, 100, 120, 160, 200, 240, 360, 480];
export const DSAT_M0_FSW: readonly number[] = [99.08, 82.63, 66.89, 59.74, 55.73, 51.44, 49.21, 47.85, 46.93, 45.78, 45.07, 44.6, 43.81, 43.4];
export const BAR_PER_FSW = SURFACE_PRESSURE_BAR / 33;
export const DSAT_M0_BAR: readonly number[] = DSAT_M0_FSW.map((m) => m * BAR_PER_FSW);

const LN2 = Math.LN2;

export interface DsatTissues {
  n2: number[];
}

export interface DsatOptions {
  /** Subtract alveolar water vapour when computing inspired N2 (Bühlmann convention). RDP fits better without. */
  waterVapour?: boolean;
  /** Scale applied to the M-value gradient (1 = DSAT, <1 = more conservative); scalar or per compartment. */
  mScale?: number | readonly number[];
}

function scaleFor(o: DsatOptions, i: number): number {
  const m = o.mScale;
  if (m === undefined) return 1;
  return typeof m === 'number' ? m : (m[i] ?? 1);
}

function inspiredN2(ambientBar: number, gas: Gas, o: DsatOptions): number {
  const p = o.waterVapour ? ambientBar - WATER_VAPOUR_BAR : ambientBar;
  return Math.max(0, p * fN2(gas));
}

export function dsatSaturated(surfaceBar = SURFACE_PRESSURE_BAR, o: DsatOptions = {}): DsatTissues {
  const p = inspiredN2(surfaceBar, AIR, o);
  return { n2: DSAT_HALF_TIMES.map(() => p) };
}

export function dsatLoadConstant(t: DsatTissues, ambientBar: number, gas: Gas, minutes: number, o: DsatOptions = {}): DsatTissues {
  if (minutes <= 0) return { n2: t.n2.slice() };
  const pi = inspiredN2(ambientBar, gas, o);
  return { n2: t.n2.map((p0, i) => pi + (p0 - pi) * Math.pow(2, -minutes / DSAT_HALF_TIMES[i])) };
}

export function dsatLoadLinear(t: DsatTissues, startBar: number, rateBarPerMin: number, gas: Gas, minutes: number, o: DsatOptions = {}): DsatTissues {
  if (minutes <= 0) return { n2: t.n2.slice() };
  if (Math.abs(rateBarPerMin) < 1e-9) return dsatLoadConstant(t, startBar, gas, minutes, o);
  const pi0 = inspiredN2(startBar, gas, o);
  const r = rateBarPerMin * fN2(gas);
  return {
    n2: t.n2.map((p0, i) => {
      const k = LN2 / DSAT_HALF_TIMES[i];
      return pi0 + r * (minutes - 1 / k) - (pi0 - r / k - p0) * Math.exp(-k * minutes);
    }),
  };
}

function pMax(i: number, surfaceBar: number, o: DsatOptions): number {
  return surfaceBar + scaleFor(o, i) * (DSAT_M0_BAR[i] - surfaceBar);
}

/** No-decompression limit (min) at `ambientBar` on `gas`. */
export function dsatNdl(t: DsatTissues, ambientBar: number, gas: Gas, surfaceBar = SURFACE_PRESSURE_BAR, o: DsatOptions = {}, cap = 999): number {
  const pi = inspiredN2(ambientBar, gas, o);
  let ndl = Infinity;
  for (let i = 0; i < DSAT_HALF_TIMES.length; i++) {
    const pmax = pMax(i, surfaceBar, o);
    const p0 = t.n2[i];
    if (p0 >= pmax) return 0;
    if (pi <= pmax) continue;
    const tt = (DSAT_HALF_TIMES[i] / LN2) * Math.log((p0 - pi) / (pmax - pi));
    if (tt < ndl) ndl = tt;
  }
  return Math.min(cap, ndl);
}

/** Highest loading across compartments as a fraction of the surfacing limit (0..1 = within NDL, >1 = deco). */
export function dsatLoadingFraction(t: DsatTissues, surfaceBar = SURFACE_PRESSURE_BAR, o: DsatOptions = {}): number {
  const base = inspiredN2(surfaceBar, AIR, o);
  let max = 0;
  for (let i = 0; i < DSAT_HALF_TIMES.length; i++) {
    const f = (t.n2[i] - base) / (pMax(i, surfaceBar, o) - base);
    if (f > max) max = f;
  }
  return Math.max(0, max);
}

/**
 * Tolerated ambient pressure using a Workman-style slope of 1 (ΔM = 1) above M0 – the DSAT model
 * publishes no deco slopes, so this is only used to produce a sensible ceiling once NDL is exceeded.
 */
export function dsatCeilingBar(t: DsatTissues, surfaceBar = SURFACE_PRESSURE_BAR, o: DsatOptions = {}): number {
  let max = 0;
  for (let i = 0; i < DSAT_HALF_TIMES.length; i++) {
    const pm = pMax(i, surfaceBar, o);
    // M(P) = M0 + (P - surface) * 1  =>  tolerated P = surface + (Pt - M0)
    const tol = surfaceBar + (t.n2[i] - pm);
    if (tol > max) max = tol;
  }
  return max;
}

import { type DecoPlan, stopDepthFromCeiling } from './buhlmann';
import { type WaterType, ambientBarToDepth, barPerMetre, depthToAmbientBar } from './constants';

export interface DsatPlanOptions {
  surfaceBar?: number;
  water?: WaterType;
  ascentRateMPerMin?: number;
  lastStopM?: number;
  incrementM?: number;
  dsat?: DsatOptions;
  maxStopMin?: number;
}

/**
 * Ascent plan for the DSAT model. The published model is NDL-only, so once the limit is exceeded
 * stops are produced from the Workman-slope ceiling (see dsatCeilingBar). Educational only.
 */
export function dsatPlanAscent(t: DsatTissues, depthM: number, gas: Gas, o: DsatPlanOptions = {}): DecoPlan {
  const surfaceBar = o.surfaceBar ?? SURFACE_PRESSURE_BAR;
  const water = o.water ?? 'en13319';
  const rate = o.ascentRateMPerMin ?? 9;
  const last = o.lastStopM ?? 3;
  const inc = o.incrementM ?? 3;
  const opts = o.dsat ?? {};
  const maxHold = o.maxStopMin ?? 240;
  const amb = (d: number) => depthToAmbientBar(d, surfaceBar, water);
  const ceilM = (tt: DsatTissues) => Math.max(0, ambientBarToDepth(dsatCeilingBar(tt, surfaceBar, opts), surfaceBar, water));

  const required = dsatNdl(t, amb(depthM), gas, surfaceBar, opts) <= 0;
  if (!required) return { decoRequired: false, ceilingM: 0, firstStopM: 0, stops: [], ttsMin: depthM / rate };

  const ceilingM = ceilM(t);
  let stop = stopDepthFromCeiling(ceilingM, last, inc);
  if (stop > depthM) stop = Math.max(last, Math.floor(depthM / inc) * inc);
  let tissues: DsatTissues = { n2: t.n2.slice() };
  let depth = depthM;
  let tts = 0;
  const stops: DecoPlan['stops'] = [];
  let guard = 0;
  while (stop > 0 && guard++ < 100) {
    const travel = depth - stop;
    if (travel > 0) {
      const minutes = travel / rate;
      const r = (-travel * barPerMetre(water)) / minutes;
      tissues = dsatLoadLinear(tissues, amb(depth), r, gas, minutes, opts);
      tts += minutes;
      depth = stop;
    }
    const next = stop <= last ? 0 : stop - inc;
    let held = 0;
    while (held < maxHold && ceilM(tissues) > next + 1e-6) {
      tissues = dsatLoadConstant(tissues, amb(stop), gas, 1, opts);
      held++;
    }
    if (held > 0) stops.push({ depthM: stop, minutes: held });
    tts += held;
    stop = next;
  }
  if (stops.length === 0) {
    stops.push({ depthM: last, minutes: 1 });
    tts += 1;
  }
  tts += depth / rate;
  return { decoRequired: true, ceilingM, firstStopM: stops[0]?.depthM ?? 0, stops, ttsMin: tts };
}
