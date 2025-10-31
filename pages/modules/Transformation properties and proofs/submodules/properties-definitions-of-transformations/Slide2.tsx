import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
// This animation from your reference is perfect for defining a reflection.
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
                {/* Line of Reflection (Y-Axis) */}
                <line x1={lineOfReflection.x1} y1={lineOfReflection.y1} x2={lineOfReflection.x2} y2={lineOfReflection.y2} className="stroke-blue-500" strokeWidth="2" />
                <text x={origin.x + 5} y={15} className="fill-blue-400 text-xs font-semibold">Line of Reflection (m)</text>

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
                 <motion.path d={`M ${origin.x} ${svgP.y} L ${origin.x-10} ${svgP.y} L ${origin.x-10} ${svgP.y-10} L ${origin.x} ${svgP.y-10} L ${origin.x} ${svgP.y}`} 
                    fill="none" className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1"
                    initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: delay + duration + 0.2}}/>

                {/* Point P */}
                <circle cx={svgP.x} cy={svgP.y} r={6} className="fill-blue-500" />
                <text x={svgP.x + 8} y={svgP.y + 5} className="fill-blue-300 text-sm font-semibold">P</text>

                {/* Point P' (appears) */}
                <motion.circle
                    cx={svgP_prime.x} cy={svgP_prime.y} r={6} className="fill-green-500"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: delay + duration, duration: 0.3 }}
                />
                <motion.text
                    x={svgP_prime.x - 8} y={svgP_prime.y + 5} textAnchor='end' className="fill-green-300 text-sm font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + duration, duration: 0.3 }}
                >P'</motion.text>

                {/* Distance indicators (tick marks) */}
                <motion.line x1={origin.x - 3} y1={svgP.y - 15} x2={origin.x + 3} y2={svgP.y - 15} className="stroke-orange-400" strokeWidth="2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration * 0.5 }}/>
                 <motion.line x1={origin.x - 3} y1={svgP.y + 15} x2={origin.x + 3} y2={svgP.y + 15} className="stroke-orange-400" strokeWidth="2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration * 0.5 }}/>
                <motion.text x={origin.x + 35} y={svgP.y - 5} textAnchor="middle" className="fill-orange-400 text-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration * 0.5 }}>Equal</motion.text>
                <motion.text x={origin.x - 35} y={svgP.y - 5} textAnchor="middle" className="fill-orange-400 text-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration * 0.5 }}>Equal</motion.text>

            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function Slide2() {
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
          id: 'defining-transformations-quiz',
          conceptId: 'transformation-definitions',
          conceptName: 'Transformation Definitions',
          type: 'judging',
          description: 'Testing formal definitions of transformations'
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
            id: 'reflection-definition-q1',
            question: "In a reflection, what is the relationship between the line of reflection and the segment connecting a point $P$ to its image $P'$?",
            options: [
                "It is parallel to the segment.",
                "It is the perpendicular bisector of the segment.",
                "It passes through point $P$.",
                "It has the same length as the segment."
            ],
            correctAnswer: "It is the perpendicular bisector of the segment.",
            explanation: "Correct! This is the formal definition. The line is perpendicular (90°) to the segment $PP'$ and cuts it into two equal halves."
        },
        {
            id: 'translation-definition-q2',
            question: "A transformation maps every point 5 units right and 2 units down. What is this transformation?",
            options: [
                "A reflection",
                "A rotation",
                "A translation",
                "A dilation"
            ],
            correctAnswer: "A translation",
            explanation: "Correct! A translation is defined by moving every point the same distance in the same direction (e.g., along the vector $\langle 5, -2 \rangle$)."
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
            interactionId: `defining-transformations-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'transformation-definitions', conceptName: 'Transformation Definitions',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">From Intuitive to Precise</h2>
                        <p className="text-lg leading-relaxed">
                            We know a translation is a "slide," a rotation is a "turn," and a reflection is a "flip."
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                           Now we need their **formal definitions** to use them in proofs.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Definition: Reflection</h3>
                        <p className="text-lg leading-relaxed">
                           A reflection across a line $m$ maps every point $P$ to a point $P'$ such that:
                        </p>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li>
                                If $P$ is on line $m$, then $P = P'$. (It doesn't move).
                            </li>
                             <li>
                                If $P$ is *not* on line $m$, then $m$ is the **perpendicular bisector** of the segment $PP'$.
                            </li>
                        </ul>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                                This "perpendicular bisector" rule is the key to all reflection proofs.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Definitions: Translation & Rotation</h3>
                        <ul className="text-lg mt-4 space-y-4">
                            <li>
                                <strong>Translation:</strong>
                                <br />
                                <span className="text-slate-600 dark:text-slate-400">Maps every point $P$ to $P'$ along a vector. Every point moves the *same distance* in the *same direction*.</span>
                            </li>
                            <li>
                                <strong>Rotation:</strong>
                                <br />
                                <span className="text-slate-600 dark:text-slate-400">Maps every point $P$ to $P'$ around a **center of rotation** $C$ by an **angle of rotation** $\theta$. The distance $PC$ is equal to $P'C$.</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing the Definition (Reflection)</h3>
                        <ReflectingPointAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            The line $m$ is perpendicular to $PP'$ and cuts it into two equal-distance parts.
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
                                <div className="text-3xl mb-4">📐</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'Youve got the definitions down!' : 'Great job!'}
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
            slideId="defining-transformations"
            slideTitle="Defining transformations"
            moduleId="transformation-properties-proofs"
            submoduleId="properties-definitions-of-transformations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}