import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function EquationsWithParentheses() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideInteractions: Interaction[] = [{ id: 'equations-with-parentheses-concept', conceptId: 'equations-with-parentheses', conceptName: 'Equations with Parentheses', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6 md:mb-8">
          Unlocking Equations: Dealing with Parentheses 🔑
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Setup & Strategy */}
          <div className="space-y-6 flex flex-col">
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The New Puzzle 🧐</h3>
              <p className="mb-4">
                This equation has terms "locked" inside parentheses. Our first step is always to unlock them.
              </p>
              <div className="text-center bg-slate-100 dark:bg-slate-900 rounded-lg p-3">
                 <p className="font-mono text-2xl font-bold text-slate-800 dark:text-slate-200"><InlineMath>{'4(x - 2) = 2(x + 6)'}</InlineMath></p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-3">The Key: The Distributive Property</h3>
              <p>
                This property unlocks parentheses. You **multiply the number outside** by **EVERYTHING inside**.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mt-4">
                <p className="font-semibold text-blue-800 dark:text-blue-300">Analogy: Sharing Pizza 🍕</p>
                <p>The number outside is delivering a pizza. It must be shared with **everyone** inside the house, not just the first person.</p>
                <p className="text-center text-lg font-mono mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded"><InlineMath>{'a(b + c) = ab + ac'}</InlineMath></p>
              </div>
            </div>
            
          </div>

          {/* Right Column: The Step-by-Step Solution */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Step-by-Step Solution ✨</h3>
            <div className="space-y-3 flex-grow flex flex-col justify-around">
              
              <div>
                <p className="text-lg font-semibold">Step 1: Distribute to Unlock!</p>
                <p className="text-sm md:text-base mb-2">Apply the distributive property to BOTH sides.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base">
                  <p><strong>Left side:</strong> <InlineMath>{'4 \\cdot x'}</InlineMath> and <InlineMath>{'4 \\cdot (-2)'}</InlineMath> becomes <InlineMath>{'4x - 8'}</InlineMath>.</p>
                  <p><strong>Right side:</strong> <InlineMath>{'2 \\cdot x'}</InlineMath> and <InlineMath>{'2 \\cdot 6'}</InlineMath> becomes <InlineMath>{'2x + 12'}</InlineMath>.</p>
                  <p className="font-semibold mt-2">New Equation: <InlineMath>{'4x - 8 = 2x + 12'}</InlineMath></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg font-semibold">Step 2: Group the 'x' Team.</p>
                <p className="text-sm md:text-base mb-2">Subtract <InlineMath>{'2x'}</InlineMath> from both sides.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base font-bold">
                  <InlineMath>{'2x - 8 = 12'}</InlineMath>
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold">Step 3: Group the 'Number' Team.</p>
                <p className="text-sm md:text-base mb-2">Add <InlineMath>{'8'}</InlineMath> to both sides.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-4 py-3 shadow-sm text-sm md:text-base font-bold">
                  <InlineMath>{'2x = 20'}</InlineMath>
                </div>
              </div>
              
              <div>
                <p className="text-lg font-semibold">Step 4: Solve for 'x'.</p>
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
            slideId="equations-with-parentheses" 
            slideTitle="Equations with Parentheses" 
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