import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- NEW COMPONENT: An animated visual for Rate of Motion ---
const RateOfMotionAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [step, setStep] = useState(0); // 0: initial, 1: race, 2: calcs, 3: conclusion
    const totalSteps = 3;

    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const lineColor = isDarkMode ? '#475569' : '#e2e8f0';
    const highlightColor = '#3b82f6';
    
    const carX = useMotionValue(30);
    const cyclistX = useMotionValue(30);
    const timer = useMotionValue(0);

    useEffect(() => {
        const unsubscribe = timer.on("change", latest => {
            // No need to do anything here unless you want side effects
        });
        return unsubscribe;
    }, [timer]);


    const handleNext = () => {
        const newStep = Math.min(step + 1, totalSteps);
        setStep(newStep);
        if (newStep === 1) {
            animate(carX, 350, { duration: 4, ease: "linear" });
            animate(cyclistX, 110, { duration: 4, ease: "linear" });
            animate(timer, 4, { duration: 4, ease: "linear" });
        }
    };

    const handleReset = () => {
        setStep(0);
        carX.set(30);
        cyclistX.set(30);
        timer.set(0);
    };

    const CarIcon = () => <path d="M13.2,1.2H2.8C2.2,1.2,1.8,1.7,1.8,2.2v5.5c0,0.6,0.5,1,1,1h1c0.3,0,0.5,0.2,0.5,0.5v1.2c0,0.3,0.2,0.5,0.5,0.5h1.2 c0.3,0,0.5-0.2,0.5-0.5V9.2c0-0.3,0.2-0.5,0.5-0.5h3.1c0.3,0,0.5,0.2,0.5,0.5v1.2c0,0.3,0.2,0.5,0.5,0.5h1.2c0.3,0,0.5-0.2,0.5-0.5 V9.2c0-0.3,0.2-0.5,0.5-0.5h1c0.6,0,1-0.5,1-1V2.2C14.2,1.7,13.8,1.2,13.2,1.2z M3.8,6.8c-0.6,0-1-0.5-1-1s0.5-1,1-1s1,0.5,1,1 S4.3,6.8,3.8,6.8z M12.2,6.8c-0.6,0-1-0.5-1-1s0.5-1,1-1s1,0.5,1,1S12.8,6.8,12.2,6.8z M13.2,3.2H2.8V2.2h10.5V3.2z" transform="scale(1.8) translate(-1, -1)" />;
    const CyclistIcon = () => <path d="M12.2,6.8C12.9,6.8,13.5,6.3,13.5,5.5S12.9,4.2,12.2,4.2S11,4.8,11,5.5S11.5,6.8,12.2,6.8z M6,2.8 c0.6,0,1.2,0.3,1.5,0.8L8,4.2H9.2l-1-1.8C7.8,1.8,7,1.2,6,1.2C4.2,1.2,2.8,2.8,2.8,4.8S4.2,8.2,6,8.2c0.9,0,1.8-0.4,2.2-1.2L9,6 H7.8l-0.5,0.8C7,7.1,6.5,7.2,6,7.2c-1.2,0-2.2-1-2.2-2.5S4.8,2.8,6,2.8z M10.8,9.5c-0.6,0-1-0.5-1-1s0.5-1,1-1s1,0.5,1,1S11.3,9.5,10.8,9.5z M13.2,9.5c-0.6,0-1-0.5-1-1s0.5-1,1-1s1,0.5,1,1S13.8,9.5,13.2,9.5z" transform="scale(1.8) translate(0, 0)" />;

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500">Visualizing Rate of Motion</h3>
             <div className="my-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-center">
                <span className="font-semibold text-lg">Timer: </span>
                <span className="font-mono text-xl font-bold text-blue-500">{timer.get().toFixed(1)}s</span>
            </div>
            <div className="relative w-full h-48 flex-grow">
                 <svg viewBox="0 0 400 120" className="w-full h-full">
                    {/* Road and markers */}
                    <path d="M 0 60 H 400" stroke={lineColor} strokeWidth="20" />
                    <path d="M 0 60 H 400" stroke="white" strokeWidth="1" strokeDasharray="10 5" />
                    {[0, 20, 40, 60, 80].map(d => (
                         <g key={d}>
                            <text x={30 + d * 4} y="95" textAnchor="middle" fontSize="10" fill={textColor}>{d}m</text>
                            <line x1={30 + d * 4} y1="70" x2={30 + d * 4} y2="80" stroke={lineColor} />
                         </g>
                    ))}
                    {/* Car */}
                    <motion.g style={{ x: carX }}>
                        <g transform="translate(0, 20)"><CarIcon /></g>
                    </motion.g>
                    {/* Cyclist */}
                     <motion.g style={{ x: cyclistX }}>
                        <g transform="translate(0, 75)"><CyclistIcon /></g>
                    </motion.g>
                 </svg>
                 <AnimatePresence>
                 {step >= 2 && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="absolute top-0 w-full">
                        <div className="absolute p-2 rounded bg-slate-200/80 dark:bg-slate-800/80 text-xs" style={{left: `${(350 + 30)/400 * 100}%`}}>
                            <p>Dist: 80m, Time: 4s</p>
                            <p className="font-bold">Rate: 20 m/s</p>
                        </div>
                         <div className="absolute p-2 rounded bg-slate-200/80 dark:bg-slate-800/80 text-xs" style={{top: '80px', left: `${(110 + 30)/400 * 100}%`}}>
                            <p>Dist: 20m, Time: 4s</p>
                            <p className="font-bold">Rate: 5 m/s</p>
                        </div>
                    </motion.div>
                 )}
                 </AnimatePresence>
            </div>
             <div className="text-center h-6 mt-2">
                 <AnimatePresence mode="wait">
                    <motion.p key={step} className="text-sm text-slate-500 dark:text-slate-400" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        {step === 0 && "Click 'Start Race' to begin."}
                        {step === 1 && "The race is in progress..."}
                        {step === 2 && "Let's calculate the rate of motion for each."}
                        {step === 3 && "The car had a higher rate (speed)!"}
                    </motion.p>
                 </AnimatePresence>
             </div>
             <div className="flex items-center justify-center space-x-4 mt-2">
                <motion.button onClick={handleNext} disabled={step === 1 || step === totalSteps} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: (step !== 1 && step < totalSteps) ? 1.05 : 1}} whileTap={{ scale: (step !== 1 && step < totalSteps) ? 0.95 : 1 }}>
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
      options: [
        'The object\'s weight and size',
        'The distance it traveled and the time it took',
        'The direction it went and its starting position',
        'The object\'s color and the weather'
      ],
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
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
        
        {/* --- Right Column - NOW CONTAINS ANIMATION AND QUIZ --- */}
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
                    showFeedback && selectedAnswer === option
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                      : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
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