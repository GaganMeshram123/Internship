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
  const rightAngleColor = isDarkMode ? '#F87171' : '#EF4444'; // Red
  const questionColor = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue

  // Triangle 1 (Left) - Right triangle
  const T1 = { A: { x: 150, y: 50 }, B: { x: 50, y: 180 }, C: { x: 150, y: 180 } };
  // Triangle 2 (Right) - Right triangle
  const T2 = { D: { x: 350, y: 50 }, E: { x: 250, y: 180 }, F: { x: 350, y: 180 } };

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
              <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
              <path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} {...commonProps} />
              
              {/* Right Angle Markers */}
              <path d={`M ${T1.C.x - 15} ${T1.C.y} L ${T1.C.x - 15} ${T1.C.y - 15} L ${T1.C.x} ${T1.C.y - 15}`} stroke={rightAngleColor} {...commonProps} />
              <path d={`M ${T2.F.x - 15} ${T2.F.y} L ${T2.F.x - 15} ${T2.F.y - 15} L ${T2.F.x} ${T2.F.y - 15}`} stroke={rightAngleColor} {...commonProps} />
              
              {/* HL Markings */}
              <line x1={T1.A.x} y1={T1.A.y} x2={T1.B.x} y2={T1.B.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={T2.D.x} y1={T2.D.y} x2={T2.E.x} y2={T2.E.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={T1.A.x} y1={T1.A.y} x2={T1.C.x} y2={T1.C.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
              <line x1={T2.D.x} y1={T2.D.y} x2={T2.F.x} y2={T2.F.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />

              {/* Question Parts */}
              <text x={T1.B.x - 20} y={T1.B.y - 20} fill={questionColor} fontSize="14" fontWeight="bold">x</text>
              <path d={`M ${T1.B.x + 20} ${T1.B.y} A 20 20 0 0 0 ${T1.B.x + 10} ${T1.B.y - 17}`} stroke={questionColor} {...commonProps} />
              
              <text x={T2.E.x - 20} y={T2.E.y - 20} fill={strokeColor} fontSize="14">40°</text>
              <path d={`M ${T2.E.x + 20} ${T2.E.y} A 20 20 0 0 0 ${T2.E.x + 10} ${T2.E.y - 17}`} stroke={strokeColor} {...commonProps} />
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
              <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
              <path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} {...commonProps} />
              
              {/* Right Angle Markers */}
              <path d={`M ${T1.C.x - 15} ${T1.C.y} L ${T1.C.x - 15} ${T1.C.y - 15} L ${T1.C.x} ${T1.C.y - 15}`} stroke={rightAngleColor} {...commonProps} />
              <path d={`M ${T2.F.x - 15} ${T2.F.y} L ${T2.F.x - 15} ${T2.F.y - 15} L ${T2.F.x} ${T2.F.y - 15}`} stroke={rightAngleColor} {...commonProps} />
              
              {/* HL Markings */}
              <line x1={T1.A.x} y1={T1.A.y} x2={T1.B.x} y2={T1.B.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={T2.D.x} y1={T2.D.y} x2={T2.E.x} y2={T2.E.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={T1.B.x} y1={T1.B.y} x2={T1.C.x} y2={T1.C.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
              <line x1={T2.E.x} y1={T2.E.y} x2={T2.F.x} y2={T2.F.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />

              {/* Question Parts */}
              <text x={T1.A.x - 10} y={T1.A.y - 10} fill={questionColor} fontSize="14" fontWeight="bold">(8x - 6)°</text>
              <text x={T2.D.x - 10} y={T2.D.y - 10} fill={strokeColor} fontSize="14">50°</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function HlSlide3() {
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
      id: 'hl-finding-angles-quiz',
      conceptId: 'hl-finding-angles',
      conceptName: 'HL Finding Angles',
      type: 'judging',
      description: 'Testing using HL and CPCTC to find unknown angles'
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
      id: 'hl-find-angle-q1',
      question: 'The triangles are congruent by HL. What is the measure of the angle marked x?',
      options: [
        "40°",
        "50°",
        "90°",
        "Cannot be determined"
      ],
      correctAnswer: "40°",
      explanation: "Correct! The triangles are congruent by HL. By CPCTC, all corresponding parts are congruent. $\angle B$ corresponds to $\angle E$. Since $m\angle E = 40°$, then $x$ must also be 40°."
    },
    {
      id: 'hl-find-angle-q2',
      question: 'The triangles are congruent by HL. What is the value of x?',
      options: [
        "x = 7",
        "x = 8",
        "x = 5.5",
        "x = 50"
      ],
      correctAnswer: "x = 7",
      explanation: "Correct! The triangles are congruent by HL ($\triangle ABC \cong \triangle DEF$). By CPCTC, $\angle A \cong \angle D$. Set up the equation: $8x - 6 = 50$. Add 6 to both sides: $8x = 56$. Divide by 8: $x = 7$."
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
      interactionId: `hl-find-angle-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'hl-finding-angles',
      conceptName: 'HL Finding Angles',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Using HL to Find Angles</h2>
            <p className="text-lg leading-relaxed">
              Once you have proven two right triangles are congruent using HL, you can find *any* other missing part.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              This is where <strong>CPCTC</strong> comes in:
            </p>
            <p className="text-lg leading-relaxed mt-4 font-semibold text-blue-600 dark:text-blue-400">
              <strong>C</strong>orresponding
              <strong>P</strong>arts of
              <strong>C</strong>ongruent
              <strong>T</strong>riangles are
              <strong>C</strong>ongruent.
            </p>
          </div>

          {/* --- CARD 2 (The Steps) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The 3-Step Process</h3>
            <p className="text-lg leading-relaxed">
              To find a missing angle using HL, you follow this logic:
            </p>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">1. Prove Congruence:</span>
                <span>Confirm the triangles are congruent by <strong>HL</strong>. (Check for Right Angle, Hypotenuse, Leg).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">2. Use CPCTC:</span>
                <span>Identify the <strong>corresponding angle</strong> you need to find.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">3. Solve:</span>
                <span>Set the corresponding angles equal. This might give you the answer (like 40°) or an equation to solve (like $8x - 6 = 50$).</span>
              </li>
            </ul>
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
                  {score === questions.length ? "You're a CPCTC expert!" : 'Great work!'}
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
      slideId="hl-finding-angles"
      slideTitle="Calculating the Measure of an Angle Using the HL Criterion"
      moduleId="congruence"
      submoduleId="hl-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}