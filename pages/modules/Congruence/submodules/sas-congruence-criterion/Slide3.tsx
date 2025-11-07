import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE FOR EXAMPLE (Left Side) ---
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 50, y: 110 };
  const M = { x: 180, y: 110 };
  const B = { x: 130, y: 170 };
  const P = { x: 230, y: 50 };
  const Q = { x: 310, y: 110 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Lines */}
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${M.x} ${M.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${Q.x} ${Q.y} L ${P.x} ${P.y} L ${M.x} ${M.y} Z`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={A.x - 15} y={A.y + 5} fill={strokeColor}>A</text>
        <text x={M.x - 5} y={M.y + 20} fill={strokeColor}>M</text>
        <text x={B.x} y={B.y + 15} fill={strokeColor}>B</text>
        <text x={P.x} y={P.y - 5} fill={strokeColor}>P</text>
        <text x={Q.x + 5} y={Q.y + 5} fill={strokeColor}>Q</text>

        {/* SAS Markings */}
        <line x1={A.x + 60} y1={A.y} x2={A.x + 70} y2={A.y} stroke={strokeColor} strokeWidth="2" /> {/* AM */}
        <line x1={Q.x - 60} y1={Q.y} x2={Q.x - 70} y2={Q.y} stroke={strokeColor} strokeWidth="2" /> {/* MQ */}
        
        <line x1={155} y1={140} x2={165} y2={145} stroke={strokeColor} strokeWidth="2" /> {/* BM */}
        <line x1={158} y1={137} x2={168} y2={142} stroke={strokeColor} strokeWidth="2" />
        <line x1={205} y1={80} x2={215} y2={85} stroke={strokeColor} strokeWidth="2" /> {/* PM */}
        <line x1={208} y1={77} x2={218} y2={82} stroke={strokeColor} strokeWidth="2" />

        {/* Angles */}
        <path d={`M ${A.x + 15} ${A.y} A 15 15 0 0 1 ${A.x + 10} ${A.y + 11}`} stroke={angleBlue} {...commonProps} />
        <text x={A.x + 30} y={A.y + 20} fill={angleBlue} fontSize="12">65°</text>
        
        <path d={`M ${Q.x - 15} ${Q.y} A 15 15 0 0 0 ${Q.x - 10} ${Q.y - 11}`} stroke={angleOrange} {...commonProps} />
        <text x={Q.x - 50} y={Q.y - 10} fill={angleOrange} fontSize="12">3x - 7°</text>
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q3 from image) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 200, y: 30 };
  const B = { x: 50, y: 180 };
  const C = { x: 350, y: 180 };
  const M = { x: 200, y: 180 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${M.x} ${M.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={A.x} y={A.y - 10} fill={strokeColor} textAnchor="middle">A</text>
        <text x={B.x - 15} y={B.y + 5} fill={strokeColor}>B</text>
        <text x={C.x + 5} y={C.y + 5} fill={strokeColor}>C</text>
        <text x={M.x} y={M.y + 15} fill={strokeColor} textAnchor="middle">M</text>

        {/* Markings */}
        <path d={`M ${B.x + 20} ${B.y} A 20 20 0 0 1 ${B.x + 18} ${B.y - 8}`} stroke={angleGreen} {...commonProps} />
        <text x={B.x + 30} y={B.y - 10} fill={angleGreen} fontSize="12">65°</text>
        
        <path d={`M ${C.x - 20} ${C.y} A 20 20 0 0 0 ${C.x - 18} ${C.y - 8}`} stroke={angleOrange} {...commonProps} />
        <text x={C.x - 60} y={C.y - 10} fill={angleOrange} fontSize="12">5x - 5°</text>

        <path d={`M ${M.x - 10} ${M.y - 10} L ${M.x - 10} ${M.y} L ${M.x} ${M.y}`} fill="none" stroke={angleBlue} strokeWidth="2" />
        <line x1={M.x - 40} y1={M.y - 3} x2={M.x - 50} y2={M.y + 3} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={M.x + 40} y1={M.y - 3} x2={M.x + 50} y2={M.y + 3} stroke={strokeColor} strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q4 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 50, y: 110 };
  const M = { x: 180, y: 110 };
  const B = { x: 130, y: 50 };
  const P = { x: 230, y: 170 };
  const Q = { x: 310, y: 110 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Lines */}
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${M.x} ${M.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${Q.x} ${Q.y} L ${P.x} ${P.y} L ${M.x} ${M.y} Z`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={A.x - 15} y={A.y + 5} fill={strokeColor}>A</text>
        <text x={M.x - 5} y={M.y + 20} fill={strokeColor}>M</text>
        <text x={B.x} y={B.y - 5} fill={strokeColor}>B</text>
        <text x={P.x} y={P.y + 15} fill={strokeColor}>P</text>
        <text x={Q.x + 5} y={Q.y + 5} fill={strokeColor}>Q</text>

        {/* SAS Markings */}
        <line x1={A.x + 60} y1={A.y} x2={A.x + 70} y2={A.y} stroke={strokeColor} strokeWidth="2" /> {/* AM */}
        <line x1={Q.x - 60} y1={Q.y} x2={Q.x - 70} y2={Q.y} stroke={strokeColor} strokeWidth="2" /> {/* MQ */}
        
        <line x1={155} y1={80} x2={165} y2={85} stroke={strokeColor} strokeWidth="2" /> {/* BM */}
        <line x1={158} y1={77} x2={168} y2={82} stroke={strokeColor} strokeWidth="2" />
        <line x1={205} y1={140} x2={215} y2={145} stroke={strokeColor} strokeWidth="2" /> {/* PM */}
        <line x1={208} y1={137} x2={218} y2={142} stroke={strokeColor} strokeWidth="2" />

        {/* Angles */}
        <path d={`M ${A.x + 15} ${A.y - 10} A 20 20 0 0 1 ${A.x} ${A.y - 20}`} stroke={angleBlue} {...commonProps} />
        <text x={A.x + 30} y={A.y - 15} fill={angleBlue} fontSize="12">80°</text>
        
        <path d={`M ${Q.x - 15} ${Q.y + 10} A 20 20 0 0 0 ${Q.x} ${Q.y + 20}`} stroke={angleOrange} {...commonProps} />
        <text x={Q.x - 50} y={Q.y + 25} fill={angleOrange} fontSize="12">2x + 10°</text>
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function SasSlide3() {
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
      id: 'sas-finding-angles-quiz',
      conceptId: 'sas-finding-angles',
      conceptName: 'SAS Finding Angles',
      type: 'judging',
      description: 'Testing using SAS and CPCTC to find unknown angles'
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
  id: 'sas-find-angle-q3',
  question: 'Find the value of x.',
  figure: <FigureQ1 />,
  options: [
    "13°",
    "15°",
    "14°",
    "50°",
    "65°"
  ],
  correctAnswer: "14°",
  explanation:
    "The line AM is perpendicular to BC, and BM is equal to MC. So AM is the perpendicular bisector of BC. This creates two congruent right triangles: triangle AMB and triangle AMC. Because they are congruent, angle B is equal to angle C. So we set 65 = 5x - 5. Solving gives 5x = 70, so x = 14."
},
{
  id: 'sas-find-angle-q4',
  question: 'Find the value of x.',
  figure: <FigureQ2 />,
  options: [
    "40°",
    "85°",
    "80°",
    "70°",
    "35°"
  ],
  correctAnswer: "35°",
  explanation:
    "The triangles are congruent by the SAS rule. We know AM = QM (side), BM = PM (side), and the angles at M are vertical angles, so they are equal (included angle). Because the triangles are congruent, angle A equals angle Q. So we set 80 = 2x + 10. Solving gives 2x = 70, so x = 35."
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
      interactionId: `sas-find-angle-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sas-finding-angles',
      conceptName: 'SAS Finding Angles',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Finding an Angle Using SAS</h2>
            <p className="text-lg leading-relaxed mb-4">
              Find the value of x.
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              First, notice that ∠AMB and ∠QMP are <strong>vertical angles</strong>, which means they are congruent.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Now, ΔAMB and ΔQMP are congruent by the SAS criterion since we have the following pairs of congruent sides and included angles:
            </p>
            <ul className="list-none my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg font-mono">
                <li>AM ≅ MQ (Side)</li>
                <li>BM ≅ MP (Side)</li>
                <li>∠AMB ≅ ∠QMP (Included Angle)</li>
            </ul>

            <p className="text-lg leading-relaxed mt-4">
              Therefore, all the corresponding angles must be congruent (CPCTC). In particular, <strong>∠A ≅ ∠Q</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Hence,
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono">
              m∠Q = m∠A<br/>
              3x - 7° = 65°<br/>
              3x = 72°<br/>
              x = 24°
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
      slideId="sas-finding-angles"
      slideTitle="Finding the Measure of an Angle Using SAS"
      moduleId="congruence"
      submoduleId="sas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}