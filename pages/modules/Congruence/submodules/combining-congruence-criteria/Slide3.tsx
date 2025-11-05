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
  const markColor = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const hiddenMarkColor = isDarkMode ? '#4ADE80' : '#22C55E'; // Green

  const commonProps = {
    fill: 'none',
    strokeWidth: 2,
    stroke: markColor,
  };

  // --- Figure 1: Vertical Angles (ASA) ---
  const T1_Q1 = { A: { x: 30, y: 50 }, M: { x: 150, y: 110 }, B: { x: 30, y: 170 } };
  const T2_Q1 = { D: { x: 370, y: 50 }, M: { x: 250, y: 110 }, C: { x: 370, y: 170 } };

  // --- Figure 2: Vertical Angles (AAS) ---
  const T1_Q2 = { A: { x: 30, y: 50 }, M: { x: 150, y: 110 }, B: { x: 30, y: 170 } };
  const T2_Q2 = { D: { x: 370, y: 50 }, M: { x: 250, y: 110 }, C: { x: 370, y: 170 } };

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
              {/* --- FIX: Removed conflicting stroke attributes --- */}
              <path d={`M ${T1_Q1.A.x} ${T1_Q1.A.y} L ${T1_Q1.M.x} ${T1_Q1.M.y} L ${T1_Q1.B.x} ${T1_Q1.B.y} Z`} stroke="none" fill="none" />
              <path d={`M ${T2_Q1.D.x} ${T2_Q1.D.y} L ${T2_Q1.M.x} ${T2_Q1.M.y} L ${T2_Q1.C.x} ${T2_Q1.C.y} Z`} stroke="none" fill="none" />
              <line x1={T1_Q1.A.x} y1={T1_Q1.A.y} x2={T2_Q1.C.x} y2={T2_Q1.C.y} stroke={strokeColor} />
              <line x1={T1_Q1.B.x} y1={T1_Q1.B.y} x2={T2_Q1.D.x} y2={T2_Q1.D.y} stroke={strokeColor} />
              
              {/* ASA Markings */}
              {/* A (Given) */}
              <path d={`M ${T1_Q1.A.x + 20} ${T1_Q1.A.y} A 20 20 0 0 1 ${T1_Q1.A.x + 12} ${T1_Q1.A.y + 16}`} {...commonProps} />
              <path d={`M ${T2_Q1.C.x - 20} ${T2_Q1.C.y} A 20 20 0 0 0 ${T2_Q1.C.x - 12} ${T2_Q1.C.y - 16}`} {...commonProps} />
              <text x={30} y={40} fill={markColor} fontSize="12">{"Given: $\angle A \cong \angle C$"}</text>
              
              {/* S (Given) */}
              <line x1={T1_Q1.A.x} y1={T1_Q1.A.y} x2={T1_Q1.M.x} y2={T1_Q1.M.y} {...commonProps} strokeWidth="4" />
              <line x1={T2_Q1.C.x} y1={T2_Q1.C.y} x2={T2_Q1.M.x} y2={T2_Q1.M.y} {...commonProps} strokeWidth="4" />
              <text x={90} y={70} fill={markColor} fontSize="12">{"Given: AM $\cong$ CM"}</text>

              {/* A (Hidden - Vertical) */}
              <path d={`M ${T1_Q1.M.x - 17} ${T1_Q1.M.y - 10} A 20 20 0 0 0 ${T1_Q1.M.x} ${T1_Q1.M.y - 20}`} {...commonProps} stroke={hiddenMarkColor} strokeDasharray="5 5" />
              <path d={`M ${T2_Q1.M.x + 17} ${T2_Q1.M.y + 10} A 20 20 0 0 0 ${T2_Q1.M.x} ${T2_Q1.M.y + 20}`} {...commonProps} stroke={hiddenMarkColor} strokeDasharray="5 5" />
              <text x={160} y={140} fill={hiddenMarkColor} fontSize="12">Vertical Angles</text>
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
              {/* --- FIX: Removed conflicting stroke attributes --- */}
              <path d={`M ${T1_Q2.A.x} ${T1_Q2.A.y} L ${T1_Q2.M.x} ${T1_Q2.M.y} L ${T1_Q2.B.x} ${T1_Q2.B.y} Z`} stroke="none" fill="none" />
              <path d={`M ${T2_Q2.D.x} ${T2_Q2.D.y} L ${T2_Q2.M.x} ${T2_Q2.M.y} L ${T2_Q2.C.x} ${T2_Q2.C.y} Z`} stroke="none" fill="none" />
              <line x1={T1_Q2.A.x} y1={T1_Q2.A.y} x2={T2_Q2.C.x} y2={T2_Q2.C.y} stroke={strokeColor} />
              <line x1={T1_Q2.B.x} y1={T1_Q2.B.y} x2={T2_Q2.D.x} y2={T2_Q2.D.y} stroke={strokeColor} />
              
              {/* AAS Markings */}
              {/* A (Given) */}
              <path d={`M ${T1_Q2.A.x + 20} ${T1_Q2.A.y} A 20 20 0 0 1 ${T1_Q2.A.x + 12} ${T1_Q2.A.y + 16}`} {...commonProps} />
              <path d={`M ${T2_Q2.C.x - 20} ${T2_Q2.C.y} A 20 20 0 0 0 ${T2_Q2.C.x - 12} ${T2_Q2.C.y - 16}`} {...commonProps} />
              <text x={30} y={40} fill={markColor} fontSize="12">{"Given: $\angle A \cong \angle C$"}</text>

              {/* A (Hidden - Vertical) */}
              <path d={`M ${T1_Q2.M.x - 17} ${T1_Q2.M.y - 10} A 20 20 0 0 0 ${T1_Q2.M.x} ${T1_Q2.M.y - 20}`} {...commonProps} stroke={hiddenMarkColor} strokeDasharray="5 5" />
              <path d={`M ${T2_Q2.M.x + 17} ${T2_Q2.M.y + 10} A 20 20 0 0 0 ${T2_Q2.M.x} ${T2_Q2.M.y + 20}`} {...commonProps} stroke={hiddenMarkColor} strokeDasharray="5 5" />
              <text x={160} y={140} fill={hiddenMarkColor} fontSize="12">Vertical Angles</text>
              
              {/* S (Given - Non-included) */}
              <line x1={T1_Q2.B.x} y1={T1_Q2.B.y} x2={T1_Q2.M.x} y2={T1_Q2.M.y} {...commonProps} strokeWidth="4" />
              <line x1={T2_Q2.D.x} y1={T2_Q2.D.y} x2={T2_Q2.M.x} y2={T2_Q2.M.y} {...commonProps} strokeWidth="4" />
              <text x={30} y={190} fill={markColor} fontSize="12">{"Given: BM $\cong$ DM"}</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function CombiningSlide3() {
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
      id: 'combining-vertical-quiz',
      conceptId: 'combining-criteria-vertical',
      conceptName: 'Combining Criteria Vertical Angles',
      type: 'judging',
      description: 'Testing identification of criteria using vertical angles'
    }
  ];
  
  const allOptions = ["SSS", "SAS", "ASA", "AAS", "HL", "Not Enough Information"];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  const questions: QuizQuestion[] = [
    {
      id: 'combining-vertical-q1',
      question: 'Given $\angle A \cong \angle C$ and $AM \cong CM$. Which criterion proves $\triangle ABM \cong \triangle CDM$?',
      options: allOptions,
      correctAnswer: "ASA",
      explanation: "Correct! We are given $\angle A \cong \angle C$ (A) and $AM \cong CM$ (S). The *hidden* clue is that $\angle AMB \cong \angle CMD$ are vertical angles (A). The side $AM$ is *included* between $\angle A$ and $\angle AMB$. This is a perfect ASA pattern."
    },
    {
      id: 'combining-vertical-q2',
      question: 'Given $\angle A \cong \angle C$ and $BM \cong DM$. Which criterion proves $\triangle ABM \cong \triangle CDM$?',
      options: allOptions,
      correctAnswer: "AAS",
      explanation: "Correct! We are given $\angle A \cong \angle C$ (A). The *hidden* clue is $\angle AMB \cong \angle CMD$ (A) from vertical angles. We are also given $BM \cong DM$ (S). The side $BM$ is *not* included between $\angle A$ and $\angle AMB$. This is an Angle-Angle-Side (AAS) pattern."
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
      interactionId: `combining-vertical-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'combining-criteria-vertical',
      conceptName: 'Combining Criteria Vertical Angles',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Hidden Clue: Vertical Angles</h2>
            <p className="text-lg leading-relaxed">
              One of the most common "hidden" clues in geometry is **Vertical Angles**.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              When two lines intersect, the angles opposite each other are called vertical angles, and they are **always congruent**.
            </p>
          </div>

          {/* --- CARD 2 (The Strategy) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">How to Use This Clue</h3>
            <p className="text-lg leading-relaxed">
              When you see two triangles that meet at a single point, immediately look for vertical angles.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                This gives you a free pair of congruent <strong>Angles (A)</strong> to use in your proof, often for <strong>ASA</strong> or <strong>AAS</strong>.
              </p>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              Look at the quiz. Both examples use vertical angles, but they lead to *different* criteria based on which side is given.
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Find the Vertical Angle</h3>
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
                <div className="text-3xl mb-4">{"<-->"}</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered spotting vertical angles!" : 'Great job!'}
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
      slideId="combining-vertical-angles"
      slideTitle="Cases With Vertical Angles"
      moduleId="congruence"
      submoduleId="combining-congruence-criteria"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}