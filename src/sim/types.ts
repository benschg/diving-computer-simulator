import type { DecoStop, Gas, WaterType } from '../engine';

export type Units = 'metric' | 'imperial';
/** surface = no dive in progress; dive = underwater; surfaced = at the surface, dive not yet closed by the computer */
export type Phase = 'surface' | 'dive' | 'surfaced';
export type Severity = 'info' | 'warning' | 'critical';
export type ButtonPress = 'short' | 'long';

export interface Sample {
  t: number;
  depthM: number;
  tempC: number;
}

export interface Alarm {
  id: string;
  severity: Severity;
  text: string;
  sinceS: number;
  audible: boolean;
}

export interface SimEvent {
  id: number;
  t: number;
  severity: Severity;
  text: string;
  source: string;
}

export type SafetyStopStatus = 'none' | 'pending' | 'counting' | 'paused' | 'done' | 'violated';

export interface SafetyStopState {
  status: SafetyStopStatus;
  remainingS: number;
  durationS: number;
  mandatory: boolean;
  shallowM: number;
  deepM: number;
}

export interface DecoState {
  required: boolean;
  ceilingM: number;
  stopDepthM: number;
  stopTimeMin: number;
  ttsMin: number;
  stops: DecoStop[];
  gf99: number;
  surfGF: number;
}

export type ViolationKind = 'none' | 'ceiling' | 'missed-stop' | 'lockout';

export interface ViolationState {
  kind: ViolationKind;
  label: string;
  sinceS: number;
  /** continuous seconds spent above the decompression ceiling */
  aboveCeilingS: number;
}

export interface ComputerSettings {
  units: Units;
  gas: Gas;
  pO2Max: number;
  altitudeM: number;
  water: WaterType;
  /** brand-specific conservatism index (0 = factory default) */
  conservatism: number;
  /** 0 = safety stop display off */
  safetyStopMinutes: number;
  deepStops: boolean;
  lastStopM: 3 | 6;
}

export const DEFAULT_SETTINGS: ComputerSettings = {
  units: 'metric',
  gas: { fO2: 0.21, fHe: 0 },
  pO2Max: 1.4,
  altitudeM: 0,
  water: 'en13319',
  conservatism: 0,
  safetyStopMinutes: 3,
  deepStops: false,
  lastStopM: 3,
};

export interface CoreSnapshot {
  t: number;
  phase: Phase;
  depthM: number;
  maxDepthM: number;
  avgDepthM: number;
  tempC: number;
  diveTimeS: number;
  diveNumber: number;
  surfaceIntervalS: number;
  ascentRateMPerMin: number;
  ndlMin: number;
  deco: DecoState;
  safetyStop: SafetyStopState;
  violation: ViolationState;
  locked: boolean;
  lockoutRemainingS: number;
  cnsPercent: number;
  otu: number;
  pO2: number;
  noFlyS: number;
  desatS: number;
  tissueLoading: number[];
  alarms: Alarm[];
}

/** Compact per-second record of what a computer showed, used for charts. */
export interface TracePoint {
  t: number;
  depthM: number;
  ndlMin: number;
  ceilingM: number;
  stopDepthM: number;
  ttsMin: number;
  inDeco: boolean;
  safety: SafetyStopStatus;
  ascentRate: number;
}
