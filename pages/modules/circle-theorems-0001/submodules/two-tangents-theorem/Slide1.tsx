import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function TwoTangentsTheoremSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: circle, 2: external point, 3: first tangent, 4: second tangent, 5: equal lengths, 6: angle bisector

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-two-tangents-concept',
      conceptId: 'ct-two-tangents',
      conceptName: 'Two Tangents from External Point',
      type: 'learning',
      description: 'Understanding the properties of two tangents drawn from an external point'
    },
    {
      id: 'ct-equal-tangent-lengths',
      conceptId: 'ct-equal-tangent-lengths',
      conceptName: 'Equal Tangent Lengths',
      type: 'learning',
      description: 'Understanding that tangent segments from external point are equal'
    },
    {
      id: 'ct-angle-bisector-property',
      conceptId: 'ct-angle-bisector-property',
      conceptName: 'Angle Bisector Property',
      type: 'learning',
      description: 'Understanding that the line from external point to center bisects the angle'
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
  const tangentLength = Math.sqrt(d ** 2 - r ** 2);
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

  // SVG Theorem Diagram Component
  const TheoremDiagram = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">Two Tangents from External Point</h3>
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
            <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="14" fontWeight="bold">O</text>
          </g>
        )}
        
        {/* External point P */}
        {step >= 2 && (
          <g>
            <circle 
              cx={Px} 
              cy={Py} 
              r="5" 
              fill="#DC2626" 
              className="animate-[scale-in_0.5s_ease-out]"
            />
            <text x={Px + 10} y={Py - 2} fill="#DC2626" fontSize="16" fontWeight="bold">P</text>
          </g>
        )}
        
        {/* First tangent PA */}
        {step >= 3 && (
          <g>
            {/* Tangent point A */}
            <circle cx={T1x} cy={T1y} r="4" fill="#3B82F6" />
            <text x={T1x + (T1x > cx ? 10 : -20)} y={T1y + (T1y > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">A</text>
            
            {/* Tangent line PA */}
            <line 
              x1={Px} 
              y1={Py} 
              x2={T1x} 
              y2={T1y} 
              stroke="#3B82F6" 
              strokeWidth="3"
              className="animate-[draw_1s_ease-in-out]"
            />
            
            {/* Radius OA */}
            <line 
              x1={cx} y1={cy} x2={T1x} y2={T1y} 
              stroke="#3B82F6" strokeWidth="2" strokeDasharray="3,3"
            />
            
            {/* Right angle at A */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(T1x, T1y, cx, cy, Px, Py, 20);
              return <>
                <path d={arc} fill="none" stroke="#F59E0B" strokeWidth="3" />
                <text x={labelX} y={labelY} fill="#F59E0B" fontSize="10" fontWeight="bold" textAnchor="middle">90°</text>
              </>;
            })()}
          </g>
        )}
        
        {/* Second tangent PB */}
        {step >= 4 && (
          <g>
            {/* Tangent point B */}
            <circle cx={T2x} cy={T2y} r="4" fill="#10B981" />
            <text x={T2x + (T2x > cx ? 10 : -20)} y={T2y + (T2y > cy ? 18 : -8)} fill="#10B981" fontSize="16" fontWeight="bold">B</text>
            
            {/* Tangent line PB */}
            <line 
              x1={Px} 
              y1={Py} 
              x2={T2x} 
              y2={T2y} 
              stroke="#10B981" 
              strokeWidth="3"
              className="animate-[draw_1s_ease-in-out]"
            />
            
            {/* Radius OB */}
            <line 
              x1={cx} y1={cy} x2={T2x} y2={T2y} 
              stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"
            />
            
            {/* Right angle at B */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(T2x, T2y, cx, cy, Px, Py, 20);
              return <>
                <path d={arc} fill="none" stroke="#F59E0B" strokeWidth="3" />
                <text x={labelX} y={labelY} fill="#F59E0B" fontSize="10" fontWeight="bold" textAnchor="middle">90°</text>
              </>;
            })()}
          </g>
        )}
        
        {/* Equal length markings */}
        {step >= 5 && (
          <g>
            {/* Tick marks for equal lengths */}
            <g className="animate-[fade-in_1s_ease-in-out]">
              {/* PA marks - positioned at midpoint of PA */}
              {(() => {
                const midX = (Px + T1x) / 2;
                const midY = (Py + T1y) / 2;
                const angle = Math.atan2(T1y - Py, T1x - Px);
                const perpAngle = angle + Math.PI / 2;
                const markLength = 5;
                
                return <>
                  <line 
                    x1={midX + markLength * Math.cos(perpAngle)} 
                    y1={midY + markLength * Math.sin(perpAngle)} 
                    x2={midX - markLength * Math.cos(perpAngle)} 
                    y2={midY - markLength * Math.sin(perpAngle)} 
                    stroke="#8B5CF6" strokeWidth="3" 
                  />
                </>;
              })()}
              
              {/* PB marks - positioned at midpoint of PB */}
              {(() => {
                const midX = (Px + T2x) / 2;
                const midY = (Py + T2y) / 2;
                const angle = Math.atan2(T2y - Py, T2x - Px);
                const perpAngle = angle + Math.PI / 2;
                const markLength = 5;
                
                return <>
                  <line 
                    x1={midX + markLength * Math.cos(perpAngle)} 
                    y1={midY + markLength * Math.sin(perpAngle)} 
                    x2={midX - markLength * Math.cos(perpAngle)} 
                    y2={midY - markLength * Math.sin(perpAngle)} 
                    stroke="#8B5CF6" strokeWidth="3" 
                  />
                </>;
              })()}
              
              {/* Equal sign */}
              <text x={Px - 30} y={Py - 30} fill="#8B5CF6" fontSize="16" fontWeight="bold">PA</text>
              <text x={Px - 30} y={Py+35} fill="#8B5CF6" fontSize="16" fontWeight="bold">PB</text>
            </g>
          </g>
        )}
        
        {/* Angle bisector */}
        {step >= 6 && (
          <g>
            {/* Line PO */}
            <line 
              x1={Px} 
              y1={Py} 
              x2={cx} 
              y2={cy} 
              stroke="#F59E0B" 
              strokeWidth="3"
              strokeDasharray="5,5"
              className="animate-[draw_1s_ease-in-out]"
            />
            
            {/* Angle markings using angleArc helper */}
            {(() => {
              const { arc: arc1, labelX: labelX1, labelY: labelY1 } = angleArc(Px, Py, T1x, T1y, cx, cy, 25);
              const { arc: arc2, labelX: labelX2, labelY: labelY2 } = angleArc(Px, Py, cx, cy, T2x, T2y, 25);
              return <>
                <path d={arc1} fill="none" stroke="#F59E0B" strokeWidth="2" className="animate-pulse" />
                <text x={labelX1} y={labelY1} fill="#F59E0B" fontSize="12" fontWeight="bold" textAnchor="middle">α</text>
                <path d={arc2} fill="none" stroke="#F59E0B" strokeWidth="2" className="animate-pulse" />
                <text x={labelX2} y={labelY2} fill="#F59E0B" fontSize="12" fontWeight="bold" textAnchor="middle">α</text>
              </>;
            })()}
            
            <text x={(Px + cx) / 2 - 50} y={(Py + cy) / 2 - 10} fill="#F59E0B" fontSize="12" fontWeight="bold">PO bisects ∠APB</text>
          </g>
        )}
        
        {/* Theorem statement box */}
        {step >= 5 && (
          <rect 
            x="30" y="20" width="340" height="50" 
            fill="#F3F4F6" stroke="#6B7280" strokeWidth="2" 
            rx="10"
            className="animate-[fade-in_1s_ease-in-out]"
          />
        )}
        {step >= 5 && (
          <g>
            <text x="200" y="40" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold">
              Two Tangents from External Point: PA = PB
            </text>
            <text x="200" y="58" textAnchor="middle" fill="#1F2937" fontSize="12">
              PO bisects ∠APB and ∠AOB
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
                    If two tangent segments are drawn to a circle from an <strong>external point</strong>, then:
                  </p>
                  <ul className="mt-2 space-y-2">
                    <li>1. The tangent segments are <strong>equal in length</strong></li>
                    <li>2. The line from the external point to the center <strong>bisects the angle</strong> between the tangents</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Mathematical Form:</h3>
                  <p>If PA and PB are tangents from external point P, then:</p>
                  <p className="font-bold text-center mt-2">PA = PB</p>
                  <p className="text-center">∠APO = ∠BPO</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Conditions:</h3>
                  <ul className="space-y-2">
                    <li>• Point P is outside the circle</li>
                    <li>• Both PA and PB are tangent to the circle</li>
                    <li>• A and B are points of tangency</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Equal Lengths Property */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Equal Tangent Lengths
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Why Equal?</h3>
                  <p>Both tangent segments are drawn from the same external point to the same circle, creating identical geometric conditions.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Symmetry:</h3>
                  <p>The configuration has perfect symmetry about the line PO, making the tangent lengths identical.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Practical Use:</h3>
                  <p className="text-lg">This property is used in constructions, engineering designs, and solving geometric problems involving external tangents.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Angle Bisector and Diagram */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <TheoremDiagram />
          
          {/* Angle Bisector Property */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Angle Bisector Property
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Line PO Bisects:</h3>
                  <ul className="space-y-1">
                    <li>• ∠APB (angle between tangents at P)</li>
                    <li>• ∠AOB (central angle at O)</li>
                    <li>• Arc AB (arc between tangent points)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Geometric Meaning:</h3>
                  <p className="text-lg">The line PO is the axis of symmetry for the entire configuration, dividing everything into two equal halves.</p>
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
      slideId="ct-two-tangents-theorem-statement"
      slideTitle="Two Tangents Theorem"
      moduleId="circle-theorems-0001"
      submoduleId="two-tangents-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 
 