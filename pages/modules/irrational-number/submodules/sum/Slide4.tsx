import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Data for the slide ---
const subtractionExamples = [
    {
        title: "Case 1: Rational Result (Cancellation)",
        explanation: "The identical irrational parts cancel each other out.",
        equation: "(5 + \\sqrt{2}) - (3 + \\sqrt{2}) = 2"
    },
    {
        title: "Case 2: Irrational Result (Like Terms)",
        explanation: "Since the irrational parts are 'like terms', they can be combined.",
        equation: "5\\sqrt{3} - 2\\sqrt{3} = 3\\sqrt{3}"
    },
    {
        title: "Case 3: Irrational Result (Unlike Terms)",
        explanation: "Different irrational numbers cannot be simplified further.",
        equation: "\\pi - \\sqrt{2}"
    }
];

// --- Main Slide Component ---
export default function IrrationalSubtractionExamplesSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();
    const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideInteractions: Interaction[] = [
        { id: 'irrational-subtraction-examples', conceptId: 'subtraction-of-irrationals', conceptName: 'Examples of Irrational Subtraction', type: 'learning', description: 'Exploring different examples of irrational subtraction.' },
    ];

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Examples of Irrational Subtraction</h2>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6"> 
    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">How to Get a RATIONAL Result</h3>
    <p className="text-slate-600 dark:text-slate-400">
        A rational result occurs when the irrational parts are identical and cancel each other out completely.
    </p>
    <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
        <p><strong>Example:</strong> <InlineMath math="(5 + \sqrt{2}) - (3 + \sqrt{2}) = 2" /></p>
    </div>
</div>

<div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">How to Get an IRRATIONAL Result</h3>
    <p className="text-slate-600 dark:text-slate-400">
        If the irrational parts don't cancel, the result remains irrational. This can happen with both "like terms" and "unlike terms."
    </p>
    <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center space-y-1">
        <p><strong>Like Terms:</strong> <InlineMath math="5\sqrt{3} - 2\sqrt{3} = 3\sqrt{3}" /></p>
        <p><strong>Unlike Terms:</strong> <InlineMath math="\pi - \sqrt{2}" /> (cannot be simplified)</p>
    </div>
</div>

        </div>
    );

     const RightInteractionPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Equation Explainer</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Click through to see different examples in action.</p>
            
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentExampleIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="font-semibold text-blue-600 dark:text-blue-400">{subtractionExamples[currentExampleIndex].title}</p>
                        <div className="text-3xl my-4"><BlockMath>{subtractionExamples[currentExampleIndex].equation}</BlockMath></div>
                        <p className="text-slate-600 dark:text-slate-400">{subtractionExamples[currentExampleIndex].explanation}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
                <button 
                    onClick={() => setCurrentExampleIndex(i => Math.max(0, i - 1))} 
                    disabled={currentExampleIndex === 0}
                    className="px-5 py-2 rounded-lg font-bold text-white bg-slate-500 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Example {currentExampleIndex + 1} of {subtractionExamples.length}
                </span>
                <button 
                    onClick={() => setCurrentExampleIndex(i => Math.min(subtractionExamples.length - 1, i + 1))} 
                    disabled={currentExampleIndex === subtractionExamples.length - 1}
                    className="px-5 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );

    const slideContent = (
        <div className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <LeftTheoryPanel />
                <RightInteractionPanel />
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="irrational-subtraction-examples"
            slideTitle="Examples of Irrational Subtraction"
            moduleId="irrational-numbers"
            submoduleId="irrational-sum" // Corresponds to the index.tsx file
            interactions={localInteractions}
        >
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}