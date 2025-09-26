import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function FunctionsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'function-notation', conceptId: 'function-notation', conceptName: 'Function Notation: f(x)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Function Notation: f(x)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Notation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">A New Way to Write 'y'</h3>
            <p>In algebra, we use **function notation** to be more specific. Instead of writing:</p>
            <p className="text-center text-xl p-3 bg-slate-100 dark:bg-slate-700 rounded-md"><InlineMath>{'y = 2x + 3'}</InlineMath></p>
            <p>We now write:</p>
            <p className="text-center text-xl p-3 bg-blue-100 dark:bg-blue-900/50 rounded-md font-bold"><InlineMath>{'f(x) = 2x + 3'}</InlineMath></p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
              <p><strong>How to read it:</strong> "<InlineMath>{'f(x)'}</InlineMath>" is read as "f of x".</p>
              <p className="mt-2 text-sm">Think of <InlineMath>{'f(x)'}</InlineMath> as just a fancier, more descriptive name for <InlineMath>{'y'}</InlineMath>. The '<InlineMath>{'f'}</InlineMath>' is the name of the function "machine", and the '<InlineMath>{'(x)'}</InlineMath>' tells us the input variable.</p>
            </div>
          </div>

          {/* Right Column: Evaluating */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">How to Use f(x) Notation</h3>
            <p className="italic">Problem: Given the function <InlineMath>{'f(x) = 5x - 4'}</InlineMath>, find the value of <InlineMath>{'f(3)'}</InlineMath>.</p>
            <div className="mt-4 space-y-3 flex-grow flex flex-col justify-center">
              <p><strong>Step 1:</strong> The notation <InlineMath>{'f(3)'}</InlineMath> means "find the output when the input is 3". We replace every <InlineMath>{'x'}</InlineMath> in the rule with the number 3.</p>
              <div className="p-3 text-lg text-center bg-slate-100 dark:bg-slate-700 rounded-md">
                <InlineMath>{'f(3) = 5(3) - 4'}</InlineMath>
              </div>
              <p><strong>Step 2:</strong> Simplify the expression.</p>
              <div className="p-3 text-lg text-center bg-slate-100 dark:bg-slate-700 rounded-md">
                <InlineMath>{'f(3) = 15 - 4'}</InlineMath>
              </div>
              <p><strong>Step 3:</strong> State the final answer.</p>
              <div className="p-3 text-lg text-center bg-green-100 dark:bg-green-900/50 rounded-md font-bold">
                <InlineMath>{'f(3) = 11'}</InlineMath>
              </div>
            </div>
             <p className="text-sm mt-4">This means when the input is 3, the output is 11. This corresponds to the point <InlineMath>{'(3, 11)'}</InlineMath> on a graph.</p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="function-notation" 
            slideTitle="Function Notation: f(x)" 
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