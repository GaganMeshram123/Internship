import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/Themed';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- INTERACTIVE SIMULATION 1: DIRECT PROPORTIONALITY ---
const DirectProportionalitySim = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [force, setForce] = useState(50);
    const MASS_CONSTANT = 10; // kg
    const acceleration = force / MASS_CONSTANT;

    return (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Direct Proportionality</h3>
            <p className="text-sm mb-4 text-slate-500 dark:text-slate-400">
                With constant mass (<InlineMath>{'m = 10 \\, kg'}</InlineMath>), acceleration is directly proportional to force (<InlineMath>{'a \\propto F'}</InlineMath>).
            </p>
            
            <div className="flex justify-around items-end h-32 my-4">
                {/* Force Bar */}
                <div className="w-16 flex flex-col items-center">
                    <motion.div 
                        className="w-full bg-red-500 rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${force}%` }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    />
                    <p className="text-sm font-bold mt-2 text-red-500">Force</p>
                </div>
                {/* Acceleration Bar */}
                <div className="w-16 flex flex-col items-center">
                     <motion.div 
                        className="w-full bg-blue-500 rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${acceleration * 10}%` }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    />
                    <p className="text-sm font-bold mt-2 text-blue-500">Accel.</p>
                </div>
            </div>

            <div>
                <label className="text-sm">Force: {force.toFixed(0)} N</label>
                <input type="range" min="1" max="100" value={force} onChange={e => setForce(Number(e.target.value))} className="w-full h-2 bg-red-200 dark:bg-red-900 rounded-lg appearance-none cursor-pointer"/>
            </div>
             <p className="text-center font-mono mt-2 text-lg">a = {acceleration.toFixed(2)} m/s²</p>
        </div>
    );
};

// --- INTERACTIVE SIMULATION 2: INVERSE PROPORTIONALITY ---
const InverseProportionalitySim = ({ isDarkMode }: { isDarkMode: boolean }) => {
    const [mass, setMass] = useState(10);
    const FORCE_CONSTANT = 50; // Newtons
    const acceleration = FORCE_CONSTANT / mass;

    return (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Inverse Proportionality</h3>
            <p className="text-sm mb-4 text-slate-500 dark:text-slate-400">
                With constant force (<InlineMath>{'F = 50 \\, N'}</InlineMath>), acceleration is inversely proportional to mass (<InlineMath>{'a \\propto 1/m'}</InlineMath>).
            </p>
            
             <div className="flex justify-around items-end h-32 my-4">
                {/* Mass Bar */}
                <div className="w-16 flex flex-col items-center">
                    <motion.div 
                        className="w-full bg-slate-500 rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${(mass / 20) * 100}%` }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    />
                    <p className="text-sm font-bold mt-2 text-slate-500">Mass</p>
                </div>
                {/* Acceleration Bar */}
                <div className="w-16 flex flex-col items-center">
                     <motion.div 
                        className="w-full bg-blue-500 rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${(acceleration / 50) * 100}%` }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    />
                    <p className="text-sm font-bold mt-2 text-blue-500">Accel.</p>
                </div>
            </div>

            <div>
                <label className="text-sm">Mass: {mass.toFixed(0)} kg</label>
                <input type="range" min="1" max="20" value={mass} onChange={e => setMass(Number(e.target.value))} className="w-full h-2 bg-slate-400 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"/>
            </div>
            <p className="text-center font-mono mt-2 text-lg">a = {acceleration.toFixed(2)} m/s²</p>
        </div>
    );
};

export default function NewtonsSecondLawSlide3() {
    const { isDarkMode } = useThemeContext();
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});

    const slideContent = (
        <div className={`w-full h-full ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl h-full">
                
                {/* --- Left Column: Explanations --- */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-2xl font-bold mb-4 text-blue-500">Unpacking F=ma</h3>
                        <p className="text-lg leading-relaxed">
                           The equation <InlineMath>{'a = F_{net}/m'}</InlineMath> reveals two fundamental relationships in nature. Understanding them is key to mastering the Second Law.
                        </p>
                    </div>
                    
                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">1. Direct Proportionality</h3>
                        <p className="text-lg leading-relaxed">
                           Acceleration is <strong>directly proportional</strong> to net force.
                        </p>
                        <div className="mt-2 p-3 text-center bg-slate-100 dark:bg-slate-700 rounded-lg">
                           <p className="font-semibold">This means if you double the net force on an object, you double its acceleration.</p>
                        </div>
                    </div>

                    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">2. Inverse Proportionality</h3>
                        <p className="text-lg leading-relaxed">
                           Acceleration is <strong>inversely proportional</strong> to mass.
                        </p>
                         <div className="mt-2 p-3 text-center bg-slate-100 dark:bg-slate-700 rounded-lg">
                           <p className="font-semibold">This means if you double the mass of an object, you only get half the acceleration for the same net force.</p>
                        </div>
                    </div>
                </div>
                
                {/* --- Right Column: Interactive Simulations --- */}
                <div className="flex flex-col justify-center space-y-6">
                    <DirectProportionalitySim isDarkMode={isDarkMode} />
                    <InverseProportionalitySim isDarkMode={isDarkMode} />
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="n2-proportionality"
            slideTitle="Proportionality in the Second Law"
            moduleId="force-and-laws"
            submoduleId="newtons-second-law"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}