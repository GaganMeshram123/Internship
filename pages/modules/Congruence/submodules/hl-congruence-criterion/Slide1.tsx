import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- HL ANIMATION COMPONENT DEFINED INSIDE ---
const HlAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const highlightStroke = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const rightAngleColor = isDarkMode ? '#F87171' : '#EF4444'; // Red

  // Triangle 1 (Left) - Right triangle
  const T1 = { A: { x: 150, y: 50 }, B: { x: 50, y: 180 }, C: { x: 150, y: 180 } };
  // Triangle 2 (Right) - Right triangle
  const T2 = { D: { x: 350, y: 50 }, E: { x: 250, y: 180 }, F: { x: 350, y: 180 } };

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

        {/* --- Right Angle Markers --- */}
        <motion.path
          d={`M ${T1.C.x - 15} ${T1.C.y} L ${T1.C.x - 15} ${T1.C.y - 15} L ${T1.C.x} ${T1.C.y - 15}`}
          stroke={rightAngleColor} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={0.5}
        />
        <motion.path
          d={`M ${T2.F.x - 15} ${T2.F.y} L ${T2.F.x - 15} ${T2.F.y - 15} L ${T2.F.x} ${T2.F.y - 15}`}
          stroke={rightAngleColor} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={0.5}
        />

        {/* --- HL Highlights --- */}

        {/* HYPOTENUSE (H) (AB and DE) */}
        <motion.line
          x1={T1.A.x} y1={T1.A.y} x2={T1.B.x} y2={T1.B.y}
          stroke={highlightStroke} strokeWidth="6" variants={anim} initial="hidden" animate="visible" custom={1.0}
        />
        <motion.line
          x1={T2.D.x} y1={T2.D.y} x2={T2.E.x} y2={T2.E.y}
          stroke={highlightStroke} strokeWidth="6" variants={anim} initial="hidden" animate="visible" custom={1.0}
        />
        <motion.text x={T1.A.x - 50} y={(T1.A.y + T1.B.y) / 2} fill={highlightStroke} fontSize="16" fontWeight="bold"
          variants={textAnim} initial="hidden" animate="visible" custom={1.2}>H</motion.text>
        <motion.text x={T2.D.x + 10} y={(T2.D.y + T2.E.y) / 2} fill={highlightStroke} fontSize="16" fontWeight="bold"
          variants={textAnim} initial="hidden" animate="visible" custom={1.2}>H</motion.text>

        {/* LEG (L) (AC and DF) */}
        <motion.line
          x1={T1.A.x} y1={T1.A.y} x2={T1.C.x} y2={T1.C.y}
          stroke={highlightStroke} strokeWidth="6" strokeDasharray="6 6" variants={anim} initial="hidden" animate="visible" custom={2.0}
        />
        <motion.line
          x1={T2.D.x} y1={T2.D.y} x2={T2.F.x} y2={T2.F.y}
          stroke={highlightStroke} strokeWidth="6" strokeDasharray="6 6" variants={anim} initial="hidden" animate="visible" custom={2.0}
        />
       {/*  <motion.text x={T1.C.x + 10} y={(T1.A.y + T1.C.y) / 2} fill={highlightStroke} fontSize="16" fontWeight="bold"
          variants={textAnim} initial="hidden" animate="visible" custom={2.2}>L</motion.text>
        <motion.text x={T2.F.x + 10} y={(T2.A.y + T2.C.y) / 2} fill={highlightStroke} fontSize="16" fontWeight="bold"
          variants={textAnim} initial="hidden" animate="visible" custom={2.2}>L</motion.text>
 */}
        {/* Congruence Statement */}
        <motion.text x={svgWidth / 2} y={svgHeight / 2 - 20} fill={highlightStroke} fontSize="18" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={3.0}>
          ∴ &triangle;ABC &cong; &triangle;DEF
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function HlSlide1() {
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
      id: 'hl-intro-quiz',
      conceptId: 'hl-criterion-intro',
      conceptName: 'HL Criterion Introduction',
      type: 'judging',
      description: 'Testing understanding of the HL criterion components'
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
      id: 'hl-intro-q1-type',
      question: 'The HL criterion is a "special case" that ONLY works for what kind of triangles?',
      options: [
        "Isosceles triangles",
        "Equilateral triangles",
        "Right-angled triangles",
        "All triangles"
      ],
      correctAnswer: "Right-angled triangles",
      explanation: "Correct! HL *only* applies to right-angled triangles. You must know there is a 90° angle."
    },
    {
      id: 'hl-intro-q2-meaning',
      question: 'What do the "H" and "L" in HL stand for?',
      options: [
        "Height and Length",
        "Hypotenuse and Leg",
        "Horizontal and Long",
        "Hypotenuse and Length"
      ],
      correctAnswer: "Hypotenuse and Leg",
      explanation: "Exactly! You must prove congruence of the **Hypotenuse** (the side opposite the right angle) and one corresponding **Leg**."
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
      interactionId: `hl-intro-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'hl-criterion-intro',
      conceptName: 'HL Criterion Introduction',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The HL Criterion</h2>
            <p className="text-lg leading-relaxed">
              HL stands for <strong>Hypotenuse-Leg</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              It states: If the <strong>hypotenuse</strong> and one <strong>leg</strong> of a <strong>right-angled triangle</strong> are congruent to the corresponding parts of another right-angled triangle, then the triangles are congruent.
            </p>
          </div>

          {/* --- CARD 2 (The Special Case) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The "Special Case" of SSA</h3>
            <p className="text-lg leading-relaxed">
              We learned that <strong>SSA</strong> (Side-Side-Angle) does *not* work.
            </p>
            <p className="text-lg leading-relaxed mt-3">
              HL is the *only* exception. Think about it:
              <ul className="list-disc list-inside ml-4 mt-2">
                <li>You have a Leg <strong>(S)</strong>.</li>
                <li>You have a Hypotenuse <strong>(S)</strong>.</li>
                <li>You have a right angle <strong>(A)</strong>, which is *not* included.</li>
              </ul>
              This is an "SSA" pattern!
            </p>

            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                <strong>Key Idea:</strong> HL is the special version of SSA that only works because the angle is a <strong>90° right angle</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing HL</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <HlAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              If both triangles have a right angle, a congruent Hypotenuse (H), and a congruent Leg (L), they must be congruent.
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
                <div className="text-3xl mb-4">📐</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered the basics!" : 'Great job!'}
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
      slideId="hl-introduction"
      slideTitle="Introduction to the HL Criterion"
      moduleId="congruence"
      submoduleId="hl-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}