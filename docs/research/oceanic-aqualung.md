# Pelagic-family dive computers: Aqua Lung i300C (primary) and Oceanic Geo 4.0 / Veo 4.0 / ProPlus 4.0 / Geo 2 (comparison)

Reference research for the web-based dive-computer training simulator. Compiled 2026-10-09 from the official owner's / operating manuals (PDFs downloaded, text-extracted page by page, and the display-figure pages rendered and inspected). Quotations are verbatim from the manuals unless marked "paraphrase" or "derived". Page numbers are the printed page numbers of the cited revision. Anything not confirmed from a primary document is marked **UNVERIFIED**.

Source tags used throughout (full URLs in §13):

| Tag | Document | Doc. No. / revision | Pages |
|---|---|---|---|
| [i300C p.N][i300c] | Aqua Lung i300C Dive Computer Owner's Manual (English, UK-hosted PDF) | Doc. 12-7874-r01 (10/2/17) | 68 |
| [i300C-r06][i300c-r06] | Same manual, later revision, via ManualsLib (spot-checked pp. 13, 20, 62, 63 only) | Doc. 12-7874-r06 (11/27/17) | 67 |
| [Geo4 p.N][geo4] | Oceanic GEO 4.0 Operating Manual | Doc. No. 12-5670-r01 (2/27/18), (c) Pelagic 2019 | 66 |
| [Veo4 p.N][veo4] | Oceanic VEO 4.0 Operating Manual (oceanicworldwide.com) | Doc. No. 12-5671-r01 (3/20/19), (c) Pelagic 2019 | 62 |
| [PP4 p.N][pp4] | Oceanic PROPLUS 4.0 Operating Manual (oceanicworldwide.com) | Doc. No. 12-5669-r01 (1/18/19), (c) Pelagic 2019 | 50 |
| [Geo2 p.N][geo2] | Oceanic GEO 2 Operating Manual | Doc. No. 12-5210-r03 (7/5/11), (c) 2002 Design, 2009 | 48 |
| [lucas] | Dealer reproduction of Aqua Lung's i300C spec sheet (Lucas Divestore) | web page | - |
| [dipndive] | Dealer product page for i300C (DIPNDIVE) | web page | - |

---

## 0. Key findings - read these first

1. **The i300C is a single-algorithm (Z+) computer, not a DSAT/PZ+ dual-algorithm computer.** The whole ALGORITHM section of its manual reads: "The i300C utilizes the Z+ algorithm to calculate nitrogen tissue loading. To create even greater margins of safety with respect to decompression, a Conservative Factor as well as No Decompression Deep and Safety Stops can be included for No Decompression dives." [i300C p.13][i300c]. The later r06 revision carries the identical sentence and does not mention DSAT [i300C-r06 p.13][i300c-r06]. The specification page lists only "Buhlmann ZHL-16C based algorithm" and "Decompression in agreement with Buhlmann ZHL-16C" [i300C p.65][i300c]; the NDL appendix contains only "Z+ ALGORITHM >> NDLS (HR:MIN) AT ALTITUDE" tables [i300C p.63][i300c], and r06's appendix is value-for-value identical with no DSAT table [i300C-r06 p.62][i300c-r06]. Aqua Lung's own specification table (as reproduced by a dealer) says "Algorithm: Z+" [lucas]; other dealer copy calls it "Buhlmann ZHL-16C based PZ+" [dipndive]. "PZ+" and "Z+" are the same thing: the Oceanic specification pages write "Buhlmann ZHL-16c based PZ+" while the body text of the same manuals writes "Z+ (the Pelagic Z+ algorithm)" [Geo4 p.21, p.62][geo4].
2. **"Dual Algorithm" (DSAT or Z+) is an Oceanic/Pelagic feature** ("Dual Algorithm" is listed as a Pelagic trademark [Geo4 p.4][geo4]) and is present in: Geo 4.0 [Geo4 p.21][geo4], Veo 4.0 [Veo4 p.13][veo4], ProPlus 4.0 [PP4 p.12][pp4] and Geo 2 [Geo2 p.24][geo2]. To demonstrate "DSAT vs PZ+ changes the NDL", the simulator must model an Oceanic unit. **The Oceanic Veo 4.0 is the i300C's closest sibling**: a "two button interface" with "ADV (Advance) and SEL (Select) buttons", "Dive, Gauge, and Free Modes" [Veo4 p.7, p.9][veo4], the same menu structure and dive-screen layout, the same Pelagic text, plus "5. ALGORITHM - This feature allows the choice of using the Z+ or DSAT algorithms" [Veo4 p.25][veo4]. The Geo 4.0 is the four-button, watch-style unit [Geo4 p.9][geo4].
3. The DSAT and Z+ NDL tables (sea level plus 11 altitude bands, metric and imperial) are copied verbatim from the Geo 4.0 manual in §6.6-6.7; the i300C Z+ tables [i300C p.63][i300c] are identical to the Geo 4.0 Z+ tables [Geo4 p.61][geo4], so one Z+ table serves both. A derived side-by-side at sea level is in §6.8 (e.g. 18 m: DSAT 0:59 vs Z+ 0:50; 30 m: 0:20 vs 0:16; 9 m: 4:43 vs 3:37).
4. Several assumptions in the research brief belong to the **older generation (Geo 2 / Veo 2 era) and are not true of the i300C / Geo 4.0 / Veo 4.0**: the ascent-rate limit is a single 9 m/min (30 fpm) at every depth [i300C p.13][i300c] (the two-speed rule "deeper than 60 FT (18 M) ... 60 FPM (18 MPM) ... 60 FT (18 M) and shallower ... 30 FPM (9 MPM)" is Geo 2 [Geo2 p.24][geo2]); nitrox FO2 is 21-100 %, not 21-50 % [i300C p.21][i300c]; there is no "FO2 50 % default" on the i300C or Geo 4.0 (that feature is in the Geo 2 [Geo2 p.19][geo2]); there is no O2 bar graph, only the ASC and N2 bar graphs [i300C p.12][i300c]; there is no airplane "NO FLY" icon - FLY is a word spelled in the top digit row on the FLY/SAT screen [i300C p.18][i300c]; the three-button "Mode/Advance/Select" layout is not the i300C (two buttons) nor the Geo 4.0 (four buttons: MODE, SELECT, ADV., LIGHT [Geo4 p.9][geo4]).
5. The brief's document number "12-7906" matched nothing; the i300C manual is Doc. No. 12-7874 (r01 2 Oct 2017; r06 27 Nov 2017) [i300C p.2][i300c][i300c-r06].
6. The Aqua Lung and Oceanic manuals are the same Pelagic text with different branding (identical sentences for DTR, bar graphs, Deep Stop, Safety Stop, CV/DV/VGM, FLY/SAT, altitude). Behaviour described for one can be assumed for the other where the wording is identical; where they differ (ranges, icons, button names) this report says so.

---

## 1. Physical / UI of the i300C

### 1.1 Buttons (two, not three)

"The i300C utilizes 2 control buttons called the ADV (Advance) and SEL (Select) buttons. They allow you to select mode options and access specific information. They are also used to enter settings, activate the backlight, and acknowledge the audible alarm." [i300C p.9][i300c]. The manual's symbols: "PRESS BUTTON LESS THAN 2 SECONDS" vs "HOLD BUTTON GREATER THAN 2 SECONDS" [i300C p.9][i300c].

Button functions table [i300C p.10][i300c] (verbatim bullet text):

| Action | Button | Function |
|---|---|---|
| Press | either | "to activate the i300C" |
| Press (< 2 s) | ADV | "to access Alt screens" / "to advance or step through menus" / "to toggle or change setpoints" / "to activate the backlight" |
| Hold (> 2 s) | ADV | "to scroll quickly, changing setpoints" / "to scroll quickly through menu lead-in screens (selections)" |
| Press (< 2 s) | SEL | "to select, access, step forward through selections, or save a setting" / "to activate the backlight without leaving a surface or underwater main screen" |
| Hold (> 2 s) | SEL | "to step backwards through selections or menu screens" |
| ADV + SEL together (the row shows the two button symbols joined by "+", with an "or" alternative; the exact press/hold gesture is only drawn, **UNVERIFIED**) | both | "to exit a menu directly to the main screen" |

In Dive mode: pressing SEL = "activate backlight or acknowledge alarm"; pressing ADV cycles "Gas Menu (only if Gas 2 is set ON) -> ALT 1 (only if timer is on the main screen) -> ALT 2 -> ALT 3 (only if NX) -> Deep Stop Preview -> back to Main"; holding ADV 2 s = "add/remove Timer from Dive Main screen" [i300C p.32][i300c]; when the Timer is shown, SEL = "start/stop Timer" [i300C p.34][i300c]. "During that time, the audible alarm can be acknowledged and silenced by pressing the SEL button." [i300C p.15][i300c].

Backlight: "LIGHt (BACKLIGHT) DURATION - This setting is the duration the backlight stays on after releasing the buttons. The options are OFF, 5 sec, or 10 sec. NOTE: The Backlight utilizes an ambient light sensor. If there is sufficient light, the backlight will not turn on regardless of this setting." [i300C p.27][i300c]. The display is an LCD ("Observe the LCD display to ensure it is consistently clear and sharp in contrast" [i300C p.61][i300c]); the segment layout is documented in §2.

Alarm LED: "An LED Warning Light, on the lower end of the housing, is synchronized with and flashes as the audible alarm sounds." [i300C p.15][i300c].

### 1.2 Activation, sleep, power

"To activate the i300C, press and release either button. The i300C will also turn on if its metal contacts become wet. The H2O ACT (water activation) feature may be disabled if that is your preference." "Upon activation The unit will enter a Diagnostic Mode. The i300C checks the display and voltage at this time to ensure that everything is within tolerance." "It will also check ambient barometric pressure, and calibrate present depth as 0 m (ft). When at 916 m (3001 ft), or higher, it will adjust depth for the higher altitude." "After the Diagnostic check, the i300C will display the surface screen in Dive Mode." "NOTE: The i300C has no off button or command. If no buttons are pressed or dives made within 10 minutes the computer will enter Sleep Mode. The screen and Bluetooth (if set ON) shut down, to save battery life, while in Sleep Mode. To wake the computer press any button. Additionally, the unit will completely shut itself off after 2 hours of inoperation. However, the i300C will stay on, in Sleep Mode, for a 24 hour period after the dive, counting down FLY (time to fly) and SAT (desaturation time) if a dive has been made." [i300C p.7][i300c].

Power: "(1) 3 vdc, CR2450, Lithium battery"; "Battery Icon: Warning - icon on solid at 2.75 volts, Battery change recommended; Alarm - icon on flashing at 2.50 volts, change the Battery"; "Cannot be manually activated deeper than 1.2 M (4 FT), if H2O ACT is set OFF."; "Cannot operate at elevations higher than 4,270 meters (14,000 feet)" [i300C p.65][i300c]. Low battery behaviour: on the surface at Warning level "functions continue but the backlight and Bluetooth (if set on) functions are disabled. The Battery icon appears solid"; at Alarm level "All operations cease. The Battery icon flashes for 5 seconds then the unit shuts off." During a dive at Alarm level "functions continue but the backlight is disabled. The Battery icon appears flashing. 5 seconds after entering Surface Mode the i300C will shut down." [i300C p.14][i300c].

### 1.3 Operating modes

"Divers may choose between three modes of functionality consisting of Dive, Gauge, and Free Mode." [i300C p.7][i300c]. "Set Mode allows you to choose between diVE (standard recreational dive), GAUGE, and FrEE (free diving) modes of operation. NOTE: The i300C will be locked in Gauge mode for 24 hours after surfacing from any Gauge or Violation Dive. Otherwise, you may switch modes freely while in any Surface Mode." The Set Mode screen: "Choose between diVE, GAUGE, or FrEE." [i300C p.29][i300c]. Within diVE the gas is set to Air or EAN (nitrox) in SET GAS [i300C p.21][i300c]; dealer copy counts this as "4 operating modes. Air, Nitrox, Gauge (with run timer)" plus Free [dipndive]. Gauge: "Maximum functional depth ... 100 M (330 FT)" for DIVE/GAUGE/FREE [i300C p.66][i300c] (the audible-alarm list mentions "120 m/399 ft in Gauge mode" [i300C p.15][i300c] - internal inconsistency in the manual, **UNVERIFIED** which applies).

### 1.4 Surface menus (per mode)

Dive mode Surf Main Menu, in order: "ALT 1, ALT 2, ALT 3, FLY/SAT, PLAN, LOG, SET GAS, SET AL, SET UTIL, SET TIME, SET MODE, TOT diVES, SN". "Enter the menu by pressing the ADV button. When you reach the end of the menu the i300C will return to the Dive Surface Main screen. You may hold the ADV button to scroll quickly through the selections. ... Press the SEL button to choose menus or options from the Main Menu when available." [i300C p.17][i300c].
Gauge mode menu as printed: "ALT 1, ALT 2, FLY, PLAN, LOG, SET GAS, SET AL, SET UTIL, SET TIME, SET MODE, TOT diVES, SN" [i300C p.45][i300c]. Free mode menu: "ALT 1, ALT 2, CDT FREE, SET FrEE AL, SET MODE" [i300C p.50][i300c].

Surface screens (Dive mode):
- Dive Surf Main: "will display the SURF (Surface) time and the selected FO2 of the breathing gas. The SURF time displayed is the time since activation or the surface interval after a dive." Figures show "1:02" over "Air" (FO2 label) or "0:25" over "32" with the FO2 label and gas-# tank icon [i300C p.17][i300c].
- ALT 1 (LAST): "essential data from the last dive. If there has been no dive within the current activation cycle, the dive number will display zero and dashes for the max depth and elapsed dive time". Figure: "32.3 m MAX" / "48 MIN" / "LASt 2 DIVE" [i300C p.17][i300c].
- ALT 2: "current elevation readings, time of day, and temperature" - "EL2" (EL2-EL7, blank if sea level) / "10:38 AM" / "19 degC" [i300C p.18][i300c].
- ALT 3: "displays only after a nitrox dive. It displays the current oxygen saturation level, the programmed PO2 Alarm setpoint, and the current gas mix." Figure: "39 O2 SAT" / "1.40 PO2  32 FO2" [i300C p.18][i300c].
- FLY/SAT (see §7).
- PLAN (see §6.4 and §7).
- LOG, SET GAS, SET AL, SET UTIL, SET TIME, SET MODE, HISTORY (TOT diVES), SN (below).

### 1.5 Settings and their ranges

SET GAS: "Within this screen you can select whether to use Air or Nitrox gas mixes. If Air is selected, the i300C will return you to the Set Gas Lead-in screen in the menu. If EAN is selected, the i300C will allow you to choose a gas FO2 (%O2) between 21-100%, PO2 Alarm settings, and whether to use 1, 2, or 3 gases. Additionally, the i300C allows for each gas to have individual PO2 alarm settings. Within the Set Gas PO2 Alarm 1, 2, and 3 screens the the current PO2 Alarm setting and corresponding MOD (Maximum Operating Depth) are displayed." "NOTE: Gas 1 cannot be set to OFF." [i300C p.21][i300c]. Sequence: SET AIR/EAN -> SET GAS 1 FO2 -> SET GAS 1 PO2 ALARM -> SET GAS 2 FO2 -> SET GAS 2 PO2 ALARM -> (gas 3 similar) [i300C p.21-22][i300c].

SET AL (alarms) [i300C p.22-24][i300c]: 1. AUd AL "ON or OFF"; 2. dEPTH AL "OFF or 10 - 100 m (30 - 330 ft)"; 3. Edt AL "setpoint 10 - 180 min or blank if OFF"; 4. N2 AL "alarm to go off at a predetermined number of N2 bar graph segments" ("# of segments selected if ON"); 5. dtr AL "designated reserve of dive time remaining", "setpoint 5 - 20 min".

SET UTIL (utilities) [i300C p.24-28][i300c]: 1. H2O TYPE "SALT or FrESH"; 2. H2O ACT "ON or OFF" ("WARNING: With H2O ACT turned OFF, you MUST remember to manually activate the i300C before any dive."); 3. UNITS "MET (metric) or IMP (imperial)"; 4. dEEP STOP "ON or OFF"; 5. SS (Safety Stop) "can be set ON or OFF. If ON is selected, you may choose from an available 3 or 5 min Safety Stop at depths of 3, 4, 5, or 6 m (10, 15, or 20 ft)"; 6. CF (Conservative Factor) "ON or OFF"; 7. bLUETOOtH "ON or OFF"; 8. LIGHt "OFF, 5 sec, or 10 sec"; 9. SR (sample rate) "2, 15, 30, or 60 second intervals".

SET TIME [i300C p.28-29][i300c]: date format "(M - D) or (D - M)", hour format "12 or 24", time (hours then minutes), date (year, month, day).

SET MODE [i300C p.29][i300c]: "diVE, GAUGE, or FrEE".

HISTORY ("TOT diVES") [i300C p.29][i300c]: "History is a summary of basic data recorded during all diVE and GAUGE dives." Screens: TOTAL DIVES ("0 - 9999"), TOTAL HOURS, EXTREMES ("highest altitude recorded for a dive", "lowest recorded water temperature", "deepest recorded dive", "longest recorded dive"). "NOTE: Dives made in Free mode are not shown in History or the Log Mode."

SN [i300C p.30][i300c]: serial # and firmware "revision #".

### 1.6 Log

"The log stores Information from the latest 24 DIVE and/or GAUGE mode dives for viewing. > If no dives are recorded, the message NONE YET 0 DIVE will be displayed in the log. > After exceeding 24 dives, the most recent dive is stored while the oldest is deleted. > Dives are numbered from 1 to 24 starting each time a dive is activated in either Dive (or Gauge) mode. After the post dive 24 hour period has elapsed and the unit shuts off, the first dive of the next activation period will be recorded as dive #1. > In the event that dive time (DIVE-T) exceeds 999 min, the data at the 999 interval is recorded in the Log upon surfacing of the unit." [i300C p.19][i300c].
Log screens [i300C p.19-20][i300c]: LOG PREVIEW ("time dive started", "date of dive", "dive #", and "blank if DIVE, GAU for GAUGE dive, VIO for a violation dive"); LOG DATA 1 ("pre dive Surface Interval hr:min, - : - - if first dive during the activation period", "max depth", "Dive Time, max 999 min", "max tissue loading, blank if GAUGE dive", "max ascent rate", "Deep Stop triggered, blank otherwise"); LOG DATA 2 ("lowest temperature", "recorded elevation of dive location, SEA (or EL 2 - EL7)"); LOG DATA 3 ("average depth", "time at end of dive"); LOG DATA 4 ("highest PO2 reached during the dive", "% O2 Saturation at end of dive, - - if the dive entered Violation Gauge Mode", "gas mix FO2 (% O2)"; "only displays for nitrox dives").

### 1.7 PC / phone interface

Bluetooth ("sniffing mode" on the surface with the screen active; Diverlog software; icon shown when ON; deactivated in Sleep Mode or when a dive starts) [i300C p.27][i300c]; plus a side "Data Port" for an optional USB cable; "The i300C checks for the presence of an interface device connection to the Data Port once every second while in Surface Mode" (not when wet contacts are wet); a "PC countdown (2 minutes) screen" is displayed; settings upload covers Gases, Set AL, Set UTIL, Set TIME; "The Mode settings must be entered using the i300C button controls"; "FREE Dive information is only available using the PC Interface system." [i300C p.58][i300c]. Sample-rate memory note: Log and PC-download data live in separate partitions; the PC partition can be overwritten before the 24-dive Log is [i300C p.28][i300c].

### 1.8 Dive-mode screens

"With the i300C activated, a dive will commence upon descending to 1.5 m (5 ft) for at least 5 seconds." [i300C p.32][i300c]. Screens: NO DECO DIVE MAIN / ALT 1 (Main becomes ALT 1 when the Timer is added to Main) [p.32]; GAS MENU (only with gas 2 ON) [p.32, 36]; DIVE ALT 2 "current time of day and ambient temperature" (figure "10:24 AM" / "23 degC") [p.33]; DIVE ALT 3 nitrox: "% O2 saturation 0 - 100", "current PO2 value", "FO2 setting" (figure "46 O2SAT" / "1.02 PO2  32 FO2") [p.33]; DEEP STOP PREVIEW [p.33]; TIMER [p.34]; DEEP STOP MAIN [p.34]; SAFETY STOP MAIN [p.35]; and the complication screens of §3 [i300c].

---

## 2. The i300C segment LCD

### 2.1 Icon legend (manual's numbered list, p.8)

The display is a dome-shaped (flat bottom, arched top) monochrome segment LCD. The manual's DISPLAY ICONS page lists [i300C p.8][i300c]:

| # | Icon / annunciator (verbatim) | Where it sits (from the figure) |
|---|---|---|
| 1 | "Depth ID (units)" - "m"/"ft" | three instances: right of the top-row digits, right of the middle-left stop-depth digits, right of the bottom-left digits |
| 2 | "Gas #" - tank icons "1 2" and "3" | left edge, mid/low |
| 3 | "Stop Triggered (Safety, Deep, or Decompression if DECO icon is displayed)" - the boxed word "STOP" | middle row, left of centre, after the stop-depth digits |
| 4 | "Low Battery" | upper left, under the SLOW caption |
| 5 | "Descend, Ascend, or Stop" - down-arrow / bar / up-arrow stack | centre of the middle row |
| 6 | "Value is Maximum" - "MAX" | top right (used by the top row) and bottom left ("m MAX") |
| 7 | "Oxygen Saturation" - "O2 SAT" / "MIN" | right of the middle digits |
| 8 | "Bluetooth is On" | right, just above the N2 arc base |
| 9 | "Decompression (DECO) or No Decompression (NO DECO)" - two boxes "NO" and "DECO" | under the right half of the middle digits |
| 10 | "Time To Surface" - "TTS" (with "MIN") | right end of the bottom row |
| 11 | "Temperature" - degree mark | bottom row |
| 12 | "Dive Time (DIVE-T) or Dive # (DIVE)" | bottom right |
| 13 | "Fraction of Oxygen" - "FO2" | bottom right label |
| 14 | "Surface Time" - "SURF" | middle row, below centre digits |
| 15 | "Partial Pressure of Oxygen" - "PO2" | bottom left label |
| - | "ASC" bar graph (left arc, 5 segments) with the caption "SLOW" at its top; "N2" bar graph (right arc, 5 segments) with the caption "DECO" at its top; "AM"/"PM"; "MIN" | arcs on both sides |

"The i300C features two specific bar graphs. 1. The one on the left represents ascent rate. It is referred to as ASC Bar Graph. 2. The one on the right represents nitrogen loading. It is referred to as the N2 Bar Graph." [i300C p.12][i300c]. (Note: the Oceanic Geo 4.0 and Veo 4.0 mirror this - TLBG on the left, VARI on the right [Geo4 p.20][geo4][Veo4 p.31][veo4].)

Zones and segment counts [i300C p.66][i300c]:

```
N2 Bar Graph                     segments
  No Deco Normal Zone             1 to 3
  No Deco Caution Zone            4
  Decompression Zone              5 (all)

ASC (Ascent) Rate                segments     MPM        FPM
  Normal zone                      0          0 - 3      0 - 10
  Normal zone                      1          3.5 - 4.5  11 - 15
  Normal zone                      2          5 - 6      16 - 20
  Normal zone                      3          6.5 - 7.5  21 - 25
  Caution zone                     4          8 - 9      26 - 30
  Too Fast zone (flashing)         5 (all)    > 9        > 30
```
(The p.13 version of the ASC table gives the metric bands as 0-3, 3.1-4.5, 4.6-6, 6.1-7.5, 7.6-9, > 9 [i300C p.13][i300c]; the p.66 copy rounds them differently. Both are quoted.)

Colours: the LCD is monochrome and neither manual describes colour printing on the bezel; the only zone names are "Normal", "Caution", "Decompression"/"Too Fast". Any green/yellow/red rendering in the simulator is a design choice, **UNVERIFIED** against the hardware.

### 2.2 What each digit field is used for (observed in the manual's figures)

- **Top row**: three large digits with decimal = current depth ("21.9 m"). Also used for text: "EL2", "FLY", "VIO", "CF", "LOG", "- - -" when deeper than 100 m [i300C p.18, 19, 39, 40][i300c].
- **Middle row**: left pair of small digits = stop depth with "m" and the boxed "STOP" ("5 STOP", "6 STOP", "18 STOP"); centre large digits = DTR (with "NO DECO" boxes lit), or deco stop time, or surface time ("0:02 SURF"), or time of day, or stop countdown; the arrow/bar stack sits between stop depth and the centre digits; "NO"/"DECO" boxes under the right of the centre digits [i300C p.32-41][i300c].
- **Bottom row**: left four characters = max depth ("32.9 m MAX"), or PO2 ("1.40 PO2"), or a message word: "UP", "DOWN", "STOP", "SLO", "VIO", "USE" (gas-switch prompt), "GAUG", "LASt", "PLAN", "SAt", "SI-", "T-" (timer); right digits = elapsed dive time "DIVE-T", or "TTS", or FO2 ("32 FO2"), or dive # ("DIVE"), or minutes ("MIN") [i300C p.17-19, 32-41][i300c].

### 2.3 ASCII sketches of the i300C dive display

Legend: `#` = lit bar-graph segment, `.` = unlit segment, `[NO][DECO]` = the two boxed annunciators (lit ones in capitals, unlit shown as `[  ]`), `^`/`v`/`=` = up arrow / down arrow / stop bar. Values are the ones used in the manual's own figures.

**(a) NO DECO DIVE MAIN** - 21.9 m, 24 min NDL, max 32.9 m, 36 min elapsed, gas 1, N2 bar graph 3 segments, no ascent [i300C p.32][i300c]:

```
                 .-----------------------------.
             .--'  SLOW                   DECO  '--.
           .'  .                               .   '.
          /  A .                               .  N  \
         |   S .          2 1 . 9  m           #  2   |
         |   C .     --------------------      #      |
         |     .                               #      |
         |         ^            2 4                   |
         |         =                                  |
         |  [1]    v        [NO][DECO]                |
         |       ---------            ---------       |
         |        3 2 . 9  m MAX       3 6  DIVE-T    |
          '------------------------------------------'
      ASC bar graph (left)                N2 bar graph (right)
```
The arrow stack (icon 5) is dark/unlit in this state; "NO DECO" both boxes lit; "DIVE-T" label under the right digits; tank icon "1" at the left.

**(b) DECOMPRESSION ENTRY** - 39.0 m, required stop 6 m for 6 min, TTS 11, "UP" message, up arrow and full N2 graph flashing, "DECO" caption at the top of the N2 arc lit [i300C p.37][i300c]:

```
                 .-----------------------------.
             .--'  SLOW                   DECO* '--.
           .'  .                               #*  '.
          /  A .                               #*    \
         |   S .          3 9 . 0  m           #*     |
         |   C .     --------------------      #*     |
         |     .                               #*     |
         |      6  ^*            6                    |
         |      m  =                                  |
         |  [1] STOP v      [  ][DECO]                |
         |       ---------            ---------       |
         |        U P *               1 1  TTS        |
          '------------------------------------------'
   * = flashing until the audible alarm is acknowledged
```
Once within 3 m (10 ft) below the stop depth the display becomes **DECOMPRESSION STOP MAIN**: "6.1 m" / "6 STOP [stop icon: both arrows with bar] 2" / "STOP 9 TTS" - stop icon solid, bottom-left word "STOP" [i300C p.38][i300c].

**(c) SAFETY STOP MAIN** - 5.2 m, stop depth 5 m, 3:00 remaining, N2 bar graph 2 segments, no DECO caption [i300C p.35][i300c]:

```
                 .-----------------------------.
             .--'  SLOW                   DECO  '--.
           .'  .                               .   '.
          /  A .                               .     \
         |   S .           5 . 2  m            .      |
         |   C .     --------------------      #      |
         |     .                               #      |
         |      5  ^                                  |
         |      m  =                                  |
         |  [1] STOP v      [  ][    ]                |
         |       ---------            ---------       |
         |                3 : 0 0                     |
          '------------------------------------------'
```
The remaining stop time (min:sec) occupies the bottom row; the stop icon (both arrows with stop bar) is solid next to the boxed "STOP"; the NO/DECO boxes are blank. Deep Stop Main looks the same with "18.2 m" / "18 STOP" / "2:00" [i300C p.34][i300c].

**(d) CONDITIONAL VIOLATION** - 4.1 m (above a 6 m stop), 12 min stop time, "DOWN" message, down arrow and N2 graph flashing, TTS 18 [i300C p.38][i300c]:

```
          4 . 1  m          DECO caption lit, N2 graph full (flashing)
      6  v*       1 2
      m STOP      [  ][DECO]
      D O W N *   1 8  TTS
```

**(e) DV1 ON THE SURFACE (< 5 min)** - "VIO" flashing in the top row, missed stop 3 m / 8 min in the middle row with "SURF" and "DECO", "SI- 0:02" in the bottom row [i300C p.39][i300c]:

```
          V I O *
      3  =        8        SURF* DECO
      m STOP
      S I -   0 : 0 2
```

**(f) VIOLATION GAUGE MODE during a dive** - "44.0 M" / "UP - -" with up arrow flashing / "VIO 62 DIVE-T"; after the audible alarm the NO DECO boxes and the N2 bar graph are removed [i300C p.40][i300c]. **VGM on the surface** < 10 min: "VIO" / "0:06 SURF" / "49.7 m MAX 62 DIVE-T"; > 10 min: "VIO" / "0:16 SURF" / "GAUG 4 DIVE" [i300C p.40][i300c].

**(g) ASC ALARM** - "23.2 m" with the SLOW caption and all five ASC segments flashing / "16 NO DECO" / "SLO 22 DIVE-T" [i300C p.13][i300c].

**(h) Surface screens** - < 10 min after a dive: "0:02 SURF" centre, "32.3 m MAX  34 DIVE-T" bottom; >= 10 min: "0:11 SURF" centre, "32 FO2" bottom right [i300C p.35][i300c]. FLY/SAT: top row "FLY", middle "23:50" (or "- -:- -"), bottom "SAt 9:59" (or "SAt -:- -") [i300C p.18][i300c].

---

## 3. Dive behaviours (i300C text; Oceanic 4.0 text is identical except for the names noted)

### 3.1 NDL / DTR countdown

"DTR (DIVE TIME REMAINING) - The i300C constantly monitors No Decompression status and O2 Accumulation, and will display whichever Time is the least amount available as DTR on the No Decompression Dive Main screen. The Time being displayed will be identified by the NO DECO or O2 MIN icons." "NO DECO - No Deco is the maximum amount of time that you can stay at your present depth before entering Decompression. It is calculated based on the amount of nitrogen absorbed by hypothetical tissue compartments. ... Whichever compartment is closest to this maximum level is the controlling compartment for that depth. Its resulting value (NO DECO) will be displayed as DTR. It will also be displayed graphically as the N2 Bar Graph ... As you ascend, the N2 Bar Graph segments will recede as control shifts to slower compartments." [i300C p.12][i300c]. Range: "Dive Time Remaining 0 to 99 min, display 99 if >99 min, 1 minute" [i300C p.66][i300c] (Geo 4.0 / Veo 4.0: "0 to 599 min, display 599 if >599 min" [Geo4 p.63][geo4][Veo4 p.59][veo4]).

"The N2 Bar Graph represents your relative No Decompression or Decompression status. The first four segments represent No Decompression status and the fifth indicates a Decompression condition. As your Depth and Elapsed Dive Time increase, segments are added. As you ascend, segments recede indicating that additional No Decompression time is available." [i300C p.13][i300c].

### 3.2 "Caution zone" as NDL approaches zero

The only "caution" concept in the manual is the N2 bar graph's 4th segment ("No Deco Caution Zone 4") [i300C p.66][i300c]. There is no statement that the NDL digits flash when they approach zero; the user-settable alarms that do fire are the DTR alarm ("setpoint 5 - 20 min", figure "DTR AL TRIGGERED ... flashing") and the N2 alarm at a chosen segment count ("N2 AL TRIGGERED ... flashing") [i300C p.23-24][i300c]. The automatic beep at the caution segment exists only in FREE mode: "When nitrogen increases to the caution level (4 N2 Bar Graph segments), the N2 Alarm will sound." [i300C p.55][i300c]. **UNVERIFIED**: whether the NDL digits flash at 0 in Dive mode - not described.

### 3.3 Entering decompression

"DECOMPRESSION - Decompression mode activates when theoretical No Decompression time and depth limits are exceeded. Upon entry into Deco, the audible alarm will sound and the alarm LED will flash. The full N2 bar Graph and Up Arrow icon will flash until the audible alarm is silenced. > Once within 10 FT (3 M) below the required Stop Depth (stop zone), the Full Stop icon (both Arrows with Stop Bar) will be displayed solid. To fulfill your decompression obligation, you should make a safe controlled ascent to a depth slightly deeper than, or equal to, the required stop depth indicated and decompress for the stop time indicated. The amount of decompression credit time that you receive is dependent on Depth, with slightly less credit given the deeper you are below the Stop Depth indicated. You should stay slightly deeper than the required Stop Depth indicated until the next shallower Stop Depth appears. Then, you can slowly ascend to, but not shallower than that indicated Stop Depth." [i300C p.37][i300c].

"DECOMPRESSION ENTRY - Upon entry into decompression the audible alarm will sound and the alarm LED will flash until the audible alarm is silenced. The message UP, Up Arrow, and full N2 Bar Graph icons will flash. Additionally, the stop depth, stop time, and the TTS (Time To Surface) values will be displayed. TTS includes stop times at all required Decompression Stops plus vertical ascent time based on the max rate allowed." Figure labels: "TTS 0 - 99, then - - if greater than 99 min", "stop depth", "stop time" [i300C p.37][i300c]. (Geo 4.0 calls it "TAT (Total Ascent Time) ... 0 - 999, then - - if greater than 999 min" [Geo4 p.40][geo4]; Veo 4.0 calls it TTS 0-999 [Veo4 p.59][veo4].)

"DECOMPRESSION STOP MAIN - Deco Stop Main will display upon ascending to within 10 ft (3 m) below the Decompression Stop depth. The message STOP, the Full Stop icon (both Arrows with Stop Bar) will be displayed solid. While Decompression Stop Main is displayed, you may access Gas Menu (if gas 2 is set ON) and Alt screens by pressing the ADV button repeatedly to cycle through them." [i300C p.38][i300c]. Deco Stop Time range "0 to 999 min, 1 minute" [i300C p.66][i300c]. Stop depths shown in the figures are 6 m and 18 m (deco stops are at 3 m multiples; the manual does not state the stop-depth increment explicitly - **UNVERIFIED**).

"GAS SWITCH WARNING - If gas 2 is set on and the current gas is not the best gas when approaching the decompression stop zone, the i300C will warn you to switch gases. You must confirm the gas switch by pressing the SEL button. If the gas switch is not confirmed within 30 seconds, no switch will be made." Figure: "USE 100" flashing in the bottom row with FO2 label [i300C p.37][i300c].

### 3.4 CV - Conditional Violation (above the stop for < 5 min)

"CV (CONDITIONAL VIOLATION) - Upon ascent above the required Deco Stop depth, operation will enter CV during which no off gassing credit will be given. The audible alarm will sound and the alarm LED will flash. The full N2 Bar Graph, Down Arrow icon, and DOWN message will flash until the audible alarm is silenced, then the N2 Bar Graph will be solid. > The Down Arrow icon continues to flash until descending below required Stop Depth (within stop zone), then full Stop icon (Stop Bar with both Arrows) will be on solid. > If you descend deeper than the required Deco Stop before 5 minutes elapse, Deco operation will continue with no off gassing credit given for time above the Stop. Instead, for each minute above the Stop 1-1/2 minutes of penalty time will be added to required Stop Time. > The added penalty (deco) time will have to be worked off before obtaining off gassing credit. > Once the penalty time is worked off, and off gassing credit begins, required Deco Stop Depths and Time will decrease toward zero. The N2 Bar Graph will recede into the No Deco zone, and operation will revert to No Deco mode." [i300C p.38][i300c].

### 3.5 DV1 - Delayed Violation 1 (above the stop for > 5 min)

"DV 1 (DELAYED VIOLATION 1) - If you remain shallower than a Deco Stop Depth for more than 5 minutes, operation will enter DV1* which is a continuation of CV with penalty time still being added. Again, the audible alarm will sound and the full N2 Bar Graph will flash until it is silenced. ALT screens are accessed and appear similar to Deco ALT screens. *The difference is that 5 minutes after surfacing from the dive, operation will now enter Violation Gauge Mode. > Down Arrow icon and DOWN message continues to flash until descent to below required Stop Depth, then full Stop icon will be on solid. > If the DV1 status is ignored, the i300C will enter DV1 Surface mode for 5 minutes upon surfacing from the dive. VIO (Violation), Down Arrow icon, and SURF icon will be flashing. After 5 minutes on the surface in DV1 mode, the unit will enter VGM (Violation Gauge Mode)." Figures: "DV1 DIVE MAIN" = "3.7 m / 6 [down arrow] 13 / DOWN 20 TTS" ("missed stop depth", "time required at missed stop"); "DV1 < 5 MIN ON SURFACE" = "VIO / 3 = 8 SURF / SI- 0:02" ("surface interval showing 2 min") [i300C p.39][i300c].

### 3.6 DV2 - Delayed Violation 2 (stop required between 18 and 21 m)

"DV 2 (DELAYED VIOLATION 2) - If the calculated Deco obligation requires a Stop Depth between 18 m (60 ft) and 21 m (70 ft), operation will enter DV2. The audible alarm will sound and the alarm LED will flash. The full N2 Bar Graph will flash until the audible alarm is silenced. > Up Arrow icon flashes if 3 m (10 ft) deeper than the required Stop Depth. > Once within 3 m (10 ft) of and below the required Stop Depth, the STOP message and Stop icon (both Arrows with Stop Bar) will be displayed solid." Figure: "18.2 m / 18 = 4 / STOP 36 TTS" [i300C p.39][i300c].

### 3.7 VGM - Violation Gauge Mode (stop required deeper than 21 m, or DV1 carried to the surface)

"VGM (VIOLATION GAUGE MODE) DURING A DIVE - During Dive mode dives, operation will enter VGM when Deco requires a Stop Depth greater than 21 m (70 ft). It will also enter VGM if Deco is activated during a dive in Free mode, described later. Operation would then continue in VGM during the remainder of that dive and for 24 hours after surfacing. VGM turns the i300C into a digital instrument without any decompression or oxygen related calculations or displays. Upon activation of VGM, the audible alarm will sound and the alarm LED will flash. The graphic VIO (violation) and Up Arrow icon will flash. After the audible alarm becomes silent, the NO DECO and N2 Bar Graph will be removed from the display." [i300C p.40][i300c].

"VGM (VIOLATION GAUGE MODE) ON THE SURFACE - Upon surfacing, the VGM Dive Main will remain on display for 10 minutes with Surface Interval time displayed with the SURF icon flashing. The graphic VIO will also still be displayed flashing. Operation will also enter VGM 5 minutes after surfacing from a dive in which a Delayed Violation occurred. > A full 24 hour continuous surface interval must then be served before all functions are restored. > During that 24 hours, VGM does not allow access to the SET GAS, PLAN, FLY/SAT (Desat), and FREE Mode features/screens. > The FLY countdown indicates time remaining before normal operation can resume with full features and functions." [i300C p.40][i300c]. Spec: "Violation Countdown Timer 23:50 to 0:00 hr:min, 1 minute" [i300C p.66][i300c]. Geo 4.0 adds: "In the event that a dive is made during the 24 hour lockout period, a full 24 hour surface interval must then be served before all functions are restored." and "All Watch functions will be allowed." [Geo4 p.42][geo4]. The i300C's Set Mode note confirms the lockout: "locked in Gauge mode for 24 hours after surfacing from any Gauge or Violation Dive" [i300C p.29][i300c]. Also: "If you surface due to 100% O2 SAT without completing the Deco obligation, the full N2 Bar Graph and O2 SAT value (100) will flash with O2 SAT icons for the first 10 minutes, then operation will enter VGM" [i300C p.43][i300c].

### 3.8 DV3 - Delayed Violation 3 (deeper than 100 m / 330 ft)

"DV 3 (DELAYED VIOLATION 3) - If you descend deeper than the maximum functional depth*, the audible alarm will sound and the alarm LED will flash. Also, the Up Arrow icon, UP message will flash, and Current Depth/Max Depth/DTR will only indicate dashes signifying that you are too deep. *The maximum functional depth, 100 M (330 FT), is the depth at which the i300C can properly perform calculations or provide accurate display information. Upon ascending above the maximum functional depth, current depth will be restored, however, max depth will continue to be displayed as dashes for the remainder of that dive. The Log for that dive will also display dashes for max depth." Figures: "DV3 DIVE" = "- - - m / UP ^ - - NO DECO / - - - MAX 12 DIVE-T"; "LOG, DV3 DIVE" = "VIO / 1:16 SURF / - - - MAX 52 DIVE-T" [i300C p.40][i300c]. The same text applies in Gauge mode [i300C p.47][i300c].

### 3.9 Free-mode deco = violation

"In the event that nitrogen continues to increase and reaches the Deco level, the VIO (violation) Alarm will sound. During which time, all 5 N2 Bar Graph segments, the UP message, Up Arrow icon, and the graphic VIO will flash. Additionally, the NO DECO will display 0 min. ... The graphic VIO flashes until 1 minute elapses on the surface. Then it alternates with FREE and operation reverts to Violation Gauge Mode for 24 hours." [i300C p.55][i300c].

---

## 4. Ascent rate

### 4.1 i300C / Geo 4.0 / Veo 4.0 / ProPlus 4.0 - single limit, 9 m/min (30 fpm) at all depths

"ASC BAR GRAPH - The ASC Bar Graph provides a visual representation of ascent speed (i.e., an ascent speedometer). When the ascent is faster than the recommended 9 mpm (30 fpm), all segments and the message SLO (slow) flash until the ascent is slowed." [i300C p.13][i300c].

| # OF SEGMENTS | ASCENT RATE, MPM (FPM) |
|---|---|
| 0 | 0 - 3 (0 - 10) |
| 1 | 3.1 - 4.5 (11 - 15) |
| 2 | 4.6 - 6 (16 - 20) |
| 3 | 6.1 - 7.5 (21 - 25) |
| 4 | 7.6 - 9 (26 - 30) |
| 5 | > 9 (> 30) |

[i300C p.13][i300c]; identical table ("VARI BAR GRAPH ... all segments flash and the message SLO (slow) flashes") in [Geo4 p.21][geo4]. Zones: segments 0-3 "Normal zone", 4 "Caution zone", 5 (all) "Too Fast zone (flashing)" [i300C p.66][i300c]; Geo 4.0: "VARI - Normal zone 3 segments, Caution zone 4 segments, Too Fast zone 5 segments" [Geo4 p.62][geo4].

Audible trigger: "Ascent rate exceeds 9 m (30 FPM) for 8 seconds or more." [i300C p.15][i300c] - i.e. the bar graph flashes immediately but the 10-second beeper starts only after 8 s above the limit. Figure "ASC ALARM TRIGGERED": SLOW caption and all segments flashing, bottom-left word "SLO" [i300C p.13][i300c]. The log records "max ascent rate" [i300C p.20][i300c].

Deco TTS uses this limit: "TTS includes stop times at all required Decompression Stops plus vertical ascent time based on the max rate allowed." [i300C p.37][i300c].

### 4.2 Older generation (Geo 2) - two-speed rule changing at 18 m / 60 ft

"The segments represent two sets of speeds which change at a reference depth of 60 FT (18 M). ... WARNING: When deeper than 60 FT (18 M), ascent rates should not exceed 60 FPM (18 MPM). At depths of 60 FT (18 M) and shallower, ascent rates should not exceed 30 FPM (9 MPM)." [Geo2 p.24][geo2].

| Deeper than 60 FT (18 M): VARI segments | FPM | MPM | | 60 FT (18 M) & shallower: VARI segments | FPM | MPM |
|---|---|---|---|---|---|---|
| 0 | 0 - 20 | 0 - 6 | | 0 | 0 - 10 | 0 - 3 |
| 1 | 21 - 30 | 6.1 - 9 | | 1 | 11 - 15 | 3.1 - 4.5 |
| 2 | 31 - 40 | 9.1 - 12 | | 2 | 16 - 20 | 4.6 - 6 |
| 3 | 41 - 50 | 12.1 - 15 | | 3 | 21 - 25 | 6.1 - 7.5 |
| 4 | 51 - 60 | 15.1 - 18 | | 4 | 26 - 30 | 7.6 - 9 |
| 5 | 60 + | 18 + | | 5 | 30 + | 9 + |

[Geo2 p.24][geo2]. Geo 2 audible: "Ascent Rate exceeds 60 FPM (18 MPM) when deeper than 60 FT (18 M), or 30 FPM (9 MPM) at 60 FT (18 M) and shallower" [Geo2 p.7][geo2]. This is the rule the brief assumed; it was dropped in the 4.0 generation and in the i300C.

---

## 5. Safety stop and Deep stop

### 5.1 Safety stop (i300C)

Setting: "SS (SAFETY STOP) - The Safety Stop feature can be set ON or OFF. If ON is selected, you may choose from an available 3 or 5 min Safety Stop at depths of 3, 4, 5, or 6 m (10, 15, or 20 ft)." [i300C p.26][i300c]. Countdown resolution: "No Deco Safety Stop Time 5:00 to 0:00 min, 1 second" [i300C p.66][i300c].

Behaviour: "SAFETY STOP - Upon ascent to within 1.5 m (5 ft) deeper than the Safety Stop depth set for 1 second on a No Decompression dive in which Depth exceeded 9 m (30 ft) for 1 second, a beep will sound and a Safety Stop at the depth set will appear on the Dive Main display with a countdown beginning at the SS time set and counting down to 0 min. > If the Safety Stop was set for OFF, the display will not appear. > In the event that you descend 3 m (10 ft) deeper than the Stop Depth for 10 seconds during the countdown, or the countdown reaches 0, the No Decompression Main screen will replace the Safety Stop Main screen which will reappear upon ascent to within 1.5 m (5 ft) deeper than the Safety Stop depth set for 1 second. > In the event that you enter Decompression during the dive, complete the Decompression obligation, then descend below 9 m (30 ft); the Safety Stop Main will appear again upon ascent to within 1.5 m (5 ft) deeper than the Safety Stop depth set for 1 second. > If the diver ascends to within 0.9 m (3 ft) from the surface for 10 seconds, the Safety Stop is to be canceled. > There is no penalty if you surface prior to completing the Safety Stop or choose to ignore it." [i300C p.14][i300c].

Display: "SAFETY STOP MAIN - If triggered, the Safety Stop will activate upon ascent to within 1.5 m (5 ft) deeper than the Safety Stop depth on a No Deco dive. The stop time will then countdown to 0 min. ... NOTE: The i300C does not penalize for a missed Safety Stop." Figure "5.2 m / 5 STOP [stop icon] / 3:00" [i300C p.35][i300c]. While the Timer is on the Main screen "Safety and Deep stops will be found on the Alt 1 screen only" [i300C p.34][i300c].

Derived reading for the simulator: with the default-looking settings in the figures (5 m, 3 min) the countdown starts when the diver reaches 6.5 m (5 m + 1.5 m) after having been deeper than 9 m; it pauses/hides below 8 m (5 m + 3 m) held for 10 s and resumes on re-entry; it is cancelled at 0.9 m for 10 s. There is no stated upper (shallow) edge other than the 0.9 m surface cancel - **UNVERIFIED** whether ascending to, e.g., 2 m pauses the countdown (the Geo 2 did cancel at "2 FT (0.6 M) shallower than the SS Depth for 10 seconds" [Geo2 p.25][geo2]; the 4.0-generation text does not).

### 5.2 Safety stop differences in the Oceanic 4.0 manuals

Same trigger text (5 ft / 1.5 m, 30 ft / 9 m, 10 ft / 3 m, 3 ft / 0.91 m) [Geo4 p.22][geo4][Veo4 p.14][veo4]. Extra option: "The Safety Stop feature can be set ON, OFF, or TMR (timer). If ON is selected, you may choose from an available 3 or 5 min Safety Stop at depths of 10, 15, or 20 ft (3, 4, 5, or 6 m). If TMR (timer) is selected, a manual timer will be available instead of the automatic Safety Stop count down." [Geo4 p.32][geo4]. "If set for Timer On - Upon ascending to 20 FT (6 M) for 1 second on a No Deco dive in which Depth exceeded 30 FT (9 M) for 1 second, 1 beep will sound and a Run Timer will appear (if set On) displaying 0:00 (min:sec) until started. ... If you ascend above 3 FT (0.91 M) for 10 seconds, or enter Deco, or a High O2 alarm condition occurs (100%), while the SS Timer is active, the SS Timer will be disabled for the remainder of that dive." [Geo4 p.22][geo4]. "When the Safety Stop is set for Timer, the graphic TMR with Run Time counting up from 0:00 to 9:59 (min:sec) then 10 to 999 (min) will be displayed instead of a set Stop Depth/Time." [Geo4 p.38][geo4].

### 5.3 Deep stop (i300C; identical in Geo 4.0 / Veo 4.0 / ProPlus 4.0)

"DEEP STOP - When the Deep Stop selection is set to ON, it will trigger after descending deeper than 24 m (80 ft). The i300C then calculates (continually updating) a Stop Depth equal to 1/2 the Max Depth. NOTE: The Deep Stop feature only works in DIVE Mode while within No Decompression times. > While 3 m (10 ft) deeper than the calculated Deep Stop, you will be able to access a Deep Stop Preview screen that will display the current calculated Deep Stop Depth/Time. > Upon initial ascent to within 3m (10 ft) below the calculated Stop Depth, a Deep Stop screen displaying a Stop Depth at 1/2 the Max Depth will appear with a countdown timer beginning at 2:00 (min:sec) and counting down to 0:00. If you descend 3m (10 ft) below, or ascend 3m (10 ft) above, the calculated Stop Depth for 10 seconds during the countdown, the No Decompression Main will replace the Deep Stop Main display and the Deep Stop feature will be disabled for the remainder of that dive. There is no Penalty if the Deep Stop is ignored. > In the event that you enter Decompression, exceed 57 m (190 ft), or a High O2 SAT (Oxygen Saturation) condition, >= 80%, occurs, the Deep Stop will be disabled for the remainder of that dive. > The Deep Stop is disabled during a High PO2 Alarm condition, >= set point." [i300C p.13][i300c]. Preview figure: "32.0 m / 18- STOP / 2:00"; Main figure: "18.2 m / 18 STOP [stop icon] / 2:00" [i300C p.33-34][i300c]. Geo 4.0: same text with "80 ft (24 m)", "190 ft (57 m)" [Geo4 p.21][geo4]; the Geo 4.0 display has a dedicated "DS" icon ("deep stop if triggered" shown on Dive Main) [Geo4 p.8, p.37][geo4]. Geo 2: "it will trigger during NORM No Deco dives when you descend to 80 FT (24 M)" [Geo2 p.24][geo2].

---

## 6. Algorithms: Z+ (PZ+), DSAT, Conservative Factor, altitude

### 6.1 i300C: Z+ only

"ALGORITHM - The i300C utilizes the Z+ algorithm to calculate nitrogen tissue loading. To create even greater margins of safety with respect to decompression, a Conservative Factor as well as No Decompression Deep and Safety Stops can be included for No Decompression dives." [i300C p.13][i300c]. Specification: "DIVE COMPUTER PERFORMANCE - Buhlmann ZHL-16C based algorithm - Decompression in agreement with Buhlmann ZHL-16C - No Deco Deep Stops - Morroni, Bennett - Deco Deep Stops (not recommended) - Blatteau, Gerth, Gutvik - Altitude - Buhlmann, IANTD, RDP (Cross) - Altitude corrections and O2 limits based on NOAA tables" [i300C p.65][i300c]. Decompression-model notice: "The program within the i300C simulates the absorption of inert gases into the body by using a mathematical model. ... using this dive computer, just as using any other No Decompression Tables, is no guarantee of avoiding decompression sickness" [i300C p.2][i300c].

### 6.2 Oceanic Dual Algorithm (DSAT or Z+) - manual text

"DUAL ALGORITHM(R) - The Geo 4.0 is configured with 2 algorithms which allows you to choose which set of NDLs (No Decompression Limits) will be used for nitrogen/oxygen calculations and displays relating to Plan Mode and DTR (Dive Time Remaining) for NORM dives. You can select DSAT or Z+ prior to new dives. Also, the selection can be changed after dives once Desaturation Time decreases to 0:00, otherwise the selection will lock in for 24 hours after the last dive. DSAT was the original standard used by Oceanic in all of its dive computers until the dual function was implemented several years ago. It features NDLs that are based on exposures and test data which also formed validation for the PADI RDP. It imposes restrictions for repetitive Decompression dives which are considered more risky than general No Deco dives. Z+ (the Pelagic Z+ algorithm) performance is based on Buhlmann ZHL-16c. It features NDLs that are considerably more conservative than the DSAT version especially at shallower depths. To create even greater margins of safety with respect to decompression, a Conservative Factor as well as Deep and Safety Stops are available and can be activated for NORM No Decompression dives." [Geo4 p.21][geo4]. Word-for-word the same in [Veo4 p.13][veo4] and [PP4 p.12][pp4].

Setting: "5. ALGORITHM - This feature allows the choice of using the Z+ or DSAT algorithms, for nitrogen and oxygen calculations. ... NOTE: Changing the algorithm is blocked during 24 hours after NORM dives unless Desat time decreases to 0:00." Toggle shows "DSAT or Z+" [Geo4 p.32][geo4]; [Veo4 p.25][veo4]; [PP4 p.24][pp4]. Specification: "Buhlmann ZHL-16c based PZ+, or DSAT based, algorithm. - No Decompression limits closely follow PADI RDP. - Decompression in agreement with Buhlmann ZHL-16c and French MN90." [Geo4 p.62][geo4]; identical in [Veo4 p.58][veo4] and [PP4 p.46][pp4]. Glossary: "DSAT = Algorithm type", "Z+ = Algorithm type" [Geo4 p.64][geo4].

Geo 2 (2009-2011) wording: "You can select to use either the DSAT or the PZ+. The selection will lock in for 24 hours after the last dive. DSAT has been the standard used by Oceanic in all of its dive computers until this time. It features NDLs that are based on exposures and test data which also formed validation for the PADI RDP. It imposes restrictions for repetitive Deco dives, considered more risky. PZ+ (Pelagic Z+) performance is based on Buhlmann ZHL-16c. It features NDLs that are considerably more conservative especially at shallower depths." [Geo2 p.24][geo2]. On the Geo 2 a "(PZ+) icon" is shown on the surface/dive screens when PZ+ is selected, "no icon if DSAT is selected" [Geo2 p.17][geo2]; the Geo 4.0 icon list has no algorithm icon, but the ProPlus 4.0 icon list includes "14 Algorithm" [PP4 p.7][pp4].

What the manuals do not say: no gradient factors, no M-value details, no statement about repetitive-dive penalties for Z+. Secondary web sources (ScubaBoard threads, dealer blogs; see §13) describe DSAT as the more liberal model derived from the Spencer/Powell Doppler data behind the PADI RDP and Z+ as 15-20 % more conservative - **UNVERIFIED**, not from a primary document; the official oceanicworldwide.com pages returned HTTP 403 during this research.

### 6.3 Conservative Factor (CF)

"CF (CONSERVATIVE FACTOR) - When the CF is set to On, the dive time remaining, No Deco/O2 MIN, which are based on the algorithm and used for N2/O2 calculations and displays relating to Plan Mode, will be reduced to the values available at the altitude level that is 915 m (3,000 ft) higher than the actual altitude at activation. Refer to the charts in the back of this manual for dive times." [i300C p.13][i300c]; same in [Geo4 p.21][geo4]. Altitude appendix: "When the Conservative Factor is set ON, NDLs are calculated based upon the next higher 915 meter (3,000 foot) altitude. At sea level, calculations are based upon an altitude of 1828.8 m (6,000 feet). All adjustments for altitudes greater than 3,355 meters (11,000 feet) are then made to allowable dive times for 4,270 meters (14,000 feet)." [i300C p.61][i300c]; Geo 4.0: "When the Conservative Factor is set On, NDLs are calculated based upon the next higher 3,000 foot (915 meter) Altitude. At Sea Level, calculations are based upon an Altitude of 6,000 feet." [Geo4 p.58][geo4]. The PLAN screen shows the word "CF" in the top row when CF is on ("blank if CF turned OFF") [i300C p.19][i300c]; the Geo 4.0 has a dedicated "CF" icon [Geo4 p.8][geo4]. The SAT (desaturation) countdown "shall provide calculated time for Tissue Desatuation at sea level taking into consideration the CF (Conservative Factor) if it was set on" [i300C p.18][i300c].

Interpretation for the simulator (derived): CF ON at sea level = use the NDL column for 6,000 ft, i.e. the "1526 to 1830 m" / "5001 to 6000 ft" column of the tables below (1828.8 m = 6,000 ft falls in that band). Example (Z+): 18 m 0:50 -> 0:35; 30 m 0:16 -> 0:10. Example (DSAT): 60 ft 0:57 -> 0:38; 100 ft 0:19 -> 0:13. **UNVERIFIED** whether the firmware uses the 5001-6000 ft or the 6001-7000 ft column - the "+3,000 ft" sentence and the "6,000 feet" sentence do not pin this down.

### 6.4 Altitude compensation

"ALTITUDE SENSING AND ADJUSTMENT - Altitude (i.e., ambient pressure) is measured upon activation and every 15 minutes until a dive is made. - Measurements are only taken when the unit is dry. - Two readings are taken, the second reading 5 seconds after the first. The readings must be within 30 cm (1 foot) of each other to record that ambient pressure as the current altitude. - No adjustments are made during any time that the Wet Contacts are bridged. - When diving in high altitude waters from 916 to 4,270 meters (3,001 to 14,000 feet), the i300C automatically adjusts to these conditions providing corrected depth, and reduced NO DECO and O2 MIN (O2 saturation) times at intervals of 305 meters (1,000 feet). ... - The i300C will not function as a dive computer above 4,270 meters (14,000 feet)." [i300C p.61][i300c]. Spec: "Operational from sea level to 4,270 meters (14,000 feet) elevation - Measures ambient pressure every 30 minutes when inactive, upon activation, every 15 minutes while activated. - Does not measure ambient pressure when Wet. - Compensates for Altitudes above sea level beginning at 916 meters (3,001 feet) elevation and every 305 meters (1,000 feet) higher." [i300C p.65][i300c]. "If the i300C is activated at an elevation higher than 4,270 m (14,000 ft), it will immediately shutdown." [i300C p.3][i300c]. "Repetitive dives in a series should only be conducted at the same altitude as that of the first dive of that series." [i300C p.3][i300c].

ALTITUDE LEVELS table (verbatim) [i300C p.64][i300c]:

| DISPLAY | RANGE: METERS (FEET) |
|---|---|
| SEA | 915 (0 to 3,000) |
| EL2 | 916 to 1,525 (3,001 to 5,000) |
| EL3 | 1,526 to 2,135 (5,001 to 7,000) |
| EL4 | 2,136 to 2,745 (7,001 to 9,000) |
| EL5 | 2,746 to 3,355 (9,001 to 11,000) |
| EL6 | 3,356 to 3,965 (11,001 to 13,000) |
| EL7 | > 3,965 (13,000) |

(Geo 4.0 spec prints the same bands as "SEA = Level 1 ... L2 ... L7" while its body text and ALT 2 screen use "EL2 - EL7" [Geo4 p.26, p.60][geo4].) Note the NDL tables below use 12 one-thousand-foot columns, finer than the 7 displayed EL levels.

### 6.5 PLAN mode

"PLAN - ... This mode calculates dive depth and time limits. To do so, it accounts for any residual nitrogen, oxygen, surface intervals, the programmed gas mix, and PO2 alarm setting. Either NO DECO or O2 MIN limits are displayed, depending on whether nitrogen or oxygen levels will be the limiting factor. The time limit will display as 1-99 minutes, all times greater than 99 display as 99. NOTE: Depths exceeding the MOD (Maximum Operating Depth), if nitrox, or that have less than 1 minute allowed dive time will not be displayed." Figures: lead-in "CF / PLAN / 1.40 MAX PO2  32 FO2"; planner "30 m / 27 NO DECO / 33.9 m MAX (MOD)  32 FO2"; ADV "to increase depth", SEL "exit to Main Menu" [i300C p.19][i300c]. Geo 4.0 planner: ADV increases depth, MODE decreases depth [Geo4 p.26][geo4]. The planner is the easiest place in the simulator to show DSAT vs Z+ side by side.

### 6.6 NO DECO TIME LIMITS - Z+ (verbatim; i300C p.63 and Geo 4.0 p.61 are identical)

Source: "NO DECO TIME LIMITS" [i300C p.63][i300c]; "Z+ BASED NDLS (HR:MIN)" [Geo4 p.61][geo4]; also [i300C-r06 p.62][i300c-r06].

**Z+ ALGORITHM >> NDLS (HR:MIN) AT ALTITUDE (METRIC)**

| Depth (M) \ Altitude (meters) | 0 to 915 | 916 to 1220 | 1221 to 1525 | 1526 to 1830 | 1831 to 2135 | 2136 to 2440 | 2441 to 2745 | 2746 to 3050 | 3051 to 3355 | 3356 to 3660 | 3661 to 3965 | 3966 to 4270 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 9 | 3:37 | 2:41 | 2:31 | 2:23 | 2:16 | 2:10 | 2:04 | 1:59 | 1:54 | 1:50 | 1:43 | 1:37 |
| 12 | 1:55 | 1:27 | 1:21 | 1:15 | 1:12 | 1:08 | 1:05 | 1:03 | 1:00 | 0:58 | 0:55 | 0:54 |
| 15 | 1:08 | 0:55 | 0:53 | 0:51 | 0:49 | 0:47 | 0:44 | 0:42 | 0:39 | 0:37 | 0:36 | 0:34 |
| 18 | 0:50 | 0:39 | 0:37 | 0:35 | 0:33 | 0:32 | 0:30 | 0:28 | 0:26 | 0:24 | 0:23 | 0:22 |
| 21 | 0:36 | 0:28 | 0:26 | 0:24 | 0:23 | 0:21 | 0:20 | 0:19 | 0:18 | 0:17 | 0:16 | 0:16 |
| 24 | 0:27 | 0:20 | 0:19 | 0:18 | 0:17 | 0:16 | 0:15 | 0:14 | 0:13 | 0:12 | 0:11 | 0:11 |
| 27 | 0:20 | 0:16 | 0:15 | 0:13 | 0:12 | 0:11 | 0:11 | 0:10 | 0:09 | 0:09 | 0:09 | 0:08 |
| 30 | 0:16 | 0:12 | 0:11 | 0:10 | 0:09 | 0:09 | 0:09 | 0:08 | 0:08 | 0:07 | 0:07 | 0:07 |
| 33 | 0:13 | 0:09 | 0:09 | 0:08 | 0:08 | 0:07 | 0:07 | 0:07 | 0:07 | 0:06 | 0:06 | 0:06 |
| 36 | 0:10 | 0:08 | 0:07 | 0:07 | 0:07 | 0:06 | 0:06 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 |
| 39 | 0:09 | 0:07 | 0:06 | 0:06 | 0:06 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:05 | 0:04 |
| 42 | 0:08 | 0:06 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 |
| 45 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 |
| 48 | 0:06 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 |
| 51 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 |
| 54 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 |
| 57 | 0:05 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 |

**Z+ ALGORITHM >> NDLS (HR:MIN) AT ALTITUDE (IMPERIAL)**

| Depth (FT) \ Altitude (feet) | 0 to 3000 | 3001 to 4000 | 4001 to 5000 | 5001 to 6000 | 6001 to 7000 | 7001 to 8000 | 8001 to 9000 | 9001 to 10000 | 10001 to 11000 | 11001 to 12000 | 12001 to 13000 | 13001 to 14000 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 30 | 3:17 | 2:30 | 2:21 | 2:14 | 2:08 | 2:02 | 1:57 | 1:52 | 1:47 | 1:39 | 1:34 | 1:29 |
| 40 | 1:49 | 1:21 | 1:15 | 1:11 | 1:08 | 1:05 | 1:02 | 1:00 | 0:57 | 0:55 | 0:53 | 0:51 |
| 50 | 1:05 | 0:53 | 0:51 | 0:49 | 0:47 | 0:44 | 0:42 | 0:39 | 0:37 | 0:35 | 0:34 | 0:33 |
| 60 | 0:48 | 0:37 | 0:35 | 0:33 | 0:32 | 0:30 | 0:28 | 0:26 | 0:24 | 0:23 | 0:22 | 0:21 |
| 70 | 0:35 | 0:26 | 0:24 | 0:23 | 0:21 | 0:20 | 0:19 | 0:18 | 0:17 | 0:16 | 0:16 | 0:14 |
| 80 | 0:26 | 0:19 | 0:18 | 0:17 | 0:16 | 0:15 | 0:14 | 0:13 | 0:12 | 0:11 | 0:11 | 0:10 |
| 90 | 0:19 | 0:15 | 0:14 | 0:13 | 0:12 | 0:11 | 0:10 | 0:10 | 0:09 | 0:09 | 0:08 | 0:08 |
| 100 | 0:16 | 0:11 | 0:10 | 0:10 | 0:09 | 0:09 | 0:08 | 0:08 | 0:07 | 0:07 | 0:07 | 0:07 |
| 110 | 0:12 | 0:09 | 0:08 | 0:08 | 0:08 | 0:07 | 0:07 | 0:07 | 0:06 | 0:06 | 0:06 | 0:05 |
| 120 | 0:10 | 0:08 | 0:07 | 0:07 | 0:07 | 0:06 | 0:06 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 |
| 130 | 0:08 | 0:07 | 0:06 | 0:06 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:05 | 0:04 | 0:04 |
| 140 | 0:07 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 |
| 150 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:03 |
| 160 | 0:06 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 |
| 170 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 |
| 180 | 0:05 | 0:04 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 |
| 190 | 0:04 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 | 0:00 |

(The "0:00" at 190 ft / 13001-14000 ft is printed that way in both manuals.)

### 6.7 DSAT BASED NDLS (verbatim, Geo 4.0 p.60; not present in the i300C manual)

Source: [Geo4 p.60][geo4] (same tables in [Veo4][veo4] and [PP4][pp4] technical-data sections).

**DSAT BASED NDLS (HR:MIN) (IMPERIAL)**

| Depth (FT) \ Altitude (feet) | 0 to 3000 | 3001 to 4000 | 4001 to 5000 | 5001 to 6000 | 6001 to 7000 | 7001 to 8000 | 8001 to 9000 | 9001 to 10000 | 10001 to 11000 | 11001 to 12000 | 12001 to 13000 | 13001 to 14000 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 30 | 4:20 | 3:21 | 3:07 | 2:55 | 2:45 | 2:36 | 2:28 | 2:21 | 2:15 | 2:10 | 2:04 | 1:58 |
| 40 | 2:17 | 1:43 | 1:36 | 1:30 | 1:25 | 1:20 | 1:16 | 1:12 | 1:09 | 1:06 | 1:03 | 1:01 |
| 50 | 1:21 | 1:03 | 1:00 | 0:58 | 0:55 | 0:52 | 0:48 | 0:45 | 0:43 | 0:41 | 0:39 | 0:37 |
| 60 | 0:57 | 0:43 | 0:40 | 0:38 | 0:36 | 0:34 | 0:33 | 0:31 | 0:30 | 0:29 | 0:28 | 0:27 |
| 70 | 0:40 | 0:31 | 0:30 | 0:28 | 0:27 | 0:26 | 0:24 | 0:23 | 0:22 | 0:20 | 0:19 | 0:18 |
| 80 | 0:30 | 0:24 | 0:23 | 0:21 | 0:20 | 0:19 | 0:18 | 0:17 | 0:16 | 0:16 | 0:14 | 0:13 |
| 90 | 0:24 | 0:19 | 0:18 | 0:17 | 0:16 | 0:15 | 0:14 | 0:13 | 0:12 | 0:11 | 0:10 | 0:10 |
| 100 | 0:19 | 0:15 | 0:14 | 0:13 | 0:12 | 0:11 | 0:10 | 0:10 | 0:09 | 0:09 | 0:08 | 0:08 |
| 110 | 0:16 | 0:12 | 0:11 | 0:10 | 0:09 | 0:09 | 0:08 | 0:08 | 0:08 | 0:07 | 0:07 | 0:07 |
| 120 | 0:13 | 0:09 | 0:09 | 0:08 | 0:08 | 0:08 | 0:07 | 0:07 | 0:07 | 0:06 | 0:06 | 0:06 |
| 130 | 0:11 | 0:07 | 0:07 | 0:07 | 0:06 | 0:06 | 0:06 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 |
| 140 | 0:09 | 0:07 | 0:07 | 0:06 | 0:06 | 0:06 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:05 |
| 150 | 0:08 | 0:06 | 0:06 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 |
| 160 | 0:07 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 |
| 170 | 0:07 | 0:05 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:03 |
| 180 | 0:06 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 |
| 190 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 |

**DSAT BASED NDLS (HR:MIN) (METRIC)**

| Depth (M) \ Altitude (meters) | 0 to 915 | 916 to 1220 | 1221 to 1525 | 1526 to 1830 | 1831 to 2135 | 2136 to 2440 | 2441 to 2745 | 2746 to 3050 | 3051 to 3355 | 3356 to 3660 | 3661 to 3965 | 3966 to 4270 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 9 | 4:43 | 3:37 | 3:24 | 3:10 | 2:58 | 2:48 | 2:39 | 2:31 | 2:24 | 2:18 | 2:12 | 2:07 |
| 12 | 2:24 | 1:52 | 1:44 | 1:37 | 1:30 | 1:25 | 1:21 | 1:17 | 1:13 | 1:10 | 1:07 | 1:04 |
| 15 | 1:25 | 1:06 | 1:03 | 1:00 | 0:57 | 0:55 | 0:52 | 0:49 | 0:46 | 0:43 | 0:41 | 0:39 |
| 18 | 0:59 | 0:45 | 0:42 | 0:40 | 0:38 | 0:36 | 0:34 | 0:32 | 0:31 | 0:30 | 0:29 | 0:28 |
| 21 | 0:41 | 0:33 | 0:31 | 0:29 | 0:28 | 0:27 | 0:26 | 0:24 | 0:23 | 0:21 | 0:20 | 0:19 |
| 24 | 0:32 | 0:26 | 0:24 | 0:22 | 0:21 | 0:20 | 0:19 | 0:18 | 0:17 | 0:16 | 0:15 | 0:14 |
| 27 | 0:25 | 0:19 | 0:18 | 0:17 | 0:16 | 0:16 | 0:14 | 0:13 | 0:12 | 0:12 | 0:11 | 0:10 |
| 30 | 0:20 | 0:16 | 0:15 | 0:13 | 0:12 | 0:12 | 0:11 | 0:10 | 0:10 | 0:09 | 0:09 | 0:08 |
| 33 | 0:17 | 0:12 | 0:11 | 0:11 | 0:10 | 0:09 | 0:09 | 0:08 | 0:08 | 0:08 | 0:07 | 0:07 |
| 36 | 0:14 | 0:10 | 0:09 | 0:09 | 0:08 | 0:08 | 0:07 | 0:07 | 0:07 | 0:06 | 0:06 | 0:06 |
| 39 | 0:11 | 0:08 | 0:08 | 0:07 | 0:07 | 0:07 | 0:06 | 0:06 | 0:06 | 0:06 | 0:05 | 0:05 |
| 42 | 0:09 | 0:07 | 0:07 | 0:07 | 0:06 | 0:06 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:05 |
| 45 | 0:08 | 0:06 | 0:06 | 0:06 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:05 | 0:04 | 0:04 |
| 48 | 0:07 | 0:06 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 |
| 51 | 0:06 | 0:05 | 0:05 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 |
| 54 | 0:06 | 0:05 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 |
| 57 | 0:05 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:04 | 0:03 | 0:03 | 0:03 | 0:03 | 0:03 |

### 6.8 Derived: DSAT vs Z+ at sea level (first dive, no CF) - what the simulator should show

Derived from the tables above (minutes; delta = Z+ minus DSAT).

| Depth | DSAT | Z+ | Delta | | Depth | DSAT | Z+ | Delta |
|---|---|---|---|---|---|---|---|---|
| 9 m | 283 | 217 | -66 | | 30 ft | 260 | 197 | -63 |
| 12 m | 144 | 115 | -29 | | 40 ft | 137 | 109 | -28 |
| 15 m | 85 | 68 | -17 | | 50 ft | 81 | 65 | -16 |
| 18 m | 59 | 50 | -9 | | 60 ft | 57 | 48 | -9 |
| 21 m | 41 | 36 | -5 | | 70 ft | 40 | 35 | -5 |
| 24 m | 32 | 27 | -5 | | 80 ft | 30 | 26 | -4 |
| 27 m | 25 | 20 | -5 | | 90 ft | 24 | 19 | -5 |
| 30 m | 20 | 16 | -4 | | 100 ft | 19 | 16 | -3 |
| 33 m | 17 | 13 | -4 | | 110 ft | 16 | 12 | -4 |
| 36 m | 14 | 10 | -4 | | 120 ft | 13 | 10 | -3 |
| 39 m | 11 | 9 | -2 | | 130 ft | 11 | 8 | -3 |
| 42 m | 9 | 8 | -1 | | 140 ft | 9 | 7 | -2 |

This bears out the manual's sentence that Z+ NDLs are "considerably more conservative than the DSAT version especially at shallower depths" [Geo4 p.21][geo4]. Note that the i300C's DTR display caps at 99 min ("all times greater than 99 display as 99") [i300C p.32][i300c] while the Geo 4.0/Veo 4.0 display up to 599 [Geo4 p.37][geo4], so a 9 m DSAT dive shows "283" on a Geo 4.0 but would read "99" on an i300C-style display.

### 6.9 Oxygen exposure limits (verbatim) and O2 SAT model

"OXYGEN EXPOSURE LIMITS (from NOAA Diving Manual)" [i300C p.64][i300c]:

| PO2 (ATA) | MAX DURATION SINGLE EXPOSURE (MIN) | MAX TOTAL DURATION 24 HOUR DAY (MIN) |
|---|---|---|
| 0.60 | 720 | 720 |
| 0.70 | 570 | 570 |
| 0.80 | 450 | 450 |
| 0.90 | 360 | 360 |
| 1.00 | 300 | 300 |
| 1.10 | 240 | 270 |
| 1.20 | 210 | 240 |
| 1.30 | 180 | 210 |
| 1.40 | 150 | 180 |
| 1.50 | 120 | 180 |
| 1.60 | 45 | 150 |

"The limit for O2 SAT (100%) is set at 300 OTU (Oxygen Tolerance Units) per dive or 24 hour period. ... O2 SAT and O2 MIN values are inversely related; as the O2 SAT value increases the O2 MIN value decreases. When the O2 MIN value becomes less than the No Decompression calculations for the dive, DTR (Dive Time Remaining) will be controlled by O2 SAT and the O2 MIN value will be displayed as the DTR on the Dive Main screen, identified by the O2 MIN icon." [i300C p.12][i300c].

---

## 7. Surface mode: dive end, surface interval, FLY and SAT countdowns

### 7.1 When a dive ends

"SURFACING - Upon ascending to 0.9 m (3 ft) the i300C transitions to Dive Surface mode. For the first 10 minutes after a dive the i300C will continue to display the maximum depth and elapsed dive time. Once the surface time reaches 10 minutes the i300C will display the standard Dive Surface screen. NOTE: The i300C requires a 10 minute surface interval to record a subsequent dive as a separate dive in the Log. Otherwise, the dives will be combined and recorded as a single dive in the i300C memory." Figures: "< 10 MIN ON SURFACE" = "0:02 SURF / 32.3 m MAX 34 DIVE-T"; ">= 10 MIN ON SURFACE" = "0:11 SURF / 32 FO2" [i300C p.35][i300c]. Geo 4.0 Gauge/Free: "The dive will end and revert to Surface Mode upon ascent to 3 ft (0.9 m) of depth for at least 1 second." [Geo4 p.47, p.53][geo4]. Other 10-minute rules: "The GAS defaults to # 1 after 10 minutes on the surface." [i300C p.36][i300c]; "The Timer will cancel upon surfacing." [i300C p.34][i300c]; during the first 10 minutes "access to the Dive ALT screens is allowed ... then access to the Dive Surface Menu is allowed" [i300C p.43][i300c]; VGM shows the VGM Dive Main for 10 min, DV1 converts to VGM after 5 min on the surface [i300C p.39-40][i300c].

Dive start again for reference: "a dive will commence upon descending to 1.5 m (5 ft) for at least 5 seconds" [i300C p.32][i300c].

### 7.2 Surface interval display

"The Dive Main screen will display the SURF (Surface) time and the selected FO2 of the breathing gas. The SURF time displayed is the time since activation or the surface interval after a dive." [i300C p.17][i300c]. Range: "Surface Interval Time 0:00 to 23:59 hr:min, 1 minute" (Free: "0:00 to 59:59 min:sec, then 1:00 to 23:59 hr:min") [i300C p.66][i300c]. Gauge Surf Main shows "GAUG", surface interval, dive # and (first 10 min) previous max depth / dive time [i300C p.45][i300c]. Free Surf Main switches from the post-dive screen after 1 min instead of 10 [i300C p.50][i300c].

### 7.3 FLY / SAT (DESAT)

"FLY/SAT (DESAT) - The FLY/SAT screen displays the Time to Fly and the SAT (desaturation) countdown. The Time to Fly countdown shall begin counting from 23:50 to 0:00 (hr:min), 10 minutes after surfacing from a dive. The SAT (Desat) counter shall provide calculated time for Tissue Desatuation at sea level taking into consideration the CF (Conservative Factor) if it was set on. It shall begin counting down 10 minutes after surfacing from DIVE or FREE dives counting down from a maximum of 23 to 10 (hr only), then 9:59 to 0:00 (hr:min). When the SAT countdown reaches 0:00 (hr:min), which will generally occur prior to the FLY countdown reaching 0:00 (hr:min), the SAT time is to remain on the screen as 0:00 until the FLY counter shuts the i300C off, 24 hours after the last dive." Figures: "NO PREVIOUS DIVES" = "FLY / - -:- - / SAt -:- -"; "10 MIN AFTER A DIVE" = "FLY / 23:50 / SAt 9:59" with the note "9:- - displays if time > 9:59" [i300C p.18][i300c]. Spec: "Time to Fly & Desaturate 23:50 to 0:00 hr:min*, 1 minute, * starting 10 min after the dive" [i300C p.66][i300c]. Identical in Geo 4.0 ("FLY/DESAT ... 23:50 to 0:00 ... 10 minutes after surfacing") [Geo4 p.26][geo4]. So: Time-to-Fly is always a fixed 24 h from surfacing (23:50 shown when the counter first appears at +10 min); it is not a tissue computation. In VGM "The FLY countdown indicates time remaining before normal operation can resume" and the FLY/SAT screen itself is locked out [i300C p.40][i300c]. Gauge mode has a "FLY" screen only (no SAT) [i300C p.45][i300c].

### 7.4 24-hour behaviours (collected)

- Unit stays in Sleep for 24 h after a dive counting FLY/SAT, then shuts off [i300C p.7][i300c].
- Dive numbering resets to #1 "after the post dive 24 hour period has elapsed and the unit shuts off" [i300C p.19][i300c]; spec "Resets to Dive #1, upon diving (after 24 hours with no dives)" [i300C p.65][i300c].
- Gauge/Violation lockout 24 h [i300C p.29, p.40][i300c].
- Geo 4.0: gas settings "revert to the defaults when 24 hours elapse without conducting a dive" and the algorithm choice "will lock in for 24 hours after the last dive" unless Desat reaches 0:00 [Geo4 p.21, p.28][geo4].
- Battery removal keeps "settings and calculations for repetitive dives" [i300C p.59][i300c].

---

## 8. Nitrox

### 8.1 FO2 / PO2 settings (i300C)

- FO2: "a gas FO2 (%O2) between 21-100%" for up to "1, 2, or 3 gases", each with its own PO2 alarm, MOD displayed [i300C p.21][i300c]; spec "FO2 Set Point: Air, 21 to 100 %, 1 %" [i300C p.66][i300c]. (So not 21-50 %; the 50 % figure in the brief is the Geo 2 "FO2 50% Default" feature, §8.4.)
- PO2 alarm set-point range: not stated numerically in the manual's body text (the Set Gas PO2 Alarm screens just say "adjust PO2 setting" and show the MOD) [i300C p.21-22][i300c]. Aqua Lung's specification table as reproduced by a dealer: "Max PO2 setting 1.1 to 1.6" [lucas]; Oceanic Geo 2: "step upward through Set Points from 1.20 to 1.60" [Geo2 p.19][geo2]. Treat 1.1-1.6 in 0.1 steps as the i300C range - **UNVERIFIED against the manual** (the plan-screen figure shows "1.40 MAX PO2", the ALT 3 figure "1.40 PO2" [i300C p.18-19][i300c]).
- Default PO2 alarm: Geo 4.0 - "If you set a nitrox mix value for any gas the PO2 alarm value will default to 1.60 until changed." and "Default settings are FO2 Air with no PO2 alarm value for Gas 1, and OFF for Gas 2." [Geo4 p.28][geo4]. The i300C manual does not state its default (**UNVERIFIED**, likely the same firmware behaviour).
- "NOTE: When FO2 is set for AIR, oxygen related data (such as PO2, %O2, and O2 Saturation) will not be displayed at any time during the dive, on the surface, or in Plan Mode. Though these oxygen values will be tracked internally for use in any subsequent nitrox dives." [i300C p.21][i300c].
- PO2 value display range "0.00 to 5.00 ATA, 0.01 ATA" [i300C p.66][i300c].

### 8.2 O2 saturation display and alarms

There is **no O2 bar graph** on the i300C (two bar graphs only: ASC and N2 [i300C p.12][i300c]); O2 SAT is numeric on Dive ALT 3 ("% O2 saturation 0 - 100") and on surface ALT 3 [i300C p.18, p.33][i300c], and in Log Data 4 [i300C p.20][i300c].

"HIGH O2 SAT (OXYGEN SATURATION) - Warning >> at 80 to 99% (240 OTU) - Alarm >> at 100% (300 OTU). Warning - When O2 reaches the Warning Level, the audible alarm sounds and the O2 SAT (saturation) value will flash in place of the DTR. The DTR will be restored when the audible alarm is silenced. Alarm - If O2 SAT reaches the Alarm level, the audible alarm sounds and the UP message and the O2 SAT value will flash in place of DTR until surfacing. Warning During Deco - ... the O2 SAT value will flash in the middle of the screen. The Stop Depth and Stop Time moves to the lower portion of the screen. ... Alarm During Deco - ... When the audible alarm is silenced, the message MAX O2 SAT (100% O2 SAT) will flash (in place of max depth and TTS) until on the surface." [i300C p.42][i300c]. "Alarm On Surface - ... If O2 SAT is 100%, the value will alternate with SURF time on the Main Screen until it is < 100%, then it will be replaced with VGM (if Violation) or SURF time. - If you surface due to 100% O2 SAT without completing the Deco obligation, the full N2 Bar Graph and O2 SAT value (100) will flash with O2 SAT icons for the first 10 minutes, then operation will enter VGM (Violation Gauge Mode)." [i300C p.43][i300c].

"HIGH PO2 - Alarm >> at Set Point value, except in Deco then at 1.60 only. Alarm - If PO2 continues to increase and reaches the alarm set point, the audible alarm sounds again. The PO2 value, UP message, and Up Arrow icon will flash until PO2 decreases below the alarm set point. After the audible alarm is silenced, the PO2 will alternate with max depth." Figures: "33.8 m / UP ^ 6 NO DECO / 1.40 PO2 9 DIVE-T" (flashing) then "34.4 m MAX" alternating with the PO2. "PO2 During Deco - The PO2 alarm setting does not apply when in Deco. If PO2 reaches 1.60 while at a Deco Stop, the PO2 value (1.60) with icon will alternate with STOP message once each minute*. *PO2 on for 10 seconds, Deco Stop Depth/Time on for 50 seconds until PO2 decreases below 1.60, then PO2 will not be displayed." [i300C p.41][i300c]. (The r01 text says "sounds again" but describes no separate lower PO2 warning level - **UNVERIFIED** whether a pre-alarm PO2 warning exists; the Geo 4.0 alarm list has "PO2 Warning and Alarm" [Geo4 p.23][geo4].)

### 8.3 Gas switching

"OVERVIEW - All dives begin with GAS 1. - The GAS defaults to # 1 after 10 minutes on the surface. - Gas switches can only be made when a Dive Main screen is displayed and gases 2/3 are set on. - Gases cannot be switched while on the surface. - The Gas Menu cannot be accessed during the sounding of alarms. - If an alarm strikes while in the Gas Menu, the switch operation is terminated, reverting to the Dive Main screen." "If the current PO2 value is greater than 1.6, then a "HI PO2" warning not to switch will display. The i330C [sic] will maintain the current gas without switching. The diver may overide the i300C and force the gas switch by holding the SEL button during the "HI PO2" message." [i300C p.36][i300c]. Geo 4.0 shows the message "dont CHNG TO" instead and has 2 gases [Geo4 p.28, p.39][geo4]. Deco gas-switch prompt "USE 100" with 30-s confirmation window [i300C p.37][i300c] (§3.3).

### 8.4 The legacy "FO2 50 % default" rule (Geo 2 only; not in i300C / Geo 4.0)

Geo 2: "When the FO2 50% Default is set Off, FO2 will remain set at the last FO2 Gas 1 Set Point saved during that period of activation. ... When the FO2 50% Default is set On and FO2 for Gas 1 is set for a numerical value, 10 minutes on the surface after that dive the FO2 Gas 1 will be displayed as 50 and further dives will be calculated based on 50% O2 for oxygen calculations and 21% [for nitrogen] ... FO2 Gas 1 will continue to reset to the FO2 50% Default after subsequent repetitive dives until 24 hours elapse after the last dive, or the FO2 50% Default is set Off." [Geo2 p.19][geo2]. Neither the i300C nor the Geo 4.0 manual contains this setting; the Geo 4.0 instead reverts gas settings to defaults after 24 h without a dive and notes "Once either gas is set for nitrox, the other gas that is set for AIR will automatically be set to 21%. The AIR option will not be displayed as an FO2 setting until 24 hours elapse after the last dive." [Geo4 p.28][geo4].

---

## 9. Alarms

### 9.1 User-settable alarms (i300C SET AL) [i300C p.22-24][i300c]

| Alarm | Setting range | Triggered display (figure caption) |
|---|---|---|
| AUd AL (audible) | ON / OFF | - |
| dEPTH AL (max depth) | OFF or 10 - 100 m (30 - 330 ft) | "DEPTH AL TRIGGERED - flashing" (depth digits) |
| Edt AL (elapsed dive time) | 10 - 180 min (blank if OFF) | "EDT AL TRIGGERED - flashing" |
| N2 AL (nitrogen bar graph) | OFF or number of N2 bar graph segments | "N2 AL TRIGGERED - flashing" |
| dtr AL (dive time remaining) | OFF or 5 - 20 min | "DTR AL TRIGGERED - flashing" |

Geo 4.0 ranges are the same ("OFF, 30 - 330 ft (10 - 100 m)", "OFF, 10 - 180 min", TLBG segments, "OFF, 5 - 20 min") [Geo4 p.29-30][geo4]. Free mode has its own alarms: EDT every 30 s, three depth alarms "OFF or 10.0 - 100 m (30 - 330 ft)" set progressively deeper, CDT [i300C p.52-53][i300c].

Turn-pressure / air-integration alarms: the i300C has no tank-pressure input (the "2 Gauge" console pairs it with an analogue SPG [lucas][dipndive]); "Turn Gas Alarm" appears only in the trademark notice [i300C p.2][i300c]. The hose-integrated ProPlus 4.0 has a "Gas Time Remaining" icon [PP4 p.7][pp4] - not researched further here.

### 9.2 Audible / LED alarm patterns (i300C) - verbatim [i300C p.15][i300c]

"While operating in Dive or Gauge mode, the audible alarm will emit 1 beep per second for 10 seconds when alarms strike, unless it is set Off. During that time, the audible alarm can be acknowledged and silenced by pressing the SEL button. An LED Warning Light, on the lower end of the housing, is synchronized with and flashes as the audible alarm sounds. It will turn off when the alarm is silenced. The audible and LED alarm will not be active if the audible alarm is set to OFF (Set AL Menu setting). FREE Dive Mode has its own set of Alarms which emit 3 short beeps either 1 or 3 times which cannot be acknowledged or set off.

Situations that will activate the Dive/Gauge 10 second Alarm include - ** Items activate only in Dive mode.
- Descent deeper than the Depth Alarm set point selected.
- Dive Time Remaining at the set point selected**.
- Elapsed Dive Time at the set point selected.
- PO2 at the set point selected**.
- High O2 of 300 OTU (100%)**.
- N2 Bar Graph at the set point selected**.
- Ascent rate exceeds 9 m (30 FPM) for 8 seconds or more.
- Entry into Decompression Mode (Deco)**.
- Conditional Violation (above a required Deco Stop Depth for less than 5 minutes)**.
- Delayed Violation (above a required Deco Stop Depth for more than 5 minutes)**.
- Delayed Violation (a Deco Stop Depth greater than 18 m/60 ft is required)**.
- Delayed Violation (Max Operating Depth of 100 m/330 ft is exceeded in Dive or Free mode, or 120 m/399 ft in Gauge mode).

A single short beep (which cannot be disabled) sounds when -
- After 10 minutes on the surface after the Violation dive.

3 short beeps (which cannot be disabled) sound when -
- FREE Dive Elapsed Dive Time Alarm (3 beeps every 30 seconds if set On).
- FREE Dive Depth Alarms 1, 2, 3 (set sequentially deeper) - each 3 beeps 3 times.
- FREE Dive N2 Bar Graph Alarm (Caution zone, 4 segments) - 3 beeps 3 times.
- Entry into Deco during a FREE Dive (Violation) - 3 beeps 3 times.
- Free Dive Mode Countdown Timer reaches 0:00 - 3 beeps 3 times.

During the following Dive mode situations, the 10 second continuous tone will be followed by a 5 second steady beep that will not turn off when acknowledged -
- Ascent above a Deco Stop for more than 5 minutes.
- Deco requires a Stop Depth deeper than 18 m (60 ft) or deeper.
- On the Surface during a Conditional Violation."

Safety-stop and deep-stop arrival produce a single "beep" [i300C p.14][i300c]; the i300C manual does not describe a beep when a safety stop completes (**UNVERIFIED**).

Geo 4.0 version [Geo4 p.23][geo4]: "Events that emit (10) beeps >> each sound for 1/2 sec with 1/2 sec silence between beeps: Watch Daily Alarm; Watch CDT Alarm; DIVE, GAUGE - Ascent Rate too fast; DIVE, GAUGE - Depth Alarm; DIVE, GAUGE - Elapsed Dive Time Alarm; DIVE - Dive Time Remaining Alarm; DIVE - Tissue Loading Bar Graph Alarm; DIVE - entry into Decompression; DIVE - Conditional Violation; DIVE - Delayed Violations 1, 2; DIVE, GAUGE - Delayed Violation 3; DIVE, GAUGE - entry into Violation Gauge Mode; DIVE - PO2 Warning and Alarm; DIVE - O2 Warning and Alarm; DIVE - Gas Switch Alarm. Events that emit (3) short beeps: FREE - CDT Alarm; FREE - Tissue Loading Bar Graph Alarm; FREE - Violation, entry into Decompression; FREE - DA1 to DA3 Alarms." LED: "An LED warning light, on the side of the housing" [Geo4 p.23][geo4].

### 9.3 Display priority during alarms

"During a dive an audible alarm may sound and the priority of information displayed may change." [i300C p.32][i300c]; "Alarms such as Decompression will take priority over the Timer function and will display in its place during the alarms." [i300C p.34][i300c]; the Gas Menu is inaccessible while an alarm sounds [i300C p.36][i300c]. Depth/EDT/N2/DTR alarms flash the relevant digits [i300C p.23-24][i300c].

---

## 10. Oceanic comparison: Geo 4.0, Veo 4.0, ProPlus 4.0, Geo 2

### 10.1 Geo 4.0 (four-button watch-style, Dual Algorithm)

- Buttons: "The Geo 4.0 utilizes 4 control buttons called the MODE, SELECT, ADV. (Advance) and, LIGHT buttons." [Geo4 p.9][geo4]. Functions [Geo4 p.10-11][geo4]: MODE press "to move backward through the Main Menu / to decrease a setting"; SELECT press "to select/save an option or setting"; ADV. press "to access Alt screens / to advance through selections / to toggle or change setpoints / to increase a setting"; LIGHT press "to activate the backlight"; MODE hold "to switch between Watch Mode and the active diving mode, while on the Main screen / to exit a menu directly to the Main screen"; SELECT hold "to exit or step back to the previous screen or setting"; ADV. hold "to scroll or increase a setting value at a faster rate / to reset chronograph (Watch Mode)". Button positions: "upper/right (SELECT) and lower/left (ADV)" [Geo4 p.7][geo4]; the dive-main figure labels MODE upper-left, SELECT upper-right, ADV lower-left, LIGHT lower-right [Geo4 p.37][geo4].
- Modes: "Watch, Dive, Gauge, and Free Mode" [Geo4 p.7][geo4]; Set Mode shows "NOR, GAU, or FRE" [Geo4 p.34][geo4]. Watch mode has dual time, CDT (0:01-23:59), chronograph with 9 laps, daily alarm [Geo4 p.13-16][geo4].
- Power: shipped in "Deep Sleep" (wake with SELECT + ADV held 3 s; only the factory can put it back) [Geo4 p.7][geo4]; "Standby mode 10 minutes after Norm, Gauge, or Free Surface Modes have been activated" [Geo4 p.7][geo4]; battery "CR2430" [Geo4 p.57][geo4]; backlight "GLO (BACKLIGHT) DURATION ... 0, 5, or 10 sec" [Geo4 p.33][geo4]; LCD ("ensure that the LCD is clear and sharp in contrast") [Geo4 p.58][geo4] - it is a segment LCD with backlight, not OLED.
- Display icons [Geo4 p.8][geo4]: 1 Tissue Loading Bar Graph (left arc "TLBG"), 2 Conservative Factor "CF", 3 Daily Alarm Set (speaker), 4 Nitrox "NX", 5 Time ID, 6 Logbook (book), 7 Surface "SURF", 8 Depth ID "M/FT", 9 Time ID ("NDC / TAT / O2SAT / min"), 10 Variable Ascent Rate (right arc "VARI"), 11 Descend/Ascend/Stop arrows, 12 "DIVE", 13 "FO2", 14 Low Battery, 15 Gas # (tank icons 1, 2), 16 "MAX", 17 Bluetooth, 18 Deep Stop "DS", 19 Temperature, 20 "PO2"; plus "DUAL" (dual time), "AM/PM", "min sec". Round face, three rows of digits.
- Dive Main [Geo4 p.37][geo4]: top row depth; middle row DTR "0 - 599 min" with "NDC min or O2 min"; bottom row max depth "MAX" + "DS" + elapsed time "DIVE"; TLBG left, VARI right; gas tank icon bottom-left. ALT 1 = time/temperature; ALT 2 = nitrox (O2SAT, PO2, FO2).

```
   Geo 4.0 NO DECOMPRESSION NORM DIVE MAIN (figure values: 76 ft, NDL 21, max 117 ft, 33 min)
            .---------------------.
          .'   NX                  '.
         / T                      V  \
        | L .       7 6  FT       A . |
        | B #                     R . |
        | G #       2 1  NDC      I . |
        |   #            min          |
        |      1 1 7 DS   3 3  min    |
        |      MAX FT  [1]   DIVE     |
         '---------------------------'
```
- Deco: "TAT (Total Ascent Time) ... 0 - 999, then - - if greater than 999 min" [Geo4 p.40][geo4]; otherwise CV/DV1/DV2/DV3/VGM text identical to the i300C with imperial-first wording [Geo4 p.40-42][geo4].
- Gases: 2 ("whether to use 1 or 2 gases") [Geo4 p.28][geo4]; i300C has 3.
- Safety stop adds "TMR" option [Geo4 p.32][geo4]; History shows "total dive hours, 0 - 19999 / total # of dives, 0 - 999" [Geo4 p.34][geo4]; hidden "Clear Data" reset for rental fleets reachable from the SN screen [Geo4 p.35][geo4]; download memory 4 h at 2 s, 32 h at 15 s, 64 h at 30 s, 128 h at 60 s [Geo4 p.34][geo4].
- Dual Algorithm and NDL tables: §6.2, §6.6-6.7.

### 10.2 Veo 4.0 (two-button, the i300C's dual-algorithm twin)

"The VEO 4.0 is an easy to use dive computer utilizing a two button interface. Divers may choose between three modes of functionality consisting of Dive, Gauge, and Free Modes." [Veo4 p.7][veo4]; "utilizes 2 control buttons called the ADV (Advance) and SEL (Select) buttons" with the same function table as the i300C [Veo4 p.9-10][veo4]; same activation / sleep text (10 min sleep, 2 h off, 24 h FLY/SAT) [Veo4 p.7][veo4]. Dual Algorithm [Veo4 p.13][veo4]; "5. ALGORITHM ... Z+ or DSAT ... Changing the algorithm is blocked during 24 hours after Dive Mode dives unless Desat time decreases to 0:00." [Veo4 p.25][veo4]. Display icons [Veo4 p.8][veo4]: mode words "GAUGE FREE SURF" across the top of the dome, TLBG left arc, VARI right arc, "NO DEC" / "DEC" (not "NO DECO"), "TTS", "O2 SAT min", Bluetooth, battery, gas tank "1 2 3", "FO2 PO2 MAX FT M", boxed "STOP" with arrows and "DECO" below, "min PO2 DIVE FO2 sec". Dive Main [Veo4 p.31][veo4]: "64 FT" / "27 NO DEC min" / "117 MAX FT  33 DIVE min", "Dive Time Remaining 0 - 599 min". Same dome-shaped LCD as the i300C but with the bar graphs mirrored (TLBG left, VARI right) and the DTR range 0-599. Specification line identical to Geo 4.0 ("Buhlmann ZHL-16c based PZ+, or DSAT based, algorithm") [Veo4 p.58][veo4]. Recommendation: use the Veo 4.0 manual as the behavioural reference for a "two-button Pelagic computer with DSAT/Z+ switch", and the i300C manual for Aqua Lung-specific labels (N2/ASC captions, "NO DECO", TTS 0-99, DTR 0-99).

### 10.3 ProPlus 4.0 (hose air-integrated console, two buttons)

"The ProPlus 4.0 is an easy to use dive computer utilizing a two button interface. Divers may choose between either Dive or Gauge Mode." [PP4 p.6][pp4]; "2 control buttons called the ADV (Advance) and SEL (Select)" [PP4 p.7][pp4]. Icons include "Gas Time Remaining", "Time To Fly", "Algorithm" [PP4 p.7][pp4]. Dual Algorithm text identical ("for NORM dives") [PP4 p.12][pp4]; "5: ALGORITHM ... Z+ or DSAT" [PP4 p.24][pp4]; spec identical [PP4 p.46][pp4]; Dive/Gauge "Max Depth 0 to 330 FT (100 M)" [PP4 p.47][pp4]. No Free mode.

### 10.4 Geo 2 (2009-2011 generation) - where several of the brief's assumptions come from

- Buttons: "The Interactive Control Console utilizes 4 control buttons ... M, S, A, and L. Upper/Left >> M (mode, minus) - Upper/Right >> S (select, save) - Lower/Left >> A (advance, access) - Lower/Right >> L (light)" [Geo2 p.5][geo2]. Feature list: "4 Operating Modes, 2 Nitrox Gas Mixes, 28 Warnings/Alarms, Dual Watch Time, Dual Algorithm, No Deco Deep Stop, No Deco Safety Stop, Gauge Depths to 400 FT/120 M, Gauge Dive Run Timer, Altitude Compensation, NDL Conservative Factor, Variable Ascent Rate, PC Settings Upload/Data Download, Audible Alarm with flashing LED, User Replaceable Battery, User Upgradeable Firmware" [Geo2 p.5][geo2].
- Algorithm: DSAT or PZ+, "lock in for 24 hours after the last dive"; "A (< 2 sec) - to toggle between DSAT and PZ+" in Set U; "(PZ+) icon, if selected, no icon if DSAT is selected" [Geo2 p.17, p.24][geo2]; NDL charts titled "PZ+ ALGORITHM >> NDLS (minutes) at ALTITUDE" and "DSAT ALGORITHM >> NDLS (minutes) at ALTITUDE" (in minutes rather than hr:min) [Geo2 p.44][geo2] - not copied here.
- Two-speed ascent rule at 60 ft / 18 m (§4.2) [Geo2 p.24][geo2].
- "Set FO2 50% Default" (§8.4) [Geo2 p.19][geo2]; PO2 set points "from 1.20 to 1.60" [Geo2 p.19][geo2].
- Safety stop cancel rule "If you ascend 2 FT (0.6 M) shallower than the SS Depth for 10 seconds prior to completing it, the SS will be canceled for the remainder of that dive." [Geo2 p.25][geo2] - dropped in the 4.0 manuals.

### 10.5 Quick differences table

| Item | i300C | Veo 4.0 | Geo 4.0 | Geo 2 |
|---|---|---|---|---|
| Buttons | 2: ADV, SEL [i300C p.9][i300c] | 2: ADV, SEL [Veo4 p.9][veo4] | 4: MODE, SELECT, ADV., LIGHT [Geo4 p.9][geo4] | 4: M, S, A, L [Geo2 p.5][geo2] |
| Algorithm | Z+ only [i300C p.13][i300c] | DSAT or Z+ [Veo4 p.13][veo4] | DSAT or Z+ [Geo4 p.21][geo4] | DSAT or PZ+ [Geo2 p.24][geo2] |
| Modes | Dive (Air/EAN), Gauge, Free [i300C p.29][i300c] | Dive, Gauge, Free [Veo4 p.7][veo4] | Watch, Norm, Gauge, Free [Geo4 p.7][geo4] | Watch, Norm, Gauge, Free [Geo2 p.5][geo2] |
| Gases | 3 [i300C p.21][i300c] | 3 (icon 1 2 3) [Veo4 p.8][veo4] | 2 [Geo4 p.28][geo4] | 2 [Geo2 p.5][geo2] |
| Bar graphs | ASC left, N2 right [i300C p.12][i300c] | TLBG left, VARI right [Veo4 p.31][veo4] | TLBG left, VARI right [Geo4 p.20][geo4] | TLBG left, VARI right [Geo2 p.24][geo2] |
| NDL annunciator | "NO DECO" / "DECO" [i300C p.8][i300c] | "NO DEC" / "DEC" [Veo4 p.8][veo4] | "NDC" [Geo4 p.8][geo4] | - |
| DTR range | 0-99 min [i300C p.66][i300c] | 0-599 [Veo4 p.59][veo4] | 0-599 [Geo4 p.63][geo4] | - |
| Ascent-time label | TTS 0-99 [i300C p.66][i300c] | TTS 0-999 [Veo4 p.59][veo4] | TAT 0-999 [Geo4 p.63][geo4] | - |
| Ascent limit | 9 m/min all depths [i300C p.13][i300c] | 9 m/min [Veo4 p.13][veo4] | 9 m/min [Geo4 p.21][geo4] | 18 m/min below 18 m, 9 m/min above [Geo2 p.24][geo2] |
| Safety stop | ON/OFF; 3 or 5 min; 3-6 m [i300C p.26][i300c] | ON/OFF/TMR [Veo4 p.14][veo4] | ON/OFF/TMR [Geo4 p.32][geo4] | ON/OFF/Timer [Geo2 p.25][geo2] |
| Battery | CR2450 [i300C p.65][i300c] | (not checked) | CR2430 [Geo4 p.57][geo4] | (not checked) |

---

## 11. Notes for the simulator (derived from the above)

State machine (Dive mode): SURFACE -> (1.5 m for 5 s) DIVE/NO-DECO -> (NDL = 0) DECO -> (above stop) CV -> (> 5 min above stop) DV1; DECO -> (stop 18-21 m) DV2; DECO -> (stop > 21 m) VGM; any -> (> 100 m) DV3; DIVE -> (0.9 m) SURFACE (post-dive window 10 min; DV1 surfaced -> VGM after 5 min; VGM 24 h lockout; Gauge dive -> Gauge lock 24 h). Sources: §3, §7.

Constants to encode: dive start 1.5 m / 5 s; dive end 0.9 m; safety-stop trigger = set depth + 1.5 m after exceeding 9 m, hide if > set depth + 3 m for 10 s, cancel at 0.9 m for 10 s; deep stop at 1/2 max depth after > 24 m, 2:00 countdown, +/-3 m window, disabled past 57 m / deco / O2 >= 80 % / PO2 alarm; deco stop zone = within 3 m below stop; CV penalty 1.5 min per minute above stop; DV1 after 5 min; DV2 18-21 m; VGM > 21 m; DV3 > 100 m; ascent 9 m/min, beeper after 8 s; alarm = 1 beep/s for 10 s + LED, SEL acknowledges; FLY 23:50 from +10 min; SAT from tissues (max 23 h), CF-aware; altitude bands every 305 m from 916 m to 4,270 m; CF = NDLs of the 6,000 ft column at sea level (§6.3 caveat). NDL look-up tables: §6.6 (Z+) and §6.7 (DSAT) - these are square-profile first-dive limits; the real units run a compartment model continuously ("The i300C monitors multiple theoretical nitrogen compartments simultaneously" [i300C p.13][i300c]; the ProPlus 4.0 text says "twelve different nitrogen compartments" [PP4 p.12][pp4]). A ZHL-16C implementation whose sea-level NDLs are tuned to the Z+ table, and a second parameter set tuned to the DSAT table, is the practical approach; the tables are the acceptance test.

Display rendering: the i300C/Veo 4.0 dome LCD has three digit rows plus two 5-segment arcs; the Geo 4.0 is a round face with the same three rows. Label sets differ (§2.1, §10.1, §10.2). Text words are spelled with 7-segment glyphs ("LASt", "SAt", "GAUG", "SLO", "diVE", "FrEE", "FrESH", "dEPTH", "USE").

---

## 12. Items marked UNVERIFIED (collected)

1. Exact gesture for "exit a menu directly to the main screen" (ADV + SEL together; press vs hold) - figure only [i300C p.10][i300c].
2. Whether the NDL digits flash as NDL approaches 0 in Dive mode - not described (only the DTR/N2 alarms flash) [i300C p.23-24][i300c].
3. Colour zones on the bar graphs - monochrome LCD, no bezel colours described.
4. Deco stop-depth increment (3 m / 10 ft inferred from figures showing 6 m and 18 m stops).
5. i300C PO2 alarm set-point range 1.1-1.6 - from a dealer copy of the Aqua Lung spec table [lucas], not from the manual; default value (1.60 on Geo 4.0 [Geo4 p.28][geo4]) not stated for the i300C.
6. Whether a pre-alarm PO2 "warning" level exists on the i300C [i300C p.41][i300c].
7. Which NDL column CF ON selects at sea level (5,001-6,000 ft vs 6,001-7,000 ft) [i300C p.13, p.61][i300c].
8. Gauge-mode maximum functional depth: 100 m (spec) vs "120 m/399 ft in Gauge mode" (alarm list) [i300C p.15, p.66][i300c].
9. Whether completing a safety stop produces a beep.
10. Secondary-source characterisations of DSAT (Spencer/Powell Doppler data, PADI RDP) and "Z+ 15-20 % more conservative" - web forums/dealers only; Oceanic's official pages were unreachable (HTTP 403).
11. Battery type of the Veo 4.0 and Geo 2 - not checked.
12. The brief's "Doc. No. 12-7906" - not found; the i300C manual is 12-7874.

---

## 13. Sources

Primary documents (downloaded and read in full unless noted):

- [i300c]: Aqua Lung i300C Dive Computer Owner's Manual, Doc. 12-7874-r01 (10/2/17), English, 68 pages - https://files.plytix.com/api/v1.1/file/public_files/pim/assets/5b/4c/98/63/63984c5b1af94d0001f4a7f1/texts/36/2e/58/66/66582e3623bf48a9f2730df7/I300C_OWNERS_MANUAL_UK.pdf
- [i300c-r06]: Aqua Lung i300C Owner's Manual, Doc. 12-7874-r06 (11/27/17), via ManualsLib (pages 13, 20, 62, 63 checked; page numbering is one lower than r01 from the NDL appendix onward) - https://www.manualslib.com/manual/2341207/Aqua-Lung-I300c.html
- [geo4]: Oceanic GEO 4.0 Operating Manual, Doc. No. 12-5670-r01 (2/27/18), 66 pages, hosted by Huish Outdoors (Oceanic's parent) - https://www.huishoutdoors.com/wp-content/uploads/2019/03/Geo-4.0-Manual.pdf (mirrors: https://divers-nextjs-commerce.cdn.prismic.io/divers-nextjs-commerce/efe2d61d-d53b-4676-99f8-39f5814bff0d_Oceanic+Geo+4.0+Wrist+Dive+Computer+Owner's+Manual.pdf ; https://www.manualslib.com/manual/1545639/Oceanic-Geo-4-0.html)
- [veo4]: Oceanic VEO 4.0 Operating Manual, Doc. No. 12-5671-r01 (3/20/19), 62 pages (sections read: basics, buttons, icons, dive features, set utilities, dive main, specifications) - https://www.oceanicworldwide.com/us/media/wysiwyg/manuals/Veo_4-0_operating_manual.pdf (mirror: https://www.manualslib.com/manual/1570449/Oceanic-Veo-4-0.html)
- [pp4]: Oceanic PROPLUS 4.0 Operating Manual, Doc. No. 12-5669-r01 (1/18/19), 50 pages (sections read: basics, icons, dual algorithm, set algorithm, specifications) - https://www.oceanicworldwide.com/media/wysiwyg/manuals/pp4_0-manual.pdf (mirror: https://www.manualslib.com/manual/1531525/Oceanic-Proplus-4-0.html)
- [geo2]: Oceanic GEO 2 Operating Manual, Doc. No. 12-5210-r03 (7/5/11), 48 pages (sections read: features/buttons, VARI, algorithm, CF, deep stop, safety stop, FO2 default, PO2 set points) - https://www.huishoutdoors.com/wp-content/uploads/2017/05/GEO2_Manual.pdf (earlier r02 on Oceanic's site: https://www.oceanicworldwide.com/us/media/wysiwyg/manuals/12-5210-r02_Eng.pdf)

Secondary / supporting web pages:

- [lucas]: Lucas Divestore, "AquaLung i300C dive computer" (reproduces Aqua Lung's spec table: Algorithm Z+, Max PO2 setting 1.1 to 1.6, FO2 21-100 %, 2 buttons, 3 gases, 4 modes) - https://www.lucasdivestore.com/en/aqualung-i300c.html
- [dipndive]: DIPNDIVE, "Aqua Lung i300C Dive Computer" ("Buhlmann ZHL-16C based PZ+", "4 operating modes. Air, Nitrox, Gauge (with run timer)", "3 Nitrox mixes to 100% O2") - https://dipndive.com/aqua-lung-i300c-wrist-dive-computer.html
- Aqua Lung official product page (returned HTTP 429 during research; search snippet lists "Algorithm: Z+", "max PO2 1.1 to 1.6") - https://www.aqualung.com/products/i300c-2-gauge-dive-computer
- Huish Outdoors Oceanic user-manual index (HTTP 403 during research; lists Geo 4.0 / ProPlus 4.0 PDFs) - https://www.huishoutdoors.com/user-manuals/oceanic-user-manuals/
- Oceanic "Computer Innovations" and Veo 4.0 product pages (HTTP 403 during research; search snippets: "Pelagic DSAT (Spencer/Powell data basis) or Pelagic Z+ (Buhlmann ZHL-16C data basis)") - https://www.oceanicworldwide.com/innovation/innovation-computer/ ; https://www.oceanicworldwide.com/product/computers/veo-4-0/
- ScubaBoard threads on DSAT vs Z+ (forum opinion only) - https://scubaboard.com/community/threads/dsat-or-z-algorithm.485660/ ; https://scubaboard.com/community/threads/oceanic-dual-algorithm.596648/ ; https://scubaboard.com/community/threads/new-computer-which-algorithm.499240/
- Research paper citing Pelagic Z+ as "considerably more conservative, especially at shallower depths" (abstract page only) - https://www.researchgate.net/publication/271080038_Decompression_management_by_43_models_of_dive_computer_single_square-wave_exposures_to_between_15_and_50_metres'_depth
- Other copies of the i300C manual not used for quotations: French r06 https://www.boutiqueplongequilibre.com/img/cms/i300C.pdf ; manuals.plus https://manuals.plus/m/bb8dbba61089e65dc21d5cee91ffe796f529a5cb167ea9a081fea790769d681d ; original (non-C) i300 manual Doc. 12-7823 https://www.manualslib.com/manual/1056649/Aqua-Lung-I300.html

[i300c]: https://files.plytix.com/api/v1.1/file/public_files/pim/assets/5b/4c/98/63/63984c5b1af94d0001f4a7f1/texts/36/2e/58/66/66582e3623bf48a9f2730df7/I300C_OWNERS_MANUAL_UK.pdf
[i300c-r06]: https://www.manualslib.com/manual/2341207/Aqua-Lung-I300c.html
[geo4]: https://www.huishoutdoors.com/wp-content/uploads/2019/03/Geo-4.0-Manual.pdf
[veo4]: https://www.oceanicworldwide.com/us/media/wysiwyg/manuals/Veo_4-0_operating_manual.pdf
[pp4]: https://www.oceanicworldwide.com/media/wysiwyg/manuals/pp4_0-manual.pdf
[geo2]: https://www.huishoutdoors.com/wp-content/uploads/2017/05/GEO2_Manual.pdf
[lucas]: https://www.lucasdivestore.com/en/aqualung-i300c.html
[dipndive]: https://dipndive.com/aqua-lung-i300c-wrist-dive-computer.html
