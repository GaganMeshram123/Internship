import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function EqualChordsTheoremSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: circle, 2: first chord, 3: second chord, 4: equal chords, 5: central angles, 6: distances, 7: conclusion

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-equal-chords-concept',
      conceptId: 'ct-equal-chords',
      conceptName: 'Equal Chords Concept',
      type: 'learning',
      description: 'Understanding the relationships between equal chords in a circle'
    },
    {
      id: 'ct-central-angle-relationship',
      conceptId: 'ct-central-angle-relationship',
      conceptName: 'Central Angle Relationship',
      type: 'learning',
      description: 'Understanding how equal chords relate to equal central angles'
    },
    {
      id: 'ct-distance-relationship',
      conceptId: 'ct-distance-relationship',
      conceptName: 'Distance Relationship',
      type: 'learning',
      description: 'Understanding how equal chords are equidistant from center'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Make chords closer together - both on the upper part of the circle
  const angleA1 = Math.PI * 0.65, angleB1 = Math.PI * 0.8;
  const A1x = cx + r * Math.cos(angleA1), A1y = cy + r * Math.sin(angleA1);
  const B1x = cx + r * Math.cos(angleB1), B1y = cy + r * Math.sin(angleB1);
  const angleA2 = Math.PI * 0.2, angleB2 = Math.PI * 0.35;
  const A2x = cx + r * Math.cos(angleA2), A2y = cy + r * Math.sin(angleA2);
  const B2x = cx + r * Math.cos(angleB2), B2y = cy + r * Math.sin(angleB2);

  // Perpendiculars OM and ON
  // OM: from O to (Mx, My)
  // ON: from O to (Nx, Ny)

  // Central angles: OA, OB, OC, OD
  // OA1: (cx, cy) to (A1x, A1y)
  // OB1: (cx, cy) to (B1x, B1y)
  // OA2: (cx, cy) to (A2x, A2y)
  // OB2: (cx, cy) to (B2x, B2y)

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
  const TheoremDiagram = () => {
    // State to manage the current step
    const [step, setStep] = useState(0);

    // Coordinate constants for the diagram
    const cx = 200;
    const cy = 175;
    const r = 120;
    const angle1 = Math.PI / 4;
    const angle2 = (3 * Math.PI) / 4;
    const angle3 = (3 * Math.PI) / 2 - Math.PI / 6;
    const angle4 = (3 * Math.PI) / 2 + Math.PI / 6;
    const A1x = cx + r * Math.cos(angle1);
    const A1y = cy + r * Math.sin(angle1);
    const B1x = cx + r * Math.cos(angle2);
    const B1y = cy + r * Math.sin(angle2);
    const A2x = cx + r * Math.cos(angle3);
    const A2y = cy + r * Math.sin(angle3);
    const B2x = cx + r * Math.cos(angle4);
    const B2y = cy + r * Math.sin(angle4);

    // This is a placeholder for the angleArc function
   const angleArc = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, radius: number) => {
        return {
            arc: "",
            labelX: 0,
            labelY: 0
        };
    };

    // The steps for the explanation
    const steps = [
        { title: "Introduction", description: "Click 'Next' to begin exploring the Equal Chords Theorem, which relates chords and their distance from the center." },
        { title: "Step 1: The Circle", description: "We start with a circle and its center, labeled O." },
        { title: "Step 2: First Chord", description: "A chord is a line segment connecting two points on a circle. Here, we add the first chord, AB." },
        { title: "Step 3: Second Chord", description: "Now, we add a second chord, CD." },
        { title: "Step 4: Equal Chords", description: "The theorem states that if two chords are equal in length, then they are equidistant from the center. Let's assume AB = CD." },
        { title: "Step 5: Central Angles", description: "Equal chords subtend equal central angles. Therefore, the angle ∠AOB is equal to the angle ∠COD." },
        { title: "Step 6: Perpendicular Distance", description: "The distance of a chord from the center is measured along a perpendicular line from the center. We add these distances, d₁ and d₂." },
        { title: "Step 7: The Conclusion", description: "Because the chords are equal, their distances from the center are also equal. Therefore, d₁ = d₂." }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            {/* 1. Headline */}
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">The Equal Chords Theorem</h1>
            
            {/* 2. Step Text with Indicator */}
            <div className="mb-6">
                {/* Step Indicator */}
                <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 text-lg">Step {step + 1}</span>
                    <span className="font-light">of {steps.length}</span>
                    <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 ease-out"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
                {/* Step Text */}
                <div className="p-6 bg-blue-50 dark:bg-gray-800 rounded-xl shadow-inner border border-blue-100 dark:border-gray-700 transition-all duration-300">
                    <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300">
                        {steps[step].title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-3 leading-relaxed text-base">
                        {steps[step].description}
                    </p>
                </div>
            </div>

            {/* 3. Buttons */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                >
                    ← Previous
                </button>
                <button
                    className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                    disabled={step === steps.length - 1}
                >
                    Next →
                </button>
            </div>

            {/* 4. Circle Diagram (your original code, untouched) */}
            <div className="mt-6">
                 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Equal Chords Theorem</h3>
                    
                    <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
                        {/* Circle - shown from step 1 */}
                        {step >= 1 && (
                            <>
                                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#64748B" strokeWidth="2" />
                                {/* Center O */}
                                <circle cx={cx} cy={cy} r="4" fill="#DC2626" />
                                <text x={cx + 10} y={cy - 2} fill="#DC2626" fontSize="14" fontWeight="bold">O</text>
                            </>
                        )}

                        {/* First chord AB - shown from step 2 */}
                        {step >= 2 && (
                            <>
                                {/* Triangle OAB */}
                                <path d={`M ${cx} ${cy} L ${A1x} ${A1y} L ${B1x} ${B1y} Z`} fill="rgba(59, 130, 246, 0.3)" stroke="#3B82F6" strokeWidth="2" />
                                {/* Points and labels for AB */}
                                <circle cx={A1x} cy={A1y} r="4" fill="#3B82F6" />
                                <circle cx={B1x} cy={B1y} r="4" fill="#3B82F6" />
                                <text x={A1x + (A1x > cx ? 10 : -20)} y={A1y + (A1y > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">A</text>
                                <text x={B1x + (B1x > cx ? 10 : -20)} y={B1y + (B1y > cy ? 18 : -8)} fill="#3B82F6" fontSize="14" fontWeight="bold">B</text>
                            </>
                        )}

                        {/* Second chord CD - shown from step 3 */}
                        {step >= 3 && (
                            <>
                                {/* Triangle OCD */}
                                <path d={`M ${cx} ${cy} L ${A2x} ${A2y} L ${B2x} ${B2y} Z`} fill="rgba(16, 185, 129, 0.3)" stroke="#10B981" strokeWidth="2" />
                                {/* Points and labels for CD */}
                                <circle cx={A2x} cy={A2y} r="4" fill="#10B981" />
                                <circle cx={B2x} cy={B2y} r="4" fill="#10B981" />
                                <text x={A2x + (A2x > cx ? 10 : -20)} y={A2y + (A2y > cy ? 18 : -8)} fill="#10B981" fontSize="14" fontWeight="bold">C</text>
                                <text x={B2x + (B2x > cx ? 10 : -20)} y={B2y + (B2y > cy ? 18 : -8)} fill="#10B981" fontSize="14" fontWeight="bold">D</text>
                            </>
                        )}

                        {/* Equal chords indication - shown from step 4 */}
                        {step >= 4 && (
                            <>
                                {/* Tick marks and equality label for AB and CD */}
                                {(() => {
                                    // Midpoints of AB and CD
                                    const M1x = (A1x + B1x) / 2, M1y = (A1y + B1y) / 2;
                                    const M2x = (A2x + B2x) / 2, M2y = (A2y + B2y) / 2;
                                    // Tick marks for AB and CD
                                    const tickLen = 14;
                                    const dx1 = (B1y - A1y), dy1 = -(B1x - A1x);
                                    const norm1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                                    const tx1 = dx1 / norm1, ty1 = dy1 / norm1;
                                    const dx2 = (B2y - A2y), dy2 = -(B2x - A2x);
                                    const norm2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                                    const tx2 = dx2 / norm2, ty2 = dy2 / norm2;
                                    return (
                                        <>
                                            {/* AB tick */}
                                            <line x1={M1x - tx1 * tickLen / 2} y1={M1y - ty1 * tickLen / 2} x2={M1x + tx1 * tickLen / 2} y2={M1y + ty1 * tickLen / 2} stroke="#8B5CF6" strokeWidth="3" />
                                            {/* CD tick */}
                                            <line x1={M2x - tx2 * tickLen / 2} y1={M2y - ty2 * tickLen / 2} x2={M2x + tx2 * tickLen / 2} y2={M2y + ty2 * tickLen / 2} stroke="#8B5CF6" strokeWidth="3" />
                                            {/* Equality label */}
                                            <text x={cx} y={(M1y + M2y) / 2 - 10} fill="#8B5CF6" fontSize="15" fontWeight="bold" textAnchor="middle">AB = CD</text>
                                        </>
                                    );
                                })()}
                            </>
                        )}

                        {/* Central angles - shown from step 5 */}
                        {step >= 5 && (
                            <>
                                {/* Angle arcs */}
                                {(() => {
                                    const arc1 = angleArc(cx, cy, A1x, A1y, B1x, B1y, 25);
                                    const arc2 = angleArc(cx, cy, A2x, A2y, B2x, B2y, 25);
                                    return (
                                        <>
                                            <path d={arc1.arc} fill="none" stroke="#F59E0B" strokeWidth="2" />
                                            <text x={arc1.labelX} y={arc1.labelY} fill="#F59E0B" fontSize="12" fontWeight="bold">∠AOB</text>
                                            <path d={arc2.arc} fill="none" stroke="#F59E0B" strokeWidth="2" />
                                            <text x={arc2.labelX} y={arc2.labelY} fill="#F59E0B" fontSize="12" fontWeight="bold">∠COD</text>
                                            {/* Equal angles label */}
                                            <text x={cx} y={cy - 50} fill="#F59E0B" fontSize="14" fontWeight="bold" textAnchor="middle">∠AOB = ∠COD</text>
                                        </>
                                    );
                                })()}
                            </>
                        )}

                        {/* Perpendicular distances - shown from step 6 */}
                        {step >= 6 && (
                            <>
                                {/* Perpendiculars from O to AB and CD, right angle markers, and distance labels */}
                                {(() => {
                                    // Midpoints
                                    const M1x = (A1x + B1x) / 2, M1y = (A1y + B1y) / 2;
                                    const M2x = (A2x + B2x) / 2, M2y = (A2y + B2y) / 2;
                                    // Perpendiculars
                                    return (
                                        <>
                                            {/* Perpendicular from O to AB */}
                                            <line x1={cx} y1={cy} x2={M1x} y2={M1y} stroke="#E11D48" strokeWidth="2" strokeDasharray="5 4" />
                                            {/* Right angle marker at M1 */}
                                            <circle cx={M1x} cy={M1y} r="3" fill="#E11D48" />
                                            {/* Distance label d₁ */}
                                            <text x={(cx + M1x) / 2 - 12} y={(cy + M1y) / 2 - 8} fill="#E11D48" fontSize="13" fontWeight="bold">d₁</text>
                                            
                                            {/* Perpendicular from O to CD */}
                                            <line x1={cx} y1={cy} x2={M2x} y2={M2y} stroke="#E11D48" strokeWidth="2" strokeDasharray="5 4" />
                                            {/* Right angle marker at M2 */}
                                            <circle cx={M2x} cy={M2y} r="3" fill="#E11D48" />
                                            {/* Distance label d₂ */}
                                            <text x={(cx + M2x) / 2 - 12} y={(cy + M2y) / 2 + 16} fill="#E11D48" fontSize="13" fontWeight="bold">d₂</text>
                                        </>
                                    );
                                })()}
                            </>
                        )}

                        {/* Final conclusion - shown from step 7 */}
                        {step >= 7 && (
                            <>
                                <text x={cx} y={320} fill="#059669" fontSize="14" fontWeight="bold" textAnchor="middle">d₁ = d₂ (equidistant from center)</text>
                            </>
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
};

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
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Theorem Statement:</h3>
                  <p className="font-medium">
                    In the same circle (or equal circles), <strong>equal chords</strong> subtend <strong>equal central angles</strong> and are <strong>equidistant</strong> from the center.
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Mathematical Form:</h3>
                  <p>If AB = CD (equal chords), then:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• ∠AOB = ∠COD (equal central angles)</li>
                    <li>• Distance from O to AB = Distance from O to CD</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Converse is True:</h3>
                  <p className="text-sm">All three conditions are equivalent - if any one is true, the others must also be true.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Central Angle Relationship */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Central Angle Relationship
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Why Equal Central Angles?</h3>
                  <p>Equal chords cut off equal arcs, and equal arcs correspond to equal central angles.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Arc-Chord Relationship:</h3>
                  <p>The length of a chord is directly related to the central angle it subtends and the radius of the circle.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Symmetry Principle:</h3>
                  <p className="text-sm">Equal chords exhibit identical geometric properties due to the perfect symmetry of circles.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Distance and Diagram */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <TheoremDiagram />
          
          {/* Distance Relationship */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Distance Relationship
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Equidistant Property:</h3>
                  <p>Equal chords are the same distance from the center, measured perpendicularly.</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Geometric Explanation:</h3>
                  <p>Since equal chords subtend equal central angles, they must be positioned symmetrically relative to the center.</p>
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
      slideId="ct-equal-chords-theorem-statement"
      slideTitle="Equal Chords Theorem"
      moduleId="circle-theorems-0001"
      submoduleId="equal-chords-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 