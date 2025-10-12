import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- ENHANCED INTERACTIVE SIMULATION 1: DIRECT PROPORTIONALITY ---
const DirectProportionalitySim = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [force, setForce] = useState(50);
    const MASS_CONSTANT = 10; // kg
    const acceleration = force / MASS_CONSTANT;

    const boxColor = isDarkMode ? '#94a3b8' : '#64748b';
    const forceColor = '#ef4444'; // Red
    const accelColor = '#3b82f6'; // Blue

    return (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Direct Proportionality</h3>
            <p className="text-sm mb-4 text-slate-500 dark:text-slate-400">
                With constant mass (<InlineMath>{'m = 10 \\, kg'}</InlineMath>), acceleration is directly proportional to force (<InlineMath>{'a \\propto F'}</InlineMath>).
            </p>
            
            {/* --- New SVG Visualization --- */}
            <div className="w-full h-24 my-4">
                 <svg viewBox="0 0 400 100" className="w-full h-full">
                    {/* Box */}
                    <rect x="175" y="40" width="50" height="30" rx="3" fill={boxColor} />
                    <text x="200" y="60" textAnchor="middle" fill={isDarkMode ? '#1e293b' : '#fff'} fontSize="12">{MASS_CONSTANT} kg</text>
                    
                    {/* Force Arrow */}
                    <motion.g animate={{ x: 0 }}>
                        <motion.path 
                            d={`M 170 55 L ${170 - force} 55`} 
                            stroke={forceColor} 
                            strokeWidth="3" 
                            animate={{ d: `M 170 55 L ${170 - force} 55` }}
                        />
                        <motion.path 
                            d={`M ${170 - force} 55 L ${175 - force} 51 L ${175 - force} 59 Z`} 
                            fill={forceColor}
                            animate={{ d: `M ${170 - force} 55 L ${175 - force} 51 L ${175 - force} 59 Z` }}
                        />
                         <text x={170 - force - 25} y="58" fill={forceColor} fontSize="12" textAnchor="middle">Force</text>
                    </motion.g>

                     {/* Acceleration Arrow */}
                     <motion.g>
                        <motion.path
                            d={`M 230 55 L ${230 + (acceleration * 15)} 55`}
                            stroke={accelColor}
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            animate={{ d: `M 230 55 L ${230 + (acceleration * 15)} 55` }}
                        />
                        <motion.path
                            d={`M ${230 + (acceleration * 15)} 55 L ${225 + (acceleration * 15)} 51 L ${225 + (acceleration * 15)} 59 Z`}
                            fill={accelColor}
                            animate={{ d: `M ${230 + (acceleration * 15)} 55 L ${225 + (acceleration * 15)} 51 L ${225 + (acceleration * 15)} 59 Z` }}
                        />
                        <text x={230 + (acceleration * 15) + 30} y="58" fill={accelColor} fontSize="12" textAnchor="middle">Accel.</text>
                    </motion.g>
                </svg>
            </div>

            <div>
                <label className="text-sm">Force: {force.toFixed(0)} N</label>
                <input type="range" min="1" max="100" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full h-2 bg-red-200 dark:bg-red-900 rounded-lg appearance-none cursor-pointer"/>
            </div>
             <p className="text-center font-mono mt-2 text-lg">a = {acceleration.toFixed(2)} m/s²</p>
        </div>
    );
};

// --- ENHANCED INTERACTIVE SIMULATION 2: INVERSE PROPORTIONALITY ---
const InverseProportionalitySim = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [mass, setMass] = useState(10);
    const FORCE_CONSTANT = 50; // Newtons
    const acceleration = FORCE_CONSTANT / mass;

    const boxColor = isDarkMode ? '#94a3b8' : '#64748b';
    const forceColor = '#ef4444'; // Red
    const accelColor = '#3b82f6'; // Blue

    return (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Inverse Proportionality</h3>
            <p className="text-sm mb-4 text-slate-500 dark:text-slate-400">
                With constant force (<InlineMath>{'F = 50 \\, N'}</InlineMath>), acceleration is inversely proportional to mass (<InlineMath>{'a \\propto 1/m'}</InlineMath>).
            </p>
            
            {/* --- New SVG Visualization --- */}
            <div className="w-full h-24 my-4">
                 <svg viewBox="0 0 400 100" className="w-full h-full">
                    {/* Box that scales with mass */}
                    <motion.rect 
                        rx="3" 
                        fill={boxColor}
                        animate={{ 
                            width: 30 + mass * 2, 
                            height: 20 + mass,
                            x: 200 - (15 + mass),
                            y: 70 - (20 + mass)
                        }}
                    />
                    <motion.text textAnchor="middle" fill={isDarkMode ? '#1e293b' : '#fff'} fontSize="12"
                        animate={{
                            x: 200,
                            y: 70 - (10 + mass/2)
                        }}
                    >{mass.toFixed(0)} kg</motion.text>
                    
                    {/* Constant Force Arrow */}
                    <g>
                        <path d="M 150 55 L 100 55" stroke={forceColor} strokeWidth="3" />
                        <path d="M 100 55 L 105 51 L 105 59 Z" fill={forceColor}/>
                        <text x="75" y="58" fill={forceColor} fontSize="12" textAnchor="middle">Force</text>
                    </g>

                     {/* Acceleration Arrow */}
                     <motion.g>
                        <motion.path
                            stroke={accelColor} strokeWidth="2" strokeDasharray="4 4"
                            animate={{ d: `M 250 55 L ${250 + (acceleration * 10)} 55` }}
                        />
                        <motion.path
                            fill={accelColor}
                            animate={{ d: `M ${250 + (acceleration * 10)} 55 L ${245 + (acceleration * 10)} 51 L ${245 + (acceleration * 10)} 59 Z` }}
                        />
                        <text x={250 + (acceleration * 10) + 30} y="58" fill={accelColor} fontSize="12" textAnchor="middle">Accel.</text>
                    </motion.g>
                </svg>
            </div>

            <div>
                <label className="text-sm">Mass: {mass.toFixed(0)} kg</label>
                <input type="range" min="1" max="20" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full h-2 bg-slate-400 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"/>
            </div>
            <p className="text-center font-mono mt-2 text-lg">a = {acceleration.toFixed(2)} m/s²</p>
        </div>
    );
};

export default function NewtonsSecondLawSlide3() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [showAnswer, setShowAnswer] = useState(false);

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-start"> {/* Aligned to top */}
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">Unpacking F=ma</h3>
                        <p className="text-lg leading-relaxed">
                            The equation <InlineMath>{'a = F_{net}/m'}</InlineMath> reveals two fundamental relationships in nature. Understanding them is key to mastering the Second Law.
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">1. Direct Proportionality</h3>
                        <p className="text-lg leading-relaxed">
                            Acceleration is <strong>directly proportional</strong> to net force.
                        </p>
                        <div className="mt-2 p-3 text-center bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <p className="font-semibold">This means if you double the net force on an object, you double its acceleration.</p>
                        </div>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">2. Inverse Proportionality</h3>
                        <p className="text-lg leading-relaxed">
                            Acceleration is <strong>inversely proportional</strong> to mass.
                        </p>
                         <div className="mt-2 p-3 text-center bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <p className="font-semibold">This means if you double the mass of an object, you only get half the acceleration for the same net force.</p>
                        </div>
                    </div>

                    {/* --- NEW: Real-World Connection Panel --- */}
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Real-World Connection</h3>
                        <p className="text-lg leading-relaxed">
                            Think about pushing a shopping cart. Pushing harder (more force) makes it accelerate faster. Pushing a full, heavy cart (more mass) with the same force makes it accelerate slower than an empty one.
                        </p>
                    </div>

                    {/* --- NEW: Challenge Question Panel --- */}
                     <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Think About It!</h3>
                        <p className="text-lg leading-relaxed mb-4">
                           An astronaut pushes two satellites, A and B, with the same force. Satellite A has twice the mass of Satellite B. Which one accelerates faster?
                        </p>
                        <AnimatePresence mode="wait">
                        {showAnswer ? (
                            <motion.div
                                key="answer"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-3 text-center bg-green-100 dark:bg-green-900/50 rounded-lg text-green-800 dark:text-green-300 font-semibold"
                            >
                                Satellite B will accelerate twice as fast because it has half the mass!
                            </motion.div>
                        ) : (
                            <motion.button
                                key="button"
                                onClick={() => setShowAnswer(true)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Reveal Answer
                            </motion.button>
                        )}
                        </AnimatePresence>
                    </div>

                </div>
                
                {/* --- Right Column: Interactive Simulations --- */}
                <div className="flex flex-col justify-start space-y-6"> {/* Aligned to top */}
                    <DirectProportionalitySim isDarkMode={isDarkMode} />
                    <InverseProportionalitySim isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n2-proportionality"
            slideTitle="Proportionality in the Second Law"
            moduleId="force-and-laws"
            submoduleId="newtons-second-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}