import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- REVISED COMPONENT with Conditional Roads ---
const AccelerationDemo = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [step, setStep] = useState(0); // 0: initial, 1: speed up, 2: slow down, 3: change direction
    const totalSteps = 3;

    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const roadColor = isDarkMode ? '#475569' : '#e2e8f0';
    const carColor = isDarkMode ? '#f87171' : '#ef4444';

    const speed = useMotionValue(0);
    const [speedDisplay, setSpeedDisplay] = useState("0");
    const [direction, setDirection] = useState("East");
    
    const [carTransform, setCarTransform] = useState("translate(50, 45)");

    useEffect(() => {
        speed.on("change", (latest) => setSpeedDisplay(latest.toFixed(0)));
        
        // This useEffect handles the path animation AFTER the path is rendered
        if (step === 3) {
            speed.set(10);
            const path = document.querySelector("#car-turn-path") as SVGPathElement;
            if (path) {
                const pathLength = path.getTotalLength();
                animate(0, pathLength, {
                    duration: 3,
                    onUpdate: (latest) => {
                        const point = path.getPointAtLength(latest);
                        const prevPoint = path.getPointAtLength(Math.max(0, latest - 5));
                        const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x) * (180 / Math.PI);
                        setCarTransform(`translate(${point.x}, ${point.y}) rotate(${angle})`);

                        if (angle < -60) setDirection("Northeast");
                        else if (angle < -20) setDirection("North");
                        else setDirection("East");
                    },
                    onComplete: () => setStep(3.5)
                });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    const runAnimation = (newStep: number) => {
        setStep(newStep); // This triggers the useEffect if newStep is 3
        if (newStep === 1) { // Speed Up
            setDirection("East");
            setCarTransform("translate(50, 45)");
            animate(speed, 20, { duration: 2 });
            animate(50, 350, { duration: 2, onUpdate: (latest) => setCarTransform(`translate(${latest}, 45)`), onComplete: () => setStep(1.5) });
        } else if (newStep === 2) { // Slow Down
            setCarTransform("translate(50, 45)");
            speed.set(20);
            animate(speed, 5, { duration: 2 });
            animate(50, 350, { duration: 2, ease: "easeOut", onUpdate: (latest) => setCarTransform(`translate(${latest}, 45)`), onComplete: () => setStep(2.5) });
        }
    };
    
    const handleReset = () => {
        setStep(0);
        speed.set(0);
        setDirection("East");
        setCarTransform("translate(50, 45)");
    };

    const messages: {[key: string]: {title: string, desc: string}} = {
        "1": { title: "Accelerating: Speeding Up", desc: "Speed changes from 0 to 20 m/s." },
        "1.5": { title: "Accelerating: Speeding Up", desc: "Speed changes from 0 to 20 m/s." },
        "2": { title: "Accelerating: Slowing Down", desc: "Speed changes from 20 to 5 m/s." },
        "2.5": { title: "Accelerating: Slowing Down", desc: "Speed changes from 20 to 5 m/s." },
        "3": { title: "Accelerating: Changing Direction", desc: "Speed is constant, but direction changes." },
        "3.5": { title: "Accelerating: Changing Direction", desc: "Speed is constant, but direction changes." },
    };
    
    const currentMessage = messages[step] || null;

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500">The 3 Ways to Accelerate</h3>
            <div className="flex justify-around my-2 text-center p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
                <div>
                    <p className="font-semibold text-sm">Speed</p>
                    <p className="text-xl font-bold text-blue-500">{speedDisplay} <span className="text-sm">m/s</span></p>
                </div>
                <div>
                    <p className="font-semibold text-sm">Direction</p>
                    <p className="text-xl font-bold text-blue-500">{direction}</p>
                </div>
            </div>
            <div className="relative w-full h-40 flex-grow">
                 <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
                    <AnimatePresence>
                        {/* Conditionally render STRAIGHT road */}
                        {(step === 1 || step === 1.5 || step === 2 || step === 2.5) && (
                             <motion.path key="straight" d="M 0 50 H 400" stroke={roadColor} strokeWidth="10" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>
                        )}
                        {/* Conditionally render CURVED road */}
                        {(step === 3 || step === 3.5) && (
                            <motion.path key="curved" id="car-turn-path" d="M 50 100 A 80 80 0 0 1 180 30" stroke={roadColor} strokeWidth="10" fill="none" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>
                        )}
                    </AnimatePresence>
                    <g transform={carTransform}>
                         <path d="M10 0 L-10 0 L-15 5 L-10 10 L10 10 L15 5 Z" fill={carColor}/>
                    </g>
                 </svg>
            </div>
             <div className="text-center h-10 mt-2">
                <AnimatePresence mode="wait">
                    <motion.div key={Math.floor(step)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        {step === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">Click 'Start' to see the types of acceleration.</p>}
                        {currentMessage && (
                            <>
                                <p className="font-bold text-blue-500">{currentMessage.title}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{currentMessage.desc}</p>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
             </div>
             <div className="flex items-center justify-center space-x-4 mt-2">
                <motion.button onClick={() => runAnimation(Math.floor(step) + 1)} disabled={step >= totalSteps} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: step < totalSteps ? 1.05 : 1}} whileTap={{ scale: step < totalSteps ? 0.95 : 1 }}>
                    {step === 0 ? 'Start' : 'Next Example'}
                </motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Reset
                </motion.button>
            </div>
        </div>
    );
};

export default function AccelerationSlide1() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'accel-concept-q1',
      question: 'Which of the following is a necessary condition for an object to be accelerating?',
      options: [ 'It must be moving very fast.', 'Its speed must be increasing.', 'Its velocity must be changing.', 'It must be moving in a straight line.' ],
      correctAnswer: 'Its velocity must be changing.',
      explanation: 'Acceleration is the rate of change of velocity. This can mean a change in speed, a change in direction, or both.'
    },
    {
      id: 'accel-concept-q2',
      question: 'A car is driving at a constant speed of 50 km/h around a circular track. Is the car accelerating?',
      options: [ 'Yes, because its direction is changing.', 'No, because its speed is constant.', 'Only if it is also getting louder.', 'It is impossible to tell.' ],
      correctAnswer: 'Yes, because its direction is changing.',
      explanation: 'Velocity includes direction. Since the car\'s direction is constantly changing, its velocity is changing, and therefore it is accelerating.'
    },
    {
      id: 'accel-concept-q3',
      question: 'Acceleration is to velocity as velocity is to ______.',
      options: [ 'speed', 'position', 'time', 'distance' ],
      correctAnswer: 'position',
      explanation: 'This analogy highlights the relationships. Velocity is the rate of change of position, and acceleration is the rate of change of velocity.'
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
            <h3 className="text-2xl font-bold mb-4 text-blue-500">What is Acceleration?</h3>
            <p className="text-lg leading-relaxed mb-4">
              In everyday language, "accelerating" just means "speeding up." In physics, the definition is much broader and more powerful.
            </p>
            <p className="text-lg leading-relaxed font-semibold">
              <strong>Acceleration</strong> is the rate at which an object's <strong>velocity</strong> changes over time.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Three Ways to Accelerate</h3>
            <p className="text-lg leading-relaxed mb-4">
              Since velocity includes both speed and direction, an object is accelerating if it is:
            </p>
            <ul className="list-decimal list-inside space-y-3 text-lg">
                <li><strong>Speeding up</strong> (e.g., a car when the gas pedal is pressed).</li>
                <li><strong>Slowing down</strong> (e.g., a car when the brakes are applied).</li>
                <li><strong>Changing direction</strong> (e.g., a car turning a corner, even at constant speed).</li>
            </ul>
          </div>
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
             <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Insight:</strong> Any change in velocity, whether in speed or in direction, is an acceleration. This means acceleration is a <strong>vector quantity</strong>!
              </p>
             </div>
          </div>
        </div>
        
        <div className="space-y-6">
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <AccelerationDemo isDarkMode={isDarkMode} />
            </div>
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Check Your Concept</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div></div>
              <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
              {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p>
              
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                  <motion.button 
                    key={optionIndex} 
                    onClick={() => handleQuizAnswer(option)} 
                    disabled={showFeedback}
                    className={`w-full p-3 my-1 rounded-lg border-2 text-left transition-all text-base md:text-lg ${
                      showFeedback && selectedAnswer === option ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
                    } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}} 
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
              
              <AnimatePresence>{showFeedback && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700`}>
                  <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'A common misconception!'}</div>
                  <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
                  <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
                </motion.div>
              )}</AnimatePresence></> ) : ( 
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-4xl mb-4">🚀</div>
                <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Concept Clear!</div>
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
      slideId="accel-intro"
      slideTitle="What is Acceleration?"
      moduleId="motion"
      submoduleId="acceleration"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}