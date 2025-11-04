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
  const givenColor = isDarkMode ? '#F87171' : '#EF4444'; // Red

  // --- Figure 1: Parallel Lines (AAS) ---
  const Q1 = { A: { x: 50, y: 50 }, B: { x: 180, y: 110 }, C: { x: 50, y: 170 } };
  const Q1T2 = { D: { x: 350, y: 50 }, E: { x: 220, y: 110 }, F: { x: 350, y: 170 } };

  // --- Figure 2: Shared Side (ASA trap) ---
  const Q2 = { A: { x: 50, y: 110 }, B: { x: 200, y: 40 }, C: { x: 350, y: 110 }, D: { x: 200, y: 180 } };

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
              {/* Triangles with Vertical Angles */}
              <path d={`M ${Q1.A.x} ${Q1.A.y} L ${Q1.B.x} ${Q1.B.y} L ${Q1.C.x} ${Q1.C.y}`} stroke={strokeColor} {...commonProps} />
              <path d={`M ${Q1T2.D.x} ${Q1T2.D.y} L ${Q1T2.E.x} ${Q1T2.E.y} L ${Q1T2.F.x} ${Q1T2.F.y}`} stroke={strokeColor} {...commonProps} />
              
              {/* Parallel line markings */}
              <line x1={Q1.A.x} y1={Q1.A.y - 10} x2={Q1.C.x} y2={Q1.C.y + 10} stroke={givenColor} />
              <line x1={Q1T2.D.x} y1={Q1T2.D.y - 10} x2={Q1T2.F.x} y2={Q1T2.F.y + 10} stroke={givenColor} />
              <text x={30} y={110} fill={givenColor} fontSize="12">Given: AC || DF</text>

              {/* AAS Markings */}
              <path d={`M ${Q1.C.x + 20} ${Q1.C.y} A 20 20 0 0 0 ${Q1.C.x + 10} ${Q1.C.y - 17}`} stroke={highlightColor} {...commonProps} />
              <path d={`M ${Q1T2.F.x - 20} ${Q1T2.F.y} A 20 20 0 0 1 ${Q1T2.F.x - 10} ${Q1T2.F.y - 17}`} stroke={highlightColor} {...commonProps} />
              
              <path d={`M ${Q1.B.x - 17} ${Q1.B.y - 10} A 20 20 0 0 0 ${Q1.B.x} ${Q1.B.y - 20}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
              <path d={`M ${Q1T2.E.x + 17} ${Q1T2.E.y - 10} A 20 20 0 0 1 ${Q1T2.E.x} ${Q1T2.E.y - 20}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
              
              <line x1={Q1.A.x} y1={Q1.A.y} x2={Q1.B.x} y2={Q1.B.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={Q1T2.D.x} y1={Q1T2.D.y} x2={Q1T2.E.x} y2={Q1T2.E.y} stroke={highlightColor} strokeWidth="4" />
            </motion.g>
          )}

          {questionIndex === 1 && (
            <motion.g
              key="q2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Kite / Shared Side */}
              <path d={`M ${Q2.A.x} ${Q2.A.y} L ${Q2.B.x} ${Q2.B.y} L ${Q2.C.x} ${Q2.C.y} L ${Q2.D.x} ${Q2.D.y} Z`} stroke={strokeColor} {...commonProps} />
              <line x1={Q2.A.x} y1={Q2.A.y} x2={Q2.C.x} y2={Q2.C.y} stroke={strokeColor} {...commonProps} />
              
              {/* Labels */}
              <text x={Q2.A.x - 20} y={Q2.A.y} fill={strokeColor}>A</text>
              <text x={Q2.B.x - 5} y={Q2.B.y - 10} fill={strokeColor}>B</text>
              <text x={Q2.C.x + 10} y={Q2.C.y} fill={strokeColor}>C</text>
              <text x={Q2.D.x - 5} y={Q2.D.y + 15} fill={strokeColor}>D</text>

              {/* Givens */}
              <path d={`M ${Q2.A.x + 17} ${Q2.A.y - 10} A 20 20 0 0 1 ${Q2.A.x + 19} ${Q2.A.y + 6}`} stroke={givenColor} {...commonProps} />
              <path d={`M ${Q2.C.x - 17} ${Q2.C.y - 10} A 20 20 0 0 0 ${Q2.C.x - 19} ${Q2.C.y + 6}`} stroke={givenColor} {...commonProps} />
              <text x={Q2.B.x - 20} y={Q2.B.y - 15} fill={givenColor} fontSize="12">Given: &angle;BAC &cong; &angle;BCA</text>
              
              <line x1={Q2.A.x} y1={Q2.A.y} x2={Q2.B.x} y2={Q2.B.y} stroke={givenColor} strokeWidth="4" />
              <line x1={Q2.C.x} y1={Q2.C.y} x2={Q2.B.x} y2={Q2.B.y} stroke={givenColor} strokeWidth="4" />
              <text x={Q2.B.x - 20} y={Q2.B.y + 10} fill={givenColor} fontSize="12">Given: AB &cong; CB</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function AasSlide5() {
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
      id: 'aas-correct-statements-quiz',
      conceptId: 'aas-correct-statements',
      conceptName: 'AAS Correct Statements',
      type: 'judging',
      description: 'Testing final validation of AAS congruence statements'
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
      id: 'aas-correct-q1-parallel',
      question: 'Given $AC \parallel DF$, $\angle C \cong \angle F$, and $AB \cong DE$. Is the statement $\triangle ABE \cong \triangle DEC$ true?',
      options: [
        "Yes, by AAS",
        "Yes, by ASA",
        "No, not enough information"
      ],
      correctAnswer: "Yes, by AAS",
      explanation: "Correct! We have $\angle C \cong \angle F$ (A), $AB \cong DE$ (S). Because $AC \parallel DF$, we get $\angle A \cong \angle D$ (A) by Alternate Interior Angles. This gives us an A-A-S pattern, so the triangles are congruent."
    },
    {
      id: 'aas-correct-q2-sas',
      question: 'Given $AB \cong CB$ and $\angle BAC \cong \angle BCA$. Is the statement $\triangle ABD \cong \triangle CBD$ true?',
      options: [
        "Yes, by AAS",
        "No, this is SAS",
        "No, not enough information"
      ],
      correctAnswer: "No, not enough information",
      explanation: "This is a trap! We are given $AB \cong CB$ (S) and $\angle BAC \cong \angle BCA$ (A). We also have $AC \cong AC$ by the reflexive property. This gives us S-A-S for $\triangle ABC$ related to $\triangle CBA$, but it tells us nothing about point $D$ or $\triangle ABD$ and $\triangle CBD$. We don't have enough information."
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
      interactionId: `aas-correct-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'aas-correct-statements',
      conceptName: 'AAS Correct Statements',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Mastering Congruence</h2>
            <p className="text-lg leading-relaxed">
              This is the final check. To know if a statement is "correct," you have to combine all your skills.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              You must act like a detective: find the given clues, find the *hidden* clues, and then see if they fit the pattern (AAS).
            </p>
          </div>

          {/* --- CARD 2 (CPCTC for Sides) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Final Checklist</h3>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">1.</span>
                <span>Mark the <strong>Given Information</strong> (congruent angles or sides).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">2.</span>
                <span>Find <strong>Hidden Information</strong>:
                  <ul className="list-disc list-inside ml-6">
                    <li>Vertical Angles (A)</li>
                    <li>Shared Side (S)</li>
                    <li>Parallel Lines (gives you A)</li>
                  </ul>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">3.</span>
                <span>Do you have an <strong>AAS pattern</strong>? (Or ASA? Or SAS?)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">4.</span>
                <span>Does the statement <strong>match the correspondence</strong>? (Is $\triangle ABC \cong \triangle DEF$ the correct order?)</span>
              </li>
            </ul>
             <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                <strong>Watch out for traps!</strong> Sometimes there isn't enough information, or the pattern might be different (like SAS).
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Is the Statement Correct?</h3>
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
                <div className="text-3xl mb-4">👍</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You're a congruence detective!" : 'Great job analyzing the diagrams!'}
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
      slideId="aas-correct-statements"
      slideTitle="Identifying Correct Statements Using the AAS Criterion"
      moduleId="congruence"
      submoduleId="aas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}