import React, { useState } from 'react';
import SlideComponentWrapper from '../../../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingProportionalSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'graph-characteristics', conceptId: 'graph-characteristics', conceptName: 'Characteristics of a Proportional Graph', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Characteristics of a Proportional Graph</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Feature 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Feature #1: It's a Straight Line</h3>
            <p>Because the rate of change (the constant <InlineMath>{'k'}</InlineMath>) is always the same, the graph of a proportional relationship is always a perfectly straight line. No curves allowed!</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                 <p className="text-slate-500">[Graph showing a straight line starting from the origin and going up and to the right]</p>
            </div>
          </div>

          {/* Right Column: Feature 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Feature #2: It Goes Through the Origin (0,0)</h3>
            <p>A proportional graph **must** pass through the origin. Why? Because it makes logical sense!</p>
            <ul className="list-disc pl-5 text-sm space-y-2 my-3">
                <li>If you work for 0 hours, you earn $0.</li>
                <li>If you buy 0 items, the cost is $0.</li>
            </ul>
             <p>In the equation <InlineMath>{'y=kx'}</InlineMath>, if <InlineMath>{'x=0'}</InlineMath>, then <InlineMath>{'y'}</InlineMath> must also be 0.</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                 <p className="text-slate-500">[Graph showing a straight line with the origin point (0,0) highlighted or circled]</p>
            </div>
             <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 rounded-lg p-3 mt-4 text-center">
                <p className="font-bold">The Proportionality Test</p>
                <p className="text-sm">Does it pass through (0,0)? Is it a straight line? If yes to both, it's proportional!</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="graph-characteristics" 
            slideTitle="Characteristics of a Proportional Graph" 
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