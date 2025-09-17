import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function DecimalsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const [dimes, setDimes] = useState(3); // Tenths
    const [pennies, setPennies] = useState(5); // Hundredths

    const slideInteractions: Interaction[] = [
        { id: 'decimals-concept', conceptId: 'decimals-intro', conceptName: 'Introduction to Decimals', type: 'learning', description: 'Learning about decimals as fractions using a money analogy.' },
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">All About Decimals</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">What is a Decimal?</h3>
                    <p className="text-slate-600 dark:text-slate-400">The decimal point is a dot that separates whole numbers from parts of a number. It's like a special kind of fraction!</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Money Connection 💰</h3>
                    <p className="text-slate-600 dark:text-slate-400">The easiest way to understand decimals is with money. In the price $1.35: </p>
                    <ul className="list-disc pl-5 mt-2 text-slate-600 dark:text-slate-400">
                        <li>The 1 is for 1 whole dollar.</li>
                        <li>The first spot after the dot is the Tenths place. The 3 is for 3 dimes (3 tenths of a dollar).</li>
                        <li>The second spot is the Hundredths place. The 5 is for 5 pennies (5 hundredths of a dollar).</li>
                    </ul>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const totalValue = dimes * 0.1 + pennies * 0.01;

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Price Tag Builder</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Add dimes and pennies to see the decimal!</p>
    
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between items-center">
                    <div className="text-center">
                        <p className="text-sm text-slate-500">PRICE TAG</p>
                        <p className="text-6xl font-bold text-blue-600 dark:text-blue-400">${totalValue.toFixed(2)}</p>
                    </div>

                    <div className="w-full flex justify-around">
                        <div className="text-center">
                             <p className="font-semibold mb-2">Dimes (Tenths)</p>
                             <div className="h-24 flex flex-wrap gap-1 items-center justify-center w-24">
                                <AnimatePresence>
                                {Array.from({length: dimes}).map((_, i) => (
                                    <motion.div key={`d-${i}`} initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}>
                                        <div className="w-6 h-6 bg-slate-400 rounded-full flex items-center justify-center text-xs font-bold">10¢</div>
                                    </motion.div>
                                ))}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="text-center">
                             <p className="font-semibold mb-2">Pennies (Hundredths)</p>
                             <div className="h-24 flex flex-wrap gap-1 items-center justify-center w-24">
                                <AnimatePresence>
                                {Array.from({length: pennies}).map((_, i) => (
                                    <motion.div key={`p-${i}`} initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}>
                                        <div className="w-4 h-4 bg-yellow-600 rounded-full flex items-center justify-center text-xs text-white">1¢</div>
                                    </motion.div>
                                ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setDimes(d => Math.max(0, d-1))} className="w-10 h-10 rounded-full font-bold text-2xl bg-slate-200 dark:bg-slate-700">-</button>
                        <span>Dimes</span>
                        <button onClick={() => setDimes(d => Math.min(9, d+1))} className="w-10 h-10 rounded-full font-bold text-2xl bg-slate-200 dark:bg-slate-700">+</button>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                         <button onClick={() => setPennies(p => Math.max(0, p-1))} className="w-10 h-10 rounded-full font-bold text-2xl bg-slate-200 dark:bg-slate-700">-</button>
                        <span>Pennies</span>
                        <button onClick={() => setPennies(p => Math.min(9, p+1))} className="w-10 h-10 rounded-full font-bold text-2xl bg-slate-200 dark:bg-slate-700">+</button>
                    </div>
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
            slideId="arithmetic-decimals"
            slideTitle="All About Decimals"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}