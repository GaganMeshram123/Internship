import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ScalarMultiplicationSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'scalar-multiplication-concept',
      conceptId: 'scalar-multiplication',
      conceptName: 'Scalar Multiplication of Vectors',
      type: 'learning',
      description: 'Understanding how scalars scale vectors while preserving direction'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
      <div className="grid grid-cols-2 gap-8 h-full">
        {/* Left column - Explanation */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-5">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="space-y-4">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-semibold text-blue-700 dark:text-blue-300">Scalar Multiplication:</span> When a vector is multiplied by a scalar quantity, the direction of the vector is retained, while the magnitude is multiplied by the scalar.
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-3">Key Insights</div>
                
                <div className="space-y-3">
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <InlineMath math="1 \times \vec{A} = \vec{A}" />
                  </div>
                  
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <InlineMath math="N \times \vec{A} = \vec{A} + \vec{A} + \cdots \text{ (N times)}" />
                  </div>
                  
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <InlineMath math="-1 \times \vec{A} = -\vec{A}" />
                  </div>
                  
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <InlineMath math="0 \times \vec{A} = 0" />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">What Changes?</div>
                <div className="space-y-2">
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    • <span className="font-medium">Magnitude:</span> Multiplied by the scalar
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    • <span className="font-medium">Direction:</span> Stays the same (unless scalar is negative)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Special Cases</div>
                <div className="space-y-2">
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    • <span className="font-medium">Positive scalar:</span> Same direction, scaled magnitude
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    • <span className="font-medium">Negative scalar:</span> Opposite direction, scaled magnitude
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    • <span className="font-medium">Zero scalar:</span> Results in zero vector
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Animation */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col space-y-4">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Scalar Multiplication Animation
          </div>
          
          <div className="flex-1">
            <svg width="100%" height="500" viewBox="0 0 400 400" className="border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900">
              {/* Grid */}
              <defs>
                <pattern id="scalarGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                </pattern>
                <marker id="vectorArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#3B82F6" />
                </marker>
                <marker id="scaledArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#EF4444" />
                </marker>
                <marker id="negativeArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#10B981" />
                </marker>
                <marker id="zeroArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#9333EA" />
                </marker>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#scalarGrid)" />
              
              {/* Axes */}
              <line x1="200" y1="20" x2="200" y2="380" stroke="#6b7280" strokeWidth="2"/>
              <line x1="20" y1="200" x2="380" y2="200" stroke="#6b7280" strokeWidth="2"/>
              <text x="210" y="35" className="fill-gray-600 text-sm font-bold">y</text>
              <text x="365" y="215" className="fill-gray-600 text-sm font-bold">x</text>

              {/* Original vector A */}
              <line x1="200" y1="200" x2="280" y2="120" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#vectorArrow)">
                <animate attributeName="opacity" values="0;1;1;1;1;1;1;1;1;1;1;1;1" dur="13s" repeatCount="indefinite"/>
              </line>
              <text x="285" y="115" className="fill-blue-600 text-lg font-bold">A
                <animate attributeName="opacity" values="0;1;1;1;1;1;1;1;1;1;1;1;1" dur="13s" repeatCount="indefinite"/>
              </text>

              {/* 2 × A */}
              <line x1="200" y1="200" x2="360" y2="40" stroke="#EF4444" strokeWidth="3" markerEnd="url(#scaledArrow)">
                <animate attributeName="opacity" values="0;0;1;1;0;0;0;0;0;0;0;0;0" dur="13s" repeatCount="indefinite"/>
              </line>
              <text x="320" y="80" className="fill-red-600 text-lg font-bold">2A
                <animate attributeName="opacity" values="0;0;1;1;0;0;0;0;0;0;0;0;0" dur="13s" repeatCount="indefinite"/>
              </text>

              {/* 0.5 × A */}
              <line x1="200" y1="200" x2="240" y2="160" stroke="#EF4444" strokeWidth="3" markerEnd="url(#scaledArrow)">
                <animate attributeName="opacity" values="0;0;0;0;1;1;0;0;0;0;0;0;0" dur="13s" repeatCount="indefinite"/>
              </line>
              <text x="245" y="155" className="fill-red-600 text-lg font-bold">0.5A
                <animate attributeName="opacity" values="0;0;0;0;1;1;0;0;0;0;0;0;0" dur="13s" repeatCount="indefinite"/>
              </text>

              {/* 3 × A */}
              <line x1="200" y1="200" x2="440" y2="-40" stroke="#EF4444" strokeWidth="3" markerEnd="url(#scaledArrow)" clipPath="url(#clipPath)">
                <animate attributeName="opacity" values="0;0;0;0;0;0;1;1;0;0;0;0;0" dur="13s" repeatCount="indefinite"/>
              </line>
              <text x="350" y="50" className="fill-red-600 text-lg font-bold">3A
                <animate attributeName="opacity" values="0;0;0;0;0;0;1;1;0;0;0;0;0" dur="13s" repeatCount="indefinite"/>
              </text>

              {/* -1 × A */}
              <line x1="200" y1="200" x2="120" y2="280" stroke="#10B981" strokeWidth="3" markerEnd="url(#negativeArrow)">
                <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;1;1;0;0;0" dur="13s" repeatCount="indefinite"/>
              </line>
              <text x="80" y="295" className="fill-green-600 text-lg font-bold">-A
                <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;1;1;0;0;0" dur="13s" repeatCount="indefinite"/>
              </text>

              {/* -2 × A */}
              <line x1="200" y1="200" x2="40" y2="360" stroke="#10B981" strokeWidth="3" markerEnd="url(#negativeArrow)">
                <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;1;1;0" dur="13s" repeatCount="indefinite"/>
              </line>
              <text x="20" y="375" className="fill-green-600 text-lg font-bold">-2A
                <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;1;1;0" dur="13s" repeatCount="indefinite"/>
              </text>

              {/* 0 × A (point at origin) */}
              <circle cx="200" cy="200" r="6" fill="#9333EA">
                <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;0;0;1" dur="13s" repeatCount="indefinite"/>
              </circle>
              <text x="210" y="195" className="fill-purple-600 text-lg font-bold">0
                <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0;0;0;0;1" dur="13s" repeatCount="indefinite"/>
              </text>

              {/* Clip path for vectors that go outside viewBox */}
              <defs>
                <clipPath id="clipPath">
                  <rect x="0" y="0" width="400" height="400"/>
                </clipPath>
              </defs>

              {/* Origin marker */}
              <circle cx="200" cy="200" r="3" fill="#374151" />
              <text x="180" y="220" className="fill-gray-600 text-sm font-bold">O</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="scalar-multiplication"
      slideTitle="Scalar Multiplication of Vectors"
      moduleId="vectors"
      submoduleId="vector-operations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 