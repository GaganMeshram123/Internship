import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

const TriangleCongruenceAnimation: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB';
  const color2 = isDarkMode ? '#4ADE80' : '#22C55E';

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={300} height={200}>
        {/* Original Triangle */}
        <motion.polygon
          points="50,150 120,50 190,150"
          fill={color1}
          opacity="0.7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />

        {/* Image Triangle */}
        <motion.polygon
          points="120,150 190,50 260,150"
          fill={color2}
          opacity="0.7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        />

        <text x="50" y="160" fontSize="12" fill={color1}>A</text>
        <text x="120" y="45" fontSize="12" fill={color1}>B</text>
        <text x="190" y="160" fontSize="12" fill={color1}>C</text>

        <text x="120" y="160" fontSize="12" fill={color2}>A'</text>
        <text x="190" y="45" fontSize="12" fill={color2}>B'</text>
        <text x="260" y="160" fontSize="12" fill={color2}>C'</text>

        <text x="150" y="185" fontSize="14" textAnchor="middle" fill={isDarkMode ? 'white' : 'black'}>
          △ABC ≅ △A′B′C′
        </text>
      </svg>
    </div>
  );
};

export default function RigidMotionsSlide7() {
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
      id: 'rigid-motions-congruence-quiz',
      conceptId: 'rigid-motions-congruence',
      conceptName: 'Congruence from Rigid Motions',
      type: 'judging',
      description: 'Testing congruence properties'
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
      id: 'rigid-motions-cong-q1',
      question: 'Rigid motions preserve which of the following?',
      options: ["Only distance", "Only angles", "Both distance and angles", "Neither distance nor angles"],
      correctAnswer: "Both distance and angles",
      explanation: "Rigid motions preserve both side lengths and angle measures."
    },
    {
      id: 'rigid-motions-cong-q2',
      question: 'If △ABC is mapped to △A′B′C′ using a rigid motion, what can we conclude?',
      options: ["They are similar", "They are congruent", "Their area changes", "Their shape changes"],
      correctAnswer: "They are congruent",
      explanation: "Rigid motions do not change shape or size, so the triangles must be congruent."
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
      interactionId: `rigid-motions-cong-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'rigid-motions-congruence',
      conceptName: 'Congruence from Rigid Motions',
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

        {/* LEFT CONTENT */}
        <div className="space-y-6">

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Further Properties of Rigid Motions
            </h2>

            <p className="text-lg leading-relaxed">
              Rigid motions are <strong>distance-preserving</strong>. If △ABC maps to △A′B′C′, then:
            </p>
            <p className="mt-2 text-lg">AB = A′B′, AC = A′C′, BC = B′C′</p>

            <p className="text-lg leading-relaxed mt-4">
              Rigid motions are also <strong>angle-preserving</strong>. So:
            </p>
            <p className="mt-2 text-lg">m∠A = m∠A′, m∠B = m∠B′, m∠C = m∠C′</p>

            <p className="text-lg mt-4">
              Therefore, the triangles are <strong>congruent</strong>.
            </p>

            <p className="font-semibold text-lg mt-2 text-center">
              △ABC ≅ △A′B′C′
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN (FIGURE + QUIZ) */}
        <div className="space-y-6">

          {/* FIGURE */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
              Congruent Triangle Animation
            </h3>
            <TriangleCongruenceAnimation />
          </div>

          {/* QUIZ */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>

              {questions[currentQuestionIndex].options.map((option, idx) => {
                const disabled = showFeedback;
                const selected = selectedAnswer === option;
                const correct = option === questions[currentQuestionIndex].correctAnswer;
                const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                  selected
                    ? showFeedback
                      ? correct
                        ? 'border-green-500 bg-green-100 dark:bg-green-900/30'
                        : 'border-red-500 bg-red-100 dark:bg-red-900/30'
                      : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
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

            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/40"
                >
                  <div className="text-lg mb-4">
                    {questions[currentQuestionIndex].explanation}
                  </div>

                  <motion.button
                    onClick={handleNextQuestion}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="rigid-motions-congruence"
      slideTitle="Further Properties: Congruence of Triangles"
      moduleId="congruence"
      submoduleId="rigid-motions-and-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}
