import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const VectorAdditionAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 250;
    const scale = 20;
    const offsetX = 50;
    const offsetY = svgHeight - 50; // Origin lower-left

    // Points P, P', P''
    const P = { x: 2, y: 2 };
    const vector1 = { a: 4, b: 1 }; // Example: <4, 1>
    const P_prime = { x: P.x + vector1.a, y: P.y + vector1.b }; // (6, 3)
    const vector2 = { a: 2, b: 6 }; // Example: <2, 6>
    const P_double_prime = { x: P_prime.x + vector2.a, y: P_prime.y + vector2.b }; // (8, 9)

    // Resultant vector
    const resultantVector = { a: vector1.a + vector2.a, b: vector1.b + vector2.b }; // <6, 7>

    const toSvg = (p: { x: number; y: number }) => ({
        x: offsetX + p.x * scale,
        y: offsetY - p.y * scale, // SVG y is inverted
    });

    const svgP = toSvg(P);
    const svgP_prime = toSvg(P_prime);
    const svgP_double_prime = toSvg(P_double_prime);

    const duration = 0.8;
    const delay1 = 0.5;
    const delay2 = delay1 + duration + 0.3;
    const delay3 = delay2 + duration + 0.5;

    const ArrowHead = ({ id, colorClass = "stroke-current" }: { id: string, colorClass?: string }) => (
        <marker
            id={id}
            markerWidth="10" markerHeight="7"
            refX="4" refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
        >
            <polygon points="0 0, 5 3.5, 0 7" className={colorClass} />
        </marker>
    );

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                <defs>
                    <ArrowHead id="arrowHeadOrange" colorClass="fill-orange-500" />
                    <ArrowHead id="arrowHeadCyan" colorClass="fill-cyan-500" />
                    <ArrowHead id="arrowHeadBlue" colorClass="fill-blue-500" />
                </defs>

                {/* Points */}
                <circle cx={svgP.x} cy={svgP.y} r={5} className="fill-slate-400" />
                <text x={svgP.x - 10} y={svgP.y + 15} className="fill-slate-300 text-xs">P</text>
                
                <motion.circle
                    cx={svgP_prime.x} cy={svgP_prime.y} r={5} className="fill-slate-400"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay1 + duration - 0.1 }}
                />
                <motion.text
                    x={svgP_prime.x + 10} y={svgP_prime.y - 10} className="fill-slate-300 text-xs"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay1 + duration }}
                >P'</motion.text>
               
                <motion.circle
                    cx={svgP_double_prime.x} cy={svgP_double_prime.y} r={5} className="fill-slate-400"
                     initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay2 + duration - 0.1 }}
                />
                <motion.text
                     x={svgP_double_prime.x + 5} y={svgP_double_prime.y + 15} className="fill-slate-300 text-xs"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay2 + duration }}
                 >P''</motion.text>


                {/* Vector 1 (Orange) */}
                <motion.line
                    x1={svgP.x} y1={svgP.y} x2={svgP.x} y2={svgP.y}
                    animate={{ x2: svgP_prime.x, y2: svgP_prime.y }}
                    transition={{ delay: delay1, duration: duration, ease: 'easeInOut' }}
                    className="stroke-orange-500" strokeWidth="2"
                    markerEnd="url(#arrowHeadOrange)"
                />
                <motion.text
                     x={(svgP.x + svgP_prime.x) / 2 } y={(svgP.y + svgP_prime.y) / 2 - 10} textAnchor="middle"
                     className="fill-orange-400 text-xs font-mono"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay1 + duration/2 }}
                >&lt;{vector1.a}, {vector1.b}&gt;</motion.text>

                {/* Vector 2 (Cyan) */}
                <motion.line
                    x1={svgP_prime.x} y1={svgP_prime.y} x2={svgP_prime.x} y2={svgP_prime.y}
                    animate={{ x2: svgP_double_prime.x, y2: svgP_double_prime.y }}
                    transition={{ delay: delay2, duration: duration, ease: 'easeInOut' }}
                    className="stroke-cyan-500" strokeWidth="2"
                    markerEnd="url(#arrowHeadCyan)"
                />
                 <motion.text
                     x={(svgP_prime.x + svgP_double_prime.x) / 2 + 10} y={(svgP_prime.y + svgP_double_prime.y) / 2 + 10} textAnchor="start"
                     className="fill-cyan-400 text-xs font-mono"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay2 + duration/2 }}
                 >&lt;{vector2.a}, {vector2.b}&gt;</motion.text>

                {/* Resultant Vector (Blue, thicker) */}
                <motion.line
                    x1={svgP.x} y1={svgP.y} x2={svgP.x} y2={svgP.y}
                    animate={{ x2: svgP_double_prime.x, y2: svgP_double_prime.y }}
                    transition={{ delay: delay3, duration: duration * 1.2, ease: 'circOut' }}
                    className="stroke-blue-500" strokeWidth="3"
                    markerEnd="url(#arrowHeadBlue)"
                />
                 <motion.text
                     x={(svgP.x + svgP_double_prime.x) / 2 - 10} y={(svgP.y + svgP_double_prime.y) / 2 - 15} textAnchor="end"
                     className="fill-blue-400 text-sm font-bold font-mono"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay3 + duration * 0.6 }}
                 >Result: &lt;{resultantVector.a}, {resultantVector.b}&gt;</motion.text>
            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function TranslationsSlide6() {
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
          id: 'translation-challenge-quiz',
          conceptId: 'translation-composition',
          conceptName: 'Translation Composition',
          type: 'judging',
          description: 'Testing combining multiple translations'
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
            id: 'challenge-q1',
            // --- $ SYMBOLS REMOVED ---
            question: "A shape is translated by <2, 5> and then translated *again* by <1, -3>. What single translation would have the same result?",
            options: [
                "<3, 2>",
                "<1, 8>",
                "<3, 8>",
                "<1, 2>"
            ],
            correctAnswer: "<3, 2>",
            explanation: "Correct! You just add the vectors. Horizontal: 2 + 1 = 3. Vertical: 5 + (-3) = 2. The single translation is <3, 2>."
        },
        { // --- ADDED SECOND QUESTION ---
            id: 'challenge-q2-find-missing',
             question: "A point is first translated by <2, -1>. Then, another translation is applied, resulting in a *total* translation of <5, 3>. What was the *second* translation vector?",
             options: [
                 "<3, 4>",
                 "<7, 2>",
                 "<3, 2>",
                 "<7, 4>"
             ],
             correctAnswer: "<3, 4>",
             explanation: "Correct! To find the second vector, subtract the first from the total: a = 5 - 2 = 3 and b = 3 - (-1) = 3 + 1 = 4. The second vector was <3, 4>."
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
        interactionId: `translation-challenge-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
        value: answerText,
        isCorrect,
        timestamp: Date.now(),
        conceptId: 'translation-composition',
        conceptName: 'Translation Composition',
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
                    {/* --- CARD 1 UPDATED (Analogy) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Translation Challenge Problem</h2>
                        <p className="text-lg leading-relaxed">
                            What happens when you do two translations in a row? This is called a <strong>composition</strong> of translations.
                        </p>
                         {/* --- ANALOGY ADDED --- */}
                         <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
                           Think: Taking two steps forward then three steps forward is the same as taking five steps total. 🚶➡️➡️➡️➡️➡️
                         </em>
                    </div>

                    {/* --- CARD 2 UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Just Add Them Up!</h3>
                        <p className="text-lg leading-relaxed">
                            To find the single rule for a composition of translations, you just add the horizontal parts (a) and add the vertical parts (b).
                        </p>
                        <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
                            <p className="text-lg"><strong>Problem:</strong></p>
                            {/* --- $ SYMBOLS REMOVED --- */}
                            <p className="text-lg mt-2">Translate by &lt;4, 1&gt;, then by &lt;2, 6&gt;.</p>
                            <hr className="my-3 border-slate-300 dark:border-slate-600" />
                            <p className="text-lg"><strong>Solution:</strong></p>
                            <p className="text-lg mt-2 font-mono">Horizontal: 4 + 2 = 6</p>
                            <p className="text-lg font-mono">Vertical: 1 + 6 = 7</p>
                            <p className="text-lg mt-2 font-bold">
                                {/* --- $ SYMBOLS REMOVED --- */}
                                Single Translation: &lt;6, 7&gt;
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Two Moves Become One</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <VectorAdditionAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            {/* --- $ SYMBOLS REMOVED --- */}
                            Sliding by &lt;a, b&gt; and then by &lt;c, d&gt; is the same as one big slide by &lt;a+c, b+d&gt;.
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
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // CORRECT (now blue)
                                                        : 'border-slate-400 bg-slate-100 dark:bg-slate-800 opacity-70' // INCORRECT (now slate/neutral)
                                                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // Selected (no feedback)
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
                                                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700' // Correct (blue)
                                                    : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700' // Incorrect (slate)
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
                                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Challenge Complete!</div>
                                <div className="text-lg text-slate-600 dark:text-slate-400">
                                    You scored {score} out of {questions.length}
                                </div>
                                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                                    {score === questions.length ? 'You\'re a composition whiz!' : 'Great job!'}
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
            slideId="translation-challenge"
            slideTitle="Translation Challenge Problem"
            moduleId="performing-transformations"
            submoduleId="translations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}