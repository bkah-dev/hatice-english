(function(){
  if(window.__haticeRecoveryInstalled)return;
  window.__haticeRecoveryInstalled=true;
  var base=new URL('./',document.querySelector('link[rel="manifest"]')?.href||location.href);
  var running=false,finished=false;
  function card(message,failed){
    var el=document.getElementById('boot-status');
    if(!el){el=document.createElement('section');el.id='boot-status';document.body.appendChild(el);}
    el.style.cssText='max-width:480px;margin:15vh auto;padding:28px;background:#fffefa;color:#273e35;border:1px solid #dce3d3;border-radius:16px;font:16px/1.8 system-ui;text-align:center';
    el.replaceChildren();
    var title=document.createElement('h1');title.textContent='Hatice English';title.style.cssText='font:32px Georgia,serif';el.appendChild(title);
    var text=document.createElement('p');text.textContent=message;text.setAttribute('role',failed?'alert':'status');el.appendChild(text);
    if(failed){var button=document.createElement('button');button.textContent='Yeniden dene';button.style.cssText='padding:12px 20px;border:0;border-radius:8px;background:#28564b;color:#fff;font:inherit;cursor:pointer';button.onclick=function(){try{sessionStorage.removeItem('hatice:boot-recovery');}catch{}recover();};el.appendChild(button);}
  }
  function until(worker){return new Promise(function(resolve,reject){
    if(!worker||['installed','activated'].includes(worker.state)){resolve();return;}
    var timer=setTimeout(function(){reject(new Error('timeout'));},15000);
    worker.addEventListener('statechange',function changed(){
      if(['installed','activated'].includes(worker.state)){clearTimeout(timer);worker.removeEventListener('statechange',changed);resolve();}
      else if(worker.state==='redundant'){clearTimeout(timer);worker.removeEventListener('statechange',changed);reject(new Error('redundant'));}
    });
  });}
  async function recover(){
    if(running||finished)return;running=true;
    var attempts=0;try{attempts=Number(sessionStorage.getItem('hatice:boot-recovery')||0);}catch{}
    if(attempts>=2){running=false;card('Sayfa açılamadı. İnternet bağlantını kontrol edip yeniden deneyebilirsin. İlerlemen bu tarayıcıda korunuyor.',true);return;}
    try{sessionStorage.setItem('hatice:boot-recovery',String(attempts+1));}catch{}
    card('Güncel sayfa hazırlanıyor. İlerlemen korunuyor…',false);
    try{
      if(!navigator.onLine)throw new Error('offline');
      if('serviceWorker'in navigator){
        var reg=await navigator.serviceWorker.getRegistration(base.href);
        if(!reg)reg=await navigator.serviceWorker.register(new URL('sw.js',base).href,{scope:base.pathname,updateViaCache:'none'});
        else await reg.update();
        await until(reg.installing);
        if(reg.waiting){
          await new Promise(function(resolve,reject){
            var timer=setTimeout(function(){navigator.serviceWorker.removeEventListener('controllerchange',changed);reject(new Error('timeout'));},15000);
            function changed(){clearTimeout(timer);resolve();}
            navigator.serviceWorker.addEventListener('controllerchange',changed,{once:true});
            reg.waiting.postMessage({type:'SKIP_WAITING'});
          });
        }
      }
      var target=new URL(base.href);target.searchParams.set('recovered',Date.now().toString());target.hash=location.hash;
      location.replace(target.href);
    }catch{running=false;card('Sayfa açılamadı. İnternet bağlantını kontrol edip yeniden deneyebilirsin. İlerlemen bu tarayıcıda korunuyor.',true);}
  }
  function ready(){
    if(!document.getElementById('root')?.childElementCount)return false;
    finished=true;document.getElementById('boot-status')?.remove();
    try{sessionStorage.removeItem('hatice:boot-recovery');}catch{}
    return true;
  }
  window.addEventListener('hatice:recover',recover);
  window.addEventListener('error',function(event){if(!ready()&&event.target?.tagName==='SCRIPT')recover();},true);
  window.addEventListener('unhandledrejection',function(){if(!ready())recover();});
  var observer=new MutationObserver(function(){if(ready())observer.disconnect();});
  observer.observe(document.getElementById('root')||document.body,{childList:true,subtree:true});
  if(!ready())setTimeout(function(){if(!ready())recover();},7000);
})();
