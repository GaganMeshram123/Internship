import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const DiagonalReflectionShapeAnimation: React.FC = () => {
    const svgWidth = 450;
    const svgHeight = 400; // Increased height
    const origin = { x: svgWidth / 2, y: svgHeight / 2 };
    const scale = 25;

    // Pre-image vertices from example
    const A = { x: 1, y: 4 };
    const B = { x: 4, y: 1 };
    const C = { x: 2, y: 0 };

    // Reflect over y=x: (y, x)
    const A_yx = { x: A.y, y: A.x }; // (4, 1) - Same as B!
    const B_yx = { x: B.y, y: B.x }; // (1, 4) - Same as A!
    const C_yx = { x: C.y, y: C.x }; // (0, 2)

    // Reflect over y=-x: (-y, -x)
    const A_ynx = { x: -A.y, y: -A.x }; // (-4, -1)
    const B_ynx = { x: -B.y, y: -B.x }; // (-1, -4)
    const C_ynx = { x: -C.y, y: -C.x }; // (0, -2)


    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgA = toSvg(A); const svgB = toSvg(B); const svgC = toSvg(C);
    const svgA_yx = toSvg(A_yx); const svgB_yx = toSvg(B_yx); const svgC_yx = toSvg(C_yx);
    const svgA_ynx = toSvg(A_ynx); const svgB_ynx = toSvg(B_ynx); const svgC_ynx = toSvg(C_ynx);

     // Lines y=x and y=-x
     const lineYeqX = { x1: 0, y1: svgHeight, x2: svgWidth, y2: 0 };
     const lineYeqNegX = { x1: 0, y1: 0, x2: svgWidth, y2: svgHeight };

    const duration = 1.0;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Axes */}
                <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke="#aaa" strokeWidth="0.5" />
                <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} stroke="#aaa" strokeWidth="0.5" />
                <circle cx={origin.x} cy={origin.y} r={3} className="fill-slate-400" />

                 {/* Line y=x (Blue, Dashed) */}
                 <line x1={lineYeqX.x1} y1={lineYeqX.y1} x2={lineYeqX.x2} y2={lineYeqX.y2} className="stroke-blue-500" strokeWidth="1.5" strokeDasharray="5 5" />
                 <text x={svgWidth - 15} y={15} className="fill-blue-400 text-xs font-semibold">y=x</text>

                 {/* Line y=-x (Red, Dashed) */}
                <line x1={lineYeqNegX.x1} y1={lineYeqNegX.y1} x2={lineYeqNegX.x2} y2={lineYeqNegX.y2} className="stroke-red-500" strokeWidth="1.5" strokeDasharray="5 5" />
                <text x={svgWidth - 15} y={svgHeight-5} className="fill-red-400 text-xs font-semibold">y=-x</text>

                {/* Pre-image Triangle (Blue) */}
                <motion.polygon points={`${svgA.x},${svgA.y} ${svgB.x},${svgB.y} ${svgC.x},${svgC.y}`}
                    className="fill-blue-600 opacity-60 stroke-blue-800 stroke-1"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 0.5 }} />
                <text x={svgA.x - 5} y={svgA.y - 8} className="fill-blue-200 font-bold text-xs">A</text>
                <text x={svgB.x + 5} y={svgB.y + 15} className="fill-blue-200 font-bold text-xs">B</text>
                <text x={svgC.x - 15} y={svgC.y + 5} className="fill-blue-200 font-bold text-xs">C</text>

                 {/* Reflection over y=x (Green) */}
                 <motion.polygon points={`${svgA_yx.x},${svgA_yx.y} ${svgB_yx.x},${svgB_yx.y} ${svgC_yx.x},${svgC_yx.y}`}
                    className="fill-green-600 opacity-60 stroke-green-800 stroke-1"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: delay, duration: duration }} />
                 <motion.text x={svgA_yx.x + 5} y={svgA_yx.y + 15} className="fill-green-200 font-bold text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration }}>A' (over y=x)</motion.text>
                 {/* B'yx overlaps A */}
                 <motion.text x={svgC_yx.x - 15} y={svgC_yx.y - 5} className="fill-green-200 font-bold text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration }}>C'</motion.text>

                 {/* Reflection over y=-x (Orange) */}
                 <motion.polygon points={`${svgA_ynx.x},${svgA_ynx.y} ${svgB_ynx.x},${svgB_ynx.y} ${svgC_ynx.x},${svgC_ynx.y}`}
                    className="fill-orange-600 opacity-60 stroke-orange-800 stroke-1"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: delay + duration + 0.5, duration: duration }} />
                 <motion.text x={svgA_ynx.x + 5} y={svgA_ynx.y + 15} className="fill-orange-200 font-bold text-xs"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.5 }}>A'' (over y=-x)</motion.text>
                 <motion.text x={svgB_ynx.x - 5} y={svgB_ynx.y - 8} className="fill-orange-200 font-bold text-xs"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.5 }}>B''</motion.text>
                 <motion.text x={svgC_ynx.x + 8} y={svgC_ynx.y + 5} className="fill-orange-200 font-bold text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.5 }}>C''</motion.text>

            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function ReflectionsSlide5() {
    // ... (Keep existing state and handlers)
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    // --- UPDATED FOR 3 QUESTIONS ---
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [
      {
        id: 'reflecting-shapes-diagonal-quiz',
        conceptId: 'reflecting-shapes',
        conceptName: 'Reflecting Shapes (Diagonal)',
        type: 'judging',
        description: 'Testing applying diagonal reflection rules to shapes'
      }
    ];

    interface QuizQuestion {
        id: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }

     // --- UPDATED QUESTIONS ARRAY (3 QUESTIONS) ---
    const questions: QuizQuestion[] = [
        {
            id: 'reflect-shape-y-equals-x-q1',
            // --- $ SYMBOLS REMOVED ---
            question: "Triangle △ABC has vertex A(1, 4). What is A' after a reflection over the line y = x?",
            options: [
                "A'(-1, 4)",
                "A'(4, 1)", // Correct
                "A'(1, -4)",
                "A'(-4, -1)"
            ],
            correctAnswer: "A'(4, 1)",
            explanation: "Correct! The rule for reflecting over y = x is (x, y) → (y, x). So A(1, 4) becomes A'(4, 1)."
        },
        {
            id: 'reflect-shape-y-equals-neg-x-q2',
             // --- $ SYMBOLS REMOVED ---
            question: "Using the same △ABC with vertex C(2, 0), what are the coordinates of C'' after a reflection over the line y = -x?",
            options: [
                "C''(0, -2)", // Correct
                "C''(-2, 0)",
                "C''(0, 2)",
                "C''(2, 0)"
            ],
            correctAnswer: "C''(0, -2)",
            explanation: "Correct! The rule is (x, y) → (-y, -x). So C(2, 0) becomes C''(-0, -2), which simplifies to C''(0, -2)."
        },
        { // --- ADDED THIRD QUESTION ---
            id: 'find-line-diagonal-q3',
             // --- $ SYMBOLS REMOVED ---
            question: "Pre-image P(-3, 6) reflects to image P'(-6, 3). What is the line of reflection?",
            options: [
                "y = x", // Correct
                "y = -x",
                "x-axis",
                "y-axis"
            ],
            correctAnswer: "y = x",
            explanation: "Correct! The coordinates swapped places: (-3, 6) became (-6, 3). This is the pattern for reflecting over the line y = x."
        }
    ];

    // ... (Keep existing handlers: handleInteractionComplete, handleQuizAnswer, handleNextQuestion)
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
            interactionId: `reflecting-shapes-diagonal-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'reflecting-shapes', conceptName: 'Reflecting Shapes (Diagonal)',
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
             {/* --- UPDATED to 1 column for small screens, 2 for medium and up --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

                {/* Left Column - Content */}
                <div className="space-y-6">
                    {/* --- CARD 1 UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Reflecting Shapes (Diagonal)</h2>
                        <p className="text-lg leading-relaxed">
                            The same process works for diagonal lines: <strong>Reflect the vertices, then reconnect them.</strong>
                        </p>
                    </div>

                    {/* --- EXAMPLE 1 (y=x) UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example 1: Reflect over y = x</h3>
                        <p className="text-lg leading-relaxed">
                            Reflect △ABC over the line y = x.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 font-mono font-bold text-slate-800 dark:text-slate-100">
                            Rule: (x, y) → (y, x)
                        </p>
                        <p className="text-lg leading-relaxed mt-4"><strong>Vertices:</strong></p>
                        <ul className="mt-2 space-y-1 text-lg font-mono text-slate-700 dark:text-slate-300">
                            <li>A(1, 4) → A'(4, 1)</li>
                            <li>B(4, 1) → B'(1, 4)</li>
                            <li>C(2, 0) → C'(0, 2)</li>
                        </ul>
                         <p className="text-lg leading-relaxed mt-3 text-blue-600 dark:text-blue-400">
                            Plot A', B', C' and draw the new triangle.
                        </p>
                    </div>

                    {/* --- NEW CARD: EXAMPLE 2 (y=-x) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example 2: Reflect over y = -x</h3>
                        <p className="text-lg leading-relaxed">
                            Reflect the *original* △ABC over the line y = -x.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 font-mono font-bold text-slate-800 dark:text-slate-100">
                            Rule: (x, y) → (-y, -x)
                        </p>
                        <p className="text-lg leading-relaxed mt-4"><strong>Vertices:</strong></p>
                        <ul className="mt-2 space-y-1 text-lg font-mono text-slate-700 dark:text-slate-300">
                            <li>A(1, 4) → A''(-4, -1)</li>
                            <li>B(4, 1) → B''(-1, -4)</li>
                            <li>C(2, 0) → C''(0, -2)</li>
                        </ul>
                         <p className="text-lg leading-relaxed mt-3 text-blue-600 dark:text-blue-400">
                            Plot A'', B'', C'' and draw the new triangle.
                        </p>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Reflecting △ABC Diagonally</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <DiagonalReflectionShapeAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            △ABC reflects over y=x to △A'B'C' (green) and over y=-x to △A''B''C'' (orange).
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD (Colors Fixed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                         {/* ... Keep entire quiz section as is, but now uses 3 questions ... */}
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
                                        const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${ // Removed font-mono
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
                                               {/* Display coordinate/equation options with mono font */}
                                               {option.includes('(') || option.includes('=') || option.includes('axis') ? <span className='font-mono'>{option}</span> : option}
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
                                                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' // Correct
                                                    : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700' // Incorrect
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
                               <div className="text-3xl mb-4">💫</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You handle diagonal lines like a pro!' : 'Great job!'}
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
            slideId="reflecting-shapes-diagonal"
            slideTitle="Reflecting Shapes: Diagonal Line"
            moduleId="performing-transformations"
            submoduleId="reflections" // Assuming this belongs to reflections submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}