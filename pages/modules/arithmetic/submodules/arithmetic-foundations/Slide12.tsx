import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function MultiplyFractionsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const [problem, setProblem] = useState({ n1: 1, d1: 2, n2: 2, d2: 3 });
    const [step, setStep] = useState(0); // 0: start, 1: apply first fraction, 2: apply second, 3: show result

    const generateNewProblem = () => {
        setStep(0);
        const d1 = [2, 3, 4][Math.floor(Math.random() * 3)];
        const d2 = [2, 3, 4][Math.floor(Math.random() * 3)];
        const n1 = Math.floor(Math.random() * (d1 - 1)) + 1;
        const n2 = Math.floor(Math.random() * (d2 - 1)) + 1;
        setProblem({ n1, d1, n2, d2 });
    };

    useEffect(() => { generateNewProblem() }, []);

    const slideInteractions: Interaction[] = [
        { id: 'multiply-fractions-concept', conceptId: 'multiply-fractions', conceptName: 'Multiply Fractions', type: 'learning', description: 'Learning to multiply fractions using the area model.' },
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Multiply Fractions</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Finding a "Part of a Part"</h3>
                    <p className="text-slate-600 dark:text-slate-400">Multiplying fractions like "1/2 × 1/3" is the same as asking, "What is half of one-third?" We can visualize this with a chocolate bar!</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Simple Rule</h3>
                    <p className="text-slate-600 dark:text-slate-400">To multiply fractions, just multiply the numerators (top numbers) together, and multiply the denominators (bottom numbers) together.</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const resultNumerator = problem.n1 * problem.n2;
        const resultDenominator = problem.d1 * problem.d2;

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Fraction Painter</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Let's solve {problem.n1}/{problem.d1} × {problem.n2}/{problem.d2}</p>
    
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center">
                    <div 
                        className="w-48 h-48 border-2 border-black dark:border-white grid"
                        style={{ gridTemplateRows: `repeat(${problem.d1}, 1fr)`, gridTemplateColumns: `repeat(${problem.d2}, 1fr)`}}
                    >
                        {Array.from({ length: resultDenominator }).map((_, i) => {
                            const row = Math.floor(i / problem.d2);
                            const col = i % problem.d2;
                            const isBlue = col < problem.n2; // Vertical shading for the second fraction
                            const isStriped = row < problem.n1; // Horizontal shading for the first fraction
                            
                            return (
                                <div key={i} className={`relative border border-slate-300 dark:border-slate-700
                                    ${isBlue && 'bg-blue-500/30'}
                                `}>
                                    {isStriped && <div className="absolute inset-0 bg-black/20 dark:bg-white/20" style={{clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)'}} />}
                                </div>
                            );
                        })}
                    </div>
                     <p className="text-2xl font-bold text-slate-600 dark:text-slate-300 mt-4">
                        {problem.n1}/{problem.d1} × {problem.n2}/{problem.d2} = <span className="text-blue-600 dark:text-blue-400">{resultNumerator}/{resultDenominator}</span>
                    </p>
                </div>

                <div className="mt-4 flex justify-center">
                     <button onClick={generateNewProblem} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700">
                        Try Another Problem
                    </button>
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
            slideId="arithmetic-multiply-fractions"
            slideTitle="Multiply Fractions"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}