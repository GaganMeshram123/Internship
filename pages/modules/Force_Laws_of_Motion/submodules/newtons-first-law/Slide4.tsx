import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS for this component ---
type Example = {
    id: 'car' | 'tablecloth' | 'ketchup' | 'space';
    title: string;
    description: string;
    AnimationComponent: React.FC<{ isDarkMode: boolean }>;
};

// --- MINI-ANIMATION COMPONENTS ---
const CarAnimation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const carColor = isDarkMode ? '#cbd5e1' : '#475569';
    return (
        <motion.svg viewBox="0 0 200 100" key="car">
            <motion.g initial={{ x: 20 }} animate={{ x: 100 }} transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}>
                {/* Car Body */}
                <path d="M 0 50 L 10 30 L 60 30 L 70 50 Z" fill={carColor} />
                <rect x="0" y="50" width="70" height="20" rx="5" fill={carColor} />
                <circle cx="15" cy="70" r="8" fill={isDarkMode ? '#475569' : '#fff'} stroke={carColor} strokeWidth="2" />
                <circle cx="55" cy="70" r="8" fill={isDarkMode ? '#475569' : '#fff'} stroke={carColor} strokeWidth="2" />
                {/* Person */}
                <motion.g initial={{ x: 0 }} animate={{ x: 10 }} transition={{ duration: 0.3, ease: 'easeOut', delay: 2.0 }}>
                    <circle cx="35" cy="35" r="5" fill="#3b82f6" />
                    <rect x="30" y="40" width="10" height="15" fill="#3b82f6" />
                </motion.g>
            </motion.g>
        </motion.svg>
    );
};

const TableclothAnimation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const tableColor = isDarkMode ? '#64748b' : '#94a3b8';
    const dishColor = isDarkMode ? '#cbd5e1' : '#475569';
    return (
        <motion.svg viewBox="0 0 200 100" key="tablecloth">
            {/* Table */}
            <line x1="10" y1="80" x2="190" y2="80" stroke={tableColor} strokeWidth="3" />
            <line x1="40" y1="80" x2="40" y2="100" stroke={tableColor} strokeWidth="3" />
            <line x1="160" y1="80" x2="160" y2="100" stroke={tableColor} strokeWidth="3" />
            {/* Dishes */}
            <motion.g initial={{ y: 0 }} animate={{ y: 2 }} transition={{ delay: 1.5, duration: 0.2 }}>
                <rect x="80" y="60" width="40" height="15" fill={dishColor} rx="2" />
                <rect x="90" y="45" width="20" height="15" fill={dishColor} rx="2" />
            </motion.g>
            {/* Tablecloth */}
            <motion.rect x="0" y="75" width="200" height="5" fill="#ef4444"
                initial={{ x: 0 }} animate={{ x: 200 }} transition={{ duration: 0.5, ease: 'linear', delay: 1 }} />
        </motion.svg>
    );
};

const KetchupAnimation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const bottleColor = isDarkMode ? '#cbd5e1' : '#475569';
    return (
        <motion.svg viewBox="0 0 200 100" key="ketchup">
            <motion.g initial={{ y: 20 }} animate={{ y: [20, 70, 60] }} transition={{ duration: 1.5, times: [0, 0.6, 1], delay: 0.5, ease: 'easeInOut' }}>
                {/* Bottle */}
                <rect x="80" y="0" width="40" height="60" rx="10" fill="none" stroke={bottleColor} strokeWidth="3" />
                <rect x="90" y="-10" width="20" height="10" fill={bottleColor} />
                 {/* Ketchup */}
                <motion.rect x="90" y="40" width="20" height="15" fill="#ef4444" rx="5"
                    initial={{ y: 40 }} animate={{ y: [40, 40, 60] }} transition={{ duration: 1.5, times: [0, 0.7, 1], delay: 0.5, ease: 'easeOut' }} />
            </motion.g>
        </motion.svg>
    );
};


// --- DATA for the carousel ---
const examples: Example[] = [
    { id: 'car', title: 'Sudden Stop in a Car', description: "When a car stops suddenly, your body's inertia makes it continue to move forward. This is why seatbelts are crucial for safety.", AnimationComponent: CarAnimation },
    { id: 'tablecloth', title: 'The Tablecloth Trick', description: "The dishes on the table have inertia. If the tablecloth is pulled quickly enough, the dishes resist the change in motion and stay in place.", AnimationComponent: TableclothAnimation },
    { id: 'ketchup', title: 'Shaking a Ketchup Bottle', description: "When you swing the bottle down and stop it suddenly, the ketchup inside continues moving downwards due to its inertia, forcing it out of the bottle.", AnimationComponent: KetchupAnimation },
];


export default function NewtonsFirstLawSlide4() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % examples.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);

    const currentExample = examples[currentIndex];
    const { AnimationComponent } = currentExample;
    
    // Variant for carousel animation
    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0 }),
    };

    return (
        <SlideComponentWrapper
            slideId="n1-examples"
            slideTitle="Inertia in Everyday Life"
            moduleId="force-and-laws"
            submoduleId="newtons-first-law"
            interactions={localInteractions}
        >
            <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                    
                    {/* --- Left Column: Explanations --- */}
                    <div className="space-y-6 flex flex-col justify-center">
                        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                            <h3 className="text-2xl font-bold mb-4 text-blue-500">Inertia is Everywhere</h3>
                            <p className="text-lg leading-relaxed">
                                Newton's First Law isn't just a textbook concept—it's constantly at play in the world around us. Once you know what to look for, you'll see examples of inertia everywhere.
                            </p>
                        </div>
                        
                        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg min-h-[12rem]`}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">{currentExample.title}</h3>
                                    <p className="text-lg leading-relaxed">{currentExample.description}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    
                    {/* --- Right Column: Interactive Carousel --- */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className={`relative w-full h-64 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg flex items-center justify-center overflow-hidden`}>
                            <AnimatePresence initial={false} custom={1}>
                                <motion.div
                                    key={currentIndex}
                                    custom={1}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                    className="absolute w-full h-full"
                                >
                                    <AnimationComponent isDarkMode={isDarkMode} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <motion.button onClick={handlePrev} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                Prev
                            </motion.button>
                            <div className="text-sm text-slate-500">{currentIndex + 1} / {examples.length}</div>
                            <motion.button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                Next
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </SlideComponentWrapper>
    );
}