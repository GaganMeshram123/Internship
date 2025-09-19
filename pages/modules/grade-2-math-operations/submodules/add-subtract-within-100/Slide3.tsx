import React, { useState, useEffect } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

export default function WordProblemsSlide100() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [problem, setProblem] = useState({ text: "", a: 0, b: 0, op: '+' });
    const [selection, setSelection] = useState<'+' | '-' | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

     const problems = [
        { text: "There are 45 red birds and 28 blue birds in a tree. How many birds are there in total?", a: 45, b: 28, op: '+' },
        { text: "You have 72 stickers. You give 35 to a friend. How many stickers are left?", a: 72, b: 35, op: '-' }
    ];

    const generateNewProblem = () => {
        setSelection(null); setIsCorrect(null);
        setProblem(problems[Math.floor(Math.random() * problems.length)]);
    };

    useEffect(() => { generateNewProblem() }, []);
    
    const handleSelection = (op: '+' | '-') => {
        setSelection(op);
        setIsCorrect(op === problem.op);
    };

    const slideInteractions: Interaction[] = [{ id: 'word-problems-100', conceptId: 'word-problems-100', conceptName: 'Word Problems within 100', type: 'judging' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const LeftTheoryPanel = () => (
         <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Word Problems within 100</h2>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Finding Clue Words</h3>
                <p className="text-slate-600 dark:text-slate-400">Word problems are math stories! Look for clue words to decide if you need to add or subtract.</p>
            </div>
        </div>
    );
    
    const RightInteractionPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Story Puzzle</h3>
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-6 flex-grow flex flex-col justify-center items-center text-center">
                <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-6">{problem.text}</p>
                <p className="text-slate-500 mb-2">Choose the correct operation:</p>
                <div className="flex gap-4">
                    <button onClick={() => handleSelection('+')} disabled={selection !== null} className={`w-20 h-20 text-5xl rounded-lg font-bold transition-colors ${selection === '+' ? (isCorrect ? 'bg-blue-500 text-white' : 'bg-red-500 text-white') : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'}`}>+</button>
                    <button onClick={() => handleSelection('-')} disabled={selection !== null} className={`w-20 h-20 text-5xl rounded-lg font-bold transition-colors ${selection === '-' ? (isCorrect ? 'bg-blue-500 text-white' : 'bg-red-500 text-white') : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'}`}>-</button>
                </div>
            </div>
            <div className="mt-4"><button onClick={generateNewProblem} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700">New Story</button></div>
        </div>
    );

    const slideContent = (
         <div className="min-h-screen p-4 sm:p-8"><div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><LeftTheoryPanel /></TrackedInteraction>
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><RightInteractionPanel /></TrackedInteraction>
        </div></div>
    );

    return ( <SlideComponentWrapper slideId="word-problems-within-100" slideTitle="Word Problems within 100" moduleId="grade-2-math-operations" submoduleId="add-subtract-within-100" interactions={localInteractions}>{slideContent}</SlideComponentWrapper> );
}