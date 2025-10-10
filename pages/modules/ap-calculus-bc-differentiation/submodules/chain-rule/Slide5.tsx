import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer'
import { QuizRenderer, QuizQuestion, QuizConfig } from '../../../common-components/QuizRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function ChainRuleSlide5() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Step-by-step example 1: y = cos(x + 1)
  const example1Steps: Step[] = [
    {
      id: 'identify-trig-function',
      question: <>For <InlineMath math="y = \cos(x + 1)" />, identify the trigonometric function and inner function</>,
      options: [
        { id: 'correct', text: '\\text{Trig function: } \\cos u, \\text{ Inner function: } u = x + 1', isCorrect: true },
        { id: 'wrong1', text: '\\text{Trig function: } \\sin u, \\text{ Inner function: } u = x + 1', isCorrect: false },
        { id: 'wrong2', text: '\\text{Trig function: } \\cos u, \\text{ Inner function: } u = x', isCorrect: false },
        { id: 'wrong3', text: '\\text{Trig function: } \\cos x, \\text{ Inner function: } u = 1', isCorrect: false }
      ],
      correctAnswer: '\\text{Trig function: } \\cos u, \\text{ Inner function: } u = x + 1',
      explanation: <>We have <InlineMath math="y = \cos(x + 1)" /> where the outer function is <InlineMath math="\cos u" /> and the inner function is <InlineMath math="u = x + 1" />.</>,
      questionText: 'Identify the functions',
      nextStep: 'Apply Chain Rule for cosine'
    },
    {
      id: 'apply-chain-rule-cos',
      question: <>Apply the Chain Rule: <InlineMath math="\frac{d}{dx}[\cos u] = -\sin u \cdot u'" /></>,
      options: [
        { id: 'wrong1', text: 'y\' = \\cos(x + 1) \\cdot 1', isCorrect: false },
        { id: 'correct', text: 'y\' = -\\sin(x + 1) \\cdot 1', isCorrect: true },
        { id: 'wrong2', text: 'y\' = -\\sin(x + 1) \\cdot (x + 1)', isCorrect: false },
        { id: 'wrong3', text: 'y\' = \\sin(x + 1) \\cdot 1', isCorrect: false }
      ],
      correctAnswer: 'y\' = -\\sin(x + 1) \\cdot 1',
      explanation: <>Using the Chain Rule: <InlineMath math="y' = -\sin(x + 1) \cdot \frac{d}{dx}(x + 1) = -\sin(x + 1) \cdot 1" /></>,
      questionText: 'Apply Chain Rule',
      nextStep: 'Simplify result'
    },
    {
      id: 'simplify-cos-result',
      question: <>Simplify the final result</>,
      options: [
        { id: 'wrong1', text: 'y\' = \\cos(x + 1)', isCorrect: false },
        { id: 'correct', text: 'y\' = -\\sin(x + 1)', isCorrect: true },
        { id: 'wrong2', text: 'y\' = -\\sin(x + 1) \\cdot (x + 1)', isCorrect: false },
        { id: 'wrong3', text: 'y\' = \\sin(x + 1)', isCorrect: false }
      ],
      correctAnswer: 'y\' = -\\sin(x + 1)',
      explanation: <>Since <InlineMath math="\frac{d}{dx}(x + 1) = 1" />, we have <InlineMath math="y' = -\sin(x + 1) \cdot 1 = -\sin(x + 1)" />.</>,
      questionText: 'Simplify the expression'
    }
  ]

  // Step-by-step example 2: y = tan(3x)
  const example2Steps: Step[] = [
    {
      id: 'identify-tan-function',
      question: <>For <InlineMath math="y = \tan(3x)" />, identify the inner function and its derivative</>,
      options: [
        { id: 'correct', text: '\\text{Inner function: } u = 3x, \\text{ Derivative: } u\' = 3', isCorrect: true },
        { id: 'wrong1', text: '\\text{Inner function: } u = 3x, \\text{ Derivative: } u\' = x', isCorrect: false },
        { id: 'wrong2', text: '\\text{Inner function: } u = x, \\text{ Derivative: } u\' = 1', isCorrect: false },
        { id: 'wrong3', text: '\\text{Inner function: } u = 3x, \\text{ Derivative: } u\' = 1', isCorrect: false }
      ],
      correctAnswer: '\\text{Inner function: } u = 3x, \\text{ Derivative: } u\' = 3',
      explanation: <>For <InlineMath math="y = \tan(3x)" />, the inner function is <InlineMath math="u = 3x" /> and <InlineMath math="u' = \frac{d}{dx}(3x) = 3" />.</>,
      questionText: 'Identify inner function',
      nextStep: 'Apply Chain Rule for tangent'
    },
    {
      id: 'apply-chain-rule-tan',
      question: <>Apply the Chain Rule: <InlineMath math="\frac{d}{dx}[\tan u] = \sec^2 u \cdot u'" /></>,
      options: [
        { id: 'wrong1', text: 'y\' = \\sec^2(3x) \\cdot 1', isCorrect: false },
        { id: 'correct', text: 'y\' = \\sec^2(3x) \\cdot 3', isCorrect: true },
        { id: 'wrong2', text: 'y\' = 3\\sec^2(3x) \\cdot 3x', isCorrect: false },
        { id: 'wrong3', text: 'y\' = \\tan(3x) \\cdot 3', isCorrect: false }
      ],
      correctAnswer: 'y\' = \\sec^2(3x) \\cdot 3',
      explanation: <>Using the Chain Rule: <InlineMath math="y' = \sec^2(3x) \cdot \frac{d}{dx}(3x) = \sec^2(3x) \cdot 3" /></>,
      questionText: 'Apply Chain Rule',
      nextStep: 'Write final form'
    },
    {
      id: 'final-tan-form',
      question: <>Write the final simplified form</>,
      options: [
        { id: 'wrong1', text: 'y\' = \\sec^2(3x)', isCorrect: false },
        { id: 'correct', text: 'y\' = 3\\sec^2(3x)', isCorrect: true },
        { id: 'wrong2', text: 'y\' = 3\\sec(3x)', isCorrect: false },
        { id: 'wrong3', text: 'y\' = \\sec^2(3x) + 3', isCorrect: false }
      ],
      correctAnswer: 'y\' = 3\\sec^2(3x)',
      explanation: <>The final answer is <InlineMath math="y' = 3\sec^2(3x)" />.</>,
      questionText: 'Final simplified form'
    }
  ]

  // Step-by-step example 3: f(t) = sin³(4t) - Repeated Chain Rule application
  const example3Steps: Step[] = [
    {
      id: 'rewrite-power-function',
      question: <>Rewrite <InlineMath math="f(t) = \sin^3(4t)" /> to clearly show the composition</>,
      options: [
        { id: 'correct', text: 'f(t) = [\\sin(4t)]^3', isCorrect: true },
        { id: 'wrong1', text: 'f(t) = \\sin(4t^3)', isCorrect: false },
        { id: 'wrong2', text: 'f(t) = 3\\sin(4t)', isCorrect: false },
        { id: 'wrong3', text: 'f(t) = \\sin^3(t) \\cdot 4', isCorrect: false }
      ],
      correctAnswer: 'f(t) = [\\sin(4t)]^3',
      explanation: <><InlineMath math="\sin^3(4t)" /> means <InlineMath math="[\sin(4t)]^3" /> - we cube the entire sine function.</>,
      questionText: 'Rewrite the function',
      nextStep: 'Apply Chain Rule first time'
    },
    {
      id: 'first-chain-rule',
      question: <>Apply the Chain Rule once: <InlineMath math="\frac{d}{dt}[u^3] = 3u^2 \cdot u'" /> where <InlineMath math="u = \sin(4t)" /></>,
      options: [
        { id: 'wrong1', text: 'f\'(t) = 3[\\sin(4t)]^2', isCorrect: false },
        { id: 'correct', text: 'f\'(t) = 3[\\sin(4t)]^2 \\cdot \\frac{d}{dt}[\\sin(4t)]', isCorrect: true },
        { id: 'wrong2', text: 'f\'(t) = 3[\\sin(4t)]^2 \\cdot \\cos(4t)', isCorrect: false },
        { id: 'wrong3', text: 'f\'(t) = [\\sin(4t)]^2 \\cdot \\cos(4t)', isCorrect: false }
      ],
      correctAnswer: 'f\'(t) = 3[\\sin(4t)]^2 \\cdot \\frac{d}{dt}[\\sin(4t)]',
      explanation: <>First application of Chain Rule: <InlineMath math="f'(t) = 3[\sin(4t)]^2 \cdot \frac{d}{dt}[\sin(4t)]" /></>,
      questionText: 'Apply Chain Rule once',
      nextStep: 'Apply Chain Rule second time'
    },
    {
      id: 'second-chain-rule',
      question: <>Now find <InlineMath math="\frac{d}{dt}[\sin(4t)]" /> using the Chain Rule again</>,
      options: [
        { id: 'wrong1', text: '\\frac{d}{dt}[\\sin(4t)] = \\cos(4t)', isCorrect: false },
        { id: 'correct', text: '\\frac{d}{dt}[\\sin(4t)] = \\cos(4t) \\cdot 4', isCorrect: true },
        { id: 'wrong2', text: '\\frac{d}{dt}[\\sin(4t)] = -\\sin(4t) \\cdot 4', isCorrect: false },
        { id: 'wrong3', text: '\\frac{d}{dt}[\\sin(4t)] = 4\\cos(t)', isCorrect: false }
      ],
      correctAnswer: '\\frac{d}{dt}[\\sin(4t)] = \\cos(4t) \\cdot 4',
      explanation: <>Second application: <InlineMath math="\frac{d}{dt}[\sin(4t)] = \cos(4t) \cdot \frac{d}{dt}(4t) = \cos(4t) \cdot 4" /></>,
      questionText: 'Apply Chain Rule again',
      nextStep: 'Combine and simplify'
    },
    {
      id: 'combine-results',
      question: <>Combine the results to get the final derivative</>,
      options: [
        { id: 'wrong1', text: 'f\'(t) = 3\\sin^2(4t)\\cos(4t)', isCorrect: false },
        { id: 'correct', text: 'f\'(t) = 12\\sin^2(4t)\\cos(4t)', isCorrect: true },
        { id: 'wrong2', text: 'f\'(t) = 12\\sin(4t)\\cos(4t)', isCorrect: false },
        { id: 'wrong3', text: 'f\'(t) = 3\\sin^2(4t)\\cos(4t) \\cdot 4t', isCorrect: false }
      ],
      correctAnswer: 'f\'(t) = 12\\sin^2(4t)\\cos(4t)',
      explanation: <>Combining: <InlineMath math="f'(t) = 3[\sin(4t)]^2 \cdot \cos(4t) \cdot 4 = 12\sin^2(4t)\cos(4t)" /></>,
      questionText: 'Combine and simplify'
    }
  ]

  const example1Config: StepConfig = {
    steps: example1Steps,
    title: "Example 1: Basic Trigonometric Chain Rule",
    conceptId: "trig-chain-rule-basic",
    conceptName: "Trigonometric Chain Rule: Cosine",
    conceptDescription: "Applying Chain Rule to trigonometric functions",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the derivative of y = cos(x + 1):",
    },
    completionMessage: <>Complete! y' = -sin(x + 1)</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect trigonometric Chain Rule!")
      }
    }
  }

  const example2Config: StepConfig = {
    steps: example2Steps,
    title: "Example 2: Tangent with Coefficient",
    conceptId: "trig-chain-rule-tangent",
    conceptName: "Trigonometric Chain Rule: Tangent",
    conceptDescription: "Chain Rule with tangent and coefficient",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the derivative of y = tan(3x):",
    },
    completionMessage: <>Complete! y' = 3sec²(3x)</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect tangent differentiation!")
      }
    }
  }

  const example3Config: StepConfig = {
    steps: example3Steps,
    title: "Example 3: Repeated Chain Rule Application",
    conceptId: "trig-chain-rule-repeated",
    conceptName: "Repeated Chain Rule Application",
    conceptDescription: "Multiple applications of Chain Rule for composite functions",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the derivative of f(t) = sin³(4t):",
    },
    completionMessage: <>Complete! f'(t) = 12sin²(4t)cos(4t)</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect repeated Chain Rule!")
      }
    }
  }

  // Quiz questions about trigonometric Chain Rule
  const questions: QuizQuestion[] = [
    {
      id: 'trig-chain-rule-formulas',
      question: <>Which Chain Rule formula for trigonometric functions is correct?</>,
      options: [
        '\\frac{d}{dx}[\\sin u] = \\cos u \\cdot u\'',
        '\\frac{d}{dx}[\\cos u] = \\sin u \\cdot u\'',
        '\\frac{d}{dx}[\\tan u] = \\csc^2 u \\cdot u\'',
        '\\frac{d}{dx}[\\sec u] = -\\sec u \\tan u \\cdot u\''
      ],
      correctAnswer: '\\frac{d}{dx}[\\sin u] = \\cos u \\cdot u\'',
      explanation: <>The correct formula is <InlineMath math="\frac{d}{dx}[\sin u] = \cos u \cdot u'" />. Note that <InlineMath math="\frac{d}{dx}[\cos u] = -\sin u \cdot u'" /> (negative), <InlineMath math="\frac{d}{dx}[\tan u] = \sec^2 u \cdot u'" /> (sec squared), and <InlineMath math="\frac{d}{dx}[\sec u] = \sec u \tan u \cdot u'" /> (positive).</>,
      questionText: 'Trigonometric Chain Rule formulas'
    },
    {
      id: 'parentheses-convention',
      question: <>What does the notation sin 2x mean in mathematical convention?</>,
      options: [
        '\\sin(2) \\cdot x',
        '\\sin(2x)',
        '\\sin^2(x)',
        '2 \\cdot \\sin(x)'
      ],
      correctAnswer: '\\sin(2x)',
      explanation: <>By mathematical convention, <InlineMath math="\sin 2x" /> means <InlineMath math="\sin(2x)" />. The argument of the sine function is <InlineMath math="2x" />.</>,
      questionText: 'Mathematical notation convention'
    },
    {
      id: 'repeated-chain-rule',
      question: <>When do you need to apply the Chain Rule multiple times?</>,
      options: [
        'When you have a sum of functions',
        'When you have a product of functions',
        'When you have compositions within compositions',
        'When you have a quotient of functions'
      ],
      correctAnswer: 'When you have compositions within compositions',
      explanation: <>You apply the Chain Rule multiple times when you have compositions within compositions, like <InlineMath math="\sin^3(4x) = [\sin(4x)]^3" />, where you have a power of a trigonometric function with an inner function.</>,
      questionText: 'When to use repeated Chain Rule'
    }
  ]

  const quizConfig: QuizConfig = {
    questions,
    title: "Quick Check",
    conceptId: "trig-chain-rule-concepts",
    conceptName: "Trigonometric Chain Rule Concepts",
    conceptDescription: "Understanding trigonometric Chain Rule applications",
    mathRendering: 'latex'
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Formulas and First Example */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200 mb-3 text-lg">
                  <strong>Trigonometric Functions and the Chain Rule:</strong> The Chain Rule versions of the 
                  derivatives of the six trigonometric functions.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-3 text-lg">Chain Rule Formulas for Trig Functions:</p>
                <div className="grid grid-cols-2 gap-2 text-lg">
                  <BlockMath math="\frac{d}{dx}[\sin u] = \cos u \cdot u'" />
                  <BlockMath math="\frac{d}{dx}[\cos u] = -\sin u \cdot u'" />
                  <BlockMath math="\frac{d}{dx}[\tan u] = \sec^2 u \cdot u'" />
                  <BlockMath math="\frac{d}{dx}[\cot u] = -\csc^2 u \cdot u'" />
                  <BlockMath math="\frac{d}{dx}[\sec u] = \sec u \tan u \cdot u'" />
                  <BlockMath math="\frac{d}{dx}[\csc u] = -\csc u \cot u \cdot u'" />
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2 text-lg">
                  Mathematical Convention:
                </p>
                <p className="text-yellow-800 dark:text-yellow-200 text-lg">
                  <InlineMath math="\sin 2x" /> means <InlineMath math="\sin(2x)" />, not <InlineMath math="(\sin 2) \cdot x" />
                </p>
              </div>
            </div>
          </div>
          
          {/* Example 1 */}
          <StepByStepRenderer 
            config={example1Config}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Quiz */}
          <QuizRenderer 
            config={quizConfig}
            onInteractionComplete={handleInteractionComplete}
          />
        </div>

        {/* Right Column - Examples 2 and 3 */}
        <div className="space-y-6">
          
          {/* Example 2 */}
          <StepByStepRenderer 
            config={example2Config}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Example 3 */}
          <StepByStepRenderer 
            config={example3Config}
            onInteractionComplete={handleInteractionComplete}
          />

          {/* Key Strategies */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Key Strategies
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-lg">
                  <strong>1.</strong> Identify the trigonometric function as the outer function
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>2.</strong> Find the derivative of the inner function
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>3.</strong> Apply the appropriate trigonometric derivative formula
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>4.</strong> Multiply by the derivative of the inner function
                </p>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <p className="text-lg">
                  <strong>5.</strong> For nested compositions, apply Chain Rule repeatedly
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
      slideId="trig-chain-rule"
      slideTitle="Trigonometric Functions and the Chain Rule"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="chain-rule"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}