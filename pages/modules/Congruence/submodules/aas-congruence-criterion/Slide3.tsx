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
  // v1Mag and v2Mag are guaranteed to be non-zero by the magnitude function
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

/**
 * HELPER to get a good position for an angle's text label
 */
const getAngleLabelPosition = (
  p1: Point,
  vertex: Point,
  p2: Point,
  offset: number = 25, // Distance from vertex
) => {
  const v1 = getVector(vertex, p1);
  const v2 = getVector(vertex, p2);
  const nv1 = { x: v1.x / magnitude(v1), y: v1.y / magnitude(v1) };
  const nv2 = { x: v2.x / magnitude(v2), y: v2.y / magnitude(v2) };

  // Bisector vector
  const bisectorV = { x: nv1.x + nv2.x, y: nv1.y + nv2.y };
  const magBisector = magnitude(bisectorV);
  // Handle case where vectors are opposite (bisector is zero)
  const nBisectorV = magBisector < 1e-6 
    ? { x: -nv1.y, y: nv1.x } // Perpendicular
    : { x: bisectorV.x / magBisector, y: bisectorV.y / magBisector };

  // Calculate position along the bisector
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
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
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

  // Calculate label positions dynamically
  const labelBPos = getAngleLabelPosition(A, B, D, 25);
  const labelEPos = getAngleLabelPosition(A, E, C, 25);

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
        {/* Lines */}
        <motion.path d={`M ${A.x} ${A.y} L ${C.x} ${C.y} L ${D.x} ${D.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${C.x} ${C.y} L ${E.x} ${E.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${B.x} ${B.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />

        {/* Labels */}
        <motion.text x={A.x - 15} y={A.y + 5} fill={labelColor} variants={fadeVariant}>A</motion.text>
        <motion.text x={B.x - 15} y={B.y} fill={labelColor} variants={fadeVariant}>B</motion.text>
        <motion.text x={C.x} y={C.y - 10} fill={labelColor} variants={fadeVariant}>C</motion.text>
        <motion.text x={D.x + 5} y={D.y + 5} fill={labelColor} variants={fadeVariant}>D</motion.text>
        <motion.text x={E.x + 5} y={E.y + 5} fill={labelColor} variants={fadeVariant}>E</motion.text>
        <motion.text x={F.x + 5} y={F.y + 5} fill={labelColor} variants={fadeVariant}>F</motion.text>

        {/* --- IMPROVED Angles & Given --- */}
        
        {/* Angle B (65°) */}
        <motion.text
          {...labelBPos}
          fill={angleYellow}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          65°
        </motion.text>
        <AnimatedAngleArc p1={A} vertex={B} p2={D} color={angleYellow} commonProps={commonProps} radius={15} />
        
        {/* Angle E (5x + 15°) */}
        <motion.text
          {...labelEPos}
          fill={anglePurple}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          5x + 15°
        </motion.text>
        <AnimatedAngleArc p1={A} vertex={E} p2={C} color={anglePurple} commonProps={commonProps} radius={15} />

        {/* Angle C (∠ACE) */}
        <AnimatedAngleArc p1={A} vertex={C} p2={D} color={angleBlue} commonProps={commonProps} radius={15} />
        {/* Angle D (∠ADB) */}
        <AnimatedAngleArc p1={A} vertex={D} p2={B} color={angleBlue} commonProps={commonProps} radius={15} />

        {/* Side Marks for BD ≅ CE (from explanation) */}
        <AnimatedSideMarks p1={B} p2={D} numMarks={1} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={C} p2={E} numMarks={1} color={strokeColor} commonProps={commonProps} />
      </motion.svg>
    </div>
  );
};


// --- FIGURE FOR QUIZ QUESTION 1 (Q3 from image) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angleYellow = isDarkMode ? '#FDE047' : '#EAB308';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const anglePurple = isDarkMode ? '#C084FC' : '#9333EA';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 100, y: 50 };
  const B = { x: 100, y: 180 };
  const C = { x: 300, y: 80 };
  const D = { x: 300, y: 150 };
  const E = { x: 200, y: 115 }; // Intersection

  // Calculate label positions dynamically
  const labelAPos = getAngleLabelPosition(B, A, C, 30);
  const labelBPos = getAngleLabelPosition(A, B, D, 30);

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <motion.svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`50 0 ${svgWidth} ${svgHeight}`}
        variants={groupVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${D.x} ${D.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${B.x} ${B.y} L ${A.x} ${A.y} L ${C.x} ${C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${B.x} ${B.y} L ${C.x} ${C.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        
        {/* Labels */}
        <motion.text x={A.x - 15} y={A.y} fill={labelColor} variants={fadeVariant}>A</motion.text>
        <motion.text x={B.x - 15} y={B.y + 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
        <motion.text x={C.x + 5} y={C.y} fill={labelColor} variants={fadeVariant}>C</motion.text>
        <motion.text x={D.x + 5} y={D.y + 5} fill={labelColor} variants={fadeVariant}>D</motion.text>
        <motion.text x={E.x + 5} y={E.y} fill={labelColor} variants={fadeVariant}>E</motion.text>

        {/* --- IMPROVED Angles & Given --- */}
        <motion.text
          {...labelAPos}
          fill={angleYellow}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          72°
        </motion.text>
        <AnimatedAngleArc p1={B} vertex={A} p2={C} color={angleYellow} commonProps={commonProps} radius={20} />
        
        <motion.text
          {...labelBPos}
          fill={angleOrange}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          3x + 9°
        </motion.text>
        <AnimatedAngleArc p1={A} vertex={B} p2={D} color={angleOrange} commonProps={commonProps} radius={20} />

        {/* Angle C (∠ACB) */}
        <AnimatedAngleArc p1={A} vertex={C} p2={B} color={anglePurple} commonProps={commonProps} radius={15} />
        {/* Angle D (∠ADB) */}
        <AnimatedAngleArc p1={A} vertex={D} p2={B} color={anglePurple} commonProps={commonProps} radius={15} />
      </motion.svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q4 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
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

  // Calculate label position dynamically
  const labelCPos = getAngleLabelPosition(A, C, E, 30);

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
        {/* Lines */}
        <motion.path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${E.x} ${E.y} L ${A.x} ${A.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${A.x} ${A.y} L ${D.x} ${D.y} L ${B.x} ${B.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${C.x} ${C.y} L ${E.x} ${E.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />

        {/* Labels */}
        <motion.text x={A.x - 15} y={A.y + 5} fill={labelColor} variants={fadeVariant}>A</motion.text>
        <motion.text x={B.x + 5} y={B.y + 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
        <motion.text x={C.x} y={C.y + 15} fill={labelColor} textAnchor="middle" variants={fadeVariant}>C</motion.text>
        <motion.text x={D.x - 15} y={D.y} fill={labelColor} variants={fadeVariant}>D</motion.text>
        <motion.text x={E.x + 5} y={E.y} fill={labelColor} variants={fadeVariant}>E</motion.text>
        <motion.text x={F.x + 5} y={F.y} fill={labelColor} variants={fadeVariant}>F</motion.text>
        <motion.text x={F.x + 10} y={F.y + 15} fill={labelColor} fontSize="12" variants={fadeVariant}>g</motion.text>
        
        {/* --- IMPROVED Angle Label --- */}
        <motion.text
          {...labelCPos}
          fill={angleBlue}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          3x + 12°
        </motion.text>

        {/* Angles & Markings */}
        {/* 90 deg at D (∠BDA) */}
        <RightAngleBox vertex={D} p1={B} p2={A} color={angleOrange} commonProps={commonProps} />
        {/* 90 deg at E (∠CEA) */}
        <RightAngleBox vertex={E} p1={C} p2={A} color={anglePurple} commonProps={commonProps} />
        {/* Angle at C (∠ACE) */}
        <AnimatedAngleArc p1={A} vertex={C} p2={E} color={angleBlue} commonProps={commonProps} radius={20} />
        
        <motion.path d={`M ${F.x} ${F.y} L ${F.x + 5} ${F.y + 5}`} stroke={strokeColor} strokeWidth="2" variants={drawVariant} /> {/* CF=g mark */}
        
        {/* Side Marks for BD ≅ CE from explanation */}
        <AnimatedSideMarks p1={C} p2={E} numMarks={1} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={B} p2={D} numMarks={1} color={strokeColor} commonProps={commonProps} />
      </motion.svg>
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
  const [score, setScore] =useState(0);
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

  const questions: QuizQuestion[] = [
    {
      id: 'aas-find-angle-q3',
      question: 'In the figure above, angle DBA is equal to angle BAC. What is the value of x?',
      figure: <FigureQ1 />,
      options: [
        "68°",
        "18°",
        "21°",
        "32°",
        "72°"
      ],
      correctAnswer: "21°",
      explanation:
        "Correct! We can prove triangle ABC is congruent to triangle BAD by AAS. Angle C equals angle D. Angle BAC equals angle DBA. They also share side AB. Since angle BAC equals angle DBA, set their expressions equal: 72 = 3x + 9. Solving gives 3x = 63, so x = 21."
    },
    {
      id: 'aas-find-angle-q4',
      question: 'In the figure above, BD is equal to CE. What is the value of x?',
      figure: <FigureQ2 />,
      options: [
        "13°",
        "90°",
        "30°",
        "45°",
        "26°"
      ],
      correctAnswer: "26°",
      explanation:
        "We can prove triangle ABD is congruent to triangle ACE using AAS: angle A is common, angle BDA equals angle CEA (both are right angles), and BD equals CE. By CPCTC, angle ABD equals angle ACE. The diagram shows angle ACD as 3x + 12, and angle ACE as 90°. So set 3x + 12 = 90. Solving gives 3x = 78, so x = 26."
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

        {/* Left Column - Content */}
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

        {/* Right Column - Animation and Quiz */}
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