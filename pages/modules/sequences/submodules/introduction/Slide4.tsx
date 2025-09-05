import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function IntroductionSlide4() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false])
  const [score, setScore] = useState(0)
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  
  // Define interactions for this slide
  const slideInteractions: Interaction[] = [
    {
      id: 'recursive-sequences-quiz',
      conceptId: 'recursive-sequence-mastery',
      conceptName: 'Recursive Sequence Mastery',
      type: 'judging',
      description: 'Testing understanding of recursive sequence definitions and term computation'
    }
  ]
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Component for displaying recursive formulas
  const RecursiveFormulaDisplay = ({ 
    formula, 
    initialCondition,
    title 
  }: {
    formula: string,
    initialCondition: string,
    title: string
  }) => {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400 text-center">{title}</h4>
        
        <div className="text-center space-y-2">
          <div className="text-lg">
            <InlineMath math={formula} />
          </div>
          <div className="text-lg">
            <InlineMath math={initialCondition} />
          </div>
        </div>
      </div>
    )
  }

  // Component for displaying step-by-step calculations
  const StepByStepCalculation = ({ 
    steps, 
    title 
  }: {
    steps: { step: string, calculation: string, result: string }[],
    title: string
  }) => {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">{title}</h4>
        
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <p className="text-lg font-medium mb-1">{step.step}</p>
              <p className="text-lg mb-1"><InlineMath math={step.calculation} /></p>
              <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">{step.result}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Quiz questions about recursive sequences
  interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }

  const questions: QuizQuestion[] = [
    {
      id: 'recursive-pattern-analysis',
      question: 'Given the recursive sequence aₙ₊₁ = 3aₙ - 5 with a₁ = 4, analyze the long-term behavior. What happens to the sequence as n increases?',
      options: [
        'The terms approach 2.5 from above',
        'The terms approach 2.5 from below',
        'The terms grow without bound',
        'The terms alternate around 2.5'
      ],
      correctAnswer: 'The terms grow without bound',
      explanation: 'Computing: a₁ = 4, a₂ = 3(4) - 5 = 7, a₃ = 3(7) - 5 = 16, a₄ = 3(16) - 5 = 43. Since the multiplier |3| > 1, the sequence diverges. The fixed point L = 3L - 5 gives L = 2.5, but starting from a₁ = 4 > 2.5 with multiplier > 1 causes exponential growth away from the fixed point.'
    },
    {
      id: 'complex-recursion',
      question: 'For the recursive sequence aₙ₊₁ = (2aₙ + 7)/(aₙ + 3) with a₁ = 1, what is the value of a₄?',
      options: [
        '2.75',
        '3.2',
        '2.6',
        '3.0'
      ],
      correctAnswer: '2.6',
      explanation: 'Step by step: a₁ = 1, a₂ = (2(1) + 7)/(1 + 3) = 9/4 = 2.25, a₃ = (2(2.25) + 7)/(2.25 + 3) = 11.5/5.25 ≈ 2.19, a₄ = (2(2.19) + 7)/(2.19 + 3) ≈ 11.38/5.19 ≈ 2.19. More precisely: a₂ = 9/4, a₃ = 46/21, a₄ = (92/21 + 147/21)/(109/21) = 239/109 ≈ 2.19.'
    },
    {
      id: 'hard-convergence-proof',
      question: 'CHALLENGE: For the recursion aₙ₊₁ = √(6 + aₙ) with a₁ = 2, prove that this sequence converges and find the exact limit L.',
      options: [
        'Converges to L = 3 by solving L = √(6 + L)',
        'Converges to L = 2√2 by monotone convergence theorem',
        'Diverges because √(6 + aₙ) > aₙ for all n',
        'Converges to L = √6 by iterative approximation'
      ],
      correctAnswer: 'Converges to L = 3 by solving L = √(6 + L)',
      explanation: 'First, note aₙ₊₁ = √(6 + aₙ) > 0 for all n. Since a₁ = 2, we have a₂ = √8 ≈ 2.83, a₃ = √(6 + 2.83) ≈ 2.97. The sequence is increasing and bounded above by 3 (since if aₙ < 3, then aₙ₊₁ = √(6 + aₙ) < √9 = 3). By monotone convergence theorem, limit L exists. Setting L = √(6 + L), we get L² = 6 + L, so L² - L - 6 = 0, giving (L-3)(L+2) = 0. Since L > 0, we have L = 3.'
    }
  ]

  // Handle quiz answer
  const handleQuizAnswer = (answerText: string) => {
    setSelectedAnswer(answerText)
    setShowFeedback(true)
    
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = answerText === currentQuestion.correctAnswer
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }
    
    handleInteractionComplete({
      interactionId: `recursive-sequences-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'recursive-sequence-mastery',
      conceptName: 'Recursive Sequence Mastery',
      conceptDescription: `Testing: ${currentQuestion.id === 'recursive-pattern-analysis' ? 'Understanding long-term behavior of recursive sequences' : currentQuestion.id === 'complex-recursion' ? 'Computing terms in complex recursive sequences' : 'Constructing recursive formulas from patterns'}`,
      question: {
        type: 'mcq' as 'mcq',
        question: currentQuestion.question,
        options: currentQuestion.options
      }
    })
  }

  // Move to next question
  const handleNextQuestion = () => {
    const newAnsweredState = [...questionsAnswered]
    newAnsweredState[currentQuestionIndex] = true
    setQuestionsAnswered(newAnsweredState)
    
    setSelectedAnswer('')
    setShowFeedback(false)
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setIsQuizComplete(true)
    }
  }

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory and Concepts */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              Some sequences are defined <strong>recursively</strong>, meaning each term is calculated using previous term(s) rather than directly from the position number.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              A recursive definition consists of two parts: a <strong>recurrence relation</strong> that shows how to get the next term, and <strong>initial condition(s)</strong> that provide starting values.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Insight:</strong> Recursive sequences build on their own history to create new terms.
              </p>
            </div>
          </div>

          {/* Basic Recursive Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Basic Recursive Sequence</h3>
            
            <RecursiveFormulaDisplay 
              formula="a_{n+1} = a_n + 4"
              initialCondition="a_1 = 7"
              title="Recurrence Relation + Initial Condition"
            />
            
            <div className="mt-4">
              <StepByStepCalculation 
                steps={[
                  {
                    step: "Find a₂:",
                    calculation: "a_2 = a_1 + 4 = 7 + 4",
                    result: "a₂ = 11"
                  },
                  {
                    step: "Find a₃:",
                    calculation: "a_3 = a_2 + 4 = 11 + 4",
                    result: "a₃ = 15"
                  },
                  {
                    step: "Find a₄:",
                    calculation: "a_4 = a_3 + 4 = 15 + 4",
                    result: "a₄ = 19"
                  }
                ]}
                title="Step-by-Step Calculation"
              />
            </div>
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-lg">
                <strong>Resulting sequence:</strong> <InlineMath math="7, 11, 15, 19, 23, ..." />
              </p>
              <p className="text-lg mt-2 text-blue-700 dark:text-blue-300">
                Note: This creates an arithmetic sequence with common difference 4.
              </p>
            </div>
          </div>

          {/* Advanced Recursive Examples */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Advanced Recursive Patterns</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">Multiplicative Growth</h4>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                  <p className="text-lg"><InlineMath math="a_{n+1} = 2a_n - 3, \quad a_1 = 5" /></p>
                  <p className="text-base mt-2">Generates: <InlineMath math="5, 7, 11, 19, 35, ..." /></p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Position-Dependent Recursion</h4>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                  <p className="text-lg"><InlineMath math="a_{n+1} = a_n + n, \quad a_1 = 2" /></p>
                  <p className="text-base mt-2">Generates: <InlineMath math="2, 3, 5, 8, 12, ..." /></p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Rational Recursion</h4>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                  <p className="text-lg"><InlineMath math="a_{n+1} = \frac{a_n + 2}{a_n + 1}, \quad a_1 = 1" /></p>
                  <p className="text-base mt-2">Generates: <InlineMath math="1, \frac{3}{2}, \frac{7}{5}, \frac{17}{12}, ..." /></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Practice and Examples */}
        <div className="space-y-6">
          
          {/* Worked Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Complex Recursion</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_{n+1} = \frac{3a_n + 1}{2}, \quad a_1 = 2" /></p>
              <p className="text-lg">Find <InlineMath math="a_5" /> and analyze the pattern.</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2">
                  <strong>Step 1:</strong> Calculate <InlineMath math="a_2" />
                </p>
                <p className="text-lg pl-4">
                  <InlineMath math="a_2 = \frac{3(2) + 1}{2} = \frac{7}{2} = 3.5" />
                </p>
              </div>
              
              <div>
                <p className="text-lg mb-2">
                  <strong>Step 2:</strong> Calculate <InlineMath math="a_3" />
                </p>
                <p className="text-lg pl-4">
                  <InlineMath math="a_3 = \frac{3(3.5) + 1}{2} = \frac{11.5}{2} = 5.75" />
                </p>
              </div>
              
              <div>
                <p className="text-lg mb-2">
                  <strong>Step 3:</strong> Calculate <InlineMath math="a_4" />
                </p>
                <p className="text-lg pl-4">
                  <InlineMath math="a_4 = \frac{3(5.75) + 1}{2} = \frac{18.25}{2} = 9.125" />
                </p>
              </div>
              
              <div>
                <p className="text-lg mb-2">
                  <strong>Step 4:</strong> Calculate <InlineMath math="a_5" />
                </p>
                <p className="text-lg pl-4">
                  <InlineMath math="a_5 = \frac{3(9.125) + 1}{2} = \frac{28.375}{2} = 14.1875" />
                </p>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  <InlineMath math="a_5 = 14.1875" />
                </p>
                <p className="text-lg mt-2 text-slate-600 dark:text-slate-400">
                  Pattern: The sequence appears to be growing without bound.
                </p>
              </div>
            </div>
          </div>

          {/* Types of Recursive Sequences */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Types of Recursive Behavior</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">Convergent</p>
                <p className="text-lg mb-1"><InlineMath math="a_{n+1} = \frac{a_n + 6}{2}, \quad a_1 = 10" /></p>
                <p className="text-base">Terms approach a fixed limit: <InlineMath math="10, 8, 7, 6.5, 6.25, ... \to 6" /></p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-red-700 dark:text-red-300">Divergent</p>
                <p className="text-lg mb-1"><InlineMath math="a_{n+1} = 1.5a_n, \quad a_1 = 2" /></p>
                <p className="text-base">Terms grow without bound: <InlineMath math="2, 3, 4.5, 6.75, 10.125, ..." /></p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">Oscillating</p>
                <p className="text-lg mb-1"><InlineMath math="a_{n+1} = -0.8a_n + 3, \quad a_1 = 0" /></p>
                <p className="text-base">Terms alternate around a value: <InlineMath math="0, 3, 0.6, 2.52, 0.984, ..." /></p>
              </div>
            </div>
          </div>

          {/* Advanced Challenge Quiz */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Quick Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex space-x-2 mb-6">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500'
                      : questionsAnswered[index]
                      ? 'bg-green-500'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {!isQuizComplete ? (
              <>
                <p className="text-lg mb-6">
                  {questions[currentQuestionIndex].question}
                </p>
                
                <div className="space-y-2">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleQuizAnswer(option)}
                      disabled={showFeedback}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        selectedAnswer === option
                          ? showFeedback
                            ? option === questions[currentQuestionIndex].correctAnswer
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                            : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                          : 'border-slate-300 dark:border-slate-600 hover:border-blue-300'
                      } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                      whileHover={!showFeedback ? { scale: 1.02 } : {}}
                      whileTap={!showFeedback ? { scale: 0.98 } : {}}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mt-4 p-4 rounded-lg ${
                        selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                          : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                      }`}
                    >
                      {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? (
                        <div>
                          <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Excellent analysis!</div>
                          <div className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                            {questions[currentQuestionIndex].explanation}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-red-700 dark:text-red-300 mb-2">Let's work through this.</div>
                          <div className="text-lg text-red-600 dark:text-red-400 mb-2">
                            The correct answer is: {questions[currentQuestionIndex].correctAnswer}
                          </div>
                          <div className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                            {questions[currentQuestionIndex].explanation}
                          </div>
                        </div>
                      )}
                      
                      <motion.button
                        onClick={handleNextQuestion}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                  Quiz Complete!
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'Perfect score! 🌟' : 
                   score >= questions.length * 0.7 ? 'Great job! 👏' : 
                   'Keep practicing! 💪'}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="recursive-sequences"
      slideTitle="Recursive Sequences"
      moduleId="sequences"
      submoduleId="introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}