import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const DilationErrorAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const origin = { x: 50, y: svgHeight - 50 }; // Origin bottom-left
    const scale = 25; // Pixels per unit

    // Points from the example
    const P = { x: 4, y: 2 }; // Pre-image A(4, 2)
    const P_incorrect = { x: 6, y: 4 }; // Incorrect A'(6, 4) - Translation <2, 2>
    const P_correct = { x: 8, y: 4 }; // Correct A'(8, 4) - Dilation k=2

    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgP = toSvg(P);
    const svgP_incorrect = toSvg(P_incorrect);
    const svgP_correct = toSvg(P_correct);

    const duration = 1.0;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                 {/* Axes */}
                 <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke="#aaa" strokeWidth="0.5" />
                 <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} stroke="#aaa" strokeWidth="0.5" />
                 <circle cx={origin.x} cy={origin.y} r={3} className="fill-slate-400" />

                {/* Point P (Pre-image) */}
                <circle cx={svgP.x} cy={svgP.y} r={5} className="fill-blue-500" />
                <text x={svgP.x + 8} y={svgP.y + 5} className="fill-blue-300 text-xs font-semibold">P(4,2)</text>

                {/* Incorrect Translation Path (Red Dashed) */}
                 <motion.line x1={svgP.x} y1={svgP.y} x2={svgP.x} y2={svgP.y}
                    animate={{ x2: svgP_incorrect.x, y2: svgP_incorrect.y }}
                    transition={{ delay: delay, duration: duration }}
                    className="stroke-red-500" strokeWidth="1.5" strokeDasharray="4 4" />
                <motion.circle cx={svgP_incorrect.x} cy={svgP_incorrect.y} r={5} className="fill-red-500"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + duration }} />
                <motion.text x={svgP_incorrect.x + 8} y={svgP_incorrect.y + 5} className="fill-red-300 text-xs font-semibold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration }}>Incorrect (6,4)</motion.text>
                 <motion.text x={(svgP.x + svgP_incorrect.x)/2} y={(svgP.y + svgP_incorrect.y)/2 - 8} className="fill-red-400 text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration/2 }}>Added &lt;2,2&gt; (Translation)</motion.text>


                {/* Correct Dilation Path (Green Dashed Line from Origin) */}
                 <motion.line x1={origin.x} y1={origin.y} x2={origin.x} y2={origin.y}
                    animate={{ x2: svgP_correct.x, y2: svgP_correct.y }}
                    transition={{ delay: delay + duration + 0.5, duration: duration }}
                    className="stroke-green-500" strokeWidth="1.5" strokeDasharray="4 4" />
                {/* Line from origin to P for context */}
                 <line x1={origin.x} y1={origin.y} x2={svgP.x} y2={svgP.y} stroke="#aaa" strokeWidth="0.5" strokeDasharray="2 2"/>

                <motion.circle cx={svgP_correct.x} cy={svgP_correct.y} r={5} className="fill-green-500"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + duration*2 + 0.5 }} />
                <motion.text x={svgP_correct.x + 8} y={svgP_correct.y + 5} className="fill-green-300 text-xs font-semibold"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.5 }}>Correct (8,4)</motion.text>
                 <motion.text x={(origin.x + svgP_correct.x)/2 + 10} y={(origin.y + svgP_correct.y)/2 + 10} className="fill-green-400 text-xs"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*1.5 + 0.5 }}>Multiplied by 2 (Dilation k=2)</motion.text>


            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function DilationsSlide6() {
    // ... (Keep existing state and handlers)
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    // --- UPDATED FOR 2 QUESTIONS ---
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [
      {
        id: 'dilation-error-quiz',
        conceptId: 'dilation-errors',
        conceptName: 'Dilation Find the Error',
        type: 'judging',
        description: 'Identifying common mistakes in dilations'
      }
    ];

    interface QuizQuestion {
        id: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }

    // --- UPDATED QUESTIONS ARRAY (2 QUESTIONS) ---
    const questions: QuizQuestion[] = [
        {
            id: 'dilation-error-add-q1',
             // --- $ SYMBOLS REMOVED ---
            question: "A student was asked to dilate P(3, 2) by k=3 from the origin. They got P'(6, 5). What was their mistake?",
            options: [
                'They translated by <3, 3>', // Correct
                'They rotated 90°',
                'They reflected over y=x',
                'They did it correctly'
            ],
            correctAnswer: 'They translated by <3, 3>',
            explanation: "Correct! They *added* 3 to each coordinate (3+3=6, 2+3=5) instead of *multiplying* by 3. This is a common mistake mixing up dilation and translation!"
        },
        { // --- ADDED SECOND QUESTION (Reduction Error) ---
            id: 'dilation-error-subtract-q2',
            question: "A student dilates P(6, 9) by k=1/3. They get P'(5⅔, 8⅔). What did they likely do wrong?",
             options: [
                 "They multiplied correctly",
                 "They added 1/3 instead of multiplying",
                 "They subtracted 1/3 instead of multiplying", // Correct
                 "They divided by 1/3 instead of multiplying"
             ],
             correctAnswer: "They subtracted 1/3 instead of multiplying",
             explanation: "Correct! For dilation, you must MULTIPLY by the scale factor. 6 * (1/3) = 2 and 9 * (1/3) = 3. The correct answer is (2, 3). Subtracting 1/3 (0.333...) would give coordinates close to (5⅔, 8⅔)."
        }
    ];

    // ... (Keep existing handlers: handleInteractionComplete, handleQuizAnswer, handleNextQuestion)
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
            interactionId: `dilation-error-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'dilation-errors', conceptName: 'Dilation Find the Error',
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
             {/* --- UPDATED to 1 column for small screens, 2 for medium and up --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

                {/* Left Column - Content */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Find the Error!</h2>
                        <p className="text-lg leading-relaxed">
                            A very common mistake is to confuse a dilation (multiply) with a translation (add/subtract).
                        </p>
                    </div>

                    {/* --- CARD UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Problem</h3>
                        <p className="text-lg leading-relaxed">
                            A student is asked to dilate △ABC from the origin by a scale factor of k=2.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 font-mono text-slate-700 dark:text-slate-300">
                            <strong>Pre-image vertex:</strong> A(4, 2)
                        </p>
                        <p className="text-lg leading-relaxed mt-2 font-mono text-red-600 dark:text-red-400">
                            <strong>Student's Answer:</strong> A'(6, 4)  <span className="text-sm non-italic">(Incorrect!)</span>
                        </p>
                    </div>

                    {/* --- CARD UPDATED ($ Removed, Colors) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">What Went Wrong?</h3>
                        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                            The student <strong>ADDED</strong> 2 to each coordinate instead of multiplying: <span className='font-mono'>(4+2, 2+2) → (6, 4)</span>.
                        </p>
                        <p className="text-lg leading-relaxed mt-3 text-slate-700 dark:text-slate-300">
                           This is a <strong>TRANSLATION</strong> by &lt;2, 2&gt;.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 font-bold text-blue-600 dark:text-blue-400">
                            The <strong>CORRECT</strong> answer requires <strong>MULTIPLYING</strong> by k=2:
                        </p>
                        <p className="text-lg leading-relaxed mt-1 font-mono text-blue-600 dark:text-blue-400">
                            (4 * 2, 2 * 2) → A'(8, 4)
                        </p>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Correct (Dilation) vs. Incorrect (Translation)</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <DilationErrorAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            The red path/point shows the incorrect translation. The green path/point shows the correct dilation from the origin.
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD (Colors Fixed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        {/* ... Keep entire quiz section as is ... */}
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
                                        const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${ // Removed font-mono base
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
                                               {/* Apply mono font only to coordinate/vector options */}
                                               {option.includes('(') || option.includes('<') ? <span className='font-mono'>{option}</span> : option}
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
                                                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' // Correct
                                                    : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700' // Incorrect
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
                                    {score === questions.length ? 'You spotted the error!' : 'Great job!'}
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
            slideId="dilations-find-error"
            slideTitle="Dilating Triangles: Find the Error"
            moduleId="performing-transformations"
            submoduleId="dilations" // Assuming this belongs to dilations submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}