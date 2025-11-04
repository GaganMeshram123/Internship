import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT UPDATED ---
const FindMeasureAnimation: React.FC = () => {
    // This state now controls the transformation
    const [isTransformed, setIsTransformed] = useState(false);

    // A simple triangle path
    const trianglePath = "M 0 50 L 50 50 L 25 0 Z";

    // Animation variants for the text labels
    const labelVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
    };

    // Spring transition for the "magic move"
    const layoutTransition = {
        type: 'spring',
        stiffness: 200,
        damping: 25
    };

    return (
        <div 
            className="w-full flex flex-col justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden cursor-pointer relative"
            // Toggle the transformation on click
            onClick={() => setIsTransformed(!isTransformed)}
            style={{ height: '220px' }}
        >
            <div className="w-full h-full relative">
                {/* --- Pre-Image (Blue Triangle) - Always visible --- */}
                <motion.div
                    className="absolute"
                    style={{ left: '18%', top: '100px' }} // Adjusted left position
                >
                    <svg width="50" height="50" viewBox="0 0 50 50">
                        <path 
                            d={trianglePath} 
                            className="fill-blue-500"
                        />
                    </svg>
                </motion.div>

                {/* --- Transformed Image (Green Triangle) - Appears on click --- */}
                <AnimatePresence>
                    {isTransformed && (
                        <motion.div
                            key="transformed-triangle"
                            initial={{ x: -100, opacity: 0 }} // Start left and faded
                            animate={{ x: 0, opacity: 1 }}    // Slide to its final position
                            exit={{ opacity: 0 }}
                            transition={layoutTransition}
                            className="absolute"
                            style={{ left: '68%', top: '100px' }} // Adjusted left position
                        >
                            <svg width="50" height="50" viewBox="0 0 50 50">
                                <path 
                                    d={trianglePath} 
                                    className="fill-green-500"
                                />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* --- Labels for the Pre-Image (Blue) - Always visible --- */}
                <motion.div
                    className="absolute text-center"
                    style={{ left: '18%', top: '10px', transform: 'translateX(-50%)' }} // Adjusted left for text to center over triangle
                    variants={labelVariants}
                    initial="visible" // Always visible
                    animate="visible"
                >
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Pre-Image: Shape T</h4>
                    <p className="font-mono text-slate-800 dark:text-slate-100">Side S = 8</p>
                    <p className="font-mono text-slate-800 dark:text-slate-100">Angle ∠A = 70°</p>
                </motion.div>

                {/* --- Labels for the Image (Green) - Appears on click --- */}
                <AnimatePresence>
                    {isTransformed && (
                        <motion.div
                            key="image-labels"
                            className="absolute text-center"
                            style={{ left: '68%', top: '10px', transform: 'translateX(-50%)' }} // Adjusted left for text to center over triangle
                            variants={labelVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <h4 className="font-semibold text-green-700 dark:text-green-300">Image: Shape T'</h4>
                            <p className="font-mono text-slate-800 dark:text-slate-100">Side S' = 8</p>
                            <p className="font-mono text-slate-800 dark:text-slate-100">Angle ∠A' = 70°</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- Arrow pointing from Pre-Image to Image - Appears on click --- */}
                <AnimatePresence>
                    {isTransformed && (
                        <motion.div
                            key="transformation-arrow"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute flex flex-col items-center justify-center"
                            style={{ left: '44%', top: 'calc(50% - 10px)', transform: 'translate(-50%, -50%)' }} // Adjusted left to center better
                        >
                            <div className="text-3xl font-bold text-slate-600 dark:text-slate-400">→</div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">(Rigid Transformation)</p> {/* Added whitespace-nowrap to keep text on one line */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* --- Final "Preserved" Text --- */}
            <AnimatePresence>
                {isTransformed && (
                    <motion.p
                        className="text-lg font-semibold text-blue-600 dark:text-blue-400 text-center absolute bottom-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.5 } }}
                        exit={{ opacity: 0 }}
                    >
                        Rigid transformations preserve both side lengths and angle measures.
                    </motion.p>
                )}
            </AnimatePresence>

            {/* --- Click prompt --- */}
            <AnimatePresence>
                {!isTransformed && (
                    <motion.p
                        className="text-sm text-slate-500 dark:text-slate-400 z-10 absolute bottom-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.5 } }}
                        exit={{ opacity: 0 }}
                    >
                        (Click to see transformation)
                    </motion.p>
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

                {/* Left Column - Content (Unchanged) */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The Core Rule</h2>
                        <p className="text-lg leading-relaxed">
                            As we learned, rigid transformations (translations, rotations, reflections) are "rigid" because they don't change the figure's size or shape.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                            This has a powerful consequence:
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
                                Rigid transformations preserve both distance (side lengths) and angle measure.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Finding Side Lengths</h3>
                        <p className="text-lg leading-relaxed">
                            If you have a triangle <span className="font-mono">triangle ABC</span> and you translate it to get <span className="font-mono">triangle A'B'C'</span>.
                        </p>
                         <p className="text-lg leading-relaxed mt-3">
                            And you know that side <span className="font-mono">AB = 5</span>...
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                            ...what is the length of side <span className="font-mono">A'B'</span>?
                        </p>
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                            It MUST be <span className="font-bold">5</span>, because translation is a rigid transformation and preserves distance.
                          </em>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Finding Angle Measures</h3>
                        <p className="text-lg leading-relaxed">
                            If you have a quadrilateral <span className="font-mono">PQRS</span> and you reflect it to get <span className="font-mono">P'Q'R'S'</span>.
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                            And you know that <span className="font-mono">∠P = 90°</span>...
                        </p>
                        <p className="text-lg leading-relaxed mt-3">
                            ...what is the measure of <span className="font-mono">∠P'</span>?
                        </p>
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                            It MUST be <span className="font-bold">90°</span>, because reflection is a rigid transformation and preserves angle measure.
                          </em>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz (Unchanged) */}
                <div className="space-y-6">
                    
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Interactive Example</h3>
                        {/* The new animation component is rendered here */}
                        <FindMeasureAnimation /> 
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            No matter the transformation, if it's rigid, the measures of corresponding parts stay the same.
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD --- */}
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