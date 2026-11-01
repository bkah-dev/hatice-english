import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
async function list(dir){const result=[];for(const e of await readdir(dir,{withFileTypes:true})){if(e.isDirectory())result.push(...(await list(`${dir}/${e.name}`)));else if(e.name!=='sw.js')result.push(`${dir}/${e.name}`);}return result;}
const files=(await list('dist')).sort();
const hash=createHash('sha256');for(const file of files)hash.update(await readFile(file));
hash.update((await readFile(new URL(import.meta.url),'utf8')).replace(/\r\n/g,'\n'));
const version=hash.digest('hex').slice(0,12);
const assets=files.map(f=>f.slice(5));
await writeFile('dist/sw.js',`
const CACHE='hatice-english-${version}';
const ASSETS=${JSON.stringify(assets)}.map(path=>new URL(path,self.registration.scope).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'})))));});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const name of await caches.keys()){if(name.startsWith('hatice-english-')&&name!==CACHE)await caches.delete(name);}await self.clients.claim();})());});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')event.waitUntil(self.skipWaiting());});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(!url.href.startsWith(self.registration.scope))return;
  if(event.request.mode==='navigate'){
    event.respondWith(caches.open(CACHE).then(cache=>cache.match(new URL('index.html',self.registration.scope).href)).then(cached=>cached||fetch(event.request)));
  }else if(ASSETS.includes(url.href)){
    event.respondWith(caches.open(CACHE).then(cache=>cache.match(event.request,{ignoreVary:true})).then(cached=>cached||fetch(event.request)));
  }
});
`);
console.log(`Offline shell generated: ${assets.length} assets, version ${version}.`);
