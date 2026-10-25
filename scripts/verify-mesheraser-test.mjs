import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const root = new URL('../site/mesheraser-test/', import.meta.url);
const version = '1.1.0-beta.6';
const packageName = 'com.horicraft.mesh-eraser';
const repositoryUrl = 'https://horicraft.github.io/vpm/mesheraser-test/index.json';
const downloadUrl = `https://github.com/HoriCraft/vpm/releases/download/mesheraser-v${version}/${packageName}-${version}.zip`;
const sha256 = '0b579195bb1d443785a1bfc83f8c70dbe79cbb6ba81c9f5ff230fa7b4290ac5f';
const size = 374442;
assert.deepEqual((await readdir(root)).sort(), ['index.html', 'index.json']);
const page = await readFile(new URL('index.html', root), 'utf8');
const json = await readFile(new URL('index.json', root), 'utf8');
assert(!/-----BEGIN [A-Z ]*PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,}|<textarea/i.test(page + json), 'Unexpected secret/key input');
const listing = JSON.parse(json);
assert.equal(listing.id, 'com.horicraft.mesh-eraser.vpm.test');
assert.equal(listing.url, repositoryUrl);
assert.equal(listing.name, 'HoriCraft MeshEraser Public Test');
assert.deepEqual(Object.keys(listing.packages), [packageName]);
assert.deepEqual(Object.keys(listing.packages[packageName].versions), ['1.1.0-beta.1', '1.1.0-beta.3', '1.1.0-beta.4', '1.1.0-beta.5', version]);
assert.equal(listing.packages[packageName].versions['1.1.0-beta.1'].zipSHA256, '2807214e6cddccb3afcacc9fbf07515fd342d23d2552dfcedd7e012aca9fcd31');
assert.equal(listing.packages[packageName].versions['1.1.0-beta.3'].zipSHA256, '7943c15f4e82c3f255ff625e6471fb11d65f34a87582471ef6174ac753aff61c');
assert.equal(listing.packages[packageName].versions['1.1.0-beta.4'].zipSHA256, '520f6bc977521995938de60ec2a394094096149fc41ba1aec629d93d46e5c64f');
assert.equal(listing.packages[packageName].versions['1.1.0-beta.5'].zipSHA256, '9f11000285656c7b75fe6f607fa1d2317ff2c21cd49e8dd38c5098c416b7e6b6');
const entry = listing.packages[packageName].versions[version];
assert.equal(entry.name, packageName);
assert.equal(entry.displayName, 'MeshEraser');
assert.equal(entry.version, version);
assert.equal(entry.unity, '2022.3');
assert.deepEqual(entry.vpmDependencies, { 'nadena.dev.ndmf': '>=1.4.0 <2.0.0' });
assert.equal(entry.url, downloadUrl);
assert.equal(entry.zipSHA256, sha256);
assert.equal(entry.repo, repositoryUrl);
for (const key of ['legacyFolders', 'legacyFiles', 'legacyPackages']) assert(!(key in entry), 'Automatic migration is not supported');
assert(page.includes(`vcc://vpm/addRepo?url=${encodeURIComponent(repositoryUrl)}`));
assert(page.includes('Show Pre-Release Packages'));
assert(page.includes(version));
for (const language of ['ja', 'en', 'ko', 'zh-CN']) assert(page.includes(`data-language="${language}"`));
const image = page.match(/src="data:image\/png;base64,([A-Za-z0-9+/=]+)"/);
assert(image, 'Original logo must be embedded');
assert.equal(Buffer.from(image[1], 'base64').length, 42371);
const args = process.argv.slice(2);
assert(args.length === 0 || (args.length === 1 && args[0] === '--remote') || (args.length === 2 && args[0] === '--package'), 'Usage: node scripts/verify-mesheraser-test.mjs [--remote | --package ZIP]');
let bytes;
if (args[0] === '--package') bytes = await readFile(args[1]);
if (args[0] === '--remote') {
  const response = await fetch(downloadUrl, { signal: AbortSignal.timeout(60000) });
  assert(response.ok && response.body, `Release download: ${response.status}`);
  const chunks = []; let total = 0;
  for await (const chunk of response.body) {
    total += chunk.length;
    assert(total <= size, 'Download exceeds expected size');
    chunks.push(chunk);
  }
  bytes = Buffer.concat(chunks);
}
if (bytes) {
  assert.equal(bytes.length, size);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), sha256);
}
console.log('PASS: MeshEraser test listing, isolated URLs, languages and public files' + (bytes ? ', package size/SHA256' : '; download not checked'));
