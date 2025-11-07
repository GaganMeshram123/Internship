import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE FOR EXAMPLE (Left Side) ---
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleYellow = isDarkMode ? '#FDE047' : '#EAB308';
  const anglePurple = isDarkMode ? '#C084FC' : '#9333EA';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const S = { x: 50, y: 50 };
  const R = { x: 250, y: 50 };
  const Q = { x: 350, y: 150 };
  const P = { x: 150, y: 150 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${S.x} ${S.y} L ${R.x} ${R.y} L ${Q.x} ${Q.y} L ${P.x} ${P.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${P.x} ${P.y} L ${R.x} ${R.y}`} stroke={strokeColor} {...commonProps} strokeDasharray="4 4" />
        
        {/* Labels */}
        <text x={S.x - 15} y={S.y} fill={strokeColor}>S</text>
        <text x={R.x + 5} y={R.y} fill={strokeColor}>R</text>
        <text x={Q.x + 5} y={Q.y + 5} fill={strokeColor}>Q</text>
        <text x={P.x - 15} y={P.y + 5} fill={strokeColor}>P</text>

        {/* Markings */}
        <line x1={150} y1={50} x2={160} y2={50} stroke={strokeColor} strokeWidth="2" /> {/* SR */}
        <line x1={250} y1={150} x2={260} y2={150} stroke={strokeColor} strokeWidth="2" /> {/* PQ */}
        
        <line x1={95} y1={95} x2={105} y2={105} stroke={strokeColor} strokeWidth="2" /> {/* SP */}
        <line x1={98} y1={98} x2={108} y2={108} stroke={strokeColor} strokeWidth="2" />
        <line x1={300} y1={95} x2={310} y2={105} stroke={strokeColor} strokeWidth="2" /> {/* RQ */}
        <line x1={303} y1={98} x2={313} y2={108} stroke={strokeColor} strokeWidth="2" />

        {/* Angles */}
        <path d={`M ${S.x + 15} ${S.y + 10} A 15 15 0 0 1 ${S.x} ${S.y + 20}`} stroke={angleYellow} {...commonProps} />
        <text x={S.x + 30} y={S.y + 30} fill={angleYellow} fontSize="12">67°</text>
        
        <path d={`M ${Q.x - 15} ${Q.y - 10} A 15 15 0 0 1 ${Q.x} ${Q.y - 20}`} stroke={anglePurple} {...commonProps} />
        <text x={Q.x - 60} y={Q.y - 15} fill={anglePurple} fontSize="12">2x + 12°</text>
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q7 from image) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const S = { x: 50, y: 50 };
  const R = { x: 250, y: 50 };
  const Q = { x: 350, y: 150 };
  const P = { x: 150, y: 150 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${S.x} ${S.y} L ${R.x} ${R.y} L ${Q.x} ${Q.y} L ${P.x} ${P.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${P.x} ${P.y} L ${R.x} ${R.y}`} stroke={strokeColor} {...commonProps} strokeDasharray="4 4" />
        
        {/* Labels */}
        <text x={S.x - 15} y={S.y} fill={strokeColor}>S</text>
        <text x={R.x + 5} y={R.y} fill={strokeColor}>R</text>
        <text x={Q.x + 5} y={Q.y + 5} fill={strokeColor}>Q</text>
        <text x={P.x - 15} y={P.y + 5} fill={strokeColor}>P</text>

        {/* Markings */}
        <line x1={150} y1={50} x2={160} y2={50} stroke={strokeColor} strokeWidth="2" /> {/* SR */}
        <line x1={250} y1={150} x2={260} y2={150} stroke={strokeColor} strokeWidth="2" /> {/* PQ */}
        
        <line x1={95} y1={95} x2={105} y2={105} stroke={strokeColor} strokeWidth="2" /> {/* SP */}
        <line x1={98} y1={98} x2={108} y2={108} stroke={strokeColor} strokeWidth="2" />
        <line x1={300} y1={95} x2={310} y2={105} stroke={strokeColor} strokeWidth="2" /> {/* RQ */}
        <line x1={303} y1={98} x2={313} y2={108} stroke={strokeColor} strokeWidth="2" />

        {/* Angles */}
        <path d={`M ${S.x + 15} ${S.y + 10} A 15 15 0 0 1 ${S.x} ${S.y + 20}`} stroke={angleGreen} {...commonProps} />
        <text x={S.x + 30} y={S.y + 30} fill={angleGreen} fontSize="12">115°</text>
        
        <path d={`M ${Q.x - 15} ${Q.y - 10} A 15 15 0 0 1 ${Q.x} ${Q.y - 20}`} stroke={angleBlue} {...commonProps} />
        <text x={Q.x - 60} y={Q.y - 15} fill={angleBlue} fontSize="12">3x - 5°</text>
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q8 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 200, y: 30 };
  const B = { x: 50, y: 180 };
  const C = { x: 350, y: 180 };
  const M = { x: 200, y: 180 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${M.x} ${M.y}`} stroke={strokeColor} {...commonProps} strokeDasharray="4 4" />
        
        {/* Labels */}
        <text x={A.x} y={A.y - 10} fill={strokeColor} textAnchor="middle">A</text>
        <text x={B.x - 15} y={B.y + 5} fill={strokeColor}>B</text>
        <text x={C.x + 5} y={C.y + 5} fill={strokeColor}>C</text>
        <text x={M.x} y={M.y + 15} fill={strokeColor} textAnchor="middle">M</text>

        {/* Markings */}
        <line x1={115} y1={100} x2={125} y2={105} stroke={strokeColor} strokeWidth="2" /> {/* AB */}
        <line x1={118} y1={97} x2={128} y2={102} stroke={strokeColor} strokeWidth="2" />
        <line x1={275} y1={105} x2={285} y2={100} stroke={strokeColor} strokeWidth="2" /> {/* AC */}
        <line x1={272} y1={102} x2={282} y2={97} stroke={strokeColor} strokeWidth="2" />
        
        <path d={`M ${M.x - 10} ${M.y - 10} L ${M.x - 10} ${M.y} L ${M.x} ${M.y}`} fill="none" stroke={angleBlue} strokeWidth="2" />
        <text x={M.x - 30} y={M.y - 20} fill={angleBlue} fontSize="12">2x - 8°</text>
        
        <line x1={M.x - 40} y1={M.y - 3} x2={M.x - 50} y2={M.y + 3} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={M.x + 40} y1={M.y - 3} x2={M.x + 50} y2={M.y + 3} stroke={strokeColor} strokeWidth="1.5" />
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function SssSlide5() {
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
      id: 'sss-applications-quiz',
      conceptId: 'sss-applications',
      conceptName: 'SSS Applications',
      type: 'judging',
      description: 'Testing SSS applications in polygons'
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
  id: 'sss-app-q7-parallelogram',
  question: 'In the figure above, SR = PQ and SP = QR. If angle PSR = 115° and angle RQP = 3x - 5°, find the value of x.',
  figure: <FigureQ1 />,
  options: [
    "x = 40°",
    "x = 40.75°",
    "x = 40.15°",
    "x = 40.25°",
    "x = 40.5°"
  ],
  correctAnswer: "x = 40°",
  explanation:
    "The triangles PSR and RQP are congruent by SSS (SR = PQ, SP = RQ, and PR is a common side). So angle PSR = angle RQP. Therefore, 115 = 3x - 5. Solving gives 3x = 120 and x = 40°."
},
{
  id: 'sss-app-q8-isosceles',
  question: 'In triangle ABC, M is the midpoint of BC. If AB = AC and angle AMC = 2x - 8°, find the value of x.',
  figure: <FigureQ2 />,
  options: [
    "x = 53°",
    "x = 47°",
    "x = 50°",
    "x = 49°",
    "x = 56°"
  ],
  correctAnswer: "x = 49°",
  explanation:
    "Triangles AMB and AMC are congruent by SSS (AB = AC, BM = CM, and AM is common). So angle AMB = angle AMC. These two angles form a straight line, so together they make 180°. Since they are equal, each is 90°. So 2x - 8 = 90, which gives 2x = 98 and x = 49°."
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
      interactionId: `sss-app-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sss-applications',
      conceptName: 'SSS Applications',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Applying SSS in Polygons</h2>
            <p className="text-lg leading-relaxed mb-4">
              In the figure below, SR \cong QP and SP \cong QR. If m\angle RSP = 67^\circ and m\angle PQR = 2x + 12^\circ, find the value of x.
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              From the diagram, ΔRSP and ΔPQR are congruent by SSS (side-side-side) since PR is their common side and we have two more pairs of congruent sides:
            </p>
            <ul className="list-none my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg font-mono text-center">
                <li>SR ≅ PQ</li>
                <li>SP ≅ QR</li>
            </ul>

            <p className="text-lg leading-relaxed mt-4">
              So, we obtain
            </p>
            <p className="text-xl font-bold text-center my-4 font-mono text-blue-600 dark:text-blue-400">
              ∠RSP ≅ ∠PQR
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Therefore,
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono">
              m∠RSP = m∠PQR<br/>
              67° = 2x + 12°<br/>
              2x = 55°<br/>
              x = 27.5°
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
                  {score === questions.length ? "You've mastered SSS applications!" : 'Good practice!'}
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
      slideId="sss-applications"
      slideTitle="Applying the SSS Criterion in Isosceles Triangles and Parallelograms"
      moduleId="congruence"
      submoduleId="sss-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}