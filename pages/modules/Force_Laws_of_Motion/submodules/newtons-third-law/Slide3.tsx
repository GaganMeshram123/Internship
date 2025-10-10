import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS for this component ---
type Example = {
    id: string;
    title: string;
    description: string;
    AnimationComponent: React.FC<{ isDarkMode: boolean }>;
};

// --- MINI-ANIMATION COMPONENTS ---
const JumpingAnimation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const personColor = isDarkMode ? '#cbd5e1' : '#475569';
    return (
        <motion.svg viewBox="0 0 200 100" key="jumping">
            <line x1="0" y1="90" x2="200" y2="90" stroke={personColor} strokeWidth="2" />
            <motion.g initial={{ y: 0 }} animate={{ y: [-10, -60, -10] }} transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}>
                {/* Person */}
                <circle cx="100" cy="50" r="10" fill={personColor} />
                <rect x="95" y="60" width="10" height="20" fill={personColor} />
                {/* Upward Force (Reaction) */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: 0.5 }}>
                    <path d="M 100 85 L 100 105" stroke="#3b82f6" strokeWidth="3" />
                    <path d="M 100 105 L 96 95 L 104 95 Z" fill="#3b82f6"/>
                    <text x="110" y="100" fontSize="8" fill="#3b82f6">Force on Person</text>
                </motion.g>
            </motion.g>
             {/* Downward Force (Action) */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, delay: 0.5 }}>
                <path d="M 100 95 L 100 115" stroke="#ef4444" strokeWidth="3" />
                <path d="M 100 95 L 96 105 L 104 105 Z" fill="#ef4444"/>
                <text x="110" y="110" fontSize="8" fill="#ef4444">Force on Earth</text>
            </motion.g>
        </motion.svg>
    );
};

const SwimmingAnimation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const waterColor = isDarkMode ? '#1e40af' : '#60a5fa';
    return (
        <motion.svg viewBox="0 0 200 100" key="swimming">
            {/* Swimmer */}
            <rect x="80" y="40" width="40" height="20" fill={isDarkMode ? '#cbd5e1' : '#475569'} rx="10" />
            <motion.g animate={{ x: 40 }} transition={{ duration: 2, ease: 'linear', delay: 0.5 }}>
                {/* Reaction Force on Swimmer */}
                 <path d="M 80 50 L 110 50" stroke="#ef4444" strokeWidth="3" />
                 <path d="M 110 50 L 100 46 L 100 54 Z" fill="#ef4444"/>
            </motion.g>
            {/* Action Force on Water */}
            <motion.g initial={{ x: 80 }} animate={{ x: 40 }} transition={{ duration: 2, ease: 'linear', delay: 0.5 }}>
                 <path d="M 0 30 L -20 30" stroke={waterColor} strokeWidth="2" />
                 <path d="M -20 30 L -15 26 L -15 34 Z" fill={waterColor}/>
                 <path d="M 0 70 L -20 70" stroke={waterColor} strokeWidth="2" />
                 <path d="M -20 70 L -15 66 L -15 74 Z" fill={waterColor}/>
            </motion.g>
        </motion.svg>
    );
};

const BirdAnimation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const birdColor = isDarkMode ? '#cbd5e1' : '#475569';
    return (
        <motion.svg viewBox="0 0 200 100" key="bird">
            {/* Bird */}
            <g transform="translate(100, 50)">
                <motion.path d="M -20 0 C -10 -20, 10 -20, 20 0" stroke={birdColor} strokeWidth="3" fill="none"
                 animate={{ d: ["M -20 0 C -10 -20, 10 -20, 20 0", "M -20 0 C -10 10, 10 10, 20 0"] }}
                 transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }} />
                <motion.path d="M -40 0 C -30 -20, -20 -20, -10 0" stroke={birdColor} strokeWidth="3" fill="none"
                 animate={{ d: ["M -40 0 C -30 -20, -20 -20, -10 0", "M -40 0 C -30 10, -20 10, -10 0"] }}
                 transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }} />
            </g>
            {/* Downward force on air */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}>
                <path d="M 65 60 L 65 75" stroke="#60a5fa" strokeWidth="2" />
                <path d="M 65 75 L 61 70 L 69 70 Z" fill="#60a5fa"/>
                <path d="M 135 60 L 135 75" stroke="#60a5fa" strokeWidth="2" />
                <path d="M 135 75 L 131 70 L 139 70 Z" fill="#60a5fa"/>
            </motion.g>
            {/* Upward force on bird */}
             <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}>
                <path d="M 100 40 L 100 25" stroke="#ef4444" strokeWidth="3" />
                <path d="M 100 25 L 96 30 L 104 30 Z" fill="#ef4444"/>
            </motion.g>
        </motion.svg>
    );
};


// --- DATA for the carousel ---
const examples: Example[] = [
    { id: 'jumping', title: 'Jumping Up', description: "When you jump, your legs push down on the Earth (action). The Earth pushes up on you with an equal force (reaction), launching you into the air.", AnimationComponent: JumpingAnimation },
    { id: 'swimming', title: 'Swimming Forward', description: "A swimmer pushes the water backward (action). The water pushes the swimmer forward with an equal and opposite force (reaction).", AnimationComponent: SwimmingAnimation },
    { id: 'bird', title: 'A Bird in Flight', description: "A bird's wings push air downwards (action). The air pushes the bird's wings upwards (reaction), providing the lift needed to fly.", AnimationComponent: BirdAnimation },
];


export default function NewtonsThirdLawSlide3() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % examples.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);

    const currentExample = examples[currentIndex];
    const { AnimationComponent } = currentExample;
    
    const variants = {
        enter: { x: 300, opacity: 0 }, center: { x: 0, opacity: 1 }, exit: { x: -300, opacity: 0 },
    };

    return (
        <SlideComponentWrapper
            slideId="n3-examples"
            slideTitle="The Third Law in Action"
            moduleId="force-and-laws"
            submoduleId="newtons-third-law"
            interactions={localInteractions}
        >
            <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                    
                    {/* --- Left Column: Explanations --- */}
                    <div className="space-y-6 flex flex-col justify-center">
                        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                            <h3 className="text-2xl font-bold mb-4 text-blue-500">The World in Pairs</h3>
                            <p className="text-lg leading-relaxed">
                                Newton's Third Law governs every interaction, from the launch of a rocket to the way we walk. Here are a few common examples of action-reaction pairs.
                            </p>
                        </div>
                        
                        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg min-h-[12rem]`}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} >
                                    <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">{currentExample.title}</h3>
                                    <p className="text-lg leading-relaxed">{currentExample.description}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    
                    {/* --- Right Column: Interactive Carousel --- */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className={`relative w-full h-64 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg flex items-center justify-center overflow-hidden`}>
                            <AnimatePresence initial={false}>
                                <motion.div key={currentIndex} variants={variants} initial="enter" animate="center" exit="exit"
                                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                    className="absolute w-full h-full flex items-center justify-center">
                                    <AnimationComponent isDarkMode={isDarkMode} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <motion.button onClick={handlePrev} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Prev</motion.button>
                            <div className="text-sm text-slate-500">{currentIndex + 1} / {examples.length}</div>
                            <motion.button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Next</motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </SlideComponentWrapper>
    );
}