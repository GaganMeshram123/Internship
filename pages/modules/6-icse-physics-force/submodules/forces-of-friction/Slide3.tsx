import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT 1: EFFECTS ---
const EffectsAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 150;
    const groundY = 130;
    const boxWidth = 60;
    const boxHeight = 40;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Ground */}
                <line x1="0" y1={groundY} x2={svgWidth} y2={groundY} className="stroke-slate-400" strokeWidth="2" />
                
                {/* Box that slides and slows down */}
                <motion.rect
                    x={50}
                    y={groundY - boxHeight}
                    width={boxWidth}
                    height={boxHeight}
                    fill="#A16207" // brown-700
                    initial={{ x: 50 }}
                    animate={{ x: 250 }}
                    transition={{
                        delay: 0.5,
                        duration: 2.0,
                        ease: "easeOut" // Starts fast, ends slow
                    }}
                />
                
                {/* Heat/Wear particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.circle
                        key={i}
                        cx={150} // Area where rubbing happens
                        cy={groundY - 5}
                        r={Math.random() * 3 + 1}
                        fill="#F59E0B" // Amber-500
                        initial={{ opacity: 0, x: 150 + (Math.random() - 0.5) * 100 }}
                        animate={{ opacity: [0, 1, 0], y: groundY - 20 - (Math.random() * 20) }}
                        transition={{
                            delay: 0.8 + Math.random() * 1.5,
                            duration: 1.0,
                            ease: "easeOut",
                            repeat: Infinity,
                            repeatDelay: 1.0
                        }}
                    />
                ))}
                
                <text x={150} y={40} className="text-sm font-semibold fill-slate-700 dark:fill-slate-300">
                    Object slows down
                </text>
                <text x={150} y={60} className="text-sm font-semibold fill-amber-500">
                    Heat is produced
                </text>
            </svg>
        </div>
    );
};

// --- ANIMATION COMPONENT 2: FACTORS ---
const FactorsAnimation: React.FC = () => {
    type FactorType = 'surface' | 'weight';
    const [activeTab, setActiveTab] = useState<FactorType>('surface');

    const svgWidth = 400;
    const svgHeight = 150;
    const groundY = 130;

    // A simple scene component
    const Scene: React.FC<{ boxColor: string, groundColor: string, groundLabel: string, moveDistance: number, boxText?: string }> = 
        ({ boxColor, groundColor, groundLabel, moveDistance, boxText }) => (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Ground */}
            <rect x="0" y={groundY} width={svgWidth} height={svgHeight - groundY} fill={groundColor} />
            <text x="20" y={groundY + 15} className="text-xs fill-black">{groundLabel}</text>
            
            {/* Box */}
            <motion.g
                initial={{ x: 50 }}
                animate={{ x: 50 + moveDistance }}
                transition={{ duration: 2.0, ease: "easeOut", delay: 0.5 }}
            >
                <rect y={groundY - 40} width="40" height="40" fill={boxColor} />
                {boxText && <text y={groundY - 20} x="20" textAnchor="middle" className="text-xs fill-white font-bold">{boxText}</text>}
            </motion.g>
        </motion.g>
    );

    return (
        <div className="w-full">
            {/* Tabs */}
            <div className="flex justify-center space-x-2 mb-4">
                <button
                    onClick={() => setActiveTab('surface')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        activeTab === 'surface' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                >
                    Surface Type
                </button>
                <button
                    onClick={() => setActiveTab('weight')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        activeTab === 'weight' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                >
                    Weight
                </button>
            </div>
            
            {/* Animation Canvas */}
            <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
                <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    <AnimatePresence mode="wait">
                        {activeTab === 'surface' ? (
                            <Scene key="surface" boxColor="#A16207" groundColor="#654321" groundLabel="Rough Sand" moveDistance={100} />
                        ) : (
                            <Scene key="weight" boxColor="#A16207" groundColor="#654321" groundLabel="Rough Sand" moveDistance={100} />
                        )}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        {activeTab === 'surface' ? (
                            <Scene key="surface2" boxColor="#A16207" groundColor="#A0E9FF" groundLabel="Smooth Ice" moveDistance={300} />
                        ) : (
                            <Scene key="weight2" boxColor="#4B5563" groundColor="#654321" groundLabel="Rough Sand" moveDistance={50} boxText="HEAVY" />
                        )}
                    </AnimatePresence>
                </svg>
            </div>
            <p className="text-center text-sm font-semibold text-slate-600 dark:text-slate-400 mt-2">
                {activeTab === 'surface' 
                    ? "More friction on rough sand (stops sooner) than smooth ice."
                    : "More friction on the heavy box (stops sooner) than the light one."
                }
            </p>
        </div>
    );
};
// --- END OF ANIMATION COMPONENTS ---


export default function ForcesOfFrictionSlide3() {
    const { isDarkMode } = useThemeContext();
    
    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Content */}
                <div className="space-y-6 flex flex-col justify-center">
                    {/* Card 1: Effects of Friction */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-blue-500/50">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            Effects of Friction
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>Friction <strong>slows down or stops</strong> moving objects.</li>
                            <li>It produces <strong>heat</strong> (e.g., rubbing hands together).</li>
                            <li>It causes <strong>wear and tear</strong> in machines, shoes, and tyres.</li>
                        </ul>
                    </div>
                    
                    {/* Card 2: Factors Affecting Friction */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-blue-500/50">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            Factors Affecting Friction
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li><strong>Nature of the Surfaces:</strong> Rough surfaces (like carpet) have more friction. Smooth surfaces (like ice) have less.</li>
                            <li><strong>Weight of the Object:</strong> Heavier objects press down harder, creating more friction.</li>
                            <li><strong>Area of Contact:</strong> Friction does <em>not</em> depend much on the area of contact. (A wide book and a narrow book of the same weight have similar friction).</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Animations */}
                <div className="space-y-6 flex flex-col justify-center">
                    {/* Animation 1 Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            The Effects in Action
                        </h3>
                        <EffectsAnimation />
                    </div>

                    {/* Animation 2 Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            What Changes Friction?
                        </h3>
                        <FactorsAnimation />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="effects-and-factors-of-friction" // From index.tsx
            slideTitle="Effects & Factors of Friction" // From index.tsx
            moduleId="physics-force"
            submoduleId="forces-of-friction"
            interactions={{}} // No quiz interactions on this slide
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}