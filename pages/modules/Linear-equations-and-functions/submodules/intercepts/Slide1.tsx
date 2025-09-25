import React, { useState } from 'react';
import SlideComponentWrapper from '../../../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function InterceptsSlide1() {
    const slideInteractions: Interaction[] = [{ id: 'what-are-intercepts', conceptId: 'what-are-intercepts', conceptName: 'What Are Intercepts?', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">What Are Intercepts?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Y-Intercept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Y-Intercept</h3>
            <p>The **y-intercept** is the point where the line crosses the vertical y-axis.</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph of a line, with the point where it crosses the y-axis circled and labeled "Y-Intercept"]</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4">
                <p className="font-bold">Key Fact:</p>
                <p className="text-sm mt-1">At the y-intercept, the x-value is **always 0**. The coordinate looks like <InlineMath>{'(0, y)'}</InlineMath>.</p>
            </div>
          </div>

          {/* Right Column: X-Intercept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The X-Intercept</h3>
            <p>The **x-intercept** is the point where the line crosses the horizontal x-axis.</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph of a line, with the point where it crosses the x-axis circled and labeled "X-Intercept"]</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4">
                <p className="font-bold">Key Fact:</p>
                <p className="text-sm mt-1">At the x-intercept, the y-value is **always 0**. The coordinate looks like <InlineMath>{'(x, 0)'}</InlineMath>.</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-are-intercepts" 
            slideTitle="What Are Intercepts?" 
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