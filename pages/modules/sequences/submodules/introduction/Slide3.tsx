import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function IntroductionSlide3() {
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
      id: 'sequence-notation-quiz',
      conceptId: 'sequence-notation-mastery',
      conceptName: 'Sequence Notation Mastery',
      type: 'judging',
      description: 'Testing understanding of sequence notation and its relationship to function notation'
    }
  ]
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Component for displaying sequences
  const SequenceDisplay = ({ 
    sequence, 
    title,
    showEllipsis = true 
  }: {
    sequence: number[],
    title: string,
    showEllipsis?: boolean
  }) => {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400 text-center">{title}</h4>
        
        <div className="flex justify-center items-center space-x-3 text-xl font-mono flex-wrap">
          {sequence.map((term, index) => (
            <React.Fragment key={index}>
              <span className="bg-blue-50 dark:bg-blue-900/30 px-3 py-2 rounded-lg border-2 border-blue-200 dark:border-blue-700">
                {term}
              </span>
              {index < sequence.length - 1 && (
                <span className="text-blue-600 dark:text-blue-400">,</span>
              )}
            </React.Fragment>
          ))}
          {showEllipsis && (
            <span className="text-blue-600 dark:text-blue-400 ml-2">...</span>
          )}
        </div>
      </div>
    )
  }

  // Quiz questions about sequence notation
  interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }

  const questions: QuizQuestion[] = [
    {
      id: 'notation-comparison',
      question: 'A sequence is defined by f(n) = 2n² - 1 for n ≥ 1. If we convert this to sequence notation, which statement correctly represents the relationship between the 5th and 6th terms?',
      options: [
        'a₅ + a₆ = 96',
        'a₆ - a₅ = 22', 
        'a₆ = 2a₅ + 1',
        'a₅ · a₆ = 3465'
      ],
      correctAnswer: 'a₆ - a₅ = 22',
      explanation: 'Using f(n) = 2n² - 1: f(5) = 2(25) - 1 = 49, so a₅ = 49. f(6) = 2(36) - 1 = 71, so a₆ = 71. Therefore a₆ - a₅ = 71 - 49 = 22. This demonstrates how sequence notation aₙ directly corresponds to function notation f(n).'
    },
    {
      id: 'complex-evaluation',
      question: 'Given the sequence notation aₙ = (3n - 1)/(n + 2) for n ≥ 1, analyze the behavior of consecutive terms. What can you conclude about the sequence as n increases?',
      options: [
        'The terms approach 3 and the differences between consecutive terms decrease',
        'The terms approach 0 and increase linearly',
        'The terms oscillate around 1.5 indefinitely',
        'The terms approach infinity at a constant rate'
      ],
      correctAnswer: 'The terms approach 3 and the differences between consecutive terms decrease',
      explanation: 'As n → ∞, aₙ = (3n - 1)/(n + 2) approaches 3 because the highest degree terms dominate: (3n)/(n) = 3. For consecutive differences: a₂ = 5/4 = 1.25, a₃ = 8/5 = 1.6, a₄ = 11/6 ≈ 1.83, showing terms increasing toward 3 with decreasing differences.'
    },
    {
      id: 'notation-transformation',
      question: 'A sequence is written as aₙ = (-1)ⁿ · (n² + 1). How would you describe the transformation needed to convert the equivalent function notation f(n) back to standard sequence form?',
      options: [
        'Simply replace f(n) with aₙ',
        'Multiply by (-1)ⁿ and adjust the domain',
        'The notations are identical in this case',
        'Add alternating signs and square the position index'
      ],
      correctAnswer: 'The notations are identical in this case',
      explanation: 'Both f(n) = (-1)ⁿ · (n² + 1) and aₙ = (-1)ⁿ · (n² + 1) represent the same sequence: -2, 5, -10, 17, -26, ... The notation change is purely symbolic - the mathematical relationship remains identical. This shows the equivalence between function and sequence notation.'
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
      interactionId: `sequence-notation-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sequence-notation-mastery',
      conceptName: 'Sequence Notation Mastery',
      conceptDescription: `Testing: ${currentQuestion.id === 'notation-comparison' ? 'Converting between function and sequence notation' : currentQuestion.id === 'complex-evaluation' ? 'Analyzing sequence behavior using notation' : 'Understanding notation transformations'}`,
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
              While function notation <InlineMath math="f(n)" /> is powerful for sequences, mathematicians often prefer <strong>sequence notation</strong> using subscripts to denote term positions directly.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              In sequence notation, we write <InlineMath math="a_n" /> to represent the nth term, where the subscript <InlineMath math="n" /> indicates the position and <InlineMath math="a" /> represents the sequence variable.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Equivalence:</strong> <InlineMath math="f(n) = a_n" /> - both represent the same sequence term.
              </p>
            </div>
          </div>

          {/* Notation Comparison */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Notation Comparison</h3>
            
            <SequenceDisplay 
              sequence={[6, 11, 18, 27, 38]}
              title="Sequence: 6, 11, 18, 27, 38, ..."
            />
            
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Function Notation</p>
                  <div className="space-y-1">
                    <p><InlineMath math="f(n) = n^2 + 2n + 3" /> where <InlineMath math="n \geq 1" /></p>
                    <p><InlineMath math="f(1) = 6, f(2) = 11, f(3) = 18" /></p>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <p className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">Sequence Notation</p>
                  <div className="space-y-1">
                    <p><InlineMath math="a_n = n^2 + 2n + 3" /> where <InlineMath math="n \geq 1" /></p>
                    <p><InlineMath math="a_1 = 6, a_2 = 11, a_3 = 18" /></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Notation Features */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Advanced Sequence Notation</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">Rational Expressions</h4>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                  <p className="text-lg"><InlineMath math="a_n = \frac{2n - 1}{n + 3}" /></p>
                  <p className="text-base mt-2">This generates: <InlineMath math="\frac{1}{4}, \frac{3}{5}, \frac{5}{6}, \frac{7}{7}, \frac{9}{8}, ..." /></p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Alternating Signs</h4>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                  <p className="text-lg"><InlineMath math="a_n = (-1)^{n+1} \cdot \frac{1}{n}" /></p>
                  <p className="text-base mt-2">This generates: <InlineMath math="1, -\frac{1}{2}, \frac{1}{3}, -\frac{1}{4}, \frac{1}{5}, ..." /></p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Polynomial Sequences</h4>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                  <p className="text-lg"><InlineMath math="a_n = n^3 - 2n^2 + 1" /></p>
                  <p className="text-base mt-2">This generates: <InlineMath math="0, -3, 1, 17, 41, ..." /></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Practice and Examples */}
        <div className="space-y-6">
          
          {/* Worked Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Sequence Evaluation</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given: <InlineMath math="a_n = \frac{3n + 2}{2n - 1}" /> for <InlineMath math="n \geq 1" /></p>
              <p className="text-lg">Find the sum of the second and fourth terms.</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2">
                  <strong>Step 1:</strong> Calculate <InlineMath math="a_2" />
                </p>
                <p className="text-lg pl-4">
                  <InlineMath math="a_2 = \frac{3(2) + 2}{2(2) - 1} = \frac{6 + 2}{4 - 1} = \frac{8}{3}" />
                </p>
              </div>
              
              <div>
                <p className="text-lg mb-2">
                  <strong>Step 2:</strong> Calculate <InlineMath math="a_4" />
                </p>
                <p className="text-lg pl-4">
                  <InlineMath math="a_4 = \frac{3(4) + 2}{2(4) - 1} = \frac{12 + 2}{8 - 1} = \frac{14}{7} = 2" />
                </p>
              </div>
              
              <div>
                <p className="text-lg mb-2">
                  <strong>Step 3:</strong> Find the sum
                </p>
                <p className="text-lg pl-4">
                  <InlineMath math="a_2 + a_4 = \frac{8}{3} + 2 = \frac{8}{3} + \frac{6}{3} = \frac{14}{3}" />
                </p>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Answer: <InlineMath math="\frac{14}{3}" />
                </p>
              </div>
            </div>
          </div>

          {/* Quick Check Quiz */}
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
                          <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Excellent!</div>
                          <div className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                            {questions[currentQuestionIndex].explanation}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-red-700 dark:text-red-300 mb-2">Not quite right.</div>
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
      slideId="notation-and-terminology"
      slideTitle="Sequence Notation and Terminology"
      moduleId="sequences"
      submoduleId="introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}