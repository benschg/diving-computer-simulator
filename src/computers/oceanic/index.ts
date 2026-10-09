import type { ComputerDefinition } from '../types';
import { OceanicDisplayView } from './Display';
import { OceanicVeo4 } from './firmware';

const M = 'https://www.oceanicworldwide.com/';
const I = 'https://www.aqualung.com/';

export const oceanicVeo4: ComputerDefinition = {
  id: 'oceanic-veo-4',
  brand: 'Oceanic',
  model: 'Veo 4.0 (Aqua Lung i300C family)',
  tagline: 'Two buttons, bar graphs, and a choice of DSAT or Z+ algorithm',
  category: 'entry',
  algorithm: 'DSAT or Z+ (Pelagic)',
  summary:
    'A Pelagic-family computer like the Aqua Lung i300C, with the Oceanic "Dual Algorithm" switch: DSAT (the PADI RDP limits, liberal) or Z+ (Bühlmann ZHL-16C based, "considerably more conservative especially at shallower depths"). A 9 m/min ascent limit on a 5-segment ASC bar, a 5-segment N2 bar, a 3-minute safety stop at 5 m, and the escalating violation ladder: Conditional Violation → Delayed Violation → Violation Gauge Mode for 24 hours.',
  buttons: [
    { id: 'adv', label: 'ADV', short: 'Advance: next screen / next plan depth', long: 'Scroll quickly' },
    { id: 'sel', label: 'SEL', short: 'Select / acknowledge the audible alarm / exit to main', long: 'Step backwards' },
  ],
  conservatism: [
    { value: 0, label: 'DSAT', description: 'PADI RDP based limits (18 m: 59 min, 30 m: 20 min). Default on Oceanic units.' },
    { value: 1, label: 'Z+ (Bühlmann based)', description: 'Pelagic Z+ – the only algorithm on the Aqua Lung i300C (18 m: 50 min, 30 m: 16 min).' },
    { value: 2, label: 'DSAT + Conservative Factor', description: 'CF ON: limits of the altitude 915 m higher (18 m: 40 min).' },
    { value: 3, label: 'Z+ + Conservative Factor', description: 'CF ON with Z+ (18 m: 35 min).' },
  ],
  o2Range: [21, 100],
  create: (settings) => new OceanicVeo4(settings),
  Display: OceanicDisplayView,
  reference: [
    { topic: 'Dual algorithm', text: '"DSAT was the original standard used by Oceanic … NDLs that are based on exposures and test data which also formed validation for the PADI RDP … Z+ performance is based on Buhlmann ZHL-16c. It features NDLs that are considerably more conservative than the DSAT version especially at shallower depths."', source: { title: 'Oceanic Geo 4.0 / Veo 4.0 Operating Manual', url: M, page: 'p.21 / p.13' } },
    { topic: 'i300C', text: '"The i300C utilizes the Z+ algorithm to calculate nitrogen tissue loading." The i300C has no DSAT option; its display and button logic are the same as the Veo 4.0.', source: { title: 'Aqua Lung i300C Owner’s Manual (Doc. 12-7874)', url: I, page: 'p.13' } },
    { topic: 'Ascent rate', text: '"When the ascent is faster than the recommended 9 mpm (30 fpm), all segments and the message SLO (slow) flash until the ascent is slowed." Audible alarm after 8 seconds over the limit.', source: { title: 'i300C Owner’s Manual', url: I, page: 'p.13, p.15' } },
    { topic: 'Safety stop', text: '"Upon ascent to within 1.5 m deeper than the Safety Stop depth set … on a No Decompression dive in which Depth exceeded 9 m … a Safety Stop at the depth set will appear with a countdown." Descending 3 m deeper for 10 s hides it; "There is no penalty if you surface prior to completing the Safety Stop".', source: { title: 'i300C Owner’s Manual', url: I, page: 'p.14, p.26' } },
    { topic: 'Violations', text: 'CV: "Upon ascent above the required Deco Stop depth … no off gassing credit … for each minute above the Stop 1-1/2 minutes of penalty time". DV1 after 5 minutes above the stop → Violation Gauge Mode 5 minutes after surfacing. VGM also when a stop deeper than 21 m is required: "a digital instrument without any decompression or oxygen related calculations" for 24 hours.', source: { title: 'i300C Owner’s Manual', url: I, page: 'p.38–40' } },
    { topic: 'Fly / desaturation', text: 'FLY counts down from 23:50 (24 hours) starting 10 minutes after surfacing; SAT shows the desaturation time.', source: { title: 'i300C Owner’s Manual', url: I, page: 'p.18' } },
  ],
  width: 330,
};
