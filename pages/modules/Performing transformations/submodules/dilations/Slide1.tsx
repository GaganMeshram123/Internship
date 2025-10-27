import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const DilatingPointAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300; // Increased height
    const origin = { x: 50, y: svgHeight - 50 }; // Origin bottom-left
    const scale = 20; // Pixels per unit
    const P = { x: 4, y: 6 }; // Point P(4, 6)
    const k = 2; // Scale factor
    const P_prime = { x: P.x * k, y: P.y * k }; // P'(8, 12)

    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgP = toSvg(P);
    const svgP_prime = toSvg(P_prime);

    const duration = 1.5;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                 {/* Axes */}
                 <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke="#aaa" strokeWidth="0.5" />
                 <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} stroke="#aaa" strokeWidth="0.5" />
                 <circle cx={origin.x} cy={origin.y} r={4} className="fill-slate-400" />
                 <text x={origin.x - 15} y={origin.y + 15} className="fill-slate-300 text-xs">(0,0)</text>

                 {/* Line from Origin through P and P' */}
                 <line x1={origin.x} y1={origin.y} x2={svgP_prime.x + 10} y2={svgP_prime.y - 10} className="stroke-slate-400 dark:stroke-slate-500 opacity-50" strokeWidth="1" strokeDasharray="3 3"/>


                {/* Point P */}
                <circle cx={svgP.x} cy={svgP.y} r={6} className="fill-blue-500" />
                <text x={svgP.x + 8} y={svgP.y + 5} className="fill-blue-300 text-sm font-semibold">P({P.x},{P.y})</text>

                {/* Point P' (Fades in) */}
                 <motion.circle cx={svgP_prime.x} cy={svgP_prime.y} r={6} className="fill-green-500" // Green for image
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: delay + duration, duration: 0.3 }}
                />
                <motion.text
                    x={svgP_prime.x + 8} y={svgP_prime.y + 5} className="fill-green-300 text-sm font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + duration, duration: 0.3 }}
                >P'({P_prime.x},{P_prime.y})</motion.text>

                 {/* Moving Point Animation */}
                  <motion.circle
                     r={6}
                     className="fill-blue-500"
                     initial={{ cx: svgP.x, cy: svgP.y }}
                     animate={{ cx: svgP_prime.x, cy: svgP_prime.y }}
                     transition={{ delay: delay, duration: duration, ease: 'easeInOut' }}
                 />

                 {/* Scale Factor Label */}
                 <motion.text
                     x={origin.x + (P.x + P_prime.x)/2 * scale}
                     y={origin.y - (P.y + P_prime.y)/2 * scale - 10 }
                     textAnchor="middle"
                     className="fill-orange-400 text-sm font-semibold"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: delay + duration/2 }}
                 >Scale Factor k={k}</motion.text>


            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function DilationsSlide1() {
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
          id: 'dilating-points-quiz',
          conceptId: 'dilation-definition',
          conceptName: 'Dilating Points',
          type: 'judging',
          description: 'Testing the basic rule of dilation on a point'
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
            id: 'dilation-rule-enlarge-q1',
            // --- $ SYMBOLS REMOVED ---
            question: "How would you dilate the point P(4, 6) from the origin with a scale factor of k=2?",
            options: [
                "P'(8, 12)", // Correct
                "P'(6, 8)",
                "P'(2, 3)",
                "P'(4, 12)"
            ],
            correctAnswer: "P'(8, 12)",
            explanation: "Correct! We use the rule (x, y) → (kx, ky). So, (2 * 4, 2 * 6) which is (8, 12)."
        },
        { // --- ADDED SECOND QUESTION (Reduction) ---
            id: 'dilation-rule-reduce-q2',
            question: "How would you dilate the point P(10, -4) from the origin with a scale factor of k=0.5?",
             options: [
                 "P'(20, -8)",
                 "P'(5, -2)", // Correct
                 "P'(10, -2)",
                 "P'(5, -4)"
             ],
             correctAnswer: "P'(5, -2)",
             explanation: "Correct! Multiply both coordinates by 0.5: 10 * 0.5 = 5 and -4 * 0.5 = -2. The new point is P'(5, -2)."
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
            interactionId: `dilating-points-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'dilation-definition', conceptName: 'Dilating Points',
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Content */}
                <div className="space-y-6">
                    {/* --- CARD 1 UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The "Resize" Transformation</h2>
                        <p className="text-lg leading-relaxed">
                            The last transformation is <strong>Dilation</strong>. This is the only one that is <strong>not rigid</strong>.
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            A dilation changes the <strong>size</strong> of a figure, but not its <strong>shape</strong> (the angles stay the same). The image is <strong>similar</strong> (~) to the pre-image.
                        </p>
                    </div>

                    {/* --- CARD 2 UPDATED (Added Scale Factor Types, $ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Dilation Rule (from Origin)</h3>
                        <p className="text-lg leading-relaxed">
                            To dilate a point from the origin (0,0), you just multiply its coordinates by the <strong>scale factor (k)</strong>.
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <p className="text-lg font-mono text-center font-bold text-slate-800 dark:text-slate-100">Rule: (x, y) → (kx, ky)</p>
                        </div>
                        {/* --- ADDED SCALE FACTOR TYPES --- */}
                         <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                           <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Types of Dilations:</h4>
                            <ul className="list-disc list-inside mt-2 text-lg space-y-1 text-slate-700 dark:text-slate-300">
                                <li>If <strong>k {/* > */} 1</strong>: It's an <strong>Enlargement</strong> (gets bigger) 🔍➕</li>
                                <li>If <strong>0 &lt; k &lt; 1</strong>: It's a <strong>Reduction</strong> (gets smaller) 🔍➖</li>
                                <li>If <strong>k = 1</strong>: The image is the <strong>same size</strong> (congruent!)</li>
                            </ul>
                        </div>
                         <p className="text-lg leading-relaxed mt-4">
                             <strong>Example (Enlargement):</strong> Dilate P(3, 2) by k=4.
                         </p>
                          <p className="text-lg leading-relaxed mt-1 font-mono text-slate-700 dark:text-slate-300">
                              P'(4 * 3, 4 * 2) → P'(12, 8)
                         </p>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Dilating Point P(4, 6) by k=2</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <DilatingPointAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            P'(8, 12) is twice as far from the origin as P(4, 6).
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
                                <div className="text-3xl mb-4">📏</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? "You've got the basic rule down!" : 'Great job!'}
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
            slideId="dilating-points"
            slideTitle="Dilating Points"
            moduleId="performing-transformations"
            submoduleId="dilations" // Assuming this belongs to dilations submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}