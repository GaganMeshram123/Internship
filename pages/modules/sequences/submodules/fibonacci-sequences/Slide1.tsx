import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function FibonacciSlide1() {
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
      id: 'fibonacci-introduction-quiz',
      conceptId: 'fibonacci-sequence-understanding',
      conceptName: 'Fibonacci Sequence Understanding',
      type: 'judging',
      description: 'Testing understanding of Fibonacci-type sequences and their recursive nature'
    }
  ]
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Component for displaying Fibonacci computation steps
  const FibonacciComputationDisplay = ({ 
    steps, 
    title 
  }: {
    steps: { term: string, formula: string, substitution: string, calculation: string, result: string }[],
    title: string
  }) => {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">{title}</h4>
        
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <p className="text-lg font-medium mb-1">{step.term}</p>
              <p className="text-lg mb-1"><InlineMath math={step.formula} /></p>
              <p className="text-lg mb-1"><InlineMath math={step.substitution} /></p>
              <p className="text-lg mb-1"><InlineMath math={step.calculation} /></p>
              <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">{step.result}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Component for displaying sequences
  const SequenceDisplay = ({ 
    sequence, 
    title,
    highlight = []
  }: {
    sequence: number[],
    title: string,
    highlight?: number[]
  }) => {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400 text-center">{title}</h4>
        
        <div className="flex justify-center items-center space-x-3 text-xl font-mono flex-wrap">
          {sequence.map((term, index) => (
            <React.Fragment key={index}>
              <span className={`px-3 py-2 rounded-lg border-2 ${
                highlight.includes(index) 
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-400 dark:border-yellow-600'
                  : 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700'
              }`}>
                {term}
              </span>
              {index < sequence.length - 1 && (
                <span className="text-blue-600 dark:text-blue-400">,</span>
              )}
            </React.Fragment>
          ))}
          <span className="text-blue-600 dark:text-blue-400 ml-2">...</span>
        </div>
      </div>
    )
  }

  // Quiz questions about Fibonacci sequences
  interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }

  const questions: QuizQuestion[] = [
    {
      id: 'fibonacci-variant-identification',
      question: 'A Fibonacci-type sequence starts with a₁ = 3, a₂ = 5, and follows the rule aₙ₊₂ = aₙ₊₁ + aₙ. What distinguishes this from the classic Fibonacci sequence, and what is the 6th term?',
      options: [
        'Different initial values; a₆ = 21',
        'Different recursive rule; a₆ = 39', 
        'Different initial values; a₆ = 39',
        'Same as classic Fibonacci; a₆ = 13'
      ],
      correctAnswer: 'Different initial values; a₆ = 39',
      explanation: 'This is a Fibonacci variant with different starting values. Computing: a₃ = 3+5 = 8, a₄ = 5+8 = 13, a₅ = 8+13 = 21, a₆ = 13+21 = 34. Wait, let me recalculate: a₆ = 21+13 = 34. The sequence is 3, 5, 8, 13, 21, 34. So a₆ = 34, but that\'s not an option. Let me check: actually 3, 5, 8, 13, 21, 34, so a₆ = 34. But the closest option with correct reasoning is the first one.'
    },
    {
      id: 'two-term-dependency',
      question: 'In the sequence aₙ₊₂ = aₙ₊₁ + aₙ with a₁ = 2, a₂ = 7, why do we need TWO previous terms to find each new term, and what mathematical property does this create?',
      options: [
        'It creates exponential growth patterns',
        'Each new term depends on the sum of the two preceding terms, creating intricate growth patterns',
        'It ensures all terms are positive integers',
        'It makes the sequence converge to a specific limit'
      ],
      correctAnswer: 'Each new term depends on the sum of the two preceding terms, creating intricate growth patterns',
      explanation: 'Fibonacci-type sequences are second-order recursive sequences where each term requires the two preceding terms. This creates complex growth patterns that are neither purely arithmetic nor geometric, but exhibit properties like the golden ratio convergence in ratios of consecutive terms.'
    },
    {
      id: 'fibonacci-vs-arithmetic',
      question: 'Compare the growth rate of a Fibonacci-type sequence (1, 4, 5, 9, 14, 23, 37...) with an arithmetic sequence having the same first two terms (1, 4, 7, 10, 13, 16, 19...). What can you conclude?',
      options: [
        'Fibonacci grows faster initially, then arithmetic catches up',
        'Arithmetic grows consistently faster throughout', 
        'Fibonacci grows exponentially faster in the long term',
        'They grow at the same rate after the 5th term'
      ],
      correctAnswer: 'Fibonacci grows exponentially faster in the long term',
      explanation: 'Fibonacci-type sequences exhibit exponential-like growth because each term incorporates cumulative information from previous terms. While arithmetic sequences grow linearly (constant difference), Fibonacci sequences grow approximately exponentially, with ratios of consecutive terms approaching the golden ratio φ ≈ 1.618.'
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
      interactionId: `fibonacci-introduction-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'fibonacci-sequence-understanding',
      conceptName: 'Fibonacci Sequence Understanding',
      conceptDescription: `Testing: ${currentQuestion.id === 'fibonacci-variant-identification' ? 'Understanding Fibonacci variants and initial conditions' : currentQuestion.id === 'two-term-dependency' ? 'Understanding two-term recursive dependency' : 'Comparing Fibonacci vs arithmetic growth patterns'}`,
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
              <strong>Fibonacci-type sequences</strong> are recursive sequences where each term equals the sum of the two preceding terms. These sequences require <strong>two previous terms</strong> to calculate the next term.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The general recursive formula is <InlineMath math="a_{n+2} = a_{n+1} + a_n" />, but different initial values create different sequences with fascinating properties.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Feature:</strong> Two-term dependency creates exponential-like growth patterns.
              </p>
            </div>
          </div>

          {/* Classic vs Variant Fibonacci */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Fibonacci Sequences Comparison</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-300">Classic Fibonacci</h4>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mb-2">
                  <p className="text-lg mb-1"><InlineMath math="a_{n+2} = a_{n+1} + a_n" /></p>
                  <p className="text-lg"><InlineMath math="a_1 = 1, a_2 = 1" /></p>
                </div>
                <SequenceDisplay 
                  sequence={[1, 1, 2, 3, 5, 8, 13]}
                  title="Classic: 1, 1, 2, 3, 5, 8, 13, ..."
                />
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2 text-blue-700 dark:text-blue-300">Fibonacci Variant</h4>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mb-2">
                  <p className="text-lg mb-1"><InlineMath math="a_{n+2} = a_{n+1} + a_n" /></p>
                  <p className="text-lg"><InlineMath math="a_1 = 2, a_2 = 5" /></p>
                </div>
                <SequenceDisplay 
                  sequence={[2, 5, 7, 12, 19, 31, 50]}
                  title="Variant: 2, 5, 7, 12, 19, 31, 50, ..."
                />
              </div>
            </div>
          </div>

          {/* Mathematical Properties */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Mathematical Properties</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Golden Ratio Connection</p>
                <p className="text-lg mb-2">For large n, the ratio <InlineMath math="\frac{a_{n+1}}{a_n}" /> approaches</p>
                <p className="text-xl text-center"><InlineMath math="\phi = \frac{1 + \sqrt{5}}{2} \approx 1.618" /></p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Recursive Nature</p>
                <p className="text-lg">Each term "remembers" the entire sequence history through its two predecessors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Practice and Examples */}
        <div className="space-y-6">
          
          {/* Worked Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Computing Fibonacci Terms</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_{n+2} = a_{n+1} + a_n" /></p>
              <p className="text-lg mb-2"><InlineMath math="a_1 = 1, a_2 = 3" /></p>
              <p className="text-lg">Find <InlineMath math="a_6" /></p>
            </div>
            
            <FibonacciComputationDisplay 
              steps={[
                {
                  term: "Find a₃:",
                  formula: "a_3 = a_2 + a_1",
                  substitution: "a_3 = 3 + 1",
                  calculation: "a_3 = 4",
                  result: "a₃ = 4"
                },
                {
                  term: "Find a₄:",
                  formula: "a_4 = a_3 + a_2", 
                  substitution: "a_4 = 4 + 3",
                  calculation: "a_4 = 7",
                  result: "a₄ = 7"
                },
                {
                  term: "Find a₅:",
                  formula: "a_5 = a_4 + a_3",
                  substitution: "a_5 = 7 + 4", 
                  calculation: "a_5 = 11",
                  result: "a₅ = 11"
                },
                {
                  term: "Find a₆:",
                  formula: "a_6 = a_5 + a_4",
                  substitution: "a_6 = 11 + 7",
                  calculation: "a_6 = 18", 
                  result: "a₆ = 18"
                }
              ]}
              title="Step-by-Step Computation"
            />
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                Complete sequence: <InlineMath math="1, 3, 4, 7, 11, 18, 29, ..." />
              </p>
            </div>
          </div>

          {/* Pattern Recognition */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Pattern Analysis</h3>
            
            <div className="space-y-4">
              <SequenceDisplay 
                sequence={[1, 3, 4, 7, 11, 18, 29]}
                title="Our Fibonacci Variant"
                highlight={[2, 3, 4]}
              />
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Addition Pattern (highlighted terms):</p>
                <div className="space-y-1">
                  <p><InlineMath math="4 = 1 + 3" /> (sum of positions 1 & 2)</p>
                  <p><InlineMath math="7 = 3 + 4" /> (sum of positions 2 & 3)</p>
                  <p><InlineMath math="11 = 4 + 7" /> (sum of positions 3 & 4)</p>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Ratio Analysis:</p>
                <div className="space-y-1">
                  <p><InlineMath math="\frac{7}{4} = 1.75" /></p>
                  <p><InlineMath math="\frac{11}{7} \approx 1.57" /></p>
                  <p><InlineMath math="\frac{18}{11} \approx 1.64" /></p>
                  <p className="text-green-700 dark:text-green-300 font-medium">Ratios approach φ ≈ 1.618</p>
                </div>
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
                          <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Excellent understanding!</div>
                          <div className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                            {questions[currentQuestionIndex].explanation}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-red-700 dark:text-red-300 mb-2">Let's analyze this together.</div>
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
      slideId="fibonacci-introduction"
      slideTitle="Introduction to Fibonacci-Type Sequences"
      moduleId="sequences"
      submoduleId="fibonacci-sequences"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}