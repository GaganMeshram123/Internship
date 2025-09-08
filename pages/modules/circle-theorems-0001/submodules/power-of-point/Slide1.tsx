import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function PowerOfPointSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: circle, 2: secants, 3: segments, 4: product

  const slideInteractions: Interaction[] = [
    { id: 'ct-power-point-secant', conceptId: 'ct-power-point-secant', conceptName: 'Power of Point - Secant', type: 'learning', description: 'Understanding power of a point with secants' },
    { id: 'ct-secant-product-theorem', conceptId: 'ct-secant-product-theorem', conceptName: 'Secant Product Theorem', type: 'learning', description: 'Understanding the secant-secant product relationship' }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // External point P
  const Px = cx + 180, Py = cy;
  
  // First secant from P through points A and B on the circle
  const secant1Angle = Math.PI * 0.7; // Direction of first secant
  const secant1X = cx + r * Math.cos(secant1Angle);
  const secant1Y = cy + r * Math.sin(secant1Angle);
  
  // Calculate intersection points for first secant
  const dx1 = secant1X - Px;
  const dy1 = secant1Y - Py;
  const length1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
  const unitX1 = dx1 / length1;
  const unitY1 = dy1 / length1;
  
  const discriminant1 = Math.pow(unitX1 * (Px - cx) + unitY1 * (Py - cy), 2) - 
                        ((Px - cx) * (Px - cx) + (Py - cy) * (Py - cy) - r * r);
  const t1 = -(unitX1 * (Px - cx) + unitY1 * (Py - cy));
  const sqrt1 = Math.sqrt(discriminant1);
  
  const Ax = Px + unitX1 * (t1 - sqrt1); // Closer intersection
  const Ay = Py + unitY1 * (t1 - sqrt1);
  const Bx = Px + unitX1 * (t1 + sqrt1); // Farther intersection
  const By = Py + unitY1 * (t1 + sqrt1);
  
  // Second secant from P through points C and D on the circle
  const secant2Angle = Math.PI * 1.3; // Direction of second secant
  const secant2X = cx + r * Math.cos(secant2Angle);
  const secant2Y = cy + r * Math.sin(secant2Angle);
  
  // Calculate intersection points for second secant
  const dx2 = secant2X - Px;
  const dy2 = secant2Y - Py;
  const length2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
  const unitX2 = dx2 / length2;
  const unitY2 = dy2 / length2;
  
  const discriminant2 = Math.pow(unitX2 * (Px - cx) + unitY2 * (Py - cy), 2) - 
                        ((Px - cx) * (Px - cx) + (Py - cy) * (Py - cy) - r * r);
  const t2 = -(unitX2 * (Px - cx) + unitY2 * (Py - cy));
  const sqrt2 = Math.sqrt(discriminant2);
  
  const Cx = Px + unitX2 * (t2 - sqrt2); // Closer intersection
  const Cy = Py + unitY2 * (t2 - sqrt2);
  const Dx = Px + unitX2 * (t2 + sqrt2); // Farther intersection
  const Dy = Py + unitY2 * (t2 + sqrt2);

  const steps = [
    { title: "Introduction", description: "Click 'Next' to learn about the Power of a Point Theorem, specifically with intersecting secant lines." },
    { title: "Step 1: The Circle", description: "We start with a circle and its center O, and an external point P." },
    { title: "Step 2: Secant Lines", description: "Draw two secant lines from point P. The first line intersects the circle at points A and B, and the second at points C and D." },
    { title: "Step 3: The Segments", description: "The theorem involves the lengths of these segments. For the first secant, we have an external segment PA and a total segment PB. For the second, we have PC and PD." },
    { title: "Step 4: The Conclusion", description: "The theorem states that the product of the segments of one secant equals the product of the segments of the other: PA × PB = PC × PD." },
  ];

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
       
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem:</h3>
                  <p>If two secant segments are drawn to a circle from an external point, then the product of one secant segment and its external segment equals the product of the other secant segment and its external segment.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Formula:</h3>
                  <p className="font-bold text-center text-xl">PA × PB = PC × PD</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
          <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Key Concepts</h2>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-4">
                <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Secant Segments:</h3>
                <p>A secant segment is the entire length from the external point to the farther intersection with the circle.</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">External Segments:</h3>
                <p>An external segment is the length from the external point to the nearer intersection with the circle.</p>
              </div>
            </div>
          </TrackedInteraction>
        </div>
        <div className="space-y-6">
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
    <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
      The Power of a Point Theorem
    </h1>

    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
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
            <svg width="400" height="400" viewBox="0 0 400 400" className="mx-auto mt-6">
              {step >= 1 && (
                <g>
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" className="animate-[draw_1s_ease-in-out]" />
                  <circle cx={cx} cy={cy} r="3" fill="#374151" />
                  <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="12" fontWeight="bold">O</text>
                </g>
              )}
              {step >= 2 && (
                <g>
                  <circle cx={Px} cy={Py} r="4" fill="#DC2626" />
                  <text x={Px + 10} y={Py - 2} fill="#DC2626" fontSize="16" fontWeight="bold">P</text>
                  
                  <line x1={Px} y1={Py} x2={Bx} y2={By} stroke="#3B82F6" strokeWidth="3" className="animate-[draw_1s_ease-in-out]" />
                  <circle cx={Ax} cy={Ay} r="3" fill="#3B82F6" />
                  <circle cx={Bx} cy={By} r="3" fill="#3B82F6" />
                  <text x={Ax + (Ax > cx ? 10 : -20)} y={Ay + (Ay > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">A</text>
                  <text x={Bx + (Bx > cx ? 10 : -20)} y={By + (By > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">B</text>
                </g>
              )}
              {step >= 3 && (
                <g>
                  <line x1={Px} y1={Py} x2={Dx} y2={Dy} stroke="#10B981" strokeWidth="3" className="animate-[draw_1s_ease-in-out]" />
                  <circle cx={Cx} cy={Cy} r="3" fill="#10B981" />
                  <circle cx={Dx} cy={Dy} r="3" fill="#10B981" />
                  <text x={Cx + (Cx > cx ? 10 : -20)} y={Cy + (Cy > cy ? 18 : -8)} fill="#10B981" fontSize="14" fontWeight="bold">C</text>
                  <text x={Dx + (Dx > cx ? 10 : -20)} y={Dy + (Dy > cy ? 18 : -8)} fill="#10B981" fontSize="14" fontWeight="bold">D</text>
                </g>
              )}
              {step >= 4 && (
                <g>
                  <text x={(Px + Ax) / 2-10} y={(Py + Ay) / 2 +15} fill="#3B82F6" fontSize="12" fontWeight="bold">PA</text>
                  <text x={(Ax + Bx) / 2} y={(Ay + By) / 2 - 10} fill="#3B82F6" fontSize="12" fontWeight="bold">AB</text>
                  <text x={(Px + Cx) / 2-10} y={(Py + Cy) / 2 -10} fill="#10B981" fontSize="12" fontWeight="bold">PC</text>
                  <text x={(Cx + Dx) / 2} y={(Cy + Dy) / 2 + 15} fill="#10B981" fontSize="12" fontWeight="bold">CD</text>
                  
                  <rect x="50" y="320" width="300" height="40" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" rx="10" className="animate-[fade-in_1s_ease-in-out]" />
                  <text x="200" y="345" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold" className="animate-pulse">
                    PA × PB = PC × PD
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
    <SlideComponentWrapper slideId="ct-power-of-point-secant-secant" slideTitle="Power of a Point: Secant-Secant" moduleId="circle-theorems-0001" submoduleId="power-of-point" interactions={localInteractions}>
      {slideContent}
    </SlideComponentWrapper>
  );
}