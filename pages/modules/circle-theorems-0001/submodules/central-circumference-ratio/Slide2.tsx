import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function CentralCircumferenceRatioSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: radii, 3: isosceles triangles, 4: exterior angles, 5: equation, 6: final result

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-proof-setup',
      conceptId: 'ct-proof-setup',
      conceptName: 'Proof Setup',
      type: 'learning',
      description: 'Understanding the geometric setup for proving the central-circumference ratio'
    },
    {
      id: 'ct-isosceles-triangles',
      conceptId: 'ct-isosceles-triangles',
      conceptName: 'Isosceles Triangles',
      type: 'learning',
      description: 'Recognizing isosceles triangles formed by radii'
    },
    {
      id: 'ct-triangle-angle-sum',
      conceptId: 'ct-triangle-angle-sum',
      conceptName: 'Triangle Angle Sum Method',
      type: 'learning',
      description: 'Using triangle angle sums to derive the central-circumference ratio'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Arc endpoints A and B
  const angleA = Math.PI * 0.75, angleB = Math.PI * 0.25;
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  // Point P on circumference
  const angleP = 0; // Right side
  const Px = cx + r * Math.cos(angleP), Py = cy + r * Math.sin(angleP);

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
const ProofDiagram = () => {
    // State to manage the current step
    const [step, setStep] = useState(0);

    // Coordinate constants for the diagram
    const r = 120;
    const cx = 200;
    const cy = 175;
    const angleA = Math.PI / 4;
    const angleB = (3 * Math.PI) / 4;
    const angleP = (7 * Math.PI) / 6;
    const Ax = cx + r * Math.cos(angleA);
    const Ay = cy - r * Math.sin(angleA);
    const Bx = cx + r * Math.cos(angleB);
    const By = cy - r * Math.sin(angleB);
    const Px = cx + r * Math.cos(angleP);
    const Py = cy - r * Math.sin(angleP);
    
    // Placeholder for angleArc function
    const angleArc = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, radius: number) => {
      // This is a placeholder function
      return { arc: "", labelX: 0, labelY: 0 };
    };

    // The steps for the proof
    const steps = [
        { title: "Introduction", description: "Click 'Next' to begin the visual proof of the Central vs Inscribed Angle Theorem." },
        { title: "Step 1: The Setup", description: "We start with a circle and the key points: the center O, and points A, B, and P on the circumference." },
        { title: "Step 2: Connect the Radii", description: "Draw radii from the center O to points A, B, and P. These lines are all equal in length." },
        { title: "Step 3: Identify Isosceles Triangles", description: "Notice the two isosceles triangles formed: △OAP and △OBP. The sides OA, OP, and OB are all radii (r)." },
        { title: "Step 4: Analyze the Angles", description: "We can now identify the equal base angles within these isosceles triangles. We'll use these to prove the theorem." },
        { title: "Step 5: The Equation", description: "By applying the exterior angle theorem, we can derive the final equation: the central angle equals twice the inscribed angle." },
        { title: "Step 6: Final Conclusion", description: "This visual proof demonstrates that the relationship Central Angle = 2 × Inscribed Angle is a direct result of simple geometric principles." }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
            {/* 1. Headline */}
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">Visual Proof of the Theorem</h1>

            {/* 2. Steps */}
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
                <div className="p-6 bg-blue-50 dark:bg-slate-800 rounded-xl shadow-inner border border-blue-100 dark:border-slate-700 transition-all duration-300">
                    <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300 animate-slide-in-up">
                        {steps[step].title}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mt-3 leading-relaxed text-base animate-fade-in-slow">
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
                 <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">Proof Visualization</h3>
                    <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
                        {/* Circle */}
                        {step >= 1 && (
                            <circle 
                                cx="200" 
                                cy="175" 
                                r="120" 
                                fill="none" 
                                stroke="#64748B" 
                                strokeWidth="2"
                                className="animate-[draw_1s_ease-in-out]"
                            />
                        )}
                        
                        {/* Center O */}
                        {step >= 1 && (
                            <g>
                                <circle cx={cx} cy={cy} r="4" fill="#3B82F6" />
                                <text x={cx + 10} y={cy - 2} fill="#3B82F6" fontSize="14" fontWeight="bold">O</text>
                            </g>
                        )}
                        
                        {/* Points A, B, P */}
                        {step >= 1 && (
                            <g>
                                <circle cx={Ax} cy={Ay} r="4" fill="#000000" />
                                <circle cx={Bx} cy={By} r="4" fill="#000000" />
                                <circle cx={Px} cy={Py} r="4" fill="#3B82F6" />
                                <text x={Ax - 10} y={Ay - 10} fill="#000000" fontSize="16" fontWeight="bold">A</text>
                                <text x={Bx + 10} y={By - 10} fill="#000000" fontSize="16" fontWeight="bold">B</text>
                                <text x={Px + 10} y={Py - 10} fill="#3B82F6" fontSize="16" fontWeight="bold">P</text>
                                
                                {/* Lines AP and BP */}
                                <line x1={Ax} y1={Ay} x2={Px} y2={Py} stroke="#3B82F6" strokeWidth="2" />
                                <line x1={Bx} y1={By} x2={Px} y2={Py} stroke="#3B82F6" strokeWidth="2" />
                            </g>
                        )}
                        
                        {/* Radii */}
                        {step >= 2 && (
                            <g>
                                <line 
                                    x1={cx} y1={cy} x2={Ax} y2={Ay} 
                                    stroke="#DC2626" strokeWidth="3" strokeDasharray="5,5"
                                    className="animate-[draw_0.8s_ease-in-out]"
                                />
                                <line 
                                    x1={cx} y1={cy} x2={Bx} y2={By} 
                                    stroke="#DC2626" strokeWidth="3" strokeDasharray="5,5"
                                    className="animate-[draw_0.8s_ease-in-out]"
                                />
                                <line 
                                    x1={cx} y1={cy} x2={Px} y2={Py} 
                                    stroke="#DC2626" strokeWidth="3" strokeDasharray="5,5"
                                    className="animate-[draw_0.8s_ease-in-out]"
                                />
                            </g>
                        )}
                        
                        {/* Isosceles triangles highlighting */}
                        {step >= 3 && step < 4 && (
                            <g>
                                {/* Triangle OAP */}
                                <path 
                                    d={`M ${cx} ${cy} L ${Ax} ${Ay} L ${Px} ${Py} Z`} 
                                    fill="#FFD700" 
                                    fillOpacity="0.3"
                                    stroke="#FFD700" 
                                    strokeWidth="2"
                                    className="animate-[fade-in_1s_ease-in-out]"
                                />
                                <text x={(cx + Ax + Px) / 3} y={(cy + Ay + Py) / 3} fill="#FFD700" fontSize="12" fontWeight="bold">△OAP</text>
                                {/* Triangle OBP */}
                                <path 
                                    d={`M ${cx} ${cy} L ${Bx} ${By} L ${Px} ${Py} Z`} 
                                    fill="#FF6B35" 
                                    fillOpacity="0.3"
                                    stroke="#FF6B35" 
                                    strokeWidth="2"
                                    className="animate-[fade-in_1s_ease-in-out]"
                                />
                                <text x={(cx + Bx + Px) / 3} y={(cy + By + Py) / 3} fill="#FF6B35" fontSize="12" fontWeight="bold">△OBP</text>
                                {/* Equal sides markings */}
                                <text x={(cx + Ax) / 2 - 10} y={(cy + Ay) / 2} fill="#FFD700" fontSize="10" fontWeight="bold">r</text>
                                <text x={(cx + Bx) / 2 + 10} y={(cy + By) / 2} fill="#FF6B35" fontSize="10" fontWeight="bold">r</text>
                                <text x={(cx + Px) / 2} y={(cy + Py) / 2 - 10} fill="#DC2626" fontSize="10" fontWeight="bold">r</text>
                            </g>
                        )}
                        {/* Isosceles triangles highlighting (no labels) */}
                        {step === 4 && (
                            <g>
                                {/* Triangle OAP */}
                                <path 
                                    d={`M ${cx} ${cy} L ${Ax} ${Ay} L ${Px} ${Py} Z`} 
                                    fill="#FFD700" 
                                    fillOpacity="0.3"
                                    stroke="#FFD700" 
                                    strokeWidth="2"
                                    className="animate-[fade-in_1s_ease-in-out]"
                                />
                                {/* Triangle OBP */}
                                <path 
                                    d={`M ${cx} ${cy} L ${Bx} ${By} L ${Px} ${Py} Z`} 
                                    fill="#FF6B35" 
                                    fillOpacity="0.3"
                                    stroke="#FF6B35" 
                                    strokeWidth="2"
                                    className="animate-[fade-in_1s_ease-in-out]"
                                />
                                {/* Equal sides markings */}
                                <text x={(cx + Ax) / 2 - 10} y={(cy + Ay) / 2} fill="#FFD700" fontSize="10" fontWeight="bold">r</text>
                                <text x={(cx + Bx) / 2 + 10} y={(cy + By) / 2} fill="#FF6B35" fontSize="10" fontWeight="bold">r</text>
                                <text x={(cx + Px) / 2} y={(cy + Py) / 2 - 10} fill="#DC2626" fontSize="10" fontWeight="bold">r</text>
                            </g>
                        )}
                        
                        {/* Exterior angle demonstration */}
                        {step >= 4 && (
                            <g>
                                {/* Central angle AOB */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(cx, cy, Ax, Ay, Bx, By, 35);
                                    return <>
                                        <path d={arc} fill="none" stroke="#8B5CF6" strokeWidth="4" className="animate-pulse" />
                                        <text x={labelX} y={labelY} fill="#8B5CF6" fontSize="12" fontWeight="bold" textAnchor="middle">∠AOB</text>
                                    </>;
                                })()}
                                
                                {/* Inscribed angle APB */}
                                {(() => {
                                    const { arc, labelX, labelY } = angleArc(Px, Py, Ax, Ay, Bx, By, 25);
                                    return <>
                                        <path d={arc} fill="none" stroke="#10B981" strokeWidth="3" className="animate-pulse" />
                                        <text x={labelX} y={labelY} fill="#10B981" fontSize="12" fontWeight="bold" textAnchor="middle">∠APB</text>
                                    </>;
                                })()}
                                
                                {/* Base angles in triangle OAP */}
                                {(() => {
                                    const { arc: arc1, labelX: labelX1, labelY: labelY1 } = angleArc(Ax, Ay, cx, cy, Px, Py, 15);
                                    const { arc: arc2, labelX: labelX2, labelY: labelY2 } = angleArc(Px, Py, Ax, Ay, cx, cy, 15);
                                    return <>
                                        <path d={arc1} fill="none" stroke="#FFD700" strokeWidth="2" />
                                        <text x={labelX1} y={labelY1} fill="#FFD700" fontSize="10" textAnchor="middle">α</text>
                                        <path d={arc2} fill="none" stroke="#FFD700" strokeWidth="2" />
                                        <text x={labelX2} y={labelY2} fill="#FFD700" fontSize="10" textAnchor="middle">α</text>
                                    </>;
                                })()}
                                
                                {/* Base angles in triangle OBP */}
                                {(() => {
                                    const { arc: arc1, labelX: labelX1, labelY: labelY1 } = angleArc(Bx, By, cx, cy, Px, Py, 15);
                                    const { arc: arc2, labelX: labelX2, labelY: labelY2 } = angleArc(Px, Py, Bx, By, cx, cy, 15);
                                    return <>
                                        <path d={arc1} fill="none" stroke="#FF6B35" strokeWidth="2" />
                                        <text x={labelX1} y={labelY1} fill="#FF6B35" fontSize="10" textAnchor="middle">β</text>
                                        <path d={arc2} fill="none" stroke="#FF6B35" strokeWidth="2" />
                                        <text x={labelX2} y={labelY2} fill="#FF6B35" fontSize="10" textAnchor="middle">β</text>
                                    </>;
                                })()}
                            </g>
                        )}
                        
                        {/* Equation demonstration */}
                        {step >= 5 && (
                            <g>
                                {/* Equation box */}
                                <rect 
                                    x="30" y="280" width="340" height="60" 
                                    fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" 
                                    rx="10"
                                    className="animate-[fade-in_1s_ease-in-out]"
                                />
                                <text x="200" y="300" textAnchor="middle" fill="#1E40AF" fontSize="14" fontWeight="bold">
                                    Triangle Angle Sum Method:
                                </text>
                                <text x="200" y="318" textAnchor="middle" fill="#1E40AF" fontSize="12">
                                    ∠AOB = (180° - 2α) - (180° - 2β) = 2(β - α) = 2∠APB
                                </text>
                                <text x="200" y="332" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="bold">
                                    Therefore: Central Angle = 2 × Inscribed Angle
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
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Given:</h3>
              <ul className="space-y-2">
                <li>• Circle with center O</li>
                <li>• Arc AB subtends central ∠AOB</li>
                <li>• Same arc subtends inscribed ∠APB</li>
                <li>• P is on the circumference</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">To Prove:</h3>
              <p className="font-medium">∠AOB = 2 × ∠APB</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Strategy:</h3>
              <p>Use properties of isosceles triangles and exterior angle theorem</p>
            </div>
          </div>
        </TrackedInteraction>

        {/* Isosceles Triangles */}
        <TrackedInteraction 
          interaction={slideInteractions[1]} 
          onInteractionComplete={handleInteractionComplete}
        >
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Identify Isosceles Triangles:</h3>
              <p>△OAP and △OBP are both isosceles because:</p>
              <ul className="mt-2 space-y-1">
                <li>• OA = OP = OB (all radii)</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Base Angles:</h3>
              <p>In △OAP: ∠OAP = ∠OPA = α</p>
              <p>In △OBP: ∠OBP = ∠OPB = β</p>
              <p className="mt-2 text-sm italic">Base angles in isosceles triangles are equal</p>
            </div>
          </div>
        </TrackedInteraction>

      </div>

      {/* Right column - Diagram and Completion */}
      <div className="space-y-6">
        
        {/* Interactive Diagram */}
        <ProofDiagram />
        
        {/* Triangle Angle Sum Method */}
        <TrackedInteraction 
          interaction={slideInteractions[2]} 
          onInteractionComplete={handleInteractionComplete}
        >
          <div className="space-y-4">
            <div className="bg-yellow-50/60 border border-yellow-200 dark:bg-yellow-900/40 dark:border-yellow-700/50 rounded-xl px-6 py-4">
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">Triangle Angle Sums:</h3>
              <p>In △OAP: ∠AOP = 180° - 2α</p>
              <p>In △OBP: ∠BOP = 180° - 2β</p>
              <p className="text-sm mt-2 italic">(Sum of angles in a triangle = 180°)</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Central Angle:</h3>
              <p>∠AOB = ∠AOP - ∠BOP</p>
              <p className="mt-2">∠AOB = (180° - 2α) - (180° - 2β)</p>
              <p className="mt-2">∠AOB = 180° - 2α - 180° + 2β</p>
              <p className="mt-2 font-semibold">∠AOB = 2β - 2α = 2(β - α)</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Inscribed Angle:</h3>
              <p>∠APB = β - α</p>
              <p className="text-sm mt-1 italic">(Difference of the two base angles)</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">  
              <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Conclusion:</h3>
              <p className="font-bold">∠AOB = 2(β - α) = 2∠APB ✓</p>
              <p className="text-sm mt-2 italic">Central angle is twice the inscribed angle</p>
            </div>
          </div>
        </TrackedInteraction>
      </div>

    </div>
  </div>
);

  return (
    <SlideComponentWrapper
      slideId="ct-central-circumference-ratio-proof"
      slideTitle="Central-Circumference Ratio Proof"
      moduleId="circle-theorems-0001"
      submoduleId="central-circumference-ratio"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 