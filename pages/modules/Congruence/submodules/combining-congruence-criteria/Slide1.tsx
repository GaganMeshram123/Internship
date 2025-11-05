import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- FIGURE COMPONENTS FOR THE 5 CRITERIA ---

const SssFigure: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const T1 = { A: { x: 30, y: 120 }, B: { x: 130, y: 120 }, C: { x: 80, y: 30 } };
  const T2 = { K: { x: 180, y: 120 }, L: { x: 280, y: 30 }, M: { x: 330, y: 120 } };
  const hash = (p1: {x: number, y: number}, p2: {x: number, y: number}, num: number) => {
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2;
    const lines = [];
    for (let i = 0; i < num; i++) {
      const offset = (i - (num - 1) / 2) * 4;
      const x1 = midX + offset * Math.cos(angle) - 4 * Math.cos(angle + Math.PI / 2);
      const y1 = midY + offset * Math.sin(angle) - 4 * Math.sin(angle + Math.PI / 2);
      const x2 = midX + offset * Math.cos(angle) + 4 * Math.cos(angle + Math.PI / 2);
      const y2 = midY + offset * Math.sin(angle) + 4 * Math.sin(angle + Math.PI / 2);
      lines.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeColor} strokeWidth="1.5" />);
    }
    return <>{lines}</>;
  };
  return (
    <svg width="100%" height="130" viewBox="0 0 360 150">
      <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>A</text>
      <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>B</text>
      <text x={T1.C.x} y={T1.C.y - 5} fill={strokeColor} textAnchor="middle">C</text>
      {hash(T1.A, T1.C, 1)}
      {hash(T1.C, T1.B, 2)}
      {hash(T1.A, T1.B, 3)}
      <path d={`M ${T2.K.x} ${T2.K.y} L ${T2.L.x} ${T2.L.y} L ${T2.M.x} ${T2.M.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <text x={T2.K.x - 15} y={T2.K.y + 5} fill={strokeColor}>K</text>
      <text x={T2.L.x} y={T2.L.y - 5} fill={strokeColor} textAnchor="middle">L</text>
      <text x={T2.M.x + 5} y={T2.M.y + 5} fill={strokeColor}>M</text>
      {hash(T2.K, T2.L, 1)}
      {hash(T2.L, T2.M, 2)}
      {hash(T2.K, T2.M, 3)}
    </svg>
  );
};

const SasFigure: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const T1 = { A: { x: 30, y: 120 }, B: { x: 130, y: 120 }, C: { x: 80, y: 30 } };
  const T2 = { K: { x: 180, y: 120 }, L: { x: 280, y: 30 }, M: { x: 330, y: 120 } };
  const hash = (p1: {x: number, y: number}, p2: {x: number, y: number}, num: number) => {
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2;
    const lines = [];
    for (let i = 0; i < num; i++) {
      const offset = (i - (num - 1) / 2) * 4;
      const x1 = midX + offset * Math.cos(angle) - 4 * Math.cos(angle + Math.PI / 2);
      const y1 = midY + offset * Math.sin(angle) - 4 * Math.sin(angle + Math.PI / 2);
      const x2 = midX + offset * Math.cos(angle) + 4 * Math.cos(angle + Math.PI / 2);
      const y2 = midY + offset * Math.sin(angle) + 4 * Math.sin(angle + Math.PI / 2);
      lines.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeColor} strokeWidth="1.5" />);
    }
    return <>{lines}</>;
  };
  return (
    <svg width="100%" height="130" viewBox="0 0 360 150">
      <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>A</text>
      <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>B</text>
      <text x={T1.C.x} y={T1.C.y - 5} fill={strokeColor} textAnchor="middle">C</text>
      {hash(T1.A, T1.B, 1)}
      {hash(T1.C, T1.B, 2)}
      <path d={`M ${T1.B.x - 15} ${T1.B.y} A 15 15 0 0 0 ${T1.B.x - 13.6} ${T1.B.y - 6.5}`} stroke={angleGreen} fill="none" strokeWidth="2" />
      
      <path d={`M ${T2.K.x} ${T2.K.y} L ${T2.L.x} ${T2.L.y} L ${T2.M.x} ${T2.M.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <text x={T2.K.x - 15} y={T2.K.y + 5} fill={strokeColor}>K</text>
      <text x={T2.L.x} y={T2.L.y - 5} fill={strokeColor} textAnchor="middle">L</text>
      <text x={T2.M.x + 5} y={T2.M.y + 5} fill={strokeColor}>M</text>
      {hash(T2.K, T2.M, 1)}
      {hash(T2.L, T2.M, 2)}
      <path d={`M ${T2.M.x - 15} ${T2.M.y} A 15 15 0 0 0 ${T2.M.x - 13.6} ${T2.M.y - 6.5}`} stroke={angleGreen} fill="none" strokeWidth="2" />
    </svg>
  );
};

const AsaFigure: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const T1 = { A: { x: 30, y: 120 }, B: { x: 130, y: 120 }, C: { x: 80, y: 30 } };
  const T2 = { K: { x: 180, y: 120 }, L: { x: 280, y: 30 }, M: { x: 330, y: 120 } };
  const hash = (p1: {x: number, y: number}, p2: {x: number, y: number}, num: number) => {
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2;
    const lines = [];
    for (let i = 0; i < num; i++) {
      const offset = (i - (num - 1) / 2) * 4;
      const x1 = midX + offset * Math.cos(angle) - 4 * Math.cos(angle + Math.PI / 2);
      const y1 = midY + offset * Math.sin(angle) - 4 * Math.sin(angle + Math.PI / 2);
      const x2 = midX + offset * Math.cos(angle) + 4 * Math.cos(angle + Math.PI / 2);
      const y2 = midY + offset * Math.sin(angle) + 4 * Math.sin(angle + Math.PI / 2);
      lines.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeColor} strokeWidth="1.5" />);
    }
    return <>{lines}</>;
  };
  return (
    <svg width="100%" height="130" viewBox="0 0 360 150">
      <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>A</text>
      <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>B</text>
      <text x={T1.C.x} y={T1.C.y - 5} fill={strokeColor} textAnchor="middle">C</text>
      {hash(T1.A, T1.B, 1)}
      <path d={`M ${T1.A.x + 15} ${T1.A.y} A 15 15 0 0 1 ${T1.A.x + 13.6} ${T1.A.y - 6.5}`} stroke={angleOrange} fill="none" strokeWidth="2" />
      <path d={`M ${T1.B.x - 15} ${T1.B.y} A 15 15 0 0 0 ${T1.B.x - 13.6} ${T1.B.y - 6.5}`} stroke={angleGreen} fill="none" strokeWidth="2" />
      
      <path d={`M ${T2.K.x} ${T2.K.y} L ${T2.L.x} ${T2.L.y} L ${T2.M.x} ${T2.M.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <text x={T2.K.x - 15} y={T2.K.y + 5} fill={strokeColor}>K</text>
      <text x={T2.L.x} y={T2.L.y - 5} fill={strokeColor} textAnchor="middle">L</text>
      <text x={T2.M.x + 5} y={T2.M.y + 5} fill={strokeColor}>M</text>
      {hash(T2.K, T2.M, 1)}
      <path d={`M ${T2.K.x + 15} ${T2.K.y} A 15 15 0 0 1 ${T2.K.x + 13.6} ${T2.K.y - 6.5}`} stroke={angleOrange} fill="none" strokeWidth="2" />
      <path d={`M ${T2.M.x - 15} ${T2.M.y} A 15 15 0 0 0 ${T2.M.x - 13.6} ${T2.M.y - 6.5}`} stroke={angleGreen} fill="none" strokeWidth="2" />
    </svg>
  );
};

const AasFigure: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleGreen = isDarkMode ? '#4ADE80' : '#22C55E';
  const angleOrange = isDarkMode ? '#F9B572' : '#F59E0B';
  const T1 = { A: { x: 30, y: 120 }, B: { x: 130, y: 120 }, C: { x: 80, y: 30 } };
  const T2 = { K: { x: 180, y: 120 }, L: { x: 280, y: 30 }, M: { x: 330, y: 120 } };
  const hash = (p1: {x: number, y: number}, p2: {x: number, y: number}, num: number) => {
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2;
    const lines = [];
    for (let i = 0; i < num; i++) {
      const offset = (i - (num - 1) / 2) * 4;
      const x1 = midX + offset * Math.cos(angle) - 4 * Math.cos(angle + Math.PI / 2);
      const y1 = midY + offset * Math.sin(angle) - 4 * Math.sin(angle + Math.PI / 2);
      const x2 = midX + offset * Math.cos(angle) + 4 * Math.cos(angle + Math.PI / 2);
      const y2 = midY + offset * Math.sin(angle) + 4 * Math.sin(angle + Math.PI / 2);
      lines.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeColor} strokeWidth="1.5" />);
    }
    return <>{lines}</>;
  };
  return (
    <svg width="100%" height="130" viewBox="0 0 360 150">
      <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>A</text>
      <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>B</text>
      <text x={T1.C.x} y={T1.C.y - 5} fill={strokeColor} textAnchor="middle">C</text>
      {hash(T1.C, T1.B, 2)}
      <path d={`M ${T1.A.x + 15} ${T1.A.y} A 15 15 0 0 1 ${T1.A.x + 13.6} ${T1.A.y - 6.5}`} stroke={angleOrange} fill="none" strokeWidth="2" />
      <path d={`M ${T1.B.x - 15} ${T1.B.y} A 15 15 0 0 0 ${T1.B.x - 13.6} ${T1.B.y - 6.5}`} stroke={angleGreen} fill="none" strokeWidth="2" />
      
      <path d={`M ${T2.K.x} ${T2.K.y} L ${T2.L.x} ${T2.L.y} L ${T2.M.x} ${T2.M.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <text x={T2.K.x - 15} y={T2.K.y + 5} fill={strokeColor}>K</text>
      <text x={T2.L.x} y={T2.L.y - 5} fill={strokeColor} textAnchor="middle">L</text>
      <text x={T2.M.x + 5} y={T2.M.y + 5} fill={strokeColor}>M</text>
      {hash(T2.L, T2.M, 2)}
      <path d={`M ${T2.K.x + 15} ${T2.K.y} A 15 15 0 0 1 ${T2.K.x + 13.6} ${T2.K.y - 6.5}`} stroke={angleOrange} fill="none" strokeWidth="2" />
      <path d={`M ${T2.M.x - 15} ${T2.M.y} A 15 15 0 0 0 ${T2.M.x - 13.6} ${T2.M.y - 6.5}`} stroke={angleGreen} fill="none" strokeWidth="2" />
    </svg>
  );
};

const HlFigure: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  const T1 = { A: { x: 30, y: 120 }, B: { x: 130, y: 120 }, C: { x: 130, y: 30 } };
  const T2 = { K: { x: 180, y: 120 }, L: { x: 280, y: 120 }, M: { x: 280, y: 30 } };
  const hash = (p1: {x: number, y: number}, p2: {x: number, y: number}, num: number) => {
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2;
    const lines = [];
    for (let i = 0; i < num; i++) {
      const offset = (i - (num - 1) / 2) * 4;
      const x1 = midX + offset * Math.cos(angle) - 4 * Math.cos(angle + Math.PI / 2);
      const y1 = midY + offset * Math.sin(angle) - 4 * Math.sin(angle + Math.PI / 2);
      const x2 = midX + offset * Math.cos(angle) + 4 * Math.cos(angle + Math.PI / 2);
      const y2 = midY + offset * Math.sin(angle) + 4 * Math.sin(angle + Math.PI / 2);
      lines.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeColor} strokeWidth="1.5" />);
    }
    return <>{lines}</>;
  };
  return (
    <svg width="100%" height="130" viewBox="0 0 310 150">
      <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <text x={T1.A.x - 15} y={T1.A.y + 5} fill={strokeColor}>A</text>
      <text x={T1.B.x + 5} y={T1.B.y + 5} fill={strokeColor}>B</text>
      <text x={T1.C.x + 5} y={T1.C.y} fill={strokeColor}>C</text>
      {hash(T1.A, T1.B, 1)}
      {hash(T1.A, T1.C, 2)}
      <path d={`M ${T1.B.x - 12} ${T1.B.y} L ${T1.B.x - 12} ${T1.B.y - 12} L ${T1.B.x} ${T1.B.y - 12}`} fill="none" stroke={angleBlue} strokeWidth="2" />
      
      <path d={`M ${T2.K.x} ${T2.K.y} L ${T2.L.x} ${T2.L.y} L ${T2.M.x} ${T2.M.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
      <text x={T2.K.x - 15} y={T2.K.y + 5} fill={strokeColor}>K</text>
      <text x={T2.L.x + 5} y={T2.L.y + 5} fill={strokeColor}>L</text>
      <text x={T2.M.x + 5} y={T2.M.y} fill={strokeColor}>M</text>
      {hash(T2.K, T2.L, 1)}
      {hash(T2.K, T2.M, 2)}
      <path d={`M ${T2.L.x - 12} ${T2.L.y} L ${T2.L.x - 12} ${T2.L.y - 12} L ${T2.L.x} ${T2.L.y - 12}`} fill="none" stroke={angleBlue} strokeWidth="2" />
    </svg>
  );
};

// --- Main component to hold all figures ---
const AllCriteriaFigures: React.FC = () => (
  <div className="space-y-4">
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-center text-blue-600 dark:text-blue-400 mb-2">SSS</h3>
      <SssFigure />
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-center text-blue-600 dark:text-blue-400 mb-2">SAS</h3>
      <SasFigure />
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-center text-blue-600 dark:text-blue-400 mb-2">ASA</h3>
      <AsaFigure />
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-center text-blue-600 dark:text-blue-400 mb-2">AAS</h3>
      <AasFigure />
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-center text-blue-600 dark:text-blue-400 mb-2">HL</h3>
      <HlFigure />
    </div>
  </div>
);
// --- END OF FIGURE COMPONENTS ---


export default function CombiningSlide1() {
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
      id: 'combining-intro-quiz',
      conceptId: 'combining-criteria-intro',
      conceptName: 'Combining Criteria Intro',
      type: 'judging',
      description: 'Testing recall of valid vs. invalid criteria'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  const questions: QuizQuestion[] = [
    {
      id: 'combining-intro-q1',
      question: 'Which of the following is NOT a valid criterion for proving triangles congruent?',
      options: [
        "SSS",
        "ASA",
        "SSA",
        "HL"
      ],
      correctAnswer: "SSA",
      explanation: "Correct! SSA (Side-Side-Angle) is not a valid way to prove triangles are congruent because the angle is not included (unless it's the HL special case)."
    },
    {
      id: 'combining-intro-q2',
      question: 'Why does AAA (Angle-Angle-Angle) not work for proving congruence?',
      options: [
        "It's too hard to measure all three angles.",
        "It proves the triangles are *similar*, but not necessarily the same *size*.",
        "It's the same as the AAS criterion.",
        "It only works for right triangles."
      ],
      correctAnswer: "It proves the triangles are *similar*, but not necessarily the same *size*.",
      explanation: "Exactly! Two triangles can have the same three angles but be different sizes (one is an enlargement of the other). This proves similarity, not congruence."
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
      interactionId: `combining-intro-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'combining-criteria-intro',
      conceptName: 'Combining Criteria Intro',
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
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Introduction</h2>
            <p className="text-lg leading-relaxed mb-4">
              The five congruence criteria for triangles are often needed when proving geometric results. Therefore, it's essential to identify which congruence criterion is being applied in a particular situation.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Let's start by briefly reviewing the five criteria that we have learned.
            </p>

            {/* Definitions */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">The Side-Side-Side (SSS) criterion:</h3>
                <blockquote className="mt-2 p-3 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
                  Two triangles are congruent if and only if three sides of one triangle are congruent to three sides of the other triangle.
                </blockquote>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">The Side-Angle-Side (SAS) criterion:</h3>
                <blockquote className="mt-2 p-3 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
                  Two triangles are congruent if and only if two sides and the <strong>included angle</strong> of one triangle are congruent to two sides and the included angle of the other triangle.
                </blockquote>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">The Angle-Side-Angle (ASA) criterion:</h3>
                <blockquote className="mt-2 p-3 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
                  Two triangles are congruent if and only if two angles and the <strong>included side</strong> of one triangle are congruent to two angles and the included side of the other triangle.
                </blockquote>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">The Angle-Angle-Side (AAS) criterion:</h3>
                <blockquote className="mt-2 p-3 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
                  Two triangles are congruent if and only if two angles and the <strong>non-included side</strong> of one triangle are congruent to two angles and the corresponding non-included side of the other triangle.
                </blockquote>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">The Hypotenuse-Leg (HL) criterion:</h3>
                <blockquote className="mt-2 p-3 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
                  Two <strong>right triangles</strong> are congruent if and only if they have congruent hypotenuses and a pair of congruent legs.
                </blockquote>
              </div>
            </div>
            
            <p className="text-lg leading-relaxed mt-6">
              Let's now get some practice at correctly identifying these criteria.
            </p>
          </div>
        </div>

        {/* Right Column - Figures and Quiz */}
        <div className="space-y-6">
          
          {/* --- FIGURES CARD --- */}
          <AllCriteriaFigures />

          {/* --- KNOWLEDGE CHECK CARD (Unchanged) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
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
            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
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
                <div className="text-3xl mb-4">🧠</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You know your tools!" : 'Great review!'}
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
      slideId="combining-introduction"
      slideTitle="Introduction to Combining Criteria"
      moduleId="congruence"
      submoduleId="combining-congruence-criteria"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}