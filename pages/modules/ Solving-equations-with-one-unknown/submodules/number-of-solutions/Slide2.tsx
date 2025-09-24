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

export default function WorkedExampleNumberOfSolutions() {
    const slideInteractions: Interaction[] = [{ id: 'worked-example-solutions-concept', conceptId: 'worked-example-solutions', conceptName: 'Worked Example: Number of Solutions', type: 'learning' }];

    const [localInteractions, setLocalInteractions] = useState(() => createInitialInteractions(slideInteractions));
    const [showChallengeSolution, setShowChallengeSolution] = useState(false);

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prevInteractions: Record<string, InteractionResponse>) => ({
            ...prevInteractions,
            [response.interactionId]: response,
        }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Example #1 and #2 */}
          <div className="space-y-6 flex flex-col">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Example #1: One Solution ✅</h3>
              <p className="font-mono text-center text-lg p-2 bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'3(x + 2) = x + 10'}</InlineMath></p>
              <ol className="list-decimal list-inside space-y-2 mt-4 text-sm">
                <li><strong>Distribute:</strong> <InlineMath>{'3x + 6 = x + 10'}</InlineMath></li>
                <li><strong>Group variables:</strong> <InlineMath>{'2x + 6 = 10'}</InlineMath></li>
                <li><strong>Group numbers:</strong> <InlineMath>{'2x = 4'}</InlineMath></li>
                <li><strong>Solve:</strong> <InlineMath>{'x = 2'}</InlineMath></li>
              </ol>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4 text-center">
                <p className="font-semibold">Verdict: One Solution</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Example #2: No Solution ❌</h3>
              <p className="font-mono text-center text-lg p-2 bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'4x - 5 = 2(2x - 1)'}</InlineMath></p>
              <ol className="list-decimal list-inside space-y-2 mt-4 text-sm">
                <li><strong>Distribute:</strong> <InlineMath>{'4x - 5 = 4x - 2'}</InlineMath></li>
                <li><strong>Group variables:</strong> <InlineMath>{'-5 = -2'}</InlineMath></li>
              </ol>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4 text-center">
                <p className="font-semibold">Verdict: No Solution</p>
                <p className="text-xs">This is a false statement.</p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Example #3, Summary, and Challenge */}
          <div className="space-y-6 flex flex-col">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Example #3: Infinite Solutions ✨</h3>
              <p className="font-mono text-center text-lg p-2 bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'6(x + 1) - 2 = 6x + 4'}</InlineMath></p>
              <ol className="list-decimal list-inside space-y-2 mt-4 text-sm">
                <li><strong>Distribute:</strong> <InlineMath>{'6x + 6 - 2 = 6x + 4'}</InlineMath></li>
                <li><strong>Simplify left side:</strong> <InlineMath>{'6x + 4 = 6x + 4'}</InlineMath></li>
                <li><strong>Group variables:</strong> <InlineMath>{'4 = 4'}</InlineMath></li>
              </ol>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4 text-center">
                <p className="font-semibold">Verdict: Infinite Solutions</p>
                <p className="text-xs">This is a true statement.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border-2 border-blue-500 shadow-lg">
                <p className="font-bold text-center text-blue-600 dark:text-blue-400">The Deciding Factor</p>
                <p className="text-sm text-center mt-2">When variables disappear, look at what's left:</p>
                <ul className="text-sm text-center mt-2 space-y-1">
                    <li><strong>A FALSE statement?</strong> ➡️ No Solution</li>
                    <li><strong>A TRUE statement?</strong> ➡️ Infinite Solutions</li>
                </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Your Turn! 🧠</h3>
                <p className="font-mono text-center text-lg p-2 bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'8x - 2(4x + 1) = -2'}</InlineMath></p>
                {!showChallengeSolution && <button onClick={() => setShowChallengeSolution(true)} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">Reveal Solution</button>}
                {showChallengeSolution && (
                    <div className="mt-4 text-sm">
                        <ol className="list-decimal list-inside space-y-2">
                            <li><strong>Distribute:</strong> <InlineMath>{'8x - 8x - 2 = -2'}</InlineMath></li>
                            <li><strong>Combine variables:</strong> <InlineMath>{'-2 = -2'}</InlineMath></li>
                        </ol>
                        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-2 text-center">
                            <p className="font-semibold">Verdict: Infinite Solutions</p>
                        </div>
                    </div>
                )}
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