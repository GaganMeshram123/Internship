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

  const commonProps = {
    fill: 'none',
    strokeWidth: 2,
    stroke: strokeColor,
  };
  
  // --- Figure 1 & 2: SSS Proof ---
  const Q1 = { A: { x: 50, y: 110 }, B: { x: 200, y: 40 }, C: { x: 350, y: 110 }, D: { x: 200, y: 180 } };
  
  // --- Figure 3: SAS Proof ---
  const T1_Q3 = { A: { x: 30, y: 50 }, M: { x: 150, y: 110 }, B: { x: 30, y: 170 } };
  const T2_Q3 = { D: { x: 370, y: 50 }, M: { x: 250, y: 110 }, C: { x: 370, y: 170 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <AnimatePresence>
          {(questionIndex === 0 || questionIndex === 1) && (
            <motion.g key="q1q2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Kite with diagonal AC */}
              <path d="M 50 110 L 200 40 L 350 110 Z" {...commonProps} />
              <path d="M 50 110 L 200 180 L 350 110 Z" {...commonProps} />
              <line x1="50" y1="110" x2="350" y2="110" {...commonProps} />
              
              {/* SSS Markings */}
              <line x1="50" y1="110" x2="200" y2="40" stroke={givenColor} strokeWidth="4" />
              <line x1="50" y1="110" x2="200" y2="180" stroke={givenColor} strokeWidth="4" />
              <text x={125} y={65} fill={givenColor} fontSize="12">Given: $AB \cong AD$ (S)</text>

              <line x1="350" y1="110" x2="200" y2="40" stroke={givenColor} strokeWidth="4" strokeDasharray="5 5" />
              <line x1="350" y1="110" x2="200" y2="180" stroke={givenColor} strokeWidth="4" strokeDasharray="5 5" />
              <text x={275} y={65} fill={givenColor} fontSize="12">Given: $CB \cong CD$ (S)</text>
              
              <line x1="50" y1="110" x2="350" y2="110" stroke={hiddenColor} strokeWidth="4" strokeDasharray="1 5" />
              <text x={180} y={125} fill={hiddenColor} fontSize="12">Hidden: $AC \cong AC$ (S)</text>
            </motion.g>
          )}

          {questionIndex === 2 && (
            <motion.g key="q3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Triangles with Vertical Angles */}
              <line x1={T1_Q3.A.x} y1={T1_Q3.A.y} x2={T2_Q3.C.x} y2={T2_Q3.C.y} stroke={strokeColor} />
              <line x1={T1_Q3.B.x} y1={T1_Q3.B.y} x2={T2_Q3.D.x} y2={T2_Q3.D.y} stroke={strokeColor} />
              
              {/* SAS Markings */}
              <line x1={T1_Q3.A.x} y1={T1_Q3.A.y} x2={T1_Q3.M.x} y2={T1_Q3.M.y} stroke={givenColor} strokeWidth="4" />
              <line x1={T2_Q3.C.x} y1={T2_Q3.C.y} x2={T2_Q3.M.x} y2={T2_Q3.M.y} stroke={givenColor} strokeWidth="4" />
              <text x={90} y={70} fill={givenColor} fontSize="12">Given: $AM \cong CM$ (S)</text>
              
              <line x1={T1_Q3.B.x} y1={T1_Q3.B.y} x2={T1_Q3.M.x} y2={T1_Q3.M.y} stroke={givenColor} strokeWidth="4" strokeDasharray="5 5" />
              <line x1={T2_Q3.D.x} y1={T2_Q3.D.y} x2={T2_Q3.M.x} y2={T2_Q3.M.y} stroke={givenColor} strokeWidth="4" strokeDasharray="5 5" />
              <text x={30} y={190} fill={givenColor} fontSize="12">Given: $BM \cong DM$ (S)</text>

              <path d={`M ${T1_Q3.M.x - 17} ${T1_Q3.M.y - 10} A 20 20 0 0 0 ${T1_Q3.M.x} ${T1_Q3.M.y - 20}`} stroke={hiddenColor} strokeWidth="2" />
              <path d={`M ${T2_Q3.M.x + 17} ${T2_Q3.M.y + 10} A 20 20 0 0 0 ${T2_Q3.M.x} ${T2_Q3.M.y + 20}`} stroke={hiddenColor} strokeWidth="2" />
              <text x={160} y={140} fill={hiddenColor} fontSize="12">Hidden: $\angle AMB \cong \angle CMD$ (A)</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function ProvingSlide5() {
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
      id: 'proving-sss-sas-quiz',
      conceptId: 'proving-sss-sas',
      conceptName: 'Proving with SSS/SAS',
      type: 'judging',
      description: 'Testing completion of SSS and SAS proofs'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }
  
  const allReasons = ["Given", "Reflexive Property", "Vertical Angles", "SSS", "SAS", "CPCTC"];

  const questions: QuizQuestion[] = [
    {
      id: 'proving-sss-sas-q1',
      question: 'Proof 1: What is the reason for the statement $\overline{AC} \cong \overline{AC}$?',
      options: allReasons,
      correctAnswer: "Reflexive Property",
      explanation: "Correct! The Reflexive Property is the reason we use when a side is shared by both triangles."
    },
    {
      id: 'proving-sss-sas-q2',
      question: 'Proof 1: After step 3, which criterion proves $\triangle ABC \cong \triangle ADC$?',
      options: allReasons,
      correctAnswer: "SSS",
      explanation: "Correct! We have $AB \cong AD$ (Given - S), $CB \cong CD$ (Given - S), and $AC \cong AC$ (Reflexive - S). This is SSS."
    },
    {
      id: 'proving-sss-sas-q3',
      question: 'Proof 2: We are given two pairs of congruent sides (S, S). What is the *hidden* piece of information we need to prove $\triangle AMB \cong \triangle CMD$ by SAS?',
      options: [
        "$\overline{AB} \cong \overline{CD}$",
        "$\angle A \cong \angle C$",
        "$\angle AMB \cong \angle CMD$",
        "$\overline{AC} \cong \overline{BD}$"
      ],
      correctAnswer: "$\angle AMB \cong \angle CMD$",
      explanation: "Correct! The included angle is at vertex M. We know $\angle AMB \cong \angle CMD$ because they are Vertical Angles. This gives us the 'A' in SAS."
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
      interactionId: `proving-sss-sas-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-sss-sas',
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


  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* --- CARD 1 --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Practice Proof: SSS</h2>
            <p className="text-lg leading-relaxed">
              Let's build a proof for the figure in <strong>Question 1 & 2</strong>.
            </p>
            <ul className="list-disc list-inside mt-4 text-lg space-y-2">
              <li>
                <strong>Given:</strong> $AB \cong AD$ (S) and $CB \cong CD$ (S)
              </li>
              <li>
                <strong>Prove:</strong> $\triangle ABC \cong \triangle ADC$
              </li>
            </ul>
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              The "missing step" is finding the shared side $AC \cong AC$, which is our third (S). The reason is the **Reflexive Property**.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              The final reason is <strong>SSS</strong>.
            </p>
          </div>

          {/* --- CARD 2 (The Logic) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Practice Proof: SAS</h3>
            <p className="text-lg leading-relaxed">
              Now let's build a proof for the figure in <strong>Question 3</strong>.
            </p>
            <ul className="list-disc list-inside mt-4 text-lg space-y-2">
              <li>
                <strong>Given:</strong> $AM \cong CM$ (S) and $BM \cong DM$ (S)
              </li>
              <li>
                <strong>Prove:</strong> $\triangle AMB \cong \triangle CMD$
              </li>
            </ul>
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              The "missing step" is finding the included angle. $\angle AMB$ and $\angle CMD$ are **Vertical Angles**, so they are congruent (A).
            </p>
             <p className="text-lg leading-relaxed mt-2">
              The final reason is <strong>SAS</strong>.
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
      slideId="proving-sss-sas"
      slideTitle="Proving Congruence Using the SSS and SAS Criteria"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}