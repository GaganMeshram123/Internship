import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react'; // For quiz feedback

// --- ANIMATION COMPONENTS (Unchanged) ---
// Re-usable stick figure component
const StickFigure: React.FC<{ x: number, y: number, color: string }> = ({ x, y, color }) => (
    <g transform={`translate(${x}, ${y})`}>
        <circle cx="0" cy="-30" r="6" fill={color} />
        <line x1="0" y1="-24" x2="0" y2="-10" stroke={color} strokeWidth="2.5" />
        <line x1="0" y1="-10" x2="-6" y2="0" stroke={color} strokeWidth="2.5" />
        <line x1="0" y1="-10" x2="6" y2="0" stroke={color} strokeWidth="2.5" />
        {/* Arm pulling rope */}
        <line x1="0" y1="-20" x2="10" y2="-18" stroke={color} strokeWidth="2.5" />
    </g>
);

// Re-usable arrow component
const ForceArrow: React.FC<{ x1: number, y1: number, x2: number, y2: number, color: string, label: string }> = ({ x1, y1, x2, y2, color, label }) => {
    return (
        <g>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="4" />
            <path d={`M ${x2 - 5} ${y2 - 5} L ${x2} ${y2} L ${x2 - 5} ${y2 + 5}`} fill="none" stroke={color} strokeWidth="4" />
            <text x={(x1 + x2) / 2} y={y1 - 8} fill={color} textAnchor="middle" className="text-sm font-semibold">{label}</text>
        </g>
    );
};

const SameDirectionAnimation: React.FC = () => {
    const svgWidth = 450;
    const svgHeight = 200;
    
    const cartX = 100; // Start cart on the left
    const cartY = 150;
    
    const resultantMoveX = 150; // Move it a good distance to the right
    const animDelay = 1.0;
    const animDuration = 2.0;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Ground */}
                <line x1="0" y1={cartY + 10} x2={svgWidth} y2={cartY + 10} className="stroke-slate-400" strokeWidth="2" />

                {/* The whole moving group (cart, figures, rope) */}
                <motion.g
                    initial={{ x: 0 }}
                    animate={{ x: resultantMoveX }}
                    transition={{ delay: animDelay, duration: animDuration, ease: "easeIn" }} // Accelerates
                >
                    {/* Cart */}
                    <g transform={`translate(${cartX}, ${cartY})`}>
                        <rect x="-25" y="-30" width="50" height="30" fill="#94A3B8" className="stroke-slate-600" strokeWidth="2" />
                        <circle cx="-15" cy="0" r="8" fill="#334155" />
                        <circle cx="15" cy="0" r="8" fill="#334155" />
                    </g>
                    
                    {/* Rope */}
                    <line x1={cartX + 25} y1={cartY - 18} x2={cartX + 150} y2={cartY - 18} className="stroke-yellow-600" strokeWidth="3" />

                    {/* Blue Figure (Pulling) */}
                    <StickFigure x={cartX + 100} y={cartY} color="#3B82F6" />
                    
                    {/* Green Figure (Pulling) */}
                    <StickFigure x={cartX + 130} y={cartY} color="#10B981" />

                    {/* Force Arrows on the cart */}
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: animDelay - 0.5}}>
                        {/* Force 1 (3N) */}
                        <ForceArrow x1={cartX} y1={cartY - 60} x2={cartX + 60} y2={cartY - 60} color="#3B82F6" label="3 N" />
                        {/* Force 2 (5N) */}
                        <ForceArrow x1={cartX} y1={cartY - 40} x2={cartX + 100} y2={cartY - 40} color="#10B981" label="5 N" />
                    </motion.g>
                </motion.g>

                {/* Resultant Force Arrow (Appears later) */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: animDelay + 0.5, duration: 0.5 }}
                >
                    <ForceArrow x1={cartX + 80} y1={cartY - 85} x2={cartX + 240} y2={cartY - 85} color="#F59E0B" label="Resultant Force (8 N)" />
                </motion.g>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT ---


export default function MeasurementOfForcesSlide3() {
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
          id: 'same-direction-force-quiz',
          conceptId: 'same-direction-force',
          conceptName: 'Forces in Same Direction',
          type: 'judging',
          description: 'Testing how to add forces in the same direction.'
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
            id: 'q1-calculation',
            question: 'One person pushes a box with 10 N of force. Another person pushes in the SAME direction with 20 N. What is the resultant force?',
            options: [
                '10 N',
                '20 N',
                '30 N',
                '0 N'
            ],
            correctAnswer: '30 N',
            explanation: 'Correct! Since the forces are in the same direction, you add them: 10 N + 20 N = 30 N.'
        },
        {
            id: 'q2-effect',
            question: 'When two forces act in the same direction, the resultant force is...',
            options: [
                'Stronger than the individual forces.',
                'Weaker than the individual forces.',
                'Zero.'
            ],
            correctAnswer: 'Stronger than the individual forces.',
            explanation: "That's right! The forces combine, or 'team up', to create a single, stronger force."
        },
        {
            id: 'q3-rule',
            question: 'How do you find the resultant force when forces act in the same direction?',
            options: [
                'Subtract the smaller from the larger force.',
                'Add the forces together.',
                'Multiply the forces.',
            ],
            correctAnswer: 'Add the forces together.',
            explanation: 'Exactly! The rule is to find their sum (add them).'
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
          interactionId: `same-direction-force-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
          value: answerText,
          isCorrect,
          timestamp: Date.now(),
          conceptId: 'same-direction-force',
          conceptName: 'Forces in Same Direction',
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Content */}
                <div className="space-y-6 flex flex-col">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-blue-500/50">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            Forces in the Same Direction
                        </h2>
                        
                        {/* Content from your image */}
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>When two forces act in the same direction, the resultant is <strong>their sum</strong>.</li>
                            <li>
                                <strong>Example:</strong> 5 N + 3 N = <strong>8 N</strong> (same direction)
                            </li>
                            <li>The object experiences a <strong>stronger force</strong> in that direction.</li>
                        </ul>
                    </div>
                    
                    {/* --- EXTRA CONTENT ADDED HERE --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Real-World Example</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            Think about pushing a stalled car.
                        </p>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>If one person pushes, the car might not move.</li>
                            <li>If a second person helps, and they **both push together** (in the same direction), their forces add up.</li>
                            <li>This combined force (the resultant force) is much larger and can get the car moving.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Animation and NEW Quiz */}
                <div className="space-y-6 flex flex-col">
                    {/* Card 1: Animation (Unchanged) */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            Forces Add Up
                        </h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <SameDirectionAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Both forces pull together. Their strengths (3 N and 5 N) add up to a single resultant force of 8 N, making the cart move right.
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
            slideId="forces-in-same-direction" // From index.tsx
            slideTitle="Forces in the Same Direction" // From index.tsx
            moduleId="physics-force"
            submoduleId="measurement-of-forces"
            interactions={localInteractions} // Pass the interactions up
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}