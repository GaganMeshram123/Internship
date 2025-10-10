import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/Themed';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS & DATA for the collision scenarios ---
type Scenario = {
    title: string;
    m1: number; u1: number; v1: number;
    m2: number; u2: number; v2: number;
};

const scenarios: Scenario[] = [
    { title: 'Stationary Target', m1: 5, u1: 50, v1: 10, m2: 10, u2: 0, v2: 20 },
    { title: 'Head-on Collision', m1: 8, u1: 30, v1: -10, m2: 8, u2: -30, v2: 10 },
    { title: 'Rear-end Collision', m1: 10, u1: 40, v1: 20, m2: 5, u2: 10, v2: 50 },
];

// --- INTERACTIVE COLLISION SIMULATION ---
const CollisionSimulation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const ball1X = useMotionValue(100);
    const ball2X = useMotionValue(300);

    const currentScenario = scenarios[scenarioIndex];
    const totalMomentum = useMemo(() => currentScenario.m1 * currentScenario.u1 + currentScenario.m2 * currentScenario.u2, [currentScenario]);

    // Theme-based colors
    const ball1Color = '#3b82f6'; // Blue
    const ball2Color = '#ef4444'; // Red

    const runAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        const { u1, v1, u2, v2 } = currentScenario;
        const collisionPoint1 = 200 - (currentScenario.m1 / 2); // Adjust for radius
        const collisionPoint2 = 200 + (currentScenario.m2 / 2);

        // Animate to collision point
        const toCollisionDuration = Math.abs(collisionPoint1 - ball1X.get()) / Math.abs(u1 * 0.5);
        animate(ball1X, collisionPoint1, { duration: toCollisionDuration, ease: 'linear' });
        animate(ball2X, collisionPoint2, { duration: toCollisionDuration, ease: 'linear',
            onComplete: () => {
                 // Animate after collision
                const fromCollisionDuration = 2;
                animate(ball1X, collisionPoint1 + v1 * 3, { duration: fromCollisionDuration, ease: 'linear' });
                animate(ball2X, collisionPoint2 + v2 * 3, { duration: fromCollisionDuration, ease: 'linear',
                    onComplete: () => setIsAnimating(false)
                });
            }
        });
    };
    
    const handleReset = () => {
        ball1X.stop();
        ball2X.stop();
        setIsAnimating(false);
        ball1X.set(100);
        ball2X.set(300);
    };

    const handleScenarioChange = (index: number) => {
        setScenarioIndex(index);
        handleReset();
    }

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Collision Simulator</h3>
            
             <div className="p-3 mb-2 text-center rounded-lg bg-slate-200 dark:bg-slate-700">
                <p className="font-semibold text-lg">Total System Momentum: <span className="font-mono text-blue-500">{totalMomentum.toFixed(0)} kg·m/s</span></p>
             </div>

            <div className="relative w-full h-40 flex-grow flex flex-col justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    <line x1="10" y1="50" x2="390" y2="50" stroke={isDarkMode ? '#64748b' : '#94a3b8'} strokeWidth="1" strokeDasharray="4" />
                    
                    <motion.g style={{ x: ball1X, y: 50 }}>
                        <circle cx="0" cy="0" r={currentScenario.m1 * 1.5} fill={ball1Color} />
                        <text y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{currentScenario.m1}kg</text>
                    </motion.g>
                     <motion.g style={{ x: ball2X, y: 50 }}>
                        <circle cx="0" cy="0" r={currentScenario.m2 * 1.5} fill={ball2Color} />
                         <text y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{currentScenario.m2}kg</text>
                    </motion.g>
                </svg>
            </div>

            <div className="flex justify-center space-x-2 mt-4">
                {scenarios.map((s, i) => (
                    <button key={i} onClick={() => handleScenarioChange(i)} disabled={isAnimating}
                     className={`px-3 py-1 text-xs rounded-full transition-colors ${scenarioIndex === i ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-600'}`}>
                        {s.title}
                    </button>
                ))}
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>Collide!</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};


export default function ConservationMomentumSlide1() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">The Law of Conservation of Momentum</h3>
                        <p className="text-lg italic leading-relaxed">
                           In any isolated system, the total momentum before an interaction is equal to the total momentum after the interaction.
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Isolated System</h3>
                        <p className="text-lg leading-relaxed">
                           An "isolated" or "closed" system is one where no external forces (like friction or air resistance) are acting on the objects. Momentum is only transferred between the objects, never lost to the outside.
                        </p>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Equation</h3>
                        <p className="text-center font-mono text-lg p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                           <InlineMath>{'p_{initial} = p_{final}'}</InlineMath>
                        </p>
                         <p className="text-center font-mono text-lg mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                           <InlineMath>{'m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2'}</InlineMath>
                        </p>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Simulation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <CollisionSimulation isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="cm-principle"
            slideTitle="The Principle of Conservation of Momentum"
            moduleId="force-and-laws"
            submoduleId="conservation-of-momentum"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}