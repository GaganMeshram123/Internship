import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import katex from 'katex';

// --- TABLE COMPONENT DEFINED INSIDE ---
// (This component is not used in this slide, but kept in case)
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
  const P = {
    x: p1.x + (p2.x - p1.x) * position,
    y: p1.y + (p2.y - p1.y) * position,
  };
  const V = { x: p2.x - p1.x, y: p2.y - p1.y };
  const N = { x: -V.y, y: V.x };
  const magN = Math.sqrt(N.x * N.x + N.y * N.y);
  if (magN === 0) return null;
  const normN = { x: N.x / magN, y: N.y / magN };
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


// --- ANIMATION COMPONENT (UPDATED) ---
const CpctcAsaFigure: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 200;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleColor1 = isDarkMode ? '#F59E0B' : '#D97706'; // Orange
  const angleColor2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const sideColor = isDarkMode ? '#60A5FA' : '#2563EB';   // Blue
  
  // Triangle 1 (ABC)
  const A = { x: 50, y: 150 };
  const B = { x: 190, y: 150 };
  const C = { x: 120, y: 50 };

  // Triangle 2 (KLM)
  const K = { x: 250, y: 150 };
  const L = { x: 390, y: 150 };
  const M = { x: 320, y: 50 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Triangle ABC */}
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
        <text x={A.x - 15} y={A.y + 15} fill={strokeColor}>A</text>
        <text x={B.x + 5} y={B.y + 15} fill={strokeColor}>B</text>
        <text x={C.x - 5} y={C.y - 10} fill={strokeColor}>C</text>

        {/* Triangle KLM */}
        <path d={`M ${K.x} ${K.y} L ${L.x} ${L.y} L ${M.x} ${M.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
        <text x={K.x - 15} y={K.y + 15} fill={strokeColor}>K</text>
        <text x={L.x + 5} y={L.y + 15} fill={strokeColor}>L</text>
        <text x={M.x - 5} y={M.y - 10} fill={strokeColor}>M</text>

        {/* --- UPDATED ASA Markings --- */}
        
        {/* Angle A & K (Orange) */}
        <AngleArc p1={C} vertex={A} p2={B} radius={20} stroke={angleColor1} />
        <AngleArc p1={M} vertex={K} p2={L} radius={20} stroke={angleColor1} />
        
        {/* Side AB & KL (Blue) */}
        <LineTick p1={A} p2={B} position={0.5} stroke={sideColor} size={12} />
        <LineTick p1={K} p2={L} position={0.5} stroke={sideColor} size={12} />
        
        {/* Angle B & L (Green) - Double Arc */}
        <AngleArc p1={A} vertex={B} p2={C} radius={20} stroke={angleColor2} />
        <AngleArc p1={A} vertex={B} p2={C} radius={23} stroke={angleColor2} />
        <AngleArc p1={K} vertex={L} p2={M} radius={20} stroke={angleColor2} />
        <AngleArc p1={K} vertex={L} p2={M} radius={23} stroke={angleColor2} />
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function ProvingSlide4() {
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
      id: 'proving-cpctc-asa-quiz',
      conceptId: 'proving-cpctc',
      conceptName: 'CPCTC (ASA Example)',
      type: 'judging',
      description: 'Testing understanding of CPCTC'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- *** UPDATED Questions Array *** ---
  const questions: QuizQuestion[] = [
  {
  id: 'proving-cpctc-q1',
  question: 'Based on the markings, △ABC ≅ △KLM by which criterion?',
  options: [
    "SSS (Side-Side-Side)",
    "SAS (Side-Angle-Side)",
    "ASA (Angle-Side-Angle)",
    "CPCTC"
  ],
  correctAnswer: "ASA (Angle-Side-Angle)",
  explanation: "Correct! We are given two angles and the included side (the side between them), which is the ASA criterion."
},
{
  id: 'proving-cpctc-q2',
  question: 'The statement AB ≅ KL is true because...',
  options: [
    "It is Given.",
    "It is proven by CPCTC.",
    "It is proven by the Reflexive Property."
  ],
  correctAnswer: "It is Given.",
  explanation: "Correct! The single tick mark on side AB and KL shows this was given. We don't need to use CPCTC to prove it."
},
{
  id: 'proving-cpctc-q3',
  question: 'Which of these statements is a conclusion from CPCTC (and not a \"Given\")?',
  options: [
    "AB ≅ KL",
    "∠A ≅ ∠K",
    "AC ≅ KM",
    "∠B ≅ ∠L"
  ],
  correctAnswer: "AC ≅ KM",
  explanation: "Correct! Once we prove the triangles are congruent by ASA, we can use CPCTC to state that the other corresponding parts, like AC and KM, are also congruent."
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
      interactionId: `proving-cpctc-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-cpctc',
      conceptName: 'CPCTC',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">CPCTC</h2>
            <p className="text-lg leading-relaxed">
              Before we proceed, we first need to state a theorem that's often abbreviated to CPCTC:
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60">
              <p className="text-lg italic font-semibold text-center">
                Corresponding parts of congruent triangles are congruent.
              </p>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              When two triangles are shown to be congruent using a congruence criterion (like SSS, SAS, ASA), CPCTC allows us to conclude that **all** corresponding angles and sides of those triangles are congruent.
            </p>
          </div>

          {/* --- CARD 2 (The Figure) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Demonstration</h3>
            <p className="text-lg leading-relaxed mb-4">
              To demonstrate, consider the following congruent triangles:
            </p>
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <CpctcAsaFigure />
          </div>
        </div>

        {/* Right Column - Logic and Quiz */}
        <div className="space-y-6">
          {/* --- LOGIC CARD --- */}
         <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
  <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
    Using CPCTC
  </h3>

  <p className="text-lg leading-relaxed">
    We won't prove this formally, but it's easy to see that since:
  </p>

  {/* --- Updated Equation Block (Wrapped + Responsive) --- */}
  <div
    className="my-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 font-mono text-center text-lg leading-normal break-words whitespace-pre-wrap overflow-hidden max-w-full"
    style={{ wordWrap: "break-word", whiteSpace: "normal" }}
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(
        "\\angle A \\cong \\angle K, \\; \\overline{AB} \\cong \\overline{KL}, \\; \\angle B \\cong \\angle L",
        { throwOnError: false }
      ),
    }}
  />

  <p className="text-lg leading-relaxed break-words whitespace-pre-wrap overflow-hidden max-w-full">
    ...then{" "}
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString("\\triangle ABC \\cong \\triangle KLM", {
          throwOnError: false,
        }),
      }}
    />{" "}
    by the <strong>ASA criterion</strong>.
  </p>

  <p className="text-lg leading-relaxed mt-4 break-words whitespace-pre-wrap overflow-hidden max-w-full">
    Now that triangle congruence has been established, we can use{" "}
    <strong>CPCTC</strong> to list <em>all other</em> congruent sides and angles:
  </p>

  {/* --- Updated List with Wrapped Equations --- */}
  <ul className="list-disc list-outside mt-4 ml-5 text-lg space-y-2">
    <li className="break-words whitespace-pre-wrap overflow-hidden max-w-full">
      According to CPCTC, the following statements about segment congruence must be true:
      <div
        className="my-2 text-center font-mono leading-normal break-words whitespace-pre-wrap overflow-hidden max-w-full"
        style={{ wordWrap: "break-word" }}
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(
            "\\overline{AC} \\cong \\overline{KM}, \\quad \\overline{BC} \\cong \\overline{LM}",
            { throwOnError: false, displayMode: true }
          ),
        }}
      />
    </li>
    <li className="break-words whitespace-pre-wrap overflow-hidden max-w-full">
      Also, according to CPCTC, we have:
      <div
        className="my-2 text-center font-mono leading-normal break-words whitespace-pre-wrap overflow-hidden max-w-full"
        style={{ wordWrap: "break-word" }}
        dangerouslySetInnerHTML={{
          __html: katex.renderToString("\\angle C \\cong \\angle M", {
            throwOnError: false,
            displayMode: true,
          }),
        }}
      />
    </li>
  </ul>
</div>

          {/* --- KNOWLEDGE CHECK CARD (Now 3 questions) --- */}
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
            {!isQuizComplete ? (
              <>
               <div
                  className="text-lg mb-4 whitespace-normal break-words leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: katex.renderToString(questions[currentQuestionIndex].question, { throwOnError: false }),
                  }}
                ></div>
                {/* --- Answer Options --- */}
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, idx) => {
                    
                    // --- Corrected Button Logic ---
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
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${style} ${disabled ? 'cursor-default' : 'cursor-pointer'}`;
                    // --- End Corrected Logic ---
                    
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
                      {/* --- UPDATED Explanation Rendering --- */}
                      <div className="text-lg text-slate-600 dark:text-slate-400 mb-4"
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
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered this concept!" : 'Great job!'}
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
      slideId="proving-cpctc"
      slideTitle="CPCTC"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}