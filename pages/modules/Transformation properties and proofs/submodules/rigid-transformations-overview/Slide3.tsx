import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const OrientationAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300;
    
    // A simple "F" shape
    const fPath = "M 0 0 L 0 100 L 50 100 M 0 50 L 40 50";

    const items = [
        {
            id: 'pre-image',
            d: fPath,
            transform: 'translate(80, 50)',
            label: "Pre-Image (ABC)",
            order: "(Clockwise)",
            className: "stroke-blue-500",
            textClass: "fill-blue-400",
            delay: 0.5
        },
        {
            id: 'translation',
            d: fPath,
            transform: 'translate(250, 50)',
            label: "Translation (A'B'C')",
            order: "(Clockwise)",
            className: "stroke-green-500",
            textClass: "fill-green-400",
            delay: 1.0
        },
        {
            id: 'reflection',
            d: fPath,
            transform: 'translate(80, 200) scale(1, -1) translate(0, -100)',
            label: "Reflection (A''B''C'')",
            order: "(Counter-Clockwise)",
            className: "stroke-orange-500",
            textClass: "fill-orange-400",
            delay: 1.5
        }
    ];

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Line of Reflection */}
                <motion.line
                    x1="0" y1="175" x2={svgWidth} y2="175"
                    className="stroke-slate-400 dark:stroke-slate-500"
                    strokeWidth="1" strokeDasharray="4 4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                />
                <motion.text
                    x="260" y="165"
                    className="fill-slate-400 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                >
                    Line of Reflection
                </motion.text>
                
                {items.map(item => (
                    <motion.g
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: item.delay, duration: 0.5 }}
                    >
                        <path
                            d={item.d}
                            transform={item.transform}
                            className={`${item.className} fill-none`}
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <text
                            x={item.id === 'translation' ? 250 : 80}
                            y={item.id === 'reflection' ? 220 : 30}
                            textAnchor="middle"
                            className={`text-sm font-semibold ${item.textClass}`}
                        >
                            {item.label}
                        </text>
                         <text
                            x={item.id === 'translation' ? 250 : 80}
                            y={item.id === 'reflection' ? 240 : 170}
                            textAnchor="middle"
                            className={`text-xs ${item.textClass} opacity-80`}
                        >
                            {item.order}
                        </text>
                    </motion.g>
                ))}
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function Slide3() {
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
          id: 'preserved-properties-quiz',
          conceptId: 'rigid-transformations-properties',
          conceptName: 'Rigid Transformation Properties',
          type: 'judging',
          description: 'Testing understanding of orientation and preserved properties'
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
            id: 'orientation-q1',
            question: "Which rigid transformation is an 'opposite isometry,' meaning it *reverses* orientation?",
            options: [
                "Translation",
                "Rotation",
                "Reflection",
                "Dilation"
            ],
            correctAnswer: "Reflection",
            explanation: "Correct! Reflections 'flip' the shape, reversing the vertex order (like from clockwise to counter-clockwise). Translations and rotations only slide or turn it."
        },
        {
            id: 'identify-transformation-q2',
            question: "A shape's vertices are A, B, C in clockwise order. After a transformation, the image's vertices A', B', C' are *still* in clockwise order. What transformation could *NOT* have happened?",
            options: [
                "A translation",
                "A rotation",
                "A reflection",
                "A 360° rotation"
            ],
            correctAnswer: "A reflection",
            explanation: "Exactly! A reflection *must* reverse the orientation. Since the orientation is the same (clockwise), a reflection is the one transformation that is ruled out."
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
            interactionId: `preserved-properties-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'rigid-transformations-properties', conceptName: 'Rigid Transformation Properties',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Recap: What is an Isometry?</h2>
                        <p className="text-lg leading-relaxed">
                            A rigid transformation is also called an **isometry**.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                           The name comes from Greek: *iso-* (equal) and *-metry* (measure).
                        </p>
                         <p className="text-lg leading-relaxed mt-3">
                           All 3 rigid transformations (translation, rotation, reflection) are isometries because they preserve the "measure" of:
                        </p>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2 font-mono">
                            <li>📏 Distance (Side Lengths)</li>
                            <li>📐 Angle Measure</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Key Difference: Orientation</h3>
                        <p className="text-lg leading-relaxed">
                           There is one property that splits these three transformations into two groups: **orientation**.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                            <strong>Orientation</strong> is the order in which a shape's vertices are labeled (e.g., clockwise or counter-clockwise).
                        </p>
                        <ul className="text-lg mt-4 space-y-3">
                            <li>
                                <strong>Direct Isometry (Preserves Orientation):</strong>
                                <br />
                                <span className="text-slate-600 dark:text-slate-400">The shape just slides or turns.</span>
                                <div className="flex space-x-2 mt-1"><span className="font-mono bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-md">Translation</span> <span className="font-mono bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-md">Rotation</span></div>
                            </li>
                            <li>
                                <strong>Opposite Isometry (Reverses Orientation):</strong>
                                <br />
                                <span className="text-slate-600 dark:text-slate-400">The shape is "flipped" into a mirror image.</span>
                                <div className="flex space-x-2 mt-1"><span className="font-mono bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-md">Reflection</span></div>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Summary of Properties</h3>
                        <p className="text-lg leading-relaxed">
                           Here is the complete breakdown for rigid transformations.
                        </p>
                        {/* A simple table is clearer here */}
                        <table className="w-full mt-4 text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-100 dark:bg-slate-700">
                                    <th className="p-2 border-b-2 dark:border-slate-600">Transformation</th>
                                    <th className="p-2 border-b-2 dark:border-slate-600 text-center">Preserves Distance?</th>
                                    <th className="p-2 border-b-2 dark:border-slate-600 text-center">Preserves Angles?</th>
                                    <th className="p-2 border-b-2 dark:border-slate-600 text-center">Preserves Orientation?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b dark:border-slate-700">
                                    <td className="p-2 font-mono">Translation</td>
                                    <td className="p-2 text-center text-green-500">✔️ Yes</td>
                                    <td className="p-2 text-center text-green-500">✔️ Yes</td>
                                    <td className="p-2 text-center text-green-500">✔️ Yes</td>
                                </tr>
                                <tr className="border-b dark:border-slate-700">
                                    <td className="p-2 font-mono">Rotation</td>
                                    <td className="p-2 text-center text-green-500">✔️ Yes</td>
                                    <td className="p-2 text-center text-green-500">✔️ Yes</td>
                                    <td className="p-2 text-center text-green-500">✔️ Yes</td>
                                </tr>
                                <tr>
                                    <td className="p-2 font-mono">Reflection</td>
                                    <td className="p-2 text-center text-green-500">✔️ Yes</td>
                                    <td className="p-2 text-center text-green-500">✔️ Yes</td>
                                    <td className="p-2 text-center text-red-500">❌ No</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Orientation: Slide vs. Flip</h3>
                        <OrientationAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Notice the "F" can be slid (translated) and still read as an "F". When reflected, it's flipped to a mirror image.
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
                                <div className="text-3xl mb-4">🔄</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You know your properties!' : 'Great work!'}
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
            slideId="preserved-properties"
            slideTitle="Rigid transformations: preserved properties"
            moduleId="transformation-properties-proofs"
            submoduleId="rigid-transformations-overview"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}