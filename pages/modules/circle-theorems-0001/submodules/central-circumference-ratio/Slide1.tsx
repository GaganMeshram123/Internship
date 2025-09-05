import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function CentralCircumferenceRatioSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: central angle, 2: inscribed angle, 3: ratio, 4: flash
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'ct-central-angle-concept',
      conceptId: 'ct-central-angle',
      conceptName: 'Central Angle',
      type: 'learning',
      description: 'Understanding central angles with vertex at the center'
    },
    {
      id: 'ct-inscribed-angle-concept',
      conceptId: 'ct-inscribed-angle',
      conceptName: 'Inscribed Angle',
      type: 'learning',
      description: 'Understanding inscribed angles with vertex on the circumference'
    },
    {
      id: 'ct-central-inscribed-ratio',
      conceptId: 'ct-central-inscribed-ratio',
      conceptName: '2:1 Ratio Relationship',
      type: 'learning',
      description: 'Understanding the 2:1 ratio between central and inscribed angles'
    }
  ];
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Arc endpoints A and B
  const angleA = Math.PI * 0.75; // Upper left
  const angleB = Math.PI * 0.25; // Upper right
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  // Point P on circumference (right side)
  const angleP = 0; // Right side
  const Px = cx + r * Math.cos(angleP), Py = cy + r * Math.sin(angleP);

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

  // SVG Theorem Diagram Component
  const TheoremDiagram = () => (
    <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
      <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">Central vs Inscribed Angles</h3>
      <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r="4" fill="#3B82F6" />
        <text x={cx + 10} y={cy - 2} fill="#3B82F6" fontSize="14" fontWeight="bold">O</text>
        
        {/* Arc endpoints A and B */}
        <circle cx={Ax} cy={Ay} r="4" fill="#000000" />
        <circle cx={Bx} cy={By} r="4" fill="#000000" />
        <text x={Ax - 15} y={Ay - 10} fill="#000000" fontSize="16" fontWeight="bold">A</text>
        <text x={Bx + 8} y={By - 10} fill="#000000" fontSize="16" fontWeight="bold">B</text>
        
        {/* Arc AB */}
        <path 
          d={`M ${Ax} ${Ay} A ${r} ${r} 0 0 0 ${Bx} ${By}`} 
          fill="none" 
          stroke="#3B82F6" 
          strokeWidth="4"
        />
        
        {/* Central angle AOB */}
        {step >= 1 && (
          <g>
            <line x1={cx} y1={cy} x2={Ax} y2={Ay} stroke="#F59E0B" strokeWidth="3" />
            <line x1={cx} y1={cy} x2={Bx} y2={By} stroke="#F59E0B" strokeWidth="3" />
            
            {/* Central angle arc */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(cx, cy, Ax, Ay, Bx, By, 35);
              return <>
                <path d={arc} fill="none" stroke="#F59E0B" strokeWidth="4" className={step >= 4 ? "animate-pulse" : ""} />
                <text x={labelX} y={labelY - 5} fill="#F59E0B" fontSize="14" fontWeight="bold" textAnchor="middle">∠AOB</text>
                <text x={labelX} y={labelY + 10} fill="#F59E0B" fontSize="12" fontWeight="bold" textAnchor="middle">Central</text>
              </>;
            })()}
          </g>
        )}
        
        {/* Point P on circumference */}
        {step >= 2 && (
          <g>
            <circle cx={Px} cy={Py} r="5" fill="#3B82F6" />
            <text x={Px + 12} y={Py + 5} fill="#3B82F6" fontSize="16" fontWeight="bold">P</text>
            
            {/* Inscribed angle APB */}
            <line x1={Px} y1={Py} x2={Ax} y2={Ay} stroke="#3B82F6" strokeWidth="3" />
            <line x1={Px} y1={Py} x2={Bx} y2={By} stroke="#3B82F6" strokeWidth="3" />
            
            {/* Inscribed angle arc */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(Px, Py, Ax, Ay, Bx, By, 25);
              return <>
                <path d={arc} fill="none" stroke="#3B82F6" strokeWidth="4" className={step >= 4 ? "animate-pulse" : ""} />
                <text x={labelX} y={labelY - 5} fill="#3B82F6" fontSize="14" fontWeight="bold" textAnchor="middle">∠APB</text>
                <text x={labelX} y={labelY + 10} fill="#3B82F6" fontSize="12" fontWeight="bold" textAnchor="middle">Inscribed</text>
              </>;
            })()}
          </g>
        )}
        
        {/* Ratio demonstration */}
        {step >= 3 && (
          <g>
            {/* Formula box */}
            <rect 
              x="50" y="280" width="300" height="50" 
              fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" 
              rx="10"
            />
            <text x="200" y="300" textAnchor="middle" fill="#1E40AF" fontSize="16" fontWeight="bold">
              Central Angle = 2 × Inscribed Angle
            </text>
            <text x="200" y="320" textAnchor="middle" fill="#1E40AF" fontSize="14">
              ∠AOB = 2 × ∠APB
            </text>
          </g>
        )}
      </svg>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-4 py-2 rounded bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium border border-blue-300 dark:border-blue-700 disabled:opacity-50"
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
        >Previous</button>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white font-medium border border-blue-700 disabled:opacity-50"
          onClick={() => setStep(s => Math.min(4, s + 1))}
          disabled={step === 4}
        >Next</button>
      </div>
    </div>
  );

  // The slide content
  const slideContent = (
    <div className="w-full h-full bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Central Angle */}
        <div className="space-y-6">
          {/* Central Angle */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6">
                Central Angle
              </h1>
              
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Definition:</h3>
                  <p>An angle whose vertex is at the center of the circle and whose sides pass through two points on the circumference.</p>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Properties:</h3>
                  <ul className="space-y-2">
                    <li>• Vertex at center O</li>
                    <li>• Sides are radii OA and OB</li>
                    <li>• Subtends arc AB</li>
                    <li>• Measure equals arc measure</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Inscribed Angle */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Inscribed Angle
              </h2>
              
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Definition:</h3>
                  <p>An angle whose vertex is on the circumference and whose sides pass through two other points on the circumference.</p>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Properties:</h3>
                  <ul className="space-y-2">
                    <li>• Vertex on circumference at P</li>
                    <li>• Sides are chords PA and PB</li>
                    <li>• Subtends the same arc AB</li>
                    <li>• Also called circumference angle</li>
                  </ul>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Ratio and Diagram */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <TheoremDiagram />
          
          {/* 2:1 Ratio */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-100/60 border border-blue-300 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                The 2:1 Ratio Theorem
              </h2>
              
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem Statement:</h3>
                  <p>The central angle is always exactly <strong>twice</strong> the inscribed angle that subtends the same arc.</p>
                  <p className="font-bold mt-2 text-center">∠AOB = 2 × ∠APB</p>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Insight:</h3>
                  <p>This relationship is <strong>always true</strong> regardless of:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Position of point P on circumference</li>
                    <li>• Size of the arc AB</li>
                    <li>• Radius of the circle</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50/60 border border-blue-200 dark:bg-blue-900/40 dark:border-blue-700/50 rounded-xl px-6 py-4">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Applications:</h3>
                  <p className="text-sm">This fundamental relationship forms the basis for many other circle theorems and geometric proofs.</p>
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
      slideId="ct-central-circumference-ratio-theorem"
      slideTitle="Central-Circumference Ratio Theorem"
      moduleId="circle-theorems-0001"
      submoduleId="central-circumference-ratio"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 