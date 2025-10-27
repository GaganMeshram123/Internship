import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function TranslationsSlide1() {
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
      id: 'translating-points-quiz',
      conceptId: 'translating-points',
      conceptName: 'Translating Points',
      type: 'judging',
      description: 'Testing understanding of coordinate rules and vector notation for translations'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED QUESTIONS ARRAY ---
  const questions: QuizQuestion[] = [
    {
      id: 'point-translation-rule-q1',
      // --- $ SYMBOLS REMOVED ---
      question: "How would you translate the point P(3, 5) using the rule (x, y) → (x - 2, y + 4)?",
      options: [
        "P'(1, 9)",
        "P'(5, 9)",
        "P'(1, 1)",
        "P'(5, 1)"
      ],
      correctAnswer: "P'(1, 9)",
      explanation: "Correct! We just plug in the numbers: x = 3 - 2 = 1, and y = 5 + 4 = 9. So the new point is P'(1, 9)."
    },
    {
      id: 'point-translation-vector-q2',
      // --- QUESTION UPDATED TO APPLY VECTOR NOTATION ---
      question: "How would you translate the point P(1, 1) using the vector <4, 3>?",
      options: [
        "P'(5, 4)",
        "P'(-3, -2)",
        "P'(5, 1)",
        "P'(1, 4)"
      ],
      correctAnswer: "P'(5, 4)",
      explanation: "Correct! The vector <4, 3> means 'add 4 to x' and 'add 3 to y'. So, 1 + 4 = 5 and 1 + 3 = 4. The new point is P'(5, 4)."
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
      interactionId: `translating-points-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'translating-points',
      conceptName: 'Translating Points',
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
      {/* --- UPDATED to 1 column for small screens, 2 for medium and up --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">How to "Slide" a Point</h2>
            <p className="text-lg leading-relaxed">
              {/* --- $ SYMBOLS REMOVED --- */}
              We describe a translation with a "rule" that tells us how far to move horizontally (x-direction) and vertically (y-direction).
            </p>
            <p className="text-lg leading-relaxed mt-4">
              There are two common ways to write this rule:
            </p>
          </div>

          {/* --- CARD 1: UPDATED WITH RULE BREAKDOWN --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">1. Coordinate Rule</h3>
            <p className="text-lg leading-relaxed">
              This rule shows how the $(x, y)$ coordinates change:
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              {/* --- SYMBOL UPDATED --- */}
              <p className="text-lg font-mono text-center">(x, y) → (x + a, y + b)</p>
            </div>

            {/* --- RULE BREAKDOWN ADDED --- */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <ul className="mt-2 space-y-2 text-lg">
                <li className="flex items-start">
                  <span className="font-bold text-blue-500 mr-2 text-xl">↔</span>
                  <span><strong>$a$ (horizontal):</strong> Positive $a$ is <strong>Right</strong>. Negative $a$ is <strong>Left</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-blue-500 mr-2 text-xl">↕</span>
                  <span><strong>$b$ (vertical):</strong> Positive $b$ is <strong>Up</strong>. Negative $b$ is <strong>Down</strong>.</span>
                </li>
              </ul>
            </div>
            
            <p className="text-lg leading-relaxed mt-4">
              {/* --- SYMBOL UPDATED --- */}
              <strong>Example:</strong> (x, y) → (x + 3, y - 1) means "move 3 units right, and 1 unit down."
            </p>
          </div>

          {/* --- CARD 2: UPDATED WITH SYMBOL FIXES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">2. Vector Notation</h3>
            <p className="text-lg leading-relaxed">
              A vector is a quantity with direction and magnitude. We write it with angle brackets:
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              {/* --- SYMBOLS UPDATED --- */}
              <p className="text-lg font-mono text-center">&lt;a, b&gt;</p>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              {/* --- SYMBOLS UPDATED --- */}
              <strong>Example:</strong> &lt;3, -1&gt; means "move 3 units right, and 1 unit down."
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Both rules mean the exact same thing!
            </p>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          {/* --- VISUAL CARD UPDATED (placeholder image is fine, but text is fixed) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Translating P(2, 1)</h3>
            <div className="flex justify-center">
              <img 
                src="https://via.placeholder.com/500x300.png?text=Point+P(2,1)+translated+by+%3C3,+-1%3E+to+P'(5,0)"
                alt="A coordinate plane showing a point P at (2,1) and a vector arrow pointing to a new point P' at (5,0)"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
              />
            </div>
            {/* --- $ SYMBOLS REMOVED --- */}
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The point P(2, 1) translated by &lt;3, -1&gt; becomes P'(2+3, 1-1), which is P'(5, 0).
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD (WITH COLOR FIXES) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            {/* --- Progress Bar (COLOR UPDATED) --- */}
            <div className="flex space-x-2 mb-6">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500' // Active
                      : questionsAnswered[index]
                      ? 'bg-blue-300 dark:bg-blue-800' // Answered (REMOVED GREEN)
                      : 'bg-slate-300 dark:bg-slate-600' // Unanswered
                  }`}
                />
              ))}
            </div>

            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
                {/* --- Answer Options (COLORS UPDATED) --- */}
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, idx) => {
                    const disabled = showFeedback;
                    const selected = selectedAnswer === option;
                    const correct = option === questions[currentQuestionIndex].correctAnswer;
                    
                    // --- UPDATED CLASSNAME LOGIC TO REMOVE RED/GREEN ---
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // CORRECT (now blue)
                            : 'border-slate-400 bg-slate-100 dark:bg-slate-800 opacity-70' // INCORRECT (now slate/neutral)
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // Selected (no feedback)
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
                      // --- UPDATED FEEDBACK BOX COLORS (REMOVED RED/GREEN) ---
                      className={`mt-4 p-4 rounded-lg ${
                        selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' // Correct (blue)
                          : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700' // Incorrect (slate)
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
              // --- Quiz Complete State ---
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-3xl mb-4">🎯</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You\'ve mastered the rules!' : 'Great job!'}
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
      slideId="translating-points"
      slideTitle="Translating Points"
      moduleId="performing-transformations"
      submoduleId="translations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}