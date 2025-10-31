import React, { useState, useEffect } from 'react'; // Added useEffect
// motion and AnimatePresence are kept for quiz feedback
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- NEW ScaleFactorAnimation Component ---
const ScaleFactorAnimation: React.FC = () => {
  const [index, setIndex] = useState(0);
  const { isDarkMode } = useThemeContext();
  const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
  
  const scaleStates = [
    { name: 'Enlargement', k: 'k > 1', scale: 1.8, color: 'text-green-500', iconScale: 1.5 },
    { name: 'Reduction', k: 'k < 1', scale: 0.5, color: 'text-red-500', iconScale: 0.6 },
    { name: 'Same Size', k: 'k = 1', scale: 1.0, color: 'text-blue-500', iconScale: 1.0 },
  ];
  
  const current = scaleStates[index];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % scaleStates.length);
    }, 3000); // Cycle every 3 seconds
    return () => clearTimeout(timer);
  }, [index, scaleStates.length]);

  const triangleVariant = {
    initial: { scale: 1, opacity: 0.5 },
    animate: (custom: number) => ({
      scale: custom,
      opacity: 1,
      transition: { type: 'spring', duration: 1.5, bounce: 0.3 }
    }),
    exit: { opacity: 0 }
  };

  const textVariant = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-3 bg-slate-100 dark:bg-slate-700/60 rounded-lg min-h-[160px] overflow-hidden">
      <div className="h-16 w-full flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            className="w-full h-full flex items-center justify-center"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* The pre-image (always there) */}
            <span 
              className="text-4xl text-blue-500 opacity-30" 
              style={{ transform: `scale(${current.iconScale})` }} // Use style for non-animated part
            >
              △
            </span>
            
            {/* The animated image */}
            <motion.span
              className={`text-4xl ${current.color} absolute`}
              variants={triangleVariant}
              custom={current.scale} // Pass scale factor to variant
              style={{ transformOrigin: 'center' }}
            >
              △
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="h-12 w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name + "text"}
            className="flex flex-col items-center"
            variants={textVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <p className="font-semibold text-lg" style={{ color: textColor }}>{current.name}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{current.k}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
// --- END of ScaleFactorAnimation Component ---


export default function IntroToRigidTransformationsSlide2() {
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
      id: 'dilation-intro-quiz',
      conceptId: 'dilation-definition',
      conceptName: 'Dilation Definition',
      type: 'judging',
      description: 'Testing understanding of dilations as non-rigid'
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
      id: 'dilation-property-q1',
      question: 'A Dilation is NOT a rigid transformation because it changes the...?',
      options: [
        '...angle measures.',
        '...shape.',
        '...location.',
        '...side lengths (size).'
      ],
      correctAnswer: '...side lengths (size).',
      explanation: "Exactly! A dilation stretches or shrinks the shape, so the side lengths (distance) change. This means it's not 'rigid'."
    },
    {
      id: 'scale-factor-q2',
      question: "What controls *how much* a figure is enlarged or reduced in a dilation?",
      options: [
        'Angle Measure',
        'Scale Factor',
        'Rigid Number',
        'Vertex'
      ],
      correctAnswer: 'Scale Factor',
      explanation: "Correct! The Scale Factor (often called 'k') is the number you multiply the side lengths by."
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
      interactionId: `dilation-intro-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText, isCorrect, timestamp: Date.now(),
      conceptId: 'dilation-definition', conceptName: 'Dilation Definition',
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

        {/* Left Column - Content (UNCHANGED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What About Changing Size?</h2>
            <p className="text-lg leading-relaxed">
              There is another important transformation that is <strong>NOT rigid</strong>: the <strong>Dilation</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              A dilation is a "resize." It changes the <strong>size</strong> of a figure, but not its <strong>shape</strong>.
              <em className="text-lg text-slate-500 dark:text-slate-400 block mt-2">
                Think: Using the 'zoom' feature on a phone camera. 📱
              </em>
            </p>
            <ul className="mt-4 space-y-2 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">✗</span>
                <span><strong>Distance is NOT preserved.</strong> (Side lengths change).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">✓</span>
                <span><strong>Angle Measures ARE preserved.</strong> (The shape stays the same).</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Scale Factor (k)</h4>
              <p className="text-lg mt-2">This "resize" is controlled by a <strong>Scale Factor</strong> (called $k$).</p>
              <ul className="list-disc list-inside mt-2 text-lg space-y-1">
                <li>If k &gt; 1: The shape gets bigger (<strong>Enlargement</strong>).</li>
                <li>If k &lt; 1: The shape gets smaller (<strong>Reduction</strong>).</li>
                <li>If k = 1: The shape stays the same size!</li>
              </ul>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Similar Figures</h3>
            <p className="text-lg leading-relaxed">
              Because a dilation changes the size, the image is <strong>not congruent</strong> to the pre-image.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Instead, the figures are <strong>similar</strong> (symbol: ~). This means they are the same shape, but different sizes.
              <em className="text-lg text-slate-500 dark:text-slate-400 block mt-2">
                Think: A real car and a small toy model of it. 🚗
              </em>
            </p>
            <p className="text-lg leading-relaxed mt-4">
              We'll cover this move in detail in the last submodule!
            </p>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          {/* --- CARD UPDATED WITH ANIMATION --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Understanding Scale Factor (k)</h3>
            
            {/* --- STATIC GRID REPLACED --- */}
            <div className="mt-6">
              <ScaleFactorAnimation />
            </div>
            {/* --- END OF REPLACEMENT --- */}

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The image is always <strong>similar (~)</strong> to the pre-image because the angles never change!
            </p>
          </div>

          {/* --- QUIZ CARD (UNCHANGED, but with typo fixes) --- */}
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

                    // --- TYPO FIX: bg-blue-900/3D -> bg-blue-900/30 ---
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-slate-400 bg-slate-100 dark:bg-slate-800 opacity-70'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
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
                      // --- TYPO FIX: bg-slate-800/3D -> bg-slate-800/30 ---
                      className={`mt-4 p-4 rounded-lg ${
                        selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                          : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700'
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
                <div className="text-3xl mb-4">📏</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You spotted the non-rigid move!' : 'Great job!'}
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
      slideId="dilations-intro"
      slideTitle="Dilations Intro"
      moduleId="performing-transformations"
      submoduleId="introduction-to-rigid-transformations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}