import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingProportionalSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'graphing-from-table', conceptId: 'graphing-from-table', conceptName: 'Graphing from a Table of Values', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Graphing from a Table of Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Plan */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">From Equation to Graph ✍️</h3>
            <p>Let's use a simple equation: <InlineMath>{'y = 2x'}</InlineMath>. This means for any value of 'x', 'y' will be twice as large.</p>

            <div className="mt-4">
                <h4 className="text-lg font-semibold">Step 1: Create a Table of Values</h4>
                <p className="text-sm">Choose simple values for 'x' and use the equation to find 'y'.</p>
                {/* Simple table using divs */}
                <div className="mt-2 border rounded-lg overflow-hidden border-slate-300 dark:border-slate-600">
                    <div className="flex bg-slate-100 dark:bg-slate-700 font-bold">
                        <div className="w-1/2 text-center p-2 border-r border-slate-300 dark:border-slate-600">x</div>
                        <div className="w-1/2 text-center p-2">y = 2x</div>
                    </div>
                    <div className="flex border-t border-slate-300 dark:border-slate-600"><div className="w-1/2 text-center p-2 border-r border-slate-300 dark:border-slate-600">0</div><div className="w-1/2 text-center p-2">0</div></div>
                    <div className="flex border-t border-slate-300 dark:border-slate-600"><div className="w-1/2 text-center p-2 border-r border-slate-300 dark:border-slate-600">1</div><div className="w-1/2 text-center p-2">2</div></div>
                    <div className="flex border-t border-slate-300 dark:border-slate-600"><div className="w-1/2 text-center p-2 border-r border-slate-300 dark:border-slate-600">2</div><div className="w-1/2 text-center p-2">4</div></div>
                    <div className="flex border-t border-slate-300 dark:border-slate-600"><div className="w-1/2 text-center p-2 border-r border-slate-300 dark:border-slate-600">3</div><div className="w-1/2 text-center p-2">6</div></div>
                </div>
            </div>
            
            <div className="mt-auto pt-4">
                <h4 className="text-lg font-semibold">Step 2: List the Coordinates</h4>
                 <p className="text-sm">Each row of the table gives us an (x, y) point to plot.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 mt-2 rounded-lg text-center font-mono">
                    (0, 0), (1, 2), (2, 4), (3, 6)
                </div>
            </div>
          </div>

          {/* Right Column: The Graph */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Plotting the Points 📈</h3>
            <p>Now, we place these points on the coordinate plane and draw a line through them.</p>
            {/* Placeholder for graph visual */}
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph showing points (0,0), (1,2), (2,4), (3,6) connected by a straight line]</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4 text-sm">
                <p><strong>To plot (3, 6):</strong></p>
                <ol className="list-decimal list-inside pl-2">
                    <li>Start at the origin (0, 0).</li>
                    <li>Move 3 units to the right (the x-direction).</li>
                    <li>Move 6 units up (the y-direction).</li>
                    <li>Place your point.</li>
                </ol>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="graphing-from-table" 
            slideTitle="Graphing from a Table of Values" 
            moduleId="linear-equations-and-functions" 
            submoduleId="graphing-proportional-relationships"
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