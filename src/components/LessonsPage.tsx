import { useEffect, useRef, useState } from 'react';
import { computerById } from '../computers/registry';
import { LESSONS, lessonById } from '../lessons/lessons';
import type { Lesson, LessonContext } from '../lessons/types';
import { useSim } from '../sim/store';
import { DEFAULT_SETTINGS } from '../sim/types';
import { ComputerShell } from './ComputerShell';
import { DiveControls } from './DiveControls';
import { EventLog } from './EventLog';
import { ProfileChart } from './ProfileChart';
import { SettingsPanel } from './SettingsPanel';

export function LessonsPage() {
  const [lessonId, setLessonId] = useState<string | null>(null);
  const lesson = lessonId ? lessonById(lessonId) : undefined;
  if (!lesson) return <LessonList onPick={setLessonId} />;
  return <LessonRunner key={lesson.id} lesson={lesson} onExit={() => setLessonId(null)} />;
}

function LessonList({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div className="page">
      <h2>Lessons</h2>
      <p className="muted">
        Guided exercises on real computer behaviour. Each lesson sets up a computer, tells you what to do, and checks the simulation live. They follow the
        PADI Open Water learning objectives for dive computers – but with real products instead of a generic display.
      </p>
      <div className="lesson-grid">
        {LESSONS.map((l) => {
          const def = computerById(l.computerId);
          return (
            <button key={l.id} className="lesson-card" onClick={() => onPick(l.id)}>
              <div className="lesson-title">{l.title}</div>
              <div className="lesson-summary">{l.summary}</div>
              <div className="lesson-meta">
                <span>
                  {def.brand} {def.model}
                </span>
                <span>· ~{l.minutes} min</span>
                <span>· {l.steps.length} steps</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LessonRunner({ lesson, onExit }: { lesson: Lesson; onExit: () => void }) {
  const sim = useSim();
  const def = computerById(lesson.computerId);
  const [stepIndex, setStepIndex] = useState(0);
  const [failure, setFailure] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const memo = useRef<LessonContext['memo']>({});

  useEffect(() => {
    sim.reset();
    sim.setComputers([{ id: lesson.computerId, create: () => def.create({ ...DEFAULT_SETTINGS, ...lesson.settings }) }]);
    sim.reset();
    memo.current = {};
    setStepIndex(0);
    setFailure(null);
    setFinished(false);
  }, [sim, lesson, def]);

  const fw = sim.computer(lesson.computerId);
  const step = lesson.steps[stepIndex];

  useEffect(() => {
    if (!fw || !step || finished || failure) return;
    const ctx: LessonContext = { sim, fw, snap: fw.snapshot(), events: sim.events, memo: memo.current };
    const fail = step.failIf?.(ctx) ?? null;
    if (fail) {
      setFailure(fail);
      sim.pause();
      return;
    }
    if (step.check(ctx)) {
      if (stepIndex + 1 >= lesson.steps.length) {
        setFinished(true);
        sim.pause();
      } else setStepIndex(stepIndex + 1);
    }
  });

  const restart = () => {
    sim.reset();
    memo.current = {};
    setStepIndex(0);
    setFailure(null);
    setFinished(false);
  };

  return (
    <div className="layout">
      <aside className="col col-left">
        <section className="panel lesson-panel" aria-label="Lesson">
          <div className="panel-head">
            <h3>{lesson.title}</h3>
            <button className="chip" onClick={onExit}>
              ← all lessons
            </button>
          </div>
          <ol className="lesson-steps">
            {lesson.steps.map((s, i) => (
              <li key={s.id} className={`lesson-step ${i < stepIndex || finished ? 'done' : i === stepIndex ? 'current' : ''}`}>
                <span className="lesson-step-mark">{i < stepIndex || finished ? '✓' : i + 1}</span>
                <div>
                  <div className="lesson-step-title">{s.title}</div>
                  {i === stepIndex && !finished && (
                    <>
                      <p className="lesson-instruction">{s.instruction}</p>
                      {s.why && <p className="lesson-why">{s.why}</p>}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ol>
          {failure && (
            <div className="lesson-failure">
              <b>Not quite.</b> {failure}
              <div>
                <button className="btn" onClick={restart}>
                  Restart lesson
                </button>
              </div>
            </div>
          )}
          {finished && (
            <div className="lesson-debrief">
              <b>Lesson complete.</b>
              <ul>
                {lesson.debrief.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="controls-row">
                <button className="btn" onClick={restart}>
                  Run again
                </button>
                <button className="btn primary" onClick={onExit}>
                  Next lesson
                </button>
              </div>
            </div>
          )}
        </section>
        {fw && <ComputerShell def={def} fw={fw} />}
        {fw && <SettingsPanel def={def} fw={fw} />}
      </aside>
      <main className="col col-main">
        <DiveControls />
        <ProfileChart computerId={lesson.computerId} />
      </main>
      <aside className="col col-right">
        <EventLog filterSource={lesson.computerId} />
      </aside>
    </div>
  );
}
