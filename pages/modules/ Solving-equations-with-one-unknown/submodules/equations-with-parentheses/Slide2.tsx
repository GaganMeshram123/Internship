import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept'; 
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

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

export default function SolvingWithParentheses() {
    const slideInteractions: Interaction[] = [{ id: 'solving-with-parens-concept', conceptId: 'solving-with-parentheses', conceptName: 'Solving with Parentheses', type: 'learning' }];

    const [localInteractions, setLocalInteractions] = useState(() => createInitialInteractions(slideInteractions));

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prevInteractions: Record<string, InteractionResponse>) => ({
            ...prevInteractions,
            [response.interactionId]: response,
        }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Introduction and Distributive Property Explanation */}
          <div className="space-y-6 flex flex-col">
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The New Puzzle 🧐</h3>
              <p className="mb-4">
                This equation has terms "locked" inside parentheses. Our first step is always to unlock them.
              </p>
              <div className="text-center bg-slate-100 dark:bg-slate-900 rounded-lg p-3">
                 <p className="font-mono text-2xl font-bold text-slate-800 dark:text-slate-200"><InlineMath>{'3(x + 5) = 21'}</InlineMath></p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The Key: The Distributive Property</h3>
              <p>
                This property unlocks parentheses. You multiply the number outside by EVERYTHING inside.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mt-4">
                <p className="font-semibold text-blue-800 dark:text-blue-300">Analogy: Sharing Pizza 🍕</p>
                <p>The number outside is delivering a pizza. It must be shared with everyone inside the house, not just the first person.</p>
                <p className="text-center text-lg font-mono mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded"><InlineMath>{'a(b + c) = ab + ac'}</InlineMath></p>
              </div>
            </div>
            
          </div>

          {/* Right Column: The Step-by-Step Solution */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Step-by-Step Solution ✨</h3>
            <div className="space-y-4 flex-grow flex flex-col justify-around">
              
              <div>
                <p className="text-lg font-semibold">Step 1: Distribute to Unlock!</p>
                <p className="text-sm md:text-base mb-2">Multiply <InlineMath>{'3'}</InlineMath> by both terms inside <InlineMath>{'(x + 5)'}</InlineMath>.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <p><InlineMath>{'3 \\cdot x = 3x'}</InlineMath></p>
                  <p><InlineMath>{'3 \\cdot 5 = 15'}</InlineMath></p>
                  <hr className="my-2 border-slate-300 dark:border-slate-600" />
                  <p className="font-semibold">New Equation: <InlineMath>{'3x + 15 = 21'}</InlineMath></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg font-semibold">Step 2: Isolate the Variable Term</p>
                <p className="text-sm md:text-base mb-2">To get <InlineMath>{'3x'}</InlineMath> alone, subtract <InlineMath>{'15'}</InlineMath> from both sides.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base font-bold">
                  <p><InlineMath>{'3x + 15 - 15 = 21 - 15'}</InlineMath></p>
                  <p className="mt-1"><InlineMath>{'3x = 6'}</InlineMath></p>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold">Step 3: Solve for 'x'.</p>
                <p className="text-sm md:text-base mb-2">Divide both sides by <InlineMath>{'3'}</InlineMath>.</p>
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base font-bold text-xl">
                  <p><InlineMath>{'\\frac{3x}{3} = \\frac{6}{3}'}</InlineMath></p>
                  <p className="mt-1"><InlineMath>{'x = 2'}</InlineMath></p>
                </div>
              </div>
              
              <div className="mt-auto"> {/* Use mt-auto to push to bottom */}
                 <h4 className="text-xl font-semibold text-center text-blue-700 dark:text-blue-400 mb-2">Check Your Answer ✅</h4>
                 <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-3 text-center font-semibold text-lg">
                    <p><InlineMath>{'3(2 + 5) = 21'}</InlineMath></p>
                    <p><InlineMath>{'3(7) = 21'}</InlineMath></p>
                    <p><InlineMath>{'21 = 21'}</InlineMath></p>
                    <p className="text-sm font-normal mt-1">It's correct!</p>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );

   return (
        <SlideComponentWrapper 
            slideId="solving-with-parentheses" 
            slideTitle="Solving Equations with Parentheses" 
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