import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

const EqualityPropertiesAnimation: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#374151';
  const red = isDarkMode ? '#FCA5A5' : '#DC2626';
  const blue = isDarkMode ? '#93C5FD' : '#2563EB';

  const fadeIn = (delay: number) => ({
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { delay, duration: 0.45 } },
  });

  return (
    <div className="w-full flex justify-center items-center p-6 rounded-lg bg-slate-100 dark:bg-slate-700/40 select-none">
      <div className="text-center w-full">
        
        {/* Title */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.3)}
          className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4"
        >
          Properties of Equality (=)
        </motion.div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">

          {/* Reflexive */}
          <div>
            <motion.div className="text-2xl font-mono" initial="hidden" animate="visible" variants={fadeIn(0.6)} style={{ color: red }}>
              a = a
            </motion.div>
            <motion.div className="text-sm mt-1 text-slate-600 dark:text-slate-300" initial="hidden" animate="visible" variants={fadeIn(0.9)}>
              Reflexive
            </motion.div>
          </div>

          {/* Symmetric */}
          <div>
            <motion.div className="text-lg font-mono" initial="hidden" animate="visible" variants={fadeIn(1.2)} style={{ color: blue }}>
              If a = b,<br/>then b = a
            </motion.div>
            <motion.div className="text-sm mt-1 text-slate-600 dark:text-slate-300" initial="hidden" animate="visible" variants={fadeIn(1.4)}>
              Symmetric
            </motion.div>
          </div>

          {/* Transitive */}
          <div>
            <motion.div className="text-lg font-mono" initial="hidden" animate="visible" variants={fadeIn(1.8)} style={{ color: red }}>
              If a = b and b = c,<br/>then a = c
            </motion.div>
            <motion.div className="text-sm mt-1 text-slate-600 dark:text-slate-300" initial="hidden" animate="visible" variants={fadeIn(2.0)}>
              Transitive
            </motion.div>
          </div>

        </div>

        {/* Footer */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn(2.4)}
          className="text-sm mt-6 text-slate-600 dark:text-slate-300 italic"
        >
          Congruence (≅) follows these exact same rules.
        </motion.div>

      </div>
    </div>
  );
};

export default function PropertiesSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const questions = [
    {
      id: 'properties-equality-q1',
      question: 'The statement "AB = AB" is an example of which property?',
      options: ["Symmetric Property", "Reflexive Property", "Transitive Property", "Distributive Property"],
      correctAnswer: "Reflexive Property",
      explanation: "Correct! The Reflexive Property states that any value is equal to itself."
    },
    {
      id: 'properties-equality-q2',
      question: 'If m∠A = m∠B and m∠B = m∠C, then m∠A = m∠C. This is an example of which property?',
      options: ["Symmetric Property", "Reflexive Property", "Transitive Property", "Associative Property"],
      correctAnswer: "Transitive Property",
      explanation: "Correct! The Transitive Property says if A = B and B = C, then A = C."
    }
  ];

  const handleQuizAnswer = (answerText: string) => {
    if (showFeedback || isQuizComplete) return;
    setSelectedAnswer(answerText);
    setShowFeedback(true);
    if (answerText === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1);
  };

  const handleNextQuestion = () => {
    const updated = [...questionsAnswered];
    updated[currentQuestionIndex] = true;
    setQuestionsAnswered(updated);
    setSelectedAnswer('');
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
    else setIsQuizComplete(true);
  };

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

        {/* LEFT SIDE CONTENT UPDATED */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Reflexivity, Symmetricity, and Transitivity of Equality
          </h2>

          <p className="text-lg leading-relaxed">
            Let’s now state our three properties of equality more generally:
          </p>

          <ul className="list-disc list-inside mt-4 text-lg space-y-6">
            <li>
              <strong>Reflexive property of equality:</strong>
              <div className="text-center text-xl my-2 font-mono">a = a</div>
              Every number equals itself.
            </li>
            <li>
              <strong>Symmetric property of equality:</strong>
              <div className="text-center text-xl my-2 font-mono">If a = b, then b = a</div>
              We can switch the order of the numbers in an equality.
            </li>
            <li>
              <strong>Transitive property of equality:</strong>
              <div className="text-center text-xl my-2 font-mono">If a = b and b = c, then a = c</div>
              Equality can be passed through a chain.
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE ANIMATION + QUIZ */}
        <div className="space-y-6">

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-center text-blue-600 dark:text-blue-400 mb-4">
              Algebraic Logic
            </h3>
            <EqualityPropertiesAnimation />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Name That Property</h3>

            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
                {questions[currentQuestionIndex].options.map((opt, i) => (
                  <button key={i} onClick={() => handleQuizAnswer(opt)}
                    className="w-full p-3 mb-2 rounded-lg border hover:bg-blue-50 dark:hover:bg-blue-900/30">
                    {opt}
                  </button>
                ))}

                {showFeedback && (
                  <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                    <p>{questions[currentQuestionIndex].explanation}</p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={handleNextQuestion}>
                      {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-3xl">✅</div>
                <p className="text-xl font-semibold mt-2">Quiz Complete!</p>
                <p className="text-lg">You scored {score} out of {questions.length}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="properties-equality"
      slideTitle="Reflexivity, Symmetricity, and Transitivity of Equality"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}
