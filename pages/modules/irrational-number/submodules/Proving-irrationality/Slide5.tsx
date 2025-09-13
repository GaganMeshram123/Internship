import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// --- NEW: Component to correctly render text with optional LaTeX ---
const RenderWithMath: React.FC<{ text: string }> = ({ text }) => {
    // Split the text by the '$' delimiter to find math expressions
    const parts = text.split('$');
    return (
        <span>
            {parts.map((part, index) => 
                // Every odd-indexed part was between '$', so it's a formula
                index % 2 === 1 ? <InlineMath key={index} math={part} /> : <span key={index}>{part}</span>
            )}
        </span>
    );
};

// --- Data for the Quiz (using '$' to denote math) ---
const quizQuestions = [
    {
        id: 'q1-contradiction-step',
        question: 'What is the first step in a proof by contradiction?',
        options: [
            { text: 'Assume the statement is true.', isCorrect: false },
            { text: 'Show an example that proves the statement.', isCorrect: false },
            { text: 'Assume the opposite of the statement is true.', isCorrect: true },
            { text: 'Follow a logical chain of reasoning.', isCorrect: false }
        ],
        explanation: 'The first step is always to assume the opposite of what you want to prove, in order to find a contradiction.'
    },
    {
        id: 'q2-contradiction-implication',
        question: 'If a logical contradiction is found, what does that imply?',
        options: [
            { text: 'The proof is invalid.', isCorrect: false },
            { text: 'The initial assumption was false.', isCorrect: true },
            { text: 'The conclusion is always rational.', isCorrect: false },
            { text: 'The original statement is false.', isCorrect: false }
        ],
        explanation: 'A contradiction proves your initial assumption was wrong. Therefore, the original statement must be true.'
    },
    {
        id: 'q3-odd-even-logic',
        question: 'In the proof for the irrationality of the square root of 2, if $p^2$ is an even number, what can you conclude about $p$?',
        options: [
            { text: '$p$ must also be an even number.', isCorrect: true },
            { text: '$p$ must be an odd number.', isCorrect: false },
            { text: '$p$ can be either even or odd.', isCorrect: false },
            { text: '$p$ must be a prime number.', isCorrect: false }
        ],
        explanation: 'The square of an odd number is always odd. Therefore, if $p^2$ is even, $p$ must also be even.'
    },
    {
        id: 'q4-sum-proof-contradiction',
        question: 'In the proof that (rational + irrational) = irrational, what is the contradiction found?',
        options: [
            { text: 'The sum of two fractions is not a fraction.', isCorrect: false },
            { text: 'The irrational number is shown to be rational.', isCorrect: true },
            { text: 'The rational numbers are shown to be irrational.', isCorrect: false },
            { text: 'The sum is equal to zero.', isCorrect: false }
        ],
        explanation: 'By assuming the sum is rational, algebraic manipulation forces the irrational number to equal a rational number, which is a contradiction.'
    }
];

// --- Child Components ---

const QuizProgress: React.FC<{ current: number, total: number }> = ({ current, total }) => (
    <div className="flex gap-2 mb-4">
        {Array.from({ length: total }).map((_, i) => (
            <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${i < current ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}
            />
        ))}
    </div>
);

const QuizSummary: React.FC<{ score: number, total: number, onRestart: () => void }> = ({ score, total, onRestart }) => {
    const percentage = Math.round((score / total) * 100);
    const summaryText = percentage >= 80 ? "Excellent work!" : percentage >= 50 ? "Good job!" : "Keep practicing!";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
        >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{summaryText}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">You scored</p>
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-8">{score} / {total}</div>
            <button
                onClick={onRestart}
                className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
                Restart Quiz
            </button>
        </motion.div>
    );
};

// --- Main Slide Component ---
export default function ProvingIrrationalitySlide5() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [answers, setAnswers] = useState<({ questionId: string, isCorrect: boolean } | null)[]>(Array(quizQuestions.length).fill(null));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const { isDarkMode } = useThemeContext();

    const isQuizComplete = currentQuestionIndex >= quizQuestions.length;
    const score = answers.filter(a => a?.isCorrect).length;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    const handleRestart = () => {
        setAnswers(Array(quizQuestions.length).fill(null));
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowFeedback(false);
    };

    const handleAnswer = (option: { text: string, isCorrect: boolean }) => {
        if (showFeedback) return;
        setSelectedOption(option.text);
        setShowFeedback(true);
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = { questionId: currentQuestion.id, isCorrect: option.isCorrect };
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowFeedback(false);
    };
    
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const slideContent = (
        <div className={`min-h-screen transition-colors duration-300 flex items-center justify-center p-4 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className={`w-full max-w-2xl rounded-xl p-6 sm:p-8 border shadow-lg ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <AnimatePresence mode="wait">
                    {isQuizComplete ? (
                        <QuizSummary key="summary" score={score} total={quizQuestions.length} onRestart={handleRestart} />
                    ) : (
                        <motion.div
                            key={currentQuestionIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">Challenge Quiz</h3>
                            <QuizProgress current={currentQuestionIndex} total={quizQuestions.length} />
                            <p className="text-lg sm:text-xl font-semibold my-6 text-slate-800 dark:text-slate-200">
                                <RenderWithMath text={currentQuestion.question} />
                            </p>

                            <div className="space-y-3">
                                {currentQuestion.options.map((option) => {
                                    const hasBeenSelected = selectedOption === option.text;
                                    let buttonStyle = 'border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500';
                                    if (showFeedback) {
                                        if (option.isCorrect) {
                                            buttonStyle = 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200';
                                        } else if (hasBeenSelected) {
                                            buttonStyle = 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200';
                                        }
                                    }
                                    return (
                                        <button
                                            key={option.text}
                                            onClick={() => handleAnswer(option)}
                                            disabled={showFeedback}
                                            className={`w-full p-4 rounded-lg border-2 text-left font-medium transition-all duration-200 ${buttonStyle}`}
                                        >
                                            <RenderWithMath text={option.text} />
                                        </button>
                                    );
                                })}
                            </div>

                            <AnimatePresence>
                                {showFeedback && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-900/50">
                                            <p className="font-semibold mb-2 text-slate-800 dark:text-slate-200">Explanation</p>
                                            <p className="text-slate-600 dark:text-slate-400">{currentQuestion.explanation}</p>
                                        </div>
                                        <button
                                            onClick={handleNext}
                                            className="mt-4 w-full p-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                                        >
                                            {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="irrationality-challenge-quiz"
            slideTitle="Challenge Quiz"
            moduleId="irrational-numbers"
            submoduleId="proving-irrationality"
            interactions={localInteractions}
        >
            <TrackedInteraction interaction={{
                id: 'irrationality-quiz',
                conceptId: 'irrationality-proof-quiz',
                conceptName: 'Proof by Contradiction Quiz',
                type: 'judging',
                description: 'Testing understanding of proof by contradiction for irrationality'
            }} onInteractionComplete={handleInteractionComplete}>
                {slideContent}
            </TrackedInteraction>
        </SlideComponentWrapper>
    );
}