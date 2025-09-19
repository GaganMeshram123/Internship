import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

export default function WordProblemsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();
    const [problem, setProblem] = useState({ text: "", a: 0, b: 0, op: '+' });
    const [selection, setSelection] = useState<'+' | '-' | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const problems = [
        { text: "Sara has 8 apples. Tom gives her 5 more. How many apples does Sara have in all?", a: 8, b: 5, op: '+' },
        { text: "There are 12 birds on a wire. 4 birds fly away. How many birds are left?", a: 12, b: 4, op: '-' },
        { text: "Leo has 7 stickers. He gets 6 more from his friend. How many stickers does he have now?", a: 7, b: 6, op: '+' },
        { text: "There are 15 balloons. 7 of them pop. How many are left?", a: 15, b: 7, op: '-' }
    ];

    const generateNewProblem = () => {
        setSelection(null);
        setIsCorrect(null);
        setProblem(problems[Math.floor(Math.random() * problems.length)]);
    };

    useEffect(() => { generateNewProblem() }, []);
    
    const handleSelection = (op: '+' | '-') => {
        if (selection) return;
        setSelection(op);
        setIsCorrect(op === problem.op);
    };

    const slideInteractions: Interaction[] = [
        { id: 'word-problems-20-concept', conceptId: 'word-problems-20', conceptName: 'Word Problems within 20', type: 'learning' },
        { id: 'word-problems-20-interactive', conceptId: 'word-problems-20', conceptName: 'Interactive Story Solver', type: 'judging' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
         <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Word Problems within 20</h2>
             <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Finding Clue Words</h3>
                <p className="text-slate-600 dark:text-slate-400">Word problems are math stories! Look for clue words to decide if you need to add or subtract.</p>
                 <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Words like "in all," "altogether," or "more" usually mean you need to <strong>add (+)</strong>.</li>
                    <li>Words like "how many are left" or "how many more" usually mean you need to <strong>subtract (-)</strong>.</li>
                </ul>
            </div>
        </div>
    );
    
    const RightInteractionPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Story Solver</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Read the story and choose the right operation!</p>
             <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-6 flex-grow flex flex-col justify-center items-center text-center">
                <p className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-6">{problem.text}</p>
                <div className="flex gap-4">
                    <button onClick={() => handleSelection('+')} disabled={selection !== null} className={`w-24 h-24 text-6xl rounded-lg font-bold transition-colors ${selection === '+' ? (isCorrect ? 'bg-blue-500 text-white' : 'bg-red-500 text-white') : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'}`}>+</button>
                    <button onClick={() => handleSelection('-')} disabled={selection !== null} className={`w-24 h-24 text-6xl rounded-lg font-bold transition-colors ${selection === '-' ? (isCorrect ? 'bg-blue-500 text-white' : 'bg-red-500 text-white') : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'}`}>-</button>
                </div>
                <AnimatePresence>
                {isCorrect !== null && (
                    <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="mt-4">
                        <p className={`font-bold text-lg ${isCorrect ? 'text-blue-600' : 'text-red-500'}`}>{isCorrect ? "That's right!" : "Not quite!"}</p>
                        <p className="text-2xl font-bold text-slate-700 dark:text-slate-300 mt-2">{problem.a} {problem.op} {problem.b} = {problem.op === '+' ? problem.a + problem.b : problem.a - problem.b}</p>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            <div className="mt-4"><button onClick={generateNewProblem} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700">New Story</button></div>
        </div>
    );

    const slideContent = (
         <div className="min-h-screen p-4 sm:p-8"><div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><LeftTheoryPanel /></TrackedInteraction>
            <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}><RightInteractionPanel /></TrackedInteraction>
        </div></div>
    );

    return (
        <SlideComponentWrapper 
            slideId="word-problems-within-20" 
            slideTitle="Word Problems within 20" 
            moduleId="grade-2-math-operations" 
            submoduleId="add-subtract-within-20" 
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}