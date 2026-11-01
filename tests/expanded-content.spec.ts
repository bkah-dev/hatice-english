import {test,expect} from '@playwright/test';
import {freshLesson,freshProgress} from '../src/storage';
import AxeBuilder from '@axe-core/playwright';

test('earlier completion survives expansion and all six listened scenes survive reload and backup',async({page})=>{
 const progress=freshProgress();progress.lessons['w1-d1']={...freshLesson(),step:1,full:'2026-10-31T10:00:00.000Z',listened:[0,1],drafts:{homework:'My original work is still here.'}};
 await page.addInitScript(p=>{if(!localStorage.getItem('hatice-english:v1'))localStorage.setItem('hatice-english:v1',JSON.stringify(p));},progress);
 await page.goto('#/lesson/w1-d1');
 await expect(page.getByText('Önceki çalışman korunuyor.',{exact:false})).toBeVisible();await expect(page.locator('.audio-panel')).toHaveCount(6);
 await expect(page.getByRole('button',{name:'Sonraki adım',exact:true})).toBeDisabled();
 for(const panel of await page.locator('.audio-panel').all())await panel.getByRole('checkbox').check();
 await page.reload();await expect(page.locator('.audio-panel input:checked')).toHaveCount(6);
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('hatice-english:v1')!));expect(saved.lessons['w1-d1'].full).toBe(progress.lessons['w1-d1'].full);expect(saved.lessons['w1-d1'].drafts.homework).toBe('My original work is still here.');
 const download=page.waitForEvent('download');await page.goto('#/settings');await page.getByRole('button',{name:'Yedek indir',exact:true}).click();expect((await download).suggestedFilename()).toMatch(/json$/);
});

test('dictation hides its answer until compared and extended writing requires an actual response',async({page})=>{
 await page.addInitScript(()=>{
  const played:string[]=[];Object.assign(window,{__dictationPlayed:played});
  Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:class{ text:string;constructor(text:string){this.text=text;}}});
  Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{getVoices:()=>[{name:'English test voice',lang:'en-GB',localService:true}],cancel:()=>{},speak:(u:{text:string;onstart?:()=>void;onend?:()=>void})=>{played.push(u.text);u.onstart?.();setTimeout(()=>u.onend?.(),5);}}});
 });
 await page.goto('#/lesson/w1-d1');await page.getByRole('navigation',{name:'Ders adımları'}).getByRole('button',{name:'Cümle kur'}).click();
 const dictation=page.locator('.exercise-card').nth(4);await expect(dictation.getByRole('button',{name:'Dikteyi dinle'})).toBeVisible();await expect(dictation.locator('.feedback p[lang="en"]')).toHaveCount(0);
 await dictation.getByRole('button',{name:'Dikteyi dinle'}).click();expect(await page.evaluate(()=>(window as unknown as {__dictationPlayed:string[]}).__dictationPlayed)).toEqual(['I usually cook first because I am hungry.']);
 await dictation.getByRole('textbox').fill('I usually cook first because I am hungry.');await dictation.getByRole('button',{name:'Cevabımı karşılaştır'}).click();await expect(dictation.locator('.feedback p[lang="en"]')).toHaveText('I usually cook first because I am hungry.');
 const writing=page.locator('.exercise-card').nth(5);await writing.getByRole('textbox').fill('yes');await expect(writing.getByRole('button',{name:'Cevabımı karşılaştır'})).toBeDisabled();
 await writing.getByRole('textbox').fill('After work, I make some coffee. Then I listen to music. What about you?');await writing.getByRole('button',{name:'Cevabımı karşılaştır'}).click();await writing.getByRole('checkbox').check();await writing.getByRole('textbox').fill('No');await expect(writing.getByRole('checkbox')).not.toBeChecked();
});

test('VOA adaptations expose attribution and original recording links; review has additional work',async({page})=>{
 await page.goto('#/lesson/w1-d5');await page.getByRole('navigation',{name:'Ders adımları'}).getByRole('button',{name:'Dinle'}).click();
 const credit=page.locator('.source-credit');await credit.locator('summary').click();await expect(credit.getByRole('link',{name:/What Do You Want/})).toHaveAttribute('href','https://learningenglish.voanews.com/a/lets-learn-english-lesson-23-what-do-you-want/3413753.html');
 expect((await new AxeBuilder({page}).include('.source-credit').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
 await page.goto('#/lesson/w1-d7');await page.getByRole('navigation',{name:'Ders adımları'}).getByRole('button',{name:'Dinle'}).click();await expect(page.locator('.audio-panel')).toHaveCount(4);
});
