import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
// FIX: Corrected the import path for your theme context.
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function AddSubtractDecimalsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const [problem, setProblem] = useState({ a: 1.25, b: 3.4 });
    const [isSolved, setIsSolved] = useState(false);

    const generateNewProblem = () => {
        setIsSolved(false);
        const a = parseFloat((Math.random() * 20 + 1).toFixed(2)); // e.g., 12.34
        const b = parseFloat((Math.random() * 10 + 1).toFixed(1)); // e.g., 5.6
        setProblem({ a, b });
    };

    useEffect(() => { generateNewProblem() }, []);

    const slideInteractions: Interaction[] = [
        { id: 'add-decimals-concept', conceptId: 'add-decimals', conceptName: 'Adding and Subtracting Decimals', type: 'learning', description: 'Learning the rule of lining up decimal points.' },
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Add and Subtract Decimals</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Golden Rule</h3>
                    <p className="text-slate-600 dark:text-slate-400">When adding or subtracting decimals, you must <strong>line up the decimal points!</strong></p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Money Connection 💰</h3>
                    <p className="text-slate-600 dark:text-slate-400">Lining up the points is like making sure you add dollars to dollars, and cents to cents. You wouldn't want to accidentally add a penny to a dollar!</p>
                </div>
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">How to Solve</h3>
                     <ol className="list-decimal pl-5 text-slate-600 dark:text-slate-400">
                        <li>Line up the decimal points.</li>
                        <li>Fill in any empty spots with zeros.</li>
                        <li>Add or subtract normally, and bring the decimal point straight down in your answer.</li>
                    </ol>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const result = problem.a + problem.b;
        const [aStr, bStr] = [problem.a.toFixed(2), problem.b.toFixed(2)];

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Decimal Calculator</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Watch how the numbers line up!</p>
    
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 font-mono text-4xl flex-grow flex flex-col justify-center items-end min-h-[250px]">
                    <AnimatePresence>
                    {!isSolved ? (
                        <motion.div key="problem" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="self-center">
                            {problem.a} + {problem.b} = ?
                        </motion.div>
                    ) : (
                        <motion.div key="solution" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="w-40">
                           <p className="text-right">{aStr}</p>
                           <p className="text-right">+ {bStr}</p>
                           <hr className="border-black dark:border-white my-2"/>
                           <p className="text-right text-blue-600 dark:text-blue-400 font-bold">{result.toFixed(2)}</p>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>

                <div className="mt-4 flex justify-center">
                    {!isSolved ? (
                        <button onClick={() => setIsSolved(true)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                            Solve
                        </button>
                    ) : (
                        <button onClick={generateNewProblem} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700">
                            Try Another!
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const slideContent = (
        <div className={`min-h-screen p-4 sm:p-8`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                    <LeftTheoryPanel />
                </TrackedInteraction>
                <TrackedInteraction interaction={slideInteractions[1] || slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                    <RightInteractionPanel />
                </TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="arithmetic-add-subtract-decimals"
            slideTitle="Add and Subtract Decimals"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}