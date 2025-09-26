import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ComparingLinearFunctionsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'real-world-comparisons', conceptId: 'real-world-comparisons', conceptName: 'Real-World Comparisons', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Real-World Comparison: Which Taxi is Cheaper?</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">You need to book a taxi for a 10 km trip. Which company offers a better price?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Company A & B */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Company A (Equation)</h3>
            <p className="p-3 text-center bg-slate-100 dark:bg-slate-700 rounded-md font-mono"><InlineMath>{'y = 18x + 25'}</InlineMath></p>
            <ul className="list-disc pl-5 mt-3 text-sm">
                <li>Initial Fee (b): ₹25</li>
                <li>Cost per km (m): ₹18</li>
            </ul>
            <hr className="my-4"/>
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Company B (Graph)</h3>
            <div className="bg-slate-100 dark:bg-slate-900/50 mt-2 rounded-lg flex items-center justify-center p-2 border">
                <p className="text-slate-500 text-sm">[Graph showing a line starting at (0, 30) and passing through (2, 60)]</p>
            </div>
            <ul className="list-disc pl-5 mt-3 text-sm">
                <li>Initial Fee (b): ₹30 (where the line crosses the y-axis)</li>
                <li>Cost per km (m): <InlineMath>{'m = \\frac{60 - 30}{2 - 0} = \\frac{30}{2} = 15'}</InlineMath> (₹15)</li>
            </ul>
          </div>

          {/* Right Column: Comparison & Decision */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Comparison</h3>
            <table className="w-full border text-center text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700"><tr><th className='border-r p-1'>Feature</th><th className='border-r p-1'>Company A</th><th>Company B</th></tr></thead>
                <tbody>
                    <tr><td className='border-r p-1 font-semibold'>Initial Fee (b)</td><td className='border-r p-1'>₹25</td><td>₹30</td></tr>
                    <tr className="bg-slate-50 dark:bg-slate-900/50"><td className='border-r p-1 font-semibold'>Cost per km (m)</td><td className='border-r p-1'>₹18</td><td>₹15</td></tr>
                </tbody>
            </table>
             <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mt-6 mb-3">Decision for a 10 km Trip</h3>
             <div className="space-y-3">
                <div>
                    <p><strong>Company A Cost:</strong></p>
                    <p className="text-center p-2 bg-slate-100 dark:bg-slate-700 rounded-md"><InlineMath>{'y = 18(10) + 25 = 180 + 25 = ₹205'}</InlineMath></p>
                </div>
                 <div>
                    <p><strong>Company B Cost:</strong></p>
                    <p className="text-center p-2 bg-slate-100 dark:bg-slate-700 rounded-md"><InlineMath>{'y = 15(10) + 30 = 150 + 30 = ₹180'}</InlineMath></p>
                </div>
             </div>
             <p className="mt-auto p-3 bg-green-100 dark:bg-green-900/50 rounded-md text-center font-bold">
                For a 10 km trip, Company B is cheaper.
            </p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="real-world-comparisons" 
            slideTitle="Real-World Comparisons" 
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