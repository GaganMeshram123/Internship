import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react'; // For quiz feedback

// --- ANIMATION COMPONENT (Unchanged) ---
const VisualizingNewtonAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const groundY = 200;
    const animDelay = 0.5;

    // Re-usable arrow
    const GravityArrow: React.FC<{ x: number, y1: number, y2: number, color: string, label: string, delay: number }> = 
        ({ x, y1, y2, color, label, delay }) => (
        <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 0.5 }}
        >
            <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth="3" />
            <path d={`M ${x - 4} ${y2 - 6} L ${x} ${y2} L ${x + 4} ${y2 - 6}`} fill={color} />
            <text x={x + 8} y={(y1 + y2) / 2} fill={color} className="text-sm font-semibold">{label}</text>
        </motion.g>
    );

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Ground */}
                <line x1="0" y1={groundY} x2={svgWidth} y2={groundY} className="stroke-slate-400" strokeWidth="2" />

                {/* 1. The Apple (for 1 Newton) */}
                <g transform="translate(100, 180)">
                    <path d="M 0 -10 C -10 -10, -15 -5, -15 0 C -15 10, -5 20, 0 20 C 5 20, 15 10, 15 0 C 15 -5, 10 -10, 0 -10 Z" fill="#EF4444" />
                    <line x1="0" y1="-10" x2="2" y2="-15" stroke="#8D6E63" strokeWidth="2" />
                </g>
                <text x="100" y={groundY + 15} textAnchor="middle" className="text-xs fill-slate-700 dark:fill-slate-300">~100 g</text>
                <GravityArrow x={100} y1={120} y2={175} color="#3B82F6" label="Force ≈ 1 N" delay={animDelay} />


                {/* 2. The 1kg Mass (for 1 kgf) */}
                <g transform={`translate(${svgWidth - 120}, ${groundY - 40})`}>
                    <rect x="0" y="0" width="40" height="40" fill="#94A3B8" className="stroke-slate-600" strokeWidth="2" />
                    <text x="20" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-800">1 kg</text>
                </g>
                <text x={svgWidth - 100} y={groundY + 15} textAnchor="middle" className="text-xs fill-slate-700 dark:fill-slate-300">1000 g</text>
                <GravityArrow x={svgWidth - 100} y1={100} y2={155} color="#F59E0B" label="Force = 1 kgf" delay={animDelay + 0.3} />
                <motion.text 
                    x={svgWidth - 100} y={85} 
                    textAnchor="middle" 
                    className="text-sm font-semibold fill-amber-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: animDelay + 0.8 }}
                >
                    (1 kgf = 9.8 N)
                </motion.text>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT ---


export default function MeasurementOfForcesSlide6() {
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
          id: 'newton-unit-quiz',
          conceptId: 'unit-of-force',
          conceptName: 'Unit of Force',
          type: 'judging',
          description: 'Testing understanding of Newtons and kgf.'
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
            id: 'q1-unit',
            question: 'What is the standard (SI) unit of force?',
            options: [
                'Kilogram (kg)',
                'Newton (N)',
                'Kilogram-force (kgf)',
            ],
            correctAnswer: 'Newton (N)',
            explanation: 'Correct! The Newton (N) is the standard international unit for force.'
        },
        {
            id: 'q2-kgf-conversion',
            question: 'A 1 kg mass weighs approximately...',
            options: [
                '1 N',
                '10 N (or 9.8 N)',
                '0.1 N',
            ],
            correctAnswer: '10 N (or 9.8 N)',
            explanation: "That's right! The force of gravity on a 1 kg mass is 1 kgf, which is equal to 9.8 N (or about 10 N)."
        },
        {
            id: 'q3-formal-definition',
            question: 'The formal definition of 1 Newton is the force needed to...',
            options: [
                'Hold a 1kg mass still.',
                'Accelerate a 1kg mass by 1 m/s².',
                'Lift an apple.',
            ],
            correctAnswer: 'Accelerate a 1kg mass by 1 m/s².',
            explanation: 'Exactly! This is the formal definition, from Newton\'s Second Law (F=ma).'
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
          interactionId: `newton-unit-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
          value: answerText,
          isCorrect,
          timestamp: Date.now(),
          conceptId: 'unit-of-force',
          conceptName: 'Unit of Force',
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
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-yellow-500/50">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            SI Unit of Force — The Newton (N)
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>The SI unit (Standard International unit) of force is the <strong>Newton (symbol: N)</strong>.</li>
                            <li>It is named after <strong>Sir Isaac Newton</strong>, the scientist who explained gravity and motion.</li>
                            <li>A Newton is a small amount of force. It's about the force of gravity pulling on a small <strong>apple</strong> (which has a mass of about 100g).</li>
                        </ul>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Note: What is 'kgf'?</h4>
                            <ul className="mt-2 space-y-2 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                                <li><strong>kilogram-force (kgf)</strong> is the force with which the Earth pulls a mass of <strong>1 kilogram</strong> toward itself.</li>
                                <li>1 kgf = <strong>9.8 N</strong> (we often approximate this as 10 N for simple calculations).</li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* --- EXTRA CONTENT ADDED HERE --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Formal Definition</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            The "apple" is an easy way to visualize it, but the official scientific definition is:
                        </p>
                        <blockquote className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500">
                            <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                                One Newton (1 N) is the amount of force required to accelerate a mass of 1 kilogram (1 kg) at a rate of 1 meter per second squared (1 m/s²).
                            </p>
                        </blockquote>
                        <p className="mt-4 text-lg text-slate-700 dark:text-slate-300 font-mono">
                            F = m × a  &rarr;  1 N = 1 kg × 1 m/s²
                        </p>
                    </div>
                </div>

                {/* Right Column - Animation and NEW Quiz */}
                <div className="space-y-6 flex flex-col">
                    {/* Card 1: Animation (Unchanged) */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            Visualizing 1 N vs. 1 kgf
                        </h3>
                        <VisualizingNewtonAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            The force on a 1 kg mass (1 kgf) is <strong>9.8 times stronger</strong> than the force on a 100g apple (approx. 1 N).
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
            slideId="unit-of-force-newton" // From index.tsx
            slideTitle="Unit of Force: The Newton (N)" // From index.tsx
            moduleId="physics-force"
            submoduleId="measurement-of-forces"
            interactions={localInteractions} // Pass the interactions up
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}