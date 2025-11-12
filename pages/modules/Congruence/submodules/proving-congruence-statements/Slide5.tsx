import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import katex from 'katex';

// --- TABLE COMPONENT DEFINED INSIDE ---
type ProofRow = { num: string; statement: string; reason: string };

const ProofTable: React.FC<{ rows: ProofRow[] }> = ({ rows }) => {
  return (
    <div className="w-full my-4">
      <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow-md bg-white dark:bg-slate-800">
        <thead>
          <tr className="bg-slate-200 dark:bg-slate-700">
            <th className="p-3 w-12 text-center text-sm font-semibold text-slate-700 dark:text-slate-300"></th>
            <th className="p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Statement</th>
            <th className="p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Reason</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.num} className="border-t border-slate-300 dark:border-slate-600">
              <td className="p-3 text-center font-mono text-slate-500">{row.num}</td>
              <td className="p-3 font-mono" dangerouslySetInnerHTML={{ __html: katex.renderToString(row.statement, { throwOnError: false }) }}></td>
              <td className="p-3 text-slate-600 dark:text-slate-400">{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
// --- END OF TABLE COMPONENT ---

// --- NEW HELPER COMPONENTS FOR GEOMETRY ---

// Define a simple Point type
type Point = { x: number; y: number };

// --- NEW COMPONENT 1: AngleArc ---
interface AngleArcProps {
  p1: Point;
  vertex: Point;
  p2: Point;
  radius: number;
  stroke: string;
  strokeWidth?: number;
}

const AngleArc: React.FC<AngleArcProps> = ({
  p1,
  vertex,
  p2,
  radius,
  stroke,
  strokeWidth = 2,
}) => {
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  if (mag1 === 0 || mag2 === 0) return null;
  const normV1 = { x: v1.x / mag1, y: v1.y / mag1 };
  const normV2 = { x: v2.x / mag2, y: v2.y / mag2 };
  const start = { x: vertex.x + radius * normV1.x, y: vertex.y + radius * normV1.y };
  const end = { x: vertex.x + radius * normV2.x, y: vertex.y + radius * normV2.y };
  const dot = normV1.x * normV2.x + normV1.y * normV2.y;
  const angle = Math.acos(Math.max(-1, Math.min(1, dot)));
  const largeArcFlag = angle > Math.PI ? 1 : 0;
  const cross = v1.x * v2.y - v1.y * v2.x;
  const sweepFlag = cross > 0 ? 1 : 0;
  const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
  return <path d={d} stroke={stroke} strokeWidth={strokeWidth} fill="none" />;
};

// --- NEW COMPONENT 2: LineTick ---
interface LineTickProps {
  p1: Point;
  p2: Point;
  position?: number; // 0.0 to 1.0 (default 0.5)
  size?: number;     // length of the tick (default 10)
  stroke: string;
  strokeWidth?: number;
}

const LineTick: React.FC<LineTickProps> = ({
  p1,
  p2,
  position = 0.5,
  size = 10,
  stroke,
  strokeWidth = 2,
}) => {
  // 1. Find point P on the line
  const P = {
    x: p1.x + (p2.x - p1.x) * position,
    y: p1.y + (p2.y - p1.y) * position,
  };
  // 2. Find line vector V
  const V = { x: p2.x - p1.x, y: p2.y - p1.y };
  // 3. Find normal vector N
  const N = { x: -V.y, y: V.x };
  // 4. Normalize N
  const magN = Math.sqrt(N.x * N.x + N.y * N.y);
  if (magN === 0) return null;
  const normN = { x: N.x / magN, y: N.y / magN };
  // 5. Find tick start T1 and end T2
  const T1 = {
    x: P.x - normN.x * (size / 2),
    y: P.y - normN.y * (size / 2),
  };
  const T2 = {
    x: P.x + normN.x * (size / 2),
    y: P.y + normN.y * (size / 2),
  };
  const d = `M ${T1.x} ${T1.y} L ${T2.x} ${T2.y}`;
  return <path d={d} stroke={stroke} strokeWidth={strokeWidth} />;
};

// --- END OF NEW HELPER COMPONENTS ---


// --- FIGURE FOR LEFT COLUMN (UPDATED) ---
const SasCpctcFigure: React.FC = () => {
  const svgWidth = 300;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleColor = isDarkMode ? '#93C5FD' : '#3B82F6'; // Blue
  
  const N={x: 50, y: 50}, M={x: 100, y: 180}, O={x: 150, y: 115}, K={x: 250, y: 180}, L={x: 200, y: 50};
  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${N.x} ${N.y} L ${K.x} ${K.y}`} stroke={strokeColor} strokeWidth="2" />
        <path d={`M ${M.x} ${M.y} L ${L.x} ${L.y}`} stroke={strokeColor} strokeWidth="2" />
        <path d={`M ${N.x} ${N.y} L ${M.x} ${M.y}`} stroke={strokeColor} strokeWidth="2" />
        <path d={`M ${K.x} ${K.y} L ${L.x} ${L.y}`} stroke={strokeColor} strokeWidth="2" />

        {/* --- ADDED Markings for SAS Proof --- */}
        {/* S: NO ≅ OK */}
        <LineTick p1={N} p2={O} position={0.5} stroke={strokeColor} />
        <LineTick p1={O} p2={K} position={0.5} stroke={strokeColor} />
        
        {/* S: MO ≅ OL */}
        <LineTick p1={M} p2={O} position={0.5} stroke={strokeColor} />
        <LineTick p1={O} p2={L} position={0.5} stroke={strokeColor} />
        
        {/* A: Vertical Angles ∠NOM ≅ ∠KOL */}
        <AngleArc p1={N} vertex={O} p2={M} radius={20} stroke={angleColor} />
        <AngleArc p1={K} vertex={O} p2={L} radius={20} stroke={angleColor} />

        <text x={N.x - 20} y={N.y} fill={strokeColor}>N</text>
        <text x={M.x - 15} y={M.y + 15} fill={strokeColor}>M</text>
        <text x={O.x - 5} y={O.y + 15} fill={strokeColor}>O</text>
        <text x={K.x + 5} y={K.y + 15} fill={strokeColor}>K</text>
        <text x={L.x + 10} y={L.y} fill={strokeColor}>L</text>
      </svg>
    </div>
  );
}

// --- QUIZ FIGURE COMPONENT DEFINED INSIDE ---
const ProofQuizFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const svgWidth = 350;
  const svgHeight = 250;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <AnimatePresence>
          {(questionIndex === 0 || questionIndex === 1) && (
            <motion.g key="q1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* SSS Figure (Question 1 from image) */}
              <SSSFigure strokeColor={strokeColor} />
            </motion.g>
          )}

          {(questionIndex === 2 || questionIndex === 3) && (
            <motion.g key="q2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* SAS Pentagon Figure (Question 2 from image) */}
              <SASPentagonFigure strokeColor={strokeColor} />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

// --- Helper figures for the quiz (UPDATED) ---
const SSSFigure: React.FC<{ strokeColor: string }> = ({ strokeColor }) => {
  const A={x: 175, y: 220}, C={x: 50, y: 100}, D={x: 175, y: 40}, B={x: 300, y: 100};
  return (
    <g>
      <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y} L ${D.x} ${D.y} L ${B.x} ${B.y} Z`} stroke={strokeColor} fill="none" />
      <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} strokeWidth="1" strokeDasharray="4 4" />
      
      {/* --- UPDATED Ticks --- */}
      {/* Ticks: AB ≅ CD (1) */}
      <LineTick p1={A} p2={B} position={0.5} stroke={strokeColor} />
      <LineTick p1={C} p2={D} position={0.5} stroke={strokeColor} />

      {/* Ticks: AC ≅ BD (2) */}
      <LineTick p1={A} p2={C} position={0.48} stroke={strokeColor} />
      <LineTick p1={A} p2={C} position={0.52} stroke={strokeColor} />
      <LineTick p1={B} p2={D} position={0.48} stroke={strokeColor} />
      <LineTick p1={B} p2={D} position={0.52} stroke={strokeColor} />

      <text x={A.x - 10} y={A.y + 20} fill={strokeColor}>A</text>
      <text x={B.x + 10} y={B.y + 5} fill={strokeColor}>B</text>
      <text x={C.x - 20} y={C.y + 5} fill={strokeColor}>C</text>
      <text x={D.x - 10} y={D.y - 10} fill={strokeColor}>D</text>
    </g>
  );
};

const SASPentagonFigure: React.FC<{ strokeColor: string }> = ({ strokeColor }) => {
  const { isDarkMode } = useThemeContext();
  const angleColor = isDarkMode ? '#FCD34D' : '#F59E0B'; // Yellow

  const A={x: 175, y: 40}, B={x: 75, y: 100}, C={x: 125, y: 200}, D={x: 225, y: 200}, E={x: 275, y: 100};
  return (
    <g>
      <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} L ${E.x} ${E.y} Z`} stroke={strokeColor} fill="none" />
      {/* Diagonals */}
      <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y}`} stroke={strokeColor} strokeWidth="1" />
      <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} strokeWidth="1" />
      
      {/* --- UPDATED Ticks & Arcs --- */}
      
      {/* Ticks: AB ≅ AE (1) */}
      <LineTick p1={A} p2={B} position={0.5} stroke={strokeColor} />
      <LineTick p1={A} p2={E} position={0.5} stroke={strokeColor} />

      {/* Ticks: AC ≅ AD ≅ CD (2) */}
      <LineTick p1={A} p2={C} position={0.48} stroke={strokeColor} />
      <LineTick p1={A} p2={C} position={0.52} stroke={strokeColor} />
      <LineTick p1={A} p2={D} position={0.48} stroke={strokeColor} />
      <LineTick p1={A} p2={D} position={0.52} stroke={strokeColor} />
      <LineTick p1={C} p2={D} position={0.48} stroke={strokeColor} />
      <LineTick p1={C} p2={D} position={0.52} stroke={strokeColor} />
      
      {/* Angle: ∠BAC ≅ ∠EAD */}
      <AngleArc p1={B} vertex={A} p2={C} radius={25} stroke={angleColor} />
      <AngleArc p1={E} vertex={A} p2={D} radius={25} stroke={angleColor} />
      
      <text x={A.x - 10} y={A.y - 10} fill={strokeColor}>A</text>
      <text x={B.x - 20} y={B.y + 5} fill={strokeColor}>B</text>
      <text x={C.x - 10} y={C.y + 20} fill={strokeColor}>C</text>
      <text x={D.x + 0} y={D.y + 20} fill={strokeColor}>D</text>
      <text x={E.x + 10} y={E.y + 5} fill={strokeColor}>E</text>
    </g>
  );
};
// --- END OF QUIZ FIGURE COMPONENT ---


export default function ProvingSlide5() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'proving-practice-quiz',
      conceptId: 'proving-practice-problems',
      conceptName: 'Proving with SSS/SAS',
      type: 'judging',
      description: 'Testing completion of various proofs'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }
  
  // --- *** UPDATED: Questions array with KaTeX syntax *** ---
  const questions: QuizQuestion[] = [
   
  {
  id: 'proving-q1-sss-step2',
  question: 'In Diagram 1, we know that AB ≅ CD. What is the other "Given" statement needed for Step 2?',
  options: ["AC ≅ BD", "AD ≅ AD", "∠A ≅ ∠D", "∠B ≅ ∠C"],
  correctAnswer: "AC ≅ BD",
  explanation: "Correct! This is the second 'Given' pair of sides (shown with double tick marks) required for proving the triangles congruent by SSS."
},
{
  id: 'proving-q1-sss-step3',
  question: 'In Diagram 1, why is AD ≅ AD true in Step 3?',
  options: ["Given", "Reflexive property of congruence", "Symmetric property", "SSS criterion"],
  correctAnswer: "Reflexive property of congruence",
  explanation: "Correct! The side AD is common to both triangles △ABD and △DCA. A side is always congruent to itself — that’s the Reflexive Property."
},
{
  id: 'proving-q2-sas-step2',
  question: 'In Diagram 2, what is the missing "Given" statement in Step 2?',
  options: ["AC ≅ AD", "AB ≅ AE", "∠BAC ≅ ∠DAE", "△ACD is equilateral"],
  correctAnswer: "AB ≅ AE",
  explanation: "Correct! This is one of the 'Given' pieces of information (shown with single tick marks). It gives us the first Side (S) needed for the SAS proof."
},
{
  id: 'proving-q2-sas-step4',
  question: 'In Diagram 2, which statement completes Step 4 and gives us the second "Side" for the SAS proof?',
  options: ["AC ≅ AD", "BC ≅ ED", "∠C ≅ ∠D", "CPCTC"],
  correctAnswer: "AC ≅ AD",
  explanation: "Correct! Since △ACD is equilateral (from Step 1), all its sides are congruent. This provides the second 'Side' (S) for the SAS criterion."
}

]
;
  
  // --- Data for the table in the left column ---
  const proofRows: ProofRow[] = [
    { num: "1", statement: "NO = OK", reason: "Definition of a midpoint" },
    { num: "2", statement: "NO \\cong OK", reason: "Definition of congruent segments" },
    { num: "3", statement: "MO = OL", reason: "Definition of a midpoint" },
    { num: "4", statement: "MO \\cong OL", reason: "Definition of congruent segments" },
    { num: "5", statement: "\\angle NOM \\cong \\angle KOL", reason: "Vertical angles theorem" },
    { num: "6", statement: "\\triangle NOM \\cong \\triangle KOL", reason: "SAS congruence criterion" },
    { num: "7", statement: "NM \\cong KL", reason: "CPCTC" },
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
      interactionId: `proving-practice-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-practice-problems',
      conceptName: 'Proving with SSS/SAS',
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


  // --- UPDATED: New slide content ---
  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* --- CARD 1 --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: SAS & CPCTC</h2>
            <p className="text-lg leading-relaxed">
              In the diagram below, **O is the midpoint** of the segments{' '}
              <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\overline{LM}", { throwOnError: false }) }} />
              {' '}and{' '}
              <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\overline{NK}", { throwOnError: false }) }} />.
            </p>
            <SasCpctcFigure />
            <p className="text-lg leading-relaxed mt-4">
              Consider the following statement:
            </p>
            <div className="my-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60"
                 dangerouslySetInnerHTML={{ __html: katex.renderToString("NM \\cong KL", { throwOnError: false, displayMode: true }) }}
            />
          </div>

          {/* --- CARD 2 (The Logic) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Correct Proof</h3>
            {/* --- USE THE TABLE COMPONENT --- */}
            <ProofTable rows={proofRows} />
            
            <p className="text-lg leading-relaxed mt-4">
              This proof uses the **SAS congruence criterion** (Step 6) and then **CPCTC** (Step 7) to reach the final conclusion.
            </p>
          </div>
        </div>

        {/* Right Column - Quiz */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Complete the Proofs</h3>
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

            {/* --- USE THE QUIZ FIGURE COMPONENT --- */}
            <ProofQuizFigure questionIndex={currentQuestionIndex} />

            {!isQuizComplete ? (
              <>
                {/* --- UPDATED Question Div --- */}
                <div 
                  className="text-lg mb-4 mt-6 break-words" // Added break-words
                  dangerouslySetInnerHTML={{ __html: katex.renderToString(questions[currentQuestionIndex].question, { throwOnError: false }) }}
                />
                
                {/* --- Answer Options --- */}
                <div className="grid grid-cols-2 gap-3">
                  {questions[currentQuestionIndex].options.map((option, idx) => {
                    
                    const disabled = showFeedback;
                    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
                    const isSelected = selectedAnswer === option;
                    let style = '';
                    if (showFeedback) {
                      if (isCorrect) {
                        style = 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'; // CORRECT
                      } else if (isSelected && !isCorrect) {
                        style = 'border-red-500 bg-red-100 dark:bg-red-800 opacity-70'; // INCORRECT
                      } else {
                        style = 'border-slate-300 dark:border-slate-600 opacity-50'; // Faded/Disabled
                      }
                    } else {
                      if (isSelected) {
                        style = 'border-blue-500 bg-blue-50 dark:bg-blue-900/3D'; // Selected
                      } else {
                        style = 'border-slate-300 dark:border-slate-600 hover:border-blue-400'; // Default
                      }
                    }
                    
                    // --- *** UPDATED Button ClassName *** ---
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${style} ${
                      disabled ? 'cursor-default' : 'cursor-pointer'
                    } text-base break-words min-h-[4rem] flex items-center`;
                    // --- END OF UPDATE ---

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleQuizAnswer(option)}
                        disabled={disabled}
                        className={className}
                        whileHover={!disabled ? { scale: 1.02 } : {}}
                        whileTap={!disabled ? { scale: 0.98 } : {}}
                        dangerouslySetInnerHTML={{ __html: katex.renderToString(option, { throwOnError: false }) }}
                      >
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
                      {/* --- *** UPDATED Explanation Rendering *** --- */}
                    <p 
  className="text-lg text-slate-600 dark:text-slate-400 mb-4 leading-normal break-words whitespace-pre-wrap overflow-hidden max-w-full"
  style={{ wordWrap: "break-word", whiteSpace: "normal" }}
  dangerouslySetInnerHTML={{ 
    __html: katex.renderToString(
      questions[currentQuestionIndex].explanation.replace(/\$/g, ''), 
      { throwOnError: false }
    ) 
  }}
></p>


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
                <div className="text-3xl mb-4">📝</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You're a proof-building pro!" : 'Great practice!'}
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
      // --- UPDATED Props ---
      slideId="proving-practice-problems"
      slideTitle="Proving Congruence: Practice"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}