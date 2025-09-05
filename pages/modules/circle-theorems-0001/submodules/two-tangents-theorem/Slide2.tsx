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
  const ProofDiagram = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Proof by RHS Congruence</h3>
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
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium disabled:opacity-50"
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
        >Previous</button>
        <button
          className="px-4 py-2 rounded bg-indigo-600 text-white font-medium disabled:opacity-50"
          onClick={() => setStep(s => Math.min(6, s + 1))}
          disabled={step === 6}
        >Next</button>
      </div>
    </div>
  );

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
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Given:</h3>
                  <ul className="space-y-2">
                    <li>• Circle with center O</li>
                    <li>• External point P</li>
                    <li>• PA and PB are tangents to the circle</li>
                    <li>• A and B are points of tangency</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-purple-700 dark:text-purple-300 mb-3">To Prove:</h3>
                  <ul className="space-y-1">
                    <li>1. PA = PB (equal tangent lengths)</li>
                    <li>2. ∠APO = ∠BPO (angle bisector)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-indigo-700 dark:text-indigo-300 mb-3">Proof Strategy:</h3>
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
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
                Step 1: Identify Triangles
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-green-700 dark:text-green-300 mb-3">Triangle OAP:</h3>
                  <ul className="space-y-1">
                    <li>• Vertices: O (center), A (tangent point), P (external point)</li>
                    <li>• Right angle at A (tangent ⊥ radius)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-teal-700 dark:text-teal-300 mb-3">Triangle OBP:</h3>
                  <ul className="space-y-1">
                    <li>• Vertices: O (center), B (tangent point), P (external point)</li>
                    <li>• Right angle at B (tangent ⊥ radius)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-cyan-700 dark:text-cyan-300 mb-3">Goal:</h3>
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
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                Step 2: RHS Congruence
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-amber-700 dark:text-amber-300 mb-3">Right Angles:</h3>
                  <p>∠OAP = ∠OBP = 90° (tangent perpendicular to radius)</p>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-orange-700 dark:text-orange-300 mb-3">Hypotenuse:</h3>
                  <p>OP = OP (common side to both triangles)</p>
                </div>
                
                <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-red-700 dark:text-red-300 mb-3">Side:</h3>
                  <p>OA = OB (both are radii of the same circle)</p>
                </div>
                
                <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-rose-700 dark:text-rose-300 mb-3">Conclusion:</h3>
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
 