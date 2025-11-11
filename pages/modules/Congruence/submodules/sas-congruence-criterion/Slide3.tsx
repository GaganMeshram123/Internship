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
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 50, y: 110 };
  const M = { x: 180, y: 110 };
  const B = { x: 130, y: 170 };
  const P = { x: 230, y: 50 };
  const Q = { x: 310, y: 110 };
  
  // Calculate label positions
  const labelAPos = getAngleLabelPosition(M, A, B, 30);
  const labelQPos = getAngleLabelPosition(M, Q, P, 30);

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
        <motion.path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${M.x} ${M.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${Q.x} ${Q.y} L ${P.x} ${P.y} L ${M.x} ${M.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        
        {/* Labels */}
        <motion.text x={A.x - 15} y={A.y + 5} fill={labelColor} variants={fadeVariant}>A</motion.text>
        <motion.text x={M.x - 5} y={M.y + 20} fill={labelColor} variants={fadeVariant}>M</motion.text>
        <motion.text x={B.x} y={B.y + 15} fill={labelColor} variants={fadeVariant}>B</motion.text>
        <motion.text x={P.x} y={P.y - 5} fill={labelColor} variants={fadeVariant}>P</motion.text>
        <motion.text x={Q.x + 5} y={Q.y + 5} fill={labelColor} variants={fadeVariant}>Q</motion.text>

        {/* --- IMPROVED SAS Markings --- */}
        <AnimatedSideMarks p1={A} p2={M} numMarks={1} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={M} p2={Q} numMarks={1} color={strokeColor} commonProps={commonProps} />
        
        <AnimatedSideMarks p1={B} p2={M} numMarks={2} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={P} p2={M} numMarks={2} color={strokeColor} commonProps={commonProps} />

        {/* --- IMPROVED Angles & Labels --- */}
        <AnimatedAngleArc p1={M} vertex={A} p2={B} color={angleBlue} commonProps={commonProps} radius={15} />
        <motion.text
          {...labelAPos}
          fill={angleBlue}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          65°
        </motion.text>
        
        <AnimatedAngleArc p1={M} vertex={Q} p2={P} color={angleOrange} commonProps={commonProps} radius={15} />
        <motion.text
          {...labelQPos}
          fill={angleOrange}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          3x - 7°
        </motion.text>
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
  
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 200, y: 30 };
  const B = { x: 50, y: 180 };
  const C = { x: 350, y: 180 };
  const M = { x: 200, y: 180 };

  // Calculate label positions
  const labelBPos = getAngleLabelPosition(A, B, M, 30);
  const labelCPos = getAngleLabelPosition(A, C, M, 30);

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
        <motion.path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${A.x} ${A.y} L ${M.x} ${M.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        
        {/* Labels */}
        <motion.text x={A.x} y={A.y - 10} fill={labelColor} textAnchor="middle" variants={fadeVariant}>A</motion.text>
        <motion.text x={B.x - 15} y={B.y + 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
        <motion.text x={C.x + 5} y={C.y + 5} fill={labelColor} variants={fadeVariant}>C</motion.text>
        <motion.text x={M.x} y={M.y + 15} fill={labelColor} textAnchor="middle" variants={fadeVariant}>M</motion.text>

        {/* --- IMPROVED Markings --- */}
        <AnimatedAngleArc p1={A} vertex={B} p2={M} color={angleGreen} commonProps={commonProps} radius={20} />
        <motion.text
          {...labelBPos}
          fill={angleGreen}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          65°
        </motion.text>
        
        <AnimatedAngleArc p1={A} vertex={C} p2={M} color={angleOrange} commonProps={commonProps} radius={20} />
        <motion.text
          {...labelCPos}
          fill={angleOrange}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          5x - 5°
        </motion.text>

        <RightAngleBox vertex={M} p1={A} p2={B} color={angleBlue} commonProps={commonProps} />
        <AnimatedSideMarks p1={B} p2={M} numMarks={1} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={M} p2={C} numMarks={1} color={strokeColor} commonProps={commonProps} />
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
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 50, y: 110 };
  const M = { x: 180, y: 110 };
  const B = { x: 130, y: 50 };
  const P = { x: 230, y: 170 };
  const Q = { x: 310, y: 110 };

  // Calculate label positions
  const labelAPos = getAngleLabelPosition(B, A, M, 30);
  const labelQPos = getAngleLabelPosition(P, Q, M, 30);

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
        <motion.path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${M.x} ${M.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${Q.x} ${Q.y} L ${P.x} ${P.y} L ${M.x} ${M.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        
        {/* Labels */}
        <motion.text x={A.x - 15} y={A.y + 5} fill={labelColor} variants={fadeVariant}>A</motion.text>
        <motion.text x={M.x - 5} y={M.y + 20} fill={labelColor} variants={fadeVariant}>M</motion.text>
        <motion.text x={B.x} y={B.y - 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
        <motion.text x={P.x} y={P.y + 15} fill={labelColor} variants={fadeVariant}>P</motion.text>
        <motion.text x={Q.x + 5} y={Q.y + 5} fill={labelColor} variants={fadeVariant}>Q</motion.text>

        {/* --- IMPROVED SAS Markings --- */}
        <AnimatedSideMarks p1={A} p2={M} numMarks={1} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={M} p2={Q} numMarks={1} color={strokeColor} commonProps={commonProps} />
        
        <AnimatedSideMarks p1={B} p2={M} numMarks={2} color={strokeColor} commonProps={commonProps} />
        <AnimatedSideMarks p1={P} p2={M} numMarks={2} color={strokeColor} commonProps={commonProps} />

        {/* --- IMPROVED Angles & Labels --- */}
        <AnimatedAngleArc p1={M} vertex={A} p2={B} color={angleBlue} commonProps={commonProps} radius={20} />
        <motion.text
          {...labelAPos}
          fill={angleBlue}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          80°
        </motion.text>
        
        <AnimatedAngleArc p1={M} vertex={Q} p2={P} color={angleOrange} commonProps={commonProps} radius={20} />
        <motion.text
          {...labelQPos}
          fill={angleOrange}
          fontSize="12"
          variants={fadeVariant}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          2x + 10°
        </motion.text>
      </motion.svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function SasSlide3() {
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
      id: 'sas-finding-angles-quiz',
      conceptId: 'sas-finding-angles',
      conceptName: 'SAS Finding Angles',
      type: 'judging',
      description: 'Testing using SAS and CPCTC to find unknown angles'
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
      id: 'sas-find-angle-q3',
      question: 'Find the value of x.',
      figure: <FigureQ1 />,
      options: [
        "13°",
        "15°",
        "14°",
        "50°",
        "65°"
      ],
      correctAnswer: "14°",
      explanation:
        "The line AM is perpendicular to BC, and BM is equal to MC. So AM is the perpendicular bisector of BC. This creates two congruent right triangles: triangle AMB and triangle AMC. Because they are congruent, angle B is equal to angle C. So we set 65 = 5x - 5. Solving gives 5x = 70, so x = 14."
    },
    {
      id: 'sas-find-angle-q4',
      question: 'Find the value of x.',
      figure: <FigureQ2 />,
      options: [
        "40°",
        "85°",
        "80°",
        "70°",
        "35°"
      ],
      correctAnswer: "35°",
      explanation:
        "The triangles are congruent by the SAS rule. We know AM = QM (side), BM = PM (side), and the angles at M are vertical angles, so they are equal (included angle). Because the triangles are congruent, angle A equals angle Q. So we set 80 = 2x + 10. Solving gives 2x = 70, so x = 35."
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
      interactionId: `sas-find-angle-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sas-finding-angles',
      conceptName: 'SAS Finding Angles',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Finding an Angle Using SAS</h2>
            <p className="text-lg leading-relaxed mb-4">
              Find the value of x.
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              First, notice that ∠AMB and ∠QMP are <strong>vertical angles</strong>, which means they are congruent.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Now, ΔAMB and ΔQMP are congruent by the SAS criterion since we have the following pairs of congruent sides and included angles:
            </p>
            <ul className="list-none my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg font-mono">
                <li>AM ≅ MQ (Side)</li>
                <li>BM ≅ MP (Side)</li>
                <li>∠AMB ≅ ∠QMP (Included Angle)</li>
            </ul>

            <p className="text-lg leading-relaxed mt-4">
              Therefore, all the corresponding angles must be congruent (CPCTC). In particular, <strong>∠A ≅ ∠Q</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              Hence,
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono">
              m∠Q = m∠A<br/>
              3x - 7° = 65°<br/>
              3x = 72°<br/>
              x = 24°
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
      slideId="sas-finding-angles"
      slideTitle="Finding the Measure of an Angle Using SAS"
      moduleId="congruence"
      submoduleId="sas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}