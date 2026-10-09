import type { DisplayProps } from '../types';
import type { GenericDisplay, GenericTrainer } from './firmware';
import './generic.css';

export function GenericDisplayView({ fw }: DisplayProps) {
  const d: GenericDisplay = (fw as GenericTrainer).display();
  const alarmClass = d.status === 'ceiling' || d.status === 'missed' ? 'is-critical' : d.ascentAlarm || d.status === 'deco' ? 'is-warning' : '';
  return (
    <div className={`generic-lcd ${alarmClass}`} role="img" aria-label="Generic trainer dive computer display">
      {d.screen === 'plan' && (
        <div className="generic-screen">
          <div className="generic-title">PLAN · no-stop limits</div>
          <table className="generic-plan">
            <tbody>
              {d.plan.map((row) => (
                <tr key={row.depth}>
                  <td>
                    {row.depth} {d.unit}
                  </td>
                  <td>{row.ndl} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {d.screen === 'log' && (
        <div className="generic-screen">
          <div className="generic-title">LOG</div>
          {d.log ? (
            <div className="generic-log">
              <div>Dive #{d.log.number}</div>
              <div>
                Max {d.log.maxDepth} {d.unit}
              </div>
              <div>Time {d.log.time}</div>
            </div>
          ) : (
            <div className="generic-log">No dives yet</div>
          )}
        </div>
      )}
      {(d.screen === 'surface' || d.screen === 'dive') && (
        <div className="generic-screen">
          <div className="generic-row generic-row-top">
            <div className="generic-field">
              <span className="generic-label">DEPTH</span>
              <span className="generic-big">{d.depth}</span>
              <span className="generic-unit">{d.unit}</span>
            </div>
            <div className="generic-field right">
              <span className="generic-label">MAX</span>
              <span className="generic-mid">{d.maxDepth}</span>
            </div>
          </div>
          <div className="generic-row generic-row-main">
            <div className="generic-field">
              <span className="generic-label">{d.primaryLabel}</span>
              <span className={`generic-big ${d.status === 'deco' || d.status === 'ceiling' ? 'blink' : ''}`}>{d.primaryValue}</span>
              {d.status === 'no-stop' && <span className="generic-unit">min</span>}
            </div>
            <div className="generic-ascent" aria-label={`ascent rate ${d.ascentSegments} of 5`}>
              {[5, 4, 3, 2, 1].map((n) => (
                <span key={n} className={`seg ${d.ascentSegments >= n ? 'on' : ''} ${n === 5 ? 'top' : ''}`} />
              ))}
              <span className="generic-label">ASC</span>
            </div>
          </div>
          {d.status === 'deco' || d.status === 'ceiling' ? (
            <div className="generic-row generic-deco">
              <span>
                STOP {d.stopDepth} {d.unit} · {d.stopTime} min
              </span>
              <span>TTS {d.tts} min</span>
            </div>
          ) : null}
          <div className="generic-row generic-row-bottom">
            <div className="generic-field">
              <span className="generic-label">DIVE TIME</span>
              <span className="generic-mid">{d.diveTime}</span>
            </div>
            <div className="generic-field">
              <span className="generic-label">TEMP</span>
              <span className="generic-mid">{d.temp}</span>
            </div>
            {d.screen === 'surface' && (
              <>
                <div className="generic-field">
                  <span className="generic-label">SURF</span>
                  <span className="generic-mid">{d.surfaceInterval}</span>
                </div>
                <div className="generic-field">
                  <span className="generic-label">NO FLY</span>
                  <span className="generic-mid">{d.noFly}</span>
                </div>
              </>
            )}
          </div>
          <div className={`generic-message ${d.message ? 'show' : ''}`}>{d.message ?? ''}</div>
        </div>
      )}
    </div>
  );
}
