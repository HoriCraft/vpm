export function addRepositoryUrl(url){
 const parsed=new URL(url);
 if(parsed.protocol!=='https:'||parsed.username||parsed.password||parsed.search||parsed.hash)throw new Error('HTTPSの追加用URLが必要です。');
 return 'vcc://vpm/addRepo?url='+encodeURIComponent(parsed.href);
}
export function readKeyFragment(hash){
 if(!hash.startsWith('#key='))return {state:'none'};
 try{
  const params=new URLSearchParams(hash.slice(1));
  if([...params.keys()].length!==1||params.getAll('key').length!==1)throw Error();
  const key=params.get('key');
  if(!key||key.length>4096||!/^KTC1\.[A-Za-z0-9+/]+={0,2}\.[A-Za-z0-9+/]+={0,2}$/.test(key))throw Error();
  const parts=key.split('.'),fields=atob(parts[1]).split('\n');atob(parts[2]);
  if(fields.length!==5||fields[0]!=='KTC1'||fields[1]!=='com.horicraft.katachia'||fields[2]!=='full'||!/^[0-9a-f]{32}$/i.test(fields[3]))throw Error();
  const expiry=fields[4];
  if(expiry&&!/^\d{4}-\d{2}-\d{2}$/.test(expiry))throw Error();
  if(expiry){const date=new Date(expiry+'T00:00:00Z');if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==expiry)throw Error();}
  // Format only. The Unity application verifies the signature and entitlement.
  return {state:'ready',key,expiry};
 }catch{return {state:'invalid'};}
}
export function cleanAddress(href){const u=new URL(href);if(u.hash.startsWith('#key='))u.hash='';return u.href;}
export function isPublishedLocation(href,guideUrl){const u=new URL(cleanAddress(href));u.hash='';return u.protocol==='https:'&&!u.search&&(u.href===guideUrl||u.href===guideUrl+'index.html');}
export function validateListing(data,config){
 const version=data?.packages?.['com.horicraft.katachia']?.versions?.[config.version];
 if(data?.id!=='com.horicraft.katachia.beta'||data.url!==config.repositoryUrl||version?.name!=='com.horicraft.katachia'||version.version!==config.version||version.url!==config.downloadUrl||version.zipSHA256!==config.sha256)throw Error('配布情報を確認できませんでした。少し待ってページを開き直してください。');
 return version;
}
