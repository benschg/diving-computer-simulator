# Mares Puck Pro / Puck Pro+ (and Quad / Quad Air) and Cressi Leonardo (and Giotto / Donatello) — reference research for the dive-computer simulator

Compiled 2026-10-09 from the manufacturers' own English manuals (downloaded as PDF, text-extracted, and display-diagram pages rendered to images and inspected). Every claim carries a reference-style link; `[PP p.9]` means page 9 of the official Mares Puck Pro manual, etc. The link keys are resolved in the **Sources** section at the end. Anything not found in an official document is marked **UNVERIFIED**.

Source keys used throughout:

| Key | Document |
|---|---|
| [PP] | Mares *Puck Pro Dive Computer — Instruction Manual* (15 pp., EN). Mares lists this single file as the manual for both **Puck Pro and Puck Pro +** (product page title: "Puck Pro / Puck Pro + Manual"). |
| [PPpage] | Mares product/manual page for Puck Pro / Puck Pro + (links the EN PDF above). |
| [PK] | Mares *Puck* (original, 2008-era) *User's Guide* (third-party mirror) — same RGBM family, used only where the Puck Pro manual is silent. |
| [SM] | Mares *Smart* instruction manual (mirror) — same firmware family as Puck Pro. |
| [PU] | Mares *Puck Lite / Puck Pro Ultra / Puck Pro EZ* manual (newer, Bühlmann-GF generation) — used only for contrast. |
| [QD] | Mares *Quad Dive Computer* instruction manual (18 pp., EN, official). |
| [QA] | Mares *Quad Air Dive Computer* instruction manual (20 pp., EN, official). |
| [LE] | Cressi *Direction for use — Computer Leonardo* (84 pp., EN, official; imperial-flavoured text). |
| [LQ] | Cressi *Leonardo — Quick Guide* (16 pp., official; documents the newer-firmware UI). |
| [L2] | Cressi *Direction for use — Leonardo 2.0* (34 pp., EN, Rev. 01/2023, official). |
| [GI] | Cressi *Giotto — User Manual* (21 pp., EN, official). |
| [DO] | Cressi *Donatello / Michelangelo — User Manual* (38 pp., EN, Rev. 03/2019, official). |
| [SBtable] | ScubaBoard post with user-read Leonardo NDLs (UNVERIFIED third-party). |
| [DN] | Divernet group test "Can't pick one?" (2018) — third-party observations. |

---

## 0. Quick behaviour matrix (for the simulator engine)

| Behaviour | Mares Puck Pro / Pro+ | Cressi Leonardo (original firmware) |
|---|---|---|
| Algorithm name (verbatim) | "Decompression model: RGBM Mares-Wienke (10 tissues)" [PP p.12][PP] | "Algorithm: CRESSI RGBM algorithm. Sample tissues: 9 with saturation hemi-phases between 2.5 and 480 minutes" [LE p.74][LE]; "created in conjunction with the expertise of Bruce Wienke and based on the Haldane model, integrated with RGBM factors" [LE p.4][LE] |
| Conservatism setting | "P Factor" P0 / P1 / P2 (P1 shown as `p+`, P2 as `p++`) [PP p.7][PP] | "Dive Safety Factor" SF0 / SF1 / SF2, factory SF0 [LE p.22][LE] |
| NDL label on display | `no deco` (manual: "No deco time") [PP p.3, p.10][PP] | `NO DECO min` [LE p.36][LE] |
| Max NDL shown | 99 min [PP p.10][PP] | 99 = "no NDL" (2-digit field) — UNVERIFIED, [SBtable]; PLAN screen shows `99` at 9 m [LQ p.7][LQ] |
| Dive starts | at 1.2 m / 4 ft; immediately if in pre-dive, otherwise "within 20 seconds" [PP p.6, p.10][PP] | "automatically starts the DIVE AIR program at a depth exceeding 3.93 ft" (=1.2 m) [LE p.36][LE]; 2.0 firmware: within 2 s if switched on, within 20 s otherwise [L2 p.19][L2] |
| Dive ends | surfacing mode: 3-min countdown; re-submerge within 3 min = same dive [PP p.4, p.10–11][PP] | surface <2 min = continuation of previous dive; ≥2 min = new dive [LE p.60][LE] |
| Ascent-rate alarm | numeric m/min at left of middle row; alarm at ≥10 m/min (audible, icon, speed value blinks) [PP p.9][PP]; **no `SLOW` text on Puck Pro** (Quad has blinking `SLOW` [QD p.10][QD]) | 1/2/3 arrows at 4.0 / 8.0 / 12.0 m/min; at ≥12 m/min 3 arrows flash + `SLOW` flashes + beeps [LE p.45, p.48][LE] — limit is **12 m/min**, not 10 |
| Uncontrolled-ascent violation | ≥12 m/min over >2/3 of the ascent, dives deeper than 12 m → steady `fast` icon → 24-h lock to bottom-timer mode (can be disabled, `FASt`) [PP p.7, p.9][PP] | no lock; "next dive more conservative" if made within desat time (penalty icon) — stated in the 2.0 manual [L2 p.24][L2], not in the original manual |
| Safety stop | generated when dive exceeds 10 m; 3 min between 6 and 3 m; `SAFE` + countdown; "NOT mandatory but HIGHLY RECOMMENDED" [PP p.10][PP] | after any dive deeper than 10 m (32 ft); 3 min between 20–10 ft (6–3 m); `STOP` icon + minutes + depth; "not mandatory, yet strongly recommended" [LE p.45][LE]; 2.0: 5–3 m, `SAFE`, min:sec countdown [L2 p.25][L2] |
| Deep stops | "generated as you approach the no deco limit… one 2-minute stop or two 1-minute stops… NOT mandatory" [PP p.10][PP]; no on/off setting listed for Puck Pro (Quad/Smart have `DEEP`) [PP p.7][PP][QD p.7][QD][SM p.12][SM] | `DEEP STOP` of 1–2 min "at variable depth depending on the dive profile", on/off in DIVE SET (factory ON) [LE p.22, p.46][LE] |
| Deco display | `deco` + deepest stop depth + stop minutes + `asc` total ascent time [PP p.10][PP] | `DECO` + stop icon + stop depth (m) + stop minutes + `TOTAL` ascent time [LE p.50][LE] |
| Ceiling violation | >0.3 m above stop: down-triangle, audible alarm, depth + stop depth blink [PP p.9][PP] | ascend above stop: alarm + down arrow flashes; 2-min grace [LE p.51][LE] |
| Deco lock-out | >1 m above stop for >3 min = violation → repetitive dive only as bottom timer, 24 h [PP p.10, p.12][PP] | after 2 min uncorrected → "ERROR PROGRAM": `STOP` flashes, unusable 48 h (only Logbook/History) [LE p.51–52][LE] |
| No-fly | 12 h (no-deco, non-repetitive) / 24 h (deco and/or repetitive) [PP p.11][PP] | 12 h / 24 h / 48 h (after GAGE or "severe mistakes") [LE p.59–60][LE] |
| Nitrogen bar graph | 10 segments, bottom of display [PP p.10][PP] | **none** — Leonardo has only a 5-segment CNS O2 bar [LE p.40][LE][LQ p.5][LQ] |
| Nitrox range | O2 21–99 %, ppO2max 1.2–1.6 bar (default 1.4) [PP p.6, p.12][PP] | FO2 21–50 %, PO2 1.2–1.6 bar (default 1.4, also for air) [LE p.4, p.16][LE] |

---

# PART A — MARES PUCK PRO / PUCK PRO+

## A.0 Puck Pro vs Puck Pro+

* Mares publishes **one manual for both** ("Puck Pro / Puck Pro + Manual", EN + 10 languages) [PPpage]. The Puck Pro+ (2017) adds a Bluetooth interface via the clip-on "Bluelink Pro" and cosmetic changes (bezel, bar-graph styling); operation and the single-button UI are the same — **third-party reviews, UNVERIFIED against a Mares statement** [SeaDragon][DeepBlue][SBversions].
* The current-generation "Puck Pro Ultra / Puck Lite / Puck Pro EZ" is a *different* product: it "employs the unmodified Bühlmann ZH-L16C algorithm with gradient factors", depth-dependent ascent limits and a "SAFETY STOP +" feature [PU p.8, p.10–11][PU]. Do not mix those behaviours into a Puck Pro/Pro+ simulation.

## A.1 Physical / UI

### The single button
* "Puck Pro has only one button" — on the surface: **press** = "change menu or value of a setting"; **press and hold** = "enter a menu or confirm a setting". "To exit a menu, press the button to advance until you see bACk on the display, then press and hold the button." [PP p.4][PP]
* During the dive: **press** = "access alternate information on the display"; **press and hold** = "activate the backlight" [PP p.4][PP] (exception: when G2 = ON and the O2% is displayed, press-and-hold initiates the gas switch [PP p.5, p.11][PP]).
* Backlight on the surface works only from the pre-dive display; stays on 6 s (or until you leave a menu / 1 min of no operation) [PP p.7][PP]. In the dive it stays on for the `LGHt` duration: 1–10 s or `on` [PP p.7][PP].
* Operating modes: surface, dive (pre-dive, dive, surfacing, post-dive), sleep. Sleep after 1 min without operation (10 min from pre-dive); in sleep it still checks pressure every 20 s [PP p.4][PP]. "If you remain in pre-dive for longer than 10 minutes without pressing any button, Puck Pro will switch off" [PP p.6][PP].

### Menu tree (surface) — verbatim labels as shown on the 7-segment display [PP p.5–8][PP]
```
POST-DIVE (only when desat and no fly > 0)  ->  PRE-DIVE  ->  MOdE  ->  SEt  ->  LOG  ->  PLAN  ->  PC  ->  INFO  -> (back to PRE-DIVE)
   MOdE : AIR | EAN | bottom timer            (press to scroll, press-and-hold to select)
          EAN -> O2 % (21..99) + ppO2max (1.2..1.6) shown with MOD -> bACk  (press at bACk instead of hold -> G2 OFF/On -> G2 O2%/ppO2)
   SEt  : SEt dIVE -> LGHt | P FCt | ALt | WAtR | UN:tS | FASt | ALRM | ErASE | bACk
          SEt tIME -> 24h/ampm, hour, minutes, date
          bACk
   LOG  : summary page (max depth ever, total dives, total hours, coldest temp) -> dive list (3 pages per dive) ; a bACk page every 5 logs
   PLAN : scrolls no-deco times vs depth (enabled only in AIR or EAN mode)
   PC   : "PC rEAdy"
   INFO : software/hardware version, serial number, battery level 1..3
```
* `MOdE`: "AIR is the equivalent of setting EAN to 21% and a ppO2max of 1.4bar, but simplifies the display a bit by not showing the CNS" [PP p.6][PP]. "The maximum possible value for the ppO2max is 1.6bar" [PP p.6][PP]; ppO2max adjustable 1.2–1.6, factory 1.4 [PP p.9][PP]. Two gases G1/G2 "in ascending order of oxygen content" [PP p.11][PP].
* `SEt dIVE` items (verbatim descriptions) [PP p.7][PP]:
  * `LGHt` — backlight duration 1–10 s or on.
  * `P FCt` — "choose between the standard algorithm (P0) and an increasingly more conservative one (P1, P2)". "On the pre-dive, post-dive, logbook and planner displays, P1 is displayed with p+, P2 with p++ and P0 is indicated by the absence of symbols." "The choice of p factor will be reflected in the dive planner."
  * `ALt` — altitude mode A0–A3 (ranges in A.5); "A1 through A3 are indicated with the mountain symbol filled with 1, 2 or 3 segments while A0 is indicated by the absence of symbols."
  * `WAtR` — `FrESh` / `SALt` water calibration ("error in depth measurement of approx 3%"); pre-dive shows "a small S or F to the left of the middle row" [PP p.6][PP].
  * `UN:tS` — metric (m, °C) / imperial (ft, °F).
  * `FASt` — "allows you to turn off the dive violation due to uncontrolled ascent. This is for dive instructors only".
  * `ALRM` — "turn on or off all audible alarms".
  * `ErASE` — reset desaturation; "security code is 1234" [PP p.8][PP].
* **Not present on the Puck Pro** (per the manual): a deep-stop on/off, a safety-stop on/off, a seconds display, a depth alarm. The Quad adds `SECOndS`, `DEEp` (deep stops on/off), `tEMp`, `ASC 5`, `R-AWAy dECO` [QD p.7][QD]; the Smart adds a `SET DIVE/DEEP` toggle [SM p.12][SM]. **UNVERIFIED** whether later Puck Pro firmware gained a `DEEP` toggle.
* `SEt tIME`: "Press and hold the button and 24h or ampm will start to blink. Press the button to switch between the two and/or press and hold the button to confirm and move on to set the hour, the minutes and the date." [PP p.8][PP]
* Logbook: ≈35 h of profile at 5-s sampling; each dive has three pages: max & average depth (top), start time / max ascent rate / repetitive counter (middle), date + O2% (page 1), dive time + min. temperature (page 2), surface interval + CNS at end (page 3) [PP p.8][PP].
* Planner: "scroll through the no decompression limits, automatically taking into account the current residual saturation… If Nitrox mode is selected, the maximum depth shown in the planner is limited by the MOD" [PP p.8][PP]. The Quad planner steps "in 3m / 10ft increments (limited to the MOD of G1)" and can add a surface interval and simulate deco [QD p.9–10][QD]; the original Puck planner "increases the depth shown by three meters each time, up to a maximum of 48 m (157 ft)" [PK][PK].
* Pre-dive display: "shows p factor and altitude settings, time of day, surface interval since the last dive and temperature. If Nitrox is set, it will show the O2 percentage and the corresponding MOD" [PP p.6][PP]; depth field shows `---` on the surface [PP p.5, p.10][PP].

## A.2 Segment-LCD layout (Puck Pro)

Round mineral-glass display, 38 mm diagonal [PP p.12][PP]. Three horizontal zones plus a 10-segment nitrogen bar graph along the bottom edge [PP p.10][PP] (confirmed on the manual's display drawings, p.5/p.9/p.10/p.11).

Fixed labels/icons that exist on the glass (read off the manual's drawings and glossary [PP p.3, p.5, p.9–11][PP]): `depth` (top-left), `m`/`ft`, `max` / `avg` (top-right small field, also used for `MOD` while switching gas), `m/min` ascent-speed field at the far left of the middle row, `no deco`, `deco`, `DEEP`, `SAFE`, `asc`, `bottom timer`, `dive time`, `°c`/`°f`, `O2 %`, `CNS%`, `DESAT`, `no fly` + airplane glyph, `s.i.`, battery symbol, `fast` box icon (uncontrolled-ascent violation), diver-with-arrow icon (deco-stop violation), down-triangle / double-triangle (deco-stop position), mountain icon with 1–3 segments (A1–A3), `p+`/`p++` (P1/P2), small `S`/`F` (salt/fresh), `MOD` text, `G2`, `bACk`.

### A.2.1 NDL mode (values from the manual's drawing: 25.8 m, max 33.2 m, 12 min NDL, 24 min, 19 °C) [PP p.5, p.10][PP]
```
             .---------------------------------.
            /   depth                    max     \
           |   25.8 m                 33.2 m      |
           |-------------------------------------|
           |  --  m/min            no deco       |      <- left: ascent/descent speed (only while depth changes >80 cm)
           |                        12 :         |      <- "no deco" minutes
           |-------------------------------------|
           |  dive time  24 :            19 °c   |
           |   ▮▮▮▮▮▯▯▯▯▯   (nitrogen bar, 10 seg) |
            \___________________________________/
                         [ ● ]  single button
```
Button-press cycle in dive mode (each press, 4-s timeout for the time of day) [PP p.5, p.10][PP]: max depth → **avg** depth (top-right) → O2% in lieu of temperature (Nitrox only) → CNS% in lieu of O2% (Nitrox only) → time of day in lieu of dive time (4 s) → empty field next to depth → back to max.

### A.2.2 Deco mode (drawing: 6.4 m, max 38.9 m, stop 6 m for 2 min, ASC 7, 41 min, 25 °C; all 10 bar segments black) [PP p.10][PP]
```
           |   depth  6.4 m          max 38.9 m  |
           |-------------------------------------|
           |  --  m/min   deco                   |
           |              6 m    2 :    asc  7   |      <- deepest stop depth | stop minutes | total ascent time
           |-------------------------------------|
           |  dive time  41 :            25 °c   |
           |   ▮▮▮▮▮▮▮▮▮▮                        |
```
When a deep stop is the first stop of a deco dive the middle row reads `DEEP deco  16 m  2:  asc 9` (drawing: 33.6 m / max 38.9 / 21 min / 23 °C) [PP p.10][PP]. "For DECO stops, since the duration is a function of the exact depth, only the minutes are shown." [PP p.10][PP]. During a decompression stop two position symbols may appear: double triangle = "optimal range for the decompression stop"; down triangle = "above decompression stop depth, descend immediately!" [PP p.10][PP].

### A.2.3 Safety-stop mode (drawing: 4.3 m, max 38.9 m, `SAFE 2:48`, 51 min, 23 °C) [PP p.10][PP]
```
           |   depth  4.3 m          max 38.9 m  |
           |-------------------------------------|
           |              SAFE                   |
           |              2:48                   |      <- 3-min countdown, min:sec
           |-------------------------------------|
           |  dive time  51 :            23 °c   |
           |   ▮▮▮▮▮▮▯▯▯▯                        |
```

### A.2.4 Deep-stop countdown (drawing: 16.3 m, max 38.9, `16 DEEP deco 1:57`, 37 min, 23 °C) [PP p.10][PP]
```
           |   depth 16.3 m          max 38.9 m  |
           |-------------------------------------|
           |   16        DEEP deco               |      <- deep-stop depth (left) + label
           |              1:57                   |      <- countdown, min:sec
           |-------------------------------------|
           |  dive time  37 :            23 °c   |
```

### A.2.5 Ascent-rate alarm (drawing: 33.6 m, speed `11 m/min` blinking with the ascent icon) [PP p.9][PP]
```
           |   depth 33.6 m          max 38.9 m  |
           |-------------------------------------|
           | ✱11✱ m/min            no deco       |      <- speed value blinks + ascent icon; audible alarm
           |                        2 :          |
           |-------------------------------------|
           |  dive time  12 :            24 °c   |
```
Uncontrolled ascent recorded: steady `fast` box icon at the left of the middle row (drawing: 30.4 m, speed 13 m/min, no deco 5) [PP p.9][PP].

### A.2.6 Violation-induced bottom-timer dive (drawing: 30.4 m, max 38.9, `bottom timer` + diver icon, `13:35`, 13 min, 24 °C) [PP p.9–10][PP]
```
           |   depth 30.4 m          max 38.9 m  |
           |-------------------------------------|
           |   bottom timer   [diver-icon]       |
           |             13:35                   |      <- stopwatch; no deco info at all
           |-------------------------------------|
           |  dive time  13 :            24 °c   |
```

### A.2.7 Post-dive / surface-interval screen (drawing) [PP p.11][PP]
```
           |   11 DESAT            ✈ no fly 23   |      <- desaturation h, no-fly h
           |-------------------------------------|
           |  S          11:45                   |      <- time of day (S/F = salt/fresh)
           |-------------------------------------|
           |  s.i. 1:18                 32 %     |      <- surface interval h:min ; O2% (Nitrox) or temperature (Air)
           |   ▮▮▮▯▯▯▯▯▯▯                        |      <- bar graph empties during the interval
```
Post-dive and pre-dive alternate "additional info" pages; post-dive is shown "only when desat and no fly > 0" [PP p.5][PP]. "In case of a dive violation, the corresponding symbol ( fast , diver-icon ) is shown." [PP p.11][PP].

### A.2.8 Nitrogen bar graph
"The nitrogen bar graph is at the bottom of the display. It represents nitrogen saturation in the leading tissue compartment. The bar graph is made of ten segments, which gradually fill during the dive… As you enter a situation of mandatory decompression stop, all segments will be black. During a surface interval, the segments will gradually turn off as Puck Pro tracks the offgassing of your tissues." [PP p.10][PP] (Smart: six segments [SM p.12][SM]; Quad: ten segments on the left side [QD p.12][QD].)

## A.3 Dive behaviours (Puck Pro)

* **Dive start / timing**: "ensures that Puck Pro starts to monitor the dive as soon as a depth of 1.2m/4ft is reached. If you start the dive without putting Puck Pro into pre-dive mode, it will start to monitor the dive automatically but with a delay of up to 20 seconds" [PP p.6][PP]. "At a depth shallower than 1.2m/4ft, the display shows ---." Depth resolution 0.1 m to 99.9 m, then 1 m; feet always 1 ft; max 150 m [PP p.10][PP]. Dive time in minutes; surface excursions <3 min are counted into the dive [PP p.10][PP]. Max displayed dive time 99 min (999 in bottom-timer mode) [PP p.12][PP].
* **NDL**: "calculated in real time and updated continuously. Maximum displayed no deco time is 99 minutes. If you remain at depth beyond a no deco time of zero minutes, you will enter into decompression… Puck Pro displays a MANDATORY decompression stop. Instead of a no deco time, it shows you the depth and duration of the deepest stop and the total ascent time (ASC), which includes each decompression stop and the time required to travel the vertical distance to the surface at a rate of 10m/min / 33ft/min. ASC includes the duration of deep stops as well." [PP p.10][PP] (NB: the Quad manual says the opposite: "ASC does not include the duration of deep stops" [QD p.12][QD].)
* **Deco stops**: "generated progressively as you stay down beyond the no deco time. DECO stops are MANDATORY." [PP p.10][PP]. Stop depths observed in the drawings are multiples of 3 m (6 m, 16 m deep stop). Divernet observed that Mares shows the time required at a 3-m last stop and makes you stay longer if you hold 6 m instead ("Mares minutes") [DN].
* **Missed deco stop alarm**: "If you ascend above the decompression stop depth by more than 0.3m (1ft), a downward pointing triangle appears, an audible alarm goes off and both the current depth and the depth of the deco stop start blinking. This alarm remains active until you return to the correct depth." "When the missed deco stop alarm is triggered, desaturation of the simulated tissue compartments is halted and resumes only when the diver returns to the correct stop depth." [PP p.9–10][PP]
* **Missed deco stop mode (lock-out)**: "If the stop depth is exceeded by more than 1m (3ft) for more than three minutes, Puck Pro considers it a dive violation and the display will show [diver icon]. In this case, if the diver attempts a repetitive dive after surfacing, Puck Pro will function only as a depth gauge and timer (bottom timer mode), and it will display [diver icon] on the screen." [PP p.10][PP]. "In case of a violation, Puck Pro will restrict the use of air and Nitrox mode for 24 hours, and will only allow operation in bottom timer mode." [PP p.12][PP]. There is no "ASC arrow"; the only up-arrow for "you are too deep" existed on the original Puck ("Upward triangle: diver below decompression stop depth, ascend!") [PK][PK] — **UNVERIFIED for Puck Pro**.
* **Safety stop**: "A SAFETY stop is generated as soon as the depth of the dive exceeds 10m / 33ft. It has a duration of 3 minutes and it is carried out between depths of 6m / 20ft and 3m / 10ft at the end of a dive prior to surfacing. Such stop is NOT mandatory but HIGHLY RECOMMENDED." "Upon reaching the optimum range for carrying out a deep stop (+/- 1m /3ft of the displayed depth) or safety stop (between 6m/20ft and 3m/10ft), a countdown timer appears to indicate the progress of the stop." [PP p.10][PP]. Shown as `SAFE` with a min:sec countdown (drawing `2:48`) [PP p.10][PP]. **What happens if you leave the window is not stated in the Puck Pro manual.** The original Puck manual (same RGBM family) says: "If the diver moves outside the depth range mentioned above, the safety stop timer is halted. When the diver re-enters the correct depth range, the safety stop timer resumes from where it left off. If the diver returns to a depth below 10 m (33 ft), the 'Safety Stop' timer will ignore the previously aborted stop and will start over from zero. In the case of a decompression-stop dive, the safety stop extends the duration of the decompression stop at 3 m (10 ft) by an additional 3 minutes" [PK][PK] — treat as **UNVERIFIED for Puck Pro** but the best available model. The newer Puck Pro Ultra says "A safety stop is always shown as a 3-minute countdown in minutes and seconds" [PU p.11][PU].
* **Deep stops**: "DEEP stops are generated as you approach the no deco limit. You can either have one 2-minute stop or two 1-minute stops. DEEP stops are NOT mandatory. Deep stops are indicated to the left of the no deco time or as first (deepest) stop of a deco dive." [PP p.10][PP]. The depth rule is **not published**; the original Puck manual: "a series of one-minute deep stops at different depths depending on the dive profile"; FAQ: "The DEEP STOP only appears for decompression dives or dives close to the deco limit"; "If you surpass the DEEP STOP by more than a meter (3 ft), the stop is canceled"; "If you begin the DEEP STOP and then descend, the countdown stops. It resumes when you return to the DEEP STOP depth." [PK][PK]. Divernet's test found Mares units place the deep stop "a little shallower than half maximum depth, depending on the profile" [DN]. "Half of max depth" is therefore only an approximation — **UNVERIFIED**.
* **Ascent rate**: "As soon as depth decreases Puck Pro activates the ascent rate control algorithm and displays the calculated value. This is shown to the very left in the middle row of the display." "If Puck Pro determines an ascent rate of 10m/min / 30ft/min or higher, the fast ascent alarm is triggered: an audible alarm goes off, the [icon] appears on the display and the speed value blinks. This persists until the ascent rate is reduced to 10m/min / 30ft/min or less. If the ascent rate exceeds 12m/min / 40ft/min at a depth below 12m / 40ft, the [fast] blinks as well. If a speed in excess of 12m/min / 40ft/min is maintained for two thirds or more of the depth at which the alarm was first triggered, Puck Pro considers it a dive violation and the display will show the steady [fast] symbol." [PP p.9][PP]. "Ascent/descent rate: in presence of a depth change in excess of 80cm / 3ft, Puck Pro calculates the corresponding ascent or descent speed and displays it… for the duration of the ascent or descent." [PP p.10][PP]. There is **no segment bar and no SLOW text on the Puck Pro**; the Quad displays the speed "in lieu of the dive time" and shows `SLOW` blinking [QD p.10, p.12][QD]; the original Puck showed a bar plus the word "Slow" [PK][PK].
* **Fast-ascent (uncontrolled ascent) consequence**: "A fast (uncontrolled) ascent is defined as one in which a speed of 12 m/min / 40ft/min or higher was maintained over more than two thirds of the way up. This applies to dives deeper than 12m/40ft only. In such an event, due to the potential of harmful bubble formation, Puck Pro locks the computer for 24 hours in order to discourage you from diving again. In this menu [FASt], you have the option to disable the locking up of the computer" [PP p.7][PP].
* **Surfacing / post-dive**: "Upon returning to the surface, Puck Pro first goes into the so-called surfacing mode… The screen shows a 3-minute countdown. If you submerge again before the 3-minute countdown is over, the dive time will resume… If you do not submerge before the end of the countdown, Puck Pro considers the dive finished, records the data to the logbook and reverts to the so-called post-dive mode." Post-dive shows DESAT, NO FLY, S.I. (from the moment the dive is closed, i.e. 3 min after surfacing), violation symbols and the bar graph [PP p.10–11][PP].
* **No-fly / desat**: "Puck Pro employs, as recommended by NOAA, DAN and other agencies, a standard 12-hour (no-deco non-repetitive dives) or 24-hour (deco and/or repetitive dives) countdown. Hence you may find a situation in which the desaturation time is shorter than the no-fly time." [PP p.11][PP]. The Smart manual adds: "if the DESAT TIME is longer than the NOFLY TIME, Smart automatically sets the NO-FLY TIME to be equal to the DESAT TIME" [SM p.12][SM] — likely the same in Puck Pro (UNVERIFIED).
* **MOD / ppO2 alarm**: "an audible alarm goes off, the current depth starts to blink and the value of the MOD is shown to the right of the current depth" (drawing: `34.1` blinking, `32.4` MOD) [PP p.9][PP].
* **CNS**: warning at 75 % (alarm, CNS blinks and becomes default lower-right item, returns after 8 s); at 100 % "alarm message and the audible signal are repeated for 5 seconds in one-minute intervals" [PP p.9][PP].
* **Low battery**: steady symbol = few more dives; blinking = "too weak for diving… backlight is disabled and audible alarms are muted" [PP p.4, p.10][PP].
* **Bottom timer mode**: only depth/time/temp/stopwatch; "You can only switch to bottom timer mode if the computer is completely desaturated"; "after a dive in bottom timer mode you must wait at least 24 hours before diving using a decompression computer" [PP p.12][PP].

## A.4 Alarms (Puck Pro)
"There are five different alarms: Ascent rate alarm; Exceeding a safe ppO2/MOD; CNS = 100%; Missed decompression stop; Low battery during the dive." "When in bottom timer mode, all warnings and all alarms are OFF aside for the low battery alarm." "Alarms are both visual and audible… Ascent rate alarm has priority over other alarms if they are triggered simultaneously." [PP p.9][PP]. Audible alarms can be switched off in `ALRM` [PP p.7][PP]. Visuals per alarm: see A.3.

"Fast ascent penalty" on the *next* dive: the Puck Pro manual documents only the 24-h lock (A.3). An NDL reduction on subsequent dives after fast ascents / reverse profiles is a general property of Wienke's RGBM reduction factors (reverse profiles, repetitive dives, multi-day) [Wienke] and Mares advertises deep stops as "one of the special characteristics of the RGBM Mares-Wienke Algorithm" [PK][PK]; **Mares does not publish the penalty magnitudes — UNVERIFIED**. (Cressi, by contrast, states the penalty explicitly: see B.3.)

## A.5 NDL table, personal setting, altitude (Puck Pro)
* **No NDL table is printed in the Puck Pro manual** (nor in the Quad, Quad Air, Smart or original Puck manuals — checked). The only official source of NDLs is the on-device planner, which already folds in P-factor, altitude, water type and residual nitrogen [PP p.8][PP]. No reliable third-party table of Puck Pro P0 values was found (searched; forum threads give only qualitative statements) [SBmares].
* P-factor effect: only qualitative — "standard algorithm (P0), a more conservative version (P2) or an intermediate one (P1)… reflected in the dive planner" [PP p.7][PP].
* Altitude ranges (verbatim) [PP p.7][PP]:
  * "A0: from sea level to approximately 700m/2300ft;"
  * "A1: from approximately 700m/2300ft to approximately 1500m/4900ft;"
  * "A2: from approximately 1500m/4900ft to approximately 2400m/7900ft;"
  * "A3: from approximately 2400m/7900ft to approximately 3700m/12100ft;"
  * "We do not recommend diving at altitudes above 3700m / 12100ft. If you do, set Puck Pro to bottom timer and find appropriate altitude dive tables."
* Technical information (verbatim extracts) [PP p.12][PP]: "Operating altitude: with decompression – sea level to approximately 3700m/12100ft; without decompression (gauge mode) – at any altitude. Decompression model: RGBM Mares-Wienke (10 tissues). Max displayed depth: 150m/492ft. Resolution: 0.1m until 99.9m and 1m at depth deeper than 100m… Accuracy from 0 to 80m/262ft: 1% ±0.2m/1ft. Temperature… resolution 1 °C / 1 °F, accuracy ± 2 °C. Clock: quartz clock, time, date, dive time display up to 99 minutes (999 minutes in bottom timer mode). Oxygen concentration: adjustable between 21% and 99%, ppO2 max range between 1.2 and 1.6 bar. Logbook memory: 35 hours of dive profile at 5-second sampling rate. Display: Diagonal 38 mm. Power supply: CR2450 user-replaceable battery; battery life: 200-300 dives" (p.4 of the same manual says "approx 300-500 dives" — internal inconsistency).

## A.6 Mares Quad / Quad Air (comparison)
* **Buttons**: "Quad has 4 buttons, labelled UP, DOWN, ESC and ENTER. On the surface, ENTER allows you to enter a menu and confirm a setting, ESC exits a menu and goes up one level, UP and DOWN increase/decrease the value of a setting or move to the next item in a list. During the dive, there is no distinction between left side and right side buttons, so that both upper buttons become the UP button and both lower buttons become the DOWN button. This is called Specular Button Arrangement… The UP button modifies the top row (depth information) whereas the DOWN button modifies the lower right corner of the display. Press and hold the UP button to activate the backlight." [QD p.4][QD]. Surface-mode menu: POST-DIVE → PRE-DIVE → MODE (AIR / EAN / BOTTOM TIMER) → SETTINGS (SET DIVE / SET TIME) → LOGBOOK → PLANNER → PC → INFO, navigated with UP/DOWN, entered with ENTER, left with ESC [QD p.5–6][QD]. Pre-dive auto-off after 3 min (Puck Pro: 10 min) [QD p.6][QD].
* **Display** (70 mm diagonal, rectangular) [QD p.15][QD]: nitrogen bar graph is a vertical 10-segment column on the **left** edge; top row = current depth (large) + `MAX`/`AVG`/`MOD`/`DEEP` field at top-right; middle row = `NO DECO` minutes, or `DECO` stop depth + stop minutes + `ASC`; bottom row = `DTIME` dive time (left) + temperature / O2% / CNS / ppO2 / ASC+5 / time of day (right, lower-button cycle) [QD p.12][QD]. Safety stop shows `SAFE 2:48` in the middle row; deep stop shows `DEEP 22 m` blinking top-right with a countdown [QD p.12][QD]. Ascent speed replaces the dive time; `SLOW` blinks [QD p.10, p.12][QD].
```
   QUAD (rectangular)        .------------------------------------------.
                             | ▮ |  17.9 m                 MAX  36.5 m   |
                             | ▮ |----------------------------------------|
                             | ▮ |            NO DECO  38 :               |
                             | ▯ |----------------------------------------|
                             | ▯ |  DTIME 20 :                    23 °C   |
                             '------------------------------------------'
   deco:  |  6 m  DECO  1 :   ASC 13  |   safety: |  SAFE  2:48  |   deep: top-right  DEEP 22 m (blinking) + countdown
```
* Extra features vs Puck Pro: `SECOndS` (dive time with seconds), `DEEp` (deep stops on/off), `tEMp` / `ASC 5` position options, `R-AWAy dECO` runaway-deco alarm (OFF/10/15/20 min — "ASC+5… the total ascent time if you were to remain at the current depth for an additional 5 minutes") [QD p.7, p.9, p.13][QD]; three gases G1–G3 [QD p.13][QD]; water options SALT (1.025 kg/l) / FRESH (1.000) / EN13319 (1.0197) [QD p.7][QD]; planner with added surface interval and deco simulation [QD p.9–10][QD]. Same alarms, same 24-h violation lock, same 12/24-h no-fly, "RGBM Mares-Wienke (10 tissues)" [QD p.10–15][QD].
* **Quad Air** = Quad plus optional wireless tank module: "Gas integration: The feature in Quad Air to include tank pressure information in its calculations and to display it on the computer screen"; `GAS INTEGR` setting; pairing; low-tank-pressure alarm [QA p.2–3][QA].
* Manual URLs: Quad [QD] (linked from [QDpage]); Quad Air [QA] (linked from [QApage]).

---

# PART B — CRESSI LEONARDO

## B.0 Two UI generations — important for the simulator
1. **Original Leonardo firmware** (manual "Direction for use — Computer Leonardo", 84 pp.) [LE]: single button, "press" / "press and hold", automatic return with a beep; menu ring `LOG-xx, DIVE-S, TIME-S, PLAN, GAGE, PCLINK, HIST., SYSTEM` + `PRE DIVE`; FO2 21–50 %. This is the firmware most rental Leonardos (2012–c.2018) run. **Treated as primary below.**
2. **Newer firmware** (Cressi's current "Leonardo Quick Guide" [LQ] and the "Leonardo 2.0" manual Rev. 01/2023 [L2]): same hardware family but Short / Long(1 s) / Long(3 s) button semantics, `MODE-S` (AIR/EAN/GAGE), a `DEPTH` alarm, `AL.SP` ascent-alarm mute, `T.ERASE`, Bluetooth `PC`, `SAFE` min:sec safety-stop countdown. Differences are called out as "(2.0)".

## B.1 Physical / UI (original firmware)
* "Leonardo's screen different modes change by repeatedly depressing the button which is the key to operating the system… The same button enables to access the sub-menus and to switch on back-lighting (on sea surface in PRE-DIVE mode only)." [LE p.13][LE]. "To access the menu of these screens (except history and pclink) press and hold the button. Pressing and releasing the button, it is possible to browse the data of the menus. The computer automatically returns to the first screen of the menu." [LE p.14][LE]. Settings are stored by waiting: "Once the desired setting is reached… wait for a few seconds. The computer automatically changes the settings, issuing a sound signal and then returns to the main screen." [LE p.17][LE] (flow diagrams: "WAIT FOR 3 SECONDS → AUTOMATIC RETURN" [LE p.20, 24–26][LE]).
* **PRE DIVE** main screen shows: max PO2, mixture type/percentage (Air / Nitrox), max reachable depth for the set parameters, SF 0/1/2, altitude level, GAGE (if set), battery level, current time [LE p.13][LE].
* **Main menu, 9 screens** [LE p.13–15][LE]: `LOG-00` (logbook; number = dive count), `DIVE-S` (dive set), `TIME-S`, `PLAN`, `GAGE`, `PCLINK`, `HISTORY` (`HIST.`), `SYSTEM`, `PRE DIVE` (main screen, with clock icon).
* **DIVE SET** parameters [LE p.16][LE], in this order: PO2 → FO2 → SF → Deep Stop → Altitude.
  * PO2: factory 1.4 bar "for both air dives and Nitrox dives"; settable 1.2–1.6 bar in 0.1 steps (lower = safer) [LE p.16–17][LE].
  * FO2 ("NITROX - PERCENTAGE OF THE OXYGEN"): "values between 21% and 50% with steps of 1% of O2"; "factory set on the DIVE AIR program, with the Nitrox mixture set to Fo2 at 21%"; "FO2 values different from Air 21% activate the computation program Dive Nitrox" [LE p.18, p.36][LE]. Can be changed during the surface interval "but only after 2 minutes from the start of the interval" [LE p.21][LE].
  * SF: "three values: SF0/SF1/SF2. The factory setting is SF0, i.e. disabled." [LE p.22][LE].
  * DEEP STOP: "Leonardo is factory set on DEEP STOP"; `Deepst ON/OFF`; "the arrow icon on the bottom right disappears" when OFF [LE p.22][LE].
  * ALTITUDE (verbatim) [LE p.23][LE]: "ALT. 0 (no mountain) - da 0 a 700 m / ALT. 1 (1 mountain) - da 700 a 1500 m / ALT. 2 (2 mountains) - da 1500 a 2400 m / ALT. 3 (3 mountains) - da 2400 a 3700 m".
* **PLAN**: "safety curve (no decompression times) related to the different depths between 30 ft. and 157 ft, with manual steps of 10 ft." (metric manuals: 9–48 m in 3 m steps [GI p.10][GI][L2 p.16][L2]); "switched off if the computer shows Error" and in GAGE [LE p.27, p.61][LE].
* **GAGE**: ON/OFF; depth 0–393 ft (120 m); "after a dive with Leonardo set in Gage mode… the instrument will not make saturation and de-saturation computations during the subsequent 48 hours" [LE p.8, p.28–29][LE].
* **TIME SET**: year → month → day → 12/24 h [LE p.31][LE]. **SYSTEM**: `s.unit` °C/m or °F/ft; `S.RESET_NO/YES` → `SURE?_NO/YES` → "DONE!" (desaturation reset; logbook/history kept) [LE p.31–32, p.70][LE].
* **Backlight**: press-and-hold (surface: PRE-DIVE only; dive: any time); "lasts for a few seconds" [LE p.13, p.56][LE]. (2.0: 5 s [L2 p.7][L2].)
* **Logbook**: last 60 dives / 70 h, 20-s sampling; two screens per dive; DECO/NITROX/PO2/SLOW alarm icons stored [LE p.61–62][LE]. **HISTORY**: total hours, max depth, total dives (to 999) [LE p.65][LE].
* **Battery**: CR2430; "If the screen displays the battery icon with a single segment on, the computer MUST NOT BE USED" [LE p.16][LE].

### (2.0) button semantics and menu [L2 p.7, p.9][L2][LQ p.3, p.6–9][LQ]
`Short` = "NEXT (ONE STEP)"; `Long (1 Sec.)` = "ENTER \ ESC"; `Long (3 Sec.)` = "RETURN". Pressed long in pre-dive/time/dive it lights the display for 5 s. Menu ring: `PREDIVE → TIME (ORA/DATA) → MODE-S (AIR | EAN | GAGE) → LOG → DIVE-S → TIME-S → PLAN → PC → SYSTEM`. DIVE-S (2.0): `DEEP STOP ON/OFF, SF 0/1/2, ALT 0/1/2/3, DEPTH alarm OFF or 50–10 m (164–30 ft) in 2-m steps, %O2 21–50 % GAS 1, PPO2 1.2–1.6` (quick guide also lists an optional GAS 2 21–99 %) [LQ p.7][LQ][L2 p.13–14][L2]. PLAN (2.0) first asks for a simulated surface interval: "00:10, 00:20, 00:30, 00:45, 01:00, 01:30, 02:00, 03:00, 04:00, 05:00, 06:00, 12:00, 24:00" [L2 p.16][L2]. SYSTEM (2.0): `UNITS, HIST, INFO (Sn, firmware, battery-change counter), AL.SP (fast-ascent sound alarm ON/OFF — "over 12m/min", crossed-out speaker icon shown all dive), T.ERASE (tissue erase, hold 5 s)` [L2 p.17–18][L2][LQ p.9][LQ]. Auto-off after 10 min of surface inactivity [L2 p.8][L2].

## B.2 Segment-LCD layout (Leonardo)

Shape: a "D"-shaped (flat-top dome) LCD with Cressi's "PCD System (Priority Compartment Digit Display)" [LE p.10][LE]. Three rows. The complete segment map (quick-guide "display" page [LQ p.5][LQ]) contains: top row `SURF.T | MAX | DIVE.T | DESAT` labels over two 4-digit groups with `%`, `min`, `FT m`, `GAS123`, `NITROX`; a **stage indicator** (deco/stop icon) at top-left; `DECO`, `DEEP`, `STOP` labels; the `O2` toxicity bar (5 wedge segments) with `PO2` violation icon; middle row `MAXDEPTH FT m` big depth (3 digits) + a central column holding the **high-speed-ascent** indicator (three stacked triangles + `SLOW`), `S U R F` vertical text, `Bar/PSI`; right field `min NO DECO` 2 digits with `P/AM`, speaker-off icon (ascent alarm muted), `GAGE`, `SF12`, `FREE`, `TOTAL`, `DIVE`; bottom row 6 digits (temperature / clock / log number) with battery icon, `NO FLY`, the Bluetooth-style icon, and the altitude mountains (1–3).

Icons the original manual names: `DECO`, `STOP`, `DEEP STOP`, `NO DECO`, `TOTAL`, `DIVE.T`, `MAX`, `SURF.T`, `DESAT`, `NO FLY`, `NITROX`, `O2` bar, `PO2`, `SLOW`, arrows, `GAGE`, `SF`, altitude icons, battery, clock icon [LE p.36–62][LE]. There is **no nitrogen-loading bar graph** on any Leonardo screen (the dive-screen item list is depth, no-deco, max, dive time, ascent indicator, altitude, temperature [LE p.36][LE]; the segment map has only the O2 bar [LQ p.5][LQ]).

### B.2.1 NDL mode, original firmware (im. 14: max 20.3 m, 9 min, 15.1 m, NO DECO 19, 15 °C) [LE p.39][LE]
```
              .-----------------------------------.
             /   MAX          |  DIVE.T             \
            |   20.3 m        |   9 min              |
            |  DEPTH     m    ▲     NO DECO   min    |
            |  15.1          ▲▲       19             |     <- central column: 0–3 ascent arrows (+SLOW)
            |                 ▬                       |     <- battery icon under the arrows
            |  15°C                        (▲▲ alt)   |
             \_____________________________________/
                      [ ● ]  single button (bottom edge)
```
Press once during the dive → alternate page: `PO2 1.4 | Air %` (top), `MAX DEPTH 54.2 m | SF0` (middle); auto-return [LE p.37, p.39][LE]. Nitrox dive adds `NITROX` + `O2` 5-segment bar under the top-right field [LE p.40][LE].

### B.2.2 Deco mode, original firmware (im. 22: stop 3 m / 4 min, DIVE.T 25, depth 33.2 m, TOTAL 12 min, 15 °C) [LE p.53][LE]
```
            |  ⊗  3 m   4 min   |  DIVE.T  25 min      |     <- stage icon, first (deepest) stop depth + stop minutes
            |  DECO             |                      |     <- "DECO" label; UP-arrow in the icon flashes
            |  DEPTH          ▲        12   min        |
            |  33.2         (arrows)    TOTAL          |     <- TOTAL = total ascent time
            |  15°C                                    |
```
Omitted-deco variants (im. 23): depth `1.2 m` with the stage icon flashing ("Deco depth not respected: lower depth") and depth `11.2 m` ("upper depth"); afterwards PRE DIVE shows `DECO` + `STOP` + stage icon flashing, and the LOG BOOK entry shows `DECO STOP` flashing [LE p.54][LE].

### B.2.3 Safety-stop mode, original firmware (im. 19: `3 m 3 min STOP`, DIVE.T 11, depth 8.2 m, NO DECO 23, 15 °C) [LE p.48][LE]
```
            |  ⊗  3 m   3 min   |  DIVE.T  11 min      |     <- stop depth 3 m and remaining minutes
            |           STOP    |                      |
            |  DEPTH          ▲        NO DECO  23     |
            |   8.2           ▬                        |
            |  15°C                                    |
```
Pressing the button during the stop shows the max depth (`MAX 39.0 m`) [LE p.46, p.48][LE].

### B.2.4 Deep stop (im. 21: `12 m 2 min DEEP STOP`, DIVE.T 16, depth 18.3 m, NO DECO 9) and deco forewarning (im. 20: NO DECO `3`) [LE p.49][LE]
```
  DEEP STOP:  |  ⊗ 12 m  2 min | DIVE.T 16 |      FOREWARNING (NDL = 3 min, beep-beep):
              |  DEEP STOP     |           |      | MAX 20.3 | DIVE.T 9 |
              |  DEPTH 18.3  ▲   NO DECO 9 |      | DEPTH 15.1 ▲  NO DECO 3 |
```
### B.2.5 Ascent-rate alarm (im. 18: three flashing arrows + `SLOW`, "BEEP-BEEP", here during a deco dive at 33.2 m) [LE p.48][LE]
```
            |  ⊗ 12 m  2 min  DECO DEEP STOP | DIVE.T 25 |
            |  DEPTH        ▲▲▲ (flash)      12 min      |
            |  33.2         SLOW (flash)     TOTAL       |
```
Ascent-rate table (verbatim) [LE p.48][LE]: `NO SIGNAL 0.0-3.9 m/min | ▲ 4.0-7.9 m/min | ▲▲ 8.0-11.9 m/min | ▲▲▲ + BEEP-BEEP + SLOW 12.0 m/min`. 2.0 manual adds the imperial row: "0.0 - 12 ft./min. | 13 - 26 ft./min. | 26 - 39 ft./min. | 40 - > 40 ft./min." [L2 p.24][L2].

### B.2.6 Pre-dive and surface-interval screens (im. 1, im. 26) [LE p.15, p.63][LE]
```
  PRE DIVE (Air):                       SURFACE INTERVAL (after an air deco dive):
  |  PO2 1.4   | Air     %  |           |  SURF.T 7:26  |  DESAT 13:18   |
  |  MAX DEPTH 54.2 m | SF0 |           |  DECO                            |
  |  ◷ 14:25     ▬ (batt)   |           |  MAX 32.6 m  ▲▲▲SLOW   23 min DIVE.T |   <- alarm icons of the last dive stay lit
                                        |  ◷ 16:34             NO FLY ✈   |
```
### B.2.7 (2.0) layout differences [L2 p.20, p.22, p.27][L2][LQ p.11–13][LQ]
Top row `MAX | DIVE` (max depth, dive minutes); middle `DEPTH` + `O2 min NO DECO` 2 digits (becomes `TOTAL ASCENT TIME` in deco); bottom row `A.16` average depth + temperature `26°`; pre-dive shows `PO2 1.4 | AIR`, `56.6 m` (MOD) + `NO DECO 99` + the word `DIVE`; GAGE shows depth, minutes, seconds, `A.` average; post-dive shows `SURF.T 0:02 | DESAT 2:00`, `14.7 m`, `02 DIVE` and `23:58 NO FLY`. Safety stop = `SAFE` with min:sec countdown [L2 p.25][L2]; the ascent indicator is "a dot indicator located in the centre of the display" with `SLOW` [L2 p.24][L2].

## B.3 Dive behaviours (Leonardo, original firmware unless noted)

* **Start**: DIVE program "automatically starts… at a depth exceeding 3.93 ft" (1.2 m) [LE p.36][LE]; GAGE "automatically activates at depths below 4 ft" [LE p.55][LE]. (2.0: "activate the calculation of the dive parameters in a maximum time of 2 seconds as soon as the depth of 1.20 metres is reached. In case of forgetfulness, the computer will activate automatically but in a maximum time of 20 seconds" [L2 p.19][L2].)
* **End / surfacing**: surface-interval screen appears "when you reach depths above 4 ft" [LE p.59][LE] (2.0: "less than 0.8m" [L2 p.28][L2]). "Should a dive begin with less than 2 minutes of surface interval time, Leonardo will consider this a continuation of the previous dive; the dive's count and dive time computation will restart from where they had stopped. Dives carried out after at least 2 minutes of surface are considered as a new dive." [LE p.60][LE]. Depth sampled every second, logbook every 20 s [LE p.74][LE]; dive time 0–255 min [LE p.74][LE]; depth resolution 10 cm to 100 m, 1 m to 120 m, 1 ft to 316 ft [LE p.74][LE].
* **Ascent rate** [LE p.45][LE]: "shown on the display by an arrow indicator at the centre… If, during surfacing, the maximum allowed ascent rate is exceeded, the display will show three arrows… Additionally, the alarm will sound, the SLOW icon will flash, as well as the arrow indicator. In this situation, surfacing must be stopped until the SLOW icon disappears and the display returns to standard conditions." Thresholds per the table above (3 arrows / SLOW at 12.0 m/min). The `SLOW` icon is retained in the surface-interval screen and logbook as an alarm record [LE p.59, p.62][LE]. **Penalty (2.0 and Donatello manuals)**: "If the maximum ascent speed of 12m/min - 40ft/min is exceeded for a prolonged time, the LEONARDO computer will make the next dive more conservative, but only if done during the desat time… The icon indicates that the penalty factor is active." [L2 p.24][L2] (identical statement [DO p.28][DO]). Not stated in the original manual — **UNVERIFIED for original firmware**.
* **Safety stop** [LE p.45][LE]: "Leonardo is programmed to automatically signal a safety stop after each dive at a depth greater than 32 ft… A 3 minute stop should be carried out at a depth between 20 ft. - 10 ft. The stop is indicated by the display with the STOP icon; the display, in this condition, clearly indicates the duration in minutes of the stop and the depth in meters or feet. The safety stop is not mandatory, yet it is strongly recommended if, for instance, the maximum ascent rate is repeatedly exceeded." Metric manuals give the window as 5–3 m [GI p.14][GI][L2 p.25][L2]. **Behaviour when the diver leaves the window or surfaces early is not documented anywhere in the Cressi manuals — UNVERIFIED** (the computer only flags that the stop is "not mandatory"; no lock-out, no error). Cressi adds a warning that the last metres should take "no less than a minute" [LE p.46][LE].
* **Decompression forewarning**: "Every time the time available within decompression, shown on the display by the NO DECO icon, decreases to 3 minutes, [the computer] warns the diver by emitting a sound alarm." [LE p.46][LE] (Giotto/2.0: the remaining-minutes digits and `NO DECO` flash too [GI p.15][GI][L2 p.25][L2]).
* **Deep stop** [LE p.46–47][LE]: "able to suggest a DEEP STOP of 1 - 2 minutes (in case of dive with decompression) at variable depth depending on the dive profile. During the dive, if the profile requires it, DEEP STOP is displayed and an acoustic signal is issued. The stop icon with the depth and the time in minutes is displayed. If the diver omits it, the warnings will be deleted and the computer recalculates ascent planning without that stop." Depth rule not published — **UNVERIFIED**.
* **Deco** [LE p.50][LE]: "Upon violating the no decompression limits, the computer will issue a sound alarm, and the display changes… 1) Stop icon with the writing DECO… The arrow indicating UP flashes. 2) Depth of first decompression stage (the deepest), given in meters (m) or feet (ft.). It may vary from a maximum of 78 ft. to a minimum of 10 ft., by steps of 10 ft. [metric: 24 m to 3 m by 3 m, GI p.15] 3) Time in minutes for the first decompression stage (the deepest). 4) TOTAL icon, indicating the total ascent time, that is the time required to ascend to the deepest stage, respecting the ascent rate, PLUS the stop time at that depth and at any other subsequent stop (including the deep stop if necessary), PLUS the safety stop time, PLUS the time required to reach the surface after completing the decompression stages. 5) 'DIVE. T' icon." Cressi recommends staying slightly deeper than the stop; the 2.0 manual says the correct window is shown by "two icons (arrows) simultaneously lit and not flashing" [L2 p.26][L2].
* **Omitted decompression stage alarm / 48-h lock** [LE p.51–52][LE]: "If the decompression stage is missed by surfacing above the depth given by the computer, an alarm will sound and the down arrow of the decompression icon will flash on the display until the diver descends back to the proper depth or below it. In the opposite case, that is when the diver goes below under the stage depth by a specific amount [2.0: more than 1 m], an arrow flashes, indicating that it is necessary to go up. The computer allows a maximum time of 2 minutes to correct this dangerous situation; during this time, the alarm will keep sounding. In the event that the diver does not descend to the proper depth (after 2 minutes) Leonardo enters the ERROR PROGRAM. The 'STOP' icon flashes and the instrument won't be usable for the next 48 hours. The only functions working will be Logbook and History. Later, in the PRE DIVE screen the 'STOP' icon, the DECO writing and the stop icon with the up arrow flash. This means that the decompression stage has been omitted during the last dive. The LOG BOOK will store the same warning". The manual's own name is "ERROR PROGRAM" / "the computer shows Error"; **no literal `ER` text is documented — UNVERIFIED** (the visible signal is the flashing `STOP`). 2.0 adds: "If you return to the water in the next 48 hours, LEONARDO will sound repeatedly and the word STOP will appear on the display" [L2 p.27][L2]. Giotto: during the 48 h "The only function working will be the clock and it will be possible to access the Logbook and History" [GI p.15][GI].
* **Gauge after-effect**: 48 h without saturation computation after any GAGE dive [LE p.28, p.56, p.60][LE].
* **PO2 alarm**: at the limit depth for the set PO2 "a sound alarm will start while the Po2 icon will be flashing, indicating the current depth… the Po2 icon remains lit up during the residual part of the dive, in the LOG BOOK and in the PRE DIVE screen"; with PO2 1.4 the air MOD shown is 188 ft (56.6 m) [LE p.43][LE].
* **CNS**: 5-segment bar; near the limit "the graph starts flashing along with the Nitrox writing, and a temporary alarm starts sounding"; repeated until PO2 < 0.6 atm [LE p.40–41][LE] (2.0: warning at 4 of 5 segments [L2 p.23][L2]).
* **Depth alarm (2.0 only)**: "3 consecutive beeps will be heard and the depth value will start flashing until it returns below the set threshold" [L2 p.14][L2]. **No dive-time alarm exists in any Leonardo manual — UNVERIFIED/absent.**
* **Surface interval / no-fly / desat** [LE p.59–60][LE]: screen shows "1) Surface interval given in hours and minutes (SURF.T) 2) Desaturation time (DESAT)… 2) NO FLY icon… 3) Max depth reached in the latest dive. 4) Duration of the latest dive. 5) Alarms (if any) issued during dive (ascent rate, partial pressure of the oxygen) 6) Indication of the altitude 7) DECO indication 8) Nitrox indication and O2 toxicity bar". No-fly rule (verbatim): "12 hours after a single dive without decompression. 24 hours after a dive with decompression or after repetitive or multiday, if correctly performed. 48 hours after the use of the gage function or if severe mistakes in dive management occurred." (2.0 revises the last item to 24 hours [L2 p.28][L2].) In the newer firmware the PRE DIVE and DESAT screens alternate every two seconds while desat > 0 [LQ p.4][LQ].
* **Battery / reset caveats**: replacing the battery erases desaturation ("do not dive after battery replacement during a corresponding amount of hours") [LE p.71][LE]; reset wipes nitrogen memory ("wait for at least 48 hours after the last diving activity") [LE p.28][LE].

## B.4 Algorithm and NDL data (Leonardo)
* Naming (verbatim): "The Leonardo features a new Cressi RGBM agorithm, created in conjunction with the expertise of Bruce Wienke and based on the Haldane model, integrated with RGBM factors. This algorithm allows for safe decompression calculations for multiple dives spread out over multiple days. Tissues: 9 with saturation hemi-phases between 2.5 and 480 minutes" [LE p.4][LE]; specs page: "Algorithm: CRESSI RGBM algorithm." [LE p.74][LE]. It is **not** described as Bühlmann ZH-L16 in any Leonardo/Giotto/Donatello manual.
* **No NDL table is printed in the Leonardo, Leonardo 2.0, Giotto, Donatello or Newton manuals** (all checked). Cressi only refers to PLAN mode ("safety curve") and the on-screen 2-digit NO DECO field.
* Best available substitute — **UNVERIFIED, user-read from a Leonardo's display, not a Cressi publication** [SBtable] (poster "dmaziuk", 10 Jan 2019: "Clean Leo, on air, altitude 0. On its 2-digit NDL display 99 is 'no NDL'"), quoted verbatim:
```
Depth: SF0, 1, 2
9 : 99, 99, 99
12 : 99, 98, 83
15 : 68, 60, 54
18 : 49, 44, 40
21 : 37, 33, 30
24 : 28, 26, 22
27 : 21, 19, 17
30 : 17, 15, 13
33 : 14, 12, 11
36 : 11, 10, 9
39 : 9, 8, 7
42 : 7, 6, 6
45 : 6, 5, 5
48 : 5, 4, 4
- does not go deeper.
```
  No imperial version exists; the PLAN depth steps in the imperial manual are 30, 40 … 157 ft (10-ft steps) [LE p.27][LE] — unit conversion of the table above is not verbatim and is left to the implementer. The planner range (9–48 m) and the 99 cap match the official manuals [LE p.27][LE][LQ p.7][LQ].
* Technical specifications (verbatim extract) [LE p.74][LE]: "Algorithm: CRESSI RGBM algorithm. Sample tissues: 9 with saturation hemi-phases between 2.5 and 480 minutes. Dimensions and weight: Diameter: 67 mm - Height: 27 mm - Weight: 135 g. Depth sensor: Sea water setting (fresh water depths are about 3% lower); Measuring field: 0-393 ft., measured every second; GAGE function measuring field: 0-393 ft.; Precision: +/- 1% (T 20°C – 68 F); Reading resolution: 10 cm (0 to 100 m) / 1 m (100 to 120 m) / 1 ft (0 to 316 ft); Dive time: 0 to 255 minutes; Data acquisition frequency: 20 sec. THERMOMETER: Resolution: 1 °F; Measuring field: 23 °F + 104 °F. WATCH: Precision +/- 50 seconds month average; 24 hours display. BATTERY: CR 2430 - 3V battery. 2 years average life (by 50 yearly dives)."

## B.5 Giotto and Donatello (comparison)
* **Giotto** [GI]: three buttons — "By pressing the right (>) and left (<) buttons you can access the varied Giotto menu… To access the sub-menu press and hold the central Mode button… To exit, simply keep the central key (Mode) pressed or wait" [GI p.5][GI]; backlight = hold left (<) [GI p.16][GI]. Menu: `LOG, MODE-S (AIR/NITROX), DIVE-S, TIME-S, PLAN, GAGE, PCLINK, HISTORY, SYSTEM, PRE DIVE` [GI p.5][GI]. Two Nitrox mixes: "Mix1… between 21% and 50%… Mix2… between 21% and 99%" with in-dive gas switch (hold Mode) [GI p.6, p.14][GI]. Same ascent table (0–3.9 / 4–7.9 / 8–11.9 / 12 m/min), same `SLOW` + three arrows, safety stop 3 min at 5–3 m after dives >10 m, forewarning at 3 min, deep stop 1–2 min, deco first stop 24→3 m in 3-m steps, 2-min grace then ERROR PROGRAM 48 h, no-fly 12/24/48 h, PLAN 9–48 m [GI p.10, p.14–15, p.17][GI]. Specs: CRESSI RGBM, 9 tissues, 65 mm, 60-dive logbook [GI p.3, p.20][GI].
* **Donatello / Michelangelo** (2019) [DO]: Short / Long(1 s) / Long(3 s) single-button scheme like the Leonardo 2.0 [DO p.7][DO]; "The ascent rate is shown on the display as a points indicator in the center of the screen… the display will show the word SLOW while also flashing the three icons"; same four speed bands; penalty statement ("will make the next dive more conservative, but only if it is taken during the desat time… The icon indicates that the penalization factor is in force"); safety stop after dives >10 m, 3 min at 5–3 m, "indicated on the display by the icon SAFE… countdown of minutes and seconds" [DO p.28][DO]; adds a FREE (freediving) mode and 50-dive logbook [DO p.3][DO].

---

## C. Verification of the assumptions in the research brief

| Brief said | Finding |
|---|---|
| Mares "safety factor" settings | Mares calls it **P Factor / personal safety factor** P0–P2 (`p+`, `p++`); the word "safety factor" belongs to Cressi (SF0–2) [PP p.7][PP][LE p.22][LE]. |
| Mares `STOP`, `SURF`, `ASC`, `SLOW`, `DESAT`, `S`, `P`, `A1/A2` icons | Puck Pro shows `SAFE`, `DEEP`, `deco`, `asc`, `DESAT`, `no fly` ✈, `s.i.`, small `S`/`F`, `p+`/`p++`, mountain with 1–3 segments; **no `STOP`, no `SURF`, no `SLOW`** on Puck Pro (`SLOW` exists on Quad and Puck Pro Ultra) [PP p.5–11][PP][QD p.10][QD][PU p.10][PU]. |
| Mares ascent-rate segments at 4/6/8/10/12 | Puck Pro is numeric (m/min) with alarm ≥10 m/min; no segment scale [PP p.9–10][PP]. |
| Mares deep stop = 1 min at half max depth | Manual: one 2-min or two 1-min stops near the NDL, depth profile-dependent; "half max depth" is only an approximation (Divernet: a little shallower than half) — UNVERIFIED [PP p.10][PP][DN]. |
| Mares deco violation = 24-h lockout | Yes: >1 m above the stop for >3 min → bottom-timer-only for 24 h; also for uncontrolled ascent (can be disabled via `FASt`) [PP p.7, p.10, p.12][PP]. |
| Mares menu has safety stop on/off, deep stop on/off | **Not on Puck Pro**; Quad/Smart have `DEEP` on/off; nobody has a safety-stop toggle [PP p.7][PP][QD p.7][QD][SM p.12][SM]. |
| Cressi ascent limit 10 m/min | **12 m/min** (3 arrows + SLOW at 12.0 m/min; 2.0 says "over 12m/min") [LE p.48][LE][L2 p.18, p.24][L2]. |
| Cressi dive starts at 1.2 m / 3 s | 1.2 m (3.93 ft); timing ≤2 s if switched on, ≤20 s otherwise (2.0 wording) [LE p.36][LE][L2 p.19][L2]. |
| Cressi "program lock 48 h, gauge only, `ER`" | 48-h "ERROR PROGRAM" after 2 min uncorrected ceiling violation; only Logbook/History work (not even gauge); visible sign is flashing `STOP`; no `ER` text documented [LE p.51–52][LE]. |
| Cressi no-fly 12/24/48 | Yes (original); 2.0 manual says 24 h after gauge [LE p.59–60][LE][L2 p.28][L2]. |
| Cressi algorithm "Bühlmann ZH-L16 modified" | No — "CRESSI RGBM algorithm… Haldane model integrated with RGBM factors", 9 tissues 2.5–480 min [LE p.4, p.74][LE]. |
| Cressi NDL table in manual | None in any Cressi manual checked; only a user-read table exists (UNVERIFIED) [SBtable]. |
| Cressi nitrogen bar graph | None; only the 5-segment CNS O2 bar [LE p.40][LE][LQ p.5][LQ]. |
| Cressi "Dive Time Alarm" / "depth alarm" | Depth alarm only on 2.0 firmware (10–50 m, 2-m steps); no dive-time alarm found [L2 p.14][L2]. |
| Cressi FO2 21–50, PO2 1.2–1.6, SF0–2, altitude 0–3 ranges, deep stop on/off, 3-min safety stop, backlight | All confirmed [LE p.4, p.16–23, p.45][LE]. |

## D. Local working copies
All PDFs and extracted text/page images used for this report are in the session scratchpad (`/tmp/claude-1000/-workspaces-diving-computer-simulator/63eb4fa3-14be-4343-9a17-0f7911e26f99/scratchpad/mc/{pdfs,txt,img,pdfs2,txt2}`); they are temporary and not part of the repository.

## Sources

Official manufacturer documents (primary):

* [PPpage]: Mares — "Puck Pro / Puck Pro + Manual" product page (lists EN + 10 languages): https://www.mares.com/en_US/product/puck-pro-7
* [PP]: Mares — *Puck Pro Dive Computer Instruction Manual* (EN PDF linked from the page above): https://cdn-mdb.head.com/PDM/download/213321-9ndi5no5wwg8kok8
* [QDpage]: Mares — "Quad Manual" product page: https://www.mares.com/en_US/product/quad-4
* [QD]: Mares — *Quad Dive Computer Instruction Manual* (EN PDF): https://cdn-mdb.head.com/PDM/download/217739-9ukhyc704mckw80o
* [QApage]: Mares — "Quad Air Manual" product page: https://www.mares.com/en_FI/product/quad-air-2
* [QA]: Mares — *Quad Air Dive Computer Instruction Manual* (EN PDF): https://cdn-mdb.head.com/PDM/download/324076-enqa7dsjm08owk8k
* [PUpage]: Mares — "Puck Lite / Puck Pro Ultra / Puck Pro EZ Manual" page: https://www.mares.com/en_US/product/puck-lite-manual-44201808
* [PU]: Mares — *Puck Lite / Puck Pro Ultra / Puck Pro EZ* manual (EN PDF): https://cdn-mdb.head.com/PDM/download/608379-rioym3oc9tcokwoc
* Mares downloads index (Computers & Consoles): https://www.mares.com/en_US/downloads/charts-manuals/computers-consoles
* [CRindex]: Cressi (America) — Manuals & Software index page (source of all Cressi PDF links below): https://cressiamerica.com/pages/manuals-software (also https://store.cressi.com/pages/manuals-software)
* [LE]: Cressi — *Direction for use — Computer Leonardo* (EN PDF): https://f003.backblazeb2.com/file/cressi/manuals/Computers+-+Leonardo/Computers+-+Leonardo+-+User+Manual+-+EN.pdf
* [LQ]: Cressi — *Leonardo — Quick Guide* (PDF): https://f003.backblazeb2.com/file/cressi/manuals/Computers+-+Leonardo/Computers+-+Leonardo+-+Quick+Guide.pdf
* [L2]: Cressi — *Direction for use — Leonardo 2.0* (EN PDF, Rev. 01/2023): https://f003.backblazeb2.com/file/cressi/manuals/Computers+-+Leonardo+2.0/Computers+-+Leonardo+2.0+-+User+Manual+-+EN.pdf
* [GI]: Cressi — *Giotto — User Manual* (EN PDF): https://f003.backblazeb2.com/file/cressi/manuals/Computers+-+Giotto/Computers+-+Giotto+-+User+Manual+-+EN.pdf
* [DO]: Cressi — *Michelangelo / Donatello — User Manual* (EN PDF): https://f003.backblazeb2.com/file/cressi/manuals/Computers+-+Michelangelo-Donatello/Computers+-+Michelangelo-Donatello+-+User+Manual+-+EN.pdf

Older / sibling Mares manuals (mirrors, used only where the Puck Pro manual is silent):

* [PK]: Mares — *User's Guide Dive Computer Puck* (original Puck, mirror at The Scuba Doctor): https://www.scubadoctor.com.au/diveshop/downloads/computer-manuals/Mares_Puck.pdf
* [SM]: Mares — *Instruction Manual Smart Dive Computer* (mirror at Tradeinn): https://cache.tradeinn.com/web/pdf/manuales/eng_mares_manu_smart.pdf
* Puck Pro manual mirror (identical content, 14 pp.): https://scubadoctor.com.au/downloads/computer-manuals/Mares_Puck_Pro.pdf

Third-party (UNVERIFIED, used only where flagged):

* [SBtable]: ScubaBoard, "Matching Dive Computer Algorithms", page 3 — user-read Leonardo NDLs for SF0/1/2 (dmaziuk, 10 Jan 2019): https://scubaboard.com/community/threads/matching-dive-computer-algorithms.572525/page-3
* [SBmares]: ScubaBoard, "Is the Mares RGBM too conservative?" (no NDL figures found): https://scubaboard.com/community/threads/is-the-mares-rgbm-too-conservative.268162/
* [DN]: Divernet, "Can't pick one?" group test (21 Sep 2018): https://divernet.com/scuba-gear/cant-pick-one/
* [SBversions]: ScubaBoard, "Puck Pro Versions?": https://scubaboard.com/community/threads/puck-pro-versions.539557/
* [SeaDragon]: "2024 Mares Puck Pro vs Puck Pro Plus. Does it have Bluetooth?": https://www.seadragonlife.com/mares-puck-pro-dive-computer-review/
* [DeepBlue]: "Mares Puck Pro Plus Dive Computer Review": https://www.deepbluediving.org/mares-puck-pro-plus-review/
* [Wienke]: Wienke & O'Leary, "RGBM — Reduced Gradient Bubble Model" (Advanced Diver Magazine): https://advanceddivermagazine.com/articles/RGBM/RGBM.html
* Other ScubaBoard threads checked for Leonardo NDL data (none found): https://scubaboard.com/community/threads/question-on-cressi-leonardo.603578/page-2 ; https://scubaboard.com/community/threads/cressi-leonardo-too-conservative.492111/
