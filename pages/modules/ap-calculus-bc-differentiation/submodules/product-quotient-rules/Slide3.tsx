import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function ProductQuotientPracticeSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Product Rule example: x²sin x + 3x²
  const productRuleSteps: Step[] = [
    {
      id: 'identify-product-functions',
      question: <>Identify the two functions to use the Product Rule on in h(x) = x²sin x + 3x²</>,
      options: [
        { id: 'correct', text: 'Apply Product Rule to x²sin x only, then add derivative of 3x²', isCorrect: true },
        { id: 'wrong1', text: 'Use Product Rule on the entire expression x²sin x + 3x²', isCorrect: false },
        { id: 'wrong2', text: 'Use Product Rule on (x²sin x)(3x²)', isCorrect: false },
        { id: 'wrong3', text: 'Use Product Rule on (x² + 3x²)(sin x)', isCorrect: false }
      ],
      correctAnswer: 'Apply Product Rule to x²sin x only, then add derivative of 3x²',
      explanation: <>Since we have a sum, we differentiate each term separately. For x²sin x, use Product Rule with f(x) = x² and g(x) = sin x.</>,
      questionText: 'Identify where to apply Product Rule',
      nextStep: 'Find product rule derivatives'
    },
    {
      id: 'find-product-derivatives',
      question: <>For the product x²sin x, find f'(x) and g'(x)</>,
      options: [
        { id: 'correct', text: "f'(x) = 2x and g'(x) = cos x", isCorrect: true },
        { id: 'wrong1', text: "f'(x) = x² and g'(x) = -sin x", isCorrect: false },
        { id: 'wrong2', text: "f'(x) = 2x and g'(x) = -cos x", isCorrect: false },
        { id: 'wrong3', text: "f'(x) = x and g'(x) = cos x", isCorrect: false }
      ],
      correctAnswer: "f'(x) = 2x and g'(x) = cos x",
      explanation: <>f'(x) = d/dx(x²) = 2x and g'(x) = d/dx(sin x) = cos x</>,
      questionText: 'Find derivatives for Product Rule',
      nextStep: 'Apply product rule'
    },
    {
      id: 'apply-product-rule-term',
      question: <>Apply the Product Rule to x²sin x</>,
      options: [
        { id: 'wrong1', text: 'x² cos x + sin x · x²', isCorrect: false },
        { id: 'correct', text: 'x² cos x + sin x · 2x', isCorrect: true },
        { id: 'wrong2', text: '2x cos x + x² sin x', isCorrect: false },
        { id: 'wrong3', text: 'x² sin x + cos x · 2x', isCorrect: false }
      ],
      correctAnswer: 'x² cos x + sin x · 2x',
      explanation: <>Using Product Rule: f(x)g'(x) + g(x)f'(x) = x² cos x + sin x · 2x = x² cos x + 2x sin x</>,
      questionText: 'Apply Product Rule formula',
      nextStep: 'Add remaining derivative'
    },
    {
      id: 'add-remaining-term',
      question: <>Find the derivative of the remaining term 3x² and combine</>,
      options: [
        { id: 'wrong1', text: 'x² cos x + 2x sin x + 3x', isCorrect: false },
        { id: 'correct', text: 'x² cos x + 2x sin x + 6x', isCorrect: true },
        { id: 'wrong2', text: 'x² cos x + 2x sin x + 3', isCorrect: false },
        { id: 'wrong3', text: 'x² cos x + 2x sin x + 6x²', isCorrect: false }
      ],
      correctAnswer: 'x² cos x + 2x sin x + 6x',
      explanation: <>d/dx(3x²) = 6x, so h'(x) = x² cos x + 2x sin x + 6x</>,
      questionText: 'Complete the derivative'
    }
  ]

  // Quotient Rule example with sin x in denominator
  const quotientRuleSteps: Step[] = [
    {
      id: 'identify-quotient-functions',
      question: <>Identify the numerator f(x) and denominator g(x) in y = (2x² + 1)/sin x</>,
      options: [
        { id: 'correct', text: 'f(x) = 2x² + 1 and g(x) = sin x', isCorrect: true },
        { id: 'wrong1', text: 'f(x) = 2x² and g(x) = sin x + 1', isCorrect: false },
        { id: 'wrong2', text: 'f(x) = sin x and g(x) = 2x² + 1', isCorrect: false },
        { id: 'wrong3', text: 'f(x) = 2x and g(x) = x sin x', isCorrect: false }
      ],
      correctAnswer: 'f(x) = 2x² + 1 and g(x) = sin x',
      explanation: <>The numerator is f(x) = 2x² + 1 and the denominator is g(x) = sin x.</>,
      questionText: 'Identify numerator and denominator',
      nextStep: 'Find quotient derivatives'
    },
    {
      id: 'find-quotient-derivatives',
      question: <>Find f'(x) and g'(x)</>,
      options: [
        { id: 'correct', text: "f'(x) = 4x and g'(x) = cos x", isCorrect: true },
        { id: 'wrong1', text: "f'(x) = 2x and g'(x) = -sin x", isCorrect: false },
        { id: 'wrong2', text: "f'(x) = 4x and g'(x) = -cos x", isCorrect: false },
        { id: 'wrong3', text: "f'(x) = 4x² and g'(x) = cos x", isCorrect: false }
      ],
      correctAnswer: "f'(x) = 4x and g'(x) = cos x",
      explanation: <>f'(x) = d/dx(2x² + 1) = 4x and g'(x) = d/dx(sin x) = cos x</>,
      questionText: 'Find the derivatives',
      nextStep: 'Apply quotient rule'
    },
    {
      id: 'apply-quotient-rule-formula',
      question: <>Apply the Quotient Rule formula</>,
      options: [
        { id: 'wrong1', text: '[sin x · 4x + (2x² + 1) · cos x] / sin² x', isCorrect: false },
        { id: 'correct', text: '[sin x · 4x - (2x² + 1) · cos x] / sin² x', isCorrect: true },
        { id: 'wrong2', text: '[(2x² + 1) · 4x - sin x · cos x] / sin² x', isCorrect: false },
        { id: 'wrong3', text: '[4x · cos x - (2x² + 1) · sin x] / sin² x', isCorrect: false }
      ],
      correctAnswer: '[sin x · 4x - (2x² + 1) · cos x] / sin² x',
      explanation: <>Using Quotient Rule: [g(x)f'(x) - f(x)g'(x)] / [g(x)]² = [sin x · 4x - (2x² + 1) · cos x] / sin² x</>,
      questionText: 'Apply the Quotient Rule formula',
      nextStep: 'Simplify numerator'
    },
    {
      id: 'simplify-quotient-result',
      question: <>Simplify the numerator: sin x · 4x - (2x² + 1) · cos x</>,
      options: [
        { id: 'wrong1', text: '4x sin x - 2x² cos x + cos x', isCorrect: false },
        { id: 'correct', text: '4x sin x - 2x² cos x - cos x', isCorrect: true },
        { id: 'wrong2', text: '4x sin x - 2x² cos x - 1', isCorrect: false },
        { id: 'wrong3', text: '4x sin x + 2x² cos x - cos x', isCorrect: false }
      ],
      correctAnswer: '4x sin x - 2x² cos x - cos x',
      explanation: <>Expanding: sin x · 4x = 4x sin x and (2x² + 1) · cos x = 2x² cos x + cos x, so the numerator is 4x sin x - 2x² cos x - cos x</>,
      questionText: 'Simplify the numerator'
    }
  ]

  const productStepConfig: StepConfig = {
    steps: productRuleSteps,
    title: "Product Rule Practice",
    conceptId: "product-rule-practice",
    conceptName: "Product Rule with Mixed Terms",
    conceptDescription: "Applying Product Rule when combined with other terms",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the derivative of h(x) = x²sin x + 3x²:",
    },
    completionMessage: <>Complete! h'(x) = x² cos x + 2x sin x + 6x</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect Product Rule application!")
      }
    }
  }

  const quotientStepConfig: StepConfig = {
    steps: quotientRuleSteps,
    title: "Quotient Rule Practice",
    conceptId: "quotient-rule-practice",
    conceptName: "Quotient Rule with Trigonometric Denominator",
    conceptDescription: "Applying Quotient Rule with trigonometric functions in denominator",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the derivative of y = (2x² + 1)/sin x:",
    },
    completionMessage: <>Complete! y' = (4x sin x - 2x² cos x - cos x)/sin² x</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect Quotient Rule application!")
      }
    }
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Product Rule Practice */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">            
            <div className="space-y-4">              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-2">For h(x) = x²sin x + 3x²:</p>

              </div>
            </div>
          </div>
          
          {/* Product Rule Step-by-Step */}
          <StepByStepRenderer 
            config={productStepConfig}
            onInteractionComplete={handleInteractionComplete}
          />
        </div>

        {/* Right Column - Quotient Rule Practice */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-4">              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-2">For y = (2x² + 1)/sin x:</p>
              </div>  
            </div>
          </div>
          
          {/* Quotient Rule Step-by-Step */}
          <StepByStepRenderer 
            config={quotientStepConfig}
            onInteractionComplete={handleInteractionComplete}
          />
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="product-quotient-practice"
      slideTitle="Product and Quotient Rule Practice"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="product-quotient-rules"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}