import React, { useState, useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- NEW ANIMATION COMPONENT for Euclid's 5 Postulates ---
const EuclidPostulatesAnimation: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const [index, setIndex] = useState(0);

  const postulates = [
    { name: 'Postulate 1', label: '1. A straight line can be drawn between any two points.' },
    { name: 'Postulate 2', label: '2. Any straight line segment can be extended indefinitely.' },
    { name: 'Postulate 3', label: '3. A circle can be drawn with any center and any radius.' },
    { name: 'Postulate 4', label: '4. All right angles are equal to one another.' },
    { name: 'Postulate 5', label: '5. The parallel postulate.' },
  ];

  const current = postulates[index];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % postulates.length);
    }, 3500); // Cycle every 3.5 seconds
    return () => clearTimeout(timer);
  }, [index, postulates.length]);

  const lineColor = isDarkMode ? '#60a5fa' : '#2563eb';
  const textColor = isDarkMode ? '#e2e8f0' : '#1e293b';
  const pointColor = isDarkMode ? '#94a3b8' : '#64748b';
  
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: 'easeInOut' },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  // --- THIS IS THE FIX ---
  const drawFast = {
    ...draw,
    visible: {
      ...draw.visible, // Keep original properties
      transition: { duration: 0.5, ease: 'easeInOut' }, // Override transition
    },
  };
  // --- END OF FIX ---
  
  const popIn = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 150, delay: 0.2 } },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.3 } }
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 min-h-[180px]">
      <svg width="250" height="120" viewBox="0 0 250 120" className="overflow-visible">
        <AnimatePresence mode="wait">
          
          {/* 1. Two points and a line */}
          {current.name === 'Postulate 1' && (
            <motion.g key="p1">
              <motion.circle cx="50" cy="60" r="5" fill={pointColor} variants={popIn} initial="hidden" animate="visible" exit="exit" />
              <motion.circle cx="200" cy="60" r="5" fill={pointColor} variants={popIn} initial="hidden" animate="visible" exit="exit" />
              <motion.line x1="50" y1="60" x2="200" y2="60" stroke={lineColor} strokeWidth="3" variants={draw} initial="hidden" animate="visible" exit="exit" />
            </motion.g>
          )}

          {/* 2. Extend line segment */}
          {current.name === 'Postulate 2' && (
            <motion.g key="p2">
              <motion.line x1="70" y1="60" x2="180" y2="60" stroke={lineColor} strokeWidth="3" variants={draw} initial="hidden" animate="visible" exit="exit" />
              <motion.line x1="70" y1="60" x2="20" y2="60" stroke={lineColor} strokeWidth="3" strokeDasharray="4 4" variants={draw} initial="hidden" animate="visible" exit="exit" />
              <motion.line x1="180" y1="60" x2="230" y2="60" stroke={lineColor} strokeWidth="3" strokeDasharray="4 4" variants={draw} initial="hidden" animate="visible" exit="exit" />
            </motion.g>
          )}

          {/* 3. Circle */}
          {current.name === 'Postulate 3' && (
            <motion.g key="p3">
              <motion.circle cx="125" cy="60" r="5" fill={pointColor} variants={popIn} initial="hidden" animate="visible" exit="exit" />
              <motion.path
                d="M 175 60 A 50 50 0 1 1 174.9 60" // A full circle arc
                stroke={lineColor}
                strokeWidth="3"
                fill="none"
                variants={draw}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            </motion.g>
          )}

          {/* 4. Right angles */}
          {current.name === 'Postulate 4' && (
            <motion.g key="p4">
              <motion.line x1="50" y1="60" x2="200" y2="60" stroke={lineColor} strokeWidth="3" variants={drawFast} initial="hidden" animate="visible" exit="exit" />
              <motion.line x1="125" y1="20" x2="125" y2="100" stroke={lineColor} strokeWidth="3" variants={drawFast} initial="hidden" animate="visible" exit="exit" />
              <motion.rect x="125" y="60" width="10" height="10" stroke={pointColor} strokeWidth="2" fill="none" variants={fadeIn} initial="hidden" animate="visible" exit="exit" />
              <motion.rect x="115" y="60" width="10" height="10" stroke={pointColor} strokeWidth="2" fill="none" transform="rotate(90 125 60)" variants={fadeIn} initial="hidden" animate="visible" exit="exit" />
              <motion.rect x="115" y="50" width="10" height="10" stroke={pointColor} strokeWidth="2" fill="none" variants={fadeIn} initial="hidden" animate="visible" exit="exit" />
              <motion.rect x="125" y="50" width="10" height="10" stroke={pointColor} strokeWidth="2" fill="none" transform="rotate(90 125 60)" variants={fadeIn} initial="hidden" animate="visible" exit="exit" />
            </motion.g>
          )}

          {/* 5. Parallel postulate */}
          {current.name === 'Postulate 5' && (
            <motion.g key="p5">
              <motion.line x1="30" y1="80" x2="220" y2="80" stroke={lineColor} strokeWidth="3" variants={drawFast} initial="hidden" animate="visible" exit="exit" />
              <motion.circle cx="125" cy="40" r="5" fill={pointColor} variants={popIn} initial="hidden" animate="visible" exit="exit" />
              <motion.line x1="30" y1="40" x2="220" y2="40" stroke={lineColor} strokeWidth="3" strokeDasharray="4 4" variants={drawFast} initial="hidden" animate="visible" exit="exit" />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
      <AnimatePresence mode="wait">
        <motion.p
          key={current.name}
          className="text-sm text-center font-semibold mt-1 h-10" // Added h-10 for layout
          style={{ color: textColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {current.label}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT ---


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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Euclid: The Father of Geometry</h2>
            <p className="text-lg leading-relaxed">
              The "rules" for the world our shapes live in were written down over 2,000 years ago by a Greek mathematician named <strong>Euclid</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              He is often called the "Father of Geometry" because he collected all the known geometric knowledge of his time into a 13-volume "rulebook."
            </p>
          </div>
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

          {/* --- CARD WITH ANIMATION --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Key Ideas from "Elements"
            </h3>
            <p className="text-lg leading-relaxed">
              Euclid's genius was starting with a few simple rules, called <strong>postulates</strong> or <strong>axioms</strong>, that were so obvious everyone agreed they were true.
            </p>
            
            {/* --- STATIC LIST REPLACED WITH ANIMATION --- */}
            <h4 className="text-lg font-semibold mt-4 mb-2 text-slate-700 dark:text-slate-300">The 5 "Obvious" Rules</h4>
            <EuclidPostulatesAnimation />
            {/* --- END OF REPLACEMENT --- */}

            <h4 className="text-lg font-semibold mt-4 mb-2 text-slate-700 dark:text-slate-300">Why It Matters Today 🌎</h4>
            <ul className="list-disc list-inside space-y-1 text-base">
              <li><strong>Engineering:</strong> Designing stable bridges and buildings.</li>
              <li><strong>Computer Graphics:</strong> Creating 3D worlds in video games.</li>
              <li><strong>Navigation:</strong> GPS satellites use this geometry.</li>
            </ul>
          </div>

          {/* --- QUIZ CARD (with animations) --- */}
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
                    
                    // --- Animation and Styling Logic ---
                    const isSelectedCorrect = showFeedback && selected && correct;
                    const isSelectedIncorrect = showFeedback && selected && !correct;
                    const isCorrectUnselected = showFeedback && !selected && correct;

                    let animateProps = {};
                    if (isSelectedCorrect) {
                      animateProps = { scale: [1, 1.05, 1], transition: { duration: 0.3 } };
                    } else if (isSelectedIncorrect) {
                      animateProps = { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4, ease: "easeInOut" } };
                    }
                    
                    let buttonStyle = 'border-slate-300 dark:border-slate-600 hover:border-blue-400'; // Default
                    if (showFeedback) {
                      if (isSelectedCorrect) {
                        buttonStyle = 'border-green-500 bg-green-50 dark:bg-green-900/30';
                      } else if (isSelectedIncorrect) {
                        buttonStyle = 'border-red-500 bg-red-50 dark:bg-red-900/30';
                      } else if (isCorrectUnselected) {
                        buttonStyle = 'border-green-500 bg-green-50 dark:bg-green-900/30 opacity-70';
                      } else {
                        buttonStyle = 'border-slate-300 dark:border-slate-600 opacity-50'; // Other incorrect
                      }
                    } else if (selected) {
                      buttonStyle = 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'; // Selected, pre-submit
                    }

                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${buttonStyle} ${
                      disabled && !selected ? 'opacity-50' : ''
                    } ${disabled ? 'cursor-default' : 'cursor-pointer'}`;
                    // --- END of new logic ---

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleQuizAnswer(option)}
                        disabled={disabled}
                        className={className}
                        animate={animateProps} // Apply shake or pop animation
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
                      <div className="text-lg text-slate-700 dark:text-slate-300 mb-4">
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