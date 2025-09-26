import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingSlopeInterceptSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'using-rise-over-run', conceptId: 'using-rise-over-run', conceptName: 'Step 2: Using Slope "Rise over Run"', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Step 2: Using the Slope (m)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: How-To */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">'m' is how you Move</h3>
            <p className="mb-4">With our starting point set, we use the slope (`m`) to find a second point.</p>
            <div className="space-y-3">
                <p>Continuing with <InlineMath>{'y = 2x + 3'}</InlineMath>.</p>
                <p><strong>Identify 'm':</strong> Here, <InlineMath>{'m = 2'}</InlineMath>. To use "Rise over Run", we write this as a fraction: <InlineMath>{'m = \\frac{2}{1}'}</InlineMath>.</p>
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <p><strong>Rise = 2</strong> (top number): From our point at (0, 3), we move **UP 2 units**.</p>
                    <p><strong>Run = 1</strong> (bottom number): From there, we move **RIGHT 1 unit**.</p>
                </div>
                <p><strong>New Point:</strong> This simple move lands us on our second point: <InlineMath>{'(1, 5)'}</InlineMath>.</p>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">Finding the Second Point</h3>
             <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph showing the point (0, 3). Dashed arrows illustrate moving UP 2 units, then RIGHT 1 unit, landing on a new point (1, 5).]</p>
            </div>
            <p className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-md text-center">Start at `b`, then Rise and Run. Now you have two points to connect!</p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="using-rise-over-run" 
            slideTitle="Step 2: Using Slope 'Rise over Run'" 
            moduleId="linear-equations-and-functions" 
            submoduleId="graphing-slope-intercept-form"
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