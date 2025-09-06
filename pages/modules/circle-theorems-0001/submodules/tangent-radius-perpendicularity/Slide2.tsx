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
  }const stepContents = [
  "Step 1: Visualize the circle centered at O",
  "Step 2: Draw the tangent touching the circle at T",
  "Step 3: Radius connects center O to tangent point T",
  "Step 4: Tangent is perpendicular to radius at point T"
];
const steps = [
  { title: "Visualize the Circle", description: "Step 1: Visualize the circle centered at O" },
  { title: "Draw the Tangent", description: "Step 2: Draw the tangent touching the circle at T" },
  { title: "Connect Radius", description: "Step 3: Radius connects center O to tangent point T" },
  { title: "Perpendicularity Proof", description: "Step 4: Tangent is perpendicular to radius at point T" },
];
const ProofDiagram = () => {
  const [step, setStep] = useState(0);

  // Circle center and radius
  const cx = 200;
  const cy = 200;
  const r = 100;

  // Tangent point (top of circle)
  const tx = cx;
  const ty = cy - r;

  // Tangent line coordinates
  const tangentLength = 150;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500 transform hover:scale-[1.005] animate-fade-in">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Proof by Shortest Distance
      </h3>

      {/* Step Indicator */}
      <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
        <span className="font-semibold text-blue-600 dark:text-blue-400 text-lg">
          Step {step + 1}
        </span>
        <span className="font-light">of {steps.length}</span>
        <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 dark:bg-blue-300 transition-all duration-300 ease-out"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 bg-blue-50 dark:bg-slate-800 rounded-xl shadow-inner border border-blue-100 dark:border-slate-700 transition-all duration-300 mb-6">
        <h3 className="font-bold text-xl text-blue-700 dark:text-blue-300 animate-slide-in-up">
          {steps[step].title}
        </h3>
        <p className="text-slate-700 dark:text-slate-300 mt-3 leading-relaxed text-base animate-fade-in-slow">
          {steps[step].description}
        </p>
      </div>

      {/* Buttons above the circle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium disabled:opacity-50"
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          ← Previous
        </button>

        <button
          className="px-4 py-2 rounded bg-indigo-600 text-white font-medium disabled:opacity-50"
          onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
        >
          Next →
        </button>
      </div>

      <svg width="400" height="400" className="mx-auto">
        {/* Circle */}
        {step >= 0 && (
          <circle cx={cx} cy={cy} r={r} stroke="#3b82f6" strokeWidth="3" fill="transparent" />
        )}

        {/* Tangent */}
        {step >= 1 && (
          <>
            <line
              x1={tx - tangentLength}
              y1={ty}
              x2={tx + tangentLength}
              y2={ty}
              stroke="#f97316"
              strokeWidth="3"
            />
            {/* Tangent label */}
            <text
              x={tx + tangentLength - 40}
              y={ty - 10}
              fill="#f97316"
              fontWeight="bold"
              fontSize="14"
            >
              Tangent
            </text>
          </>
        )}

        {/* Radius */}
        {step >= 2 && (
          <>
            <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="#10b981" strokeWidth="3" />
            {/* Radius label */}
            <text
              x={cx + (tx - cx) / 2 - 20}
              y={cy + (ty - cy) / 2 - 10}
              fill="#10b981"
              fontWeight="bold"
              fontSize="14"
            >
              Radius
            </text>
          </>
        )}

        {/* Tangent point T */}
        {step >= 1 && (
          <>
            <circle cx={tx} cy={ty} r={6} fill="#ef4444" stroke="#fff" strokeWidth="2" />
            <text x={tx + 10} y={ty - 10} fill="#ef4444" fontWeight="bold" fontSize="14">
              T
            </text>
          </>
        )}

        {/* Right angle / perpendicular notation */}
        {step >= 2 && (
          <polyline
            points={`${tx - 10},${ty} ${tx - 10},${ty + 10} ${tx},${ty + 10}`}
            stroke="#000"
            strokeWidth="2"
            fill="none"
          />
        )}
      </svg>
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