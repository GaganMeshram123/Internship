import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ComparingLinearFunctionsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'comparing-slopes', conceptId: 'comparing-slopes', conceptName: 'Comparing Slopes (Rates of Change)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Comparing Slopes (Rates of Change)</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">Which function is changing faster?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Function A */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Function A: Mobile Plan</h3>
            <p className="text-sm">The cost <InlineMath>{'y'}</InlineMath> for <InlineMath>{'x'}</InlineMath> GB of data is given by the equation:</p>
            <div className="my-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-md text-center font-bold text-lg"><InlineMath>{'y = 15x + 149'}</InlineMath></div>
            <p className="font-semibold">Finding the Slope:</p>
            <p className="text-sm">In the equation <InlineMath>{'y = mx + b'}</InlineMath>, the slope <InlineMath>{'m'}</InlineMath> is the number multiplied by <InlineMath>{'x'}</InlineMath>.</p>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-center">
                Slope for Plan A = <strong>15</strong> (or ₹15 per GB)
            </p>
          </div>

          {/* Right Column: Function B */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Function B: Data Vouchers</h3>
            <p className="text-sm">The cost of data vouchers is shown in the table.</p>
            <table className="w-full my-4 border text-center text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-1'>GB (x)</th><th className='p-1'>Cost (y)</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-1'>2</td><td className='p-1'>20</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-1'>4</td><td className='p-1'>40</td></tr>
                </tbody>
            </table>
            <p className="font-semibold">Finding the Slope:</p>
            <p className="text-sm">Use the formula <InlineMath>{'\\frac{\\text{change in y}}{\\text{change in x}}'}</InlineMath>.</p>
            <p className="text-center text-lg my-2"><InlineMath>{'m = \\frac{40 - 20}{4 - 2} = \\frac{20}{2} = 10'}</InlineMath></p>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-center">
                Slope for Plan B = <strong>10</strong> (or ₹10 per GB)
            </p>
          </div>
        </div>
        <div className="mt-6 p-3 bg-green-100 dark:bg-green-900/50 rounded-md text-center">
            {/* FIX: Replaced > with &gt; */}
            <strong>Comparison:</strong> Plan A has a higher rate of change (15 &gt; 10). It is more expensive per GB.
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="comparing-slopes" 
            slideTitle="Comparing Slopes (Rates of Change)" 
            moduleId="linear-equations-and-functions" 
            submoduleId="comparing-linear-functions"
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