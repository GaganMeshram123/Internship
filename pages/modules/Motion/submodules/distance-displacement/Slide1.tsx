import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

export default function DistanceDisplacementSlide1() {
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
      id: 'reference-point-concept',
      question: 'Before you can describe an object\'s position, what is the one thing you must define first?',
      options: [
        'The object\'s speed',
        'A reference point (or origin)',
        'The time of day',
        'The object\'s size'
      ],
      correctAnswer: 'A reference point (or origin)',
      explanation: 'A reference point is the starting location (the "zero point") that you measure from. Without it, a statement like "the cat is 5 meters away" is meaningless.'
    },
    {
      id: 'position-definition',
      question: 'A student is standing on a number line at the point x = -3 meters. What does this position tell us?',
      options: [
        'They are 3 meters away from the start.',
        'They are 3 meters from the origin in the negative direction.',
        'They have walked for 3 seconds.',
        'They are moving backwards at 3 m/s.'
      ],
      correctAnswer: 'They are 3 meters from the origin in the negative direction.',
      explanation: 'Position includes both distance from the origin (3 meters) and direction (negative). The sign is crucial for defining location on a line.'
    },
    {
      id: 'motion-definition',
      question: 'Motion is officially defined as...',
      options: [
        'Being very fast.',
        'Any kind of movement.',
        'A change in position over a period of time.',
        'Traveling a long distance.'
      ],
      correctAnswer: 'A change in position over a period of time.',
      explanation: 'This is the precise scientific definition. If an object\'s position coordinates change from one moment to the next, it is in motion.'
    }
  ]

  const handleQuizAnswer = (answerText: string) => {
    setSelectedAnswer(answerText)
    setShowFeedback(true)
    
    const currentQuestion = questions[currentQuestionIndex]
    if (answerText === currentQuestion.correctAnswer) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        
        {/* Left Column - Theory */}
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-blue-500">The Starting Point: Position</h3>
            <p className="text-lg leading-relaxed mb-4">
              Before we can study motion, we need to know how to describe an object's <strong>position</strong>. Position is simply an object's location. But location compared to what?
            </p>
            <p className="text-lg leading-relaxed">
              We need a <strong>Reference Point</strong>, also called the <strong>origin</strong>. This is a fixed spot that we agree to measure from. It's our "zero" point.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Position on a Number Line</h3>
            <p className="text-lg leading-relaxed mb-4">
              Imagine a straight road. We can place our origin (0) at a house. Any spot east of the house is a positive position (e.g., <InlineMath math="x = +50m" />), and any spot west is negative (e.g., <InlineMath math="x = -30m" />).
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Idea:</strong> Position requires a distance AND a direction from the origin.
              </p>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">What is Motion?</h3>
            <p className="text-lg leading-relaxed">
              Now for the simple part! <strong>Motion</strong> is just a <strong>change in position</strong> over a period of time.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              If a ball starts at <InlineMath math="x = +2m" /> and rolls to <InlineMath math="x = +10m" />, its position has changed. It was in motion. If it stays at <InlineMath math="x = +2m" />, it is stationary (not in motion).
            </p>
          </div>
        </div>

        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Concept Check</h3>
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
              <p className="text-lg mb-6 min-h-[6rem]">
                {questions[currentQuestionIndex].question}
              </p>
              
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuizAnswer(option)}
                    disabled={showFeedback}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${
                      selectedAnswer === option
                        ? showFeedback
                          ? option === questions[currentQuestionIndex].correctAnswer
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
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
                        ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                        : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
                    }`}
                  >
                    <div className="font-bold text-lg mb-2">
                      {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Not quite...'}
                    </div>
                    <div className="text-base">
                      {questions[currentQuestionIndex].explanation}
                    </div>
                    <motion.button
                      onClick={handleNextQuestion}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
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
              <div className="text-4xl mb-4">🎉</div>
              <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                Great Start!
              </div>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                You scored {score} out of {questions.length}
              </div>
               <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                {score === questions.length ? 'Excellent! You\'ve mastered the basics. 🌟' : 
                  score >= questions.length * 0.7 ? 'Well done! You have a solid understanding. 👏' : 
                  'Good effort! These concepts are key, so review them if you need. 💪'}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="dd-position-motion"
      slideTitle="What is Position and Motion?"
      moduleId="motion"
      submoduleId="distance-displacement"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}