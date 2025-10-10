import React, { useState, useMemo } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- INTERACTIVE SIMULATION: F=ma ---
const FmaSimulation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [force, setForce] = useState(50); // in Newtons
    const [mass, setMass] = useState(10); // in kg
    const [isAnimating, setIsAnimating] = useState(false);

    const blockX = useMotionValue(50);

    // Calculate acceleration based on F=ma (a = F/m)
    const acceleration = useMemo(() => force / mass, [force, mass]);

    // Theme-based colors
    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const forceColor = '#ef4444'; // Red
    const accelColor = '#3b82f6'; // Blue

    const runAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        blockX.set(50);

        // Higher acceleration = shorter duration to cross the screen
        const duration = 5 / acceleration; 
        
        animate(blockX, 350, {
            duration: Math.min(duration, 5), // Cap duration at 5s
            ease: 'easeIn',
            onComplete: () => setIsAnimating(false)
        });
    };
    
    const handleReset = () => {
        blockX.stop();
        setIsAnimating(false);
        blockX.set(50);
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">The F=ma Simulator</h3>
            
            <div className="relative w-full h-40 flex-grow flex flex-col justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    {/* Ground line */}
                    <line x1="10" y1="80" x2="390" y2="80" stroke={isDarkMode ? '#64748b' : '#94a3b8'} strokeWidth="1" />

                    {/* The Block */}
                    <motion.g style={{ x: blockX, y: 80 - mass * 2 - 10 }}>
                        <rect x="-15" y="-10" width="30" height={mass * 2 + 10} rx="3" fill={textColor} />
                        <text y={-15 - mass} textAnchor="middle" fill={textColor} fontSize="12">{mass} kg</text>
                    </motion.g>

                    {/* Force Vector */}
                     <motion.g style={{ x: blockX, y: 65 }}>
                         <path d={`M -20 0 L ${-20 - force} 0`} stroke={forceColor} strokeWidth="3" />
                         <path d={`M ${-20 - force} 0 L ${-25 - force} -4 L ${-25 - force} 4 Z`} fill={forceColor}/>
                    </motion.g>
                </svg>
            </div>
             <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2 rounded-lg bg-red-500/10"><p className="font-bold text-red-500">Force</p><p className="font-mono text-xl">{force.toFixed(0)} N</p></div>
                <div className="p-2 rounded-lg bg-slate-500/10"><p className="font-bold text-slate-500">Mass</p><p className="font-mono text-xl">{mass.toFixed(0)} kg</p></div>
                <div className="p-2 rounded-lg bg-blue-500/10"><p className="font-bold text-blue-500">Acceleration</p><p className="font-mono text-xl">{acceleration.toFixed(2)} m/s²</p></div>
            </div>
            
            <div className="space-y-3 mt-4">
                <div>
                    <label className="text-sm">Force: {force} N</label>
                    <input type="range" min="10" max="100" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" disabled={isAnimating}/>
                </div>
                <div>
                     <label className="text-sm">Mass: {mass} kg</label>
                    <input type="range" min="1" max="20" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer" disabled={isAnimating}/>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>Apply Force</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};


export default function NewtonsSecondLawSlide1() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">Newton's Second Law</h3>
                        <p className="text-lg leading-relaxed mb-4">
                           This law provides the connection between force, mass, and acceleration. It is one of the most important equations in all of physics.
                        </p>
                        <div className="text-center text-3xl font-bold p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <InlineMath>{'F_{net} = m \\cdot a'}</InlineMath>
                        </div>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Components</h3>
                        <ul className="list-disc list-inside space-y-2 text-lg">
                           <li><strong>Force (F):</strong> A push or pull, measured in Newtons (N).</li>
                           <li><strong>Mass (m):</strong> The amount of matter in an object, measured in kilograms (kg).</li>
                           <li><strong>Acceleration (a):</strong> The rate of change in velocity, measured in meters per second squared (m/s²).</li>
                        </ul>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Key Relationships</h3>
                        <p className="text-lg leading-relaxed">
                          From <InlineMath>{'a = F/m'}</InlineMath>, we can see that acceleration is <strong>directly proportional</strong> to force and <strong>inversely proportional</strong> to mass. Use the simulator to test this!
                        </p>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Simulation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <FmaSimulation isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n2-fma"
            slideTitle="The Relationship: Force, Mass, Acceleration"
            moduleId="force-and-laws"
            submoduleId="newtons-second-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}