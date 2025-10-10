import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- INTERACTIVE SIMULATION: FORCE AS RATE OF CHANGE OF MOMENTUM ---
const RateOfChangeVisualizer = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [force, setForce] = useState(50); // N
    const [time, setTime] = useState(1.5); // seconds
    const [isAnimating, setIsAnimating] = useState(false);
    const [finalMomentum, setFinalMomentum] = useState(0);

    const MASS = 10; // kg
    const puckX = useMotionValue(80);
    const pusherX = useMotionValue(50);

    const impulse = useMemo(() => force * time, [force, time]);

    const runAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setFinalMomentum(0);

        const acceleration = force / MASS;
        const finalVelocity = acceleration * time;
        const pushDistance = 0.5 * acceleration * time * time;

        // Animate the push
        animate(pusherX, 50 + pushDistance, { duration: time, ease: 'linear' });
        animate(puckX, 80 + pushDistance, { duration: time, ease: 'linear', onComplete: () => {
            // Animate coasting
            const coastDistance = finalVelocity * 5; // Arbitrary coast distance
            animate(puckX, puckX.get() + coastDistance, { duration: 1.5, ease: 'linear', onComplete: () => {
                setIsAnimating(false);
            }});
            setFinalMomentum(MASS * finalVelocity);
        }});
    };
    
    const handleReset = () => {
        puckX.stop(); pusherX.stop();
        setIsAnimating(false);
        setFinalMomentum(0);
        puckX.set(80);
        pusherX.set(50);
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Impulse-Momentum Visualizer</h3>
            <div className="relative w-full h-28 flex-grow flex flex-col justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg">
                <svg viewBox="0 0 400 70" className="w-full h-full">
                    <line x1="10" y1="50" x2="390" y2="50" stroke={isDarkMode ? '#64748b' : '#94a3b8'} strokeWidth="2" />
                    <motion.rect x={pusherX} y="20" width="30" height="30" fill="#f59e0b" />
                    <motion.circle cx={puckX} cy="35" r="15" fill={isDarkMode ? '#cbd5e1' : '#475569'} />
                </svg>
            </div>
             <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                    <p className="font-semibold">Impulse Applied (<InlineMath>{'F \\cdot \\Delta t'}</InlineMath>)</p>
                    <p className="font-mono text-xl text-blue-500">{impulse.toFixed(1)} <span className="text-xs">N·s</span></p>
                </div>
                 <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                    <p className="font-semibold">Final Momentum (<InlineMath>{'\\Delta p'}</InlineMath>)</p>
                    <p className="font-mono text-xl text-blue-500">{finalMomentum.toFixed(1)} <span className="text-xs">kg·m/s</span></p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4">
                <div>
                    <label className="text-sm">Force (F): {force.toFixed(0)} N</label>
                    <input type="range" min="10" max="100" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full" disabled={isAnimating}/>
                </div>
                 <div>
                    <label className="text-sm">Time (<InlineMath>{'\\Delta t'}</InlineMath>): {time.toFixed(1)} s</label>
                    <input type="range" min="0.5" max="2.5" step="0.1" value={time} onChange={e => setTime(Number(e.target.value))} className="w-full" disabled={isAnimating}/>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>Push</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};


export default function MomentumForceSlide4() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">Force and Momentum, Connected</h3>
                        <p className="text-lg leading-relaxed">
                           Newton's Second Law is most fundamentally defined in terms of momentum. It states that the net force on an object is equal to the <strong>rate of change of its momentum</strong>.
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The "Other" Second Law</h3>
                        <div className="text-center text-3xl font-bold p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <InlineMath>{'F_{net} = \\frac{\\Delta p}{\\Delta t}'}</InlineMath>
                        </div>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                       <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Wait, isn't it F=ma?</h3>
                       <p className="text-lg">Yes! They are the same for constant mass. Watch:</p>
                       <ol className="list-decimal list-inside mt-2 space-y-2 text-lg">
                           <li>Start with <InlineMath>{'F = \\frac{\\Delta p}{\\Delta t}'}</InlineMath></li>
                           <li>Substitute <InlineMath>{'p = mv'}</InlineMath>: <InlineMath>{'F = \\frac{\\Delta (mv)}{\\Delta t}'}</InlineMath></li>
                           <li>For constant mass: <InlineMath>{'F = m \\frac{\\Delta v}{\\Delta t}'}</InlineMath></li>
                           <li>Since <InlineMath>{'a = \\frac{\\Delta v}{\\Delta t}'}</InlineMath>, we get: <InlineMath>{'F = ma'}</InlineMath></li>
                       </ol>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Simulation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <RateOfChangeVisualizer isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="mf-force-rate"
            slideTitle="Force and Momentum"
            moduleId="force-and-laws"
            submoduleId="momentum-and-force"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}