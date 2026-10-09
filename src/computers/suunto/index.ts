import type { ComputerDefinition } from '../types';
import { SuuntoDisplayView } from './Display';
import { SuuntoZoopNovo } from './firmware';

const M = 'https://ns.suunto.com/Manuals/Zoop_Novo/Userguides/Suunto_ZoopNovo_UserGuide_EN.pdf';

export const suuntoZoopNovo: ComputerDefinition = {
  id: 'suunto-zoop-novo',
  brand: 'Suunto',
  model: 'Zoop Novo',
  tagline: 'The classic rental computer: four buttons, segment LCD, Suunto RGBM',
  category: 'entry',
  algorithm: 'Suunto RGBM (approximated)',
  summary:
    'Suunto’s entry-level computer. Conservative RGBM limits (P0/P1/P2 personal settings), a 10 m/min ascent limit that adds a mandatory safety stop when exceeded, recommended 3-minute stops between 3 and 6 m, deepstops on dives past 20 m, a continuous ceiling with ASC TIME in deco, and the infamous "Er" 48-hour algorithm lock if you stay above the ceiling for 3 minutes.',
  buttons: [
    { id: 'select', label: 'SELECT', short: 'Bookmark (dive) / enter', long: 'Settings' },
    { id: 'mode', label: 'MODE', short: 'Next mode: TIME → DIVE → PLAN → MEM (backlight during the dive)', long: 'Backlight / timer' },
    { id: 'down', label: 'DOWN', short: 'Previous bottom-row view / shallower plan depth' },
    { id: 'up', label: 'UP', short: 'Next bottom-row view / deeper plan depth' },
  ],
  conservatism: [
    { value: 0, label: 'P0 – ideal conditions', description: 'Default. Calibrated to the published Suunto RGBM first-dive table (e.g. 18 m: 52 min, 30 m: 18 min).' },
    { value: 1, label: 'P1 – conservative', description: 'Some risk factors (cold, fatigue, dehydration). 18 m: 39 min, 30 m: 14 min.' },
    { value: 2, label: 'P2 – more conservative', description: 'Several risk factors. 18 m: 30 min, 30 m: 12 min.' },
  ],
  o2Range: [21, 50],
  create: (settings) => new SuuntoZoopNovo(settings),
  Display: SuuntoDisplayView,
  reference: [
    { topic: 'Ascent rate', text: '"Maximum ascent rate of 10 m/min (33 ft/min) exceeded. Slow down your ascent rate." When exceeded for more than five consecutive seconds the computer adds a mandatory safety stop.', source: { title: 'Zoop Novo User Guide', url: M, page: 'p.11, p.26' } },
    { topic: 'Recommended safety stop', text: '"With every dive over 10 meters, there is a three-minute countdown for the recommended safety stop. This stop is taken in the 3-6 m range."', source: { title: 'Zoop Novo User Guide', url: M, page: 'p.26' } },
    { topic: 'Deepstops', text: '"Deepstops activate when you dive deeper than 20 m." Shown as CEILING + DEEPSTOP with a countdown; on by default.', source: { title: 'Zoop Novo User Guide', url: M, page: 'p.27' } },
    { topic: 'Decompression', text: 'NO DEC TIME is replaced by ASC TIME and a CEILING appears. Two arrows pointing at each other mean you are at the ceiling; an arrow down and "Er" mean you are above it.', source: { title: 'Zoop Novo User Guide', url: M, page: 'p.15–18' } },
    { topic: 'Error state', text: '"If you omit decompression stops for longer than three (3) minutes, the RGBM algorithm is locked for 48 hours." Depth and time keep working; Er replaces the deco data.', source: { title: 'Zoop Novo User Guide', url: M, page: 'p.24–25' } },
    { topic: 'No-fly time', text: '"No-fly time is always at least 12 hours and equals desaturation time when it is more than 12 hours. For desaturation times shorter than 70 minutes, the no-fly time is not displayed." After an error state: 48 hours.', source: { title: 'Zoop Novo User Guide', url: M, page: 'p.28–29' } },
    { topic: 'NDL table', text: 'The Zoop Novo manual prints no table; the limits here are calibrated to the Suunto Zoop (2011) table 6.1 (same algorithm family).', source: { title: 'Suunto Zoop User Guide (2011)', url: 'https://ns.suunto.com/Manuals/Zoop/Userguides/Suunto_Zoop_UserGuide_EN.pdf', page: 'p.85' } },
  ],
  width: 340,
};
