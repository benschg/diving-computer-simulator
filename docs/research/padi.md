# PADI reference research: dive computer simulator, teaching points, RDP and emergency decompression

Research date: 2026-10-09. Compiled from primary PADI sources (PADI Pros blog, padi.com, apps.padi.com, PADI product PDFs), the DSAT/PADI Recreational Dive Planner tables themselves, the PADI Open Water Diver Manual (2010-era edition, chapter 5 PDF), DAN, and reputable secondary sources (ScubaBoard, DIVE Magazine, Trustpilot, retailer listings). Every factual claim carries a source URL. Items that could not be confirmed are marked **UNVERIFIED**.

---

## 1. Summary

1. **PADI has shipped three different "dive computer simulators" since 2009, and the current one is a web app gated behind an access code.** (a) The original downloadable "PADI Computer Diving Simulator" (2009, generic computer, drag-and-drop diver icon, guided tutorials); (b) DiveNav's model-specific "divePAL" (2013-2015, accessed via ScubaEarth); (c) today's "PADI Computer Diving Simulator Portal" at apps.padi.com, which states "Internet connectivity is required ... and it may not be available in all languages" and is listed in the February-2020 eLearning as "Dive Computer Simulator (limited languages and online only)". Sources: https://pros-blog.padi.com/new-product-for-teaching-the-dive-computer-option-in-open-water/ , https://pros-blog.padi.com/padi-divepal-computer-simulator-intro-and-setup/ , https://apps.padi.com/scuba-diving/computer-diving-simulator/ , https://pro-cms.padi.com/sites/default/files/documents/training-hub/FAQ%20for%20Pros%20Site%2011%20Feb_EN.pdf
2. **Premise correction:** the simulator was not introduced with a "2019 revision". It dates from the 2009 table-less Open Water option; the manual revision that made computers the assumed planning tool was the 2013/2014 revision ("it's now assumed that student divers are using computers"); the current eLearning platform launched in late February 2020 in ten languages. Sources: https://pros-blog.padi.com/faq-for-new-dive-computer-option-in-open-water/ , https://scubadiverlife.com/changes-padi-open-water-diver-course/ , https://pros-blog.padi.com/new-padi-open-water-diver-elearning/
3. **PADI also hosts Suunto's "Learning Tools" (D4i Novo, Vyper Novo, Zoop Novo, EON Core; "Version: 1.2.0 Updated: 05/12/2017") on apps.padi.com/scuba-diving/diving-simulator/.** Its "virtual dives" are pre-rendered 99-frame image sequences (threesixty.js, `totalFrames: 100`) played after pressing START; the user cannot change depth, time or ascent rate. Its setup "tasks" are step-by-step button-press GIF tutorials. Source: https://apps.padi.com/scuba-diving/diving-simulator/ (fetched 2026-10-09; details in section 2.4).
4. **Interaction model of PADI's own (generic) simulator:** "Drag and drop the diver icon to increase depth and time"; "At each point, the dive computer shows the corresponding dive time, depth and no-decompression time" based on "a generic decompression model"; tutorials cover "single depth dives, multilevel dives, repetitive dives, scrolling no-decompression limits, and emergency decompression". Source: https://www.proscubadiver.net/padi-courses-cyprus/padi-computer-diving-simulator/
5. **Where it sits in the eLearning:** 2010 "Section Six" of "Open Water with RDP and Dive Computers"; by 2015 students "needed the dive computer simulator (Sections 4 and 5)"; in 2020 it is a separate component next to the RDP table/eRDPML quizzes. No public source lists graded simulator exercises (**UNVERIFIED** whether any simulator activity is assessed). Sources: https://pros-blog.padi.com/padi-open-water-online-course-with-dive-computers/ , https://scubaboard.com/community/threads/scuba-earth-simulator.503370/ , https://pro-cms.padi.com/sites/default/files/documents/training-hub/FAQ%20for%20Pros%20Site%2011%20Feb_EN.pdf
6. **Criticisms found:** generic ("essentially a generic dive computer for training purposes only"); access/registration outages (ScubaEarth, 2015); "minor editing errors" and "some glitches" (instructor Hawkwood); "pay to play" (2020); online-only and excluded from the offline PADI Training app; obsolete desktop requirements (Windows XP SP2); an instructor still using "screenshots" because nothing shows "a dive computer's display changing during a dive"; widespread 2019-2020 platform complaints ("performance is ridiculously slow", "slow, confusing learning interface"). None of the complaints we found is specifically about the current access-code-gated simulator (**UNVERIFIED**). Sources in section 2.6.
7. **PADI's computer rules (manual, chapter 5):** don't share; same computer all day; follow the most conservative computer; don't turn it off between dives; deepest dive first; "always try to have five or more minutes no decompression time remaining"; if it quits mid-dive, ascend, 5-minute safety stop, surface, possibly 12-24 h out; take the RDP as backup; "keep thinking". The 2019+ knowledge reviews add: turn the dive at the first limit reached; use plan mode; ascend no faster than 18 m/60 ft per minute "or the computer's rate, whichever is slower". Sources: https://razak.utm.my/shamsul/wp-content/uploads/sites/189/2012/10/Chapter_05.pdf , https://scubadivingoverload.com/padi-owd-section-4-knowledge-review-answers-explained/ , https://scubadivingoverload.com/padi-open-water-rdp-knowledge-review/
8. **RDP no-decompression limits were read directly from the DSAT/PADI tables (rendered PDF images):** metric 10 m 219, 12 m 147, 14 m 98, 16 m 72, 18 m 56, 20 m 45, 22 m 37, 25 m 29, 30 m 20, 35 m 14, 40 m 9, 42 m 8; imperial 35 ft 205, 40 ft 140, 50 ft 80, 60 ft 55, 70 ft 40, 80 ft 30, 90 ft 25, 100 ft 20, 110 ft 16, 120 ft 13, 130 ft 10, 140 ft 8. Sources: https://www.divinglore.com/wp-content/uploads/2022/01/RDP_Table_meters.pdf , https://a1scubadiving.com/wp-content/uploads/2018/06/PADI-Recreational-Dive-Table-Planner.pdf
9. **Emergency decompression (PADI/RDP):** exceeded by no more than 5 min -> 8-minute stop at 5 m/15 ft, mandatory, then at least 6 hours out of the water; exceeded by more than 5 min -> 5 m/15 ft stop of no less than 15 minutes "urged (air supply permitting)", then at least 24 hours out. With a computer: "it will go into decompression mode, which guides you through the emergency decompression stop"; many computers show the stop at 3 m/10 ft; stopping at 5 m "will still work"; no repetitive dive afterwards. Sources: RDP PDFs above; https://razak.utm.my/shamsul/wp-content/uploads/sites/189/2012/10/Chapter_05.pdf
10. **Design opportunity:** everything PADI offers is either passive (frame playback), generic, gated, or desktop-era. A browser simulator with a user-driven real-time profile, model-faithful button logic, PADI-aligned scenarios (NDL approach, safety stop, emergency deco at 3 m vs 5 m, ascent violation, repetitive dive/plan mode, failure drill, no-fly), buddy-computer comparison, and instant feedback would exceed it. Community precedents already exist (Antjac's open-source simulator, 2026; dive-sim.com Perdix emulator). Source: https://scubaboard.com/community/threads/free-dive-computer-simulator.671160/

---

## 2. PADI eLearning Dive Computer Simulator

### 2.1 Lineage and dates (what "the PADI simulator" actually is)

| Date | Product | Evidence |
|---|---|---|
| 29 Jul 2009 | **PADI Computer Diving Simulator** (downloadable, generic) launched with the booklet *How to Use and Choose Dive Computers*, "part of the new, table-less version of PADI's Open Water course". The simulator lets students "watch how a generic dive computer behaves"; it shows "what to expect from a predive NDL scroll, square and multilevel dives, both single and repetitive" and "the effects of surface intervals on repetitive dive times", and "reviews failed-computer and emergency decompression procedures". | https://pros-blog.padi.com/new-product-for-teaching-the-dive-computer-option-in-open-water/ |
| 10 Sep 2009 | PADI FAQ: the simulator "is a generic dive computer used to illustrate some topics from the computers manual"; "The simulator is a free download." Computer students read the whole manual, do Knowledge Reviews 1-3 and two Knowledge Reviews from the computer booklet instead of KR 4-5. Computer crew-pak part no. 60335; table sold separately 60099. | https://pros-blog.padi.com/faq-for-new-dive-computer-option-in-open-water/ |
| 10 Dec 2009 | Enriched Air Diver "dive computer version" crewpak 70480 with a "New dive computer simulator for Nitrox". | https://pros-blog.padi.com/dive-computer-version-of-enriched-air-nitrox-specialty-materials-now-available/ |
| 17 Jun 2010 | Open Water eLearning gets a sixth module on dive computers (students enrolled on/after 8 June 2010) covering "common dive computer features, responsible use, and what to do if a computer fails"; it "includes a download link to the Dive Computer Simulator"; it is "not a substitute for the dive planning module" (table/eRDPML). Instructors preview it at elearning.padi.com > "Open Water with RDP and Dive Computers" > Section Six. | https://pros-blog.padi.com/padi-open-water-online-course-with-dive-computers/ |
| 7 Feb 2011 | Nitrox simulator screengrab described: two divers at the same depth, "the diver on regular air has 3 minutes of no-decompression time left, and the diver on enriched air has 45 minutes" ("which of these divers would you rather be?"). | https://pros-blog.padi.com/sell-nitrox-classes-using-the-dive-computer-simulator/ |
| 31 Oct 2013 | PADI/DiveNav deal: computer-option students get DiveNav's **divePAL** Advanced and Nitrox simulators plus one model-specific simulator; Buhlmann ZH-L16C with adjustable conservatism; graphs of depth, time, nitrogen loading and tank pressure; screens for decompression stop, high PO2 and fast-ascent alarm; "Limited distribution ... as early as December 2013". PADI's Bob Coleman: students can "learn how to use their model-specific dive computers long before entering the water." | https://scubaboard.com/community/threads/divenav-news-padi-includes-advanced-computer-simulator-with-open-water-diver-course.469027/ |
| 4 Feb 2014 | PADI Pros: divePAL is "an improved dive computer simulator"; students "choose from a wide variety of different computers and practice plotting and analyzing their dives"; Windows desktop/laptop or Apple iPad; included with crewpaks 60335 and 70821, a la carte product 70275. | https://pros-blog.padi.com/padi-divepal-computer-simulator-intro-and-setup/ |
| 2014-2016 | DiveNav's own caveat: "divePAL does NOT completely simulate model-specific dive computers. As an example, Settings and Alternate screens are not supported"; core screens are "main surface screen, main dive screen, deco alarm screen, fast ascent alarm and safety stop screen". | https://scubaboard.com/community/threads/divepal-w-supported-dive-computers.394661/ |
| 12 May 2017 | **Suunto Learning Tools** web app (D4i Novo, Vyper Novo, Zoop Novo, EON Core), "Version: 1.2.0 Updated: 05/12/2017", hosted by PADI at apps.padi.com/scuba-diving/diving-simulator/. | https://apps.padi.com/scuba-diving/diving-simulator/ |
| 9 Apr 2019 | DIVE Magazine: plastic eRDPML retired "in favour of the digital training aid, which has been available for some time as an eLearning asset, and lately as an app"; "after dive computers were added as an option in Open Water teaching standards, the use of tables for training generally declined". | https://divemagazine.com/scuba-diving-training/padi-retires-the-erdp-ml |
| Feb 2020 | **New Open Water Diver eLearning** launched "at the end of February" in ten languages ("Chinese (Traditional and Simplified), Dutch, English, French, German, Italian, Japanese, Korean and Spanish"); includes "Dive Computer Simulator (limited languages and online only)", "RDP Table (PDF) with Instructions for Use", "eRDPML with Instructions for Use", RDP/eRDPML quiz and final exams. "The Open Water Diver Online product will no longer be available as it is replaced by the new eLearning." | https://pro-cms.padi.com/sites/default/files/documents/training-hub/FAQ%20for%20Pros%20Site%2011%20Feb_EN.pdf , https://pros-blog.padi.com/new-padi-open-water-diver-elearning/ |
| 2026 (live) | **PADI Computer Diving Simulator Portal**: "provides tutorials that replicate various diving circumstances and profiles and shows you what to expect from a typical dive computer. Internet connectivity is required to access the PADI Computer Diving Simulator, and it may not be available in all languages. Note: The PADI Computer Diving Simulator is for training purposes only. It should not be used for planning actual dives." Access: "Enter the code from your Computer Dive Simulator access card at the prompt" (form field "Enter your code"; app at CDS.aspx). | https://apps.padi.com/scuba-diving/computer-diving-simulator/ , https://apps.padi.com/scuba-diving/computer-diving-simulator/CDS.aspx |

Interpretation: the "Dive Computer Simulator (limited languages and online only)" in the 2020 eLearning is most consistent with the apps.padi.com portal (identical "internet connectivity required / not all languages" wording). Whether the portal app is a web port of the 2009 generic simulator or the Suunto tool could not be confirmed because it is access-code gated (**UNVERIFIED**). Retailers still list "Dive computer simulator" as an included item (https://aquariusdivers.com/products/elearning_open_water_diver , https://www.houseofscuba.com/products/book205).

### 2.2 What the generic PADI simulator looks like / displays

- "At each point, the dive computer shows the corresponding dive time, depth and no-decompression time" based on "a generic decompression model"; it is "essentially a generic dive computer for training purposes only". https://www.proscubadiver.net/padi-courses-cyprus/padi-computer-diving-simulator/
- It is "a desktop application that shows you what you can expect from a 'typical' dive computer" and users "drag and drop the diver icon to increase depth and time". https://www.proscubadiver.net/padi-courses-cyprus/padi-computer-diving-simulator/ (also echoed by https://padi-computer-diving-simulator.software.informer.com/ , which could not be fetched directly: 403)
- Tutorials: "single depth dives, multilevel dives, repetitive dives, scrolling no-decompression limits, and emergency decompression". Same source.
- System requirements (original): "PC: Microsoft Windows XP SP2, Intel Pentium II 450MHz or equivalent, 128MB RAM"; Mac "OSX"; "about 30MB hard drive space". Same source. Version seen in the wild: "PADI Computer Diving Simulator v1.0.4" (ScubaBoard list, 10 Jan 2020). https://scubaboard.com/community/threads/dive-computer-simulator.590242/
- No screenshot of the generic simulator could be retrieved (image captions only: "The PADI Computer Diving Simulator in action!"). **UNVERIFIED** layout details beyond the above.

### 2.3 How users interact with it

- Generic PADI simulator: drag the diver icon to set depth/time; follow guided tutorials; NDL "scroll" (predive planning display). https://www.proscubadiver.net/padi-courses-cyprus/padi-computer-diving-simulator/ , https://pros-blog.padi.com/new-product-for-teaching-the-dive-computer-option-in-open-water/
- divePAL: plan/plot dives, analyse graphs; model-specific skins; no settings/alternate screens. https://pros-blog.padi.com/padi-divepal-computer-simulator-intro-and-setup/ , https://scubaboard.com/community/threads/divepal-w-supported-dive-computers.394661/
- Suunto Learning Tools (PADI-hosted): see 2.4. No depth/time controls; START then watch; button tutorials.
- No source describes "time speed", "descend/ascend buttons" or user-selectable scenarios in the current online PADI simulator (**UNVERIFIED**).

### 2.4 PADI-hosted Suunto Learning Tools (apps.padi.com/scuba-diving/diving-simulator/) in detail

Fetched 2026-10-09 (pages, JS and frame images).

- Landing: "Welcome to Suunto Learning Tools. Please choose a dive computer" - D4i Novo, Vyper Novo, Zoop Novo, EON Core. Languages: EN, ES, FR, DE, IT, NL, RU, Chinese, Japanese, Korean (ten). "About this App Version: 1.2.0 Updated: 05/12/2017". Built with jQuery Mobile and Cordova (it is the same code as Suunto's "Suunto Dive Learning Tools" app, developer Suunto Oy, v1.2 28 Jul 2016, App Store rating 2.4/5 from 11 ratings, with recent reviews reporting the app "closes when selecting the diving computer"). https://apps.padi.com/scuba-diving/diving-simulator/ , https://apps.apple.com/us/app/suunto-dive-learning-tools-teach-yourself-how-to-set/id911410807
- Zoop Novo menu: "What kind of dive would you like to do? Scuba Dive with Air / Scuba Dive with EANx / Freediving". Air tasks: "Basic Settings, Setup Air Mode, Virtual Dive (12m AIR), Review Log Book, After Diving, Connect & Share". EANx tasks: "Setup EANx Mode, Virtual Dive (30m EANx)". Freediving: "Virtual Freedive (10m)". Tips shown: "In case you want to do an AIR dive after a EANx dive within the next 48 hours, choose EANx dive mode and set oxygen percentage to 21%." A specifications tab lists "Decompression model Suunto RGBM", "Safety stop", "Deepstop", alarms for "Too fast ascent", "Decompression ceiling violation", "Deepstop violation", "OLF (CNS / OTU combined) 80% / 100%". https://apps.padi.com/scuba-diving/diving-simulator/zoop/index.html
- **Virtual Dive 12 m (air)** - the page is a 99-frame image player (`sequences/seq1/frame0001.jpg` ... ; `totalFrames: 100`) with a START button and a fallback "Sorry - Your device does not support this technology", plus Facebook/Twitter share ("You have just dived to 12m with the Learning Tool."). Callouts (verbatim):
  - "Recommended Safety Stop (Between 3m/6m): When your dive exceeded a depth of 10m a safety stop of 3 minutes at 3-6 meters will be recommended to reduce the risk of DCI. Although recommended, this stop is not strictly required and you won't be penalized when violating it."
  - "No Decompression Time (Minutes): When exceeding a certain depth this figure shows the remaining time you could stay at your present depth without being in need of decompression while ascending."
  - "Ascent Rate Indicator (No Violation): This indicator is keeping track of your ascent rate, warning you when exceeding 10m/min for more than 5 seconds."
  - "Air Time Remaining ... respects a safety margin of 30-50 bar (435-725 psi) that will be left when the air time shows zero."
  - Field list: Tank Pressure, Recommended Safety Stop, Present Depth, Water Temp, Air Time, Dive Time, "No Deco Time (Void - Too Shallow)", Battery, Max Depth, Safety Stop Time Left.
  https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-12m/index.html
- **Virtual Dive 30 m (EANx)** callouts (verbatim): "Safety Stop Ceiling: The presence of the ceiling depth signifies you that a mandatory safety stop is required (due to ascent rate violation)."; "Deep Stop Ceiling: When deep stops are activated and the dive was deeper than 20m (65 ft) 'DEEPSTOP' and the respective depth (ceiling) will be shown."; "Safety Stop Time Left ... As this is a mandatory safety stop (due to ascent rate violation) ascending earlier is considered as a violation and will be causing shorter no-deco-times of subsequent dives."; "Ascent rate indicator (violation occurred) ... This occurred here and will lead into a mandatory safety stop." Fields include Nitrox O2%, PO2 readout. https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-30m/index.html
- **Screenshot descriptions (frames downloaded from the sequences):** a monochrome Zoop Novo LCD is composited over a 3D-rendered wreck scene. Frame 1 of the 12 m dive: depth "0.5 m" with an "AC" (ascent) indicator column, blank "NO DEC TIME" ("-"), "MAX 0.5 m", "DIVE TIME 0". Frame 60: "8.5 m", NO DEC TIME bar, "MAX 12.0 m", dive time "2x". Frame 30 of the 30 m EANx dive: "29.9 m", "CEILING 15", "DEEPSTOP 47" (seconds countdown), "O2% 32", "PO2 1.3", NO DEC TIME label. Frame 85: "3.0 m", "O2% 32", "DIVE TIME 30", NO DEC TIME "-". There is no interaction: the frames simply advance.
- **Setup tasks** are numbered button-press tutorials with animated GIFs, e.g. "Press and hold the DOWN button to open up the general settings menu ... Press the UP button to increase the percentage until you get to 32% ... The PO2 readout is now flashing, showing that the partial pressure is set at 1.4." https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-nitrox/dive-mode-nitrox.html
- **After Diving** task explains the surface screen: "The airplane symbol in the top right and no-fly value in the center, indicate you should not fly (or ascend to altitude) for 14 hours and 28 minutes ... The diver attention symbol means you should prolong your surface interval time ... If the display shows the error symbol it means you violated the decompression ceiling, or too long bottom time." https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-air/after-diving.html
- **Review Log book** task: three logbook screens (max depth/time/date/dive time; max depth, surface time, average depth, consumed pressure; temperature, tank pressure and "a graphical dive profile" you can "play through" with UP). https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-air/mem-log.html

### 2.5 Scenarios, exercises and knowledge checks tied to the simulator

- 2009 booklet/simulator tutorials: single depth, multilevel, repetitive dives, scrolling NDLs, emergency decompression; shows NDL scroll, surface-interval effects, failed-computer procedures. https://www.proscubadiver.net/padi-courses-cyprus/padi-computer-diving-simulator/ , https://pros-blog.padi.com/new-product-for-teaching-the-dive-computer-option-in-open-water/
- 2010 eLearning: dedicated "Section Six" on computers with the simulator download link. https://pros-blog.padi.com/padi-open-water-online-course-with-dive-computers/
- 2015 eLearning (Touch/online era): a student "registered for Open Water and needed the dive computer simulator (Sections 4 and 5) from scubaearth.com". https://scubaboard.com/community/threads/scuba-earth-simulator.503370/
- 2020 eLearning: simulator is a separate listed component; "The sections, Knowledge Reviews and quizzes can be accessed in any order"; Final Exam needs 75% in two attempts; RDP/eRDPML quiz and final exams are separate assessments. https://pro-cms.padi.com/sites/default/files/documents/training-hub/FAQ%20for%20Pros%20Site%2011%20Feb_EN.pdf
- Knowledge Review items that the simulator supports (2019+ manual wording, via answer-explainer sites): Section 4 - "A no stop dive means I can, at any time during the dive, ascend directly to the surface without stopping if necessary"; "I must use the same dive computer the entire day of diving, on all dives, and not share it with another diver" (True); "During a dive with my dive computer, my buddy and I will turn the dive based on the first limit we reach" (True); "When diving with a computer, it is recommended that I ... dive well within its limits, follow the most conservative computer - mine or my buddy's, start at the deepest point"; "During a dive, my dive computer fails, and I'm not using a backup. I should ... ascend, make a safety stop and end the dive". Section 5 - after a 15 m/60 min dive, to find how long to stay at the surface: "Wait and check our no stop times on our computers periodically, use the dive computer plan mode if available, use a dive planning app, check the RDP Table or eRDPML"; flying after a single no-stop dive: "12 Hours"; altitude procedures above "300 metres / 1000 feet"; entanglement delaying ascent past NDL -> "Emergency decompression"; surfaced without the stop -> "Relax, breathe oxygen, and check themselves for DCS symptoms" and no diving for at least 24 hours; not enough air for the stop -> "Stop as long as I can but save enough air to surface and exit safely". https://scubadivingoverload.com/padi-owd-section-4-knowledge-review-answers-explained/ , https://scubadivingoverload.com/padi-owd-section-5-knowledge-review-answers-explained/ , https://openwateranswers.wordpress.com/ , https://www.brainscape.com/flashcards/knowledge-review-5-7824408/packs/12873663
- **UNVERIFIED:** whether the current eLearning contains graded "simulator practice" activities (e.g. "make a dive within NDL", "do a safety stop", "perform a repetitive dive", "use planning mode"). No PADI source, YouTube description or forum post describing such exercises was found. The user's premise that the simulator is also "referenced in the ReActivate and Advanced Open Water eLearning" could not be confirmed: ReActivate listings mention "dive computers" as one of 20 scenario topics but no simulator (https://aquariusdivers.com/products/elearning_reactivate); the AOW eLearning announcement lists Introduction, Thinking Like a Diver and 13 Adventure Dives with no simulator (https://pros-blog.padi.com/padi-advanced-open-water-diver-elearning/).
- YouTube: no video showing the PADI eLearning simulator was found; the only related videos are "Introduction to your PADI eRDPML" (Absolute Scuba Ltd, https://www.youtube.com/watch?v=Bh0w17tYkrU) and "PADI eLearning" (Waterline Diving, https://www.youtube.com/watch?v=cUs8NA3VjPE), plus a third-party eDiving demo of an Oceanic Veo 3.0 (https://www.youtube.com/watch?v=Xw3P1JKaTB8).

### 2.6 Criticisms (with quotes)

- **Generic / not representative:** "It's essentially a generic dive computer for training purposes only." https://www.proscubadiver.net/padi-courses-cyprus/padi-computer-diving-simulator/ ; Hawkwood (ScubaBoard, 19 Aug 2014) called the tool valuable "despite some glitches", "generic and meant to show how to use computers while diving". https://scubaboard.com/community/threads/computer-vs-tables.489904/page-3
- **Editing errors / discontinuity:** Hawkwood (22 Mar 2015): the PADI Computer Dive Simulator "has gone by the wayside", "a terrific teaching tool, despite some minor editing errors". https://scubaboard.com/community/threads/scuba-earth-simulator.503370/
- **Access failures:** W1ngz (22 Mar 2015) could not register for the simulator (Sections 4 and 5) on scubaearth.com after trying two machines; DiveNav: "I can confirm that there is an issue with this on SE side." https://scubaboard.com/community/threads/scuba-earth-simulator.503370/ ; a 2014 student: "there was no online simulator". https://scubaboard.com/community/threads/computer-vs-tables.489904/page-3
- **Paywalled:** Zef (9 Jan 2020): "PADI has an online app, but I think it is pay to play." https://scubaboard.com/community/threads/dive-computer-simulator.590242/
- **Not interactive enough for teaching:** Rollin (14 Jan 2020) wants "a classroom simulator that shows a dive computer's display changing during a dive"; he uses screenshots, "hardly interactive". https://scubaboard.com/community/threads/dive-computer-simulator.590242/
- **Online only / not in the offline app:** "Dive Computer Simulator (limited languages and online only)"; the PADI Training app "is intended for offline use only - it's not a streaming app". https://pro-cms.padi.com/sites/default/files/documents/training-hub/FAQ%20for%20Pros%20Site%2011%20Feb_EN.pdf ; portal: "Internet connectivity is required". https://apps.padi.com/scuba-diving/computer-diving-simulator/
- **Partial model simulation (divePAL):** "divePAL does NOT completely simulate model-specific dive computers. As an example, Settings and Alternate screens are not supported." https://scubaboard.com/community/threads/divepal-w-supported-dive-computers.394661/
- **Passive playback (Suunto tool):** virtual dives are fixed 99-frame sequences; the only control is START (observed in page source, section 2.4). The Suunto app itself is rated 2.4/5; reviewers report it "closes and returns to the Home Screen when either of the three dive computers is selected". https://apps.apple.com/us/app/suunto-dive-learning-tools-teach-yourself-how-to-set/id911410807
- **Obsolete requirements:** "Windows XP SP2, Pentium II 450MHz, 128MB RAM". https://www.proscubadiver.net/padi-courses-cyprus/padi-computer-diving-simulator/
- **Pedagogy:** DevonDiver (27 Apr 2017): divers are "completely fuddled" when faced with emergency deco info on their computers, and learning the computer's emergency deco mode "should be taught at Open Water level"; boulderjohn: RDP-based emergency deco "makes no sense" for computer divers. https://scubaboard.com/community/threads/decompression-stop-guidelines-what-we-have-to-do-if-got-deco-alert.543845/
- **eLearning platform (general, 2019-2020 Trustpilot, 1-star):** "Good quality learning materials, when it works, which is rare" (Zachary King, 18 Nov 2019); "slow, confusing learning interface which is pointlessly difficult to access and use" (Katharine Scarfe Beckett, 17 Jan 2020); "The performance is ridiculously slow" (Edu, 6 Aug 2020); "It says your submission failed undefined" (Daramuno, 6 Jul 2020). https://ie.trustpilot.com/review/www.padi.com?page=10
- **eLearning content (German review, 2024-25):** subtitles sometimes out of sync with the English audio, lip-sync quality "schwankt"; repetitive content; otherwise visualisations "wirklich stark"; the only computer content noted is a video on "wie ein Tauchcomputer eine No-Deco-Zeit berechnet". https://www.tauchenkohtao.com/blog/padi-elearning-erfahrungen/
- **Browser-tab navigation:** "There are no navigation buttons to exit and return to the main page - students simply close the browser tab". https://pros-blog.padi.com/new-padi-open-water-diver-elearning/
- Reddit could not be searched (blocked for the search tool); no Reddit criticism is cited.

---

## 3. PADI dive computer teaching points

### 3.1 From the PADI Open Water Diver Manual, chapter 5 "Using a Dive Computer" (2010-era edition, pp. 223-225)

Source: https://razak.utm.my/shamsul/wp-content/uploads/sites/189/2012/10/Chapter_05.pdf (verbatim excerpts)

1. "Computers are sophisticated calculators with depth gauges and timers that calculate theoretical nitrogen in the body. They're no more or less valid than dive tables ... The recommendations for conservative diving with tables apply to computer diving."
2. "Don't share your computer. Each diver needs an individual computer ... it must stay with one diver for the entire dive day - you can't swap between dives. You can't share a computer within a buddy team either because it tracks depth quite closely."
3. "Follow the most conservative computer. Surface or ascend when either computer - yours or your buddy's - approaches its no decompression limit. If you follow the least conservative, you're in effect sharing that computer, which you shouldn't do."
4. "Don't turn your computer off between dives ... if you take out the battery or shut the computer down, it loses its memory of your previous dives and your residual nitrogen."
5. "Make your deepest dive first and plan successive dives to progressively shallower depths. During a dive, start at the deepest point and work your way shallower."
6. "Stay well within computer limits. Always try to have five or more minutes no decompression time remaining. If you let it near or reach zero, you've pushed the limits even though you'll have plenty of no stop time when you ascend to a shallower depth."
7. "If your computer quits, you may need to stop diving for 12 to 24 hours. If it quits during a dive and you've been staying well within the no decompression limits, ascend immediately to 5 metres/15 feet, make a safety stop for five minutes or more and surface. You can't simply grab another computer because it won't know how much residual nitrogen you have."
8. "Take the RDP with you when you go diving ... If you've been noting your depths and times ... and your dives have been [within] RDP limits, you can continue diving using the RDP. Otherwise, you'll probably have to wait until the next day."
9. "Keep thinking. Dive computers can fail just like any other piece of equipment. Don't blindly accept everything your computer says, especially when it appears way out of line with a buddy's computer or your previous experience. Read the manufacturer's instructions completely before using your computer."
- Quick quiz: "Any dive that your computer provides no decompression dive time for is acceptable. False. Your computer may provide data for dives that aren't recommended."
- Safety stop: "stop your ascent in the 3 to 6 metre/10 to 20 foot range - usually at 5 metres/15 feet for three minutes or longer"; required if the dive was "to 30 metres/100 feet or deeper", within three pressure groups of the NDL, or "You reach any limit on the Recreational Dive Planner or your dive computer. With a dive computer, this would be if your computer shows zero NDL time remaining at any point in the dive." "A computer will process safety stop time automatically." Plan to reach the surface "with 20-40 bar/300-500 psi or more".
- Cold/strenuous dives: with a computer "set the computer to be more conservative by using the altitude setting ... However, you have to make these settings before the dive"; otherwise "always have plenty of no decompression time remaining".
- Altitude: special procedures above "300 metres/1000 feet"; "most computers give you their no decompression limits based on a dive ending at sea level".

### 3.2 From the current (2019+) Open Water knowledge reviews

- Ascent rate: "When using the RDP, I should ascend no faster than 60 feet / 18 metres per minute or the computer's rate, whichever is slower." https://scubadivingoverload.com/padi-open-water-rdp-knowledge-review/ ; "Exceeding my computer or table's ascent rate may increase my risk of DCS" (True). https://scubadivingoverload.com/padi-owd-section-4-knowledge-review-answers-explained/
- "As a prudent, conservative diver, the following are normal parts of my ascents: ascending at 18 m/60 ft per minute [or slower] ... stopping for 3 minutes at approximately 5 m/15 ft". https://openwateranswers.wordpress.com/
- Same computer all day, no sharing; turn the dive on the first limit reached (NDL or air turn pressure); follow the most conservative computer; start at the deepest point; computer failure -> ascend, safety stop, end dive (section 2.5 above).
- Plan mode: "use the dive computer plan mode if available" to see how long to wait at the surface for enough no-stop time on a repetitive dive. https://scubadivingoverload.com/padi-owd-section-5-knowledge-review-answers-explained/
- Flying: 12 hours after a single no-stop dive; 18 hours after repetitive/multi-day; cold/exercise may leave more nitrogen than calculated (True). Same source.

### 3.3 From PADI ReActivate Quick Review (609DT 8/14)

Source: https://cdn.shopify.com/s/files/1/0410/8638/6335/files/ReActivate-Quick-Review.pdf (verbatim)
- Q17: "I've just invested in a new dive computer. The first thing I should do with it is ... read the manufacturer's instructions."
- Q18: minimum time after the second dive before a commercial flight - options 48/24/18/12 hours (PADI/DAN answer for repetitive dives is 18 hours; see 3.5).
- Q19: "I check my dive computer and discover that it is completely dead, and I'm not using a backup computer. The correct action is to ... ascend immediately, make a safety stop and surface" (not "continue the dive based on my buddy's computer").
- Q20: "we've accidentally exceeded our computers' no stop limits ... now we should ... decompress according to the computers' instructions."
- Q21: at 30 m "I feel a bit 'drunk' and have trouble reading my dive computer" -> gas narcosis.

### 3.4 From PADI consumer pages and blog

- padi.com gear page: a dive computer "takes depth and time information and applies it to a decompression model to track the dissolved nitrogen in your body during a dive". Standard features: "No-stop limits and no-stop time remaining; Depth and time; Ascent rate; Emergency decompression information; Previous dive information", plus low-battery warning and enriched-air compatibility. Optional: air integration, altitude adjustment, multiple gas/CCR modes, PC connectivity, compass, thermometer, "self-adjusting decompression models". Advice: "Read the instruction booklet, test each function, and set preferences such as units and time/date"; check you can read the display with a mask on. https://www.padi.com/gear/dive-computers
- PADI blog "The Golden Rules of Scuba Diving" (Danielle Schofield, 21 Nov 2024): ascend "no faster than 18 meters /60 feet per minute"; safety stop "at 5 meters/15 feet for at least three minutes"; plan dives "within no-decompression limits" with a computer or tables; "Plan the dive, dive the plan"; monitor gauges every few minutes; "wait 12 to 24 hours before flying after any dive". https://blog.padi.com/the-golden-rules-of-scuba-diving/
- PADI blog "The Science Behind How Dive Computers Work" (Megan Denny, 28 May 2026): computers use "theoretical tissue types, known as compartments" (some 16); "A computer is only as smart as its user"; the author did not know "Ceiling" meant stay below a depth; "A computer isn't going to keep you from getting injured underwater"; less conservative settings increase risk. https://blog.padi.com/how-dive-computers-work/
- PADI blog "How to Choose the Best Dive Computer for You" (Josh Kaplan, 19 Mar 2018): budget $150-$1,500+; independent vs air-integrated; algorithms differ in conservatism; essentials: backlight, water activation, adjustable alarms, readable max depth/current depth/dive time/no-stop time. https://blog.padi.com/choose-best-dive-computer/
- PADI blog "New Divers: Buying a Dive Computer 101" (Brandon Scott, 23 Jul 2013): readable display, programmable alarms, low-battery warning, nitrox compatibility. https://blog.padi.com/new-divers-buying-a-dive-computer/
- PADI blog "History of the Safety Stop" (27 Apr 2015): "stop at 5 metres / 15 feet for three minutes"; US Navy 60 ft/min origin, later 30 ft/min; 1988 RDP popularised the stop; "S.A.F.E. Diver - Slowly Ascend From Every Dive". https://blog.padi.com/history-of-the-safety-stop/
- PADI blog "Your Guide to Surface Intervals" (Andrew Keaveny, 3 May 2023): "Dive computers do the calculations for you"; after a dive the computer shows "how long you can stay at the planned depth for the next dive"; "you stay on the surface longer until the computer shows the time you want". https://blog.padi.com/your-guide-to-surface-intervals-a-crucial-element-of-scuba-diving/
- PADI blog "10 Things You Should Never Do Immediately After Diving" (Megan Denny, updated 10 Jun 2024): DAN guidance 12 h single no-deco dive, 18 h multiple dives/days, 24 h after deco dives; "you should wait longer if directed by the no-fly time indicated on your dive computer"; avoid altitude activities for 24 h. https://blog.padi.com/7-things-you-should-never-do-immediately-after-diving/

### 3.5 DAN (as referenced by PADI)

- "A minimum of 12-hour surface interval was recommended for the single no-decompression dive"; "A minimum of 18-hour surface interval for multi-day repetitive diving"; "Substantially longer than 18 hours after diving involving compulsory decompression". https://dan.org/health-medicine/health-resource/health-safety-guidelines/guidelines-for-flying-after-diving/
- DAN on computer failure (Alert Diver, 2010): "Failure of a dive computer usually means you must immediately abort the dive"; "it is unsafe to rely on a buddy's computer for decompression status"; "The best solution is to wear two computers" with the same conservatism, worn on every dive of the series; otherwise follow flying-after-diving intervals before starting over. https://dan.org/alert-diver/article/your-computer-fails-now-what/

### 3.6 Course-standard context

- PADI consumer FAQ: students need "a dive-planning device such as a dive computer, RDP table or eRDPML" and a logbook. https://www.padi.com/help/scuba-certification-faq
- Open Water dives: one assessed skill is to "use a dive computer or recreational dive planner (RDP) to plan the dive using the PADI Skill Practice and Dive Planning Slate"; dives 3-4 max 18 m/60 ft. https://blog.padi.com/padi-open-water-dives/
- 2013/14 revision: "it's now assumed that student divers are using computers"; mini-dive; air management; "gas narcosis". https://scubadiverlife.com/changes-padi-open-water-diver-course/
- PADI Instructor Manual 2020 folded in the 2019 Training Bulletins; the only Open Water change listed is CESA wording (no computer-standard change found). https://pros-blog.padi.com/padi-instructor-manual-2020/ (**UNVERIFIED**: exact current instructor-guide wording on computers; the manual is members-only.)

---

## 4. PADI Recreational Dive Planner (RDP) no-decompression limits

Values read directly from the DSAT/PADI tables (PDF pages rendered to images and checked visually; the black cells in Table 1 mark the NDL and its pressure group).

### 4.1 Metric table (Product No. 66055 Ver 1.2 Rev 02/03, DSAT 1985-2003)

Source: https://www.divinglore.com/wp-content/uploads/2022/01/RDP_Table_meters.pdf

| Depth | NDL (min) | Pressure group at NDL |
|---|---|---|
| 10 m* | 219 | Z |
| 12 m | 147 | Z |
| 14 m | 98 | Y |
| 16 m | 72 | X |
| 18 m | 56 | W |
| 20 m | 45 | U |
| 22 m | 37 | S |
| 25 m | 29 | Q |
| 30 m | 20 | N |
| 35 m | 14 | K |
| 40 m | 9 | G |
| 42 m | 8 | F |

*"10.5m actual; 10m used for easy depth gauge monitoring." Grey cells = "Safety stop required" (within three pressure groups of the NDL).

### 4.2 Imperial table (Product No. 66054 Ver 1.2 Rev 02/03, DSAT 1985-2005)

Source: https://a1scubadiving.com/wp-content/uploads/2018/06/PADI-Recreational-Dive-Table-Planner.pdf

| Depth | NDL (min) | Pressure group at NDL |
|---|---|---|
| 35 ft | 205 | Z |
| 40 ft | 140 | Z |
| 50 ft | 80 | X |
| 60 ft | 55 | W |
| 70 ft | 40 | T |
| 80 ft | 30 | R |
| 90 ft | 25 | Q |
| 100 ft | 20 | O |
| 110 ft | 16 | M |
| 120 ft | 13 | K |
| 130 ft | 10 | H |
| 140 ft | 8 | F |

Corroboration (secondary): 60 ft = 55 min, 100 ft = 20 min, 10 m = 219 min, 18 m = 56 min. https://www.divetalking.com/?page_id=12542 , https://scubaboard.com/community/threads/rdp-m-values-and-ndl-limits.217394/

### 4.3 Rules printed on the RDP (verbatim, metric side; imperial equivalents in brackets)

Sources: the two PDFs above.
- "The Recreational Dive Planner is designed specifically for planning recreational (no decompression) dives on air only. Do not attempt to use it for planning decompression dives."
- "Safety Stops - A safety stop for 3 minutes at 5m [15ft] is required any time the diver comes up to or within 3 pressure groups of a no decompression limit and for any dive to a depth of 30m [100ft] or deeper."
- "Ascend from all dives at a rate not to exceed 18m [60ft] per minute."
- "When planning a dive in cold water or under conditions that might be strenuous, plan the dive assuming the depth is 4m [10ft] deeper than actual."
- "Plan repetitive dives so each successive dive is to a shallower depth. Limit repetitive dives to 30m [100ft] or shallower."
- "Never exceed the limits of this planner and, whenever possible, avoid diving to the limits of the planner. 42m [140ft] is for emergency purposes only, do not dive to this depth."
- "Special Rules for Multiple Dives - If you are planning 3 or more dives in a day: Beginning with the first dive, if your ending pressure group after any dive is W or X, the minimum surface interval between all subsequent dives is 1 hour. If your ending pressure group after any dive is Y or Z, the minimum surface interval between all subsequent dives is 3 hours."
- "Diving at Altitude - Diving at altitude (300m [1000ft] or higher) requires the use of special procedures."
- "Flying After Diving Recommendations - For Dives Within the No Decompression Limits: Single Dives: A minimum pre-flight surface interval of 12 hours is suggested. Repetitive Dives and/or Multi-day Dives: A minimum pre-flight surface interval of 18 hours is suggested. For Dives Requiring Decompression Stops: A minimum pre-flight surface interval greater than 18 hours is suggested."
- Table 3: "White area indicates Residual Nitrogen Time (RNT) in minutes and is to be added to Actual Bottom Time (ABT). Blue area indicates adjusted no decompression limits."
- Manual addition: bottom time runs from the start of descent to the start of the final ascent; "You don't need to add safety stop to your bottom time when using the Recreational Dive Planner." https://razak.utm.my/shamsul/wp-content/uploads/sites/189/2012/10/Chapter_05.pdf , https://www.divetalking.com/?page_id=12542

### 4.4 eRDP / eRDPML (for computer-vs-table comparisons)

- RDP table 1988 (DSAT; Rogers/Powell); The Wheel; eRDP 2005; eRDPML 2008. https://en.wikipedia.org/wiki/Recreational_Dive_Planner , https://divemagazine.com/scuba-diving-training/padi-retires-the-erdp-ml
- eRDPML: "An electronic dive table ... Provides the same maximum dive times, surface interval information and pressure groups as the RDP - table and The Wheel"; "Not a computer, but a specialized calculator"; three modes: "Dive Planning, Minimum Surface Interval, Maximum Depth Planning"; multilevel up to three levels (Lvl1-Lvl3) giving NDL/ANDL per level; "When a value exceeds a limit ... Warning appears - Exceeds Limits, Alarm (three short beeps) sounds, Planning stops until limit is adjusted, Prompts to refer to printed rules". https://www.proscubadiver.net/wp-content/uploads/2009/09/IntroeRDPML.pdf
- The plastic eRDPML was retired in April 2019 in favour of the eLearning asset/app; the eRDPML Touch app includes "step-by-step instructions as well as practice exercises". https://divemagazine.com/scuba-diving-training/padi-retires-the-erdp-ml , https://pros-blog.padi.com/padi-erdpml-touch-now-available-3/
- Wikipedia notes the RDP "is more conservative than dive computers, which calculate limits based on the whole dive" and assumes a square profile. https://en.wikipedia.org/wiki/Recreational_Dive_Planner

---

## 5. Emergency decompression procedures per PADI

### 5.1 RDP rule (verbatim, metric side)

"Emergency Decompression - If a no decompression limit is exceeded by no more than 5 minutes, an 8 minute decompression stop at 5m is mandatory. Upon surfacing, the diver must remain out of the water for at least 6 hours prior to making another dive. If a no decompression limit is exceeded by more than 5 minutes, a 5m decompression stop of no less than 15 minutes is urged (air supply permitting). Upon surfacing, the diver must remain out of the water for at least 24 hours prior to making another dive." https://www.divinglore.com/wp-content/uploads/2022/01/RDP_Table_meters.pdf (imperial wording identical with 15ft: https://a1scubadiving.com/wp-content/uploads/2018/06/PADI-Recreational-Dive-Table-Planner.pdf)

### 5.2 Open Water Diver Manual, chapter 5 "Emergency Decompression" (verbatim)

Source: https://razak.utm.my/shamsul/wp-content/uploads/sites/189/2012/10/Chapter_05.pdf
- "You need to make an emergency decompression stop to allow your body to eliminate nitrogen; without this stop, you face an unacceptable risk of DCS when you surface."
- Using the RDP, by five minutes or less: "slowly ascend at a rate not faster than 18 metres/60 feet per minute to 5 metres/15 feet and remain there for eight minutes prior to surfacing. After reaching the surface, do not dive for at least six hours".
- By more than five minutes: "a 5 metre/15 foot stop for no less than 15 minutes is strongly urged, air supply permitting. Upon surfacing, you must remain out of the water at least 24 hours before diving again".
- "When making an emergency decompression stop, stay as close to 5 metres/15 feet as possible. If you don't have enough air for the emergency decompression stop, stay as long as you can, saving enough air to surface and exit safely. Discontinue diving for no less than 24 hours. Breathe pure oxygen if available and monitor yourself for decompression sickness symptoms."
- "Using a dive computer: If you exceed your computer's no decompression limits, it will go into decompression mode, which guides you through the emergency decompression stop. Computers differ in how they function in decompression mode, so consult the manufacturer's literature ... Many will show emergency decompression stops at 3 metres/10 feet instead of 5 metres/15 feet; stopping at 5 metres/15 feet until the computer says you can surface will still work, though, because the computer calculates the stop based on your actual depth. It may take a bit longer than the time indicated for a stop at 3 metres/10 feet. It's not recommended that you make a repetitive dive after a dive requiring emergency decompression."
- Quick quiz: "If you exceed the no decompression limit of your dive computer, make an emergency decompression stop as it directs in its decompression mode, and do not make a repetitive dive. True."
- Glossary: "Safety Stop - A stop made between 3 and 6 metres/10-20 feet ... recommended after all dives (air supply permitting)."

### 5.3 Current knowledge-review wording (2019+)

- Delayed ascent past the no-stop limit -> "Emergency decompression" stop required before surfacing; surfaced without it -> "Relax, breathe oxygen, and check themselves for DCS symptoms", no diving for at least 24 hours; insufficient air -> "Stop as long as I can but save enough air to surface and exit safely". https://scubadivingoverload.com/padi-owd-section-5-knowledge-review-answers-explained/ , https://openwateranswers.wordpress.com/
- ReActivate Q20: after exceeding "our computers' no stop limits ... decompress according to the computers' instructions". https://cdn.shopify.com/s/files/1/0410/8638/6335/files/ReActivate-Quick-Review.pdf

### 5.4 How instructors interpret this for computers (secondary)

- The Chairman (ScubaBoard, 26 Apr 2017): with a computer "please, please follow it", a fixed 8- or 15-minute stop "may not fulfill your deco obligation"; boulderjohn (27 Apr 2017): the current PADI computer course teaches computer-based emergency deco (manual pp. 227-228) and the RDP approach "makes no sense" for computer divers. https://scubaboard.com/community/threads/decompression-stop-guidelines-what-we-have-to-do-if-got-deco-alert.543845/
- Suunto Zoop behaviour as taught in the PADI-hosted tool: ascent-rate violation (>10 m/min for >5 s) triggers a "mandatory safety stop" with "CEILING"; "ascending earlier is considered as a violation and will be causing shorter no-deco-times of subsequent dives"; after a dive, "the error symbol ... means you violated the decompression ceiling, or too long bottom time". https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-30m/index.html , https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-air/after-diving.html

---

## 6. Advanced Open Water / specialty-level dive computer material

- AOW eLearning (2017 launch): Introduction and "Thinking Like a Diver" required; all 13 Adventure Dives included; Deep and Navigation recommended; knowledge-check questions after each subtopic; no simulator mentioned. https://pros-blog.padi.com/padi-advanced-open-water-diver-elearning/
- AOW Training Record (660DT Rev 09/21): Deep Adventure Dive performance items include "Computer/Depth Gauge Comparisons at Depth" and "Ascent - Safety Stop"; Altitude dive also "Computer/Depth Gauge Comparisons at Depth"; Enriched Air Adventure Dive: "Dive Planning - calculate maximum depth and time, and set dive computer", "Dive within planned depth/time limits". https://pro-cms.padi.com/sites/default/files/documents/training-hub/660DT_Advanced_Open_Water_Training_Record_v103.pdf
- PADI blog AOW FAQ (30 Mar 2024): the deep dive goes "below the Open Water Diver depth limits (18-30 meters/60-100 feet)", teaches planning around no-decompression limits; eLearning takes "about six to eight hours". https://blog.padi.com/padi-advanced-open-water-diver-faqs/
- Thinking Like a Diver: described by providers as "increasing situational awareness, managing task loading, and primary and backup concepts" and gas management (outbound/return/ascent/reserve). https://divelowkey.com/scuba-courses/padi-advanced-open-water/ , https://quizlet.com/227521812/padi-advanced-open-water-flash-cards/ (**UNVERIFIED**: exact PADI wording)
- PADI Multilevel Diver specialty (historical computer course): "Guidelines, rules and procedures for multilevel diving with the Wheel and/or diving computers", "Methods of calculating multilevel dives" with the Wheel, eRDPml and/or computers, "Care and maintenance of dive computers", emergency decompression review. https://www.proscubadiver.net/padi-specialty-programs/multilevel-diver/ ; the OW manual pointed to it: "You can learn more about the theory and use of dive computers in the PADI Multilevel Diver course." https://razak.utm.my/shamsul/wp-content/uploads/sites/189/2012/10/Chapter_05.pdf
- Deep Diver specialty instructor guide reportedly includes "important guidelines for using dive computers" and a review question "what five guidelines should you follow when using a dive computer" (third-party copy; **UNVERIFIED**). https://www.studocu.com/en-gb/document/newcastle-university/inclusion-and-diversity/padi-deep-diver-specialty-course-instructor-guide-product-no-70224/145721759
- "How to Use and Choose Dive Computers" booklet topics: "Dive computer basics, choosing a computer, computer use before, during, and after dives, the need for computer functions, advantages over tables, basic settings, and what to do if a computer fails"; access code for the simulator on page 17. https://pros-blog.padi.com/new-product-for-teaching-the-dive-computer-option-in-open-water/ , https://www.proscubadiver.net/padi-courses-cyprus/padi-computer-diving-simulator/
- Enriched Air Diver eLearning includes an "Enriched Air Nitrox Computer simulator" and teaches no-stop diving "with an enriched air compatible dive computer" (22-40% O2). https://www.houseofscuba.com/products/book221 ; the printed manual's access card lets students "gain familiarity with dive computer functions and behavior in various diving situations". https://www.houseofscuba.com/products/book194
- Product-specific "BRAND computer" distinctive specialties exist among PADI's standardized distinctive specialties (no outline found; **UNVERIFIED** content). https://blog.padi.com/do-something-distinctive/
- Reputable secondary (DAN/Scuba Diving magazine): wear a backup computer with matching conservatism; carry an SPG; a buddy's computer gives ascent-rate data but not deco status. https://dan.org/alert-diver/article/your-computer-fails-now-what/

---

## 7. Fifteen concrete ways a better simulator can improve on PADI's

Each item names the PADI shortcoming it answers (sources in sections 2 and 3).

1. **Real-time, user-driven profiles** (descend/ascend controls or drag, with 1x-60x time acceleration) instead of fixed 99-frame playback (Suunto tool) or static "drag the diver icon then watch" (2009 simulator).
2. **Model-faithful skins and button logic** (e.g. Zoop Novo MODE/SELECT/UP/DOWN, Peregrine, Puck Pro, Leonardo) including Settings and Alternate screens - the two things divePAL explicitly did not simulate; PADI's own tool is "generic".
3. **A scenario library mapped one-to-one to PADI learning objectives**: approach the NDL and "turn the dive at the first limit"; keep ">= 5 minutes" NDL; safety stop countdown at 5 m; mandatory stop after a >10 m/min ascent; emergency deco at 3 m vs 5 m ("stopping at 5 m ... will still work"); repetitive dive after a chosen surface interval; plan-mode NDL scroll; cold/strenuous conservatism settings; altitude mode; computer failure drill; no-fly countdown; air-vs-EAN32 NDL comparison ("3 minutes vs 45 minutes").
4. **Graded exercises with instant, explained feedback** (what PADI's listing never shows: no evidence of assessed simulator practice), exportable as a completion record for instructors.
5. **Side-by-side buddy computers** with different algorithms/conservatism to make "follow the most conservative computer" and "don't share" concrete, including the swapped-user demonstration ("Your computer doesn't know who is wearing it").
6. **Transparent model view** (tissue compartments, leading compartment, GF/SurfGF, ceiling) so the "generic decompression model" is no longer a black box - answering DevonDiver's point that divers are "completely fuddled" by deco screens.
7. **Alarm literacy**: every icon/alarm ("Ceiling", "ER", ascent bars, deep-stop countdown, airplane/no-fly) has hover/tap explanations and optional sound - the PADI blog author admits she never knew what "Ceiling" meant.
8. **Offline-capable PWA, no access code, no login** - PADI's simulator is "online only", code-gated, and excluded from the offline PADI Training app; Trustpilot reviews are dominated by login/submission failures.
9. **More than ten languages and accessibility** (screen-reader labels, large-type mode) - the Suunto tool ships ten languages; the eLearning promises 26.
10. **RDP/eRDPML cross-check mode**: show the table NDL, pressure group, "safety stop required" band and minimum surface interval next to the computer's live numbers so instructors who still teach tables can compare both (PADI requires both assessments).
11. **Logbook and surface-interval timeline** with multi-dive days, the W/X (1 h) and Y/Z (3 h) rules, 12/18/24 h no-fly logic, and "don't turn the computer off" consequences.
12. **Failure and edge-case drills**: dead battery mid-dive -> "ascend, 5-min safety stop, end dive, 12-24 h out"; violation lockout/error mode; gauge-only fallback; missed deco -> oxygen and 24 h.
13. **Instructor/classroom mode**: projector-friendly big display, scripted scenarios, pause/annotate, student join codes - directly answering the 2020 request for "a classroom simulator that shows a dive computer's display changing during a dive".
14. **Gas planning integration**: SAC rate, air-time-remaining with reserve margin (as the Zoop shows "30-50 bar"), turn pressure and "rule of thirds" linked to the air limit that can end a dive before the NDL does (AOW "Thinking Like a Diver").
15. **Honest fidelity flags and provenance**: label proprietary-algorithm models as approximations ("not verified" when the manual is silent, as the 2026 open-source community simulator does), publish the algorithm and test vectors, and show a permanent "training only - not for planning real dives" notice like PADI's portal.

---

## 8. Sources consulted

PADI primary
- https://pros-blog.padi.com/new-product-for-teaching-the-dive-computer-option-in-open-water/
- https://pros-blog.padi.com/faq-for-new-dive-computer-option-in-open-water/
- https://pros-blog.padi.com/padi-open-water-online-course-with-dive-computers/
- https://pros-blog.padi.com/dive-computer-version-of-enriched-air-nitrox-specialty-materials-now-available/
- https://pros-blog.padi.com/sell-nitrox-classes-using-the-dive-computer-simulator/
- https://pros-blog.padi.com/padi-divepal-computer-simulator-intro-and-setup/
- https://pros-blog.padi.com/new-padi-open-water-diver-elearning/
- https://pros-blog.padi.com/de/das-neue-padi-open-water-diver-elearning/
- https://pro-cms.padi.com/sites/default/files/documents/training-hub/FAQ%20for%20Pros%20Site%2011%20Feb_EN.pdf
- https://pros-blog.padi.com/taking-the-plunge-open-water-diver-course-changes/
- https://pros-blog.padi.com/padi-instructor-manual-2020/
- https://pros-blog.padi.com/padi-advanced-open-water-diver-elearning/
- https://pros-blog.padi.com/padi-advanced-open-water-online-an-elearning-faq/
- https://pros-blog.padi.com/padi-erdpml-touch-now-available-3/
- https://pro-cms.padi.com/sites/default/files/documents/training-hub/660DT_Advanced_Open_Water_Training_Record_v103.pdf
- https://apps.padi.com/scuba-diving/computer-diving-simulator/
- https://apps.padi.com/scuba-diving/computer-diving-simulator/CDS.aspx
- https://apps.padi.com/scuba-diving/diving-simulator/
- https://apps.padi.com/scuba-diving/diving-simulator/zoop/index.html
- https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-12m/index.html
- https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-30m/index.html
- https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-nitrox/dive-mode-nitrox.html
- https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-air/after-diving.html
- https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-air/mem-log.html
- https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-air/basic.html
- https://apps.padi.com/scuba-diving/diving-simulator/zoop/dive-air/dive-mode-air.html
- https://apps.padi.com/scuba-diving/elearning/html/owtouchen.htm
- https://www.padi.com/gear/dive-computers
- https://www.padi.com/help/elearning-faq
- https://www.padi.com/help/scuba-certification-faq
- https://store.padi.com/en-us/courses/open-water-diver/p/60462-1B2C/
- https://blog.padi.com/choose-best-dive-computer/
- https://blog.padi.com/new-divers-buying-a-dive-computer/
- https://blog.padi.com/how-dive-computers-work/
- https://blog.padi.com/the-golden-rules-of-scuba-diving/
- https://blog.padi.com/history-of-the-safety-stop/
- https://blog.padi.com/your-guide-to-surface-intervals-a-crucial-element-of-scuba-diving/
- https://blog.padi.com/7-things-you-should-never-do-immediately-after-diving/
- https://blog.padi.com/padi-advanced-open-water-diver-faqs/
- https://blog.padi.com/how-elearning-enhanced-my-padi-advanced-open-water-course/
- https://blog.padi.com/is-elearning-suitable-for-a-new-diver/
- https://blog.padi.com/padi-open-water-dives/
- https://blog.padi.com/do-something-distinctive/
- https://cdn.shopify.com/s/files/1/0410/8638/6335/files/ReActivate-Quick-Review.pdf (PADI ReActivate Quick Review 609DT)
- https://razak.utm.my/shamsul/wp-content/uploads/sites/189/2012/10/Chapter_05.pdf (PADI Open Water Diver Manual, chapter 5, 2010-era edition)
- https://www.divinglore.com/wp-content/uploads/2022/01/RDP_Table_meters.pdf (DSAT/PADI RDP metric, 66055)
- https://a1scubadiving.com/wp-content/uploads/2018/06/PADI-Recreational-Dive-Table-Planner.pdf (DSAT/PADI RDP imperial, 66054)
- https://www.proscubadiver.net/wp-content/uploads/2009/09/IntroeRDPML.pdf (PADI "Introducing the eRDPML")

DAN / Suunto / magazines
- https://dan.org/health-medicine/health-resource/health-safety-guidelines/guidelines-for-flying-after-diving/
- https://dan.org/alert-diver/article/your-computer-fails-now-what/
- https://apps.apple.com/us/app/suunto-dive-learning-tools-teach-yourself-how-to-set/id911410807
- https://divemagazine.com/scuba-diving-training/padi-retires-the-erdp-ml
- https://scubadiverlife.com/changes-padi-open-water-diver-course/
- https://en.wikipedia.org/wiki/Recreational_Dive_Planner

Forums, reviews, retailers, study aids
- https://scubaboard.com/community/threads/dive-computer-simulator.590242/
- https://scubaboard.com/community/threads/free-dive-computer-simulator.671160/
- https://scubaboard.com/community/threads/divenav-news-padi-includes-advanced-computer-simulator-with-open-water-diver-course.469027/
- https://scubaboard.com/community/threads/scuba-earth-simulator.503370/
- https://scubaboard.com/community/threads/computer-vs-tables.489904/page-3
- https://scubaboard.com/community/threads/padi-not-teaching-dive-tables-anymore.444978/
- https://scubaboard.com/community/threads/decompression-stop-guidelines-what-we-have-to-do-if-got-deco-alert.543845/
- https://scubaboard.com/community/threads/sharing-dive-computer.651817/
- https://scubaboard.com/community/threads/divepal-w-supported-dive-computers.394661/
- https://scubaboard.com/community/threads/open-water-diver-no-video-e-learning.664698/
- https://scubaboard.com/community/threads/rdp-m-values-and-ndl-limits.217394/
- https://ie.trustpilot.com/review/www.padi.com?page=10
- https://www.tauchenkohtao.com/blog/padi-elearning-erfahrungen/
- https://taucher.net/forum-padi_elearning_open_water-ioz52478
- https://www.proscubadiver.net/padi-courses-cyprus/padi-computer-diving-simulator/
- https://www.proscubadiver.net/padi-specialty-programs/multilevel-diver/
- https://scubadivingoverload.com/padi-owd-section-4-knowledge-review-answers-explained/
- https://scubadivingoverload.com/padi-owd-section-5-knowledge-review-answers-explained/
- https://scubadivingoverload.com/padi-owd-section-2-knowledge-review-answers-explained/
- https://scubadivingoverload.com/padi-owd-section-1-knowledge-review-answers-explained/
- https://scubadivingoverload.com/padi-owd-section-3-knowledge-review-answers-explained/
- https://scubadivingoverload.com/padi-open-water-rdp-knowledge-review/
- https://scubadivingoverload.com/how-to-use-padi-dive-tables/
- https://openwateranswers.wordpress.com/
- https://www.brainscape.com/flashcards/knowledge-review-5-7824408/packs/12873663
- https://www.divetalking.com/?page_id=12542
- https://aquariusdivers.com/products/elearning_open_water_diver
- https://aquariusdivers.com/products/elearning_reactivate
- https://www.houseofscuba.com/products/book205
- https://www.houseofscuba.com/products/book194
- https://www.houseofscuba.com/products/book221
- https://jettydive.com.au/product/padi-how-to-use-and-choose-dive-computers-manual/
- https://divelowkey.com/scuba-courses/padi-advanced-open-water/
- https://quizlet.com/227521812/padi-advanced-open-water-flash-cards/
- https://www.studocu.com/en-gb/document/newcastle-university/inclusion-and-diversity/padi-deep-diver-specialty-course-instructor-guide-product-no-70224/145721759
- https://www.youtube.com/watch?v=Bh0w17tYkrU
- https://www.youtube.com/watch?v=cUs8NA3VjPE
- https://antjac.github.io/DiveComputerSimulator/

Not retrievable (noted for completeness): https://www.liveabout.com/emergency-decompression-guidelines-2963037 (HTTP 402), https://quizlet.com/ph/309482189/padi-chapter-5-flash-cards/ (403), https://bluetrend.media/en/you-have-to-know-no-decompression-dive/ (403), https://padi-computer-diving-simulator.software.informer.com/ (403), https://www.amazon.com/70821-eLearning-Computer-Simulator-Access/dp/B00CC2JDGQ (500), https://www.scuba.com/p-pdi60335/padi-open-water-computer-diving-crew-pak-with-blue-log-book (403), Reddit (blocked for the search tool).
