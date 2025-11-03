import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- NEW ANIMATION COMPONENT ---
const MappingAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300; // Increased height for labels

    // A simple triangle path
    const trianglePath = "M 0 0 L 0 50 L 40 50 Z";
    const baseDelay = 0.5;

    // Animation for fading in items
    const itemVariants = {
        hidden: { opacity: 0 },
        visible: (delay: number) => ({ 
            opacity: 1,
            transition: { delay }
        })
    };
    
    // Animation for drawing the arrow
    const arrowVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (delay: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: { delay, duration: 0.7, ease: "easeInOut" }
        })
    };

    return (
        <div 
            className="w-full flex flex-col justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden"
            style={{ height: '280px' }} // Fixed height
        >
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                
                {/* --- Step 1: Pre-Image (Static) --- */}
                <motion.g
                    custom={baseDelay}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <path
                        d={trianglePath}
                        transform="translate(80, 70) rotate(-30, 20, 25)"
                        className="fill-blue-500 opacity-80"
                    />
                    <text x="80" y="60" textAnchor="middle" className="fill-blue-400 text-sm font-semibold">
                        (ABC)
                    </text>
                </motion.g>

                {/* --- Step 2: Image (Static) --- */}
                <motion.g
                    custom={baseDelay}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <path
                        d={trianglePath}
                        transform="translate(230, 80)"
                        className="fill-green-500 opacity-80"
                    />
                    {/* Labels for the Image (A', B', C') */}
                    <g className="fill-slate-800 dark:fill-slate-100 text-sm font-semibold">
                        <text x="225" y="75">A'</text>
                        <text x="225" y="135">C'</text>
                        <text x="275" y="135">B'</text>
                    </g>
                </motion.g>

                {/* --- Step 3: Arrow --- */}
                <motion.path
                    d="M 130 90 C 160 70, 190 70, 220 90"
                    className="stroke-slate-400 dark:stroke-slate-500 fill-none"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    custom={baseDelay + 0.5}
                    variants={arrowVariants}
                    initial="hidden"
                    animate="visible"
                />

                {/* --- Step 4: Text Labels --- */}
                <motion.text
                    x={svgWidth / 2} y="200"
                    textAnchor="middle"
                    className="fill-green-600 dark:fill-green-400 font-semibold"
                    custom={baseDelay + 1.2}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    triangle ABC maps to triangle A'B'C'
                </motion.text>
                <motion.text
                    x={svgWidth / 2} y="240"
                    textAnchor="middle"
                    className="fill-slate-800 dark:fill-slate-100 font-bold"
                    custom={baseDelay + 1.7}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    therefore: triangle ABC ≅ triangle A'B'C'
                </motion.text>
                
                {/* Arrowhead Definition */}
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


export default function Slide4() { // Assuming this is Slide 4
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
          id: 'mapping-quiz',
          conceptId: 'definition-of-congruence',
          conceptName: 'Definition of Congruence',
          type: 'judging',
          description: 'Testing understanding of mapping and congruence'
        }
    ];

    interface QuizQuestion {
        id: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }

    // Quiz questions based on the slide content
    const questions: QuizQuestion[] = [
        {
            id: 'congruence-def-q1',
            question: "What does it mean if Shape X can be mapped onto Shape Y using *only* rigid transformations?",
            options: [
                "Shape X and Shape Y are similar.",
                "Shape X and Shape Y are congruent.",
                "Shape X is larger than Shape Y.",
                "Shape X and Shape Y are unrelated."
            ],
            correctAnswer: "Shape X and Shape Y are congruent.",
            explanation: "Correct! The formal definition of congruence is that two figures are congruent if and only if there is a rigid transformation that maps one onto the other."
        },
        {
            id: 'mapping-def-q2',
            question: "What is the name for the *process* of applying a transformation to a figure?",
            options: [
                "Congruence",
                "Isometry",
                "Mapping",
                "Imaging"
            ],
            correctAnswer: "Mapping",
            explanation: "That's right! Mapping is the process of applying the transformation. The pre-image is 'mapped' to the image."
        }
    ];
    
    // --- Quiz handlers (Copied from previous slide) ---
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
            interactionId: `mapping-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'definition-of-congruence', conceptName: 'Definition of Congruence',
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
    // --- End of quiz handlers ---

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
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700 font-mono text-center">
                            T(P) = P'
                            <em className="block text-sm text-slate-600 dark:text-slate-400 mt-2 normal-case">
                                (Read as: "The transformation T maps point P to point P'")
                            </em>
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
                            <p className="text-lg font-bold text-blue-800 dark:text-blue-100">
                                Two figures are congruent if and only if there is a rigid transformation (or a sequence of rigid transformations) that maps one figure onto the other.
                            </p>
                        </div>
                    </div>

                    {/* --- "Congruent vs. Similar" Section --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Congruent vs. Similar</h3>
                        <p className="text-lg leading-relaxed">
                            This new definition helps us understand the key difference between congruent and similar.
                        </p>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li>
                                <strong>Congruent (≅):</strong> Mapped using <strong>rigid transformations</strong> (translation, rotation, reflection).
                                <br />
                                <span className="text-slate-600 dark:text-slate-400 pl-4">→ Preserves <strong>size and shape</strong>.</span>
                            </li>
                            <li>
                                <strong>Similar (~):</strong> Mapped using <strong>non-rigid transformations</strong> (like dilation).
                                <br />
                                <span className="text-slate-600 dark:text-slate-400 pl-4">→ Preserves <strong>shape only</strong>, not size.</span>
                            </li>
                        </ul>
                    </div>
                    {/* --- END OF SECTION --- */}

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Mapping to Congruence</h3>
                        
                        {/* --- ANIMATION COMPONENT --- */}
                        <MappingAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Because a rigid transformation maps triangle ABC to triangle A'B'C', we can conclude that they are congruent.
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD (RESTORED) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        {/* Quiz UI */}
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
                                <div className="text-3xl mb-4">🎉</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You\'ve mastered the definition!' : 'Good job!'}
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
            slideId="mapping-to-congruence"
            slideTitle="Mapping shapes"
            moduleId="transformation-properties-proofs"
            submoduleId="rigid-transformations-overview" 
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}