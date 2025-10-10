import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS & DATA for this animation ---
type WallType = 'hard' | 'soft';
type Scenario = {
    wallCompress: number;
    impactDuration: number;
    forcePeak: number;
    graphWidth: number;
};
const scenarios: Record<WallType, Scenario> = {
    hard: { wallCompress: 0, impactDuration: 0.15, forcePeak: 90, graphWidth: 20 },
    soft: { wallCompress: 20, impactDuration: 0.8, forcePeak: 35, graphWidth: 80 },
};

// --- INTERACTIVE IMPULSE SIMULATION ---
const ImpulseSimulation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [wallType, setWallType] = useState<WallType>('hard');
    const [isAnimating, setIsAnimating] = useState(false);
    
    const ballX = useMotionValue(50);
    const wallX = useMotionValue(350);
    const forceGraphPath = useMotionValue("M 10 95 C 10 95, 10 95, 10 95");

    const INITIAL_MOMENTUM = 40; // p = 2kg * 20m/s
    const FINAL_MOMENTUM = -30; // p = 2kg * -15m/s
    const DELTA_P = FINAL_MOMENTUM - INITIAL_MOMENTUM; // -70

    const runAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const scenario = scenarios[wallType];

        // Animate ball to wall
        animate(ballX, 350 - 15, { duration: 1.5, ease: 'linear', onComplete: () => {
            // Animate impact
            animate(wallX, 350 - scenario.wallCompress, { duration: scenario.impactDuration / 2, ease: 'easeOut', onComplete: () => {
                 animate(wallX, 350, { duration: scenario.impactDuration / 2, ease: 'easeIn' });
            }});
            // Animate force graph
            const graphPeakX = 10 + scenario.graphWidth / 2;
            const graphPeakY = 95 - scenario.forcePeak;
            const graphEndX = 10 + scenario.graphWidth;
            animate(forceGraphPath, `M 10 95 C ${graphPeakX} 95, ${graphPeakX} ${graphPeakY}, ${graphPeakX} ${graphPeakY} S ${graphPeakX} 95, ${graphEndX} 95`, {
                duration: scenario.impactDuration
            });
            // Animate ball bounce
            animate(ballX, 50, { duration: 1.5, delay: scenario.impactDuration, ease: 'easeOut', onComplete: () => {
                handleReset();
            }});
        }});
    };
    
    const handleReset = () => {
        ballX.stop(); wallX.stop(); forceGraphPath.stop();
        setIsAnimating(false);
        ballX.set(50); wallX.set(350);
        forceGraphPath.set("M 10 95 C 10 95, 10 95, 10 95");
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">The Force-Time Tradeoff</h3>
            <div className="flex justify-center space-x-2 mb-4">
                <button onClick={() => setWallType('hard')} disabled={isAnimating} className={`px-3 py-1 text-sm rounded-full ${wallType === 'hard' ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-600'}`}>Hard Wall</button>
                <button onClick={() => setWallType('soft')} disabled={isAnimating} className={`px-3 py-1 text-sm rounded-full ${wallType === 'soft' ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-600'}`}>Soft Wall</button>
            </div>
            <div className="relative w-full h-28 flex-grow flex flex-col justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg">
                <svg viewBox="0 0 400 70" className="w-full h-full">
                    <motion.rect x={wallX} y="0" width="30" height="70" fill={isDarkMode ? '#64748b' : '#94a3b8'} />
                    <motion.circle cx={ballX} cy="35" r="15" fill="#3b82f6" />
                </svg>
            </div>
            <div className="mt-4">
                <p className="text-sm font-semibold">Force vs. Time during impact</p>
                <div className="w-full h-28 bg-slate-200/50 dark:bg-black/20 rounded-lg">
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                        <motion.path d={forceGraphPath.get()} stroke="#ef4444" strokeWidth="3" fill="rgba(239, 68, 68, 0.3)" />
                        <text x="5" y="15" fontSize="10" fill={isDarkMode ? '#94a3b8' : '#64748b'}>Force</text>
                        <text x="180" y="95" fontSize="10" fill={isDarkMode ? '#94a3b8' : '#64748b'}>Time</text>
                    </svg>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>Launch Ball</motion.button>
            </div>
        </div>
    );
};

export default function MomentumForceSlide3() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">Impulse (J)</h3>
                        <p className="text-lg leading-relaxed">
                           Impulse is defined as the <strong>change in momentum</strong> of an object. To change an object's momentum, a force must be applied over a period of time.
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Impulse-Momentum Theorem</h3>
                        <div className="text-center text-xl font-bold p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <InlineMath>{'J = \\Delta p = F_{\\text{avg}} \\cdot \\Delta t'}</InlineMath>
                        </div>
                         <p className="text-lg mt-3">This theorem shows that the change in momentum (<InlineMath>{"\\Delta p"}</InlineMath>) is equal to the average force (<InlineMath>{"F_{\\text{avg}}"}</InlineMath>) multiplied by the time interval (<InlineMath>{"\\Delta t"}</InlineMath>) over which the force is applied.</p>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                       <div className="p-4 bg-amber-500/10 dark:bg-amber-500/20 rounded-lg">
                           <p className="font-semibold text-center text-amber-600 dark:text-amber-400">Key Idea: For the same change in momentum, if you increase the impact time (<InlineMath>{"\\Delta t"}</InlineMath> ↑), you decrease the average force (<InlineMath>{"F_{\\text{avg}}"}</InlineMath> ↓). This is how airbags and cushions work!</p>
                        </div>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Simulation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <ImpulseSimulation isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="mf-impulse"
            slideTitle="Impulse: The Change in Momentum"
            moduleId="force-and-laws"
            submoduleId="momentum-and-force"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}