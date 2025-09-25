import React, { useState } from 'react';
import SlideComponentWrapper from '../../../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SlopeSlide2() {
    const slideInteractions: Interaction[] = [{ id: 'finding-slope-from-graph', conceptId: 'finding-slope-from-graph', conceptName: 'Finding Slope from a Graph', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Finding Slope from a Graph</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Method */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Counting the Rise and Run</h3>
            <ol className="list-decimal list-inside space-y-3">
                <li>Pick any two points on the line that are easy to read (where the line crosses the grid perfectly).</li>
                <li>Starting from the left point, count how many units you go **up or down** to be level with the second point. This is your **Rise**.</li>
                <li>Count how many units you go **right** to get to the second point. This is your **Run**.</li>
                <li>Write the slope as the fraction <InlineMath>{'\\frac{\\text{Rise}}{\\text{Run}}'}</InlineMath> and simplify.</li>
            </ol>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-auto">
                <p className="font-bold text-sm">Watch Out! 🚧</p>
                <p className="text-xs">If the line goes downhill, your Rise will be a **negative** number!</p>
            </div>
          </div>

          {/* Right Column: The Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Let's Find the Slope</h3>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-2 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph showing a line passing through (1, 2) and (4, 8) with a triangle drawn between them]</p>
            </div>
            <div className="mt-4 text-center">
                <p>Count the spaces between the points (1, 2) and (4, 8):</p>
                <p className="mt-2">The **Rise** (vertical change) is <strong className="font-bold text-xl">6</strong>.</p>
                <p>The **Run** (horizontal change) is <strong className="font-bold text-xl">3</strong>.</p>
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4">
                    <p className="font-semibold">The slope is <InlineMath>{'\\frac{\\text{Rise}}{\\text{Run}} = \\frac{6}{3} = 2'}</InlineMath></p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-slope-from-graph" 
            slideTitle="Finding Slope from a Graph" 
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