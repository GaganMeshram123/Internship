import React, { useState, useMemo } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- INTERACTIVE SIMULATION: NET FORCE ---
const NetForceSimulation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [pushForce, setPushForce] = useState(80); // in Newtons
    const [frictionForce, setFrictionForce] = useState(30); // in Newtons
    const [isAnimating, setIsAnimating] = useState(false);
    
    const MASS = 20; // Fixed mass for this simulation (in kg)
    const blockX = useMotionValue(100);

    // Calculate Net Force and Acceleration
    const netForce = useMemo(() => pushForce - frictionForce, [pushForce, frictionForce]);
    const acceleration = useMemo(() => (netForce > 0 ? netForce / MASS : 0), [netForce]);

    // Theme-based colors
    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const pushColor = '#3b82f6'; // Blue
    const frictionColor = '#ef4444'; // Red
    const netForceColor = '#10b981'; // Green

    const runAnimation = () => {
        if (isAnimating || acceleration <= 0) return;
        setIsAnimating(true);
        blockX.set(100);

        const duration = 8 / acceleration; 
        
        animate(blockX, 350, {
            duration: Math.min(duration, 5),
            ease: 'easeIn',
            onComplete: () => setIsAnimating(false)
        });
    };
    
    const handleReset = () => {
        blockX.stop();
        setIsAnimating(false);
        blockX.set(100);
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Net Force Calculator</h3>
            
            <div className="relative w-full h-40 flex-grow flex flex-col justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    <line x1="10" y1="80" x2="390" y2="80" stroke={isDarkMode ? '#64748b' : '#94a3b8'} strokeWidth="1" />

                    <motion.g style={{ x: blockX, y: 50 }}>
                        <rect x="-20" y="0" width="40" height="30" rx="3" fill={textColor} />
                        <text y="20" textAnchor="middle" fill={isDarkMode ? '#1e293b' : '#fff'} fontSize="12" fontWeight="bold">{MASS} kg</text>
                        
                        {/* Push Force Vector */}
                        <path d={`M -25 15 L ${-25 - pushForce} 15`} stroke={pushColor} strokeWidth="3" />
                        <path d={`M ${-25 - pushForce} 15 L ${-30 - pushForce} 11 L ${-30 - pushForce} 19 Z`} fill={pushColor}/>
                        
                        {/* Friction Force Vector */}
                        <path d={`M 25 15 L ${25 + frictionForce} 15`} stroke={frictionColor} strokeWidth="3" />
                        <path d={`M ${25 + frictionForce} 15 L ${20 + frictionForce} 11 L ${20 + frictionForce} 19 Z`} fill={frictionColor}/>
                    </motion.g>
                </svg>
            </div>
             <div className="p-3 mt-4 text-center rounded-lg bg-slate-200 dark:bg-slate-700">
                <p className="font-mono text-xl">
                    <span style={{color: pushColor}}>{pushForce.toFixed(0)} N</span>
                    <span className="mx-2">-</span>
                    <span style={{color: frictionColor}}>{frictionForce.toFixed(0)} N</span>
                    <span className="mx-2">=</span>
                    <span style={{color: netForceColor}} className="font-bold">{netForce.toFixed(0)} N</span>
                </p>
                <p className="text-sm font-semibold" style={{color: netForceColor}}>Net Force</p>
            </div>
            
            <div className="space-y-3 mt-4">
                <div>
                    <label className="text-sm" style={{color: pushColor}}>Push Force: {pushForce} N</label>
                    <input type="range" min="0" max="100" value={pushForce} onChange={e => setPushForce(Number(e.target.value))} className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer" disabled={isAnimating}/>
                </div>
                <div>
                     <label className="text-sm" style={{color: frictionColor}}>Friction Force: {frictionForce} N</label>
                    <input type="range" min="0" max="100" value={frictionForce} onChange={e => setFrictionForce(Number(e.target.value))} className="w-full h-2 bg-red-200 dark:bg-red-900 rounded-lg appearance-none cursor-pointer" disabled={isAnimating}/>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isAnimating || netForce <= 0} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating && netForce > 0 ? 1.05 : 1}} whileTap={{ scale: !isAnimating && netForce > 0 ? 0.95 : 1 }}>Apply Forces</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};


export default function NewtonsSecondLawSlide2() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">What is Net Force?</h3>
                        <p className="text-lg leading-relaxed mb-4">
                           Objects often have multiple forces acting on them at once. The <strong>Net Force</strong> (<InlineMath>{'F_{net}'}</InlineMath> or <InlineMath>{'\\Sigma F'}</InlineMath>) is the vector sum of all these individual forces.
                        </p>
                        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                           <p className="font-semibold text-center text-lg">An object's acceleration depends ONLY on its mass and the <strong>net force</strong> acting on it.</p>
                        </div>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Combining Forces</h3>
                        <p className="text-lg leading-relaxed">
                           In one dimension, calculating net force is straightforward:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg mt-2">
                           <li>Forces in the <strong>same direction</strong> add together.</li>
                           <li>Forces in <strong>opposite directions</strong> subtract from each other.</li>
                        </ul>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Try The Simulation</h3>
                        <p className="text-lg leading-relaxed">
                          Adjust the Push and Friction forces. The simulation will calculate the net force and show you if the object accelerates when the forces are applied.
                        </p>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Simulation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <NetForceSimulation isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n2-netforce"
            slideTitle="How to Calculate Net Force"
            moduleId="force-and-laws"
            submoduleId="newtons-second-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}