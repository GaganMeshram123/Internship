import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ComparingLinearFunctionsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'functions-in-different-forms', conceptId: 'functions-in-different-forms', conceptName: 'Functions in Different Forms', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">The Same Story, Four Different Ways</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">To compare functions, we must first find the slope (m) and y-intercept (b) in any format.</p>
        
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Equation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-300 dark:border-slate-700 shadow-md">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">As an Equation</h3>
            <p className="mt-2 text-center text-xl p-2 bg-slate-100 dark:bg-slate-700 rounded-md font-mono"><InlineMath>{'y = 10x + 100'}</InlineMath></p>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-300 dark:border-slate-700 shadow-md">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">As a Table</h3>
            <table className="w-full mt-2 border text-center text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-1'>GB (x)</th><th className='p-1'>Cost (y)</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-1'>0</td><td className='p-1'>₹100</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-1'>1</td><td className='p-1'>₹110</td></tr>
                    <tr><td className='border-r p-1'>2</td><td className='p-1'>₹120</td></tr>
                </tbody>
            </table>
          </div>

          {/* Graph */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-300 dark:border-slate-700 shadow-md">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">As a Graph</h3>
            <div className="h-full min-h-[100px] bg-slate-100 dark:bg-slate-900/50 mt-2 rounded-lg flex items-center justify-center p-2 border">
                <p className="text-slate-500 text-sm">[Graph showing a line starting at (0, 100) and going up with a slope of 10]</p>
            </div>
          </div>

          {/* Words */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-300 dark:border-slate-700 shadow-md flex items-center justify-center">
            <div>
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">In Words</h3>
              <p className="mt-2 text-center p-4 bg-slate-100 dark:bg-slate-700 rounded-md">"A mobile plan has a starting fee of ₹100, plus ₹10 per GB of data."</p>
            </div>
          </div>
        </div>
        <p className="text-center mt-4 p-2 bg-green-100 dark:bg-green-900/50 rounded-md">All four representations describe the exact same function!</p>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="functions-in-different-forms" 
            slideTitle="Functions in Different Forms" 
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