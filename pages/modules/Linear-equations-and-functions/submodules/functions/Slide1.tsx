import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function FunctionsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'what-is-a-function', conceptId: 'what-is-a-function', conceptName: 'What is a Function?', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">What is a Function?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Function Machine */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Function Machine ⚙️</h3>
            <p>Think of a function as a special machine. It takes an **input**, applies a specific **rule**, and produces an **output**.</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-4 rounded-lg flex flex-col items-center justify-center p-4 border border-slate-300 dark:border-slate-600 text-center">
                <div className="font-bold text-lg">INPUT: <InlineMath>{'x'}</InlineMath></div>
                <div className="text-4xl my-4">⬇️</div>
                <div className="p-3 bg-blue-200 dark:bg-blue-800 rounded-md">RULE: Add 5</div>
                <div className="text-4xl my-4">⬇️</div>
                <div className="font-bold text-lg">OUTPUT: <InlineMath>{'x + 5'}</InlineMath></div>
            </div>
            <p className="text-sm">If you put in a 3, you get out an 8. If you put in a 10, you get out a 15.</p>
          </div>

          {/* Right Column: The Main Rule */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Most Important Rule</h3>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 rounded-lg p-4">
                <p className="font-bold">For any relationship to be a function, every input must have EXACTLY ONE output.</p>
            </div>
            <div>
                <h4 className="font-semibold text-green-600 dark:text-green-400">✅ This IS a function:</h4>
                <p className="text-sm mt-1"><strong>Cost of Movie Tickets:</strong> The input is the number of tickets. The output is the total cost. If you buy 3 tickets (one input), there is only one possible total cost (one output).</p>
            </div>
             <div>
                <h4 className="font-semibold text-red-600 dark:text-red-400">❌ This is NOT a function:</h4>
                <p className="text-sm mt-1"><strong>People's Phone Numbers:</strong> The input is a person's name. The output is their phone number. One person (one input) might have two different phone numbers (multiple outputs).</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-is-a-function" 
            slideTitle="What is a Function?" 
            moduleId="linear-equations-and-functions" 
            submoduleId="functions"
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