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

export default function NumberOfSolutions() {
    const slideInteractions: Interaction[] = [{ id: 'number-of-solutions-concept', conceptId: 'number-of-solutions', conceptName: 'Number of Solutions to Equations', type: 'learning' }];
    
    const [localInteractions, setLocalInteractions] = useState(() => createInitialInteractions(slideInteractions));
    const [showTryIt, setShowTryIt] = useState(false);

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions((prevInteractions: Record<string, InteractionResponse>) => ({
            ...prevInteractions,
            [response.interactionId]: response,
        }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">
          How Many Answers? Exploring the Number of Solutions 🤔
        </h2> */}
        <p className="text-center max-w-3xl mx-auto mb-6">
          Most equations have one specific answer. But sometimes, they can have no solution or infinite solutions. Let's see how to spot them.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">


          {/* Left Column: One Solution & Real World Context */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Case 1: One Solution ✅ (The Normal Case)</h3>
            <p>This is what happens most of the time. After solving, you get a clear, single answer for the variable.</p>
            <p className="mt-2"><strong>How to Spot It:</strong> The variable terms don't disappear, and you end up with a statement like <InlineMath>{'x = \\text{number}'}</InlineMath>.</p>
           
           <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4">
               <p><strong>Example:</strong> <InlineMath>{'5x - 2 = 18'}</InlineMath></p>
               <p className="mt-1">Solving gives you <InlineMath>{'5x = 20'}</InlineMath>, which leads to the single solution <InlineMath>{'x = 4'}</InlineMath>.</p>
            </div>

             <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4">
               <p><strong>Example:</strong> <InlineMath>{'4(x + 1) = 2x + 10'}</InlineMath></p>
               <p className="mt-1">After distributing and moving terms... <InlineMath>{'2x = 6'}</InlineMath>, which leads to the single solution <InlineMath>{'x = 3'}</InlineMath>.</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mt-4">
                <p className="text-sm"><strong className="font-semibold">Where is this used?</strong> In fields like engineering, you often need to know if a problem has one unique, reliable answer.</p>
            </div>
          </div>
          
          {/* Right Column: Special Cases */}
          <div className="space-y-6 flex flex-col">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Case 2: No Solution ❌ (The Impossible Equation)</h3>
              <p>This happens when there is no number that can make the equation true. It's a contradiction.</p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-4">
                 <p><strong>Example:</strong> <InlineMath>{'3x + 7 = 3x + 1'}</InlineMath></p>
                 <p className="mt-1">The variables cancel, leaving the false statement <InlineMath>{'7 = 1'}</InlineMath>. This means there is no solution.</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Case 3: Infinite Solutions ✨ (The "Always True" Equation)</h3>
              <p>This means any number you can imagine for 'x' will make the equation true.</p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-4">
                 <p><strong>Example:</strong> <InlineMath>{'2(x + 3) = 2x + 6'}</InlineMath></p>
                 <p className="mt-1">The variables cancel, leaving the true statement <InlineMath>{'6 = 6'}</InlineMath>. This means there are infinite solutions.</p>
                 {!showTryIt && <button onClick={() => setShowTryIt(true)} className="text-xs bg-blue-500 text-white py-1 px-2 rounded-md mt-2 hover:bg-blue-600">Try it!</button>}
                 {showTryIt && <p className="text-xs italic mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded">If you test x=0, you get 6=6. If you test x=10, you get 26=26. It's always true!</p>}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border-2 border-blue-500 shadow-lg">
                <p className="font-bold text-center text-blue-600 dark:text-blue-400">Key Takeaway</p>
                <p className="text-xs text-center mt-1">When variables disappear, look at what's left:<br/><strong>False Statement?</strong> ➡️ No Solution<br/><strong>True Statement?</strong> ➡️ Infinite Solutions</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="number-of-solutions" 
            slideTitle="Number of Solutions to Equations" 
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