import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingSlopeInterceptSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'plotting-b', conceptId: 'plotting-b', conceptName: 'Step 1: Plotting the y-intercept', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Step 1: Plotting the y-intercept (b)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: How-To */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">'b' is where you Begin</h3>
            <p className="mb-4">The y-intercept (`b`) is always your starting point because it's the easiest to find and plot.</p>
            <div className="space-y-4">
                <p>Let's use the equation:</p>
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md text-center font-bold text-lg"><InlineMath>{'y = 2x + 3'}</InlineMath></div>
                <p><strong>Identify 'b':</strong> In this equation, <InlineMath>{'b = 3'}</InlineMath>.</p>
                <p><strong>Action:</strong> This tells us the line crosses the y-axis at 3. We plot our first point at the coordinates <InlineMath>{'(0, 3)'}</InlineMath>.</p>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Plotting the Point</h3>
             <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph of a coordinate plane. A large, highlighted dot is placed at (0, 3) on the y-axis.]</p>
            </div>
            <p className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-center">Our first point is locked in at <InlineMath>{'(0, 3)'}</InlineMath>. This is our anchor for the entire line.</p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="plotting-b" 
            slideTitle="Step 1: Plotting the y-intercept (b)" 
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