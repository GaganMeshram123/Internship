import { useEffect, useRef, useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function IrrationalSumsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-sums-concept',
      conceptId: 'irrational-sums',
      conceptName: 'Sums of Irrational Numbers',
      type: 'learning',
      description: 'Understanding that the sum of two irrational numbers can be rational or irrational'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  return (
    <SlideComponentWrapper
      slideId="irrational-sums-intro"
      slideTitle="Sums of Irrational Numbers"
      moduleId="irrational-numbers"
      submoduleId="sum"
      interactions={localInteractions}
    >
      <div className="w-full h-full bg-slate-50 dark:bg-slate-900/20 rounded-xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Explanation */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="space-y-6">
                {/* Main concept */}
                <div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    When you add or subtract two irrational numbers, the result is not always irrational. This is a fundamental property that distinguishes irrational numbers from other sets, such as integers or rational numbers, which are "closed" under these operations.
                  </p>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    The key principle is that the "infinite, non-repeating" parts of the irrational numbers might cancel each other out.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg mb-4">
                    <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                      <span className="font-semibold">Example:</span> "What is the sum of $\pi$ and $4-\pi$?"
                    </p>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Let's explore some scenarios!</span>
                  </p>
                </div>

                {/* Scenarios and examples */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h2 className="text-blue-600 dark:text-blue-400 text-xl font-medium mb-3">
                    Irrational + Irrational = Rational
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    This happens when the decimal parts cancel out.
                  </p>
                  <div className="space-y-3 justify-center items-center">
                    <div className="flex items-center justify-center">
                      <span className="text-slate-700 dark:text-slate-300 text-center items-center">
                        <BlockMath math="\sqrt{2} + (-\sqrt{2}) = 0" />
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-slate-700 dark:text-slate-300 text-center items-center">
                        <BlockMath math="(3 + \sqrt{5}) + (2 - \sqrt{5}) = 5" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h2 className="text-blue-600 dark:text-blue-400 text-xl font-medium mb-3">
                    Irrational + Irrational = Irrational
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    This is the more common result when the decimal parts do not cancel.
                  </p>
                  <div className="space-y-3 justify-center items-center">
                    <div className="flex items-center justify-center">
                      <span className="text-slate-700 dark:text-slate-300 text-center items-center">
                        <BlockMath math="\sqrt{2} + \sqrt{3} \approx 3.146" />
                      </span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-slate-700 dark:text-slate-300 text-center items-center">
                        <BlockMath math="\pi + \pi = 2\pi" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Visual summary */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Visualizing Sums
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                The visual summary below shows how the nature of the result depends entirely on the numbers being added or subtracted.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visual for Rational Result */}
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-center">
                  <div className="font-semibold text-lg text-green-700 dark:text-green-300 mb-2">
                    Result: Rational
                  </div>
                  <BlockMath math="\sqrt{7} - \sqrt{7} = 0" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <InlineMath math="\approx 2.6457..." />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <InlineMath math="\approx 2.6457..." />
                  </div>
                </div>

                {/* Visual for Irrational Result */}
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-center">
                  <div className="font-semibold text-lg text-red-700 dark:text-red-300 mb-2">
                    Result: Irrational
                  </div>
                  <BlockMath math="\sqrt{2} + 5 = 5 + \sqrt{2}" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <InlineMath math="\approx 1.414..." />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <InlineMath math="5" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-slate-700 dark:text-slate-300 mb-2">
                  <span className="font-semibold">Important Rule:</span>
                </p>
                <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg">
                  <p className="text-lg text-purple-700 dark:text-purple-300">
                    The sum of a **rational** number and an **irrational** number is **always irrational**.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
}