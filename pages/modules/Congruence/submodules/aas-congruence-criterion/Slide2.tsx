import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
/* import { useThemeContext } from '@/lib/ThemeContext';
 */

// --- MOCK HOOK FOR SNIPPET TO RUN ---
const useThemeContext = () => ({ isDarkMode: false });
// -------------------------------------

type Point = { x: number; y: number };

// --- HELPER FUNCTIONS FOR GEOMETRIC CALCULATIONS ---

const getVector = (p1: Point, p2: Point) => ({ x: p2.x - p1.x, y: p2.y - p1.y });
const dotProduct = (v1: Point, v2: Point) => v1.x * v2.x + v1.y * v2.y;
const magnitude = (v: Point) => Math.sqrt(v.x * v.x + v.y * v.y);

const getAngleBetweenVectors = (v1: Point, v2: Point) => {
  const angle = Math.acos(dotProduct(v1, v2) / (magnitude(v1) * magnitude(v2)));
  return isNaN(angle) ? 0 : angle;
};

/**
 * Generates an SVG path for an angle arc.
 */
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

  if (magV1 === 0 || magV2 === 0) return ''; // Avoid division by zero

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

/**
 * Generates SVG paths for hash marks on a side.
 */
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

  const perpV = { x: -v.y / len, y: v.x / len }; // Perpendicular vector normalized
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

/**
 * Calculates a good position for a triangle label.
 */
const getTriangleLabelPosition = (
  vertices: { A: Point; B: Point; C: Point },
  anchor: keyof typeof vertices = 'A',
  offsetX: number = 0,
  offsetY: number = -10,
) => {
  // Simple strategy: offset from a specific vertex
  const anchorPoint = vertices[anchor];
  return { x: anchorPoint.x + offsetX, y: anchorPoint.y + offsetY };
};


// --- FRAMER MOTION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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


// --- FIGURE FOR EXAMPLE (Left Side) ---
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 280;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';

  const angle1 = isDarkMode ? '#FDE047' : '#EAB308'; // Yellow
  const angle2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const angle3 = isDarkMode ? '#F87171' : '#EF4444'; // Red/Orange
  const sideColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  // Triangle Defs (Unchanged)
  const T = { A: { x: 80, y: 120 }, B: { x: 180, y: 120 }, C: { x: 160, y: 30 } };
  const P1 = { A: { x: 250, y: 30 }, B: { x: 300, y: 120 }, C: { x: 370, y: 80 } };
  const P2 = { A: { x: 30, y: 250 }, B: { x: 170, y: 250 }, C: { x: 80, y: 160 } };
  const P3 = { A: { x: 230, y: 250 }, B: { x: 370, y: 250 }, C: { x: 320, y: 160 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <motion.svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Triangle T --- */}
        <motion.g variants={containerVariants}>
          <motion.path
            d={`M ${T.A.x} ${T.A.y} L ${T.B.x} ${T.B.y} L ${T.C.x} ${T.C.y} Z`}
            stroke={strokeColor}
            {...commonProps}
            variants={drawVariant}
          />
          <motion.text
            {...getTriangleLabelPosition(T, 'A', -10, -5)}
            fill={labelColor}
            fontSize="14"
            variants={fadeVariant}
          >
            T
          </motion.text>
          <AnimatedAngleArc p1={T.B} vertex={T.A} p2={T.C} color={angle1} commonProps={commonProps} />
          <AnimatedAngleArc p1={T.A} vertex={T.C} p2={T.B} color={angle2} commonProps={commonProps} />
          <AnimatedSideMarks p1={T.B} p2={T.C} numMarks={2} color={sideColor} commonProps={commonProps} />
        </motion.g>

        {/* --- Triangle P1 --- */}
        <motion.g variants={containerVariants}>
          <motion.path
            d={`M ${P1.A.x} ${P1.A.y} L ${P1.B.x} ${P1.B.y} L ${P1.C.x} ${P1.C.y} Z`}
            stroke={strokeColor}
            {...commonProps}
            variants={drawVariant}
          />
          <motion.text
            {...getTriangleLabelPosition(P1, 'A', 0, -5)}
            fill={labelColor}
            fontSize="14"
            textAnchor="middle"
            variants={fadeVariant}
          >
            P₁
          </motion.text>
          <AnimatedAngleArc p1={P1.C} vertex={P1.B} p2={P1.A} color={angle1} commonProps={commonProps} />
          <AnimatedAngleArc p1={P1.B} vertex={P1.A} p2={P1.C} color={angle2} commonProps={commonProps} />
          <AnimatedSideMarks p1={P1.B} p2={P1.C} numMarks={2} color={sideColor} commonProps={commonProps} />
        </motion.g>

        {/* --- Triangle P2 --- */}
        <motion.g variants={containerVariants}>
          <motion.path
            d={`M ${P2.A.x} ${P2.A.y} L ${P2.B.x} ${P2.B.y} L ${P2.C.x} ${P2.C.y} Z`}
            stroke={strokeColor}
            {...commonProps}
            variants={drawVariant}
          />
          <motion.text
            {...getTriangleLabelPosition(P2, 'C', 0, -5)}
            fill={labelColor}
            fontSize="14"
            textAnchor="middle"
            variants={fadeVariant}
          >
            P₂
          </motion.text>
          <AnimatedAngleArc p1={P2.B} vertex={P2.A} p2={P2.C} color={angle1} commonProps={commonProps} />
          <AnimatedAngleArc p1={P2.A} vertex={P2.C} p2={P2.B} color={angle3} commonProps={commonProps} />
          <AnimatedSideMarks p1={P2.B} p2={P2.C} numMarks={2} color={sideColor} commonProps={commonProps} />
        </motion.g>

        {/* --- Triangle P3 --- */}
        <motion.g variants={containerVariants}>
          <motion.path
            d={`M ${P3.A.x} ${P3.A.y} L ${P3.B.x} ${P3.B.y} L ${P3.C.x} ${P3.C.y} Z`}
            stroke={strokeColor}
            {...commonProps}
            variants={drawVariant}
          />
          <motion.text
             {...getTriangleLabelPosition(P3, 'C', 0, -5)}
            fill={labelColor}
            fontSize="14"
            textAnchor="middle"
            variants={fadeVariant}
          >
            P₃
          </motion.text>
          <AnimatedSideMarks p1={P3.A} p2={P3.B} numMarks={2} color={sideColor} commonProps={commonProps} />
          {/* Note: Original code had 2 marks on P3's AB side. Replicated here. */}
        </motion.g>
      </motion.svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Pentagon) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';

  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const anglePurple = isDarkMode ? '#C084FC' : '#9333EA';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 200, y: 30 };
  const B = { x: 80, y: 80 };
  const C = { x: 120, y: 180 };
  const D = { x: 200, y: 200 };
  const E = { x: 280, y: 180 };
  const F = { x: 320, y: 80 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <motion.svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Draw all lines */}
        <motion.path
          d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} L ${E.x} ${E.y} L ${F.x} ${F.y} Z`}
          stroke={strokeColor}
          fill={isDarkMode ? 'rgb(30 41 59 / 0.5)' : 'rgb(241 245 249 / 0.5)'}
          variants={drawVariant}
        />
        <motion.path d={`M ${A.x} ${A.y} L ${C.x} ${C.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${A.x} ${A.y} L ${E.x} ${E.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />

        {/* Labels */}
        <motion.text x={A.x} y={A.y - 10} fill={labelColor} textAnchor="middle" variants={fadeVariant}>A</motion.text>
        <motion.text x={B.x - 15} y={B.y} fill={labelColor} variants={fadeVariant}>B</motion.text>
        <motion.text x={C.x - 15} y={C.y + 5} fill={labelColor} variants={fadeVariant}>C</motion.text>
        <motion.text x={D.x} y={D.y + 15} fill={labelColor} textAnchor="middle" variants={fadeVariant}>D</motion.text>
        <motion.text x={E.x + 5} y={E.y + 5} fill={labelColor} variants={fadeVariant}>E</motion.text>
        <motion.text x={F.x + 5} y={F.y} fill={labelColor} variants={fadeVariant}>F</motion.text>

        {/* Markings - Now using robust helpers */}
        <AnimatedAngleArc p1={B} vertex={A} p2={F} color={angleBlue} commonProps={{...commonProps, strokeWidth: 3}} radius={20} />
        <AnimatedAngleArc p1={C} vertex={D} p2={E} color={anglePurple} commonProps={{...commonProps, strokeWidth: 3}} radius={20} />
        <AnimatedAngleArc p1={A} vertex={B} p2={C} color={angleOrange} commonProps={{...commonProps, strokeWidth: 3}} radius={15} />
        <AnimatedAngleArc p1={A} vertex={F} p2={E} color={angleOrange} commonProps={{...commonProps, strokeWidth: 3}} radius={15} />

        <AnimatedSideMarks p1={B} p2={C} numMarks={1} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={F} p2={E} numMarks={1} color={strokeColor} commonProps={commonProps} />
        
        <AnimatedSideMarks p1={A} p2={B} numMarks={2} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={A} p2={F} numMarks={2} color={strokeColor} commonProps={commonProps} />
      </motion.svg>
    </div>
  );
};


// --- FIGURE FOR QUIZ QUESTION 2 (T, P1, P2, P3) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 280;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';

  const angle1 = isDarkMode ? '#FDE047' : '#EAB308'; // Yellow
  const angle2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const angle3 = isDarkMode ? '#F87171' : '#EF4444'; // Red/Orange
  const sideColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T = { A: { x: 30, y: 120 }, B: { x: 170, y: 120 }, C: { x: 80, y: 30 } };
  const P1 = { A: { x: 250, y: 30 }, B: { x: 300, y: 120 }, C: { x: 370, y: 80 } };
  const P2 = { A: { x: 30, y: 250 }, B: { x: 170, y: 250 }, C: { x: 80, y: 160 } };
  const P3 = { A: { x: 230, y: 250 }, B: { x: 370, y: 250 }, C: { x: 320, y: 160 } };

  const greenSquare = (p: Point, variants: any) => (
    <motion.path
      d={`M ${p.x} ${p.y} l 12 0 l 0 12 l -12 0 Z`}
      fill={angle2}
      stroke="none"
      variants={variants}
    />
  );

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <motion.svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* --- Triangle T --- */}
        <motion.g variants={containerVariants}>
          <motion.path
            d={`M ${T.A.x} ${T.A.y} L ${T.B.x} ${T.B.y} L ${T.C.x} ${T.C.y} Z`}
            stroke={strokeColor}
            {...commonProps}
            variants={drawVariant}
          />
          <motion.text
            {...getTriangleLabelPosition(T, 'C', 10, -5)}
            fill={labelColor}
            fontSize="14"
            variants={fadeVariant}
          >
            T
          </motion.text>
          <AnimatedAngleArc p1={T.B} vertex={T.A} p2={T.C} color={angle1} commonProps={commonProps} />
          {greenSquare({ x: T.C.x, y: T.C.y }, fadeVariant)}
          <AnimatedSideMarks p1={T.B} p2={T.C} numMarks={1} color={sideColor} commonProps={commonProps} />
        </motion.g>

        {/* --- Triangle P1 --- */}
        <motion.g variants={containerVariants}>
          <motion.path
            d={`M ${P1.A.x} ${P1.A.y} L ${P1.B.x} ${P1.B.y} L ${P1.C.x} ${P1.C.y} Z`}
            stroke={strokeColor}
            {...commonProps}
            variants={drawVariant}
          />
          <motion.text
            {...getTriangleLabelPosition(P1, 'B', -10, 10)}
            fill={labelColor}
            fontSize="14"
            variants={fadeVariant}
          >
            P₁
          </motion.text>
          <AnimatedAngleArc p1={P1.B} vertex={P1.C} p2={P1.A} color={angle3} commonProps={commonProps} />
          {greenSquare({ x: P1.A.x, y: P1.A.y }, fadeVariant)}
          <AnimatedSideMarks p1={P1.B} p2={P1.C} numMarks={1} color={sideColor} commonProps={commonProps} />
        </motion.g>

        {/* --- Triangle P2 --- */}
        <motion.g variants={containerVariants}>
          <motion.path
            d={`M ${P2.A.x} ${P2.A.y} L ${P2.B.x} ${P2.B.y} L ${P2.C.x} ${P2.C.y} Z`}
            stroke={strokeColor}
            {...commonProps}
            variants={drawVariant}
          />
          <motion.text
            {...getTriangleLabelPosition(P2, 'C', 0, -5)}
            fill={labelColor}
            fontSize="14"
            textAnchor="middle"
            variants={fadeVariant}
          >
            P₂
          </motion.text>
          <AnimatedAngleArc p1={P2.A} vertex={P2.B} p2={P2.C} color={angle3} commonProps={commonProps} />
          {greenSquare({ x: P2.C.x, y: P2.C.y }, fadeVariant)}
          <AnimatedSideMarks p1={P2.B} p2={P2.C} numMarks={1} color={sideColor} commonProps={commonProps} />
        </motion.g>

        {/* --- Triangle P3 --- */}
        <motion.g variants={containerVariants}>
          <motion.path
            d={`M ${P3.A.x} ${P3.A.y} L ${P3.B.x} ${P3.B.y} L ${P3.C.x} ${P3.C.y} Z`}
            stroke={strokeColor}
            {...commonProps}
            variants={drawVariant}
          />
          <motion.text
            {...getTriangleLabelPosition(P3, 'C', 0, -5)}
            fill={labelColor}
            fontSize="14"
            textAnchor="middle"
            variants={fadeVariant}
          >
            P₃
          </motion.text>
          {greenSquare({ x: P3.C.x, y: P3.C.y }, fadeVariant)}
          <AnimatedSideMarks p1={P3.A} p2={P3.B} numMarks={1} color={sideColor} commonProps={commonProps} />
        </motion.g>
      </motion.svg>
    </div>
  );
};


export default function AasSlide2() {
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
      id: 'aas-identification-quiz',
      conceptId: 'aas-identification',
      conceptName: 'AAS Identification',
      type: 'judging',
      description: 'Testing ability to identify AAS congruence'
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
      id: 'aas-id-q1-pentagon',
      question: 'According to the AAS criterion only, which of the following triangles is congruent to triangle ABC?',
      figure: <FigureQ1 />,
      options: [
        "Triangle AEB",
        "Triangle ACD",
        "Triangle ADE",
        "Triangle AFE",
        "Triangle ABD"
      ],
      correctAnswer: "Triangle AFE",
      explanation:
        "Correct! Triangle ABC and Triangle AFE match the Angle-Angle-Side (AAS) pattern. Angle B matches angle F, and BC matches FE. Also, angle A in triangle ABC matches angle A in triangle AFE. The side is not between the two angles, so this is AAS."
    },
    {
      id: 'aas-id-q2-triangles',
      question: 'According to the AAS criterion only, which of the following triangles is congruent to triangle T?',
      figure: <FigureQ2 />,
      options: [
        "Triangle P1 only",
        "Triangle P2 and P3 only",
        "Triangle P3 only",
        "Triangle P1 and P2 only",
        "Triangle P2 only"
      ],
      correctAnswer: "Triangle P1 only",
      explanation:
        "Correct! Triangle T has two angles marked (one yellow and one right angle) and a side that is not between these angles. Triangle P1 also has two matching angles and a non-included side. So Triangle T and Triangle P1 match by AAS."
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
      interactionId: `aas-id-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'aas-identification',
      conceptName: 'AAS Identification',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Identifying AAS Congruence</h2>
            <p className="text-lg leading-relaxed mb-4">
              According to the AAS criterion only, which of the following triangles are congruent to T?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              The AAS (angle-angle-side) congruence criterion states:
            </p>
            <blockquote className="my-4 p-4 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg italic font-medium leading-relaxed">
                Two triangles are congruent if and only if two angles and a corresponding <strong>non-included side</strong> of one triangle are congruent to two angles and a corresponding non-included side of the other triangle.
              </p>
            </blockquote>

            <p className="text-lg leading-relaxed mt-4">
              Let's examine each triangle:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>P₁ is congruent to T</strong> by AAS, because it has two matching angles (yellow and green) and a non-included side (2 hash marks) that match triangle T.
              </li>
              <li>
                <strong>P₂ is congruent to T</strong> by AAS. It also has two matching angles (yellow and orange) and the same non-included side match (2 hash marks). This means the green angle in T matches the orange angle in P₂.
              </li>
              <li>
                <strong>P₃ is not congruent to T</strong> because we do not have two matching angles to apply AAS.
              </li>
            </ul>

            <p className="text-lg leading-relaxed mt-4 font-semibold">
              Therefore, the correct answer is P₁ and P₂ only.
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Identification Practice</h3>
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
                <div className="text-3xl mb-4">🧐</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Great job spotting the patterns!" : 'Good practice!'}
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
      slideId="aas-identification"
      slideTitle="Identifying Congruence Using AAS"
      moduleId="congruence"
      submoduleId="aas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}