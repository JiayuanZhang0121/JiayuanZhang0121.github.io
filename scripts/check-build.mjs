import { readFile, access, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';

const root = resolve('dist');
for (const page of ['index.html', 'life/index.html', 'study/index.html', 'projects/index.html', 'about/index.html', '404.html']) {
  const html = await readFile(resolve(root, page), 'utf8');
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /<div id="root">/);
  for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
    await access(resolve(root, url.slice(1)));
  }
}
const license = await readFile('LICENSE', 'utf8');
assert.equal(await readFile(resolve(root, 'licenses/half-life-screen-MIT.txt'), 'utf8'), license);
assert.equal(await readFile(resolve(root, 'THIRD_PARTY_NOTICES.md'), 'utf8'), await readFile('THIRD_PARTY_NOTICES.md', 'utf8'));
await access(resolve(root, '.nojekyll'));
const files = await readdir(root, { recursive: true });
assert(!files.some(file => /\.(mp3|wav|mp4|ttf|otf|jpg|png)$/i.test(file)), 'Unexpected unreviewed binary asset');
console.log('Build verified: 6 HTML entries, local assets, license, notices, and asset policy.');
