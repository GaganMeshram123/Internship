import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SolutionsToLinearEquationsSlide3() {
    const slideInteractions: Interaction[] = [{ id: 'worked-example-finding-solution', conceptId: 'finding-a-solution', conceptName: 'Worked Example: Finding a Solution', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        {/* <h2 className="text-3xl font-bold text-center mb-6">Worked Example: Finding a Solution</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Method */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Our Main Equation</h3>
            <p>Let's find a solution for the equation <InlineMath>{'y = 2x - 3'}</InlineMath>.</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-4 flex-grow">
                <h4 className="font-semibold">The 4-Step Process:</h4>
                <ol className="list-decimal list-inside space-y-3 mt-2">
                    <li><strong>Choose any value for 'x'.</strong> You have the power! Let's pick a positive number.</li>
                    <li><strong>Substitute</strong> your chosen 'x' value into the equation.</li>
                    <li><strong>Solve</strong> the equation to find the matching 'y' value.</li>
                    <li><strong>Write your answer</strong> as an ordered pair <InlineMath>{'(x, y)'}</InlineMath>.</li>
                </ol>
            </div>
          </div>

          {/* Right Column: The Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Let's Find a Solution! 💡</h3>
             <div className="space-y-4 flex-grow flex flex-col justify-around">
                <div>
                    <h4 className="text-lg font-semibold">Step 1: Choose 'x'</h4>
                    <p>Let's pick a positive value, <InlineMath>{'x = 3'}</InlineMath>.</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Step 2: Substitute</h4>
                    <p>Replace 'x' with 3 in the equation <InlineMath>{'y = 2x - 3'}</InlineMath>.</p>
                     <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'y = 2(3) - 3'}</InlineMath></div>
                </div>
                 <div>
                    <h4 className="text-lg font-semibold">Step 3: Solve for 'y'</h4>
                     <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold">
                         <p><InlineMath>{'y = 6 - 3'}</InlineMath></p>
                         <p><InlineMath>{'y = 3'}</InlineMath></p>
                    </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 text-center">
                    <h4 className="font-bold">Step 4: Write the Solution</h4>
                    <p>When <InlineMath>{'x=3'}</InlineMath>, <InlineMath>{'y=3'}</InlineMath>. The solution is the point <strong className="text-xl">(3, 3)</strong>.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="worked-example-finding-solution" 
            slideTitle="Worked Example: Finding a Solution" 
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