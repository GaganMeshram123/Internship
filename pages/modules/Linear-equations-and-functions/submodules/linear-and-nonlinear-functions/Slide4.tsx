import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
// FIX: Add necessary imports for KaTeX
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearAndNonlinearFunctionsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'linear-vs-nonlinear-tables', conceptId: 'linear-vs-nonlinear-tables', conceptName: 'Identifying from a Table', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Identifying from a Table</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">Check the rate of change between consecutive points.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Linear Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3 text-center">✅ Linear Function (Constant Rate)</h3>
            <p className="text-sm">Calculate the change in `y` and the change in `x` between each pair of points.</p>
            <table className="w-full my-3 border text-center">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-2'>x</th><th className='p-2'>y</th><th className='p-2'>Change in y / Change in x</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-2'>0</td><td className='p-2'>3</td><td className='p-2'>-</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-2'>1</td><td className='p-2'>5</td><td className='p-2 font-bold text-green-600'>2/1 = 2</td></tr>
                    <tr><td className='border-r p-2'>2</td><td className='p-2'>7</td><td className='p-2 font-bold text-green-600'>2/1 = 2</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-2'>3</td><td className='p-2'>9</td><td className='p-2 font-bold text-green-600'>2/1 = 2</td></tr>
                </tbody>
            </table>
            <p className="mt-auto p-3 bg-green-100 dark:bg-green-900/50 rounded-md text-center">
                The rate of change is consistently 2. This is a <strong>linear function</strong>.
            </p>
          </div>

          {/* Right Column: Nonlinear Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3 text-center">❌ Nonlinear Function (Changing Rate)</h3>
            <p className="text-sm">If the rate of change is different between any two points, it's nonlinear.</p>
            <table className="w-full my-3 border text-center">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-2'>x</th><th className='p-2'>y</th><th className='p-2'>Change in y / Change in x</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-2'>0</td><td className='p-2'>0</td><td className='p-2'>-</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-2'>1</td><td className='p-2'>1</td><td className='p-2 font-bold text-red-600'>1/1 = 1</td></tr>
                    <tr><td className='border-r p-2'>2</td><td className='p-2'>4</td><td className='p-2 font-bold text-red-600'>3/1 = 3</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-2'>3</td><td className='p-2'>9</td><td className='p-2 font-bold text-red-600'>5/1 = 5</td></tr>
                </tbody>
            </table>
            <p className="mt-auto p-3 bg-red-100 dark:bg-red-900/30 rounded-md text-center">
                The rate of change is 1, then 3, then 5. This is <strong>not constant</strong>, so it's a <strong>nonlinear function</strong> (specifically, <InlineMath>{'y=x^2'}</InlineMath>).
            </p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="linear-vs-nonlinear-tables" 
            slideTitle="Identifying from a Table" 
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