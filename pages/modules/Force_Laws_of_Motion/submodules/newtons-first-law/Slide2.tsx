import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- Simplified data for text display ---
const statusInfo = {
    idle: { title: 'Select a State', desc: "Use the buttons to set the probe's initial state or apply forces." },
    rest: { title: 'State of Rest', desc: 'The probe is stationary. Its velocity is zero and will not change unless a force acts on it.' },
    motion: { title: 'Uniform Motion', desc: 'The probe glides at a constant velocity. Notice the net force is still zero!' },
};

// --- INTERACTIVE SIMULATION COMPONENT (with UI Redesign) ---
const StateOfMotionAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [status, setStatus] = useState(statusInfo.idle);
    
    const probeX = useMotionValue(200);
    const probeVelocity = useRef(0);
    const [activeForces, setActiveForces] = useState({ left: false, right: false });

    const THRUST_FORCE = 0.05;
    const MASS = 1;
    const MAX_VELOCITY = 3;
    // NOTE: A tiny bit of friction is kept for simulation stability, but it's close to a vacuum.
    const FRICTION = 0.998;

    useAnimationFrame((time, delta) => {
        let netForce = 0;
        if (activeForces.right) netForce += THRUST_FORCE;
        if (activeForces.left) netForce -= THRUST_FORCE;

        const acceleration = netForce / MASS;
        probeVelocity.current += acceleration * (delta / 16);
        // In a true vacuum, this line would be gone. It's here to prevent infinite speed.
        probeVelocity.current *= FRICTION; 
        probeVelocity.current = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, probeVelocity.current));

        let newX = probeX.get() + probeVelocity.current;
        if (newX > 425) newX = -25;
        if (newX < -25) newX = 425;
        probeX.set(newX);
    });

    const setupState = (state: 'rest' | 'motion') => {
        setStatus(statusInfo[state]);
        probeX.set(state === 'rest' ? 200 : 50);
        probeVelocity.current = state === 'rest' ? 0 : 1.5;
    };

    const handleReset = () => {
        setStatus(statusInfo.idle);
        probeX.set(200);
        probeVelocity.current = 0;
        setActiveForces({left: false, right: false});
    };
    
    const handleForceChange = (side: 'left' | 'right', isActive: boolean) => {
        setActiveForces(prev => ({ ...prev, [side]: isActive }));
    };

    const netForce = (activeForces.right ? THRUST_FORCE : 0) + (activeForces.left ? -THRUST_FORCE : 0);
    const velocityText = `v = ${probeVelocity.current.toFixed(1)} m/s`;
    const netForceText = `ΣF ${netForce.toFixed(2) !== '0.00' ? '≠' : '='} 0 N`;

    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const forceColor = isDarkMode ? '#f87171' : '#ef4444';
    const velocityColor = isDarkMode ? '#4ade80' : '#22c55e';
    
    const SpaceProbe = () => (
        <g>
            <path d="M -25 10 L -25 -10 L 0 -20 L 25 -10 L 25 10 L 0 20 Z" fill={textColor} />
            <rect x="-10" y="-5" width="20" height="10" rx="2" fill={isDarkMode ? '#475569' : '#e2e8f0'} />
        </g>
    );

    const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
    const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Space Probe Simulation</h3>
            <div className="relative w-full h-48 flex-grow flex flex-col justify-center bg-black/10 dark:bg-black/20 rounded-lg overflow-hidden">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    <circle cx="80" cy="30" r="1" fill={textColor} opacity="0.5" /><circle cx="320" cy="60" r="1" fill={textColor} opacity="0.5" /><circle cx="150" cy="70" r="1.5" fill={textColor} opacity="0.7" /><circle cx="250" cy="20" r="1" fill={textColor} opacity="0.6" />
                    <motion.g style={{ x: probeX, y: 50 }}>
                        <SpaceProbe />
                        <AnimatePresence>
                        {Math.abs(probeVelocity.current) > 0.1 && (
                            <motion.g initial={{ opacity: 0}} animate={{ opacity: 1}} exit={{ opacity: 0}}>
                                <path d={`M 0 0 L ${probeVelocity.current * 20} 0`} stroke={velocityColor} strokeWidth="2" />
                                <path d={`M ${probeVelocity.current * 20} 0 L ${probeVelocity.current * 20 - (probeVelocity.current > 0 ? 5 : -5)} -4 L ${probeVelocity.current * 20 - (probeVelocity.current > 0 ? 5 : -5)} 4 z`} fill={velocityColor}/>
                            </motion.g>
                        )}
                        </AnimatePresence>
                        {activeForces.right && <path d="M -35 0 L -25 0 M -35 0 L -30 -3 L -30 3 z" stroke={forceColor} strokeWidth="2" fill={forceColor} />}
                        {activeForces.left && <path d="M 35 0 L 25 0 M 35 0 L 30 -3 L 30 3 z" stroke={forceColor} strokeWidth="2" fill={forceColor} />}
                    </motion.g>
                </svg>
            </div>
            
            <div className="text-center h-16 mt-2 p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                <p className="font-bold text-blue-500">{status.title}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{status.desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                 <div className="p-3 text-center rounded-lg bg-slate-200 dark:bg-slate-700 font-mono text-lg">{velocityText}</div>
                 <div className="p-3 text-center rounded-lg bg-slate-200 dark:bg-slate-700 font-mono text-lg">{netForceText}</div>
            </div>
            
            <div className="flex items-center justify-between mt-6">
                <motion.button 
                    title="Push Left"
                    onMouseDown={() => handleForceChange('left', true)} onMouseUp={() => handleForceChange('left', false)} onMouseLeave={() => handleForceChange('left', false)}
                    onTouchStart={() => handleForceChange('left', true)} onTouchEnd={() => handleForceChange('left', false)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold w-16 h-10 flex items-center justify-center rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <ArrowLeftIcon />
                </motion.button>
                
                <div className='flex items-center space-x-2'>
                     <motion.button onClick={() => setupState('rest')} className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-3 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Set to Rest</motion.button>
                     <motion.button onClick={() => setupState('motion')} className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-3 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Set to Motion</motion.button>
                     <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-3 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
                </div>

                <motion.button 
                    title="Push Right"
                    onMouseDown={() => handleForceChange('right', true)} onMouseUp={() => handleForceChange('right', false)} onMouseLeave={() => handleForceChange('right', false)}
                    onTouchStart={() => handleForceChange('right', true)} onTouchEnd={() => handleForceChange('right', false)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold w-16 h-10 flex items-center justify-center rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <ArrowRightIcon />
                </motion.button>
            </div>
        </div>
    );
};

// --- NEW: Quiz Component to check for understanding ---
const QuizComponent = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const question = {
        text: "What is the net force on a hockey puck gliding on smooth ice at a constant velocity?",
        options: ["A large constant force", "A small constant force", "Zero", "It depends on the speed"],
        correctAnswerIndex: 2,
    };
    const handleSubmit = () => {
        if (selectedOption === null) return;
        setIsSubmitted(true);
    };

    return (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Quick Check</h3>
            <p className="mb-4 text-lg">{question.text}</p>
            <div className="space-y-3">
                {question.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrectAnswer = index === question.correctAnswerIndex;
                    let buttonClass = isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300';
                    if (isSelected && !isSubmitted) buttonClass = 'bg-blue-600 text-white';
                    if (isSubmitted && isCorrectAnswer) buttonClass = 'bg-green-600 text-white';
                    if (isSubmitted && isSelected && !isCorrectAnswer) buttonClass = 'bg-red-600 text-white';
                    return (
                        <button key={index} onClick={() => !isSubmitted && setSelectedOption(index)} className={`w-full text-left p-3 rounded-lg transition-colors text-base ${buttonClass}`} disabled={isSubmitted}>{option}</button>
                    );
                })}
            </div>
            <div className="mt-5 h-12 flex items-center">
                {!isSubmitted ? (
                    <motion.button onClick={handleSubmit} disabled={selectedOption === null} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: selectedOption !== null ? 1.05 : 1 }}>Check Answer</motion.button>
                ) : (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`font-bold ${selectedOption === question.correctAnswerIndex ? 'text-green-500' : 'text-red-500'}`}>
                        {selectedOption === question.correctAnswerIndex ? 'Correct! With no friction, the net force is zero.' : 'Not quite. The net force is zero for constant velocity.'}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default function NewtonsFirstLawSlide2() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                {/* --- MODIFIED: Left column now contains more content cards --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">The Two States of Equilibrium</h3>
                        <p className="text-lg leading-relaxed">Newton's First Law describes two states where an object's motion is stable and unchanging. In both states, the <strong>net force</strong> on the object is zero.</p>
                        {/* --- NEW: What is Net Force? --- */}
                        <div className="mt-4 p-3 border-l-4 border-sky-500 bg-sky-500/10 text-sky-200">
                           <p className="font-semibold">What is Net Force?</p>
                           <p className="text-sm">Net force is the overall force acting on an object when all individual forces are combined. If forces are balanced, the net force is zero.</p>
                        </div>
                    </div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">1. State of Rest</h3><p className="text-lg leading-relaxed">An object at rest has a velocity of zero. It will remain at rest forever unless an unbalanced force acts on it.</p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">2. Uniform Motion</h3>
                        <p className="text-lg leading-relaxed">An object in uniform motion moves with a <strong>constant velocity</strong>. It will continue this motion forever unless an unbalanced force acts on it.</p>
                        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg"><p className="font-semibold text-center">A force is NOT needed to keep an object moving. A force is only needed to CHANGE its motion.</p></div>
                    </div>
                    {/* --- NEW: Why Things Stop on Earth --- */}
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-amber-500 dark:text-amber-400">Why Do Things Stop on Earth?</h3>
                        <p className="text-lg leading-relaxed">In our daily lives, forces like <strong>friction</strong> and <strong>air resistance</strong> cause moving objects to slow down. The space probe simulation shows what happens in a near-vacuum, where these forces are absent.</p>
                    </div>
                </div>
                {/* --- MODIFIED: Right column now stacks the simulation and the new quiz --- */}
                <div className="flex flex-col justify-center space-y-8">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <StateOfMotionAnimation isDarkMode={isDarkMode} />
                    </div>
                    <QuizComponent isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n1-states"
            slideTitle="State of Rest and Uniform Motion"
            moduleId="force-and-laws"
            submoduleId="newtons-first-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}