import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function AddSubtractFractionsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const [problem, setProblem] = useState({ a: 2, b: 3, denominator: 6 });
    const [isSolved, setIsSolved] = useState(false);

    const generateNewProblem = () => {
        setIsSolved(false);
        const denominator = [4, 5, 6, 8][Math.floor(Math.random() * 4)];
        const a = Math.floor(Math.random() * (denominator - 2)) + 1;
        const b = Math.floor(Math.random() * (denominator - a - 1)) + 1;
        setProblem({ a, b, denominator });
    };

    // Initialize with a problem on first load
    useEffect(() => {
        generateNewProblem();
    }, []);

    const slideInteractions: Interaction[] = [
        { id: 'add-subtract-fractions-concept', conceptId: 'add-subtract-fractions', conceptName: 'Add and Subtract Fractions', type: 'learning', description: 'Learning to add and subtract fractions with like denominators.' },
        { id: 'fraction-bar-builder-interactive', conceptId: 'add-subtract-fractions', conceptName: 'Fraction Bar Builder', type: 'learning', description: 'Interactive visualization for adding fractions.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Add and Subtract Fractions</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Golden Rule</h3>
                    <p className="text-slate-600 dark:text-slate-400">You can only add or subtract fractions if they have the <strong>same denominator</strong> (the bottom number). This is because the size of the slices must be the same!</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Adding and Subtracting Slices</h3>
                    <p className="text-slate-600 dark:text-slate-400">When the denominators are the same, you just add or subtract the <strong>numerators</strong> (the top numbers) and keep the denominator the same.</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const total = problem.a + problem.b;
        const FractionBar = ({ numerator, denominator }: { numerator: number, denominator: number }) => (
            <div className="flex border-2 border-slate-400 dark:border-slate-600 rounded-md overflow-hidden">
                {Array.from({ length: denominator }).map((_, i) => (
                    <div key={i} className={`h-10 w-8 ${i < numerator ? 'bg-blue-500' : 'bg-white dark:bg-slate-800'}`} />
                ))}
            </div>
        );

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Fraction Bar Builder</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Watch how the fractions combine!</p>
    
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <FractionBar numerator={problem.a} denominator={problem.denominator} />
                        <span className="text-3xl font-bold text-slate-500">+</span>
                        <FractionBar numerator={problem.b} denominator={problem.denominator} />
                    </div>
                    
                    <AnimatePresence>
                    {isSolved && (
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex flex-col items-center">
                            <span className="text-3xl font-bold text-slate-500 mb-4">=</span>
                            <FractionBar numerator={total} denominator={problem.denominator} />
                            <p className="text-3xl font-bold mt-4 text-blue-600 dark:text-blue-400">
                                {total}/{problem.denominator}
                            </p>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>

                <div className="mt-4 flex justify-center">
                    {!isSolved ? (
                        <button onClick={() => setIsSolved(true)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                            Combine
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
                <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
                    <RightInteractionPanel />
                </TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="arithmetic-add-subtract-fractions"
            slideTitle="Add and Subtract Fractions"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}