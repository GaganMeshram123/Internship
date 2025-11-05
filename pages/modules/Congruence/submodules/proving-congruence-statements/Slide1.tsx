import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const ProofIntroAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const color1 = isDarkMode ? '#F87171' : '#EF4444'; // Red (Given)
  const color2 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue (Logic)
  const color3 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green (Prove)
  
  const itemAnim = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        
        {/* Given */}
        <motion.rect x={20} y={20} width={100} height={40} rx="8" fill={color1} opacity="0.7"
          initial="hidden" animate="visible" variants={itemAnim(0.5)} />
        <motion.text x={70} y={45} fill="white" fontSize="16" textAnchor="middle" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(0.7)}>
          GIVEN
        </motion.text>
        
        {/* Arrow */}
        <motion.path d="M 130 45 L 180 45" stroke={strokeColor} strokeWidth="2"
          initial="hidden" animate="visible" variants={itemAnim(1.0)} />
        <motion.path d="M 175 40 L 180 45 L 175 50" stroke={strokeColor} strokeWidth="2" fill="none"
          initial="hidden" animate="visible" variants={itemAnim(1.0)} />
        
        {/* Logic / Definitions */}
        <motion.rect x={190} y={20} width={190} height={40} rx="8" fill={color2} opacity="0.7"
          initial="hidden" animate="visible" variants={itemAnim(1.2)} />
        <motion.text x={285} y={45} fill="white" fontSize="16" textAnchor="middle" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(1.4)}>
          LOGIC & DEFINITIONS
        </motion.text>
        <motion.text x={285} y={70} fill={color2} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(1.6)}>
          (SAS, Reflexive Prop., etc.)
        </motion.text>
        
        {/* Arrow */}
        <motion.path d="M 200 90 L 200 130" stroke={strokeColor} strokeWidth="2"
          initial="hidden" animate="visible" variants={itemAnim(2.0)} />
        <motion.path d="M 195 125 L 200 130 L 205 125" stroke={strokeColor} strokeWidth="2" fill="none"
          initial="hidden" animate="visible" variants={itemAnim(2.0)} />
        
        {/* Prove */}
        <motion.rect x={150} y={140} width={100} height={40} rx="8" fill={color3} opacity="0.7"
          initial="hidden" animate="visible" variants={itemAnim(2.2)} />
        <motion.text x={200} y={165} fill="white" fontSize="16" textAnchor="middle" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(2.4)}>
          PROVE
        </motion.text>
        
        <motion.text x={200} y={200} fill={strokeColor} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(3.0)}>
          A proof is a logical path from Given to Prove.
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function ProvingSlide1() {
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
      id: 'proving-intro-quiz',
      conceptId: 'proving-introduction',
      conceptName: 'Introduction to Proofs',
      type: 'judging',
      description: 'Testing understanding of the components of a proof'
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
      id: 'proving-intro-q1',
      question: 'What is the "Given" in a proof?',
      options: [
        "The final conclusion.",
        "The information you are allowed to assume is true at the start.",
        "The list of all congruence criteria.",
        "The name of the theorem."
      ],
      correctAnswer: "The information you are allowed to assume is true at the start.",
      explanation: "Correct! The 'Given' is your starting point—the set of facts you don't have to prove."
    },
    {
      id: 'proving-intro-q2',
      question: 'What is the "Prove" statement in a proof?',
      options: [
        "The first step.",
        "A hidden clue, like a shared side.",
        "The 'Reason' for a statement.",
        "The destination, or the logical conclusion you must reach."
      ],
      correctAnswer: "The destination, or the logical conclusion you must reach.",
      explanation: "Correct! The 'Prove' statement is your goal. The entire proof is a step-by-step argument to show how you get from the 'Given' to this 'Prove' statement."
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
      interactionId: `proving-intro-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-introduction',
      conceptName: 'Introduction to Proofs',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What is a Proof?</h2>
            <p className="text-lg leading-relaxed">
              You've now learned all the tools. This final submodule is about putting them all together.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              A <strong>proof</strong> is a formal, step-by-step logical argument that shows *why* a statement must be true.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              It's like showing your work in an algebra problem, but every single step must be justified with a **Reason**.
            </p>
          </div>

          {/* --- CARD 2 (The Parts) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Parts of a Proof</h3>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Given:</strong>
                <br/>The information you are *given* at the start. These are the facts you can assume are true.
              </li>
              <li>
                <strong>Prove:</strong>
                <br/>The destination. This is the statement you are trying to reach as your final conclusion.
              </li>
              <li>
                <strong>Two-Column Proof:</strong>
                <br/>The most common format. One column lists your "Statements" (the steps) and the other column lists the "Reasons" (the definitions, postulates, or theorems) that justify each step.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Path of a Proof</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <ProofIntroAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              You use logic to build a bridge from what you are "Given" to what you must "Prove".
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
                <div className="text-3xl mb-4">📝</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You're ready to start proving!" : 'Great job!'}
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
      slideId="proving-introduction"
      slideTitle="Introduction to Proofs"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}