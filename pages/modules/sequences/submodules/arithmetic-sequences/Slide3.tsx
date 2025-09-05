import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function ArithmeticSlide3() {
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
      id: 'recursive-computation',
      question: 'If f(n+1) = f(n) + 11 with f(1) = -6, then f(3) =',
      options: [
        '-7',
        '-1',
        '5',
        '16',
        '10'
      ],
      correctAnswer: '16',
      explanation: 'Start with f(1) = -6. Then f(2) = f(1) + 11 = -6 + 11 = 5. Next f(3) = f(2) + 11 = 5 + 11 = 16.'
    },
    {
      id: 'recursive-formula-from-sequence',
      question: 'Consider the sequence: 2, 0, -2, -4, -6, ... The recursive formula is aₙ₊₁ = aₙ + __, a₁ = __',
      options: [
        'aₙ₊₁ = aₙ + (-2), a₁ = 2',
        'aₙ₊₁ = aₙ + 2, a₁ = -2',
        'aₙ₊₁ = aₙ + (-1), a₁ = -2',
        'aₙ₊₁ = aₙ + (-4), a₁ = 2',
        'aₙ₊₁ = aₙ + (-1), a₁ = 2'
      ],
      correctAnswer: 'aₙ₊₁ = aₙ + (-2), a₁ = 2',
      explanation: 'Looking at the sequence 2, 0, -2, -4, -6, ..., we see each term decreases by 2. So the common difference d = -2, first term a₁ = 2, giving us aₙ₊₁ = aₙ + (-2) with a₁ = 2.'
    },
    {
      id: 'explicit-formula-calculation',
      question: 'Find the formula for the nth term of an arithmetic sequence if the first term is -3 and the common difference is 2. What is a₅?',
      options: [
        'aₙ = 2n - 5; a₅ = 5',
        'aₙ = -3 + 2n; a₅ = 7', 
        'aₙ = 2n - 3; a₅ = 7',
        'aₙ = -3n + 2; a₅ = -13',
        'aₙ = -5 + 2n; a₅ = 5'
      ],
      correctAnswer: 'aₙ = 2n - 5; a₅ = 5',
      explanation: 'Using aₙ = a₁ + (n-1)d with a₁ = -3 and d = 2: aₙ = -3 + (n-1)(2) = -3 + 2n - 2 = 2n - 5. Therefore a₅ = 2(5) - 5 = 10 - 5 = 5.'
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
      interactionId: `arithmetic-formulas-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'arithmetic-formulas',
      conceptName: 'Recursive and Explicit Formulas',
      conceptDescription: `Testing: ${currentQuestion.id === 'formula-equivalence' ? 'Understanding relationship between recursive and explicit formulas' : currentQuestion.id === 'function-notation-conversion' ? 'Converting between sequence and function notation' : 'Optimizing computational approaches for multiple terms'}`,
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
              Arithmetic sequences can be expressed using both <strong>recursive formulas</strong> (showing how to get the next term) and <strong>explicit formulas</strong> (directly calculating any term).
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Understanding both representations provides computational flexibility and deeper insight into sequence structure.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Insight:</strong> Same sequence, different computational approaches.
              </p>
            </div>
          </div>

          {/* Recursive Formulas */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Recursive Formula Structure</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">General Form:</p>
              <div className="text-center space-y-2">
                <p className="text-xl"><InlineMath math="a_{n+1} = a_n + d" /></p>
                <p className="text-lg"><InlineMath math="a_1 = \text{first term}" /></p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Example: <InlineMath math="a_{n+1} = a_n + 3, a_1 = 7" /></p>
                <div className="space-y-1">
                  <p>Generates: 7, 10, 13, 16, 19, ...</p>
                  <p><strong>Process:</strong> Each term = previous term + 3</p>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Function Notation: <InlineMath math="f(n+1) = f(n) + 3, f(1) = 7" /></p>
                <div className="space-y-1">
                  <p>Same sequence, function language</p>
                  <p><strong>Benefit:</strong> Integrates with functional analysis</p>
                </div>
              </div>
            </div>
          </div>

          {/* Explicit Formulas */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Explicit Formula Structure</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">General Form:</p>
              <div className="text-center">
                <p className="text-xl"><InlineMath math="a_n = a_1 + (n-1)d" /></p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-semibold mb-2">Deriving from recursive:</p>
                <p><InlineMath math="a_{n+1} = a_n + 3, a_1 = 7" /></p>
                <p>Explicit: <InlineMath math="a_n = 7 + (n-1)(3) = 3n + 4" /></p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-semibold mb-2">Verification:</p>
                <div className="space-y-1">
                  <p><InlineMath math="a_1 = 3(1) + 4 = 7" /> ✓</p>
                  <p><InlineMath math="a_2 = 3(2) + 4 = 10" /> ✓</p>
                  <p><InlineMath math="a_{50} = 3(50) + 4 = 154" /></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Applications */}
        <div className="space-y-6">
          
          {/* Worked Conversion Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Formula Conversion Example</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold">Convert: 2, -1, -4, -7, -10, ...</p>
              <p className="text-lg">From sequence to both recursive and explicit formulas</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Identify pattern</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_1 = 2" /></p>
                  <p><InlineMath math="d = -1 - 2 = -3" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Write recursive formula</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_{n+1} = a_n + (-3)" /></p>
                  <p><InlineMath math="a_1 = 2" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 3: Write explicit formula</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg space-y-1">
                  <p><InlineMath math="a_n = a_1 + (n-1)d" /></p>
                  <p><InlineMath math="a_n = 2 + (n-1)(-3)" /></p>
                  <p><InlineMath math="a_n = 2 - 3n + 3" /></p>
                  <p><InlineMath math="a_n = 5 - 3n" /></p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Both describe the same decreasing arithmetic sequence
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
                        {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Excellent formula analysis!' : 'Let\'s work through the formulas.'}
                      </div>
                      <div className="text-lg text-black dark:text-white mb-2">
                        {selectedAnswer !== questions[currentQuestionIndex].correctAnswer && `The correct answer is: ${questions[currentQuestionIndex].correctAnswer}`}
                      </div>
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
      slideId="arithmetic-formulas"
      slideTitle="Recursive and Explicit Formulas"
      moduleId="sequences"
      submoduleId="arithmetic-sequences"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}