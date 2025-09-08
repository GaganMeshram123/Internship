import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function SemicircleTheoremSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: diameter, 2: first point, 3: second point, 4: third point, 5: right angles, 6: moving animation
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'ct-semicircle-theorem-concept',
      conceptId: 'ct-semicircle-theorem',
      conceptName: 'Semicircle Theorem',
      type: 'learning',
      description: 'Understanding that angles subtended by a diameter are always 90°'
    },
    {
      id: 'ct-diameter-properties',
      conceptId: 'ct-diameter-properties',
      conceptName: 'Diameter Properties',
      type: 'learning',
      description: 'Understanding the special properties of diameter in creating right angles'
    },
    {
      id: 'ct-right-angle-universality',
      conceptId: 'ct-right-angle-universality',
      conceptName: 'Universal Right Angles',
      type: 'learning',
      description: 'Understanding that this property holds for any point on the circumference'
    }
  ];
  
  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Diameter A and B
  const Ax = cx - r, Ay = cy;
  const Bx = cx + r, By = cy;
  // Points on circumference
  const angle1 = Math.PI * 0.7, angle2 = Math.PI * 0.5, angle3 = Math.PI * 0.3;
  const P1x = cx + r * Math.cos(angle1), P1y = cy + r * Math.sin(angle1);
  const P2x = cx + r * Math.cos(angle2), P2y = cy + r * Math.sin(angle2);
  const P3x = cx + r * Math.cos(angle3), P3y = cy + r * Math.sin(angle3);

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
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // SVG Theorem Diagram Component
  const TheoremDiagram = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Semicircle Theorem</h3>
      <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
        {/* Circle */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
        
        {/* Center O */}
        <circle cx={cx} cy={cy} r="3" fill="#374151" />
        <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="12" fontWeight="bold">O</text>
        
        {/* Diameter AB */}
        {step >= 1 && (
          <g>
            <line x1={Ax} y1={Ay} x2={Bx} y2={By} stroke="#DC2626" strokeWidth="4" />
            <circle cx={Ax} cy={Ay} r="4" fill="#DC2626" />
            <circle cx={Bx} cy={By} r="4" fill="#DC2626" />
            <text x={Ax - 15} y={Ay + 20} fill="#DC2626" fontSize="16" fontWeight="bold">A</text>
            <text x={Bx + 8} y={By + 20} fill="#DC2626" fontSize="16" fontWeight="bold">B</text>
          </g>
        )}
        
        {/* Point P1 */}
        {step >= 2 && (
          <g>
            <circle cx={P1x} cy={P1y} r="5" fill="#3B82F6" />
            <text x={P1x - 20} y={P1y - 10} fill="#3B82F6" fontSize="16" fontWeight="bold">P</text>
            <line x1={P1x} y1={P1y} x2={Ax} y2={Ay} stroke="#3B82F6" strokeWidth="2" />
            <line x1={P1x} y1={P1y} x2={Bx} y2={By} stroke="#3B82F6" strokeWidth="2" />
          </g>
        )}
        
        {/* Point P2 */}
        {step >= 3 && (
          <g>
            <circle cx={P2x} cy={P2y} r="5" fill="#10B981" />
            <text x={P2x - 10} y={P2y - 15} fill="#10B981" fontSize="16" fontWeight="bold">Q</text>
            <line x1={P2x} y1={P2y} x2={Ax} y2={Ay} stroke="#10B981" strokeWidth="2" />
            <line x1={P2x} y1={P2y} x2={Bx} y2={By} stroke="#10B981" strokeWidth="2" />
          </g>
        )}
        
        {/* Point P3 */}
        {step >= 4 && (
          <g>
            <circle cx={P3x} cy={P3y} r="5" fill="#8B5CF6" />
            <text x={P3x + 10} y={P3y - 10} fill="#8B5CF6" fontSize="16" fontWeight="bold">R</text>
            <line x1={P3x} y1={P3y} x2={Ax} y2={Ay} stroke="#8B5CF6" strokeWidth="2" />
            <line x1={P3x} y1={P3y} x2={Bx} y2={By} stroke="#8B5CF6" strokeWidth="2" />
          </g>
        )}
        
        {/* Right angles */}
        {step >= 5 && (
          <g>
            {/* Right angle at P */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(P1x, P1y, Ax, Ay, Bx, By, 20);
              return <>
                <path d={arc} fill="none" stroke="#3B82F6" strokeWidth="3" />
                <text x={labelX} y={labelY} fill="#3B82F6" fontSize="14" fontWeight="bold" textAnchor="middle">90°</text>
              </>;
            })()}
            
            {/* Right angle at Q */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(P2x, P2y, Ax, Ay, Bx, By, 20);
              return <>
                <path d={arc} fill="none" stroke="#10B981" strokeWidth="3" />
                <text x={labelX} y={labelY} fill="#10B981" fontSize="14" fontWeight="bold" textAnchor="middle">90°</text>
              </>;
            })()}
            
            {/* Right angle at R */}
            {(() => {
              const { arc, labelX, labelY } = angleArc(P3x, P3y, Ax, Ay, Bx, By, 20);
              return <>
                <path d={arc} fill="none" stroke="#8B5CF6" strokeWidth="3" />
                <text x={labelX} y={labelY} fill="#8B5CF6" fontSize="14" fontWeight="bold" textAnchor="middle">90°</text>
              </>;
            })()}
          </g>
        )}
        
        {/* Moving point animation */}
        {step >= 6 && (
          <g>
            {/* Moving point */}
            <circle cx={cx + r * Math.cos(Math.PI * 0.8)} cy={cy + r * Math.sin(Math.PI * 0.8)} r="6" fill="#F59E0B" className="animate-[move-around_4s_ease-in-out_infinite]" />
            <text x="50" y="320" fill="#F59E0B" fontSize="14" fontWeight="bold">Any point on circumference creates 90°</text>
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
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem Statement:</h3>
                  <p className="font-medium">
                    Any angle subtended by a <strong>diameter</strong> from any point on the circumference is a <strong>right angle</strong> (90°).
                  </p>
                </div>
                
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">In Mathematical Terms:</h3>
                  <p>If AB is a diameter and P is any point on the circle, then:</p>
                  <p className="font-bold text-center mt-2">∠APB = 90°</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Point:</h3>
                  <p>
                    This works for <strong>ANY</strong> point P on the circumference, making it a universal property of semicircles.
                  </p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Diameter Properties */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Why Diameter?
              </h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Special Properties:</h3>
                  <ul className="space-y-2">
                    <li>• Diameter passes through center</li>
                    <li>• Creates a semicircle (180° arc)</li>
                    <li>• Longest possible chord</li>
                    <li>• Divides circle into two equal halves</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Connection to Central Angle:</h3>
                  <p className="text-lg">The central angle subtended by a diameter is 180°, so the inscribed angle is 180° ÷ 2 = 90°</p>
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
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Always 90°:</h3>
                  <p>No matter where point P is located on the circumference, ∠APB = 90°</p>
                  <ul className="mt-2 space-y-1 text-lg">
                    <li>• Top of circle: 90°</li>
                    <li>• Side of circle: 90°</li>
                    <li>• Bottom of circle: 90°</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Applications:</h3>
                  <ul className="space-y-1 text-lg">
                    <li>• Constructing right angles</li>
                    <li>• Solving geometry problems</li>
                    <li>• Pythagorean theorem problems</li>
                    <li>• Architecture and engineering</li>
                  </ul>
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
      slideId="ct-semicircle-theorem-statement"
      slideTitle="Semicircle Theorem"
      moduleId="circle-theorems-0001"
      submoduleId="semicircle-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 
 