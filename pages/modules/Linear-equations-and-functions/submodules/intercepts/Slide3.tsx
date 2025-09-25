import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, TrackedInteraction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function InterceptsSlide3() {
    const slideInteractions: Interaction[] = [{ id: 'finding-from-equation', conceptId: 'finding-from-equation', conceptName: 'Finding Intercepts from an Equation', type: 'learning' }];
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };
    
    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Finding Intercepts from an Equation</h2>
        <p className="text-center text-lg mb-4">Equation: <InlineMath>{'2x + 3y = 12'}</InlineMath></p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          {/* Left Column: Finding Y-Intercept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">1. Find the Y-Intercept</h3>
            <p className="font-bold">The Rule: Set <InlineMath>{'x = 0'}</InlineMath> and solve for <InlineMath>{'y'}</InlineMath>.</p>
            <div className="mt-4 flex-grow flex flex-col justify-center space-y-2">
                <p><strong>Substitute x=0:</strong></p>
                <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'2(0) + 3y = 12'}</InlineMath></div>
                <p><strong>Solve for y:</strong></p>
                <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md">
                    <p><InlineMath>{'0 + 3y = 12'}</InlineMath></p>
                    <p><InlineMath>{'3y = 12'}</InlineMath></p>
                    <p><InlineMath>{'y = 4'}</InlineMath></p>
                </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4 text-center">
                <p className="font-semibold">The Y-Intercept is the point <strong className="text-lg">(0, 4)</strong>.</p>
            </div>
          </div>

          {/* Right Column: Finding X-Intercept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">2. Find the X-Intercept</h3>
            <p className="font-bold">The Rule: Set <InlineMath>{'y = 0'}</InlineMath> and solve for <InlineMath>{'x'}</InlineMath>.</p>
            <div className="mt-4 flex-grow flex flex-col justify-center space-y-2">
                <p><strong>Substitute y=0:</strong></p>
                <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md"><InlineMath>{'2x + 3(0) = 12'}</InlineMath></div>
                <p><strong>Solve for x:</strong></p>
                <div className="p-2 text-center bg-slate-100 dark:bg-slate-900 rounded-md">
                    <p><InlineMath>{'2x + 0 = 12'}</InlineMath></p>
                    <p><InlineMath>{'2x = 12'}</InlineMath></p>
                    <p><InlineMath>{'x = 6'}</InlineMath></p>
                </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg p-3 mt-4 text-center">
                <p className="font-semibold">The X-Intercept is the point <strong className="text-lg">(6, 0)</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="finding-from-equation" 
            slideTitle="Finding Intercepts from an Equation" 
            moduleId="linear-equations-and-functions" 
            submoduleId="intercepts"
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