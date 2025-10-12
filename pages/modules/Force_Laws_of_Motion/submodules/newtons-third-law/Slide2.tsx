import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- TYPE DEFINITIONS & ICONS (No Changes) ---
type View = 'all' | 'box' | 'person';
type TextAnchor = 'middle' | 'start' | 'end' | 'inherit';
const EarthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4 text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const AppleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-4 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path><path d="M10 2c1 .5 2 2 2 5"></path></svg>;

// --- INTERACTIVE SIMULATION (With Readability Changes) ---
const ObjectIsolationSimulation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [view, setView] = useState<View>('all');
    const [isPushing, setIsPushing] = useState(false);
    const personX = useMotionValue(100);
    const boxX = useMotionValue(200);

    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const actionColor = '#3b82f6';
    const reactionColor = '#ef4444';
    const frictionColor = '#f97316';
    const gravityColor = '#16a34a';

    const runAnimation = () => { if (!isPushing) { setIsPushing(true); animate(boxX, 300, { duration: 1.5, ease: 'easeOut' }); } };
    const handleReset = () => { personX.stop(); boxX.stop(); setIsPushing(false); personX.set(100); boxX.set(200); };

    const Person = () => ( <g> <circle cx="0" cy="-5" r="10" fill={textColor} /> <rect x="-5" y="5" width="10" height="30" fill={textColor} /> </g> );
    const Box = () => <rect x="-30" y="0" width="60" height="40" fill={textColor} rx="5" />;

    const descriptions: Record<View, React.ReactNode> = {
        all: "Action (blue) and Reaction (red) forces act on different objects.",
        box: <span>The push force is greater than friction, so the <strong className="text-blue-400">Net Force on the box is positive</strong>, and it accelerates.</span>,
        person: <span>The ground's friction pushes the person forward, opposing the box's push. The person <strong className="text-red-400">doesn't accelerate backward</strong>.</span>
    };
    
    // --- CHANGE: Added font-semibold and slightly larger font size to labels ---
    const ForceArrow = ({ d, fill, label, x, y, anchor="middle" }: { d: string, fill: string, label: string, x: number, y: number, anchor?: TextAnchor }) => (
        <g>
            <path d={d.split(' L ')[0] + ' L ' + d.split(' L ')[1]} stroke={fill} strokeWidth="2.5" markerEnd={`url(#arrowhead-${fill.slice(1)})`}/>
            <text x={x} y={y} textAnchor={anchor} fontSize="11" fill={fill} className="font-semibold">{label}</text>
        </g>
    );

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Isolate The Objects (Free-Body Diagram)</h3>
            <div className="relative w-full h-56 flex-grow flex flex-col justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg">
                 <svg viewBox="0 0 400 120" className="w-full h-full">
                    <defs>
                        <marker id={`arrowhead-${actionColor.slice(1)}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={actionColor} /></marker>
                        <marker id={`arrowhead-${reactionColor.slice(1)}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={reactionColor} /></marker>
                        <marker id={`arrowhead-${frictionColor.slice(1)}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={frictionColor} /></marker>
                        <marker id={`arrowhead-${gravityColor.slice(1)}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={gravityColor} /></marker>
                    </defs>
                    <line x1="10" y1="90" x2="390" y2="90" stroke={isDarkMode ? '#64748b' : '#94a3b8'} strokeWidth="1" />
                    <motion.g style={{ x: personX, y: 50 }} animate={{ opacity: view === 'box' ? 0.2 : 1 }}><Person /></motion.g>
                    <motion.g style={{ x: boxX, y: 50 }} animate={{ opacity: view === 'person' ? 0.2 : 1 }}><Box /></motion.g>
                    <AnimatePresence>
                        {isPushing && (
                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <motion.g style={{ x: boxX }} animate={{ opacity: view === 'person' ? 0 : 1 }}>
                                    <ForceArrow d="M -50 30 L -100 30" fill={actionColor} label="F(person)" x={-75} y={22} />
                                    <ForceArrow d="M 10 88 L 40 88" fill={frictionColor} label="f(friction)" x={25} y={105} />
                                    <ForceArrow d="M 0 50 L 0 80" fill={gravityColor} label="W" x={-5} y={70} anchor="end" />
                                    <ForceArrow d="M 0 -2 L 0 -32" fill={gravityColor} label="F(N)" x={-5} y={-10} anchor="end" />
                                </motion.g>
                                <motion.g style={{ x: personX }} animate={{ opacity: view === 'box' ? 0 : 1 }}>
                                     <ForceArrow d="M 20 0 L 70 0" fill={reactionColor} label="F(box)" x={45} y={-8} />
                                     <ForceArrow d="M -30 88 L -80 88" fill={frictionColor} label="f(ground)" x={-55} y={105} />
                                     <ForceArrow d="M 0 40 L 0 70" fill={gravityColor} label="W" x={5} y={60} anchor="start" />
                                     <ForceArrow d="M 0 -20 L 0 -50" fill={gravityColor} label="F(N)" x={5} y={-30} anchor="start" />
                                </motion.g>
                            </motion.g>
                        )}
                    </AnimatePresence>
                </svg>
            </div>
            <div className="text-center h-16 mt-2 p-2 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.p key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-semibold text-sm md:text-base">
                        {descriptions[view]}
                    </motion.p>
                </AnimatePresence>
            </div>
            <div className="flex items-center justify-center space-x-2 mt-4">
                <button onClick={() => setView('all')} className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${view === 'all' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-300 dark:bg-slate-600'}`}>Show All</button>
                <button onClick={() => setView('box')} className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${view === 'box' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-300 dark:bg-slate-600'}`}>Isolate Box</button>
                <button onClick={() => setView('person')} className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${view === 'person' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-300 dark:bg-slate-600'}`}>Isolate Person</button>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-2">
                <motion.button onClick={runAnimation} disabled={isPushing} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isPushing ? 1.05 : 1}} whileTap={{ scale: !isPushing ? 0.95 : 1 }}>Push</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};

// --- INTERACTIVE QUIZ COMPONENT (With UI Polish) ---
const QuizComponent = () => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const correctAnswer = 'C';
    const handleAnswer = (option: string) => { setSelectedAnswer(option); setShowFeedback(true); };
    
    // --- CHANGE: Added icons and clearer class names ---
    const getButtonClass = (option: string) => {
        if (!showFeedback) return 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600';
        if (option === correctAnswer) return 'bg-green-500/30 text-green-700 dark:text-green-300 border-2 border-green-500';
        if (option === selectedAnswer) return 'bg-red-500/30 text-red-700 dark:text-red-300 border-2 border-red-500';
        return 'bg-slate-200 dark:bg-slate-700 opacity-60';
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Check Your Understanding</h3>
            <p className="mb-4">A rifle fires a bullet. The force the rifle exerts on the bullet is...</p>
            <div className="space-y-3">
                {['Greater than', 'Less than', 'Exactly the same as'].map((text, index) => {
                    const option = String.fromCharCode(65 + index);
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === correctAnswer;
                    return (
                        <button key={option} onClick={() => handleAnswer(option)} disabled={showFeedback}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center justify-between font-semibold ${getButtonClass(option)}`}>
                            <span>{option}) {text} the force the bullet exerts on the rifle.</span>
                            {/* --- CHANGE: Added icons for instant feedback --- */}
                            {showFeedback && isSelected && !isCorrect && <span className="text-xl text-red-500">✗</span>}
                            {showFeedback && isCorrect && <span className="text-xl text-green-500">✓</span>}
                        </button>
                    )
                })}
            </div>
            <AnimatePresence>
            {showFeedback && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-lg bg-slate-200/50 dark:bg-black/20">
                    <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200">Explanation</h4>
                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                        {selectedAnswer === correctAnswer ?
                         "Correct! Newton's Third Law guarantees the forces in an interaction pair are always equal in magnitude. The bullet accelerates massively due to its small mass, while the rifle just 'kicks' back."
                         :
                         "Not quite. A core principle of Newton's Third Law is that the forces in an action-reaction pair are always equal in magnitude, even if the objects' masses and resulting accelerations are vastly different."
                        }
                    </p>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    )
}

// --- MAIN SLIDE COMPONENT ---
export default function NewtonsThirdLawSlide2() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} overflow-y-auto`}>
            {/* --- CHANGE: This grid structure is the key to the layout fix. It creates two independent columns. --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">The Common Confusion</h3>
                        <p className="text-xl italic">"If the forces are equal and opposite, why don't they cancel out? Why does anything move?"</p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Answer: Different Objects</h3>
                        <p className="text-lg leading-relaxed">An action-reaction pair can <strong>never</strong> cancel because the two forces act on <strong>two different objects</strong>.</p>
                        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <p className="font-semibold text-center">Forces can only cancel if they act on the <em className="text-blue-500">same</em> object.</p>
                        </div>
                    </div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">It's Universal: Non-Contact Forces</h3>
                        <p className="mb-4">This law applies to all forces, like gravity.</p>
                        <div className="flex items-center"><AppleIcon /> <div><strong>Action:</strong> The Earth's gravity pulls the apple down.</div></div>
                        <div className="flex items-center mt-2"><EarthIcon/> <div><strong>Reaction:</strong> The apple's gravity pulls the Earth up.</div></div>
                         <p className="mt-4 text-sm p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                           The forces are equal, but since the Earth's mass is enormous, its acceleration (<InlineMath>{`a=F/M_{Earth}`}</InlineMath>) is practically zero. We only see the apple fall.
                        </p>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Elements --- */}
                {/* --- CHANGE: Re-ordered Quiz and Simulation for better visual balance --- */}
                <div className="space-y-6 flex flex-col">
                     <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <QuizComponent />
                    </div>
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