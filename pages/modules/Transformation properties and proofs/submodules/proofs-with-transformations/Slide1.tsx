import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT UPDATED ---
const ProofFlowAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const baseDelay = 0.5;

    // A simple triangle path
    const trianglePath = "M 0 0 L 0 50 L 40 50 Z";
    
    // Animation for all items (fade in)
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay, type: 'spring', stiffness: 100 }
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
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                
                {/* --- Step 1: Given --- */}
                <motion.g
                    custom={baseDelay}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <text
                        x={100} y={50}
                        textAnchor="middle"
                        className="fill-blue-500 text-sm font-semibold"
                    >
                        Given: triangle ABC
                    </text>
                    <path
                        d={trianglePath}
                        transform="translate(80, 70)" // Positioned under text
                        className="fill-blue-500 opacity-80"
                    />
                </motion.g>

                {/* --- Step 2: Arrow 1 --- */}
                <motion.path
                    d="M 100 130 L 100 170" // Vertical arrow
                    className="stroke-slate-400 dark:stroke-slate-500"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    custom={baseDelay + 0.5}
                    variants={arrowVariants}
                    initial="hidden"
                    animate="visible"
                />

                {/* --- Step 3: Apply Text --- */}
                <motion.text
                    x={200} y={155} // To the right of the arrow
                    textAnchor="middle"
                    className="fill-slate-700 dark:fill-slate-200 text-sm"
                    custom={baseDelay + 1.0}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Apply Rigid Transformation(s)
                </motion.text>
                
                 {/* --- Step 4: Arrow 2 --- */}
                 <motion.path
                    d="M 300 170 L 300 130" // Vertical arrow (reversed)
                    className="stroke-slate-400 dark:stroke-slate-500"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    custom={baseDelay + 1.5}
                    variants={arrowVariants}
                    initial="hidden"
                    animate="visible"
                />

                {/* --- Step 5: Image --- */}
                 <motion.g
                    custom={baseDelay + 2.0}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <text
                        x={300} y={50}
                        textAnchor="middle"
                        className="fill-green-500 text-sm font-semibold"
                    >
                        Image: triangle A'B'C'
                    </text>
                    <path
                        d={trianglePath}
                        transform="translate(280, 70) rotate(-45, 20, 25)" // Transformed
                        className="fill-green-500 opacity-80"
                    />
                </motion.g>

                {/* --- Step 6: Therefore --- */}
                 <motion.text
                    x={svgWidth / 2} y={240}
                    textAnchor="middle"
                    className="fill-slate-700 dark:fill-slate-200 text-base font-bold"
                    custom={baseDelay + 2.5}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                 >
                    {/* --- MODIFIED --- */}
                    therefore: triangle ABC &cong; triangle A'B'C'
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
          id: 'transformation-proofs-quiz',
          conceptId: 'transformation-proofs',
          conceptName: 'Transformation Proofs',
          type: 'judging',
          description: 'Testing the concept of transformation-based proofs'
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
            id: 'proof-definition-q1',
            question: "To prove two figures are congruent using transformations, you must find a...?",
            options: [
                "...sequence of rigid transformations that maps one to the other.",
                "...dilation that makes them the same size.",
                "...single reflection that works for both.",
                "...line of symmetry."
            ],
            correctAnswer: "...sequence of rigid transformations that maps one to the other.",
            explanation: "Correct! This is the transformation-based definition of congruence. If a rigid sequence (slides, flips, turns) maps one shape to another, they are congruent."
        },
        {
            id: 'proof-property-q2',
            question: "Why can we say that if triangle ABC is mapped to triangle A'B'C' by a reflection, then AB = A'B'?",
            options: [
                "Because reflections change side lengths.",
                "Because reflections preserve angle measure.",
                "Because reflections preserve distance.",
                "Because reflections preserve orientation."
            ],
            correctAnswer: "Because reflections preserve distance.",
            explanation: "Correct! The justification for AB = A'B' is that reflections are rigid transformations (isometries) and therefore *preserve distance* (length)."
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
            interactionId: `transformation-proofs-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'transformation-proofs', conceptName: 'Transformation Proofs',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Proofs with Transformations</h2>
                        <p className="text-lg leading-relaxed">
                            So far, you may have used proofs like SSS, ASA, or SAS to prove triangles are congruent.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                            {/* --- MODIFIED --- */}
                            Now, we will use a different method: <strong>proving congruence using the definitions of transformations.</strong>
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Core Idea</h3>
                        <p className="text-lg leading-relaxed">
                            Remember the definition of congruence from earlier?
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700">
                            <p className="text-lg font-bold text-blue-800 dark:text-blue-200">
                                {/* --- MODIFIED --- */}
                                Two figures are <strong>congruent</strong> if and only if there is a <strong>sequence of rigid transformations</strong> that maps one figure onto the other.
                            </p>
                        </div>
                         <p className="text-lg leading-relaxed mt-3">
                            {/* --- MODIFIED --- */}
                            Therefore, to prove two figures are congruent, you just have to find this exact sequence of transformations!
                           </p>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        {/* --- MODIFIED --- */}
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-4D00">Justifying Your Steps</h3>
                        <p className="text-lg leading-relaxed">
                            In a proof, you can't just say "they are congruent." You must use the properties we've learned.
                        </p>
                        <ul className="text-lg list-disc list-inside mt-4 space-y-2">
                            <li>
                                {/* --- MODIFIED --- */}
                                <strong>If you use a reflection:</strong> You can state that lengths are equal (e.g., AB = A'B') because "reflections preserve distance."
                            </li>
                             <li>
                                {/* --- MODIFIED --- */}
                                <strong>If you use a rotation:</strong> You can state that angles are equal (e.g., &angle;C = &angle;C') because "rotations preserve angle measure."
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Proof Flow</h3>
                        <ProofFlowAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            The goal is to find a rigid sequence that perfectly maps the pre-image to the image.
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
                                <div className="text-3xl mb-4">📜</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'Youve proven your knowledge!' : 'Great job!'}
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
            slideId="proofs-with-transformations"
            slideTitle="Proofs with transformations"
            moduleId="transformation-properties-proofs"
            submoduleId="proofs-with-transformations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}