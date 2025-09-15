import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- Main Slide Component ---
export default function IrrationalDivisionWithSymbolsSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    { 
      id: 'irrational-division-concept-symbols', 
      conceptId: 'irrational-division', 
      conceptName: 'Division of Irrationals', 
      type: 'learning', 
      description: 'Understanding the outcomes of dividing irrational numbers.' 
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Outer Container: Left Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Irrational ÷ Irrational</h2>
          
          {/* Inner Container: Rational Outcome */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Outcome 1: The Result is RATIONAL</h3>
            <p className="text-slate-600 dark:text-slate-400">
              This can happen if the irrational numbers simplify perfectly.
            </p>
            <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
              <strong>Example:</strong> <InlineMath>{'\\frac{\\sqrt{18}}{\\sqrt{2}} = \\sqrt{9} = 3'}</InlineMath>
            </div>
          </div>

          {/* Inner Container: Irrational Outcome */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Outcome 2: The Result is IRRATIONAL</h3>
            <p className="text-slate-600 dark:text-slate-400">
              This is the more common result when the numbers don't simplify neatly.
            </p>
            <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                <strong>Example:</strong> <InlineMath>{'\\frac{\\sqrt{10}}{\\sqrt{2}} = \\sqrt{5}'}</InlineMath>
            </div>
          </div>
        </div>
        
        {/* Outer Container: Right Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Rational ÷ Irrational</h2>
          
           {/* Inner Container: The Rule */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Predictable Case</h3>
             <p className="text-slate-600 dark:text-slate-400">
                The result is <strong>always irrational</strong> (unless the rational number is 0). You often need to simplify by "rationalizing the denominator."
             </p>
             <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                <strong>Example:</strong> <InlineMath>{'\\frac{6}{\\sqrt{3}} = 2\\sqrt{3}'}</InlineMath>
             </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="irrational-division-symbols"
      slideTitle="Division of Irrational Numbers"
      moduleId="irrational-numbers"
      submoduleId="operations"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}