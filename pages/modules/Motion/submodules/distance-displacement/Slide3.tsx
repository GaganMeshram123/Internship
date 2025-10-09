import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useMotionValueEvent } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- Animation component for Distance vs. Displacement ---
const DistanceDisplacementAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [step, setStep] = useState(0); // 0: initial, 1: distance, 2: displacement, 3: compare
    const totalSteps = 3;

    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const distanceColor = isDarkMode ? '#f87171' : '#ef4444'; // Red
    const displacementColor = '#3b82f6'; // Blue

    const gridSpacing = 30;
    const startX = 40;
    const startY = 130;
    
    const point0 = { x: startX, y: startY };
    const point1 = { x: startX + 4 * gridSpacing, y: startY };
    const point2 = { x: point1.x, y: startY - 3 * gridSpacing };

    // FIX: Use a MotionValue for animation logic and a React state for display
    const distanceCount = useMotionValue(0);
    const [distanceDisplay, setDistanceDisplay] = useState(0);

    useMotionValueEvent(distanceCount, "change", (latest) => {
        setDistanceDisplay(Math.round(latest));
    });

    const handleNext = () => {
        const newStep = Math.min(step + 1, totalSteps);
        setStep(newStep);
        if (newStep === 1) {
            animate(distanceCount, 7, { duration: 1.75 });
        }
    };
    const handleReset = () => {
        setStep(0);
        distanceCount.set(0);
        setDistanceDisplay(0); // Also reset the display state
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500">Distance vs. Displacement</h3>
            <div className="flex justify-around my-2 text-center">
                <div>
                    <p className="font-semibold" style={{color: distanceColor}}>Total Distance</p>
                    {/* FIX: Render the React state, not the MotionValue */}
                    <p className="text-2xl font-bold" style={{color: distanceColor}}>
                        {distanceDisplay}m
                    </p>
                </div>
                <div>
                    <p className="font-semibold" style={{color: displacementColor}}>Displacement</p>
                    <p className="text-2xl font-bold" style={{color: displacementColor}}>
                        <AnimatePresence>
                           {step >= 2 && <motion.span initial={{opacity:0}} animate={{opacity:1}}>5m, NE</motion.span>}
                        </AnimatePresence>
                         {step < 2 && <span>0m</span>}
                    </p>
                </div>
            </div>
            <div className="relative w-full h-48 flex-grow">
                 <svg viewBox="0 0 250 160" className="w-full h-full">
                    <path d="M 10 10 V 150 H 240" fill="none" stroke={isDarkMode ? '#475569' : '#e2e8f0'} strokeWidth="1" />
                    <text x={point0.x - 10} y={point0.y + 5} fontSize="10" fill={textColor}>Start</text>
                    
                    {/* Distance Path (Red) */}
                    <AnimatePresence>
                    {step >= 1 && (
                        <motion.g>
                            <motion.path d={`M ${point0.x} ${point0.y} L ${point1.x} ${point1.y}`} stroke={distanceColor} strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: 'easeInOut' }}/>
                            <motion.path d={`M ${point1.x} ${point1.y} L ${point2.x} ${point2.y}`} stroke={distanceColor} strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.75, ease: 'easeInOut', delay: 1 }}/>
                            <motion.circle r="5" fill={distanceColor} initial={{ x: point0.x, y: point0.y }} animate={{ x: point1.x, y: point2.y }} transition={{ duration: 1.75, ease: 'linear' }} />
                        </motion.g>
                    )}
                    </AnimatePresence>

                    {/* Displacement Vector (Blue) */}
                    <AnimatePresence>
                    {step >= 2 && (
                        <motion.g>
                            <motion.path d={`M ${point0.x} ${point0.y} L ${point2.x} ${point2.y}`} stroke={displacementColor} strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: 'easeInOut' }} markerEnd="url(#disp-arrow)"/>
                            <defs>
                                <marker id="disp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill={displacementColor} />
                                </marker>
                            </defs>
                        </motion.g>
                    )}
                    </AnimatePresence>
                 </svg>
            </div>
             <div className="text-center h-6 mt-2">
                <AnimatePresence mode="wait">
                    <motion.p key={step} className="text-sm text-slate-500 dark:text-slate-400" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        {step === 1 && "The red line shows the total distance traveled."}
                        {step === 2 && "The blue arrow is the displacement: the direct path."}
                        {step === 3 && "Notice the distance (7m) is greater than the displacement (5m)."}
                    </motion.p>
                </AnimatePresence>
             </div>
             <div className="flex items-center justify-center space-x-4 mt-2">
                <motion.button onClick={handleNext} disabled={step === totalSteps} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: step < totalSteps ? 1.05 : 1}} whileTap={{ scale: step < totalSteps ? 0.95 : 1 }}>
                    {step === 0 ? 'Start' : 'Next'}
                </motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Reset
                </motion.button>
            </div>
        </div>
    );
};


export default function DistanceDisplacementSlide3() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'displacement-round-trip',
      question: 'A student walks 10 meters from their desk to the door, then walks 10 meters back to their desk. What is their final displacement?',
      options: ['0 m', '10 m', '20 m', 'Cannot be determined'],
      correctAnswer: '0 m',
      explanation: 'Displacement is the change in position from start to end. Since the student ended up in the exact same spot they started, their position did not change, so the displacement is zero.'
    },
    {
      id: 'displacement-vector',
      question: 'Displacement is a ______ quantity because it describes both magnitude and direction.',
      options: ['scalar', 'vector', 'fundamental', 'relative'],
      correctAnswer: 'vector',
      explanation: 'Vector quantities, like displacement and velocity, have both a magnitude and a direction. "5 meters East" is a displacement.'
    },
    {
      id: 'displacement-calculation',
      question: 'You start at position x = +2m and end at position x = +8m. What is your displacement?',
      options: ['+10 m', '-6 m', '+6 m', '+8 m'],
      correctAnswer: '+6 m',
      explanation: 'Displacement is calculated as final position minus initial position: Δx = x_final - x_initial = (+8m) - (+2m) = +6m.'
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
             <h3 className="text-2xl font-bold mb-4 text-blue-500">What is Displacement?</h3>
            <p className="text-lg leading-relaxed mb-4">
              <strong>Displacement</strong> is the change in an object's position. It is the straight-line distance and direction from the starting point to the ending point.
            </p>
            <p className="text-lg leading-relaxed">
              Think of it as the "shortcut" back to where you started. The actual path you took doesn't matter.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
             <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Displacement is a Vector</h3>
            <p className="text-lg leading-relaxed mb-4">
              Displacement is a <strong>vector quantity</strong>. This is super important! It means it has both a <strong>magnitude</strong> and a <strong>direction</strong>.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Formula:</strong> <InlineMath math="\Delta x = x_{final} - x_{initial}" />, where <InlineMath math="\Delta x" /> means "change in position".
              </p>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Path Doesn't Matter</h3>
            <p className="text-lg leading-relaxed">
               Let's use our 4m East, 3m North example. The distance was 7m. But the displacement is the straight line from start to finish.
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
               <p className="font-mono text-center">Magnitude is the hypotenuse: <InlineMath math="\sqrt{4^2 + 3^2} = 5m" /></p>
               <p className="font-mono text-center text-xl mt-2">Displacement = 5m, Northeast</p>
            </div>
          </div>
        </div>

        {/* --- Right Column - NOW CONTAINS ANIMATION AND QUIZ --- */}
        <div className="space-y-6">
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <DistanceDisplacementAnimation isDarkMode={isDarkMode} />
            </div>

            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Check Your Understanding</h3>
                <div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div>
              </div>
              <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
              {!isQuizComplete ? (
                <>
                  <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p>
                  <div className="space-y-3">{questions[currentQuestionIndex].options.map((option, index) => (
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
                  ))}</div>
                  <AnimatePresence>{showFeedback && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700`}>
                      <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Exactly!' : 'Let\'s rethink that...'}</div>
                      <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
                      <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
                    </motion.div>
                  )}</AnimatePresence>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Concept Mastered!</div>
                  <div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div>
                </motion.div>
              )}
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="dd-what-is-displacement" 
      slideTitle="Understanding Displacement (A Vector Quantity)" 
      moduleId="motion" 
      submoduleId="distance-displacement"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}