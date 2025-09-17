import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function DivideWithRemaindersSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const [problem, setProblem] = useState({ dividend: 13, divisor: 4 });
    const [isSolved, setIsSolved] = useState(false);

    const generateNewProblem = () => {
        setIsSolved(false);
        const divisor = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
        const quotient = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
        const remainder = Math.floor(Math.random() * (divisor - 1)) + 1; // Remainder > 0
        const dividend = (divisor * quotient) + remainder;
        setProblem({ dividend, divisor });
    };

    useEffect(() => { generateNewProblem() }, []);

    // FIX: Defined both interaction objects used in the JSX below.
    const slideInteractions: Interaction[] = [
        { id: 'divide-remainders-concept', conceptId: 'remainders', conceptName: 'Division with Remainders', type: 'learning', description: 'Learning about remainders in division.' },
        { id: 'sharing-with-leftovers-interactive', conceptId: 'remainders', conceptName: 'Sharing with Leftovers', type: 'learning', description: 'Interactive visualization for division with remainders.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Divide with Remainders</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">What's a Remainder?</h3>
                    <p className="text-slate-600 dark:text-slate-400">Sometimes when you share things into equal groups, you have some <strong>leftovers</strong>. The amount left over is called the <strong>remainder</strong>.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Example: Sharing Cookies</h3>
                    <p className="text-slate-600 dark:text-slate-400">If you have 13 cookies to share among 4 friends, each friend gets 3 cookies, and there is <strong>1 cookie left over</strong>. We would write this as: 13 ÷ 4 = 3 R 1.</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const quotient = Math.floor(problem.dividend / problem.divisor);
        const remainder = problem.dividend % problem.divisor;
        const items = Array.from({ length: problem.dividend }, (_, i) => ({ id: i }));

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Sharing with Leftovers</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Let's share {problem.dividend} items among {problem.divisor} groups.</p>
    
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between items-center min-h-[300px]">
                    <div className="h-1/3 w-full flex flex-wrap justify-center items-center gap-1">
                        {!isSolved && items.map(item => <div key={item.id} className="w-6 h-6 bg-blue-500 rounded-full" />)}
                    </div>
                    <div className="w-full flex justify-center items-end gap-4">
                        <div className="w-3/4 grid gap-2" style={{ gridTemplateColumns: `repeat(${problem.divisor}, 1fr)`}}>
                            {Array.from({ length: problem.divisor }).map((_, boxIndex) => (
                                <div key={boxIndex} className="bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-400 h-24 p-1 flex flex-wrap gap-1 justify-center content-start">
                                    <AnimatePresence>
                                    {isSolved && Array.from({length: quotient}).map((_, itemIndex) => (
                                        <motion.div key={itemIndex} initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} transition={{delay: (boxIndex*quotient + itemIndex) * 0.1}}>
                                            <div className="w-4 h-4 bg-blue-500 rounded-full" />
                                        </motion.div>
                                    ))}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                        <div className="w-1/4">
                             <div className="bg-slate-200 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-400 h-24 p-1 flex flex-wrap gap-1 justify-center content-start">
                                 <p className="w-full text-xs font-bold text-slate-500">Leftovers</p>
                                <AnimatePresence>
                                {isSolved && Array.from({length: remainder}).map((_, itemIndex) => (
                                    <motion.div key={itemIndex} initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} transition={{delay: (problem.divisor*quotient + itemIndex) * 0.1}}>
                                        <div className="w-4 h-4 bg-black dark:bg-white rounded-full" />
                                    </motion.div>
                                ))}
                                </AnimatePresence>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-col items-center">
                    <p className="text-2xl font-bold text-slate-600 dark:text-slate-300 mb-2">
                        {problem.dividend} ÷ {problem.divisor} = {isSolved ? <span className="text-blue-600 dark:text-blue-400">{quotient} R {remainder}</span> : '?'}
                    </p>
                    {!isSolved ? (
                        <button onClick={() => setIsSolved(true)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
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
            slideId="arithmetic-divide-remainders"
            slideTitle="Divide with Remainders"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}