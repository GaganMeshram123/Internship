import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// Define props for the RightInteractionPanel
interface RightPanelProps {
    problem: { a: number; b: number };
    animationStep: number;
    setAnimationStep: React.Dispatch<React.SetStateAction<number>>;
    generateNewProblem: () => void;
}

const RightInteractionPanel: React.FC<RightPanelProps> = ({ problem, animationStep, setAnimationStep, generateNewProblem }) => {
    const total = problem.a + problem.b;
    const handleButtonClick = () => {
        if (animationStep === 0) {
            setAnimationStep(1);
        } else {
            generateNewProblem();
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Addition Playground</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Mix the potions to find the sum!</p>
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between items-center min-h-[300px] overflow-hidden">
                {/* Informational Text */}
                <div className="w-full text-center h-12">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={animationStep}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-slate-500 font-semibold"
                        >
                            {animationStep === 0 && `Here are ${problem.a} blue drops and ${problem.b} black drops.`}
                            {animationStep === 1 && 'Pouring them together...'}
                            {animationStep === 2 && `The new potion has a total of ${total}!` }
                        </motion.p>
                    </AnimatePresence>
                </div>
                {/* Visual Area */}
                <div className="w-full h-full relative flex justify-center items-center">
                    <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-slate-800 border-b-4 border-slate-400 dark:border-slate-600 relative z-10">
                        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-12 h-8 bg-slate-200 dark:bg-slate-800 border-x-4 border-t-4 border-slate-400 dark:border-slate-600 rounded-t-lg"></div>
                        <AnimatePresence>
                        {animationStep >= 1 && (
                            <motion.div className="absolute bottom-0 left-0 w-full h-full rounded-full overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <motion.div className="absolute w-[200%] h-[200%] bg-blue-500 top-0 left-[-50%]" animate={{ rotate: 360 }} transition={{ duration: 1, ease: "linear", repeat: Infinity }} />
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    <motion.div className="absolute top-0 left-4 w-16 h-16 bg-blue-200/50 dark:bg-blue-900/50 border-4 border-slate-400 dark:border-slate-600 rounded-b-lg rounded-t-sm flex flex-col justify-end z-20" animate={{ y: animationStep >= 1 ? 80 : 0, rotate: animationStep >= 1 ? -75 : 0, x: animationStep >= 1 ? 40 : 0 }} transition={{ duration: 0.8 }}>
                        <div className="h-1/2 bg-blue-500 flex items-center justify-center text-xl font-bold text-white">{problem.a}</div>
                    </motion.div>
                     <motion.div className="absolute top-0 right-4 w-16 h-16 bg-black/10 dark:bg-white/10 border-4 border-slate-400 dark:border-slate-600 rounded-b-lg rounded-t-sm flex flex-col justify-end z-20" animate={{ y: animationStep >= 1 ? 80 : 0, rotate: animationStep >= 1 ? 75 : 0, x: animationStep >= 1 ? -40 : 0 }} transition={{ duration: 0.8 }}>
                        <div className="h-1/2 bg-black dark:bg-white flex items-center justify-center text-xl font-bold text-black dark:text-black">{problem.b}</div>
                    </motion.div>
                    <AnimatePresence>
                    {animationStep === 2 && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="absolute text-6xl font-bold text-white z-30">
                            {total}
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
                <div className="w-full pt-4">
                    <button onClick={handleButtonClick} disabled={animationStep === 1} className={`w-full px-6 py-3 rounded-lg font-bold text-white transition-colors ${animationStep === 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-600 hover:bg-slate-700'} disabled:opacity-50`}>
                        {animationStep === 0 ? 'Mix Potion!' : 'Try Another!'}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Main Slide Component ---
export default function AdditionSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const [problem, setProblem] = useState({ a: 2, b: 3 });
    const [animationStep, setAnimationStep] = useState(0);

    const generateNewProblem = () => {
        const newA = Math.floor(Math.random() * 4) + 2;
        const newB = Math.floor(Math.random() * 4) + 2;
        setProblem({ a: newA, b: newB });
        setAnimationStep(0);
    };

    useEffect(() => {
        if (animationStep === 1) {
            const timer = setTimeout(() => setAnimationStep(2), 1500);
            return () => clearTimeout(timer);
        }
    }, [animationStep]);

    const slideInteractions: Interaction[] = [
        { id: 'addition-intro-concept', conceptId: 'addition', conceptName: 'Introduction to Addition', type: 'learning', description: 'Learning the basic concept of addition as combining groups.' },
        { id: 'addition-potion-game', conceptId: 'addition', conceptName: 'Potion Mixing Game', type: 'learning', description: 'Interactive game to visualize addition.' }
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
                    <p className="text-slate-600 dark:text-slate-400">Addition is simply putting groups of things together to see how many you have in total.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Number Line Hops</h3>
                    <p className="text-slate-600 dark:text-slate-400">On the number line, adding is like taking hops forward. To solve "2 + 3", you start at 2 and take 3 big hops forward to land on 5!</p>
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
                    <RightInteractionPanel 
                        problem={problem}
                        animationStep={animationStep}
                        setAnimationStep={setAnimationStep}
                        generateNewProblem={generateNewProblem}
                    />
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