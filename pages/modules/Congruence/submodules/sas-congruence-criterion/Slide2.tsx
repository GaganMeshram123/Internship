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

  // Triangle Defs
  const T = { A: { x: 80, y: 120 }, B: { x: 180, y: 120 }, C: { x: 160, y: 30 } };
  const P = { A: { x: 250, y: 30 }, B: { x: 300, y: 120 }, C: { x: 370, y: 80 } };
  const Q = { A: { x: 30, y: 250 }, B: { x: 170, y: 250 }, C: { x: 80, y: 160 } };
  const R = { A: { x: 230, y: 250 }, B: { x: 370, y: 250 }, C: { x: 320, y: 160 } };

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
        {/* --- Triangle T --- */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${T.A.x} ${T.A.y} L ${T.B.x} ${T.B.y} L ${T.C.x} ${T.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={T.A.x} y={T.A.y - 10} fill={labelColor} fontSize="14" variants={fadeVariant}>T</motion.text>
          <AnimatedAngleArc p1={T.B} vertex={T.A} p2={T.C} color={angle1} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T.A} vertex={T.C} p2={T.B} color={angle2} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T.A} vertex={T.B} p2={T.C} color={angle3} commonProps={commonProps} radius={15} />
          <AnimatedSideMarks p1={T.A} p2={T.C} numMarks={1} color={sideColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={T.A} p2={T.B} numMarks={2} color={sideColor} commonProps={commonProps} />
        </motion.g>
        
        {/* --- Triangle P --- */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${P.A.x} ${P.A.y} L ${P.B.x} ${P.B.y} L ${P.C.x} ${P.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={P.A.x + 20} y={P.A.y + 30} fill={labelColor} fontSize="14" variants={fadeVariant}>P</motion.text>
          <AnimatedAngleArc p1={P.A} vertex={P.B} p2={P.C} color={angle1} commonProps={commonProps} radius={15} />
          <AnimatedSideMarks p1={P.B} p2={P.C} numMarks={1} color={sideColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={P.A} p2={P.B} numMarks={2} color={sideColor} commonProps={commonProps} />
        </motion.g>
        
        {/* --- Triangle Q --- */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${Q.A.x} ${Q.A.y} L ${Q.B.x} ${Q.B.y} L ${Q.C.x} ${Q.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={Q.C.x} y={Q.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle" variants={fadeVariant}>Q</motion.text>
          <AnimatedSideMarks p1={Q.B} p2={Q.C} numMarks={1} color={sideColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={Q.A} p2={Q.C} numMarks={1} color={sideColor} commonProps={commonProps} />
        </motion.g>
        
        {/* --- Triangle R --- */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${R.A.x} ${R.A.y} L ${R.B.x} ${R.B.y} L ${R.C.x} ${R.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={R.C.x} y={R.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle" variants={fadeVariant}>R</motion.text>
          <AnimatedAngleArc p1={R.B} vertex={R.A} p2={R.C} color={angle1} commonProps={commonProps} radius={15} />
          <AnimatedSideMarks p1={R.A} p2={R.B} numMarks={2} color={sideColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={R.B} p2={R.C} numMarks={1} color={sideColor} commonProps={commonProps} />
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
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 200, y: 30 };
  const B = { x: 80, y: 100 };
  const C = { x: 120, y: 180 };
  const D = { x: 280, y: 180 };
  const E = { x: 320, y: 100 };

  // Props for filled angles
  const orangeAngleProps = { fill: angleOrange, fillOpacity: 0.4, strokeWidth: 3 };
  const greenAngleProps = { fill: angleGreen, fillOpacity: 0.4, strokeWidth: 3 };

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
        {/* Draw all lines */}
        <motion.path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} L ${E.x} ${E.y} Z`} 
          stroke={strokeColor} 
          fill={isDarkMode ? 'rgb(30 41 59 / 0.5)' : 'rgb(241 245 249 / 0.5)'} 
          variants={drawVariant} 
        />
        <motion.path d={`M ${A.x} ${A.y} L ${C.x} ${C.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />

        {/* Labels */}
        <motion.text x={A.x} y={A.y - 10} fill={labelColor} textAnchor="middle" variants={fadeVariant}>A</motion.text>
        <motion.text x={B.x - 15} y={B.y} fill={labelColor} variants={fadeVariant}>B</motion.text>
        <motion.text x={C.x - 15} y={C.y + 5} fill={labelColor} variants={fadeVariant}>C</motion.text>
        <motion.text x={D.x + 5} y={D.y + 5} fill={labelColor} variants={fadeVariant}>D</motion.text>
        <motion.text x={E.x + 5} y={E.y} fill={labelColor} variants={fadeVariant}>E</motion.text>

        {/* --- IMPROVED Markings --- */}
        <AnimatedAngleArc p1={B} vertex={A} p2={C} color={angleOrange} commonProps={orangeAngleProps} radius={20} />
        <AnimatedAngleArc p1={C} vertex={A} p2={D} color={angleGreen} commonProps={greenAngleProps} radius={20} />
        
        <AnimatedSideMarks p1={A} p2={B} numMarks={1} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={A} p2={E} numMarks={1} color={strokeColor} commonProps={commonProps} />

        <AnimatedSideMarks p1={A} p2={C} numMarks={2} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={A} p2={D} numMarks={2} color={strokeColor} commonProps={commonProps} />
      </motion.svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (T, P, Q, R) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 280;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angle1 = isDarkMode ? '#FDE047' : '#EAB308'; // Yellow
  const angle2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const sideColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T = { A: { x: 80, y: 120 }, B: { x: 180, y: 120 }, C: { x: 160, y: 30 } };
  const P = { A: { x: 250, y: 30 }, B: { x: 300, y: 120 }, C: { x: 370, y: 80 } };
  const Q = { A: { x: 30, y: 250 }, B: { x: 170, y: 250 }, C: { x: 80, y: 160 } };
  const R = { A: { x: 230, y: 250 }, B: { x: 370, y: 250 }, C: { x: 320, y: 160 } };

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
        {/* --- Triangle T --- */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${T.A.x} ${T.A.y} L ${T.B.x} ${T.B.y} L ${T.C.x} ${T.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={T.A.x} y={T.A.y - 10} fill={labelColor} fontSize="14" variants={fadeVariant}>T</motion.text>
          <AnimatedAngleArc p1={T.B} vertex={T.A} p2={T.C} color={angle1} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T.A} vertex={T.C} p2={T.B} color={angle2} commonProps={commonProps} radius={15} />
          <AnimatedSideMarks p1={T.A} p2={T.C} numMarks={1} color={sideColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={T.A} p2={T.B} numMarks={2} color={sideColor} commonProps={commonProps} />
        </motion.g>
        
        {/* --- Triangle P --- */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${P.A.x} ${P.A.y} L ${P.B.x} ${P.B.y} L ${P.C.x} ${P.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={P.A.x + 20} y={P.A.y + 30} fill={labelColor} fontSize="14" variants={fadeVariant}>P</motion.text>
          <AnimatedAngleArc p1={P.A} vertex={P.B} p2={P.C} color={angle1} commonProps={commonProps} radius={15} />
          <AnimatedSideMarks p1={P.B} p2={P.C} numMarks={1} color={sideColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={P.A} p2={P.B} numMarks={2} color={sideColor} commonProps={commonProps} />
        </motion.g>
        
        {/* --- Triangle Q --- */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${Q.A.x} ${Q.A.y} L ${Q.B.x} ${Q.B.y} L ${Q.C.x} ${Q.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={Q.C.x} y={Q.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle" variants={fadeVariant}>Q</motion.text>
          <AnimatedAngleArc p1={Q.B} vertex={Q.A} p2={Q.C} color={angle1} commonProps={commonProps} radius={15} />
          <AnimatedSideMarks p1={Q.B} p2={Q.C} numMarks={1} color={sideColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={Q.A} p2={Q.C} numMarks={1} color={sideColor} commonProps={commonProps} />
        </motion.g>
        
        {/* --- Triangle R --- */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${R.A.x} ${R.A.y} L ${R.B.x} ${R.B.y} L ${R.C.x} ${R.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={R.C.x} y={R.C.y - 5} fill={labelColor} fontSize="14" textAnchor="middle" variants={fadeVariant}>R</motion.text>
          <AnimatedAngleArc p1={R.B} vertex={R.A} p2={R.C} color={angle1} commonProps={commonProps} radius={15} />
          <AnimatedSideMarks p1={R.A} p2={R.B} numMarks={2} color={sideColor} commonProps={commonProps} />
          <AnimatedSideMarks p1={R.B} p2={R.C} numMarks={1} color={sideColor} commonProps={commonProps} />
        </motion.g>
      </motion.svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function SasSlide2() {
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
      id: 'sas-identification-quiz',
      conceptId: 'sas-criterion-identification',
      conceptName: 'SAS Criterion Identification',
      type: 'judging',
      description: 'Testing ability to identify SAS'
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
      id: 'sas-id-q1-pentagon',
      question: 'Based on the SAS rule, which triangle is congruent to triangle ABC?',
      figure: <FigureQ1 />,
      options: [
        "Triangle ABE only",
        "None",
        "Triangle ADE only",
        "Triangle ACD only",
        "Triangle ADE and Triangle ACD"
      ],
      correctAnswer: "Triangle ADE only",
      explanation:
        "Triangle ABC has two sides and the angle between them known (AB, angle at A, and AC). Triangle ADE also has two sides and the included angle matching the same pattern (AE, angle at A, and AD). Therefore, triangle ABC and triangle ADE are congruent by the SAS rule."
    },
    {
      id: 'sas-id-q2-triangles',
      question: 'Based on the SAS rule, which triangle is congruent to triangle T?',
      figure: <FigureQ2 />,
      options: [
        "Triangles P, Q, and R",
        "Triangles P and R only",
        "Triangle R only",
        "Triangle P only",
        "Triangles P and Q only"
      ],
      correctAnswer: "Triangle P only",
      explanation:
        "Triangle T has two sides and the included angle known. Triangle P has the same pattern of side–angle–side. Triangle R does not have the angle included between the two known sides, so it does not fit the SAS rule. Therefore, only triangle P is congruent to triangle T."
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
      interactionId: `sas-id-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sas-criterion-identification',
      conceptName: 'SAS Criterion Identification',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Identifying Congruent Triangles</h2>
            <p className="text-lg leading-relaxed mb-4">
              According to the SAS criterion only, which of the following triangles are congruent to T?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              The SAS (side-angle-side) congruence criterion states:
            </p>
            <blockquote className="my-4 p-4 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg italic font-medium leading-relaxed">
                Two triangles are congruent if and only if two sides and the <strong>included angle</strong> of one triangle are congruent to two sides and the included angle of the other triangle.
              </p>
            </blockquote>

            <p className="text-lg leading-relaxed mt-4">
              With that in mind, let's examine each of the given triangles:
            </p>
            {/* NOTE: The explanation in the original code seems to have a typo,
              it says "P and R only" but the quiz answer key says "Triangle P only".
              I will follow the quiz answer key.
            */}
           <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>P is congruent to T</strong> by SAS because it has two matching sides (1 hash and 2 hashes) and the matching included angle (shown in yellow).
              </li>
              <li>
                <strong>Q is not congruent</strong> by SAS because the angle is not given.
              </li>
              <li>
                <strong>R is not congruent</strong> by SAS because the angle (yellow) is <strong>not included</strong> between the two marked sides (1 hash and 2 hashes). This is SSA, not SAS.
              </li>
            </ul>
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              Therefore, the correct answer is "P only."
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
                            : 'border-red-500 bg-red-50 dark:bg-red-900/30' // INCORRECT
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
      slideId="sas-identifying-triangles"
      slideTitle="Identifying Congruent Triangles Using SAS"
      moduleId="congruence"
      submoduleId="sas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}