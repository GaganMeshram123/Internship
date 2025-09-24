import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Helper function to create the initial state object
const createInitialInteractions = (interactions: Interaction[]): Record<string, InteractionResponse> => {
    return interactions.reduce((acc, interaction) => {
        acc[interaction.id] = {
            interactionId: interaction.id,
            value: '',
            timestamp: 0,
        };
        return acc;
    }, {} as Record<string, InteractionResponse>);
};

export default function IntegerChallenge() {
    const slideInteractions: Interaction[] = [{ id: 'integer-challenge-concept', conceptId: 'sum-of-integers-challenge', conceptName: 'Sum of Integers Challenge', type: 'learning' }];
    
    const [localInteractions, setLocalInteractions] = useState(() => createInitialInteractions(slideInteractions));

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prevInteractions) => ({
            ...prevInteractions,
            [response.interactionId]: response,
        }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            {/* Left Column: Breaking Down the Problem */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Breaking Down the Problem 🕵️‍♂️</h3>
                <div className="mb-4">
                    <h4 className="font-semibold text-lg">The Challenge:</h4>
                    <p className="mt-2 text-base italic">
                    "The sum of three consecutive odd integers is 15 more than twice the smallest integer. Find the integers."
                    </p>
                </div>

                <hr className="my-3 border-slate-300 dark:border-slate-600" />
                
                <div className="mt-2 flex-grow">
                    <h4 className="font-semibold text-lg">Translating the Clues:</h4>
                    <ul className="list-disc pl-5 text-base space-y-3 mt-3">
                        <li><strong>"Three consecutive odd integers":</strong> <InlineMath>{'x, x+2, x+4'}</InlineMath>.</li>
                        <li><strong>"The sum of these integers":</strong> <InlineMath>{'(x) + (x+2) + (x+4)'}</InlineMath>.</li>
                        <li><strong>"Twice the smallest integer"</strong>: <InlineMath>{'2x'}</InlineMath>.</li>
                        <li><strong>"15 more than twice the smallest":</strong> <InlineMath>{'2x + 15'}</InlineMath>.</li>
                    </ul>
                </div>
            </div>

            {/* Right Column: Solving the Equation */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Solving the Equation ⚙️</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold border-b border-slate-300 dark:border-slate-600 pb-2 mb-3">Step 1: Set Up the Equation</h4>
                        <p className="text-base">Set the "sum" equal to "15 more than twice the smallest."</p>
                        <div className="text-center p-2 mt-2 bg-slate-100 dark:bg-slate-900 rounded-md font-bold text-lg">
                            <InlineMath>{'(x) + (x+2) + (x+4) = 2x + 15'}</InlineMath>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-lg font-semibold border-b border-slate-300 dark:border-slate-600 pb-2 mb-3">Step 2: Simplify and Solve for 'x'</h4>
                        <ol className="list-decimal list-inside text-base space-y-2 mt-2">
                            <li><strong>Combine like terms:</strong> <InlineMath>{'3x + 6 = 2x + 15'}</InlineMath>.</li>
                            <li><strong>Group the variables:</strong> <InlineMath>{'x + 6 = 15'}</InlineMath>.</li>
                            <li><strong>Isolate 'x':</strong> <InlineMath>{'x = 9'}</InlineMath>.</li>
                        </ol>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold border-b border-slate-300 dark:border-slate-600 pb-2 mb-3">Step 3: Find All the Integers</h4>
                        <p className="text-base">The smallest integer (<InlineMath>{'x'}</InlineMath>) is 9. Now find the others.</p>
                        <div className="text-center p-3 mt-2 bg-slate-100 dark:bg-slate-900 rounded-md">
                           <p className="text-base">First: <strong>9</strong>, Second: <strong>11</strong>, Third: <strong>13</strong></p>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 text-center">
                        <h4 className="text-lg font-bold">The Final Answer</h4>
                        <p className="text-xl font-bold my-1">9, 11, and 13</p>
                        <p className="text-sm"><strong>Check:</strong> Sum is <InlineMath>{'33'}</InlineMath>. <InlineMath>{'2(9)+15'}</InlineMath> is also <InlineMath>{'33'}</InlineMath>. It works!</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="sum-of-integers-challenge" 
            slideTitle="Sum of Integers Challenge" 
            moduleId="solving-equations-one-unknown" 
            submoduleId="equations-word-problems"
            interactions={localInteractions}
        >
            <TrackedInteraction 
                interaction={slideInteractions[0]}
                onInteractionComplete={handleInteractionComplete}
            >
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}