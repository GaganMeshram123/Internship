import React, { useState } from 'react';
// --- useAnimation added ---
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Animation Variants (NO LONGER USED ON CARDS) ---
// const containerVariants = { ... };
// const cardVariants = { ... };

// --- Animation variants for the custom animation component (UNCHANGED) ---
const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (custom: { duration: number; delay: number }) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: 'spring', duration: custom.duration, bounce: 0 },
      opacity: { duration: 0.01 },
      delay: custom.delay,
    },
  }),
};

const pointVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (custom: { delay: number }) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
      delay: custom.delay,
    },
  }),
};

// --- NEW ANIMATION COMPONENT (UNCHANGED) ---
const SimpleTranslationAnimation: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const controls = useAnimation();
  const [isPlaying, setIsPlaying] = useState(false);

  const svgWidth = 400;
  const svgHeight = 200;
  const origin = { x: 50, y: svgHeight - 50 };
  const scale = 30;

  const P = { x: 2, y: 1 };
  const P_prime = { x: 5, y: 0 };

  const toSvg = (p: { x: number; y: number }) => ({
    x: origin.x + p.x * scale,
    y: origin.y - p.y * scale,
  });

  const svgP = toSvg(P);
  const svgP_prime = toSvg(P_prime);

  const gridColor = isDarkMode ? '#475569' : '#cbd5e1';
  const axisColor = isDarkMode ? '#94a3b8' : '#64748b';
  const preImageColor = isDarkMode ? '#60a5fa' : '#2563eb';
  const imageColor = isDarkMode ? '#4ade80' : '#16a34a';
  const vectorColor = isDarkMode ? '#f87171' : '#dc2626';
  const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';

  const handlePlay = async () => {
    setIsPlaying(true);
    await controls.start('hidden');
    await controls.start('visible');
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Grid and Axes */}
        <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke={axisColor} strokeWidth="1" />
        <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} stroke={axisColor} strokeWidth="1" />
        {[...Array(10)].map((_, i) => (
          <line key={`v-${i}`} x1={origin.x + i * scale} y1={0} x2={origin.x + i * scale} y2={svgHeight} stroke={gridColor} strokeWidth="0.5" strokeDasharray="2 2"/>
        ))}
        {[...Array(6)].map((_, i) => (
          <line key={`h-${i}`} x1={0} y1={origin.y - i * scale} x2={svgWidth} y2={origin.y - i * scale} stroke={gridColor} strokeWidth="0.5" strokeDasharray="2 2"/>
        ))}
        <circle cx={origin.x} cy={origin.y} r={3} fill={axisColor} />
        <text x={origin.x - 15} y={origin.y + 15} fontSize="12" fill={textColor}>O</text>

        {/* Static Pre-image */}
        <circle cx={svgP.x} cy={svgP.y} r={5} fill={preImageColor} />
        <text x={svgP.x + 8} y={svgP.y + 5} fontSize="14" fill={preImageColor} fontWeight="bold">
          P(2, 1)
        </text>

        {/* Animated Vector Arrow */}
        <motion.line
          x1={svgP.x} y1={svgP.y}
          x2={svgP_prime.x} y2={svgP_prime.y}
          stroke={vectorColor}
          strokeWidth="2.5"
          variants={drawVariants}
          custom={{ duration: 1.5, delay: 0 }}
          animate={controls}
          initial="hidden"
          markerEnd="url(#arrowhead)"
        />
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={vectorColor} />
          </marker>
        </defs>

        {/* Animated Image Point */}
        <motion.circle
          cx={svgP_prime.x} cy={svgP_prime.y}
          r={5}
          fill={imageColor}
          variants={pointVariants}
          custom={{ delay: 1.0 }}
          animate={controls}
          initial="hidden"
        />
        <motion.text
          x={svgP_prime.x + 8} y={svgP_prime.y + 5}
          fontSize="14"
          fill={imageColor}
          fontWeight="bold"
          variants={pointVariants}
          custom={{ delay: 1.2 }}
          animate={controls}
          initial="hidden"
        >
          P'(5, 0)
        </motion.text>
      </svg>

      {/* Button */}
      <motion.button
        onClick={handlePlay}
        disabled={isPlaying}
        whileHover={{ scale: isPlaying ? 1 : 1.05 }}
        whileTap={{ scale: isPlaying ? 1 : 0.95 }}
        className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transition-colors disabled:opacity-50"
      >
        {isPlaying ? 'Playing...' : 'Play Translation <3, -1>'}
      </motion.button>
    </div>
  );
};
// --- END OF NEW ANIMATION COMPONENT ---


export default function TranslationsSlide1() {
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
      id: 'translating-points-quiz',
      conceptId: 'translating-points',
      conceptName: 'Translating Points',
      type: 'judging',
      description: 'Testing understanding of coordinate rules and vector notation for translations'
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
      id: 'point-translation-rule-q1',
      question: "How would you translate the point P(3, 5) using the rule (x, y) → (x - 2, y + 4)?",
      options: [
        "P'(1, 9)",
        "P'(5, 9)",
        "P'(1, 1)",
        "P'(5, 1)"
      ],
      correctAnswer: "P'(1, 9)",
      explanation: "Correct! We just plug in the numbers: x = 3 - 2 = 1, and y = 5 + 4 = 9. So the new point is P'(1, 9)."
    },
    {
      id: 'point-translation-vector-q2',
      question: "How would you translate the point P(1, 1) using the vector <4, 3>?",
      options: [
        "P'(5, 4)",
        "P'(-3, -2)",
        "P'(5, 1)",
        "P'(1, 4)"
      ],
      correctAnswer: "P'(5, 4)",
      explanation: "Correct! The vector <4, 3> means 'add 4 to x' and 'add 3 to y'. So, 1 + 4 = 5 and 1 + 3 = 4. The new point is P'(5, 4)."
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
      interactionId: `translating-points-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'translating-points',
      conceptName: 'Translating Points',
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
      {/* --- GRID CONTAINER - NO LONGER ANIMATES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">How to "Slide" a Point</h2>
            <p className="text-lg leading-relaxed">
              We describe a translation with a "rule" that tells us how far to move horizontally (x-direction) and vertically (y-direction).
            </p>
            <p className="text-lg leading-relaxed mt-4">
              There are two common ways to write this rule:
            </p>
          </div>

          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">1. Coordinate Rule</h3>
            <p className="text-lg leading-relaxed">
              This rule shows how the $(x, y)$ coordinates change:
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg font-mono text-center">(x, y) → (x + a, y + b)</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <ul className="mt-2 space-y-2 text-lg">
                <li className="flex items-start">
                  <span className="font-bold text-blue-500 mr-2 text-xl">↔</span>
                  <span><strong>$a$ (horizontal):</strong> Positive $a$ is <strong>Right</strong>. Negative $a$ is <strong>Left</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-blue-500 mr-2 text-xl">↕</span>
                  <span><strong>$b$ (vertical):</strong> Positive $b$ is <strong>Up</strong>. Negative $b$ is <strong>Down</strong>.</span>
                </li>
              </ul>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              <strong>Example:</strong> (x, y) → (x + 3, y - 1) means "move 3 units right, and 1 unit down."
            </p>
          </div>

          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">2. Vector Notation</h3>
            <p className="text-lg leading-relaxed">
              A vector is a quantity with direction and magnitude. We write it with angle brackets:
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg font-mono text-center">&lt;a, b&gt;</p>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              <strong>Example:</strong> &lt;3, -1&gt; means "move 3 units right, and 1 unit down."
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Both rules mean the exact same thing!
            </p>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Translating P(2, 1)</h3>

            <SimpleTranslationAnimation />

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Click the button! The point P(2, 1) is translated by the rule &lt;3, -1&gt; to the new point P'(5, 0).
            </p>
          </div>

          {/* --- CARD - NO LONGER ANIMATES --- */}
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

                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // CORRECT
                            : 'border-slate-400 bg-slate-100 dark:bg-slate-800 opacity-70' // INCORRECT
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // Selected
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-400' // Default
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
                          ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' // Correct
                          : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700' // Incorrect
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
                <div className="text-3xl mb-4">🎯</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You\'ve mastered the rules!' : 'Great job!'}
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
      slideId="translating-points"
      slideTitle="Translating Points"
      moduleId="performing-transformations"
      submoduleId="translations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}