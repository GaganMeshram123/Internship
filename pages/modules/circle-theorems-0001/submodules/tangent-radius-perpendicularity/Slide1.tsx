import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function TangentRadiusPerpendicularitySlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: circle, 2: tangent, 3: radius, 4: right angle, 5: rotate tangent, 6: multiple positions

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-tangent-radius-concept',
      conceptId: 'ct-tangent-radius',
      conceptName: 'Tangent-Radius Relationship',
      type: 'learning',
      description: 'Understanding the perpendicular relationship between tangents and radii'
    },
    {
      id: 'ct-tangent-properties',
      conceptId: 'ct-tangent-properties',
      conceptName: 'Tangent Properties',
      type: 'learning',
      description: 'Understanding the unique properties of tangent lines'
    },
    {
      id: 'ct-universal-perpendicularity',
      conceptId: 'ct-universal-perpendicularity',
      conceptName: 'Universal Perpendicularity',
      type: 'learning',
      description: 'Understanding that this property holds for all tangent points'
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
  // Tangent line direction (perpendicular to radius)
  const tangentAngle = angleT + Math.PI / 2;
  const tangentLength = 80;
  const T1x = Tx + tangentLength * Math.cos(tangentAngle);
  const T1y = Ty + tangentLength * Math.sin(tangentAngle);
  const T2x = Tx - tangentLength * Math.cos(tangentAngle);
  const T2y = Ty - tangentLength * Math.sin(tangentAngle);

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
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tangent-Radius Perpendicularity</h3>
      <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
        {/* Circle */}
        {step >= 1 && (
          <circle 
            cx="200" 
            cy="175" 
            r="100" 
            fill="none" 
            stroke="#64748B" 
            strokeWidth="2"
            className="animate-[draw_1s_ease-in-out]"
          />
        )}
        
        {/* Center O */}
        {step >= 1 && (
          <g>
            <circle cx="200" cy="175" r="3" fill="#374151" />
            <text x="210" y="173" fill="#374151" fontSize="14" fontWeight="bold">O</text>
          </g>
        )}
        
        {/* Tangent line */}
        {step >= 2 && (
          <g>
            <line 
              x1="50" 
              y1="75" 
              x2="350" 
              y2="75" 
              stroke="#DC2626" 
              strokeWidth="3"
              className={step >= 5 ? "animate-[draw_2s_ease-in-out]" : "animate-[draw_1s_ease-in-out]"}
            />
            <circle cx="200" cy="75" r="4" fill="#DC2626" />
            <text x="210" y="70" fill="#DC2626" fontSize="16" fontWeight="bold">T</text>
            <text x="90" y="65" fill="#DC2626" fontSize="16" fontWeight="bold">Tangent</text>
          </g>
        )}
        
        {/* Radius to tangent point */}
        {step >= 3 && (
          <g>
            <line 
              x1="200" 
              y1="175" 
              x2="200" 
              y2="75" 
              stroke="#3B82F6" 
              strokeWidth="3"
              className="animate-[draw_1s_ease-in-out]"
            />
            <text x="165" y="125" fill="#3B82F6" fontSize="14" fontWeight="bold">OT</text>
            <text x="160" y="140" fill="#3B82F6" fontSize="12" fontWeight="bold">radius</text>
          </g>
        )}
        
        {/* Right angle marking */}
        {step >= 4 && (
          <g>
            <rect 
              x="185" y="75" width="30" height="30" 
              fill="none" stroke="#F59E0B" strokeWidth="3"
              className="animate-[scale-in_1s_ease-out]"
            />
            <text x="155" y="95" fill="#F59E0B" fontSize="16" fontWeight="bold">90°</text>
            
            {/* Perpendicular symbol */}
            <text x="220" y="90" fill="#F59E0B" fontSize="14" fontWeight="bold">⊥</text>
          </g>
        )}
        
        {/* Multiple tangent positions demonstration */}
        {step >= 6 && (
          <g>
            {/* Tangent at different positions */}
            <g className="animate-[fade-in_1s_ease-in-out]">
              {/* Right side tangent */}
              <line x1="300" y1="50" x2="300" y2="300" stroke="#10B981" strokeWidth="2" strokeOpacity="0.7" />
              <circle cx="300" cy="175" r="3" fill="#10B981" />
              <text x="305" y="173" fill="#10B981" fontSize="12">T₂</text>
              <line x1="200" y1="175" x2="300" y2="175" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" strokeOpacity="0.7" />
              
              {/* Bottom tangent */}
              <line x1="50" y1="275" x2="350" y2="275" stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.7" />
              <circle cx="200" cy="275" r="3" fill="#8B5CF6" />
              <text x="205" y="273" fill="#8B5CF6" fontSize="12">T₃</text>
              <line x1="200" y1="175" x2="200" y2="275" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="3,3" strokeOpacity="0.7" />
              
              {/* Right angle markers */}
              <rect x="285" y="160" width="30" height="30" fill="none" stroke="#10B981" strokeWidth="2" strokeOpacity="0.7" />
              <rect x="185" y="260" width="30" height="30" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.7" />
            </g>
            
            <text x="200" y="320" textAnchor="middle" fill="#7C3AED" fontSize="14" fontWeight="bold" className="animate-pulse">
              Always 90° - Universal Property!
            </text>
          </g>
        )}
        
        {/* Theorem statement box */}
        {step >= 4 && (
          <rect 
            x="30" y="280" width="340" height="40" 
            fill="#F3F4F6" stroke="#6B7280" strokeWidth="2" 
            rx="10"
            className="animate-[fade-in_1s_ease-in-out]"
          />
        )}
        {step >= 4 && (
          <text x="200" y="300" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="bold">
            Tangent ⊥ Radius at Point of Contact
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
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem Statement:</h3>
                  <p className="font-medium">
                    A tangent to a circle is <strong>perpendicular</strong> to the radius drawn to the point of tangency.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Mathematical Form:</h3>
                  <p>If line L is tangent to circle at point T, and OT is the radius to T, then:</p>
                  <p className="font-bold text-center mt-2">L ⊥ OT</p>
                  <p className="text-center mt-1">∠OTL = 90°</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Points:</h3>
                  <ul className="space-y-2">
                    <li>• Tangent touches circle at exactly one point</li>
                    <li>• Radius connects center to tangent point</li>
                    <li>• Angle between them is always 90°</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Tangent Properties */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Why Perpendicular?
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Geometric Necessity:</h3>
                  <p>The tangent line represents the shortest distance from an external point to the circle, which must be perpendicular to the radius.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Unique Contact:</h3>
                  <p>Since the tangent touches at exactly one point, any other direction would either miss the circle or intersect it at two points.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Mathematical Proof:</h3>
                  <p className="text-lg">This can be proven using the fact that the radius to the tangent point gives the shortest distance from the center to the tangent line.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Universal Property and Diagram */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <TheoremDiagram />
          
          {/* Universal Property */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Universal Property
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Always True:</h3>
                  <p>This perpendicular relationship holds for <strong>every</strong> tangent to any circle, regardless of:</p>
                  <ul className="mt-2 space-y-1 text-lg">
                    <li>• Circle size or radius</li>
                    <li>• Position of tangent point</li>
                    <li>• Orientation of the tangent line</li>
                  </ul>
                </div>
                
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Applications:</h3>
                  <ul className="space-y-1 text-lg">
                    <li>• Constructing tangent lines</li>
                    <li>• Solving tangent-related problems</li>
                    <li>• Engineering and design calculations</li>
                    <li>• Architecture and construction</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Converse is True:</h3>
                  <p className="text-lg">If a line through a point on a circle is perpendicular to the radius at that point, then the line is tangent to the circle.</p>
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
      slideId="ct-tangent-radius-perpendicularity-theorem"
      slideTitle="Tangent-Radius Perpendicularity"
      moduleId="circle-theorems-0001"
      submoduleId="tangent-radius-perpendicularity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 
 