import React, { useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
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

    const objectX = useMotionValue(selectedScenario.startX);
    
    // Theme-based colors
    const textColor = isDarkMode ? '#cbd5e1' : '#475569';
    const lineColor = isDarkMode ? '#64748b' : '#94a3b8';
    const forceColor = isDarkMode ? '#f87171' : '#ef4444'; // Red

    const runAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        objectX.set(selectedScenario.startX);
        
        const currentForce = forceSettings[forceLevel];
        // The acceleration is F/m. The distance traveled is related to acceleration.
        // We simulate this by adjusting the end position based on mass.
        const finalX = selectedScenario.startX + (currentForce.endX - selectedScenario.startX) / selectedScenario.mass;
        
        animate(objectX, finalX, { 
            duration: currentForce.duration, 
            ease: 'easeOut',
            onComplete: () => setIsAnimating(false)
        });
    };
    
    const handleReset = () => {
        objectX.stop();
        setIsAnimating(false);
        objectX.set(selectedScenario.startX);
    };

    const handleScenarioChange = (scenario: Scenario) => {
        handleReset();
        setSelectedScenario(scenario);
    };

    // SVG component for the Ball
    const Ball = () => <circle cx="0" cy="0" r="20" fill={textColor} />;
    
    // SVG component for the Boulder
    const Boulder = () => (
        <path d="M -30 20 C -40 -20, 40 -30, 30 20 Z" fill={textColor} />
    );

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold text-blue-500 mb-2">Push the Objects</h3>
            
            <div className="relative w-full h-48 flex-grow flex flex-col justify-center">
                <svg viewBox="0 0 400 100" className="w-full h-full">
                    <line x1="10" y1="80" x2="390" y2="80" stroke={lineColor} strokeWidth="1" strokeDasharray="4" />

                    <motion.g 
                        style={{ x: objectX, y: 60 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        key={selectedScenario.id}
                    >
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

            <div className="flex justify-center space-x-2 mb-4">
                {scenarios.map(s => (
                    <button key={s.id} onClick={() => handleScenarioChange(s)} className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedScenario.id === s.id ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                        {s.id === 'ball' ? 'Ball' : 'Boulder'}
                    </button>
                ))}
            </div>

             <div className="flex items-center justify-center space-x-4 mt-2">
                 <span className="text-sm font-medium">Force:</span>
                <button onClick={() => setForceLevel('low')} className={`px-3 py-1 text-sm rounded-full transition-colors ${forceLevel === 'low' ? 'bg-red-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>Low</button>
                <button onClick={() => setForceLevel('high')} className={`px-3 py-1 text-sm rounded-full transition-colors ${forceLevel === 'high' ? 'bg-red-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>High</button>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-4">
                <motion.button onClick={runAnimation} disabled={isAnimating} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: !isAnimating ? 1.05 : 1}} whileTap={{ scale: !isAnimating ? 0.95 : 1 }}>
                    Apply Force
                </motion.button>
                <motion.button onClick={handleReset} className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-4 py-2 text-sm rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Reset
                </motion.button>
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
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">The Concept of Inertia</h3>
                        <p className="text-lg leading-relaxed mb-4">
                            Inertia is the natural resistance of any physical object to a change in its state of motion. In simpler terms, it's the tendency of things to keep doing what they're already doing.
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Inertia and Mass</h3>
                        <p className="text-lg leading-relaxed">
                            The amount of inertia an object has depends on its mass. More mass means more inertia. This is why it's much harder to start pushing a heavy car than a light shopping cart.
                        </p>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Try it out!</h3>
                        <p className="text-lg leading-relaxed">
                          Use the interactive animation to see this in action. Select an object and a force level, then click "Apply Force" to see how hard it is to change its motion.
                        </p>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Animation --- */}
                <div className="flex items-center justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg w-full`}>
                        <InertiaAnimation isDarkMode={isDarkMode} />
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