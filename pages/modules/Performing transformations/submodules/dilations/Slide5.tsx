import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function DilationsSlide5() {
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
      id: 'reduction-quiz',
      conceptId: 'dilating-shapes-shrinking',
      conceptName: 'Dilating Shapes (Shrinking)',
      type: 'judging',
      description: 'Testing how to perform a reduction'
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
      id: 'reduction-vertex-q1',
      question: "Triangle $\triangle ABC$ has a vertex $A(8, 4)$. What is $A'$ after a dilation from the origin by a scale factor of $k=0.5$?",
      options: [
        "$A'(16, 8)$",
        "$A'(4, 2)$",
        "$A'(8.5, 4.5)$",
        "$A'(-4, -2)$"
      ],
      correctAnswer: "$A'(4, 2)$",
      explanation: "Correct! We use the rule $(x, y) \to (kx, ky)$. So, $(0.5 \cdot 8, 0.5 \cdot 4) \to (4, 2)$."
    },
    {
      id: 'reduction-find-k-q2',
      question: "Look at the image (blue is pre-image). Vertex $P$ is at $(4, 6)$ and $P'$ is at $(2, 3)$. What is the scale factor $k$?",
      options: [
        '$k=2$',
        '$k=1/2$',
        '$k=3$',
        '$k=-1$'
      ],
      correctAnswer: '$k=1/2$',
      explanation: "Correct! The coordinates were halved ($4 \cdot 0.5 = 2$ and $6 \cdot 0.5 = 3$). This is a reduction with $k=1/2$ (or 0.5)."
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
      interactionId: `reduction-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'dilating-shapes-shrinking',
      conceptName: 'Dilating Shapes (Shrinking)',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Dilating Shapes: Shrinking</h2>
            <p className="text-lg leading-relaxed">
              A <strong>reduction</strong> makes the shape smaller. This happens when the scale factor $k$ is between 0 and 1 (e.g., $k=0.5, k=1/4$).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Reduce by $k=1/2$</h3>
            <p className="text-lg leading-relaxed">
              Dilate $\triangle PQR$ from the origin by $k=1/2$ (or 0.5).
            </p>
            <p className="text-lg leading-relaxed mt-4">
              <strong>Rule:</strong> $(x, y) \to (0.5x, 0.5y)$
            </p>
            <p className="text-lg leading-relaxed mt-4">
              <strong>Vertices:</strong>
            </p>
            <ul className="mt-2 space-y-2 text-lg font-mono">
              <li>$P(4, 6) \to P'(2, 3)$</li>
              <li>$Q(6, 2) \to Q'(3, 1)$</li>
              <li>$R(2, 2) \to R'(1, 1)$</li>
            </ul>
            <p className="text-lg leading-relaxed mt-4">
              The new triangle $\triangle P'Q'R'$ is the same shape, but half as big and half as far from the origin.
            </p>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Reduction with $k=1/2$</h3>
            <div className="flex justify-center">
              <img 
                src="https://via.placeholder.com/500x300.png?text=Triangle+PQR+reduced+by+k=1/2"
                alt="A coordinate plane showing blue triangle PQR and a smaller green triangle P'Q'R' that is half the size"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The vertices of $\triangle P'Q'R'$ are all half as far from the origin as the vertices of $\triangle PQR$.
            </p>
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
                <div className="text-3xl mb-4">➖</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You\'re an expert at shrinking!' : 'Great job!'}
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
      slideId="dilating-shapes-shrinking"
      slideTitle="Dilating Shapes: Shrinking"
      moduleId="performing-transformations"
      submoduleId="dilations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}