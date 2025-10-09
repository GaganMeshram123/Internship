import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- NEW COMPONENT: An animated visual for calculating distance ---
const DistancePathAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [step, setStep] =useState(0); // 0: initial, 1: first leg, 2: second leg, 3: final
    const totalSteps = 3;

    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const lineColor = isDarkMode ? '#64748b' : '#94a3b8';
    const pathColor = isDarkMode ? '#f87171' : '#ef4444'; // Red for the path

    // Grid properties
    const gridSpacing = 30;
    const startX = 40;
    const startY = 130;
    
    // Path coordinates
    const point0 = { x: startX, y: startY };
    const point1 = { x: startX + 4 * gridSpacing, y: startY };
    const point2 = { x: point1.x, y: startY - 3 * gridSpacing };

    // For the animated counter
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));

    const handleNext = () => {
        const newStep = Math.min(step + 1, totalSteps);
        setStep(newStep);

        if (newStep === 1) {
            animate(count, 4, { duration: 1 });
        } else if (newStep === 2) {
            animate(count, 7, { duration: 0.75 });
        }
    };

    const handleReset = () => {
        setStep(0);
        count.set(0);
    };

    return (
        <div className="h-full flex flex-col">
            <div className="relative w-full h-48">
                <svg viewBox="0 0 250 160" className="w-full h-full">
                    {/* Grid */}
                    <path
                        d="M 10 10 V 150 H 240"
                        fill="none"
                        stroke={isDarkMode ? '#475569' : '#e2e8f0'}
                        strokeWidth="1"
                    />
                    
                    {/* Path Tracing */}
                    <AnimatePresence>
                        {step >= 1 && (
                            <motion.path
                                d={`M ${point0.x} ${point0.y} L ${point1.x} ${point1.y}`}
                                stroke={pathColor} strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                            />
                        )}
                        {step >= 2 && (
                             <motion.path
                                d={`M ${point1.x} ${point1.y} L ${point2.x} ${point2.y}`}
                                stroke={pathColor} strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.75, ease: 'easeInOut' }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Path Labels */}
                    {step >= 1 && <text x={point0.x + 60} y={point0.y + 15} textAnchor="middle" fontSize="10" fill={textColor}>4m</text>}
                    {step >= 2 && <text x={point2.x + 10} y={point1.y - 45} fontSize="10" fill={textColor}>3m</text>}

                    {/* Moving Dot */}
                    <AnimatePresence>
                        {step > 0 && (
                            <motion.circle
                                r="5" fill={pathColor}
                                initial={{ x: point0.x, y: point0.y }}
                                animate={{ 
                                    x: step >= 1 ? point1.x : point0.x, 
                                    y: step >= 2 ? point2.y : (step === 1 ? point1.y : point0.y) 
                                }}
                                transition={{ duration: step === 1 ? 1 : 0.75, ease: 'easeInOut' }}
                            />
                        )}
                    </AnimatePresence>
                    <text x={point0.x - 10} y={point0.y + 5} fontSize="10" fill={textColor}>Start</text>
                </svg>
            </div>
            <div className="text-center">
                <div className="text-lg font-semibold">
                    Total Distance: <motion.span className="text-2xl font-bold text-blue-500">{rounded}</motion.span> m
                </div>
                 {step === 3 && (
                    <motion.p className="font-mono text-blue-500 dark:text-blue-400 mt-2" initial={{opacity:0}} animate={{opacity:1}}>
                        4m + 3m = 7m
                    </motion.p>
                )}
            </div>
             <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={handleNext} disabled={step === totalSteps} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: step < totalSteps ? 1.05 : 1}} whileTap={{ scale: step < totalSteps ? 0.95 : 1 }}>
                    {step === 0 ? 'Start' : 'Next Step'}
                </motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Reset
                </motion.button>
            </div>
        </div>
    );
};


export default function DistanceDisplacementSlide2() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  
  const questions = [
    {
      id: 'distance-round-trip',
      question: 'A student walks 10 meters from their desk to the classroom door, and then walks 10 meters back to their desk. What is the total distance they traveled?',
      options: ['0 m', '10 m', '20 m', 'Cannot be determined'],
      correctAnswer: '20 m',
      explanation: 'Distance is the total path length. The student traveled 10m there and 10m back, so the total distance is 10m + 10m = 20m.'
    },
    {
      id: 'distance-scalar',
      question: 'Distance is a ______ quantity because it only describes "how much" (magnitude) and not the direction.',
      options: ['scalar', 'vector', 'base', 'complex'],
      correctAnswer: 'scalar',
      explanation: 'Scalar quantities, like distance and speed, have only a magnitude (a numerical value). Vector quantities also have a direction.'
    },
    {
      id: 'distance-odometer',
      question: 'A car\'s odometer reads 25,100 km at the start of a trip and 25,450 km at the end. What was the distance traveled?',
      options: ['0 km', '25,450 km', '350 km', '-350 km'],
      correctAnswer: '350 km',
      explanation: 'Distance is the total path covered, regardless of direction. The change in the odometer reading gives the distance: 25,450 km - 25,100 km = 350 km.'
    }
  ];

  const isQuizComplete = currentQuestionIndex >= questions.length;

  const handleQuizAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
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
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto /* max-w-7xl */">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-blue-500">What is Distance?</h3>
            <p className="text-lg leading-relaxed mb-4">
              <strong>Distance</strong> is the total length of the path an object travels. Think of it as how many steps you take on a journey, regardless of the direction you are going.
            </p>
            <p className="text-lg leading-relaxed">
              It's like the reading on a car's odometer—it only ever increases as you move.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Distance is a Scalar</h3>
            <p className="text-lg leading-relaxed mb-4">
              Distance is a <strong>scalar quantity</strong>. This means it only has a <strong>magnitude</strong> (a size or numerical value) and no direction.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Example:</strong> Saying "I walked 5 kilometers" describes a distance. It doesn't say *where* you walked.
              </p>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
             <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Calculating Total Distance</h3>
             {/* --- Static content replaced with animation --- */}
             <DistancePathAnimation isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
           <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Check Your Understanding</h3>
            <div className="text-lg text-slate-600 dark:text-slate-400">
              Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}
            </div>
           </div>
           <div className="flex space-x-2 mb-6">
            {questions.map((_, index) => (
              <div key={index} className={`h-2 flex-1 rounded ${index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
            ))}
           </div>

          {!isQuizComplete ? (
            <>
              <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p>
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <motion.button 
                    key={index} 
                    onClick={() => handleQuizAnswer(option)} 
                    disabled={showFeedback}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${
                      showFeedback && selectedAnswer === option
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
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
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700`}>
                    <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Not Quite...'}</div>
                    <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
                    <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Concept Mastered!</div>
              <div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="dd-what-is-distance" 
      slideTitle="Understanding Distance (A Scalar Quantity)" 
      moduleId="motion" 
      submoduleId="distance-displacement"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}