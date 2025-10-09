import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- FINAL REVISED COMPONENT with definitive positioning fix ---
const SimpleNumberLineAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [step, setStep] = useState(0); 
    const totalSteps = 3;
    const [isFlipped, setIsFlipped] = useState(false);

    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const lineColor = isDarkMode ? '#64748b' : '#94a3b8';
    const highlightColor = '#3b82f6';
    
    const treeColor = isDarkMode ? '#22c55e' : '#16a34a';
    const mailboxColor = isDarkMode ? '#ef4444' : '#dc2626';

    const treePos = 10;
    const mailboxPos = 40;
    const finalPos = -20;
    
    const posToPx = (pos: number) => 140 + pos * 6;
    
    const personX = useMotionValue(posToPx(treePos));

    const handleNext = () => {
        const newStep = Math.min(step + 1, totalSteps);
        setStep(newStep);

        if (newStep === 2) {
             setIsFlipped(false);
             animate(personX, posToPx(mailboxPos), { duration: 2.5, ease: "easeInOut" });
        } else if (newStep === 3) {
             setIsFlipped(true);
             animate(personX, posToPx(finalPos), { duration: 4, ease: "easeInOut" });
        }
    };

    const handleReset = () => {
        setStep(0);
        setIsFlipped(false);
        personX.set(posToPx(treePos));
    };

    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
        exit: { opacity: 0 }
    };

    const TreeIcon = () => <path d="M12 1.5A2.5 2.5 0 009.5 4h-3A2.5 2.5 0 004 6.5V9h8V6.5A2.5 2.5 0 009.5 4h-3A2.5 2.5 0 004 1.5H3v13h10V1.5h-1z" fill={treeColor} />;
    const MailboxIcon = () => <path d="M14 4H2a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-4zM4 12V8h1V6H4V5h4v1h1v2H9v4H7V9H5v3H4zm9-1a1 1 0 11-2 0V7a1 1 0 112 0v4z" fill={mailboxColor} />;
    
    const PersonIcon = () => (
        <motion.g transformOrigin="center" animate={{ scaleX: isFlipped ? -1 : 1 }}>
            <text x="0" y="0" fontSize="24" textAnchor="middle" dominantBaseline="middle">
                🚶
            </text>
        </motion.g>
    );

    const messages: {[key: number]: string} = {
        1: "Let's set the scene: a person starts at the tree (+10m).",
        2: "Motion: The person walks from the tree to the mailbox (+40m).",
        3: "Motion continues: They walk back past the origin to -20m.",
    };

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-500">Interactive Visualization</h3>
                <div className="relative w-full h-48">
                    <AnimatePresence>
                        {step >= 1 && (
                            <motion.svg key="scene" className="absolute w-full h-full" viewBox="0 0 400 150" initial="hidden" animate="visible" exit="exit" variants={fadeVariants}>
                                {/* FIX: Wrapped all visual elements in a group and translated it down */}
                                <g transform="translate(0, 25)">
                                    <defs>
                                        <marker id="arrow-right-final" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7">
                                            <path d="M 0 0 L 10 5 L 0 10 z" fill={lineColor} />
                                        </marker>
                                        <marker id="arrow-left-final" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="7" markerHeight="7">
                                            <path d="M 10 0 L 0 5 L 10 10 z" fill={lineColor} />
                                        </marker>
                                    </defs>
                                    <line x1="10" y1="60" x2="390" y2="60" stroke={lineColor} strokeWidth="3" markerEnd="url(#arrow-right-final)" markerStart="url(#arrow-left-final)" />
                                    
                                    {[-20, -10, 0, 10, 20, 30, 40].map(pos => (
                                        <g key={pos}>
                                            <line x1={posToPx(pos)} y1="55" x2={posToPx(pos)} y2="65" stroke={lineColor} strokeWidth="2" />
                                            <text x={posToPx(pos)} y="80" textAnchor="middle" fontSize="12" fill={textColor}>{`${pos}m`}</text>
                                        </g>
                                    ))}
                                    <text x={posToPx(0)} y="47" textAnchor="middle" fontSize="12" fill={highlightColor} fontWeight="bold">Origin</text>
                                    
                                    <g transform={`translate(${posToPx(treePos) - 10}, 28) scale(1.5)`}><TreeIcon /></g>
                                    <g transform={`translate(${posToPx(mailboxPos) - 10}, 28) scale(1.5)`}><MailboxIcon /></g>

                                    <motion.g style={{ x: personX }} transform="translate(0, 40)">
                                        <PersonIcon />
                                    </motion.g>
                                </g>
                            </motion.svg>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            <div className="text-center h-12 flex items-center justify-center mt-4 mb-4">
                <AnimatePresence mode="wait">
                     <motion.p key={step} className="text-xl text-slate-500 dark:text-slate-400" initial="hidden" animate="visible" exit="exit" variants={fadeVariants}>
                        {messages[step] || "Click Start to begin."}
                    </motion.p>
                </AnimatePresence>
            </div>

            <div className="flex items-center justify-center space-x-4">
                <motion.button onClick={handleNext} disabled={step >= totalSteps} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: step < totalSteps ? 1.05 : 1 }} whileTap={{ scale: step < totalSteps ? 0.95 : 1 }}>
                    {step === 0 ? 'Start' : 'Next'}
                </motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Reset
                </motion.button>
            </div>
        </div>
    );
};


export default function DistanceDisplacementSlide1() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  
  const questions = [
    {
      id: 'reference-point-concept',
      question: 'Before you can describe an object\'s position, what is the one thing you must define first?',
      options: [ 'The object\'s speed', 'A reference point (or origin)', 'The time of day', 'The object\'s size' ],
      correctAnswer: 'A reference point (or origin)',
      explanation: 'A reference point is the starting location (the "zero point") that you measure from. Without it, a statement like "the cat is 5 meters away" is meaningless.'
    },
    {
      id: 'position-definition',
      question: 'A student is standing on a number line at the point x = -3 meters. What does this position tell us?',
      options: [ 'They are 3 meters away from the start.', 'They are 3 meters from the origin in the negative direction.', 'They have walked for 3 seconds.', 'They are moving backwards at 3 m/s.' ],
      correctAnswer: 'They are 3 meters from the origin in the negative direction.',
      explanation: 'Position includes both distance from the origin (3 meters) and direction (negative). The sign is crucial for defining location on a line.'
    },
    {
      id: 'motion-definition',
      question: 'Motion is officially defined as...',
      options: [ 'Being very fast.', 'Any kind of movement.', 'A change in position over a period of time.', 'Traveling a long distance.' ],
      correctAnswer: 'A change in position over a period of time.',
      explanation: 'This is the precise scientific definition. If an object\'s position coordinates change from one moment to the next, it is in motion.'
    }
  ];

  const isQuizComplete = currentQuestionIndex >= questions.length;

  const handleQuizAnswer = (answerText: string) => {
    setSelectedAnswer(answerText);
    setShowFeedback(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    if (answerText === currentQuestion.correctAnswer) {
      setScore((prev: number) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    const newAnsweredState = [...questionsAnswered];
    newAnsweredState[currentQuestionIndex] = true;
    setQuestionsAnswered(newAnsweredState);
    
    setSelectedAnswer('');
    setShowFeedback(false);
    
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex((prev: number) => prev + 1);
    }
  };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto /* max-w-7xl */">
        
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-blue-500">The Starting Point: Position</h3>
            <p className="text-lg leading-relaxed mb-4">
              Before we can study motion, we need to know how to describe an object's <strong>position</strong>. Position is simply an object's location. But location compared to what?
            </p>
            <p className="text-lg leading-relaxed">
              We need a <strong>Reference Point</strong>, also called the <strong>origin</strong>. This is a fixed spot that we agree to measure from. It's our "zero" point.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Position on a Number Line</h3>
            <p className="text-lg leading-relaxed mb-4">
              Imagine a straight road. We can place our origin (0) at a house. Any spot east of the house is a positive position (e.g., <InlineMath math="x = +50m" />), and any spot west is negative (e.g., <InlineMath math="x = -30m" />).
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Idea:</strong> Position requires a distance AND a direction from the origin.
              </p>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">What is Motion?</h3>
            <p className="text-lg leading-relaxed">
              Now for the simple part! <strong>Motion</strong> is just a <strong>change in position</strong> over a period of time.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              If a ball starts at <InlineMath math="x = +2m" /> and rolls to <InlineMath math="x = +10m" />, its position has changed. It was in motion. If it stays at <InlineMath math="x = +2m" />, it is stationary (not in motion).
            </p>
          </div>
        </div>

        <div className="space-y-6">
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <SimpleNumberLineAnimation isDarkMode={isDarkMode} />
            </div>

            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Concept Check</h3>
                    <div className="text-lg text-slate-600 dark:text-slate-400">
                    Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}
                    </div>
                </div>

                <div className="flex space-x-2 mb-6">
                    {questions.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 flex-1 rounded ${
                        index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                    />
                    ))}
                </div>

                {!isQuizComplete ? (
                    <>
                    <p className="text-lg mb-6 min-h-[6rem]">
                        {questions[currentQuestionIndex].question}
                    </p>
                    
                    <div className="space-y-3">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                        <motion.button
                            key={index}
                            onClick={() => handleQuizAnswer(option)}
                            disabled={showFeedback}
                            className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${
                            showFeedback && selectedAnswer === option ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
                            } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                            whileHover={!showFeedback ? { scale: 1.02 } : {}}
                            whileTap={!showFeedback ? { scale: 0.98 } : {}}
                        >
                            {option}
                        </motion.button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {showFeedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700`}
                        >
                            <div className="font-bold text-lg mb-2">
                            {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Not quite...'}
                            </div>
                            <div className="text-base">
                            {questions[currentQuestionIndex].explanation}
                            </div>
                            <motion.button
                            onClick={handleNextQuestion}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            >
                            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
                            </motion.button>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </>
                ) : (
                    <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                    >
                    <div className="text-4xl mb-4">🎉</div>
                    <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                        Great Start!
                    </div>
                    <div className="text-lg text-slate-600 dark:text-slate-400">
                        You scored {score} out of {questions.length}
                    </div>
                    <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                        {score === questions.length ? 'Excellent! You\'ve mastered the basics. 🌟' : 
                        score >= questions.length * 0.7 ? 'Well done! You have a solid understanding. 👏' : 
                        'Good effort! These concepts are key, so review them if you need. 💪'}
                    </div>
                    </motion.div>
                )}
            </div>
        </div>
      </div>
    </div>
  )

  return (
    <SlideComponentWrapper 
      slideId="dd-position-motion"
      slideTitle="What is Position and Motion?"
      moduleId="motion"
      submoduleId="distance-displacement"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  )
}