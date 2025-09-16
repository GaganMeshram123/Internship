import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function EulersFormulaSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideInteractions: Interaction[] = [
        { id: 'eulers-formula-concept', conceptId: 'eulers-formula', conceptName: 'Euler\'s Formula', type: 'learning', description: 'Understanding the connection between e, i, and trigonometry.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Panel: Theory */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Euler's Formula: The Big Picture</h2>
          <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
            <p>How do we connect <InlineMath>e</InlineMath> (the number for growth) with circles? The answer is the imaginary number, <InlineMath>i</InlineMath>.</p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Intuition: Growth that Rotates</h3>
              {/* FIX: Ensured the formula is passed as a string */}
              <p>Growth in a normal direction (<InlineMath>{'e^x'}</InlineMath>) moves you along a straight line. But growth in an **imaginary direction** (<InlineMath>{'e^{ix}'}</InlineMath>) doesn't make you bigger—it **rotates** you around a circle.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Euler's Formula</h3>
              <p className="text-xl font-bold text-center text-slate-800 dark:text-slate-200">
                <BlockMath>{'e^{ix} = \\cos(x) + i \\sin(x)'}</BlockMath>
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Panel: Visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex items-center justify-center">
            <div className="w-full text-center">
                
                <p className="mt-2 text-slate-600 dark:text-slate-400">Euler's formula links exponential functions and trigonometry.</p>
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="trig-intro-eulers"
      slideTitle="Euler's Formula: The Big Picture"
      moduleId="intuitive-trigonometry"
      submoduleId="how-to-learn-trigonometry-intuitively"
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