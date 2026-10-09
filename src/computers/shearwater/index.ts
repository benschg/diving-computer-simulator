import type { ComputerDefinition } from '../types';
import { ShearwaterDisplayView } from './Display';
import { ShearwaterPeregrine } from './firmware';

const M = 'https://www.shearwater.com/products/peregrine/';

export const shearwaterPeregrine: ComputerDefinition = {
  id: 'shearwater-peregrine',
  brand: 'Shearwater',
  model: 'Peregrine',
  tagline: 'Modern colour display, two buttons, Bühlmann with gradient factors',
  category: 'mid',
  algorithm: 'Bühlmann ZHL-16C + GF',
  summary:
    'A recreational colour computer that shows exactly what the model is doing: NDL turns yellow at 5 min, deco stops are coloured by how close you are to them (red → yellow with an up-arrow → green with a check), the ascent chevrons go white/yellow/red at 9 and 18 m/min, warnings are yellow banners you dismiss with either button. No lockouts and, deliberately, no "time to fly".',
  buttons: [
    { id: 'menu', label: 'MENU', short: 'Open / step through the menu (dismisses a banner)' },
    { id: 'func', label: 'FUNC', short: 'Cycle the info screens (dismisses a banner)' },
  ],
  conservatism: [
    { value: 0, label: 'Med (GF 40/85)', description: 'Factory default gradient factors.' },
    { value: 1, label: 'Low (GF 45/95)', description: 'Least conservative preset – longer no-stop times.' },
    { value: 2, label: 'High (GF 35/75)', description: 'Most conservative preset.' },
  ],
  o2Range: [21, 40],
  create: (settings) => new ShearwaterPeregrine(settings),
  Display: ShearwaterDisplayView,
  reference: [
    { topic: 'Colours', text: '"WHITE text indicates normal conditions … YELLOW is used for warnings that are not immediately dangerous … FLASHING RED is used for critical warnings that could be life threatening."', source: { title: 'Peregrine Operations Manual', url: M, page: 'p.18' } },
    { topic: 'Ascent rate', text: 'One chevron per 3 m/min; white below 9 m/min, yellow 9–18 m/min, flashing red above 18 m/min. The FAST ASCENT warning fires when "the ascent was sustained as faster than 10 m/min".', source: { title: 'Peregrine Operations Manual', url: M, page: 'p.11, p.22' } },
    { topic: 'Safety stop', text: '"Once the depth exceeds 11 m, a safety stop counter will appear … Countdown begins once the depth becomes shallower than 6 m. Countdown will continue while the depth remains in the range of 2.4 m to 8.3 m" – outside that range it pauses in yellow; deeper than 11 m resets it. "There is no lock-out or other penalty for omitting a safety stop."', source: { title: 'Peregrine Operations Manual', url: M, page: 'p.23' } },
    { topic: 'Deco stops', text: '"As you approach within 5.1 m of the first decompression stop, the title will change from red to yellow and a flashing up-arrow will indicate to ascend to the stop. While at the stop depth or up to 1.5 m deeper, the title will turn green and a check mark will be shown." Ascending shallower than the stop flashes red; "There is no lock-out or other penalty for violating decompression stops."', source: { title: 'Peregrine Operations Manual', url: M, page: 'p.24' } },
    { topic: 'Conservatism', text: 'Bühlmann ZHL-16C with gradient factors; presets Low 45/95, Med 40/85 (default), High 35/75, or custom.', source: { title: 'Peregrine Operations Manual', url: M, page: 'p.25, p.39' } },
    { topic: 'No-fly', text: 'Shearwater computers show no "time to fly": "We have chosen not to reduce these recommendations to a calculation and we ask our customers to evaluate their situation" – they point to DAN (12 h after a single no-stop dive, 18 h after repetitive dives, longer after deco).', source: { title: 'Shearwater blog: Flying after diving', url: 'https://www.shearwater.com/' } },
  ],
  width: 360,
};
