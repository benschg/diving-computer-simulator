import type { ComputerDefinition } from '../types';
import { GarminDisplayView } from './Display';
import { GarminDescentG1 } from './firmware';

const M = 'https://www8.garmin.com/manuals/webhelp/GUID-5E9F7B08-7D9E-4C18-8A2F-5C5E1B1AC0E8/EN-US/';

export const garminDescentG1: ComputerDefinition = {
  id: 'garmin-descent-g1',
  brand: 'Garmin',
  model: 'Descent G1',
  tagline: 'A dive watch: five buttons, glances, alerts, Bühlmann with gradient factors',
  category: 'watch',
  algorithm: 'Bühlmann ZHL-16C + GF',
  summary:
    'A watch-style computer. The primary dive screen shows NDL, a depth circle, gas and PO₂, temperature and dive time, with a tissue-load gauge on the left (segments at 80 % and 100 %) and ascent chevrons on the right (good below 7.9 m/min, moderately high to 10.1, too high above). Alerts pop up as full-screen messages: Approaching NDL at 10 and 5 minutes, Ascent Rate, Safety Stop, Decompression. Missing a deco stop for 3 minutes locks the dive modes for 24 hours.',
  buttons: [
    { id: 'light', label: 'LIGHT', short: 'Backlight' },
    { id: 'start', label: 'START', short: 'Start dive / open the in-dive menu / select', long: 'Clock menu' },
    { id: 'up', label: 'UP', short: 'Scroll menus', long: 'Main menu (surface)' },
    { id: 'back', label: 'BACK', short: 'Dismiss alert / exit menu', long: 'Primary dive screen' },
    { id: 'down', label: 'DOWN', short: 'Next data screen (primary → data → compass)' },
  ],
  conservatism: [
    { value: 0, label: 'Medium (GF 40/85)', description: 'Default conservatism.' },
    { value: 1, label: 'Low (GF 45/95)', description: 'Least conservative.' },
    { value: 2, label: 'High (GF 35/75)', description: 'Most conservative.' },
  ],
  o2Range: [21, 100],
  create: (settings) => new GarminDescentG1(settings),
  Display: GarminDisplayView,
  reference: [
    { topic: 'Dive start / end', text: '"The activity timer starts automatically when you reach a depth of 1.2 m." "When you ascend to 1 m, the End Dive Delay timer begins counting down."', source: { title: 'Descent G1 Owner’s Manual', url: M, page: 'p.15' } },
    { topic: 'Tissue load gauge', text: '"Segment 1: 0 to 79% tissue load. Segment 2: 80 to 99% tissue load. … When your tissue load level reaches or exceeds 100%, the decompression stop gauge appears."', source: { title: 'Descent G1 Owner’s Manual', url: M, page: 'p.10' } },
    { topic: 'Ascent rate', text: '"Good. Ascent is less than 7.9 m per minute. Moderately high. Ascent is between 7.9 and 10.1 m per minute. Too high. Ascent is greater than 10.1 m per minute" – three chevrons alternating with an outline on the G1, green/yellow/red on the Mk2i/Mk3i.', source: { title: 'Descent G1 Owner’s Manual', url: M, page: 'p.10' } },
    { topic: 'Safety stop', text: 'Safety-stop gauge after dives deeper than 11 m with a 3-minute countdown that runs while you stay in the stop range. Exact range and pause behaviour are not in the research notes (UNVERIFIED – modelled as 2.5–8 m, pausing outside).', source: { title: 'Descent G1 Owner’s Manual', url: M, page: 'p.18' } },
    { topic: 'Lockout', text: 'Decompression lockout after a violated stop: only gauge and apnea modes for 24 hours ("the tissue load and decompression lockout features function normally" in pool mode). Threshold modelled as 3 minutes above the stop (UNVERIFIED).', source: { title: 'Descent G1 Owner’s Manual', url: M, page: 'p.5, p.19' } },
    { topic: 'No-fly', text: 'Garmin shows a no-fly time on the surface-interval glance; its rule is not published – DAN guidance (12/18/24 h) is used here.', source: { title: 'Descent Mk2i Owner’s Manual', url: M } },
  ],
  width: 340,
};
