import type { DisplayProps } from '../types';
import type { DescentDisplay, GarminDescentG1 } from './firmware';
import './garmin.css';

export function GarminDisplayView({ fw }: DisplayProps) {
  const d: DescentDisplay = (fw as GarminDescentG1).display();
  return (
    <div className="g1-case">
      <div className="g1-screen" role="img" aria-label="Garmin Descent G1 display">
        {d.alert && (
          <div className="g1-alert">
            <div className="g1-alert-title">{d.alert.title}</div>
            <div>{d.alert.body}</div>
            <div className="g1-small">BACK to dismiss</div>
          </div>
        )}
        {!d.alert && d.screen === 'menu' && d.menu && (
          <ul className="g1-menu">
            {d.menu.items.map((item, i) => (
              <li key={item} className={i === d.menu!.index ? 'is-on' : ''}>
                {item}
              </li>
            ))}
          </ul>
        )}
        {!d.alert && d.screen === 'watch' && (
          <div className="g1-watch">
            <div className="g1-clock">{d.clock}</div>
            <div className="g1-small">{d.locked ? 'DIVE LOCKOUT' : 'START · dive'}</div>
          </div>
        )}
        {!d.alert && d.screen === 'surface' && (
          <div className="g1-watch">
            <div className="g1-small">SURFACE INTERVAL</div>
            <div className="g1-clock">{d.surface?.interval ?? '0:00'}</div>
            <div className="g1-row">
              <span>No fly {d.surface?.noFly ?? '--'}</span>
            </div>
            <div className="g1-row">
              <span>Tissue load {d.surface?.tissue ?? '0%'}</span>
            </div>
            {d.locked && <div className="g1-small">DECO LOCKOUT 24 h</div>}
          </div>
        )}
        {!d.alert && (d.screen === 'primary' || d.screen === 'secondary' || d.screen === 'compass') && (
          <div className="g1-dive">
            <div className="g1-tissue" aria-label={`tissue load ${d.tissueSegments} of 3`}>
              {[3, 2, 1].map((n) => (
                <span key={n} className={`g1-tseg ${d.tissueSegments >= n ? 'on' : ''}`} />
              ))}
              <span className="g1-small">N2</span>
            </div>
            <div className="g1-main">
              {d.screen === 'compass' ? (
                <div className="g1-compass">
                  <div className="g1-small">NE</div>
                  <div className="g1-big">059°</div>
                  <div className="g1-small">E</div>
                </div>
              ) : (
                <>
                  <div className="g1-row top">
                    <span>
                      <span className="g1-small">NDL </span>
                      <span className="g1-mid">{d.ndl}</span>
                    </span>
                    <span className="g1-depth-circle">
                      <span className="g1-big">{d.depth}</span>
                      <span className="g1-small">{d.depthUnit}</span>
                    </span>
                  </div>
                  {d.gauge.kind !== 'none' ? (
                    <div className={`g1-gauge ${d.gauge.violated ? 'flash' : ''}`}>
                      <div className="g1-small">{d.gauge.label}</div>
                      <div className="g1-mid">{d.gauge.value}</div>
                      <div className="g1-bar">
                        <div className="g1-bar-fill" style={{ width: `${Math.round(d.gauge.fraction * 100)}%` }} />
                      </div>
                      <div className="g1-small">{d.gauge.range}</div>
                    </div>
                  ) : d.screen === 'primary' ? (
                    <div className="g1-row">
                      <span>
                        <span className="g1-mid">{d.gas}</span> <span className="g1-small">{d.po2}</span>
                      </span>
                      <span>
                        <span className="g1-small">TEMP. </span>
                        <span className="g1-mid">{d.temp}</span>
                      </span>
                    </div>
                  ) : (
                    <div className="g1-row">
                      <span>
                        <span className="g1-small">TTS </span>
                        <span className="g1-mid">{d.secondary.tts}</span>
                      </span>
                      <span>
                        <span className="g1-small">MAX DPTH </span>
                        <span className="g1-mid">{d.secondary.maxDepth}</span>
                      </span>
                      <span>
                        <span className="g1-small">SurfGF </span>
                        <span className="g1-mid">{d.secondary.surfGf}</span>
                      </span>
                    </div>
                  )}
                  <div className="g1-time">{d.time}</div>
                </>
              )}
            </div>
            <div className="g1-chevrons" aria-label={`ascent rate ${d.chevrons} chevrons`}>
              {[3, 2, 1].map((n) => (
                <span key={n} className={`g1-chev ${d.chevrons >= n ? 'on' : ''} ${d.chevronsAlternate ? 'flash' : ''}`}>
                  ^
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="g1-btn-labels">
        <span>LIGHT</span>
        <span>START</span>
        <span>UP</span>
        <span>BACK</span>
        <span>DOWN</span>
      </div>
    </div>
  );
}
