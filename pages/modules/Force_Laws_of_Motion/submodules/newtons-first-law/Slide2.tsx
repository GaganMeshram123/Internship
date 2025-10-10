import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS for this animation ---
type Scenario = {
    id: 'idle' | 'rest' | 'motion' | 'force';
    title: string;
    desc: string;
    startX: number;
    endX: number;
    duration: number;
    showForce: boolean;
    velocityText: string;
    netForceText: string;
};

// --- DATA for the animation scenarios ---
const scenarios: Record<string, Scenario> = {
    idle: { 
        id: 'idle', 
        title: 'Select a State', 
        desc: 'Choose a scenario to observe Newton\'s First Law.', 
        startX: 50, endX: 50, duration: 0, showForce: false, 
        velocityText: 'v = ?', 
        netForceText: 'ΣF = ?' 
    },
    rest: { 
        id: 'rest', 
        title: 'State of Rest', 
        desc: 'The probe is stationary. Its velocity is zero and does not change.', 
        startX: 100, endX: 100, duration: 0, showForce: false, 
        velocityText: 'v = 0 m/s', 
        netForceText: 'ΣF = 0 N' 
    },
    motion: { 
        id: 'motion', 
        title: 'Uniform Motion', 
        desc: 'The probe glides at a constant velocity. There is no change in its motion.', 
        startX: 50, endX: 350, duration: 3, showForce: false, 
        velocityText: 'v = constant', 
        netForceText: 'ΣF = 0 N' 
    },
    force: { 
        id: 'force', 
        title: 'Unbalanced Force', 
        desc: 'An external force is applied, causing the probe to slow down (accelerate).', 
        startX: 50, endX: 200, duration: 3, showForce: true, 
        velocityText: 'v is changing', 
        netForceText: 'ΣF ≠ 0 N' 
    }
};

// --- INTERACTIVE ANIMATION COMPONENT ---
const StateOfMotionAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [currentScenario, setCurrentScenario] = useState<Scenario>(scenarios.idle);
    const [isAnimating, setIsAnimating] = useState(false);

    const probeX = useMotionValue(scenarios.idle.startX);

    // Theme-based colors
    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const forceColor = isDarkMode ? '#f87171' : '#ef4444'; // Red

    const runAnimation = (scenarioId: 'rest' | 'motion' | 'force') => {
        if (isAnimating) return;
        
        const scenario = scenarios[scenarioId];
        setCurrentScenario(scenario);
        probeX.set(scenario.startX);

        if (scenario.duration > 0) {
            setIsAnimating(true);
            animate(probeX, scenario.endX, {
                duration: scenario.duration,
                ease: scenario.id === 'force' ? 'easeOut' : 'linear',
                onComplete: () => setIsAnimating(false)
            });
        }
    };

    const handleReset = () => {
        probeX.stop();
        setIsAnimating(false);
        setCurrentScenario(scenarios.idle);
        probeX.set(scenarios.idle.startX);
    };

    // SVG for a simple space probe
    const SpaceProbe = () => (
        <g>
            <path d="M -25 10 L -25 -10 L 0 -20 L 25 -10 L 25 10 L 0 20 Z" fill={textColor} />
            <rect x="-10" y="-5" width="20" height="10" rx="2" fill={isDarkMode ? '#475569' : '#e2e8f0'} />
        </g>
    );

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Space Probe Simulation</h3>
            <div className="relative w-full h-48 flex-grow flex flex-col justify-center bg-black/10 dark:bg-black/20 rounded-lg">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    {/* Background stars */}
                    <circle cx="80" cy="30" r="1" fill={textColor} opacity="0.5" />
                    <circle cx="320" cy="60" r="1" fill={textColor} opacity="0.5" />
                    <circle cx="150" cy="70" r="1.5" fill={textColor} opacity="0.7" />
                    <circle cx="250" cy="20" r="1" fill={textColor} opacity="0.6" />

                    <motion.g style={{ x: probeX, y: 50 }}>
                        <SpaceProbe />
                    </motion.g>

                    <AnimatePresence>
                        {currentScenario.showForce && (
                            <motion.g 
                                style={{ x: probeX, y: 50 }}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            >
                                <path d="M 45 0 L 25 0" stroke={forceColor} strokeWidth="3" />
                                <path d="M 45 0 L 40 -4 L 40 4 z" fill={forceColor}/>
                                <text y="-5" x={35} textAnchor="middle" fill={forceColor} fontSize="14">F</text>
                            </motion.g>
                        )}
                    </AnimatePresence>
                </svg>
            </div>
            
            <div className="text-center h-16 mt-2 p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                <AnimatePresence mode="wait">
                    <motion.div key={currentScenario.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <p className="font-bold text-blue-500">{currentScenario.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{currentScenario.desc}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
                 <div className="p-3 text-center rounded-lg bg-slate-200 dark:bg-slate-700 font-mono text-lg">{currentScenario.velocityText}</div>
                 <div className="p-3 text-center rounded-lg bg-slate-200 dark:bg-slate-700 font-mono text-lg">{currentScenario.netForceText}</div>
            </div>

            <div className="flex items-center justify-center space-x-2 mt-4">
                <motion.button onClick={() => runAnimation('rest')} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-3 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>At Rest</motion.button>
                <motion.button onClick={() => runAnimation('motion')} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-3 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>Uniform Motion</motion.button>
                <motion.button onClick={() => runAnimation('force')} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-3 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>Apply Force</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-3 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
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
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">The Two States of Equilibrium</h3>
                        <p className="text-lg leading-relaxed">
                            Newton's First Law describes two states where an object's motion is stable and unchanging. In both states, the <strong>net force</strong> on the object is zero.
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">1. State of Rest</h3>
                        <p className="text-lg leading-relaxed">
                            An object at rest has a velocity of zero. It will remain at rest forever unless an unbalanced force acts on it.
                        </p>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">2. Uniform Motion</h3>
                        <p className="text-lg leading-relaxed">
                            An object in uniform motion moves with a <strong>constant velocity</strong> (constant speed and constant direction). It will continue this motion forever unless an unbalanced force acts on it.
                        </p>
                        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                           <p className="font-semibold text-center">A force is NOT needed to keep an object moving. A force is only needed to CHANGE its motion (to accelerate it).</p>
                        </div>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Animation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <StateOfMotionAnimation isDarkMode={isDarkMode} />
                    </div>
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