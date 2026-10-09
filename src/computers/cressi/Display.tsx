import type { DisplayProps } from '../types';
import type { CressiLeonardo, LeoDisplay } from './firmware';
import './cressi.css';

export function CressiDisplayView({ fw }: DisplayProps) {
  const d: LeoDisplay = (fw as CressiLeonardo).display();
  return (
    <div className="leo-case">
      <div className="leo-lcd" role="img" aria-label="Cressi Leonardo display">
        {d.screen === 'menu' ? (
          <div className="leo-menu">
            <div className="leo-menu-text">{d.menuText}</div>
            <div className="leo-small">{d.bottomLeft}</div>
          </div>
        ) : (
          <>
            <div className="leo-top">
              <div className="leo-cell">
                <span className={`leo-stage ${d.stageIcon !== 'none' ? 'on' : ''} ${d.stageFlash ? 'blink' : ''}`}>{d.stageIcon === 'deco' ? '⊗' : d.stageIcon === 'stop' ? '⊙' : d.stageIcon === 'deep' ? '⊛' : '⊗'}</span>
                <span className="leo-small">{d.topLeftLabel}</span>
                <span className="leo-mid">{d.topLeft}</span>
                <span className="leo-small">{d.topLeftUnit}</span>
              </div>
              <div className="leo-cell right">
                <span className="leo-small">{d.topRightLabel}</span>
                <span className="leo-mid">{d.topRight}</span>
                <span className="leo-small">{d.topRightUnit}</span>
              </div>
            </div>
            <div className="leo-labels">
              <span className={`leo-tag ${d.decoLabel ? 'on' : ''}`}>DECO</span>
              <span className={`leo-tag ${d.deepLabel ? 'on' : ''}`}>DEEP</span>
              <span className={`leo-tag ${d.stopLabel ? 'on' : ''} ${d.stopFlash ? 'blink' : ''}`}>STOP</span>
              {d.nitrox && (
                <span className="leo-o2" aria-label={`O2 toxicity ${d.o2Segments} of 5`}>
                  NITROX{' '}
                  {Array.from({ length: 5 }, (_, i) => (
                    <i key={i} className={i < d.o2Segments ? 'on' : ''} />
                  ))}
                </span>
              )}
            </div>
            <div className="leo-middle">
              <div className="leo-depth-block">
                <span className="leo-small">{d.depthLabel}</span>
                <div>
                  <span className="leo-depth">{d.depth}</span>
                  <span className="leo-small"> {d.depthUnit}</span>
                </div>
              </div>
              <div className="leo-arrows">
                {[3, 2, 1].map((n) => (
                  <span key={n} className={`leo-arrow ${d.arrows >= n ? 'on' : ''} ${d.arrowsFlash ? 'blink' : ''}`}>
                    ▲
                  </span>
                ))}
                <span className={`leo-tag ${d.slow ? 'on blink' : ''}`}>SLOW</span>
                {d.upArrow && <span className="leo-arrow on blink">▲</span>}
                {d.downArrow && <span className="leo-arrow on blink">▼</span>}
              </div>
              <div className="leo-right">
                <span className={`leo-big ${d.rightFlash ? 'blink' : ''}`}>{d.rightValue}</span>
                <span className={`leo-small ${d.rightFlash ? 'blink' : ''}`}>{d.rightLabel}</span>
              </div>
            </div>
            <div className="leo-bottom">
              <span className="leo-mid">{d.bottomLeft}</span>
              <span className="leo-small">
                {Array.from({ length: d.altitude }, (_, i) => (
                  <span key={i}>▲</span>
                ))}
              </span>
              <span className={`leo-tag ${d.noFly ? 'on' : ''}`}>NO FLY ✈</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
