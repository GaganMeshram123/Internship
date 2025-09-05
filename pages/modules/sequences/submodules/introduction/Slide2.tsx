import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper'
import { Interaction, InteractionResponse } from '../../../common-components/concept'
import { useThemeContext } from '@/lib/ThemeContext'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export default function IntroductionSlide2() {
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
      id: 'sequences-as-functions-quiz',
      conceptId: 'function-sequence-mapping',
      conceptName: 'Sequences as Functions',
      type: 'judging',
      description: 'Testing understanding of how sequences relate to functions and domain concepts'
    }
  ]
  
  // Handle completion of an interaction
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }))
  }

  // Component for displaying mapping diagrams
  const MappingDiagram = ({ 
    inputs, 
    outputs, 
    mappings, 
    title 
  }: {
    inputs: number[],
    outputs: number[],
    mappings: { from: number, to: number }[],
    title: string
  }) => {
    const svgWidth = 400
    const svgHeight = 250
    const ellipseWidth = 120
    const ellipseHeight = 200
    const leftEllipseCx = 100
    const rightEllipseCx = 300
    const ellipseCy = svgHeight / 2
    
    // Calculate positions for inputs and outputs
    const inputPositions = inputs.map((_, index) => ({
      x: leftEllipseCx,
      y: 50 + (index * 40)
    }))
    
    const outputPositions = outputs.map((_, index) => ({
      x: rightEllipseCx,
      y: 50 + (index * 40)
    }))
    
    // Helper to find position by value
    const getInputPos = (value: number) => {
      const index = inputs.indexOf(value)
      return inputPositions[index]
    }
    
    const getOutputPos = (value: number) => {
      const index = outputs.indexOf(value)
      return outputPositions[index]
    }

    return (
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
        <h4 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400 text-center">{title}</h4>
        
        <div className="w-full flex justify-center">
          <svg width={svgWidth} height={svgHeight} className="mx-auto">
            {/* Define arrow marker */}
            <defs>
              <marker
                id={`arrowhead-${title.replace(/\s/g, '')}`}
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 5, 0 10"
                  fill={isDarkMode ? '#60a5fa' : '#3b82f6'}
                />
              </marker>
            </defs>
            
            {/* Left ellipse (Input set) */}
            <ellipse
              cx={leftEllipseCx}
              cy={ellipseCy}
              rx={ellipseWidth/2}
              ry={ellipseHeight/2}
              fill="none"
              stroke={isDarkMode ? '#60a5fa' : '#3b82f6'}
              strokeWidth="2"
            />
            
            {/* Right ellipse (Output set) */}
            <ellipse
              cx={rightEllipseCx}
              cy={ellipseCy}
              rx={ellipseWidth/2}
              ry={ellipseHeight/2}
              fill="none"
              stroke={isDarkMode ? '#34d399' : '#10b981'}
              strokeWidth="2"
            />
            
            {/* Labels */}
            <text
              x={leftEllipseCx}
              y={20}
              textAnchor="middle"
              className="fill-current text-sm font-medium"
              fill={isDarkMode ? '#e2e8f0' : '#1e293b'}
            >
              Position
            </text>
            <text
              x={rightEllipseCx}
              y={20}
              textAnchor="middle"
              className="fill-current text-sm font-medium"
              fill={isDarkMode ? '#e2e8f0' : '#1e293b'}
            >
              Term Value
            </text>
            
            {/* Draw arrows for mappings */}
            {mappings.map((mapping, index) => {
              const fromPos = getInputPos(mapping.from)
              const toPos = getOutputPos(mapping.to)
              if (!fromPos || !toPos) return null
              
              return (
                <line
                  key={index}
                  x1={fromPos.x + 15}
                  y1={fromPos.y}
                  x2={toPos.x - 15}
                  y2={toPos.y}
                  stroke={isDarkMode ? '#60a5fa' : '#3b82f6'}
                  strokeWidth="2"
                  markerEnd={`url(#arrowhead-${title.replace(/\s/g, '')})`}
                />
              )
            })}
            
            {/* Input values */}
            {inputs.map((input, index) => (
              <g key={`input-${index}`}>
                <circle
                  cx={inputPositions[index].x}
                  cy={inputPositions[index].y}
                  r="12"
                  fill={isDarkMode ? '#1e40af' : '#3b82f6'}
                />
                <text
                  x={inputPositions[index].x}
                  y={inputPositions[index].y + 5}
                  textAnchor="middle"
                  className="fill-white text-sm font-medium"
                >
                  {input}
                </text>
              </g>
            ))}
            
            {/* Output values */}
            {outputs.map((output, index) => (
              <g key={`output-${index}`}>
                <circle
                  cx={outputPositions[index].x}
                  cy={outputPositions[index].y}
                  r="12"
                  fill={isDarkMode ? '#059669' : '#10b981'}
                />
                <text
                  x={outputPositions[index].x}
                  y={outputPositions[index].y + 5}
                  textAnchor="middle"
                  className="fill-white text-sm font-medium"
                >
                  {output}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        {/* Mapping descriptions */}
        <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          {mappings.map((mapping, index) => (
            <span key={index}>
              {mapping.from} → {mapping.to}
              {index < mappings.length - 1 && ', '}
            </span>
          ))}
        </div>
      </div>
    )
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

  // Quiz questions about sequences as functions
  interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }

  const questions: QuizQuestion[] = [
    {
      id: 'function-mapping',
      question: 'Looking at the sequence 4, 9, 14, 19, 24, ..., if we represent this as a function f(n) where n is the position, what is f(3)?',
      options: ['9', '14', '19', '24'],
      correctAnswer: '14',
      explanation: 'In function notation, f(n) represents the nth term. So f(3) means the 3rd term of the sequence. Looking at positions: f(1)=4, f(2)=9, f(3)=14, f(4)=19, f(5)=24. Therefore f(3) = 14.'
    },
    {
      id: 'infinite-sequence',
      question: 'Consider the function g(n) = 3n + 1 for n ≥ 1. What can we conclude about the sequence this function generates?',
      options: ['It has exactly 10 terms', 'It has a largest term', 'It continues forever with no last term', 'It repeats after 5 terms'],
      correctAnswer: 'It continues forever with no last term',
      explanation: 'Since the domain is n ≥ 1 (all positive integers), we can substitute any positive integer into g(n) = 3n + 1. This means the sequence 4, 7, 10, 13, 16, ... continues infinitely with no final term.'
    },
    {
      id: 'domain-understanding',
      question: 'For a sequence function h(n) = 2n - 3 where n ≥ 1, what does the domain restriction "n ≥ 1" tell us?',
      options: ['The sequence starts at term 0', 'We can only input positive integers', 'The sequence has negative values', 'The function is undefined'],
      correctAnswer: 'We can only input positive integers',
      explanation: 'The domain restriction n ≥ 1 means we can only use positive integers (1, 2, 3, 4, ...) as inputs. This makes sense for sequences since we need positive integer positions: 1st term, 2nd term, 3rd term, etc.'
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
      interactionId: `sequences-as-functions-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'function-sequence-mapping',
      conceptName: 'Sequences as Functions',
      conceptDescription: `Testing: ${currentQuestion.id === 'function-mapping' ? 'Understanding function notation for sequences' : currentQuestion.id === 'infinite-sequence' ? 'Recognizing infinite sequences' : 'Understanding domain restrictions'}`,
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
              Every sequence can be viewed as a <strong>function</strong> where the input represents the position of each term, and the output represents the value of that term.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              This connection allows us to use powerful function notation and techniques to analyze and work with sequences more systematically.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Insight:</strong> Position → Value mapping makes sequences behave like functions.
              </p>
            </div>
          </div>

          {/* Function Mapping Example */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Sequence as Function</h3>
            
            <SequenceDisplay 
              sequence={[4, 9, 14, 19, 24]}
              title="Sequence: 4, 9, 14, 19, 24, ..."
            />
            
            <div className="mt-4">
              <MappingDiagram 
                inputs={[1, 2, 3, 4, 5]}
                outputs={[4, 9, 14, 19, 24]}
                mappings={[
                  { from: 1, to: 4 },
                  { from: 2, to: 9 },
                  { from: 3, to: 14 },
                  { from: 4, to: 19 },
                  { from: 5, to: 24 }
                ]}
                title="Function Mapping f(position) = term value"
              />
            </div>
            
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <p className="text-lg mb-2">
                <strong>Function Notation:</strong> We can write this as <InlineMath math="f(n)" /> where:
              </p>
              <div className="space-y-1 text-lg">
                <p>• <InlineMath math="f(1) = 4" /> (1st term)</p>
                <p>• <InlineMath math="f(2) = 9" /> (2nd term)</p>
                <p>• <InlineMath math="f(3) = 14" /> (3rd term)</p>
                <p>• <InlineMath math="f(4) = 19" /> (4th term)</p>
                <p>• <InlineMath math="f(5) = 24" /> (5th term)</p>
              </div>
            </div>
          </div>

          {/* Infinite Sequences */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Infinite Sequences</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg mb-2">
                <strong>Function Rule:</strong> <InlineMath math="g(n) = 3n + 1" />, where <InlineMath math="n \geq 1" />
              </p>
              <p className="text-lg">
                <strong>Domain:</strong> All positive integers <InlineMath math="\{1, 2, 3, 4, 5, ...\}" />
              </p>
            </div>
            
            <SequenceDisplay 
              sequence={[4, 7, 10, 13, 16]}
              title="Generated Sequence: g(n) = 3n + 1"
            />
            
            <div className="mt-4 space-y-3 text-lg">
              <p><strong>Computing terms:</strong></p>
              <div className="grid grid-cols-2 gap-4 text-base">
                <div>
                  <p><InlineMath math="g(1) = 3(1) + 1 = 4" /></p>
                  <p><InlineMath math="g(2) = 3(2) + 1 = 7" /></p>
                  <p><InlineMath math="g(3) = 3(3) + 1 = 10" /></p>
                </div>
                <div>
                  <p><InlineMath math="g(4) = 3(4) + 1 = 13" /></p>
                  <p><InlineMath math="g(5) = 3(5) + 1 = 16" /></p>
                  <p><InlineMath math="g(100) = 3(100) + 1 = 301" /></p>
                </div>
              </div>
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                Since <InlineMath math="n" /> can be any positive integer, this sequence continues forever!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Practice */}
        <div className="space-y-6">
          
          {/* Domain Explanation */}
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Understanding Domain</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Domain Specification</p>
                <p className="text-lg mb-2">
                  For sequence functions, we write: <InlineMath math="f(n), \; n \geq 1" />
                </p>
                <p className="text-lg">
                  This tells us that <InlineMath math="n" /> must be a positive integer (1, 2, 3, 4, ...).
                </p>
              </div>
              
              <div className="space-y-2 text-lg">
                <p><strong>Why <InlineMath math="n \geq 1" />?</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Sequences have a "1st term", "2nd term", etc.</li>
                  <li>Position numbers must be positive integers</li>
                  <li>We can't have a "0th term" or "-3rd term"</li>
                </ul>
              </div>
              
              <div className="space-y-2 text-lg">
                <p><strong>Function Properties:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Each position maps to exactly one value</li>
                  <li>This satisfies the function definition</li>
                  <li>We use <InlineMath math="f(n)" /> instead of <InlineMath math="f(x)" /> for sequences</li>
                </ul>
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
      slideId="sequences-as-functions"
      slideTitle="Sequences as Functions"
      moduleId="sequences"
      submoduleId="introduction"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}