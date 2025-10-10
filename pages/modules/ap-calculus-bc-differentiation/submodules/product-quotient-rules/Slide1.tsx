import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function ProductRuleSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Step-by-step example: Using the Product Rule
  const productRuleSteps: Step[] = [
    {
      id: 'identify-functions',
      question: <>Identify the two functions f(x) and g(x) in the product y = 2x³ cos x</>,
      options: [
        { id: 'correct', text: 'f(x) = 2x³ and g(x) = cos x', isCorrect: true },
        { id: 'wrong1', text: 'f(x) = 2x and g(x) = x² cos x', isCorrect: false },
        { id: 'wrong2', text: 'f(x) = 2 and g(x) = x³ cos x', isCorrect: false },
        { id: 'wrong3', text: 'f(x) = x³ and g(x) = 2 cos x', isCorrect: false }
      ],
      correctAnswer: 'f(x) = 2x³ and g(x) = cos x',
      explanation: <>We identify f(x) = 2x³ as the first function and g(x) = cos x as the second function.</>,
      questionText: 'Identify the functions',
      nextStep: 'Find derivatives'
    },
    {
      id: 'find-derivatives',
      question: <>Find f'(x) and g'(x)</>,
      options: [
        { id: 'correct', text: "f'(x) = 6x² and g'(x) = -sin x", isCorrect: true },
        { id: 'wrong1', text: "f'(x) = 2x² and g'(x) = sin x", isCorrect: false },
        { id: 'wrong2', text: "f'(x) = 6x³ and g'(x) = -sin x", isCorrect: false },
        { id: 'wrong3', text: "f'(x) = 6x² and g'(x) = sin x", isCorrect: false }
      ],
      correctAnswer: "f'(x) = 6x² and g'(x) = -sin x",
      explanation: <>f'(x) = d/dx(2x³) = 6x² and g'(x) = d/dx(cos x) = -sin x</>,
      questionText: 'Find the derivatives',
      nextStep: 'Apply Product Rule'
    },
    {
      id: 'apply-product-rule',
      question: <>Apply the Product Rule: d/dx[f(x)g(x)] = f(x)g'(x) + g(x)f'(x)</>,
      options: [
        { id: 'wrong1', text: '2x³(-sin x) + cos x · 2x³', isCorrect: false },
        { id: 'correct', text: '2x³(-sin x) + cos x · 6x²', isCorrect: true },
        { id: 'wrong2', text: '6x²(-sin x) + 2x³ cos x', isCorrect: false },
        { id: 'wrong3', text: '2x³ cos x + (-sin x) · 6x²', isCorrect: false }
      ],
      correctAnswer: '2x³(-sin x) + cos x · 6x²',
      explanation: <>Using the Product Rule: (2x³)(-sin x) + (cos x)(6x²) = -2x³ sin x + 6x² cos x</>,
      questionText: 'Apply the Product Rule formula',
      nextStep: 'Simplify result'
    },
    {
      id: 'simplify-result',
      question: <>Simplify the final result</>,
      options: [
        { id: 'wrong1', text: '-2x³ sin x + 6x² cos x', isCorrect: false },
        { id: 'correct', text: '2x²(3 cos x - x sin x)', isCorrect: true },
        { id: 'wrong2', text: '2x³(3 cos x - sin x)', isCorrect: false },
        { id: 'wrong3', text: '6x²(cos x - x sin x)', isCorrect: false }
      ],
      correctAnswer: '2x²(3 cos x - x sin x)',
      explanation: <>Factor out 2x²: -2x³ sin x + 6x² cos x = 2x²(3 cos x - x sin x)</>,
      questionText: 'Simplify the expression'
    }
  ]

  const stepConfig: StepConfig = {
    steps: productRuleSteps,
    title: "Using the Product Rule",
    conceptId: "product-rule-application",
    conceptName: "Applying the Product Rule",
    conceptDescription: "Step-by-step application of the Product Rule to find derivatives",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the derivative of y = 2x³ cos x using the Product Rule:",
    },
    completionMessage: <>Complete! The derivative is 2x²(3 cos x - x sin x).</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect Product Rule application!")
      }
    }
  }

  // Quiz questions
  const questions: QuizQuestion[] = [
    {
      id: 'product-rule-form',
      question: <>What is the correct form of the Product Rule?</>,
      options: [
        'd/dx[f(x)g(x)] = f\'(x)g\'(x)',
        'd/dx[f(x)g(x)] = f(x)g\'(x) + g(x)f\'(x)',
        'd/dx[f(x)g(x)] = f\'(x) + g\'(x)',
        'd/dx[f(x)g(x)] = f(x) + g(x)'
      ],
      correctAnswer: 'd/dx[f(x)g(x)] = f(x)g\'(x) + g(x)f\'(x)',
      explanation: <>The Product Rule states: the derivative of a product is the first function times the derivative of the second, plus the second function times the derivative of the first.</>,
      questionText: 'Product Rule formula'
    },
    {
      id: 'when-to-use',
      question: <>When should you use the Product Rule?</>,
      options: [
        'When you have a sum of two functions',
        'When you have a product of two differentiable functions',
        'When you have a composite function',
        'When you have a quotient of two functions'
      ],
      correctAnswer: 'When you have a product of two differentiable functions',
      explanation: <>The Product Rule is specifically designed for finding derivatives of products of two (or more) differentiable functions.</>,
      questionText: 'When to apply Product Rule'
    },
    {
      id: 'alternative-approach',
      question: <>For h(x) = (3x - 2x²)(5 - 4x), which approach would be easier?</>,
      options: [
        'Always use the Product Rule',
        'Expand first, then differentiate',
        'Use the Quotient Rule',
        'Use the Chain Rule'
      ],
      correctAnswer: 'Expand first, then differentiate',
      explanation: <>For polynomial products, it's often easier to expand first: h(x) = 15x - 12x² - 10x² + 8x³ = 8x³ - 22x² + 15x, then h\'(x) = 24x² - 44x + 15.</>,
      questionText: 'Choosing the best method'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "product-rule-concepts",
    conceptName: "Product Rule Concepts",
    conceptDescription: "Understanding when and how to use the Product Rule",
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
                  <strong>The Product Rule:</strong> The product of two differentiable functions f and g is itself differentiable.
                </p>
                <p className="text-blue-800 dark:text-blue-200">
                  Moreover, the derivative of fg is the first function times the derivative of the second, 
                  plus the second function times the derivative of the first.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-3">Product Rule Formula:</p>
                <BlockMath math="\frac{d}{dx}[f(x)g(x)] = f(x)g'(x) + g(x)f'(x)" />
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
                  Alternative Form:
                </p>
                <BlockMath math="\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)" />
                <p className="text-yellow-800 dark:text-yellow-200 text-sm mt-2">
                  Some people prefer this form because it generalizes easily to products of three or more factors.
                </p>
              </div>
            </div>
          </div>

          {/* Proof Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Proof of the Product Rule
            </h3>
            
            <div className="space-y-4 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                This proof involves a clever step—subtracting and adding the same quantity:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                <div className="space-y-3">
                  <BlockMath math="\frac{d}{dx}[f(x)g(x)] = \lim_{\Delta x \to 0} \frac{f(x + \Delta x)g(x + \Delta x) - f(x)g(x)}{\Delta x}" />
                  
                  <p className="text-center text-red-600 dark:text-red-400 font-medium">
                    Add and subtract f(x + Δx)g(x):
                  </p>
                  
                  <BlockMath math="= \lim_{\Delta x \to 0} \frac{f(x + \Delta x)g(x + \Delta x) - f(x + \Delta x)g(x) + f(x + \Delta x)g(x) - f(x)g(x)}{\Delta x}" />
                  
                  <BlockMath math="= \lim_{\Delta x \to 0} \left[ f(x + \Delta x) \frac{g(x + \Delta x) - g(x)}{\Delta x} + g(x) \frac{f(x + \Delta x) - f(x)}{\Delta x} \right]" />
                  
                  <BlockMath math="= \lim_{\Delta x \to 0} f(x + \Delta x) \cdot \lim_{\Delta x \to 0} \frac{g(x + \Delta x) - g(x)}{\Delta x} + g(x) \cdot \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x}" />
                  
                  <BlockMath math="= f(x) \cdot g'(x) + g(x) \cdot f'(x)" />
                </div>
              </div>
            </div>
          </div>

          {/* When Not to Use Product Rule */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Alternative Approach
            </h3>
            
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                For some functions, expanding first might be easier than using the Product Rule:
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="font-medium mb-2">Example: h(x) = (4x - x²)(3 + 2x)</p>
                <p className="text-sm mb-3">Method 1 - Expand first:</p>
                <BlockMath math="h(x) = 12x + 8x^2 - 3x^2 - 2x^3 = -2x^3 + 5x^2 + 12x" />
                <BlockMath math="h'(x) = -6x^2 + 10x + 12" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> In some cases (like when functions involve trigonometric, exponential, 
                  or logarithmic terms), the Product Rule is necessary and expansion is not possible.
                </p>
              </div>
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

          {/* Key Points */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Key Points
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm">
                  <strong>1.</strong> Product Rule applies to products of differentiable functions
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm">
                  <strong>2.</strong> Formula: first × derivative of second + second × derivative of first
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm">
                  <strong>3.</strong> Sometimes expanding first is easier for polynomial products
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm">
                  <strong>4.</strong> Essential for products involving transcendental functions
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
      slideId="product-rule-intro"
      slideTitle="The Product Rule"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="product-quotient-rules"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}