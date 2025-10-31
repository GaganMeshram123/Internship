import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const IdentifyTransformAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300;
    
    // An "F" shape is good for orientation
    const fPath = "M 0 0 L 50 0 M 25 0 L 25 50 M 0 50 L 50 50";
    const baseDelay = 0.5;

    const items = [
        { 
            id: 'pre-image', 
            d: fPath, 
            transform: "translate(50, 50)", 
            label: "Pre-Image", 
            className: "stroke-blue-500", 
            textClass: "fill-blue-400",
            delay: baseDelay
        },
        { 
            id: 'translation', 
            d: fPath, 
            transform: "translate(150, 50)", 
            label: "Translation", 
            props: "✅ Congruent, ✅ Orientation",
            className: "stroke-green-500",
            textClass: "fill-green-400",
            delay: baseDelay + 1.0
        },
        { 
            id: 'reflection', 
            d: fPath, 
            transform: "translate(250, 50) scale(-1, 1) translate(-50, 0)", 
            label: "Reflection", 
            props: "✅ Congruent, ❌ Orientation",
            className: "stroke-orange-500",
            textClass: "fill-orange-400",
            delay: baseDelay + 2.0
        },
        { 
            id: 'dilation', 
            d: fPath, 
            transform: "translate(50, 180) scale(1.5)", 
            label: "Dilation", 
            props: "❌ Congruent, ✅ Orientation",
            className: "stroke-red-500",
            textClass: "fill-red-400",
            delay: baseDelay + 3.0
        },
    ];

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {items.map(item => (
                    <motion.g
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: item.delay }}
                    >
                        <path
                            d={item.d}
                            transform={item.transform}
                            className={`${item.className} fill-none`}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <text
                            x={0} y={0}
                            transform={item.transform}
                            dx={item.id === 'dilation' ? -10 : 25}
                            dy={item.id === 'dilation' ? 100 : -10}
                            textAnchor="middle"
                            className={`text-sm font-semibold ${item.textClass}`}
                        >
                            {item.label}
                        </text>
                        {item.props && (
                             <text
                                x={0} y={0}
                                transform={item.transform}
                                dx={item.id === 'dilation' ? 50 : 25}
                                dy={item.id === 'dilation' ? 120 : 110}
                                textAnchor="middle"
                                className={`text-xs ${item.textClass} opacity-80`}
                            >
                                {item.props}
                            </text>
                        )}
                    </motion.g>
                ))}
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function Slide4() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] =B(boolean[] = [false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [
        {
          id: 'identifying-transformations-quiz',
          conceptId: 'transformation-identification',
          conceptName: 'Transformation Identification',
          type: 'judging',
          description: 'Testing how to identify transformations'
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
            id: 'identify-size-q1',
            question: "You look at a pre-image and an image. The image is clearly smaller than the pre-image. What transformation *must* be part of the sequence?",
            options: [
                "Reflection",
                "Translation",
                "Rotation",
                "Dilation"
            ],
            correctAnswer: "Dilation",
            explanation: "Correct! Dilation is the only transformation that changes the size of the figure. A scale factor between 0 and 1 was used."
        },
        {
            id: 'identify-orientation-q2',
            question: "A pre-image and image are congruent (same size). The orientation is reversed (it's 'flipped'). What transformation *must* be involved?",
            options: [
                "A translation or a rotation",
                "A reflection or a glide reflection",
                "A dilation",
                "A translation only"
            ],
            correctAnswer: "A reflection or a glide reflection",
            explanation: "Exactly! The only transformations that reverse orientation are reflections (or sequences with an odd number of reflections, like a glide reflection)."
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
            interactionId: `identifying-transformations-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'transformation-identification', conceptName: 'Transformation Identification',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">How to Identify a Transformation</h2>
                        <p className="text-lg leading-relaxed">
                            When you see a pre-image and an image, you can act like a detective. There are two main clues to look for:
                        </p>
                        <ol className="text-lg list-decimal list-inside mt-4 space-y-2">
                            <li><strong>Congruence:</strong> Is the size preserved?</li>
                            <li><strong>Orientation:</strong> Is the vertex order preserved (or flipped)?</li>
                        </ol>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 1: Check for Congruence (Size)</h3>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li>
                                <strong className="text-red-500">NOT Congruent:</strong>
                                <br />
                                <span className="text-slate-600 dark:text-slate-400">If the size changed, a **Dilation** *must* have been used.</span>
                            </li>
                             <li>
                                <strong className="text-green-500">Congruent:</strong>
                                <br />
                                 <span className="text-slate-600 dark:text-slate-400">If the size is the same, it's a **Rigid Transformation** (or sequence). Now go to Step 2.</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Step 2: Check for Orientation (Flip)</h3>
                         <p className="text-lg leading-relaxed">
                           (Only do this if the figures are congruent!)
                        </p>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li>
                                <strong>Orientation Preserved:</strong>
                                <br />
                                <span className="text-slate-600 dark:text-slate-400">The vertex order is the same (e.g., clockwise). This is a **Translation** or a **Rotation**.</span>
                            </li>
                             <li>
                                <strong>Orientation Reversed:</strong>
                                <br />
                                 <span className="text-slate-600 dark:text-slate-400">The figure is a "mirror image" (e.g., flipped from clockwise to counter-clockwise). This is a **Reflection** or a **Glide Reflection**.</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Two Main Clues</h3>
                        <IdentifyTransformAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Use these two checks to narrow down the possibilities.
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
                                                    : 'bg-slate-100 dark:bg-slate-800/3Amplify 30 border border-slate-200 dark:border-slate-700'
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
                                <div className="text-3xl mb-4">🔎</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'Youre a master detective!' : 'Great job!'}
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
            slideId="identifying-type-of-transformation"
            slideTitle="Identifying type of transformation"
            moduleId="transformation-properties-proofs"
            submoduleId="properties-definitions-of-transformations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}