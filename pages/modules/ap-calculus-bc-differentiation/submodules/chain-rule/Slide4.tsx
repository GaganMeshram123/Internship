import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

export default function ChainRuleSlide4() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Practice Example 1: f(x) = (x² + 4)^(-1/3) - Simplifying derivative of quotient
  const practice1Steps: Step[] = [
    {
      id: 'original-function',
      question: <>Start with the original function <InlineMath math="f(x) = \sqrt[3]{x^2 + 4}" /></>,
      options: [
        { id: 'correct', text: '\\text{Rewrite as } f(x) = (x^2 + 4)^{1/3}', isCorrect: true },
        { id: 'wrong1', text: '\\text{Rewrite as } f(x) = (x^2 + 4)^3', isCorrect: false },
        { id: 'wrong2', text: '\\text{Use Product Rule directly}', isCorrect: false },
        { id: 'wrong3', text: '\\text{Use Quotient Rule directly}', isCorrect: false }
      ],
      correctAnswer: '\\text{Rewrite as } f(x) = (x^2 + 4)^{1/3}',
      explanation: <>We rewrite <InlineMath math="f(x) = \sqrt[3]{x^2 + 4}" /> as <InlineMath math="f(x) = (x^2 + 4)^{1/3}" /> to use the Chain Rule.</>,
      questionText: 'Original function',
      nextStep: 'Apply Chain Rule'
    },
    {
      id: 'chain-rule-application',
      question: <>Apply the Chain Rule: <InlineMath math="\frac{d}{dx}[u^n] = n \cdot u^{n-1} \cdot u'" /></>,
      options: [
        { id: 'correct', text: 'f\'(x) = \\frac{1}{3}(x^2 + 4)^{-2/3} \\cdot 2x', isCorrect: true },
        { id: 'wrong1', text: 'f\'(x) = \\frac{1}{3}(x^2 + 4)^{1/3} \\cdot 2x', isCorrect: false },
        { id: 'wrong2', text: 'f\'(x) = \\frac{2}{3}(x^2 + 4)^{-1/3} \\cdot 2x', isCorrect: false },
        { id: 'wrong3', text: 'f\'(x) = \\frac{1}{3}(x^2 + 4)^{2/3} \\cdot 2x', isCorrect: false }
      ],
      correctAnswer: 'f\'(x) = \\frac{1}{3}(x^2 + 4)^{-2/3} \\cdot 2x',
      explanation: <>Using Chain Rule: <InlineMath math="f'(x) = \frac{1}{3}(x^2 + 4)^{1/3-1} \cdot 2x = \frac{1}{3}(x^2 + 4)^{-2/3} \cdot 2x" /></>,
      questionText: 'Apply Chain Rule',
      nextStep: 'Simplify expression'
    },
    {
      id: 'factor-and-simplify',
      question: <>Factor and simplify <InlineMath math="f'(x) = \frac{1}{3}(x^2 + 4)^{-2/3} \cdot 2x" /></>,
      options: [
        { id: 'wrong1', text: 'f\'(x) = \\frac{2x}{(x^2 + 4)^{2/3}}', isCorrect: false },
        { id: 'correct', text: 'f\'(x) = \\frac{2x}{3(x^2 + 4)^{2/3}}', isCorrect: true },
        { id: 'wrong2', text: 'f\'(x) = \\frac{6x}{(x^2 + 4)^{2/3}}', isCorrect: false },
        { id: 'wrong3', text: 'f\'(x) = \\frac{2x}{3(x^2 + 4)^{1/3}}', isCorrect: false }
      ],
      correctAnswer: 'f\'(x) = \\frac{2x}{3(x^2 + 4)^{2/3}}',
      explanation: <>Simplifying: <InlineMath math="f'(x) = \frac{1}{3} \cdot 2x \cdot (x^2 + 4)^{-2/3} = \frac{2x}{3(x^2 + 4)^{2/3}}" /></>,
      questionText: 'Factor and simplify'
    },
    {
      id: 'write-radical-form',
      question: <>Write the final answer in radical form</>,
      options: [
        { id: 'wrong1', text: 'f\'(x) = \\frac{2x}{3\\sqrt[3]{x^2 + 4}}', isCorrect: false },
        { id: 'correct', text: 'f\'(x) = \\frac{2x}{3\\sqrt[3]{(x^2 + 4)^2}}', isCorrect: true },
        { id: 'wrong2', text: 'f\'(x) = \\frac{2x}{3(x^2 + 4)^2}', isCorrect: false },
        { id: 'wrong3', text: 'f\'(x) = \\frac{6x}{\\sqrt[3]{(x^2 + 4)^2}}', isCorrect: false }
      ],
      correctAnswer: 'f\'(x) = \\frac{2x}{3\\sqrt[3]{(x^2 + 4)^2}}',
      explanation: <>Converting to radical form: <InlineMath math="f'(x) = \frac{2x}{3(x^2 + 4)^{2/3}} = \frac{2x}{3\sqrt[3]{(x^2 + 4)^2}}" /></>,
      questionText: 'Write in radical form'
    }
  ]

  // Practice Example 2: y = (3x + 1)²/(x² + 3) - Simplifying derivative of power
  const practice2Steps: Step[] = [
    {
      id: 'identify-structure',
      question: <>For <InlineMath math="y = \left(\frac{3x + 1}{x^2 + 3}\right)^2" />, identify the best approach</>,
      options: [
        { id: 'correct', text: '\\text{Use Chain Rule with } u = \\frac{3x + 1}{x^2 + 3} \\text{ and } n = 2', isCorrect: true },
        { id: 'wrong1', text: '\\text{Use Product Rule on } (3x + 1)^2 \\text{ and } (x^2 + 3)^2', isCorrect: false },
        { id: 'wrong2', text: '\\text{Expand the square first, then differentiate}', isCorrect: false },
        { id: 'wrong3', text: '\\text{Use Quotient Rule directly on the original function}', isCorrect: false }
      ],
      correctAnswer: '\\text{Use Chain Rule with } u = \\frac{3x + 1}{x^2 + 3} \\text{ and } n = 2',
      explanation: <>This is a function of the form <InlineMath math="y = [u(x)]^n" /> where <InlineMath math="u = \frac{3x + 1}{x^2 + 3}" /> and <InlineMath math="n = 2" />.</>,
      questionText: 'Identify the structure',
      nextStep: 'Apply Chain Rule'
    },
    {
      id: 'apply-chain-rule',
      question: <>Apply the Chain Rule: <InlineMath math="\frac{d}{dx}[u^2] = 2u \cdot u'" /></>,
      options: [
        { id: 'correct', text: 'y\' = 2 \\cdot \\frac{3x + 1}{x^2 + 3} \\cdot \\frac{d}{dx}\\left[\\frac{3x + 1}{x^2 + 3}\\right]', isCorrect: true },
        { id: 'wrong1', text: 'y\' = 2 \\cdot (3x + 1)^2 \\cdot \\frac{d}{dx}\\left[\\frac{3x + 1}{x^2 + 3}\\right]', isCorrect: false },
        { id: 'wrong2', text: 'y\' = \\frac{3x + 1}{x^2 + 3} \\cdot \\frac{d}{dx}\\left[\\frac{3x + 1}{x^2 + 3}\\right]', isCorrect: false },
        { id: 'wrong3', text: 'y\' = 2 \\cdot \\frac{d}{dx}\\left[\\frac{3x + 1}{x^2 + 3}\\right]', isCorrect: false }
      ],
      correctAnswer: 'y\' = 2 \\cdot \\frac{3x + 1}{x^2 + 3} \\cdot \\frac{d}{dx}\\left[\\frac{3x + 1}{x^2 + 3}\\right]',
      explanation: <>Using Chain Rule: <InlineMath math="y' = 2 \cdot \frac{3x + 1}{x^2 + 3} \cdot \frac{d}{dx}\left[\frac{3x + 1}{x^2 + 3}\right]" /></>,
      questionText: 'Apply Chain Rule',
      nextStep: 'Find quotient derivative'
    },
    {
      id: 'quotient-rule',
      question: <>Find <InlineMath math="\frac{d}{dx}\left[\frac{3x + 1}{x^2 + 3}\right]" /> using the Quotient Rule</>,
      options: [
        { id: 'wrong1', text: '\\frac{(x^2 + 3)(3) + (3x + 1)(2x)}{(x^2 + 3)^2}', isCorrect: false },
        { id: 'correct', text: '\\frac{(x^2 + 3)(3) - (3x + 1)(2x)}{(x^2 + 3)^2}', isCorrect: true },
        { id: 'wrong2', text: '\\frac{(3x + 1)(3) - (x^2 + 3)(2x)}{(x^2 + 3)^2}', isCorrect: false },
        { id: 'wrong3', text: '\\frac{3(2x) - (3x + 1)(x^2 + 3)}{(x^2 + 3)^2}', isCorrect: false }
      ],
      correctAnswer: '\\frac{(x^2 + 3)(3) - (3x + 1)(2x)}{(x^2 + 3)^2}',
      explanation: <>Using Quotient Rule: <InlineMath math="\frac{d}{dx}\left[\frac{3x + 1}{x^2 + 3}\right] = \frac{(x^2 + 3)(3) - (3x + 1)(2x)}{(x^2 + 3)^2}" /></>,
      questionText: 'Apply Quotient Rule',
      nextStep: 'Multiply and expand'
    },
    {
      id: 'multiply-expand',
      question: <>Expand the numerator: <InlineMath math="(x^2 + 3)(3) - (3x + 1)(2x)" /></>,
      options: [
        { id: 'wrong1', text: '3x^2 + 9 - 6x^2 + 2x', isCorrect: false },
        { id: 'correct', text: '3x^2 + 9 - 6x^2 - 2x', isCorrect: true },
        { id: 'wrong2', text: '3x^2 + 9 - 6x^2 - x', isCorrect: false },
        { id: 'wrong3', text: 'x^2 + 9 - 6x^2 - 2x', isCorrect: false }
      ],
      correctAnswer: '3x^2 + 9 - 6x^2 - 2x',
      explanation: <>Expanding: <InlineMath math="(x^2 + 3)(3) = 3x^2 + 9" /> and <InlineMath math="(3x + 1)(2x) = 6x^2 + 2x" /></>,
      questionText: 'Expand numerator',
      nextStep: 'Combine and simplify'
    },
    {
      id: 'final-simplification',
      question: <>Combine and write the final simplified answer</>,
      options: [
        { id: 'wrong1', text: 'y\' = \\frac{2(3x + 1)(9 - 2x)}{(x^2 + 3)^3}', isCorrect: false },
        { id: 'correct', text: 'y\' = \\frac{2(3x + 1)(-3x^2 - 2x + 9)}{(x^2 + 3)^3}', isCorrect: true },
        { id: 'wrong2', text: 'y\' = \\frac{2(3x + 1)(3x^2 - 2x + 9)}{(x^2 + 3)^3}', isCorrect: false },
        { id: 'wrong3', text: 'y\' = \\frac{(3x + 1)(-3x^2 - 2x + 9)}{(x^2 + 3)^3}', isCorrect: false }
      ],
      correctAnswer: 'y\' = \\frac{2(3x + 1)(-3x^2 - 2x + 9)}{(x^2 + 3)^3}',
      explanation: <>Final result: <InlineMath math="y' = 2 \cdot \frac{3x + 1}{x^2 + 3} \cdot \frac{-3x^2 - 2x + 9}{(x^2 + 3)^2} = \frac{2(3x + 1)(-3x^2 - 2x + 9)}{(x^2 + 3)^3}" /></>,
      questionText: 'Write final answer'
    }
  ]

  const practice1Config: StepConfig = {
    steps: practice1Steps,
    title: "Practice 1: Simplifying Derivative of a Quotient",
    conceptId: "chain-rule-practice-1",
    conceptName: "Chain Rule Practice: Quotient Simplification",
    conceptDescription: "Step-by-step simplification of a radical function derivative",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Simplify the derivative of f(x) = ∛(x² + 4):",
    },
    completionMessage: <>Complete! f'(x) = (2x)/(3∛((x² + 4)²))</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect quotient simplification!")
      }
    }
  }

  const practice2Config: StepConfig = {
    steps: practice2Steps,
    title: "Practice 2: Simplifying Derivative of a Power",
    conceptId: "chain-rule-practice-2",
    conceptName: "Chain Rule Practice: Power Simplification",
    conceptDescription: "Combining Chain Rule and Quotient Rule for complex expressions",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the derivative of y = [(3x + 1)/(x² + 3)]²:",
    },
    completionMessage: <>Complete! y' = 2(3x + 1)(-3x² - 2x + 9)/(x² + 3)³</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect power simplification!")
      }
    }
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Practice 1 */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200 mb-3 text-lg">
                  <strong>Practice Problems:</strong> These examples demonstrate how to simplify derivatives 
                  obtained using the Chain Rule.
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2 text-lg">
                  Key Strategy:
                </p>
                <p className="text-yellow-800 dark:text-yellow-200 text-lg">
                  After applying the Chain Rule, factor and simplify to get the cleanest form.
                </p>
              </div>
            </div>
          </div>
          
          {/* Practice 1 */}
          <StepByStepRenderer 
            config={practice1Config}
            onInteractionComplete={handleInteractionComplete}
          />
        </div>

        {/* Right Column - Practice 2 */}
        <div className="space-y-6">
          
          {/* Practice 2 */}
          <StepByStepRenderer 
            config={practice2Config}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Key Strategies */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Simplification Strategies
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-lg">
                  <strong>1.</strong> Factor common terms from numerators
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>2.</strong> Convert negative exponents to fractions
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>3.</strong> Write fractional exponents in radical form when requested
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>4.</strong> Combine like terms and factor when possible
                </p>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <p className="text-lg">
                  <strong>5.</strong> For complex compositions, work step-by-step and don't skip algebra
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
      slideId="chain-rule-practice"
      slideTitle="Chain Rule Practice Problems"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="chain-rule"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}