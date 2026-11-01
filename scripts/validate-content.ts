import assert from 'node:assert/strict';
import {lessons,reviewLessons} from '../src/curriculum';
import {soloLessons} from '../src/content';
import {teacherPlans} from '../src/teacher';
import type {Lesson} from '../src/types';

export function validateContent(data:Lesson[]){
  const ids=new Set(data.map(l=>l.id));assert.equal(ids.size,data.length,'Duplicate lesson id');
  assert.equal(data.length,28,'Exactly 28 days required');
  for(let week=1;week<=4;week++)for(let day=1;day<=7;day++)assert(ids.has(`w${week}-d${day}`),`Missing week ${week} day ${day}`);
  for(const l of data){
    for(const key of ['id','level','title','subtitle','grammar','teacherNotes'] as const)assert(l[key].trim(),`${l.id}: empty ${key}`);
    assert.equal(l.id,`w${l.week}-d${l.day}`);assert(l.learningObjectives.length>=2);assert(l.corePhrases.length>=4);assert(l.vocabulary.length>=4);assert(l.sources.length>0);assert(l.bonus.length>=2);
    assert(l.homework.prompt.trim()&&l.homework.count.trim()&&l.homework.criteria.length>=2,`${l.id}: empty homework`);
    assert(l.dialogues.length>=2,`${l.id}: missing dialogues`);
    for(const d of l.dialogues){assert(d.title&&d.gist);assert(d.lines.length>=4&&d.lines.length<=10,`${l.id}: dialogue must have 4–10 turns`);d.lines.forEach(line=>{assert(line.en.trim()&&line.tr.trim()&&line.speaker);assert(!/^[AB]:/.test(line.en),`${l.id}: speaker label leaked into speech`);});}
    for(const q of l.comprehensionQuestions){assert(q.prompt&&q.explanation&&q.evidence);assert(q.options.length>=2);assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length,`${l.id}: invalid answer`);assert(new Set(q.options).size===q.options.length);assert(l.dialogues[q.dialogue]?.lines.some(line=>line.en===q.evidence),`${l.id}: evidence not in dialogue: ${q.evidence}`);assert(l.corePhrases[q.reviewPhrase],`${l.id}: invalid review phrase`);}
    for(const e of l.sentenceExercises){assert(e.prompt&&e.answer&&e.hint&&e.explanation,`${l.id}: incomplete sentence exercise`);if(e.minWords){assert(Number.isInteger(e.minWords)&&e.minWords>0);assert(e.answer.split(/\s+/).length>=e.minWords,`${l.id}: model too short for its task`);}}
    for(const d of l.dialogues)if(d.source){assert(d.source.author==='VOA Learning English'&&d.source.license==='Public domain'&&d.source.changes&&d.source.title);assert.equal(new URL(d.source.url).hostname,'learningenglish.voanews.com');assert.equal(d.source.rightsUrl,'https://learningenglish.voanews.com/p/6021.html');assert(l.sources.includes(d.source.url),`${l.id}: missing source credit`);}
    for(const t of l.speakingTasks)assert(t.prompt&&t.scaffold&&t.success,`${l.id}: incomplete speaking task`);
    for(const r of l.reviewItems){assert(ids.has(r.lessonId),`${l.id}: broken review link`);assert(data.find(x=>x.id===r.lessonId)!.corePhrases[r.phrase],`${l.id}: missing review phrase`);}
    if(l.kind==='solo'){assert.equal(l.dialogues.length,6);assert(l.comprehensionQuestions.length>=17);assert.equal(l.sentenceExercises.length,8);assert(l.sentenceExercises.some(e=>e.type==='dictation'));assert(new Set(l.sentenceExercises.map(e=>e.type)).size>=4);assert(l.speakingTasks.length>=5);assert(l.reviewItems.length>=3);assert(l.dialogues.flatMap(d=>d.lines).reduce((n,line)=>n+line.en.split(/\s+/).length,0)>=320,`${l.id}: insufficient listening text`);for(let di=0;di<6;di++)assert(l.comprehensionQuestions.filter(q=>q.dialogue===di).length>=2,`${l.id}: untested dialogue ${di}`);}
  }
  return true;
}

validateContent(lessons);
assert.equal(soloLessons.length,16);assert.equal(teacherPlans.length,8);assert.equal(reviewLessons.length,4);
assert.equal(new Set(soloLessons.flatMap(l=>l.dialogues.map(d=>d.lines.map(x=>x.en).join('|')))).size,96,'Solo dialogues must be distinct');
assert.equal(soloLessons.flatMap(l=>l.dialogues).filter(d=>d.source).length,4,'Four credited VOA adaptations required');
for(const p of teacherPlans){assert.equal(p.phases.reduce((n,s)=>n+s.minutes,0),40,`${p.lessonId}: teacher plan is not 40 minutes`);assert(p.roleplay.sample.length>=4&&p.rescue.length>=2&&p.stretch.length>=2&&p.assessment.length>=3);assert(p.phases.every(s=>s.instructions.length>=3));assert(lessons.some(l=>l.id===p.lessonId&&l.kind==='partner'));}
console.log(`Content verified: ${lessons.length} days; ${soloLessons.length} solo lessons; 96 distinct dialogues; ${soloLessons.reduce((n,l)=>n+l.comprehensionQuestions.length,0)} questions; 128 sentence exercises; 80 speaking tasks; 8 teacher plans; 4 reviews.`);
