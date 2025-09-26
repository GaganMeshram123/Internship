import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function WritingSlopeInterceptSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'equation-from-point-slope', conceptId: 'equation-from-point-slope', conceptName: 'Writing an Equation from a Point and Slope', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Building the Final Equation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: From a Graph */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Putting It All Together (From a Graph)</h3>
            <p>From the previous slides, we found two key values from our graph:</p>
            <ul className="list-disc pl-5 my-4">
                <li>The y-intercept <InlineMath>{'b = 2'}</InlineMath></li>
                <li>The slope <InlineMath>{'m = \\frac{2}{3}'}</InlineMath></li>
            </ul>
            <p>Now, substitute these values into the slope-intercept blueprint: <InlineMath>{'y = mx + b'}</InlineMath>.</p>
            <div className="mt-4 p-4 text-center bg-green-100 dark:bg-green-900/50 rounded-lg font-bold text-lg">
                <InlineMath>{'y = \\frac{2}{3}x + 2'}</InlineMath>
            </div>
            <p className="mt-2 text-sm text-center">This is the unique equation for the line on the graph!</p>
          </div>

          {/* Right Column: From a Point and Slope */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">From a Point and a Slope</h3>
            <p className="text-sm italic">Problem: Find the equation of a line with slope <InlineMath>{'m=3'}</InlineMath> that passes through the point <InlineMath>{'(2, 5)'}</InlineMath>.</p>
            <ol className="list-decimal pl-5 mt-3 space-y-2 text-sm">
              <li>Start with what you know: <InlineMath>{'y = 3x + b'}</InlineMath>. We still need to find 'b'.</li>
              <li>Use the given point <InlineMath>{'(2, 5)'}</InlineMath>. Substitute <InlineMath>{'x=2'}</InlineMath> and <InlineMath>{'y=5'}</InlineMath> into the equation. <br/>
                <div className="p-1 my-1 text-center bg-slate-100 dark:bg-slate-700 rounded-md"><InlineMath>{'5 = 3(2) + b'}</InlineMath></div>
              </li>
              <li>Solve for <InlineMath>{'b'}</InlineMath>: <br/>
                <InlineMath>{'5 = 6 + b'}</InlineMath> <br/>
                <InlineMath>{'b = 5 - 6 = -1'}</InlineMath>
              </li>
              <li>Write the final equation using your <InlineMath>{'m'}</InlineMath> and new <InlineMath>{'b'}</InlineMath>.
                <div className="p-2 mt-1 text-center bg-green-100 dark:bg-green-900/50 rounded-md font-bold">
                    <InlineMath>{'y = 3x - 1'}</InlineMath>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="equation-from-point-slope" 
            slideTitle="Writing an Equation from a Point and Slope" 
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