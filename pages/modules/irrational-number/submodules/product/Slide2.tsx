import React, { useState } from 'react'; // FIX: Correctly imported useState
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Data for the new interactive explorer
const subtractionExamples = [
  {
    title: "Case 1: Irrationals Cancel",
    expression: "(5 + \\sqrt{2}) - (3 + \\sqrt{2})",
    op1: { rational: 5, irrational: "\\sqrt{2}" },
    op2: { rational: 3, irrational: "\\sqrt{2}" },
    result: { rational: 2, irrational: null },
    resultType: "Rational",
    explanation: "The irrational parts (√2) are identical and cancel each other out, leaving a purely rational result."
  },
  {
    title: "Case 2: Irrationals Combine",
    expression: "5\\sqrt{3} - 2\\sqrt{3}",
    op1: { rational: null, irrational: "5\\sqrt{3}" },
    op2: { rational: null, irrational: "2\\sqrt{3}" },
    result: { rational: null, irrational: "3\\sqrt{3}" },
    resultType: "Irrational",
    explanation: "Since the irrational terms are 'like terms', they can be combined. The result is still irrational."
  },
  {
    title: "Case 3: No Cancellation",
    expression: "(4 + \\sqrt{3}) - 2",
    op1: { rational: 4, irrational: "\\sqrt{3}" },
    op2: { rational: 2, irrational: null },
    result: { rational: 2, irrational: "\\sqrt{3}" },
    resultType: "Irrational",
    explanation: "The rational parts combine, but the irrational part is unaffected, so the result remains irrational."
  },
   {
    title: "Case 4: Simple Cancellation",
    expression: "\\pi - \\pi",
    op1: { rational: null, irrational: "\\pi" },
    op2: { rational: null, irrational: "\\pi" },
    result: { rational: 0, irrational: null },
    resultType: "Rational",
    explanation: "When an irrational number is subtracted from itself, the result is 0, which is a rational number."
  }
];

export default function IrrationalSubtractionSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentExample = subtractionExamples[currentExampleIndex];

  const handleAnimate = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000); // Reset after animation
  };

  const handleNext = () => {
    // FIX: Added type 'number' to the 'prev' parameter
    setCurrentExampleIndex((prev: number) => (prev + 1) % subtractionExamples.length);
    setIsAnimating(false);
  };

  const handlePrev = () => {
    // FIX: Added type 'number' to the 'prev' parameter
    setCurrentExampleIndex((prev: number) => (prev - 1 + subtractionExamples.length) % subtractionExamples.length);
    setIsAnimating(false);
  };
  
  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-subtraction-concept',
      conceptId: 'irrational-subtraction',
      conceptName: 'Irrational Subtraction Understanding',
      type: 'learning',
      description: 'Understanding that subtracting two irrationals can result in a rational or an irrational number'
    },
    {
        id: 'irrational-subtraction-explorer',
        conceptId: 'irrational-subtraction-explorer',
        conceptName: 'Irrational Subtraction Explorer',
        type: 'learning',
        description: 'Interactive explorer for irrational subtraction'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    // FIX: Added explicit type for the 'prev' parameter
    setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
  };

  // A small component for the colored blocks to keep the code clean
  const NumberBlock = ({ value, type, isVisible = true }: { value: string | number, type: 'rational' | 'irrational', isVisible?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`px-4 py-2 rounded-lg font-bold text-xl shadow-md
        ${type === 'rational' ? 'bg-blue-200 text-blue-800' : 'bg-teal-200 text-teal-800'}
      `}
    >
      {typeof value === 'string' ? <InlineMath math={value} /> : value}
    </motion.div>
  );

  const slideContent = (
    <div className="relative w-full h-auto bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 rounded-xl p-4">
      <div className="grid grid-cols-2 gap-8 h-full">
        {/* Left column - Explanation */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col justify-start space-y-5">
          <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <div className="space-y-4">
              <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-semibold text-blue-700 dark:text-blue-300">Subtraction of Irrational Numbers:</span> A key question in number theory is what kind of number results from subtracting two irrational numbers. The answer might surprise you!
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">The Rule</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The difference between two irrational numbers can be either **rational** or **irrational**.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-blue-700 dark:text-blue-300 font-medium">Example 1: A Rational Result</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 my-3">
                  Consider the expression <InlineMath math="\sqrt{2} - \sqrt{2}" />. When an irrational number is subtracted from itself, the irrational parts cancel out.
                </div>
                <div className="text-center mb-3">
                  <BlockMath math="\sqrt{2} - \sqrt{2} = 0" />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The result, `0`, is a **rational number**.
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-blue-700 dark:text-blue-300 font-medium">Example 2: An Irrational Result</div>
                <div className="text-lg text-gray-700 dark:text-gray-300 my-3">
                  Consider the expression <InlineMath math="\pi - 3" />. Subtracting a rational number from an irrational number does not resolve the infinite, non-repeating decimal.
                </div>
                <div className="text-center mb-3">
                  <BlockMath math="\pi - 3 \approx 3.14159... - 3 = 0.14159..." />
                </div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The result is still an **irrational number**.
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <div className="text-blue-700 dark:text-blue-300 font-medium mb-2">Key Takeaway</div>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  The set of irrational numbers is not "closed" under subtraction. This means subtracting two irrationals does not guarantee an irrational result.
                </div>
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right column - Interactive Subtraction Explorer */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg flex flex-col space-y-4">
            <h3 className="text-gray-900 dark:text-white font-medium mb-2">Interactive Subtraction Explorer</h3>
            <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-4 space-y-4">
                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                        <button onClick={handlePrev} className="px-3 py-1 rounded-md bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 transition-colors">← Prev</button>
                        <div className="font-bold text-center text-blue-600 dark:text-blue-400">{currentExample.title}</div>
                        <button onClick={handleNext} className="px-3 py-1 rounded-md bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 transition-colors">Next →</button>
                    </div>

                    {/* Expression Display */}
                    <div className="text-center text-2xl font-semibold py-4 bg-white dark:bg-slate-800 rounded-md">
                        <BlockMath math={currentExample.expression} />
                    </div>

                    {/* Visualization Area */}
                    <div className="relative h-48 flex flex-col justify-around items-center bg-white dark:bg-slate-800 p-4 rounded-lg">
                        <AnimatePresence>
                        {!isAnimating && (
                            <div className="flex items-center space-x-2">
                                {/* Operand 1 */}
                                {currentExample.op1.rational !== null && <NumberBlock value={currentExample.op1.rational} type="rational" />}
                                {currentExample.op1.irrational && <NumberBlock value={currentExample.op1.irrational} type="irrational" />}
                                <span className="text-3xl font-bold mx-2">−</span>
                                {/* Operand 2 */}
                                {currentExample.op2.rational !== null && <NumberBlock value={currentExample.op2.rational} type="rational" />}
                                {currentExample.op2.irrational && <NumberBlock value={currentExample.op2.irrational} type="irrational" />}
                            </div>
                        )}
                        </AnimatePresence>

                        <AnimatePresence>
                        {isAnimating && (
                            <motion.div 
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                {/* Result */}
                                {currentExample.result.rational !== null && <NumberBlock value={currentExample.result.rational} type="rational" />}
                                {currentExample.result.irrational && <NumberBlock value={currentExample.result.irrational} type="irrational" />}
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>

                    {/* Action Button & Explanation */}
                    <div className="text-center">
                        {!isAnimating && (
                             <button onClick={handleAnimate} className="w-full px-4 py-2 rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                                Subtract
                            </button>
                        )}
                         {isAnimating && (
                             <div className="p-3 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                                <p className="font-semibold">Result: {currentExample.resultType}</p>
                                <p className="text-sm">{currentExample.explanation}</p>
                            </div>
                        )}
                    </div>
                </div>
            </TrackedInteraction>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="irrational-subtraction"
      slideTitle="Subtraction of Irrational Numbers"
      moduleId="irrational-numbers"
      submoduleId="product" // Note: you might want to change this submoduleId to "subtraction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}