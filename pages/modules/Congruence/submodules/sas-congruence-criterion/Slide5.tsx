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
  
  const anglePurple = isDarkMode ? '#C084FC' : '#9333EA';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 30, y: 120 }, B: { x: 100, y: 30 }, C: { x: 170, y: 120 } };
  const T2 = { D: { x: 230, y: 120 }, E: { x: 300, y: 30 }, F: { x: 370, y: 120 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* T1 (ABC) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>A</text>
        <text x={T1.B.x} y={T1.B.y - 5} fill={strokeColor} textAnchor="middle">B</text>
        <text x={T1.C.x + 5} y={T1.C.y + 5} fill={strokeColor}>C</text>
        <text x={T1.B.x + 20} y={T1.B.y + 50} fill={strokeColor}>2x</text>
        <text x={T1.B.x - 20} y={T1.B.y + 50} fill={strokeColor}>3</text>
        <path d={`M ${T1.A.x + 15} ${T1.A.y} A 15 15 0 0 1 ${T1.A.x + 13.6} ${T1.A.y - 6.5}`} stroke={anglePurple} {...commonProps} />
        <line x1={T1.A.x + 30} y1={T1.A.y - 25} x2={T1.A.x + 40} y2={T1.A.y - 30} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={T1.C.x - 30} y1={T1.C.y - 25} x2={T1.C.x - 40} y2={T1.C.y - 30} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={T1.C.x - 33} y1={T1.C.y - 22} x2={T1.C.x - 43} y2={T1.C.y - 27} stroke={strokeColor} strokeWidth="1.5" />

        {/* T2 (DEF) */}
        <path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.D.x - 15} y={T2.D.y + 5} fill={strokeColor}>D</text>
        <text x={T2.E.x} y={T2.E.y - 5} fill={strokeColor} textAnchor="middle">E</text>
        <text x={T2.F.x + 5} y={T2.F.y + 5} fill={strokeColor}>F</text>
        <text x={T2.E.x + 20} y={T2.E.y + 50} fill={strokeColor}>x + 2</text>
        <text x={T2.E.x - 20} y={T2.E.y + 50} fill={strokeColor}>3</text>
        <path d={`M ${T2.D.x + 15} ${T2.D.y} A 15 15 0 0 1 ${T2.D.x + 13.6} ${T2.D.y - 6.5}`} stroke={anglePurple} {...commonProps} />
        <line x1={T2.D.x + 30} y1={T2.D.y - 25} x2={T2.D.x + 40} y2={T2.D.y - 30} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={T2.F.x - 30} y1={T2.F.y - 25} x2={T2.F.x - 40} y2={T2.F.y - 30} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={T2.F.x - 33} y1={T2.F.y - 22} x2={T2.F.x - 43} y2={T2.F.y - 27} stroke={strokeColor} strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q7 from image) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const anglePurple = isDarkMode ? '#C084FC' : '#9333EA';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 80, y: 120 }, B: { x: 170, y: 120 }, C: { x: 30, y: 30 } };
  const T2 = { D: { x: 230, y: 120 }, E: { x: 320, y: 30 }, F: { x: 370, y: 120 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* T1 (ABC) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x - 10} y={T1.A.y + 15} fill={strokeColor}>A</text>
        <text x={T1.B.x + 5} y={T1.B.y + 15} fill={strokeColor}>B</text>
        <text x={T1.C.x} y={T1.C.y - 5} fill={strokeColor} textAnchor="middle">C</text>
        <text x={(T1.A.x + T1.B.x)/2} y={T1.A.y + 15} fill={strokeColor}>5</text>
        <text x={(T1.A.x + T1.C.x)/2 - 10} y={(T1.A.y + T1.C.y)/2} fill={strokeColor}>5x</text>
        <path d={`M ${T1.B.x - 15} ${T1.B.y} A 15 15 0 0 0 ${T1.B.x - 13.6} ${T1.B.y - 6.5}`} stroke={anglePurple} {...commonProps} />
        <line x1={T1.A.x + 20} y1={T1.A.y - 35} x2={T1.A.x + 30} y2={T1.A.y - 40} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={T1.A.x + 23} y1={T1.A.y - 32} x2={T1.A.x + 33} y2={T1.A.y - 37} stroke={strokeColor} strokeWidth="1.5" />

        {/* T2 (DEF) */}
        <path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.D.x - 10} y={T2.D.y + 15} fill={strokeColor}>D</text>
        <text x={T2.E.x + 5} y={T2.E.y - 5} fill={strokeColor}>E</text>
        <text x={T2.F.x + 5} y={T2.F.y + 15} fill={strokeColor}>F</text>
        <text x={(T2.D.x + T2.E.x)/2} y={(T2.D.y + T2.E.y)/2 + 10} fill={strokeColor}>7x - 12°</text>
        <text x={(T2.E.x + T2.F.x)/2 + 10} y={(T2.E.y + T2.F.y)/2} fill={strokeColor}>5</text>
        <path d={`M ${T2.F.x - 15} ${T2.F.y} A 15 15 0 0 0 ${T2.F.x - 13.6} ${T2.F.y - 6.5}`} stroke={anglePurple} {...commonProps} />
        <line x1={T2.D.x + 40} y1={T2.D.y - 35} x2={T2.D.x + 50} y2={T2.D.y - 40} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={T2.D.x + 43} y1={T2.D.y - 32} x2={T2.D.x + 53} y2={T2.D.y - 37} stroke={strokeColor} strokeWidth="1.5" />
      </svg>
    </div>
  );
};


// --- FIGURE FOR QUIZ QUESTION 2 (Q8 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const anglePurple = isDarkMode ? '#C084FC' : '#9333EA';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 30, y: 140 }, B: { x: 170, y: 140 }, C: { x: 100, y: 30 } };
  const T2 = { D: { x: 230, y: 140 }, E: { x: 370, y: 140 }, F: { x: 300, y: 30 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* T1 (ABC) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>A</text>
        <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>B</text>
        <text x={T1.C.x} y={T1.C.y - 5} fill={strokeColor} textAnchor="middle">C</text>
        <text x={(T1.A.x + T1.B.x)/2} y={T1.A.y + 15} fill={strokeColor}>6</text>
        <text x={(T1.A.x + T1.C.x)/2 - 10} y={(T1.A.y + T1.C.y)/2} fill={strokeColor}>x + 2</text>
        <line x1={T1.B.x - 40} y1={T1.B.y - 35} x2={T1.B.x - 50} y2={T1.B.y - 40} stroke={strokeColor} strokeWidth="1.5" />
        <path d={`M ${T1.B.x - 15} ${T1.B.y} A 15 15 0 0 0 ${T1.B.x - 13.6} ${T1.B.y - 6.5}`} stroke={anglePurple} {...commonProps} />

        {/* T2 (DEF) */}
        <path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.D.x - 15} y={T2.D.y + 5} fill={strokeColor}>D</text>
        <text x={T2.E.x + 5} y={T2.E.y + 5} fill={strokeColor}>E</text>
        <text x={T2.F.x} y={T2.F.y - 5} fill={strokeColor} textAnchor="middle">F</text>
        <text x={(T2.D.x + T2.E.x)/2} y={T2.D.y + 15} fill={strokeColor}>6</text>
        <text x={(T2.D.x + T2.F.x)/2 - 10} y={(T2.D.y + T2.F.y)/2} fill={strokeColor}>3x - 6</text>
        <line x1={T2.E.x - 40} y1={T2.E.y - 35} x2={T2.E.x - 50} y2={T2.E.y - 40} stroke={strokeColor} strokeWidth="1.5" />
        <path d={`M ${T2.E.x - 15} ${T2.E.y} A 15 15 0 0 0 ${T2.E.x - 13.6} ${T2.E.y - 6.5}`} stroke={anglePurple} {...commonProps} />
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function SasSlide5() {
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
      id: 'sas-true-statements-quiz',
      conceptId: 'sas-true-statements',
      conceptName: 'SAS True Statements',
      type: 'judging',
      description: 'Testing final validation of SAS congruence statements'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    figure: React.ReactNode;
    statements: string[];
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED QUESTIONS ARRAY ---
  const questions: QuizQuestion[] = [
   {
  id: 'sas-statements-q7',
  question: 'From the diagram, which of the following statements are true?',
  figure: <FigureQ1 />,
  statements: [
    'I. Triangle ABC is congruent to Triangle DEF by SAS',
    'II. AC equals DF',
    'III. x = 7°'
  ],
  options: [
    "III only",
    "I and III only",
    "II only",
    "I, II, and III",
    "I and II only"
  ],
  correctAnswer: "II only",
  explanation:
    "Statement I is false because the angle shown is not between the two sides. This is Side-Side-Angle (SSA), which is not a valid congruence rule. Statement II is true because the side markings show AC and DF are equal. Statement III is false because we cannot set up an equation without proving the triangles are congruent first."
},
{
  id: 'sas-statements-q8',
  question: 'From the diagram, which of the following statements are true?',
  figure: <FigureQ2 />,
  statements: [
    'I. Triangle ABC is congruent to Triangle DEF by SAS',
    'II. Angle A equals Angle D',
    'III. x = 4'
  ],
  options: [
    "II and III only",
    "II only",
    "I, II, and III",
    "I and III only",
    "III only"
  ],
  correctAnswer: "I, II, and III",
  explanation:
    "Statement I is true because we have side AB equal to DE, the included angles at B and E are equal, and side BC equals EF. This matches the SAS rule. Statement II is true because once the triangles are congruent, all matching angles are equal (CPCTC). Statement III is true because matching sides AC and DF are equal, giving the equation x + 2 = 3x - 6, which solves to x = 4."
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
      interactionId: `sas-true-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sas-true-statements',
      conceptName: 'SAS True Statements',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Identifying True Statements</h2>
            <p className="text-lg leading-relaxed mb-4">
              From the diagram below, which of the following statements are true?
            </p>
            <ul className="list-none p-4 mb-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg font-mono">
              <li>I.   ΔABC ≅ ΔDEF by SAS</li>
              <li>II.  ∠B ≅ ∠F</li>
              <li>III. x = 2</li>
            </ul>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              Let's examine each of the statements in turn.
            </p>

            <ul className="list-disc list-inside mt-4 text-lg space-y-3 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Statement I is true.</strong> Notice that ΔABC and ΔDEF are congruent by the SAS criterion since we have the following pairs of congruent sides and included angles:
                <ul className="list-none my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg font-mono text-center">
                  <li>BA ≅ ED</li>
                  <li>AC ≅ DF</li>
                  <li>∠A ≅ ∠D</li>
                </ul>
              </li>
              <li>
                <strong>Statement II is false.</strong> Since the two triangles are congruent, the corresponding angles must be congruent too. Therefore, we obtain <strong>∠B ≅ ∠E</strong>.
              </li>
              <li>
                <strong>Statement III is true.</strong> Since the two triangles are congruent, the corresponding sides must be congruent too. Hence, we obtain:
                <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg font-mono text-center">
                  BC = EF<br/>
                  2x = x + 2<br/>
                  x = 2
                </div>
              </li>
            </ul>
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              Therefore, the correct answer is "I and III only."
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Is the Statement True?</h3>
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
                 {/* Statements */}
                 <ul className="list-none p-4 mb-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg font-mono">
                  {questions[currentQuestionIndex].statements.map((stmt, i) => (
                    <li key={i}>{stmt}</li>
                  ))}
                </ul>
                
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
                          : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700' // Incorrect
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
                <div className="text-3xl mb-4">🕵️‍♂️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Excellent detective work!" : 'Great job analyzing the clues!'}
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
      slideId="sas-true-statements"
      slideTitle="Identifying True Statements Using the SAS Criterion"
      moduleId="congruence"
      submoduleId="sas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}