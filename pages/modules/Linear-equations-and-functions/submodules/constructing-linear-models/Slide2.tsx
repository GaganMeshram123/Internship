import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ConstructingLinearModelsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'identifying-variables', conceptId: 'identifying-variables', conceptName: 'Identifying Variables (x and y)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Identifying Variables (x and y)</h2>
        <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg mb-6">
            <p className="font-bold text-center">Scenario: "A water tank starts with 50 litres and is filled at a rate of 10 litres per minute."</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Dependent Variable (y) */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">What are we trying to find? (The 'y')</h3>
            <p>The **dependent variable (y)** is the final result or total amount that you want to calculate.</p>
            <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <strong>Ask yourself:</strong> "What is the main outcome?"
            </div>
            <p className="mt-auto p-4 bg-green-100 dark:bg-green-900/50 rounded-md">
                In our scenario, the main outcome is the **Total Water** in the tank.
                <br/>So, <InlineMath>{'y = \\text{Total Water}'}</InlineMath>.
            </p>
          </div>

          {/* Right Column: Independent Variable (x) */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">What does it depend on? (The 'x')</h3>
            <p>The **independent variable (x)** is the factor that changes, which causes the final result to change.</p>
            <div className="my-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <strong>Ask yourself:</strong> "What is the changing factor?"
            </div>
            <p className="mt-auto p-4 bg-green-100 dark:bg-green-900/50 rounded-md">
                The total water depends on the **number of minutes** the tap is open.
                <br/>So, <InlineMath>{'x = \\text{Time in minutes}'}</InlineMath>.
            </p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="identifying-variables" 
            slideTitle="Identifying Variables (x and y)" 
            moduleId="linear-equations-and-functions" 
            submoduleId="constructing-linear-models"
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