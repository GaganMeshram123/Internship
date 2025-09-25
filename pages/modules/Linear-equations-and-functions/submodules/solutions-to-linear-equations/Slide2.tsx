import React, { useState } from 'react';
import SlideComponentWrapper from '../../../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SolutionsToLinearEquationsSlide2() {
    const slideInteractions: Interaction[] = [{ id: 'verifying-a-solution', conceptId: 'verifying-a-solution', conceptName: 'Verifying a Solution', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Verifying a Solution</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Method */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">How to Check a Solution</h3>
            <p className="italic mb-4">Question: Is the point <InlineMath>{'(3, 10)'}</InlineMath> a solution to the equation <InlineMath>{'y = 2x + 4'}</InlineMath>?</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 flex-grow">
                <h4 className="font-semibold">The 3-Step Process:</h4>
                <ol className="list-decimal list-inside space-y-3 mt-2">
                    <li><strong>Identify</strong> the x and y values from the point. Here, <InlineMath>{'x=3'}</InlineMath> and <InlineMath>{'y=10'}</InlineMath>.</li>
                    <li><strong>Substitute</strong> these values into the equation where you see 'x' and 'y'.</li>
                    <li><strong>Simplify</strong> the equation. If you get a true statement (like 10=10), it's a solution! If it's false (like 5=6), it's not.</li>
                </ol>
            </div>
          </div>

          {/* Right Column: The Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Let's Check It! 🔬</h3>
            <div className="space-y-4 flex-grow flex flex-col justify-around">
                <div>
                    <h4 className="text-lg font-semibold">Step 1 & 2: Substitute</h4>
                    <p>Replace 'y' with 10 and 'x' with 3 in the equation <InlineMath>{'y = 2x + 4'}</InlineMath>.</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'(10) = 2(3) + 4'}</InlineMath></div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Step 3: Simplify</h4>
                    <p>Do the math on the right side of the equation.</p>
                     <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold">
                        <p><InlineMath>{'10 = 6 + 4'}</InlineMath></p>
                        <p><InlineMath>{'10 = 10'}</InlineMath></p>
                    </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 text-center">
                    <h4 className="font-bold">The Verdict</h4>
                    <p>Since we got a **true statement**, the point <InlineMath>{'(3, 10)'}</InlineMath> **is a solution**!</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="verifying-a-solution" 
            slideTitle="Verifying a Solution" 
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