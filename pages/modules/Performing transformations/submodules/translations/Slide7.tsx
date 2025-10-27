import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const TranslationPropertiesAnimation: React.FC = () => {
    const svgWidth = 400;
    const svgHeight = 200;

    // Define the "F" shape points (pre-image)
    const fShapePoints = "50,50 100,50 100,80 70,80 70,110 100,110 100,140 50,140";
    // Define the translation vector
    const translateX = 180;
    const translateY = 20;

    // Calculate the translated points string
    const translatedPoints = fShapePoints.split(' ').map(pair => {
        const [x, y] = pair.split(',').map(Number);
        return `${x + translateX},${y + translateY}`;
    }).join(' ');

    const duration = 1.5;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Pre-image (Blue F) */}
                <motion.polygon
                    points={fShapePoints}
                    className="fill-blue-600 opacity-70 stroke-blue-800 stroke-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 0.5 }}
                />
                 {/* Angle marker (example) */}
                 <motion.path d="M 100 80 L 70 80 L 70 110" fill="none" stroke="white" strokeWidth="1.5"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}/>


                {/* Animated Vector Arrow (subtle) */}
                 <motion.line
                    x1={75} y1={95} x2={75} y2={95} // Start near center of pre-image F
                    animate={{ x2: 75 + translateX, y2: 95 + translateY }} // End near center of image F
                    transition={{ delay: delay, duration: duration, ease: 'easeInOut' }}
                    stroke="#FFA500" // Orange
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrowHeadOrange)"
                />
                 {/* Arrowhead Def */}
                 <defs>
                     <marker id="arrowHeadOrange" markerWidth="8" markerHeight="5" refX="3" refY="2.5" orient="auto" markerUnits="strokeWidth">
                         <polygon points="0 0, 4 2.5, 0 5" fill="#FFA500" />
                     </marker>
                 </defs>


                {/* Image (Green F - will use blue to match palette later, using green for clarity now) */}
                 <motion.polygon
                    points={fShapePoints} // Start at original position
                    className="fill-green-600 opacity-70 stroke-green-800 stroke-1"
                    initial={{ opacity: 0 }}
                    animate={{
                        points: translatedPoints, // Animate the points attribute
                        opacity: 0.7
                    }}
                    transition={{ delay: delay, duration: duration, ease: 'easeInOut' }}
                 />
                 {/* Corresponding angle marker - moves with the shape */}
                  <motion.path d="M 100 80 L 70 80 L 70 110" fill="none" stroke="white" strokeWidth="1.5"
                     initial={{ opacity: 0, x: 0, y: 0 }}
                     animate={{ opacity: 1, x: translateX, y: translateY }}
                     transition={{ delay: delay, duration: duration, ease: 'easeInOut' }}/>


                {/* Labels */}
                <text x="75" y="40" textAnchor="middle" className="fill-blue-200 text-xs font-semibold">Pre-Image</text>
                 <motion.text
                    x={75 + translateX} y={40} textAnchor="middle" className="fill-green-200 text-xs font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + duration }}
                 >Image</motion.text>
                 <motion.text
                     x={(75 + 75 + translateX)/2} y={(95 + 95 + translateY)/2 - 10} textAnchor="middle"
                     className="fill-orange-400 text-xs font-mono"
                     initial={{opacity: 0}}
                     animate={{opacity: 1}}
                     transition={{delay: delay + duration/2}}
                 >Slide</motion.text>


            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function TranslationsSlide7() {
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
        id: 'translation-properties-quiz',
        conceptId: 'translation-properties',
        conceptName: 'Properties of Translations',
        type: 'judging',
        description: 'Testing understanding of what translations preserve'
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
        id: 'properties-q1-change',
        question: "Which of the following is *NOT* preserved under a translation?",
        options: [
          'Side Lengths',
          'Angle Measures',
          'Orientation (which way it faces)',
          'Location'
        ],
        correctAnswer: 'Location',
        explanation: "Correct! The whole point of a translation is to change the location! Everything else (size, shape, parallelism, and orientation) stays exactly the same."
      },
      { // --- ADDED SECOND QUESTION ---
         id: 'properties-q2-parallel',
         question: "If two sides of a shape are parallel *before* a translation, what is true about those sides *after* the translation?",
          options: [
              "They might intersect",
              "They will be perpendicular",
              "They will still be parallel",
              "One side might disappear"
          ],
          correctAnswer: "They will still be parallel",
          explanation: "Correct! Translations preserve parallelism. If lines don't cross before the slide, they won't cross after the slide either."
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
        interactionId: `translation-properties-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
        value: answerText,
        isCorrect,
        timestamp: Date.now(),
        conceptId: 'translation-properties',
        conceptName: 'Properties of Translations',
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Content */}
                <div className="space-y-6">
                    {/* --- CARD 1 UPDATED ($ Removed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Properties of Translations</h2>
                        <p className="text-lg leading-relaxed">
                            Let's summarize everything we know about translations. A translation is a <strong>rigid transformation</strong> (or isometry).
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            {/* --- SYMBOL UPDATED --- */}
                            This means the image is <strong>congruent</strong> (≅) to the pre-image.
                        </p>
                    </div>

                    {/* --- CARD 2 UPDATED (Colors Fixed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">What is Preserved? (Stays the same)</h3>
                        <ul className="mt-4 space-y-2 text-lg">
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">✓</span> {/* Color */}
                                <span><strong>Distance (Side Lengths):</strong> The sides of the image are the same length as the pre-image.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">✓</span> {/* Color */}
                                <span><strong>Angle Measures:</strong> The angles of the image are the same as the pre-image.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">✓</span> {/* Color */}
                                <span><strong>Parallelism:</strong> Lines that were parallel in the pre-image are still parallel in the image.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">✓</span> {/* Color */}
                                <span><strong>Orientation:</strong> The shape does *not* flip or turn. It still faces the same way.</span>
                            </li>
                        </ul>
                    </div>

                    {/* --- CARD 3 UPDATED (Colors & Symbols Fixed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                         {/* --- Heading color changed to match theme --- */}
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">What Changes?</h3>
                        <ul className="mt-4 space-y-2 text-lg">
                            <li className="flex items-start">
                                <span className="font-bold text-blue-500 mr-2">✗</span> {/* Color */}
                                {/* --- SYMBOLS UPDATED --- */}
                                <span><strong>Location:</strong> The position of the shape on the plane changes (unless the vector is &lt;0, 0&gt;!).</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- ANIMATION CARD --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Same Shape, Same Size, Same Direction</h3>
                        
                        {/* --- USE THE ANIMATION COMPONENT --- */}
                        <TranslationPropertiesAnimation />
                        
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            A translation just "slides" the shape. Nothing else changes.
                        </p>
                    </div>

                    {/* --- KNOWLEDGE CHECK CARD (Colors Fixed) --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                       {/* ... Keep the entire quiz section exactly as it was ... */}
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
                            <div className="text-3xl mb-4">✅</div>
                            <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                            <div className="text-lg text-slate-600 dark:text-slate-400">
                              You scored {score} out of {questions.length}
                            </div>
                            <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                              {score === questions.length ? 'You know your properties!' : 'Great job!'}
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
            slideId="properties-of-translations"
            slideTitle="Properties of Translations"
            moduleId="performing-transformations"
            submoduleId="translations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}