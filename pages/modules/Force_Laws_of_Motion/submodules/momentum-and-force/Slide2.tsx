import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // CORRECTED LINE
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- TYPE DEFINITIONS & DATA for the calculator ---
type ObjectType = 'runner' | 'bowlingBall' | 'car';

type ObjectData = {
    name: string;
    minMass: number; maxMass: number; defaultMass: number;
    minV: number; maxV: number; defaultV: number;
    SvgComponent: React.FC<{ isDarkMode: boolean, mass: number }>;
};

// --- SVG Components for Objects ---
const RunnerIcon: React.FC<{ mass: number }> = ({ mass }) => (
    <g transform={`scale(${0.8 + (mass - 50) / 50 * 0.2})`}>
        <circle cx="0" cy="-20" r="8" />
        <path d="M 0 -12 L 0 10 L -10 25 M 0 10 L 10 25 M -8 -5 L -20 5 M 8 -5 L 20 5" strokeWidth="4" strokeLinecap="round" fill="none" />
    </g>
);
const BowlingBallIcon: React.FC<{ mass: number }> = ({ mass }) => (
    <circle cx="0" cy="0" r={15 + mass} />
);
const CarIcon: React.FC<{ mass: number }> = ({ mass }) => (
    <g transform={`scale(${0.8 + (mass - 1000) / 1500 * 0.2})`}>
        <path d="M -30 -5 L -20 -25 L 20 -25 L 30 -5 Z" />
        <rect x="-35" y="-5" width="70" height="20" rx="5" />
        <circle cx="-20" cy="15" r="8" fill="#333" />
        <circle cx="20" cy="15" r="8" fill="#333" />
    </g>
);

const objectData: Record<ObjectType, ObjectData> = {
    runner: { name: "Runner", minMass: 50, maxMass: 100, defaultMass: 75, minV: 1, maxV: 10, defaultV: 7, SvgComponent: RunnerIcon },
    bowlingBall: { name: "Bowling Ball", minMass: 5, maxMass: 8, defaultMass: 7, minV: 1, maxV: 10, defaultV: 5, SvgComponent: BowlingBallIcon },
    car: { name: "Car", minMass: 1000, maxMass: 2500, defaultMass: 1500, minV: 5, maxV: 40, defaultV: 20, SvgComponent: CarIcon },
};

// --- MAIN INTERACTIVE COMPONENT ---
const MomentumCalculator = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [objectType, setObjectType] = useState<ObjectType>('runner');
    const [mass, setMass] = useState(objectData.runner.defaultMass);
    const [velocity, setVelocity] = useState(objectData.runner.defaultV);

    const currentObject = objectData[objectType];
    const { SvgComponent } = currentObject;

    const momentum = useMemo(() => mass * velocity, [mass, velocity]);

    const handleObjectChange = (type: ObjectType) => {
        setObjectType(type);
        setMass(objectData[type].defaultMass);
        setVelocity(objectData[type].defaultV);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-center space-x-2 mb-6">
                {Object.entries(objectData).map(([key, data]) => (
                    <button key={key} onClick={() => handleObjectChange(key as ObjectType)}
                     className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${objectType === key ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                        {data.name}
                    </button>
                ))}
            </div>
            
            <div className="relative w-full h-40 flex-grow flex items-center justify-center bg-slate-200/50 dark:bg-black/20 rounded-lg overflow-hidden">
                <svg viewBox="-50 -50 100 100" className="w-40 h-40">
                    <motion.g fill={isDarkMode ? '#cbd5e1' : '#475569'} stroke={isDarkMode ? '#cbd5e1' : '#475569'}>
                        <SvgComponent isDarkMode={isDarkMode} mass={mass} />
                    </motion.g>
                </svg>
                {/* Speed Lines */}
                <AnimatePresence>
                <motion.div className="absolute left-0 top-1/2 w-full"
                    key={velocity} initial={{ opacity: 0 }} animate={{ opacity: velocity / currentObject.maxV }} >
                    {[...Array(3)].map((_, i) => (
                        <motion.div key={i} className={`h-1 my-3 rounded-full ${isDarkMode ? 'bg-slate-400' : 'bg-slate-500'}`}
                         style={{ width: `${velocity * 2 + i * 10}%`, marginLeft: `${i*5}%` }} />
                    ))}
                </motion.div>
                </AnimatePresence>
            </div>

            <div className={`mt-6 p-4 rounded-lg font-mono text-xl md:text-3xl text-center break-words ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <InlineMath>{`p = ${mass.toFixed(1)}\\,kg \\cdot ${velocity.toFixed(1)}\\,m/s = ${momentum.toFixed(1)}\\,kg\\cdot m/s`}</InlineMath>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-6">
                 <div>
                    <label className="text-sm font-semibold">Mass (m): {mass.toFixed(1)} kg</label>
                    <input type="range" min={currentObject.minMass} max={currentObject.maxMass} value={mass} 
                     onChange={e => setMass(Number(e.target.value))} className="w-full"/>
                </div>
                 <div>
                    <label className="text-sm font-semibold">Velocity (v): {velocity.toFixed(1)} m/s</label>
                    <input type="range" min={currentObject.minV} max={currentObject.maxV} value={velocity}
                     onChange={e => setVelocity(Number(e.target.value))} className="w-full"/>
                </div>
            </div>
        </div>
    );
};

export default function MomentumForceSlide2() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full flex justify-center ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="w-full max-w-3xl p-8 flex flex-col justify-center">
                 <div className="text-center mb-6">
                     <h3 className="text-2xl font-bold text-blue-500">Momentum Calculator</h3>
                     <p className="text-slate-500">Choose an object and adjust its properties to see how its momentum changes.</p>
                </div>
                <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
                    <MomentumCalculator isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="mf-momentum-calc"
            slideTitle="Calculating Momentum (p=mv)"
            moduleId="force-and-laws"
            submoduleId="momentum-and-force"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}