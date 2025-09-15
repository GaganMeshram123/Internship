import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- Data for the Interactive Decimal Explorer ---
const numbersToExplore = [
    { id: 'one-eighth', label: '\\frac{1}{8}', value: '0.125', type: 'Rational (Terminates)' },
    { id: 'four-elevenths', label: '\\frac{4}{11}', value: '0.363636...', type: 'Rational (Repeats)' },
    { id: 'pi', label: '\\pi', value: '3.14159265...', type: 'Irrational' },
    { id: 'sqrt2', label: '\\sqrt{2}', value: '1.41421356...', type: 'Irrational' },
];

// --- Child Component for the Decimal Explorer ---
const DecimalExplorer: React.FC = () => {
    const [selectedNumber, setSelectedNumber] = useState(numbersToExplore[0]);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">The Decimal Clue 🕵️</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Click a number to see its decimal form. Notice the difference between rational and irrational numbers.</p>
            
            <div className="flex justify-center gap-2 sm:gap-4 mb-6">
                {numbersToExplore.map(num => (
                    <button
                        key={num.id}
                        onClick={() => setSelectedNumber(num)}
                        className={`px-4 py-2 text-lg font-bold rounded-lg transition-all ${
                            selectedNumber.id === num.id 
                                ? 'bg-blue-600 text-white scale-110 shadow-lg' 
                                : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                        }`}
                    >
                        <InlineMath>{num.label}</InlineMath>
                    </button>
                ))}
            </div>

            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 text-center min-h-[100px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedNumber.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <p className="text-2xl text-slate-800 dark:text-slate-200 break-words">{selectedNumber.value}</p>
                        <p className={`mt-2 text-sm font-semibold ${selectedNumber.type === 'Irrational' ? 'text-purple-500' : 'text-green-600'}`}>
                            {selectedNumber.type}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- Main Introduction Slide Component ---
export default function IntroductionSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();
    
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideInteractions: Interaction[] = [{
        id: 'irrational-intro-explorer',
        conceptId: 'what-are-irrationals',
        conceptName: 'Introduction to Irrational Numbers',
        type: 'learning',
        description: 'Exploring the difference between rational and irrational decimals.'
    }];

    const slideContent = (
        <div className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Left Panel: Core Concepts */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">What Are Irrational Numbers?</h2>

                    {/* Inner Container for Definition */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            An irrational number is any real number that cannot be expressed as a simple fraction (a number in the form <InlineMath>p/q</InlineMath>).
                        </p>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            While rational numbers have decimals that either end or repeat, irrational numbers have decimals that go on forever without any repeating pattern.
                        </p>
                    </div>

                    {/* NEW: Inner Container for the Analogy */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm mb-6">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-3">An Intuitive Analogy: Digital vs. Analog</h3>
                        <div className="space-y-4">
                            <div>
                                <strong className="text-slate-700 dark:text-slate-300">Rational Numbers are like a Digital Clock.</strong>
                                <p className="text-slate-600 dark:text-slate-400">They are precise and countable. The time jumps from 10:01 to 10:02. There is a clear, definable "next" step. They can always be written down completely.</p>
                            </div>
                            <div>
                                <strong className="text-slate-700 dark:text-slate-300">Irrational Numbers are like an Analog Clock.</strong>
                                <p className="text-slate-600 dark:text-slate-400">The second hand sweeps smoothly and continuously. It flows through every possible moment, hitting countless points between the second-marks that we can't precisely name with a simple fraction.</p>
                            </div>
                        </div>
                    </div>

                    {/* Inner Container for History */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                         <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">An Ancient Discovery</h3>
                         <p className="text-slate-600 dark:text-slate-400">
                            The first irrational number discovered was likely <InlineMath>\sqrt{2}</InlineMath>, the diagonal of a 1x1 square. This shattered the ancient Greek belief that all numbers could be described by simple fractions.
                         </p>
                    </div>
                </div>

                {/* Right Panel: Interactive Explorer */}
                <DecimalExplorer />
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="introduction-to-irrationals"
            slideTitle="What Are Irrational Numbers?"
            moduleId="irrational-numbers"
            submoduleId="introduction"
            interactions={localInteractions}
        >
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}