import {test,expect} from '@playwright/test';
import {lessons} from '../src/curriculum';
import {soloLessons} from '../src/content';
import {teacherPlans} from '../src/teacher';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async({page})=>{
  await page.addInitScript(()=>{
    const played:string[]=[];let cancellations=0;let current:{text:string;onstart?:()=>void;onend?:()=>void}|undefined;
    class FakeUtterance {text:string;lang='';rate=1;voice=null;onstart?:()=>void;onend?:()=>void;onerror?:()=>void;constructor(text:string){this.text=text;}}
    Object.defineProperty(window,'SpeechSynthesisUtterance',{value:FakeUtterance,configurable:true});
    Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Test English',lang:'en-GB',localService:true}],cancel:()=>{cancellations++;current=undefined;},speak:(u:FakeUtterance)=>{played.push(u.text);current=u;u.onstart?.();setTimeout(()=>{if(current===u)u.onend?.();},8);}},configurable:true});
    Object.assign(window,{__audio:{played,get cancellations(){return cancellations;}}});
  });
});

test('all 28 days open, with every lesson stage and no horizontal overflow',async({page})=>{
  test.setTimeout(90000);
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  for(const l of lessons){
    await page.goto(`#/lesson/${l.id}`);
    await expect(page.getByRole('heading',{name:l.title,exact:true})).toBeVisible();
    if(l.kind!=='partner')for(const label of ['Dinle','Anla','Cümle kur','Konuş','Günün çıktısı']){await page.getByRole('navigation',{name:'Ders adımları'}).getByRole('button',{name:label,exact:false}).click();await expect(page.locator('.lesson-panel')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}
    else expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('all 32 solo listening dialogues support normal, slow, sentence replay, transcript and stop without labels',async({page})=>{
  test.setTimeout(90000);
  for(const l of soloLessons){
    await page.goto(`#/lesson/${l.id}`);await page.getByRole('navigation',{name:'Ders adımları'}).getByRole('button',{name:'Dinle'}).click();
    for(let i=0;i<2;i++){
      const panel=page.locator('.audio-panel').nth(i);await expect(panel.locator('.transcript')).toHaveCount(0);
      await panel.getByRole('button',{name:'Normal dinle',exact:true}).click();await expect(panel.getByRole('checkbox')).toBeChecked();
      await panel.getByRole('button',{name:'Yavaş dinle',exact:true}).click();await expect(page.getByText('Dinleme tamamlandı.',{exact:true})).toBeVisible();
      await panel.getByRole('button',{name:'Gerekirse metni aç'}).click();await expect(panel.locator('.transcript-line')).toHaveCount(l.dialogues[i].lines.length);
      await panel.getByRole('button',{name:'Türkçe destek',exact:true}).click();await expect(panel.getByText(l.dialogues[i].lines[0].tr,{exact:true})).toBeVisible();
      await panel.getByRole('button',{name:'1. cümleyi dinle',exact:true}).click();await page.getByRole('button',{name:'Sesi durdur',exact:true}).click();
      await panel.getByRole('button',{name:'Metni gizle',exact:true}).click();await expect(panel.locator('.transcript')).toHaveCount(0);
    }
  }
  const played=await page.evaluate(()=>(window as unknown as {__audio:{played:string[]}}).__audio.played);expect(played.length).toBeGreaterThan(0);expect(played.some(s=>/^(A:|B:|Alex:|Mia:)/.test(s))).toBe(false);
});

test('full lesson flow saves drafts, feedback, review and completion after reload',async({page})=>{
  const l=soloLessons[0];await page.goto('#/lesson/w1-d1');
  for(const b of await page.getByRole('button',{name:'Deneyip kendi cümlemi söyledim'}).all())await b.click();
  await page.getByRole('button',{name:'Sonraki adım',exact:true}).click();
  for(const b of await page.getByRole('button',{name:'Normal dinle',exact:true}).all()){await b.click();await expect(page.getByText('Dinleme tamamlandı.',{exact:true})).toBeVisible();}
  await page.getByRole('button',{name:'Sonraki adım',exact:true}).click();
  await page.locator('fieldset').first().getByRole('button',{name:l.comprehensionQuestions[0].options[0],exact:true}).click();await expect(page.getByText('Birlikte ilgili cümleye dönelim.',{exact:true})).toBeVisible();
  for(let i=0;i<l.comprehensionQuestions.length;i++)await page.locator('fieldset').nth(i).getByRole('button',{name:l.comprehensionQuestions[i].options[l.comprehensionQuestions[i].answer],exact:true}).click();
  await page.getByRole('button',{name:'Sonraki adım',exact:true}).click();
  for(let i=0;i<4;i++){const card=page.locator('.exercise-card').nth(i);await card.getByRole('textbox').fill(l.sentenceExercises[i].answer);await card.getByRole('button',{name:'Cevabımı karşılaştır',exact:true}).click();await card.getByRole('checkbox').check();}
  await page.getByRole('button',{name:'Sonraki adım',exact:true}).click();
  for(const c of await page.getByRole('checkbox').all())await c.check();
  await page.getByRole('button',{name:'Sonraki adım',exact:true}).click();
  await page.getByRole('textbox',{name:'Kendi cümlelerin / kaydından kısa notun'}).fill('After work, I usually rest. Then I make tea. What do you do after work?');
  for(const c of await page.getByRole('checkbox').all())await c.check();
  await page.getByRole('button',{name:'Çalışmayı tamamla',exact:true}).click();await expect(page.getByText('Tam çalışman kaydedildi. Yeniden çalışmak için adımları açabilirsin.')).toBeVisible();
  await page.reload();await expect(page.getByRole('textbox')).toHaveValue(/After work/);await expect(page.getByText('Tam çalışman kaydedildi.',{exact:false})).toBeVisible();
  await page.goto('#/review');await expect(page.getByRole('heading',{name:l.corePhrases[0].tr,exact:true})).toBeVisible();await page.getByRole('button',{name:'Cevabı aç',exact:true}).click();await page.getByRole('button',{name:'Kendim hatırladım',exact:false}).click();await expect(page.getByText('Bugün için bekleyen ifade yok.',{exact:true})).toBeVisible();
});

test('jumping to homework cannot falsely complete a full lesson; short is stored separately',async({page})=>{
  await page.goto('#/lesson/w1-d2');await page.getByRole('navigation',{name:'Ders adımları'}).getByRole('button',{name:'Günün çıktısı'}).click();await page.getByRole('textbox').fill('I finish at five. I have dinner at six.');for(const c of await page.getByRole('checkbox').all())await c.check();await expect(page.getByRole('button',{name:'Çalışmayı tamamla',exact:true})).toBeDisabled();
  await page.goto('#/lesson/w1-d2?short=1');await page.getByRole('button',{name:'Normal dinle',exact:true}).click();await expect(page.getByText('Dinleme tamamlandı.',{exact:true})).toBeVisible();await page.getByRole('button',{name:'Sonraki adım',exact:true}).click();await page.getByRole('button',{name:'Beşte',exact:true}).click();await page.getByRole('button',{name:'Sonraki adım',exact:true}).click();await page.getByRole('checkbox').check();await page.getByRole('button',{name:'Çalışmayı tamamla',exact:true}).click();await page.reload();
  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('hatice-english:v1')!));expect(stored.lessons['w1-d2'].short).toBeTruthy();expect(stored.lessons['w1-d2'].full).toBeUndefined();
});

test('all eight teacher plans are accessible and have matching dialogues',async({page})=>{
  await page.goto('#/teacher');await expect(page.getByText('Kimlik doğrulaması yoktur; bağlantıyı bilen herkes erişebilir.',{exact:false})).toBeVisible();
  for(const p of teacherPlans){await page.getByLabel('Birlikte çalışacağınız gün').selectOption(p.lessonId);await expect(page.locator('.teacher-phase')).toHaveCount(6);await expect(page.getByRole('heading',{name:p.title,exact:true})).toBeVisible();await expect(page.locator('.exercise-card').getByText(`Alex: ${getLessonDialogue(p.lessonId)}`,{exact:true})).toBeVisible();}
});
function getLessonDialogue(id:string){return lessons.find(l=>l.id===id)!.dialogues[0].lines[0].en;}

test('notes, theme and backups persist; malformed backup leaves existing state intact',async({page})=>{
  await page.goto('#/explore');await page.getByLabel('Yeni ifaden, anlamı ve istersen kaynak bağlantısı').fill('I like the colours. — Renklerini seviyorum.');await page.getByRole('button',{name:'Notlarıma ekle',exact:false}).click();await page.getByRole('button',{name:'Koyu temaya geç',exact:true}).click();await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await expect(page.locator('.saved-note')).toContainText('I like the colours');
  await page.goto('#/settings');const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Yedek indir',exact:true}).click();const downloaded=await downloadPromise;const path=await downloaded.path();expect(path).toBeTruthy();
  await page.getByLabel('İlerleme yedeği seç').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"version":99}')});await expect(page.getByRole('alert')).toContainText('Yedek okunamadı');
  await page.getByLabel('İlerleme yedeği seç').setInputFiles(path!);await expect(page.getByRole('button',{name:'Bu yedeği kullan',exact:true})).toBeVisible();await page.getByRole('button',{name:'Bu yedeği kullan',exact:true}).click();await page.goto('#/explore');await expect(page.locator('.saved-note')).toContainText('I like the colours');
});

test('missing English voice has an honest error and no speech queued',async({page})=>{
  await page.goto('#/lesson/w1-d1');await page.getByRole('navigation',{name:'Ders adımları'}).getByRole('button',{name:'Dinle'}).click();await page.evaluate(()=>{Object.defineProperty(window.speechSynthesis,'getVoices',{value:()=>[],configurable:true});});await page.getByRole('button',{name:'Normal dinle',exact:true}).first().click();await expect(page.getByRole('alert')).toContainText('İngilizce cihaz sesi bulunamadı');
});

test('rapid restart cancels old speech and navigating away stops the queue',async({page})=>{
  await page.goto('#/lesson/w1-d1');await page.getByRole('navigation',{name:'Ders adımları'}).getByRole('button',{name:'Dinle'}).click();
  await page.evaluate(()=>{Object.defineProperty(window.speechSynthesis,'speak',{value:(u:SpeechSynthesisUtterance)=>{Object.assign(window,{__lastUtterance:u});},configurable:true});});
  const before=await page.evaluate(()=>(window as unknown as {__audio:{cancellations:number}}).__audio.cancellations);
  await page.getByRole('button',{name:'Normal dinle',exact:true}).first().click();await page.getByRole('button',{name:'Baştan normal dinle',exact:true}).first().click();await page.getByRole('button',{name:'Sesi durdur',exact:true}).click();
  await expect(page.getByText(/cümle dinleniyor/)).toHaveCount(0);await page.getByRole('button',{name:'Normal dinle',exact:true}).first().click();await page.goto('#/today');
  const after=await page.evaluate(()=>(window as unknown as {__audio:{cancellations:number}}).__audio.cancellations);expect(after-before).toBeGreaterThanOrEqual(4);
});

test('denied microphone access gives a usable written alternative',async({page})=>{
  await page.goto('#/lesson/w1-d1?short=1');await page.getByRole('navigation',{name:'Ders adımları'}).getByRole('button',{name:'Kendi cümlen'}).click();
  await page.evaluate(()=>{Object.defineProperty(navigator,'mediaDevices',{value:{getUserMedia:async()=>{throw new DOMException('denied','NotAllowedError');}},configurable:true});});
  await page.getByRole('button',{name:'Sesimi kaydet',exact:false}).click();await expect(page.getByRole('alert')).toContainText(/Mikrofon açılamadı|Bu tarayıcı kayıt yapamıyor/);await expect(page.getByRole('checkbox')).toBeEnabled();
});

test('PWA manifest uses repository subpath; app and hash routes reopen offline',async({page,context})=>{
  await page.goto('');await page.waitForFunction(()=>!!navigator.serviceWorker.controller);const manifest=await page.request.get('manifest.webmanifest');expect(manifest.ok()).toBe(true);expect((await manifest.json()).start_url).toBe('./');
  await context.setOffline(true);await page.reload();await expect(page.getByRole('heading',{name:/Merhaba, Hatice/})).toBeVisible();await page.goto('#/lesson/w4-d5');await expect(page.getByRole('heading',{name:'Ofiste küçük bir çözüm',exact:true})).toBeVisible();await page.reload();await expect(page.getByRole('heading',{name:'Ofiste küçük bir çözüm',exact:true})).toBeVisible();await context.setOffline(false);
});

test('mobile and desktop preview screenshots',async({page},info)=>{await page.goto('');await page.screenshot({path:`test-results/${info.project.name}-home.png`,fullPage:true});});

test('core pages pass automated WCAG AA accessibility checks in both themes',async({page})=>{
  test.setTimeout(90000);
  for(const route of ['#/today','#/lessons','#/lesson/w1-d1','#/explore','#/teacher','#/settings']){
    await page.goto(route);const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations.map(v=>({id:v.id,description:v.description,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
  }
  await page.getByRole('button',{name:'Koyu temaya geç',exact:true}).first().click();const dark=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(dark.violations).toEqual([]);
});

