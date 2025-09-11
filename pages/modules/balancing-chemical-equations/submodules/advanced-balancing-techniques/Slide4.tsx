import React, { useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';

export default function PolyatomicIonsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'polyatomic-concept',
      conceptId: 'polyatomic-ion-method',
      conceptName: 'Polyatomic Ions as Units',
      type: 'learning',
      description: 'Understanding how to treat polyatomic ions as single units'
    },
    {
      id: 'polyatomic-quiz',
      conceptId: 'polyatomic-identification-quiz',
      conceptName: 'Polyatomic Ion Identification Quiz',
      type: 'judging',
      description: 'Quiz on identifying when to use polyatomic ion method'
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
      interactionId: 'polyatomic-quiz',
      value: answerId,
      timestamp: Date.now(),
      conceptId: 'polyatomic-identification-quiz',
      conceptName: 'Polyatomic Ion Identification Quiz'
    });
  };

  const slideContent = (
    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Polyatomic Ions as Units */}
          <TrackedInteraction
            interaction={slideInteractions[0]}
            onInteractionComplete={handleInteractionComplete}
          >
             <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
                Treating Ion Groups as Single Units
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  When polyatomic ions stay intact during reactions, treat them as single units 
                  instead of breaking them into individual atoms.
                </p>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Example Problem:</h3>
                  <div className="text-center text-xl mb-4">
                    <InlineMath math="Na_3PO_4 + MgCl_2 \rightarrow NaCl + Mg_3(PO_4)_2" />
                  </div>
                  
                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                    <p><strong>Key Insight:</strong> PO₄³⁻ ion stays together</p>
                    <ul className="list-disc list-inside pl-4">
                      <li>Left: 1 PO₄ unit (in Na₃PO₄)</li>
                      <li>Right: 2 PO₄ units (in Mg₃(PO₄)₂)</li>
                    </ul>
                    <p><strong>Strategy:</strong> Balance PO₄ as a unit, not P and O separately</p>
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
              <p className="text-lg text-gray-700 dark:text-gray-300">Which of these is a polyatomic ion that commonly stays intact during reactions?</p>
              <TrackedInteraction 
                interaction={slideInteractions[1]} 
                onInteractionComplete={handleInteractionComplete}
              >
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuizAnswer('so4')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    SO₄²⁻ (sulfate)
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('h2o')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    H₂O (water)
                  </button>
                  <button
                    onClick={() => handleQuizAnswer('nacl')}
                    className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 text-lg"
                  >
                    NaCl (sodium chloride)
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
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Step 1: Balance PO₄ units</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Need 2 PO₄ on left to match right:</p>
                <div className="text-center text-lg mb-2">
                  <InlineMath math="2Na_3PO_4 + MgCl_2 \rightarrow NaCl + Mg_3(PO_4)_2" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Step 2: Balance other elements</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">Now balance Na, Mg, and Cl:</p>
                <div className="text-center text-lg">
                  <InlineMath math="2Na_3PO_4 + 3MgCl_2 \rightarrow 6NaCl + Mg_3(PO_4)_2" />
                </div>
              </div>

              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 border border-blue-300 dark:border-blue-600">
                <p className="text-center font-semibold text-blue-700 dark:text-blue-300">
                  Final balanced equation!
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
      slideId="polyatomic-ions"
      slideTitle="Polyatomic Ions as Units"
      moduleId="balancing-chemical-equations"
      submoduleId="advanced-balancing-techniques"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
} 