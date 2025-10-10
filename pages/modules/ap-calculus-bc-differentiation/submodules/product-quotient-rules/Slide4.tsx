import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function TrigDerivativesSlide4() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Step-by-step proof of d/dx(tan x) = sec² x
  const tanProofSteps: Step[] = [
    {
      id: 'express-tan-as-quotient',
      question: <>Express <InlineMath math="\tan x" /> in terms of <InlineMath math="\sin x" /> and <InlineMath math="\cos x" /></>,
      options: [
        { id: 'correct', text: '\\tan x = \\frac{\\sin x}{\\cos x}', isCorrect: true },
        { id: 'wrong1', text: '\\tan x = \\frac{\\cos x}{\\sin x}', isCorrect: false },
        { id: 'wrong2', text: '\\tan x = \\sin x \\cdot \\cos x', isCorrect: false },
        { id: 'wrong3', text: '\\tan x = \\frac{1}{\\sin x \\cos x}', isCorrect: false }
      ],
      correctAnswer: '\\tan x = \\frac{\\sin x}{\\cos x}',
      explanation: <>By definition, <InlineMath math="\tan x = \frac{\sin x}{\cos x}" />, so we can apply the Quotient Rule.</>,
      questionText: 'Express tangent as a quotient',
      nextStep: 'Apply Quotient Rule'
    },
    {
      id: 'apply-quotient-rule',
      question: <>Apply the Quotient Rule to <InlineMath math="\frac{d}{dx}\left(\frac{\sin x}{\cos x}\right)" /></>,
      options: [
        { id: 'wrong1', text: '\\frac{[\\cos x \\cdot \\cos x + \\sin x \\cdot \\sin x]}{\\cos^2 x}', isCorrect: false },
        { id: 'correct', text: '\\frac{[\\cos x \\cdot \\cos x - \\sin x \\cdot (-\\sin x)]}{\\cos^2 x}', isCorrect: true },
        { id: 'wrong2', text: '\\frac{[\\cos x \\cdot (-\\sin x) - \\sin x \\cdot \\cos x]}{\\cos^2 x}', isCorrect: false },
        { id: 'wrong3', text: '\\frac{[\\sin x \\cdot \\cos x - \\cos x \\cdot (-\\sin x)]}{\\cos^2 x}', isCorrect: false }
      ],
      correctAnswer: '\\frac{[\\cos x \\cdot \\cos x - \\sin x \\cdot (-\\sin x)]}{\\cos^2 x}',
      explanation: <>Using Quotient Rule: <InlineMath math="\frac{[g(x)f'(x) - f(x)g'(x)]}{[g(x)]^2}" /> where <InlineMath math="f(x) = \sin x" />, <InlineMath math="g(x) = \cos x" />, <InlineMath math="f'(x) = \cos x" />, <InlineMath math="g'(x) = -\sin x" /></>,
      questionText: 'Apply Quotient Rule formula',
      nextStep: 'Simplify numerator'
    },
    {
      id: 'simplify-numerator',
      question: <>Simplify the numerator: <InlineMath math="\cos x \cdot \cos x - \sin x \cdot (-\sin x)" /></>,
      options: [
        { id: 'wrong1', text: '\\cos^2 x - \\sin^2 x', isCorrect: false },
        { id: 'correct', text: '\\cos^2 x + \\sin^2 x', isCorrect: true },
        { id: 'wrong2', text: '\\cos^2 x', isCorrect: false },
        { id: 'wrong3', text: '\\sin^2 x', isCorrect: false }
      ],
      correctAnswer: '\\cos^2 x + \\sin^2 x',
      explanation: <><InlineMath math="\cos x \cdot \cos x = \cos^2 x" /> and <InlineMath math="-\sin x \cdot (-\sin x) = +\sin^2 x" />, so we get <InlineMath math="\cos^2 x + \sin^2 x" /></>,
      questionText: 'Simplify the numerator',
      nextStep: 'Use Pythagorean identity'
    },
    {
      id: 'use-pythagorean-identity',
      question: <>Apply the Pythagorean identity to <InlineMath math="\cos^2 x + \sin^2 x" /></>,
      options: [
        { id: 'correct', text: '\\cos^2 x + \\sin^2 x = 1', isCorrect: true },
        { id: 'wrong1', text: '\\cos^2 x + \\sin^2 x = 0', isCorrect: false },
        { id: 'wrong2', text: '\\cos^2 x + \\sin^2 x = 2', isCorrect: false },
        { id: 'wrong3', text: '\\cos^2 x + \\sin^2 x = \\cos 2x', isCorrect: false }
      ],
      correctAnswer: '\\cos^2 x + \\sin^2 x = 1',
      explanation: <>The fundamental Pythagorean identity states that <InlineMath math="\cos^2 x + \sin^2 x = 1" /> for all <InlineMath math="x" />.</>,
      questionText: 'Apply Pythagorean identity',
      nextStep: 'Final simplification'
    },
    {
      id: 'final-result',
      question: <>Complete the derivative: <InlineMath math="\frac{\cos^2 x + \sin^2 x}{\cos^2 x} = ?" /></>,
      options: [
        { id: 'wrong1', text: '\\frac{1}{\\cos x} = \\sec x', isCorrect: false },
        { id: 'correct', text: '\\frac{1}{\\cos^2 x} = \\sec^2 x', isCorrect: true },
        { id: 'wrong2', text: '\\cos^2 x = 1', isCorrect: false },
        { id: 'wrong3', text: '\\tan^2 x', isCorrect: false }
      ],
      correctAnswer: '\\frac{1}{\\cos^2 x} = \\sec^2 x',
      explanation: <>Since <InlineMath math="\cos^2 x + \sin^2 x = 1" />, we have <InlineMath math="\frac{1}{\cos^2 x} = \sec^2 x" />. Therefore, <InlineMath math="\frac{d}{dx}(\tan x) = \sec^2 x" />.</>,
      questionText: 'Express final result'
    }
  ]

  // Step-by-step proof of d/dx(sec x) = sec x tan x
  const secProofSteps: Step[] = [
    {
      id: 'express-sec-as-quotient',
      question: <>Express <InlineMath math="\sec x" /> in terms of <InlineMath math="\cos x" /></>,
      options: [
        { id: 'correct', text: '\\sec x = \\frac{1}{\\cos x}', isCorrect: true },
        { id: 'wrong1', text: '\\sec x = \\cos x', isCorrect: false },
        { id: 'wrong2', text: '\\sec x = \\frac{\\sin x}{\\cos x}', isCorrect: false },
        { id: 'wrong3', text: '\\sec x = \\frac{\\cos x}{\\sin x}', isCorrect: false }
      ],
      correctAnswer: '\\sec x = \\frac{1}{\\cos x}',
      explanation: <>By definition, <InlineMath math="\sec x = \frac{1}{\cos x}" />, so we can apply the Quotient Rule with numerator = 1 and denominator = <InlineMath math="\cos x" />.</>,
      questionText: 'Express secant as a quotient',
      nextStep: 'Apply Quotient Rule to 1/cos x'
    },
    {
      id: 'apply-quotient-rule-sec',
      question: <>Apply the Quotient Rule to <InlineMath math="\frac{d}{dx}\left(\frac{1}{\cos x}\right)" /></>,
      options: [
        { id: 'wrong1', text: '\\frac{[\\cos x \\cdot 1 - 1 \\cdot \\cos x]}{\\cos^2 x}', isCorrect: false },
        { id: 'correct', text: '\\frac{[\\cos x \\cdot 0 - 1 \\cdot (-\\sin x)]}{\\cos^2 x}', isCorrect: true },
        { id: 'wrong2', text: '\\frac{[\\cos x \\cdot 0 + 1 \\cdot (-\\sin x)]}{\\cos^2 x}', isCorrect: false },
        { id: 'wrong3', text: '\\frac{[1 \\cdot (-\\sin x) - \\cos x \\cdot 0]}{\\cos^2 x}', isCorrect: false }
      ],
      correctAnswer: '\\frac{[\\cos x \\cdot 0 - 1 \\cdot (-\\sin x)]}{\\cos^2 x}',
      explanation: <>Using Quotient Rule with <InlineMath math="f(x) = 1" />, <InlineMath math="g(x) = \cos x" />: <InlineMath math="f'(x) = 0" />, <InlineMath math="g'(x) = -\sin x" />. So we get <InlineMath math="\frac{[\cos x \cdot 0 - 1 \cdot (-\sin x)]}{\cos^2 x}" /></>,
      questionText: 'Apply Quotient Rule formula',
      nextStep: 'Simplify sec result'
    },
    {
      id: 'simplify-sec-result',
      question: <>Simplify <InlineMath math="\frac{[\cos x \cdot 0 - 1 \cdot (-\sin x)]}{\cos^2 x}" /></>,
      options: [
        { id: 'wrong1', text: '\\frac{0}{\\cos^2 x} = 0', isCorrect: false },
        { id: 'correct', text: '\\frac{\\sin x}{\\cos^2 x}', isCorrect: true },
        { id: 'wrong2', text: '\\frac{-\\sin x}{\\cos^2 x}', isCorrect: false },
        { id: 'wrong3', text: '\\frac{\\cos x}{\\sin^2 x}', isCorrect: false }
      ],
      correctAnswer: '\\frac{\\sin x}{\\cos^2 x}',
      explanation: <><InlineMath math="\cos x \cdot 0 = 0" /> and <InlineMath math="-1 \cdot (-\sin x) = +\sin x" />, so we get <InlineMath math="\frac{0 + \sin x}{\cos^2 x} = \frac{\sin x}{\cos^2 x}" /></>,
      questionText: 'Simplify the expression',
      nextStep: 'Express in terms of sec and tan'
    },
    {
      id: 'express-sec-tan',
      question: <>Express <InlineMath math="\frac{\sin x}{\cos^2 x}" /> in terms of <InlineMath math="\sec x" /> and <InlineMath math="\tan x" /></>,
      options: [
        { id: 'wrong1', text: '\\sec^2 x', isCorrect: false },
        { id: 'correct', text: '\\sec x \\tan x', isCorrect: true },
        { id: 'wrong2', text: '\\tan^2 x', isCorrect: false },
        { id: 'wrong3', text: '\\sec x + \\tan x', isCorrect: false }
      ],
      correctAnswer: '\\sec x \\tan x',
      explanation: <><InlineMath math="\frac{\sin x}{\cos^2 x} = \frac{\sin x}{\cos x} \cdot \frac{1}{\cos x} = \tan x \cdot \sec x = \sec x \tan x" /></>,
      questionText: 'Express in trigonometric form'
    }
  ]

  const tanStepConfig: StepConfig = {
    steps: tanProofSteps,
    title: "Proof: d/dx(tan x) = sec² x",
    conceptId: "tan-derivative-proof",
    conceptName: "Tangent Derivative Proof",
    conceptDescription: "Step-by-step proof using Quotient Rule and Pythagorean identity",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Prove that d/dx(tan x) = sec² x using the Quotient Rule:",
    },
    completionMessage: <>Complete! We've proven that d/dx(tan x) = sec² x.</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect tangent derivative proof!")
      }
    }
  }

  const secStepConfig: StepConfig = {
    steps: secProofSteps,
    title: "Proof: d/dx(sec x) = sec x tan x",
    conceptId: "sec-derivative-proof",
    conceptName: "Secant Derivative Proof", 
    conceptDescription: "Step-by-step proof using Quotient Rule",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Prove that d/dx(sec x) = sec x tan x using the Quotient Rule:",
    },
    completionMessage: <>Complete! We've proven that d/dx(sec x) = sec x tan x.</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect secant derivative proof!")
      }
    }
  }

  // Quiz questions
  const questions: QuizQuestion[] = [
    {
      id: 'trig-derivatives-recall',
      question: <>Which of these trigonometric derivative formulas is correct?</>,
      options: [
        '\\frac{d}{dx}(\\tan x) = \\csc^2 x',
        '\\frac{d}{dx}(\\cot x) = -\\csc^2 x',
        '\\frac{d}{dx}(\\sec x) = -\\sec x \\tan x',
        '\\frac{d}{dx}(\\csc x) = \\csc x \\cot x'
      ],
      correctAnswer: '\\frac{d}{dx}(\\cot x) = -\\csc^2 x',
      explanation: <>The correct derivative is <InlineMath math="\frac{d}{dx}(\cot x) = -\csc^2 x" />. Note the negative sign that distinguishes it from <InlineMath math="\frac{d}{dx}(\tan x) = \sec^2 x" />.</>,
      questionText: 'Trigonometric derivative formulas'
    },
    {
      id: 'quotient-rule-application',
      question: <>Why do we use the Quotient Rule to prove <InlineMath math="\frac{d}{dx}(\tan x) = \sec^2 x" />?</>,
      options: [
        'Because \\tan x is always positive',
        'Because \\tan x = \\frac{\\sin x}{\\cos x}',
        'Because \\tan x involves multiplication',
        'Because \\tan x is periodic'
      ],
      correctAnswer: 'Because \\tan x = \\frac{\\sin x}{\\cos x}',
      explanation: <>Since <InlineMath math="\tan x = \frac{\sin x}{\cos x}" />, it's a quotient of two functions, making the Quotient Rule the appropriate tool for finding its derivative.</>,
      questionText: 'Why use Quotient Rule for tangent'
    },
    {
      id: 'pythagorean-identity',
      question: <>Which identity is crucial in the proof of <InlineMath math="\frac{d}{dx}(\tan x) = \sec^2 x" />?</>,
      options: [
        '\\tan^2 x + 1 = \\sec^2 x',
        '\\sin^2 x + \\cos^2 x = 1',
        '\\sin 2x = 2 \\sin x \\cos x',
        '\\cos 2x = \\cos^2 x - \\sin^2 x'
      ],
      correctAnswer: '\\sin^2 x + \\cos^2 x = 1',
      explanation: <>The Pythagorean identity <InlineMath math="\sin^2 x + \cos^2 x = 1" /> is essential to simplify <InlineMath math="\cos^2 x + \sin^2 x = 1" /> in the numerator of our Quotient Rule application.</>,
      questionText: 'Key identity in the proof'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "trig-derivatives-concepts",
    conceptName: "Trigonometric Derivatives",
    conceptDescription: "Understanding trigonometric derivative formulas and their proofs",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Formulas and Tan Proof */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200 mb-3">
                  <strong>The Four Additional Trigonometric Derivatives:</strong>
                </p>
                <div className="space-y-2">
                  <BlockMath math="\frac{d}{dx}[\tan x] = \sec^2 x" />
                  <BlockMath math="\frac{d}{dx}[\sec x] = \sec x \tan x" />
                  <BlockMath math="\frac{d}{dx}[\cot x] = -\csc^2 x" />
                  <BlockMath math="\frac{d}{dx}[\csc x] = -\csc x \cot x" />
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
                  Pattern Recognition:
                </p>
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  • Co-functions (cot, csc) have negative derivatives<br/>
                  • Derivatives often involve products of the original function with another trig function
                </p>
              </div>
            </div>
          </div>
          
          {/* Tan Proof */}
          <StepByStepRenderer 
            config={tanStepConfig}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Memory Tips */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
              Memory Tips
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Tan/Sec Pattern:</strong> tan → sec², sec → sec tan
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Cot/Csc Pattern:</strong> cot → -csc², csc → -csc cot
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  <strong>Co-functions:</strong> Always include a negative sign
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sec Proof and Quiz */}
        <div className="space-y-6">
          
          {/* Sec Proof */}
          <StepByStepRenderer 
            config={secStepConfig}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Quick Check Quiz */}
          <QuizRenderer 
            config={quizConfig}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Proof Strategy */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Proof Strategy for Other Derivatives
            </h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200 mb-2">
                  <strong>For d/dx(cot x) = -csc² x:</strong>
                </p>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  Express cot x = cos x / sin x and apply Quotient Rule
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200 mb-2">
                  <strong>For d/dx(csc x) = -csc x cot x:</strong>
                </p>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  Express csc x = 1 / sin x and apply Quotient Rule
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Exercise:</strong> Try proving these remaining two derivatives as practice!
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
      slideId="trig-derivatives"
      slideTitle="Derivatives of Trigonometric Functions"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="product-quotient-rules"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}