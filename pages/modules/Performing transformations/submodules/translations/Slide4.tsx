import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- Simple Animation Component Defined Inside ---
const TranslatingShapeAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 250;
  const scale = 30;
  const offsetX = 80;
  const offsetY = 80;

  // Pre-image triangle vertices
  const A = { x: 1, y: 3 };
  const B = { x: 4, y: 1 };
  const C = { x: 1, y: 1 };

  // Translation vector <a, b>
  const vector = { a: 5, b: 2 };

  // Image triangle vertices
  const A_prime = { x: A.x + vector.a, y: A.y + vector.b };
  const B_prime = { x: B.x + vector.a, y: B.y + vector.b };
  const C_prime = { x: C.x + vector.a, y: C.y + vector.b };

  const toSvg = (p: { x: number; y: number }) => ({
    x: offsetX + p.x * scale,
    y: offsetY + (5 - p.y) * scale, // Invert Y and adjust origin
  });

  const svgA = toSvg(A);
  const svgB = toSvg(B);
  const svgC = toSvg(C);
  const svgA_prime = toSvg(A_prime);
  const svgB_prime = toSvg(B_prime);
  const svgC_prime = toSvg(C_prime);

  const duration = 1.0;
  const delay = 0.5;

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Pre-image Triangle */}
        <motion.polygon
          points={`${svgA.x},${svgA.y} ${svgB.x},${svgB.y} ${svgC.x},${svgC.y}`}
          className="fill-blue-600 opacity-70 stroke-blue-800 stroke-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5 }}
        />
        <text x={svgA.x - 5} y={svgA.y - 10} className="fill-blue-200 font-bold text-sm">A</text>
        <text x={svgB.x + 5} y={svgB.y + 15} className="fill-blue-200 font-bold text-sm">B</text>
        <text x={svgC.x - 15} y={svgC.y + 15} className="fill-blue-200 font-bold text-sm">C</text>

        {/* Animated Vectors */}
        {[svgA, svgB, svgC].map((p, i) => {
          const p_prime = [svgA_prime, svgB_prime, svgC_prime][i];
          return (
            <motion.line
              key={`vec-${i}`}
              x1={p.x} y1={p.y} x2={p.x} y2={p.y}
              animate={{ x2: p_prime.x, y2: p_prime.y }}
              transition={{ delay: delay + i * 0.2, duration: duration, ease: 'easeInOut' }}
              stroke="#FF8C00" // Orange color for vector
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Animated Image Vertices */}
        {[svgA_prime, svgB_prime, svgC_prime].map((p, i) => (
          <motion.circle
            key={`p-prime-${i}`}
            r={5}
            className="fill-green-500" // Using green for image points
            initial={{ cx: [svgA, svgB, svgC][i].x, cy: [svgA, svgB, svgC][i].y, opacity: 0 }}
            animate={{ cx: p.x, cy: p.y, opacity: 1 }}
            transition={{ delay: delay + i * 0.2, duration: duration, ease: 'easeInOut' }}
          />
        ))}
         <motion.text
           x={svgA_prime.x - 5} y={svgA_prime.y - 10} className="fill-green-200 font-bold text-sm"
           initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: delay + duration}}
         >A'</motion.text>
         <motion.text
            x={svgB_prime.x + 5} y={svgB_prime.y + 15} className="fill-green-200 font-bold text-sm"
            initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: delay + 0.2 + duration}}
          >B'</motion.text>
          <motion.text
            x={svgC_prime.x - 15} y={svgC_prime.y + 15} className="fill-green-200 font-bold text-sm"
            initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: delay + 0.4 + duration}}
          >C'</motion.text>


        {/* Image Triangle (Reconnect) */}
        <motion.polygon
          points={`${svgA_prime.x},${svgA_prime.y} ${svgB_prime.x},${svgB_prime.y} ${svgC_prime.x},${svgC_prime.y}`}
          className="fill-green-600 opacity-70 stroke-green-800 stroke-1" // Use green for image
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ delay: delay + duration + 0.5, duration: 1 }} // Appears after points land
        />
      </svg>
    </div>
  );
}; // --- END OF ANIMATION COMPONENT DEFINITION ---


export default function TranslationsSlide4() {
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
      id: 'translating-shapes-concept-quiz',
      conceptId: 'translating-shapes',
      conceptName: 'Translating Shapes',
      type: 'judging',
      description: 'Testing the concept of translating shapes'
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
      id: 'shape-translation-concept-q1',
      question: "What is the key to translating a polygon (like a triangle or square)?",
      options: [
        'You only need to translate one point.',
        'You must translate every single point on the shape.',
        'You must translate each of its vertices (corners) and then reconnect them.',
        'You must find the center of the shape first.'
      ],
      correctAnswer: 'You must translate each of its vertices (corners) and then reconnect them.',
      explanation: "Correct! You don't need to move every single point. Just move the vertices using the rule, and then draw the lines to connect them."
    },
    { // --- ADDED SECOND QUESTION ---
      id: 'shape-translation-apply-q2',
      question: "Triangle ABC has A(1, 2), B(3, 0), C(4, 5). Translate it using (x, y) → (x - 4, y + 1). What are the coordinates of A'?",
      options: [
        "A'(-3, 3)",
        "A'(5, 3)",
        "A'(-3, 1)",
        "A'(5, 1)"
      ],
      correctAnswer: "A'(-3, 3)",
      explanation: "Correct! Apply the rule to A(1, 2): x' = 1 - 4 = -3, and y' = 2 + 1 = 3. So A' is at (-3, 3)."
    }
  ];
  
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
      interactionId: `translating-shapes-concept-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'translating-shapes',
      conceptName: 'Translating Shapes',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Translating a Whole Shape</h2>
            <p className="text-lg leading-relaxed">
              How do you translate an entire polygon, like a triangle?
            </p>
            <p className="text-lg leading-relaxed mt-4">
              It's simple: you don't move the *shape*, you move its <strong>vertices</strong> (corners)!
            </p>
            {/* --- ANALOGY ADDED --- */}
            <em className="text-lg text-slate-500 dark:text-slate-400 block mt-3">
              Think: Moving a picture frame. You only need to move the corners. 🖼️
            </em>
          </div>

           {/* --- CARD 2 UPDATED (Colors & Symbols) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The 3-Step Process</h3>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">1.</span> {/* Color */}
                <span>List the coordinates of the pre-image's vertices (e.g., A, B, C).</span> {/* Symbols */}
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">2.</span> {/* Color */}
                <span>Apply the translation rule to *each vertex* to find the new coordinates (A', B', C').</span> {/* Symbols */}
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">3.</span> {/* Color */}
                <span>Plot the new vertices and reconnect them to draw the image.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Move the Vertices, Reconnect</h3>
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <TranslatingShapeAnimation />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Each vertex (A, B, C) moves by the *same rule* to create the new image (A', B', C').
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
                      ? 'bg-blue-300 dark:bg-blue-800' // Answered (REMOVED GREEN)
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
                    
                    // --- UPDATED CLASSNAME LOGIC TO REMOVE RED/GREEN ---
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
                      // --- UPDATED FEEDBACK BOX COLORS (REMOVED RED/GREEN) ---
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
               // --- Quiz Complete State ---
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-3xl mb-4">🧩</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You understand the core concept!' : 'Great job!'}
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
      slideId="translating-shapes-1"
      slideTitle="Translating Shapes"
      moduleId="performing-transformations"
      submoduleId="translations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}