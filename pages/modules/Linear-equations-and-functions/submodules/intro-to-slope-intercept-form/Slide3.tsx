import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function IntroSlopeInterceptSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'understanding-b', conceptId: 'understanding-b', conceptName: 'Understanding the y-intercept (b)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Understanding the y-intercept (b)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: What is 'b'? */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The 'b' is for 'Begin'</h3>
            <p>The y-intercept, <InlineMath>{'b'}</InlineMath>, is the point where the line **crosses the vertical y-axis**.</p>
            <p className="mt-2">Think of it as the **starting point** when you are graphing the line.</p>
            
            <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 rounded-lg">
                <p className="font-bold">Key Point:</p>
                <p>The x-coordinate of the y-intercept is **always 0**. So, the point is always written as <InlineMath>{'(0, b)'}</InlineMath>.</p>
            </div>

            <div className="space-y-3">
                <p>If <InlineMath>{'b = 4'}</InlineMath>, the line crosses the y-axis at <InlineMath>{'(0, 4)'}</InlineMath>.</p>
                <p>If <InlineMath>{'b = -2'}</InlineMath>, the line crosses the y-axis at <InlineMath>{'(0, -2)'}</InlineMath>.</p>
                <p>If there's no '<InlineMath>{'b'}</InlineMath>' (like in <InlineMath>{'y=3x'}</InlineMath>), then <InlineMath>{'b=0'}</InlineMath>, and the line passes through the origin <InlineMath>{'(0, 0)'}</InlineMath>.</p>
            </div>
          </div>

          {/* Right Column: Visuals */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Finding 'b' on a Graph</h3>
            <p className="text-sm">These three lines are parallel (same slope, <InlineMath>{'m=1'}</InlineMath>). Their only difference is their starting point, <InlineMath>{'b'}</InlineMath>.</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph with three parallel lines: one crossing y-axis at +3, one at -1, one at 0]</p>
            </div>
            <ul className="list-disc pl-5 mt-4 space-y-1 text-sm">
                <li>For <InlineMath>{'y = x + 3'}</InlineMath>, the y-intercept is <InlineMath>{'(0, 3)'}</InlineMath>.</li>
                <li>For <InlineMath>{'y = x'}</InlineMath>, the y-intercept is <InlineMath>{'(0, 0)'}</InlineMath>.</li>
                <li>For <InlineMath>{'y = x - 1'}</InlineMath>, the y-intercept is <InlineMath>{'(0, -1)'}</InlineMath>.</li>
            </ul>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="understanding-b" 
            slideTitle="Understanding the y-intercept (b)" 
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