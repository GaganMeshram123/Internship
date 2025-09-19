import React, { useState, useEffect } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

export default function SubtractingWithRegroupingSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [problem, setProblem] = useState({ a: 42, b: 17 });
    const [step, setStep] = useState(0);

    const generateNewProblem = () => {
        setStep(0);
        let a = Math.floor(Math.random() * 50) + 40; // 40-89
        let b = Math.floor(Math.random() * 30) + 11; // 11-40
        if (a % 10 >= b % 10) { generateNewProblem(); return; } // Ensure borrowing is needed
        setProblem({ a, b });
    };

    useEffect(() => { generateNewProblem(); }, []);
    
    const slideInteractions: Interaction[] = [{ id: 'subtract-within-100-concept', conceptId: 'subtract-within-100', conceptName: 'Subtracting within 100', type: 'learning' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

     const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Subtracting within 100</h2>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Subtracting with "Borrowing"</h3>
                <p className="text-slate-600 dark:text-slate-400">If you need to subtract more "ones" than you have, you can "borrow" from the Tens house. You trade one ten block for 10 new one blocks, giving you enough to subtract.</p>
            </div>
        </div>
    );

    const RightInteractionPanel = () => (
         <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Place Value Subtraction</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Let's solve {problem.a} - {problem.b}</p>
            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center text-center">
                 <p className="text-4xl font-bold text-slate-700 dark:text-slate-300">
                    {problem.a} - {problem.b} = {step === 2 ? <span className="text-blue-600">{problem.a - problem.b}</span> : '?'}
                 </p>
                <div className="text-slate-400">[Animation of base-10 blocks would go here]</div>
            </div>
             <div className="mt-4">
                <button onClick={() => step === 2 ? generateNewProblem() : setStep(s => s + 1)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                    {step === 0 && 'Step 1: Borrow a Ten'}
                    {step === 1 && 'Step 2: Subtract'}
                    {step === 2 && 'Try Another!'}
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

    return ( <SlideComponentWrapper slideId="subtract-within-100" slideTitle="Subtracting within 100 with Regrouping" moduleId="grade-2-math-operations" submoduleId="add-subtract-within-100" interactions={localInteractions}>{slideContent}</SlideComponentWrapper> );
}