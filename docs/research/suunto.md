# Suunto dive computers — reference research for the simulator

Primary target: **Suunto Zoop Novo** (segment + dot-matrix LCD, 4 buttons, Suunto RGBM).
Secondary: **Suunto D4i Novo** (same firmware family/manual as D4i) and **Suunto D5** (colour TFT, Suunto Fused RGBM 2).

Research date: 2026-10-09. Everything below was read from the official Suunto documents listed in
[Sources](#sources). Each section carries the URL(s) it was taken from; page numbers refer to the official
PDF user guides. Anything not confirmed by an official source is marked **UNVERIFIED**.

Source IDs used inline:

| ID | Document | URL |
|---|---|---|
| ZN-PDF | Suunto Zoop Novo User Guide, PDF edition 2021-07-09 (41 pages) | https://ns.suunto.com/Manuals/Zoop_Novo/Userguides/Suunto_ZoopNovo_UserGuide_EN.pdf |
| ZN-HTML | Suunto Zoop Novo User Guide, HTML edition dated 2019-07-09 (one page per chapter) | https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/ |
| ZN-QG | Suunto Zoop Novo Quick Guide (2 pages, © 10/2015) — contains the labelled LCD/bezel diagram | https://ns.suunto.com/Manuals/Zoop_Novo/Quickguides/Suunto_ZoopNovo_QuickGuide_EN.pdf |
| ZN-TOOL | Suunto "Learning Tool" for the Zoop Novo (2016, Suunto-made virtual dives rendered as 99 frames of the real LCD) | https://ns.suunto.com/diving/Suunto-Tools-July-2016/Suunto-Tools-2016/zoop/index.html |
| ZOOP-2011 | Suunto Zoop (predecessor, 2011) User's Guide — the only Suunto RGBM manual in this family that prints NDL tables | https://ns.suunto.com/Manuals/Zoop/Userguides/Suunto_Zoop_UserGuide_EN.pdf |
| D4i-PDF | Suunto D4i User Guide PDF 2021-06-29 (the D4i Novo support hub links to this same PDF) | https://ns.suunto.com/Manuals/D4i/Userguides/Suunto_D4i_UserGuide_EN.pdf |
| D5-PDF | Suunto D5 User Guide PDF 2023-03-02 (65 pages) | https://ns.suunto.com/Manuals/D5/Userguides/Suunto_D5_UserGuide_EN.pdf |
| RGBM-PAGE | Suunto RGBM dive algorithms overview | https://www.suunto.com/Support/Suunto-rgbm-dive-algorithms/ |

Version note: the HTML guide (2019-07-09) and the PDF (2021-07-09) were cross-checked for the ascent-rate,
safety-stop, decompression, surface/no-fly, error-state, planning and personal/altitude chapters; the wording is
identical. The Zoop Novo PDF is a 41-page document; the manual's own copyright line reads "© Suunto Oy 07/2021"
(ZN-PDF p.41).

---

## 1. Physical layout, buttons and the LCD

### 1.1 Buttons

The Zoop Novo has **four buttons at the diagonals of the round case** (positions read from the bezel diagram on
page 1 of the Quick Guide, ZN-QG, and from every display figure in ZN-PDF):

```
            SELECT  ╭────────────╮  MODE          (MODE also carries the backlight "sun" symbol)
                    │            │
                    │    LCD     │
                    │            │
            DOWN    ╰────────────╯  UP
```

* Button names used by the manual: `[MODE]`, `[SELECT]`, `[UP]`, `[DOWN]` (ZN-PDF throughout). The quick guide
  draws `+` next to UP and `–` next to DOWN in the settings panel ("Change with [DOWN] or [UP]"), i.e. UP = plus,
  DOWN = minus (ZN-QG p.2).
* "Long press" is written as "keep [X] pressed"; the quick guide illustrates it with a **"2s"** badge (ZN-QG p.2,
  GENERAL SETTINGS panel). Wake-up: "Wake up the device by keeping any button pressed until the display turns on"
  (ZN-PDF p.7, 2.2); the quick guide says "Press [MODE] to wake up dive computer … Wait for software to
  initialize" (ZN-QG p.2, the screen shows `WAIT..`).

Button functions per mode (every line below is from ZN-PDF unless stated):

| Mode / state | MODE | SELECT | UP | DOWN |
|---|---|---|---|---|
| **TIME mode** (default, "calendar clock", p.14) | Short: next main mode TIME→DIVE→PLAN→MEM (p.7). Long: backlight ("keep [MODE] pressed until the backlight activates", p.14) | In stopwatch view: start/stop; long: reset (p.28) | Short: scroll bottom-row views (p.7). Long: Apnea timer view (p.12) | Short: scroll bottom-row views (p.7); split time when stopwatch running (p.28). **Long: General Settings** (p.7, p.14) |
| **DIVE mode on the surface** | Short: next main mode. Long: backlight | — (no surface function documented) | Scroll bottom-row views (p.7) | Short: scroll views. **Long: dive-mode settings** of the active dive mode (p.20) |
| **DIVE mode under water** (Air/Nitrox) | **Short: backlight** ("To activate the backlight while diving, press [MODE]", p.14). **Long: stopwatch/TIMER** ("To activate the stopwatch in dive mode, keep [MODE] pressed", p.28); after a deepstop, long MODE toggles between the deepstop display and the timer (p.27) | **Bookmark** ("At any time during a dive, you can add a bookmark to the dive log by pressing [SELECT]", p.14); start/stop the stopwatch once it is shown (p.28) | Scroll bottom-row views (quick guide dive panel shows UP/DOWN with a "change view" icon, ZN-QG p.2) | Scroll bottom-row views |
| **DIVE mode under water (Gauge)** | as above | "Pressing [SELECT] resets the main timer and adds a bookmark to the dive log. The previously-timed interval is displayed below the main timer" (p.22) | views | views |
| **PLAN NoDec mode** | Exit (p.24) | "Between consecutive dives, you can press [SELECT] to adjust surface time" (p.24) | Next deeper depth (+3 m); also "You can adjust the surface time with [UP]" when SURFTIME+ is shown (p.24) | Next shallower depth (p.24) |
| **MEM mode** | Back one level / exit ("press [MODE] to go back and select the other one. Press [MODE] a second time to exit", p.19) | Enter History / Logbook (quick guide HISTORY panel) | Switch History↔Logbook; scroll logbook; "Press [UP] to scroll through the dive profile graph or keep [UP] pressed to auto-scroll" (p.19–20) | Switch History↔Logbook (p.19) |
| **Any settings menu** | Exit / save ("Press [MODE] to exit", everywhere) | Enter a setting / confirm a value | Scroll / increase | Scroll / decrease |

General Settings list (entered with long DOWN in time mode; items named in ZN-PDF): **Dive Mode** (p.20, first
item — "Press [SELECT] to enter Dive Mode"), **Alarm** (daily alarm, p.15), **Time** (p.14), **Date** (p.14),
**Units** (p.15), **Dual Time** (p.15), **Contrast** (p.18, 0–10), **Backlight** (duration or off, p.14),
**Tones** (on/off, p.31), **Version** (software version + battery voltage, p.27–28).
Dive-mode settings (long DOWN while in a dive mode; p.21–27): **Personal Altitude** (first item, "Press [SELECT] to
enter Personal Altitude settings", p.25), **Nitrox** (Nitrox mode only: O2% then PO2, p.21–22), **Depth Alarm**
(p.18), **ALARM TIME** = dive time alarm (p.24), **Sample Rate** (p.27), **Deepstop** (p.27); Free mode instead has
**Depth Notify** (five notifications) and **Surf. Time Notify** (p.22–23).
"Some settings cannot be changed until five (5) minutes have elapsed after the dive." (ZN-PDF p.21)

Backlight details (ZN-PDF p.14): duration configurable or off; "When the backlight is off, it does not illuminate
when an alarm sounds." Low battery: "For safety reasons, the backlight and buzzer (sound) cannot be activated when
the low battery warning is displayed." (p.10). Power save: "display turns off after 30 minutes of inactivity …
press any button" (p.26). Display contrast 0–10 (p.18).

Sources: ZN-PDF https://ns.suunto.com/Manuals/Zoop_Novo/Userguides/Suunto_ZoopNovo_UserGuide_EN.pdf ;
ZN-QG https://ns.suunto.com/Manuals/Zoop_Novo/Quickguides/Suunto_ZoopNovo_QuickGuide_EN.pdf ;
display states HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/getting-started/display-states-and-views/ ;
backlight HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/backlight/

### 1.2 The LCD — segment map (ASCII sketch)

The display is a hybrid: fixed 7-segment digit fields top and bottom, fixed text labels/icons, a **dot-matrix
centre field**, and a **vertical ascent-rate bar at the right edge of the matrix**. The sketch below was traced from
the all-segments-on "display overview" figure (ZN-PDF p.8 and the identical figure on the Icons HTML page) and the
labelled diagram on ZN-QG p.1.

```
                 ╭──────────────────────────────────────────────────────╮
   daily alarm → │  🔔  ((•                                             │ ← ((• = dive alarm indicator
   no-fly      → │  ✈NO    ┌─┐ ┌─┐   ┌─┐   AC                           │ ← AC = active water contact
                 │         │8│ │8│ . │8│   ft   ⚠                       │ ← ⚠ = diver attention symbol
                 │         └─┘ └─┘   └─┘   m                            │   top row: CURRENT DEPTH (3 digits + decimal)
   safety stop → │ ▐CEILING▌ ▐STOP▌ ▐ASC TIME▌                       ▓  │ ← fixed inverse-video labels   ▓
                 │ ┌──────────────────────────────────────────────┐  ▓  │                                 ▓ = ASCENT RATE
                 │ │                                              │  ▓  │   DOT-MATRIX CENTRE FIELD:      ▓   BAR GRAPH
                 │ │   big number(s): NO DEC TIME, or             │  ▓  │   time of day in TIME mode,     ▓   (column of
                 │ │   CEILING depth (left) + ASC TIME (right),   │  ▓  │   menus, DIVE/Air, Battery OK,  ▓   small
                 │ │   deepstop/safety-stop depth + countdown,    │  ▓  │   DEEPSTOP, TIMER, Surf t./     ▓   segments,
                 │ │   up/down arrows, "Er", Surf t. / No Fly,    │  ▓  │   No Fly, Er, tissue graph      ▓   grows upward)
                 │ │   tissue-saturation bar graph, profile graph │  ▓  │                                 ▓
                 │ └──────────────────────────────────────────────┘  ▓  │
                 │  AIR TIME     ▭▭▭     NO DEC TIME                   │ ← labels under the matrix; ▭▭▭ = low-battery icon
                 │  psi  O2%     bar     OLF% PO2                       │ ← unit labels for the bottom row
                 │  ┌─┐┌─┐ ┌─┐┌─┐  ft        ┌─┐ ┌─┐┌─┐  °C             │   bottom row: two 7-segment fields
                 │  │8││8│:│8││8│, m         │8│.│8││8│  °F             │   left  = "88:88"/"88.8" (date, dual time, MAX depth, O2%)
                 │  └─┘└─┘ └─┘└─┘            └─┘ └─┘└─┘                 │   right = "888"/"88.8" (seconds, weekday, DIVE TIME, °C, PO2, OLF%)
                 │     TIMER   MAX              DIVE TIME               │ ← bottom labels
                 ╰──────────────────────────────────────────────────────╯
```

Field inventory (ZN-QG p.1 labels, left to right exactly as printed on the quick guide):

| Region | Labels/segments present on the glass | What is shown there |
|---|---|---|
| Top-left icons | Daily Alarm Indicator (bell), Dive Alarm Indicator `((•`, No-Fly Icon (airplane + `NO`), Safety Stop Indicator (= the `STOP` label) | icons 1–4 of ZN-PDF p.8 |
| Top row | three 7-segment digits with decimal, `AC`, `ft`, `m`, `⚠` | **Current Depth**; `AC` = Active Water Contact Indicator; `⚠` = Diver Attention Symbol |
| Label row | `CEILING`, `STOP`, `ASC TIME` (inverse-video text segments) | lit as needed |
| Centre dot-matrix | free-form | Time, Mode Indicator, No-Decompression Time, Total Ascent Time, Ceiling Depth, Remaining Air Time (Vyper Novo/D4i only), Safety Stop/Deepstop Time, Surface Interval Time, No-Fly Time, Stopwatch (Timer), Apnea Timer, Tissue Saturation Graph (ZN-QG p.1 list) |
| Right edge | vertical column of segments | **Ascent Rate Bar Graph** |
| Under matrix | `AIR TIME`, battery icon, `NO DEC TIME`; `psi`, `O2%`, `bar`, `OLF%`, `PO2` | `NO DEC TIME` lights when the big matrix number is the NDL; battery icon = Low Battery Warning |
| Bottom-left field | 4 digits with colon and comma, `ft`/`m` | Date, Dual Time, Maximum Depth, Time, O2% (Nitrox) |
| Bottom-right field | 3 digits, `°C`/`°F` | Seconds Display, Stopwatch, Weekday, Dive Time, Temperature, PO2 (Nitrox), OLF% (Nitrox) |
| Bottom labels | `TIMER`, `MAX`, `DIVE TIME` | lit with the corresponding value |

Icon table verbatim (ZN-PDF p.8, "Suunto Zoop Novo uses the following icons"): 1 Daily alarm · 2 Dive alarm ·
3 No-fly · 4 Safety stop · 5 Low battery · 6 Active water contact · 7 Diver attention symbol · 8 Ascent rate.

Notes for the implementer:
* The `AIR TIME`, `psi`, `bar` labels exist on the Zoop Novo glass (shared LCD with Vyper Novo/D4i) but the Zoop
  Novo has no tank-pressure function; its logbook figure nevertheless shows a `bar` value because the figure is
  shared with the Vyper Novo (see §9). The Zoop Novo tech-spec text even lists a "Radio transceiver … 5.3 kHz"
  (ZN-PDF p.35) which appears to be copied from the Vyper Novo guide — **UNVERIFIED whether the Zoop Novo hardware
  actually has it; Suunto does not sell air integration for the Zoop Novo.**
* There is **no `SLOW` segment, no `AM/PM` segment, no `SURF TIME` label and no `NO FLY` text label on the glass**
  — `Surf t.` and `No Fly` are rendered as dot-matrix text (confirmed by the final frame of both learning-tool dives,
  ZN-TOOL, and by the logbook page-2 figure on the Dive history HTML page). The 12/24 h format is a setting (ZN-PDF
  p.14) but how 12 h time is marked is UNVERIFIED.
* `°C`/`°F`, `m`/`ft`, `psi`/`bar` unit segments are fixed labels (ZN-PDF p.8 figure).

Sources: ZN-PDF p.8 ; ZN-QG p.1 ; Icons HTML page (image alt "display overview ZoopNovo")
https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/getting-started/icons/

### 1.3 Modes and the text the device shows

* Four main modes: **TIME, DIVE, PLANNING, MEMORY**; cycle with MODE. The mode-change figure shows the time display
  `12:00` / `1.12 TH`, then the matrix words `DIVE`, `PLAN`, `MEM` (ZN-PDF p.7).
* Dive modes: **Air, Nitrox, Gauge, Free, Off** (ZN-PDF p.20). The activation screen shows `DIVE` with `Air` in an
  inverse bar underneath (ZN-PDF p.9); the dive-mode menu shows `Dive Mode` / `Air` → `Dive Mode` / `Nitrox`
  (ZN-QG p.2). Planning mode shows `PLAN NODEC` ("Press [MODE] until you see PLAN NODEC", ZN-PDF p.24).
* "The default dive mode is Air." (ZN-PDF p.7). "Off: turns dive mode off completely; the dive computer does not
  automatically switch the dive mode when submerged and dive planning mode is hidden" (ZN-PDF p.20).
* Time-mode bottom-row views (scroll with UP/DOWN): date + weekday (`1.12 TH`), dual time (bottom left), stopwatch
  (`0:00'00,0`), seconds (ZN-PDF p.14–15, p.28; ZN-QG p.1 label list).

Sources: ZN-PDF p.7, 9, 20, 24, 28 ; ZN-QG p.2 ; Dive modes HTML
https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/dive-modes/

### 1.4 Activation and pre-check sequence (what the screen does when DIVE mode is entered)

"Each time your Suunto Zoop Novo enters dive mode, a series of automatic checks are performed. All graphical
display elements are turned ON, and the backlight and the beep are activated. After this, your altitude and
personal settings are displayed along with the maximum operating depth (MOD), gas content, and PO2 values. Then
the battery level is checked." (ZN-PDF p.9). Figure sequence (ZN-PDF p.9): `12:00 / 1.12 TH` → `DIVE / Air` →
all-segments-on test screen → `66.2 m` (MOD) with `P0 A0` at left and `21 O2%` / `1.6 PO2` in the bottom row →
`Battery OK`. "Between consecutive dives, the automatic checks also show current tissue saturation" (a bar graph in
the matrix under the MOD value, ZN-PDF p.9). Then "Suunto Zoop Novo enters surface mode" (p.9).
Manual checklist: correct mode/complete display, altitude setting, personal setting, deepstops set, units, correct
temperature and depth, "The alarm beeps." (ZN-PDF p.9–10).

Source: ZN-PDF p.9–10 ; HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/activation-and-pre-checks/

---

## 2. Dive-mode display during a no-decompression dive

### 2.1 Fields shown

Manual figure (ZN-PDF p.13, "Ascent rate"): top `18.3 m` with `AC`, dive-alarm icon at top-left; centre `25` with
the `NO DEC TIME` label; bottom row `21,5 m` over `MAX` and `20 °C`; ascent-rate bar at right.
Quick-guide dive panel (ZN-QG p.2, "> 1.2 m / 4 ft"): `15.0 m`, `46` NO DEC TIME, bottom `21,5 m` and `22`; the
side icons show SELECT = Bookmark, MODE = backlight, UP/DOWN = change bottom-row view.

Suunto's own learning tool (ZN-TOOL, frames `…/zoop/dive-12m/sequences/seq1/frame0001.jpg` … `frame0099.jpg`,
and `…/zoop/dive-30m/sequences/seq1/frame0001.jpg` … `frame0099.jpg`) renders the real LCD during two virtual dives.
Observations from those frames (these are Suunto renderings, not manual text):

| Frame (12 m AIR dive) | Depth | Centre | Bottom row | Notes |
|---|---|---|---|---|
| 0001 | 0.5 m | `—` (NO DEC TIME label lit) | `0,5 m MAX` / `0 DIVE TIME` | the tool's popup calls this "No Deco Time (Void - Too Shallow)" |
| 0007–0049 | 3.5 → 12.0 → 9.8 m | `—` | `12,0 m MAX` / `3 … 18 DIVE TIME` | at ≤12 m the NDL exceeds 99 min, which the spec says is shown as "–" |
| 0055–0064 | 10.0 → 7.4 m (ascending) | `—` + ascent bar 4–6 segments | `12,0 MAX` / `20–23` | |
| 0070 | 5.6 m | `STOP` label lit, `3` | `12,0 MAX` / `25` | recommended safety stop countdown starts (minutes) |
| 0072 / 0075 / 0078 | 5.0 / 4.2 / 3.3 m | `STOP` + `2` / `2` / `1` | `26 / 27 / 28` | |
| 0082–0088 | 2.9 → 2.1 m | `STOP` off, `—` | `29–31` | above 3 m the recommended stop display simply disappears |
| 0099 | 0.0 m | `Surf t.  0:00` / `No Fly 12:00` (matrix text), `✈NO` icon lit | `12,0` / `35 DIVE TIME` | surface display |

| Frame (30 m EAN32 dive) | Depth | Centre | Bottom row | Notes |
|---|---|---|---|---|
| 0001–0013 | 1.0 → 13.0 m | `—` | `32 O2%` / `0.3 … 0.8 PO2` | Nitrox bottom-row view O2% + PO2 |
| 0019 | 18.9 m | `76` NO DEC TIME | `32` / `1.0` | |
| 0022 | 21.9 m | `CEILING` label, `11` left, `59` right, `DEEPSTOP` text below | `32` / `1.1 PO2` | below 20 m the planned deepstop depth (≈ half the max depth) is shown as CEILING, NDL on the right |
| 0025 / 0031 / 0037 | 24.9 / 29.8 / 29.1 m | `13  55` / `15  45` / `15  38` + `DEEPSTOP` | `32` / `1.2`–`1.3` | |
| 0052–0058 | 25.2 → 17.5 m | `15  58` → `15  81` + `DEEPSTOP`, ascent bar 2–8 segments | `32` / `19–21 DIVE TIME` | |
| 0060–0064 | 15.0 m | `CEILING` **and** `STOP` labels; `15` + two-arrows (hourglass-like) icon + `—`; `DEEPSTOP 59` → `35` → `12` | `32` / `21–23` | at the deepstop: countdown shown next to the word DEEPSTOP; NDL field shows `—` (>99 min) |
| 0066–0074 | 14.4 → 9.6 m | `—`, bar up to ~10 segments | `32` / `24–26` | |
| 0080 / 0084 | 6.0 / 3.6 m | `CEILING` + `STOP`; `3.0` + two-arrows + `3` / `1` | `32` / `29–30` | **mandatory** safety stop (CEILING + STOP + ceiling depth 3.0 + time) after the fast ascent |
| 0088–0096 | 2.3 → 0.5 m | `—` | `32` / `31–34` | |
| 0099 | 0.0 m | `Surf t. 0:00` / `No Fly 12:00`, `✈NO` | `32 O2%` / `35 DIVE TIME` | |

Bottom-row views that exist in dive mode (ZN-QG p.1 list + figures): `MAX depth | DIVE TIME`,
`MAX depth | temperature °C`, `O2% | PO2` (Nitrox), `O2% | OLF%` (Nitrox), time of day, stopwatch. Which pair is
default and the exact scroll order are **UNVERIFIED** (the manual only says "Time and dive modes have different
views in the bottom row which you can scroll through with [DOWN] and [UP]", ZN-PDF p.7).

Dive start/end: "Unless DIVE mode is turned off, Suunto Zoop Novo automatically switches to DIVE mode if you are
more than 1.2 m (4 ft) under water" (ZN-PDF p.7); "Suunto Zoop Novo switches to dive state when water is detected
and the depth gauge senses water pressure at 1.2 m (4 ft)" and the `AC` symbol "is shown until the water contact
deactivates" (ZN-PDF p.31). The Zoop Novo manual does not state the end-of-dive depth for scuba; the predecessor
states "Dive time: 0 to 999 min, counting starts and stops at 1.2 m [4 ft] depth" and "An ascent to any depth
shallower than 1.2 m [4 ft] will cause the DIVING display to be replaced by the SURFACE display" (ZOOP-2011 p.47,
p.92), and the D5 states a scuba dive ends at < 1.2 m with water contact (D5-PDF p.43). Free mode: "The free dive
starts at 1.2 m (4 ft) and ends when your depth is less than 0.9 m (3 ft)" (ZN-PDF p.22). Dives separated by less
than 5 minutes of surface time are one dive and "The dive time continues where it left off" (ZN-PDF p.23).

Display ranges (ZN-PDF p.34, Technical specifications): Dive time 0–999 min · Surface time 0–99 h 59 min · Dive
counter 0–999 · **No-decompression time: 0 to 99 min (– after 99)** · Ascent time 0–999 min (- - after 999) ·
Ceiling depths 3.0–150 m (10–492 ft) · Depth display 0–300 m, resolution 0.1 m to 100 m (1 ft to 328 ft) ·
Temperature −20…+50 °C, resolution 1°, accuracy ±2 °C within 20 min of a temperature change.

Sources: ZN-PDF p.7, 13, 22–23, 31, 34 ; ZN-QG p.1–2 ; ZN-TOOL
https://ns.suunto.com/diving/Suunto-Tools-July-2016/Suunto-Tools-2016/zoop/dive-12m/index.html and
https://ns.suunto.com/diving/Suunto-Tools-July-2016/Suunto-Tools-2016/zoop/dive-30m/index.html ;
ZOOP-2011 https://ns.suunto.com/Manuals/Zoop/Userguides/Suunto_Zoop_UserGuide_EN.pdf

### 2.2 Ascent rate indicator and the SLOW alarm

Verbatim (ZN-PDF p.13, 3.4 Ascent rate): "The ascent rate is displayed as a vertical bar along the right side of
the display. … When the maximum allowed ascent rate is exceeded, the lower segment of the bar starts to blink and
the top segment stays solid. Continuous ascent rate violations result in mandatory safety stops."
Warning (p.13): "DO NOT EXCEED THE MAXIMUM ASCENT RATE! Rapid ascents increase the risk of injury. You should
always make the mandatory and recommended safety stops if you have exceeded the maximum recommended ascent rate.
If the mandatory safety stop is not completed, the decompression algorithm penalizes your next dive(s)."

* Limit: **10 m/min (33 ft/min)** — alarm table: "High priority alarm, repeated three times. SLOW blinks. Maximum
  ascent rate of 10 m/min (33 ft/min) exceeded. Slow down your ascent rate." (ZN-PDF p.11). Mandatory stop trigger:
  "When the ascent rate exceeds 10 m (33 ft) per minute for more than five consecutive seconds" (ZN-PDF p.26).
* Figure (ZN-PDF p.13): normal ascent at 18.3 m shows a solid bar; the violation figure (14.8 m, NDL 35) shows the
  **`STOP` label lit under the depth**, the top bar segment solid and the lower part drawn blinking.
* Bar geometry: in the all-segments-on figure the bar is a single column of about 15 small segments (a slightly
  taller top block plus ~14 thin segments) to the right of the dot matrix (ZN-PDF p.8 zoomed) — **exact segment
  count and the m/min per segment are UNVERIFIED for the Novo**. In the learning tool the lit height grows with
  ascent speed (≈4–6 segments on a normal ascent, ≈10 at the fastest point, ZN-TOOL 30 m dive frame 0074).
  For reference the predecessor documented a 4-segment scale (ZOOP-2011 Table 3.2, reproduced in §6.4) and the D5
  documents "One bar step corresponds to 2 m (6.6 ft) per minute" (D5-PDF p.16).
* **Where "SLOW" appears is UNVERIFIED**: the alarm table says "SLOW blinks" but there is no SLOW segment on the
  glass (ZN-PDF p.8, ZN-QG p.1), so it must be dot-matrix text; no official figure shows it.

Sources: ZN-PDF p.8, 11, 13, 26 ; HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/ascent-rate/

### 2.3 Recommended safety stop

Verbatim (ZN-PDF p.26, 3.19): "Suunto Zoop Novo displays two different types of safety stops: recommended and
mandatory. With every dive over 10 meters (30 feet), there is a three-minute countdown for the recommended safety
stop. This stop is taken in the 3-6 m (10-20 ft) range. Suunto Zoop Novo shows a STOP icon and a three-minute
countdown." Figure: `STOP` label lit, `3` in the matrix, small `TIME` label (ZN-PDF p.26).
"NOTE: When deepstops are enabled, the length of mandatory safety stops is indicated in seconds." (p.26).
Behaviour when you leave the zone early: the Zoop Novo manual does not spell it out; the learning tool shows the
`STOP` + countdown simply disappearing above 3 m with no penalty (ZN-TOOL 12 m dive frames 0078→0082) and the
tool's own caption says "Although recommended, this stop is not strictly required and you won't be penalized when
violating it" (ZN-TOOL dive-12m page). The predecessor states the same: "If it is ignored, there is no penalty
applied to the following surface intervals and dives." (ZOOP-2011 p.28). The decompression chapter adds: "You are
advised, however, to stay below the ceiling until the STOP text has also disappeared. This indicates that the three
(3) minute recommended safety stop has also been completed." (ZN-PDF p.18). Countdown resolution: "Stop time is
counted down in minutes and seconds." (ZN-PDF p.17) — the figures/frames show whole minutes (`3`,`2`,`1`) for the
recommended stop; whether seconds are shown is UNVERIFIED.

Safety-stop length is **not adjustable on the Zoop Novo** (the settings lists on ZN-PDF p.21–27 contain no such
item); the 3/4/5-minute option belongs to the D5 (D5-PDF p.23, p.38).

Sources: ZN-PDF p.17–18, 26 ; HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/safety-stops-and-deepstops/

### 2.4 Mandatory safety stop

Verbatim (ZN-PDF p.26): "When the ascent rate exceeds 10 m (33 ft) per minute for more than five consecutive
seconds, the microbubble build-up may be more than is allowed for in the decompression model. In this situation,
Suunto Zoop Novo adds a mandatory safety stop to the dive. The time of this stop depends on the speed violation of
the ascent rate. The STOP icon is shown in the display. When you reach the depth zone between 6 m and 3 m (18 ft
and 9 ft) the following is displayed: 1. CEILING and STOP 2. Ceiling depth 3. Safety stop time. Wait at the ceiling
until the mandatory safety stop warning disappears." Warning (p.27): "NEVER ASCEND ABOVE THE CEILING! You must not
ascend above the ceiling during your decompression. In order to avoid doing so by accident, you should stay
somewhat below the ceiling."
Display as rendered by Suunto (ZN-TOOL 30 m dive frames 0080/0084): `CEILING` + `STOP` labels, `3.0` + two arrows
pointing at each other + `3` (then `1`).
Violation: alarm table — "Low priority alarm followed by 'Start descending' beep, repeated for three minutes. An
arrow points downwards. Mandatory safety stop violated. You should descend to complete the safety stop." (ZN-PDF
p.11). The Novo manual does **not** say a violated mandatory safety stop produces `Er`; `Er`/lock-out is tied to the
decompression ceiling (§3, §8). The predecessor explains the consequence: "If you continue to violate the Mandatory
Safety Stop, the tissue calculation model is affected and the dive computer shortens the available
no-decompression time for your next dive" and the surface display shows "STOP label for 5 min, if the Mandatory
Safety Stop was violated" (ZOOP-2011 p.29, p.47). Also: "The Mandatory Safety Stop time always includes the three
minute Recommended Safety Stop time." (ZOOP-2011 p.29).

Sources: ZN-PDF p.11, 26–27 ; ZN-TOOL ; ZOOP-2011 p.28–29, 47

### 2.5 Deepstops

Verbatim (ZN-PDF p.27): "Deepstops activate when you dive deeper than 20 m (65.6 ft). If the dive timer is on the
screen when deepstop activates, the timer is replaced with deepstop. After deepstop is over, the user can change
between deepstop and the timer by long pressing the MODE button. Deepstops are presented the same way as safety
stops. Suunto Zoop Novo notifies you that you are in the deepstop area by displaying: • CEILING in the top
• DEEPSTOP in the center row • Stop depth • Countdown timer. Deepstop is on by default in Air and Nitrox modes."
Figure (ZN-PDF p.27): `CEILING` label, `16` left, `6` right, `DEEPSTOP` text, `NO DEC TIME` label.
Alarm rows (ZN-PDF p.11): "Low priority alarm followed by two short beeps. DEEPSTOP and timer displayed. Deepstop
depth reached. Make the mandatory deepstop for the duration shown by the timer." and "Low priority alarm followed by
'Start descending' beep. DEEPSTOP blinks and an arrow points downwards. Mandatory deepstop violated. You should
descend to complete the deepstop." Ascent time includes "Time required to do deepstops" (p.16).
Learning-tool rendering (ZN-TOOL 30 m dive): the planned deepstop depth is displayed as `CEILING` as soon as the
diver is deeper than 20 m (`11` at 21.9 m, `13` at 24.9 m, `15` from 29.8 m on), i.e. **half the maximum depth**;
at the stop the display shows `CEILING` + `STOP`, `15`, the two-arrows icon and `DEEPSTOP 59 → 35 → 12` (a countdown
in seconds starting from one minute). The Zoop Novo manual does not state the deepstop duration; the D5 manual
states that deepstops "activate when you are halfway up from your maximum depth", that there can be several, and
"The second deepstop is 2 minutes long" (D5-PDF p.39). **Deepstop duration on the Zoop Novo (1 min first stop
inferred from the tool) is UNVERIFIED.** Breaking a deepstop: "Though not recommended, you may break (ignore)
deepstops and safety stops. Suunto Zoop Novo penalizes such actions with additional stops or other measures, either
during the dive or on following dives." (ZN-PDF p.17).

Sources: ZN-PDF p.11, 16–17, 27 ; ZN-TOOL 30 m dive ; D5-PDF p.39

---

## 3. Decompression-dive display

All verbatim from ZN-PDF 3.8 Decompression dives (p.15–18) unless noted.

* Entry: "If you exceed the no-decompression limit on a dive, when NO DEC TIME reaches zero, your dive changes
  into a decompression dive. … When the decompression dive starts, the NO DEC TIME on your display is replaced by
  ASC TIME, and a CEILING indicator appears. An upward pointing arrow also prompts you to start your ascent."
* Two key values: "CEILING: depth that you should not go above" and "ASC TIME: optimum ascent time in minutes to
  surface with defined gases". Continuous decompression: "rather than requiring you to make stops at fixed depths,
  the dive computer lets you decompress within a range of depths."
* Definitions: "The ceiling is the shallowest depth to which you should ascend when doing decompression. • The
  ceiling zone is the optimum decompression depth range. It is the range between the ceiling depth and 1.2 m (4 ft)
  below that ceiling. • The floor is the deepest depth at which the decompression stop time does not increase.
  Decompression starts when you pass this depth during your ascent. • The decompression range is the depth range
  between the ceiling and floor. … decompression slower at or close to the floor compared to the ceiling zone."
* "The ceiling depth is fairly shallow when you first enter the decompression dive. But if you remain at depth,
  the ceiling depth moves downward, and the ascent time increases." Rough water: "Suunto recommends that you
  decompress deeper than 4 m (13 ft), even if the indicated ceiling is shallower."
* Ascent time = "Time required to do deepstops • Ascent time from depth at an ascent rate of 10 m (32.8 ft) per
  minute • Time needed for decompression • Time needed for extra safety stops if ascending too fast during the
  dive". Warning: actual ascent time may be longer if you ascend slower than 10 m/min or stop deeper than the
  ceiling.
* "Suunto Zoop Novo shows the ceiling value always from the deepest of these stops. Deepstop and safety stop
  ceilings are always at constant depth when you are at the stop. Stop time is counted down in minutes and seconds.
  With decompression stops, the ceiling is always decreasing while you are near the ceiling depth".
* **Below the floor**: "The blinking ASC TIME text and an upward arrow indicate that you are below the floor. A
  low priority alarm will also sound. … The ceiling depth is shown on the left side of the center field, and the
  minimum total ascent time on the right side." Figure: labels `CEILING STOP ASC TIME`; matrix `3,0` + up-arrow
  icon + `9` (ceiling 3 m, ascent time 9 min) (p.17).
* **Above the floor**: "the ASC TIME text stops blinking and the upward arrow disappears … This indicates you are
  in the decompression range. Decompression begins, but slowly. Therefore, you should continue your ascent."
  Figure: `3,0   9` with no arrow.
* **At the ceiling**: "the display will show you two arrows pointing at each other … During the decompression
  stop, your total ascent time continues to count down towards zero. If the ceiling moves upwards, you can ascend
  to the new ceiling. You may surface only after ASC TIME and CEILING have disappeared. This means that the
  decompression stop and any mandatory safety stop have been completed. You are advised, however, to stay below
  the ceiling until the STOP text has also disappeared." Figure: `3,0` + hourglass-like double arrow + `9`.
* **Above the ceiling**: "a downward arrow appears in from of the ceiling depth, and a continuous beeping starts.
  In addition, an error warning ER reminds you that you have only three (3) minutes to correct the situation. You
  must immediately descend to, or below, the ceiling. If you continue to violate the decompression, the dive
  computer goes into a permanent error mode". Figure (p.18): labels `CEILING STOP`, matrix `3,0` + down-arrow +
  `Er` (ascent time replaced by `Er`).
* Alarm rows (p.11): "High priority alarm followed by 'Start descending' beep, repeated for maximum three minutes.
  Er blinks and an arrow points downwards. Decompression ceiling depth exceeded." and "Low priority alarm followed
  by 'Start ascending' beep, sounded two times. ASC TIME blinks and an arrow points upwards. No-decompression dive
  becomes a decompression stop dive. Depth is below the decompression floor level. You should ascend to, or above,
  the floor."
* Visual alarm symbols (p.12): "⚠ Attention - extend surface interval", "ER Violated decompression ceiling or bottom
  time is too long", "✈ Do not fly".
* Planning mode and 48 h: see §7–§8. Decompression figures use a comma decimal (`3,0`) in the manual art.

Sources: ZN-PDF p.11–12, 15–18 ; HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/decompression-dives/

---

## 4. Alarms (verbatim tables, ZN-PDF p.10–12, 3.2 Alarms, warnings and notifications)

"The two audible alarm types indicating high or low priority:"

| Alarm type | Sound pattern Duration |
|---|---|
| High priority | 2.4 s sound + 2.4 s break |
| Low priority | 0.8 s sound + 3.2 s break |

"In addition, there are two audible guidance notifications:"

| Instructional beep | Interpretation |
|---|---|
| Ascending (rising tone) | Start ascending |
| Descending (falling tone) | Start descending |

"Suunto Zoop Novo displays information during the alarm breaks in order to save battery life."

High priority alarms:

| Alarm | Explanation |
|---|---|
| High priority alarm followed by 'Start ascending' beep, repeated for maximum three minutes. PO2 value blinks | PO2 value greater than the adjusted value. Current depth is too deep for the gas in use. You should immediately ascend or change to a lower O2% gas. |
| High priority alarm followed by 'Start descending' beep, repeated for maximum three minutes. Er blinks and an arrow points downwards. | Decompression ceiling depth exceeded. You should immediately descend to, or below, the ceiling. |
| High priority alarm, repeated three times. SLOW blinks. | Maximum ascent rate of 10 m/min (33 ft/min) exceeded. Slow down your ascent rate. |

Low priority alarms:

| Alarm type | Alarm reason |
|---|---|
| Low priority alarm followed by 'Start ascending' beep, sounded two times. ASC TIME blinks and an arrow points upwards. | No-decompression dive becomes a decompression stop dive. Depth is below the decompression floor level. You should ascend to, or above, the floor. |
| Low priority alarm followed by 'Start descending' beep. DEEPSTOP blinks and an arrow points downwards. | Mandatory deepstop violated. You should descend to complete the deepstop. |
| Low priority alarm followed by 'Start descending' beep, repeated for three minutes. An arrow points downwards. | Mandatory safety stop violated. You should descend to complete the safety stop. |
| Low priority alarm followed by two short beeps. DEEPSTOP and timer displayed. | Deepstop depth reached. Make the mandatory deepstop for the duration shown by the timer. |
| Low priority alarm, repeated twice. OLF% value blinks if PO2 value is greater than 0.5 bar. | OLF value at 80% or 100% (Nitrox dive mode only). Acknowledge the alarm by pressing any button. |
| Low priority alarm, repeated twice. Maximum depth value blinks | Defined maximum depth or the maximum depth of the device exceeded. Acknowledge the alarm by pressing any button. |
| Low priority alarm, repeated twice; dive time value blinks | Defined dive time exceeded. Acknowledge the alarm by pressing any button. |
| Low priority alarm. Maximum depth value blinks. | Defined depth reached (Free dive mode only). Acknowledge the alarm by pressing any button. |
| Low priority alarm, Surface time value blinks. | Duration of surface time until next dive (Free dive mode only). Acknowledge the alarm by pressing any button. |

Visual alarms:

| Symbol on display | Indication |
|---|---|
| ⚠ (diver attention) | Attention - extend surface interval |
| ER | Violated decompression ceiling or bottom time is too long |
| ✈ | Do not fly |

Related facts:
* Depth alarm: "By default the depth alarm sounds at 30 m (100 ft). You can adjust the depth according to your
  personal preference or switch it off. … When the depth alarm activates, the backlight blinks and the low
  priority audible alarm pattern sounds. Acknowledge the alarm by pressing any button." (ZN-PDF p.18). Adjustable
  range: UNVERIFIED (not stated).
* Dive time alarm: "It is simply a countdown timer in minutes." Set under ALARM TIME (ZN-PDF p.24). Range
  UNVERIFIED.
* PO2: "The default oxygen percentage (O2%) setting is 21% (air) and oxygen partial pressure (PO2) setting is
  1.4 bar (20 psi)." (ZN-PDF p.21). Glossary: "The maximum partial pressure limit for enriched air diving is 1.4 bar
  (20 psi). The contingency partial pressure limit is 1.6 bar (23 psi)." (ZN-PDF p.39). Spec: "Partial pressure of
  oxygen (pO2): 0.2 – 3.0" (ZN-PDF p.34). The **settable PO2-limit range (1.2–1.6 bar) is UNVERIFIED for the Novo**;
  the predecessor spec reads "Oxygen partial pressure display: 1.2 - 1.6 bar depending on the limit setting"
  (ZOOP-2011 p.92).
* OLF: the Zoop Novo shows a **numeric OLF% in the bottom-right field** ("Oxygen Limit Factor: 0–200% with 1%
  resolution", ZN-PDF p.34; `OLF%` label on the glass). It does **not** have the old Zoop's OLF bar graph (that was
  "1 - 110% with 10% resolution (bar graph)", ZOOP-2011 p.92). "Suunto Zoop Novo does not display CNS% or OTU% but
  instead displays the larger of the two in the OLF% field." (ZN-PDF p.31). Nitrox spec: "Oxygen: 21–50%",
  "Gas mixtures: 1" (p.34). Low-battery: tones and backlight disabled (p.10). Daily alarm "the screen blinks and the
  alarm sounds for 60 seconds" (p.15). Tones can be switched off entirely: "When tones are off, there are no
  audible alarms." (p.31).

Sources: ZN-PDF p.10–12, 15, 18, 21, 24, 31, 34, 39 ; HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/alarms-warnings-and-notifications/ ;
https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/depth-alarm/ ;
https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/dive-time-alarm/

---

## 5. Settings

### 5.1 Personal and altitude adjustment (verbatim tables, ZN-PDF p.25)

"The personal factors which tend to increase the possibility of DCS include: exposure to cold water - less than
20°C (68 °F) • below average physical fitness level • fatigue • dehydration • stress • obesity • patent foramen
ovale (PFO) • exercise before or after dive"

| Personal adjustment | Explanation |
|---|---|
| 0 | Ideal conditions (default value). |
| 1 | Conservative. Some risk factors or conditions exist. |
| 2 | More conservative. Several risk factors or conditions exist. |

| Altitude adjustment | Explanation |
|---|---|
| 0 | 0 – 300 m (0 – 980 ft) (default) |
| 1 | 300 – 1500 m (980 – 4900 ft) |
| 2 | 1500 – 3000 m (4900 – 9800 ft) |

Procedure: "1. While in a dive mode, keep [DOWN] pressed. 2. Press [SELECT] to enter Personal Altitude settings.
3. Press [UP] to change the Personal adjustment and confirm with [SELECT]. 4. Press [UP] to change the Altitude
adjustment and confirm with [SELECT]. 5. Press [MODE] to exit." Displayed on the pre-check screen as `P0` / `A0`
(ZN-PDF p.9 figure). Warning: wait "at least three (3) hours" after arriving at altitude (p.26). "SET THE CORRECT
ALTITUDE SETTING! When diving at altitudes greater than 300 m (1000 ft), the altitude setting must be correctly
selected … The dive computer is not intended for use at altitudes greater than 3000 m (10000 ft)." (p.30).
Caution: "Always use the same personal and altitude adjustment settings for the actual dive and for the planning."
(p.30).

### 5.2 Other settings (ZN-PDF)

| Setting | Values / behaviour | Page |
|---|---|---|
| Units | Metric / Imperial (toggle with DOWN) | p.15 |
| Time | hours, minutes, seconds, 12 or 24-hour format | p.14 |
| Date | year, month, day; "The date and weekday are shown in the bottom row of time mode" | p.14 |
| Dual time | second time zone, shown bottom-left of time mode | p.15 |
| Daily alarm | OFF / ONCE / WEEKDAYS / EVERY DAY | p.15 |
| Contrast | 0 (lowest) – 10 (highest) | p.18 |
| Backlight | duration or off | p.14 |
| Tones | on / off | p.31 |
| Dive Mode | Air / Nitrox / Gauge / Free / Off (set under General Settings) | p.20 |
| Nitrox O2% | 21–50 %; "If the oxygen content of a mix is set to 22% or above, the setting value remains until changed. It does not automatically revert back to 21%." | p.22, p.34 |
| Nitrox PO2 | default 1.4 bar (20 psi); see §4 for range | p.21 |
| Depth alarm | default 30 m (100 ft), on/off + depth | p.18 |
| Dive time alarm (ALARM TIME) | on/off + minutes | p.24 |
| Sample rate | Air/Nitrox: 10, 20, 30, 60 s (default 20 s); Free: 1, 2, 5 s (default 2 s) | p.27 |
| Deepstop | on (default in Air and Nitrox) / off | p.27 |
| Free mode: Depth Notify | up to five depth notifications, each on/off + depth | p.22–23 |
| Free mode: Surf. Time Notify | surface countdown timer on/off + duration; starts "as soon as you reach 1.2 m (4 ft)" | p.23 |
| Safety stop time | **not a setting on the Zoop Novo** (not in any settings list); 3/4/5 min exists on the D5 (D5-PDF p.23) | — |

Battery change keeps: "All history and logbook data, as well as the altitude, personal and alarm settings, remain
in the dive computer memory after the battery change. Other settings revert back to default values." (ZN-PDF p.32).

Sources: ZN-PDF p.14–15, 18, 20–27, 30–32, 34 ; HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/personal-and-altitude-adjustments/ ;
https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/sample-rate/ ;
https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/getting-started/set-up/

---

## 6. Algorithm facts — Suunto RGBM

### 6.1 What the Zoop Novo manual says (ZN-PDF p.29–31, 3.24 Suunto RGBM)

"In the late 1990s, Suunto implemented Dr. Bruce Wienke's RGBM (Reduced Gradient Bubble Model) bubble model to
work with the earlier M-value based model. … they addressed a number of diving circumstances outside the range of
dissolved-gas-only models by: • Monitoring continuous multiday diving • Computing closely spaced repetitive diving
• Reacting to a dive deeper than the previous dive • Adapting to rapid ascents which produce high microbubble
(silent-bubble) build-up • Incorporating consistency with real physical laws for gas kinetics. The Suunto RGBM
predicts both dissolved and free gas in the blood and tissues of divers."
"Experimentally it has been shown that the body adapts to decompression to some degree when diving is constant and
frequent. Personal adjustment settings are available for divers who dive constantly and are ready to accept greater
personal risk." Altitude: "The maximum partial pressures of nitrogen allowed by the mathematical model of the dive
computer are reduced according to the lower ambient pressure. As a result, the allowed no decompression stop limits
are considerably reduced." Oxygen: CNS and OTU computed separately, the larger scaled value displayed as OLF%
(example: CNS 85 % / OTU 80 % → OLF 85 %). Tech spec: "Tissue calculation model • Suunto RGBM • Maximum depth of
operation: 120 m (393 ft)" (p.35). Planning accounts for "any calculated residual nitrogen • dive history from the
past four days" (p.23). Safety chapter: "any diving activity up to four days prior to initial use of the computer
may cause misleading information and must be avoided" (p.5).

The Suunto algorithm page lists the Zoop (and D4i, D6i, Vyper, Cobra) under **Suunto RGBM**, the D5 under **Suunto
Fused RGBM 2** (RGBM-PAGE).

### 6.2 How the model adapts (predecessor manual, same algorithm family — ZOOP-2011 p.88–89, labelled "Suunto RGBM Adaptive decompression")

"The SUUNTO RGBM algorithm adapts its predictions of both the effects of micro-bubble build-up and adverse dive
profiles in the current dive series. … Depending on circumstances Suunto RGBM will adapt the decompression
obligations by doing any or all of the following: • Reducing no-decompression stop dive times • Adding Mandatory
Safety Stops • Increasing decompression stop times • Advising an extended surface interval (Diver Attention
symbol). Some patterns of diving cumulatively add a higher risk of DCI, e.g. dives with short surface intervals,
repetitive dives deeper than earlier ones, multiple ascents, substantial multiday diving. When this is detected in
addition to adapting the decompression algorithm the Suunto RGBM model will in some circumstances also advise, with
the Diver Attention Symbol … that the diver extend the surface interval."
Oxygen conservatism (ZOOP-2011 p.89): displayed exposure "upped to the next higher percentage value"; "the CNS%
limits up to 1.4 bar are based on 1991 NOAA Diving Manual limits, but the limits above 1.4bar are significantly
shortened"; OTU recovery rate reduced.

### 6.3 No-decompression limit tables

**The Zoop Novo manual (2021) and the Vyper Novo / D4i manuals publish no NDL table.** The only Suunto table for
this algorithm family is in the Suunto Zoop (2011) guide; it is reproduced verbatim below. Treat the numbers as the
best available approximation for the Zoop Novo — **UNVERIFIED for the Novo firmware** (the Novo adds deepstops and
caps the displayed NDL at 99 min, so values above 99 would show as `–`).

Intro text (ZOOP-2011 p.84): "The no-decompression limits displayed by the dive computer for the first dive to a
single depth (see Table 6.1. and Table 6.2.), are slightly more conservative than those permitted by the U.S. Navy
tables."

**Table 6.1. NO-DECOMPRESSION TIME LIMITS (MIN) FOR VARIOUS DEPTHS (M) FOR THE FIRST DIVE OF A SERIES.**
Personal Mode / Altitude Mode

| Depth [m] | P0/A0 | P0/A1 | P0/A2 | P1/A0 | P1/A1 | P1/A2 | P2/A0 | P2/A1 | P2/A2 |
|---|---|---|---|---|---|---|---|---|---|
| 9 | - - | 163 | 130 | 163 | 130 | 96 | 130 | 96 | 75 |
| 12 | 124 | 89 | 67 | 89 | 67 | 54 | 67 | 54 | 45 |
| 15 | 72 | 57 | 43 | 57 | 43 | 35 | 43 | 35 | 29 |
| 18 | 52 | 39 | 30 | 39 | 30 | 25 | 30 | 25 | 21 |
| 21 | 37 | 29 | 23 | 29 | 23 | 20 | 23 | 20 | 15 |
| 24 | 29 | 24 | 19 | 24 | 19 | 16 | 19 | 16 | 12 |
| 27 | 23 | 18 | 15 | 18 | 15 | 12 | 15 | 12 | 9 |
| 30 | 18 | 14 | 12 | 14 | 12 | 9 | 12 | 9 | 7 |
| 33 | 13 | 11 | 9 | 11 | 9 | 8 | 9 | 8 | 6 |
| 36 | 11 | 9 | 8 | 9 | 8 | 6 | 8 | 6 | 5 |
| 39 | 9 | 8 | 6 | 7 | 6 | 5 | 6 | 5 | 4 |
| 42 | 7 | 6 | 5 | 6 | 5 | 4 | 5 | 4 | 4 |
| 45 | 6 | 5 | 5 | 5 | 5 | 4 | 5 | 4 | 3 |

**Table 6.2. NO-DECOMPRESSION TIME LIMITS (MIN) FOR VARIOUS DEPTHS [FT] FOR THE FIRST DIVE OF A SERIES**
Personal Mode / Altitude Mode

| Depth [ft] | P0/A0 | P0/A1 | P0/A2 | P1/A0 | P1/A1 | P1/A2 | P2/A0 | P2/A1 | P2/A2 |
|---|---|---|---|---|---|---|---|---|---|
| 30 | - - | 160 | 127 | 160 | 127 | 93 | 127 | 93 | 73 |
| 40 | 120 | 86 | 65 | 86 | 65 | 53 | 65 | 53 | 43 |
| 50 | 69 | 56 | 41 | 56 | 41 | 34 | 41 | 34 | 28 |
| 60 | 50 | 38 | 29 | 38 | 29 | 25 | 29 | 25 | 20 |
| 70 | 36 | 29 | 23 | 29 | 23 | 20 | 23 | 20 | 15 |
| 80 | 28 | 23 | 19 | 23 | 19 | 15 | 19 | 15 | 11 |
| 90 | 22 | 18 | 15 | 18 | 15 | 11 | 15 | 11 | 9 |
| 100 | 17 | 14 | 11 | 14 | 11 | 9 | 11 | 9 | 7 |
| 110 | 13 | 11 | 9 | 11 | 9 | 7 | 9 | 7 | 6 |
| 120 | 10 | 9 | 8 | 9 | 8 | 6 | 8 | 6 | 5 |
| 130 | 9 | 7 | 6 | 7 | 6 | 5 | 6 | 5 | 4 |
| 140 | 7 | 6 | 5 | 6 | 5 | 4 | 5 | 4 | 4 |
| 150 | 6 | 5 | 4 | 5 | 4 | 4 | 4 | 4 | 3 |

("- -" in the source means no limit / more than the display can show.) Source: ZOOP-2011 p.85–86,
https://ns.suunto.com/Manuals/Zoop/Userguides/Suunto_Zoop_UserGuide_EN.pdf

Cross-checks against Zoop Novo artwork: the Zoop Novo quick guide PLAN panel shows `15.0 m → 47` with dive number
`2` (a repetitive dive) and its dive panel shows 46 min NDL at 15.0 m (ZN-QG p.2); the manual's ascent-rate figure
shows 25 min at 18.3 m mid-dive (ZN-PDF p.13); the learning tool shows 76 min at 18.9 m on EAN32 (ZN-TOOL). None of
these is a first-dive air NDL, so they neither confirm nor contradict the table.

### 6.4 Predecessor ascent-rate table (for a segment-scale reference only — old Zoop, not Novo)

**Table 3.2. ASCENT RATE INDICATOR** (ZOOP-2011 p.34; the first row's "Normal, full battery." is a typo in the
original and should be read as "below 4 m/min")

| Ascent Rate Indicator | The equivalent ascent speed |
|---|---|
| No segments | Normal, full battery. [sic] |
| One segment | 4 - 6 m/min [13 - 20 ft/min] |
| Two segments | 6 - 8 m/min [20 - 26 ft/min] |
| Three segments | 8 - 10 m/min [26 - 33 ft/min] |
| Four segments | 10 - 12 m/min [33 - 39 ft/min] |
| Four segments, the SLOW segment, blinking depth reading, the STOP sign and an audible alarm | Above 12 m/min [39 ft/min] or continuously above 10 m/min [33 ft/min] |

Old Zoop mandatory-stop trigger wording: "When the ascent rate exceeds 12 meters/min [40 ft] momentarily or 10
meters/min [33 ft] continuously" (ZOOP-2011 p.28) — the Novo wording is "10 m (33 ft) per minute for more than five
consecutive seconds" (ZN-PDF p.26).

### 6.5 Planning mode (ZN-PDF p.23–24, 3.14 Dive planning mode)

"The dive planning mode PLAN NoDeco can be used to plan a dive that does not require decompression. … 1. Press
[MODE] until you see PLAN NODEC. 2. The display briefly shows your remaining desaturation time before continuing to
the planning display. 3. Press [DOWN] or [UP] to scroll your upcoming dive depths. The depth moves in 3 m (10 ft)
increments from 9 m – 45 m (30 ft – 150 ft). The no-decompression time limit for the selected depth is shown in the
center of the display. If you have dived at least once with Suunto Zoop Novo, the SURFTIME + field appears. You can
adjust the surface time with [UP]. 4. Between consecutive dives, you can press [SELECT] to adjust surface time.
5. Press [MODE] to exit. NOTE: The dive planning mode is disabled if the dive computer is in an error state … or if
the dive mode is off or in Gauge mode." Quick-guide PLAN figure: `✈NO` icon, `15.0 m` in the depth field, `47` with
`NO DEC TIME`, bottom row `21 O2%` and `2` (dive number of the next dive in the series; "The dive counter displayed
in the planning mode adds one to each new dive in the repetitive series", ZN-PDF p.23) (ZN-QG p.2).

Sources: ZN-PDF p.5, 23–24, 29–31, 35 ; ZOOP-2011 p.26–28, 34, 84–89 ; RGBM-PAGE https://www.suunto.com/Support/Suunto-rgbm-dive-algorithms/ ;
HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/suunto-rgbm/ ;
https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/dive-planning-mode/

---

## 7. Surface mode, surface interval and no-fly time

Verbatim (ZN-PDF p.28–29, 3.23 Surface and no-fly time): "Once back at the surface, Suunto Zoop Novo continues to
provide post-dive safety information and alarms. If, after your dive, you need to wait until flying, the no-fly
symbol displays in all modes. To access further information about your surface and no-fly times, enter dive mode.
Suunto Zoop Novo shows the time since you surfaced in the Surf t. field. The airplane symbol indicates that you
should not fly. The countdown until you will be safe to fly is shown in the No Fly field.
**No-fly time is always at least 12 hours and equals desaturation time when it is more than 12 hours. For
desaturation times shorter than 70 minutes, the no-fly time is not displayed. If decompression is omitted during a
dive so that Suunto Zoop Novo enters error state (see 3.16. Error state (algorithm lock)), the no-fly time is always
48 hours. If a dive is done in Gauge mode (bottom timer), the no-fly time is 48 hours.**"
Warning: "YOU ARE ADVISED TO AVOID FLYING ANY TIME THE COMPUTER COUNTS DOWN THE NO-FLY TIME. ALWAYS ACTIVATE THE
COMPUTER TO CHECK THE REMAINING NO-FLY TIME PRIOR TO FLYING!" The manual then quotes DAN (12 h minimum; longer after
multi-day or decompression diving) and UHMS (24 h; exceptions: < 2 h total dive time in the last 48 h → 12 h; after
any decompression-stop dive ≥ 24 h, preferably 48 h). **There is no 18-hour rule anywhere in the Zoop Novo manual.**
The predecessor says the same with different wording: "The no-flying time is always at least 12 hours or equivalent
to the so-called desaturation time (if longer than 12 hours). In the permanent Error mode the no-flying time is
48 hours." (ZOOP-2011 p.51). The D5 uses a 75-minute threshold instead of 70 (D5-PDF p.40).

What the surface display looks like (Suunto renderings, ZN-TOOL final frames + logbook page-2 figure): depth
`0.0 m`, `✈NO` icon, matrix text `Surf t.  0:00` (h:mm) and `No Fly 12:00` (h:mm), bottom row max depth / dive time
(or O2% / dive time in Nitrox). Dive numbering: "If the Suunto Zoop Novo has not counted the no-fly time down to
zero, then repetitive dives belong to the same dive series. Within each series, the dives are given numbers. The
first dive of the series is DIVE 1, the second DIVE 2, and so on. If you start a new dive with less than five (5)
minutes at the surface, Suunto Zoop Novo treats the new dive as part of the previous dive. The dive time continues
where it left off. After five (5) minutes or more at the surface, any new dives are part of a repetitive dive
series." (ZN-PDF p.23). Glossary: "Dive series: A group of repetitive dives between which the dive computer
indicates some nitrogen loading is present. When nitrogen loading reaches zero the dive computer deactivates."
(p.38). Diver attention symbol = "Attention - extend surface interval" (p.12). Surface time display range
0–99 h 59 min (p.34). Predecessor surface-display inventory (ZOOP-2011 p.47–48): max depth of last dive, present
depth, airplane, altitude/personal setting, attention symbol, "STOP label for 5 min, if the Mandatory Safety Stop
was violated", "Er, if the decompression ceiling was violated", temperature, dive time; with TIME pressed: time of
day, surface time h:mm, desaturation/no-fly time h:mm; in Nitrox: O2% and OLF.

Sources: ZN-PDF p.12, 23, 28–29, 34, 38 ; ZN-TOOL ; ZOOP-2011 p.47–51 ;
HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/surface-and-no-fly-time/ ;
https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/dive-numbering/

---

## 8. Error state ("Er", algorithm lock)

Verbatim (ZN-PDF p.24–25, 3.16 Error state (algorithm lock)): "Suunto Zoop Novo has warning indicators that alert
you to react to certain situations that would significantly increase the risk of DCI. If you do not respond to
these warnings, Suunto Zoop Novo enters an error state and shows Er on the display. This indicates that the risk of
DCI has greatly increased. **If you omit decompression stops for longer than three (3) minutes, the RGBM algorithm
is locked for 48 hours.** When the algorithm is locked, no algorithm information is available and ER is shown
instead. Locking the algorithm is a safety feature, highlighting that the algorithm information is no longer valid.
In such a condition, you should descend back below the ceiling level to continue the decompression. If you fail to
do so within three (3) minutes, Suunto Zoop Novo locks the algorithm calculation and displays ER instead, as shown
below. Note that the ceiling value is no longer present. In this state, you significantly increase your risk of
decompression sickness (DCS). Decompression information is not available for the next 48 hours after surfacing.
It is possible to dive with the device when the algorithm is locked, but instead of the decompression information,
ER is shown. If you dive again in this error state, the algorithm lock time resets to 48 hours when you surface."
Figure (Error-state HTML page image): matrix shows only `Er` in the centre.
Consequences elsewhere: planning mode disabled in error state (p.24); no-fly time 48 h (p.29); visual alarm "ER —
Violated decompression ceiling or bottom time is too long" (p.12). The predecessor adds what still works: "Once in
the permanent Error Mode only the ER warning is shown in the center window. The dive computer will not show times
for ascent or stops. However, all the other displays will function as before to provide information for ascent.
You should immediately ascend to a depth of 3 to 6 m [10 to 20 ft] and remain at this depth until air supply
limitations require you to surface. After surfacing, you should not dive for a minimum of 48 hours." (ZOOP-2011
p.57–58). Note the Zoop Novo manual never says the device drops into "gauge mode"; it says depth/time keep working
and `Er` replaces the decompression data.

Sources: ZN-PDF p.12, 18, 24–25, 29 ; ZOOP-2011 p.57–58 ;
HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/error-state-algorithm-lock/

---

## 9. Battery, dive counter, logbook and history

Battery (ZN-PDF p.10, 3.1.1 Battery indicators): "Temperature or internal oxidation can affect the battery voltage.
If you store your Suunto Zoop Novo for a long period or use it in cold temperatures, the low battery warning may
appear even though the battery has enough capacity. In these cases, re-enter dive mode and check the battery power.
If the battery is low, the Low Battery warning comes on." Screens (figure p.10): `Battery OK` (pre-check), `Battery
Low` and `Replace Battery` as matrix text with the battery icon; "If the low battery icon appears in surface mode,
or if the display looks faded, the battery may be too low." Backlight and buzzer disabled while the warning is
shown (p.10). The battery voltage is visible under General Settings → Version (p.27–28). Battery change by a Suunto
service centre is recommended (p.32); the support hub also offers a "how to change the battery" video
(https://www.suunto.com/en-us/Support/dive-computers-and-instruments-support/suunto-zoop-novo/).

Dive counter: "Dive counter: 0 to 999 for repetitive dives" (p.34); numbering rules in §7.

Dive history (ZN-PDF p.18–19): MEM → History / Logbook. Scuba history = dive hours, total number of dives, maximum
depth; "records a maximum of 999 dives and 999 diving hours. When these limits are reached, the counters reset to
zero." Free-dive history = deepest and longest dives, cumulative time, total number of dives (max 999 dives /
99:59 h).

Logbook (ZN-PDF p.19–20): "Each log has three pages:
1. Main page • maximum depth • date of dive • type of dive (indicated by first letter of dive mode, e.g. A for AIR
mode) • dive start time • dive number – from oldest to newest • gas percentage(s) of the first used gas mix • total
dive time (in minutes in all modes)
2. Surface time and warnings page • maximum depth • surface time after previous dive • average depth • warnings
• OLF% (if applicable)
3. Dive profile graph • water temperature • depth/time profile of the dive
Press [UP] to scroll through the dive profile graph or keep [UP] pressed to auto-scroll. The dive profile graph
shows point by point dive information such as depth, compass heading, decompression info, ceiling and ascent time.
The End of Logs text is displayed between the oldest and most recent dive. The logbook capacity depends on the
sample rate. If the memory is full, when new dives are added, the oldest dives are deleted." (The "compass heading"
line is inherited from the Vyper Novo text; the Zoop Novo has no compass.) Bookmarks record "present depth, time,
and water temperature" (p.14). Memory: "approximately 60 hours with 20-second recording interval" (p.35).
Logbook page figures (Dive history HTML page, shared Zoop/Vyper Novo art):
page 1 → top `21.5 m` (+ `✈NO`), matrix `01.05.11  A` and `12:58  1`, bottom `21 O2%` / `39 DIVE TIME`;
page 2 → `21.5 m`, matrix `Surf t.  0:21` / `AVG  14,7 m`, bottom `135 bar` / `5 OLF%` (the bar value is a Vyper
Novo field);
page 3 → `4,8 m` (depth at the cursor), profile graph with a vertical cursor, `26'` (elapsed time at the cursor),
bottom `65 bar` / `20 °C`. The quick guide HISTORY panel shows the same page-3 layout (ZN-QG p.2).

Sources: ZN-PDF p.10, 14, 18–20, 27–28, 32, 34–35 ; HTML https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/dive-history/ ;
https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/care-and-support/battery-replacement/

Physical/technical (ZN-PDF p.34–35): 65.8 × 65.8 × 29.1 mm, 119.6 g with display shield; water resistance 80 m
(EN 13319); operating 0–40 °C; "Maintenance cycle: 200 dives or two years"; Nitrox O2 21–50 %, one gas; stopwatch
0'00–99'59.

---

## 10. Suunto D4i Novo and Suunto D5 — differences that matter for the simulator

### 10.1 Suunto D4i Novo (watch-style, same firmware family as the Zoop Novo)

* Manual: the D4i Novo support hub (https://www.suunto.com/en-us/Support/dive-computers-and-instruments-support/suunto-d4i-novo/)
  links the **Suunto D4i User Guide** PDF (2021-06-29) https://ns.suunto.com/Manuals/D4i/Userguides/Suunto_D4i_UserGuide_EN.pdf ;
  HTML landing page https://us.suunto.com/pages/suunto-d4i-novo-user-guide ; quick guide
  https://ns.suunto.com/Manuals/D4i/Quickguides/Suunto_D4i_QuickGuide_EN.pdf ; learning tool
  https://ns.suunto.com/diving/Suunto-Tools-July-2016/Suunto-Tools-2016/d4i/index.html
* Algorithm: "Tissue calculation model • Suunto RGBM • Maximum depth of operation: 120 m (393 ft)" (D4i-PDF p.40);
  listed under Suunto RGBM on RGBM-PAGE.
* Buttons: same four names `[MODE] [SELECT] [UP] [DOWN]` and the same four main modes TIME/DIVE/PLANNING/MEMORY,
  1.2 m auto-activation (D4i-PDF p.7, 2.1). Section 2.4 notes software-version-dependent button behaviour for the
  stopwatch/apnea timer (V1.2.x vs V1.5.x) (D4i-PDF p.7–8).
* Display: same segment + dot-matrix layout family; icon list is the Zoop Novo list plus "5 Tank pressure (if
  available)" and "6 Wireless transmission (if available)" (10 icons, D4i-PDF p.8). Optional wireless tank pressure
  with an **Air Time** reading (setting "Air Time", D4i-PDF p.11) and a tank-pressure alarm "fixed alarm pressure,
  50 bar (700 psi)" (D4i-PDF p.14). Battery indicator figures are drawn on a rectangular "D-series" case (ZN-PDF
  p.10 also shows them).
* Everything else in the alarm table, ascent-rate text, safety/deep-stop text, RGBM chapter, error state and
  no-fly rules is word-for-word the Zoop Novo text with the product name swapped (D4i-PDF p.12–15, 17, 27–31;
  checked against ZN-PDF). No-fly threshold 70 min, 48 h after error state (D4i-PDF p.30).

### 10.2 Suunto D5 (colour display, Suunto Fused RGBM 2)

* Manual: HTML TOC https://www.suunto.com/en-us/Support/Product-support/suunto_d5/suunto_d5/ (dated 2023-11-30),
  PDF https://ns.suunto.com/Manuals/D5/Userguides/Suunto_D5_UserGuide_EN.pdf (2023-03-02). No-fly FAQ:
  https://www.suunto.com/en-us/Support/faq-articles/suunto-d5/what-is-no-fly-time-and-how-is-it-calculated-by-the-suunto-fused-rgbm-2-algorithm/
* Buttons: **three buttons** — upper, middle, lower; "Short pressing or long pressing them gets you to different
  functionalities" (D5-PDF p.10). Dive display: upper short = start/stop timer, upper long = reset timer; middle
  short = change view, middle long = enter menu; lower short = switch window, lower long = save bookmark / set
  compass bearing. Menu: upper = up, middle = select (long = go back), lower = down (D5-PDF p.11 figure).
* Modes: Air/Nitrox, Gauge, Free (+ Off); device restarts on mode change; dive state at 1.2 m with water contact
  (3.0 m without), scuba dive ends < 1.2 m, freedive ends < 0.9 m (D5-PDF p.11, p.43).
* Default dive display (D5-PDF p.11 figure): a coloured **arch** around the screen "illustrating key information,
  like no deco time, tank pressure, timer, direction"; water-contact icon; **ascent-speed bar on the left with
  colour coding**; battery icon; `DEPTH, m` large at top; `DIVE TIME` centre; `STOP, m` stop depth; a bottom
  "switch window" (e.g. `TANK, bar`) changed with the lower button. Air/Nitrox views: No deco ("The arch shows the no
  decompression time"), Compass, Tank pressure, Timer (D5-PDF p.26–27).
* Ascent rate (D5-PDF p.16): bar on the left, "One bar step corresponds to 2 m (6.6 ft) per minute"; green < 8 m/min,
  yellow 8–10, red > 10; alarm after 5 s over the limit; "Ascent rate violations result in longer safety stop times
  and mandatory safety stops."
* Safety stop (D5-PDF p.38): voluntary = yellow, mandatory = red; 3-min stop recommended for every dive over 10 m;
  "The time for a safety stop is calculated when you are between 2.4 and 6 m (7.9 and 19.6 ft) … presented with
  up/down arrows on the left side of the depth value. Safety stop time is shown in minutes and seconds … Ascent speed
  violation increases safety stop time with minimum 30 seconds … Safety stops can be set to three (3), four (4), or
  five (5) minutes." Figure: yellow arch, `STOP 1'28` in a yellow band at the bottom, `STOP, m 3.0` — this is the
  "circle timer" look. Warning "Safety stop broken: Ceiling of the voluntary safety stop broken by more than 0.6 m
  (2 ft)" (p.14).
* Deepstop (D5-PDF p.39–40): on by default; activates when deeper than 20 m; "deepstops activate when you are
  halfway up from your maximum depth"; window ±1.5 m, "Calculation starts at deepstop target depth plus 0.5 m …
  ends - 3 m away"; e.g. 42 m → stops at 21 m and 10.5 m, "The second deepstop is 2 minutes long"; yellow arrow
  above the window, red arrow + alarm 0.5 m further.
* Decompression (D5-PDF p.22–25): values `ceiling` and `asc. time`; deco window = ceiling + 3.0 m (white up/down
  arrows); safe margin 0.6 m above the ceiling (ceiling turns yellow, yellow down-arrow, calculation continues);
  above that: red down-arrow, audible alarm, "the decompression calculation is paused"; after 3 minutes the
  algorithm locks. Last stop depth selectable 3 m or 6 m ("The last ceiling depth is always 3 m", p.25).
* Algorithm lock (D5-PDF p.14–15): shows **`Locked`** (not `Er`) for 48 h; diving while locked resets the 48 h;
  gauge-mode dives also lock deco calculation for 48 h (p.28).
* Algorithm (D5-PDF p.21–22, p.57): "Suunto Fused™ RGBM 2 … tissue half-times are derived from Wienke's FullRGBM
  where human body is modeled by fifteen different tissue groups"; nitrogen half-times 1, 2, 5, 10, 20, 40, 80, 120,
  160, 240, 320, 400, 480, 560, 720 min; "Reduced gradient (variable) M-values based on diving habit and dive
  violations. The M-values are tracked up to 100 hours after a dive"; "less conservative on deep air dives"; no-fly
  "no longer requires tissues to be completely free of residual gases". No Trimix/CCR on the D5.
* Personal setting: five steps +2, +1, 0, −1, −2 (D5-PDF p.37–38, table reproduced: More aggressive (−2) … More
  conservative (+2)); altitude 0–300 / 300–1500 / 1500–3000 m (p.15–16). Personal setting also changes no-fly time
  (p.40).
* Alarms are colour-coded: "Alarms are always red. Warnings may be red or yellow. Notifications are always
  yellow"; vibration alarm available (D5-PDF p.13). Oxygen: CNS 80 % notification / 100 % warning, OTU 250 / 300;
  pO2 alarm > 1.6 (default pO2 setting 1.6 bar, Suunto recommends 1.4 for nitrox, p.26).
* No-fly (D5-PDF p.40): ≥ 12 h, = desaturation if longer, not shown if desaturation < **75 min**, 48 h after lock or
  gauge dive; FAQ page says the same. Sample rate fixed 10 s (1 s freedive) (p.40). Logbook: ~200 h / 400 dives;
  shows start/stop times, profile, surface time, max depth and temperature (p.34, p.57).

Sources: D4i-PDF ; D5-PDF ; RGBM-PAGE ; D5 HTML pages listed above.

---

## 11. Open points / UNVERIFIED items (for the simulator backlog)

1. Exact number of ascent-rate bar segments on the Zoop Novo and the m/min each represents (manual gives only
   "lower segment blinks / top segment solid"; ~15 segments visible on the glass; old Zoop used 4 + SLOW).
2. Where/how the word `SLOW` is rendered (dot matrix presumed; no official figure).
3. Deepstop duration on the Zoop Novo (tool shows a 60-second countdown at the first stop; D5 says the second stop
   is 2 min).
4. Settable range and step of the PO2 limit and of the depth/dive-time alarms on the Zoop Novo.
5. Default bottom-row view in dive mode and the scroll order of the views.
6. Whether the recommended safety-stop countdown shows seconds or only whole minutes on the Novo (figures show
   whole minutes; manual says stops count down "in minutes and seconds" and mandatory stops "in seconds" when
   deepstops are enabled).
7. 12-hour time marking (AM/PM) — no segment exists for it.
8. NDL values for the Novo firmware — only the 2011 Zoop table exists (§6.3).
9. Whether Zoop Novo hardware really contains the 5.3 kHz receiver listed in its spec sheet (not user-accessible
   either way).

---

## Sources

Official Suunto — Zoop Novo
* Zoop Novo User Guide PDF (2021-07-09): https://ns.suunto.com/Manuals/Zoop_Novo/Userguides/Suunto_ZoopNovo_UserGuide_EN.pdf
* Zoop Novo Quick Guide PDF: https://ns.suunto.com/Manuals/Zoop_Novo/Quickguides/Suunto_ZoopNovo_QuickGuide_EN.pdf
* Zoop Novo User Guide HTML (TOC): https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/
  * Display states and views: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/getting-started/display-states-and-views/
  * Set up: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/getting-started/set-up/
  * Icons: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/getting-started/icons/
  * Activation and pre-checks: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/activation-and-pre-checks/
  * Alarms, warnings and notifications: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/alarms-warnings-and-notifications/
  * Ascent rate: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/ascent-rate/
  * Backlight: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/backlight/
  * Bookmarks: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/bookmarks/
  * Decompression dives: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/decompression-dives/
  * Depth alarm: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/depth-alarm/
  * Dive history: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/dive-history/
  * Dive modes: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/dive-modes/
  * Dive numbering: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/dive-numbering/
  * Dive planning mode: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/dive-planning-mode/
  * Dive time alarm: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/dive-time-alarm/
  * Error state (algorithm lock): https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/error-state-algorithm-lock/
  * Personal and altitude adjustments: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/personal-and-altitude-adjustments/
  * Safety stops and deepstops: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/safety-stops-and-deepstops/
  * Sample rate: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/sample-rate/
  * Surface and no-fly time: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/surface-and-no-fly-time/
  * Suunto RGBM: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/suunto-rgbm/
  * Water contact: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/features/water-contact/
  * Battery replacement: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/care-and-support/battery-replacement/
  * Technical specifications: https://www.suunto.com/Support/Product-support/suunto_zoop_novo/suunto_zoop_novo/reference/technical-specifications/
* Zoop Novo support hub (videos, PDF): https://www.suunto.com/en-us/Support/dive-computers-and-instruments-support/suunto-zoop-novo/
* Regional copies of the HTML guide: https://us.suunto.com/pages/suunto-zoop-novo-user-guide , https://apac.suunto.com/pages/suunto-zoop-novo-user-guide
* Suunto Learning Tool (Zoop Novo): https://ns.suunto.com/diving/Suunto-Tools-July-2016/Suunto-Tools-2016/zoop/index.html
  * 12 m air virtual dive: https://ns.suunto.com/diving/Suunto-Tools-July-2016/Suunto-Tools-2016/zoop/dive-12m/index.html (frames `sequences/seq1/frame0001.jpg` … `frame0099.jpg`)
  * 30 m nitrox virtual dive: https://ns.suunto.com/diving/Suunto-Tools-July-2016/Suunto-Tools-2016/zoop/dive-30m/index.html (same frame naming)
  * Tool index for all three models: https://ns.suunto.com/diving/Suunto-Tools-July-2016/Suunto-Tools-2016/index.html ; campaign page https://www.suunto.com/en-us/Campaigns/Suunto-interactive-learning-tool/

Official Suunto — related models
* Suunto Zoop (2011) User's Guide (NDL tables 6.1/6.2, ascent-rate table 3.2): https://ns.suunto.com/Manuals/Zoop/Userguides/Suunto_Zoop_UserGuide_EN.pdf
* Suunto Vyper Novo User Guide PDF (same display family): https://ns.suunto.com/Manuals/Vyper_Novo/Userguides/Suunto_VyperNovo_UserGuide_EN.pdf ; HTML https://www.suunto.com/Support/Product-support/suunto_vyper_novo/suunto_vyper_novo/
* Suunto D4i User Guide PDF (used for D4i Novo): https://ns.suunto.com/Manuals/D4i/Userguides/Suunto_D4i_UserGuide_EN.pdf
* Suunto D4i Quick Guide: https://ns.suunto.com/Manuals/D4i/Quickguides/Suunto_D4i_QuickGuide_EN.pdf
* Suunto D4i Novo support hub: https://www.suunto.com/en-us/Support/dive-computers-and-instruments-support/suunto-d4i-novo/ ; HTML guide https://us.suunto.com/pages/suunto-d4i-novo-user-guide ; EMEA copy https://emea.suunto.com/en-sk/pages/suunto-d4i-novo-user-guide
* Suunto D5 User Guide PDF: https://ns.suunto.com/Manuals/D5/Userguides/Suunto_D5_UserGuide_EN.pdf ; HTML TOC https://www.suunto.com/en-us/Support/Product-support/suunto_d5/suunto_d5/
  * D5 Safety stops and deepstops: https://www.suunto.com/en-us/Support/Product-support/suunto_d5/suunto_d5/features/safety-stops-and-deep-stops/
  * D5 Decompression algorithm: https://www.suunto.com/en-us/Support/Product-support/suunto_d5/suunto_d5/features/decompression-algorithm/
  * D5 Algorithm lock: https://www.suunto.com/en-us/Support/Product-support/suunto_d5/suunto_d5/features/algorithm-lock/
  * D5 Personal setting: https://www.suunto.com/en-us/Support/Product-support/suunto_d5/suunto_d5/features/personal-setting/
  * D5 Ascent rate: https://www.suunto.com/en-us/Support/Product-support/suunto_d5/suunto_d5/features/ascent-rate/
  * D5 Surface and no-fly time: https://www.suunto.com/en-us/Support/Product-support/suunto_d5/suunto_d5/features/surface-and-no-fly-time/
  * D5 no-fly FAQ: https://www.suunto.com/en-us/Support/faq-articles/suunto-d5/what-is-no-fly-time-and-how-is-it-calculated-by-the-suunto-fused-rgbm-2-algorithm/
* Suunto RGBM dive algorithms overview: https://www.suunto.com/Support/Suunto-rgbm-dive-algorithms/

Third-party mirrors (not used as evidence, listed for convenience)
* ManualsLib Zoop Novo: https://www.manualslib.com/manual/1127463/Suunto-Zoop-Novo.html
* Older 2017-02-24 edition mirror: https://www.prodive-shop.com/datasheets/divecomputer/SUUNTO-ZOOP-NOVO.pdf
