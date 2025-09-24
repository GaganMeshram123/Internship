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

export default function CommonMistakesPractice() {
    const slideInteractions: Interaction[] = [{ id: 'common-mistakes-parens', conceptId: 'common-mistakes-parentheses', conceptName: 'Common Mistakes with Parentheses', type: 'learning' }];

    const [localInteractions, setLocalInteractions] = useState(() => createInitialInteractions(slideInteractions));
    const [showAnswer, setShowAnswer] = useState(false);

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prevInteractions: Record<string, InteractionResponse>) => ({
            ...prevInteractions,
            [response.interactionId]: response,
        }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6 md:mb-8">
          Watch Out! Common Mistakes & Practice Time 🧐
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Common Mistakes */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">Avoid These Common Traps! 🚧</h3>
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 dark:border-red-600 rounded-lg p-4 shadow-sm">
                <h4 className="font-bold">The Distribution Dud ❌</h4>
                <p>Forgetting to multiply the outside number by **every** term inside.</p>
                <p className="mt-1 text-sm"><strong>Wrong:</strong> <InlineMath>{'3(x + 5) \\rightarrow 3x + 5'}</InlineMath></p>
                <p className="text-sm"><strong>Correct:</strong> <InlineMath>{'3(x + 5) \\rightarrow 3x + 15'}</InlineMath></p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 dark:border-red-600 rounded-lg p-4 shadow-sm">
                <h4 className="font-bold">Sneaky Sign Errors ➖</h4>
                <p>Getting mixed up with negatives, especially when distributing a negative number.</p>
                <p className="mt-1 text-sm"><strong>Example:</strong> <InlineMath>{'-2(x + 1)'}</InlineMath> becomes <InlineMath>{'-2x - 2'}</InlineMath>, not <InlineMath>{'-2x + 1'}</InlineMath>.</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 dark:border-red-600 rounded-lg p-4 shadow-sm">
                <h4 className="font-bold">The Unbalanced Scale ⚖️</h4>
                <p>Doing an operation on one side of the equation but forgetting to do the exact same thing on the other side.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Practice Problem */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">The Final Challenge 🏆</h3>
            <p>This problem uses everything we've learned. Follow the game plan and you can solve it!</p>
            <div className="text-center bg-slate-100 dark:bg-slate-900 rounded-lg p-3 my-4">
               <p className="font-mono text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200"><InlineMath>{'3(x - 4) = -2(x + 1) + 13'}</InlineMath></p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 shadow-sm mb-4">
                <h4 className="font-bold">Remember the Game Plan:</h4>
                <ol className="list-decimal list-inside text-sm mt-1">
                    <li><strong>Distribute</strong> to remove parentheses.</li>
                    <li><strong>Group</strong> the variable ('x') terms.</li>
                    <li><strong>Group</strong> the number terms.</li>
                    <li><strong>Solve</strong> for 'x'.</li>
                </ol>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 shadow-sm text-center mt-auto">
                <h4 className="font-bold">Ready to check your answer?</h4>
                {!showAnswer && (
                    <button 
                        onClick={() => setShowAnswer(true)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Show Answer
                    </button>
                )}
                {showAnswer && (
                    <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded">
                        <p className="font-bold text-xl"><InlineMath>{'x = 5'}</InlineMath></p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="common-mistakes-parentheses" 
            slideTitle="Common Mistakes and Practice" 
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