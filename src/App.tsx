import { useEffect, useState } from 'react';
import { COMPUTERS, computerById } from './computers/registry';
import { AboutPage } from './components/AboutPage';
import { ComparePage } from './components/ComparePage';
import { ComputerShell } from './components/ComputerShell';
import { DiveControls } from './components/DiveControls';
import { DiveLogPanel } from './components/DiveLogPanel';
import { EventLog } from './components/EventLog';
import { LessonsPage } from './components/LessonsPage';
import { ProfileChart } from './components/ProfileChart';
import { ReferencePage } from './components/ReferencePage';
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
    if (tab === 'lessons') return; // the lesson runner owns the computer set
    const ids = tab === 'compare' ? COMPUTERS.map((c) => c.id) : [computerId];
    sim.setComputers(ids.map((id) => ({ id, create: () => computerById(id).create({ ...DEFAULT_SETTINGS }) })));
  }, [sim, tab, computerId]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>Dive Computer Simulator</span>
          <span className="brand-note">training only · not for planning real dives</span>
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
      {tab === 'lessons' && <LessonsPage />}
      {tab === 'reference' && <ReferencePage />}
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
        <DiveLogPanel computerId={computerId} />
      </aside>
    </div>
  );
}
