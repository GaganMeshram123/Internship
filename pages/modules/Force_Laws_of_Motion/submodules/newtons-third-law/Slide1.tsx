import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/Themed';
import 'katex/dist/katex.min.css';

// --- INTERACTIVE ROCKET SIMULATION ---
const RocketSimulation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [isIgnited, setIsIgnited] = useState(false);

    const rocketX = useMotionValue(150);
    const gasX = useMotionValue(130);
    const gasOpacity = useMotionValue(0);

    // Theme-based colors
    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const forceColor = isDarkMode ? '#fde047' : '#f59e0b'; // Yellow/Amber

    const runAnimation = () => {
        if (isIgnited) return;
        setIsIgnited(true);

        // Animate gas particles
        gasOpacity.set(1);
        animate(gasX, -100, { duration: 2, ease: 'linear' });
        animate(gasOpacity, 0, { duration: 2, ease: 'easeIn' });

        // Animate rocket
        animate(rocketX, 300, { duration: 2.5, ease: 'easeIn' });
    };

    const handleReset = () => {
        rocketX.stop();
        gasX.stop();
        gasOpacity.stop();
        setIsIgnited(false);
        rocketX.set(150);
        gasX.set(130);
        gasOpacity.set(0);
    };

    const RocketBody = () => (
        <g>
            <path d="M 0 -30 L 15 10 L -15 10 Z" fill={textColor} />
            <rect x="-15" y="10" width="30" height="20" fill={textColor} />
            <path d="M -15 30 L -25 40 L -5 30 Z" fill={isDarkMode ? '#64748b' : '#94a3b8'} />
            <path d="M 15 30 L 25 40 L 5 30 Z" fill={isDarkMode ? '#64748b' : '#94a3b8'} />
        </g>
    );

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Rocket Propulsion</h3>
            <div className="relative w-full h-56 flex-grow flex flex-col justify-center bg-black/10 dark:bg-black/20 rounded-lg">
                <svg viewBox="0 0 400 150" className="w-full h-full">
                    {/* Stars */}
                    <circle cx="80" cy="30" r="1" fill={textColor} opacity="0.7" />
                    <circle cx="320" cy="110" r="1.5" fill={textColor} opacity="0.8" />
                    <circle cx="150" cy="90" r="1" fill={textColor} opacity="0.6" />
                    <circle cx="250" cy="40" r="1.2" fill={textColor} opacity="0.9" />

                    <motion.g style={{ x: rocketX, y: 75 }}>
                        <RocketBody />
                    </motion.g>
                    
                    {/* Gas Particles */}
                    <motion.g style={{ x: gasX, y: 75, opacity: gasOpacity }}>
                        <circle cx="0" cy="35" r="5" fill="#f97316" />
                        <circle cx="-10" cy="45" r="3" fill="#fb923c" />
                        <circle cx="10" cy="40" r="4" fill="#fbbf24" />
                    </motion.g>

                    <AnimatePresence>
                        {isIgnited && (
                             <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {/* Force on Gas (Action) */}
                                <g>
                                    <path d="M 140 115 L 80 115" stroke={forceColor} strokeWidth="2.5" />
                                    <path d="M 80 115 L 90 110 L 90 120 Z" fill={forceColor}/>
                                    <text x="110" y="135" textAnchor="middle" fill={forceColor} fontSize="12">Force of Rocket on Gas</text>
                                    <text x="110" y="105" textAnchor="middle" fill={forceColor} fontSize="14" fontWeight="bold">Action</text>
                                </g>
                                {/* Force on Rocket (Reaction) */}
                                <g>
                                    <path d="M 160 45 L 220 45" stroke={forceColor} strokeWidth="2.5" />
                                    <path d="M 220 45 L 210 40 L 210 50 Z" fill={forceColor}/>
                                    <text x="190" y="25" textAnchor="middle" fill={forceColor} fontSize="12">Force of Gas on Rocket</text>
                                    <text x="190" y="10" textAnchor="middle" fill={forceColor} fontSize="14" fontWeight="bold">Reaction</text>
                                </g>
                            </motion.g>
                        )}
                    </AnimatePresence>
                </svg>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isIgnited} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isIgnited ? 1.05 : 1}} whileTap={{ scale: !isIgnited ? 0.95 : 1 }}>Ignite</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};

export default function NewtonsThirdLawSlide1() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">Newton's Third Law</h3>
                        <p className="text-2xl italic leading-relaxed text-center">
                           "For every action, there is an equal and opposite reaction."
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Action-Reaction Pairs</h3>
                        <p className="text-lg leading-relaxed">
                           This means that forces always come in pairs. You can't have a single, isolated force. These force pairs are:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg mt-2">
                           <li><strong>Equal</strong> in magnitude (strength).</li>
                           <li><strong>Opposite</strong> in direction.</li>
                           <li>Acting on <strong>different objects</strong>.</li>
                        </ul>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                       <div className="mt-1 p-4 bg-amber-500/10 dark:bg-amber-500/20 rounded-lg">
                           <p className="font-semibold text-center text-amber-600 dark:text-amber-400">Crucial Point: Because the forces act on different objects, they do NOT cancel each other out!</p>
                        </div>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Simulation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <RocketSimulation isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n3-action-reaction"
            slideTitle="Action-Reaction Pairs"
            moduleId="force-and-laws"
            submoduleId="newtons-third-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}