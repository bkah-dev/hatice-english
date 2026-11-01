export const STORAGE_KEY='hatice-english:v1';
export type LessonProgress={ step:number; shortStep:number; answers:Record<string,number>; drafts:Record<string,string>; checks:Record<string,boolean>; listened:number[]; full?:string; short?:string };
export type ReviewCard={ id:string; lessonId:string; phrase:number; due:string; interval:number; successes:number };
export type Progress={version:1; startDate:string; theme:'light'|'dark'; lessons:Record<string,LessonProgress>; review:ReviewCard[]; notes:{id:string;text:string;created:string}[]};
export const freshProgress=():Progress=>({version:1,startDate:'2026-11-02',theme:'light',lessons:{},review:[],notes:[]});
export const freshLesson=():LessonProgress=>({step:0,shortStep:0,answers:{},drafts:{},checks:{},listened:[]});
export function validProgress(value:unknown):value is Progress {
  if(!value||typeof value!=='object') return false;
  const p=value as Progress;
  const date=(s:unknown)=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s));
  const dict=(s:unknown)=>!!s&&typeof s==='object'&&!Array.isArray(s);
  if(p.version!==1||!date(p.startDate)||!['light','dark'].includes(p.theme)||!dict(p.lessons)||!Array.isArray(p.review)||!Array.isArray(p.notes))return false;
  if(Object.keys(p.lessons).length>100||p.review.length>2000||p.notes.length>2000)return false;
  if(!Object.entries(p.lessons).every(([id,l])=>{
    return /^w[1-4]-d[1-7]$/.test(id)&&dict(l)
      &&Number.isInteger(l.step)&&l.step>=0&&l.step<=5
      &&Number.isInteger(l.shortStep)&&l.shortStep>=0&&l.shortStep<=2
      &&dict(l.answers)&&Object.values(l.answers).every(n=>Number.isInteger(n)&&n>=0&&n<6)
      &&dict(l.drafts)&&Object.values(l.drafts).every(s=>typeof s==='string'&&s.length<=20000)
      &&dict(l.checks)&&Object.values(l.checks).every(v=>typeof v==='boolean')
      &&Array.isArray(l.listened)&&l.listened.every(n=>n===0||n===1)
      &&(!l.full||typeof l.full==='string')&&(!l.short||typeof l.short==='string');
  }))return false;
  return p.review.every(c=>dict(c)&&typeof c.id==='string'&&/^w[1-4]-d[1-7]$/.test(c.lessonId)&&Number.isInteger(c.phrase)&&c.phrase>=0&&c.phrase<8&&date(c.due)&&[c.interval,c.successes].every(n=>Number.isInteger(n)&&n>=0&&n<10000))&&p.notes.every(n=>dict(n)&&typeof n.id==='string'&&typeof n.text==='string'&&n.text.length<=10000&&typeof n.created==='string');
}
export function readProgress():{progress:Progress;error:string} {
  try {const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return {progress:freshProgress(),error:''};const parsed:unknown=JSON.parse(raw);if(!validProgress(parsed))throw new Error('invalid');return {progress:parsed,error:''};}
  catch {return {progress:freshProgress(),error:'Kayıtlı ilerleme okunamadı. Bu oturumda çalışabilirsin; eski veri üzerine yazmamak için yedek indir veya geçerli yedeğini içe aktar.'};}
}
export const localDay=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
export function dueIn(days:number){const date=new Date(`${localDay()}T12:00:00Z`);date.setUTCDate(date.getUTCDate()+days);return date.toISOString().slice(0,10);}
export function scheduleReview(card:ReviewCard,remembered:boolean):ReviewCard {
  const interval=remembered?(card.interval===0?1:card.interval===1?3:card.interval===3?7:Math.min(30,card.interval*2)):1;
  return {...card,interval,due:dueIn(interval),successes:remembered?card.successes+1:0};
}
