import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function ComparingLinearFunctionsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'comparing-y-intercepts', conceptId: 'comparing-y-intercepts', conceptName: 'Comparing y-intercepts (Initial Values)', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Comparing y-intercepts (Initial Values)</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">Which function has a higher starting point?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Function A */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Function A: Arjun's Bank Account</h3>
            <p className="text-sm">The graph shows the money in Arjun's account over several weeks.</p>
            <div className="flex-grow bg-slate-100 dark:bg-slate-900/50 my-4 rounded-lg flex items-center justify-center p-4 border">
                <p className="text-slate-500 text-sm">[Graph with x-axis "Weeks" and y-axis "Balance (₹)". The line starts at (0, 500) and goes up.]</p>
            </div>
            <p className="font-semibold">Finding the y-intercept:</p>
            <p className="text-sm">The y-intercept is where the line crosses the y-axis (at week 0).</p>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-center">
                y-intercept for Account A = <strong>500</strong> (Arjun started with ₹500)
            </p>
          </div>

          {/* Right Column: Function B */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Function B: Priya's Savings Plan</h3>
            <p className="text-sm">Priya's savings plan is described below:</p>
            <div className="my-4 p-4 text-center bg-slate-100 dark:bg-slate-700 rounded-md">
                "Priya starts her savings plan with <strong>₹300 in her piggy bank</strong>. She adds ₹50 each week."
            </div>
            <p className="font-semibold">Finding the y-intercept:</p>
            <p className="text-sm">The "initial value" or "starting amount" in a word problem is always the y-intercept.</p>
            <p className="mt-auto p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-center">
                y-intercept for Account B = <strong>300</strong> (Priya started with ₹300)
            </p>
          </div>
        </div>
        <div className="mt-6 p-3 bg-green-100 dark:bg-green-900/50 rounded-md text-center">
            {/* FIX: Replaced > with &gt; */}
            <strong>Comparison:</strong> Arjun's account had a higher initial value (500 &gt; 300).
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="comparing-y-intercepts" 
            slideTitle="Comparing y-intercepts (Initial Values)" 
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