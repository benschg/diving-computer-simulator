import type { ComputerDefinition } from '../computers/types';
import type { ComputerCore } from '../sim/core';
import { useSim } from '../sim/store';
import { nitrox } from '../engine';

export function SettingsPanel({ def, fw }: { def: ComputerDefinition; fw: ComputerCore }) {
  const sim = useSim();
  const s = fw.settings;
  const diving = fw.currentPhase !== 'surface';
  const apply = (patch: Parameters<ComputerCore['updateSettings']>[0]) => {
    fw.updateSettings(patch);
    sim.stepSeconds(0);
  };
  return (
    <section className="panel settings" aria-label="Computer settings">
      <div className="panel-head">
        <h3>Settings</h3>
        {diving && <span className="muted">locked during dive</span>}
      </div>
      <div className="settings-grid">
        <label>
          <span>Units</span>
          <select value={s.units} onChange={(e) => apply({ units: e.target.value as 'metric' | 'imperial' })}>
            <option value="metric">metric (m, °C)</option>
            <option value="imperial">imperial (ft, °F)</option>
          </select>
        </label>
        <label>
          <span>Gas (O₂ %)</span>
          <select value={Math.round(s.gas.fO2 * 100)} disabled={diving} onChange={(e) => apply({ gas: nitrox(Number(e.target.value)) })}>
            {Array.from({ length: def.o2Range[1] - def.o2Range[0] + 1 }, (_, i) => def.o2Range[0] + i)
              .filter((o) => o === 21 || o % 2 === 0 || o === 32 || o === 36)
              .map((o) => (
                <option key={o} value={o}>
                  {o === 21 ? 'Air (21 %)' : `EAN${o}`}
                </option>
              ))}
          </select>
        </label>
        <label>
          <span>PO₂ limit</span>
          <select value={s.pO2Max} disabled={diving} onChange={(e) => apply({ pO2Max: Number(e.target.value) })}>
            {[1.2, 1.3, 1.4, 1.5, 1.6].map((p) => (
              <option key={p} value={p}>
                {p.toFixed(1)} bar
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Conservatism</span>
          <select value={s.conservatism} disabled={diving} onChange={(e) => apply({ conservatism: Number(e.target.value) })}>
            {def.conservatism.map((c) => (
              <option key={c.value} value={c.value} title={c.description}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Safety stop</span>
          <select value={s.safetyStopMinutes} disabled={diving} onChange={(e) => apply({ safetyStopMinutes: Number(e.target.value) })}>
            <option value={0}>off</option>
            <option value={3}>3 min</option>
            <option value={4}>4 min</option>
            <option value={5}>5 min</option>
          </select>
        </label>
        <label>
          <span>Altitude</span>
          <select value={s.altitudeM} disabled={diving} onChange={(e) => apply({ altitudeM: Number(e.target.value) })}>
            <option value={0}>sea level</option>
            <option value={700}>700 m</option>
            <option value={1500}>1500 m</option>
            <option value={2400}>2400 m</option>
          </select>
        </label>
      </div>
      <p className="muted small">{def.conservatism.find((c) => c.value === s.conservatism)?.description}</p>
    </section>
  );
}
