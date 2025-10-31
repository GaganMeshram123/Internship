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

// --- NEW RotationRulesAnimation Component ---
const RotationRulesAnimation: React.FC = () => {
  const [index, setIndex] = useState(0);
  const { isDarkMode } = useThemeContext();

  const rules = [
    { name: "90° CCW", angleIcon: "↺", angle: "90°", rule: "(-y, x)", color: "text-green-500", quadrant: "(e.g., Q2)" },
    { name: "180°", angleIcon: "↻/↺", angle: "180°", rule: "(-x, -y)", color: "text-yellow-500", quadrant: "(e.g., Q3)" },
    { name: "270° CCW", angleIcon: "↺", angle: "270°", rule: "(y, -x)", color: "text-red-500", quadrant: "(e.g., Q4)" }
  ];
  const current = rules[index];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % rules.length);
    }, 3000); // Cycle every 3 seconds
    return () => clearTimeout(timer);
  }, [index, rules.length]);

  return (
    <div className="flex items-center justify-center space-x-4 text-center mt-6 p-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg min-h-[160px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={current.name}
          className="flex w-full items-center justify-around"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          {/* Block 1: Pre-Image */}
          <div className="flex flex-col items-center w-1/3">
            <span className="text-2xl font-mono">(x, y)</span>
            <p className="font-semibold text-lg mt-2">Pre-Image</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">(e.g., Q1)</p>
          </div>
          
          {/* Block 2: Arrow */}
          <div className={`flex flex-col items-center ${current.color}`}>
            <span className="text-3xl font-bold">{current.angleIcon}</span>
            <p className="text-sm font-semibold">{current.angle}</p>
          </div>
          
          {/* Block 3: Image */}
          <div className="flex flex-col items-center w-1/3">
            <span className="text-2xl font-mono">{current.rule}</span>
            <p className="font-semibold text-lg mt-2">Image</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{current.quadrant}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
// --- END of RotationRulesAnimation Component ---


export default function IntroToRigidTransformationsSlide4() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'rotation-intro-quiz',
      conceptId: 'rotation-definition',
      conceptName: 'Rotation Definition',
      type: 'judging',
      description: 'Testing understanding of rotation as a turn'
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
      id: 'rotation-definition-q1',
      question: 'A rotation is often called a...?',
      options: [ 'Turn', 'Flip', 'Slide', 'Resize' ],
      correctAnswer: 'Turn',
      explanation: "You got it! A rotation is a 'turn' around a fixed center point, like the hands of a clock."
    },
    {
      id: 'rotation-rule-q2',
      question: 'A point is at (2, 3). Where will it be after a 180° rotation around the origin?',
      options: [ '(3, 2)', '(-2, 3)', '(3, -2)', '(-2, -3)' ],
      correctAnswer: '(-2, -3)',
      explanation: 'Correct! For a 180° rotation, the rule is (x, y) → (-x, -y), so (2, 3) becomes (-2, -3).'
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
      interactionId: `rotation-intro-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText, isCorrect, timestamp: Date.now(),
      conceptId: 'rotation-definition', conceptName: 'Rotation Definition',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Rigid Move 2: Rotation</h2>
            <p className="text-lg leading-relaxed">
              A <strong>Rotation</strong> is the formal name for a "turn."
            </p>
            <p className="text-lg leading-relaxed mt-4">
              A rotation turns a figure a certain number of degrees around a fixed point, called the <strong>center of rotation</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              The shape's <strong>orientation</strong> (which way it's facing) will change.
            </p>
            <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
              Think: The hands on a clock ⏰ or a spinning Ferris wheel 🎡.
            </em>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">What You Need to Rotate</h3>
            <p className="text-lg leading-relaxed">
              To perform a rotation, you must be given three pieces of information:
            </p>
            {/* --- ANIMATED LIST 1 --- */}
            <motion.ul
              className="mt-4 space-y-2 text-lg"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2">1.</span>
                <span><strong>Center of Rotation:</strong> The point you are turning *around* (e.g., the origin (0,0)).</span>
              </motion.li>
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2">2.</span>
                <span><strong>Angle of Rotation:</strong> How far to turn (e.g., 90°, 180°).</span>
              </motion.li>
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2">3.</span>
                <span><strong>Direction:</strong> Clockwise ↻ or Counter-clockwise ↺. (In math, <strong>counter-clockwise is the default!</strong>)</span>
              </motion.li>
            </motion.ul>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Common Rotation Rules (around origin 0,0)</h4>
              {/* --- ANIMATED LIST 2 --- */}
              <motion.ul
                className="list-disc list-inside mt-2 text-lg space-y-1 font-mono"
                variants={listContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.li variants={listItemVariants}><strong>90° CCW (↺):</strong> (x, y) → (-y, x)</motion.li>
                <motion.li variants={listItemVariants}><strong>180° (↻ or ↺):</strong> (x, y) → (-x, -y)</motion.li>
                <motion.li variants={listItemVariants}><strong>270° CCW (↺):</strong> (x, y) → (y, -x)</motion.li>
              </motion.ul>
            </div>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          {/* --- CARD UPDATED WITH ANIMATION --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing The Rules</h3>
            
            {/* --- STATIC DIAGRAM REPLACED --- */}
            <RotationRulesAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Notice how the coordinates swap for 90°/270°, but only flip signs for 180°.
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
                  {score === questions.length ? 'You\'re ready to rotate!' : 'Great job!'}
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
      slideId="rotations-intro"
      slideTitle="Rotations Intro"
      moduleId="performing-transformations"
      submoduleId="introduction-to-rigid-transformations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}