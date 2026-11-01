import {test,expect} from '@playwright/test';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import type {AddressInfo} from 'node:net';

test('an update activated in one tab can also refresh the stale notice in another tab without losing progress',async({context})=>{
  let version=1;
  const sw=await readFile('dist/sw.js','utf8');
  const server=createServer(async(req,res)=>{
    try{
      const pathname=new URL(req.url!,'http://localhost').pathname;
      const relative=pathname.replace(/^\/hatice-english\//,'')||'index.html';
      if(relative.includes('..')){res.writeHead(403).end();return;}
      res.setHeader('Cache-Control','public, max-age=600');
      if(relative==='sw.js'){
        res.setHeader('Cache-Control','no-cache');
        res.setHeader('Content-Type','application/javascript');
        res.end(sw.replace(/const CACHE='[^']+'/,`const CACHE='hatice-english-update-test-${version}'`));return;
      }
      const path=resolve('dist',relative);
      const types:Record<string,string>={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
      res.setHeader('Content-Type',types[extname(path)]||'application/octet-stream');
      const content=await readFile(path);
      res.end(relative==='index.html'?content.toString().replace('</head>',`<meta name="test-release" content="${version}"></head>`):content);
    }catch{res.writeHead(404).end();}
  });
  await new Promise<void>(done=>server.listen(0,'127.0.0.1',done));
  const base=`http://127.0.0.1:${(server.address() as AddressInfo).port}/hatice-english/`;
  try{
    const first=await context.newPage();await first.goto(base);await first.waitForFunction(()=>!!navigator.serviceWorker.controller);
    await first.getByRole('button',{name:'Bu ifadeyi tekrar listeme ekle'}).click();
    const second=await context.newPage();await second.goto(base);await expect(second.locator('meta[name="test-release"]')).toHaveAttribute('content','1');
    version=2;
    await first.evaluate(async()=>{await(await navigator.serviceWorker.getRegistration())!.update();});
    await expect(first.getByRole('button',{name:'Şimdi güncelle',exact:true})).toBeVisible();
    await expect(second.getByRole('button',{name:'Şimdi güncelle',exact:true})).toBeVisible();
    await first.evaluate(async()=>{const worker=(await navigator.serviceWorker.getRegistration())!.waiting!;Object.defineProperty(worker,'postMessage',{configurable:true,value:()=>{throw new Error('Güncelleme iletilemedi. Yeniden dene.');}});});
    await first.getByRole('button',{name:'Şimdi güncelle',exact:true}).click();
    await expect(first.getByRole('alert')).toContainText('Güncelleme iletilemedi');
    await expect(first.getByRole('button',{name:'Şimdi güncelle',exact:true})).toBeEnabled();
    await first.evaluate(async()=>{const worker=(await navigator.serviceWorker.getRegistration())!.waiting!;delete(worker as unknown as Record<string,unknown>).postMessage;});
    await first.getByRole('button',{name:'Şimdi güncelle',exact:true}).click();
    await expect(first.locator('meta[name="test-release"]')).toHaveAttribute('content','2');
    await second.getByRole('button',{name:'Şimdi güncelle',exact:true}).click();
    await expect(second.locator('meta[name="test-release"]')).toHaveAttribute('content','2');
    await expect(second.getByText('Yeni sürüm hazır.',{exact:false})).toHaveCount(0);
    expect(await second.evaluate(()=>JSON.parse(localStorage.getItem('hatice-english:v1')!).review.length)).toBe(1);
  }finally{await context.close();server.closeAllConnections();await new Promise<void>(done=>server.close(()=>done()));}
});
