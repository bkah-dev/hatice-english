type Options={onNeedRefresh:()=>void;onOfflineReady:()=>void;onRegisterError:()=>void};
export function registerSW(options:Options){
  let registration:ServiceWorkerRegistration|undefined;
  let pendingWorker:ServiceWorker|null=null;
  let documentController=navigator.serviceWorker?.controller||null;
  let controllerChanged=false;
  if(!('serviceWorker'in navigator)){options.onRegisterError();return async()=>{};}
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    const controller=navigator.serviceWorker.controller;
    if(!documentController){documentController=controller;return;}
    if(controller&&controller!==documentController){controllerChanged=true;options.onNeedRefresh();}
  });
  const install=navigator.onLine
    ?navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`,{scope:import.meta.env.BASE_URL})
    :navigator.serviceWorker.getRegistration(import.meta.env.BASE_URL).then(reg=>{if(!reg)throw new Error('No offline registration');return reg;});
  const ready=install.then(reg=>{
    registration=reg;
    if(reg.waiting){pendingWorker=reg.waiting;options.onNeedRefresh();}
    if(reg.active)options.onOfflineReady();
    const watched=new WeakSet<ServiceWorker>();
    const watch=(worker:ServiceWorker|null)=>{
      if(!worker||watched.has(worker))return;
      watched.add(worker);
      const changed=()=>{if(worker.state==='installed'){
        if(navigator.serviceWorker.controller){pendingWorker=worker;options.onNeedRefresh();}else options.onOfflineReady();
      }};
      worker.addEventListener('statechange',changed);changed();
    };
    watch(reg.installing);
    reg.addEventListener('updatefound',()=>watch(reg.installing));
    return reg;
  }).catch(()=>{options.onRegisterError();});
  return async(reload=true)=>{
    await ready;
    if(controllerChanged){if(reload)location.reload();return;}
    if(!registration)throw new Error('Güncelleme bağlantısı kurulamadı. İnternet bağlantını kontrol edip yeniden dene.');
    let worker=registration.waiting||pendingWorker;
    if(!worker){
      if(!navigator.onLine)throw new Error('Güncelleme için internet bağlantısı gerekiyor. İlerlemen korunuyor.');
      await registration.update();worker=registration.waiting||pendingWorker;
    }
    if(!worker){if(reload)location.reload();return;}
    if(worker.state==='activated'){if(reload)location.reload();return;}
    if(worker.state==='redundant')throw new Error('Bu güncellemenin yerine daha yeni bir sürüm geldi. Sayfayı yenileyip tekrar dene.');
    await new Promise<void>((resolve,reject)=>{
      let timer:ReturnType<typeof setTimeout>;
      const cleanup=()=>{clearTimeout(timer);navigator.serviceWorker.removeEventListener('controllerchange',changed);};
      const changed=()=>{cleanup();resolve();if(reload)location.reload();};
      navigator.serviceWorker.addEventListener('controllerchange',changed,{once:true});
      timer=setTimeout(()=>{cleanup();reject(new Error('Güncelleme tamamlanamadı. İlerlemen korunuyor; yeniden deneyebilirsin.'));},12000);
      try{worker.postMessage({type:'SKIP_WAITING'});}catch(error){cleanup();reject(error);}
    });
  };
}
