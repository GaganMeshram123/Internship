import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const TranslatingShapeExampleAnimation: React.FC = () => {
    const svgWidth = 500;
    const svgHeight = 350;
    const scale = 25; // Pixels per unit
    const offsetX = 150; // Shift origin a bit right
    const offsetY = svgHeight - 80; // Shift origin down

    // Pre-image vertices from example
    const A = { x: 2, y: 2 };
    const B = { x: 5, y: 0 };
    const C = { x: 4, y: -1 };

    // Translation vector from example
    const vector = { a: -5, b: 3 };

    // Image vertices calculated
    const A_prime = { x: A.x + vector.a, y: A.y + vector.b }; // (-3, 5)
    const B_prime = { x: B.x + vector.a, y: B.y + vector.b }; // (0, 3)
    const C_prime = { x: C.x + vector.a, y: C.y + vector.b }; // (-1, 2)

    const toSvg = (p: { x: number; y: number }) => ({
        x: offsetX + p.x * scale,
        y: offsetY - p.y * scale, // SVG y is inverted
    });

    const svgA = toSvg(A);
    const svgB = toSvg(B);
    const svgC = toSvg(C);
    const svgA_prime = toSvg(A_prime);
    const svgB_prime = toSvg(B_prime);
    const svgC_prime = toSvg(C_prime);

    const duration = 1.2;
    const delay = 0.5;

    return (
        <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                 {/* --- Grid Lines (simplified) --- */}
                {Array.from({ length: Math.floor(svgWidth / scale) + 5 }).map((_, i) => {
                  const x = (i - 10) * scale + offsetX % scale; // Start drawing grid lines offset from origin
                   return (
                      <line key={`lx-${i}`} x1={x} y1={0} x2={x} y2={svgHeight} stroke="#999" strokeWidth="0.2" />
                  );
                })}
                {Array.from({ length: Math.floor(svgHeight / scale) + 5 }).map((_, i) => {
                  const y = (i - 10) * scale + offsetY % scale;
                   return (
                     <line key={`ly-${i}`} x1={0} y1={y} x2={svgWidth} y2={y} stroke="#999" strokeWidth="0.2" />
                  );
                })}
                {/* --- Axes --- */}
                <line x1={0} y1={offsetY} x2={svgWidth} y2={offsetY} stroke="white" strokeWidth="1.5" /> {/* x-axis */}
                <line x1={offsetX} y1={0} x2={offsetX} y2={svgHeight} stroke="white" strokeWidth="1.5" /> {/* y-axis */}
                <text x={svgWidth - 10} y={offsetY + 15} textAnchor="end" className="fill-slate-300 text-xs">x</text>
                <text x={offsetX - 15} y={10} textAnchor="start" className="fill-slate-300 text-xs">y</text>
                <circle cx={offsetX} cy={offsetY} r={3} fill="white" /> {/* Origin */}


                {/* Pre-image Triangle (Blue) */}
                <motion.polygon
                    points={`${svgA.x},${svgA.y} ${svgB.x},${svgB.y} ${svgC.x},${svgC.y}`}
                    className="fill-blue-600 opacity-70 stroke-blue-800 stroke-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ duration: 0.5 }}
                />
                <text x={svgA.x} y={svgA.y - 10} textAnchor='middle' className="fill-blue-200 font-bold text-xs">A(2,2)</text>
                <text x={svgB.x + 5} y={svgB.y + 15} className="fill-blue-200 font-bold text-xs">B(5,0)</text>
                <text x={svgC.x + 5} y={svgC.y + 15} className="fill-blue-200 font-bold text-xs">C(4,-1)</text>

                {/* Animated Vectors (Orange, dashed) */}
                {[svgA, svgB, svgC].map((p, i) => {
                    const p_prime = [svgA_prime, svgB_prime, svgC_prime][i];
                    return (
                        <motion.line
                            key={`vec-${i}`}
                            x1={p.x} y1={p.y} x2={p.x} y2={p.y}
                            animate={{ x2: p_prime.x, y2: p_prime.y }}
                            transition={{ delay: delay + i * 0.15, duration: duration, ease: 'easeOut' }}
                            stroke="#FFA500" // Orange color for vectors
                            strokeWidth="2"
                            strokeDasharray="5 3"
                        />
                    );
                })}

                {/* Image Triangle (Green, fades in after animation) */}
                <motion.polygon
                    points={`${svgA_prime.x},${svgA_prime.y} ${svgB_prime.x},${svgB_prime.y} ${svgC_prime.x},${svgC_prime.y}`}
                    className="fill-green-600 opacity-70 stroke-green-800 stroke-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: delay + duration, duration: 0.5 }} // Appears after vectors finish
                />
                <motion.text
                   x={svgA_prime.x} y={svgA_prime.y - 10} textAnchor='middle' className="fill-green-200 font-bold text-xs"
                   initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: delay + duration + 0.1}}
                 >A'(-3,5)</motion.text>
                 <motion.text
                    x={svgB_prime.x - 25} y={svgB_prime.y + 15} className="fill-green-200 font-bold text-xs"
                    initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: delay + duration + 0.1}}
                  >B'(0,3)</motion.text>
                  <motion.text
                    x={svgC_prime.x - 25} y={svgC_prime.y + 15} className="fill-green-200 font-bold text-xs"
                    initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: delay + duration + 0.1}}
                  >C'(-1,2)</motion.text>

                 {/* Vector Label */}
                 <motion.text
                    x={offsetX + 6 * scale} // Position label to the right
                    y={offsetY - 4 * scale} // Position label higher up
                    className="fill-orange-400 font-bold text-sm font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + duration / 2, duration: 0.5 }}
                 >
                     Vector: &lt;-5, 3&gt;
                 </motion.text>
                 <motion.text
                    x={offsetX + 6 * scale}
                    y={offsetY - 3.5 * scale} // Below the vector label
                    className="fill-orange-400 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + duration / 2, duration: 0.5 }}
                 >
                     (5 Left, 3 Up)
                 </motion.text>

            </svg>
        </div>
    );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function TranslationsSlide5() {
    // ... (Keep all your existing state, handlers, quiz questions, etc.)
    const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
    const [score, setScore] = useState(0);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const { isDarkMode } = useThemeContext();
    
    const slideInteractions: Interaction[] = [
      {
        id: 'translating-shapes-example-quiz',
        conceptId: 'translating-shapes',
        conceptName: 'Translating Shapes',
        type: 'judging',
        description: 'Testing a concrete example of translating a shape'
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
        id: 'shape-translation-example-q1',
        question: "Triangle △ABC has a vertex C at (4, -1). What are the coordinates of the new vertex C' after a translation of <-5, 3>?",
        options: [
          "C'(-1, 2)",
          "C'(9, 2)",
          "C'(-1, -4)",
          "C'(-9, 4)"
        ],
        correctAnswer: "C'(-1, 2)",
        explanation: "Correct! We just apply the rule to point C: x = 4 + (-5) = -1. y = -1 + 3 = 2. The new vertex is C'(-1, 2)."
      },
      { 
        id: 'shape-translation-find-rule-q2',
        question: "In the example, vertex B is at (5, 0) and moves to B'(0, 3). What is the change in x and change in y?",
        options: [
           "x changes by -5, y changes by +3",
           "x changes by +5, y changes by -3",
           "x changes by 0, y changes by 3",
           "x changes by -5, y changes by 0"
        ],
        correctAnswer: "x changes by -5, y changes by +3",
        explanation: "Correct! To get from x=5 to x=0, you subtract 5 (change is -5). To get from y=0 to y=3, you add 3 (change is +3). This matches the vector <-5, 3>."
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
        interactionId: `translating-shapes-example-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">

                {/* Left Column - Content */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Translating Shapes: Example</h2>
                        <p className="text-lg leading-relaxed">
                            Let's translate △ABC using the rule (x, y) → (x - 5, y + 3).
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            This is the same as the vector &lt;-5, 3&gt;
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Applying the Rule</h3>
                        <p className="text-lg leading-relaxed">
                            First, list the pre-image vertices:
                        </p>
                        <ul className="mt-4 space-y-2 text-lg font-mono text-slate-700 dark:text-slate-300">
                            <li>A = (2, 2)</li>
                            <li>B = (5, 0)</li>
                            <li>C = (4, -1)</li>
                        </ul>
                        <p className="text-lg leading-relaxed mt-4">
                            Now, apply the rule (x-5, y+3) to each point:
                        </p>
                        <ul className="mt-4 space-y-2 text-lg font-mono text-slate-700 dark:text-slate-300">
                            <li>A' = (2-5, 2+3) → <strong>A'(-3, 5)</strong></li>
                            <li>B' = (5-5, 0+3) → <strong>B'(0, 3)</strong></li>
                            <li>C' = (4-5, -1+3) → <strong>C'(-1, 2)</strong></li>
                        </ul>
                        <p className="text-lg leading-relaxed mt-4 font-bold text-blue-600 dark:text-blue-400">
                            The new image is △A'B'C'
                        </p>
                    </div>
                </div>

                {/* Right Column - Animation and Quiz */}
                <div className="space-y-6">
                    {/* --- USE THE ANIMATION COMPONENT --- */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Example on the Graph</h3>
                        
                        <TranslatingShapeExampleAnimation />
                       
                       {/* --- REMOVED THE ORIGINAL CAPTION --- */}
                       {/* <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
                            The blue △ABC is translated to the green △A'B'C'
                       </p> */}
                    </div>

                    {/* Quiz Box */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                       {/* ... Keep the entire quiz section exactly as it was ... */}
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
                            <div className="text-3xl mb-4">👍</div>
                            <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                            <div className="text-lg text-slate-600 dark:text-slate-400">
                              You scored {score} out of {questions.length}
                            </div>
                            <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                              {score === questions.length ? 'You can apply the rule perfectly!' : 'Great job!'}
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
            slideId="translating-shapes-2"
            slideTitle="Translating Shapes"
            moduleId="performing-transformations"
            submoduleId="translations"
            interactions={localInteractions}
        >
            {slideContent}
        </SlideComponentWrapper>
    );
}