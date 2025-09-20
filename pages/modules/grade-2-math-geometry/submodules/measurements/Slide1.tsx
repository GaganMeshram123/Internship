import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

type GameMode = 'measure' | 'compare' | 'broken';

// --- Reusable Ruler Component ---
const Ruler = ({ isBroken = false, constraintsRef }: { isBroken?: boolean, constraintsRef: React.RefObject<HTMLDivElement> }) => {
    const rulerBg = isBroken ? "bg-red-200 dark:bg-red-900/60" : "bg-slate-200 dark:bg-slate-500";
    const rulerText = "text-slate-700 dark:text-slate-200";

    return (
        <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            className={`w-[300px] h-12 rounded-lg shadow-inner cursor-grab active:cursor-grabbing flex items-center justify-between px-2 font-mono select-none ${rulerBg} ${rulerText}`}
        >
            {/* Simple tick marks for visual effect */}
            {Array.from({ length: isBroken ? 8 : 10 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center h-full pt-1">
                    <span className="text-xs">{isBroken ? i + 2 : i}</span>
                    <div className="w-px h-2 bg-slate-500 dark:bg-slate-300 mt-1"></div>
                </div>
            ))}
        </motion.div>
    );
};


// --- Main Slide Component ---
export default function MeasuringLengthSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [gameMode, setGameMode] = useState<GameMode>('measure');
    
    const slideInteractions: Interaction[] = [{ id: 'measuring-length-concept', conceptId: 'measuring-length', conceptName: 'Measuring Length', type: 'learning' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const modes: GameMode[] = ['measure', 'compare', 'broken'];
    const currentModeIndex = modes.indexOf(gameMode);

    const navigate = (direction: number) => {
        const nextIndex = (currentModeIndex + direction + modes.length) % modes.length;
        setGameMode(modes[nextIndex]);
    };

    const LeftTheoryPanel = ({ mode }: { mode: GameMode }) => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Measuring Length</h2>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {mode === 'measure' && (
                             <div className="space-y-6">
                                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg p-4">
                                    <h3 className="font-bold text-lg mb-2">Using a Ruler</h3>
                                    <p>A ruler helps us find out how long things are. We use units like inches or centimeters to measure.</p>
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-900/40 border-l-4 border-slate-400 rounded-r-lg p-4">
                                    <h3 className="font-bold text-lg mb-2">The Most Important Rule!</h3>
                                    <p>When you measure, always make sure you start at the <strong className="dark:text-white">zero (0)</strong> mark on the ruler!</p>
                                </div>
                            </div>
                        )}
                        {mode === 'compare' && (
                             <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg p-4">
                                <h3 className="font-bold text-lg mb-2">Which is Longer?</h3>
                                <p>We can use a ruler to compare objects. By measuring both, we can find out which one is longer, shorter, or if they are the same length.</p>
                            </div>
                        )}
                         {mode === 'broken' && (
                             <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg p-4">
                                <h3 className="font-bold text-lg mb-2">The Broken Ruler Challenge!</h3>
                                <p>What if your ruler doesn't start at zero? Start at any number (like 2), measure to the end, and subtract the start from the end!</p>
                                <p className="mt-2 font-mono bg-slate-200 dark:bg-slate-800 p-2 rounded">Example: Ends at 9, starts at 2. <br/>Length = 9 - 2 = 7</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
             <div className="flex justify-between mt-6">
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600">Back</button>
                <button onClick={() => navigate(1)} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600">Next</button>
            </div>
        </div>
    );

    const RightInteractionPanel = ({ mode }: { mode: GameMode }) => {
         const constraintsRef = useRef<HTMLDivElement>(null);
         return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Ruler Tool</h3>
                <div ref={constraintsRef} className="bg-slate-100 dark:bg-slate-900/70 rounded-lg flex-grow flex flex-col justify-center items-center p-4 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                         <motion.div
                            key={mode}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full flex flex-col justify-center items-center"
                        >
                            {mode === 'measure' && (
                                <>
                                    <p className="absolute top-4 text-slate-600 dark:text-slate-400">Drag the ruler to measure the pencil.</p>
                                    <div className="text-6xl -rotate-45 mb-12">✏️</div>
                                    <Ruler constraintsRef={constraintsRef} />
                                </>
                            )}
                             {mode === 'compare' && (
                                <>
                                    <p className="absolute top-4 text-slate-600 dark:text-slate-400">Measure both, then decide which is longer.</p>
                                    <div className="flex items-center gap-16 mb-12">
                                        <div className="text-6xl -rotate-45">✏️</div>
                                        <div className="text-4xl">🖍️</div>
                                    </div>
                                    <Ruler constraintsRef={constraintsRef} />
                                </>
                            )}
                            {mode === 'broken' && (
                                <>
                                    <p className="absolute top-4 text-slate-600 dark:text-slate-400">Use the broken ruler to find the length.</p>
                                    <div className="text-6xl -rotate-45 mb-12">✏️</div>
                                    <Ruler constraintsRef={constraintsRef} isBroken={true} />
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        );
    };

    const slideContent = (
        <div className="min-h-screen p-4 sm:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                    <LeftTheoryPanel mode={gameMode} />
                </TrackedInteraction>
                <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
                    <RightInteractionPanel mode={gameMode} />
                </TrackedInteraction>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper 
            slideId="measurements-length" 
            slideTitle="Measuring Length" 
            moduleId="grade-2-math-measurement"
            submoduleId="length-and-units"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}