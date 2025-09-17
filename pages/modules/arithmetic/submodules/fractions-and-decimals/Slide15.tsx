import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function WordProblemsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const [step, setStep] = useState(0); // 0: start, 1: parentheses solved, 2: final answer
    const problem = {
        text: "You have 3 red apples. Your friend gives you 2 green apples. You put all the apples into 4 bags. How many apples are in the bags altogether?",
        expression: "(3 + 2) × 4",
        part1: "(3 + 2)",
        result1: "5",
        part2: "5 × 4",
        result2: "20"
    };

    const handleStep = () => {
        if (step < 2) {
            setStep(s => s + 1);
        }
    };

    const handleReset = () => {
        setStep(0);
    };

    const slideInteractions: Interaction[] = [
        { id: 'word-problems-concept', conceptId: 'order-of-operations', conceptName: 'Order of Operations', type: 'learning', description: 'Learning about multi-step problems and the order of operations.' },
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Putting It All Together!</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Solving Math Puzzles</h3>
                    <p className="text-slate-600 dark:text-slate-400">Word problems are like fun puzzles. They use all the skills you've learned: adding, subtracting, multiplying, and dividing!</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Secret Code: Order of Operations</h3>
                    <p className="text-slate-600 dark:text-slate-400">When a problem has multiple steps, we follow a special order to get the right answer. A simple way to remember is PEMDAS:</p>
                    <ul className="list-disc pl-5 mt-2 font-semibold text-slate-700 dark:text-slate-300">
                        <li><strong>P</strong>arentheses first</li>
                        <li><strong>M</strong>ultiplication and <strong>D</strong>ivision next (from left to right)</li>
                        <li><strong>A</strong>ddition and <strong>S</strong>ubtraction last (from left to right)</li>
                    </ul>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Problem Solver</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{problem.text}</p>
    
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center font-bold text-4xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        {step === 0 && <span>{problem.expression}</span>}
                        {step === 1 && <span><span className="text-blue-600 dark:text-blue-400">{problem.result1}</span> × 4</span>}
                        {step === 2 && <span className="text-blue-600 dark:text-blue-400">{problem.result2}</span>}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-4 flex justify-center">
                {step < 2 ? (
                    <button onClick={handleStep} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                        {step === 0 ? "Solve Parentheses First" : "Solve the Final Step"}
                    </button>
                ) : (
                    <button onClick={handleReset} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700">
                        Reset
                    </button>
                )}
            </div>
        </div>
    );

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
            slideId="arithmetic-word-problems"
            slideTitle="Putting It All Together"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}