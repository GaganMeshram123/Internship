import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';

// --- Shape Data and Visual Components ---
const SHAPES_3D = [
    {
        name: 'Cube',
        properties: { faces: 6, edges: 12, vertices: 8 },
        realWorldEmoji: '🎲',
        realWorldName: 'a dice',
        component: () => ( // Simple Cube ASCII Art or SVG placeholder
            <div className="relative w-16 h-16 transform rotate-x-15 rotate-y-15">
                {/* Front Face */}
                <div className="absolute w-16 h-16 border-2 border-sky-600 bg-sky-400"></div>
                {/* Top Face */}
                <div className="absolute w-16 h-16 border-2 border-sky-600 bg-sky-300 transform -translate-y-full -skew-x-12 origin-bottom-left"></div>
                {/* Right Face */}
                <div className="absolute w-16 h-16 border-2 border-sky-600 bg-sky-500 transform translate-x-full skew-y-12 origin-top-left"></div>
            </div>
        ),
    },
    {
        name: 'Sphere',
        properties: { faces: 0, edges: 0, vertices: 0 },
        realWorldEmoji: '⚽',
        realWorldName: 'a ball',
        component: () => (
            <div className="w-16 h-16 rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, #60a5fa, #2563eb)' }}></div>
        ),
    },
    {
        name: 'Cone',
        properties: { faces: 1, edges: 0, vertices: 1 },
        realWorldEmoji: '🎉',
        realWorldName: 'a party hat',
        component: () => ( // Simple Cone ASCII Art or SVG placeholder
            <div className="relative w-16 h-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[80px] border-b-red-400"></div>
                <div className="absolute bottom-0 left-0 w-16 h-4 rounded-full bg-red-500 opacity-75"></div>
            </div>
        ),
    },
    {
        name: 'Cylinder',
        properties: { faces: 2, edges: 0, vertices: 0 },
        realWorldEmoji: '🥫',
        realWorldName: 'a can of soup',
        component: () => ( // Simple Cylinder ASCII Art or SVG placeholder
            <div className="relative w-16 h-20 bg-slate-300 border-x-2 border-slate-500 rounded-lg">
                <div className="absolute top-0 left-0 w-full h-4 rounded-full bg-slate-400 border-2 border-slate-500 transform -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-full h-4 rounded-full bg-slate-400 border-2 border-slate-500 transform translate-y-1/2"></div>
            </div>
        ),
    },
    {
        name: 'Pyramid', // New shape
        properties: { faces: 5, edges: 8, vertices: 5 },
        realWorldEmoji: '🔺',
        realWorldName: 'an Egyptian pyramid',
        component: () => ( // Simple Pyramid SVG placeholder
            <div className="relative w-20 h-20">
                <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                    <polygon points="50,5 95,95 5,95" fill="#facc15" stroke="#eab308" strokeWidth="2" /> {/* Front triangle */}
                    <polygon points="50,5 95,95 80,95" fill="#fde047" stroke="#eab308" strokeWidth="2" /> {/* Side triangle hint */}
                </svg>
            </div>
        ),
    },
    {
        name: 'Rectangular Prism', // New shape
        properties: { faces: 6, edges: 12, vertices: 8 },
        realWorldEmoji: '🧱',
        realWorldName: 'a brick or a box',
        component: () => ( // Simple Rectangular Prism SVG placeholder
            <div className="relative w-20 h-16">
                <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                    <rect x="10" y="20" width="80" height="60" fill="#a78bfa" stroke="#8b5cf6" strokeWidth="2" /> {/* Front face */}
                    <polygon points="90,20 100,10 100,70 90,80" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="2" /> {/* Right face */}
                    <polygon points="10,20 20,10 100,10 90,20" fill="#ddd6fe" stroke="#8b5cf6" strokeWidth="2" /> {/* Top face */}
                </svg>
            </div>
        ),
    },
];


export default function Shapes3DSlide() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const slideInteractions: Interaction[] = [{ id: '3d-shapes-concept', conceptId: '3d-shapes', conceptName: 'Exploring 3D Shapes', type: 'learning' }];
    const handleInteractionComplete = (response: InteractionResponse) => setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));

    const LeftTheoryPanel = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col gap-6">
            <div>
                 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Meet the 3D Shapes</h3>
                 <div className="grid grid-cols-2 gap-4">
                     {SHAPES_3D.map(shape => (
                        <div key={shape.name} className="flex flex-col items-center text-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                            <div className="h-24 flex items-center justify-center scale-75">{shape.component()}</div> {/* Scale down for better fit */}
                            <p className="font-bold text-slate-700 dark:text-slate-200 mt-2">{shape.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">like {shape.realWorldName}</p>
                        </div>
                    ))}
                 </div>
            </div>
             <div className="bg-blue-50 dark:bg-blue-900/30 border-t-4 border-blue-400 dark:border-blue-700 rounded-lg p-6">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-3">Shape Properties</h3>
                <div className="space-y-2 text-slate-600 dark:text-slate-400 text-sm mb-4">
                    <p><strong>Faces:</strong> The flat surfaces of a shape.</p>
                    <p><strong>Edges:</strong> Where two faces meet in a line.</p>
                    <p><strong>Vertices:</strong> The corners where edges meet.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700">
                        <thead className="bg-slate-200 dark:bg-slate-700">
                            <tr>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">Shape</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">Faces</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">Edges</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">Vertices</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                            {SHAPES_3D.map(shape => (
                                <tr key={shape.name}>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{shape.name}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">{shape.properties.faces}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">{shape.properties.edges}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">{shape.properties.vertices}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const RightInteractionPanel = () => {
        const [gameShapes, setGameShapes] = useState(() => [...SHAPES_3D].sort(() => 0.5 - Math.random()));
        const [currentIndex, setCurrentIndex] = useState(0);
        const [options, setOptions] = useState<string[]>([]);
        const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect', message: string } | null>(null);
        
        const currentShape = gameShapes[currentIndex];

        useEffect(() => {
            if (!currentShape) return;
            const correctOption = currentShape.name;
            const incorrectOptions = SHAPES_3D.filter(s => s.name !== correctOption)
                                           .sort(() => 0.5 - Math.random())
                                           .slice(0, 2)
                                           .map(s => s.name);
            setOptions([...incorrectOptions, correctOption].sort(() => 0.5 - Math.random()));
        }, [currentIndex, currentShape]);

        const handleAnswer = (answer: string) => {
            if (feedback) return;

            if (answer === currentShape.name) {
                setFeedback({ type: 'correct', message: 'Correct!' });
                setTimeout(() => {
                    setFeedback(null);
                    setCurrentIndex(prev => prev + 1);
                }, 1500);
            } else {
                setFeedback({ type: 'incorrect', message: 'Not quite!' });
                setTimeout(() => setFeedback(null), 1500);
            }
        };

        const restartGame = () => {
            setGameShapes([...SHAPES_3D].sort(() => 0.5 - Math.random()));
            setCurrentIndex(0);
            setFeedback(null);
        };

        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-300 dark:border-slate-700 shadow-md h-full flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive: Find the Shape</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">What 3D shape does this look like?</p>
                <div className="bg-slate-100 dark:bg-slate-900/70 rounded-lg p-4 flex-grow flex flex-col justify-between items-center relative">
                    <AnimatePresence>
                        {feedback && (
                            <motion.div
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
                                <motion.div key={currentIndex} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.3 }} className="text-8xl">
                                    {currentShape.realWorldEmoji}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="w-full flex-grow flex flex-col justify-center items-center">
                            <p className="text-3xl font-bold text-green-500">🎉 Well Done! 🎉</p>
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
        <SlideComponentWrapper 
            slideId="geometry-3d-shapes" 
            slideTitle="Exploring 3D Shapes" 
            moduleId="grade-2-math-geometry" 
            submoduleId="geometry" 
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}