/** Render ZAO's actual code into lossless, deliberately framed portfolio assets. */
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('../../', import.meta.url));
const zaoRepo = process.env.ZAO_SOURCE_REPO ?? resolve(repo, '../design-system');
const sourceUrl = process.env.ZAO_SOURCE_URL ?? 'http://127.0.0.1:3000';
const require = createRequire(join(zaoRepo, 'apps/docs/package.json'));
const { chromium } = require('@playwright/test');
const output = join(repo, 'site/public/images/zao');
const scale = 3;
const width = 1120;
const assets = [];
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1800, height: 1400 },
  deviceScaleFactor: scale,
  reducedMotion: 'reduce',
});
const page = await context.newPage();
page.setDefaultTimeout(30000);

async function open(path, mode) {
  await page.goto(new URL(path, sourceUrl).href, { waitUntil: 'networkidle' });
  await page.getByRole('radio', { name: mode === 'dark' ? 'Dark' : 'Light', exact: true }).click();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction((m) => document.documentElement.dataset.zaoMode === m, mode);
  await page.addStyleTag({ content: 'nextjs-portal { display: none !important; }' });
}

async function capture(name, locator) {
  const box = await locator.boundingBox();
  if (!box || box.width < 1000) throw new Error(`${name}: render is unexpectedly small`);
  await locator.screenshot({ path: join(output, name), type: 'png', animations: 'disabled', caret: 'hide' });
  const png = await readFile(join(output, name));
  const pixels = { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
  if (pixels.width < width * scale) throw new Error(`${name}: export is below target resolution`);
  assets.push({ name, ...pixels, bytes: png.length });
  console.log(`${name}: ${pixels.width} × ${pixels.height}, ${Math.round(png.length / 1024)} KB`);
}

// This styling affects only the fresh rendering browser, never ZAO's source or live site.
async function frameWorkspace() {
  await page.addStyleTag({ content: `
    [data-landing] { width: ${width}px; max-width: none; }
    .landing-hero .exploded-stage { padding: 56px; box-shadow: none; }
    .exploded-stage { background: var(--zao-color-bg-canvas); }
  ` });
  await page.waitForFunction(() => {
    const stage = document.querySelector('.exploded-stage');
    return stage?.getAttribute('data-ready') === 'true' && stage.getBoundingClientRect().width === 1120;
  });
}

/** Isolate rendered component markup with its actual theme variables and source CSS. */
async function frameFragment(selector, ownerSelector, kind) {
  await page.evaluate(({ selector, ownerSelector, kind, width }) => {
    const source = document.querySelector(selector);
    const owner = document.querySelector(ownerSelector);
    if (!source || !owner) throw new Error(`Missing ${kind} source`);
    const style = getComputedStyle(owner);
    const frame = document.createElement('div');
    frame.dataset.portfolioRender = kind;
    frame.dataset.zaoTheme = owner.dataset.zaoTheme ?? 'su';
    frame.dataset.zaoMode = owner.dataset.zaoMode ?? 'light';
    frame.dataset.study = 'quiet-instrument';
    frame.className = kind === 'button' ? 'study docs-anatomy text-default' : 'study landing text-default';
    for (const key of style) {
      if (key.startsWith('--zao-')) frame.style.setProperty(key, style.getPropertyValue(key));
    }
    Object.assign(frame.style, {
      width: `${width}px`, boxSizing: 'border-box', padding: '64px',
      background: style.getPropertyValue('--zao-color-bg-canvas'),
      fontFamily: style.fontFamily, position: 'relative', margin: '32px 0',
    });
    const clone = source.cloneNode(true);
    if (kind === 'button') {
      // The docs SVG reserves layout room; an exported plate frames the drawn bounds.
      const bounds = source.getBBox();
      const inset = 6;
      clone.setAttribute('viewBox', `${bounds.x - inset} ${bounds.y - inset} ${bounds.width + inset * 2} ${bounds.height + inset * 2}`);
      clone.style.maxHeight = 'none';
      frame.appendChild(clone);
      const scene = JSON.parse(owner.querySelector('[data-anatomy-scene]').textContent);
      const legend = document.createElement('div');
      legend.className = 'type-caption text-muted';
      Object.assign(legend.style, { display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '32px' });
      scene.parts.forEach((part, index) => {
        const label = document.createElement('span');
        label.textContent = `${index + 1} · ${part.name}`;
        legend.appendChild(label);
      });
      frame.appendChild(legend);
    } else {
      frame.appendChild(clone);
    }
    document.body.appendChild(frame);
  }, { selector, ownerSelector, kind, width });
  await page.evaluate(() => document.fonts.ready);
  return page.locator(`[data-portfolio-render="${kind}"]`);
}

try {
  await open('/', 'dark');
  await frameWorkspace();
  await page.getByRole('radio', { name: 'Built', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.exploded-stage')?.getAttribute('data-pose') === 'built');
  await capture('workspace.png', page.locator('.exploded-stage'));

  await open('/', 'light');
  await frameWorkspace();
  await page.waitForFunction(() => document.querySelector('.exploded-stage')?.getAttribute('data-apart') === 'true');
  await capture('parts.png', page.locator('.exploded-stage'));

  await open('/components/button', 'light');
  await page.locator('[data-anatomy-kind="button"][data-anatomy-ready="true"]').waitFor();
  await capture('button-anatomy.png', await frameFragment(
    '[data-anatomy-kind="button"] [data-anatomy-drawing]',
    '[data-anatomy-kind="button"]', 'button',
  ));

  await open('/', 'dark');
  await capture('two-readers.png', await frameFragment('.landing-readers', '[data-landing]', 'readers'));

  const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: zaoRepo, encoding: 'utf8' }).trim();
  await writeFile(join(output, 'render-manifest.json'), JSON.stringify({
    source: 'yankundesign/zao-design-system', sourceCommit,
    renderer: 'Chromium · lossless PNG', deviceScaleFactor: scale,
    cssWidth: width, assets,
  }, null, 2) + '\n');
} finally {
  await browser.close();
}
