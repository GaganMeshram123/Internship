import React from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT 1: REDUCING FRICTION ---
const ReduceFrictionAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 200;
    const groundY = 180;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Ground */}
                <line x1="0" y1={groundY} x2={svgWidth} y2={groundY} className="stroke-slate-400" strokeWidth="2" />
                
                {/* 1. Sliding Box (High Friction) */}
                <text x="75" y="40" textAnchor="middle" className="text-xs font-semibold fill-red-500">Sliding (High Friction)</text>
                <motion.rect
                    x={25}
                    y={groundY - 40}
                    width={100}
                    height={40}
                    fill="#A16207"
                    initial={{ x: 25 }}
                    animate={{ x: 100 }}
                    transition={{ delay: 1.0, duration: 2.5, ease: "easeOut" }}
                />

                {/* 2. Rolling Box (Low Friction) */}
                <text x="275" y="40" textAnchor="middle" className="text-xs font-semibold fill-green-500">Rolling (Low Friction)</text>
                <motion.g
                    initial={{ x: 225 }}
                    animate={{ x: 350 }}
                    transition={{ delay: 1.0, duration: 1.5, ease: "easeOut" }}
                >
                    <rect y={groundY - 40} width={100} height={30} fill="#A16207" />
                    {/* Ball Bearings (Wheels) */}
                    {[0, 1, 2, 3].map(i => (
                        <motion.circle
                            key={i}
                            cx={12.5 + i * 25}
                            cy={groundY - 5}
                            r={5}
                            fill="#334155"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, ease: "linear", repeat: Infinity, delay: 1.0 }}
                        />
                    ))}
                </motion.g>
            </svg>
        </div>
    );
};

// --- ANIMATION COMPONENT 2: INCREASING FRICTION ---
const IncreaseFrictionAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 200;
    const groundY = 180;
    
    // Jagged path for treads
    const treadPath = "M 0 0 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5";

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Tilted Ground (Hill) */}
                <path d={`M 0 ${groundY + 20} L ${svgWidth} ${groundY - 40} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`} fill="#94A3B8" />
                
                {/* 1. Smooth Tyre (Slips) */}
                <text x="100" y="80" textAnchor="middle" className="text-xs font-semibold fill-red-500">Smooth (Slips)</text>
                <motion.circle
                    cx="100"
                    cy="140"
                    r="20"
                    fill="#334155"
                    initial={{ y: 0, rotate: 0 }}
                    animate={{ y: 30, rotate: 180 }} // Slips down
                    transition={{ delay: 1.0, duration: 2.0, ease: "easeIn" }}
                />

                {/* 2. Treaded Tyre (Grips) */}
                <text x="300" y="80" textAnchor="middle" className="text-xs font-semibold fill-green-500">Treads (Grips)</text>
                <motion.g
                    initial={{ x: 300, y: 115 }}
                    animate={{ x: 300, y: 115 }} // Stays in place
                    transition={{ delay: 1.0, duration: 2.0 }}
                >
                    <circle cx="0" cy="0" r="20" fill="#334155" />
                    <path d={treadPath} transform="translate(-40, 18)" stroke="#111" strokeWidth="2" fill="none" />
                </motion.g>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENTS ---


export default function ForcesOfFrictionSlide4() {
    const { isDarkMode } = useThemeContext();
    
    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {/* Split layout: left side for Reducing, right side for Increasing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Reducing Friction */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg h-full">
                        <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">
                            How to Reduce Friction
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li><strong>Lubrication:</strong> Applying oil or grease between surfaces.</li>
                            <li><strong>Polishing:</strong> Making surfaces smoother.</li>
                            <li><strong>Ball Bearings:</strong> Reducing sliding to rolling friction in machines.</li>
                            <li><strong>Streamlining:</strong> Shaping vehicles to move smoothly through air or water.</li>
                        </ul>
                        
                        {/* Animation for Reducing Friction */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400 text-center">
                                Rolling is Easier than Sliding
                            </h3>
                            <ReduceFrictionAnimation />
                        </div>
                    </div>
                </div>

                {/* Right Column - Increasing Friction */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg h-full">
                        <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
                            How to Increase Friction
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>Make surfaces <strong>rougher</strong> (e.g., tyre treads, shoe soles).</li>
                            <li>Use <strong>sand or gravel</strong> on slippery roads.</li>
                            <li>Add <strong>spikes</strong> to shoes for better grip (e.g., sports cleats).</li>
                        </ul>

                        {/* Animation for Increasing Friction */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400 text-center">
                                Treads and Soles Add Grip
                            </h3>
                            <IncreaseFrictionAnimation />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="controlling-friction" // From index.tsx
            slideTitle="Controlling Friction" // From index.tsx
            moduleId="physics-force"
            submoduleId="forces-of-friction"
            interactions={{}} // No quiz interactions on this slide
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}