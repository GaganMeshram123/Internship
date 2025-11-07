import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import katex from 'katex';

// --- FIGURE COMPONENT (Copied from Slide 2 for reference) ---
const SSSProofFigure: React.FC = () => {
  const svgWidth = 350;
  const svgHeight = 250;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const color2 = isDarkMode ? '#F59E0B' : '#D97706'; // Orange
  const color3 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  
  const A = { x: 280, y: 190 };
  const B = { x: 230, y: 60 };
  const C = { x: 70, y: 200 };
  const D = { x: 50, y: 70 };
  const tick1_AB = "M 253 118 L 257 127";
  const tick1_AC = "M 166 200 L 174 196";
  const tick2_BD = "M 130 64 L 140 66";
  const tick2_CD = "M 59 125 L 61 135";

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${D.x} ${D.y} Z`} stroke="none" fill={strokeColor} fillOpacity="0.05" />
        <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y} L ${D.x} ${D.y} Z`} stroke="none" fill={strokeColor} fillOpacity="0.05" />
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={color1} strokeWidth="4" />
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke={color1} strokeWidth="4" />
        <path d={tick1_AB} stroke={color1} strokeWidth="3" />
        <path d={tick1_AC} stroke={color1} strokeWidth="3" />
        <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke={color2} strokeWidth="4" />
        <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke={color2} strokeWidth="4" />
        <path d={tick2_BD} stroke={color2} strokeWidth="3" />
        <path d={`${tick2_BD} transform="translate(-10, 2)"`} stroke={color2} strokeWidth="3" />
        <path d={tick2_CD} stroke={color2} strokeWidth="3" />
        <path d={`${tick2_CD} transform="translate(2, -10)"`} stroke={color2} strokeWidth="3" />
        <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke={color3} strokeWidth="4" />
        <text x={A.x + 10} y={A.y + 5} fill={strokeColor}>A</text>
        <text x={B.x + 5} y={B.y - 10} fill={strokeColor}>B</text>
        <text x={C.x - 15} y={C.y + 5} fill={strokeColor}>C</text>
        <text x={D.x - 15} y={D.y} fill={strokeColor}>D</text>
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT ---

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
// --- END OF TABLE COMPONENT DEFINITION ---


export default function ProvingSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  // --- UPDATED: Now 3 questions ---
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] =  useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'proving-two-column-sss-quiz',
      conceptId: 'proving-two-column-sss',
      conceptName: 'Two-Column Proof (SSS)',
      type: 'judging',
      description: 'Testing understanding of the SSS two-column proof'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED: New questions based on SSS proof ---
  const questions: QuizQuestion[] = [
    {
      id: 'proving-two-column-sss-q1',
      question: 'In the two-column proof, what is the "Reason" for Statement 3 ($AD \\cong AD$)?',
      options: [
        "Given",
        "Reflexive property of congruence",
        "Symmetric property of congruence",
        "SSS congruence criterion"
      ],
      correctAnswer: "Reflexive property of congruence",
      explanation: "Correct! When a part is shared by two triangles, the reason it is congruent to itself is the Reflexive Property."
    },
    {
      id: 'proving-two-column-sss-q2',
      question: 'What is the "Reason" for the final statement, $\\triangle ABD \\cong \\triangle ACD$?',
      options: [
        "Given",
        "Reflexive property of congruence",
        "SSS congruence criterion",
        "SAS congruence criterion"
      ],
      correctAnswer: "SSS congruence criterion",
      explanation: "Correct! The final step is the conclusion. We use SSS because the previous steps (1, 2, and 3) proved three pairs of sides were congruent."
    },
    {
      id: 'proving-two-column-sss-q3',
      question: 'The final reason "SSS" is a conclusion based on which previous statements?',
      options: [
        "Statements 1 and 2",
        "Statements 1, 2, and 3",
        "Statement 3 only",
        "Statement 4 only"
      ],
      correctAnswer: "Statements 1, 2, and 3",
      explanation: "Exactly! The final conclusion is built upon all the evidence. Statements 1, 2, and 3 provide the three 'S's needed for the SSS criterion."
    }
  ];

  // --- Data for the table ---
  const proofRows: ProofRow[] = [
    { num: "1", statement: "AB \\cong AC", reason: "Given" },
    { num: "2", statement: "BD \\cong CD", reason: "Given" },
    { num: "3", statement: "AD \\cong AD", reason: "Reflexive property of congruence" },
    { num: "4", statement: "\\triangle ABD \\cong \\triangle ACD", reason: "SSS congruence criterion" },
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    // ... (This function remains unchanged)
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const handleQuizAnswer = (answerText: string) => {
    // ... (This function remains unchanged, but I'll fix the template literal)
    if (showFeedback || isQuizComplete) return;

    setSelectedAnswer(answerText);
    setShowFeedback(true);

    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    handleInteractionComplete({
      interactionId: `proving-two-column-sss-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-two-column-sss',
      conceptName: 'Two-Column Proof (SSS)',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The Two-Column Format</h2>
            <p className="text-lg leading-relaxed">
              The "paragraph proof" from the last slide is good for thinking, but most geometry classes use the **two-column proof**.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              It's a more organized way to show the exact same logic.
            </p>
            <ul className="list-disc list-inside mt-4 text-lg space-y-2">
              <li>
                <strong>Left Column (Statements):</strong> What you know. This is the step-by-step path of your logic.
              </li>
              <li>
                <strong>Right Column (Reasons):</strong> Why you know it. This is the definition, postulate, or "Given" that justifies each statement.
              </li>
            </ul>
          </div>

          {/* --- CARD 2 (Reference Diagram) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Reference Diagram</h3>
            <SSSProofFigure />
          </div>
        </div>

        {/* Right Column - Proof Table and Quiz */}
        <div className="space-y-6">
          {/* --- TABLE CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Our Proof in Two Columns</h3>
            
            {/* --- USE THE TABLE COMPONENT --- */}
            <ProofTable rows={proofRows} />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              This is the formal, organized version of the logic from the previous slide.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD (Now 3 questions) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Check Your Reasons</h3>
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
                <div className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: katex.renderToString(questions[currentQuestionIndex].question, { throwOnError: false }) }}></div>
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
                <div className="text-3xl mb-4">🏛️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You're a logical thinker!" : 'Great job!'}
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
      slideId="proving-two-column-sss"
      slideTitle="Stating the Full Proof (SSS)"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}