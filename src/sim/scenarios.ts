import type { Waypoint } from './simulation';

export interface Scenario {
  id: string;
  title: string;
  description: string;
  waypoints: Waypoint[];
}

const wp = (depthM: number, rateMPerMin: number, holdS: number, label?: string): Waypoint => ({ depthM, rateMPerMin, holdS, label });

/** One-click dive profiles for demonstrations (the diver follows them automatically). */
export const SCENARIOS: Scenario[] = [
  {
    id: 'square-18',
    title: 'Square dive 18 m / 40 min',
    description: 'A textbook no-stop dive with a slow ascent and a 3-minute safety stop.',
    waypoints: [wp(18, 18, 40 * 60), wp(5, 9, 3 * 60 + 20), wp(0, 6, 0)],
  },
  {
    id: 'multilevel',
    title: 'Multilevel 30 → 18 → 12 m',
    description: 'Deep first, then shallower: watch the no-stop time recover as you go up.',
    waypoints: [wp(30, 18, 12 * 60), wp(18, 9, 15 * 60), wp(12, 9, 15 * 60), wp(5, 9, 3 * 60 + 20), wp(0, 6, 0)],
  },
  {
    id: 'deco',
    title: 'Overstay at 30 m into deco',
    description: 'Stay 28 minutes at 30 m, then follow a 3 m stop until it clears.',
    waypoints: [wp(30, 18, 28 * 60), wp(4, 9, 14 * 60), wp(0, 6, 0)],
  },
  {
    id: 'fast-ascent',
    title: 'Fast ascent from 20 m',
    description: 'Ascend at 20 m/min – every computer complains differently.',
    waypoints: [wp(20, 18, 8 * 60), wp(5, 20, 3 * 60 + 20), wp(0, 6, 0)],
  },
  {
    id: 'missed-stop',
    title: 'Missed deco stop',
    description: 'Deco dive, then straight to the surface: lockouts and no-fly consequences.',
    waypoints: [wp(30, 18, 30 * 60), wp(0, 9, 0)],
  },
  {
    id: 'repetitive',
    title: 'Two dives, 1 h apart',
    description: '18 m for 35 min, one hour at the surface, then 18 m again.',
    waypoints: [wp(18, 18, 35 * 60), wp(5, 9, 3 * 60 + 20), wp(0, 6, 60 * 60), wp(18, 18, 20 * 60), wp(5, 9, 3 * 60 + 20), wp(0, 6, 0)],
  },
];
