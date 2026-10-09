import { useMemo, useState } from 'react';
import { COMPUTERS, computerById } from '../computers/registry';
import { useSim } from '../sim/store';
import { DEFAULT_SETTINGS } from '../sim/types';
import { fmtMinSec } from '../sim/format';
import { ComputerShell } from './ComputerShell';
import { DiveControls } from './DiveControls';
import { EventLog } from './EventLog';
import { ProfileChart } from './ProfileChart';

const SERIES = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)', 'var(--series-4)', 'var(--series-5)', 'var(--series-6)'];
const DEPTHS = [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42];

export function ComparePage() {
  const sim = useSim();
  return (
    <div className="layout compare">
      <main className="col col-main">
        <DiveControls />
        <LiveTable />
        <div className="compare-grid">
          {sim.computers.map((c) => (
            <ComputerShell key={c.id} def={computerById(c.id)} fw={c.fw} compact />
          ))}
        </div>
        <ProfileChart computerId={sim.computers[0]?.id ?? ''} />
        <NdlChart />
      </main>
      <aside className="col col-right">
        <EventLog />
      </aside>
    </div>
  );
}

function LiveTable() {
  const sim = useSim();
  return (
    <section className="panel" aria-label="Live comparison">
      <div className="panel-head">
        <h3>Same dive, every computer</h3>
        <span className="muted">what each one shows right now</span>
      </div>
      <div className="table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Computer</th>
              <th>No-stop</th>
              <th>Deco</th>
              <th>TTS</th>
              <th>Safety stop</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sim.computers.map((c) => {
              const def = computerById(c.id);
              const s = c.fw.snapshot();
              const alarm = s.alarms.find((a) => a.severity === 'critical') ?? s.alarms.find((a) => a.severity === 'warning');
              return (
                <tr key={c.id}>
                  <td>
                    <b>{def.brand}</b> {def.model}
                  </td>
                  <td className={s.deco.required ? 'crit' : s.ndlMin <= 5 && s.phase === 'dive' ? 'warn' : ''}>{s.deco.required ? '0' : s.phase === 'dive' ? Math.min(99, Math.floor(s.ndlMin)) : '–'}</td>
                  <td className={s.deco.required ? 'crit' : ''}>{s.deco.required ? `${s.deco.stopDepthM} m · ${Math.ceil(s.deco.stopTimeMin)} min` : '–'}</td>
                  <td>{s.phase === 'dive' ? `${Math.ceil(s.deco.ttsMin)} min` : '–'}</td>
                  <td>{s.safetyStop.status === 'none' ? '–' : `${s.safetyStop.status}${s.safetyStop.mandatory ? ' (mandatory)' : ''} ${fmtMinSec(s.safetyStop.remainingS)}`}</td>
                  <td className={s.locked ? 'crit' : alarm ? alarm.severity === 'critical' ? 'crit' : 'warn' : ''}>{s.locked ? `LOCKED ${Math.ceil(s.lockoutRemainingS / 3600)} h` : alarm ? alarm.text.split(/[–:(]/)[0].trim() : s.phase === 'dive' ? 'ok' : s.diveNumber ? `surface ${Math.floor(s.surfaceIntervalS / 60)} min` : 'ready'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function NdlChart() {
  const [hover, setHover] = useState<number | null>(null);
  const data = useMemo(
    () =>
      COMPUTERS.map((def) => {
        const fw = def.create({ ...DEFAULT_SETTINGS });
        return { def, ndl: DEPTHS.map((d) => Math.min(99, fw.ndlAtDepth(d))) };
      }),
    [],
  );
  const W = 760;
  const H = 300;
  const PAD = { l: 44, r: 16, t: 16, b: 30 };
  const x = (d: number) => PAD.l + ((d - DEPTHS[0]) / (DEPTHS[DEPTHS.length - 1] - DEPTHS[0])) * (W - PAD.l - PAD.r);
  const y = (n: number) => PAD.t + (1 - n / 100) * (H - PAD.t - PAD.b);
  const idx = hover !== null ? Math.max(0, Math.min(DEPTHS.length - 1, Math.round(((hover - PAD.l) / (W - PAD.l - PAD.r)) * (DEPTHS.length - 1)))) : null;
  return (
    <section className="panel chart" aria-label="No-stop limits by computer">
      <div className="panel-head">
        <h3>First-dive no-stop limits, air, sea level</h3>
        <span className="muted">factory conservatism · capped at 99 min</span>
      </div>
      <div className="legend wrap">
        {data.map((row, i) => (
          <span key={row.def.id} className="legend-item">
            <i className="swatch" style={{ background: SERIES[i % SERIES.length] }} /> {row.def.brand} {row.def.model.split(' (')[0]}
          </span>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="chart-svg"
        role="img"
        aria-label="No-stop limit in minutes versus depth for each computer"
        onMouseMove={(e) => {
          const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          setHover(((e.clientX - r.left) / r.width) * W);
        }}
        onMouseLeave={() => setHover(null)}
      >
        {[0, 20, 40, 60, 80, 100].map((n) => (
          <g key={n}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(n)} y2={y(n)} className="grid" />
            <text x={PAD.l - 6} y={y(n) + 4} className="tick" textAnchor="end">
              {n}
            </text>
          </g>
        ))}
        {DEPTHS.map((d) => (
          <text key={d} x={x(d)} y={H - PAD.b + 16} className="tick" textAnchor="middle">
            {d} m
          </text>
        ))}
        {data.map((row, i) => (
          <path key={row.def.id} d={row.ndl.map((n, j) => `${j === 0 ? 'M' : 'L'}${x(DEPTHS[j]).toFixed(1)},${y(n).toFixed(1)}`).join(' ')} className="line" style={{ stroke: SERIES[i % SERIES.length] }} />
        ))}
        {idx !== null && (
          <g>
            <line x1={x(DEPTHS[idx])} x2={x(DEPTHS[idx])} y1={PAD.t} y2={H - PAD.b} className="crosshair" />
            {data.map((row, i) => (
              <circle key={row.def.id} cx={x(DEPTHS[idx])} cy={y(row.ndl[idx])} r={4.5} style={{ fill: SERIES[i % SERIES.length], stroke: 'var(--surface)', strokeWidth: 2 }} />
            ))}
            <foreignObject x={Math.min(x(DEPTHS[idx]) + 10, W - 230)} y={PAD.t} width={220} height={150}>
              <div className="tooltip">
                <b>{DEPTHS[idx]} m</b>
                {data.map((row) => (
                  <div key={row.def.id}>
                    {row.def.brand} {row.def.model.split(' (')[0]}: {Math.floor(row.ndl[idx]) >= 99 ? '99+' : Math.floor(row.ndl[idx])} min
                  </div>
                ))}
              </div>
            </foreignObject>
          </g>
        )}
      </svg>
      <details className="table-view">
        <summary className="muted small">Table view</summary>
        <div className="table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Depth</th>
                {data.map((row) => (
                  <th key={row.def.id}>{row.def.brand}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEPTHS.map((d, j) => (
                <tr key={d}>
                  <td>{d} m</td>
                  {data.map((row) => (
                    <td key={row.def.id}>{Math.floor(row.ndl[j]) >= 99 ? '99+' : Math.floor(row.ndl[j])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
