import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const FunctionNotationAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#CBD5E1' : '#A0AEC0';
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const color2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  
  const P = { x: 100, y: 150 };
  const P_prime = { x: 100 + 150, y: 150 - 80 }; // T(x, y) = (x+150, y-80)

  const textAnim = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Grid lines */}
        <path d="M 0 50 H 400 M 0 100 H 400 M 0 150 H 400 M 50 0 V 220 M 100 0 V 220 M 150 0 V 220 M 200 0 V 220 M 250 0 V 220 M 300 0 V 220 M 350 0 V 220" stroke={strokeColor} strokeWidth="0.5" />
        
        {/* Pre-image Point */}
        <motion.circle 
          cx={P.x} cy={P.y} r="5" fill={color1}
          initial="hidden" animate="visible" variants={textAnim(0.5)}
        />
        <motion.text x={P.x - 40} y={P.y + 15} fill={color1} fontSize="14"
          initial="hidden" animate="visible" variants={textAnim(0.7)}>
          P(x, y)
        </motion.text>
        
        {/* Image Point */}
        <motion.circle 
          cx={P_prime.x} cy={P_prime.y} r="5" fill={color2}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
        <motion.text x={P_prime.x + 5} y={P_prime.y + 15} fill={color2} fontSize="14"
          initial="hidden" animate="visible" variants={textAnim(2.0)}>
          P'(x+150, y-80)
        </motion.text>
        
        {/* Arrow */}
        <motion.path 
          d={`M ${P.x + 10} ${P.y - 10} Q ${(P.x + P_prime.x) / 2} ${P_prime.y - 50} ${P_prime.x - 10} ${P_prime.y + 10}`}
          fill="none"
          stroke={isDarkMode ? '#E2E8F0' : '#4A5568'}
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.0, duration: 1.0 }}
        />
        
        {/* Notation */}
        <motion.text x={200} y={190} fill={isDarkMode ? '#E2E8F0' : '#4A5568'} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={textAnim(2.5)}>
          Notation: <tspan fill={color2} fontWeight="bold">T(x, y) = (x+150, y-80)</tspan>
        </motion.text>
      </svg>
    </div>
  );
};

// --- FIGURE FOR NEW QUIZ QUESTION ---
const FigureQ3: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const gridColor = isDarkMode ? '#475569' : '#CBD5E1';
  const colorP = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  
  const cx = svgWidth / 2;
  const cy = svgHeight / 2;
  const gridSpacing = 20;

  // A: (0, -2), B: (3, 1), C: (0, 4), D: (-3, 1)
  const polyP = `${cx},${cy + 2*gridSpacing} ${cx + 3*gridSpacing},${cy - 1*gridSpacing} ${cx},${cy - 4*gridSpacing} ${cx - 3*gridSpacing},${cy - 1*gridSpacing}`;

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <defs>
          <pattern id="grid-q3" width={gridSpacing} height={gridSpacing} patternUnits="userSpaceOnUse">
            <path d={`M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`} fill="none" stroke={gridColor} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-q3)" />
        <line x1="0" y1={cy} x2={svgWidth} y2={cy} stroke={strokeColor} strokeWidth="2" />
        <line x1={cx} y1="0" x2={cx} y2={svgHeight} stroke={strokeColor} strokeWidth="2" />
        <text x={svgWidth - 10} y={cy - 5} fill={strokeColor} fontSize="14">x</text>
        <text x={cx + 5} y={15} fill={strokeColor} fontSize="14">y</text>
        
        <polygon points={polyP} fill={colorP} opacity="0.7" stroke={strokeColor} strokeWidth="1" />
        <text x={cx} y={cy + 2*gridSpacing + 15} fill={strokeColor} textAnchor="middle">A</text>
        <text x={cx + 3*gridSpacing + 5} y={cy - 1*gridSpacing + 5} fill={strokeColor}>B</text>
        <text x={cx} y={cy - 4*gridSpacing - 5} fill={strokeColor} textAnchor="middle">C</text>
        <text x={cx - 3*gridSpacing - 5} y={cy - 1*gridSpacing + 5} fill={strokeColor}>D</text>
      </svg>
    </div>
  );
};

// --- Main Quiz Figure Component ---
const QuizFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  // This component is not used by the original questions,
  // but we add the new one for questionIndex 2.
  if (questionIndex === 2) {
    return <FigureQ3 />;
  }
  // Return null or a default/empty state for other questions if they don't have figures
  return null; 
};
// --- END OF FIGURE COMPONENT DEFINITION ---


export default function RigidMotionsSlide5() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  // --- UPDATED FOR 3 QUESTIONS ---
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'rigid-motions-notation-quiz',
      conceptId: 'rigid-motions-function-notation',
      conceptName: 'Function Notation',
      type: 'judging',
      description: 'Testing identification of rigid motions in function notation'
    }
  ];

  // --- UPDATED INTERFACE ---
  interface QuizQuestion {
    id: string;
    question: string;
    figure?: React.ReactNode; // Optional figure
    statements?: string[]; // Optional statements
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED QUESTIONS ARRAY ---
  const questions: QuizQuestion[] = [
    {
      id: 'rigid-motions-notation-q1',
      question: 'Which of the following transformations is a rigid motion (preserves congruence)?',
      options: [
        "T(x, y) = (2x, 2y)",
        "T(x, y) = (x+5, y-3)",
        "T(x, y) = (x, 0.5y)",
        "T(x, y) = (x², y²)"
      ],
      correctAnswer: "T(x, y) = (x+5, y-3)",
      explanation: "Correct! This is a translation (slide 5 right, 3 down), which is a rigid motion. Any rule that *multiplies* x or y (like 2x or 0.5y) is a dilation and is NOT rigid."
    },
    {
      id: 'rigid-motions-notation-q2',
      question: 'The rule for a 90° counter-clockwise rotation is $R(x, y) = (-y, x)$. Is this a rigid motion?',
      options: [
        "Yes, because it swaps x and y, which preserves distance.",
        "No, because it changes the coordinates.",
        "No, because it's a rotation, not a translation.",
        "Only if x and y are positive."
      ],
      correctAnswer: "Yes, because it swaps x and y, which preserves distance.",
      explanation: "Correct! All rotations are rigid motions. This rule, $R(x, y) = (-y, x)$, may look strange, but it perfectly preserves all distances and angles, just 'turning' the figure."
    },
    {
      id: 'rigid-motions-notation-q3',
      question: 'Which of the following combinations of transformations map the polygon ABCD to a congruent polygon?',
      figure: <FigureQ3 />,
      statements: [
        'I.   A reflection in the line $\overleftrightarrow{AB}$, followed by a dilation of scale factor 2 with center of dilation $A$.',
        'II.  A horizontal stretch of scale factor 1/2, followed by a reflection in the axis $\overleftrightarrow{AC}$.',
        'III. A rotation of 36° counterclockwise about the point $A$, followed by a translation of 3 units to the right and 1 unit down.'
      ],
      options: [
        "I and II only",
        "III only",
        "I and III only",
        "II only",
        "I only"
      ],
      correctAnswer: "III only",
      explanation: "Correct! To map to a *congruent* polygon, *all* transformations in the sequence must be rigid motions. Statement I has a dilation (not rigid). Statement II has a stretch (not rigid). Statement III has a rotation and a translation, both of which are rigid motions."
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
      interactionId: `rigid-motions-notation-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'rigid-motions-function-notation',
      conceptName: 'Function Notation',
      conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
      question: {
        type: 'mcq',
        question: current.question,
        options: current.options,
/*         statements: current.statements // Pass statements if they exist
 */      }
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
          {/* --- CARD 1 --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Function Notation for Maps</h2>
            <p className="text-lg leading-relaxed">
              A "map" is a function. We can write rules for transformations using function notation that tells us what to do with the coordinates $(x, y)$.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              The input is the pre-image point $P(x, y)$.
              <br/>
              The output is the image point $P'(x', y')$.
            </p>
          </div>

          {/* --- CARD 2 (The Rules) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Identifying Rigid Motions</h3>
            <p className="text-lg leading-relaxed">
              You can tell if a rule is a rigid motion by its form:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Translation:</strong> Adds/subtracts constants.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">T(x, y) = (x + 2, y - 5)</span>
              </li>
              <li>
                <strong>Reflection:</strong> Negates one coordinate.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">R(x, y) = (-x, y)</span> (y-axis flip)
              </li>
              <li>
                <strong>Rotation:</strong> Swaps and/or negates coordinates.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">R(x, y) = (-y, x)</span> (90° turn)
              </li>
            </ul>
             <div className="mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900/30">
              <p className="text-lg text-red-700 dark:text-red-300">
                <strong>NON-Rigid (Dilation):</strong>
                <br/>
                Any rule that *multiplies* x or y by a number (other than 1 or -1) is a dilation and does <strong>NOT</strong> preserve congruence.
                <br/>
                <span className="font-mono text-sm bg-red-200 dark:bg-red-800 p-1 rounded">D(x, y) = (3x, 3y)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD (UNCHANGED) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Mapping a Point</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <FunctionNotationAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The rule $T(x, y) = (x+150, y-80)$ maps the pre-image $P$ to the image $P'$.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD (UPDATED) --- */}
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
            
            {/* --- RENDER THE FIGURE FOR THE CURRENT QUESTION (if it exists) --- */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
              >
                {questions[currentQuestionIndex].figure}
              </motion.div>
            </AnimatePresence>

            {!isQuizComplete ? (
              <>
                {/* --- RENDER STATEMENTS (if they exist) --- */}
                {questions[currentQuestionIndex].statements && (
                  <ul className="list-none p-4 mb-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg font-mono">
                    {questions[currentQuestionIndex].statements?.map((stmt, i) => (
                      <li key={i}>{stmt}</li>
                    ))}
                  </ul>
                )}
                <div className="text-lg mb-4 mt-6">{questions[currentQuestionIndex].question}</div>
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
                <div className="text-3xl mb-4">f(x)</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered function notation!" : 'Great job!'}
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
      slideId="rigid-motions-function-notation"
      slideTitle="Identifying Maps in Function Notation"
      moduleId="congruence"
      submoduleId="rigid-motions-and-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}