import type { ComputerDefinition } from '../types';
import { GenericDisplayView } from './Display';
import { GenericTrainer } from './firmware';

export const genericTrainer: ComputerDefinition = {
  id: 'generic',
  brand: 'Training',
  model: 'Generic trainer',
  tagline: 'The kind of generic computer used in agency eLearning',
  category: 'generic',
  algorithm: 'DSAT (PADI RDP compartments)',
  summary:
    'A plain computer with the fields every recreational model shows: depth, dive time, no-stop time, max depth, an ascent-rate bar and a 3-minute safety-stop countdown between 6 m and 3 m. Its no-stop limits follow the PADI Recreational Dive Planner (DSAT) and its ascent limit is the PADI maximum of 18 m/min.',
  buttons: [{ id: 'mode', label: 'MODE', short: 'Cycle surface → plan → log' }],
  conservatism: [{ value: 0, label: 'Standard', description: 'DSAT no-stop limits, no extra conservatism' }],
  o2Range: [21, 40],
  create: (settings) => new GenericTrainer(settings),
  Display: GenericDisplayView,
  reference: [
    {
      topic: 'Ascent rate',
      text: 'PADI teaches a maximum ascent rate of 18 m/60 ft per minute, or slower if the computer requires it.',
      source: { title: 'PADI Open Water Diver course', url: 'https://www.padi.com/courses/open-water-diver' },
    },
    {
      topic: 'Safety stop',
      text: 'A 3-minute safety stop at 5 m/15 ft is recommended on every dive and required after dives deeper than 30 m or close to a no-stop limit.',
      source: { title: 'PADI Recreational Dive Planner instructions', url: 'https://www.padi.com' },
    },
  ],
  width: 360,
};
