import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function CyclicQuadrilateralsSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: arcs, 3: arc measures, 4: angle relationship, 5: calculation, 6: final result

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-cyclic-proof-setup',
      conceptId: 'ct-cyclic-proof-setup',
      conceptName: 'Proof Setup',
      type: 'learning',
      description: 'Setting up the proof for cyclic quadrilaterals theorem'
    },
    {
      id: 'ct-arc-angle-relationship',
      conceptId: 'ct-arc-angle-relationship',
      conceptName: 'Arc-Angle Relationship',
      type: 'learning',
      description: 'Understanding how arcs relate to inscribed angles'
    },
    {
      id: 'ct-supplementary-proof',
      conceptId: 'ct-supplementary-proof',
      conceptName: 'Supplementary Angles Proof',
      type: 'learning',
      description: 'Proving that opposite angles sum to 180°'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Use four non-evenly spaced points for a less regular convex cyclic quadrilateral in order A, B, C, D
  const angleA = 0;
  const angleB = 1.1;
  const angleC = 2.2;
  const angleD = 4.2;
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  const Cx = cx + r * Math.cos(angleC), Cy = cy + r * Math.sin(angleC);
  const Dx = cx + r * Math.cos(angleD), Dy = cy + r * Math.sin(angleD);

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

  // SVG Proof Diagram Component
const ProofDiagram = () => {
    // State to manage the current step
    const [step, setStep] = useState(0);

    // Coordinate constants for the diagram
    const cx = 200;
    const cy = 175;
    const r = 120;
    const Ax = cx + r * Math.cos(Math.PI * 0.25);
    const Ay = cy - r * Math.sin(Math.PI * 0.25);
    const Bx = cx + r * Math.cos(Math.PI * 0.8);
    const By = cy - r * Math.sin(Math.PI * 0.8);
    const Cx = cx + r * Math.cos(Math.PI * 1.25);
    const Cy = cy - r * Math.sin(Math.PI * 1.25);
    const Dx = cx + r * Math.cos(Math.PI * 1.8);
    const Dy = cy - r * Math.sin(Math.PI * 1.8);

    // This is a placeholder for the angleArc function
    const angleArc = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, radius: number) => {
        // Implementation would go here
        return {
            arc: "",
            labelX: 0,
            labelY: 0
        };
    };

    // The steps for the explanation
    const steps = [
        { title: "Introduction", description: "Click 'Next' to begin the proof of the Cyclic Quadrilateral Theorem. We'll prove that opposite angles add up to 180°." },
        { title: "Step 1: The Setup", description: "We start with a cyclic quadrilateral ABCD inscribed in a circle with center O." },
        { title: "Step 2: Radii and Angles", description: "Draw radii OB and OD. This forms a central angle (∠BOD) and an inscribed angle (∠A)." },
        { title: "Step 3: Angle a and 2a", description: "The Inscribed Angle Theorem states that inscribed angle ∠A is half of the central angle ∠BOD. So, ∠BOD = 2a." },
        { title: "Step 4: Angle c and 2c", description: "The same applies to the opposite angle ∠C. It is half of the other central angle subtended by arc BD (the major arc). So, the reflex ∠BOD = 2c." },
        { title: "Step 5: The Proof", description: "The sum of the central angles is 360°. Therefore, 2a + 2c = 360°, which simplifies to a + c = 180°." },
        { title: "Step 6: Conclusion", description: "We have now proven that opposite angles A and C of the cyclic quadrilateral are supplementary. The same logic applies to angles B and D." }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            {/* 1. Headline */}
            <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">Proof of the Cyclic Quadrilateral Theorem</h1>
            
            {/* 2. Step Text with Indicator */}
            <div className="mb-6">
                {/* Step Indicator */}
                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 text-lg">Step {step + 1}</span>
                    <span className="font-light">of {steps.length}</span>
                    <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 ease-out"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
                {/* Step Text */}
                <div className="p-6 bg-blue-50 dark:bg-gray-800 rounded-xl shadow-inner border border-blue-100 dark:border-gray-700 transition-all duration-300">
                    <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300">
                        {steps[step].title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed text-base">
                        {steps[step].description}
                    </p>
                </div>
            </div>

            {/* 3. Buttons */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                >
                    ← Previous
                </button>
                <button
                    className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                    disabled={step === steps.length - 1}
                >
                    Next →
                </button>
            </div>

            {/* 4. Circle Diagram (your original code, untouched) */}
            <div className="mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cyclic Quadrilateral Proof</h3>
                    <svg width="400" height="500" viewBox="0 0 400 350" className="mx-auto">
                        {/* 1. Circle, center, and quadrilateral */}
                        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
                        <circle cx={cx} cy={cy} r="3" fill="#374151" />
                        <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="12" fontWeight="bold">O</text>
                        <g>
                            <circle cx={Ax} cy={Ay} r="4" fill="#DC2626" />
                            <circle cx={Bx} cy={By} r="4" fill="#3B82F6" />
                            <circle cx={Cx} cy={Cy} r="4" fill="#10B981" />
                            <circle cx={Dx} cy={Dy} r="4" fill="#8B5CF6" />
                            <text x={Ax + 28} y={Ay - 18} fill="#DC2626" fontSize="16" fontWeight="bold">A</text>
                            <text x={Bx + 8} y={By - 28} fill="#3B82F6" fontSize="16" fontWeight="bold">B</text>
                            <text x={Cx - 38} y={Cy + 18} fill="#10B981" fontSize="16" fontWeight="bold">C</text>
                            <text x={Dx - 12} y={Dy + 34} fill="#8B5CF6" fontSize="16" fontWeight="bold">D</text>
                            <path d={`M ${Ax} ${Ay} L ${Bx} ${By} L ${Cx} ${Cy} L ${Dx} ${Dy} Z`} fill="none" stroke="#6B7280" strokeWidth="2" />
                        </g>
                        {/* 2. Draw radii OB and OD */}
                        {step >= 2 && (
                            <g>
                                <line x1={cx} y1={cy} x2={Bx} y2={By} stroke="#3B82F6" strokeWidth="2" />
                                <line x1={cx} y1={cy} x2={Dx} y2={Dy} stroke="#8B5CF6" strokeWidth="2" />
                                <text x={(cx + Bx) / 2 + 10} y={(cy + By) / 2 - 10} fill="#3B82F6" fontSize="12" fontWeight="bold">OB</text>
                                <text x={(cx + Dx) / 2 - 30} y={(cy + Dy) / 2 + 10} fill="#8B5CF6" fontSize="12" fontWeight="bold">OD</text>
                            </g>
                        )}
                        {/* 3. Highlight angle at A as a, and show central angle BOD as 2a */}
                        {step >= 3 && (
                            <g>
                                {/* Angle a at A */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(Ax, Ay, Dx, Dy, Bx, By, 35);
                                    // Smaller offset for label
                                    const offset = 40;
                                    let angle1 = Math.atan2(Dy - Ay, Dx - Ax);
                                    let angle2 = Math.atan2(By - Ay, Bx - Ax);
                                    let diff = angle2 - angle1;
                                    if (diff < 0) diff += 2 * Math.PI;
                                    if (diff > Math.PI) {
                                        // always minor arc for inscribed angle
                                        [angle1, angle2] = [angle2, angle1];
                                        diff = 2 * Math.PI - diff;
                                    }
                                    const mid = angle1 + diff / 2;
                                    const labelAX = Ax + offset * Math.cos(mid);
                                    const labelAY = Ay + offset * Math.sin(mid);
                                    return <>
                                        <path d={arc} fill="none" stroke="#DC2626" strokeWidth="3" />
                                        <text x={labelAX} y={labelAY} fill="#DC2626" fontSize="14" fontWeight="bold">a</text>
                                    </>;
                                })()}
                                {/* Central angle 2a at O (angle BOD) */}
                                {(() => {
                                    const { arc } = angleArc(cx, cy, Bx, By, Dx, Dy, 45);
                                    // Smaller offset for label
                                    const offset = 40;
                                    let angle1 = Math.atan2(By - cy, Bx - cx);
                                    let angle2 = Math.atan2(Dy - cy, Dx - cx);
                                    if (angle1 < 0) angle1 += 2 * Math.PI;
                                    if (angle2 < 0) angle2 += 2 * Math.PI;
                                    let diff = angle2 - angle1;
                                    if (diff < 0) diff += 2 * Math.PI;
                                    if (diff > Math.PI) {
                                        let temp = angle1;
                                        angle1 = angle2;
                                        angle2 = temp;
                                        diff = 2 * Math.PI - diff;
                                    }
                                    const mid = angle1 + diff / 2;
                                    const label2aX = cx + offset * Math.cos(mid);
                                    const label2aY = cy + offset * Math.sin(mid);
                                    return <>
                                        <path d={arc} fill="none" stroke="#F59E0B" strokeWidth="3" />
                                        <text x={label2aX} y={label2aY} fill="#F59E0B" fontSize="14" fontWeight="bold">2a</text>
                                    </>;
                                })()}
                            </g>
                        )}
                        {/* 4. Highlight angle at C as c, and show central angle BOD as 2c */}
                        {step >= 4 && (
                            <g>
                                {/* Angle c at C */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(Cx, Cy, Bx, By, Dx, Dy, 35);
                                    // Smaller offset for label
                                    const offset = 40;
                                    let angle1 = Math.atan2(By - Cy, Bx - Cx);
                                    let angle2 = Math.atan2(Dy - Cy, Dx - Cx);
                                    let diff = angle2 - angle1;
                                    if (diff < 0) diff += 2 * Math.PI;
                                    if (diff > Math.PI) {
                                        [angle1, angle2] = [angle2, angle1];
                                        diff = 2 * Math.PI - diff;
                                    }
                                    const mid = angle1 + diff / 2;
                                    const labelCX = Cx + offset * Math.cos(mid);
                                    const labelCY = Cy + offset * Math.sin(mid);
                                    return <>
                                        <path d={arc} fill="none" stroke="#10B981" strokeWidth="3" />
                                        <text x={labelCX} y={labelCY} fill="#10B981" fontSize="14" fontWeight="bold">c</text>
                                    </>;
                                })()}
                                {/* Central angle 2c at O (angle DOB) */}
                                {(() => {
                                    // Draw the major arc (the sector containing the quadrilateral)
                                    let angle1 = Math.atan2(Dy - cy, Dx - cx);
                                    let angle2 = Math.atan2(By - cy, Bx - cx);
                                    if (angle1 < 0) angle1 += 2 * Math.PI;
                                    if (angle2 < 0) angle2 += 2 * Math.PI;
                                    let diff = angle2 - angle1;
                                    if (diff < 0) diff += 2 * Math.PI;
                                    // If minor arc, swap to get major arc
                                    let arcSweep = 1; // large-arc-flag for SVG
                                    if (diff < Math.PI) {
                                        let temp = angle1;
                                        angle1 = angle2;
                                        angle2 = temp;
                                        diff = 2 * Math.PI - diff;
                                    }
                                    // Arc path for major arc
                                    const arcR = 60;
                                    const arcX1 = cx + arcR * Math.cos(angle1);
                                    const arcY1 = cy + arcR * Math.sin(angle1);
                                    const arcX2 = cx + arcR * Math.cos(angle2);
                                    const arcY2 = cy + arcR * Math.sin(angle2);
                                    const arcPath = `M ${arcX1} ${arcY1} A ${arcR} ${arcR} 0 1 1 ${arcX2} ${arcY2}`;
                                    // Smaller offset for label
                                    const offset = 40;
                                    const mid = angle1 + diff / 2;
                                    const label2cX = cx + offset * Math.cos(mid);
                                    const label2cY = cy + offset * Math.sin(mid);
                                    return <>
                                        <path d={arcPath} fill="none" stroke="#8B5CF6" strokeWidth="3" />
                                        <text x={label2cX} y={label2cY} fill="#8B5CF6" fontSize="14" fontWeight="bold">2c</text>
                                    </>;
                                })()}
                            </g>
                        )}
                        {/* 5. Show that 2a + 2c = 360°, so a + c = 180° */}
                        {step >= 5 && (
                            <g>
                                <rect 
                                    x={cx - 150} y={cy - 220} width="300" height="90" 
                                    fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" 
                                    rx="10"
                                />
                                <text x={cx} y={cy - 200} textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold">
                                    Angles at the center: 2a + 2c = 360°
                                </text>
                                <text x={cx} y={cy - 180} textAnchor="middle" fill="#0C4A6E" fontSize="13">
                                    a + c = 180°
                                </text>
                                <text x={cx} y={cy - 160} textAnchor="middle" fill="#DC2626" fontSize="13" fontWeight="bold">
                                    Therefore: Opposite angles are supplementary!
                                </text>
                            </g>
                        )}
                        {/* 6. Final result */}
                        {step >= 6 && (
                            <g>
                                <text x={cx} y={cy - 140} textAnchor="middle" fill="#10B981" fontSize="16" fontWeight="bold" className="animate-bounce">
                                    QED ✓
                                </text>
                            </g>
                        )}
                    </svg>
                    
                </div>
            </div>
        </div>
    );
};
  // The slide content
  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Proof Steps */}
        <div className="space-y-6">
          {/* Proof Setup */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
           <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Given:</h3>
                  <ul className="space-y-2">
                    <li>• Cyclic quadrilateral ABCD</li>
                    <li>• All vertices on circle</li>
                    <li>• Want to prove: ∠A + ∠C = 180°</li>
                    <li>• And: ∠B + ∠D = 180°</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Strategy:</h3>
                  <p>Use the inscribed angle theorem and the fact that arcs around a circle sum to 360°.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Insight:</h3>
                  <p>Opposite angles subtend complementary arcs that together form the complete circle.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Arc Relationships */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
           <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Step 1: Arc Relationships
              </h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Angle B's Arc:</h3>
                  <p>∠B subtends arc ADC (the arc from A to C passing through D)</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Angle D's Arc:</h3>
                  <p>∠D subtends arc ABC (the arc from A to C passing through B)</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Complete Circle:</h3>
                  <p>Arc ADC + Arc ABC = 360°</p>
                  <p className="text-sm mt-2 italic">These two arcs together form the entire circle</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Diagram and Calculation */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <ProofDiagram />
          
          {/* Calculation */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
           <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Step 2: Apply Inscribed Angle Theorem
              </h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Inscribed Angle Formula:</h3>
                  <p>Inscribed angle = ½ × Arc measure</p>
                  <ul className="mt-2 space-y-1">
                    <li>∠B = ½ × (Arc ADC)</li>
                    <li>∠D = ½ × (Arc ABC)</li>
                  </ul>
                </div>
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Add the Angles:</h3>
                  <p>∠B + ∠D = ½(Arc ADC) + ½(Arc ABC)</p>
                  <p>= ½(Arc ADC + Arc ABC)</p>
                  <p>= ½(360°) = 180°</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Similarly for ∠A + ∠C:</h3>
                  <p className="text-sm">Using the same logic, ∠A + ∠C = 180°</p>
                  <p className="font-bold mt-2">Therefore: Opposite angles are supplementary ✓</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="ct-cyclic-quadrilaterals-proof"
      slideTitle="Proof Setup"
      moduleId="circle-theorems-0001"
      submoduleId="cyclic-quadrilaterals"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}


