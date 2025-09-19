import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

export default function SubtractionStrategiesSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [problem, setProblem] = useState({ a: 13, b: 5 });
    const [isSolved, setIsSolved] = useState(false);

    const generateNewProblem = () => {
        setIsSolved(false);
        const a = Math.floor(Math.random() * 8) + 11; // 11-18
        const b = Math.floor(Math.random() * 5) + 4; // 4-8
        if (a - b < 0) { generateNewProblem(); return; } // Avoid negative results
        setProblem({ a, b });
    };
    
    useEffect(() => { generateNewProblem(); }, []);

    const slideInteractions: Interaction[] = [
        { id: 'subtract-strategies-20', conceptId: 'subtract-within-20', conceptName: 'Subtraction Strategies within 20', type: 'learning' },
        { id: 'ten-frame-subtraction', conceptId: 'subtract-within-20', conceptName: 'Ten Frame Subtraction', type: 'learning' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Subtraction Strategies within 20</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Counting Back</h3>
                    <p className="text-slate-600 dark:text-slate-400">To subtract, you can start at the first number and "count back." For 12 - 3, you would say "12... 11, 10, 9!"</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Subtracting from Ten</h3>
                    <p className="text-slate-600 dark:text-slate-400">A great trick is to break the subtraction into two steps. For 14 - 6, first do "14 - 4" to get to 10. Then, just subtract the leftover 2 from 10 to get 8!</p>
                </div>
            </div>
        </div>
    );
    
    const RightInteractionPanel = () => {
        const result = problem.a - problem.b;
        return (
             <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Ten Frame</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Let's solve {problem.a} - {problem.b}.</p>
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center">
                   <div className="flex items-center gap-2">
                     <div className="w-48 h-24 grid grid-cols-5 grid-rows-2 gap-2 border-4 border-slate-400 p-2 rounded-md">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <motion.div key={i} animate={{ opacity: isSolved && i >= result ? 0.2 : 1 }} transition={{ delay: (isSolved && i >= result) ? (9-i)*0.1 : 0 }} className="w-full h-full bg-blue-500 rounded-full" />
                        ))}
                    </div>
                     <div className="flex flex-col gap-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.div key={i} animate={{ opacity: i < problem.a - 10 ? 1 : 0 }} className="w-6 h-6 rounded-full bg-blue-500" />
                        ))}
                    </div>
                   </div>
                    <p className="text-2xl font-bold text-slate-600 dark:text-slate-300 mt-4">
                        {problem.a} - {problem.b} = {isSolved ? <span className="text-blue-600">{result}</span> : '?'}
                    </p>
                </div>
                <div className="mt-4">
                    <button onClick={() => isSolved ? generateNewProblem() : setIsSolved(true)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                        {isSolved ? 'Try Another!' : 'Subtract'}
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
        <SlideComponentWrapper slideId="subtract-within-20" slideTitle="Subtraction Strategies within 20" moduleId="grade-2-math-operations" submoduleId="add-subtract-within-20" interactions={localInteractions}>
            {slideContent}
        </SlideComponentWrapper>
    );
}