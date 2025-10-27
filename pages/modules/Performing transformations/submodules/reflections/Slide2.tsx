import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const AxisReflectionAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 300; // Increased height
    const origin = { x: svgWidth / 2, y: svgHeight / 2 };
    const scale = 25;
    const P = { x: 3, y: 2 };

    // Reflections
    const P_x_axis = { x: P.x, y: -P.y }; // (3, -2)
    const P_y_axis = { x: -P.x, y: P.y }; // (-3, 2)

    const toSvg = (p: { x: number; y: number }) => ({
        x: origin.x + p.x * scale,
        y: origin.y - p.y * scale, // SVG y is inverted
    });

    const svgP = toSvg(P);
    const svgP_x = toSvg(P_x_axis);
    const svgP_y = toSvg(P_y_axis);

    const duration = 1.0;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Axes */}
                <line x1={0} y1={origin.y} x2={svgWidth} y2={origin.y} className="stroke-blue-500" strokeWidth="2" /> {/* X-Axis */}
                <line x1={origin.x} y1={0} x2={origin.x} y2={svgHeight} className="stroke-blue-500" strokeWidth="2" /> {/* Y-Axis */}
                <circle cx={origin.x} cy={origin.y} r={4} className="fill-slate-400" />
                <text x={svgWidth - 10} y={origin.y + 15} className="fill-blue-400 text-xs font-semibold">x-axis</text>
                <text x={origin.x + 5} y={15} className="fill-blue-400 text-xs font-semibold">y-axis</text>

                {/* Point P */}
                <circle cx={svgP.x} cy={svgP.y} r={6} className="fill-blue-500" />
                <text x={svgP.x + 8} y={svgP.y + 5} className="fill-blue-300 text-sm font-semibold">P({P.x},{P.y})</text>

                {/* Reflection over x-axis */}
                <motion.line
                    x1={svgP.x} y1={svgP.y} x2={svgP.x} y2={svgP.y} // Start collapsed
                    animate={{ y2: svgP_x.y }} // Animate vertical line
                    transition={{ delay: delay, duration: duration }}
                    className="stroke-orange-400" strokeWidth="1.5" strokeDasharray="4 4"
                />
                <motion.circle cx={svgP_x.x} cy={svgP_x.y} r={6} className="fill-orange-500" // Orange for x-reflection
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: delay + duration, duration: 0.3 }} />
                <motion.text x={svgP_x.x + 8} y={svgP_x.y + 5} className="fill-orange-300 text-sm font-semibold"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration }} >P'({P_x_axis.x},{P_x_axis.y})</motion.text>
                 <motion.text x={svgP_x.x + 8} y={svgP_x.y + 18} className="fill-orange-400 text-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration + 0.1 }} >(over x-axis)</motion.text>


                {/* Reflection over y-axis */}
                <motion.line
                     x1={svgP.x} y1={svgP.y} x2={svgP.x} y2={svgP.y} // Start collapsed
                     animate={{ x2: svgP_y.x }} // Animate horizontal line
                     transition={{ delay: delay + duration + 0.5, duration: duration }}
                     className="stroke-green-400" strokeWidth="1.5" strokeDasharray="4 4"
                 />
                 <motion.circle cx={svgP_y.x} cy={svgP_y.y} r={6} className="fill-green-500" // Green for y-reflection
                     initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: delay + duration*2 + 0.5, duration: 0.3 }} />
                 <motion.text x={svgP_y.x - 8} y={svgP_y.y + 5} textAnchor='end' className="fill-green-300 text-sm font-semibold"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.5 }} >P''({P_y_axis.x},{P_y_axis.y})</motion.text>
                  <motion.text x={svgP_y.x - 8} y={svgP_y.y + 18} textAnchor='end' className="fill-green-400 text-xs"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + duration*2 + 0.6 }} >(over y-axis)</motion.text>

            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---

export default function ReflectionsSlide2() {
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
        id: 'determining-reflections-axis-quiz',
        conceptId: 'determining-reflections-axis',
        conceptName: 'Determining Reflections (Axis & y=x)', // Updated name
        type: 'judging',
        description: 'Testing finding reflection lines (x-axis, y-axis, y=x)' // Updated description
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
            id: 'find-line-x-axis-q1',
            // --- $ SYMBOLS REMOVED ---
            question: "Pre-image A(2, 3) is reflected to image A'(2, -3). What is the line of reflection?",
            options: [
                'The x-axis',
                'The y-axis',
                'The line y = x',
                'The line x = 2'
            ],
            correctAnswer: 'The x-axis',
            explanation: "Correct! The x-coordinate (2) stayed the same, but the y-coordinate (3) flipped its sign to (-3). This is a 'flip' over the x-axis, where the rule is (x, y) → (x, -y)."
        },
        {
            id: 'find-line-y-axis-q2',
             // --- $ SYMBOLS REMOVED ---
            question: "Pre-image B(-4, 1) is reflected to image B'(4, 1). What is the line of reflection?",
            options: [
                'The x-axis',
                'The y-axis',
                'The line y = 1',
                'The line x = 0' // Kept this option as it's the same as y-axis
            ],
            correctAnswer: 'The y-axis',
            explanation: "Correct! The y-coordinate (1) stayed the same, but the x-coordinate (-4) flipped its sign to (4). This is a 'flip' over the y-axis, where the rule is (x, y) → (-x, y)."
        },
        { // --- ADDED THIRD QUESTION ---
            id: 'find-line-y-equals-x-q3',
            question: "If point Q(-1, 4) is reflected across the line y = x, what are the coordinates of Q'?",
             options: [
                 "Q'(1, 4)",
                 "Q'(1, -4)",
                 "Q'(4, -1)",
                 "Q'(-4, 1)"
             ],
             correctAnswer: "Q'(4, -1)",
             explanation: "Correct! Reflecting across the line y = x uses the rule (x, y) → (y, x). You simply swap the coordinates: (-1, 4) becomes (4, -1)."
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
            interactionId: `determining-reflections-axis-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
            value: answerText, isCorrect, timestamp: Date.now(),
            conceptId: 'determining-reflections-axis', conceptName: 'Determining Reflections (Axis & y=x)',
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
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Finding the Mirror Line</h2>
                        <p className="text-lg leading-relaxed">
                            We can find the line of reflection by looking at what coordinates change and what coordinates stay the same.
                        </p>
                    </div>

                    {/* --- RULE 1 UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Rule 1: Reflecting over the x-axis</h3>
                        <p className="text-lg leading-relaxed">
                            Pre-image P(3, 2) becomes Image P'(3, -2).
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            <strong>Observation:</strong> The x-coordinate stays the same. The y-coordinate flips its sign.
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <p className="text-lg font-mono text-center font-bold text-slate-800 dark:text-slate-100">Rule: (x, y) → (x, -y)</p>
                        </div>
                    </div>

                     {/* --- RULE 2 UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Rule 2: Reflecting over the y-axis</h3>
                        <p className="text-lg leading-relaxed">
                            Pre-image P(3, 2) becomes Image P'(-3, 2).
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            <strong>Observation:</strong> The y-coordinate stays the same. The x-coordinate flips its sign.
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                             <p className="text-lg font-mono text-center font-bold text-slate-800 dark:text-slate-100">Rule: (x, y) → (-x, y)</p>
                        </div>
                    </div>

                    {/* --- NEW CARD: RULE 3 (y=x) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Rule 3: Reflecting over the line y = x</h3>
                        <p className="text-lg leading-relaxed">
                            Pre-image P(3, 2) becomes Image P'(2, 3).
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            <strong>Observation:</strong> The x and y coordinates simply swap places.
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                             <p className="text-lg font-mono text-center font-bold text-slate-800 dark:text-slate-100">Rule: (x, y) → (y, x)</p>
                        </div>
                    </div>

                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Reflecting P(3, 2) over an Axis</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <AxisReflectionAnimation />
                        
                         {/* --- Caption Updated ($ Removed) --- */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            Reflecting P(3, 2) over the x-axis gives P'(3, -2). Reflecting P(3, 2) over the y-axis gives P''(-3, 2).
                        </p>
                         {/* --- Visual for y=x (Static for now, could be animated later) --- */}
                         <div className="flex justify-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <img
                                src="https://via.placeholder.com/300x150.png?text=P(3,2)+reflects+to+P'(2,3)+over+y=x"
                                alt="Point P(3,2) reflecting over the dashed line y=x to P'(2,3)"
                                className="max-w-full h-auto rounded-lg shadow-md"
                                style={{ maxWidth: '300px' }}
                            />
                        </div>
                         <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 text-center">
                             Reflecting P(3, 2) over the line y=x gives P'(2, 3).
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
                             <div className="space-y-3">
                                {questions[currentQuestionIndex].options.map((option, idx) => {
                                    const disabled = showFeedback;
                                    const selected = selectedAnswer === option;
                                    const correct = option === questions[currentQuestionIndex].correctAnswer;
                                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${ // Removed font-mono
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
                                           {option.includes('(') || option.includes('=') ? <span className='font-mono'>{option}</span> : option}
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
                             <div className="text-3xl mb-4">✨</div> {/* Updated Emoji */}
                            <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                            <div className="text-lg text-slate-600 dark:text-slate-400">
                              You scored {score} out of {questions.length}
                            </div>
                            <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                              {score === questions.length ? "You've got the axis & y=x rules down!" : 'Great job!'}
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
            slideId="determining-reflections" // Keep slideId consistent? Or update?
            slideTitle="Determining Reflections"
            moduleId="performing-transformations"
            submoduleId="reflections" // Assuming this belongs to reflections submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}