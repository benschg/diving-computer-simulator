/**
 * Bühlmann ZH-L16C with Gradient Factors (Baker).
 *
 * Educational implementation used to drive simulated dive computers.
 * NOT for planning real dives.
 *
 * References (details and sources in docs/research/algorithms.md):
 *  - A. A. Bühlmann, Tauchmedizin (ZH-L16 coefficients; compartment 1b = 5.0 min is used, as in most dive computers)
 *  - E. C. Baker, "Understanding M-values"; "Clearing Up The Confusion About Deep Stops" (gradient factors)
 *  - H. R. Schreiner, equation for tissue loading under linearly changing pressure
 */
import {
  SURFACE_PRESSURE_BAR,
  WATER_VAPOUR_BAR,
  type WaterType,
  ambientBarToDepth,
  barPerMetre,
  depthToAmbientBar,
} from './constants';
import { AIR, type Gas, fN2 } from './gas';

export interface ZhlCompartment {
  /** nitrogen half-time (min) */
  ht: number;
  a: number;
  b: number;
  /** helium half-time (min) */
  htHe: number;
  aHe: number;
  bHe: number;
}

/** ZH-L16C coefficients, compartments 1b–16. */
export const ZHL16C: readonly ZhlCompartment[] = [
  { ht: 5.0, a: 1.1696, b: 0.5578, htHe: 1.88, aHe: 1.6189, bHe: 0.477 },
  { ht: 8.0, a: 1.0, b: 0.6514, htHe: 3.02, aHe: 1.383, bHe: 0.5747 },
  { ht: 12.5, a: 0.8618, b: 0.7222, htHe: 4.72, aHe: 1.1919, bHe: 0.6527 },
  { ht: 18.5, a: 0.7562, b: 0.7825, htHe: 6.99, aHe: 1.0458, bHe: 0.7223 },
  { ht: 27.0, a: 0.62, b: 0.8126, htHe: 10.21, aHe: 0.922, bHe: 0.7582 },
  { ht: 38.3, a: 0.5043, b: 0.8434, htHe: 14.48, aHe: 0.8205, bHe: 0.7957 },
  { ht: 54.3, a: 0.441, b: 0.8693, htHe: 20.53, aHe: 0.7305, bHe: 0.8279 },
  { ht: 77.0, a: 0.4, b: 0.891, htHe: 29.11, aHe: 0.6502, bHe: 0.8553 },
  { ht: 109.0, a: 0.375, b: 0.9092, htHe: 41.2, aHe: 0.595, bHe: 0.8757 },
  { ht: 146.0, a: 0.35, b: 0.9222, htHe: 55.19, aHe: 0.5545, bHe: 0.8903 },
  { ht: 187.0, a: 0.3295, b: 0.9319, htHe: 70.69, aHe: 0.5333, bHe: 0.8997 },
  { ht: 239.0, a: 0.3065, b: 0.9403, htHe: 90.34, aHe: 0.5189, bHe: 0.9073 },
  { ht: 305.0, a: 0.2835, b: 0.9477, htHe: 115.29, aHe: 0.5181, bHe: 0.9122 },
  { ht: 390.0, a: 0.261, b: 0.9544, htHe: 147.42, aHe: 0.5176, bHe: 0.9171 },
  { ht: 498.0, a: 0.248, b: 0.9602, htHe: 188.24, aHe: 0.5172, bHe: 0.9217 },
  { ht: 635.0, a: 0.2327, b: 0.9653, htHe: 240.03, aHe: 0.5119, bHe: 0.9267 },
];

export const N_COMPARTMENTS = ZHL16C.length;
const LN2 = Math.LN2;

/** Inert-gas partial pressures (bar) in each compartment. */
export interface Tissues {
  n2: number[];
  he: number[];
}

export interface Env {
  surfaceBar: number;
  water: WaterType;
}

export const SEA_LEVEL: Env = { surfaceBar: SURFACE_PRESSURE_BAR, water: 'en13319' };

export function cloneTissues(t: Tissues): Tissues {
  return { n2: t.n2.slice(), he: t.he.slice() };
}

/** Inspired (alveolar) partial pressure of a gas fraction at an ambient pressure. */
export function inspired(ambientBar: number, fraction: number): number {
  return Math.max(0, (ambientBar - WATER_VAPOUR_BAR) * fraction);
}

/** Tissues fully saturated at the surface breathing `gas` (normally air). */
export function saturatedTissues(surfaceBar = SURFACE_PRESSURE_BAR, gas: Gas = AIR): Tissues {
  const n2 = inspired(surfaceBar, fN2(gas));
  const he = inspired(surfaceBar, gas.fHe);
  return { n2: ZHL16C.map(() => n2), he: ZHL16C.map(() => he) };
}

/** Haldane equation: `minutes` at constant ambient pressure. */
export function loadConstant(t: Tissues, ambientBar: number, gas: Gas, minutes: number): Tissues {
  if (minutes <= 0) return cloneTissues(t);
  const piN2 = inspired(ambientBar, fN2(gas));
  const piHe = inspired(ambientBar, gas.fHe);
  const n2 = new Array<number>(N_COMPARTMENTS);
  const he = new Array<number>(N_COMPARTMENTS);
  for (let i = 0; i < N_COMPARTMENTS; i++) {
    const c = ZHL16C[i];
    n2[i] = piN2 + (t.n2[i] - piN2) * Math.pow(2, -minutes / c.ht);
    he[i] = piHe + (t.he[i] - piHe) * Math.pow(2, -minutes / c.htHe);
  }
  return { n2, he };
}

/** Schreiner equation for one compartment. */
export function schreiner(p0: number, pi0: number, r: number, k: number, t: number): number {
  return pi0 + r * (t - 1 / k) - (pi0 - r / k - p0) * Math.exp(-k * t);
}

/**
 * Schreiner equation: `minutes` during which ambient pressure changes linearly from `startBar`
 * at `rateBarPerMin` (positive = descending).
 */
export function loadLinear(t: Tissues, startBar: number, rateBarPerMin: number, gas: Gas, minutes: number): Tissues {
  if (minutes <= 0) return cloneTissues(t);
  if (Math.abs(rateBarPerMin) < 1e-9) return loadConstant(t, startBar, gas, minutes);
  const fn2 = fN2(gas);
  const fhe = gas.fHe;
  const n2 = new Array<number>(N_COMPARTMENTS);
  const he = new Array<number>(N_COMPARTMENTS);
  for (let i = 0; i < N_COMPARTMENTS; i++) {
    const c = ZHL16C[i];
    n2[i] = schreiner(t.n2[i], inspired(startBar, fn2), rateBarPerMin * fn2, LN2 / c.ht, minutes);
    he[i] = schreiner(t.he[i], inspired(startBar, fhe), rateBarPerMin * fhe, LN2 / c.htHe, minutes);
  }
  return { n2, he };
}

/** Convenience: move from depth A to depth B in `minutes` (linear), in a given environment. */
export function loadDepthChange(t: Tissues, fromM: number, toM: number, gas: Gas, minutes: number, env: Env = SEA_LEVEL): Tissues {
  const start = depthToAmbientBar(fromM, env.surfaceBar, env.water);
  if (minutes <= 0) return cloneTissues(t);
  const rate = ((toM - fromM) * barPerMetre(env.water)) / minutes;
  return loadLinear(t, start, rate, gas, minutes);
}

function mixedCoefficients(t: Tissues, i: number): { a: number; b: number; pt: number } {
  const c = ZHL16C[i];
  const pn2 = t.n2[i];
  const phe = t.he[i];
  const pt = pn2 + phe;
  if (pt <= 0) return { a: c.a, b: c.b, pt: 0 };
  return { a: (c.a * pn2 + c.aHe * phe) / pt, b: (c.b * pn2 + c.bHe * phe) / pt, pt };
}

/**
 * Maximum tolerated ambient pressure (bar) for compartment i at gradient factor gf (0 < gf ≤ 1).
 * Derived from P_tissue ≤ P_amb + gf · (M(P_amb) − P_amb) with M(P) = P / b + a.
 */
/**
 * Optional per-compartment scaling of the M-value gradient (1 = Bühlmann). Used to reproduce the
 * no-stop tables of proprietary models that are "based on ZH-L16C" (Pelagic Z+, Suunto RGBM, …):
 * the effective gradient factor of compartment i is gf · mScale[i].
 */
export type MScale = readonly number[] | undefined;

function effectiveGf(gf: number, mScale: MScale, i: number): number {
  return mScale ? gf * (mScale[i] ?? 1) : gf;
}

export function toleratedAmbientBar(t: Tissues, i: number, gf: number, mScale?: MScale): number {
  const { a, b, pt } = mixedCoefficients(t, i);
  if (pt <= 0) return 0;
  const g = effectiveGf(gf, mScale, i);
  return (pt - a * g) / (g / b - g + 1);
}

export function ceilingBar(t: Tissues, gf: number, mScale?: MScale): number {
  let max = 0;
  for (let i = 0; i < N_COMPARTMENTS; i++) max = Math.max(max, toleratedAmbientBar(t, i, gf, mScale));
  return max;
}

/** Ceiling depth in metres (0 when a direct ascent to the surface is permitted). */
export function ceilingDepthM(t: Tissues, gf: number, env: Env = SEA_LEVEL, mScale?: MScale): number {
  return Math.max(0, ambientBarToDepth(ceilingBar(t, gf, mScale), env.surfaceBar, env.water));
}

/** Which compartment currently controls the ceiling. */
export function leadingCompartment(t: Tissues, gf: number, mScale?: MScale): number {
  let best = 0;
  let max = -Infinity;
  for (let i = 0; i < N_COMPARTMENTS; i++) {
    const v = toleratedAmbientBar(t, i, gf, mScale);
    if (v > max) {
      max = v;
      best = i;
    }
  }
  return best;
}

/** Round a ceiling up to the next stop depth (multiples of `increment`, never shallower than lastStop). */
export function stopDepthFromCeiling(ceilingM: number, lastStopM = 3, increment = 3): number {
  if (ceilingM <= 1e-4) return 0;
  return Math.max(lastStopM, Math.ceil(ceilingM / increment - 1e-9) * increment);
}

/** Supersaturation gradient of compartment i at `ambientBar`, as % of the M-value gradient. */
export function gradientPercent(t: Tissues, i: number, ambientBar: number): number {
  const { a, b, pt } = mixedCoefficients(t, i);
  if (pt <= 0) return 0;
  const m = ambientBar / b + a;
  return ((pt - ambientBar) / (m - ambientBar)) * 100;
}

/** Shearwater "GF99": current gradient factor of the leading compartment at the current depth. */
export function gf99(t: Tissues, ambientBar: number): number {
  let g = -Infinity;
  for (let i = 0; i < N_COMPARTMENTS; i++) g = Math.max(g, gradientPercent(t, i, ambientBar));
  return Math.max(0, g);
}

/** Shearwater "SurfGF": the GF99 you would have if you surfaced right now. */
export function surfGF(t: Tissues, surfaceBar = SURFACE_PRESSURE_BAR): number {
  return gf99(t, surfaceBar);
}

/** Per-compartment loading relative to the surfacing M-value (0 = clean, 1 = at M0; >1 over). */
export function tissueLoading(t: Tissues, surfaceBar = SURFACE_PRESSURE_BAR): number[] {
  return ZHL16C.map((_c, i) => {
    const { a, b, pt } = mixedCoefficients(t, i);
    const m0 = surfaceBar / b + a;
    return Math.max(0, (pt - inspired(surfaceBar, 0.79)) / (m0 - inspired(surfaceBar, 0.79)));
  });
}

function ndlNumeric(t: Tissues, ambientBar: number, gas: Gas, gfHigh: number, env: Env, cap: number, mScale?: MScale): number {
  let tissues = t;
  for (let m = 0; m < cap; m++) {
    if (ceilingBar(tissues, gfHigh, mScale) > env.surfaceBar) return m;
    tissues = loadConstant(tissues, ambientBar, gas, 1);
  }
  return cap;
}

/**
 * No-decompression limit in minutes: how long one can stay at `ambientBar` on `gas` before a
 * direct ascent (judged with gfHigh at the surface) would no longer be permitted.
 * Analytical for nitrogen-only gases; numeric fallback when helium is present.
 */
export function ndlMinutes(t: Tissues, ambientBar: number, gas: Gas, gfHigh: number, env: Env = SEA_LEVEL, cap = 999, mScale?: MScale): number {
  if (gas.fHe > 1e-6 || t.he.some((p) => p > 1e-6)) return ndlNumeric(t, ambientBar, gas, gfHigh, env, cap, mScale);
  const surf = env.surfaceBar;
  const piN2 = inspired(ambientBar, fN2(gas));
  let ndl = Infinity;
  for (let i = 0; i < N_COMPARTMENTS; i++) {
    const c = ZHL16C[i];
    const m0 = surf / c.b + c.a;
    const pmax = surf + effectiveGf(gfHigh, mScale, i) * (m0 - surf);
    const p0 = t.n2[i];
    if (p0 >= pmax) return 0;
    if (piN2 <= pmax) continue;
    const tt = (c.ht / LN2) * Math.log((p0 - piN2) / (pmax - piN2));
    if (tt < ndl) ndl = tt;
  }
  return Math.min(cap, ndl);
}

export interface DecoStop {
  depthM: number;
  minutes: number;
}

export interface DecoPlan {
  /** Is a decompression stop currently required? (NDL exhausted) */
  decoRequired: boolean;
  /** Current ceiling (m) using the gradient factor that applies at the current depth. */
  ceilingM: number;
  /** First (deepest) stop depth (m), 0 when none. */
  firstStopM: number;
  stops: DecoStop[];
  /** Total time to surface (min) including ascent at the planning rate and all stops. */
  ttsMin: number;
}

export interface PlanOptions {
  gfLow: number;
  gfHigh: number;
  ascentRateMPerMin?: number;
  lastStopM?: number;
  incrementM?: number;
  env?: Env;
  /** Depth (m) that anchors the GF slope (deepest first stop seen so far during the dive). */
  gfAnchorM?: number;
  maxStopMin?: number;
  mScale?: MScale;
}

/** Gradient factor that applies at depth d given a slope anchored at `anchorM`. */
export function gfAtDepth(d: number, anchorM: number, gfLow: number, gfHigh: number): number {
  if (anchorM <= 0) return gfHigh;
  const f = Math.min(1, Math.max(0, d / anchorM));
  return gfHigh + (gfLow - gfHigh) * f;
}

/**
 * Compute the decompression schedule from the current state by simulating the ascent.
 * Stops are produced in `incrementM` steps; the GF slope is anchored at the first stop.
 */
export function planAscent(t: Tissues, depthM: number, gas: Gas, o: PlanOptions): DecoPlan {
  const rate = o.ascentRateMPerMin ?? 10;
  const last = o.lastStopM ?? 3;
  const inc = o.incrementM ?? 3;
  const env = o.env ?? SEA_LEVEL;
  const maxHold = o.maxStopMin ?? 240;

  const ms = o.mScale;
  const decoRequired = ceilingBar(t, o.gfHigh, ms) > env.surfaceBar + 1e-9;
  if (!decoRequired) {
    return { decoRequired: false, ceilingM: 0, firstStopM: 0, stops: [], ttsMin: depthM / rate };
  }

  let firstStop = stopDepthFromCeiling(ceilingDepthM(t, o.gfLow, env, ms), last, inc);
  if (firstStop > depthM) firstStop = Math.max(last, Math.floor(depthM / inc) * inc);
  const anchor = Math.max(o.gfAnchorM ?? 0, firstStop);
  const gfAt = (d: number) => gfAtDepth(d, anchor, o.gfLow, o.gfHigh);
  const ceilingM = ceilingDepthM(t, gfAt(depthM), env, ms);

  let tissues = cloneTissues(t);
  let depth = depthM;
  let tts = 0;
  const stops: DecoStop[] = [];
  let stop = firstStop;
  let guard = 0;
  while (stop > 0 && guard++ < 100) {
    const travel = depth - stop;
    if (travel > 0) {
      const minutes = travel / rate;
      tissues = loadDepthChange(tissues, depth, stop, gas, minutes, env);
      tts += minutes;
      depth = stop;
    }
    const next = stop <= last ? 0 : stop - inc;
    let held = 0;
    const stopBar = depthToAmbientBar(stop, env.surfaceBar, env.water);
    while (held < maxHold && ceilingDepthM(tissues, gfAt(next), env, ms) > next + 1e-6) {
      tissues = loadConstant(tissues, stopBar, gas, 1);
      held++;
    }
    if (held > 0) stops.push({ depthM: stop, minutes: held });
    tts += held;
    stop = next;
  }
  if (stops.length === 0) {
    // the ceiling exists but clears during the ascent: computers still show a minimum 1-min last stop
    stops.push({ depthM: last, minutes: 1 });
    tts += 1;
  }
  tts += depth / rate;
  return { decoRequired: true, ceilingM, firstStopM: stops[0]?.depthM ?? 0, stops, ttsMin: tts };
}

/** Minutes until every compartment is within `tolerance` bar of surface saturation (desaturation time). */
export function desaturationMinutes(t: Tissues, surfaceBar = SURFACE_PRESSURE_BAR, tolerance = 0.01): number {
  const target = inspired(surfaceBar, 0.79);
  let max = 0;
  for (let i = 0; i < N_COMPARTMENTS; i++) {
    const c = ZHL16C[i];
    const excessN2 = t.n2[i] - target;
    if (excessN2 > tolerance) max = Math.max(max, (c.ht / LN2) * Math.log(excessN2 / tolerance));
    const excessHe = t.he[i];
    if (excessHe > tolerance) max = Math.max(max, (c.htHe / LN2) * Math.log(excessHe / tolerance));
  }
  return max;
}
