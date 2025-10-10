import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/Themed';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS & DATA for the problems ---
type Problem = {
    text: string;
    values: { m1: number; u1: number; m2: number; u2: number; };
};

const problems: Problem[] = [
    { text: "A 10 kg cart moving at 2 m/s collides with a 5 kg cart that is at rest. They stick together. What is their final velocity?", values: { m1: 10, u1: 2, m2: 5, u2: 0 } },
    { text: "A 4 kg fish swimming at 3 m/s swallows a 1 kg fish at rest. What is the velocity of the larger fish immediately after lunch?", values: { m1: 4, u1: 3, m2: 1, u2: 0 } },
    { text: "A 20 kg cart moving at 5 m/s collides with a 30 kg cart moving towards it at 2 m/s. They stick together. Find their final velocity.", values: { m1: 20, u1: 5, m2: 30, u2: -2 } },
];

// --- GUIDED PROBLEM SOLVING COMPONENT ---
const ConservationProblemSolver = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [problemIndex, setProblemIndex] = useState(0);
    const [step, setStep] = useState(1);
    const [userInputs, setUserInputs] = useState<{ [key: string]: string }>({});
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | ''; msg: string }>({ type: '', msg: '' });

    const currentProblem = problems[problemIndex];
    const { m1, u1, m2, u2 } = currentProblem.values;
    const pInitial = m1 * u1 + m2 * u2;
    const finalVelocity = pInitial / (m1 + m2);

    const handleCheckStep1 = () => {
        const isCorrect = ['m1', 'u1', 'm2', 'u2'].every(k => Number(userInputs[k]) === currentProblem.values[k as keyof Problem['values']]);
        if (isCorrect) {
            setFeedback({ type: 'correct', msg: 'Correct! All variables identified.' });
            setTimeout(() => { setStep(2); setFeedback({ type: '', msg: '' }); }, 1500);
        } else {
            setFeedback({ type: 'incorrect', msg: 'Not quite. Double-check the numbers and signs from the problem.' });
        }
    };

    const handleNextProblem = () => {
        setProblemIndex((prev) => (prev + 1) % problems.length);
        setStep(1);
        setUserInputs({});
        setFeedback({ type: '', msg: '' });
    };

    const inputFields = (
        <div className="grid grid-cols-2 gap-4">
            {['m1', 'u1', 'm2', 'u2'].map(key => (
                 <div key={key} className="flex items-center space-x-2">
                    <label className="font-bold text-lg w-20"><InlineMath>{`${key} =`}</InlineMath></label>
                    <input type="number" value={userInputs[key] || ''} onChange={e => setUserInputs({...userInputs, [key]: e.target.value})}
                     className={`w-full p-2 rounded-lg text-center font-mono text-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'} border-2 border-transparent focus:border-blue-500 focus:outline-none`} />
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col h-full">
            <p className="text-lg p-4 rounded-lg bg-slate-200/50 dark:bg-black/20 mb-6">{currentProblem.text}</p>
            
            <AnimatePresence mode="wait">
                <motion.div key={`${problemIndex}-${step}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    {step === 1 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 1: Identify Known Variables</h3>
                            {inputFields}
                            <button onClick={handleCheckStep1} className="w-full mt-6 bg-blue-600 text-white font-bold py-2 rounded-lg">Check Variables</button>
                        </div>
                    )}
                    {step >= 2 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 2: Calculate Initial Momentum</h3>
                            <div className={`p-4 rounded-lg font-mono text-xl md:text-2xl text-center ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                                <InlineMath>{`p_i = (${m1})(${u1}) + (${m2})(${u2}) = ${pInitial}`}</InlineMath>
                            </div>
                            <AnimatePresence>
                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                                    <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 3: Solve for Final Velocity</h3>
                                    <div className={`p-4 rounded-lg font-mono text-xl md:text-2xl text-center ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                                        <InlineMath>{`${pInitial} = (${m1} + ${m2}) \\cdot v_f`}</InlineMath>
                                    </div>
                                    <div className={`mt-4 p-4 rounded-lg text-3xl font-bold bg-green-500/20 text-green-500 text-center`}>
                                        <InlineMath>{`v_f = ${finalVelocity.toFixed(2)} \\, m/s`}</InlineMath>
                                    </div>
                                    <button onClick={handleNextProblem} className="w-full mt-6 bg-green-600 text-white font-bold py-2 rounded-lg">Next Problem</button>
                                </motion.div>
                            )}
                            </AnimatePresence>
                             {step === 2 && <button onClick={() => setStep(3)} className="w-full mt-6 bg-blue-600 text-white font-bold py-2 rounded-lg">Solve</button>}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {feedback.msg && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                     className={`mt-4 p-2 text-center rounded ${feedback.type === 'correct' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {feedback.msg}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function ConservationMomentumSlide4() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full flex justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="w-full max-w-3xl p-8 flex flex-col justify-center">
                 <div className="text-center mb-6">
                     <h3 className="text-2xl font-bold text-blue-500">Conservation of Momentum Problem Solver</h3>
                     <p className="text-slate-500">Follow the steps to solve the perfectly inelastic collision problems.</p>
                </div>
                <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
                    <ConservationProblemSolver isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="cm-problems"
            slideTitle="Solving Conservation Problems"
            moduleId="force-and-laws"
            submoduleId="conservation-of-momentum"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}