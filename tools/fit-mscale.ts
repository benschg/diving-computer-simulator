/**
 * Fit per-compartment M-value gradient scales so that a fresh diver's no-stop limits on air at sea
 * level reproduce a manufacturer's published table, then write src/engine/calibration.ts.
 * Usage: npx tsx tools/fit-mscale.ts
 */
import { writeFileSync } from 'node:fs';
import { AIR, DSAT_HALF_TIMES, DSAT_M0_BAR, SURFACE_PRESSURE_BAR, ZHL16C, depthToAmbientBar, dsatNdl, dsatSaturated, inspired, ndlMinutes, saturatedTissues } from '../src/engine';

type Table = Record<number, number>;

interface Spec {
  name: string;
  model: 'zhl16c' | 'dsat';
  table: Table;
  source: string;
}

const SPECS: Spec[] = [
  { name: 'PELAGIC_ZPLUS', model: 'zhl16c', source: 'Aqua Lung i300C manual p.63 / Oceanic Geo 4.0 manual p.61, Z+ NDLs, sea level, metric', table: { 9: 217, 12: 115, 15: 68, 18: 50, 21: 36, 24: 27, 27: 20, 30: 16, 33: 13, 36: 10, 39: 9, 42: 8, 45: 6, 48: 6 } },
  { name: 'PELAGIC_ZPLUS_CF', model: 'zhl16c', source: 'Same table, 1526–1830 m column (Conservative Factor ON = NDLs of the altitude 915 m higher, i.e. 6000 ft at sea level)', table: { 9: 143, 12: 75, 15: 51, 18: 35, 21: 24, 24: 18, 27: 13, 30: 10, 33: 8, 36: 7, 39: 6, 42: 5, 45: 5, 48: 4 } },
  { name: 'PELAGIC_DSAT', model: 'dsat', source: 'Oceanic Geo 4.0 manual p.60, DSAT NDLs, sea level, metric', table: { 9: 283, 12: 144, 15: 85, 18: 59, 21: 41, 24: 32, 27: 25, 30: 20, 33: 17, 36: 14, 39: 11, 42: 9, 45: 8, 48: 7 } },
  { name: 'PELAGIC_DSAT_CF', model: 'dsat', source: 'Same table, 1526–1830 m column (Conservative Factor ON)', table: { 9: 190, 12: 97, 15: 60, 18: 40, 21: 29, 24: 22, 27: 17, 30: 13, 33: 11, 36: 9, 39: 7, 42: 7, 45: 6, 48: 5 } },
  { name: 'SUUNTO_P0', model: 'zhl16c', source: 'Suunto Zoop (2011) manual table 6.1, P0/A0 (the Zoop Novo manual prints no table)', table: { 12: 124, 15: 72, 18: 52, 21: 37, 24: 29, 27: 23, 30: 18, 33: 13, 36: 11, 39: 9, 42: 7, 45: 6 } },
  { name: 'SUUNTO_P1', model: 'zhl16c', source: 'Suunto Zoop (2011) manual table 6.1, P1/A0', table: { 9: 163, 12: 89, 15: 57, 18: 39, 21: 29, 24: 24, 27: 18, 30: 14, 33: 11, 36: 9, 39: 7, 42: 6, 45: 5 } },
  { name: 'SUUNTO_P2', model: 'zhl16c', source: 'Suunto Zoop (2011) manual table 6.1, P2/A0', table: { 9: 130, 12: 67, 15: 43, 18: 30, 21: 23, 24: 19, 27: 15, 30: 12, 33: 9, 36: 8, 39: 6, 42: 5, 45: 5 } },
  { name: 'CRESSI_SF0', model: 'zhl16c', source: 'Leonardo display readings posted on ScubaBoard (dmaziuk, 2019) – Cressi publishes no table; SF0', table: { 15: 68, 18: 49, 21: 37, 24: 28, 27: 21, 30: 17, 33: 14, 36: 11, 39: 9, 42: 7, 45: 6, 48: 5 } },
  { name: 'CRESSI_SF1', model: 'zhl16c', source: 'Same source, SF1', table: { 12: 98, 15: 60, 18: 44, 21: 33, 24: 26, 27: 19, 30: 15, 33: 12, 36: 10, 39: 8, 42: 6, 45: 5, 48: 4 } },
  { name: 'CRESSI_SF2', model: 'zhl16c', source: 'Same source, SF2', table: { 12: 83, 15: 54, 18: 40, 21: 30, 24: 22, 27: 17, 30: 13, 33: 11, 36: 9, 39: 7, 42: 6, 45: 5, 48: 4 } },
];

const surf = SURFACE_PRESSURE_BAR;
const MIN_SCALE = 0.05;

function refine(scale: number[], err: (s: number[]) => number): number[] {
  let best = err(scale);
  for (let round = 0; round < 40; round++) {
    for (let i = 0; i < scale.length; i++) {
      for (const delta of [0.02, -0.02, 0.005, -0.005, 0.001, -0.001]) {
        const trial = scale.slice();
        trial[i] = Math.min(1.5, Math.max(MIN_SCALE, trial[i] + delta));
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

function fitZhl(table: Table): number[] {
  const t0 = saturatedTissues();
  const depths = Object.keys(table).map(Number);
  const need: number[][] = ZHL16C.map(() => []);
  for (const d of depths) {
    const target = table[d] + 0.5;
    const pi = inspired(depthToAmbientBar(d), 0.79);
    ZHL16C.forEach((c, i) => {
      const pmax = pi + (t0.n2[i] - pi) * Math.pow(2, -target / c.ht);
      need[i].push((pmax - surf) / (surf / c.b + c.a - surf));
    });
  }
  const start = need.map((arr) => Math.min(1.2, Math.max(MIN_SCALE, Math.max(...arr))));
  const err = (sc: number[]) => depths.reduce((e, d) => e + Math.pow(Math.log((ndlMinutes(t0, depthToAmbientBar(d), AIR, 1, undefined, 999, sc) + 1) / (table[d] + 1.5)), 2), 0);
  return refine(start, err);
}

function fitDsat(table: Table): number[] {
  const t0 = dsatSaturated();
  const depths = Object.keys(table).map(Number);
  const need: number[][] = DSAT_HALF_TIMES.map(() => []);
  for (const d of depths) {
    const target = table[d] + 0.5;
    const pi = depthToAmbientBar(d) * 0.79;
    DSAT_HALF_TIMES.forEach((ht, i) => {
      const pmax = pi + (t0.n2[i] - pi) * Math.pow(2, -target / ht);
      need[i].push((pmax - surf) / (DSAT_M0_BAR[i] - surf));
    });
  }
  const start = need.map((arr) => Math.min(1.3, Math.max(MIN_SCALE, Math.max(...arr))));
  const err = (sc: number[]) => depths.reduce((e, d) => e + Math.pow(Math.log((dsatNdl(t0, depthToAmbientBar(d), AIR, surf, { mScale: sc }) + 1) / (table[d] + 1.5)), 2), 0);
  return refine(start, err);
}

let out = `/**
 * GENERATED by tools/fit-mscale.ts – do not edit by hand.
 *
 * Per-compartment M-value gradient scales that make the engine reproduce manufacturers' published
 * first-dive, sea-level, air no-stop tables. They are calibrations of an educational model, not the
 * manufacturers' algorithms. Sources: docs/research/*.md
 */
`;
for (const spec of SPECS) {
  const scale = spec.model === 'zhl16c' ? fitZhl(spec.table) : fitDsat(spec.table);
  const rows: string[] = [];
  const depths = Object.keys(spec.table).map(Number);
  for (const d of depths) {
    const ndl = spec.model === 'zhl16c' ? ndlMinutes(saturatedTissues(), depthToAmbientBar(d), AIR, 1, undefined, 999, scale) : dsatNdl(dsatSaturated(), depthToAmbientBar(d), AIR, surf, { mScale: scale });
    rows.push(`${d} m: table ${spec.table[d]}, model ${ndl.toFixed(1)}`);
  }
  console.log(`\n${spec.name} (${spec.model})`);
  console.log(rows.join('\n'));
  out += `\n/** ${spec.source} */\nexport const ${spec.name}: readonly number[] = [${scale.map((s) => s.toFixed(4)).join(', ')}];\n`;
  out += `export const ${spec.name}_TABLE: Readonly<Record<number, number>> = ${JSON.stringify(spec.table)};\n`;
}
writeFileSync('src/engine/calibration.ts', out);
console.log('\nwrote src/engine/calibration.ts');
