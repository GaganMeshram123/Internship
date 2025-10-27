import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function IntroToEuclideanGeometrySlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'geometry-terms-quiz',
      conceptId: 'geometry-vocabulary',
      conceptName: 'Geometry Vocabulary Quiz',
      type: 'judging',
      description: 'Testing understanding of basic geometry terms'
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
      id: 'point-line-q1',
      question: 'What is a straight path that goes on forever in BOTH directions?',
      options: [
        'Point',
        'Line',
        'Line Segment',
        'Ray'
      ],
      correctAnswer: 'Line',
      explanation: 'Correct! A Line (like ⃡AB) is a 1D path that extends infinitely in both directions.'
    },
    {
      id: 'ray-segment-q2',
      question: 'What do we call a piece of a line with ONE endpoint?',
      options: [
        'Line',
        'Line Segment',
        'Ray',
        'Plane'
      ],
      correctAnswer: 'Ray',
      explanation: "Correct! A Ray (like ⃗AB) starts at one point (A) and goes on forever in one direction (through B)."
    },
    {
      id: 'collinear-q3',
      question: 'If three points all lie on the exact same straight line, what do we call them?',
      options: [
        'Coplanar',
        'Collinear',
        'Line Segments',
        'Planes'
      ],
      correctAnswer: 'Collinear',
      explanation: 'Correct! "Co-linear" just means "together on the same line." Great job!'
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
      interactionId: `geometry-terms-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'geometry-vocabulary',
      conceptName: 'Geometry Vocabulary Quiz',
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        
        {/* Left Column - Content */}
        <div className="space-y-6 flex flex-col">
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The Language of Geometry</h2>
            <p className="text-lg leading-relaxed">
              To talk about shapes, we need a common language. These are the basic "words" of geometry.
            </p>
            <ul className="mt-4 space-y-4 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2 text-2xl leading-none">•</span>
                <span>
                  <strong>Point:</strong> A single location. We label it with a capital letter. (e.g., Point A)
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: The tip of a pencil or a dot on a map.</em>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">↔</span>
                <span>
                  <strong>Line:</strong> A straight path that goes on forever in both directions. (e.g., Line {"$\\overleftrightarrow{AB}$"})
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: An endless, perfectly straight railroad track.</em>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">―</span>
                <span>
                  <strong>Line Segment:</strong> A piece of a line with two endpoints. (e.g., Segment {"$\\overline{AB}$"})
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: A pencil, or the edge of your phone.</em>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">→</span>
                <span>
                  <strong>Ray:</strong> A piece of a line with one endpoint. (e.g., Ray {"$\\overrightarrow{AB}$"})
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: A beam of light from a flashlight (starts at the bulb).</em>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2 text-2xl">□</span>
                <span>
                  <strong>Plane:</strong> A flat surface (like this screen) that goes on forever. (e.g., Plane M)
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: The surface of your desk, if it went on forever.</em>
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Staying in Line (and on the Page)! 📍</h3>
            <p className="text-lg leading-relaxed">
              Now that we know the terms, let's see how they fit together.
            </p>
            <ul className="mt-4 space-y-4 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">→</span>
                <span>
                  <strong>Collinear Points:</strong> When points are "co-linear," it just means they all lie on the <strong>same line</strong>.
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: Three buttons in a perfectly straight row on a remote.</em>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">□</span>
                <span>
                  <strong>Coplanar Points:</strong> When points are "co-planar," they all lie on the <strong>same flat plane</strong> (like this screen!).
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: All the pictures hanging on the same flat wall.</em>
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Lines Together 🤝</h3>
            <p className="text-lg leading-relaxed">
              What happens when you have two lines on the same plane?
            </p>
            <ul className="mt-4 space-y-4 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2 text-xl">✕</span>
                <span>
                  <strong>Intersecting Lines:</strong> Two lines that cross at exactly <strong>one point</strong>.
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: The blades of an open pair of scissors.</em>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2 text-xl">||</span>
                <span>
                  <strong>Parallel Lines:</strong> Two lines that are always the same distance apart and <strong>never</strong> cross.
                  <em className="text-sm text-slate-500 dark:text-slate-400 block mt-1">Think: Railroad tracks or the lines on notebook paper.</em>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column - Animated Visual Comparison and Quiz */}
        <div className="space-y-6 flex flex-col">
          
          {/* --- Animated Visual Comparison Card --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">See the Difference! 👀</h3>
            
            {/* --- Comparison Grid/Flexbox --- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-6">
              
              {/* Line */}
              <div>
                <span className="block text-2xl font-bold text-blue-500">↔</span>
                <p className="font-semibold text-lg mt-1">Line</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Goes on forever in both directions.</p>
              </div>
              
              {/* Line Segment */}
              <div>
                <span className="block text-2xl font-bold text-blue-500">―</span>
                <p className="font-semibold text-lg mt-1">Line Segment</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Has two clear endpoints. It "stops."</p>
              </div>
              
              {/* Ray */}
              <div>
                <span className="block text-2xl font-bold text-blue-500">→</span>
                <p className="font-semibold text-lg mt-1">Ray</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Starts at one point and goes forever in one direction.</p>
              </div>

            </div>

            <p className="text-base text-slate-700 dark:text-slate-300 mt-6 text-center">
              The notation uses arrows to show direction:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside text-left">
              <li><strong>Line {"$\\overleftrightarrow{AB}$"}:</strong> Arrows on <strong>both ends</strong>.</li>
              <li><strong>Line Segment {"$\\overline{AB}$"}:</strong> <strong>No arrows</strong>, just a bar.</li>
              <li><strong>Ray {"$\\overrightarrow{AB}$"}:</strong> An arrow on <strong>one end</strong>.</li>
            </ul>
          </motion.div>

          {/* --- Knowledge Check Card --- */}
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
                <div className="text-3xl mb-4">📝</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You\'re a vocabulary expert!' : 'Great job!'}
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
      slideId="terms-and-labels"
      slideTitle="Terms & Labels in Geometry"
      moduleId="performing-transformations"
      submoduleId="intro-to-euclidean-geometry"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}