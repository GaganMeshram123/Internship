import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Define a specific type for our problems ---
type Problem = {
    text: string;
    a: number;
    b: number;
    op: '+' | '-';
    clueWord: string;
}

// --- Main Slide Component ---
export default function WordProblemsSlide100() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    // FIX: Explicitly type the problem state
    const [problem, setProblem] = useState<Problem>({ text: "", a: 0, b: 0, op: '+', clueWord: '' });
    const [selection, setSelection] = useState<'+' | '-' | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [key, setKey] = useState(0);

    // FIX: Use "as const" to make the types of the array properties specific
    const problems = [
        { text: "Maria has 45 red flowers. She picks 28 more blue flowers. How many flowers does she have in total?", a: 45, b: 28, op: '+', clueWord: "in total" },
        { text: "Tom had 72 balloons. 35 balloons flew away. How many balloons are left?", a: 72, b: 35, op: '-', clueWord: "left" },
        { text: "There are 55 apples on a tree. 12 apples fall off. How many apples are still on the tree?", a: 55, b: 12, op: '-', clueWord: "still on" },
        { text: "A baker made 60 cookies. She made 25 more. How many cookies did she make altogether?", a: 60, b: 25, op: '+', clueWord: "altogether" }
    ] as const;

    const generateNewProblem = () => {
        setSelection(null);
        setIsCorrect(null);
        setShowResult(false);
        setKey(prevKey => prevKey + 1);
        setProblem(problems[Math.floor(Math.random() * problems.length)]);
    };

    useEffect(() => { generateNewProblem() }, []);
    
    const handleSelection = (op: '+' | '-') => {
        if (selection !== null) return;
        setSelection(op);
        const correct = op === problem.op;
        setIsCorrect(correct);
        setTimeout(() => setShowResult(true), 1500);
    };

    const slideInteractions: Interaction[] = [
        { id: 'word-problems-100-intro', conceptId: 'word-problems-100', conceptName: 'Introduction to Word Problems', type: 'learning' },
        { id: 'word-problems-100-interactive', conceptId: 'word-problems-100', conceptName: 'Solve Word Problems within 100', type: 'judging' }
    ];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Word Problems within 100</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Finding Clue Words</h3>
                    <p className="text-slate-600 dark:text-slate-400">Word problems are math stories! Look for clue words to decide if you need to add or subtract.</p>
                    <ul className="list-disc pl-5 mt-3 text-slate-600 dark:text-slate-400">
                        <li><strong>Add Clue Words:</strong> *in total, altogether, more, sum, plus*</li>
                        <li><strong>Subtract Clue Words:</strong> *left, flew away, how many more, difference, minus*</li>
                    </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-400 dark:border-green-700 rounded-lg px-6 py-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Picture the Story</h3>
                    <p className="text-slate-600 dark:text-slate-400">Imagine what's happening in the story. Are things being combined, or are some things being removed? This helps you pick the right math tool (+ or -).</p>
                </div>
            </div>
        </div>
    );
    
    const RightInteractionPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Story Puzzle</h3>
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-6 flex-grow flex flex-col justify-center items-center text-center relative overflow-hidden">
                <AnimatePresence mode="wait" key={key}>
                    <motion.p 
                        key={problem.text}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-6 min-h-[60px]"
                    >
                        {problem.text}
                    </motion.p>

                    {selection === null && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
                            className="flex gap-4 mt-4"
                        >
                            <button onClick={() => handleSelection('+')} className="w-20 h-20 text-5xl rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 active:scale-95 transition-transform">+</button>
                            <button onClick={() => handleSelection('-')} className="w-20 h-20 text-5xl rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-transform">-</button>
                        </motion.div>
                    )}

                    {isCorrect !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className={`mt-4 text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
                        >
                            {isCorrect ? "Correct!" : "Try again!"}
                        </motion.div>
                    )}

                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
                            className="mt-6 text-4xl font-extrabold text-blue-600 dark:text-blue-400"
                        >
                            {problem.a} {problem.op} {problem.b} = {problem.op === '+' ? problem.a + problem.b : problem.a - problem.b}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="mt-4"><button onClick={generateNewProblem} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700">New Story</button></div>
        </div>
    );

    const slideContent = (
        <div className="min-h-screen p-4 sm-p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><LeftTheoryPanel /></TrackedInteraction>
                <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}><RightInteractionPanel /></TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="word-problems-within-100" 
            slideTitle="Word Problems within 100" 
            moduleId="grade-2-math-operations" 
            submoduleId="add-subtract-within-100" 
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}