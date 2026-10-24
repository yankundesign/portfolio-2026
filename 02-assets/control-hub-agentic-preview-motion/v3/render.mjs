// Frame renderer for scene.html (Node port of the CHAI v6 render.mjs), using
// the playwright-core in site/node_modules and the system Chrome.
//   node render.mjs 0,1.8,4.2 stills     → t0.00.png, t1.80.png, … (1280×800)
//   PIPE=1 node render.mjs all frames60  → streams supersampled subframes
//     (DSF× the 1280×800 viewport) into ffmpeg: Lanczos to 1280×800, then a
//     180° shutter (tmix of half of each 1/60s group) → f001.png…f360.png
// Env: SUBFPS (default 240), DSF (default 2), CHROME.
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { chromium } = require(resolve(here, '../../../site/node_modules/playwright-core'));

const PIPE = process.env.PIPE === '1';
const FPS_SUB = Number(process.env.SUBFPS || 240);
const DSF = Number(process.env.DSF || (PIPE ? 2 : 1));
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const arg = process.argv[2] || 'all';
const outdir = resolve(here, process.argv[3] || 'frames');
const times = arg === 'all' ? null : arg.split(',').map(Number);
mkdirSync(outdir, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: DSF });
await page.goto(pathToFileURL(resolve(here, 'scene.html')).href);
await page.evaluate(() => window.ready);

let ffmpeg = null;
if (PIPE && !times) {
  const k = FPS_SUB / 60; // subframes per output frame
  const vf = `scale=1280:800:flags=lanczos,tmix=frames=${k / 2},select='eq(mod(n\\,${k})\\,${k / 2 - 1})',setpts=N/60/TB`;
  ffmpeg = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS_SUB),
    '-c:v', 'png', '-i', '-', '-vf', vf, '-fps_mode', 'passthrough', resolve(outdir, 'f%03d.png')],
    { stdio: ['pipe', 'inherit', 'inherit'] });
}

const ts = times ?? Array.from({ length: Math.round(6 * FPS_SUB) }, (_, i) => i / FPS_SUB);
const started = Date.now();
for (let i = 0; i < ts.length; i++) {
  await page.evaluate((tt) => window.render(tt), ts[i]);
  const clip = { x: 0, y: 0, width: 1280, height: 800 };
  if (ffmpeg) {
    const png = await page.screenshot({ clip });
    if (!ffmpeg.stdin.write(png)) await new Promise((r) => ffmpeg.stdin.once('drain', r));
  } else {
    const name = times ? `t${ts[i].toFixed(2)}.png` : `f${String(i).padStart(5, '0')}.png`;
    await page.screenshot({ path: resolve(outdir, name), clip });
  }
  if (!times && i % 240 === 0) console.log(`${i}/${ts.length}  ${((Date.now() - started) / 1000).toFixed(0)}s`);
}
await browser.close();
if (ffmpeg) {
  ffmpeg.stdin.end();
  await new Promise((r, j) => ffmpeg.on('close', (code) => (code === 0 ? r() : j(new Error(`ffmpeg ${code}`)))));
}
console.log(`done in ${((Date.now() - started) / 1000).toFixed(0)}s`);
