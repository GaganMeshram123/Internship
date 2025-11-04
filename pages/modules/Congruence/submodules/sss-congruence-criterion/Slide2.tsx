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

  // --- Figure 1: Clear SSS ---
  const T1_Q1 = { A: { x: 80, y: 50 }, B: { x: 30, y: 180 }, C: { x: 180, y: 180 } };
  const T2_Q1 = { D: { x: 320, y: 50 }, E: { x: 270, y: 180 }, F: { x: 420, y: 180 } };

  // --- Figure 2: Shared Side (Reflexive) ---
  const Q2 = { A: { x: 50, y: 40 }, B: { x: 200, y: 110 }, C: { x: 50, y: 180 } };
  const Q2T2 = { D: { x: 350, y: 40 }, B: { x: 200, y: 110 }, C: { x: 350, y: 180 } };

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
              
              {/* SSS Markings */}
              <line x1={T1_Q1.A.x} y1={T1_Q1.A.y} x2={T1_Q1.B.x} y2={T1_Q1.B.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={T2_Q1.D.x} y1={T2_Q1.D.y} x2={T2_Q1.E.x} y2={T2_Q1.E.y} stroke={highlightColor} strokeWidth="4" />
              
              <line x1={T1_Q1.B.x} y1={T1_Q1.B.y} x2={T1_Q1.C.x} y2={T1_Q1.C.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
              <line x1={T2_Q1.E.x} y1={T2_Q1.E.y} x2={T2_Q1.F.x} y2={T2_Q1.F.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />

              <line x1={T1_Q1.A.x} y1={T1_Q1.A.y} x2={T1_Q1.C.x} y2={T1_Q1.C.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="1 5" />
              <line x1={T2_Q1.D.x} y1={T2_Q1.D.y} x2={T2_Q1.F.x} y2={T2_Q1.F.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="1 5" />
            </motion.g>
          )}

          {questionIndex === 1 && (
            <motion.g
              key="q2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Triangles with shared side */}
              <path d={`M ${Q2.A.x} ${Q2.A.y} L ${Q2.B.x} ${Q2.B.y} L ${Q2.C.x} ${Q2.C.y} Z`} stroke={strokeColor} {...commonProps} />
              <path d={`M ${Q2T2.D.x} ${Q2T2.D.y} L ${Q2.B.x} ${Q2.B.y} L ${Q2T2.C.x} ${Q2T2.C.y} Z`} stroke={strokeColor} {...commonProps} />
              
              {/* Given Markings */}
              <line x1={Q2.A.x} y1={Q2.A.y} x2={Q2.B.x} y2={Q2.B.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={Q2T2.D.x} y1={Q2T2.D.y} x2={Q2.B.x} y2={Q2.B.y} stroke={highlightColor} strokeWidth="4" />
              <text x={125} y={65} fill={highlightColor} fontSize="12">Given: AB &cong; DB</text>

              <line x1={Q2.C.x} y1={Q2.C.y} x2={Q2.B.x} y2={Q2.B.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
              <line x1={Q2T2.C.x} y1={Q2T2.C.y} x2={Q2.B.x} y2={Q2.B.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
              <text x={125} y={165} fill={highlightColor} fontSize="12">Given: CB &cong; EB</text>

              {/* Shared Side (The 3rd S) */}
              <text x={205} y={115} fill={highlightColor} fontSize="12" fontWeight="bold">BC &cong; BC (Reflexive)</text>
              <text x={205} y={130} fill={highlightColor} fontSize="12" fontWeight="bold">(This is not the setup)</text>
              
              {/* Correction: Shared Side is not BC, it's the figure's shared side. Let's redraw. */}
              {/* Redrawing for shared side BC */}
              <g>
                <path d="M 50 40 L 200 110 L 50 180 Z" stroke={strokeColor} {...commonProps} />
                <path d="M 350 40 L 200 110 L 350 180 Z" stroke={strokeColor} {...commonProps} />
                {/* Labels */}
                <text x="40" y="35" fill={strokeColor}>A</text>
                <text x="200" y="100" fill={strokeColor}>B</text>
                <text x="40" y="185" fill={strokeColor}>C</text>
                <text x="360" y="35" fill={strokeColor}>D</text>
                <text x="360" y="185" fill={strokeColor}>E</text>

                {/* Given: AB cong DB */}
                <line x1="50" y1="40" x2="200" y2="110" stroke={highlightColor} strokeWidth="4" />
                <line x1="350" y1="40" x2="200" y2="110" stroke={highlightColor} strokeWidth="4" />
                
                {/* Given: AC cong DC (Let's change the question) */}
                {/* Let's redo Q2 figure to be $\triangle ABC$ and $\triangle ADC$ sharing side AC */}
                <path d="M 50 110 L 200 40 L 350 110 Z" stroke={strokeColor} {...commonProps} />
                <path d="M 50 110 L 200 180 L 350 110 Z" stroke={strokeColor} {...commonProps} />
                <text x="40" y="115" fill={strokeColor}>A</text>
                <text x="200" y="30" fill={strokeColor}>B</text>
                <text x="360" y="115" fill={strokeColor}>C</text>
                <text x="200" y="190" fill={strokeColor}>D</text>
                
                {/* Given: AB cong AD */}
                <line x1="50" y1="110" x2="200" y2="40" stroke={highlightColor} strokeWidth="4" />
                <line x1="50" y1="110" x2="200" y2="180" stroke={highlightColor} strokeWidth="4" />
                <text x="125" y="65" fill={highlightColor} fontSize="12">Given: AB &cong; AD</text>

                {/* Given: CB cong CD */}
                <line x1="350" y1="110" x2="200" y2="40" stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
                <line x1="350" y1="110" x2="200" y2="180" stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
                <text x="275" y="65" fill={highlightColor} fontSize="12">Given: CB &cong; CD</text>
                
                {/* Shared Side AC */}
                <line x1="50" y1="110" x2="350" y2="110" stroke={highlightColor} strokeWidth="4" strokeDasharray="1 5" />
                <text x="180" y="125" fill={highlightColor} fontSize="12">Shared: AC &cong; AC</text>
              </g>

            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function SssSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
  const [score, setScore] =useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'sss-identification-quiz',
      conceptId: 'sss-criterion-identification',
      conceptName: 'SSS Criterion Identification',
      type: 'judging',
      description: 'Testing ability to identify SSS'
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
      id: 'sss-id-q1-correct',
      question: 'Look at the figure. We are given that all three corresponding sides are congruent. Is this enough to prove congruence?',
      options: [
        "Yes, by SSS",
        "No, we need to know at least one angle",
        "No, this is the SSA trap"
      ],
      correctAnswer: "Yes, by SSS",
      explanation: "Correct! If all three corresponding sides are congruent, the SSS criterion guarantees the triangles are congruent. We don't need any angle information."
    },
    {
      id: 'sss-id-q2-reflexive',
      question: 'In this figure, given $AB \cong AD$ and $CB \cong CD$. Can we prove $\triangle ABC \cong \triangle ADC$?',
      options: [
        "Yes, by SSS",
        "Yes, by SAS",
        "No, not enough information"
      ],
      correctAnswer: "Yes, by SSS",
      explanation: "Correct! We are given two pairs of congruent sides. The third side, $AC$, is *shared* by both triangles. By the Reflexive Property, $AC \cong AC$. This gives us our third 'S', so the triangles are congruent by SSS."
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
      interactionId: `sss-id-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sss-criterion-identification',
      conceptName: 'SSS Criterion Identification',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The SSS Identification Checklist</h2>
            <p className="text-lg leading-relaxed">
              To use SSS, your checklist is simple. You must find **three** pairs of congruent corresponding sides:
            </p>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">1.</span>
                <span>A pair of congruent <strong>Sides</strong> (S).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">2.</span>
                <span>A *second* pair of congruent <strong>Sides</strong> (S).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">3.</span>
                <span>A *third* pair of congruent <strong>Sides</strong> (S).</span>
              </li>
            </ul>
          </div>

          {/* --- CARD 2 (The Reflexive Property) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">"Hidden" Side: The Shared Side</h3>
            <p className="text-lg leading-relaxed">
              Very often, you will only be *given* two pairs of congruent sides.
            </p>
            <p className="text-lg leading-relaxed mt-3">
              Look for a <strong>shared side</strong>! If two triangles share a side, that side is congruent to itself. This is called the <strong>Reflexive Property</strong>.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                This "hidden" side is the third <strong>(S)</strong> you need to use SSS. You can see this in the second quiz question.
              </p>
            </div>
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
                <div className="text-3xl mb-4">🧐</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Great job spotting the shared side!" : 'Good practice!'}
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
      slideId="sss-identifying-triangles"
      slideTitle="Identifying Congruent Triangles Using the SSS Criterion"
      moduleId="congruence"
      submoduleId="sss-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}