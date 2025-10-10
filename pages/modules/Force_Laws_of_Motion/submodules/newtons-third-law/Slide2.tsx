import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/Themed';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS for this animation ---
type View = 'all' | 'box' | 'person';

// --- INTERACTIVE SIMULATION: ISOLATING FORCES ---
const ObjectIsolationSimulation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [view, setView] = useState<View>('all');
    const [isPushing, setIsPushing] = useState(false);

    const personX = useMotionValue(100);
    const boxX = useMotionValue(180);

    // Theme-based colors
    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const personForceColor = '#ef4444'; // Red
    const boxForceColor = '#3b82f6'; // Blue

    const runAnimation = () => {
        if (isPushing) return;
        setIsPushing(true);
        // Box moves more, person recoils slightly
        animate(personX, 90, { duration: 1, ease: 'easeOut' });
        animate(boxX, 280, { duration: 1.5, ease: 'easeOut' });
    };

    const handleReset = () => {
        personX.stop();
        boxX.stop();
        setIsPushing(false);
        personX.set(100);
        boxX.set(180);
    };

    const Person = () => (
        <g>
            <circle cx="0" cy="-5" r="10" fill={textColor} />
            <rect x="-5" y="5" width="10" height="30" fill={textColor} />
        </g>
    );
    const Box = () => <rect x="-30" y="0" width="60" height="40" fill={textColor} rx="5" />;

    const descriptions: Record<View, string> = {
        all: "Action and reaction forces act on different objects.",
        box: "The box moves because of the force the person exerts ON IT.",
        person: "The person feels an equal push backward from the box ON THEM."
    };

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Isolate The Objects</h3>
            <div className="relative w-full h-48 flex-grow flex flex-col justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    <line x1="10" y1="80" x2="390" y2="80" stroke={isDarkMode ? '#64748b' : '#94a3b8'} strokeWidth="1" />
                    
                    <motion.g style={{ x: personX, y: 40 }} animate={{ opacity: view === 'box' ? 0.2 : 1 }}><Person /></motion.g>
                    <motion.g style={{ x: boxX, y: 40 }} animate={{ opacity: view === 'person' ? 0.2 : 1 }}><Box /></motion.g>
                    
                    <AnimatePresence>
                        {isPushing && (
                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {/* Force on Box (Action) */}
                                <motion.g style={{ x: boxX }} animate={{ opacity: view === 'person' ? 0 : 1 }}>
                                    <path d="M -40 20 L -90 20" stroke={boxForceColor} strokeWidth="3" />
                                    <path d="M -90 20 L -80 16 L -80 24 Z" fill={boxForceColor} />
                                    <text x="-65" y="12" textAnchor="middle" fontSize="10" fill={boxForceColor}>Force on Box</text>
                                </motion.g>
                                {/* Force on Person (Reaction) */}
                                <motion.g style={{ x: personX }} animate={{ opacity: view === 'box' ? 0 : 1 }}>
                                    <path d="M 20 0 L 70 0" stroke={personForceColor} strokeWidth="3" />
                                    <path d="M 70 0 L 60 -4 L 60 4 Z" fill={personForceColor} />
                                    <text x="45" y="-8" textAnchor="middle" fontSize="10" fill={personForceColor}>Force on Person</text>
                                </motion.g>
                            </motion.g>
                        )}
                    </AnimatePresence>
                </svg>
            </div>

            <div className="text-center h-12 mt-2 p-2 rounded-lg bg-slate-200 dark:bg-slate-700">
                <AnimatePresence mode="wait">
                    <motion.p key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     className="font-semibold text-blue-500">
                        {descriptions[view]}
                    </motion.p>
                </AnimatePresence>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mt-4">
                <button onClick={() => setView('all')} className={`px-3 py-1 text-sm rounded-full transition-colors ${view === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-600'}`}>Show All</button>
                <button onClick={() => setView('box')} className={`px-3 py-1 text-sm rounded-full transition-colors ${view === 'box' ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-600'}`}>Isolate Box</button>
                <button onClick={() => setView('person')} className={`px-3 py-1 text-sm rounded-full transition-colors ${view === 'person' ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-600'}`}>Isolate Person</button>
            </div>

            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isPushing} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isPushing ? 1.05 : 1}} whileTap={{ scale: !isPushing ? 0.95 : 1 }}>Push</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};

export default function NewtonsThirdLawSlide2() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">The Common Confusion</h3>
                        <p className="text-xl italic leading-relaxed">
                           "If the forces are equal and opposite, why don't they cancel out? Why does anything move?"
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Answer: Different Objects</h3>
                        <p className="text-lg leading-relaxed">
                           An action-reaction pair can <strong>never</strong> cancel because the two forces act on <strong>two different objects</strong>.
                        </p>
                         <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                           <p className="font-semibold text-center">To determine an object's motion, you only consider the forces acting ON that single object.</p>
                        </div>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                       <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Example: Person Pushing a Box</h3>
                        <ul className="list-none space-y-2 text-lg">
                           <li><strong className="text-blue-500">Action:</strong> Person pushes on Box. (This force determines the box's acceleration).</li>
                           <li><strong className="text-red-500">Reaction:</strong> Box pushes on Person. (This force is what the person feels on their hands).</li>
                        </ul>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Simulation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <ObjectIsolationSimulation isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n3-objects"
            slideTitle="Forces on Different Objects"
            moduleId="force-and-laws"
            submoduleId="newtons-third-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}