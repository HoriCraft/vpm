import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const root = new URL('../site/menutool-test/', import.meta.url);
const repository = 'https://horicraft.github.io/vpm/menutool-test/index.json';
const packageName = 'com.horicraft.menu-tool';
const version = '0.4.0-beta.20';
assert.deepEqual((await readdir(root)).sort(), ['index.html', 'index.json']);
const page = await readFile(new URL('index.html', root), 'utf8');
const listing = JSON.parse(await readFile(new URL('index.json', root), 'utf8'));
assert.equal(listing.id, 'com.horicraft.menu-tool.vpm.test');
assert.equal(listing.url, repository);
assert.equal(listing.name, 'HoriCraft MenuTool 先行テスト版');
assert.deepEqual(Object.keys(listing.packages), [packageName]);
assert.deepEqual(Object.keys(listing.packages[packageName].versions), [version]);
const entry = listing.packages[packageName].versions[version];
assert.equal(entry.name, packageName);
assert.equal(entry.version, version);
assert.equal(entry.repo, repository);
assert.equal(entry.url, `https://github.com/HoriCraft/vpm/releases/download/menutool-v${version}/${packageName}-${version}.zip`);
assert.match(entry.zipSHA256, /^[0-9a-f]{64}$/);
for (const key of ['legacyFolders', 'legacyFiles', 'legacyPackages']) assert(!(key in entry), 'Automatic removal/migration forbidden');
const publicText = page + JSON.stringify(listing);
assert(!/127\.0\.0\.1|localhost|file:\/\/|[A-Z]:[\\/]|-----BEGIN [A-Z ]*PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,}/.test(publicText), 'Unexpected private host/path/secret');
assert(page.includes(`vcc://vpm/addRepo?url=${encodeURIComponent(repository)}`));
assert(page.includes('Show Pre-Release Packages') && page.includes(version));
assert(page.includes('解除キーは同梱していません'));
const args = process.argv.slice(2);
assert(args.length === 0 || (args.length === 1 && args[0] === '--remote') || (args.length === 2 && args[0] === '--package'));
let bytes;
if (args[0] === '--package') bytes = await readFile(args[1]);
if (args[0] === '--remote') {
  const response = await fetch(entry.url, { signal: AbortSignal.timeout(60000) });
  assert(response.ok, `Release download returned ${response.status}`);
  const chunks = []; let length = 0;
  for await (const chunk of response.body) {
    length += chunk.length;
    assert(length <= 10 * 1024 * 1024, 'Unexpectedly large public package');
    chunks.push(chunk);
  }
  bytes = Buffer.concat(chunks);
}
if (bytes) assert.equal(createHash('sha256').update(bytes).digest('hex'), entry.zipSHA256);
console.log('PASS: isolated MenuTool listing and Add to VCC page' + (bytes ? ', exact package SHA256' : '; package download not checked'));
