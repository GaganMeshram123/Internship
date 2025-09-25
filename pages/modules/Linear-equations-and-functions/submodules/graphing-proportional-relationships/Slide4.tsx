import React, { useState } from 'react';
import SlideComponentWrapper from '../../../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingProportionalSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'interpreting-the-graph', conceptId: 'interpreting-the-graph', conceptName: 'Interpreting the Graph', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Interpreting the Graph</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Understanding Points */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">What Does a Point on the Line Mean?</h3>
            <p>Every point <InlineMath>{'(x, y)'}</InlineMath> on the line is a solution to the equation. Let's look at an example where items cost $3 each (<InlineMath>{'y=3x'}</InlineMath>).</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                 <p className="text-slate-500">[Graph of y=3x, with the point (4, 12) clearly marked]</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-4">
               <p>The point <InlineMath>{'(4, 12)'}</InlineMath> on the line tells us a story:</p>
               <p className="mt-1 font-semibold">"If you buy 4 items (the x-value), the total cost will be $12 (the y-value)."</p>
            </div>
          </div>

          {/* Right Column: Finding the Unit Rate */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Finding the Unit Rate (k) from a Graph</h3>
            <p>The **unit rate** is the value of 'y' when 'x' is 1. This value is your constant of proportionality, <InlineMath>{'k'}</InlineMath>!</p>
             <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                 <p className="text-slate-500">[Same graph of y=3x, but with the point (1, 3) highlighted, and arrows showing the path from x=1 up to the line, then over to y=3]</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4">
                <h4 className="font-bold">How to find it:</h4>
                <ol className="list-decimal list-inside pl-2 text-sm mt-1">
                    <li>Find '1' on the x-axis.</li>
                    <li>Go straight up to the line.</li>
                    <li>The y-value at that point is your unit rate, <InlineMath>{'k'}</InlineMath>.</li>
                </ol>
                <p className="text-center font-bold mt-2">Here, the unit rate is 3. So, <InlineMath>{'k=3'}</InlineMath> and the equation is <InlineMath>{'y=3x'}</InlineMath>.</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="interpreting-the-graph" 
            slideTitle="Interpreting the Graph" 
            moduleId="linear-equations-and-functions" 
            submoduleId="graphing-proportional-relationships"
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