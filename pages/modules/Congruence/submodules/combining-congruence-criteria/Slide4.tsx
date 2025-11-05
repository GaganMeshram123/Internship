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

  // --- Figure 1: Shared Side (SAS) ---
  const Q1 = { A: { x: 50, y: 110 }, B: { x: 200, y: 40 }, C: { x: 350, y: 110 }, D: { x: 200, y: 180 } };

  // --- Figure 2: Shared Side (SSS) ---
  const Q2 = { A: { x: 50, y: 110 }, B: { x: 200, y: 40 }, C: { x: 350, y: 110 }, D: { x: 200, y: 180 } };


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
              {/* Kite with diagonal BD */}
              {/* --- FIX: Removed conflicting stroke attributes --- */}
              <path d={`M ${Q1.A.x} ${Q1.A.y} L ${Q1.B.x} ${Q1.B.y} L ${Q1.D.x} ${Q1.D.y} Z`} stroke={strokeColor} fill="none" />
              <path d={`M ${Q1.C.x} ${Q1.C.y} L ${Q1.B.x} ${Q1.B.y} L ${Q1.D.x} ${Q1.D.y} Z`} stroke={strokeColor} fill="none" />
              <path d={`M ${Q1.A.x} ${Q1.A.y} L ${Q1.B.x} ${Q1.B.y} L ${Q1.C.x} ${Q1.C.y} L ${Q1.D.x} ${Q1.D.y} Z`} stroke={strokeColor} fill="none" />
              <line x1={Q1.B.x} y1={Q1.B.y} x2={Q1.D.x} y2={Q1.D.y} stroke={strokeColor} />

              {/* SAS Markings */}
              {/* S (Given) */}
              <line x1={Q1.A.x} y1={Q1.A.y} x2={Q1.B.x} y2={Q1.B.y} {...commonProps} strokeWidth="4" />
              <line x1={Q1.C.x} y1={Q1.C.y} x2={Q1.B.x} y2={Q1.B.y} {...commonProps} strokeWidth="4" />
              <text x={125} y={65} fill={markColor} fontSize="12">{"Given: $\overline{AB} \cong \overline{CB}$"}</text>
              
              {/* A (Given) */}
              <path d={`M ${Q1.B.x - 18} ${Q1.B.y + 10} A 20 20 0 0 1 ${Q1.B.x - 5} ${Q1.B.y + 19}`} {...commonProps} />
              <path d={`M ${Q1.B.x + 18} ${Q1.B.y + 10} A 20 20 0 0 0 ${Q1.B.x + 5} ${Q1.B.y + 19}`} {...commonProps} />
              <text x={210} y={65} fill={markColor} fontSize="12">{"Given: $\angle ABD \cong \angle CBD$"}</text>

              {/* S (Hidden - Shared) */}
              <line x1={Q1.B.x} y1={Q1.B.y} x2={Q1.D.x} y2={Q1.D.y} {...commonProps} stroke={hiddenMarkColor} strokeWidth="4" strokeDasharray="5 5" />
              <text x={210} y={115} fill={hiddenMarkColor} fontSize="12">Shared Side</text>
            </motion.g>
          )}

          {questionIndex === 1 && (
            <motion.g
              key="q2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Kite with diagonal AC */}
              <path d="M 50 110 L 200 40 L 350 110 Z" stroke={strokeColor} fill="none" />
              <path d="M 50 110 L 200 180 L 350 110 Z" stroke={strokeColor} fill="none" />
              <line x1="50" y1="110" x2="350" y2="110" stroke={strokeColor} />
              
              {/* SSS Markings */}
              {/* S (Given) */}
              <line x1="50" y1="110" x2="200" y2="40" {...commonProps} strokeWidth="4" />
              <line x1="50" y1="110" x2="200" y2="180" {...commonProps} strokeWidth="4" />
              {/* --- FIX: Fixed y-attribute and wrapped text --- */}
              <text x={125} y={65} fill={markColor} fontSize="12">{"Given: $\overline{AB} \cong \overline{AD}$"}</text>

              {/* S (Given) */}
              <line x1="350" y1="110" x2="200" y2="40" {...commonProps} strokeWidth="4" strokeDasharray="5 5" />
              <line x1="350" y1="110" x2="200" y2="180" {...commonProps} strokeWidth="4" strokeDasharray="5 5" />
              {/* --- FIX: Fixed y-attribute and wrapped text --- */}
              <text x={275} y={65} fill={markColor} fontSize="12">{"Given: $\overline{CB} \cong \overline{CD}$"}</text>
              
              {/* S (Hidden - Shared) */}
              <line x1="50" y1="110" x2="350" y2="110" {...commonProps} stroke={hiddenMarkColor} strokeWidth="4" strokeDasharray="1 5" />
              {/* --- FIX: Fixed y-attribute and wrapped text --- */}
              <text x={180} y={125} fill={hiddenMarkColor} fontSize="12">Shared Side</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function CombiningSlide4() {
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
      id: 'combining-common-side-quiz',
      conceptId: 'combining-criteria-common-side',
      conceptName: 'Combining Criteria Common Side',
      type: 'judging',
      description: 'Testing identification of criteria using a common side'
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
      id: 'combining-common-side-q1',
      question: 'Given $\overline{AB} \cong \overline{CB}$ and $\angle ABD \cong \angle CBD$. Which criterion proves $\triangle ABD \cong \triangle CBD$?',
      options: allOptions,
      correctAnswer: "SAS",
      explanation: "Correct! We are given $\overline{AB} \cong \overline{CB}$ (S) and $\angle ABD \cong \angle CBD$ (A). The *hidden* clue is the shared side $\overline{BD} \cong \overline{BD}$ (S). The angle $\angle ABD$ is *included* between sides $\overline{AB}$ and $\overline{BD}$. This is a perfect SAS pattern."
    },
    {
      id: 'combining-common-side-q2',
      question: 'Given $\overline{AB} \cong \overline{AD}$ and $\overline{CB} \cong \overline{CD}$. Which criterion proves $\triangle ABC \cong \triangle ADC$?',
      options: allOptions,
      correctAnswer: "SSS",
      explanation: "Correct! We are given $\overline{AB} \cong \overline{AD}$ (S) and $\overline{CB} \cong \overline{CD}$ (S). The *hidden* clue is the shared side $\overline{AC} \cong \overline{AC}$ (S). This gives us all three sides, a perfect SSS pattern."
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
      interactionId: `combining-common-side-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'combining-criteria-common-side',
      conceptName: 'Combining Criteria Common Side',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Hidden Clue: Common Sides</h2>
            <p className="text-lg leading-relaxed">
              The other most common "hidden" clue is a **Common Side** (or shared side).
            </p>
            {/* <p className="text-lg leading-relaxed mt-4">
              If two triangles share a side, that side is obviously the same length in both. This is formally called the **Reflexive Property** ($\overline{BD} \cong \overline{BD}$).
            </p> */}
          </div>

          {/* --- CARD 2 (The Strategy) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">How to Use This Clue</h3>
            <p className="text-lg leading-relaxed">
              When you see two triangles that share a side (often a diagonal in a polygon), you automatically get a free pair of congruent <strong>Sides (S)</strong>.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                This is the key to proving congruence by <strong>SSS</strong> (as in Q2) or <strong>SAS</strong> (as in Q1).
              </p>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              Look at the quiz. Both examples use a shared side, but they lead to *different* criteria based on the other given information.
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Find the Common Side</h3>
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
                <div className="text-3xl mb-4">🤝</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered the Reflexive Property!" : 'Great job!'}
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
      slideId="combining-common-sides"
      slideTitle="Cases With Common Sides"
      moduleId="congruence"
      submoduleId="combining-congruence-criteria"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}