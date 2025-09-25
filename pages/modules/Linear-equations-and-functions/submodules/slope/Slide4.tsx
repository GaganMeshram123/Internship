import React, { useState } from 'react';
import SlideComponentWrapper from '../../../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SlopeSlide4() {
    const slideInteractions: Interaction[] = [{ id: 'special-slope-cases', conceptId: 'special-slope-cases', conceptName: 'Special Cases: Horizontal and Vertical Lines', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Special Cases: Horizontal & Vertical Lines</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Horizontal Lines */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Horizontal Lines →</h3>
            <p>A horizontal line is perfectly flat. It has **zero rise**.</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph of a horizontal line passing through (2, 3) and (6, 3)]</p>
            </div>
            <p className="text-sm">Using the formula with points (2, 3) and (6, 3):</p>
             <div className="bg-blue-50 dark:bg-blue-900/30 p-2 mt-2 rounded-md font-bold text-center">
                <InlineMath>{'m = \\frac{3 - 3}{6 - 2} = \\frac{0}{4} = 0'}</InlineMath>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4">
                <p className="font-semibold">The slope of ANY horizontal line is always 0.</p>
            </div>
          </div>

          {/* Right Column: Vertical Lines */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Vertical Lines ↑</h3>
            <p>A vertical line goes straight up and down. It has **zero run**.</p>
             <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph of a vertical line passing through (4, 1) and (4, 5)]</p>
            </div>
            <p className="text-sm">Using the formula with points (4, 1) and (4, 5):</p>
             <div className="bg-blue-50 dark:bg-blue-900/30 p-2 mt-2 rounded-md font-bold text-center">
                <InlineMath>{'m = \\frac{5 - 1}{4 - 4} = \\frac{4}{0} = \\text{Undefined!}'}</InlineMath>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4">
                <p className="font-semibold">You can't divide by zero! The slope of ANY vertical line is always **undefined**.</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="special-slope-cases" 
            slideTitle="Special Cases: Horizontal and Vertical Lines" 
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