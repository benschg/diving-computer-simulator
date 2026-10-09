import type { ComputerCore } from '../sim/core';
import type { Simulation } from '../sim/simulation';
import type { ComputerSettings, CoreSnapshot, SimEvent } from '../sim/types';

export interface LessonContext {
  sim: Simulation;
  fw: ComputerCore;
  snap: CoreSnapshot;
  events: SimEvent[];
  /** scratch space that persists across checks of one lesson run */
  memo: Record<string, number | boolean | undefined>;
}

export interface LessonStep {
  id: string;
  title: string;
  /** what the learner should do */
  instruction: string;
  /** the teaching point behind it */
  why?: string;
  /** completion condition, evaluated on every simulation tick */
  check: (ctx: LessonContext) => boolean;
  /** returns a message when the learner did something that defeats the exercise */
  failIf?: (ctx: LessonContext) => string | null;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  computerId: string;
  settings?: Partial<ComputerSettings>;
  minutes: number;
  steps: LessonStep[];
  debrief: string[];
}

export const hasEvent = (ctx: LessonContext, needle: string): boolean => ctx.events.some((e) => e.text.includes(needle));
