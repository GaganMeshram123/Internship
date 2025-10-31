import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const TransformationTypesAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300;
    const baseTriangle = "M 150 180 L 180 130 L 210 180 Z";
    const delay = 0.5;

    const items = [
        { 
            id: 'pre-image', 
            d: baseTriangle, 
            transform: "translate(0, 0)", 
            label: "Pre-image", 
            className: "fill-blue-500", 
            textClass: "fill-blue-300",
            delay: 0
        },
        { 
            id: 'translation', 
            d: baseTriangle, 
            transform: "translate(100, -20)", 
            label: "Translation", 
            className: "fill-green-500",
            textClass: "fill-green-300",
            delay: delay * 1
        },
        { 
            id: 'rotation', 
            d: baseTriangle, 
            transform: "rotate(-90, 180, 155) translate(-70, -150)", 
            label: "Rotation", 
            className: "fill-purple-500",
            textClass: "fill-purple-300",
            delay: delay * 2
        },
        { 
            id: 'reflection', 
            d: baseTriangle, 
            transform: "scale(1, -1) translate(0, -360)", 
            label: "Reflection", 
            className: "fill-orange-500",
            textClass: "fill-orange-300",
            delay: delay * 3
        },
        { 
            id: 'dilation', 
            d: baseTriangle, 
            transform: "scale(1.5) translate(-150, -100)", 
            label: "Dilation", 
            className: "fill-red-500",
            textClass: "fill-red-300",
            delay: delay * 4
        },
    ];

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {items.map(item => (
                    <g key={item.id}>
                        <motion.path
                            d={item.d}
                            transform={item.transform}
                            className={item.className}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 0.8, scale: 1 }}
                            transition={{ delay: item.delay, duration: 0.5 }}
                        />
                        <motion.text
                            x={parseFloat(item.transform.match(/translate\(([^,]+),/)?.[1] || "0") + 180}
                            y={parseFloat(item.transform.match(/translate\([^,]+, ([-0-9.]+)/)?.[1] || "0") + (item.id === 'reflection' ? 330 : 160)}
                            // Basic text positioning (adjust as needed)
                            transform={item.id === 'rotation' ? 'translate(-100, -130)' : (item.id === 'dilation' ? 'translate(-150, -100) scale(1.5)' : '')}
                            textAnchor="middle"
                            className={`text-xs font-semibold ${item.textClass}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: item.delay + 0.3, duration: 0.3 }}
                        >
                            {item.label}
                        </motion.text>
                    </g>
                ))}
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
                        <TransformationTypesAnimation />
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