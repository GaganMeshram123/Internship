import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATED QUIZ FIGURE ---
const EqualityQuizFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const { isDarkMode } = useThemeContext();
  const textColor = isDarkMode ? '#E2E8F0' : '#1E293B';
  const highlight = isDarkMode ? '#60A5FA' : '#2563EB';

  const equations = [
    "5 = 5",
    "1 + 1 = 2   →   2 = 1 + 1",
    "8 - 2 = 6   and   6 = 2 · 3   →   8 - 2 = 2 · 3"
  ];

  return (
    <div className="w-full flex justify-center items-center p-6 rounded-lg bg-slate-100 dark:bg-slate-700/60">
      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.45 }}
          className="text-center font-mono text-xl font-semibold"
          style={{ color: highlight, whiteSpace: 'pre-line' }}
        >
          {equations[questionIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
// --- END FIGURE ---

export default function PropertiesSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const questions = [
    {
      id: 'properties-numbers-q1',
      question: 'Which property of equality makes "5 = 5" true?',
      options: [
        "Reflexive Property",
        "Symmetric Property",
        "Transitive Property"
      ],
      correctAnswer: "Reflexive Property",
      explanation: "Every number is equal to itself. That is the Reflexive Property."
    },
    {
      id: 'properties-numbers-q2',
      question: 'Which property of equality makes "2 = 1 + 1" true?',
      options: [
        "Transitive Property",
        "Symmetric Property",
        "Reflexive Property"
      ],
      correctAnswer: "Symmetric Property",
      explanation: "If 1 + 1 = 2, then 2 = 1 + 1. This is flipping the equation → Symmetric Property."
    },
    {
      id: 'properties-numbers-q3',
      question: 'Which property is used to conclude "8 - 2 = 2 · 3"?',
      options: [
        "Reflexive Property",
        "Transitive Property",
        "Symmetric Property"
      ],
      correctAnswer: "Transitive Property",
      explanation: "We chain equal values: if A = B and B = C, then A = C."
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
    if (isCorrect) setScore(prev => prev + 1);

    handleInteractionComplete({
      interactionId: `properties-numbers-q${currentQuestionIndex + 1}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'properties-of-equality-numbers',
      conceptName: 'Equality of Numbers',
      conceptDescription: `Slide 3 quiz answer`,
      question: { type: 'mcq', question: current.question, options: current.options }
    });
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

  return (
    <SlideComponentWrapper
      slideId="properties-equality-numbers"
      slideTitle="Equality of Numbers Example"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      <div className="w-full min-h-screen p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left Section */}
        <div className="space-y-6">
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
  <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Explanation</h2>

  <p className="text-lg leading-relaxed mb-6">
    The following properties are valid for all integers <em>a</em>, <em>b</em>, and <em>c</em>:
  </p>

  <ul className="list-disc list-inside space-y-6 text-lg text-slate-700 dark:text-slate-300">

    <li>
      <strong>Reflexive property of equality:</strong>
      <div className="mt-2 font-mono bg-slate-100 dark:bg-slate-700 p-2 rounded text-center">a = a</div>
      <p className="mt-1">This states that every number equals itself.</p>
    </li>

    <li>
      <strong>Symmetric property of equality:</strong>
      <div className="mt-2 font-mono bg-slate-100 dark:bg-slate-700 p-2 rounded text-center">If a = b, then b = a</div>
      <p className="mt-1">This states that if the first number equals the second, the second must equal the first.</p>
    </li>

    <li>
      <strong>Transitive property of equality:</strong>
      <div className="mt-2 font-mono bg-slate-100 dark:bg-slate-700 p-2 rounded text-center">If a = b and b = c, then a = c</div>
      <p className="mt-1">This states that if the first equals the second and the second equals the third, then the first equals the third.</p>
    </li>

  </ul>

  <div className="mt-8 p-4 rounded-lg bg-slate-100 dark:bg-slate-700 text-center font-mono text-lg">
    If 2·5 = 10 and 10 = 4 + 6, then 2·5 = 4 + 6.
  </div>

  <p className="mt-4 text-lg">
    Therefore, this statement is true by the <strong className="text-blue-600 dark:text-blue-400">transitive</strong> property of equality.
  </p>
</div>


          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Review: Properties of Equality</h3>
            <ul className="space-y-3">
              <li><strong>Reflexive:</strong> a = a</li>
              <li><strong>Symmetric:</strong> If a = b, then b = a</li>
              <li><strong>Transitive:</strong> If a = b and b = c, then a = c</li>
            </ul>
          </div>
        </div>

        {/* Right Section - Quiz */}
        <div className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Name the Property</h3>

          <div className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded flex overflow-hidden mb-4">
            {questions.map((_, i) => (
              <div key={i} className={`flex-1 ${i === currentQuestionIndex ? 'bg-blue-500' : questionsAnswered[i] ? 'bg-blue-300 dark:bg-blue-700' : ''}`} />
            ))}
          </div>

          <EqualityQuizFigure questionIndex={currentQuestionIndex} />

          {!isQuizComplete ? (
            <>
              <div className="mt-6 text-lg">{questions[currentQuestionIndex].question}</div>
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((op, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(op)}
                    className={`w-full p-3 rounded-lg border transition ${
                      selectedAnswer === op ? 'border-blue-500' : 'border-slate-400'
                    }`}
                    disabled={showFeedback}
                  >
                    {op}
                  </button>
                ))}
              </div>

              {showFeedback && (
                <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                  <p>{questions[currentQuestionIndex].explanation}</p>
                  <button
                    onClick={handleNextQuestion}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Quiz Complete!</h2>
              <p className="mt-2 text-lg">Score: {score} / {questions.length}</p>
            </div>
          )}
        </div>
      </div>
    </SlideComponentWrapper>
  );
}
