import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- AAS ANIMATION COMPONENT DEFINED INSIDE (UPDATED FROM YOUR IMAGE) ---
const AasAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  // Highlight colors for A-A-S
  const angle1Color = isDarkMode ? '#FDE047' : '#EAB308'; // Yellow (Angle A/K)
  const angle2Color = isDarkMode ? '#60A5FA' : '#2563EB';   // Blue (Angle B/L)
  const sideColor = isDarkMode ? '#4ADE80' : '#22C55E'; // Green (Side AC/MK)

  // Triangle 1 (ABC) from your image
  const T1 = { A: { x: 30, y: 180 }, B: { x: 150, y: 180 }, C: { x: 70, y: 70 } };
  // Triangle 2 (KLM) from your image
  const T2 = { K: { x: 250, y: 180 }, L: { x: 370, y: 180 }, M: { x: 310, y: 70 } };

  const commonProps = {
    fill: 'none',
    strokeWidth: 2,
  };

  const anim = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      pathLength: 1,
      transition: { delay: delay, duration: 0.5, ease: 'easeInOut' }
    }),
  };
  
  const lineAnim = {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: { delay: delay, duration: 0.5 }
    }),
  }

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
        {/* --- Triangle 1 (ABC) --- */}
        <path
          d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`}
          stroke={strokeColor}
          {...commonProps}
        />
        <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor} fontSize="14">A</text>
        <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor} fontSize="14">B</text>
        <text x={T1.C.x} y={T1.C.y - 10} fill={strokeColor} fontSize="14" textAnchor="middle">C</text>

        {/* --- Triangle 2 (KLM) --- */}
        <path
          d={`M ${T2.K.x} ${T2.K.y} L ${T2.L.x} ${T2.L.y} L ${T2.M.x} ${T2.M.y} Z`}
          stroke={strokeColor}
          {...commonProps}
        />
        <text x={T2.K.x - 15} y={T2.K.y + 5} fill={strokeColor} fontSize="14">K</text>
        <text x={T2.L.x + 5} y={T2.L.y + 5} fill={strokeColor} fontSize="14">L</text>
        <text x={T2.M.x} y={T2.M.y - 10} fill={strokeColor} fontSize="14" textAnchor="middle">M</text>


        {/* --- AAS Highlights --- */}

        {/* ANGLE 1 (A and K) - 45° */}
        <motion.path
          d={`M ${T1.A.x + 20} ${T1.A.y} A 20 20 0 0 1 ${T1.A.x + 16.2} ${T1.A.y - 11.8}`}
          stroke={angle1Color} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={0.5}
        />
        <motion.text x={T1.A.x + 12} y={T1.A.y - 5} fill={angle1Color} fontSize="12"
          variants={textAnim} initial="hidden" animate="visible" custom={0.7}>45°</motion.text>
          
        <motion.path
          d={`M ${T2.K.x + 20} ${T2.K.y} A 20 20 0 0 1 ${T2.K.x + 16.2} ${T2.K.y - 11.8}`}
          stroke={angle1Color} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={0.5}
        />
        <motion.text x={T2.K.x + 12} y={T2.K.y - 5} fill={angle1Color} fontSize="12"
          variants={textAnim} initial="hidden" animate="visible" custom={0.7}>45°</motion.text>
        <motion.text x={(T1.A.x + T2.K.x) / 2 + 10} y={T1.A.y + 20} fill={angle1Color} fontSize="16" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={0.9}>A</motion.text>


        {/* ANGLE 2 (B and L) - 79° */}
        <motion.path
          d={`M ${T1.B.x - 20} ${T1.B.y} A 20 20 0 0 0 ${T1.B.x - 19.1} ${T1.B.y - 5.8}`}
          stroke={angle2Color} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={1.5}
        />
        <motion.text x={T1.B.x - 28} y={T1.B.y - 5} fill={angle2Color} fontSize="12"
          variants={textAnim} initial="hidden" animate="visible" custom={1.7}>79°</motion.text>

        <motion.path
          d={`M ${T2.L.x - 20} ${T2.L.y} A 20 20 0 0 0 ${T2.L.x - 19.1} ${T2.L.y - 5.8}`}
          stroke={angle2Color} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={1.5}
        />
        <motion.text x={T2.L.x - 28} y={T2.L.y - 5} fill={angle2Color} fontSize="12"
          variants={textAnim} initial="hidden" animate="visible" custom={1.7}>79°</motion.text>
        <motion.text x={(T1.C.x + T2.M.x) / 2} y={T1.A.y + 20} fill={angle2Color} fontSize="16" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={1.9}>A</motion.text>

        
        {/* SIDE (AC and MK) - 4 */}
        <motion.line
          x1={T1.A.x} y1={T1.A.y} x2={T1.C.x} y2={T1.C.y}
          stroke={sideColor} strokeWidth="6" variants={lineAnim} initial="hidden" animate="visible" custom={2.5}
        />
        <motion.text x={(T1.A.x + T1.C.x) / 2 - 15} y={(T1.A.y + T1.C.y) / 2} fill={sideColor} fontSize="12"
          variants={textAnim} initial="hidden" animate="visible" custom={2.7}>4</motion.text>
          
        <motion.line
          x1={T2.K.x} y1={T2.K.y} x2={T2.M.x} y2={T2.M.y}
          stroke={sideColor} strokeWidth="6" variants={lineAnim} initial="hidden" animate="visible" custom={2.5}
        />
        <motion.text x={(T2.K.x + T2.M.x) / 2 - 15} y={(T2.K.y + T2.M.y) / 2} fill={sideColor} fontSize="12"
          variants={textAnim} initial="hidden" animate="visible" custom={2.7}>4</motion.text>
        <motion.text x={(T1.B.x + T2.L.x) / 2 - 10} y={T1.A.y + 20} fill={sideColor} fontSize="16" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={2.9}>S</motion.text>

        {/* Congruence Statement (ADJUSTED Y POSITION) */}
        <motion.text x={svgWidth / 2} y={svgHeight - 10} fill={strokeColor} fontSize="18" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={3.5}>
          ∴ &triangle;ABC &cong; &triangle;KLM
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function AasSlide1() {
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
      id: 'aas-intro-quiz',
      conceptId: 'aas-criterion-intro',
      conceptName: 'AAS Criterion Introduction',
      type: 'judging',
      description: 'Testing understanding of the AAS criterion components'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- QUIZ QUESTIONS (Unchanged from your file) ---
  const questions: QuizQuestion[] = [
    {
      id: 'aas-intro-q1-meaning',
      question: 'What is the main difference between ASA and AAS?',
      options: [
        "AAS has two sides, ASA has one",
        "In AAS, the side is *not* included between the angles",
        "In ASA, the side is *not* included between the angles",
        "They are the same criterion"
      ],
      correctAnswer: "In AAS, the side is *not* included between the angles",
      explanation: "Correct! That's the key difference. ASA is Angle-Side-Angle (side is included). AAS is Angle-Angle-Side (side is non-included)."
    },
    {
      id: 'aas-intro-q2-why',
      question: 'Why does the AAS criterion work?',
      options: [
        "Because of the Pythagorean Theorem",
        "Because if you know two angles, you can find the third angle (Third Angle Theorem)",
        "It only works for right triangles",
        "It is just a rule we have to memorize"
      ],
      correctAnswer: "Because if you know two angles, you can find the third angle (Third Angle Theorem)",
      explanation: "Exactly! If you know two angles in $\triangle ABC$, you know the third (since they sum to 180°). This allows you to find the third angle and then use ASA."
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
      interactionId: `aas-intro-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'aas-criterion-intro',
      conceptName: 'AAS Criterion Introduction',
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

        {/* Left Column - Content (UPDATED FROM YOUR IMAGE) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Introduction</h2>
            <p className="text-lg leading-relaxed mb-4">
              The <strong>angle-angle-side (AAS)</strong> congruence criterion can be used as a shortcut to prove that two triangles are congruent. It states the following:
            </p>

            <blockquote className="my-4 p-4 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg italic font-medium leading-relaxed">
                Two triangles are congruent if and only if two angles and a <strong>non-included side</strong> of one triangle are congruent to two angles and the corresponding non-included side of the other triangle.
              </p>
            </blockquote>

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">To demonstrate, consider the triangles below.</h3>
            
            <div className="space-y-2 text-lg">
              <p>We can see that two pairs of angles are congruent:</p>
              <div className="pl-4 font-mono">
                <p>&ang;B &cong; &ang;L</p>
                <p>&ang;A &cong; &ang;K</p>
              </div>
            </div>

            <div className="space-y-2 text-lg mt-4">
              <p>We can also see that we have a congruent pair of non-included sides (a "non-included side" means that it does not connect the congruent angles):</p>
              <div className="pl-4 font-mono">
                <p>AC &cong; MK</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-lg leading-relaxed">
                Therefore, the AAS congruence criterion guarantees that these two triangles are congruent:
              </p>
              <p className="text-xl font-bold text-center my-4 font-mono text-blue-600 dark:text-blue-400">
                &triangle;ABC &cong; &triangle;KLM
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (Quiz is UNCHANGED) */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing AAS</h3>
            
            {/* --- USE THE UPDATED ANIMATION COMPONENT --- */}
            <AasAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              We are given an Angle (A), another Angle (A), and a *non-included* Side (S).
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD (Unchanged from your file) --- */}
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
      slideId="aas-introduction"
      slideTitle="Introduction to the AAS Criterion"
      moduleId="congruence"
      submoduleId="aas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}