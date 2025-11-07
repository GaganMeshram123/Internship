import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE FOR EXAMPLE (Left Side) ---
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const O = { x: 200, y: 30 };
  const A = { x: 50, y: 180 };
  const B = { x: 150, y: 180 };
  const C = { x: 250, y: 180 };
  const D = { x: 350, y: 180 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y} L ${O.x} ${O.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${O.x} ${O.y} L ${B.x} ${B.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${O.x} ${O.y} L ${C.x} ${C.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={O.x} y={O.y - 10} fill={strokeColor} textAnchor="middle">O</text>
        <text x={A.x - 15} y={A.y + 5} fill={strokeColor}>A</text>
        <text x={B.x} y={B.y + 15} fill={strokeColor} textAnchor="middle">B</text>
        <text x={C.x} y={C.y + 15} fill={strokeColor} textAnchor="middle">C</text>
        <text x={D.x + 5} y={D.y + 5} fill={strokeColor}>D</text>

        {/* Markings */}
        <line x1={100} y1={180} x2={110} y2={180} stroke={strokeColor} strokeWidth="2" /> {/* AB */}
        <line x1={200} y1={180} x2={210} y2={180} stroke={strokeColor} strokeWidth="2" /> {/* BC */}
        
        <line x1={125} y1={105} x2={135} y2={110} stroke={strokeColor} strokeWidth="2" /> {/* OA */}
        <line x1={128} y1={102} x2={138} y2={107} stroke={strokeColor} strokeWidth="2" />
        <line x1={265} y1={110} x2={275} y2={105} stroke={strokeColor} strokeWidth="2" /> {/* OC */}
        <line x1={262} y1={107} x2={272} y2={102} stroke={strokeColor} strokeWidth="2" />

        <line x1={175} y1={105} x2={185} y2={110} stroke={strokeColor} strokeWidth="2" /> {/* OB */}
        <path d="M 178 102 A 15 15 0 0 1 188 107" stroke={strokeColor} fill="none" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q3 from image) ---
// Note: This figure is interpreted as a kite ACBD with diagonals AD and CB.
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 200, y: 30 };
  const C = { x: 50, y: 110 };
  const B = { x: 350, y: 110 };
  const D = { x: 200, y: 190 };
  const M = { x: 200, y: 110 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y} L ${D.x} ${D.y} L ${B.x} ${B.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${C.x} ${C.y} L ${B.x} ${B.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${M.x - 40} ${M.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={A.x} y={A.y - 10} fill={strokeColor} textAnchor="middle">A</text>
        <text x={C.x - 15} y={C.y} fill={strokeColor}>C</text>
        <text x={B.x + 5} y={B.y} fill={strokeColor}>B</text>
        <text x={D.x} y={D.y + 15} fill={strokeColor} textAnchor="middle">D</text>
        <text x={M.x + 5} y={M.y + 15} fill={strokeColor}>M</text>
        
        {/* Markings from image */}
        <line x1={120} y1={65} x2={130} y2={70} stroke={strokeColor} strokeWidth="2" /> {/* AC */}
        <line x1={123} y1={62} x2={133} y2={67} stroke={strokeColor} strokeWidth="2" />
        <line x1={270} y1={70} x2={280} y2={65} stroke={strokeColor} strokeWidth="2" /> {/* AB */}
        <line x1={267} y1={67} x2={277} y2={62} stroke={strokeColor} strokeWidth="2" />

        <line x1={120} y1={155} x2={130} y2={150} stroke={strokeColor} strokeWidth="2" /> {/* CD */}
        <line x1={123} y1={158} x2={133} y2={153} stroke={strokeColor} strokeWidth="2" />
        <line x1={126} y1={161} x2={136} y2={156} stroke={strokeColor} strokeWidth="2" />
        <line x1={270} y1={150} x2={280} y2={155} stroke={strokeColor} strokeWidth="2" /> {/* BD */}
        <line x1={267} y1={153} x2={277} y2={158} stroke={strokeColor} strokeWidth="2" />
        <line x1={264} y1={156} x2={274} y2={161} stroke={strokeColor} strokeWidth="2" />
        
        <line x1={195} y1={70} x2={205} y2={70} stroke={strokeColor} strokeWidth="2" /> {/* AM */}
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q4 from image) ---
// Figure is corrected to be solvable by SSS
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const O = { x: 80, y: 110 };
  const A = { x: 200, y: 180 };
  const B = { x: 270, y: 140 };
  const C = { x: 230, y: 80 };
  const D = { x: 150, y: 40 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${O.x} ${O.y} L ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${O.x} ${O.y} L ${B.x} ${B.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${O.x} ${O.y} L ${C.x} ${C.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={O.x - 15} y={O.y} fill={strokeColor}>O</text>
        <text x={A.x + 5} y={A.y + 5} fill={strokeColor}>A</text>
        <text x={B.x + 5} y={B.y + 5} fill={strokeColor}>B</text>
        <text x={C.x + 5} y={C.y} fill={strokeColor}>C</text>
        <text x={D.x} y={D.y - 5} fill={strokeColor}>D</text>

        {/* Corrected Markings for SSS */}
        <line x1={140} y1={145} x2={150} y2={150} stroke={strokeColor} strokeWidth="2" /> {/* OA */}
        <line x1={143} y1={142} x2={153} y2={147} stroke={strokeColor} strokeWidth="2" />
        <line x1={155} y1={95} x2={165} y2={90} stroke={strokeColor} strokeWidth="2" /> {/* OC */}
        <line x1={158} y1={98} x2={168} y2={93} stroke={strokeColor} strokeWidth="2" />
        
        <path d="M 170 125 A 15 15 0 0 1 180 120" stroke={strokeColor} fill="none" strokeWidth="1.5" /> {/* OB */}
        <path d="M 120 75 A 15 15 0 0 1 130 70" stroke={strokeColor} fill="none" strokeWidth="1.5" /> {/* OD */}

        <line x1={235} y1={160} x2={245} y2={160} stroke={strokeColor} strokeWidth="2" /> {/* AB */}
        <line x1={190} y1={60} x2={200} y2={60} stroke={strokeColor} strokeWidth="2" /> {/* CD */}
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function SssSlide3() {
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
      id: 'sss-polygon-quiz',
      conceptId: 'sss-criterion-polygon',
      conceptName: 'SSS in Polygons',
      type: 'judging',
      description: 'Testing SSS application within polygons'
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
  id: 'sss-polygon-q3-kite',
  question: 'According to the SSS criterion only, which triangle is congruent to triangle ACD?',
  figure: <FigureQ1 />,
  options: [
    "Triangle AMB",
    "Triangle ABD",
    "None of the listed",
    "Triangle AMB and Triangle AMC",
    "Triangle AMC"
  ],
  correctAnswer: "Triangle ABD",
  explanation:
    "AC = AB and CD = BD are given as matching sides. The side AD is shared between triangle ACD and triangle ABD. So all three pairs of sides match. Therefore, triangle ACD is congruent to triangle ABD by the SSS (Side-Side-Side) criterion."
},
{
  id: 'sss-polygon-q4-complex',
  question: 'According to the SSS criterion only, which triangle is congruent to triangle OBC?',
  figure: <FigureQ2 />,
  options: [
    "Triangle OAD",
    "Triangle OBD",
    "Triangle OAC",
    "Triangle ODC",
    "Triangle OBA"
  ],
  correctAnswer: "Triangle ODC",
  explanation:
    "To apply SSS, we compare side lengths. OC matches OA, OB matches OD, and BC matches DC. So the set of three matching sides is between triangle OBC and triangle ODC. Therefore, triangle OBC is congruent to triangle ODC by SSS."
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

    // FIX: Corrected the interactionId to match the new question IDs
    handleInteractionComplete({
      interactionId: `sss-polygon-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sss-criterion-polygon',
      conceptName: 'SSS in Polygons',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Identifying Congruent Triangles</h2>
            <p className="text-lg leading-relaxed mb-4">
              According to the SSS criterion only, which of the following triangles is congruent to ΔOBC?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              From the diagram, ΔOBC and ΔOBA are congruent by SSS (side-side-side).
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Indeed, $OB$ is the common side of the triangles, and we have the following additional congruent pairs of sides:
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg font-mono text-center">
              AB ≅ BC<br/>
              OA ≅ OC
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Polygon Practice</h3>
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
                <div className="text-3xl mb-4">🔷</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Great job applying SSS to polygons!" : 'Good practice!'}
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
      slideId="sss-identifying-polygons"
      slideTitle="Identifying Congruent Triangles Within a Polygon Using SSS"
      moduleId="congruence"
      submoduleId="sss-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}