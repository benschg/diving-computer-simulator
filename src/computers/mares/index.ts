import type { ComputerDefinition } from '../types';
import { MaresDisplayView } from './Display';
import { MaresPuckPro } from './firmware';

const M = 'https://www.mares.com/';

export const maresPuckPro: ComputerDefinition = {
  id: 'mares-puck-pro',
  brand: 'Mares',
  model: 'Puck Pro+',
  tagline: 'One button, round LCD, RGBM Mares-Wienke',
  category: 'entry',
  algorithm: 'RGBM Mares-Wienke (approximated)',
  summary:
    'The single-button school computer. Press = next item / alternate info, press-and-hold = enter / backlight. Shows the ascent speed as a number (alarm at 10 m/min), a 10-segment nitrogen bar, SAFE 3-minute stops between 6 and 3 m, deep stops, and in deco the deepest stop with its time and the total ascent time (asc). Missing a stop by more than 1 m for 3 minutes, or an uncontrolled ascent, locks it into bottom-timer mode for 24 hours.',
  buttons: [{ id: 'button', label: '●', short: 'Press: next menu item / alternate dive info', long: 'Hold: enter menu (PLAN) / backlight' }],
  conservatism: [
    { value: 0, label: 'P0 – standard', description: 'Standard algorithm. Mares publishes no table; limits approximated with the Cressi RGBM calibration (18 m ≈ 49 min, 30 m ≈ 17 min).' },
    { value: 1, label: 'P1 (p+)', description: 'Intermediate conservatism.' },
    { value: 2, label: 'P2 (p++)', description: 'Most conservative.' },
  ],
  o2Range: [21, 99],
  create: (settings) => new MaresPuckPro(settings),
  Display: MaresDisplayView,
  reference: [
    { topic: 'Ascent rate', text: '"If Puck Pro determines an ascent rate of 10 m/min or higher, the fast ascent alarm is triggered: an audible alarm goes off, the icon appears on the display and the speed value blinks."', source: { title: 'Puck Pro / Puck Pro+ Manual', url: M, page: 'p.9' } },
    { topic: 'Uncontrolled ascent', text: '"A fast (uncontrolled) ascent is defined as one in which a speed of 12 m/min or higher was maintained over more than two thirds of the way up. This applies to dives deeper than 12 m only. In such an event … Puck Pro locks the computer for 24 hours."', source: { title: 'Puck Pro / Puck Pro+ Manual', url: M, page: 'p.7' } },
    { topic: 'Safety stop', text: '"A SAFETY stop is generated as soon as the depth of the dive exceeds 10 m. It has a duration of 3 minutes and it is carried out between depths of 6 m and 3 m … Such stop is NOT mandatory but HIGHLY RECOMMENDED."', source: { title: 'Puck Pro / Puck Pro+ Manual', url: M, page: 'p.10' } },
    { topic: 'Deco', text: '"Instead of a no deco time, it shows you the depth and duration of the deepest stop and the total ascent time (ASC)". Missed stop: ">0.3 m above the decompression stop depth, a downward pointing triangle appears, an audible alarm goes off and both the current depth and the depth of the deco stop start blinking." More than 1 m above for more than 3 minutes = violation → bottom timer only for 24 h.', source: { title: 'Puck Pro / Puck Pro+ Manual', url: M, page: 'p.9–10, p.12' } },
    { topic: 'Surfacing', text: '"Upon returning to the surface, Puck Pro first goes into the so-called surfacing mode … a 3-minute countdown. If you submerge again before the 3-minute countdown is over, the dive time will resume."', source: { title: 'Puck Pro / Puck Pro+ Manual', url: M, page: 'p.10–11' } },
    { topic: 'No-fly', text: '"a standard 12-hour (no-deco non-repetitive dives) or 24-hour (deco and/or repetitive dives) countdown."', source: { title: 'Puck Pro / Puck Pro+ Manual', url: M, page: 'p.11' } },
  ],
  width: 330,
};
