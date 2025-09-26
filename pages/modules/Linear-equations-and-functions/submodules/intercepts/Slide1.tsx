import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function InterceptsSlide2() {
    const slideInteractions: Interaction[] = [{ id: 'finding-intercepts', conceptId: 'finding-intercepts', conceptName: 'Finding Intercepts from an Equation', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-4">How to Find Intercepts from an Equation</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-6">
            Now let's use the special rules (<InlineMath>{'y=0'}</InlineMath> for x-intercept, <InlineMath>{'x=0'}</InlineMath> for y-intercept) to find the landmarks for this equation: <strong className="font-mono"><InlineMath>{'2x + 4y = 8'}</InlineMath></strong>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Finding the X-Intercept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Finding the x-intercept</h3>
            <div className="space-y-4 flex-grow flex flex-col justify-around">
                <div>
                    <h4 className="text-lg font-semibold">Step 1: Use the Rule</h4>
                    <p>For the x-intercept, we always set <InlineMath>{'y = 0'}</InlineMath>.</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Step 2: Substitute</h4>
                    <p>Replace 'y' with 0 in the equation.</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'2x + 4(0) = 8'}</InlineMath></div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Step 3: Solve for 'x'</h4>
                    <p>Simplify and find the value of x.</p>
                     <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold">
                         <p><InlineMath>{'2x + 0 = 8'}</InlineMath></p>
                         <p><InlineMath>{'2x = 8'}</InlineMath></p>
                         <p><InlineMath>{'x = 4'}</InlineMath></p>
                    </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 text-center">
                    <h4 className="font-bold">The Result</h4>
                    <p>The x-intercept is the point <strong className="text-xl">(4, 0)</strong>.</p>
                </div>
            </div>
          </div>

          {/* Right Column: Finding the Y-Intercept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Finding the y-intercept</h3>
             <div className="space-y-4 flex-grow flex flex-col justify-around">
                <div>
                    <h4 className="text-lg font-semibold">Step 1: Use the Rule</h4>
                    <p>For the y-intercept, we always set <InlineMath>{'x = 0'}</InlineMath>.</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Step 2: Substitute</h4>
                    <p>Replace 'x' with 0 in the equation.</p>
                    <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'2(0) + 4y = 8'}</InlineMath></div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Step 3: Solve for 'y'</h4>
                    <p>Simplify and find the value of y.</p>
                     <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold">
                         <p><InlineMath>{'0 + 4y = 8'}</InlineMath></p>
                         <p><InlineMath>{'4y = 8'}</InlineMath></p>
                         <p><InlineMath>{'y = 2'}</InlineMath></p>
                    </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 text-center">
                    <h4 className="font-bold">The Result</h4>
                    <p>The y-intercept is the point <strong className="text-xl">(0, 2)</strong>.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-intercepts" 
            slideTitle="Finding Intercepts from an Equation" 
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