import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SlopeSlide3() {
    const slideInteractions: Interaction[] = [{ id: 'slope-formula', conceptId: 'slope-formula', conceptName: 'The Slope Formula', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">The Slope Formula</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Formula */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Calculating Slope from Two Points</h3>
            <p>What if you don't have a graph? If you know the coordinates of any two points on a line, you can use the slope formula.</p>
            <p className="mt-4">Let your two points be:</p>
            <p className="font-mono text-center my-2">(<InlineMath>{'x_1, y_1'}</InlineMath>) and (<InlineMath>{'x_2, y_2'}</InlineMath>)</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-4 mt-auto">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">The Slope Formula</h4>
                <p className="text-center text-2xl font-bold my-2"><InlineMath>{'m = \\frac{y_2 - y_1}{x_2 - x_1}'}</InlineMath></p>
                <p className="text-xs text-center italic">Change in y (Rise) divided by Change in x (Run)</p>
            </div>
          </div>

          {/* Right Column: The Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Using the Formula</h3>
            <p className="italic mb-4">Problem: Find the slope of the line that passes through the points (2, 5) and (4, 9).</p>
            <div className="space-y-4 flex-grow flex flex-col justify-around">
                <div>
                    <h4 className="text-lg font-semibold">Step 1: Label your points</h4>
                    <p className="text-sm">It doesn't matter which one is first, just be consistent!</p>
                    <p className="font-mono text-sm mt-1">Point 1 (<InlineMath>{'x_1, y_1'}</InlineMath>) = (2, 5)</p>
                    <p className="font-mono text-sm">Point 2 (<InlineMath>{'x_2, y_2'}</InlineMath>) = (4, 9)</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Step 2: Substitute into the formula</h4>
                     <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'m = \\frac{9 - 5}{4 - 2}'}</InlineMath></div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold">Step 3: Calculate</h4>
                     <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md mt-1 font-bold"><InlineMath>{'m = \\frac{4}{2}'}</InlineMath></div>
                </div>
                 <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 text-center">
                    <h4 className="font-bold">The Final Answer</h4>
                    <p>The slope <InlineMath>{'m'}</InlineMath> is <strong className="text-xl">2</strong>.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="slope-formula" 
            slideTitle="The Slope Formula" 
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