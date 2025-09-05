import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function SameSegmentTheoremSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(1); // 1: circle, 2: chord, 3: points, 4: radii, 5: triangles, 6: central angle, 7: equality

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-same-segment-proof-setup',
      conceptId: 'ct-same-segment-proof-setup',
      conceptName: 'Proof Setup',
      type: 'learning',
      description: 'Understanding the geometric setup for proving the same segment theorem'
    },
    {
      id: 'ct-isosceles-triangles-concept',
      conceptId: 'ct-isosceles-triangles',
      conceptName: 'Isosceles Triangles',
      type: 'learning',
      description: 'Recognizing isosceles triangles formed by radii in circle proofs'
    },
    {
      id: 'ct-central-angle-relationship',
      conceptId: 'ct-central-angle',
      conceptName: 'Central Angle Relationship',
      type: 'learning',
      description: 'Understanding how central angles relate to inscribed angles'
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
  // Arc points (P, Q) on major segment - positioned on opposite side of chord
  const arcMid = (angleA + angleB) / 2 + Math.PI; // opposite side of chord for major segment
  const arcQ = arcMid + 0.4;
  const Px = cx + r * Math.cos(arcMid), Py = cy + r * Math.sin(arcMid);
  const Qx = cx + r * Math.cos(arcQ), Qy = cy + r * Math.sin(arcQ);

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

  // SVG Proof Diagram Component
  const ProofDiagram = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Proof Visualization</h3>
      <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
        {step >= 1 && (
          <>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="4" fill="#DC2626" />
            <text x={cx + 10} y={cy - 2} fill="#DC2626" fontSize="14" fontWeight="bold">O</text>
          </>
        )}
        
        {step >= 2 && (
          <g>
            <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke="#000" strokeWidth="4" />
            <circle cx={Ax} cy={Ay} r="4" fill="#000" />
            <circle cx={Bx} cy={By} r="4" fill="#000" />
            <text x={Ax - 15} y={Ay + 20} fill="#000" fontSize="16" fontWeight="bold">A</text>
            <text x={Bx + 8} y={By - 8} fill="#000" fontSize="16" fontWeight="bold">B</text>
          </g>
        )}
        
        {step >= 3 && (
          <g>
            <circle cx={Px} cy={Py} r="5" fill="#3B82F6" />
            <text x={Px + (Px > cx ? 12 : -20)} y={Py + (Py > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">P</text>
            
            <circle cx={Qx} cy={Qy} r="5" fill="#10B981" />
            <text x={Qx + (Qx > cx ? 12 : -20)} y={Qy + (Qy > cy ? 18 : -8)} fill="#10B981" fontSize="16" fontWeight="bold">Q</text>
          </g>
        )}
        
        {step >= 4 && (
          <g>
            {/* Radii */}
            <line x1={cx} y1={cy} x2={Ax} y2={Ay} stroke="#DC2626" strokeWidth="2" strokeDasharray="5,5" />
            <line x1={cx} y1={cy} x2={Bx} y2={By} stroke="#DC2626" strokeWidth="2" strokeDasharray="5,5" />
            <line x1={cx} y1={cy} x2={Px} y2={Py} stroke="#DC2626" strokeWidth="2" strokeDasharray="5,5" />
            <line x1={cx} y1={cy} x2={Qx} y2={Qy} stroke="#DC2626" strokeWidth="2" strokeDasharray="5,5" />
            
            {/* Chords */}
            <line x1={Ax} y1={Ay} x2={Px} y2={Py} stroke="#3B82F6" strokeWidth="2" />
            <line x1={Bx} y1={By} x2={Px} y2={Py} stroke="#3B82F6" strokeWidth="2" />
            <line x1={Ax} y1={Ay} x2={Qx} y2={Qy} stroke="#10B981" strokeWidth="2" />
            <line x1={Bx} y1={By} x2={Qx} y2={Qy} stroke="#10B981" strokeWidth="2" />
          </g>
        )}
        
        {step >= 5 && (
          <g>
            {/* Isosceles triangle highlights */}
            <polygon 
              points={`${cx},${cy} ${Ax},${Ay} ${Px},${Py}`} 
              fill="#FFD700" 
              fillOpacity="0.3" 
              stroke="#FFD700" 
              strokeWidth="2"
            />
            <polygon 
              points={`${cx},${cy} ${Bx},${By} ${Px},${Py}`} 
              fill="#FF6B6B" 
              fillOpacity="0.3" 
              stroke="#FF6B6B" 
              strokeWidth="2"
            />
            <text x={cx - 50} y={cy + 50} fill="#FFD700" fontSize="12" fontWeight="bold">△OAP</text>
            <text x={cx + 30} y={cy - 30} fill="#FF6B6B" fontSize="12" fontWeight="bold">△OBP</text>
          </g>
        )}
        
        {step >= 6 && (
          <g>
            {/* Central angle AOB */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(cx, cy, Ax, Ay, Bx, By, 35);
              return <>
                <path d={arc} fill="none" stroke="#8B5CF6" strokeWidth="4" />
                <text x={labelX} y={labelY} fill="#8B5CF6" fontSize="14" fontWeight="bold" textAnchor="middle">∠AOB</text>
              </>;
            })()}
          </g>
        )}
        
        {step >= 7 && (
          <g>
            {/* Angle APB */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(Px, Py, Ax, Ay, Bx, By, 20);
              return <>
                <path d={arc} fill="none" stroke="#3B82F6" strokeWidth="3" />
                <text x={labelX} y={labelY} fill="#3B82F6" fontSize="12" fontWeight="bold" textAnchor="middle">∠APB</text>
              </>;
            })()}
            
            {/* Angle AQB */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(Qx, Qy, Ax, Ay, Bx, By, 20);
              return <>
                <path d={arc} fill="none" stroke="#10B981" strokeWidth="3" />
                <text x={labelX} y={labelY} fill="#10B981" fontSize="12" fontWeight="bold" textAnchor="middle">∠AQB</text>
              </>;
            })()}
            
            {/* Equality symbol */}
            <text x="50" y="320" fill="#000" fontSize="16" fontWeight="bold">∠APB = ∠AQB</text>
          </g>
        )}
      </svg>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium disabled:opacity-50"
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
        >Previous</button>
        <button
          className="px-4 py-2 rounded bg-indigo-600 text-white font-medium disabled:opacity-50"
          onClick={() => setStep(s => Math.min(7, s + 1))}
          disabled={step === 7}
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
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Given:</h3>
                  <ul className="space-y-2">
                    <li>• Circle with center O</li>
                    <li>• Chord AB</li>
                    <li>• Points P, Q on same arc segment</li>
                  </ul>
                </div>
                
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="ttext-xl font-medium text-blue-700 dark:text-blue-300 mb-3">To Prove:</h3>
                  <p className="font-medium">∠APB = ∠AQB</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Strategy:</h3>
                  <p>Use properties of isosceles triangles and central angles</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Isosceles Triangles */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Step 1: Isosceles Triangles
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Insight:</h3>
                  <p>Triangles OAP and OBP are isosceles because:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• OA = OP (both radii)</li>
                    <li>• OB = OP (both radii)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Therefore:</h3>
                  <p>In △OAP: ∠OAP = ∠OPA</p>
                  <p>In △OBP: ∠OBP = ∠OPB</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Central Angle and Completion */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <ProofDiagram />
          
          {/* Central Angle Relationship */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Step 2: Central Angle
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Central Angle ∠AOB:</h3>
                  <p>This angle is the same for both triangles OAP and OAQ because it depends only on the arc AB, not on the position of P or Q.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Exterior Angle Theorem:</h3>
                  <p>In each isosceles triangle:</p>
                  <p className="font-medium mt-2">∠APB = ½∠AOB</p>
                  <p className="font-medium">∠AQB = ½∠AOB</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Conclusion:</h3>
                  <p className="font-bold">∠APB = ∠AQB ✓</p>
                  <p className="text-sm mt-2 italic">Both angles equal half the central angle</p>
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
      slideId="ct-same-segment-theorem-proof"
      slideTitle="Proof Setup"
      moduleId="circle-theorems-0001"
      submoduleId="same-segment-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 
 