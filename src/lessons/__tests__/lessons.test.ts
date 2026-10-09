import { describe, expect, it } from 'vitest';
import { computerById } from '../../computers/registry';
import { Simulation } from '../../sim/simulation';
import { DEFAULT_SETTINGS } from '../../sim/types';
import { LESSONS, lessonById } from '../lessons';
import type { Lesson, LessonContext } from '../types';

/** Mirrors the LessonRunner's evaluation loop so each lesson can be solved headlessly. */
class Runner {
  sim = new Simulation();
  stepIndex = 0;
  finished = false;
  failure: string | null = null;
  memo: LessonContext['memo'] = {};
  constructor(public lesson: Lesson) {
    const def = computerById(lesson.computerId);
    this.sim.setComputers([{ id: lesson.computerId, create: () => def.create({ ...DEFAULT_SETTINGS, ...lesson.settings }) }]);
  }
  get fw() {
    return this.sim.computer(this.lesson.computerId)!;
  }
  private tick(): void {
    if (this.finished || this.failure) return;
    const step = this.lesson.steps[this.stepIndex];
    const ctx: LessonContext = { sim: this.sim, fw: this.fw, snap: this.fw.snapshot(), events: this.sim.events, memo: this.memo };
    const fail = step.failIf?.(ctx) ?? null;
    if (fail) {
      this.failure = fail;
      return;
    }
    if (step.check(ctx)) {
      if (this.stepIndex + 1 >= this.lesson.steps.length) this.finished = true;
      else this.stepIndex++;
    }
  }
  go(depthM: number, rate: number): void {
    this.sim.setTarget(depthM, rate);
  }
  advance(seconds: number): void {
    for (let i = 0; i < seconds; i++) {
      this.sim.stepSeconds(1);
      this.tick();
    }
  }
  /** advance until the runner has moved past step `idx` (0-based), or maxS seconds elapsed */
  until(idx: number, maxS: number): void {
    let n = 0;
    while (this.stepIndex <= idx && !this.finished && !this.failure && n < maxS) {
      this.sim.stepSeconds(1);
      this.tick();
      n++;
    }
  }
  press(button: string, times = 1): void {
    for (let i = 0; i < times; i++) this.fw.press(button, 'short');
    this.tick();
  }
}

const SOLUTIONS: Record<string, (r: Runner) => void> = {
  'first-look': (r) => {
    r.go(18, 18);
    r.until(0, 120);
    r.until(1, 300);
    r.until(2, 15 * 60);
    r.go(5, 9);
    r.until(3, 200);
    r.until(4, 300);
    r.go(0, 6);
    r.until(5, 200);
  },
  'first-limit': (r) => {
    r.go(24, 18);
    r.until(0, 120);
    r.until(1, 40 * 60);
    r.go(5, 9);
    r.until(2, 300);
    r.until(3, 400);
    r.go(0, 6);
    r.until(4, 200);
  },
  'too-fast': (r) => {
    r.go(20, 18);
    r.until(0, 8 * 60);
    r.go(10, 18);
    r.until(1, 120);
    r.go(4, 6);
    r.until(2, 15 * 60);
    r.go(0, 6);
    r.until(3, 200);
  },
  'emergency-deco': (r) => {
    r.go(30, 18);
    r.until(0, 150);
    r.until(1, 40 * 60);
    r.go(4, 9);
    r.until(2, 300);
    r.until(3, 30 * 60);
    r.go(0, 6);
    r.until(4, 200);
  },
  'missed-stop': (r) => {
    r.go(30, 18);
    r.until(0, 60 * 60);
    r.go(2, 9);
    r.until(1, 300);
    r.until(2, 400);
    r.go(0, 6);
    r.until(3, 600);
  },
  repetitive: (r) => {
    r.go(18, 18);
    r.advance(31 * 60);
    r.go(5, 9);
    r.advance(4 * 60);
    r.go(0, 6);
    r.until(0, 600);
    r.advance(3600);
    r.until(1, 10);
    r.press('mode'); // DIVE -> PLAN
    r.until(2, 5);
    r.press('mode', 3); // PLAN -> MEM -> TIME -> DIVE
    r.go(18, 18);
    r.until(3, 200);
  },
  nitrox: (r) => {
    r.go(24, 18);
    r.until(0, 150);
    r.go(34, 18);
    r.until(1, 120);
    r.go(24, 9);
    r.until(2, 200);
  },
  'dual-algorithm': (r) => {
    r.press('adv', 4); // main -> ALT1 -> ALT2 -> FLY -> PLAN
    r.until(0, 5);
    r.fw.updateSettings({ conservatism: 1 });
    r.until(1, 5);
    r.fw.updateSettings({ conservatism: 3 });
    r.until(2, 5);
  },
};

describe('every lesson can be completed by following its instructions', () => {
  for (const lesson of LESSONS) {
    it(lesson.title, () => {
      const solve = SOLUTIONS[lesson.id];
      expect(solve, `no solution script for ${lesson.id}`).toBeTruthy();
      const r = new Runner(lesson);
      solve(r);
      expect(r.failure, `failure at step ${r.stepIndex} (${lesson.steps[r.stepIndex]?.id})`).toBeNull();
      expect(r.finished, `stuck at step ${r.stepIndex} (${lesson.steps[r.stepIndex]?.id})`).toBe(true);
    });
  }
  it('lesson ids are unique and resolvable', () => {
    const ids = new Set(LESSONS.map((l) => l.id));
    expect(ids.size).toBe(LESSONS.length);
    for (const l of LESSONS) expect(lessonById(l.id)).toBe(l);
  });
});
