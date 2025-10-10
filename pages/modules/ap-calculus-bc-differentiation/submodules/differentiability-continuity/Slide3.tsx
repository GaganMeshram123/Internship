import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function DifferentiabilityContinuitySlide3() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'vertical-tangent-quiz',
      conceptId: 'vertical-tangent-differentiability',
      conceptName: 'Vertical Tangent Differentiability',
      type: 'judging',
      description: 'Understanding differentiability at vertical tangent lines'
    }
  ]
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions about vertical tangent lines
  const questions: QuizQuestion[] = [
    {
      id: 'cube-root-differentiability',
      question: <>Is the function <InlineMath math="f(x) = \sqrt[3]{x}" /> differentiable at <InlineMath math="x = 0" />?</>,
      options: ['Yes, it is differentiable', 'No, it has a vertical tangent', 'No, it is discontinuous', 'Cannot be determined'],
      correctAnswer: 'No, it has a vertical tangent',
      explanation: <>The function <InlineMath math="f(x) = \sqrt[3]{x}" /> is continuous at <InlineMath math="x = 0" /> but has a vertical tangent line there. The derivative approaches ±∞, so the function is not differentiable at <InlineMath math="x = 0" />.</>,
      questionText: 'Is ∛x differentiable at x = 0?'
    },
    {
      id: 'vertical-tangent-condition',
      question: <>What condition indicates a vertical tangent line at <InlineMath math="x = c" />?</>,
      options: [
        'The function is undefined',
        'The limit of the difference quotient is ±∞',
        'The function has a sharp turn',
        'The function is discontinuous'
      ],
      correctAnswer: 'The limit of the difference quotient is ±∞',
      explanation: <>A vertical tangent occurs when the limit of the difference quotient approaches positive or negative infinity, indicating that the slope becomes infinitely steep.</>,
      questionText: 'Condition for vertical tangent line'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "vertical-tangent-differentiability",
    conceptName: "Vertical Tangent Differentiability",
    conceptDescription: "Understanding differentiability at vertical tangent lines",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              The function <InlineMath math="f(x) = \sqrt[3]{x}" /> is continuous at <InlineMath math="x = 0" />:
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <BlockMath math="\lim_{x \to 0} f(x) = f(0) = 0" />
              <p className="text-blue-800 dark:text-blue-200 mt-2">
                The function value equals the limit, confirming continuity.
              </p>
            </div>
            
            <p className="text-lg leading-relaxed mb-4">
              However, because the limit
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <BlockMath math="\lim_{x \to 0} \frac{f(x) - f(0)}{x - 0} = \lim_{x \to 0} \frac{\sqrt[3]{x}}{x} = \lim_{x \to 0} \frac{1}{x^{2/3}}" />
              <p className="text-blue-800 dark:text-blue-200 mt-2">
                is infinite, you can conclude that the tangent line is vertical at <InlineMath math="x = 0" />.
              </p>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border-l-4 border-red-400">
              <p className="text-lg font-semibold text-red-800 dark:text-red-200">
                So, <InlineMath math="f" /> is not differentiable at <InlineMath math="x = 0" />.
              </p>
            </div>
          </div>

          {/* Analysis of the Limit */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Analysis of the Limit
            </h3>
            
            <p className="text-lg leading-relaxed mb-4">
              Let's examine why the limit approaches infinity:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Step 1: Simplify the expression</h4>
                <BlockMath math="\frac{\sqrt[3]{x}}{x} = \frac{x^{1/3}}{x} = x^{1/3 - 1} = x^{-2/3} = \frac{1}{x^{2/3}}" />
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Step 2: Analyze the behavior as x → 0</h4>
                <p className="text-slate-700 dark:text-slate-300 mb-2">
                  As <InlineMath math="x \to 0" />, we have <InlineMath math="x^{2/3} \to 0^+" /> (always positive)
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  Therefore: <InlineMath math="\frac{1}{x^{2/3}} \to +\infty" />
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-lg text-yellow-800 dark:text-yellow-200">
                <strong>Key Point:</strong> Since the slope approaches infinity, the tangent line becomes vertical, 
                and the function is not differentiable at this point.
              </p>
            </div>
          </div>

          {/* Summary of Non-differentiability */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              When Functions Are Not Differentiable
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  1. Discontinuity
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  If a function is not continuous at a point, it cannot be differentiable there.
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  2. Sharp Turn (Corner)
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  When left and right derivatives exist but are different (like <InlineMath math="f(x) = |x|" /> at <InlineMath math="x = 0" />).
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  3. Vertical Tangent Line
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  When the derivative approaches ±∞ (like <InlineMath math="f(x) = \sqrt[3]{x}" /> at <InlineMath math="x = 0" />).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Graph and Practice */}
        <div className="space-y-6">
          
          {/* Graph of cube root function */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Graph of <InlineMath math="f(x) = \sqrt[3]{x}" />
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

                {/* Cube root function plotted accurately */}
                <path
                  d={(() => {
                    const points = [];
                    for (let x = -3; x <= 5; x += 0.1) {
                      const y = Math.cbrt(x);
                      const screenX = 75 + (x + 3) * 50;
                      const screenY = 200 - y * 40;
                      if (screenY >= 75 && screenY <= 325 && screenX >= 75 && screenX <= 475) {
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
                
                {/* Vertical tangent line at x=0 */}
                <line 
                  x1={225} 
                  y1={160} 
                  x2={225} 
                  y2={240} 
                  stroke="#ef4444" 
                  strokeWidth="3" 
                  strokeDasharray="8,4"
                />
                
                {/* Point at origin */}
                <circle cx={225} cy={200} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2"/>
                <text x={235} y={195} fill="#ef4444" fontSize="12" fontWeight="bold">(0, 0)</text>
                
                {/* Function label */}
                <text x={325} y={130} fill="#3b82f6" fontSize="14" fontWeight="bold">f(x) = ∛x</text>
                <text x={230} y={185} fill="#ef4444" fontSize="12">Vertical tangent</text>
              </svg>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-lg text-yellow-800 dark:text-yellow-200">
                <strong>Notice:</strong> The graph is smooth and continuous everywhere, but at the origin, 
                the tangent line is vertical, indicating infinite slope.
              </p>
            </div>
          </div>

          {/* Comparison with Other Functions */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Comparison: Types of Non-Differentiability
            </h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">f(x) = |x| at x = 0</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  • Continuous but has a sharp corner<br/>
                  • Left derivative = -1, Right derivative = +1<br/>
                  • Not differentiable due to corner
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">f(x) = ∛x at x = 0</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  • Continuous and smooth curve<br/>
                  • Derivative approaches +∞<br/>
                  • Not differentiable due to vertical tangent
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h4 className="font-semibold text-lg mb-2">f(x) = ⌊x⌋ at integers</h4>
                <p className="text-slate-700 dark:text-slate-300">
                  • Not continuous (jump discontinuity)<br/>
                  • Not differentiable due to discontinuity
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
      slideId="vertical-tangent-differentiability"
      slideTitle="A Graph with a Vertical Tangent Line"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiability-continuity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}