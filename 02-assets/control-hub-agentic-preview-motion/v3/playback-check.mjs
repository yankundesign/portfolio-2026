// Playback check on the real canvas page: hover a plate and measure, over 2s,
// how often the hover preview actually repaints (requestVideoFrameCallback
// rate — what drives the mirror strips the viewer sees) and how many frames
// the browser dropped.   node playback-check.mjs [url]
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { chromium } = require(resolve(here, '../../../site/node_modules/playwright-core'));
const url = process.argv[2] || 'http://localhost:5175/works';

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: false,
  args: ['--window-position=0,0'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url);
await page.waitForTimeout(2500);

for (const [label, key, name] of [['CHAI', 'chai', 'Control Hub AI Assistant'], ['Agentic', 'agentic', 'Control Hub Agentic']]) {
  await page.mouse.move(5, 5);
  await page.waitForTimeout(600);
  const btn = page.getByRole('button', { name: new RegExp(`^${name} —`) });
  const box = await btn.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height * 0.3, { steps: 8 });
  await page.waitForTimeout(1500);
  const r = await page.evaluate(async (k) => {
    const v = [...document.querySelectorAll('[data-plate-preview]')].find((x) => x.currentSrc.includes(k));
    const q0 = v.getVideoPlaybackQuality();
    let n = 0;
    const t0 = performance.now();
    await new Promise((done) => {
      const f = () => { n++; if (performance.now() - t0 < 2000) v.requestVideoFrameCallback(f); else done(); };
      v.requestVideoFrameCallback(f);
    });
    const q1 = v.getVideoPlaybackQuality();
    return {
      file: v.currentSrc.split('/').pop(),
      repaintsPerSec: +(n / 2).toFixed(1),
      decodedPerSec: (q1.totalVideoFrames - q0.totalVideoFrames) / 2,
      droppedPerSec: (q1.droppedVideoFrames - q0.droppedVideoFrames) / 2,
      bending: v.closest('[data-plate]').hasAttribute('data-paper-bending'),
    };
  }, key);
  console.log(label.padEnd(8), JSON.stringify(r));
}
await browser.close();
