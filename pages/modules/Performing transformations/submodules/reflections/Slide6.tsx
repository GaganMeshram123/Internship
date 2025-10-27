import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
// --- ANIMATION COMPONENT DEFINED INSIDE ---
const AllReflectionsAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 350; // Increased height
    const origin = { x: svgWidth / 2, y: svgHeight / 2 };
    const scale = 25;
    const P = { x: 4, y: 2 }; // Starting point P(4, 2)

    // Reflections
    const Px = { x: P.x, y: -P.y };   // (4, -2) over x-axis
    const Py = { x: -P.x, y: P.y };  // (-4, 2) over y-axis
    const Pyx = { x: P.y, y: P.x };   // (2, 4) over y=x
    const Pynx = { x: -P.y, y: -P.x }; // (-2, -4) over y=-x

    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgP = toSvg(P);
    const svgPx = toSvg(Px);
    const svgPy = toSvg(Py);
    const svgPyx = toSvg(Pyx);
    const svgPynx = toSvg(Pynx);

     // Lines y=x and y=-x
     const lineYeqX = { x1: 0, y1: svgHeight, x2: svgWidth, y2: 0 };
     const lineYeqNegX = { x1: 0, y1: 0, x2: svgWidth, y2: svgHeight };

    const duration = 0.5; // Faster appearance
    const delay = 0.3;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Axes (Lines of Reflection) */}
                <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} className="stroke-blue-500 opacity-50" strokeWidth="1.5" /> {/* X-Axis */}
                <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} className="stroke-blue-500 opacity-50" strokeWidth="1.5" /> {/* Y-Axis */}
                <line x1={lineYeqX.x1} y1={lineYeqX.y1} x2={lineYeqX.x2} y2={lineYeqX.y2} className="stroke-blue-500 opacity-50" strokeWidth="1.5" strokeDasharray="4 4" /> {/* y=x */}
                <line x1={lineYeqNegX.x1} y1={lineYeqNegX.y1} x2={lineYeqNegX.x2} y2={lineYeqNegX.y2} className="stroke-blue-500 opacity-50" strokeWidth="1.5" strokeDasharray="4 4" /> {/* y=-x */}
                 <circle cx={origin.x} cy={origin.y} r={3} className="fill-slate-400" />


                {/* Point P */}
                <circle cx={svgP.x} cy={svgP.y} r={5} className="fill-blue-600" />
                <text x={svgP.x + 5} y={svgP.y - 5} className="fill-blue-300 text-xs font-semibold">P({P.x},{P.y})</text>

                 {/* Reflected Points (Appear sequentially) */}
                 {/* Px (over x-axis) */}
                 <motion.circle cx={svgPx.x} cy={svgPx.y} r={5} className="fill-blue-500 opacity-70" // COLOR CHANGE
                     initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay }} />
                 <motion.text x={svgPx.x + 5} y={svgPx.y + 15} className="fill-blue-300 text-xs font-semibold" // COLOR CHANGE
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay }} >P'({Px.x},{Px.y}) <tspan dy="-0.5em" fontSize="0.7em">(x-axis)</tspan></motion.text>

                 {/* Py (over y-axis) */}
                  <motion.circle cx={svgPy.x} cy={svgPy.y} r={5} className="fill-blue-500 opacity-70" // COLOR CHANGE
                     initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + duration * 0.5 }} />
                  <motion.text x={svgPy.x - 5} y={svgPy.y - 5} textAnchor='end' className="fill-blue-300 text-xs font-semibold" // COLOR CHANGE
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration * 0.5 }}>P''({Py.x},{Py.y}) <tspan dy="-0.5em" fontSize="0.7em">(y-axis)</tspan></motion.text>

                 {/* Pyx (over y=x) */}
                  <motion.circle cx={svgPyx.x} cy={svgPyx.y} r={5} className="fill-blue-500 opacity-70" // COLOR CHANGE
                     initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + duration }} />
                  <motion.text x={svgPyx.x + 5} y={svgPyx.y - 5} className="fill-blue-300 text-xs font-semibold" // COLOR CHANGE
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration }}>P'''({Pyx.x},{Pyx.y}) <tspan dy="-0.5em" fontSize="0.7em">(y=x)</tspan></motion.text>

                 {/* Pynx (over y=-x) */}
                  <motion.circle cx={svgPynx.x} cy={svgPynx.y} r={5} className="fill-blue-500 opacity-70" // COLOR CHANGE
                     initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + duration * 1.5 }} />
                  <motion.text x={svgPynx.x - 5} y={svgPynx.y + 15} textAnchor='end' className="fill-blue-300 text-xs font-semibold" // COLOR CHANGE
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration * 1.5 }}>P''''({Pynx.x},{Pynx.y}) <tspan dy="-0.5em" fontSize="0.7em">(y=-x)</tspan></motion.text>

            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---

export default function ReflectionsSlide6() {
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
        id: 'reflection-summary-quiz',
        conceptId: 'reflection-rules',
        conceptName: 'Reflection Rules Summary',
        type: 'judging',
        description: 'Testing recall of all reflection rules'
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
            id: 'reflection-summary-q1-identify',
             // --- $ SYMBOLS REMOVED ---
            question: 'Which reflection rule is (x, y) → (-x, y)?',
            options: [
                'Over the x-axis',
                'Over the y-axis', // Correct
                'Over y = x',
                'Over y = -x'
            ],
            correctAnswer: 'Over the y-axis',
            explanation: "Correct! The x-coordinate flips its sign, which is what happens when you flip over the y-axis."
        },
        { // --- UPDATED SECOND QUESTION ---
            id: 'reflection-summary-q2-apply-ynx',
            question: "What are the coordinates of the point (-4, -6) after reflecting over the line y = -x?",
            options: [
                 "(6, 4)", // Correct: (-y, -x) -> (-(-6), -(-4)) -> (6, 4)
                 "(4, 6)",
                 "(-6, -4)",
                 "(6, -4)"
            ],
            correctAnswer: "(6, 4)",
            explanation: "Correct! The rule is (x, y) → (-y, -x). Swap to get (-6, -4), then flip both signs to get (6, 4)."
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
            interactionId: `reflection-summary-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'reflection-rules', conceptName: 'Reflection Rules Summary',
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Content */}
                <div className="space-y-6">
                     {/* --- CARD 1 UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Reflecting Shapes Summary</h2>
                        <p className="text-lg leading-relaxed">
                            A reflection is a <strong>rigid transformation</strong>, so the image is <strong>congruent</strong> (≅) to the pre-image.
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            However, unlike translations or rotations, a reflection <strong>changes the orientation</strong> (it creates a "mirror image").
                        </p>
                    </div>

                    {/* --- CARD 2 UPDATED (Colors & Symbols) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Reflection Rules to Memorize</h3>
                        <ul className="mt-4 space-y-3 text-lg">
                            <li className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                                <span className="font-bold text-blue-500">Over the x-axis:</span>
                                <p className="font-mono text-xl mt-1 text-slate-800 dark:text-slate-200">(x, y) → (x, -y)</p>
                            </li>
                            <li className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                                <span className="font-bold text-blue-500">Over the y-axis:</span>
                                <p className="font-mono text-xl mt-1 text-slate-800 dark:text-slate-200">(x, y) → (-x, y)</p>
                            </li>
                            <li className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                                <span className="font-bold text-blue-500">Over the line y = x:</span>
                                <p className="font-mono text-xl mt-1 text-slate-800 dark:text-slate-200">(x, y) → (y, x)</p>
                            </li>
                            <li className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                                <span className="font-bold text-blue-500">Over the line y = -x:</span>
                                <p className="font-mono text-xl mt-1 text-slate-800 dark:text-slate-200">(x, y) → (-y, -x)</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Rule Summary Visual</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <AllReflectionsAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            All four common reflections from a single pre-image point P.
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD (Colors Fixed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                         {/* ... Keep entire quiz section as is, but now uses 2 questions ... */}
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
                                               {/* Display rule/coordinate options with mono font */}
                                               {option.includes('(') || option.includes('=') || option.includes('axis') || option.includes('→') ? <span className='font-mono'>{option}</span> : option}
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
                               <div className="text-3xl mb-4">📚</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? "You've mastered the reflection rules!" : 'Great job!'}
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
            slideId="reflecting-shapes-summary" // Keeping original ID
            slideTitle="Reflecting Shapes Summary"
            moduleId="performing-transformations"
            submoduleId="reflections" // Assuming this belongs to reflections submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}