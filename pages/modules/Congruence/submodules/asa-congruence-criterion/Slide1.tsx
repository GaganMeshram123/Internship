import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ASA ANIMATION COMPONENT DEFINED INSIDE ---
const AsaAnimation: React.FC = () => {
  // --- CHANGED: Increased height from 220 to 240 ---
  const svgWidth = 400;
  const svgHeight = 240; 
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  // Highlight colors for A-S-A
  const angle1Color = isDarkMode ? '#2DD4BF' : '#0D9488'; // Teal (Angle A/K)
  const sideColor = isDarkMode ? '#60A5FA' : '#2563EB';   // Blue (Side AB/KL)
  const angle2Color = isDarkMode ? '#F472B6' : '#DB2777'; // Pink (Angle B/L)

  // Triangle 1 (ABC) from your image
  const T1 = { A: { x: 30, y: 180 }, B: { x: 150, y: 180 }, C: { x: 105, y: 50 } };
  // Triangle 2 (KLM) from your image
  const T2 = { K: { x: 250, y: 180 }, L: { x: 370, y: 180 }, M: { x: 325, y: 50 } };

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


        {/* --- ASA Highlights --- */}

        {/* ANGLE 1 (A and K) - 45° */}
        <motion.path
          d={`M ${T1.A.x + 20} ${T1.A.y} A 20 20 0 0 1 ${T1.A.x + 14.14} ${T1.A.y - 14.14}`}
          stroke={angle1Color} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={0.5}
        />
        <motion.text x={T1.A.x + 12} y={T1.A.y - 5} fill={angle1Color} fontSize="12"
          variants={textAnim} initial="hidden" animate="visible" custom={0.7}>45°</motion.text>
          
        <motion.path
          d={`M ${T2.K.x + 20} ${T2.K.y} A 20 20 0 0 1 ${T2.K.x + 14.14} ${T2.K.y - 14.14}`}
          stroke={angle1Color} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={0.5}
        />
        <motion.text x={T2.K.x + 12} y={T2.K.y - 5} fill={angle1Color} fontSize="12"
          variants={textAnim} initial="hidden" animate="visible" custom={0.7}>45°</motion.text>
        {/* A Label */}
        <motion.text x={(T1.A.x + T2.K.x) / 2 + 10} y={T1.A.y + 20} fill={angle1Color} fontSize="16" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={0.9}>A</motion.text>


        {/* SIDE (AB and KL) - 5 */}
        <motion.line
          x1={T1.A.x} y1={T1.A.y} x2={T1.B.x} y2={T1.B.y}
          stroke={sideColor} strokeWidth="6" variants={lineAnim} initial="hidden" animate="visible" custom={1.5}
        />
        <motion.text x={(T1.A.x + T1.B.x) / 2} y={T1.A.y - 5} fill={sideColor} fontSize="12" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={1.7}>5</motion.text>
          
        <motion.line
          x1={T2.K.x} y1={T2.K.y} x2={T2.L.x} y2={T2.L.y}
          stroke={sideColor} strokeWidth="6" variants={lineAnim} initial="hidden" animate="visible" custom={1.5}
        />
        <motion.text x={(T2.K.x + T2.L.x) / 2} y={T2.K.y - 5} fill={sideColor} fontSize="12" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={1.7}>5</motion.text>
        {/* S Label */}
        <motion.text x={(T1.B.x + T2.L.x) / 2 - 10} y={T1.A.y + 20} fill={sideColor} fontSize="16" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={1.9}>S</motion.text>


        {/* ANGLE 2 (B and L) - 79° */}
        <motion.path
          d={`M ${T1.B.x - 20} ${T1.B.y} A 20 20 0 0 0 ${T1.B.x - 19.6} ${T1.B.y - 3.8}`}
          stroke={angle2Color} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={2.5}
        />
        <motion.path
          d={`M ${T1.B.x - 23} ${T1.B.y} A 23 23 0 0 0 ${T1.B.x - 22.5} ${T1.B.y - 4.4}`}
          stroke={angle2Color} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={2.5}
        />
        <motion.text x={T1.B.x - 28} y={T1.B.y - 5} fill={angle2Color} fontSize="12"
          variants={textAnim} initial="hidden" animate="visible" custom={2.7}>79°</motion.text>

        <motion.path
          d={`M ${T2.L.x - 20} ${T2.L.y} A 20 20 0 0 0 ${T2.L.x - 19.6} ${T2.L.y - 3.8}`}
          stroke={angle2Color} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={2.5}
        />
        <motion.path
          d={`M ${T2.L.x - 23} ${T2.L.y} A 23 23 0 0 0 ${T2.L.x - 22.5} ${T2.L.y - 4.4}`}
          stroke={angle2Color} {...commonProps} variants={anim} initial="hidden" animate="visible" custom={2.5}
        />
        <motion.text x={T2.L.x - 28} y={T2.L.y - 5} fill={angle2Color} fontSize="12"
          variants={textAnim} initial="hidden" animate="visible" custom={2.7}>79°</motion.text>
        {/* A Label */}  
        <motion.text x={(T1.C.x + T2.M.x) / 2} y={T1.A.y + 20} fill={angle2Color} fontSize="16" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={2.9}>A</motion.text>

        {/* Congruence Statement - MOVED TO y={svgHeight - 15} */}
        <motion.text x={svgWidth / 2} y={svgHeight - 15} fill={strokeColor} fontSize="18" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={3.5}>
          ∴ &triangle;ABC &cong; &triangle;KLM
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


// ... The rest of your file (export default function AsaSlide1()...)
// remains exactly the same. Just replace the AsaAnimation component
// with the one above.

export default function AsaSlide1() {
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
      id: 'asa-intro-quiz',
      conceptId: 'asa-criterion-intro',
      conceptName: 'ASA Criterion Introduction',
      type: 'judging',
      description: 'Testing understanding of the ASA criterion components'
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
  id: 'asa-intro-q1-meaning',
  question: 'In the ASA rule, what is special about the side S?',
  options: [
    "It is the longest side",
    "It is the side between the two angles",
    "It is the shortest side",
    "It does not matter which side it is"
  ],
  correctAnswer: "It is the side between the two angles",
  explanation:
    "Correct! In ASA, the side must be the one that lies between the two known angles. This is called the included side."
},
{
  id: 'asa-intro-q2-requirement',
  question: 'To use ASA to prove triangles are congruent, we must know two angles and...',
  options: [
    "Any matching side",
    "A matching altitude",
    "The side between those two angles",
    "All three sides"
  ],
  correctAnswer: "The side between those two angles",
  explanation:
    "Correct! ASA stands for Angle-Side-Angle. The side must be the one that is directly between the two angles."
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
      interactionId: `asa-intro-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'asa-criterion-intro',
      conceptName: 'ASA Criterion Introduction',
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
              The <strong>angle-side-angle (ASA)</strong> congruence criterion can be used as a shortcut to prove that two triangles are congruent. It states the following:
            </p>

            {/* This is the blockquote from your image */}
            <blockquote className="my-4 p-4 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg italic font-medium leading-relaxed">
                Two triangles are congruent if and only if two angles and <strong>the included side</strong> of one triangle are congruent to two angles and the included side of the other triangle.
              </p>
            </blockquote>

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">To demonstrate, consider the triangles below.</h3>
            
            {/* This section contains the logic from your image */}
            <div className="space-y-2 text-lg">
              <p>We can see that two pairs of angles are congruent:</p>
              <div className="pl-4 font-mono">
                <p>&ang;A &cong; &ang;K</p>
                <p>&ang;B &cong; &ang;L</p>
              </div>
            </div>

            <div className="space-y-2 text-lg mt-4">
              <p>Also, we see that the included sides are congruent:</p>
              <div className="pl-4 font-mono">
                <p>AB &cong; KL</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-lg leading-relaxed">
                Therefore, the ASA congruence criterion guarantees that these two triangles are congruent, and we can write:
              </p>
              <p className="text-xl font-bold text-center my-4 font-mono text-blue-600 dark:text-blue-400">
                &triangle;ABC &cong; &triangle;KLM
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (STRUCTURE UNCHANGED) */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing the Example</h3>
            
            {/* --- USE THE UPDATED ANIMATION COMPONENT --- */}
            <AsaAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Watch how the matching Angle (A), then the included Side (S), then the next Angle (A) "lock in" the congruence.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD (UNCHANGED) --- */}
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
      slideId="asa-introduction"
      slideTitle="Introduction to the ASA Criterion"
      moduleId="congruence"
      submoduleId="asa-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}