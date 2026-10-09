import type { DisplayProps } from '../types';
import type { OceanicVeo4, VeoDisplay } from './firmware';
import './oceanic.css';

export function OceanicDisplayView({ fw }: DisplayProps) {
  const d: VeoDisplay = (fw as OceanicVeo4).display();
  return (
    <div className="veo-lcd" role="img" aria-label="Oceanic Veo 4.0 display">
      <div className="veo-captions">
        <span className={`veo-cap ${d.slowCaption ? 'on flash' : ''}`}>SLOW</span>
        <span className="veo-algo">
          {d.algorithm}
          {d.cf ? ' CF' : ''}
        </span>
        <span className={`veo-cap ${d.decoCaption ? 'on' : ''}`}>DECO</span>
      </div>
      <div className="veo-body">
        <div className="veo-bar left" aria-label={`ascent rate ${d.ascSegments} of 5`}>
          {[5, 4, 3, 2, 1].map((n) => (
            <span key={n} className={`veo-seg ${d.ascSegments >= n ? 'on' : ''} ${d.ascFlash ? 'flash' : ''}`} />
          ))}
          <span className="veo-bar-label">ASC</span>
        </div>
        <div className="veo-centre">
          <div className="veo-top">
            <span className={`veo-top-digits ${d.topFlash ? 'flash' : ''}`}>{d.top || ' '}</span>
            <span className="veo-small">{d.topUnit}</span>
          </div>
          <div className="veo-mid">
            <div className="veo-stop">
              {d.stopLit && (
                <>
                  <span className="veo-stop-digits">{d.stopDepth}</span>
                  <span className="veo-small">{d.topUnit}</span>
                  <span className="veo-box on">STOP</span>
                </>
              )}
            </div>
            <div className="veo-arrows" aria-label={d.arrow ?? ''}>
              <span className={`veo-arrow ${d.arrow === 'up' || d.arrow === 'stop' ? 'on' : ''} ${d.arrow === 'up' && d.arrowFlash ? 'flash' : ''}`}>▲</span>
              <span className={`veo-arrow bar ${d.arrow === 'stop' ? 'on' : ''}`}>▬</span>
              <span className={`veo-arrow ${d.arrow === 'down' || d.arrow === 'stop' ? 'on' : ''} ${d.arrow === 'down' && d.arrowFlash ? 'flash' : ''}`}>▼</span>
            </div>
            <div className="veo-dtr">
              <span className={`veo-mid-digits ${d.centreFlash ? 'flash' : ''}`}>{d.centre || ' '}</span>
              <div className="veo-boxes">
                <span className={`veo-box ${d.noBox ? 'on' : ''}`}>NO</span>
                <span className={`veo-box ${d.decoBox ? 'on' : ''}`}>DECO</span>
                <span className={`veo-label ${d.centreLabel === 'SURF' ? 'on' : ''}`}>SURF</span>
                <span className={`veo-label ${d.centreLabel === 'O2 SAT' ? 'on' : ''}`}>O2 SAT</span>
              </div>
            </div>
          </div>
          <div className="veo-bottom">
            <div className="veo-field">
              <span className={`veo-bot-digits ${d.bottomLeftFlash ? 'flash' : ''}`}>{d.bottomLeft || ' '}</span>
              <span className="veo-small">{d.bottomLeftLabel}</span>
            </div>
            <div className="veo-field right">
              <span className="veo-bot-digits">{d.bottomRight || ' '}</span>
              <span className="veo-small">{d.bottomRightLabel}</span>
            </div>
          </div>
        </div>
        <div className="veo-bar right" aria-label={`nitrogen loading ${d.n2Segments} of 5`}>
          {[5, 4, 3, 2, 1].map((n) => (
            <span key={n} className={`veo-seg ${d.n2Segments >= n ? 'on' : ''} ${n >= 5 ? 'red' : n === 4 ? 'yellow' : ''} ${d.n2Flash ? 'flash' : ''}`} />
          ))}
          <span className="veo-bar-label">N2</span>
        </div>
      </div>
      <div className={`veo-led ${d.alarm ? 'on' : ''}`} aria-label="alarm LED" />
    </div>
  );
}
