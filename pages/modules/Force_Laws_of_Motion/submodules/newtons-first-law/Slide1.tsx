import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS for this animation ---
type Scenario = {
  id: string;
  mass: number;
  label: string;
  startX: number;
};

type ForceSetting = {
    force: number;
    endX: number;
    duration: number;
};

// --- DATA for the animation ---
const scenarios: Scenario[] = [
  { id: 'ball', mass: 1, label: 'Small Ball (Low Inertia)', startX: 50 },
  { id: 'boulder', mass: 10, label: 'Boulder (High Inertia)', startX: 50 },
];

const forceSettings: Record<string, ForceSetting> = {
    low: { force: 25, endX: 150, duration: 2.5 },
    high: { force: 100, endX: 350, duration: 2.5 },
};


// --- INTERACTIVE ANIMATION COMPONENT for INERTIA ---
const InertiaAnimation = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[0]);
    const [forceLevel, setForceLevel] = useState<'low' | 'high'>('low');
    const [isAnimating, setIsAnimating] = useState(false);
    
    const [showPredictionPrompt, setShowPredictionPrompt] = useState(false);
    const [observationText, setObservationText] = useState('');
    const objectX = useMotionValue(selectedScenario.startX);
    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const lineColor = isDarkMode ? '#64748b' : '#94a3b8';
    const forceColor = isDarkMode ? '#f87171' : '#ef4444'; // Red

    const runAnimation = () => {
        if (isAnimating) return;
        setShowPredictionPrompt(false);
        setIsAnimating(true);
        setObservationText('');
        objectX.set(selectedScenario.startX);
        const currentForce = forceSettings[forceLevel];
        const finalX = selectedScenario.startX + (currentForce.endX - selectedScenario.startX) / selectedScenario.mass;
        animate(objectX, finalX, { 
            duration: currentForce.duration, 
            ease: 'easeOut',
            onComplete: () => {
                setIsAnimating(false);
                if (selectedScenario.mass > 5 && forceLevel === 'low') {
                    setObservationText("Notice: The boulder's high inertia made it very resistant to the low force.");
                } else if (selectedScenario.mass < 5 && forceLevel === 'high') {
                    setObservationText("Notice: The ball's low inertia allowed it to be moved easily by the high force.");
                } else {
                     setObservationText("The object moved as predicted by Newton's Laws!");
                }
            }
        });
    };
    const handleReset = () => {
        objectX.stop();
        setIsAnimating(false);
        setObservationText('');
        setShowPredictionPrompt(false);
        objectX.set(selectedScenario.startX);
    };
    const handleScenarioChange = (scenario: Scenario) => {
        handleReset();
        setSelectedScenario(scenario);
    };
    const Ball = () => <circle cx="0" cy="0" r="20" fill={textColor} />;
    const Boulder = () => <path d="M -30 20 C -40 -20, 40 -30, 30 20 Z" fill={textColor} />;

    return (
        <div className="h-full flex flex-col relative">
            <AnimatePresence>
                {showPredictionPrompt && (
                    <motion.div 
                        className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <h4 className="text-xl font-bold text-white mb-4 text-center">What do you think will happen?</h4>
                        <p className="text-slate-300 text-center mb-6">Consider the object's mass and the applied force.</p>
                        <motion.button onClick={runAnimation} className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                           Run Simulation
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Push the Objects</h3>
            <div className="relative w-full h-48 flex-grow flex flex-col justify-center">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    <line x1="10" y1="80" x2="390" y2="80" stroke={lineColor} strokeWidth="1" strokeDasharray="4" />
                    <motion.g style={{ x: objectX, y: 60 }} initial={{ scale: 0 }} animate={{ scale: 1 }} key={selectedScenario.id}>
                        {selectedScenario.id === 'ball' ? <Ball /> : <Boulder />}
                    </motion.g>
                    {isAnimating && (
                        <motion.g style={{ x: objectX, y: 60 }}>
                            <path d={`M -50 0 L -30 0`} stroke={forceColor} strokeWidth="3" />
                            <path d="M -30 0 L -35 -4 L -35 4 z" fill={forceColor}/>
                            <text y="-5" x={-40} textAnchor="middle" fill={forceColor} fontSize="14">F</text>
                        </motion.g>
                    )}
                </svg>
            </div>
            <div className="text-center h-8 mt-2">
                 <p className="font-semibold text-blue-500">{selectedScenario.label}</p>
            </div>
            <div className="text-center h-12 mt-2 flex items-center justify-center px-4">
                 <AnimatePresence>
                    {observationText && (
                        <motion.p className="text-sm italic text-green-500 dark:text-green-400" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {observationText}
                        </motion.p>
                    )}
                 </AnimatePresence>
            </div>
            <div className="flex justify-center space-x-2 mb-4">
                {scenarios.map(s => (
                    <button key={s.id} onClick={() => handleScenarioChange(s)} className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedScenario.id === s.id ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{s.id === 'ball' ? 'Ball' : 'Boulder'}</button>
                ))}
            </div>
            <div className="flex items-center justify-center space-x-4 mt-2">
                <span className="text-sm font-medium">Force:</span>
                <button onClick={() => setForceLevel('low')} className={`px-3 py-1 text-sm rounded-full transition-colors ${forceLevel === 'low' ? 'bg-red-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Low</button>
                <button onClick={() => setForceLevel('high')} className={`px-3 py-1 text-sm rounded-full transition-colors ${forceLevel === 'high' ? 'bg-red-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>High</button>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={() => setShowPredictionPrompt(true)} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>Apply Force</motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Reset</motion.button>
            </div>
        </div>
    );
};

// --- NEW QUIZ COMPONENT ---
const QuizComponent = () => {
    const { isDarkMode } = useThemeContext();
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const question = {
        text: "An object's inertia depends primarily on its...",
        options: ["Speed", "Mass", "Color", "Weight"],
        correctAnswerIndex: 1,
    };
    const handleSelectOption = (index: number) => {
        if (isSubmitted) return;
        setSelectedOption(index);
    };
    const handleSubmit = () => {
        if (selectedOption === null) return;
        setIsSubmitted(true);
    };
    const isCorrect = selectedOption === question.correctAnswerIndex;

    return (
        <div className="w-full">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Quick Check</h3>
            <p className="mb-4 text-lg">{question.text}</p>
            <div className="space-y-3">
                {question.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrectAnswer = index === question.correctAnswerIndex;
                    let buttonClass = isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300';
                    if (isSelected && !isSubmitted) buttonClass = 'bg-blue-600 text-white';
                    if (isSubmitted && isCorrectAnswer) buttonClass = 'bg-green-600 text-white';
                    if (isSubmitted && isSelected && !isCorrectAnswer) buttonClass = 'bg-red-600 text-white';
                    return (
                        <button key={index} onClick={() => handleSelectOption(index)} className={`w-full text-left p-3 rounded-lg transition-colors text-base ${buttonClass}`} disabled={isSubmitted}>{option}</button>
                    );
                })}
            </div>
            <div className="mt-5 h-12 flex items-center">
                {!isSubmitted ? (
                    <motion.button onClick={handleSubmit} disabled={selectedOption === null} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: selectedOption !== null ? 1.05 : 1 }} whileTap={{ scale: selectedOption !== null ? 0.95 : 1 }}>Check Answer</motion.button>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {isCorrect ? (<p className="text-green-500 font-bold">Correct! Inertia is a measure of mass.</p>) : (<p className="text-red-500 font-bold">Not quite. Inertia is determined by an object's mass.</p>)}
                    </motion.div>
                )}
            </div>
        </div>
    );
};


export default function NewtonsFirstLawSlide1() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}><h3 className="text-2xl font-bold mb-4 text-blue-500">The Concept of Inertia</h3><p className="text-lg leading-relaxed mb-4">Inertia is the natural resistance of any physical object to a change in its state of motion. In simpler terms, it's the tendency of things to keep doing what they're already doing.</p></div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}><h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Inertia and Mass</h3><p className="text-lg leading-relaxed">The amount of inertia an object has depends on its mass. More mass means more inertia. This is why it's much harder to start pushing a heavy car than a light shopping cart.</p></div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}><h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Try it out!</h3><p className="text-lg leading-relaxed">Use the interactive animation to see this in action. Select an object and a force level, then click "Apply Force" to see how hard it is to change its motion.</p></div>
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}><h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Real-World Examples</h3><ul className="list-disc list-inside space-y-2 text-lg"><li>🚌 When a bus stops suddenly, your body continues to move forward due to its inertia.</li><li>🚗 Seatbelts provide an external force to counteract your body's inertia in a crash.</li><li>🍅 Shaking a ketchup bottle uses inertia to get the ketchup moving out of the bottle.</li></ul></div>
                </div>
                
                {/* --- Right Column: Interactive Elements --- */}
                {/* MODIFIED: Changed to flex-col and added space-y-8 to stack the cards */}
                <div className="flex flex-col items-center justify-start pt-8 md:pt-0 space-y-8">
                    {/* Card 1: Animation */}
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <InertiaAnimation isDarkMode={isDarkMode} />
                    </div>
                    {/* Card 2: Quiz */}
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <QuizComponent />
                    </div>
                </div>

            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n1-inertia"
            slideTitle="The Concept of Inertia"
            moduleId="force-and-laws"
            submoduleId="newtons-first-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}