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


// --- FIGURE FOR EXAMPLE (Left Side) ---
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 150;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angleYellow = isDarkMode ? '#FDE047' : '#EAB308';
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 170, y: 120 }, B: { x: 30, y: 120 }, C: { x: 130, y: 20 } };
  const T2 = { D: { x: 370, y: 120 }, E: { x: 230, y: 120 }, F: { x: 270, y: 20 } };

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
          <motion.text x={T1.A.x + 5} y={T1.A.y + 5} fill={labelColor} variants={fadeVariant}>A</motion.text>
          <motion.text x={T1.B.x - 15} y={T1.B.y + 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
          <motion.text x={T1.C.x} y={T1.C.y - 5} fill={labelColor} variants={fadeVariant}>C</motion.text>
          
          <motion.text x={(T1.B.x + T1.C.x) / 2 - 10} y={(T1.B.y + T1.C.y) / 2 + 5} fill={labelColor} variants={fadeVariant}>2x - 5</motion.text>
          <motion.text x={(T1.A.x + T1.C.x) / 2 + 10} y={(T1.A.y + T1.C.y) / 2 + 5} fill={labelColor} variants={fadeVariant}>3</motion.text>
          
          <AnimatedAngleArc p1={T1.B} vertex={T1.A} p2={T1.C} color={angleGreen} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T1.C} vertex={T1.A} p2={T1.B} color={angleGreen} commonProps={commonProps} radius={18} />
          
          <AnimatedAngleArc p1={T1.A} vertex={T1.B} p2={T1.C} color={angleYellow} commonProps={commonProps} radius={15} />
          
          <AnimatedSideMarks p1={T1.A} p2={T1.B} numMarks={1} color={strokeColor} commonProps={commonProps} />
        </motion.g>

        {/* T2 (DEF) */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={T2.D.x + 5} y={T2.D.y + 5} fill={labelColor} variants={fadeVariant}>D</motion.text>
          <motion.text x={T2.E.x - 15} y={T2.E.y + 5} fill={labelColor} variants={fadeVariant}>E</motion.text>
          <motion.text x={T2.F.x + 5} y={T2.F.y - 5} fill={labelColor} variants={fadeVariant}>F</motion.text>
          
          <motion.text x={(T2.E.x + T2.F.x) / 2 - 10} y={(T2.E.y + T2.F.y) / 2 + 5} fill={labelColor} variants={fadeVariant}>4y - 1</motion.text>
          <motion.text x={(T2.D.x + T2.F.x) / 2 + 10} y={(T2.D.y + T2.F.y) / 2 + 5} fill={labelColor} variants={fadeVariant}>5</motion.text>
          
          <AnimatedAngleArc p1={T2.E} vertex={T2.D} p2={T2.F} color={angleGreen} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T2.F} vertex={T2.D} p2={T2.E} color={angleGreen} commonProps={commonProps} radius={18} />
          
          <AnimatedAngleArc p1={T2.D} vertex={T2.E} p2={T2.F} color={angleYellow} commonProps={commonProps} radius={15} />
          
          <AnimatedSideMarks p1={T2.D} p2={T2.E} numMarks={1} color={strokeColor} commonProps={commonProps} />
        </motion.g>
      </motion.svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q7 from image, FIXED) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 150;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angleYellow = isDarkMode ? '#FDE047' : '#EAB308';
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 170, y: 120 }, B: { x: 30, y: 120 }, C: { x: 130, y: 20 } };
  const T2 = { D: { x: 370, y: 120 }, E: { x: 230, y: 120 }, F: { x: 270, y: 20 } };
  
  const labelB1Pos = getAngleLabelPosition(T1.A, T1.B, T1.C, 25);
  const labelEPos = getAngleLabelPosition(T2.D, T2.E, T2.F, 25);

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
          <motion.text x={T1.A.x + 5} y={T1.A.y + 5} fill={labelColor} variants={fadeVariant}>A</motion.text>
          <motion.text x={T1.B.x - 15} y={T1.B.y + 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
          <motion.text x={T1.C.x} y={T1.C.y - 5} fill={labelColor} variants={fadeVariant}>C</motion.text>
          <motion.text x={(T1.A.x + T1.C.x) / 2 + 10} y={(T1.A.y + T1.C.y) / 2 + 5} fill={labelColor} variants={fadeVariant}>2x + 2</motion.text>
          
          <AnimatedAngleArc p1={T1.B} vertex={T1.A} p2={T1.C} color={angleGreen} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T1.A} vertex={T1.B} p2={T1.C} color={angleYellow} commonProps={commonProps} radius={15} />
          <motion.text
            {...labelB1Pos}
            fill={labelColor}
            fontSize="12"
            variants={fadeVariant}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            60°
          </motion.text>
          <AnimatedSideMarks p1={T1.A} p2={T1.B} numMarks={1} color={strokeColor} commonProps={commonProps} />
        </motion.g>

        {/* T2 (DEF) */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={T2.D.x + 5} y={T2.D.y + 5} fill={labelColor} variants={fadeVariant}>D</motion.text>
          <motion.text x={T2.E.x - 15} y={T2.E.y + 5} fill={labelColor} variants={fadeVariant}>E</motion.text>
          <motion.text x={T2.F.x + 5} y={T2.F.y - 5} fill={labelColor} variants={fadeVariant}>F</motion.text>
          <motion.text x={(T2.D.x + T2.F.x) / 2 + 10} y={(T2.D.y + T2.F.y) / 2 + 5} fill={labelColor} variants={fadeVariant}>10</motion.text>

          <AnimatedAngleArc p1={T2.E} vertex={T2.D} p2={T2.F} color={angleGreen} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T2.D} vertex={T2.E} p2={T2.F} color={angleYellow} commonProps={commonProps} radius={15} />
          <motion.text
            {...labelEPos}
            fill={labelColor}
            fontSize="12"
            variants={fadeVariant}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            60°
          </motion.text>
          <AnimatedSideMarks p1={T2.D} p2={T2.E} numMarks={1} color={strokeColor} commonProps={commonProps} />
        </motion.g>
      </motion.svg>
    </div>
  );
};


// --- FIGURE FOR QUIZ QUESTION 2 (Q8 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 150;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angleYellow = isDarkMode ? '#FDE047' : '#EAB308';
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 170, y: 120 }, B: { x: 30, y: 120 }, C: { x: 130, y: 20 } };
  const T2 = { D: { x: 370, y: 120 }, E: { x: 230, y: 120 }, F: { x: 270, y: 20 } };
  
  const labelA1Pos = getAngleLabelPosition(T1.B, T1.A, T1.C, 25);
  const labelDPos = getAngleLabelPosition(T2.E, T2.D, T2.F, 25);

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
          <motion.text x={T1.A.x + 5} y={T1.A.y + 5} fill={labelColor} variants={fadeVariant}>A</motion.text>
          <motion.text x={T1.B.x - 15} y={T1.B.y + 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
          <motion.text x={T1.C.x} y={T1.C.y - 5} fill={labelColor} variants={fadeVariant}>C</motion.text>
          <motion.text x={(T1.B.x + T1.C.x) / 2 - 10} y={(T1.B.y + T1.C.y) / 2 + 5} fill={labelColor} variants={fadeVariant}>2x + 1</motion.text>
          
          <AnimatedAngleArc p1={T1.B} vertex={T1.A} p2={T1.C} color={angleGreen} commonProps={commonProps} radius={15} />
          <motion.text
            {...labelA1Pos}
            fill={labelColor}
            fontSize="12"
            variants={fadeVariant}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            70°
          </motion.text>
          
          <AnimatedAngleArc p1={T1.A} vertex={T1.B} p2={T1.C} color={angleYellow} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T1.C} vertex={T1.B} p2={T1.A} color={angleYellow} commonProps={commonProps} radius={18} />
          
          <AnimatedSideMarks p1={T1.B} p2={T1.C} numMarks={2} color={strokeColor} commonProps={commonProps} />
        </motion.g>

        {/* T2 (DEF) */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${T2.D.x} ${T2.D.y} L ${T2.E.x} ${T2.E.y} L ${T2.F.x} ${T2.F.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={T2.D.x + 5} y={T2.D.y + 5} fill={labelColor} variants={fadeVariant}>D</motion.text>
          <motion.text x={T2.E.x - 15} y={T2.E.y + 5} fill={labelColor} variants={fadeVariant}>E</motion.text>
          <motion.text x={T2.F.x + 5} y={T2.F.y - 5} fill={labelColor} variants={fadeVariant}>F</motion.text>
          <motion.text x={(T2.E.x + T2.F.x) / 2 - 10} y={(T2.E.y + T2.F.y) / 2 + 5} fill={labelColor} variants={fadeVariant}>4x - 1</motion.text>
          
          <AnimatedAngleArc p1={T2.E} vertex={T2.D} p2={T2.F} color={angleGreen} commonProps={commonProps} radius={15} />
          <motion.text
            {...labelDPos}
            fill={labelColor}
            fontSize="12"
            variants={fadeVariant}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            2y
          </motion.text>
          
          <AnimatedAngleArc p1={T2.D} vertex={T2.E} p2={T2.F} color={angleYellow} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T2.F} vertex={T2.E} p2={T2.D} color={angleYellow} commonProps={commonProps} radius={18} />

          <AnimatedSideMarks p1={T2.E} p2={T2.F} numMarks={2} color={strokeColor} commonProps={commonProps} />
        </motion.g>
      </motion.svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function AsaSlide5() {
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
      id: 'asa-statements-quiz',
      conceptId: 'asa-statements',
      conceptName: 'ASA True Statements',
      type: 'judging',
      description: 'Using ASA and CPCTC to evaluate true/false statements'
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
      id: 'asa-statements-q1',
      question: 'From the diagram, which of the following statements are true?',
      figure: <FigureQ1 />,
      statements: [
        'I. Triangle ABC is congruent to Triangle DEF by ASA',
        'II. Angle C is equal to Angle F',
        'III. x = 4'
      ],
      options: [
        "I only",
        "III only",
        "I and II only",
        "II and III only",
        "I, II, and III"
      ],
      correctAnswer: "I, II, and III", // Corrected: All are true.
      explanation:
        "Statement I is true: Angle A ≅ Angle D (green), Included Side AB ≅ DE (1 hash), and Angle B ≅ Angle E (60°). This is ASA. Statement II is true by CPCTC. Statement III is true by CPCTC: AC ≅ DF, so 2x + 2 = 10, 2x = 8, and x = 4. All three statements are true."
    },
    {
      id: 'asa-statements-q2',
      question: 'From the diagram, which of the following statements are true?',
      figure: <FigureQ2 />,
      statements: [
        'I. Triangle ABC is congruent to Triangle DEF by ASA',
        'II. EF = 3',
        'III. y = 35°'
      ],
      options: [
        "II and III only",
        "III only",
        "None",
        "I only",
        "I, II, and III"
      ],
      correctAnswer: "II and III only",
      explanation:
        "Statement I is false because the side (BC/EF) is *not* between the two marked angles. This is AAS, not ASA. Statement II is true: By AAS, the triangles are congruent, so AC ≅ DF. This means 2x + 1 = 4x - 1, which gives 2x = 2, so x = 1. The side EF corresponds to BC. BC = 2x + 1 = 2(1) + 1 = 3. So EF = 3. Statement III is true: By CPCTC, Angle A ≅ Angle D. So 70 = 2y, which means y = 35°."
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
      interactionId: `asa-statements-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'asa-statements',
      conceptName: 'ASA True Statements',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Identifying True Statements</h2>
            <p className="text-lg leading-relaxed mb-4">
              From the diagram below, which of the following statements is true?
            </p>
            <ul className="list-none p-4 mb-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg font-mono">
              <li>I.   ΔABC ≅ ΔDEF by ASA</li>
              <li>II.  x = 1</li>
              <li>III. y = 1</li>
            </ul>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              Let's examine each of the given statements in turn.
            </p>

            <ul className="list-disc list-inside mt-4 text-lg space-y-3 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Statement I is true.</strong> Triangle ABC and Triangle DEF are congruent by ASA because we have:
                <ul className="list-decimal list-inside ml-6 mt-2">
                  <li>Angle A is equal to Angle D (green markings)</li>
                  <li>Side AB is equal to side DE (single hash marking)</li>
                  <li>Angle B is equal to Angle E (yellow markings)</li>
                </ul>
              </li>
              <li>
                <strong>Statement II is false.</strong> Since the triangles are congruent, all matching sides are equal (CPCTC). In particular, BC matches EF.
                <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg font-mono">
                  BC = EF<br/>
                  2x - 5 = 5<br/>
                  2x = 10<br/>
                  x = 5 (not 1)
                </div>
              </li>
              <li>
                <strong>Statement III is true.</strong> By CPCTC, side AC matches side DF.
                <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg font-mono">
                  AC = DF<br/>
                  3 = 4y - 1<br/>
                  4 = 4y<br/>
                  y = 1
                </div>
              </li>
            </ul>
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              Therefore, only statements I and III are true.
            </p>
          </div>
        </div>

        {/* Right Column - Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Practice: True or False?</h3>
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
                <div className="text-3xl mb-4">📝</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Perfect score! You're a geometry whiz." : 'Great job!'}
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
      slideId="asa-statements"
      slideTitle="Evaluating Statements with ASA"
      moduleId="congruence"
      submoduleId="asa-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}