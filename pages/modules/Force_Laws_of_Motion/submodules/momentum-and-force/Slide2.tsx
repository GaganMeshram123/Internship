import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS & DATA ---
type ObjectType = 'runner' | 'bowlingBall' | 'car';
type Mode = 'calculator' | 'challenge';

type ObjectData = {
    name: string;
    minMass: number; maxMass: number; defaultMass: number;
    minV: number; maxV: number; defaultV: number;
    SvgComponent: React.FC<{ isDarkMode: boolean, mass: number }>;
};

// --- SVG Components for Objects (With subtle animation) ---
const RunnerIcon: React.FC<{ isDarkMode: boolean, mass: number }> = ({ isDarkMode, mass }) => (
    <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
        <g transform={`scale(${0.8 + (mass - 50) / 50 * 0.2})`}>
            <circle cx="0" cy="-20" r="8" /><path d="M 0 -12 L 0 10 L -10 25 M 0 10 L 10 25 M -8 -5 L -20 5 M 8 -5 L 20 5" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
    </motion.g>
);
const BowlingBallIcon: React.FC<{ isDarkMode: boolean, mass: number }> = ({ isDarkMode, mass }) => (
    <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="0" cy="0" r={15 + (mass - 5) * 2} />
    </motion.g>
);
const CarIcon: React.FC<{ isDarkMode: boolean, mass: number }> = ({ isDarkMode, mass }) => (
    <motion.g animate={{ y: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
        <g transform={`scale(${0.8 + (mass - 1000) / 1500 * 0.2})`}>
            <path d="M -30 -5 L -20 -25 L 20 -25 L 30 -5 Z" /><rect x="-35" y="-5" width="70" height="20" rx="5" />
            <circle cx="-20" cy="15" r="8" fill={isDarkMode ? '#1e293b' : '#e2e8f0'} /><circle cx="20" cy="15" r="8" fill={isDarkMode ? '#1e293b' : '#e2e8f0'} />
        </g>
    </motion.g>
);

const objectData: Record<ObjectType, ObjectData> = {
    runner: { name: "Runner", minMass: 50, maxMass: 100, defaultMass: 75, minV: 1, maxV: 12, defaultV: 7, SvgComponent: RunnerIcon },
    bowlingBall: { name: "Bowling Ball", minMass: 5, maxMass: 7.5, defaultMass: 7, minV: 1, maxV: 10, defaultV: 5, SvgComponent: BowlingBallIcon },
    car: { name: "Car", minMass: 900, maxMass: 2500, defaultMass: 1500, minV: 5, maxV: 45, defaultV: 25, SvgComponent: CarIcon },
};

// --- MAIN INTERACTIVE COMPONENT ---
const MomentumCalculator = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [mode, setMode] = useState<Mode>('calculator');
    const [objectType, setObjectType] = useState<ObjectType>('runner');
    const [mass, setMass] = useState(objectData.runner.defaultMass);
    const [velocity, setVelocity] = useState(objectData.runner.defaultV);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const [challenge, setChallenge] = useState({ target: 500, status: 'active' });

    const objectX = useMotionValue(50);
    const currentObject = objectData[objectType];
    const { SvgComponent } = currentObject;

    const momentum = useMemo(() => mass * velocity, [mass, velocity]);
    const kineticEnergy = useMemo(() => 0.5 * mass * velocity ** 2, [mass, velocity]);

    useEffect(() => {
        if (mode === 'challenge') {
            const difference = Math.abs(momentum - challenge.target);
            if (difference / challenge.target < 0.01) {
                setChallenge(prev => ({ ...prev, status: 'success' }));
            } else {
                setChallenge(prev => ({ ...prev, status: 'active' }));
            }
        }
    }, [momentum, challenge.target, mode]);

    const runAnimation = async () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const brakeZoneStart = 200;
        const momentumScaleFactor = 0.5;
        const stopDistance = Math.min(momentum * momentumScaleFactor, 250);

        // FIX: Remove .finished, just await the animate function call itself
        await animate(objectX, brakeZoneStart + stopDistance, { duration: 1.5, ease: [0.25, 1, 0.5, 1] });
        await new Promise(resolve => setTimeout(resolve, 1000));
        // FIX: Remove .finished here as well
        await animate(objectX, 50, { duration: 0.7, ease: 'easeOut' });
        setIsAnimating(false);
    };
    
    const generateNewChallenge = (type: ObjectType) => {
        const obj = objectData[type];
        const randomMass = obj.minMass + Math.random() * (obj.maxMass - obj.minMass);
        const randomV = obj.minV + Math.random() * (obj.maxV - obj.minV);
        const newTarget = Math.round(randomMass * randomV / 10) * 10;
        setChallenge({ target: newTarget, status: 'active' });
    };

    const handleObjectChange = (type: ObjectType) => {
        setObjectType(type);
        setMass(objectData[type].defaultMass);
        setVelocity(objectData[type].defaultV);
        if (mode === 'challenge') generateNewChallenge(type);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-center mb-4 p-1 rounded-lg bg-slate-200 dark:bg-slate-900/50">
                <button onClick={() => setMode('calculator')} className={`w-1/2 py-2 text-sm font-bold rounded-md transition-colors ${mode === 'calculator' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Calculator</button>
                <button onClick={() => setMode('challenge')} className={`w-1/2 py-2 text-sm font-bold rounded-md transition-colors ${mode === 'challenge' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>Challenge</button>
            </div>
            
            <div className="flex justify-center space-x-2 mb-4">
                 {Object.entries(objectData).map(([key, data]) => (
                    <button key={key} onClick={() => handleObjectChange(key as ObjectType)} disabled={isAnimating}
                       className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${objectType === key ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 disabled:opacity-50'}`}>
                        {data.name}
                    </button>
                ))}
            </div>
            
            <div className="relative w-full h-40 flex-grow flex items-center justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg overflow-hidden">
                <div className="absolute left-0 bottom-0 w-full h-1/3 bg-gradient-to-t from-gray-500/30 to-transparent" />
                <div className="absolute right-0 top-0 h-full w-1/2 bg-red-500/10"><div className="text-center mt-1 text-xs font-bold text-red-400 opacity-70">BRAKE ZONE</div></div>
                <svg viewBox="0 0 500 100" className="w-full h-full absolute">
                    <motion.g style={{ x: objectX, y: 50 }} fill={isDarkMode ? '#cbd5e1' : '#475569'} stroke={isDarkMode ? '#cbd5e1' : '#475569'}>
                        <SvgComponent isDarkMode={isDarkMode} mass={mass} />
                    </motion.g>
                </svg>
                {mode === 'calculator' && <button onClick={runAnimation} disabled={isAnimating} className="absolute bottom-4 right-4 bg-blue-600 text-white font-bold px-4 py-2 rounded-lg text-sm z-10 disabled:bg-slate-500">Play</button>}
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    {mode === 'calculator' ? (
                        <>
                            <div className={`mt-4 grid grid-cols-2 gap-2 font-mono text-center`}>
                                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                                    <p className="text-sm font-sans font-bold text-blue-400">Momentum (p)</p>
                                    <p className="text-2xl">{momentum.toFixed(1)} <span className="text-sm">kg·m/s</span></p>
                                </div>
                                <div className={`p-3 rounded-lg relative ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                                    <p className="text-sm font-sans font-bold text-purple-400">Kinetic Energy (KE)</p>
                                    <p className="text-2xl">{kineticEnergy.toFixed(1)} <span className="text-sm">J</span></p>
                                    <div className="absolute top-1 right-1 group">
                                        <span className="text-xs text-slate-500">ⓘ</span>
                                        <div className="absolute bottom-full mb-2 -right-2 w-64 p-2 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 text-left font-sans">
                                            Momentum is <InlineMath>mv</InlineMath>, Kinetic Energy is <InlineMath>{`\\frac{1}{2}mv^2`}</InlineMath>. Double the velocity doubles momentum but <strong className="text-purple-300">quadruples</strong> kinetic energy!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={`mt-4 p-4 rounded-lg text-center ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                            <p className="text-sm font-bold text-yellow-400">CHALLENGE</p>
                            <p className="text-lg">Adjust the sliders to match the target momentum:</p>
                            <p className="text-4xl font-mono my-2">{challenge.target.toFixed(0)} <span className="text-sm">kg·m/s</span></p>
                            {challenge.status === 'success' ? (
                                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-green-400 font-bold">SUCCESS! 🎉</motion.div>
                            ) : (
                                <p className="text-sm text-slate-500">Your current momentum: {momentum.toFixed(1)}</p>
                            )}
                            <button onClick={() => generateNewChallenge(objectType)} className="mt-2 text-xs bg-slate-500/50 px-2 py-1 rounded-md">New Challenge</button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-6">
                 <div>
                    <label className="text-sm font-semibold">Mass (m): {mass.toFixed(1)} kg</label>
                    <input type="range" min={currentObject.minMass} max={currentObject.maxMass} step={(currentObject.maxMass - currentObject.minMass) / 100} value={mass} 
                      onChange={e => setMass(Number(e.target.value))} className="w-full" disabled={isAnimating}/>
                </div>
                 <div>
                    <label className="text-sm font-semibold">Velocity (v): {velocity.toFixed(1)} m/s</label>
                    <input type="range" min={currentObject.minV} max={currentObject.maxV} step={(currentObject.maxV - currentObject.minV) / 100} value={velocity}
                      onChange={e => setVelocity(Number(e.target.value))} className="w-full" disabled={isAnimating}/>
                </div>
            </div>
        </div>
    );
};

// --- MAIN SLIDE WRAPPER (UNCHANGED) ---
export default function MomentumForceSlide2() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    return (
        <SlideComponentWrapper 
            slideId="mf-momentum-calc"
            slideTitle="Calculating Momentum (p=mv)"
            moduleId="force-and-laws"
            submoduleId="momentum-and-force"
            interactions={localInteractions}
        >
            <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
                <div className="w-full max-w-3xl p-4 md:p-8 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <h3 className="text-3xl font-bold text-blue-500">Momentum Calculator</h3>
                        <p className="text-slate-500 mt-2">Explore how mass and velocity combine to create "mass in motion."</p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 md:p-8 shadow-2xl`}>
                        <MomentumCalculator isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </SlideComponentWrapper>
    );
}