import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- NEW EQUIVALENCE DIAGRAM FIGURE ---
const EquivalenceDiagram: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const colorMain = isDarkMode ? '#60A5FA' : '#2563EB';
  const colorText = isDarkMode ? '#E2E8F0' : '#1E293B';

  return (
    <div className="w-full flex justify-center items-center p-4 bg-slate-100 dark:bg-slate-700/60 rounded-xl">
      <svg width="320" height="240" viewBox="0 0 320 240">
        {/* Outer Circle */}
        <circle cx="160" cy="120" r="100" fill="none" stroke={colorMain} strokeWidth="3" />

        {/* Small Circles */}
        <circle cx="160" cy="120" r="33" fill={colorMain} opacity="0.4" />
        <circle cx="110" cy="80" r="28" fill={colorMain} opacity="0.4" />
        <circle cx="210" cy="80" r="28" fill={colorMain} opacity="0.4" />
        <circle cx="110" cy="160" r="28" fill={colorMain} opacity="0.4" />
        <circle cx="210" cy="160" r="28" fill={colorMain} opacity="0.4" />

        {/* Labels */}
        <text x="153" y="125" fill={colorText} fontSize="16">2</text>
        <text x="100" y="85" fill={colorText} fontSize="14">1+1</text>
        <text x="199" y="85" fill={colorText} fontSize="14">2/1</text>
        <text x="98" y="166" fill={colorText} fontSize="14">3−1</text>
        <text x="197" y="166" fill={colorText} fontSize="14">4/2</text>

        {/* Dots */}
        <text x="155" y="200" fontSize="20" fill={colorText}>...</text>
      </svg>
    </div>
  );
};

// --- SLIDE COMPONENT ---
export default function PropertiesSlide1() {

  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const questions = [
    {
      id: 'prop-eq-q1',
      question: 'Which of the following is an equivalent representation of the number 2?',
      options: ["5 - 4", "1 + 1", "8 ÷ 3", "6 - 3"],
      correctAnswer: "1 + 1",
      explanation: "Correct! 1 + 1 equals 2. Equivalent expressions represent the same value."
    },
    {
      id: 'prop-eq-q2',
      question: 'Which property says that if 1+1 = 2, then 2 = 1+1?',
      options: ["Reflexive", "Symmetric", "Transitive", "Associative"],
      correctAnswer: "Symmetric",
      explanation: "Yes! The symmetric property allows the order of equality to be reversed."
    }
  ];

  const handleQuizAnswer = (answerText: string) => {
    if (showFeedback || isQuizComplete) return;
    setSelectedAnswer(answerText);
    setShowFeedback(true);

    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);
  };

  const handleNextQuestion = () => {
    const newAnswered = [...questionsAnswered];
    newAnswered[currentQuestionIndex] = true;
    setQuestionsAnswered(newAnswered);
    setSelectedAnswer('');
    setShowFeedback(false);

    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
    else setIsQuizComplete(true);
  };

  return (
    <SlideComponentWrapper
      slideId="properties-introduction"
      slideTitle="Introduction to Properties of Congruence"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

        {/* LEFT SIDE CONTENT */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">What Does it Mean to Be Equal?</h2>
            <p className="text-lg leading-relaxed">
              Many different expressions can represent the same number. For example:
            </p>
            <p className="text-lg text-center font-semibold mt-4">1 + 1 = 2 = 3 − 1 = 4 ÷ 2 = 2/1</p>
            <p className="text-lg leading-relaxed mt-4">
              All of these represent the same number: <strong>2</strong>. We say they are <strong>equivalent representations</strong>.
            </p>

            <div className="mt-6 flex justify-center">
              <EquivalenceDiagram />
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-600 dark:text-blue-400">Equality Has 3 Key Properties</h3>
            <ul className="list-disc ml-6 text-lg">
              <li><strong>Reflexive:</strong> 2 = 2</li>
              <li><strong>Symmetric:</strong> If 1+1 = 2, then 2 = 1+1</li>
              <li><strong>Transitive:</strong> If 1+1 = 2 and 2 = 3−1, then 1+1 = 3−1</li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE QUIZ */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">

          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Knowledge Check</h3>

          {!isQuizComplete ? (
            <>
              <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option, idx) => (
                  <motion.button key={idx}
                    onClick={() => handleQuizAnswer(option)}
                    disabled={showFeedback}
                    className="w-full p-3 rounded-lg border border-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/40">
                    {option}
                  </motion.button>
                ))}
              </div>

              {showFeedback && (
                <motion.div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p>{questions[currentQuestionIndex].explanation}</p>
                  <button onClick={handleNextQuestion} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                    {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish"}
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-3xl mb-4">✅</div>
              <p className="text-xl font-semibold">Quiz Complete!</p>
              <p className="text-lg mt-2">You scored {score} out of {questions.length}</p>
            </div>
          )}

        </div>

      </div>
    </SlideComponentWrapper>
  );
}
