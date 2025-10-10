import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer';
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * ap-calculus-bc-differentiation/submodules/derivatives/Slide2.tsx
 * 
 * The Definition of Tangent Line
 * Covers the formal limit definition of the tangent line slope
 */

export default function DerivativesSlide2(): JSX.Element {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Quiz questions for quick check
  const questions: QuizQuestion[] = [
    {
      id: 'q1',
      question: <>What is the slope of the tangent line to f(x) = 3x + 1 at any point?</>,
      options: ['1', '3', 'x', 'Depends on the point'],
      correctAnswer: '3',
      explanation: <>For a linear function f(x) = 3x + 1, the slope is constant and equals the coefficient of x, which is 3.</>,
      questionText: 'Slope of tangent to f(x) = 3x + 1'
    },
    {
      id: 'q2',
      question: <>What happens to the secant line as Δx approaches 0?</>,
      options: ['It disappears', 'It becomes vertical', 'It approaches the tangent line', 'It becomes horizontal'],
      correctAnswer: 'It approaches the tangent line',
      explanation: <>As Δx → 0, the two points on the secant line get closer together, and the secant line approaches the tangent line.</>,
      questionText: 'What happens to secant line as Δx → 0?'
    },
    {
      id: 'q3',
      question: <>The limit definition of the slope involves which mathematical concept?</>,
      options: ['Integration', 'Differentiation', 'Limits', 'Trigonometry'],
      correctAnswer: 'Limits',
      explanation: <>The slope of the tangent line is defined using limits: the limit of the slope of secant lines as Δx approaches 0.</>,
      questionText: 'Limit definition involves which concept?'
    },
    {
      id: 'q4',
      question: <>For f(x) = x², what is f(3 + Δx) - f(3)?</>,
      options: ['6Δx + (Δx)²', '9 + 6Δx + (Δx)²', '6 + Δx', '3Δx + (Δx)²'],
      correctAnswer: '6Δx + (Δx)²',
      explanation: <>f(3 + Δx) = (3 + Δx)² = 9 + 6Δx + (Δx)² and f(3) = 9, so f(3 + Δx) - f(3) = 6Δx + (Δx)².</>,
      questionText: 'For f(x) = x², find f(3 + Δx) - f(3)'
    }
  ];

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "tangent-definition",
    conceptName: "Tangent Line Definition",
    conceptDescription: "Testing understanding of the limit definition of tangent lines",
    mathRendering: 'latex'
  };

  // Step-by-step example using StepByStepRenderer
  const exampleSteps: Step[] = [
    {
      id: 'apply-definition',
      question: <>Apply the limit definition to find the slope of f(x) = 3x + 1 at x = 4</>,
      options: [
        { id: 'wrong1', text: '\\frac{f(4 + \\Delta x) - f(4)}{\\Delta x}', isCorrect: false },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x}', isCorrect: false },
        { id: 'wrong3', text: '\\frac{f(4) - f(4 + \\Delta x)}{\\Delta x}', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} \\frac{f(4 + \\Delta x) - f(4)}{\\Delta x}', isCorrect: true }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} \\frac{f(4 + \\Delta x) - f(4)}{\\Delta x}',
      explanation: <>The limit definition of the slope is <InlineMath math="\lim_{\Delta x \to 0} \frac{f(c + \Delta x) - f(c)}{\Delta x}" /> where c = 4.</>,
      questionText: 'Apply the limit definition to find slope at x = 4',
      nextStep: 'Substitute the function'
    },
    {
      id: 'substitute-function',
      question: <>Substitute f(x) = 3x + 1 into the expression</>,
      options: [
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} \\frac{[3(4 + \\Delta x) + 1] - [3(4) + 1]}{\\Delta x}', isCorrect: true },
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} \\frac{(3x + 1) - (3x + 1)}{\\Delta x}', isCorrect: false },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\frac{3(4 + \\Delta x) + 1 + 3(4) + 1}{\\Delta x}', isCorrect: false },
        { id: 'wrong3', text: '\\lim_{\\Delta x \\to 0} \\frac{(4 + \\Delta x) - 4}{\\Delta x}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} \\frac{[3(4 + \\Delta x) + 1] - [3(4) + 1]}{\\Delta x}',
      explanation: <>We substitute f(4 + Δx) = 3(4 + Δx) + 1 and f(4) = 3(4) + 1 = 13.</>,
      questionText: 'Substitute f(x) = 3x + 1',
      nextStep: 'Expand and simplify'
    },
    {
      id: 'expand-simplify',
      question: <>Expand and simplify the numerator</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} \\frac{12 + 3\\Delta x + 1 - 13}{\\Delta x}', isCorrect: false },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\frac{12 + 3\\Delta x - 12}{\\Delta x}', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} \\frac{3\\Delta x}{\\Delta x}', isCorrect: true },
        { id: 'wrong3', text: '\\lim_{\\Delta x \\to 0} \\frac{\\Delta x}{\\Delta x}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} \\frac{3\\Delta x}{\\Delta x}',
      explanation: <>Expanding: [12 + 3Δx + 1] - [12 + 1] = 12 + 3Δx + 1 - 13 = 3Δx</>,
      questionText: 'Expand and simplify the numerator',
      nextStep: 'Simplify the fraction'
    },
    {
      id: 'simplify-fraction',
      question: <>Simplify the fraction (assuming Δx ≠ 0)</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} 0', isCorrect: false },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\Delta x', isCorrect: false },
        { id: 'wrong3', text: '\\lim_{\\Delta x \\to 0} 1', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} 3', isCorrect: true }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} 3',
      explanation: <>Since Δx ≠ 0, we can cancel: <InlineMath math="\frac{3\Delta x}{\Delta x} = 3" /></>,
      questionText: 'Simplify the fraction',
      nextStep: 'Evaluate the limit'
    },
    {
      id: 'evaluate-limit',
      question: <>Evaluate the limit</>,
      options: [
        { id: 'wrong1', text: '0', isCorrect: false },
        { id: 'correct', text: '3', isCorrect: true },
        { id: 'wrong2', text: '1', isCorrect: false },
        { id: 'wrong3', text: 'undefined', isCorrect: false }
      ],
      correctAnswer: '3',
      explanation: <>The limit of a constant is the constant itself: <InlineMath math="\lim_{\Delta x \to 0} 3 = 3" /></>,
      questionText: 'Evaluate lim(Δx→0) 3'
    }
  ];

  const stepConfig: StepConfig = {
    steps: exampleSteps,
    title: "Finding Slope Using Limits",
    conceptId: "tangent-slope-derivation",
    conceptName: "Tangent Slope Step-by-Step",
    conceptDescription: "Step-by-step derivation using the limit definition",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the slope of the tangent line to f(x) = 3x + 1 at x = 4:",
    },
    completionMessage: <>Complete! The slope of the tangent line is 3.</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect tangent slope derivation!");
      }
    }
  };


  return (
    <SlideComponentWrapper
      slideId="finding-tangent-definition"
      slideTitle="The Definition of Tangent Line"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="derivatives"
      interactions={localInteractions}
    >
      <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        <div className="mx-auto p-8">
          <div className="grid grid-cols-2 gap-8">

            {/* Left column: Theory and definition */}
            <div className="space-y-6">
              {/* The Limit Process */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  What Happens as Δx → 0?
                </h3>
                
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    The right-hand side of this equation is a <strong>difference quotient</strong>. The denominator 
                    Δx is the change in x, and the numerator Δy = f(c + Δx) - f(c) is the change in y.
                  </p>
                  <p>
                    The beauty of this procedure is that you can obtain <strong>more and more accurate 
                    approximations</strong> of the slope of the tangent line by choosing points closer and closer 
                    to the point of tangency.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                    <div className="text-center">
                      <BlockMath math="\lim_{\Delta x \to 0} \frac{f(c + \Delta x) - f(c)}{\Delta x} = m_{tan}" />
                      <p className="text-sm mt-2">As Δx → 0, secant slope → tangent slope</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Historical Note */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-l-4 border-yellow-500">
                <h3 className="text-xl font-semibold mb-4 text-yellow-600 dark:text-yellow-400">
                  The Tangent Line Problem
                </h3>
                
                <div className="space-y-3 text-lg">
                  <p className="italic">
                    In 1637, mathematician René Descartes stated this about the tangent line problem:
                  </p>
                  <blockquote className="pl-4 border-l-4 border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 p-3 italic">
                    "And I dare say that this is not only the most useful and general problem in geometry that 
                    I know, but even that I ever desire to know."
                  </blockquote>
                </div>
              </div>

              {/* Formal Definition */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  Definition of Tangent Line with Slope m
                </h3>
                
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    If f is defined on an open interval containing c, and if the limit
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                    <BlockMath math="\lim_{\Delta x \to 0} \frac{\Delta y}{\Delta x} = \lim_{\Delta x \to 0} \frac{f(c + \Delta x) - f(c)}{\Delta x} = m" />
                  </div>
                  
                  <p>
                    exists, then the line passing through (c, f(c)) with slope m is the <strong>tangent line</strong> to the graph of f at the point (c, f(c)).
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                    <p className="text-center font-medium text-blue-700 dark:text-blue-300">
                      The slope of the tangent line to the graph of f at the point (c, f(c)) is also called 
                      <strong> the slope of the graph of f at x = c</strong>.
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

              {/* Quick Check Quiz */}
              <QuizRenderer 
                config={quizConfig}
                onInteractionComplete={handleInteractionComplete}
              />

              {/* Key Insight */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Key Insight</h3>
                
                <div className="space-y-3 text-lg">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                    <p className="text-lg">
                      <strong>Linear Functions:</strong> For f(x) = mx + b, the slope is constant everywhere. 
                      The tangent line at any point has slope m.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                    <p className="text-lg">
                      <strong>Nonlinear Functions:</strong> The slope changes from point to point, requiring 
                      the limit definition to find the tangent slope.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                    <p className="text-lg">
                      <strong>The Derivative:</strong> This limit process leads to the concept of the derivative, 
                      which gives the slope at any point.
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