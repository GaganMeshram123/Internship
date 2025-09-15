import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function PropertiesOfProductSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
    {
      id: 'product-properties-concept',
      conceptId: 'product-properties',
      conceptName: 'Properties of Product (Multiplication)',
      type: 'learning',
      description: 'Understanding the fundamental properties of multiplication.'
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Core Properties of Multiplication</h2>
          
          {/* Inner Container: Commutative Property */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">1. Commutative Property (Order Doesn't Matter)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              This rule states that you can swap the order of numbers when multiplying, and you'll still get the same answer.
            </p>
            <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
              <p><strong>Example:</strong> <InlineMath>{'5 \\times 2 = 10'}</InlineMath> is the same as <InlineMath>{'2 \\times 5 = 10'}</InlineMath></p>
            </div>
          </div>

          {/* Inner Container: Associative Property */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">2. Associative Property (Grouping Doesn't Matter)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              When multiplying three or more numbers, you can change how you group them with parentheses, and the result will not change.
            </p>
            <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
              <p><strong>Example:</strong> <InlineMath>{'(2 \\times 3) \\times 4 = 24'}</InlineMath> is the same as <InlineMath>{'2 \\times (3 \\times 4) = 24'}</InlineMath></p>
            </div>
          </div>
        </div>
        
        {/* Outer Container: Right Panel */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
           <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Fundamental Rules</h2>
          
           {/* Inner Container: Distributive Property */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">3. Distributive Property (Links × and +)</h3>
             <p className="text-slate-600 dark:text-slate-400">
                Multiplying a number by a sum is the same as multiplying each part of the sum separately and then adding the results.
             </p>
             <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
                <p><strong>Example:</strong> <InlineMath>{'5 \\times (2 + 3) = 25'}</InlineMath> is the same as <InlineMath>{'(5 \\times 2) + (5 \\times 3) = 25'}</InlineMath></p>
             </div>
          </div>
          
           {/* Inner Container: Identity & Zero Properties */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">4. Identity and Zero Properties</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400">
                <li>
                    <strong>Identity Property:</strong> Any number multiplied by 1 is itself (e.g., <InlineMath>{'17 \\times 1 = 17'}</InlineMath>).
                </li>
                 <li>
                    <strong>Zero Property:</strong> Any number multiplied by 0 is always 0 (e.g., <InlineMath>{'42 \\times 0 = 0'}</InlineMath>).
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="properties-of-product"
      slideTitle="Properties of Product"
      moduleId="irrational-numbers" // You may want to adjust this to a more general module
      submoduleId="operations"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}