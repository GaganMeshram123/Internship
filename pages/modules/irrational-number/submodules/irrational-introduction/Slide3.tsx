import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Data for the slide ---
const irrationalNumbers = [
    { name: '\\sqrt{2}', value: '1.4142135623' },
    { name: '\\pi', value: '3.1415926535' },
    { name: 'e', value: '2.7182818284' },
    { name: '\\phi', value: '1.6180339887' },
];

// --- Main Slide Component ---
export default function ExamplesOfIrrationalsSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [
        { id: 'irrational-examples-content', conceptId: 'irrational-examples', conceptName: 'Examples of Irrational Numbers', type: 'learning', description: 'Learning about the different types of irrational numbers.' },
        { id: 'irrational-decimal-expander', conceptId: 'irrational-zoom', conceptName: 'Expanding an Irrational Decimal', type: 'learning', description: 'Interactively revealing more digits of an irrational number.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    // --- State for the interactive visualization ---
    const [selectedNumber, setSelectedNumber] = useState(irrationalNumbers[0]);
    const [decimalPlaces, setDecimalPlaces] = useState(3);

    const handleNumberSelect = (num: typeof irrationalNumbers[0]) => {
        setSelectedNumber(num);
        setDecimalPlaces(3); // Reset decimal places on new number selection
    };
    
    // --- Child Components for better structure ---

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col gap-6">
            <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Square Roots of Non-Perfect Squares</h3>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <p className="text-slate-600 dark:text-slate-400">The most common irrationals are roots that don't simplify to a whole number, like <InlineMath math="\sqrt{2}" /> or <InlineMath math="\sqrt{3}" />. Be careful: <InlineMath math="\sqrt{9}" /> is rational because it equals 3!</p>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Famous Mathematical Constants</h3>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <p className="text-slate-600 dark:text-slate-400">Some of the most important numbers in the universe are irrational, including <InlineMath math="\pi" /> (for circles), <InlineMath math="e" /> (for growth), and <InlineMath math="\phi" /> (the Golden Ratio).</p>
                </div>
            </div>
             <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Constructed Irrationals</h3>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <p className="text-slate-600 dark:text-slate-400">You can even design numbers to be irrational by creating a decimal that never repeats, like <InlineMath math="0.1010010001..." /></p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Decimal Expander</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Select a number and reveal its endless, non-repeating decimal expansion.</p>

            <div className="flex justify-center items-center gap-2 sm:gap-4 mb-4">
                {irrationalNumbers.map((num) => (
                    <button
                        key={num.name}
                        onClick={() => handleNumberSelect(num)}
                        className={`w-14 h-14 rounded-full transition-all text-xl font-bold flex items-center justify-center shadow-md ${selectedNumber.name === num.name ? 'bg-blue-600 text-white scale-110' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'}`}
                    >
                        <InlineMath math={num.name} />
                    </button>
                ))}
            </div>

            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center text-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={selectedNumber.name + decimalPlaces}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-4xl font-mono font-bold text-blue-600 dark:text-blue-400"
                    >
                        {selectedNumber.value.substring(0, 2 + decimalPlaces)}...
                    </motion.p>
                </AnimatePresence>
            </div>
            
            <div className="mt-4 flex justify-center gap-4">
                <button onClick={() => setDecimalPlaces(z => Math.max(1, z - 1))} disabled={decimalPlaces <= 1} className="px-5 py-2 rounded-lg font-bold text-white bg-slate-500 hover:bg-slate-600 disabled:opacity-40 transition-colors">Show Fewer Digits</button>
                <button onClick={() => setDecimalPlaces(z => Math.min(10, z + 1))} disabled={decimalPlaces >= 10} className="px-5 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 transition-colors">Reveal More Digits</button>
            </div>
        </div>
    );

    const slideContent = (
        <div className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
            {/* The repeating h2 heading has been removed from here */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                    <LeftTheoryPanel />
                </TrackedInteraction>
                <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
                    <RightInteractionPanel />
                </TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="examples-of-irrationals"
            slideTitle="Examples of Irrational Numbers"
            moduleId="irrational-numbers"
            submoduleId="introduction"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}