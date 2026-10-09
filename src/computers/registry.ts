import { cressiLeonardo } from './cressi';
import { garminDescentG1 } from './garmin';
import { genericTrainer } from './generic';
import { maresPuckPro } from './mares';
import { oceanicVeo4 } from './oceanic';
import { shearwaterPeregrine } from './shearwater';
import { suuntoZoopNovo } from './suunto';
import type { ComputerDefinition } from './types';

export const COMPUTERS: ComputerDefinition[] = [suuntoZoopNovo, shearwaterPeregrine, oceanicVeo4, maresPuckPro, cressiLeonardo, garminDescentG1, genericTrainer];

export function computerById(id: string): ComputerDefinition {
  const def = COMPUTERS.find((c) => c.id === id);
  if (!def) throw new Error(`Unknown computer ${id}`);
  return def;
}
