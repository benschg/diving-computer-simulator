import { useState } from 'react';
import { useSim } from '../sim/store';
import { MAX_DEPTH_M, SPEEDS, type Speed } from '../sim/simulation';
import { fmtMinSec } from '../sim/format';

const ASCENT_RATES: Array<{ rate: number; label: string; note: string }> = [
  { rate: 6, label: '6 m/min', note: 'very slow' },
  { rate: 9, label: '9 m/min', note: 'textbook' },
  { rate: 18, label: '18 m/min', note: 'PADI max' },
  { rate: 30, label: '30 m/min', note: 'too fast!' },
];
const DESCENT_RATES = [10, 18, 30];
const QUICK_DEPTHS = [5, 10, 12, 18, 24, 30, 40];

export function DiveControls() {
  const sim = useSim();
  const [ascentRate, setAscentRate] = useState(9);
  const [descentRate, setDescentRate] = useState(18);
  const atSurface = sim.depthM < 0.05;

  const go = (depth: number) => {
    const rate = depth > sim.depthM ? descentRate : ascentRate;
    sim.setTarget(depth, rate);
    if (!sim.running) sim.start();
  };

  return (
    <section className="panel controls" aria-label="Dive controls">
      <div className="controls-row">
        <button className={`btn primary ${sim.running ? 'is-on' : ''}`} onClick={() => sim.toggle()}>
          {sim.running ? '❚❚ Pause' : '▶ Run'}
        </button>
        <button className="btn" onClick={() => sim.reset()}>
          ↺ Reset
        </button>
        <div className="seg-group" role="group" aria-label="Time speed">
          {SPEEDS.map((s) => (
            <button key={s} className={`seg-btn ${sim.speed === s ? 'is-on' : ''}`} onClick={() => sim.setSpeed(s as Speed)}>
              {s}×
            </button>
          ))}
        </div>
        <div className="clock" title="Simulated elapsed time">
          t = {fmtMinSec(sim.t)}
        </div>
      </div>

      <div className="controls-row depth-row">
        <label className="field">
          <span className="field-label">Target depth</span>
          <input
            type="range"
            min={0}
            max={MAX_DEPTH_M}
            step={0.5}
            value={sim.targetDepthM}
            onChange={(e) => go(Number(e.target.value))}
            aria-label="Target depth in metres"
          />
          <span className="field-value">
            {sim.targetDepthM.toFixed(1)} m · now {sim.depthM.toFixed(1)} m
            {sim.verticalState !== 'level' && <em> ({sim.verticalState} at {sim.rateMPerMin} m/min)</em>}
          </span>
        </label>
      </div>

      <div className="controls-row">
        <span className="field-label">Go to</span>
        {QUICK_DEPTHS.map((d) => (
          <button key={d} className="chip" onClick={() => go(d)}>
            {d} m
          </button>
        ))}
        <button className="chip" onClick={() => sim.hold()}>
          Hold
        </button>
        <button className="chip accent" onClick={() => go(0)}>
          Surface
        </button>
      </div>

      <div className="controls-row">
        <span className="field-label">Descend at</span>
        {DESCENT_RATES.map((r) => (
          <button key={r} className={`chip ${descentRate === r ? 'is-on' : ''}`} onClick={() => setDescentRate(r)}>
            {r} m/min
          </button>
        ))}
        <span className="field-label">Ascend at</span>
        {ASCENT_RATES.map((r) => (
          <button
            key={r.rate}
            className={`chip ${ascentRate === r.rate ? 'is-on' : ''} ${r.rate > 18 ? 'danger' : ''}`}
            title={r.note}
            onClick={() => {
              setAscentRate(r.rate);
              if (sim.verticalState === 'ascending') sim.setRate(r.rate);
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="controls-row">
        <span className="field-label">Skip time</span>
        {[1, 5, 10].map((m) => (
          <button key={m} className="chip" onClick={() => sim.skip(m * 60)} title="Hold the current depth and fast-forward">
            +{m} min
          </button>
        ))}
        {atSurface && (
          <>
            {[1, 3, 12].map((h) => (
              <button key={h} className="chip" onClick={() => sim.skip(h * 3600)} title="Surface interval">
                +{h} h surface
              </button>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
