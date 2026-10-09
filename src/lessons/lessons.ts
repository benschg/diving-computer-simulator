import { nitrox } from '../engine';
import { hasEvent, type Lesson } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 'first-look',
    title: '1 · Your first dive with a computer',
    summary: 'Descend, read the no-stop time, watch it count down, ascend at a safe rate, do the safety stop.',
    computerId: 'suunto-zoop-novo',
    minutes: 5,
    steps: [
      {
        id: 'descend',
        title: 'Descend to 18 m',
        instruction: 'Press Run, then choose "18 m". The computer switches to dive mode by itself once you pass 1.2 m and the DIVE TIME starts counting.',
        why: 'You never "start" a dive on a computer – the depth sensor does. The top number is always your current depth.',
        check: (c) => c.snap.depthM >= 17.5,
      },
      {
        id: 'read-ndl',
        title: 'Find the no-stop time',
        instruction: 'Stay at 18 m. The big number in the middle with the NO DEC TIME label is how many minutes you may stay at this depth before you would need decompression stops. Use "+1 min" or let the clock run until the dive time passes 3 minutes.',
        why: 'PADI: "A no stop dive means I can, at any time during the dive, ascend directly to the surface without stopping if necessary."',
        check: (c) => c.snap.depthM >= 17 && c.snap.diveTimeS >= 180,
      },
      {
        id: 'watch',
        title: 'Watch it shrink',
        instruction: 'Skip 10 minutes at depth ("+10 min"). Compare the no-stop time now with what it was – it falls roughly one minute per minute while you stay at the same depth.',
        why: 'The limit is not a fixed table entry: the computer recalculates it every second from your actual profile.',
        check: (c) => c.snap.depthM >= 17 && c.snap.diveTimeS >= 13 * 60,
      },
      {
        id: 'ascend',
        title: 'Ascend slowly to 5 m',
        instruction: 'Select "Ascend at 9 m/min" and press "5 m". Watch the ascent-rate bar on the right of the Suunto display grow as you move.',
        why: 'Suunto’s limit is 10 m/min – slower than the 18 m/min PADI maximum. Always follow the slower of the two.',
        check: (c) => c.snap.depthM <= 6 && c.snap.maxDepthM >= 17,
        failIf: (c) => (hasEvent(c, 'SLOW') ? 'The SLOW alarm fired: you ascended faster than 10 m/min. Restart and use 9 m/min.' : null),
      },
      {
        id: 'safety',
        title: 'Complete the safety stop',
        instruction: 'Hold between 3 and 6 m. The STOP label lights and a 3-minute countdown runs. Wait until it reaches zero (use "+1 min" three times or let the clock run).',
        why: 'A safety stop is recommended on every dive and required by PADI after dives deeper than 30 m or close to a no-stop limit.',
        check: (c) => c.snap.safetyStop.status === 'done',
      },
      {
        id: 'surface',
        title: 'Surface',
        instruction: 'Press "Surface". After a few minutes the display shows Surf t. (surface interval) and No Fly – the airplane icon tells you not to fly yet.',
        check: (c) => c.snap.depthM < 0.3 && c.snap.diveNumber >= 1,
      },
    ],
    debrief: [
      'Depth, dive time and no-stop time are the three numbers you watch on every computer; everything else is secondary.',
      'The no-stop time depends on depth: at 18 m this Suunto allows about 52 minutes on a first dive; at 30 m only 18.',
      'Suunto counts the no-fly time from the moment you surface: at least 12 hours.',
    ],
  },
  {
    id: 'first-limit',
    title: '2 · Turn the dive at the first limit',
    summary: 'Dive to 24 m, watch the NDL warning, and leave before it reaches zero.',
    computerId: 'shearwater-peregrine',
    minutes: 5,
    steps: [
      { id: 'descend', title: 'Descend to 24 m', instruction: 'Run the simulation and go to 24 m. Note the NDL in the lower right of the Peregrine.', check: (c) => c.snap.depthM >= 23.5 },
      {
        id: 'warning',
        title: 'Wait for the low-NDL warning',
        instruction: 'Stay at 24 m and skip time until the NDL is 5 minutes or less. The number turns yellow and a yellow "Low NDL Alert" banner appears. Press MENU or FUNC on the computer to acknowledge it.',
        why: 'PADI: "always try to have five or more minutes no decompression time remaining" and turn the dive at the first limit you reach – time, air or NDL.',
        check: (c) => c.snap.depthM >= 23 && c.snap.ndlMin <= 5,
        failIf: (c) => (c.snap.deco.required ? 'NDL reached zero – you are now in deco. Restart and ascend while the NDL is still above zero.' : null),
      },
      {
        id: 'ascend',
        title: 'Start the ascent now',
        instruction: 'Ascend at 9 m/min to 5 m. Watch the NDL climb back up as you get shallower.',
        why: 'A slow ascent is itself decompression: the shallower you are, the faster the fast tissues off-gas.',
        check: (c) => c.snap.depthM <= 6,
        failIf: (c) => (c.snap.deco.required ? 'You went into decompression before leaving the bottom.' : null),
      },
      {
        id: 'safety',
        title: 'Safety stop',
        instruction: 'Hold 5 m. The SAFETY STOP title turns green with a check mark while the countdown runs. If you drift above 2.4 m or below 8.3 m it pauses in yellow.',
        check: (c) => (c.fw.display() as { slot: { value: string } }).slot.value === 'Complete',
      },
      { id: 'surface', title: 'Surface', instruction: 'Press "Surface".', check: (c) => c.snap.depthM < 0.3 && c.snap.diveNumber >= 1 },
    ],
    debrief: [
      'Shearwater’s default conservatism (GF 40/85) gives 43 minutes at 18 m; the DSAT/PADI table gives 56. Different computers, different limits – follow the most conservative one in the buddy team.',
      'The yellow banner is an "Alert" you can configure (default 5 min); "Warnings" such as FAST ASCENT use the same banner.',
    ],
  },
  {
    id: 'too-fast',
    title: '3 · Too fast: the ascent-rate alarm',
    summary: 'See what a 18 m/min ascent does on a Suunto: SLOW, then a mandatory safety stop.',
    computerId: 'suunto-zoop-novo',
    minutes: 5,
    steps: [
      { id: 'descend', title: 'Descend to 20 m and stay 5 minutes', instruction: 'Go to 20 m, then skip 5 minutes.', check: (c) => c.snap.depthM >= 19.5 && c.snap.diveTimeS >= 5 * 60 },
      {
        id: 'fast',
        title: 'Ascend at 18 m/min to 10 m',
        instruction: 'Select "Ascend at 18 m/min" (the PADI maximum) and press "10 m". The bottom bar segment blinks, SLOW blinks, and because you stayed over 10 m/min for more than 5 seconds the computer adds a mandatory safety stop.',
        why: 'Suunto’s limit is 10 m/min. PADI’s 18 m/min is a maximum, "or the computer’s rate, whichever is slower".',
        check: (c) => hasEvent(c, 'Mandatory safety stop added'),
      },
      {
        id: 'mandatory',
        title: 'Serve the mandatory stop',
        instruction: 'Ascend slowly to 4 m. CEILING and STOP light up with "3.0" and a countdown. Wait until the stop disappears.',
        why: 'Unlike the recommended stop, this one is enforced: surfacing before it is complete is a violation that penalises your next dives.',
        check: (c) => c.snap.safetyStop.mandatory && c.snap.safetyStop.status === 'done',
        failIf: (c) => (c.snap.safetyStop.status === 'violated' ? 'You surfaced before the mandatory stop was complete: Suunto shortens the no-stop times of your next dives.' : null),
      },
      { id: 'surface', title: 'Surface', instruction: 'Now surface.', check: (c) => c.snap.depthM < 0.3 && c.snap.diveNumber >= 1 },
    ],
    debrief: [
      'Every brand draws the ascent limit differently: Suunto 10 m/min with a bar, Shearwater chevrons (yellow above 9, red above 18), Oceanic 9 m/min with five segments and SLO, Cressi three arrows at 12 m/min, Mares a numeric speed with an alarm at 10.',
      'Only Suunto adds a mandatory stop; Mares locks the computer after an "uncontrolled ascent" (12 m/min over two thirds of the way up); Shearwater just shows a FAST ASCENT warning.',
    ],
  },
  {
    id: 'emergency-deco',
    title: '4 · Emergency decompression',
    summary: 'Overstay the no-stop limit and follow the computer’s decompression stop. Compare with the PADI table rule.',
    computerId: 'oceanic-veo-4',
    minutes: 8,
    steps: [
      { id: 'descend', title: 'Descend to 30 m', instruction: 'Go to 30 m. With DSAT this computer gives 20 minutes here – the same as the PADI RDP.', check: (c) => c.snap.depthM >= 29.5 },
      {
        id: 'overstay',
        title: 'Overstay until DECO appears',
        instruction: 'Skip time until the NO DECO digits hit zero, then stay about 4 more minutes. The audible alarm sounds, the UP arrow and the full N2 bar flash, and the display shows a stop depth, stop time and TTS (time to surface).',
        why: 'PADI’s table rule: exceeded by 5 minutes or less → 8 minutes at 5 m; more than 5 minutes → at least 15 minutes at 5 m. The computer calculates the actual requirement instead.',
        check: (c) => c.snap.deco.required && c.snap.deco.stopTimeMin >= 3,
      },
      {
        id: 'ascend',
        title: 'Ascend to just below the stop',
        instruction: 'Ascend at 9 m/min to the stop depth shown (the stop is at 3 m: hold 4 m). Within 3 m below the stop the arrows change to the STOP symbol.',
        why: 'The required stop is shallower than the 5 m you learnt for the table. Stopping at 5 m instead still works – it just takes a little longer.',
        check: (c) => (c.snap.deco.required && c.snap.depthM <= c.snap.deco.stopDepthM + 3 && c.snap.depthM >= c.snap.deco.stopDepthM) || (!c.snap.deco.required && c.snap.depthM <= 6),
        failIf: (c) => (c.snap.violation.aboveStopS > 20 ? 'You went above the stop depth: DOWN flashes and this counts as a Conditional Violation. Descend below the stop.' : null),
      },
      {
        id: 'clear',
        title: 'Wait until the obligation clears',
        instruction: 'Hold the stop until DECO disappears and the no-stop display returns. Then do your normal safety stop.',
        check: (c) => !c.snap.deco.required && c.snap.maxDepthM >= 29,
        failIf: (c) => (c.snap.violation.aboveStopS > 300 ? 'More than 5 minutes above the stop: Delayed Violation 1 – the computer will turn into a gauge 5 minutes after surfacing.' : null),
      },
      { id: 'surface', title: 'Surface and read FLY', instruction: 'Surface, then press ADV on the computer until the FLY/SAT screen. FLY counts down 24 hours; SAT is the desaturation time.', check: (c) => c.snap.depthM < 0.3 && c.snap.diveNumber >= 1 },
    ],
    debrief: [
      'PADI after an emergency decompression stop: no diving for at least 6 hours (≤ 5 min over) or 24 hours (> 5 min over). Breathe oxygen and watch for DCS symptoms if the stop was missed.',
      'Try the same dive on the Suunto: its continuous ceiling and ASC TIME look very different from Oceanic’s stop depth / stop time / TTS, and from Shearwater’s DECO STOP 3 m 1 min.',
    ],
  },
  {
    id: 'missed-stop',
    title: '5 · What happens if you skip the stop',
    summary: 'Ignore a decompression ceiling and watch the computer lock itself for 48 hours.',
    computerId: 'suunto-zoop-novo',
    minutes: 8,
    steps: [
      { id: 'deco', title: 'Create a deco obligation', instruction: 'Go to 30 m and skip time until NO DEC TIME is replaced by CEILING and ASC TIME, then skip 10 more minutes so the obligation is substantial.', check: (c) => c.snap.deco.required && c.snap.deco.ttsMin >= 8 },
      {
        id: 'violate',
        title: 'Ascend above the ceiling',
        instruction: 'Ascend to 2 m (set the target depth slider to 2). An arrow points down, a continuous beep starts and "Er" appears: you have three minutes to get back below the ceiling.',
        check: (c) => c.snap.deco.required && c.snap.depthM <= 2.5 && c.snap.depthM >= 1.2,
      },
      {
        id: 'lock',
        title: 'Stay there for 3 minutes',
        instruction: 'Hold 2 m for three minutes. The algorithm locks: only "Er" is shown in the centre field; depth and time keep working.',
        why: 'Suunto: "If you omit decompression stops for longer than three (3) minutes, the RGBM algorithm is locked for 48 hours."',
        check: (c) => hasEvent(c, 'algorithm locked'),
      },
      { id: 'surface', title: 'Surface', instruction: 'Surface and look at the display: Er, and a 48-hour no-fly time. Planning mode is disabled.', check: (c) => c.snap.depthM < 0.3 && c.snap.locked },
    ],
    debrief: [
      'Lock-outs differ: Suunto 48 h (Er), Cressi 48 h (ERROR PROGRAM, STOP flashes), Mares 24 h (bottom timer only), Oceanic 24 h (Violation Gauge Mode). Shearwater never locks you out – it shows MISSED DECO STOP and leaves the decision to you.',
      'A locked computer is not a reason to dive with a different one: the lock is telling you about your tissues, not the device.',
    ],
  },
  {
    id: 'repetitive',
    title: '6 · Repetitive dives and plan mode',
    summary: 'Make a dive, wait an hour, use PLAN to see the shorter second-dive limits.',
    computerId: 'suunto-zoop-novo',
    minutes: 6,
    steps: [
      { id: 'dive1', title: 'Dive 1: 18 m for 30 minutes', instruction: 'Go to 18 m, skip 30 minutes, ascend at 9 m/min, do the safety stop and surface.', check: (c) => c.snap.diveNumber >= 1 && c.snap.phase === 'surface' && c.snap.maxDepthM >= 17 },
      { id: 'wait', title: 'Surface interval: 1 hour', instruction: 'Press "+1 h surface". Surf t. counts up; the airplane stays on.', check: (c) => c.snap.surfaceIntervalS >= 3600 },
      {
        id: 'plan',
        title: 'Open PLAN mode',
        instruction: 'Press MODE on the computer until PLAN NODEC shows (DIVE → PLAN). Use UP/DOWN to read the no-stop time for 18 m. The dive counter in the bottom row says 2 – the next dive is repetitive.',
        why: 'PADI: before a repetitive dive "use the dive computer plan mode if available" and compare it with your buddy’s.',
        check: (c) => (c.fw.display() as { mode: string }).mode === 'plan',
      },
      { id: 'dive2', title: 'Dive 2 to 18 m', instruction: 'Press MODE back to DIVE, then descend to 18 m. Compare the no-stop time with dive 1: residual nitrogen from the first dive shortens it.', check: (c) => c.snap.diveNumber >= 2 && c.snap.depthM >= 17 },
    ],
    debrief: [
      'All computers carry residual nitrogen between dives, which is why you must not share a computer or switch it off between dives.',
      'Suunto’s RGBM additionally penalises short surface intervals, reverse profiles and multi-day series beyond what a plain Bühlmann model would.',
    ],
  },
  {
    id: 'nitrox',
    title: '7 · Nitrox: more time, a depth limit',
    summary: 'EAN32 at 24 m – longer no-stop time but a maximum operating depth.',
    computerId: 'shearwater-peregrine',
    settings: { gas: nitrox(32) },
    minutes: 4,
    steps: [
      { id: 'descend', title: 'Descend to 24 m on EAN32', instruction: 'The bottom-left of the Peregrine reads Nx32. Go to 24 m and read the NDL – on air it would be about 20 minutes.', check: (c) => c.snap.depthM >= 23.5 },
      {
        id: 'mod',
        title: 'Find the MOD',
        instruction: 'Descend to 34 m. A yellow MOD box appears 1.9 m above the limit and turns red when you pass it (33.6 m at PO₂ 1.4). The gas name flashes red.',
        why: 'The oxygen partial pressure limit (1.4 bar) sets a hard floor for every nitrox mix; the computer warns, but will not stop you.',
        check: (c) => c.snap.depthM >= 33.8,
      },
      { id: 'up', title: 'Ascend above the MOD', instruction: 'Return to 24 m. The warning clears.', check: (c) => c.snap.depthM <= 30 && c.snap.maxDepthM >= 33.5 },
    ],
    debrief: [
      'Nitrox buys no-stop time at moderate depths; it does nothing for narcosis and adds an oxygen limit.',
      'Set the mix on the computer before every dive: a computer set to air while you breathe EAN32 is merely conservative, the opposite mistake can be fatal.',
    ],
  },
  {
    id: 'dual-algorithm',
    title: '8 · Two algorithms, one computer',
    summary: 'Compare DSAT and Z+ limits on the Oceanic and see why buddies read different numbers.',
    computerId: 'oceanic-veo-4',
    minutes: 3,
    steps: [
      { id: 'plan', title: 'Open PLAN', instruction: 'Press ADV on the Oceanic until PLAN shows (main → ALT1 → ALT2 → FLY → PLAN). Press ADV again to step through depths and read the NO DECO minutes with DSAT.', check: (c) => (c.fw.display() as { screen: string }).screen === 'plan' },
      { id: 'switch', title: 'Switch to Z+', instruction: 'In Settings choose "Z+ (Bühlmann based)" for Conservatism and look at the same depths again.', check: (c) => c.fw.settings.conservatism === 1 },
      { id: 'cf', title: 'Add the Conservative Factor', instruction: 'Now choose "Z+ + Conservative Factor": the limits drop to those of an altitude 915 m higher.', check: (c) => c.fw.settings.conservatism === 3 },
    ],
    debrief: [
      'At 18 m: DSAT 59 min, Z+ 50 min, Z+ with CF 35 min. At 9 m the gap is 283 vs 217 minutes.',
      'The Aqua Lung i300C only has Z+; many dive-shop rental fleets mix i300Cs with Suuntos (52 min at 18 m) and Cressis (49 min).',
    ],
  },
];

export function lessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
