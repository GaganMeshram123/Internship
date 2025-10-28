import React, { useState } from 'react';
// motion and AnimatePresence are kept for quiz feedback
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Animation Variants (NO LONGER USED ON CARDS) ---
// const containerVariants = { ... };
// const cardVariants = { ... };

export default function IntroToEuclideanGeometrySlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'euclid-history-quiz',
      conceptId: 'geometry-history',
      conceptName: 'Geometry History Quiz',
      type: 'judging',
      description: 'Testing understanding of Euclid'
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
      id: 'euclid-book-q1',
      question: 'What is the name of the famous "rulebook" of geometry written by Euclid?',
      options: [ 'The Republic', 'Elements', 'The Geometry Code', 'Principia Mathematica' ],
      correctAnswer: 'Elements',
      explanation: "That's right! Euclid's 'Elements' is one of the most influential books in history and set the foundation for geometry for over 2000 years."
    },
    {
      id: 'euclid-title-q2',
      question: 'Why is Euclid often called the "Father of Geometry"?',
      options: [
        'He invented triangles and circles.',
        'He was the first math teacher in Greece.',
        'He collected all the known geometric knowledge of his time into one "rulebook."',
        'He was the king of Alexandria.'
      ],
      correctAnswer: 'He collected all the known geometric knowledge of his time into one "rulebook."',
      explanation: 'Correct! He earned this title by organizing all the geometric proofs and rules of his time into his 13-volume book, "Elements."'
    },
    {
      id: 'euclid-method-q3',
      question: 'What is the main method Euclid used in his book, "Elements"?',
      options: [
        'He wrote stories about famous mathematicians.',
        'He built up the entire system of geometry using logical proof from simple definitions.',
        'He only wrote down problems for students to solve.',
        'He guessed the rules based on measuring shapes.'
      ],
      correctAnswer: 'He built up the entire system of geometry using logical proof from simple definitions.',
      explanation: 'Exactly! He started with simple, "obvious" definitions (like what a point is) and logically proved every other rule from there.'
    },
    {
      id: 'euclid-volumes-q4',
      question: 'The "rulebook" Euclid wrote was massive. How many volumes (or books) did it contain?',
      options: [ '2', '5', '13', '50' ],
      correctAnswer: '13',
      explanation: "That's right! It was a huge 13-volume collection that covered planes, 3D shapes, and number theory."
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
      interactionId: `euclid-history-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText, isCorrect, timestamp: Date.now(),
      conceptId: 'geometry-history', conceptName: 'Geometry History Quiz',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Euclid: The Father of Geometry</h2>
            <p className="text-lg leading-relaxed">
              The "rules" for the world our shapes live in were written down over 2,000 years ago by a Greek mathematician named <strong>Euclid</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              He is often called the "Father of Geometry" because he collected all the known geometric knowledge of his time into a 13-volume "rulebook."
            </p>
          </div>

          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The "Elements"</h3>
            <p className="text-lg leading-relaxed">
              Euclid's book, called <strong>"Elements,"</strong> is one of the most important and influential books ever written.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              It starts with just a few simple definitions (like "a point is that which has no part") and builds up the entire system of geometry from logical proof. The rules in this book are the ones we still use today!
            </p>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">

          {/* --- CARD - NO LONGER ANIMATES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Key Ideas from "Elements"
            </h3>
            <p className="text-lg leading-relaxed">
              Euclid's genius was starting with a few simple rules, called <strong>postulates</strong> or <strong>axioms</strong>, that were so obvious everyone agreed they were true.
            </p>
            <h4 className="text-lg font-semibold mt-4 mb-2 text-slate-700 dark:text-slate-300">The 5 "Obvious" Rules</h4>
            <ul className="list-decimal list-inside space-y-1 text-base">
              <li>A straight line can be drawn between any two points.</li>
              <li>Any straight line segment can be extended indefinitely.</li>
              <li>A circle can be drawn with any center and any radius.</li>
              <li>All right angles are equal to one another.</li>
              <li>(The parallel postulate - about lines never meeting)</li> {/* Simplified 5th */}
            </ul>
            <h4 className="text-lg font-semibold mt-4 mb-2 text-slate-700 dark:text-slate-300">Why It Matters Today 🌎</h4>
            <ul className="list-disc list-inside space-y-1 text-base">
              <li><strong>Engineering:</strong> Designing stable bridges and buildings.</li>
              <li><strong>Computer Graphics:</strong> Creating 3D worlds in video games.</li>
              <li><strong>Navigation:</strong> GPS satellites use this geometry.</li>
            </ul>
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
                      // --- Fixed Progress Bar Color ---
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
                    // --- Fixed Answer Feedback Color Logic ---
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // Correct
                            : 'border-slate-400 bg-slate-100 dark:bg-slate-800 opacity-70' // Incorrect
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
                      // --- Fixed Feedback Box Color Logic ---
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
                <div className="text-3xl mb-4">🏛️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'Perfect! You know your history!' : 'Great job!'}
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
      slideId="euclid-history"
      slideTitle="Euclid as the Father of Geometry"
      moduleId="performing-transformations"
      submoduleId="intro-to-euclidean-geometry"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}