import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept'; // Added
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react'; // Added

// --- REFERENCE-STYLE ARROW COMPONENT (UNCHANGED from previous version) ---
const ForceArrow: React.FC<{ x1: number, y1: number, x2: number, y2: number, color: string, label: string }> = ({ x1, y1, x2, y2, color, label }) => {
    const isLeft = x2 < x1;
    const headOffset = isLeft ? 5 : -5;

    return (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="4" />
            <path d={`M ${x2 + headOffset} ${y2 - 5} L ${x2} ${y2} L ${x2 + headOffset} ${y2 + 5}`} fill="none" stroke={color} strokeWidth="4" />
            <text x={(x1 + x2) / 2} y={y1 - 10} fill={color} textAnchor="middle" className="text-sm font-semibold">{label}</text>
        </motion.g>
    );
};


// --- TYPE DEFINITIONS FOR SCENES (SIMPLIFIED) ---
type SimpleScene = {
    object: JSX.Element;
    arrows: JSX.Element;
    result: string;
};

type SimpleScenes = {
    static: SimpleScene;
    sliding: SimpleScene;
    rolling: SimpleScene;
};

// --- NEW SIMPLER ANIMATION COMPONENT ---
const FrictionTypesAnimation: React.FC = () => {
    type FrictionType = 'static' | 'sliding' | 'rolling';
    const [activeTab, setActiveTab] = useState<FrictionType>('static');

    const svgWidth = 400;
    const svgHeight = 200;
    const groundY = 180;
    const boxSize = 60;
    const wheelRadius = 30;

    const scenes: SimpleScenes = {
        static: {
            object: (
                <motion.rect
                    x={svgWidth / 2 - boxSize / 2}
                    y={groundY - boxSize}
                    width={boxSize}
                    height={boxSize}
                    fill="#78350F" // Brown color for box
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                />
            ),
            arrows: (
                <motion.g>
                    {/* Equal arrows */}
                    <ForceArrow x1={svgWidth / 2 - boxSize / 2 - 10} y1={groundY - boxSize / 2} x2={svgWidth / 2 - boxSize / 2 - 60} y2={groundY - boxSize / 2} color="#3B82F6" label="Push (50N)" />
                    <ForceArrow x1={svgWidth / 2 + boxSize / 2 + 10} y1={groundY - boxSize / 2} x2={svgWidth / 2 + boxSize / 2 + 60} y2={groundY - boxSize / 2} color="#EF4444" label="Static Friction (50N)" />
                </motion.g>
            ),
            result: "Result: No Movement (Forces are balanced)"
        },
        sliding: {
            object: (
                <motion.rect
                    y={groundY - boxSize}
                    width={boxSize}
                    height={boxSize}
                    fill="#A16207" // Slightly lighter brown
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 280, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            ),
            arrows: (
                 <motion.g
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 280, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    {/* Push > Friction */}
                    <ForceArrow x1={-10} y1={groundY - boxSize / 2} x2={-80} y2={groundY - boxSize / 2} color="#3B82F6" label="Push (80N)" />
                    <ForceArrow x1={boxSize + 10} y1={groundY - boxSize / 2} x2={boxSize + 50} y2={groundY - boxSize / 2} color="#EF4444" label="Sliding Friction (40N)" />
                </motion.g>
            ),
            result: "Result: Sliding (Push > Friction)"
        },
        rolling: {
            object: (
                <motion.g
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 300, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <motion.circle
                        cy={groundY - wheelRadius}
                        r={wheelRadius}
                        fill="#334155" // Dark grey for wheel
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.0, ease: "linear", repeat: Infinity }}
                    />
                </motion.g>
            ),
            arrows: (
                 <motion.g
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 300, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    {/* Push >> Friction */}
                    <ForceArrow x1={-wheelRadius - 10} y1={groundY - wheelRadius} x2={-wheelRadius - 70} y2={groundY - wheelRadius} color="#3B82F6" label="Push (60N)" />
                    <ForceArrow x1={wheelRadius + 10} y1={groundY - wheelRadius} x2={wheelRadius + 25} y2={groundY - wheelRadius} color="#EF4444" label="Rolling Friction (15N)" />
                </motion.g>
            ),
            result: "Result: Rolling (Push >> Friction)"
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-center space-x-2 mb-4">
                {(['static', 'sliding', 'rolling'] as FrictionType[]).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            activeTab === tab
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
                <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    <line x1="0" y1={groundY} x2={svgWidth} y2={groundY} className="stroke-slate-400" strokeWidth="2" />

                    <AnimatePresence mode="wait">
                        <motion.g key={activeTab}>
                            {scenes[activeTab].object}
                            {scenes[activeTab].arrows}
                        </motion.g>
                    </AnimatePresence>
                </svg>
            </div>
            <p className="text-center text-sm font-semibold text-slate-600 dark:text-slate-400 mt-2">
                {scenes[activeTab].result}
            </p>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT ---


export default function ForcesOfFrictionSlide2() {
    const { isDarkMode } = useThemeContext();

    // --- REFERENCE-STYLE QUIZ LOGIC (UNCHANGED) ---
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);

    const slideInteractions: Interaction[] = [
        {
          id: 'friction-quiz',
          conceptId: 'types-of-friction',
          conceptName: 'Types of Friction',
          type: 'judging',
          description: 'Testing understanding of friction types.'
        }
    ];

    interface QuizQuestion {
        id: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }

    // --- NEW QUESTIONS FOR FRICTION (UNCHANGED) ---
    const questions: QuizQuestion[] = [
        {
            id: 'q1-static',
            question: "You push a heavy refrigerator, but it doesn't move. What type of friction is this?",
            options: [
                'Sliding Friction',
                'Rolling Friction',
                'Static Friction',
            ],
            correctAnswer: 'Static Friction',
            explanation: "Static friction acts on objects that are not moving relative to each other."
        },
        {
            id: 'q2-sliding',
            question: 'A hockey puck slowing down as it slides on ice is an example of...',
            options: [
                'Sliding Friction',
                'Static Friction',
                'Rolling Friction',
            ],
            correctAnswer: 'Sliding Friction',
            explanation: "Sliding friction (or kinetic friction) opposes the motion of objects sliding past each other."
        },
        {
            id: 'q3-rolling',
            question: 'Why is it much easier to move a heavy box on a wheeled dolly?',
            options: [
                'Rolling friction is much weaker than sliding friction.',
                'The wheels get rid of all friction.',
                'Static friction becomes stronger.',
            ],
            correctAnswer: 'Rolling friction is much weaker than sliding friction.',
            explanation: 'Rolling friction is significantly less than sliding friction, which is why wheels make it so much easier to move heavy things.'
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
          interactionId: `friction-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
          value: answerText,
          isCorrect,
          timestamp: Date.now(),
          conceptId: 'types-of-friction',
          conceptName: 'Types of Friction',
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
            {/* --- LAYOUT FIX: Removed justify-center --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Content */}
                <div className="space-y-6 flex flex-col">
                   { <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                        Types of Friction
                    </h2>
                    }
                    {/* Card 1: Static Friction */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Static Friction</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            Acts between two objects that are <strong>not moving</strong> relative to each other.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                            <strong>Example:</strong> Trying to push a heavy box that doesn't move.
                        </p>
                    </div>

                    {/* Card 2: Sliding Friction */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Sliding Friction</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            Acts when one object <strong>slides</strong> over another.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                            <strong>Example:</strong> A book sliding on a table.
                        </p>
                    </div>

                    {/* Card 3: Rolling Friction */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Rolling Friction</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            Acts when an object <strong>rolls</strong> over a surface.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                            <strong>Example:</strong> A ball or car tyre moving on the road.
                        </p>
                    </div>

                    {/* --- EXTRA KEY TAKEAWAY CARD --- */}
                     <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Key Takeaway</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            The main thing to remember is the relative strength of the forces:
                        </p>
                        <p className="text-lg text-center font-bold text-slate-800 dark:text-slate-100 mt-3">
                            Static Friction {'>'} Sliding Friction {'>'} Rolling Friction
                        </p>
                    </div>
                </div>

                {/* Right Column - Animation & NEW QUIZ */}
                <div className="space-y-6 flex flex-col">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                            See the Difference
                        </h3>
                        {/* --- USING THE NEW SIMPLER ANIMATION --- */}
                        <FrictionTypesAnimation />
                    </div>

                    {/* --- REFERENCE-STYLE QUIZ CARD ADDED HERE --- */}
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
            slideId="types-of-friction"
            slideTitle="Types of Friction"
            moduleId="physics-force"
            submoduleId="forces-of-friction"
            interactions={localInteractions} // Pass interactions up
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}