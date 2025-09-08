import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function TwoTangentsTheoremSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: triangles, 3: congruence, 4: equal sides, 5: angle bisector, 6: conclusion

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-two-tangents-proof',
      conceptId: 'ct-two-tangents-proof',
      conceptName: 'Two Tangents Proof',
      type: 'learning',
      description: 'Understanding the proof of two tangents theorem'
    },
    {
      id: 'ct-congruent-triangles',
      conceptId: 'ct-congruent-triangles',
      conceptName: 'Congruent Triangles',
      type: 'learning',
      description: 'Using congruent triangles in the proof'
    },
    {
      id: 'ct-angle-bisector-property',
      conceptId: 'ct-angle-bisector-property',
      conceptName: 'Angle Bisector Property',
      type: 'learning',
      description: 'Understanding the angle bisector property'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // External point P
  const Px = cx + 180, Py = cy;
  // Calculate tangent points using geometry
  const d = Math.sqrt((Px - cx) ** 2 + (Py - cy) ** 2);
  const angle = Math.atan2(Py - cy, Px - cx);
  const tangentAngle = Math.asin(r / d);
  
  const T1x = cx + r * Math.cos(angle - tangentAngle);
  const T1y = cy + r * Math.sin(angle - tangentAngle);
  const T2x = cx + r * Math.cos(angle + tangentAngle);
  const T2y = cy + r * Math.sin(angle + tangentAngle);

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
    const Px = 350;
    const Py = 175;
    const T1x = 200 + r * Math.cos(Math.PI / 6);
    const T1y = 175 - r * Math.sin(Math.PI / 6);
    const T2x = 200 + r * Math.cos(-Math.PI / 6);
    const T2y = 175 - r * Math.sin(-Math.PI / 6);

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
        { title: "Introduction", description: "Click 'Next' to begin the visual proof that two tangents from an external point are equal in length." },
        { title: "Step 1: The Setup", description: "Start with a circle centered at O and an external point P. Points A and B are where tangents from P touch the circle." },
        { title: "Step 2: Form Triangles", description: "Draw lines to form two right-angled triangles, △OAP and △OBP. We will use these to prove our theorem." },
        { title: "Step 3: The Right Angles", description: "A key property of tangents is that they are perpendicular to the radius at the point of tangency. This gives us two 90° angles." },
        { title: "Step 4: Equal Radii", description: "Both OA and OB are radii of the same circle, so they are equal in length (OA = OB)." },
        { title: "Step 5: Common Hypotenuse", description: "The line segment OP is a common hypotenuse for both triangles, and its length is equal in both." },
        { title: "Step 6: RHS Congruence", description: "By the Right angle-Hypotenuse-Side (RHS) congruence criterion, the two triangles are congruent (△OAP ≅ △OBP), proving our theorem." }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            {/* 1. Headline */}
            <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">Proof of the Tangent Theorem</h1>
            
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
                    <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Proof by RHS Congruence</h3>
                    <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
                        {/* Circle */}
                        {step >= 1 && (
                            <circle 
                                cx={cx} 
                                cy={cy} 
                                r={r} 
                                fill="none" 
                                stroke="#64748B" 
                                strokeWidth="2"
                                className="animate-[draw_1s_ease-in-out]"
                            />
                        )}
                        
                        {/* Center O */}
                        {step >= 1 && (
                            <g>
                                <circle cx={cx} cy={cy} r="4" fill="#DC2626" />
                                <text x={cx + 10} y={cy - 2} fill="#DC2626" fontSize="14" fontWeight="bold">O</text>
                            </g>
                        )}
                        
                        {/* External point P and tangent points */}
                        {step >= 1 && (
                            <g>
                                {/* External point P */}
                                <circle cx={Px} cy={Py} r="5" fill="#DC2626" />
                                <text x={Px + 10} y={Py} fill="#DC2626" fontSize="16" fontWeight="bold">P</text>
                                
                                {/* Tangent point A */}
                                <circle cx={T1x} cy={T1y} r="4" fill="#3B82F6" />
                                <text x={T1x + (T1x > cx ? 10 : -20)} y={T1y + (T1y > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">A</text>
                                
                                {/* Tangent point B */}
                                <circle cx={T2x} cy={T2y} r="4" fill="#10B981" />
                                <text x={T2x + (T2x > cx ? 10 : -20)} y={T2y + (T2y > cy ? 18 : -8)} fill="#10B981" fontSize="16" fontWeight="bold">B</text>
                            </g>
                        )}
                        
                        {/* Triangle outlines */}
                        {step >= 2 && (
                            <g>
                                {/* Triangle OAP */}
                                <path 
                                    d={`M ${cx} ${cy} L ${T1x} ${T1y} L ${Px} ${Py} Z`} 
                                    fill="rgba(59, 130, 246, 0.2)" 
                                    stroke="#3B82F6" 
                                    strokeWidth="3"
                                    className="animate-[draw_2s_ease-in-out]"
                                />
                                <text x={(cx + T1x + Px) / 3 - 20} y={(cy + T1y + Py) / 3} fill="#3B82F6" fontSize="14" fontWeight="bold">△OAP</text>
                                
                                {/* Triangle OBP */}
                                <path 
                                    d={`M ${cx} ${cy} L ${T2x} ${T2y} L ${Px} ${Py} Z`} 
                                    fill="rgba(16, 185, 129, 0.2)" 
                                    stroke="#10B981" 
                                    strokeWidth="3"
                                    className="animate-[draw_2s_ease-in-out]"
                                />
                                <text x={(cx + T2x + Px) / 3 - 20} y={(cy + T2y + Py) / 3} fill="#10B981" fontSize="14" fontWeight="bold">△OBP</text>
                            </g>
                        )}
                        
                        {/* Right angles at tangent points */}
                        {step >= 3 && (
                            <g>
                                {/* Right angle at A */}
                            
                                <text x="280" y="120" fill="#F59E0B" fontSize="12" fontWeight="bold">90°</text>
                                
                                {/* Right angle at B */}
                            
                                <text x="280" y="240" fill="#F59E0B" fontSize="12" fontWeight="bold">90°</text>
                            </g>
                        )}
                        
                        {/* Equal radii markings */}
                        {step >= 4 && (
                            <g>
                                {/* OA radius */}
                                <line x1="200" y1="175" x2={T1x} y2={T1y} stroke="#8B5CF6" strokeWidth="3" />
                                <text x="190" y="140" fill="#8B5CF6" fontSize="12" fontWeight="bold">OA = r</text>
                                
                                {/* OB radius */}
                                <line x1="200" y1="175" x2={T2x} y2={T2y} stroke="#8B5CF6" strokeWidth="3" />
                                <text x="190" y="210" fill="#8B5CF6" fontSize="12" fontWeight="bold">OB = r</text>
                                
                                {/* Equal radii symbol */}
                                <text x="130" y="175" fill="#8B5CF6" fontSize="14" fontWeight="bold" className="animate-pulse">OA = OB</text>
                            </g>
                        )}
                        
                        {/* Common hypotenuse */}
                        {step >= 5 && (
                            <g>
                                <line 
                                    x1="200" y1="175" x2={Px} y2="175" 
                                    stroke="#DC2626" strokeWidth="4"
                                    className="animate-pulse"
                                />
                                <text x="250" y="190" fill="#DC2626" fontSize="14" fontWeight="bold">OP (common)</text>
                            </g>
                        )}
                        
                        {/* Congruence conclusion */}
                        {step >= 6 && (
                            <g>
                                <rect 
                                    x="30" y="20" width="340" height="80" 
                                    fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" 
                                    rx="10"
                                    className="animate-[fade-in_1s_ease-in-out]"
                                />
                                <text x="200" y="40" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold">
                                    RHS Congruence: △OAP ≅ △OBP
                                </text>
                                <text x="200" y="58" textAnchor="middle" fill="#0C4A6E" fontSize="12">
                                    Right angle + Hypotenuse + Side → Triangles are congruent
                                </text>
                                <text x="200" y="74" textAnchor="middle" fill="#0C4A6E" fontSize="12">
                                    Therefore: PA = PB and ∠APO = ∠BPO
                                </text>
                                <text x="200" y="90" textAnchor="middle" fill="#DC2626" fontSize="12" fontWeight="bold">
                                    QED: Two tangents from external point are equal!
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
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Given:</h3>
                  <ul className="space-y-2">
                    <li>• Circle with center O</li>
                    <li>• External point P</li>
                    <li>• PA and PB are tangents to the circle</li>
                    <li>• A and B are points of tangency</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">To Prove:</h3>
                  <ul className="space-y-1">
                    <li>1. PA = PB (equal tangent lengths)</li>
                    <li>2. ∠APO = ∠BPO (angle bisector)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Proof Strategy:</h3>
                  <p>Prove triangles △OAP and △OBP are congruent using RHS (Right angle-Hypotenuse-Side) congruence.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Triangle Identification */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Step 1: Identify Triangles
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Triangle OAP:</h3>
                  <ul className="space-y-1">
                    <li>• Vertices: O (center), A (tangent point), P (external point)</li>
                    <li>• Right angle at A (tangent ⊥ radius)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Triangle OBP:</h3>
                  <ul className="space-y-1">
                    <li>• Vertices: O (center), B (tangent point), P (external point)</li>
                    <li>• Right angle at B (tangent ⊥ radius)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Goal:</h3>
                  <p className="text-sm">Show these two right triangles are congruent, which will prove PA = PB and equal angles.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Diagram and RHS Proof */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <ProofDiagram />
          
          {/* RHS Congruence */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Step 2: RHS Congruence
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Right Angles:</h3>
                  <p>∠OAP = ∠OBP = 90° (tangent perpendicular to radius)</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Hypotenuse:</h3>
                  <p>OP = OP (common side to both triangles)</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Side:</h3>
                  <p>OA = OB (both are radii of the same circle)</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Conclusion:</h3>
                  <p className="font-bold">△OAP ≅ △OBP (RHS)</p>
                  <p className="text-sm mt-2">Therefore: PA = PB and ∠APO = ∠BPO</p>
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
      slideId="ct-two-tangents-theorem-proof"
      slideTitle="Proof Setup"
      moduleId="circle-theorems-0001"
      submoduleId="two-tangents-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 
 