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

const getSideMarksPath = (
  p1: Point,
  p2: Point,
  numMarks: number,
  markLength: number = 8,
  spacing: number = 3,
) => {
  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;
  const v = getVector(p1, p2);
  const len = magnitude(v);
  if (len === 0) return '';

  const perpV = { x: -v.y / len, y: v.x / len };
  const totalWidth = (numMarks - 1) * spacing;
  let paths = '';
  
  for (let i = 0; i < numMarks; i++) {
    const offset = (-totalWidth / 2) + i * spacing;
    const start = {
      x: midX + perpV.x * (markLength / 2) + (v.x / len) * offset,
      y: midY + perpV.y * (markLength / 2) + (v.y / len) * offset,
    };
    const end = {
      x: midX - perpV.x * (markLength / 2) + (v.x / len) * offset,
      y: midY - perpV.y * (markLength / 2) + (v.y / len) * offset,
    };
    paths += `M ${start.x} ${start.y} L ${end.x} ${end.y} `;
  }
  return paths.trim();
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

// --- ANIMATION VARIANTS ---
const groupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const drawVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: 'spring', duration: 1.5, bounce: 0 },
      opacity: { duration: 0.01, delay: 0.1 },
    },
  },
};

const fadeVariant = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.2,
    },
  },
};

// --- ANIMATED GEOMETRY COMPONENTS ---

interface AnimatedAngleArcProps {
  p1: Point;
  vertex: Point;
  p2: Point;
  color: string;
  radius?: number;
  commonProps: any;
}

const AnimatedAngleArc: React.FC<AnimatedAngleArcProps> = ({ p1, vertex, p2, color, radius, commonProps }) => {
  const pathD = getAngleArcPath(p1, vertex, p2, radius);
  return <motion.path d={pathD} stroke={color} {...commonProps} variants={drawVariant} />;
};

interface AnimatedSideMarksProps {
  p1: Point;
  p2: Point;
  numMarks: number;
  color: string;
  commonProps: any;
}

const AnimatedSideMarks: React.FC<AnimatedSideMarksProps> = ({ p1, p2, numMarks, color, commonProps }) => {
  const pathD = getSideMarksPath(p1, p2, numMarks);
  return <motion.path d={pathD} stroke={color} strokeLinecap="round" {...commonProps} variants={drawVariant} strokeWidth="1.5" />;
};

const RightAngleBox: React.FC<{ vertex: Point, p1: Point, p2: Point, color: string, size?: number, commonProps: any }> = 
  ({ vertex, p1, p2, color, size = 10, commonProps }) => {
  const v1 = getVector(vertex, p1);
  const v2 = getVector(vertex, p2);
  const nv1 = { x: v1.x / magnitude(v1), y: v1.y / magnitude(v1) };
  const nv2 = { x: v2.x / magnitude(v2), y: v2.y / magnitude(v2) };

  const p1_on_line = { x: vertex.x + nv1.x * size, y: vertex.y + nv1.y * size };
  const p2_on_line = { x: vertex.x + nv2.x * size, y: vertex.y + nv2.y * size };
  const corner_point = { x: p1_on_line.x + nv2.x * size, y: p1_on_line.y + nv2.y * size };

  const pathD = `M ${p1_on_line.x} ${p1_on_line.y} L ${corner_point.x} ${corner_point.y} L ${p2_on_line.x} ${p2_on_line.y}`;
  
  return <motion.path d={pathD} stroke={color} {...commonProps} variants={drawVariant} />;
};


// --- FIGURE FOR EXAMPLE (Left Side) & QUIZ Q1 ---
const FigureQ1: React.FC<{isExample: boolean}> = ({ isExample }) => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const anglePink = isDarkMode ? '#F472B6' : '#DB2777';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const angleGray = isDarkMode ? '#94A3B8' : '#64748B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const Q = { x: 200, y: 30 };
  const R = { x: 50, y: 180 };
  const P = { x: 350, y: 180 };
  const A = { x: 200, y: 180 };
  
  const labelRPos = getAngleLabelPosition(Q, R, A, 30);
  const labelPPos = getAngleLabelPosition(Q, P, A, 30);

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <motion.svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        variants={groupVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.path d={`M ${Q.x} ${Q.y} L ${R.x} ${R.y} L ${P.x} ${P.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${Q.x} ${Q.y} L ${A.x} ${A.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        
        {/* Labels */}
        <motion.text x={Q.x} y={Q.y - 10} fill={labelColor} textAnchor="middle" variants={fadeVariant}>Q</motion.text>
        <motion.text x={R.x - 15} y={R.y + 5} fill={labelColor} variants={fadeVariant}>R</motion.text>
        <motion.text x={P.x + 5} y={P.y + 5} fill={labelColor} variants={fadeVariant}>P</motion.text>
        <motion.text x={A.x} y={A.y + 15} fill={labelColor} textAnchor="middle" variants={fadeVariant}>A</motion.text>

        {/* --- IMPROVED Markings --- */}
        <AnimatedSideMarks p1={Q} p2={R} numMarks={2} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={Q} p2={P} numMarks={2} color={strokeColor} commonProps={commonProps} />
        
        <RightAngleBox vertex={A} p1={Q} p2={R} color={angleBlue} commonProps={commonProps} />
        
        {/* Conditional text based on prop */}
        {isExample ? (
          <>
            <AnimatedAngleArc p1={Q} vertex={R} p2={A} color={angleGray} commonProps={commonProps} radius={20} />
            <motion.text
              {...labelRPos}
              fill={labelColor}
              fontSize="12"
              variants={fadeVariant}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              70°
            </motion.text>
            
            <AnimatedAngleArc p1={Q} vertex={P} p2={A} color={anglePink} commonProps={commonProps} radius={20} />
            <motion.text
              {...labelPPos}
              fill={anglePink}
              fontSize="12"
              variants={fadeVariant}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              3x + 13°
            </motion.text>
          </>
        ) : (
          <>
            <AnimatedAngleArc p1={Q} vertex={R} p2={A} color={angleGray} commonProps={commonProps} radius={20} />
            <motion.text
              {...labelRPos}
              fill={labelColor}
              fontSize="12"
              variants={fadeVariant}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              32°
            </motion.text>
            
            <AnimatedAngleArc p1={Q} vertex={P} p2={A} color={anglePink} commonProps={commonProps} radius={20} />
            <motion.text
              {...labelPPos}
              fill={anglePink}
              fontSize="12"
              variants={fadeVariant}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              2x + 12°
            </motion.text>
          </>
        )}
      </motion.svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q4 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const anglePink = isDarkMode ? '#F472B6' : '#DB2777';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 100, y: 30 }, B: { x: 30, y: 140 }, C: { x: 170, y: 140 } };
  const T2 = { P: { x: 300, y: 30 }, Q: { x: 230, y: 140 }, R: { x: 370, y: 140 } };
  
  const labelAPos = getAngleLabelPosition(T1.B, T1.A, T1.C, 25);
  const labelRPos = getAngleLabelPosition(T2.Q, T2.R, T2.P, 25);

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <motion.svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        variants={groupVariants}
        initial="hidden"
        animate="visible"
      >
        {/* T1 (ABC) */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={T1.A.x} y={T1.A.y - 10} fill={labelColor} textAnchor="middle" variants={fadeVariant}>A</motion.text>
          <motion.text x={T1.B.x - 15} y={T1.B.y + 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
          <motion.text x={T1.C.x + 5} y={T1.C.y + 5} fill={labelColor} variants={fadeVariant}>C</motion.text>
          
          {/* Markings */}
          <AnimatedSideMarks p1={T1.A} p2={T1.B} numMarks={1} color={strokeColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={T1.A} p2={T1.C} numMarks={2} color={strokeColor} commonProps={commonProps} />
          
          {/* Angles */}
          <AnimatedAngleArc p1={T1.B} vertex={T1.A} p2={T1.C} color={anglePink} commonProps={commonProps} radius={15} />
          <motion.text
            {...labelAPos}
            fill={anglePink}
            fontSize="12"
            textAnchor="middle"
            variants={fadeVariant}
            dominantBaseline="middle"
          >
            61°
          </motion.text>
          <RightAngleBox vertex={T1.B} p1={T1.A} p2={T1.C} color={angleBlue} commonProps={commonProps} />
        </motion.g>

        {/* T2 (PQR) */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${T2.P.x} ${T2.P.y} L ${T2.Q.x} ${T2.Q.y} L ${T2.R.x} ${T2.R.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={T2.P.x} y={T2.P.y - 10} fill={labelColor} textAnchor="middle" variants={fadeVariant}>P</motion.text>
          <motion.text x={T2.Q.x - 15} y={T2.Q.y + 5} fill={labelColor} variants={fadeVariant}>Q</motion.text>
          <motion.text x={T2.R.x + 5} y={T2.R.y + 5} fill={labelColor} variants={fadeVariant}>R</motion.text>
          
          {/* Markings */}
          <AnimatedSideMarks p1={T2.P} p2={T2.Q} numMarks={1} color={strokeColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={T2.P} p2={T2.R} numMarks={2} color={strokeColor} commonProps={commonProps} />
          
          {/* Angles */}
          <RightAngleBox vertex={T2.Q} p1={T2.P} p2={T2.R} color={angleBlue} commonProps={commonProps} />
          {/* CORRECTED TYPO: Was p2={TP}, now p2={T2.P} */}
          <AnimatedAngleArc p1={T2.Q} vertex={T2.R} p2={T2.P} color={angleOrange} commonProps={commonProps} radius={15} />
          <motion.text
            {...labelRPos}
            fill={angleOrange}
            fontSize="12"
            variants={fadeVariant}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ?
          </motion.text>
        </motion.g>
      </motion.svg>
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

  const questions: QuizQuestion[] = [
    {
      id: 'hl-find-angle-q3',
      question: 'The point A is on the base PR of an isosceles triangle ΔPQR, where ∠QAR is a right angle. If m∠RQA = 32° and m∠PQA = 2x + 12°, what is the value of x?',
      figure: <FigureQ1 isExample={false} />,
      options: [
        "20°",
        "29°",
        "10°",
        "32°",
        "58°"
      ],
      correctAnswer: "10°",
      explanation: "Correct! In isosceles ΔPQR, the altitude QA to the base PR creates two congruent right triangles (ΔQAR ≅ ΔQAP) by HL. By CPCTC, ∠AQR ≅ ∠AQP. So, 32 = 2x + 12. This gives 2x = 20, and x = 10°."
    },
    {
      id: 'hl-find-angle-q4',
      question: 'Given the diagram above, find m∠R.',
      figure: <FigureQ2 />,
      options: [
        "30°",
        "29°",
        "25°",
        "31°",
        "28°"
      ],
      correctAnswer: "29°",
      explanation: "Correct! The triangles are right triangles. Their hypotenuses are congruent (2 hashes) and one pair of legs is congruent (1 hash). By HL, ΔABC ≅ ΔPQR. By CPCTC, ∠C ≅ ∠R. In ΔABC, the angles sum to 180°. So, m∠C = 180° - 90° - 61° = 29°. Therefore, m∠R = 29°."
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

        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Calculating an Angle Using HL</h2>
            <p className="text-lg leading-relaxed mb-4">
              The point A is located on the base PR of an isosceles triangle ΔPQR such that ∠QAR is a right angle. If m∠RQA = 70° and m∠PQA = 3x + 13°, what is the value of x?
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
                <li>A common leg QA</li>
                <li>QR ≅ QP (legs of isosceles triangle are hypotenuses of the right triangles)</li>
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

        {/* Right Column - Animation and Quiz */}
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