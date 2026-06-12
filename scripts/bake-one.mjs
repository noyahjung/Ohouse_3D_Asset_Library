// scripts/bake-one.mjs
//
// Re-bakes librarythumbnail/{id}.png for ONLY the asset ids passed on
// the command line (defaults to `truck3`). Same render path as
// bake-thumbs.mjs (?autoexport=all → window.__exportedThumbs) but
// writes a filtered subset so unrelated thumbnails stay untouched.
//
// Prereq: dev server on http://localhost:8765 (the project default).
//
// Run:   npx -y -p puppeteer-core@latest node scripts/bake-one.mjs truck3

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const TARGETS  = process.argv.slice(2).length ? process.argv.slice(2) : ['truck3'];
const PAGE_URL = 'http://localhost:8765/3Dassetlibrary.html?autoexport=all';
const OUT_DIR  = join(dirname(fileURLToPath(import.meta.url)), '..', 'librarythumbnail');
const CHROME   = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

await mkdir(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  defaultViewport: { width: 1280, height: 1280 },
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();
page.on('console',  m => { if (m.type() !== 'log') console.log(`[page:${m.type()}]`, m.text()); });
page.on('pageerror', e => console.error('[page error]', e.message));

console.log('→', PAGE_URL, '   targets:', TARGETS.join(', '));
await page.goto(PAGE_URL, { waitUntil: 'networkidle2', timeout: 60_000 });

console.log('… waiting for window.__exportDone');
await page.waitForFunction('window.__exportDone === true', { timeout: 180_000 });

const { thumbs, error } = await page.evaluate(() => ({
  thumbs: window.__exportedThumbs,
  error:  window.__exportError,
}));

if (error) { console.error('export error:', error); await browser.close(); process.exit(1); }

for (const id of TARGETS) {
  if (!thumbs[id]) { console.error(`✗ no thumbnail produced for "${id}"`); continue; }
  const buf  = Buffer.from(thumbs[id], 'base64');
  const path = join(OUT_DIR, `${id}.png`);
  await writeFile(path, buf);
  console.log(`  ${id.padEnd(12)}  ${String(buf.length).padStart(7)} bytes  ${path}`);
}

await browser.close();
console.log('done');
