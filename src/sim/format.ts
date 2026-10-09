import { FT_PER_M, celsiusToFahrenheit } from '../engine';
import type { Units } from './types';

export function depthValue(m: number, units: Units): number {
  return units === 'metric' ? m : m * FT_PER_M;
}

export function depthUnit(units: Units): string {
  return units === 'metric' ? 'm' : 'ft';
}

/** Depth string with one decimal in metric, whole feet in imperial. */
export function fmtDepth(m: number, units: Units, decimals = units === 'metric' ? 1 : 0): string {
  return depthValue(m, units).toFixed(decimals);
}

export function tempValue(c: number, units: Units): number {
  return units === 'metric' ? c : celsiusToFahrenheit(c);
}

export function fmtTemp(c: number, units: Units): string {
  return `${Math.round(tempValue(c, units))}°${units === 'metric' ? 'C' : 'F'}`;
}

/** mm:ss */
export function fmtMinSec(totalS: number): string {
  const s = Math.max(0, Math.floor(totalS));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}

/** h:mm */
export function fmtHoursMin(totalS: number): string {
  const s = Math.max(0, Math.floor(totalS));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}:${m.toString().padStart(2, '0')}`;
}

export function fmtMinutes(min: number, cap = 199): string {
  if (!Number.isFinite(min) || min >= cap) return `${cap}+`;
  return `${Math.max(0, Math.floor(min))}`;
}

export function pad2(n: number): string {
  return Math.floor(n).toString().padStart(2, '0');
}
