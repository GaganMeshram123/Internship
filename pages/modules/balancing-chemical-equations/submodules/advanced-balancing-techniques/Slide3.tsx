import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';

export default function FractionalCoefficientsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'fractional-concept',
      conceptId: 'fractional-balancing-method',
      conceptName: 'Fractional Coefficients Strategy',
      type: 'learning',
      description: 'Understanding how fractional coefficients can simplify balancing'
    },
    {
      id: 'fractional-quiz',
      conceptId: 'fractional-strategy-quiz',
      conceptName: 'Fractional Coefficients Quiz',
      type: 'judging',
      description: 'Quiz on fractional coefficients strategy'
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
      interactionId: 'fractional-quiz',
      value: answerId,
      timestamp: Date.now(),
      conceptId: 'fractional-strategy-quiz',
      conceptName: 'Fractional Coefficients Quiz'
    });
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Fractional Coefficients Strategy */}
          <TrackedInteraction
            interaction={slideInteractions[0]}
            onInteractionComplete={handleInteractionComplete}
          >
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                When Fractions Are Useful Temporarily
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  Sometimes it's easier to balance with fractions first, then eliminate them at the end. 
                  This approach can simplify complex equations.
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Example Problem:</h3>
                  <div className="text-center text-xl mb-4">
                    <InlineMath math="SO_2 + O_2 \rightarrow SO_3" />
                  </div>
                  
                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                    <p><strong>Challenge:</strong> Oxygen appears in multiple places</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>Left: SO₂ has 2 O, O₂ has 2 O</li>
                      <li>Right: SO₃ has 3 O</li>
                    </ul>
                    <p><strong>Strategy:</strong> Use fractions temporarily</p>
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Knowledge Check */}
           <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
              Quick Check
            </h3>
            <div className="space-y-3">
              <p className="text-lg text-gray-700 dark:text-gray-300">What should you do after balancing an equation using fractional coefficients?</p>
              <TrackedInteraction 
                interaction={slideInteractions[1]} 
                onInteractionComplete={handleInteractionComplete}
              >
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuizAnswer('multiply_eliminate')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    Multiply all coefficients to eliminate fractions
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('keep_fractions')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    Keep the fractions in the final answer
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('convert_decimals')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    Convert fractions to decimal numbers
                  </button>
                </div>
              </TrackedInteraction>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Solution Process */}
           <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
              Step-by-Step Solution
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Step 1: Balance with fractions</h3>
                <div className="text-center text-lg mb-2">
                  <InlineMath math="SO_2 + \frac{1}{2}O_2 \rightarrow SO_3" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Now oxygen is balanced: 2 + 1 = 3 on both sides
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Step 2: Eliminate fractions</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Multiply everything by 2:</p>
                <div className="text-center text-lg">
                  <InlineMath math="2SO_2 + O_2 \rightarrow 2SO_3" />
                </div>
              </div>

              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 border border-blue-300 dark:border-blue-600">
                <p className="text-center font-semibold text-blue-700 dark:text-blue-300">
                  Final balanced equation with whole numbers!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="fractional-coefficients"
      slideTitle="Fractional Coefficients Strategy"
      moduleId="balancing-chemical-equations"
      submoduleId="advanced-balancing-techniques"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 