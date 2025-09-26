import React, { useState } from 'react';
import { SlideComponentWrapper, TrackedInteraction, Interaction, InteractionResponse } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function LinearModelsSlide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: 'what-are-linear-models', conceptId: 'what-are-linear-models', conceptName: 'What are Linear Models?', type: 'learning' }];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
      <div className="p-4 md:p-8 text-slate-900 dark:text-slate-100 h-full flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">What are Linear Models?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          
          {/* Left Column: The Idea */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Beyond Perfect Lines</h3>
            <p>So far, we've studied perfect linear equations where all points fall on a single straight line. But the real world is often messy!</p>
            <p className="mt-2">For example, the more hours you study, the better your marks might be, but it's not a perfect relationship.</p>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-grow flex flex-col justify-center">
                <p className="font-bold">Definition:</p>
                <p>A **linear model** is a straight line (<InlineMath>{'y = mx + b'}</InlineMath>) that helps us understand and make predictions about real-world data that is *approximately* linear.</p>
            </div>
          </div>

          {/* Right Column: Real-World Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Example: Cricket Score</h3>
            <p>Think about a cricket team's score during a match. The score generally increases, but not by the exact same amount each over.</p>
             <div className="my-3 border rounded-lg overflow-hidden border-slate-300 dark:border-slate-600 text-sm">
                <div className="flex bg-slate-100 dark:bg-slate-700 font-bold">
                    <div className="w-1/2 text-center p-2 border-r">Overs (x)</div>
                    <div className="w-1/2 text-center p-2">Runs (y)</div>
                </div>
                <div className="flex border-t"><div className="w-1/2 text-center p-2 border-r">5</div><div className="w-1/2 text-center p-2">40</div></div>
                <div className="flex border-t"><div className="w-1/2 text-center p-2 border-r">10</div><div className="w-1/2 text-center p-2">85</div></div>
                <div className="flex border-t"><div className="w-1/2 text-center p-2 border-r">15</div><div className="w-1/2 text-center p-2">130</div></div>
            </div>
            <p>The rate of scoring isn't perfectly constant, but there is a clear **linear trend** (the score goes up in a roughly straight line).</p>
            <p className="mt-2">We can use a linear model to approximate their scoring rate and predict the final score.</p>
          </div>
        </div>
      </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="what-are-linear-models" 
            slideTitle="What are Linear Models?" 
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