import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Data for the new interactive area model
const productExamples = {
  rational: {
    case: 'Case 1: Rational Product',
    num1: '\\sqrt{2}',
    num2: '\\sqrt{8}',
    product: '4',
    area: 4,
    explanation: 'When the irrational sides √2 and √8 are multiplied, the area is √16, which simplifies to a perfect rational square of 4.'
  },
  irrational: {
    case: 'Case 2: Irrational Product',
    num1: '\\sqrt{2}',
    num2: '\\sqrt{3}',
    product: '\\sqrt{6}',
    area: Math.sqrt(6),
    explanation: 'The product of √2 and √3 is √6. Since 6 is not a perfect square, the resulting area is irrational.'
  }
};

export default function IrrationalProductSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [decimalPrecision, setDecimalPrecision] = useState(2);
  const [activeExampleKey, setActiveExampleKey] = useState<'rational' | 'irrational'>('rational');

  const activeExample = productExamples[activeExampleKey];

  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-product-concept',
      conceptId: 'irrational-product',
      conceptName: 'Understanding Irrational Products',
      type: 'learning',
      description: 'Learning how the product of two irrational numbers can be rational or irrational'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
  };

  // Area Model Component
  const AreaModelVisualization = () => (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeExampleKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="mb-2 text-center">
            <div className="font-bold text-blue-600 dark:text-blue-400">{activeExample.case}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{activeExample.explanation}</div>
          </div>
          <div className="flex items-center justify-center my-4">
            <div className="text-xl -rotate-90 -translate-x-8">
              <InlineMath math={activeExample.num1} />
            </div>
            <div className="w-40 h-24 bg-teal-200 dark:bg-teal-800/50 border-2 border-teal-500 dark:border-teal-400 flex items-center justify-center">
              <span className="text-2xl font-bold text-teal-800 dark:text-teal-100">
                Area = <InlineMath math={activeExample.product} />
              </span>
            </div>
          </div>
          <div className="text-xl">
            <InlineMath math={activeExample.num2} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  const slideContent = (
    <div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
      <div className="grid grid-cols-2 gap-8 h-full">
        {/* Left Column */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-5">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="space-y-4">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-semibold text-blue-700 dark:text-blue-300">The Product of Irrationals:</span> When you multiply two irrational numbers, the result is not always irrational. This can be a surprising property!
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-3">Key Scenarios</div>
                <div className="space-y-3">
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Case 1: Product is Rational</span>
                    <br /> Example: <InlineMath math="\sqrt{2} \times \sqrt{8} = \sqrt{16} = 4" />
                  </div>
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">Case 2: Product is Irrational</span>
                    <br /> Example: <InlineMath math="\sqrt{2} \times \sqrt{3} = \sqrt{6}" />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Key Insight</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The decimal parts of irrational numbers can sometimes combine perfectly to form a simple, non-infinite number. The **Area Model** on the right helps visualize this.
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                 <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Interactive Example</div>
                 <div className="text-lg text-gray-700 dark:text-gray-300">
                   Use the buttons on the right to switch between examples. If the product is irrational, use the slider to explore its decimal expansion.
                 </div>
               </div>

            </div>
          </TrackedInteraction>
        </div>

        {/* Right Column */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col space-y-6">
            {/* Toggle Buttons */}
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setActiveExampleKey('rational')} className={`p-3 rounded-lg font-semibold transition-colors ${activeExampleKey === 'rational' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Rational Product</button>
                <button onClick={() => setActiveExampleKey('irrational')} className={`p-3 rounded-lg font-semibold transition-colors ${activeExampleKey === 'irrational' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Irrational Product</button>
            </div>

            {/* Area Model Visualization */}
            <AreaModelVisualization />

            {/* Decimal Explorer (Conditional) */}
            <AnimatePresence>
                {activeExampleKey === 'irrational' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Decimal Explorer</div>
                        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                            <div className="text-blue-700 dark:text-blue-300 font-medium mb-3">Decimal Precision: {decimalPrecision} digits</div>
                            <input
                                type="range" min="0" max="15" value={decimalPrecision}
                                onChange={(e) => setDecimalPrecision(Number(e.target.value))}
                                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
                            />
                        </div>
                        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center mt-4">
                            <BlockMath math={`\\sqrt{6} \\approx ${productExamples.irrational.area.toFixed(decimalPrecision)}...`} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Common Misconceptions */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Common Misconceptions</div>
              <ul className="list-disc pl-5 space-y-2 text-base text-gray-700 dark:text-gray-300">
                <li><strong>Myth:</strong> Irrational × Irrational = Always Irrational.</li>
                <li><strong>Fact:</strong> The product can be rational if the irrational parts cancel or combine to a perfect square (e.g., <InlineMath math="\sqrt{2} \times \sqrt{8} = 4" />).</li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="irrational-product-visual"
      slideTitle="When Irrationals Multiply: Rational or Irrational?"
      moduleId="irrational-numbers"
      submoduleId="product"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}