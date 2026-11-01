export type AudioStatus={playing:boolean;message:string;error:boolean};
export function createSpeaker(onStatus:(status:AudioStatus)=>void) {
  let run=0;let timer:ReturnType<typeof setTimeout>|undefined;let current:SpeechSynthesisUtterance|null=null;
  const stop=()=>{run++;clearTimeout(timer);current=null;if('speechSynthesis'in window)window.speechSynthesis.cancel();onStatus({playing:false,message:'',error:false});};
  const play=(lines:string[],slow=false,onComplete?:()=>void)=>{
    stop();
    if(!('speechSynthesis'in window)||!('SpeechSynthesisUtterance'in window)){onStatus({playing:false,message:'Bu tarayıcı seslendirmeyi desteklemiyor. Metni açabilir veya Berk’ten okumasını isteyebilirsin.',error:true});return;}
    const thisRun=run;
    const fail=(message:string)=>{if(run!==thisRun)return;stop();onStatus({playing:false,message,error:true});};
    const next=(index:number)=>{
      if(run!==thisRun)return;
      if(index>=lines.length){current=null;onStatus({playing:false,message:'Dinleme tamamlandı.',error:false});onComplete?.();return;}
      const voices=window.speechSynthesis.getVoices().filter(v=>v.lang.toLowerCase().startsWith('en'));
      if(!voices.length){fail('İngilizce cihaz sesi bulunamadı. Telefon ayarlarından bir İngilizce ses indirip yeniden dene. Berk okuyabilir; metin desteği de var.');return;}
      const u=new SpeechSynthesisUtterance(lines[index]);current=u;
      u.lang='en-GB';u.voice=voices.find(v=>v.lang==='en-GB'&&v.localService)||voices.find(v=>v.lang==='en-GB')||voices[0];u.rate=slow?0.72:0.92;
      timer=setTimeout(()=>fail('Ses başlatılamadı. Ses seviyesini kontrol et ve yeniden dene. Çevrimdışı kullanım için cihazda yüklü bir İngilizce ses gerekir.'),6500);
      u.onstart=()=>{if(run!==thisRun)return;clearTimeout(timer);timer=setTimeout(()=>fail('Seslendirme yanıt vermedi. Durdurup yeniden deneyebilirsin.'),Math.max(20000,lines[index].length*180));};
      u.onend=()=>{if(run!==thisRun)return;clearTimeout(timer);next(index+1);};
      u.onerror=(e)=>{if(run!==thisRun)return;fail(e.error==='not-allowed'?'Ses için dinle düğmesine yeniden dokun.':'Ses çalınamadı. İngilizce cihaz sesini ve ses seviyesini kontrol et.');};
      onStatus({playing:true,message:`${index+1}/${lines.length} cümle dinleniyor${slow?' · yavaş':''}.`,error:false});
      window.speechSynthesis.speak(u);
    };
    next(0);
  };
  return {play,stop,get current(){return current;}};
}
