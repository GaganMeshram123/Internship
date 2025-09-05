import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function AdvancedArithmeticSlide1() {
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
      id: 'non-consecutive-analysis',
      question: 'Given a₁₅ = 62 and a₄₃ = 174 in an arithmetic sequence, what is the most efficient way to find the common difference and why does this method work universally?',
      options: [
        'd = (174-62)/(43-15) = 112/28 = 4; works because arithmetic sequences have constant rate of change',
        'd = 174/43 - 62/15 ≈ 0.5; uses average term values',
        'd = √((174-62)(43-15)) = √3136 = 56; geometric mean approach',
        'd = (174+62)/(43+15) ≈ 4.07; harmonic mean method'
      ],
      correctAnswer: 'd = (174-62)/(43-15) = 112/28 = 4; works because arithmetic sequences have constant rate of change',
      explanation: 'The formula d = (aₙ - aₘ)/(n-m) works because in arithmetic sequences, the total change between any two terms equals the common difference times the number of steps. From a₁₅ to a₄₃ is 28 steps, with total change 112, so d = 112/28 = 4. This is the discrete version of slope calculation.'
    },
    {
      id: 'strategic-term-selection',
      question: 'You know a₇ = 19 and a₂₁ = 61. To find a₁₀₀, which intermediate calculation provides the deepest insight into the sequence structure?',
      options: [
        'First find d = 3, then a₁ = -2; reveals the sequence crosses zero at specific point',
        'Calculate a₅₀ first as midpoint reference; shows symmetry properties',
        'Find a₁₄ = 40 as arithmetic mean; demonstrates linear interpolation',
        'Compute a₀ = -3 hypothetically; extends sequence backwards'
      ],
      correctAnswer: 'First find d = 3, then a₁ = -2; reveals the sequence crosses zero at specific point',
      explanation: 'Finding d = (61-19)/(21-7) = 42/14 = 3, then a₁ = 19 - 6(3) = 1. The sequence starts at 1 with d = 3, so aₙ = 3n - 2. This reveals that the sequence equals 1 at n = 1 and grows by 3 each step. For a₁₀₀ = 3(100) - 2 = 298. Understanding the starting point and rate completely characterizes the sequence.'
    },
    {
      id: 'multiple-gaps-problem',
      question: 'In an arithmetic sequence, you know a₃ = 11, a₉ = 35, and need to verify a₂₇. What mathematical principle guarantees your answer is unique?',
      options: [
        'Two points determine a unique line; arithmetic sequences are discrete linear functions',
        'The common difference is invariant across all term pairs',
        'Arithmetic mean property ensures unique interpolation',
        'The sequence is completely determined by its generating function'
      ],
      correctAnswer: 'Two points determine a unique line; arithmetic sequences are discrete linear functions',
      explanation: 'Just as two points determine a unique line in continuous mathematics, two terms of an arithmetic sequence uniquely determine the entire sequence. From a₃ = 11 and a₉ = 35: d = (35-11)/(9-3) = 24/6 = 4. So a₁ = 11 - 2(4) = 3, giving aₙ = 4n - 1. Therefore a₂₇ = 4(27) - 1 = 107. This uniqueness is fundamental to linear systems.'
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
        
        {/* Left Column - Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              When given <strong>non-consecutive terms</strong> of an arithmetic sequence, we can still determine the common difference using the principle that the rate of change remains constant across any interval.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The key formula is <InlineMath math="d = \frac{a_n - a_m}{n - m}" />, which represents the average rate of change between positions m and n.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Core Insight:</strong> Common difference = Total change ÷ Number of steps
              </p>
            </div>
          </div>

          {/* Visual Representation */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Gap Analysis Method</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Example: <InlineMath math="a_5 = 17" /> and <InlineMath math="a_{12} = 45" /></p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-medium mb-2">Step counting:</p>
                <p>From position 5 to position 12:</p>
                <p className="text-center text-xl"><InlineMath math="12 - 5 = 7" /> steps</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-medium mb-2">Total change:</p>
                <p>From value 17 to value 45:</p>
                <p className="text-center text-xl"><InlineMath math="45 - 17 = 28" /> units</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-lg font-medium mb-2">Common difference:</p>
                <p className="text-center text-xl"><InlineMath math="d = \frac{28}{7} = 4" /></p>
              </div>
            </div>
          </div>

          {/* Mathematical Foundation */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Mathematical Foundation</h3>
            
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Proof of formula:</p>
                <p><InlineMath math="a_n = a_1 + (n-1)d" /></p>
                <p><InlineMath math="a_m = a_1 + (m-1)d" /></p>
                <p>Subtracting: <InlineMath math="a_n - a_m = (n-1)d - (m-1)d" /></p>
                <p className="text-blue-600 dark:text-blue-400">
                  <InlineMath math="a_n - a_m = (n-m)d" />
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Therefore:</p>
                <BlockMath math="d = \frac{a_n - a_m}{n - m}" />
                <p className="text-center">Valid for any positions m and n!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Applications */}
        <div className="space-y-6">
          
          {/* Complex Worked Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Multiple Gaps</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_{10} = 42" />, <InlineMath math="a_{25} = 87" /></p>
              <p className="text-lg">Find: <InlineMath math="a_1" />, <InlineMath math="d" />, and <InlineMath math="a_{50}" /></p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Find common difference</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="d = \frac{a_{25} - a_{10}}{25 - 10} = \frac{87 - 42}{15} = \frac{45}{15} = 3" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Find first term</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p>Using <InlineMath math="a_{10} = a_1 + 9d" />:</p>
                  <p><InlineMath math="42 = a_1 + 9(3)" /></p>
                  <p><InlineMath math="42 = a_1 + 27" /></p>
                  <p><InlineMath math="a_1 = 15" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 3: Find <InlineMath math="a_{50}" /></p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p>Method 1: From <InlineMath math="a_1" /></p>
                  <p><InlineMath math="a_{50} = 15 + 49(3) = 162" /></p>
                  <p>Method 2: From <InlineMath math="a_{25}" /></p>
                  <p><InlineMath math="a_{50} = 87 + 25(3) = 162" /> ✓</p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Complete sequence formula: <InlineMath math="a_n = 3n + 12" />
                </p>
              </div>
            </div>
          </div>

          {/* Strategy Guide */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Strategic Approaches</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Given two arbitrary terms:</p>
                <p>1. Calculate d using the gap formula</p>
                <p>2. Find a₁ by working backwards</p>
                <p>3. Write explicit formula aₙ = a₁ + (n-1)d</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Verification technique:</p>
                <p>• Calculate same term from different starting points</p>
                <p>• Results must match if calculations are correct</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Pro tip:</p>
                <p>The formula <InlineMath math="a_n = a_m + (n-m)d" /> allows direct jumps between any two positions!</p>
              </div>
            </div>
          </div>

          {/* Challenge Quiz */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Non-Consecutive Terms Mastery</h3>
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
                        {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Excellent gap analysis!' : 'Let\'s work through the gap calculation.'}
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
      slideId="advanced-common-difference"
      slideTitle="Finding Common Difference from Non-Consecutive Terms"
      moduleId="sequences"
      submoduleId="advanced-arithmetic"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}