import { soloLessons, weekThemes } from './content';
import { partnerLessons } from './teacher';
import type { Lesson } from './types';

const reviewSeeds=[
  {title:'İlk haftanın küçük kazanımları',focus:'Rutin, saat, hobi ve siparişi bir araya getir.', speaking:['Kendi akşamını iki eylemle anlat.','Berk’e bir saat sorusu sor, ardından hobi sorusu ekle.','Menüye bakmadan bir içecek siparişi ver; boyunu ve servis seçimini belirt.'], homework:'Bu hafta kolaylaşan bir cümle ve hâlâ duymakta zorlandığın bir ifade yaz.'},
  {title:'İhtiyacını anlatabiliyorsun',focus:'Yardım iste, özelliği sor, problemi çöz.',speaking:['Bir ürünü bulmak için yardım iste ve yerini doğrula.','Kendi renk ve beden tercihini sor; fiyatı öğren.','Yanlış gelen ürünü kibarca açıklayıp değişim iste.'],homework:'Bir alışveriş sahnesini 4 satırla yaz; kendi istediğin renk ve beden kullan.'},
  {title:'Bir plan, bir küçük hikâye',focus:'Gelecekteki plan ile dünkü olayı ayır.',speaking:['Yarınki bir planını söyle ve Berk’i davet et.','Dün yaptığın iki şeyi first ve then ile anlat.','Berk’in anlattığı olayın devamını “And after that?” diye sor.'],homework:'Yarın için bir plan, dün için iki kısa eylem yaz. Geçmiş zor gelirse stayed ve watched ile sınırla.'},
  {title:'Dört haftada neler değişti?',focus:'İlk günkü soruyu yeniden cevapla; gerçek hayat görevlerini dene.',speaking:['İlk haftanın “What do you do after work?” sorusuna üç özgün cümleyle cevap ver.','Bir randevu iste; gün ve saati tekrar ederek doğrula.','Ofiste bir sorunu anlat; yardım iste ve teşekkür et.'],homework:'İlk gün ile bugünkü cevabını karşılaştır. Artık yapabildiğin iki şeyi ve çalışmak istediğin bir beceriyi yaz.'},
];
export const reviewLessons:Lesson[]=reviewSeeds.map((s,i)=>{
  const week=i+1;
  const set=soloLessons.filter(l=>l.week===week);
  return {...set[0],id:`w${week}-d7`,day:7,kind:'review',title:s.title,subtitle:s.focus,estimatedDuration:18,
    learningObjectives:[s.focus,'Yeni haftaya geçmeden hangi desteğin gerekli olduğunu fark et.'],
    corePhrases:set.flatMap(l=>l.corePhrases).filter((_,n)=>n%2===0),
    dialogues:[set[0].dialogues[1],set[3].dialogues[1]],
    comprehensionQuestions:[...set[0].comprehensionQuestions.filter(q=>q.dialogue===1).map(q=>({...q,dialogue:0,reviewPhrase:0})),...set[3].comprehensionQuestions.filter(q=>q.dialogue===1).map(q=>({...q,reviewPhrase:2}))],
    sentenceExercises:[set[0].sentenceExercises[2],set[3].sentenceExercises[2]],
    speakingTasks:s.speaking.map((prompt,n)=>({prompt,scaffold:set[Math.min(n,3)].speakingTasks[0].scaffold,success:'Örneği okumadan kendi bilgilerimi söyledim; takılınca açıklama istedim.'})),
    reviewItems:set.slice(0,3).map((l,n)=>({lessonId:l.id,phrase:n%4,prompt:'Bu haftadan ifadeyi notsuz hatırla; sonra yeni bir ayrıntıyla kullan.'})),
    homework:{prompt:s.homework,count:week===4?'2 kazanım + 1 çalışma hedefi':'2–4 özgün cümle',criteria:['En az iki konuşma görevini ipucunu kapatarak denedim.','Zor gelen ifadeleri tekrar listesine ekledim.']},
    teacherNotes:'Anlama sorularında %80 ve üç konuşma görevinin en az ikisinde bağımsız üretim hedeflenir. Bu bir CEFR sınavı veya otomatik A2 geçişi değildir. Gerekirse aynı haftanın kısa dinlemelerini öner.',
    grammar:'Yeni kural yok. Bu haftanın kalıplarını kendi hayatından bilgilerle yeniden kullan.',sources:['original'],bonus:['Zor gelen konuşma görevini tek cümleye indir; ertesi gün bir ayrıntı ekle.','Kolay gelen konuda tekrar sayısını artırmak yerine Berk’in beklenmeyen bir sorusuna yanıt ver.'],
  };
});
export const lessons:Lesson[]=[...soloLessons,...partnerLessons,...reviewLessons].sort((a,b)=>a.week-b.week||a.day-b.day);
export const getLesson=(id:string)=>lessons.find(l=>l.id===id);
export const weeks=weekThemes.map((title,i)=>({number:i+1,title,lessons:lessons.filter(l=>l.week===i+1)}));
