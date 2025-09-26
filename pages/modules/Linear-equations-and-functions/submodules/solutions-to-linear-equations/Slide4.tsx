import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function CompletingSolutionsSlide() {
    const slideInteractions: Interaction[] = [{ id: 'completing-a-solution', conceptId: 'completing-a-solution', conceptName: 'Completing a Solution', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        {/* <h2 className="text-3xl font-bold text-center mb-6">Completing the Pair: Finding the Missing Piece</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Given the x-value */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Scenario 1: Given the x-value</h3>
            <p className="italic mb-4">Problem: Complete the solution <InlineMath>{'(3, ?)'}</InlineMath> for the equation <InlineMath>{'y = 5x - 8'}</InlineMath>.</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 flex-grow">
                <h4 className="font-semibold">Step-by-Step Solution:</h4>
                <ol className="list-decimal list-inside space-y-3 mt-2">
                    <li><strong>Identify the Given:</strong> The pair <InlineMath>{'(3, ?)'}</InlineMath> tells us we know <InlineMath>{'x=3'}</InlineMath>.</li>
                    <li><strong>Substitute:</strong> Put '3' into the equation where 'x' is.
                        <div className="p-1 my-1 text-center bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'y = 5(3) - 8'}</InlineMath></div>
                    </li>
                    <li><strong>Solve for 'y':</strong> Do the calculation.
                        <div className="p-1 my-1 text-center bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'y = 15 - 8 \implies y = 7'}</InlineMath></div>
                    </li>
                    <li><strong>Complete the Pair:</strong> The missing value is 7. The full solution is <strong className="text-lg">(3, 7)</strong>.</li>
                </ol>
            </div>
          </div>

          {/* Right Column: Given the y-value */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Scenario 2: Given the y-value</h3>
            <p className="italic mb-4">Problem: Complete the solution <InlineMath>{'(?, 11)'}</InlineMath> for the equation <InlineMath>{'y = 5x - 8'}</InlineMath>.</p>
            <div className="space-y-4 flex-grow flex flex-col justify-around">
                <div>
                    <h4 className="text-lg font-semibold">Step 1: Substitute</h4>
                    <p>We know <InlineMath>{'y=11'}</InlineMath>. Put '11' into the equation where 'y' is.</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'11 = 5x - 8'}</InlineMath></div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Step 2: Solve for 'x'</h4>
                    <p>Use algebra to get 'x' by itself.</p>
                     <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold">
                         <p><InlineMath>{'11 + 8 = 5x'}</InlineMath></p>
                         <p><InlineMath>{'19 = 5x'}</InlineMath></p>
                         <p><InlineMath>{'\\frac{19}{5} = x'}</InlineMath></p>
                    </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 text-center">
                    <h4 className="font-bold">The Complete Solution</h4>
                    <p>The missing value is <InlineMath>{'\\frac{19}{5}'}</InlineMath>. The full solution is <strong className="text-lg">(<InlineMath>{'\\frac{19}{5}, 11'}</InlineMath>)</strong>.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="completing-a-solution" 
            slideTitle="Completing a Solution" 
            moduleId="linear-equations-and-functions" 
            submoduleId="solutions-to-linear-equations"
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