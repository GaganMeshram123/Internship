import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const MappingCongruenceAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;

    const preImageTriangle = "M 100 50 L 150 100 L 100 100 Z";
    const imageTransform = "rotate(90, 125, 75) translate(150, 50)";

    const baseDelay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Pre-Image */}
                <motion.g
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: baseDelay, duration: 0.5 }}
                >
                    <path d={preImageTriangle} className="fill-blue-500 opacity-80" />
                    <text x="85" y="45" className="fill-blue-300 text-sm font-semibold">A</text>
                    <text x="155" y="105" className="fill-blue-300 text-sm font-semibold">B</text>
                    <text x="85" y="105" className="fill-blue-300 text-sm font-semibold">C</text>
                    <text x="100" y="125" textAnchor="middle" className="fill-blue-400 text-base font-bold">$\triangle ABC$</text>
                </motion.g>

                {/* Transformation Text */}
                <motion.text
                    x={svgWidth / 2} y={svgHeight / 2 - 20}
                    textAnchor="middle"
                    className="fill-slate-500 dark:fill-slate-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: baseDelay + 0.8 }}
                >
                    maps to
                </motion.text>
                 <motion.text
                    x={svgWidth / 2} y={svgHeight / 2}
                    textAnchor="middle"
                    className="fill-slate-600 dark:fill-slate-300 text-base font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: baseDelay + 1.0 }}
                >
                    (Rigid Transformation)
                </motion.text>
                 <motion.path
                    d={`M 160 ${svgHeight / 2 - 10} L 240 ${svgHeight / 2 - 10}`}
                    className="stroke-slate-500 dark:stroke-slate-400"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: baseDelay + 1.2, duration: 0.5 }}
                />

                {/* Image */}
                <motion.g
                    transform={imageTransform}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: baseDelay + 1.5, duration: 0.5 }}
                >
                    <path d={preImageTriangle} className="fill-green-500 opacity-80" />
                    <text x="85" y="45" className="fill-green-300 text-sm font-semibold">A'</text>
                    <text x="155" y="105" className="fill-green-300 text-sm font-semibold">B'</text>
                    <text x="85" y="105" className="fill-green-300 text-sm font-semibold">C'</text>
                </motion.g>
                <motion.text 
                    x="275" y="160" textAnchor="middle" className="fill-green-400 text-base font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: baseDelay + 1.7 }}
                >
                    $\triangle A'B'C'$
                </motion.text>


                {/* Conclusion */}
                <motion.text
                    x={svgWidth / 2} y={svgHeight - 30}
                    textAnchor="middle"
                    className="fill-purple-500 dark:fill-purple-300 text-lg font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: baseDelay + 2.2, type: 'spring' }}
                >
                    Therefore: $\triangle ABC \cong \triangle A'B'C'$
                </motion.text>
                
                <defs>
                    <marker id="arrowhead" markerWidth="5" markerHeight="4" refX="2.5" refY="2" orient="auto">
                        <polygon points="0 0, 5 2, 0 4" className="fill-slate-500 dark:fill-slate-400" />
                    </marker>
                </defs>
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
          id: 'mapping-shapes-quiz',
          conceptId: 'mapping-and-congruence',
          conceptName: 'Mapping and Congruence',
          type: 'judging',
          description: 'Testing the transformation definition of congruence'
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
            id: 'congruence-definition-q1',
            question: "What does it mean if Shape X can be mapped onto Shape Y using *only* rigid transformations?",
            options: [
                "Shape X and Shape Y are similar.",
                "Shape X and Shape Y are congruent.",
                "Shape X is a dilation of Shape Y.",
                "Shape X and Shape Y are unrelated."
            ],
            correctAnswer: "Shape X and Shape Y are congruent.",
            explanation: "Correct! This is the formal definition of congruence. If a rigid transformation (or a sequence of them) maps one figure to another, they are congruent."
        },
        {
            id: 'identify-mapping-q2',
            question: "A transformation maps square A (side 5) to square B (side 5). The orientation is preserved. What was the mapping?",
            options: [
                "A reflection only.",
                "A dilation with scale factor 1.",
                "A translation or a rotation.",
                "It's impossible to tell."
            ],
            correctAnswer: "A translation or a rotation.",
            explanation: "That's right! The size is preserved (rigid) and the orientation is preserved (direct isometry). This rules out reflections and dilations, leaving translations and rotations."
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
            interactionId: `mapping-shapes-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'mapping-and-congruence', conceptName: 'Mapping and Congruence',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What is "Mapping"?</h2>
                        <p className="text-lg leading-relaxed">
                            <strong>Mapping</strong> is the process of applying a transformation to a figure.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                           We say a transformation "maps" the pre-image to the image.
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700 font-mono">
                            <p className="text-lg text-slate-800 dark:text-slate-100">
                                $T(P) = P'$
                            </p>
                             <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 non-italic">
                                (Read as: "The transformation $T$ maps point $P$ to point $P'$")
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Definition of Congruence</h3>
                        <p className="text-lg leading-relaxed">
                           This brings us to the most important idea of this submodule.
                        </p>
                         <p className="text-lg leading-relaxed mt-3">
                           We used to say "congruent" means "same size and same shape." Now we have a formal definition:
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700">
                            <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
                                Two figures are <strong>congruent</strong> if and only if there is a rigid transformation (or a sequence of rigid transformations) that maps one figure onto the other.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Congruent vs. Similar</h3>
                        <p className="text-lg leading-relaxed">
                           This is why we separate rigid vs. non-rigid.
                        </p>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li>
                                A **rigid transformation** (slide, flip, turn) maps a figure to a <strong className="text-green-500">congruent</strong> figure.
                            </li>
                            <li>
                                A **non-rigid transformation** (like a dilation) maps a figure to a <strong className="text-red-500">similar</strong> figure (same shape, different size).
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Mapping $\to$ Congruence</h3>
                        <MappingCongruenceAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Because a rigid transformation maps $\triangle ABC$ to $\triangle A'B'C'$, we can conclude that they are congruent.
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
                                <div className="text-3xl mb-4">🧩</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'Youve pieced the puzzle together!' : 'Great finish!'}
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
            slideId="mapping-shapes"
            slideTitle="Mapping shapes"
            moduleId="transformation-properties-proofs"
            submoduleId="rigid-transformations-overview"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}