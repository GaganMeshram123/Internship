import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function DifferentiationRulesSlide2() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions about the Power Rule
  const questions: QuizQuestion[] = [
    {
      id: 'power-rule-basic',
      question: <>What is the derivative of <InlineMath math="f(x) = x^5" />?</>,
      options: ['5x⁴', 'x⁴', '5x⁵', '5'],
      correctAnswer: '5x⁴',
      explanation: <>Using the Power Rule: <InlineMath math="\frac{d}{dx}[x^n] = nx^{n-1}" />. For <InlineMath math="f(x) = x^5" />, we get <InlineMath math="f'(x) = 5x^4" />.</>,
      questionText: 'Derivative of x⁵'
    },
    {
      id: 'power-rule-linear',
      question: <>What is <InlineMath math="\frac{d}{dx}[x]" />?</>,
      options: ['0', '1', 'x', 'x²'],
      correctAnswer: '1',
      explanation: <>When <InlineMath math="n = 1" />, the Power Rule gives us <InlineMath math="\frac{d}{dx}[x^1] = 1 \cdot x^{1-1} = 1 \cdot x^0 = 1" />. This is consistent with the slope of <InlineMath math="y = x" /> being 1.</>,
      questionText: 'Derivative of x'
    },
    {
      id: 'binomial-expansion',
      question: <>What is the expansion of <InlineMath math="(x + \Delta x)^3" />?</>,
      options: [
        'x³ + 3x²Δx + 3x(Δx)² + (Δx)³',
        'x³ + 3x²Δx + (Δx)³',
        'x³ + x²Δx + x(Δx)² + (Δx)³',
        'x³ + (Δx)³'
      ],
      correctAnswer: 'x³ + 3x²Δx + 3x(Δx)² + (Δx)³',
      explanation: <>Using the binomial expansion formula: <InlineMath math="(x + \Delta x)^3 = x^3 + 3x^2(\Delta x) + 3x(\Delta x)^2 + (\Delta x)^3" />.</>,
      questionText: 'Binomial expansion of (x + Δx)³'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "power-rule",
    conceptName: "Power Rule",
    conceptDescription: "Understanding the Power Rule for differentiation",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Power Rule */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <p className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                The Power Rule:
              </p>
              <p className="text-blue-800 dark:text-blue-200 mb-3">
                If <InlineMath math="n" /> is a rational number, then the function <InlineMath math="f(x) = x^n" /> is differentiable and
              </p>
              <BlockMath math="\frac{d}{dx}[x^n] = nx^{n-1}" />
              <p className="text-blue-800 dark:text-blue-200 mt-2">
                For <InlineMath math="f" /> to be differentiable at <InlineMath math="x = 0" />, <InlineMath math="n" /> must be a number such that <InlineMath math="x^{n-1}" /> is defined on an interval containing 0.
              </p>
            </div>
          </div>

          {/* Binomial Expansion Review */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Binomial Expansion Review
            </h3>
            
            <p className="text-lg leading-relaxed mb-4">
              Before proving the Power Rule, it's important to review the procedure for expanding a binomial:
            </p>
            
            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <BlockMath math="(x + \Delta x)^2 = x^2 + 2x(\Delta x) + (\Delta x)^2" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <BlockMath math="(x + \Delta x)^3 = x^3 + 3x^2(\Delta x) + 3x(\Delta x)^2 + (\Delta x)^3" />
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800 dark:text-blue-200 mb-2">
                <strong>General Binomial Expansion:</strong>
              </p>
              <p className="text-blue-800 dark:text-blue-200 mb-3">
                For a positive integer <InlineMath math="n" />:
              </p>
              <BlockMath math="(x + \Delta x)^n = x^n + nx^{n-1}(\Delta x) + \text{higher order terms}" />
              <p className="text-blue-800 dark:text-blue-200 mt-2 text-sm">
                where higher order terms contain <InlineMath math="(\Delta x)^2, (\Delta x)^3, \ldots, (\Delta x)^n" />
              </p>
            </div>
          </div>

          {/* Special Case: n = 1 */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Special Case: n = 1
            </h3>
            
            <p className="text-lg leading-relaxed mb-4">
              When using the Power Rule, the case for which <InlineMath math="n = 1" /> is best thought of as a separate differentiation rule:
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400 mb-4">
              <BlockMath math="\frac{d}{dx}[x] = 1" />
              <p className="text-green-800 dark:text-green-200 mt-2">
                Power Rule when <InlineMath math="n = 1" />
              </p>
            </div>
            
            <p className="text-lg leading-relaxed">
              This rule is consistent with the fact that the slope of the line <InlineMath math="y = x" /> is 1.
            </p>
          </div>
        </div>

        {/* Right Column - Proof and Examples */}
        <div className="space-y-6">
          
          {/* Proof for Positive Integer n > 1 */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Proof (for positive integer n &gt; 1)
            </h3>
            
            <p className="text-lg leading-relaxed mb-4">
              If <InlineMath math="n" /> is a positive integer greater than 1, then the binomial expansion produces:
            </p>
            
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <BlockMath math="\frac{d}{dx}[x^n] = \lim_{\Delta x \to 0} \frac{(x + \Delta x)^n - x^n}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Using binomial expansion:</p>
                <BlockMath math="= \lim_{\Delta x \to 0} \frac{[x^n + nx^{n-1}(\Delta x) + \text{higher order terms}] - x^n}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Cancel x^n and factor out Δx:</p>
                <BlockMath math="= \lim_{\Delta x \to 0} \frac{nx^{n-1}(\Delta x) + \text{terms with } (\Delta x)^2 \text{ and higher}}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <BlockMath math="= \lim_{\Delta x \to 0} \left[nx^{n-1} + \text{terms with } \Delta x\right]" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <BlockMath math="= nx^{n-1} + 0 + \cdots + 0 = nx^{n-1}" />
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400 mt-4">
              <p className="text-green-800 dark:text-green-200">
                This proves the case for which <InlineMath math="n" /> is a positive integer greater than 1. Note that <InlineMath math="\Delta x" /> is a factor of all terms except the first, so they approach 0 as <InlineMath math="\Delta x \to 0" />.
              </p>
            </div>
          </div>

          {/* Examples */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Examples Using the Power Rule
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">1. <InlineMath math="f(x) = x^4" /></p>
                <p><InlineMath math="f'(x) = 4x^3" /></p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">2. <InlineMath math="y = x^{10}" /></p>
                <p><InlineMath math="\frac{dy}{dx} = 10x^9" /></p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">3. <InlineMath math="g(t) = t^{1/2} = \sqrt{t}" /></p>
                <p><InlineMath math="g'(t) = \frac{1}{2}t^{-1/2} = \frac{1}{2\sqrt{t}}" /></p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">4. <InlineMath math="h(x) = x^{-2} = \frac{1}{x^2}" /></p>
                <p><InlineMath math="h'(x) = -2x^{-3} = -\frac{2}{x^3}" /></p>
              </div>
            </div>
          </div>

          {/* Graph showing y = x */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Graph of f(x) = x
            </h3>
            
            <div className="flex justify-center mb-4">
              <svg 
                width="550" 
                height="400" 
                className="border border-gray-300 dark:border-gray-600"
              >
                {/* Grid lines */}
                {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map(tick => (
                  <line
                    key={`x-grid-${tick}`}
                    x1={75 + (tick + 3) * 50}
                    y1={75}
                    x2={75 + (tick + 3) * 50}
                    y2={325}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                ))}
                {[-3, -2, -1, 0, 1, 2, 3].map(tick => (
                  <line
                    key={`y-grid-${tick}`}
                    x1={75}
                    y1={200 - tick * 40}
                    x2={475}
                    y2={200 - tick * 40}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                ))}

                {/* Axes */}
                <line x1={75} y1={75} x2={75} y2={325} stroke="#374151" strokeWidth="3" />
                <line x1={75} y1={200} x2={475} y2={200} stroke="#374151" strokeWidth="3" />

                {/* f(x) = x line */}
                <line x1={125} y1={280} x2={425} y2={120} stroke="#3b82f6" strokeWidth="4" />
                
                {/* Function label */}
                <text x={350} y={140} fill="#3b82f6" fontSize="14" fontWeight="bold">
                  f(x) = x
                </text>
                
                {/* Slope indicator */}
                <text x={275} y={180} textAnchor="middle" fill="#ef4444" fontSize="12">
                  slope = 1 everywhere
                </text>
                
                {/* Points on the line */}
                <circle cx={175} cy={240} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
                <circle cx={275} cy={200} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
                <circle cx={375} cy={160} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>

                {/* Axis labels and numbers */}
                <text x={445} y={220} textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold">x</text>
                <text x={55} y={95} textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold" transform="rotate(-90, 55, 95)">y</text>
                
                {/* Grid numbers */}
                {[-2, -1, 1, 2, 3, 4].map(tick => (
                  <text key={`x-label-${tick}`} x={75 + (tick + 3) * 50} y={220} textAnchor="middle" fill="#6b7280" fontSize="12">{tick}</text>
                ))}
                {[-2, -1, 1, 2].map(tick => (
                  <text key={`y-label-${tick}`} x={65} y={200 - tick * 40 + 5} textAnchor="end" fill="#6b7280" fontSize="12">{tick}</text>
                ))}
              </svg>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-lg text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> The line <InlineMath math="y = x" /> has slope 1 everywhere, confirming that <InlineMath math="\frac{d}{dx}[x] = 1" />.
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
      slideId="power-rule"
      slideTitle="The Power Rule"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiation-rules"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}