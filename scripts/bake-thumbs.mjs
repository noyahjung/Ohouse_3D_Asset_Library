// scripts/bake-thumbs.mjs
//
// Bakes librarythumbnail/{id}.png for every asset in the registry by
// loading ?autoexport=all in headless Chrome and reading the
// window.__exportedThumbs map the page exposes for exactly this use.
//
// Prereq: dev server on http://localhost:8765 (the project default).
//
// Run:   npx -y -p puppeteer-core@latest node scripts/bake-thumbs.mjs

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const PAGE_URL = 'http://localhost:8765/3Dassetlibrary.html?autoexport=all';
const OUT_DIR  = join(dirname(fileURLToPath(import.meta.url)), '..', 'librarythumbnail');
const CHROME   = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

await mkdir(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  // 1280-square viewport keeps the renderer's square crop region large
  // enough that the 500×500 output isn't upscaled from a small surface.
  defaultViewport: { width: 1280, height: 1280 },
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();
page.on('console',  m => { if (m.type() !== 'log') console.log(`[page:${m.type()}]`, m.text()); });
page.on('pageerror', e => console.error('[page error]', e.message));

console.log('→', PAGE_URL);
await page.goto(PAGE_URL, { waitUntil: 'networkidle2', timeout: 60_000 });

console.log('… waiting for window.__exportDone');
await page.waitForFunction('window.__exportDone === true', { timeout: 180_000 });

const { thumbs, error } = await page.evaluate(() => ({
  thumbs: window.__exportedThumbs,
  error:  window.__exportError,
}));

if (error) { console.error('export error:', error); await browser.close(); process.exit(1); }

const ids = Object.keys(thumbs);
console.log(`✓ writing ${ids.length} PNGs to ${OUT_DIR}`);
for (const id of ids) {
  const buf  = Buffer.from(thumbs[id], 'base64');
  const path = join(OUT_DIR, `${id}.png`);
  await writeFile(path, buf);
  console.log(`  ${id.padEnd(12)}  ${String(buf.length).padStart(7)} bytes  ${path}`);
}

await browser.close();
console.log('done');
