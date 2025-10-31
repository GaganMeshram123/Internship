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

// --- NEW "One by One" Animation Component ---
const RigidMovesAnimation: React.FC = () => {
  const [index, setIndex] = useState(0);
  const { isDarkMode } = useThemeContext();
  const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
  const preImageColor = isDarkMode ? "rgb(37 99 235 / 0.4)" : "rgb(59 130 246 / 0.4)"; // Blue with opacity
  const imageColor = "rgb(34 197 94)"; // Green

  const moves = [
    { 
      name: 'Translation (Slide)', 
      animation: { x: 100 },
      transition: { type: 'spring', stiffness: 50 }
    },
    { 
      name: 'Rotation (Turn)', 
      animation: { rotate: 90, x: 80, y: 20 }, // x/y to position it
      transition: { type: 'spring', stiffness: 50 }
    },
    { 
      name: 'Reflection (Flip)', 
      animation: { scaleX: -1, x: 120 }, // x to position it
      transition: { type: 'spring', stiffness: 50 }
    }
  ];
  const current = moves[index];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % moves.length);
    }, 3000); // Cycle every 3 seconds
    return () => clearTimeout(timer);
  }, [index, moves.length]);
  
  // Using an L-shape to make orientation changes clear
  const shapePath = "M 0 0 L 40 0 L 40 20 L 20 20 L 20 40 L 0 40 Z";

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-slate-100 dark:bg-slate-700/60 rounded-lg min-h-[190px] overflow-hidden">
      <div className="w-full h-28 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="100%" height="100%" viewBox="0 0 200 100">
              {/* Pre-Image (Blue) */}
              <path d={shapePath} fill={preImageColor} transform="translate(30, 30)" />
              
              {/* Reflection Line (only for reflection) */}
              {current.name.includes('Reflection') && (
                <motion.line
                  x1="100" y1="10" x2="100" y2="90"
                  stroke={isDarkMode ? "#fff" : "#000"}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 0.2 }}
                />
              )}
              
              {/* Animated Image (Green) */}
              <motion.path
                d={shapePath}
                fill={imageColor}
                transform="translate(30, 30)" // Start at same spot
                transformOrigin="30 30" // Rotate around top-left
                initial={{ x: 0, y: 0, rotate: 0, scaleX: 1 }}
                animate={current.animation}
                transition={current.transition}
              />
            </svg>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Text Area */}
      <div className="h-10 w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name + "text"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
          >
            <p className="font-semibold text-lg" style={{ color: textColor }}>{current.name}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
// --- END of Animation Component ---


export default function IntroToRigidTransformationsSlide1() {
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
      id: 'rigid-transformation-quiz',
      conceptId: 'rigid-transformation-definition',
      conceptName: 'Rigid Transformation Definition',
      type: 'judging',
      description: 'Testing understanding of rigid transformations and congruence'
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
      id: 'rigid-property-q1',
      question: 'What is the key property of a rigid transformation?',
      options: [
        'It changes the shape, not the size',
        'It changes the size, not the shape',
        'It preserves both size and shape',
        'It changes both size and shape'
      ],
      correctAnswer: 'It preserves both size and shape',
      explanation: "Correct! 'Rigid' means the shape doesn't bend, stretch, or shrink. The pre-image and image are congruent."
    },
    {
      id: 'transformation-type-q2',
      question: "Which 'rigid move' is a 'slide'?",
      options: [ 'Translation', 'Rotation', 'Reflection', 'Isometry' ],
      correctAnswer: 'Translation',
      explanation: "Correct! A Translation simply slides a figure to a new location without turning or flipping it."
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
      interactionId: `rigid-transformation-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText, isCorrect, timestamp: Date.now(),
      conceptId: 'rigid-transformation-definition', conceptName: 'Rigid Transformation Definition',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Moves That Don't Change Shape</h2>
            <p className="text-lg leading-relaxed">
              A <strong>Rigid Transformation</strong> (also called an <strong>Isometry</strong>) is a move that preserves the size and shape of a figure.
            </p>
            <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
              Think: Moving a stiff piece of cardboard. You can slide it, turn it, or flip it, but the cardboard itself doesn't stretch or shrink.
            </em>
            <p className="text-lg leading-relaxed mt-4">
              This means two key things are preserved:
            </p>
            {/* --- ANIMATED LIST 1 --- */}
            <motion.ul
              className="mt-4 space-y-2 text-lg"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2">✓</span>
                <span><strong>Distance:</strong> The lengths of all sides stay the same.</span>
              </motion.li>
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2">✓</span>
                <span><strong>Angle Measures:</strong> All the angles stay the same.</span>
              </motion.li>
            </motion.ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Congruent Figures</h3>
            <p className="text-lg leading-relaxed">
              Because size and shape are preserved, the pre-image (original) and the image (new figure) are <strong>congruent</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              The symbol for congruent is ≅. We can say △ABC ≅ △A'B'C'.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              The 3 types of rigid transformations are:
            </p>
            {/* --- ANIMATED LIST 2 --- */}
            <motion.ul
              className="mt-4 space-y-3 text-lg list-disc list-inside"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li variants={listItemVariants}><strong>Translation</strong> (a <strong>"slide"</strong> ➡️)</motion.li>
              <motion.li variants={listItemVariants}><strong>Rotation</strong> (a <strong>"turn"</strong> 🔄)</motion.li>
              <motion.li variants={listItemVariants}><strong>Reflection</strong> (a <strong>"flip"</strong> 🪞)</motion.li>
            </motion.ul>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Three "Rigid Moves"</h3>
            
            {/* --- STATIC GRID REPLACED WITH "ONE BY ONE" ANIMATION --- */}
            <div className="mt-6">
              <RigidMovesAnimation />
            </div>
            {/* --- END OF REPLACEMENT --- */}

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Notice how the new shape (image) is always congruent (≅) to the original (pre-image).
            </p>
          </div>

          {/* --- QUIZ CARD (with animations) --- */}
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
                      buttonStyle = 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'; // FIX: Removed typo /3D
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
                  {score === questions.length ? 'Perfect! You\'re a rigid transformation expert!' : 'Great job!'}
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
      slideId="rigid-intro"
      slideTitle="Rigid Transformations Intro"
      moduleId="performing-transformations"
      submoduleId="introduction-to-rigid-transformations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}