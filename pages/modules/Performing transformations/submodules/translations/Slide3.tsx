import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
// --- REMOVED THE IMPORT ---

// --- DEFINE THE ANIMATION COMPONENT INSIDE OR BEFORE THE MAIN COMPONENT ---
const CountingTranslationAnimation: React.FC = () => {
  const svgWidth = 500;
  const svgHeight = 350;
  const padding = 20;

  // Coordinate system for points: assuming (0,0) is center, 20px per unit
  const scale = 20;
  const offsetX = svgWidth / 2;
  const offsetY = svgHeight / 2;

  // Define pre-image (blue) triangle vertices (A, B, C)
  // Let's use the example from the slide: Top vertex at (3,2) -> (-3,-1)
  const A = { x: 3, y: 2 }; // Top vertex
  const B = { x: 1, y: 0 };
  const C = { x: 5, y: 0 };

  // Define image (green) triangle vertices (A', B', C')
  // Translation: -6 in x, -3 in y
  const A_prime = { x: A.x - 6, y: A.y - 3 }; // (-3, -1)
  const B_prime = { x: B.x - 6, y: B.y - 3 }; // (-5, -3)
  const C_prime = { x: C.x - 6, y: C.y - 3 }; // (-1, -3)

  // Function to convert coordinate plane points to SVG points
  const toSvg = (p: { x: number; y: number }) => ({
    x: offsetX + p.x * scale,
    y: offsetY - p.y * scale, // SVG y-axis is inverted
  });

  const svgA = toSvg(A);
  const svgA_prime = toSvg(A_prime);
  const svgB = toSvg(B);
  const svgC = toSvg(C);
  const svgB_prime = toSvg(B_prime);
  const svgC_prime = toSvg(C_prime);

  // Intermediate point for horizontal then vertical movement
  const svgIntermediate = { x: svgA_prime.x, y: svgA.y }; // From A to (A_prime.x, A.y)

  const animationDuration = 1.0;
  const delayBetweenSteps = 0.8;

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* --- Grid Lines (simplified) --- */}
        {Array.from({ length: Math.floor(svgWidth / scale) }).map((_, i) => {
          const x = i * scale;
          return x % (scale * 5) === 0 ? ( // Every 5 units, darker line
            <line key={`vx-${i}`} x1={x} y1={0} x2={x} y2={svgHeight} stroke="#666" strokeWidth="0.5" />
          ) : (
            <line key={`lx-${i}`} x1={x} y1={0} x2={x} y2={svgHeight} stroke="#999" strokeWidth="0.2" />
          );
        })}
        {Array.from({ length: Math.floor(svgHeight / scale) }).map((_, i) => {
          const y = i * scale;
          return y % (scale * 5) === 0 ? ( // Every 5 units, darker line
            <line key={`hy-${i}`} x1={0} y1={y} x2={svgWidth} y2={y} stroke="#666" strokeWidth="0.5" />
          ) : (
            <line key={`ly-${i}`} x1={0} y1={y} x2={svgWidth} y2={y} stroke="#999" strokeWidth="0.2" />
          );
        })}
        
        {/* --- Axes --- */}
        <line x1={0} y1={offsetY} x2={svgWidth} y2={offsetY} stroke="white" strokeWidth="1.5" /> {/* x-axis */}
        <line x1={offsetX} y1={0} x2={offsetX} y2={svgHeight} stroke="white" strokeWidth="1.5" /> {/* y-axis */}
        <text x={svgWidth - 10} y={offsetY + 15} textAnchor="end" className="fill-slate-300 text-xs">x</text>
        <text x={offsetX - 15} y={10} textAnchor="start" className="fill-slate-300 text-xs">y</text>
        <circle cx={offsetX} cy={offsetY} r={3} fill="white" /> {/* Origin */}

        {/* --- Pre-image (Blue Triangle) --- */}
        <motion.polygon
          points={`${svgA.x},${svgA.y} ${svgB.x},${svgB.y} ${svgC.x},${svgC.y}`}
          className="fill-blue-600 opacity-70 stroke-blue-800 stroke-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5 }}
        />
        <text x={svgA.x + 5} y={svgA.y - 5} className="fill-blue-200 font-bold text-sm">A</text>
        <text x={svgB.x - 15} y={svgB.y + 15} className="fill-blue-200 font-bold text-sm">B</text>
        <text x={svgC.x + 5} y={svgC.y + 15} className="fill-blue-200 font-bold text-sm">C</text>


        {/* --- Image (Green Triangle) (Faint initially, then full opacity) --- */}
        <motion.polygon
          points={`${svgA_prime.x},${svgA_prime.y} ${svgB_prime.x},${svgB_prime.y} ${svgC_prime.x},${svgC_prime.y}`}
          // --- COLOR CHANGED TO GREEN FOR VISUAL DISTINCTION ---
          className="fill-green-600 opacity-30 stroke-green-800 stroke-1" 
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: animationDuration * 2 + delayBetweenSteps * 2, duration: 0.5 }}
        />
         <motion.text 
            x={svgA_prime.x + 5} y={svgA_prime.y - 5} 
            // --- COLOR CHANGED TO GREEN ---
            className="fill-green-200 font-bold text-sm" 
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ delay: animationDuration * 2 + delayBetweenSteps * 2, duration: 0.5 }}
         >A'</motion.text>
         <motion.text 
            x={svgB_prime.x - 15} y={svgB_prime.y + 15} 
            // --- COLOR CHANGED TO GREEN ---
            className="fill-green-200 font-bold text-sm" 
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ delay: animationDuration * 2 + delayBetweenSteps * 2, duration: 0.5 }}
         >B'</motion.text>
         <motion.text 
            x={svgC_prime.x + 5} y={svgC_prime.y + 15} 
             // --- COLOR CHANGED TO GREEN ---
            className="fill-green-200 font-bold text-sm"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ delay: animationDuration * 2 + delayBetweenSteps * 2, duration: 0.5 }}
         >C'</motion.text>


        {/* --- Animated Path from A to A' --- */}
        {/* Step 1: Horizontal Movement */}
        <motion.line
          x1={svgA.x} y1={svgA.y}
          x2={svgA.x} y2={svgA.y}
          animate={{ x2: svgIntermediate.x }}
          transition={{ delay: 0.5, duration: animationDuration, ease: "easeInOut" }}
          // --- COLOR CHANGED TO ORANGE ---
          stroke="orange" 
          strokeWidth="3"
          strokeDasharray="8 4"
        />
        <motion.text
          x={svgA.x + (svgIntermediate.x - svgA.x) / 2}
          y={svgA.y - 15}
          textAnchor="middle"
          // --- COLOR CHANGED TO ORANGE ---
          className="fill-orange-400 font-bold text-sm" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + animationDuration / 2, duration: 0.5 }}
        >
          -6 (Left)
        </motion.text>

        {/* Step 2: Vertical Movement */}
        <motion.line
          x1={svgIntermediate.x} y1={svgIntermediate.y}
          x2={svgIntermediate.x} y2={svgIntermediate.y}
          animate={{ y2: svgA_prime.y }}
          transition={{ delay: 0.5 + animationDuration + delayBetweenSteps, duration: animationDuration, ease: "easeInOut" }}
           // --- COLOR CHANGED TO CYAN ---
          stroke="cyan"
          strokeWidth="3"
          strokeDasharray="8 4"
        />
        <motion.text
          x={svgIntermediate.x + 25} // Offset text to the right
          y={svgIntermediate.y + (svgA_prime.y - svgIntermediate.y) / 2}
          textAnchor="middle"
          // --- COLOR CHANGED TO CYAN ---
          className="fill-cyan-400 font-bold text-sm" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + animationDuration + delayBetweenSteps + animationDuration / 2, duration: 0.5 }}
        >
          -3 (Down)
        </motion.text>
      </svg>
    </div>
  );
}; // --- END OF ANIMATION COMPONENT DEFINITION ---


export default function TranslationsSlide3() {
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
      id: 'determining-translations-graph-quiz',
      conceptId: 'determining-translations',
      conceptName: 'Determining Translations',
      type: 'judging',
      description: 'Testing finding the translation rule from a graph'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  const questions: QuizQuestion[] = [
    {
      id: 'find-rule-graph-vector-q1',
      question: "Look at the animation. The blue triangle (pre-image) is translated to the green triangle (image). What is the translation vector?",
      options: [
        "<-6, -3>",
        "<6, 3>",
        "<3, 6>",
        "<-3, -6>"
      ],
      correctAnswer: "<-6, -3>",
      explanation: "Correct! The animation shows counting 6 units left (-6) and 3 units down (-3). So the vector is <-6, -3>."
    },
    {
      id: 'find-rule-graph-coord-q2',
      question: "Based on the *same* animation, what is the coordinate rule for this translation?",
       options: [
        "(x, y) → (x + 6, y + 3)",
        "(x, y) → (x - 3, y - 6)",
        "(x, y) → (x - 6, y - 3)",
        "(x, y) → (x + 3, y + 6)"
      ],
      correctAnswer: "(x, y) → (x - 6, y - 3)",
      explanation: "Correct! Since the vector is <-6, -3>, the rule is to subtract 6 from x and subtract 3 from y: (x - 6, y - 3)."
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
      interactionId: `determining-translations-graph-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'determining-translations',
      conceptName: 'Determining Translations',
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Finding the Rule (From a Graph)</h2>
            <p className="text-lg leading-relaxed">
              Finding the rule from a graph is even easier. You just have to count!
            </p>
            <p className="text-lg leading-relaxed mt-4">
              <strong>Step 1:</strong> Pick one matching vertex (corner) from the pre-image and the image. (e.g., A and A')
            </p>
            <p className="text-lg leading-relaxed mt-4">
              <strong>Step 2:</strong> Count how many units you move left or right (a).
            </p>
            <p className="text-lg leading-relaxed mt-4">
              <strong>Step 3:</strong> Count how many units you move up or down (b).
            </p>
            <p className="text-lg leading-relaxed mt-4">
              <strong>Step 4:</strong> Write your rule as &lt;a, b&gt;.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
               <p className="text-lg">
                <strong>Remember:</strong> Right is positive x (+), Left is negative x (-). Up is positive y (+), Down is negative y (-).
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Watch Out! ⚠️ Common Mistakes</h3>
            <ul className="mt-4 space-y-2 text-lg list-disc list-inside text-slate-700 dark:text-slate-300">
              <li>
                <strong>Sign Errors:</strong> Remember, Left/Down are <strong>negative</strong> (-), Right/Up are <strong>positive</strong> (+).
              </li>
              <li>
                <strong>Mixing Up X and Y:</strong> The <strong>first</strong> number in the vector &lt;a, b&gt; is always the <strong>horizontal</strong> (left/right) change. The <strong>second</strong> is the <strong>vertical</strong> (up/down) change.
              </li>
              <li>
                <strong>Counting from the Wrong Point:</strong> Always count from the <strong>pre-image</strong> (start) to the <strong>image</strong> (end).
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Finding the Rule by Counting</h3>
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <CountingTranslationAnimation /> 
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              From the top vertex, we count 6 units LEFT (-6) and 3 units DOWN (-3). The rule is &lt;-6, -3&gt;.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
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
                      ? 'bg-blue-500'
                      : questionsAnswered[index]
                      ? 'bg-blue-300 dark:bg-blue-800'
                      : 'bg-slate-300 dark:bg-slate-600'
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
                    
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-slate-400 bg-slate-100 dark:bg-slate-800 opacity-70'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
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
                          ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                          : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700'
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
                <div className="text-3xl mb-4">📊</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'You\'ve got a great eye for this!' : 'Great job!'}
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
      slideId="determining-translations-2"
      slideTitle="Determining Translations"
      moduleId="performing-transformations"
      submoduleId="translations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}