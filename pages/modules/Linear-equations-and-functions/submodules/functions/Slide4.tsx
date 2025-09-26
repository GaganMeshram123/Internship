import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';

export default function FunctionsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'vertical-line-test', conceptId: 'vertical-line-test', conceptName: 'The Vertical Line Test', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">The Vertical Line Test</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">A quick visual way to check if a graph is a function.</p>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 rounded-lg p-3 mb-6 text-center">
             <p className="font-bold">The Rule</p>
             <p className="text-sm">If you can draw a vertical line anywhere on a graph and it only crosses the graph **ONCE**, then it IS a function.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Passes */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">✅ Passes the Test (IS a function)</h3>
            <p className="text-sm">No matter where you draw a vertical line, it will only ever touch the graphed line at one single point.</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph of a straight line or a parabola. A vertical line is shown crossing it only once.]</p>
            </div>
          </div>

          {/* Right Column: Fails */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">❌ Fails the Test (NOT a function)</h3>
            <p className="text-sm">Here, a vertical line can be drawn that crosses the graph in **two places**. This means one input (x) has two different outputs (y).</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph of a circle or a sideways 'C' shape. A vertical line is shown crossing it in two spots.]</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="vertical-line-test" 
            slideTitle="The Vertical Line Test" 
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