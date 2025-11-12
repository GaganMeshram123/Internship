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

// --- HELPER COMPONENTS FOR GEOMETRY ---

// Define a simple Point type
type Point = { x: number; y: number };

// --- COMPONENT 1: AngleArc ---
interface AngleArcProps {
  p1: Point;
  vertex: Point;
  p2: Point;
  radius: number;
  stroke: string;
  strokeWidth?: number;
}

/**
 * Draws a clean, mathematically correct angle arc.
 * p1, vertex, p2 define the angle (e.g., angle p1-vertex-p2)
 */
const AngleArc: React.FC<AngleArcProps> = ({
  p1,
  vertex,
  p2,
  radius,
  stroke,
  strokeWidth = 2,
}) => {
  // 1. Calculate vectors from vertex
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };

  // 2. Normalize vectors
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  // Avoid division by zero if points are coincident
  if (mag1 === 0 || mag2 === 0) return null;
  
  const normV1 = { x: v1.x / mag1, y: v1.y / mag1 };
  const normV2 = { x: v2.x / mag2, y: v2.y / mag2 };

  // 3. Calculate arc start and end points
  const start = { x: vertex.x + radius * normV1.x, y: vertex.y + radius * normV1.y };
  const end = { x: vertex.x + radius * normV2.x, y: vertex.y + radius * normV2.y };

  // 4. Determine arc flags
  const dot = normV1.x * normV2.x + normV1.y * normV2.y;
  const angle = Math.acos(Math.max(-1, Math.min(1, dot)));
  const largeArcFlag = angle > Math.PI ? 1 : 0;
  const cross = v1.x * v2.y - v1.y * v2.x;
  const sweepFlag = cross > 0 ? 1 : 0;

  // 5. Build the SVG path 'd' string
  const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;

  return (
    <path d={d} stroke={stroke} strokeWidth={strokeWidth} fill="none" />
  );
};

// --- COMPONENT 2: RightAngleSquare ---
interface RightAngleSquareProps {
  p1: Point;
  vertex: Point;
  p2: Point;
  size: number; // The side length of the square
  stroke: string;
  strokeWidth?: number;
}

/**
 * Draws a clean square symbol for a 90-degree angle.
 */
const RightAngleSquare: React.FC<RightAngleSquareProps> = ({
  p1,
  vertex,
  p2,
  size,
  stroke,
  strokeWidth = 2,
}) => {
  // 1. Calculate and normalize vectors
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

  if (mag1 === 0 || mag2 === 0) return null;

  const normV1 = { x: v1.x / mag1, y: v1.y / mag1 };
  const normV2 = { x: v2.x / mag2, y: v2.y / mag2 };

  // 2. Calculate the 3 points of the square (pA, pC, pB)
  const pA = { x: vertex.x + size * normV1.x, y: vertex.y + size * normV1.y };
  const pB = { x: vertex.x + size * normV2.x, y: vertex.y + size * normV2.y };
  const pC = { x: pA.x + size * normV2.x, y: pA.y + size * normV2.y };

  // 3. Build the path string
  const d = `M ${pA.x} ${pA.y} L ${pC.x} ${pC.y} L ${pB.x} ${pB.y}`;

  return <path d={d} stroke={stroke} strokeWidth={strokeWidth} fill="none" />;
};

// --- END OF HELPER COMPONENTS ---


// --- FIGURE FOR LEFT COLUMN (Still Used) ---
const AsaExampleFigure: React.FC = () => {
  const svgWidth = 300;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleColor1 = isDarkMode ? '#FCD34D' : '#F59E0B'; // Yellow
  const angleColor2 = isDarkMode ? '#93C5FD' : '#3B82F6'; // Blue
  
  const T={x: 150, y: 50}, V={x: 280, y: 110}, U={x: 150, y: 200}, W={x: 20, y: 110};
  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${T.x} ${T.y} L ${V.x} ${V.y} L ${U.x} ${U.y} L ${W.x} ${W.y} Z`} stroke={strokeColor} strokeWidth="2" fill="none" />
        <path d={`M ${T.x} ${T.y} L ${U.x} ${U.y}`} stroke={strokeColor} strokeWidth="2" />
        
        {/* Angle VUW (Blue) */}
        <AngleArc p1={W} vertex={U} p2={V} radius={25} stroke={angleColor2} />
        <AngleArc p1={W} vertex={U} p2={V} radius={28} stroke={angleColor2} />

        {/* Angle VTW (Yellow) */}
        <AngleArc p1={V} vertex={T} p2={W} radius={25} stroke={angleColor1} />
        
        <text x={T.x - 5} y={T.y - 10} fill={strokeColor}>T</text>
        <text x={V.x + 10} y={V.y + 5} fill={strokeColor}>V</text>
        <text x={U.x - 5} y={U.y + 20} fill={strokeColor}>U</text>
        <text x={W.x - 20} y={W.y + 5} fill={strokeColor}>W</text>
      </svg>
    </div>
  );
}

// --- QUIZ FIGURE COMPONENTS ---

// --- AsaQuizFigure ---
const AsaQuizFigure: React.FC<{ strokeColor: string, angleColor1: string, angleColor2: string }> = ({ strokeColor, angleColor1, angleColor2 }) => {
  const A={x: 70, y: 120}, C={x: 50, y: 50}, D={x: 175, y: 80}, B={x: 300, y: 120};
  return (
    <g>
      <path d={`M ${C.x} ${C.y} L ${A.x} ${A.y} L ${D.x} ${D.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`} stroke={strokeColor} fill="none" />
      <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y}`} stroke={strokeColor} fill="none" />
      <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} fill="none" />
      
      {/* Angle BAC (Blue) */}
      <AngleArc p1={C} vertex={A} p2={B} radius={20} stroke={angleColor1} />
      <AngleArc p1={C} vertex={A} p2={B} radius={23} stroke={angleColor1} />

      {/* Angle BDC (Pink) */}
      <AngleArc p1={C} vertex={D} p2={B} radius={20} stroke={angleColor2} />
      <AngleArc p1={C} vertex={D} p2={B} radius={23} stroke={angleColor2} />
      
      <text x={A.x - 20} y={A.y + 20} fill={strokeColor}>A</text>
      <text x={B.x + 10} y={B.y + 20} fill={strokeColor}>B</text>
      <text x={C.x - 20} y={C.y} fill={strokeColor}>C</text>
      <text x={D.x - 10} y={D.y - 10} fill={strokeColor}>D</text>
    </g>
  );
};

// --- AasQuizFigure ---
const AasQuizFigure: React.FC<{ strokeColor: string }> = ({ strokeColor }) => {
  const { isDarkMode } = useThemeContext();
  const angleColor1 = isDarkMode ? '#93C5FD' : '#3B82F6'; // Blue
  const angleColor2 = isDarkMode ? '#F472B6' : '#EC4899'; // Pink
  
  const A={x: 280, y: 180}, C={x: 300, y: 50}, O={x: 175, y: 115}, D={x: 50, y: 180}, B={x: 20, y: 50};
  return (
    <g>
      <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y}`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <path d={`M ${C.x} ${C.y} L ${D.x} ${D.y}`} stroke={strokeColor} fill="none" strokeWidth="2" />
      
      {/* Right angle A (blue square) */}
      <RightAngleSquare p1={C} vertex={A} p2={B} size={12} stroke={angleColor1} />
      
      {/* Right angle B (pink square) */}
      <RightAngleSquare p1={D} vertex={B} p2={A} size={12} stroke={angleColor2} />
      
      <text x={A.x + 10} y={A.y + 15} fill={strokeColor}>A</text>
      <text x={C.x + 10} y={C.y} fill={strokeColor}>C</text>
      <text x={O.x - 10} y={O.y + 15} fill={strokeColor}>O</text>
      <text x={D.x - 10} y={D.y + 15} fill={strokeColor}>D</text>
      <text x={B.x - 20} y={B.y} fill={strokeColor}>B</text>
    </g>
  );
};

// --- HlQuizFigure ---
const HlQuizFigure: React.FC<{ strokeColor: string }> = ({ strokeColor }) => {
  const { isDarkMode } = useThemeContext();
  const angleColor1 = isDarkMode ? '#93C5FD' : '#3B82F6'; // Blue
  
  const A={x: 50, y: 50}, C={x: 200, y: 50}, B={x: 280, y: 200}, D={x: 120, y: 180};
  return (
    <g>
      <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y} L ${B.x} ${B.y} L ${D.x} ${D.y} Z`} stroke={strokeColor} fill="none" />
      <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y}`} stroke={strokeColor} fill="none" strokeWidth="2" />
      
      {/* Right angle C (blue square) */}
      <RightAngleSquare p1={A} vertex={C} p2={B} size={12} stroke={angleColor1} />
      
      {/* Right angle D (blue square) */}
      <RightAngleSquare p1={A} vertex={D} p2={B} size={12} stroke={angleColor1} />
      
      {/* Ticks BC cong BD */}
      <path d="M 243 135 L 237 127" stroke={strokeColor} strokeWidth="2" />
      <path d="M 194 188 L 202 183" stroke={strokeColor} strokeWidth="2" />

      <text x={A.x - 20} y={A.y + 10} fill={strokeColor}>A</text>
      <text x={B.x + 10} y={B.y + 10} fill={strokeColor}>B</text>
      <text x={C.x + 10} y={C.y + 10} fill={strokeColor}>C</text>
      <text x={D.x - 10} y={D.y + 20} fill={strokeColor}>D</text>
    </g>
  );
};

// --- ProofQuizFigure (Main Figure Container) ---
const ProofQuizFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const svgWidth = 350;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleColor1 = isDarkMode ? '#93C5FD' : '#3B82F6'; // Blue
  const angleColor2 = isDarkMode ? '#F472B6' : '#EC4899'; // Pink

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <AnimatePresence>
          {questionIndex === 0 && (
            <motion.g key="q3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* ASA Figure (Question 3) */}
              <AsaQuizFigure strokeColor={strokeColor} angleColor1={angleColor1} angleColor2={angleColor2} />
            </motion.g>
          )}

          {questionIndex === 1 && (
            <motion.g key="q4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* AAS Figure (Question 4) */}
              <AasQuizFigure strokeColor={strokeColor} />
            </motion.g>
          )}
          
          {questionIndex === 2 && (
            <motion.g key="q5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* HL Figure (Question 5) */}
              <HlQuizFigure strokeColor={strokeColor} />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENTS ---


export default function ProvingSlide6() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'proving-asa-aas-hl-quiz',
      conceptId: 'proving-asa-aas-hl',
      conceptName: 'Proving with ASA/AAS/HL',
      type: 'judging',
      description: 'Testing completion of ASA, AAS, and HL proofs'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }
  
  const allReasons = ["SSS", "SAS", "ASA", "AAS", "HL", "CPCTC", "Given", "Reflexive property", "Vertical angles", "All right angles are congruent"];

  // Explanations are pre-rendered HTML strings to fix KaTeX issue.
  // Questions now include "Diagram" labels.
  const questions: QuizQuestion[] = [
    {
      id: 'proving-asa-q1',
      question: 'Diagram 1: What is the reason for Step 6: $\\triangle ADC \\cong \\triangle ADB$?',
      options: ["SSS", "SAS", "ASA", "AAS"],
      correctAnswer: "ASA",
      explanation: "<strong class='text-slate-800 dark:text-slate-100'>Correct!</strong> We have: " +
                   "<ul class='list-disc list-outside ml-5 mt-2 space-y-1'>" +
                   "<li>" + katex.renderToString("\\angle CAD \\cong \\angle BAD", { throwOnError: false }) + " (Angle)</li>" +
                   "<li>" + katex.renderToString("\\overline{AD} \\cong \\overline{AD}", { throwOnError: false }) + " (Side)</li>" +
                   "<li>" + katex.renderToString("\\angle CDA \\cong \\angle BDA", { throwOnError: false }) + " (Angle)</li>" +
                   "</ul>" +
                   "<p class='mt-2'>The side is <strong>included</strong> between the two angles, so the reason is ASA.</p>"
    },
    {
      id: 'proving-aas-q2',
      question: 'Diagram 2: What is the reason for Step 7: $\\triangle OAC \\cong \\triangle OBD$?',
      options: ["SAS", "ASA", "AAS", "HL"],
      correctAnswer: "AAS",
      explanation: "<strong class='text-slate-800 dark:text-slate-100'>Correct!</strong> We have: " +
                   "<ul class='list-disc list-outside ml-5 mt-2 space-y-1'>" +
                   "<li>" + katex.renderToString("\\angle OAC \\cong \\angle OBD", { throwOnError: false }) + " (Angle)</li>" +
                   "<li>" + katex.renderToString("\\angle AOC \\cong \\angle BOD", { throwOnError: false }) + " (Angle)</li>" +
                   "<li>" + katex.renderToString("\\overline{OA} \\cong \\overline{OB}", { throwOnError: false }) + " (Side)</li>" +
                   "</ul>" +
                   "<p class='mt-2'>The side is <strong>non-included</strong>, so the reason is AAS.</p>"
    },
    {
      id: 'proving-hl-q3',
      question: 'Diagram 3: What is the reason for Step 5: $\\triangle ACB \\cong \\triangle ADB$?',
      options: ["SAS", "ASA", "AAS", "HL"],
      correctAnswer: "HL",
      explanation: "<strong class='text-slate-800 dark:text-slate-100'>Correct!</strong> We have: " +
                   "<ul class='list-disc list-outside ml-5 mt-2 space-y-1'>" +
                   "<li>Two <strong>Right</strong> triangles (from Steps 1 & 2)</li>" +
                   "<li>" + katex.renderToString("\\overline{AB} \\cong \\overline{AB}", { throwOnError: false }) + " (Hypotenuse)</li>" +
                   "<li>" + katex.renderToString("\\overline{BC} \\cong \\overline{BD}", { throwOnError: false }) + " (Leg)</li>" +
                   "</ul>" +
                   "<p class='mt-2'>This matches the <strong>Hypotenuse-Leg (HL)</strong> criterion.</p>"
    }
  ];
  
  // Data for the table in the left column
  const proofRows: ProofRow[] = [
    { num: "1", statement: "\\overline{TU} \\text{ bisects } \\angle VUW", reason: "Given" },
    { num: "2", statement: "\\angle TUV \\cong \\angle TUW", reason: "Definition of an angle bisector" }, // <-- FIXED TYPO HERE
    { num: "3", statement: "\\overline{TU} \\text{ bisects } \\angle VTW", reason: "Given" },
    { num: "4", statement: "\\angle UTV \\cong \\angle UTW", reason: "Definition of an angle bisector" },
    { num: "5", statement: "\\overline{TU} \\cong \\overline{TU}", reason: "Reflexive property of congruence" },
    { num: "6", statement: "\\triangle TUV \\cong \\triangle TUW", reason: "ASA congruence criterion" },
    { num: "7", statement: "\\overline{TW} \\cong \\overline{TV}", reason: "CPCTC" },
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
      interactionId: `proving-asa-aas-hl-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-asa-aas-hl',
      conceptName: 'Proving with ASA/AAS/HL',
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

        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* --- CARD 1 --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: ASA & CPCTC</h2>
            <p className="text-lg leading-relaxed">
              In the diagram below, <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\overline{TU}", { throwOnError: false }) }} /> bisects both <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\angle VUW", { throwOnError: false }) }} /> and <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\angle VTW", { throwOnError: false }) }} />.
            </p>
            <AsaExampleFigure />
            <p className="text-lg leading-relaxed mt-4">
              Consider the following statement:
            </p>
            <div className="my-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60"
                 dangerouslySetInnerHTML={{ __html: katex.renderToString("TW \\cong TV", { throwOnError: false, displayMode: true }) }}
            />
          </div>

          {/* --- CARD 2 (The Logic) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Correct Proof</h3>
            <ProofTable rows={proofRows} />
           <ul className="list-disc list-outside mt-4 ml-5 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Row 5:</strong> We have that <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\overline{TU}", { throwOnError: false }) }} /> is congruent to itself by the <strong>Reflexive property of congruence</strong>.
              </li>
              <li>
                <strong>Row 6:</strong> From rows 2 and 4, we have two pairs of congruent angles. Also, <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\overline{TU}", { throwOnError: false }) }} /> is a <strong>common side</strong> (from row 5) that is *included* between these angles. Therefore, we use the <strong>ASA criterion</strong>.
              </li>
              <li>
                <strong>Row 7:</strong> From row 6, we know the triangles are congruent. Therefore, we can conclude that <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\overline{TW} \\cong \\overline{TV}", { throwOnError: false }) }} /> by <strong>CPCTC</strong>.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
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

            {/* --- QUIZ FIGURE RE-ADDED --- */}
            <ProofQuizFigure questionIndex={currentQuestionIndex} />

            {!isQuizComplete ? (
              <>
                {/* --- Question Text --- */}
                <div className="text-lg mb-4 mt-6" dangerouslySetInnerHTML={{ __html: katex.renderToString(questions[currentQuestionIndex].question, { throwOnError: false }) }}></div>
                
                {/* --- Answer Options --- */}
                <div className="grid grid-cols-2 gap-3">
                  {questions[currentQuestionIndex].options.map((option, idx) => {
                    
                    // --- UPDATED CLASSNAME LOGIC ---
                    const disabled = showFeedback;
                    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
                    const isSelected = selectedAnswer === option;

                    let style = '';

                    if (showFeedback) {
                      if (isCorrect) {
                        // This is the correct answer
                        style = 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'; // CORRECT
                      } else if (isSelected && !isCorrect) {
                        // This is the one the user selected, and it's wrong
                        style = 'border-red-500 bg-red-100 dark:bg-red-800 opacity-70'; // INCORRECT
                      } else {
                        // This is an unselected, incorrect option
                        style = 'border-slate-300 dark:border-slate-600 opacity-50'; // Faded/Disabled
                      }
                    } else {
                      // Before feedback is shown
                      if (isSelected) {
                        style = 'border-blue-500 bg-blue-50 dark:bg-blue-900/3D'; // Selected
                      } else {
                        style = 'border-slate-300 dark:border-slate-600 hover:border-blue-400'; // Default
                      }
                    }

                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${style} ${disabled ? 'cursor-default' : 'cursor-pointer'}`;
                    // --- END OF UPDATED LOGIC ---

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
                      <div className="text-lg text-slate-600 dark:text-slate-400 mb-4 break-words"
                           dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].explanation }}
                      >
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
      slideId="proving-asa-aas-hl"
      slideTitle="Proving Congruence: ASA, AAS, HL"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}