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

export default function CreatingInfiniteSolutions() {
    const slideInteractions: Interaction[] = [{ id: 'creating-infinite-solutions-concept', conceptId: 'creating-infinite-solutions', conceptName: 'Creating an Equation with Infinite Solutions', type: 'learning' }];

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
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Secret Recipe, Analogy & Your Turn */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Secret Recipe</h3>
                <p>To create an equation with infinite solutions (an identity), make both sides secretly identical:</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-2">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>The variable parts must be identical.</li>
                        <li>The number parts must be identical.</li>
                    </ol>
                </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">A Simple Analogy</h4>
                <p className="text-xs mt-1">An identity is like a balancing scale with the exact same items on both sides. It will always be balanced, no matter what.</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mt-auto">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">Your Turn to Build!</h4>
                <p className="text-sm mt-1">Use the recipe: Start with <InlineMath>{'7 = 7'}</InlineMath> and add <InlineMath>{'-2x'}</InlineMath> to both sides.</p>
                <input 
                    type="text" 
                    placeholder="Type your equation here"
                    value={userEquation}
                    onChange={(e) => setUserEquation(e.target.value)}
                    className="w-full mt-2 p-2 rounded border border-slate-300 dark:bg-slate-800 dark:border-slate-600"
                />
                 {userEquation.replace(/\s/g, '') === '7-2x=7-2x' && <p className="text-xs text-center mt-2 font-bold text-blue-600 dark:text-blue-400">Exactly! You've created an identity!</p>}
            </div>
          </div>
          
          {/* Right Column: Step-by-Step Guide */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Let's Build & Test One</h3>
            <div className="space-y-3 flex-grow flex flex-col justify-around">
                <div>
                    <p className="font-semibold">Step 1: Start with a True Statement</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1"><InlineMath>{'10 = 10'}</InlineMath></div>
                </div>
                <div>
                    <p className="font-semibold">Step 2: Add an Identical Variable Term</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'4x + 10 = 4x + 10'}</InlineMath></div>
                </div>
                <div>
                    <p className="font-semibold">Step 3: Disguise Your Equation</p>
                    <p className="text-sm">Let's hide the right side using the distributive property.</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'4x + 10 = 2(2x + 5)'}</InlineMath></div>
                </div>
                 <div>
                    <p className="font-semibold">Step 4: Test Your Creation</p>
                    <p className="text-sm">Let's prove it has infinite solutions by solving it.</p>
                     <div className="bg-blue-50 dark:bg-blue-900/30 p-2 mt-1 rounded-md text-sm">
                        <ol className="list-decimal list-inside">
                            <li><strong>Distribute:</strong> <InlineMath>{'4x + 10 = 4x + 10'}</InlineMath></li>
                            <li><strong>Subtract <InlineMath>{'4x'}</InlineMath>:</strong> <InlineMath>{'10 = 10'}</InlineMath> (True!)</li>
                        </ol>
                        <p className="font-bold text-center mt-1">Proof: It has infinite solutions!</p>
                     </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="creating-infinite-solutions" 
            slideTitle="Creating an Equation with Infinite Solutions" 
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