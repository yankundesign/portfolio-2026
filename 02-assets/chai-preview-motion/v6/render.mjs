// Node port of ../render.py for the v6 scene: same frame loop, driven by the
// playwright-core already in site/node_modules and the system Chrome.
//   node render.mjs 0,1.8,4.2 stills            → t0.00.png, t1.80.png, … (1280×800)
//   SUBFPS=480 node render.mjs all frames       → f00000.png… as in ../README.md
//   PIPE=1 node render.mjs all frames60         → streams 1920×1200 subframes into
//     ffmpeg (Lanczos to 1280×800, then the README's 180° shutter) and keeps only
//     the 360 finished 60fps frames, f000.png…f359.png
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { chromium } = require(resolve(here, '../../../site/node_modules/playwright-core'));

const PIPE = process.env.PIPE === '1';
const FPS_SUB = Number(process.env.SUBFPS || (PIPE ? 480 : 120));
const DSF = PIPE ? 1.5 : 1; // pipe mode supersamples: the cover is drawn at 1920 too
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
  const vf = "scale=1280:800:flags=lanczos,tmix=frames=4,select='eq(mod(n\\,8)\\,3)',setpts=N/60/TB";
  ffmpeg = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS_SUB),
    '-c:v', 'png', '-i', '-', '-vf', vf, '-fps_mode', 'passthrough', resolve(outdir, 'f%03d.png')],
    { stdio: ['pipe', 'inherit', 'inherit'] });
}

const ts = times ?? Array.from({ length: Math.round(6 * FPS_SUB) }, (_, i) => i / FPS_SUB);
const started = Date.now();
for (let i = 0; i < ts.length; i++) {
  const t = ts[i];
  await page.evaluate((tt) => window.render(tt), t);
  const clip = { x: 0, y: 0, width: 1280, height: 800 };
  if (ffmpeg) {
    const png = await page.screenshot({ clip });
    if (!ffmpeg.stdin.write(png)) await new Promise((r) => ffmpeg.stdin.once('drain', r));
  } else {
    const name = times ? `t${t.toFixed(2)}.png` : `f${String(i).padStart(5, '0')}.png`;
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
