import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function DivisionSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    // --- State for the interactive animation ---
    const [problem, setProblem] = useState({ dividend: 12, divisor: 3 });
    const [isShared, setIsShared] = useState(false);

    const generateNewProblem = () => {
        const divisors = [2, 3, 4];
        const newDivisor = divisors[Math.floor(Math.random() * divisors.length)];
        const multiplier = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
        const newDividend = newDivisor * multiplier;

        setProblem({ dividend: newDividend, divisor: newDivisor });
        setIsShared(false);
    };

    useEffect(() => {
        generateNewProblem(); // Initialize on mount
    }, []);

    const slideInteractions: Interaction[] = [
        { id: 'division-intro-concept', conceptId: 'division', conceptName: 'Introduction to Division', type: 'learning', description: 'Learning the basic concept of division as sharing.' },
        { id: 'division-sharing-machine', conceptId: 'division', conceptName: 'Sharing Machine', type: 'learning', description: 'Interactive game to visualize division.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Dazzling Division (÷)</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Sharing Fairly</h3>
                    <p className="text-slate-600 dark:text-slate-400">Division is what we use for sharing things equally. If you have 12 cookies to share among 3 friends, you divide to find out how many each friend gets.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Making Equal Groups</h3>
                    <p className="text-slate-600 dark:text-slate-400">Division also tells us how many equal groups we can make. If you have 12 cookies and want to put 4 in each bag, you divide to find out how many bags you can make.</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const result = problem.dividend / problem.divisor;
        const items = Array.from({ length: problem.dividend }, (_, i) => ({ id: i }));

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Sharing Machine</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Press "Share" to deal the items!</p>
    
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between items-center min-h-[300px]">
                    {/* Items to be shared */}
                    <div className="h-1/3 w-full flex flex-wrap justify-center items-center gap-1">
                        {!isShared && items.map(item => <div key={item.id} className="w-6 h-6 bg-blue-500 rounded-full" />)}
                    </div>

                    {/* Sharing Groups */}
                    <div className="h-2/3 w-full grid gap-4" style={{ gridTemplateColumns: `repeat(${problem.divisor}, 1fr)`}}>
                        {Array.from({ length: problem.divisor }).map((_, boxIndex) => (
                            <div key={boxIndex} className="bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-400 p-2 flex flex-wrap gap-1 justify-center items-center">
                                <AnimatePresence>
                                {isShared && items.filter(item => item.id % problem.divisor === boxIndex).map(item => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: item.id * 0.1 }}
                                    >
                                        <div className="w-6 h-6 bg-blue-500 rounded-full" />
                                    </motion.div>
                                ))}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex flex-col items-center">
                    <p className="text-2xl font-bold text-slate-600 dark:text-slate-300 mb-2">
                        {problem.dividend} ÷ {problem.divisor} = {isShared ? <span className="text-blue-600 dark:text-blue-400">{result}</span> : '?'}
                    </p>
                    {!isShared ? (
                        <button onClick={() => setIsShared(true)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                            Share
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
                {/* FIX: Corrected the closing tag typo from </Track-edInteraction> */}
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
            slideId="arithmetic-division"
            slideTitle="Dazzling Division: Sharing Fairly"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}