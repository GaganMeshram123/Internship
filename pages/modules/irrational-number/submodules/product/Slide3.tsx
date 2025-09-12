import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function IrrationalOperationsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-operations-concept',
      conceptId: 'irrational-operations',
      conceptName: 'Operations with Irrational Numbers',
      type: 'learning',
      description: 'Understanding how the set of irrationals behaves under addition, subtraction, multiplication, and division'
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
                <span className="font-semibold text-blue-700 dark:text-blue-300">Operations with Irrational Numbers:</span> A set of numbers is considered "closed" under an operation if performing that operation on any two numbers from the set always results in a number that is also in the set.
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-3">Key Insights</div>
                <div className="space-y-3">
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    The set of **irrational numbers is NOT closed** under addition, subtraction, multiplication, or division.
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    This means that operating on two irrational numbers can produce a **rational** number.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Addition and Subtraction</div>
                <div className="space-y-2">
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    • **Rational Result:** <InlineMath math="\sqrt{2} + (-\sqrt{2}) = 0" /> (rational)
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    • **Rational Result:** <InlineMath math="(\pi + 1) - \pi = 1" /> (rational)
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    • **Irrational Result:** <InlineMath math="\sqrt{2} + \sqrt{3}" /> (irrational)
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Multiplication and Division</div>
                <div className="space-y-2">
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    • **Rational Result:** <InlineMath math="\sqrt{2} \times \sqrt{2} = 2" /> (rational)
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    • **Rational Result:** <InlineMath math="\sqrt{8} \div \sqrt{2} = \sqrt{4} = 2" /> (rational)
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    • **Irrational Result:** <InlineMath math="\sqrt{2} \times \sqrt{3} = \sqrt{6}" /> (irrational)
                  </div>
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Visual examples */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col space-y-4">
          <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Summary of Operations
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* Addition example */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">Addition</div>
              <InlineMath math="(\sqrt{2} + 1) + (-\sqrt{2}) = 1" />
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                (Irrational) + (Irrational) = **Rational**
              </div>
            </div>

            {/* Subtraction example */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">Subtraction</div>
              <InlineMath math="(\sqrt{5} + 2) - \sqrt{5} = 2" />
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                (Irrational) - (Irrational) = **Rational**
              </div>
            </div>

            {/* Multiplication example */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">Multiplication</div>
              <InlineMath math="\sqrt{3} \times \sqrt{12} = \sqrt{36} = 6" />
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                (Irrational) × (Irrational) = **Rational**
              </div>
            </div>

            {/* Division example */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">Division</div>
              <InlineMath math="\frac{\sqrt{18}}{\sqrt{2}} = \sqrt{9} = 3" />
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                (Irrational) ÷ (Irrational) = **Rational**
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="irrational-operations"
      slideTitle="Operations with Irrational Numbers"
      moduleId="irrational-numbers"
      submoduleId="irrational-operations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}