import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Accordion Item Component (Unchanged) ---
interface FaqItemProps {
    i: number;
    question: string;
    children: React.ReactNode;
    expanded: number | false;
    setExpanded: (i: number | false) => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ i, question, children, expanded, setExpanded }) => {
    const isOpen = i === expanded;

    return (
        <motion.div 
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }} // Staggered fade-in
        >
            <motion.header
                initial={false}
                onClick={() => setExpanded(isOpen ? false : i)}
                className="flex justify-between items-center p-6 cursor-pointer"
            >
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {question}
                </h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-blue-600 dark:text-blue-400"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.div>
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="border-t border-slate-200 dark:border-slate-700"
                    >
                        <div className="p-6 space-y-3">
                            {children}
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
// --- END of Accordion Item ---

// --- NEW: QUIZ COMPONENT ADDED ---

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

// 5 MCQs based on the FAQ content
const quizQuestions: QuizQuestion[] = [
    {
        id: 'faq-q1',
        question: "What is the *main* property preserved by rigid transformations but NOT by non-rigid transformations?",
        options: [
            "Angle measure",
            "Distance",
            "Orientation",
            "Shape"
        ],
        correctAnswer: "Distance",
        explanation: "Correct! Rigid transformations (like reflections) preserve distance, so the image is congruent. Non-rigid transformations (like dilations) do not."
    },
    {
        id: 'faq-q2',
        question: "A dilation maps Figure A to Figure B. The figures are:",
        options: [
            "Congruent (≅)",
            "Similar (~)",
            "Equal (=)",
            "Opposite"
        ],
        correctAnswer: "Similar (~)",
        explanation: "Correct! Dilations change size but preserve shape, resulting in similar figures."
    },
    {
        id: 'faq-q3',
        question: "Which of these is the ONLY transformation that reverses orientation?",
        options: [
            "Translation",
            "Rotation",
            "Dilation",
            "Reflection"
        ],
        correctAnswer: "Reflection",
        explanation: "Correct! A reflection 'flips' the figure, reversing its vertex order (e.g., clockwise to counter-clockwise)."
    },
    {
        id: 'faq-q4',
        question: "To prove two figures are congruent using transformations, you must find a sequence of...",
        options: [
            "Rigid transformations",
            "Non-rigid transformations",
            "Dilations only",
            "Any transformations"
        ],
        correctAnswer: "Rigid transformations",
        explanation: "Correct! The definition of congruence is that one figure can be mapped to the other using only rigid transformations (slides, flips, turns)."
    },
    {
        id: 'faq-q5',
        question: "A 'slide' is the common name for which transformation?",
        options: [
            "Rotation",
            "Reflection",
            "Translation",
            "Dilation"
        ],
        correctAnswer: "Translation",
        explanation: "Correct! A translation slides every point of a figure the same distance in the same direction."
    }
];

// This is the quiz component structure you've used before
const QuizComponent: React.FC<{onQuizComplete: (response: InteractionResponse) => void, faqItemCount: number}> = ({ onQuizComplete, faqItemCount }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>(new Array(quizQuestions.length).fill(false));
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);

    const handleQuizAnswer = (answerText: string) => {
        if (showFeedback || isQuizComplete) return;
        setSelectedAnswer(answerText);
        setShowFeedback(true);
        const current = quizQuestions[currentQuestionIndex];
        const isCorrect = answerText === current.correctAnswer;
        if (isCorrect) setScore(prev => prev + 1);

        // Send interaction data
        onQuizComplete({
            interactionId: `faq-quiz-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'transformation-proofs', conceptName: 'Transformation Proofs',
            conceptDescription: `Answer to FAQ quiz question ${currentQuestionIndex + 1}`,
            question: { type: 'mcq', question: current.question, options: current.options }
        });
    };

    const handleNextQuestion = () => {
        const newAnswered = [...questionsAnswered];
        newAnswered[currentQuestionIndex] = true;
        setQuestionsAnswered(newAnswered);
        setSelectedAnswer('');
        setShowFeedback(false);
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsQuizComplete(true);
        }
    };

    return (
        <motion.div 
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + faqItemCount * 0.1 }} // Staggered fade-in after FAQs
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
                {!isQuizComplete && (
                    <div className="text-lg text-slate-600 dark:text-slate-400">
                        Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </div>
                )}
            </div>
            {/* Progress Bar */}
            <div className="flex space-x-2 mb-6">
                {quizQuestions.map((_, index) => (
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

            {/* Quiz Body */}
            {!isQuizComplete ? (
                <>
                    <div className="text-lg mb-4 text-slate-800 dark:text-slate-100">{quizQuestions[currentQuestionIndex].question}</div>
                    <div className="space-y-3">
                        {quizQuestions[currentQuestionIndex].options.map((option, idx) => {
                            const disabled = showFeedback;
                            const selected = selectedAnswer === option;
                            const correct = option === quizQuestions[currentQuestionIndex].correctAnswer;
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
                                    selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer
                                        ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                                        : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700'
                                }`}
                            >
                                <div className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                                    {quizQuestions[currentQuestionIndex].explanation}
                                </div>
                                <motion.button
                                    onClick={handleNextQuestion}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}
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
                        You scored {score} out of {quizQuestions.length}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

// --- END OF QUIZ COMPONENT ---


export default function Slide2() {
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const { isDarkMode } = useThemeContext();
    const [expanded, setExpanded] = useState<number | false>(false);

    // --- NEW: Interaction handler to collect quiz responses ---
    const handleInteractionComplete = (response: InteractionResponse) => {
        setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
    };

    const faqItems = [
        {
            question: "Q: What's the one big difference between rigid and non-rigid transformations?",
            answer: (
                <>
                    <p className="text-lg leading-relaxed"><strong>Distance.</strong></p>
                    <p className="text-lg leading-relaxed">
                        <strong>Rigid transformations</strong> (translations, rotations, reflections) <strong>preserve distance</strong>. The image is congruent to the pre-image.
                    </p>
                    <p className="text-lg leading-relaxed">
                        <strong>Non-rigid transformations</strong> (like dilations) <strong>do not preserve distance</strong>. The image is similar, but not congruent.
                    </p>
                </>
            )
        },
        {
            question: "Q: What's the difference between Congruent (≅) and Similar (~)?",
            answer: (
                <>
                    <p className="text-lg leading-relaxed">
                        <strong>Congruent (≅)</strong> figures are mapped by <strong>rigid transformations</strong>. They preserve <strong>size and shape</strong>.
                    </p>
                    <p className="text-lg leading-relaxed">
                        <strong>Similar (~)</strong> figures are mapped by <strong>non-rigid transformations</strong> (like dilation). They preserve <strong>shape only</strong>, not size.
                    </p>
                </>
            )
        },
        {
            question: "Q: Which transformations 'flip' the shape (reverse orientation)?",
            answer: (
                <>
                    <p className="text-lg leading-relaxed"><strong>Only reflections.</strong></p>
                    <p className="text-lg leading-relaxed">
                        Translations, rotations, and dilations are all "direct" transformations, meaning they preserve orientation (the vertex order stays the same).
                    </p>
                    <p className="text-lg leading-relaxed">
                        A <strong>reflection</strong> is an "opposite" transformation. It reverses the orientation (e.g., from clockwise to counter-clockwise).
                    </p>
                </>
            )
        },
        {
            question: "Q: How do I prove two triangles are congruent using transformations?",
            answer: (
                <>
                    <p className="text-lg leading-relaxed">
                        You must find a <strong>sequence of rigid transformations</strong> (translations, rotations, and/or reflections) that maps one triangle perfectly onto the other.
                    </p>
                    <p className="text-lg leading-relaxed">
                        For your proof, you must state the transformation (e.g., "Reflect over the y-axis") and use its properties to justify your claims (e.g., "Since reflections preserve distance, AB = A'B'").
                    </p>
                </>
            )
        },
    ];

    const slideContent = (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
            {/* --- UPDATED: Added max-w-4xl back --- */}
            <div className=" mx-auto p-8 space-y-6"> 
                
                <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Unit 2 FAQ: Properties & Proofs</h2>
                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                        Here are answers to common questions about transformation properties. Click a question to reveal the answer.
                    </p>
                </motion.div>

                {/* Mapped Accordion Items */}
                {faqItems.map((item, i) => (
                    <FaqItem
                        key={i}
                        i={i}
                        question={item.question}
                        expanded={expanded}
                        setExpanded={setExpanded}
                    >
                        {item.answer}
                    </FaqItem>
                ))}

                {/* --- NEW: QUIZ COMPONENT ADDED --- */}
                <QuizComponent 
                    onQuizComplete={handleInteractionComplete} 
                    faqItemCount={faqItems.length}
                />

            </div>
        </div>
    );

    return (
        <SlideComponentWrapper
            slideId="transformation-proofs-faq"
            slideTitle="Transformation properties and proofs FAQ"
            moduleId="transformation-properties-proofs"
            submoduleId="proofs-with-transformations"
            interactions={localInteractions} // Pass interactions up
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}