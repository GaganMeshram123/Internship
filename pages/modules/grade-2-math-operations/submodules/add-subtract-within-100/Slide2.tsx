import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

// --- Reusable Block Components ---
const TensBlock = ({ layoutId }: { layoutId: string }) => (
    <motion.div layoutId={layoutId} className="w-4 h-12 bg-blue-500 rounded" />
);
const OnesBlock = ({ layoutId }: { layoutId: string }) => (
    <motion.div layoutId={layoutId} className="w-4 h-4 bg-black dark:bg-white rounded" />
);

// --- Main Slide Component ---
export default function SubtractingWithRegroupingSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [problem, setProblem] = useState({ a: 42, b: 17 });
    const [isSolved, setIsSolved] = useState(false); // FIX: Added isSolved state

    const generateNewProblem = () => {
        setIsSolved(false);
        let a = Math.floor(Math.random() * 50) + 40; // 40-89
        let b = Math.floor(Math.random() * (a - 20)) + 11; // 11 to (a-21)
        if (a % 10 >= b % 10) { 
            generateNewProblem(); 
            return; 
        } // Ensure borrowing is needed
        setProblem({ a, b });
    };

    useEffect(() => { generateNewProblem(); }, []);
    
    const slideInteractions: Interaction[] = [
        { id: 'subtract-within-100-concept', conceptId: 'subtract-within-100', conceptName: 'Subtracting within 100', type: 'learning' },
        { id: 'place-value-subtraction-interactive', conceptId: 'subtract-within-100', conceptName: 'Interactive Subtraction', type: 'learning' }
    ];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Subtracting with Regrouping (Borrowing)</h2>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">What if You Don't Have Enough Ones?</h3>
                <p className="text-slate-600 dark:text-slate-400">If you need to subtract more "ones" than you have, you can "borrow" from the Tens house. You trade one ten block for 10 new one blocks, giving you enough to subtract.</p>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const partsA = { tens: Math.floor(problem.a / 10), ones: problem.a % 10 };
        const partsB = { tens: Math.floor(problem.b / 10), ones: problem.b % 10 };
        const result = problem.a - problem.b;

        return (
             <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Place Value Subtraction</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Let's solve {problem.a} - {problem.b}</p>
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col items-center text-center">
                    <div className="w-full h-48 grid grid-cols-2 gap-4">
                        {/* Tens Column */}
                        <div className="flex flex-col items-center border-r-2 border-slate-300 dark:border-slate-700 pr-2">
                            <p className="font-bold text-slate-500">Tens</p>
                            <div className="flex-grow flex flex-wrap-reverse justify-center content-start gap-1 pt-2">
                               <AnimatePresence>
                                {Array.from({length: partsA.tens}).map((_,i) => (
                                    <motion.div
                                        key={`start-ten-${i}`}
                                        animate={{ 
                                            opacity: isSolved && i >= partsA.tens - partsB.tens -1 ? 0.2 : 1,
                                            scale: isSolved && i === partsA.tens - 1 ? 0 : 1
                                        }}
                                        transition={{delay: isSolved ? 0.5 : 0}}
                                    >
                                       <TensBlock layoutId={`ten-${i}`} />
                                    </motion.div>
                                ))}
                               </AnimatePresence>
                            </div>
                        </div>
                        {/* Ones Column */}
                        <div className="flex flex-col items-center pl-2">
                            <p className="font-bold text-slate-500">Ones</p>
                            <div className="flex-grow flex flex-wrap-reverse justify-center content-start gap-1 pt-2">
                                <AnimatePresence>
                                    {Array.from({length: isSolved ? partsA.ones + 10 : partsA.ones}).map((_,i) => (
                                         <motion.div 
                                            key={`one-${i}`}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ 
                                                opacity: isSolved && i < partsB.ones ? 0.2 : 1,
                                                scale: 1,
                                            }}
                                            transition={{ delay: i * 0.05 + (isSolved ? 0.5 : 0) }}
                                         >
                                           <OnesBlock layoutId={`one-${i}`} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                     <p className="text-4xl font-bold text-slate-700 dark:text-slate-300 mt-4">
                        {problem.a} - {problem.b} = {isSolved ? <span className="text-blue-600">{result}</span> : '?'}
                     </p>
                </div>
                 <div className="mt-4">
                    <button onClick={() => isSolved ? generateNewProblem() : setIsSolved(true)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                        {isSolved ? 'Try Another!' : 'Solve'}
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

    return ( <SlideComponentWrapper slideId="subtract-within-100" slideTitle="Subtracting within 100 with Regrouping" moduleId="grade-2-math-operations" submoduleId="add-subtract-within-100" interactions={localInteractions}>{slideContent}</SlideComponentWrapper> );
}