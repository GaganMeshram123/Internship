import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE FOR EXAMPLE & QUIZ QUESTION 1 (Q5 from image) ---
// This figure is used for both the example on the left
// and the first quiz question on the right.
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const highlightColor = isDarkMode ? '#F9B572' : '#F59E0B'; // Orange
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 100, y: 180 };
  const B = { x: 150, y: 100 };
  const C = { x: 180, y: 40 };
  const D = { x: 300, y: 130 };
  const E = { x: 200, y: 140 };
  const dashLine = { stroke: strokeColor, strokeWidth: 1.5, strokeDasharray: "4 4" };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`50 0 ${svgWidth} ${svgHeight}`}>
        {/* Lines */}
        <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${C.x} ${C.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} />
        {/* Dashed lines to B and E */}
        <path d={`M ${C.x} ${C.y} L ${B.x} ${B.y} L ${A.x} ${A.y}`} stroke={strokeColor} {...commonProps} fill="none" />
        <path d={`M ${A.x} ${A.y} L ${E.x} ${E.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} fill="none" />
        <path d={`M ${C.x} ${C.y} L ${E.x} ${E.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} fill="none" />
        <path d={`M ${B.x} ${B.y} L ${E.x} ${E.y}`} {...dashLine} />

        {/* Labels */}
        <text x={A.x - 15} y={A.y + 5} fill={strokeColor}>A</text>
        <text x={B.x - 15} y={B.y} fill={strokeColor}>B</text>
        <text x={C.x} y={C.y - 10} fill={strokeColor}>C</text>
        <text x={D.x + 5} y={D.y + 5} fill={strokeColor}>D</text>
        <text x={E.x} y={E.y + 15} fill={strokeColor}>E</text>

        {/* Angles */}
        <path d={`M ${C.x - 12} ${C.y + 16} A 20 20 0 0 1 ${C.x + 4.5} ${C.y + 14.5}`} stroke={highlightColor} strokeWidth="3" fill={highlightColor} fillOpacity="0.4" />
        <path d={`M ${D.x - 15} ${D.y - 12} A 20 20 0 0 1 ${D.x - 10} ${D.y + 5}`} stroke={highlightColor} strokeWidth="3" fill={highlightColor} fillOpacity="0.4" />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q6 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 170, y: 100 }, B: { x: 140, y: 30 }, C: { x: 30, y: 100 } };
  const T2 = { D: { x: 230, y: 100 }, E: { x: 260, y: 30 }, F: { x: 370, y: 100 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Triangle 1 (ABC) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x + 5} y={T1.A.y + 5} fill={strokeColor}>A</text>
        <text x={T1.B.x} y={T1.B.y - 5} fill={strokeColor}>B</text>
        <text x={T1.C.x - 15} y={T1.C.y + 5} fill={strokeColor}>C</text>
        <text x={(T1.B.x + T1.C.x)/2} y={T1.B.y + 30} fill={strokeColor}>5</text>
        <text x={(T1.A.x + T1.C.x)/2} y={T1.A.y + 15} fill={strokeColor}>y</text>
        {/* Angles for T1 */}
        <path d={`M ${T1.A.x - 12} ${T1.A.y - 5} A 15 15 0 0 0 ${T1.A.x} ${T1.A.y - 15}`} stroke={angleBlue} {...commonProps} />
        <path d={`M ${T1.B.x + 10} ${T1.B.y + 6} A 15 15 0 0 1 ${T1.B.x} ${T1.B.y + 15}`} stroke={angleGreen} {...commonProps} />
        <path d={`M ${T1.B.x + 12.5} ${T1.B.y + 7.5} A 18 18 0 0 1 ${T1.B.x} ${T1.B.y + 18}`} stroke={angleGreen} {...commonProps} />
        {/* Side Markings T1 */}
        <line x1={158} y1={65} x2={165} y2={60} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={155} y1={68} x2={162} y2={63} stroke={strokeColor} strokeWidth="1.5" />

        {/* Triangle 2 (DEF) */}
        <path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.D.x - 15} y={T2.D.y + 5} fill={strokeColor}>D</text>
        <text x={T2.E.x} y={T2.E.y - 5} fill={strokeColor}>E</text>
        <text x={T2.F.x + 5} y={T2.F.y + 5} fill={strokeColor}>F</text>
<text x={(T2.E.x + T2.F.x)/2} y={T2.E.y + 30} fill={strokeColor}>x</text>
        <text x={(T2.D.x + T2.F.x)/2} y={T2.D.y + 15} fill={strokeColor}>6</text>
        {/* Angles for T2 */}
        <path d={`M ${T2.D.x + 12} ${T2.D.y - 5} A 15 15 0 0 1 ${T2.D.x} ${T2.D.y - 15}`} stroke={angleBlue} {...commonProps} />
        <path d={`M ${T2.E.x - 10} ${T2.E.y + 6} A 15 15 0 0 0 ${T2.E.x} ${T2.E.y + 15}`} stroke={angleGreen} {...commonProps} />
        <path d={`M ${T2.E.x - 12.5} ${T2.E.y + 7.5} A 18 18 0 0 0 ${T2.E.x} ${T2.E.y + 18}`} stroke={angleGreen} {...commonProps} />
        {/* Side Markings T2 */}
        <line x1={242} y1={65} x2={249} y2={60} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={245} y1={68} x2={252} y2={63} stroke={strokeColor} strokeWidth="1.5" />
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function AsaSlide4() {
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
      id: 'asa-calculation-quiz',
      conceptId: 'asa-calculation',
      conceptName: 'ASA Calculation',
      type: 'judging',
      description: 'Using ASA and CPCTC to calculate unknown values'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    figure: React.ReactNode;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- QUESTIONS ARRAY FROM YOUR IMAGES ---
  const questions: QuizQuestion[] = [
   {
  id: 'asa-calc-q1',
  question: 'In the figure above, AD = 4m, AB = 3m, BD = 3m, BC = 1m, and CE = 2x - 5. What is the value of x?',
  figure: <FigureQ1 />,
  options: [
    "6m",
    "3.5m",
    "4m",
    "8m",
    "5m"
  ],
  correctAnswer: "4m",
  explanation:
    "First, find AC by adding AB and BC: AC = 3 + 1 = 4m. We are given AD = 4m, so AC and AD are equal. Angle A is shared, so it matches in both triangles. The orange angles at C and D are also equal. This matches the ASA rule, so triangle CAE and triangle DAB are congruent. Because the triangles are congruent, CE equals BD. So we set 2x - 5 = 3. Solving gives 2x = 8, so x = 4."
},
{
  id: 'asa-calc-q2',
  question: 'In the figure above, find the value of 3x - y.',
  figure: <FigureQ2 />,
  options: [
    "18",
    "9",
    "6",
    "13",
    "15"
  ],
  correctAnswer: "9",
  explanation:
    "The triangles are congruent by ASA. The green angles match, the side marked with two hash lines is the included side, and the blue angles match. So the triangles are congruent. This means matching sides are equal. AC corresponds to DF, so y = 6. BC corresponds to EF, so x = 5. Now calculate 3x - y: 3(5) - 6 = 15 - 6 = 9."
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
      interactionId: `asa-calc-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'asa-calculation',
      conceptName: 'ASA Calculation',
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

        {/* Left Column - Content (from image_285424.png) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Calculating Length Using ASA</h2>
            <p className="text-lg leading-relaxed mb-4">
              In the figure below, $AC = 12, AE = 5, ED = 7, BD = 10$, and $CE = 3x - 2$. What is the value of $x$?
            </p>
            
            <div className="w-full flex justify-center items-center p-4 my-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
               {/* Using FigureQ1 as it's the same diagram */}
               <FigureQ1 />
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              First, notice that $AC \cong AD$ since:
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono">
              AD = AE + ED = 5 + 7 = 12
            </div>
            <p className="text-lg leading-relaxed">
              And $AC$ is given as 12.
            </p>

            <p className="text-lg leading-relaxed mt-4">
              Now, we can prove $\triangle CAE \cong \triangle DAB$ by ASA:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <strong>Angle (A):</strong> $\angle A$ is their common angle.
                </li>
                <li>
                  <strong>Side (S):</strong> $AC \cong AD$ (as shown above).
                </li>
                <li>
                  <strong>Angle (A):</strong> $\angle ACE \cong \angle ADB$ (given by the orange angle markers in the diagram).
                </li>
            </ul>

            <p className="text-lg leading-relaxed mt-4">
              Therefore, all corresponding sides must be congruent (CPCTC). In particular, $CE \cong BD$.
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono">
              CE = BD<br/>
              3x - 2 = 10<br/>
              3x = 12<br/>
              x = 4
            </div>
          </div>
        </div>

        {/* Right Column - Quiz (from other 2 images) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Calculation Practice</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            {/* --- Progress Bar --- */}
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

            {/* --- RENDER THE FIGURE FOR THE CURRENT QUESTION --- */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
              >
                {questions[currentQuestionIndex].figure}
              </motion.div>
            </AnimatePresence>


            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4 mt-6">{questions[currentQuestionIndex].question}</div>
                {/* --- Answer Options --- */}
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
                {/* --- Feedback Box --- */}
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
                <div className="text-3xl mb-4">📊</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Perfect! You're a pro at this." : 'Well done!'}
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
      slideId="asa-calculation"
      slideTitle="Calculating with ASA and CPCTC"
      moduleId="congruence"
      submoduleId="asa-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}