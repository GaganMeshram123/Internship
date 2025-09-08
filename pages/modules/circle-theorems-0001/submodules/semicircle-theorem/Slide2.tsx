import React, { useState } from 'react';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function SemicircleTheoremSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [step, setStep] = useState(0); // 0: nothing, 1: setup, 2: diameter, 3: central angle, 4: straight line, 5: ratio application, 6: final result

  const slideInteractions: Interaction[] = [
    {
      id: 'ct-semicircle-proof-setup',
      conceptId: 'ct-semicircle-proof-setup',
      conceptName: 'Proof Setup',
      type: 'learning',
      description: 'Understanding the setup for proving the semicircle theorem'
    },
    {
      id: 'ct-diameter-central-angle',
      conceptId: 'ct-diameter-central-angle',
      conceptName: 'Diameter Central Angle',
      type: 'learning',
      description: 'Understanding that diameter creates 180° central angle'
    },
    {
      id: 'ct-ratio-application',
      conceptId: 'ct-ratio-application',
      conceptName: 'Ratio Application',
      type: 'learning',
      description: 'Applying the 2:1 ratio to prove 90° inscribed angle'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Geometry
  const cx = 200, cy = 175, r = 120;
  // Diameter A and B
  const Ax = cx - r, Ay = cy;
  const Bx = cx + r, By = cy;
  // Point P on circumference
  const angleP = Math.PI * 0.7;
  const Px = cx + r * Math.cos(angleP), Py = cy + r * Math.sin(angleP);

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
  const ProofDiagram = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Semicircle Theorem Proof</h3>
      <svg width="400" height="350" viewBox="0 0 400 350" className="mx-auto">
        {/* Circle */}
        {step >= 1 && (
          <circle 
            cx="200" 
            cy="175" 
            r="120" 
            fill="none" 
            stroke="#64748B" 
            strokeWidth="2"
            className="animate-[draw_1s_ease-in-out]"
          />
        )}
        
        {/* Center O */}
        {step >= 1 && (
          <g>
            <circle cx="200" cy="175" r="4" fill="#DC2626" />
            <text x="210" y="173" fill="#DC2626" fontSize="14" fontWeight="bold">O</text>
          </g>
        )}
        
        {/* Point P */}
        {step >= 1 && (
          <g>
            <circle cx="200" cy="55" r="5" fill="#3B82F6" />
            <text x="210" y="53" fill="#3B82F6" fontSize="16" fontWeight="bold">P</text>
          </g>
        )}
        
        {/* Diameter AB */}
        {step >= 2 && (
          <g>
            <line 
              x1="80" 
              y1="175" 
              x2="320" 
              y2="175" 
              stroke="#DC2626" 
              strokeWidth="4"
              className="animate-[draw_1s_ease-in-out]"
            />
            <circle cx="80" cy="175" r="4" fill="#DC2626" />
            <circle cx="320" cy="175" r="4" fill="#DC2626" />
            <text x="70" y="165" fill="#DC2626" fontSize="16" fontWeight="bold">A</text>
            <text x="325" y="165" fill="#DC2626" fontSize="16" fontWeight="bold">B</text>
            
            {/* Lines AP and BP */}
            <line x1="80" y1="175" x2="200" y2="55" stroke="#3B82F6" strokeWidth="2" />
            <line x1="320" y1="175" x2="200" y2="55" stroke="#3B82F6" strokeWidth="2" />
          </g>
        )}
        
        {/* Central angle AOB = 180° */}
        {step >= 3 && (
          <g>
            {/* Radii to show central angle */}
            <line 
              x1="200" y1="175" x2="80" y2="175" 
              stroke="#FFD700" strokeWidth="3" strokeDasharray="5,5"
              className="animate-[draw_0.8s_ease-in-out]"
            />
            <line 
              x1="200" y1="175" x2="320" y2="175" 
              stroke="#FFD700" strokeWidth="3" strokeDasharray="5,5"
              className="animate-[draw_0.8s_ease-in-out]"
            />
            
            {/* Central angle arc */}
            <path 
              d="M 150 175 A 50 50 0 0 0 250 175" 
              fill="none" 
              stroke="#FFD700" 
              strokeWidth="4"
              className="animate-[draw_1s_ease-in_out]"
            />
            <text x="185" y="155" fill="#FFD700" fontSize="16" fontWeight="bold">∠AOB</text>
          </g>
        )}
        
        {/* Straight line indication */}
        {step >= 4 && (
          <g>
            <text x="200" y="200" textAnchor="middle" fill="#FFD700" fontSize="18" fontWeight="bold" className="animate-pulse">
              180°
            </text>
            <text x="200" y="220" textAnchor="middle" fill="#FFD700" fontSize="12" className="animate-pulse">
              (straight line)
            </text>
          </g>
        )}
        
        {/* Ratio application */}
        
        {step >= 5 && (
          <g>
            {/* Inscribed angle */}
            <path 
              d="M 190 65 A 15 15 0 0 1 210 65" 
              fill="none" 
              stroke="#3B82F6" 
              strokeWidth="3"
              className="animate-pulse"
            />
            <text x="180" y="80" fill="#3B82F6" fontSize="14" fontWeight="bold">∠APB</text>
            
            {/* Calculation box */}
            <rect 
              x="30" y="280" width="340" height="60" 
              fill="#F3F4F6" stroke="#6B7280" strokeWidth="2" 
              rx="10"
              className="animate-[fade-in_1s_ease-in-out]"
            />
            <text x="200" y="300" textAnchor="middle" fill="#1F2937" fontSize="14" fontWeight="bold">
              Central-Circumference Ratio: Central = 2 × Inscribed
            </text>
            <text x="200" y="318" textAnchor="middle" fill="#1F2937" fontSize="14">
              180° = 2 × ∠APB
            </text>
            <text x="200" y="332" textAnchor="middle" fill="#DC2626" fontSize="14" fontWeight="bold">
              Therefore: ∠APB = 180° ÷ 2 = 90°
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
        {/* Left column - Proof Steps */}
        <div className="space-y-6">
          {/* Proof Setup */}
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
           <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Given:</h3>
                  <ul className="space-y-2">
                    <li>• Circle with center O</li>
                    <li>• Diameter AB</li>
                    <li>• Point P on circumference</li>
                    <li>• We want to prove ∠APB = 90°</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Strategy:</h3>
                  <p>Use the central-circumference ratio theorem that we proved earlier.</p>
                </div>
                
               <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Key Insight:</h3>
                  <p>A diameter creates a special central angle of exactly 180°.</p>
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
                Step 1: Central Angle
              </h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Diameter = Straight Line:</h3>
                  <p>Since AB is a diameter, it passes through the center O and forms a straight line.</p>
                  <p className="mt-2 font-medium">Central angle ∠AOB = 180°</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Why 180°?</h3>
                  <p>A straight line creates a straight angle, which measures exactly 180°.</p>
                  <p className="text-sm mt-2 italic">This is a fundamental geometric fact.</p>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Diagram and Completion */}
        <div className="space-y-6">
          {/* Interactive Diagram */}
          <ProofDiagram />
          
          {/* Apply Ratio Theorem */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                Step 2: Apply Ratio Theorem
              </h2>
              <div className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Central-Circumference Ratio:</h3>
                  <p>We know that: Central angle = 2 × ∠APB</p>
                  <p className="mt-2">∠AOB = 2 × ∠APB</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Substitute Known Values:</h3>
                  <p>180° = 2 × ∠APB</p>
                  <p className="mt-2">∠APB = 180° ÷ 2 = 90°</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3">Conclusion:</h3>
                  <p className="font-bold">∠APB = 90° ✓</p>
                  <p className="text-sm mt-2 italic">Any angle subtended by a diameter is a right angle</p>
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
      slideId="ct-semicircle-theorem-proof"
      slideTitle="Proof Setup"
      moduleId="circle-theorems-0001"
      submoduleId="semicircle-theorem"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 