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


// --- FIGURE FOR EXAMPLE & QUIZ QUESTION 1 (Q5 from image) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  const highlightColor = isDarkMode ? '#F9B572' : '#F59E0B'; // Orange
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 100, y: 180 };
  const B = { x: 150, y: 100 };
  const C = { x: 180, y: 40 };
  const D = { x: 300, y: 130 };
  const E = { x: 200, y: 140 };

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
        {/* Lines */}
        <motion.path d={`M ${A.x} ${A.y} L ${C.x} ${C.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${A.x} ${A.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${C.x} ${C.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
        <motion.path d={`M ${C.x} ${C.y} L ${B.x} ${B.y} L ${A.x} ${A.y}`} stroke={strokeColor} {...commonProps} fill="none" variants={drawVariant} />
        <motion.path d={`M ${A.x} ${A.y} L ${E.x} ${E.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} fill="none" variants={drawVariant} />
        <motion.path d={`M ${C.x} ${C.y} L ${E.x} ${E.y}`} stroke={strokeColor} {...commonProps} fill="none" variants={drawVariant} />
        <motion.path d={`M ${B.x} ${B.y} L ${E.x} ${E.y}`} stroke={strokeColor} strokeWidth="1.5" strokeDasharray="4 4" variants={drawVariant} />

        {/* Labels */}
        <motion.text x={A.x - 15} y={A.y + 5} fill={labelColor} variants={fadeVariant}>A</motion.text>
        <motion.text x={B.x - 15} y={B.y} fill={labelColor} variants={fadeVariant}>B</motion.text>
        <motion.text x={C.x} y={C.y - 10} fill={labelColor} variants={fadeVariant}>C</motion.text>
        <motion.text x={D.x + 5} y={D.y + 5} fill={labelColor} variants={fadeVariant}>D</motion.text>
        <motion.text x={E.x} y={E.y + 15} fill={labelColor} variants={fadeVariant}>E</motion.text>

        {/* --- IMPROVED Angles --- */}
        <AnimatedAngleArc p1={A} vertex={C} p2={D} color={highlightColor} commonProps={{...commonProps, strokeWidth: 3, fill: highlightColor, fillOpacity: 0.4}} radius={20} />
        <AnimatedAngleArc p1={A} vertex={D} p2={C} color={highlightColor} commonProps={{...commonProps, strokeWidth: 3, fill: highlightColor, fillOpacity: 0.4}} radius={20} />
      </motion.svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q6 from image) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#64748B';
  
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 100, y: 30 }, B: { x: 30, y: 140 }, C: { x: 170, y: 140 } };
  const T2 = { P: { x: 300, y: 30 }, Q: { x: 230, y: 140 }, R: { x: 370, y: 140 } };
  
  // Calculate label positions
  const labelA1Pos = getAngleLabelPosition(T1.B, T1.A, T1.C, 25);
  const labelB1Pos = getAngleLabelPosition(T1.A, T1.B, T1.C, 25);
  const labelDPos = getAngleLabelPosition(T2.Q, T2.P, T2.R, 25);
  const labelEPos = getAngleLabelPosition(T2.P, T2.Q, T2.R, 25);

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
        {/* Triangle 1 (ABC) */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={T1.A.x} y={T1.A.y - 10} fill={labelColor} textAnchor="middle" variants={fadeVariant}>A</motion.text>
          <motion.text x={T1.B.x - 15} y={T1.B.y + 5} fill={labelColor} variants={fadeVariant}>B</motion.text>
          <motion.text x={T1.C.x + 5} y={T1.C.y + 5} fill={labelColor} variants={fadeVariant}>C</motion.text>
          <motion.text x={(T1.B.x + T1.C.x)/2} y={T1.B.y + 15} fill={labelColor} textAnchor="middle" variants={fadeVariant}>4</motion.text>
          <motion.text x={(T1.A.x + T1.C.x)/2 + 10} y={(T1.A.y + T1.C.y)/2} fill={labelColor} variants={fadeVariant}>y</motion.text>
          
          {/* Angles for T1 */}
          <AnimatedAngleArc p1={T1.B} vertex={T1.A} p2={T1.C} color={angleBlue} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T1.A} vertex={T1.B} p2={T1.C} color={angleGreen} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T1.C} vertex={T1.B} p2={T1.A} color={angleGreen} commonProps={commonProps} radius={18} />
          
          {/* Side Markings T1 */}
          <AnimatedSideMarks p1={T1.A} p2={T1.C} numMarks={2} color={strokeColor} commonProps={commonProps} />
        </motion.g>

        {/* Triangle 2 (PQR) - Renamed from DEF */}
        <motion.g variants={groupVariants}>
          <motion.path d={`M ${T2.P.x} ${T2.P.y} L ${T2.Q.x} ${T2.Q.y} L ${T2.R.x} ${T2.R.y} Z`} stroke={strokeColor} {...commonProps} variants={drawVariant} />
          <motion.text x={T2.P.x} y={T2.P.y - 10} fill={labelColor} textAnchor="middle" variants={fadeVariant}>P</motion.text>
          <motion.text x={T2.Q.x - 15} y={T2.Q.y + 5} fill={labelColor} variants={fadeVariant}>Q</motion.text>
          <motion.text x={T2.R.x + 5} y={T2.R.y + 5} fill={labelColor} variants={fadeVariant}>R</motion.text>
          <motion.text x={(T2.Q.x + T2.R.x)/2} y={T2.Q.y + 15} fill={labelColor} textAnchor="middle" variants={fadeVariant}>x</motion.text>
          <motion.text x={(T2.P.x + T2.Q.x)/2 - 10} y={(T2.P.y + T2.Q.y)/2} fill={labelColor} variants={fadeVariant}>6</motion.text>
          
          {/* Angles for T2 */}
          <AnimatedAngleArc p1={T2.Q} vertex={T2.P} p2={T2.R} color={angleBlue} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T2.P} vertex={T2.Q} p2={T2.R} color={angleGreen} commonProps={commonProps} radius={15} />
          <AnimatedAngleArc p1={T2.R} vertex={T2.Q} p2={T2.P} color={angleGreen} commonProps={commonProps} radius={18} />
          
          {/* Side Markings T2 */}
          <AnimatedSideMarks p1={T2.P} p2={T2.R} numMarks={2} color={strokeColor} commonProps={commonProps} />
        </motion.g>
      </motion.svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function AsaSlide4() {
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
      id: 'asa-calculation-quiz',
      conceptId: 'asa-calculation',
      conceptName: 'ASA Calculation',
      type: 'judging',
      description: 'Using ASA and CPCTC to calculate unknown values'
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
      id: 'asa-calc-q1',
      question: 'In the figure above, AD = 4m, AB = 3m, BD = 3m, BC = 1m, and CE = 2x - 5. What is the value of x?',
      figure: <FigureQ1 />,
      options: [
        "6m",
        "3.5m",
        "4m",
        "8m",
        "5m"
      ],
      correctAnswer: "4m",
      explanation:
        "First, find AC by adding AB and BC: AC = 3 + 1 = 4m. We are given AD = 4m, so AC and AD are equal. Angle A is shared, so it matches in both triangles. The orange angles at C and D are also equal. This matches the ASA rule, so triangle CAE and triangle DAB are congruent. Because the triangles are congruent, CE equals BD. So we set 2x - 5 = 3. Solving gives 2x = 8, so x = 4."
    },
    {
      id: 'asa-calc-q2',
      question: 'In the figure above, find the value of 3x - y.',
      figure: <FigureQ2 />,
      options: [
        "18",
        "9",
        "6",
        "13",
        "15"
      ],
      correctAnswer: "9",
      explanation:
        "The triangles are congruent by ASA. The green angles (at B and Q) match, the side marked with two hash lines (AC and PR) is the included side, and the blue angles (at A and P) match. So ΔABC ≅ ΔPQR. This means matching sides are equal. AC corresponds to PR, so y = 6. BC corresponds to QR, so x = 5. Now calculate 3x - y: 3(5) - 6 = 15 - 6 = 9."
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
      interactionId: `asa-calc-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'asa-calculation',
      conceptName: 'ASA Calculation',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Calculating Length Using ASA</h2>
            <p className="text-lg leading-relaxed mb-4">
              In the figure below, AC = 12, AE = 5, ED = 7, BD = 10, and CE = 3x - 2. What is the value of x?
            </p>
            
            <div className="w-full flex justify-center items-center p-4 my-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
                <FigureQ1 />
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              First, notice that AC is equal to AD because:
            </p>

            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono">
              AD = AE + ED = 5 + 7 = 12
            </div>

            <p className="text-lg leading-relaxed">
              And AC is also given as 12.
            </p>

            <p className="text-lg leading-relaxed mt-4">
              Now, we can prove that triangle CAE is congruent to triangle DAB by ASA:
            </p>

            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Angle:</strong> Angle A is shared by both triangles.
              </li>
              <li>
                <strong>Side:</strong> AC and AD are equal (as shown above).
              </li>
              <li>
                <strong>Angle:</strong> Angle ACE is equal to Angle ADB (shown by the matching colored angle marks in the diagram).
              </li>
            </ul>

            <p className="text-lg leading-relaxed mt-4">
              Therefore, all corresponding sides must be congruent (CPCTC). In particular, CE ≅ BD.
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono">
              CE = BD<br/>
              3x - 2 = 10<br/>
              3x = 12<br/>
              x = 4
            </div>
          </div>
        </div>

        {/* Right Column - Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Calculation Practice</h3>
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
                <div className="text-3xl mb-4">📊</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Perfect! You're a pro at this." : 'Well done!'}
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
      slideId="asa-calculation"
      slideTitle="Calculating with ASA and CPCTC"
      moduleId="congruence"
      submoduleId="asa-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}