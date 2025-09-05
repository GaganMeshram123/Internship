import React, { useState } from 'react';
import { useInteractions } from './InteractionsContext';

interface StudentDetailsMap {
  [studentId: string]: {
    firstName?: string;
    lastName?: string;
    email?: string;
    name?: string;
  };
}

function Histogram({ title, data, unit, hideTitle = false }: { title: string; data?: Record<string, number>; unit?: string; hideTitle?: boolean }) {
  if (!data || Object.keys(data).length === 0) return null;
  const entries = Object.entries(data).sort((a, b) => Number(a[0]) - Number(b[0]));
  const max = Math.max(...entries.map(([, v]) => v));
  return (
    <div className="space-y-1">
      {!hideTitle && <div className="text-xs text-gray-500">{title}</div>}
      <div className="space-y-1">
        {entries.map(([k, v]) => (
          <div key={k} className="flex items-center gap-2 text-xs">
            <div className="w-16 text-gray-600">{k}{unit ? ` ${unit}` : ''}</div>
            <div className="flex-1 bg-gray-100 rounded h-2 overflow-hidden">
              <div className="bg-indigo-500 h-2" style={{ width: `${(v / max) * 100}%` }} />
            </div>
            <div className="w-8 text-right text-gray-700">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerticalBarChart({ title, data }: { title: string; data?: Record<string, number> }) {
  if (!data || Object.keys(data).length === 0) return null;
  const entries = Object.entries(data)
    .map(([k, v]) => [Number(k), v] as [number, number])
    .filter(([k]) => !isNaN(k))
    .sort((a, b) => a[0] - b[0]);
  const max = Math.max(...entries.map(([, v]) => v));
  return (
    <div>
      <div className="text-sm font-semibold text-center mb-2">{title}</div>
      <div className="flex justify-left gap-3">
        {/* Y-axis label */}
        <div className="h-40 flex items-center">
          <div className="text-[11px] text-gray-700 -rotate-90 whitespace-nowrap">number of students</div>
        </div>
        {/* Bars */}
        <div className="flex items-end justify-left gap-4">
          {entries.map(([k, v]) => {
            const pct = max > 0 ? Math.max(1, Math.round((v / max) * 100)) : 0; // ensure min visible
            return (
              <div key={k} className="flex flex-col items-center">
                <div className="text-[11px] text-gray-700 mb-1 leading-none">{v}</div>
                <div className="relative h-40 w-6 bg-gray-200 rounded overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 bg-indigo-500" style={{ height: `${pct}%` }} />
                </div>
                <div className="text-[11px] text-gray-700 mt-1 leading-none">{k}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* X-axis label */}
      <div className="text-[11px] text-gray-700 text-center mt-2">student attempts</div>
    </div>
  );
}

function toCumulativeAtLeast(hist: Record<string, number>): Record<string, number> {
  // Build continuous cumulative counts for keys 1..maxK
  const exact: Record<number, number> = {};
  let maxK = 0;
  for (const [k, v] of Object.entries(hist)) {
    const n = Number(k);
    if (!isNaN(n)) {
      exact[n] = v;
      if (n > maxK) maxK = n;
    }
  }
  const out: Record<string, number> = {};
  for (let i = 1; i <= maxK; i++) {
    let sum = 0;
    for (let j = i; j <= maxK; j++) sum += exact[j] || 0;
    out[String(i)] = sum;
  }
  return out;
}

function computeAccuracyByAttempt(entries: any[]): Record<string, number> {
  // Group by student, sort by timestamp, then compute accuracy per attempt index
  const byStudent: Record<string, any[]> = {};
  for (const e of entries) {
    (byStudent[e.studentId] = byStudent[e.studentId] || []).push(e);
  }
  const perAttempt: { correct: number; total: number }[] = [];
  for (const arr of Object.values(byStudent)) {
    const sorted = [...arr].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
    sorted.forEach((e, idx) => {
      if (!perAttempt[idx]) perAttempt[idx] = { correct: 0, total: 0 };
      if (e.isCorrect === true) perAttempt[idx].correct += 1;
      if (e.isCorrect === true || e.isCorrect === false) perAttempt[idx].total += 1;
    });
  }
  const result: Record<string, number> = {};
  perAttempt.forEach((row, idx) => {
    const pct = row.total > 0 ? Math.round((row.correct / row.total) * 100) : 0;
    result[String(idx + 1)] = pct;
  });
  return result;
}

const renderValueCell = (v: any) => {
  if (v === null) return 'null';
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
};

function isMatchingValue(v: any): v is Array<{ key: string; value: string }> {
  return Array.isArray(v) && v.every(item => item && typeof item.key !== 'undefined' && typeof item.value !== 'undefined');
}

function AccuracyBarList({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data).sort((a, b) => Number(a[0]) - Number(b[0]));
  return (
    <div>
      <div className="text-sm font-semibold text-center mb-2">Accuracy by attempt</div>
      <div className="space-y-1">
        {entries.map(([k, v]) => {
          const color = v < 50 ? 'bg-red-500' : v <= 80 ? 'bg-yellow-500' : 'bg-green-500';
          return (
            <div key={k} className="flex items-center gap-2 text-xs">
              <span className="w-20 text-gray-600">Attempt {k}</span>
              <div className="flex-1 bg-gray-100 rounded h-2 overflow-hidden">
                <div className={`${color} h-2`} style={{ width: `${Math.max(0, Math.min(100, v))}%` }} />
              </div>
              <span className="w-10 text-right font-semibold">{v}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VerticalAccuracyChart({ title, data }: { title: string; data: Record<string, number> }) {
  const entries = Object.entries(data).sort((a, b) => Number(a[0]) - Number(b[0]));
  return (
    <div className="items-center">
      <div className="text-sm font-semibold text-center mb-2">{title}</div>
      <div className="flex items-left justify-left gap-3">
        {/* Y-axis label */}
        <div className="h-40 flex items-center">
          <div className="text-[11px] text-gray-700 -rotate-90 whitespace-nowrap">accuracy (%)</div>
        </div>
        {/* Bars */}
        <div className="flex items-end justify-center gap-4">
          {entries.map(([k, v]) => {
            const pct = Math.max(1, Math.min(100, Math.round(v)));
            const color = v < 50 ? 'bg-red-500' : v <= 80 ? 'bg-yellow-500' : 'bg-green-500';
            return (
              <div key={k} className="flex flex-col items-center">
                <div className="text-[11px] text-gray-700 mb-1 leading-none">{v}%</div>
                <div className="relative h-40 w-6 bg-gray-200 rounded overflow-hidden">
                  <div className={`absolute bottom-0 left-0 right-0 ${color}`} style={{ height: `${pct}%` }} />
                </div>
                <div className="text-[11px] text-gray-700 mt-1 leading-none">{k}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* X-axis label */}
      <div className="text-[11px] text-gray-700 text-center mt-2">attempt</div>
    </div>
  );
}

function VerticalCategoryBarChart({ title, pairs }: { title: string; pairs: Array<[string, number]> }) {
  if (!pairs || pairs.length === 0) return null;
  const max = Math.max(1, ...pairs.map(([, v]) => v));
  return (
    <div className="items-center">
      <div className="text-sm font-semibold text-center mb-2">{title}</div>
      <div className="flex items-end justify-center gap-4">
        {pairs.map(([label, value]) => {
          const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
          return (
            <div key={label} className="flex flex-col items-center">
              <div className="text-[11px] text-gray-700 mb-1 leading-none">{value}</div>
              <div className="relative h-40 w-6 bg-gray-100 rounded border border-gray-200 overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-indigo-500" style={{ height: `${pct}%` }} />
              </div>
              <div className="text-[11px] text-gray-700 mt-1 leading-tight text-center max-w-[3rem] break-words">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function buildNumericBuckets(values: number[]): Array<[string, number]> {
  const nums = values.filter((v) => typeof v === 'number' && !isNaN(v));
  if (nums.length === 0) return [];
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  if (min === max) return [[String(Math.round(min)), nums.length]];
  // Sturges' rule: bins = ceil(log2(n)) + 1, clamped to [4, 10]
  const suggested = Math.ceil(Math.log2(nums.length)) + 1;
  const bins = Math.max(4, Math.min(10, suggested));
  const width = (max - min) / bins;
  const edges: number[] = [];
  for (let i = 0; i <= bins; i++) edges.push(min + i * width);
  const counts = new Array(bins).fill(0);
  for (const v of nums) {
    let idx = Math.floor((v - min) / width);
    if (idx >= bins) idx = bins - 1; // include max in last bin
    counts[idx] += 1;
  }
  const pairs: Array<[string, number]> = [];
  for (let i = 0; i < bins; i++) {
    const a = edges[i];
    const b = edges[i + 1];
    const label = `${Math.round(a)}–${Math.round(b)}${i === bins - 1 ? '' : ''}`;
    pairs.push([label, counts[i]]);
  }
  return pairs;
}

function buildDiscretePairs(values: any[]): Array<[string, number]> {
  const counts: Record<string, number> = {};
  for (const v of values) {
    const key = v === null ? 'null' : String(v);
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

// New: AttemptsModal overlay
function AttemptsModal({ onClose, entries, labelForStudent }: { onClose: () => void; entries: any[]; labelForStudent: (id: string) => string }) {
  // Group by student
  const grouped = Object.entries(entries.reduce((acc: any, e: any) => {
    (acc[e.studentId] = acc[e.studentId] || []).push(e);
    return acc;
  }, {}));

  // Sort each student's attempts by timestamp
  grouped.forEach(([, arr]: any) => arr.sort((a: any, b: any) => (a.timestamp || 0) - (b.timestamp || 0)));

  // Sort students by display name ascending
  grouped.sort((a: any, b: any) => {
    const nameA = labelForStudent(a[0]) || '';
    const nameB = labelForStudent(b[0]) || '';
    return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
  });

  return (
    <div className="fixed inset-0 z-[1201] bg-black/60 flex items-center justify-center">
      <div className="bg-white text-gray-900 w-[92vw] max-w-4xl max-h-[85vh] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="text-sm font-semibold">Student attempts</div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-lg leading-none">✕</button>
        </div>
        <div className="p-4 overflow-y-auto space-y-4">
          {grouped.map(([studentId, attempts]: any) => (
            <div key={studentId} className="border border-gray-200 rounded-lg">
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-200 text-sm font-medium">
                {labelForStudent(studentId)}
              </div>
              <div className="p-3 space-y-3">
                {attempts.map((e: any, i: number) => (
                  <div key={i} className="border border-gray-200 rounded-md">
                    <div className="px-3 py-2 bg-white border-b border-gray-200 text-xs text-gray-600 flex items-center justify-between">
                      <div>Attempt {i + 1}</div>
                      <div>{e.isCorrect === true ? '✔ Correct' : e.isCorrect === false ? '✘ Incorrect' : ''}</div>
                    </div>
                    <div className="p-3 text-sm">
                      {isMatchingValue(e.value) ? (
                        <div>
                          <div className="text-xs text-gray-500 mb-2">Matching</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {e.value.map((pair: any, idx2: number) => (
                              <div key={idx2} className="flex items-start gap-2 bg-gray-50 rounded p-2 border border-gray-200">
                                <div className="flex-1">
                                  <div className="text-gray-600 text-xs">Item</div>
                                  <div className="font-medium">{pair.key ?? 'null'}</div>
                                </div>
                                <div className="flex-1">
                                  <div className="text-gray-600 text-xs">Matched as</div>
                                  <div className="font-medium">{pair.value ?? 'null'}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>{renderValueCell(e.value)}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const SlideAnalyticsModal: React.FC<{
  slideId: string;
  slideTitle?: string;
  onClose: () => void;
  studentDetails?: StudentDetailsMap;
}> = ({ slideId, slideTitle, onClose, studentDetails }) => {
  const { getSlideSummary, interactionsBySlide, getStats, getJudgingGroups } = useInteractions();
  const summary = getSlideSummary(slideId);
  const interactions = interactionsBySlide[slideId] || {};
  const interactionIds = Object.keys(interactions).sort();
  // Order: judging first, then learning
  const orderedInteractionIds = interactionIds.slice().sort((a, b) => {
    const sa = getStats(slideId, a);
    const sb = getStats(slideId, b);
    const ja = typeof sa.accuracyPct === 'number';
    const jb = typeof sb.accuracyPct === 'number';
    if (ja === jb) return 0;
    return ja ? -1 : 1;
  });

  const labelForStudent = (studentId: string) => {
    const d = studentDetails?.[studentId];
    if (!d) return studentId;
    return d.name || `${d.firstName || ''} ${d.lastName || ''}`.trim() || d.email || studentId;
  };

  // Convert avg time (ms) to seconds and label appropriately
  const avgTimeSec = summary.timeSpent.avg ? Math.round(summary.timeSpent.avg / 1000) : null;

  return (
    <div className="fixed inset-0 z-[1100] bg-black/50 flex items-center justify-center">
      <div className="bg-white text-gray-900 w-[96vw] max-w-7xl h-[90vh] rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500">Slide</div>
            <div className="text-lg font-semibold">{slideTitle || summary.slideTitle || slideId}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-3 items-center">
              <div className="px-3 py-1 rounded bg-gray-100 border border-gray-200 text-sm">Participants: <span className="font-semibold">{summary.participants}</span></div>
              <div className="px-3 py-1 rounded bg-gray-100 border border-gray-200 text-sm">Average time spent: <span className="font-semibold">{avgTimeSec != null ? `${avgTimeSec}s` : '-'}</span></div>
              <div className="px-3 py-1 rounded bg-gray-100 border border-gray-200 text-sm">Interactions: <span className="font-semibold">{summary.interactionIds.length}</span></div>
            </div>
            {/* Replace Close with X */}
            <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-lg leading-none">✕</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
          {interactionIds.length === 0 ? (
            <div className="text-gray-600">No interactions recorded on this slide.</div>
          ) : (
            orderedInteractionIds.map((id) => {
              const stats = getStats(slideId, id);
              const acc = stats.accuracyPct;
              const isJudging = typeof acc === 'number';

              if (isJudging) {
                const groups = getJudgingGroups(slideId, id);
                return (
                  <div key={id} className="border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">{id}</div>
                        <div className="text-xs text-gray-500">Accuracy: {acc}% • Attempts: {stats.count}</div>
                      </div>
                    </div>

                    <div className="p-4 space-y-6">
                      {groups.map((g, idx) => {
                        const [modalOpen, setModalOpen] = useState(false);
                        let options: string[] | undefined = (g.entries[0]?.question?.options as string[] | undefined) || undefined;
                        if ((!options || options.length === 0) && g.entries[0]?.question?.type === 'mcq') {
                          options = ['A', 'B', 'C', 'D'];
                        }
                        let optionHist: Record<string, number> | undefined;
                        if (g.optionDistribution) {
                          const dist = g.optionDistribution;
                          if (options && options.length > 0) {
                            // include ALL options, even zero counts, in given order; append extras
                            const full: Record<string, number> = {};
                            for (const opt of options) full[opt] = dist[opt] || 0;
                            for (const [k, v] of Object.entries(dist)) {
                              if (!options.includes(k)) full[k] = v;
                            }
                            optionHist = full;
                          } else {
                            optionHist = dist;
                          }
                        }

                        const cumulativeAttempts = toCumulativeAtLeast(g.attemptsHistogram);
                        const perAttemptAccuracy = computeAccuracyByAttempt(g.entries);

                        return (
                          <div key={idx} className="border border-gray-200 rounded-xl">
                            <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
                              <div className="text-sm font-semibold">{g.questionText}</div>
                              <div className="flex items-center gap-3">
                                <div className="text-xs text-gray-500">Accuracy: <span className="font-semibold">{g.stats.accuracyPct ?? '-'}%</span> • Attempts: <span className="font-semibold">{g.stats.count}</span></div>
                                <button onClick={() => setModalOpen(true)} className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md">Show attempts ({g.entries.length})</button>
                              </div>
                            </div>
                            {/* For MCQ/Multiselect: show options directly under the question */}
                            {((g.entries[0]?.question?.type === 'mcq') || (g.entries[0]?.question?.type === 'multiselect')) && options && options.length > 0 && (
                              <div className="px-4 pt-2 pb-3 bg-white border-b border-gray-200">
                                <div className="flex flex-wrap gap-2">
                                  {options.map((o, i) => {
                                    const letter = String.fromCharCode(65 + (i % 26));
                                    return (
                                      <span key={o} className="text-xs px-2 py-1 bg-gray-100 rounded border border-gray-200">
                                        <span className="font-semibold mr-1">{letter}.</span>{o}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Three-column layout: left question/meta, center student attempts, right accuracy */}
                            <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:divide-x lg:divide-gray-200">
                              {/* Left: question meta */}
                              <div className="col-span-1 space-y-3">
                                {(!options || options.length === 0) && g.entries[0]?.question?.type === 'matching' && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:divide-x sm:divide-gray-200">
                                    {Array.isArray(g.entries[0]?.question?.matching?.left) && g.entries[0]?.question?.matching?.left.length > 0 && (
                                      <div>
                                        <div className="text-xs text-gray-500 mb-1">Items</div>
                                        <div className="flex flex-wrap gap-2">
                                          {g.entries[0]?.question?.matching?.left?.map((item: string, i: number) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded border border-gray-200">{item}</span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    {Array.isArray(g.entries[0]?.question?.matching?.right) && g.entries[0]?.question?.matching?.right.length > 0 && (
                                      <div className="sm:pl-4">
                                        <div className="text-xs text-gray-500 mb-1">Categories</div>
                                        <div className="flex flex-wrap gap-2">
                                          {g.entries[0]?.question?.matching?.right?.map((cat: string, i: number) => (
                                            <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded border border-gray-200">{cat}</span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                                {optionHist && (
                                  <VerticalCategoryBarChart
                                    title="Options selected (count)"
                                    pairs={(() => {
                                      // Preserve order: if options provided, use that order first
                                      if (options && options.length > 0) {
                                        const ordered: Array<[string, number]> = options.map((o, i) => [String.fromCharCode(65 + (i % 26)), optionHist![o] || 0]);
                                        // Append extras not in options
                                        for (const [k, v] of Object.entries(optionHist!)) if (!options.includes(k)) ordered.push([k, v]);
                                        return ordered;
                                      }
                                      return Object.entries(optionHist!);
                                    })()}
                                  />
                                )}
                                {g.numericDistribution && (
                                  <Histogram title="Answers (count)" data={g.numericDistribution} />
                                )}
                              </div>

                              {/* Center: student attempts cumulative */}
                              <div className="col-span-1 items-center">
                                <VerticalBarChart title="student attempts" data={cumulativeAttempts} />
                              </div>

                              {/* Right: accuracy by attempt (color coded) */}
                              <div className="col-span-1 items-center">
                                <VerticalAccuracyChart title="accuracy by attempt" data={perAttemptAccuracy} />
                              </div>
                            </div>

                            {modalOpen && (
                              <AttemptsModal onClose={() => setModalOpen(false)} entries={g.entries} labelForStudent={labelForStudent} />)
                            }
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // Case 2: Learning
              const entries = interactions[id] || [];
              const attemptsCount = stats.count;
              const values = entries.map((e: any) => e.value);
              const isNumericValues = values.length > 0 && values.every((v: any) => typeof v === 'number');
              const valuePairs = isNumericValues ? buildNumericBuckets(values as number[]) : buildDiscretePairs(values);
              return (
                <div key={id} className="border border-gray-200 rounded-2xl overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">{id} (Learning)</div>
                      <div className="text-xs text-gray-500">Attempts: {attemptsCount}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <VerticalCategoryBarChart title="value distribution (count)" pairs={valuePairs} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}; 


// Adding a default export component to fix Next.js build error
const SlideAnalyticsModalComponent: React.FC = () => {
  return (
    <div>
      <h1>Slide Analytics Modal</h1>
      <p>This is a analytics modal component for slide management.</p>
    </div>
  );
};

export default SlideAnalyticsModalComponent; 