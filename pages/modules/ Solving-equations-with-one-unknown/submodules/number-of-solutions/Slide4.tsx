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

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prevInteractions: Record<string, InteractionResponse>) => ({
            ...prevInteractions,
            [response.interactionId]: response,
        }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">
          Equation Architect: Building an "Infinite Solutions" Problem ✨
        </h2>
        <p className="text-center max-w-3xl mx-auto mb-6">
          An equation with infinite solutions is called an "identity." Let's learn the secret recipe to build one yourself by making both sides secretly identical.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Secret Recipe */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Secret Recipe</h3>
            <p>To create an equation with **infinite solutions**, you need to make sure two things are true:</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-4 flex-grow flex flex-col justify-center">
              <ol className="list-decimal list-inside space-y-4">
                <li>
                  <strong className="font-semibold">The variable parts are identical.</strong>
                  <p className="text-sm pl-2">The terms with 'x' must simplify to the exact same thing on both sides.</p>
                </li>
                <li>
                  <strong className="font-semibold">The number parts are identical.</strong>
                  <p className="text-sm pl-2">The plain numbers (constants) must also be the same on both sides.</p>
                </li>
              </ol>
            </div>
            <p className="mt-4 text-sm italic">This ensures the variables cancel out, leaving a true statement.</p>
          </div>
          
          {/* Right Column: Step-by-Step Guide */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Let's Build One Step-by-Step</h3>
            <div className="space-y-4 flex-grow flex flex-col justify-around">
                <div>
                    <p className="font-semibold">Step 1: Start with a True Statement</p>
                    <p className="text-sm">Write a simple statement that is always true.</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1"><InlineMath>{'10 = 10'}</InlineMath></div>
                </div>
                <div>
                    <p className="font-semibold">Step 2: Add an Identical Variable Term to Both Sides</p>
                    <p className="text-sm">Pick any 'x' term and add it to both sides. Let's use <InlineMath>{'4x'}</InlineMath>.</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'4x + 10 = 4x + 10'}</InlineMath></div>
                    <p className="text-sm mt-1">This is a valid "infinite solutions" equation!</p>
                </div>
                 <div>
                    <p className="font-semibold">Step 3: Disguise Your Equation</p>
                    <p className="text-sm">Make the sides look different. Let's rewrite the right side using the distributive property.</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'4x + 10 = 2(2x + 5)'}</InlineMath></div>
                    <p className="text-sm mt-1">This looks like a real problem, but it's an identity in disguise!</p>
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