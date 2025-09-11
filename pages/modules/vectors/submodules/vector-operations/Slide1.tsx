import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function VectorAdditionSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'vector-addition-concept',
      conceptId: 'vector-addition',
      conceptName: 'Vector Addition Understanding',
      type: 'learning',
      description: 'Understanding how two displacement vectors combine to give a final displacement'
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
                <span className="font-semibold text-blue-700 dark:text-blue-300">Vector Addition:</span> What happens when we combine two displacements?
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">The Question</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  A person first moves with displacement <InlineMath math="\vec{A} = 6\hat{i} + 2\hat{j}" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  Then moves again with displacement <InlineMath math="\vec{B} = 5\hat{i} + 8\hat{j}" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 font-semibold text-blue-600 dark:text-blue-400">
                  What is the final displacement from the starting point?
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800">
                <div className="text-blue-700 dark:text-blue-300 font-medium">How to Add Vectors</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  How could one define the addition of two directed quantities?
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  The addition of two vectors is done as:
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300 mb-3">
                  <li>Place the tail of one vector on the head of another.</li>
                  <li>Draw an arrow from the free tail to the free head.</li>
                  <li>As you can see, the order does not matter.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-slate-700 dark:text-slate-300 font-medium mb-2">Vector Addition Rule</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  When adding vectors, we add their components separately:
                </div>
                <div className="text-center mb-3">
                  <BlockMath math="\vec{A} + \vec{B} = (A_x + B_x)\hat{i} + (A_y + B_y)\hat{j}" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  So: <InlineMath math="\vec{A} + \vec{B} = (6+5)\hat{i} + (2+8)\hat{j} = 11\hat{i} + 10\hat{j}" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="text-green-700 dark:text-green-300 font-medium mb-2">Physical Meaning</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The person ends up 11 steps right and 10 steps up from where they started, regardless of the path taken.
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Animation */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-gray-900 dark:text-white font-medium mb-4">Vector Addition Animation</h3>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <svg width="100%" height="400" viewBox="0 0 500 400" className="mx-auto">
              {/* Grid lines */}
              <defs>
                <pattern id="additionGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="500" height="400" fill="url(#additionGrid)" />
              
              {/* Axes */}
              <line x1="75" y1="325" x2="450" y2="325" stroke="#374151" strokeWidth="3" markerEnd="url(#axisArrow)"/>
              <line x1="75" y1="325" x2="75" y2="75" stroke="#374151" strokeWidth="3" markerEnd="url(#axisArrow)"/>
              
              {/* Arrow markers */}
              <defs>
                <marker id="axisArrow" markerWidth="12" markerHeight="9" refX="10" refY="4.5" orient="auto">
                  <polygon points="0 0, 12 4.5, 0 9" fill="#374151" />
                </marker>
                <marker id="vectorArrowA" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                  <polygon points="0 0, 10 4, 0 8" fill="#3B82F6" />
                </marker>
                <marker id="vectorArrowB" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                  <polygon points="0 0, 10 4, 0 8" fill="#EF4444" />
                </marker>
                <marker id="vectorArrowFinal" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                  <polygon points="0 0, 10 4, 0 8" fill="#10B981" />
                </marker>
              </defs>
              
              {/* Axis labels */}
              <text x="460" y="330" className="fill-gray-600 dark:fill-gray-400 text-lg font-medium">x</text>
              <text x="65" y="65" className="fill-gray-600 dark:fill-gray-400 text-lg font-medium">y</text>
              
              {/* Moving dot animation */}
              <circle r="8" fill="#dc2626" stroke="#b91c1c" strokeWidth="2">
                <animate attributeName="cx" values="75;75;225;225;350;350;75" dur="8s" repeatCount="indefinite"/>
                <animate attributeName="cy" values="325;325;325;275;275;125;325" dur="8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0;1;1;1;1;0;0" dur="8s" repeatCount="indefinite"/>
              </circle>
              
              {/* First vector A = 6i + 2j */}
              <g>
                {/* x-component of A */}
                <line x1="75" y1="325" x2="225" y2="325" stroke="#3B82F6" strokeWidth="4" strokeDasharray="6,6">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0;1;1;0;0;0;0" dur="8s" repeatCount="indefinite"/>
                </line>
                <text x="150" y="315" className="fill-blue-600 text-lg font-bold">6î
                  <animate attributeName="opacity" values="0;1;1;0;0;0;0" dur="8s" repeatCount="indefinite"/>
                </text>
                
                {/* y-component of A */}
                <line x1="225" y1="325" x2="225" y2="275" stroke="#3B82F6" strokeWidth="4" strokeDasharray="6,6">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0;0;1;1;0;0;0" dur="8s" repeatCount="indefinite"/>
                </line>
                <text x="235" y="300" className="fill-blue-600 text-lg font-bold">2ĵ
                  <animate attributeName="opacity" values="0;0;1;1;0;0;0" dur="8s" repeatCount="indefinite"/>
                </text>
                
                {/* Vector A */}
                <line x1="75" y1="325" x2="225" y2="275" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#vectorArrowA)">
                  <animate attributeName="opacity" values="0;0;0;1;1;1;1" dur="8s" repeatCount="indefinite"/>
                </line>
                <text x="140" y="295" className="fill-blue-600 text-lg font-bold">A
                  <animate attributeName="opacity" values="0;0;0;1;1;1;1" dur="8s" repeatCount="indefinite"/>
                </text>
              </g>
              
              {/* Second vector B = 5i + 8j (starting from end of A) */}
              <g>
                {/* x-component of B */}
                <line x1="225" y1="275" x2="350" y2="275" stroke="#EF4444" strokeWidth="4" strokeDasharray="6,6">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0;0;0;0;1;0;0" dur="8s" repeatCount="indefinite"/>
                </line>
                <text x="287" y="265" className="fill-red-600 text-lg font-bold">5î
                  <animate attributeName="opacity" values="0;0;0;0;1;0;0" dur="8s" repeatCount="indefinite"/>
                </text>
                
                {/* y-component of B */}
                <line x1="350" y1="275" x2="350" y2="125" stroke="#EF4444" strokeWidth="4" strokeDasharray="6,6">
                  <animate attributeName="stroke-dashoffset" values="0;-12" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0;0;0;0;0;1;0" dur="8s" repeatCount="indefinite"/>
                </line>
                <text x="360" y="200" className="fill-red-600 text-lg font-bold">8ĵ
                  <animate attributeName="opacity" values="0;0;0;0;0;1;0" dur="8s" repeatCount="indefinite"/>
                </text>
                
                {/* Vector B */}
                <line x1="225" y1="275" x2="350" y2="125" stroke="#EF4444" strokeWidth="3" markerEnd="url(#vectorArrowB)">
                  <animate attributeName="opacity" values="0;0;0;0;0;1;1" dur="8s" repeatCount="indefinite"/>
                </line>
                <text x="275" y="190" className="fill-red-600 text-lg font-bold">B
                  <animate attributeName="opacity" values="0;0;0;0;0;1;1" dur="8s" repeatCount="indefinite"/>
                </text>
              </g>
              
              {/* Final resultant vector A + B */}
              <line x1="75" y1="325" x2="350" y2="125" stroke="#10B981" strokeWidth="4" markerEnd="url(#vectorArrowFinal)">
                <animate attributeName="opacity" values="0;0;0;0;0;0;1" dur="8s" repeatCount="indefinite"/>
              </line>
              <text x="120" y="160" className="fill-green-600 text-xl font-bold">A + B = 11î + 10ĵ
                <animate attributeName="opacity" values="0;0;0;0;0;0;1" dur="8s" repeatCount="indefinite"/>
              </text>
              
              {/* Origin marker */}
              <circle cx="75" cy="325" r="4" className="fill-gray-600 dark:fill-gray-400"/>
              <text x="80" y="340" className="fill-gray-600 dark:fill-gray-400 text-sm">Origin</text>
            </svg>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-lg text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-blue-700 dark:text-blue-300">Animation shows:</span>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Red dot moves along first displacement: 6 right, 2 up</li>
                <li>Then moves along second displacement: 5 right, 8 up</li>
                <li>Final position is 11 right, 10 up from start</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="vector-addition"
      slideTitle="Vector Addition"
      moduleId="vectors"
      submoduleId="vector-operations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 