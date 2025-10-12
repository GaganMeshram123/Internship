import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- TYPE DEFINITIONS for this component ---
type Example = {
    id: string;
    title: string;
    description: React.ReactNode;
    AnimationComponent: React.FC<{ isDarkMode: boolean }>;
};

// --- ICONS ---
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// --- ENHANCED MINI-ANIMATION COMPONENTS ---
const JumpingAnimation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const personColor = isDarkMode ? '#e2e8f0' : '#475569';
    const actionColor = '#ef4444'; // Red
    const reactionColor = '#3b82f6'; // Blue

    return (
        <motion.svg viewBox="0 0 200 120" key="jumping" className="w-full h-full">
            <line x1="0" y1="110" x2="200" y2="110" stroke={isDarkMode ? '#475569' : '#94a3b8'} strokeWidth="2" />
            
            {/* Person Crouching and Jumping */}
            <motion.g 
                initial={{ y: 20, scaleY: 1 }}
                animate={{ y: [20, 40, -40, 20], scaleY: [1, 0.8, 1.2, 1] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            >
                <circle cx="100" cy="50" r="10" fill={personColor} />
                <rect x="95" y="60" width="10" height="30" fill={personColor} />
            </motion.g>

            {/* Forces appearing during the push phase */}
            <motion.g 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, times: [0, 0.25, 0.5], repeat: Infinity, repeatDelay: 2 }}
            >
                {/* Reaction: Earth pushes on Person */}
                <path d="M 100 108 L 100 80" stroke={reactionColor} strokeWidth="3" markerEnd="url(#arrow-blue)" />
                <text x="105" y="90" fontSize="10" fill={reactionColor} className="font-bold">Reaction</text>
                
                {/* Action: Person pushes on Earth */}
                <path d="M 100 112 L 100 140" stroke={actionColor} strokeWidth="3" markerEnd="url(#arrow-red)" />
                <text x="105" y="130" fontSize="10" fill={actionColor} className="font-bold">Action</text>
            </motion.g>
        </motion.svg>
    );
};

const SwimmingAnimation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const swimmerColor = isDarkMode ? '#e2e8f0' : '#475569';
    const actionColor = '#ef4444'; // Red
    const reactionColor = '#3b82f6'; // Blue
    const waterColor = isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(147, 197, 253, 0.4)';

    return (
        <motion.svg viewBox="0 0 200 100" key="swimming" className="w-full h-full">
            <rect width="200" height="100" fill={waterColor} />

            {/* Swimmer moving forward */}
            <motion.g
                initial={{ x: 0 }}
                animate={{ x: 60 }}
                transition={{ duration: 3, ease: 'linear', repeat: Infinity, repeatDelay: 1 }}
            >
                <circle cx="100" cy="50" r="8" fill={swimmerColor} />
                <rect x="60" y="45" width="40" height="10" fill={swimmerColor} rx="5" />
            </motion.g>

            {/* Water being pushed backward */}
            <motion.g
                initial={{ opacity: 0, x: 70 }}
                animate={{ opacity: [0, 1, 0], x: 40 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2.5 }}
            >
                <path d="M0 40 L -10 40" stroke={actionColor} strokeWidth="2" markerEnd="url(#arrow-red)" />
                <path d="M0 60 L -10 60" stroke={actionColor} strokeWidth="2" markerEnd="url(#arrow-red)" />
                <text x={-35} y={54} fontSize="10" fill={actionColor} className="font-bold">Action</text>
            </motion.g>

            {/* Reaction force on swimmer */}
             <motion.g
                initial={{ opacity: 0, x: 85 }}
                animate={{ opacity: [0, 1, 0], x: 145 }}
                transition={{ duration: 3, ease: 'linear', repeat: Infinity, repeatDelay: 1 }}
            >
                <path d="M0 50 L 20 50" stroke={reactionColor} strokeWidth="3" markerEnd="url(#arrow-blue)" />
                 <text x={-35} y={54} fontSize="10" fill={reactionColor} className="font-bold">Reaction</text>
            </motion.g>
        </motion.svg>
    );
};

const CannonAnimation: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
    const cannonColor = isDarkMode ? '#94a3b8' : '#475569';
    const actionColor = '#ef4444'; // Red
    const reactionColor = '#3b82f6'; // Blue

    return (
        <motion.svg viewBox="0 0 200 100" key="cannon" className="w-full h-full">
             <line x1="0" y1="90" x2="200" y2="90" stroke={isDarkMode ? '#475569' : '#94a3b8'} strokeWidth="2" />
            {/* Cannon Recoiling */}
            <motion.g 
                initial={{ x: 0 }}
                animate={{ x: [0, -15, 0] }}
                transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 2 }}
            >
                <rect x="40" y="70" width="20" height="20" fill={cannonColor} />
                <rect x="50" y="55" width="40" height="15" fill={cannonColor} transform="rotate(-10 60 70)" />
            </motion.g>

            {/* Cannonball Firing */}
            <motion.g
                initial={{ x: 80, y: 55, opacity: 1 }}
                animate={{ x: 250, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeIn", repeat: Infinity, repeatDelay: 2.5 }}
            >
                <circle r="8" fill={isDarkMode ? '#e2e8f0' : '#1e293b'} />
            </motion.g>

            {/* Forces */}
            <motion.g
                 initial={{ opacity: 0 }}
                 animate={{ opacity: [0, 1, 0] }}
                 transition={{ duration: 1, times: [0, 0.2, 0.8], repeat: Infinity, repeatDelay: 3 }}
            >
                {/* Reaction: on Cannon */}
                <path d="M 60 65 L 20 65" stroke={reactionColor} strokeWidth="3" markerEnd="url(#arrow-blue)" />
                <text y="60" x="35" textAnchor="middle" fontSize="10" fill={reactionColor} className="font-bold">Reaction</text>

                {/* Action: on Cannonball */}
                <path d="M 90 55 L 130 55" stroke={actionColor} strokeWidth="3" markerEnd="url(#arrow-red)" />
                <text y="50" x="110" textAnchor="middle" fontSize="10" fill={actionColor} className="font-bold">Action</text>
            </motion.g>
        </motion.svg>
    );
};

const SummaryComponent: React.FC<{}> = () => {
    return (
        <div className="text-center p-4">
            <CheckCircleIcon />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Key Takeaways</h3>
            <ul className="list-disc list-inside text-left mt-4 space-y-2 text-lg">
                <li>Forces always come in <strong className="text-blue-500">pairs</strong>.</li>
                <li>The paired forces are always <strong className="text-green-500">equal</strong> in strength.</li>
                <li>They are always <strong className="text-yellow-500">opposite</strong> in direction.</li>
                <li>They always act on <strong className="text-red-500">different</strong> objects.</li>
            </ul>
        </div>
    );
};

// --- DATA for the carousel ---
const examples: Example[] = [
    { id: 'jumping', title: 'Jumping Up', description: "When you jump, your legs push down on the Earth (action). The Earth pushes up on you with an equal force (reaction), launching you into the air.", AnimationComponent: JumpingAnimation },
    { id: 'swimming', title: 'Swimming Forward', description: "A swimmer pushes the water backward (action). The water pushes the swimmer forward with an equal and opposite force (reaction).", AnimationComponent: SwimmingAnimation },
    { id: 'cannon', title: 'Cannon Firing', description: <span>When a cannon fires, it exerts a forward force on the ball (<strong>action</strong>). The ball exerts an equal backward force on the cannon (<strong>reaction</strong>). Since <InlineMath>{`a = F/m`}</InlineMath>, the low-mass ball gets a huge acceleration, while the massive cannon only recoils slightly.</span>, AnimationComponent: CannonAnimation },
    { id: 'summary', title: 'Summary', description: "Let's review the core principles of Newton's Third Law.", AnimationComponent: SummaryComponent },
];


export default function NewtonsThirdLawSlide3() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, examples.length - 1));
    const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

    const currentExample = examples[currentIndex];
    const { AnimationComponent } = currentExample;
    
    return (
        <SlideComponentWrapper
            slideId="n3-examples"
            slideTitle="The Third Law in Action"
            moduleId="force-and-laws"
            submoduleId="newtons-third-law"
            interactions={localInteractions}
        >
            <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} p-8`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto max-w-7xl h-full">
                    
                    {/* --- Left Column: Interactive Navigation & Descriptions --- */}
                    <div className="space-y-6 flex flex-col justify-center">
                        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                            <h3 className="text-2xl font-bold mb-4 text-blue-500">The World in Pairs</h3>
                             {examples.map((example, index) => (
                                <div key={example.id}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${currentIndex === index ? 'bg-blue-600/20' : 'hover:bg-slate-500/10'}`}
                                >
                                    <h4 className={`font-bold ${currentIndex === index ? 'text-blue-400' : ''}`}>{index + 1}. {example.title}</h4>
                                </div>
                             ))}
                        </div>
                        
                        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg min-h-[14rem] flex flex-col justify-center`}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} >
                                    <p className="text-lg leading-relaxed">{currentExample.description}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    
                    {/* --- Right Column: Interactive Carousel --- */}
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className={`relative w-full h-80 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg flex items-center justify-center overflow-hidden`}>
                             {/* Shared Arrowhead Definitions */}
                             <svg className="absolute w-0 h-0">
                                <defs>
                                    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/></marker>
                                    <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/></marker>
                                </defs>
                            </svg>
                            <AnimatePresence mode="wait">
                                <motion.div key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full flex items-center justify-center p-4">
                                    <AnimationComponent isDarkMode={isDarkMode} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                            <motion.div
                                className="bg-blue-600 h-2.5 rounded-full"
                                animate={{ width: `${((currentIndex + 1) / examples.length) * 100}%` }}
                                transition={{ ease: "easeInOut", duration: 0.5 }}
                            />
                        </div>

                        <div className="flex items-center justify-center space-x-4 w-full">
                            <motion.button onClick={handlePrev} disabled={currentIndex === 0} className="bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 disabled:dark:bg-slate-700 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Prev</motion.button>
                            <div className="font-bold text-slate-600 dark:text-slate-400">{currentIndex + 1} / {examples.length}</div>
                            <motion.button onClick={handleNext} disabled={currentIndex === examples.length - 1} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:dark:bg-blue-800 disabled:opacity-50 text-white font-bold px-6 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                {currentIndex === examples.length - 2 ? 'Summary' : 'Next'}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </SlideComponentWrapper>
    );
}