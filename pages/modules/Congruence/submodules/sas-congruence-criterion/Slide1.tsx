import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- SAS ANIMATION COMPONENT DEFINED INSIDE ---
const SasAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const highlightStroke = isDarkMode ? '#4ADE80' : '#22C55E'; // Green

  // Triangle 1 (Left)
  const T1 = { A: { x: 80, y: 50 }, B: { x: 30, y: 180 }, C: { x: 180, y: 180 } };
  // Triangle 2 (Right)
  const T2 = { D: { x: 320, y: 50 }, E: { x: 270, y: 180 }, F: { x: 420, y: 180 } };

  const commonProps = {
    fill: 'none',
    strokeWidth: 2,
  };

  const anim = {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: { delay: delay, duration: 0.5 }
    }),
  };

  const textAnim = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: delay, duration: 0.5 }
    }),
  };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* --- Triangles --- */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} strokeDasharray="4 4" {...commonProps} />
        <path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} strokeDasharray="4 4" {...commonProps} />

        {/* --- SAS Highlights --- */}

        {/* SIDE (AB and DE) */}
        <motion.line
          x1={T1.A.x} y1={T1.A.y} x2={T1.B.x} y2={T1.B.y}
          stroke={highlightStroke} strokeWidth="6" variants={anim} initial="hidden" animate="visible" custom={0.5}
        />
        <motion.line
          x1={T2.D.x} y1={T2.D.y} x2={T2.E.x} y2={T2.E.y}
          stroke={highlightStroke} strokeWidth="6" variants={anim} initial="hidden" animate="visible" custom={0.5}
        />
        <motion.text x={T1.A.x - 30} y={(T1.A.y + T1.B.y) / 2} fill={highlightStroke} fontSize="16" fontWeight="bold"
          variants={textAnim} initial="hidden" animate="visible" custom={0.7}>S</motion.text>
        <motion.text x={T2.D.x - 30} y={(T2.D.y + T2.E.y) / 2} fill={highlightStroke} fontSize="16" fontWeight="bold"
          variants={textAnim} initial="hidden" animate="visible" custom={0.7}>S</motion.text>

        {/* ANGLE (B and E) - INCLUDED */}
        <motion.path
          d={`M ${T1.B.x + 20} ${T1.B.y} A 20 20 0 0 0 ${T1.B.x + 15.45} ${T1.B.y - 12.85}`}
          stroke={highlightStroke} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={1.5}
        />
        <motion.path
          d={`M ${T2.E.x + 20} ${T2.E.y} A 20 20 0 0 0 ${T2.E.x + 15.45} ${T2.E.y - 12.85}`}
          stroke={highlightStroke} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={1.5}
        />
        <motion.text x={T1.B.x + 22} y={T1.B.y - 15} fill={highlightStroke} fontSize="16" fontWeight="bold"
          variants={textAnim} initial="hidden" animate="visible" custom={1.7}>A</motion.text>
        <motion.text x={T2.E.x + 22} y={T2.E.y - 15} fill={highlightStroke} fontSize="16" fontWeight="bold"
          variants={textAnim} initial="hidden" animate="visible" custom={1.7}>A</motion.text>
        
        {/* SIDE (BC and EF) */}
        <motion.line
          x1={T1.B.x} y1={T1.B.y} x2={T1.C.x} y2={T1.C.y}
          stroke={highlightStroke} strokeWidth="6" variants={anim} initial="hidden" animate="visible" custom={2.5}
        />
        <motion.line
          x1={T2.E.x} y1={T2.E.y} x2={T2.F.x} y2={T2.F.y}
          stroke={highlightStroke} strokeWidth="6" variants={anim} initial="hidden" animate="visible" custom={2.5}
        />
        <motion.text x={(T1.B.x + T1.C.x) / 2} y={T1.C.y + 20} fill={highlightStroke} fontSize="16" fontWeight="bold"
          variants={textAnim} initial="hidden" animate="visible" custom={2.7}>S</motion.text>
        <motion.text x={(T2.E.x + T2.F.x) / 2} y={T2.F.y + 20} fill={highlightStroke} fontSize="16" fontWeight="bold"
          variants={textAnim} initial="hidden" animate="visible" custom={2.7}>S</motion.text>

        {/* Congruence Statement */}
        <motion.text x={svgWidth / 2} y={svgHeight / 2 - 20} fill={highlightStroke} fontSize="18" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={3.5}>
          ∴ &triangle;ABC &cong; &triangle;DEF
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function SasSlide1() {
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
      id: 'sas-intro-quiz',
      conceptId: 'sas-criterion-intro',
      conceptName: 'SAS Criterion Introduction',
      type: 'judging',
      description: 'Testing understanding of the SAS criterion components'
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
      id: 'sas-intro-q1-meaning',
      question: 'In the "SAS" criterion, what is special about the angle "A"?',
      options: [
        "It's the largest angle",
        "It's the angle *between* the two sides",
        "It's the smallest angle (acute)",
        "It doesn't matter which angle it is"
      ],
      correctAnswer: "It's the angle *between* the two sides",
      explanation: "Correct! The 'A' in SAS stands for the *included* angle. It's the one 'locked' between the two sides. This is the most important part of SAS."
    },
    {
      id: 'sas-intro-q2-requirement',
      question: 'If you know $AB \cong DE$ and $BC \cong EF$, what *must* you also know to use SAS?',
      options: [
        "$\angle A \cong \angle D$",
        "$\angle C \cong \angle F$",
        "$\angle B \cong \angle E$",
        "$AC \cong DF$"
      ],
      correctAnswer: "$\angle B \cong \angle E$",
      explanation: "Exactly! The angle must be *included*. $\angle B$ is between sides $AB$ and $BC$. $\angle E$ is between sides $DE$ and $EF$. Therefore, you must know $\angle B \cong \angle E$."
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
      interactionId: `sas-intro-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sas-criterion-intro',
      conceptName: 'SAS Criterion Introduction',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The SAS Criterion</h2>
            <p className="text-lg leading-relaxed">
              SAS stands for <strong>Side-Angle-Side</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              It states: If two sides and the <strong>included angle</strong> of one triangle are congruent to the corresponding parts of another triangle, then the triangles are congruent.
            </p>
          </div>

          {/* --- CARD 2 (The Included Angle) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The "Included" Angle</h3>
            <p className="text-lg leading-relaxed">
              This is the <strong>most important rule</strong> for SAS.
            </p>
            <p className="text-lg leading-relaxed mt-3">
              The "included angle" is the angle formed at the vertex where the two sides <strong>meet</strong>.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Example:</h4>
              <ul className="list-disc list-inside mt-2 text-lg space-y-1 text-slate-700 dark:text-slate-300">
                <li>If you have <strong>Side $AB$</strong> and <strong>Side $BC$</strong>...</li>
                <li>...the included angle is <strong>$\angle B$</strong>, where they connect.</li>
              </ul>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900/30">
              <p className="text-lg text-red-700 dark:text-red-300">
                <strong>Warning:</strong> The pattern <strong>"SSA"</strong> (Side-Side-Angle), where the angle is *not* included, does <strong>NOT</strong> work to prove congruence.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing SAS</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <SasAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Watch how the matching Side (S), then the included Angle (A), then the next Side (S) "lock in" the congruence.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
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
            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
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
                <div className="text-3xl mb-4">✅</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered the included angle!" : 'Great job!'}
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
      slideId="sas-introduction"
      slideTitle="Introduction to the SAS Criterion"
      moduleId="congruence"
      submoduleId="sas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}