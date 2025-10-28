import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Assume correct import paths
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const EnlargeReduceAnimation: React.FC = () => {
    const svgWidth = 450;
    const svgHeight = 350; // Taller for two examples
    const origin = { x: svgWidth / 2, y: svgHeight / 2 };
    const scale = 20; // Pixels per unit

    // Example 1: Enlargement (PQR)
    const P1 = { x: 1, y: 3 }; const Q1 = { x: 3, y: 1 }; const R1 = { x: 1, y: 1 };
    const k_enlarge = 2;
    const P1_prime = { x: P1.x * k_enlarge, y: P1.y * k_enlarge }; // (2, 6)
    const Q1_prime = { x: Q1.x * k_enlarge, y: Q1.y * k_enlarge }; // (6, 2)
    const R1_prime = { x: R1.x * k_enlarge, y: R1.y * k_enlarge }; // (2, 2)

    // Example 2: Reduction (ABC) - Offset slightly for visibility if needed
    const P2 = { x: 3, y: 6 }; const Q2 = { x: -9, y: 3 }; const R2 = { x: 0, y: -6 };
    const k_reduce = 1/3;
    const P2_prime = { x: P2.x * k_reduce, y: P2.y * k_reduce }; // (1, 2)
    const Q2_prime = { x: Q2.x * k_reduce, y: Q2.y * k_reduce }; // (-3, 1)
    const R2_prime = { x: R2.x * k_reduce, y: R2.y * k_reduce }; // (0, -2)


    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgP1 = toSvg(P1); const svgQ1 = toSvg(Q1); const svgR1 = toSvg(R1);
    const svgP1_prime = toSvg(P1_prime); const svgQ1_prime = toSvg(Q1_prime); const svgR1_prime = toSvg(R1_prime);

    const svgP2 = toSvg(P2); const svgQ2 = toSvg(Q2); const svgR2 = toSvg(R2);
    const svgP2_prime = toSvg(P2_prime); const svgQ2_prime = toSvg(Q2_prime); const svgR2_prime = toSvg(R2_prime);


    const duration = 1.0;
    const delay = 0.3;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                 {/* Axes */}
                 <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke="#aaa" strokeWidth="0.5" />
                 <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} stroke="#aaa" strokeWidth="0.5" />
                 <circle cx={origin.x} cy={origin.y} r={3} className="fill-slate-400" />

                 {/* --- Enlargement Example (Blue -> Green) --- */}
                 {/* Pre-image PQR */}
                 <polygon points={`${svgP1.x},${svgP1.y} ${svgQ1.x},${svgQ1.y} ${svgR1.x},${svgR1.y}`}
                    className="fill-blue-600 opacity-50 stroke-blue-800 stroke-1" />
                 <text x={svgP1.x - 5} y={svgP1.y - 5} className="fill-blue-300 text-xs">P</text>
                 <text x={svgQ1.x + 5} y={svgQ1.y + 5} className="fill-blue-300 text-xs">Q</text>
                 <text x={svgR1.x - 10} y={svgR1.y + 10} className="fill-blue-300 text-xs">R</text>

                 {/* Image P'Q'R' */}
                 <motion.polygon points={`${svgP1.x},${svgP1.y} ${svgQ1.x},${svgQ1.y} ${svgR1.x},${svgR1.y}`}
                    className="fill-green-600 opacity-50 stroke-green-800 stroke-1"
                    initial={{ opacity: 0 }}
                    animate={{
                        points: `${svgP1_prime.x},${svgP1_prime.y} ${svgQ1_prime.x},${svgQ1_prime.y} ${svgR1_prime.x},${svgR1_prime.y}`,
                        opacity: 0.5
                    }}
                    transition={{ delay: delay, duration: duration }} />
                 <motion.text x={svgP1_prime.x - 5} y={svgP1_prime.y - 5} className="fill-green-300 text-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay+duration }}>P' (k=2)</motion.text>


                 {/* --- Reduction Example (Red -> Orange) --- */}
                  {/* Pre-image ABC */}
                  <polygon points={`${svgP2.x},${svgP2.y} ${svgQ2.x},${svgQ2.y} ${svgR2.x},${svgR2.y}`}
                     className="fill-red-600 opacity-50 stroke-red-800 stroke-1" />
                  <text x={svgP2.x + 5} y={svgP2.y - 5} className="fill-red-300 text-xs">A</text>
                  <text x={svgQ2.x - 5} y={svgQ2.y - 5} className="fill-red-300 text-xs">B</text>
                  <text x={svgR2.x + 5} y={svgR2.y + 5} className="fill-red-300 text-xs">C</text>

                   {/* Image A'B'C' */}
                   <motion.polygon points={`${svgP2.x},${svgP2.y} ${svgQ2.x},${svgQ2.y} ${svgR2.x},${svgR2.y}`}
                     className="fill-orange-600 opacity-50 stroke-orange-800 stroke-1"
                     initial={{ opacity: 0 }}
                     animate={{
                         points: `${svgP2_prime.x},${svgP2_prime.y} ${svgQ2_prime.x},${svgQ2_prime.y} ${svgR2_prime.x},${svgR2_prime.y}`,
                         opacity: 0.5
                     }}
                     transition={{ delay: delay + duration + 0.5, duration: duration }} />
                 <motion.text x={svgP2_prime.x + 5} y={svgP2_prime.y + 5} className="fill-orange-300 text-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay+duration*2+0.5 }}>A' (k=1/3)</motion.text>

            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function DilationsSlide4() {
    // ... (Keep existing state and handlers)
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    // --- UPDATED FOR 2 QUESTIONS ---
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [
      {
        id: 'dilating-shapes-expand-reduce-quiz', // Updated ID
        conceptId: 'dilating-shapes', // Combined concept
        conceptName: 'Dilating Shapes (Expand/Reduce)', // Updated Name
        type: 'judging',
        description: 'Testing applying dilation rules to shapes' // Updated Desc
      }
    ];

    interface QuizQuestion {
        id: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }

    // --- UPDATED QUESTIONS ARRAY (2 QUESTIONS) ---
    const questions: QuizQuestion[] = [
        {
            id: 'enlargement-vertex-q1',
            // --- $ SYMBOLS REMOVED ---
            question: "Triangle △PQR has vertex P(1, 3). What is P' after a dilation from the origin by k=2?",
            options: [
                "P'(3, 5)",
                "P'(2, 6)", // Correct
                "P'(0.5, 1.5)",
                "P'(-3, 1)"
            ],
            correctAnswer: "P'(2, 6)",
            explanation: "Correct! Apply the rule (x, y) → (kx, ky). So, (2 * 1, 2 * 3) → (2, 6)."
        },
        { // --- ADDED SECOND QUESTION (Reduction) ---
            id: 'reduction-vertex-q2',
            question: "Using △ABC from the reduction example with B(-9, 3), what is B' after dilating by k=1/3 from the origin?",
             options: [
                 "B'(-3, 1)", // Correct
                 "B'(-27, 9)",
                 "B'(1, -3)",
                 "B'(-9, 1)"
             ],
             correctAnswer: "B'(-3, 1)",
             explanation: "Correct! Multiply both coordinates by 1/3: (-9 * 1/3, 3 * 1/3) → (-3, 1)."
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
            interactionId: `dilating-shapes-expand-reduce-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`, // Updated ID
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'dilating-shapes', conceptName: 'Dilating Shapes (Expand/Reduce)', // Updated Name
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Dilating Shapes: Expanding</h2>
                        <p className="text-lg leading-relaxed">
                            An <strong>enlargement</strong> makes the shape bigger. This happens when the scale factor k is greater than 1 (e.g., k=2, k=3.5).
                        </p>
                    </div>

                    {/* --- CARD 2 UPDATED (Example 1, $ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Enlarge by k=2</h3>
                        <p className="text-lg leading-relaxed">
                            Dilate △PQR from the origin by k=2.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 font-mono font-bold text-slate-800 dark:text-slate-100">
                            Rule: (x, y) → (2x, 2y)
                        </p>
                        <p className="text-lg leading-relaxed mt-4"><strong>Vertices:</strong></p>
                        <ul className="mt-2 space-y-1 text-lg font-mono text-slate-700 dark:text-slate-300">
                            <li>P(1, 3) → P'(2, 6)</li>
                            <li>Q(3, 1) → Q'(6, 2)</li>
                            <li>R(1, 1) → R'(2, 2)</li>
                        </ul>
                        <p className="text-lg leading-relaxed mt-3 text-slate-600 dark:text-slate-400">
                            The new triangle △P'Q'R' is the same shape, but twice as big and twice as far from the origin.
                        </p>
                    </div>

                    {/* --- CARD 3 UPDATED (Shrinking Concept, $ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Dilating Shapes: Shrinking</h2>
                        <p className="text-lg leading-relaxed">
                           A <strong>reduction</strong> makes the shape **smaller**. This happens when the scale factor k is between 0 and 1 (e.g., k=1/2, k=0.5, k=1/3).
                        </p>
                    </div>

                    {/* --- CARD 4 UPDATED (Example 2, $ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Reduce by k=1/3</h3>
                        <p className="text-lg leading-relaxed">
                            Dilate △ABC from the origin by k=1/3.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 font-mono font-bold text-slate-800 dark:text-slate-100">
                           Rule: (x, y) → (1/3 x, 1/3 y)
                        </p>
                        <p className="text-lg leading-relaxed mt-4"><strong>Vertices:</strong></p>
                        <ul className="mt-2 space-y-1 text-lg font-mono text-slate-700 dark:text-slate-300">
                            <li>A(3, 6) → A'(1, 2)</li>
                            <li>B(-9, 3) → B'(-3, 1)</li>
                            <li>C(0, -6) → C'(0, -2)</li>
                        </ul>
                         <p className="text-lg leading-relaxed mt-3 text-slate-600 dark:text-slate-400">
                            The new triangle △A'B'C' is the same shape, but 1/3 the size and 1/3 the distance from the origin.
                        </p>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                         {/* --- Title Updated --- */}
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Enlargement & Reduction Examples</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <EnlargeReduceAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Visualizing both the enlargement (k=2) and reduction (k=1/3) examples from the origin.
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD (Colors Fixed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                         {/* ... Keep entire quiz section as is, but now uses 2 questions ... */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
                            <div className="text-lg text-slate-600 dark:text-slate-400">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </div>
                        </div>
                         {/* --- Progress Bar (COLOR UPDATED) --- */}
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
                                        const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${ // Removed font-mono base
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
                                               {/* Apply mono font only to coordinate options */}
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
                                <div className="text-3xl mb-4">📏</div> {/* Updated Emoji */}
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? "You're an expert at resizing!" : 'Great job!'}
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
            slideId="dilating-shapes-expanding-reducing" // Updated ID
            slideTitle="Dilating Shapes: Expanding & Reducing" // Updated Title
            moduleId="performing-transformations"
            submoduleId="dilations" // Assuming this belongs to dilations submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}