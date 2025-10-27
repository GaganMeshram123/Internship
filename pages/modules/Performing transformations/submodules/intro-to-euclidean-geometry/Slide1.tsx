import React, { useState } from 'react';
// Import useAnimation from framer-motion
import { motion, AnimatePresence, useAnimation } from 'framer-motion'; 
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function IntroToEuclideanGeometrySlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  // --- ANIMATION CONTROL ADDED ---
  const controls = useAnimation();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const slideInteractions: Interaction[] = [
    {
      id: 'transformation-ready-quiz',
      conceptId: 'transformation-readiness',
      conceptName: 'Transformation Readiness Quiz',
      type: 'judging',
      description: 'Testing understanding of pre-image, image, and coordinate plane'
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
      id: 'name-that-move-q1',
      question: 'Click "Play Slide" and watch the animation. What kind of move is happening?',
      options: [
        'Slide (Translation)',
        'Turn (Rotation)',
        'Flip (Reflection)',
        'Resize (Dilation)'
      ],
      correctAnswer: 'Slide (Translation)',
      explanation: 'Correct! The shape slid to a new position without turning or flipping. This is called a Translation, which we will learn about soon!'
    },
    {
      id: 'name-that-move-q2',
      question: 'What do we call the "map" with an x-axis and y-axis where transformations happen?',
      options: [
        'A Geometry Grid',
        'The Coordinate Plane',
        'A Transformation Sheet',
        'A Shape Box'
      ],
      correctAnswer: 'The Coordinate Plane',
      explanation: 'That\'s right! The coordinate plane is our "map" for all transformations, letting us track shapes using (x, y) coordinates.'
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
      interactionId: `transformation-ready-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'transformation-readiness',
      conceptName: 'Transformation Readiness Quiz',
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

  // --- FUNCTION TO CONTROL ANIMATION ---
  const handlePlay = async () => {
    setIsPlaying(true); // Disable button
    await controls.start({ // 1. Reset to start
      x: 0,
      transition: { duration: 0.1 } 
    });
    await controls.start({ // 2. Play animation
      x: 100,
      transition: { ease: "easeInOut", duration: 1.5 }
    });
    setIsPlaying(false); // Re-enable button
  };

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What Happens When Shapes Move?</h2>
            <p className="text-lg leading-relaxed">
              Have you ever moved a chess piece, zoomed in on a photo, or looked at yourself in a mirror? You've seen transformations in action! 🤩
            </p>
            <p className="text-lg leading-relaxed mt-4">
              In geometry, a <strong>transformation</strong> is a fancy word for a "move" or "change" to a shape.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              We need two key terms to talk about this:
            </p>
            <ul className="mt-4 space-y-2 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">►</span>
                <span><strong>Pre-image:</strong> This is the original shape. The "before."</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-green-500 mr-2">►</span>
                <span><strong>Image:</strong> This is the new shape after the transformation. The "after."</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Transformation Playground 🗺️</h3>
            <p className="text-lg leading-relaxed">
              To move shapes, we need a "map" where all the action happens. This map is the **coordinate plane**!
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Think of it like grid paper with two main lines:
            </p>
            <ul className="mt-4 space-y-2 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-slate-500 mr-2">→</span>
                <span>The <strong>x-axis</strong>: The horizontal (side-to-side) line.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-slate-500 mr-2">↑</span>
                <span>The <strong>y-axis</strong>: The vertical (up-and-down) line.</span>
              </li>
            </ul>
            <p className="text-lg leading-relaxed mt-4">
              We use <strong>coordinates</strong> (like <code>(x, y)</code>) to find the exact location of every point on this map.
            </p>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Before & After: Seeing Transformations</h3>

            <div className="flex justify-center w-full h-32 my-2">
              <svg viewBox="0 0 200 100" className="w-full h-full max-w-xs">
                {/* 1. The "Pre-image" (Blue Triangle) */}
                <polygon 
                  points="20,80 50,20 80,80" 
                  fill={isDarkMode ? "rgb(96 165 250)" : "rgb(37 99 235)"} // blue-400 dark, blue-600 light
                />
                
                {/* 2. The "Image" (Green Triangle) - NOW CONTROLLED BY 'controls' */}
                <motion.g
                  initial={{ x: 0 }} // Start at the beginning
                  animate={controls} // Animate using the controls
                >
                  <polygon 
                    points="20,80 50,20 80,80" 
                    fill={isDarkMode ? "rgb(74 222 128)" : "rgb(34 197 94)"} // green-400 dark, green-500 light
                  />
                </motion.g>
              </svg>
            </div>

            {/* --- BUTTON UPDATED HERE --- */}
            <div className="flex justify-center mt-3 mb-2">
              <motion.button
                onClick={handlePlay}
                disabled={isPlaying}
                className="bg-blue-600 dark:bg-blue-400 text-white dark:text-blue-900 px-5 py-2 rounded-lg font-semibold transition-colors hover:bg-blue-700 dark:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isPlaying ? 1 : 1.05 }}
                whileTap={{ scale: isPlaying ? 1 : 0.95 }}
              >
                {isPlaying ? "Sliding..." : "Play Slide ➡️"}
              </motion.button>
            </div>
            {/* --- END BUTTON --- */}

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Click the button! The blue triangle (<strong>pre-image</strong>) "slides" to a new spot, becoming the green triangle (<strong>image</strong>).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
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
                      ? 'bg-green-500'
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
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-300'
                    } ${disabled ? 'cursor-default' : 'cursor-pointer'}`;

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleQuizAnswer(option)}
                        disabled={disabled}
                        className={className}
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
                      <div className="text-lg text-slate-600 dark:text-slate-400 mb-4">
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
                  {score === questions.length ? 'Perfect! You\'re ready to transform! 📐' : 'Great job! 👏'}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="getting-ready"
      slideTitle="Getting Ready for Transformations"
      moduleId="performing-transformations"
      submoduleId="intro-to-euclidean-geometry"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}