import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function ArithmeticSlide1() {
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
      id: 'arithmetic-introduction-quiz',
      conceptId: 'arithmetic-sequence-identification',
      conceptName: 'Arithmetic Sequence Identification',
      type: 'judging',
      description: 'Testing ability to identify arithmetic sequences and understand common differences'
    }
  ]
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Component for displaying sequences with arrows
  const ArithmeticSequenceDisplay = ({ 
    sequence, 
    title,
    showArrows = true,
    commonDifference
  }: {
    sequence: number[],
    title: string,
    showArrows?: boolean,
    commonDifference?: number
  }) => {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400 text-center">{title}</h4>
        
        <div className="flex justify-center items-center space-x-4 text-xl font-mono flex-wrap">
          {sequence.map((term, index) => (
            <React.Fragment key={index}>
              <span className="bg-blue-50 dark:bg-blue-900/30 px-3 py-2 rounded-lg border-2 border-blue-200 dark:border-blue-700">
                {term}
              </span>
              {index < sequence.length - 1 && (
                <div className="flex flex-col items-center">
                  {showArrows && commonDifference && (
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {commonDifference > 0 ? '+' : ''}{commonDifference}
                    </span>
                  )}
                  <span className="text-blue-600 dark:text-blue-400 text-2xl">→</span>
                </div>
              )}
            </React.Fragment>
          ))}
          <span className="text-slate-600 dark:text-slate-400 ml-2">...</span>
        </div>
      </div>
    )
  }

  // Quiz questions about arithmetic sequences
  interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }

  const questions: QuizQuestion[] = [
    {
      id: 'mixed-sequence-analysis',
      question: 'Analyze these three sequences: A) 2, 7, 12, 17, 22  B) 3, 6, 12, 24, 48  C) 10, 7, 4, 1, -2. Which statement correctly identifies their nature and explains the fundamental difference?',
      options: [
        'Only A and C are arithmetic; B multiplies by 2 instead of adding a constant',
        'All three are arithmetic with different common differences',
        'A and C are arithmetic with common differences +5 and -3; B is geometric with ratio 2',
        'Only A is truly arithmetic; C decreases so it cannot be arithmetic'
      ],
      correctAnswer: 'A and C are arithmetic with common differences +5 and -3; B is geometric with ratio 2',
      explanation: 'Sequence A: differences are 5, 5, 5, 5 (arithmetic, d=+5). Sequence B: ratios are 2, 2, 2, 2 (geometric, r=2). Sequence C: differences are -3, -3, -3, -3 (arithmetic, d=-3). Arithmetic sequences have constant differences; geometric sequences have constant ratios. Decreasing sequences can still be arithmetic.'
    },
    {
      id: 'common-difference-challenge',
      question: 'In an arithmetic sequence, the 4th term is 23 and the 7th term is 38. Without computing all terms, what can you conclude about the sequence\'s behavior and the 10th term?',
      options: [
        '10th term is 53; the sequence increases linearly with slope 5',
        '10th term is 48; each term is 5 units higher than 3 positions back',
        '10th term is 50; the pattern shows consistent acceleration',
        '10th term is 55; the differences compound over larger gaps'
      ],
      correctAnswer: '10th term is 53; the sequence increases linearly with slope 5',
      explanation: 'From term 4 to term 7 (3 steps): difference is 38 - 23 = 15. So common difference d = 15/3 = 5. From term 7 to term 10 (3 more steps): a₁₀ = 38 + 3(5) = 53. The "slope" analogy helps: arithmetic sequences have constant rate of change, like linear functions.'
    },
    {
      id: 'negative-arithmetic-insight',
      question: 'Consider the arithmetic sequence 50, 41, 32, 23, 14, 5, -4, ... What makes this sequence particularly interesting from a mathematical perspective?',
      options: [
        'It demonstrates that arithmetic sequences can cross zero, changing from positive to negative values',
        'The common difference becomes positive after crossing zero',
        'It shows that decreasing sequences eventually become increasing',
        'The sequence will eventually start increasing due to mathematical properties'
      ],
      correctAnswer: 'It demonstrates that arithmetic sequences can cross zero, changing from positive to negative values',
      explanation: 'This sequence has common difference d = -9, so it decreases consistently. What\'s mathematically interesting is that arithmetic sequences with negative common differences will cross zero and continue into negative numbers, maintaining their constant rate of decrease. This illustrates that arithmetic sequences are unbounded in both directions.'
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
      interactionId: `arithmetic-introduction-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'arithmetic-sequence-identification',
      conceptName: 'Arithmetic Sequence Identification',
      conceptDescription: `Testing: ${currentQuestion.id === 'mixed-sequence-analysis' ? 'Distinguishing arithmetic from geometric sequences' : currentQuestion.id === 'common-difference-challenge' ? 'Finding common differences from non-consecutive terms' : 'Understanding arithmetic sequences crossing zero'}`,
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
        
        {/* Left Column - Theory and Definition */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              An <strong>arithmetic sequence</strong> is a sequence where the difference between consecutive terms remains constant. This fixed difference is called the <strong>common difference</strong>, typically denoted by <InlineMath math="d" />.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The defining property is: <InlineMath math="a_{n+1} - a_n = d" /> for all valid values of <InlineMath math="n" />.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Insight:</strong> Constant differences create linear growth patterns.
              </p>
            </div>
          </div>

          {/* Visual Examples */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Visual Examples</h3>
            
            <div className="space-y-4">
              <ArithmeticSequenceDisplay 
                sequence={[1, 5, 9, 13, 17]}
                title="Increasing Arithmetic Sequence"
                commonDifference={4}
              />
              
              <ArithmeticSequenceDisplay 
                sequence={[20, 14, 8, 2, -4]}
                title="Decreasing Arithmetic Sequence"
                commonDifference={-6}
              />
              
              <ArithmeticSequenceDisplay 
                sequence={[7, 7, 7, 7, 7]}
                title="Constant Arithmetic Sequence"
                commonDifference={0}
              />
            </div>
          </div>

          {/* Common Difference Analysis */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Finding Common Differences</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Method:</p>
                <p className="text-lg mb-2">Choose any two consecutive terms and subtract:</p>
                <p className="text-lg text-center font-mono">
                  <InlineMath math="d = a_{n+1} - a_n" />
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Example: 11, 7, 3, -1, -5</p>
                <div className="space-y-1">
                  <p><InlineMath math="d = 7 - 11 = -4" /></p>
                  <p><InlineMath math="d = 3 - 7 = -4" /></p>
                  <p><InlineMath math="d = -1 - 3 = -4" /></p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">Common difference: <InlineMath math="d = -4" /></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Practice and Applications */}
        <div className="space-y-6">
          
          {/* Worked Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Identification</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Determine if this sequence is arithmetic:</p>
              <p className="text-lg text-center font-mono">-3, 1, 5, 9, 13, 17</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Calculate consecutive differences</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg space-y-1">
                  <p><InlineMath math="1 - (-3) = 4" /></p>
                  <p><InlineMath math="5 - 1 = 4" /></p>
                  <p><InlineMath math="9 - 5 = 4" /></p>
                  <p><InlineMath math="13 - 9 = 4" /></p>
                  <p><InlineMath math="17 - 13 = 4" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Check consistency</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p>All differences equal 4 ✓</p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Conclusion: This IS an arithmetic sequence with <InlineMath math="d = 4" />
                </p>
              </div>
            </div>
          </div>

          {/* Non-Arithmetic Examples */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Counter-Examples</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Not Arithmetic: 2, 4, 8, 16, 32</p>
                <div className="space-y-1">
                  <p>Differences: 2, 4, 8, 16 (not constant)</p>
                  <p>Ratios: 2, 2, 2, 2 (constant - this is geometric)</p>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Not Arithmetic: 1, 1, 2, 3, 5, 8</p>
                <div className="space-y-1">
                  <p>Differences: 0, 1, 1, 2, 3 (not constant)</p>
                  <p>Pattern: Each term = sum of previous two (Fibonacci)</p>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Not Arithmetic: 1, 4, 9, 16, 25</p>
                <div className="space-y-1">
                  <p>Differences: 3, 5, 7, 9 (not constant)</p>
                  <p>Pattern: Perfect squares <InlineMath math="n^2" /></p>
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
                          <div className="font-semibold text-black dark:text-white mb-2">Excellent analysis!</div>
                          <div className="text-lg text-black dark:text-white mb-4">
                            {questions[currentQuestionIndex].explanation}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-black dark:text-white mb-2">Let's work through this together.</div>
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
      slideId="arithmetic-introduction"
      slideTitle="Introduction to Arithmetic Sequences"
      moduleId="sequences"
      submoduleId="arithmetic-sequences"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}