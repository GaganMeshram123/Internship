import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ConstructingLinearModelsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'finding-m-from-problem', conceptId: 'finding-m-from-problem', conceptName: 'Finding the Rate of Change (m)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Finding the Rate of Change (m)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: What to look for */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Look for the "Action" Word</h3>
            <p>The **slope (m)** is the value that happens repeatedly. It's the rate of change.</p>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-bold">Clue Words:</p>
                <div className="grid grid-cols-2 gap-x-4 mt-2">
                  <ul className="list-disc pl-5"><li>per</li><li>each</li></ul>
                  <ul className="list-disc pl-5"><li>every</li><li>for</li></ul>
                </div>
            </div>
          </div>

          {/* Right Column: Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Spotting the Slope</h3>
            <div className="space-y-3">
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <p className="text-sm italic">"A car rental company charges ₹500 plus **₹8 per kilometer**."</p>
                    <p className="text-right font-bold"><InlineMath>{'m = 8'}</InlineMath></p>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <p className="text-sm italic">"Rohan reads **20 pages every hour**."</p>
                    <p className="text-right font-bold"><InlineMath>{'m = 20'}</InlineMath></p>
                </div>
                 <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <p className="text-sm italic">"A phone's battery **loses 2% for each video** watched."</p>
                    <p className="text-right font-bold"><InlineMath>{'m = -2'}</InlineMath> (it's decreasing!)</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-m-from-problem" 
            slideTitle="Finding the Rate of Change (m)" 
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