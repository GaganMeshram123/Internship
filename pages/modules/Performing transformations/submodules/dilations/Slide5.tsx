import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const ReductionAnimation: React.FC = () => {
    const svgWidth = 450;
    const svgHeight = 350;
    const origin = { x: svgWidth / 2, y: svgHeight / 2 };
    const scale = 20; // Pixels per unit

    // Pre-image vertices from example
    const P = { x: 4, y: 6 };
    const Q = { x: 6, y: 2 };
    const R = { x: 2, y: 2 };

    // Scale factor
    const k_reduce = 0.5;

    // Image vertices calculated
    const P_prime = { x: P.x * k_reduce, y: P.y * k_reduce }; // (2, 3)
    const Q_prime = { x: Q.x * k_reduce, y: Q.y * k_reduce }; // (3, 1)
    const R_prime = { x: R.x * k_reduce, y: R.y * k_reduce }; // (1, 1)

    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgP = toSvg(P); const svgQ = toSvg(Q); const svgR = toSvg(R);
    const svgP_prime = toSvg(P_prime); const svgQ_prime = toSvg(Q_prime); const svgR_prime = toSvg(R_prime);

    const duration = 1.0;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                 {/* Axes */}
                 <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke="#aaa" strokeWidth="0.5" />
                 <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} stroke="#aaa" strokeWidth="0.5" />
                 <circle cx={origin.x} cy={origin.y} r={3} className="fill-slate-400" />

                 {/* Lines radiating from Origin (visual guide) */}
                 {[svgP, svgQ, svgR].map((pt, i) => (
                    <line key={`line-${i}`} x1={origin.x} y1={origin.y} x2={pt.x} y2={pt.y}
                          className="stroke-slate-400 dark:stroke-slate-600 opacity-30" strokeWidth="0.5" strokeDasharray="2 2"/>
                ))}

                {/* Pre-image Triangle (Blue) */}
                <polygon points={`${svgP.x},${svgP.y} ${svgQ.x},${svgQ.y} ${svgR.x},${svgR.y}`}
                    className="fill-blue-600 opacity-60 stroke-blue-800 stroke-1" />
                <text x={svgP.x} y={svgP.y - 8} textAnchor='middle' className="fill-blue-200 font-bold text-xs">P(4,6)</text>
                <text x={svgQ.x + 5} y={svgQ.y + 5} className="fill-blue-200 font-bold text-xs">Q(6,2)</text>
                <text x={svgR.x - 15} y={svgR.y + 5} className="fill-blue-200 font-bold text-xs">R(2,2)</text>

                {/* Image Triangle (Orange) - Animates shrinking */}
                 <motion.polygon
                    className="fill-orange-600 opacity-60 stroke-orange-800 stroke-1"
                    initial={{ points: `${svgP.x},${svgP.y} ${svgQ.x},${svgQ.y} ${svgR.x},${svgR.y}` }} // Start as pre-image
                    animate={{
                        points: `${svgP_prime.x},${svgP_prime.y} ${svgQ_prime.x},${svgQ_prime.y} ${svgR_prime.x},${svgR_prime.y}` // End as image
                    }}
                    transition={{ delay: delay, duration: duration, ease: 'easeInOut' }}
                />
                <motion.text x={svgP_prime.x} y={svgP_prime.y - 8} textAnchor='middle' className="fill-orange-200 font-bold text-xs"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay+duration }}>P'(2,3)</motion.text>
                 <motion.text x={svgQ_prime.x + 5} y={svgQ_prime.y + 15} className="fill-orange-200 font-bold text-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay+duration }}>Q'(3,1)</motion.text>
                 <motion.text x={svgR_prime.x - 15} y={svgR_prime.y + 15} className="fill-orange-200 font-bold text-xs"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay+duration }}>R'(1,1)</motion.text>

                 {/* Scale factor label */}
                  <motion.text x={svgWidth - 60} y={30} textAnchor='middle' className="fill-orange-400 font-bold text-sm"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay+duration/2 }}>k = 1/2</motion.text>

            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function DilationsSlide5() {
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
        id: 'reduction-quiz',
        conceptId: 'dilating-shapes-shrinking',
        conceptName: 'Dilating Shapes (Shrinking)',
        type: 'judging',
        description: 'Testing how to perform a reduction'
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
            id: 'reduction-vertex-q1',
            // --- $ SYMBOLS REMOVED ---
            question: "Triangle △ABC has a vertex A(8, 4). What is A' after a dilation from the origin by a scale factor of k=0.5?",
            options: [
                "A'(16, 8)",
                "A'(4, 2)", // Correct
                "A'(8.5, 4.5)",
                "A'(-4, -2)"
            ],
            correctAnswer: "A'(4, 2)",
            explanation: "Correct! We use the rule (x, y) → (kx, ky). So, (0.5 * 8, 0.5 * 4) → (4, 2)."
        },
        { // --- ADDED SECOND QUESTION ---
            id: 'reduction-find-k-q2',
            question: "A pre-image point is A(10, -8). Its image after dilation from the origin is A'(5, -4). What is the scale factor k?",
             options: [
                 "k=2",
                 "k=0.5", // Correct
                 "k=-1",
                 "k=5"
             ],
             correctAnswer: "k=0.5",
             explanation: "Correct! Since 5 = 10 * 0.5 and -4 = -8 * 0.5, the image coordinates are 0.5 times the pre-image coordinates. The scale factor is k=0.5 (or 1/2)."
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
            interactionId: `reduction-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'dilating-shapes-shrinking', conceptName: 'Dilating Shapes (Shrinking)',
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
                    {/* --- CARD 1 UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Dilating Shapes: Shrinking</h2>
                        <p className="text-lg leading-relaxed">
                            A <strong>reduction</strong> makes the shape smaller. This happens when the scale factor k is between 0 and 1 (e.g., k=0.5, k=1/4).
                        </p>
                    </div>

                    {/* --- CARD 2 UPDATED (Example, $ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Reduce by k=1/2</h3>
                        <p className="text-lg leading-relaxed">
                            Dilate △PQR from the origin by k=1/2 (or 0.5).
                        </p>
                        <p className="text-lg leading-relaxed mt-4 font-mono font-bold text-slate-800 dark:text-slate-100">
                           Rule: (x, y) → (0.5x, 0.5y)
                        </p>
                        <p className="text-lg leading-relaxed mt-4"><strong>Vertices:</strong></p>
                        <ul className="mt-2 space-y-1 text-lg font-mono text-slate-700 dark:text-slate-300">
                            <li>P(4, 6) → P'(2, 3)</li>
                            <li>Q(6, 2) → Q'(3, 1)</li>
                            <li>R(2, 2) → R'(1, 1)</li>
                        </ul>
                        <p className="text-lg leading-relaxed mt-3 text-slate-600 dark:text-slate-400">
                            The new triangle △P'Q'R' is the same shape, but half as big and half as far from the origin.
                        </p>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Reduction with k=1/2</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <ReductionAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            The vertices of △P'Q'R' are all half as far from the origin as the vertices of △PQR.
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
                                        const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${ // Base font-mono removed
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
                                               {/* Apply mono font only to coordinate/k= options */}
                                               {option.includes('(') || option.includes('k=') ? <span className='font-mono'>{option}</span> : option}
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
                                <div className="text-3xl mb-4">➖</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? "You're an expert at shrinking!" : 'Great job!'}
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
            slideId="dilating-shapes-shrinking" // Keeping original ID
            slideTitle="Dilating Shapes: Shrinking" // Keeping original Title
            moduleId="performing-transformations"
            submoduleId="dilations" // Assuming this belongs to dilations submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}