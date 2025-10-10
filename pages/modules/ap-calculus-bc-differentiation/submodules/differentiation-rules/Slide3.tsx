import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function DifferentiationRulesSlide3() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions about the Constant Multiple Rule
  const questions: QuizQuestion[] = [
    {
      id: 'constant-multiple-basic',
      question: <>What is the derivative of <InlineMath math="f(x) = 5x^3" />?</>,
      options: ['5x²', '15x²', 'x³', '5x³'],
      correctAnswer: '15x²',
      explanation: <>Using the Constant Multiple Rule: <InlineMath math="\frac{d}{dx}[cf(x)] = c \cdot f'(x)" />. So <InlineMath math="\frac{d}{dx}[5x^3] = 5 \cdot 3x^2 = 15x^2" />.</>,
      questionText: 'Derivative of 5x³'
    },
    {
      id: 'fraction-constant',
      question: <>What is <InlineMath math="\frac{d}{dx}\left[\frac{1}{2}x^4\right]" />?</>,
      options: ['2x³', '½x³', '2x⁴', '½x⁴'],
      correctAnswer: '2x³',
      explanation: <>Apply the Constant Multiple Rule: <InlineMath math="\frac{d}{dx}\left[\frac{1}{2}x^4\right] = \frac{1}{2} \cdot 4x^3 = 2x^3" />.</>,
      questionText: 'Derivative of ½x⁴'
    },
    {
      id: 'negative-constant',
      question: <>What is the derivative of <InlineMath math="g(t) = -3t^2" />?</>,
      options: ['-6t', '3t', '-3t', '-6t²'],
      correctAnswer: '-6t',
      explanation: <>Using the Constant Multiple Rule: <InlineMath math="g'(t) = -3 \cdot 2t = -6t" />.</>,
      questionText: 'Derivative of -3t²'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "constant-multiple-rule",
    conceptName: "Constant Multiple Rule",
    conceptDescription: "Understanding the Constant Multiple Rule for differentiation",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Constant Multiple Rule */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <p className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                The Constant Multiple Rule:
              </p>
              <p className="text-blue-800 dark:text-blue-200 mb-3">
                If <InlineMath math="f" /> is a differentiable function and <InlineMath math="c" /> is a real number, then <InlineMath math="cf" /> is also differentiable and
              </p>
              <BlockMath math="\frac{d}{dx}[cf(x)] = c \cdot f'(x)" />
            </div>
            
            <p className="text-lg leading-relaxed mb-4">
              Informally, the Constant Multiple Rule states that constants can be factored out of the differentiation process, even if the constants appear in the denominator.
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
              <BlockMath math="\frac{d}{dx}[cf(x)] = c \cdot \frac{d}{dx}[f(x)] = c \cdot f'(x)" />
              <BlockMath math="\frac{d}{dx}\left[\frac{f(x)}{c}\right] = \frac{d}{dx}\left[\frac{1}{c} \cdot f(x)\right] = \frac{1}{c} \cdot \frac{d}{dx}[f(x)] = \frac{1}{c} \cdot f'(x)" />
            </div>
          </div>

          {/* Proof */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Proof
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Definition of derivative:</p>
                <BlockMath math="\frac{d}{dx}[cf(x)] = \lim_{\Delta x \to 0} \frac{cf(x + \Delta x) - cf(x)}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Factor out the constant:</p>
                <BlockMath math="= \lim_{\Delta x \to 0} \frac{c[f(x + \Delta x) - f(x)]}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Apply limit properties:</p>
                <BlockMath math="= c \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <BlockMath math="= c \cdot f'(x)" />
              </div>
            </div>
          </div>

          {/* Combination Rule */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Combination with Power Rule
            </h3>
            
            <p className="text-lg leading-relaxed mb-4">
              The Constant Multiple Rule and the Power Rule can be combined into one rule:
            </p>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
              <BlockMath math="\frac{d}{dx}[cx^n] = cnx^{n-1}" />
              <p className="text-yellow-800 dark:text-yellow-200 mt-2">
                This combines both rules for efficiency when dealing with terms like <InlineMath math="5x^3" /> or <InlineMath math="-2x^7" />.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Examples and Practice */}
        <div className="space-y-6">
          
          {/* Examples */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Examples Using the Constant Multiple Rule
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">a. <InlineMath math="y = \frac{2x-1}{x}" /></p>
                <p className="mb-2">Rewrite as: <InlineMath math="y = 2x^{-1} - x^{-1}" /></p>
                <p><InlineMath math="\frac{dy}{dx} = \frac{d}{dx}[2x^{-1}] - \frac{d}{dx}[x^{-1}] = 2(-1)x^{-2} - (-1)x^{-2} = -2x^{-2} + x^{-2} = -\frac{2}{x^2}" /></p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">b. <InlineMath math="f(t) = \frac{4t^2}{5}" /></p>
                <p className="mb-2">Rewrite as: <InlineMath math="f(t) = \frac{4}{5}t^2" /></p>
                <p><InlineMath math="f'(t) = \frac{4}{5} \cdot 2t = \frac{8t}{5}" /></p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">c. <InlineMath math="y = 2\sqrt{x}" /></p>
                <p className="mb-2">Rewrite as: <InlineMath math="y = 2x^{1/2}" /></p>
                <p><InlineMath math="\frac{dy}{dx} = 2 \cdot \frac{1}{2}x^{-1/2} = x^{-1/2} = \frac{1}{\sqrt{x}}" /></p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">d. <InlineMath math="y = \frac{1}{2\sqrt[3]{x^2}}" /></p>
                <p className="mb-2">Rewrite as: <InlineMath math="y = \frac{1}{2}x^{-2/3}" /></p>
                <p><InlineMath math="\frac{dy}{dx} = \frac{1}{2} \cdot \left(-\frac{2}{3}\right)x^{-5/3} = -\frac{1}{3x^{5/3}}" /></p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">e. <InlineMath math="y = \frac{3}{2\sqrt{x}}" /></p>
                <p className="mb-2">Rewrite as: <InlineMath math="y = \frac{3}{2}x^{-1/2}" /></p>
                <p><InlineMath math="\frac{dy}{dx} = \frac{3}{2} \cdot \left(-\frac{1}{2}\right)x^{-3/2} = -\frac{3}{4x^{3/2}}" /></p>
              </div>
            </div>
          </div>

          {/* Strategy Tips */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Strategy Tips
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-400">
                <p className="text-green-800 dark:text-green-200">
                  <strong>Step 1:</strong> Rewrite fractions and radicals using negative and fractional exponents.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-400">
                <p className="text-green-800 dark:text-green-200">
                  <strong>Step 2:</strong> Factor out constants and apply the Power Rule.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-400">
                <p className="text-green-800 dark:text-green-200">
                  <strong>Step 3:</strong> Simplify the result, converting back to radical or fraction form if needed.
                </p>
              </div>
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
      slideId="constant-multiple-rule"
      slideTitle="The Constant Multiple Rule"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiation-rules"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}