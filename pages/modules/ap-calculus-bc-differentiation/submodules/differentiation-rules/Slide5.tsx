import React, { useState } from 'react'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { StepByStepRenderer, Step, StepConfig } from '../../../common-components/StepByStepRenderer'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

export default function DifferentiationRulesSlide5() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Step-by-step example 1: f(x) = x^4 at x = 1
  const example1Steps: Step[] = [
    {
      id: 'apply-power-rule-x4',
      question: <>Apply the Power Rule to find the derivative of f(x) = x⁴</>,
      options: [
        { id: 'correct', text: '4x³', isCorrect: true },
        { id: 'wrong1', text: 'x⁴', isCorrect: false },
        { id: 'wrong2', text: '4x⁴', isCorrect: false },
        { id: 'wrong3', text: 'x³', isCorrect: false }
      ],
      correctAnswer: '4x³',
      explanation: <>Using the Power Rule: if f(x) = xⁿ, then f'(x) = nxⁿ⁻¹. For n = 4: f'(x) = 4x³</>,
      questionText: 'Apply Power Rule to f(x) = x⁴',
      nextStep: 'Evaluate at x = 1'
    },
    {
      id: 'evaluate-at-x1',
      question: <>Evaluate f'(x) = 4x³ at x = 1</>,
      options: [
        { id: 'correct', text: '4', isCorrect: true },
        { id: 'wrong1', text: '1', isCorrect: false },
        { id: 'wrong2', text: '3', isCorrect: false },
        { id: 'wrong3', text: '4(1)', isCorrect: false }
      ],
      correctAnswer: '4',
      explanation: <>Substitute x = 1: f'(1) = 4(1)³ = 4(1) = 4</>,
      questionText: 'Evaluate f\'(1) = 4(1)³'
    }
  ]

  // Step-by-step example 2: f(x) = x^6 + 2x + 9 at x = 3
  const example2Steps: Step[] = [
    {
      id: 'apply-sum-rule',
      question: <>Apply the Sum Rule to f(x) = x⁶ + 2x + 9</>,
      options: [
        { id: 'correct', text: "f'(x) = \\frac{d}{dx}[x^6] + \\frac{d}{dx}[2x] + \\frac{d}{dx}[9]", isCorrect: true },
        { id: 'wrong1', text: "f'(x) = \\frac{d}{dx}[x^6 + 2x + 9]", isCorrect: false },
        { id: 'wrong2', text: "f'(x) = \\left(\\frac{d}{dx}[x^6]\\right)\\left(\\frac{d}{dx}[2x]\\right)\\left(\\frac{d}{dx}[9]\\right)", isCorrect: false },
        { id: 'wrong3', text: "f'(x) = \\frac{d}{dx}[x^6] - \\frac{d}{dx}[2x] - \\frac{d}{dx}[9]", isCorrect: false }
      ],
      correctAnswer: "f'(x) = \\frac{d}{dx}[x^6] + \\frac{d}{dx}[2x] + \\frac{d}{dx}[9]",
      explanation: <>The Sum Rule says: <InlineMath math="\frac{d}{dx}[f + g + h] = f' + g' + h'" />. So we differentiate each term separately and add the results.</>,
      questionText: 'Apply Sum Rule to separate terms',
      nextStep: 'Apply Power Rule to first term'
    },
    {
      id: 'apply-power-rule-x6',
      question: <>Apply the Power Rule to the first term: <InlineMath math="\frac{d}{dx}[x^6]" /></>,
      options: [
        { id: 'wrong1', text: 'x^6', isCorrect: false },
        { id: 'correct', text: '6x^5', isCorrect: true },
        { id: 'wrong2', text: '6x^6', isCorrect: false },
        { id: 'wrong3', text: 'x^5', isCorrect: false }
      ],
      correctAnswer: '6x^5',
      explanation: <>Power Rule: <InlineMath math="\frac{d}{dx}[x^n] = nx^{n-1}" />. For x⁶: <InlineMath math="\frac{d}{dx}[x^6] = 6x^{6-1} = 6x^5" /></>,
      questionText: 'Apply Power Rule to x⁶',
      nextStep: 'Apply Constant Multiple Rule to second term'
    },
    {
      id: 'apply-constant-multiple-rule',
      question: <>Apply the Constant Multiple Rule to the second term: <InlineMath math="\frac{d}{dx}[2x]" /></>,
      options: [
        { id: 'wrong1', text: '2x', isCorrect: false },
        { id: 'correct', text: '2', isCorrect: true },
        { id: 'wrong2', text: '1', isCorrect: false },
        { id: 'wrong3', text: '2x^2', isCorrect: false }
      ],
      correctAnswer: '2',
      explanation: <>Constant Multiple Rule: <InlineMath math="\frac{d}{dx}[cf(x)] = c \cdot f'(x)" />. For 2x: <InlineMath math="\frac{d}{dx}[2x] = 2 \cdot \frac{d}{dx}[x] = 2 \cdot 1 = 2" /></>,
      questionText: 'Apply Constant Multiple Rule to 2x',
      nextStep: 'Apply Constant Rule to third term'
    },
    {
      id: 'apply-constant-rule',
      question: <>Apply the Constant Rule to the third term: <InlineMath math="\frac{d}{dx}[9]" /></>,
      options: [
        { id: 'wrong1', text: '9', isCorrect: false },
        { id: 'wrong2', text: '1', isCorrect: false },
        { id: 'correct', text: '0', isCorrect: true },
        { id: 'wrong3', text: '9x', isCorrect: false }
      ],
      correctAnswer: '0',
      explanation: <>Constant Rule: <InlineMath math="\frac{d}{dx}[c] = 0" />. The derivative of any constant is 0, so <InlineMath math="\frac{d}{dx}[9] = 0" /></>,
      questionText: 'Apply Constant Rule to constant 9',
      nextStep: 'Combine results using Sum Rule'
    },
    {
      id: 'combine-results',
      question: <>Combine the results: <InlineMath math="f'(x) = 6x^5 + 2 + 0" /></>,
      options: [
        { id: 'wrong1', text: '6x^5 + 2 + 0', isCorrect: false },
        { id: 'correct', text: '6x^5 + 2', isCorrect: true },
        { id: 'wrong2', text: '6x^5', isCorrect: false },
        { id: 'wrong3', text: '8x^5', isCorrect: false }
      ],
      correctAnswer: '6x^5 + 2',
      explanation: <>Simplify by removing the zero: f\'(x) = 6x^5 + 2 + 0 = 6x^5 + 2</>,
      questionText: 'Simplify the derivative expression',
      nextStep: 'Substitute x = 3'
    },
    {
      id: 'substitute-x-value',
      question: <>Substitute x = 3 into f'(x) = 6x⁵ + 2</>,
      options: [
        { id: 'wrong1', text: "f'(3) = 6(3) + 2", isCorrect: false },
        { id: 'correct', text: "f'(3) = 6(3)^5 + 2", isCorrect: true },
        { id: 'wrong2', text: "f'(3) = 6(3)^6 + 2", isCorrect: false },
        { id: 'wrong3', text: "f'(3) = 6^3 + 2", isCorrect: false }
      ],
      correctAnswer: "f'(3) = 6(3)^5 + 2",
      explanation: <>Replace every x with 3: f\'(3) = 6(3)^5 + 2</>,
      questionText: 'Substitute x = 3 into the derivative'
    }
  ]

  const stepConfig1: StepConfig = {
    steps: example1Steps,
    title: "Basic Example",
    conceptId: "power-rule-basic",
    conceptName: "Power Rule Application",
    conceptDescription: "Finding slope using Power Rule",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the slope of f(x) = x⁴ when x = 1:",
    },
    completionMessage: <>Complete! The slope at x = 1 is 4.</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect Power Rule application!")
      }
    }
  }

  const stepConfig2: StepConfig = {
    steps: example2Steps,
    title: "Advanced Example",
    conceptId: "applying-differentiation-rules",
    conceptName: "Applying Differentiation Rules",
    conceptDescription: "Using multiple rules to differentiate polynomial functions",
    showProgress: true,
    mathRendering: 'latex',
    problemStatement: {
      text: "Find the slope of f(x) = x⁶ + 2x + 9 when x = 3:",
    },
    completionMessage: <>Complete! You've successfully applied all four differentiation rules to find the slope of 1460.</>,
    onComplete: (total, correct) => {
      if (correct === total) {
        console.log("Perfect application of differentiation rules!")
      }
    }
  }

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Basic Example */}
        <div className="space-y-6">
          {/* Basic Example Step-by-Step */}
          <StepByStepRenderer 
            config={stepConfig1}
            onInteractionComplete={handleInteractionComplete}
          />
        </div>

        {/* Right Column - Advanced Example */}
        <div className="space-y-6">
          {/* Advanced Example Step-by-Step */}
          <StepByStepRenderer 
            config={stepConfig2}
            onInteractionComplete={handleInteractionComplete}
          />
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="power-rule-examples"
      slideTitle="Applying the Rules"
      moduleId="ap-calculus-bc-differentiation"
      submoduleId="differentiation-rules"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}