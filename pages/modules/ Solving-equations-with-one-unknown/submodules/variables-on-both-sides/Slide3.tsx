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

export default function EquationsWithFractions() {
    const slideInteractions: Interaction[] = [{ id: 'fractions-concept', conceptId: 'equations-with-fractions', conceptName: 'Tackling Equations with Fractions', type: 'learning' }];

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
          New Mission: Don't Fear the Fractions! 🍕
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Setup & Strategy */}
          <div className="space-y-6 flex flex-col">
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The New Puzzle 🧐</h3>
              <p className="mb-4">
                This equation has fractions, which can look complicated. But don't worry, we have a secret weapon to make them disappear!
              </p>
              <div className="text-center bg-slate-100 dark:bg-slate-900 rounded-lg p-3">
                 <code className="font-mono text-2xl font-bold text-slate-800 dark:text-slate-200">(2x/3) + 1 = (x/4) + 6</code>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Our Secret Weapon: The LCM!</h3>
              <p>
                To get rid of the fractions, we'll find the <strong>Least Common Multiple (LCM)</strong> of the denominators (3 and 4).
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mt-4">
                <p className="font-semibold text-blue-800 dark:text-blue-300">Finding the LCM</p>
                <ul className="list-disc pl-5">
                    <li>Multiples of 3: 3, 6, 9, <strong className="text-blue-600 dark:text-blue-400">12</strong>...</li>
                    <li>Multiples of 4: 4, 8, <strong className="text-blue-600 dark:text-blue-400">12</strong>...</li>
                    <li>The LCM is <strong>12</strong>! Now for the magic trick...</li>
                </ul>
              </div>
            </div>
            
          </div>

          {/* Right Column: The Step-by-Step Solution */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Step-by-Step Solution 🪄</h3>
            <div className="space-y-3 flex-grow flex flex-col">

              <div>
                <p className="text-lg font-semibold">Step 1: The Magic Step! (Eliminate Fractions)</p>
                <p className="text-sm md:text-base mb-2">Multiply **every single term** by the LCM, which is 12.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <code className="block text-slate-600 dark:text-slate-400">12*(2x/3) + 12*1 = 12*(x/4) + 12*6</code>
                  <code className="block mt-1">8x + 12 = 3x + 72</code>
                  <p className="font-semibold mt-2">Success! The fractions are gone!</p>
                </div>
              </div>
              
              <div>
                <p className="text-lg font-semibold">Step 2: Group the 'x' Team.</p>
                <p className="text-sm md:text-base mb-2">Subtract <code className="font-mono bg-slate-200 dark:bg-slate-700 p-1 rounded">3x</code> from both sides.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <code className="block font-bold">5x + 12 = 72</code>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold">Step 3: Group the 'Number' Team.</p>
                <p className="text-sm md:text-base mb-2">Subtract <code className="font-mono bg-slate-200 dark:bg-slate-700 p-1 rounded">12</code> from both sides.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <code className="block font-bold">5x = 60</code>
                </div>
              </div>
              
              <div>
                <p className="text-lg font-semibold">Step 4: Solve for 'x'.</p>
                <p className="text-sm md:text-base mb-2">Divide both sides by <code className="font-mono bg-slate-200 dark:bg-slate-700 p-1 rounded">5</code>.</p>
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <code className="block font-bold text-xl">x = 12</code>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="equations-with-fractions" 
            slideTitle="Tackling Equations with Fractions" 
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