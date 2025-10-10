import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function DifferentiationRulesSlide1() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions about the Constant Rule
  const questions: QuizQuestion[] = [
    {
      id: 'constant-rule-basic',
      question: <>What is the derivative of <InlineMath math="f(x) = 7" />?</>,
      options: ['7', '0', '1', 'x'],
      correctAnswer: '0',
      explanation: <>By the Constant Rule, the derivative of any constant function is 0. Since <InlineMath math="f(x) = 7" /> is constant, <InlineMath math="f'(x) = 0" />.</>,
      questionText: 'Derivative of f(x) = 7'
    },
    {
      id: 'constant-rule-negative',
      question: <>What is <InlineMath math="\frac{d}{dx}[-5]" />?</>,
      options: ['-5', '5', '0', '-1'],
      correctAnswer: '0',
      explanation: <>The Constant Rule states that <InlineMath math="\frac{d}{dx}[c] = 0" /> for any constant <InlineMath math="c" />. Therefore, <InlineMath math="\frac{d}{dx}[-5] = 0" />.</>,
      questionText: 'Derivative of constant -5'
    },
    {
      id: 'horizontal-line-slope',
      question: <>What is the slope of the horizontal line <InlineMath math="y = k" /> where <InlineMath math="k" /> is constant?</>,
      options: ['k', '1', '0', 'undefined'],
      correctAnswer: '0',
      explanation: <>A horizontal line has zero slope everywhere. This demonstrates the relationship between slope and derivative - the derivative of a constant function (horizontal line) is 0.</>,
      questionText: 'Slope of horizontal line'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "constant-rule",
    conceptName: "Constant Rule",
    conceptDescription: "Understanding the derivative of constant functions",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Constant Rule */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <p className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                The Constant Rule:
              </p>
              <p className="text-blue-800 dark:text-blue-200 mb-3">
                The derivative of a constant function is 0.
              </p>
              <BlockMath math="\frac{d}{dx}[c] = 0" />
              <p className="text-blue-800 dark:text-blue-200 mt-2">
                where <InlineMath math="c" /> is any real number.
              </p>
            </div>
            
            <p className="text-lg leading-relaxed mb-4">
              Notice that the Constant Rule is equivalent to saying that the slope of a horizontal line is 0. This demonstrates the relationship between slope and derivative.
            </p>
          </div>

          {/* Proof */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Proof
            </h3>
            
            <p className="text-lg leading-relaxed mb-4">
              Let <InlineMath math="f(x) = c" />. Then, by the limit definition of the derivative:
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <BlockMath math="\frac{d}{dx}[c] = f'(x) = \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <BlockMath math="= \lim_{\Delta x \to 0} \frac{c - c}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <BlockMath math="= \lim_{\Delta x \to 0} \frac{0}{\Delta x}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <BlockMath math="= \lim_{\Delta x \to 0} 0 = 0" />
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400 mt-4">
              <p className="text-green-800 dark:text-green-200">
                Therefore, the derivative of any constant is 0.
              </p>
            </div>
          </div>

          {/* Examples */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Examples Using the Constant Rule
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">a. <InlineMath math="y = 7" /></p>
                <p><InlineMath math="\frac{dy}{dx} = 0" /></p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">b. <InlineMath math="f(x) = 0" /></p>
                <p><InlineMath math="f'(x) = 0" /></p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">c. <InlineMath math="s(t) = -3" /></p>
                <p><InlineMath math="s'(t) = 0" /></p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="font-semibold mb-2">d. <InlineMath math="y = k^2" />, <InlineMath math="k" /> is constant</p>
                <p><InlineMath math="y' = 0" /></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Visual and Practice */}
        <div className="space-y-6">
          
          {/* Graph showing constant function */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Graph of a Constant Function
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

                {/* Axis labels */}
                <text x={445} y={220} textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold">
                  x
                </text>
                <text x={55} y={95} textAnchor="middle" fill="#374151" fontSize="16" fontWeight="bold" transform="rotate(-90, 55, 95)">
                  y
                </text>

                {/* Axis tick labels */}
                {[-3, -2, -1, 1, 2, 3, 4, 5].map(tick => (
                  <text
                    key={`x-label-${tick}`}
                    x={75 + (tick + 3) * 50}
                    y={220}
                    textAnchor="middle"
                    fill="#6b7280"
                    fontSize="12"
                  >
                    {tick}
                  </text>
                ))}
                {[-3, -2, -1, 1, 2, 3].map(tick => (
                  <text
                    key={`y-label-${tick}`}
                    x={65}
                    y={200 - tick * 40 + 5}
                    textAnchor="end"
                    fill="#6b7280"
                    fontSize="12"
                  >
                    {tick}
                  </text>
                ))}

                {/* Constant function f(x) = 2 */}
                <line x1={75} y1={120} x2={475} y2={120} stroke="#3b82f6" strokeWidth="4" />
                
                {/* Function label */}
                <text x={275} y={105} textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">
                  f(x) = 2
                </text>
                
                {/* Slope indicators */}
                <text x={200} y={140} textAnchor="middle" fill="#ef4444" fontSize="12">
                  slope = 0
                </text>
                <text x={350} y={140} textAnchor="middle" fill="#ef4444" fontSize="12">
                  slope = 0
                </text>
                
                {/* Points on the line */}
                <circle cx={175} cy={120} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
                <circle cx={275} cy={120} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
                <circle cx={375} cy={120} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
              </svg>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-lg text-yellow-800 dark:text-yellow-200">
                <strong>Key Insight:</strong> A horizontal line has zero slope everywhere. Since the derivative represents the slope of the tangent line, the derivative of a constant function is always 0.
              </p>
            </div>
          </div>

          {/* Connection to Slope */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Connection to Slope
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Horizontal Lines</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  • Have the form <InlineMath math="y = c" /> (constant)<br/>
                  • Have slope = 0 everywhere<br/>
                  • Have derivative = 0 everywhere
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">Physical Interpretation</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  If <InlineMath math="s(t)" /> represents position, then <InlineMath math="s(t) = c" /> means:
                  • Position is constant (not moving)
                  • Velocity <InlineMath math="s'(t) = 0" /> (zero speed)
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
      slideId="constant-rule"
      slideTitle="The Constant Rule"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiation-rules"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}