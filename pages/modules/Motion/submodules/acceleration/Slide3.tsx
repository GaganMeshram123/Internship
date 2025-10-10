import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS for TypeScript ---
type EasingName = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'circIn' | 'circOut' | 'circInOut' | 'backIn' | 'backOut' | 'backInOut' | 'anticipate';

type Scenario = {
    id: string;
    title: string;
    desc: string;
    vDirection: 1 | -1;
    carStart: number;
    carEnd: number;
    velStart: number;
    velEnd: number;
    aDirection: 0 | 1 | -1;
    ease: EasingName;
    duration: number;
};

// --- DATA-DRIVEN ANIMATION SCENARIOS (Zero Acceleration ADDED) ---
const scenarios: Scenario[] = [
    {
        id: 'idle',
        title: "Click 'Start'",
        desc: "Visualize the concepts of acceleration.",
        vDirection: 1, carStart: 50, carEnd: 50, velStart: 0, velEnd: 0, aDirection: 0, ease: 'linear', duration: 0
    },
    {
        id: 'pos_v_pos_a',
        title: "Positive Acceleration",
        desc: "Speeding up in the positive direction (v →, a →).",
        vDirection: 1, carStart: 50, carEnd: 300, velStart: 0, velEnd: 80, aDirection: 1, ease: 'easeIn', duration: 2.5
    },
    {
        id: 'pos_v_neg_a',
        title: "Negative Acceleration",
        desc: "Slowing down in the positive direction (v →, a ←).",
        vDirection: 1, carStart: 50, carEnd: 200, velStart: 80, velEnd: 10, aDirection: -1, ease: 'easeOut', duration: 2.5
    },
    {
        id: 'zero_accel',
        title: "Zero Acceleration",
        desc: "Constant velocity (uniform motion). No acceleration.",
        vDirection: 1, carStart: 50, carEnd: 300, velStart: 50, velEnd: 50, aDirection: 0, ease: 'linear', duration: 2.5
    },
    {
        id: 'neg_v_neg_a',
        title: "Negative Acceleration",
        desc: "Speeding up in the negative direction (v ←, a ←).",
        vDirection: -1, carStart: 350, carEnd: 100, velStart: 0, velEnd: 80, aDirection: -1, ease: 'easeIn', duration: 2.5
    },
    {
        id: 'neg_v_pos_a',
        title: "Positive Acceleration",
        desc: "Slowing down in the negative direction (v ←, a →).",
        vDirection: -1, carStart: 350, carEnd: 250, velStart: 80, velEnd: 10, aDirection: 1, ease: 'easeOut', duration: 2.5
    },
];

// --- INTERACTIVE ANIMATION COMPONENT ---
const VectorArrowAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [scenarioIndex, setScenarioIndex] = useState(0);

    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const lineColor = isDarkMode ? '#64748b' : '#94a3b8';
    const velocityColor = '#3b82f6'; // Blue
    const accelerationColor = isDarkMode ? '#f87171' : '#ef4444'; // Red
    
    const carX = useMotionValue(scenarios[0].carStart);
    const velocityWidth = useMotionValue(scenarios[0].velStart);

    const runAnimation = (newIndex: number) => {
        const scenario = scenarios[newIndex];
        if (!scenario || newIndex === 0) {
            handleReset();
            return;
        };

        setScenarioIndex(newIndex);
        carX.set(scenario.carStart);
        velocityWidth.set(scenario.velStart);
        
        animate(velocityWidth, scenario.velEnd, { duration: scenario.duration, ease: scenario.ease });
        animate(carX, scenario.carEnd, { duration: scenario.duration, ease: scenario.ease });
    };
    
    const handleReset = () => {
        carX.stop();
        velocityWidth.stop();
        setScenarioIndex(0);
        carX.set(scenarios[0].carStart);
        velocityWidth.set(scenarios[0].velStart);
    };

    const currentScenario = scenarios[scenarioIndex];

    const velocityLabelX = (velocityWidth.get() * currentScenario.vDirection) / 2;

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Visualizing Acceleration Vectors</h3>
            
            <div className="relative w-full h-48 flex-grow flex flex-col justify-center">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    <line x1="10" y1="80" x2="390" y2="80" stroke={lineColor} strokeWidth="1" />

                    <motion.g 
                        style={{ x: carX, y: 55, scaleX: currentScenario.vDirection }}
                    >
                        <rect x="-20" y="0" width="40" height="20" rx="3" fill={textColor} />
                        <circle cx="-10" cy="20" r="5" fill={textColor} />
                        <circle cx="10" cy="20" r="5" fill={textColor} />
                    </motion.g>

                    {/* Velocity Arrow */}
                    <motion.g style={{ x: carX, y: 30 }}>
                        <motion.line 
                            stroke={velocityColor} 
                            strokeWidth="3"
                            initial={{pathLength: 0}} animate={{pathLength: 1}}
                            d={`M 0 0 L ${velocityWidth.get() * currentScenario.vDirection} 0`}
                        />
                        <motion.path 
                            fill={velocityColor}
                            d={currentScenario.vDirection === 1 ? "M 0 0 L -5 -4 L -5 4 z" : "M 0 0 L 5 -4 L 5 4 z"}
                            style={{ x: velocityWidth.get() * currentScenario.vDirection }}
                         />
                        <motion.text y="-5" textAnchor="middle" fill={velocityColor} fontSize="14" style={{ x: velocityLabelX }}>v</motion.text>
                    </motion.g>

                    {/* Acceleration Arrow */}
                    <AnimatePresence>
                    {currentScenario.aDirection !== 0 && (
                        <motion.g 
                            key={currentScenario.id}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ x: carX, y: 15 }}
                        >
                            <path d={`M 0 0 L ${40 * currentScenario.aDirection} 0`} stroke={accelerationColor} strokeWidth="3" />
                            <path d={currentScenario.aDirection === 1 ? "M 40 0 L 35 -4 L 35 4 z" : "M -40 0 L -35 -4 L -35 4 z"} fill={accelerationColor}/>
                            <motion.text y="-5" x={20 * currentScenario.aDirection} textAnchor="middle" fill={accelerationColor} fontSize="14">a</motion.text>
                        </motion.g>
                    )}
                    </AnimatePresence>
                </svg>
            </div>
             <div className="text-center h-12 mt-2">
                <AnimatePresence mode="wait">
                    <motion.div key={currentScenario.id} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        <p className="font-bold text-blue-500">{currentScenario.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{currentScenario.desc}</p>
                    </motion.div>
                </AnimatePresence>
             </div>
             <div className="flex items-center justify-center space-x-4 mt-2">
                <motion.button onClick={() => runAnimation(scenarioIndex + 1)} disabled={scenarioIndex >= scenarios.length - 1} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: scenarioIndex < scenarios.length - 1 ? 1.05 : 1}} whileTap={{ scale: scenarioIndex < scenarios.length - 1 ? 0.95 : 1 }}>
                    {scenarioIndex === 0 ? 'Start' : 'Next Example'}
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
              This can mean speeding up in the positive direction (v →, a →) OR slowing down in the negative direction (v ←, a →).
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Negative Acceleration</h3>
            <p className="text-lg leading-relaxed">
              This can mean slowing down in the positive direction (v →, a ←) OR speeding up in the negative direction (v ←, a ←).
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