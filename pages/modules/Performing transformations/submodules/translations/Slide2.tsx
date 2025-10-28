import React, { useState } from 'react';
// --- useAnimation added ---
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Animation Variants for card entry (NO LONGER USED ON CARDS) ---
// const containerVariants = { ... };
// const cardVariants = { ... };

// --- Animation variants for the new component (UNCHANGED) ---
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

const textFadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom: { delay: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom.delay,
      duration: 0.5,
    },
  }),
};

// --- NEW ANIMATION COMPONENT (UNCHANGED) ---
export const FindingRuleAnimation: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const controls = useAnimation();
  const [isPlaying, setIsPlaying] = useState(false);

  const svgWidth = 400;
  const svgHeight = 250;
  const origin = { x: svgWidth / 2, y: svgHeight / 2 };
  const scale = 25;

  const A = { x: -2, y: 1 };
  const A_prime = { x: 3, y: -4 };

  const dx = A_prime.x - A.x;
  const dy = A_prime.y - A.y;

  const toSvg = (p: { x: number; y: number }) => ({
    x: origin.x + p.x * scale,
    y: origin.y - p.y * scale,
  });

  const svgA = toSvg(A);
  const svgA_prime = toSvg(A_prime);

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
        {[...Array(Math.floor(svgWidth / scale / 2) * 2 + 1)].map((_, i) => {
            const x = origin.x + (i - Math.floor(svgWidth / scale / 2)) * scale;
            return <line key={`v-${i}`} x1={x} y1={0} x2={x} y2={svgHeight} stroke={gridColor} strokeWidth="0.5" strokeDasharray="2 2"/>;
        })}
        {[...Array(Math.floor(svgHeight / scale / 2) * 2 + 1)].map((_, i) => {
            const y = origin.y - (i - Math.floor(svgHeight / scale / 2)) * scale;
            return <line key={`h-${i}`} x1={0} y1={y} x2={svgWidth} y2={y} stroke={gridColor} strokeWidth="0.5" strokeDasharray="2 2"/>;
        })}
        <circle cx={origin.x} cy={origin.y} r={3} fill={axisColor} />
        <text x={origin.x + 5} y={origin.y + 15} fontSize="12" fill={textColor}>O</text>

        {/* Pre-image */}
        <motion.circle
          cx={svgA.x} cy={svgA.y} r={5} fill={preImageColor}
          variants={pointVariants} custom={{ delay: 0 }} initial="hidden" animate={controls}
        />
        <motion.text
          x={svgA.x - 45} y={svgA.y + 5} fontSize="14" fill={preImageColor} fontWeight="bold"
          variants={textFadeIn} custom={{ delay: 0.2 }} initial="hidden" animate={controls}
        >
          A(-2, 1)
        </motion.text>

        {/* Image */}
        <motion.circle
          cx={svgA_prime.x} cy={svgA_prime.y} r={5} fill={imageColor}
          variants={pointVariants} custom={{ delay: 0.5 }} initial="hidden" animate={controls}
        />
        <motion.text
          x={svgA_prime.x + 8} y={svgA_prime.y + 5} fontSize="14" fill={imageColor} fontWeight="bold"
          variants={textFadeIn} custom={{ delay: 0.7 }} initial="hidden" animate={controls}
        >
          A'(3, -4)
        </motion.text>

        {/* Vector Arrow */}
        <motion.line
          x1={svgA.x} y1={svgA.y}
          x2={svgA_prime.x} y2={svgA_prime.y}
          stroke={vectorColor}
          strokeWidth="2.5"
          variants={drawVariants}
          custom={{ duration: 1.5, delay: 1.0 }}
          animate={controls}
          initial="hidden"
          markerEnd="url(#arrowhead-rule)"
        />
        <defs>
          <marker id="arrowhead-rule" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={vectorColor} />
          </marker>
        </defs>

        {/* Text for changes */}
        <motion.text
          x={origin.x + (A.x + A_prime.x) / 2 * scale}
          y={origin.y - (A.y + A_prime.y) / 2 * scale - 15}
          fontSize="14" fill={vectorColor} fontWeight="bold" textAnchor="middle"
          variants={textFadeIn} custom={{ delay: 2.5 }} initial="hidden" animate={controls}
        >
          &lt;{dx}, {dy}&gt;
        </motion.text>
        <motion.text
          x={origin.x + (A.x + A_prime.x) / 2 * scale}
          y={origin.y - (A.y + A_prime.y) / 2 * scale + 5}
          fontSize="12" fill={textColor} textAnchor="middle"
          variants={textFadeIn} custom={{ delay: 2.7 }} initial="hidden" animate={controls}
        >
          ({dx > 0 ? `${dx} Right` : dx < 0 ? `${-dx} Left` : ''}, {dy > 0 ? `${dy} Up` : dy < 0 ? `${-dy} Down` : ''})
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
        {isPlaying ? 'Animating...' : 'Show How to Find the Rule'}
      </motion.button>
    </div>
  );
};
// --- END OF NEW ANIMATION COMPONENT ---


export default function TranslationsSlide2() {
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
      id: 'determining-translations-points-quiz',
      conceptId: 'determining-translations',
      conceptName: 'Determining Translations',
      type: 'judging',
      description: 'Testing finding the translation rule from two points'
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
      id: 'find-rule-points-q1',
      question: "A pre-image point A(1, 7) is translated to the image point A'(6, 3). What is the coordinate rule for this translation?",
      options: [
        "(x, y) → (x + 7, y + 10)",
        "(x, y) → (x + 5, y - 4)",
        "(x, y) → (x + 6, y + 3)",
        "(x, y) → (x - 5, y + 4)"
      ],
      correctAnswer: "(x, y) → (x + 5, y - 4)",
      explanation: "Correct! To get from x=1 to x=6, you must add 5 (6 - 1 = 5). To get from y=7 to y=3, you must subtract 4 (3 - 7 = -4). The rule is (x+5, y-4)."
    },
    {
      id: 'find-preimage-q2',
      question: "Point P is translated by the rule (x, y) → (x - 3, y + 6) to get the image P'(4, 2). What were the coordinates of the original point P?",
      options: [
        "(1, 8)",
        "(7, -4)",
        "(1, -4)",
        "(7, 8)"
      ],
      correctAnswer: "(7, -4)",
      explanation: "Correct! To find the original x, solve x - 3 = 4 → x = 7. To find the original y, solve y + 6 = 2 → y = -4. So P was at (7, -4)."
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
      interactionId: `determining-translations-points-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'determining-translations',
      conceptName: 'Determining Translations',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Finding the Rule (From Points)</h2>
            <p className="text-lg leading-relaxed">
              What if you are given the "before" and "after" points and need to find the rule?
            </p>
            <p className="text-lg leading-relaxed mt-4">
              It's simple subtraction!
            </p>
            <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
              Think: Finding the **change** between numbers. If you start at 2 and end at 5, the change is $5 - 2 = 3$. We do the same for x and y.
            </em>
          </div>

          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Formula</h3>
            <p className="text-lg leading-relaxed">
              Given Pre-image P(x₁, y₁) and Image P'(x₂, y₂):
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg font-mono">Horizontal change a = x₂ - x₁</p>
              <p className="text-lg font-mono mt-2">Vertical change b = y₂ - y₁</p>
              <p className="text-lg font-mono mt-4 font-bold">
                Rule: &lt;a, b&gt; or (x+a, y+b)
              </p>
            </div>
          </div>

          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example</h3>
            <p className="text-lg leading-relaxed">
              Pre-image A(-2, 1) translates to Image A'(3, -4).
            </p>
            <ul className="mt-4 space-y-2 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">x:</span>
                <span>a = 3 - (-2) = 3 + 2 = 5 (Right 5)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">y:</span>
                <span>b = -4 - 1 = -5 (Down 5)</span>
              </li>
            </ul>
            <p className="text-lg leading-relaxed mt-4 font-bold">
              The rule is &lt;5, -5&gt; or (x, y) → (x+5, y-5).
            </p>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Finding the Rule</h3>

            <FindingRuleAnimation />

            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Click the button! See how A(-2, 1) translates to A'(3, -4).
              Ask: "How do I get from A to A'?" (Moves 5 right and 5 down).
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
                <div className="text-3xl mb-4">🕵️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You\'re a master detective!' : 'Great job!'}
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
      slideId="determining-translations-1"
      slideTitle="Determining Translations"
      moduleId="performing-transformations"
      submoduleId="translations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}