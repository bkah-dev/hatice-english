import test from 'node:test';
import assert from 'node:assert/strict';
import {freshProgress,freshLesson,scheduleReview,validProgress,localDay} from '../src/storage';
import {lessons} from '../src/curriculum';
import {validateContent} from '../scripts/validate-content';

test('content validator rejects missing dialogue, answer key, homework and broken review link',()=>{
  for(const corrupt of [(d:typeof lessons)=>{d[0].dialogues=[];},(d:typeof lessons)=>{d[0].comprehensionQuestions[0].answer=99;},(d:typeof lessons)=>{d[0].homework.prompt='';},(d:typeof lessons)=>{d[0].reviewItems[0].lessonId='missing';}]){const data=structuredClone(lessons);corrupt(data);assert.throws(()=>validateContent(data));}
});
test('backup accepts actual progress and rejects malformed nested structures',()=>{
  const progress=freshProgress();progress.lessons['w1-d1']=freshLesson();assert(validProgress(progress));
  for(const bad of [null,{}, {...progress,version:2},{...progress,lessons:{'w1-d1':null}},{...progress,review:[{}]},{...progress,notes:[{text:123}]},{...progress,lessons:{'w1-d1':{...freshLesson(),drafts:{homework:42}}}}])assert.equal(validProgress(bad),false);
});
test('spaced retrieval grows intervals and resets forgotten cards',()=>{
  let card={id:'w1-d1:0',lessonId:'w1-d1',phrase:0,due:localDay(),interval:0,successes:0};
  for(const interval of [1,3,7,14,28,30]){card=scheduleReview(card,true);assert.equal(card.interval,interval);assert(card.due>localDay());}
  card=scheduleReview(card,false);assert.equal(card.interval,1);assert.equal(card.successes,0);
});
