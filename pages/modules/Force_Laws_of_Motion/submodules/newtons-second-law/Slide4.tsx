import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS & EXPANDED DATA for the problems ---
type Variable = 'F' | 'm' | 'a';
type Problem = {
    text: string;
    values: { F: number; m: number; a: number; };
    solveFor: Variable;
    units: { F: string; m: string; a: string; };
};

const problems: Problem[] = [
    { text: "A net force of 60 N is applied to a 15 kg box. What is the acceleration of the box?", values: { F: 60, m: 15, a: 4 }, solveFor: 'a', units: { F: 'N', m: 'kg', a: 'm/s²' } },
    { text: "A 1200 kg car accelerates at 3 m/s². What is the net force acting on the car?", values: { F: 3600, m: 1200, a: 3 }, solveFor: 'F', units: { F: 'N', m: 'kg', a: 'm/s²' } },
    { text: "A net force of 200 N causes an object to accelerate at 5 m/s². What is the mass of the object?", values: { F: 200, m: 40, a: 5 }, solveFor: 'm', units: { F: 'N', m: 'kg', a: 'm/s²' } },
    { text: "A rocket with a mass of 50,000 kg produces a thrust of 1,000,000 N. What is its initial acceleration?", values: { F: 1000000, m: 50000, a: 20 }, solveFor: 'a', units: { F: 'N', m: 'kg', a: 'm/s²' }},
    { text: "How much force is needed to make a 0.5 kg baseball accelerate at 40 m/s²?", values: { F: 20, m: 0.5, a: 40 }, solveFor: 'F', units: { F: 'N', m: 'kg', a: 'm/s²' }},
];

const formulas: { [key in Variable]: string } = {
    a: 'a = F / m',
    F: 'F = m \\cdot a',
    m: 'm = F / a',
};

// --- NEW: VISUALIZER COMPONENT ---
const ProblemVisualizer = ({ problem, isDarkMode }: { problem: Problem, isDarkMode: boolean }) => {
    const { F, m, a } = problem.values;
    const duration = 5 / Math.sqrt(a); // Faster acceleration = shorter duration
    const boxColor = isDarkMode ? '#94a3b8' : '#64748b';

    return (
        <div className="w-full h-48 bg-slate-200/50 dark:bg-black/20 rounded-lg p-4 flex flex-col justify-center items-center">
             <svg viewBox="0 0 400 100" className="w-full h-full">
                <line x1="10" y1="80" x2="390" y2="80" stroke={isDarkMode ? '#64748b' : '#94a3b8'} strokeWidth="1" />
                <motion.g
                    initial={{ x: 50 }}
                    animate={{ x: 350 }}
                    transition={{ duration: Math.min(duration, 4), ease: 'easeIn' }}
                >
                    <rect y={80 - (15 + m*0.01)} width={30 + m*0.02} height={15 + m*0.01} rx="3" fill={boxColor} />
                    <path d={`M -5 ${80 - (7.5 + m*0.005)} L ${-5 - F*0.01} ${80 - (7.5 + m*0.005)}`} stroke="#ef4444" strokeWidth="3" />
                </motion.g>
            </svg>
            <p className="text-sm mt-2 text-center text-slate-500 dark:text-slate-400">Visualizing the result: a {m} kg mass accelerates at {a} m/s².</p>
        </div>
    );
};

// --- GUIDED PROBLEM SOLVING COMPONENT ---
const ProblemSolver = () => {
    const { isDarkMode } = useThemeContext();
    const [problemIndex, setProblemIndex] = useState(0);
    const [step, setStep] = useState(1);
    const [userInputs, setUserInputs] = useState<{ [key: string]: string }>({});
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | ''; msg: string }>({ type: '', msg: '' });
    
    const currentProblem = problems[problemIndex];
    const knowns = Object.keys(currentProblem.values).filter(k => k !== currentProblem.solveFor) as Variable[];

    const handleCheckStep = (currentStep: number, checkFn: () => boolean, correctMsg: string, incorrectMsg: string) => {
        if (checkFn()) {
            setFeedback({ type: 'correct', msg: correctMsg });
            setTimeout(() => { setStep(currentStep + 1); setFeedback({ type: '', msg: '' }); }, 1500);
        } else {
            setFeedback({ type: 'incorrect', msg: incorrectMsg });
        }
    };

    const handleNextProblem = () => {
        setProblemIndex((prev) => (prev + 1) % problems.length);
        setStep(1);
        setUserInputs({});
        setFeedback({ type: '', msg: '' });
    };

    return (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 shadow-lg w-full`}>
            <p className="text-lg p-4 rounded-lg bg-slate-200/50 dark:bg-black/20 mb-6 min-h-[6rem]">{currentProblem.text}</p>
            
            <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    {/* Step 1: Identify Knowns */}
                    {step === 1 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 1: Identify Known Variables</h3>
                            <div className="space-y-4">
                                {knowns.map(key => (
                                    <div key={key} className="flex items-center space-x-2">
                                        <label className="font-bold text-lg w-20"><InlineMath>{`${key} =`}</InlineMath></label>
                                        <input type="number" value={userInputs[key] || ''} onChange={e => setUserInputs({...userInputs, [key]: e.target.value})}
                                            className={`w-full p-2 rounded-lg text-center font-mono text-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => handleCheckStep(1, () => knowns.every(k => Number(userInputs[k]) === currentProblem.values[k]), 'Great! Variables identified.', 'Not quite. Check the numbers again.')}
                                className="w-full mt-6 bg-blue-600 text-white font-bold py-2 rounded-lg">Check</button>
                        </div>
                    )}
                    {/* Step 2: Choose Formula */}
                    {step === 2 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 2: Choose the Correct Formula</h3>
                            <div className="space-y-3">
                                {Object.entries(formulas).map(([key, value]) => (
                                    <button key={key} onClick={() => handleCheckStep(2, () => key === currentProblem.solveFor, 'That\'s the right formula!', 'That formula solves for a different variable.')}
                                        className={`w-full p-3 rounded-lg text-xl font-mono border-2 ${isDarkMode ? 'bg-slate-700 hover:border-blue-400' : 'bg-slate-200 hover:border-blue-500'}`}>
                                        <InlineMath>{value}</InlineMath>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Step 3: Substitute */}
                    {step === 3 && (
                         <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 3: Substitute Values</h3>
                            <div className={`p-6 rounded-lg font-mono text-2xl md:text-3xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                                <InlineMath>{`${currentProblem.solveFor} = ${formulas[currentProblem.solveFor].split('=')[1].replace('F', String(currentProblem.values.F)).replace('m', String(currentProblem.values.m)).replace('a', String(currentProblem.values.a))}`}</InlineMath>
                            </div>
                            <button onClick={() => setStep(4)} className="w-full mt-6 bg-blue-600 text-white font-bold py-2 rounded-lg">Now Solve!</button>
                        </div>
                    )}
                     {/* Step 4: Solve */}
                     {step === 4 && (
                        <div>
                           <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 4: Solve for the Answer</h3>
                           <div className="flex items-center space-x-2">
                               <label className="font-bold text-lg w-20"><InlineMath>{`${currentProblem.solveFor} =`}</InlineMath></label>
                               <input type="number" placeholder="?" value={userInputs.answer || ''} onChange={e => setUserInputs({...userInputs, answer: e.target.value})}
                                   className={`w-full p-2 rounded-lg text-center font-mono text-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                               <span className="font-semibold text-lg">{currentProblem.units[currentProblem.solveFor]}</span>
                           </div>
                           <button onClick={() => handleCheckStep(4, () => Number(userInputs.answer) === currentProblem.values[currentProblem.solveFor], 'Correct!', 'Check your calculation.')}
                               className="w-full mt-6 bg-blue-600 text-white font-bold py-2 rounded-lg">Check Answer</button>
                        </div>
                     )}
                     {/* Step 5: Final Answer & Visualization */}
                     {step === 5 && (
                         <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4 text-green-500">Problem Solved!</h3>
                             <div className={`mt-4 p-4 rounded-lg text-3xl font-bold bg-green-500/20 text-green-500`}>
                                 <InlineMath>{`${currentProblem.solveFor} = ${currentProblem.values[currentProblem.solveFor]} \\, ${currentProblem.units[currentProblem.solveFor].replace('m/s²', '\\text{m/s}^2')}`}</InlineMath>
                            </div>
                            <p className="mt-4 text-lg">This means the {currentProblem.solveFor === 'F' ? 'force caused' : (currentProblem.solveFor === 'm' ? 'mass is' : 'object will speed up by')} {currentProblem.values[currentProblem.solveFor]} {currentProblem.units[currentProblem.solveFor]} {currentProblem.solveFor === 'a' ? 'every second.' : ''}</p>
                            <button onClick={handleNextProblem} className="w-full mt-6 bg-green-600 text-white font-bold py-2 rounded-lg">Next Problem</button>
                         </div>
                     )}
                </motion.div>
            </AnimatePresence>
            <AnimatePresence>
                {feedback.msg && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className={`mt-4 p-2 text-center rounded-md text-sm font-semibold ${feedback.type === 'correct' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {feedback.msg}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function NewtonsSecondLawSlide4() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    // This state is needed to pass the current problem to the visualizer
    // It will be a bit complex to lift state, so for simplicity we'll just keep it in one component
    // In a real app, this would be handled by a context or state manager.
    // For now, let's integrate the logic into a single component.

    const [problemIndex, setProblemIndex] = useState(0);
    const [currentStep, setCurrentStep] = useState(1);
    const [showVisualizer, setShowVisualizer] = useState(false);
    
    // We need to manage the problem state here to pass to the visualizer
    const currentProblem = problems[problemIndex];
    
    // This is a simplified handler to know when to show the visualizer
    const onProblemSolved = () => {
        setShowVisualizer(true);
        setCurrentStep(5); // This would be the "solved" step
    };
    
    const onNextProblem = () => {
        setShowVisualizer(false);
        setProblemIndex((prev) => (prev+1) % problems.length);
        setCurrentStep(1);
    }


    return (
        <SlideComponentWrapper 
            slideId="n2-problems"
            slideTitle="Problem-Solving with F=ma"
            moduleId="force-and-laws"
            submoduleId="newtons-second-law"
            interactions={localInteractions}
        >
             <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full items-start">
                    {/* Left Column: Problem Solver */}
                    <div className="w-full">
                         <ProblemSolver />
                    </div>

                    {/* Right Column: Visualizer */}
                     <div className="w-full flex flex-col justify-start items-center space-y-4 pt-8">
                         <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Conceptual Visualizer</h3>
                         <AnimatePresence>
                         {/* A bit of a hack to re-render the visualizer when the problem is solved */}
                         {/* A better solution would involve lifting state up, but this works for a single component */}
                         {currentStep === 5 && (
                             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
                                <ProblemVisualizer problem={currentProblem} isDarkMode={isDarkMode} />
                             </motion.div>
                         )}
                         </AnimatePresence>
                         {currentStep !== 5 && (
                            <div className="w-full h-48 bg-slate-200/50 dark:bg-black/20 rounded-lg flex justify-center items-center">
                                <p className="text-slate-500 dark:text-slate-400">Solve the problem to see the animation!</p>
                            </div>
                         )}
                     </div>
                 </div>
             </div>
        </SlideComponentWrapper>
    );
}