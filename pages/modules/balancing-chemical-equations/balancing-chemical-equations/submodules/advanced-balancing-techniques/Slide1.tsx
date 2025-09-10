import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import SlideComponentWrapper from '../../../../common-components/SlideComponentWrapper';
import { TrackedInteraction, Interaction, InteractionResponse } from '../../../../common-components/concept';


export default function LCMMethodSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'lcm-concept',
      conceptId: 'lcm-balancing-concept',
      conceptName: 'LCM Method for Balancing',
      type: 'learning',
      description: 'Understanding LCM in chemical balancing'
    },
    {
      id: 'lcm-quiz',
      conceptId: 'lcm-application-quiz',
      conceptName: 'LCM Method Application Quiz',
      type: 'judging',
      description: 'Quiz on when to use LCM method'
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
      interactionId: 'lcm-quiz',
      value: answerId,
      timestamp: Date.now(),
      conceptId: 'lcm-application-quiz',
      conceptName: 'LCM Method Application Quiz'
    });
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* When Elements Appear in Different Ratios */}
          <TrackedInteraction
            interaction={slideInteractions[0]}
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-100 dark:bg-blue-800/30 rounded-lg p-6 border border-blue-300 dark:border-blue-600">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                When Elements Appear in Different Ratios
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  Sometimes elements appear in different amounts on each side. The LCM method helps find the smallest common number both sides can use.
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Example Problem:</h3>
                  <div className="text-center text-xl mb-4">
                    <InlineMath math="Ga + CuBr_2 \rightarrow GaBr_3 + Cu" />
                  </div>
                  
                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                    <p><strong>Problem:</strong> Bromine appears as:</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>Left side: 2 bromines (in CuBr₂)</li>
                      <li>Right side: 3 bromines (in GaBr₃)</li>
                    </ul>
                    <p><strong>Solution:</strong> Find LCM of 2 and 3 = 6</p>
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
              <p className="text-lg text-gray-700 dark:text-gray-300">When should you use the LCM method for balancing chemical equations?</p>
              <TrackedInteraction 
                interaction={slideInteractions[1]} 
                onInteractionComplete={handleInteractionComplete}
              >
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuizAnswer('different_ratios')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    When elements appear in different ratios on each side
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('same_ratios')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    When elements appear in the same ratios on both sides
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('only_metals')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    Only when dealing with metal compounds
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
              LCM Solution Process
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Step 1: Identify the problem</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Bromine: 2 on left, 3 on right
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  LCM of 2 and 3 = 6
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Step 2: Get 6 bromines on both sides</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Left: 3CuBr₂ gives 3 × 2 = 6 bromines</li>
                  <li>Right: 2GaBr₃ gives 2 × 3 = 6 bromines</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Step 3: Balance other elements</h3>
                <div className="text-center text-lg">
                  <InlineMath math="2Ga + 3CuBr_2 \rightarrow 2GaBr_3 + 3Cu" />
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
      slideId="lcm-method"
      slideTitle="Using Least Common Multiples (LCM)"
      moduleId="balancing-chemical-equations"
      submoduleId="advanced-balancing-techniques"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 