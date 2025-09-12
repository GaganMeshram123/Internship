/*
 * Hey there! This is a React file for an interactive slide.
 * Its goal is to teach the proof that the square root of 2 is irrational.
 * I've added comments to explain how it all works, step-by-step.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';

// --- 1. THE DATA FOR OUR PROOF ---
// It's a good practice to keep our data (like text and math formulas) separate
// from our components (the visual parts). This makes the code much cleaner.

const proofSteps = [
  {
    title: "Step 1: The Assumption",
    // This is the story for the first step.
    text: "Okay, let's start with a trick. We'll assume the opposite of what we want to prove. So, let's pretend √2 IS a rational number (a simple fraction). That means we can write it as p/q, where the fraction is as simplified as possible (like 3/5, not 6/10).",
    math: "\\sqrt{2} = \\frac{p}{q}",
  },
  {
    title: "Step 2: Get Rid of the Square Root",
    text: "Square roots are tricky, so let's get rid of it by squaring both sides. This gives us a new equation. From this, we can see that p² has to be an even number. And if a number's square is even, the number itself must also be even.",
    math: "2 = \\frac{p^2}{q^2} \\implies 2q^2 = p^2",
  },
  {
    title: "Step 3: A Smart Substitution",
    text: "Since we know p is even, we can describe it in another way: p = 2k (which is just the definition of an even number). Let's plug '2k' back into our equation where 'p' used to be.",
    math: "2q^2 = (2k)^2 \\implies 2q^2 = 4k^2 \\implies q^2 = 2k^2",
    result: "Look! This means q² is also even, so q must be even too."
  },
  {
    title: "Step 4: The 'Aha!' Moment (The Contradiction)",
    text: "Wait a minute... We just proved that both p AND q have to be even. If they're both even, they can both be divided by 2. This means our fraction p/q was NOT simplified after all!",
    math: "\\text{p is even AND q is even}",
    result: "This is a CONTRADICTION! It breaks our first rule."
  },
  {
    title: "Step 5: The Conclusion",
    text: "Because our starting assumption led us to an impossible situation (a contradiction), our assumption must have been wrong from the very beginning. The only thing left to conclude is the truth:",
    math: "\\sqrt{2} \\text{ is irrational}",
  }
];


// --- 2. VISUAL COMPONENTS FOR EACH STEP ---
// Instead of one giant, confusing component for the animation,
// we can make a small, simple component for each step. This is much easier to manage.

const Step0Viz = () => ( /* Shows the initial square */
  <motion.div className="flex flex-col items-center">
    <motion.div className="w-48 h-48 border-4 border-blue-600 relative">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-green-600 rotate-45"></div>
      <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-slate-700 dark:text-slate-300">Assume a square with sides <InlineMath math="q"/></p>
    </motion.div>
  </motion.div>
);
const Step1Viz = () => ( /* Shows the area relationships */
  <motion.div className="relative w-64 h-64 border-4 border-blue-600 flex justify-center items-center">
    <motion.div className="w-32 h-32 border-4 border-green-600 flex justify-center items-center" initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <div className="text-xl font-bold"><InlineMath math="q^2" /></div>
    </motion.div>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="absolute bottom-4 text-2xl font-bold"><BlockMath math="p^2 = 2q^2" /></motion.div>
    <p className="absolute -bottom-8 text-sm text-slate-700 dark:text-slate-300">Looking at the areas</p>
  </motion.div>
);
const Step2Viz = () => ( /* Shows the substitution */
  <motion.div className="relative w-64 h-64 flex justify-center items-center">
    <motion.div className="w-40 h-40 border-4 border-red-500 flex justify-center items-center" initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <div className="text-xl font-bold text-red-700 dark:text-red-300"><InlineMath math="q^2 = 2k^2" /></div>
    </motion.div>
    <p className="absolute -bottom-8 text-sm text-slate-700 dark:text-slate-300">Substituting <InlineMath math="p=2k"/></p>
  </motion.div>
);
const Step3Viz = () => ( /* Shows the contradiction */
  <motion.div className="flex flex-col items-center gap-4">
    <div className="font-mono text-center p-4 bg-red-100 dark:bg-red-900/50 rounded-lg">
      <p className="text-red-800 dark:text-red-200">p = 2k (p is even)</p>
      <p className="text-red-800 dark:text-red-200">q = 2m (q is even)</p>
    </div>
    <p className="text-sm text-center text-slate-700 dark:text-slate-300">Both p and q share a factor of 2.</p>
    <motion.div className="mt-4 p-4 bg-red-100 dark:bg-red-900/50 rounded-lg" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
      <p className="font-bold text-lg text-center text-red-800 dark:text-red-200">Contradiction!</p>
    </motion.div>
  </motion.div>
);
const Step4Viz = () => ( /* Shows the final conclusion */
  <motion.div className="text-center">
    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">Our assumption was wrong!</p>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 p-6 bg-green-100 dark:bg-green-900/50 rounded-lg">
      <p className="text-xl font-semibold text-green-800 dark:text-green-200">Conclusion: <InlineMath math="\sqrt{2}"/> is Irrational ✅</p>
    </motion.div>
  </motion.div>
);


// This is a clever trick! We put all our step components into an array.
// Now we can easily pick the one we want using its index (like visualizationComponents[0]).
const visualizationComponents = [Step0Viz, Step1Viz, Step2Viz, Step3Viz, Step4Viz];

// This component's only job is to pick the correct visualization from the array and animate it in.
const GeometricProofVisualization = ({ currentStep }: { currentStep: number }) => {
  const StepComponent = visualizationComponents[currentStep];

  // 'AnimatePresence' is a cool tool from Framer Motion. It allows components to animate *out* when they're removed.
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep} // The 'key' is important! It tells React this is a *new* thing to animate in.
        className="flex justify-center items-center h-full w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        {StepComponent && <StepComponent />}
      </motion.div>
    </AnimatePresence>
  );
};


// --- 3. THE MAIN SLIDE COMPONENT ---
// This is the "boss" component that puts everything together.
export default function ProvingIrrationalitySlide1() {
  // 'useState' is a React Hook. It's like giving our component a memory.
  // Here, we're asking it to remember a number called 'currentStep', starting at 0.
  // 'setCurrentStep' is the *only* way we can update that number.
  const [currentStep, setCurrentStep] = useState(0);
  const [localInteractions] = useState<Record<string, InteractionResponse>>({});

  const slideContent = (
    // This is the main layout. It's a two-column grid on large screens.
    <div className="min-h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl w-full">
        
        {/* Left Column: The Static Introduction */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border dark:border-slate-700">
          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">The Game Plan: Proof by Contradiction</h3>
          <p className="text-slate-700 dark:text-slate-300">We'll use a sneaky method to prove our point. It has 3 main moves:</p>
          <ol className="list-decimal list-inside space-y-2 mt-4 text-slate-700 dark:text-slate-300">
              <li><strong>Assume the Opposite:</strong> First, we pretend our opponent is right.</li>
              <li><strong>Show It's Impossible:</strong> We follow the logic until we find a major flaw.</li>
              <li><strong>Declare Victory:</strong> The flaw proves our opponent must be wrong, so we must be right!</li>
          </ol>
        </div>

        {/* Right Column: The Interactive Stepper */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border dark:border-slate-700 flex flex-col">
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
              >
                  <h4 className="text-blue-700 dark:text-blue-300 font-semibold text-lg mb-2">{proofSteps[currentStep].title}</h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{proofSteps[currentStep].text}</p>
                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/50"><BlockMath math={proofSteps[currentStep].math} /></div>
                  {proofSteps[currentStep].result && (
                      <div className="mt-4 p-3 rounded-lg bg-green-100 dark:bg-green-900/50 font-semibold text-green-800 dark:text-green-200">
                          {proofSteps[currentStep].result}
                      </div>
                  )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* The visualization area */}
          <div className="h-64 mt-6 flex-shrink-0">
            <GeometricProofVisualization currentStep={currentStep} />
          </div>
          
          {/* The navigation buttons */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t dark:border-slate-700">
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
              className="px-5 py-2 rounded-lg font-bold bg-slate-200 dark:bg-slate-700 disabled:opacity-40"
            >
              Back
            </button>
            <span className="text-sm font-semibold text-slate-500">Step {currentStep + 1} / {proofSteps.length}</span>
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={currentStep === proofSteps.length - 1}
              className="px-5 py-2 rounded-lg font-bold bg-blue-600 text-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    // This 'Wrapper' is likely a component from your project that handles slide titles, etc.
    <SlideComponentWrapper
      slideId="irrationality-proof-sqrt2"
      slideTitle="Proof by Contradiction: √2"
      moduleId="irrational-number"
      submoduleId="Proving-irrationality"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}