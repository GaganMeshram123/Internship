import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function TangentRadiusPerpendicularitySlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: proof by contradiction, 3: assumptions, 4: contradiction, 5: conclusion

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-perpendicularity-proof',
      conceptId: 'ct-perpendicularity-proof',
      conceptName: 'Perpendicularity Proof',
      type: 'learning',
      description: 'Understanding the proof of tangent-radius perpendicularity'
    },
    {
      id: 'ct-proof-by-contradiction',
      conceptId: 'ct-proof-by-contradiction',
      conceptName: 'Proof by Contradiction',
      type: 'learning',
      description: 'Using proof by contradiction technique'
    },
    {
      id: 'ct-distance-shortest-path',
      conceptId: 'ct-distance-shortest-path',
      conceptName: 'Shortest Distance Principle',
      type: 'learning',
      description: 'Understanding that perpendicular gives shortest distance'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Tangent point T
  const angleT = Math.PI * 0.25;
  const Tx = cx + r * Math.cos(angleT), Ty = cy + r * Math.sin(angleT);
  
  // Tangent line direction (perpendicular to radius OT)
  const tangentAngle = angleT + Math.PI / 2;
  const tangentLength = 150;
  const T1x = Tx + tangentLength * Math.cos(tangentAngle);
  const T1y = Ty + tangentLength * Math.sin(tangentAngle);
  const T2x = Tx - tangentLength * Math.cos(tangentAngle);
  const T2y = Ty - tangentLength * Math.sin(tangentAngle);
  
  // Point S on tangent (for distance comparison)
  const Sx = Tx + 60 * Math.cos(tangentAngle);
  const Sy = Ty + 60 * Math.sin(tangentAngle);

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
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Proof by Shortest Distance</h3>
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
        
        {/* Tangent line */}
        {step >= 1 && (
          <g>
            <line 
              x1={T1x} 
              y1={T1y} 
              x2={T2x} 
              y2={T2y} 
              stroke="#3B82F6" 
              strokeWidth="3"
              className="animate-[draw_1s_ease-in-out]"
            />
            <circle cx={Tx} cy={Ty} r="4" fill="#3B82F6" />
            <text x={Tx} y={Ty + 12} fill="#3B82F6" fontSize="16" fontWeight="bold">T</text>
            <text x={T1x - 30} y={T1y} fill="#3B82F6" fontSize="14" fontWeight="bold">Tangent</text>
          </g>
        )}
        
        {/* Radius OT */}
        {step >= 1 && (
          <g>
            <line 
              x1={cx} 
              y1={cy} 
              x2={Tx} 
              y2={Ty} 
              stroke="#DC2626" 
              strokeWidth="3"
              className="animate-[draw_1s_ease-in-out]"
            />
            <text x={(cx + Tx) / 2 + 7} y={(cy + Ty) / 2 - 15} fill="#DC2626" fontSize="14" fontWeight="bold">OT = r</text>
          </g>
        )}
        
        {/* Perpendicular angle marking */}
        {step >= 2 && (
          <g>
            {(() => {
              const { arc, labelX, labelY } = angleArc(Tx, Ty, cx, cy, Sx, Sy, 20);
              return <>
                <path d={arc} fill="none" stroke="#F59E0B" strokeWidth="3" />
                <text x={labelX} y={labelY} fill="#F59E0B" fontSize="12" fontWeight="bold" textAnchor="middle">90°</text>
              </>;
            })()}
            {/* Right angle square */}
          </g>
        )}
        
        {/* Alternative point S on tangent */}
        {step >= 3 && (
          <g>
            <circle 
              cx={Sx} 
              cy={Sy} 
              r="4" 
              fill="#10B981" 
              className="animate-[scale-in_0.5s_ease-out]"
            />
            <text x={Sx } y={Sy + 12} fill="#10B981" fontSize="16" fontWeight="bold">S</text>
            
            {/* Line OS */}
            <line 
              x1={cx} 
              y1={cy} 
              x2={Sx} 
              y2={Sy} 
              stroke="#10B981" 
              strokeWidth="3"
              strokeDasharray="3,3"
              className="animate-[draw_1s_ease-in-out]"
            />
            <text x={(cx + Sx) / 2 + 10} y={(cy + Sy) / 2} fill="#10B981" fontSize="14" fontWeight="bold">{'OS > r'}</text>
            
          </g>
        )}
        
        {/* Distance comparison */}
        {step >= 4 && (
          <g>
            <rect 
              x="30" y="50" width="340" height="80" 
              fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" 
              rx="10"
              className="animate-[fade-in_1s_ease-in-out]"
            />
            <text x="200" y="70" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold">
              Shortest Distance Principle
            </text>
            <text x="200" y="90" textAnchor="middle" fill="#0C4A6E" fontSize="12">
              OT = radius = r (shortest distance to tangent)
            </text>
            <text x="200" y="105" textAnchor="middle" fill="#0C4A6E" fontSize="12">
              {'OS > r (any other point on tangent is farther)'}
            </text>
            <text x="200" y="120" textAnchor="middle" fill="#DC2626" fontSize="12" fontWeight="bold">
              Tangent is perpendicular to radius at point of contact
            </text>
          </g>
        )}
        
        {/* Right angle marking */}

        
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
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Given:</h3>
                  <ul className="space-y-2">
                    <li>• Circle with center O</li>
                    <li>• Tangent line touching at point T</li>
                    <li>• Radius OT to the tangent point</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">To Prove:</h3>
                  <p className="font-medium">OT ⊥ tangent line</p>
                  <p className="text-sm mt-2">The radius is perpendicular to the tangent at T</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Proof Method:</h3>
                  <p>Use the shortest distance principle - the perpendicular from a point to a line gives the shortest distance.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Shortest Distance Principle */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Step 1: Shortest Distance
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Principle:</h3>
                  <p>The shortest distance from a point to a line is along the perpendicular from that point to the line.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Apply to Our Case:</h3>
                  <p>The distance from center O to the tangent line is exactly the radius length (100 units).</p>
                  <p className="mt-2 text-sm">This distance is achieved at point T where the tangent touches the circle.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Any Other Point:</h3>
                  <p className="text-sm">Any other point S on the tangent line is farther from O than the radius length.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Diagram and Conclusion */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <ProofDiagram />
          
          {/* Proof by Contradiction */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Step 2: Logical Conclusion
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Since OT is Shortest:</h3>
                  <p>Since OT gives the shortest distance from O to the tangent line, OT must be perpendicular to the tangent.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Geometric Fact:</h3>
                  <p>Only the perpendicular from a point to a line gives the minimum distance. Any other line segment is longer.</p>
                </div>
                
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Therefore:</h3>
                  <p className="font-bold">OT ⊥ tangent line</p>
                  <p className="text-sm mt-2">The radius to the point of tangency is perpendicular to the tangent.</p>
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
      slideId="ct-tangent-radius-perpendicularity-proof"
      slideTitle="Proof Setup"
      moduleId="circle-theorems-0001"
      submoduleId="tangent-radius-perpendicularity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 