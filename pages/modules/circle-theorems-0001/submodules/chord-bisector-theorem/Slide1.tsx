import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function ChordBisectorTheoremSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: circle, 2: chord, 3: perpendicular, 4: midpoint, 5: equal segments, 6: converse

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-chord-bisector-concept',
      conceptId: 'ct-chord-bisector',
      conceptName: 'Chord Bisector Concept',
      type: 'learning',
      description: 'Understanding the relationship between perpendiculars from center and chord bisection'
    },
    {
      id: 'ct-perpendicular-properties',
      conceptId: 'ct-perpendicular-properties',
      conceptName: 'Perpendicular Properties',
      type: 'learning',
      description: 'Understanding properties of perpendiculars from center to chords'
    },
    {
      id: 'ct-converse-theorem',
      conceptId: 'ct-converse-theorem',
      conceptName: 'Converse Theorem',
      type: 'learning',
      description: 'Understanding the converse of the chord bisector theorem'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Chord AB
  const angleA = Math.PI * 0.7, angleB = Math.PI * 0.3;
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  // Midpoint M of chord AB
  const Mx = (Ax + Bx) / 2, My = (Ay + By) / 2;
  // Perpendicular from center to chord
  const perpX = Mx, perpY = My;

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
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Chord Bisector Theorem</h3>
      <svg width="420" height="500" viewBox="0 0 400 500" className="mx-auto">
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
        
        {/* Chord AB */}
        {step >= 2 && (
          <g>
            {/* Chord endpoints */}
            <circle cx={Ax} cy={Ay} r="4" fill="#3B82F6" />
            <circle cx={Bx} cy={By} r="4" fill="#3B82F6" />
            <text x={Ax + (Ax > cx ? 10 : -20)} y={Ay + (Ay > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">A</text>
            <text x={Bx + (Bx > cx ? 10 : -20)} y={By + (By > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">B</text>
            
            {/* Chord line */}
            <line 
              x1={Ax} 
              y1={Ay} 
              x2={Bx} 
              y2={By} 
              stroke="#3B82F6" 
              strokeWidth="3"
              className="animate-[draw_1s_ease-in-out]"
            />
            <text x={(Ax + Bx) / 2 - 90} y={(Ay + By) / 2 - 10} fill="#3B82F6" fontSize="14" fontWeight="bold">Chord AB</text>
          </g>
        )}
        
        {/* Perpendicular from O to chord */}
        {step >= 3 && (
          <g>
            {/* Foot of perpendicular M */}
            <circle cx={Mx} cy={My} r="4" fill="#10B981" />
            <text x={Mx + 10} y={My - 10} fill="#10B981" fontSize="16" fontWeight="bold">M</text>
            
            {/* Perpendicular line OM */}
            <line 
              x1={cx} 
              y1={cy} 
              x2={Mx} 
              y2={My} 
              stroke="#10B981" 
              strokeWidth="3"
              className="animate-[draw_1s_ease-in-out]"
            />
            
            {/* Right angle symbol */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(Mx, My, cx, cy, Ax, Ay, 20);
              return <>
                <path d={arc} fill="none" stroke="#F59E0B" strokeWidth="3" />
                <text x={labelX} y={labelY} fill="#F59E0B" fontSize="12" fontWeight="bold" textAnchor="middle">90°</text>
              </>;
            })()}
            
            <text x={(cx + Mx) / 2 - 22} y={(cy + My) / 2 - 20} fill="#10B981" fontSize="12" fontWeight="bold">OM ⊥ AB</text>
          </g>
        )}
        
        {/* Midpoint demonstration */}
        {step >= 4 && (
          <g>
            {/* Highlight midpoint */}
            <circle 
              cx={Mx} 
              cy={My} 
              r="8" 
              fill="none" 
              stroke="#F59E0B" 
              strokeWidth="3"
              className="animate-pulse"
            />
            <text x={Mx-20} y={My + 20} fill="#F59E0B" fontSize="14" fontWeight="bold">Midpoint</text>
          </g>
        )}
        
        {/* Equal segments */}
        {step >= 5 && (
          <g>
            {/* Tick marks for equal segments */}
            <g className="animate-[fade-in_1s_ease-in-out]">
              {/* AM marks - positioned at midpoint of AM */}
              {(() => {
                const midAMx = (Ax + Mx) / 2;
                const midAMy = (Ay + My) / 2;
                const angle = Math.atan2(By - Ay, Bx - Ax);
                const perpAngle = angle + Math.PI / 2;
                const markLength = 8;
                
                return <>
                  <line 
                    x1={midAMx + markLength * Math.cos(perpAngle)} 
                    y1={midAMy + markLength * Math.sin(perpAngle)} 
                    x2={midAMx - markLength * Math.cos(perpAngle)} 
                    y2={midAMy - markLength * Math.sin(perpAngle)} 
                    stroke="#8B5CF6" strokeWidth="3" 
                  />
                  <line 
                    x1={midAMx + 5 + markLength * Math.cos(perpAngle)} 
                    y1={midAMy + 5 + markLength * Math.sin(perpAngle)} 
                    x2={midAMx + 5 - markLength * Math.cos(perpAngle)} 
                    y2={midAMy + 5 - markLength * Math.sin(perpAngle)} 
                    stroke="#8B5CF6" strokeWidth="3" 
                  />
                </>;
              })()}
              
              {/* MB marks - positioned at midpoint of MB */}
              {(() => {
                const midMBx = (Mx + Bx) / 2;
                const midMBy = (My + By) / 2;
                const angle = Math.atan2(By - Ay, Bx - Ax);
                const perpAngle = angle + Math.PI / 2;
                const markLength = 8;
                
                return <>
                  <line 
                    x1={midMBx + markLength * Math.cos(perpAngle)} 
                    y1={midMBy + markLength * Math.sin(perpAngle)} 
                    x2={midMBx - markLength * Math.cos(perpAngle)} 
                    y2={midMBy - markLength * Math.sin(perpAngle)} 
                    stroke="#8B5CF6" strokeWidth="3" 
                  />
                  <line 
                    x1={midMBx + 5 + markLength * Math.cos(perpAngle)} 
                    y1={midMBy + 5 + markLength * Math.sin(perpAngle)} 
                    x2={midMBx + 5 - markLength * Math.cos(perpAngle)} 
                    y2={midMBy + 5 - markLength * Math.sin(perpAngle)} 
                    stroke="#8B5CF6" strokeWidth="3" 
                  />
                </>;
              })()}
            </g>
            
            {/* Equal sign and measurements */}
            <text x={Mx - 30} y={My + 40} fill="#8B5CF6" fontSize="14" fontWeight="bold">AM = MB</text>
            <text x={Mx - 50} y={My + 55} fill="#8B5CF6" fontSize="12" fontWeight="bold">M bisects AB</text>
          </g>
        )}
        
        {/* Converse illustration */}
        {step >= 6 && (
          <g>
            <rect 
              x="-10" y="350" width="420" height="80" 
              fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" 
              rx="10"
              className="animate-[fade-in_1s_ease-in-out]"
            />
            <text x="200" y="370" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="bold">
              Chord Bisector Theorem (Both Directions)
            </text>
            <text x="200" y="388" textAnchor="middle" fill="#0C4A6E" fontSize="12">
              1. Perpendicular from center to chord bisects the chord
            </text>
            <text x="200" y="404" textAnchor="middle" fill="#0C4A6E" fontSize="12">
              2. Line from center through midpoint of chord is perpendicular to chord
            </text>
            <text x="200" y="420" textAnchor="middle" fill="#DC2626" fontSize="12" fontWeight="bold">
              Both statements are equivalent and always true!
            </text>
          </g>
        )}
        
        {/* Theorem statement box */}
        {step >= 5 && (
          <rect 
            x="30" y="20" width="340" height="40" 
            fill="#F3F4F6" stroke="#6B7280" strokeWidth="2" 
            rx="10"
            className="animate-[fade-in_1s_ease-in-out]"
          />
        )}
        {step >= 5 && (
          <text x="200" y="45" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="bold" className="animate-pulse">
            Perpendicular from Center Bisects Chord
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
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem Statement:</h3>
                  <p className="font-medium">
                    A <strong>perpendicular</strong> drawn from the center of a circle to a chord <strong>bisects</strong> the chord.
                  </p>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-green-700 dark:text-green-300 mb-3">Mathematical Form:</h3>
                  <p>If OM ⊥ chord AB, where O is the center and M is on AB, then:</p>
                  <p className="font-bold text-center mt-2">AM = MB</p>
                  <p className="text-center text-sm">M is the midpoint of AB</p>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-teal-700 dark:text-teal-300 mb-3">Key Conditions:</h3>
                  <ul className="space-y-2">
                    <li>• O is the center of the circle</li>
                    <li>• AB is any chord of the circle</li>
                    <li>• OM is perpendicular to chord AB</li>
                    <li>• M is the intersection point</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Perpendicular Properties */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                Why Does This Work?
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-amber-700 dark:text-amber-300 mb-3">Symmetry Principle:</h3>
                  <p>The perpendicular from the center creates perfect symmetry, making the two segments equal.</p>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-orange-700 dark:text-orange-300 mb-3">Congruent Triangles:</h3>
                  <p>Triangles OAM and OBM are congruent (by RHS), making AM = BM.</p>
                </div>
                
                <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-red-700 dark:text-red-300 mb-3">Shortest Distance:</h3>
                  <p className="text-sm">The perpendicular represents the shortest distance from center to chord, naturally occurring at the midpoint.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Converse and Diagram */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <TheoremDiagram />
          
          {/* Converse Theorem */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                Converse Theorem
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-purple-700 dark:text-purple-300 mb-3">Converse Statement:</h3>
                  <p>If a line from the center of a circle passes through the midpoint of a chord, then it is perpendicular to that chord.</p>
                </div>
                
                <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-pink-700 dark:text-pink-300 mb-3">Practical Meaning:</h3>
                  <p>Both directions are true - bisecting implies perpendicularity, and perpendicularity implies bisecting.</p>
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
      slideId="ct-chord-bisector-theorem-statement"
      slideTitle="Chord Bisector Theorem"
      moduleId="circle-theorems-0001"
      submoduleId="chord-bisector-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 