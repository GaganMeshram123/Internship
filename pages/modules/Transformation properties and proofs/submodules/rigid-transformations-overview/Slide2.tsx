import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT UPDATED ---
const FindMeasureAnimation: React.FC = () => {
    const [isRevealed, setIsRevealed] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const answerVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 15, delay: 0.5 } },
    };

    // Shape to be animated
    const shapePath = "M 0 0 L 30 0 L 0 40 Z"; // A simple right triangle

    return (
        <div 
            className="w-full flex flex-col justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden cursor-pointer relative"
            // We now reveal on click
            onClick={() => setIsRevealed(true)}
            style={{ height: '220px' }} // Set fixed height for animation
        >
            {/* Animated shape that moves */}
            <svg width="100%" height="100%" viewBox="0 0 400 150" className="absolute top-0 left-0" style={{ pointerEvents: 'none' }}>
                <motion.path
                    d={shapePath}
                    className="fill-blue-500 opacity-80"
                    initial={{ x: 70, y: 60, rotate: 0 }}
                    animate={isRevealed ? 
                        { x: 300, y: 60, rotate: -90 } : 
                        { x: 70, y: 60, rotate: 0 }
                    }
                    transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 0.8 }}
                />
            </svg>

            {/* Static Boxes (for context) */}
            <motion.div
                className="flex flex-col md:flex-row items-center justify-around w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Pre-Image Box */}
                <motion.div variants={itemVariants} className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-lg shadow text-center m-2 z-10">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Pre-Image: Shape $T$</h4>
                    <p className="font-mono text-slate-800 dark:text-slate-100">Side $S = 8 \\text{  }$</p>
                    <p className="font-mono text-slate-800 dark:text-slate-100">Angle $\angle A = 70^\circ$</p>
                </motion.div>

                {/* Transformation Arrow */}
                <motion.div variants={itemVariants} className="text-center m-2 z-10">
                    <div className="text-3xl font-bold text-slate-600 dark:text-slate-400">→</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">(Rigid Transformation)</p>
                </motion.div>

                {/* Image Box */}
                <motion.div variants={itemVariants} className="bg-green-100 dark:bg-green-900/50 p-4 rounded-lg shadow text-center m-2 z-10">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Image: Shape $T'$</h4>
                    <p className="font-mono text-slate-800 dark:text-slate-100">
                        Side $S' = $
                        <AnimatePresence mode="wait">
                            {!isRevealed ? (
                                <motion.span 
                                    key="q1" 
                                    initial={{ opacity: 1 }} 
                                    animate={{ opacity: 1 }} 
                                    exit={answerVariants.hidden} 
                                    className="font-bold text-red-500">?</motion.span>
                            ) : (
                                <motion.span 
                                    key="a1" 
                                    initial={answerVariants.hidden} 
                                    animate={answerVariants.visible} 
                                    className="font-bold text-green-600 dark:text-green-300">8 \\text{  }</motion.span>
                            )}
                        </AnimatePresence>
                    </p>
                    <p className="font-mono text-slate-800 dark:text-slate-100">
                        Angle $\angle A' = $
                        <AnimatePresence mode="wait">
                            {!isRevealed ? (
                                <motion.span 
                                    key="q2" 
                                    initial={{ opacity: 1 }} 
                                    animate={{ opacity: 1 }} 
                                    exit={answerVariants.hidden} 
                                    className="font-bold text-red-500">?</motion.span>
                            ) : (
                                <motion.span 
                                    key="a2" 
                                    initial={answerVariants.hidden} 
                                    animate={answerVariants.visible} 
                                    className="font-bold text-green-600 dark:text-green-300">70°</motion.span>
                            )}
                        </AnimatePresence>
                    </p>
                </motion.div>
            </motion.div>
            
            <AnimatePresence>
                {isRevealed ? (
                    <motion.div
                        className="mt-4 text-center z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.8 } }}
                        exit={{ opacity: 0 }}
                    >
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">Because measures are preserved!</p>
                    </motion.div>
                ) : (
                     <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 z-10 absolute bottom-4">(Click to reveal answers)</p>
                )}
            </AnimatePresence>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function Slide2() {
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
          id: 'finding-measures-quiz',
          conceptId: 'rigid-transformations-properties',
          conceptName: 'Rigid Transformation Properties',
          type: 'judging',
          description: 'Testing ability to use preserved properties to find measures'
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
            id: 'find-length-q1',
            question: "Triangle FGH has side FG with a length of 12. The triangle is rotated 180° about the origin. What is the length of the new side F'G'?",
            options: [
                "12",
                "-12",
                "24",
                "It's impossible to tell."
            ],
            correctAnswer: "12",
            explanation: "Correct! Rotation is a rigid transformation, which means it preserves all side lengths (distances). The length doesn't change."
        },
        {
            id: 'find-angle-q2',
            question: "A pentagon is reflected across the y-axis. The original pentagon has an angle of 108° at vertex C. What is the measure of the angle at vertex C'?",
            options: [
                "108°",
                "-108°",
                "72°",
                "It depends on the pentagon."
            ],
            correctAnswer: "108°",
            explanation: "That's right! Reflection is a rigid transformation, which means it preserves all angle measures. The angle at C' must be the same as the angle at C."
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
            interactionId: `finding-measures-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'rigid-transformations-properties', conceptName: 'Rigid Transformation Properties',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The Core Rule</h2>
                        <p className="text-lg leading-relaxed">
                            As we learned, **rigid transformations** (translations, rotations, reflections) are "rigid" because they don't change the figure's size or shape.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                            This has a powerful consequence:
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                                Rigid transformations **preserve** both **distance** (side lengths) and **angle measure**.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Finding Side Lengths</h3>
                        <p className="text-lg leading-relaxed">
                           If you have a triangle <span className="font-mono">$\triangle ABC$</span> and you translate it to get <span className="font-mono">$\triangle A'B'C'$</span>.
                        </p>
                         <p className="text-lg leading-relaxed mt-3">
                           And you know that side <span className="font-mono">$AB = 5 \\text{  }$</span>...
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                            ...what is the length of side <span className="font-mono">$A'B'$</span>?
                        </p>
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                            It MUST be <span className="font-bold">$5 \\text{  }$</span>, because translation is a rigid transformation and preserves distance.
                         </em>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Finding Angle Measures</h3>
                        <p className="text-lg leading-relaxed">
                           If you have a quadrilateral <span className="font-mono">$PQRS$</span> and you reflect it to get <span className="font-mono">$P'Q'R'S'$</span>.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                           And you know that <span className="font-mono">$\angle P = 90^\circ$</span>...
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                            ...what is the measure of <span className="font-mono">$\angle P'$</span>?
                        </p>
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                            It MUST be <span className="font-bold">$90^\circ$</span>, because reflection is a rigid transformation and preserves angle measure.
                         </em>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Interactive Example</h3>
                        <FindMeasureAnimation />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            No matter the transformation, if it's rigid, the measures of corresponding parts stay the same.
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
                                                {/* Use font-mono for options with numbers/degrees */}
                                                {option.match(/^-?\d+°?$/) ? <span className='font-mono'>{option}</span> : option}
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
                                <div className="text-3xl mb-4">📏</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You\'ve got the measure of this!' : 'Great job!'}
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
            slideId="finding-measures"
            slideTitle="Finding measures using rigid transformations"
            moduleId="transformation-properties-proofs"
            submoduleId="rigid-transformations-overview"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}