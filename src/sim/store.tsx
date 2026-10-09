import { createContext, useContext, useSyncExternalStore, type ReactNode } from 'react';
import { Simulation } from './simulation';

const SimContext = createContext<Simulation | null>(null);

export function SimProvider({ sim, children }: { sim: Simulation; children: ReactNode }) {
  return <SimContext.Provider value={sim}>{children}</SimContext.Provider>;
}

/** Subscribe to the simulation; re-renders on every simulation tick. */
export function useSim(): Simulation {
  const sim = useContext(SimContext);
  if (!sim) throw new Error('SimProvider missing');
  useSyncExternalStore(sim.subscribe, sim.getVersion, sim.getVersion);
  return sim;
}
