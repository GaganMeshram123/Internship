import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const AxisReflectionShapeAnimation: React.FC = () => {
    const svgWidth = 450; // Wider to fit both reflections
    const svgHeight = 400; // Taller
    const origin = { x: svgWidth / 2, y: svgHeight / 2 };
    const scale = 25;

    // Pre-image vertices from example
    const A = { x: 1, y: 4 };
    const B = { x: 4, y: 1 };
    const C = { x: 2, y: 0 };

    // Reflect over y-axis: (-x, y)
    const A_y = { x: -A.x, y: A.y }; // (-1, 4)
    const B_y = { x: -B.x, y: B.y }; // (-4, 1)
    const C_y = { x: -C.x, y: C.y }; // (-2, 0)

    // Reflect over x-axis: (x, -y)
    const A_x = { x: A.x, y: -A.y }; // (1, -4)
    const B_x = { x: B.x, y: -B.y }; // (4, -1)
    const C_x = { x: C.x, y: -C.y }; // (2, 0) - C is on x-axis

    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgA = toSvg(A); const svgB = toSvg(B); const svgC = toSvg(C);
    const svgA_y = toSvg(A_y); const svgB_y = toSvg(B_y); const svgC_y = toSvg(C_y);
    const svgA_x = toSvg(A_x); const svgB_x = toSvg(B_x); const svgC_x = toSvg(C_x);

    const duration = 1.0;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Axes */}
                <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} className="stroke-blue-500" strokeWidth="1.5" /> {/* X-Axis */}
                <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} className="stroke-blue-500" strokeWidth="1.5" /> {/* Y-Axis */}
                <circle cx={origin.x} cy={origin.y} r={3} className="fill-slate-400" />
                <text x={svgWidth - 10} y={origin.y + 15} className="fill-blue-400 text-xs font-semibold">x-axis</text>
                <text x={origin.x + 5} y={15} className="fill-blue-400 text-xs font-semibold">y-axis</text>

                {/* Pre-image Triangle (Blue) */}
                <motion.polygon points={`${svgA.x},${svgA.y} ${svgB.x},${svgB.y} ${svgC.x},${svgC.y}`}
                    className="fill-blue-600 opacity-60 stroke-blue-800 stroke-1"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 0.5 }} />
                <text x={svgA.x - 5} y={svgA.y - 8} className="fill-blue-200 font-bold text-xs">A</text>
                <text x={svgB.x + 5} y={svgB.y + 15} className="fill-blue-200 font-bold text-xs">B</text>
                <text x={svgC.x + 5} y={svgC.y + 15} className="fill-blue-200 font-bold text-xs">C</text>

                {/* Reflection over y-axis (Green) - Fades in */}
                <motion.polygon points={`${svgA_y.x},${svgA_y.y} ${svgB_y.x},${svgB_y.y} ${svgC_y.x},${svgC_y.y}`}
                    className="fill-green-600 opacity-60 stroke-green-800 stroke-1"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: delay, duration: duration }} />
                 <motion.text x={svgA_y.x + 5} y={svgA_y.y - 8} className="fill-green-200 font-bold text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration }}>A'</motion.text>
                 <motion.text x={svgB_y.x - 15} y={svgB_y.y + 15} className="fill-green-200 font-bold text-xs"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration }}>B'</motion.text>
                 <motion.text x={svgC_y.x - 15} y={svgC_y.y + 15} className="fill-green-200 font-bold text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration }}>C'</motion.text>


                {/* Reflection over x-axis (Orange) - Fades in later */}
                 <motion.polygon points={`${svgA_x.x},${svgA_x.y} ${svgB_x.x},${svgB_x.y} ${svgC_x.x},${svgC_x.y}`}
                    className="fill-orange-600 opacity-60 stroke-orange-800 stroke-1"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: delay + duration + 0.5, duration: duration }} />
                 <motion.text x={svgA_x.x - 5} y={svgA_x.y + 15} className="fill-orange-200 font-bold text-xs"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.5 }}>A''</motion.text>
                 <motion.text x={svgB_x.x + 5} y={svgB_x.y - 8} className="fill-orange-200 font-bold text-xs"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.5 }}>B''</motion.text>
                 <motion.text x={svgC_x.x + 5} y={svgC_x.y - 8} className="fill-orange-200 font-bold text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.5 }}>C''</motion.text>


            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function ReflectionsSlide4() {
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
        id: 'reflecting-shapes-axis-quiz',
        conceptId: 'reflecting-shapes',
        conceptName: 'Reflecting Shapes (Axis)',
        type: 'judging',
        description: 'Testing applying axis reflection rules to shapes'
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
            id: 'reflect-shape-y-axis-q1',
             // --- $ SYMBOLS REMOVED ---
            question: "Triangle △ABC has vertex A(1, 4). What is A' after a reflection over the y-axis?",
            options: [
                "A'(-1, 4)",
                "A'(1, -4)",
                "A'(4, 1)",
                "A'(-4, -1)"
            ],
            correctAnswer: "A'(-1, 4)",
            explanation: "Correct! The rule for reflecting over the y-axis is (x, y) → (-x, y). So A(1, 4) becomes A'(-1, 4)."
        },
        { // --- UPDATED Question 2 to use example points ---
            id: 'reflect-shape-x-axis-q2',
             // --- $ SYMBOLS REMOVED ---
            question: "Using the same △ABC with vertex B(4, 1), what are the coordinates of B'' after a reflection over the x-axis?",
            options: [
                "B''(4, -1)",
                "B''(-4, 1)",
                "B''(1, 4)",
                "B''(-1, -4)"
            ],
            correctAnswer: "B''(4, -1)",
            explanation: "Correct! The rule for reflecting over the x-axis is (x, y) → (x, -y). So B(4, 1) becomes B''(4, -1)."
        },
        { // --- ADDED THIRD QUESTION (y-axis again, different point) ---
             id: 'reflect-shape-y-axis-q3',
             question: "Using the same △ABC with vertex C(2, 0), what are the coordinates of C' after a reflection over the y-axis?",
             options: [
                 "C'(0, 2)",
                 "C'(-2, 0)",
                 "C'(2, 0)", // Correct
                 "C'(0, -2)"
             ],
             correctAnswer: "C'(-2, 0)",
             explanation: "Correct! The rule for reflecting over the y-axis is (x, y) → (-x, y). So C(2, 0) becomes C'(-2, 0)."
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
            interactionId: `reflecting-shapes-axis-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'reflecting-shapes', conceptName: 'Reflecting Shapes (Axis)',
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
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Reflecting Shapes (x & y Axis)</h2>
                        <p className="text-lg leading-relaxed">
                            Just like with translations and rotations, the rule is simple: <strong>Reflect the vertices, then reconnect them.</strong>
                        </p>
                    </div>

                    {/* --- EXAMPLE: Y-AXIS ($ Removed, Points Updated) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example 1: Reflect over y-axis</h3>
                        <p className="text-lg leading-relaxed">
                            Reflect △ABC over the y-axis.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 font-mono font-bold text-slate-800 dark:text-slate-100">
                            Rule: (x, y) → (-x, y)
                        </p>
                        <p className="text-lg leading-relaxed mt-4"><strong>Vertices:</strong></p>
                        <ul className="mt-2 space-y-1 text-lg font-mono text-slate-700 dark:text-slate-300">
                             {/* --- Points Updated to match animation --- */}
                            <li>A(1, 4) → A'(-1, 4)</li>
                            <li>B(4, 1) → B'(-4, 1)</li>
                            <li>C(2, 0) → C'(-2, 0)</li>
                        </ul>
                         <p className="text-lg leading-relaxed mt-3 text-blue-600 dark:text-blue-400">
                            Plot A', B', C' and draw the new triangle.
                        </p>
                    </div>

                     {/* --- NEW CARD: EXAMPLE X-AXIS --- */}
                     <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example 2: Reflect over x-axis</h3>
                        <p className="text-lg leading-relaxed">
                            Reflect the *original* △ABC over the x-axis.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 font-mono font-bold text-slate-800 dark:text-slate-100">
                            Rule: (x, y) → (x, -y)
                        </p>
                        <p className="text-lg leading-relaxed mt-4"><strong>Vertices:</strong></p>
                         <ul className="mt-2 space-y-1 text-lg font-mono text-slate-700 dark:text-slate-300">
                            <li>A(1, 4) → A''(1, -4)</li>
                            <li>B(4, 1) → B''(4, -1)</li>
                            <li>C(2, 0) → C''(2, 0) &nbsp; <em className="text-sm non-italic text-slate-500">(Stays the same since it's on the line!)</em></li>
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
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Reflecting △ABC</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <AxisReflectionShapeAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                           △ABC reflects over the y-axis to △A'B'C' (green) and over the x-axis to △A''B''C'' (orange).
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
                                               {/* Display coordinate options with mono font */}
                                               {option.includes('(') ? <span className='font-mono'>{option}</span> : option}
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
                               <div className="text-3xl mb-4">✨</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You\'ve mastered axis reflections!' : 'Great job!'}
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
            slideId="reflecting-shapes" // Keeping original ID, can change if needed
            slideTitle="Reflecting Shapes"
            moduleId="performing-transformations"
            submoduleId="reflections" // Assuming this belongs to reflections submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}