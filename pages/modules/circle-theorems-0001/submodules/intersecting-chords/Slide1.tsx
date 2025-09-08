import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function IntersectingChordsSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: circle, 2: chords, 3: intersection, 4: segments, 5: product

  const slideInteractions: Interaction[] = [
    { id: 'ct-intersecting-chords-concept', conceptId: 'ct-intersecting-chords', conceptName: 'Intersecting Chords Concept', type: 'learning', description: 'Understanding the intersecting chords theorem' },
    { id: 'ct-chord-product-theorem', conceptId: 'ct-chord-product-theorem', conceptName: 'Chord Product Theorem', type: 'learning', description: 'Understanding the product relationship in intersecting chords' }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Use well-spaced points for a clear intersection
  const angleA = 0.8, angleC = 3.6;
  const angleB = 2.1, angleD = 5.1;
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const Cx = cx + r * Math.cos(angleC), Cy = cy + r * Math.sin(angleC);
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  const Dx = cx + r * Math.cos(angleD), Dy = cy + r * Math.sin(angleD);
  
  // Calculate actual intersection point E of chords AC and BD
  // Line AC: (x - Ax) / (Cx - Ax) = (y - Ay) / (Cy - Ay)
  // Line BD: (x - Bx) / (Dx - Bx) = (y - By) / (Dy - By)
  const dAC_x = Cx - Ax, dAC_y = Cy - Ay;
  const dBD_x = Dx - Bx, dBD_y = Dy - By;
  
  // Solve for intersection using parametric form
  // AC: P = A + t * (C - A)
  // BD: P = B + s * (D - B)
  // A + t * (C - A) = B + s * (D - B)
  const det = dAC_x * dBD_y - dAC_y * dBD_x;
  const t = ((Bx - Ax) * dBD_y - (By - Ay) * dBD_x) / det;
  
  const Ex = Ax + t * dAC_x;
  const Ey = Ay + t * dAC_y;

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem:</h3>
                  <p>When two chords intersect inside a circle, the products of their segments are equal.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Formula:</h3>
                  <p className="font-bold text-center text-xl">AE × EC = BE × ED</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
    <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Key Insights</h2>
    
    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-4">
      <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Segment Products:</h3>
      <p>Each chord is divided into two segments by the intersection point, and the products of opposite segments are always equal.</p>
    </div>
    
    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
      <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Universal Property:</h3>
      <p>This relationship holds regardless of chord lengths or intersection position within the circle.</p>
    </div>
  </div>
</TrackedInteraction>

        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto">
              {step >= 1 && (
                <g>
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" className="animate-[draw_1s_ease-in-out]" />
                  <circle cx={cx} cy={cy} r="3" fill="#374151" />
                  <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="12" fontWeight="bold">O</text>
                </g>
              )}
              {step >= 2 && (
                <g>
                  <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke="#3B82F6" strokeWidth="3" className="animate-[draw_1s_ease-in-out]" />
                  <line x1={Bx} y1={By} x2={Dx} y2={Dy} stroke="#10B981" strokeWidth="3" className="animate-[draw_1s_ease-in-out]" />
                  <circle cx={Ax} cy={Ay} r="3" fill="#3B82F6" />
                  <circle cx={Cx} cy={Cy} r="3" fill="#3B82F6" />
                  <circle cx={Bx} cy={By} r="3" fill="#10B981" />
                  <circle cx={Dx} cy={Dy} r="3" fill="#10B981" />
                  <text x={Ax + (Ax > cx ? 10 : -20)} y={Ay + (Ay > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">A</text>
                  <text x={Cx + (Cx > cx ? 10 : -20)} y={Cy + (Cy > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">C</text>
                  <text x={Bx + (Bx > cx ? 10 : -20)} y={By + (By > cy ? 18 : -8)} fill="#10B981" fontSize="14" fontWeight="bold">B</text>
                  <text x={Dx + (Dx > cx ? 10 : -20)} y={Dy + (Dy > cy ? 18 : -8)} fill="#10B981" fontSize="14" fontWeight="bold">D</text>
                </g>
              )}
              {step >= 3 && (
                <g>
                  <circle cx={Ex} cy={Ey} r="5" fill="#F59E0B" className="animate-pulse" />
                  <text x={Ex + 10} y={Ey - 10} fill="#F59E0B" fontSize="16" fontWeight="bold">E</text>
                  <text x={Ex - 30} y={Ey - 20} fill="#F59E0B" fontSize="12" fontWeight="bold">Intersection</text>
                </g>
              )}
              {step >= 4 && (
                <g>
                  <text x={(Ax + Ex) / 2 - 24} y={(Ay + Ey) / 2 - 24} fill="#8B5CF6" fontSize="12" fontWeight="bold">AE</text>
                  <text x={(Ex + Cx) / 2 + 24} y={(Ey + Cy) / 2 + 24} fill="#8B5CF6" fontSize="12" fontWeight="bold">EC</text>
                  <text x={(Bx + Ex) / 2 - 30} y={(By + Ey) / 2 + 16} fill="#F59E0B" fontSize="12" fontWeight="bold">BE</text>
                  <text x={(Ex + Dx) / 2 + 30} y={(Ey + Dy) / 2 - 16} fill="#F59E0B" fontSize="12" fontWeight="bold">ED</text>
                  {/* Tick marks for AE, EC, BE, ED */}
                  {(() => {
                    // Helper for tick
                    function tick(x1: number, y1: number, x2: number, y2: number, len = 10) {
                      const mx = (x1 + x2) / 2;
                      const my = (y1 + y2) / 2;
                      const dx = x2 - x1, dy = y2 - y1;
                      const norm = Math.sqrt(dx * dx + dy * dy);
                      const px = -dy / norm, py = dx / norm; // perpendicular
                      return (
                        <line x1={mx - px * len / 2} y1={my - py * len / 2} x2={mx + px * len / 2} y2={my + py * len / 2} stroke="#64748B" strokeWidth="2" />
                      );
                    }
                    return <>
                      {tick(Ax, Ay, Ex, Ey)}
                      {tick(Ex, Ey, Cx, Cy)}
                      {tick(Bx, By, Ex, Ey)}
                      {tick(Ex, Ey, Dx, Dy)}
                    </>;
                  })()}
                </g>
              )}
              {step >= 5 && (
                <g>
                  <rect x="50" y="320" width="300" height="40" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" rx="10" className="animate-[fade-in_1s_ease-in-out]" />
                  <text x="200" y="345" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold" className="animate-pulse">
                    AE × EC = BE × ED
                  </text>
                </g>
              )}
            </svg>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium disabled:opacity-50"
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
              >Previous</button>
              <button
                className="px-4 py-2 rounded bg-indigo-600 text-white font-medium disabled:opacity-50"
                onClick={() => setStep(s => Math.min(5, s + 1))}
                disabled={step === 5}
              >Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper slideId="ct-intersecting-chords-theorem-statement" slideTitle="Intersecting Chords Theorem" moduleId="circle-theorems-0001" submoduleId="intersecting-chords" interactions={localInteractions}>
      {slideContent}
    </SlideComponentWrapper>
  );
} 