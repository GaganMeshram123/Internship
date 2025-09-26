import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function IntroSlopeInterceptSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'what-is-y-mx-b', conceptId: 'what-is-y-mx-b', conceptName: 'The y = mx + b Formula', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">The Slope-Intercept Formula</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Blueprint */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Blueprint for a Straight Line</h3>
            <p>The most common way to write a linear equation is in **slope-intercept form**.</p>
            <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg text-center">
                <BlockMath>{'y = mx + b'}</BlockMath>
            </div>
            <p>This formula is like a recipe that tells you exactly how to draw a straight line. Each part has a special meaning:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-sm flex-grow">
                <li><InlineMath>{'y'}</InlineMath> and <InlineMath>{'x'}</InlineMath> are the coordinates of **any point** on the line.</li>
                <li><InlineMath>{'m'}</InlineMath> is the **slope** of the line. It tells you how steep the line is ("rise over run").</li>
                <li><InlineMath>{'b'}</InlineMath> is the **y-intercept**. It's the point where the line crosses the vertical y-axis.</li>
            </ul>
          </div>

          {/* Right Column: Real-World Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Auto-Rickshaw Formula</h3>
            <p>This formula appears in real life! Think about an auto-rickshaw fare in Navi Mumbai.</p>
            <div className="my-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-md text-center text-sm">
                Total Cost = (Cost per km × Kilometers) + Starting Fare
            </div>
            <p>Let's match this to our formula:</p>
            <div className="mt-3 space-y-2 text-sm flex-grow">
                <p>➡️ <InlineMath>{'y'}</InlineMath> is the <span className="font-semibold">Total Cost</span>.</p>
                <p>➡️ <InlineMath>{'m'}</InlineMath> is the <span className="font-semibold">Cost per km</span> (the rate/slope), let's say <InlineMath>{'₹15'}</InlineMath>.</p>
                <p>➡️ <InlineMath>{'x'}</InlineMath> is the number of <span className="font-semibold">Kilometers</span> driven.</p>
                <p>➡️ <InlineMath>{'b'}</InlineMath> is the <span className="font-semibold">Starting Fare</span> (the y-intercept), let's say <InlineMath>{'₹23'}</InlineMath>.</p>
            </div>
            <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/50 rounded-lg text-center font-bold">
                <p>The equation becomes: <InlineMath>{'y = 15x + 23'}</InlineMath></p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-is-y-mx-b" 
            slideTitle="The y = mx + b Formula" 
            moduleId="linear-equations-and-functions" 
            submoduleId="intro-to-slope-intercept-form"
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