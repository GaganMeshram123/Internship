import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ConstructingLinearModelsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'finding-b-from-problem', conceptId: 'finding-b-from-problem', conceptName: 'Finding the Initial Value (b)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Finding the Initial Value (b)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: What to look for */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Look for the "Starting" Word</h3>
            <p>The **y-intercept (b)** is the **starting amount** or a **one-time fee**. It's the value before the action (`m`) begins.</p>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-bold">Clue Words:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li>starting fee / amount</li>
                    <li>initial value</li>
                    <li>flat rate / one-time charge</li>
                </ul>
            </div>
          </div>

          {/* Right Column: Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Spotting the Intercept</h3>
            <div className="space-y-3">
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <p className="text-sm italic">"A gym membership costs **₹1000 to sign up**, then ₹500 per month."</p>
                    <p className="text-right font-bold"><InlineMath>{'b = 1000'}</InlineMath></p>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <p className="text-sm italic">"A plant is **15 cm tall** and grows 2 cm each week."</p>
                    <p className="text-right font-bold"><InlineMath>{'b = 15'}</InlineMath></p>
                </div>
                 <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <p className="text-sm italic">"Movie tickets are ₹200 each, plus a **one-time fee of ₹30**."</p>
                    <p className="text-right font-bold"><InlineMath>{'b = 30'}</InlineMath></p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-b-from-problem" 
            slideTitle="Finding the Initial Value (b)" 
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