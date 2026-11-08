import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('site/mesheraser');
const listing=JSON.parse(fs.readFileSync(path.join(root,'index.json'),'utf8'));
assert.equal(listing.id,'com.horicraft.mesh-eraser.vpm');
assert.equal(listing.url,'https://horicraft.github.io/vpm/mesheraser/index.json');
const versions=listing.packages['com.horicraft.mesh-eraser'].versions;
assert.deepEqual(Object.keys(versions),['1.1.0']);
const p=versions['1.1.0'];
assert.equal(p.version,'1.1.0');assert.equal(p.displayName,'MeshEraser');
assert.match(p.zipSHA256,/^[a-f0-9]{64}$/);
assert.equal(p.url,'https://github.com/HoriCraft/vpm/releases/download/mesheraser-v1.1.0/com.horicraft.mesh-eraser-1.1.0.zip');
assert.equal(Object.keys(p.legacyFiles).length,44);
assert(!p.legacyFolders);
for(const filename of ['index.html','terms.html','利用規約.txt']){
 const text=fs.readFileSync(path.join(root,filename),'utf8');
 assert(!/<textarea[^>]*id=["']key["']/i.test(text));
 assert(!text.includes('mesheraser-test/index.json'));
 assert(!text.includes('施行日：未定'));
 assert(!text.includes('安全な移行手順と復元方法を準備中'));
}
const guide=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(guide.includes('BOOTHで最新版をダウンロードできない方へ'));
for(const lang of ['ja','en','ko','zh-CN']){
 assert(guide.includes('guide-previous-'+lang));
 assert(guide.includes('terms.html#lang-'+lang));
}
console.log('PASS: MeshEraser formal listing and keyless guide structure');
