import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE FOR EXAMPLE (Left Side) ---
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 240;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const commonProps = { fill: 'none', strokeWidth: 2 };
  
  const A = { x: 200, y: 190 };
  const B = { x: 200, y: 70 };
  const C = { x: 100, y: 90 };
  const D = { x: 300, y: 90 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`50 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y} L ${B.x} ${B.y} L ${D.x} ${D.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={A.x} y={A.y + 15} fill={strokeColor} textAnchor="middle">A</text>
        <text x={B.x} y={B.y - 10} fill={strokeColor} textAnchor="middle">B</text>
        <text x={C.x - 15} y={C.y} fill={strokeColor}>C</text>
        <text x={D.x + 5} y={D.y} fill={strokeColor}>D</text>

        {/* Markings */}
        <text x={C.x + 40} y={C.y - 10} fill={strokeColor} fontSize="12">6</text>
        <text x={D.x - 40} y={D.y - 10} fill={strokeColor} fontSize="12">6</text>
        <line x1={145} y1={78} x2={155} y2={82} stroke={strokeColor} strokeWidth="2" /> {/* BC */}
        <line x1={245} y1={82} x2={255} y2={78} stroke={strokeColor} strokeWidth="2" /> {/* BD */}
        
        <path d={`M ${C.x + 12} ${C.y} L ${C.x + 12} ${C.y + 12} L ${C.x} ${C.y + 12}`} fill="none" stroke={angleGreen} strokeWidth="2" />
        <path d={`M ${D.x - 12} ${D.y} L ${D.x - 12} ${D.y + 12} L ${D.x} ${D.y + 12}`} fill="none" stroke={angleGreen} strokeWidth="2" />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q6) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const commonProps = { fill: 'none', strokeWidth: 2 };
  
  const A = { x: 50, y: 110 };
  const B = { x: 250, y: 110 };
  const C = { x: 200, y: 40 };
  const D = { x: 200, y: 180 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y} L ${B.x} ${B.y} L ${D.x} ${D.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={A.x - 15} y={A.y} fill={strokeColor}>A</text>
        <text x={B.x + 5} y={B.y} fill={strokeColor}>B</text>
        <text x={C.x} y={C.y - 10} fill={strokeColor} textAnchor="middle">C</text>
        <text x={D.x} y={D.y + 15} fill={strokeColor} textAnchor="middle">D</text>

        {/* Markings */}
        <line x1={115} y1={70} x2={125} y2={75} stroke={strokeColor} strokeWidth="2" /> {/* AC */}
        <line x1={118} y1={67} x2={128} y2={72} stroke={strokeColor} strokeWidth="2" />
        <line x1={115} y1={150} x2={125} y2={145} stroke={strokeColor} strokeWidth="2" /> {/* AD */}
        <line x1={118} y1={153} x2={128} y2={148} stroke={strokeColor} strokeWidth="2" />

        <line x1={225} y1={75} x2={235} y2={70} stroke={strokeColor} strokeWidth="2" /> {/* CB */}
        <line x1={225} y1={145} x2={235} y2={150} stroke={strokeColor} strokeWidth="2" /> {/* DB */}
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q7) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };
  
  const R = { x: 200, y: 30 };
  const S = { x: 50, y: 180 };
  const Q = { x: 350, y: 110 };
  const P = { x: 100, y: 110 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${R.x} ${R.y} L ${S.x} ${S.y} L ${Q.x} ${Q.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${P.x} ${P.y} L ${Q.x} ${Q.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={R.x} y={R.y - 10} fill={strokeColor} textAnchor="middle">R</text>
        <text x={S.x - 15} y={S.y + 5} fill={strokeColor}>S</text>
        <text x={Q.x + 5} y={Q.y} fill={strokeColor}>Q</text>
        <text x={P.x - 15} y={P.y} fill={strokeColor}>P</text>

        {/* Markings */}
        <line x1={115} y1={65} x2={125} y2={70} stroke={strokeColor} strokeWidth="2" /> {/* RS */}
        <line x1={275} y1={65} x2={285} y2={70} stroke={strokeColor} strokeWidth="2" /> {/* RQ */}

        <path d={`M ${P.x} ${P.y - 10} L ${P.x + 10} ${P.y - 10} L ${P.x + 10} ${P.y}`} fill="none" stroke={angleBlue} strokeWidth="2" />
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function CombiningSlide4() {
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
      id: 'combining-common-side-quiz',
      conceptId: 'combining-criteria-common-side',
      conceptName: 'Combining Criteria Common Side',
      type: 'judging',
      description: 'Testing identification of criteria using a common side'
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
      id: 'combining-common-side-q6',
      question: 'By which congruence criterion does it follow that ΔABC ≅ ΔABD?',
      figure: <FigureQ1 />,
      options: allOptions,
      correctAnswer: "SSS",
      explanation: "Correct! We are given $AC \cong AD$ (S) and $BC \cong BD$ (S). The *hidden* clue is the shared side $AB \cong AB$ (S). This gives us all three sides, a perfect SSS pattern."
    },
    {
      id: 'combining-common-side-q7',
      question: 'By which congruence criterion does it follow that ΔPQR ≅ ΔPQS?',
      figure: <FigureQ2 />,
      options: allOptions,
      correctAnswer: "HL",
      explanation: "Correct! We have two right triangles (∠QPR and ∠QPS). They share a common leg $PQ$ (L). We are given that the hypotenuses are congruent, $RQ \cong SQ$ (H). This is a perfect HL pattern."
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
      interactionId: `combining-common-side-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'combining-criteria-common-side',
      conceptName: 'Combining Criteria Common Side',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Cases With Common Sides</h2>
            <p className="text-lg leading-relaxed mb-4">
              By which congruence criterion does it follow that ΔABC ≅ ΔABD?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              First, we recall the HL (Hypotenuse-Leg) congruence criterion:
            </p>
            <blockquote className="my-4 p-4 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg italic font-medium leading-relaxed">
                Two right triangles are congruent if and only if they have congruent hypotenuses and a pair of congruent legs.
              </p>
            </blockquote>

            <p className="text-lg leading-relaxed mt-4">
              Notice that the triangles have a common side, $AB$. To determine which criterion applies, it's helpful to think of this as two separate triangles.
            </p>

            <p className="text-lg leading-relaxed mt-4">
              Next, we have:
            </p>
            <div className="flex justify-around items-center text-center my-4">
              <div>
                <p className="text-lg font-mono">m∠C = m∠D = 90°</p>
                <p className="text-sm text-slate-500">Right Angle</p>
              </div>
              <div>
                <p className="text-lg font-mono">AB ≅ AB</p>
                <p className="text-sm text-slate-500">Hypotenuse</p>
              </div>
              <div>
                <p className="text-lg font-mono">BC ≅ BD</p>
                <p className="text-sm text-slate-500">Leg</p>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              Therefore, ΔABC and ΔABD are congruent by HL.
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Find the Common Side</h3>
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
                <div className="text-3xl mb-4">🤝</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered the Reflexive Property!" : 'Great job!'}
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
      slideId="combining-common-sides"
      slideTitle="Cases With Common Sides"
      moduleId="congruence"
      submoduleId="combining-congruence-criteria"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}