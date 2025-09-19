import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

// --- Shape Data and SVG Components ---
const SHAPES = [
    {
        name: 'Triangle',
        properties: '3 sides & 3 corners',
        realWorld: 'Slice of pizza, a roof',
        component: (props: any) => <svg {...props} viewBox="0 0 100 100"><polygon points="50,10 95,90 5,90" /></svg>,
    },
    {
        name: 'Square',
        properties: '4 equal sides & 4 corners',
        realWorld: 'A window pane, a cracker',
        component: (props: any) => <svg {...props} viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" /></svg>,
    },
    {
        name: 'Circle',
        properties: 'No sides, no corners',
        realWorld: 'A clock, a plate, a wheel',
        component: (props: any) => <svg {...props} viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" /></svg>,
    },
    {
        name: 'Rectangle',
        properties: '4 sides & 4 corners',
        realWorld: 'A door, a book, a phone',
        component: (props: any) => <svg {...props} viewBox="0 0 100 100"><rect x="5" y="20" width="90" height="60" /></svg>,
    },
];

// --- Main Slide Component ---
export default function Shapes2DSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: '2d-shapes-concept', conceptId: '2d-shapes', conceptName: 'Recognizing 2D Shapes', type: 'learning' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col gap-6">
            <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Meet the Shapes</h3>
                <div className="space-y-4">
                    {SHAPES.map(shape => (
                        <div key={shape.name} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                            <shape.component className="w-12 h-12 fill-none stroke-blue-500 stroke-[8px]" />
                            <div>
                                <p className="font-bold text-slate-700 dark:text-slate-200">{shape.name}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{shape.properties}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             <div className="bg-blue-50 dark:bg-blue-900/30 border-t-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">Shapes in Real Life!</h3>
                <p className="text-slate-600 dark:text-slate-400">You can find these shapes all around you. A door is a rectangle, and a pizza slice is a triangle!</p>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const [gameShapes, setGameShapes] = useState(() => [...SHAPES].sort(() => 0.5 - Math.random()));
        const [currentIndex, setCurrentIndex] = useState(0);
        const [options, setOptions] = useState<string[]>([]);
        const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect', message: string } | null>(null);
        
        const currentShape = gameShapes[currentIndex];

        useEffect(() => {
            if (!currentShape) return;
            const correctOption = currentShape.name;
            const incorrectOptions = SHAPES.filter(s => s.name !== correctOption)
                                           .sort(() => 0.5 - Math.random())
                                           .slice(0, 2)
                                           .map(s => s.name);
            setOptions([...incorrectOptions, correctOption].sort(() => 0.5 - Math.random()));
        }, [currentIndex, currentShape]);

        const handleAnswer = (answer: string) => {
            if (feedback) return; // Prevent multiple clicks

            if (answer === currentShape.name) {
                setFeedback({ type: 'correct', message: 'Great job!' });
                setTimeout(() => {
                    setFeedback(null);
                    setCurrentIndex(prev => prev + 1);
                }, 1500);
            } else {
                setFeedback({ type: 'incorrect', message: 'Try again!' });
                setTimeout(() => setFeedback(null), 1500);
            }
        };

        const restartGame = () => {
            setGameShapes([...SHAPES].sort(() => 0.5 - Math.random()));
            setCurrentIndex(0);
            setFeedback(null);
        };

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Name the Shape</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Click the button with the correct name.</p>
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between items-center relative">
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                key="feedback"
                                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                                className={`absolute top-4 px-4 py-2 rounded-lg text-white font-bold ${feedback.type === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}
                            >
                                {feedback.message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    {currentShape ? (
                        <div className="w-full flex-grow flex flex-col justify-center items-center">
                            <AnimatePresence mode="wait">
                                <motion.div key={currentIndex} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.3 }}>
                                    <currentShape.component className="w-48 h-48 fill-slate-800 dark:fill-white stroke-none" />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="w-full flex-grow flex flex-col justify-center items-center">
                            <p className="text-3xl font-bold text-green-500">🎉 All Done! 🎉</p>
                        </div>
                    )}
                    
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
                         {currentShape ? options.map(option => (
                            <button key={option} onClick={() => handleAnswer(option)} className="p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 disabled:bg-slate-400 transition-colors">
                                {option}
                            </button>
                        )) : (
                             <button onClick={restartGame} className="p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 md:col-start-2">
                                Play Again
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const slideContent = (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><LeftTheoryPanel /></TrackedInteraction>
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}><RightInteractionPanel /></TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper slideId="geometry-2d-shapes" slideTitle="Recognizing 2D Shapes" moduleId="grade-2-math-geometry" submoduleId="geometry" interactions={localInteractions}>
            {slideContent}
        </SlideComponentWrapper>
    );
}