import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function RecognizingFunctionsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'functions-from-ordered-pairs', conceptId: 'functions-from-ordered-pairs', conceptName: 'Recognizing Functions from Ordered Pairs', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Recognizing Functions from Ordered Pairs</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">Look at the first number (the x-coordinate) in each pair. It cannot repeat with a different y-coordinate.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: IS a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">✅ IS a Function</h3>
            <p className="text-sm">In an ordered pair <InlineMath>{'(x, y)'}</InlineMath>, `x` is the input. Check if all the `x` values are unique.</p>
            <div className="my-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-mono text-center">{'{ (1, 2), (3, 6), (4, 8), (5, 10) }'}</p>
            </div>
            <p className="mt-auto p-3 bg-green-50 dark:bg-green-900/30 rounded-md">The inputs are 1, 3, 4, and 5. Since all inputs are different, this is a function.</p>
          </div>

          {/* Right Column: IS NOT a function */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">❌ IS NOT a Function</h3>
            <p className="text-sm">If you see the same `x` value paired with different `y` values, it's not a function.</p>
            <div className="my-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-mono text-center">{'{ (2, 4), (3, 6), '}<span className="text-red-500 font-bold">(2, 5)</span>{' }'}</p>
            </div>
            <p className="mt-auto p-3 bg-red-50 dark:bg-red-900/30 rounded-md">The input `2` is repeated and is paired with two different outputs, `4` and `5`. This breaks the rule.</p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="functions-from-ordered-pairs" 
            slideTitle="Recognizing Functions from Ordered Pairs" 
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