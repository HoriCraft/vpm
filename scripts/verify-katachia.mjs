import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {config} from '../site/katachia/release.mjs';
import {validateListing,addRepositoryUrl} from '../site/katachia/model.mjs';

const root=new URL('../site/katachia/',import.meta.url);
const files=['app.mjs','index.html','index.json','model.mjs','release.mjs','review/beta12.html','review/beta13.html','review/beta14.html','review/beta15.html','style.css'];
async function publicFiles(folder,prefix=''){
 const result=[];
 for(const entry of await readdir(folder,{withFileTypes:true})){
  if(entry.isDirectory())result.push(...await publicFiles(new URL(entry.name+'/',folder),prefix+entry.name+'/'));
  else if(entry.isFile())result.push(prefix+entry.name);
  else throw Error('Unexpected public file type');
 }
 return result;
}
if(JSON.stringify((await publicFiles(root)).sort())!==JSON.stringify(files))throw Error('Unexpected public files');
for(const file of files){
  const value=await readFile(new URL(file,root),'utf8');
  if(/KTC1\.[A-Za-z0-9+/]+={0,2}\.[A-Za-z0-9+/]+={0,2}|-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(value))throw Error('Secret-like material in public files');
}
const listing=JSON.parse(await readFile(new URL('index.json',root),'utf8'));
if(!validateListing(listing,config))throw Error('VPM catalog mismatch');
if(config.guideUrl!=='https://horicraft.github.io/vpm/katachia/'||config.repositoryUrl!==config.guideUrl+'index.json')throw Error('Wrong guide location');
if(!/^[0-9a-f]{64}$/.test(config.sha256)||!Number.isSafeInteger(config.bytes)||config.bytes<1||config.bytes>100*1024*1024)throw Error('Invalid package identity');
const expectedDownload='https://github.com/HoriCraft/vpm/releases/download/katachia-v'+config.version+'/com.horicraft.katachia-'+config.version+'.zip';
if(config.downloadUrl!==expectedDownload)throw Error('Wrong release location');
addRepositoryUrl(config.repositoryUrl);
const html=await readFile(new URL('index.html',root),'utf8');
if(!html.includes(config.version)||!html.includes('src="./app.mjs"')||!html.includes('href="./style.css"'))throw Error('Guide assets/version mismatch');
const args=process.argv.slice(2);
if(args.length && !(args.length===1&&args[0]==='--remote') && !(args.length===2&&args[0]==='--package'))throw Error('Usage: node scripts/verify-katachia.mjs [--remote | --package ZIP]');
let bytes;
if(args[0]==='--package')bytes=await readFile(args[1]);
if(args[0]==='--remote'){
  const response=await fetch(config.downloadUrl,{signal:AbortSignal.timeout(60000)});
  if(!response.ok||!response.body)throw Error('Release download failed: '+response.status);
  const chunks=[];let size=0;
  for await(const chunk of response.body){size+=chunk.length;if(size>config.bytes)throw Error('Downloaded package exceeds expected size');chunks.push(chunk);}
  bytes=Buffer.concat(chunks);
}
if(bytes && (bytes.length!==config.bytes||createHash('sha256').update(bytes).digest('hex')!==config.sha256))throw Error('Package size/SHA256 mismatch');
console.log('PASS: public files, key exclusion, VPM catalog, subdirectory URLs'+(bytes?', package size/SHA256':'; package download not checked'));
