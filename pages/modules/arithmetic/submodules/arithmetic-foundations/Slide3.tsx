import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function SubtractionSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    // --- State for the interactive animation ---
    const [problem, setProblem] = useState({ start: 5, subtract: 2 });
    const [isSubtracted, setIsSubtracted] = useState(false);

    const generateNewProblem = () => {
        const startNum = Math.floor(Math.random() * 4) + 5; // Random start from 5 to 8
        const subtractNum = Math.floor(Math.random() * (startNum - 2)) + 1; // Subtract a smaller number
        setProblem({ start: startNum, subtract: subtractNum });
        setIsSubtracted(false);
    };

    // Randomize the first problem when the slide loads
    useEffect(() => {
        generateNewProblem();
    }, []);

    const slideInteractions: Interaction[] = [
        { id: 'subtraction-intro-concept', conceptId: 'subtraction', conceptName: 'Introduction to Subtraction', type: 'learning', description: 'Learning the basic concept of subtraction as taking away.' },
        { id: 'subtraction-playground-game', conceptId: 'subtraction', conceptName: 'Subtraction Playground', type: 'learning', description: 'Interactive game to visualize subtraction.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Super Subtraction (-)</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Taking Things Away</h3>
                    <p className="text-slate-600 dark:text-slate-400">Subtraction is what we do when we take things away from a group and want to know "how many are left?".</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Hopping Backwards</h3>
                    <p className="text-slate-600 dark:text-slate-400">On the number line, subtraction is like taking hops backwards. To solve "5 - 2", you start at 5 and take 2 hops back to land on 3!</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const result = problem.start - problem.subtract;
        const items = Array.from({ length: problem.start }, (_, i) => ({ id: i }));

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Subtraction Playground</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Watch the items disappear!</p>
    
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between items-center min-h-[250px] relative">
                    <div className="w-full text-center text-3xl font-bold text-slate-500 dark:text-slate-400">
                        {problem.start} - {problem.subtract} = {isSubtracted ? <span className="text-blue-600 dark:text-blue-400">{result}</span> : '?'}
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-2 my-4">
                        <AnimatePresence>
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ 
                                    scale: 1, 
                                    opacity: (isSubtracted && index >= result) ? 0.2 : 1 
                                }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className={`w-10 h-10 rounded-full transition-colors ${isSubtracted && index >= result ? 'bg-slate-300 dark:bg-slate-700' : 'bg-blue-500'}`} />
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>

                    <div className="w-full">
                        {!isSubtracted ? (
                            <button onClick={() => setIsSubtracted(true)} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                                Subtract
                            </button>
                        ) : (
                            <button onClick={generateNewProblem} className="w-full px-6 py-3 rounded-lg font-bold text-white bg-slate-600 hover:bg-slate-700">
                                Try Another!
                            </button>
                        )}
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
            slideId="arithmetic-subtraction"
            slideTitle="Super Subtraction: Taking Things Away"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}