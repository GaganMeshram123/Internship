import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Fix 1: Correct the import paths (assuming they are correct)
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const NonOriginDilationAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 350; // Increased height
    const origin = { x: 50, y: svgHeight - 50 }; // Origin bottom-left
    const scale = 20; // Pixels per unit

    // Example points
    const C = { x: 1, y: 2 }; // Center of Dilation
    const P = { x: 4, y: 5 }; // Pre-image
    const k = 2; // Scale factor

    // Step 1: Translate P relative to C (as if C is origin)
    const P_relative = { x: P.x - C.x, y: P.y - C.y }; // (3, 3)

    // Step 2: Dilate relative point
    const P_relative_dilated = { x: P_relative.x * k, y: P_relative.y * k }; // (6, 6)

    // Step 3: Translate back by adding C
    const P_prime = { x: P_relative_dilated.x + C.x, y: P_relative_dilated.y + C.y }; // (7, 8)

    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgC = toSvg(C);
    const svgP = toSvg(P);
    const svgP_prime = toSvg(P_prime);
    const svgOrigin = toSvg({ x: 0, y: 0 }); // Actual origin for context

    // Points relative to C, but plotted in original coordinate space for animation path
    const svgP_temp_origin = toSvg(P_relative); // Temp point as if C was origin
    const svgP_temp_scaled = toSvg(P_relative_dilated); // Temp scaled point as if C was origin

    const duration = 1.0;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                 {/* Axes & Grid (optional, simplified) */}
                 <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} stroke="#aaa" strokeWidth="0.5" />
                 <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} stroke="#aaa" strokeWidth="0.5" />
                 <circle cx={origin.x} cy={origin.y} r={3} className="fill-slate-400" />

                {/* Center of Dilation C */}
                <circle cx={svgC.x} cy={svgC.y} r={5} className="fill-red-500" />
                <text x={svgC.x - 10} y={svgC.y + 15} className="fill-red-300 text-xs font-semibold">C({C.x},{C.y})</text>

                {/* Point P */}
                <circle cx={svgP.x} cy={svgP.y} r={5} className="fill-blue-500" />
                <text x={svgP.x + 8} y={svgP.y + 5} className="fill-blue-300 text-xs font-semibold">P({P.x},{P.y})</text>

                 {/* Point P' (final position, fades in) */}
                 <motion.circle cx={svgP_prime.x} cy={svgP_prime.y} r={5} className="fill-green-500"
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: delay + duration * 3 + 0.3, duration: 0.3 }} />
                 <motion.text x={svgP_prime.x + 8} y={svgP_prime.y + 5} className="fill-green-300 text-xs font-semibold"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: delay + duration * 3 + 0.3 }} >P'({P_prime.x},{P_prime.y})</motion.text>


                 {/* Animation Steps */}
                 {/* Step 1: Visualize Translate P to Origin relative to C (vector from P to C) */}
                 <motion.line x1={svgP.x} y1={svgP.y} x2={svgP.x} y2={svgP.y}
                    animate={{ x2: svgC.x, y2: svgC.y }}
                    transition={{ delay: delay, duration: duration }}
                    stroke="#FF8C00" strokeWidth="1.5" strokeDasharray="3 3" />
                 <motion.text x={(svgP.x+svgC.x)/2} y={(svgP.y+svgC.y)/2 - 10} textAnchor='middle' className="fill-orange-400 text-xs"
                     initial={{opacity:0}} animate={{opacity: 1}} transition={{delay: delay+duration/2}}>1. Translate by (-a, -b)</motion.text>


                 {/* Step 2: Visualize Dilation from C */}
                  <motion.line x1={svgC.x} y1={svgC.y} x2={svgC.x} y2={svgC.y}
                     // Animate from C to where the dilated point *would be* if C were the origin
                     animate={{ x2: origin.x + P_relative_dilated.x*scale, y2: origin.y - P_relative_dilated.y*scale }}
                     transition={{ delay: delay + duration + 0.2, duration: duration }}
                     stroke="#ADFF2F" strokeWidth="1.5" strokeDasharray="3 3" /> {/* Lime Green */}
                 <motion.text x={svgC.x + P_relative_dilated.x*scale/2 + 10} y={svgC.y - P_relative_dilated.y*scale/2 - 10 } textAnchor='start' className="fill-lime-400 text-xs"
                      initial={{opacity:0}} animate={{opacity: 1}} transition={{delay: delay + duration*1.5 + 0.2}}>2. Dilate by k={k}</motion.text>

                 {/* Step 3: Visualize Translate Back (from relative dilated position + C offset) */}
                  <motion.line
                     // Start from where the scaled point would be relative to origin
                     x1={origin.x + P_relative_dilated.x*scale} y1={origin.y - P_relative_dilated.y*scale}
                     x2={origin.x + P_relative_dilated.x*scale} y2={origin.y - P_relative_dilated.y*scale}
                     // Animate to the final P' position
                     animate={{ x2: svgP_prime.x, y2: svgP_prime.y }}
                     transition={{ delay: delay + duration * 2 + 0.4, duration: duration }}
                     stroke="#FF8C00" strokeWidth="1.5" strokeDasharray="3 3" />
                  <motion.text
                      x={svgP_prime.x - 30 } y={svgP_prime.y - 20} textAnchor='middle' className="fill-orange-400 text-xs"
                       initial={{opacity:0}} animate={{opacity: 1}} transition={{delay: delay + duration*2.5 + 0.4}}>3. Translate back by (a, b)</motion.text>

            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function DilationsSlide3() {
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
        id: 'dilation-center-quiz',
        conceptId: 'dilation-center',
        conceptName: 'Center of Dilation',
        type: 'judging',
        description: 'Testing understanding of the center of dilation and non-origin dilation' // Updated
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
            id: 'dilation-center-q1',
            question: "In any dilation, what is the *one point* that does not move?",
            options: [
                'The origin',
                'The center of the shape',
                'The center of dilation', // Correct
                'The vertex closest to the origin'
            ],
            correctAnswer: 'The center of dilation',
            explanation: "Correct! The center of dilation is the 'anchor point' or 'pin' for the resize. It is the only point that maps onto itself."
        },
        { // --- ADDED SECOND QUESTION (Non-Origin Calculation) ---
            id: 'dilation-non-origin-calc-q2',
             // --- $ SYMBOLS REMOVED ---
            question: "What are the coordinates of point A(3, 1) after a dilation with scale factor k=3 centered at C(1, 0)?",
             options: [
                 "A'(6, 3)",
                 "A'(7, 3)", // Correct
                 "A'(9, 3)",
                 "A'(6, 0)"
             ],
             correctAnswer: "A'(7, 3)",
             explanation: "Correct! 1. Subtract C: (3-1, 1-0) = (2, 1). 2. Dilate by k=3: (3*2, 3*1) = (6, 3). 3. Add C back: (6+1, 3+0) = (7, 3). So A' is (7, 3)."
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
            interactionId: `dilation-center-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'dilation-center', conceptName: 'Center of Dilation',
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
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The "Anchor Point"</h2>
                        <p className="text-lg leading-relaxed">
                            Every dilation needs a <strong>center of dilation</strong>. This is the "anchor point" from which the resizing happens.
                        </p>
                        <p className="text-lg leading-relaxed mt-4 font-bold text-slate-800 dark:text-slate-100">
                            The center of dilation is the *only point in the plane that does not move*.
                        </p>
                    </div>

                    {/* --- CARD UPDATED (Colors, Symbols) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Enlarge vs. Reduce</h3>
                        <p className="text-lg leading-relaxed">
                            All other points move along a straight line connecting them to the center of dilation.
                        </p>
                        <ul className="mt-4 space-y-3 text-lg">
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">►</span>
                                <span><strong>Enlargement (k &gt; 1):</strong> Points move *away from* the center.</span> {/* Symbols */}
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">►</span>
                                <span><strong>Reduction (0 &lt; k &lt; 1):</strong> Points move *toward* the center.</span> {/* Symbols */}
                            </li>
                        </ul>
                         <p className="text-lg leading-relaxed mt-4 text-slate-600 dark:text-slate-400">
                           Often, the center is the <strong>origin (0,0)</strong>, making the rule simple: (x, y) → (kx, ky).
                         </p>
                    </div>

                    {/* --- NON-ORIGIN DILATION CARD UPDATED ($ Removed, Formula simplified) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Dilation with a Non-Origin Center 🎯</h3>
                        <p className="text-lg leading-relaxed">
                            To dilate a point A(x, y) when the center is C(a, b) (not the origin), follow these three steps:
                        </p>
                        <ul className="mt-4 space-y-3 text-lg text-slate-700 dark:text-slate-300">
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">1.</span>
                                <span><strong>Translate to Origin:</strong> Subtract C → <span className='font-mono'>(x - a, y - b)</span></span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">2.</span>
                                <span><strong>Dilate:</strong> Multiply by k → <span className='font-mono'>(k(x - a), k(y - b))</span></span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">3.</span>
                                 {/* Simplified Formula Display */}
                                <span><strong>Translate Back:</strong> Add C → <span className='font-mono'>A' = (k(x-a)+a, k(y-b)+b)</span></span>
                            </li>
                        </ul>
                    </div>

                    {/* --- NEW CARD: Concrete Example --- */}
                     <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                       <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Non-Origin Dilation</h3>
                       <p className="text-lg leading-relaxed">Let's dilate point P(4, 5) with k=2 from center C(1, 2).</p>
                       <ul className="mt-4 space-y-2 text-lg text-slate-700 dark:text-slate-300">
                         <li>
                           <strong>1. Translate to Origin:</strong> <span className="font-mono">(4 - 1, 5 - 2) = (3, 3)</span>
                         </li>
                         <li>
                           <strong>2. Dilate (k=2):</strong> <span className="font-mono">(2 * 3, 2 * 3) = (6, 6)</span>
                         </li>
                         <li>
                           <strong>3. Translate Back:</strong> <span className="font-mono">(6 + 1, 6 + 2) = (7, 8)</span>
                         </li>
                       </ul>
                       <p className="text-lg leading-relaxed mt-3 font-bold text-blue-600 dark:text-blue-400">Result: P'(7, 8)</p>
                     </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Center of Dilation (Not Origin)</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <NonOriginDilationAnimation />
                        
                         {/* --- Caption Updated ($ Removed) --- */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Points move relative to the center C. The distance CA' = k * CA.
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
                                        const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${ // Base font-mono removed
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
                                                {/* Apply mono font only to coordinate options */}
                                                {option.includes('(') ? <span className='font-mono'>{option}</span> : option}
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
                                <div className="text-3xl mb-4">🎯</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You found the anchor point!' : 'Great job!'}
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
            slideId="dilations-center"
            slideTitle="Dilations: Center"
            moduleId="performing-transformations"
            submoduleId="dilations" // Assuming this belongs to dilations submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}