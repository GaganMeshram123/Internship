import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function GraphingSlopeInterceptSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'graphing-example', conceptId: 'graphing-example', conceptName: 'Full Graphing Example', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Full Example: Graphing a Line</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">Let's graph the equation <InlineMath>{'y = \\frac{2}{3}x - 1'}</InlineMath></p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Steps */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Step 1: Begin with 'b'</h3>
                <p className="mt-1">Identify the y-intercept. Here, <InlineMath>{'b = -1'}</InlineMath>.</p>
                <p className="font-semibold">Plot the starting point at <InlineMath>{'(0, -1)'}</InlineMath>.</p>
              </div>
              <hr/>
              <div>
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">Step 2: Move with 'm'</h3>
                <p className="mt-1">Identify the slope. Here, <InlineMath>{'m = \\frac{2}{3}'}</InlineMath>.</p>
                <ul className="list-disc pl-5">
                    <li><strong>Rise = 2</strong>: From (0, -1), move UP 2 units.</li>
                    <li><strong>Run = 3</strong>: Then, move RIGHT 3 units.</li>
                </ul>
                <p className="font-semibold">Our second point is <InlineMath>{'(3, 1)'}</InlineMath>.</p>
              </div>
               <hr/>
               <div>
                <h3 className="text-xl font-semibold">Step 3: Connect</h3>
                <p className="mt-1">Draw a straight line through your two points: <InlineMath>{'(0, -1)'}</InlineMath> and <InlineMath>{'(3, 1)'}</InlineMath>.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Final Graph */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Completed Graph</h3>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph showing a point at (0, -1), dashed lines for "rise 2, run 3", a second point at (3, 1), and a solid line drawn through both.]</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="graphing-example" 
            slideTitle="Example: Graphing y = 2/3x - 1" 
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