import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function AlternateSegmentTheoremSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: radius, 3: central angle, 4: inscribed angle, 5: tangent angle, 6: angle relationship, 7: conclusion

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-alternate-segment-proof',
      conceptId: 'ct-alternate-segment-proof',
      conceptName: 'Alternate Segment Proof',
      type: 'learning',
      description: 'Understanding the proof of the alternate segment theorem'
    },
    {
      id: 'ct-tangent-angle-calculation',
      conceptId: 'ct-tangent-angle-calculation',
      conceptName: 'Tangent Angle Calculation',
      type: 'learning',
      description: 'Calculating the angle between tangent and chord'
    },
    {
      id: 'ct-inscribed-angle-comparison',
      conceptId: 'ct-inscribed-angle-comparison',
      conceptName: 'Inscribed Angle Comparison',
      type: 'learning',
      description: 'Comparing tangent-chord angle with inscribed angle'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Standard: Tangent at A, chord AB, C in alternate segment
  const angleA = Math.PI * 0.25; // Point of tangency
  const Ax = cx + r * Math.cos(angleA), Ay = cy + r * Math.sin(angleA);
  const angleB = angleA + Math.PI / 1.5; // Chord endpoint, well separated
  const Bx = cx + r * Math.cos(angleB), By = cy + r * Math.sin(angleB);
  const angleC = angleA - Math.PI / 1.5; // C in alternate segment
  const Cx = cx + r * Math.cos(angleC), Cy = cy + r * Math.sin(angleC);

  // Tangent direction at A (perpendicular to radius OA)
  const radDirX = Ax - cx, radDirY = Ay - cy;
  const tanDirX = -radDirY, tanDirY = radDirX;
  const tanLen = 120;
  const tanX1 = Ax - (tanDirX / Math.hypot(tanDirX, tanDirY)) * tanLen;
  const tanY1 = Ay - (tanDirY / Math.hypot(tanDirX, tanDirY)) * tanLen;
  const tanX2 = Ax + (tanDirX / Math.hypot(tanDirX, tanDirY)) * tanLen;
  const tanY2 = Ay + (tanDirY / Math.hypot(tanDirX, tanDirY)) * tanLen;

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
  const ProofDiagram = () => {
  const [step, setStep] = useState(0);

  // Coordinate constants for the diagram
  const cx = 200;
  const cy = 175;
  const r = 120;
  const angleA = Math.PI / 4;
  const angleB = Math.PI * 0.8;
  const angleC = Math.PI * 1.5;
  const Ax = cx + r * Math.cos(angleA);
  const Ay = cy - r * Math.sin(angleA);
  const Bx = cx + r * Math.cos(angleB);
  const By = cy - r * Math.sin(angleB);
  const Cx = cx + r * Math.cos(angleC);
  const Cy = cy - r * Math.sin(angleC);
  const tanDirX = -(Ay - cy);
  const tanDirY = Ax - cx;
  const tangentLength = 200;
  const tanX1 = Ax + tanDirX / Math.hypot(tanDirX, tanDirY) * tangentLength;
  const tanY1 = Ay + tanDirY / Math.hypot(tanDirX, tanDirY) * tangentLength;
  const tanX2 = Ax - tanDirX / Math.hypot(tanDirX, tanDirY) * tangentLength;
  const tanY2 = Ay - tanDirY / Math.hypot(tanDirX, tanDirY) * tangentLength;

  // This is a placeholder for the angleArc function with corrected types
  const angleArc = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, radius: number) => {
    // Implementation would go here
    return {
      arc: "",
      labelX: 0,
      labelY: 0
    };
  };

  // The steps for the explanation
  const steps = [
    { title: "Introduction", description: "Click 'Next' to begin the proof of the Alternate Segment Theorem." },
    { title: "Step 1: Setup", description: "Draw the circle with center O. The tangent is perpendicular to the radius at point A." },
    { title: "Step 2: Tangent and Radius", description: "Draw the tangent at point A and the radius OA. The angle between them is 90°." },
    { title: "Step 3: Chord AB", description: "Draw a chord AB. This creates an angle with the tangent at A." },
    { title: "Step 4: Isosceles Triangle", description: "Draw triangle OAB. Since OA and OB are radii, △OAB is isosceles. We mark the equal base angles as 'x'." },
    { title: "Step 5: Point C", description: "Add a point C in the alternate segment and draw triangle ABC." },
    { title: "Step 6: Tangent-Chord Angle", description: "Mark the angle 'θ' between the tangent and chord at A. We want to prove this angle is equal to 'α'." },
    { title: "Step 7: Inscribed Angle", description: "Mark the angle 'α' at C, which is subtended by the same chord AB in the alternate segment." },
    { title: "Step 8: Calculation", description: "Using triangle and circle theorems, we can prove that θ = α." },
    { title: "Step 9: Conclusion", description: "The Alternate Segment Theorem proves that the angle between the tangent and a chord equals the angle in the alternate segment." }
  ];

  // These are your original JSX elements with their own step logic
  const rightAngleBox = step >= 2 ? (
    <g>
      {(() => {
        const radiusUnitX = (cx - Ax) / r;
        const radiusUnitY = (cy - Ay) / r;
        const offset = 12;
        const sqX = Ax + radiusUnitX * offset;
        const sqY = Ay + radiusUnitY * offset;
        const rotationAngle = Math.atan2(radiusUnitY, radiusUnitX) * 180 / Math.PI;
        return (
          <>
            <rect x={-10} y={-10} width="12" height="12" fill="none" stroke="#F59E0B" strokeWidth="2"
              transform={`translate(${sqX}, ${sqY}) rotate(${rotationAngle})`} />
            <text x={sqX - 8} y={sqY - 15} fill="#F59E0B" fontSize="10" fontWeight="bold">90°</text>
          </>
        );
      })()}
    </g>
  ) : null;

  const isoscelesAngles = step >= 4 ? (
    <g>
      <text x={Ax + (Bx - Ax) * 0.18 - 10} y={Ay + (By - Ay) * 0.18 - 8} fill="#8B5CF6" fontSize="13" fontWeight="bold">x</text>
      <text x={Bx + (Ax - Bx) * 0.18 - 10} y={By + (Ay - By) * 0.18 - 8} fill="#8B5CF6" fontSize="13" fontWeight="bold">x</text>
    </g>
  ) : null;

  const calcOverlay = step >= 8 ? (
    <g>
      <rect x="30" y="250" width="340" height="70" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" rx="10" />
      <text x="200" y="270" textAnchor="middle" fill="#0C4A6E" fontSize="13" fontWeight="bold">
        θ = 90° - x
      </text>
      <text x="200" y="290" textAnchor="middle" fill="#0C4A6E" fontSize="13">
        α = ½(180° - 2x) = 90° - x
      </text>
      <text x="200" y="310" textAnchor="middle" fill="#DC2626" fontSize="14" fontWeight="bold">
        ∴ θ = α
      </text>
    </g>
  ) : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      {/* 1. Headline */}
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">Proof of the Alternate Segment Theorem</h1>

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
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Alternate Segment Theorem Proof</h3>
          <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
            {/* 1. Circle */}
            {step >= 1 && (
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke="#64748B"
                strokeWidth="2"
              />
            )}
            {/* 2. Center O */}
            {step >= 1 && (
              <g>
                <circle cx={cx} cy={cy} r="3" fill="#374151" />
                <text x={cx + 10} y={cy - 2} fill="#374151" fontSize="12" fontWeight="bold">O</text>
              </g>
            )}
            {/* 3. Tangent at A and radius OA */}
            {step >= 2 && (
              <>
                {/* Tangent at A */}
                <line
                  x1={tanX1}
                  y1={tanY1}
                  x2={tanX2}
                  y2={tanY2}
                  stroke="#DC2626"
                  strokeWidth="2"
                />
                <text x={tanX2 + 10} y={tanY2 - 8} fill="#DC2626" fontSize="12" fontWeight="bold">Tangent</text>
                {/* Radius OA */}
                <line x1={cx} y1={cy} x2={Ax} y2={Ay} stroke="#8B5CF6" strokeWidth="2" />
                <text x={Ax + (cx - Ax) * 0.5 - 18} y={Ay + (cy - Ay) * 0.5 - 10} fill="#8B5CF6" fontSize="12" fontWeight="bold">OA</text>
                {rightAngleBox}
              </>
            )}
            {/* 4. Chord AB */}
            {step >= 3 && (
              <line
                x1={Ax}
                y1={Ay}
                x2={Bx}
                y2={By}
                stroke="#3B82F6"
                strokeWidth="3"
              />
            )}
            {/* 5. Triangle OAB (isosceles) */}
            {step >= 4 && (
              <g>
                <line x1={cx} y1={cy} x2={Bx} y2={By} stroke="#8B5CF6" strokeWidth="2" />
                <text x={Bx + (cx - Bx) * 0.5 + 10} y={By + (cy - By) * 0.5 + 18} fill="#8B5CF6" fontSize="12" fontWeight="bold">OB</text>
                {isoscelesAngles}
              </g>
            )}
            {/* 6. Points A, B, C and triangle ABC */}
            {step >= 5 && (
              <g>
                <circle cx={Ax} cy={Ay} r="4" fill="#DC2626" />
                <text x={Ax + 10} y={Ay - 10} fill="#DC2626" fontSize="16" fontWeight="bold">A</text>
                <circle cx={Bx} cy={By} r="4" fill="#3B82F6" />
                <text x={Bx + (Bx > cx ? 10 : -20)} y={By + (By > cy ? 18 : -8)} fill="#3B82F6" fontSize="16" fontWeight="bold">B</text>
                <circle cx={Cx} cy={Cy} r="4" fill="#10B981" />
                <text x={Cx + (Cx > cx ? 10 : -20)} y={Cy + (Cy > cy ? 18 : -8)} fill="#10B981" fontSize="16" fontWeight="bold">C</text>
                <line x1={Ax} y1={Ay} x2={Cx} y2={Cy} stroke="#64748B" strokeWidth="2" strokeDasharray="3,3" />
                <line x1={Bx} y1={By} x2={Cx} y2={Cy} stroke="#64748B" strokeWidth="2" strokeDasharray="3,3" />
              </g>
            )}
            {/* 7. Angle between tangent and chord at A (θ) */}
            {step >= 6 && (() => {
              const tanEndX = Ax + (tanDirX / Math.hypot(tanDirX, tanDirY)) * 40;
              const tanEndY = Ay + (tanDirY / Math.hypot(tanDirX, tanDirY)) * 40;
              const { arc, labelX, labelY } = angleArc(Ax, Ay, tanEndX, tanEndY, Bx, By, 22);
              return <>
                <path d={arc} fill="none" stroke="#F59E0B" strokeWidth="3" />
                <text x={labelX + 8} y={labelY - 8} fill="#F59E0B" fontSize="14" fontWeight="bold">θ</text>
                <text x={labelX + 28} y={labelY - 18} fill="#F59E0B" fontSize="12" fontWeight="bold">∠BAT</text>
              </>;
            })()}
            {/* 8. Angle at C subtended by AB (α) */}
            {step >= 7 && (() => {
              const { arc, labelX, labelY } = angleArc(Cx, Cy, Ax, Ay, Bx, By, 22);
              return <>
                <path d={arc} fill="none" stroke="#10B981" strokeWidth="3" />
                <text x={labelX - 10} y={labelY + 8} fill="#10B981" fontSize="14" fontWeight="bold">α</text>
                <text x={labelX - 38} y={labelY + 28} fill="#10B981" fontSize="12" fontWeight="bold">∠ACB</text>
              </>;
            })()}
            {/* 9. Calculation overlay */}
            {calcOverlay}
            {/* 10. Theorem statement box */}
            {step >= 9 && <>
              <rect
                x="30" y="20" width="340" height="40"
                fill="#F3F4F6" stroke="#6B7280" strokeWidth="2"
                rx="10"
              />
              <text x="200" y="45" textAnchor="middle" fill="#1F2937" fontSize="16" fontWeight="bold">
                Alternate Segment Theorem: ∠BAT = ∠ACB
              </text>
            </>}
          </svg>
          <div className="text-center text-sm text-gray-700 dark:text-gray-300 mt-2 min-h-[2em]">
            {steps[step] ? steps[step].description : ''}
          </div>
          
        </div>
      </div>
    </div>
  );
};
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
                    <li>• Tangent at point A</li>
                    <li>• Chord AB from tangent point</li>
                    <li>• Point C in alternate segment</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">To Prove:</h3>
                  <p className="font-medium">∠TAB = ∠ACB</p>
                  <p className="text-sm mt-2">(Tangent-chord angle = Inscribed angle in alternate segment)</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Proof Strategy:</h3>
                  <p>Use the central-inscribed angle theorem and tangent-radius perpendicularity to establish the relationship.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Central-Inscribed Relationship */}
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Step 1: Central-Inscribed Angles
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Central Angle ∠AOB:</h3>
                  <p>Let ∠AOB = θ (central angle subtending arc AB)</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Inscribed Angle ∠ACB:</h3>
                  <p>By the central-inscribed angle theorem:</p>
                  <p className="font-bold">∠ACB = ½∠AOB = θ/2</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Insight:</h3>
                  <p className="text-sm">The inscribed angle in the alternate segment equals half the central angle subtending the same arc.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Diagram and Tangent Application */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <ProofDiagram />
          
          {/* Tangent-Radius Application */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
           <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Step 2: Tangent-Radius Relationship
              </h2>
              
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Perpendicularity:</h3>
                  <p>Tangent ⊥ radius OA at point A</p>
                  <p>Therefore: ∠TAO = 90°</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Angle Analysis:</h3>
                  <p>In triangle TAO: ∠TAO + ∠AOB + ∠TAB = 180°</p>
                  <p>Since ∠TAO = 90°: ∠TAB = 90° - ∠AOB/2</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Final Result:</h3>
                  <p className="font-bold">∠TAB = ∠ACB = θ/2</p>
                  <p className="text-sm mt-2">Both angles equal half the central angle!</p>
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
      slideId="ct-alternate-segment-theorem-proof"
      slideTitle="Proof Setup"
      moduleId="circle-theorems-0001"
      submoduleId="alternate-segment-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 
 