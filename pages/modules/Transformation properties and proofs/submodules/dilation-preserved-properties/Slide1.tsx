import React, { useState, useEffect } from 'react';
// 1. Import 'animate'
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion'; 
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT UPDATED ---
const DilationPropertiesAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const center = { x: 80, y: 125 };

    // Paths from your original code
    const preImageTriangle = "M 150 80 L 180 130 L 130 130 Z";
    const imageTriangle = "M 220 35 L 280 135 L 180 135 Z";
    
    // Animation controls
    const controls = useAnimation();
    
    // Animated number for the side length
    const sideLength = useMotionValue(50);
    const roundedSide = useTransform(sideLength, latest => Math.round(latest));

    // Animation loop
    useEffect(() => {
        const sequence = async () => {
            while (true) {
                // Grow to Image
                await Promise.all([
                    controls.start({
                        d: imageTriangle,
                        fill: "#22c55e", // Green
                        transition: { type: 'spring', stiffness: 50, damping: 15, duration: 1.5 }
                    }),
                    // 2. Use animate() instead of sideLength.set()
                    animate(sideLength, 100, { duration: 1.5 }) 
                ]);
                await new Promise(res => setTimeout(res, 1500)); // Pause

                // Shrink to Pre-Image
                await Promise.all([
                    controls.start({
                        d: preImageTriangle,
                        fill: "#3b82f6", // Blue
                        transition: { type: 'spring', stiffness: 50, damping: 15, duration: 1.5 }
                    }),
                    // 2. Use animate() instead of sideLength.set()
                    animate(sideLength, 50, { duration: 1.5 })
                ]);
                await new Promise(res => setTimeout(res, 1500)); // Pause
            }
        };
        sequence();
    }, [controls, sideLength]);

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Center of Dilation */}
                <circle cx={center.x} cy={center.y} r={5} className="fill-red-500" />
                <text x={center.x - 10} y={center.y + 5} textAnchor="end" className="fill-red-400 text-sm font-semibold">P</text>

                {/* Dilation Lines (static) */}
                <line x1={center.x} y1={center.y} x2={220} y2={35} className="stroke-slate-400 dark:stroke-slate-600 opacity-70" strokeWidth="1" strokeDasharray="3 3" />
                <line x1={center.x} y1={center.y} x2={280} y2={135} className="stroke-slate-400 dark:stroke-slate-600 opacity-70" strokeWidth="1" strokeDasharray="3 3" />
                <line x1={center.x} y1={center.y} x2={180} y2={135} className="stroke-slate-400 dark:stroke-slate-600 opacity-70" strokeWidth="1" strokeDasharray="3 3" />

                {/* The "Live Grow" Triangle */}
                <motion.path
                    d={preImageTriangle}
                    className="opacity-80"
                    animate={controls}
                    initial={{ d: preImageTriangle, fill: "#3b82f6" }}
                />

                {/* --- Text that changes vs. text that doesn't --- */}

                {/* 3. Split the text into a static <text> and a dynamic <motion.text> */}
                {/* Static Side Length Text */}
                <text 
                    x={170} y={155} 
                    className="fill-slate-700 dark:fill-slate-200 text-sm font-semibold"
                >
                    Side = 
                </text>
                {/* Animated Side Length Number */}
                <motion.text 
                    x={215} y={155} // Adjusted x-position
                    className="fill-slate-700 dark:fill-slate-200 text-sm font-semibold"
                >
                    {roundedSide}
                </motion.text>
                
                {/* Pulsing Angle Symbol (shows it's preserved) */}
                <motion.text 
                    x={130} y={125} 
                    className="fill-slate-700 dark:fill-slate-200 text-sm font-semibold"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    90°
                </motion.text>
                
                {/* Conclusion Text */}
                <motion.text x={svgWidth - 20} y={svgHeight - 40} textAnchor="end" className="fill-red-500 text-base font-bold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
                >
                    Side Lengths ❌ (Not Preserved)
                </motion.text>
                <motion.text x={svgWidth - 20} y={svgHeight - 20} textAnchor="end" className="fill-green-500 text-base font-bold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
                >
                    Angle Measure ✔️ (Preserved)
                </motion.text>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function Slide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [
        {
          id: 'dilation-properties-quiz',
          conceptId: 'dilation-properties',
          conceptName: 'Dilation Properties',
          type: 'judging',
          description: 'Testing properties preserved by dilation'
        }
    ];

    interface QuizQuestion {
        id: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }

    const questions: QuizQuestion[] = [
        {
            id: 'dilation-angle-q1',
            question: "A right triangle (with a 90° angle) is dilated by a scale factor of 4. What is the measure of the right angle in the new, larger triangle?",
            options: [
                "22.5°",
                "90°",
                "360°",
                "It's impossible to tell."
            ],
            correctAnswer: "90°",
            explanation: "Correct! Dilation is a non-rigid transformation, but it *preserves angle measure*. All angles in the image are congruent to the corresponding angles in the pre-image."
        },
        {
            id: 'dilation-distance-q2',
            question: "A rectangle has a side with a length of 10. It is dilated by a scale factor of 0.5. What is the length of the corresponding side in the new, smaller rectangle?",
            options: [
                "10",
                "5",
                "20",
                "0.5"
            ],
            correctAnswer: "5",
            explanation: "Exactly! Dilation *does not* preserve distance. The new side length is the original length (10) multiplied by the scale factor (0.5), which is 5."
        }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const handleQuizAnswer = (answerText: string) => {
        if (showFeedback || isQuizComplete) return;
        setSelectedAnswer(answerText);
        setShowFeedback(true);
        const current = questions[currentQuestionIndex];
        const isCorrect = answerText === current.correctAnswer;
        if (isCorrect) setScore(prev => prev + 1);
        handleInteractionComplete({
            interactionId: `dilation-properties-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'dilation-properties', conceptName: 'Dilation Properties',
            conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
            question: { type: 'mcq', question: current.question, options: current.options }
        });
    };

    const handleNextQuestion = () => {
        const newAnswered = [...questionsAnswered];
        newAnswered[currentQuestionIndex] = true;
        setQuestionsAnswered(newAnswered);
        setSelectedAnswer('');
        setShowFeedback(false);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsQuizComplete(true);
        }
    };

    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

                {/* Left Column - Content */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Recap: Dilation (Non-Rigid)</h2>
                        <p className="text-lg leading-relaxed">
                            A <strong>dilation</strong> is the "resize" transformation. It is non-rigid because it changes the size of the figure.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                           The new figure (image) is similar to the pre-image, but not congruent (unless the scale factor is 1).
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">What Dilations PRESERVE</h3>
                        <p className="text-lg leading-relaxed">
                            Even though the size changes, dilations still preserve some key properties:
                        </p>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li className="font-semibold">
                                📐 Angle Measure
                                <span className="font-normal block text-slate-600 dark:text-slate-400">Angles in the image are congruent to their corresponding angles in the pre-image.</span>
                            </li>
                            <li className="font-semibold">
                                ↔️ Parallelism
                                 <span className="font-normal block text-slate-600 dark:text-slate-400">If two lines are parallel in the pre-image, their images will also be parallel.</span>
                            </li>
                             <li className="font-semibold">
                                🔄 Orientation
                                 <span className="font-normal block text-slate-600 dark:text-slate-400">The vertex order (e.g., clockwise) does not get reversed.</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-red-500 dark:text-red-400">What Dilations DO NOT Preserve</h3>
                        <p className="text-lg leading-relaxed">
                            This is the most important part that separates dilations from rigid transformations:
                        </p>
                         <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li className="font-semibold">
                                📏 Distance (Side Length)
                                <span className="font-normal block text-slate-600 dark:text-slate-400">Side lengths are not preserved. They are multiplied by the scale factor.</span>
                            </li>
                        </ul>
                        <div className="mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-700">
                            <p className="text-lg font-bold text-red-800 dark:text-red-200">
                                New Length = (Original Length) × (Scale Factor k)
                            </p>
                        </div>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Angles vs. Side Lengths</h3>
                        <DilationPropertiesAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Notice the 90° angle is preserved, but the side length of 50 is not (it becomes 100 with k=2).
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        {/* Quiz UI - Copied from reference */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
                            <div className="text-lg text-slate-600 dark:text-slate-400">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </div>
                        </div>
                        <div className="flex space-x-2 mb-6">
                            {questions.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 flex-1 rounded ${
                                        index === currentQuestionIndex
                                            ? 'bg-blue-500' // Active
                                            : questionsAnswered[index]
                                            ? 'bg-blue-300 dark:bg-blue-800' // Answered
                                            : 'bg-slate-300 dark:bg-slate-600' // Unanswered
                                    }`}
                                />
                            ))}
                        </div>
                        {!isQuizComplete ? (
                            <>
                                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
                                <div className="space-y-3">
                                    {questions[currentQuestionIndex].options.map((option, idx) => {
                                        const disabled = showFeedback;
                                        const selected = selectedAnswer === option;
                                        const correct = option === questions[currentQuestionIndex].correctAnswer;
                                        const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                                            selected
                                                ? showFeedback
                                                    ? correct
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // CORRECT
                                                        : 'border-slate-400 bg-slate-100 dark:bg-slate-800 opacity-70' // INCORRECT
                                                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // Selected
                                                : 'border-slate-300 dark:border-slate-600 hover:border-blue-400' // Default
                                        } ${disabled ? 'cursor-default' : 'cursor-pointer'}`;
                                        return (
                                            <motion.button
                                                key={idx}
                                                onClick={() => handleQuizAnswer(option)}
                                                disabled={disabled}
                                                className={className}
                                                whileHover={!disabled ? { scale: 1.02 } : {}}
                                                whileTap={!disabled ? { scale: 0.98 } : {}}
                                            >
                                                {option}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                                <AnimatePresence>
                                    {showFeedback && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className={`mt-4 p-4 rounded-lg ${
                                                selectedAnswer === questions[currentQuestionIndex].correctAnswer
                                                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                                                    : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700'
                                            }`}
                                        >
                                            <div className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                                                {questions[currentQuestionIndex].explanation}
                                            </div>
                                            <motion.button
                                                onClick={handleNextQuestion}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        ) : (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                                <div className="text-3xl mb-4">📐</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You scaled this topic perfectly!' : 'Great job!'}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="dilations-and-properties"
            slideTitle="Dilations and properties"
            moduleId="transformation-properties-proofs"
            submoduleId="dilation-preserved-properties"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}