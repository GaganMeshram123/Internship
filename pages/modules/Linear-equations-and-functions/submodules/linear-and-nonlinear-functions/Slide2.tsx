import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';

export default function LinearAndNonlinearFunctionsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'linear-vs-nonlinear-graphs', conceptId: 'linear-vs-nonlinear-graphs', conceptName: 'Identifying from a Graph', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Identifying from a Graph</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">The easiest way to tell if a function is linear is by looking at its graph.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Linear Graph */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3 text-center">✅ Linear Function (Straight Line)</h3>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-2 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph showing a clear straight line]</p>
            </div>
            <p className="mt-4 p-3 bg-green-100 dark:bg-green-900/50 rounded-md text-center">
                If the graph forms a **perfectly straight line** (without any bends or curves), it is a linear function.
            </p>
          </div>

          {/* Right Column: Nonlinear Graph */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3 text-center">❌ Nonlinear Function (Not Straight)</h3>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-2 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph showing a curve, e.g., a parabola or exponential curve]</p>
            </div>
            <p className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-md text-center">
                If the graph has **any curve or bend**, it is a nonlinear function. Its rate of change is not constant.
            </p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="linear-vs-nonlinear-graphs" 
            slideTitle="Identifying from a Graph" 
            moduleId="linear-equations-and-functions" 
            submoduleId="linear-and-nonlinear-functions"
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