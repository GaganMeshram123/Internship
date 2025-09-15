import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

// --- Data for the Proof Steps ---
const proofSteps = [
  {
    title: "Step 1: Assume the Opposite",
    text: "We'll assume that the square root of 2 is a rational number. This means it can be written as a simplified fraction p/q, where p and q have no common factors.",
    math: "\\sqrt{2} = \\frac{p}{q}",
  },
  {
    title: "Step 2: Square Both Sides",
    text: "To eliminate the square root, we square both sides and rearrange the equation. This shows that p² must be an even number, which means p itself must also be even.",
    math: "p^2 = 2q^2",
  },
  {
    title: "Step 3: The Substitution",
    text: "Since p is even, we can write it as 2k. Substituting this back into our equation reveals that q² is also even, which means q must be even too.",
    math: "q^2 = 2k^2",
  },
  {
    title: "Step 4: The Contradiction",
    text: "Our logic has led to a contradiction! We proved that both p and q are even, meaning they share a common factor of 2. This breaks our initial rule that the fraction p/q was simplified.",
    math: "\\text{p and q are both even}",
  },
  {
    title: "Step 5: The Conclusion",
    text: "Because our initial assumption led to an impossible situation, the assumption must be false. Therefore, the square root of 2 must be irrational.",
    math: "\\sqrt{2} \\text{ is irrational}",
  }
];

// --- Main Slide Component ---
export default function ProvingIrrationalitySlide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideInteractions: Interaction[] = [
      { id: 'proof-by-contradiction-sqrt2', conceptId: 'proof-by-contradiction', conceptName: 'Proof for Sqrt(2)', type: 'learning', description: 'Following the step-by-step proof for the irrationality of the square root of 2.' }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
      setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const currentStepData = proofSteps[currentStep];

  const slideContent = (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Panel: Explanation */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-md">
          {/* FIX: Replaced the broken heading with the new, corrected title. */}
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
  The Classic Proof: Why the <InlineMath>{'\\sqrt{2}'}</InlineMath> is Irrational
</h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Method: Proof by Contradiction</h3>
            <p className="text-slate-600 dark:text-slate-400">
              To prove a statement is true, we start by assuming it's <strong>false</strong>. If this assumption leads to a logical impossibility (a contradiction), then our original statement must have been true.
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Follow the Steps</h3>
             <p className="text-slate-600 dark:text-slate-400">
                Use the "Next" and "Back" buttons on the right to walk through the proof. Notice how each step logically follows from the previous one.
             </p>
          </div>
        </div>
        
        {/* Right Panel: Interactive Proof Steps */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-md flex flex-col">
          <div className="flex-grow flex flex-col text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex-grow flex flex-col justify-center"
              >
                <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">{currentStepData.title}</h4>
                <p className="text-slate-700 dark:text-slate-300 mb-6">{currentStepData.text}</p>
                
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-6 min-h-[10rem] flex items-center justify-center">
                    <BlockMath>{currentStepData.math}</BlockMath>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="px-5 py-2 rounded-lg font-bold text-slate-700 bg-slate-200 dark:text-slate-200 dark:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              Back
            </button>
            <span className="text-sm font-semibold text-slate-500">Step {currentStep + 1} of {proofSteps.length}</span>
            <button
              onClick={() => setCurrentStep(s => Math.min(proofSteps.length - 1, s + 1))}
              disabled={currentStep === proofSteps.length - 1}
              className="px-5 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="proof-by-contradiction-sqrt2"
      slideTitle="Proof by Contradiction: √2"
      moduleId="irrational-numbers"
      submoduleId="proofs"
      interactions={localInteractions}
    >
      <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
        {slideContent}
      </TrackedInteraction>
    </SlideComponentWrapper>
  );
}