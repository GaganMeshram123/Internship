import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION/DIAGRAM COMPONENT DEFINED INSIDE ---
const RotationDefinitionDiagram: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const center = { x: 200, y: 150 };
    const p = { x: 300, y: 100 };
    const p_prime = { x: 250, y: 50 }; // approx 90 deg rotation
    const angle = 90;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Center Point C */}
                <motion.circle
                    cx={center.x} cy={center.y} r={6} className="fill-red-500"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                />
                <motion.text x={center.x} y={center.y + 20} textAnchor="middle" className="fill-red-400 text-sm font-semibold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                >
                    Center (C)
                </motion.text>

                {/* Point P */}
                <motion.circle
                    cx={p.x} cy={p.y} r={5} className="fill-blue-500"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }}
                />
                <motion.text x={p.x + 10} y={p.y + 5} className="fill-blue-300 text-sm font-semibold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                >
                    P
                </motion.text>
                {/* Line CP */}
                <motion.line
                    x1={center.x} y1={center.y} x2={p.x} y2={p.y}
                    className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.5" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.0 }}
                />

                {/* Point P' */}
                <motion.circle
                    cx={p_prime.x} cy={p_prime.y} r={5} className="fill-green-500"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }}
                />
                <motion.text x={p_prime.x + 10} y={p_prime.y + 5} className="fill-green-300 text-sm font-semibold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
                >
                    P'
                </motion.text>
                {/* Line CP' */}
                <motion.line
                    x1={center.x} y1={center.y} x2={p_prime.x} y2={p_prime.y}
                    className="stroke-slate-400 dark:stroke-slate-500" strokeWidth="1.5" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6 }}
                />

                {/* Angle Arc */}
                <motion.path
                    d={`M ${center.x + (p.x - center.x) * 0.3} ${center.y + (p.y - center.y) * 0.3} A 30 30 0 0 0 ${center.x + (p_prime.x - center.x) * 0.3} ${center.y + (p_prime.y - center.y) * 0.3}`}
                    className="fill-none stroke-purple-400" strokeWidth="2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
                />
                <motion.text x="240" y="115" className="fill-purple-300 text-sm font-semibold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
                >
                    $\theta$
                </motion.text>

                 {/* Equal Distance Ticks */}
                 <motion.text x="250" y="130" className="fill-orange-400 text-lg font-bold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
                 >
                     |
                 </motion.text>
                 <motion.text x="220" y="95" className="fill-orange-400 text-lg font-bold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
                 >
                     |
                 </motion.text>
                 <motion.text x="280" y="70" className="fill-orange-400 text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
                 >
                     $CP = CP'$
                 </motion.text>
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
          id: 'defining-rotations-quiz',
          conceptId: 'transformation-definitions',
          conceptName: 'Transformation Definitions',
          type: 'judging',
          description: 'Testing formal definition of a rotation'
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
            id: 'rotation-definition-q1',
            question: "To precisely define a rotation, what two pieces of information do you need?",
            options: [
                "A vector and a distance",
                "A line of reflection and a point",
                "A center of rotation and an angle",
                "A scale factor and a center"
            ],
            correctAnswer: "A center of rotation and an angle",
            explanation: "Correct! You must specify *what* you are rotating around (the center) and *how much* you are rotating (the angle)."
        },
        {
            id: 'rotation-property-q2',
            question: "If a rotation maps point $P$ to point $P'$ around a center $C$, what is the relationship between $CP$ and $CP'$?",
            options: [
                "$CP$ is perpendicular to $CP'$",
                "$CP'$ is twice as long as $CP$",
                "$CP$ and $CP'$ are equal in length",
                "$CP$ and $CP'$ are parallel"
            ],
            correctAnswer: "$CP$ and $CP'$ are equal in length",
            explanation: "Exactly! The definition of a rotation states that all points remain the same distance from the center. $CP = CP'$."
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
            interactionId: `defining-rotations-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Precisely Defining a Rotation</h2>
                        <p className="text-lg leading-relaxed">
                            Saying a rotation is a "turn" is good for intuition, but for proofs, we need a precise, mathematical definition.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                           A rotation isn't defined by just one thing. It requires **two key components**.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Two Components</h3>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-4">
                            <li>
                                <strong>1. The Center of Rotation ($C$):</strong>
                                <br />
                                <span className="text-slate-600 dark:text-slate-400">This is the fixed point that the figure "turns around." It is the *only* point that does not move during the rotation.</span>
                            </li>
                             <li>
                                <strong>2. The Angle of Rotation ($\theta$):</strong>
                                <br />
                                 <span className="text-slate-600 dark:text-slate-400">This tells you *how far* to turn the figure, usually measured in degrees. You also need a direction (e.g., clockwise or counter-clockwise).</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Formal Definition</h3>
                        <p className="text-lg leading-relaxed">
                            A **rotation** of $\theta$ degrees about a center $C$ maps any point $P$ to an image $P'$ such that:
                        </p>
                         <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li className="font-semibold">
                                The distance from the center is preserved: $CP = CP'$.
                            </li>
                             <li className="font-semibold">
                                The angle formed by the points, center, and image is the angle of rotation: $m\angle PCP' = \theta$.
                            </li>
                        </ul>
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                           (If $P$ is the center $C$, then $P = P'$.)
                         </em>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing the Definition</h3>
                        <RotationDefinitionDiagram />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Note that $P$ and $P'$ are the same distance from the center $C$.
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
                                                {option.includes('$') ? <span>{option}</span> : option}
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
                                <div className="text-3xl mb-4">🎯</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'A perfectly centered performance!' : 'Great work!'}
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
            slideId="precisely-defining-rotations"
            slideTitle="Precisely defining rotations"
            moduleId="transformation-properties-proofs"
            submoduleId="properties-definitions-of-transformations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}