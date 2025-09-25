import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function FindingUnitRateFromGraphSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'unit-rate-from-graph', conceptId: 'unit-rate-from-graph', conceptName: 'Finding the Unit Rate from a Graph', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Finding the Unit Rate from a Graph</h2>
         */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Main Method */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Key: Find the Point (1, k)</h3>
            <p>On any proportional graph, the unit rate is the <strong>y-value when x equals 1</strong>. This point, <InlineMath>{'(1, k)'}</InlineMath>, reveals the constant of proportionality, <InlineMath>{'k'}</InlineMath>.</p>
            
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Example: Mobile Data Usage</h4>
              <p className="text-sm italic">This graph shows data used while streaming a video.</p>
              <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 mt-2 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                  <p className="text-slate-500">[Graph with x-axis "Time (minutes)" and y-axis "Data Used (MB)". A line from (0,0) passes through (1, 25) and (2, 50)]</p>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <ol className="list-decimal pl-5 space-y-2 text-sm">
                <li>Look at the x-axis (Time) and find the number <strong>1</strong>.</li>
                <li>Go straight up until you hit the line.</li>
                <li>Read the y-value at that point. The point is <InlineMath>{'(1, 25)'}</InlineMath>.</li>
              </ol>
              <p className="mt-3 font-bold text-center bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">The unit rate is <InlineMath>{'25'}</InlineMath> MB per minute. The equation is <InlineMath>{'y = 25x'}</InlineMath>.</p>
            </div>
          </div>

          {/* Right Column: Connection to Slope & Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Connection to Slope (Rise / Run)</h3>
            <p>The unit rate is also the <strong>slope</strong> of the line. We can prove this by calculating the slope between points <InlineMath>{'(0, 0)'}</InlineMath> and <InlineMath>{'(2, 50)'}</InlineMath>.</p>
            
            <div className="my-4 text-center">
                <p><strong>Rise</strong> (change in y): <InlineMath>{'50 - 0 = 50'}</InlineMath></p>
                <p><strong>Run</strong> (change in x): <InlineMath>{'2 - 0 = 2'}</InlineMath></p>
                <div className="mt-2 font-bold text-lg">
                    <InlineMath>{'\\text{Slope} = \\frac{\\text{Rise}}{\\text{Run}} = \\frac{50}{2} = 25'}</InlineMath>
                </div>
            </div>
            <p>The slope is <strong>25</strong>, which is exactly the same as our unit rate!</p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 rounded-lg p-4 mt-auto">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300">In Summary, the Unit Rate (k) is:</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>The <strong>y-value</strong> of the point where <InlineMath>{'x=1'}</InlineMath>.</li>
                    <li>The <strong>Constant of Proportionality</strong> in <InlineMath>{'y=kx'}</InlineMath>.</li>
                    <li>The <strong>Slope</strong> of the line.</li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="unit-rate-from-graph" 
            slideTitle="Finding the Unit Rate from a Graph" 
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
