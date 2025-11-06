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

// --- FIGURE FOR LEFT COLUMN ---
const AasExampleFigure: React.FC = () => {
  const svgWidth = 300;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleColor1 = isDarkMode ? '#F472B6' : '#EC4899'; // Pink
  const angleColor2 = isDarkMode ? '#C084FC' : '#A855F7'; // Purple
  
  const P={x: 100, y: 180}, Q={x: 280, y: 180}, R={x: 50, y: 50}, S={x: 200, y: 180};
  const T_on_PR = { x: 75, y: 115 };
  
  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Triangle PQT */}
        <path d={`M ${P.x} ${P.y} L ${Q.x} ${Q.y} L ${T_on_PR.x} ${T_on_PR.y} Z`} stroke={strokeColor} strokeWidth="2" fill="none" />
        {/* Triangle PRS */}
        <path d={`M ${P.x} ${P.y} L ${R.x} ${R.y} L ${S.x} ${S.y} Z`} stroke={strokeColor} strokeWidth="2" fill="none" />
        
        {/* Angle Q (Pink) */}
        <path d={`M ${Q.x - 20} ${Q.y} A 20 20 0 0 0 ${Q.x - 15} ${Q.y - 14}`} stroke={angleColor1} fill="none" strokeWidth="2" />
        {/* Angle R (Pink) */}
        <path d={`M ${R.x + 20} ${R.y} A 20 20 0 0 1 ${R.x + 15} ${R.y + 14}`} stroke={angleColor1} fill="none" strokeWidth="2" />

        {/* Side QT, RS (Purple) */}
        <path d="M 183 145 L 175 152" stroke={angleColor2} strokeWidth="3" />
        <path d="M 120 180 L 130 180" stroke={angleColor2} strokeWidth="3" />
        
        <text x={P.x - 15} y={P.y + 15} fill={strokeColor}>P</text>
        <text x={Q.x + 10} y={Q.y + 15} fill={strokeColor}>Q</text>
        <text x={R.x - 20} y={R.y + 10} fill={strokeColor}>R</text>
        <text x={S.x - 5} y={S.y + 15} fill={strokeColor}>S</text>
        <text x={T_on_PR.x - 20} y={T_on_PR.y} fill={strokeColor}>T</text>
      </svg>
    </div>
  );
}

// --- QUIZ FIGURE COMPONENT DEFINED INSIDE ---
const ProofQuizFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const svgWidth = 350;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleColor1 = isDarkMode ? '#F472B6' : '#EC4899'; // Pink
  const angleColor2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <AnimatePresence>
          {questionIndex === 0 && (
            <motion.g key="q6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* SSS Figure (Question 6) */}
              <SssQuizFigure strokeColor={strokeColor} />
            </motion.g>
          )}

          {questionIndex === 1 && (
            <motion.g key="q7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* ASA Figure (Question 7) */}
              <AsaQuizFigure strokeColor={strokeColor} angleColor1={angleColor1} angleColor2={angleColor2} />
            </motion.g>
          )}
          
          {questionIndex === 2 && (
            <motion.g key="q8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* HL Figure (Question 8) */}
              <HlQuizFigure strokeColor={strokeColor} />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

// --- Helper figures for the quiz ---
const SssQuizFigure: React.FC<{ strokeColor: string }> = ({ strokeColor }) => {
  const P={x: 250, y: 180}, Q={x: 300, y: 50}, R={x: 50, y: 100}, S={x: 100, y: 50};
  return (
    <g>
      <path d={`M ${P.x} ${P.y} L ${Q.x} ${Q.y} L ${S.x} ${S.y} L ${R.x} ${R.y} Z`} stroke={strokeColor} fill="none" />
      <path d={`M ${P.x} ${P.y} L ${S.x} ${S.y}`} stroke={strokeColor} fill="none" strokeWidth="2" />
      {/* Ticks PQ cong PR */}
      <path d="M 278 110 L 270 117" stroke={strokeColor} strokeWidth="2" />
      <path d="M 140 146 L 150 142" stroke={strokeColor} strokeWidth="2" />
      {/* Ticks SQ cong SR */}
      <path d="M 195 50 L 200 50" stroke={strokeColor} strokeWidth="2" />
      <path d="M 195 53 L 200 53" stroke={strokeColor} strokeWidth="2" />
      <path d="M 72 78 L 78 72" stroke={strokeColor} strokeWidth="2" />
      <path d="M 75 81 L 81 75" stroke={strokeColor} strokeWidth="2" />
      
      <text x={P.x + 10} y={P.y + 15} fill={strokeColor}>P</text>
      <text x={Q.x + 10} y={Q.y + 5} fill={strokeColor}>Q</text>
      <text x={R.x - 20} y={R.y + 5} fill={strokeColor}>R</text>
      <text x={S.x - 10} y={S.y - 10} fill={strokeColor}>S</text>
    </g>
  );
};

const AsaQuizFigure: React.FC<{ strokeColor: string, angleColor1: string, angleColor2: string }> = ({ strokeColor, angleColor1, angleColor2 }) => {
  const P={x: 50, y: 110}, Q={x: 300, y: 110}, R={x: 200, y: 180}, S={x: 200, y: 40};
  return (
    <g>
      <path d={`M ${P.x} ${P.y} L ${S.x} ${S.y} L ${Q.x} ${Q.y} L ${R.x} ${R.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <path d={`M ${P.x} ${P.y} L ${Q.x} ${Q.y}`} stroke={strokeColor} fill="none" strokeWidth="2" />
      {/* Angle RPS (Pink) */}
      <path d={`M ${P.x + 20} ${P.y - 5} A 20 20 0 0 1 ${P.x + 18} ${P.y + 18}`} stroke={angleColor1} fill="none" strokeWidth="2" />
      {/* Angle RQS (Green) */}
      <path d={`M ${Q.x - 20} ${Q.y - 5} A 20 20 0 0 0 ${Q.x - 18} ${Q.y + 18}`} stroke={angleColor2} fill="none" strokeWidth="2" />
      <path d={`M ${Q.x - 23} ${Q.y - 7} A 23 23 0 0 0 ${Q.x - 20} ${Q.y + 21}`} stroke={angleColor2} fill="none" strokeWidth="2" />

      <text x={P.x - 20} y={P.y + 5} fill={strokeColor}>P</text>
      <text x={Q.x + 10} y={Q.y + 5} fill={strokeColor}>Q</text>
      <text x={R.x - 10} y={R.y + 20} fill={strokeColor}>R</text>
      <text x={S.x - 10} y={S.y - 10} fill={strokeColor}>S</text>
    </g>
  );
};

const HlQuizFigure: React.FC<{ strokeColor: string }> = ({ strokeColor }) => {
  const P={x: 280, y: 180}, Q={x: 175, y: 50}, R={x: 70, y: 180}, A={x: 175, y: 180};
  return (
    <g>
      <path d={`M ${P.x} ${P.y} L ${Q.x} ${Q.y} L ${R.x} ${R.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <path d={`M ${Q.x} ${Q.y} L ${A.x} ${A.y}`} stroke={strokeColor} fill="none" strokeWidth="2" />
      {/* Right angle A (blue square) */}
      <path d={`M ${A.x} ${A.y - 12} L ${A.x - 12} ${A.y - 12} L ${A.x - 12} ${A.y}`} stroke="#3B82F6" fill="none" strokeWidth="2" />
      
      {/* Ticks QP cong QR */}
      <path d="M 233 110 L 225 117" stroke={strokeColor} strokeWidth="2" />
      <path d="M 118 110 L 126 117" stroke={strokeColor} strokeWidth="2" />
      
      <text x={P.x + 10} y={P.y + 15} fill={strokeColor}>P</text>
      <text x={Q.x - 10} y={Q.y - 10} fill={strokeColor}>Q</text>
      <text x={R.x - 20} y={R.y + 15} fill={strokeColor}>R</text>
      <text x={A.x - 5} y={A.y + 20} fill={strokeColor}>A</text>
    </g>
  );
};
// --- END OF QUIZ FIGURE COMPONENT ---


export default function ProvingSlide7() {
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
      id: 'proving-complete-proof-quiz',
      conceptId: 'proving-complete-proofs',
      conceptName: 'Constructing Complete Proofs',
      type: 'judging',
      description: 'Testing construction of a full proof'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }
  
  const allReasons = ["SSS", "SAS", "ASA", "AAS", "HL", "CPCTC", "Given", "Reflexive property", "Def. of angle bisector"];

  // --- UPDATED: New questions based on Q6, Q7, Q8 ---
  const questions: QuizQuestion[] = [
    {
      id: 'proving-q6-sss',
      question: 'Diagram 1 (Q6): What is the reason for Step 4: $\\triangle PQS \\cong \\triangle PRS$?',
      options: ["SSS", "SAS", "ASA", "CPCTC"],
      correctAnswer: "SSS",
      explanation: "Correct! We have $\overline{PQ} \cong \overline{PR}$ (S, Step 1), $\overline{SQ} \cong \overline{SR}$ (S, Step 2), and $\overline{PS} \cong \overline{PS}$ (S, Step 3). This is SSS."
    },
    {
      id: 'proving-q7-asa',
      question: 'Diagram 2 (Q7): What is the reason for Step 6: $\\triangle PQR \\cong \\triangle PQS$?',
      options: ["SSS", "SAS", "ASA", "AAS"],
      correctAnswer: "ASA",
      explanation: "Correct! We have $\angle RPQ \cong \angle SPQ$ (A, Step 2), the included side $\overline{PQ} \cong \overline{PQ}$ (S, Step 5), and $\angle RQP \cong \angle SQP$ (A, Step 4)."
    },
    {
      id: 'proving-q8-hl',
      question: 'Diagram 3 (Q8): What is the reason for Step 6: $\\triangle QAP \cong \\triangle QAR$?',
      options: ["SAS", "ASA", "AAS", "HL"],
      correctAnswer: "HL",
      explanation: "Correct! We have Right Triangles (Step 3), congruent Hypotenuses $\overline{QP} \cong \overline{QR}$ (Step 4), and a congruent Leg $\overline{QA} \cong \overline{QA}$ (Step 5)."
    }
  ];
  
  // --- Data for the table in the left column ---
  const proofRows: ProofRow[] = [
    { num: "1", statement: "\\angle P \\cong \\angle P", reason: "Reflexive property of congruence" },
    { num: "2", statement: "m\\angle Q = m\\angle R", reason: "Given" },
    { num: "3", statement: "\\angle Q \\cong \\angle R", reason: "Definition of congruent angles" },
    { num: "4", statement: "QT = RS", reason: "Given" },
    { num: "5", statement: "\\overline{QT} \\cong \\overline{RS}", reason: "Definition of congruent segments" },
    { num: "6", statement: "\\triangle PQT \\cong \\triangle PRS", reason: "AAS congruence criterion" },
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    // ... (This function remains unchanged)
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const handleQuizAnswer = (answerText: string) => {
    // ... (This function remains unchanged)
    if (showFeedback || isQuizComplete) return;

    setSelectedAnswer(answerText);
    setShowFeedback(true);

    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    handleInteractionComplete({
      interactionId: `proving-complete-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-complete-proofs',
      conceptName: 'Constructing Complete Proofs',
      conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
      question: {
        type: 'mcq',
        question: current.question,
        options: current.options
      }
    });
  };

  const handleNextQuestion = () => {
    // ... (This function remains unchanged)
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: AAS Proof</h2>
            <p className="text-lg leading-relaxed">
              In the diagram above, <span dangerouslySetInnerHTML={{ __html: katex.renderToString("m\\angle Q = m\\angle R", { throwOnError: false }) }} /> and <span dangerouslySetInnerHTML={{ __html: katex.renderToString("QT = RS", { throwOnError: false }) }} />.
            </p>
            <AasExampleFigure />
            <p className="text-lg leading-relaxed mt-4">
              Consider the following statement:
            </p>
            <div className="my-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60"
                 dangerouslySetInnerHTML={{ __html: katex.renderToString("\\triangle PQT \\cong \\triangle PRS", { throwOnError: false, displayMode: true }) }}
            />
          </div>

          {/* --- CARD 2 (The Logic) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Correct Proof</h3>
            <ProofTable rows={proofRows} />
            <ul className="list-disc list-outside mt-4 ml-5 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Row 1:</strong> We have that <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\angle P", { throwOnError: false }) }} /> is congruent to itself by the <strong>Reflexive property</strong>. This is our first Angle (A).
              </li>
              <li>
                <strong>Row 3:</strong> We are given <span dangerouslySetInnerHTML={{ __html: katex.renderToString("m\\angle Q = m\\angle R", { throwOnError: false }) }} />, so <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\angle Q \\cong \\angle R", { throwOnError: false }) }} />. This is our second Angle (A).
              </li>
              <li>
                <strong>Row 5:</strong> We are given <span dangerouslySetInnerHTML={{ __html: katex.renderToString("QT = RS", { throwOnError: false }) }} />, so <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\overline{QT} \\cong \\overline{RS}", { throwOnError: false }) }} />. This is our Side (S).
              </li>
              <li>
                <strong>Row 6:</strong> The side <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\overline{QT}", { throwOnError: false }) }} /> is *non-included*. Therefore, we use the <strong>AAS criterion</strong>.
              </li>
            </ul>
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
                <div className="text-lg mb-4 mt-6" dangerouslySetInnerHTML={{ __html: katex.renderToString(questions[currentQuestionIndex].question, { throwOnError: false }) }}></div>
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
                      <div className="text-lg text-slate-600 dark:text-slate-400 mb-4 break-words"
                           dangerouslySetInnerHTML={{ __html: katex.renderToString(questions[currentQuestionIndex].explanation, { throwOnError: false }) }}
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
                <div className="text-3xl mb-4">🏆</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Module Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You have mastered congruence proofs!" : 'Fantastic work!'}
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
      slideId="proving-constructing-complete"
      slideTitle="Constructing Complete Proofs"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}