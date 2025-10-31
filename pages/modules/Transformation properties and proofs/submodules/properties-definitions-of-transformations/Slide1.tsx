import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const SequenceAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300;

    const preImageTriangle = "M 100 50 L 150 50 L 100 100 Z";
    // After translation (x + 150)
    const intermediateTriangle = "M 250 50 L 300 50 L 250 100 Z";
    // After reflection across y=150
    const finalTriangle = "M 250 250 L 300 250 L 250 200 Z";

    const lineOfReflection = { x1: 0, y1: 150, x2: svgWidth, y2: 150 };

    const baseDelay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* 1. Pre-Image */}
                <motion.path
                    d={preImageTriangle}
                    className="fill-blue-500 opacity-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: baseDelay, duration: 0.5 }}
                />
                <motion.text x="90" y="40" className="fill-blue-300 text-sm font-semibold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: baseDelay + 0.2 }}
                >
                    Pre-Image
                </motion.text>

                {/* 2. Translation Path */}
                <motion.path
                    d={`M ${116} ${75} L ${266} ${75}`} // Path from center of pre-image to center of intermediate
                    className="stroke-slate-400 dark:stroke-slate-600"
                    strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: baseDelay + 0.8, duration: 0.7 }}
                />
                <motion.text x="160" y="70" className="fill-slate-500 text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: baseDelay + 1.0 }}
                >
                    Step 1: Translate
                </motion.text>
                
                {/* Intermediate (Faded) */}
                <motion.path
                    d={intermediateTriangle}
                    className="fill-gray-400 opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: baseDelay + 1.5 }}
                />

                {/* 3. Line of Reflection */}
                <motion.line
                    x1={lineOfReflection.x1} y1={lineOfReflection.y1}
                    x2={lineOfReflection.x2} y2={lineOfReflection.y2}
                    className="stroke-red-500"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: baseDelay + 1.8, duration: 0.5 }}
                />
                 <motion.text x="280" y="145" className="fill-red-400 text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: baseDelay + 2.0 }}
                >
                    Step 2: Reflect
                </motion.text>

                {/* 4. Final Image */}
                <motion.path
                    d={finalTriangle}
                    className="fill-green-500 opacity-80"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: baseDelay + 2.5, type: 'spring', stiffness: 200, damping: 10 }}
                />
                 <motion.text x="240" y="270" className="fill-green-300 text-sm font-semibold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: baseDelay + 2.7 }}
                >
                    Final Image
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
          id: 'sequences-quiz',
          conceptId: 'sequences-of-transformations',
          conceptName: 'Sequences of Transformations',
          type: 'judging',
          description: 'Testing sequences and glide reflections'
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
            id: 'glide-reflection-q1',
            question: "A 'glide reflection' is a specific sequence of which two transformations?",
            options: [
                "A rotation and a translation",
                "A reflection and a dilation",
                "A translation and a reflection",
                "A rotation and a reflection"
            ],
            correctAnswer: "A translation and a reflection",
            explanation: "Correct! A glide reflection combines the 'glide' (a translation, or slide) with a 'reflection' (a flip)."
        },
        {
            id: 'order-matters-q2',
            question: "True or False: Rotating a shape and *then* translating it always gives the same result as translating first and *then* rotating it.",
            options: [
                "True",
                "False"
            ],
            correctAnswer: "False",
            explanation: "Correct, this is false. The order of transformations often matters! Rotating 90° about the origin then moving right is very different from moving right then rotating 90°."
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
            interactionId: `sequences-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'sequences-of-transformations', conceptName: 'Sequences of Transformations',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Sequences of Transformations</h2>
                        <p className="text-lg leading-relaxed">
                            A <strong>sequence</strong> (or "composition") of transformations is when you apply one transformation, and then apply another transformation *to the result*.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                           You can combine translations, rotations, reflections, and even dilations in any order to map a pre-image to a final image.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Order Often Matters!</h3>
                        <p className="text-lg leading-relaxed">
                           Be careful! The order in which you apply the transformations can change the final result.
                        </p>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li>
                                **Rotate then Translate:** Rotating a shape at the origin and *then* sliding it right...
                            </li>
                            <li>
                                **Translate then Rotate:** ...is *different* from sliding it right and *then* rotating it around the origin.
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Key Vocabulary: Glide Reflection</h3>
                        <p className="text-lg leading-relaxed">
                           A <strong>glide reflection</strong> is a special sequence that combines two specific transformations:
                        </p>
                         <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li className="font-semibold">
                                1. A <strong>Translation</strong> (a "glide")
                            </li>
                             <li className="font-semibold">
                                2. A <strong>Reflection</strong> over a line that is *parallel* to the direction of the translation.
                            </li>
                        </ul>
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                            Think: Walking in the snow 👣. Your left footprint maps to your right footprint by a glide reflection!
                         </em>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing a Sequence</h3>
                        <SequenceAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            This animation shows a translation (Step 1) followed by a reflection (Step 2).
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
                                <div className="text-3xl mb-4">👣</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'Youre on the right path!' : 'Good job!'}
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
            slideId="sequences-of-transformations"
            slideTitle="Sequences of transformations"
            moduleId="transformation-properties-proofs"
            submoduleId="properties-definitions-of-transformations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}