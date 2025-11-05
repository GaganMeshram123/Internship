import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE FOR EXAMPLE (Left Side) ---
// Note: Markings are corrected to match the example's explanation (ABC ≅ PQR)
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  // T1 (ABC)
  const T1 = { A: { x: 30, y: 180 }, B: { x: 170, y: 180 }, C: { x: 130, y: 50 } };
  // T2 (PQR)
  const T2 = { P: { x: 230, y: 180 }, Q: { x: 370, y: 180 }, R: { x: 330, y: 50 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* T1 (ABC) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>A</text>
        <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>B</text>
        <text x={T1.C.x} y={T1.C.y - 10} fill={strokeColor} textAnchor="middle">C</text>
        {/* Markings for ABC */}
        <line x1={90} y1={177} x2={110} y2={183} stroke={strokeColor} strokeWidth="1.5" /> {/* AB (1) */}
        <line x1={150} y1={115} x2={160} y2={120} stroke={strokeColor} strokeWidth="1.5" /> {/* BC (2) */}
        <line x1={153} y1={112} x2={163} y2={117} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={70} y1={115} x2={80} y2={120} stroke={strokeColor} strokeWidth="1.5" /> {/* AC (3) */}
        <line x1={73} y1={112} x2={83} y2={117} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={76} y1={109} x2={86} y2={114} stroke={strokeColor} strokeWidth="1.5" />
        {/* Angles */}
        <path d={`M ${T1.B.x - 15} ${T1.B.y} A 15 15 0 0 0 ${T1.B.x - 13} ${T1.B.y - 7}`} stroke={angleOrange} {...commonProps} />
        <text x={T1.B.x - 30} y={T1.B.y - 10} fill={angleOrange} fontSize="12">57°</text>
        <path d={`M ${T1.C.x - 8} ${T1.C.y + 13} A 15 15 0 0 1 ${T1.C.x + 8} ${T1.C.y + 13}`} stroke={angleBlue} {...commonProps} />
        <text x={T1.C.x} y={T1.C.y + 30} fill={angleBlue} fontSize="12" textAnchor="middle">49°</text>

        {/* T2 (PQR) */}
        <path d={`M ${T2.P.x} ${T2.P.y} L ${T2.Q.x} ${T2.Q.y} L ${T2.R.x} ${T2.R.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.P.x - 15} y={T2.P.y + 5} fill={strokeColor}>P</text>
        <text x={T2.Q.x + 5} y={T2.Q.y + 5} fill={strokeColor}>Q</text>
        <text x={T2.R.x} y={T2.R.y - 10} fill={strokeColor} textAnchor="middle">R</text>
        {/* Markings for PQR */}
        <line x1={290} y1={177} x2={310} y2={183} stroke={strokeColor} strokeWidth="1.5" /> {/* PQ (1) */}
        <line x1={350} y1={115} x2={360} y2={120} stroke={strokeColor} strokeWidth="1.5" /> {/* QR (2) */}
        <line x1={353} y1={112} x2={363} y2={117} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={270} y1={115} x2={280} y2={120} stroke={strokeColor} strokeWidth="1.5" /> {/* PR (3) */}
        <line x1={273} y1={112} x2={283} y2={117} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={276} y1={109} x2={286} y2={114} stroke={strokeColor} strokeWidth="1.5" />
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
  
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 30, y: 140 }, B: { x: 130, y: 140 }, C: { x: 130, y: 30 } };
  const T2 = { X: { x: 230, y: 140 }, Y: { x: 370, y: 140 }, Z: { x: 320, y: 30 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* T1 (ABC) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>A</text>
        <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>B</text>
        <text x={T1.C.x + 5} y={T1.C.y} fill={strokeColor}>C</text>
        <text x={T1.B.x + 5} y={T1.B.y - 40} fill={strokeColor}>5</text>
        {/* Markings */}
        <line x1={75} y1={137} x2={85} y2={143} stroke={strokeColor} strokeWidth="1.5" /> {/* AB (1) */}
        <line x1={127} y1={80} x2={133} y2={90} stroke={strokeColor} strokeWidth="1.5" /> {/* BC (2) */}
        <line x1={70} y1={80} x2={80} y2={85} stroke={strokeColor} strokeWidth="1.5" /> {/* AC (3) */}
        <line x1={73} y1={77} x2={83} y2={82} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={76} y1={74} x2={86} y2={79} stroke={strokeColor} strokeWidth="1.5" />
        {/* Angles */}
        <path d={`M ${T1.B.x - 12} ${T1.B.y} L ${T1.B.x - 12} ${T1.B.y - 12} L ${T1.B.x} ${T1.B.y - 12}`} fill="none" stroke={angleOrange} strokeWidth="2" />
        <path d={`M ${T1.C.x} ${T1.C.y + 15} A 15 15 0 0 1 ${T1.C.x - 13} ${T1.C.y + 6}`} stroke={angleBlue} {...commonProps} />
        <text x={T1.C.x - 20} y={T1.C.y + 30} fill={angleBlue} fontSize="12">47°</text>


        {/* T2 (XYZ) */}
        <path d={`M ${T2.X.x} ${T2.X.y} L ${T2.Y.x} ${T2.Y.y} L ${T2.Z.x} ${T2.Z.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.X.x - 15} y={T2.X.y + 5} fill={strokeColor}>X</text>
        <text x={T2.Y.x + 5} y={T2.Y.y + 5} fill={strokeColor}>Y</text>
        <text x={T2.Z.x + 5} y={T2.Z.y} fill={strokeColor}>Z</text>
        <text x={T2.Z.x - 5} y={T2.Z.y + 50} fill={strokeColor}>5</text>
        {/* Markings */}
        <line x1={270} y1={137} x2={280} y2={143} stroke={strokeColor} strokeWidth="1.5" /> {/* XY (1) */}
        <line x1={265} y1={80} x2={275} y2={85} stroke={strokeColor} strokeWidth="1.5" /> {/* XZ (2) */}
        <line x1={340} y1={80} x2={350} y2={85} stroke={strokeColor} strokeWidth="1.5" /> {/* YZ (3) */}
        <line x1={343} y1={77} x2={353} y2={82} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={346} y1={74} x2={356} y2={79} stroke={strokeColor} strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q6 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 100, y: 30 }, B: { x: 30, y: 140 }, C: { x: 170, y: 140 } };
  const T2 = { P: { x: 230, y: 140 }, Q: { x: 370, y: 140 }, R: { x: 300, y: 30 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* T1 (ABC) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x} y={T1.A.y - 10} fill={strokeColor} textAnchor="middle">A</text>
        <text x={T1.B.x - 15} y={T1.B.y + 5} fill={strokeColor}>B</text>
        <text x={T1.C.x + 5} y={T1.C.y + 5} fill={strokeColor}>C</text>
        <text x={(T1.B.x + T1.C.x)/2} y={T1.B.y + 15} fill={strokeColor}>5</text>
        {/* Markings */}
        <line x1={55} y1={80} x2={65} y2={85} stroke={strokeColor} strokeWidth="1.5" /> {/* AB (1) */}
        <line x1={145} y1={80} x2={155} y2={85} stroke={strokeColor} strokeWidth="1.5" /> {/* AC (2) */}
        <line x1={148} y1={77} x2={158} y2={82} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={90} y1={137} x2={110} y2={143} stroke={strokeColor} strokeWidth="1.5" /> {/* BC (3) */}
        <line x1={93} y1={134} x2={113} y2={140} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={96} y1={131} x2={116} y2={137} stroke={strokeColor} strokeWidth="1.5" />
        {/* Angles */}
        <path d={`M ${T1.A.x - 12} ${T1.A.y + 13} A 15 15 0 0 1 ${T1.A.x + 12} ${T1.A.y + 13}`} stroke={angleBlue} {...commonProps} />
        <text x={T1.A.x} y={T1.A.y + 40} fill={angleBlue} fontSize="12" textAnchor="middle">82°</text>
        <path d={`M ${T1.B.x + 15} ${T1.B.y} A 15 15 0 0 1 ${T1.B.x + 13.6} ${T1.B.y - 6.5}`} stroke={angleOrange} {...commonProps} />
        <text x={T1.B.x + 25} y={T1.B.y - 10} fill={angleOrange} fontSize="12">58°</text>

        {/* T2 (PQR) */}
        <path d={`M ${T2.P.x} ${T2.P.y} L ${T2.Q.x} ${T2.Q.y} L ${T2.R.x} ${T2.R.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.P.x - 15} y={T2.P.y + 5} fill={strokeColor}>P</text>
        <text x={T2.Q.x + 5} y={T2.Q.y + 5} fill={strokeColor}>Q</text>
        <text x={T2.R.x} y={T2.R.y - 10} fill={strokeColor} textAnchor="middle">R</text>
        <text x={(T2.P.x + T2.Q.x)/2} y={T2.P.y + 15} fill={strokeColor}>5</text>
        {/* Markings */}
        <line x1={255} y1={80} x2={265} y2={85} stroke={strokeColor} strokeWidth="1.5" /> {/* PR (1) */}
        <line x1={345} y1={80} x2={355} y2={85} stroke={strokeColor} strokeWidth="1.5" /> {/* QR (2) */}
        <line x1={348} y1={77} x2={358} y2={82} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={290} y1={137} x2={310} y2={143} stroke={strokeColor} strokeWidth="1.5" /> {/* PQ (3) */}
        <line x1={293} y1={134} x2={313} y2={140} stroke={strokeColor} strokeWidth="1.5" />
        <line x1={296} y1={131} x2={316} y2={137} stroke={strokeColor} strokeWidth="1.5" />
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function SssSlide4() {
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
      id: 'sss-finding-angles-quiz',
      conceptId: 'sss-finding-angles',
      conceptName: 'SSS Finding Angles',
      type: 'judging',
      description: 'Testing using SSS and CPCTC to find unknown angles'
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
      id: 'sss-find-angle-q5',
      question: 'Given the triangles ΔABC and ΔXYZ shown above, find m∠X.',
      figure: <FigureQ1 />,
      options: [
        "37°",
        "90°",
        "43°",
        "47°",
        "53°"
      ],
      correctAnswer: "90°",
      explanation: "Correct! The triangles are congruent by SSS: $AB \cong XY$ (1 hash), $BC \cong XZ$ (2 hashes, length 5), and $AC \cong YZ$ (3 hashes). By CPCTC, corresponding angles are congruent. $\angle X$ corresponds to $\angle B$. Since $m\angle B = 90^\circ$, $m\angle X = 90^\circ$."
    },
    {
      id: 'sss-find-angle-q6',
      question: 'Given the triangles ΔABC and ΔPQR shown above, find m∠R.',
      figure: <FigureQ2 />,
      options: [
        "43°",
        "82°",
        "40°",
        "60°",
        "58°"
      ],
      correctAnswer: "82°",
      explanation: "Correct! The triangles are congruent by SSS: $AB \cong QR$ (2 hashes), $BC \cong PQ$ (3 hashes, length 5), and $AC \cong PR$ (1 hash). By CPCTC, corresponding angles are congruent. $\angle R$ corresponds to $\angle A$. Since $m\angle A = 82^\circ$, $m\angle R = 82^\circ$."
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
      interactionId: `sss-find-angle-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sss-finding-angles',
      conceptName: 'SSS Finding Angles',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Applying SSS to Find Angles</h2>
            <p className="text-lg leading-relaxed mb-4">
              Given the triangles ΔABC and ΔPQR shown below, find m∠P.
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              From the diagram, ΔABC and ΔPQR are congruent by SSS (side-side-side). Therefore, we have:
            </p>
            <ul className="list-none my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg font-mono text-center">
                <li>∠B ≅ ∠Q</li>
                <li>∠C ≅ ∠R</li>
            </ul>

            <p className="text-lg leading-relaxed mt-4">
              Since the sum of the measures of the angles in a triangle is 180°, we have
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono">
              m∠P + m∠Q + m∠R = 180°<br/>
              m∠P + m∠B + m∠C = 180°<br/>
              m∠P + 57° + 49° = 180°<br/>
              m∠P + 106° = 180°<br/>
              m∠P = 74°
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
      slideId="sss-finding-angles"
      slideTitle="Applying the SSS Criterion to Find Measures of Angles"
      moduleId="congruence"
      submoduleId="sss-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}