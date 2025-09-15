import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Helper component to safely render text with markdown and LaTeX
const RenderContent: React.FC<{ text: string }> = ({ text }) => {
    const segments = text.split(/(\*\*.*?\*\*|\$.*?\$)/g).filter(Boolean);
    return (
        <>
            {segments.map((segment, index) => {
                if (segment.startsWith('**') && segment.endsWith('**')) {
                    return <strong key={index}>{segment.slice(2, -2)}</strong>;
                }
                if (segment.startsWith('$') && segment.endsWith('$')) {
                    return <InlineMath key={index}>{segment.slice(1, -1)}</InlineMath>;
                }
                return segment;
            })}
        </>
    );
};

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
                <span className="font-semibold text-blue-700 dark:text-blue-300">Multiplication of Irrational Numbers:</span> A common question is whether multiplying two irrational numbers always results in another irrational number. The answer is <strong>no</strong>.
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">The Rule</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The product of two irrational numbers can be either <strong>rational</strong> or <strong>irrational</strong>.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-blue-700 dark:text-blue-300 font-medium">Example 1: A Rational Product</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 my-3">
                  Consider two irrational numbers: <InlineMath math="\sqrt{2}" /> and <InlineMath math="\sqrt{8}" />.
                </div>
                <div className="text-center mb-3">
                  <BlockMath math="\sqrt{2} \times \sqrt{8} = \sqrt{2 \times 8} = \sqrt{16} = 4" />
                </div>
                <div className="text-base text-gray-600 dark:text-gray-400 mt-2 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                  <strong>Why it works:</strong> The product becomes rational because multiplying the numbers inside the square roots (2 × 8) results in a <strong>perfect square</strong> (16).
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-blue-700 dark:text-blue-300 font-medium">Example 2: An Irrational Product</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 my-3">
                  Consider two other irrational numbers: <InlineMath math="\sqrt{2}" /> and <InlineMath math="\sqrt{3}" />.
                </div>
                <div className="text-center mb-3">
                  <BlockMath math="\sqrt{2} \times \sqrt{3} = \sqrt{2 \times 3} = \sqrt{6}" />
                </div>
                <div className="text-base text-gray-600 dark:text-gray-400 mt-2">
                  The result, <InlineMath math="\sqrt{6}" />, is an <strong>irrational number</strong> because 6 is not a perfect square.
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">
                  <RenderContent text="Beyond Square Roots: The Case of $\pi$" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  <RenderContent text="This principle isn't limited to square roots. When you multiply $\pi$ by itself, the result is $\pi^2$. While we can approximate it ($3.14... \times 3.14... \approx 9.86...$), $\pi^2$ is also a proven **irrational number**." />
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Key Takeaway</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The set of irrational numbers is not <strong>"closed"</strong> under multiplication. This surprising property distinguishes them from integers or rational numbers.
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Visual representation */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col space-y-6">
          <h3 className="text-gray-900 dark:text-white font-medium">Visualizing the Product</h3>
          <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-lg space-y-8">
            {/* Case 1: Rational Product */}
            <div className="flex flex-col items-center">
              <div className="text-xl text-center font-semibold text-blue-600 dark:text-blue-400 mb-2">
                Product is Rational: <InlineMath math="\sqrt{2} \times \sqrt{8} = 4" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                (1.414... × 2.828...)
              </div>
              <div className="w-full flex justify-center items-center h-24 text-2xl">
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
                (1.414... × 1.732... = 2.449...)
              </div>
              <div className="w-full flex justify-center items-center h-24 text-2xl">
                <InlineMath math="\sqrt{2}" />
                <span className="text-3xl mx-4">×</span>
                <InlineMath math="\sqrt{3}" />
                <span className="text-3xl mx-4">=</span>
                <InlineMath math="\sqrt{6}" />
              </div>
            </div>
          </div>
            
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
            <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Deeper Dive: Transcendental Numbers</div>
            <div className="text-base text-gray-700 dark:text-gray-300">
                <RenderContent text="Numbers like $\sqrt{2}$ are **algebraic** because they can be solutions to polynomial equations (e.g., $x^2 - 2 = 0$). Numbers like $\pi$ are **transcendental**—they are not solutions to any such equation. Understanding these properties is crucial in advanced physics and engineering." />
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
            <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Important Points</div>
            <ul className="list-disc pl-5 space-y-2 text-base text-gray-700 dark:text-gray-300">
                <li>
                    A <strong>non-zero rational</strong> number multiplied by an <strong>irrational</strong> number is always <strong>irrational</strong>. (e.g., <InlineMath math="2 \times \pi = 2\pi" />)
                </li>
                <li>
                    Any irrational number multiplied by <strong>zero</strong> results in <strong>zero</strong>, which is a rational number. (e.g., <InlineMath math="\sqrt{3} \times 0 = 0" />)
                </li>
                <li>
                    <strong>Division</strong> of two irrational numbers behaves just like multiplication—the result can be either rational or irrational.
                </li>
            </ul>
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