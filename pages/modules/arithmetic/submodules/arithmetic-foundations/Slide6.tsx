import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function PlaceValueSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    // --- State for the interactive animation ---
    const [targetNumber, setTargetNumber] = useState(23);
    const [tens, setTens] = useState(0);
    const [ones, setOnes] = useState(0);

    const targetTens = Math.floor(targetNumber / 10);
    const targetOnes = targetNumber % 10;
    const isCorrect = tens === targetTens && ones === targetOnes;

    const generateNewNumber = () => {
        setTens(0);
        setOnes(0);
        setTargetNumber(Math.floor(Math.random() * 89) + 11); // Random number from 11 to 99
    };

    useEffect(() => {
        generateNewNumber();
    }, []);

    const slideInteractions: Interaction[] = [
        { id: 'place-value-concept', conceptId: 'place-value', conceptName: 'Understanding Place Value', type: 'learning', description: 'Learning about tens and ones.' },
        { id: 'place-value-builder', conceptId: 'place-value', conceptName: 'Number Builder Game', type: 'judging', description: 'Interactive game to build numbers with tens and ones.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Understanding Place Value</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The "Houses" for Numbers</h3>
                    <p className="text-slate-600 dark:text-slate-400">In a number like 23, the position of each digit is important. Think of them as living in different houses: the **Ones House** on the right and the **Tens House** on the left.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Tens and Ones</h3>
                    <p className="text-slate-600 dark:text-slate-400">The number <strong>23</strong> isn't "2" and "3". It means we have **2 groups of Ten** and **3 Ones**.</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Number Builder</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Build the number using tens and ones blocks!</p>
    
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between items-center min-h-[300px]">
                <div>
                    <p className="text-sm text-slate-500">TARGET NUMBER</p>
                    <p className="text-6xl font-bold text-blue-600 dark:text-blue-400">{targetNumber}</p>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 h-32">
                    <div className="flex flex-wrap gap-1 justify-center content-start">
                        <AnimatePresence>
                        {Array.from({ length: tens }).map((_, i) => (
                            <motion.div key={`t-${i}`} initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                                <div className="w-4 h-16 bg-blue-500 rounded" />
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center content-start">
                         <AnimatePresence>
                        {Array.from({ length: ones }).map((_, i) => (
                            <motion.div key={`o-${i}`} initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.5}}>
                                <div className="w-4 h-4 bg-black dark:bg-white rounded" />
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>
                </div>
                
                <div className="w-full">
                    {isCorrect ? (
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center">
                            <p className="font-bold text-xl text-blue-600 dark:text-blue-400">You did it!</p>
                            <button onClick={generateNewNumber} className="w-full mt-2 px-6 py-3 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700">New Number</button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setTens(t => t + 1)} className="px-4 py-2 rounded-lg font-semibold bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200">Add Ten</button>
                            <button onClick={() => setOnes(o => o + 1)} className="px-4 py-2 rounded-lg font-semibold bg-slate-200 dark:bg-slate-700 text-black dark:text-white">Add One</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

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
            slideId="arithmetic-place-value"
            slideTitle="Understanding Place Value"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}