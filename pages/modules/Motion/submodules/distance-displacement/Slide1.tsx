import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- Simplified, cleaner animation component ---
const SimpleNumberLineAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [step, setStep] = useState(0); // 0: initial, 1: number line, 2: positions, 3: motion
    const totalSteps = 3;

    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const lineColor = isDarkMode ? '#64748b' : '#94a3b8';
    const highlightColor = '#3b82f6';
    const ballColor = isDarkMode ? '#f87171' : '#ef4444'; // Red

    const posToPx = (pos: number) => 40 + (pos + 10) * 8; // Mapping meters to pixels
    const initialPos = 10;
    const finalPos = 40;

    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0 }
    };

    const Pointer = ({ label, pos, y = 20 }: { label: string, pos: number, y?: number }) => (
        <motion.g initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <line x1={posToPx(pos)} y1={y + 25} x2={posToPx(pos)} y2={45} stroke={textColor} strokeWidth="1" />
            <circle cx={posToPx(pos)} cy={y + 15} r="10" stroke={textColor} fill={isDarkMode ? '#334155' : '#f1f5f9'} />
            <text x={posToPx(pos)} y={y + 19} textAnchor="middle" fontSize="10" fill={textColor} fontWeight="bold">{label}</text>
        </motion.g>
    );

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-4 text-blue-500">Interactive Visualization</h3>
            <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
                <AnimatePresence>
                    {step >= 1 && (
                        <motion.svg key="number-line-base" className="absolute w-full h-full" initial="hidden" animate="visible" exit="exit" variants={fadeVariants}>
                            <line x1="10" y1="50" x2="390" y2="50" stroke={lineColor} strokeWidth="2" markerEnd="url(#num-arrow)" markerStart="url(#num-arrow-left)" />
                            <defs>
                                <marker id="num-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={lineColor} /></marker>
                                <marker id="num-arrow-left" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 10 0 L 0 5 L 10 10 z" fill={lineColor} /></marker>
                            </defs>
                            
                            {/* Ticks and Labels */}
                            {[-10, 0, 10, 20, 30, 40].map(pos => (
                                <g key={pos}>
                                    <line x1={posToPx(pos)} y1="45" x2={posToPx(pos)} y2="55" stroke={lineColor} strokeWidth="1.5" />
                                    <text x={posToPx(pos)} y="70" textAnchor="middle" fontSize="10" fill={textColor}>{`${pos}m`}</text>
                                </g>
                            ))}
                            <motion.text x={posToPx(0)} y="85" textAnchor="middle" fontSize="10" fill={highlightColor} fontWeight="bold" initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5}}>
                                Origin
                            </motion.text>
                        </motion.svg>
                    )}

                    {step >= 2 && (
                        <motion.svg key="positions" className="absolute w-full h-full" initial="hidden" animate="visible" exit="exit" variants={fadeVariants}>
                            <Pointer label="A" pos={initialPos} />
                            <Pointer label="B" pos={finalPos} />
                        </motion.svg>
                    )}
                    
                    {step === 3 && (
                        <motion.svg key="motion" className="absolute w-full h-full">
                           <motion.circle 
                                cy="50" r="5" fill={ballColor}
                                initial={{ cx: posToPx(initialPos) }}
                                animate={{ cx: posToPx(finalPos) }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </motion.svg>
                    )}
                </AnimatePresence>
                
                {/* Textual feedback area */}
                <div className="absolute bottom-0 w-full text-center">
                    <AnimatePresence mode="wait">
                         <motion.p key={step} className="text-lg text-slate-500 dark:text-slate-400" initial="hidden" animate="visible" exit="exit" variants={fadeVariants}>
                            {step === 0 && "Click Start to begin."}
                            {step === 1 && "This is our number line, with the Origin at 0m."}
                            {step === 2 && "Let's define an Initial Position (A) and a Final Position (B)."}
                            {step === 3 && "Motion is the change in position from A to B."}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={() => setStep(s => Math.min(s + 1, totalSteps))} disabled={step === totalSteps} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-5 py-2 rounded-lg transition-colors" whileHover={{ scale: step < totalSteps ? 1.05 : 1 }} whileTap={{ scale: step < totalSteps ? 0.95 : 1 }}>
                    {step === 0 ? 'Start' : 'Next'}
                </motion.button>
                <motion.button onClick={() => setStep(0)} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-5 py-2 rounded-lg transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        
        {/* Left Column - Theory */}
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

        {/* --- Right Column - NOW CONTAINS ANIMATION AND QUIZ --- */}
        <div className="space-y-6">
            {/* Animation Box */}
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <SimpleNumberLineAnimation isDarkMode={isDarkMode} />
            </div>

            {/* Concept Check Quiz Box */}
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