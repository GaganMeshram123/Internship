import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, useTransform, useMotionValueEvent } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- REVISED COMPONENT with Path Labels ---
const RobotJourneyAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [step, setStep] = useState(0); // 0: initial, 1: east, 2: north, 3: displacement, 4: summary
    const totalSteps = 4;

    const textColor = isDarkMode ? '#e2e8f0' : '#334155';
    const gridColor = isDarkMode ? '#475569' : '#e2e8f0';
    const distanceColor = isDarkMode ? '#f87171' : '#ef4444'; // Red
    const displacementColor = '#3b82f6'; // Blue
    const robotColor = isDarkMode ? '#f1f5f9' : '#1e293b';

    const distanceCount = useMotionValue(0);
    const [distanceDisplay, setDistanceDisplay] = useState(0);

    useMotionValueEvent(distanceCount, "change", (latest) => {
        setDistanceDisplay(Math.round(latest));
    });
    
    const handleNext = () => {
        const newStep = Math.min(step + 1, totalSteps);
        setStep(newStep);
        if (newStep === 1) {
            animate(distanceCount, 8, { duration: 1.5, ease: "linear" });
        }
        if (newStep === 2) {
            animate(distanceCount, 14, { duration: 1, ease: "linear" });
        }
    };

    const handleReset = () => {
        setStep(0);
        distanceCount.set(0);
        setDistanceDisplay(0);
    };

    const gridProps = { x: 20, y: 10, width: 260, height: 182, spacing: 26 };
    const origin = { x: gridProps.x, y: gridProps.y + gridProps.height };
    const pointA = { x: origin.x + 8 * (gridProps.spacing / 2), y: origin.y };
    const pointB = { x: pointA.x, y: pointA.y - 6 * (gridProps.spacing / 2) };
    
    const RobotIcon = () => (
        <g>
            <rect x="-6" y="-12" width="12" height="10" rx="2" fill={robotColor} stroke={textColor} strokeWidth="0.5"/>
            <rect x="-4" y="-15" width="8" height="4" rx="1" fill={robotColor} stroke={textColor} strokeWidth="0.5"/>
            <circle cx="0" cy="-17" r="2" fill={robotColor} stroke={textColor} strokeWidth="0.5"/>
        </g>
    );

    const messages: {[key: number]: React.ReactNode} = {
        1: "The robot moves 8 units East.",
        2: "It then moves 6 units North. The total distance is 14 units.",
        3: <span>Displacement is the direct path. Its magnitude is <InlineMath math="\sqrt{8^2 + 6^2} = 10" /> units.</span>,
        4: "Conclusion: The Distance (14 units) is not the same as the Displacement (10 units)."
    };
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-around mb-4 text-center p-3 rounded-xl bg-slate-100 dark:bg-slate-900/50">
                <div>
                    <p className="font-semibold text-sm" style={{color: distanceColor}}>Total Distance</p>
                    <p className="text-2xl font-bold" style={{color: distanceColor}}>{distanceDisplay} units</p>
                </div>
                <div>
                    <p className="font-semibold text-sm" style={{color: displacementColor}}>Displacement</p>
                    <p className="text-2xl font-bold" style={{color: displacementColor}}>
                        {step >= 3 ? '10 units' : '0 units'}
                    </p>
                </div>
            </div>
             <svg viewBox="0 0 300 230" className="w-full flex-grow rounded-md bg-slate-200 dark:bg-slate-800">
                {/* Grid */}
                <g>
                    {Array.from({ length: 11 }).map((_, i) => (
                        <path key={`v-${i}`} d={`M ${gridProps.x + i * gridProps.spacing} ${gridProps.y} V ${gridProps.y + gridProps.height}`} stroke={gridColor} strokeWidth="0.5" />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <path key={`h-${i}`} d={`M ${gridProps.x} ${gridProps.y + i * gridProps.spacing} H ${gridProps.x + gridProps.width}`} stroke={gridColor} strokeWidth="0.5" />
                    ))}
                </g>
                <text x={origin.x - 12} y={origin.y + 12} fontSize="8" fill={textColor}>Origin</text>
                <text x={pointA.x - 5} y={pointA.y + 12} fontSize="8" fill={textColor}>A</text>
                <text x={pointB.x + 5} y={pointB.y} fontSize="8" fill={textColor}>B</text>

                {/* Paths */}
                {step >= 1 && <motion.line x1={origin.x} y1={origin.y} x2={pointA.x} y2={pointA.y} stroke={distanceColor} strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: 'linear' }} />}
                {step >= 2 && <motion.line x1={pointA.x} y1={pointA.y} x2={pointB.x} y2={pointB.y} stroke={distanceColor} strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: 'linear' }} />}
                {step >= 3 && <motion.line x1={origin.x} y1={origin.y} x2={pointB.x} y2={pointB.y} stroke={displacementColor} strokeWidth="2.5" strokeDasharray="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />}
                
                {/* --- NEW: Path Labels --- */}
                <AnimatePresence>
                    {step >= 1 && <motion.text x={(origin.x + pointA.x) / 2} y={origin.y - 5} textAnchor="middle" fontSize="8" fill={distanceColor} initial={{opacity:0}} animate={{opacity:1}}>8 units</motion.text>}
                    {step >= 2 && <motion.text x={pointA.x + 5} y={(pointA.y + pointB.y) / 2} dominantBaseline="middle" fontSize="8" fill={distanceColor} initial={{opacity:0}} animate={{opacity:1}} transform={`rotate(90, ${pointA.x + 5}, ${(pointA.y + pointB.y) / 2})`}>6 units</motion.text>}
                    {step >= 3 && <motion.text x={(origin.x + pointB.x) / 2} y={(origin.y + pointB.y) / 2} dy="-5" textAnchor="middle" fontSize="8" fill={displacementColor} initial={{opacity:0}} animate={{opacity:1}} transform={`rotate(-37, ${(origin.x + pointB.x) / 2}, ${(origin.y + pointB.y) / 2})`}>10 units</motion.text>}
                </AnimatePresence>
                
                {/* Robot */}
                {step > 0 && (
                    <motion.g initial={{ x: origin.x, y: origin.y }} animate={ step >= 2 ? { x: pointB.x, y: pointB.y } : (step >= 1 ? { x: pointA.x, y: pointA.y } : {}) } transition={{ duration: step === 1 ? 1.5 : 1, ease: 'linear' }}>
                        <RobotIcon />
                    </motion.g>
                )}
             </svg>
            <div className="text-center h-10 mt-3 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.p key={step} className="text-base text-slate-600 dark:text-slate-300" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                        {messages[step] || "Click 'Start' to trace the robot's path."}
                    </motion.p>
                </AnimatePresence>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-2">
                <motion.button onClick={handleNext} disabled={step >= totalSteps} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: step < totalSteps ? 1.05 : 1}} whileTap={{ scale: step < totalSteps ? 0.95 : 1 }}>
                    {step === 0 ? 'Start' : 'Next'}
                </motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Reset
                </motion.button>
            </div>
        </div>
    );
};

export default function DistanceDisplacementSlide5() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'interactive-distance',
      question: 'Based on the robot\'s path from the Origin to Point B, what is the total distance it traveled?',
      options: ['8 units', '6 units', '10 units', '14 units'],
      correctAnswer: '14 units',
      explanation: 'The robot traveled 8 units East and then 6 units North. The total distance is the sum of these paths: 8 + 6 = 14 units.'
    },
    {
      id: 'interactive-displacement',
      question: 'What is the magnitude of the robot\'s displacement from the Origin to Point B? (Hint: a² + b² = c²)',
      options: ['8 units', '14 units', '10 units', '6 units'],
      correctAnswer: '10 units',
      explanation: 'Displacement is the straight line from start to finish. This forms a right-angled triangle. Using Pythagoras: √(8² + 6²) = √(64 + 36) = √100 = 10 units.'
    },
    {
      id: 'interactive-round-trip',
      question: 'If the robot returns from Point B directly to the Origin (0,0), what is its displacement for the ENTIRE trip?',
      options: ['10 units', '0 units', '24 units', '14 units'],
      correctAnswer: '0 units',
      explanation: 'For the entire round trip, the robot starts at the origin and ends at the origin. Since the starting and ending points are the same, the final displacement is zero.'
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
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg space-y-6`}>
           <h3 className="text-2xl font-bold text-blue-500">Putting It All Together</h3>
          <p className="text-lg leading-relaxed">
            Let's analyze the journey of a small robot on a grid. This will test your understanding of all the concepts we've covered.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
            <h4 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">The Robot's Path</h4>
            <ul className="list-decimal list-inside space-y-2 text-lg">
                <li>The robot starts at the <strong>Origin (0, 0)</strong>.</li>
                <li>It moves <strong>8 units East</strong> to Point A (8, 0).</li>
                <li>Then, it moves <strong>6 units North</strong> to Point B (8, 6).</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <RobotJourneyAnimation isDarkMode={isDarkMode} />
          </div>
          
          <p className="text-lg leading-relaxed">Now, use the interactive visualization to help answer the questions on the right.</p>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Analyze the Journey</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div></div>
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
                  <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Great analysis!' : 'Let\'s check the path again.'}</div>
                  <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
                  <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
                </motion.div>
              )}</AnimatePresence>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="text-4xl mb-4">🤖</div>
              <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Analysis Complete!</div>
              <div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="dd-interactive-example" 
      slideTitle="Interactive Example: Tracing a Path" 
      moduleId="motion" 
      submoduleId="distance-displacement"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}