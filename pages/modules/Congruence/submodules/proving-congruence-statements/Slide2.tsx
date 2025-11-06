import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import katex from 'katex'; // Assuming katex is available

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const SSSProofFigure: React.FC = () => {
  const svgWidth = 350;
  const svgHeight = 250;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  // Colors from the user's images
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue (Side 1)
  const color2 = isDarkMode ? '#F59E0B' : '#D97706'; // Orange (Side 2)
  const color3 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green (Side 3)
  
  const itemAnim = (delay: number) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: delay, duration: 0.5 } },
  });

  // Coordinates based on the user's diagram
  const A = { x: 280, y: 190 };
  const B = { x: 230, y: 60 };
  const C = { x: 70, y: 200 };
  const D = { x: 50, y: 70 };

  // Tick mark paths
  const tick1_AB = "M 253 118 L 257 127";
  const tick1_AC = "M 166 200 L 174 196";
  const tick2_BD = "M 130 64 L 140 66";
  const tick2_CD = "M 59 125 L 61 135";

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        
        {/* Triangle ABD */}
        <motion.path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${D.x} ${D.y} Z`} stroke="none" fill={strokeColor} fillOpacity="0.05"
          initial="hidden" animate="visible" variants={itemAnim(0.2)} />
        {/* Triangle ACD */}
        <motion.path d={`M ${A.x} ${A.y} L ${C.x} ${C.y} L ${D.x} ${D.y} Z`} stroke="none" fill={strokeColor} fillOpacity="0.05"
          initial="hidden" animate="visible" variants={itemAnim(0.2)} />

        {/* Step 1: AB and AC (Blue) */}
        <motion.line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={color1} strokeWidth="4"
          initial="hidden" animate="visible" variants={itemAnim(0.5)} />
        <motion.line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke={color1} strokeWidth="4"
          initial="hidden" animate="visible" variants={itemAnim(0.5)} />
        <motion.path d={tick1_AB} stroke={color1} strokeWidth="3" initial="hidden" animate="visible" variants={itemAnim(0.5)} />
        <motion.path d={tick1_AC} stroke={color1} strokeWidth="3" initial="hidden" animate="visible" variants={itemAnim(0.5)} />

        {/* Step 2: BD and CD (Orange) */}
        <motion.line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke={color2} strokeWidth="4"
          initial="hidden" animate="visible" variants={itemAnim(1.0)} />
        <motion.line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke={color2} strokeWidth="4"
          initial="hidden" animate="visible" variants={itemAnim(1.0)} />
        <motion.path d={tick2_BD} stroke={color2} strokeWidth="3" initial="hidden" animate="visible" variants={itemAnim(1.0)} />
        <motion.path d={`${tick2_BD} transform="translate(-10, 2)"`} stroke={color2} strokeWidth="3" initial="hidden" animate="visible" variants={itemAnim(1.0)} />
        <motion.path d={tick2_CD} stroke={color2} strokeWidth="3" initial="hidden" animate="visible" variants={itemAnim(1.0)} />
        <motion.path d={`${tick2_CD} transform="translate(2, -10)"`} stroke={color2} strokeWidth="3" initial="hidden" animate="visible" variants={itemAnim(1.0)} />


        {/* Step 3: AD (Green) */}
        <motion.line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke={color3} strokeWidth="4"
          initial="hidden" animate="visible" variants={itemAnim(1.5)} />
        
        {/* Labels */}
        <motion.text x={A.x + 10} y={A.y + 5} fill={strokeColor} initial="hidden" animate="visible" variants={itemAnim(0.3)}>A</motion.text>
        <motion.text x={B.x + 5} y={B.y - 10} fill={strokeColor} initial="hidden" animate="visible" variants={itemAnim(0.3)}>B</motion.text>
        <motion.text x={C.x - 15} y={C.y + 5} fill={strokeColor} initial="hidden" animate="visible" variants={itemAnim(0.3)}>C</motion.text>
        <motion.text x={D.x - 15} y={D.y} fill={strokeColor} initial="hidden" animate="visible" variants={itemAnim(0.3)}>D</motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function ProvingSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] =  useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  // --- UPDATED: Now 3 questions ---
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'proving-sss-example-quiz',
      conceptId: 'proving-sss-example',
      conceptName: 'Proving Statements (SSS)',
      type: 'judging',
      description: 'Testing the logical flow of an SSS proof'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED: New questions based on the SSS proof ---
  const questions: QuizQuestion[] = [
    {
      id: 'proving-sss-q1',
      question: 'In this proof, what is the reason for $AB \\cong AC$ and $BD \\cong CD$?',
      options: [
        "Reflexive Property",
        "Given",
        "SSS Criterion",
        "Definition of a Midpoint"
      ],
      correctAnswer: "Given",
      explanation: "Correct! The tick marks on the diagram indicate that this information is 'Given' to us at the start of the problem."
    },
    {
      id: 'proving-sss-q2',
      question: 'What is the reason for stating $AD \\cong AD$?',
      options: [
        "Given",
        "Transitive Property",
        "Symmetric Property",
        "Reflexive Property"
      ],
      correctAnswer: "Reflexive Property",
      explanation: "Correct! The segment $AD$ is a *common side* to both triangles. The Reflexive Property states that any segment is congruent to itself."
    },
    {
      id: 'proving-sss-q3',
      question: 'With these 3 steps, which criterion lets us conclude that $\\triangle ABD \\cong \\triangle ACD$?',
      options: [
        "SAS (Side-Angle-Side)",
        "ASA (Angle-Side-Angle)",
        "SSS (Side-Side-Side)",
        "HL (Hypotenuse-Leg)"
      ],
      correctAnswer: "SSS (Side-Side-Side)",
      explanation: "Correct! We proved three pairs of sides are congruent: (S) $AB \\cong AC$, (S) $BD \\cong CD$, and (S) $AD \\cong AD$. This is the SSS criterion."
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    // ... (This function remains unchanged)
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const handleQuizAnswer = (answerText: string) => {
    // ... (This function remains unchanged, but I'll fix the template literal)
    if (showFeedback || isQuizComplete) return;

    setSelectedAnswer(answerText);
    setShowFeedback(true);

    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    handleInteractionComplete({
      interactionId: `proving-sss-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-sss-example',
      conceptName: 'Proving Statements (SSS)',
      conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
      question: {
        type: 'mcq',
        question: current.question,
        options: current.options
      }
    });
  };

  const handleNextQuestion = () => {
    // ... (This function remains unchanged)
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


  // --- UPDATED: All new slide content ---
  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* --- CARD 1 --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Proving Congruence Statements</h2>
            <p className="text-lg leading-relaxed">
              Consider the following diagram. Suppose we wish to formally prove the following congruence statement:
            </p>
            <div className="my-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60"
                 dangerouslySetInnerHTML={{ __html: katex.renderToString("\\triangle ABD \\cong \\triangle ACD", { throwOnError: false, displayMode: true }) }}
            />
            <p className="text-lg leading-relaxed">
              In this instance, we can prove this statement using the SSS congruence criterion.
            </p>
          </div>

          {/* --- CARD 2 (The Logic) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Logical Argument</h3>
            <p className="text-lg leading-relaxed">
              We proceed as follows:
            </p>
            <ul className="list-decimal list-outside mt-4 ml-5 text-lg space-y-4">
              <li>
                We're <strong>given</strong> that the segments $AB$ and $AC$ are congruent (Side 1).
                <div className="mt-1" dangerouslySetInnerHTML={{ __html: katex.renderToString("AB \\cong AC", { throwOnError: false, displayMode: true }) }} />
              </li>
              <li>
                We are also <strong>given</strong> that the segments $BD$ and $CD$ are congruent (Side 2).
                <div className="mt-1" dangerouslySetInnerHTML={{ __html: katex.renderToString("BD \\cong CD", { throwOnError: false, displayMode: true }) }} />
              </li>
              <li>
                By the <strong>Reflexive Property of Congruence</strong>, $AD$ is congruent to itself, as it is a common side to both triangles (Side 3).
                <div className="mt-1" dangerouslySetInnerHTML={{ __html: katex.renderToString("AD \\cong AD", { throwOnError: false, displayMode: true }) }} />
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              <p className="text-lg font-semibold">
                Therefore, by the SSS criterion, we conclude that $\triangle ABD \cong \triangle ACD$.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing the SSS Proof</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <SSSProofFigure />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              We find two pairs of Sides (Given) and one shared Side (Reflexive) to prove SSS.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD (Now 3 questions) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Finding the Clues</h3>
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
                <div className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: katex.renderToString(questions[currentQuestionIndex].question, { throwOnError: false }) }}></div>
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
                        dangerouslySetInnerHTML={{ __html: katex.renderToString(option, { throwOnError: false }) }}
                      >
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
                      <div className="text-lg text-slate-600 dark:text-slate-400 mb-4"
                           dangerouslySetInnerHTML={{ __html: katex.renderToString(questions[currentQuestionIndex].explanation, { throwOnError: false }) }}
                      >
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
                  {score === questions.length ? "You've mastered this SSS proof!" : 'Great job!'}
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
      // --- UPDATED Props ---
      slideId="proving-sss-example"
      slideTitle="Proving Statements: SSS Example"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}