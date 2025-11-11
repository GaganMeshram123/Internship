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

// --- ADDED MISSING COMPONENT ---
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
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };
  
  const Q = { x: 30, y: 50 };
  const P = { x: 180, y: 110 };
  const R = { x: 80, y: 170 };
  const M = { x: 370, y: 170 };
  const N = { x: 320, y: 50 };

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
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${Q.x} ${Q.y} L ${P.x} ${P.y} L ${R.x} ${R.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.path d={`M ${M.x} ${M.y} L ${P.x} ${P.y} L ${N.x} ${N.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          
          {/* Labels */}
          <motion.text x={Q.x - 15} y={Q.y} fill={labelColor} variants={fadeVariant}>Q</motion.text>
          <motion.text x={R.x - 15} y={R.y + 5} fill={labelColor} variants={fadeVariant}>R</motion.text>
          <motion.text x={P.x} y={P.y + 20} fill={labelColor} textAnchor="middle" variants={fadeVariant}>P</motion.text>
          <motion.text x={N.x + 5} y={N.y} fill={labelColor} variants={fadeVariant}>N</motion.text>
          <motion.text x={M.x + 5} y={M.y + 5} fill={labelColor} variants={fadeVariant}>M</motion.text>

          {/* Markings */}
          <AnimatedSideMarks p1={Q} p2={P} numMarks={2} color={strokeColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={P} p2={M} numMarks={2} color={strokeColor} commonProps={commonProps} />

          <AnimatedSideMarks p1={P} p2={R} numMarks={1} color={strokeColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={P} p2={N} numMarks={1} color={strokeColor} commonProps={commonProps} />

          {/* Vertical Angles */}
          <AnimatedAngleArc p1={Q} vertex={P} p2={R} color={angleBlue} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={N} vertex={P} p2={M} color={angleBlue} commonProps={commonProps} radius={15} />
        </motion.g>
      </motion.svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q4) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };
  
  const A = { x: 200, y: 110 };
  const B = { x: 300, y: 150 };
  const C = { x: 50, y: 170 };
  const D = { x: 100, y: 70 };
  const E = { x: 350, y: 50 };

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
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${C.x} ${C.y} L ${A.x} ${A.y} L ${B.x} ${B.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.path d={`M ${E.x} ${E.y} L ${A.x} ${A.y} L ${D.x} ${D.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          
          {/* Labels */}
          <motion.text x={A.x} y={A.y + 20} fill={labelColor} textAnchor="middle" variants={fadeVariant}>A</motion.text>
          <motion.text x={B.x + 5} y={B.y + 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
          <motion.text x={C.x - 15} y={C.y + 5} fill={labelColor} variants={fadeVariant}>C</motion.text>
          <motion.text x={D.x - 15} y={D.y} fill={labelColor} variants={fadeVariant}>D</motion.text>
          <motion.text x={E.x + 5} y={E.y} fill={labelColor} variants={fadeVariant}>E</motion.text>

          {/* Markings */}
          <AnimatedSideMarks p1={A} p2={B} numMarks={2} color={strokeColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={A} p2={D} numMarks={2} color={strokeColor} commonProps={commonProps} />
          
          <AnimatedAngleArc p1={A} vertex={B} p2={C} color={angleOrange} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={A} vertex={D} p2={E} color={angleOrange} commonProps={commonProps} radius={15} />
        </motion.g>
      </motion.svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q5) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };
  
  const Y = { x: 80, y: 110 };
  const X = { x: 180, y: 110 };
  const Z = { x: 180, y: 30 };
  const S = { x: 280, y: 110 };
  const T = { x: 180, y: 190 };
  
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
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${Y.x} ${Y.y} L ${Z.x} ${Z.y} L ${S.x} ${S.y} L ${T.x} ${T.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.path d={`M ${Y.x} ${Y.y} L ${S.x} ${S.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          
          {/* Labels */}
          <motion.text x={Y.x - 15} y={Y.y + 5} fill={labelColor} variants={fadeVariant}>Y</motion.text>
          <motion.text x={X.x} y={X.y + 20} fill={labelColor} textAnchor="middle" variants={fadeVariant}>X</motion.text>
          <motion.text x={Z.x + 5} y={Z.y} fill={labelColor} variants={fadeVariant}>Z</motion.text>
          <motion.text x={S.x + 5} y={S.y + 5} fill={labelColor} variants={fadeVariant}>S</motion.text>
          <motion.text x={T.x + 5} y={T.y + 5} fill={labelColor} variants={fadeVariant}>T</motion.text>

          {/* Markings */}
          <AnimatedSideMarks p1={Y} p2={X} numMarks={2} color={strokeColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={X} p2={S} numMarks={2} color={strokeColor} commonProps={commonProps} />

          <AnimatedSideMarks p1={Z} p2={X} numMarks={1} color={strokeColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={T} p2={X} numMarks={1} color={strokeColor} commonProps={commonProps} />
          
          <RightAngleBox vertex={X} p1={Y} p2={Z} color={angleBlue} commonProps={commonProps} />
          {/* Added vertical angle, which is also a right angle */}
          <RightAngleBox vertex={X} p1={S} p2={T} color={angleBlue} commonProps={commonProps} />
        </motion.g>
      </motion.svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 3 (Q1) ---
const FigureQ3: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const anglePink = isDarkMode ? '#F472B6' : '#DB2777';
  const commonProps = { fill: 'none', strokeWidth: 2 };
  
  const A = { x: 150, y: 110 };
  const B = { x: 200, y: 50 };
  const C = { x: 50, y: 50 };
  const X = { x: 300, y: 110 };
  const Y = { x: 250, y: 50 };
  const Z = { x: 350, y: 170 };

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
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.path d={`M ${X.x} ${X.y} L ${Y.x} ${Y.y} L ${Z.x} ${Z.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          
          {/* Labels */}
          <motion.text x={A.x} y={A.y + 20} fill={labelColor} textAnchor="middle" variants={fadeVariant}>A</motion.text>
          <motion.text x={B.x + 5} y={B.y} fill={labelColor} variants={fadeVariant}>B</motion.text>
          <motion.text x={C.x - 15} y={C.y} fill={labelColor} variants={fadeVariant}>C</motion.text>
          <motion.text x={X.x} y={X.y + 20} fill={labelColor} textAnchor="middle" variants={fadeVariant}>X</motion.text>
          <motion.text x={Y.x - 5} y={Y.y} fill={labelColor} variants={fadeVariant}>Y</motion.text>
          <motion.text x={Z.x + 5} y={Z.y + 5} fill={labelColor} variants={fadeVariant}>Z</motion.text>

          {/* Markings */}
          <AnimatedSideMarks p1={A} p2={B} numMarks={2} color={strokeColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={Y} p2={X} numMarks={2} color={strokeColor} commonProps={commonProps} />
          
          <AnimatedAngleArc p1={B} vertex={A} p2={C} color={anglePink} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={Y} vertex={X} p2={Z} color={anglePink} commonProps={commonProps} radius={15} />
          
          <AnimatedAngleArc p1={A} vertex={C} p2={B} color={angleBlue} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={X} vertex={Z} p2={Y} color={angleBlue} commonProps={commonProps} radius={15} />
        </motion.g>
      </motion.svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function CombiningSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'combining-vertical-quiz',
      conceptId: 'combining-criteria-vertical',
      conceptName: 'Combining Criteria Vertical Angles',
      type: 'judging',
      description: 'Testing identification of criteria using vertical angles'
    }
  ];
  
  const allOptions = ["SSS", "SAS", "ASA", "AAS", "HL"];

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
      id: 'combining-vertical-q1',
      question: 'By which congruence criterion does it follow that ΔABC ≅ ΔXYZ?',
      figure: <FigureQ3 />,
      options: allOptions,
      correctAnswer: "AAS",
      explanation: "Correct! We have ∠C ≅ ∠Z (Angle, blue), ∠A ≅ ∠X (Angle, pink), and a non-included side $AB \cong XY$ (Side, 2 hashes). This is an Angle-Angle-Side (AAS) pattern."
    },
    {
      id: 'combining-vertical-q2',
      question: 'By which congruence criterion does it follow that ΔABC ≅ ΔADE?',
      figure: <FigureQ1 />,
      options: allOptions,
      correctAnswer: "ASA",
      explanation: "Correct! We are given $\angle C \cong \angle D$ (Angle, orange) and $AC \cong AD$ (Side, 2 hashes). The *hidden* clue is that $\angle BAC \cong \angle EAD$ are vertical angles (Angle). The side $AC$ is *included* between $\angle C$ and $\angle BAC$. This is an Angle-Side-Angle (ASA) pattern."
    },
    {
      id: 'combining-vertical-q3',
      question: 'By which congruence criterion does it follow that ΔXYZ ≅ ΔXST?',
      figure: <FigureQ2 />,
      options: allOptions,
      correctAnswer: "SAS",
      explanation: "Correct! We are given $YX \cong XS$ (Side, 2 hashes) and $ZX \cong TX$ (Side, 1 hash). The *hidden* clue is that $\angle YXZ \cong \angle SXT$ are vertical angles (Angle). The angle $\angle YXZ$ is *included* between sides $YX$ and $ZX$. This is a Side-Angle-Side (SAS) pattern."
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
      interactionId: `combining-vertical-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'combining-criteria-vertical',
      conceptName: 'Combining Criteria Vertical Angles',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Cases With Vertical Angles</h2>
            <p className="text-lg leading-relaxed mb-4">
              By which congruence criterion does it follow that ΔPQR ≅ ΔPMN?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              First, we recall the SAS (Side-Angle-Side) congruence criterion:
            </p>
            <blockquote className="my-4 p-4 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg italic font-medium leading-relaxed">
                Two triangles are congruent if and only if two sides and the included angle of one triangle are congruent to two sides and the included angle of the other triangle.
              </p>
            </blockquote>

            <p className="text-lg leading-relaxed mt-4">
              Notice that <strong>∠QPR ≅ ∠MPN</strong> since these two angles are <strong>vertical</strong>.
            </p>

            <p className="text-lg leading-relaxed mt-4">
              Now, we have:
            </p>
            <div className="flex justify-around items-center text-center my-4">
              <div>
                <p className="text-lg font-mono">PR ≅ PN</p>
                <p className="text-sm text-slate-500">Side</p>
              </div>
              <div>
                <p className="text-lg font-mono">∠QPR ≅ ∠MPN</p>
                <p className="text-sm text-slate-500">(Included) Angle</p>
              </div>
              <div>
                <p className="text-lg font-mono">PQ ≅ PM</p>
                <p className="text-sm text-slate-500">Side</p>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              Therefore, ΔPQR and ΔPMN are congruent by SAS.
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Find the Vertical Angle</h3>
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
                <div className="grid grid-cols-2 gap-3">
                  {questions[currentQuestionIndex].options.map((option, idx) => {
                    const disabled = showFeedback;
                    const selected = selectedAnswer === option;
                    const correct = option === questions[currentQuestionIndex].correctAnswer;
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' // CORRECT
                            : 'border-red-500 bg-red-100 dark:bg-red-800 opacity-70' // INCORRECT
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
                <div className="text-3xl mb-4">{"<-->"}</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered spotting vertical angles!" : 'Great job!'}
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
      slideId="combining-vertical-angles"
      slideTitle="Cases With Vertical Angles"
      moduleId="congruence"
      submoduleId="combining-congruence-criteria"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}