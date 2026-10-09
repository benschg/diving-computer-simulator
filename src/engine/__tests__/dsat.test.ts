import { describe, expect, it } from 'vitest';
import { AIR, depthToAmbientBar, dsatLoadConstant, dsatNdl, dsatSaturated, dsatLoadingFraction } from '..';

const amb = (m: number) => depthToAmbientBar(m);

// PADI RDP no-decompression limits (metric), see docs/research/padi.md.
// The 10 m (219 min) and 35 ft (205 min) rows are deliberately capped by PADI below what the
// 14-compartment model gives (~265 / ~214 min), so they are excluded here.
const RDP_METRIC: Array<[number, number]> = [
  [12, 147],
  [14, 98],
  [16, 72],
  [18, 56],
  [20, 45],
  [22, 37],
  [25, 29],
  [30, 20],
  [35, 14],
  [40, 9],
];

describe('DSAT model', () => {
  it('reproduces the PADI RDP no-decompression limits within a few minutes', () => {
    const t = dsatSaturated();
    for (const [depth, limit] of RDP_METRIC) {
      const ndl = dsatNdl(t, amb(depth), AIR);
      const tol = Math.max(2.5, limit * 0.1);
      expect(Math.abs(ndl - limit), `NDL at ${depth} m: model ${ndl.toFixed(1)} vs RDP ${limit}`).toBeLessThanOrEqual(tol);
    }
  });

  it('loading fraction reaches 1 at the NDL', () => {
    const t = dsatSaturated();
    const ndl = dsatNdl(t, amb(18), AIR);
    const atLimit = dsatLoadConstant(t, amb(18), AIR, ndl);
    expect(dsatLoadingFraction(atLimit)).toBeCloseTo(1, 2);
    expect(dsatNdl(atLimit, amb(18), AIR)).toBeLessThan(0.01);
  });

  it('is more liberal than ZH-L16C GF 85 at 18 m (as diver folklore says)', () => {
    const t = dsatSaturated();
    expect(dsatNdl(t, amb(18), AIR)).toBeGreaterThan(50);
  });
});
