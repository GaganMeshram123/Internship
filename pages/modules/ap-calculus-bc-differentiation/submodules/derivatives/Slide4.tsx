import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * ap-calculus-bc-differentiation/submodules/derivatives/Slide4.tsx
 * 
 * The Derivative of a Function
 * Covers the formal definition of the derivative and notation
 */

export default function DerivativesSlide4(): JSX.Element {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };


  // Step-by-step example using StepByStepRenderer
  const exampleSteps: Step[] = [
    {
      id: 'apply-definition',
      question: <>Apply the derivative definition to find f'(x) for f(x) = x² + 3x</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} \\frac{f(x)}{\\Delta x}', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}', isCorrect: true },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x)}{\\Delta x}', isCorrect: false },
        { id: 'wrong3', text: '\\frac{f(x + \\Delta x) - f(x)}{\\Delta x}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}',
      explanation: <>The derivative is defined as the limit of the difference quotient as Δx approaches 0.</>,
      questionText: 'Apply derivative definition to f(x) = x² + 3x',
      nextStep: 'Substitute the function'
    },
    {
      id: 'substitute-function',
      question: <>Substitute f(x) = x² + 3x into the derivative formula</>,
      options: [
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} \\frac{[(x + \\Delta x)^2 + 3(x + \\Delta x)] - [x^2 + 3x]}{\\Delta x}', isCorrect: true },
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} \\frac{(x + \\Delta x)^2 + 3x}{\\Delta x}', isCorrect: false },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\frac{x^2 + 3x + \\Delta x}{\\Delta x}', isCorrect: false },
        { id: 'wrong3', text: '\\lim_{\\Delta x \\to 0} \\frac{(x^2 + 3x) - (x^2 + 3x)}{\\Delta x}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} \\frac{[(x + \\Delta x)^2 + 3(x + \\Delta x)] - [x^2 + 3x]}{\\Delta x}',
      explanation: <>Substitute f(x + Δx) = (x + Δx)² + 3(x + Δx) and f(x) = x² + 3x into the difference quotient.</>,
      questionText: 'Substitute f(x) = x² + 3x',
      nextStep: 'Expand the expressions'
    },
    {
      id: 'expand-expressions',
      question: <>Expand (x + Δx)² + 3(x + Δx) and simplify the numerator</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} \\frac{x^2 + 2x\\Delta x + (\\Delta x)^2 + 3x + 3\\Delta x}{\\Delta x}', isCorrect: false },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\frac{2x + \\Delta x + 3}{\\Delta x}', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} \\frac{2x\\Delta x + (\\Delta x)^2 + 3\\Delta x}{\\Delta x}', isCorrect: true },
        { id: 'wrong3', text: '\\lim_{\\Delta x \\to 0} \\frac{2x\\Delta x + 3\\Delta x}{\\Delta x}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} \\frac{2x\\Delta x + (\\Delta x)^2 + 3\\Delta x}{\\Delta x}',
      explanation: <>Expanding: [x² + 2xΔx + (Δx)² + 3x + 3Δx] - [x² + 3x] = 2xΔx + (Δx)² + 3Δx</>,
      questionText: 'Expand and simplify the numerator',
      nextStep: 'Factor and cancel'
    },
    {
      id: 'factor-cancel',
      question: <>Factor out Δx from the numerator and cancel</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} (2x + 3)', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} (2x + \\Delta x + 3)', isCorrect: true },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} (\\Delta x + 3)', isCorrect: false },
        { id: 'wrong3', text: '\\lim_{\\Delta x \\to 0} 2x', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} (2x + \\Delta x + 3)',
      explanation: <>Factor: Δx(2x + Δx + 3)/Δx = 2x + Δx + 3 (after canceling Δx ≠ 0)</>,
      questionText: 'Factor and cancel Δx',
      nextStep: 'Evaluate the limit'
    },
    {
      id: 'evaluate-limit',
      question: <>Evaluate the limit as Δx approaches 0</>,
      options: [
        { id: 'wrong1', text: '0', isCorrect: false },
        { id: 'correct', text: '2x + 3', isCorrect: true },
        { id: 'wrong2', text: 'x', isCorrect: false },
        { id: 'wrong3', text: '3', isCorrect: false }
      ],
      correctAnswer: '2x + 3',
      explanation: <>As Δx → 0: lim(2x + Δx + 3) = 2x + 0 + 3 = 2x + 3</>,
      questionText: 'Evaluate lim(Δx→0) (2x + Δx + 3)'
    }
  ];

  const stepConfig: StepConfig = {
    steps: exampleSteps,
    title: "Finding a Derivative Using the Definition",
    conceptId: "derivative-calculation",
    conceptName: "Derivative Calculation from Definition",
    conceptDescription: "Step-by-step calculation using the limit definition",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find f'(x) for f(x) = x² + 3x using the definition:",
      formula: "f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}"
    },
    completionMessage: <>Complete! The derivative is f'(x) = 2x + 3.</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect derivative calculation!");
      }
    }
  };

  return (
    <SlideComponentWrapper
      slideId="derivative-definition"
      slideTitle="The Derivative of a Function"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="derivatives"
      interactions={localInteractions}
    >
      <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        <div className="mx-auto p-8">
          <div className="grid grid-cols-2 gap-8">

            {/* Left column: Theory and definition */}
            <div className="space-y-6">
              {/* Introduction */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    You have now arrived at a <strong>crucial point</strong> in the study of calculus. The limit used to 
                    define the slope of a tangent line is also used to define one of the two fundamental 
                    operations of calculus—<strong>differentiation</strong>.
                  </p>
                </div>
              </div>

              {/* Formal Definition */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  Definition: The Derivative of a Function
                </h3>
                
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    The <strong>derivative of f at x</strong> is given by
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                    <BlockMath math="f'(x) = \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x}" />
                  </div>
                  
                  <p>
                    provided the limit exists. For all x for which this limit exists, f' is a function of x.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                    <p className="font-medium text-blue-700 dark:text-blue-300">
                      <strong>Key Insight:</strong> The derivative of a function of x is also a function of x. 
                      This "new" function gives the slope of the tangent line to the graph of f at the point (x, f(x)).
                    </p>
                  </div>
                </div>
              </div>

              {/* Terminology */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  Important Terminology
                </h3>
                
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                    <p className="text-lg">
                      <strong>Differentiation:</strong> The process of finding the derivative of a function.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                    <p className="text-lg">
                      <strong>Differentiable at x:</strong> A function is differentiable at x if its derivative exists at x.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                    <p className="text-lg">
                      <strong>Differentiable on an interval:</strong> A function is differentiable on an open interval (a, b) 
                      if it is differentiable at every point in the interval.
                    </p>
                  </div>
                </div>
              </div>

              {/* Derivative Notation */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  Notation for Derivatives
                </h3>
                
                <div className="space-y-4 text-lg">
                  <p>
                    In addition to <InlineMath math="f'(x)" />, which is read as "f prime of x," other notations 
                    are used to denote the derivative of <InlineMath math="y = f(x)" />:
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                    <div className="grid grid-cols-1 gap-6 text-center">
                      <div><InlineMath math="f'(x)" /> - "f prime of x"</div>
                      <div><InlineMath math="y'" /> - "y prime"</div>
                      <div><InlineMath math="\frac{dy}{dx}" /> - "dy dx" or "the derivative of y with respect to x"</div>
                      <div><InlineMath math="\frac{d}{dx}[f(x)]" /> - "d dx of f(x)"</div>
                      <div><InlineMath math="D_x[y]" /> - "D sub x of y"</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                    <p className="text-center font-medium">
                      <InlineMath math="\frac{dy}{dx} = \lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x} = \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x} = f'(x)" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Interactive examples and quiz */}
            <div className="space-y-6">
              {/* Interactive Step-by-Step Example */}
              <StepByStepRenderer 
                config={stepConfig}
                onInteractionComplete={handleInteractionComplete}
              />


              {/* Summary Box */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  Key Takeaways
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-lg mb-2">
                      <strong>The Derivative Definition:</strong>
                    </p>
                    <div className="text-center">
                      <InlineMath math="f'(x) = \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x}" />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-lg">
                      <strong>Geometric Meaning:</strong> f'(x) gives the slope of the tangent line at (x, f(x))
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-lg">
                      <strong>Common Notation:</strong> f'(x), dy/dx, y', d/dx[f(x)]
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <p className="text-lg">
                      <strong>Process:</strong> Differentiation is finding derivatives using this limit definition
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
}