import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function IntroToRigidTransformationsSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  // --- UPDATED FOR 2 QUESTIONS ---
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'translation-intro-quiz',
      conceptId: 'translation-definition',
      conceptName: 'Translation Definition',
      type: 'judging',
      description: 'Testing understanding of translation as a slide'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED QUESTIONS ARRAY (2 TOTAL) ---
  const questions: QuizQuestion[] = [
    {
      id: 'translation-definition-q1',
      question: 'A translation is often called a...?',
      options: [
        'Turn',
        'Flip',
        'Slide',
        'Resize'
      ],
      correctAnswer: 'Slide',
      explanation: "Correct! A translation is a 'slide' because the shape moves without turning or flipping over."
    },
    {
      id: 'translation-rule-q2',
      question: 'A point is at (3, 2). Where will it be after the translation (x, y) → (x + 2, y - 5)?',
      options: [
        '(5, -3)',
        '(1, -3)',
        '(5, 7)',
        '(1, 7)'
      ],
      correctAnswer: '(5, -3)',
      explanation: "Correct! We add the numbers: 3 + 2 = 5 for x, and 2 - 5 = -3 for y. The new point is (5, -3)."
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
      interactionId: `translation-intro-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'translation-definition',
      conceptName: 'Translation Definition',
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
          {/* --- CARD 1: UPDATED WITH ANALOGY --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Rigid Move 1: Translation</h2>
            <p className="text-lg leading-relaxed">
              A <strong>Translation</strong> is the formal name for a "slide."
            </p>
            <p className="text-lg leading-relaxed mt-4">
              In a translation, <strong>every point</strong> of the pre-image moves the <strong>exact same distance</strong> in the <strong>exact same direction</strong> to create the image.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              The shape's <strong>orientation</strong> (which way it's facing) does not change.
            </p>
            {/* --- ANALOGY ADDED --- */}
            <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
              Think: Sliding a book across your desk without turning it, or a chess rook ♟️ moving.
            </em>
          </div>

          {/* --- CARD 2: UPDATED WITH RULE BREAKDOWN & SYMBOL FIXES --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Describing a Slide</h3>
            <p className="text-lg leading-relaxed">
              {/* --- SYMBOL FIX: Replaced $ with HTML entities --- */}
              We describe a translation using a <strong>translation vector</strong> &lt;a, b&gt; or a <strong>coordinate rule</strong> (x, y) → (x + a, y + b).
            </p>
            
            {/* --- RULE BREAKDOWN ADDED --- */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Decoding the Rule: $(x + a, y + b)$</h4>
              <ul className="mt-2 space-y-2 text-lg">
                <li className="flex items-start">
                  <span className="font-bold text-blue-500 mr-2 text-xl">↔</span>
                  <span><strong>$a$ (horizontal):</strong> If $a$ is positive, move <strong>right</strong>. If negative, move <strong>left</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-blue-500 mr-2 text-xl">↕</span>
                  <span><strong>$b$ (vertical):</strong> If $b$ is positive, move <strong>up</strong>. If negative, move <strong>down</strong>.</span>
                </li>
              </ul>
            </div>
            
            {/* --- EXAMPLE UPDATED & SYMBOL FIX --- */}
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                <strong>Example:</strong> The rule $(x, y) \to (x + 4, y - 2)$ means "slide every point 4 units to the <strong>right</strong>, and 2 units <strong>down</strong>."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          {/* --- UPDATED VISUAL --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing a "Slide"</h3>
            
            <div className="flex items-center justify-center space-x-4 text-center mt-6 p-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg">
              
              <div className="flex flex-col items-center">
                <span className="text-4xl">🟦</span>
                <p className="font-semibold text-lg mt-2">Pre-Image</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">(Original)</p>
              </div>
              
              <div className="flex flex-col items-center text-blue-500">
                <span className="text-2xl font-bold">→</span>
                <p className="text-sm font-semibold">(x + a, y + b)</p>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-4xl">🟦</span>
                <p className="font-semibold text-lg mt-2">Image</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">(New)</p>
              </div>

            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Every point slides the *exact same* distance and direction. The shape's orientation (which way it faces) doesn't change.
            </p>
          </motion.div>
          {/* --- END UPDATED VISUAL --- */}

          {/* --- KNOWLEDGE CHECK CARD (WITH 2 QUESTIONS & COLOR FIXES) --- */}
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
                <div className="text-3xl mb-4">➡️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You know your translations!' : 'Great job!'}
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
      slideId="translations-intro"
      slideTitle="Translations Intro"
      moduleId="performing-transformations"
      submoduleId="introduction-to-rigid-transformations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}