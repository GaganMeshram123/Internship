import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import SlideComponentWrapper from '../../../../common-components/SlideComponentWrapper';
import { TrackedInteraction, Interaction, InteractionResponse } from '../../../../common-components/concept';


export default function AdvancedLCMSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'advanced-lcm-concept',
      conceptId: 'advanced-lcm-method',
      conceptName: 'Advanced LCM Application',
      type: 'learning',
      description: 'Understanding advanced LCM applications for complex ratios'
    },
    {
      id: 'advanced-lcm-quiz',
      conceptId: 'lcm-calculation-quiz',
      conceptName: 'LCM Calculation Quiz',
      type: 'judging',
      description: 'Quiz on calculating LCM values'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  // Handle quiz answer selection
  const handleQuizAnswer = (answerId: string) => {
    handleInteractionComplete({
      interactionId: 'advanced-lcm-quiz',
      value: answerId,
      timestamp: Date.now(),
      conceptId: 'lcm-calculation-quiz',
      conceptName: 'LCM Calculation Quiz'
    });
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Advanced LCM Application */}
          <TrackedInteraction
            interaction={slideInteractions[0]}
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-100 dark:bg-blue-800/30 rounded-lg p-6 border border-blue-300 dark:border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Advanced LCM Application
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  When ratios are more complex, the LCM method becomes even more powerful. 
                  Let's see how it works with larger differences.
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Complex Example:</h3>
                  <div className="text-center text-xl mb-4">
                    <InlineMath math="I_2 + F_2 \rightarrow IF_7" />
                  </div>
                  
                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                    <p><strong>Challenge:</strong> Fluorine appears as:</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>Left side: 2 fluorines (in F₂)</li>
                      <li>Right side: 7 fluorines (in IF₇)</li>
                    </ul>
                    <p><strong>LCM needed:</strong> LCM of 2 and 7 = 14</p>
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Knowledge Check */}
          <div className="bg-blue-100 dark:bg-blue-800/30 rounded-lg p-6 border border-blue-300 dark:border-blue-600">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
              Quick Check
            </h3>
            <div className="space-y-3">
              <p className="text-lg text-gray-700 dark:text-gray-300">What is the LCM of 3 and 8?</p>
              <TrackedInteraction 
                interaction={slideInteractions[1]} 
                onInteractionComplete={handleInteractionComplete}
              >
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuizAnswer('24')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    24
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('11')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    11
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('12')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    12
                  </button>
                </div>
              </TrackedInteraction>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Solution Process */}
          <div className="bg-blue-200 dark:bg-blue-700/30 rounded-lg p-6 border border-blue-400 dark:border-blue-500">
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
              Solution Process
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Step 1: Find LCM</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Fluorine: 2 on left, 7 on right
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  LCM(2, 7) = 14
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Step 2: Calculate coefficients</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Left: Need 14 ÷ 2 = 7 molecules of F₂</li>
                  <li>Right: Need 14 ÷ 7 = 2 molecules of IF₇</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Final Solution:</h3>
                <div className="text-center text-lg">
                  <InlineMath math="I_2 + 7F_2 \rightarrow 2IF_7" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="advanced-lcm"
      slideTitle="Advanced LCM Application"
      moduleId="balancing-chemical-equations"
      submoduleId="advanced-balancing-techniques"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 