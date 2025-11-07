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
const SasCpctcFigure: React.FC = () => {
  const svgWidth = 300;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const N={x: 50, y: 50}, M={x: 100, y: 180}, O={x: 150, y: 115}, K={x: 250, y: 180}, L={x: 200, y: 50};
  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${N.x} ${N.y} L ${K.x} ${K.y}`} stroke={strokeColor} strokeWidth="2" />
        <path d={`M ${M.x} ${M.y} L ${L.x} ${L.y}`} stroke={strokeColor} strokeWidth="2" />
        <path d={`M ${N.x} ${N.y} L ${M.x} ${M.y}`} stroke={strokeColor} strokeWidth="2" />
        <path d={`M ${K.x} ${K.y} L ${L.x} ${L.y}`} stroke={strokeColor} strokeWidth="2" />
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

// --- Helper figures for the quiz ---
const SSSFigure: React.FC<{ strokeColor: string }> = ({ strokeColor }) => {
  const A={x: 175, y: 220}, C={x: 50, y: 100}, D={x: 175, y: 40}, B={x: 300, y: 100};
  return (
    <g>
      <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y} L ${D.x} ${D.y} L ${B.x} ${B.y} Z`} stroke={strokeColor} fill="none" />
      <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} strokeWidth="1" strokeDasharray="4 4" />
      
      {/* Ticks: AB cong CD (1) */}
      <path d="M 242 163 L 234 156" stroke={strokeColor} strokeWidth="2" />
      <path d="M 108 67 L 116 74" stroke={strokeColor} strokeWidth="2" />

      {/* Ticks: AC cong BD (2) */}
      <path d="M 105 165 L 113 158" stroke={strokeColor} strokeWidth="2" />
      <path d="M 102 162 L 110 155" stroke={strokeColor} strokeWidth="2" />
      <path d="M 245 67 L 237 74" stroke={strokeColor} strokeWidth="2" />
      <path d="M 248 70 L 240 77" stroke={strokeColor} strokeWidth="2" />

      <text x={A.x - 10} y={A.y + 20} fill={strokeColor}>A</text>
      <text x={B.x + 10} y={B.y + 5} fill={strokeColor}>B</text>
      <text x={C.x - 20} y={C.y + 5} fill={strokeColor}>C</text>
      <text x={D.x - 10} y={D.y - 10} fill={strokeColor}>D</text>
    </g>
  );
};

const SASPentagonFigure: React.FC<{ strokeColor: string }> = ({ strokeColor }) => {
  const A={x: 175, y: 40}, B={x: 75, y: 100}, C={x: 125, y: 200}, D={x: 225, y: 200}, E={x: 275, y: 100};
  return (
    <g>
      <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} L ${E.x} ${E.y} Z`} stroke={strokeColor} fill="none" />
      {/* Diagonals */}
      <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y}`} stroke={strokeColor} strokeWidth="1" />
      <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} strokeWidth="1" />
      
      {/* Ticks: AB cong AE (1) */}
      <path d="M 120 67 L 128 74" stroke={strokeColor} strokeWidth="2" />
      <path d="M 230 67 L 222 74" stroke={strokeColor} strokeWidth="2" />

      {/* Ticks: ACD is equilateral (2) */}
      <path d="M 148 120 L 152 112" stroke={strokeColor} strokeWidth="2" />
      <path d="M 145 122 L 149 114" stroke={strokeColor} strokeWidth="2" />
      <path d="M 198 120 L 202 112" stroke={strokeColor} strokeWidth="2" />
      <path d="M 195 122 L 199 114" stroke={strokeColor} strokeWidth="2" />
      <path d="M 172 200 L 178 200" stroke={strokeColor} strokeWidth="2" />
      <path d="M 172 203 L 178 203" stroke={strokeColor} strokeWidth="2" />
      
      {/* Angle: BAC cong DAE */}
      <path d="M 166 58 A 20 20 0 0 0 148 70" stroke={strokeColor} fill="none" strokeWidth="1.5" />
      <path d="M 184 58 A 20 20 0 0 1 202 70" stroke={strokeColor} fill="none" strokeWidth="1.5" />
      
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
  // --- UPDATED: Now 4 questions ---
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
  
  // --- UPDATED: New questions based on images ---
  const questions: QuizQuestion[] = [
    {
      id: 'proving-q1-sss-step2',
      question: 'Diagram 1: Given $\overline{AB} \cong \overline{CD}$. What is the missing "Given" statement in Step 2?',
      options: ["$\overline{AC} \cong \overline{BD}$", "$\overline{AD} \cong \overline{AD}$", "$\angle A \cong \angle D$", "$\angle B \cong \angle C$"],
      correctAnswer: "$\overline{AC} \cong \overline{BD}$",
      explanation: "Correct! This is the second 'Given' pair of sides (marked with double tick marks) needed for the SSS proof."
    },
    {
      id: 'proving-q1-sss-step3',
      question: 'Diagram 1: What is the reason for Step 3: $\overline{AD} \cong \overline{AD}$?',
      options: ["Given", "Reflexive property of congruence", "Symmetric property", "SSS criterion"],
      correctAnswer: "Reflexive property of congruence",
      explanation: "Correct! The diagonal $\overline{AD}$ is a shared side for both $\triangle ABD$ and $\triangle DCA$. The reason it's congruent to itself is the Reflexive Property."
    },
    {
      id: 'proving-q2-sas-step2',
      question: 'Diagram 2: What is the missing "Given" statement in Step 2?',
      options: ["$\overline{AC} \cong \overline{AD}$", "$\overline{AB} \cong \overline{AE}$", "$\angle BAC \cong \angle DAE$", "$\triangle ACD$ is equilateral"],
      correctAnswer: "$\overline{AB} \cong \overline{AE}$",
      explanation: "Correct! This is one of the 'Given' statements, providing the first 'Side' (S) for our SAS proof."
    },
    {
      id: 'proving-q2-sas-step4',
      question: 'Diagram 2: What is the missing Statement in Step 4 that provides the second "Side" for SAS?',
      options: ["$\overline{AC} \cong \overline{AD}$", "$\overline{BC} \cong \overline{ED}$", "$\angle C \cong \angle D$", "CPCTC"],
      correctAnswer: "$\overline{AC} \cong \overline{AD}$",
      explanation: "Correct! Because $\triangle ACD$ is equilateral (Step 1), we know all its sides are congruent. This gives us our second 'Side' (S)."
    }
  ];
  
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
             <p className="text-lg text-slate-600 dark:text-slate-400 mb-4 leading-normal break-words whitespace-normal">
  {questions[currentQuestionIndex].explanation}
</p>

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