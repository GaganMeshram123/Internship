import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function WritingSlopeInterceptSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'equation-from-graph', conceptId: 'equation-from-graph', conceptName: 'Writing an Equation from a Graph', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Writing an Equation from a Graph</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Goal */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">From Picture to Formula</h3>
            <p>So far, we've turned an equation into a graph. Now, let's do the reverse! If you have a picture of a line, you can find its unique equation.</p>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-grow flex flex-col justify-center">
                <p className="font-bold text-center">To write the equation <InlineMath>{'y = mx + b'}</InlineMath>, we need to find two things from the graph:</p>
                <div className="mt-4 text-center space-y-2 text-lg">
                    <p className="p-2 bg-green-100 dark:bg-green-900/50 rounded-md">✅ The y-intercept (<InlineMath>{'b'}</InlineMath>)</p>
                    <p className="p-2 bg-green-100 dark:bg-green-900/50 rounded-md">✅ The slope (<InlineMath>{'m'}</InlineMath>)</p>
                </div>
            </div>
          </div>

          {/* Right Column: The Process */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Our Two-Step Mission</h3>
            <div className="space-y-4">
                <div className="p-3 border-l-4 border-blue-400">
                    <h4 className="font-semibold">Step 1: Find 'b' (The Beginning)</h4>
                    <p className="text-sm">Look at the y-axis and find the exact point where the line crosses it. This is your <InlineMath>{'b'}</InlineMath>.</p>
                </div>
                <div className="p-3 border-l-4 border-blue-400">
                    <h4 className="font-semibold">Step 2: Find 'm' (The Movement)</h4>
                    <p className="text-sm">Pick two clear points on the line and use "Rise over Run" to calculate the slope. This is your <InlineMath>{'m'}</InlineMath>.</p>
                </div>
                <div className="p-3 border-l-4 border-green-500">
                    <h4 className="font-semibold">Step 3: Build the Equation</h4>
                    <p className="text-sm">Write your final answer by putting the <InlineMath>{'m'}</InlineMath> and <InlineMath>{'b'}</InlineMath> you found into the <InlineMath>{'y = mx + b'}</InlineMath> formula.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="equation-from-graph" 
            slideTitle="Writing an Equation from a Graph" 
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