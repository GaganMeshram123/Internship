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
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };
  
  const Q = { x: 30, y: 50 };
  const P = { x: 180, y: 110 };
  const R = { x: 80, y: 170 };
  const M = { x: 370, y: 170 };
  const N = { x: 320, y: 50 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${Q.x} ${Q.y} L ${P.x} ${P.y} L ${R.x} ${R.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${M.x} ${M.y} L ${P.x} ${P.y} L ${N.x} ${N.y} Z`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={Q.x - 15} y={Q.y} fill={strokeColor}>Q</text>
        <text x={R.x - 15} y={R.y + 5} fill={strokeColor}>R</text>
        <text x={P.x} y={P.y + 20} fill={strokeColor} textAnchor="middle">P</text>
        <text x={N.x + 5} y={N.y} fill={strokeColor}>N</text>
        <text x={M.x + 5} y={M.y + 5} fill={strokeColor}>M</text>

        {/* Markings */}
        <line x1={95} y1={75} x2={105} y2={80} stroke={strokeColor} strokeWidth="2" /> {/* QP */}
        <line x1={98} y1={72} x2={108} y2={77} stroke={strokeColor} strokeWidth="2" />
        <line x1={265} y1={77} x2={275} y2={72} stroke={strokeColor} strokeWidth="2" /> {/* PM */}
        <line x1={262} y1={80} x2={272} y2={75} stroke={strokeColor} strokeWidth="2" />

        <line x1={125} y1={143} x2={135} y2={138} stroke={strokeColor} strokeWidth="2" /> {/* PR */}
        <line x1={225} y1={138} x2={235} y2={143} stroke={strokeColor} strokeWidth="2" /> {/* PN */}

        {/* Vertical Angles */}
        <path d={`M ${P.x - 15} ${P.y - 8} A 15 15 0 0 0 ${P.x + 5} ${P.y - 14}`} stroke={angleBlue} {...commonProps} />
        <path d={`M ${P.x + 15} ${P.y + 8} A 15 15 0 0 0 ${P.x - 5} ${P.y + 14}`} stroke={angleBlue} {...commonProps} />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q4) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };
  
  const A = { x: 200, y: 110 };
  const B = { x: 300, y: 150 };
  const C = { x: 50, y: 170 };
  const D = { x: 100, y: 70 };
  const E = { x: 350, y: 50 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${C.x} ${C.y} L ${A.x} ${A.y} L ${B.x} ${B.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${E.x} ${E.y} L ${A.x} ${A.y} L ${D.x} ${D.y} Z`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={A.x} y={A.y + 20} fill={strokeColor} textAnchor="middle">A</text>
        <text x={B.x + 5} y={B.y + 5} fill={strokeColor}>B</text>
        <text x={C.x - 15} y={C.y + 5} fill={strokeColor}>C</text>
        <text x={D.x - 15} y={D.y} fill={strokeColor}>D</text>
        <text x={E.x + 5} y={E.y} fill={strokeColor}>E</text>

        {/* Markings */}
        <line x1={245} y1={133} x2={255} y2={130} stroke={strokeColor} strokeWidth="2" /> {/* AB */}
        <line x1={248} y1={136} x2={258} y2={133} stroke={strokeColor} strokeWidth="2" />
        <line x1={155} y1={87} x2={165} y2={90} stroke={strokeColor} strokeWidth="2" /> {/* AD */}
        <line x1={152} y1={84} x2={162} y2={87} stroke={strokeColor} strokeWidth="2" />
        
        <path d={`M ${B.x - 15} ${B.y} A 15 15 0 0 0 ${B.x - 10} ${B.y - 11}`} stroke={angleOrange} {...commonProps} />
        <path d={`M ${D.x + 15} ${D.y} A 15 15 0 0 1 ${D.x + 10} ${D.y + 11}`} stroke={angleOrange} {...commonProps} />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q5) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };
  
  const Y = { x: 80, y: 110 };
  const X = { x: 180, y: 110 };
  const Z = { x: 180, y: 30 };
  const S = { x: 280, y: 110 };
  const T = { x: 180, y: 190 };
  
  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${Y.x} ${Y.y} L ${Z.x} ${Z.y} L ${S.x} ${S.y} L ${T.x} ${T.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${Y.x} ${Y.y} L ${S.x} ${S.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={Y.x - 15} y={Y.y + 5} fill={strokeColor}>Y</text>
        <text x={X.x} y={X.y + 20} fill={strokeColor} textAnchor="middle">X</text>
        <text x={Z.x + 5} y={Z.y} fill={strokeColor}>Z</text>
        <text x={S.x + 5} y={S.y + 5} fill={strokeColor}>S</text>
        <text x={T.x + 5} y={T.y + 5} fill={strokeColor}>T</text>

        {/* Markings */}
        <line x1={125} y1={107} x2={135} y2={113} stroke={strokeColor} strokeWidth="2" /> {/* YX */}
        <line x1={128} y1={104} x2={138} y2={110} stroke={strokeColor} strokeWidth="2" />
        <line x1={225} y1={107} x2={235} y2={113} stroke={strokeColor} strokeWidth="2" /> {/* XS */}
        <line x1={228} y1={104} x2={238} y2={110} stroke={strokeColor} strokeWidth="2" />

        <line x1={180} y1={70} x2={175} y2={80} stroke={strokeColor} strokeWidth="2" /> {/* ZX */}
        <line x1={180} y1={150} x2={175} y2={160} stroke={strokeColor} strokeWidth="2" /> {/* TX */}
        
        <path d={`M ${X.x - 10} ${X.y - 10} L ${X.x - 10} ${X.y} L ${X.x} ${X.y}`} fill="none" stroke={angleBlue} strokeWidth="2" />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 3 (Q1) ---
const FigureQ3: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const anglePink = isDarkMode ? '#F472B6' : '#DB2777';
  const commonProps = { fill: 'none', strokeWidth: 2 };
  
  const A = { x: 150, y: 110 };
  const B = { x: 200, y: 50 };
  const C = { x: 50, y: 50 };
  const X = { x: 300, y: 110 };
  const Y = { x: 250, y: 50 };
  const Z = { x: 350, y: 170 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${X.x} ${X.y} L ${Y.x} ${Y.y} L ${Z.x} ${Z.y} Z`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={A.x} y={A.y + 20} fill={strokeColor} textAnchor="middle">A</text>
        <text x={B.x + 5} y={B.y} fill={strokeColor}>B</text>
        <text x={C.x - 15} y={C.y} fill={strokeColor}>C</text>
        <text x={X.x} y={X.y + 20} fill={strokeColor} textAnchor="middle">X</text>
        <text x={Y.x - 5} y={Y.y} fill={strokeColor}>Y</text>
        <text x={Z.x + 5} y={Z.y + 5} fill={strokeColor}>Z</text>

        {/* Markings */}
        <line x1={175} y1={80} x2={185} y2={85} stroke={strokeColor} strokeWidth="2" /> {/* AB */}
        <line x1={178} y1={77} x2={188} y2={82} stroke={strokeColor} strokeWidth="2" />
        <line x1={275} y1={80} x2={265} y2={85} stroke={strokeColor} strokeWidth="2" /> {/* YX */}
        <line x1={272} y1={77} x2={262} y2={82} stroke={strokeColor} strokeWidth="2" />
        
        <path d={`M ${A.x - 15} ${A.y} A 15 15 0 0 0 ${A.x - 10} ${A.y - 11}`} stroke={anglePink} {...commonProps} />
        <path d={`M ${X.x + 15} ${X.y} A 15 15 0 0 0 ${X.x + 10} ${X.y - 11}`} stroke={anglePink} {...commonProps} />
        
        <path d={`M ${C.x + 15} ${C.y} A 15 15 0 0 1 ${C.x + 10} ${C.y + 11}`} stroke={angleBlue} {...commonProps} />
        <path d={`M ${Z.x - 15} ${Z.y} A 15 15 0 0 1 ${Z.x - 10} ${Z.y - 11}`} stroke={angleBlue} {...commonProps} />
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function CombiningSlide3() {
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
      id: 'combining-vertical-quiz',
      conceptId: 'combining-criteria-vertical',
      conceptName: 'Combining Criteria Vertical Angles',
      type: 'judging',
      description: 'Testing identification of criteria using vertical angles'
    }
  ];
  
  const allOptions = ["SSS", "SAS", "ASA", "AAS", "HL"];

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
      id: 'combining-vertical-q1',
      question: 'By which congruence criterion does it follow that ΔABC ≅ ΔXYZ?',
      figure: <FigureQ3 />,
      options: allOptions,
      correctAnswer: "AAS",
      explanation: "Correct! We have ∠C ≅ ∠Z (Angle), ∠A ≅ ∠X (Angle, marked pink), and a non-included side $AB \cong XY$ (Side). This is an Angle-Angle-Side (AAS) pattern."
    },
    {
      id: 'combining-vertical-q2',
      question: 'By which congruence criterion does it follow that ΔABC ≅ ΔADE?',
      figure: <FigureQ1 />,
      options: allOptions,
      correctAnswer: "ASA",
      explanation: "Correct! We are given $\angle C \cong \angle D$ (Angle) and $AC \cong AD$ (Side). The *hidden* clue is that $\angle BAC \cong \angle EAD$ are vertical angles (Angle). The side $AC$ is *included* between $\angle C$ and $\angle BAC$. This is an Angle-Side-Angle (ASA) pattern."
    },
    {
      id: 'combining-vertical-q3',
      question: 'By which congruence criterion does it follow that ΔXYZ ≅ ΔXST?',
      figure: <FigureQ2 />,
      options: allOptions,
      correctAnswer: "SAS",
      explanation: "Correct! We are given $YX \cong XS$ (Side) and $ZX \cong TX$ (Side). The *hidden* clue is that $\angle YXZ \cong \angle SXT$ are vertical angles (Angle). The angle $\angle YXZ$ is *included* between sides $YX$ and $ZX$. This is a Side-Angle-Side (SAS) pattern."
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
      interactionId: `combining-vertical-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'combining-criteria-vertical',
      conceptName: 'Combining Criteria Vertical Angles',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Cases With Vertical Angles</h2>
            <p className="text-lg leading-relaxed mb-4">
              By which congruence criterion does it follow that ΔPQR ≅ ΔPMN?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              First, we recall the SAS (Side-Angle-Side) congruence criterion:
            </p>
            <blockquote className="my-4 p-4 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg italic font-medium leading-relaxed">
                Two triangles are congruent if and only if two sides and the included angle of one triangle are congruent to two sides and the included angle of the other triangle.
              </p>
            </blockquote>

            <p className="text-lg leading-relaxed mt-4">
              Notice that <strong>∠QPR ≅ ∠MPN</strong> since these two angles are <strong>vertical</strong>.
            </p>

            <p className="text-lg leading-relaxed mt-4">
              Now, we have:
            </p>
            <div className="flex justify-around items-center text-center my-4">
              <div>
                <p className="text-lg font-mono">PR ≅ PN</p>
                <p className="text-sm text-slate-500">Side</p>
              </div>
              <div>
                <p className="text-lg font-mono">∠QPR ≅ ∠MPN</p>
                <p className="text-sm text-slate-500">(Included) Angle</p>
              </div>
              <div>
                <p className="text-lg font-mono">PQ ≅ PM</p>
                <p className="text-sm text-slate-500">Side</p>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              Therefore, ΔPQR and ΔPMN are congruent by SAS.
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Find the Vertical Angle</h3>
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
                <div className="grid grid-cols-2 gap-3">
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
                <div className="text-3xl mb-4">{"<-->"}</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered spotting vertical angles!" : 'Great job!'}
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
      slideId="combining-vertical-angles"
      slideTitle="Cases With Vertical Angles"
      moduleId="congruence"
      submoduleId="combining-congruence-criteria"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}