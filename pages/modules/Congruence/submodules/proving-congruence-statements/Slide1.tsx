import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- HELPER COMPONENT FOR DEFINITIONS ---
const DefinitionItem: React.FC<{ term: string; definition: string }> = ({ term, definition }) => (
  <li className="mb-4">
    <h4 className="text-lg font-semibold">{term}:</h4>
    <div className="mt-2 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300">
      {definition}
    </div>
  </li>
);
// --- END OF HELPER COMPONENT ---


export default function ProvingSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  // --- UPDATED: Now 3 questions ---
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'proving-definitions-quiz',
      conceptId: 'proving-definitions',
      conceptName: 'Proof Prerequisites: Definitions',
      type: 'judging',
      description: 'Testing understanding of core geometry definitions'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED: New questions based on definitions ---
  const questions: QuizQuestion[] = [
    {
      id: 'proving-definitions-q1',
      question: 'What is the definition of a midpoint?',
      options: [
        "The point that splits a line segment into two segments of equal length.",
        "A line that divides an angle into two congruent angles.",
        "A line segment from a vertex to the midpoint of the opposite side.",
        "A triangle with three congruent sides."
      ],
      correctAnswer: "The point that splits a line segment into two segments of equal length.",
      explanation: "Correct! A midpoint divides a segment into two equal parts."
    },
    {
      id: 'proving-definitions-q2',
      question: 'A line that divides an angle into two congruent angles is called...?',
      options: [
        "A median",
        "An angle bisector",
        "An altitude",
        "A perpendicular line"
      ],
      correctAnswer: "An angle bisector",
      explanation: "Correct! 'Bi-sect' means to cut in two, so an angle bisector cuts an angle into two equal, congruent angles."
    },
    {
      id: 'proving-definitions-q3',
      question: 'What is an altitude (height) of a triangle?',
      options: [
        "A line segment joining a vertex to the midpoint of the opposite side.",
        "A line segment from a vertex perpendicular to the opposite side.",
        "A triangle with a right angle.",
        "A line that divides an angle into two congruent angles."
      ],
      correctAnswer: "A line segment from a vertex perpendicular to the opposite side.",
      explanation: "Correct! An altitude measures the height of a triangle by forming a right angle with the opposite base."
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
      interactionId: `proving-definitions-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-definitions',
      conceptName: 'Proof Definitions',
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


  // --- UPDATED: All new slide content ---
  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* --- CARD 1: Introduction --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Introduction</h2>
            <p className="text-lg leading-relaxed">
              In this lesson, we'll learn how to prove statements concerning congruent triangles.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Before we start, let's remind ourselves of some definitions. These will be useful for the proofs that follow:
            </p>
          </div>

          {/* --- CARD 2: Core Concepts --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Core Concepts</h3>
            <ul className="list-none space-y-2 text-lg text-slate-700 dark:text-slate-300">
              <DefinitionItem
                term="Congruent segments"
                definition="Two segments are congruent if they have the same length."
              />
              <DefinitionItem
                term="Angle bisector"
                definition="An angle bisector is a line that divides an angle into two congruent angles."
              />
              <DefinitionItem
                term="Midpoint"
                definition="The midpoint of a line segment is the point that splits it into two segments of equal length."
              />
              <DefinitionItem
                term="Perpendicular lines"
                definition="Two lines are perpendicular if they form a right angle at their intersection point."
              />
            </ul>
          </div>
          
          {/* --- CARD 3: Other Tools --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Other Tools We'll Use</h3>
            <ul className="list-disc list-inside text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>The right angle postulate: <strong>All right angles are congruent.</strong></li>
              <li>The <strong>SSS, SAS, AAS, ASA, and HL</strong> congruence criteria for triangles.</li>
              <li>The <strong>reflexive, symmetric, and transitive properties</strong> of equality and congruence.</li>
            </ul>
          </div>
        </div>

        {/* Right Column - Definitions and Quiz */}
        <div className="space-y-6">
          {/* --- CARD 4: Triangle Terms --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Key Triangle Terms</h3>
            <ul className="list-none space-y-2 text-lg text-slate-700 dark:text-slate-300">
              <DefinitionItem
                term="Equilateral triangle"
                definition="A triangle is equilateral if all three sides are congruent."
              />
              <DefinitionItem
                term="Isosceles triangle"
                definition="A triangle is isosceles if two (and only two) sides are congruent."
              />
              <DefinitionItem
                term="Right triangle"
                definition="A triangle is right if one of its internal angles is a right angle."
              />
              <DefinitionItem
                term="Median"
                definition="A median of a triangle is a line segment joining a vertex to the midpoint of the opposite side."
              />
              <DefinitionItem
                term="Altitude (or Height)"
                definition="An altitude (height) of a triangle is a line segment drawn from one vertex of the triangle perpendicular to the opposite side (or the extension of the opposite side)."
              />
            </ul>
          </div>

          {/* --- KNOWLEDGE CHECK CARD (Now 3 questions) --- */}
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
                <div className="text-3xl mb-4">📚</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered the definitions!" : 'Great review!'}
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
      // --- UPDATED Props ---
      slideId="proving-definitions"
      slideTitle="Proof Prerequisites: Definitions"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}