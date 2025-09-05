import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function ArithmeticSlide2() {
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
      id: 'arithmetic-computation-quiz',
      conceptId: 'arithmetic-term-computation',
      conceptName: 'Arithmetic Term Computation',
      type: 'judging',
      description: 'Testing ability to compute specific terms in arithmetic sequences'
    }
  ]
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Quiz questions
  interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }

  const questions: QuizQuestion[] = [
    {
      id: 'find-term-value',
      question: 'Find the 8th term of the following arithmetic sequence: 4, 7, 10, 13, 16, ...',
      options: [
        '22',
        '25',
        '28',
        '31',
        '34'
      ],
      correctAnswer: '25',
      explanation: 'The sequence has first term a₁ = 4 and common difference d = 3. Using the formula aₙ = a₁ + (n-1)d: a₈ = 4 + (8-1)(3) = 4 + 21 = 25.'
    },
    {
      id: 'find-common-difference',
      question: 'What is the common difference for the following arithmetic sequence? -15, -32, -49, -66, ...',
      options: [
        '-47',
        '-17',
        '15',
        '17',
        '-15'
      ],
      correctAnswer: '-17',
      explanation: 'The common difference d = a₂ - a₁ = -32 - (-15) = -32 + 15 = -17. We can verify: -15 + (-17) = -32, -32 + (-17) = -49, etc.'
    },
    {
      id: 'find-missing-term',
      question: 'In the arithmetic sequence 15, __, 9, 6, ..., what is the missing second term?',
      options: [
        '12',
        '11',
        '13',
        '10',
        '14'
      ],
      correctAnswer: '12',
      explanation: 'From the consecutive terms a₃ = 9 and a₄ = 6, we find d = 6 - 9 = -3. Working backwards: a₂ = a₃ - d = 9 - (-3) = 12. We can verify: 15, 12, 9, 6 has common difference d = -3 throughout.'
    }
  ]

  // Handle quiz answer and other functions (similar structure to previous slides)
  const handleQuizAnswer = (answerText: string) => {
    setSelectedAnswer(answerText)
    setShowFeedback(true)
    
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = answerText === currentQuestion.correctAnswer
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }
    
    handleInteractionComplete({
      interactionId: `arithmetic-computation-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'arithmetic-term-computation',
      conceptName: 'Arithmetic Term Computation',
      conceptDescription: `Testing: ${currentQuestion.id}`,
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
        
        {/* Left Column - Theory and Methods */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              Computing terms in arithmetic sequences efficiently requires understanding both <strong>sequential computation</strong> (building term by term) and <strong>direct computation</strong> (jumping to any term).
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The choice of method depends on which term you need and what information is given.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Strategy:</strong> Use the explicit formula for distant terms; sequential building for nearby terms.
              </p>
            </div>
          </div>

          {/* Sequential Method */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Sequential Computation Method</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: First term and common difference</p>
              <p className="text-lg"><InlineMath math="a_1 = 6, d = -3" /></p>
              <p className="text-lg">Find: <InlineMath math="a_8" /></p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-medium mb-2">Build sequence step by step:</p>
                <div className="space-y-1">
                  <p><InlineMath math="a_1 = 6" /></p>
                  <p><InlineMath math="a_2 = 6 + (-3) = 3" /></p>
                  <p><InlineMath math="a_3 = 3 + (-3) = 0" /></p>
                  <p><InlineMath math="a_4 = 0 + (-3) = -3" /></p>
                  <p><InlineMath math="a_5 = -3 + (-3) = -6" /></p>
                  <p><InlineMath math="a_6 = -6 + (-3) = -9" /></p>
                  <p><InlineMath math="a_7 = -9 + (-3) = -12" /></p>
                  <p><InlineMath math="a_8 = -12 + (-3) = -15" /></p>
                </div>
              </div>
              
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Result: <InlineMath math="a_8 = -15" />
                </p>
              </div>
            </div>
          </div>

          {/* Direct Method */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Direct Computation Method</h3>
            
            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Explicit Formula:</p>
              <p className="text-xl text-center font-mono">
                <InlineMath math="a_n = a_1 + (n-1)d" />
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-medium mb-2">Same example: <InlineMath math="a_1 = 6, d = -3" /></p>
                <div className="space-y-1">
                  <p><InlineMath math="a_8 = a_1 + (8-1)d" /></p>
                  <p><InlineMath math="a_8 = 6 + (7)(-3)" /></p>
                  <p><InlineMath math="a_8 = 6 + (-21)" /></p>
                  <p><InlineMath math="a_8 = -15" /></p>
                </div>
              </div>
              
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Same result with one calculation!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Practice and Complex Examples */}
        <div className="space-y-6">
          
          {/* Complex Worked Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Finding Any Term</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Challenge: Find the 25th term</p>
              <p className="text-lg">Arithmetic sequence: 4, 11, 18, 25, 32, ...</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Identify the pattern</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_1 = 4" /></p>
                  <p><InlineMath math="d = 11 - 4 = 7" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Apply explicit formula</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg space-y-1">
                  <p><InlineMath math="a_{25} = a_1 + (25-1)d" /></p>
                  <p><InlineMath math="a_{25} = 4 + (24)(7)" /></p>
                  <p><InlineMath math="a_{25} = 4 + 168" /></p>
                  <p><InlineMath math="a_{25} = 172" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 3: Verification</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p>Check: <InlineMath math="a_2 = 4 + (1)(7) = 11" /> ✓</p>
                  <p>Pattern confirmed: Each term adds 7</p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Answer: <InlineMath math="a_{25} = 172" />
                </p>
              </div>
            </div>
          </div>

          {/* Efficiency Analysis */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Method Efficiency Comparison</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Sequential Building</p>
                <div className="space-y-1">
                  <p><strong>Best for:</strong> Finding the next few terms</p>
                  <p><strong>Steps needed:</strong> n-1 additions</p>
                  <p><strong>Example:</strong> Finding <InlineMath math="a_5" /> requires 4 steps</p>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Direct Formula</p>
                <div className="space-y-1">
                  <p><strong>Best for:</strong> Finding distant terms</p>
                  <p><strong>Steps needed:</strong> Always just 1 calculation</p>
                  <p><strong>Example:</strong> Finding <InlineMath math="a_{100}" /> requires 1 step</p>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">When to use each method?</p>
                <div className="space-y-1">
                  <p><strong>Sequential:</strong> When <InlineMath math="n \leq 10" /> and you want to see the pattern</p>
                  <p><strong>Direct:</strong> When <InlineMath math="n > 10" /> or when efficiency matters</p>
                  <p><strong>Mixed:</strong> Build to understand, then jump to target</p>
                </div>
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
                          <div className="font-semibold text-black dark:text-white mb-2">Excellent computational thinking!</div>
                          <div className="text-lg text-black dark:text-white mb-4">
                            {questions[currentQuestionIndex].explanation}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-black dark:text-white mb-2">Let's work through the calculation.</div>
                          <div className="text-lg text-black dark:text-white mb-2">
                            The correct answer is: {questions[currentQuestionIndex].correctAnswer}
                          </div>
                          <div className="text-lg text-black dark:text-white mb-4">
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
      slideId="arithmetic-computation"
      slideTitle="Computing Terms in Arithmetic Sequences"
      moduleId="sequences"
      submoduleId="arithmetic-sequences"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}