import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// === FIGURE FOR EXAMPLE (Rotation about A) ===
const FigureExample: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 280;
  const { isDarkMode } = useThemeContext();
  const stroke = isDarkMode ? '#E2E8F0' : '#4A5568';
  const grid = isDarkMode ? '#475569' : '#CBD5E1';
  const original = isDarkMode ? '#60A5FA' : '#2563EB';
  const image = isDarkMode ? '#4ADE80' : '#22C55E';
  const cx = svgWidth / 2, cy = svgHeight / 2, g = 20;

  const ABCD = `${cx},${cy} ${cx+4*g},${cy+1*g} ${cx+3*g},${cy+4*g} ${cx+1*g},${cy+3*g}`;
  const A_B_C_D_ = `${cx},${cy} ${cx-3*g},${cy+2*g} ${cx-4*g},${cy-1*g} ${cx-1*g},${cy-2*g}`;

  return (
    <div className="w-full flex justify-center items-center p-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg">
      <svg width={svgWidth} height={svgHeight}>
        <defs><pattern id="g1" width={g} height={g} patternUnits="userSpaceOnUse">
          <path d={`M ${g} 0 L 0 0 0 ${g}`} fill="none" stroke={grid} strokeWidth="0.5"/>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#g1)" />
        <line x1="0" y1={cy} x2={svgWidth} y2={cy} stroke={stroke} strokeWidth="2" />
        <line x1={cx} y1="0" x2={cx} y2={svgHeight} stroke={stroke} strokeWidth="2" />
        
        <polygon points={ABCD} fill={original} opacity="0.7" stroke={stroke} strokeWidth="1" />
        <polygon points={A_B_C_D_} fill={image} opacity="0.7" stroke={stroke} strokeWidth="1" />

        <text x={cx-8} y={cy+12} fill={stroke}>A</text>
        <text x={cx+4*g-8} y={cy+1*g+12} fill={stroke}>B</text>
        <text x={cx+3*g-8} y={cy+4*g+12} fill={stroke}>C</text>
        <text x={cx+1*g-8} y={cy+3*g+12} fill={stroke}>D</text>

        <text x={cx-12} y={cy+20} fill={stroke}>A′</text>
        <text x={cx-3*g-12} y={cy+2*g+12} fill={stroke}>B′</text>
        <text x={cx-4*g-12} y={cy-1*g+12} fill={stroke}>C′</text>
        <text x={cx-1*g-12} y={cy-2*g+12} fill={stroke}>D′</text>
      </svg>
    </div>
  );
};

// === FIGURE FOR QUESTION 7 ===
const FigureQ7: React.FC = () => {
  const svgWidth = 350, svgHeight = 260, g = 20;
  const { isDarkMode } = useThemeContext();
  const stroke = isDarkMode ? '#E2E8F0' : '#4A5568';
  const grid = isDarkMode ? '#475569' : '#CBD5E1';
  const col1 = isDarkMode ? '#60A5FA' : '#2563EB';
  const col2 = isDarkMode ? '#4ADE80' : '#22C55E';
  const cx = svgWidth/2, cy = svgHeight/2;

  const t1 = `${cx-2*g},${cy} ${cx},${cy-2*g} ${cx+2*g},${cy}`;
  const t2 = `${cx-2*g},${cy} ${cx},${cy+2*g} ${cx+2*g},${cy}`;

  return (
    <div className="p-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg flex justify-center">
      <svg width={svgWidth} height={svgHeight}>
        <defs><pattern id="q7" width={g} height={g} patternUnits="userSpaceOnUse">
          <path d={`M ${g} 0 L 0 0 0 ${g}`} fill="none" stroke={grid} strokeWidth="0.5"/>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#q7)" />
        <polygon points={t1} fill={col1} opacity="0.7" stroke={stroke}/>
        <polygon points={t2} fill={col2} opacity="0.7" stroke={stroke}/>
      </svg>
    </div>
  );
};

// === FIGURE FOR QUESTION 8 ===
const FigureQ8: React.FC = () => {
  const svgWidth = 350, svgHeight = 260, g = 20;
  const { isDarkMode } = useThemeContext();
  const stroke = isDarkMode ? '#E2E8F0' : '#4A5568';
  const grid = isDarkMode ? '#475569' : '#CBD5E1';
  const col = isDarkMode ? '#60A5FA' : '#2563EB';
  const cx = svgWidth/2, cy = svgHeight/2;

  const pent = `${cx},${cy} ${cx+3*g},${cy-1*g} ${cx+2*g},${cy-3*g} ${cx-g},${cy-3*g} ${cx-3*g},${cy-1*g}`;

  return (
    <div className="p-4 bg-slate-100 dark:bg-slate-700/60 rounded-lg flex justify-center">
      <svg width={svgWidth} height={svgHeight}>
        <defs><pattern id="q8" width={g} height={g} patternUnits="userSpaceOnUse">
          <path d={`M ${g} 0 L 0 0 0 ${g}`} fill="none" stroke={grid} strokeWidth="0.5"/>
        </pattern></defs>
        <rect width="100%" height="100%" fill="url(#q8)" />
        <polygon points={pent} fill={col} opacity="0.7" stroke={stroke}/>
      </svg>
    </div>
  );
};

// === MAIN SLIDE ===
export default function RigidMotionsSlide7() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [i, setI] = useState(0);
  const [sel, setSel] = useState('');
  const [show, setShow] = useState(false);
  const [done, setDone] = useState<boolean[]>([false, false]);
  const [score, setScore] = useState(0);
  const [finish, setFinish] = useState(false);

  const questions = [
    {
      id: "q7",
      figure: <FigureQ7 />,
      question: "Which statements are true under the transformation (x, y) → (x, -y)?\n\nI: BC = B′C′\nII: ∠C = ∠C′\nIII: ABC ≅ A′B′C′",
      options: ["I, II, and III","I and II only","I only","II only","II and III only"],
      correctAnswer: "I, II, and III",
      explanation: "Reflection preserves lengths and angles, so triangles are congruent."
    },
    {
      id: "q8",
      figure: <FigureQ8 />,
      question: "A polygon is rotated 45° CCW about point C. Which are true?\n\nI: BC > B′C′\nII: ∠B = ∠B′\nIII: ABCDE ≅ A′B′C′D′E′",
      options: ["I and III only","I and II only","I only","II and III only","III only"],
      correctAnswer: "II and III only",
      explanation: "Rotation is a rigid motion → lengths and angles preserved."
    }
  ];

  const answer = (opt: string) => {
    if (show) return;
    setSel(opt); setShow(true);
    if (opt === questions[i].correctAnswer) setScore(s=>s+1);
    setLocalInteractions(p=>({...p,[Date.now()]: {interactionId:questions[i].id,value:opt,isCorrect:opt===questions[i].correctAnswer,timestamp:Date.now()}}));
  };

  const next = () => {
    const arr=[...done]; arr[i]=true; setDone(arr);
    setShow(false); setSel('');
    if (i<questions.length-1) setI(i+1);
    else setFinish(true);
  };

  return (
    <SlideComponentWrapper
    slideId="rigid-motions-slide7"
    slideTitle="Identifying True Statements About Rigid Motions"
    moduleId="congruence"
    submoduleId="rigid-motions-and-congruence"
    interactions={localInteractions}
  >
   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

        {/* Left */}
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">Example: Rotation About A</h2>
            <p className="text-lg mb-4">When a quadrilateral is rotated about point A, the distances AB, AC, AD remain unchanged, and so do angle measures.</p>
            <FigureExample />
            <p className="text-lg mt-4 font-semibold text-center">Therefore: ABCD ≅ A′B′C′D′</p>
          </div>
        </div>

        {/* Right */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
            <span>Question {i+1} of {questions.length}</span>
          </div>

          {questions[i].figure}

          <p className="mt-4 whitespace-pre-line">{questions[i].question}</p>

          <div className="mt-4 space-y-3">
            {questions[i].options.map(opt => (
              <button key={opt} className={`w-full p-3 text-left border-2 rounded-lg ${ sel===opt ? (opt===questions[i].correctAnswer ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50") : "border-slate-300 dark:border-slate-600 hover:border-blue-400"}`} onClick={()=>answer(opt)} disabled={show}>
                {opt}
              </button>
            ))}
          </div>

          {show && (
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
              {questions[i].explanation}
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={next}>
                {i<questions.length-1 ? "Next" : "Finish"}
              </button>
            </div>
          )}
        </div>

      </div>
    </SlideComponentWrapper>
  );
}
