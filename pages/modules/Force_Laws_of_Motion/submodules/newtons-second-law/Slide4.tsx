import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS & DATA for the problems ---
type Variable = 'F' | 'm' | 'a';
type Problem = {
    text: string;
    values: { F: number; m: number; a: number; };
    solveFor: Variable;
};

const problems: Problem[] = [
    { text: "A net force of 60 N is applied to a 15 kg box. What is the acceleration of the box?", values: { F: 60, m: 15, a: 4 }, solveFor: 'a' },
    { text: "A 1200 kg car accelerates at 3 m/s². What is the net force acting on the car?", values: { F: 3600, m: 1200, a: 3 }, solveFor: 'F' },
    { text: "A net force of 200 N causes an object to accelerate at 5 m/s². What is the mass of the object?", values: { F: 200, m: 40, a: 5 }, solveFor: 'm' },
];

const formulas: { [key in Variable]: string } = {
    a: 'a = F / m',
    F: 'F = m \\cdot a',
    m: 'm = F / a',
};

// --- GUIDED PROBLEM SOLVING COMPONENT ---
const ProblemSolver = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [problemIndex, setProblemIndex] = useState(0);
    const [step, setStep] = useState(1);
    const [userInputs, setUserInputs] = useState<{ [key: string]: string }>({});
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | ''; msg: string }>({ type: '', msg: '' });
    const [showAnswer, setShowAnswer] = useState(false);
    
    const currentProblem = problems[problemIndex];
    const knowns = Object.keys(currentProblem.values).filter(k => k !== currentProblem.solveFor) as Variable[];

    const handleCheckStep1 = () => {
        const isCorrect = knowns.every(k => Number(userInputs[k]) === currentProblem.values[k]);
        if (isCorrect) {
            setFeedback({ type: 'correct', msg: 'Great! You identified the known variables.' });
            setTimeout(() => { setStep(2); setFeedback({ type: '', msg: '' }); }, 1500);
        } else {
            setFeedback({ type: 'incorrect', msg: 'Not quite. Check the numbers in the problem text again.' });
        }
    };

    const handleFormulaSelect = (formulaKey: Variable) => {
        if (formulaKey === currentProblem.solveFor) {
            setFeedback({ type: 'correct', msg: 'That\'s the right formula!' });
            setTimeout(() => { setStep(3); setFeedback({ type: '', msg: '' }); }, 1500);
        } else {
            setFeedback({ type: 'incorrect', msg: 'That formula solves for a different variable. Try another one.' });
        }
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    const handleNextProblem = () => {
        setProblemIndex((prev) => (prev + 1) % problems.length);
        setStep(1);
        setUserInputs({});
        setFeedback({ type: '', msg: '' });
        setShowAnswer(false);
    };

    const inputFields = knowns.map(key => (
        <div key={key} className="flex items-center space-x-2">
            <label className="font-bold text-lg w-16"><InlineMath>{`${key} =`}</InlineMath></label>
            <input type="number" value={userInputs[key] || ''} onChange={e => setUserInputs({...userInputs, [key]: e.target.value})}
             className={`w-full p-2 rounded-lg text-center font-mono text-xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'} border-2 border-transparent focus:border-blue-500 focus:outline-none`} />
        </div>
    ));

    return (
        <div className="flex flex-col h-full">
            <p className="text-lg p-4 rounded-lg bg-slate-200/50 dark:bg-black/20 mb-6 min-h-[6rem]">{currentProblem.text}</p>
            
            <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    {step === 1 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 1: Identify Known Variables</h3>
                            <div className="space-y-4">{inputFields}</div>
                            <button onClick={handleCheckStep1} className="w-full mt-6 bg-blue-600 text-white font-bold py-2 rounded-lg">Check</button>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 2: Choose the Correct Formula</h3>
                            <div className="space-y-3">
                                {Object.entries(formulas).map(([key, value]) => (
                                    <button key={key} onClick={() => handleFormulaSelect(key as Variable)}
                                     className={`w-full p-3 rounded-lg text-xl font-mono border-2 ${isDarkMode ? 'bg-slate-700 hover:border-blue-400' : 'bg-slate-200 hover:border-blue-500'}`}>
                                        <InlineMath>{value}</InlineMath>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 3: Substitute and Solve</h3>
                            <div className={`p-6 rounded-lg font-mono text-3xl ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                                <InlineMath>{`${currentProblem.solveFor} = ${formulas[currentProblem.solveFor].split('=')[1].replace('F', String(currentProblem.values.F)).replace('m', String(currentProblem.values.m)).replace('a', String(currentProblem.values.a))}`}</InlineMath>
                            </div>
                            {!showAnswer && <button onClick={handleShowAnswer} className="w-full mt-6 bg-blue-600 text-white font-bold py-2 rounded-lg">Calculate</button>}
                            <AnimatePresence>
                                {showAnswer && (
                                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                                        <div className={`mt-6 p-4 rounded-lg text-3xl font-bold bg-green-500/20 text-green-500`}>
                                            <InlineMath>{`${currentProblem.solveFor} = ${currentProblem.values[currentProblem.solveFor]}`}</InlineMath>
                                        </div>
                                        <button onClick={handleNextProblem} className="w-full mt-6 bg-green-600 text-white font-bold py-2 rounded-lg">Next Problem</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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

export default function NewtonsSecondLawSlide4() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full flex justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="w-full max-w-2xl p-8 flex flex-col justify-center">
                <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
                    <ProblemSolver isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n2-problems"
            slideTitle="Problem-Solving with F=ma"
            moduleId="force-and-laws"
            submoduleId="newtons-second-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}