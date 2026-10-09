/**
 * Fit per-compartment M-value gradient scales so that a fresh diver's no-stop limits on air at sea
 * level reproduce a manufacturer's published table. Usage: npx tsx tools/fit-mscale.ts
 *
 * Model: ZH-L16C; NDL_i(d; s) solves P_tissue = P_surf + s_i·(M0_i − P_surf).
 */
import { SURFACE_PRESSURE_BAR, ZHL16C, depthToAmbientBar, inspired, ndlMinutes, saturatedTissues, AIR, dsatNdl, dsatSaturated, DSAT_HALF_TIMES, DSAT_M0_BAR } from '../src/engine';

type Table = Record<number, number>;

const TABLES: Record<string, Table> = {
  // Pelagic Z+ (Aqua Lung i300C p.63 / Oceanic Geo 4.0 p.61), sea level, metric, minutes
  'pelagic-z+': { 9: 217, 12: 115, 15: 68, 18: 50, 21: 36, 24: 27, 27: 20, 30: 16, 33: 13, 36: 10, 39: 9, 42: 8, 45: 6, 48: 6 },
};
const DSAT_TABLES: Record<string, Table> = {
  // Oceanic Geo 4.0 p.60 DSAT, sea level, metric
  'pelagic-dsat': { 9: 283, 12: 144, 15: 85, 18: 59, 21: 41, 24: 32, 27: 25, 30: 20, 33: 17, 36: 14, 39: 11, 42: 9, 45: 8, 48: 7 },
};

const surf = SURFACE_PRESSURE_BAR;
const LN2 = Math.LN2;

function fitZhl(table: Table): number[] {
  const t0 = saturatedTissues();
  const depths = Object.keys(table).map(Number);
  const n = ZHL16C.length;
  // required scale for compartment i to hit target at depth d
  const need: number[][] = ZHL16C.map(() => []);
  for (const d of depths) {
    const target = table[d] + 0.5;
    const pi = inspired(depthToAmbientBar(d), 0.79);
    for (let i = 0; i < n; i++) {
      const c = ZHL16C[i];
      const p0 = t0.n2[i];
      const pmax = pi + (p0 - pi) * Math.pow(2, -target / c.ht);
      const m0 = surf / c.b + c.a;
      const s = (pmax - surf) / (m0 - surf);
      need[i].push(s);
    }
  }
  // compartment must never be MORE restrictive than the target at any depth -> take the max requirement
  let scale = need.map((arr) => Math.min(1.2, Math.max(...arr)));
  const err = (sc: number[]) => {
    let e = 0;
    for (const d of depths) {
      const ndl = ndlMinutes(t0, depthToAmbientBar(d), AIR, 1, undefined, 999, sc);
      e += Math.pow(Math.log((ndl + 1) / (table[d] + 1.5)), 2);
    }
    return e;
  };
  // coordinate descent refinement
  let best = err(scale);
  for (let round = 0; round < 40; round++) {
    for (let i = 0; i < n; i++) {
      for (const delta of [0.02, -0.02, 0.005, -0.005, 0.001, -0.001]) {
        const trial = scale.slice();
        trial[i] = Math.min(1.5, Math.max(0.2, trial[i] + delta));
        const e = err(trial);
        if (e < best - 1e-12) {
          best = e;
          scale = trial;
        }
      }
    }
  }
  return scale;
}

function fitDsat(table: Table): number[] {
  const t0 = dsatSaturated();
  const depths = Object.keys(table).map(Number);
  const n = DSAT_HALF_TIMES.length;
  const need: number[][] = DSAT_HALF_TIMES.map(() => []);
  for (const d of depths) {
    const target = table[d] + 0.5;
    const pi = depthToAmbientBar(d) * 0.79;
    for (let i = 0; i < n; i++) {
      const p0 = t0.n2[i];
      const pmax = pi + (p0 - pi) * Math.pow(2, -target / DSAT_HALF_TIMES[i]);
      need[i].push((pmax - surf) / (DSAT_M0_BAR[i] - surf));
    }
  }
  let scale = need.map((arr) => Math.min(1.3, Math.max(...arr)));
  const err = (sc: number[]) => {
    let e = 0;
    for (const d of depths) {
      const ndl = dsatNdl(t0, depthToAmbientBar(d), AIR, surf, { mScale: sc });
      e += Math.pow(Math.log((ndl + 1) / (table[d] + 1.5)), 2);
    }
    return e;
  };
  let best = err(scale);
  for (let round = 0; round < 40; round++) {
    for (let i = 0; i < n; i++) {
      for (const delta of [0.02, -0.02, 0.005, -0.005, 0.001, -0.001]) {
        const trial = scale.slice();
        trial[i] = Math.min(1.5, Math.max(0.2, trial[i] + delta));
        const e = err(trial);
        if (e < best - 1e-12) {
          best = e;
          scale = trial;
        }
      }
    }
  }
  return scale;
}

for (const [name, table] of Object.entries(TABLES)) {
  const scale = fitZhl(table);
  console.log(`\n${name}: mScale = [${scale.map((s) => s.toFixed(3)).join(', ')}]`);
  const t0 = saturatedTissues();
  for (const d of Object.keys(table).map(Number)) {
    const ndl = ndlMinutes(t0, depthToAmbientBar(d), AIR, 1, undefined, 999, scale);
    const plain = ndlMinutes(t0, depthToAmbientBar(d), AIR, 1);
    console.log(`  ${String(d).padStart(2)} m  table ${String(table[d]).padStart(3)}  fitted ${ndl.toFixed(1).padStart(6)}  zhl16c-gf100 ${plain.toFixed(1).padStart(6)}`);
  }
}
for (const [name, table] of Object.entries(DSAT_TABLES)) {
  const scale = fitDsat(table);
  console.log(`\n${name}: mScale = [${scale.map((s) => s.toFixed(3)).join(', ')}]`);
  const t0 = dsatSaturated();
  for (const d of Object.keys(table).map(Number)) {
    const ndl = dsatNdl(t0, depthToAmbientBar(d), AIR, surf, { mScale: scale });
    const plain = dsatNdl(t0, depthToAmbientBar(d), AIR, surf);
    console.log(`  ${String(d).padStart(2)} m  table ${String(table[d]).padStart(3)}  fitted ${ndl.toFixed(1).padStart(6)}  dsat ${plain.toFixed(1).padStart(6)}`);
  }
}
