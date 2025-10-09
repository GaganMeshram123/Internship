import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- REVISED COMPONENT with Corrected Emoji Direction ---
const RateOfMotionAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [step, setStep] = useState(0); // 0: initial, 1: countdown, 2: race, 3: calcs, 4: conclusion
    const totalSteps = 4;
    const [countdown, setCountdown] = useState(3);

    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const lineColor = isDarkMode ? '#475569' : '#e2e8f0';
    
    const carX = useMotionValue(30);
    const cyclistX = useMotionValue(30);
    const timer = useMotionValue(0);
    const [timerDisplay, setTimerDisplay] = useState("0.0");

    useEffect(() => {
        timer.on("change", latest => setTimerDisplay(latest.toFixed(1)));
        return () => timer.clearListeners();
    }, [timer]);

    const runCountdown = () => {
        setStep(1);
        let count = 3;
        setCountdown(count);
        const interval = setInterval(() => {
            count--;
            setCountdown(count);
            if (count <= 0) {
                clearInterval(interval);
                setTimeout(runRace, 300); // Short delay after GO!
            }
        }, 700);
    };

    const runRace = () => {
        setStep(2);
        animate(carX, 350, { duration: 4, ease: "easeOut" });
        animate(cyclistX, 110, { duration: 4, ease: "linear" });
        animate(timer, 4, { duration: 4, ease: "linear", onComplete: () => setStep(3) });
    };

    const handleNext = () => {
        const newStep = Math.min(step + 1, totalSteps);
        setStep(newStep);
    };

    const handleReset = () => {
        setStep(0);
        setCountdown(3);
        carX.set(30);
        cyclistX.set(30);
        timer.set(0);
    };

    const countdownVariants = {
        hidden: { scale: 0.5, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } },
        exit: { scale: 1.5, opacity: 0 }
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500">Visualizing Rate of Motion</h3>
            <div className="my-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-center">
                <span className="font-semibold text-lg">Timer: </span>
                <span className="font-mono text-xl font-bold text-blue-500">{timerDisplay}s</span>
            </div>
            <div className="relative w-full h-48 flex-grow overflow-hidden">
                <AnimatePresence>
                    {step === 1 && (
                        <motion.div key={countdown} variants={countdownVariants} initial="hidden" animate="visible" exit="exit" className="absolute inset-0 flex items-center justify-center">
                            <span className="text-8xl font-bold text-blue-500">{countdown > 0 ? countdown : 'GO!'}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <svg viewBox="0 0 400 120" className="w-full h-full">
                    <path d="M 0 60 H 400" stroke={lineColor} strokeWidth="25" />
                    <path d="M 0 60 H 400" stroke={isDarkMode ? '#fff' : '#000'} strokeWidth="1" strokeDasharray="10 5" opacity="0.5" />
                    {[0, 20, 40, 60, 80].map(d => (
                         <g key={d}>
                            <text x={30 + d * 4} y="95" textAnchor="middle" fontSize="10" fill={textColor}>{d}m</text>
                            <line x1={30 + d * 4} y1="72.5" x2={30 + d * 4} y2="82.5" stroke={lineColor} />
                         </g>
                    ))}
                    <text x="380" y="40" fontSize="24">🏁</text>
                    
                    {step === 2 && Array.from({length: 3}).map((_, i) => (
                        <motion.line key={i} x1={carX.get() - 20} y1={60} x2={carX.get() - 40} y2={60} stroke={textColor} strokeWidth={1.5} initial={{opacity:0}} animate={{opacity:[0, 0.8, 0], x1: carX.get(), x2: carX.get() - 50}} transition={{duration: 0.5, repeat: Infinity, delay: i * 0.1}} />
                    ))}
                    
                    {/* FIX: Added scaleX: -1 to flip the emojis to face right */}
                    <motion.text style={{ x: carX, scaleX: -1 }} y="68" fontSize="24" textAnchor="middle">🏎️</motion.text>
                    <motion.text style={{ x: cyclistX, scaleX: -1 }} y="68" fontSize="24" textAnchor="middle">🚴</motion.text>
                </svg>
                <AnimatePresence>
                {step >= 3 && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}} className="absolute top-0 w-full">
                        <div className="absolute p-2 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-xs" style={{transform: `translateX(${carX.get() - 80}px)`}}>
                            <p>Dist: 80m, Time: 4.0s</p>
                            <p className="font-bold">Rate: 20 m/s <motion.span initial={{scale:0}} animate={{scale:1}}>🚀</motion.span></p>
                            <motion.div initial={{y: 20, opacity: 0}} animate={{y:0, opacity:1}} className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl">🏆</motion.div>
                        </div>
                         <div className="absolute p-2 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-xs" style={{top: '80px', transform: `translateX(${cyclistX.get() - 80}px)`}}>
                            <p>Dist: 20m, Time: 4.0s</p>
                            <p className="font-bold">Rate: 5 m/s <motion.span initial={{scale:0}} animate={{scale:1}}>🐢</motion.span></p>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
            <div className="text-center h-6 mt-2">
                 <AnimatePresence mode="wait">
                    <motion.p key={step} className="text-sm text-slate-500 dark:text-slate-400" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        {step <= 1 && "Click 'Start Race' to begin."}
                        {step === 2 && "The race is in progress..."}
                        {step === 3 && "Let's calculate the rate of motion."}
                        {step === 4 && "The car had the higher rate (speed)!"}
                    </motion.p>
                 </AnimatePresence>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-2">
                <motion.button onClick={step === 0 ? runCountdown : handleNext} disabled={step === 1 || step === 2} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: (step !== 1 && step !== 2) ? 1.05 : 1}} whileTap={{ scale: (step !== 1 && step !== 2) ? 0.95 : 1 }}>
                    {step === 0 ? 'Start Race' : 'Next'}
                </motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Reset
                </motion.button>
            </div>
        </div>
    );
};

export default function AvgSpeedVelocitySlide1() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'rate-of-motion-q1',
      question: 'To describe how fast an object is moving, what two quantities do you absolutely need to measure?',
      options: [ 'The object\'s weight and size', 'The distance it traveled and the time it took', 'The direction it went and its starting position', 'The object\'s color and the weather' ],
      correctAnswer: 'The distance it traveled and the time it took',
      explanation: 'Rate of motion (speed or velocity) is all about how distance or position changes over time. You need both measurements to calculate it.'
    },
    {
      id: 'rate-of-motion-q2',
      question: 'Two cars travel the exact same distance of 100 km. Car A takes 1 hour. Car B takes 2 hours. Which car was moving faster?',
      options: [ 'Car A', 'Car B', 'They were equally fast', 'Cannot be determined' ],
      correctAnswer: 'Car A',
      explanation: 'The faster car is the one that covers the same distance in less time. Car A took only 1 hour, so it had a higher rate of motion.'
    },
    {
      id: 'rate-of-motion-q3',
      question: 'In physics, the "rate of motion" describes...',
      options: [ 'How heavy an object is.', 'How far an object is from the start.', 'How quickly an object\'s position changes.', 'The path an object takes.' ],
      correctAnswer: 'How quickly an object\'s position changes.',
      explanation: 'This is the core concept. Rate of motion connects the change in position (distance/displacement) with the change in time.'
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
            <h3 className="text-2xl font-bold mb-4 text-blue-500">How Fast is "Fast"?</h3>
            <p className="text-lg leading-relaxed mb-4">
              We often say things are "fast" or "slow," but what does that really mean in physics? It describes an object's <strong>rate of motion</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              A "rate" always compares two different quantities. To describe motion, we compare how much an object's <strong>position changes</strong> to how much <strong>time passes</strong>.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Two Key Ingredients</h3>
            <p className="text-lg leading-relaxed mb-4">
              To measure any rate of motion, you always need two pieces of information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg">
                <li><strong>A change in position:</strong> How far did it go? (This relates to distance and displacement).</li>
                <li><strong>A change in time:</strong> How long did it take?</li>
            </ul>
             <div className="bg-blue-50 dark:bg-blue-900/30 p-4 mt-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Core Idea:</strong> Rate of Motion = (Change in Position) / (Change in Time)
              </p>
             </div>
          </div>
        </div>
        
        <div className="space-y-6">
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <RateOfMotionAnimation isDarkMode={isDarkMode} />
            </div>
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Check Your Intuition</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div></div>
              <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
              {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option, index) => (
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
              ))}</div><AnimatePresence>{showFeedback && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700`}>
                  <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Let\'s think about that...'}</div>
                  <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
                  <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
                </motion.div>
              )}</AnimatePresence></> ) : ( 
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-4xl mb-4">💡</div>
                <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Foundation Set!</div>
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
      slideId="asv-intro"
      slideTitle="Introducing Rate of Motion: How Fast?"
      moduleId="motion"
      submoduleId="average-speed-velocity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}