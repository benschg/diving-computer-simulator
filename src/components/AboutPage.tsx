export function AboutPage() {
  return (
    <div className="page prose">
      <h2>About this simulator</h2>
      <p>
        An interactive trainer that shows how real dive computers behave: what they display at the surface and under water, how the no-stop time
        counts down, what happens when you ascend too fast, skip a safety stop, or run into decompression – and how differently five popular
        computers handle the same dive.
      </p>

      <h3>What PADI offers today</h3>
      <ul>
        <li>
          The original <b>PADI Computer Diving Simulator</b> (2009) is a downloadable desktop app with a <i>generic</i> computer: you drag a diver
          icon to set depth and time and read the resulting no-stop time. System requirements still list Windows XP.
        </li>
        <li>
          The current <b>Computer Diving Simulator Portal</b> on apps.padi.com is access-code gated, online only, "not available in all languages",
          and excluded from the offline PADI Training app.
        </li>
        <li>
          PADI also hosts Suunto’s <b>Learning Tools</b>: "virtual dives" that are pre-rendered 99-frame image sequences – the only control is START.
          The matching app is rated 2.4/5.
        </li>
        <li>
          Instructors on ScubaBoard describe the material as "generic", "hardly interactive", and ask for "a classroom simulator that shows a dive
          computer’s display changing during a dive".
        </li>
      </ul>

      <h3>What this does differently</h3>
      <ul>
        <li>Real-time, user-driven profiles with time acceleration, instead of fixed playback.</li>
        <li>Five real computers with their own button logic, menus, alarms, safety-stop rules, violation modes and lock-outs – plus a generic trainer.</li>
        <li>Lessons mapped to the Open Water learning objectives, with live checks and a debrief.</li>
        <li>Side-by-side comparison: the same dive on every computer, and a chart of their first-dive limits.</li>
        <li>A transparent model: tissue compartments, ceiling, GF99/SurfGF and the event log explain every number on the screen.</li>
        <li>Every behaviour is traced to a manual page (see Reference).</li>
      </ul>

      <h3>Fidelity and limits</h3>
      <ul>
        <li>
          <b>Not for planning real dives.</b> The models here are educational reconstructions, not the manufacturers’ firmware.
        </li>
        <li>
          Bühlmann ZH-L16C with gradient factors drives the Shearwater exactly as documented. DSAT reproduces the PADI RDP and the Oceanic DSAT
          table. Suunto RGBM, Pelagic Z+, Mares and Cressi RGBM are proprietary; they are approximated by ZH-L16C compartments whose limits were
          fitted to each manufacturer’s published first-dive table (within about one minute at every depth). Repetitive-dive and micro-bubble
          penalties of RGBM are only partially reproduced.
        </li>
        <li>
          Mares publishes no no-stop table; its limits borrow the Cressi calibration. Cressi’s table comes from an owner’s display readings, not
          from Cressi.
        </li>
        <li>Menus and settings screens are simplified: the simulator reproduces the screens you need during a dive and the main surface screens.</li>
      </ul>

      <h3>Sources</h3>
      <p>
        Suunto Zoop Novo User Guide (2021) and Zoop (2011) tables; Shearwater Peregrine Operations Manual RevB and release notes; Oceanic Geo 4.0 / Veo
        4.0 and Aqua Lung i300C manuals; Mares Puck Pro / Puck Pro+ manual; Cressi Leonardo manual; PADI Open Water Diver manual chapter 5, RDP
        tables and PADI Pros blog; E. C. Baker’s gradient-factor papers; A. A. Bühlmann, <i>Tauchmedizin</i>. The detailed research notes with page
        numbers are in the Reference section.
      </p>
    </div>
  );
}
