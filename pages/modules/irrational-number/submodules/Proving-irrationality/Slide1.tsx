import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// Interface to define the props for GeometricProofVisualization
// This fixes the 'any' type error for currentStep
interface GeometricProofProps {
  currentStep: number;
}

// This component provides a visual, geometric representation of the proof.
const GeometricProofVisualization: React.FC<GeometricProofProps> = ({ currentStep }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.5 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        key={currentStep}
        className="flex justify-center items-center h-full w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {currentStep === 0 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.div
              className="w-48 h-48 border-4 border-blue-600 rounded-lg relative transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-full border-4 border-green-600 rounded-lg rotate-45 transform-origin-center"></div>
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {/* Fixed: Moved className to a wrapper div */}
                <div><InlineMath math="1" /></div>
                <div className="ml-16"><InlineMath math="1" /></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2"><InlineMath math="\sqrt{2}" /></div>
              </motion.div>
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-center">Initial Square</p>
            </motion.div>
          </motion.div>
        )}
        {currentStep === 1 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.div className="relative w-64 h-64">
              <motion.div
                className="absolute w-32 h-32 border-4 border-green-600 rounded-lg"
                initial={{ scale: 1 }}
                animate={{ scale: 2 }}
                transition={{ duration: 1 }}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold"
              >
                <InlineMath math="2q^2 = p^2" />
              </motion.div>
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-center">Larger Square Area</p>
            </motion.div>
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.div className="relative w-64 h-64">
              <motion.div
                className="absolute w-40 h-40 border-4 border-red-600 rounded-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold"
              >
                <InlineMath math="2q^2 = 4k^2" />
              </motion.div>
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm text-center">The square becomes larger</p>
            </motion.div>
          </motion.div>
        )}
        {currentStep === 3 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
            <motion.div className="flex flex-col items-center">
              <motion.div
                className="w-48 h-48 rounded-lg border-4 border-red-600 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-1/2 h-full absolute left-0 top-0 border-r-2 border-gray-600"></div>
                <div className="w-1/2 h-full absolute right-0 top-0 border-l-2 border-gray-600"></div>
                <div className="w-full h-1/2 absolute left-0 top-0 border-b-2 border-gray-600"></div>
                <div className="w-full h-1/2 absolute left-0 bottom-0 border-t-2 border-gray-600"></div>
              </motion.div>
              <p className="text-sm mt-2 text-center">Visualizing the common factor 2</p>
              <motion.div
                className="mt-6 p-4 bg-red-100 rounded-lg text-red-800"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p className="font-bold text-lg">
                  Contradiction! <br/> $p$ and $q$ share a factor of 2.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        {currentStep === 4 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
            <p className="text-xl font-bold text-center leading-relaxed">
              The only way to resolve the contradiction is to reject our initial assumption.<br/>
              Therefore, $\sqrt{2}$ must be irrational.
            </p>
            
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default function ProvingIrrationalitySlide1() {
  const [currentStep, setCurrentStep] = useState(0);

  const proofSteps = [
    {
      title: "Step 1: The Assumption",
      text: "We begin by assuming the opposite of what we want to prove. Let's assume that $\\sqrt{2}$ is a rational number. If it's rational, it can be written as a fraction $p/q$, where $p$ and $q$ are integers with no common factors (a simplified fraction).",
      math: "\sqrt{2} = \\frac{p}{q}",
      result: null
    },
    {
      title: "Step 2: Squaring Both Sides",
      text: "By squaring both sides of the equation, we can eliminate the square root. We see that $p^2$ is an even number, which means $p$ must also be even.",
      math: "2 = \\frac{p^2}{q^2} \\implies 2q^2 = p^2",
      result: null
    },
    {
      title: "Step 3: A New Substitution",
      text: "Since $p$ is even, we can write it as $2k$ for some integer $k$. We substitute this back into our equation to show that $q$ must also be even.",
      math: "2q^2 = (2k)^2 \\implies 2q^2 = 4k^2 \\implies q^2 = 2k^2",
      result: "This shows that $q^2$ is even, which means $q$ must also be even."
    },
    {
      title: "Step 4: The Contradiction",
      text: "We have concluded that both $p$ and $q$ are even. This means they share a common factor of 2. But this directly contradicts our initial assumption that the fraction $p/q$ was simplified and had no common factors. Our assumption must be false.",
      math: "\\text{p is even and q is even}",
      result: "This is a contradiction! Our initial assumption was wrong. Therefore, $\\sqrt{2}$ cannot be rational."
    },
    {
      title: "Final Conclusion",
      text: "Since our initial assumption led to a logical contradiction, the only possibility is that $\\sqrt{2}$ is not a rational number. It is, by definition, an irrational number.",
      math: "\sqrt{2} \\text{ is irrational}",
      result: null
    }
  ];

  const currentStepContent = proofSteps[currentStep];

  return (
    <div className="min-h-screen transition-colors duration-300 flex flex-col justify-center items-center bg-slate-50 text-slate-800">
      <div className="grid lg:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto">

        {/* Left Column: General Proof by Contradiction Explanation */}
        <div className="space-y-6">
          <div className="rounded-lg p-6 shadow-lg bg-white">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              Proof by Contradiction
            </h3>
            <div className="space-y-4 text-lg">
              <p className="leading-relaxed">
                To prove that a number is irrational, we often use a method called **proof by contradiction**. This method involves three key steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-4">
                <li>**Assume the Opposite:** We start by assuming the number is rational.</li>
                <li>**Show a Contradiction:** We then follow a logical chain of reasoning that leads to a statement that is clearly false or impossible.</li>
                <li>**Conclude:** Since our assumption led to a contradiction, the assumption must be false. Therefore, the original statement (that the number is irrational) must be true.</li>
              </ol>
              <p className="leading-relaxed mt-4">
                Let's apply this method to prove that $\sqrt{2}$ is irrational, a famous proof dating back to the ancient Greeks.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Step-by-Step Proof with Visualization */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="rounded-lg p-6 shadow-lg flex-grow flex flex-col bg-white">
            <h3 className="text-2xl font-bold text-blue-600 mb-6">
              Proof for $\sqrt{2}$
            </h3>

            {/* Dynamic Content: Text and Math */}
            <div className="flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h4 className="text-blue-700 font-medium text-lg mb-4">
                    {currentStepContent.title}
                  </h4>
                  <p className="text-slate-700 leading-relaxed mb-6">
                    {currentStepContent.text}
                  </p>
                  <div className="p-4 rounded-lg font-mono bg-gray-100 text-gray-800">
                    <BlockMath math={currentStepContent.math} />
                  </div>
                  {currentStepContent.result && (
                    <div className="mt-4 rounded-lg p-4 text-center transition-colors bg-green-100 text-green-800">
                      <p className="font-semibold text-lg">{currentStepContent.result}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Geometric Visualization Component */}
            <div className="mt-8 flex-shrink-0 w-full h-64 flex justify-center items-center">
              <GeometricProofVisualization currentStep={currentStep} />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-6 py-3 rounded-full transition-all duration-300 transform active:scale-95 disabled:opacity-50 font-bold bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:bg-gray-100"
              >
                ← Previous
              </button>
              <span className="text-sm font-semibold text-gray-500">
                Step {currentStep + 1} of {proofSteps.length}
              </span>
              <button
                onClick={() => setCurrentStep(Math.min(proofSteps.length - 1, currentStep + 1))}
                disabled={currentStep === proofSteps.length - 1}
                className="px-6 py-3 rounded-full transition-all duration-300 transform active:scale-95 disabled:opacity-50 font-bold bg-blue-600 hover:bg-blue-500 text-white disabled:bg-blue-200"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}