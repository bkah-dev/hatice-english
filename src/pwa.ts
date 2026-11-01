type Options={onNeedRefresh:()=>void;onOfflineReady:()=>void;onRegisterError:()=>void};
export function registerSW(options:Options){
  let registration:ServiceWorkerRegistration|undefined;
  if(!('serviceWorker'in navigator)){options.onRegisterError();return async()=>{};}
  const install=navigator.onLine
    ?navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`,{scope:import.meta.env.BASE_URL})
    :navigator.serviceWorker.getRegistration(import.meta.env.BASE_URL).then(reg=>{if(!reg)throw new Error('No offline registration');return reg;});
  const ready=install.then(reg=>{
    registration=reg;
    if(reg.waiting)options.onNeedRefresh();
    if(reg.active)options.onOfflineReady();
    reg.addEventListener('updatefound',()=>{
      const installing=reg.installing;
      installing?.addEventListener('statechange',()=>{
        if(installing.state==='installed'){
          if(navigator.serviceWorker.controller)options.onNeedRefresh();else options.onOfflineReady();
        }
      });
    });
    return reg;
  }).catch(()=>{options.onRegisterError();});
  return async(reload=true)=>{
    await ready;
    if(!registration?.waiting)return;
    if(reload)navigator.serviceWorker.addEventListener('controllerchange',()=>location.reload(),{once:true});
    registration.waiting.postMessage({type:'SKIP_WAITING'});
  };
}
