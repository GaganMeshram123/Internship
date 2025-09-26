import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function WritingSlopeInterceptSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'calculating-m-from-graph', conceptId: 'calculating-m-from-graph', conceptName: 'Calculating the Slope from a Graph', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Step 2: Calculating the Slope (m)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: How-To */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Find 'm' (The Movement)</h3>
            <ol className="list-decimal pl-5 space-y-3">
                <li>First, find two points on the line that are perfectly on the corner of a grid square. This makes counting easy.</li>
                <li>Starting from the point on the left, count how many units you have to go **UP or DOWN (Rise)**.</li>
                <li>Then, count how many units you have to go **RIGHT (Run)** to get to the second point.</li>
                <li>Finally, write the fraction for the slope:
                    <div className="text-center text-lg mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-md">
                        <InlineMath>{'m = \\frac{\\text{Rise}}{\\text{Run}}'}</InlineMath>
                    </div>
                </li>
            </ol>
          </div>

          {/* Right Column: Visual */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Calculating 'Rise over Run'</h3>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph with a line passing through (0, 2) and (3, 4). A right-angled triangle is drawn between them, showing a Rise of 2 and a Run of 3.]</p>
            </div>
            <p className="mt-4 p-3 bg-green-100 dark:bg-green-900/50 rounded-md text-center">
                The Rise is +2 and the Run is +3. <br/> Therefore, the slope <InlineMath>{'m = \\frac{2}{3}'}</InlineMath>. We have the second part of our equation!
            </p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="calculating-m-from-graph" 
            slideTitle="Step 2: Calculating the Slope from a Graph" 
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