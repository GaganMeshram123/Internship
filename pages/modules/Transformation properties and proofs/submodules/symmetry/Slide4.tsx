import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const SymmetryDetectiveAnimationExample2: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const baseDelay = 0.5;

    // Rhombus
    const rhombusPath = "M 200 80 L 280 130 L 200 180 L 120 130 Z";
    const line1 = { x1: 120, y1: 130, x2: 280, y2: 130 }; // Horizontal diagonal
    const line2 = { x1: 200, y1: 80, x2: 200, y2: 180 }; // Vertical diagonal

    return (
        <div className="w-full flex flex-col justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Clues */}
                <motion.text x="30" y="30" className="fill-slate-700 dark:fill-slate-200 text-base font-semibold"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: baseDelay }}
                >
                    Clues:
                </motion.text>
                <motion.text x="30" y="50" className="fill-slate-600 dark:fill-slate-300 text-sm"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: baseDelay + 0.3 }}
                >
                    1. Rotational Symmetry: Order 2 (180°)
                </motion.text>
                 <motion.text x="30" y="70" className="fill-slate-600 dark:fill-slate-300 text-sm"
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: baseDelay + 0.6 }}
                >
                    2. Reflective Symmetry: 2 lines (the diagonals)
                </motion.text>

                {/* Shape and Lines */}
                <motion.path
                    d={rhombusPath}
                    className="fill-blue-500 opacity-80"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: baseDelay + 1.0 }}
                />
                <motion.line
                    x1={line1.x1} y1={line1.y1} x2={line1.x2} y2={line1.y2}
                    className="stroke-red-500" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: baseDelay + 1.5 }}
                />
                <motion.line
                    x1={line2.x1} y1={line2.y1} x2={line2.x2} y2={line2.y2}
                    className="stroke-red-500" strokeWidth="2" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: baseDelay + 1.8 }}
                />

                {/* Answer */}
                <motion.text x="200" y="220" textAnchor="middle" className="fill-green-500 text-xl font-bold"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: baseDelay + 2.2, type: 'spring' }}
                >
                    It's a Rhombus!
                </motion.text>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function Slide4() {
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
          id: 'find-quadrilateral-quiz-2',
          conceptId: 'symmetry-identification',
          conceptName: 'Symmetry Identification',
          type: 'judging',
          description: 'Using symmetries to identify quadrilaterals (example 2)'
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
            id: 'identify-square-q1',
            question: "A quadrilateral has rotational symmetry of order 4 (90°) and 4 lines of reflective symmetry. What is it?",
            options: [
                "Square",
                "Rectangle",
                "Rhombus",
                "Kite"
            ],
            correctAnswer: "Square",
            explanation: "Correct! The *only* quadrilateral with order 4 rotational symmetry is a square. It also has 4 lines of reflection."
        },
        {
            id: 'identify-rectangle-q2',
            question: "A quadrilateral has 2 lines of symmetry that pass through the midpoints of its sides. What is it?",
            options: [
                "Rhombus",
                "Rectangle",
                "Kite",
                "Parallelogram"
            ],
            correctAnswer: "Rectangle",
            explanation: "Correct! A rectangle has 2 lines of symmetry at its midpoints. A rhombus also has 2, but they are its *diagonals*."
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
            interactionId: `find-quadrilateral-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'symmetry-identification', conceptName: 'Symmetry Identification',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Identifying Quadrilaterals</h2>
                        <p className="text-lg leading-relaxed">
                           Let's try another case. You are given a quadrilateral and told its symmetry properties. Can you identify it?
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Symmetry Clues: Case #2</h3>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li>
                                <strong>Rotational Symmetry:</strong> Yes, it has Order 2 (180°) symmetry.
                            </li>
                             <li>
                                <strong>Reflective Symmetry:</strong> Yes, it has 2 lines of symmetry.
                            </li>
                             <li>
                                <strong>Special Clue:</strong> The lines of symmetry are the diagonals.
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Verdict</h3>
                        <p className="text-lg leading-relaxed">
                           Order 2 rotation could be a Rectangle, Rhombus, or Square.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                           2 lines of symmetry could be a Rectangle or Rhombus.
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-700">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">
                                The special clue solves it! The shape whose lines of symmetry are its diagonals is a Rhombus.
                            </p>
                        </div>
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                           (A rectangle's lines pass through its midpoints).
                         </em>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Symmetry Detective: Case #2</h3>
                        <SymmetryDetectiveAnimationExample2 />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Order 2 rotation + 2 diagonal lines of symmetry = Rhombus.
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
                                <div className="text-3xl mb-4">💎</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'Youve got this all figured out!' : 'Great job!'}
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
            slideId="finding-quadrilateral-symmetries-2"
            slideTitle="Finding a quadrilateral from its symmetries (example 2)"
            moduleId="transformation-properties-proofs"
            submoduleId="symmetry"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}