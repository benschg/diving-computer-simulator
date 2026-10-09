import type { ComputerDefinition } from '../types';
import { CressiDisplayView } from './Display';
import { CressiLeonardo } from './firmware';

const M = 'https://www.cressi.com/';

export const cressiLeonardo: ComputerDefinition = {
  id: 'cressi-leonardo',
  brand: 'Cressi',
  model: 'Leonardo',
  tagline: 'The other single-button rental favourite',
  category: 'entry',
  algorithm: 'Cressi RGBM (approximated)',
  summary:
    'One button, three rows. MAX and DIVE.T on top, the big depth in the middle with the ascent arrows beside it (1/2/3 arrows at 4/8/12 m/min; SLOW and beeps at 12 m/min), NO DECO on the right. A beep warns you at 3 minutes of no-deco time. In deco it shows the first stop and TOTAL ascent time; miss a stop for 2 minutes and the ERROR PROGRAM locks it for 48 hours. The surface screen shows SURF.T, DESAT and NO FLY.',
  buttons: [{ id: 'button', label: '●', short: 'Press: next menu screen / alternate dive page', long: 'Hold: enter (PLAN) / backlight' }],
  conservatism: [
    { value: 0, label: 'SF0 (off)', description: 'Factory setting. Limits calibrated to readings from a Leonardo (18 m: 49 min, 30 m: 17 min).' },
    { value: 1, label: 'SF1', description: '18 m: 44 min, 30 m: 15 min.' },
    { value: 2, label: 'SF2', description: '18 m: 40 min, 30 m: 13 min.' },
  ],
  o2Range: [21, 50],
  create: (settings) => new CressiLeonardo(settings),
  Display: CressiDisplayView,
  reference: [
    { topic: 'Ascent rate', text: 'Arrow table: no signal 0–3.9 m/min, one arrow 4–7.9, two arrows 8–11.9, three arrows + BEEP-BEEP + SLOW at 12 m/min. "surfacing must be stopped until the SLOW icon disappears".', source: { title: 'Leonardo – Direction for use', url: M, page: 'p.45, p.48' } },
    { topic: 'Safety stop', text: '"Leonardo is programmed to automatically signal a safety stop after each dive at a depth greater than 10 m … A 3 minute stop should be carried out at a depth between 6 m and 3 m … The safety stop is not mandatory, yet it is strongly recommended".', source: { title: 'Leonardo – Direction for use', url: M, page: 'p.45' } },
    { topic: 'Forewarning', text: '"Every time the time available within decompression, shown on the display by the NO DECO icon, decreases to 3 minutes, [the computer] warns the diver by emitting a sound alarm."', source: { title: 'Leonardo – Direction for use', url: M, page: 'p.46' } },
    { topic: 'Omitted stop', text: '"The computer allows a maximum time of 2 minutes to correct this dangerous situation … In the event that the diver does not descend to the proper depth (after 2 minutes) Leonardo enters the ERROR PROGRAM. The STOP icon flashes and the instrument won’t be usable for the next 48 hours."', source: { title: 'Leonardo – Direction for use', url: M, page: 'p.51–52' } },
    { topic: 'No-fly', text: '"12 hours after a single dive without decompression. 24 hours after a dive with decompression or after repetitive or multiday … 48 hours after the use of the gage function or if severe mistakes in dive management occurred."', source: { title: 'Leonardo – Direction for use', url: M, page: 'p.59–60' } },
    { topic: 'NDL data', text: 'Cressi prints no no-stop table; the limits used here come from a Leonardo owner’s display readings (ScubaBoard, 2019) and are marked as unverified.', source: { title: 'ScubaBoard: Cressi Leonardo NDL table', url: 'https://scubaboard.com/' } },
  ],
  width: 330,
};
