import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function AdvancedArithmeticSlide2() {
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
      id: 'arbitrary-positioning',
      question: 'Given that a₄₀ = 127 and the common difference d = 3, what strategic advantage does computing a₁ versus computing a₁₀₀ demonstrate about arithmetic sequences?',
      options: [
        'Computing a₁ = 10 reveals sequence origin; a₁₀₀ = 307 shows growth potential',
        'Both require equal computational effort since arithmetic sequences are linear',
        'Computing a₁ first establishes the explicit formula for all future calculations',
        'a₁₀₀ is more useful since it projects forward rather than backward'
      ],
      correctAnswer: 'Computing a₁ first establishes the explicit formula for all future calculations',
      explanation: 'Finding a₁ = a₄₀ - 39d = 127 - 39(3) = 10 gives us the complete formula aₙ = 10 + (n-1)3 = 3n + 7. Now ANY term can be computed directly: a₁₀₀ = 3(100) + 7 = 307. This strategic approach establishes the universal formula rather than computing terms piecemeal.'
    },
    {
      id: 'midpoint-analysis',
      question: 'In an arithmetic sequence where a₈ = 31 and a₂₄ = 79, the midpoint term a₁₆ has special properties. What deeper mathematical principle does this illustrate?',
      options: [
        'a₁₆ = 55; demonstrates that arithmetic means preserve equidistant relationships',
        'a₁₆ = (31+79)/2; shows symmetry property of arithmetic sequences',
        'a₁₆ equals the average of endpoints; proves linear interpolation validity',
        'All of the above; arithmetic sequences exhibit multiple harmonic properties'
      ],
      correctAnswer: 'All of the above; arithmetic sequences exhibit multiple harmonic properties',
      explanation: 'The midpoint a₁₆ = (a₈ + a₂₄)/2 = (31+79)/2 = 55. This works because arithmetic sequences are linear: terms equidistant from any center have equal differences. This demonstrates arithmetic mean preservation, symmetry, and linear interpolation validity - all manifestations of the underlying linear structure.'
    },
    {
      id: 'optimization-strategy',
      question: 'You need to find a₁₀₀ in an arithmetic sequence, and you know exactly three terms: a₁₅ = 47, a₃₅ = 107, and a₅₅ = 167. What is the most computationally elegant approach?',
      options: [
        'Use any two terms to find d = 3, then jump directly: a₁₀₀ = a₅₅ + 45d = 302',
        'Verify all three terms are consistent first, then proceed with calculations',
        'Find a₁ = 5, then use explicit formula: a₁₀₀ = 5 + 99(3) = 302',
        'Use the middle term a₃₅ as reference point for minimum calculation steps'
      ],
      correctAnswer: 'Use any two terms to find d = 3, then jump directly: a₁₀₀ = a₅₅ + 45d = 302',
      explanation: 'Most elegant: d = (107-47)/(35-15) = 60/20 = 3. Then jump from closest term: a₁₀₀ = a₅₅ + 45d = 167 + 45(3) = 302. This minimizes arithmetic by choosing the term nearest to the target. The third term provides verification but isn\'t needed for the calculation.'
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
              Working with <strong>arbitrary terms</strong> in arithmetic sequences requires strategic thinking about which calculations provide the most insight with minimal computation.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The key is leveraging the <strong>linear structure</strong> to jump efficiently between any positions in the sequence.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Strategic Principle:</strong> Use the closest known term to minimize arithmetic operations.
              </p>
            </div>
          </div>

          {/* Jump Strategy */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Direct Jump Strategy</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">General Jump Formula:</p>
              <p className="text-xl text-center"><InlineMath math="a_n = a_k + (n-k)d" /></p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-medium mb-2">Example: Known <InlineMath math="a_{17} = 52" />, <InlineMath math="d = 4" /></p>
                <p>Find <InlineMath math="a_{30}" />:</p>
                <p><InlineMath math="a_{30} = a_{17} + (30-17)(4) = 52 + 52 = 104" /></p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-medium mb-2">Find <InlineMath math="a_5" />:</p>
                <p><InlineMath math="a_5 = a_{17} + (5-17)(4) = 52 + (-48) = 4" /></p>
              </div>
              
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Works forward or backward from any reference point!
                </p>
              </div>
            </div>
          </div>

          {/* Optimization Techniques */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Computational Optimization</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Choose closest reference:</p>
                <p>To find <InlineMath math="a_{100}" /> given <InlineMath math="a_{95}" /> and <InlineMath math="a_{20}" /></p>
                <p>Better: Use <InlineMath math="a_{95}" /> (5 steps) than <InlineMath math="a_{20}" /> (80 steps)</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Verification principle:</p>
                <p>Calculate the same term from different references</p>
                <p>Results must match if calculations are correct</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Symmetry exploitation:</p>
                <p>For midpoint between known terms:</p>
                <p><InlineMath math="a_{\text{mid}} = \frac{a_{\text{left}} + a_{\text{right}}}{2}" /></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Complex Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Strategic Term Finding</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_{22} = 78" />, <InlineMath math="a_{45} = 147" /></p>
              <p className="text-lg">Find: <InlineMath math="a_{100}" />, <InlineMath math="a_1" />, and <InlineMath math="a_{33}" /></p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Find common difference</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="d = \frac{147 - 78}{45 - 22} = \frac{69}{23} = 3" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Find <InlineMath math="a_{100}" /> (closest to <InlineMath math="a_{45}" />)</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_{100} = a_{45} + (100-45) \times 3" /></p>
                  <p><InlineMath math="a_{100} = 147 + 55 \times 3 = 312" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 3: Find <InlineMath math="a_1" /> (closest to <InlineMath math="a_{22}" />)</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_1 = a_{22} + (1-22) \times 3" /></p>
                  <p><InlineMath math="a_1 = 78 + (-21) \times 3 = 15" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 4: Find <InlineMath math="a_{33}" /> (use symmetry)</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p>Since 33 is between 22 and 45:</p>
                  <p><InlineMath math="a_{33} = a_{22} + (33-22) \times 3 = 78 + 33 = 111" /></p>
                  <p>Verify: <InlineMath math="a_{33} = a_{45} - (45-33) \times 3 = 147 - 36 = 111" /> ✓</p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Results: <InlineMath math="a_{100} = 312" />, <InlineMath math="a_1 = 15" />, <InlineMath math="a_{33} = 111" />
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Properties */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Advanced Properties</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Arithmetic Mean Property</p>
                <p>For any three equally spaced terms:</p>
                <p><InlineMath math="a_k = \frac{a_{k-r} + a_{k+r}}{2}" /></p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Middle term is average of equidistant terms</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Distance Minimization</p>
                <p>To find <InlineMath math="a_n" />, use reference <InlineMath math="a_k" /> where <InlineMath math="|n-k|" /> is minimal</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Reduces computational steps and error propagation</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Linear Interpolation</p>
                <p>Arithmetic sequences enable perfect linear interpolation between any two known points</p>
              </div>
            </div>
          </div>

          {/* Challenge Quiz */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Arbitrary Terms Mastery</h3>
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
      slideId="advanced-arbitrary-terms"
      slideTitle="Working with Arbitrary Terms"
      moduleId="sequences"
      submoduleId="advanced-arithmetic"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}