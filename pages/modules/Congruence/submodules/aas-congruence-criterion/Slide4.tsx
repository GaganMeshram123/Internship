import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE FOR EXAMPLE (Left Side) ---
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 30, y: 140 }, B: { x: 170, y: 140 }, C: { x: 100, y: 30 } };
  const T2 = { T: { x: 370, y: 140 }, U: { x: 230, y: 140 }, V: { x: 300, y: 30 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* T1 (ABC) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>A</text>
        <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>B</text>
        <text x={T1.C.x} y={T1.C.y - 5} fill={strokeColor} textAnchor="middle">C</text>
        <text x={(T1.A.x + T1.B.x)/2} y={T1.A.y + 15} fill={strokeColor}>x</text>
        <text x={(T1.A.x + T1.C.x)/2 - 10} y={(T1.A.y + T1.C.y)/2} fill={strokeColor}>y</text>
        <text x={(T1.B.x + T1.C.x)/2 + 10} y={(T1.B.y + T1.C.y)/2} fill={strokeColor}>7</text>
        <path d={`M ${T1.A.x + 15} ${T1.A.y} A 15 15 0 0 1 ${T1.A.x + 13.6} ${T1.A.y - 6.5}`} stroke={angleBlue} {...commonProps} />
        <path d={`M ${T1.B.x - 15} ${T1.B.y} A 15 15 0 0 0 ${T1.B.x - 13.6} ${T1.B.y - 6.5}`} stroke={angleGreen} {...commonProps} />

        {/* T2 (TUV) */}
        <path d={`M ${T2.T.x} ${T2.T.y} L ${T2.U.x} ${T2.U.y} L ${T2.V.x} ${T2.V.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.T.x + 5} y={T2.T.y + 5} fill={strokeColor}>T</text>
        <text x={T2.U.x - 15} y={T2.U.y + 5} fill={strokeColor}>U</text>
        <text x={T2.V.x} y={T2.V.y - 5} fill={strokeColor} textAnchor="middle">V</text>
        <text x={(T2.U.x + T2.V.x)/2 - 10} y={(T2.U.y + T2.V.y)/2} fill={strokeColor}>7</text>
        <path d={`M ${T2.T.x - 15} ${T2.T.y} A 15 15 0 0 0 ${T2.T.x - 13.6} ${T2.T.y - 6.5}`} stroke={angleBlue} {...commonProps} />
        <path d={`M ${T2.U.x + 15} ${T2.U.y} A 15 15 0 0 1 ${T2.U.x + 13.6} ${T2.U.y - 6.5}`} stroke={angleGreen} {...commonProps} />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q5 from image) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 30, y: 140 }, B: { x: 170, y: 140 }, C: { x: 100, y: 30 } }; // XYZ
  const T2 = { T: { x: 370, y: 140 }, U: { x: 230, y: 140 }, V: { x: 300, y: 30 } }; // TUV

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* T1 (XYZ) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>X</text>
        <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>Y</text>
        <text x={T1.C.x} y={T1.C.y - 5} fill={strokeColor} textAnchor="middle">Z</text>
        <text x={(T1.A.x + T1.B.x)/2} y={T1.A.y + 15} fill={strokeColor}>x</text>
        <text x={(T1.A.x + T1.C.x)/2 - 10} y={(T1.A.y + T1.C.y)/2} fill={strokeColor}>y</text>
        <text x={(T1.B.x + T1.C.x)/2 + 10} y={(T1.B.y + T1.C.y)/2} fill={strokeColor}>10</text>
        <path d={`M ${T1.A.x + 15} ${T1.A.y} A 15 15 0 0 1 ${T1.A.x + 13.6} ${T1.A.y - 6.5}`} stroke={angleBlue} {...commonProps} />
        <path d={`M ${T1.B.x - 15} ${T1.B.y} A 15 15 0 0 0 ${T1.B.x - 13.6} ${T1.B.y - 6.5}`} stroke={angleGreen} {...commonProps} />

        {/* T2 (TUV) */}
        <path d={`M ${T2.T.x} ${T2.T.y} L ${T2.U.x} ${T2.U.y} L ${T2.V.x} ${T2.V.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.T.x + 5} y={T2.T.y + 5} fill={strokeColor}>T</text>
        <text x={T2.U.x - 15} y={T2.U.y + 5} fill={strokeColor}>U</text>
        <text x={T2.V.x} y={T2.V.y - 5} fill={strokeColor} textAnchor="middle">V</text>
        <text x={(T2.U.x + T2.T.x)/2} y={T2.U.y + 15} fill={strokeColor}>10</text>
        <path d={`M ${T2.T.x - 15} ${T2.T.y} A 15 15 0 0 0 ${T2.T.x - 13.6} ${T2.T.y - 6.5}`} stroke={angleBlue} {...commonProps} />
        <path d={`M ${T2.U.x + 15} ${T2.U.y} A 15 15 0 0 1 ${T2.U.x + 13.6} ${T2.U.y - 6.5}`} stroke={angleGreen} {...commonProps} />
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
  
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 200, y: 180 };
  const B = { x: 130, y: 100 };
  const C = { x: 100, y: 30 };
  const D = { x: 300, y: 30 };
  const E = { x: 270, y: 100 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`50 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y} L ${E.x} ${E.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y} L ${B.x} ${B.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${C.x} ${C.y} L ${E.x} ${E.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${D.x} ${D.y} L ${B.x} ${B.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={A.x} y={A.y + 15} fill={strokeColor} textAnchor="middle">A</text>
        <text x={B.x - 15} y={B.y} fill={strokeColor}>B</text>
        <text x={C.x - 15} y={C.y} fill={strokeColor}>C</text>
        <text x={D.x + 5} y={D.y} fill={strokeColor}>D</text>
        <text x={E.x + 5} y={E.y} fill={strokeColor}>E</text>

        {/* Angles & Given */}
        <path d={`M ${C.x + 15} ${C.y + 5} A 15 15 0 0 1 ${C.x} ${C.y + 15}`} stroke={angleOrange} {...commonProps} />
        <path d={`M ${D.x - 15} ${D.y + 5} A 15 15 0 0 0 ${D.x} ${D.y + 15}`} stroke={angleOrange} {...commonProps} />
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function AasSlide4() {
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
      id: 'aas-finding-lengths-quiz',
      conceptId: 'aas-finding-lengths',
      conceptName: 'AAS Finding Lengths',
      type: 'judging',
      description: 'Testing using AAS and CPCTC to find unknown lengths'
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

  // --- UPDATED QUESTIONS ARRAY ---
  const questions: QuizQuestion[] = [
    {
      id: 'aas-find-perimeter-q5',
      question: 'The perimeter of a triangle ΔTUV is 27. What is the value of x + y?',
      figure: <FigureQ1 />,
      options: [
        "13",
        "15",
        "17",
        "19",
        "12"
      ],
      correctAnswer: "17",
      explanation: "Correct! The triangles are congruent by AAS (∠X ≅ ∠T, ∠Y ≅ ∠U, ZY ≅ VU). By CPCTC, $XY = TU = x$ and $XZ = TV = y$. The perimeter of ΔTUV is $TU + UV + VT = 27$. Substituting gives $x + 10 + y = 27$. Therefore, $x + y = 17$."
    },
    {
      id: 'aas-find-length-q6',
      question: 'In the above diagram, $CE = BD$ and $∠C ≅ ∠D$. Given that $AB = 3x + 7$ and $AE = 7x - 3$, what is the value of $x$?',
      figure: <FigureQ2 />,
      options: [
        "3.5",
        "2.5",
        "2",
        "4",
        "3"
      ],
      correctAnswer: "2.5",
      explanation: "Correct! We can prove $\triangle ACE \cong \triangle ABD$ by AAS. We are given $\angle C \cong \angle D$ (Angle) and $CE \cong BD$ (Side). $\angle CAE$ and $\angle DAB$ are vertical angles, so they are congruent (Angle). By CPCTC, $AE \cong AB$. So, $7x - 3 = 3x + 7$. This gives $4x = 10$, so $x = 2.5$."
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
      interactionId: `aas-find-length-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'aas-finding-lengths',
      conceptName: 'AAS Finding Lengths',
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

        {/* Left Column - Content (UPDATED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Calculating Length Using AAS</h2>
            <p className="text-lg leading-relaxed mb-4">
              The perimeter of a triangle ΔTUV is 22. What is the value of x + y?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              Notice that ΔTUV and ΔABC are congruent by AAS since we have the following pairs of congruent angles and corresponding non-included sides:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <strong>BC ≅ UV</strong> (Given Side)
                </li>
                <li>
                  <strong>∠A ≅ ∠T</strong> (Given Angle)
                </li>
                <li>
                  <strong>∠B ≅ ∠U</strong> (Given Angle)
                </li>
            </ul>

            <p className="text-lg leading-relaxed mt-4">
              Therefore, all the corresponding sides of the triangles must be congruent. In particular, $UT = AB = x$ and $VT = AC = y$.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Since the perimeter of ΔTUV is 22, we obtain
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono">
              UT + UV + VT = 22<br/>
              UT + 7 + VT = 22<br/>
              UT + VT = 15<br/>
              x + y = 15
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
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
                <div className="text-3xl mb-4">📏</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered this concept!" : 'Good practice!'}
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
      slideId="aas-finding-lengths"
      slideTitle="Calculating the Length of a Line Segment Using AAS"
      moduleId="congruence"
      submoduleId="aas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}