import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import katex from 'katex'; // Import katex

// --- HELPER COMPONENTS FOR GEOMETRY ---

// Define a simple Point type
type Point = { x: number; y: number };

// --- COMPONENT 1: AngleArc ---
interface AngleArcProps {
  p1: Point;
  vertex: Point;
  p2: Point;
  radius: number;
  stroke: string;
  strokeWidth?: number;
}

const AngleArc: React.FC<AngleArcProps> = ({
  p1,
  vertex,
  p2,
  radius,
  stroke,
  strokeWidth = 2,
}) => {
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
  const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  if (mag1 === 0 || mag2 === 0) return null;
  const normV1 = { x: v1.x / mag1, y: v1.y / mag1 };
  const normV2 = { x: v2.x / mag2, y: v2.y / mag2 };
  const start = { x: vertex.x + radius * normV1.x, y: vertex.y + radius * normV1.y };
  const end = { x: vertex.x + radius * normV2.x, y: vertex.y + radius * normV2.y };
  const dot = normV1.x * normV2.x + normV1.y * normV2.y;
  const angle = Math.acos(Math.max(-1, Math.min(1, dot)));
  const largeArcFlag = angle > Math.PI ? 1 : 0;
  const cross = v1.x * v2.y - v1.y * v2.x;
  const sweepFlag = cross > 0 ? 1 : 0;
  const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
  return <path d={d} stroke={stroke} strokeWidth={strokeWidth} fill="none" />;
};

// --- COMPONENT 2: LineTick ---
interface LineTickProps {
  p1: Point;
  p2: Point;
  position?: number; // 0.0 to 1.0 (default 0.5)
  size?: number;     // length of the tick (default 10)
  stroke: string;
  strokeWidth?: number;
}

const LineTick: React.FC<LineTickProps> = ({
  p1,
  p2,
  position = 0.5,
  size = 10,
  stroke,
  strokeWidth = 2,
}) => {
  const P = {
    x: p1.x + (p2.x - p1.x) * position,
    y: p1.y + (p2.y - p1.y) * position,
  };
  const V = { x: p2.x - p1.x, y: p2.y - p1.y };
  const N = { x: -V.y, y: V.x };
  const magN = Math.sqrt(N.x * N.x + N.y * N.y);
  if (magN === 0) return null;
  const normN = { x: N.x / magN, y: N.y / magN };
  const T1 = {
    x: P.x - normN.x * (size / 2),
    y: P.y - normN.y * (size / 2),
  };
  const T2 = {
    x: P.x + normN.x * (size / 2),
    y: P.y + normN.y * (size / 2),
  };
  const d = `M ${T1.x} ${T1.y} L ${T2.x} ${T2.y}`;
  return <path d={d} stroke={stroke} strokeWidth={strokeWidth} />;
};

// --- END OF HELPER COMPONENTS ---


// --- FIGURE FOR EXAMPLE (Left Side) (UPDATED) ---
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const sideColor = isDarkMode ? '#F472B6' : '#EC4899'; // Pink for given side
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 30, y: 140 }, B: { x: 170, y: 140 }, C: { x: 100, y: 30 } };
  const T2 = { T: { x: 370, y: 140 }, U: { x: 230, y: 140 }, V: { x: 300, y: 30 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* T1 (ABC) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>A</text>
        <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>B</text>
        <text x={T1.C.x} y={T1.C.y - 5} fill={strokeColor} textAnchor="middle">C</text>
        <text x={(T1.A.x + T1.B.x)/2} y={T1.A.y + 15} fill={strokeColor}>x</text>
        <text x={(T1.A.x + T1.C.x)/2 - 10} y={(T1.A.y + T1.C.y)/2} fill={strokeColor}>y</text>
        <text x={(T1.B.x + T1.C.x)/2 + 10} y={(T1.B.y + T1.C.y)/2} fill={strokeColor}>7</text>
        {/* Markings */}
        <AngleArc p1={T1.C} vertex={T1.A} p2={T1.B} radius={15} stroke={angleBlue} {...commonProps} />
        <AngleArc p1={T1.A} vertex={T1.B} p2={T1.C} radius={15} stroke={angleGreen} {...commonProps} />
        <LineTick p1={T1.B} p2={T1.C} stroke={sideColor} {...commonProps} />

        {/* T2 (TUV) */}
        <path d={`M ${T2.T.x} ${T2.T.y} L ${T2.U.x} ${T2.U.y} L ${T2.V.x} ${T2.V.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.T.x + 5} y={T2.T.y + 5} fill={strokeColor}>T</text>
        <text x={T2.U.x - 15} y={T2.U.y + 5} fill={strokeColor}>U</text>
        <text x={T2.V.x} y={T2.V.y - 5} fill={strokeColor} textAnchor="middle">V</text>
        <text x={(T2.U.x + T2.V.x)/2 - 10} y={(T2.U.y + T2.V.y)/2} fill={strokeColor}>7</text>
        {/* Markings */}
        <AngleArc p1={T2.V} vertex={T2.T} p2={T2.U} radius={15} stroke={angleBlue} {...commonProps} />
        <AngleArc p1={T2.T} vertex={T2.U} p2={T2.V} radius={15} stroke={angleGreen} {...commonProps} />
        <LineTick p1={T2.U} p2={T2.V} stroke={sideColor} {...commonProps} />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 1 (Q5 from image) (UPDATED) ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 160;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const sideColor = isDarkMode ? '#F472B6' : '#EC4899'; // Pink for given side
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const T1 = { A: { x: 30, y: 140 }, B: { x: 170, y: 140 }, C: { x: 100, y: 30 } }; // XYZ
  const T2 = { T: { x: 370, y: 140 }, U: { x: 230, y: 140 }, V: { x: 300, y: 30 } }; // TUV

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* T1 (XYZ) */}
        <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>X</text>
        <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>Y</text>
        <text x={T1.C.x} y={T1.C.y - 5} fill={strokeColor} textAnchor="middle">Z</text>
        <text x={(T1.A.x + T1.B.x)/2} y={T1.A.y + 15} fill={strokeColor}>x</text>
        <text x={(T1.A.x + T1.C.x)/2 - 10} y={(T1.A.y + T1.C.y)/2} fill={strokeColor}>y</text>
        <text x={(T1.B.x + T1.C.x)/2 + 10} y={(T1.B.y + T1.C.y)/2} fill={strokeColor}>10</text>
        {/* Markings */}
        <AngleArc p1={T1.C} vertex={T1.A} p2={T1.B} radius={15} stroke={angleBlue} {...commonProps} />
        <AngleArc p1={T1.A} vertex={T1.B} p2={T1.C} radius={15} stroke={angleGreen} {...commonProps} />
        <LineTick p1={T1.B} p2={T1.C} stroke={sideColor} {...commonProps} />

        {/* T2 (TUV) */}
        <path d={`M ${T2.T.x} ${T2.T.y} L ${T2.U.x} ${T2.U.y} L ${T2.V.x} ${T2.V.y} Z`} stroke={strokeColor} {...commonProps} />
        <text x={T2.T.x + 5} y={T2.T.y + 5} fill={strokeColor}>T</text>
        <text x={T2.U.x - 15} y={T2.U.y + 5} fill={strokeColor}>U</text>
        <text x={T2.V.x} y={T2.V.y - 5} fill={strokeColor} textAnchor="middle">V</text>
        <text x={(T2.U.x + T2.T.x)/2} y={T2.U.y + 15} fill={strokeColor}>10</text>
         {/* Markings */}
        <AngleArc p1={T2.V} vertex={T2.T} p2={T2.U} radius={15} stroke={angleBlue} {...commonProps} />
        <AngleArc p1={T2.T} vertex={T2.U} p2={T2.V} radius={15} stroke={angleGreen} {...commonProps} />
        <LineTick p1={T2.T} p2={T2.V} stroke={sideColor} {...commonProps} />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 (Q6 from image) (UPDATED) ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB'; // For vertical angles
  const sideGreen = isDarkMode ? '#4ADE80' : '#22C55E'; // For given sides
  const commonProps = { fill: 'none', strokeWidth: 2 };

  const A = { x: 200, y: 120 }; // Intersection
  const B = { x: 130, y: 100 };
  const C = { x: 100, y: 30 };
  const D = { x: 300, y: 30 };
  const E = { x: 270, y: 100 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`50 0 ${svgWidth} ${svgHeight}`}>
        {/* Lines */}
        <path d={`M ${C.x} ${C.y} L ${A.x} ${A.y} L ${E.x} ${E.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${D.x} ${D.y} L ${A.x} ${A.y} L ${B.x} ${B.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${C.x} ${C.y} L ${E.x} ${E.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${D.x} ${D.y} L ${B.x} ${B.y}`} stroke={strokeColor} {...commonProps} />
        
        {/* Labels */}
        <text x={A.x} y={A.y + 20} fill={strokeColor} textAnchor="middle">A</text>
        <text x={B.x - 15} y={B.y} fill={strokeColor}>B</text>
        <text x={C.x - 15} y={C.y} fill={strokeColor}>C</text>
        <text x={D.x + 5} y={D.y} fill={strokeColor}>D</text>
        <text x={E.x + 5} y={E.y} fill={strokeColor}>E</text>

        {/* --- AAS Markings from Explanation --- */}
        {/* A: Angle C & D (Orange) */}
        <AngleArc p1={A} vertex={C} p2={E} radius={15} stroke={angleOrange} {...commonProps} />
        <AngleArc p1={A} vertex={D} p2={B} radius={15} stroke={angleOrange} {...commonProps} />
        
        {/* A: Vertical Angles at A (Blue) */}
        <AngleArc p1={C} vertex={A} p2={E} radius={18} stroke={angleBlue} {...commonProps} />
        <AngleArc p1={D} vertex={A} p2={B} radius={18} stroke={angleBlue} {...commonProps} />
        
        {/* S: Side CE & BD (Green) */}
        <LineTick p1={C} p2={E} stroke={sideGreen} {...commonProps} />
        <LineTick p1={B} p2={D} stroke={sideGreen} {...commonProps} />
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function AasSlide4() {
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
      id: 'aas-finding-lengths-quiz',
      conceptId: 'aas-finding-lengths',
      conceptName: 'AAS Finding Lengths',
      type: 'judging',
      description: 'Testing using AAS and CPCTC to find unknown lengths'
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

  // --- *** UPDATED QUESTIONS ARRAY *** ---
 // Make sure you have: import katex from 'katex'; at the top of your file.

const questions: QuizQuestion[] = [
  {
    id: 'aas-find-perimeter-q5',
question: "The perimeter of triangle \\triangle TUV is 27. What is the value of x + y?",
    figure: <FigureQ1 />,
    options: [
      "13",
      "15",
      "17",
      "19",
      "12"
    ],
    correctAnswer: "17",
    explanation:
      "<strong class='text-slate-800 dark:text-slate-100'>Correct!</strong>" +
      "<p class='mt-2'>The triangles are congruent by $AAS$. By $CPCTC$, the corresponding sides are equal:</p>" +
      "<ul class='list-disc list-outside ml-5 mt-2 space-y-1'>" +
        "<li>" + katex.renderToString("\\overline{XY} \\cong \\overline{TU}", { throwOnError: false }) + ", so " + katex.renderToString("TU = x", { throwOnError: false }) + ".</li>" +
        "<li>" + katex.renderToString("\\overline{XZ} \\cong \\overline{TV}", { throwOnError: false }) + ", so " + katex.renderToString("TV = y", { throwOnError: false }) + ".</li>" +
      "</ul>" +
      "<p class='mt-2'>The perimeter of $\\triangle TUV$ is " + katex.renderToString("TU + UV + VT = 27", { throwOnError: false }) + ".</p>" +
      "<p class='mt-1'>Substituting the values gives: " + katex.renderToString("x + 10 + y = 27", { throwOnError: false }) + ".</p>" +
      "<p class='mt-1'>Therefore, <strong>" + katex.renderToString("x + y = 17", { throwOnError: false }) + "</strong>.</p>"
  },
  {
    id: 'aas-find-length-q6',
question: "In the diagram, \\overline{CE} \\cong \\overline{BD} and \\angle C \\cong \\angle D. If AB = 3x + 7 and AE = 7x - 3, what is the value of x?",
    figure: <FigureQ2 />,
    options: [
      "3.5",
      "2.5",
      "2",
      "4",
      "3"
    ],
    correctAnswer: "2.5",
    explanation:
      "<strong class='text-slate-800 dark:text-slate-100'>Correct!</strong>" +
      "<p class='mt-2'>The triangles " + katex.renderToString("\\triangle ACE", { throwOnError: false }) + " and " + katex.renderToString("\\triangle ABD", { throwOnError: false }) + " are congruent by $AAS$. Here's the proof:</p>" +
      "<ul class='list-disc list-outside ml-5 mt-2 space-y-1'>" +
        "<li><strong>A:</strong> " + katex.renderToString("\\angle C \\cong \\angle D", { throwOnError: false }) + " (Given)</li>" +
        "<li><strong>A:</strong> " + katex.renderToString("\\angle CAE \\cong \\angle DAB", { throwOnError: false }) + " (Vertical Angles)</li>" +
        "<li><strong>S:</strong> " + katex.renderToString("\\overline{CE} \\cong \\overline{BD}", { throwOnError: false }) + " (Given)</li>" +
      "</ul>" +
      "<p class='mt-2'>By $CPCTC$, the corresponding sides " + katex.renderToString("\\overline{AE}", { throwOnError: false }) + " and " + katex.renderToString("\\overline{AB}", { throwOnError: false }) + " are congruent.</p>" +
      "<p class='mt-1'>Set their lengths equal: " + katex.renderToString("7x - 3 = 3x + 7", { throwOnError: false }) + ".</p>" +
      "<p class='mt-1'>Solving for $x$: " + katex.renderToString("4x = 10", { throwOnError: false }) + ", so <strong>" + katex.renderToString("x = 2.5", { throwOnError: false }) + "</strong>.</p>"
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
      interactionId: `aas-find-length-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'aas-finding-lengths',
      conceptName: 'AAS Finding Lengths',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Calculating Length Using AAS</h2>
            <p className="text-lg leading-relaxed mb-4">
              The perimeter of a triangle $\triangle TUV$ is 22. What is the value of $x + y$?
            </p>
            
            <FigureExample />

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Explanation</h3>
            
            <p className="text-lg leading-relaxed">
              Notice that $\triangle TUV$ and $\triangle ABC$ are congruent by AAS since we have the following pairs of congruent angles and corresponding non-included sides:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
                <li dangerouslySetInnerHTML={{ __html: katex.renderToString("\\overline{BC} \\cong \\overline{UV} \\text{ (Given Side)}", { throwOnError: false }) }} />
                <li dangerouslySetInnerHTML={{ __html: katex.renderToString("\\angle A \\cong \\angle T \\text{ (Given Angle)}", { throwOnError: false }) }} />
                <li dangerouslySetInnerHTML={{ __html: katex.renderToString("\\angle B \\cong \\angle U \\text{ (Given Angle)}", { throwOnError: false }) }} />
            </ul>

            <p className="text-lg leading-relaxed mt-4">
              Therefore, all the corresponding sides of the triangles must be congruent. In particular, $UT = AB = x$ and $VT = AC = y$.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Since the perimeter of $\triangle TUV$ is 22, we obtain
            </p>
            <div className="my-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-center font-mono text-lg"
                 dangerouslySetInnerHTML={{ __html: katex.renderToString("UT + UV + VT = 22", { throwOnError: false, displayMode: true }) +
                                              katex.renderToString("x + 7 + y = 22", { throwOnError: false, displayMode: true }) +
                                              katex.renderToString("x + y = 15", { throwOnError: false, displayMode: true })
                                      }}
            />
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
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
                <div 
                  className="text-lg mb-4 mt-6 break-words"
                  dangerouslySetInnerHTML={{ __html: katex.renderToString(questions[currentQuestionIndex].question, { throwOnError: false }) }}
                ></div>
                
                {/* --- Answer Options --- */}
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, idx) => {
                    
                    // --- *** UPDATED Button Logic *** ---
                    const disabled = showFeedback;
                    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
                    const isSelected = selectedAnswer === option;
                    let style = '';
                    if (showFeedback) {
                      if (isCorrect) {
                        style = 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'; // CORRECT
                      } else if (isSelected && !isCorrect) {
                        style = 'border-red-500 bg-red-100 dark:bg-red-800 opacity-70'; // INCORRECT
                      } else {
                        style = 'border-slate-300 dark:border-slate-600 opacity-50'; // Faded/Disabled
                      }
                    } else {
                      if (isSelected) {
                        style = 'border-blue-500 bg-blue-50 dark:bg-blue-900/3D'; // Selected
                      } else {
                        style = 'border-slate-300 dark:border-slate-600 hover:border-blue-400'; // Default
                      }
                    }
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${style} ${disabled ? 'cursor-default' : 'cursor-pointer'}`;
                    // --- *** END Button Logic *** ---

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
                      <div 
                        className="text-lg text-slate-600 dark:text-slate-400 mb-4"
                        dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].explanation }}
                      >
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
                <div className="text-3xl mb-4">📏</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered this concept!" : 'Good practice!'}
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
      slideId="aas-finding-lengths"
      slideTitle="Calculating the Length of a Line Segment Using AAS"
      moduleId="congruence"
      submoduleId="aas-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}