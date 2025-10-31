import React, { useState } from 'react';
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
      staggerChildren: 0.2, // A bit slower for steps
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

// --- NEW Animation Component for the Quiz ---
const TransformationQuizAnimation = ({ type }: { type: 'translation' | 'rotation' | 'reflection' | 'dilation' }) => {
  const { isDarkMode } = useThemeContext();
  const preImageColor = isDarkMode ? "rgb(37 99 235 / 0.5)" : "rgb(59 130 246 / 0.5)"; // Blue with opacity
  const imageColor = "rgb(34 197 94)"; // Green
  
  // Using an L-shape to make orientation changes (rotation/reflection) obvious
  const shapePath = "M 20 20 L 80 20 L 80 40 L 40 40 L 40 80 L 20 80 Z";
  
  const animationProps = {
    translation: {
      animate: { x: 80, y: 20 },
      transition: { type: 'spring', stiffness: 50, duration: 1 }
    },
    rotation: {
      animate: { rotate: 90, scale: 1 }, // Added scale to fix framer-motion bug
      transition: { type: 'spring', stiffness: 50, duration: 1 }
    },
    reflection: {
      animate: { scaleX: -1 },
      transition: { type: 'spring', stiffness: 50, duration: 1 }
    },
    dilation: {
      animate: { scale: 1.5 },
      transition: { type: 'spring', stiffness: 50, duration: 1 }
    }
  };

  return (
    <div className="flex justify-center items-center mb-4 w-full h-48 bg-slate-100 dark:bg-slate-700/60 rounded-lg overflow-hidden">
      <svg width="200" height="150" viewBox="0 0 200 150">
        {/* Center crosshair */}
        <line x1="100" y1="0" x2="100" y2="150" stroke={isDarkMode ? "#475569" : "#cbd5e1"} strokeWidth="1" />
        <line x1="0" y1="75" x2="200" y2="75" stroke={isDarkMode ? "#475569" : "#cbd5e1"} strokeWidth="1" />
        
        <g transform="translate(60, 30)"> {/* Move group to a better starting position */}
          {/* Pre-Image (Blue) */}
          <path d={shapePath} fill={preImageColor} />
          
          {/* Animated Image (Green) */}
          <motion.path
            d={shapePath}
            fill={imageColor}
            transformOrigin="20 20" // Set transform origin to the corner of the shape
            initial={{ x: 0, y: 0, rotate: 0, scale: 1, scaleX: 1 }}
            animate={animationProps[type].animate}
            transition={animationProps[type].transition}
          />

          {/* Reflection Line (only for reflection) */}
          {type === 'reflection' && (
             <motion.line 
                x1="-10" y1="0" x2="-10" y2="100" 
                stroke={isDarkMode ? "#fff" : "#000"} 
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{opacity: 0}}
                animate={{opacity: 0.5}}
                transition={{delay: 0.2}}
             />
          )}
        </g>
      </svg>
    </div>
  );
};
// --- END of Animation Component ---


export default function IntroToRigidTransformationsSlide5() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false, false]); // 4 questions
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'identify-transformation-quiz',
      conceptId: 'transformation-identification',
      conceptName: 'Transformation Identification',
      type: 'judging',
      description: 'Testing ability to identify transformations from images'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    animationType: 'translation' | 'rotation' | 'reflection' | 'dilation'; // Use animationType
  }

  const questions: QuizQuestion[] = [
    {
      id: 'identify-q1-translation',
      question: 'Name This Move: The blue shape moves to become the green shape.',
      options: ['Translation (Slide)', 'Rotation (Turn)', 'Reflection (Flip)', 'Dilation (Resize)'],
      correctAnswer: 'Translation (Slide)',
      explanation: 'Correct! The shape just slid to a new position. That\'s a Translation.',
      animationType: 'translation' // Changed from image
    },
    {
      id: 'identify-q2-rotation',
      question: 'Name This Move: The blue shape moves to become the green shape.',
      options: ['Translation (Slide)', 'Rotation (Turn)', 'Reflection (Flip)', 'Dilation (Resize)'],
      correctAnswer: 'Rotation (Turn)',
      explanation: 'Correct! The shape turned around a center point. That\'s a Rotation.',
      animationType: 'rotation' // Changed from image
    },
    {
      id: 'identify-q3-reflection',
      question: 'Name This Move: The blue shape moves to become the green shape.',
      options: ['Translation (Slide)', 'Rotation (Turn)', 'Reflection (Flip)', 'Dilation (Resize)'],
      correctAnswer: 'Reflection (Flip)',
      explanation: 'Correct! The shape flipped over a "mirror line." That\'s a Reflection.',
      animationType: 'reflection' // Changed from image
    },
    {
      id: 'identify-q4-dilation',
      question: 'Name This Move: The blue shape moves to become the green shape.',
      options: ['Translation (Slide)', 'Rotation (Turn)', 'Reflection (Flip)', 'Dilation (Resize)'],
      correctAnswer: 'Dilation (Resize)',
      explanation: 'Correct! The shape changed size. That\'s a Dilation.',
      animationType: 'dilation' // Changed from image
    }
  ];
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const handleQuizAnswer = (answerText: string) => {
    if (showFeedback || isQuizComplete) return;

    setSelectedAnswer(answerText);
    setShowFeedback(true);

    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    handleInteractionComplete({
      interactionId: `identify-transformation-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'transformation-identification',
      conceptName: 'Transformation Identification',
      conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
      question: {
        type: 'mcq',
        question: current.question,
        options: current.options
      }
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto ">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Identify the Transformation</h2>
            <p className="text-lg leading-relaxed">
              Let's put it all together. Look at the pre-image (blue) and the image (green).
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Can you name which of the four moves happened?
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">How to Tell the Difference</h3>
            <p className="text-lg leading-relaxed">Ask yourself these questions in order:</p>
            {/* --- ANIMATED LIST --- */}
            <motion.ul
              className="mt-4 space-y-3 text-lg"
              variants={listContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2">1.</span>
                <div>
                  <strong>Did the size change?</strong>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>YES</strong> → It's a <strong>Dilation (Resize)</strong> 📏</div>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>NO</strong> → Go to question 2...</div>
                </div>
              </motion.li>
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2">2.</span>
                <div>
                  <strong>Did the orientation (facing) change?</strong>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>NO</strong> → It's a <strong>Translation (Slide)</strong> ➡️</div>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>YES</strong> → Go to question 3...</div>
                </div>
              </motion.li>
              <motion.li className="flex items-start" variants={listItemVariants}>
                <span className="font-bold text-blue-500 mr-2">3.</span>
                <div>
                  <strong>Is it a mirror image?</strong>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>YES</strong> → It's a <strong>Reflection (Flip)</strong> 🪞</div>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>NO</strong> → It's a <strong>Rotation (Turn)</strong> 🔄</div>
                </div>
              </motion.li>
            </motion.ul>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

           { <div className="flex space-x-2 mb-6">
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
            </div>}

            {!isQuizComplete ? (
              <>
                {/* --- ANIMATION REPLACES IMAGE --- */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestionIndex} // This makes it re-animate when the question changes
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TransformationQuizAnimation 
                      type={questions[currentQuestionIndex].animationType}
                    />
                  </motion.div>
                </AnimatePresence>
                {/* --- END OF REPLACEMENT --- */}
              
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
                
                {/* --- QUIZ BUTTONS (with animations) --- */}
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
                <div className="text-3xl mb-4">🏆</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'Perfect score! You\'re a transformation identifier!' : 'Great job! 👏'}
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
      slideId="identifying-transformations"
      slideTitle="Identifying Transformations"
      moduleId="performing-transformations"
      submoduleId="introduction-to-rigid-transformations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}