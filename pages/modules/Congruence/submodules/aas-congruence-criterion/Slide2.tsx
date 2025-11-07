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
  const P1 = { A: { x: 250, y: 30 }, B: { x: 300, y: 120 }, C: { x: 370, y: 80 } };
  const P2 = { A: { x: 30, y: 250 }, B: { x: 170, y: 250 }, C: { x: 80, y: 160 } };
  const P3 = { A: { x: 230, y: 250 }, B: { x: 370, y: 250 }, C: { x: 320, y: 160 } };

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
          <line x1={133} y1={73} x2={143} y2={68} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle P1 --- */}
        <g>
          <path d={`M ${P1.A.x} ${P1.A.y} L ${P1.B.x} ${P1.B.y} L ${P1.C.x} ${P1.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={P1.A.x + 20} y={P1.A.y + 30} fill={labelColor} fontSize="14">P₁</text>
          <path d={`M ${P1.B.x - 15} ${P1.B.y} A 15 15 0 0 0 ${P1.B.x - 12.1} ${P1.B.y - 8.8}`} stroke={angle1} {...commonProps} />
          <path d={`M ${P1.A.x + 13.6} ${P1.A.y + 6.5} A 15 15 0 0 1 ${P1.A.x} ${P1.A.y + 15}`} stroke={angle2} {...commonProps} />
          <line x1={325} y1={50} x2={335} y2={45} stroke={sideColor} strokeWidth="1.5" />
          <line x1={328} y1={53} x2={338} y2={48} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle P2 --- */}
        <g>
          <path d={`M ${P2.A.x} ${P2.A.y} L ${P2.B.x} ${P2.B.y} L ${P2.C.x} ${P2.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={P2.C.x} y={P2.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle">P₂</text>
          <path d={`M ${P2.A.x + 15} ${P2.A.y} A 15 15 0 0 1 ${P2.A.x + 13.6} ${P2.A.y - 6.5}`} stroke={angle1} {...commonProps} />
          <path d={`M ${P2.C.x + 12.1} ${P2.C.y + 8.8} A 15 15 0 0 1 ${P2.C.x} ${P2.C.y + 15}`} stroke={angle3} {...commonProps} />
          <line x1={130} y1={205} x2={140} y2={208} stroke={sideColor} strokeWidth="1.5" />
          <line x1={133} y1={202} x2={143} y2={205} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle P3 --- */}
        <g>
          <path d={`M ${P3.A.x} ${P3.A.y} L ${P3.B.x} ${P3.B.y} L ${P3.C.x} ${P3.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={P3.C.x} y={P3.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle">P₃</text>
          <line x1={P3.A.x + 65} y1={P3.A.y - 3} x2={P3.A.x + 75} y2={P3.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          <line x1={P3.A.x + 70} y1={P3.A.y - 3} x2={P3.A.x + 80} y2={P3.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
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
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const anglePurple = isDarkMode ? '#C084FC' : '#9333EA';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 200, y: 30 };
  const B = { x: 80, y: 80 };
  const C = { x: 120, y: 180 };
  const D = { x: 200, y: 200 };
  const E = { x: 280, y: 180 };
  const F = { x: 320, y: 80 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Draw all lines */}
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} L ${E.x} ${E.y} L ${F.x} ${F.y} Z`} stroke={strokeColor} fill={isDarkMode ? 'rgb(30 41 59 / 0.5)' : 'rgb(241 245 249 / 0.5)'} />
        <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${E.x} ${E.y}`} stroke={strokeColor} {...commonProps} />

        {/* Labels */}
        <text x={A.x} y={A.y - 10} fill={strokeColor} textAnchor="middle">A</text>
        <text x={B.x - 15} y={B.y} fill={strokeColor}>B</text>
        <text x={C.x - 15} y={C.y + 5} fill={strokeColor}>C</text>
        <text x={D.x} y={D.y + 15} fill={strokeColor} textAnchor="middle">D</text>
        <text x={E.x + 5} y={E.y + 5} fill={strokeColor}>E</text>
        <text x={F.x + 5} y={F.y} fill={strokeColor}>F</text>

        {/* Markings */}
        <path d={`M ${A.x - 12} ${A.y + 15} A 20 20 0 0 1 ${A.x + 12} ${A.y + 15}`} stroke={angleBlue} strokeWidth="3" fill={angleBlue} fillOpacity="0.4" />
        <path d={`M ${D.x - 15} ${D.y - 10} A 20 20 0 0 1 ${D.x + 15} ${D.y - 10}`} stroke={anglePurple} strokeWidth="3" fill={anglePurple} fillOpacity="0.4" />
        <path d={`M ${B.x + 10} ${B.y - 5} A 15 15 0 0 1 ${B.x + 15} ${B.y + 10}`} stroke={angleOrange} strokeWidth="3" fill={angleOrange} fillOpacity="0.4" />
        <path d={`M ${F.x - 10} ${F.y - 5} A 15 15 0 0 0 ${F.x - 15} ${F.y + 10}`} stroke={angleOrange} strokeWidth="3" fill={angleOrange} fillOpacity="0.4" />
        
        <line x1={98} y1={128} x2={108} y2={132} stroke={strokeColor} strokeWidth="2" /> {/* BC */}
        <line x1={292} y1={132} x2={302} y2={128} stroke={strokeColor} strokeWidth="2" /> {/* FE */}
        
        <line x1={132} y1={52} x2={142} y2={58} stroke={strokeColor} strokeWidth="2" /> {/* AB */}
        <line x1={135} y1={49} x2={145} y2={55} stroke={strokeColor} strokeWidth="2" />
        <line x1={258} y1={58} x2={268} y2={52} stroke={strokeColor} strokeWidth="2" /> {/* AF */}
        <line x1={255} y1={55} x2={265} y2={49} stroke={strokeColor} strokeWidth="2" />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (T, P1, P2, P3) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 280;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angle1 = isDarkMode ? '#FDE047' : '#EAB308'; // Yellow
  const angle2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const angle3 = isDarkMode ? '#F87171' : '#EF4444'; // Red/Orange
  
  // --- THIS IS THE MISSING LINE ---
  const sideColor = isDarkMode ? '#E2E8F0' : '#4A5568'; // For side hash marks
  
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T = { A: { x: 30, y: 120 }, B: { x: 170, y: 120 }, C: { x: 80, y: 30 } };
  const P1 = { A: { x: 250, y: 30 }, B: { x: 300, y: 120 }, C: { x: 370, y: 80 } };
  const P2 = { A: { x: 30, y: 250 }, B: { x: 170, y: 250 }, C: { x: 80, y: 160 } };
  const P3 = { A: { x: 230, y: 250 }, B: { x: 370, y: 250 }, C: { x: 320, y: 160 } };
  
  const greenSquare = (p: {x: number, y: number}) => 
    <path d={`M ${p.x} ${p.y} l 12 0 l 0 12 l -12 0 Z`} fill={angle2} stroke="none" />;

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* --- Triangle T --- */}
        <g>
          <path d={`M ${T.A.x} ${T.A.y} L ${T.B.x} ${T.B.y} L ${T.C.x} ${T.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={T.C.x + 10} y={T.C.y - 5} fill={labelColor} fontSize="14">T</text>
          <path d={`M ${T.A.x + 15} ${T.A.y} A 15 15 0 0 1 ${T.A.x + 13.6} ${T.A.y - 6.5}`} stroke={angle1} {...commonProps} />
          {greenSquare({x: T.C.x, y: T.C.y})}
          <line x1={130} y1={70} x2={140} y2={65} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle P1 --- */}
        <g>
          <path d={`M ${P1.A.x} ${P1.A.y} L ${P1.B.x} ${P1.B.y} L ${P1.C.x} ${P1.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={P1.A.x + 20} y={P1.A.y + 30} fill={labelColor} fontSize="14">P₁</text>
          <path d={`M ${P1.C.x - 15} ${P1.C.y} A 15 15 0 0 1 ${P1.C.x - 13.6} ${P1.C.y - 6.5}`} stroke={angle3} {...commonProps} />
          {greenSquare({x: P1.A.x, y: P1.A.y})}
          <line x1={325} y1={50} x2={335} y2={45} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle P2 --- */}
        <g>
          <path d={`M ${P2.A.x} ${P2.A.y} L ${P2.B.x} ${P2.B.y} L ${P2.C.x} ${P2.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={P2.C.x} y={P2.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle">P₂</text>
          <path d={`M ${P2.B.x - 15} ${P2.B.y} A 15 15 0 0 0 ${P2.B.x - 13.6} ${P2.B.y - 6.5}`} stroke={angle3} {...commonProps} />
          {greenSquare({x: P2.C.x, y: P2.C.y})}
          <line x1={130} y1={205} x2={140} y2={208} stroke={sideColor} strokeWidth="1.5" />
        </g>
        {/* --- Triangle P3 --- */}
        <g>
          <path d={`M ${P3.A.x} ${P3.A.y} L ${P3.B.x} ${P3.B.y} L ${P3.C.x} ${P3.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={P3.C.x} y={P3.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle">P₃</text>
          {greenSquare({x: P3.C.x, y: P3.C.y})}
          <line x1={P3.A.x + 65} y1={P3.A.y - 3} x2={P3.A.x + 75} y2={P3.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};

export default function AasSlide2() {
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
      id: 'aas-identification-quiz', // Updated ID
      conceptId: 'aas-identification', // Updated ID
      conceptName: 'AAS Identification', // Updated Name
      type: 'judging',
      description: 'Testing ability to identify AAS congruence'
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
  id: 'aas-id-q1-pentagon',
  question: 'According to the AAS criterion only, which of the following triangles is congruent to triangle ABC?',
  figure: <FigureQ1 />,
  options: [
    "Triangle AEB",
    "Triangle ACD",
    "Triangle ADE",
    "Triangle AFE",
    "Triangle ABD"
  ],
  correctAnswer: "Triangle AFE",
  explanation:
    "Correct! Triangle ABC and Triangle AFE match the Angle-Angle-Side (AAS) pattern. Angle B matches angle F, and BC matches FE. Also, angle A in triangle ABC matches angle A in triangle AFE. The side is not between the two angles, so this is AAS."
},
{
  id: 'aas-id-q2-triangles',
  question: 'According to the AAS criterion only, which of the following triangles is congruent to triangle T?',
  figure: <FigureQ2 />,
  options: [
    "Triangle P1 only",
    "Triangle P2 and P3 only",
    "Triangle P3 only",
    "Triangle P1 and P2 only",
    "Triangle P2 only"
  ],
  correctAnswer: "Triangle P1 only",
  explanation:
    "Correct! Triangle T has two angles marked (one yellow and one right angle) and a side that is not between these angles. Triangle P1 also has two matching angles and a non-included side. So Triangle T and Triangle P1 match by AAS."
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
      interactionId: `aas-id-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`, // Updated ID
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'aas-identification', // Updated ID
      conceptName: 'AAS Identification', // Updated Name
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Identifying AAS Congruence</h2>
            <p className="text-lg leading-relaxed mb-4">
              According to the AAS criterion only, which of the following triangles are congruent to $T$?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              The AAS (angle-angle-side) congruence criterion states:
            </p>
            <blockquote className="my-4 p-4 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg italic font-medium leading-relaxed">
                Two triangles are congruent if and only if two angles and a corresponding <strong>non-included side</strong> of one triangle are congruent to two angles and a corresponding non-included side of the other triangle.
              </p>
            </blockquote>

            <p className="text-lg leading-relaxed mt-4">
              Let's examine each triangle:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <strong>$P_1 \cong T$</strong> by AAS, since it has two angles (yellow, green) and a non-included side (2 hashes) congruent to the corresponding parts of $T$.
                </li>
                <li>
                  <strong>$P_2 \cong T$</strong> by AAS. It also has two angles (yellow, orange) and a non-included side (2 hashes) congruent to the corresponding parts of $T$. (This implies green $\cong$ orange).
                </li>
                <li>
                  <strong>$P_3$ is not congruent to $T$</strong> by AAS, since we don't have two pairs of congruent angles.
                </li>
            </ul>
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              Therefore, the correct answer is $P_1$ and $P_2$ only.
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
      slideId="aas-identification" // Updated ID
      slideTitle="Identifying Congruence Using AAS" // Updated Title
      moduleId="congruence"
      submoduleId="aas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}