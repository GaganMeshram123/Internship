import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';

export default function RecognizingFunctionsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'the-function-rule-recap', conceptId: 'the-function-rule-recap', conceptName: 'The Core Rule of a Function', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">The One Rule to Remember</h2>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow flex flex-col justify-center">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 rounded-lg text-center">
                <p className="text-xl md:text-2xl font-bold">For a relationship to be a **function**, every **input** must have **exactly one output**.</p>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Analogy: The Vending Machine</h3>
                <p className="mt-2">Think of a vending machine at a bus stand in Brahmapuri.</p>
                <ul className="list-disc pl-5 mt-3 space-y-2 text-sm">
                    <li><strong>Input:</strong> You press a button code (e.g., "B4").</li>
                    <li><strong>Output:</strong> You get a product (e.g., a packet of Parle-G biscuits).</li>
                    <li><strong>Why it's a function:</strong> When you press "B4", you ONLY get Parle-G. You never get biscuits AND a cold drink at the same time. One input leads to exactly one output.</li>
                    <li><strong>What would break the rule:</strong> If pressing "B4" sometimes gave you biscuits and other times gave you chips, the machine would be "broken". It would **not** be a function.</li>
                </ul>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="the-function-rule-recap" 
            slideTitle="The Core Rule of a Function" 
            moduleId="linear-equations-and-functions" 
            submoduleId="recognizing-functions"
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