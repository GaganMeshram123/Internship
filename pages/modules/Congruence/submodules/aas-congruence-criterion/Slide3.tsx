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
  
  const angleYellow = isDarkMode ? '#FDE047' : '#EAB308';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const anglePurple = isDarkMode ? '#C084FC' : '#9333EA';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 50, y: 180 };
  const B = { x: 100, y: 100 };
  const C = { x: 130, y: 40 };
  const D = { x: 280, y: 180 };
  const E = { x: 200, y: 130 };
  const F = { x: 165, y: 108 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Lines */}
        <path d={`M ${A.x} ${A.y} L ${C.x} ${C.y} L ${D.x} ${D.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${E.x} ${E.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${B.x} ${B.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} />

        {/* Labels */}
        <text x={A.x - 15} y={A.y + 5} fill={strokeColor}>A</text>
        <text x={B.x - 15} y={B.y} fill={strokeColor}>B</text>
        <text x={C.x} y={C.y - 10} fill={strokeColor}>C</text>
        <text x={D.x + 5} y={D.y + 5} fill={strokeColor}>D</text>
        <text x={E.x + 5} y={E.y + 5} fill={strokeColor}>E</text>
        <text x={F.x + 5} y={F.y + 5} fill={strokeColor}>F</text>

        {/* Angles & Given */}
        <text x={B.x} y={B.y + 15} fill={angleYellow} fontSize="12">65°</text>
        <path d={`M ${B.x - 8} ${B.y - 8} A 15 15 0 0 1 ${B.x + 8} ${B.y - 5}`} stroke={angleYellow} {...commonProps} />
        
        <text x={E.x} y={E.y + 15} fill={anglePurple} fontSize="12">5x + 15°</text>
        <path d={`M ${E.x - 8} ${E.y - 8} A 15 15 0 0 1 ${E.x + 8} ${E.y - 5}`} stroke={anglePurple} {...commonProps} />

        <path d={`M ${C.x - 12} ${C.y + 12} A 15 15 0 0 1 ${C.x + 5} ${C.y + 10}`} stroke={angleBlue} {...commonProps} />
        <path d={`M ${D.x - 12} ${D.y - 5} A 15 15 0 0 0 ${D.x} ${D.y - 15}`} stroke={angleBlue} {...commonProps} />
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
  
  const angleYellow = isDarkMode ? '#FDE047' : '#EAB308';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const anglePurple = isDarkMode ? '#C084FC' : '#9333EA';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 100, y: 50 };
  const B = { x: 100, y: 180 };
  const C = { x: 300, y: 80 };
  const D = { x: 300, y: 150 };
  const E = { x: 200, y: 115 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`50 0 ${svgWidth} ${svgHeight}`}>
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${D.x} ${D.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${B.x} ${B.y} L ${A.x} ${A.y} L ${C.x} ${C.y} Z`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${B.x} ${B.y} L ${C.x} ${C.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={A.x - 15} y={A.y} fill={strokeColor}>A</text>
        <text x={B.x - 15} y={B.y + 5} fill={strokeColor}>B</text>
        <text x={C.x + 5} y={C.y} fill={strokeColor}>C</text>
        <text x={D.x + 5} y={D.y + 5} fill={strokeColor}>D</text>
        <text x={E.x + 5} y={E.y} fill={strokeColor}>E</text>

        {/* Angles & Given */}
        <text x={A.x + 5} y={A.y + 30} fill={angleYellow} fontSize="12">72°</text>
        <path d={`M ${A.x + 15} ${A.y + 12} A 20 20 0 0 1 ${A.x} ${A.y + 20}`} stroke={angleYellow} {...commonProps} />
        
        <text x={B.x + 5} y={B.y - 25} fill={angleOrange} fontSize="12">3x + 9°</text>
        <path d={`M ${B.x + 15} ${B.y - 12} A 20 20 0 0 0 ${B.x} ${B.y - 20}`} stroke={angleOrange} {...commonProps} />

        <path d={`M ${C.x - 15} ${C.y} A 15 15 0 0 0 ${C.x} ${C.y + 15}`} stroke={anglePurple} {...commonProps} />
        <path d={`M ${D.x - 15} ${D.y} A 15 15 0 0 1 ${D.x} ${D.y - 15}`} stroke={anglePurple} {...commonProps} />
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
  const anglePurple = isDarkMode ? '#C084FC' : '#9333EA';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 50, y: 180 };
  const B = { x: 350, y: 180 };
  const C = { x: 200, y: 180 };
  const D = { x: 120, y: 80 };
  const E = { x: 280, y: 40 };
  const F = { x: 240, y: 110 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Lines */}
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${E.x} ${E.y} L ${A.x} ${A.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${A.x} ${A.y} L ${D.x} ${D.y} L ${B.x} ${B.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${C.x} ${C.y} L ${E.x} ${E.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${D.x} ${D.y} L ${B.x} ${B.y}`} stroke={strokeColor} {...commonProps} />

        {/* Labels */}
        <text x={A.x - 15} y={A.y + 5} fill={strokeColor}>A</text>
        <text x={B.x + 5} y={B.y + 5} fill={strokeColor}>B</text>
        <text x={C.x} y={C.y + 15} fill={strokeColor} textAnchor="middle">C</text>
        <text x={D.x - 15} y={D.y} fill={strokeColor}>D</text>
        <text x={E.x + 5} y={E.y} fill={strokeColor}>E</text>
        <text x={F.x + 5} y={F.y} fill={strokeColor}>F</text>
        <text x={F.x + 10} y={F.y + 15} fill={strokeColor} fontSize="12">g</text>
        <text x={C.x - 30} y={C.y - 20} fill={angleBlue} fontSize="12">3x + 12°</text>

        {/* Angles & Markings */}
        <path d={`M ${D.x} ${D.y} l 10 0 l 0 10`} stroke={angleOrange} {...commonProps} /> {/* 90 deg at D */}
        <path d={`M ${E.x - 14} ${E.y + 8} l 10 0 l 0 -10`} stroke={anglePurple} {...commonProps} /> {/* 90 deg at E */}
        <path d={`M ${C.x} ${C.y - 15} A 20 20 0 0 1 ${C.x - 18} ${C.y - 8}`} stroke={angleBlue} {...commonProps} />
        
        <line x1={F.x} y1={F.y} x2={F.x + 5} y2={F.y + 5} stroke={strokeColor} strokeWidth="2" /> {/* CF=g */}
        <line x1={E.x-10} y1={E.y+35} x2={E.x} y2={E.y+30} stroke={strokeColor} strokeWidth="2" /> {/* CE */}
        <line x1={D.x+20} y1={D.y+20} x2={D.x+25} y2={D.y+25} stroke={strokeColor} strokeWidth="2" /> {/* BD */}
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function AasSlide3() {
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
      id: 'aas-finding-angles-quiz',
      conceptId: 'aas-finding-angles',
      conceptName: 'AAS Finding Angles',
      type: 'judging',
      description: 'Testing using AAS and CPCTC to find unknown angles'
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

  // --- UPDATED QUESTIONS ARRAY (REMOVED $) ---
  const questions: QuizQuestion[] = [
    {
      id: 'aas-find-angle-q3',
      question: 'In the figure above, \u2220DBA \u2245 \u2220BAC. What is the value of x?',
      figure: <FigureQ1 />,
      options: [
        "68°",
        "18°",
        "21°",
        "32°",
        "72°"
      ],
      correctAnswer: "21°",
      explanation: "Correct! We can prove \u0394ABC \u2245 \u0394BAD by AAS. We are given \u2220C \u2245 \u2220D (Angle) and \u2220BAC \u2245 \u2220DBA (Angle). They also share the side AB (Side). Since \u2220BAC \u2245 \u2220DBA, we set their values equal: 72 = 3x + 9. Solving gives 3x = 63, so x = 21."
    },
    {
      id: 'aas-find-angle-q4',
      question: 'In the figure above, BD \u2245 CE. What is the value of x?',
      figure: <FigureQ2 />,
      options: [
        "13°",
        "90°",
        "30°",
        "45°",
        "26°"
      ],
      correctAnswer: "26°",
      explanation: "This is tricky! First, prove \u0394ABD \u2245 \u0394ACE by AAS: \u2220A is common (Angle), \u2220BDA \u2245 \u2220CEA (both 90\u00B0) (Angle), and BD \u2245 CE (Side). By CPCTC, \u2220ABD \u2245 \u2220ACE. The diagram labels \u2220ACD as 3x+12 and the angle \u2220ACE as 90\u00B0. We must assume the blue square applies to \u2220ACD. Thus, 3x + 12 = 90, which gives 3x = 78, and x = 26."
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
      interactionId: `aas-find-angle-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'aas-finding-angles',
      conceptName: 'AAS Finding Angles',
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

        {/* Left Column - Content (UPDATED, REMOVED $) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Finding an Angle Using AAS</h2>
            <p className="text-lg leading-relaxed mb-4">
              In the figure below, BD ≅ CE. What is the value of x?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              Notice that ΔABD and ΔAEC are congruent by AAS since we have the following pairs of congruent angles and corresponding non-included sides:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <strong>BD ≅ CE</strong> (Given Side)
                </li>
                <li>
                  <strong>∠C ≅ ∠D</strong> (Given Angle, i.e., ∠ACE ≅ ∠ADB)
                </li>
                <li>
                  <strong>∠A</strong> is their common angle (Angle).
                </li>
            </ul>

            <p className="text-lg leading-relaxed mt-4">
              Therefore, all the corresponding angles of the triangles must be congruent. In particular, <strong>∠ABD ≅ ∠AEC</strong>. So, we have
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono">
              m∠AEC = m∠ABD<br/>
              5x + 15° = 65°<br/>
              5x = 50°<br/>
              x = 10°
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Application Practice</h3>
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
                  {score === questions.length ? "Perfectly done!" : 'Great work!'}
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
      slideId="aas-finding-angles"
      slideTitle="Finding the Measure of an Angle Using AAS"
      moduleId="congruence"
      submoduleId="aas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}