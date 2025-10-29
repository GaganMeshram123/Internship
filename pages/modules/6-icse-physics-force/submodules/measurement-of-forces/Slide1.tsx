import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import { CheckCircle, XCircle } from 'lucide-react'; // For quiz feedback

// --- NEW ANIMATION COMPONENT: SEESAW ---
const SeesawAnimation: React.FC = () => {
    type ForceScenario = 'small_down' | 'large_down' | 'up';
    const [activeScenario, setActiveScenario] = useState<ForceScenario>('small_down');

    const svgWidth = 400;
    const svgHeight = 250;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2 + 30; // Move pivot down slightly
    const plankWidth = 250;
    const plankHeight = 15;

    // Simple arrow
    const Arrow: React.FC<{ x: number, y: number, length: number, direction: 'down' | 'up', label: string, color: string, delay?: number }> =
        ({ x, y, length, direction, label, color, delay = 0 }) => {
        let y2 = y;
        let headPath = '';
        let textX = x, textY = y;

        if (direction === 'down') {
            y2 = y + length;
            headPath = `M ${x - 4} ${y2 - 5} L ${x} ${y2} L ${x + 4} ${y2 - 5}`;
            textX = x + 8;
            textY = y + length / 2;
        } else { // direction === 'up'
            y2 = y - length;
            headPath = `M ${x - 4} ${y2 + 5} L ${x} ${y2} L ${x + 4} ${y2 + 5}`;
            textX = x + 8;
            textY = y - length / 2;
        }

        return (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay }}>
                <line x1={x} y1={y} x2={x} y2={y2} stroke={color} strokeWidth="3" />
                <path d={headPath} fill={color} />
                <text x={textX} y={textY} dominantBaseline="middle" className="text-xs font-semibold" fill={color}>{label}</text>
            </motion.g>
        );
    };

    const scenarios = {
        small_down: {
            arrow: <Arrow x={centerX + plankWidth * 0.4} y={centerY - 50} length={30} direction="down" label="Small Force" color="#3B82F6" delay={0.2} />,
            seesawRotate: -15, // Slight tilt down right
            transition: { delay: 0.5, duration: 0.8, ease: 'easeOut' }
        },
        large_down: {
            arrow: <Arrow x={centerX + plankWidth * 0.4} y={centerY - 70} length={60} direction="down" label="Large Force" color="#3B82F6" delay={0.2} />,
            seesawRotate: -35, // Steep tilt down right
            transition: { delay: 0.5, duration: 1.0, ease: 'easeOut' }
        },
        up: {
            arrow: <Arrow x={centerX + plankWidth * 0.4} y={centerY + 50} length={40} direction="up" label="Different Direction" color="#3B82F6" delay={0.2} />,
            seesawRotate: 25, // Tilts up right
            transition: { delay: 0.5, duration: 0.9, ease: 'easeOut' }
        }
    };

    return (
        <div className="w-full">
            {/* Tabs */}
             <div className="flex justify-center space-x-2 mb-4">
                {(['small_down', 'large_down', 'up'] as ForceScenario[]).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveScenario(tab)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                            activeScenario === tab
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                    >
                        {tab === 'small_down' ? 'Small Force Down' : tab === 'large_down' ? 'Large Force Down' : 'Force Up'}
                    </button>
                ))}
            </div>

            {/* Animation Canvas */}
            <div className="w-full flex justify-center items-center p-4 rounded-lg bg-blue-900 overflow-hidden" style={{ minHeight: svgHeight }}>
                <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                    {/* Fulcrum (Triangle) */}
                    <path d={`M ${centerX} ${centerY} L ${centerX - 15} ${centerY + 25} L ${centerX + 15} ${centerY + 25} Z`} fill="#94A3B8" />

                    <AnimatePresence mode="wait">
                         <motion.g key={activeScenario}> {/* Group for arrow + seesaw */}
                            {/* Seesaw Plank - Animates Rotation */}
                            <motion.rect
                                x={centerX - plankWidth / 2}
                                y={centerY - plankHeight / 2}
                                width={plankWidth}
                                height={plankHeight}
                                fill="#F97316" // Orange
                                stroke="#A16207"
                                strokeWidth="2"
                                style={{ transformOrigin: `${centerX}px ${centerY}px` }} // Rotate around the center pivot
                                initial={{ rotate: 0 }}
                                animate={{ rotate: scenarios[activeScenario].seesawRotate }}
                                transition={scenarios[activeScenario].transition}
                            />

                            {/* Arrow */}
                            {scenarios[activeScenario].arrow}
                        </motion.g>
                    </AnimatePresence>
                </svg>
            </div>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT ---


export default function MeasurementOfForcesSlide1() {
    const { isDarkMode } = useThemeContext();

    // --- QUIZ STATE & LOGIC (Unchanged) ---
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);

    const slideInteractions: Interaction[] = [
        {
          id: 'force-magnitude-quiz',
          conceptId: 'force-magnitude-direction',
          conceptName: 'Force Magnitude & Direction',
          type: 'judging',
          description: 'Testing understanding of force as a vector.'
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
            question: 'What two properties are required to fully describe a force?',
            options: [
                'Mass and Speed',
                'Magnitude and Direction',
                'Strength and Weight',
                'Direction and Mass'
            ],
            correctAnswer: 'Magnitude and Direction',
            explanation: 'Force is a vector, so it must have both a magnitude (strength) and a direction.'
        },
        {
            id: 'q2-magnitude',
            question: 'What does the "magnitude" of a force describe?',
            options: [
                'Which way it is pushing',
                'How much it weighs',
                'How fast it is going',
                'How strong it is'
            ],
            correctAnswer: 'How strong it is',
            explanation: "Magnitude is the size or strength, like 10 N or 50 lbs."
        },
        {
            id: 'q3-vector',
            question: 'A 20 N force pushes a box East. A 20 N force pushes a box West. Are these two forces the same?',
            options: [
                'Yes, because the magnitude is the same.',
                'No, because the directions are different.',
                'It depends on the mass of the box.'
            ],
            correctAnswer: 'No, because the directions are different.',
            explanation: 'Even with the same magnitude (20 N), the different directions make them different forces with different effects.'
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
          interactionId: `force-magnitude-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
          value: answerText,
          isCorrect,
          timestamp: Date.now(),
          conceptId: 'force-magnitude-direction',
          conceptName: 'Force Magnitude & Direction',
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
            {/* --- UI FIX: Removed justify-center from grid columns --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Content */}
                <div className="space-y-6 flex flex-col">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border-2 border-blue-500/50">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                            Force Has Magnitude and Direction
                        </h2>
                        <ul className="mt-4 space-y-3 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
                            <li>A force is not just about how strong it is — it also has a <strong>direction</strong>.</li>
                            <li>So, to describe a force fully, we must say how much (<strong>magnitude</strong>) and which way (<strong>direction</strong>) it acts.</li>
                            <li><strong>Example:</strong> A push of 10 N to the right is different from 10 N upward.</li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Force is a Vector</h3>
                        <p className="text-lg text-slate-700 dark:text-slate-300">
                            In physics, any quantity that has <strong>both magnitude and direction</strong> is called a <strong>vector</strong>.
                        </p>
                        <dl className="mt-4 space-y-2 text-lg">
                            {/* --- UI FIX: Removed non-blue colors --- */}
                            <dt className="font-semibold text-slate-800 dark:text-slate-200">
                                <span className="font-semibold">Vector</span> (like Force):
                            </dt>
                            <dd className="ml-4 text-slate-600 dark:text-slate-400">Has magnitude AND direction. (e.g., "10 Newtons to the right")</dd>

                            <dt className="font-semibold text-slate-800 dark:text-slate-200">
                                <span className="font-semibold">Scalar</span> (like Mass):
                            </dt>
                            <dd className="ml-4 text-slate-600 dark:text-slate-400">Has magnitude ONLY. (e.g., "5 kilograms". It makes no sense to say "5 kg to the right")</dd>
                        </dl>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6 flex flex-col">
                    {/* Card 1: Animation (REPLACED) */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">
                           Magnitude and Direction on a Seesaw
                        </h3>
                        {/* --- USING NEW ANIMATION --- */}
                        <SeesawAnimation />
                        {/* --- UPDATED TEXT --- */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            The arrow's length (magnitude) and orientation (direction) determine the force's effect on the seesaw's tilt.
                        </p>
                    </div>

                    {/* Card 2: Quiz (Unchanged) */}
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
            slideId="force-magnitude-and-direction"
            slideTitle="Force Has Magnitude and Direction"
            moduleId="physics-force"
            submoduleId="measurement-of-forces"
            interactions={localInteractions} // Pass the interactions up
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}