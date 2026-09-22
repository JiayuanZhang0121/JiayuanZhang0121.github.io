import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await mkdir('docs/previews', { recursive: true });
for (const route of ['home', 'life', 'study', 'projects', 'about']) {
  await page.goto(`http://127.0.0.1:4173/${route === 'home' ? '' : route + '/'}`);
  await page.getByRole('dialog').waitFor();
  await page.screenshot({ path: `docs/previews/${route}.png` });
}
await page.keyboard.press('Backquote');
await page.getByRole('textbox', { name: 'Console command' }).waitFor();
await page.screenshot({ path: 'docs/previews/console.png' });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://127.0.0.1:4173/');
await page.getByRole('dialog').waitFor();
await page.screenshot({ path: 'docs/previews/mobile.png', fullPage: true });
await browser.close();
console.log('Saved five page previews, console and mobile preview in docs/previews.');
