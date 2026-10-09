import { useRef } from 'react';
import type { ComputerDefinition } from '../computers/types';
import type { ComputerCore } from '../sim/core';
import { useSim } from '../sim/store';

const LONG_PRESS_MS = 700;

/** Renders a computer skin with its physical buttons; click = short press, hold = long press. */
export function ComputerShell({ def, fw, compact = false }: { def: ComputerDefinition; fw: ComputerCore; compact?: boolean }) {
  const sim = useSim();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fired = useRef(false);

  const down = (id: string) => {
    fired.current = false;
    timer.current = setTimeout(() => {
      fired.current = true;
      fw.press(id, 'long');
      sim.stepSeconds(0);
    }, LONG_PRESS_MS);
  };
  const up = (id: string) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (!fired.current) {
      fw.press(id, 'short');
      sim.stepSeconds(0);
    }
  };
  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  return (
    <div className={`computer-shell ${compact ? 'compact' : ''}`} style={{ maxWidth: compact ? 300 : def.width }}>
      <div className="computer-name">
        <b>{def.brand}</b> {def.model}
        <span className="muted"> · {def.algorithm}</span>
      </div>
      <div className="computer-body">
        <def.Display fw={fw} />
      </div>
      <div className="computer-buttons">
        {def.buttons.map((b) => (
          <button
            key={b.id}
            className="hw-btn"
            title={`${b.short}${b.long ? ` · hold: ${b.long}` : ''}`}
            onPointerDown={() => down(b.id)}
            onPointerUp={() => up(b.id)}
            onPointerLeave={cancel}
            onPointerCancel={cancel}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
