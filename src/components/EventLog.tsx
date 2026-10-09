import { useSim } from '../sim/store';
import { fmtMinSec } from '../sim/format';

export function EventLog({ filterSource }: { filterSource?: string }) {
  const sim = useSim();
  const events = (filterSource ? sim.events.filter((e) => e.source === filterSource) : sim.events).slice(-80).reverse();
  return (
    <section className="panel log" aria-label="Event log">
      <div className="panel-head">
        <h3>What the computer did</h3>
        <span className="muted">{events.length} events</span>
      </div>
      <ol className="event-list">
        {events.length === 0 && <li className="muted">Start a dive to see events here.</li>}
        {events.map((e) => (
          <li key={e.id} className={`event ${e.severity}`}>
            <span className={`dot ${e.severity}`} aria-hidden="true" />
            <span className="event-time">{fmtMinSec(e.t)}</span>
            {!filterSource && <span className="event-source">{e.source}</span>}
            <span className="event-text">{e.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
