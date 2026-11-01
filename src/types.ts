export type Phrase = { en: string; tr: string };
export type Dialogue = { title: string; gist: string; lines: { speaker: string; en: string; tr: string }[] };
export type Question = { type: 'gist' | 'detail' | 'truefalse' | 'meaning' | 'match'; prompt: string; options: string[]; answer: number; explanation: string; dialogue: number; evidence: string; reviewPhrase: number };
export type Exercise = { type: 'order' | 'gap' | 'personal' | 'combine'; prompt: string; answer: string; hint: string; explanation: string; alternatives?: string[] };
export type SpeakingTask = { prompt: string; scaffold: string; success: string };
export type Lesson = {
  id: string; week: number; day: number; kind: 'solo' | 'partner' | 'review'; level: string; title: string; subtitle: string;
  learningObjectives: string[]; corePhrases: Phrase[]; vocabulary: Phrase[]; dialogues: Dialogue[];
  comprehensionQuestions: Question[]; sentenceExercises: Exercise[]; speakingTasks: SpeakingTask[];
  homework: { prompt: string; count: string; criteria: string[] }; reviewItems: { lessonId: string; phrase: number; prompt: string }[];
  estimatedDuration: number; teacherNotes: string; sources: string[]; grammar: string; bonus: string[];
};
export type TeacherPlan = { lessonId: string; title: string; warmup: string[]; phases: { minutes: number; title: string; instructions: string[] }[]; roleplay: { situation: string; turns: string[]; sample: string[] }; rescue: string[]; stretch: string[]; assessment: string[]; feedback: string };
