import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

export default function AdditionStrategiesSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [problem, setProblem] = useState({ a: 8, b: 5 });
    const [isSolved, setIsSolved] = useState(false);

    const generateNewProblem = () => {
        setIsSolved(false);
        const a = Math.floor(Math.random() * 5) + 5; // 5-9
        const b = Math.floor(Math.random() * 5) + 3; // 3-7
        setProblem({ a, b });
    };

    useEffect(() => { generateNewProblem(); }, []);

    const slideInteractions: Interaction[] = [
        { id: 'add-strategies-20', conceptId: 'add-within-20', conceptName: 'Addition Strategies within 20', type: 'learning' },
        { id: 'ten-frame-addition', conceptId: 'add-within-20', conceptName: 'Ten Frame Addition', type: 'learning' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Addition Strategies within 20</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Counting On</h3>
                    <p className="text-slate-600 dark:text-slate-400">A simple way to add is to start with the bigger number and "count on." For 8 + 3, you would say "8... 9, 10, 11!"</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Making a Ten</h3>
                    <p className="text-slate-600 dark:text-slate-400">A super-fast trick is to make a ten first. For 8 + 5, you can think of it as "8 + 2 + 3". This becomes "10 + 3", which is 13!</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const total = problem.a + problem.b;
        const neededForTen = 10 - problem.a;
        const remaining = problem.b - neededForTen;

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Ten Frame</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Let's solve {problem.a} + {problem.b} by making a ten.</p>
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center">
                    <div className="w-48 h-24 grid grid-cols-5 grid-rows-2 gap-2 border-4 border-slate-400 p-2 rounded-md mb-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="w-full h-full rounded-full flex items-center justify-center">
                                {i < problem.a && <div className="w-6 h-6 bg-blue-500 rounded-full" />}
                                {isSolved && i >= problem.a && <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay: i*0.1}} className="w-6 h-6 bg-black dark:bg-white rounded-full" />}
                            </div>
                        ))}
                    </div>
                    <div className="h-10 flex items-center gap-2">
                        {!isSolved && Array.from({ length: problem.b }).map((_, i) => <div key={i} className="w-6 h-6 bg-black dark:bg-white rounded-full" />)}
                        {isSolved && Array.from({ length: remaining }).map((_, i) => <div key={i} className="w-6 h-6 bg-black dark:bg-white rounded-full" />)}
                    </div>
                    <p className="text-2xl font-bold text-slate-600 dark:text-slate-300 mt-4">
                        {problem.a} + {problem.b} = {isSolved ? <span className="text-blue-600">{total}</span> : '?'}
                    </p>
                </div>
                <div className="mt-4">
                    <button onClick={() => isSolved ? generateNewProblem() : setIsSolved(true)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                        {isSolved ? 'Try Another!' : 'Make a Ten'}
                    </button>
                </div>
            </div>
        );
    };

    const slideContent = (
        <div className="min-h-screen p-4 sm:p-8"><div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><LeftTheoryPanel /></TrackedInteraction>
            <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}><RightInteractionPanel /></TrackedInteraction>
        </div></div>
    );

    return (
        <SlideComponentWrapper slideId="add-within-20" slideTitle="Addition Strategies within 20" moduleId="grade-2-math-operations" submoduleId="add-subtract-within-20" interactions={localInteractions}>
            {slideContent}
        </SlideComponentWrapper>
    );
}