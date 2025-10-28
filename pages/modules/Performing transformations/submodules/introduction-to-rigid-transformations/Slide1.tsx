import React, { useState } from 'react';
// motion and AnimatePresence are kept for quiz feedback
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Animation Variants (NO LONGER USED ON CARDS) ---
// const containerVariants = { ... };
// const cardVariants = { ... };

export default function IntroToRigidTransformationsSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]); // Two questions
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'rigid-transformation-quiz',
      conceptId: 'rigid-transformation-definition',
      conceptName: 'Rigid Transformation Definition',
      type: 'judging',
      description: 'Testing understanding of rigid transformations and congruence'
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
      id: 'rigid-property-q1',
      question: 'What is the key property of a rigid transformation?',
      options: [
        'It changes the shape, not the size',
        'It changes the size, not the shape',
        'It preserves both size and shape',
        'It changes both size and shape'
      ],
      correctAnswer: 'It preserves both size and shape',
      explanation: "Correct! 'Rigid' means the shape doesn't bend, stretch, or shrink. The pre-image and image are congruent."
    },
    {
      id: 'transformation-type-q2',
      question: "Which 'rigid move' is a 'slide'?",
      options: [ 'Translation', 'Rotation', 'Reflection', 'Isometry' ],
      correctAnswer: 'Translation',
      explanation: "Correct! A Translation simply slides a figure to a new location without turning or flipping it."
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const handleQuizAnswer = (answerText: string) => {
    if (showFeedback || isQuizComplete) return;
    setSelectedAnswer(answerText);
    setShowFeedback(true);
    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);
    handleInteractionComplete({
      interactionId: `rigid-transformation-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText, isCorrect, timestamp: Date.now(),
      conceptId: 'rigid-transformation-definition', conceptName: 'Rigid Transformation Definition',
      conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
      question: { type: 'mcq', question: current.question, options: current.options }
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
      {/* --- GRID CONTAINER - NO LONGER ANIMATES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Moves That Don't Change Shape</h2>
            <p className="text-lg leading-relaxed">
              A <strong>Rigid Transformation</strong> (also called an <strong>Isometry</strong>) is a move that preserves the size and shape of a figure.
            </p>
            <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
              Think: Moving a stiff piece of cardboard. You can slide it, turn it, or flip it, but the cardboard itself doesn't stretch or shrink.
            </em>
            <p className="text-lg leading-relaxed mt-4">
              This means two key things are preserved:
            </p>
            <ul className="mt-4 space-y-2 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">✓</span>
                <span><strong>Distance:</strong> The lengths of all sides stay the same.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">✓</span>
                <span><strong>Angle Measures:</strong> All the angles stay the same.</span>
              </li>
            </ul>
          </div>

          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Congruent Figures</h3>
            <p className="text-lg leading-relaxed">
              Because size and shape are preserved, the pre-image (original) and the image (new figure) are <strong>congruent</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              The symbol for congruent is ≅. We can say △ABC ≅ △A'B'C'.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              The 3 types of rigid transformations are:
            </p>
            <ul className="mt-4 space-y-3 text-lg list-disc list-inside">
              <li><strong>Translation</strong> (a <strong>"slide"</strong> ➡️)</li>
              <li><strong>Rotation</strong> (a <strong>"turn"</strong> 🔄)</li>
              <li><strong>Reflection</strong> (a <strong>"flip"</strong> 🪞)</li>
            </ul>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Three "Rigid Moves"</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-6">
              <div className="flex flex-col items-center justify-center p-3 bg-slate-100 dark:bg-slate-700/60 rounded-lg">
                <span className="text-4xl text-blue-500">➡️</span>
                <p className="font-semibold text-lg mt-2">Translation</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">(slide)</p>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-slate-100 dark:bg-slate-700/60 rounded-lg">
                <span className="text-4xl text-blue-500">🔄</span>
                <p className="font-semibold text-lg mt-2">Rotation</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">(turn)</p>
              </div>
              <div className="flex flex-col items-center justify-center p-3 bg-slate-100 dark:bg-slate-700/60 rounded-lg">
                <span className="text-4xl text-blue-500">🪞</span>
                <p className="font-semibold text-lg mt-2">Reflection</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">(flip)</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Notice how the new shape (image) is always congruent (≅) to the original (pre-image).
            </p>
          </div>

          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            <div className="flex space-x-2 mb-6">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500'
                      : questionsAnswered[index]
                      ? 'bg-blue-300 dark:bg-blue-800'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, idx) => {
                    const disabled = showFeedback;
                    const selected = selectedAnswer === option;
                    const correct = option === questions[currentQuestionIndex].correctAnswer;

                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-slate-400 bg-slate-100 dark:bg-slate-800 opacity-70'
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
                      className={`mt-4 p-4 rounded-lg ${
                        selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                          : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700'
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
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'Perfect! You\'re a rigid transformation expert!' : 'Great job!'}
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
      slideId="rigid-intro"
      slideTitle="Rigid Transformations Intro"
      moduleId="performing-transformations"
      submoduleId="introduction-to-rigid-transformations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}