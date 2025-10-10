import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * ap-calculus-bc-differentiation/submodules/derivatives/Slide5.tsx
 * 
 * Finding Derivatives Using the Definition
 * Two step-by-step examples: one with hints, one without
 */

export default function DerivativesSlide5(): JSX.Element {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Left side example with hints: f(x) = √x
  const leftExampleSteps: Step[] = [
    {
      id: 'apply-definition-sqrt',
      question: <>Apply the derivative definition to find f'(x) for f(x) = √x</>,
      options: [
        { id: 'correct', text: 'f\'(x) = \\lim_{\\Delta x \\to 0} \\frac{\\sqrt{x + \\Delta x} - \\sqrt{x}}{\\Delta x}', isCorrect: true },
        { id: 'wrong1', text: 'f\'(x) = \\lim_{\\Delta x \\to 0} \\frac{\\sqrt{x + \\Delta x}}{\\Delta x}', isCorrect: false },
        { id: 'wrong2', text: 'f\'(x) = \\lim_{\\Delta x \\to 0} \\frac{\\sqrt{x}}{\\Delta x}', isCorrect: false },
        { id: 'wrong3', text: 'f\'(x) = \\frac{\\sqrt{x + \\Delta x} - \\sqrt{x}}{\\Delta x}', isCorrect: false }
      ],
      correctAnswer: 'f\'(x) = \\lim_{\\Delta x \\to 0} \\frac{\\sqrt{x + \\Delta x} - \\sqrt{x}}{\\Delta x}',
      explanation: <>Apply the definition of derivative: f'(x) = lim(Δx→0) [f(x + Δx) - f(x)]/Δx</>,
      questionText: 'Apply derivative definition to f(x) = √x',
      nextStep: 'Rationalize the numerator'
    },
    {
      id: 'rationalize-numerator',
      question: <>Rationalize the numerator by multiplying by the conjugate</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} \\frac{\\sqrt{x + \\Delta x} - \\sqrt{x}}{\\Delta x} \\cdot \\frac{\\sqrt{x + \\Delta x} + \\sqrt{x}}{\\sqrt{x + \\Delta x} - \\sqrt{x}}', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} \\frac{\\sqrt{x + \\Delta x} - \\sqrt{x}}{\\Delta x} \\cdot \\frac{\\sqrt{x + \\Delta x} + \\sqrt{x}}{\\sqrt{x + \\Delta x} + \\sqrt{x}}', isCorrect: true },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\frac{\\sqrt{x + \\Delta x} - \\sqrt{x}}{\\Delta x} \\cdot \\frac{\\sqrt{x}}{\\sqrt{x}}', isCorrect: false },
        { id: 'wrong3', text: '\\lim_{\\Delta x \\to 0} \\frac{\\sqrt{x + \\Delta x} - \\sqrt{x}}{\\Delta x} \\cdot \\frac{\\Delta x}{\\Delta x}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} \\frac{\\sqrt{x + \\Delta x} - \\sqrt{x}}{\\Delta x} \\cdot \\frac{\\sqrt{x + \\Delta x} + \\sqrt{x}}{\\sqrt{x + \\Delta x} + \\sqrt{x}}',
      explanation: <>Multiply by the conjugate (√(x + Δx) + √x)/(√(x + Δx) + √x) to rationalize the numerator.</>,
      questionText: 'Rationalize using the conjugate',
      nextStep: 'Simplify the numerator'
    },
    {
      id: 'simplify-numerator',
      question: <>Apply the difference of squares formula to simplify the numerator</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} \\frac{x + \\Delta x + x}{\\Delta x(\\sqrt{x + \\Delta x} + \\sqrt{x})}', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} \\frac{(x + \\Delta x) - x}{\\Delta x(\\sqrt{x + \\Delta x} + \\sqrt{x})}', isCorrect: true },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\frac{x + \\Delta x - x + 2\\sqrt{x}\\sqrt{\\Delta x}}{\\Delta x(\\sqrt{x + \\Delta x} + \\sqrt{x})}', isCorrect: false },
        { id: 'wrong3', text: '\\lim_{\\Delta x \\to 0} \\frac{\\sqrt{x + \\Delta x} - \\sqrt{x}}{\\Delta x(\\sqrt{x + \\Delta x} + \\sqrt{x})}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} \\frac{(x + \\Delta x) - x}{\\Delta x(\\sqrt{x + \\Delta x} + \\sqrt{x})}',
      explanation: <>Using (a - b)(a + b) = a² - b²: (√(x + Δx) - √x)(√(x + Δx) + √x) = (x + Δx) - x = Δx</>,
      questionText: 'Apply difference of squares',
      nextStep: 'Cancel and evaluate'
    },
    {
      id: 'cancel-evaluate',
      question: <>Cancel Δx and evaluate the limit</>,
      options: [
        { id: 'wrong1', text: '\\frac{1}{2}', isCorrect: false },
        { id: 'correct', text: '\\frac{1}{2\\sqrt{x}}', isCorrect: true },
        { id: 'wrong2', text: '\\frac{1}{\\sqrt{x}}', isCorrect: false },
        { id: 'wrong3', text: '2\\sqrt{x}', isCorrect: false }
      ],
      correctAnswer: '\\frac{1}{2\\sqrt{x}}',
      explanation: <>After canceling Δx: lim(Δx→0) 1/(√(x + Δx) + √x) = 1/(√x + √x) = 1/(2√x)</>,
      questionText: 'Cancel Δx and evaluate limit'
    }
  ];

  const leftStepConfig: StepConfig = {
    steps: leftExampleSteps,
    title: "Interactive Exercise: f(x) = √x",
    conceptId: "sqrt-derivative-with-hints",
    conceptName: "Square Root Derivative with Hints",
    conceptDescription: "Step-by-step calculation with detailed hints",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find f'(x) for f(x) = √x using the definition:",
      formula: "f'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}"
    },
    completionMessage: <>Complete! f'(x) = 1/(2√x). At (1,1): slope = 1/2. At (4,2): slope = 1/4.</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect square root derivative calculation!");
      }
    }
  };

  // Right side example without hints: y = 2/t
  const rightExampleSteps: Step[] = [
    {
      id: 'setup-derivative-2t',
      question: <>Set up the derivative formula for y = 2/t</>,
      options: [
        { id: 'wrong1', text: '\\frac{dy}{dt} = \\lim_{\\Delta t \\to 0} \\frac{2/(t + \\Delta t)}{\\Delta t}', isCorrect: false },
        { id: 'correct', text: '\\frac{dy}{dt} = \\lim_{\\Delta t \\to 0} \\frac{\\frac{2}{t + \\Delta t} - \\frac{2}{t}}{\\Delta t}', isCorrect: true },
        { id: 'wrong2', text: '\\frac{dy}{dt} = \\lim_{\\Delta t \\to 0} \\frac{2/t - 2/(t + \\Delta t)}{\\Delta t}', isCorrect: false },
        { id: 'wrong3', text: '\\frac{dy}{dt} = \\frac{2}{t + \\Delta t} - \\frac{2}{t}', isCorrect: false }
      ],
      correctAnswer: '\\frac{dy}{dt} = \\lim_{\\Delta t \\to 0} \\frac{\\frac{2}{t + \\Delta t} - \\frac{2}{t}}{\\Delta t}',
      explanation: <>Apply the definition with f(t) = 2/t and f(t + Δt) = 2/(t + Δt)</>,
      questionText: 'Set up derivative for y = 2/t',
      nextStep: 'Combine fractions'
    },
    {
      id: 'combine-fractions',
      question: <>Combine the fractions in the numerator</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta t \\to 0} \\frac{\\frac{2t - 2(t + \\Delta t)}{t(t + \\Delta t)}}{\\Delta t}', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta t \\to 0} \\frac{\\frac{2t - 2(t + \\Delta t)}{t(t + \\Delta t)}}{\\Delta t}', isCorrect: true },
        { id: 'wrong2', text: '\\lim_{\\Delta t \\to 0} \\frac{\\frac{2(t + \\Delta t) - 2t}{t(t + \\Delta t)}}{\\Delta t}', isCorrect: false },
        { id: 'wrong3', text: '\\lim_{\\Delta t \\to 0} \\frac{\\frac{4}{t(t + \\Delta t)}}{\\Delta t}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta t \\to 0} \\frac{\\frac{2t - 2(t + \\Delta t)}{t(t + \\Delta t)}}{\\Delta t}',
      explanation: <>Use common denominator t(t + Δt): 2/t - 2/(t + Δt) = [2(t + Δt) - 2t]/[t(t + Δt)]</>,
      questionText: 'Combine fractions in numerator',
      nextStep: 'Simplify the expression'
    },
    {
      id: 'simplify-expression',
      question: <>Simplify the numerator and divide by Δt</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta t \\to 0} \\frac{2\\Delta t}{\\Delta t \\cdot t(t + \\Delta t)}', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta t \\to 0} \\frac{-2\\Delta t}{\\Delta t \\cdot t(t + \\Delta t)}', isCorrect: true },
        { id: 'wrong2', text: '\\lim_{\\Delta t \\to 0} \\frac{-2t}{\\Delta t \\cdot t(t + \\Delta t)}', isCorrect: false },
        { id: 'wrong3', text: '\\lim_{\\Delta t \\to 0} \\frac{2t}{\\Delta t \\cdot t(t + \\Delta t)}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta t \\to 0} \\frac{-2\\Delta t}{\\Delta t \\cdot t(t + \\Delta t)}',
      explanation: <>2t - 2(t + Δt) = 2t - 2t - 2Δt = -2Δt</>,
      questionText: 'Simplify and divide by Δt',
      nextStep: 'Cancel and evaluate'
    },
    {
      id: 'final-result',
      question: <>Cancel Δt and evaluate the limit</>,
      options: [
        { id: 'wrong1', text: '\\frac{2}{t^2}', isCorrect: false },
        { id: 'correct', text: '-\\frac{2}{t^2}', isCorrect: true },
        { id: 'wrong2', text: '-\\frac{1}{t^2}', isCorrect: false },
        { id: 'wrong3', text: '\\frac{1}{t^2}', isCorrect: false }
      ],
      correctAnswer: '-\\frac{2}{t^2}',
      explanation: <>Cancel Δt: lim(Δt→0) [-2]/[t(t + Δt)] = -2/[t·t] = -2/t²</>,
      questionText: 'Final result'
    }
  ];

  const rightStepConfig: StepConfig = {
    steps: rightExampleSteps,
    title: "Try this: y = 2/t",
    conceptId: "rational-derivative-no-hints",
    conceptName: "Rational Function Derivative",
    conceptDescription: "Step-by-step calculation without hints",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find dy/dt for y = 2/t:",
      formula: "\\frac{dy}{dt} = \\lim_{\\Delta t \\to 0} \\frac{f(t + \\Delta t) - f(t)}{\\Delta t}"
    },
    completionMessage: <>Complete! dy/dt = -2/t²</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect rational function derivative calculation!");
      }
    }
  };

  return (
    <SlideComponentWrapper
      slideId="derivative-examples"
      slideTitle="Finding Derivatives Using the Definition"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="derivatives"
      interactions={localInteractions}
    >
      <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        <div className="mx-auto p-8">
          <div className="grid grid-cols-2 gap-8">

            {/* Left column: Example with hints */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
                  <p className="text-lg">
                    <strong>Strategy Hint:</strong> Use the procedure for rationalizing numerators. 
                    When you have √(x + Δx) - √x, multiply by the conjugate to eliminate the square roots.
                  </p>
                </div>
              </div>

              <StepByStepRenderer 
                config={leftStepConfig}
                onInteractionComplete={handleInteractionComplete}
              />
            </div>

            {/* Right column: Example without hints */}
            <div className="space-y-6">
              <StepByStepRenderer 
                config={rightStepConfig}
                onInteractionComplete={handleInteractionComplete}
              />
            </div>

          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
}