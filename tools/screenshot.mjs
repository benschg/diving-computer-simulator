// Drives the dev server UI with Playwright and saves screenshots for visual QA.
// Usage: node tools/screenshot.mjs <outDir>
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const out = process.argv[2] ?? 'screens';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.screenshot({ path: `${out}/00-home.png` });

const ids = ['suunto-zoop-novo', 'shearwater-peregrine', 'oceanic-veo-4', 'mares-puck-pro', 'cressi-leonardo', 'generic'];
const step = (code) => page.evaluate(code);
for (const id of ids) {
  await page.selectOption('select', id);
  await page.waitForTimeout(200);
  await step(`window.__sim.reset(); window.__sim.setTarget(30, 18); window.__sim.stepSeconds(100 + 12 * 60);`);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${out}/${id}-1-ndl.png` });
  await step(`window.__sim.stepSeconds(14 * 60);`);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${out}/${id}-2-deco.png` });
  await step(`window.__sim.setTarget(5, 30); window.__sim.stepSeconds(55);`);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${out}/${id}-3-fast-ascent.png` });
  await step(`window.__sim.stepSeconds(12 * 60);`);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${out}/${id}-4-safety-stop.png` });
  await step(`window.__sim.setTarget(0, 9); window.__sim.stepSeconds(12 * 60);`);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${out}/${id}-5-surface.png` });
}
await browser.close();
console.log('done');
