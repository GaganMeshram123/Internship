import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function MultiDigitMultiplySlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const [problem, setProblem] = useState({ a: 4, b: 23 });
    const [step, setStep] = useState(0); // 0: start, 1: solve tens, 2: solve ones, 3: add

    const tens = Math.floor(problem.b / 10) * 10;
    const ones = problem.b % 10;
    const part1 = problem.a * tens;
    const part2 = problem.a * ones;
    const total = part1 + part2;

    const generateNewProblem = () => {
        const a = Math.floor(Math.random() * 4) + 2; // 2-5
        const b = Math.floor(Math.random() * 89) + 11; // 11-99
        setProblem({ a, b });
        setStep(0);
    };

    useEffect(() => { generateNewProblem() }, []);

    const slideInteractions: Interaction[] = [
        { id: 'multi-digit-multiply-concept', conceptId: 'area-model', conceptName: 'Area Model Multiplication', type: 'learning', description: 'Learning to multiply bigger numbers using the area model.' },
        { id: 'area-model-builder-interaction', conceptId: 'area-model', conceptName: 'Area Model Builder', type: 'learning', description: 'Interactive visualization of the area model for multiplication.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Multiply 1- and 2-Digit Numbers</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Area Model Trick</h3>
                    <p className="text-slate-600 dark:text-slate-400">To multiply a bigger number like 23, we can break it into its place value parts: 20 (tens) and 3 (ones). This makes the problem much easier!</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Step-by-Step</h3>
                    <p className="text-slate-600 dark:text-slate-400">First, multiply by the tens. Then, multiply by the ones. Finally, add the two results together to get your final answer.</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Area Model Builder</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Let's solve {problem.a} × {problem.b}</p>
    
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center">
                <div className="flex items-start">
                    <div className="flex items-center justify-center h-24 pr-2 font-bold text-2xl">{problem.a}</div>
                    <div className="flex flex-col">
                        <div className="flex justify-around text-center">
                            <div className="w-24 font-bold">{tens}</div>
                            <div className="w-12 font-bold">{ones}</div>
                        </div>
                        <div className="flex border-2 border-black dark:border-white">
                            <div className="w-24 h-24 bg-blue-200 dark:bg-blue-900/50 flex items-center justify-center text-2xl font-bold">
                               <AnimatePresence>{step >= 1 && <motion.span initial={{opacity:0}} animate={{opacity:1}}>{part1}</motion.span>}</AnimatePresence>
                            </div>
                            <div className="w-12 h-24 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-2xl font-bold">
                               <AnimatePresence>{step >= 2 && <motion.span initial={{opacity:0}} animate={{opacity:1}}>{part2}</motion.span>}</AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
                
                <AnimatePresence>
                {step === 3 && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center mt-4">
                        <p className="font-bold text-2xl">{part1} + {part2} = <span className="text-blue-600 dark:text-blue-400">{total}</span></p>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>

            <div className="mt-4 flex justify-center">
                {step < 3 ? (
                    <button onClick={() => setStep(s => s + 1)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                        {step === 0 && `Solve ${problem.a} × ${tens}`}
                        {step === 1 && `Solve ${problem.a} × ${ones}`}
                        {step === 2 && `Add the Results`}
                    </button>
                ) : (
                    <button onClick={generateNewProblem} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700">
                        Try Another!
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
                <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
                    <RightInteractionPanel />
                </TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="arithmetic-multi-digit-multiply"
            slideTitle="Multiply 1- and 2-Digit Numbers"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}