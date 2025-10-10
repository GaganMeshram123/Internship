import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function DifferentiabilityContinuitySlide4() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions about the theorem
  const questions: QuizQuestion[] = [
    {
      id: 'theorem-understanding',
      question: <>If a function is differentiable at <InlineMath math="x = c" />, what can we conclude about its continuity at that point?</>,
      options: [
        'The function may or may not be continuous',
        'The function is definitely continuous',
        'The function is definitely discontinuous',
        'Cannot determine continuity from differentiability'
      ],
      correctAnswer: 'The function is definitely continuous',
      explanation: <>If a function is differentiable at <InlineMath math="x = c" />, then it is continuous at <InlineMath math="x = c" />. Differentiability implies continuity.</>,
      questionText: 'Differentiability implies what about continuity?'
    },
    {
      id: 'converse-understanding',
      question: <>If a function is continuous at <InlineMath math="x = c" />, what can we conclude about its differentiability at that point?</>,
      options: [
        'The function is definitely differentiable',
        'The function is definitely not differentiable',
        'The function may or may not be differentiable',
        'The function has a vertical tangent'
      ],
      correctAnswer: 'The function may or may not be differentiable',
      explanation: <>Continuity does not imply differentiability. A function can be continuous at a point but not differentiable there (like <InlineMath math="f(x) = |x|" /> at <InlineMath math="x = 0" />).</>,
      questionText: 'Continuity implies what about differentiability?'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "differentiability-implies-continuity",
    conceptName: "Differentiability Implies Continuity",
    conceptDescription: "Understanding the relationship between differentiability and continuity",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Key Result and Proof */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <p className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Key Result:
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                If <InlineMath math="f" /> is differentiable at <InlineMath math="x = c" />, then <InlineMath math="f" /> is continuous at <InlineMath math="x = c" />.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Proof:</h4>
              
              <p className="text-lg leading-relaxed">
                You can prove that <InlineMath math="f" /> is continuous at <InlineMath math="x = c" /> by showing that <InlineMath math="f(x)" /> approaches <InlineMath math="f(c)" /> as <InlineMath math="x \to c" />.
              </p>
              
              <p className="text-lg leading-relaxed">
                To do this, use the differentiability of <InlineMath math="f" /> at <InlineMath math="x = c" /> and consider the following limit:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <BlockMath math="\lim_{x \to c} [f(x) - f(c)] = \lim_{x \to c} \left[\frac{f(x) - f(c)}{x - c} \cdot (x - c)\right]" />
              </div>
              
              <p className="text-lg leading-relaxed">
                Using the limit properties:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <BlockMath math="= \lim_{x \to c} \frac{f(x) - f(c)}{x - c} \cdot \lim_{x \to c} (x - c)" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <BlockMath math="= f'(c) \cdot 0 = 0" />
              </div>
              
              <p className="text-lg leading-relaxed">
                Because the difference <InlineMath math="f(x) - f(c)" /> approaches zero as <InlineMath math="x \to c" />, you can conclude that
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <BlockMath math="\lim_{x \to c} f(x) = f(c)" />
                <p className="text-blue-800 dark:text-blue-200 mt-2">
                  So, <InlineMath math="f" /> is continuous at <InlineMath math="x = c" />.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary and Practice */}
        <div className="space-y-6">
          
          {/* Summary of Relationship */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Continuity and Differentiability Relationship
            </h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
                <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                  1. Differentiability → Continuity
                </h4>
                <p className="text-green-800 dark:text-green-200">
                  If a function is differentiable at <InlineMath math="x = c" />, then it is continuous at <InlineMath math="x = c" />.
                </p>
                <p className="text-green-800 dark:text-green-200 mt-2 font-medium">
                  ✓ Differentiability implies continuity.
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  2. Continuity ↛ Differentiability
                </h4>
                <p className="text-yellow-800 dark:text-yellow-200">
                  It is possible for a function to be continuous at <InlineMath math="x = c" /> and not be differentiable at <InlineMath math="x = c" />.
                </p>
                <p className="text-yellow-800 dark:text-yellow-200 mt-2 font-medium">
                  ✗ Continuity does not imply differentiability.
                </p>
              </div>
            </div>
          </div>

          {/* Visual Summary */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Visual Summary
            </h3>
            
            <div className="flex justify-center mb-4">
              <svg 
                width="550" 
                height="300" 
                className="border border-gray-300 dark:border-gray-600"
              >
                {/* Background */}
                <rect width="550" height="300" fill={isDarkMode ? "#1f2937" : "#f8fafc"} />
                
                {/* Differentiable circle (inner) */}
                <circle cx="275" cy="150" r="80" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="3" />
                <text x="275" y="110" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">
                  Differentiable
                </text>
                <text x="275" y="125" textAnchor="middle" fill="#3b82f6" fontSize="12">
                  Functions
                </text>
                
                {/* Continuous circle (outer) */}
                <circle cx="275" cy="150" r="120" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="8,4" />
                <text x="100" y="50" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">
                  Continuous Functions
                </text>
                
                {/* Arrow showing implication */}
                <path d="M 200 150 L 170 150" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead)" />
                <text x="140" y="145" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">
                  Implies
                </text>
                
                {/* Examples in the gap */}
                <text x="420" y="120" textAnchor="start" fill="#f59e0b" fontSize="12" fontWeight="bold">
                  Examples:
                </text>
                <text x="420" y="140" textAnchor="start" fill="#f59e0b" fontSize="11">
                  f(x) = |x| at x = 0
                </text>
                <text x="420" y="155" textAnchor="start" fill="#f59e0b" fontSize="11">
                  f(x) = ∛x at x = 0
                </text>
                <text x="420" y="170" textAnchor="start" fill="#f59e0b" fontSize="10">
                  (Continuous but not
                </text>
                <text x="420" y="185" textAnchor="start" fill="#f59e0b" fontSize="10">
                  differentiable)
                </text>
                
                {/* Arrow definition */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                  </marker>
                </defs>
              </svg>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg text-blue-800 dark:text-blue-200">
                <strong>Key Insight:</strong> All differentiable functions are continuous, but not all continuous functions are differentiable.
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
      slideId="differentiability-implies-continuity"
      slideTitle="Differentiability Implies Continuity"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiability-continuity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}