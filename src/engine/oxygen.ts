/**
 * Oxygen exposure tracking: CNS % (NOAA single-exposure limits) and OTU (pulmonary).
 * Educational – not for planning real dives.
 */

/** NOAA single-exposure CNS limits: [PO2 (ata), minutes]. */
export const NOAA_CNS_LIMITS: ReadonlyArray<readonly [number, number]> = [
  [0.6, 720],
  [0.7, 570],
  [0.8, 450],
  [0.9, 360],
  [1.0, 300],
  [1.1, 240],
  [1.2, 210],
  [1.3, 180],
  [1.4, 150],
  [1.5, 120],
  [1.6, 45],
];

/** Half-time for CNS clock decay at the surface, as commonly implemented (e.g. Shearwater). */
export const CNS_SURFACE_HALF_TIME_MIN = 90;

/** Allowed single-exposure minutes at a given PO2 (linear interpolation between NOAA points). */
export function cnsLimitMinutes(po2: number): number {
  if (po2 < 0.5) return Infinity;
  if (po2 <= 0.6) return 720;
  if (po2 > 1.6) return Math.max(5, 45 - (po2 - 1.6) * 300); // approximation beyond the table
  for (let i = 1; i < NOAA_CNS_LIMITS.length; i++) {
    const [p1, m1] = NOAA_CNS_LIMITS[i - 1];
    const [p2, m2] = NOAA_CNS_LIMITS[i];
    if (po2 <= p2) {
      const f = (po2 - p1) / (p2 - p1);
      return m1 + (m2 - m1) * f;
    }
  }
  return 45;
}

/** CNS % accumulated per minute at a given PO2. */
export function cnsRatePerMinute(po2: number): number {
  const lim = cnsLimitMinutes(po2);
  return lim === Infinity ? 0 : 100 / lim;
}

/** OTU per minute (Repex). */
export function otuRatePerMinute(po2: number): number {
  return po2 > 0.5 ? Math.pow((po2 - 0.5) / 0.5, 0.83) : 0;
}

/** Decay CNS% at the surface with a 90-min half-time. */
export function decayCns(cnsPercent: number, minutes: number): number {
  return cnsPercent * Math.pow(2, -minutes / CNS_SURFACE_HALF_TIME_MIN);
}
