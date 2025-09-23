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

export default function EquationsWithNegatives() {
    const slideInteractions: Interaction[] = [{ id: 'solving-with-negatives-concept', conceptId: 'vars-on-both-sides-negatives', conceptName: 'Equations with Variables on Both Sides: Negatives', type: 'learning' }];

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
        <h2 className="text-3xl font-bold text-center mb-6 md:mb-8">
          Let's Solve Another Puzzle: Tackling Negatives!
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Setup & Strategy */}
          <div className="space-y-6 flex flex-col">
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The New Puzzle 🧐</h3>
              <p className="mb-4">
                This time, our equation has a negative variable term. Let's look at it:
              </p>
              <div className="text-center bg-slate-100 dark:bg-slate-900 rounded-lg p-3">
                 <code className="font-mono text-2xl font-bold text-slate-800 dark:text-slate-200">20 - 7x = 6x - 6</code>
              </div>
               <p className="mt-4">
                Don't worry! The game plan is exactly the same. We just need to be careful with our positive and negative signs.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">What's the Best First Move?</h3>
              <p>
                Remember the pro-tip: move the <strong>smaller 'x' term</strong>. Which is smaller, -7 or 6?
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mt-4">
                <p className="font-semibold text-blue-800 dark:text-blue-300">Think on a Number Line!</p>
                <p>-7 is smaller than 6. To get rid of a "-7x", we do its opposite: <strong>Add 7x to both sides!</strong> This keeps our final 'x' term positive.
                </p>
              </div>
            </div>
            
          </div>

          {/* Right Column: The Step-by-Step Solution */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Step-by-Step Solution 🚀</h3>
            <div className="space-y-4 flex-grow flex flex-col">
              <div className="flex-grow">
                <p className="text-lg font-semibold">Step 1: Group the 'x' Team.</p>
                <p className="text-sm md:text-base mb-2">Add <code className="font-mono bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-1 rounded">7x</code> to both sides to gather the variables.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <code className="block">20 - 7x <span className="text-blue-600 dark:text-blue-300">+ 7x</span> = 6x <span className="text-blue-600 dark:text-blue-300">+ 7x</span> - 6</code>
                  <code className="block font-bold mt-1 text-base md:text-lg">20 = 13x - 6</code>
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-lg font-semibold">Step 2: Group the 'Number' Team.</p>
                <p className="text-sm md:text-base mb-2">The opposite of "-6" is adding <code className="font-mono bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-1 rounded">6</code> to both sides.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <code className="block">20 <span className="text-blue-600 dark:text-blue-300">+ 6</span> = 13x - 6 <span className="text-blue-600 dark:text-blue-300">+ 6</span></code>
                  <code className="block font-bold mt-1 text-base md:text-lg">26 = 13x</code>
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-lg font-semibold">Step 3: Solve for 'x'.</p>
                <p className="text-sm md:text-base mb-2">Divide both sides by <code className="font-mono bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-1 rounded">13</code> to get 'x' alone.</p>
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <code className="block">26 / 13 = 13x / 13</code>
                  <code className="block font-bold text-xl mt-1">2 = x</code>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">Final Check! ✅</p>
                <div className="text-center mt-2 grid grid-cols-2 gap-4">
                    <p><strong>Left Side:</strong><br/><code className="text-base">20 - 7(2) = 6</code></p>
                    <p><strong>Right Side:</strong><br/><code className="text-base">6(2) - 6 = 6</code></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="solving-with-negatives" 
            slideTitle="Equations with Variables on Both Sides: 20-7x=6x-6" 
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