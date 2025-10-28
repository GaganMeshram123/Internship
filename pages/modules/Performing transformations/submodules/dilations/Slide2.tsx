import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Fix 1: Correct the import paths (assuming they are correct relative to your project structure)
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const EnlargementReductionAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300;
    const C = { x: 50, y: svgHeight/2 }; // Center of Dilation (Left side)
    const scale = 20;

    // Pre-image Triangle vertices (relative to origin if needed, simple shape here)
    const A = { x: C.x + 2*scale, y: C.y - 1*scale };
    const B = { x: C.x + 4*scale, y: C.y - 1*scale };
    const C_pt = { x: C.x + 3*scale, y: C.y + 1*scale };

    // Enlargement (k=2)
    const k_enlarge = 2;
    const A_enlarge = { x: C.x + (A.x - C.x) * k_enlarge, y: C.y + (A.y - C.y) * k_enlarge };
    const B_enlarge = { x: C.x + (B.x - C.x) * k_enlarge, y: C.y + (B.y - C.y) * k_enlarge };
    const C_enlarge = { x: C.x + (C_pt.x - C.x) * k_enlarge, y: C.y + (C_pt.y - C.y) * k_enlarge };

    // Reduction (k=0.5)
    const k_reduce = 0.5;
    const A_reduce = { x: C.x + (A.x - C.x) * k_reduce, y: C.y + (A.y - C.y) * k_reduce };
    const B_reduce = { x: C.x + (B.x - C.x) * k_reduce, y: C.y + (B.y - C.y) * k_reduce };
    const C_reduce = { x: C.x + (C_pt.x - C.x) * k_reduce, y: C.y + (C_pt.y - C.y) * k_reduce };

    const duration = 1.0;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Center of Dilation */}
                <circle cx={C.x} cy={C.y} r={5} className="fill-red-500" />
                <text x={C.x - 10} y={C.y + 15} className="fill-red-300 text-xs font-semibold">C</text>

                {/* Lines radiating from Center (visual guide) */}
                {[A, B, C_pt].map((pt, i) => (
                    <line key={`line-${i}`} x1={C.x} y1={C.y} x2={C.x + (pt.x - C.x) * 3} y2={C.y + (pt.y - C.y) * 3}
                          className="stroke-slate-400 dark:stroke-slate-600 opacity-50" strokeWidth="0.5" strokeDasharray="2 2"/>
                ))}


                {/* Pre-image Triangle (Blue) */}
                <motion.polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C_pt.x},${C_pt.y}`}
                    className="fill-blue-600 opacity-60 stroke-blue-800 stroke-1"
                    initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 0.5 }} />
                <text x={A.x - 15} y={A.y - 5} className="fill-blue-300 font-bold text-xs">Pre</text>


                {/* Enlarged Image (Green) - Appears further out */}
                <motion.polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C_pt.x},${C_pt.y}`} // Start at original
                    className="fill-green-600 opacity-60 stroke-green-800 stroke-1"
                    initial={{ opacity: 0 }}
                    animate={{
                        points: `${A_enlarge.x},${A_enlarge.y} ${B_enlarge.x},${B_enlarge.y} ${C_enlarge.x},${C_enlarge.y}`,
                        opacity: 0.6
                    }}
                    transition={{ delay: delay, duration: duration, ease: 'easeOut' }}
                />
                 <motion.text x={A_enlarge.x - 15} y={A_enlarge.y - 10} className="fill-green-300 font-bold text-xs"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration }}>Enlarge (k=2)</motion.text>


                {/* Reduced Image (Orange) - Appears closer in */}
                 <motion.polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C_pt.x},${C_pt.y}`} // Start at original
                    className="fill-orange-600 opacity-60 stroke-orange-800 stroke-1"
                    initial={{ opacity: 0 }}
                    animate={{
                        points: `${A_reduce.x},${A_reduce.y} ${B_reduce.x},${B_reduce.y} ${C_reduce.x},${C_reduce.y}`,
                        opacity: 0.6
                    }}
                    transition={{ delay: delay + duration + 0.5, duration: duration, ease: 'easeOut' }}
                />
                  <motion.text x={A_reduce.x + 5} y={A_reduce.y - 5} className="fill-orange-300 font-bold text-xs"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.5 }}>Reduce (k=0.5)</motion.text>

            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function DilationsSlide2() {
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
        id: 'scale-factor-quiz',
        conceptId: 'scale-factor',
        conceptName: 'Scale Factor',
        type: 'judging',
        description: 'Testing understanding of scale factor (enlargement vs reduction)'
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
            id: 'scale-factor-type-q1',
            // --- $ SYMBOLS REMOVED ---
            question: "A dilation with a scale factor of k = 0.5 is an...?",
            options: [
                'Enlargement',
                'Reduction', // Correct
                'Translation',
                'Reflection'
            ],
            correctAnswer: 'Reduction',
            explanation: "Correct! Since the scale factor k is between 0 and 1 (0 < 0.5 < 1), it is a reduction (it shrinks the shape)."
        },
        {
            id: 'scale-factor-find-q2',
             // --- $ SYMBOLS REMOVED ---
            question: "A pre-image line segment is 5 units long. Its image after a dilation is 15 units long. What is the scale factor k?",
            options: [
                'k = 3', // Correct
                'k = 1/3',
                'k = 10',
                'k = 5'
            ],
            correctAnswer: 'k = 3',
            // --- Formula display improved ---
            explanation: "Correct! The formula is k = (image length) / (pre-image length). So, k = 15 / 5 = 3. Since k > 1, it's an enlargement."
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
            interactionId: `scale-factor-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'scale-factor', conceptName: 'Scale Factor',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What is a Scale Factor (k)?</h2>
                        <p className="text-lg leading-relaxed">
                            The <strong>scale factor</strong>, which we call <strong>k</strong>, is the "multiplier" that tells you how much to resize the shape.
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            You can find it by dividing the length of a side on the <strong>image</strong> by the length of the matching side on the <strong>pre-image</strong>.
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            {/* --- Formula display improved --- */}
                            <p className="text-lg font-mono text-center font-bold text-slate-800 dark:text-slate-100">
                                k = (image length) / (pre-image length)
                            </p>
                        </div>
                    </div>

                    {/* --- CARD 2 UPDATED ($ Removed, HTML entities, Colors) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Bigger or Smaller?</h3>
                        <p className="text-lg leading-relaxed">
                            The value of k tells you what kind of dilation it is:
                        </p>
                        <ul className="mt-4 space-y-3 text-lg">
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">►</span> {/* Color */}
                                <span><strong>Enlargement:</strong> The shape gets bigger. Happens when |k| &gt; 1. (e.g., k=2, k=5, k=-3)</span> {/* Symbols */}
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">►</span> {/* Color */}
                                <span><strong>Reduction:</strong> The shape gets smaller. Happens when 0 &lt; |k| &lt; 1. (e.g., k=0.5, k=1/3, k=-0.25)</span> {/* Symbols */}
                            </li>
                        </ul>
                    </div>

                    {/* --- CARD 3 (Dilation Rule) UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Dilation Rule (from Origin)</h3>
                        <p className="text-lg leading-relaxed">
                           If a shape is dilated by scale factor k from the **Origin (0, 0)**, use this rule for every point (x, y):
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <p className="text-lg font-mono text-center font-bold text-slate-800 dark:text-slate-100">
                                (x, y) → (kx, ky)
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Animation, Properties, Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Enlargement vs. Reduction</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <EnlargementReductionAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            If k &gt; 1, the image is larger. If 0 &lt; k &lt; 1, the image is smaller.
                        </p>
                    </div>

                    {/* --- NEW CARD: Properties Summary --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                      <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Properties Summary</h3>
                      <p className="text-lg mb-2 text-slate-800 dark:text-slate-100"><strong>What Stays the Same? ✅</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-lg text-slate-700 dark:text-slate-300">
                        <li>Angle Measures</li>
                        <li>Parallelism</li>
                         <li>Orientation</li>
                      </ul>
                       <p className="text-lg mt-4 mb-2 text-slate-800 dark:text-slate-100"><strong>What Changes? ❌</strong></p>
                       <ul className="list-disc list-inside space-y-1 text-lg text-slate-700 dark:text-slate-300">
                         <li>Side Lengths (multiplied by k)</li>
                         <li>Location</li>
                       </ul>
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
                                                {/* Apply mono font only to k= options */}
                                                {option.includes('k =') ? <span className='font-mono'>{option}</span> : option}
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
                                <div className="text-3xl mb-4">🔎</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You understand scale factor!' : 'Great job!'}
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
            slideId="dilations-scale-factor"
            slideTitle="Dilations: Scale Factor"
            moduleId="performing-transformations"
            submoduleId="dilations" // Assuming this belongs to dilations submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}