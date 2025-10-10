import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function DifferentiationRulesSlide4() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions about the Sum and Difference Rules
  const questions: QuizQuestion[] = [
    {
      id: 'sum-rule-basic',
      question: <>What is the derivative of <InlineMath math="f(x) = x^3 + x^2" />?</>,
      options: ['3x² + 2x', 'x³ + x²', '3x² + x²', 'x² + 2x'],
      correctAnswer: '3x² + 2x',
      explanation: <>Using the Sum Rule: <InlineMath math="\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)" />. So <InlineMath math="\frac{d}{dx}[x^3 + x^2] = 3x^2 + 2x" />.</>,
      questionText: 'Derivative of x³ + x²'
    },
    {
      id: 'difference-rule',
      question: <>What is <InlineMath math="\frac{d}{dx}[x^4 - 3x + 7]" />?</>,
      options: ['4x³ - 3', '4x³ - 3x + 7', 'x⁴ - 3x', '4x³ - 3 + 7'],
      correctAnswer: '4x³ - 3',
      explanation: <>Apply the Difference Rule term by term: <InlineMath math="\frac{d}{dx}[x^4] - \frac{d}{dx}[3x] + \frac{d}{dx}[7] = 4x^3 - 3 + 0 = 4x^3 - 3" />.</>,
      questionText: 'Derivative of x⁴ - 3x + 7'
    },
    {
      id: 'multiple-terms',
      question: <>What is the derivative of <InlineMath math="h(x) = 2x^3 - x^2 + 5x - 1" />?</>,
      options: ['6x² - 2x + 5', '2x³ - x² + 5x', '6x² - 2x + 5 - 1', '6x² - x + 5'],
      correctAnswer: '6x² - 2x + 5',
      explanation: <>Apply rules term by term: <InlineMath math="h'(x) = 6x^2 - 2x + 5 - 0 = 6x^2 - 2x + 5" />.</>,
      questionText: 'Derivative of polynomial with multiple terms'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "sum-difference-rules",
    conceptName: "Sum and Difference Rules",
    conceptDescription: "Understanding the Sum and Difference Rules for differentiation",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Sum and Difference Rules */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <p className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                The Sum and Difference Rules:
              </p>
              <p className="text-blue-800 dark:text-blue-200 mb-3">
                The sum (or difference) of two differentiable functions <InlineMath math="f" /> and <InlineMath math="g" /> is itself differentiable. Moreover, the derivative of <InlineMath math="f \pm g" /> is the sum (or difference) of the derivatives of <InlineMath math="f" /> and <InlineMath math="g" />.
              </p>
              
              <div className="space-y-2">
                <div className="bg-white dark:bg-slate-700 p-3 rounded">
                  <p className="text-blue-800 dark:text-blue-200 font-semibold mb-1">Sum Rule:</p>
                  <BlockMath math="\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)" />
                </div>
                
                <div className="bg-white dark:bg-slate-700 p-3 rounded">
                  <p className="text-blue-800 dark:text-blue-200 font-semibold mb-1">Difference Rule:</p>
                  <BlockMath math="\frac{d}{dx}[f(x) - g(x)] = f'(x) - g'(x)" />
                </div>
              </div>
            </div>
          </div>

          {/* Proof */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Proof (Sum Rule)
            </h3>
            
            <p className="text-lg leading-relaxed mb-4">
              A proof of the Sum Rule follows from limit properties:
            </p>
            
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <BlockMath math="\frac{d}{dx}[f(x) + g(x)] = \lim_{\Delta x \to 0} \frac{[f(x + \Delta x) + g(x + \Delta x)] - [f(x) + g(x)]}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <BlockMath math="= \lim_{\Delta x \to 0} \frac{[f(x + \Delta x) - f(x)] + [g(x + \Delta x) - g(x)]}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <BlockMath math="= \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x} + \lim_{\Delta x \to 0} \frac{g(x + \Delta x) - g(x)}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <BlockMath math="= f'(x) + g'(x)" />
              </div>
            </div>
          </div>

          {/* Extension to Multiple Functions */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Extension to Multiple Functions
            </h3>
            
            <p className="text-lg leading-relaxed mb-4">
              The Sum and Difference Rules can be extended to any finite number of functions. For instance, if
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
              <BlockMath math="F(x) = f(x) + g(x) + h(x)" />
              <p className="text-green-800 dark:text-green-200 mt-2">then</p>
              <BlockMath math="F'(x) = f'(x) + g'(x) + h'(x)" />
            </div>
            
            <p className="text-lg leading-relaxed mt-4">
              This extends naturally to polynomials with many terms.
            </p>
          </div>
        </div>

        {/* Right Column - Examples and Practice */}
        <div className="space-y-6">
          
          {/* Examples */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Examples Using Sum and Difference Rules
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">a. <InlineMath math="f(x) = x^3 + 4x - 5" /></p>
                <p className="mb-2">Apply rules term by term:</p>
                <p><InlineMath math="f'(x) = \frac{d}{dx}[x^3] + \frac{d}{dx}[4x] - \frac{d}{dx}[5]" /></p>
                <p><InlineMath math="f'(x) = 3x^2 + 4 - 0 = 3x^2 + 4" /></p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">b. <InlineMath math="g(x) = \frac{x^4}{2} - 3x^3 + 2x" /></p>
                <p className="mb-2">Rewrite and differentiate:</p>
                <p><InlineMath math="g(x) = \frac{1}{2}x^4 - 3x^3 + 2x" /></p>
                <p><InlineMath math="g'(x) = \frac{1}{2} \cdot 4x^3 - 3 \cdot 3x^2 + 2 = 2x^3 - 9x^2 + 2" /></p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">c. <InlineMath math="h(t) = 5t^2 - \sqrt{t} + \frac{1}{t}" /></p>
                <p className="mb-2">Rewrite using exponents:</p>
                <p><InlineMath math="h(t) = 5t^2 - t^{1/2} + t^{-1}" /></p>
                <p><InlineMath math="h'(t) = 10t - \frac{1}{2}t^{-1/2} - t^{-2}" /></p>
                <p><InlineMath math="h'(t) = 10t - \frac{1}{2\sqrt{t}} - \frac{1}{t^2}" /></p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">d. <InlineMath math="F(x) = 3x^4 - 2x^3 + x^2 - 7x + 12" /></p>
                <p className="mb-2">Differentiate each term:</p>
                <p><InlineMath math="F'(x) = 12x^3 - 6x^2 + 2x - 7" /></p>
              </div>
            </div>
          </div>

          {/* Strategy for Polynomials */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Strategy for Polynomial Functions
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-400">
                <p className="text-green-800 dark:text-green-200">
                  <strong>Step 1:</strong> Identify each term in the polynomial.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-400">
                <p className="text-green-800 dark:text-green-200">
                  <strong>Step 2:</strong> Apply the appropriate rule to each term:
                  <br/>• Power Rule for x^n terms
                  <br/>• Constant Multiple Rule for coefficients
                  <br/>• Constant Rule for number terms
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-400">
                <p className="text-green-800 dark:text-green-200">
                  <strong>Step 3:</strong> Combine using Sum and Difference Rules.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-400">
                <p className="text-green-800 dark:text-green-200">
                  <strong>Step 4:</strong> Simplify the result.
                </p>
              </div>
            </div>
          </div>

          {/* Key Pattern */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Key Pattern
            </h3>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-yellow-800 dark:text-yellow-200 mb-3">
                <strong>For any polynomial:</strong>
              </p>
              <BlockMath math="P(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0" />
              <p className="text-yellow-800 dark:text-yellow-200 mt-3 mb-3">
                <strong>The derivative is:</strong>
              </p>
              <BlockMath math="P'(x) = na_n x^{n-1} + (n-1)a_{n-1} x^{n-2} + \cdots + a_1" />
              <p className="text-yellow-800 dark:text-yellow-200 mt-3">
                Notice that the constant term <InlineMath math="a_0" /> disappears!
              </p>
            </div>
          </div>

          {/* Quick Check Quiz */}
          <QuizRenderer 
            config={quizConfig}
            onInteractionComplete={handleInteractionComplete}
          />
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="sum-difference-rules"
      slideTitle="The Sum and Difference Rules"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiation-rules"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}