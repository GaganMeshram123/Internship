import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function IrrationalProductSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-product-concept',
      conceptId: 'irrational-product',
      conceptName: 'Product of Irrational Numbers',
      type: 'learning',
      description: 'Understanding that the product of two irrational numbers can be rational or irrational'
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
                <span className="font-semibold text-blue-700 dark:text-blue-300">Multiplication of Irrational Numbers:</span> A common question is whether multiplying two irrational numbers always results in another irrational number. The answer is **no**.
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">The Rule</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  The product of two irrational numbers can be either **rational** or **irrational**.
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Example 1: Product is **Rational**</li>
                  <li>Example 2: Product is **Irrational**</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800">
                <div className="text-blue-700 dark:text-blue-300 font-medium">Example 1: A Rational Product</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  Consider two irrational numbers: <InlineMath math="\sqrt{2}" /> and <InlineMath math="\sqrt{8}" />.
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                  When we multiply them, we get:
                </div>
                <div className="text-center mb-3">
                  <BlockMath math="\sqrt{2} \times \sqrt{8} = \sqrt{2 \times 8} = \sqrt{16} = 4" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The result, `4`, is a **rational number** since it can be written as `4/1`.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="text-slate-700 dark:text-slate-300 font-medium mb-2">Example 2: An Irrational Product</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  Consider two other irrational numbers: <InlineMath math="\sqrt{2}" /> and <InlineMath math="\sqrt{3}" />.
                </div>
                <div className="text-center mb-3">
                  <BlockMath math="\sqrt{2} \times \sqrt{3} = \sqrt{2 \times 3} = \sqrt{6}" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The result, <InlineMath math="\sqrt{6}" />, is an **irrational number**.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="text-green-700 dark:text-green-300 font-medium mb-2">Key Takeaway</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The set of irrational numbers is not "closed" under multiplication. You can't assume the product will have the same properties as the factors.
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Visual representation */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg">
          <h3 className="text-gray-900 dark:text-white font-medium mb-4">Visualizing the Product</h3>
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-8">
            {/* Case 1: Rational Product */}
            <div className="flex flex-col items-center">
              <div className="text-xl text-center font-semibold text-blue-600 dark:text-blue-400 mb-2">
                Product is Rational: <InlineMath math="\sqrt{2} \times \sqrt{8} = 4" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                ($1.414... \times 2.828...$)
              </div>
              <div className="w-full flex justify-center items-center h-24">
                <InlineMath math="\sqrt{2}" />
                <span className="text-3xl mx-4">×</span>
                <InlineMath math="\sqrt{8}" />
                <span className="text-3xl mx-4">=</span>
                <span className="text-3xl text-green-600 font-bold">4</span>
              </div>
            </div>

            {/* Case 2: Irrational Product */}
            <div className="flex flex-col items-center">
              <div className="text-xl text-center font-semibold text-blue-600 dark:text-blue-400 mb-2">
                Product is Irrational: <InlineMath math="\sqrt{2} \times \sqrt{3} = \sqrt{6}" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                ($1.414... \times 1.732... = 2.449...$)
              </div>
              <div className="w-full flex justify-center items-center h-24">
                <InlineMath math="\sqrt{2}" />
                <span className="text-3xl mx-4">×</span>
                <InlineMath math="\sqrt{3}" />
                <span className="text-3xl mx-4">=</span>
                <InlineMath math="\sqrt{6}" />
              </div>
            </div>
            
            <div className="mt-6 text-center text-lg text-gray-700 dark:text-gray-300">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="irrational-product"
      slideTitle="Product of Irrational Numbers"
      moduleId="irrational-numbers"
      submoduleId="product"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}