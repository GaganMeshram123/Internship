import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse, MatchingPair } from '../../../common-components/concept';

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

export default function VariableInDenominator() {
    const slideInteractions: Interaction[] = [{ id: 'denominator-concept', conceptId: 'variable-in-denominator', conceptName: 'Variables in the Denominator', type: 'learning' }];

    // Create state to manage interactions
    const [localInteractions, setLocalInteractions] = useState(() => createInitialInteractions(slideInteractions));

    // Define the required handler function
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prevInteractions: Record<string, InteractionResponse>) => ({
            ...prevInteractions,
            [response.interactionId]: response,
        }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Setup & Strategy */}
          <div className="space-y-6 flex flex-col">
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The New Puzzle 🧐</h3>
              <p className="mb-4">
                This time, our variable 'x' is in the denominator! We can't solve for it while it's "trapped" downstairs.
              </p>
              <div className="text-center bg-slate-100 dark:bg-slate-900 rounded-lg p-3">
                 <code className="font-mono text-3xl font-bold text-slate-800 dark:text-slate-200">12 / x = 3</code>
              </div>
               <p className="mt-4">
                Our very first job is to get 'x' out of the denominator and into a normal position.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The #1 Rule for Denominators</h3>
              <p>
                In all of math, there's one super important rule you can never break: <strong>You can never, EVER divide by zero.</strong> It's impossible and would break math!
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mt-4">
                <p className="font-semibold text-blue-800 dark:text-blue-300">What This Means For Us:</p>
                <p>Since 'x' is in the denominator, we know that whatever our final answer is, <strong>'x' cannot be 0.</strong> This is a "restriction" we must remember.
                </p>
              </div>
            </div>
            
          </div>

          {/* Right Column: The Step-by-Step Solution */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Step-by-Step Solution ✨</h3>
            <div className="space-y-4 flex-grow flex flex-col justify-around">
              
              <div>
                <p className="text-lg font-semibold">Step 1: Free the Variable!</p>
                <p className="text-sm md:text-base mb-2">To undo dividing by 'x', we do the opposite: **multiply both sides by x**.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <code className="block">x * (12 / x) = 3 * x</code>
                  <p className="text-xs italic my-1 text-slate-600 dark:text-slate-400">On the left, the 'x' on top and bottom cancel out!</p>
                  <code className="block font-bold mt-1 text-base md:text-lg">12 = 3x</code>
                </div>
              </div>
              
              <div>
                <p className="text-lg font-semibold">Step 2: Solve for 'x'.</p>
                <p className="text-sm md:text-base mb-2">Now it's a simple one-step problem! Just divide both sides by 3.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                    <code className="block">12 / 3 = 3x / 3</code>
                  <code className="block font-bold text-xl mt-1">4 = x</code>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold">Step 3: Final Check! ✅</p>
                <p className="text-sm md:text-base mb-2">Plug `x = 4` back into the original equation to be sure.</p>
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <code className="block text-center text-lg">12 / (4) = 3</code>
                  <code className="block text-center text-lg font-bold">3 = 3</code>
                  <p className="text-center font-semibold mt-2">It works! (And our answer isn't 0).</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="variable-in-denominator" 
            slideTitle="Variables in the Denominator" 
            moduleId="solving-equations-one-unknown" 
            submoduleId="variables-on-both-sides"
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