import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function GraphingProportionalSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'real-world-proportionality-mileage', conceptId: 'real-world-proportionality-mileage', conceptName: 'Proportionality in Action: Car Mileage', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
       {/*  <h2 className="text-3xl font-bold text-center mb-6">Proportionality in Action: Car Mileage</h2>
        */} 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: The Concept & Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Mileage as a Proportional Rate ✍️</h3>
            <p>A car's mileage is a rate measured in kilometers per litre (km/l). Let's use a car with a mileage of <InlineMath>{'20 \\text{ km/l}'}</InlineMath>. This gives us the equation <InlineMath>{'y = 20x'}</InlineMath>.</p>

            <div className="mt-4">
                <h4 className="text-lg font-semibold">Step 1: Create a Table of Values</h4>
                <p className="text-sm">We can see the proportional relationship where the ratio <InlineMath>{'y/x'}</InlineMath> is always 20.</p>
                {/* Simple table using divs */}
                <div className="mt-2 border rounded-lg overflow-hidden border-slate-300 dark:border-slate-600">
                    <div className="flex bg-slate-100 dark:bg-slate-700 font-bold">
                        <div className="w-1/2 text-center p-2 border-r border-slate-300 dark:border-slate-600">Fuel Used (x) in Litres</div>
                        <div className="w-1/2 text-center p-2">Distance (y = 20x) in km</div>
                    </div>
                    <div className="flex border-t border-slate-300 dark:border-slate-600"><div className="w-1/2 text-center p-2 border-r border-slate-300 dark:border-slate-600">1</div><div className="w-1/2 text-center p-2">20</div></div>
                    <div className="flex border-t border-slate-300 dark:border-slate-600"><div className="w-1/2 text-center p-2 border-r border-slate-300 dark:border-slate-600">5</div><div className="w-1/2 text-center p-2">100</div></div>
                    <div className="flex border-t border-slate-300 dark:border-slate-600"><div className="w-1/2 text-center p-2 border-r border-slate-300 dark:border-slate-600">10</div><div className="w-1/2 text-center p-2">200</div></div>
                </div>
            </div>
            
            <div className="mt-auto pt-4">
                <h4 className="text-lg font-semibold">Step 2: List the Coordinates</h4>
                 <p className="text-sm">Each row of the table gives us an (x, y) point to plot.</p>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 mt-2 rounded-lg text-center font-mono">
                    (1, 20), (5, 100), (10, 200)
                </div>
            </div>
          </div>

          {/* Right Column: The Application */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Real-World Problem Solving 🛣️</h3>
            <p>Let's use our equation, <InlineMath>{'y = 20x'}</InlineMath>, for a road trip from Mumbai to Pune (approx. 150 km).</p>
            {/* Placeholder for graph visual */}
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-4 rounded-lg flex items-center justify-center p-4 border border-slate-300 dark:border-slate-600">
                <p className="text-slate-500">[Graph showing a line through (0,0), (1, 20), (5, 100) with axes labeled 'Fuel Used (Litres)' and 'Distance (km)']</p>
            </div>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 text-sm">
                    <p><strong>Question A: How much fuel is needed?</strong></p>
                    <p className="mt-1">We know the distance <InlineMath>{'y = 150'}</InlineMath>. We solve for <InlineMath>{'x'}</InlineMath>.</p>
                    <p className="font-mono text-center my-1"><InlineMath>{'150 = 20x'}</InlineMath></p>
                    <p className="font-mono text-center"><InlineMath>{'x = \\frac{150}{20} = 7.5'}</InlineMath></p>
                    <p className="text-center font-bold">Answer: 7.5 litres are needed.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 text-sm">
                    <p><strong>Question B: How far can you go on a full 35-litre tank?</strong></p>
                    <p className="mt-1">We know the fuel <InlineMath>{'x = 35'}</InlineMath>. We solve for <InlineMath>{'y'}</InlineMath>.</p>
                    <p className="font-mono text-center my-1"><InlineMath>{'y = 20(35)'}</InlineMath></p>
                    <p className="font-mono text-center"><InlineMath>{'y = 700'}</InlineMath></p>
                    <p className="text-center font-bold">Answer: You can travel 700 km.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="real-world-proportionality-mileage" 
            slideTitle="Proportionality in Action: Car Mileage" 
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