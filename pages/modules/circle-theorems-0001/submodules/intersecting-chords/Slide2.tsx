import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function IntersectingChordsSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: similar triangles, 3: proportions, 4: conclusion

  const slideInteractions: Interaction[] = [
    { id: 'ct-intersecting-chords-proof', conceptId: 'ct-intersecting-chords-proof', conceptName: 'Intersecting Chords Proof', type: 'learning', description: 'Understanding the proof of intersecting chords theorem' },
    { id: 'ct-similar-triangles', conceptId: 'ct-similar-triangles', conceptName: 'Similar Triangles', type: 'learning', description: 'Using similar triangles in the proof' },
    { id: 'ct-intersecting-chords-conclusion', conceptId: 'ct-intersecting-chords-conclusion', conceptName: 'Intersecting Chords Conclusion', type: 'learning', description: 'Conclusion of intersecting chords proof' }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Use well-spaced points for a clear intersection (same as Slide1)
  const angleA = 0.8, angleC = 3.6;
  const angleB = 2.1, angleD = 5.1;
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const Cx = cx + r * Math.cos(angleC), Cy = cy + r * Math.sin(angleC);
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  const Dx = cx + r * Math.cos(angleD), Dy = cy + r * Math.sin(angleD);

  // Calculate actual intersection point E of chords AC and BD (same as Slide1)
  const dAC_x = Cx - Ax, dAC_y = Cy - Ay;
  const dBD_x = Dx - Bx, dBD_y = Dy - By;
  const det = dAC_x * dBD_y - dAC_y * dBD_x;
  const t = ((Bx - Ax) * dBD_y - (By - Ay) * dBD_x) / det;
  const Ex = Ax + t * dAC_x;
  const Ey = Ay + t * dAC_y;

  const steps = [
    { title: "Introduction", description: "Click 'Next' to begin the proof of the Intersecting Chords Theorem." },
    { title: "Step 1: The Setup", description: "We start with two chords, AC and BD, that intersect at point E inside the circle." },
    { title: "Step 2: Similar Triangles", description: "By drawing the auxiliary lines AD and BC, we form two triangles, △AED and △CEB, which we will prove are similar." },
    { title: "Step 3: Proportional Sides", description: "Since the triangles are similar, their corresponding sides are proportional: AE/CE = ED/EB. This relationship leads directly to the theorem." },
    { title: "Step 4: The Conclusion", description: "By cross-multiplying the proportion, we get the final result: AE × EB = CE × ED." },
  ];
  
  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
       
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Strategy:</h3>
                  <p>Show that triangles △AED and △CEB are similar using angle-angle (AA) similarity.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Insight:</h3>
                  <p>Vertical angles and inscribed angles subtending the same arc are equal.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Angle Analysis</h2>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-4">
                <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Vertical Angles:</h3>
                <p>∠AED = ∠CEB (vertical angles at intersection E)</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Inscribed Angles:</h3>
                <p>∠EAD = ∠ECB (both subtend arc BD)</p>
                <p>∠EDA = ∠EBC (both subtend arc AC)</p>
              </div>
            </div>
          </TrackedInteraction>
          <TrackedInteraction interaction={slideInteractions[2]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Conclusion</h2>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Similar Triangles:</h3>
                <p>△AED ~ △CEB (AA similarity)</p>
                <p className="mt-2">Therefore: AE/CE = ED/EB</p>
                <p className="font-bold mt-2">Cross multiply: AE × EB = CE × ED</p>
              </div>
            </div>
          </TrackedInteraction>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            {/* Headline */}
            <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">Proof of the Intersecting Chords Theorem</h1>
            
            {/* Step Indicator and Dynamic Description */}
            <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <span className="font-semibold text-blue-600 dark:text-blue-400 text-lg">
                  Step {step + 1}
              </span>
              <span className="font-light">of {steps.length}</span>
              <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                      className="h-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 ease-out"
                      style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  />
              </div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-slate-700 rounded-xl shadow-inner border border-blue-100 dark:border-slate-600 mb-6">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 text-lg">{steps[step].title}</h4>
              <p className="text-slate-700 dark:text-slate-300 mt-2">{steps[step].description}</p>
            </div>
            
            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                ← Previous
              </button>
              <button
                className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
                disabled={step === steps.length - 1}
              >
                Next →
              </button>
            </div>
            
            {/* SVG Diagram */}
            <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto mt-6">
              {step >= 0 && (
                <g>
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
                  <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke="#3B82F6" strokeWidth="3" />
                  <line x1={Bx} y1={By} x2={Dx} y2={Dy} stroke="#10B981" strokeWidth="3" />
                  <circle cx={Ax} cy={Ay} r="4" fill="#3B82F6" />
                  <circle cx={Cx} cy={Cy} r="4" fill="#3B82F6" />
                  <circle cx={Bx} cy={By} r="4" fill="#10B981" />
                  <circle cx={Dx} cy={Dy} r="4" fill="#10B981" />
                  <circle cx={Ex} cy={Ey} r="4" fill="#F59E0B" />
                  <text x={Ax + (Ax > cx ? 10 : -20)} y={Ay + (Ay > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">A</text>
                  <text x={Cx + (Cx > cx ? 10 : -20)} y={Cy + (Cy > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">C</text>
                  <text x={Bx + (Bx > cx ? 10 : -20)} y={By + (By > cy ? 18 : -8)} fill="#10B981" fontSize="16" fontWeight="bold">B</text>
                  <text x={Dx + (Dx > cx ? 10 : -20)} y={Dy + (Dy > cy ? 18 : -8)} fill="#10B981" fontSize="16" fontWeight="bold">D</text>
                  <text x={Ex + 10} y={Ey - 10} fill="#F59E0B" fontSize="16" fontWeight="bold">E</text>
                </g>
              )}
              {step === 1 && (
                <g>
                  <polygon points={`${Ax},${Ay} ${Ex},${Ey} ${Dx},${Dy}`} fill="rgba(139, 92, 246, 0.18)" stroke="#8B5CF6" strokeWidth="2" />
                  <polygon points={`${Cx},${Cy} ${Ex},${Ey} ${Bx},${By}`} fill="rgba(245, 158, 11, 0.18)" stroke="#F59E0B" strokeWidth="2" />
                  <text x={(Ax + Ex + Dx) / 3} y={(Ay + Ey + Dy) / 3} fill="#8B5CF6" fontSize="12" fontWeight="bold">△AED</text>
                  <text x={(Cx + Ex + Bx) / 3} y={(Cy + Ey + By) / 3} fill="#F59E0B" fontSize="12" fontWeight="bold">△CEB</text>
                </g>
              )}
              {step === 2 && (
                <g>
                  <circle cx={Ex} cy={Ey} r="10" fill="none" stroke="#DC2626" strokeWidth="2" />
                  <text x={Ex + 12} y={Ey - 8} fill="#DC2626" fontSize="12" fontWeight="bold">Vertical</text>
                  <path d={`M ${Ax} ${Ay} L ${Bx} ${By}`} stroke="#F59E0B" strokeWidth="2.5" />
                  <path d={`M ${Cx} ${Cy} L ${Dx} ${Dy}`} stroke="#F59E0B" strokeWidth="2.5" />
                  <text x={Ex - 12} y={Ey - 20} fill="#DC2626" fontSize="12" fontWeight="bold">∠AED</text>
                  <text x={Ex + 12} y={Ey + 20} fill="#DC2626" fontSize="12" fontWeight="bold">∠CEB</text>
                </g>
              )}
              {step === 3 && (
                <g>
                  <rect x="50" y="320" width="300" height="40" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2" rx="10" />
                  <text x="200" y="345" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold" className="animate-pulse">
                    AE/CE = ED/EB
                  </text>
                </g>
              )}
              {step === 4 && (
                <g>
                  <rect x="50" y="320" width="300" height="40" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" rx="10" />
                  <text x="200" y="345" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold" className="animate-pulse">
                    AE × EB = CE × ED
                  </text>
                </g>
              )}
            </svg>
             
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper slideId="ct-intersecting-chords-theorem-proof" slideTitle="Proof by AA Similarity" moduleId="circle-theorems-0001" submoduleId="intersecting-chords" interactions={localInteractions}>
      {slideContent}
    </SlideComponentWrapper>
  );
}