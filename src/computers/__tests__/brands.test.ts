import { describe, expect, it } from 'vitest';
import { COMPUTERS, computerById } from '../registry';
import { Simulation } from '../../sim/simulation';
import { DEFAULT_SETTINGS } from '../../sim/types';
import type { ComputerCore } from '../../sim/core';

function makeSim(ids: string[]): Simulation {
  const sim = new Simulation();
  sim.setComputers(ids.map((id) => ({ id, create: () => computerById(id).create({ ...DEFAULT_SETTINGS }) })));
  return sim;
}

const EXPECTED_18M: Record<string, [number, number]> = {
  'suunto-zoop-novo': [50, 54],
  'shearwater-peregrine': [40, 47],
  'oceanic-veo-4': [57, 61],
  'mares-puck-pro': [47, 52],
  'cressi-leonardo': [47, 52],
  generic: [54, 58],
};

describe('brand computers – first dive no-stop limits at 18 m', () => {
  for (const def of COMPUTERS) {
    it(`${def.brand} ${def.model}`, () => {
      const sim = makeSim([def.id]);
      const fw = sim.computer(def.id)!;
      sim.setTarget(18, 18);
      sim.stepSeconds(61); // ~ at 18 m after 1 min descent
      const snap = fw.snapshot();
      expect(snap.depthM).toBeCloseTo(18, 1);
      const [lo, hi] = EXPECTED_18M[def.id];
      expect(snap.ndlMin, `${def.id} NDL ${snap.ndlMin}`).toBeGreaterThanOrEqual(lo);
      expect(snap.ndlMin).toBeLessThanOrEqual(hi);
      expect(() => def.Display({ fw })).not.toThrow();
      expect(fw.display()).toBeTruthy();
    });
  }
});

function runDecoDive(fw: ComputerCore, sim: Simulation, opts: { surfaceDirectly?: boolean } = {}) {
  sim.setTarget(30, 18);
  sim.stepSeconds(100);
  sim.stepSeconds(25 * 60); // well into deco at 30 m
  const inDeco = fw.snapshot().deco.required;
  if (opts.surfaceDirectly) {
    sim.setTarget(0, 9);
    sim.stepSeconds(5 * 60);
    sim.stepSeconds(11 * 60); // let the dive close (longest end delay is 10 min)
  }
  return inDeco;
}

describe('brand behaviours', () => {
  it('Suunto: ascent faster than 10 m/min for >5 s adds a mandatory safety stop; 3 min above the ceiling locks the algorithm for 48 h', () => {
    const sim = makeSim(['suunto-zoop-novo']);
    const fw = sim.computer('suunto-zoop-novo')!;
    sim.setTarget(20, 18);
    sim.stepSeconds(90);
    sim.stepSeconds(5 * 60);
    sim.setTarget(5, 18); // too fast for Suunto
    sim.stepSeconds(60);
    const s1 = fw.snapshot();
    expect(s1.safetyStop.mandatory).toBe(true);
    expect(sim.events.some((e) => e.text.includes('Mandatory safety stop added'))).toBe(true);
    // now a deco dive with a ceiling violation
    sim.reset();
    const fw2 = sim.computer('suunto-zoop-novo')!;
    sim.setTarget(30, 18);
    sim.stepSeconds(100 + 35 * 60); // long deco obligation
    expect(fw2.snapshot().deco.required).toBe(true);
    sim.setTarget(1.5, 9); // above the 3 m ceiling but still "diving" (Suunto surfaces at 1.2 m)
    sim.stepSeconds(4 * 60 + 4 * 60); // ~3.2 min ascent + 3 min grace
    expect(sim.events.some((e) => e.text.includes('algorithm locked'))).toBe(true);
    sim.setTarget(0, 9);
    sim.stepSeconds(6 * 60);
    const s2 = fw2.snapshot();
    expect(s2.locked).toBe(true);
    expect(s2.lockoutRemainingS).toBeGreaterThan(47 * 3600);
    expect(s2.noFlyS).toBeGreaterThan(47 * 3600);
  });

  it('Shearwater: safety stop arms past 11 m, counts shallower than 6 m, pauses outside 2.4–8.3 m, no lockout after missed deco', () => {
    const sim = makeSim(['shearwater-peregrine']);
    const fw = sim.computer('shearwater-peregrine')!;
    sim.setTarget(15, 18);
    sim.stepSeconds(60 + 5 * 60);
    sim.setTarget(5, 9);
    sim.stepSeconds(90);
    expect((fw.display() as { slot: { title: string; check: boolean } }).slot.check).toBe(true);
    sim.setTarget(10, 9); // deeper than 8.3 -> paused
    sim.stepSeconds(60);
    expect((fw.display() as { slot: { valueTone: string } }).slot.valueTone).toBe('warning');
    sim.reset();
    const fw2 = sim.computer('shearwater-peregrine')!;
    expect(runDecoDive(fw2, sim, { surfaceDirectly: true })).toBe(true);
    expect(fw2.snapshot().locked).toBe(false);
    expect(sim.events.some((e) => e.text.includes('MISSED DECO STOP'))).toBe(true);
  });

  it('Oceanic: DSAT is more liberal than Z+, surfacing with a missed stop ends in Violation Gauge Mode for 24 h', () => {
    const sim = makeSim(['oceanic-veo-4']);
    const fw = sim.computer('oceanic-veo-4')!;
    const dsat18 = fw.ndlAtDepth(18);
    fw.updateSettings({ conservatism: 1 });
    const z18 = fw.ndlAtDepth(18);
    expect(dsat18).toBeGreaterThan(z18 + 5);
    expect(Math.floor(dsat18)).toBe(59);
    expect(z18).toBeGreaterThanOrEqual(49.5);
    expect(z18).toBeLessThanOrEqual(51);
    fw.updateSettings({ conservatism: 0 });
    expect(runDecoDive(fw, sim, { surfaceDirectly: true })).toBe(true);
    const s = fw.snapshot();
    expect(s.locked).toBe(true);
    expect(sim.events.some((e) => e.text.includes('Violation Gauge Mode'))).toBe(true);
  });

  it('Mares: 3-minute surfacing countdown then post-dive screen; missed deco → bottom timer for 24 h', () => {
    const sim = makeSim(['mares-puck-pro']);
    const fw = sim.computer('mares-puck-pro')!;
    sim.setTarget(12, 18);
    sim.stepSeconds(60 + 60);
    sim.setTarget(0, 9);
    sim.stepSeconds(100);
    expect(fw.snapshot().phase).toBe('surfaced');
    expect((fw.display() as { screen: string }).screen).toBe('surfacing');
    sim.stepSeconds(200);
    expect(fw.snapshot().phase).toBe('surface');
    expect((fw.display() as { screen: string }).screen).toBe('postdive');
    sim.reset();
    const fw2 = sim.computer('mares-puck-pro')!;
    expect(runDecoDive(fw2, sim, { surfaceDirectly: true })).toBe(true);
    expect(fw2.snapshot().locked).toBe(true);
  });

  it('Cressi: forewarning at 3 min NDL, SLOW at 12 m/min, ERROR PROGRAM after 2 min above a missed stop', () => {
    const sim = makeSim(['cressi-leonardo']);
    const fw = sim.computer('cressi-leonardo')!;
    sim.setTarget(30, 18);
    sim.stepSeconds(100 + 16 * 60);
    expect(sim.events.some((e) => e.text.includes('forewarning'))).toBe(true);
    sim.stepSeconds(8 * 60);
    expect(fw.snapshot().deco.required).toBe(true);
    sim.setTarget(1.5, 18);
    sim.stepSeconds(60);
    expect(sim.events.some((e) => e.text.includes('SLOW'))).toBe(true);
    sim.stepSeconds(3 * 60);
    expect(sim.events.some((e) => e.text.includes('ERROR PROGRAM'))).toBe(true);
    sim.setTarget(0, 9);
    sim.stepSeconds(5 * 60);
    expect(fw.snapshot().locked).toBe(true);
  });

  it('all computers survive a long multi-dive day without errors', () => {
    const sim = makeSim(COMPUTERS.map((c) => c.id));
    for (let dive = 0; dive < 3; dive++) {
      sim.setTarget(25, 18);
      sim.stepSeconds(90 + 15 * 60);
      sim.setTarget(5, 9);
      sim.stepSeconds(4 * 60);
      sim.setTarget(0, 9);
      sim.stepSeconds(60 + 60 * 60);
    }
    for (const c of sim.computers) {
      const s = c.fw.snapshot();
      expect(s.diveNumber).toBe(3);
      expect(Number.isFinite(s.ndlMin)).toBe(true);
      expect(() => computerById(c.id).Display({ fw: c.fw })).not.toThrow();
    }
  });
});
