import React, { useState, useEffect } from 'react'; // Added useEffect
// motion and AnimatePresence are kept for quiz feedback
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Re-usable variants for definition lists ---
const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

// --- Animated Icon Component (Unchanged) ---
const VisualIcon = ({ type }: { type: 'angle' | 'parallel' | 'perpendicular' | 'polygon' }) => {
  const { isDarkMode } = useThemeContext();
  const color = isDarkMode ? '#60a5fa' : '#2563eb';

  const drawVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number = 1) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.1, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.1, duration: 0.01 }
      }
    })
  };

  const polyVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 2, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }
  };
  
  const perpendicularSquare = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.8, duration: 0.3 } }
  };

  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-14 w-14">
      {/* Note: Removed AnimatePresence, it's handled by the parent now */}
        {type === 'angle' && (
          <motion.path
            d="M10 50 L30 30 L50 50"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            variants={drawVariant}
            initial="hidden"
            animate="visible"
          />
        )}
        {type === 'parallel' && (
          <>
            <motion.path
              d="M20 10 L20 50"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              variants={drawVariant}
              initial="hidden"
              animate="visible"
              custom={1}
            />
            <motion.path
              d="M40 10 L40 50"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              variants={drawVariant}
              initial="hidden"
              animate="visible"
              custom={2}
            />
          </>
        )}
        {type === 'perpendicular' && (
          <>
            <motion.path
              d="M10 30 L50 30"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              variants={drawVariant}
              initial="hidden"
              animate="visible"
              custom={1}
            />
            <motion.path
              d="M30 10 L30 50"
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              variants={drawVariant}
              initial="hidden"
              animate="visible"
              custom={2}
            />
            <motion.rect 
              x="30" y="30" width="6" height="6" 
              stroke={color} strokeWidth="2" fill="none"
              variants={perpendicularSquare}
              initial="hidden"
              animate="visible"
            />
          </>
        )}
        {type === 'polygon' && (
          <motion.path
            d="M30 10 L50 25 L40 50 L20 50 L10 25 Z"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={polyVariant}
            initial="hidden"
            animate="visible"
          />
        )}
    </svg>
  );
};

// --- NEW "One by One" Cycling Animation ---
const DefinitionCyclingAnimation: React.FC = () => {
  const [index, setIndex] = useState(0);
  const { isDarkMode } = useThemeContext();
  const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';

  const definitions = [
    { name: 'Angle', type: 'angle' as const },
    { name: 'Parallel', type: 'parallel' as const },
    { name: 'Perpendicular', type: 'perpendicular' as const },
    { name: 'Polygon', type: 'polygon' as const },
  ];

  const current = definitions[index];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % definitions.length);
    }, 3000); // Cycle every 3 seconds
    return () => clearTimeout(timer);
  }, [index, definitions.length]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg min-h-[160px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {/* This div ensures the icon re-renders and re-animates */}
          <div className="min-h-[60px] flex items-center justify-center">
            <VisualIcon type={current.type} />
          </div>
          <p className="font-semibold text-lg mt-2" style={{ color: textColor }}>
            {current.name}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
// --- END of new component ---


export default function IntroToEuclideanGeometrySlide4() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]); // Two questions
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'geometry-definitions-quiz',
      conceptId: 'geometry-definitions',
      conceptName: 'Geometry Definitions Quiz',
      type: 'judging',
      description: 'Testing understanding of complex geometry definitions'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  const questions: QuizQuestion[] = [
    {
      id: 'angle-q1',
      question: 'What is formed by two rays that share a common endpoint?',
      options: [ 'An Angle', 'A Polygon', 'Parallel Lines', 'A Line Segment' ],
      correctAnswer: 'An Angle',
      explanation: 'Correct! The common endpoint is called the vertex, and the two rays are the sides of the angle.'
    },
    {
      id: 'parallel-q2',
      question: 'What do we call two lines on a plane that never intersect?',
      options: [ 'Perpendicular Lines', 'Parallel Lines', 'A Polygon', 'Rays' ],
      correctAnswer: 'Parallel Lines',
      explanation: "Correct! Parallel lines (like ||) always stay the same distance apart, so they'll never cross."
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const handleQuizAnswer = (answerText: string) => {
    if (showFeedback || isQuizComplete) return;
    setSelectedAnswer(answerText);
    setShowFeedback(true);
    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);
    handleInteractionComplete({
      interactionId: `geometry-definitions-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText, isCorrect, timestamp: Date.now(),
      conceptId: 'geometry-definitions', conceptName: 'Geometry Definitions Quiz',
      conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
      question: { type: 'mcq', question: current.question, options: current.options }
    });
  };

  const handleNextQuestion = () => {
    const newAnswered = [...questionsAnswered];
    newAnswered[currentQuestionIndex] = true;
    setQuestionsAnswered(newAnswered);
    setSelectedAnswer('');
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Using Our New Terms</h2>
            <p className="text-lg leading-relaxed">
              Now we can combine our basic "words" to define more complex ideas.
            </p>
            {/* --- ANIMATED LIST --- */}
            <motion.ul
              className="mt-4 space-y-4 text-lg"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2 text-xl">∠</span>
                <span>
                  <strong>Angle:</strong> Formed by two <strong>rays</strong> that share a common endpoint (called the vertex).
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: The corner of a book. We measure angles in degrees (°).</em>
                </span>
              </motion.li>
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2 text-xl">||</span>
                <span>
                  <strong>Parallel Lines:</strong> Two <strong>lines</strong> on a <strong>plane</strong> that never meet.
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: Railroad tracks. They always stay the same distance apart.</em>
                </span>
              </motion.li>
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2 text-xl">⊥</span>
                <span>
                  <strong>Perpendicular Lines:</strong> Two <strong>lines</strong> that intersect at a perfect {"90^\\circ"} <strong>angle</strong>.
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: The corner of a window, where a wall meets the floor.</em>
                </span>
              </motion.li>
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2 text-xl">⬠</span>
                <span>
                  <strong>Polygon:</strong> A <strong>closed</strong> shape on a <strong>plane</strong> made of straight <strong>line segments</strong>.
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: A stop sign (an octagon) or a slice of pizza (a triangle).</em>
                </span>
              </motion.li>
            </motion.ul>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing Definitions</h3>
            
            {/* --- GRID REPLACED WITH "ONE BY ONE" ANIMATION --- */}
            <div className="text-center mt-4">
              <DefinitionCyclingAnimation />
            </div>
            {/* --- END OF REPLACEMENT --- */}

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              These new terms are all built from the basic "words" you already know!
            </p>
          </div>

          {/* --- QUIZ CARD WITH ANIMATIONS --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
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
                      ? 'bg-blue-500' // Active
                      : questionsAnswered[index]
                      ? 'bg-blue-300 dark:bg-blue-800' // Answered
                      : 'bg-slate-300 dark:bg-slate-600' // Unanswered
                  }`}
                />
              ))}
            </div>

            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, idx) => {
                    const disabled = showFeedback;
                    const selected = selectedAnswer === option;
                    const correct = option === questions[currentQuestionIndex].correctAnswer;
                    
                    // --- Animation and Styling Logic ---
                    const isSelectedCorrect = showFeedback && selected && correct;
                    const isSelectedIncorrect = showFeedback && selected && !correct;
                    const isCorrectUnselected = showFeedback && !selected && correct;

                    let animateProps = {};
                    if (isSelectedCorrect) {
                      animateProps = { scale: [1, 1.05, 1], transition: { duration: 0.3 } };
                    } else if (isSelectedIncorrect) {
                      animateProps = { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4, ease: "easeInOut" } };
                    }
                    
                    let buttonStyle = 'border-slate-300 dark:border-slate-600 hover:border-blue-400'; // Default
                    if (showFeedback) {
                      if (isSelectedCorrect) {
                        buttonStyle = 'border-green-500 bg-green-50 dark:bg-green-900/30';
                      } else if (isSelectedIncorrect) {
                        buttonStyle = 'border-red-500 bg-red-50 dark:bg-red-900/30';
                      } else if (isCorrectUnselected) {
                        buttonStyle = 'border-green-500 bg-green-50 dark:bg-green-900/30 opacity-70';
                      } else {
                        buttonStyle = 'border-slate-300 dark:border-slate-600 opacity-50'; // Other incorrect
                      }
                    } else if (selected) {
                      buttonStyle = 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'; // Selected, pre-submit
                    }

                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${buttonStyle} ${
                      disabled && !selected ? 'opacity-50' : ''
                    } ${disabled ? 'cursor-default' : 'cursor-pointer'}`;
                    // --- END of new logic ---

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleQuizAnswer(option)}
                        disabled={disabled}
                        className={className}
                        animate={animateProps} // Apply shake or pop animation
                        whileHover={!disabled ? { scale: 1.02 } : {}}
                        whileTap={!disabled ? { scale: 0.98 } : {}}
                      >
                        {option}
                      </motion.button>
                    );
                  })}
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
                      <div className="text-lg text-slate-700 dark:text-slate-300 mb-4">
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
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You\'ve mastered the definitions!' : 'Great job!'}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="geometric-definitions"
      slideTitle="Geometric Definitions Example"
      moduleId="performing-transformations"
      submoduleId="intro-to-euclidean-geometry"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}