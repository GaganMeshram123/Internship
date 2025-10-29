import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react'; // For quiz feedback

// --- ANIMATION COMPONENTS (Unchanged) ---
// Re-usable stick figure component
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

// Re-usable arrow component
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

// Animation for this specific slide
const OppositeDirectionAnimation: React.FC = () => {
    const svgWidth = 450;
    const svgHeight = 200;
    
    const cartX = 225; // Start cart in the middle
    const cartY = 150;
    
    const resultantMoveX = 80; // Move to the right
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
                    transition={{ delay: animDelay, duration: animDuration, ease: "easeInOut" }}
                >
                    {/* Cart */}
                    <g transform={`translate(${cartX}, ${cartY})`}>
                        <rect x="-25" y="-30" width="50" height="30" fill="#94A3B8" className="stroke-slate-600" strokeWidth="2" />
                        <circle cx="-15" cy="0" r="8" fill="#334155" />
                        <circle cx="15" cy="0" r="8" fill="#334155" />
                    </g>
                    
                    {/* Ropes */}
                    <line x1={cartX - 25} y1={cartY - 18} x2={cartX - 90} y2={cartY - 18} className="stroke-yellow-600" strokeWidth="3" />
                    <line x1={cartX + 25} y1={cartY - 18} x2={cartX + 90} y2={cartY - 18} className="stroke-yellow-600" strokeWidth="3" />

                    {/* Blue Figure (Left, 5N) */}
                    <StickFigure x={cartX - 100} y={cartY} color="#3B82F6" mirror={true} />
                    
                    {/* Red Figure (Right, 8N) */}
                    <StickFigure x={cartX + 100} y={cartY} color="#EF4444" />

                    {/* Force Arrows on the cart */}
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: animDelay - 0.5}}>
                        {/* Right Force (8N) */}
                        <ForceArrow x1={cartX} y1={cartY - 40} x2={cartX + 120} y2={cartY - 40} color="#EF4444" label="8 N (Right)" />
                        {/* Left Force (5N) */}
                        <ForceArrow x1={cartX} y1={cartY - 40} x2={cartX - 75} y2={cartY - 40} color="#3B82F6" label="5 N (Left)" />
                    </motion.g>
                </motion.g>

                {/* Resultant Force Arrow (Appears later) */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: animDelay + 0.5, duration: 0.5 }}
                >
                    <ForceArrow x1={cartX} y1={cartY - 85} x2={cartX + 60} y2={cartY - 85} color="#F59E0B" label="Resultant = 3 N (Right)" />
                </motion.g>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT ---


export default function MeasurementOfForcesSlide4() {
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
          id: 'opposite-direction-force-quiz',
          conceptId: 'opposite-direction-force',
          conceptName: 'Forces in Opposite Directions',
          type: 'judging',
          description: 'Testing how to subtract forces.'
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
            question: 'A force of 15 N pulls RIGHT, and a force of 10 N pulls LEFT. What is the resultant force?',
            options: [
                '25 N (Right)',
                '5 N (Right)',
                '5 N (Left)',
                '0 N'
            ],
            correctAnswer: '5 N (Right)',
            explanation: 'Correct! You subtract opposite forces (15 - 10 = 5) and the result is in the direction of the larger force (right).'
        },
        {
            id: 'q2-rule',
            question: 'How do you find the resultant force for forces in opposite directions?',
            options: [
                'Add the forces together.',
                'Subtract the smaller from the larger force.',
                'Multiply the forces.',
            ],
            correctAnswer: 'Subtract the smaller from the larger force.',
            explanation: "Exactly! The forces work against each other, so their net effect is the difference between them."
        },
        {
            id: 'q3-effect',
            question: 'In the animation, why does the cart move to the right?',
            options: [
                'Because the 8 N force is larger than the 5 N force.',
                'Because the 5 N force is helping the 8 N force.',
                'Because the ground is sloped.',
            ],
            correctAnswer: 'Because the 8 N force is larger than the 5 N force.',
            explanation: "Right! The resultant force is 3 N to the right (8 N - 5 N), so the cart's motion changes in that direction."
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
          interactionId: `opposite-direction-force-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
          value: answerText,
          isCorrect,
          timestamp: Date.now(),
          conceptId: 'opposite-direction-force',
          conceptName: 'Forces in Opposite Directions',
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
                            Forces in Opposite Directions
                        </h2>
                        
                        {/* Content from your image */}
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>When two forces act in opposite directions, the resultant is the <strong>difference</strong> between them.</li>
                            <li>
                                <strong>Example:</strong> 8 N (right) and 5 N (left) &rarr; Resultant = <strong>3 N (right)</strong>
                            </li>
                            <li>The object moves in the direction of the <strong>larger force</strong>.</li>
                        </ul>
                    </div>
                    
                    {/* --- EXTRA CONTENT ADDED HERE --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Real-World Example: Tug-of-War</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            Imagine two teams in a tug-of-war.
                        </p>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>Team A pulls LEFT with <strong>100 N</strong>.</li>
                            <li>Team B pulls RIGHT with <strong>120 N</strong>.</li>
                            <li>Since they pull in opposite directions, we subtract: 120 N - 100 N = <strong>20 N</strong>.</li>
                            <li>The resultant force is <strong>20 N to the right</strong> (in the direction of Team B, the stronger team).</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Animation and NEW Quiz */}
                <div className="space-y-6 flex flex-col">
                    {/* Card 1: Animation (Unchanged) */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            The Stronger Force Wins
                        </h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <OppositeDirectionAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            The 8 N force to the right is stronger than the 5 N force to the left. The resultant force is 8 - 5 = 3 N to the right.
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
            slideId="forces-in-opposite-directions" // From index.tsx
            slideTitle="Forces in Opposite Directions" // From index.tsx
            moduleId="physics-force"
            submoduleId="measurement-of-forces"
            interactions={localInteractions} // Pass the interactions up
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}