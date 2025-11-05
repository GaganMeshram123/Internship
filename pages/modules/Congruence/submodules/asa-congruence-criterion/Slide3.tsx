import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE FOR QUIZ QUESTION 1 ---
const FigureQ1: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const highlightColor = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const questionColor = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue

  const T1_Q1 = { A: { x: 80, y: 50 }, B: { x: 30, y: 180 }, C: { x: 180, y: 180 } };
  const T2_Q1 = { D: { x: 320, y: 50 }, E: { x: 270, y: 180 }, F: { x: 420, y: 180 } };
  const commonProps = { fill: 'none', strokeWidth: 2 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <g key="q1">
          {/* Triangles */}
          <path d={`M ${T1_Q1.A.x} ${T1_Q1.A.y} L ${T1_Q1.B.x} ${T1_Q1.B.y} L ${T1_Q1.C.x} ${T1_Q1.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <path d={`M ${T2_Q1.D.x} ${T2_Q1.D.y} L ${T2_Q1.E.x} ${T2_Q1.E.y} L ${T2_Q1.F.x} ${T2_Q1.F.y} Z`} stroke={strokeColor} {...commonProps} />
          
          {/* Markings for Q1 (ASA) */}
          <text x={T1_Q1.A.x + 5} y={T1_Q1.A.y - 10} fill={questionColor} fontSize="14" fontWeight="bold">x</text>
          <path d={`M ${T1_Q1.A.x} ${T1_Q1.A.y + 20} A 20 20 0 0 1 ${T1_Q1.A.x + 19} ${T1_Q1.A.y + 6}`} stroke={questionColor} {...commonProps} />
          <text x={T2_Q1.D.x + 5} y={T2_Q1.D.y - 10} fill={strokeColor} fontSize="14">70°</text>
          <path d={`M ${T2_Q1.D.x} ${T2_Q1.D.y + 20} A 20 20 0 0 1 ${T2_Q1.D.x + 19} ${T2_Q1.D.y + 6}`} stroke={strokeColor} {...commonProps} />

          <path d={`M ${T1_Q1.B.x + 20} ${T1_Q1.B.y} A 20 20 0 0 0 ${T1_Q1.B.x + 15.45} ${T1_Q1.B.y - 12.85}`} stroke={highlightColor} {...commonProps} />
          <path d={`M ${T2_Q1.E.x + 20} ${T2_Q1.E.y} A 20 20 0 0 0 ${T2_Q1.E.x + 15.45} ${T2_Q1.E.y - 12.85}`} stroke={highlightColor} {...commonProps} />
          <text x={T1_Q1.B.x + 10} y={T1_Q1.B.y - 20} fill={strokeColor} fontSize="14">80°</text>

          <line x1={T1_Q1.B.x} y1={T1_Q1.B.y} x2={T1_Q1.C.x} y2={T1_Q1.C.y} stroke={highlightColor} strokeWidth="4" />
          <line x1={T2_Q1.E.x} y1={T2_Q1.E.y} x2={T2_Q1.F.x} y2={T2_Q1.F.y} stroke={highlightColor} strokeWidth="4" />

          <path d={`M ${T1_Q1.C.x - 20} ${T1_Q1.C.y} A 20 20 0 0 1 ${T1_Q1.C.x - 15.45} ${T1_Q1.C.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
          <path d={`M ${T2_Q1.F.x - 20} ${T2_Q1.F.y} A 20 20 0 0 1 ${T2_Q1.F.x - 15.45} ${T2_Q1.F.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
          <text x={T1_Q1.C.x - 20} y={T1_Q1.C.y - 20} fill={strokeColor} fontSize="14">30°</text>
        </g>
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 2 ---
const FigureQ2: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const highlightColor = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const questionColor = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue

  const T1_Q2 = { A: { x: 80, y: 50 }, B: { x: 30, y: 180 }, C: { x: 180, y: 180 } };
  const T2_Q2 = { D: { x: 320, y: 50 }, E: { x: 270, y: 180 }, F: { x: 420, y: 180 } };
  const commonProps = { fill: 'none', strokeWidth: 2 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <g key="q2">
          {/* Triangles */}
          <path d={`M ${T1_Q2.A.x} ${T1_Q2.A.y} L ${T1_Q2.B.x} ${T1_Q2.B.y} L ${T1_Q2.C.x} ${T1_Q2.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={T1_Q2.A.x} y={T1_Q2.A.y - 5} fill={strokeColor} fontSize="14">P</text>
          <text x={T1_Q2.B.x - 15} y={T1_Q2.B.y + 5} fill={strokeColor} fontSize="14">Q</text>
          <text x={T1_Q2.C.x + 5} y={T1_Q2.C.y + 5} fill={strokeColor} fontSize="14">R</text>

          <path d={`M ${T2_Q2.D.x} ${T2_Q2.D.y} L ${T2_Q2.E.x} ${T2_Q2.E.y} L ${T2_Q2.F.x} ${T2_Q2.F.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={T2_Q2.D.x} y={T2_Q2.D.y - 5} fill={strokeColor} fontSize="14">X</text>
          <text x={T2_Q2.E.x - 15} y={T2_Q2.E.y + 5} fill={strokeColor} fontSize="14">Y</text>
          <text x={T2_Q2.F.x + 5} y={T2_Q2.F.y + 5} fill={strokeColor} fontSize="14">Z</text>
          
          {/* Markings for Q2 (ASA) */}
          {/* Angle Q & Z (TRAP!) */}
          <path d={`M ${T1_Q2.B.x + 20} ${T1_Q2.B.y} A 20 20 0 0 0 ${T1_Q2.B.x + 15.45} ${T1_Q2.B.y - 12.85}`} stroke={highlightColor} {...commonProps} />
          <text x={T1_Q2.B.x + 10} y={T1_Q2.B.y - 20} fill={strokeColor} fontSize="14">55°</text>
          <path d={`M ${T2_Q2.F.x - 20} ${T2_Q2.F.y} A 20 20 0 0 1 ${T2_Q2.F.x - 15.45} ${T2_Q2.F.y - 12.85}`} stroke={highlightColor} {...commonProps} />
          <text x={T2_Q2.F.x - 20} y={T2_Q2.F.y - 20} fill={strokeColor} fontSize="14">55°</text>

          {/* Side QR & YZ */}
          <line x1={T1_Q2.B.x} y1={T1_Q2.B.y} x2={T1_Q2.C.x} y2={T1_Q2.C.y} stroke={highlightColor} strokeWidth="4" />
          <line x1={T2_Q2.E.x} y1={T2_Q2.E.y} x2={T2_Q2.F.x} y2={T2_Q2.F.y} stroke={highlightColor} strokeWidth="4" />

          {/* Angle R & Y (TRAP!) */}
          <path d={`M ${T1_Q2.C.x - 20} ${T1_Q2.C.y} A 20 20 0 0 1 ${T1_Q2.C.x - 15.45} ${T1_Q2.C.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
          <text x={T1_Q2.C.x - 20} y={T1_Q2.C.y - 20} fill={strokeColor} fontSize="14">40°</text>
          <path d={`M ${T2_Q2.E.x + 20} ${T2_Q2.E.y} A 20 20 0 0 0 ${T2_Q2.E.x + 15.45} ${T2_Q2.E.y - 12.85}`} stroke={highlightColor} {...commonProps} strokeDasharray="4 4" />
          <text x={T2_Q2.E.x + 10} y={T2_Q2.E.y - 20} fill={strokeColor} fontSize="14">40°</text>

          {/* Question parts */}
          <text x={T1_Q2.A.x + 5} y={T1_Q2.A.y - 10} fill={questionColor} fontSize="14" fontWeight="bold">y</text>
          <path d={`M ${T1_Q2.A.x} ${T1_Q2.A.y + 20} A 20 20 0 0 1 ${T1_Q2.A.x + 19} ${T1_Q2.A.y + 6}`} stroke={questionColor} {...commonProps} />
          <text x={T2_Q2.D.x + 5} y={T2_Q2.D.y - 10} fill={strokeColor} fontSize="14">85°</text>
          <path d={`M ${T2_Q2.D.x} ${T2_Q2.D.y + 20} A 20 20 0 0 1 ${T2_Q2.D.x + 19} ${T2_Q2.D.y + 6}`} stroke={strokeColor} {...commonProps} />
        </g>
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 3 (NEW) ---
const FigureQ3: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const angleAOBColor = isDarkMode ? '#F9B572' : '#F59E0B'; // Orange
  const angleOBAColor = isDarkMode ? '#5EEAD4' : '#0D9488'; // Green

  const commonProps = {
    fill: 'none',
    strokeWidth: 2,
  };

  // Points for the pentagon
  const O = { x: 100, y: 110 };
  const A = { x: 230, y: 180 };
  const B = { x: 300, y: 110 };
  const C = { x: 230, y: 40 };
  const D = { x: 150, y: 30 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Draw all lines */}
        <path d={`M ${O.x} ${O.y} L ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} Z`} stroke={strokeColor} fill={isDarkMode ? 'rgb(30 41 59 / 0.5)' : 'rgb(241 245 249 / 0.5)'} />
        <path d={`M ${O.x} ${O.y} L ${B.x} ${B.y}`} stroke={strokeColor} strokeWidth="2.5" />
        <path d={`M ${O.x} ${O.y} L ${A.x} ${A.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${O.x} ${O.y} L ${C.x} ${C.y}`} stroke={strokeColor} {...commonProps} />
        <path d={`M ${O.x} ${O.y} L ${D.x} ${D.y}`} stroke={strokeColor} {...commonProps} />

        {/* Labels */}
        <text x={O.x - 15} y={O.y + 5} fill={strokeColor}>O</text>
        <text x={A.x + 5} y={A.y + 5} fill={strokeColor}>A</text>
        <text x={B.x + 5} y={B.y + 5} fill={strokeColor}>B</text>
        <text x={C.x + 5} y={C.y} fill={strokeColor}>C</text>
        <text x={D.x - 15} y={D.y} fill={strokeColor}>D</text>

        {/* Markings for AOB */}
        <path d={`M ${O.x + 20} ${O.y + 4.2} A 20 20 0 0 1 ${O.x + 11.5} ${O.y + 16.4}`} stroke={angleAOBColor} strokeWidth="3" fill={angleAOBColor} fillOpacity="0.4" />
        <path d={`M ${B.x - 20} ${B.y} A 20 20 0 0 1 ${B.x - 13.5} ${B.y + 14.7}`} stroke={angleOBAColor} strokeWidth="3" fill={angleOBAColor} fillOpacity="0.4" />
        <path d={`M ${B.x - 23} ${B.y} A 23 23 0 0 1 ${B.x - 15.5} ${B.y + 16.9}`} stroke={angleOBAColor} strokeWidth="3" />
        <line x1={255} y1={142} x2={265} y2={148} stroke={strokeColor} strokeWidth="2" /> {/* OB 1 hash */}
        <line x1={168} y1={148} x2={178} y2={154} stroke={strokeColor} strokeWidth="2" /> {/* OA 2 hashes */}
        <line x1={172} y1={145} x2={182} y2={151} stroke={strokeColor} strokeWidth="2" />

        {/* Markings for COD */}
        <path d={`M ${O.x + 11.5} ${O.y - 16.4} A 20 20 0 0 1 ${O.x + 20} ${O.y - 4.2}`} stroke={angleAOBColor} strokeWidth="3" fill={angleAOBColor} fillOpacity="0.4" />
        <line x1={127} y1={67} x2={135} y2={60} stroke={strokeColor} strokeWidth="2" /> {/* OD 1 hash */}
        <line x1={168} y1={72} x2={178} y2={68} stroke={strokeColor} strokeWidth="2" /> {/* OC 2 hashes */}
        <line x1={172} y1={75} x2={182} y2={71} stroke={strokeColor} strokeWidth="2" />
        <line x1={188} y1={35} x2={196} y2={39} stroke={strokeColor} strokeWidth="2" /> {/* CD 3 hashes */}
        <line x1={191} y1={33} x2={199} y2={37} stroke={strokeColor} strokeWidth="2" />
        <line x1={194} y1={31} x2={202} y2={35} stroke={strokeColor} strokeWidth="2" />
      </svg>
    </div>
  );
};

// --- FIGURE FOR QUIZ QUESTION 4 (NEW) ---
const FigureQ4: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  // Colors from image
  const angle1Color = isDarkMode ? '#FDE047' : '#EAB308'; // Yellow
  const angle2Color = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const angle3Color = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const sideColor = isDarkMode ? '#E2E8F0' : '#4A5568';

  const commonProps = {
    fill: 'none',
    strokeWidth: 2,
  };

  // --- Triangle Definitions ---
  const P = { A: { x: 50, y: 100 }, B: { x: 150, y: 100 }, C: { x: 130, y: 10 } };
  const T1 = { A: { x: 250, y: 10 }, B: { x: 300, y: 100 }, C: { x: 370, y: 60 } };
  const T2 = { A: { x: 30, y: 200 }, B: { x: 170, y: 200 }, C: { x: 80, y: 120 } };
  const T3 = { A: { x: 230, y: 200 }, B: { x: 370, y: 200 }, C: { x: 320, y: 120 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        
        {/* --- Triangle P --- */}
        <g>
          <path d={`M ${P.A.x} ${P.A.y} L ${P.B.x} ${P.B.y} L ${P.C.x} ${P.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={P.A.x + 30} y={P.A.y - 20} fill={strokeColor} fontSize="14">P</text>
          {/* Angle A (Yellow) */}
          <path d={`M ${P.A.x + 15} ${P.A.y} A 15 15 0 0 1 ${P.A.x + 12.1} ${P.A.y - 8.8}`} stroke={angle1Color} {...commonProps} />
          {/* Side AB (1 hash) */}
          <line x1={P.A.x + 45} y1={P.A.y - 3} x2={P.A.x + 55} y2={P.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          {/* Angle B (Green) */}
          <path d={`M ${P.B.x - 15} ${P.B.y} A 15 15 0 0 0 ${P.B.x - 12.1} ${P.B.y - 8.8}`} stroke={angle2Color} {...commonProps} />
        </g>

        {/* --- Triangle T1 --- */}
        <g>
          <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={T1.A.x + 20} y={T1.A.y + 30} fill={strokeColor} fontSize="14">T₁</text>
          {/* Angle A (Green) */}
          <path d={`M ${T1.A.x + 13} ${T1.A.y + 8} A 15 15 0 0 1 ${T1.A.x} ${T1.A.y + 15}`} stroke={angle2Color} {...commonProps} />
          {/* Side AC (1 hash) */}
          <line x1={300} y1={30} x2={310} y2={25} stroke={sideColor} strokeWidth="1.5" />
          {/* Angle C (Blue) */}
          <path d={`M ${T1.C.x - 14} ${T1.C.y - 4} A 15 15 0 0 0 ${T1.C.x} ${T1.C.y - 15}`} stroke={angle3Color} {...commonProps} />
        </g>

        {/* --- Triangle T2 --- */}
        <g>
          <path d={`M ${T2.A.x} ${T2.A.y} L ${T2.B.x} ${T2.B.y} L ${T2.C.x} ${T2.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={T2.C.x} y={T2.C.y - 5} fill={strokeColor} fontSize="14" textAnchor="middle">T₂</text>
          {/* Angle A (Yellow) */}
          <path d={`M ${T2.A.x + 15} ${T2.A.y} A 15 15 0 0 1 ${T2.A.x + 13.6} ${T2.A.y - 6.5}`} stroke={angle1Color} {...commonProps} />
          {/* Side AB (3 hashes) */}
          <line x1={T2.A.x + 60} y1={T2.A.y - 3} x2={T2.A.x + 70} y2={T2.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          <line x1={T2.A.x + 65} y1={T2.A.y - 3} x2={T2.A.x + 75} y2={T2.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          <line x1={T2.A.x + 70} y1={T2.A.y - 3} x2={T2.A.x + 80} y2={T2.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          {/* Angle B (Blue) */}
          <path d={`M ${T2.B.x - 15} ${T2.B.y} A 15 15 0 0 0 ${T2.B.x - 13.6} ${T2.B.y - 6.5}`} stroke={angle3Color} {...commonProps} />
        </g>
        
        {/* --- Triangle T3 --- */}
        <g>
          <path d={`M ${T3.A.x} ${T3.A.y} L ${T3.B.x} ${T3.B.y} L ${T3.C.x} ${T3.C.y} Z`} stroke={strokeColor} {...commonProps} />
          <text x={T3.C.x} y={T3.C.y - 5} fill={strokeColor} fontSize="14" textAnchor="middle">T₃</text>
          {/* Angle A (Green) */}
          <path d={`M ${T3.A.x + 15} ${T3.A.y} A 15 15 0 0 1 ${T3.A.x + 13.6} ${T3.A.y - 6.5}`} stroke={angle2Color} {...commonProps} />
          {/* Side AB (1 hash) - INCLUDED */}
          <line x1={T3.A.x + 65} y1={T3.A.y - 3} x2={T3.A.x + 75} y2={T3.A.y + 3} stroke={sideColor} strokeWidth="1.5" />
          {/* Angle B (Yellow) */}
          <path d={`M ${T3.B.x - 15} ${T3.B.y} A 15 15 0 0 0 ${T3.B.x - 13.6} ${T3.B.y - 6.5}`} stroke={angle1Color} {...commonProps} />
        </g>
      </svg>
    </div>
  );
};
// --- END OF FIGURE COMPONENT DEFINITIONS ---


export default function AsaSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  // --- UPDATED FOR 4 QUESTIONS ---
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'asa-application-quiz',
      conceptId: 'asa-application',
      conceptName: 'ASA Application',
      type: 'judging',
      description: 'Testing application of ASA to find values and identify congruence'
    }
  ];

  // --- UPDATED INTERFACE TO INCLUDE FIGURE ---
  interface QuizQuestion {
    id: string;
    question: string;
    figure: React.ReactNode; // Added this line
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED QUESTIONS ARRAY (NOW 4 QUESTIONS) ---
  const questions: QuizQuestion[] = [
    {
      id: 'asa-find-angle-q1',
      question: 'The triangles are congruent by ASA. What is the value of x?',
      figure: <FigureQ1 />,
      options: [
        "30°",
        "70°",
        "80°",
        "Cannot be determined"
      ],
      correctAnswer: "70°",
      explanation: "Correct! The triangles are congruent by ASA ($\angle B \cong \angle E$, $BC \cong EF$, $\angle C \cong \angle F$). By CPCTC, all corresponding parts are congruent. $\angle A$ corresponds to $\angle D$. Since $\angle D = 70°$, then $x$ must also be 70°."
    },
    {
      id: 'asa-find-angle-q2',
      question: 'Look carefully! The triangles are congruent by ASA. What is the value of y?',
      figure: <FigureQ2 />,
      options: [
        "40°",
        "55°",
        "85°",
        "Cannot be determined"
      ],
      correctAnswer: "85°",
      explanation: "Correct! This tests if you are matching the parts correctly. The ASA pattern is $\angle Q \cong \angle Z$ (55°), $QR \cong ZY$ (side), and $\angle R \cong \angle Y$ (40°). This means the congruence statement is $\triangle PQR \cong \triangle XYZ$. By CPCTC, the remaining angle $\angle P$ corresponds to $\angle X$. Since $\angle X = 85°$, then $y$ must also be 85°."
    },
    {
      id: 'asa-quiz-q3-pentagon',
      question: 'According to the ASA criterion only, which of the following triangles are congruent to ΔAOB?',
      figure: <FigureQ3 />,
      options: [
        'ΔDBC',
        'ΔBCA',
        'ΔBOC',
        'ΔCOB',
        'ΔCOD'
      ],
      correctAnswer: 'ΔCOD',
      explanation: "This is a trap! The diagram *proves* congruence by SAS (Side-Angle-Side), NOT ASA. The question is flawed. However, the only triangle shown to be congruent to ΔAOB (by any method) is ΔCOD."
    },
    {
      id: 'asa-quiz-q4-identification',
      question: 'According to the ASA criterion only, which of the following triangles are congruent to P?',
      figure: <FigureQ4 />,
      options: [
        "T₁ and T₂ only",
        "T₃ only",
        "T₁, T₂, and T₃",
        "T₁ only",
        "T₂ only"
      ],
      correctAnswer: "T₃ only",
      explanation: "Correct! Triangle P has an Angle (yellow), an included Side (1 hash), and an Angle (green). Triangle T₃ has the exact same ASA pattern: an Angle (yellow), an included Side (1 hash), and an Angle (green)."
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
      interactionId: `asa-find-angle-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'asa-finding-angles',
      conceptName: 'ASA Finding Angles',
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

        {/* Left Column - Content (UNCHANGED) */}
        <div className="space-y-6">
          {/* --- CARD 1 --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The "Why" of Congruence</h2>
            <p className="text-lg leading-relaxed">
              Why do we prove triangles are congruent? The main reason is to find <strong>unknown measures</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              If we know two triangles are exact copies, we can use the parts we *do* know from one triangle to find the missing parts of the other.
            </p>
          </div>

          {/* --- CARD 2 (CPCTC) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Most Important Acronym: CPCTC</h3>
            <p className="text-lg leading-relaxed font-semibold">
              <strong>C</strong>orresponding
              <strong>P</strong>arts of
              <strong>C</strong>ongruent
              <strong>T</strong>riangles are
              <strong>C</strong>ongruent.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                <strong>In simple terms:</strong> Once you prove two triangles are congruent (using SSS, SAS, ASA, etc.), you can claim that *all* their other matching parts are *also* congruent.
              </p>
            </div>
          </div>

            {/* --- CARD 3 (Steps) --- */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">How to Find a Missing Angle</h3>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">Step 1:</span>
                <span><strong>Prove Congruence.</strong> Look at the given information. Do you have enough to prove congruence by ASA?</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">Step 2:</span>
                <span><strong>Use CPCTC.</strong> Identify the *corresponding* angle in the other triangle. Its measure will be the same!</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
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
      slideId="asa-application" // Updated ID
      slideTitle="Applying the ASA Criterion" // Updated Title
      moduleId="congruence"
      submoduleId="asa-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}