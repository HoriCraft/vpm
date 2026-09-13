import {addRepositoryUrl,readKeyFragment,cleanAddress,isPublishedLocation,validateListing} from './model.mjs';
import {config} from './release.mjs';
const $=id=>document.getElementById(id);let key='',repositoryReady=false,timer;
function tell(text){$('toast').textContent=text;clearTimeout(timer);timer=setTimeout(()=>$('toast').textContent='',7000);}
async function copy(text,label){try{await navigator.clipboard.writeText(text);tell(label+'をコピーしました。');}catch{$('copy-value').value=text;$('copy-fallback').showModal();$('copy-value').select();}}
$('close-copy').addEventListener('click',()=>$('copy-fallback').close());
$('copy-fallback').addEventListener('close',()=>$('copy-value').value='');
$('copy-key').addEventListener('click',()=>{if(key)return copy(key,'解除キー');});
$('copy-repo').addEventListener('click',()=>{if(repositoryReady)return copy(config.repositoryUrl,'追加用URL');});
$('add-repo').addEventListener('click',()=>{if(repositoryReady){location.href=addRepositoryUrl(config.repositoryUrl);tell('VCC／ALCOM側で追加を確認してください。まだ導入完了ではありません。');}});
function loadPersonalKey(){
 const result=readKeyFragment(location.hash);
 if(location.hash.startsWith('#key=')){try{history.replaceState(null,'',cleanAddress(location.href));}catch{/* A local file may not allow history changes. Do not persist the key elsewhere. */}}
 if(result.state==='ready'){
  key=result.key;$('copy-key').disabled=false;
  $('recipient').textContent=result.expiry?'キーの期限：'+result.expiry:'受け取った製品版キー';
  $('key-hint').textContent='個別リンクからキーを読み取りました。コピーしてUnityで登録してください。再読み込み後はDMの個別リンクから開き直せます。';
 }else if(result.state==='invalid'){
  $('key-hint').textContent='キー付きリンクを読み取れませんでした。DMのリンク全体から開き直すか、@SansanHoriへ再送を依頼してください。';
 }else{
  $('key-hint').textContent='製品版のテスター用キーは個別DMでお渡しします。受け取ったキー付きリンクから開くと、このボタンでコピーできます。キーなしでも無料版を使えます。';
 }
}
async function start(){
 loadPersonalKey();$('version').textContent=config.version;
 if(!isPublishedLocation(location.href,config.guideUrl)){$('connection').textContent='公開前の見本です。VCC・ALCOMへの追加は、公開後の案内URLから利用できます。';return;}
 try{
  const response=await fetch('./index.json',{cache:'no-store',credentials:'omit',redirect:'error'});
  if(!response.ok)throw Error('配布情報を読み込めませんでした。少し待って開き直してください。');
  validateListing(await response.json(),config);repositoryReady=true;
  for(const id of ['add-repo','copy-repo'])$(id).disabled=false;
  $('connection').textContent='ベータ版はどなたでも追加できます。製品版のテストに参加する方は、個別DMのキーを登録してください。';
 }catch(e){$('connection').textContent=e.message;$('connection').classList.add('error');}
}
start();
