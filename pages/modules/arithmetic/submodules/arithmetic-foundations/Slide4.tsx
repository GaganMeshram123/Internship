import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function MultiplicationSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    // --- State for the interactive animation ---
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(4);

    const slideInteractions: Interaction[] = [
        { id: 'multiplication-intro-concept', conceptId: 'multiplication', conceptName: 'Introduction to Multiplication', type: 'learning', description: 'Learning the basic concept of multiplication as repeated addition.' },
        { id: 'multiplication-array-builder', conceptId: 'multiplication', conceptName: 'Array Builder', type: 'learning', description: 'Interactive game to visualize multiplication as arrays.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Amazing Multiplication (×)</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Adding in Groups</h3>
                    <p className="text-slate-600 dark:text-slate-400">Multiplication is a fast way of adding the same number over and over. "3 times 4" is the same as saying "3 groups of 4."</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Awesome Arrays</h3>
                    <p className="text-slate-600 dark:text-slate-400">We can visualize multiplication by making an array (a grid). An array with 3 rows and 4 columns shows that 3 × 4 equals 12.</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const items = Array.from({ length: rows * cols });

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Array Builder</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Use the sliders to build an array!</p>
    
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-center items-center min-h-[250px] relative">
                    <div 
                        className="grid gap-2 mb-4"
                        style={{
                            gridTemplateRows: `repeat(${rows}, 1fr)`,
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        }}
                    >
                        <AnimatePresence>
                            {items.map((_, i) => (
                                <motion.div
                                    key={i}
                                    layout
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-6 h-6 bg-blue-500 rounded-full" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    <p className="text-3xl font-bold text-slate-600 dark:text-slate-300">{rows} × {cols} = {rows * cols}</p>
                </div>

                <div className="mt-4 space-y-4">
                    <div>
                        <label className="font-medium text-slate-700 dark:text-slate-300">Rows: {rows}</label>
                        <input
                            type="range" min="1" max="5" value={rows}
                            onChange={(e) => setRows(Number(e.target.value))}
                            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 mt-1"
                        />
                    </div>
                    <div>
                        <label className="font-medium text-slate-700 dark:text-slate-300">Columns: {cols}</label>
                        <input
                            type="range" min="1" max="5" value={cols}
                            onChange={(e) => setCols(Number(e.target.value))}
                            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 mt-1"
                        />
                    </div>
                </div>
            </div>
        );
    };

    const slideContent = (
        <div className={`min-h-screen p-4 sm:p-8`}>
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
            slideId="arithmetic-multiplication"
            slideTitle="Amazing Multiplication: Adding in Groups"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}