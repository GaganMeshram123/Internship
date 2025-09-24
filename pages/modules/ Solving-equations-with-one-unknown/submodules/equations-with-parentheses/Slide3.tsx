import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse, MatchingPair } from '../../../common-components/concept';
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

export default function ParenthesesOnBothSides() {
    const slideInteractions: Interaction[] = [{ id: 'parens-both-sides-concept', conceptId: 'parentheses-on-both-sides', conceptName: 'Parentheses on Both Sides', type: 'learning' }];

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
          The Final Challenge: Parentheses & Variables on Both Sides 🧠
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Setup & Strategy */}
          <div className="space-y-6 flex flex-col">
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">Putting It All Together 🧩</h3>
              <p className="mb-4">
                This problem combines two skills you already have: using the <strong>Distributive Property</strong> and <strong>moving variables</strong>.
              </p>
              <div className="text-center bg-slate-100 dark:bg-slate-900 rounded-lg p-3">
                 <p className="font-mono text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200"><InlineMath>{'5(x + 2) = 3(x + 10)'}</InlineMath></p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The 4-Step Game Plan</h3>
              <p>
                When you see a problem like this, always follow this order to make it easy.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mt-4">
                <ol className="list-decimal list-inside font-semibold space-y-2">
                    <li>DISTRIBUTE first.</li>
                    <li>GROUP the variables.</li>
                    <li>GROUP the numbers.</li>
                    <li>SOLVE for 'x'.</li>
                </ol>
              </div>
            </div>
            
          </div>

          {/* Right Column: The Step-by-Step Solution */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Step-by-Step Solution 🏆</h3>
            <div className="space-y-3 flex-grow flex flex-col justify-around">
              
              <div>
                <p className="text-lg font-semibold">Step 1: Distribute First!</p>
                <p className="text-sm md:text-base mb-2">Unlock both sets of parentheses.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <p><strong>Left side:</strong> <InlineMath>{'5 \\cdot x + 5 \\cdot 2'}</InlineMath> becomes <InlineMath>{'5x + 10'}</InlineMath>.</p>
                  <p><strong>Right side:</strong> <InlineMath>{'3 \\cdot x + 3 \\cdot 10'}</InlineMath> becomes <InlineMath>{'3x + 30'}</InlineMath>.</p>
                  <hr className="my-2 border-slate-300 dark:border-slate-600" />
                  <p className="font-semibold">New Equation: <InlineMath>{'5x + 10 = 3x + 30'}</InlineMath></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg font-semibold">Step 2: Group the 'x' Team</p>
                <p className="text-sm md:text-base mb-2">Subtract <InlineMath>{'3x'}</InlineMath> from both sides.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base font-bold">
                  <InlineMath>{'2x + 10 = 30'}</InlineMath>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold">Step 3: Group the 'Number' Team</p>
                <p className="text-sm md:text-base mb-2">Subtract <InlineMath>{'10'}</InlineMath> from both sides.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base font-bold">
                  <InlineMath>{'2x = 20'}</InlineMath>
                </div>
              </div>
              
              <div>
                <p className="text-lg font-semibold">Step 4: Solve for 'x'</p>
                <p className="text-sm md:text-base mb-2">Divide both sides by <InlineMath>{'2'}</InlineMath>.</p>
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base font-bold text-xl">
                  <InlineMath>{'x = 10'}</InlineMath>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="parentheses-on-both-sides" 
            slideTitle="Parentheses and Variables on Both Sides" 
            moduleId="solving-equations-one-unknown" 
            submoduleId="equations-with-parentheses"
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