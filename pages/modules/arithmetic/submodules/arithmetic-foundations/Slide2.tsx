import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function AdditionSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    // --- State for the interactive animation ---
    const [problem, setProblem] = useState({ a: 2, b: 3 });
    const [animationStep, setAnimationStep] = useState(0); // 0: initial, 1: combining, 2: combined

    const generateNewProblem = () => {
        const newA = Math.floor(Math.random() * 4) + 1; // Random number from 1 to 4
        const newB = Math.floor(Math.random() * 3) + 2; // Random number from 2 to 4
        setProblem({ a: newA, b: newB });
        setAnimationStep(0); // Reset animation
    };

    useEffect(() => {
        generateNewProblem(); // Initialize on mount
    }, []);

    const slideInteractions: Interaction[] = [
        { id: 'addition-intro-concept', conceptId: 'addition', conceptName: 'Introduction to Addition', type: 'learning', description: 'Learning the basic concept of addition as combining groups.' },
        { id: 'addition-playground-game', conceptId: 'addition', conceptName: 'Addition Playground', type: 'learning', description: 'Interactive game to visualize addition.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Fun with Addition (+)</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Putting Things Together</h3>
                    <p className="text-slate-600 dark:text-slate-400">Addition is simply putting groups of things together to see how many you have in total. If you have 2 apples and get 3 more, you add them to find the total.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Number Line Hops</h3>
                    <p className="text-slate-600 dark:text-slate-400">On the number line, adding is like taking hops forward. To solve "2 + 3", you start at 2 and take 3 big hops forward to land on 5!</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const total = problem.a + problem.b;
        const ballSize = 32; // px
        const gap = 8; // px

        const calculateXPos = (count: number, index: number) => {
            const totalWidth = count * ballSize + (count - 1) * gap;
            return index * (ballSize + gap) - totalWidth / 2 + ballSize / 2;
        };

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Addition Playground</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Watch the balls combine!</p>
    
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between items-center min-h-[250px] relative overflow-hidden">
                    {/* Initial State (Animation Step 0) */}
                    <AnimatePresence>
                    {animationStep === 0 && (
                        <motion.div 
                            key="initial-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex justify-around items-center"
                        >
                            <div className="flex gap-2">{Array.from({ length: problem.a }).map((_, i) => <div key={i} className="w-8 h-8 bg-blue-500 rounded-full" />)}</div>
                            <button onClick={() => setAnimationStep(1)} className="text-5xl font-bold text-slate-500 hover:text-blue-600 transition-colors">+</button>
                            <div className="flex gap-2">{Array.from({ length: problem.b }).map((_, i) => <div key={i} className="w-8 h-8 bg-black dark:bg-white rounded-full" />)}</div>
                        </motion.div>
                    )}
                    </AnimatePresence>

                    {/* Combining Animation (Animation Step 1) */}
                    <AnimatePresence>
                    {animationStep === 1 && (
                        <motion.div 
                            key="combining-state"
                            className="absolute inset-0 flex justify-center items-center"
                        >
                            {/* Balls from group A moving to center */}
                            {Array.from({ length: problem.a }).map((_, i) => (
                                <motion.div 
                                    key={`a-${i}`}
                                    className="w-8 h-8 bg-blue-500 rounded-full absolute"
                                    initial={{ x: -150 + i * 40, opacity: 1 }} // Start from left
                                    animate={{ x: calculateXPos(total, i), opacity: 1 }} // Move to combined position
                                    transition={{ duration: 0.8, delay: i * 0.05 }}
                                    onAnimationComplete={() => {
                                        if (i === problem.a - 1 && animationStep === 1) {
                                            setAnimationStep(2); // Move to combined state after last ball from A
                                        }
                                    }}
                                />
                            ))}
                            {/* Balls from group B moving to center */}
                            {Array.from({ length: problem.b }).map((_, i) => (
                                <motion.div 
                                    key={`b-${i}`}
                                    className="w-8 h-8 bg-black dark:bg-white rounded-full absolute"
                                    initial={{ x: 150 - i * 40, opacity: 1 }} // Start from right
                                    animate={{ x: calculateXPos(total, problem.a + i), opacity: 1 }} // Move to combined position
                                    transition={{ duration: 0.8, delay: i * 0.05 }}
                                />
                            ))}
                        </motion.div>
                    )}
                    </AnimatePresence>


                    {/* Combined State (Animation Step 2) */}
                    <AnimatePresence>
                    {animationStep === 2 && (
                        <motion.div 
                            key="combined-state"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute inset-0 flex flex-col justify-center items-center"
                        >
                             <div className="flex flex-wrap justify-center gap-2 p-4 border-2 border-dashed border-slate-400 rounded-lg">
                                {Array.from({ length: total }).map((_, i) => (
                                    <motion.div 
                                        key={`final-${i}`} 
                                        className={`w-8 h-8 rounded-full ${i < problem.a ? 'bg-blue-500' : 'bg-black dark:bg-white'}`}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
                                    />
                                ))}
                            </div>
                            <p className="text-5xl font-bold mt-4 text-blue-600 dark:text-blue-400">{total}</p>
                        </motion.div>
                    )}
                    </AnimatePresence>

                    {animationStep === 2 && (
                        <button onClick={generateNewProblem} className="absolute bottom-4 w-full max-w-xs px-6 py-2 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700">
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
            slideId="arithmetic-addition"
            slideTitle="Fun with Addition: Putting Things Together"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}