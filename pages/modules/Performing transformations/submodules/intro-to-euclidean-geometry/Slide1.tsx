import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react';

// --- NEW ANIMATION COMPONENT: TRANSFORMATION PLAYGROUND ---
const TransformationPlayground: React.FC = () => {
    type TransformType = 'slide' | 'turn' | 'flip' | 'resize';
    const [activeTransform, setActiveTransform] = useState<TransformType>('slide');
    const { isDarkMode } = useThemeContext();

    const preImageColor = isDarkMode ? "rgb(96 165 250 / 0.3)" : "rgb(37 99 235 / 0.3)"; // Ghost color
    const imageColor = isDarkMode ? "rgb(74 222 128)" : "rgb(34 197 94)"; // Green color

    const svgWidth = 400;
    const svgHeight = 250;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    const gridSpacing = 25;

    // Define the triangle points around the origin (0,0) for easier transformations
    const trianglePoints = "-25,25 25,25 0,-25";

    const scenarios = {
        slide: {
            animate: { x: 75, y: -50, rotate: 0, scale: 1, scaleX: 1 },
            transition: { type: 'spring', stiffness: 50 }
        },
        turn: {
            animate: { x: 0, y: 0, rotate: 90, scale: 1, scaleX: 1 },
            transition: { type: 'spring', stiffness: 50 }
        },
        flip: {
            animate: { x: 0, y: 0, rotate: 0, scale: 1, scaleX: -1 },
            transition: { type: 'spring', stiffness: 50 }
        },
        resize: {
            animate: { x: 0, y: 0, rotate: 0, scale: 1.5, scaleX: 1 },
            transition: { type: 'spring', stiffness: 50 }
        },
    };

    return (
        <div className="w-full">
            {/* Animation Canvas */}
            <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 overflow-hidden" style={{ minHeight: svgHeight }}>
                <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    {/* Grid Lines */}
                    <defs>
                        <pattern id="grid" width={gridSpacing} height={gridSpacing} patternUnits="userSpaceOnUse">
                            <path d={`M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`} fill="none" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Axes */}
                    <line x1={0} y1={centerY} x2={svgWidth} y2={centerY} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.5" />
                    <line x1={centerX} y1={0} x2={centerX} y2={svgHeight} className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.5" />
                    <text x={svgWidth - 15} y={centerY - 5} className="fill-slate-500 text-sm font-bold">x</text>
                    <text x={centerX + 5} y={15} className="fill-slate-500 text-sm font-bold">y</text>

                    {/* Shapes are wrapped in a group to easily center them */}
                    <g transform={`translate(${centerX}, ${centerY})`}>
                        {/* Pre-Image (Ghost) */}
                        <polygon points={trianglePoints} fill={preImageColor} />

                        {/* Animated Image */}
                        <AnimatePresence mode="wait">
                            <motion.g
                                key={activeTransform} // Re-animate when the key changes
                                initial={{ x: 0, y: 0, rotate: 0, scale: 1, scaleX: 1 }}
                                animate={scenarios[activeTransform].animate}
                                transition={scenarios[activeTransform].transition}
                            >
                                <polygon points={trianglePoints} fill={imageColor} />
                            </motion.g>
                        </AnimatePresence>
                    </g>
                </svg>
            </div>
            
            {/* Buttons */}
            <div className="flex justify-center flex-wrap gap-2 mt-4">
                {(['slide', 'turn', 'flip', 'resize'] as TransformType[]).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTransform(tab)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                            activeTransform === tab
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT ---


export default function IntroToEuclideanGeometrySlide1() {
    // --- STATE (UNCHANGED) ---
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [ /* ... (unchanged) ... */ ];

    interface QuizQuestion { /* ... (unchanged) ... */ }

    // --- UPDATED QUIZ QUESTIONS ---
    const questions: QuizQuestion[] = [
        {
            id: 'vocab-q1-preimage',
            question: 'What is the fancy word for the original shape, *before* it is moved or changed?',
            options: [ 'Image', 'Pre-Image', 'Coordinate', 'Axis' ],
            correctAnswer: 'Pre-Image',
            explanation: 'Correct! The Pre-Image is the "before" state of any transformation.'
        },
        {
            id: 'vocab-q2-plane',
            question: 'What do we call the "map" with an x-axis and y-axis where we perform transformations?',
            options: [ 'A Geometry Grid', 'The Coordinate Plane', 'A Transformation Sheet', 'A Shape Box' ],
            correctAnswer: 'The Coordinate Plane',
            explanation: 'That\'s right! The coordinate plane is our "map" for all transformations, letting us track shapes using (x, y) coordinates.'
        }
    ];

    // --- LOGIC HANDLERS (UNCHANGED) ---
    const handleInteractionComplete = (response: InteractionResponse) => { /* ... */ };
    const handleQuizAnswer = (answerText: string) => { /* ... */ };
    const handleNextQuestion = () => { /* ... */ };

    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

                {/* Left Column - Content (UNCHANGED) */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        {/* ... (all text content here is unchanged) ... */}
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What Happens When Shapes Move?</h2>
                         <p className="text-lg leading-relaxed">
                           Have you ever moved a chess piece, zoomed in on a photo, or looked at yourself in a mirror? You've seen transformations in action! 🤩
                         </p>
                         <p className="text-lg leading-relaxed mt-4">
                           In geometry, a <strong>transformation</strong> is a fancy word for a "move" or "change" to a shape.
                         </p>
                         <p className="text-lg leading-relaxed mt-4">
                           We need two key terms to talk about this:
                         </p>
                         <ul className="mt-4 space-y-2 text-lg">
                           <li className="flex items-start">
                             <span className="font-bold text-blue-500 mr-2">►</span>
                             <span><strong>Pre-image:</strong> This is the original shape. The "before."</span>
                           </li>
                           <li className="flex items-start">
                             <span className="font-bold text-green-500 mr-2">►</span>
                             <span><strong>Image:</strong> This is the new shape after the transformation. The "after."</span>
                           </li>
                         </ul>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                         <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Transformation Playground 🗺️</h3>
                         <p className="text-lg leading-relaxed">
                           To move shapes, we need a "map" where all the action happens. This map is the coordinate plane!
                         </p>
                         <p className="text-lg leading-relaxed mt-4">
                           Think of it like grid paper with two main lines:
                         </p>
                         <ul className="mt-4 space-y-2 text-lg">
                           <li className="flex items-start">
                             <span className="font-bold text-slate-500 mr-2">→</span>
                             <span>The <strong>x-axis</strong>: The horizontal (side-to-side) line.</span>
                           </li>
                           <li className="flex items-start">
                             <span className="font-bold text-slate-500 mr-2">↑</span>
                             <span>The <strong>y-axis</strong>: The vertical (up-and-down) line.</span>
                           </li>
                         </ul>
                         <p className="text-lg leading-relaxed mt-4">
                           We use <strong>coordinates</strong> (like <code>(x, y)</code>) to find the exact location of every point on this map.
                         </p>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">

                    {/* --- UPDATED ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Transformation Playground</h3>
                        {/* --- USING THE NEW ANIMATION COMPONENT --- */}
                        <TransformationPlayground />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Click the buttons! The faint shape is the <strong>pre-image</strong>. The moving green shape is the <strong>image</strong>.
                        </p>
                    </div>

                    {/* --- QUIZ CARD (Uses updated questions) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        {/* ... (all quiz JSX is unchanged, it will just use the new `questions` array) ... */}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="getting-ready"
            slideTitle="Getting Ready for Transformations"
            moduleId="performing-transformations"
            submoduleId="intro-to-euclidean-geometry"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}