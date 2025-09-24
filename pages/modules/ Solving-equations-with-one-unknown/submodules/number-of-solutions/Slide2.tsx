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

export default function WorkedExampleNumberOfSolutions() {
    const slideInteractions: Interaction[] = [{ id: 'worked-example-solutions-concept', conceptId: 'worked-example-solutions', conceptName: 'Worked Example: Number of Solutions', type: 'learning' }];

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
          Worked Examples: One, None, or Infinite?
        </h2>
        <p className="text-center max-w-3xl mx-auto mb-6">
          Let's practice by solving three different equations. For each one, we'll follow the steps and see what kind of answer we get.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: One Solution */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Example #1: One Solution ✅</h3>
            <p className="font-mono text-center text-lg p-2 bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'3(x + 2) = x + 10'}</InlineMath></p>
            <ol className="list-decimal list-inside space-y-2 mt-4 text-sm flex-grow">
              <li><strong>Distribute:</strong> <InlineMath>{'3x + 6 = x + 10'}</InlineMath></li>
              <li><strong>Group variables:</strong> <InlineMath>{'2x + 6 = 10'}</InlineMath></li>
              <li><strong>Group numbers:</strong> <InlineMath>{'2x = 4'}</InlineMath></li>
              <li><strong>Solve:</strong> <InlineMath>{'x = 2'}</InlineMath></li>
            </ol>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4 text-center">
              <p className="font-semibold">Verdict: One Solution</p>
            </div>
          </div>
          
          {/* Right Column: Special Cases */}
          <div className="space-y-6 flex flex-col">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Example #2: No Solution ❌</h3>
              <p className="font-mono text-center text-lg p-2 bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'4x - 5 = 2(2x - 1)'}</InlineMath></p>
              <ol className="list-decimal list-inside space-y-2 mt-4 text-sm flex-grow">
                <li><strong>Distribute:</strong> <InlineMath>{'4x - 5 = 4x - 2'}</InlineMath></li>
                <li><strong>Group variables:</strong> <InlineMath>{'-5 = -2'}</InlineMath></li>
              </ol>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4 text-center">
                <p className="font-semibold">Verdict: No Solution</p>
                <p className="text-xs">This is a false statement.</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Example #3: Infinite Solutions ✨</h3>
              <p className="font-mono text-center text-lg p-2 bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'6(x + 1) - 2 = 6x + 4'}</InlineMath></p>
              <ol className="list-decimal list-inside space-y-2 mt-4 text-sm flex-grow">
                <li><strong>Distribute:</strong> <InlineMath>{'6x + 6 - 2 = 6x + 4'}</InlineMath></li>
                <li><strong>Simplify left side:</strong> <InlineMath>{'6x + 4 = 6x + 4'}</InlineMath></li>
                <li><strong>Group variables:</strong> <InlineMath>{'4 = 4'}</InlineMath></li>
              </ol>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4 text-center">
                <p className="font-semibold">Verdict: Infinite Solutions</p>
                <p className="text-xs">This is a true statement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="worked-example-solutions" 
            slideTitle="Worked Example: Number of Solutions" 
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