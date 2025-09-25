import React, { useState } from 'react';
import SlideComponentWrapper from '../../../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function InterceptsSlide4() {
    const slideInteractions: Interaction[] = [{ id: 'graphing-using-intercepts', conceptId: 'graphing-using-intercepts', conceptName: 'Graphing a Line Using Intercepts', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Graphing a Line Using Intercepts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Method */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">A Shortcut to Graphing</h3>
            <p>Since you only need two points to draw a line, the intercepts are a perfect choice!</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 flex-grow mt-4">
                <h4 className="font-semibold">The 4-Step Process:</h4>
                <ol className="list-decimal list-inside space-y-3 mt-2">
                    <li>Find the **y-intercept** by setting <InlineMath>{'x=0'}</InlineMath>.</li>
                    <li>Find the **x-intercept** by setting <InlineMath>{'y=0'}</InlineMath>.</li>
                    <li>**Plot** these two points on the graph.</li>
                    <li>**Connect the dots** with a straight line.</li>
                </ol>
            </div>
          </div>

          {/* Right Column: The Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Let's Graph <InlineMath>{'y = 2x - 4'}</InlineMath></h3>
            <div className="space-y-2 mt-2">
                <p><strong>1. Find y-intercept (set x=0):</strong></p>
                <p className="pl-4"><InlineMath>{'y = 2(0) - 4 \\implies y = -4'}</InlineMath>. Point is <InlineMath>{'(0, -4)'}</InlineMath>.</p>
                <p><strong>2. Find x-intercept (set y=0):</strong></p>
                <p className="pl-4"><InlineMath>{'0 = 2x - 4 \\implies 4 = 2x \\implies x = 2'}</InlineMath>. Point is <InlineMath>{'(2, 0)'}</InlineMath>.</p>
            </div>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph showing points (0, -4) and (2, 0) plotted and connected with a straight line]</p>
            </div>
            <p className="text-center font-semibold">That's all it takes to graph the line!</p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="graphing-using-intercepts" 
            slideTitle="Graphing a Line Using Intercepts" 
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