import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function WritingSlopeInterceptSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'finding-b-from-graph', conceptId: 'finding-b-from-graph', conceptName: 'Finding the y-intercept from a Graph', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Step 1: Finding the y-intercept (b)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: How-To */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Find 'b' (The Starting Point)</h3>
            <p className="mb-4">The y-intercept is the easiest value to find on a graph. Just look at the vertical y-axis.</p>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p>Find the exact spot where the graphed line **intersects (crosses)** the y-axis.</p>
                <p className="mt-2">The y-coordinate of that point is your <InlineMath>{'b'}</InlineMath> value.</p>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Spotting the Intercept</h3>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph of a coordinate plane with a line clearly crossing the y-axis at +2. This point (0, 2) is circled.]</p>
            </div>
            <p className="mt-4 p-3 bg-green-100 dark:bg-green-900/50 rounded-md text-center">
                The line crosses the y-axis at 2. Therefore, our y-intercept <InlineMath>{'b = 2'}</InlineMath>. We have the first part of our equation!
            </p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-b-from-graph" 
            slideTitle="Step 1: Finding the y-intercept from a Graph" 
            moduleId="linear-equations-and-functions" 
            submoduleId="writing-slope-intercept-equations"
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