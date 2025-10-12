import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// --- SVG ICONS for examples ---
const WalkingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 21v-7l-4 4-4-4v7"/><circle cx="12" cy="4" r="2"/><path d="m15 22-3-3-3 3"/><path d="M9 14l-2-2 3-3 2 2"/></svg>
);
const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
);


// --- INTERACTIVE ROCKET SIMULATION ---
const RocketSimulation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [isIgnited, setIsIgnited] = useState(false);
    const rocketX = useMotionValue(150);
    const gasX = useMotionValue(130);
    const gasOpacity = useMotionValue(0);
    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const forceColor = isDarkMode ? '#fde047' : '#f59e0b';

    const runAnimation = () => {
        if (isIgnited) return;
        setIsIgnited(true);
        gasOpacity.set(1);
        animate(gasX, -100, { duration: 2, ease: 'linear' });
        animate(gasOpacity, 0, { duration: 2, ease: 'easeIn' });
        animate(rocketX, 300, { duration: 2.5, ease: 'easeIn' });
    };
    const handleReset = () => {
        rocketX.stop();
        gasX.stop();
        gasOpacity.stop();
        setIsIgnited(false);
        rocketX.set(150);
        gasX.set(130);
        gasOpacity.set(0);
    };
    const RocketBody = () => (
        <g>
            <path d="M 0 -30 L 15 10 L -15 10 Z" fill={textColor} />
            <rect x="-15" y="10" width="30" height="20" fill={textColor} />
            <path d="M -15 30 L -25 40 L -5 30 Z" fill={isDarkMode ? '#64748b' : '#94a3b8'} />
            <path d="M 15 30 L 25 40 L 5 30 Z" fill={isDarkMode ? '#64748b' : '#94a3b8'} />
        </g>
    );
    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Rocket Propulsion</h3>
            <div className="relative w-full h-56 flex-grow flex flex-col justify-center bg-black/10 dark:bg-black/20 rounded-lg">
                <svg viewBox="0 0 400 150" className="w-full h-full">
                    <circle cx="80" cy="30" r="1" fill={textColor} opacity="0.7" />
                    <circle cx="320" cy="110" r="1.5" fill={textColor} opacity="0.8" />
                    <circle cx="150" cy="90" r="1" fill={textColor} opacity="0.6" />
                    <circle cx="250" cy="40" r="1.2" fill={textColor} opacity="0.9" />
                    <motion.g style={{ x: rocketX, y: 75 }}><RocketBody /></motion.g>
                    <motion.g style={{ x: gasX, y: 75, opacity: gasOpacity }}>
                        <circle cx="0" cy="35" r="5" fill="#f97316" />
                        <circle cx="-10" cy="45" r="3" fill="#fb923c" />
                        <circle cx="10" cy="40" r="4" fill="#fbbf24" />
                    </motion.g>
                    <AnimatePresence>
                        {isIgnited && (
                             <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <g>
                                    <path d="M 140 115 L 80 115" stroke={forceColor} strokeWidth="2.5" />
                                    <path d="M 80 115 L 90 110 L 90 120 Z" fill={forceColor}/>
                                    <text x="110" y="135" textAnchor="middle" fill={forceColor} fontSize="12">Force of Rocket on Gas</text>
                                    <text x="110" y="105" textAnchor="middle" fill={forceColor} fontSize="14" fontWeight="bold">Action</text>
                                </g>
                                <g>
                                    <path d="M 160 45 L 220 45" stroke={forceColor} strokeWidth="2.5" />
                                    <path d="M 220 45 L 210 40 L 210 50 Z" fill={forceColor}/>
                                    <text x="190" y="25" textAnchor="middle" fill={forceColor} fontSize="12">Force of Gas on Rocket</text>
                                    <text x="190" y="10" textAnchor="middle" fill={forceColor} fontSize="14" fontWeight="bold">Reaction</text>
                                </g>
                            </motion.g>
                        )}
                    </AnimatePresence>
                </svg>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isIgnited} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isIgnited ? 1.05 : 1}} whileTap={{ scale: !isIgnited ? 0.95 : 1 }}>Ignite</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};


// --- INTERACTIVE QUIZ COMPONENT ---
const QuizComponent = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const correctAnswer = 'C';

    const handleAnswer = (option: string) => {
        setSelectedAnswer(option);
        setShowFeedback(true);
    };

    const getButtonClass = (option: string) => {
        if (!showFeedback) return 'bg-slate-600 hover:bg-slate-700';
        if (option === correctAnswer) return 'bg-green-600';
        if (option === selectedAnswer) return 'bg-red-600';
        return 'bg-slate-500 opacity-70';
    };

    return (
        <div className="mt-6">
            <h3 className="text-xl font-bold text-blue-500 mb-2">Check Your Understanding</h3>
            <p className="mb-4">A small car and a large truck collide. During the collision, the force that the truck exerts on the car is:</p>
            <div className="space-y-2">
                {['Greater than', 'Less than', 'Equal to'].map((text, index) => {
                    const option = String.fromCharCode(65 + index); // A, B, C
                    return (
                        <button key={option} onClick={() => handleAnswer(option)} disabled={showFeedback}
                                className={`w-full text-left p-3 rounded-lg text-white transition-colors duration-300 ${getButtonClass(option)}`}>
                            {option}) {text} the force the car exerts on the truck.
                        </button>
                    )
                })}
            </div>
            <AnimatePresence>
            {showFeedback && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 rounded-lg bg-black/20">
                    {selectedAnswer === correctAnswer ? (
                        <p className="text-green-400 font-semibold">Correct! The interaction forces are always equal in magnitude. The difference in damage comes from the difference in mass and structure, not the force.</p>
                    ) : (
                        <p className="text-red-400 font-semibold">Not quite. Remember Newton's Third Law: for every action, there is an equal and opposite reaction. The forces are always an equal pair.</p>
                    )}
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    )
}


// --- MAIN SLIDE COMPONENT ---
export default function NewtonsThirdLawSlide1() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} overflow-y-auto`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">Newton's Third Law</h3>
                        <p className="text-2xl italic leading-relaxed text-center">
                           "For every action, there is an equal and opposite reaction."
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Action-Reaction Pairs</h3>
                        <p className="leading-relaxed">
                            This means that forces always come in pairs. You can't have a single, isolated force. These force pairs are:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li><strong>Equal</strong> in magnitude (strength).</li>
                            <li><strong>Opposite</strong> in direction.</li>
                            <li>Acting on <strong>different objects</strong>.</li>
                        </ul>
                        <div className="mt-4 text-center bg-black/10 dark:bg-black/20 p-2 rounded-md">
                            <BlockMath>{`\\vec{F}_{A \\text{ on } B} = - \\vec{F}_{B \\text{ on } A}`}</BlockMath>
                        </div>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Everyday Examples</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <WalkingIcon />
                                <div>
                                    <strong>Walking:</strong>
                                    <br/><span className="text-sm"><b>Action:</b> Your foot pushes the ground backward.</span>
                                    <br/><span className="text-sm"><b>Reaction:</b> The ground pushes your foot forward.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <BookIcon />
                                <div>
                                    <strong>A Book on a Table:</strong>
                                    <br/><span className="text-sm"><b>Action:</b> The book's weight pushes down on the table.</span>
                                    <br/><span className="text-sm"><b>Reaction:</b> The table pushes up on the book (Normal Force).</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-amber-900/40' : 'bg-amber-500/10'} rounded-xl p-6 shadow-lg`}>
                         <h3 className="text-xl font-semibold mb-2 text-amber-600 dark:text-amber-400">The Crucial Question: Why Do Things Move?</h3>
                         <p className="mb-3">
                            A common confusion is: If the forces are equal and opposite, why don't they cancel out? Why does the rocket move?
                         </p>
                         <div className="p-4 bg-black/10 dark:bg-black/20 rounded-lg">
                            <p className="font-semibold text-center text-slate-800 dark:text-slate-200">
                                Because the forces act on <strong className="text-amber-600 dark:text-amber-400">DIFFERENT</strong> objects!
                            </p>
                         </div>
                         <p className="mt-3">
                            You only consider canceling forces when they act on the *same* object. Here, one force is on the rocket, the other is on the gas. To see why they move differently, we need Newton's Second Law (<InlineMath>{`F=ma`}</InlineMath>). The forces (<InlineMath>{`F`}</InlineMath>) are equal, but the masses (<InlineMath>{`m`}</InlineMath>) are not!
                         </p>
                         <p className="mt-2 font-mono text-center p-2 rounded bg-slate-500/20">
                            small mass (<InlineMath>{`m_{\\text{gas}}`}</InlineMath>) = BIG acceleration (<InlineMath>{`a = F/m`}</InlineMath>)
                            <br/>
                            BIG mass (<InlineMath>{`M_{\\text{rocket}}`}</InlineMath>) = small acceleration (<InlineMath>{`a = F/M`}</InlineMath>)
                         </p>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Elements --- */}
                <div className="flex flex-col space-y-6">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <RocketSimulation isDarkMode={isDarkMode} />
                    </div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <QuizComponent />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n3-action-reaction"
            slideTitle="Action-Reaction Pairs"
            moduleId="force-and-laws"
            submoduleId="newtons-third-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}