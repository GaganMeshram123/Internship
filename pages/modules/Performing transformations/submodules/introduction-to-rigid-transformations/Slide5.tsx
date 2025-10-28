import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function IntroToRigidTransformationsSlide5() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false, false]); // 4 questions
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'identify-transformation-quiz',
      conceptId: 'transformation-identification',
      conceptName: 'Transformation Identification',
      type: 'judging',
      description: 'Testing ability to identify transformations from images'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    image: string; // Add image property
  }

  const questions: QuizQuestion[] = [
    {
      id: 'identify-q1-translation',
      question: 'Name This Move: The blue shape moves to become the green shape.',
      options: ['Translation (Slide)', 'Rotation (Turn)', 'Reflection (Flip)', 'Dilation (Resize)'],
      correctAnswer: 'Translation (Slide)',
      explanation: 'Correct! The shape just slid to a new position. That\'s a Translation.',
      image: 'https://via.placeholder.com/400x250.png?text=Translation+Example'
    },
    {
      id: 'identify-q2-rotation',
      question: 'Name This Move: The blue shape moves to become the green shape.',
      options: ['Translation (Slide)', 'Rotation (Turn)', 'Reflection (Flip)', 'Dilation (Resize)'],
      correctAnswer: 'Rotation (Turn)',
      explanation: 'Correct! The shape turned around a center point. That\'s a Rotation.',
      image: 'https://via.placeholder.com/400x250.png?text=Rotation+Example'
    },
    {
      id: 'identify-q3-reflection',
      question: 'Name This Move: The blue shape moves to become the green shape.',
      options: ['Translation (Slide)', 'Rotation (Turn)', 'Reflection (Flip)', 'Dilation (Resize)'],
      correctAnswer: 'Reflection (Flip)',
      explanation: 'Correct! The shape flipped over a "mirror line." That\'s a Reflection.',
      image: 'https://via.placeholder.com/400x250.png?text=Reflection+Example'
    },
    {
      id: 'identify-q4-dilation',
      question: 'Name This Move: The blue shape moves to become the green shape.',
      options: ['Translation (Slide)', 'Rotation (Turn)', 'Reflection (Flip)', 'Dilation (Resize)'],
      correctAnswer: 'Dilation (Resize)',
      explanation: 'Correct! The shape changed size (it got smaller). That\'s a Dilation.',
      image: 'https://via.placeholder.com/400x250.png?text=Dilation+Example'
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
      interactionId: `identify-transformation-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'transformation-identification',
      conceptName: 'Transformation Identification',
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto ">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Identify the Transformation</h2>
            <p className="text-lg leading-relaxed">
              Let's put it all together. Look at the pre-image (blue) and the image (green).
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Can you name which of the four moves happened?
            </p>
          </div>

          {/* --- UPDATED "HOW TO" CHEAT SHEET --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">How to Tell the Difference</h3>
            <p className="text-lg leading-relaxed">Ask yourself these questions in order:</p>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">1.</span>
                <div>
                  <strong>Did the size change?</strong>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>YES</strong> → It's a <strong>Dilation (Resize)</strong> 📏</div>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>NO</strong> → Go to question 2...</div>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">2.</span>
                <div>
                  <strong>Did the orientation (facing) change?</strong>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>NO</strong> → It's a <strong>Translation (Slide)</strong> ➡️</div>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>YES</strong> → Go to question 3...</div>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">3.</span>
                <div>
                  <strong>Is it a mirror image?</strong>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>YES</strong> → It's a <strong>Reflection (Flip)</strong> 🪞</div>
                  <div className="text-base text-slate-600 dark:text-slate-400"><strong>NO</strong> → It's a <strong>Rotation (Turn)</strong> 🔄</div>
                </div>
              </li>
            </ul>
          </div>
          {/* --- END UPDATED CHEAT SHEET --- */}
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            {/* --- Progress Bar (COLOR UPDATED) --- */}
           { <div className="flex space-x-2 mb-6">
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
            </div>}

            {!isQuizComplete ? (
              <>
                {/* Image for the current question */}
                {/* <div className="flex justify-center mb-4">
                  <img 
                    src={questions[currentQuestionIndex].image}
                    alt="Transformation example for quiz"
                    className="max-w-full h-auto rounded-lg shadow-md"
                    style={{ width: '100%', maxWidth: '400px', height: 'auto' }}
                  />
                </div> */}
              
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
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-3xl mb-4">🏆</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'Perfect score! You\'re a transformation identifier!' : 'Great job! 👏'}
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
      slideId="identifying-transformations"
      slideTitle="Identifying Transformations"
      moduleId="performing-transformations"
      submoduleId="introduction-to-rigid-transformations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}