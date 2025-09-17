import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Main Slide Component ---
export default function CountingSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();

    // --- State for the interactive counting game ---
    const [item, setItem] = useState({ emoji: '🍎', count: 3 });
    const [options, setOptions] = useState([2, 3, 4, 1]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleAnswer = (answer: number) => {
        if (selectedAnswer !== null) return; // Prevent answering more than once

        const correct = answer === item.count;
        setSelectedAnswer(answer);
        setIsCorrect(correct);
    };

    const handleNext = () => {
        const newItemCount = Math.floor(Math.random() * 4) + 2; // New count between 2 and 5
        const emojis = ['🍎', '⭐', '🚗', '🐶'];
        const newEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Create new options
        const newOptions = new Set<number>();
        newOptions.add(newItemCount);
        while (newOptions.size < 4) {
            newOptions.add(Math.floor(Math.random() * 8) + 1);
        }

        setItem({ emoji: newEmoji, count: newItemCount });
        setOptions(Array.from(newOptions).sort(() => Math.random() - 0.5));
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    const slideInteractions: Interaction[] = [
        { id: 'arithmetic-counting-concept', conceptId: 'counting', conceptName: 'Counting and Numbers', type: 'learning', description: 'Learning the basics of counting by matching quantities to numerals.' },
        { id: 'arithmetic-counting-game', conceptId: 'counting', conceptName: 'Counting Game', type: 'judging', description: 'Interactive game to practice counting objects.' }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">What Are Numbers?</h2>
            <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Counting is Matching</h3>
                    <p className="text-slate-600 dark:text-slate-400">A number is just a name for a group of things. The number 3 is the label we give to a group of three apples.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">The Number Line Adventure</h3>
                    <p className="text-slate-600 dark:text-slate-400">Imagine a path with a stepping stone for every number. Counting is just like hopping from one stone to the next!</p>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Let's Count!</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">How many items do you see?</p>

            <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex items-center justify-center">
                <div className="flex flex-wrap justify-center gap-4">
                    {Array.from({ length: item.count }).map((_, index) => (
                        <motion.span 
                            key={index}
                            className="text-6xl"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {item.emoji}
                        </motion.span>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <div className="grid grid-cols-4 gap-4">
                    {options.map((num) => {
                        let buttonClass = "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300";
                        if (selectedAnswer !== null) {
                            if (num === item.count) {
                                buttonClass = "bg-green-500 text-white"; // Correct answer
                            } else if (num === selectedAnswer) {
                                buttonClass = "bg-red-500 text-white"; // Incorrect selection
                            }
                        }
                        return (
                            <button
                                key={num}
                                onClick={() => handleAnswer(num)}
                                disabled={selectedAnswer !== null}
                                className={`p-4 rounded-lg text-2xl font-bold transition-colors ${buttonClass}`}
                            >
                                {num}
                            </button>
                        );
                    })}
                </div>
                <AnimatePresence>
                {isCorrect !== null && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mt-4"
                    >
                        <p className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? 'Great job!' : 'Not quite, try the next one!'}
                        </p>
                        <button onClick={handleNext} className="mt-2 px-6 py-2 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700">
                            Next
                        </button>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    );

    const slideContent = (
        <div className="min-h-screen p-4 sm:p-8">
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
            slideId="arithmetic-counting"
            slideTitle="Getting Started: What Are Numbers?"
            moduleId="arithmetic"
            submoduleId="arithmetic-foundations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}