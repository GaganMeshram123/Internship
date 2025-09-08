import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function CyclicQuadrilateralsSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: quadrilateral, 2: first pair, 3: second pair, 4: angles, 5: flash

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-cyclic-quadrilateral-concept',
      conceptId: 'ct-cyclic-quadrilateral',
      conceptName: 'Cyclic Quadrilateral',
      type: 'learning',
      description: 'Understanding quadrilaterals inscribed in circles'
    },
    {
      id: 'ct-opposite-angles-theorem',
      conceptId: 'ct-opposite-angles-theorem',
      conceptName: 'Opposite Angles Theorem',
      type: 'learning',
      description: 'Understanding that opposite angles in cyclic quadrilaterals sum to 180°'
    },
    {
      id: 'ct-cyclic-properties',
      conceptId: 'ct-cyclic-properties',
      conceptName: 'Cyclic Properties',
      type: 'learning',
      description: 'Understanding the special properties of cyclic quadrilaterals'
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

  // SVG Theorem Diagram Component
  const TheoremDiagram = () => {
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
        return {
            arc: "",
            labelX: 0,
            labelY: 0
        };
    };

    // The steps for the explanation
    const steps = [
        { title: "Introduction", description: "Click 'Next' to explore the Cyclic Quadrilateral Theorem." },
        { title: "Step 1: The Quadrilateral", description: "We start with a circle and a special type of quadrilateral, ABCD, where all four vertices lie on the circumference." },
        { title: "Step 2: Opposite Angles", description: "The theorem is about opposite angles. We'll start by looking at the first pair: Angle A and Angle C." },
        { title: "Step 3: Second Pair of Angles", description: "Next, we focus on the second pair of opposite angles: Angle B and Angle D." },
        { title: "Step 4: The Theorem", description: "The theorem states that the opposite angles of a cyclic quadrilateral are supplementary. This means their sum is 180°." },
        { title: "Step 5: Conclusion", description: "Therefore, ∠A + ∠C = 180° and ∠B + ∠D = 180°. This property is always true for any cyclic quadrilateral." }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            {/* 1. Headline */}
            <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">The Cyclic Quadrilateral Theorem</h1>
            
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Cyclic Quadrilateral</h3>
                    <svg width="400" height="500" viewBox="0 0 400 350" className="mx-auto">
                        {/* Circle */}
                        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
                        
                        {/* Center O */}
                        <circle cx={cx} cy={cy} r="3" fill="#374151" />
                        <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="12" fontWeight="bold">O</text>
                        
                        {/* Quadrilateral ABCD */}
                        {step >= 1 && (
                            <g>
                                {/* Vertices */}
                                <circle cx={Ax} cy={Ay} r="4" fill="#DC2626" />
                                <circle cx={Bx} cy={By} r="4" fill="#3B82F6" />
                                <circle cx={Cx} cy={Cy} r="4" fill="#10B981" />
                                <circle cx={Dx} cy={Dy} r="4" fill="#8B5CF6" />
                                
                                {/* Labels */}
                                <text x={Ax + 28} y={Ay - 18} fill="#DC2626" fontSize="16" fontWeight="bold">A</text>
                                <text x={Bx + 8} y={By - 28} fill="#3B82F6" fontSize="16" fontWeight="bold">B</text>
                                <text x={Cx - 38} y={Cy + 18} fill="#10B981" fontSize="16" fontWeight="bold">C</text>
                                <text x={Dx - 12} y={Dy + 34} fill="#8B5CF6" fontSize="16" fontWeight="bold">D</text>
                                
                                {/* Quadrilateral outline */}
                                <path 
                                    d={`M ${Ax} ${Ay} L ${Bx} ${By} L ${Cx} ${Cy} L ${Dx} ${Dy} Z`} 
                                    fill="none" 
                                    stroke="#6B7280" 
                                    strokeWidth="2"
                                    className="animate-[draw_2s_ease-in-out]"
                                />
                            </g>
                        )}
                        
                        {/* First pair of opposite angles (A and C) */}
                        {step >= 2 && (
                            <g>
                                {/* Angle A (between DA and AB) */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(Ax, Ay, Dx, Dy, Bx, By, 28);
                                    return <>
                                        <path d={arc} fill="none" stroke="#DC2626" strokeWidth="3" className={step === 5 ? "animate-pulse" : ""} />
                                        <text x={labelX} y={labelY} fill="#DC2626" fontSize="14" fontWeight="bold" textAnchor="middle">∠A</text>
                                    </>;
                                })()}
                                {/* Angle C (between BC and CD) */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(Cx, Cy, Bx, By, Dx, Dy, 28);
                                    return <>
                                        <path d={arc} fill="none" stroke="#10B981" strokeWidth="3" className={step === 5 ? "animate-pulse" : ""} />
                                        <text x={labelX} y={labelY} fill="#10B981" fontSize="14" fontWeight="bold" textAnchor="middle">∠C</text>
                                    </>;
                                })()}
                                {/* Connection line (dashed) */}
                                <line 
                                    x1={Ax} y1={Ay} x2={Cx} y2={Cy} 
                                    stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" strokeOpacity="0.6"
                                />
                                <text x={(Ax + Cx) / 2 + 20} y={(Ay + Cy) / 2} fill="#F59E0B" fontSize="12" fontWeight="bold">Opposite</text>
                            </g>
                        )}
                        {/* Second pair of opposite angles (B and D) */}
                        {step >= 3 && (
                            <g>
                                {/* Angle B (between AB and BC) */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(Bx, By, Ax, Ay, Cx, Cy, 28);
                                    return <>
                                        <path d={arc} fill="none" stroke="#3B82F6" strokeWidth="3" className={step === 5 ? "animate-pulse" : ""} />
                                        <text x={labelX} y={labelY} fill="#3B82F6" fontSize="14" fontWeight="bold" textAnchor="middle">∠B</text>
                                    </>;
                                })()}
                                {/* Angle D (between CD and DA) */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(Dx, Dy, Cx, Cy, Ax, Ay, 28);
                                    return <>
                                        <path d={arc} fill="none" stroke="#8B5CF6" strokeWidth="3" className={step === 5 ? "animate-pulse" : ""} />
                                        <text x={labelX} y={labelY} fill="#8B5CF6" fontSize="14" fontWeight="bold" textAnchor="middle">∠D</text>
                                    </>;
                                })()}
                                {/* Connection line (dashed) */}
                                <line 
                                    x1={Bx} y1={By} x2={Dx} y2={Dy} 
                                    stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5" strokeOpacity="0.6"
                                />
                            </g>
                        )}
                        
                        {/* Angle sum equations */}
                        {step >= 4 && (
                            <g>
                                <rect 
                                    x="50" y="-50" width="300" height="80" 
                                    fill="#F3F4F6" stroke="#6B7280" strokeWidth="2" 
                                    rx="10"
                                    className="animate-[fade-in_1s_ease-in-out]"
                                />
                                <text x="200" y="-30" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="bold">
                                    Cyclic Quadrilateral Theorem
                                </text>
                                <text x="200" y="-10" textAnchor="middle" fill="#DC2626" fontSize="14" fontWeight="bold">
                                    ∠A + ∠C = 180°
                                </text>
                                <text x="200" y="10" textAnchor="middle" fill="#3B82F6" fontSize="14" fontWeight="bold">
                                    ∠B + ∠D = 180°
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
    );
};

  // The slide content
  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Theorem Definition */}
        <div className="space-y-6">
          {/* Cyclic Quadrilateral Definition */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Definition:</h3>
                  <p>A cyclic quadrilateral is a four-sided polygon where all four vertices lie on the circumference of a circle.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Properties:</h3>
                  <ul className="space-y-2">
                    <li>• All vertices are concyclic (on same circle)</li>
                    <li>• Can be any quadrilateral shape</li>
                    <li>• Square, rectangle, trapezoid can be cyclic</li>
                    <li>• Has special angle relationships</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Also Known As:</h3>
                  <p className="text-lg">Inscribed quadrilateral, concyclic quadrilateral</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Opposite Angles Theorem */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Opposite Angles Theorem
              </h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem Statement:</h3>
                  <p>In a cyclic quadrilateral, opposite angles are <strong>supplementary</strong> (they add up to 180°).</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Mathematical Form:</h3>
                  <p>For cyclic quadrilateral ABCD:</p>
                  <p className="font-bold mt-2">∠A + ∠C = 180°</p>
                  <p className="font-bold">∠B + ∠D = 180°</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Remember:</h3>
                  <p className="text-lg">Opposite angles are across the diagonal from each other, not adjacent angles.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Properties and Diagram */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <TheoremDiagram />
          
          {/* Special Properties */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Special Properties
              </h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Unique to Cyclic Quadrilaterals:</h3>
                  <ul className="space-y-1 text-lg">
                    <li>• Opposite angles sum to 180°</li>
                    <li>• All angles subtend arcs on the circle</li>
                    <li>• Ptolemy's theorem applies</li>
                    <li>• Has a circumcircle (circumscribed circle)</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Applications:</h3>
                  <ul className="space-y-1 text-lg">
                    <li>• Finding unknown angles</li>
                    <li>• Proving quadrilaterals are cyclic</li>
                    <li>• Complex geometry problems</li>
                    <li>• Engineering and design</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Converse is True:</h3>
                  <p className="text-lg">If opposite angles of a quadrilateral sum to 180°, then it is cyclic!</p>
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
      slideId="ct-cyclic-quadrilaterals-theorem"
      slideTitle="Cyclic Quadrilateral"
      moduleId="circle-theorems-0001"
      submoduleId="cyclic-quadrilaterals"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 
 