import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- NEW COMPONENT: An animated visual for Acceleration Vectors ---
const VectorArrowAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [step, setStep] = useState(0); // 0: initial, 1: positive, 2: negative, 3: zero
    const totalSteps = 3;

    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const lineColor = isDarkMode ? '#64748b' : '#94a3b8';
    const velocityColor = '#3b82f6'; // Blue
    const accelerationColor = isDarkMode ? '#f87171' : '#ef4444'; // Red
    
    const carX = useMotionValue(50);
    const velocityWidth = useMotionValue(0);

    const runAnimation = (newStep: number) => {
        setStep(newStep);
        carX.set(50);
        velocityWidth.set(0);

        if (newStep === 1) { // Positive Acceleration
            animate(velocityWidth, 80, { duration: 2.5, ease: "easeIn" });
            animate(carX, 300, { duration: 2.5, ease: "easeIn" });
        } else if (newStep === 2) { // Negative Acceleration
            velocityWidth.set(80); // Start fast
            animate(velocityWidth, 10, { duration: 2.5, ease: "easeOut" });
            animate(carX, 200, { duration: 2.5, ease: "easeOut" });
        } else if (newStep === 3) { // Zero Acceleration
            velocityWidth.set(50); // Constant speed
            animate(carX, 300, { duration: 2.5, ease: "linear" });
        }
    };
    
    const handleReset = () => {
        setStep(0);
        carX.stop();
        velocityWidth.stop();
        carX.set(50);
        velocityWidth.set(0);
    };

    const VectorArrow = ({ x, width, color, label }: {x: any, width: any, color: string, label: string}) => (
        <motion.g style={{ x }}>
            <motion.path d={`M 0 0 L ${width.get()} 0`} stroke={color} strokeWidth="3" markerEnd={`url(#arrow-${label})`} />
            <text y="-5" x={width.get() / 2} textAnchor="middle" fill={color} fontSize="12">{label}</text>
            <defs>
                <marker id={`arrow-${label}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
                </marker>
            </defs>
        </motion.g>
    );

    const messages: {[key: number]: {title: string, desc: string}} = {
        1: { title: "Positive Acceleration", desc: "Vectors in same direction: object speeds up." },
        2: { title: "Negative Acceleration", desc: "Vectors in opposite directions: object slows down." },
        3: { title: "Zero Acceleration", desc: "No acceleration vector: velocity is constant." },
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500">Visualizing Acceleration Vectors</h3>
            
            <div className="relative w-full h-48 flex-grow flex flex-col justify-center">
                 <svg viewBox="0 0 400 100" className="w-full h-full">
                    {/* Number Line */}
                    <line x1="10" y1="80" x2="390" y2="80" stroke={lineColor} strokeWidth="1" />

                    {/* Car */}
                    <motion.g style={{ x: carX }} y="55">
                        <rect x="-20" y="0" width="40" height="20" rx="3" fill={textColor} />
                        <circle cx="-10" cy="20" r="5" fill={textColor} />
                        <circle cx="10" cy="20" r="5" fill={textColor} />
                    </motion.g>

                    {/* Vector Arrows */}
                    <g transform="translate(0, 30)">
                        <VectorArrow x={carX} width={velocityWidth} color={velocityColor} label="v" />
                    </g>
                    <g transform="translate(0, 15)">
                        <AnimatePresence>
                        {step === 1 && (
                            <motion.g initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{ x: carX }}>
                                <path d="M 0 0 L 40 0" stroke={accelerationColor} strokeWidth="3" markerEnd="url(#arrow-a)"/>
                                <text y="-5" x="20" textAnchor="middle" fill={accelerationColor} fontSize="12">a</text>
                            </motion.g>
                        )}
                        {step === 2 && (
                            <motion.g initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{ x: carX }}>
                                <path d="M 0 0 L -40 0" stroke={accelerationColor} strokeWidth="3" markerEnd="url(#arrow-a-neg)"/>
                                <text y="-5" x="-20" textAnchor="middle" fill={accelerationColor} fontSize="12">a</text>
                            </motion.g>
                        )}
                        </AnimatePresence>
                         <defs>
                            <marker id="arrow-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill={accelerationColor} /></marker>
                            <marker id="arrow-a-neg" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 10 0 L 0 5 L 10 10 z" fill={accelerationColor} /></marker>
                        </defs>
                    </g>
                 </svg>
            </div>
             <div className="text-center h-10 mt-2">
                <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        {step === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">Click 'Start' to visualize the concepts.</p>}
                        {messages[step] && (
                            <>
                                <p className="font-bold text-blue-500">{messages[step].title}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{messages[step].desc}</p>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
             </div>
             <div className="flex items-center justify-center space-x-4 mt-2">
                <motion.button onClick={() => runAnimation(step + 1)} disabled={step >= totalSteps} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: step < totalSteps ? 1.05 : 1}} whileTap={{ scale: step < totalSteps ? 0.95 : 1 }}>
                    {step === 0 ? 'Start' : 'Next Example'}
                </motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Reset
                </motion.button>
            </div>
        </div>
    );
};

export default function AccelerationSlide3() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'accel-types-q1',
      question: 'A car is traveling forward and the driver hits the brakes. The car\'s acceleration is...',
      options: ['Positive', 'Negative', 'Zero', 'Circular'],
      correctAnswer: 'Negative',
      explanation: 'Slowing down while moving in the positive direction is called deceleration, which corresponds to a negative acceleration.'
    },
    {
      id: 'accel-types-q2',
      question: 'A cruise ship is moving at a steady 30 km/h in a perfectly straight line. What is its acceleration?',
      options: ['Positive', 'Negative', 'Zero', 'Cannot be determined'],
      correctAnswer: 'Zero',
      explanation: 'If the velocity is constant (same speed and same direction), there is no change in velocity, so the acceleration is zero.'
    },
    {
      id: 'accel-types-q3',
      question: 'You throw a ball straight up in the air. As it is rising to its highest point, what is the direction of its acceleration?',
      options: [ 'Upwards, in the direction of motion.', 'Downwards, due to gravity.', 'Zero, at the very top.', 'Sideways, due to air.' ],
      correctAnswer: 'Downwards, due to gravity.',
      explanation: 'This is a classic trick question! Gravity is always pulling the ball down. This downward acceleration is what causes the ball to slow down as it rises.'
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
            <h3 className="text-2xl font-bold mb-4 text-blue-500">The Meaning of the Sign</h3>
            <p className="text-lg leading-relaxed mb-4">
              Since acceleration is a vector, its sign (+ or -) is very important. It tells us about the direction of the change in velocity.
            </p>
          </div>
          
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Positive Acceleration</h3>
            <p className="text-lg leading-relaxed">
              This generally means the object is <strong>speeding up</strong> in the positive direction. The acceleration vector points in the same direction as the velocity vector.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Negative Acceleration</h3>
            <p className="text-lg leading-relaxed">
              This generally means the object is <strong>slowing down</strong> (decelerating) while moving in the positive direction. The acceleration vector points in the opposite direction to the velocity vector.
            </p>
          </div>
          
           <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Zero Acceleration</h3>
             <p className="text-lg leading-relaxed">
               This means the velocity is <strong>constant</strong>. The object is in "uniform motion."
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
               <p className="font-semibold text-center text-lg">Important: Zero acceleration does NOT mean zero velocity! An object can be moving very fast with zero acceleration.</p>
            </div>
           </div>
        </div>
        
        {/* --- Right Column - NOW CONTAINS ANIMATION AND QUIZ --- */}
        <div className="space-y-6">
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                <VectorArrowAnimation isDarkMode={isDarkMode} />
            </div>
            <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">What's the Sign?</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div></div>
              <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
              {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (
                <motion.button 
                  key={option} 
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
                  <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'This is a tricky one!'}</div>
                  <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
                  <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
                </motion.div>
              )}</AnimatePresence></> ) : ( 
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-4xl mb-4">🚦</div>
                <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Signs Understood!</div>
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
      slideId="accel-types"
      slideTitle="Positive, Negative, and Zero Acceleration"
      moduleId="motion"
      submoduleId="acceleration"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}