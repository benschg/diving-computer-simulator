import type { DisplayProps } from '../types';
import type { MaresPuckPro, PuckDisplay } from './firmware';
import './mares.css';

export function MaresDisplayView({ fw }: DisplayProps) {
  const d: PuckDisplay = (fw as MaresPuckPro).display();
  return (
    <div className="puck-case">
      <div className="puck-lcd" role="img" aria-label="Mares Puck Pro display">
        {d.screen === 'menu' ? (
          <div className="puck-menu">
            <div className="puck-menu-text">{d.menuText}</div>
            {d.middleCentre && (
              <div>
                <span className="puck-label">{d.middleLabel}</span> <span className="puck-mid">{d.middleCentre}</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="puck-row top">
              <div className="puck-cell">
                <span className="puck-label">{d.screen === 'postdive' ? '' : 'depth'}</span>
                <span className={`puck-depth ${d.depthBlink ? 'blink' : ''}`}>{d.depth}</span>
                <span className="puck-unit">{d.depthUnit}</span>
              </div>
              <div className="puck-cell right">
                <span className="puck-label">{d.topRightLabel}</span>
                <span className="puck-mid">{d.topRight}</span>
                {d.noFly && <span className="puck-plane">✈</span>}
              </div>
            </div>
            <div className="puck-row middle">
              <div className="puck-speed">
                {d.screen === 'dive' && (
                  <>
                    <span className={`puck-speed-val ${d.speedBlink ? 'blink' : ''}`}>{d.speed}</span>
                    <span className="puck-unit">m/min</span>
                    <span className={`puck-fast ${d.fastIcon === 'off' ? '' : d.fastIcon === 'blink' ? 'on blink' : 'on'}`}>fast</span>
                  </>
                )}
                {d.middleLeft && d.screen !== 'dive' && <span className="puck-mid">{d.middleLeft}</span>}
              </div>
              <div className="puck-mid-centre">
                <span className="puck-label">{d.middleLabel}</span>
                <div className="puck-mid-line">
                  {d.screen === 'dive' && d.middleLeft && <span className="puck-mid">{d.middleLeft}</span>}
                  {d.stopMarker === 'down' && <span className="puck-marker blink">▼</span>}
                  {d.stopMarker === 'ok' && <span className="puck-marker">▲▼</span>}
                  <span className="puck-big">{d.middleCentre}</span>
                  {d.middleRight && (
                    <span className="puck-asc">
                      <span className="puck-label">{d.middleRightLabel}</span> <span className="puck-mid">{d.middleRight}</span>
                    </span>
                  )}
                  {d.diverIcon && <span className="puck-diver" aria-label="violation">⛔</span>}
                </div>
              </div>
            </div>
            <div className="puck-row bottom">
              <div className="puck-cell">
                <span className="puck-label">{d.bottomLeftLabel}</span>
                <span className="puck-mid">{d.bottomLeft}</span>
              </div>
              <div className="puck-cell right">
                <span className="puck-mid">{d.bottomRight}</span>
                <span className="puck-label">{d.bottomRightLabel}</span>
              </div>
            </div>
            <div className="puck-n2" aria-label={`nitrogen bar ${d.n2Segments} of 10`}>
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className={`puck-n2-seg ${i < d.n2Segments ? 'on' : ''}`} />
              ))}
              <span className="puck-pfactor">{d.pFactor}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
