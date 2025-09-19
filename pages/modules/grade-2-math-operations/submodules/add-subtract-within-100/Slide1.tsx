import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

// --- Main Slide Component ---
export default function AddingWithRegroupingSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [problem, setProblem] = useState({ a: 28, b: 15 });
    const [step, setStep] = useState(0); // 0: start, 1: combine ones, 2: carry ten, 3: combine tens

    const generateNewProblem = () => {
        setStep(0);
        const a_ones = Math.floor(Math.random() * 5) + 5; // 5-9
        const b_ones = Math.floor(Math.random() * 5) + 5; // 5-9
        const a_tens = Math.floor(Math.random() * 3) + 1; // 1-3
        const b_tens = Math.floor(Math.random() * 3) + 1; // 1-3
        setProblem({ a: a_tens * 10 + a_ones, b: b_tens * 10 + b_ones });
    };

    useEffect(() => { generateNewProblem() }, []);

    const slideInteractions: Interaction[] = [{ id: 'add-within-100-concept', conceptId: 'add-within-100', conceptName: 'Adding within 100', type: 'learning' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Adding within 100</h2>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Adding with "Carrying"</h3>
                <p className="text-slate-600 dark:text-slate-400">When you add the "ones" and get a number 10 or bigger, you can't fit them all in the Ones house! You have to bundle 10 "ones" together and "carry" them over as a new "ten" to the Tens house.</p>
            </div>
        </div>
    );

    const RightInteractionPanel = () => (
         <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Place Value Addition</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Let's solve {problem.a} + {problem.b}</p>
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center text-center">
                 <p className="text-4xl font-bold text-slate-700 dark:text-slate-300">
                    {problem.a} + {problem.b} = {step === 3 ? <span className="text-blue-600">{problem.a + problem.b}</span> : '?'}
                 </p>
                <div className="text-slate-400">[Animation of base-10 blocks would go here]</div>
            </div>
             <div className="mt-4">
                <button onClick={() => step === 3 ? generateNewProblem() : setStep(s => s + 1)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                    {step === 0 && 'Step 1: Combine Ones'}
                    {step === 1 && 'Step 2: Carry the Ten'}
                    {step === 2 && 'Step 3: Combine Tens'}
                    {step === 3 && 'Try Another!'}
                </button>
            </div>
        </div>
    );

    const slideContent = (
        <div className="min-h-screen p-4 sm:p-8"><div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><LeftTheoryPanel /></TrackedInteraction>
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><RightInteractionPanel /></TrackedInteraction>
        </div></div>
    );

    return ( <SlideComponentWrapper slideId="add-within-100" slideTitle="Adding within 100 with Regrouping" moduleId="grade-2-math-operations" submoduleId="add-subtract-within-100" interactions={localInteractions}>{slideContent}</SlideComponentWrapper> );
}