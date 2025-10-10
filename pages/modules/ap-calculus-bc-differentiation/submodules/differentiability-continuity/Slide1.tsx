import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function DifferentiabilityContinuitySlide1() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'discontinuous-functions-quiz',
      conceptId: 'discontinuous-identification',
      conceptName: 'Discontinuous Function Identification',
      type: 'judging',
      description: 'Identifying whether discontinuous functions are differentiable'
    }
  ]
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions about discontinuous functions and differentiability
  const questions: QuizQuestion[] = [
    {
      id: 'greatest-integer',
      question: <>Is the function <InlineMath math="f(x) = \lfloor x \rfloor" /> differentiable at <InlineMath math="x = 2" />?</>,
      options: ['Yes, it is differentiable', 'No, it is not differentiable', 'Cannot be determined', 'Only from the right'],
      correctAnswer: 'No, it is not differentiable',
      explanation: <>The greatest integer function has jump discontinuities at every integer. Since it's not continuous at <InlineMath math="x = 2" />, it cannot be differentiable there.</>,
      questionText: 'Is ⌊x⌋ differentiable at x = 2?'
    },
    {
      id: 'greatest-integer-differentiable',
      question: <>Where is the function <InlineMath math="f(x) = \lfloor x \rfloor" /> differentiable?</>,
      options: ['At all real numbers', 'Only at integers', 'At all non-integer values', 'Nowhere'],
      correctAnswer: 'At all non-integer values',
      explanation: <>The greatest integer function <InlineMath math="\lfloor x \rfloor" /> has jump discontinuities at every integer value. At non-integer values, the function is locally constant, so its derivative is 0. Therefore, it's differentiable at all non-integer values.</>,
      questionText: 'Where is ⌊x⌋ differentiable?'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "discontinuous-identification",
    conceptName: "Discontinuous Function Identification",
    conceptDescription: "Identifying whether discontinuous functions are differentiable",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              The following alternative limit form of the derivative is useful in investigating the relationship between differentiability and continuity.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Alternative Form of Derivative</h3>
              <BlockMath math="f'(c) = \lim_{x \to c} \frac{f(x) - f(c)}{x - c}" />
              <p className="text-blue-800 dark:text-blue-200 mt-2">
                provided this limit exists.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">Why is this equivalent to the delta formulation?</h3>
              
              <p className="text-lg leading-relaxed mb-3">
                Both forms capture the same fundamental concept: <strong>values getting arbitrarily close</strong>.
              </p>
              
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Delta Form (h-notation):</p>
                  <BlockMath math="f'(c) = \lim_{h \to 0} \frac{f(c + h) - f(c)}{h}" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">Here, <InlineMath math="h \to 0" /> means the increment gets arbitrarily small.</p>
                </div>
                
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Alternative Form (x-notation):</p>
                  <BlockMath math="f'(c) = \lim_{x \to c} \frac{f(x) - f(c)}{x - c}" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">Here, <InlineMath math="x \to c" /> means <InlineMath math="x" /> gets arbitrarily close to <InlineMath math="c" />.</p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg">
                  <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Connection:</p>
                  <p className="text-slate-700 dark:text-slate-300">
                    If we let <InlineMath math="h = x - c" />, then <InlineMath math="x = c + h" /> and <InlineMath math="x \to c" /> is equivalent to <InlineMath math="h \to 0" />.
                    Both expressions describe the <strong>same limiting process</strong> with different variables.
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed mb-4">
              Note that the existence of the limit in this alternative form requires that the one-sided limits
            </p>
            
            <div className="flex justify-center space-x-8 mb-4">
              <div className="text-center">
                <BlockMath math="\lim_{x \to c^-} \frac{f(x) - f(c)}{x - c}" />
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Derivative from the left</p>
              </div>
              <div className="text-center">
                <BlockMath math="\lim_{x \to c^+} \frac{f(x) - f(c)}{x - c}" />
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">Derivative from the right</p>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed">
              exist and are equal. These one-sided limits are called the <strong>derivatives from the left and from the right</strong>, respectively.
            </p>
          </div>

          {/* Differentiability on Closed Intervals */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Differentiability on Closed Intervals
            </h3>
            
            <p className="text-lg leading-relaxed mb-4">
              It follows that <InlineMath math="f" /> is differentiable on the closed interval <InlineMath math="[a, b]" /> if:
            </p>
            
            <ul className="list-disc list-inside space-y-2 text-lg ml-4">
              <li>It is differentiable on <InlineMath math="(a, b)" /></li>
              <li>The derivative from the right at <InlineMath math="a" /> exists</li>
              <li>The derivative from the left at <InlineMath math="b" /> exists</li>
            </ul>
          </div>

          {/* Key Relationship */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Differentiability and Continuity
            </h3>
            
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border-l-4 border-red-400 mb-4">
              <p className="text-lg font-semibold text-red-800 dark:text-red-200">
                Key Insight: If a function is not continuous at <InlineMath math="x = c" />, it is also not differentiable at <InlineMath math="x = c" />.
              </p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Important: The converse is not true!
              </p>
              <p className="text-yellow-800 dark:text-yellow-200">
                A function can be continuous at <InlineMath math="x = c" /> and not differentiable at <InlineMath math="x = c" />.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Example and Practice */}
        <div className="space-y-6">
          
          {/* Greatest Integer Function Visualization */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Example: Greatest Integer Function
            </h3>
            
            <p className="text-lg mb-4">
              Consider <InlineMath math="f(x) = \lfloor x \rfloor" /> (the greatest integer function) at <InlineMath math="x = 0" />.
            </p>
            
            {/* SVG Graph of Greatest Integer Function */}
            <div className="flex justify-center mb-4">
              <svg width="550" height="400" className="border border-gray-300 dark:border-gray-600">
                {/* Grid */}
                <defs>
                  <pattern id="grid" width="55" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 55 0 L 0 0 0 40" fill="none" stroke={isDarkMode ? "#374151" : "#e5e7eb"} strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="550" height="400" fill="url(#grid)" />
                
                {/* Axes */}
                <line x1="275" y1="0" x2="275" y2="400" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} strokeWidth="2"/>
                <line x1="0" y1="200" x2="550" y2="200" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} strokeWidth="2"/>
                
                {/* Axis labels */}
                <text x="535" y="195" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">x</text>
                <text x="280" y="15" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">y</text>
                
                {/* Grid numbers */}
                <text x="330" y="195" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">1</text>
                <text x="220" y="195" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">-1</text>
                <text x="280" y="160" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">1</text>
                <text x="280" y="240" fill={isDarkMode ? "#9ca3af" : "#6b7280"} fontSize="12">-1</text>
                
                {/* Greatest Integer Function segments */}
                {/* y = -2 for x in [-2, -1) */}
                <line x1="165" y1="280" x2="220" y2="280" stroke="#2563eb" strokeWidth="3"/>
                <circle cx="165" cy="280" r="3" fill="#2563eb"/>
                <circle cx="220" cy="280" r="3" fill="white" stroke="#2563eb" strokeWidth="2"/>
                
                {/* y = -1 for x in [-1, 0) */}
                <line x1="220" y1="240" x2="275" y2="240" stroke="#2563eb" strokeWidth="3"/>
                <circle cx="220" cy="240" r="3" fill="#2563eb"/>
                <circle cx="275" cy="240" r="3" fill="white" stroke="#2563eb" strokeWidth="2"/>
                
                {/* y = 0 for x in [0, 1) */}
                <line x1="275" y1="200" x2="330" y2="200" stroke="#2563eb" strokeWidth="3"/>
                <circle cx="275" cy="200" r="3" fill="#2563eb"/>
                <circle cx="330" cy="200" r="3" fill="white" stroke="#2563eb" strokeWidth="2"/>
                
                {/* y = 1 for x in [1, 2) */}
                <line x1="330" y1="160" x2="385" y2="160" stroke="#2563eb" strokeWidth="3"/>
                <circle cx="330" cy="160" r="3" fill="#2563eb"/>
                <circle cx="385" cy="160" r="3" fill="white" stroke="#2563eb" strokeWidth="2"/>
                
                {/* Highlight discontinuity at x = 0 */}
                <circle cx="275" cy="240" r="4" fill="#dc2626" stroke="white" strokeWidth="2"/>
                <circle cx="275" cy="200" r="4" fill="#2563eb" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border-l-4 border-red-400">
              <p className="text-lg text-red-800 dark:text-red-200">
                The function is <strong>not continuous</strong> at <InlineMath math="x = 0" />, so it is also <strong>not differentiable</strong> at <InlineMath math="x = 0" />.
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
      slideId="alternative-derivative-form"
      slideTitle="Alternative Form of the Derivative"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiability-continuity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}