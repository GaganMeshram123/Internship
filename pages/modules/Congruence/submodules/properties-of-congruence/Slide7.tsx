import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const CongruenceVsEqualityAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  
  const itemAnim = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Title */}
        <motion.text x={200} y={30} fill={strokeColor} fontSize="18" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(0.5)}>
          Congruence vs. Equality (Angles)
        </motion.text>
        
        {/* Equality Side */}
        <motion.text x={100} y={80} fill={color1} fontSize="20" textAnchor="middle" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(1.0)}>
          Equality (=)
        </motion.text>
        <motion.text x={100} y={110} fill={strokeColor} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(1.2)}>
          For Numbers / Measures
        </motion.text>
        <motion.text x={100} y={150} fill={color1} fontSize="18" textAnchor="middle" fontFamily="monospace"
          initial="hidden" animate="visible" variants={itemAnim(1.4)}>
          $m\angle A = 45^\circ$
        </motion.text>
         <motion.text x={100} y={175} fill={color1} fontSize="18" textAnchor="middle" fontFamily="monospace"
          initial="hidden" animate="visible" variants={itemAnim(1.6)}>
          $m\angle B = 45^\circ$
        </motion.text>
         <motion.text x={100} y={200} fill={color1} fontSize="18" textAnchor="middle" fontFamily="monospace"
          initial="hidden" animate="visible" variants={itemAnim(1.8)}>
          $m\angle A = m\angle B$
        </motion.text>

        {/* Dividing Line */}
        <motion.line x1={200} y1={60} x2={200} y2={210} stroke={strokeColor} strokeWidth="2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
        />
        
        {/* Congruence Side */}
        <motion.text x={300} y={80} fill={color1} fontSize="20" textAnchor="middle" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(2.2)}>
          Congruence ($\cong$)
        </motion.text>
        <motion.text x={300} y={110} fill={strokeColor} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(2.4)}>
          For Figures / Objects
        </motion.text>
        <motion.text x={300} y={160} fill={color1} fontSize="18" textAnchor="middle" fontFamily="monospace"
          initial="hidden" animate="visible" variants={itemAnim(2.6)}>
          $\angle A \cong \angle B$
        </motion.text>
        <motion.text x={300} y={190} fill={color1} fontSize="18" textAnchor="middle" fontFamily="monospace"
          initial="hidden" animate="visible" variants={itemAnim(2.8)}>
          (Angles are congruent)
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function PropertiesSlide7() {
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
      id: 'properties-angle-congruence-quiz',
      conceptId: 'properties-angle-congruence',
      conceptName: 'Congruence of Angles',
      type: 'judging',
      description: 'Testing understanding of angle congruence vs. equality'
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
      id: 'properties-angle-q1',
      question: 'Which statement correctly compares the *measures* (the numbers) of two angles?',
      options: [
        "$\angle A \cong \angle B$",
        "$m\angle A = m\angle B$",
        "$m\angle A \cong m\angle B$",
        "$\angle A = \angle B$"
      ],
      correctAnswer: "$m\angle A = m\angle B$",
      explanation: "Correct! $m\angle A$ and $m\angle B$ represent numbers (like 45°). We use the equals sign ($=$) to compare numbers."
    },
    {
      id: 'properties-angle-q2',
      question: 'Which statement correctly compares the *angles themselves* (the geometric figures)?',
      options: [
        "$\angle A \cong \angle B$",
        "$m\angle A = m\angle B$",
        "$m\angle A \cong m\angle B$",
        "$\angle A = \angle B$"
      ],
      correctAnswer: "$\angle A \cong \angle B$",
      explanation: "Correct! $\angle A$ and $\angle B$ (with the angle symbol) represent the geometric figures. We use the congruence sign ($\cong$) to compare figures."
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
      interactionId: `properties-angle-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'properties-angle-congruence',
      conceptName: 'Congruence of Angles',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Congruence vs. Equality (for Angles)</h2>
            <p className="text-lg leading-relaxed">
              Just like with segments, we have a formal way to talk about angles being "the same."
            </p>
            <ul className="list-disc list-inside mt-4 text-lg space-y-2">
              <li>
                We use the **Equals sign ($=$)** for **measures (numbers)**.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">$m\angle A = 45^\circ$</span>
              </li>
              <li>
                We use the **Congruence sign ($\cong$)** for **figures (the angles themselves)**.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">$\angle A \cong \angle B$</span>
              </li>
            </ul>
          </div>

          {/* --- CARD 2 (The Definition) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Definition of Congruent Angles</h3>
            <p className="text-lg leading-relaxed">
              The two notations are linked by a formal definition.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                <strong>$\angle A \cong \angle B$</strong> (The angles are congruent)
                <br/>
                is the same as saying
                <br/>
                <strong>$m\angle A = m\angle B$</strong> (Their measures are equal)
              </p>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              In a proof, you can switch between these two. The reason is the "Definition of Congruent Angles."
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Numbers vs. Figures</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <CongruenceVsEqualityAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Use ($=$) for measures. Use ($\cong$) for the angles themselves.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Check Your Notation</h3>
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
                <div className="text-3xl mb-4">✍️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Your notation is perfect!" : 'Great job!'}
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
      slideId="properties-angle-congruence"
      slideTitle="Congruence of Angles"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}