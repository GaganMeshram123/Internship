import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function ArithmeticSlide4() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false])
  const [score, setScore] = useState(0)
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  
  const questions = [
    {
      id: 'explicit-formula-from-terms',
      question: 'Find the formula for the nth term of an arithmetic sequence if the 1st term is 6 and the 6th term is 61.',
      options: [
        'aₙ = 11n + 5',
        'aₙ = 11n - 5',
        'aₙ = 10n - 4',
        'aₙ = 7n - 1',
        'aₙ = 12n - 6'
      ],
      correctAnswer: 'aₙ = 11n - 5',
      explanation: 'Given a₁ = 6 and a₆ = 61. First find d: since a₆ = a₁ + 5d, we have 61 = 6 + 5d, so 5d = 55, thus d = 11. The formula is aₙ = a₁ + (n-1)d = 6 + (n-1)(11) = 6 + 11n - 11 = 11n - 5.'
    },
    {
      id: 'find-specific-term',
      question: 'Find the 30th term of the following arithmetic sequence: 7, 5, 3, 1, ...',
      options: [
        '-53',
        '-51',
        '65',
        '-65',
        '51'
      ],
      correctAnswer: '-51',
      explanation: 'First find the pattern: a₁ = 7, d = 5 - 7 = -2. Using aₙ = a₁ + (n-1)d: a₃₀ = 7 + (30-1)(-2) = 7 + 29(-2) = 7 - 58 = -51.'
    },
    {
      id: 'find-term-from-two-given',
      question: 'The third and tenth terms of an arithmetic sequence are -8.3 and -7.6, respectively. What is the common difference d?',
      options: [
        '0.1',
        '0.2',
        '-0.1',
        '0.7',
        '-0.7'
      ],
      correctAnswer: '0.1',
      explanation: 'Using the formula d = (aₙ - aₘ)/(n - m), where a₁₀ = -7.6, a₃ = -8.3: d = (-7.6 - (-8.3))/(10 - 3) = (-7.6 + 8.3)/7 = 0.7/7 = 0.1.'
    }
  ]

  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  const handleQuizAnswer = (answerText: string) => {
    setSelectedAnswer(answerText)
    setShowFeedback(true)
    
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = answerText === currentQuestion.correctAnswer
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    handleInteractionComplete({
      interactionId: `arithmetic-explicit-formulas-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'arithmetic-explicit-formulas',
      conceptName: 'Explicit Formulas and Derivation',
      conceptDescription: `Testing: ${currentQuestion.id === 'nth-term-from-arbitrary' ? 'Finding formulas from any two terms' : currentQuestion.id === 'parameter-optimization' ? 'Engineering sequences to meet constraints' : 'Understanding polynomial constraints in arithmetic sequences'}`,
      question: {
        type: 'mcq' as 'mcq',
        question: currentQuestion.question,
        options: currentQuestion.options
      }
    })
  }

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
        
        {/* Left Column - Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              The <strong>nth term formula</strong> of an arithmetic sequence can be derived from various starting information: first term and common difference, two arbitrary terms, or other constraints.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The explicit formula <InlineMath math="a_n = a_1 + (n-1)d" /> is the foundation, but we can manipulate it to solve for any unknown parameter.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Principle:</strong> Two points determine a unique arithmetic sequence.
              </p>
            </div>
          </div>

          {/* Standard Derivation */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Standard Formula Derivation</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_1" /> and <InlineMath math="d" /></p>
              <p className="text-lg">Derive: Formula for <InlineMath math="a_n" /></p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-medium mb-2">Pattern observation:</p>
                <div className="space-y-1">
                  <p><InlineMath math="a_1 = a_1 + 0 \cdot d" /></p>
                  <p><InlineMath math="a_2 = a_1 + 1 \cdot d" /></p>
                  <p><InlineMath math="a_3 = a_1 + 2 \cdot d" /></p>
                  <p><InlineMath math="a_4 = a_1 + 3 \cdot d" /></p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    Pattern: <InlineMath math="a_n = a_1 + (n-1)d" />
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-medium mb-2">Alternative form:</p>
                <p><InlineMath math="a_n = a_1 + (n-1)d = a_1 + nd - d" /></p>
                <p><InlineMath math="a_n = nd + (a_1 - d)" /></p>
                <p className="text-blue-600 dark:text-blue-400">Linear function of n!</p>
              </div>
            </div>
          </div>

          {/* From Two Terms */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Finding Formula from Two Terms</h3>
            
            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
              <p className="text-lg font-semibold mb-2">Method:</p>
              <div className="space-y-2">
                <p>1. Find <InlineMath math="d = \frac{a_m - a_k}{m - k}" /></p>
                <p>2. Find <InlineMath math="a_1 = a_k - (k-1)d" /></p>
                <p>3. Write <InlineMath math="a_n = a_1 + (n-1)d" /></p>
              </div>
            </div>
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-lg font-medium">Why this works:</p>
              <p>Two points determine a unique line, and arithmetic sequences are linear functions of position!</p>
            </div>
          </div>
        </div>

        {/* Right Column - Examples and Practice */}
        <div className="space-y-6">
          
          {/* Complex Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Two-Term Method</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_5 = 18" /> and <InlineMath math="a_9 = 34" /></p>
              <p className="text-lg">Find: Formula for <InlineMath math="a_n" /> and calculate <InlineMath math="a_{20}" /></p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Find common difference</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="d = \frac{a_9 - a_5}{9 - 5} = \frac{34 - 18}{4} = \frac{16}{4} = 4" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Find first term</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_5 = a_1 + 4d" /></p>
                  <p><InlineMath math="18 = a_1 + 4(4)" /></p>
                  <p><InlineMath math="18 = a_1 + 16" /></p>
                  <p><InlineMath math="a_1 = 2" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 3: Write explicit formula</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_n = 2 + (n-1)(4)" /></p>
                  <p><InlineMath math="a_n = 2 + 4n - 4" /></p>
                  <p><InlineMath math="a_n = 4n - 2" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 4: Calculate <InlineMath math="a_{20}" /></p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_{20} = 4(20) - 2 = 80 - 2 = 78" /></p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Formula: <InlineMath math="a_n = 4n - 2" />, and <InlineMath math="a_{20} = 78" />
                </p>
              </div>
            </div>
          </div>

          {/* Special Cases */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Special Formula Cases</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Case 1: Given <InlineMath math="a_k" /> and <InlineMath math="d" /></p>
                <p><InlineMath math="a_n = a_k + (n-k)d" /></p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Direct jump from position k to n</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Case 2: Given three terms</p>
                <p>Overdetermined - verify arithmetic property</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Check: <InlineMath math="a_2 - a_1 = a_3 - a_2" /></p>
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
                      <div className="font-semibold text-black dark:text-white mb-2">
                        {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Excellent derivation!' : 'Let\'s work through the derivation.'}
                      </div>
                      {selectedAnswer !== questions[currentQuestionIndex].correctAnswer && (
                        <div className="text-lg text-black dark:text-white mb-2">
                          The correct answer is: {questions[currentQuestionIndex].correctAnswer}
                        </div>
                      )}
                      <div className="text-lg text-black dark:text-white mb-4">
                        {questions[currentQuestionIndex].explanation}
                      </div>
                      
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
      slideId="arithmetic-nth-term"
      slideTitle="Finding the Nth Term Formula"
      moduleId="sequences"
      submoduleId="arithmetic-sequences"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}