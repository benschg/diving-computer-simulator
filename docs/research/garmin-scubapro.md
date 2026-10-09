# Dive-computer reference: Garmin Descent (G1 / Mk2i / Mk3i) and Scubapro Aladin A1 / A2 / Galileo G2

Research notes for the web-based dive-computer training simulator. Everything below was taken from the
official owner's manuals (PDFs downloaded from Garmin / Scubapro and text-extracted page by page, plus the
Garmin webhelp pages) unless a citation says otherwise. Citation tags such as `[G1-OM p.18]` are clickable
reference links; the full URL list is in the **Sources** section at the end. Page numbers are the numbers
printed in the manual (for the Garmin G1 PDF, printed page = PDF page − 8; for the Mk2i, Mk3, A1, A2 and
G2 PDFs, printed page = PDF page).

Anything that could not be confirmed in an official manual is marked **UNVERIFIED** and the best available
secondary source is given. Where two official statements disagree, both are quoted.

Date of research: 2026-10-09.

---

## Contents

- Part A – Garmin Descent
  - A0 Models, displays, buttons
  - A1 Dive modes, dive phases, starting / ending a dive
  - A2 Dive data screens and the primary dive data screen (incl. colour conventions)
  - A3 Dive behaviours (NDL, deco, ceiling violation, deco lockout, safety stop, ascent rate, no-fly, tissue load)
  - A4 Settings (Dive Setup) with manual quotes and known option values
  - A5 Alerts (verbatim table)
  - A6 Dive planner
  - A7 ASCII sketches (G1 NDL / deco / safety stop / Big Numbers; Mk2i & Mk3 colour layout)
  - A8 Mk3i differences
- Part B – Scubapro Aladin A1 / A2 and Galileo G2
  - B0 Models, displays, buttons
  - B1 Display layouts (A1/A2 Light & Classic; G2 Light / Classic / Full / Graphical)
  - B2 Algorithm: ZH-L16 ADT MB PMG, MB levels, level stops, workload, PDIS
  - B3 Ascent rate (verbatim table), SLOW DOWN / ASCENT TOO FAST
  - B4 Safety stop timer, deco stops, missed deco, SOS, no-fly, no-dive, altitude classes, gauge/apnea locks
  - B5 Warnings and alarms lists
  - B6 Dive planner
  - B7 NDL table (none published) and what exists instead
  - B8 ASCII sketches (G2 Classic NDL / level stop; G2 Light; A1 Classic)
- Part C – Numeric cheat-sheet for the simulator
- Sources

---

# Part A – Garmin Descent

## A0 Models, displays, buttons

| Model | Display | Touch | Depth rating | Dive-mode battery | Source |
|---|---|---|---|---|---|
| Descent G1 / G1 Solar | monochrome transflective memory-in-pixel (MIP), 0.9" (23 mm), 176 × 176 px; "high-contrast display" in Garmin's press release | no | 10 ATM / 100 m (EN13319) | up to 25 h | [GARMIN-PR-G1], [GRW-G1], [POCKETNOW-G1] (display type/resolution are from secondary sources – Garmin's own manual and press release do not state them: **UNVERIFIED** in official text) |
| Descent Mk2i | colour MIP, 1.4" (35.56 mm), 280 × 280 px | no | 10 ATM / 100 m (EN13319) | up to 80 h (32 h with T1 paired) | [GRW-MK2I] (secondary source, **UNVERIFIED** in official text) |
| Descent Mk3i | AMOLED touchscreen, 1.2" 390 × 390 (43 mm) / 1.4" 454 × 454 (51 mm) | yes ("underwater-capable") | 20 ATM / 200 m (EN13319) | 30 h (43 mm) / 66 h (51 mm) | [GRW-MK3I]; the Mk3 manual itself has "About the AMOLED Display" and "Enabling and Disabling the Touchscreen" sections [MK3-OM p.9, p.148] |

Design consequence for the simulator: the **G1 has no colour**. Everything Garmin expresses as green / yellow / red
on the Mk2i / Mk3i is expressed on the G1 as bar *segments*, *flashing* values, an *alternating* icon and
pop-up text (see A2 and A5).

### Buttons (5 buttons on all three models)

Garmin's G1 "Device Overview" (verbatim, dive-relevant bullets) [G1-OM p.1-2]:

- **LIGHT** – "Press to turn the device on. / Press to turn the backlight on and off. / Quickly press twice to turn the flashlight on or off. / Hold to view the controls menu. NOTE: While diving, hold functions are disabled."
- **MENU·UP** – "Press to scroll through the glance loop and menus. / Hold to view the menu. NOTE: You can enable or disable this button for dive activities (Dive Setup, page 6)."
- **DOWN** – "Press to scroll through the glance loop and menus. / Press to scroll through the data screens during a dive. / Hold to view the altimeter, barometer, and compass (ABC) screen. NOTE: While diving, hold functions are disabled."
- **START·STOP** – "Press to view the activity list and start or stop an activity. / Press to choose an option in a menu. / Press to view the menu during a dive. / Hold to view the clock menu. NOTE: While diving, hold functions are disabled."
- **BACK** – "Press to return to the previous screen. / Press to exit a menu during a dive. / Press to record a lap, rest, or transition during a multisport activity. / Hold to view the watch face from any screen. / Hold to return to the primary data screen during a dive."
- Double tap: ": Double tap the device to scroll through the data screens during a dive."

The Mk2i lists the same five buttons (LIGHT, UP·MENU, DOWN, START·STOP, BACK·LAP) with the same in-dive
functions, plus "Hold to view the music controls from any screen" on DOWN [MK2I-OM p.8-9]. The Mk3 adds the
touchscreen ("Swipe up or down to scroll through the glance loop and menus. Swipe right to return to the
previous screen. Cover the screen with your palm to return to the watch face …") and "Enabling and Disabling
the Touchscreen: Hold DOWN and START" [MK3-OM p.8-9].

In-dive button summary (G1 / Mk2i / Mk3):

| Button | During a gas dive |
|---|---|
| DOWN (or double tap) | next data screen / dive compass [G1-OM p.15] |
| START | opens the in-dive menu (Gas switch, Stop Dive, Switch to OC/CC, Messages on Mk2i/Mk3i, Divers …) [G1-OM p.15, p.17-18] |
| BACK | exits a menu; **hold** = back to the primary data screen [G1-OM p.2] |
| UP | can be disabled for dives ("UP Key" setting) [G1-OM p.6] |
| LIGHT | backlight; hold functions disabled while diving (Mk3i: hold LIGHT during a dive = "Requesting Diver Assistance" countdown) [G1-OM p.1], [MK3-OM p.18] |
| START (dive compass screen) | set heading; menu: Reset Heading, Set to Recip., Set to 90L / 90R, Clear Heading [G1-OM p.16]; Mk3: "TIP: You can set the heading from any of the dive data screens by holding START and DOWN." [MK3-OM p.26] |

## A1 Dive modes, phases, starting and ending a dive

"The Descent G1 device supports six dive modes. Each dive mode has four phases: dive pre-check, surface
display, in-dive, and post-dive." [G1-OM p.5] (Mk3: "seven dive modes" – adds **Pool Apnea** [MK3-OM p.11].)

Verbatim mode list [G1-OM p.5]:

- "**Single-Gas**: This mode allows you to dive with a single gas blend. You can set up to 11 additional gases as backup gases."
- "**Multi-Gas**: This mode allows you to configure multiple gas blends and switch gases during your dive. You can set the oxygen content from 5–100%. This mode supports one bottom gas, and up to 11 additional gases as decompression or backup gases. NOTE: Backup gases are not used in no-decompression limit (NDL) and time to surface (TTS) decompression calculations until you activate them during a dive."
- "**CCR**: This mode for closed-circuit rebreather (CCR) diving allows you to configure two partial pressure of oxygen (PO2) setpoints, closed-circuit (CC) diluent gases, and open-circuit (OC) decompression and backup gases."
- "**Gauge**: This mode allows you to dive with basic bottom timer features. NOTE: After diving in gauge mode, the device can only be used in gauge or apnea mode for 24 hours."
- "**Apnea**: This mode allows you to free dive with apnea-specific dive data. This mode has a higher data refresh rate."
- "**Apnea Hunt**: This mode is similar to the Apnea dive mode, but tuned specifically for spearfishers. This mode disables start and stop tones."

Pool dive mode (controls menu): "When the device is in pool dive mode, the tissue load and decompression
lockout features function normally, but dives are not saved to the dive log. … The pool dive mode turns off
automatically at midnight." [G1-OM p.5]

### Going Diving (verbatim, G1) [G1-OM p.15]

1. "From the watch face, press START."
2. "Select a dive mode."
3. "If necessary, press UP to edit the dive settings, such as the gases, water type, and alerts." (Mk2i: "press DOWN" [MK2I-OM p.27])
4. "Wait with your wrist out of the water until the watch acquires GPS signals and the status bar is filled (optional). The watch requires GPS signals to save your dive entry location."
5. "Press START until the primary dive data screen appears."
6. "Descend to start your dive. **The activity timer starts automatically when you reach a depth of 1.2 m (4 ft.).** NOTE: If you start a dive without selecting a dive mode, the watch uses the most recently used dive mode and settings, and your dive entry location is not saved."
7. "Press DOWN to scroll through the data screens and dive compass. TIP: You can also double tap the watch to scroll through the screens. / Press START to view the in-dive menu."
8. "When you are ready to end the dive, ascend to the surface."
9. "Keep your wrist out of the water so the watch can acquire GPS signals and save your dive exit location (optional)."
10. "For a Single-Gas, Multi-Gas, CCR, or Gauge dive, wait for the End Dive Delay timer to count down. **NOTE: When you ascend to 1 m (3.3 ft.), the End Dive Delay timer begins counting down** (Dive Setup, page 6). You can press START, and select Stop Dive to save the dive before the timer elapses. / For an Apnea or Apnea Hunt dive, press BACK, and select [✓]."

Identical wording in the Mk2i and Mk3 manuals; the Mk3 calls the countdown the "DIVE END timer" [MK3-OM p.25].
The alert shown while it counts: "Dive will end in %1 seconds." – "The watch will automatically end and save
the dive." [G1-OM p.24]. Mk3 only: "Auto Dive: Sets the type of dive activity that starts automatically when you
begin your descent. You can use the Snooze option to temporarily disable this feature." [MK3-OM p.12]

Mk1 firmware note on what counts as dive time (community-visible Garmin release notes, software 4.00):
"Improved surface interval to begin counting at the beginning of the End Dive Delay." and "Improved dive log to
exclude End Dive Delay in total time. This is now listed as 'Bottom Time'." [SW400-MK1] (forum post of Garmin
release notes – treat as **UNVERIFIED** for current G1/Mk2i/Mk3i firmware).

## A2 Dive data screens and the primary dive data screen

"You can press DOWN or double-tap the device to scroll through the data screens. In the activity settings, you
can reorder the default data screens, add a dive stopwatch, and add custom data screens … You can customize the
data fields on some of the data screens." [G1-OM p.9]

### Single-Gas and Multi-Gas data screens – G1 (verbatim) [G1-OM p.10]

- "**Primary data screen**: Displays the main dive data, including your breathing gas, partial pressure of oxygen (PO2) level, and rate of ascent. You can edit one of the data fields."
  - ① "Your nitrogen (N2) and helium (He) tissue load level. Segment 1: 0 to 79% tissue load. Segment 2: 80 to 99% tissue load. When you start a safety stop, the safety stop gauge appears (Performing a Safety Stop, page 18). When your tissue load level reaches or exceeds 100%, the decompression stop gauge appears (Performing a Decompression Stop, page 19)."
  - ② "Your rate of ascent. [single chevron]: Good. Ascent is less than 7.9 m (26 ft.) per minute. [two chevrons]: Moderately high. Ascent is between 7.9 and 10.1 m (26 and 33 ft.) per minute. [three chevrons] and [outline] alternating: Too high. Ascent is greater than 10.1 m (33 ft.) per minute."
- "**Dive compass**: Allows you to view the compass and set a directional heading to aid with underwater navigation."
- "**Customizable data screen**: Displays additional dive data and physiological information. You can edit the gauges and two of the data fields."

What the G1 figure shows on the primary screen (read from the manual's screen image, [G1-OM p.10] figure):
top-left `NDL 20`; top-right a circular depth gauge `60 ft`; a vertical tissue-load bar on the **left** edge
(callout ①); a vertical ascent-rate chevron column on the **right** edge (callout ②); middle row `Air` (gas; on
the deco figure `Nx32 0.81`, i.e. gas plus PO2) and `TEMP. 62.6`; bottom row the dive time `10:20`. The second
screen in the loop shows `NDL 20`, depth circle, `HR 92`, `MAX DPTH 60`, `10:20`; the third is the compass
(`NE 22 059° E`). The Gauge-mode figure shows a stopwatch icon `1:48`, `57 ft` circle, `TEMP 63°`, `22:55`,
`AVG 51ft`, `MAX 61ft` [G1-OM p.13]. The CCR figure shows `NDL 99+`, `CC Nx32 0.70`, `TEMP. 62.6`, `26:45`, and
CCR's extra screen `OTU 12`, `CNS 5%` [G1-OM p.11-12]. The G1 shows **time of day / battery / max depth /
TTS** only on the customizable screen or as selectable data fields, not on the primary screen.

**Big Numbers mode** (G1 figure [G1-OM p.11]): `NDL` rotated label with `17`; circle `37 min` (dive time);
very large depth `45 ft`; `Air` rotated on the right; chevrons on the left. "You can change the size of the
numbers on the single-gas and multi-gas dive data screens. Hold MENU > Activities & Apps > Single-Gas or
Multi-Gas > activity settings > Big Numbers." [G1-OM p.11]. Mk3: "The single-gas dive mode has Big Numbers mode
enabled by default" [MK3-OM p.20]; the Mk3 Big-Numbers figure shows `86.0°` (temp) top, `MAX. DEPTH 97`,
`TTS 3:15`, gas box `Air` / `CC`, huge `77 ft`, ascent chevrons right, `NDL 12`, dive time `05:35`,
`PO2 0.70` [MK3-OM p.24].

### Colour conventions – Mk2i and Mk3 (verbatim) [MK2I-OM p.23], [MK3-OM p.21]

Primary data screen callouts:
- ① "Your partial pressure of oxygen (PO2) level."
- ② "Your nitrogen (N2) and helium (He) tissue load level. **Green**: 0 to 79% tissue load. **Yellow**: 80 to 99% tissue load. **Red**: 100% or greater tissue load."
- ③ "Your rate of descent or ascent. **Green**: Good. Ascent is less than 7.9 m (26 ft.) per min. **Yellow**: Moderately high. Ascent is between 7.9 and 10.1 m (26 and 33 ft.) per min. **Red**: Too high. Ascent is greater than 10.1 m (33 ft.) per min."
- Customizable data screen ④ "The time to surface (TTS) decompression calculation." (Mk2i figure: `9:06` time of day, `TTS 1:55`, `TEMP. 64.0°F`, `MAX. DEPTH 60`, `BATTERY LEVEL 98%`, `NDL 14 DEPTH 57 ft`, `42:30`.)
- CCR extra gauges: "Your central nervous system (CNS) oxygen toxicity level. Green: 0 to 79% … Yellow: 80 to 99% … Red: 100% or greater" and "Your current oxygen toxicity units (OTU). Green: 0 to 249 OTU. Yellow: 250 to 299 OTU. Red: 300 or greater OTU." [MK2I-OM p.24] (G1: the same thresholds as segments 1/2/3 [G1-OM p.12]).

Mk2i / Mk3 primary-screen layout (from the figures [MK2I-OM p.23], [MK3-OM p.21]): PO2 and gas on the top line
(`0.25 Nx25`, Mk3 `0.58 Air`); tank pressures of up to two transceivers (`3124 ▮▮ 2853`, named `SAM` / `CHARLIE`
on the Mk3); `NDL 14` and `DEPTH 57 ft` on one line; dive time `42:30` at the bottom; a **left arc** is the N2/He
tissue-load gauge (green → yellow → red, labelled `N2` on the Mk3); a **right arc** is the ascent-rate chevron
gauge. During CC/OC bailout: "The PO2 data field colors on the primary data screen invert" (G1) / "The dividing
lines on the data screens turn red" (Mk2i, Mk3) [G1-OM p.18], [MK2I-OM p.30].

Other colour statements in the manuals: "The compass indicates the reciprocal heading with a gray mark" (G1) /
"with a red mark" (Mk2i, Mk3) [G1-OM p.16], [MK2I-OM p.28]; NDL planner: "If the planned depth exceeds the MOD
of the breathing gas, a warning message appears, and the depth appears in red" (Mk2i) [MK2I-OM p.32]; Mk3
surface-interval glance OTU colours "Green: Under the NOAA recreational limit. Yellow: NOAA recreational limit.
Red: NOAA military limit." [MK3-OM p.31]; Mk3 "Gas Density … displays in yellow when over 5.2 g/L, and in red when
over 6.2 g/L" [MK3-OM p.157]; Mk3 "The buoy data fields turn yellow if your dive computer loses communication
with the buoy." [MK3-OM p.19]; Mk3 dive-readiness zones Green 75-100 / Yellow 50-74 / Orange 25-49 / Red 1-24
[MK3-OM p.32].

**NDL number colour change: not documented.** None of the three manuals states that the NDL value changes colour
as it runs down; the only NDL-related cue is the "Approaching NDL" alert at 10 min and again at 5 min (A5).
Treat any NDL colour change as **UNVERIFIED** (not in the manuals).

### Diving data fields available for custom screens (G1, verbatim list) [G1-OM p.111-112]

Ascent Rate, Avg Temperature, CNS, Current Gas PO2, Dive Number, Last Dive Ascent Time, Last Dive Avg. Asc. Rate,
Last Dive Avg. Desc. Rate, Last Dive Avg Heart Rate, Last Dive Avg Temperature, Last Dive Beginning Heart Rate,
Last Dive Depth, Last Dive Descent Time, Last Dive Ending Heart Rate, Last Dive Hang Time, Last Dive Max Asc.
Rate, Last Dive Max Desc. Rate, Last Dive Max Heart Rate, Last Dive Max Temperature, Last Dive Min Heart Rate,
Last Dive Min Temperature, Last Dive Time, Maximum Depth, Max Temperature, Min Temperature, **N2/He Load** ("Your
current nitrogen and helium tissue load level."), **OTU**, Surface Distance, **Surface Gradient Factor** ("The
expected gradient factor if the diver were to instantaneously surface."), Surface Time, **Time to Surface** ("The
amount of time required to safely ascend to the surface."), Total Dive Time.

Mk3 adds (verbatim) [MK3-OM p.156-157]: Air Time Remaining, Bailout TTS, **Conservatism** ("The level of
conservatism for decompression calculations."), Diluent PO2, FiO2, Gas Consumption Rate, Gas Density, **GF99**
("The current gradient factor. If you follow the dive computer's guidance, the selected low gradient factor should
display when you approach your first decompression stop, and the selected high gradient factor value should
display when you approach the surface. On-Gassing displays when you take on additional tissue load."),
**NDL ↑3M / NDL ↑10FT** ("Your no decompression limit (NDL) time if you ascend 3 m (10 ft.) from your current
depth."), **NDL ↓3M**, **NDL Δ 3M**, **Raw Ceiling** ("The unrounded depth the diver should not ascend past."),
RDNT ATR. There is **no "Ceiling" data field on the G1**; the ceiling is only shown as the stop depth in the
deco gauge.

Customising: "Select Layout to adjust the number of data fields … Select Left Gauge or Right Gauge to add
graphical dive gauges. … Select Reorder … Select Remove … NOTE: Not all options are available for dive
activities." [G1-OM p.41]; Mk3 path: Hold MENU > Dive Setup > Display Settings > dive mode > Data Screens
[MK3-OM p.23].

Terminology (verbatim) [G1-OM p.25]: "No decompression limit (NDL): A dive that does not require decompression
time while ascending to the surface." "Time to surface (TTS): The estimated amount of time it will take to ascend
to the surface, including decompression stops." Mk3 adds to TTS: "CAUTION Decompression stops are included in
the calculations, but safety stops are not." [MK3-OM p.38]. "Air time remaining (ATR): The time you may remain
at the current depth until an ascent at 9 m/min. (30 ft./min.) would result in surfacing with the reserve
pressure." [MK2I-OM p.37]
