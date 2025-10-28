import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const RotationRuleAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const origin = { x: svgWidth / 2, y: svgHeight / 2 };
    const radius = 60; // Slightly smaller radius

    // Example P(2, 3) - scaled for visual clarity
    const scale = 20;
    const P = { x: 2, y: 3 };
    const P_prime = { x: -3, y: 2 }; // Rotated 90 deg CCW: (-y, x)

    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgP = toSvg(P);
    const svgP_prime = toSvg(P_prime);

    // Calculate angles for arc path
    const angleStart = Math.atan2(-P.y, P.x) * 180 / Math.PI; // Inverted Y for SVG calculation
    const angleEnd = angleStart + 90;

    // Use actual radius based on P for arc
    const actualRadius = Math.sqrt(P.x*P.x + P.y*P.y) * scale;

    const arcPath = `M ${svgP.x} ${svgP.y} A ${actualRadius} ${actualRadius} 0 0 1 ${svgP_prime.x} ${svgP_prime.y}`;


    const duration = 1.5;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                 {/* Axes */}
                 <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke="#aaa" strokeWidth="1" />
                 <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} stroke="#aaa" strokeWidth="1" />
                 <circle cx={origin.x} cy={origin.y} r={4} className="fill-slate-400" />
                 <text x={origin.x + 5} y={origin.y + 15} className="fill-slate-300 text-xs">(0,0)</text>

                 {/* Rotation Arc Path (dashed) */}
                 <motion.path
                    d={arcPath}
                    fill="none"
                    className="stroke-slate-400 dark:stroke-slate-500"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: delay, duration: duration, ease: "linear" }}
                />

                {/* Arrowhead for Arc */}
                 <motion.g
                     initial={{ offsetDistance: "0%" }}
                     animate={{ offsetDistance: "100%" }}
                     transition={{ delay: delay, duration: duration, ease: "linear" }}
                 >
                     <path d="M -4 -3 L 0 0 L -4 3" fill="none" strokeWidth="2" className="stroke-slate-400 dark:stroke-slate-500">
                        <animateMotion dur={`${duration}s`} begin={`${delay}s`} fill="freeze" repeatCount="1">
                           <mpath href="#rotationArcPath90"/>
                        </animateMotion>
                    </path>
                     <path id="rotationArcPath90" d={arcPath} fill="none" stroke="none" />
                </motion.g>

                {/* Start Point P */}
                <motion.circle
                    cx={svgP.x}
                    cy={svgP.y}
                    r={6}
                    className="fill-blue-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                />
                <text x={svgP.x + 10} y={svgP.y + 5} className="fill-blue-300 text-sm font-semibold">P(2, 3)</text>

                 {/* End Point P' (Fades in) */}
                 <motion.circle
                    cx={svgP_prime.x}
                    cy={svgP_prime.y}
                    r={6}
                    className="fill-green-500"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: delay + duration, duration: 0.3 }}
                />
                <motion.text
                    x={svgP_prime.x - 10} y={svgP_prime.y - 10} textAnchor='end' className="fill-green-300 text-sm font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + duration, duration: 0.3 }}
                >P'(-3, 2)</motion.text>

                {/* Angle Label */}
                 <motion.text
                    x={origin.x + 30} y={origin.y - 30} className="fill-slate-300 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + duration/2 }}
                 >90° CCW</motion.text>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function RotationsSlide2() {
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
        id: 'determining-rotations-quiz', // Updated ID
        conceptId: 'determining-rotations',
        conceptName: 'Determining Rotations',
        type: 'judging',
        description: 'Testing finding rotation rules from points' // Updated description
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
            id: 'find-rule-q1-180', // Question now tests 180 rule
            // --- $ SYMBOLS REMOVED ---
            question: "Pre-image A(5, 1) rotates to image A'(-5, -1). What rotation rule was applied?",
            options: [
                "(x, y) → (-x, -y)", // 180 deg
                "(x, y) → (y, -x)", // 270 deg CCW / 90 deg CW
                "(x, y) → (-y, x)", // 90 deg CCW
                "(x, y) → (x, -y)" // Reflection over x-axis
            ],
            correctAnswer: "(x, y) → (-x, -y)",
            explanation: "Correct! Both the x-coordinate (5 became -5) and the y-coordinate (1 became -1) changed signs. This is the rule for a 180° rotation."
        },
        { // --- ADDED SECOND QUESTION (Testing 90 CCW Rule) ---
             id: 'find-rule-q2-90ccw',
             question: "If the point Q(-1, 5) is rotated 90° counter-clockwise around the origin, what are the coordinates of Q'?",
             options: [
                 "Q'(1, 5)",
                 "Q'(-5, -1)",
                 "Q'(5, 1)",
                 "Q'(1, -5)"
             ],
             correctAnswer: "Q'(-5, -1)",
             explanation: "Correct! The rule for 90° CCW is (x, y) → (-y, x). So, x=-1 and y=5. The new coordinates are (-5, -1)."
        }
    ];

    // ... (Keep existing handlers: handleInteractionComplete, handleQuizAnswer, handleNextQuestion)
    const handleInteractionComplete = (response: InteractionResponse) => {
      setLocalInteractions(prev => ({
        ...prev,
        [response.interactionId]: response
      }));
    };

    const handleQuizAnswer = (answerText: string) => {
      if (showFeedback || isQuizComplete) return;

      setSelectedAnswer(answerText);
      setShowFeedback(true);

      const current = questions[currentQuestionIndex];
      const isCorrect = answerText === current.correctAnswer;
      if (isCorrect) {
        setScore(prev => prev + 1);
      }

      handleInteractionComplete({
        interactionId: `determining-rotations-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`, // Updated ID
        value: answerText,
        isCorrect,
        timestamp: Date.now(),
        conceptId: 'determining-rotations',
        conceptName: 'Determining Rotations',
        conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
        question: {
          type: 'mcq',
          question: current.question,
          options: current.options
        }
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Finding the Turn (from Points)</h2>
                        <p className="text-lg leading-relaxed">
                            How can we find the rotation rule just by looking at the "before" and "after" coordinates?
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                             {/* --- $ SYMBOLS REMOVED --- */}
                            Let's look for a pattern. We will rotate around the origin (0,0).
                        </p>
                    </div>

                    {/* --- CARD UPDATED (Added 180 & 270 rules, removed $) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Rotation Rules (around origin)</h3>

                        {/* 90 CCW Section */}
                        <div className="mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                             <h4 className='text-lg font-semibold text-blue-500 dark:text-blue-400 mb-2'>90° Counter-Clockwise (↺)</h4>
                             <p className="text-lg leading-relaxed"> Example: P(2, 3) becomes P'(-3, 2).</p>
                             <p className="text-lg leading-relaxed mt-2"> Pattern: Original (x, y) → Image (-y, x)</p>
                             <p className="text-lg leading-relaxed mt-2 font-bold font-mono bg-slate-100 dark:bg-slate-700 p-2 rounded"> Rule: (x, y) → (-y, x)</p>
                        </div>

                         {/* 180 Section */}
                         <div className="mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                             <h4 className='text-lg font-semibold text-blue-500 dark:text-blue-400 mb-2'>180° (↺ or ↻)</h4>
                             <p className="text-lg leading-relaxed"> Example: P(2, 3) becomes P'(-2, -3).</p>
                             <p className="text-lg leading-relaxed mt-2"> Pattern: Original (x, y) → Image (-x, -y)</p>
                             <p className="text-lg leading-relaxed mt-2 font-bold font-mono bg-slate-100 dark:bg-slate-700 p-2 rounded"> Rule: (x, y) → (-x, -y)</p>
                         </div>

                         {/* 270 CCW Section */}
                         <div>
                             <h4 className='text-lg font-semibold text-blue-500 dark:text-blue-400 mb-2'>270° CCW (↺) or 90° CW (↻)</h4>
                             <p className="text-lg leading-relaxed"> Example: P(2, 3) becomes P'(3, -2).</p>
                             <p className="text-lg leading-relaxed mt-2"> Pattern: Original (x, y) → Image (y, -x)</p>
                             <p className="text-lg leading-relaxed mt-2 font-bold font-mono bg-slate-100 dark:bg-slate-700 p-2 rounded"> Rule: (x, y) → (y, -x)</p>
                         </div>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                         {/* --- Title Updated --- */}
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing 90° CCW: P(2, 3) → P'(-3, 2)</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <RotationRuleAnimation />
                        
                        {/* --- Caption Updated ($ Removed) --- */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            The original (x, y) coordinates become (-y, x).
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD (Colors Fixed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
                            <div className="text-lg text-slate-600 dark:text-slate-400">
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </div>
                        </div>
                         {/* --- Progress Bar (COLOR UPDATED) --- */}
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
                                 {/* --- Answer Options (COLORS UPDATED) --- */}
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
                                {/* --- Feedback Box (COLORS UPDATED) --- */}
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
                                <div className="text-3xl mb-4">🧠</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You found the rule!' : 'Great job!'}
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
            slideId="determining-rotations-1"
            slideTitle="Determining Rotations"
            moduleId="performing-transformations"
            submoduleId="rotations" // Assuming this belongs to a rotations submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}