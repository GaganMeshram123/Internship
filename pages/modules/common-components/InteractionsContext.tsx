import React, { createContext, useContext, useMemo } from 'react';

export interface InteractionEntry {
  studentId: string;
  value: any;
  timestamp?: number;
  isCorrect?: boolean;
  responseTime?: number; // ms
  raw?: any;
  question?: { type?: string; question?: string; options?: string[]; matching?: { left?: string[]; right?: string[] } };
}

interface SlideSummary {
  participants: number;
  timeSpent: {
    count: number;
    avg?: number;
    min?: number;
    max?: number;
  };
  interactionIds: string[];
  slideTitle?: string;
}

interface StatsResult {
  type: 'number' | 'boolean' | 'string' | 'mixed' | 'empty';
  count: number; // number of entries (attempts)
  // Value distributions
  min?: number;
  max?: number;
  avg?: number;
  histogram?: Record<string, number>;
  true?: number;
  false?: number;
  top?: Array<{ value: string; freq: number }>;
  // Judging metrics
  correct?: number;
  incorrect?: number;
  accuracyPct?: number;
  // Response time metrics
  rt?: {
    count: number;
    avg?: number;
    min?: number;
    max?: number;
    histogram?: Record<string, number>; // bucketed ms
  }
}

interface JudgingGroup {
  interactionId: string;
  questionText: string;
  entries: InteractionEntry[];
  stats: StatsResult;
  optionDistribution?: Record<string, number>;
  numericDistribution?: Record<string, number>;
  attemptsHistogram: Record<string, number>; // attempts count per student frequency
}

interface InteractionsContextValue {
  moduleId?: string;
  submoduleId?: string;
  // Map slideId -> interactionId -> entries (flattened attempts)
  interactionsBySlide: Record<string, Record<string, InteractionEntry[]>>;
  getInteractionIdsForSlide: (slideId: string) => string[];
  getStats: (slideId: string, interactionId: string) => StatsResult;
  getSlideSummary: (slideId: string) => SlideSummary;
  // Judging analytics
  getJudgingGroups: (slideId: string, interactionId: string) => JudgingGroup[];
  // Selector bindings per slide
  getBoundInteractionForSelector: (slideId: string, selector: string) => string | null;
  bindSelectorToInteraction: (slideId: string, selector: string, interactionId: string) => void;
}

const InteractionsContext = createContext<InteractionsContextValue | null>(null);

export function useInteractions(): InteractionsContextValue {
  const ctx = useContext(InteractionsContext);
  if (!ctx) throw new Error('useInteractions must be used within InteractionsProvider');
  return ctx;
}

function safeParseJSON(value: any): any | null {
  if (typeof value !== 'string') return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function asArrayLike(obj: any): any[] | null {
  if (!obj || typeof obj !== 'object') return null;
  if (Array.isArray(obj)) return obj;
  // object with numeric keys
  const keys = Object.keys(obj);
  if (keys.length > 0 && keys.every(k => /^\d+$/.test(k))) {
    return keys.sort((a, b) => Number(a) - Number(b)).map(k => obj[k]);
  }
  return null;
}

function extractAttempts(interactionNode: any): InteractionEntry[] {
  const entries: InteractionEntry[] = [];
  const arr = asArrayLike(interactionNode);
  const nodes = arr || [interactionNode];
  for (const node of nodes) {
    const topIsCorrect = typeof node?.isCorrect === 'boolean' ? node.isCorrect : undefined;
    const topTimestamp = typeof node?.timestamp === 'number' ? node.timestamp : undefined;
    const rawValue = node?.value ?? node;
    const parsed = safeParseJSON(rawValue);
    const sr = parsed?.quiz?.student_response || parsed?.student_response || null;
    const attempt: InteractionEntry = {
      studentId: '', // will be filled by caller
      value: sr?.selectedText ?? sr?.selectedAnswer ?? parsed?.quiz?.question ?? rawValue,
      timestamp: topTimestamp || (typeof sr?.responseTime === 'number' ? sr.responseTime : undefined),
      isCorrect: typeof sr?.isCorrect === 'boolean' ? sr.isCorrect : topIsCorrect,
      responseTime: typeof sr?.responseTime === 'number' ? sr.responseTime : undefined,
      raw: node,
      question: node?.question || undefined
    };
    entries.push(attempt);
  }
  return entries;
}

function buildIndex(interactionsData: any[]): Record<string, Record<string, InteractionEntry[]>> {
  const bySlide: Record<string, Record<string, InteractionEntry[]>> = {};
  for (const student of interactionsData || []) {
    const studentId = student.studentId;
    const slides = student.slides || {};
    for (const slideId of Object.keys(slides)) {
      const slide = (slides as any)[slideId] || {};
      const interactions = slide.interactions || {};
      for (const interactionId of Object.keys(interactions)) {
        const node = interactions[interactionId];
        const attempts = extractAttempts(node).map(a => ({ ...a, studentId }));
        if (!bySlide[slideId]) bySlide[slideId] = {};
        if (!bySlide[slideId][interactionId]) bySlide[slideId][interactionId] = [];
        bySlide[slideId][interactionId].push(...attempts);
      }
    }
  }
  return bySlide;
}

function computeStats(entries: InteractionEntry[]): StatsResult {
  const result: StatsResult = { type: 'empty', count: 0 };
  const count = entries.length;
  result.count = count;
  if (count === 0) return result;

  // Correctness
  const correct = entries.filter(e => e.isCorrect === true).length;
  const incorrect = entries.filter(e => e.isCorrect === false).length;
  if (correct + incorrect > 0) {
    result.correct = correct;
    result.incorrect = incorrect;
    result.accuracyPct = Math.round((correct / (correct + incorrect)) * 100);
  }

  // Response time stats (ms)
  const rts = entries.map(e => e.responseTime).filter((rt): rt is number => typeof rt === 'number');
  if (rts.length > 0) {
    const rtMin = Math.min(...rts);
    const rtMax = Math.max(...rts);
    const rtAvg = rts.reduce((a, b) => a + b, 0) / rts.length;
    // bucket to nearest 1s (1000ms)
    const hist: Record<string, number> = {};
    for (const rt of rts) {
      const bucket = String(Math.round(rt / 1000));
      hist[bucket] = (hist[bucket] || 0) + 1;
    }
    result.rt = { count: rts.length, min: rtMin, max: rtMax, avg: rtAvg, histogram: hist };
  }

  // Value distribution
  const values = entries.map(e => e.value).filter(v => v !== undefined);
  if (values.length === 0) return result;
  const sample = values.find(v => v !== undefined);
  const t = typeof sample;
  if (t === 'number') {
    const nums = values as number[];
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
    const hist: Record<string, number> = {};
    for (const n of nums) {
      const k = String(Math.round(n));
      hist[k] = (hist[k] || 0) + 1;
    }
    return { ...result, type: 'number', min, max, avg, histogram: hist };
  }
  if (t === 'boolean') {
    const bools = values as boolean[];
    const tCount = bools.filter(Boolean).length;
    const fCount = bools.length - tCount;
    return { ...result, type: 'boolean', true: tCount, false: fCount };
  }
  // string-like buckets
  const buckets: Record<string, number> = {};
  for (const v of values) {
    const key = v === null ? 'null' : String(v);
    buckets[key] = (buckets[key] || 0) + 1;
  }
  const top = Object.entries(buckets)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([value, freq]) => ({ value, freq }));
  return { ...result, type: 'string', top, histogram: buckets };
}

function mappingStorageKey(moduleId?: string, submoduleId?: string, slideId?: string) {
  return `interaction-mapping:${moduleId || 'm'}:${submoduleId || 's'}:${slideId || 'slide'}`;
}

function getMappings(moduleId?: string, submoduleId?: string, slideId?: string): Record<string, string> {
  try {
    const raw = localStorage.getItem(mappingStorageKey(moduleId, submoduleId, slideId));
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

function setMappings(moduleId?: string, submoduleId?: string, slideId?: string, map?: Record<string, string>) {
  try {
    localStorage.setItem(mappingStorageKey(moduleId, submoduleId, slideId), JSON.stringify(map || {}));
  } catch {}
}

function makeSlideSummaries(interactionsData: any[]): Record<string, SlideSummary> {
  const summaries: Record<string, SlideSummary> = {};
  for (const student of interactionsData || []) {
    const slides = student.slides || {};
    for (const slideId of Object.keys(slides)) {
      const slide = slides[slideId] || {};
      const timeSpent = typeof slide.timeSpent === 'number' ? slide.timeSpent : undefined;
      const interactionIds = Object.keys(slide.interactions || {});
      if (!summaries[slideId]) {
        summaries[slideId] = {
          participants: 0,
          timeSpent: { count: 0 },
          interactionIds: [],
          slideTitle: slide.slideTitle,
        };
      }
      summaries[slideId].participants += 1;
      summaries[slideId].interactionIds = Array.from(new Set([...(summaries[slideId].interactionIds || []), ...interactionIds]));
      if (timeSpent !== undefined) {
        const s = summaries[slideId].timeSpent;
        s.count += 1;
        s.min = s.min === undefined ? timeSpent : Math.min(s.min, timeSpent);
        s.max = s.max === undefined ? timeSpent : Math.max(s.max, timeSpent);
        s.avg = ((s.avg || 0) * (s.count - 1) + timeSpent) / s.count;
      }
    }
  }
  return summaries;
}

function computeAttemptsHistogram(entries: InteractionEntry[]): Record<string, number> {
  const attemptsByStudent: Record<string, number> = {};
  for (const e of entries) {
    attemptsByStudent[e.studentId] = (attemptsByStudent[e.studentId] || 0) + 1;
  }
  const hist: Record<string, number> = {};
  for (const count of Object.values(attemptsByStudent)) {
    const key = String(count);
    hist[key] = (hist[key] || 0) + 1;
  }
  return hist;
}

function computeOptionDistribution(entries: InteractionEntry[], options?: string[] | null): Record<string, number> | undefined {
  // For mcq/multiselect treat value(s) as option ids; include 'null' bucket if value is null
  const dist: Record<string, number> = {};
  for (const e of entries) {
    const v = e.value;
    if (Array.isArray(v)) {
      for (const o of v) {
        const key = o == null ? 'null' : String(o);
        dist[key] = (dist[key] || 0) + 1;
      }
    } else {
      const key = v == null ? 'null' : String(v);
      dist[key] = (dist[key] || 0) + 1;
    }
  }
  return dist;
}

function groupByQuestion(entries: InteractionEntry[]): Record<string, InteractionEntry[]> {
  const groups: Record<string, InteractionEntry[]> = {};
  for (const e of entries) {
    const qt = (e.question && typeof e.question.question === 'string') ? e.question.question : 'Untitled question';
    if (!groups[qt]) groups[qt] = [];
    groups[qt].push(e);
  }
  return groups;
}

export const InteractionsProvider: React.FC<{
  moduleId?: string;
  submoduleId?: string;
  slideId?: string; // current slide for selector bindings
  interactionsData: any[];
  children: React.ReactNode;
}> = ({ moduleId, submoduleId, slideId, interactionsData, children }) => {
  const interactionsBySlide = useMemo(() => buildIndex(interactionsData), [interactionsData]);
  const slideSummaries = useMemo(() => makeSlideSummaries(interactionsData), [interactionsData]);

  const value = useMemo<InteractionsContextValue>(() => ({
    moduleId,
    submoduleId,
    interactionsBySlide,
    getInteractionIdsForSlide: (sId: string) => Object.keys(interactionsBySlide[sId] || {}),
    getStats: (sId: string, interactionId: string) => computeStats((interactionsBySlide[sId]?.[interactionId]) || []),
    getSlideSummary: (sId: string) => slideSummaries[sId] || { participants: 0, timeSpent: { count: 0 }, interactionIds: [] },
    getJudgingGroups: (sId: string, interactionId: string) => {
      const entries = (interactionsBySlide[sId]?.[interactionId]) || [];
      const grouped = groupByQuestion(entries);
      const groups: JudgingGroup[] = [];
      for (const [questionText, arrUnsorted] of Object.entries(grouped)) {
        const arr = [...arrUnsorted].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
        const stats = computeStats(arr);
        const qType = arr.find(e => e.question?.type)?.question?.type || undefined;
        let optionDistribution: Record<string, number> | undefined;
        let numericDistribution: Record<string, number> | undefined;
        if (qType === 'mcq' || qType === 'multiselect') {
          optionDistribution = computeOptionDistribution(arr, arr[0]?.question?.options || []);
        } else if (qType === 'integer') {
          numericDistribution = stats.histogram;
        }
        const attemptsHistogram = computeAttemptsHistogram(arr);
        groups.push({ interactionId, questionText, entries: arr, stats, optionDistribution, numericDistribution, attemptsHistogram });
      }
      return groups;
    },
    getBoundInteractionForSelector: (sId: string, selector: string) => {
      const map = getMappings(moduleId, submoduleId, sId);
      return map[selector] || null;
    },
    bindSelectorToInteraction: (sId: string, selector: string, interactionId: string) => {
      const map = getMappings(moduleId, submoduleId, sId);
      map[selector] = interactionId;
      setMappings(moduleId, submoduleId, sId, map);
    }
  }), [moduleId, submoduleId, interactionsBySlide, slideSummaries]);

  return (
    <InteractionsContext.Provider value={value}>
      {children}
    </InteractionsContext.Provider>
  );
}; 

// Adding a default export component to fix Next.js build error
const InteractionsContextComponent: React.FC = () => {
  return (
    <div>
      <h1>Interactions Context</h1>
      <p>This is a interactions context component for slide management.</p>
    </div>
  );
};

export default InteractionsContextComponent; 