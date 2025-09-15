import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Type Definitions ---
type NumberType = 'Rational' | 'Irrational';
type NumberObject = { label: string; type: NumberType; value: number | string };

// --- Data for the interactive part ---
const numberPalette: NumberObject[] = [
    { label: '5', type: 'Rational', value: 5 },
    { label: '\\sqrt{2}', type: 'Irrational', value: 'sqrt(2)' },
    { label: '-\\sqrt{2}', type: 'Irrational', value: '-sqrt(2)' },
    { label: '\\pi', type: 'Irrational', value: 'pi' },
];

// --- Main Slide Component ---
export default function SumOfIrrationalsIntroSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();
    const [slot1, setSlot1] = useState<NumberObject | null>(null);
    const [slot2, setSlot2] = useState<NumberObject | null>(null);

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const handleSelect = (num: NumberObject) => {
        if (!slot1) setSlot1(num);
        else if (!slot2) setSlot2(num);
    };

    const handleReset = () => {
        setSlot1(null);
        setSlot2(null);
    };

    const getResult = () => {
        if (!slot1 || !slot2) return { text: '?', type: '' };

        if (slot1.type === 'Rational' && slot2.type === 'Rational') {
            return { text: 'Rational', type: 'Predictable' };
        }
        if (slot1.type !== slot2.type) {
            return { text: 'Always Irrational', type: 'Predictable' };
        }
        // Both are irrational
        if (slot1.value === 'sqrt(2)' && slot2.value === '-sqrt(2)') {
            return { text: '0 (Rational)', type: 'Wild Card!' };
        }
        return { text: 'Irrational', type: 'Wild Card!' };
    };

    const result = getResult();

    const slideInteractions: Interaction[] = [
        { id: 'sum-of-irrationals-intro', conceptId: 'sum-of-irrationals', conceptName: 'Introduction to Sum of Irrationals', type: 'learning', description: 'Learning how irrational numbers behave under addition.' },
        // FIX: Changed 'exploration' to 'learning' to match the expected InteractionType
        { id: 'sum-builder-interaction', conceptId: 'sum-of-irrationals', conceptName: 'Sum of Irrationals Builder', type: 'learning', description: 'Interactively building sums to see the outcome.' }
    ];

    const slideContent = (
        <div className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left Panel: Theory */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Sum of Irrational Numbers</h2>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Scenario 1: Rational + Irrational</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            When you add a rational number to an irrational number, the result is <strong className="font-semibold">always irrational</strong>. The rational number can't cancel out the infinite, non-repeating decimal of the irrational one.
                        </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Scenario 2: Irrational + Irrational</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            This case is a <strong className="font-semibold">wild card</strong>. The sum can be rational if the irrational parts cancel out (e.g., <InlineMath>\sqrt{2} + (-\sqrt{2}) = 0</InlineMath>), but it's usually irrational (e.g., <InlineMath>\sqrt{2} + \pi</InlineMath>).
                        </p>
                    </div>
                </div>
                
                {/* Right Panel: Interactive Builder */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md flex flex-col">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Equation Builder</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Select two numbers from the palette to see their sum.</p>
                    
                    <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center">
                        {/* Equation Display */}
                        <div className="flex items-center justify-center text-3xl font-bold mb-6">
                            <AnimatePresence>
                                <motion.div className={`w-28 h-16 flex items-center justify-center rounded-lg ${slot1 ? 'bg-slate-200 dark:bg-slate-700' : 'bg-slate-300 dark:bg-slate-600 border-2 border-dashed'}`}>
                                    {slot1 && <motion.span initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}}><InlineMath>{slot1.label}</InlineMath></motion.span>}
                                </motion.div>
                            </AnimatePresence>
                            <span className="mx-4 text-slate-500">+</span>
                            <AnimatePresence>
                                <motion.div className={`w-28 h-16 flex items-center justify-center rounded-lg ${slot2 ? 'bg-slate-200 dark:bg-slate-700' : 'bg-slate-300 dark:bg-slate-600 border-2 border-dashed'}`}>
                                    {slot2 && <motion.span initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}}><InlineMath>{slot2.label}</InlineMath></motion.span>}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Result Display */}
                        {slot1 && slot2 && (
                             <AnimatePresence>
                                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="text-center">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{result.type}</p>
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{result.text}</p>
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-center font-semibold text-slate-600 dark:text-slate-400 mb-2">Number Palette</p>
                        <div className="flex justify-center gap-2">
                            {numberPalette.map(num => (
                                <button
                                    key={num.label}
                                    onClick={() => handleSelect(num)}
                                    disabled={!!(slot1 && slot2)}
                                    className="px-4 py-2 text-lg font-bold rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <InlineMath>{num.label}</InlineMath>
                                </button>
                            ))}
                             <button onClick={handleReset} className="px-4 py-2 font-bold rounded-lg bg-slate-500 text-white hover:bg-slate-600">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="sum-of-irrationals-intro"
            slideTitle="Introduction to Sum of Irrational Numbers"
            moduleId="irrational-numbers"
            submoduleId="operations" // Assuming a submoduleId
            interactions={localInteractions}
        >
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
            <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
                {slideContent}
            </TrackedInteraction>
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}