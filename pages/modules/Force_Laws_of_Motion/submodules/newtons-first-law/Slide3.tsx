 import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- INTERACTIVE ANIMATION: TUG OF WAR ---
const TugOfWarAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [teamA, setTeamA] = useState(2);
    const [teamB, setTeamB] = useState(2);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const blockX = useMotionValue(200);
    const FORCE_PER_PLAYER = 25;

    const netForce = (teamB - teamA) * FORCE_PER_PLAYER;
    
    // Theme-based colors
    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const teamAColor = '#3b82f6'; // Blue
    const teamBColor = '#ef4444'; // Red

    const runAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const endX = 200 + netForce * 1.5; // Scale the movement
        animate(blockX, endX, {
            type: 'spring',
            damping: 15,
            stiffness: 100,
            onComplete: () => setIsAnimating(false)
        });
    };

    const handleReset = () => {
        blockX.stop();
        setIsAnimating(false);
        setTeamA(2);
        setTeamB(2);
        blockX.set(200);
    };
    
    const Player = ({ color, x, y }: { color: string, x: number, y: number }) => (
        <g transform={`translate(${x}, ${y})`}>
            <circle cx="0" cy="-5" r="5" fill={color} />
            <line x1="0" y1="0" x2="0" y2="10" stroke={color} strokeWidth="2" />
            <line x1="0" y1="5" x2="-5" y2="2" stroke={color} strokeWidth="2" />
            <line x1="0" y1="5" x2="5" y2="2" stroke={color} strokeWidth="2" />
            <line x1="0" y1="10" x2="-5" y2="15" stroke={color} strokeWidth="2" />
            <line x1="0" y1="10" x2="5" y2="15" stroke={color} strokeWidth="2" />
        </g>
    );

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Tug of War</h3>
            <div className="relative w-full h-48 flex-grow flex flex-col justify-center">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    {/* Players */}
                    {Array.from({ length: teamA }).map((_, i) => <Player key={`a${i}`} color={teamAColor} x={110 - i * 20} y={70} />)}
                    {Array.from({ length: teamB }).map((_, i) => <Player key={`b${i}`} color={teamBColor} x={290 + i * 20} y={70} />)}
                    
                    {/* Block and Ropes */}
                    <motion.g style={{ x: blockX }}>
                        <rect x="-20" y="60" width="40" height="20" rx="3" fill={textColor} />
                        <line x1="-20" y1="70" x2={-100} y2="70" stroke={textColor} strokeWidth="2" />
                        <line x1="20" y1="70" x2={200} y2="70" stroke={textColor} strokeWidth="2" />

                        {/* Force Vectors */}
                        <AnimatePresence>
                        {isAnimating && (
                            <>
                                <motion.g initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} style={{ transformOrigin: 'right' }}>
                                    <path d={`M -25 50 L ${-25 - teamA * FORCE_PER_PLAYER} 50`} stroke={teamAColor} strokeWidth="3" />
                                    <path d={`M ${-25 - teamA * FORCE_PER_PLAYER} 50 L ${-30 - teamA * FORCE_PER_PLAYER} 46 L ${-30 - teamA * FORCE_PER_PLAYER} 54 Z`} fill={teamAColor}/>
                                </motion.g>
                                <motion.g initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} style={{ transformOrigin: 'left' }}>
                                    <path d={`M 25 50 L ${25 + teamB * FORCE_PER_PLAYER} 50`} stroke={teamBColor} strokeWidth="3" />
                                    <path d={`M ${25 + teamB * FORCE_PER_PLAYER} 50 L ${20 + teamB * FORCE_PER_PLAYER} 46 L ${20 + teamB * FORCE_PER_PLAYER} 54 Z`} fill={teamBColor}/>
                                </motion.g>
                            </>
                        )}
                        </AnimatePresence>
                    </motion.g>
                </svg>
            </div>
            <div className="flex justify-around items-center text-center mt-2">
                <div>
                    <p className="font-bold" style={{ color: teamAColor }}>Team A</p>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setTeamA(v => Math.max(v - 1, 0))} className="px-2 rounded bg-slate-200 dark:bg-slate-700">-</button>
                        <span className="font-mono text-lg w-4">{teamA}</span>
                        <button onClick={() => setTeamA(v => Math.min(v + 1, 5))} className="px-2 rounded bg-slate-200 dark:bg-slate-700">+</button>
                    </div>
                </div>
                <div>
                    <p className="font-bold" style={{ color: teamBColor }}>Team B</p>
                     <div className="flex items-center space-x-2">
                        <button onClick={() => setTeamB(v => Math.max(v - 1, 0))} className="px-2 rounded bg-slate-200 dark:bg-slate-700">-</button>
                        <span className="font-mono text-lg w-4">{teamB}</span>
                        <button onClick={() => setTeamB(v => Math.min(v + 1, 5))} className="px-2 rounded bg-slate-200 dark:bg-slate-700">+</button>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>PULL!</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};

export default function NewtonsFirstLawSlide3() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);

    const questions = [
        { id: 'force-q1', question: 'A book is sitting motionless on a table. The forces on the book are...', options: ['Balanced', 'Unbalanced', 'Zero', 'Positive'], correctAnswer: 'Balanced', explanation: 'Correct! The downward force of gravity is perfectly cancelled by the upward push of the table, so the net force is zero and the forces are balanced.' },
        { id: 'force-q2', question: 'A rocket is accelerating upwards into space. The forces on the rocket are...', options: ['Balanced', 'Unbalanced', 'Negative', 'Constant'], correctAnswer: 'Unbalanced', explanation: 'Exactly! The upward thrust is greater than the downward pull of gravity, resulting in a non-zero net force that causes the rocket to accelerate.' },
        { id: 'force-q3', question: 'A car drives at a constant 60 mph on a straight highway. The forces on the car are...', options: ['Balanced', 'Unbalanced', 'Only Engine Force', 'Only Friction'], correctAnswer: 'Balanced', explanation: 'This is a tricky one, but you got it! To maintain a constant velocity, the forward push from the engine must perfectly balance the opposing forces of air resistance and friction. The net force is zero.' }
    ];

    const isQuizComplete = currentQuestionIndex >= questions.length;
    const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
    const handleNextQuestion = () => { setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length) setCurrentQuestionIndex(prev => prev + 1); };

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">Net Force (ΣF)</h3>
                        <p className="text-lg leading-relaxed">The <strong>Net Force</strong> is the overall force acting on an object once all individual forces are combined. It's the sum of all pushes and pulls.</p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Balanced Forces (ΣF = 0)</h3>
                        <p className="text-lg leading-relaxed">When forces are balanced, they cancel each other out. The net force is zero, and there is <strong>no change in motion</strong>. The object remains in equilibrium (at rest or in uniform motion).</p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Unbalanced Forces (ΣF ≠ 0)</h3>
                        <p className="text-lg leading-relaxed">When forces are unbalanced, there is a net force in one direction. This non-zero net force is what causes an object to <strong>accelerate</strong> (change its velocity).</p>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <TugOfWarAnimation isDarkMode={isDarkMode} />
                    </div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Check Your Understanding</h3><div className="text-lg text-slate-600 dark:text-slate-400">{isQuizComplete ? questions.length : currentQuestionIndex + 1}/{questions.length}</div></div>
                        {!isQuizComplete ? (<> <p className="text-lg mb-6 min-h-[4rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base ${showFeedback && selectedAnswer === option ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700`}><div className="font-bold mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Not Quite...'}</div><div>{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></>) : (<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4"><div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Great Job!</div><div className="text-lg">You scored {score} out of {questions.length}</div></motion.div>)}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n1-forces"
            slideTitle="Balanced vs. Unbalanced Forces"
            moduleId="force-and-laws"
            submoduleId="newtons-first-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}