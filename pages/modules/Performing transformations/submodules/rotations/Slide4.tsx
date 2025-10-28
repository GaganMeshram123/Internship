import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const RotatingShapeAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300; // Increased height
    const origin = { x: svgWidth / 2, y: svgHeight / 2 + 30 }; // Shift origin down slightly
    const scale = 25;

    // Pre-image triangle vertices (e.g., A(1,1), B(4,1), C(1,3))
    const A = { x: 1, y: 1 };
    const B = { x: 4, y: 1 };
    const C = { x: 1, y: 3 };

    // Rotation: 90 deg CCW Rule: (x, y) -> (-y, x)
    const A_prime = { x: -A.y, y: A.x }; // (-1, 1)
    const B_prime = { x: -B.y, y: B.x }; // (-1, 4)
    const C_prime = { x: -C.y, y: C.x }; // (-3, 1)


    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgA = toSvg(A);
    const svgB = toSvg(B);
    const svgC = toSvg(C);
    const svgA_prime = toSvg(A_prime);
    const svgB_prime = toSvg(B_prime);
    const svgC_prime = toSvg(C_prime);

    const duration = 1.2;
    const delay = 0.5;

    // Function to generate arc path
    const getArcPath = (startPt: { x: number; y: number }, endPt: { x: number; y: number }) => {
        const radius = Math.sqrt(Math.pow(startPt.x - origin.x, 2) + Math.pow(startPt.y - origin.y, 2));
        // Large arc flag is 0 for 90 deg
        return `M ${startPt.x} ${startPt.y} A ${radius} ${radius} 0 0 1 ${endPt.x} ${endPt.y}`;
    };

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Axes */}
                <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke="#aaa" strokeWidth="1" />
                <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} stroke="#aaa" strokeWidth="1" />
                <circle cx={origin.x} cy={origin.y} r={4} className="fill-slate-400" />
                <text x={origin.x + 5} y={origin.y + 15} className="fill-slate-300 text-xs">(0,0)</text>

                {/* Pre-image Triangle (Blue) */}
                <motion.polygon
                    points={`${svgA.x},${svgA.y} ${svgB.x},${svgB.y} ${svgC.x},${svgC.y}`}
                    className="fill-blue-600 opacity-70 stroke-blue-800 stroke-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 0.5 }}
                />
                <text x={svgA.x + 5} y={svgA.y + 15} className="fill-blue-200 font-bold text-xs">A</text>
                <text x={svgB.x + 5} y={svgB.y + 15} className="fill-blue-200 font-bold text-xs">B</text>
                <text x={svgC.x - 15} y={svgC.y} className="fill-blue-200 font-bold text-xs">C</text>

                {/* Animated Arcs for Vertices */}
                {[svgA, svgB, svgC].map((p, i) => {
                    const p_prime = [svgA_prime, svgB_prime, svgC_prime][i];
                    const arcPath = getArcPath(p, p_prime);
                    return (
                        <motion.path
                            key={`arc-${i}`}
                            d={arcPath}
                            fill="none"
                            className="stroke-orange-400 opacity-70"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                             initial={{ pathLength: 0, opacity: 0 }}
                             animate={{ pathLength: 1, opacity: 0.7 }}
                             transition={{ delay: delay + i * 0.1, duration: duration, ease: "linear" }}
                        />
                    );
                })}


                {/* Animated Image Vertices (landing points) */}
                {[svgA_prime, svgB_prime, svgC_prime].map((p, i) => (
                    <motion.circle
                        key={`p-prime-${i}`}
                        r={4}
                        className="fill-green-500" // Use green for image points
                        initial={{ cx: [svgA, svgB, svgC][i].x, cy: [svgA, svgB, svgC][i].y, opacity: 0, scale: 0 }}
                        animate={{ cx: p.x, cy: p.y, opacity: 1, scale: 1 }}
                        transition={{ delay: delay + i * 0.1, duration: duration, ease: 'easeOut' }}
                    />
                ))}
                 <motion.text
                   x={svgA_prime.x - 15} y={svgA_prime.y + 5} className="fill-green-200 font-bold text-xs"
                   initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: delay + duration}}
                 >A'</motion.text>
                 <motion.text
                    x={svgB_prime.x - 15} y={svgB_prime.y - 5} className="fill-green-200 font-bold text-xs"
                    initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: delay + 0.1 + duration}}
                  >B'</motion.text>
                  <motion.text
                    x={svgC_prime.x - 15} y={svgC_prime.y + 5} className="fill-green-200 font-bold text-xs"
                    initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: delay + 0.2 + duration}}
                  >C'</motion.text>


                {/* Image Triangle (Reconnects after points land) */}
                <motion.polygon
                    points={`${svgA.x},${svgA.y} ${svgB.x},${svgB.y} ${svgC.x},${svgC.y}`} // Start at original
                    className="fill-green-600 opacity-70 stroke-green-800 stroke-1"
                    initial={{ opacity: 0 }}
                    animate={{
                        points: `${svgA_prime.x},${svgA_prime.y} ${svgB_prime.x},${svgB_prime.y} ${svgC_prime.x},${svgC_prime.y}`,
                        opacity: 0.7
                    }}
                    transition={{ delay: delay, duration: duration, ease: 'easeOut' }} // Animate points attribute
                />
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function RotationsSlide4() {
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
        id: 'rotating-shapes-concept-quiz',
        conceptId: 'rotating-shapes',
        conceptName: 'Rotating Shapes',
        type: 'judging',
        description: 'Testing the concept of rotating shapes using vertices'
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
            id: 'shape-rotation-concept-q1',
            // --- $ SYMBOLS REMOVED ---
            question: "To rotate a triangle △XYZ 90° around the origin, what is the process?",
            options: [
                'Find the center of the triangle and rotate that one point.',
                'Rotate point X, then guess where Y and Z go.',
                "Apply the 90° rule (x, y) → (-y, x) to all three vertices, X, Y, and Z, then reconnect.", // Added reconnect
                'Flip the triangle over the y-axis.'
            ],
            // --- Updated correct answer text ---
            correctAnswer: "Apply the 90° rule (x, y) → (-y, x) to all three vertices, X, Y, and Z, then reconnect.",
            explanation: 'Exactly! You apply the same rotation rule to every single vertex (corner) of the shape, then you reconnect the new vertices to form the image.'
        },
        { // --- ADDED SECOND QUESTION ---
             id: 'shape-rotation-apply-q2',
             question: "Square DEFG has vertex E at (5, -3). If the square is rotated 180° around the origin, what are the coordinates of E'?",
             options: [
                 "E'(3, 5)",
                 "E'(-3, -5)",
                 "E'(-5, 3)",
                 "E'(5, 3)"
             ],
             correctAnswer: "E'(-5, 3)",
             explanation: "Correct! The rule for 180° is (x, y) → (-x, -y). So, E(5, -3) becomes E'(-5, -(-3)) = E'(-5, 3)."
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
            interactionId: `rotating-shapes-concept-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'rotating-shapes', conceptName: 'Rotating Shapes',
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto ">

                {/* Left Column - Content */}
                <div className="space-y-6">
                    {/* --- CARD 1 UPDATED (Analogy added) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Rotating a Whole Shape</h2>
                        <p className="text-lg leading-relaxed">
                            Just like with translations, we have a simple trick for rotating a whole polygon (like a triangle or rectangle).
                        </p>
                        <p className="text-lg leading-relaxed mt-4 font-bold">
                            You don't rotate the *shape*... you rotate its **vertices** (corners)!
                        </p>
                         {/* --- ANALOGY ADDED --- */}
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                           Think: Spinning a piece of paper pinned at the center. You only need to track where the corners go. 📌
                         </em>
                    </div>

                    {/* --- CARD 2 UPDATED (Colors & Symbols) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The 3-Step Process</h3>
                        <ul className="mt-4 space-y-3 text-lg">
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">1.</span>
                                <span>List the coordinates of the pre-image's vertices (e.g., A, B, C).</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">2.</span>
                                <span>Apply the chosen rotation rule (like (x, y) → (-y, x)) to *each vertex* to find the new coordinates (A', B', C').</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">3.</span>
                                <span>Plot the new vertices and reconnect them to draw the image.</span>
                            </li>
                        </ul>
                    </div>

                     {/* --- NEW CARD: Concrete Example --- */}
                     <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                         <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Quick Example: 90° CCW</h3>
                         <p className="text-lg leading-relaxed">Let's rotate △PQR with P(1, 2), Q(3, 4), R(1, 4) using the rule (x, y) → (-y, x):</p>
                         <ul className="mt-4 space-y-2 text-lg font-mono text-slate-700 dark:text-slate-300">
                             <li>P(1, 2) → P'(-2, 1)</li>
                             <li>Q(3, 4) → Q'(-4, 3)</li>
                             <li>R(1, 4) → R'(-4, 1)</li>
                         </ul>
                         <p className="text-lg leading-relaxed mt-2 text-blue-600 dark:text-blue-400">Plot P', Q', R' and connect them!</p>
                     </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Rotate the Vertices, Reconnect</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <RotatingShapeAnimation />
                       
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Each vertex (A, B, C) follows the same rotation path to create the new image (A', B', C').
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD (Colors Fixed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                         {/* ... Keep entire quiz section as is ... */}
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
                                 {/* --- Answer Options (COLORS UPDATED) --- */}
                                <div className="space-y-3">
                                    {questions[currentQuestionIndex].options.map((option, idx) => {
                                        const disabled = showFeedback;
                                        const selected = selectedAnswer === option;
                                        const correct = option === questions[currentQuestionIndex].correctAnswer;
                                        const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${ // Removed font-mono from options
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
                                                {/* Display option text directly */}
                                                {option.includes('→') ? 
                                                  <span className="font-mono">{option}</span> : 
                                                  option
                                                }
                                            </motion.button>
                                        );
                                    })}
                                </div>
                                {/* --- Feedback Box (COLORS UPDATED) --- */}
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
                                <div className="text-3xl mb-4">🧩</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You understand the core process!' : 'Great job!'}
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
            slideId="rotating-shapes"
            slideTitle="Rotating Shapes"
            moduleId="performing-transformations"
            submoduleId="rotations" // Assuming this belongs to rotations submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}