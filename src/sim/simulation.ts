import { clamp } from '../engine';
import type { ComputerCore } from './core';
import type { Sample, SimEvent, TracePoint } from './types';

export interface ComputerSlot {
  id: string;
  fw: ComputerCore;
  create: () => ComputerCore;
}

export interface Waypoint {
  depthM: number;
  rateMPerMin: number;
  holdS: number;
  label?: string;
}

export const SPEEDS = [1, 5, 10, 30, 60, 120] as const;
export type Speed = (typeof SPEEDS)[number];
export const MAX_DEPTH_M = 60;

/**
 * The "world": a diver whose depth moves towards a target at a chosen vertical speed, a clock
 * that can run faster than real time, and any number of dive computers observing the same
 * depth/time samples.
 */
export class Simulation {
  t = 0;
  depthM = 0;
  targetDepthM = 0;
  rateMPerMin = 18;
  speed: Speed = 1;
  running = false;
  surfaceTempC = 26;
  samples: Sample[] = [];
  events: SimEvent[] = [];
  computers: ComputerSlot[] = [];
  traces = new Map<string, TracePoint[]>();
  script: { waypoints: Waypoint[]; index: number; holdRemainingS: number; title: string } | null = null;
  version = 0;

  private listeners = new Set<() => void>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private lastReal = 0;
  private carry = 0;

  constructor() {
    this.samples.push({ t: 0, depthM: 0, tempC: this.surfaceTempC });
  }

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getVersion = (): number => this.version;

  private notify(): void {
    this.version++;
    for (const l of this.listeners) l();
  }

  // ---- computers -------------------------------------------------------------------------
  setComputers(slots: Array<{ id: string; create: () => ComputerCore }>): void {
    this.computers = slots.map((s) => {
      const existing = this.computers.find((c) => c.id === s.id);
      if (!existing) this.traces.set(s.id, []);
      return existing ?? { id: s.id, create: s.create, fw: s.create() };
    });
    for (const id of [...this.traces.keys()]) if (!this.computers.some((c) => c.id === id)) this.traces.delete(id);
    this.notify();
  }

  computer(id: string): ComputerCore | undefined {
    return this.computers.find((c) => c.id === id)?.fw;
  }

  // ---- diver controls --------------------------------------------------------------------
  setTarget(depthM: number, rateMPerMin?: number): void {
    this.targetDepthM = clamp(depthM, 0, MAX_DEPTH_M);
    if (rateMPerMin !== undefined) this.rateMPerMin = rateMPerMin;
    this.script = null;
    this.notify();
  }

  setRate(rateMPerMin: number): void {
    this.rateMPerMin = rateMPerMin;
    this.notify();
  }

  hold(): void {
    this.targetDepthM = this.depthM;
    this.script = null;
    this.notify();
  }

  setSpeed(speed: Speed): void {
    this.speed = speed;
    this.notify();
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastReal = performance.now();
    this.timer = setInterval(this.loop, 100);
    this.notify();
  }

  pause(): void {
    if (!this.running) return;
    this.running = false;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.notify();
  }

  toggle(): void {
    if (this.running) this.pause();
    else this.start();
  }

  reset(): void {
    this.pause();
    this.t = 0;
    this.depthM = 0;
    this.targetDepthM = 0;
    this.carry = 0;
    this.samples = [{ t: 0, depthM: 0, tempC: this.surfaceTempC }];
    this.events = [];
    this.script = null;
    this.computers = this.computers.map((c) => ({ ...c, fw: c.create() }));
    for (const c of this.computers) this.traces.set(c.id, []);
    this.notify();
  }

  /** Advance the world by simulated seconds while holding the current target. */
  skip(seconds: number): void {
    this.stepSeconds(seconds);
  }

  runScript(title: string, waypoints: Waypoint[]): void {
    this.script = { title, waypoints, index: 0, holdRemainingS: waypoints[0]?.holdS ?? 0 };
    this.notify();
    if (!this.running) this.start();
  }

  // ---- time ------------------------------------------------------------------------------
  private loop = (): void => {
    const now = performance.now();
    const realDt = Math.min(1, (now - this.lastReal) / 1000);
    this.lastReal = now;
    this.stepSeconds(realDt * this.speed);
  };

  stepSeconds(simSeconds: number): void {
    let remaining = simSeconds + this.carry;
    const dt = 1;
    let steps = 0;
    while (remaining >= dt && steps < 100000) {
      this.stepOnce(dt);
      remaining -= dt;
      steps++;
    }
    this.carry = remaining;
    this.notify();
  }

  private stepOnce(dt: number): void {
    if (this.script) {
      const wp = this.script.waypoints[this.script.index];
      if (!wp) this.script = null;
      else {
        this.targetDepthM = wp.depthM;
        this.rateMPerMin = wp.rateMPerMin;
        if (Math.abs(this.depthM - wp.depthM) < 1e-6) {
          this.script.holdRemainingS -= dt;
          if (this.script.holdRemainingS <= 0) {
            this.script.index++;
            this.script.holdRemainingS = this.script.waypoints[this.script.index]?.holdS ?? 0;
          }
        }
      }
    }
    const maxStep = (this.rateMPerMin * dt) / 60;
    const diff = this.targetDepthM - this.depthM;
    this.depthM = Math.abs(diff) <= maxStep ? this.targetDepthM : this.depthM + Math.sign(diff) * maxStep;
    this.t += dt;
    const sample: Sample = { t: this.t, depthM: this.depthM, tempC: this.temperatureAt(this.depthM) };
    this.samples.push(sample);
    for (const c of this.computers) {
      c.fw.tick(sample, dt);
      for (const e of c.fw.drainEvents()) this.events.push(e);
      let trace = this.traces.get(c.id);
      if (!trace) {
        trace = [];
        this.traces.set(c.id, trace);
      }
      trace.push(c.fw.trace());
    }
    if (this.events.length > 2000) this.events.splice(0, this.events.length - 2000);
  }

  temperatureAt(depthM: number): number {
    // simple thermocline: 26 °C at the surface falling to 18 °C at 30 m
    return this.surfaceTempC - Math.min(depthM, 30) * (8 / 30);
  }

  get verticalState(): 'descending' | 'ascending' | 'level' {
    if (this.targetDepthM > this.depthM + 1e-6) return 'descending';
    if (this.targetDepthM < this.depthM - 1e-6) return 'ascending';
    return 'level';
  }
}
