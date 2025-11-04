import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- QUIZ FIGURE COMPONENT DEFINED INSIDE ---
// This component shows a different figure based on the current quiz question
const QuizFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const highlightColor = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const trapColor = isDarkMode ? '#F87171' : '#EF4444'; // Red

  // --- Figure 1: Shared Side (SAS) ---
  const Q1 = { A: { x: 50, y: 110 }, B: { x: 200, y: 40 }, C: { x: 350, y: 110 }, D: { x: 200, y: 180 } };

  // --- Figure 2: Vertical Angles (SSA Trap) ---
  const T1_Q2 = { A: { x: 30, y: 50 }, M: { x: 150, y: 110 }, B: { x: 30, y: 170 } };
  const T2_Q2 = { D: { x: 370, y: 50 }, M: { x: 250, y: 110 }, C: { x: 370, y: 170 } };

  const commonProps = {
    fill: 'none',
    strokeWidth: 2,
  };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <AnimatePresence>
          {questionIndex === 0 && (
            <motion.g
              key="q1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Kite / Shared Side */}
              <path d={`M ${Q1.A.x} ${Q1.A.y} L ${Q1.B.x} ${Q1.B.y} L ${Q1.C.x} ${Q1.C.y} L ${Q1.D.x} ${Q1.D.y} Z`} stroke={strokeColor} {...commonProps} />
              <line x1={Q1.A.x} y1={Q1.A.y} x2={Q1.C.x} y2={Q1.C.y} stroke={strokeColor} {...commonProps} />
              
              {/* Labels */}
              <text x={Q1.A.x - 20} y={Q1.A.y} fill={strokeColor}>A</text>
              <text x={Q1.B.x - 5} y={Q1.B.y - 10} fill={strokeColor}>B</text>
              <text x={Q1.C.x + 10} y={Q1.C.y} fill={strokeColor}>C</text>

              {/* SAS Markings */}
              <line x1={Q1.A.x} y1={Q1.A.y} x2={Q1.B.x} y2={Q1.B.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={Q1.C.x} y1={Q1.C.y} x2={Q1.B.x} y2={Q1.B.y} stroke={highlightColor} strokeWidth="4" />
              <text x={125} y={65} fill={highlightColor} fontSize="12">Given: AB &cong; CB</text>
              
              <path d={`M ${Q1.A.x + 17} ${Q1.A.y - 10} A 20 20 0 0 1 ${Q1.A.x + 19} ${Q1.A.y + 6}`} stroke={highlightColor} {...commonProps} />
              <path d={`M ${Q1.C.x - 17} ${Q1.C.y - 10} A 20 20 0 0 0 ${Q1.C.x - 19} ${Q1.C.y + 6}`} stroke={highlightColor} {...commonProps} />
              <text x={180} y={90} fill={highlightColor} fontSize="12">Given: &angle;BAC &cong; &angle;BCA</text>
              
              <line x1={Q1.A.x} y1={Q1.A.y} x2={Q1.C.x} y2={Q1.C.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
              <text x={190} y={120} fill={highlightColor} fontSize="12">Shared Side (Reflexive)</text>
            </motion.g>
          )}

          {questionIndex === 1 && (
            <motion.g
              key="q2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Triangles with Vertical Angles */}
              <path d={`M ${T1_Q2.A.x} ${T1_Q2.A.y} L ${T1_Q2.M.x} ${T1_Q2.M.y} L ${T1_Q2.B.x} ${T1_Q2.B.y} Z`} stroke={strokeColor} {...commonProps} />
              <path d={`M ${T2_Q2.C.x} ${T2_Q2.C.y} L ${T2_Q2.M.x} ${T2_Q2.M.y} L ${T2_Q2.D.x} ${T2_Q2.D.y} Z`} stroke={strokeColor} {...commonProps} />
              
              {/* Labels */}
              <text x={T1_Q2.A.x - 20} y={T1_Q2.A.y} fill={strokeColor}>A</text>
              <text x={T1_Q2.B.x - 20} y={T1_Q2.B.y + 10} fill={strokeColor}>B</text>
              <text x={T2_Q2.C.x + 10} y={T2_Q2.C.y + 10} fill={strokeColor}>C</text>
              <text x={T2_Q2.D.x + 10} y={T2_Q2.D.y} fill={strokeColor}>D</text>
              <text x={195} y={115} fill={strokeColor}>M</text>

              {/* SSA Markings */}
              <line x1={T1_Q2.A.x} y1={T1_Q2.A.y} x2={T1_Q2.B.x} y2={T1_Q2.B.y} stroke={trapColor} strokeWidth="4" />
              <line x1={T2_Q2.D.x} y1={T2_Q2.D.y} x2={T2_Q2.C.x} y2={T2_Q2.C.y} stroke={trapColor} strokeWidth="4" />
              <text x={30} y={110} fill={trapColor} fontSize="12">Given: AB &cong; DC</text>

              <line x1={T1_Q2.A.x} y1={T1_Q2.A.y} x2={T1_Q2.M.x} y2={T1_Q2.M.y} stroke={trapColor} strokeWidth="4" strokeDasharray="5 5" />
              <line x1={T2_Q2.D.x} y1={T2_Q2.D.y} x2={T2_Q2.M.x} y2={T2_Q2.M.y} stroke={trapColor} strokeWidth="4" strokeDasharray="5 5" />
              <text x={90} y={70} fill={trapColor} fontSize="12">Given: AM &cong; DM</text>

              {/* Vertical Angles (The "A" in SSA) */}
              <path d={`M ${T1_Q2.M.x - 17} ${T1_Q2.M.y - 10} A 20 20 0 0 0 ${T1_Q2.M.x} ${T1_Q2.M.y - 20}`} stroke={trapColor} {...commonProps} />
              <path d={`M ${T2_Q2.M.x + 17} ${T2_Q2.M.y + 10} A 20 20 0 0 0 ${T2_Q2.M.x} ${T2_Q2.M.y + 20}`} stroke={trapColor} {...commonProps} />
              <text x={160} y={140} fill={trapColor} fontSize="12">Vertical Angles</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function SasSlide5() {
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
      id: 'sas-true-statements-quiz',
      conceptId: 'sas-true-statements',
      conceptName: 'SAS True Statements',
      type: 'judging',
      description: 'Testing final validation of SAS congruence statements'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  const questions: QuizQuestion[] = [
    {
      id: 'sas-true-q1-asa-trap',
      question: 'Given $AB \cong CB$ and $\angle BAC \cong \angle BCA$. Is the statement $\triangle ABC \cong \triangle CBA$ true?',
      options: [
        "Yes, by SAS",
        "Yes, by ASA",
        "No, not enough information"
      ],
      correctAnswer: "Yes, by ASA",
      explanation: "This is a tricky one! We are given $AB \cong CB$ (S) and $\angle BAC \cong \angle BCA$ (A). But we also have a *shared side* $AC \cong CA$ (S). The pattern is Side-Angle-Side... wait! The *angle* $\angle BAC$ is not included between $AB$ and $AC$. But $\angle BCA$ *is* included between $CB$ and $CA$. Let's re-check. The *other* pattern is Angle-Side-Angle: $\angle BAC$ (A), $AC$ (S), $\angle BCA$ (A). This is a valid ASA congruence!"
    },
    {
      id: 'sas-true-q2-ssa-trap',
      question: 'Given $AM \cong DM$ and $AB \cong DC$. Is the statement $\triangle ABM \cong \triangle DCM$ true?',
      options: [
        "Yes, by SAS",
        "Yes, by AAS",
        "No, this is the SSA trap"
      ],
      correctAnswer: "No, this is the SSA trap",
      explanation: "Correct! We are given $AM \cong DM$ (S) and $AB \cong DC$ (S). We also know $\angle AMB \cong \angle DMC$ (A) from vertical angles. This creates a Side-Side-Angle (SSA) pattern, which *cannot* be used to prove congruence. We don't have enough information."
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
      interactionId: `sas-true-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sas-true-statements',
      conceptName: 'SAS True Statements',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Putting It All Together</h2>
            <p className="text-lg leading-relaxed">
              This is the final check. To know if a statement is "correct," you have to combine all your skills.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              You must act like a detective: find the given clues, find the *hidden* clues, and then see if they fit the pattern (SAS).
            </p>
          </div>

          {/* --- CARD 2 (The Checklist) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Final Checklist</h3>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">1.</span>
                <span>Mark the <strong>Given Information</strong> (congruent sides or angles).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">2.</span>
                <span>Find <strong>Hidden Information</strong>:
                  <ul className="list-disc list-inside ml-6">
                    <li>Vertical Angles (A)</li>
                    <li>Shared Side (Reflexive Property) (S)</li>
                  </ul>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">3.</span>
                <span>Check the pattern. Is it <strong>SAS</strong>? (Is the angle *included*?)</span>
              </li>
            </ul>
             <div className="mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900/30">
              <p className="text-lg text-red-700 dark:text-red-300">
                <strong>Watch out for traps!</strong> The pattern might be ASA, or it might be the invalid <strong>SSA</strong> pattern.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Is the Statement True?</h3>
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
            <QuizFigure questionIndex={currentQuestionIndex} />

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
                <div className="text-3xl mb-4">🕵️‍♂️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Excellent detective work!" : 'Great job analyzing the clues!'}
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
      slideId="sas-true-statements"
      slideTitle="Identifying True Statements Using the SAS Criterion"
      moduleId="congruence"
      submoduleId="sas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}