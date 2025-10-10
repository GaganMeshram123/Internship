import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function DifferentiabilityContinuitySlide2() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'sharp-turn-quiz',
      conceptId: 'sharp-turn-differentiability',
      conceptName: 'Sharp Turn Differentiability',
      type: 'judging',
      description: 'Understanding differentiability at sharp turns in continuous functions'
    }
  ]
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions about absolute value function variations
  const questions: QuizQuestion[] = [
    {
      id: 'absolute-value-basic',
      question: <>Is the function <InlineMath math="f(x) = |x|" /> differentiable at <InlineMath math="x = 0" />?</>,
      options: ['Yes, it is differentiable', 'No, it is not differentiable', 'Cannot be determined', 'Only from one side'],
      correctAnswer: 'No, it is not differentiable',
      explanation: <>The function <InlineMath math="f(x) = |x|" /> is continuous at <InlineMath math="x = 0" /> but has a sharp turn there. The left derivative is -1 and the right derivative is +1. Since these are not equal, the function is not differentiable at <InlineMath math="x = 0" />.</>,
      questionText: 'Is |x| differentiable at x = 0?'
    },
    {
      id: 'absolute-value-shifted',
      question: <>Is the function <InlineMath math="g(x) = |x - 3|" /> differentiable at <InlineMath math="x = 3" />?</>,
      options: ['Yes, it is differentiable', 'No, it is not differentiable', 'Cannot be determined', 'Only continuous'],
      correctAnswer: 'No, it is not differentiable',
      explanation: <>The function <InlineMath math="g(x) = |x - 3|" /> has a sharp turn at <InlineMath math="x = 3" />. While it's continuous there, the left derivative is -1 and the right derivative is +1, so it's not differentiable at <InlineMath math="x = 3" />.</>,
      questionText: 'Is |x - 3| differentiable at x = 3?'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "sharp-turn-differentiability",
    conceptName: "Sharp Turn Differentiability",
    conceptDescription: "Understanding differentiability at sharp turns in continuous functions",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              The function <InlineMath math="f(x) = |x|" /> is continuous at <InlineMath math="x = 0" />:
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <BlockMath math="\lim_{x \to 0} f(x) = f(0) = 0" />
              <p className="text-blue-800 dark:text-blue-200 mt-2">
                The function value equals the limit, confirming continuity.
              </p>
            </div>
            
            <p className="text-lg leading-relaxed mb-4">
              However, the one-sided derivatives are different:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Derivative from the left:</h3>
                <BlockMath math="\lim_{x \to 0^-} \frac{f(x) - f(0)}{x - 0} = \lim_{x \to 0^-} \frac{|x| - 0}{x} = \lim_{x \to 0^-} \frac{-x}{x} = -1" />
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  For <InlineMath math="x < 0" />, we have <InlineMath math="|x| = -x" />
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">Derivative from the right:</h3>
                <BlockMath math="\lim_{x \to 0^+} \frac{f(x) - f(0)}{x - 0} = \lim_{x \to 0^+} \frac{|x| - 0}{x} = \lim_{x \to 0^+} \frac{x}{x} = 1" />
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  For <InlineMath math="x > 0" />, we have <InlineMath math="|x| = x" />
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                Since <InlineMath math="-1 \neq 1" />, the function <InlineMath math="f(x) = |x|" /> is not differentiable at <InlineMath math="x = 0" />.
              </p>
              <p className="text-slate-700 dark:text-slate-300 mt-2">
                There is no tangent line at the point where the graph has a sharp turn.
              </p>
            </div>
          </div>

          {/* Key Insight */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Key Insight: Continuity vs Differentiability
            </h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  ✓ Continuous at x = 0
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  The function has no breaks, jumps, or holes at this point.
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  ✗ Not differentiable at x = 0
                </p>
                <p className="text-slate-700 dark:text-slate-300">
                  The graph has a sharp corner, making it impossible to draw a unique tangent line.
                </p>
              </div>
            </div>
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-lg text-blue-800 dark:text-blue-200">
                <strong>Remember:</strong> Differentiability implies continuity, but continuity does not imply differentiability.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Graph and Practice */}
        <div className="space-y-6">
          
          {/* Graph of |x| */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Graph of f(x) = |x|
            </h3>
            
            <div className="flex justify-center mb-4">
              <svg width="550" height="400" className="border border-gray-300 dark:border-gray-600">
                {/* Grid */}
                <defs>
                  <pattern id="grid2" width="55" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 55 0 L 0 0 0 40" fill="none" stroke={isDarkMode ? "#374151" : "#e5e7eb"} strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="550" height="400" fill="url(#grid2)" />
                
                {/* Axes */}
                <line x1="275" y1="0" x2="275" y2="400" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} strokeWidth="2"/>
                <line x1="0" y1="200" x2="550" y2="200" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} strokeWidth="2"/>
                
                {/* Axis labels */}
                <text x="535" y="195" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">x</text>
                <text x="280" y="15" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">y</text>
                
                {/* Grid numbers */}
                <text x="330" y="195" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">1</text>
                <text x="220" y="195" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">-1</text>
                <text x="385" y="195" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">2</text>
                <text x="165" y="195" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">-2</text>
                <text x="280" y="160" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">1</text>
                <text x="280" y="120" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">2</text>
                
                {/* Absolute value function: f(x) = |x| */}
                {/* Left side: y = -x for x < 0 */}
                <line x1="275" y1="200" x2="165" y2="90" stroke="#2563eb" strokeWidth="3"/>
                
                {/* Right side: y = x for x > 0 */}
                <line x1="275" y1="200" x2="385" y2="90" stroke="#2563eb" strokeWidth="3"/>
                
                {/* Point at origin */}
                <circle cx="275" cy="200" r="4" fill="#2563eb" stroke="white" strokeWidth="2"/>
                
                {/* Sharp corner indication */}
                <text x="285" y="190" fill="#dc2626" fontSize="14" fontWeight="bold">Sharp turn</text>
                <line x1="280" y1="195" x2="270" y2="205" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowhead)"/>
              </svg>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-lg text-yellow-800 dark:text-yellow-200">
                <strong>Notice:</strong> The graph forms a "V" shape with a sharp corner at the origin. 
                This sharp turn prevents a unique tangent line from existing.
              </p>
            </div>
          </div>

          {/* Tangent Line Analysis */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Tangent Line Analysis
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">Left-hand behavior:</h4>
                <p className="text-lg">
                  Approaching from the left, the tangent line would have slope <InlineMath math="-1" />
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Right-hand behavior:</h4>
                <p className="text-lg">
                  Approaching from the right, the tangent line would have slope <InlineMath math="+1" />
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg text-slate-700 dark:text-slate-300">
                  <strong>Result:</strong> Since we cannot draw a single, unique tangent line at <InlineMath math="x = 0" />, 
                  the function is not differentiable there.
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
      slideId="sharp-turn-differentiability"
      slideTitle="A Graph with a Sharp Turn"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiability-continuity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}