import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE FOR EXAMPLE (Left Side) ---
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 300;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const gridColor = isDarkMode ? '#475569' : '#CBD5E1';
  const colorP = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const colorQ = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const arrowColor = isDarkMode ? '#F87171' : '#EF4444'; // Red

  const cx = svgWidth / 2;
  const cy = svgHeight / 2;
  const gridSpacing = 20;

  // Polygon P (2,1) (4,1) (4,3) (2,3)
  const polyP = `${cx + 2*gridSpacing},${cy - 1*gridSpacing} ${cx + 4*gridSpacing},${cy - 1*gridSpacing} ${cx + 4*gridSpacing},${cy - 3*gridSpacing} ${cx + 2*gridSpacing},${cy - 3*gridSpacing}`;
  // Polygon Q (-1,2) (-1,4) (-3,4) (-3,2)
  const polyQ = `${cx - 1*gridSpacing},${cy - 2*gridSpacing} ${cx - 1*gridSpacing},${cy - 4*gridSpacing} ${cx - 3*gridSpacing},${cy - 4*gridSpacing} ${cx - 3*gridSpacing},${cy - 2*gridSpacing}`;

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <defs>
          <pattern id="grid" width={gridSpacing} height={gridSpacing} patternUnits="userSpaceOnUse">
            <path d={`M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`} fill="none" stroke={gridColor} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <line x1="0" y1={cy} x2={svgWidth} y2={cy} stroke={strokeColor} strokeWidth="2" />
        <line x1={cx} y1="0" x2={cx} y2={svgHeight} stroke={strokeColor} strokeWidth="2" />
        <text x={svgWidth - 10} y={cy - 5} fill={strokeColor} fontSize="14">x</text>
        <text x={cx + 5} y={15} fill={strokeColor} fontSize="14">y</text>
        
        <polygon points={polyP} fill={colorP} opacity="0.7" stroke={strokeColor} strokeWidth="1" />
        <text x={cx + 3*gridSpacing} y={cy - 2*gridSpacing} fill={isDarkMode ? 'black' : 'white'} textAnchor="middle" dominantBaseline="middle">P</text>
        
        <polygon points={polyQ} fill={colorQ} opacity="0.7" stroke={strokeColor} strokeWidth="1" />
        <text x={cx - 2*gridSpacing} y={cy - 3*gridSpacing} fill={isDarkMode ? 'black' : 'white'} textAnchor="middle" dominantBaseline="middle">Q</text>

        {/* Rotation visualization */}
        <motion.path 
          d={`M ${cx} ${cy} L ${cx + 2*gridSpacing} ${cy - 1*gridSpacing} L ${cx + 2.5*gridSpacing} ${cy - 3*gridSpacing}`} 
          fill="none" 
          stroke={arrowColor} 
          strokeDasharray="3 3"
          initial={{ rotate: 0, transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: 90 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.path 
          d={`M ${cx} ${cy} L ${cx + 4*gridSpacing} ${cy - 1*gridSpacing}`} 
          fill="none" 
          stroke={arrowColor} 
          strokeDasharray="3 3"
          initial={{ rotate: 0, transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: 90 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.path 
          d="M 260 140 A 40 40 0 0 1 200 100" 
          fill="none" 
          stroke={arrowColor} 
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        <motion.text x="210" y="100" fill={arrowColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>90°</motion.text>
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q3 from image) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 300;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const gridColor = isDarkMode ? '#475569' : '#CBD5E1';
  const colorP = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const colorQ = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  
  const cx = svgWidth / 2;
  const cy = svgHeight / 2;
  const gridSpacing = 20;

  const polyP = `${cx - 2*gridSpacing},${cy + 2*gridSpacing} ${cx - 4*gridSpacing},${cy + 4*gridSpacing} ${cx - 2*gridSpacing},${cy + 4*gridSpacing}`;
  const polyQ = `${cx - 2*gridSpacing},${cy - 2*gridSpacing} ${cx - 4*gridSpacing},${cy - 4*gridSpacing} ${cx - 2*gridSpacing},${cy - 4*gridSpacing}`;

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <defs>
          <pattern id="grid-q1" width={gridSpacing} height={gridSpacing} patternUnits="userSpaceOnUse">
            <path d={`M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`} fill="none" stroke={gridColor} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-q1)" />
        <line x1="0" y1={cy} x2={svgWidth} y2={cy} stroke={strokeColor} strokeWidth="2" />
        <line x1={cx} y1="0" x2={cx} y2={svgHeight} stroke={strokeColor} strokeWidth="2" />
        <text x={svgWidth - 10} y={cy - 5} fill={strokeColor} fontSize="14">x</text>
        <text x={cx + 5} y={15} fill={strokeColor} fontSize="14">y</text>
        
        <polygon points={polyP} fill={colorP} opacity="0.7" stroke={strokeColor} strokeWidth="1" />
        <text x={cx - 2.7*gridSpacing} y={cy + 3.3*gridSpacing} fill={isDarkMode ? 'black' : 'white'} textAnchor="middle" dominantBaseline="middle">P</text>
        <polygon points={polyQ} fill={colorQ} opacity="0.7" stroke={strokeColor} strokeWidth="1" />
        <text x={cx - 2.7*gridSpacing} y={cy - 3.3*gridSpacing} fill={isDarkMode ? 'black' : 'white'} textAnchor="middle" dominantBaseline="middle">Q</text>
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q4 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 300;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const gridColor = isDarkMode ? '#475569' : '#CBD5E1';
  const colorP = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const colorQ = isDarkMode ? '#FDE047' : '#EAB308'; // Yellow

  const cx = svgWidth / 2;
  const cy = svgHeight / 2;
  const gridSpacing = 20;

  const polyP = `${cx - 2*gridSpacing},${cy + 1*gridSpacing} ${cx - 5*gridSpacing},${cy + 1*gridSpacing} ${cx - 6*gridSpacing},${cy + 3*gridSpacing} ${cx - 3*gridSpacing},${cy + 3*gridSpacing}`;
  const polyQ = `${cx + 2*gridSpacing},${cy - 1*gridSpacing} ${cx + 5*gridSpacing},${cy - 1*gridSpacing} ${cx + 6*gridSpacing},${cy - 3*gridSpacing} ${cx + 3*gridSpacing},${cy - 3*gridSpacing}`;

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <defs>
          <pattern id="grid-q2" width={gridSpacing} height={gridSpacing} patternUnits="userSpaceOnUse">
            <path d={`M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`} fill="none" stroke={gridColor} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-q2)" />
        <line x1="0" y1={cy} x2={svgWidth} y2={cy} stroke={strokeColor} strokeWidth="2" />
        <line x1={cx} y1="0" x2={cx} y2={svgHeight} stroke={strokeColor} strokeWidth="2" />
        <text x={svgWidth - 10} y={cy - 5} fill={strokeColor} fontSize="14">x</text>
        <text x={cx + 5} y={15} fill={strokeColor} fontSize="14">y</text>
        
        <polygon points={polyP} fill={colorP} opacity="0.7" stroke={strokeColor} strokeWidth="1" />
        <text x={cx - 4*gridSpacing} y={cy + 2*gridSpacing} fill={isDarkMode ? 'black' : 'white'} textAnchor="middle" dominantBaseline="middle">P</text>
        <polygon points={polyQ} fill={colorQ} opacity="0.7" stroke={strokeColor} strokeWidth="1" />
        <text x={cx + 4*gridSpacing} y={cy - 2*gridSpacing} fill={isDarkMode ? 'black' : 'white'} textAnchor="middle" dominantBaseline="middle">Q</text>
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function RigidMotionsSlide4() {
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
      id: 'rigid-motions-why-congruent-quiz',
      conceptId: 'rigid-motions-why-congruent',
      conceptName: 'Why Polygons Are Congruent',
      type: 'judging',
      description: 'Testing why polygons are congruent using rigid motions'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    figure: React.ReactNode;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED QUESTIONS ARRAY ---
  const questions: QuizQuestion[] = [
    {
      id: 'rigid-motions-why-q3',
      question: 'In terms of rigid motions, why are the polygons $P$ and $Q$ congruent?',
      figure: <FigureQ1 />,
      options: [
        "Q is the image of P under the action of rotation by 180° around the origin",
        "Q is the image of P under the action of translation by 6 units up",
        "Q is the image of P under the action of reflection in the x-axis",
        "The polygons are not congruent",
        "Q is the image of P under the action of rotation by 90° clockwise around the origin"
      ],
      correctAnswer: "Q is the image of P under the action of reflection in the x-axis",
      explanation: "Correct! If you take a point on P like (-2, -2) and reflect it over the x-axis, it becomes (-2, 2), which is a point on Q. This works for all points, so it's a reflection."
    },
    {
      id: 'rigid-motions-why-q4',
      question: 'In terms of rigid motions, why are the polygons $P$ and $Q$ congruent?',
      figure: <FigureQ2 />,
      options: [
        "Q is the image of P under the action of reflection in the line y = -x",
        "Q is the image of P under the action of translation by 6 units to the right and 4 units up",
        "Q is the image of P under the action of translation by 6 units up and 4 to the right",
        "Q is the image of P under the action of rotation by 180° around the origin",
        "The polygons are not congruent"
      ],
      correctAnswer: "Q is the image of P under the action of rotation by 180° around the origin",
      explanation: "Correct! A 180° rotation maps any point (x, y) to (-x, -y). If we test a point on P like (-2, -1), it maps to (2, 1), which is on Q. This works for all vertices."
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
      interactionId: `rigid-motions-why-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'rigid-motions-why-congruent',
      conceptName: 'Why Polygons Are Congruent',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Identifying Rigid Motions</h2>
            <p className="text-lg leading-relaxed mb-4">
              In terms of rigid motions, why are the polygons P and Q congruent?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              The polygons P and Q are congruent because <strong>Q is the image of $P$ under the action of rotation by 90° counterclockwise around the origin.</strong>
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Since a rotation is a rigid motion, it preserves the size and shape, and therefore the two figures are congruent.
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Why Are They Congruent?</h3>
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

            {/* --- RENDER THE FIGURE FOR THE CURRENT QUESTION --- */}
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
                <div className="text-3xl mb-4">🗺️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You're a master mapper!" : 'Great job!'}
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
      slideId="rigid-motions-why-congruent"
      slideTitle="Identifying Why Polygons Are Congruent"
      moduleId="congruence"
      submoduleId="rigid-motions-and-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}