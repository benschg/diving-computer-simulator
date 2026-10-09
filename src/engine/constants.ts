/**
 * Physical constants and unit conversions shared by all decompression models.
 * Educational simulator – not for planning real dives.
 */

/** Standard atmosphere at sea level. */
export const SURFACE_PRESSURE_BAR = 1.01325;

/** Alveolar water-vapour pressure at 37 °C used by Bühlmann (0.0627 bar). Schreiner used 0.0567. */
export const WATER_VAPOUR_BAR = 0.0627;

export const GRAVITY = 9.80665;

export type WaterType = 'fresh' | 'en13319' | 'salt';

/** Water densities (kg/m³). EN 13319 is the dive-computer standard (≈ 1 bar per 10 m). */
export const WATER_DENSITY: Record<WaterType, number> = {
  fresh: 1000,
  en13319: 1020,
  salt: 1030,
};

export const FT_PER_M = 3.280839895;
export const PSI_PER_BAR = 14.5037738;

export function barPerMetre(water: WaterType = 'en13319'): number {
  return (WATER_DENSITY[water] * GRAVITY) / 100000;
}

export function depthToAmbientBar(depthM: number, surfaceBar = SURFACE_PRESSURE_BAR, water: WaterType = 'en13319'): number {
  return surfaceBar + Math.max(0, depthM) * barPerMetre(water);
}

export function ambientBarToDepth(bar: number, surfaceBar = SURFACE_PRESSURE_BAR, water: WaterType = 'en13319'): number {
  return (bar - surfaceBar) / barPerMetre(water);
}

/** ISA barometric formula: ambient pressure at a given altitude (m). */
export function altitudeToPressureBar(altitudeM: number): number {
  return SURFACE_PRESSURE_BAR * Math.pow(1 - 2.25577e-5 * Math.max(0, altitudeM), 5.25588);
}

export function metresToFeet(m: number): number {
  return m * FT_PER_M;
}

export function feetToMetres(ft: number): number {
  return ft / FT_PER_M;
}

export function celsiusToFahrenheit(c: number): number {
  return c * 1.8 + 32;
}

export function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}
