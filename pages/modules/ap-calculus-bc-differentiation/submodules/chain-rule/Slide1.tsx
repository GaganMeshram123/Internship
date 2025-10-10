import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function ChainRuleSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions
  const questions: QuizQuestion[] = [
    {
      id: 'identify-composite',
      question: <>Which of these functions is a composite function that requires the Chain Rule?</>,
      options: [
        'f(x) = x² + 1',
        'f(x) = sin(3x)',
        'f(x) = 2x + 5',
        'f(x) = x³'
      ],
      correctAnswer: 'f(x) = sin(3x)',
      explanation: <>f(x) = sin(3x) is a composite function where the outer function is sin and the inner function is 3x. This requires the Chain Rule.</>,
      questionText: 'Identifying composite functions'
    },
    {
      id: 'chain-rule-intuition',
      question: <>In the temperature example, if temperature increases 2°C per hour and plant growth increases 0.5 cm per °C, how fast does plant growth increase per hour?</>,
      options: [
        '1.0 cm/hour',
        '2.5 cm/hour', 
        '0.25 cm/hour',
        '4.0 cm/hour'
      ],
      correctAnswer: '1.0 cm/hour',
      explanation: <>Using the Chain Rule concept: (0.5 cm/°C) × (2°C/hour) = 1.0 cm/hour. We multiply the rates of change.</>,
      questionText: 'Chain Rule intuition'
    },
    {
      id: 'without-vs-with',
      question: <>Which pair correctly shows a function without Chain Rule vs. with Chain Rule?</>,
      options: [
        'y = x² vs. y = (x + 1)²',
        'y = sin x vs. y = cos x',
        'y = 3x vs. y = x³',
        'y = eˣ vs. y = ln x'
      ],
      correctAnswer: 'y = x² vs. y = (x + 1)²',
      explanation: <>y = x² uses the Power Rule directly, while y = (x + 1)² is a composite function requiring the Chain Rule.</>,
      questionText: 'Comparing Chain Rule necessity'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "chain-rule-introduction",
    conceptName: "Chain Rule Introduction",
    conceptDescription: "Understanding when and why to use the Chain Rule",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Chain Rule Introduction */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              The Chain Rule
            </h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200 mb-3 text-lg">
                  <strong>The Most Powerful Differentiation Rule:</strong> The Chain Rule deals with composite functions 
                  and adds surprising versatility to the rules we've learned.
                </p>
                <p className="text-blue-800 dark:text-blue-200 text-lg">
                  It allows us to differentiate complex nested functions that would be impossible with basic rules alone.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-3 text-lg">The Chain Rule Concept:</p>
                <p className="text-lg mb-2">
                  If <InlineMath math="y" /> changes <InlineMath math="\frac{dy}{du}" /> times as fast as <InlineMath math="u" />,
                </p>
                <p className="text-lg mb-2">
                  and <InlineMath math="u" /> changes <InlineMath math="\frac{du}{dx}" /> times as fast as <InlineMath math="x" />,
                </p>
                <p className="text-lg">
                  then <InlineMath math="y" /> changes <InlineMath math="\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}" /> times as fast as <InlineMath math="x" />.
                </p>
              </div>
            </div>
          </div>

          {/* Real-World Intuitive Example */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Intuitive Example: Plant Growth
            </h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 mb-3 text-lg">
                  <strong>Scenario:</strong> A plant's growth depends on temperature, and temperature changes with time.
                </p>
                <div className="space-y-2 text-lg">
                  <p className="text-blue-800 dark:text-blue-200">
                    • Plant height: <InlineMath math="h" /> (depends on temperature <InlineMath math="T" />)
                  </p>
                  <p className="text-blue-800 dark:text-blue-200">
                    • Temperature: <InlineMath math="T" /> (depends on time <InlineMath math="t" />)
                  </p>
                  <p className="text-blue-800 dark:text-blue-200">
                    • Question: How does plant height change with time?
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-2 text-lg">Given Information:</p>
                <div className="space-y-1 text-lg">
                  <p>• Plant grows 0.5 cm per degree Celsius: <InlineMath math="\frac{dh}{dT} = 0.5" /> cm/°C</p>
                  <p>• Temperature increases 2°C per hour: <InlineMath math="\frac{dT}{dt} = 2" /> °C/hour</p>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="font-medium mb-2 text-lg">Chain Rule Solution:</p>
                <BlockMath math="\frac{dh}{dt} = \frac{dh}{dT} \cdot \frac{dT}{dt} = 0.5 \times 2 = 1.0 \text{ cm/hour}" />
                <p className="text-blue-800 dark:text-blue-200 text-lg mt-2">
                  The plant grows 1 cm per hour due to the chain of dependencies!
                </p>
              </div>
            </div>
          </div>

          {/* Function Classification */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              When Do We Need the Chain Rule?
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-3 text-lg">Look for "function within a function":</p>
                <div className="space-y-2 text-lg">
                  <p>• <InlineMath math="(x^2 + 1)^5" /> - polynomial raised to a power</p>
                  <p>• <InlineMath math="\sin(3x)" /> - trig function of a linear expression</p>
                  <p>• <InlineMath math="e^{x^2}" /> - exponential of a polynomial</p>
                  <p>• <InlineMath math="\ln(x^2 + 1)" /> - logarithm of a polynomial</p>
                  <p>• <InlineMath math="\sqrt{x^2 + 1}" /> - square root of a polynomial</p>
                  <p>• <InlineMath math="\sqrt[3]{2x + 5}" /> - cube root of a linear expression</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Function Comparison and Quiz */}
        <div className="space-y-6">
          
          {/* Function Comparison Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Function Comparison
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-green-600 dark:text-green-400 mb-3">Without Chain Rule</p>
                    <div className="space-y-2 text-lg">
                      <div className="p-2 bg-white dark:bg-slate-700 rounded">
                        <BlockMath math="y = x^2 + 1" />
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-700 rounded">
                        <BlockMath math="y = \sin x" />
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-700 rounded">
                        <BlockMath math="y = 3x - 2" />
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-700 rounded">
                        <BlockMath math="y = \sqrt{x}" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-blue-600 dark:text-blue-400 mb-3">With Chain Rule</p>
                    <div className="space-y-2 text-lg">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                        <BlockMath math="y = (x^2 + 1)^5" />
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                        <BlockMath math="y = \sin(6x)" />
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                        <BlockMath math="y = (3x - 2)^5" />
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                        <BlockMath math="y = x \tan(x^2)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200 text-lg">
                  <strong>Key Observation:</strong> The right column contains composite functions - 
                  functions where one function is nested inside another. These require the Chain Rule.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Check Quiz */}
          <QuizRenderer 
            config={quizConfig}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Visual Chain Concept */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              The "Chain" Visualization
            </h3>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-3 text-lg">For <InlineMath math="y = (x^2 + 1)^5" />:</p>
                <div className="flex items-center justify-between text-lg">
                  <div className="text-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded mb-1">
                      <InlineMath math="x" />
                    </div>
                    <p>input</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl">→</span>
                  </div>
                  <div className="text-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded mb-1">
                      <InlineMath math="u = x^2 + 1" />
                    </div>
                    <p>inner function</p>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl">→</span>
                  </div>
                  <div className="text-center">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded mb-1">
                      <InlineMath math="y = u^5" />
                    </div>
                    <p>outer function</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 text-lg">
                  The Chain Rule tells us how changes in <InlineMath math="x" /> affect <InlineMath math="y" /> 
                  through the intermediate variable <InlineMath math="u" />.
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
      slideId="chain-rule-intro"
      slideTitle="Introduction to the Chain Rule"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="chain-rule"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}