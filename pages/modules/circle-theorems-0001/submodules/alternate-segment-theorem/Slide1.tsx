import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function AlternateSegmentTheoremSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: circle, 2: tangent, 3: chord, 4: tangent-chord angle, 5: alternate segment, 6: inscribed angle, 7: equal angles

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-alternate-segment-concept',
      conceptId: 'ct-alternate-segment',
      conceptName: 'Alternate Segment Concept',
      type: 'learning',
      description: 'Understanding the alternate segment theorem and its components'
    },
    {
      id: 'ct-tangent-chord-angle',
      conceptId: 'ct-tangent-chord-angle',
      conceptName: 'Tangent-Chord Angle',
      type: 'learning',
      description: 'Understanding the angle between tangent and chord'
    },
    {
      id: 'ct-inscribed-angle-alternate',
      conceptId: 'ct-inscribed-angle-alternate',
      conceptName: 'Inscribed Angle in Alternate Segment',
      type: 'learning',
      description: 'Understanding the inscribed angle in the alternate segment'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Tangent point T (renamed from A for clarity)
  const angleT = Math.PI * 0.25;
  const Tx = cx + r * Math.cos(angleT), Ty = cy + r * Math.sin(angleT);
  
  // Point A on circle (for chord TA)
  const angleA = Math.PI * 0.85;
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  
  // Point B in alternate segment
  const angleB = Math.PI * 1.15;
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  
  // Tangent line direction (perpendicular to radius OT)
  const tangentAngle = angleT + Math.PI / 2;
  const tangentLength = 150;
  const tangentX1 = Tx + tangentLength * Math.cos(tangentAngle);
  const tangentY1 = Ty + tangentLength * Math.sin(tangentAngle);
  const tangentX2 = Tx - tangentLength * Math.cos(tangentAngle);
  const tangentY2 = Ty - tangentLength * Math.sin(tangentAngle);

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
  const TheoremDiagram = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Alternate Segment Theorem</h3>
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
            <circle cx={cx} cy={cy} r="3" fill="#374151" />
            <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="12" fontWeight="bold">O</text>
          </g>
        )}
        
        {/* Tangent line at T */}
        {step >= 2 && (
          <g>
            {/* Tangent point T */}
            <circle cx={Tx} cy={Ty} r="4" fill="#DC2626" />
            <text x={Tx + 10} y={Ty - 10} fill="#DC2626" fontSize="16" fontWeight="bold">T</text>
            
            {/* Tangent line */}
            <line 
              x1={tangentX1} 
              y1={tangentY1} 
              x2={tangentX2} 
              y2={tangentY2} 
              stroke="#DC2626" 
              strokeWidth="3"
              className="animate-[draw_1s_ease-in-out]"
            />
            <text x={tangentX1 - 50} y={tangentY1 - 30} fill="#DC2626" fontSize="14" fontWeight="bold">Tangent at T</text>
          </g>
        )}
        
        {/* Chord TA */}
        {step >= 3 && (
          <g>
            {/* Point A on circle */}
            <circle cx={Ax} cy={Ay} r="4" fill="#3B82F6" />
            <text x={Ax + (Ax > cx ? 10 : -20)} y={Ay + (Ay > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">A</text>
            
            {/* Chord TA */}
            <line 
              x1={Tx} 
              y1={Ty} 
              x2={Ax} 
              y2={Ay} 
              stroke="#3B82F6" 
              strokeWidth="3"
              className="animate-[draw_1s_ease-in-out]"
            />
            <text x={(Tx + Ax) / 2 + 10} y={(Ty + Ay) / 2} fill="#3B82F6" fontSize="14" fontWeight="bold">Chord TA</text>
          </g>
        )}
        
        {/* Angle between tangent and chord */}
        {step >= 4 && (
          <g>
            {(() => {
              const { arc, labelX, labelY } = angleArc(Tx, Ty, tangentX1, tangentY1, Ax, Ay, 25);
              return <>
                <path d={arc} fill="none" stroke="#F59E0B" strokeWidth="3" className="animate-[draw_1s_ease-in-out]" />
                <text x={labelX} y={labelY} fill="#F59E0B" fontSize="14" fontWeight="bold" textAnchor="middle">α</text>
                <text x={labelX + 30} y={labelY + 10} fill="#F59E0B" fontSize="12" fontWeight="bold">∠TTA</text>
              </>;
            })()}
          </g>
        )}
        
        {/* Alternate segment highlight */}
        {step >= 5 && (
          <g>
            {/* Shade alternate segment */}
            <path 
              d={`M ${Tx} ${Ty} A ${r} ${r} 0 1 0 ${Ax} ${Ay} Z`} 
              fill="rgba(16, 185, 129, 0.3)" 
              stroke="#10B981" 
              strokeWidth="2"
              className="animate-[fade-in_1s_ease-in-out]"
            />
            <text x={Bx - 40} y={By} fill="#10B981" fontSize="14" fontWeight="bold">Alternate</text>
            <text x={Bx - 40} y={By + 15} fill="#10B981" fontSize="14" fontWeight="bold">Segment</text>
          </g>
        )}
        
        {/* Point B in alternate segment */}
        {step >= 6 && (
          <g>
            {/* Point B */}
            <circle cx={Bx} cy={By} r="4" fill="#8B5CF6" />
            <text x={Bx + (Bx > cx ? 10 : -20)} y={By + (By > cy ? 18 : -8)} fill="#8B5CF6" fontSize="16" fontWeight="bold">B</text>
            
            {/* Lines BT and BA */}
            <line x1={Bx} y1={By} x2={Tx} y2={Ty} stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3,3" />
            <line x1={Bx} y1={By} x2={Ax} y2={Ay} stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3,3" />
            
            {/* Inscribed angle BTA */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(Bx, By, Tx, Ty, Ax, Ay, 25);
              return <>
                <path d={arc} fill="none" stroke="#8B5CF6" strokeWidth="3" className="animate-[draw_1s_ease-in-out]" />
                <text x={labelX} y={labelY} fill="#8B5CF6" fontSize="14" fontWeight="bold" textAnchor="middle">α</text>
                <text x={labelX - 30} y={labelY + 15} fill="#8B5CF6" fontSize="12" fontWeight="bold">∠BTA</text>
              </>;
            })()}
          </g>
        )}
        
        {/* Equal angles indication */}
        {step >= 7 && (
          <g>
            <rect 
              x="10" y="280" width="380" height="50" 
              fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" 
              rx="10"
              className="animate-[fade-in_1s_ease-in-out]"
            />
            <text x="200" y="300" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold">
              Alternate Segment Theorem: ∠TAB = ∠ACB
            </text>
            <text x="200" y="318" textAnchor="middle" fill="#0C4A6E" fontSize="12">
              Angle between tangent and chord = Angle in alternate segment
            </text>
          </g>
        )}
        
        {/* Theorem statement box */}
        {step >= 7 && (
          <rect 
            x="30" y="20" width="340" height="40" 
            fill="#F3F4F6" stroke="#6B7280" strokeWidth="2" 
            rx="10"
            className="animate-[fade-in_1s_ease-in-out]"
          />
        )}
        {step >= 7 && (
          <text x="200" y="45" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="bold" className="animate-pulse">
            Tangent-Chord Angle = Inscribed Angle
          </text>
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
                    The angle between a <strong>tangent</strong> and a <strong>chord</strong> drawn from the point of tangency equals the <strong>inscribed angle</strong> in the alternate segment.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Mathematical Form:</h3>
                  <p>If tangent TA and chord AB meet at A, and C is any point in the alternate segment, then:</p>
                  <p className="font-bold text-center mt-2">∠TAB = ∠ACB</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Components:</h3>
                  <ul className="space-y-2">
                    <li>• Tangent line at point A</li>
                    <li>• Chord AB from tangent point</li>
                    <li>• Alternate segment (opposite side of chord)</li>
                    <li>• Inscribed angle in alternate segment</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Tangent-Chord Angle */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Tangent-Chord Angle
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Definition:</h3>
                  <p>The angle formed between the tangent line and a chord drawn from the point of tangency.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Measurement:</h3>
                  <p>Always measured from the tangent to the chord, creating an acute angle with the chord.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Important Note:</h3>
                  <p className="text-sm">The tangent-chord angle can be measured on either side of the chord, giving two supplementary angles.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Alternate Segment and Diagram */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <TheoremDiagram />
          
          {/* Alternate Segment Concept */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Alternate Segment
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">What is it?</h3>
                  <p>The alternate segment is the part of the circle on the opposite side of the chord from where the tangent-chord angle is measured.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Inscribed Angle:</h3>
                  <p>Any angle inscribed in the alternate segment (with the same chord as its base) will equal the tangent-chord angle.</p>
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
      slideId="ct-alternate-segment-theorem-statement"
      slideTitle="Alternate Segment Theorem"
      moduleId="circle-theorems-0001"
      submoduleId="alternate-segment-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 
 