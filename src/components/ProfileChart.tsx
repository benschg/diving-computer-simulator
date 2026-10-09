import { useMemo, useRef, useState } from 'react';
import { useSim } from '../sim/store';
import type { TracePoint } from '../sim/types';
import { fmtMinSec } from '../sim/format';

const W = 760;
const H_DEPTH = 230;
const H_NDL = 110;
const PAD = { l: 44, r: 16, t: 14, b: 24 };

function niceStep(range: number, target: number): number {
  const raw = range / target;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const m = raw / pow;
  const f = m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10;
  return f * pow;
}

export function ProfileChart({ computerId }: { computerId: string }) {
  const sim = useSim();
  const trace = sim.traces.get(computerId) ?? [];
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const tMax = Math.max(600, sim.t * 1.05);
  const dMax = Math.max(20, Math.ceil((Math.max(0, ...sim.samples.map((s) => s.depthM)) + 3) / 5) * 5);
  const nMax = Math.max(20, Math.ceil(Math.max(0, ...trace.map((p) => Math.min(99, p.ndlMin), ...trace.map((p) => p.ttsMin))) / 10) * 10);

  const x = (t: number) => PAD.l + (t / tMax) * (W - PAD.l - PAD.r);
  const yD = (d: number) => PAD.t + (d / dMax) * (H_DEPTH - PAD.t - PAD.b);
  const yN = (n: number) => PAD.t + (1 - Math.min(n, nMax) / nMax) * (H_NDL - PAD.t - PAD.b);

  const paths = useMemo(() => {
    const step = Math.max(1, Math.floor(sim.samples.length / 1500));
    const depth: string[] = [];
    for (let i = 0; i < sim.samples.length; i += step) {
      const s = sim.samples[i];
      depth.push(`${i === 0 ? 'M' : 'L'}${x(s.t).toFixed(1)},${yD(s.depthM).toFixed(1)}`);
    }
    const last = sim.samples[sim.samples.length - 1];
    if (last) depth.push(`L${x(last.t).toFixed(1)},${yD(last.depthM).toFixed(1)}`);
    const ceiling: string[] = [];
    const ndl: string[] = [];
    const tts: string[] = [];
    let pen = false;
    for (let i = 0; i < trace.length; i += step) {
      const p = trace[i];
      if (p.inDeco && p.ceilingM > 0) {
        ceiling.push(`${pen ? 'L' : 'M'}${x(p.t).toFixed(1)},${yD(p.ceilingM).toFixed(1)}`);
        pen = true;
      } else pen = false;
      ndl.push(`${i === 0 ? 'M' : 'L'}${x(p.t).toFixed(1)},${yN(Math.min(99, p.ndlMin)).toFixed(1)}`);
      tts.push(`${i === 0 ? 'M' : 'L'}${x(p.t).toFixed(1)},${yN(p.ttsMin).toFixed(1)}`);
    }
    return { depth: depth.join(' '), ceiling: ceiling.join(' '), ndl: ndl.join(' '), tts: tts.join(' ') };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sim.version, computerId, tMax, dMax, nMax]);

  const tStep = niceStep(tMax / 60, 6) * 60;
  const dStep = niceStep(dMax, 5);
  const nStep = niceStep(nMax, 3);

  const onMove = (e: React.MouseEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const t = ((px - PAD.l) / (W - PAD.l - PAD.r)) * tMax;
    if (t < 0 || t > sim.t) {
      setHover(null);
      return;
    }
    setHover(Math.round(t));
  };

  const hp: TracePoint | undefined = hover !== null ? trace[Math.min(trace.length - 1, Math.max(0, hover - 1))] : undefined;
  const hs = hover !== null ? sim.samples[Math.min(sim.samples.length - 1, hover)] : undefined;

  return (
    <section className="panel chart" aria-label="Dive profile">
      <div className="panel-head">
        <h3>Dive profile</h3>
        <div className="legend">
          <span className="legend-item">
            <i className="swatch" style={{ background: 'var(--series-1)' }} /> Depth
          </span>
          <span className="legend-item">
            <i className="swatch" style={{ background: 'var(--status-critical)' }} /> Deco ceiling
          </span>
          <span className="legend-item">
            <i className="swatch" style={{ background: 'var(--status-good)', opacity: 0.5 }} /> Safety-stop zone 3–6 m
          </span>
        </div>
      </div>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H_DEPTH + H_NDL}`} className="chart-svg" onMouseMove={onMove} onMouseLeave={() => setHover(null)} role="img" aria-label="Depth over time with deco ceiling and no-stop time">
        {/* depth panel */}
        <rect x={PAD.l} y={yD(3)} width={W - PAD.l - PAD.r} height={yD(6) - yD(3)} fill="var(--status-good)" opacity={0.12} />
        {Array.from({ length: Math.floor(dMax / dStep) + 1 }, (_, i) => i * dStep).map((d) => (
          <g key={`d${d}`}>
            <line x1={PAD.l} x2={W - PAD.r} y1={yD(d)} y2={yD(d)} className="grid" />
            <text x={PAD.l - 6} y={yD(d) + 4} className="tick" textAnchor="end">
              {d} m
            </text>
          </g>
        ))}
        {Array.from({ length: Math.floor(tMax / tStep) + 1 }, (_, i) => i * tStep).map((t) => (
          <g key={`t${t}`}>
            <line x1={x(t)} x2={x(t)} y1={PAD.t} y2={H_DEPTH - PAD.b} className="grid" />
            <text x={x(t)} y={H_DEPTH - PAD.b + 14} className="tick" textAnchor="middle">
              {Math.round(t / 60)} min
            </text>
          </g>
        ))}
        <path d={paths.ceiling} className="line ceiling" />
        <path d={paths.depth} className="line depth" />
        {sim.samples.length > 0 && (
          <circle cx={x(sim.t)} cy={yD(sim.depthM)} r={4.5} className="marker depth" />
        )}

        {/* NDL / TTS panel */}
        <g transform={`translate(0 ${H_DEPTH})`}>
          <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t - 6} y2={PAD.t - 6} className="axis" />
          {Array.from({ length: Math.floor(nMax / nStep) + 1 }, (_, i) => i * nStep).map((n) => (
            <g key={`n${n}`}>
              <line x1={PAD.l} x2={W - PAD.r} y1={yN(n)} y2={yN(n)} className="grid" />
              <text x={PAD.l - 6} y={yN(n) + 4} className="tick" textAnchor="end">
                {n}
              </text>
            </g>
          ))}
          <path d={paths.tts} className="line tts" />
          <path d={paths.ndl} className="line ndl" />
          <text x={PAD.l + 4} y={PAD.t + 2} className="tick label">
            minutes
          </text>
          <g className="legend-svg" transform={`translate(${W - PAD.r - 170} ${PAD.t - 2})`}>
            <rect width={10} height={10} rx={2} fill="var(--series-2)" />
            <text x={14} y={9} className="tick">
              No-stop time
            </text>
            <rect x={96} width={10} height={10} rx={2} fill="var(--series-3)" />
            <text x={110} y={9} className="tick">
              Time to surface
            </text>
          </g>
        </g>

        {hover !== null && hs && (
          <g className="hover">
            <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={H_DEPTH + H_NDL - PAD.b} className="crosshair" />
            <circle cx={x(hover)} cy={yD(hs.depthM)} r={4.5} className="marker depth" />
            <foreignObject x={Math.min(x(hover) + 10, W - 190)} y={PAD.t + 4} width={180} height={92}>
              <div className="tooltip">
                <div>
                  <b>{fmtMinSec(hover)}</b> · {hs.depthM.toFixed(1)} m
                </div>
                {hp && (
                  <>
                    <div>{hp.inDeco ? `Deco: stop ${hp.stopDepthM} m, TTS ${Math.ceil(hp.ttsMin)} min` : `No-stop ${Math.min(99, Math.floor(hp.ndlMin))} min`}</div>
                    {hp.inDeco && <div>Ceiling {hp.ceilingM.toFixed(1)} m</div>}
                    <div>Ascent {hp.ascentRate.toFixed(1)} m/min</div>
                  </>
                )}
              </div>
            </foreignObject>
          </g>
        )}
      </svg>
    </section>
  );
}
