import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Re-usable variants for definition lists ---
// (No longer used for the first card, but kept for Card 2 and 3)
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

// --- Animation Variants (used by both animations) ---
const arrowheadVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};
const endpointVariant = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 15, delay: 0.2 } },
  exit: { opacity: 0, scale: 0, transition: { duration: 0.3 } },
};

// --- NEW BuildingBlocksAnimation Component ---
export const BuildingBlocksAnimation: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const [index, setIndex] = useState(0);
  const geoTypes = [
    { name: 'Point', label: 'Point: An exact location in space.' },
    { name: 'Line', label: 'Line: A straight path, endless in both directions.' },
    { name: 'Line Segment', label: 'Line Segment: A part of a line with two endpoints.' },
    { name: 'Ray', label: 'Ray: Starts at one point and goes on forever.' },
    { name: 'Plane', label: 'Plane: A flat surface, endless in all directions.' },
  ];

  const currentType = geoTypes[index];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % geoTypes.length);
    }, 3000); // Cycle every 3 seconds
    return () => clearTimeout(timer);
  }, [index, geoTypes.length]);

  const lineColor = isDarkMode ? '#60a5fa' : '#2563eb';
  const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
  const endpointColor = isDarkMode ? '#94a3b8' : '#64748b';
  const planeColor = isDarkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(37, 99, 235, 0.1)';
  
  const yPos = 35; // Center Y in a 0 0 200 70 viewbox
  const startX = 30;
  const endX = 170;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg min-h-[300px] flex flex-col justify-center">
       <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400 text-center">
        The Building Blocks of Geometry
      </h2>
      <div className="flex flex-col items-center justify-center w-full min-h-[150px] bg-slate-100 dark:bg-slate-700/60 p-4 rounded-lg overflow-hidden">
        <svg viewBox="0 0 200 70" className="w-full h-20 mb-2">
          <AnimatePresence mode="wait">
            {/* --- POINT --- */}
            {currentType.name === 'Point' && (
              <motion.g key="point">
                <motion.circle 
                  cx="100" 
                  cy={yPos} 
                  r="5" 
                  fill={lineColor}
                  variants={endpointVariant} initial="hidden" animate="visible" exit="exit"
                />
                <motion.text
                  x="100" y={yPos + 20}
                  fontSize="12" fill={textColor}
                  textAnchor="middle"
                  variants={arrowheadVariant} initial="hidden" animate="visible" exit="exit"
                >
                  P
                </motion.text>
              </motion.g>
            )}
            {/* --- LINE --- */}
            {currentType.name === 'Line' && (
              <motion.g key="line">
                <motion.line 
                  x1={startX} y1={yPos} x2={endX} y2={yPos} 
                  stroke={lineColor} strokeWidth="3" 
                  initial={{pathLength: 0}} animate={{pathLength: 1}} transition={{duration: 0.8}}
                />
                <motion.polygon
                  points={`${startX},${yPos} ${startX + 10},${yPos - 5} ${startX + 10},${yPos + 5}`}
                  fill={lineColor}
                  variants={arrowheadVariant} initial="hidden" animate="visible" exit="exit"
                />
                <motion.polygon
                  points={`${endX},${yPos} ${endX - 10},${yPos - 5} ${endX - 10},${yPos + 5}`}
                  fill={lineColor}
                  variants={arrowheadVariant} initial="hidden" animate="visible" exit="exit"
                />
              </motion.g>
            )}
            {/* --- LINE SEGMENT --- */}
            {currentType.name === 'Line Segment' && (
              <motion.g key="segment">
                <motion.line 
                  x1={startX} y1={yPos} x2={endX} y2={yPos} 
                  stroke={lineColor} strokeWidth="3" 
                  initial={{pathLength: 0}} animate={{pathLength: 1}} transition={{duration: 0.8}}
                />
                <motion.circle cx={startX} cy={yPos} r="4" fill={endpointColor}
                  variants={endpointVariant} initial="hidden" animate="visible" exit="exit"
                />
                 <motion.circle cx={endX} cy={yPos} r="4" fill={endpointColor}
                  variants={endpointVariant} initial="hidden" animate="visible" exit="exit"
                />
              </motion.g>
            )}
            {/* --- RAY --- */}
            {currentType.name === 'Ray' && (
              <motion.g key="ray">
                <motion.line 
                  x1={startX} y1={yPos} x2={endX} y2={yPos} 
                  stroke={lineColor} strokeWidth="3" 
                  initial={{pathLength: 0}} animate={{pathLength: 1}} transition={{duration: 0.8}}
                />
                 <motion.circle cx={startX} cy={yPos} r="4" fill={endpointColor}
                   variants={endpointVariant} initial="hidden" animate="visible" exit="exit"
                  />
                <motion.polygon
                  points={`${endX},${yPos} ${endX - 10},${yPos - 5} ${endX - 10},${yPos + 5}`}
                  fill={lineColor}
                  variants={arrowheadVariant} initial="hidden" animate="visible" exit="exit"
                />
              </motion.g>
            )}
            {/* --- PLANE --- */}
            {currentType.name === 'Plane' && (
              <motion.g key="plane">
                <motion.polygon
                  points="50,10 190,20 150,60 10,50"
                  fill={planeColor}
                  stroke={lineColor}
                  strokeWidth="2"
                  variants={endpointVariant} initial="hidden" animate="visible" exit="exit"
                />
                 <motion.text
                  x="170" y={28}
                  fontSize="12" fill={textColor}
                  textAnchor="middle"
                  variants={arrowheadVariant} initial="hidden" animate="visible" exit="exit"
                >
                  R
                </motion.text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentType.name}
            className="text-sm text-center font-semibold mt-1 h-10" // Added h-10 for layout consistency
            style={{ color: textColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentType.label}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};


// --- LineTypesAnimation Component (UNCHANGED) ---
export const LineTypesAnimation: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const [index, setIndex] = useState(0);
  const lineTypes = [
    { name: 'Line', label: 'Line: Goes on forever in both directions.' },
    { name: 'Line Segment', label: 'Line Segment: Has two clear endpoints.' },
    { name: 'Ray', label: 'Ray: Starts at one point and goes forever in one direction.' },
  ];

  const currentType = lineTypes[index];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % lineTypes.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [index, lineTypes.length]);

  const lineColor = isDarkMode ? '#60a5fa' : '#2563eb';
  const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
  const endpointColor = isDarkMode ? '#94a3b8' : '#64748b';

  const yPos = 25;
  const startX = 20;
  const endX = 180;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[120px] bg-slate-100 dark:bg-slate-700/60 p-4 rounded-lg overflow-hidden">
      <svg viewBox="0 0 200 50" className="w-full h-12 mb-2">
        <line x1={startX} y1={yPos} x2={endX} y2={yPos} stroke={lineColor} strokeWidth="3" />
        <AnimatePresence mode="wait">
          {currentType.name === 'Line' && (
            <motion.g key="line-ends">
              <motion.polygon
                points={`${startX},${yPos} ${startX + 10},${yPos - 5} ${startX + 10},${yPos + 5}`}
                fill={lineColor}
                variants={arrowheadVariant} initial="hidden" animate="visible" exit="exit"
              />
              <motion.polygon
                points={`${endX},${yPos} ${endX - 10},${yPos - 5} ${endX - 10},${yPos + 5}`}
                fill={lineColor}
                variants={arrowheadVariant} initial="hidden" animate="visible" exit="exit"
              />
            </motion.g>
          )}
          {currentType.name === 'Line Segment' && (
            <motion.g key="segment-ends">
              <motion.circle cx={startX} cy={yPos} r="4" fill={endpointColor}
               variants={endpointVariant} initial="hidden" animate="visible" exit="exit"
              />
               <motion.circle cx={endX} cy={yPos} r="4" fill={endpointColor}
               variants={endpointVariant} initial="hidden" animate="visible" exit="exit"
              />
            </motion.g>
          )}
          {currentType.name === 'Ray' && (
            <motion.g key="ray-ends">
               <motion.circle cx={startX} cy={yPos} r="4" fill={endpointColor}
                 variants={endpointVariant} initial="hidden" animate="visible" exit="exit"
                />
              <motion.polygon
                points={`${endX},${yPos} ${endX - 10},${yPos - 5} ${endX - 10},${yPos + 5}`}
                fill={lineColor}
                variants={arrowheadVariant} initial="hidden" animate="visible" exit="exit"
              />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentType.name}
          className="text-sm text-center font-semibold mt-1"
          style={{ color: textColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentType.label}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
// --- END OF LineTypesAnimation ---


export default function IntroToEuclideanGeometrySlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'geometry-terms-quiz',
      conceptId: 'geometry-vocabulary',
      conceptName: 'Geometry Vocabulary Quiz',
      type: 'judging',
      description: 'Testing understanding of basic geometry terms'
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
      id: 'point-line-q1',
      question: 'What is a straight path that goes on forever in BOTH directions?',
      options: [ 'Point', 'Line', 'Line Segment', 'Ray' ],
      correctAnswer: 'Line',
      explanation: 'Correct! A Line (like ⃡AB) is a 1D path that extends infinitely in both directions.'
    },
    {
      id: 'ray-segment-q2',
      question: 'What do we call a piece of a line with ONE endpoint?',
      options: [ 'Line', 'Line Segment', 'Ray', 'Plane' ],
      correctAnswer: 'Ray',
      explanation: "Correct! A Ray (like ⃗AB) starts at one point (A) and goes on forever in one direction (through B)."
    },
    {
      id: 'collinear-q3',
      question: 'If three points all lie on the exact same straight line, what do we call them?',
      options: [ 'Coplanar', 'Collinear', 'Line Segments', 'Planes' ],
      correctAnswer: 'Collinear',
      explanation: 'Correct! "Co-linear" just means "together on the same line." Great job!'
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
      interactionId: `geometry-terms-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText, isCorrect, timestamp: Date.now(),
      conceptId: 'geometry-vocabulary', conceptName: 'Geometry Vocabulary Quiz',
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
        <div className="space-y-6 flex flex-col">

          {/* --- CARD 1 - REPLACED WITH ANIMATION --- */}
          <BuildingBlocksAnimation />

          {/* --- CARD 2 - CONTENT UNCHANGED (for now) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">How Points Fit Together 📍</h3>
            <p className="text-lg leading-relaxed">
              Let's see what we call points when they share a space.
            </p>
            <motion.ul
              className="mt-4 space-y-4 text-lg"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2">→</span>
                <span>
                  <strong>Collinear Points:</strong> Points that all lie on the <strong>exact same straight line</strong>. ("Co" means together, "linear" means line.)
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: Beads on a straight string or keys in a single row on a keyboard.</em>
                </span>
              </motion.li>
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2">□</span>
                <span>
                  <strong>Coplanar Points:</strong> Points that all lie on the <strong>exact same flat plane</strong>. ("Co" means together, "planar" means plane.)
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: All the apps on your phone's home screen or magnets on a refrigerator door.</em>
                </span>
              </motion.li>
            </motion.ul>
          </div>

          {/* --- CARD 3 - CONTENT UNCHANGED (for now) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">How Lines Meet 🤝</h3>
            <p className="text-lg leading-relaxed">
              When two lines exist on the same plane, they can relate in two main ways.
            </p>
            <motion.ul
              className="mt-4 space-y-4 text-lg"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2 text-xl">✕</span>
                <span>
                  <strong>Intersecting Lines:</strong> Two lines that cross each other at <strong>one single point</strong>.
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: Where two roads cross on a map or the letter "X".</em>
                </span>
              </motion.li>
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2 text-xl">||</span>
                <span>
                  <strong>Parallel Lines:</strong> Two lines on the same plane that are <strong>always</strong> the same distance apart. They will <strong>never</strong> touch.
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: The two sides of a ladder or the lines on notebook paper.</em>
                </span>
              </motion.li>
            </motion.ul>
          </div>

        </div>

        {/* Right Column - Animated Visual Comparison and Quiz (UNCHANGED) */}
        <div className="space-y-6 flex flex-col">

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-4E0 text-center">See the Difference! 👀</h3>

            <LineTypesAnimation />

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
              <h4 className="font-semibold mb-2">Notation uses arrows to show direction:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Line {"\overleftrightarrow{AB}"}:</strong> Arrows on <strong>both ends</strong>.</li>
                <li><strong>Line Segment {"\overline{AB}"}:</strong> <strong>No arrows</strong>, just a bar.</li>
                <li><strong>Ray {"\overrightarrow{AB}"}:</strong> An arrow on <strong>one end</strong>.</li>
              </ul>
            </div>
          </div>

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
                      ? 'bg-blue-500'
                      : questionsAnswered[index]
                      ? 'bg-blue-300 dark:bg-blue-800'
                      : 'bg-slate-300 dark:bg-slate-600'
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
                    
                    // --- NEW Animation and Styling Logic ---
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
                        buttonStyle = 'border-red-500 bg-red-50 dark:bg-red-900/3D';
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
                      // Updated feedback box colors to green/red
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
                <div className="text-3xl mb-4">📝</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You\'re a vocabulary expert!' : 'Great job!'}
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
      slideId="terms-and-labels"
      slideTitle="Terms & Labels in Geometry"
      moduleId="performing-transformations"
      submoduleId="intro-to-euclidean-geometry"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}