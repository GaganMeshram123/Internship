import React, { useState } from 'react';
import SlideComponentWrapper from '../../../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SlopeSlide1() {
    const slideInteractions: Interaction[] = [{ id: 'what-is-slope', conceptId: 'what-is-slope', conceptName: 'What is Slope?', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">What is Slope? ⛰️</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Concept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">A Measure of Steepness</h3>
            <p>In math, **slope** is a number that tells us how steep a line is. A steeper line has a bigger slope.</p>
            <p className="mt-2 text-sm">Think of it like the steepness of a ski hill, a wheelchair ramp, or the roof of a house.</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-auto">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">Rise Over Run</h4>
                <p className="text-center text-2xl font-bold my-2"><InlineMath>{'\\text{Slope} = \\frac{\\text{Rise}}{\\text{Run}}'}</InlineMath></p>
                <ul className="text-sm space-y-1">
                    <li><strong>Rise:</strong> The vertical change (how far up or down).</li>
                    <li><strong>Run:</strong> The horizontal change (how far left or right).</li>
                </ul>
            </div>
          </div>

          {/* Right Column: Types of Slope */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Four Types of Slope</h3>
            <div className="grid grid-cols-2 gap-4 flex-grow text-center text-sm">
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-2">
                    <p className="font-bold">Positive Slope</p>
                    <p className="text-xs italic">Uphill (L to R)</p>
                    <div className="text-2xl mt-1">↗</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-2">
                    <p className="font-bold">Negative Slope</p>
                    <p className="text-xs italic">Downhill (L to R)</p>
                    <div className="text-2xl mt-1">↘</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-2">
                    <p className="font-bold">Zero Slope</p>
                    <p className="text-xs italic">Horizontal</p>
                    <div className="text-2xl mt-1">→</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-2">
                    <p className="font-bold">Undefined Slope</p>
                    <p className="text-xs italic">Vertical</p>
                    <div className="text-2xl mt-1">↑</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-is-slope" 
            slideTitle="What is Slope?" 
            moduleId="linear-equations-and-functions" 
            submoduleId="slope"
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