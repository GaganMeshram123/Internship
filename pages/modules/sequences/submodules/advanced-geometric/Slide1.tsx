import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function AdvancedGeometricSlide1() {
  const { isDarkMode } = useThemeContext()
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false])
  const [score, setScore] = useState(0)
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  
  const questions = [
    {
      id: 'find-ratio-from-two-terms',
      question: 'The second term of a geometric sequence is 12 and its fourth term is 192. Find the common ratio r (given that r is positive).',
      options: [
        '6',
        '4',
        '3',
        '8',
        '2'
      ],
      correctAnswer: '4',
      explanation: 'Using the formula r^(n-m) = aₙ/aₘ: r^(4-2) = a₄/a₂ = 192/12 = 16. So r² = 16, which gives r = 4 (taking the positive root).'
    },
    {
      id: 'find-ratio-negative',
      question: 'The fourth term of a geometric sequence is 2400 and its sixth term is 6. Find the common ratio r (given that r is negative).',
      options: [
        '-1/20',
        '-1/10',
        '-1/5',
        '-1/15',
        '-1/25'
      ],
      correctAnswer: '-1/20',
      explanation: 'Using r^(n-m) = aₙ/aₘ: r^(6-4) = a₆/a₄ = 6/2400 = 1/400. So r² = 1/400, giving r = ±1/20. Since r is negative, r = -1/20.'
    }
  ]

  const handleQuizAnswer = (answerText: string) => {
    setSelectedAnswer(answerText)
    setShowFeedback(true)
    
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = answerText === currentQuestion.correctAnswer
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    }
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
        
        {/* Left Column */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              <strong>Advanced Ratio Formula</strong> enables direct computation of common ratios from any two non-consecutive terms without calculating intermediate values.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The exponential structure of geometric sequences creates powerful algebraic relationships for <strong>system solving</strong>.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Insight:</strong> Use r^(n-m) = aₙ/aₘ for any terms regardless of distance.
              </p>
            </div>
          </div>

          {/* Advanced Formula */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Advanced Ratio Formula</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">For any two terms aₘ and aₙ:</p>
              <p className="text-xl text-center"><InlineMath math="r^{n-m} = \frac{a_n}{a_m}" /></p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-medium mb-2">Direct calculation:</p>
                <p>No need to compute intermediate terms</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-medium mb-2">System compatibility:</p>
                <p>Works with algebraic substitution methods</p>
              </div>
              
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Exponential structure enables direct connections!
                </p>
              </div>
            </div>
          </div>

          {/* System Methods */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">System Solving Strategy</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Step 1: Set up equations</p>
                <p>Use aₙ = a₁ · r^(n-1) for each known term</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Step 2: Find ratio</p>
                <p>Use r^(n-m) = aₙ/aₘ to eliminate a₁</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Step 3: Solve systematically</p>
                <p>Substitute back to find all unknowns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Complex Example 1 */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Finding r from Non-Consecutive Terms</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_2 = 12" /> and <InlineMath math="a_5 = 192" /></p>
              <p className="text-lg">Find: Common ratio r</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Apply the formula</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="r^{5-2} = \frac{a_5}{a_2} = \frac{192}{12} = 16" /></p>
                  <p><InlineMath math="r^3 = 16" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Solve for r</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p>Since <InlineMath math="16 = 2^4" />, we have <InlineMath math="r^3 = 2^4" /></p>
                  <p><InlineMath math="r = 2^{4/3} = 2\sqrt[3]{2} \approx 2.52" /></p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Result: <InlineMath math="r = 2^{4/3}" />
                </p>
              </div>
            </div>
          </div>

          {/* Complex Example 2 */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Complete System Solution</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_2 = 4" /> and <InlineMath math="a_4 = 64" /></p>
              <p className="text-lg">Find: Both a₁ and r</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Find the common ratio</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="r^{4-2} = \frac{64}{4} = 16" /></p>
                  <p><InlineMath math="r^2 = 16 \Rightarrow r = 4" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Find the first term</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p>Using <InlineMath math="a_2 = a_1 \cdot r" />:</p>
                  <p><InlineMath math="4 = a_1 \cdot 4 \Rightarrow a_1 = 1" /></p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Complete formula: <InlineMath math="a_n = 1 \cdot 4^{n-1} = 4^{n-1}" />
                </p>
              </div>
            </div>
          </div>

          {/* Strategic Analysis Quiz */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Strategic Analysis</h3>
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
                        {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Excellent strategic thinking!' : 'Let\'s explore the strategy.'}
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
      slideId="advanced-geometric-ratios"
      slideTitle="Finding Ratios from Non-Consecutive Terms"
      moduleId="sequences"
      submoduleId="advanced-geometric"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}