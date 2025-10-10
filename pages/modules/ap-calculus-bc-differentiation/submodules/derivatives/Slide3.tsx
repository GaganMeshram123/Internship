import React, { useState } from 'react';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer';
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * ap-calculus-bc-differentiation/submodules/derivatives/Slide3.tsx
 * 
 * Vertical Tangent Lines
 * Covers vertical tangent lines and slopes of tangent lines to nonlinear functions
 */

export default function DerivativesSlide3(): JSX.Element {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  // Quiz questions for quick check
  const questions: QuizQuestion[] = [
    {
      id: 'q1',
      question: <>What condition indicates a vertical tangent line at x = c?</>,
      options: [
        'The limit equals zero',
        'The limit equals infinity',
        'The function is undefined',
        'The limit does not exist'
      ],
      correctAnswer: 'The limit equals infinity',
      explanation: <>A vertical tangent line occurs when the limit of the difference quotient approaches ±∞, indicating the slope becomes infinitely steep.</>,
      questionText: 'Condition for vertical tangent line'
    },
    {
      id: 'q2',
      question: <>For f(x) = x² + 1, what is the slope at x = 2?</>,
      options: ['2', '4', '5', '8'],
      correctAnswer: '4',
      explanation: <>Using the formula m = 2c where c = 2, we get m = 2(2) = 4.</>,
      questionText: 'Slope of f(x) = x² + 1 at x = 2'
    },
    {
      id: 'q3',
      question: <>The function f(x) = ∛(x - 2) has a vertical tangent at which point?</>,
      options: ['x = 0', 'x = 2', 'x = 3', 'x = -2'],
      correctAnswer: 'x = 2',
      explanation: <>The cube root function has a vertical tangent at x = 2 where the expression (x - 2) equals zero.</>,
      questionText: 'Location of vertical tangent for f(x) = ∛(x - 2)'
    },
    {
      id: 'q4',
      question: <>For nonlinear functions, the slope of the tangent line:</>,
      options: [
        'Is always the same',
        'Depends on the point chosen',
        'Is always zero',
        'Cannot be calculated'
      ],
      correctAnswer: 'Depends on the point chosen',
      explanation: <>Unlike linear functions, nonlinear functions have different slopes at different points, requiring the limit definition to find each tangent slope.</>,
      questionText: 'Slope behavior for nonlinear functions'
    }
  ];

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "vertical-tangent-nonlinear",
    conceptName: "Vertical Tangent Lines and Nonlinear Functions",
    conceptDescription: "Testing understanding of vertical tangents and slopes of nonlinear functions",
    mathRendering: 'latex'
  };

  // Step-by-step example using StepByStepRenderer
  const exampleSteps: Step[] = [
    {
      id: 'setup-limit',
      question: <>Set up the limit definition for the slope of f(x) = x² + 1 at an arbitrary point c</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} \\frac{f(c)}{\\Delta x}', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} \\frac{f(c + \\Delta x) - f(c)}{\\Delta x}', isCorrect: true },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\frac{f(c + \\Delta x)}{\\Delta x}', isCorrect: false },
        { id: 'wrong3', text: '\\frac{f(c + \\Delta x) - f(c)}{\\Delta x}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} \\frac{f(c + \\Delta x) - f(c)}{\\Delta x}',
      explanation: <>The slope at any point is found using the standard limit definition of the derivative.</>,
      questionText: 'Set up limit definition for f(x) = x² + 1',
      nextStep: 'Substitute the function'
    },
    {
      id: 'substitute-function',
      question: <>Substitute f(x) = x² + 1 into the limit expression</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} \\frac{(c + \\Delta x)^2 + 1}{\\Delta x}', isCorrect: false },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\frac{c^2 + 1 - (c + \\Delta x)^2 - 1}{\\Delta x}', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} \\frac{[(c + \\Delta x)^2 + 1] - [c^2 + 1]}{\\Delta x}', isCorrect: true },
        { id: 'wrong3', text: '\\lim_{\\Delta x \\to 0} \\frac{(c + \\Delta x)^2 - c^2}{c}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} \\frac{[(c + \\Delta x)^2 + 1] - [c^2 + 1]}{\\Delta x}',
      explanation: <>Substitute f(c + Δx) = (c + Δx)² + 1 and f(c) = c² + 1 into the difference quotient.</>,
      questionText: 'Substitute f(x) = x² + 1',
      nextStep: 'Expand and simplify'
    },
    {
      id: 'expand-simplify',
      question: <>Expand (c + Δx)² and simplify the numerator</>,
      options: [
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} \\frac{c^2 + 2c\\Delta x + (\\Delta x)^2}{\\Delta x}', isCorrect: false },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\frac{2c\\Delta x}{\\Delta x}', isCorrect: false },
        { id: 'wrong3', text: '\\lim_{\\Delta x \\to 0} \\frac{2c + \\Delta x}{\\Delta x}', isCorrect: false },
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} \\frac{2c\\Delta x + (\\Delta x)^2}{\\Delta x}', isCorrect: true }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} \\frac{2c\\Delta x + (\\Delta x)^2}{\\Delta x}',
      explanation: <>Expanding: (c + Δx)² + 1 - c² - 1 = c² + 2cΔx + (Δx)² + 1 - c² - 1 = 2cΔx + (Δx)²</>,
      questionText: 'Expand and simplify the numerator',
      nextStep: 'Factor and cancel'
    },
    {
      id: 'factor-cancel',
      question: <>Factor out Δx from the numerator and cancel</>,
      options: [
        { id: 'correct', text: '\\lim_{\\Delta x \\to 0} (2c + \\Delta x)', isCorrect: true },
        { id: 'wrong1', text: '\\lim_{\\Delta x \\to 0} 2c', isCorrect: false },
        { id: 'wrong2', text: '\\lim_{\\Delta x \\to 0} \\Delta x', isCorrect: false },
        { id: 'wrong3', text: '\\lim_{\\Delta x \\to 0} \\frac{2c + \\Delta x}{1}', isCorrect: false }
      ],
      correctAnswer: '\\lim_{\\Delta x \\to 0} (2c + \\Delta x)',
      explanation: <>Factor: Δx(2c + Δx)/Δx = 2c + Δx (after canceling Δx ≠ 0)</>,
      questionText: 'Factor and cancel Δx',
      nextStep: 'Evaluate the limit'
    },
    {
      id: 'evaluate-limit',
      question: <>Evaluate the limit as Δx approaches 0</>,
      options: [
        { id: 'wrong1', text: '0', isCorrect: false },
        { id: 'correct', text: '2c', isCorrect: true },
        { id: 'wrong2', text: 'c', isCorrect: false },
        { id: 'wrong3', text: 'undefined', isCorrect: false }
      ],
      correctAnswer: '2c',
      explanation: <>As Δx → 0: lim(2c + Δx) = 2c + 0 = 2c</>,
      questionText: 'Evaluate lim(Δx→0) (2c + Δx)'
    }
  ];

  const stepConfig: StepConfig = {
    steps: exampleSteps,
    title: "Tangent Slopes to Nonlinear Functions",
    conceptId: "nonlinear-tangent-derivation",
    conceptName: "Nonlinear Function Tangent Slopes",
    conceptDescription: "Finding the general formula for tangent slopes",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the slope of the tangent line to f(x) = x² + 1 at any point (c, f(c)):",
      formula: "\\text{slope} = \\lim_{\\Delta x \\to 0} \\frac{f(c + \\Delta x) - f(c)}{\\Delta x}"
    },
    completionMessage: <>Complete! The slope formula is m = 2c, so the slope varies with the point chosen.</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect nonlinear tangent slope derivation!");
      }
    }
  };

  return (
    <SlideComponentWrapper
      slideId="vertical-tangent-nonlinear"
      slideTitle="Vertical Tangent Lines"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="derivatives"
      interactions={localInteractions}
    >
      <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        <div className="mx-auto p-8">
          <div className="grid grid-cols-2 gap-8">

            {/* Left column: Theory and definition */}
            <div className="space-y-6">
              {/* Vertical Tangent Lines */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <div className="space-y-4 text-lg leading-relaxed">
                  <p>
                    The definition of a tangent line to a curve does not cover the possibility of a 
                    <strong> vertical tangent line</strong>. For vertical tangent lines, you can use the following definition.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                    <p className="font-semibold mb-2">If f is continuous at c and</p>
                    <div className="text-center space-y-2">
                      <BlockMath math="\lim_{\Delta x \to 0} \frac{f(c + \Delta x) - f(c)}{\Delta x} = +\infty" />
                      <p className="text-sm">or</p>
                      <BlockMath math="\lim_{\Delta x \to 0} \frac{f(c + \Delta x) - f(c)}{\Delta x} = -\infty" />
                    </div>
                    <p className="mt-3">
                      then the vertical line <InlineMath math="x = c" /> passing through <InlineMath math="(c, f(c))" /> 
                      is a <strong>vertical tangent line</strong> to the graph of f.
                    </p>
                  </div>
                </div>
              </div>

              {/* Example Graph */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
                  Example: <InlineMath math="f(x) = \sqrt[3]{x - 2}" />
                </h3>
                
                <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <svg 
                    width="500" 
                    height="300" 
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                  >
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(tick => (
                      <line
                        key={`x-grid-${tick}`}
                        x1={50 + tick * 50}
                        y1={50}
                        x2={50 + tick * 50}
                        y2={250}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                    ))}
                    {[1, 2, 3, 4, 5, 6, 7].map(tick => (
                      <line
                        key={`y-grid-${tick}`}
                        x1={50}
                        y1={250 - tick * 30}
                        x2={450}
                        y2={250 - tick * 30}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                    ))}

                    {/* Axes */}
                    <line x1={50} y1={50} x2={50} y2={250} stroke="#374151" strokeWidth="3" />
                    <line x1={50} y1={250} x2={450} y2={250} stroke="#374151" strokeWidth="3" />

                    {/* Axis labels */}
                    <text x={250} y={280} textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold">
                      x
                    </text>
                    <text x={20} y={150} textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold" transform="rotate(-90, 20, 150)">
                      y
                    </text>

                    {/* Axis tick labels */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(tick => (
                      <text
                        key={`x-label-${tick}`}
                        x={50 + tick * 50}
                        y={270}
                        textAnchor="middle"
                        fill="#6b7280"
                        fontSize="14"
                      >
                        {tick}
                      </text>
                    ))}
                    {[1, 2, 3, 4, 5, 6, 7].map(tick => (
                      <text
                        key={`y-label-${tick}`}
                        x={40}
                        y={250 - tick * 30 + 5}
                        textAnchor="end"
                        fill="#6b7280"
                        fontSize="14"
                      >
                        {tick}
                      </text>
                    ))}

                    {/* Function f(x) = cuberoot(x-2) plotted accurately */}
                    <path
                      d={(() => {
                        const points = [];
                        for (let x = 0; x <= 8; x += 0.05) {
                          const y = Math.cbrt(x - 2);
                          const screenX = 50 + x * 50;
                          const screenY = 250 - (y + 2) * 30; // Shift up by 2 for better visibility
                          if (screenY >= 50 && screenY <= 250) {
                            points.push(`${points.length === 0 ? 'M' : 'L'} ${screenX} ${screenY}`);
                          }
                        }
                        return points.join(' ');
                      })()}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    
                    {/* Vertical tangent line at x=2 */}
                    <line 
                      x1={150} 
                      y1={230} 
                      x2={150} 
                      y2={130} 
                      stroke="#ef4444" 
                      strokeWidth="3" 
                      strokeDasharray="8,4"
                    />
                    
                    {/* Point (2, 0) shifted to (2, 2) for display */}
                    <circle cx={150} cy={190} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
                    <text x={160} y={185} fill="#ef4444" fontSize="12" fontWeight="bold">(2, 0)</text>
                  
                    <text x={155} y={125} fill="#ef4444" fontSize="12">Vertical tangent</text>
                  </svg>
                </div>
                
                <p className="text-sm text-center mt-2 text-slate-600 dark:text-slate-400">
                  The function f(x) = ∛(x - 2) has a vertical tangent line at x = 2
                </p>
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
            </div>

          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
}