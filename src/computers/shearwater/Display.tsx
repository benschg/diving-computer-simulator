import type { DisplayProps } from '../types';
import type { PeregrineDisplay, ShearwaterPeregrine } from './firmware';
import './shearwater.css';

export function ShearwaterDisplayView({ fw }: DisplayProps) {
  const d: PeregrineDisplay = (fw as ShearwaterPeregrine).display();
  return (
    <div className="pere-screen" role="img" aria-label="Shearwater Peregrine display">
      <div className="pere-main">
        <div className="pere-left">
          <div className="pere-depth-row">
            <span className="pere-depth">{d.depth}</span>
            <span className="pere-unit">{d.depthUnit}</span>
            <span className={`pere-chevrons tone-${d.chevronTone} ${d.chevronTone === 'critical' ? 'flash' : ''}`} aria-label={`ascent rate ${d.chevrons} chevrons`}>
              {Array.from({ length: 6 }, (_, i) => (
                <span key={i} className={`chev ${i < d.chevrons ? 'on' : ''}`}>
                  ^
                </span>
              ))}
            </span>
          </div>
          <div className="pere-title">{d.timeTitle}</div>
          <div className="pere-time">
            {d.timeValue}
            <span className="pere-seconds">{d.timeSeconds}</span>
            {d.surface && <span className="pere-batt" aria-label="battery ok" />}
          </div>
        </div>
        <div className="pere-right">
          <div className={`pere-title tone-${d.slot.titleTone}`}>{d.slot.title}</div>
          <div className={`pere-slot-value tone-${d.slot.valueTone} ${d.slot.flash ? 'flash' : ''}`}>
            {d.slot.check && <span className="pere-check">✓</span>}
            {d.slot.arrow === 'up' && <span className="pere-arrow flash">▲</span>}
            {d.slot.arrow === 'down' && <span className="pere-arrow">▼</span>}
            {d.slot.value}
          </div>
          <div className="pere-ndl-row">
            {d.persistent && <span className={`pere-persistent tone-${d.persistent.tone}`}>{d.persistent.text}</span>}
            <div className="pere-ndl">
              <span className="pere-title">NDL</span>
              <span className={`pere-ndl-value tone-${d.ndl.tone}`}>{d.ndl.value}</span>
            </div>
            <div className="pere-n2" aria-label={`nitrogen loading ${Math.round(d.n2Fraction * 100)} percent`}>
              <div className="pere-n2-fill" style={{ ["--h" as string]: `${Math.round(d.n2Fraction * 100)}%` } as React.CSSProperties} />
              <span className="pere-n2-label">N2</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pere-bottom">
        {d.banner ? (
          <div className="pere-banner">
            <span className="pere-banner-head">{d.banner.header}</span>
            <span className="pere-banner-text">{d.banner.text}</span>
            <span className="pere-banner-head right">Confirm</span>
          </div>
        ) : d.menu ? (
          <div className="pere-menu">
            {d.menu.items.map((item, i) => (
              <span key={item} className={`pere-menu-item ${i === d.menu!.index ? 'is-on' : ''}`}>
                {item}
              </span>
            ))}
          </div>
        ) : d.tissues ? (
          <div className="pere-tissues" aria-label="tissue loading per compartment">
            {d.tissues.map((f, i) => (
              <div key={i} className="pere-tissue-row">
                <div className={`pere-tissue-bar ${f >= 1 ? 'over' : f >= 0.7 ? 'warm' : ''}`} style={{ width: `${Math.min(100, f * 100)}%` }} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <span className={`pere-gas tone-${d.gas.tone}`}>{d.gas.text}</span>
            <div className="pere-cell">
              <span className="pere-title">{d.rowCentre.title}</span>
              <span className={`pere-cell-value tone-${d.rowCentre.tone ?? 'normal'}`}>{d.rowCentre.value}</span>
            </div>
            <div className="pere-cell right">
              {d.rowRight.title && <span className="pere-title">{d.rowRight.title}</span>}
              <span className={`pere-cell-value tone-${d.rowRight.tone ?? 'normal'}`}>{d.rowRight.value}</span>
              {d.rowRight.second && <span className="pere-cell-value small">{d.rowRight.second}</span>}
            </div>
          </>
        )}
      </div>
      <div className="pere-hints">
        <span>MENU</span>
        <span>{d.infoScreen ? `info: ${d.infoScreen}` : ''}</span>
        <span>FUNC</span>
      </div>
    </div>
  );
}
