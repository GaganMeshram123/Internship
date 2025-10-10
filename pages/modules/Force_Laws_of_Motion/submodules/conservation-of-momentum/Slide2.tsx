import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS for this animation ---
type Scenario = 'idle' | 'ideal' | 'rough';

// --- INTERACTIVE SIMULATION: COMPARING SYSTEMS ---
const SystemComparisonSimulation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [scenario, setScenario] = useState<Scenario>('idle');
    const [isAnimating, setIsAnimating] = useState(false);
    
    const MASS = 10; // kg
    const INITIAL_VELOCITY = 40; // m/s
    const INITIAL_MOMENTUM = MASS * INITIAL_VELOCITY;

    const blockX = useMotionValue(50);
    const momentumValue = useMotionValue(INITIAL_MOMENTUM);

    // Theme-based colors
    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const frictionColor = '#ef4444'; // Red

    const runAnimation = (selectedScenario: 'ideal' | 'rough') => {
        if (isAnimating) return;
        setIsAnimating(true);
        setScenario(selectedScenario);
        blockX.set(50);
        momentumValue.set(INITIAL_MOMENTUM);

        if (selectedScenario === 'ideal') {
            animate(blockX, 350, {
                duration: 2.5,
                ease: 'linear',
                onComplete: () => setIsAnimating(false)
            });
        } else { // rough scenario
            animate(blockX, 250, {
                duration: 2.5,
                ease: 'easeOut',
                onComplete: () => setIsAnimating(false)
            });
            animate(momentumValue, 0, {
                duration: 2.5,
                ease: 'easeOut'
            });
        }
    };
    
    const handleReset = () => {
        blockX.stop();
        momentumValue.stop();
        setIsAnimating(false);
        setScenario('idle');
        blockX.set(50);
        momentumValue.set(INITIAL_MOMENTUM);
    };

    const descriptions: Record<Scenario, string> = {
        idle: 'Select a scenario to begin.',
        ideal: 'On an ideal frictionless surface, no external forces act on the block.',
        rough: 'On a rough surface, friction is an external force that removes momentum.'
    };
    
    const conservationText: Record<Scenario, string> = {
        idle: '',
        ideal: 'Momentum is CONSERVED',
        rough: 'Momentum is NOT CONSERVED'
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Isolated vs. Non-Isolated</h3>
            
            <div className="relative w-full h-40 flex-grow flex flex-col justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    {/* Surface Line */}
                    <path d={scenario === 'rough' ? "M 0 80 H 400" : "M 0 80 H 400"}
                        stroke={isDarkMode ? '#64748b' : '#94a3b8'}
                        strokeWidth={scenario === 'rough' ? 2 : 1}
                        strokeDasharray={scenario === 'rough' ? "4 2" : "none"} />

                    {/* Block */}
                    <motion.g style={{ x: blockX, y: 50 }}>
                        <rect x="-20" y="0" width="40" height="30" rx="3" fill={textColor} />
                        <text y="20" textAnchor="middle" fill={isDarkMode ? '#1e293b' : '#fff'} fontSize="12" fontWeight="bold">{MASS} kg</text>
                    </motion.g>

                    {/* Friction Vector */}
                    <AnimatePresence>
                        {scenario === 'rough' && isAnimating && (
                             <motion.g style={{ x: blockX, y: 50 }} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                                <path d="M 25 15 L 55 15" stroke={frictionColor} strokeWidth="3" />
                                <path d="M 25 15 L 35 11 L 35 19 Z" fill={frictionColor}/>
                                <text x="40" y="10" textAnchor="middle" fontSize="10" fill={frictionColor}>Friction</text>
                            </motion.g>
                        )}
                    </AnimatePresence>
                </svg>
            </div>

            <motion.div className="p-2 mt-4 text-center rounded-lg bg-slate-200 dark:bg-slate-700">
                <p className="font-semibold text-lg">
                    Momentum (p): <span className="font-mono text-blue-500"><motion.span>{momentumValue.get().toFixed(0)}</motion.span> kg·m/s</span>
                </p>
            </motion.div>
            
            <div className={`text-center h-12 mt-4 p-2 rounded-lg ${scenario==='ideal' ? 'bg-green-500/20 text-green-500' : ''} ${scenario==='rough' ? 'bg-red-500/20 text-red-500' : ''}`}>
                 <p className="font-semibold">{conservationText[scenario]}</p>
                 <p className="text-sm">{descriptions[scenario]}</p>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={() => runAnimation('ideal')} disabled={isAnimating} className="bg-green-600 hover:bg-green-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>Ideal Surface</motion.button>
                <motion.button onClick={() => runAnimation('rough')} disabled={isAnimating} className="bg-red-600 hover:bg-red-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>Rough Surface</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};

export default function ConservationMomentumSlide2() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">The "Isolated System" Rule</h3>
                        <p className="text-lg leading-relaxed">
                           The Law of Conservation of Momentum only holds true for <strong>isolated systems</strong> (also called closed systems).
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-green-500">Isolated System</h3>
                        <p className="text-lg leading-relaxed">
                           A system is isolated when the <strong>net external force is zero</strong>. Forces can exist between objects *inside* the system, but no force comes from the outside.
                           <br/><strong className="mt-2 block">In these systems, total momentum is CONSERVED.</strong>
                        </p>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-red-500">Non-Isolated System</h3>
                        <p className="text-lg leading-relaxed">
                           In the real world, external forces like friction or air resistance are almost always present. These forces can add or remove momentum from the system.
                            <br/><strong className="mt-2 block">In these systems, total momentum is NOT CONSERVED.</strong>
                        </p>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Simulation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <SystemComparisonSimulation isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="cm-isolated"
            slideTitle="What is an Isolated System?"
            moduleId="force-and-laws"
            submoduleId="conservation-of-momentum"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}