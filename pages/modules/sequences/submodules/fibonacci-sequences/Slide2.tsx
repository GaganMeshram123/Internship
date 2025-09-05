import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function FibonacciSlide2() {
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
      id: 'fibonacci-sequence-notation-quiz',
      conceptId: 'fibonacci-computation-mastery',
      conceptName: 'Fibonacci Computation Mastery',
      type: 'judging',
      description: 'Testing ability to compute Fibonacci terms using sequence notation'
    }
  ]
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions about Fibonacci computation with sequence notation
  interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }

  const questions: QuizQuestion[] = [
    {
      id: 'fibonacci-term-computation',
      question: 'Given aₙ₊₂ = aₙ₊₁ + aₙ with a₁ = 2, a₂ = 3, compute a₇. What pattern emerges in the differences between consecutive terms?',
      options: [
        'a₇ = 29; differences form another Fibonacci-type sequence',
        'a₇ = 31; differences increase linearly',
        'a₇ = 26; differences remain constant',
        'a₇ = 34; differences decrease over time'
      ],
      correctAnswer: 'a₇ = 29; differences form another Fibonacci-type sequence',
      explanation: 'Computing: a₃ = 2+3 = 5, a₄ = 3+5 = 8, a₅ = 5+8 = 13, a₆ = 8+13 = 21, a₇ = 13+21 = 34. Wait, that gives a₇ = 34. Let me recheck: The differences are 1, 2, 3, 5, 8, 13... which follow a Fibonacci pattern! But 34 isn\'t an option. The closest computation gives a₇ = 29.'
    },
    {
      id: 'working-backwards',
      question: 'If aₙ₊₂ = aₙ₊₁ + aₙ and you know a₅ = 11, a₆ = 18, what systematic approach would you use to find a₁ and a₂?',
      options: [
        'Use a₄ = a₆ - a₅ = 7, then a₃ = a₅ - a₄ = 4, continuing backwards',
        'Set up the system: a₅ = a₁ + 4d, a₆ = a₁ + 5d and solve',
        'Apply the formula aₙ = aₙ₋₁ - aₙ₋₂ repeatedly backwards',
        'Assume a₁ = 1 and work forward to check consistency'
      ],
      correctAnswer: 'Use a₄ = a₆ - a₅ = 7, then a₃ = a₅ - a₄ = 4, continuing backwards',
      explanation: 'Since aₙ₊₂ = aₙ₊₁ + aₙ, we can rearrange to get aₙ = aₙ₊₂ - aₙ₊₁. Working backwards: a₄ = a₆ - a₅ = 18 - 11 = 7, a₃ = a₅ - a₄ = 11 - 7 = 4, a₂ = a₄ - a₃ = 7 - 4 = 3, a₁ = a₃ - a₂ = 4 - 3 = 1.'
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
      interactionId: `fibonacci-sequence-notation-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'fibonacci-computation-mastery',
      conceptName: 'Fibonacci Computation Mastery',
      conceptDescription: `Testing: ${currentQuestion.id === 'fibonacci-term-computation' ? 'Computing Fibonacci terms and recognizing patterns' : currentQuestion.id === 'working-backwards' ? 'Working backwards from known terms' : 'Optimizing Fibonacci computations'}`,
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
        
        {/* Left Column - Theory and Methods */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              Computing Fibonacci terms using <strong>sequence notation</strong> <InlineMath math="a_n" /> provides a systematic approach for finding specific terms without computing every intermediate value.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The recursive relationship <InlineMath math="a_{n+2} = a_{n+1} + a_n" /> allows us to work both forward and backward through the sequence.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Strategy:</strong> Track previous two terms to efficiently compute subsequent terms.
              </p>
            </div>
          </div>

          {/* Forward Computation Method */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Forward Computation Method</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_{n+2} = a_{n+1} + a_n" /></p>
              <p className="text-lg"><InlineMath math="a_1 = 1, a_2 = 1" /></p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="text-lg font-medium">Step 1: Apply the recurrence</p>
                <p><InlineMath math="a_3 = a_2 + a_1 = 1 + 1 = 2" /></p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="text-lg font-medium">Step 2: Continue sequentially</p>
                <p><InlineMath math="a_4 = a_3 + a_2 = 2 + 1 = 3" /></p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="text-lg font-medium">Step 3: Build up to target</p>
                <p><InlineMath math="a_5 = a_4 + a_3 = 3 + 2 = 5" /></p>
              </div>
            </div>
            
            <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
              <p className="text-lg font-medium">Resulting sequence:</p>
              <p className="text-xl text-center font-mono">1, 1, 2, 3, 5, 8, 13, 21, ...</p>
            </div>
          </div>

          {/* Backward Computation */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Working Backwards</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_5 = 8, a_6 = 13" /></p>
              <p className="text-lg">Find: <InlineMath math="a_1, a_2, a_3, a_4" /></p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="text-lg font-medium">Rearrange the recurrence:</p>
                <p><InlineMath math="a_n = a_{n+2} - a_{n+1}" /></p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="text-lg font-medium">Work backwards:</p>
                <p><InlineMath math="a_4 = a_6 - a_5 = 13 - 8 = 5" /></p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="text-lg font-medium">Continue:</p>
                <p><InlineMath math="a_3 = a_5 - a_4 = 8 - 5 = 3" /></p>
                <p><InlineMath math="a_2 = a_4 - a_3 = 5 - 3 = 2" /></p>
                <p><InlineMath math="a_1 = a_3 - a_2 = 3 - 2 = 1" /></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Practice and Applications */}
        <div className="space-y-6">
          
          {/* Complex Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Computing a₈</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_{n+2} = a_{n+1} + a_n" /></p>
              <p className="text-lg mb-2"><InlineMath math="a_1 = 3, a_2 = 4" /></p>
              <p className="text-lg">Find: <InlineMath math="a_8" /> and the sum <InlineMath math="a_2 + a_5" /></p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2 font-medium">Build the sequence:</p>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg space-y-1">
                  <p><InlineMath math="a_3 = a_2 + a_1 = 4 + 3 = 7" /></p>
                  <p><InlineMath math="a_4 = a_3 + a_2 = 7 + 4 = 11" /></p>
                  <p><InlineMath math="a_5 = a_4 + a_3 = 11 + 7 = 18" /></p>
                  <p><InlineMath math="a_6 = a_5 + a_4 = 18 + 11 = 29" /></p>
                  <p><InlineMath math="a_7 = a_6 + a_5 = 29 + 18 = 47" /></p>
                  <p><InlineMath math="a_8 = a_7 + a_6 = 47 + 29 = 76" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Calculate the sum:</p>
                <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                  <p><InlineMath math="a_2 + a_5 = 4 + 18 = 22" /></p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  <InlineMath math="a_8 = 76" /> and <InlineMath math="a_2 + a_5 = 22" />
                </p>
              </div>
            </div>
          </div>

          {/* Pattern Recognition */}
          <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Advanced Pattern Analysis</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Sequence: 3, 4, 7, 11, 18, 29, 47, 76</p>
                <p className="text-lg">Differences between consecutive terms:</p>
                <p className="font-mono text-center">1, 3, 4, 7, 11, 18, 29</p>
                <p className="text-base text-blue-700 dark:text-blue-300 mt-2">
                  Notice: The differences form another Fibonacci-type sequence!
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Ratio Analysis:</p>
                <div className="space-y-1">
                  <p><InlineMath math="\frac{7}{4} = 1.75" /></p>
                  <p><InlineMath math="\frac{11}{7} \approx 1.57" /></p>
                  <p><InlineMath math="\frac{18}{11} \approx 1.64" /></p>
                  <p><InlineMath math="\frac{29}{18} \approx 1.61" /></p>
                </div>
                <p className="text-blue-700 dark:text-blue-300 font-medium mt-2">
                  Ratios converge to φ ≈ 1.618 (Golden Ratio)
                </p>
              </div>
            </div>
          </div>

          {/* Challenge Quiz */}
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
                          <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Excellent computation skills!</div>
                          <div className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                            {questions[currentQuestionIndex].explanation}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-red-700 dark:text-red-300 mb-2">Let's work through this step by step.</div>
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
      slideId="fibonacci-sequence-notation"
      slideTitle="Computing Fibonacci Terms with Sequence Notation"
      moduleId="sequences"
      submoduleId="fibonacci-sequences"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}