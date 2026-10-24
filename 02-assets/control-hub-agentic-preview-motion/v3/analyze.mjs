// Motion analysis for scene.html: per output frame (60fps), the on-screen
// position of each slab centre in the 1280×800 frame. Reports speed (px per
// frame) and acceleration (change in velocity per frame) — the jerks you see.
//   node analyze.mjs            → summary + the worst frames
//   node analyze.mjs csv > m.csv
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { chromium } = require(resolve(here, '../../../site/node_modules/playwright-core'));
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--allow-file-access-from-files'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(pathToFileURL(resolve(here, 'scene.html')).href);
await page.evaluate(() => window.ready);

const rows = await page.evaluate(() => {
  const K = 1280 / 1920, out = [];
  for (let i = 0; i <= 360; i++) {
    const t = i / 60, c = camera(t), s = c.z * K;
    // screen positions of slab centres (world (CX, cy(k)) → frame)
    const pts = [0, 1, 2, 3, 4].map((k) => [640 + (CX - c.x) * s, 400 + (cy(k, t) - c.y) * s]);
    out.push({ t, z: c.z, pts });
  }
  return out;
});
await browser.close();

const speed = [], acc = [];
for (let i = 1; i < rows.length; i++) {
  const v = rows[i].pts.map((p, k) => [p[0] - rows[i - 1].pts[k][0], p[1] - rows[i - 1].pts[k][1]]);
  // zoom also moves content: radial speed at the frame corner
  const zr = Math.abs(Math.log(rows[i].z / rows[i - 1].z)) * Math.hypot(640, 400);
  speed.push({ i, t: rows[i].t, v, zr, sp: Math.max(...v.map(([x, y]) => Math.hypot(x, y)), zr) });
}
for (let i = 1; i < speed.length; i++) {
  const a = Math.max(...speed[i].v.map(([x, y], k) => Math.hypot(x - speed[i - 1].v[k][0], y - speed[i - 1].v[k][1])),
    Math.abs(speed[i].zr - speed[i - 1].zr));
  acc.push({ i: speed[i].i, t: speed[i].t, a, sp: speed[i].sp });
}
if (process.argv[2] === 'csv') {
  console.log('frame,t,speed,accel');
  acc.forEach((r) => console.log(`${r.i},${r.t.toFixed(3)},${r.sp.toFixed(2)},${r.a.toFixed(2)}`));
} else {
  const maxSp = Math.max(...speed.map((s) => s.sp));
  console.log(`peak speed ${maxSp.toFixed(1)} px/frame; mean ${(speed.reduce((a, s) => a + s.sp, 0) / speed.length).toFixed(1)}`);
  console.log(`peak accel ${Math.max(...acc.map((r) => r.a)).toFixed(2)} px/frame²; mean ${(acc.reduce((a, r) => a + r.a, 0) / acc.length).toFixed(2)}`);
  console.log('speed by 0.25s:', Array.from({ length: 24 }, (_, j) => {
    const seg = speed.filter((s) => s.t > j / 4 && s.t <= (j + 1) / 4);
    return Math.max(...seg.map((s) => s.sp)).toFixed(0);
  }).join(' '));
  console.log('worst accel frames:', [...acc].sort((x, y) => y.a - x.a).slice(0, 8).map((r) => `${r.t.toFixed(2)}s:${r.a.toFixed(1)}`).join('  '));
}
