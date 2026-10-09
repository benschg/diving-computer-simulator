import { ambientBarToDepth, depthToAmbientBar, SURFACE_PRESSURE_BAR, type WaterType } from './constants';

/** Breathing gas described by its oxygen and helium fractions; the rest is nitrogen. */
export interface Gas {
  fO2: number;
  fHe: number;
}

export const AIR: Gas = { fO2: 0.21, fHe: 0 };

export function nitrox(o2Percent: number): Gas {
  return { fO2: o2Percent / 100, fHe: 0 };
}

export function fN2(gas: Gas): number {
  return Math.max(0, 1 - gas.fO2 - gas.fHe);
}

export function gasLabel(gas: Gas): string {
  if (gas.fHe > 0) return `${Math.round(gas.fO2 * 100)}/${Math.round(gas.fHe * 100)}`;
  if (Math.abs(gas.fO2 - 0.21) < 0.005) return 'Air';
  return `EAN${Math.round(gas.fO2 * 100)}`;
}

export function pO2At(gas: Gas, ambientBar: number): number {
  return gas.fO2 * ambientBar;
}

/** Maximum operating depth (m) for a given PO2 limit. */
export function modMetres(gas: Gas, pO2Max: number, surfaceBar = SURFACE_PRESSURE_BAR, water: WaterType = 'en13319'): number {
  return Math.max(0, ambientBarToDepth(pO2Max / gas.fO2, surfaceBar, water));
}

/** Equivalent air depth (m) for a nitrox mix. */
export function eadMetres(gas: Gas, depthM: number, surfaceBar = SURFACE_PRESSURE_BAR, water: WaterType = 'en13319'): number {
  const ambient = depthToAmbientBar(depthM, surfaceBar, water);
  const eadBar = (ambient * fN2(gas)) / 0.79;
  return Math.max(0, ambientBarToDepth(eadBar, surfaceBar, water));
}
