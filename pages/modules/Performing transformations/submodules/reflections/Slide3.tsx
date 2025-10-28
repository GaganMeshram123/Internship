import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const DiagonalReflectionAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 350; // Increased height
    const origin = { x: svgWidth / 2, y: svgHeight / 2 };
    const scale = 20;
    const P = { x: 1, y: 4 }; // Example point P(1, 4)

    // Reflections
    const P_yx = { x: P.y, y: P.x };       // P'(4, 1) over y = x
    const P_ynx = { x: -P.y, y: -P.x };   // P''(-4, -1) over y = -x

    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgP = toSvg(P);
    const svgP_yx = toSvg(P_yx);
    const svgP_ynx = toSvg(P_ynx);

    // Lines y=x and y=-x
    const lineYeqX = { x1: 0, y1: svgHeight, x2: svgWidth, y2: 0 }; // Approx y=x visually
    const lineYeqNegX = { x1: 0, y1: 0, x2: svgWidth, y2: svgHeight }; // Approx y=-x visually

    const duration = 1.0;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                 {/* Axes */}
                 <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke="#aaa" strokeWidth="0.5" />
                 <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} stroke="#aaa" strokeWidth="0.5" />
                 <circle cx={origin.x} cy={origin.y} r={3} className="fill-slate-400" />

                 {/* Line y=x (Blue, Dashed) */}
                 <line x1={lineYeqX.x1} y1={lineYeqX.y1} x2={lineYeqX.x2} y2={lineYeqX.y2} className="stroke-blue-500" strokeWidth="1.5" strokeDasharray="5 5" />
                 <text x={svgWidth - 15} y={15} className="fill-blue-400 text-xs font-semibold">y=x</text>

                  {/* Line y=-x (Red, Dashed) */}
                 <line x1={lineYeqNegX.x1} y1={lineYeqNegX.y1} x2={lineYeqNegX.x2} y2={lineYeqNegX.y2} className="stroke-red-500" strokeWidth="1.5" strokeDasharray="5 5" />
                  <text x={svgWidth - 15} y={svgHeight-5} className="fill-red-400 text-xs font-semibold">y=-x</text>


                 {/* Point P */}
                 <circle cx={svgP.x} cy={svgP.y} r={5} className="fill-blue-600" />
                 <text x={svgP.x - 5} y={svgP.y - 10} className="fill-blue-300 text-xs font-semibold">P({P.x},{P.y})</text>

                 {/* Reflection over y=x (Segment + Point P') */}
                  <motion.line x1={svgP.x} y1={svgP.y} x2={svgP.x} y2={svgP.y} animate={{ x2: svgP_yx.x, y2: svgP_yx.y }}
                     transition={{ delay: delay, duration: duration }} className="stroke-slate-400" strokeWidth="1" strokeDasharray="3 3"/>
                  <motion.circle cx={svgP_yx.x} cy={svgP_yx.y} r={5} className="fill-green-500"
                     initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + duration }} />
                 <motion.text x={svgP_yx.x + 8} y={svgP_yx.y + 5} className="fill-green-300 text-xs font-semibold"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration }} >P'({P_yx.x},{P_yx.y})</motion.text>
                 <motion.text x={svgP_yx.x + 8} y={svgP_yx.y + 18} className="fill-green-400 text-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration + 0.1 }} >(over y=x)</motion.text>


                 {/* Reflection over y=-x (Segment + Point P'') */}
                 <motion.line x1={svgP.x} y1={svgP.y} x2={svgP.x} y2={svgP.y} animate={{ x2: svgP_ynx.x, y2: svgP_ynx.y }}
                     transition={{ delay: delay + duration + 0.5, duration: duration }} className="stroke-slate-400" strokeWidth="1" strokeDasharray="3 3"/>
                  <motion.circle cx={svgP_ynx.x} cy={svgP_ynx.y} r={5} className="fill-orange-500" // Orange for y=-x reflection
                     initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + duration*2 + 0.5 }} />
                  <motion.text x={svgP_ynx.x - 8} y={svgP_ynx.y + 15} textAnchor='end' className="fill-orange-300 text-xs font-semibold"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.5 }} >P''({P_ynx.x},{P_ynx.y})</motion.text>
                   <motion.text x={svgP_ynx.x - 8} y={svgP_ynx.y + 28} textAnchor='end' className="fill-orange-400 text-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.6 }} >(over y=-x)</motion.text>
             </svg>
         </div>
     );
 };
 // --- END OF ANIMATION COMPONENT DEFINITION ---


export default function ReflectionsSlide3() {
    // ... (Keep existing state and handlers)
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    // --- UPDATED FOR 3 QUESTIONS ---
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [
      {
        id: 'determining-reflections-diagonal-quiz',
        conceptId: 'determining-reflections-diagonal',
        conceptName: 'Determining Reflections (Diagonal)',
        type: 'judging',
        description: 'Testing finding reflection lines (y=x, y=-x)'
      }
    ];

    interface QuizQuestion {
        id: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }

    // --- UPDATED QUESTIONS ARRAY (3 QUESTIONS) ---
    const questions: QuizQuestion[] = [
        {
            id: 'find-line-y-equals-x-q1',
             // --- $ SYMBOLS REMOVED ---
            question: "Pre-image A(2, 5) is reflected to image A'(5, 2). What is the line of reflection?",
            options: [
                'The x-axis',
                'The y-axis',
                'The line y = x',
                'The line y = -x'
            ],
            correctAnswer: 'The line y = x',
            explanation: "Correct! The coordinates (x, y) just swapped places to become (y, x). This is the rule for reflecting over the line y = x."
        },
        {
            id: 'find-line-y-equals-neg-x-q2',
            // --- $ SYMBOLS REMOVED ---
            question: "Pre-image B(-3, 1) is reflected to image B'(-1, 3). What is the line of reflection?",
            options: [
                'The x-axis',
                'The y-axis',
                'The line y = x',
                'The line y = -x'
            ],
            correctAnswer: 'The line y = -x',
            explanation: "Correct! The coordinates (x, y) swapped places AND flipped their signs, becoming (-y, -x). (-3, 1) → (-1, -(-3)) → (-1, 3). This is the rule for reflecting over y = -x."
        },
        { // --- ADDED THIRD QUESTION ---
            id: 'apply-rule-y-equals-neg-x-q3',
            question: "What are the coordinates of the point (-2, 5) after reflecting over the line y = -x?",
            options: [
                 "(-5, 2)", // Correct: (-y, -x) -> (-5, -(-2)) -> (-5, 2)
                 "(5, -2)",
                 "(2, -5)",
                 "(5, 2)"
            ],
            correctAnswer: "(-5, 2)",
            explanation: "Correct! The rule is (x, y) → (-y, -x). Swap x and y to get (5, -2), then flip both signs to get (-5, 2)."
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
            interactionId: `determining-reflections-diagonal-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'determining-reflections-diagonal', conceptName: 'Determining Reflections (Diagonal)',
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
                    {/* --- CARD 1 UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Advanced: Diagonal Lines</h2>
                        <p className="text-lg leading-relaxed">
                            We can also reflect over diagonal lines. The two most common are y = x and y = -x.
                        </p>
                    </div>

                    {/* --- RULE 3 UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Rule 3: Reflecting over y = x</h3>
                        <p className="text-lg leading-relaxed">
                            Pre-image P(1, 4) becomes Image P'(4, 1).
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            <strong>Observation:</strong> The x and y coordinates simply swap places.
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <p className="text-lg font-mono text-center font-bold text-slate-800 dark:text-slate-100">Rule: (x, y) → (y, x)</p>
                        </div>
                    </div>

                    {/* --- RULE 4 UPDATED ($ Removed, Tip Added) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Rule 4: Reflecting over y = -x</h3>
                        <p className="text-lg leading-relaxed">
                            Pre-image P(1, 4) becomes Image P'(-4, -1).
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            <strong>Observation:</strong> The x and y coordinates swap places AND both flip their signs.
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <p className="text-lg font-mono text-center font-bold text-slate-800 dark:text-slate-100">Rule: (x, y) → (-y, -x)</p>
                        </div>
                        {/* --- TIP ADDED --- */}
                         <em className="text-base text-slate-500 dark:text-slate-400 block mt-2">
                            Tip: Swap x and y, THEN flip the signs of BOTH new coordinates.
                         </em>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                         {/* --- Title Updated --- */}
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Reflecting over y=x and y=-x</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <DiagonalReflectionAnimation />
                        
                         {/* --- Caption Updated ($ Removed) --- */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Reflecting P(1, 4) over y=x gives P'(4, 1). Reflecting over y=-x gives P''(-4, -1).
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD (Colors Fixed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                         {/* ... Keep entire quiz section as is, but now uses 3 questions ... */}
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
                                        const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${ // Removed font-mono from base
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
                                               {/* Display rule options with mono font */}
                                               {option.includes('(') || option.includes('=') || option.includes('axis') ? <span className='font-mono'>{option}</span> : option}
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
                               <div className="text-3 /xl mb-4">📐</div> {/* Updated Emoji */}
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? "You've mastered the diagonal rules!" : 'Great job!'}
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
            slideId="determining-reflections-advanced"
            slideTitle="Determining Reflections (Advanced)"
            moduleId="performing-transformations"
            submoduleId="reflections" // Assuming this belongs to reflections submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}