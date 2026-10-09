import { genericTrainer } from './generic';
import type { ComputerDefinition } from './types';

export const COMPUTERS: ComputerDefinition[] = [genericTrainer];

export function computerById(id: string): ComputerDefinition {
  const def = COMPUTERS.find((c) => c.id === id);
  if (!def) throw new Error(`Unknown computer ${id}`);
  return def;
}
