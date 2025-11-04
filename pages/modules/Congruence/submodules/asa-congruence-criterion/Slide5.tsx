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

  // --- Figure 1: Vertical Angles ---
  const T1_Q1 = { A: { x: 30, y: 50 }, M: { x: 150, y: 110 }, B: { x: 30, y: 170 } };
  const T2_Q1 = { D: { x: 370, y: 50 }, M: { x: 250, y: 110 }, C: { x: 370, y: 170 } };

  // --- Figure 2: Shared Side ---
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
              <path d={`M ${T1_Q1.A.x} ${T1_Q1.A.y} L ${T1_Q1.M.x} ${T1_Q1.M.y} L ${T1_Q1.B.x} ${T1_Q1.B.y} Z`} stroke={strokeColor} {...commonProps} />
              <path d={`M ${T2_Q1.C.x} ${T2_Q1.C.y} L ${T2_Q1.M.x} ${T2_Q1.M.y} L ${T2_Q1.D.x} ${T2_Q1.D.y} Z`} stroke={strokeColor} {...commonProps} />
              
              {/* Labels */}
              <text x={T1_Q1.A.x - 20} y={T1_Q1.A.y} fill={strokeColor}>A</text>
              <text x={T1_Q1.B.x - 20} y={T1_Q1.B.y + 10} fill={strokeColor}>B</text>
              <text x={T2_Q1.C.x + 10} y={T2_Q1.C.y + 10} fill={strokeColor}>C</text>
              <text x={T2_Q1.D.x + 10} y={T2_Q1.D.y} fill={strokeColor}>D</text>
              <text x={195} y={115} fill={strokeColor}>M</text>

              {/* Givens */}
              <path d={`M ${T1_Q1.A.x + 20} ${T1_Q1.A.y} A 20 20 0 0 1 ${T1_Q1.A.x + 12} ${T1_Q1.A.y + 16}`} stroke={givenColor} {...commonProps} />
              <path d={`M ${T2_Q1.D.x - 20} ${T2_Q1.D.y} A 20 20 0 0 0 ${T2_Q1.D.x - 12} ${T2_Q1.D.y + 16}`} stroke={givenColor} {...commonProps} />
              <text x={T1_Q1.A.x} y={T1_Q1.A.y - 10} fill={givenColor} fontSize="12">Given: &angle;A &cong; &angle;D</text>

              <line x1={T1_Q1.A.x} y1={T1_Q1.A.y} x2={T1_Q1.M.x} y2={T1_Q1.M.y} stroke={givenColor} strokeWidth="4" />
              <line x1={T2_Q1.D.x} y1={T2_Q1.D.y} x2={T2_Q1.M.x} y2={T2_Q1.M.y} stroke={givenColor} strokeWidth="4" />
              <text x={90} y={70} fill={givenColor} fontSize="12">Given: AM &cong; DM</text>

              {/* Vertical Angles (The "hidden" part) */}
              <path d={`M ${T1_Q1.M.x - 17} ${T1_Q1.M.y - 10} A 20 20 0 0 0 ${T1_Q1.M.x} ${T1_Q1.M.y - 20}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
              <path d={`M ${T2_Q1.M.x + 17} ${T2_Q1.M.y + 10} A 20 20 0 0 0 ${T2_Q1.M.x} ${T2_Q1.M.y + 20}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
              <text x={160} y={140} fill={highlightColor} fontSize="12">Vertical Angles</text>
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
              <line x1={Q2.B.x} y1={Q2.B.y} x2={Q2.D.x} y2={Q2.D.y} stroke={strokeColor} {...commonProps} />
              
              {/* Labels */}
              <text x={Q2.A.x - 20} y={Q2.A.y} fill={strokeColor}>A</text>
              <text x={Q2.B.x - 5} y={Q2.B.y - 10} fill={strokeColor}>B</text>
              <text x={Q2.C.x + 10} y={Q2.C.y} fill={strokeColor}>C</text>
              <text x={Q2.D.x - 5} y={Q2.D.y + 15} fill={strokeColor}>D</text>

              {/* Givens */}
              <path d={`M ${Q2.B.x - 18} ${Q2.B.y + 10} A 20 20 0 0 1 ${Q2.B.x - 5} ${Q2.B.y + 19}`} stroke={givenColor} {...commonProps} />
              <path d={`M ${Q2.D.x - 18} ${Q2.D.y - 10} A 20 20 0 0 0 ${Q2.D.x - 5} ${Q2.D.y - 19}`} stroke={givenColor} {...commonProps} />
              <text x={Q2.B.x + 10} y={Q2.B.y + 10} fill={givenColor} fontSize="12">Given: &angle;ABD &cong; &angle;CBD</text>

              <path d={`M ${Q2.B.x + 18} ${Q2.B.y + 10} A 20 20 0 0 0 ${Q2.B.x + 5} ${Q2.B.y + 19}`} stroke={givenColor} {...commonProps} strokeDasharray="3 3"/>
              <path d={`M ${Q2.D.x + 18} ${Q2.D.y - 10} A 20 20 0 0 1 ${Q2.D.x + 5} ${Q2.D.y - 19}`} stroke={givenColor} {...commonProps} strokeDasharray="3 3"/>
              <text x={Q2.B.x + 10} y={Q2.B.y + 35} fill={givenColor} fontSize="12">Given: &angle;ADB &cong; &angle;CDB</text>

              {/* Shared Side (Reflexive) */}
              <line x1={Q2.B.x} y1={Q2.B.y} x2={Q2.D.x} y2={Q2.D.y} stroke={highlightColor} strokeWidth="4" />
              <text x={210} y={110} fill={highlightColor} fontSize="12">Shared Side (Reflexive)</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function AsaSlide5() {
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
      id: 'asa-true-statements-quiz',
      conceptId: 'asa-true-statements',
      conceptName: 'ASA True Statements',
      type: 'judging',
      description: 'Testing using hidden properties to validate ASA statements'
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
      id: 'asa-true-q1-vertical',
      question: 'Given the diagram, is the statement $\triangle ABM \cong \triangle DCM$ true? (Note: The diagram shows $\triangle ABM$ and $\triangle DCM$, check the correspondence)',
      options: [
        "Yes, by ASA",
        "Yes, but by AAS",
        "No, we don't have enough information"
      ],
      correctAnswer: "Yes, but by AAS",
      explanation: "This is a tricky one! We are given $\angle A \cong \angle D$ (A), $AM \cong DM$ (S), and we know $\angle AMB \cong \angle DMC$ (A) from vertical angles. This is an A-A-S pattern, not A-S-A, because the side is NOT included between the angles."
    },
    {
      id: 'asa-true-q2-reflexive',
      question: 'Given: $\angle ABD \cong \angle CBD$ and $\angle ADB \cong \angle CDB$. Is the statement $\triangle ABD \cong \triangle CBD$ true?',
      options: [
        "Yes, by ASA",
        "Yes, but by SAS",
        "No, we don't have enough information"
      ],
      correctAnswer: "Yes, by ASA",
      explanation: "Correct! We are given $\angle ABD \cong \angle CBD$ (A). We are given $\angle ADB \cong \angle CDB$ (A). The side *between* these two angles is $BD$. By the Reflexive Property, $BD \cong BD$ (S). This gives us a perfect ASA pattern."
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
      interactionId: `asa-true-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'asa-true-statements',
      conceptName: 'ASA True Statements',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Finding "Hidden" Information</h2>
            <p className="text-lg leading-relaxed">
              In proofs, you are rarely given all the information at once. You often need to use your geometry knowledge to find "hidden" congruent parts.
            </p>
          </div>

          {/* --- CARD 2 (Hidden Parts) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Common "Givens" That Aren't Written</h3>
            <p className="text-lg leading-relaxed">
              Look for these patterns in diagrams:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-1 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Vertical Angles:</strong> Angles opposite at an intersection are congruent. This gives you a free <strong>(A)</strong>.
              </li>
              <li>
                <strong>Shared Side (Reflexive Property):</strong> If two triangles share a side, that side is congruent to itself. This gives you a free <strong>(S)</strong>.
              </li>
              <li>
                <strong>Parallel Lines:</strong> Look for alternate interior angles or corresponding angles. These give you a free <strong>(A)</strong>.
              </li>
            </ul>
          </div>

           {/* --- CARD 3 (Steps) --- */}
           <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">How to Check a Statement</h3>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">1.</span>
                <span>Mark all the <strong>written givens</strong> on the diagram.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">2.</span>
                <span>Mark all the <strong>hidden givens</strong> (vertical angles, shared sides).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">3.</span>
                <span>See if the marked parts match the <strong>ASA pattern</strong> (is the side *included*?).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">4.</span>
                <span>If it's ASA, check if the <strong>correspondence</strong> (the letter order) in the statement is correct.</span>
              </li>
            </ul>
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
      slideId="asa-true-statements"
      slideTitle="Identifying True Statements Using the ASA Criterion"
      moduleId="congruence"
      submoduleId="asa-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}