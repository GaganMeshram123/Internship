import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function FibonacciSlide3() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false])
  const [score, setScore] = useState(0)
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  
  // Quiz questions about Fibonacci function notation
  interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }

  const questions: QuizQuestion[] = [
    {
      id: 'notation-conversion',
      question: 'Convert the sequence notation aₙ = 5aₙ₋₁ - 6aₙ₋₂ with a₁ = 2, a₂ = 7 to function notation and find f(4).',
      options: [
        'f(n) = 5f(n-1) - 6f(n-2), f(1) = 2, f(2) = 7; f(4) = 83',
        'f(n+2) = 5f(n+1) - 6f(n), f(1) = 2, f(2) = 7; f(4) = 93',
        'f(n) = 5f(n-1) - 6f(n-2), f(1) = 2, f(2) = 7; f(4) = 73',
        'f(n+2) = 5f(n+1) - 6f(n), f(1) = 2, f(2) = 7; f(4) = 83'
      ],
      correctAnswer: 'f(n) = 5f(n-1) - 6f(n-2), f(1) = 2, f(2) = 7; f(4) = 73',
      explanation: 'Converting to function notation: f(n) = 5f(n-1) - 6f(n-2) with f(1) = 2, f(2) = 7. Computing: f(3) = 5f(2) - 6f(1) = 5(7) - 6(2) = 35 - 12 = 23. Then f(4) = 5f(3) - 6f(2) = 5(23) - 6(7) = 115 - 42 = 73. Both notations f(n) = 5f(n-1) - 6f(n-2) and f(n+2) = 5f(n+1) - 6f(n) are equivalent, just shifted indices.'
    }
  ]

  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

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
      interactionId: `fibonacci-function-notation-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'fibonacci-function-notation',
      conceptName: 'Fibonacci Function Notation Analysis',
      conceptDescription: `Testing: ${currentQuestion.id === 'fibonacci-function-analysis' ? 'Understanding golden ratio convergence in Fibonacci sequences' : currentQuestion.id === 'hard-binet-formula' ? 'Advanced Binet formula applications and coefficient calculations' : 'Matrix representation and eigenvalue properties of Fibonacci sequences'}`,
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
        
        {/* Left Column - Function Notation Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              Fibonacci sequences expressed in <strong>function notation</strong> use <BlockMath math="f(n+2) = f(n+1) + f(n)" /> to represent the recursive relationship, providing a familiar functional framework for analysis.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              This notation emphasizes the <strong>functional dependence</strong> between terms and integrates naturally with calculus and advanced mathematical analysis.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Advantage:</strong> Function notation bridges discrete sequences with continuous mathematical analysis.
              </p>
            </div>
          </div>

          {/* Function vs Sequence Notation Comparison */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Notation Comparison</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Function Notation</p>
                  <div className="space-y-1">
                    <p><InlineMath math="f(n+2) = f(n+1) + f(n)" /></p>
                    <p><InlineMath math="f(1) = 2, f(2) = 5" /></p>
                    <p>Domain: <InlineMath math="n \in \mathbb{N}, n \geq 1" /></p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <span className="text-2xl text-blue-600 dark:text-blue-400">↕️</span>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Sequence Notation</p>
                  <div className="space-y-1">
                    <p><InlineMath math="a_{n+2} = a_{n+1} + a_n" /></p>
                    <p><InlineMath math="a_1 = 2, a_2 = 5" /></p>
                    <p>Index: <InlineMath math="n \geq 1" /></p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-center">
                <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                  Both generate: <InlineMath math="2, 5, 7, 12, 19, 31, 50, ..." />
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Practice and Applications */}
        <div className="space-y-6">
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
      slideId="fibonacci-function-notation"
      slideTitle="Fibonacci Sequences in Function Notation"
      moduleId="sequences"
      submoduleId="fibonacci-sequences"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}