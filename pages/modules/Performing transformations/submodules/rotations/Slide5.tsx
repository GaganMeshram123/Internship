import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const AllRotationsAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300; // Increased height for labels
    const origin = { x: svgWidth / 2, y: svgHeight / 2 };
    const scale = 25; // Pixels per unit
    const P = { x: 4, y: 2 }; // Starting point in Q1

    // Rotated points
    const P90 = { x: -P.y, y: P.x };   // (-2, 4) in Q2
    const P180 = { x: -P.x, y: -P.y }; // (-4, -2) in Q3
    const P270 = { x: P.y, y: -P.x };  // (2, -4) in Q4

    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgP = toSvg(P);
    const svgP90 = toSvg(P90);
    const svgP180 = toSvg(P180);
    const svgP270 = toSvg(P270);

    const radius = Math.sqrt(P.x*P.x + P.y*P.y) * scale;

    // Arc paths (approximate for simplicity)
    const arc90 = `M ${svgP.x} ${svgP.y} A ${radius} ${radius} 0 0 1 ${svgP90.x} ${svgP90.y}`;
    const arc180 = `M ${svgP.x} ${svgP.y} A ${radius} ${radius} 0 0 1 ${svgP180.x} ${svgP180.y}`;
    const arc270 = `M ${svgP.x} ${svgP.y} A ${radius} ${radius} 0 1 1 ${svgP270.x} ${svgP270.y}`; // Large arc flag = 1

    const duration = 1.0;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Axes */}
                <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke="#aaa" strokeWidth="1" />
                <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} stroke="#aaa" strokeWidth="1" />
                <circle cx={origin.x} cy={origin.y} r={4} className="fill-slate-400" />
                <text x={origin.x + 5} y={origin.y + 15} className="fill-slate-300 text-xs">(0,0)</text>

                {/* Arcs (appear sequentially) */}
                <motion.path d={arc90} fill="none" className="stroke-slate-400 dark:stroke-slate-500 opacity-50" strokeWidth="1.5" strokeDasharray="3 3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: delay, duration: duration }} />
                <motion.path d={arc180} fill="none" className="stroke-slate-400 dark:stroke-slate-500 opacity-50" strokeWidth="1.5" strokeDasharray="3 3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: delay + duration*0.5, duration: duration }} />
                <motion.path d={arc270} fill="none" className="stroke-slate-400 dark:stroke-slate-500 opacity-50" strokeWidth="1.5" strokeDasharray="3 3"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: delay + duration, duration: duration }} />

                {/* Points (appear sequentially) */}
                {/* P (Start) */}
                <circle cx={svgP.x} cy={svgP.y} r={5} className="fill-blue-500" />
                <text x={svgP.x + 5} y={svgP.y + 15} className="fill-blue-300 text-xs font-semibold">P({P.x},{P.y})</text>

                {/* P' (90) */}
                <motion.circle cx={svgP90.x} cy={svgP90.y} r={5} className="fill-green-500" // Use green for 90
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + duration }} />
                <motion.text x={svgP90.x - 10} y={svgP90.y - 10} textAnchor="end" className="fill-green-300 text-xs font-semibold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration }}>P'({P90.x},{P90.y}) [90°]</motion.text>

                {/* P'' (180) */}
                <motion.circle cx={svgP180.x} cy={svgP180.y} r={5} className="fill-yellow-500" // Use yellow for 180
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + duration * 1.5 }} />
                <motion.text x={svgP180.x - 10} y={svgP180.y + 15} textAnchor="end" className="fill-yellow-300 text-xs font-semibold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration * 1.5 }}>P''({P180.x},{P180.y}) [180°]</motion.text>

                {/* P''' (270) */}
                 <motion.circle cx={svgP270.x} cy={svgP270.y} r={5} className="fill-red-500" // Use red for 270
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + duration * 2 }} />
                 <motion.text x={svgP270.x + 5} y={svgP270.y - 10} className="fill-red-300 text-xs font-semibold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration * 2 }}>P'''({P270.x},{P270.y}) [270°]</motion.text>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function RotationsSlide5() {
    // ... (Keep existing state and handlers)
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]); // Two questions
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const { isDarkMode } = useThemeContext();

    const slideInteractions: Interaction[] = [
      {
        id: 'rotation-rules-quiz',
        conceptId: 'rotation-rules',
        conceptName: 'Rotation Rules',
        type: 'judging',
        description: 'Testing the rules for 90, 180, 270 degree rotations'
      }
    ];

    interface QuizQuestion {
        id: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string;
    }

    // --- UPDATED QUESTIONS ARRAY ---
    const questions: QuizQuestion[] = [
        {
            id: 'rotation-rule-90-q1',
            // --- $ SYMBOLS REMOVED ---
            question: "What is the coordinate rule for a 90° counter-clockwise rotation about the origin?",
            options: [
                "(x, y) → (x, -y)",
                "(x, y) → (-x, -y)",
                "(x, y) → (y, -x)",
                "(x, y) → (-y, x)"
            ],
            correctAnswer: "(x, y) → (-y, x)",
            explanation: "Correct! The coordinates swap, and the new x-coordinate (which was the old y-coordinate) becomes negative. This matches the 90° CCW rule."
        },
        {
            id: 'rotation-rule-apply-180-q2',
            // --- $ SYMBOLS REMOVED ---
            question: "Point P(6, -3) is rotated 180° about the origin. What are the coordinates of P'?",
            options: [
                "P'(-6, 3)",
                "P'(6, 3)",
                "P'(-3, -6)",
                "P'(3, 6)"
            ],
            correctAnswer: "P'(-6, 3)",
            explanation: "Correct! The rule for 180° is (x, y) → (-x, -y). So we just flip both signs: (6, -3) becomes (-6, -(-3)) which simplifies to (-6, 3)." // Explanation slightly improved
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
            interactionId: `rotation-rules-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'rotation-rules', conceptName: 'Rotation Rules',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The "Rules" for Origin Rotations</h2>
                        <p className="text-lg leading-relaxed">
                            These are the rules you should memorize. They all describe <strong>counter-clockwise ↺</strong> rotations about the <strong>origin (0,0)</strong>.
                        </p>
                    </div>

                    {/* --- CARD UPDATED (Added CW Equivalents, Colors, Symbols) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Rotation Rules (around origin)</h3>
                        <ul className="mt-4 space-y-4 text-lg">
                            {/* 90 CCW */}
                            <li className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-blue-500">90° CCW (↺)</span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">(Same as 270° CW ↻)</span>
                                </div>
                                <p className="font-mono text-xl mt-1 text-slate-800 dark:text-slate-200">(x, y) → (-y, x)</p>
                            </li>
                            {/* 180 */}
                            <li className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                                <span className="font-bold text-blue-500">180° (↺ or ↻)</span>
                                <p className="font-mono text-xl mt-1 text-slate-800 dark:text-slate-200">(x, y) → (-x, -y)</p>
                            </li>
                            {/* 270 CCW */}
                            <li className="p-3 rounded-lg bg-slate-100 dark:bg-slate-700/60">
                                 <div className="flex justify-between items-center">
                                    <span className="font-bold text-blue-500">270° CCW (↺)</span>
                                     <span className="text-sm text-slate-500 dark:text-slate-400">(Same as 90° CW ↻)</span>
                                </div>
                                <p className="font-mono text-xl mt-1 text-slate-800 dark:text-slate-200">(x, y) → (y, -x)</p>
                            </li>
                        </ul>
                        <p className="text-lg leading-relaxed mt-4 text-slate-600 dark:text-slate-400">
                             {/* --- $ Symbols Removed --- */}
                            <strong>Tip:</strong> A 180° turn just flips both signs. 90° and 270° turns swap x and y, and one coordinate flips its sign.
                        </p>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">All Rotations (from Q1)</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <AllRotationsAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            A pre-image in Quadrant 1 and its three counter-clockwise rotations (90°, 180°, 270°).
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
                                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 font-mono ${ // Added font-mono
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
                             <div className="text-3xl mb-4">📜</div> {/* Updated Emoji */}
                            <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                            <div className="text-lg text-slate-600 dark:text-slate-400">
                              You scored {score} out of {questions.length}
                            </div>
                            <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                              {score === questions.length ? "You've memorized the rules!" : 'Great job!'}
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
            slideId="rotating-shapes-90-multiples" // Updated slideId to be more descriptive
            slideTitle="Rotating Shapes: 90° Multiples"
            moduleId="performing-transformations"
            submoduleId="rotations" // Assuming this belongs to rotations submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}