import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function ChainRuleSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Step-by-step example 1: (2x - x²)⁴
  const example1Steps: Step[] = [
    {
      id: 'identify-u-and-n',
      question: <>For <InlineMath math="f(x) = (2x - x^2)^4" />, identify <InlineMath math="u(x)" /> and <InlineMath math="n" /></>,
      options: [
        { id: 'correct', text: 'u(x) = 2x - x² and n = 4', isCorrect: true },
        { id: 'wrong1', text: 'u(x) = 2x and n = 2', isCorrect: false },
        { id: 'wrong2', text: 'u(x) = x² and n = 4', isCorrect: false },
        { id: 'wrong3', text: 'u(x) = 2x - x² and n = 2', isCorrect: false }
      ],
      correctAnswer: 'u(x) = 2x - x² and n = 4',
      explanation: <>We have <InlineMath math="f(x) = (2x - x^2)^4 = [u(x)]^n" /> where <InlineMath math="u(x) = 2x - x^2" /> and <InlineMath math="n = 4" />.</>,
      questionText: 'Identify u and n',
      nextStep: 'Find u prime'
    },
    {
      id: 'find-u-prime',
      question: <>Find <InlineMath math="u'(x)" /> for <InlineMath math="u(x) = 2x - x^2" /></>,
      options: [
        { id: 'correct', text: "u'(x) = 2 - 2x", isCorrect: true },
        { id: 'wrong1', text: "u'(x) = 2 - x", isCorrect: false },
        { id: 'wrong2', text: "u'(x) = 2x - 2x", isCorrect: false },
        { id: 'wrong3', text: "u'(x) = 2 + 2x", isCorrect: false }
      ],
      correctAnswer: "u'(x) = 2 - 2x",
      explanation: <><InlineMath math="u'(x) = \frac{d}{dx}(2x - x^2) = 2 - 2x" /></>,
      questionText: 'Find the derivative of u',
      nextStep: 'Apply General Power Rule'
    },
    {
      id: 'apply-general-power-rule',
      question: <>Apply the Chain Rule: <InlineMath math="\frac{d}{dx}[u^n] = n \cdot u^{n-1} \cdot u'" /></>,
      options: [
        { id: 'wrong1', text: '4(2x - x²)³ · (2 - x)', isCorrect: false },
        { id: 'correct', text: '4(2x - x²)³ · (2 - 2x)', isCorrect: true },
        { id: 'wrong2', text: '3(2x - x²)³ · (2 - 2x)', isCorrect: false },
        { id: 'wrong3', text: '4(2x - x²)⁴ · (2 - 2x)', isCorrect: false }
      ],
      correctAnswer: '4(2x - x²)³ · (2 - 2x)',
      explanation: <>Using the Chain Rule: <InlineMath math="f'(x) = n \cdot [u(x)]^{n-1} \cdot u'(x) = 4 \cdot (2x - x^2)^3 \cdot (2 - 2x)" /></>,
      questionText: 'Apply the Chain Rule'
    }
  ]

  // Step-by-step example 2: ∛(x² + 4)
  const example2Steps: Step[] = [
    {
      id: 'rewrite-radical',
      question: <>Rewrite <InlineMath math="f(x) = \sqrt[3]{x^2 + 4}" /> using exponents</>,
      options: [
        { id: 'correct', text: 'f(x) = (x² + 4)^{1/3}', isCorrect: true },
        { id: 'wrong1', text: 'f(x) = (x² + 4)^3', isCorrect: false },
        { id: 'wrong2', text: 'f(x) = (x² + 4)^{2/3}', isCorrect: false },
        { id: 'wrong3', text: 'f(x) = 3(x² + 4)', isCorrect: false }
      ],
      correctAnswer: 'f(x) = (x² + 4)^{1/3}',
      explanation: <>The cube root <InlineMath math="\sqrt[3]{x^2 + 4}" /> can be written as <InlineMath math="(x^2 + 4)^{1/3}" />.</>,
      questionText: 'Rewrite using exponents',
      nextStep: 'Identify u and n for radical'
    },
    {
      id: 'identify-u-n-radical',
      question: <>For <InlineMath math="f(x) = (x^2 + 4)^{1/3}" />, identify <InlineMath math="u(x)" /> and <InlineMath math="n" /></>,
      options: [
        { id: 'correct', text: 'u(x) = x² + 4 and n = 1/3', isCorrect: true },
        { id: 'wrong1', text: 'u(x) = x² and n = 1/3', isCorrect: false },
        { id: 'wrong2', text: 'u(x) = x² + 4 and n = 3', isCorrect: false },
        { id: 'wrong3', text: 'u(x) = x and n = 2/3', isCorrect: false }
      ],
      correctAnswer: 'u(x) = x² + 4 and n = 1/3',
      explanation: <>We have <InlineMath math="f(x) = (x^2 + 4)^{1/3} = [u(x)]^n" /> where <InlineMath math="u(x) = x^2 + 4" /> and <InlineMath math="n = 1/3" />.</>,
      questionText: 'Identify u and n',
      nextStep: 'Find derivative for radical'
    },
    {
      id: 'apply-rule-radical',
      question: <>Apply the Chain Rule with <InlineMath math="u'(x) = 2x" /></>,
      options: [
        { id: 'wrong1', text: '(1/3)(x² + 4)^{1/3} · 2x', isCorrect: false },
        { id: 'correct', text: '(1/3)(x² + 4)^{-2/3} · 2x', isCorrect: true },
        { id: 'wrong2', text: '(2/3)(x² + 4)^{-1/3} · 2x', isCorrect: false },
        { id: 'wrong3', text: '(1/3)(x² + 4)^{2/3} · 2x', isCorrect: false }
      ],
      correctAnswer: '(1/3)(x² + 4)^{-2/3} · 2x',
      explanation: <><InlineMath math="f'(x) = (1/3)(x^2 + 4)^{1/3-1} \cdot 2x = (1/3)(x^2 + 4)^{-2/3} \cdot 2x = \frac{2x}{3\sqrt[3]{(x^2 + 4)^2}}" /></>,
      questionText: 'Apply the Chain Rule'
    }
  ]

  // Step-by-step example 3: 5/(t + 2)³
  const example3Steps: Step[] = [
    {
      id: 'rewrite-quotient',
      question: <>Rewrite <InlineMath math="g(t) = \frac{5}{(t + 2)^3}" /> using negative exponents</>,
      options: [
        { id: 'correct', text: 'g(t) = 5(t + 2)^{-3}', isCorrect: true },
        { id: 'wrong1', text: 'g(t) = 5(t + 2)^3', isCorrect: false },
        { id: 'wrong2', text: 'g(t) = (5/t + 2)^{-3}', isCorrect: false },
        { id: 'wrong3', text: 'g(t) = 5/(t + 2)^{-3}', isCorrect: false }
      ],
      correctAnswer: 'g(t) = 5(t + 2)^{-3}',
      explanation: <>We can rewrite <InlineMath math="\frac{5}{(t + 2)^3}" /> as <InlineMath math="5(t + 2)^{-3}" /> to use the Chain Rule.</>,
      questionText: 'Rewrite using negative exponents',
      nextStep: 'Apply constant multiple rule'
    },
    {
      id: 'apply-constant-multiple',
      question: <>Apply the Constant Multiple Rule and Chain Rule</>,
      options: [
        { id: 'wrong1', text: 'g\'(t) = 5 · (-3)(t + 2)^{-4} · 2', isCorrect: false },
        { id: 'correct', text: 'g\'(t) = 5 · (-3)(t + 2)^{-4} · 1', isCorrect: true },
        { id: 'wrong2', text: 'g\'(t) = 5 · (-3)(t + 2)^{-2} · 1', isCorrect: false },
        { id: 'wrong3', text: 'g\'(t) = (-3)(t + 2)^{-4} · 1', isCorrect: false }
      ],
      correctAnswer: 'g\'(t) = 5 · (-3)(t + 2)^{-4} · 1',
      explanation: <>Using the Constant Multiple Rule: <InlineMath math="g'(t) = 5 \cdot \frac{d}{dt}[(t + 2)^{-3}] = 5 \cdot (-3)(t + 2)^{-4} \cdot 1" /></>,
      questionText: 'Apply both rules',
      nextStep: 'Simplify result'
    },
    {
      id: 'simplify-quotient-result',
      question: <>Simplify <InlineMath math="g'(t) = 5 \cdot (-3)(t + 2)^{-4} \cdot 1" /></>,
      options: [
        { id: 'wrong1', text: 'g\'(t) = -15/(t + 2)³', isCorrect: false },
        { id: 'correct', text: 'g\'(t) = -15/(t + 2)⁴', isCorrect: true },
        { id: 'wrong2', text: 'g\'(t) = -15(t + 2)⁴', isCorrect: false },
        { id: 'wrong3', text: 'g\'(t) = 15/(t + 2)⁴', isCorrect: false }
      ],
      correctAnswer: 'g\'(t) = -15/(t + 2)⁴',
      explanation: <>Simplifying: <InlineMath math="g'(t) = 5 \cdot (-3) \cdot 1 \cdot (t + 2)^{-4} = -15(t + 2)^{-4} = \frac{-15}{(t + 2)^4}" /></>,
      questionText: 'Simplify the expression'
    }
  ]

  const example1Config: StepConfig = {
    steps: example1Steps,
    title: "Example 1: Polynomial Power",
    conceptId: "general-power-rule-polynomial",
    conceptName: "Chain Rule with Polynomials",
    conceptDescription: "Applying the Chain Rule to polynomial expressions raised to a power",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the derivative of f(x) = (2x - x²)⁴:",
    },
    completionMessage: <>Complete! f'(x) = 4(2x - x²)³(2 - 2x)</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect Chain Rule application!")
      }
    }
  }

  const example2Config: StepConfig = {
    steps: example2Steps,
    title: "Example 2: Radical Function",
    conceptId: "general-power-rule-radical",
    conceptName: "Chain Rule with Radicals",
    conceptDescription: "Applying the Chain Rule to radical expressions",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the derivative of f(x) = ∛(x² + 4):",
    },
    completionMessage: <>Complete! f'(x) = (2x)/(3∛((x² + 4)²))</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect radical differentiation!")
      }
    }
  }

  const example3Config: StepConfig = {
    steps: example3Steps,
    title: "Example 3: Quotient with Constant Numerator",
    conceptId: "general-power-rule-quotient",
    conceptName: "Chain Rule with Quotients",
    conceptDescription: "Using negative exponents and the Chain Rule for quotients",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the derivative of g(t) = 5/(t + 2)³:",
    },
    completionMessage: <>Complete! g'(t) = -15/(t + 2)⁴</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect quotient differentiation!")
      }
    }
  }

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory and First Example */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 dark:text-blue-200 mb-3 text-lg">
                  <strong>Chain Rule for Power Functions:</strong> If y = [u(x)]ⁿ where u is a differentiable function of x 
                  and n is a rational number, then:
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="font-medium mb-3 text-lg">Chain Rule Formula for Powers:</p>
                <BlockMath math="\frac{dy}{dx} = n[u(x)]^{n-1} \cdot \frac{du}{dx}" />
                <p className="text-center my-2 text-lg">or, equivalently,</p>
                <BlockMath math="\frac{d}{dx}[u^n] = nu^{n-1} \cdot u'" />
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2 text-lg">
                  Key Insight:
                </p>
                <p className="text-yellow-800 dark:text-yellow-200 text-lg">
                  This is the Chain Rule applied to functions of the form [u(x)]ⁿ.
                </p>
              </div>
            </div>
          </div>

          {/* Proof Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Proof Using the Chain Rule
            </h3>
            
            <div className="space-y-4 text-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Since y = uⁿ, we apply the Chain Rule:
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <BlockMath math="\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}" />
                
                <p className="text-gray-700 dark:text-gray-300 my-3">
                  By the (Simple) Power Rule from Section 2.2:
                </p>
                
                <BlockMath math="\frac{dy}{du} = \frac{d}{du}(u^n) = nu^{n-1}" />
                
                <p className="text-gray-700 dark:text-gray-300 my-3">
                  Therefore:
                </p>
                
                <BlockMath math="\frac{dy}{dx} = nu^{n-1} \cdot \frac{du}{dx}" />
              </div>
            </div>
          </div>

          {/* Example 1 */}
          <StepByStepRenderer 
            config={example1Config}
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

          {/* Key Applications */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Common Applications
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-lg">
                  <strong>1.</strong> Powers of polynomials: (ax + b)ⁿ
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>2.</strong> Radical functions: ⁿ√(expression) = (expression)^(1/n)
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>3.</strong> Quotients with constant numerators: a/(expression)ⁿ = a(expression)^(-n)
                </p>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg">
                  <strong>4.</strong> Fractional exponents: (expression)^(p/q)
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
      slideId="general-power-rule"
      slideTitle="Chain Rule Applications"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="chain-rule"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}