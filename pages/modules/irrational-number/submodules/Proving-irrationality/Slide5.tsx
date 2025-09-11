import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function ProvingIrrationalitySlide5() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
    const [showQuizFeedback, setShowQuizFeedback] = useState<boolean>(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([]);
    const [score, setScore] = useState<number>(0);
    const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
    const { isDarkMode } = useThemeContext();

    const questions = [
        {
            id: 'proof-contradiction-step',
            question: 'What is the first step in a proof by contradiction?',
            options: [
                { id: 'opt1', text: 'Assume the statement is true.', isCorrect: false },
                { id: 'opt2', text: 'Show an example that proves the statement.', isCorrect: false },
                { id: 'opt3', text: 'Assume the opposite of the statement is true.', isCorrect: true },
                { id: 'opt4', text: 'Follow a logical chain of reasoning.', isCorrect: false }
            ],
            explanation: 'The first step is always to assume the opposite of what you want to prove, in order to find a contradiction.'
        },
        {
            id: 'conclude-from-contradiction',
            question: 'If a logical contradiction is found in a proof by contradiction, what does that imply?',
            options: [
                { id: 'opt1', text: 'The proof is invalid.', isCorrect: false },
                { id: 'opt2', text: 'The initial assumption was false.', isCorrect: true },
                { id: 'opt3', text: 'The conclusion is always rational.', isCorrect: false },
                { id: 'opt4', text: 'The original statement is false.', isCorrect: false }
            ],
            explanation: 'A contradiction means your initial assumption must be wrong. Therefore, the original statement you were trying to prove must be true.'
        },
        {
            id: 'odd-and-even',
            question: 'In the proof for $\\sqrt{2}$, if $p^2$ is an odd number, what can you conclude about $p$?',
            options: [
                { id: 'opt1', text: '$p$ is also an odd number.', isCorrect: true },
                { id: 'opt2', text: '$p$ is an even number.', isCorrect: false },
                { id: 'opt3', text: '$p$ can be either even or odd.', isCorrect: false },
                { id: 'opt4', text: '$p$ must be irrational.', isCorrect: false }
            ],
            explanation: 'The square of an odd number is always odd, and the square of an even number is always even. Therefore, if $p^2$ is odd, $p$ must also be odd.'
        },
        {
            id: 'sum-rational-irrational-proof',
            question: 'In the proof that (rational + irrational) = irrational, what is the contradiction found?',
            options: [
                { id: 'opt1', text: 'The rational numbers turn out to be irrational.', isCorrect: false },
                { id: 'opt2', text: 'The irrational number is shown to be rational.', isCorrect: true },
                { id: 'opt3', text: 'The sum of two fractions cannot be a fraction.', isCorrect: false },
                { id: 'opt4', text: 'The sum of a rational and irrational number is zero.', isCorrect: false }
            ],
            explanation: 'The proof assumes the sum is rational, which allows you to show that the irrational number must be rational. This is the contradiction.'
        }
    ];

    const currentQuestion = questions[currentQuestionIndex];

    const slideInteractions: Interaction[] = [
        {
            id: 'irrationality-quiz',
            conceptId: 'irrationality-proof-quiz',
            conceptName: 'Proof by Contradiction Quiz',
            type: 'judging',
            description: 'Testing understanding of proof by contradiction for irrationality'
        }
    ];

    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const handleQuizAnswer = (answerText: string) => {
        setSelectedQuizAnswer(answerText);
        setShowQuizFeedback(true);
        const correctOption = currentQuestion.options.find(o => o.isCorrect);
        const isCorrect = answerText === correctOption?.text;
        if (!questionsAnswered[currentQuestionIndex]) {
            if (isCorrect) {
                setScore(prev => prev + 1);
            }
            setQuestionsAnswered(prev => {
                const newAnswered = [...prev];
                newAnswered[currentQuestionIndex] = true;
                return newAnswered;
            });
        }
        handleInteractionComplete({
            interactionId: `irrationality-quiz-${currentQuestion.id}`,
            value: answerText,
            isCorrect,
            timestamp: Date.now(),
            conceptId: currentQuestion.id,
            conceptName: currentQuestion.id,
            conceptDescription: 'Proof by contradiction quiz question',
            question: {
                type: 'mcq',
                question: currentQuestion.question,
                options: currentQuestion.options.map(opt => opt.text)
            }
        });
    };

    const handleNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex >= questions.length) {
            setIsQuizComplete(true);
        } else {
            setCurrentQuestionIndex(nextIndex);
            setSelectedQuizAnswer(null);
            setShowQuizFeedback(false);
        }
    };

    const slideContent = (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
            <div className="grid grid-cols-1 gap-8 p-8 mx-auto">
                <div className={`rounded-lg p-6 shadow-lg ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">
                        Challenge Quiz: Proving Irrationality
                    </h3>
                    <TrackedInteraction
                        interaction={slideInteractions[0]}
                        onInteractionComplete={handleInteractionComplete}
                    >
                        <div className="space-y-4">
                            {isQuizComplete ? (
                                <div className="text-center">
                                    <h5 className="text-lg font-medium mb-4">Quiz Complete!</h5>
                                    <p className="text-lg mb-4">
                                        You scored {score} out of {questions.length} questions correctly.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setCurrentQuestionIndex(0);
                                            setSelectedQuizAnswer(null);
                                            setShowQuizFeedback(false);
                                            setQuestionsAnswered([]);
                                            setScore(0);
                                            setIsQuizComplete(false);
                                        }}
                                        className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                                    >
                                        Restart Quiz
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Question {currentQuestionIndex + 1} of {questions.length}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Score: {score}/{questionsAnswered.filter(Boolean).length}
                                        </p>
                                    </div>
                                    <p className="text-lg mb-4">{currentQuestion.question}</p>
                                    <div className="space-y-2">
                                        {currentQuestion.options.map((option) => {
                                            const wasSelected = selectedQuizAnswer === option.text;
                                            const isOptionCorrect = option.isCorrect;
                                            let buttonClass = "w-full p-3 rounded-lg border-2 text-left transition-all ";
                                            if (showQuizFeedback) {
                                                if (wasSelected) {
                                                    if (isOptionCorrect) {
                                                        buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200";
                                                    } else {
                                                        buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200";
                                                    }
                                                } else if (isOptionCorrect) {
                                                    buttonClass += "border-green-400 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                                                } else {
                                                    buttonClass += "border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400";
                                                }
                                            } else {
                                                buttonClass += "border-slate-300 dark:border-slate-600 hover:border-blue-300 cursor-pointer";
                                            }
                                            return (
                                                <button
                                                    key={option.id}
                                                    onClick={() => handleQuizAnswer(option.text)}
                                                    disabled={showQuizFeedback}
                                                    className={buttonClass}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span><InlineMath math={option.text} /></span>
                                                        {showQuizFeedback && (
                                                            <span className="ml-2">
                                                                {wasSelected && isOptionCorrect && "✅"}
                                                                {wasSelected && !isOptionCorrect && "❌"}
                                                                {!wasSelected && isOptionCorrect && "✓"}
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {showQuizFeedback && (
                                        <div className={`mt-4 p-4 rounded-lg ${
                                            currentQuestion.options.find(o => o.text === selectedQuizAnswer)?.isCorrect
                                                ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                                                : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                                        }`}>
                                            <div className={`font-semibold mb-2 ${
                                                currentQuestion.options.find(o => o.text === selectedQuizAnswer)?.isCorrect
                                                    ? 'text-green-700 dark:text-green-300'
                                                    : 'text-red-700 dark:text-red-300'
                                            }`}>
                                                {currentQuestion.options.find(o => o.text === selectedQuizAnswer)?.isCorrect ? 'Correct!' : 'Not quite right.'}
                                            </div>
                                            <div className={`text-sm mb-3 ${
                                                currentQuestion.options.find(o => o.text === selectedQuizAnswer)?.isCorrect
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                            }`}>
                                                {currentQuestion.explanation}
                                            </div>
                                            <button
                                                onClick={handleNextQuestion}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                            >
                                                {currentQuestionIndex + 1 >= questions.length ? 'Finish Quiz' : 'Next Question'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </TrackedInteraction>
                </div>
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
            {slideContent}
        </SlideComponentWrapper>
    );
}