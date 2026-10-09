import { useEffect, useState } from 'react';
import { COMPUTERS, computerById } from './computers/registry';
import { ComputerShell } from './components/ComputerShell';
import { DiveControls } from './components/DiveControls';
import { EventLog } from './components/EventLog';
import { ProfileChart } from './components/ProfileChart';
import { SettingsPanel } from './components/SettingsPanel';
import { Telemetry } from './components/Telemetry';
import { useSim } from './sim/store';
import { DEFAULT_SETTINGS } from './sim/types';

type Tab = 'simulate' | 'compare' | 'lessons' | 'reference' | 'about';

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'simulate', label: 'Simulate' },
  { id: 'compare', label: 'Compare' },
  { id: 'lessons', label: 'Lessons' },
  { id: 'reference', label: 'Reference' },
  { id: 'about', label: 'About' },
];

export function App() {
  const [tab, setTab] = useState<Tab>('simulate');
  const [computerId, setComputerId] = useState(COMPUTERS[0].id);
  const sim = useSim();

  useEffect(() => {
    const ids = tab === 'compare' ? COMPUTERS.map((c) => c.id) : [computerId];
    sim.setComputers(ids.map((id) => ({ id, create: () => computerById(id).create({ ...DEFAULT_SETTINGS }) })));
  }, [sim, tab, computerId]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>Dive Computer Simulator</span>
        </div>
        <nav className="tabs" aria-label="Sections">
          {TABS.map((t) => (
            <button key={t.id} className={`tab ${tab === t.id ? 'is-on' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
      </header>
      {tab === 'simulate' && <SimulatePage computerId={computerId} onSelect={setComputerId} />}
      {tab === 'compare' && <ComparePage />}
      {tab === 'lessons' && <Placeholder title="Lessons" />}
      {tab === 'reference' && <Placeholder title="Reference" />}
      {tab === 'about' && <AboutPage />}
    </div>
  );
}

function SimulatePage({ computerId, onSelect }: { computerId: string; onSelect: (id: string) => void }) {
  const sim = useSim();
  const def = computerById(computerId);
  const fw = sim.computer(computerId);
  return (
    <div className="layout">
      <aside className="col col-left">
        <section className="panel picker" aria-label="Choose a computer">
          <label className="field">
            <span className="field-label">Computer</span>
            <select value={computerId} onChange={(e) => onSelect(e.target.value)}>
              {COMPUTERS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.brand} {c.model}
                </option>
              ))}
            </select>
          </label>
          <p className="muted small">{def.summary}</p>
        </section>
        {fw && <ComputerShell def={def} fw={fw} />}
        {fw && <SettingsPanel def={def} fw={fw} />}
      </aside>
      <main className="col col-main">
        <DiveControls />
        <ProfileChart computerId={computerId} />
      </main>
      <aside className="col col-right">
        {fw && <Telemetry fw={fw} />}
        <EventLog filterSource={computerId} />
      </aside>
    </div>
  );
}

function ComparePage() {
  const sim = useSim();
  return (
    <div className="layout compare">
      <main className="col col-main">
        <DiveControls />
        <div className="compare-grid">
          {sim.computers.map((c) => (
            <ComputerShell key={c.id} def={computerById(c.id)} fw={c.fw} compact />
          ))}
        </div>
        <ProfileChart computerId={sim.computers[0]?.id ?? ''} />
      </main>
      <aside className="col col-right">
        <EventLog />
      </aside>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="page">
      <h2>{title}</h2>
      <p className="muted">Coming soon.</p>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page prose">
      <h2>About this simulator</h2>
      <p>
        An interactive trainer that shows how real dive computers behave: what they display at the surface and under water, how their
        no-stop time counts down, what happens when you ascend too fast, skip a safety stop, or run into decompression.
      </p>
      <p>
        <b>Not for planning real dives.</b> The decompression models here (Bühlmann ZH-L16C with gradient factors, DSAT, and
        approximations of proprietary RGBM variants) are educational reconstructions calibrated against published manuals and tables.
        They are not the manufacturers' firmware.
      </p>
    </div>
  );
}
