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

export default function CreatingNoSolution() {
    const slideInteractions: Interaction[] = [{ id: 'creating-no-solution-concept', conceptId: 'creating-no-solution', conceptName: 'Creating an Equation with No Solution', type: 'learning' }];

    const [localInteractions, setLocalInteractions] = useState(() => createInitialInteractions(slideInteractions));
    const [userEquation, setUserEquation] = useState('');

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prevInteractions: Record<string, InteractionResponse>) => ({
            ...prevInteractions,
            [response.interactionId]: response,
        }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        {/* <h2 className="text-3xl font-bold text-center mb-6">
          Equation Architect: How to Build a "No Solution" Problem 🏗️
        </h2> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Secret Recipe & Your Turn */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Secret Recipe</h3>
            <p>To create an equation with no solution, you need to make sure two things are true:</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-4">
              <ol className="list-decimal list-inside space-y-4">
                <li>
                  <strong className="font-semibold">The variable parts are identical.</strong>
                  <p className="text-sm pl-2">The 'x' terms must be the same on both sides.</p>
                </li>
                <li>
                  <strong className="font-semibold">The number parts are different.</strong>
                  <p className="text-sm pl-2">The constants must be different on each side.</p>
                </li>
              </ol>
            </div>
            <p className="mt-4 text-sm italic">This guarantees a contradiction.</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mt-auto">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">Your Turn to Build!</h4>
                <p className="text-sm mt-1">Use the recipe: Start with <InlineMath>{'1 = 2'}</InlineMath> and add <InlineMath>{'5x'}</InlineMath> to both sides.</p>
                <input 
                    type="text" 
                    placeholder="Type your equation here"
                    value={userEquation}
                    onChange={(e) => setUserEquation(e.target.value)}
                    className="w-full mt-2 p-2 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600"
                />
                 {userEquation.replace(/\s/g, '') === '5x+1=5x+2' && <p className="text-xs text-center mt-2 font-bold text-blue-600 dark:text-blue-400">Perfect! That's a great example!</p>}
            </div>
          </div>
          
          {/* Right Column: Step-by-Step Guide */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Let's Build & Test One</h3>
            <div className="space-y-3 flex-grow flex flex-col justify-around">
                <div>
                    <p className="font-semibold">Step 1: Start with a False Statement</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1"><InlineMath>{'4 = 10'}</InlineMath></div>
                </div>
                <div>
                    <p className="font-semibold">Step 2: Add an Identical Variable Term</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'2x + 4 = 2x + 10'}</InlineMath></div>
                </div>
                <div>
                    <p className="font-semibold">Step 3: Disguise Your Equation</p>
                    <p className="text-sm">Let's hide the right side using the distributive property.</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'2x + 4 = 2(x + 5)'}</InlineMath></div>
                    <p className="text-sm mt-1">This looks like a real problem, but we know it's impossible!</p>
                </div>
                 <div>
                    <p className="font-semibold">Step 4: Test Your Creation</p>
                    <p className="text-sm">Let's prove it has no solution by trying to solve it.</p>
                     <div className="bg-blue-50 dark:bg-blue-900/30 p-2 mt-1 rounded-md text-sm">
                        <ol className="list-decimal list-inside">
                            <li><strong>Distribute:</strong> <InlineMath>{'2x + 4 = 2x + 10'}</InlineMath></li>
                            <li><strong>Subtract <InlineMath>{'2x'}</InlineMath>:</strong> <InlineMath>{'4 = 10'}</InlineMath> (False!)</li>
                        </ol>
                        <p className="font-bold text-center mt-1">Proof: It has no solution!</p>
                     </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="creating-no-solution" 
            slideTitle="Creating an Equation with No Solution" 
            moduleId="solving-equations-one-unknown" 
            submoduleId="number-of-solutions"
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