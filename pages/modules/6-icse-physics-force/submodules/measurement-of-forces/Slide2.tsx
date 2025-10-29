import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react'; // For quiz feedback

// --- ANIMATION COMPONENT (Unchanged) ---
const ResultantForceAnimation: React.FC = () => {
    const svgWidth = 450;
    const svgHeight = 200;
    
    // A simple, re-usable stick figure component
    const StickFigure: React.FC<{ x: number, y: number, color: string, mirror?: boolean }> = ({ x, y, color, mirror = false }) => (
        <g transform={`translate(${x}, ${y}) scale(${mirror ? -1 : 1}, 1)`}>
            <circle cx="0" cy="-30" r="6" fill={color} />
            <line x1="0" y1="-24" x2="0" y2="-10" stroke={color} strokeWidth="2.5" />
            <line x1="0" y1="-10" x2="-6" y2="0" stroke={color} strokeWidth="2.5" />
            <line x1="0" y1="-10" x2="6" y2="0" stroke={color} strokeWidth="2.5" />
            {/* Arm pulling rope */}
            <line x1="0" y1="-20" x2="10" y2="-18" stroke={color} strokeWidth="2.5" />
        </g>
    );

    // A re-usable arrow component
    const ForceArrow: React.FC<{ x1: number, y1: number, x2: number, y2: number, color: string, label: string }> = ({ x1, y1, x2, y2, color, label }) => {
        const isLeft = x2 < x1;
        const headOffset = isLeft ? 5 : -5;
        const textAnchor = isLeft ? "end" : "start";
        const textOffset = isLeft ? -8 : 8;
        
        return (
            <g>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="4" />
                <path d={`M ${x2 + headOffset} ${y2 - 5} L ${x2} ${y2} L ${x2 + headOffset} ${y2 + 5}`} fill="none" stroke={color} strokeWidth="4" />
                <text x={(x1 + x2) / 2} y={y1 - 8} fill={color} textAnchor="middle" className="text-sm font-semibold">{label}</text>
            </g>
        );
    };

    const cartX = 225; // Center of the SVG
    const cartY = 150;
    
    // We'll show Right Force > Left Force
    const resultantMoveX = 60;
    const animDelay = 1.0;
    const animDuration = 2.0;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Ground */}
                <line x1="0" y1={cartY + 10} x2={svgWidth} y2={cartY + 10} className="stroke-slate-400" strokeWidth="2" />

                {/* Top "Sum of Forces" Arrow (Resultant) */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: animDelay + 0.5, duration: 0.5 }}
                >
                    <ForceArrow x1={cartX - 20} y1={cartY - 80} x2={cartX + 40} y2={cartY - 80} color="#22C55E" label="Sum of Forces" />
                </motion.g>

                {/* The whole moving group (cart, figures, rope) */}
                <motion.g
                    initial={{ x: 0 }}
                    animate={{ x: resultantMoveX }}
                    transition={{ delay: animDelay, duration: animDuration, ease: "easeInOut" }}
                >
                    {/* Cart */}
                    <g transform={`translate(${cartX}, ${cartY})`}>
                        <rect x="-25" y="-30" width="50" height="30" fill="#94A3B8" className="stroke-slate-600" strokeWidth="2" />
                        <circle cx="-15" cy="0" r="8" fill="#334155" />
                        <circle cx="15" cy="0" r="8" fill="#334155" />
                    </g>
                    
                    {/* Rope */}
                    <line x1={cartX - 25} y1={cartY - 18} x2={cartX - 90} y2={cartY - 18} className="stroke-yellow-600" strokeWidth="3" />
                    <line x1={cartX + 25} y1={cartY - 18} x2={cartX + 120} y2={cartY - 18} className="stroke-yellow-600" strokeWidth="3" />

                    {/* Blue Figure (Left) */}
                    <StickFigure x={cartX - 100} y={cartY} color="#3B82F6" mirror={true} />
                    
                    {/* Red Figures (Right) */}
                    <StickFigure x={cartX + 100} y={cartY} color="#EF4444" />
                    <StickFigure x={cartX + 130} y={cartY} color="#EF4444" />

                    {/* Force Arrows on the cart */}
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: animDelay - 0.5}}>
                        {/* Right Force (Longer) */}
                        <ForceArrow x1={cartX} y1={cartY - 40} x2={cartX + 100} y2={cartY - 40} color="#EF4444" label="Right Force" />
                        {/* Left Force (Shorter) */}
                        <ForceArrow x1={cartX} y1={cartY - 40} x2={cartX - 50} y2={cartY - 40} color="#3B82F6" label="Left Force" />
                    </motion.g>
                </motion.g>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT ---


export default function MeasurementOfForcesSlide2() {
    const { isDarkMode } = useThemeContext();
    
    // --- QUIZ STATE & LOGIC ---
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);

    const slideInteractions: Interaction[] = [
        {
          id: 'resultant-force-quiz',
          conceptId: 'resultant-force',
          conceptName: 'Resultant Force',
          type: 'judging',
          description: 'Testing understanding of resultant force.'
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
            id: 'q1-definition',
            question: "What is a 'resultant force'?",
            options: [
                'The biggest force on an object.',
                'The single force that combines all other forces.',
                'The force of friction only.',
            ],
            correctAnswer: 'The single force that combines all other forces.',
            explanation: "Correct! It's the 'net' or 'total' effect of all forces acting on the object."
        },
        {
            id: 'q2-effect',
            question: 'A non-zero resultant force (like in the simulation) will cause an object to...',
            options: [
                'Stay perfectly still.',
                'Change its motion (accelerate).',
                'Get heavier.',
            ],
            correctAnswer: 'Change its motion (accelerate).',
            explanation: "Right! A non-zero resultant force causes a change in motion (acceleration) in the direction of that force."
        },
        {
            id: 'q3-balanced',
            question: 'If two forces, 5 N right and 5 N left, act on a box, what is the resultant force?',
            options: [
                '10 N to the right.',
                '5 N to the right.',
                '0 N.',
            ],
            correctAnswer: '0 N.',
            explanation: 'Perfect! The forces are balanced. They act in opposite directions, so you subtract them (5 - 5 = 0). The resultant force is zero.'
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
          interactionId: `resultant-force-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
          value: answerText,
          isCorrect,
          timestamp: Date.now(),
          conceptId: 'resultant-force',
          conceptName: 'Resultant Force',
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
            {/* --- UI FIX: Removed justify-center from columns --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

                {/* Left Column - Content */}
                <div className="space-y-6 flex flex-col">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-blue-500/50">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            Resultant Force
                        </h2>
                        
                        {/* Content from your image */}
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>When two or more forces act on an object at the same time, they combine to form a single force called the <strong>resultant force</strong>.</li>
                            <li>The resultant force decides what happens to the object — whether it <strong>moves</strong>, <strong>stops</strong>, or <strong>stays still</strong>.</li>
                        </ul>
                    </div>
                    
                    {/* --- EXTRA CONTENT ADDED HERE --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Big Idea: Adding Forces</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            Think of the resultant force as the "total" force. We find it by combining all the forces acting on an object.
                        </p>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>If forces are in the <strong>same direction</strong>, you <strong>ADD</strong> them.</li>
                            <li>If forces are in <strong>opposite directions</strong>, you <strong>SUBTRACT</strong> them.</li>
                            <li>If they balance perfectly, the resultant force is <strong>ZERO</strong>.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Animation and NEW Quiz */}
                <div className="space-y-6 flex flex-col">
                    {/* Card 1: Animation (Unchanged) */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            Resultant Force Simulation
                        </h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <ResultantForceAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            In this simulation, the "Right Force" is stronger than the "Left Force." The "Sum of Forces" (the resultant force) points to the right, causing the cart to move right.
                        </p>
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
                                <div className="text-lg mb-4 text-slate-800 dark:text-slate-200">{questions[currentQuestionIndex].question}</div>
                                <div className="space-y-3">
                                    {questions[currentQuestionIndex].options.map((option, idx) => {
                                        const disabled = showFeedback;
                                        const selected = selectedAnswer === option;
                                        const correct = option === questions[currentQuestionIndex].correctAnswer;
                                        
                                        let buttonClass = 'border-slate-300 dark:border-slate-600 hover:border-blue-400';
                                        if (selected) {
                                            buttonClass = 'border-blue-500 bg-blue-50 dark:bg-blue-900/30';
                                        }
                                        if (showFeedback && selected) {
                                            buttonClass = correct 
                                                ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                                                : 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200';
                                        } else if (showFeedback && correct) {
                                            buttonClass = 'border-green-500 bg-green-50 dark:bg-green-900/30';
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
                                            <div className="flex items-center">
                                                {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? (
                                                    <CheckCircle className="text-green-500 mr-2" />
                                                ) : (
                                                    <XCircle className="text-red-500 mr-2" />
                                                )}
                                                <div className="text-lg text-slate-700 dark:text-slate-300">
                                                    {questions[currentQuestionIndex].explanation}
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
            slideId="resultant-force" // From index.tsx
            slideTitle="Resultant Force" // From index.tsx
            moduleId="physics-force"
            submoduleId="measurement-of-forces"
            interactions={localInteractions} // Pass the interactions up
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}