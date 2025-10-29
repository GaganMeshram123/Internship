import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react'; // For quiz feedback

// --- ANIMATION COMPONENT (Unchanged) ---
const SpringBalanceAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300;
    const balanceX = 200;
    const stretchAmount = 80; // How much the spring will stretch
    const animDelay = 1.0;
    const stretchDuration = 1.0;

    const tickMarks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // For 10N
    const scaleHeight = 160;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* 1. Static Balance Body */}
                <g>
                    {/* Top Ring */}
                    <circle cx={balanceX} cy="25" r="10" stroke="#94A3B8" strokeWidth="3" fill="none" />
                    {/* Casing */}
                    <rect x={balanceX - 20} y="40" width="40" height={scaleHeight + 20} rx="5" fill="#60A5FA" className="stroke-blue-700" strokeWidth="2" />
                    {/* White Scale Background */}
                    <rect x={balanceX - 15} y="50" width="30" height={scaleHeight} fill="#FFF" />
                    {/* Scale Tick Marks */}
                    {tickMarks.map(mark => {
                        const y = 50 + (mark / 10) * scaleHeight;
                        const isMajor = mark % 5 === 0;
                        return (
                            <g key={mark}>
                                <line x1={balanceX - 15} y1={y} x2={balanceX - (isMajor ? 10 : 13)} y2={y} className="stroke-slate-700" strokeWidth="1" />
                                {isMajor && <text x={balanceX + 5} y={y + 4} className="text-xs fill-slate-800 font-semibold">{mark} N</text>}
                            </g>
                        );
                    })}
                </g>
                
                {/* 2. The Moving Part (Rod, Hook, Indicator, and Weight) */}
                <motion.g
                    initial={{ y: 0 }}
                    animate={{ y: stretchAmount }}
                    transition={{
                        delay: animDelay,
                        duration: stretchDuration,
                        type: "spring",
                        stiffness: 100,
                        damping: 10
                    }}
                >
                    {/* Rod */}
                    <line x1={balanceX} y1="40" x2={balanceX} y2="100" className="stroke-slate-500" strokeWidth="3" />
                    {/* Bottom Hook */}
                    <path
                        d={`M ${balanceX - 8} 100 C ${balanceX - 8} 115, ${balanceX + 8} 115, ${balanceX + 8} 100`}
                        stroke="#94A3B8"
                        strokeWidth="3"
                        fill="none"
                    />
                    
                    {/* The Weight Block */}
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: animDelay - 0.5, duration: 0.2 }}
                    >
                        <rect x={balanceX - 15} y="115" width="30" height="30" fill="#DC2626" className="stroke-red-800" strokeWidth="2" />
                        <text x={balanceX} y="135" textAnchor="middle" className="text-sm fill-white font-bold">8 N</text>
                    </motion.g>

                </motion.g>
                
                {/* Indicator that moves to the correct spot */}
                 <motion.path
                    d={`M ${balanceX - 15} 50 L ${balanceX - 25} 55 L ${balanceX - 25} 45 Z`}
                    fill="#EF4444"
                    initial={{ y: 0 }} // Start at 0 N
                    animate={{ y: (scaleHeight * 0.8) }} // Move to 8 N (80% down the scale)
                    transition={{
                        delay: animDelay,
                        duration: stretchDuration,
                        type: "spring",
                        stiffness: 100,
                        damping: 10
                    }}
                />
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT ---


export default function MeasurementOfForcesSlide7() {
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
          id: 'spring-balance-quiz',
          conceptId: 'spring-balance',
          conceptName: 'Spring Balance',
          type: 'judging',
          description: 'Testing understanding of spring balance.'
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
            id: 'q1-function',
            question: 'What does a spring balance directly measure?',
            options: [
                'Mass (in kg)',
                'Force (in N)',
                'Speed (in m/s)',
            ],
            correctAnswer: 'Force (in N)',
            explanation: "Correct! A spring balance measures force, which is most often an object's weight (the pull of gravity)."
        },
        {
            id: 'q2-principle',
            question: "What scientific principle explains how a spring balance works?",
            options: [
                "Newton's First Law",
                "Hooke's Law",
                "The Law of Gravity",
            ],
            correctAnswer: "Hooke's Law",
            explanation: "That's right! Hooke's Law states that the force needed to stretch a spring is proportional to how much it stretches."
        },
        {
            id: 'q3-mass-weight',
            question: 'If you took a spring balance to the Moon, what would it show for the same object?',
            options: [
                'The same reading.',
                'A lower reading (less force/weight).',
                'A higher reading (more force/weight).',
            ],
            correctAnswer: 'A lower reading (less force/weight).',
            explanation: 'Exactly! The mass is the same, but the Moon has weaker gravity, so the weight (force) is less.'
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
          interactionId: `spring-balance-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
          value: answerText,
          isCorrect,
          timestamp: Date.now(),
          conceptId: 'spring-balance',
          conceptName: 'Spring Balance',
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
                            Measuring Force — The Spring Balance
                        </h2>
                        
                        {/* Content from your image */}
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>A <strong>spring balance</strong> is a simple instrument used to measure the force acting on an object.</li>
                            <li>The force it measures is typically <strong>weight</strong> (the pull of gravity).</li>
                            <li>It works using Hooke's Law: the more force you apply (pull), the more the spring stretches in a predictable way.</li>
                            <li>The scale is marked to show the force, usually in <strong>Newtons (N)</strong>.</li>
                        </ul>
                    </div>
                    
                    {/* --- EXTRA CONTENT ADDED HERE --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Mass vs. Weight: A Key Difference</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            A spring balance measures weight (force), not mass. This is a very important concept in physics!
                        </p>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li><strong>Mass:</strong> The amount of "stuff" in an object (measured in kg). This is the same everywhere.</li>
                            <li><strong>Weight:</strong> The force of gravity pulling on that mass (measured in N). This changes based on where you are.</li>
                            <li><strong>Example:</strong> Your mass is the same on Earth and the Moon. But your weight (what the spring balance shows) would be ~6 times less on the Moon!</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Animation and NEW Quiz */}
                <div className="space-y-6 flex flex-col">
                    {/* Card 1: Animation (Unchanged) */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            How a Spring Balance Works
                        </h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <SpringBalanceAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            As the 8 N weight is attached, it pulls on the spring. The spring stretches until its pulling-back force equals the weight. The indicator points to "8 N" on the scale.
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
            slideId="measuring-force-spring-balance" // From index.tsx
            slideTitle="Measuring Force: The Spring Balance" // From index.tsx
            moduleId="physics-force"
            submoduleId="measurement-of-forces"
            interactions={localInteractions} // Pass the interactions up
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}