import { useEffect, useState } from 'react';
import { computerById } from '../computers/registry';
import { useSim } from '../sim/store';
import { fmtMinSec } from '../sim/format';

interface StoredDive {
  id: string;
  createdAt: string;
  title: string;
  computerId: string;
  maxDepthM: number;
  durationS: number;
}

/** Saves the current simulated dive through the Node API and lists saved dives. */
export function DiveLogPanel({ computerId }: { computerId: string }) {
  const sim = useSim();
  const [dives, setDives] = useState<StoredDive[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const load = () =>
    fetch('/api/dives')
      .then((r) => (r.ok ? r.json() : []))
      .then(setDives)
      .catch(() => setDives([]));
  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    const fw = sim.computer(computerId);
    if (!fw) return;
    const snap = fw.snapshot();
    const def = computerById(computerId);
    const body = {
      title: `${def.brand} ${def.model} – ${snap.maxDepthM.toFixed(1)} m / ${Math.round(sim.t / 60)} min`,
      computerId,
      maxDepthM: Math.max(snap.maxDepthM, ...sim.samples.map((s) => s.depthM)),
      durationS: sim.t,
      samples: sim.samples.filter((_, i) => i % 5 === 0).map((s) => ({ t: s.t, d: Number(s.depthM.toFixed(2)) })),
      events: sim.events.filter((e) => e.source === computerId).map((e) => ({ t: e.t, text: e.text })),
    };
    try {
      const r = await fetch('/api/dives', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      setStatus(r.ok ? 'Saved.' : `Save failed (${r.status}).`);
      await load();
    } catch {
      setStatus('API not reachable – is `npm run dev` running?');
    }
  };

  const remove = async (id: string) => {
    await fetch(`/api/dives/${id}`, { method: 'DELETE' }).catch(() => undefined);
    await load();
  };

  return (
    <section className="panel" aria-label="Saved dives">
      <div className="panel-head">
        <h3>Dive log (server)</h3>
        <button className="chip" onClick={save} disabled={sim.t < 30}>
          Save this dive
        </button>
      </div>
      {status && <p className="muted small">{status}</p>}
      <ul className="dive-list">
        {dives.length === 0 && <li className="muted small">No saved dives yet.</li>}
        {dives.slice(0, 8).map((d) => (
          <li key={d.id}>
            <span>{d.title}</span>
            <span className="muted">{fmtMinSec(d.durationS)}</span>
            <button className="chip" onClick={() => remove(d.id)} aria-label="delete">
              ×
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
