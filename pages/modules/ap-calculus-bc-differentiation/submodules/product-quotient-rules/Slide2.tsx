import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function QuotientRuleSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Step-by-step example: Using the Quotient Rule
  const quotientRuleSteps: Step[] = [
    {
      id: 'identify-numerator-denominator',
      question: <>Identify the numerator f(x) and denominator g(x) in y = (4x + 3)/(x² - 1)</>,
      options: [
        { id: 'correct', text: 'f(x) = 4x + 3 and g(x) = x² - 1', isCorrect: true },
        { id: 'wrong1', text: 'f(x) = 4x and g(x) = x² - 1 + 3', isCorrect: false },
        { id: 'wrong2', text: 'f(x) = 4 and g(x) = x + 3 + x² - 1', isCorrect: false },
        { id: 'wrong3', text: 'f(x) = x² - 1 and g(x) = 4x + 3', isCorrect: false }
      ],
      correctAnswer: 'f(x) = 4x + 3 and g(x) = x² - 1',
      explanation: <>The numerator is f(x) = 4x + 3 and the denominator is g(x) = x² - 1.</>,
      questionText: 'Identify numerator and denominator',
      nextStep: 'Find derivatives'
    },
    {
      id: 'find-derivatives',
      question: <>Find f'(x) and g'(x)</>,
      options: [
        { id: 'correct', text: "f'(x) = 4 and g'(x) = 2x", isCorrect: true },
        { id: 'wrong1', text: "f'(x) = 4x and g'(x) = x²", isCorrect: false },
        { id: 'wrong2', text: "f'(x) = 3 and g'(x) = 2x - 1", isCorrect: false },
        { id: 'wrong3', text: "f'(x) = 4 and g'(x) = x", isCorrect: false }
      ],
      correctAnswer: "f'(x) = 4 and g'(x) = 2x",
      explanation: <>f'(x) = d/dx(4x + 3) = 4 and g'(x) = d/dx(x² - 1) = 2x</>,
      questionText: 'Find the derivatives',
      nextStep: 'Apply Quotient Rule'
    },
    {
      id: 'apply-quotient-rule',
      question: <>Apply the Quotient Rule formula</>,
      options: [
        { id: 'wrong1', text: '[(x² - 1)(4) + (4x + 3)(2x)] / (x² - 1)²', isCorrect: false },
        { id: 'correct', text: '[(x² - 1)(4) - (4x + 3)(2x)] / (x² - 1)²', isCorrect: true },
        { id: 'wrong2', text: '[(4x + 3)(4) - (x² - 1)(2x)] / (x² - 1)²', isCorrect: false },
        { id: 'wrong3', text: '[(4)(2x) - (4x + 3)(x² - 1)] / (x² - 1)²', isCorrect: false }
      ],
      correctAnswer: '[(x² - 1)(4) - (4x + 3)(2x)] / (x² - 1)²',
      explanation: <>Using the Quotient Rule: [g(x)f'(x) - f(x)g'(x)] / [g(x)]² = [(x² - 1)(4) - (4x + 3)(2x)] / (x² - 1)²</>,
      questionText: 'Apply the Quotient Rule formula',
      nextStep: 'Expand numerator'
    },
    {
      id: 'expand-numerator',
      question: <>Expand the numerator: (x² - 1)(4) - (4x + 3)(2x)</>,
      options: [
        { id: 'wrong1', text: '4x² - 4 - 8x² + 6x', isCorrect: false },
        { id: 'correct', text: '4x² - 4 - 8x² - 6x', isCorrect: true },
        { id: 'wrong2', text: '4x² - 1 - 8x² - 6x', isCorrect: false },
        { id: 'wrong3', text: '4x² - 4 - 8x² + 6x', isCorrect: false }
      ],
      correctAnswer: '4x² - 4 - 8x² - 6x',
      explanation: <>(x² - 1)(4) = 4x² - 4 and (4x + 3)(2x) = 8x² + 6x, so the numerator is 4x² - 4 - 8x² - 6x</>,
      questionText: 'Expand the numerator',
      nextStep: 'Simplify final result'
    },
    {
      id: 'simplify-result',
      question: <>Simplify the final result</>,
      options: [
        { id: 'wrong1', text: '(4x² - 4 - 8x² - 6x) / (x² - 1)²', isCorrect: false },
        { id: 'correct', text: '(-4x² - 6x - 4) / (x² - 1)²', isCorrect: true },
        { id: 'wrong2', text: '(-4x² - 6x + 4) / (x² - 1)²', isCorrect: false },
        { id: 'wrong3', text: '(4x² - 6x - 4) / (x² - 1)²', isCorrect: false }
      ],
      correctAnswer: '(-4x² - 6x - 4) / (x² - 1)²',
      explanation: <>Combine like terms: 4x² - 4 - 8x² - 6x = -4x² - 6x - 4</>,
      questionText: 'Simplify the expression'
    }
  ]

  const stepConfig: StepConfig = {
    steps: quotientRuleSteps,
    title: "Using the Quotient Rule",
    conceptId: "quotient-rule-application",
    conceptName: "Applying the Quotient Rule",
    conceptDescription: "Step-by-step application of the Quotient Rule to find derivatives",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the derivative of y = (4x + 3)/(x² - 1) using the Quotient Rule:",
    },
    completionMessage: <>Complete! The derivative is (-4x² - 6x - 4)/(x² - 1)².</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect Quotient Rule application!")
      }
    }
  }

  // Quiz questions
  const questions: QuizQuestion[] = [
    {
      id: 'quotient-rule-form',
      question: <>What is the correct form of the Quotient Rule for d/dx[f(x)/g(x)]?</>,
      options: [
        '[f\'(x)g(x) + f(x)g\'(x)] / [g(x)]²',
        '[g(x)f\'(x) - f(x)g\'(x)] / [g(x)]²',
        '[f(x)g\'(x) - g(x)f\'(x)] / [g(x)]²',
        '[f\'(x) - g\'(x)] / [g(x)]²'
      ],
      correctAnswer: '[g(x)f\'(x) - f(x)g\'(x)] / [g(x)]²',
      explanation: <>The Quotient Rule: denominator times derivative of numerator MINUS numerator times derivative of denominator, all over the square of the denominator.</>,
      questionText: 'Quotient Rule formula'
    },
    {
      id: 'domain-restriction',
      question: <>When can we apply the Quotient Rule to f(x)/g(x)?</>,
      options: [
        'When both f and g are differentiable',
        'When both f and g are differentiable and g(x) ≠ 0',
        'When f is differentiable and g is continuous',
        'When g is differentiable and f(x) ≠ 0'
      ],
      correctAnswer: 'When both f and g are differentiable and g(x) ≠ 0',
      explanation: <>The Quotient Rule requires both functions to be differentiable, and the denominator must be non-zero to avoid division by zero.</>,
      questionText: 'When to apply Quotient Rule'
    },
    {
      id: 'memory-trick',
      question: <>What memory trick helps remember the Quotient Rule?</>,
      options: [
        '"Hi times Lo plus Lo times Hi"',
        '"Lo D-Hi minus Hi D-Lo over Lo-Lo"',
        '"First times Second plus Second times First"',
        '"Top times Bottom minus Bottom times Top"'
      ],
      correctAnswer: '"Lo D-Hi minus Hi D-Lo over Lo-Lo"',
      explanation: <>Lo D-Hi minus Hi D-Lo over Lo-Lo: Low (denominator) times Derivative of High (numerator) minus High times Derivative of Low, all over Low squared.</>,
      questionText: 'Memory device for Quotient Rule'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "quotient-rule-concepts",
    conceptName: "Quotient Rule Concepts",
    conceptDescription: "Understanding when and how to use the Quotient Rule",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory and Rules */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200 mb-3">
                  <strong>The Quotient Rule:</strong> The quotient of two differentiable functions f and g 
                  is itself differentiable at all values of x for which g(x) ≠ 0.
                </p>
                <p className="text-blue-800 dark:text-blue-200">
                  Moreover, the derivative of f/g is given by the denominator times the derivative of the numerator 
                  minus the numerator times the derivative of the denominator, all divided by the square of the denominator.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-3">Quotient Rule Formula:</p>
                <BlockMath math="\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{g(x)f'(x) - f(x)g'(x)}{[g(x)]^2}" />
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                  where g(x) ≠ 0
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
                  Memory Device:
                </p>
                <p className="text-yellow-800 dark:text-yellow-200 text-lg">
                  "Lo D-Hi minus Hi D-Lo over Lo-Lo"
                </p>
                <p className="text-yellow-800 dark:text-yellow-200 text-xs mt-1">
                  Low × (Derivative of High) - High × (Derivative of Low), all over Low²
                </p>
              </div>
            </div>
          </div>

          {/* Proof Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Proof of the Quotient Rule
            </h3>
            
            <div className="space-y-4 text-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Like the Product Rule proof, this involves subtracting and adding the same quantity:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <div className="space-y-3">
                  <BlockMath math="\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \lim_{\Delta x \to 0} \frac{\frac{f(x + \Delta x)}{g(x + \Delta x)} - \frac{f(x)}{g(x)}}{\Delta x}" />
                  
                  <BlockMath math="= \lim_{\Delta x \to 0} \frac{g(x)f(x + \Delta x) - f(x)g(x + \Delta x)}{\Delta x \cdot g(x) \cdot g(x + \Delta x)}" />
                  
                  <p className="text-center text-red-600 dark:text-red-400 font-medium">
                    Add and subtract f(x)g(x):
                  </p>
                  
                  <BlockMath math="= \lim_{\Delta x \to 0} \frac{g(x)f(x + \Delta x) - f(x)g(x) + f(x)g(x) - f(x)g(x + \Delta x)}{\Delta x \cdot g(x) \cdot g(x + \Delta x)}" />
                  
                  <BlockMath math="= \lim_{\Delta x \to 0} \frac{g(x)[f(x + \Delta x) - f(x)] - f(x)[g(x + \Delta x) - g(x)]}{\Delta x \cdot g(x) \cdot g(x + \Delta x)}" />
                  
                  <BlockMath math="= \frac{g(x) \cdot f'(x) - f(x) \cdot g'(x)}{[g(x)]^2}" />
                </div>
              </div>
              
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Note: lim(Δx→0) g(x + Δx) = g(x) because g is continuous (since it's differentiable).
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Examples and Practice */}
        <div className="space-y-6">
          
          {/* Step-by-Step Example */}
          <StepByStepRenderer 
            config={stepConfig}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Quick Check Quiz */}
          <QuizRenderer 
            config={quizConfig}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Common Mistakes */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">
              Common Mistakes
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-400">
                <p className="text-lg text-red-800 dark:text-red-200">
                  <strong>1.</strong> Forgetting the minus sign: It's g(x)f'(x) - f(x)g'(x), not plus
                </p>
              </div>
              
              <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-400">
                <p className="text-lg text-red-800 dark:text-red-200">
                  <strong>2.</strong> Forgetting to square the denominator: It's [g(x)]², not g(x)
                </p>
              </div>
              
              <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-400">
                <p className="text-lg text-red-800 dark:text-red-200">
                  <strong>3.</strong> Mixing up the order: It's denominator × (derivative of numerator), not the reverse
                </p>
              </div>
              
              <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-400">
                <p className="text-lg text-red-800 dark:text-red-200">
                  <strong>4.</strong> Not checking domain restrictions: Remember g(x) ≠ 0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="quotient-rule-intro"
      slideTitle="The Quotient Rule"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="product-quotient-rules"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}