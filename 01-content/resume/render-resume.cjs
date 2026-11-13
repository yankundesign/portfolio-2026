// Renders resume.html to a one-page US Letter PDF.
//   node render-resume.cjs [out.pdf]
// The PDF is tagged (a structure tree in reading order) and keeps every link.
// Fonts are the static files in fonts/, so it renders offline.
const path = require('path');
const { chromium } = require('../../site/node_modules/playwright-core');

const CHROME =
  process.env.CHROME_PATH ||
  path.join(
    process.env.HOME,
    'Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell',
  );

(async () => {
  const out = path.resolve(process.argv[2] || 'Yankun-Wang-Resume.pdf');
  // Lets the page (a file:// URL) load its fonts from fonts/.
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'resume.html'), { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);
  const missing = await page.evaluate(() => [...document.fonts].filter((f) => f.status !== 'loaded').map((f) => `${f.family} ${f.weight} ${f.style}`));
  if (missing.length) throw new Error('Fonts did not load: ' + missing.join(', '));

  // One page, or say so: an ATS reads page two, but a person might not turn to it.
  const height = await page.evaluate(() => document.body.getBoundingClientRect().height);
  if (height > 1056) console.warn(`Warning: content is ${Math.round(height)}px tall; the page is 1056px.`);

  await page.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true, tagged: true, outline: false });
  await browser.close();
  console.log('Wrote', out, `(${Math.round(height)}px of 1056px)`);
})();
