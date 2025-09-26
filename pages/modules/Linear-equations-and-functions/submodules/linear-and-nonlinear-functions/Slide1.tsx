import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearAndNonlinearFunctionsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'what-is-linear', conceptId: 'what-is-linear', conceptName: 'What Makes a Function Linear?', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">What Makes a Function Linear?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Definition */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Constant Rate of Change</h3>
            <p>A function is **linear** if it has a **constant rate of change**.</p>
            <p className="mt-2">This means that for every equal step you take in the input (<InlineMath>{'x'}</InlineMath>), the output (<InlineMath>{'y'}</InlineMath>) changes by the same amount.</p>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-grow flex flex-col justify-center">
                <p className="font-bold">Key Characteristics:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Its graph is always a **straight line**.</li>
                    <li>Its equation can always be written in the form <InlineMath>{'y = mx + b'}</InlineMath>.</li>
                    <li>Its slope (<InlineMath>{'m'}</InlineMath>) never changes.</li>
                </ul>
            </div>
          </div>

          {/* Right Column: Visual Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Example: A Bike Ride</h3>
            <p>Imagine you're riding a bicycle at a steady speed of 10 km/hour.</p>
            <div className="my-3 border rounded-lg overflow-hidden border-slate-300 dark:border-slate-600 text-sm">
                <div className="flex bg-slate-100 dark:bg-slate-700 font-bold">
                    <div className="w-1/2 text-center p-2 border-r">Hours (x)</div>
                    <div className="w-1/2 text-center p-2">Distance (y)</div>
                </div>
                <div className="flex border-t"><div className="w-1/2 text-center p-2 border-r">0</div><div className="w-1/2 text-center p-2">0</div></div>
                <div className="flex border-t"><div className="w-1/2 text-center p-2 border-r">1</div><div className="w-1/2 text-center p-2">10</div></div>
                <div className="flex border-t"><div className="w-1/2 text-center p-2 border-r">2</div><div className="w-1/2 text-center p-2">20</div></div>
                <div className="flex border-t"><div className="w-1/2 text-center p-2 border-r">3</div><div className="w-1/2 text-center p-2">30</div></div>
            </div>
            <p className="mt-2 p-3 bg-green-100 dark:bg-green-900/50 rounded-md text-center">
                For every 1 hour (change in x), the distance increases by 10 km (change in y). This is a **constant rate of change**, so it's a **linear function**.
            </p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-is-linear" 
            slideTitle="What Makes a Function Linear?" 
            moduleId="linear-equations-and-functions" 
            submoduleId="linear-and-nonlinear-functions"
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