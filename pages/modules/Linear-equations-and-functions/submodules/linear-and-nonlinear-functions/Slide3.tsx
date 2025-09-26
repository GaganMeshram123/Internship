import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearAndNonlinearFunctionsSlide3() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'linear-vs-nonlinear-equations', conceptId: 'linear-vs-nonlinear-equations', conceptName: 'Identifying from an Equation', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Identifying from an Equation</h2>
        <p className="text-center text-slate-600 dark:text-slate-300 -mt-4 mb-6">Look for patterns in the equation's variables.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Linear Equation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3 text-center">✅ Linear Equation</h3>
            <p className="text-sm">In a linear equation:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>`x` and `y` only have a power of 1 (no <InlineMath>{'x^2'}</InlineMath>, <InlineMath>{'y^3'}</InlineMath>, etc.).</li>
                <li>`x` and `y` are not multiplied together (no <InlineMath>{'xy'}</InlineMath>).</li>
                <li>`x` and `y` are not in the denominator (no <InlineMath>{'1/x'}</InlineMath>).</li>
            </ul>
            <div className="my-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-mono text-center text-lg"><InlineMath>{'y = 3x + 2'}</InlineMath></p>
                <p className="font-mono text-center text-lg"><InlineMath>{'2x - y = 5'}</InlineMath></p>
            </div>
            <p className="mt-auto p-3 bg-green-100 dark:bg-green-900/50 rounded-md text-center">
                These equations fit the <InlineMath>{'y = mx + b'}</InlineMath> form and will produce a straight line.
            </p>
          </div>

          {/* Right Column: Nonlinear Equation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3 text-center">❌ Nonlinear Equation</h3>
            <p className="text-sm">If an equation has any of the following, it's nonlinear:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Variables with exponents other than 1 (e.g., <InlineMath>{'x^2'}</InlineMath>, <InlineMath>{'y^3'}</InlineMath>).</li>
                <li>Variables multiplied together (e.g., <InlineMath>{'xy'}</InlineMath>).</li>
                <li>Variables in the denominator (e.g., <InlineMath>{'y = 1/x'}</InlineMath>).</li>
                <li>Variables inside square roots or absolute values.</li>
            </ul>
            <div className="my-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-mono text-center text-lg"><InlineMath>{'y = x^2 - 4'}</InlineMath></p>
                <p className="font-mono text-center text-lg"><InlineMath>{'y = \\sqrt{x}'}</InlineMath></p>
            </div>
            <p className="mt-auto p-3 bg-red-100 dark:bg-red-900/30 rounded-md text-center">
                These equations have a changing rate of change and will produce a curve.
            </p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="linear-vs-nonlinear-equations" 
            slideTitle="Identifying from an Equation" 
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