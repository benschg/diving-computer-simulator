# Shearwater dive computers – reference for the training simulator

Primary target: **Shearwater Peregrine** (recreational, 2 buttons, 2.2" colour LCD).
Secondary: **Perdix 2** (same firmware family, 2 buttons) and **Teric / Tern / Tern TX** (round AMOLED watches, 4 buttons).

Every factual statement below carries a source tag `[XX pN]` (= document XX, PDF page N). Full URLs are in the **Sources** section at the end. Anything not found in an official Shearwater document is marked **UNVERIFIED**.

## 0. Document set, firmware versions and an important caveat

| Tag | Document | Doc. no. / revision | Firmware the manual describes | Current firmware per shearwater.com support page (fetched 2026-10-09) |
|---|---|---|---|---|
| **PM** | Peregrine Operating Instructions (metric) | 16001-SI-RevB (2020-07-06) [PM p2] | V77 [PM p5] | **V89** (Peregrine support page) |
| **PRN** | Peregrine Firmware v89 Release Notes (cumulative, v29…v89) | Rev A, 2025-09-22 [PRN p1] | – | – |
| **PTX** | Peregrine TX Operating Instructions | 16004-RevC (2024-04-23) [PTX p1] | V98 [PTX p5] | V102 (Peregrine TX support page) |
| **P2R** | Perdix 2 Recreational Modes Operating Instructions | 13300-REC-RevC (2022-06-30) [P2R p2] | – | V102 (Perdix 2 support page) |
| **P2T** | Perdix 2 Technical Modes Operating Instructions | 13301-Tec-RevB (2022-05-25) [P2T p1] | – | V102 |
| **P2RN** | Perdix 2 / Perdix AI / NERD 2 / Petrel 3 / Peregrine TX Firmware v102 Release Notes | Rev A, 2025-11-10 [P2RN p1] | – | – |
| **TM** | Teric Operating Instructions | 15001-SI-RevH (2024-09-09) [TM p88] | V19 [TM p6] | V37 (Teric support page) |
| **TRN** | Teric & Tern Firmware v37 Release Notes (cumulative) | Rev A, 2026-01-16 [TRN p1] | – | – |
| **TXM** | Tern TX Operating Instructions | 15302-RevB (2023-12-07) [TXM p6] | V25 [TXM p6] | V36 (Tern TX support page) |
| **CMP** | Shearwater "Dive Computer Comparison" sheet (Peregrine / Peregrine TX / Tern / Tern TX / Teric / Perdix 2) | 2024 | – | – |
| **PPROD** | Peregrine product page (shearwater.com/products/peregrine) | web | – | – |
| **FLY** | Shearwater blog "Flying After Diving" (2015-08-19) | web | – | – |

**Caveat 1 – the Peregrine manual is old.** The only English Peregrine manual Shearwater publishes (RevB, 2020, firmware V77) predates several features that current Peregrine firmware (V89) has. Those features are documented in the release notes [PRN] and, because the Peregrine, Peregrine TX and Perdix 2 "share a common firmware base" [PRN p3, P2RN p2], in the newer Peregrine TX and Perdix 2 recreational manuals, whose recreational-mode chapters are near-verbatim copies of the Peregrine manual (same screenshots, same wording). Where this report uses PTX/P2R to fill a Peregrine gap it says so.

**Caveat 2 – Gradient-factor presets changed in late 2025 on the *other* models.** Firmware v102 (2025-11-10) for Perdix 2 / Perdix AI / NERD 2 / Petrel 3 / Peregrine TX and v36 (2025-12) for Teric / Tern / Tern TX changed the default GF Low to 50 everywhere: rec presets are now **50/75 (High), 50/85 (Med), 50/95 (Low)**, custom default 50/85, tec default 50/70 (previously 30/70) [P2RN p1; TRN p2–3]. The **original Peregrine's** latest firmware is v89 (2025-09-22) and its release notes contain no such change [PRN p1–2], so the Peregrine still uses **Low 45/95, Med 40/85, High 35/75** as printed in its manual [PM p39]. A simulator should treat the preset *numbers* as a per-model/per-firmware parameter.

---

## 1. Peregrine – physical and UI

### 1.1 Hardware facts

* Full-colour 2.2" LCD, QVGA, "always on LED backlight" [PM p4, p50]; product page: "Screen Resolution: 320 x 240 QVGA", "Display Size: 5.59cm / 2.2"" [PPROD].
* Two buttons. Manual names them **MENU (Left)** and **FUNC (Right)** [PM p7]. Product page: "Two Button Interface … 316 stainless steel buttons", "User friendly 2-button interface" [PPROD]. (The Perdix 2 manual calls its buttons "Two titanium piezo-electric buttons" [P2R p7]; the Peregrine manual/product page never use the word "piezo" – **UNVERIFIED** whether the Peregrine's buttons are piezo-electric; they are stainless steel per the product page.)
* Depth rating 120 m / 394 ft [PM p50]; sensor calibrated 0.3–17 bar; accuracy ±20 mbar at surface (~±0.2 msw), ±50 mbar at 120 msw [PM p50]; surface pressure range 500–1040 mbar [PM p50].
* Rechargeable Li-ion, wireless (Qi) charging, ~2 h charge, 30 h at medium brightness, 3 months standby [PM p47, p50]; product page: "Battery Capacity (approx): 3.4 Wh" [PPROD].
* Size 77 × 68 × 25 mm; weight 125 g computer only / 180 g with silicone strap [PM p50] (product page says 122 g [PPROD]).
* Modes: Air, Nitrox (single gas), 3 GasNx (3-gas nitrox), Gauge [PM p5]. 3 OC gases, no compass, no air integration; vibration (haptic) alerts, Bluetooth LE [CMP; PM p4].
* Decompression model: Bühlmann ZHL-16C with Gradient Factors ("3 presets or custom GF low/high") [PM p50].
* "No lockout for violating deco stops" [PM p4].

### 1.2 Buttons – what each does

From the manual [PM p7]:

> **MENU Button (Left)** – From the main screen > Cycles through menus. In a menu > Cycles through menus and options.
> **FUNC Button (Right)** – From the main screen > Cycles through info screens. In a menu > Selects menu or option.

The newer sibling manual states the same three-state table more explicitly (identical firmware base) [PTX p7]:

| Button | From main screen | In a menu | Editing a setting |
|---|---|---|---|
| MENU (left) | Brings up menu | Moves to the next menu item | Changes the setting's value |
| FUNC (right) | Steps through info screens | Performs command or starts editing | Saves the setting's value |

* Turning on: "press both buttons together" [PM p6]; "Apart from turning on, all Peregrine operations are simple single button presses" [PM p7]. "No other operation requires pressing both buttons at the same time" [PTX p7].
* **Button hints**: whenever a menu is open, a hint row at the bottom labels the two buttons (e.g. `Change` over MENU, `Save` over FUNC on the Brightness editor) [PM p7].
* Either button dismisses a primary notification ("The notification is dismissed by pressing either button") [PM p19]; since v65 "Either button now clears a warning or error" [PRN p25].
* Menus time out after 10 s with no button press: saved items are kept, an edit in progress is discarded [PM p31]. Info screens also time out after 10 s (except the Tissues screen) [PM p14].
* Official support-page tip (useful for the simulator's info-screen count): "from the main screen press the right side button 8-10 times until you see the S/N displayed (lower left) and Firmware (lower right)" [Peregrine support page FAQ].

### 1.3 Turning on, auto-on, dive start / dive end

* Manual on: both buttons [PM p6]. Splash screen for 2 s (custom text/image possible) [PM p6].
* **Auto-on**: "turns on automatically when the absolute pressure is greater than 1100 millibar … when at sea level, the Peregrine will automatically turn on and enter dive mode when about 0.9 m (3 ft) underwater"; at 2000 m altitude that is about 3 m [PM p6]. Shearwater says not to rely on it [PM p6].
* **Dive start / end depth**: not in the RevB Peregrine manual, but the specification tables of the same firmware family give "Depth of dive start: 1.6 m of sea water; Depth of dive end: 0.9 m of sea water" [PTX p68; P2R p69] (Teric: "1.6m (adjustable in Freedive Mode)" / "0.9m" [TM p89]). Treat 1.6 m / 0.9 m as the Peregrine values (**inferred from sibling manuals**).
* **End Dive Delay**: "The Peregrine will automatically exit dive mode once 1 minute (default End Dive Delay setting) has been spent at the surface" [PM p32]; range 20 s to 600 s, default 60 s, in System Setup > Adv. Config [PM p42]. While still in dive mode at the surface the top-level "Turn Off" item is replaced by **"End Dive"**, which ends the dive immediately [PM p32]. "Turn Off" does not appear during a dive nor until the End Dive Delay has expired [PM p32].
* Dive time "begins and ends counting automatically when you dive" [PM p11].
* Surface pressure is the minimum of the 10-minute pressure history sampled every 15 s while off, fixed at turn-on; altitude is therefore automatic (Altitude setting is fixed to "Auto") [PM p18, p40, p41].
* Turn Off = sleep; tissues are retained for repetitive diving [PM p32]. Tissue-reset events: Gauge-mode change, firmware update, dead battery, Reset to Defaults [PM p30, p38, p44, p48, p41].

### 1.4 Dive modes and the "simplified" question

There is no "Simplified vs Full display" *setting* on the Peregrine. The simplification is per **mode** [PM p9]:

* **Air** – "Air (21% oxygen) only, not switchable underwater", "Simplified Info Rows", "Enhanced warnings". Default mode [PM p9, p38].
* **Nitrox (Single Gas)** – "Single Gas Nitrox up to 40% oxygen", "No gas switching underwater", "Simplified Info Rows", "Enhanced warnings" [PM p9].
* **3 GasNx** – "Three programmable gases", "Support for gas switching", "Nitrox up to 100%" (gas editor range is 21–99 % O2 [PM p40]) [PM p9].
* **Gauge** – depth/timer only, "No tissue tracking", "No decompression information", own layout [PM p9, p30].

("Enhanced warnings" is not defined further in the manual – **UNVERIFIED** what differs.) All modes share the same bottom-row customization [PM p13]. The Perdix 2 additionally distinguishes a "large-font layout" for recreational modes from a "dense layout" for OC Tec / CC/BO [P2R p8]; the Teric has an explicit **Big / Standard** layout setting (see §10).

### 1.5 Main dive screen – precise layout

The manual divides the screen into three fixed areas [PM p10]:

1. **Basic Dive Info** (left column): depth, dive time, ascent rate, battery state (surface only).
2. **Decompression Info** (right column): safety stop or deco stop, NDL, nitrogen-loading bar graph, MOD/CNS warnings.
3. **Info Row** (bottom): left slot always the active gas; centre and right slots configurable; default "maximum depth, time of day and temperature" [PM p10, p13].

"The Basic Dive Info section and the Decompression Info section content are reserved for the most critical information and are fixed. Pressing the FUNC (right) button scrolls through additional data in the Info row." [PM p10]

Element details:

* **Depth** – top-left, large; "When in meters, one decimal place is shown" (e.g. `15.7 m`, unit as a small suffix) [PM p11]. Flashing-red zero or depth shown at the surface = sensor needs service [PM p11].
* **Ascent-rate bar graph** – a vertical stack of up-chevrons immediately to the right of the depth digits, "1 arrow per 3 meters per minute (mpm) or 10 feet per minute (fpm)", max 6 arrows [PM p11]. Since v71 the grey "unlit" arrows are no longer drawn (only active arrows are shown) [PRN p20].
* **TIME** – below depth, title `TIME` (cyan), value `35:51` (minutes, with seconds as smaller digits) [PM p9, p11]. Above 999 min the format changes to `XXhXXm` in a smaller font [PRN p40].
* **SURFACE / surface interval** – at the surface the TIME field becomes title `SURFACE` with the interval `22h15m` plus a battery icon [PM p11, p27]; beyond 96 h (4 days) it displays in days [PM p11]; it resets when tissues are cleared [PM p11].
* **SAFETY STOP / DECO STOP / CLEAR** – top-right, title in cyan with the countdown value beneath (e.g. `3:00`); after NDL reaches 0 the same slot shows `DECO STOP` with `6m 2min`; when deco clears with CntUp enabled it shows `CLEAR 0:11` counting up [PM p12, p24, p29].
* **NDL** – lower-right, title `NDL`, value in minutes; max displayed value is **99** ("the maximum no decompression limit that the computer will display during a dive") [PM p27]; shows `0` at the surface and once deco is required [PM p27 screenshot 1, p12, p29].
* **N2 bar graph** – thin vertical bar right of the NDL value, labelled `N2`, green at the bottom, yellow, red at the top; "scaled such that it is full once decompression stops will be needed"; on the surface shows residual nitrogen from the previous dive [PM p12].
* **Persistent notification box** – drawn to the left of NDL when active (e.g. `MOD 112ft ↑`) [PM p12, p19].
* **Bottom row** – `Air` or `Nx32` on the left (large); centre slot e.g. title `MAX` over `21.0 m`; right slot by default a two-line stack `23°C` / `10:55am` [PM p9, p13]. In current firmware that right-hand default is implemented as "mini display 1 … contains temperature and time" [PTX p14; P2R p15] (mini displays were added to all models in firmware v84, 2021-07-26 [PRN p5]).
* Thin separator lines (cyan in the manual's screenshots) divide the left/right columns and the bottom row [PM p9 screenshot].
* **Battery icon** – shown next to the surface interval on the surface, hidden while diving unless low/critical; BLUE = OK, YELLOW = needs charging, RED = charge immediately [PM p11]. Behaviour selectable (Surf+Warn default / Always / Warn Only) [PM p42].

#### ASCII sketch A – main screen, no-deco (NDL) mode (values from the manual's "Max Depth" example [PM p27 #3])

```
+---------------------------+----------------------+
| 33.5 m                    | SAFETY STOP          |  <- title cyan; value white (5:00 = Adapt chose 5 min)
|          (depth, large)   |        5:00          |
|                   ^ ^     |                      |  <- ascent-rate chevrons right of depth (0..6, 1 per 3 m/min)
| TIME                      |            NDL  |N2| |  <- NDL white (>5 min); N2 bar green->yellow->red, fills at NDL 0
| 10:11                     |             8   |##| |
+---------------------------+----------------------+
| Air          MAX               18°C             |  <- info row: [active gas] [centre slot] [right slot]
|              33.5 m          11:05am            |     (default: MAX depth | temp + clock mini display)
+--------------------------------------------------+
```

#### ASCII sketch B – main screen, decompression required (from the multi-gas example [PM p29 #6/#7])

```
+---------------------------+----------------------+
| 25.2 m             ^      | DECO STOP            |  <- title RED while a stop is required and you are
|                    ^      |   12 m    1 min      |     more than 5.1 m below it (white values)
|                    ^      |                      |
| TIME                      |            NDL  |N2| |  <- NDL shows 0 (drawn red in the manual's screenshots)
| 21:51                     |             0   |##| |     N2 bar full/red
+---------------------------+----------------------+
| NX28         MAX               21°C             |  <- gas turns YELLOW when a better gas is available;
|              39.8 m           9:24am            |     a yellow "Best Gas Nx50" box sits left of NDL
+--------------------------------------------------+
Approach (within 5.1 m of the stop):  title YELLOW + flashing up-arrow beside the stop depth   [PM p24]
At the stop (stop depth .. 1.5 m deeper): title GREEN + check mark before the values          [PM p24]
Shallower than the stop: stop depth/time FLASH RED with a down-arrow icon                      [PM p24, p29 #10]
```

TTS is **not** part of the fixed screen in Peregrine recreational modes; it appears only if placed in a bottom-row slot or on the `DET / Δ+5 / @+5/TTS` info screen [PM p13, p14].

#### ASCII sketch C – main screen, safety stop counting down (from [PM p27 #6], [PM p23])

```
+---------------------------+----------------------+
| 5.2 m                     | SAFETY STOP          |  <- title GREEN with a check mark while counting
|                           |     ✓  2:17          |     (yellow digits = paused, outside 2.4-8.3 m)
|                           |                      |
| TIME                      |            NDL  |N2| |  <- NDL back to 99 at 5 m
| 35:23                     |            99   |# | |
+---------------------------+----------------------+
| Air          MAX               21°C             |
|              33.5 m          11:24am            |
+--------------------------------------------------+
When the countdown reaches zero the value is replaced by the word "Complete" (green) [PM p23].
```

#### ASCII sketch D – surface screen before a dive (from [PM p27 #1])

```
+---------------------------+----------------------+
| 0.0 m                     | SAFETY STOP          |  <- title shown, no value yet
|                           |                      |
| SURFACE        [batt]     |            NDL  |N2| |  <- NDL 0; N2 bar = residual loading of last dive
| 22h15m                    |             0   |  | |
+---------------------------+----------------------+
| Air          MAX               23°C             |  <- MAX = maximum depth of the previous dive
|              21.0 m          10:55am            |
+--------------------------------------------------+
```

#### ASCII sketch E – Gauge mode (dive display) [PM p30]

```
+-------------------------------------+
| 39.0 m                       21:16  |   <- depth left, dive time right (both large)
+-------------------------------------+
| MAX                                 |
| 47.8 m          STOPWATCH           |   <- "STOPWATCH 2:56" appears when running (title red when stopped)
| AVG                                 |
| 22.5 m        22°C        8:35AM    |
+-------------------------------------+
Surface: top-right shows "SURFACE 2hr35mn"; MAX/AVG show the last dive's values [PM p30].
```

### 1.6 Info screens (FUNC from the main screen) – order and content

"From the main screen, the FUNC (right) button steps through info screens. When all info screens have been viewed, pressing FUNC again will return to the main screen. Pressing the MENU (left) button will also return to the home screen at any time. Info screens also automatically time-out after 10 seconds … Note that the Tissues Info screen does not automatically time out." [PM p14]. Only the bottom row changes; the top two areas stay visible [PM p10].

Order as drawn in the manual [PM p14 figure]:

1. `LAST DIVE` – `MAX 105 ft`, `#1234`, `0h52m38s` (surface only; "unavailable" until a dive is completed) [PM p15; PRN p16–17]
2. `MOD 57 m | MAX 21.0 m | PPO2 .54`
3. `TEMP 20°C | CONSERV Med 40/85 | CNS 0 %`
4. `GF99 15 % | SurGF 62 % | CEIL 0`
5. `TISSUES` bar graph (16 compartments, does not time out)
6. `DET 12:52 | Δ+5 0 | @+5/TTS 0/0`
7. `BATTERY 3.7V LiIon 4.12V`
8. `PRESSURE mBar SURF 1020 NOW 1021`
9. `DATE 03-Mar-20 | CLOCK 6:42`
10. `SERIAL NO 9F1F0432 | VERSION 20080BC`

Info-screen content varies by mode; deco screens are absent in Gauge mode [PM p14]. The two deco rows and the tissue graph between them were introduced in v65 [PRN p26].

### 1.7 Configurable info row ("Bottom Row") – options

Centre and right slots are configured (with live preview) in System Setup > Bottom Row [PM p40]. Options listed in the manual [PM p13]:

`Max Depth` (MAX 31.6 m) · `Avg. Depth` (AVG 13.3 m) · `Clock` (TIME 2:31) · `Timer` (TIMER 4:57) · `Temperature` (TEMP 21°C) · `Ceiling` (CEIL 11) · `Dive End Time` (DET 2:43) · `Rate` (RATE ↓10 m/min) · `TTS` (14) · `PPO2` (.21) · `CNS %` (11 %) · `MOD` (57) · `GF99` (22 %) · `Surf. GF` (SurfGF 136 %) · `Δ+5` (0) · `@+5` (20)

Current firmware adds **Mini displays**: "2 separately configurable mini displays that are shared by all modes … each hold 3 data displays (Top/Center/Bottom)" so "Up to 6 customizable fields can be displayed simultaneously" [PTX p14, p57; PRN p5]. The newer option list also contains `Gas Density` [PTX p14] (turns yellow at 6.3 g/L for OC [PRN p9]). (`Compass`, `Cylinder Pressure`, `SAC`, `GTR`, `RTR` exist only on models with compass/AI, i.e. not on the Peregrine [PTX p14; CMP].)

Active-gas slot rules [PM p13]: `Air` when 21 % O2, otherwise `Nx` + O2 % (e.g. `Nx32`); **yellow** "if a better gas is available (3 GasNx mode only)"; **flashing red** "if the MOD of the gas has been exceeded".

### 1.8 Colour and title conventions

* "WHITE text indicates normal conditions by default" (main colour selectable: white default, green or red) [PM p18, p42].
* Title colour default **Cyan**; alternatives gray, white, green, red, pink, blue [PM p42] (pink added in v71 [PRN p20]).
* "YELLOW is used for warnings that are not immediately dangerous but should be addressed." [PM p18]
* "FLASHING RED is used for critical warnings that could be life threatening if not immediately addressed." [PM p18]
* Colour-blind support: "Warnings display on a solid inverted background. Critical Warnings flash between inverted and normal text." [PM p18]
* Primary notifications are a **yellow** banner across the bottom row with small `Warning`/`Alert` and `Confirm` hints above the message [PM p19, p21, p22].
* Persistent-notification boxes: red outline/text for MOD exceeded ("MOD, go up" / "MOD, switch gas") and High CNS; yellow for "Near MOD" and "Better Gas" [PM p19 figure].
* Deco/safety-stop title colours: safety stop counting = green + check; paused = yellow digits; deco required = red title; approaching = yellow title + flashing up-arrow; at stop = green + check; violated = flashing red values; deco complete = `Complete`/`CLEAR` in green [PM p23, p24, p29].
* Off gases are drawn in magenta (purple) in the gas lists [PM p32, p40].
* Blue is used for the OK battery icon and the dive-log profile (deco in red) [PM p11, p36].

### 1.9 Ascent-rate bar graph and the numeric "Rate" display

Bar graph (1 arrow = 3 m/min) [PM p11]:

| Colour | Rate | Arrows |
|---|---|---|
| WHITE | "less than 9 mpm / 30 fpm" | 1 to 3 arrows |
| YELLOW | "greater than 9 mpm / 30 fpm and less than 18 mpm / 60 fpm" | 4 or 5 arrows |
| FLASHING RED | "greater than 18 mpm / 60 fpm" | 6 arrows |

Numeric `Rate` display (added v78; arrow points up when ascending, down when descending; "Color coding is applied only during ascents and follows the same rules as the existing ascent rate bar graph") [PRN p16]:

| Colour | ft/min | m/min |
|---|---|---|
| Default | 0 to 35 | 0 to 10.5 |
| Yellow | 36 to 65 | 10.6 to 19.5 |
| Red | 65+ | 19.6+ |

(Note the two tables do not agree exactly – 9/18 m/min vs 10.5/19.5 m/min; both are quoted verbatim.) The example dive shows two chevrons at "about 6 mpm or 22 fpm" [PM p27]. All deco predictions assume 10 m/min (33 ft/min) ascent [PM p11, p26]. The **FAST ASCENT** primary notification fires when "The ascent was sustained as faster than 10m/min (33ft/min)" [PM p22] – the required duration is not published (**UNVERIFIED**). "Ascent rate calculations changed for higher accuracy" in v65 [PRN p25].

### 1.10 Menus

Main-menu items (3 GasNx mode; "Other modes have less complex menus"; "Only menus necessary for the current mode are shown") [PM p31]:

```
Main Screen
 ├─ Turn Off  (replaced by "End Dive" while on the surface in dive mode)       [PM p32]
 ├─ Select Gas (3 GasNx only)                                                [PM p32]
 ├─ Dive Setup ─ Define Gas · NDL Planner · Dive Planner(=Deco Planner, 3 GasNx only)
 │               · Brightness · Vibration · Test Vibration                   [PM p33-36]
 ├─ Dive Log (surface only) ─ Display Log · Next Log · Restore Mode · Delete All Logs [PM p36-37]
 ├─ Start Bluetooth (surface only)                                           [PM p37]
 └─ System Setup (surface only) ─ Mode Setup · Deco Setup · Bottom Row · Nitrox Gases
                 · Alerts Setup · Display Setup · System Setup · Advanced Config [PM p38-43]
```

* "The most commonly used menu items are placed first in the main menu to reduce button presses." [PM p31]
* Dive Setup is available on the surface *and* during a dive; System Setup is not available during a dive [PM p33, p38]. In Nitrox mode "Define Gas is found in the top level menu and the current gas can be edited on a dive" [PM p33].
* **Select Gas** [PM p32]: MENU increments through the gases, FUNC selects; the active gas is highlighted white with an "Active" label; off gases shown in magenta can still be selected and are turned on automatically; "When a gas change is suggested, the recommended best gas will be automatically queued up for selection". Gases never turn off automatically [PM p32].
* **Define Gas** [PM p33]: same list; toggles on/off and edits O2 %; "You can't turn off the active gas"; in 3 GasNx gases may be edited and turned on/off during a dive.
* **Brightness** [PM p35]: Cave / Low / Med / High / Auto (light sensor); "Up to 80% of the power consumption is to power the display"; max brightness is automatically reduced when the battery is low.
* **Vibration** on/off and **Test Vibration** are in Dive Setup [PM p36].

---

## 2. Peregrine – dive behaviours

### 2.1 NDL display and countdown

* Definition: "The time remaining, in minutes, at the current depth until decompression stops will be necessary." [PM p12]
* Maximum displayed value is 99 min ("NDL shows 99 minutes, the maximum no decompression limit that the computer will display during a dive") [PM p27]. At the surface it reads 0 and "our NDL changes from zero to 99" on descent [PM p27 fig. 1, p28].
* **Yellow** "when the NDL is less than the low NDL limit (Default 5 minutes)" [PM p12]; the Low NDL alert text says the value turns yellow "when at or below the Alert value" and the alert resets when NDL is 3 min above the alert value (5 → resets at 8) [PM p21]. No red NDL state is described; at NDL = 0 the manual's screenshots draw the `0` in red [PM p12, p29] (colour of the zero inferred from screenshots).
* All NDL/deco values assume 10 m/min ascent, that stops will be followed and that all programmed (switched-on) gases will be used [PM p12].
* The **Low NDL Alert** primary notification (yellow banner `Low NDL Alert`) fires at the alert value (default 5 min, configurable, can be turned off) in addition to the colour change [PM p21, p40].

### 2.2 Nitrogen loading bar graph

"The nitrogen bar graph is scaled such that it is full once decompression stops will be needed. On ascent, it gives a much better indication of decompression stress and the risk of decompression sickness than NDL does. On the surface, the Nitrogen Loading Bar Graph shows the residual nitrogen from the previous dive." [PM p12]. The TISSUES info screen shows all 16 ZHL-16C compartments, fastest at the top; black line = inspired inert-gas pressure, green/yellow boundary = ambient pressure, yellow/red boundary = M-value; each compartment is scaled individually [PM p17].

### 2.3 Switch to deco display; TTS, Ceiling, stop depth / stop time

* "Once NDL = 0 minutes, mandatory decompression is required. The safety stop counter will be replaced by the shallowest depth to which you can ascend and how long to hold that stop." [PM p12] – i.e. the top-right slot changes from `SAFETY STOP 5:00` to `DECO STOP 9m 1min`.
* "Decompression stops occur at fixed 3m (10ft) intervals." [PM p24]
* **Ceiling (CEIL)** = "The current decompression ceiling not rounded to the next deeper stop increment (i.e. not a multiple of 10ft or 3m)" – info screen / bottom-row item only [PM p16].
* **TTS** = "the current time to ascend to the surface including the ascent plus all required deco stops and safety stops" [PM p16]; the multi-gas example notes "TTS has increased to include deco stop time" [PM p29]. (v71 fixed a bug where Count-Up safety-stop time was being added to TTS in OC Rec [PRN p21].)
* Last stop depth 3 m or 6 m (3 GasNx only) [PM p39].
* Deco stop states (exact wording) [PM p24]:
  * *Replaces Safety Stop* – "Once the NDL reaches zero, deco stop information will replace safety stop display." (title red)
  * *Approach Indicator* – "As you approach within 17ft (5.1m) of the first decompression stop, the title will change from red to yellow and a flashing up-arrow will indicate to ascend to the stop."
  * *At Deco Stop* – "While at the stop depth or up to 5ft (1.5m) deeper, the title will turn green and a check mark will be shown. Hold this depth until stop time clears." (The example chapter instead says "A green check will appear when within 1.8m deeper from the deco stop depth" [PM p29] – internal inconsistency 1.5 m vs 1.8 m.)
  * *Deco Stop Violation* – "If you ascend shallower than a deco stop, the display will flash red. Significant stop violations will result in a 'MISSED STOP' notification." The banner text is `MISSED DECO STOP` [PM p22, p29]. "Re-descend deeper than the stop depth to clear the flashing text." [PM p29]. What counts as "significant" (depth/time) is not published – **UNVERIFIED**. (The Teric manual adds a middle state: shallower than the stop but still deeper than the ceiling = yellow; shallower than the ceiling = flashing red [TM p26].)
  * *Deco Stops Complete* – "Once all decompression stops are complete, the safety stop will begin counting down. If enabled, the Deco Clear counter will begin counting up from zero. If safety stops and deco clear counter are disabled 'Complete' will appear across the deco stop information area." The count-up is titled `CLEAR` (green) e.g. `CLEAR 0:11` [PM p29].
* "There is no lock-out or other penalty for violating decompression stops." [PM p24]
* Gas switching during deco (3 GasNx): predictions assume the gas with the highest PPO2 ≤ OC Deco PPO2 (1.61) is used; "If there is a better gas available, the current gas will be displayed in yellow"; the prediction assumes the switch happens "in the next 5 seconds" [PM p26]. A persistent `Best Gas NxXX` box appears left of NDL "Only … when deco stops are needed" [PM p19].

### 2.4 Safety stop – exact behaviour

Settings: Off, 3, 4, 5 min, Adapt, CntUp [PM p39]. "The Peregrine does not do 'deep safety stops'" [PM p23]. Exact rules [PM p23]:

| Event | Rule (verbatim) |
|---|---|
| Safety Stop Required | "Once the depth exceeds 11m (35ft), a safety stop … counter will appear in the top right corner of the display." (shows e.g. `3:00`, not counting) |
| Automatic Countdown | "Countdown begins once the depth becomes shallower than 6m (20ft). Countdown will continue while the depth remains in the range of 2.4m to 8.3m (7ft to 27ft)." |
| Countdown Paused | "If the depth goes outside of the range 2.4m to 8.3m (7ft to 27ft), then the countdown pauses, and the remaining time displays in yellow." |
| Safety Stop Complete | "When the countdown reaches zero, the display changes to 'Complete' and you are now clear to ascend to the surface." |
| Countdown Reset | "The countdown will reset if the depth once again exceeds 11m (35ft)." |
| Surfacing early | "If you ascend to the surface before the safety stop countdown finishes, the safety stop will appear paused, but this will disappear once the dive ends." "There is no lock-out or other penalty for omitting a safety stop." |

Note the hysteresis: the countdown *starts* only when shallower than 6 m but then *continues* anywhere between 2.4 m and 8.3 m; going shallower than 2.4 m pauses it (yellow) and it resumes when back in range; descending below 8.3 m pauses it; descending past 11 m resets it [PM p23 diagram].

* **Adapt**: "a 3 minute safety stop will be used, unless the dive exceeds 30m (100ft) or the NDL falls below 5 minutes. In these cases a 5 minute safety stop is used." [PM p39]. The example shows the counter changing from 3:00 to 5:00 at 33.5 m [PM p27].
* **CntUp**: "will count up from zero starting from when you enter the safety stop zone or when decompression obligations are cleared." [PM p39]
* Vibration (if on) "when a safety stop starts, pauses, or is completed" [PM p20].
* Dives shallower than 11 m never trigger a safety stop (the counter appears only once 11 m is exceeded) [PM p23]; the Teric manual phrases the same rule as "A safety stop is not included for dives shallower than 11m (35ft)" [TM p29].
* Safety stop vs deco stop: safety stop = optional, in the same screen slot, title `SAFETY STOP`; deco stop = mandatory, title `DECO STOP`, replaces the safety stop when NDL hits 0; when deco clears the safety stop countdown restarts (or CntUp counts up) [PM p12, p24].

### 2.5 Decompression model and accuracy assumptions

* Bühlmann ZHL-16C with Erik Baker's Gradient Factors; "The default conservatism of the system in all dive modes is medium (40/85)." [PM p25]
* GF Lo "determines the depth of the first stop", GF Hi "determines the surfacing tissue supersaturation" [PM p25].
* Rules for custom GF since v84: GF Low ≤ GF High; GF High > 30; GF Low > 10 [PRN p10].
* Assumptions: 10 m/min ascent, all switched-on gases are carried, deco on the gas with the highest PPO2 ≤ OC Deco PPO2 (1.61) [PM p26]. Deco-planner assumptions: descent 18 m/min, ascent 10 m/min [PM p34].

---

## 3. Peregrine – alarms and notifications

### 3.1 Tiers

The manual uses three mechanisms [PM p18–22]:

1. **Primary notifications** – "Each of the primary notifications will display as a message in yellow across the bottom row until dismissed. … The notification is dismissed by pressing either button." Priority-ordered; clearing one reveals the next. Vibration "when the alert first occurs and every 10 seconds until it is acknowledged" [PM p19]. Banner header reads `Warning` for safety warnings and `Alert` for the user-configurable alerts, with `Confirm` on the right [PM p21, p22].
2. **Persistent notifications** – a boxed message "to the left of the NDL until the condition that caused the warning is resolved"; only the highest priority shows [PM p12, p19].
3. **Colour coding of the affected value** – e.g. PPO2/MOD/gas flashing red, depth/time/NDL yellow for custom alerts [PM p13, p15, p21].

Teric terminology differs: *Dive Events* (info, auto-clear after 4 s), *Warnings* (must be acknowledged), *Errors*, plus a persistent `!` alert icon and a warnings overlay [TM p23–24].

### 3.2 Primary notifications – priority order, text, trigger, action (verbatim table) [PM p22]

| # | Banner text | Header | Meaning | Action to take |
|---|---|---|---|---|
| 1 | `LOW PPO2` | Warning | "The PPO2 is below the limit set in the PPO2 limits menu." | "Change your breathing gas to one safe for the current depth." |
| 2 | `HIGH PPO2` | Warning | "The PPO2 is above the limit set in the PPO2 limits menu." (fires "if the average PPO2 goes above the PPO2 limit for more than 30 seconds" [PM p19]) | same |
| 3 | `MISSED DECO STOP` | Warning | "A required decompression stop was violated." | "Descend deeper than the currently displayed stop depth. Monitor for symptoms of DCS. Use extra conservatism for future repetitive dives." |
| 4 | `FAST ASCENT` | Warning | "The ascent was sustained as faster than 10m/min (33ft/min)" | "Use a slow ascent rate. Monitor for symptoms of DCS. Use extra conservatism for future repetitive dives." |
| 5 | `LOW BATTERY INT` | Warning | "The internal battery is low." | "Recharge the battery." |
| 6 | `TISSUES CLEARED` | Warning | "The decompression tissue inert gas loading has been set to default levels." | "Plan repetitive dives accordingly." |
| 7 | `VERY HIGH CNS` | Warning | "CNS toxicity clock exceeded 150%" | "Switch to a gas with a lower PPO2 or ascend shallower (decompression ceiling allowing)" |
| 8 | `HIGH CNS` | Warning | "CNS toxicity clock exceeded 90%" | same |
| 9 | `Low NDL Alert` | Alert | "NDL is less than low NDL alert value." | "Ascend soon to avoid decompression obligation." |
| 10 | `Depth Alert` | Alert | "Depth is deeper than depth alert value." | "Ascend above depth limit." |
| 11 | `Time Alert` | Alert | "Divetime has surpassed time alert value." | "End dive safely." |

("The highest priority notification is listed first" [PM p22]; the order above is the order printed in the table, left column then right column.) There is no separate "Deco" / "Deco needed" notification on the Peregrine; entering deco is signalled by the display change only [PM p24]. (The Teric does have a `DECO NEEDED` warning and a `Deco Needed` dive event in OC Rec [TM p26, p87].) The notification list "is not exhaustive" [PM p22]; firmware-level ones such as `WATCHDOG RESET`, `UPGRADE RESET`, `UPGRADE FAIL` (header `Error`) are shown in the Perdix 2 manual [P2R p26].

### 3.3 Persistent notifications (box left of NDL) [PM p19]

| Box text | Colour (manual figure) | Meaning |
|---|---|---|
| `High CNS 108%` | red | "Central Nervous System (CNS) Oxygen Toxicity limit reached." |
| `MOD 112ft ↑` | red | "MOD, go up – Maximum Operating Depth (MOD) exceeded. Ascend to shown depth." |
| `MOD ⇄Gas Air` | red | "MOD, switch gas – MOD exceeded. Switch to more appropriate gas (another gas must be programmed and turned on for this to appear)." |
| `MOD 112ft` | yellow | "Near MOD – Within 5ft (1.9m) below MOD. Just a notification, no action required." |
| `Best Gas Nx50` | yellow | "Better Gas – Another gas is programmed that is more suitable at the current depth. Only displays when deco stops are needed." |

While MOD is exceeded the bottom-row gas and PPO2 values are also drawn red [PM p19 figure].

### 3.4 Customizable alerts (Alerts Setup) [PM p21, p40]

| Alert | Default | Extra display effect | Reset rule |
|---|---|---|---|
| Depth | 40 m, on | "the depth value will turn yellow when deeper than the Alert value" | "will reset if the depth goes 2m shallower than the alert depth" |
| Time | 60 min, **off** | "the dive time value will turn yellow when greater than the Alert value" | "will only fire once per dive" |
| Low NDL | 5 min, on | "the NDL value will turn yellow when at or below the Alert value" | "will reset if the NDL goes above the NDL alert value by 3 minutes" |

Vibration can be toggled on the same page [PM p40]. (These alerts were introduced in v78 [PRN p15].)

### 3.5 PPO2 / MOD colouring rules

* Info-screen `PPO2` "Displays in Flashing Red when outside customizable PPO2 limits"; `MOD` "Displays in Flashing Red when exceeded" [PM p15].
* Limits (Adv. Config 2): OC Low PPO2 0.18 ("PPO2 of all gases display in flashing red when less than this value"), OC MOD PPO2 1.40, OC Deco PPO2 1.61 [PM p43]. In Air/Nitrox modes all gases are bottom gases and obey the MOD limit even in deco; in 3 GasNx the least-oxygen-rich mix is the bottom gas, the others are deco gases obeying the Deco limit [PM p43].
* Release-note rules (v71) for the shared firmware [PRN p19]: lowest-O2 enabled gas always uses MOD PPO2; gases > 40 % O2 use only Deco PPO2; gases ≤ 40 % use MOD PPO2 until deco stops are needed, then Deco PPO2; "For 'High PPO2' warnings, a 0.04 ATA buffer is used. For example, if the Deco PPO2 is applicable and is set to 1.61 then: Above 1.57 = PPO2 displayed in yellow (but no warning). 1.65 or higher = PPO2 displayed in red and High PPO2 warning." (The buffer does not apply to MOD depth calculations.)
* CNS: yellow > 90 %, red > 150 %; NOAA table, +1 % per 4 s above PPO2 1.65; 90-min surface half-life; never decreases during a dive [PM p15].

### 3.6 Battery warnings

Battery info screen voltage "Displays in yellow when battery is low … Displays in red when battery is critically low" [PM p18]; icon blue/yellow/red [PM p11]; `LOW BATTERY INT` banner [PM p22]; max brightness reduced automatically when low [PM p35].

---

## 4. Peregrine – settings reference (with defaults)

| Menu | Setting | Values (default in bold) | Source |
|---|---|---|---|
| Mode Setup | Mode | **Air**, Nitrox, 3 GasNx, Gauge (to/from Gauge clears tissues) | [PM p38] |
| Mode Setup | Salinity | Fresh, **EN13319**, Salt ("Density of freshwater and saltwater differ by about 3%"; affects displayed depth only, not deco) | [PM p38] |
| Mode Setup | Gas O2% (Nitrox mode) | 21–40 % (Air mode fixed 21 %) | [PM p38, p9] |
| Mode Setup | MOD PPO2 (Air/Nitrox) | **1.4**; shows resulting MOD (e.g. 32 % → 57 m) | [PM p38] |
| Deco Setup | Deco Model | ZHL16C+GF (fixed on Peregrine) | [PM p39] |
| Deco Setup | Conservatism | Low (45/95), **Med (40/85)**, High (35/75), Custom (GF Low/GF High fields) | [PM p39] |
| Deco Setup | Last Stop | **3 m**, 6 m (3 GasNx only; no effect on safety stops) | [PM p39; PTX p54] |
| Deco Setup | Safety Stop | Off, 3, 4, 5 min, Adapt, CntUp – default not stated explicitly (**UNVERIFIED**; the default-screen example shows `3:00`) | [PM p39, p9] |
| Bottom Row | Center / Right | any item from §1.7 (+ Mini 1 / Mini 2 in current firmware) | [PM p40; PTX p57] |
| Nitrox Gases (3 GasNx) | 3 gases | 21–99 % O2 each, On/Off, active marked `A`; MOD PPO2 **1.40**, range 1.0–1.69 step 0.01 | [PM p40] |
| Alerts Setup | Depth / Time / Low NDL / Vibration | see §3.4; Vibration **On** | [PM p40] |
| Display Setup | Depth units / Temp units | Meters or Feet; °C or °F, set independently (the metric manual's screenshot shows Meters and °C; factory default not stated) | [PM p40; PRN p36] |
| Display Setup | Brightness | Cave, Low, Med, High, **Auto** | [PM p35, p40] |
| Display Setup | Altitude | fixed **Auto** | [PM p40] |
| Display Setup | Flip Screen | rotates display 180° | [PM p40] |
| System Setup | Date, Clock (AM/PM/24h), Unlock, Log Rate (**10 s**; max 2 s; 2/5/10), Reset to Defaults | | [PM p41; PRN p22] |
| Adv. Config 1 | Main Colour **White** / green / red; Title Colour **Cyan** / gray / white / green / red / pink / blue; End Dive Delay **060 s** (20–600 s); Bat Icon **Surf+Warn** / Always / Warn Only | | [PM p42] |
| Adv. Config 2 | OC Min PPO2 **0.18**; OC MOD PPO2 **1.40**; OC Deco PPO2 **1.61** | | [PM p43] |
| Adv. Config | System Info (serial etc.), Battery Info, Reset Adv. Config | | [PM p42] |

"NDL display" / "Deco display" options: the Peregrine recreational modes have **no** NDL-replacement setting (Deco Setup holds only Deco Model, Conservatism, Last Stop, Safety Stop [PM p39]). The NDL-replacement option (`NDL`, `CEIL`, `GF99`, `SurfGF`, `@+5`, `Δ+5`, `Mini`) exists only in Perdix 2 OC Tec / CC-BO modes [P2T p14, p60, p64]. The Teric OC Rec Standard layout can replace the top-right TTS slot ("Top-Right Disp") [TM p67; TRN p21].

---

## 5. Peregrine – surface screen, surface interval, "no-fly"

* Surface screen (sketch D): depth `0.0 m`; TIME field replaced by `SURFACE` + interval `22h15m` with the battery icon; deco area shows the `SAFETY STOP` title (blank), `NDL 0` and the N2 bar with residual loading; bottom row gas / `MAX` of the previous dive / temperature / clock [PM p11, p12, p27].
* Surface interval format: hours and minutes; "Beyond 96 hours (4 days), it displays in days"; "The surface interval resets when decompression tissues are cleared." [PM p11]. (Teric/Tern: minutes:seconds for the first hour, then h:m, then days after 4 days [TM p15; TXM p15].)
* `LAST DIVE` info screen (FUNC once at the surface): max depth, dive number, duration [PM p15; PRN p16].
* The `TISSUES` info screen is available at the surface and shows residual loading relative to ambient pressure and M-values [PM p17].
* **SurfGF at the surface**: GF99 and SurGF are shown on the info screens / bottom row; at the surface SurGF ≈ GF99 (both are the surfacing supersaturation) – see §8 for definitions. The Perdix 2 manual adds: "watching it fall while on your safety stop gives you a sense of the safety stop's effectiveness" [P2R p18].
* **No-fly / desaturation countdown: none.** The strings "fly", "no fly", "time to fly", "desat" do not occur anywhere in the Peregrine, Peregrine TX, Perdix 2 (rec/tec), Teric or Tern TX manuals (full-text search of the PDFs). Shearwater's official statement [FLY, 2015-08-19]: "We are often asked why our computers do not display a 'Time to Fly.' … These recommendations aren't calculations based on the theoretical tissue load. They are based on the type and duration of the diving activity, and a key factor that the computer can't know – does the diver have symptoms of DCS. We have chosen not to reduce these recommendations to a calculation and we ask our customers to evaluate their situation and use an appropriate preflight surface interval." The post quotes the DAN 2002 guidance (12 h after a single no-deco dive, 18 h after multiple dives/days, "substantially longer than 18 hours" after deco dives). What the computers do show is the surface interval and the tissue graph.
* Clock: 12 h (AM/PM) or 24 h [PM p18, p41]; date `Day-Month Year` [PM p18]; expected drift ~4 min/month [PM p48].
* Sleep/auto-off: not specified for the Peregrine in the manual (**UNVERIFIED**; release notes mention 30-min no-activity shutdown for the Petrel family when "on surface and not wet" [PRN p40]).

## 6. Peregrine – Dive Planner(s)

Two tools, both in Dive Setup [PM p33–35]:

**NDL Planner** (all deco modes): "a quick way to determine how much bottom time is available until mandatory decompression stops would be required." You enter when the next dive starts ("Next dive starts now", surface interval "from none up to 1 day"); result is a table `DEPTH | NDL | Gas` listing depths with the NDL at each and "the best of the programmed gases to use at that depth. Only programmed gases are used." Example rows in the manual: 12 m 85 min Air, 15 m 49 min Air, 18 m 30 min Air (and 18 m 21 min on a repetitive plan) [PM p33]. Since v53 the NDL Planner includes the descent time in the reported NDL ("industry standard approach") [PRN p29].

**Deco Planner** (3 GasNx only; renamed from "Dive Planner" in v78 [PRN p17]):
* Inputs on the surface: surface interval, bottom depth, bottom time ("Min: 5 Max: 180" min), RMV (L/min); residual tissue loading and CNS from recent dives are used; a "Ready to Plan Dive" screen shows GF, Last Stop and Start CNS before running [PM p34].
* During a dive: "Computes the decompression profile assuming the ascent will begin immediately. There are no settings to enter. (RMV is last used value)" [PM p34].
* Assumptions: "Descent rate is 18m/min (60ft/min) and the ascent rate is 10m/min (33ft/min)", gas in use = highest PPO2 within limits, configured last stop depth, constant RMV [PM p34]. Limitations: single-level only; no narcosis/gas/CNS validation [PM p34].
* Results screens: header `Depth Time RMV` (e.g. `040 020 15`), table `Stp Tme Run Gas Qty`; first rows `bot` (bottom) and `asc` (ascent legs, one per gas switch), then each stop; multiple pages if > 2 stops; a summary of total gas per mix (e.g. `50%: 287 L`, `28%: 1534 L`) and final CNS follows [PM p35, p28]. Rows with out-of-range PPO2 are drawn red (v71) [PRN p20].

## 7. Peregrine – dive log, dive start/end summary

* Dive starts: auto-on at > 1100 mbar absolute (~0.9 m at sea level) [PM p6]; dive-start depth 1.6 msw / dive-end depth 0.9 msw per the sibling spec tables [PTX p68; P2R p69] (**inferred for the Peregrine**); the dive ends after the End Dive Delay (default 60 s, 20–600 s) at the surface or immediately via the "End Dive" menu item [PM p32, p42].
* Log capacity: "Up to 200 hours of detailed logs can be stored … at the default sampling rate of 10 seconds" [PM p36]; "2000 dive basic log" [PM p50]. Log rate 2, 5 or 10 s [PM p41; PRN p22].
* Log viewer (surface only): list `# | depth | duration | date`; detail page plots the profile in blue with deco stops in red and lists max/avg depth, dive number, date, start/end time of day, length, min/max/avg temperature, mode, preceding surface interval, surface pressure, GF settings, start/end CNS [PM p36]. Next Log number editable; Restore Mode shows deleted logs greyed-out; Delete All Logs [PM p37].
* Download/firmware via Bluetooth with Shearwater Cloud Desktop/Mobile; a firmware update resets tissues [PM p44–46].

## 8. Definitions (verbatim from the manual)

* **NDL** – "No-Decompression Limit. The time, in minutes, that can be spent at the current depth until mandatory decompression stops will be required." [PM p49]
* **Deco** – "Decompression. The state of requiring mandatory decompression stops or the act of performing those stops." [PM p49]
* **Deco stop depth and time** – "the shallowest depth to which you can ascend and how long to hold that stop." [PM p12]
* **TTS** – "Time To Surface. The amount of time required to surface given an ascent rate of 10m/min, including all required mandatory decompression stops." [PM p49]; info-screen wording adds "and safety stops" [PM p16].
* **CEIL (Ceiling)** – "The current decompression ceiling not rounded to the next deeper stop increment. (i.e. not a multiple of 10ft or 3m)" [PM p16]
* **GF99** – "The current gradient factor as a percentage of the controlling compartment m-value (i.e. super-saturation percent gradient). 0% means the leading tissue super-saturation is equal to ambient pressure. Displays 'On Gas' when tissue tension is less than the inspired inert gas pressure. 100% means the leading tissue super-saturation is equal to the original M-Value limit in the Bühlmann ZHL-16C model. GF99 is displayed in Yellow when the current gradient factor modified M-Value (GF High) is exceeded. GF99 is displayed in Red when 100% (un-modified M-Value) is exceeded." [PM p16]
* **Surface GF (SurGF / SurfGF)** – "The surfacing gradient factor expected if the diver instantaneously surfaced. SurGF colour is based on the current GF (GF99). If the current GF is greater than GF High, SurGF will be displayed in Yellow. If the current gradient factor is greater than 100%, SurGF will be displayed in Red." [PM p16] (Added in v65: "the gradient factor if you were to surface immediately. This is different from GF99, which shows your gradient factor at the current depth." [PRN p22])
* **@+5** – "'At plus 5' is the TTS if remaining at the current depth for 5 more minutes. This can be used as a measure of how fast you are on-gassing or off-gassing." [PM p16]
* **Δ+5** – "The predicted change in TTS if you were to stay at the current depth for 5 more minutes. A positive 'Delta plus 5' indicates that you are on-gassing the leading tissue while a negative number indicates that you are off-gassing the leading tissue." [PM p16]; "(Δ+5) = (@+5)-(TTS)" [P2R p19].
* **DET (Dive End Time)** – "The time of day at which you can expect to surface if you depart immediately, ascend at 10mpm or 33fpm, change gases when prompted, and perform all decompression stops as directed." [PM p16] (Teric calls it EOD, End of Dive time [TM p19].)
* **MOD** – "the maximum allowable depth of the current breathing gas as determined by PPO2 limits. Displays in Flashing Red when exceeded." [PM p15]
* **CNS** – "Central Nervous System oxygen toxicity. Adverse physiological affects from prolonged exposure to an elevated partial pressure of oxygen." [PM p49]
* **PPO2** – "Partial Pressure of Oxygen" [PM p49]; **OC** – open circuit [PM p49].
* **Safety stop** – "an optional stop added to all dives before surfacing" [PM p23]; **Decompression stops** – "mandatory stops that must be followed in order to reduce the risk of decompression illness (DCI)" [PM p24].

---

## 9. Perdix 2 – layout and differences from the Peregrine

* Buttons: "Two titanium piezo-electric buttons", named **MENU (left)** and **SELECT (right)**; identical role table to the Peregrine's MENU/FUNC (menu / next item / change value; info screens / perform or start editing / save) [P2R p7]. Both pressed together turns it on [P2R p7]. Auto-on at 1100 mbar [P2R p6].
* Default mode is **3 GasNx** (Peregrine: Air) [P2R p8, p10]. Modes: Air, Nitrox, 3 GasNx, OC Tec, CC/BO, Gauge [P2R p10]; 5 OC / 5 CC gases, compass, AI for up to 4 transmitters, user-replaceable AA battery, 260 m rating, 1000 h log, 190 g [CMP; P2R p69].
* **Recreational modes use exactly the Peregrine layout** ("large-font layout"): same three areas, same safety-stop/deco-stop/NDL/N2-bar block top-right, same bottom row, same mini displays, same thresholds (11 m / 6 m / 2.4–8.3 m, 17 ft / 5 ft approach, etc.) [P2R p8, p11–15, p27–28]. Extra info screens: Compass and AI rows, which (like Tissues) do not time out [P2R p16–17].
* **Technical modes (OC Tec, CC/BO) use the dense three-row layout** [P2T p11]:

```
+-------------------------------------------------+
| DEPTH   TIME     STOP   TIME                    |   Top row (fixed): depth + chevrons, dive time
| 67.0 ^  22 [bat]  39      1                     |   (seconds as an underline bar under "TIME"),
+-------------------------------------------------+   next stop depth and stop time; "SURFACE 2h15m"
|                 PPO2                            |   replaces STOP/TIME at the surface; "CLEAR 2:14"
|                 1.15                            |   count-up when deco clears
+-------------------------------------------------+   Center row: fully configurable (3 slots in OC Tec;
| O2/HE          NDL         TTS                  |   CC/BO keeps the setpoint in the middle)
| OC 15/40        0           56                  |   Bottom row (fixed): circuit mode, gas O2/He, NDL, TTS
+-------------------------------------------------+
```
  Verbatim: "The Top and Bottom row content are reserved for the most critical information required for technical diving. The information displayed in these rows is fixed. The Centre row contents can be configured" [P2T p11]; seconds "display as a bar drawn below the word 'Time.' It takes 15 seconds to underline each character" [P2T p12]; "Decompression information will Flash Red if you ascend shallower than the current stop" [P2T p12]; NDL yellow below 5 min; "Once NDL reaches 0 … the NDL display can be replaced by" Ceiling / @+5 / Delta+5 / GF99 / SurGF / Mini [P2T p14]; TTS is always present in tec modes ("TTS cannot be removed from the display") [P2T p8]; OC Tec has no safety stops [P2T p10]. Default tec PPO2 limits: OC flashing red < 0.19 or > 1.65; CC < 0.40 or > 1.6 [P2T p13]. Optional VPM-B and DCIEM unlocks [P2T p64].
* Perdix 2 GF presets in the RevC manual are the same as the Peregrine (Low 45/95, Med 40/85, High 35/75) [P2R p55], but firmware v102 (2025-11) changed them to 50/95, 50/85, 50/75 and the tec default to 50/70 [P2RN p1] – see Caveat 2.

## 10. Teric (and Tern / Tern TX) – layout and differences

* **Four buttons** [TM p8; TXM p8]: MENU (lower left: menu / move down), INFO (lower right: cycle info screens / exit back), LIGHT (upper left: cycle brightness / move up), FUNC (upper right: configurable shortcut / select). "To turn the Teric On, press any button." [TM p7]. Shortcut options for FUNC: Switch SP, Switch > BO, Switch > CC, Select Gas, Compass, Deco Plan, Stopwatch, Tag Log, Home Screen, Rst Av Depth, No Action [TM p68]. (The Tern/Tern TX have the same four-button layout [TXM p8].)
* Watch Mode vs Dive Mode; an Owner Information screen shows for 15 s on entering dive mode and confirms Beep/Vib settings [TM p9].
* Modes (RevH manual): OC Rec (default), OC Tec, CC/BO, Gauge, Freedive [TM p66]; firmware v36 (2025-12) split OC Rec into **5 Gas Nitrox, Nitrox and Air** to align with the Tern/Perdix [TRN p2]. Tern TX modes: Air (default), Nitrox, 3 GasNx, Gauge, Freedive [TXM p10].
* **Two layouts in every mode: Big and Standard** (Dive Settings > Layout) [TM p11, p66]:
  * *Big* (default for OC Rec, Freedive, Gauge): Top row = depth + chevrons + numeric rate; Info row = `NDL 12 | TTS 4` (deco info); Bottom row = dive time `42:18` large, with gas `21%` and battery at the very bottom. "The Big screen layout provides the largest font size at the expense of on screen information." In OC Rec only the right Info-row slot is customizable (NDL cannot be obscured); in OC Tec/CC-BO nothing is customizable in Big because "TTS should not be permanently obscured" [TM p11, p67].
  * *Standard* (default for OC Tec, CC/BO): four rows – Top (depth/mode/ascent), **Deco row** (`DECO 6m 2min | TTS 14`), **Info row** (customizable, up to 3 items, e.g. `O2/He 21/00 | T1 127 BAR`), Bottom row (dive time `23:19`, alert `!` icon) [TM p11]. In OC Rec the right Deco-row slot is also customizable ("Top-Right Disp") [TM p67].
  * Tern TX Big layout shows `NDL | MAX depth` by default instead of `NDL | TTS` [TXM p10–11, p14].
* Ascent rate shown "graphically and numerically" with the same 9/18 m/min colour bands [TM p12]; Freedive uses m/s [TM p12]. Battery icon WHITE/YELLOW/RED (not blue) [TM p12].
* NDL "Displays in Yellow when the NDL is less than 5 minutes" [TM p13] (Tern TX: "less than or equal to 5 minutes" [TXM p13]). Safety stop counter box `SAFETY 3:22` replaces NDL in OC Rec; shows **"CLEAR"** when complete (Peregrine: "Complete"); `CLEAR 1:14` deco-clear counter in Tec [TM p13, p25]. Safety-stop thresholds identical (11 m / 6 m / 2.4–8.3 m / yellow when paused) [TM p25]. "In OC Rec mode, the deco stop label appears in red as deco obligation is an emergency condition in recreational diving" [TM p26]; Teric adds `Deco Needed` / `Deco Clear` dive events and a `DECO NEEDED` warning (OC Rec only), a `LOW NDL` warning, and the yellow (above ceiling) vs flashing-red (above ceiling violated) distinction [TM p26, p86–87].
* Surface interval in the bottom row: `SURFACE 2h34m` (m:s during the first hour) [TM p15].
* Alerts: Visual only / Beep / Vibrate / Beep & Vibrate, beeper pitch high/low; Dive Events time out after 4 s [TM p23, p69]. End Dive delay 10 s to 10 min, **default 10 s** (Peregrine: 60 s) [TM p69]. Deco menu: GF presets Low 45/95, Med 40/85 (default OC Rec), High 35/75, custom; "OC Tec and CC/BO modes have a custom default of 30/70" [TM p71] – changed by v36 to GF Low 50 everywhere [TRN p2]. 5 programmable gases [TM p72]. PPO2 colouring uses ±0.03 bands around the limits and a 30-s delay for the Low/High PPO2 alert [TM p70].
* Dive start 1.6 m / end 0.9 m ("adjustable in Freedive Mode") [TM p89]. Round 1.39" AMOLED (Tern 1.3"), sapphire lens on the Teric, 200 m (Teric) / 120 m (Tern) rating, haptic + audio (Teric) [CMP].
* Teric info-screen set [TM p16–19]: LAST DIVE, AI, Compass, MAX/AVG, MOD/CNS/PPO2, GF/GF99/SurfGF, CEIL/@+5/Δ+5, TISSUES, TEMP/BATTERY %, mBar SURF/NOW, TIME/EOD.

## 11. Open points / UNVERIFIED items (for the simulator backlog)

1. Whether the Peregrine's two stainless-steel buttons are piezo-electric (manual silent; product page says "316 stainless steel buttons").
2. Exact dive-start/dive-end depths for the Peregrine itself (1.6 m / 0.9 m taken from Peregrine TX, Perdix 2 and Teric spec tables).
3. Duration/definition of a "sustained" ascent > 10 m/min that triggers `FAST ASCENT`, and the magnitude/time of a "significant" stop violation that triggers `MISSED DECO STOP`.
4. Default value of the Safety Stop setting (Off/3/4/5/Adapt/CntUp) – not stated; manual examples use 3:00 in the default-screen figure and Adapt in the walk-through.
5. Colour of the NDL digits once NDL = 0 (red in the manual's screenshots; no text states it).
6. Content of "Enhanced warnings" in Air/Nitrox modes.
7. Surface auto-off timeout for the Peregrine.
8. Whether a future Peregrine firmware will adopt the GF Low = 50 presets that v102/v36 brought to the other models (as of v89, 2025-09-22, it has not).

## 12. Sources

Official Shearwater documents (all fetched 2026-10-09 from links on shearwater.com support pages):

* **[PM]** Peregrine Operating Instructions, Doc. 16001-SI-RevB (2020-07-06), firmware V77 – https://cdn.shopify.com/s/files/1/0838/3732/1530/files/Peregrine_Manual-metric_2021.pdf?v=1710186733 (linked as "Peregrine Manual - English" from https://shearwater.com/pages/peregrine-support ; older mirror URL https://shearwater.com/wp-content/uploads/2021/09/Peregrine_Manual-metric_2021.pdf)
* **[PRN]** Shearwater Peregrine Firmware v89 Release Notes, Rev A (2025-09-22) – https://cdn.shopify.com/s/files/1/0838/3732/1530/files/Peregrine-v89-Release-Notes-RevA-EN_2.pdf?v=1758731887
* **[PTX]** Peregrine TX Operating Instructions, Doc. 16004-RevC (2024-04-23), firmware V98 – https://cdn.shopify.com/s/files/1/0838/3732/1530/files/Peregrine_TX_Manual_RevC_51037c95-4e6b-4c53-b0cf-516a926361ce.pdf?v=1715718477 (from https://shearwater.com/pages/peregrine-tx-support)
* **[P2R]** Perdix 2 Recreational Modes Operating Instructions, Doc. 13300-REC-RevC (2022-06-30) – https://cdn.shopify.com/s/files/1/0838/3732/1530/files/Perdix-2_RECREATIONAL_Manual_RevC.pdf?v=1710185719 (from https://shearwater.com/pages/perdix-2-support ; mirror https://www.shearwater.com/wp-content/uploads/2022/05/Perdix-2_RECREATIONAL_Manual_RevC.pdf)
* **[P2T]** Perdix 2 Technical Modes Operating Instructions, Doc. 13301-Tec-RevB (2022-05-25) – https://cdn.shopify.com/s/files/1/0838/3732/1530/files/Perdix-2_Technical_Manual_RevB.pdf?v=1710185751
* **[P2RN]** Perdix 2 / Perdix AI / NERD 2 / Petrel 3 / Peregrine TX Firmware Release Notes v102, Rev A (2025-11-10) – https://cdn.shopify.com/s/files/1/0838/3732/1530/files/Perdix_2-Release-Notes-v102-English.pdf?v=1762555521
* **[TM]** Teric Operating Instructions, Doc. 15001-SI-RevH (2024-09-09), firmware V19 – https://cdn.shopify.com/s/files/1/0838/3732/1530/files/Teric_Manual_RevH5.pdf?v=1731106441 (from https://shearwater.com/pages/teric-support ; older metric edition https://www.shearwater.com/wp-content/uploads/2021/09/Teric_Manual-metric_2021.pdf)
* **[TRN]** Teric and Tern Firmware Release Notes v37, Rev A (2026-01-16) – https://cdn.shopify.com/s/files/1/0711/0538/0397/files/Teric-Tern-Release-Notes-v37-English_2.pdf?v=1768605625
* **[TXM]** Tern TX Operating Instructions, Doc. 15302-RevB (2023-12-07), firmware V25 – https://cdn.shopify.com/s/files/1/0838/3732/1530/files/TernTX_Manual_Rev_B.pdf?v=1709841056 (from https://shearwater.com/pages/tern-tx-support)
* Tern Operating Instructions, Rev B (downloaded, not analysed in detail) – https://cdn.shopify.com/s/files/1/0838/3732/1530/files/Tern_Manual_Rev_B-1.pdf?v=1709316814 (from https://shearwater.com/pages/tern-support)
* **[CMP]** Dive Computer Comparison (Peregrine, Peregrine TX, Tern, Tern TX, Teric, Perdix 2) – https://cdn.shopify.com/s/files/1/0838/3732/1530/files/Product-Comparison-Peregrine-PTX-Tern-TernTX-Teric-P2-EN.pdf?v=1715726696 (older 3-model sheet: https://shearwater.com/wp-content/uploads/2022/05/Product-Comparison-Peregrine-Perdix-Teric-EN.pdf)
* **[PPROD]** Peregrine product page – https://shearwater.com/products/peregrine
* Peregrine support page (manual links, FAQ, "Current Firmware Version: V89") – https://shearwater.com/pages/peregrine-support
* Peregrine TX support page (V102) – https://shearwater.com/pages/peregrine-tx-support
* Perdix 2 support page (V102) – https://shearwater.com/pages/perdix-2-support
* Teric support page (V37) – https://shearwater.com/pages/teric-support
* Tern support page (V36) – https://shearwater.com/pages/tern-support
* Tern TX support page (V36) – https://shearwater.com/pages/tern-tx-support
* Support & Downloads index – https://shearwater.com/pages/support
* **[FLY]** Shearwater blog, "Flying After Diving" (2015-08-19) – https://shearwater.com/blogs/community/flying-after-diving

Third-party pages seen during the search but **not** used as sources of fact: ManualsLib / Manuals+ / mans.io mirrors of the same PDFs; ScubaBoard threads on Peregrine desaturation time (https://scubaboard.com/community/threads/peregrine-how-to-check-desaturation-time.608900/) and Teric surface interval (https://scubaboard.com/community/threads/shearwater-teric-surface-interval.642272/); DIVER test of the Peregrine (https://divernet.com/scuba-gear/diver-test-shearwater-peregrine/).

Working copies of all PDFs and their per-page text extractions were kept under the session scratchpad (`scratchpad/shearwater/`), with page numbers = PDF page index = printed page number for all documents cited above.
