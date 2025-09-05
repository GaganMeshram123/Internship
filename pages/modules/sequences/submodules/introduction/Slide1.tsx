import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function IntroductionSlide1() {
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
      id: 'sequence-basics-quiz',
      conceptId: 'sequence-identification',
      conceptName: 'Sequence Identification',
      type: 'judging',
      description: 'Testing ability to identify terms in sequences and perform basic sequence operations'
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
    title 
  }: {
    sequence: number[],
    title: string
  }) => {
    return (
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400 text-center">{title}</h4>
        
        <div className="flex justify-center items-center space-x-3 text-2xl font-mono">
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
          <span className="text-blue-600 dark:text-blue-400 ml-2">...</span>
        </div>
      </div>
    )
  }

  // Quiz questions about sequences
  interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
    sequence: number[]
  }

  const questions: QuizQuestion[] = [
    {
      id: 'pattern-prediction',
      question: 'If this sequence continues following the same pattern, what would be the 10th term? Think about the underlying rule before calculating.',
      options: ['35', '39', '43', '47'],
      correctAnswer: '39',
      explanation: 'First, identify the pattern: 3, 7, 11, 15, 19... Each term increases by 4. This is arithmetic with a₁ = 3 and d = 4. Using the formula aₙ = a₁ + (n-1)d, we get a₁₀ = 3 + (10-1)×4 = 3 + 36 = 39. The pattern continues: ..., 27, 31, 35, 39.',
      sequence: [3, 7, 11, 15, 19, 23]
    },
    {
      id: 'reverse-engineering',
      question: 'A student claims this sequence has a "hidden pattern" where every 3rd term follows a special rule. Analyze the sequence - what do you notice about the 3rd and 6th terms?',
      options: ['They are perfect squares', 'They are both divisible by the position number', 'They equal the sum of the two terms before them', 'They are exactly double their position number'],
      correctAnswer: 'They are exactly double their position number',
      explanation: 'Looking at the pattern: 3rd term = 6 = 2×3, and 6th term = 12 = 2×6. While this sequence is arithmetic (adding 2 each time), there\'s an interesting coincidence: the 3rd and 6th terms equal exactly double their position numbers. This shows how multiple patterns can coexist in sequences.',
      sequence: [2, 4, 6, 8, 10, 12]
    },
    {
      id: 'comparative-analysis',
      question: 'Compare this sequence to a geometric sequence with the same first term (5). At which term position would the geometric sequence (with ratio 2) first exceed this arithmetic sequence?',
      options: ['4th term', '5th term', '6th term', '7th term'],
      correctAnswer: '5th term',
      explanation: 'Arithmetic sequence: 5, 9, 13, 17, 21, 25... (adding 4 each time). Geometric sequence with first term 5 and ratio 2: 5, 10, 20, 40, 80... Comparing: Term 1: 5=5, Term 2: 9<10, Term 3: 13<20, Term 4: 17<40, Term 5: 21<80. The geometric sequence first exceeds at the 5th term (80 > 21).',
      sequence: [5, 9, 13, 17, 21, 25]
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
      interactionId: `sequence-basics-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sequence-identification',
      conceptName: 'Sequence Identification',
      conceptDescription: `Testing: ${currentQuestion.id === 'fifth-term' ? 'Identifying specific terms in sequences' : 'Computing sums of sequence terms'}`,
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
      setShowFeedback(false)
    } else {
      setIsQuizComplete(true)
    }
  }

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory and Examples */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <p className="text-lg leading-relaxed mb-4">
              A sequence is an ordered collection of numbers arranged in a specific pattern or rule. Each number in the sequence occupies a definite position and is called a <strong>term</strong>.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Sequences can be finite (having a specific number of terms) or infinite (continuing indefinitely). Understanding the position and value of each term is fundamental to working with sequences.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Concept:</strong> The position of a term in a sequence is as important as its value.
              </p>
            </div>
          </div>

          {/* Detailed Example with Sequence Display */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Arithmetic Sequence Pattern</h3>
            
            <SequenceDisplay 
              sequence={[3, 7, 11, 15, 19]}
              title="Arithmetic Sequence (Pattern: +4)"
            />
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-lg mb-3">
                <strong>Pattern Analysis:</strong> Each term increases by 4 from the previous term.
              </p>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div>
                  <p className="font-semibold mb-2">Position → Value</p>
                  <div className="space-y-1">
                    <p>• 1st term <InlineMath math="(a_1)" /> = <span className="font-mono">3</span></p>
                    <p>• 2nd term <InlineMath math="(a_2)" /> = <span className="font-mono">7</span></p>
                    <p>• 3rd term <InlineMath math="(a_3)" /> = <span className="font-mono">11</span></p>
                    <p>• 4th term <InlineMath math="(a_4)" /> = <span className="font-mono">15</span></p>
                    <p>• 5th term <InlineMath math="(a_5)" /> = <span className="font-mono">19</span></p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2">Pattern Rule</p>
                  <div className="space-y-1">
                    <p>• 7 - 3 = <span className="font-mono">4</span></p>
                    <p>• 11 - 7 = <span className="font-mono">4</span></p>
                    <p>• 15 - 11 = <span className="font-mono">4</span></p>
                    <p>• 19 - 15 = <span className="font-mono">4</span></p>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold">Common difference = 4</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Types of Sequences Preview */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Types of Sequences</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">Arithmetic Sequences</h4>
                <SequenceDisplay 
                  sequence={[2, 6, 10, 14, 18]}
                  title="Constant difference of +4"
                />
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Geometric Sequences</h4>
                <SequenceDisplay 
                  sequence={[3, 6, 12, 24, 48]}
                  title="Constant ratio of ×2"
                />
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Fibonacci-type Sequences</h4>
                <SequenceDisplay 
                  sequence={[1, 1, 2, 3, 5]}
                  title="Each term = sum of previous two"
                />
              </div>
            </div>
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-lg text-blue-800 dark:text-blue-200">
                <strong>Coming Up:</strong> We'll explore each type in detail, learning to identify patterns and find specific terms.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column - Practice */}
        <div className="space-y-6">
          
          {/* Worked Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Term Identification</h3>
            
            <SequenceDisplay 
              sequence={[5, 12, 19, 26, 33, 40]}
              title="Given Sequence"
            />
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <div className="space-y-3">
                <div>
                  <p className="text-lg mb-2">
                    <strong>Problem:</strong> Find the sum of the first and last terms shown.
                  </p>
                </div>
                <div>
                  <p className="text-lg mb-2">
                    <strong>Step 1:</strong> Identify the first term: <InlineMath math="a_1 = 5" />
                  </p>
                </div>
                <div>
                  <p className="text-lg mb-2">
                    <strong>Step 2:</strong> Identify the last term shown: <InlineMath math="a_6 = 40" />
                  </p>
                </div>
                <div>
                  <p className="text-lg mb-2">
                    <strong>Step 3:</strong> Calculate the sum: <InlineMath math="5 + 40 = 45" />
                  </p>
                </div>
                <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                  <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                    Answer: 45
                  </p>
                </div>
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
                <p className="text-lg mb-4">
                  {questions[currentQuestionIndex].question}
                </p>
                
                {/* Show sequence for each question */}
                <div className="mb-4">
                  <SequenceDisplay 
                    sequence={questions[currentQuestionIndex].sequence}
                    title="Sequence"
                  />
                </div>
                
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
                          <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Correct!</div>
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
      slideId="introduction-basics"
      slideTitle="What is a Sequence?"
      moduleId="sequences"
      submoduleId="introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}