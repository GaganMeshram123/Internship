import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
// FIX: Corrected the import path from 'common--components' to 'common-components'.
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function IrrationalProductSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-product-concept',
      conceptId: 'irrational-product',
      conceptName: 'Product of Irrational Numbers',
      type: 'learning',
      description: 'Understanding the product of irrational numbers and its possible outcomes.'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Outer Container: Left Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Irrational × Irrational</h2>
          
          {/* Inner Container: Rational Outcome */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Outcome 1: The Product is RATIONAL 🎯</h3>
            <p className="text-slate-600 dark:text-slate-400">
              This can happen if the irrational numbers "complete" each other.
            </p>
            <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
              <p><strong>Example:</strong> <InlineMath>{'\\sqrt{2} \\times \\sqrt{8} = \\sqrt{16} = 4'}</InlineMath></p>
            </div>
          </div>

          {/* Inner Container: Irrational Outcome */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Outcome 2: The Product is IRRATIONAL 🌀</h3>
            <p className="text-slate-600 dark:text-slate-400">
              This is the more common result when the numbers don't simplify perfectly.
            </p>
            <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
              <p><strong>Example:</strong> <InlineMath>{'\\sqrt{3} \\times \\sqrt{5} = \\sqrt{15}'}</InlineMath></p>
            </div>
          </div>
        </div>
        
        {/* Outer Container: Right Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Rational × Irrational</h2>
          
           {/* Inner Container: The Rule */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Predictable Case</h3>
             <p className="text-slate-600 dark:text-slate-400">
                The product of a non-zero rational number and an irrational number is <strong>always irrational</strong>.
             </p>
             <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                <p><strong>Example:</strong> <InlineMath>{'3 \\times \\pi = 3\\pi'}</InlineMath></p>
             </div>
          </div>
          
           {/* Inner Container: The Exception */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Big Exception: Multiplying by Zero</h3>
            <p className="text-slate-600 dark:text-slate-400">
                Zero is the only rational number that changes the outcome. Anything multiplied by zero is zero.
            </p>
            <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                <p><strong>Example:</strong> <InlineMath>{'0 \\times \\pi = 0'}</InlineMath></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="irrational-product-examples-simple"
      slideTitle="Examples of Irrational Products"
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