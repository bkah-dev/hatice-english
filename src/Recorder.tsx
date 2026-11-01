import {useEffect,useRef,useState} from 'react';
import {Mic,Square,Download} from 'lucide-react';

export default function Recorder({onRecorded}:{onRecorded?:()=>void}){
  const [recording,setRecording]=useState(false);const [url,setUrl]=useState('');const [error,setError]=useState('');const [ext,setExt]=useState('webm');
  const recorder=useRef<MediaRecorder|null>(null);const stream=useRef<MediaStream|null>(null);const chunks=useRef<Blob[]>([]);const blobUrl=useRef('');const mounted=useRef(true);const timeout=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;clearTimeout(timeout.current);recorder.current?.state==='recording'&&recorder.current.stop();stream.current?.getTracks().forEach(t=>t.stop());URL.revokeObjectURL(blobUrl.current);};},[]);
  async function start(){
    setError('');
    if(!navigator.mediaDevices?.getUserMedia||typeof MediaRecorder==='undefined'){setError('Bu tarayıcı kayıt yapamıyor. Telefonunun Sesli Notlar uygulamasını kullanabilir veya görevini yazabilirsin.');return;}
    try {
      const s=await navigator.mediaDevices.getUserMedia({audio:true});if(!mounted.current){s.getTracks().forEach(t=>t.stop());return;}stream.current=s;chunks.current=[];
      const mime=['audio/mp4','audio/webm;codecs=opus','audio/webm'].find(t=>MediaRecorder.isTypeSupported(t));
      const r=new MediaRecorder(s,mime?{mimeType:mime}:undefined);recorder.current=r;
      r.ondataavailable=e=>{if(e.data.size)chunks.current.push(e.data);};
      r.onstop=()=>{clearTimeout(timeout.current);s.getTracks().forEach(t=>t.stop());if(!mounted.current)return;setRecording(false);URL.revokeObjectURL(blobUrl.current);const b=new Blob(chunks.current,{type:r.mimeType});if(!b.size){setError('Kayıt boş kaldı. Mikrofonu kontrol edip yeniden dene.');return;}blobUrl.current=URL.createObjectURL(b);setUrl(blobUrl.current);setExt(r.mimeType.includes('mp4')?'m4a':'webm');onRecorded?.();};
      r.onerror=()=>{s.getTracks().forEach(t=>t.stop());if(mounted.current){setRecording(false);setError('Kayıt kesildi. Yeniden deneyebilir veya telefonun Sesli Notlar uygulamasını kullanabilirsin.');}};
      r.start();setRecording(true);timeout.current=setTimeout(()=>r.state==='recording'&&r.stop(),180000);
    } catch {stream.current?.getTracks().forEach(t=>t.stop());setError('Mikrofon açılamadı. Tarayıcı iznini kontrol et; istersen görevini yazıyla tamamla.');}
  }
  return <div className="recorder"><p className="small">Kendi sesini dinle · en fazla 3 dakika</p><button className={recording?'btn danger':'btn secondary'} onClick={()=>recording?recorder.current?.stop():void start()}>{recording?<Square size={17}/>:<Mic size={17}/>} {recording?'Kaydı durdur':'Sesimi kaydet'}</button>{recording&&<span role="status"> Kayıt sürüyor…</span>}{error&&<p role="alert" className="notice">{error}</p>}{url&&<div className="recorded"><audio controls src={url}/><a className="text-link" href={url} download={`hatice-${Date.now()}.${ext}`}><Download size={16}/> Kaydı indir</a></div>}<p className="small muted">Kayıt sunucuya gönderilmez. Bu ekrandan ayrılmadan indir; ses dosyası ilerleme yedeğine eklenmez. Konuşmayı otomatik puanlamıyoruz.</p></div>;
}
