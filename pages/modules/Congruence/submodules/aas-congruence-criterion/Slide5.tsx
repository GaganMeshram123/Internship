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


// --- FIGURE FOR EXAMPLE (Left Side) ---
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angleTeal = isDarkMode ? '#2DD4BF' : '#0D9488';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const Q = { x: 30, y: 140 };
  const S = { x: 370, y: 140 };
  const R = { x: 120, y: 50 };
  const T = { x: 280, y: 50 };
  const O = { x: 200, y: 95 };

  // Calculate label positions
  const labelTQS_pos = getAngleLabelPosition(T, Q, S, 30);
  const labelRSQ_pos = getAngleLabelPosition(R, S, Q, 30);

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
        {/* Triangles */}
        <motion.path d={`M ${Q.x} ${Q.y} L ${S.x} ${S.y} L ${R.x} ${R.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${Q.x} ${Q.y} L ${S.x} ${S.y} L ${T.x} ${T.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${R.x} ${R.y} L ${S.x} ${S.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${T.x} ${T.y} L ${Q.x} ${Q.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        
        {/* Labels */}
        <motion.text x={Q.x - 15} y={Q.y + 5} fill={labelColor} variants={fadeVariant}>Q</motion.text>
        <motion.text x={S.x + 5} y={S.y + 5} fill={labelColor} variants={fadeVariant}>S</motion.text>
        <motion.text x={R.x} y={R.y - 10} fill={labelColor} variants={fadeVariant}>R</motion.text>
        <motion.text x={T.x} y={T.y - 10} fill={labelColor} variants={fadeVariant}>T</motion.text>
        <motion.text x={O.x} y={O.y + 5} fill={labelColor} textAnchor="middle" variants={fadeVariant}>O</motion.text>

        {/* --- IMPROVED Angles & Markings --- */}
        {/* Angle R (∠SRQ) */}
        <AnimatedAngleArc p1={S} vertex={R} p2={Q} color={angleTeal} commonProps={commonProps} radius={15} />
        {/* Angle T (∠QTS) */}
        <AnimatedAngleArc p1={Q} vertex={T} p2={S} color={angleTeal} commonProps={commonProps} radius={15} />

        {/* Angle TQS */}
        <AnimatedAngleArc p1={T} vertex={Q} p2={S} color={strokeColor} commonProps={commonProps} radius={20} />
        <motion.text
          {...labelTQS_pos}
          fill={labelColor}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          35°
        </motion.text>

        {/* Angle RSQ */}
        <AnimatedAngleArc p1={R} vertex={S} p2={Q} color={strokeColor} commonProps={commonProps} radius={20} />
        <motion.text
          {...labelRSQ_pos}
          fill={labelColor}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          6x - 7°
        </motion.text>
        
        {/* Common Side QS */}
        <AnimatedSideMarks p1={Q} p2={S} numMarks={1} color={strokeColor} commonProps={commonProps} />
      </motion.svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q7 from image) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angleYellow = isDarkMode ? '#FDE047' : '#EAB308';
  const anglePurple = isDarkMode ? '#C084FC' : '#9333EA';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 170, y: 140 }, B: { x: 50, y: 140 }, C: { x: 50, y: 30 } };
  const T2 = { D: { x: 370, y: 140 }, E: { x: 250, y: 140 }, F: { x: 250, y: 30 } };

  // Calculate side label positions
  const labelAC_pos = { x: (T1.A.x + T1.C.x) / 2 + 10, y: (T1.A.y + T1.C.y) / 2 };
  const labelDF_pos = { x: (T2.D.x + T2.F.x) / 2 + 10, y: (T2.D.y + T2.F.y) / 2 };


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
        <motion.path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.text x={T1.A.x + 5} y={T1.A.y + 5} fill={labelColor} variants={fadeVariant}>A</motion.text>
        <motion.text x={T1.B.x - 15} y={T1.B.y + 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
        <motion.text x={T1.C.x - 15} y={T1.C.y} fill={labelColor} variants={fadeVariant}>C</motion.text>
        <motion.text
          {...labelAC_pos}
          fill={labelColor}
          variants={fadeVariant}
          dominantBaseline="middle"
        >
          2x + 1
        </motion.text>
        <RightAngleBox vertex={T1.B} p1={T1.A} p2={T1.C} color={anglePurple} commonProps={commonProps} />
        <AnimatedAngleArc p1={T1.B} vertex={T1.A} p2={T1.C} color={angleYellow} commonProps={commonProps} radius={15} />
        <AnimatedSideMarks p1={T1.A} p2={T1.C} numMarks={1} color={strokeColor} commonProps={commonProps} />

        {/* T2 (DEF) */}
        <motion.path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.text x={T2.D.x + 5} y={T2.D.y + 5} fill={labelColor} variants={fadeVariant}>D</motion.text>
        <motion.text x={T2.E.x - 15} y={T2.E.y + 5} fill={labelColor} variants={fadeVariant}>E</motion.text>
        <motion.text x={T2.F.x - 15} y={T2.F.y} fill={labelColor} variants={fadeVariant}>F</motion.text>
        <motion.text
          {...labelDF_pos}
          fill={labelColor}
          variants={fadeVariant}
          dominantBaseline="middle"
        >
          3x - 6
        </motion.text>
        <RightAngleBox vertex={T2.E} p1={T2.D} p2={T2.F} color={anglePurple} commonProps={commonProps} />
        <AnimatedAngleArc p1={T2.E} vertex={T2.D} p2={T2.F} color={angleYellow} commonProps={commonProps} radius={15} />
        <AnimatedSideMarks p1={T2.D} p2={T2.F} numMarks={1} color={strokeColor} commonProps={commonProps} />
      </motion.svg>
    </div>
  );
};


// --- FIGURE FOR QUIZ QUESTION 2 (Q8 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angleYellow = isDarkMode ? '#FDE047' : '#EAB308';
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 170, y: 140 }, B: { x: 30, y: 140 }, C: { x: 130, y: 30 } };
  const T2 = { D: { x: 370, y: 140 }, E: { x: 230, y: 140 }, F: { x: 270, y: 30 } };

  // Calculate label positions
  const labelB_pos = getAngleLabelPosition(T1.A, T1.B, T1.C, 25);
  const labelE_pos = getAngleLabelPosition(T2.D, T2.E, T2.F, 25);

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
        <motion.path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.text x={T1.A.x + 5} y={T1.A.y + 5} fill={labelColor} variants={fadeVariant}>A</motion.text>
        <motion.text x={T1.B.x - 15} y={T1.B.y + 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
        <motion.text x={T1.C.x} y={T1.C.y - 5} fill={labelColor} variants={fadeVariant}>C</motion.text>
        
        <motion.text
          {...labelB_pos}
          fill={angleYellow}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          2x + 5°
        </motion.text>
        <AnimatedAngleArc p1={T1.A} vertex={T1.B} p2={T1.C} color={angleYellow} commonProps={commonProps} radius={15} />
        <AnimatedAngleArc p1={T1.B} vertex={T1.A} p2={T1.C} color={angleGreen} commonProps={commonProps} radius={15} />
        <AnimatedSideMarks p1={T1.A} p2={T1.C} numMarks={1} color={strokeColor} commonProps={commonProps} />

        {/* T2 (DEF) */}
        <motion.path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.text x={T2.D.x + 5} y={T2.D.y + 5} fill={labelColor} variants={fadeVariant}>D</motion.text>
        <motion.text x={T2.E.x - 15} y={T2.E.y + 5} fill={labelColor} variants={fadeVariant}>E</motion.text>
        <motion.text x={T2.F.x + 5} y={T2.F.y - 5} fill={labelColor} variants={fadeVariant}>F</motion.text>
        
        <motion.text
          {...labelE_pos}
          fill={angleYellow}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          55°
        </motion.text>
        <AnimatedAngleArc p1={T2.D} vertex={T2.E} p2={T2.F} color={angleYellow} commonProps={commonProps} radius={15} />
        <AnimatedAngleArc p1={T2.E} vertex={T2.D} p2={T2.F} color={angleGreen} commonProps={commonProps} radius={15} />
        <AnimatedSideMarks p1={T2.D} p2={T2.F} numMarks={1} color={strokeColor} commonProps={commonProps} />
        {/* Double mark on DE from original code */}
        <AnimatedSideMarks p1={T2.D} p2={T2.E} numMarks={2} color={strokeColor} commonProps={commonProps} />
      </motion.svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function AasSlide5() {
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
      id: 'aas-correct-statements-quiz',
      conceptId: 'aas-correct-statements',
      conceptName: 'AAS Correct Statements',
      type: 'judging',
      description: 'Testing final validation of AAS congruence statements'
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

  const questions: QuizQuestion[] = [
    {
      id: 'aas-statements-q7',
      question: 'From the diagram, which of the following statements are true?',
      figure: <FigureQ1 />,
      statements: [
        'I.   Triangle ABC is congruent to Triangle DEF by AAS',
        'II.  x = 5',
        'III. Angle C is equal to Angle F'
      ],
      options: [
        "I only",
        "III only",
        "I and III only",
        "II only",
        "I and II only"
      ],
      correctAnswer: "I and III only",
      explanation:
        "Correct! Statement I is true because we have two pairs of equal angles and one non-included side equal, which fits the AAS rule. Statement III is also true by CPCTC, meaning matching angles are equal after proving congruence. Statement II is false. Using the matching sides, BC equals EF, so set 2x + 1 = 3x - 6. Solving gives x = 7, not 5."
    },
    {
      id: 'aas-statements-q8',
      question: 'From the diagram, which of the following statements are true?',
      figure: <FigureQ2 />,
      statements: [
        'I.   Triangle ABC is congruent to Triangle DEF by AAS',
        'II.  AB = DE',
        'III. x = 27.5°'
      ],
      options: [
        "I only",
        "I and III only",
        "II only",
        "III only",
        "I and II only"
      ],
      correctAnswer: "I and II only",
      explanation:
        "Correct! Statement I is true because we have two pairs of matching angles and a matching non-included side, so AAS applies. Statement II is true by CPCTC, meaning corresponding sides are equal. Statement III is false. Since angle B equals angle E, set 2x + 5 = 55. Solving gives x = 25, not 27.5."
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
      interactionId: `aas-correct-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'aas-correct-statements',
      conceptName: 'AAS Correct Statements',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Identifying Correct Statements</h2>
            <p className="text-lg leading-relaxed mb-4">
              From the diagram, which of the following statements are true?
            </p>
            <ul className="list-none p-4 mb-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg font-mono">
              <li>I.   ΔQST ≅ ΔSQR by AAS</li>
              <li>II.  QR ≅ TS</li>
              <li>III. x = 14°</li>
            </ul>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              Let's examine each of the given statements in turn.
            </p>

            <ul className="list-disc list-inside mt-4 text-lg space-y-3 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Statement I is true.</strong> ΔQST and ΔSQR are congruent by AAS since we have the following pairs of congruent angles and corresponding non-included sides:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>QS</strong> is their common side (Side).</li>
                  <li><strong>∠R ≅ ∠T</strong> (Given Angle).</li>
                  <li><strong>∠TQS ≅ ∠RSQ</strong> (Given Angle).</li>
                </ul>
              </li>
              <li>
                <strong>Statement II is true.</strong> Since the triangles are congruent, all the corresponding sides must be congruent. In particular, <strong>QR ≅ TS</strong>.
              </li>
              <li>
                <strong>Statement III is false.</strong> From the diagram, ∠SQT ≅ ∠QSR. Hence,
                <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg font-mono">
                  m∠RSQ = m∠TQS<br/>
                  6x - 7° = 35°<br/>
                  6x = 42°<br/>
                  x = 7°
                </div>
              </li>
            </ul>
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              Therefore, the correct answer is "I and II only."
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Is the Statement Correct?</h3>
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
                <div className="text-3xl mb-4">👍</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You're a congruence detective!" : 'Great job analyzing the diagrams!'}
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
      slideId="aas-correct-statements"
      slideTitle="Identifying Correct Statements Using the AAS Criterion"
      moduleId="congruence"
      submoduleId="aas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}