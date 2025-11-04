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
  const highlightAltColor = isDarkMode ? '#F87171' : '#EF4444'; // Red

  // --- Figure 1: Clear ASA ---
  const T1_Q1 = { A: { x: 80, y: 50 }, B: { x: 30, y: 180 }, C: { x: 180, y: 180 } };
  const T2_Q1 = { D: { x: 320, y: 50 }, E: { x: 270, y: 180 }, F: { x: 420, y: 180 } };

  // --- Figure 2: AAS (the "trap") ---
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
              
              {/* Markings for Q1 (ASA) */}
              {/* Angle B & E */}
              <path d={`M ${T1_Q1.B.x + 20} ${T1_Q1.B.y} A 20 20 0 0 0 ${T1_Q1.B.x + 15.45} ${T1_Q1.B.y - 12.85}`} stroke={highlightColor} {...commonProps} />
              <path d={`M ${T2_Q1.E.x + 20} ${T2_Q1.E.y} A 20 20 0 0 0 ${T2_Q1.E.x + 15.45} ${T2_Q1.E.y - 12.85}`} stroke={highlightColor} {...commonProps} />
              {/* Side BC & EF (Included) */}
              <line x1={T1_Q1.B.x} y1={T1_Q1.B.y} x2={T1_Q1.C.x} y2={T1_Q1.C.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={T2_Q1.E.x} y1={T2_Q1.E.y} x2={T2_Q1.F.x} y2={T2_Q1.F.y} stroke={highlightColor} strokeWidth="4" />
              {/* Angle C & F */}
              <path d={`M ${T1_Q1.C.x - 20} ${T1_Q1.C.y} A 20 20 0 0 1 ${T1_Q1.C.x - 15.45} ${T1_Q1.C.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
              <path d={`M ${T2_Q1.F.x - 20} ${T2_Q1.F.y} A 20 20 0 0 1 ${T2_Q1.F.x - 15.45} ${T2_Q1.F.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
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
              
              {/* Markings for Q2 (AAS Trap) */}
              {/* Angle B & E */}
              <path d={`M ${T1_Q2.B.x + 20} ${T1_Q2.B.y} A 20 20 0 0 0 ${T1_Q2.B.x + 15.45} ${T1_Q2.B.y - 12.85}`} stroke={highlightColor} {...commonProps} />
              <path d={`M ${T2_Q2.E.x + 20} ${T2_Q2.E.y} A 20 20 0 0 0 ${T2_Q2.E.x + 15.45} ${T2_Q2.E.y - 12.85}`} stroke={highlightColor} {...commonProps} />
              {/* Angle C & F */}
              <path d={`M ${T1_Q2.C.x - 20} ${T1_Q2.C.y} A 20 20 0 0 1 ${T1_Q2.C.x - 15.45} ${T1_Q2.C.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
              <path d={`M ${T2_Q2.F.x - 20} ${T2_Q2.F.y} A 20 20 0 0 1 ${T2_Q2.F.x - 15.45} ${T2_Q2.F.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
              {/* Side AB & DE (NOT Included) */}
              <line x1={T1_Q2.A.x} y1={T1_Q2.A.y} x2={T1_Q2.B.x} y2={T1_Q2.B.y} stroke={highlightAltColor} strokeWidth="4" />
              <line x1={T2_Q2.D.x} y1={T2_Q2.D.y} x2={T2_Q2.E.x} y2={T2_Q2.E.y} stroke={highlightAltColor} strokeWidth="4" />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function AsaSlide2() {
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
      id: 'asa-identification-quiz',
      conceptId: 'asa-criterion-identification',
      conceptName: 'ASA Criterion Identification',
      type: 'judging',
      description: 'Testing ability to identify ASA vs. non-ASA cases'
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
      id: 'asa-id-q1-correct',
      question: 'Look at the figure. Can we prove these triangles are congruent using the ASA criterion?',
      options: [
        "Yes, this is a perfect example of ASA.",
        "No, the side is not included.",
        "No, this shows the SSS criterion."
      ],
      correctAnswer: "Yes, this is a perfect example of ASA.",
      explanation: "Correct! The congruent side is *between* the two congruent angles ($\angle B$ and $\angle C$). This is exactly what ASA requires."
    },
    {
      id: 'asa-id-q2-trap',
      question: 'Now look at this figure. Can we prove these triangles are congruent using the ASA criterion?',
      options: [
        "Yes, this is also ASA.",
        "No, the side shown is not included.",
        "No, this shows the SAS criterion."
      ],
      correctAnswer: "No, the side shown is not included.",
      explanation: "Correct! The side is *not* between the two marked angles. This is a different pattern (which we'll soon learn is AAS). It is NOT ASA."
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
      interactionId: `asa-id-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'asa-criterion-identification',
      conceptName: 'ASA Criterion Identification',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The ASA Identification Checklist</h2>
            <p className="text-lg leading-relaxed">
              When you're given a diagram, how do you know if you can use ASA? You must find **three specific things**:
            </p>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">1.</span>
                <span>A pair of congruent <strong>Angles</strong> (A).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">2.</span>
                <span>A *second* pair of congruent <strong>Angles</strong> (A).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">3.</span>
                <span>The <strong>Included Side</strong> (S) that connects those two angles must also be congruent.</span>
              </li>
            </ul>
          </div>

          {/* --- CARD 2 (The Trap) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Common Mistake: The "AAS" Trap</h3>
            <p className="text-lg leading-relaxed">
              The most common mistake is finding two angles and a side that is <strong>NOT</strong> included.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                <strong>If the side is not locked between the angles, it is NOT ASA.</strong>
              </p>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              Look at the practice quiz. The first example shows true ASA. The second example shows this common "AAS trap." (We'll learn more about AAS in the next submodule).
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Identification Practice</h3>
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
                <div className="text-3xl mb-4">🧐</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Great job spotting the difference!" : 'Good practice!'}
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
      slideId="asa-identifying-triangles"
      slideTitle="Identifying Congruent Triangles Using ASA"
      moduleId="congruence"
      submoduleId="asa-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}