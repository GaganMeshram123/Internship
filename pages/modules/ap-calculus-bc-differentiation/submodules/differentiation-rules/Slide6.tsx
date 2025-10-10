import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function DifferentiationRulesSlide6() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Step-by-step proof of d/dx[cos x] = -sin x
  const cosineProofSteps: Step[] = [
    {
      id: 'apply-definition',
      question: <>Apply the limit definition of the derivative to cos x</>,
      options: [
        { id: 'wrong1', text: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos(x + h) + \\\\cos x}{h}', isCorrect: false },
        { id: 'correct', text: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos(x + h) - \\\\cos x}{h}', isCorrect: true },
        { id: 'wrong2', text: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos h - \\\\cos x}{h}', isCorrect: false },
        { id: 'wrong3', text: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos(x + h) \\\\cdot \\\\cos x}{h}', isCorrect: false }
      ],
      correctAnswer: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos(x + h) - \\\\cos x}{h}',
      explanation: <>We apply the definition of derivative: <InlineMath math="\\frac{d}{dx}[f(x)] = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}" /></>,
      questionText: 'Apply the limit definition to cos x',
      nextStep: 'Apply cosine addition formula'
    },
    {
      id: 'cosine-addition',
      question: <>Use the cosine addition formula: cos(x + h) = cos x cos h - sin x sin h</>,
      options: [
        { id: 'wrong1', text: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos x \\\\cos h + \\\\sin x \\\\sin h - \\\\cos x}{h}', isCorrect: false },
        { id: 'correct', text: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos x \\\\cos h - \\\\sin x \\\\sin h - \\\\cos x}{h}', isCorrect: true },
        { id: 'wrong2', text: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos x \\\\cos h - \\\\sin x \\\\sin h + \\\\cos x}{h}', isCorrect: false },
        { id: 'wrong3', text: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\sin x \\\\cos h - \\\\cos x \\\\sin h - \\\\cos x}{h}', isCorrect: false }
      ],
      correctAnswer: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos x \\\\cos h - \\\\sin x \\\\sin h - \\\\cos x}{h}',
      explanation: <>Substitute cos(x + h) = cos x cos h - sin x sin h into the difference quotient</>,
      questionText: 'Apply the cosine addition formula',
      nextStep: 'Factor out cos x'
    },
    {
      id: 'factor-cos-x',
      question: <>Factor out cos x from the first and third terms</>,
      options: [
        { id: 'correct', text: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos x(\\\\cos h - 1) - \\\\sin x \\\\sin h}{h}', isCorrect: true },
        { id: 'wrong1', text: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos x(\\\\cos h + 1) - \\\\sin x \\\\sin h}{h}', isCorrect: false },
        { id: 'wrong2', text: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos x \\\\cos h - \\\\sin x(\\\\sin h - 1)}{h}', isCorrect: false },
        { id: 'wrong3', text: '\\\\lim_{h \\\\to 0} \\\\frac{(\\\\cos x - 1)\\\\cos h - \\\\sin x \\\\sin h}{h}', isCorrect: false }
      ],
      correctAnswer: '\\\\lim_{h \\\\to 0} \\\\frac{\\\\cos x(\\\\cos h - 1) - \\\\sin x \\\\sin h}{h}',
      explanation: <>Factor cos x from the terms cos x cos h - cos x = cos x(cos h - 1)</>,
      questionText: 'Factor out cos x from appropriate terms',
      nextStep: 'Separate into two limits'
    },
    {
      id: 'separate-limits',
      question: <>Separate into two limits using limit properties</>,
      options: [
        { id: 'wrong1', text: '\\\\cos x \\\\lim_{h \\\\to 0} \\\\frac{\\\\cos h - 1}{h} + \\\\sin x \\\\lim_{h \\\\to 0} \\\\frac{\\\\sin h}{h}', isCorrect: false },
        { id: 'correct', text: '\\\\cos x \\\\lim_{h \\\\to 0} \\\\frac{\\\\cos h - 1}{h} - \\\\sin x \\\\lim_{h \\\\to 0} \\\\frac{\\\\sin h}{h}', isCorrect: true },
        { id: 'wrong2', text: '\\\\cos x \\\\lim_{h \\\\to 0} \\\\frac{\\\\cos h + 1}{h} - \\\\sin x \\\\lim_{h \\\\to 0} \\\\frac{\\\\sin h}{h}', isCorrect: false },
        { id: 'wrong3', text: '\\\\sin x \\\\lim_{h \\\\to 0} \\\\frac{\\\\cos h - 1}{h} - \\\\cos x \\\\lim_{h \\\\to 0} \\\\frac{\\\\sin h}{h}', isCorrect: false }
      ],
      correctAnswer: '\\\\cos x \\\\lim_{h \\\\to 0} \\\\frac{\\\\cos h - 1}{h} - \\\\sin x \\\\lim_{h \\\\to 0} \\\\frac{\\\\sin h}{h}',
      explanation: <>Use limit properties to separate: <InlineMath math="\\lim[f - g] = \\lim f - \\lim g" /> and factor out constants</>,
      questionText: 'Separate into two limits',
      nextStep: 'Apply special trigonometric limits'
    },
    {
      id: 'apply-trig-limits',
      question: <>Apply the special trigonometric limits: <InlineMath math="\\lim_{h \\to 0} \\frac{\\sin h}{h} = 1" /> and <InlineMath math="\\lim_{h \\to 0} \\frac{\\cos h - 1}{h} = 0" /></>,
      options: [
        { id: 'wrong1', text: '\\\\cos x \\\\cdot 1 - \\\\sin x \\\\cdot 0 = \\\\cos x', isCorrect: false },
        { id: 'wrong2', text: '\\\\cos x \\\\cdot 0 + \\\\sin x \\\\cdot 1 = \\\\sin x', isCorrect: false },
        { id: 'correct', text: '\\\\cos x \\\\cdot 0 - \\\\sin x \\\\cdot 1 = -\\\\sin x', isCorrect: true },
        { id: 'wrong3', text: '\\\\cos x \\\\cdot 1 + \\\\sin x \\\\cdot 0 = \\\\cos x', isCorrect: false }
      ],
      correctAnswer: '\\\\cos x \\\\cdot 0 - \\\\sin x \\\\cdot 1 = -\\\\sin x',
      explanation: <>Substitute the known limits: <InlineMath math="\\cos x \\cdot 0 - \\sin x \\cdot 1 = -\\sin x" /></>,
      questionText: 'Apply the special trigonometric limits',
      nextStep: 'State the final result'
    },
    {
      id: 'final-result',
      question: <>Therefore, what is <InlineMath math="\\frac{d}{dx}[\\cos x]" />?</>,
      options: [
        { id: 'wrong1', text: '\\\\sin x', isCorrect: false },
        { id: 'wrong2', text: '\\\\cos x', isCorrect: false },
        { id: 'correct', text: '-\\\\sin x', isCorrect: true },
        { id: 'wrong3', text: '-\\\\cos x', isCorrect: false }
      ],
      correctAnswer: '-\\\\sin x',
      explanation: <>We have proven that <InlineMath math="\\frac{d}{dx}[\\cos x] = -\\sin x" /> using the limit definition</>,
      questionText: 'State the final derivative result'
    }
  ]

  const stepConfig: StepConfig = {
    steps: cosineProofSteps,
    title: "Proof: Derivative of Cosine",
    conceptId: "cosine-derivative-proof",
    conceptName: "Proving d/dx[cos x] = -sin x",
    conceptDescription: "Step-by-step proof using the limit definition",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Prove that the derivative of cos x is -sin x:",
    },
    completionMessage: <>Complete! You've proven that d/dx[cos x] = -sin x.</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect cosine derivative proof!")
      }
    }
  }

  // Quiz questions about trigonometric derivatives
  const questions: QuizQuestion[] = [
    {
      id: 'sine-derivative',
      question: <>What is <InlineMath math="\\frac{d}{dx}[\\sin x]" />?</>,
      options: ['cos x', '-cos x', 'sin x', '-sin x'],
      correctAnswer: 'cos x',
      explanation: <>The derivative of sine x is cos x: <InlineMath math="\\frac{d}{dx}[\\sin x] = \\cos x" /></>,
      questionText: 'Derivative of sin x'
    },
    {
      id: 'constant-multiple-trig',
      question: <>What is <InlineMath math="\\frac{d}{dx}[5\\sin x]" />?</>,
      options: ['5 cos x', '-5 cos x', '5 sin x', '-5 sin x'],
      correctAnswer: '5 cos x',
      explanation: <>Using the Constant Multiple Rule: <InlineMath math="\\frac{d}{dx}[5\\sin x] = 5 \\cdot \\cos x = 5\\cos x" /></>,
      questionText: 'Derivative of 5 sin x'
    },
    {
      id: 'trig-sum',
      question: <>What is <InlineMath math="\\frac{d}{dx}[\\sin x + \\cos x]" />?</>,
      options: ['cos x - sin x', 'sin x + cos x', 'cos x + sin x', '-sin x - cos x'],
      correctAnswer: 'cos x - sin x',
      explanation: <>Using the Sum Rule: <InlineMath math="\\frac{d}{dx}[\\sin x + \\cos x] = \\cos x + (-\\sin x) = \\cos x - \\sin x" /></>,
      questionText: 'Derivative of sin x + cos x'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "trig-derivatives",
    conceptName: "Trigonometric Derivatives",
    conceptDescription: "Understanding derivatives of sine and cosine functions",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory and Formulas */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
              <div className="space-y-3">
                <div className="bg-white dark:bg-slate-700 p-3 rounded">
                  <BlockMath math="\frac{d}{dx}[\sin x] = \cos x" />
                </div>
                <div className="bg-white dark:bg-slate-700 p-3 rounded">
                  <BlockMath math="\frac{d}{dx}[\cos x] = -\sin x" />
                </div>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed">
              These fundamental derivatives can be proven using the limit definition and special trigonometric limits. 
              Notice the negative sign in the derivative of cosine.
            </p>
          </div>

          {/* Special Trigonometric Limits */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Key Trigonometric Limits
            </h3>
            
            <p className="text-lg leading-relaxed mb-4">
              The proofs rely on these fundamental limits:
            </p>
            
            <div className="space-y-3">
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <BlockMath math="\lim_{h \to 0} \frac{\sin h}{h} = 1" />
                <p className="text-yellow-800 dark:text-yellow-200 mt-2 text-sm">
                  This is the fundamental sine limit
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <BlockMath math="\lim_{h \to 0} \frac{\cos h - 1}{h} = 0" />
                <p className="text-yellow-800 dark:text-yellow-200 mt-2 text-sm">
                  This follows from the cosine difference identity
                </p>
              </div>
            </div>
          </div>

          {/* Proof of sin x derivative */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
              Proof: d/dx[sin x] = cos x
            </h3>
            
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">1. Apply the limit definition:</p>
                <BlockMath math="\frac{d}{dx}[\sin x] = \lim_{h \to 0} \frac{\sin(x + h) - \sin x}{h}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">2. Use sine addition formula:</p>
                <BlockMath math="= \lim_{h \to 0} \frac{\sin x \cos h + \cos x \sin h - \sin x}{h}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">3. Factor sin x:</p>
                <BlockMath math="= \lim_{h \to 0} \frac{\sin x(\cos h - 1) + \cos x \sin h}{h}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">4. Separate limits:</p>
                <BlockMath math="= \sin x \lim_{h \to 0} \frac{\cos h - 1}{h} + \cos x \lim_{h \to 0} \frac{\sin h}{h}" />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">5. Apply special limits:</p>
                <BlockMath math="= \sin x \cdot 0 + \cos x \cdot 1 = \cos x" />
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Important Notes
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-400">
                <p className="text-red-800 dark:text-red-200">
                  <strong>Remember the negative sign:</strong> d/dx[cos x] = -sin x (not +sin x)
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-400">
                <p className="text-green-800 dark:text-green-200">
                  <strong>Angles in radians:</strong> These derivatives are valid only when x is in radians
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>Pattern:</strong> sin → cos, cos → -sin (clockwise rotation with negative)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Step-by-Step Proof and Practice */}
        <div className="space-y-6">
          
          {/* Step-by-Step Proof */}
          <StepByStepRenderer 
            config={stepConfig}
            onInteractionComplete={handleInteractionComplete}
          />

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
      slideId="trig-derivatives"
      slideTitle="Derivatives of the Sine and Cosine Functions"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiation-rules"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}