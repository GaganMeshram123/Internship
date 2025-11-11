import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- GEOMETRIC HELPER FUNCTIONS & TYPES ---

type Point = { x: number; y: number };

const getVector = (p1: Point, p2: Point) => ({ x: p2.x - p1.x, y: p2.y - p1.y });
const dotProduct = (v1: Point, v2: Point) => v1.x * v2.x + v1.y * v2.y;
const magnitude = (v: Point) => {
  const mag = Math.sqrt(v.x * v.x + v.y * v.y);
  return mag === 0 ? 1e-6 : mag; // Avoid division by zero
};

const getAngleBetweenVectors = (v1: Point, v2: Point) => {
  const v1Mag = magnitude(v1);
  const v2Mag = magnitude(v2);
  const angle = Math.acos(dotProduct(v1, v2) / (v1Mag * v2Mag));
  return isNaN(angle) ? 0 : angle;
};

const getAngleArcPath = (
  p1: Point,
  vertex: Point,
  p2: Point,
  radius: number = 15,
) => {
  const v1 = getVector(vertex, p1);
  const v2 = getVector(vertex, p2);
  const magV1 = magnitude(v1);
  const magV2 = magnitude(v2);

  const nv1 = { x: v1.x / magV1, y: v1.y / magV1 };
  const nv2 = { x: v2.x / magV2, y: v2.y / magV2 };

  const start = { x: vertex.x + nv1.x * radius, y: vertex.y + nv1.y * radius };
  const end = { x: vertex.x + nv2.x * radius, y: vertex.y + nv2.y * radius };

  const angle = getAngleBetweenVectors(v1, v2);
  const largeArcFlag = angle > Math.PI ? 1 : 0;
  const crossProduct = v1.x * v2.y - v1.y * v2.x;
  const sweepFlag = crossProduct > 0 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
};

const getAngleLabelPosition = (
  p1: Point,
  vertex: Point,
  p2: Point,
  offset: number = 25,
) => {
  const v1 = getVector(vertex, p1);
  const v2 = getVector(vertex, p2);
  const nv1 = { x: v1.x / magnitude(v1), y: v1.y / magnitude(v1) };
  const nv2 = { x: v2.x / magnitude(v2), y: v2.y / magnitude(v2) };

  const bisectorV = { x: nv1.x + nv2.x, y: nv1.y + nv2.y };
  const magBisector = magnitude(bisectorV);
  const nBisectorV = magBisector < 1e-6 
    ? { x: -nv1.y, y: nv1.x }
    : { x: bisectorV.x / magBisector, y: bisectorV.y / magBisector };

  return {
    x: vertex.x + nBisectorV.x * offset,
    y: vertex.y + nBisectorV.y * offset,
  };
};

// --- ANIMATED GEOMETRY COMPONENTS ---

interface AnimatedAngleArcProps {
  p1: Point;
  vertex: Point;
  p2: Point;
  color: string;
  radius?: number;
  commonProps: any;
  // Animation props to fix TS error
  variants?: any;
  custom?: any;
  initial?: string;
  animate?: string;
}

const AnimatedAngleArc: React.FC<AnimatedAngleArcProps> = ({ 
  p1, vertex, p2, color, radius, commonProps, 
  variants, custom, initial, animate 
}) => {
  const pathD = getAngleArcPath(p1, vertex, p2, radius);
  return (
    <motion.path
      d={pathD}
      stroke={color}
      {...commonProps}
      // Pass all animation props
      variants={variants}
      custom={custom}
      initial={initial}
      animate={animate}
    />
  );
};


// --- ASA ANIMATION COMPONENT DEFINED INSIDE ---
const AsaAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 240; 
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angle1Color = isDarkMode ? '#2DD4BF' : '#0D9488'; 
  const sideColor = isDarkMode ? '#60A5FA' : '#2563EB';
  const angle2Color = isDarkMode ? '#F472B6' : '#DB2777';

  const T1 = { A: { x: 30, y: 180 }, B: { x: 150, y: 180 }, C: { x: 105, y: 50 } };
  const T2 = { K: { x: 250, y: 180 }, L: { x: 370, y: 180 }, M: { x: 325, y: 50 } };

  const commonProps = { fill: 'none', strokeWidth: 2 };

  const anim = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      pathLength: 1,
      transition: { delay, duration: 0.5, ease: 'easeInOut' }
    }),
  };

  const lineAnim = {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: { delay, duration: 0.5 }
    }),
  };

  const textAnim = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (delay: number) => ({
      opacity: 1, scale: 1,
      transition: { delay, duration: 0.5 }
    }),
  };
  
  // Calculate label positions
  const labelA1Pos = getAngleLabelPosition(T1.B, T1.A, T1.C, 30);
  const labelKPos = getAngleLabelPosition(T2.L, T2.K, T2.M, 30);
  const labelBPos = getAngleLabelPosition(T1.A, T1.B, T1.C, 30);
  const labelLPos = getAngleLabelPosition(T2.K, T2.L, T2.M, 30);

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>

        {/* Triangles */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x - 15} y={T1.A.y + 5} fill={labelColor} fontSize="14">A</text>
        <text x={T1.B.x + 5} y={T1.B.y + 5} fill={labelColor} fontSize="14">B</text>
        <text x={T1.C.x} y={T1.C.y - 10} fill={labelColor} fontSize="14" textAnchor="middle">C</text>

        <path d={`M ${T2.K.x} ${T2.K.y} L ${T2.L.x} ${T2.L.y} L ${T2.M.x} ${T2.M.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.K.x - 15} y={T2.K.y + 5} fill={labelColor} fontSize="14">K</text>
        <text x={T2.L.x + 5} y={T2.L.y + 5} fill={labelColor} fontSize="14">L</text>
        <text x={T2.M.x} y={T2.M.y - 10} fill={labelColor} fontSize="14" textAnchor="middle">M</text>

        {/* ANGLE 1 */}
        <AnimatedAngleArc 
          p1={T1.B} vertex={T1.A} p2={T1.C} 
          color={angle1Color} 
          commonProps={commonProps} 
          radius={20} 
          variants={anim} 
          initial="hidden" 
          animate="visible" 
          custom={0.5}
        />
        <motion.text 
          {...labelA1Pos} 
          fill={angle1Color} 
          fontSize="12" 
          variants={textAnim} initial="hidden" animate="visible" custom={0.7}
          textAnchor="middle" dominantBaseline="middle"
        >
          45°
        </motion.text>

        <AnimatedAngleArc 
          p1={T2.L} vertex={T2.K} p2={T2.M} 
          color={angle1Color} 
          commonProps={commonProps} 
          radius={20} 
          variants={anim} 
          initial="hidden" 
          animate="visible" 
          custom={0.5}
        />
        <motion.text 
          {...labelKPos}
          fill={angle1Color} 
          fontSize="12" 
          variants={textAnim} initial="hidden" animate="visible" custom={0.7}
          textAnchor="middle" dominantBaseline="middle"
        >
          45°
        </motion.text>

        {/* SIDE (Unchanged, as it's a line highlight, not a hash mark) */}
        <motion.line x1={30} y1={180} x2={150} y2={180} stroke={sideColor} strokeWidth="6" variants={lineAnim} initial="hidden" animate="visible" custom={1.5}/>
        <motion.text x={90} y={175} fill={sideColor} fontSize="12" textAnchor="middle" variants={textAnim} initial="hidden" animate="visible" custom={1.7}>5</motion.text>

        <motion.line x1={250} y1={180} x2={370} y2={180} stroke={sideColor} strokeWidth="6" variants={lineAnim} initial="hidden" animate="visible" custom={1.5}/>
        <motion.text x={310} y={175} fill={sideColor} fontSize="12" textAnchor="middle" variants={textAnim} initial="hidden" animate="visible" custom={1.7}>5</motion.text>

        {/* ANGLE 2 */}
        <AnimatedAngleArc 
          p1={T1.A} vertex={T1.B} p2={T1.C} 
          color={angle2Color} 
          commonProps={commonProps} 
          radius={20} 
          variants={anim} 
          initial="hidden" 
          animate="visible" 
          custom={2.5}
        />
        <motion.text 
          {...labelBPos} 
          fill={angle2Color} 
          fontSize="12" 
          variants={textAnim} initial="hidden" animate="visible" custom={2.7}
          textAnchor="middle" dominantBaseline="middle"
        >
          79°
        </motion.text>

        <AnimatedAngleArc 
          p1={T2.K} vertex={T2.L} p2={T2.M} 
          color={angle2Color} 
          commonProps={commonProps} 
          radius={20} 
          variants={anim} 
          initial="hidden" 
          animate="visible" 
          custom={2.5}
        />
        <motion.text 
          {...labelLPos} 
          fill={angle2Color} 
          fontSize="12" 
          variants={textAnim} initial="hidden" animate="visible" custom={2.7}
          textAnchor="middle" dominantBaseline="middle"
        >
          79°
        </motion.text>

        {/* >>> CLEAN CENTERED A S A LABEL <<< */}
        <motion.text x={svgWidth / 2 - 40} y={svgHeight - 65} fill={angle1Color} fontSize="16" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={2.0}>A</motion.text>

        <motion.text x={svgWidth / 2} y={svgHeight - 65} fill={sideColor} fontSize="16" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={2.2}>S</motion.text>

        <motion.text x={svgWidth / 2 + 40} y={svgHeight - 65} fill={angle2Color} fontSize="16" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={2.4}>A</motion.text>

        {/* FINAL STATEMENT (Replaced HTML entities) */}
        <motion.text x={svgWidth / 2} y={svgHeight - 15} fill={strokeColor} fontSize="18" fontWeight="bold" textAnchor="middle"
          variants={textAnim} initial="hidden" animate="visible" custom={3.5}>
          ∴ △ABC ≅ △KLM
        </motion.text>

      </svg>
    </div>
  );
};
// --- END ---


export default function AsaSlide1() {
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
      id: 'asa-intro-quiz',
      conceptId: 'asa-criterion-intro',
      conceptName: 'ASA Criterion Introduction',
      type: 'judging',
      description: 'Testing understanding of the ASA criterion components'
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
      id: 'asa-intro-q1-meaning',
      question: 'In the ASA rule, what is special about the side S?',
      options: [
        "It is the longest side",
        "It is the side between the two angles",
        "It is the shortest side",
        "It does not matter which side it is"
      ],
      correctAnswer: "It is the side between the two angles",
      explanation:
        "Correct! In ASA, the side must be the one that lies between the two known angles. This is called the included side."
    },
    {
      id: 'asa-intro-q2-requirement',
      question: 'To use ASA to prove triangles are congruent, we must know two angles and...',
      options: [
        "Any matching side",
        "A matching altitude",
        "The side between those two angles",
        "All three sides"
      ],
      correctAnswer: "The side between those two angles",
      explanation:
        "Correct! ASA stands for Angle-Side-Angle. The side must be the one that is directly between the two angles."
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
      interactionId: `asa-intro-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'asa-criterion-intro',
      conceptName: 'ASA Criterion Introduction',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Introduction</h2>
            <p className="text-lg leading-relaxed mb-4">
              The <strong>angle-side-angle (ASA)</strong> congruence criterion can be used as a shortcut to prove that two triangles are congruent. It states the following:
            </p>

            <blockquote className="my-4 p-4 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg italic font-medium leading-relaxed">
                Two triangles are congruent if and only if two angles and <strong>the included side</strong> of one triangle are congruent to two angles and the included side of the other triangle.
              </p>
            </blockquote>

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">To demonstrate, consider the triangles below.</h3>
            
            <div className="space-y-2 text-lg">
              <p>We can see that two pairs of angles are congruent:</p>
              <div className="pl-4 font-mono">
                <p>∠A ≅ ∠K</p>
                <p>∠B ≅ ∠L</p>
              </div>
            </div>

            <div className="space-y-2 text-lg mt-4">
              <p>Also, we see that the included sides are congruent:</p>
              <div className="pl-4 font-mono">
                <p>AB ≅ KL</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-lg leading-relaxed">
                Therefore, the ASA congruence criterion guarantees that these two triangles are congruent, and we can write:
              </p>
              <p className="text-xl font-bold text-center my-4 font-mono text-blue-600 dark:text-blue-400">
                △ABC ≅ △KLM
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (STRUCTURE UNCHANGED) */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-4empty">Visualizing the Example</h3>
            
            <AsaAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Watch how the matching Angle (A), then the included Side (S), then the next Angle (A) "lock in" the congruence.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD (UNCHANGED) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
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
            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
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
                <div className="text-3xl mb-4">✅</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered the basics!" : 'Great job!'}
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
      slideId="asa-introduction"
      slideTitle="Introduction to the ASA Criterion"
      moduleId="congruence"
      submoduleId="asa-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}