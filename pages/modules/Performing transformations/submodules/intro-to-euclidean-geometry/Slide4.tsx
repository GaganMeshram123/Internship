import React, { useState } from 'react';
// motion and AnimatePresence are kept for quiz feedback
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Animation Variants (NO LONGER USED ON CARDS) ---
// const containerVariants = { ... };
// const cardVariants = { ... };

export default function IntroToEuclideanGeometrySlide4() {
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
      id: 'geometry-definitions-quiz',
      conceptId: 'geometry-definitions',
      conceptName: 'Geometry Definitions Quiz',
      type: 'judging',
      description: 'Testing understanding of complex geometry definitions'
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
      id: 'angle-q1',
      question: 'What is formed by two rays that share a common endpoint?',
      options: [ 'An Angle', 'A Polygon', 'Parallel Lines', 'A Line Segment' ],
      correctAnswer: 'An Angle',
      explanation: 'Correct! The common endpoint is called the vertex, and the two rays are the sides of the angle.'
    },
    {
      id: 'parallel-q2',
      question: 'What do we call two lines on a plane that never intersect?',
      options: [ 'Perpendicular Lines', 'Parallel Lines', 'A Polygon', 'Rays' ],
      correctAnswer: 'Parallel Lines',
      explanation: "Correct! Parallel lines (like ||) always stay the same distance apart, so they'll never cross."
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
      interactionId: `geometry-definitions-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText, isCorrect, timestamp: Date.now(),
      conceptId: 'geometry-definitions', conceptName: 'Geometry Definitions Quiz',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Using Our New Terms</h2>
            <p className="text-lg leading-relaxed">
              Now we can combine our basic "words" to define more complex ideas.
            </p>
            <ul className="mt-4 space-y-4 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2 text-xl">∠</span>
                <span>
                  <strong>Angle:</strong> Formed by two <strong>rays</strong> that share a common endpoint (called the vertex).
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: The corner of a book. We measure angles in degrees (°).</em>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2 text-xl">||</span>
                <span>
                  <strong>Parallel Lines:</strong> Two <strong>lines</strong> on a <strong>plane</strong> that never meet.
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: Railroad tracks. They always stay the same distance apart.</em>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2 text-xl">⊥</span>
                <span>
                  <strong>Perpendicular Lines:</strong> Two <strong>lines</strong> that intersect at a perfect $90^\circ$ <strong>angle</strong>.
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: The corner of a window, where a wall meets the floor.</em>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2 text-xl">⬠</span>
                <span>
                  <strong>Polygon:</strong> A <strong>closed</strong> shape on a <strong>plane</strong> made of straight <strong>line segments</strong>.
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: A stop sign (an octagon) or a slice of pizza (a triangle).</em>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing Definitions</h3>
            <div className="grid grid-cols-2 gap-4 text-center mt-4">
              <div className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg">
                <span className="text-5xl text-blue-500">∠</span>
                <p className="font-semibold text-lg mt-2">Angle</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg">
                <span className="text-5xl text-blue-500">||</span>
                <p className="font-semibold text-lg mt-2">Parallel</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg">
                <span className="text-5xl text-blue-500">⊥</span>
                <p className="font-semibold text-lg mt-2">Perpendicular</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg">
                <span className="text-5xl text-blue-500">⬠</span>
                <p className="font-semibold text-lg mt-2">Polygon</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              These new terms are all built from the basic "words" you already know!
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
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You\'ve mastered the definitions!' : 'Great job!'}
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
      slideId="geometric-definitions"
      slideTitle="Geometric Definitions Example"
      moduleId="performing-transformations"
      submoduleId="intro-to-euclidean-geometry"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}