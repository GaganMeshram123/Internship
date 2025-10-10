import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function ChainRuleSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions for decomposition practice
  const questions: QuizQuestion[] = [
    {
      id: 'decompose-sin',
      question: <>For y = sin(2x), identify the outer function f(u) and inner function u = g(x)</>,
      options: [
        'f(u) = sin u, u = 2x',
        'f(u) = 2 sin u, u = x',
        'f(u) = sin x, u = 2',
        'f(u) = 2x, u = sin x'
      ],
      correctAnswer: 'f(u) = sin u, u = 2x',
      explanation: <>The outer function is sin u and the inner function is u = 2x. The 2x is "inside" the sine function.</>,
      questionText: 'Decompose y = sin(2x)'
    },
    {
      id: 'decompose-polynomial',
      question: <>For y = (3x² - x + 1)⁴, identify the outer function f(u) and inner function u = g(x)</>,
      options: [
        'f(u) = u⁴, u = 3x² - x + 1',
        'f(u) = 3x² - x + 1, u = 4',
        'f(u) = 4u, u = 3x² - x + 1',
        'f(u) = x⁴, u = 3x² - x + 1'
      ],
      correctAnswer: 'f(u) = u⁴, u = 3x² - x + 1',
      explanation: <>The outer function is u⁴ (raising to the 4th power) and the inner function is u = 3x² - x + 1.</>,
      questionText: 'Decompose y = (3x² - x + 1)⁴'
    },
    {
      id: 'decompose-fraction',
      question: <>For y = 1/(x + 1), identify the outer function f(u) and inner function u = g(x)</>,
      options: [
        'f(u) = 1/u, u = x + 1',
        'f(u) = x + 1, u = 1',
        'f(u) = 1, u = x + 1',
        'f(u) = 1/x, u = 1'
      ],
      correctAnswer: 'f(u) = 1/u, u = x + 1',
      explanation: <>The outer function is 1/u (taking the reciprocal) and the inner function is u = x + 1.</>,
      questionText: 'Decompose y = 1/(x + 1)'
    },
    {
      id: 'decompose-tan-squared',
      question: <>For y = tan²(x), identify the outer function f(u) and inner function u = g(x)</>,
      options: [
        'f(u) = u², u = tan x',
        'f(u) = tan u, u = x²',
        'f(u) = tan² u, u = x',
        'f(u) = 2 tan u, u = x'
      ],
      correctAnswer: 'f(u) = u², u = tan x',
      explanation: <>The outer function is u² (squaring) and the inner function is u = tan x. Note: tan²(x) means (tan x)².</>,
      questionText: 'Decompose y = tan²(x)'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check: Function Decomposition",
    conceptId: "chain-rule-decomposition",
    conceptName: "Chain Rule Function Decomposition",
    conceptDescription: "Practice identifying outer and inner functions in composite functions",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory and Formula */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200 mb-3">
                  <strong>The Chain Rule:</strong> If y = f(u) is a differentiable function of u, and u = g(x) is a differentiable 
                  function of x, then y = f(g(x)) is a differentiable function of x.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-3">Chain Rule Formula:</p>
                <BlockMath math="\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}" />
                <p className="text-center my-2">or, equivalently,</p>
                <BlockMath math="\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)" />
              </div>
            </div>
          </div>

          {/* Proof Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Proof Outline
            </h3>
            
            <div className="space-y-4 text-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Let h(x) = f(g(x)). Then, using the alternative form of the derivative, we need to show that for x = c:
              </p>
              
              <BlockMath math="h'(c) = f'(g(c)) \cdot g'(c)" />
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Key insight:</strong> We multiply and divide by the same nonzero quantity g(x) - g(c):
                </p>
                
                <BlockMath math="h'(c) = \lim_{x \to c} \frac{f(g(x)) - f(g(c))}{x - c}" />
                
                <BlockMath math="= \lim_{x \to c} \frac{f(g(x)) - f(g(c))}{g(x) - g(c)} \cdot \frac{g(x) - g(c)}{x - c}" />
                
                <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg">
                  Since g is differentiable, it is continuous, so g(x) → g(c) as x → c.
                </p>
                
                <BlockMath math="= f'(g(c)) \cdot g'(c)" />
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-800 dark:text-yellow-200 text-lg">
                  <strong>Note:</strong> A complete proof requires handling the case where g(x) = g(c) for some x ≠ c, 
                  which is covered in Appendix A of most calculus textbooks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Examples and Practice */}
        <div className="space-y-6">
          
          {/* Outer and Inner Functions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Decomposing Composite Functions
            </h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 mb-3">
                  When applying the Chain Rule, think of the composite function y = f(g(x)) as having two parts:
                </p>
                <div className="text-center">
                  <BlockMath math="y = f(g(x)) = f(u)" />
                  <p className="text-lg mt-2">
                    <span className="text-green-600 dark:text-green-400 font-semibold">Outer function: </span>
                    y = f(u)
                  </p>
                  <p className="text-lg">
                    <span className="text-red-600 dark:text-red-400 font-semibold">Inner function: </span>
                    u = g(x)
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-3">Examples of Decomposition:</p>
                <div className="space-y-3 text-lg">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span><InlineMath math="y = \sin(2x)" /></span>
                    <span className="text-lg">
                      <span className="text-green-600 dark:text-green-400">f(u) = sin u</span>, 
                      <span className="text-red-600 dark:text-red-400 ml-2">u = 2x</span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span><InlineMath math="y = (3x^2 - x + 1)^4" /></span>
                    <span className="text-lg">
                      <span className="text-green-600 dark:text-green-400">f(u) = u⁴</span>, 
                      <span className="text-red-600 dark:text-red-400 ml-2">u = 3x² - x + 1</span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <span><InlineMath math="y = \frac{1}{x + 1}" /></span>
                    <span className="text-lg">
                      <span className="text-green-600 dark:text-green-400">f(u) = 1/u</span>, 
                      <span className="text-red-600 dark:text-red-400 ml-2">u = x + 1</span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span><InlineMath math="y = \tan^2(x)" /></span>
                    <span className="text-lg">
                      <span className="text-green-600 dark:text-green-400">f(u) = u²</span>, 
                      <span className="text-red-600 dark:text-red-400 ml-2">u = tan x</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Check Quiz */}
          <QuizRenderer 
            config={quizConfig}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Key Points */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Key Points
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-lg">
                  <strong>1.</strong> The derivative of the outer function times the derivative of the inner function
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>2.</strong> Always identify the "inside" function first
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>3.</strong> Work from outside to inside when differentiating
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>4.</strong> Don't forget to multiply by the derivative of the inner function!
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
      slideId="chain-rule-formula"
      slideTitle="The Chain Rule Formula"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="chain-rule"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}