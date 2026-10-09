import { describe, expect, it } from 'vitest';
import {
  SEA_LEVEL,
  ceilingDepthM,
  depthToAmbientBar,
  gf99,
  loadConstant,
  loadDepthChange,
  loadLinear,
  ndlMinutes,
  planAscent,
  saturatedTissues,
  stopDepthFromCeiling,
  surfGF,
} from '..';
import { AIR, nitrox } from '../gas';

const amb = (m: number) => depthToAmbientBar(m);

describe('ZH-L16C basics', () => {
  it('surface-saturated tissues have no ceiling and a huge NDL at the surface', () => {
    const t = saturatedTissues();
    expect(ceilingDepthM(t, 1)).toBe(0);
    expect(ndlMinutes(t, amb(0), AIR, 1)).toBe(999);
    expect(surfGF(t)).toBeCloseTo(0, 5);
  });

  it('NDL at 18 m on air with GF 100 is around 60 min (published ZH-L16C ≈ 56–63)', () => {
    const t = saturatedTissues();
    const ndl = ndlMinutes(t, amb(18), AIR, 1);
    expect(ndl).toBeGreaterThan(54);
    expect(ndl).toBeLessThan(66);
  });

  it('NDL decreases monotonically with depth and with lower GF high', () => {
    const t = saturatedTissues();
    let prev = Infinity;
    for (const d of [10, 12, 15, 18, 21, 24, 27, 30, 33, 36, 40]) {
      const n = ndlMinutes(t, amb(d), AIR, 1);
      expect(n).toBeLessThan(prev);
      prev = n;
    }
    expect(ndlMinutes(t, amb(30), AIR, 0.85)).toBeLessThan(ndlMinutes(t, amb(30), AIR, 1));
  });

  it('nitrox extends NDL versus air', () => {
    const t = saturatedTissues();
    expect(ndlMinutes(t, amb(24), nitrox(32), 0.85)).toBeGreaterThan(ndlMinutes(t, amb(24), AIR, 0.85) * 1.2);
  });

  it('Schreiner with zero rate equals the Haldane equation', () => {
    const t = saturatedTissues();
    const a = loadConstant(t, amb(20), AIR, 7);
    const b = loadLinear(t, amb(20), 0, AIR, 7);
    a.n2.forEach((p, i) => expect(p).toBeCloseTo(b.n2[i], 10));
  });

  it('a slow linear descent loads less than spending the whole time at the deeper depth', () => {
    const t = saturatedTissues();
    const lin = loadDepthChange(t, 0, 30, AIR, 3);
    const flat = loadConstant(t, amb(30), AIR, 3);
    lin.n2.forEach((p, i) => expect(p).toBeLessThan(flat.n2[i]));
  });

  it('NDL analytical result agrees with step simulation', () => {
    const t = saturatedTissues();
    const ndl = ndlMinutes(t, amb(24), AIR, 0.85);
    const before = loadConstant(t, amb(24), AIR, Math.floor(ndl));
    const after = loadConstant(t, amb(24), AIR, Math.ceil(ndl) + 1);
    expect(ceilingDepthM(before, 0.85)).toBe(0);
    expect(ceilingDepthM(after, 0.85)).toBeGreaterThan(0);
  });
});

describe('decompression planning', () => {
  it('produces no stops inside the NDL', () => {
    const t = loadConstant(saturatedTissues(), amb(18), AIR, 20);
    const plan = planAscent(t, 18, AIR, { gfLow: 0.4, gfHigh: 0.85 });
    expect(plan.decoRequired).toBe(false);
    expect(plan.stops).toHaveLength(0);
    expect(plan.ttsMin).toBeCloseTo(1.8, 5);
  });

  it('requires stops after 30 min at 40 m and the schedule is shallow-first-last', () => {
    const t = loadConstant(saturatedTissues(), amb(40), AIR, 30);
    const plan = planAscent(t, 40, AIR, { gfLow: 0.4, gfHigh: 0.85 });
    expect(plan.decoRequired).toBe(true);
    expect(plan.stops.length).toBeGreaterThan(0);
    expect(plan.firstStopM).toBeGreaterThanOrEqual(3);
    for (let i = 1; i < plan.stops.length; i++) expect(plan.stops[i].depthM).toBeLessThan(plan.stops[i - 1].depthM);
    expect(plan.stops[plan.stops.length - 1].depthM).toBe(3);
    expect(plan.ttsMin).toBeGreaterThan(10);
    // lower GFs -> longer TTS
    const conservative = planAscent(t, 40, AIR, { gfLow: 0.3, gfHigh: 0.7 });
    expect(conservative.ttsMin).toBeGreaterThan(plan.ttsMin);
  });

  it('honours a 6 m last stop', () => {
    const t = loadConstant(saturatedTissues(), amb(40), AIR, 30);
    const plan = planAscent(t, 40, AIR, { gfLow: 0.4, gfHigh: 0.85, lastStopM: 6 });
    expect(plan.stops[plan.stops.length - 1].depthM).toBe(6);
  });

  it('stop depth rounding', () => {
    expect(stopDepthFromCeiling(0)).toBe(0);
    expect(stopDepthFromCeiling(0.4)).toBe(3);
    expect(stopDepthFromCeiling(3)).toBe(3);
    expect(stopDepthFromCeiling(3.1)).toBe(6);
    expect(stopDepthFromCeiling(7.9)).toBe(9);
    expect(stopDepthFromCeiling(2, 6)).toBe(6);
  });

  it('GF99 is 100 when the leading compartment sits exactly on its M-value', () => {
    const t = loadConstant(saturatedTissues(), amb(30), AIR, 60);
    const ceil = ceilingDepthM(t, 1, SEA_LEVEL);
    expect(ceil).toBeGreaterThan(0);
    expect(gf99(t, depthToAmbientBar(ceil))).toBeCloseTo(100, 1);
  });
});
