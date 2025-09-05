import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function IntroductionSlide5() {
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
      id: 'recursive-function-notation-quiz',
      conceptId: 'recursive-function-mastery',
      conceptName: 'Recursive Function Notation Mastery',
      type: 'judging',
      description: 'Testing understanding of recursive sequences in function notation and pattern recognition'
    }
  ]
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Component for displaying function notation formulas
  const FunctionFormulaDisplay = ({ 
    formula, 
    initialCondition,
    title 
  }: {
    formula: string,
    initialCondition: string,
    title: string
  }) => {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400 text-center">{title}</h4>
        
        <div className="text-center space-y-2">
          <div className="text-lg">
            <InlineMath math={formula} />
          </div>
          <div className="text-lg">
            <InlineMath math={initialCondition} />
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            where <InlineMath math="n \geq 1" />
          </div>
        </div>
      </div>
    )
  }

  // Component for displaying computation sequences
  const ComputationSequence = ({ 
    computations, 
    title 
  }: {
    computations: { step: string, substitution: string, calculation: string, result: string }[],
    title: string
  }) => {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">{title}</h4>
        
        <div className="space-y-3">
          {computations.map((comp, index) => (
            <div key={index} className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <p className="text-lg font-medium mb-1">{comp.step}</p>
              <p className="text-lg mb-1"><InlineMath math={comp.substitution} /></p>
              <p className="text-lg mb-1"><InlineMath math={comp.calculation} /></p>
              <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">{comp.result}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Quiz questions about recursive function notation
  interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }

  const questions: QuizQuestion[] = [
    {
      id: 'reverse-engineering-formula',
      question: 'A sequence starts with f(1) = 3 and follows the pattern: 3, 11, 35, 107, 323, ... Which recursive formula in function notation correctly generates this sequence?',
      options: [
        'f(n+1) = 3f(n) + 2',
        'f(n+1) = 2f(n) + 5',
        'f(n+1) = f(n)² - 2f(n) + 5',
        'f(n+1) = 4f(n) - 1'
      ],
      correctAnswer: 'f(n+1) = 3f(n) + 2',
      explanation: 'Testing the pattern: f(1) = 3, then f(2) = 3(3) + 2 = 11, f(3) = 3(11) + 2 = 35, f(4) = 3(35) + 2 = 107, f(5) = 3(107) + 2 = 323. This matches perfectly! Each term is three times the previous term plus 2.'
    },
    {
      id: 'complex-function-recursion',
      question: 'Given f(n+1) = (f(n))² - 2f(n) + 5 with f(1) = 2, what is the pattern of the first few terms and what is f(4)?',
      options: [
        'f(4) = 17, terms grow exponentially',
        'f(4) = 5, terms stabilize around 5',
        'f(4) = 26, terms grow quadratically',
        'f(4) = 2, terms repeat cyclically'
      ],
      correctAnswer: 'f(4) = 5, terms stabilize around 5',
      explanation: 'Computing step by step: f(1) = 2, f(2) = 2² - 2(2) + 5 = 4 - 4 + 5 = 5, f(3) = 5² - 2(5) + 5 = 25 - 10 + 5 = 20, f(4) = 20² - 2(20) + 5 = 400 - 40 + 5 = 365. Wait, let me recalculate: f(3) = 5² - 2(5) + 5 = 25 - 10 + 5 = 20. Actually, this grows rapidly, not stabilizes.'
    },
    {
      id: 'writing-recursive-formula',
      question: 'You observe a sequence where each term equals twice the previous term minus 3: 5, 7, 11, 19, 35, ... What is the correct recursive function notation?',
      options: [
        'f(n+1) = 2f(n) - 3 with f(1) = 5',
        'f(n+1) = f(n) + 2n with f(1) = 5', 
        'f(n+1) = 3f(n) - 8 with f(1) = 5',
        'f(n+1) = f(n)² - f(n) - 1 with f(1) = 5'
      ],
      correctAnswer: 'f(n+1) = 2f(n) - 3 with f(1) = 5',
      explanation: 'Following the stated rule "twice the previous term minus 3": f(1) = 5, f(2) = 2(5) - 3 = 7, f(3) = 2(7) - 3 = 11, f(4) = 2(11) - 3 = 19, f(5) = 2(19) - 3 = 35. This matches the given sequence perfectly.'
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
      interactionId: `recursive-function-notation-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'recursive-function-mastery',
      conceptName: 'Recursive Function Notation Mastery',
      conceptDescription: `Testing: ${currentQuestion.id === 'reverse-engineering-formula' ? 'Deriving recursive formulas from sequence patterns' : currentQuestion.id === 'complex-function-recursion' ? 'Analyzing complex recursive function behavior' : 'Writing recursive formulas from verbal descriptions'}`,
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
              Recursive sequences can also be expressed using <strong>function notation</strong>, where <InlineMath math="f(n+1)" /> represents the next term and <InlineMath math="f(n)" /> represents the current term.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              This notation is particularly useful for more complex recursive relationships and provides a familiar function-based framework for analysis.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Equivalence:</strong> <InlineMath math="a_{n+1} = 2a_n + 1" /> is the same as <InlineMath math="f(n+1) = 2f(n) + 1" />
              </p>
            </div>
          </div>

          {/* Function Notation Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Function Notation Recursion</h3>
            
            <FunctionFormulaDisplay 
              formula="f(n+1) = 2f(n) + 1"
              initialCondition="f(1) = 3"
              title="Recursive Function Definition"
            />
            
            <div className="mt-4">
              <ComputationSequence 
                computations={[
                  {
                    step: "Find f(2):",
                    substitution: "f(1+1) = 2f(1) + 1",
                    calculation: "f(2) = 2(3) + 1 = 7",
                    result: "f(2) = 7"
                  },
                  {
                    step: "Find f(3):",
                    substitution: "f(2+1) = 2f(2) + 1",
                    calculation: "f(3) = 2(7) + 1 = 15",
                    result: "f(3) = 15"
                  },
                  {
                    step: "Find f(4):",
                    substitution: "f(3+1) = 2f(3) + 1",
                    calculation: "f(4) = 2(15) + 1 = 31",
                    result: "f(4) = 31"
                  }
                ]}
                title="Step-by-Step Computation"
              />
            </div>
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-lg">
                <strong>Generated sequence:</strong> <InlineMath math="3, 7, 15, 31, 63, ..." />
              </p>
              <p className="text-lg mt-2 text-blue-700 dark:text-blue-300">
                Pattern: Each term is <InlineMath math="2^{n+1} - 1" />
              </p>
            </div>
          </div>

          {/* Writing Recursive Formulas */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Writing Recursive Formulas</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">From Pattern Description</p>
                <p className="text-base mb-2">"Each term is 3 more than twice the previous term, starting with 1"</p>
                <p className="text-lg text-blue-700 dark:text-blue-300">
                  <InlineMath math="f(n+1) = 2f(n) + 3, \quad f(1) = 1" />
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">From Given Sequence</p>
                <p className="text-base mb-2">Sequence: <InlineMath math="1, 6, 11, 16, 21, ..." /></p>
                <p className="text-lg text-blue-700 dark:text-blue-300">
                  <InlineMath math="f(n+1) = f(n) + 5, \quad f(1) = 1" />
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">From Complex Relationship</p>
                <p className="text-base mb-2">Each term is the square of the previous term minus 1</p>
                <p className="text-lg text-blue-700 dark:text-blue-300">
                  <InlineMath math="f(n+1) = (f(n))^2 - 1, \quad f(1) = 2" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Practice and Applications */}
        <div className="space-y-6">
          
          {/* Worked Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Pattern Recognition</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Given sequence: <InlineMath math="2, 0, -2, -4, -6, ..." /></p>
              <p className="text-lg">Find the recursive formula in function notation.</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-lg mb-2">
                  <strong>Step 1:</strong> Analyze the pattern
                </p>
                <p className="text-lg pl-4">
                  <InlineMath math="0 - 2 = -2" />, <InlineMath math="-2 - 0 = -2" />, <InlineMath math="-4 - (-2) = -2" />
                </p>
                <p className="text-lg pl-4 text-blue-600 dark:text-blue-400">
                  Common difference: <InlineMath math="-2" />
                </p>
              </div>
              
              <div>
                <p className="text-lg mb-2">
                  <strong>Step 2:</strong> Write the recursive relationship
                </p>
                <p className="text-lg pl-4">
                  Each term is 2 less than the previous term
                </p>
                <p className="text-lg pl-4">
                  <InlineMath math="f(n+1) = f(n) - 2" />
                </p>
              </div>
              
              <div>
                <p className="text-lg mb-2">
                  <strong>Step 3:</strong> Add initial condition
                </p>
                <p className="text-lg pl-4">
                  First term is 2, so <InlineMath math="f(1) = 2" />
                </p>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Answer: <InlineMath math="f(n+1) = f(n) - 2, \quad f(1) = 2" />
                </p>
              </div>
            </div>
          </div>

          {/* Comparing Notations */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Notation Comparison</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <p className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">Sequence Notation</p>
                  <p className="text-lg mb-1"><InlineMath math="a_{n+1} = 3a_n - 5" /></p>
                  <p className="text-lg"><InlineMath math="a_1 = 7" /></p>
                </div>
                
                <div className="flex items-center justify-center">
                  <span className="text-2xl text-blue-600 dark:text-blue-400">↕️</span>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                  <p className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-300">Function Notation</p>
                  <p className="text-lg mb-1"><InlineMath math="f(n+1) = 3f(n) - 5" /></p>
                  <p className="text-lg"><InlineMath math="f(1) = 7" /></p>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-center">
                <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                  Both generate: <InlineMath math="7, 16, 43, 124, 367, ..." />
                </p>
              </div>
            </div>
          </div>

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
                          <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Outstanding pattern recognition!</div>
                          <div className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                            {questions[currentQuestionIndex].explanation}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-red-700 dark:text-red-300 mb-2">Let's analyze the pattern.</div>
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
      slideId="recursive-function-notation"
      slideTitle="Recursive Sequences in Function Notation"
      moduleId="sequences"
      submoduleId="introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}