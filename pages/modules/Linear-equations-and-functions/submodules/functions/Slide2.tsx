import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function FunctionsSlide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'inputs-and-outputs', conceptId: 'inputs-and-outputs', conceptName: 'Inputs and Outputs', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Inputs and Outputs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: Vocabulary */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Function Vocabulary</h3>
            <div>
              <h4 className="text-lg font-semibold">Input (<InlineMath>{'x'}</InlineMath>)</h4>
              <p className="text-sm">The value you start with. It's the <strong>independent variable</strong>.</p>
              <p className="mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-md">The set of all possible inputs is called the <strong className="text-blue-600 dark:text-blue-400">Domain</strong>.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">Output (<InlineMath>{'y'}</InlineMath>)</h4>
              <p className="text-sm">The value you get after applying the rule. It's the <strong>dependent variable</strong>.</p>
              <p className="mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-md">The set of all possible outputs is called the <strong className="text-blue-600 dark:text-blue-400">Range</strong>.</p>
            </div>
          </div>

          {/* Right Column: Mapping Diagram */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Mapping Inputs to Outputs</h3>
            <p>A mapping diagram helps visualize the function. Let's use the rule <InlineMath>{'y = 3x + 1'}</InlineMath>.</p>
            <div className="flex-grow my-4 flex items-center justify-around">
                {/* Domain */}
                <div className="text-center">
                    <div className="font-bold mb-2">Domain (Inputs)</div>
                    <div className="border-2 border-blue-400 rounded-xl p-4 space-y-3">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                    </div>
                </div>
                {/* Arrows */}
                <div className="text-2xl text-slate-500 flex flex-col space-y-3">
                    <span>→</span><span>→</span><span>→</span><span>→</span>
                </div>
                {/* Range */}
                <div className="text-center">
                    <div className="font-bold mb-2">Range (Outputs)</div>
                    <div className="border-2 border-blue-400 rounded-xl p-4 space-y-3">
                        <div>4</div>
                        <div>7</div>
                        <div>10</div>
                        <div>13</div>
                    </div>
                </div>
            </div>
            <p className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">This diagram shows a function because each input from the Domain maps to **exactly one** output in the Range.</p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="inputs-and-outputs" 
            slideTitle="Inputs and Outputs" 
            moduleId="linear-equations-and-functions" 
            submoduleId="functions"
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