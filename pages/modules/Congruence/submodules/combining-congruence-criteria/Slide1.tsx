import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const CriteriaSummary: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const validColor = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const invalidColor = isDarkMode ? '#F87171' : '#EF4444'; // Red

  const itemAnim = (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: delay * 0.2, type: 'spring', stiffness: 100 } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Valid Criteria */}
        <motion.text x={100} y={30} fontSize="18" fontWeight="bold" fill={validColor} textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(0)}>
          THE 5 CRITERIA THAT WORK
        </motion.text>
        <motion.text x={100} y={70} fontSize="20" fontWeight="bold" fill={validColor} textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(1)}>
          SSS
        </motion.text>
        <motion.text x={100} y={100} fontSize="20" fontWeight="bold" fill={validColor} textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(2)}>
          SAS
        </motion.text>
        <motion.text x={100} y={130} fontSize="20" fontWeight="bold" fill={validColor} textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(3)}>
          ASA
        </motion.text>
        <motion.text x={100} y={160} fontSize="20" fontWeight="bold" fill={validColor} textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(4)}>
          AAS
        </motion.text>
        <motion.text x={100} y={190} fontSize="20" fontWeight="bold" fill={validColor} textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(5)}>
          HL
        </motion.text>

        {/* Dividing Line */}
        <motion.line x1={200} y1={20} x2={200} y2={200} stroke={isDarkMode ? '#475569' : '#CBD5E1'} strokeWidth="2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        />

        {/* Invalid Criteria */}
        <motion.text x={300} y={30} fontSize="18" fontWeight="bold" fill={invalidColor} textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(7)}>
          THE 2 "IMPOSTORS"
        </motion.text>
        <motion.text x={300} y={100} fontSize="24" fontWeight="bold" fill={invalidColor} textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(8)}
          style={{ textDecoration: 'line-through' }}>
          AAA
        </motion.text>
        <motion.text x={300} y={160} fontSize="24" fontWeight="bold" fill={invalidColor} textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(9)}
          style={{ textDecoration: 'line-through' }}>
          SSA
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function CombiningSlide1() {
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
      id: 'combining-intro-quiz',
      conceptId: 'combining-criteria-intro',
      conceptName: 'Combining Criteria Intro',
      type: 'judging',
      description: 'Testing recall of valid vs. invalid criteria'
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
      id: 'combining-intro-q1',
      question: 'Which of the following is NOT a valid criterion for proving triangles congruent?',
      options: [
        "SSS",
        "ASA",
        "SSA",
        "HL"
      ],
      correctAnswer: "SSA",
      explanation: "Correct! SSA (Side-Side-Angle) is not a valid way to prove triangles are congruent because the angle is not included (unless it's the HL special case)."
    },
    {
      id: 'combining-intro-q2',
      question: 'Why does AAA (Angle-Angle-Angle) not work for proving congruence?',
      options: [
        "It's too hard to measure all three angles.",
        "It proves the triangles are *similar*, but not necessarily the same *size*.",
        "It's the same as the AAS criterion.",
        "It only works for right triangles."
      ],
      correctAnswer: "It proves the triangles are *similar*, but not necessarily the same *size*.",
      explanation: "Exactly! Two triangles can have the same three angles but be different sizes (one is an enlargement of the other). This proves similarity, not congruence."
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
      interactionId: `combining-intro-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'combining-criteria-intro',
      conceptName: 'Combining Criteria Intro',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Combining Your Tools</h2>
            <p className="text-lg leading-relaxed">
              You now have **5** powerful tools in your geometry toolbox to prove triangles are congruent.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              The goal of this submodule is to learn which tool to use, and just as importantly, which "tools" to avoid.
            </p>
          </div>

          {/* --- CARD 2 (The Tools) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Your Toolbox</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold text-green-600 dark:text-green-400">✅ VALID</h4>
                <ul className="list-disc list-inside mt-2 text-lg">
                  <li>SSS</li>
                  <li>SAS</li>
                  <li>ASA</li>
                  <li>AAS</li>
                  <li>HL (Right $\triangle$ only)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-red-600 dark:text-red-400">❌ INVALID</h4>
                <ul className="list-disc list-inside mt-2 text-lg">
                  <li><strong>AAA</strong> (Proves Similarity)</li>
                  <li><strong>SSA</strong> (Ambiguous Case)</li>
                </ul>
              </div>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              This submodule will focus on practicing these skills and exploring *why* AAA and SSA fail.
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Valid vs. Invalid</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <CriteriaSummary />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The 5 on the left are your tools. The 2 on the right are traps to avoid!
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
                <div className="text-3xl mb-4">🧠</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You know your tools!" : 'Great review!'}
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
      slideId="combining-introduction"
      slideTitle="Introduction to Combining Criteria"
      moduleId="congruence"
      submoduleId="combining-congruence-criteria"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}