import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS for this animation ---
type CollisionType = 'elastic' | 'inelastic';

// --- INTERACTIVE SIMULATION: ELASTIC vs INELASTIC ---
const CollisionTypeSimulation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [m1, setM1] = useState(10);
    const [m2, setM2] = useState(10);
    const [collisionType, setCollisionType] = useState<CollisionType>('elastic');
    const [isAnimating, setIsAnimating] = useState(false);
    
    const ball1X = useMotionValue(100);
    const ball2X = useMotionValue(250);
    const kineticEnergyPercentage = useMotionValue(100);

    const u1 = 40; // Initial velocity of ball 1
    const u2 = 0;   // Ball 2 is stationary

    // --- Physics Calculations ---
    const { v1, v2, pInitial, keInitial, keFinal } = useMemo(() => {
        const pInitial = m1 * u1;
        const keInitial = 0.5 * m1 * u1 * u1;
        let v1 = 0, v2 = 0, keFinal = 0;

        if (collisionType === 'elastic') {
            v1 = ((m1 - m2) / (m1 + m2)) * u1;
            v2 = (2 * m1 / (m1 + m2)) * u1;
            keFinal = keInitial; // Conserved
        } else { // Perfectly Inelastic
            const vFinal = pInitial / (m1 + m2);
            v1 = vFinal;
            v2 = vFinal;
            keFinal = 0.5 * (m1 + m2) * vFinal * vFinal;
        }
        return { v1, v2, pInitial, keInitial, keFinal };
    }, [m1, m2, collisionType]);

    const runAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        kineticEnergyPercentage.set(100);

        const collisionPoint1 = 200 - (m1/2);
        const collisionPoint2 = 200 + (m2/2);

        animate(ball1X, collisionPoint1, { duration: 1.5, ease: 'linear', onComplete: () => {
            if (collisionType === 'inelastic') {
                animate(kineticEnergyPercentage, (keFinal / keInitial) * 100, { duration: 0.5 });
            }
            animate(ball1X, collisionPoint1 + v1 * 2, { duration: 2, ease: 'linear' });
            animate(ball2X, collisionPoint2 + v2 * 2, { duration: 2, ease: 'linear', onComplete: () => setIsAnimating(false) });
        }});
        animate(ball2X, collisionPoint2, { duration: 1.5, ease: 'linear' });
    };

    const handleReset = () => {
        ball1X.stop(); ball2X.stop(); kineticEnergyPercentage.stop();
        setIsAnimating(false);
        ball1X.set(100); ball2X.set(250);
        kineticEnergyPercentage.set(100);
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Collision Lab</h3>
            <div className="flex justify-center space-x-2 mb-4">
                <button onClick={() => setCollisionType('elastic')} disabled={isAnimating} className={`px-3 py-1 text-sm rounded-full ${collisionType==='elastic' ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-600'}`}>Elastic Bounce</button>
                <button onClick={() => setCollisionType('inelastic')} disabled={isAnimating} className={`px-3 py-1 text-sm rounded-full ${collisionType==='inelastic' ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-600'}`}>Inelastic Stick</button>
            </div>
            <div className="relative w-full h-40 flex-grow flex flex-col justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg">
                 <svg viewBox="0 0 400 100" className="w-full h-full">
                    <line x1="10" y1="50" x2="390" y2="50" stroke={isDarkMode ? '#64748b' : '#94a3b8'} strokeWidth="1" />
                    <motion.g style={{ x: ball1X, y: 50 }}><circle cx="0" cy="0" r={m1*0.8 + 4} fill="#3b82f6" /></motion.g>
                    <motion.g style={{ x: ball2X, y: 50 }}><circle cx="0" cy="0" r={m2*0.8 + 4} fill="#ef4444" /></motion.g>
                 </svg>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                    <p className="font-semibold">Total Momentum</p><p className="font-mono text-lg text-blue-500">{pInitial.toFixed(0)} <span className="text-xs">kg·m/s</span></p>
                </div>
                <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                     <p className="font-semibold">Total Kinetic Energy</p>
                     <div className="w-full bg-slate-300 dark:bg-slate-600 rounded-full h-4 mt-1">
                         <motion.div className="bg-green-500 h-4 rounded-full" style={{ width: `${kineticEnergyPercentage.get()}%` }} />
                     </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="text-sm">Mass 1: {m1} kg</label>
                    <input type="range" min="5" max="20" step="5" value={m1} onChange={e => setM1(Number(e.target.value))} className="w-full" disabled={isAnimating}/>
                </div>
                <div>
                    <label className="text-sm">Mass 2: {m2} kg</label>
                    <input type="range" min="5" max="20" step="5" value={m2} onChange={e => setM2(Number(e.target.value))} className="w-full" disabled={isAnimating}/>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>Collide!</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};

export default function ConservationMomentumSlide3() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">Types of Collisions</h3>
                        <p className="text-lg leading-relaxed">
                          In an isolated system, <strong>total momentum is always conserved</strong>. However, kinetic energy (<InlineMath>{'KE = \\frac{1}{2}mv^2'}</InlineMath>) may or may not be. This is the key difference between collision types.
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-green-500">Elastic Collisions</h3>
                        <p className="text-lg leading-relaxed">
                           Objects bounce off each other perfectly without losing any energy to heat or sound.
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-lg mt-2">
                           <li>Momentum is conserved.</li>
                           <li><strong>Kinetic Energy is conserved.</strong></li>
                        </ul>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-red-500">Inelastic Collisions</h3>
                        <p className="text-lg leading-relaxed">
                           Objects may deform or stick together, and some kinetic energy is converted into other forms (heat, sound).
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-lg mt-2">
                           <li>Momentum is conserved.</li>
                           <li><strong>Kinetic Energy is NOT conserved.</strong></li>
                        </ul>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Simulation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <CollisionTypeSimulation isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="cm-collisions"
            slideTitle="Types of Collisions"
            moduleId="force-and-laws"
            submoduleId="conservation-of-momentum"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}