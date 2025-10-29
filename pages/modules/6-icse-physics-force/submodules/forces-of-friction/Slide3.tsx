import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept'; // Added
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react'; // Added

// --- ANIMATION COMPONENT 1: EFFECTS (UNCHANGED) ---
const EffectsAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 150;
    const groundY = 130;
    const boxWidth = 60;
    const boxHeight = 40;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Ground */}
                <line x1="0" y1={groundY} x2={svgWidth} y2={groundY} className="stroke-slate-400" strokeWidth="2" />
                
                {/* Box that slides and slows down */}
                <motion.rect
                    x={50}
                    y={groundY - boxHeight}
                    width={boxWidth}
                    height={boxHeight}
                    fill="#A16207" // brown-700
                    initial={{ x: 50 }}
                    animate={{ x: 250 }}
                    transition={{
                        delay: 0.5,
                        duration: 2.0,
                        ease: "easeOut" // Starts fast, ends slow
                    }}
                />
                
                {/* Heat/Wear particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.circle
                        key={i}
                        cx={150} // Area where rubbing happens
                        cy={groundY - 5}
                        r={Math.random() * 3 + 1}
                        fill="#F59E0B" // Amber-500
                        initial={{ opacity: 0, x: 150 + (Math.random() - 0.5) * 100 }}
                        animate={{ opacity: [0, 1, 0], y: groundY - 20 - (Math.random() * 20) }}
                        transition={{
                            delay: 0.8 + Math.random() * 1.5,
                            duration: 1.0,
                            ease: "easeOut",
                            repeat: Infinity,
                            repeatDelay: 1.0
                        }}
                    />
                ))}
                
                <text x={150} y={40} className="text-sm font-semibold fill-slate-700 dark:fill-slate-300">
                    Object slows down
                </text>
                <text x={150} y={60} className="text-sm font-semibold fill-amber-500">
                    Heat is produced
                </text>
            </svg>
        </div>
    );
};

// --- ANIMATION COMPONENT 2: FACTORS (CORRECTED) ---
const FactorsAnimation: React.FC = () => {
    type FactorType = 'surface' | 'weight';
    const [activeTab, setActiveTab] = useState<FactorType>('surface');

    const svgWidth = 400;
    const svgHeight = 150;
    const groundY = 130;

    // A simple scene component
    const Scene: React.FC<{ boxColor: string, groundColor: string, groundLabel: string, moveDistance: number, boxText?: string }> = 
        ({ boxColor, groundColor, groundLabel, moveDistance, boxText }) => (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Ground */}
            <rect x="0" y={groundY} width={svgWidth} height={svgHeight - groundY} fill={groundColor} />
            <text x="20" y={groundY + 15} className="text-xs fill-black">{groundLabel}</text>
            
            {/* Box */}
            <motion.g
                initial={{ x: 50 }}
                animate={{ x: 50 + moveDistance }}
                transition={{ duration: 2.0, ease: "easeOut", delay: 0.5 }}
            >
                <rect y={groundY - 40} width="40" height="40" fill={boxColor} />
                {boxText && <text y={groundY - 20} x="20" textAnchor="middle" className="text-xs fill-white font-bold">{boxText}</text>}
            </motion.g>
        </motion.g>
    );

    return (
        <div className="w-full">
            {/* Tabs */}
            <div className="flex justify-center space-x-2 mb-4">
                <button
                    onClick={() => setActiveTab('surface')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        activeTab === 'surface' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                >
                    Surface Type
                </button>
                <button
                    onClick={() => setActiveTab('weight')}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        activeTab === 'weight' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                >
                    Weight
                </button>
            </div>
            
            {/* Animation Canvas */}
            <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
                <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    <AnimatePresence mode="wait">
                        {activeTab === 'surface' ? (
                            <Scene key="surface" boxColor="#A16207" groundColor="#654321" groundLabel="Rough Sand" moveDistance={100} />
                        ) : (
                            <Scene key="weight" boxColor="#A16207" groundColor="#654321" groundLabel="Rough Sand" moveDistance={100} />
                        )}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        {activeTab === 'surface' ? (
                            <Scene key="surface2" boxColor="#A16207" groundColor="#A0E9FF" groundLabel="Smooth Ice" moveDistance={300} />
                        ) : (
                            <Scene key="weight2" boxColor="#4B5563" groundColor="#654321" groundLabel="Rough Sand" moveDistance={50} boxText="HEAVY" />
                        )}
                    </AnimatePresence>
                </svg>
            </div>
            {/* --- THIS IS THE FIX --- */}
            <p className="text-center text-sm font-semibold text-slate-600 dark:text-slate-400 mt-2">
                {activeTab === 'surface' 
                    ? "More friction on rough sand (stops sooner) than smooth ice."
                    : "More friction on the heavy box (stops sooner) than the light one."
                }
            </p> 
            {/* --- THE CLOSING TAG IS NOW </p> --- */}
        </div>
    );
};

export default function ForcesOfFrictionSlide3() {
    const { isDarkMode } = useThemeContext();
    
    // --- QUIZ STATE & LOGIC (ADDED) ---
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);

    const slideInteractions: Interaction[] = [
        {
          id: 'effects-factors-quiz',
          conceptId: 'effects-factors-friction',
          conceptName: 'Effects & Factors of Friction',
          type: 'judging',
          description: 'Testing understanding of friction effects and factors.'
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
            id: 'q1-effect-heat',
            question: "Why do your hands get warm when you rub them together?",
            options: [
                'Because of static electricity.',
                'Because friction produces heat.',
                'Because your hands are heavy.',
            ],
            correctAnswer: 'Because friction produces heat.',
            explanation: "Correct! One of the main effects of friction is that it converts motion energy into heat energy."
        },
        {
            id: 'q2-factor-surface',
            question: 'On which surface will a toy car travel the *shortest* distance after a push?',
            options: [
                'A smooth ice rink',
                'A polished wood floor',
                'A rough carpet',
            ],
            correctAnswer: 'A rough carpet',
            explanation: "Right! Rough surfaces (like carpet) have a much higher nature of friction, causing the car to stop sooner."
        },
        {
            id: 'q3-factor-area',
            question: "True or False: A wide book has more friction than a narrow book *of the same weight*.",
            options: [
                'True',
                'False',
            ],
            correctAnswer: 'False',
            explanation: "Correct! This is a common misconception. Friction does *not* depend on the area of contact, only the surface type and the object's weight."
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
          interactionId: `effects-factors-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
          value: answerText,
          isCorrect,
          timestamp: Date.now(),
          conceptId: 'effects-factors-friction',
          conceptName: 'Effects & Factors of Friction',
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
            {/* --- ALIGNMENT FIX: Removed justify-center --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Content */}
                <div className="space-y-6 flex flex-col">
                    {/* Card 1: Effects of Friction */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-blue-500/50">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            Effects of Friction
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>Friction <strong>slows down or stops</strong> moving objects.</li>
                            <li>It produces <strong>heat</strong> (e.g., rubbing hands together).</li>
                            <li>It causes <strong>wear and tear</strong> in machines, shoes, and tyres.</li>
                        </ul>
                    </div>
                    
                    {/* Card 2: Factors Affecting Friction */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-blue-500/50">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            Factors Affecting Friction
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li><strong>Nature of the Surfaces:</strong> Rough surfaces (like carpet) have more friction. Smooth surfaces (like ice) have less.</li>
                            <li><strong>Weight of the Object:</strong> Heavier objects press down harder, creating more friction.</li>
                            <li><strong>Area of Contact:</strong> Friction does <em>not</em> depend much on the area of contact. (A wide book and a narrow book of the same weight have similar friction).</li>
                        </ul>
                    </div>

                    {/* --- "ETC" CARD ADDED --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Advantages & Disadvantages</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Advantages */}
                            <div>
                                <h4 className="text-lg font-semibold text-green-600 dark:text-green-400">Advantages</h4>
                                <ul className="mt-2 space-y-2 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                                    <li>Helps us walk and run.</li>
                                    <li>Allows cars to grip the road.</li>
                                    <li>Lets us hold objects.</li>
                                    <li>Brakes use friction to stop.</li>
                                </ul>
                            </div>
                             {/* Disadvantages */}
                             <div>
                                <h4 className="text-lg font-semibold text-red-600 dark:text-red-400">Disadvantages</h4>
                                <ul className="mt-2 space-y-2 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                                    <li>Wears out machine parts.</li>
                                    <li>Wears out shoe soles.</li>
                                    <li>Wastes energy (as heat).</li>
                                    <li>Slows down motion.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Animations & Quiz */}
                {/* --- ALIGNMENT FIX: Removed justify-center --- */}
                <div className="space-y-6 flex flex-col">
                    {/* Animation 1 Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            The Effects in Action
                        </h3>
                        <EffectsAnimation />
                    </div>

                    {/* Animation 2 Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            What Changes Friction?
                        </h3>
                        <FactorsAnimation />
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
                                                    <CheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                                                ) : (
                                                    <XCircle className="text-red-500 mr-2 flex-shrink-0" />
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
            slideId="effects-and-factors-of-friction" // From index.tsx
            slideTitle="Effects & Factors of Friction" // From index.tsx
            moduleId="physics-force"
            submoduleId="forces-of-friction"
            interactions={localInteractions} // Pass interactions up
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}