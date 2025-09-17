import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function BigNumberOpsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const [operation, setOperation] = useState<'add' | 'subtract'>('add');
    const [problem, setProblem] = useState({ a: 28, b: 15 });
    const [isSolved, setIsSolved] = useState(false);

    const generateNewProblem = (op: 'add' | 'subtract') => {
        setIsSolved(false);
        setOperation(op);
        if (op === 'add') {
            const a = Math.floor(Math.random() * 50) + 20; // 20-69
            const b = Math.floor(Math.random() * 50) + 11; // 11-60
            setProblem({ a, b });
        } else {
            let a = Math.floor(Math.random() * 50) + 40; // 40-89
            let b = Math.floor(Math.random() * 30) + 11; // 11-40
            if (a < b) [a, b] = [b, a]; // Ensure a is larger
            setProblem({ a, b });
        }
    };

    const slideInteractions: Interaction[] = [
        { id: 'big-ops-concept', conceptId: 'regrouping', conceptName: 'Adding & Subtracting Big Numbers', type: 'learning', description: 'Learning about carrying and borrowing.' },
        // FIX: Changed 'exploration' to 'learning'
        { id: 'place-value-workshop', conceptId: 'regrouping', conceptName: 'Place Value Workshop', type: 'learning', description: 'Interactive game to visualize regrouping.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Adding & Subtracting Bigger Numbers</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Adding with "Carrying"</h3>
                    <p className="text-slate-600 dark:text-slate-400">When you add the ones and get a number 10 or bigger, you can't fit it in the "Ones House"! You have to bundle 10 ones together and "carry" them over as a new ten.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Subtracting with "Borrowing"</h3>
                    <p className="text-slate-600 dark:text-slate-400">If you need to subtract more ones than you have, you can "borrow" from the Tens House. You trade one ten block for 10 new one blocks.</p>
                </div>
            </div>
        </div>
    );

   const RightInteractionPanel = () => {
    // Helper function to get tens and ones from a number
    const getParts = (num: number) => ({
        tens: Math.floor(num / 10),
        ones: num % 10,
    });

    const partsA = getParts(problem.a);
    const partsB = getParts(problem.b);
    const result = operation === 'add' ? problem.a + problem.b : problem.a - problem.b;
    const resultParts = getParts(result);

    // Visual block components
    const TensBlock = ({ i }: { i: number }) => (
        <motion.div
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.05 }}
            className="w-4 h-12 bg-blue-500 rounded"
        />
    );
    const OnesBlock = ({ i }: { i: number }) => (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.05 }}
            className="w-4 h-4 bg-black dark:bg-white rounded"
        />
    );

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Place Value Workshop</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Watch how the blocks regroup!</p>
    
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between items-center min-h-[300px]">
                <div className="w-full flex justify-center gap-4 mb-4">
                    <button onClick={() => generateNewProblem('add')} className={`px-4 py-2 rounded-lg font-semibold ${operation === 'add' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Addition</button>
                    <button onClick={() => generateNewProblem('subtract')} className={`px-4 py-2 rounded-lg font-semibold ${operation === 'subtract' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Subtraction</button>
                </div>

                <div className="w-full text-center text-4xl font-bold text-slate-700 dark:text-slate-300">
                    {problem.a} {operation === 'add' ? '+' : '-'} {problem.b} = {isSolved ? <span className="text-blue-600 dark:text-blue-400">{result}</span> : '?'}
                </div>

                {/* Animated Blocks Area */}
                <div className="w-full h-48 grid grid-cols-2 gap-4">
                    {/* Tens Column */}
                    <div className="flex flex-wrap gap-1 justify-center content-start border-r-2 border-slate-300 dark:border-slate-700 pr-2">
                        <p className="w-full text-center text-sm font-semibold text-slate-500">Tens</p>
                        <AnimatePresence>
                        {isSolved 
                            ? Array.from({ length: resultParts.tens }).map((_, i) => <TensBlock key={`res-t-${i}`} i={i} />)
                            : <>
                                {Array.from({ length: partsA.tens }).map((_, i) => <TensBlock key={`a-t-${i}`} i={i} />)}
                                {Array.from({ length: partsB.tens }).map((_, i) => <TensBlock key={`b-t-${i}`} i={i} />)}
                              </>
                        }
                        </AnimatePresence>
                    </div>
                    {/* Ones Column */}
                    <div className="flex flex-wrap gap-1 justify-center content-start pl-2">
                         <p className="w-full text-center text-sm font-semibold text-slate-500">Ones</p>
                         <AnimatePresence>
                         {isSolved 
                            ? Array.from({ length: resultParts.ones }).map((_, i) => <OnesBlock key={`res-o-${i}`} i={i} />)
                            : <>
                                {Array.from({ length: partsA.ones }).map((_, i) => <OnesBlock key={`a-o-${i}`} i={i} />)}
                                {Array.from({ length: partsB.ones }).map((_, i) => <OnesBlock key={`b-o-${i}`} i={i} />)}
                              </>
                        }
                        </AnimatePresence>
                    </div>
                </div>

                <button 
                    onClick={() => isSolved ? generateNewProblem(operation) : setIsSolved(true)} 
                    className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700"
                >
                    {isSolved ? 'New Problem' : 'Solve'}
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
                <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
                    <RightInteractionPanel />
                </TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="arithmetic-big-ops"
            slideTitle="Add and Subtract Bigger Numbers"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}