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

export default function IntroVariablesOnBothSides() {
    const slideInteractions: Interaction[] = [{ id: 'intro-vars-concept', conceptId: 'vars-both-sides-intro', conceptName: 'Intro to Variables on Both Sides', type: 'learning' }];
    
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
          {/* Left Column: Core Concepts */}
          <div className="space-y-6 flex flex-col">
            
            {/* Card 1: The New Challenge */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The New Challenge: 'x' is in Two Places!</h3>
              <p className="mb-4">
                You're used to finding 'x' in one spot. But now, 'x' can show up on <strong className="font-bold">both sides</strong> of the equals sign! It's like a new, exciting math puzzle.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                <p className="font-semibold text-blue-800 dark:text-blue-300">Our Main Goal:</p>
                <p>Get all the <strong className="text-blue-600 dark:text-blue-400">'x' terms</strong> (variables) on one side and all the <strong className="text-blue-600 dark:text-blue-400">plain numbers</strong> (constants) on the other side.</p>
              </div>
            </div>

            {/* Card 2: The Golden Rule */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The Golden Rule: Keep it Balanced! ⚖️</h3>
              <p>
                Imagine an equation as a perfectly balanced scale. If you do anything to one side (like adding or subtracting), you <strong className="font-bold text-blue-600 dark:text-blue-400">MUST do the exact same thing</strong> to the other side. This keeps everything fair and correct!
              </p>
            </div>
            
          </div>

          {/* Right Column: The Game Plan */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Your Game Plan: A 3-Step Strategy to Win! 🏆</h3>
            <p className="mb-4">Let's solve this example together: <code className="font-mono bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-1 px-2 rounded">5x + 2 = 2x + 14</code></p>
            <ol className="list-decimal list-inside space-y-4 text-slate-900 dark:text-slate-100 flex-grow">
              <li className="mb-2">
                <strong className="text-lg">Step 1: Group the 'x' Team Together.</strong>
                <p className="pl-2 text-sm md:text-base">Move the smaller 'x' term to avoid negative numbers. So, subtract <code className="font-mono bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-1 rounded">2x</code> from both sides.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm mt-2 text-sm md:text-base">
                  <code className="block">5x <span className="text-blue-600 dark:text-blue-300">- 2x</span> + 2 = 2x <span className="text-blue-600 dark:text-blue-300">- 2x</span> + 14</code>
                  <code className="block font-bold mt-1 text-base md:text-lg">3x + 2 = 14</code>
                </div>
              </li>
              <li className="mb-2">
                <strong className="text-lg">Step 2: Group the 'Number' Team Together.</strong>
                <p className="pl-2 text-sm md:text-base">Now move the plain numbers to the other side. Subtract <code className="font-mono bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-1 rounded">2</code> from both sides.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm mt-2 text-sm md:text-base">
                  <code className="block">3x + 2 <span className="text-blue-600 dark:text-blue-300">- 2</span> = 14 <span className="text-blue-600 dark:text-blue-300">- 2</span></code>
                  <code className="block font-bold mt-1 text-base md:text-lg">3x = 12</code>
                </div>
              </li>
              <li className="mb-2">
                <strong className="text-lg">Step 3: Solve for 'x'.</strong>
                <p className="pl-2 text-sm md:text-base">Get 'x' all by itself! Divide both sides by <code className="font-mono bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 p-1 rounded">3</code>.</p>
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm mt-2 text-sm md:text-base">
                  <code className="block">(3x) / 3 = 12 / 3</code>
                  <code className="block font-bold text-xl mt-1">x = 4</code>
                </div>
              </li>
            </ol>
          </div>

        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="intro-vars-both-sides" 
            slideTitle="Introduction to Equations with Variables on Both Sides" 
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