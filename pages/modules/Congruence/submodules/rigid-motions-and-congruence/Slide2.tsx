import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- REFLECTION ANIMATION COMPONENT ---
const ReflectionAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 300; // Increased height for grid
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const gridColor = isDarkMode ? '#475569' : '#CBD5E1';
  const colorP = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const colorQ = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const arrowColor = isDarkMode ? '#F87171' : '#EF4444'; // Red

  // Center of the SVG
  const cx = svgWidth / 2;
  const cy = svgHeight / 2;
  const gridSpacing = 20;

  // Triangle P vertices (scaled and centered)
  const P1 = { x: cx + 2 * gridSpacing, y: cy - 2 * gridSpacing };
  const P2 = { x: cx + 4 * gridSpacing, y: cy - 3 * gridSpacing };
  const P3 = { x: cx + 3 * gridSpacing, y: cy - 4 * gridSpacing };

  // Triangle Q vertices (reflected)
  const Q1 = { x: P1.x, y: cy + (cy - P1.y) };
  const Q2 = { x: P2.x, y: cy + (cy - P2.y) };
  const Q3 = { x: P3.x, y: cy + (cy - P3.y) };

  const arrowProps = {
    stroke: arrowColor,
    strokeWidth: 2,
    strokeDasharray: "4 4",
  };

  const textAnim = (delay: number) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Grid Lines */}
        <defs>
          <pattern id="grid" width={gridSpacing} height={gridSpacing} patternUnits="userSpaceOnUse">
            <path d={`M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`} fill="none" stroke={gridColor} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Axes */}
        <line x1="0" y1={cy} x2={svgWidth} y2={cy} stroke={strokeColor} strokeWidth="2" />
        <line x1={cx} y1="0" x2={cx} y2={svgHeight} stroke={strokeColor} strokeWidth="2" />
        <text x={svgWidth - 10} y={cy - 5} fill={strokeColor} fontSize="14">x</text>
        <text x={cx + 5} y={15} fill={strokeColor} fontSize="14">y</text>

        {/* Triangle P */}
        <motion.path 
          d={`M ${P1.x} ${P1.y} L ${P2.x} ${P2.y} L ${P3.x} ${P3.y} Z`} 
          fill={colorP} 
          opacity="0.7"
          initial="hidden" animate="visible" variants={textAnim(0.5)}
        />
        <motion.text x={cx + 3 * gridSpacing} y={cy - 3 * gridSpacing} fill={isDarkMode ? 'black' : 'white'} fontSize="14" textAnchor="middle" dominantBaseline="middle"
          initial="hidden" animate="visible" variants={textAnim(0.5)}>
          P
        </motion.text>

        {/* Triangle Q */}
        <motion.path 
          d={`M ${Q1.x} ${Q1.y} L ${Q2.x} ${Q2.y} L ${Q3.x} ${Q3.y} Z`} 
          fill={colorQ} 
          opacity="0.7"
          initial="hidden" animate="visible" variants={textAnim(1.0)}
        />
         <motion.text x={cx + 3 * gridSpacing} y={cy + 3 * gridSpacing} fill={isDarkMode ? 'black' : 'white'} fontSize="14" textAnchor="middle" dominantBaseline="middle"
          initial="hidden" animate="visible" variants={textAnim(1.0)}>
          Q
        </motion.text>

        {/* Reflection Arrows */}
        <motion.line x1={P1.x} y1={P1.y} x2={Q1.x} y2={Q1.y} {...arrowProps} initial="hidden" animate="visible" variants={textAnim(1.5)} />
        <motion.line x1={P2.x} y1={P2.y} x2={Q2.x} y2={Q2.y} {...arrowProps} initial="hidden" animate="visible" variants={textAnim(1.7)} />
        <motion.line x1={P3.x} y1={P3.y} x2={Q3.x} y2={Q3.y} {...arrowProps} initial="hidden" animate="visible" variants={textAnim(1.9)} />
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function RigidMotionsSlide1() {
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
      id: 'rigid-motions-intro-quiz',
      conceptId: 'rigid-motions-intro',
      conceptName: 'Rigid Motions Introduction',
      type: 'judging',
      description: 'Testing understanding of rigid motions and congruence'
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
      id: 'rigid-motions-intro-q1',
      question: 'What is the formal definition of "congruent figures"?',
      options: [
        "They have the same area.",
        "One figure can be mapped onto the other using rigid motions.",
        "They have the same angles, but can be different sizes.",
        "They are both polygons."
      ],
      correctAnswer: "One figure can be mapped onto the other using rigid motions.",
      explanation: "Correct! This is the formal definition. The criteria (SSS, SAS, etc.) are just shortcuts for proving this is possible."
    },
    {
      id: 'rigid-motions-intro-q2',
      question: 'Which of these is NOT a rigid motion?',
      options: [
        "Translation (slide)",
        "Rotation (turn)",
        "Dilation (resize)",
        "Reflection (flip)"
      ],
      correctAnswer: "Dilation (resize)",
      explanation: "Correct! A dilation changes the *size* of a figure, so it is not 'rigid'. It creates a *similar* figure, not a *congruent* one."
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
      interactionId: `rigid-motions-intro-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'rigid-motions-intro',
      conceptName: 'Rigid Motions Introduction',
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left Column - Content (UPDATED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Introduction</h2>
            <p className="text-lg leading-relaxed mb-4">
              A <strong>rigid motion</strong> is any transformation that does not change the distances and angles between points. Rigid motions are also called <strong>isometries</strong>.
            </p>
            
            <p className="text-lg leading-relaxed mb-4">
              There are <i>only three</i> types of rigid motions:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-lg">
              <li>Translations</li>
              <li>Rotations</li>
              <li>Reflections</li>
            </ul>

            <p className="text-lg leading-relaxed mt-6 mb-4">
              <strong>Watch out!</strong> The following types of transformations are <strong>not</strong> rigid motions:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-lg text-red-600 dark:text-red-400">
              <li>Dilations</li>
              <li>Stretches</li>
            </ul>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD (UPDATED) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Example: Reflection</h3>
            
            {/* --- USE THE UPDATED ANIMATION COMPONENT --- */}
            <ReflectionAnimation />
            
            <p className="text-lg text-slate-700 dark:text-slate-300 mt-4 text-center">
              Notice that $Q$ is the image of $P$ under a reflection in the x-axis.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 mt-2 text-center">
              Since $P$ is mapped to $Q$ under a rigid motion (reflection), $P$ and $Q$ must be <strong>congruent</strong>.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD (Unchanged) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            {/* --- Progress Bar --- */}
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
                {/* --- Answer Options --- */}
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
                            : 'border-red-500 bg-red-100 dark:bg-red-800 opacity-70' // INCORRECT
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
                {/* --- Feedback Box --- */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mt-4 p-4 rounded-lg ${
                        selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' // Correct
                          : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700' // Incorrect
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
                <div className="text-3xl mb-4">🔄</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've got the definition down!" : 'Great job!'}
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
      slideId="rigid-motions-introduction"
      slideTitle="Introduction to Rigid Motions"
      moduleId="congruence"
      submoduleId="rigid-motions-and-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}