import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const RotatingPointAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const origin = { x: svgWidth / 2, y: svgHeight / 2 };
    const radius = 80;
    const angleStart = -30; // Starting angle in degrees (0 is right)
    const angleEnd = angleStart + 90; // Rotate 90 degrees CCW

    const pointStart = {
        x: origin.x + radius * Math.cos(angleStart * Math.PI / 180),
        y: origin.y + radius * Math.sin(angleStart * Math.PI / 180)
    };
    const pointEnd = {
        x: origin.x + radius * Math.cos(angleEnd * Math.PI / 180),
        y: origin.y + radius * Math.sin(angleEnd * Math.PI / 180)
    };

    // Path for the rotation arc
    const largeArcFlag = Math.abs(angleEnd - angleStart) <= 180 ? "0" : "1";
    const arcPath = `M ${pointStart.x} ${pointStart.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${pointEnd.x} ${pointEnd.y}`;

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
                           <mpath href="#rotationArcPath"/>
                        </animateMotion>
                    </path>
                    {/* Invisible path for motion */}
                     <path id="rotationArcPath" d={arcPath} fill="none" stroke="none" />
                </motion.g>


                {/* Start Point P */}
                <motion.circle
                    cx={pointStart.x}
                    cy={pointStart.y}
                    r={6}
                    className="fill-blue-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                />
                <text x={pointStart.x + 10} y={pointStart.y + 5} className="fill-blue-300 text-sm font-semibold">P(x, y)</text>

                 {/* End Point P' (Fades in) */}
                 <motion.circle
                    cx={pointEnd.x}
                    cy={pointEnd.y}
                    r={6}
                    className="fill-green-500" // Using green for distinction in animation
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: delay + duration, duration: 0.3 }}
                />
                <motion.text
                    x={pointEnd.x + 10} y={pointEnd.y + 5} className="fill-green-300 text-sm font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + duration, duration: 0.3 }}
                >P'(-y, x)</motion.text>

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


export default function RotationsSlide1() {
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
          id: 'rotating-points-quiz',
          conceptId: 'rotating-points-basics',
          conceptName: 'Rotating Points Basics',
          type: 'judging',
          description: 'Testing understanding of the components of a rotation'
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
          id: 'rotation-basics-q1-center',
          question: 'What is the "fixed point" that a figure turns around?',
          options: [
            'The origin',
            'The vertex',
            'The center of rotation',
            'The angle of rotation'
          ],
          correctAnswer: 'The center of rotation',
          explanation: "Correct! The center of rotation is the single point that does not move. It's the 'pin' that the shape turns around."
        },
        { // --- ADDED SECOND QUESTION (Rule Application) ---
          id: 'rotation-rule-180-q2',
          question: 'What are the coordinates of the point (4, 2) after a 180° rotation around the origin?',
          options: [
             "(-4, 2)",
             "(4, -2)",
             "(-4, -2)",
             "(2, 4)"
          ],
          correctAnswer: "(-4, -2)",
          explanation: "Correct! The rule for 180° is (x, y) → (-x, -y). So, both coordinates change their sign: (4, 2) becomes (-4, -2)."
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
        interactionId: `rotating-points-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
        value: answerText,
        isCorrect,
        timestamp: Date.now(),
        conceptId: 'rotating-points-basics',
        conceptName: 'Rotating Points Basics',
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
                    {/* --- CARD 1 --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">How to "Turn" a Point</h2>
                        <p className="text-lg leading-relaxed">
                            A <strong>Rotation</strong> is the formal name for a "turn."
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            Unlike a slide, a rotation changes the <strong>orientation</strong> (which way the shape is facing).
                        </p>
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                           Think: The hands on a clock ⏰ or a spinning Ferris wheel 🎡.
                         </em>
                    </div>

                    {/* --- CARD 2 (UPDATED with Rules) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">What You Need to Rotate</h3>
                        <p className="text-lg leading-relaxed">
                            To perform any rotation, you must be given three key pieces of information:
                        </p>
                         {/* --- List Updated (Colors, Symbols) --- */}
                        <ul className="mt-4 space-y-3 text-lg">
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">1.</span>
                                <span><strong>Center of Rotation:</strong> The fixed point you are turning *around*. (Often the origin (0,0)).</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">2.</span>
                                <span><strong>Angle of Rotation:</strong> How far to turn (e.g., 90°, 180°, 270°).</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">3.</span>
                                <span><strong>Direction:</strong> Clockwise ↻ or Counter-clockwise ↺.</span>
                            </li>
                        </ul>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <p className="text-lg">
                                <strong>Key Rule:</strong> In math, <strong>counter-clockwise ↺</strong> is the default, positive direction!
                            </p>
                        </div>
                        
                        {/* --- ADDED COMMON RULES SECTION --- */}
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                           <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Common Rotation Rules (around origin 0,0)</h4>
                            <ul className="list-disc list-inside mt-2 text-lg space-y-1 font-mono text-slate-700 dark:text-slate-300">
                               <li><strong>90° CCW (↺):</strong> (x, y) → (-y, x)</li>
                               <li><strong>180° (↻ or ↺):</strong> (x, y) → (-x, -y)</li>
                               <li><strong>270° CCW (↺) / 90° CW (↻):</strong> (x, y) → (y, -x)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Rotation Example (90° CCW)</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <RotatingPointAnimation />
                        
                        {/* --- Caption Updated --- */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            This animation shows a 90° counter-clockwise rotation of point P to P' around the origin (0,0).
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
                                <div className="text-3xl mb-4">🔄</div>
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You\'ve mastered the basics!' : 'Great job!'}
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
            slideId="rotating-points"
            slideTitle="Rotating Points"
            moduleId="performing-transformations"
            submoduleId="rotations" // Assuming this belongs to a rotations submodule
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}