import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Fix 1: Correct the import paths
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

import { useThemeContext } from '@/lib/ThemeContext';

export default function DilationsSlide2() {
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
      id: 'scale-factor-quiz',
      conceptId: 'scale-factor',
      conceptName: 'Scale Factor',
      type: 'judging',
      description: 'Testing understanding of scale factor (enlargement vs reduction)'
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
      id: 'scale-factor-type-q1',
      question: "A dilation with a scale factor of $k = 0.5$ is an...?",
      options: [
        'Enlargement',
        'Reduction',
        'Translation',
        'Reflection'
      ],
      correctAnswer: 'Reduction',
      explanation: "Correct! Since the scale factor $k$ is between 0 and 1 (0 < 0.5 < 1), it is a reduction (it shrinks the shape)."
    },
    {
      id: 'scale-factor-find-q2',
      question: "A pre-image line segment is 5 units long. Its image after a dilation is 15 units long. What is the scale factor $k$?",
      options: [
        '$k = 3$',
        '$k = 1/3$',
        '$k = 10$',
        '$k = 5$'
      ],
      correctAnswer: '$k = 3$',
      // Fix 2a: Format the formula for JSX
      explanation: "Correct! The formula is k = (image length) / (pre-image length). So, k = 15 / 5 = 3. Since k > 1, it's an enlargement."
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
      interactionId: `scale-factor-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'scale-factor',
      conceptName: 'Scale Factor',
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
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What is a Scale Factor ($k$)?</h2>
            <p className="text-lg leading-relaxed">
              The <strong>scale factor</strong>, which we call <strong>$k$</strong>, is the "multiplier" that tells you how much to resize the shape.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              You can find it by dividing the length of a side on the <strong>image</strong> by the length of the matching side on the <strong>pre-image</strong>.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              {/* Formula String (Corrected) */}
              <p className="text-lg font-mono text-center font-bold">{"$k = \\frac{\\text{image length}}{\\text{pre-image length}}$"}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Bigger or Smaller?</h3>
            <p className="text-lg leading-relaxed">
              The value of $k$ tells you what kind of dilation it is:
            </p>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">►</span>
                {/* Use HTML entity for > */}
                <span><strong>Enlargement:</strong> The shape gets bigger. This happens when $|k| &gt; 1$. (e.g., $k=2, k=5, k=-3$)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">►</span>
                {/* Use HTML entities for < */}
                <span><strong>Reduction:</strong> The shape gets smaller. This happens when $0 &lt; |k| &lt; 1$. (e.g., $k=0.5, k=1/3, k=-0.25$)</span>
              </li>
            </ul>
          </div>
          
          {/* NEW BLOCK: Dilation in the Coordinate Plane */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Dilation in the Coordinate Plane 📐</h3>
            {/* FIX: Use string literal for the whole paragraph to prevent JSX/TS parsing errors */}
            <p className="text-lg leading-relaxed">
              {"If a shape is dilated by a scale factor of \\(k\\) with respect to the **Origin (0, 0)**, the coordinates of every point \\((x, y)\\) change using the rule:"}
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              {/* Correctly formatted coordinate rule string */}
              <p className="text-lg font-mono text-center font-bold">
                {"$(\\mathbf{x}, \\mathbf{y}) \\rightarrow (\\mathbf{k}\\mathbf{x}, \\mathbf{k}\\mathbf{y})$"}
              </p>
            </div>
          </div>
          
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Enlargement vs. Reduction</h3>
            <div className="flex justify-center">
              <img 
                src="https://via.placeholder.com/500x300.png?text=Enlargement+(k=2)+and+Reduction+(k=0.5)"
                alt="A diagram showing one pre-image enlarging to an image (k=2) and another pre-image reducing to an image (k=0.5)"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              {/* Use HTML entities */}
              If $k &gt; 1$, the image is larger. If $0 &lt; k &lt; 1$, the image is smaller.
            </p>
          </div>
          
          {/* NEW BLOCK: Center of Dilation (Inserted above the Quiz) */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Center of Dilation (C)</h3>
            <p className="text-lg leading-relaxed">
              The **Center of Dilation** is the fixed point from which all points are expanded or shrunk.
            </p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start">
                {/* Retaining original text and class style */}
                <span className="font-bold text-emerald-500 mr-2">►</span>
                <span>All lines connecting a pre-image point and its image point must pass through the Center of Dilation.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-emerald-500 mr-2">►</span>
                {/* FIX: Ensure (0,0) is part of a string literal to prevent errors */}
                <span>{"If the Center of Dilation is (0, 0), we use the coordinate rule above."}</span>
              </li>
            </ul>
          </div>
          
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
                      ? 'bg-green-500'
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
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-300'
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
                          ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                          : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
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
                <div className="text-3xl mb-4">🔎</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You understand scale factor!' : 'Great job!'}
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
      slideId="dilations-scale-factor"
      slideTitle="Dilations: Scale Factor"
      moduleId="performing-transformations"
      submoduleId="dilations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}