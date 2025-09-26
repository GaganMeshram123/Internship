import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingSlopeInterceptSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'graphing-two-steps', conceptId: 'graphing-two-steps', conceptName: 'The Two-Step Graphing Method', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Graphing Without a Table!</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">A powerful shortcut to graph any linear equation in slope-intercept form.</p>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex-grow flex flex-col justify-center">
          <div className="space-y-6">
            
            {/* Step 1 */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Step 1: 'b' is where you Begin</h3>
              <p className="mt-2">First, find the **y-intercept (b)** in your equation. This is your starting point. Plot this point on the vertical y-axis at <InlineMath>{'(0, b)'}</InlineMath>.</p>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">Step 2: 'm' is how you Move</h3>
              <p className="mt-2">Next, find the **slope (m)**. From your starting point 'b', use the slope as "Rise over Run" to find a second point on the line.</p>
            </div>

            {/* Step 3 */}
             <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <h3 className="text-xl font-semibold">Step 3: Connect the Dots</h3>
              <p className="mt-2">Finally, draw a straight line that passes through the two points you've plotted. Extend the line across your graph, and you're done!</p>
            </div>

          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="graphing-two-steps" 
            slideTitle="The Two-Step Graphing Method" 
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