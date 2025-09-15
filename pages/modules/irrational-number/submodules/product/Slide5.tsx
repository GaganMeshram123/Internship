import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- Data for the slide ---
const divisionExamples = [
    {
        title: "Irrational / Irrational (Rational Result)",
        expression: "\\frac{\\sqrt{18}}{\\sqrt{2}}",
        steps: ["\\sqrt{\\frac{18}{2}}", "\\sqrt{9}", "3"],
        resultType: "Rational"
    },
    {
        title: "Irrational / Irrational (Irrational Result)",
        expression: "\\frac{\\sqrt{10}}{\\sqrt{2}}",
        steps: ["\\sqrt{\\frac{10}{2}}", "\\sqrt{5}"],
        resultType: "Irrational"
    },
    {
        title: "Rational / Irrational",
        expression: "\\frac{6}{\\sqrt{3}}",
        steps: ["\\frac{6}{\\sqrt{3}} \\times \\frac{\\sqrt{3}}{\\sqrt{3}}", "\\frac{6\\sqrt{3}}{3}", "2\\sqrt{3}"],
        resultType: "Irrational"
    },
];

// --- Main Slide Component ---
export default function IrrationalDivisionSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const handleNext = () => {
    setCurrentExampleIndex(prev => (prev + 1) % divisionExamples.length);
    setShowResult(false);
  };

  const slideInteractions: Interaction[] = [
    { id: 'irrational-division-concept', conceptId: 'irrational-division', conceptName: 'Division of Irrationals', type: 'learning', description: 'Understanding the outcomes of dividing irrational numbers.' },
    { id: 'irrational-division-animation', conceptId: 'irrational-division-explorer', conceptName: 'Division Machine Explorer', type: 'learning', description: 'Interactive animation of irrational division.' }
  ];

  const LeftTheoryPanel = () => (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Division of Irrational Numbers</h2>
      
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Scenario 1: Irrational ÷ Irrational</h3>
        <p className="text-slate-600 dark:text-slate-400">
          This is a "wild card" case. The result can be rational if the numbers simplify perfectly, but it is usually irrational.
        </p>
        <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
            <strong>Example:</strong> <InlineMath>{'\\frac{\\sqrt{18}}{\\sqrt{2}} = 3'}</InlineMath>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Scenario 2: Rational ÷ Irrational</h3>
        <p className="text-slate-600 dark:text-slate-400">
          The result is <strong>always irrational</strong> (unless the rational number is 0). You often need to "rationalize the denominator" to simplify.
        </p>
        <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
            <strong>Example:</strong> <InlineMath>{'\\frac{6}{\\sqrt{3}} = 2\\sqrt{3}'}</InlineMath>
        </div>
      </div>
    </div>
  );

  const RightInteractionPanel = () => {
    const example = divisionExamples[currentExampleIndex];
    
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Division Machine</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">See how different division problems get sorted.</p>
        
        <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between text-center">
            <div>
                <p className="text-sm text-slate-500">INPUT</p>
                <div className="text-4xl my-2"><BlockMath>{example.expression}</BlockMath></div>
            </div>

            <div className="relative h-24">
                <AnimatePresence>
                {showResult && (
                    <motion.div
                        className="absolute left-1/2 -translate-x-1/2"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 50, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 12, duration: 1 } }}
                    >
                         {/* FIX: Result block color is now always blue */}
                         <div className="p-4 rounded-lg shadow-lg text-2xl font-bold bg-blue-600 text-white">
                            <BlockMath>{example.steps[example.steps.length - 1]}</BlockMath>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 text-4xl">↓</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 {/* FIX: Bin colors are now a consistent blue when active */}
                <div className={`p-3 rounded-lg border-2 transition-colors ${showResult && example.resultType === 'Rational' ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30' : 'border-slate-300 dark:border-slate-700'}`}>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">Rational Bin</h4>
                </div>
                <div className={`p-3 rounded-lg border-2 transition-colors ${showResult && example.resultType === 'Irrational' ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30' : 'border-slate-300 dark:border-slate-700'}`}>
                    <h4 className="font-semibold text-blue-600 dark:text-blue-400">Irrational Bin</h4>
                </div>
            </div>
        </div>
        
        <div className="mt-4 flex justify-center gap-4">
            <button onClick={() => setShowResult(true)} disabled={showResult} className="w-1/2 px-5 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors">Process</button>
            <button onClick={handleNext} className="w-1/2 px-5 py-3 rounded-lg font-bold text-white bg-slate-500 hover:bg-slate-600">Next Example</button>
        </div>
      </div>
    );
  };

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
          <LeftTheoryPanel />
        </TrackedInteraction>
        <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
          <RightInteractionPanel />
        </TrackedInteraction>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="irrational-division"
      slideTitle="Division of Irrational Numbers"
      moduleId="irrational-numbers"
      submoduleId="operations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}