import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const ReflectiveSymmetryAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const [revealed, setRevealed] = useState<Record<string, boolean>>({});

    const reveal = (id: string) => {
        setRevealed(prev => ({ ...prev, [id]: true }));
    };

    const lineVariant = {
        hidden: { pathLength: 0 },
        visible: { pathLength: 1, transition: { duration: 0.5, ease: "easeInOut" } }
    };

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Shape 1: Isosceles Triangle */}
                <g onClick={() => reveal('tri')} className="cursor-pointer">
                    <path d="M 50 100 L 100 50 L 150 100 Z" className="fill-blue-500 opacity-80" />
                    <text x="100" y="120" textAnchor="middle" className="fill-blue-300 text-xs font-semibold">Isosceles Triangle</text>
                    <AnimatePresence>
                        {revealed['tri'] && (
                            <motion.line
                                x1="100" y1="50" x2="100" y2="100"
                                className="stroke-red-500" strokeWidth="2" strokeDasharray="4 4"
                                variants={lineVariant} initial="hidden" animate="visible" exit="hidden"
                            />
                        )}
                    </AnimatePresence>
                </g>

                {/* Shape 2: Rectangle */}
                <g onClick={() => reveal('rect')} className="cursor-pointer">
                    <rect x="250" y="50" width="100" height="60" className="fill-green-500 opacity-80" />
                    <text x="300" y="130" textAnchor="middle" className="fill-green-300 text-xs font-semibold">Rectangle</text>
                     <AnimatePresence>
                        {revealed['rect'] && (
                            <>
                                <motion.line
                                    x1="250" y1="80" x2="350" y2="80"
                                    className="stroke-red-500" strokeWidth="2" strokeDasharray="4 4"
                                    variants={lineVariant} initial="hidden" animate="visible"
                                />
                                <motion.line
                                    x1="300" y1="50" x2="300" y2="110"
                                    className="stroke-red-500" strokeWidth="2" strokeDasharray="4 4"
                                    variants={lineVariant} initial="hidden" animate="visible"
                                />
                            </>
                        )}
                    </AnimatePresence>
                </g>

                {/* Shape 3: Parallelogram (No lines) */}
                 <g onClick={() => reveal('para')} className="cursor-pointer">
                    <path d="M 50 200 L 120 200 L 100 150 L 30 150 Z" className="fill-purple-500 opacity-80" />
                    <text x="75" y="220" textAnchor="middle" className="fill-purple-300 text-xs font-semibold">Parallelogram</text>
                    <AnimatePresence>
                        {revealed['para'] && (
                             <motion.text x="75" y="175" textAnchor="middle" className="fill-red-500 text-sm font-bold"
                                initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}}
                             >
                                 (None!)
                             </motion.text>
                        )}
                    </AnimatePresence>
                </g>

                <text x="300" y="220" textAnchor="middle" className="fill-slate-500 text-xs">(Click shapes to reveal lines)</text>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function Slide1() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [
        {
          id: 'reflective-symmetry-quiz',
          conceptId: 'reflective-symmetry',
          conceptName: 'Reflective Symmetry',
          type: 'judging',
          description: 'Testing understanding of reflective symmetry'
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
            id: 'reflection-definition-q1',
            question: "A figure has reflective symmetry if it can be mapped onto itself by what transformation?",
            options: [
                "A translation",
                "A rotation",
                "A reflection",
                "A dilation"
            ],
            correctAnswer: "A reflection",
            explanation: "Correct! Reflective symmetry means you can 'flip' (reflect) the figure over a line and it looks exactly the same."
        },
        {
            id: 'identify-lines-q2',
            question: "How many lines of symmetry does a square have?",
            options: [
                "1",
                "2",
                "4",
                "8"
            ],
            correctAnswer: "4",
            explanation: "Correct! A square has 4 lines of symmetry: two connecting the midpoints of opposite sides, and two connecting opposite vertices (the diagonals)."
        }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const handleQuizAnswer = (answerText: string) => {
        if (showFeedback || isQuizComplete) return;
        setSelectedAnswer(answerText);
        setShowFeedback(true);
        const current = questions[currentQuestionIndex];
        const isCorrect = answerText === current.correctAnswer;
        if (isCorrect) setScore(prev => prev + 1);
        handleInteractionComplete({
            interactionId: `reflective-symmetry-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'reflective-symmetry', conceptName: 'Reflective Symmetry',
            conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
            question: { type: 'mcq', question: current.question, options: current.options }
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

    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

                {/* Left Column - Content */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Symmetry</h2>
                        <p className="text-lg leading-relaxed">
                            A figure has <strong>symmetry</strong> if a rigid transformation can map the figure onto itself.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                           There are two main types: **Reflective Symmetry** and **Rotational Symmetry**.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Reflective Symmetry</h3>
                        <p className="text-lg leading-relaxed">
                           A figure has <strong>reflective symmetry</strong> if it can be mapped onto itself by a reflection across a line.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                           This "mirror line" is called the <strong>line of symmetry</strong> (or axis of symmetry).
                        </p>
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                            Think: If you fold the figure along this line, the two halves match up perfectly.
                         </em>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Number of Lines</h3>
                        <p className="text-lg leading-relaxed">
                           A figure can have:
                        </p>
                         <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li>
                                Zero lines of symmetry (like a general parallelogram).
                            </li>
                             <li>
                                One line of symmetry (like an isosceles triangle).
                            </li>
                             <li>
                                Two or more lines of symmetry (like a rectangle or square).
                            </li>
                             <li>
                                Infinite lines of symmetry (like a circle).
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Finding Lines of Symmetry</h3>
                        <ReflectiveSymmetryAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            The red dashed lines are the lines of symmetry. Notice the parallelogram doesn't have any!
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        {/* Quiz UI - Copied from reference */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
                            <div className="text-lg text-slate-600 dark:text-slate-400">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </div>
                        </div>
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
                                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
                                <div className="space-y-3">
                                    {questions[currentQuestionIndex].options.map((option, idx) => {
                                        const disabled = showFeedback;
                                        const selected = selectedAnswer === option;
                                        const correct = option === questions[currentQuestionIndex].correctAnswer;
                                        const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                                            selected
                                                ? showFeedback
                                                    ? correct
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // CORRECT
                                                        : 'border-slate-400 bg-slate-100 dark:bg-slate-800 opacity-70' // INCORRECT
                                                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // Selected
                                                : 'border-slate-300 dark:border-slate-600 hover:border-blue-400' // Default
                                        } ${disabled ? 'cursor-default' : 'cursor-pointer'}`;
                                        return (
                                            <motion.button
                                                key={idx}
                                                onClick={() => handleQuizAnswer(option)}
                                                disabled={disabled}
                                                className={className}
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
                                            className={`mt-4 p-4 rounded-lg ${
                                                selectedAnswer === questions[currentQuestionIndex].correctAnswer
                                                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                                                    : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700'
                                            }`}
                                        >
                                            <div className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                                                {questions[currentQuestionIndex].explanation}
                                            </div>
                                            <motion.button
                                                onClick={handleNextQuestion}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
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
                                <div className="text-3xl mb-4">🪞</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'A perfect reflection of your knowledge!' : 'Great job!'}
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
            slideId="intro-to-reflective-symmetry"
            slideTitle="Intro to reflective symmetry"
            moduleId="transformation-properties-proofs"
            submoduleId="symmetry"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}