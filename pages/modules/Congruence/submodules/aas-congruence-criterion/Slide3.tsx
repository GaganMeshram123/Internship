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
  const questionColor = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue

  // --- Figure 1: Find 'x' (straightforward) ---
  const T1_Q1 = { A: { x: 80, y: 50 }, B: { x: 30, y: 180 }, C: { x: 180, y: 180 } };
  const T2_Q1 = { D: { x: 320, y: 50 }, E: { x: 270, y: 180 }, F: { x: 420, y: 180 } };

  // --- Figure 2: Find 'x' (requires finding third angle) ---
  const T1_Q2 = { A: { x: 80, y: 50 }, B: { x: 30, y: 180 }, C: { x: 180, y: 180 } };
  const T2_Q2 = { D: { x: 320, y: 50 }, E: { x: 270, y: 180 }, F: { x: 420, y: 180 } };

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
              {/* Triangles */}
              <path d={`M ${T1_Q1.A.x} ${T1_Q1.A.y} L ${T1_Q1.B.x} ${T1_Q1.B.y} L ${T1_Q1.C.x} ${T1_Q1.C.y} Z`} stroke={strokeColor} {...commonProps} />
              <path d={`M ${T2_Q1.D.x} ${T2_Q1.D.y} L ${T2_Q1.E.x} ${T2_Q1.E.y} L ${T2_Q1.F.x} ${T2_Q1.F.y} Z`} stroke={strokeColor} {...commonProps} />
              
              {/* AAS Markings */}
              <path d={`M ${T1_Q1.A.x} ${T1_Q1.A.y + 20} A 20 20 0 0 1 ${T1_Q1.A.x + 19} ${T1_Q1.A.y + 6}`} stroke={highlightColor} {...commonProps} />
              <text x={T1_Q1.A.x + 5} y={T1_Q1.A.y - 10} fill={strokeColor} fontSize="14">65°</text>
              <path d={`M ${T2_Q1.D.x} ${T2_Q1.D.y + 20} A 20 20 0 0 1 ${T2_Q1.D.x + 19} ${T2_Q1.D.y + 6}`} stroke={highlightColor} {...commonProps} />
              
              <path d={`M ${T1_Q1.B.x + 20} ${T1_Q1.B.y} A 20 20 0 0 0 ${T1_Q1.B.x + 15.45} ${T1_Q1.B.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
              <text x={T1_Q1.B.x + 10} y={T1_Q1.B.y - 20} fill={strokeColor} fontSize="14">80°</text>
              <path d={`M ${T2_Q1.E.x + 20} ${T2_Q1.E.y} A 20 20 0 0 0 ${T2_Q1.E.x + 15.45} ${T2_Q1.E.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
              
              <line x1={T1_Q1.B.x} y1={T1_Q1.B.y} x2={T1_Q1.C.x} y2={T1_Q1.C.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={T2_Q1.E.x} y1={T2_Q1.E.y} x2={T2_Q1.F.x} y2={T2_Q1.F.y} stroke={highlightColor} strokeWidth="4" />

              {/* Question Parts */}
              <text x={T1_Q1.C.x - 30} y={T1_Q1.C.y - 20} fill={questionColor} fontSize="14" fontWeight="bold">x</text>
              <path d={`M ${T1_Q1.C.x - 20} ${T1_Q1.C.y} A 20 20 0 0 1 ${T1_Q1.C.x - 15.45} ${T1_Q1.C.y - 12.85}`} stroke={questionColor} {...commonProps} />
              
              <text x={T2_Q1.F.x - 30} y={T2_Q1.F.y - 20} fill={strokeColor} fontSize="14">35°</text>
              <path d={`M ${T2_Q1.F.x - 20} ${T2_Q1.F.y} A 20 20 0 0 1 ${T2_Q1.F.x - 15.45} ${T2_Q1.F.y - 12.85}`} stroke={strokeColor} {...commonProps} />
            </motion.g>
          )}

          {questionIndex === 1 && (
            <motion.g
              key="q2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Triangles */}
              <path d={`M ${T1_Q2.A.x} ${T1_Q2.A.y} L ${T1_Q2.B.x} ${T1_Q2.B.y} L ${T1_Q2.C.x} ${T1_Q2.C.y} Z`} stroke={strokeColor} {...commonProps} />
              <path d={`M ${T2_Q2.D.x} ${T2_Q2.D.y} L ${T2_Q2.E.x} ${T2_Q2.E.y} L ${T2_Q2.F.x} ${T2_Q2.F.y} Z`} stroke={strokeColor} {...commonProps} />
              
              {/* AAS Markings */}
              <path d={`M ${T1_Q2.A.x} ${T1_Q2.A.y + 20} A 20 20 0 0 1 ${T1_Q2.A.x + 19} ${T1_Q2.A.y + 6}`} stroke={highlightColor} {...commonProps} />
              <text x={T1_Q2.A.x + 5} y={T1_Q2.A.y - 10} fill={strokeColor} fontSize="14">100°</text>
              <path d={`M ${T2_Q2.D.x} ${T2_Q2.D.y + 20} A 20 20 0 0 1 ${T2_Q2.D.x + 19} ${T2_Q2.D.y + 6}`} stroke={highlightColor} {...commonProps} />
              
              <path d={`M ${T1_Q2.C.x - 20} ${T1_Q2.C.y} A 20 20 0 0 1 ${T1_Q2.C.x - 15.45} ${T1_Q2.C.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
              <text x={T1_Q2.C.x - 30} y={T1_Q2.C.y - 20} fill={strokeColor} fontSize="14">50°</text>
              <path d={`M ${T2_Q2.F.x - 20} ${T2_Q2.F.y} A 20 20 0 0 1 ${T2_Q2.F.x - 15.45} ${T2_Q2.F.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
              
              <line x1={T1_Q2.A.x} y1={T1_Q2.A.y} x2={T1_Q2.B.x} y2={T1_Q2.B.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={T2_Q2.D.x} y1={T2_Q2.D.y} x2={T2_Q2.E.x} y2={T2_Q2.E.y} stroke={highlightColor} strokeWidth="4" />

              {/* Question Parts */}
              <text x={T1_Q2.B.x + 10} y={T1_Q2.B.y - 20} fill={questionColor} fontSize="14" fontWeight="bold">x</text>
              <path d={`M ${T1_Q2.B.x + 20} ${T1_Q2.B.y} A 20 20 0 0 0 ${T1_Q2.B.x + 15.45} ${T1_Q2.B.y - 12.85}`} stroke={questionColor} {...commonProps} />
              
              <text x={T2_Q2.E.x + 10} y={T2_Q2.E.y - 20} fill={strokeColor} fontSize="14">30°</text>
              <path d={`M ${T2_Q2.E.x + 20} ${T2_Q2.E.y} A 20 20 0 0 0 ${T2_Q2.E.x + 15.45} ${T2_Q2.E.y - 12.85}`} stroke={strokeColor} {...commonProps} />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function AasSlide3() {
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
      id: 'aas-finding-angles-quiz',
      conceptId: 'aas-finding-angles',
      conceptName: 'AAS Finding Angles',
      type: 'judging',
      description: 'Testing using AAS and CPCTC to find unknown angles'
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
      id: 'aas-find-angle-q1',
      question: 'The triangles are congruent by AAS. What is the value of x?',
      options: [
        "35°",
        "65°",
        "80°",
        "Cannot be determined"
      ],
      correctAnswer: "35°",
      explanation: "Correct! The triangles are congruent by AAS ($\angle A \cong \angle D$, $\angle B \cong \angle E$, $BC \cong EF$). By CPCTC, the corresponding angles $\angle C$ and $\angle F$ must be congruent. Since $m\angle F = 35°$, then $x$ must also be 35°."
    },
    {
      id: 'aas-find-angle-q2',
      question: 'The triangles are congruent by AAS. What is the value of x?',
      options: [
        "30°",
        "50°",
        "100°",
        "Cannot be determined"
      ],
      correctAnswer: "30°",
      explanation: "Correct! The triangles are congruent by AAS ($\angle A \cong \angle D$, $\angle C \cong \angle F$, $AB \cong DE$). By CPCTC, the corresponding angles $\angle B$ and $\angle E$ must be congruent. Since $m\angle E = 30°$, then $x$ must also be 30°."
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
      interactionId: `aas-find-angle-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'aas-finding-angles',
      conceptName: 'AAS Finding Angles',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Finding Angles with AAS</h2>
            <p className="text-lg leading-relaxed">
              Just like with ASA, the main reason we use AAS is to prove triangles are congruent, which then allows us to find unknown measurements.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              The process is the same:
              <ol className="list-decimal list-inside ml-4 mt-2">
                <li>Prove congruence (using AAS).</li>
                <li>Use <strong>CPCTC</strong> to find the missing part.</li>
              </ol>
            </p>
          </div>

          {/* --- CARD 2 (CPCTC) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">A Note on the Third Angle</h3>
            <p className="text-lg leading-relaxed">
              In the first quiz question, we are given $\angle A$, $\angle B$, and side $BC$. We want to find $\angle C$.
            </p>
            <p className="text-lg leading-relaxed mt-3">
              We *could* find $\angle C$ using the <strong>Third Angle Theorem</strong> first:
              $m\angle C = 180° - 65° - 80° = 35°$.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                However, using <strong>CPCTC</strong> is often faster. If we know $\triangle ABC \cong \triangle DEF$, and $m\angle F = 35°$, then $m\angle C$ *must* be 35°.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Find the Missing Angle</h3>
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
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Perfectly done!" : 'Great work!'}
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
      slideId="aas-finding-angles"
      slideTitle="Finding the Measure of an Angle Using AAS"
      moduleId="congruence"
      submoduleId="aas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}