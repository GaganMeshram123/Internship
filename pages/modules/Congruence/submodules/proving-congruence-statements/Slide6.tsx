import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- QUIZ FIGURE COMPONENT DEFINED INSIDE ---
// This component shows a different figure based on the current quiz question
const ProofQuizFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const givenColor = isDarkMode ? '#F87171' : '#EF4444'; // Red
  const hiddenColor = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const rightAngleColor = isDarkMode ? '#F87171' : '#EF4444'; // Red

  const commonProps = {
    fill: 'none',
    strokeWidth: 2,
    stroke: strokeColor,
  };
  
  // --- Figure 1: ASA Proof ---
  const T1_Q1 = { A: { x: 30, y: 50 }, M: { x: 150, y: 110 }, B: { x: 30, y: 170 } };
  const T2_Q1 = { D: { x: 370, y: 50 }, M: { x: 250, y: 110 }, C: { x: 370, y: 170 } };

  // --- Figure 2: AAS Proof ---
  // Re-using the same figure, just different markings
  
  // --- Figure 3: HL Proof ---
  const Q3 = { A: { x: 200, y: 50 }, B: { x: 100, y: 180 }, C: { x: 300, y: 180 }, M: { x: 200, y: 180 } };


  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <AnimatePresence>
          {questionIndex === 0 && (
            <motion.g key="q1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Triangles with Vertical Angles */}
              <line x1={T1_Q1.A.x} y1={T1_Q1.A.y} x2={T2_Q1.C.x} y2={T2_Q1.C.y} stroke={strokeColor} />
              <line x1={T1_Q1.B.x} y1={T1_Q1.B.y} x2={T2_Q1.D.x} y2={T2_Q1.D.y} stroke={strokeColor} />
              
              {/* ASA Markings */}
            {/*   <path d={`M ${T1_Q1.A.x + 20} ${T1_Q1.A.y} A 20 20 0 0 1 ${T1_Q1.A.x + 12} ${T1_Q1.A.y + 16}`} stroke={givenColor} {...commonProps} strokeWidth="2" />
              <path d={`M ${T2_Q1.C.x - 20} ${T2_Q1.C.y} A 20 20 0 0 0 ${T2_Q1.C.x - 12} ${T2_Q1.C.y - 16}`} stroke={givenColor} {...commonProps} strokeWidth="2" />
              */} <text x={30} y={40} fill={givenColor} fontSize="12">Given: $\angle A \cong \angle C$ (A)</text>
              
              <line x1={T1_Q1.A.x} y1={T1_Q1.A.y} x2={T1_Q1.M.x} y2={T1_Q1.M.y} stroke={givenColor} strokeWidth="4" />
              <line x1={T2_Q1.C.x} y1={T2_Q1.C.y} x2={T2_Q1.M.x} y2={T2_Q1.M.y} stroke={givenColor} strokeWidth="4" />
              <text x={90} y={70} fill={givenColor} fontSize="12">Given: $AM \cong CM$ (S)</text>

              <path d={`M ${T1_Q1.M.x - 17} ${T1_Q1.M.y - 10} A 20 20 0 0 0 ${T1_Q1.M.x} ${T1_Q1.M.y - 20}`} stroke={hiddenColor} strokeWidth="2" />
              <path d={`M ${T2_Q1.M.x + 17} ${T2_Q1.M.y + 10} A 20 20 0 0 0 ${T2_Q1.M.x} ${T2_Q1.M.y + 20}`} stroke={hiddenColor} strokeWidth="2" />
              <text x={160} y={140} fill={hiddenColor} fontSize="12">Hidden: $\angle AMB \cong \angle CMD$ (A)</text>
            </motion.g>
          )}

          {questionIndex === 1 && (
            <motion.g key="q2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Triangles with Vertical Angles */}
              <line x1={T1_Q1.A.x} y1={T1_Q1.A.y} x2={T2_Q1.C.x} y2={T2_Q1.C.y} stroke={strokeColor} />
              <line x1={T1_Q1.B.x} y1={T1_Q1.B.y} x2={T2_Q1.D.x} y2={T2_Q1.D.y} stroke={strokeColor} />
              
              {/* AAS Markings */}
            {/*   <path d={`M ${T1_Q1.A.x + 20} ${T1_Q1.A.y} A 20 20 0 0 1 ${T1_Q1.A.x + 12} ${T1_Q1.A.y + 16}`} stroke={givenColor} {...commonProps} strokeWidth="2" />
              <path d={`M ${T2_Q1.C.x - 20} ${T2_Q1.C.y} A 20 20 0 0 0 ${T2_Q1.C.x - 12} ${T2_Q1.C.y - 16}`} stroke={givenColor} {...commonProps} strokeWidth="2" />
              */} <text x={30} y={40} fill={givenColor} fontSize="12">Given: $\angle A \cong \angle C$ (A)</text>
              
              <line x1={T1_Q1.B.x} y1={T1_Q1.B.y} x2={T1_Q1.M.x} y2={T1_Q1.M.y} stroke={givenColor} strokeWidth="4" />
              <line x1={T2_Q1.D.x} y1={T2_Q1.D.y} x2={T2_Q1.M.x} y2={T2_Q1.M.y} stroke={givenColor} strokeWidth="4" />
              <text x={30} y={190} fill={givenColor} fontSize="12">Given: $BM \cong DM$ (S)</text>

              <path d={`M ${T1_Q1.M.x - 17} ${T1_Q1.M.y - 10} A 20 20 0 0 0 ${T1_Q1.M.x} ${T1_Q1.M.y - 20}`} stroke={hiddenColor} strokeWidth="2" />
              <path d={`M ${T2_Q1.M.x + 17} ${T2_Q1.M.y + 10} A 20 20 0 0 0 ${T2_Q1.M.x} ${T2_Q1.M.y + 20}`} stroke={hiddenColor} strokeWidth="2" />
              <text x={160} y={140} fill={hiddenColor} fontSize="12">Hidden: $\angle AMB \cong \angle CMD$ (A)</text>
            </motion.g>
          )}
          
          {questionIndex === 2 && (
            <motion.g key="q3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Isosceles Triangle with Altitude */}
              <path d={`M ${Q3.A.x} ${Q3.A.y} L ${Q3.B.x} ${Q3.B.y} L ${Q3.C.x} ${Q3.C.y} Z`} {...commonProps} />
              <line x1={Q3.A.x} y1={Q3.A.y} x2={Q3.M.x} y2={Q3.M.y} {...commonProps} />
              
              {/* Right Angle Marker */}
            {/*   <path d={`M ${Q3.M.x - 15} ${Q3.M.y} L ${Q3.M.x - 15} ${Q3.M.y - 15} L ${Q3.M.x} ${Q3.M.y - 15}`} stroke={rightAngleColor} {...commonProps} strokeWidth="2" />
              <text x={100} y={160} fill={givenColor} fontSize="12">Given: $AM \perp BC$ (Right $\triangle$s)</text>
 */}
              {/* H (Given) */}
              <line x1={Q3.A.x} y1={Q3.A.y} x2={Q3.B.x} y2={Q3.B.y} stroke={givenColor} strokeWidth="4" />
              <line x1={Q3.A.x} y1={Q3.A.y} x2={Q3.C.x} y2={Q3.C.y} stroke={givenColor} strokeWidth="4" />
              <text x={260} y={100} fill={givenColor} fontSize="12">Given: $AB \cong AC$ (H)</text>

              {/* L (Hidden) */}
              <line x1={Q3.A.x} y1={Q3.A.y} x2={Q3.M.x} y2={Q3.M.y} stroke={hiddenColor} strokeWidth="4" strokeDasharray="5 5" />
              <text x={210} y={115} fill={hiddenColor} fontSize="12">Hidden: $AM \cong AM$ (L)</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


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
  
  const allReasons = ["SSS", "SAS", "ASA", "AAS", "HL", "CPCTC"];

  const questions: QuizQuestion[] = [
    {
      id: 'proving-asa-q1',
      question: 'Proof 1: Given $\angle A \cong \angle C$ and $AM \cong CM$. What is the final reason to prove $\triangle ABM \cong \triangle CDM$?',
      options: allReasons,
      correctAnswer: "ASA",
      explanation: "Correct! We have $\angle A \cong \angle C$ (A), $AM \cong CM$ (S), and $\angle AMB \cong \angle CMD$ (Vertical Angles - A). The side is *included*, so the reason is ASA."
    },
    {
      id: 'proving-aas-q2',
      question: 'Proof 2: Given $\angle A \cong \angle C$ and $BM \cong DM$. What is the final reason to prove $\triangle ABM \cong \triangle CDM$?',
      options: allReasons,
      correctAnswer: "AAS",
      explanation: "Correct! We have $\angle A \cong \angle C$ (A), $\angle AMB \cong \angle CMD$ (Vertical Angles - A), and $BM \cong DM$ (S). The side is *non-included*, so the reason is AAS."
    },
    {
      id: 'proving-hl-q3',
      question: 'Proof 3: Given $AM \perp BC$ and $AB \cong AC$. What is the final reason to prove $\triangle ABM \cong \triangle ACM$?',
      options: allReasons,
      correctAnswer: "HL",
      explanation: "Correct! $AM \perp BC$ gives us two right triangles. $AB \cong AC$ is the Hypotenuse (H). The shared side $AM \cong AM$ is a Leg (L). The reason is HL."
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Practice Proof: ASA vs. AAS</h2>
            <p className="text-lg leading-relaxed">
              ASA and AAS are very similar and often use the same hidden clues (like vertical angles).
            </p>
            <p className="text-lg leading-relaxed mt-4">
              <strong>For Proof 1 (ASA):</strong>
              <br/>
              We are given an Angle ($\angle A$) and a Side ($AM$). The hidden clue is the Vertical Angle ($\angle AMB$). The side $AM$ is *included* between the two angles, so we use <strong>ASA</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              <strong>For Proof 2 (AAS):</strong>
              <br/>
              We are given an Angle ($\angle A$) and a Side ($BM$). The hidden clue is the Vertical Angle ($\angle AMB$). The side $BM$ is *non-included*, so we use <strong>AAS</strong>.
            </p>
          </div>

          {/* --- CARD 2 (The Logic) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Practice Proof: HL</h3>
            <p className="text-lg leading-relaxed">
              For <strong>Proof 3</strong>, you must check the three conditions for HL.
            </p>
            <ol className="list-decimal list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Right Triangles?</strong> Yes, "Given $AM \perp BC$".
              </li>
              <li>
                <strong>Hypotenuses Congruent?</strong> Yes, "Given $AB \cong AC$".
              </li>
              <li>
                <strong>Legs Congruent?</strong> Yes, $AM \cong AM$ by the **Reflexive Property**.
              </li>
            </ol>
             <p className="text-lg leading-relaxed mt-2">
              Since all three are true, the reason is <strong>HL</strong>.
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Complete the Proof</h3>
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
      slideTitle="Proving Congruence Using the ASA, AAS, and HL Criteria"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}