import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE FOR EXAMPLE (Left Side) & QUIZ Q1 ---
const FigureQ1: React.FC<{isExample: boolean}> = ({ isExample }) => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const anglePink = isDarkMode ? '#F472B6' : '#DB2777';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const Q = { x: 200, y: 30 };
  const R = { x: 50, y: 180 };
  const P = { x: 350, y: 180 };
  const A = { x: 200, y: 180 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${Q.x} ${Q.y} L ${R.x} ${R.y} L ${P.x} ${P.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${Q.x} ${Q.y} L ${A.x} ${A.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={Q.x} y={Q.y - 10} fill={strokeColor} textAnchor="middle">Q</text>
        <text x={R.x - 15} y={R.y + 5} fill={strokeColor}>R</text>
        <text x={P.x + 5} y={P.y + 5} fill={strokeColor}>P</text>
        <text x={A.x} y={A.y + 15} fill={strokeColor} textAnchor="middle">A</text>

        {/* Markings */}
        <line x1={115} y1={100} x2={125} y2={105} stroke={strokeColor} strokeWidth="2" /> {/* QR */}
        <line x1={118} y1={97} x2={128} y2={102} stroke={strokeColor} strokeWidth="2" />
        <line x1={275} y1={105} x2={285} y2={100} stroke={strokeColor} strokeWidth="2" /> {/* QP */}
        <line x1={272} y1={102} x2={282} y2={97} stroke={strokeColor} strokeWidth="2" />
        
        <path d={`M ${A.x - 10} ${A.y - 10} L ${A.x - 10} ${A.y} L ${A.x} ${A.y}`} fill="none" stroke={angleBlue} strokeWidth="2" />
        
        {/* Conditional text based on prop */}
        {isExample ? (
          <>
            <path d={`M ${R.x + 20} ${R.y} A 20 20 0 0 1 ${R.x + 18} ${R.y - 8}`} stroke={strokeColor} {...commonProps} />
            <text x={R.x + 30} y={R.y - 10} fill={strokeColor} fontSize="12">70°</text>
            <path d={`M ${P.x - 20} ${P.y} A 20 20 0 0 0 ${P.x - 18} ${P.y - 8}`} stroke={anglePink} {...commonProps} />
            <text x={P.x - 60} y={P.y - 10} fill={anglePink} fontSize="12">3x + 13°</text>
          </>
        ) : (
          <>
            <path d={`M ${R.x + 20} ${R.y} A 20 20 0 0 1 ${R.x + 18} ${R.y - 8}`} stroke={strokeColor} {...commonProps} />
            <text x={R.x + 30} y={R.y - 10} fill={strokeColor} fontSize="12">32°</text>
            <path d={`M ${P.x - 20} ${P.y} A 20 20 0 0 0 ${P.x - 18} ${P.y - 8}`} stroke={anglePink} {...commonProps} />
            <text x={P.x - 60} y={P.y - 10} fill={anglePink} fontSize="12">2x + 12°</text>
          </>
        )}
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q4 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const anglePink = isDarkMode ? '#F472B6' : '#DB2777';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 100, y: 30 }, B: { x: 30, y: 140 }, C: { x: 170, y: 140 } };
  const T2 = { P: { x: 300, y: 30 }, Q: { x: 230, y: 140 }, R: { x: 370, y: 140 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* T1 (ABC) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x} y={T1.A.y - 10} fill={strokeColor} textAnchor="middle">A</text>
        <text x={T1.B.x - 15} y={T1.B.y + 5} fill={strokeColor}>B</text>
        <text x={T1.C.x + 5} y={T1.C.y + 5} fill={strokeColor}>C</text>
        {/* Markings */}
        <line x1={55} y1={80} x2={65} y2={85} stroke={strokeColor} strokeWidth="1.5" /> {/* AB (1) */}
        <line x1={145} y1={80} x2={155} y2={85} stroke={strokeColor} strokeWidth="1.5" /> {/* AC (2) */}
        <line x1={148} y1={77} x2={158} y2={82} stroke={strokeColor} strokeWidth="1.5" />
        {/* Angles */}
        <path d={`M ${T1.A.x - 12} ${T1.A.y + 13} A 15 15 0 0 1 ${T1.A.x + 12} ${T1.A.y + 13}`} stroke={anglePink} {...commonProps} />
        <text x={T1.A.x} y={T1.A.y + 40} fill={anglePink} fontSize="12" textAnchor="middle">61°</text>
        <path d={`M ${T1.B.x} ${T1.B.y - 12} L ${T1.B.x + 12} ${T1.B.y - 12} L ${T1.B.x + 12} ${T1.B.y}`} fill="none" stroke={angleBlue} strokeWidth="2" />

        {/* T2 (PQR) */}
        <path d={`M ${T2.P.x} ${T2.P.y} L ${T2.Q.x} ${T2.Q.y} L ${T2.R.x} ${T2.R.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.P.x} y={T2.P.y - 10} fill={strokeColor} textAnchor="middle">P</text>
        <text x={T2.Q.x - 15} y={T2.Q.y + 5} fill={strokeColor}>Q</text>
        <text x={T2.R.x + 5} y={T2.R.y + 5} fill={strokeColor}>R</text>
        {/* Markings */}
        <line x1={255} y1={80} x2={265} y2={85} stroke={strokeColor} strokeWidth="1.5" /> {/* PQ (1) */}
        <line x1={345} y1={80} x2={355} y2={85} stroke={strokeColor} strokeWidth="1.5" /> {/* PR (2) */}
        <line x1={348} y1={77} x2={358} y2={82} stroke={strokeColor} strokeWidth="1.5" />
        {/* Angles */}
        <path d={`M ${T2.Q.x} ${T2.Q.y - 12} L ${T2.Q.x + 12} ${T2.Q.y - 12} L ${T2.Q.x + 12} ${T2.Q.y}`} fill="none" stroke={angleBlue} strokeWidth="2" />
        <path d={`M ${T2.R.x - 15} ${T2.R.y} A 15 15 0 0 0 ${T2.R.x - 13.6} ${T2.R.y - 6.5}`} stroke={angleOrange} {...commonProps} />
        <text x={T2.R.x - 25} y={T2.R.y - 10} fill={angleOrange} fontSize="12">?</text>
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function HlSlide3() {
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
      id: 'hl-finding-angles-quiz',
      conceptId: 'hl-finding-angles',
      conceptName: 'HL Finding Angles',
      type: 'judging',
      description: 'Testing using HL and CPCTC to find unknown angles'
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
      id: 'hl-find-angle-q3',
      question: 'The point A is on the base PR of an isosceles triangle ΔPQR, where ∠QAR is a right angle. If $m\angle AQR = 32^\circ$ and $m\angle AQP = 2x + 12^\circ$, what is the value of $x$?',
      figure: <FigureQ1 isExample={false} />,
      options: [
        "20°",
        "29°",
        "10°",
        "32°",
        "58°"
      ],
      correctAnswer: "10°",
      explanation: "Correct! In isosceles ΔPQR, the altitude $QA$ to the base $PR$ creates two congruent right triangles ($\triangle QAR \cong \triangle QAP$) by HL. By CPCTC, $\angle AQR \cong \angle AQP$. So, $32 = 2x + 12$. This gives $2x = 20$, and $x = 10^\circ$."
    },
    {
      id: 'hl-find-angle-q4',
      question: 'Given the diagram above, find $m\angle R$.',
      figure: <FigureQ2 />,
      options: [
        "30°",
        "29°",
        "25°",
        "31°",
        "28°"
      ],
      correctAnswer: "29°",
      explanation: "Correct! The triangles are right triangles. Their hypotenuses are congruent (2 hashes) and one pair of legs is congruent (1 hash). By HL, $\triangle ABC \cong \triangle PQR$. By CPCTC, $\angle C \cong \angle R$. In $\triangle ABC$, the angles sum to 180°. So, $m\angle C = 180^\circ - 90^\circ - 61^\circ = 29^\circ$. Therefore, $m\angle R = 29^\circ$."
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
      interactionId: `hl-find-angle-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'hl-finding-angles',
      conceptName: 'HL Finding Angles',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Calculating an Angle Using HL</h2>
            <p className="text-lg leading-relaxed mb-4">
              The point A is located on the base $PR$ of an isosceles triangle ΔPQR such that ∠QAR is a right angle. If $m\angle RQA = 70^\circ$ and $m\angle PQA = 3x + 13^\circ$, what is the value of $x$?
            </p>
            
            <FigureQ1 isExample={true} />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              First, let's draw a sketch using the given information.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Since ∠RAQ and ∠PAQ form a linear pair, we have:
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg font-mono text-center">
              m∠RAQ + m∠PAQ = 180°<br/>
              90° + m∠PAQ = 180°<br/>
              m∠PAQ = 90°
            </div>

            <p className="text-lg leading-relaxed mt-4">
              Notice that ΔQAR and ΔQAP are congruent by HL (hypotenuse-leg) since we have the following congruent legs, hypotenuses, and right angles:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
                <li>m∠QAR = m∠QAP = 90°</li>
                <li>A common leg $QA$</li>
                <li>$QR \cong QP$ (legs of isosceles triangle are hypotenuses of the right triangles)</li>
            </ul>

            <p className="text-lg leading-relaxed mt-4">
              As a consequence, all the corresponding angles must be congruent. In particular, <strong>∠AQR ≅ ∠AQP</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Thus,
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono">
              m∠PQA = m∠RQA<br/>
              3x + 13° = 70°<br/>
              3x = 57°<br/>
              x = 19°
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Find the Missing Angle</h3>
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
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You're a CPCTC expert!" : 'Great work!'}
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
      slideId="hl-finding-angles"
      slideTitle="Calculating the Measure of an Angle Using the HL Criterion"
      moduleId="congruence"
      submoduleId="hl-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}