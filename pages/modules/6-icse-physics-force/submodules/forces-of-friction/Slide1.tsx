import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react'; // For quiz feedback

// --- NEW ANIMATION COMPONENT 1: FRICTION OPPOSES MOTION (WITH MOTION) ---
const FrictionOpposesAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 150;
    const groundY = 100;
    
    // Simple arrow
    const Arrow: React.FC<{ x: number, y: number, length: number, label: string, color: string, left?: boolean, delay?: number }> = 
        ({ x, y, length, label, color, left = false, delay = 0 }) => {
        const x2 = left ? x - length : x + length;
        const headOffset = left ? 5 : -5;
        return (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay }}>
                <line x1={x} y1={y} x2={x2} y2={y} stroke={color} strokeWidth="3" />
                <path d={`M ${x2 + headOffset} ${y - 4} L ${x2} ${y} L ${x2 + headOffset} ${y + 4}`} fill={color} />
                <text x={(x + x2) / 2} y={y - 8} textAnchor="middle" className="text-xs font-semibold" fill={color}>{label}</text>
            </motion.g>
        );
    };

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-blue-900/50 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Ground */}
                <line x1="0" y1={groundY} x2={svgWidth} y2={groundY} className="stroke-slate-400" strokeWidth="2" />
                
                {/* Box (Now Animates Sliding) */}
                <motion.rect
                    x={100} // Start position
                    y={groundY - 40}
                    width={80}
                    height={40}
                    fill="#F97316" // Orange
                    initial={{ x: 100, opacity: 1 }}
                    animate={{ x: 220 }} // End position
                    transition={{ delay: 1.5, duration: 2.5, ease: "easeInOut" }}
                />
                
                {/* Applied Force Arrow (Appears first) */}
                <Arrow x={90} y={groundY - 20} length={50} label="Applied Force" color="#3B82F6" delay={0.5} />
                
                {/* Friction Force Arrow (Appears second, moves with box) */}
                <motion.g
                     initial={{ x: 100, opacity: 0 }}
                     animate={{ x: 220, opacity: 1 }} // Moves with the box
                     transition={{ delay: 1.5, duration: 2.5, ease: "easeInOut" }}
                >
                    {/* Position relative to the moving group */}
                     <Arrow x={90} y={groundY - 20} length={40} label="Friction Force" color="#EF4444" left={true} delay={1.0} /> 
                </motion.g>
            </svg>
        </div>
    );
};

// --- NEW ANIMATION COMPONENT 2: MICROSCOPIC VIEW (WITH JIGGLE) ---
const MicroscopicViewAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 150;
    const surfaceY = 75;
    
    // Simple jagged line
    const jaggedPath = "M 0 0 l 15 -15 l 15 15 l 15 -15 l 15 15 l 15 -15 l 15 15 l 15 -15 l 15 15 l 15 -15 l 15 15 l 15 -15 l 15 15 l 15 -15 l 15 15 l 15 -15 l 15 15";

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-blue-900/50 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Bottom Surface (Static) */}
                <rect x="0" y={surfaceY} width={svgWidth} height={svgHeight - surfaceY} fill="#94A3B8" />
                <path d={`M 0 ${surfaceY} ${jaggedPath}`} stroke="#475569" strokeWidth="2" fill="#94A3B8" />

                {/* Top Surface (Animates Side-to-Side with Jiggle) */}
                <motion.g
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, -5, 5, 0] }} // Side-to-side motion
                    transition={{ 
                        delay: 1, 
                        duration: 1.5, 
                        ease: "easeInOut", 
                        repeat: Infinity, 
                        repeatDelay: 1 
                    }}
                >
                     <motion.g 
                        animate={{ y: [0, -1, 1, -1, 0]}} // Jiggle effect
                         transition={{ 
                            duration: 0.1, 
                            ease: "linear",
                            repeat: Infinity,
                         }}
                    >
                        <rect x="0" y="0" width={svgWidth} height={surfaceY} fill="#F97316" />
                        <path d={`M 0 ${surfaceY} ${jaggedPath}`} transform={`scale(1, -1) translate(0, -${surfaceY})`} stroke="#A16207" strokeWidth="2" fill="#F97316" />
                    </motion.g>
                </motion.g>
                
                <text x={svgWidth/2} y={surfaceY + 5} textAnchor="middle" className="text-sm fill-red-500 font-bold">Interlocking Bumps</text>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENTS ---


export default function ForcesOfFrictionSlide1() {
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
          id: 'what-is-friction-quiz',
          conceptId: 'what-is-friction',
          conceptName: 'What is Friction?',
          type: 'judging',
          description: 'Testing understanding of friction definition and cause.'
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
            question: 'What is friction?',
            options: [
                'A force that speeds things up.',
                'A force that opposes motion.',
                'A force that only acts on heavy objects.',
            ],
            correctAnswer: 'A force that opposes motion.',
            explanation: 'Friction is a contact force that always tries to stop or slow down movement.' // Removed "Correct!"
        },
        {
            id: 'q2-direction',
            question: 'If you push a box to the RIGHT, which way does friction act?',
            options: [
                'To the RIGHT',
                'To the LEFT',
                'UP',
            ],
            correctAnswer: 'To the LEFT',
            explanation: "Friction always acts in the opposite direction of the motion or intended motion." // Removed "That's right!"
        },
        {
            id: 'q3-cause',
            question: 'What is the main cause of friction at a microscopic level?',
            options: [
                'Gravity',
                'Magnetism',
                'Microscopic bumps and ridges (irregularities).',
            ],
            correctAnswer: 'Microscopic bumps and ridges (irregularities).',
            explanation: 'These tiny irregularities on all surfaces interlock and catch on each other.' // Removed "Exactly!"
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
          interactionId: `what-is-friction-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
          value: answerText,
          isCorrect,
          timestamp: Date.now(),
          conceptId: 'what-is-friction',
          conceptName: 'What is Friction?',
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
                    {/* Card 1: What is Friction? */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-blue-500/50">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            What is Friction?
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>Friction is a <strong>contact force</strong> that opposes, or tries to oppose, motion.</li>
                            <li>It acts between two surfaces that are touching each other.</li>
                            <li>Friction always acts in the <strong>opposite direction</strong> to the movement of the object.</li>
                            <li>Example: When you push a book right, friction pushes left.</li>
                        </ul>
                    </div>
                    
                    {/* Card 2: Why Does it Occur? */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-blue-500/50">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            Why Does Friction Occur?
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>No surface is perfectly smooth.</li>
                            <li>Every surface has tiny, microscopic <strong>bumps and ridges</strong> (irregularities).</li>
                            <li>When two surfaces rub, these irregularities <strong>lock together</strong>, producing friction.</li>
                        </ul>
                    </div>
                    
                    {/* --- EXTRA CONTENT ADDED HERE --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Friction in Daily Life</h3>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li><strong>Walking:</strong> Friction between your shoes and the ground stops you from slipping.</li>
                            <li><strong>Writing:</strong> Friction holds the pencil lead or ink on the paper.</li>
                            <li><strong>Brakes:</strong> Car and bike brakes use friction to stop the wheels from spinning.</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Animations and Quiz */}
                <div className="space-y-6 flex flex-col">
                    {/* Animation 1 Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            Friction Opposes Motion
                        </h3>
                        <FrictionOpposesAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            As an "Applied Force" pushes the box right, "Friction Force" pushes back to the left.
                        </p>
                    </div>

                    {/* Animation 2 Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            A Microscopic Look
                        </h3>
                        <MicroscopicViewAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Zoomed in, you can see the tiny bumps on both surfaces catching on each other.
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
                                <div className="text-lg mb-4 text-slate-800 dark:text-slate-200 min-h-[4rem]">{questions[currentQuestionIndex].question}</div>
                                <div className="space-y-3">
                                    {questions[currentQuestionIndex].options.map((option, idx) => {
                                        const disabled = showFeedback;
                                        const selected = selectedAnswer === option;
                                        const correct = option === questions[currentQuestionIndex].correctAnswer;
                                        
                                        // --- QUIZ BUTTON STYLE LOGIC (Corrected) ---
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
                                        // --- END OF QUIZ BUTTON LOGIC ---
                                        
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
                                            {/* --- QUIZ FEEDBACK TEXT LOGIC (Corrected) --- */}
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
                                            {/* --- END OF QUIZ FEEDBACK TEXT LOGIC --- */}
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
            slideId="what-is-friction" // From index.tsx
            slideTitle="What is Friction?" // From index.tsx
            moduleId="physics-force"
            submoduleId="forces-of-friction"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}