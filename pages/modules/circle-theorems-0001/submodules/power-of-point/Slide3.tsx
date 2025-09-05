import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function PowerOfPointSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: triangles, 3: similarity, 4: conclusion

  const slideInteractions: Interaction[] = [
    { id: 'ct-power-point-proof', conceptId: 'ct-power-point-proof', conceptName: 'Power of Point Proof', type: 'learning', description: 'Understanding the proof of power of a point' },
    { id: 'ct-secant-triangles', conceptId: 'ct-secant-triangles', conceptName: 'Secant Triangles', type: 'learning', description: 'Using similar triangles formed by secants' }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // External point P
  const Px = cx + 180, Py = cy;
  
  // Tangent from P to circle (point T)
  const d = Math.sqrt((Px - cx) ** 2 + (Py - cy) ** 2);
  const tangentLength = Math.sqrt(d ** 2 - r ** 2);
  const angle = Math.atan2(Py - cy, Px - cx);
  const tangentAngle = Math.asin(r / d);
  
  const Tx = cx + r * Math.cos(angle - tangentAngle);
  const Ty = cy + r * Math.sin(angle - tangentAngle);
  
  // Secant from P through points A and B on the circle
  const secantAngle = Math.PI * 1.3; // Direction of secant
  const secantX = cx + r * Math.cos(secantAngle);
  const secantY = cy + r * Math.sin(secantAngle);
  
  // Calculate intersection points for secant
  const dx = secantX - Px;
  const dy = secantY - Py;
  const length = Math.sqrt(dx * dx + dy * dy);
  const unitX = dx / length;
  const unitY = dy / length;
  
  // Calculate two intersection points with circle for secant
  const discriminant = Math.pow(unitX * (Px - cx) + unitY * (Py - cy), 2) - 
                      ((Px - cx) * (Px - cx) + (Py - cy) * (Py - cy) - r * r);
  const t = -(unitX * (Px - cx) + unitY * (Py - cy));
  const sqrt = Math.sqrt(discriminant);
  
  const Ax = Px + unitX * (t - sqrt); // Closer intersection
  const Ay = Py + unitY * (t - sqrt);
  const Bx = Px + unitX * (t + sqrt); // Farther intersection
  const By = Py + unitY * (t + sqrt);

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem:</h3>
                  <p>If a tangent segment and a secant segment are drawn to a circle from an external point, then the square of the tangent segment equals the product of the secant segment and its external segment.</p>
                </div>
                <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Formula:</h3>
                  <p className="font-bold text-center text-xl">PT² = PA × PB</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Key Insights</h2>
              <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Tangent Special Case:</h3>
                <p>The tangent can be thought of as a secant where both intersection points coincide at the point of tangency.</p>
              </div>
              <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4 mt-4">
                <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Power Consistency:</h3>
                <p>This formula maintains the same "power" concept as secant-secant, just with one limiting case.</p>
              </div>
            </div>
          </TrackedInteraction>
        </div>
        <div className="space-y-6">
          <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
            <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto">
              {/* Step 1: Setup */}
              {step >= 1 && (
                <g>
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" className="animate-[draw_1s_ease-in-out]" />
                  <circle cx={cx} cy={cy} r="3" fill="#374151" />
                  <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="12" fontWeight="bold">O</text>
                  
                  {/* External point P */}
                  <circle cx={Px} cy={Py} r="4" fill="#DC2626" />
                  <text x={Px + 10} y={Py - 2} fill="#DC2626" fontSize="16" fontWeight="bold">P</text>
                  
                  {/* Tangent PT */}
                  <line x1={Px} y1={Py} x2={Tx} y2={Ty} stroke="#10B981" strokeWidth="3" className="animate-[draw_1s_ease-in-out]" />
                  <circle cx={Tx} cy={Ty} r="3" fill="#10B981" />
                  <text x={Tx + (Tx > cx ? 10 : -20)} y={Ty + (Ty > cy ? 18 : -8)} fill="#10B981" fontSize="14" fontWeight="bold">T</text>
                </g>
              )}
              {/* Step 2: Add secant */}
              {step >= 2 && (
                <g>
                  {/* Secant PAB */}
                  <line x1={Px} y1={Py} x2={Bx} y2={By} stroke="#3B82F6" strokeWidth="3" className="animate-[draw_1s_ease-in-out]" />
                  <circle cx={Ax} cy={Ay} r="3" fill="#3B82F6" />
                  <circle cx={Bx} cy={By} r="3" fill="#3B82F6" />
                  <text x={Ax + (Ax > cx ? 10 : -20)} y={Ay + (Ay > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">A</text>
                  <text x={Bx + (Bx > cx ? 10 : -20)} y={By + (By > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">B</text>
                </g>
              )}
              {/* Step 3: Show segments */}
              {step >= 3 && (
                <g>
                  {/* Segment labels */}
                  <text x={(Px + Tx) / 2} y={(Py + Ty) / 2 - 10} fill="#10B981" fontSize="12" fontWeight="bold">PT</text>
                  <text x={(Px + Ax) / 2} y={(Py + Ay) / 2 + 15} fill="#3B82F6" fontSize="12" fontWeight="bold">PA</text>
                  <text x={(Ax + Bx) / 2} y={(Ay + By) / 2 + 15} fill="#3B82F6" fontSize="12" fontWeight="bold">AB</text>
                </g>
              )}
              {/* Step 4: Formula */}
              {step >= 4 && (
                <g>
                  <rect x="50" y="320" width="300" height="40" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" rx="10" className="animate-[fade-in_1s_ease-in-out]" />
                  <text x="200" y="345" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold" className="animate-pulse">
                    PT² = PA × PB
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
                onClick={() => setStep(s => Math.min(4, s + 1))}
                disabled={step === 4}
              >Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper slideId="ct-power-of-point-tangent-secant" slideTitle="Power of a Point: Tangent-Secant" moduleId="circle-theorems-0001" submoduleId="power-of-point" interactions={localInteractions}>
      {slideContent}
    </SlideComponentWrapper>
  );
} 