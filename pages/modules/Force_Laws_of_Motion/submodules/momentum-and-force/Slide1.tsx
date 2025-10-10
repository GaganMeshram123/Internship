import React, { useState, useMemo } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- INTERACTIVE SIMULATION: MOMENTUM COMPARATOR ---
const MomentumComparator = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [truckMass, setTruckMass] = useState(2000); // kg
    const [truckVelocity, setTruckVelocity] = useState(10); // m/s
    const [bulletMass, setBulletMass] = useState(0.02); // kg
    const [bulletVelocity, setBulletVelocity] = useState(500); // m/s
    const [isAnimating, setIsAnimating] = useState(false);

    const truckX = useMotionValue(50);
    const bulletX = useMotionValue(50);

    const truckMomentum = useMemo(() => truckMass * truckVelocity, [truckMass, truckVelocity]);
    const bulletMomentum = useMemo(() => bulletMass * bulletVelocity, [bulletMass, bulletVelocity]);

    const runAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        truckX.set(50);
        bulletX.set(50);

        const distance = 300;
        animate(truckX, 50 + distance, { duration: distance / (truckVelocity * 10), ease: 'linear' });
        animate(bulletX, 50 + distance, { duration: distance / (bulletVelocity * 2), ease: 'linear', onComplete: () => setIsAnimating(false) });
    };
    
    const handleReset = () => {
        truckX.stop(); bulletX.stop();
        setIsAnimating(false);
        truckX.set(50); bulletX.set(50);
    };

    const Truck = () => <path d="M-30 0 L-20 -15 L10 -15 L20 0 L-30 0 Z M-25 0 L-25 15 L-15 15 L-15 0 Z M5 0 L5 15 L15 15 L15 0 Z M-10 15 a5 5 0 0110 0 Z" fill={isDarkMode ? '#cbd5e1' : '#475569'}/>;
    const Bullet = () => <path d="M-10 0 L0 -2 L10 0 L0 2 Z" fill={isDarkMode ? '#cbd5e1' : '#475569'}/>;

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Momentum Comparator</h3>
            <div className="relative w-full h-28 flex-grow flex flex-col justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    <g transform="translate(0, 30)"><motion.g style={{ x: truckX }}><Truck/></motion.g></g>
                    <g transform="translate(0, 70)"><motion.g style={{ x: bulletX }}><Bullet/></motion.g></g>
                </svg>
            </div>
             <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                    <p className="font-semibold">Truck Momentum (p)</p>
                    <p className="font-mono text-xl text-blue-500">{truckMomentum.toFixed(0)} <span className="text-xs">kg·m/s</span></p>
                </div>
                <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                    <p className="font-semibold">Bullet Momentum (p)</p>
                    <p className="font-mono text-xl text-blue-500">{bulletMomentum.toFixed(2)} <span className="text-xs">kg·m/s</span></p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                <div>
                    <label className="text-xs">Truck Mass: {truckMass} kg</label>
                    <input type="range" min="1000" max="5000" value={truckMass} onChange={e => setTruckMass(Number(e.target.value))} className="w-full" disabled={isAnimating}/>
                </div>
                 <div>
                    <label className="text-xs">Bullet Mass: {bulletMass.toFixed(3)} kg</label>
                    <input type="range" min="0.005" max="0.05" step="0.001" value={bulletMass} onChange={e => setBulletMass(Number(e.target.value))} className="w-full" disabled={isAnimating}/>
                </div>
                <div>
                    <label className="text-xs">Truck Velocity: {truckVelocity} m/s</label>
                    <input type="range" min="1" max="30" value={truckVelocity} onChange={e => setTruckVelocity(Number(e.target.value))} className="w-full" disabled={isAnimating}/>
                </div>
                 <div>
                    <label className="text-xs">Bullet Velocity: {bulletVelocity} m/s</label>
                    <input type="range" min="200" max="800" value={bulletVelocity} onChange={e => setBulletVelocity(Number(e.target.value))} className="w-full" disabled={isAnimating}/>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>Go!</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};

export default function MomentumForceSlide1() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">What is Momentum?</h3>
                        <p className="text-lg leading-relaxed">
                           Momentum is often called "mass in motion." It is a measure of how hard it is to stop a moving object. It depends on both an object's mass and its velocity.
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Momentum Equation</h3>
                        <div className="text-center text-3xl font-bold p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <InlineMath>{'p = m \\cdot v'}</InlineMath>
                        </div>
                         <ul className="list-disc list-inside space-y-2 text-lg mt-4">
                           <li><strong>p:</strong> momentum (in kg·m/s)</li>
                           <li><strong>m:</strong> mass (in kg)</li>
                           <li><strong>v:</strong> velocity (in m/s)</li>
                        </ul>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Mass vs. Velocity</h3>
                        <p className="text-lg leading-relaxed">
                          A very heavy, slow object (like a truck) can have the same momentum as a very light, fast object (like a bullet). Use the simulator to find a balance!
                        </p>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Simulation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <MomentumComparator isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="mf-momentum-intro"
            slideTitle="What is Momentum? (Mass in Motion)"
            moduleId="force-and-laws"
            submoduleId="momentum-and-force"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}