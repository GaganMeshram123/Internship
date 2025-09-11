import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ProvingIrrationalitySlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const { isDarkMode } = useThemeContext();

  const proofSteps = [
    {
      title: "Step 1: The Assumption",
      text: "We begin by assuming the opposite of what we want to prove. Let's assume that $\\sqrt{2}$ is a rational number. If it's rational, it can be written as a fraction $p/q$, where $p$ and $q$ are integers with no common factors (a simplified fraction).",
      math: "\sqrt{2} = \\frac{p}{q}",
      result: null
    },
    {
      title: "Step 2: Squaring Both Sides",
      text: "By squaring both sides of the equation, we can eliminate the square root.",
      math: "2 = \\frac{p^2}{q^2} \\implies 2q^2 = p^2",
      result: "This shows that $p^2$ is an even number. Therefore, $p$ must also be even."
    },
    {
      title: "Step 3: A New Substitution",
      text: "Since $p$ is even, we can write it as $2k$ for some integer $k$. We substitute this back into our equation.",
      math: "2q^2 = (2k)^2 \\implies 2q^2 = 4k^2",
      result: "Dividing by 2 gives us $q^2 = 2k^2$, which means $q^2$ is even. Therefore, $q$ must also be even."
    },
    {
      title: "Step 4: The Contradiction",
      text: "From our steps, we have concluded that both $p$ and $q$ are even. This means they share a common factor of 2. But this directly contradicts our initial assumption that the fraction $p/q$ was simplified and had no common factors. Our assumption must be false.",
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

  const slideInteractions: Interaction[] = [
    {
      id: 'proving-irrationality-intro',
      conceptId: 'proving-irrationality',
      conceptName: 'Proof by Contradiction',
      type: 'learning',
      description: 'Understanding the method of proof by contradiction for irrational numbers'
    },
    {
      id: 'sqrt2-proof-steps',
      conceptId: 'proof-of-sqrt2',
      conceptName: 'Proof for Square Root of 2',
      type: 'learning',
      description: 'Following the step-by-step logic to prove the irrationality of sqrt(2)'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const slideContent = (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-slate-50 text-slate-800'
    }`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        <div className="space-y-6">
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800' 
                : 'bg-white'
            }`}>
              <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">
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
          </TrackedInteraction>
        </div>

        <div className="space-y-6">
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800' 
                : 'bg-white'
            }`}>
              <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">
                Proof for $\sqrt{2}$
              </h3>
              
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50'
                    }`}
                  >
                    ← Previous
                  </button>
                  
                  <h4 className="text-blue-700 dark:text-blue-300 font-medium text-lg flex-grow text-center mx-2">
                    {currentStepContent.title}
                  </h4>
                  
                  <button
                    onClick={() => setCurrentStep(Math.min(proofSteps.length - 1, currentStep + 1))}
                    disabled={currentStep === proofSteps.length - 1}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-blue-700 hover:bg-blue-600 text-white disabled:opacity-50'
                        : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
                    }`}
                  >
                    Next →
                  </button>
                </div>
                
                <div className="text-center">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentStepContent.text}
                  </p>
                </div>
              </div>

              <div className={`mt-6 rounded-lg p-6 text-center transition-colors ${
                currentStepContent.result
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-blue-100 dark:bg-blue-900/20'
              }`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BlockMath math={currentStepContent.math} />
                    {currentStepContent.result && (
                      <p className="mt-4 text-sm font-normal">
                        {currentStepContent.result}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </TrackedInteraction>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="proving-irrationality-sqrt2"
      slideTitle="Proof by Contradiction: √2"
      moduleId="irrational-numbers"
      submoduleId="proving-irrationality"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}