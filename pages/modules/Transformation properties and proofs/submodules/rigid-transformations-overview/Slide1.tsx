import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- (MODIFIED) NEW ANIMATION COMPONENT ---
const TransformationComparator: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300;
    // NEW state: null, 'translate', 'rotate', 'reflect', 'dilate'
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const { isDarkMode } = useThemeContext();

    // --- Define Shapes ---
    // Pre-Image on the left
    const preImageTriangle = "M 80 150 L 120 150 L 100 110 Z"; // Centered at x=100
    // Base for the Image on the right
    const imageTriangleBase = "M 280 150 L 320 150 L 300 110 Z"; // Centered at x=300

    const preImageProps = {
        label: "Pre-Image",
        path: preImageTriangle,
        className: "fill-blue-500",
        textClass: "fill-blue-300"
    };

    // --- Define Image States ---
    const imageStates: Record<string, { label: string, transform: string, className: string, textClass: string }> = {
        'translate': {
            label: "Translation (Rigid)",
            transform: "translate(20, 30)", // Simple slide
            className: "fill-green-500",
            textClass: "fill-green-300"
        },
        'rotate': {
            label: "Rotation (Rigid)",
            transform: "rotate(120, 300, 130)", // Rotate around its center (300, 130)
            className: "fill-purple-500",
            textClass: "fill-purple-300"
        },
        'reflect': {
            label: "Reflection (Rigid)",
            transform: "scale(-1, 1) translate(-600, 0)", // Reflect across x=300
            className: "fill-orange-500",
            textClass: "fill-orange-300"
        },
        'dilate': {
            label: "Dilation (Non-Rigid)",
            transform: "scale(1.5) translate(-150, -65)", // Scale from its center (300, 130)
            className: "fill-red-500",
            textClass: "fill-red-300"
        }
    };

    // --- Define Buttons ---
    const buttons = [
        { key: 'translate', label: 'Translate' },
        { key: 'rotate', label: 'Rotate' },
        { key: 'reflect', label: 'Reflect' },
        { key: 'dilate', label: 'Dilate' },
    ];

    const currentImage = activeKey ? imageStates[activeKey] : null;
    // Update label text based on active state
    const currentLabel = activeKey ? (currentImage?.label || "") : "Click a button to see a transformation.";
    const currentTextClass = activeKey ? (currentImage?.textClass || "") : (isDarkMode ? "fill-slate-400" : "fill-slate-500");

    return (
        // Use a flex-col container to hold SVG and buttons
        <div className="w-full flex flex-col justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            {/* SVG Area */}
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                
                {/* 1. Pre-Image (Always visible) */}
                <g>
                    <path
                        d={preImageProps.path}
                        className={preImageProps.className}
                        opacity={0.9}
                    />
                    <text
                        x={100} // Centered on pre-image
                        y={svgHeight - 60} // Position text below shape
                        textAnchor="middle"
                        className={`text-base font-semibold ${preImageProps.textClass}`}
                    >
                        {preImageProps.label}
                    </text>
                </g>

                {/* Line of Reflection (only show for reflection) */}
                <AnimatePresence>
                {activeKey === 'reflect' && (
                    <motion.line
                        x1={200} y1={50} x2={200} y2={svgHeight - 80} // Vertical line at x=200
                        className="stroke-slate-400 dark:stroke-slate-500"
                        strokeWidth="1.5" strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        exit={{ pathLength: 0 }}
                    />
                )}
                </AnimatePresence>

                {/* 2. Image (Animated on state change) */}
                <AnimatePresence mode="wait">
                    {currentImage && (
                        <motion.g
                            key={activeKey} // Key change triggers animation
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                        >
                            <path
                                d={imageTriangleBase}
                                transform={currentImage.transform}
                                className={currentImage.className}
                                opacity={0.9}
                            />
                             <text
                                x={300} // Centered on image
                                y={svgHeight - 60} // Position text below shape
                                textAnchor="middle"
                                className={`text-base font-semibold ${currentImage.textClass}`}
                            >
                                Image
                            </text>
                        </motion.g>
                    )}
                </AnimatePresence>

                {/* 3. Dynamic Label Text at bottom */}
                <motion.text
                    key={currentLabel} // Animate text change
                    x={svgWidth / 2}
                    y={svgHeight - 20} // Position text at the very bottom
                    textAnchor="middle"
                    className={`text-lg font-semibold ${currentTextClass}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentLabel}
                </motion.text>
            </svg>
            
            {/* Button Controls */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
                {buttons.map((btn) => {
                    const isActive = activeKey === btn.key;
                    return (
                        <motion.button
                            key={btn.key}
                            onClick={() => setActiveKey(btn.key)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all border-2
                                ${isActive
                                    ? 'bg-blue-600 text-white border-blue-600' // Active state
                                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700' // Inactive
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {btn.label}
                        </motion.button>
                    );
                })}
            </div>
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
    const [score, setScore] =useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [
        {
          id: 'transformation-properties-quiz',
          conceptId: 'transformation-properties-intro',
          conceptName: 'Transformation Properties Intro',
          type: 'judging',
          description: 'Testing understanding of transformation types and properties'
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
            id: 'rigid-vs-nonrigid-q1',
            question: "Which of these is a 'rigid' transformation (preserves size and shape)?",
            options: [
                "Dilation",
                "Translation",
                "Shear",
                "Stretch"
            ],
            correctAnswer: "Translation",
            explanation: "Correct! Translations, rotations, and reflections are rigid. Dilations are non-rigid because they change the size."
        },
        {
            id: 'preserved-property-q2',
            question: "If a property is 'preserved' during a transformation, what does that mean?",
            options: [
                "The property gets bigger.",
                "The property disappears.",
                "The property stays the same.",
                "The property flips."
            ],
            correctAnswer: "The property stays the same.",
            explanation: "Exactly! A preserved property, like distance in a translation, remains unchanged between the pre-image and the image."
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
            interactionId: `properties-intro-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'transformation-properties-intro', conceptName: 'Transformation Properties Intro',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What is a Transformation?</h2>
                        <p className="text-lg leading-relaxed">
                            A <strong>transformation</strong> is a rule that moves or changes a geometric figure in some way.
                        </p>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li>The original figure is called the <strong>pre-image</strong>.</li>
                            <li>The new, transformed figure is called the <strong>image</strong>.</li>
                        </ul>
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                            Think: It's a "mapping" of every point from the pre-image to a new point on the image.
                          </em>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Two Main Types of Transformations</h3>
                        <p className="text-lg leading-relaxed mb-2">
                            <strong>1. Rigid Transformations (Isometries):</strong>
                        </p>
                        <p className="text-lg leading-relaxed pl-4 mb-3">
                            These transformations <strong>preserve size and shape</strong>. The image is congruent to the pre-image.
                        </p>
                        <ul className="text-lg list-disc list-inside pl-4 space-y-1 font-mono">
                            <li>Translation (slide)</li>
                            <li>Rotation (turn)</li>
                            <li>Reflection (flip)</li>
                        </ul>
                        
                        <p className="text-lg leading-relaxed mt-4 mb-2">
                            <strong>2. Non-Rigid Transformations:</strong>
                        </p>
                        <p className="text-lg leading-relaxed pl-4">
                            These transformations <strong>change the size</strong> (but not the shape). The image is similar to the pre-image.
                        </p>
                         <ul className="text-lg list-disc list-inside pl-4 space-y-1 font-mono">
                            <li>Dilation (resize)</li>
                        </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">What is a "Preserved Property"?</h3>
                        <p className="text-lg leading-relaxed">
                            A property is <strong>preserved</strong> if it remains the same after the transformation.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                            In this unit, we will check which transformations preserve key properties like:
                        </p>
                        <ul className="text-lg list-none mt-4 space-y-2 font-mono text-slate-700 dark:text-slate-300">
                             <li className='border-b pb-2 dark:border-slate-700'>📐 Angle Measure</li>
                             <li className='border-b pb-2 dark:border-slate-700'>📏 Distance (Side Length)</li>
                             <li className='border-b pb-2 dark:border-slate-700'>Parallelism (Parallel lines)</li>
                             <li>🔄 Orientation (The order of vertices)</li>
                        </ul>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing the Transformations</h3>
                        
                        {/* --- UPDATED COMPONENT REFERENCE --- */}
                        <TransformationComparator />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Notice how translation, rotation, and reflection (rigid) change the position, but dilation (non-rigid) changes the size.
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
                                <div className="text-3xl mb-4">✅</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'Great start to the unit!' : 'Good job!'}
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
            slideId="getting-ready-for-properties"
            slideTitle="Getting ready for transformation properties"
            moduleId="transformation-properties-proofs"
            submoduleId="rigid-transformations-overview"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}