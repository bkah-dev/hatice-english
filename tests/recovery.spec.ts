import {test,expect} from '@playwright/test';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import type {AddressInfo} from 'node:net';
import {freshProgress,freshLesson} from '../src/storage';

test('a stale cached HTML page with a deleted old entry recovers without clearing progress',async({context})=>{
  let deployed=false;
  const oldHtml='<!doctype html><html lang="tr"><head><title>Hatice English</title><link rel="manifest" href="/hatice-english/manifest.webmanifest"></head><body><div id="root"></div><script type="module" src="/hatice-english/assets/index-DUBs5tBM.js"></script></body></html>';
  const oldSw=`const CACHE='hatice-english-broken-legacy';self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['index.html']))));self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')e.waitUntil(self.skipWaiting())});self.addEventListener('fetch',e=>{if(e.request.mode==='navigate')e.respondWith(caches.open(CACHE).then(c=>c.match('index.html')))});`;
  const server=createServer(async(req,res)=>{
    try{
      const path=new URL(req.url!,'http://localhost').pathname.replace(/^\/hatice-english\//,'')||'index.html';
      res.setHeader('Cache-Control','no-store');
      if(!deployed){
        if(path==='index.html'){res.setHeader('Content-Type','text/html');res.end(oldHtml);return;}
        if(path==='sw.js'){res.setHeader('Content-Type','application/javascript');res.end(oldSw);return;}
        res.writeHead(404).end('missing old entry');return;
      }
      if(path.includes('..')){res.writeHead(403).end();return;}
      const types:Record<string,string>={'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webmanifest':'application/manifest+json'};
      res.setHeader('Content-Type',types[extname(path)]||'application/octet-stream');res.end(await readFile(resolve('dist',path)));
    }catch{res.writeHead(404).end();}
  });
  await new Promise<void>(done=>server.listen(0,'127.0.0.1',done));
  const base=`http://127.0.0.1:${(server.address()as AddressInfo).port}/hatice-english/`;
  try{
    const page=await context.newPage();await page.goto(base);
    const progress=freshProgress();progress.lessons['w1-d1']={...freshLesson(),drafts:{homework:'I usually paint after work.'}};
    await page.evaluate(async({base,progress})=>{localStorage.setItem('hatice-english:v1',JSON.stringify(progress));await navigator.serviceWorker.register(`${base}sw.js`,{scope:base});},{base,progress});
    await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await page.reload();
    await expect(page.locator('#root')).toBeEmpty();
    deployed=true;
    await page.reload();
    await expect(page.getByRole('heading',{name:/Merhaba, Hatice/})).toBeVisible({timeout:20000});
    await expect(page.locator('footer')).toContainText('v1.0.3');
    expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('hatice-english:v1')!).lessons['w1-d1'].drafts.homework)).toBe('I usually paint after work.');
  }finally{await context.close();server.closeAllConnections();await new Promise<void>(done=>server.close(()=>done()));}
});

test('a missing application bundle recovers automatically instead of staying white',async({page})=>{
  await page.route('**/assets/app.js',route=>route.fulfill({status:404,contentType:'text/plain',body:'missing'}));
  await page.goto('');await expect(page.locator('#boot-status')).toBeVisible();
  await expect(page.locator('#root')).toBeEmpty();
  await expect(page.getByRole('heading',{name:/Merhaba, Hatice/})).toBeVisible({timeout:20000});
  await expect(page.locator('footer')).toContainText('v1.0.3');
});
