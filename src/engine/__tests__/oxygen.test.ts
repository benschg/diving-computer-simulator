import { describe, expect, it } from 'vitest';
import { cnsLimitMinutes, cnsRatePerMinute, decayCns, otuRatePerMinute } from '../oxygen';

describe('oxygen exposure', () => {
  it('matches NOAA table points', () => {
    expect(cnsLimitMinutes(1.6)).toBe(45);
    expect(cnsLimitMinutes(1.4)).toBe(150);
    expect(cnsLimitMinutes(1.0)).toBe(300);
    expect(cnsLimitMinutes(0.4)).toBe(Infinity);
  });
  it('interpolates and accumulates', () => {
    expect(cnsLimitMinutes(1.45)).toBeCloseTo(135, 5);
    expect(cnsRatePerMinute(1.4) * 150).toBeCloseTo(100, 5);
    expect(otuRatePerMinute(1.0)).toBeCloseTo(1, 5);
    expect(decayCns(100, 90)).toBeCloseTo(50, 5);
  });
});
