import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const SymmetryDetectiveAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const baseDelay = 0.5;

    // Rectangle
    const rect = { x: 100, y: 80, width: 200, height: 100 };
    const line1 = { x1: 100, y1: 130, x2: 300, y2: 130 }; // Horizontal
    const line2 = { x1: 200, y1: 80, x2: 200, y2: 180 }; // Vertical

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
                    2. Reflective Symmetry: 2 lines
                </motion.text>

                {/* Shape and Lines */}
                <motion.rect
                    x={rect.x} y={rect.y} width={rect.width} height={rect.height}
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
                    It's a Rectangle!
                </motion.text>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function Slide3() {
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
          id: 'find-quadrilateral-quiz',
          conceptId: 'symmetry-identification',
          conceptName: 'Symmetry Identification',
          type: 'judging',
          description: 'Using symmetries to identify quadrilaterals'
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
            id: 'identify-parallelogram-q1',
            question: "A quadrilateral has rotational symmetry of order 2 (180°) but *no* lines of reflective symmetry. What is it?",
            options: [
                "Square",
                "Rectangle",
                "Rhombus",
                "Parallelogram"
            ],
            correctAnswer: "Parallelogram",
            explanation: "Correct! A parallelogram is the only one of these that has 180° rotational symmetry but no 'mirror' lines."
        },
        {
            id: 'identify-kite-q2',
            question: "A quadrilateral has *only one* line of reflective symmetry. What are the two possibilities?",
            options: [
                "Square or Rhombus",
                "Rectangle or Parallelogram",
                "Kite or Isosceles Trapezoid",
                "Rhombus or Kite"
            ],
            correctAnswer: "Kite or Isosceles Trapezoid",
            explanation: "Correct! Both a kite (along its main diagonal) and an isosceles trapezoid (connecting midpoints of bases) have exactly one line of symmetry."
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Using Symmetries as Clues</h2>
                        <p className="text-lg leading-relaxed">
                            The type and number of symmetries a quadrilateral has acts like a "fingerprint."
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                           By checking the rotational and reflective symmetries, you can identify the *exact* type of quadrilateral.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Clue 1: Rotational Symmetry</h3>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li>
                                <strong>Order 4 (90°):</strong> It must be a Square.
                            </li>
                             <li>
                                <strong>Order 2 (180°):</strong> It could be a Square, Rectangle, Rhombus, or Parallelogram.
                            </li>
                            <li>
                                <strong>No Rotational Symmetry:</strong> It could be a Kite, Isosceles Trapezoid, or a general quadrilateral.
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Clue 2: Reflective Symmetry</h3>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                             <li>
                                <strong>4 Lines:</strong> It must be a Square.
                            </li>
                            <li>
                                <strong>2 Lines:</strong> It's a Rectangle (lines at midpoints) or Rhombus (lines are diagonals).
                            </li>
                            <li>
                                <strong>1 Line:</strong> It's a Kite or Isosceles Trapezoid.
                            </li>
                            <li>
                                <strong>0 Lines:</strong> It's a Parallelogram (if it has 180° rotation) or just a general quadrilateral.
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Symmetry Detective: Case #1</h3>
                        <SymmetryDetectiveAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Order 2 rotation + 2 reflective lines (at midpoints) = Rectangle.
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
                                <div className="text-3xl mb-4">🧐</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'Case closed! Youre a symmetry detective.' : 'Great job!'}
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
            slideId="finding-quadrilateral-symmetries-1"
            slideTitle="Finding a quadrilateral from its symmetries"
            moduleId="transformation-properties-proofs"
            submoduleId="symmetry"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}