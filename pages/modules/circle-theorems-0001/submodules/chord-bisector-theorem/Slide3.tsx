import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function ChordBisectorTheoremSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: proof steps, 3: perpendicular, 4: bisector, 5: conclusion

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-chord-bisector-proof',
      conceptId: 'ct-chord-bisector-proof',
      conceptName: 'Chord Bisector Proof',
      type: 'learning',
      description: 'Understanding the proof of chord bisector theorem'
    },
    {
      id: 'ct-perpendicular-bisector',
      conceptId: 'ct-perpendicular-bisector',
      conceptName: 'Perpendicular Bisector',
      type: 'learning',
      description: 'Understanding perpendicular bisector properties'
    },
    {
      id: 'ct-converse-proof',
      conceptId: 'ct-converse-proof',
      conceptName: 'Converse Proof',
      type: 'learning',
      description: 'Understanding the converse theorem proof'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  const angleA = Math.PI * 0.7, angleB = Math.PI * 0.3;
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  const Mx = (Ax + Bx) / 2, My = (Ay + By) / 2;

  // Chord CD (dynamically placed, not parallel to AB)
  const angleC = Math.PI * 1.35, angleD = Math.PI * 1.85; // well-separated, not parallel
  const Cx = cx + r * Math.cos(angleC), Cy = cy + r * Math.sin(angleC);
  const Dx = cx + r * Math.cos(angleD), Dy = cy + r * Math.sin(angleD);
  const M2x = (Cx + Dx) / 2, M2y = (Cy + Dy) / 2;

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

  // SVG Construction Diagram Component
  const ConstructionDiagram = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Center Construction Method</h3>
      <svg width="420" height="500" viewBox="0 0 400 350" className="mx-auto">
        {/* Circle (initially hidden center) */}
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
        
        {/* First chord AB */}
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
            <text x={(Ax + Bx) / 2 - 30} y={(Ay + By) / 2 - 10} fill="#3B82F6" fontSize="12" fontWeight="bold">Chord AB</text>
          </g>
        )}
        
        {/* First perpendicular bisector */}
        {step >= 3 && (
          <g>
            {/* Midpoint of AB */}
            <circle cx={Mx} cy={My} r="3" fill="#10B981" />
            <text x={Mx + 10} y={My - 2} fill="#10B981" fontSize="12" fontWeight="bold">M₁</text>
            
            {/* Perpendicular bisector - extend through center */}
            <line 
              x1={cx} 
              y1={cy} 
              x2={Mx} 
              y2={My} 
              stroke="#10B981" 
              strokeWidth="3"
              strokeDasharray="5,5"
              className="animate-[draw_2s_ease-in-out]"
            />
            {/* Extend line beyond midpoint */}
            <line 
              x1={Mx} 
              y1={My} 
              x2={2 * Mx - cx} 
              y2={2 * My - cy} 
              stroke="#10B981" 
              strokeWidth="3"
              strokeDasharray="5,5"
              className="animate-[draw_2s_ease-in-out]"
            />
            <text x={Mx + 20} y={My - 20} fill="#10B981" fontSize="12" fontWeight="bold">Perp. Bisector 1</text>
            
            {/* Right angle at midpoint */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(Mx, My, cx, cy, Ax, Ay, 15);
              return <>
                <path d={arc} fill="none" stroke="#F59E0B" strokeWidth="2" />
                <text x={labelX} y={labelY} fill="#F59E0B" fontSize="10" fontWeight="bold" textAnchor="middle">90°</text>
              </>;
            })()}
          </g>
        )}
        
        {/* Second chord CD */}
        {step >= 4 && (
          <g>
            {/* Chord endpoints */}
            <circle cx={Cx} cy={Cy} r="4" fill="#8B5CF6" />
            <circle cx={Dx} cy={Dy} r="4" fill="#8B5CF6" />
            <text x={Cx + (Cx > cx ? 10 : -20)} y={Cy + (Cy > cy ? 18 : -8)} fill="#8B5CF6" fontSize="16" fontWeight="bold">C</text>
            <text x={Dx + (Dx > cx ? 10 : -20)} y={Dy + (Dy > cy ? 18 : -8)} fill="#8B5CF6" fontSize="16" fontWeight="bold">D</text>
            {/* Chord line */}
            <line 
              x1={Cx} 
              y1={Cy} 
              x2={Dx} 
              y2={Dy} 
              stroke="#8B5CF6" 
              strokeWidth="3"
              className="animate-[draw_1s_ease-in-out]"
            />
            <text x={(Cx + Dx) / 2 - 30} y={(Cy + Dy) / 2 - 10} fill="#8B5CF6" fontSize="12" fontWeight="bold">Chord CD</text>
          </g>
        )}
        
        {/* Second perpendicular bisector */}
        {step >= 5 && (
          <g>
            {/* Midpoint of CD */}
            <circle cx={M2x} cy={M2y} r="3" fill="#F59E0B" />
            <text x={M2x + 10} y={M2y - 2} fill="#F59E0B" fontSize="12" fontWeight="bold">M₂</text>
            {/* Perpendicular bisector */}
            {/* Find perpendicular bisector direction for CD */}
            {(() => {
              // Direction vector of CD
              const dx = Dx - Cx, dy = Dy - Cy;
              // Perpendicular direction
              const perpDx = -dy, perpDy = dx;
              // Normalize and scale for line length
              const len = Math.sqrt(perpDx * perpDx + perpDy * perpDy);
              const scale = 100; // length of bisector line
              const x1 = M2x - (perpDx / len) * scale;
              const y1 = M2y - (perpDy / len) * scale;
              const x2 = M2x + (perpDx / len) * scale;
              const y2 = M2y + (perpDy / len) * scale;
              return <>
                <line 
                  x1={x1} 
                  y1={y1} 
                  x2={x2} 
                  y2={y2} 
                  stroke="#F59E0B" 
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  className="animate-[draw_2s_ease-in-out]"
                />
                <text x={x2 + 5} y={y2} fill="#F59E0B" fontSize="12" fontWeight="bold">Perp. Bisector 2</text>
              </>;
            })()}
            {/* Right angle at midpoint */}
            <rect 
              x={M2x - 10} y={M2y - 10} width="20" height="20" 
              fill="none" stroke="#10B981" strokeWidth="2"
            />
          </g>
        )}
        
        {/* Intersection point */}
        {step >= 6 && (
          <g>
            <circle 
              cx="200" 
              cy="175" 
              r="8" 
              fill="none" 
              stroke="#DC2626" 
              strokeWidth="4"
              className="animate-pulse"
            />
            <text x="210" y="173" fill="#DC2626" fontSize="16" fontWeight="bold">O</text>
            <text x="205" y="190" fill="#DC2626" fontSize="12" fontWeight="bold">Center!</text>
          </g>
        )}
        
        {/* Center verification */}
        {step >= 7 && (
          <g>
            {/* Radii to all points */}
            <line x1="200" y1="175" x2="130" y2="120" stroke="#DC2626" strokeWidth="2" strokeDasharray="2,2" strokeOpacity="0.7" />
            <line x1="200" y1="175" x2="270" y2="230" stroke="#DC2626" strokeWidth="2" strokeDasharray="2,2" strokeOpacity="0.7" />
            <line x1="200" y1="175" x2="140" y2="240" stroke="#DC2626" strokeWidth="2" strokeDasharray="2,2" strokeOpacity="0.7" />
            <line x1="200" y1="175" x2="260" y2="110" stroke="#DC2626" strokeWidth="2" strokeDasharray="2,2" strokeOpacity="0.7" />
            
            {/* Equal radius annotations */}
            <text x="160" y="140" fill="#DC2626" fontSize="10" fontWeight="bold">r</text>
            <text x="240" y="210" fill="#DC2626" fontSize="10" fontWeight="bold">r</text>
            <text x="165" y="210" fill="#DC2626" fontSize="10" fontWeight="bold">r</text>
            <text x="235" y="140" fill="#DC2626" fontSize="10" fontWeight="bold">r</text>
            
            <rect 
              x="30" y="280" width="340" height="50" 
              fill="#E6F7FF" stroke="#1890FF" strokeWidth="2" 
              rx="10"
              className="animate-[fade-in_1s_ease-in-out]"
            />
            <text x="200" y="300" textAnchor="middle" fill="#002766" fontSize="14" fontWeight="bold">
              Success! All distances from O are equal (radius)
            </text>
            <text x="200" y="318" textAnchor="middle" fill="#002766" fontSize="12">
              Perpendicular bisectors of any two chords intersect at the center
            </text>
          </g>
        )}
        
        {/* Construction steps box */}
        {step >= 3 && (
          <rect 
            x="0" y="330" width="400" height="60" 
            fill="#F3F4F6" stroke="#6B7280" strokeWidth="2" 
            rx="10"
            className="animate-[fade-in_1s_ease-in-out]"
          />
        )}
        {step >= 3 && (
          <g>
            <text x="200" y="350" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold">
              Circle Center Construction Method
            </text>
            <text x="200" y="368" textAnchor="middle" fill="#1F2937" fontSize="12">
              Step 1: Draw any chord → Step 2: Find its perpendicular bisector
            </text>
            <text x="200" y="382" textAnchor="middle" fill="#1F2937" fontSize="12">
              Step 3: Repeat with another chord → Step 4: Intersection = Center
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
  );

  // The slide content
  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Construction Method */}
        <div className="space-y-6">
          {/* Construction Concept */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Problem:</h3>
                  <p className="font-medium">
                    Given a circle (without knowing its center), how can we find the exact center using only the chord bisector theorem?
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Solution Strategy:</h3>
                  <p>Use the fact that perpendicular bisectors of chords pass through the center.</p>
                  <p className="text-sm mt-2">The intersection of any two perpendicular bisectors gives us the center!</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Why This Works:</h3>
                  <ul className="space-y-2">
                    <li>• Every perpendicular bisector passes through center</li>
                    <li>• Two lines can intersect at only one point</li>
                    <li>• That intersection must be the center</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Perpendicular Bisector Method */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold dark:text-blue-400 mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Construction Steps
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Step 1: First Chord</h3>
                  <p>Draw any chord AB on the given circle.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Step 2: First Bisector</h3>
                  <p>Find the midpoint of AB and draw a perpendicular line through it. This line passes through the center.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Step 3: Second Chord</h3>
                  <p>Draw another chord CD (not parallel to AB).</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Step 4: Find Center</h3>
                  <p>Draw the perpendicular bisector of CD. Where it intersects the first bisector is the center!</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Diagram and Applications */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <ConstructionDiagram />
          
          {/* Intersection Principle */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold dark:text-blue-400 mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                Why This Method Works
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem Application:</h3>
                  <p>By the chord bisector theorem, every perpendicular bisector of a chord must pass through the center.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Unique Intersection:</h3>
                  <p>Two non-parallel lines can only intersect at exactly one point. Since both bisectors pass through the center, their intersection is the center.</p>
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
      slideId="ct-center-construction-method"
      slideTitle="Center Construction"
      moduleId="circle-theorems-0001"
      submoduleId="chord-bisector-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 