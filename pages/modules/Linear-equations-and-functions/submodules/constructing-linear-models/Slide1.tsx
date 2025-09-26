import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ConstructingLinearModelsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'words-to-equations', conceptId: 'words-to-equations', conceptName: 'From Words to Equations', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Turning Stories into Equations</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">The skill is to read a story and pull out the mathematical pieces to build <InlineMath>{'y = mx + b'}</InlineMath>.</p>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow flex flex-col justify-center">
            
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">The Scenario</h3>
                <p className="mt-1">"A mobile phone repair shop in Brahmapuri charges a fixed service fee for inspection, plus an hourly rate for the actual repair work."</p>
            </div>
            
            <div className="text-3xl text-center my-4 font-bold text-blue-400">⬇️</div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 text-center">The Math Pieces</h3>
                <ul className="list-disc pl-5 mt-2 text-sm">
                    <li><strong>Rate of Change (m):</strong> The value that repeats. ➡️ The hourly rate.</li>
                    <li><strong>Initial Value (b):</strong> The one-time, starting amount. ➡️ The fixed service fee.</li>
                    <li><strong>Independent Variable (x):</strong> What the cost depends on. ➡️ The number of hours.</li>
                    <li><strong>Dependent Variable (y):</strong> The final outcome we want. ➡️ The total cost.</li>
                </ul>
            </div>
            
            <div className="text-3xl text-center my-4 font-bold text-green-500">⬇️</div>

            <div className="p-4 bg-green-100 dark:bg-green-900/50 rounded-lg text-center">
                 <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">The Final Equation</h3>
                <p className="font-mono text-xl mt-1">Total Cost = (Hourly Rate × Hours) + Service Fee</p>
                <p className="font-mono text-xl mt-1"><InlineMath>{'y = mx + b'}</InlineMath></p>
            </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="words-to-equations" 
            slideTitle="From Words to Equations" 
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