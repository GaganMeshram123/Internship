import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
// This animation will have 3 tabs to show the 3 types of friction.
const FrictionTypesAnimation: React.FC = () => {
    type FrictionType = 'static' | 'sliding' | 'rolling';
    const [activeTab, setActiveTab] = useState<FrictionType>('static');

    const svgWidth = 400;
    const svgHeight = 200;
    const groundY = 180;

    // --- Arrow component ---
    const Arrow: React.FC<{ x: number, y: number, length: number, label: string, color: string, left?: boolean }> = 
        ({ x, y, length, label, color, left = false }) => {
        const x2 = left ? x - length : x + length;
        const headOffset = left ? 5 : -5;
        return (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <line x1={x} y1={y} x2={x2} y2={y} stroke={color} strokeWidth="3" />
                <path d={`M ${x2 + headOffset} ${y - 4} L ${x2} ${y} L ${x2 + headOffset} ${y + 4}`} fill={color} />
                <text x={(x + x2) / 2} y={y - 8} textAnchor="middle" className="text-xs font-semibold" fill={color}>{label}</text>
            </motion.g>
        );
    };

    // --- Figure component ---
    const StickFigure: React.FC<{ x: number, y: number, color: string }> = ({ x, y, color }) => (
        <g transform={`translate(${x}, ${y})`}>
            <circle cx="0" cy="-30" r="6" fill={color} />
            <line x1="0" y1="-24" x2="0" y2="-10" stroke={color} strokeWidth="2.5" />
            <line x1="0" y1="-10" x2="-6" y2="0" stroke={color} strokeWidth="2.5" />
            <line x1="0" y1="-10" x2="6" y2="0" stroke={color} strokeWidth="2.5" />
            {/* Arms pushing */}
            <line x1="0" y1="-20" x2="10" y2="-20" stroke={color} strokeWidth="2.5" />
        </g>
    );

    const scenes = {
        static: {
            box: (
                <motion.rect x={180} y={groundY - 60} width={60} height={60} fill="#78350F" // brown-900
                    initial={{ x: 180 }} animate={{ x: 180 }} exit={{ opacity: 0 }}
                />
            ),
            arrows: (
                <>
                    <Arrow x={170} y={groundY - 30} length={60} label="Push (50N)" color="#3B82F6" />
                    <Arrow x={250} y={groundY - 30} length={60} label="Static Friction (50N)" color="#EF4444" left />
                </>
            ),
            result: "Result: No Movement (Forces are balanced)"
        },
        sliding: {
            box: (
                <motion.rect x={180} y={groundY - 60} width={60} height={60} fill="#A16207" // brown-700
                    initial={{ x: 100, opacity: 0 }} 
                    animate={{ x: 300, opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.0, ease: "linear", repeat: Infinity }}
                />
            ),
            arrows: (
                <motion.g initial={{ x: 100 }} animate={{ x: 300 }} transition={{ duration: 2.0, ease: "linear", repeat: Infinity }}>
                    <Arrow x={-10} y={groundY - 30} length={80} label="Push (80N)" color="#3B82F6" />
                    <Arrow x={70} y={groundY - 30} length={40} label="Sliding Friction (40N)" color="#EF4444" left />
                </motion.g>
            ),
            result: "Result: Sliding (Push > Friction)"
        },
        rolling: {
            box: (
                <motion.g 
                    initial={{ x: 100, opacity: 0 }} 
                    animate={{ x: 300, opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.0, ease: "linear", repeat: Infinity }}
                >
                    <rect x={180} y={groundY - 60} width={60} height={40} fill="#A16207" />
                    <circle cx={190} cy={groundY - 10} r={10} fill="#334155" />
                    <circle cx={230} cy={groundY - 10} r={10} fill="#334155" />
                </motion.g>
            ),
            arrows: (
                <motion.g initial={{ x: 100 }} animate={{ x: 300 }} transition={{ duration: 1.0, ease: "linear", repeat: Infinity }}>
                    <Arrow x={-10} y={groundY - 30} length={60} label="Push (60N)" color="#3B82F6" />
                    <Arrow x={70} y={groundY - 30} length={15} label="Rolling Friction (15N)" color="#EF4444" left />
                </motion.g>
            ),
            result: "Result: Rolling (Push >> Friction)"
        }
    };
    
    return (
        <div className="w-full">
            {/* Tabs */}
            <div className="flex justify-center space-x-2 mb-4">
                {(['static', 'sliding', 'rolling'] as FrictionType[]).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            activeTab === tab 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
            
            {/* Animation Canvas */}
            <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
                <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    <line x1="0" y1={groundY} x2={svgWidth} y2={groundY} className="stroke-slate-400" strokeWidth="2" />
                    
                    {/* Pusher Figure (present in all) */}
                    <AnimatePresence>
                         <motion.g initial={{ x: 100 }} animate={{ x: scenes[activeTab].box.props.animate.x || 100 }} transition={scenes[activeTab].box.props.transition}>
                            <StickFigure x={-20} y={groundY - 10} color="#3B82F6" />
                         </motion.g>
                    </AnimatePresence>
                    
                    {/* Scene Content */}
                    <AnimatePresence mode="wait">
                        <motion.g key={activeTab}>
                            {scenes[activeTab].box}
                            {scenes[activeTab].arrows}
                        </motion.g>
                    </AnimatePresence>
                </svg>
            </div>
            <p className="text-center text-sm font-semibold text-slate-600 dark:text-slate-400 mt-2">
                {scenes[activeTab].result}
            </p>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT ---


export default function ForcesOfFrictionSlide2() {
    const { isDarkMode } = useThemeContext();
    
    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Content */}
                <div className="space-y-6 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                        Types of Friction
                    </h2>
                    
                    {/* Card 1: Static Friction */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Static Friction</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            Acts between two objects that are <strong>not moving</strong> relative to each other.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                            <strong>Example:</strong> Trying to push a heavy box that doesn't move.
                        </p>
                    </div>
                    
                    {/* Card 2: Sliding Friction */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Sliding Friction</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            Acts when one object <strong>slides</strong> over another.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                            <strong>Example:</strong> A book sliding on a table.
                        </p>
                    </div>

                    {/* Card 3: Rolling Friction */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Rolling Friction</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            Acts when an object <strong>rolls</strong> over a surface.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                            <strong>Example:</strong> A ball or car tyre moving on the road.
                        </p>
                    </div>
                </div>

                {/* Right Column - Animation */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            See the Difference
                        </h3>
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <FrictionTypesAnimation />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="types-of-friction" // From index.tsx
            slideTitle="Types of Friction" // From index.tsx
            moduleId="physics-force"
            submoduleId="forces-of-friction"
            interactions={{}} // No quiz interactions on this slide
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}