import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function EqualChordsTheoremSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: triangles, 3: congruence, 4: equal angles, 5: conclusion

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-equal-chords-proof',
      conceptId: 'ct-equal-chords-proof',
      conceptName: 'Equal Chords Proof',
      type: 'learning',
      description: 'Understanding the proof of equal chords theorem'
    },
    {
      id: 'ct-isosceles-triangles',
      conceptId: 'ct-isosceles-triangles',
      conceptName: 'Isosceles Triangles',
      type: 'learning',
      description: 'Using isosceles triangles in the proof'
    },
    {
      id: 'ct-central-angles-equality',
      conceptId: 'ct-central-angles-equality',
      conceptName: 'Central Angles Equality',
      type: 'learning',
      description: 'Proving that equal chords subtend equal central angles'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Make chords closer together - both on the upper part of the circle
  const angleA1 = Math.PI * 0.65, angleB1 = Math.PI * 0.8;
  const A1x = cx + r * Math.cos(angleA1), A1y = cy + r * Math.sin(angleA1);
  const B1x = cx + r * Math.cos(angleB1), B1y = cy + r * Math.sin(angleB1);
  const angleA2 = Math.PI * 0.2, angleB2 = Math.PI * 0.35;
  const A2x = cx + r * Math.cos(angleA2), A2y = cy + r * Math.sin(angleA2);
  const B2x = cx + r * Math.cos(angleB2), B2y = cy + r * Math.sin(angleB2);

  // Helper for angle arc at a vertex (always draws minor angle)
  function angleArc(x: number, y: number, ax: number, ay: number, bx: number, by: number, radius = 18) {
    let angle1 = Math.atan2(ay - y, ax - x);
    let angle2 = Math.atan2(by - y, bx - x);
    
    if (angle1 < 0) angle1 += 2 * Math.PI;
    if (angle2 < 0) angle2 += 2 * Math.PI;
    
    let diff = angle2 - angle1;
    if (diff < 0) diff += 2 * Math.PI;
    if (diff > Math.PI) {
      [angle1, angle2] = [angle2, angle1];
      diff = 2 * Math.PI - diff;
    }
    
    const arcX1 = x + radius * Math.cos(angle1);
    const arcY1 = y + radius * Math.sin(angle1);
    const arcX2 = x + radius * Math.cos(angle2);
    const arcY2 = y + radius * Math.sin(angle2);
    
    const mid = angle1 + diff / 2;
    const labelX = x + (radius + 15) * Math.cos(mid);
    const labelY = y + (radius + 15) * Math.sin(mid);
    
    return { 
      arc: `M ${arcX1} ${arcY1} A ${radius} ${radius} 0 0 1 ${arcX2} ${arcY2}`, 
      labelX, 
      labelY 
    };
  }

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Given:</h3>
                  <p>AB = CD (equal chords in the same circle)</p>
                </div>
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-green-700 dark:text-green-300 mb-3">To Prove:</h3>
                  <p>∠AOB = ∠COD (equal central angles)</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">SSS Congruence</h2>
              <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                <h3 className="text-xl font-medium text-amber-700 dark:text-amber-300 mb-3">Triangle △AOB ≅ △COD:</h3>
                <ul className="space-y-2">
                  <li>• OA = OC (radii)</li>
                  <li>• OB = OD (radii)</li>
                  <li>• AB = CD (given)</li>
                </ul>
                <p className="font-bold mt-3">Therefore: △AOB ≅ △COD (SSS)</p>
              </div>
            </div>
          </TrackedInteraction>
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto">
              {step >= 1 && (
                <g>
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
                  <circle cx={cx} cy={cy} r="3" fill="#DC2626" />
                  <text x={cx + 10} y={cy - 5} fill="#DC2626" fontSize="12" fontWeight="bold">O</text>
                </g>
              )}
              {step >= 2 && (
                <g>
                  <path d={`M ${cx} ${cy} L ${A1x} ${A1y} L ${B1x} ${B1y} Z`} fill="rgba(59, 130, 246, 0.3)" stroke="#3B82F6" strokeWidth="2" />
                  <path d={`M ${cx} ${cy} L ${A2x} ${A2y} L ${B2x} ${B2y} Z`} fill="rgba(16, 185, 129, 0.3)" stroke="#10B981" strokeWidth="2" />
                  <circle cx={A1x} cy={A1y} r="3" fill="#3B82F6" />
                  <circle cx={B1x} cy={B1y} r="3" fill="#3B82F6" />
                  <circle cx={A2x} cy={A2y} r="3" fill="#10B981" />
                  <circle cx={B2x} cy={B2y} r="3" fill="#10B981" />
                  <text x={A1x + (A1x > cx ? 10 : -20)} y={A1y + (A1y > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">A</text>
                  <text x={B1x + (B1x > cx ? 10 : -20)} y={B1y + (B1y > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">B</text>
                  <text x={A2x + (A2x > cx ? 10 : -20)} y={A2y + (A2y > cy ? 18 : -8)} fill="#10B981" fontSize="14" fontWeight="bold">C</text>
                  <text x={B2x + (B2x > cx ? 10 : -20)} y={B2y + (B2y > cy ? 18 : -8)} fill="#10B981" fontSize="14" fontWeight="bold">D</text>

                  {/* Markings for SSS congruence */}
                  {/* OA = OC (radii) */}
                  <line x1={cx} y1={cy} x2={A1x} y2={A1y} stroke="#F59E0B" strokeWidth="4" strokeDasharray="6 5" />
                  <line x1={cx} y1={cy} x2={A2x} y2={A2y} stroke="#F59E0B" strokeWidth="4" strokeDasharray="6 5" />
                  {/* OA = OC (radii) - centered label */}
                  {(() => {
                    // Midpoints of OA and OC
                    const mx1 = (cx + A1x) / 2, my1 = (cy + A1y) / 2;
                    const mx2 = (cx + A2x) / 2, my2 = (cy + A2y) / 2;
                    const labelX = (mx1 + mx2) / 2;
                    const labelY = (my1 + my2) / 2 - 10;
                    return <text x={labelX} y={labelY} fill="#F59E0B" fontSize="12" fontWeight="bold" textAnchor="middle">OA = OC</text>;
                  })()}

                  {/* OB = OD (radii) */}
                  <line x1={cx} y1={cy} x2={B1x} y2={B1y} stroke="#8B5CF6" strokeWidth="4" strokeDasharray="6 5" />
                  <line x1={cx} y1={cy} x2={B2x} y2={B2y} stroke="#8B5CF6" strokeWidth="4" strokeDasharray="6 5" />
                  {(() => {
                    // Midpoints of OB and OD
                    const mx1 = (cx + B1x) / 2, my1 = (cy + B1y) / 2;
                    const mx2 = (cx + B2x) / 2, my2 = (cy + B2y) / 2;
                    const labelX = (mx1 + mx2) / 2 - 20;
                    const labelY = (my1 + my2) / 2 - 20;
                    return <text x={labelX} y={labelY} fill="#8B5CF6" fontSize="12" fontWeight="bold" textAnchor="middle">OB = OD</text>;
                  })()}

                  {/* AB = CD (chord equality) */}
                  <line x1={A1x} y1={A1y} x2={B1x} y2={B1y} stroke="#22D3EE" strokeWidth="4" strokeDasharray="2 3" />
                  <line x1={A2x} y1={A2y} x2={B2x} y2={B2y} stroke="#22D3EE" strokeWidth="4" strokeDasharray="2 3" />
                  <text x={cx} y={(A1y + B1y + A2y + B2y) / 4 + 4} fill="#22D3EE" fontSize="12" fontWeight="bold" textAnchor="middle">AB = CD</text>

                  {/* SSS label between triangles */}
                  <text x={cx} y={cy - 30} fill="#F59E0B" fontSize="15" fontWeight="bold" textAnchor="middle">SSS</text>
                </g>
              )}
              {step >= 3 && (
                <text x={cx} y={cy - 100} textAnchor="middle" fill="#F59E0B" fontSize="16" fontWeight="bold" className="animate-pulse">
                  △AOB ≅ △COD (SSS)
                </text>
              )}
              {step >= 4 && (
                <text x={cx} y={cy + 150} textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="bold">
                  ∴ ∠AOB = ∠COD ✓
                </text>
              )}
            </svg>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 rounded bg-indigo-600 text-white font-medium disabled:opacity-50 hover:bg-indigo-700 transition-colors"
                onClick={() => setStep(s => Math.min(5, s + 1))}
                disabled={step === 5}
              >
                Next
              </button>
            </div>
          </div>
          <TrackedInteraction interaction={slideInteractions[2]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
              <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                <p>Since △AOB ≅ △COD, corresponding angles are equal: ∠AOB = ∠COD</p>
                <p className="font-bold mt-2">Therefore: Equal chords subtend equal central angles!</p>
              </div>
            </div>
          </TrackedInteraction>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper slideId="ct-equal-chords-theorem-proof" slideTitle="Proof by SSS Congruence" moduleId="circle-theorems-0001" submoduleId="equal-chords-theorem" interactions={localInteractions}>
      {slideContent}
    </SlideComponentWrapper>
  );
} 