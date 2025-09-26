import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function InterceptsSlide2() {
    const slideInteractions: Interaction[] = [{ id: 'finding-from-graph', conceptId: 'finding-from-graph', conceptName: 'Finding Intercepts from a Graph', type: 'learning' }];
    
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        // FIX: Added a type annotation for the 'prev' parameter.
        setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
       {/*  <h2 className="text-3xl font-bold text-center mb-4">Finding Intercepts from a Graph</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-6">
            Good news! This is the easiest part. You don't need to calculate anything, you just need to look at the graph.
        </p> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Simple Method */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Simple Method</h3>
             <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 flex-grow flex flex-col justify-center space-y-6">
                <div>
                    <h4 className="font-semibold text-lg">1. Find the y-intercept</h4>
                    <p className="mt-1">
                        Look where the line crosses the tall <strong>y-axis</strong>. Write the full coordinate point.
                        <br/>
                        <span className="font-bold">The x-value will always be 0.</span>
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg">2. Find the x-intercept</h4>
                    <p className="mt-1">
                        Now, look where the line crosses the flat <strong>x-axis</strong>. Write the full coordinate point.
                        <br/>
                        <span className="font-bold">The y-value will always be 0.</span>
                    </p>
                </div>
            </div>
          </div>

          {/* Right Column: The Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Example Graph</h3>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-2 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph showing a line that passes through (0, 4) on the y-axis and (2, 0) on the x-axis]</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-2 text-center space-y-2">
                <div>
                    <p className="font-semibold">The line crosses the y-axis at 4.</p>
                    <p className="font-bold text-lg">y-intercept is <InlineMath>{'(0, 4)'}</InlineMath></p>
                </div>
                 <hr className="border-slate-300 dark:border-slate-600"/>
                <div>
                    <p className="font-semibold">The line crosses the x-axis at 2.</p>
                    <p className="font-bold text-lg">x-intercept is <InlineMath>{'(2, 0)'}</InlineMath></p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-from-graph" 
            slideTitle="Finding Intercepts from a Graph" 
            moduleId="linear-equations-and-functions" 
            submoduleId="intercepts"
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