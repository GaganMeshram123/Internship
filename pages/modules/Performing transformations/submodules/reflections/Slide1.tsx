import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const ReflectingPointAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const origin = { x: svgWidth / 2, y: svgHeight / 2 };
    const scale = 25;

    // Point P and its reflection P' across the y-axis
    const P = { x: 3, y: 2 };
    const P_prime = { x: -P.x, y: P.y }; // (-3, 2)

    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgP = toSvg(P);
    const svgP_prime = toSvg(P_prime);

    // Line of reflection (y-axis)
    const lineOfReflection = { x1: origin.x, y1: 0, x2: origin.x, y2: svgHeight };

    const duration = 1.0;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                 {/* Axes */}
                 <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke="#aaa" strokeWidth="0.5" />
                 {/* Line of Reflection (Y-Axis) - Make it thicker and blue */}
                 <line x1={lineOfReflection.x1} y1={lineOfReflection.y1} x2={lineOfReflection.x2} y2={lineOfReflection.y2} className="stroke-blue-500" strokeWidth="2" />
                 <text x={origin.x + 5} y={15} className="fill-blue-400 text-xs font-semibold">Line of Reflection (y-axis)</text>


                 {/* Segment connecting P and P' (dashed) */}
                 <motion.line
                    x1={svgP.x} y1={svgP.y} x2={svgP.x} y2={svgP.y} // Start collapsed
                    animate={{ x2: svgP_prime.x }} // Animate to full length
                    transition={{ delay: delay + duration * 0.5, duration: duration * 0.5 }}
                    className="stroke-slate-400 dark:stroke-slate-500"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                />
                 {/* Perpendicular symbol */}
                  <motion.path d={`M ${origin.x-5} ${svgP.y-5} L ${origin.x+5} ${svgP.y-5} L ${origin.x+5} ${svgP.y+5}`} fill="none" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1"
                    initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: delay + duration + 0.2}}/>


                {/* Point P */}
                <circle cx={svgP.x} cy={svgP.y} r={6} className="fill-blue-500" />
                <text x={svgP.x + 8} y={svgP.y + 5} className="fill-blue-300 text-sm font-semibold">P({P.x},{P.y})</text>

                 {/* Point P' (appears) */}
                 <motion.circle
                    cx={svgP_prime.x} cy={svgP_prime.y} r={6} className="fill-green-500" // Use green for image
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: delay + duration, duration: 0.3 }}
                />
                <motion.text
                    x={svgP_prime.x - 8} y={svgP_prime.y + 5} textAnchor='end' className="fill-green-300 text-sm font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + duration, duration: 0.3 }}
                >P'({P_prime.x},{P_prime.y})</motion.text>

                 {/* Distance indicators (simple lines) */}
                 <motion.line x1={origin.x} y1={svgP.y} x2={svgP.x} y2={svgP.y} stroke="orange" strokeWidth="1"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: delay + duration * 0.2, duration: duration*0.6 }}/>
                 <motion.line x1={origin.x} y1={svgP_prime.y} x2={svgP_prime.x} y2={svgP_prime.y} stroke="orange" strokeWidth="1"
                     initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: delay + duration * 0.2, duration: duration*0.6 }}/>
                 <motion.text x={origin.x + P.x * scale / 2} y={svgP.y - 8} textAnchor="middle" className="fill-orange-400 text-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration * 0.5 }}>Equal Distance</motion.text>
                 <motion.text x={origin.x + P_prime.x * scale / 2} y={svgP_prime.y - 8} textAnchor="middle" className="fill-orange-400 text-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration * 0.5 }}>Equal Distance</motion.text>

            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---

export default function ReflectionsSlide1() {
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
          id: 'reflecting-points-quiz',
          conceptId: 'reflection-definition',
          conceptName: 'Reflection Definition',
          type: 'judging',
          description: 'Testing understanding of the properties of reflection'
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
            id: 'reflection-property-q1',
            question: "If you connect a pre-image point (P) to its image point (P'), what is true about the line of reflection?",
            options: [
                "It is parallel to the segment PP'.",
                "It is the perpendicular bisector of the segment PP'.",
                "It passes through both P and P'.",
                "It is half the length of the segment PP'."
            ],
            correctAnswer: "It is the perpendicular bisector of the segment PP'.",
            explanation: "Correct! The line of reflection acts like a mirror. It is 'perpendicular' (meets at 90°) to the segment connecting P and P', and it 'bisects' it (cuts it in half)."
        },
        { // --- ADDED SECOND QUESTION ---
            id: 'reflection-rule-xaxis-q2',
            question: "What are the coordinates of the point (3, -5) after a reflection across the x-axis?",
             options: [
                 "(-3, -5)",
                 "(3, 5)",
                 "(-5, 3)",
                 "(5, -3)"
             ],
             correctAnswer: "(3, 5)",
             explanation: "Correct! Reflecting across the x-axis uses the rule (x, y) → (x, -y), so only the y-coordinate flips its sign: (3, -5) becomes (3, 5)."
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
            interactionId: `reflecting-points-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'reflection-definition', conceptName: 'Reflection Definition',
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
                    {/* --- CARD 1 UPDATED (Analogy added) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Rigid Move 3: Reflection</h2>
                        <p className="text-lg leading-relaxed">
                            A <strong>Reflection</strong> is the formal name for a "flip."
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            A reflection flips a figure across a "mirror line" called the <strong>line of reflection</strong>.
                        </p>
                         <p className="text-lg leading-relaxed mt-4">
                             The new figure (image) is a mirror image of the original (pre-image). This *does* change the shape's <strong>orientation</strong> (it's flipped!).
                         </p>
                          {/* --- ANALOGY ADDED --- */}
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                            Think: Your reflection in a mirror 🪞. Same size, same shape, but flipped.
                         </em>
                    </div>

                    {/* --- CARD 2 UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Key Property of Reflections</h3>
                        <p className="text-lg leading-relaxed">
                            Every point on the image is the <strong>same distance</strong> from the line of reflection as its corresponding point on the pre-image.
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                                The line of reflection is the <strong>perpendicular bisector</strong> of the segment connecting any point (P) to its image (P').
                            </p>
                        </div>
                    </div>

                     {/* --- NEW CARD: Reflection Rules --- */}
                     <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Common Reflection Rules</h3>
                        <ul className="mt-4 space-y-3 text-lg font-mono text-slate-700 dark:text-slate-300">
                            <li className='border-b pb-2 dark:border-slate-700'>
                                <strong>Across the x-axis:</strong> (x, y) → (x, -y)
                                <span className='text-sm text-slate-500 dark:text-slate-400 block non-italic'>(y flips sign)</span>
                            </li>
                             <li className='border-b pb-2 dark:border-slate-700'>
                                <strong>Across the y-axis:</strong> (x, y) → (-x, y)
                                <span className='text-sm text-slate-500 dark:text-slate-400 block non-italic'>(x flips sign)</span>
                            </li>
                            <li>
                                <strong>Across the line y = x:</strong> (x, y) → (y, x)
                                 <span className='text-sm text-slate-500 dark:text-slate-400 block non-italic'>(x and y swap)</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The "Flip" (across y-axis)</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <ReflectingPointAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            The segment PP' is perpendicularly bisected by the line of reflection. P and P' are equidistant from the line.
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
                                                {option.includes('(') ? <span className='font-mono'>{option}</span> : option} {/* Only make coordinate options mono */}
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
                                <div className="text-3xl mb-4">🪞</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You see the properties clearly!' : 'Great job!'}
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
            slideId="reflecting-points"
            slideTitle="Reflecting Points"
            moduleId="performing-transformations"
            submoduleId="reflections" // Assuming this belongs to reflections submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}