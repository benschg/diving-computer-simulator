import type { DisplayProps } from '../types';
import type { SuuntoZoopNovo, ZoopDisplay } from './firmware';
import './suunto.css';

function Arrow({ kind }: { kind: ZoopDisplay['centre']['arrow'] }) {
  if (!kind) return null;
  if (kind === 'both') return <span className="zoop-arrow both" aria-label="at the ceiling">⇅</span>;
  return <span className={`zoop-arrow ${kind}`} aria-label={kind === 'up' ? 'ascend' : 'descend'}>{kind === 'up' ? '▲' : '▼'}</span>;
}

export function SuuntoDisplayView({ fw }: DisplayProps) {
  const d: ZoopDisplay = (fw as SuuntoZoopNovo).display();
  const c = d.centre;
  return (
    <div className="zoop-case">
      <div className="zoop-lcd" role="img" aria-label="Suunto Zoop Novo display">
        <div className="zoop-top-icons">
          <span className={`zoop-icon ${d.icons.alarm ? 'on' : ''}`}>((•</span>
          <span className={`zoop-icon ${d.icons.noFly ? 'on' : ''}`}>✈NO</span>
          <span className={`zoop-icon ${d.icons.attention ? 'on' : ''}`}>⚠</span>
        </div>
        <div className="zoop-depth-row">
          <span className={`zoop-ac ${d.icons.ac ? 'on' : ''}`}>AC</span>
          <span className={`zoop-depth ${d.depthBlink ? 'blink' : ''}`}>{d.depth || ' '}</span>
          <span className="zoop-unit">{d.depth ? d.depthUnit : ''}</span>
        </div>
        <div className="zoop-label-row">
          <span className={`zoop-tag ${d.labels.ceiling ? 'on' : ''}`}>CEILING</span>
          <span className={`zoop-tag ${d.labels.stop ? 'on' : ''}`}>STOP</span>
          <span className={`zoop-tag ${d.labels.ascTime ? 'on' : ''} ${d.labels.ascTimeBlink ? 'blink' : ''}`}>ASC TIME</span>
        </div>
        <div className="zoop-middle">
          <div className="zoop-matrix">
            {(c.kind === 'ndl' || c.kind === 'stop' || c.kind === 'time' || c.kind === 'plan') && (
              <>
                {c.line1 && <div className="zoop-matrix-text">{c.line1}</div>}
                <div className="zoop-big">{c.big}</div>
                {c.text && <div className={`zoop-matrix-text ${c.textBlink ? 'blink' : ''}`}>{c.text}</div>}
              </>
            )}
            {(c.kind === 'deco' || c.kind === 'mandatory' || c.kind === 'deepstop' || c.kind === 'deepstop-plan') && (
              <>
                <div className="zoop-pair">
                  <span className="zoop-mid">{c.left}</span>
                  <Arrow kind={c.arrow ?? null} />
                  <span className={`zoop-mid ${c.rightBlink ? 'blink' : ''}`}>{c.right}</span>
                </div>
                {c.text && <div className={`zoop-matrix-text ${c.textBlink ? 'blink' : ''}`}>{c.text}</div>}
              </>
            )}
            {(c.kind === 'surface' || c.kind === 'predive' || c.kind === 'mem') && (
              <>
                <div className="zoop-matrix-text big">{c.line1}</div>
                <div className="zoop-matrix-text big">{c.line2}</div>
              </>
            )}
            {c.kind === 'error' && (
              <>
                {c.line1 && <div className="zoop-matrix-text">{c.line1}</div>}
                <div className="zoop-big blink">{c.text}</div>
              </>
            )}
          </div>
          <div className="zoop-ascent" aria-label={`ascent rate bar ${d.ascentSegments} of 15`}>
            {Array.from({ length: 15 }, (_, i) => 14 - i).map((n) => (
              <span key={n} className={`zoop-seg ${d.ascentSegments > n ? 'on' : ''} ${d.ascentBlink && n < 14 && d.ascentSegments > n ? 'blink' : ''} ${n === 14 ? 'top' : ''}`} />
            ))}
          </div>
        </div>
        <div className="zoop-under-labels">
          <span className={`zoop-tag ${d.slow ? 'on blink' : ''}`}>SLOW</span>
          <span className={`zoop-tag ${d.labels.noDecTime ? 'on' : ''}`}>NO DEC TIME</span>
        </div>
        <div className="zoop-bottom">
          <div className="zoop-field">
            <span className="zoop-small-label">{d.bottomLeft.label}</span>
            <span className="zoop-digits">{d.bottomLeft.value}</span>
            <span className="zoop-unit">{d.bottomLeft.unit}</span>
          </div>
          <div className="zoop-field right">
            <span className="zoop-digits">{d.bottomRight.value}</span>
            <span className="zoop-unit">{d.bottomRight.unit}</span>
            <span className="zoop-small-label">{d.bottomRight.label}</span>
          </div>
        </div>
      </div>
      <div className="zoop-btn-labels">
        <span>SELECT</span>
        <span>MODE</span>
        <span>DOWN</span>
        <span>UP</span>
      </div>
    </div>
  );
}
