import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';

export default function RecognizingFunctionsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'functions-from-tables', conceptId: 'functions-from-tables', conceptName: 'Recognizing Functions from Tables', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Recognizing Functions from Tables</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">The rule is simple: **An input (x) cannot be repeated with different outputs (y).**</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: IS a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">✅ IS a Function</h3>
            <p className="text-sm">Look at the input (`x`) column. Since every `x` value is different, it is a function.</p>
            <table className="w-full my-3 border text-center">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-2'>x (Input)</th><th className='p-2'>y (Output)</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-2'>1</td><td className='p-2'>5</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-2'>2</td><td className='p-2'>10</td></tr>
                    <tr><td className='border-r p-2'>3</td><td className='p-2'>15</td></tr>
                </tbody>
            </table>
            <p className="mt-auto p-3 bg-green-50 dark:bg-green-900/30 rounded-md">Each input (1, 2, 3) is unique and has only one output.</p>
          </div>

          {/* Right Column: IS NOT a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">❌ IS NOT a Function</h3>
            <p className="text-sm">The input `x=2` is repeated, and it has two **different** outputs.</p>
            <table className="w-full my-3 border text-center">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-2'>x (Input)</th><th className='p-2'>y (Output)</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-2'>1</td><td className='p-2'>4</td></tr>
                    <tr className="bg-red-100 dark:bg-red-900/50"><td className='border-r p-2 font-bold'>2</td><td className='p-2 font-bold'>8</td></tr>
                    <tr className="bg-red-100 dark:bg-red-900/50"><td className='border-r p-2 font-bold'>2</td><td className='p-2 font-bold'>9</td></tr>
                    <tr><td className='border-r p-2'>3</td><td className='p-2'>12</td></tr>
                </tbody>
            </table>
            <p className="mt-auto p-3 bg-red-50 dark:bg-red-900/30 rounded-md">The input `2` pointing to both `8` and `9` breaks the rule.</p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="functions-from-tables" 
            slideTitle="Recognizing Functions from Tables" 
            moduleId="linear-equations-and-functions" 
            submoduleId="recognizing-functions"
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