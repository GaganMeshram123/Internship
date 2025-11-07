import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE FOR EXAMPLE (Left Side) ---
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 280;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angle1 = isDarkMode ? '#FDE047' : '#EAB308'; // Yellow
  const angle2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const angle3 = isDarkMode ? '#F87171' : '#EF4444'; // Red/Orange
  const sideColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  // Triangle Defs
  const T = { A: { x: 80, y: 120 }, B: { x: 180, y: 120 }, C: { x: 160, y: 30 } };
  const P = { A: { x: 250, y: 30 }, B: { x: 300, y: 120 }, C: { x: 370, y: 80 } };
  const Q = { A: { x: 30, y: 250 }, B: { x: 170, y: 250 }, C: { x: 80, y: 160 } };
  const R = { A: { x: 230, y: 250 }, B: { x: 370, y: 250 }, C: { x: 320, y: 160 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* --- Triangle T --- */}
        <g>
          <path d={`M ${T.A.x} ${T.A.y} L ${T.B.x} ${T.B.y} L ${T.C.x} ${T.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={T.A.x} y={T.A.y - 10} fill={labelColor} fontSize="14">T</text>
          <path d={`M ${T.A.x + 15} ${T.A.y} A 15 15 0 0 1 ${T.A.x + 12.1} ${T.A.y - 8.8}`} stroke={angle1} {...commonProps} />
          <path d={`M ${T.C.x - 13.6} ${T.C.y + 6.5} A 15 15 0 0 1 ${T.C.x} ${T.C.y + 15}`} stroke={angle2} {...commonProps} />
          <path d={`M ${T.B.x - 15} ${T.B.y} A 15 15 0 0 0 ${T.B.x - 12.1} ${T.B.y - 8.8}`} stroke={angle3} {...commonProps} />
          <line x1={130} y1={70} x2={140} y2={65} stroke={sideColor} strokeWidth="1.5" />
          <line x1={T.A.x + 45} y1={T.A.y - 3} x2={T.A.x + 55} y2={T.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          <line x1={T.A.x + 50} y1={T.A.y - 3} x2={T.A.x + 60} y2={T.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle P --- */}
        <g>
          <path d={`M ${P.A.x} ${P.A.y} L ${P.B.x} ${P.B.y} L ${P.C.x} ${P.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={P.A.x + 20} y={P.A.y + 30} fill={labelColor} fontSize="14">P</text>
          <path d={`M ${P.B.x} ${P.B.y} A 15 15 0 0 0 ${P.B.x - 12.1} ${P.B.y - 8.8}`} stroke={angle1} {...commonProps} />
          <line x1={330} y1={100} x2={340} y2={95} stroke={sideColor} strokeWidth="1.5" />
          <line x1={P.A.x + 20} y1={P.A.y + 70} x2={P.A.x + 30} y2={P.A.y + 65} stroke={sideColor} strokeWidth="1.5" />
          <line x1={P.A.x + 23} y1={P.A.y + 73} x2={P.A.x + 33} y2={P.A.y + 68} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle Q --- */}
        <g>
          <path d={`M ${Q.A.x} ${Q.A.y} L ${Q.B.x} ${Q.B.y} L ${Q.C.x} ${Q.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={Q.C.x} y={Q.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle">Q</text>
          <line x1={130} y1={205} x2={140} y2={208} stroke={sideColor} strokeWidth="1.5" />
          <line x1={50} y1={205} x2={60} y2={208} stroke={sideColor} strokeWidth="1.5" />
          <line x1={53} y1={202} x2={63} y2={205} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle R --- */}
        <g>
          <path d={`M ${R.A.x} ${R.A.y} L ${R.B.x} ${R.B.y} L ${R.C.x} ${R.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={R.C.x} y={R.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle">R</text>
          <path d={`M ${R.A.x + 15} ${R.A.y} A 15 15 0 0 1 ${R.A.x + 13.6} ${R.A.y - 6.5}`} stroke={angle1} {...commonProps} />
          <line x1={R.A.x + 65} y1={R.A.y - 3} x2={R.A.x + 75} y2={R.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          <line x1={R.A.x + 70} y1={R.A.y - 3} x2={R.A.x + 80} y2={R.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          <line x1={340} y1={205} x2={350} y2={208} stroke={sideColor} strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Pentagon) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 200, y: 30 };
  const B = { x: 80, y: 100 };
  const C = { x: 120, y: 180 };
  const D = { x: 280, y: 180 };
  const E = { x: 320, y: 100 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Draw all lines */}
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} L ${E.x} ${E.y} Z`} stroke={strokeColor} fill={isDarkMode ? 'rgb(30 41 59 / 0.5)' : 'rgb(241 245 249 / 0.5)'} />
        <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} />

        {/* Labels */}
        <text x={A.x} y={A.y - 10} fill={strokeColor} textAnchor="middle">A</text>
        <text x={B.x - 15} y={B.y} fill={strokeColor}>B</text>
        <text x={C.x - 15} y={C.y + 5} fill={strokeColor}>C</text>
        <text x={D.x + 5} y={D.y + 5} fill={strokeColor}>D</text>
        <text x={E.x + 5} y={E.y} fill={strokeColor}>E</text>

        {/* Markings */}
        <path d={`M ${A.x - 12} ${A.y + 15} A 20 20 0 0 1 ${A.x} ${A.y + 20}`} stroke={angleOrange} strokeWidth="3" fill={angleOrange} fillOpacity="0.4" />
        <path d={`M ${A.x} ${A.y + 20} A 20 20 0 0 1 ${A.x + 12} ${A.y + 15}`} stroke={angleGreen} strokeWidth="3" fill={angleGreen} fillOpacity="0.4" />
        
        <line x1={140} y1={60} x2={150} y2={65} stroke={strokeColor} strokeWidth="2" /> {/* AB */}
        <line x1={250} y1={65} x2={260} y2={60} stroke={strokeColor} strokeWidth="2" /> {/* AE */}

        <line x1={160} y1={100} x2={170} y2={105} stroke={strokeColor} strokeWidth="2" /> {/* AC */}
        <line x1={162} y1={97} x2={172} y2={102} stroke={strokeColor} strokeWidth="2" />
        <line x1={230} y1={105} x2={240} y2={100} stroke={strokeColor} strokeWidth="2" /> {/* AD */}
        <line x1={228} y1={102} x2={238} y2={97} stroke={strokeColor} strokeWidth="2" />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (T, P, Q, R) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 280;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angle1 = isDarkMode ? '#FDE047' : '#EAB308'; // Yellow
  const angle2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const angle3 = isDarkMode ? '#F87171' : '#EF4444'; // Red/Orange
  const sideColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T = { A: { x: 80, y: 120 }, B: { x: 180, y: 120 }, C: { x: 160, y: 30 } };
  const P = { A: { x: 250, y: 30 }, B: { x: 300, y: 120 }, C: { x: 370, y: 80 } };
  const Q = { A: { x: 30, y: 250 }, B: { x: 170, y: 250 }, C: { x: 80, y: 160 } };
  const R = { A: { x: 230, y: 250 }, B: { x: 370, y: 250 }, C: { x: 320, y: 160 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* --- Triangle T --- */}
        <g>
          <path d={`M ${T.A.x} ${T.A.y} L ${T.B.x} ${T.B.y} L ${T.C.x} ${T.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={T.A.x} y={T.A.y - 10} fill={labelColor} fontSize="14">T</text>
          <path d={`M ${T.A.x + 15} ${T.A.y} A 15 15 0 0 1 ${T.A.x + 12.1} ${T.A.y - 8.8}`} stroke={angle1} {...commonProps} />
          <path d={`M ${T.C.x - 13.6} ${T.C.y + 6.5} A 15 15 0 0 1 ${T.C.x} ${T.C.y + 15}`} stroke={angle2} {...commonProps} />
          <line x1={130} y1={70} x2={140} y2={65} stroke={sideColor} strokeWidth="1.5" />
          <line x1={T.A.x + 45} y1={T.A.y - 3} x2={T.A.x + 55} y2={T.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          <line x1={T.A.x + 50} y1={T.A.y - 3} x2={T.A.x + 60} y2={T.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle P --- */}
        <g>
          <path d={`M ${P.A.x} ${P.A.y} L ${P.B.x} ${P.B.y} L ${P.C.x} ${P.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={P.A.x + 20} y={P.A.y + 30} fill={labelColor} fontSize="14">P</text>
          <path d={`M ${P.B.x} ${P.B.y} A 15 15 0 0 0 ${P.B.x - 12.1} ${P.B.y - 8.8}`} stroke={angle1} {...commonProps} />
          <line x1={330} y1={100} x2={340} y2={95} stroke={sideColor} strokeWidth="1.5" />
          <line x1={P.A.x + 20} y1={P.A.y + 70} x2={P.A.x + 30} y2={P.A.y + 65} stroke={sideColor} strokeWidth="1.5" />
          <line x1={P.A.x + 23} y1={P.A.y + 73} x2={P.A.x + 33} y2={P.A.y + 68} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle Q --- */}
        <g>
          <path d={`M ${Q.A.x} ${Q.A.y} L ${Q.B.x} ${Q.B.y} L ${Q.C.x} ${Q.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={Q.C.x} y={Q.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle">Q</text>
          <path d={`M ${Q.A.x + 15} ${Q.A.y} A 15 15 0 0 1 ${Q.A.x + 13.6} ${Q.A.y - 6.5}`} stroke={angle1} {...commonProps} />
          <line x1={130} y1={205} x2={140} y2={208} stroke={sideColor} strokeWidth="1.5" />
          <line x1={50} y1={205} x2={60} y2={208} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle R --- */}
        <g>
          <path d={`M ${R.A.x} ${R.A.y} L ${R.B.x} ${R.B.y} L ${R.C.x} ${R.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={R.C.x} y={R.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle">R</text>
          <path d={`M ${R.A.x + 15} ${R.A.y} A 15 15 0 0 1 ${R.A.x + 13.6} ${R.A.y - 6.5}`} stroke={angle1} {...commonProps} />
          <line x1={R.A.x + 65} y1={R.A.y - 3} x2={R.A.x + 75} y2={R.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          <line x1={R.A.x + 70} y1={R.A.y - 3} x2={R.A.x + 80} y2={R.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          <line x1={340} y1={205} x2={350} y2={208} stroke={sideColor} strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function SasSlide2() {
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
      id: 'sas-identification-quiz',
      conceptId: 'sas-criterion-identification',
      conceptName: 'SAS Criterion Identification',
      type: 'judging',
      description: 'Testing ability to identify SAS'
    }
  ];

  // --- UPDATED INTERFACE ---
  interface QuizQuestion {
    id: string;
    question: string;
    figure: React.ReactNode; // Added figure
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED QUESTIONS ARRAY ---
  const questions: QuizQuestion[] = [
   {
  id: 'sas-id-q1-pentagon',
  question: 'Based on the SAS rule, which triangle is congruent to triangle ABC?',
  figure: <FigureQ1 />,
  options: [
    "Triangle ABE only",
    "None",
    "Triangle ADE only",
    "Triangle ACD only",
    "Triangle ADE and Triangle ACD"
  ],
  correctAnswer: "Triangle ADE only",
  explanation:
    "Triangle ABC has two sides and the angle between them known (AB, angle at A, and AC). Triangle ADE also has two sides and the included angle matching the same pattern (AE, angle at A, and AD). Therefore, triangle ABC and triangle ADE are congruent by the SAS rule."
},
{
  id: 'sas-id-q2-triangles',
  question: 'Based on the SAS rule, which triangle is congruent to triangle T?',
  figure: <FigureQ2 />,
  options: [
    "Triangles P, Q, and R",
    "Triangles P and R only",
    "Triangle R only",
    "Triangle P only",
    "Triangles P and Q only"
  ],
  correctAnswer: "Triangle P only",
  explanation:
    "Triangle T has two sides and the included angle known. Triangle P has the same pattern of side–angle–side. Triangle R does not have the angle included between the two known sides, so it does not fit the SAS rule. Therefore, only triangle P is congruent to triangle T."
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
      interactionId: `sas-id-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sas-criterion-identification',
      conceptName: 'SAS Criterion Identification',
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
              According to the SAS criterion only, which of the following triangles are congruent to $T$?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              The SAS (side-angle-side) congruence criterion states:
            </p>
            <blockquote className="my-4 p-4 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg italic font-medium leading-relaxed">
                Two triangles are congruent if and only if two sides and the <strong>included angle</strong> of one triangle are congruent to two sides and the included angle of the other triangle.
              </p>
            </blockquote>

            <p className="text-lg leading-relaxed mt-4">
              With that in mind, let's examine each of the given triangles:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <strong>$P \cong T$</strong> by SAS since two sides (1 hash, 2 hashes) and the <strong>included angle</strong> (yellow) are congruent.
                </li>
                <li>
                  <strong>$Q$ is not congruent to $T$</strong> by SAS since we don't have a pair of congruent angles.
                </li>
                <li>
                  <strong>$R \cong T$</strong> by SAS too, since two sides (1 hash, 2 hashes) and the <strong>included angle</strong> (yellow) are congruent.
                </li>
            </ul>
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              Therefore, the correct answer is "P and R only."
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Identification Practice</h3>
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
                <div className="text-3xl mb-4">🧐</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Great job spotting the patterns!" : 'Good practice!'}
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
      slideId="sas-identifying-triangles"
      slideTitle="Identifying Congruent Triangles Using SAS"
      moduleId="congruence"
      submoduleId="sas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}