import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept'; // Added
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react'; // Added

// --- ANIMATION COMPONENT 1: REDUCING FRICTION (SIDE-BY-SIDE RACE - FIXED ROTATION) ---
const ReduceFrictionAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 200;
    const groundY = 180;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Ground */}
                <line x1="0" y1={groundY} x2={svgWidth} y2={groundY} className="stroke-slate-400" strokeWidth="2" />

                {/* Start Line (Optional visual cue) */}
                <line x1="50" y1={groundY-50} x2="50" y2={groundY+10} strokeDasharray="4 4" className="stroke-slate-500" strokeWidth="1" />

                {/* 1. Sliding Box (Stops Short) */}
                <text x="125" y="40" textAnchor="middle" className="text-xs font-semibold fill-blue-500">Sliding (Stops)</text>
                <motion.rect
                    x={50}
                    y={groundY - 40}
                    width={50}
                    height={40}
                    fill="#A16207"
                    initial={{ x: 50 }}
                    animate={{ x: 150 }} // Stops relatively short
                    transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                />

                {/* 2. Rolling Wheel (Goes Further) */}
                <text x="275" y="40" textAnchor="middle" className="text-xs font-semibold fill-blue-500">Rolling (Keeps Going)</text>
                <motion.circle
                    cx={50} // Starts at the same line
                    cy={groundY - 20} // Center of circle
                    r={20}
                    fill="#334155"
                    initial={{ x: 50, rotate: 0 }} // Added rotate: 0 to initial
                    animate={{ x: 350, rotate: 720 }} // Added rotate: 720 to animate
                    transition={{
                        delay: 0.5,
                        duration: 2.0,
                        ease: "linear",
                        // Apply rotation timing within the main transition
                        rotate: { duration: 2.0, ease: "linear", repeat: Infinity } // Make rotation repeat
                     }}
                />
                <text x={svgWidth / 2} y={groundY + 15} textAnchor="middle" className="text-xs font-semibold fill-slate-600 dark:fill-slate-400">
                    Rolling friction is weaker, so the wheel travels further.
                </text>
            </svg>
        </div>
    );
};

// --- ANIMATION COMPONENT 2: INCREASING FRICTION (SPINNING WHEELS) ---
const IncreaseFrictionAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 200;
    const groundY = 180;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Ground 1 (Ice) */}
                <rect x="0" y={groundY} width={svgWidth / 2 - 10} height={20} fill="#A0E9FF" />
                <text x={svgWidth * 0.25} y={50} textAnchor="middle" className="text-xs font-semibold fill-blue-500">Smooth Surface (Ice)</text>

                {/* Ground 2 (Rough) */}
                <rect x={svgWidth / 2 + 10} y={groundY} width={svgWidth / 2 - 10} height={20} fill="#654321" />
                <path d={`M ${svgWidth / 2 + 10} ${groundY} l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5 l 5 -5 l 5 5`}
                      stroke="#332211" strokeWidth="1" fill="none" />
                <text x={svgWidth * 0.75} y={50} textAnchor="middle" className="text-xs font-semibold fill-blue-500">Rough Surface / Treads</text>

                {/* 1. Smooth Tyre (Slips) */}
                <g transform={`translate(${svgWidth * 0.25}, ${groundY - 30})`}>
                    <motion.circle
                        r="30"
                        fill="#334155"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 720 }} // Spins fast in place
                        transition={{ delay: 0.5, duration: 1.5, ease: "linear", repeat: Infinity }}
                    />
                    <motion.text
                        y={-10} textAnchor="middle" className="text-lg font-bold fill-red-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0, duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                    >SLIP!</motion.text>
                </g>

                {/* 2. Treaded Tyre (Grips and Moves) */}
                <motion.g
                    initial={{ x: svgWidth * 0.75 }}
                    animate={{ x: svgWidth * 0.9 }} // Moves forward slowly
                    transition={{ delay: 0.5, duration: 3.0, ease: "linear", repeat: Infinity, repeatDelay: 1.0 }}
                >
                    <motion.circle
                        cy={groundY - 30}
                        r="30"
                        fill="#334155"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }} // Rotates slower while moving
                        transition={{ delay: 0.5, duration: 3.0, ease: "linear", repeat: Infinity, repeatDelay: 1.0 }}
                    />
                    {/* Simplified Treads */}
                    <path d="M 0 -25 l 5 5 l 5 -5" transform={`translate(0, ${groundY - 30})`} stroke="white" strokeWidth="2" fill="none" />
                     <path d="M 0 25 l -5 -5 l -5 5" transform={`translate(0, ${groundY - 30})`} stroke="white" strokeWidth="2" fill="none" />
                     <path d="M -25 0 l 5 -5 l 5 5" transform={`translate(0, ${groundY - 30})`} stroke="white" strokeWidth="2" fill="none" />
                     <path d="M 25 0 l -5 5 l -5 -5" transform={`translate(0, ${groundY - 30})`} stroke="white" strokeWidth="2" fill="none" />
                     <text y={groundY - 70} textAnchor="middle" className="text-lg font-bold fill-green-500">Grip!</text>

                </motion.g>

            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENTS ---


export default function ForcesOfFrictionSlide4() {
    const { isDarkMode } = useThemeContext();

    // --- QUIZ STATE & LOGIC (UNCHANGED) ---
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);

    const slideInteractions: Interaction[] = [
        {
          id: 'controlling-friction-quiz',
          conceptId: 'controlling-friction',
          conceptName: 'Controlling Friction',
          type: 'judging',
          description: 'Testing understanding of controlling friction.'
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
            id: 'q1-reduce',
            question: "Why do people put oil on a squeaky door hinge?",
            options: [
                'To make it heavier.',
                'To lubricate it and reduce friction.',
                'To polish it and increase friction.',
            ],
            correctAnswer: 'To lubricate it and reduce friction.',
            explanation: "Oil is a lubricant that reduces friction between the metal parts, stopping the squeak."
        },
        {
            id: 'q2-increase',
            question: "Why do runners wear shoes with spikes (cleats)?",
            options: [
                'To look cool.',
                'To reduce friction and run faster.',
                'To increase friction and get a better grip.',
            ],
            correctAnswer: 'To increase friction and get a better grip.',
            explanation: "The spikes dig into the ground, increasing friction and preventing the runner from slipping."
        },
        {
            id: 'q3-concept',
            question: "Ball bearings are very effective because they change...",
            options: [
                'Sliding friction into much weaker rolling friction.',
                'Rolling friction into sliding friction.',
                'Friction into heat immediately.',
            ],
            correctAnswer: 'Sliding friction into much weaker rolling friction.',
            explanation: "Rolling friction is much, much weaker than sliding friction, which is why wheels and ball bearings are so useful."
        }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({
          ...prev,
          [response.interactionId]: response
        }));
    };

    const handleQuizAnswer = (answerText: string) => {
        if (showFeedback || isQuizComplete) return;

        setSelectedAnswer(answerText);
        setShowFeedback(true);

        const current = questions[currentQuestionIndex];
        const isCorrect = answerText === current.correctAnswer;
        if (isCorrect) {
          setScore(prev => prev + 1);
        }

        handleInteractionComplete({
          interactionId: `controlling-friction-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
          value: answerText,
          isCorrect,
          timestamp: Date.now(),
          conceptId: 'controlling-friction',
          conceptName: 'Controlling Friction',
          conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
          question: {
            type: 'mcq',
            question: current.question,
            options: current.options
          }
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
    // --- END OF QUIZ LOGIC ---

    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {/* Split layout: left side for Reducing, right side for Increasing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Reducing Friction */}
                <div className="space-y-6 flex flex-col">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg h-full">
                        {/* --- COLOR CHANGED --- */}
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            How to Reduce Friction
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li><strong>Lubrication:</strong> Applying oil or grease between surfaces.</li>
                            <li><strong>Polishing:</strong> Making surfaces smoother.</li>
                            <li><strong>Ball Bearings:</strong> Reducing sliding to rolling friction in machines.</li>
                            <li><strong>Streamlining:</strong> Shaping vehicles to move smoothly through air or water.</li>
                        </ul>

                        {/* Animation for Reducing Friction */}
                        <div className="mt-6">
                            {/* --- COLOR CHANGED --- */}
                            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                                Rolling is Easier than Sliding
                            </h3>
                            {/* --- USING NEW ANIMATION --- */}
                            <ReduceFrictionAnimation />
                        </div>
                    </div>

                    {/* --- "ETC" CARD ADDED --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                            A Special Case: Fluid Friction (Drag)
                        </h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            Friction also happens in liquids (like water) and gases (like air). This is called Fluid Friction or Drag.
                        </p>
                        <ul className="mt-4 space-y-2 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                             <li>It's the force that pushes against you when you walk in a swimming pool.</li>
                             <li>It's why race cars, planes, and even fish have smooth, curved shapes. This is streamlining, which helps them cut through the air or water more easily.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Increasing Friction */}
                <div className="space-y-6 flex flex-col">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg h-full">
                        {/* --- COLOR CHANGED --- */}
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            How to Increase Friction
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>Make surfaces <strong>rougher</strong> (e.g., tyre treads, shoe soles).</li>
                            <li>Use <strong>sand or gravel</strong> on slippery roads.</li>
                            <li>Add <strong>spikes</strong> to shoes for better grip (e.g., sports cleats).</li>
                        </ul>

                        {/* Animation for Increasing Friction */}
                        <div className="mt-6">
                            {/* --- COLOR CHANGED --- */}
                            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                                Treads and Soles Add Grip
                            </h3>
                            {/* --- USING NEW ANIMATION --- */}
                            <IncreaseFrictionAnimation />
                        </div>
                    </div>

                    {/* --- QUIZ CARD ADDED HERE --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
                            <div className="text-lg text-slate-600 dark:text-slate-400">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </div>
                        </div>
                        {/* Progress Bar */}
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
                                <div className="text-lg mb-4 text-slate-800 dark:text-slate-200 min-h-[4rem]">{questions[currentQuestionIndex].question}</div>
                                <div className="space-y-3">
                                    {questions[currentQuestionIndex].options.map((option, idx) => {
                                        const disabled = showFeedback;
                                        const selected = selectedAnswer === option;
                                        const correct = option === questions[currentQuestionIndex].correctAnswer;

                                        let buttonClass = 'border-slate-300 dark:border-slate-600 hover:border-blue-400';
                                        if (showFeedback) {
                                            if (selected && correct) {
                                                buttonClass = 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200';
                                            } else if (selected && !correct) {
                                                buttonClass = 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200';
                                            } else {
                                                buttonClass = 'border-slate-300 dark:border-slate-600 opacity-50';
                                            }
                                        }

                                        return (
                                            <motion.button
                                                key={idx}
                                                onClick={() => handleQuizAnswer(option)}
                                                disabled={disabled}
                                                className={`w-full p-3 rounded-lg text-left transition-all border-2 ${buttonClass} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
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
                                            className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700"
                                        >
                                            <div className="flex items-start">
                                                {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? (
                                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                                                ) : (
                                                    <XCircle className="text-red-500 mr-2 flex-shrink-0" />
                                                )}
                                                <div>
                                                    <p className={`text-lg font-semibold ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                                                        {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Not quite!'}
                                                    </p>
                                                    <div className="text-lg text-slate-700 dark:text-slate-300 mt-1">
                                                        {questions[currentQuestionIndex].explanation}
                                                    </div>
                                                </div>
                                            </div>
                                            <motion.button
                                                onClick={handleNextQuestion}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mt-4 w-full"
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
                                <div className="text-3xl mb-4">🎉</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
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
            slideId="controlling-friction" // From index.tsx
            slideTitle="Controlling Friction" // From index.tsx
            moduleId="physics-force"
            submoduleId="forces-of-friction"
            interactions={localInteractions} // Pass interactions up
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}