import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function SameSegmentTheoremSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: chord, 2: P, 3: Q, 4: R, 5: angles, 6: highlight

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-same-segment-theorem-concept',
      conceptId: 'ct-same-segment-theorem',
      conceptName: 'Same Segment Theorem',
      type: 'learning',
      description: 'Understanding that angles subtended by the same arc on the same side are equal'
    },
    {
      id: 'ct-same-segment-visual-proof',
      conceptId: 'ct-same-segment-visual',
      conceptName: 'Visual Understanding',
      type: 'learning',
      description: 'Visualizing how multiple points on the same arc create equal angles'
    },
    {
      id: 'ct-same-segment-applications',
      conceptId: 'ct-same-segment-apps',
      conceptName: 'Applications',
      type: 'learning',
      description: 'Understanding practical applications of the same segment theorem'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Chord AB - ensure both points are on the circle
  const angleA = Math.PI * 0.8; // Bottom left
  const angleB = Math.PI * 0.15; // Top right
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  
  // Arc points (R, Q, P) on major segment - positioned on opposite side of chord
  const baseAngle = (angleA + angleB) / 2 + Math.PI; // opposite side of chord for major segment
  const angleR = baseAngle - 0.4; // R comes first
  const angleQ = baseAngle; // Q in middle  
  const angleP = baseAngle + 0.4; // P comes last before B
  
  const Rx = cx + r * Math.cos(angleR), Ry = cy + r * Math.sin(angleR);
  const Qx = cx + r * Math.cos(angleQ), Qy = cy + r * Math.sin(angleQ);
  const Px = cx + r * Math.cos(angleP), Py = cy + r * Math.sin(angleP);

  // Helper for angle arc at a vertex (always draws minor angle)
  function angleArc(x: number, y: number, ax: number, ay: number, bx: number, by: number, radius = 18) {
    let angle1 = Math.atan2(ay - y, ax - x);
    let angle2 = Math.atan2(by - y, bx - x);
    
    // Normalize angles to [0, 2π]
    if (angle1 < 0) angle1 += 2 * Math.PI;
    if (angle2 < 0) angle2 += 2 * Math.PI;
    
    // Calculate difference, always take the minor angle
    let diff = angle2 - angle1;
    if (diff < 0) diff += 2 * Math.PI;
    if (diff > Math.PI) {
      // Swap angles to get minor angle
      [angle1, angle2] = [angle2, angle1];
      diff = 2 * Math.PI - diff;
    }
    
    const arcX1 = x + radius * Math.cos(angle1);
    const arcY1 = y + radius * Math.sin(angle1);
    const arcX2 = x + radius * Math.cos(angle2);
    const arcY2 = y + radius * Math.sin(angle2);
    
    // Label at arc midpoint (minor angle)
    const mid = angle1 + diff / 2;
    const labelX = x + (radius + 15) * Math.cos(mid);
    const labelY = y + (radius + 15) * Math.sin(mid);
    
    return { 
      arc: `M ${arcX1} ${arcY1} A ${radius} ${radius} 0 0 1 ${arcX2} ${arcY2}`, 
      labelX, 
      labelY 
    };
  }

  const TheoremDiagram = () => {
    // State to manage the current step
    const [step, setStep] = useState(0);

    // Coordinate constants for the diagram
    const cx = 200;
    const cy = 175;
    const r = 120;
    const angleA = Math.PI / 4;
    const angleB = (3 * Math.PI) / 4;
    const angleR = 0;
    const angleQ = Math.PI / 2;
    const angleP = Math.PI;

    const Ax = cx + r * Math.cos(angleA);
    const Ay = cy + r * Math.sin(angleA);
    const Bx = cx + r * Math.cos(angleB);
    const By = cy + r * Math.sin(angleB);
    const Rx = cx + r * Math.cos(angleR);
    const Ry = cy + r * Math.sin(angleR);
    const Qx = cx + r * Math.cos(angleQ);
    const Qy = cy + r * Math.sin(angleQ);
    const Px = cx + r * Math.cos(angleP);
    const Py = cy + r * Math.sin(angleP);

    // This is a placeholder for the angleArc function
    const angleArc = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, radius?: number) => {
        // Implementation would go here
        return {
            arc: "",
            labelX: 0,
            labelY: 0
        };
    };

    // The steps for the explanation
    const steps = [
        { title: "Introduction", description: "Click 'Next' to explore the Same Segment Theorem, which relates angles subtended by the same arc." },
        { title: "Step 1: The Chord", description: "We start with a circle and a chord AB. This chord divides the circle into two segments." },
        { title: "Step 2: First Angle", description: "We place a point R on the circumference in the major segment and form the angle ∠ARB." },
        { title: "Step 3: Second Angle", description: "We add another point Q in the same segment and form a new angle, ∠AQB." },
        { title: "Step 4: Third Angle", description: "Now, we add one more point P in the same segment, forming the angle ∠APB." },
        { title: "Step 5: The Angles", description: "The theorem states that all these angles, which are subtended by the same chord (AB) and lie in the same segment, are equal." },
        { title: "Step 6: The Conclusion", description: "Therefore, ∠ARB = ∠AQB = ∠APB. Angles in the same segment of a circle are equal." }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            {/* 1. Headline */}
            <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">The Same Segment Theorem</h1>
            
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
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Same Segment Theorem</h3>
                    <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
                        {/* Circle */}
                        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
                        {/* Center */}
                        <circle cx={cx} cy={cy} r={3} fill="#374151" />
                        <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="12" fontWeight="bold">O</text>
                        {/* Chord AB */}
                        {step >= 1 && (
                            <g>
                                <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke="#000" strokeWidth="4" />
                                <circle cx={Ax} cy={Ay} r={4} fill="#000" />
                                <circle cx={Bx} cy={By} r={4} fill="#000" />
                                <text x={Ax - 15} y={Ay + 20} fill="#000" fontSize="16" fontWeight="bold">A</text>
                                <text x={Bx + 8} y={By - 8} fill="#000" fontSize="16" fontWeight="bold">B</text>
                            </g>
                        )}
                        {/* Point R - show first */}
                        {step >= 2 && (
                            <g>
                                <circle cx={Rx} cy={Ry} r={5} fill="#8B5CF6" />
                                <text x={Rx + (Rx > cx ? 12 : -20)} y={Ry + (Ry > cy ? 18 : -8)} fill="#8B5CF6" fontSize="16" fontWeight="bold">R</text>
                                <line x1={Ax} y1={Ay} x2={Rx} y2={Ry} stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3,3" />
                                <line x1={Bx} y1={By} x2={Rx} y2={Ry} stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3,3" />
                            </g>
                        )}
                        {/* Point Q - show second */}
                        {step >= 3 && (
                            <g>
                                <circle cx={Qx} cy={Qy} r={5} fill="#10B981" />
                                <text x={Qx + (Qx > cx ? 12 : -20)} y={Qy + (Qy > cy ? 18 : -8)} fill="#10B981" fontSize="16" fontWeight="bold">Q</text>
                                <line x1={Ax} y1={Ay} x2={Qx} y2={Qy} stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
                                <line x1={Bx} y1={By} x2={Qx} y2={Qy} stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
                            </g>
                        )}
                        {/* Point P - show third */}
                        {step >= 4 && (
                            <g>
                                <circle cx={Px} cy={Py} r={5} fill="#3B82F6" />
                                <text x={Px + (Px > cx ? 12 : -20)} y={Py + (Py > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">P</text>
                                <line x1={Ax} y1={Ay} x2={Px} y2={Py} stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3" />
                                <line x1={Bx} y1={By} x2={Px} y2={Py} stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3" />
                            </g>
                        )}
                        {/* Angle markings */}
                        {step >= 5 && (
                            <g>
                                {/* Angle ARB */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(Rx, Ry, Ax, Ay, Bx, By);
                                    return <>
                                        <path d={arc} fill="none" stroke="#8B5CF6" strokeWidth="3" />
                                        <text x={labelX} y={labelY} fill="#8B5CF6" fontSize="12" fontWeight="bold" alignmentBaseline="middle" textAnchor="middle">∠ARB</text>
                                    </>;
                                })()}
                                {/* Angle AQB */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(Qx, Qy, Ax, Ay, Bx, By);
                                    return <>
                                        <path d={arc} fill="none" stroke="#10B981" strokeWidth="3" />
                                        <text x={labelX} y={labelY} fill="#10B981" fontSize="12" fontWeight="bold" alignmentBaseline="middle" textAnchor="middle">∠AQB</text>
                                    </>;
                                })()}
                                {/* Angle APB */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(Px, Py, Ax, Ay, Bx, By);
                                    return <>
                                        <path d={arc} fill="none" stroke="#3B82F6" strokeWidth="3" />
                                        <text x={labelX} y={labelY} fill="#3B82F6" fontSize="12" fontWeight="bold" alignmentBaseline="middle" textAnchor="middle">∠APB</text>
                                    </>;
                                })()}
                            </g>
                        )}
                        {/* Same side highlighting */}
                        {step >= 6 && (
                            <g>
                                <text x="200" y="370" fill="#F59E0B" fontSize="12" fontWeight="bold">Arc AB</text>
                                <defs>

                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
                                    </marker>
                                </defs>
                                {/* Highlight the major arc AB (same side as R, Q, P) */}
                                <path d={`M ${Ax} ${Ay} A ${r} ${r} 0 1 1 ${Bx} ${By}`} fill="none" stroke="#F59E0B" strokeWidth="6" strokeOpacity="0.6" />
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
        {/* Left column - Theorem Statement */}
        <div className="space-y-6">
          {/* Main Theorem */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem Statement:</h3>
                  <p className="font-medium">
                    Angles subtended by the same arc from any points on the <strong>same side</strong> of the chord are equal.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">In Mathematical Terms:</h3>
                  <p>If points P, Q, R are on the same arc segment, then:</p>
                  <p className="font-bold text-center mt-2">∠APB = ∠AQB = ∠ARB</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Condition:</h3>
                  <p>
                    All points must be on the <strong>same side</strong> of the chord AB. Points on opposite sides will create supplementary angles.
                  </p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Visual Understanding */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Why Are They Equal?
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <p>
                  Each angle "sees" the same arc AB. Since the arc length remains constant, all angles subtended by this arc from the same side are equal.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Intuitive Understanding:</h3>
                  <ul className="space-y-2">
                    <li>• Same arc = Same "view" of the chord</li>
                    <li>• Same side = Same orientation</li>
                    <li>• Equal angles = Predictable relationship</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Diagram and Applications */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <TheoremDiagram />
          
          {/* Applications */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Applications
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Geometry Problems:</h4>
                  <p className="text-sm">Finding unknown angles when points lie on the same arc</p>
                </div>
                
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h4 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Cyclic Quadrilaterals:</h4>
                  <p className="text-sm">Foundation for understanding opposite angles in cyclic quadrilaterals</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h4 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Construction:</h4>
                  <p className="text-sm">Creating angles of equal measure using circle properties</p>
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
      slideId="ct-same-segment-theorem-statement"
      slideTitle="Same Segment Theorem"
      moduleId="circle-theorems-0001"
      submoduleId="same-segment-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 
 