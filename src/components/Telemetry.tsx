import type { ComputerCore } from '../sim/core';
import { fmtHoursMin, fmtMinSec } from '../sim/format';

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'good' | 'warning' | 'critical' }) {
  return (
    <div className={`stat ${tone ?? ''}`}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

/** "Under the hood" view: what the decompression model is computing for this computer right now. */
export function Telemetry({ fw }: { fw: ComputerCore }) {
  const s = fw.snapshot();
  const ndlTone = s.deco.required ? 'critical' : s.ndlMin <= 5 ? 'warning' : undefined;
  return (
    <section className="panel telemetry" aria-label="Model telemetry">
      <div className="panel-head">
        <h3>Under the hood</h3>
        <span className="muted">{s.phase === 'dive' ? 'diving' : s.phase === 'surfaced' ? 'at surface (dive open)' : 'surface mode'}</span>
      </div>
      <div className="stat-grid">
        <Stat label="No-stop time" value={s.deco.required ? 'deco' : `${Math.min(999, Math.floor(s.ndlMin))} min`} tone={ndlTone} />
        <Stat label="Ceiling" value={s.deco.required ? `${s.deco.ceilingM.toFixed(1)} m` : 'none'} tone={s.violation.aboveCeilingS > 0 ? 'critical' : undefined} />
        <Stat label="Time to surface" value={`${Math.ceil(s.deco.ttsMin)} min`} />
        <Stat label="Ascent rate" value={`${s.ascentRateMPerMin.toFixed(1)} m/min`} tone={s.ascentRateMPerMin > 10 ? 'warning' : undefined} />
        <Stat label="GF99 / SurfGF" value={`${Math.round(s.deco.gf99)} / ${Math.round(s.deco.surfGF)} %`} />
        <Stat label="CNS O₂" value={`${s.cnsPercent.toFixed(0)} % · PO₂ ${s.pO2.toFixed(2)}`} tone={s.pO2 > 1.4 ? 'warning' : undefined} />
        <Stat label="Safety stop" value={s.safetyStop.status === 'none' ? '–' : `${s.safetyStop.status} ${fmtMinSec(s.safetyStop.remainingS)}`} />
        <Stat label="Surface / no-fly" value={s.diveNumber ? `${fmtHoursMin(s.surfaceIntervalS)} / ${fmtHoursMin(s.noFlyS)}` : '–'} />
      </div>
      <div className="tissues" aria-label="Tissue loading per compartment">
        <div className="tissues-head">
          <span>Tissue loading (16 compartments, fast → slow)</span>
          <span className="muted">bar = % of surfacing limit</span>
        </div>
        <div className="tissue-bars">
          {s.tissueLoading.map((f, i) => (
            <div key={i} className="tissue-slot" title={`Compartment ${i + 1}: ${(f * 100).toFixed(0)} %`}>
              <div className={`tissue-bar ${f >= 1 ? 'over' : f >= 0.8 ? 'warm' : ''}`} style={{ height: `${Math.min(100, f * 100)}%` }} />
            </div>
          ))}
        </div>
      </div>
      {s.alarms.length > 0 && (
        <ul className="alarm-list">
          {s.alarms.map((a) => (
            <li key={a.id} className={`alarm ${a.severity}`}>
              {a.audible ? '🔔 ' : ''}
              {a.text}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
