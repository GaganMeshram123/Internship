import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function IntroSlopeInterceptSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'understanding-m', conceptId: 'understanding-m', conceptName: 'Understanding Slope (m)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Understanding Slope (m)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: What is 'm'? */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The 'm' is for 'Move'</h3>
            <p>The slope, <InlineMath>{'m'}</InlineMath>, tells you the **steepness** and **direction** of the line. It's the "rise over run".</p>
            
            <div className="mt-4 space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <h4 className="font-bold text-green-700 dark:text-green-300">Positive Slope (m > 0)</h4>
                    <p className="text-sm">The line goes **UPHILL** from left to right. An equation like <InlineMath>{'y = 2x + 1'}</InlineMath> means for every 1 step right, you go 2 steps up.</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                    <h4 className="font-bold text-red-700 dark:text-red-300">Negative Slope (m < 0)</h4>
                    <p className="text-sm">The line goes **DOWNHILL** from left to right. An equation like <InlineMath>{'y = -3x + 4'}</InlineMath> means for every 1 step right, you go 3 steps down.</p>
                </div>
                 <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <h4 className="font-bold">Key Idea</h4>
                    <p className="text-sm">A bigger number for <InlineMath>{'m'}</InlineMath> (like 5 or -5) means a steeper line. A smaller number (like 1/2) means a flatter line.</p>
                </div>
            </div>
          </div>

          {/* Right Column: Visuals */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Slope in Action</h3>
            <div>
                <p><strong>Positive Slope Example:</strong> <InlineMath>{'y = 2x - 3'}</InlineMath></p>
                <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-2 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600 h-32">
                    <p className="text-slate-500">[Graph of an uphill line, with a triangle showing "run 1, rise 2"]</p>
                </div>
            </div>
             <div>
                <p><strong>Negative Slope Example:</strong> <InlineMath>{'y = -x + 4'}</InlineMath></p>
                <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-2 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600 h-32">
                    <p className="text-slate-500">[Graph of a downhill line, with a triangle showing "run 1, rise -1"]</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="understanding-m" 
            slideTitle="Understanding Slope (m)" 
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