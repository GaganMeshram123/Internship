import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearModelsSlide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'making-predictions', conceptId: 'making-predictions', conceptName: 'Making Predictions', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">Making Predictions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Concept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">The Power of Prediction</h3>
            <p>The main reason we create a linear model is to make educated guesses about data we don't have.</p>
            
            <div className="mt-4 space-y-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <h4 className="font-bold">Interpolation</h4>
                    <p className="text-sm">Making a prediction a prediction **within** the range of your known data. This is usually reliable.</p>
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <h4 className="font-bold">Extrapolation</h4>
                    <p className="text-sm">Making a prediction **outside** the range of your known data. This can be less reliable but is still useful.</p>
                </div>
            </div>
          </div>

          {/* Right Column: Worked Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Predicting a Cricket Score</h3>
            <p className="text-sm italic">Imagine our line of best fit for the cricket data gave us the equation:</p>
            <div className="my-2 p-2 bg-slate-100 dark:bg-slate-700 text-center rounded-md font-bold"><InlineMath>{'y = 8.5x + 5'}</InlineMath></div>
            <p className="text-sm italic">Problem: Using this model, predict the team's score after 16 overs.</p>
            <ol className="list-decimal pl-5 mt-3 space-y-2 text-sm">
              <li>Substitute <InlineMath>{'x = 16'}</InlineMath> into the equation. <br/>
                <div className="p-1 my-1 text-center bg-slate-100 dark:bg-slate-700 rounded-md"><InlineMath>{'y = 8.5(16) + 5'}</InlineMath></div>
              </li>
              <li>Solve for <InlineMath>{'y'}</InlineMath>: <br/>
                <InlineMath>{'y = 136 + 5'}</InlineMath> <br/>
                <InlineMath>{'y = 141'}</InlineMath>
              </li>
              <li>
                <div className="p-2 mt-1 text-center bg-green-100 dark:bg-green-900/50 rounded-md font-bold">
                    Predicted Score: 141 runs
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="making-predictions" 
            slideTitle="Making Predictions" 
            moduleId="linear-equations-and-functions" 
            submoduleId="linear-models"
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