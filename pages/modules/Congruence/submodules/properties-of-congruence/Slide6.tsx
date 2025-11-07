import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

/* ------------------------------ FIGURES ------------------------------ */

// Grid helper
const Grid: React.FC<{ w: number; h: number; step?: number; color: string; opacity?: number }> = ({
  w,
  h,
  step = 28,
  color,
  opacity = 0.3,
}) => {
  const lines: JSX.Element[] = [];
  for (let x = step; x < w; x += step) {
    lines.push(<line key={`v-${x}`} x1={x} y1={0} x2={x} y2={h} stroke={color} opacity={opacity} strokeWidth="1" />);
  }
  for (let y = step; y < h; y += step) {
    lines.push(<line key={`h-${y}`} x1={0} y1={y} x2={w} y2={h} stroke={color} opacity={opacity} strokeWidth="1" />);
  }
  return <g>{lines}</g>;
};

// Example diagram (AC ≅ AB shown on a grid; conclusion uses symmetry)
const ExampleSegmentFigure: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const w = 420;
  const h = 240;
  const axis = isDarkMode ? '#475569' : '#CBD5E1';
  const stroke = isDarkMode ? '#E2E8F0' : '#334155';
  const seg = isDarkMode ? '#60A5FA' : '#2563EB';
  const dot = isDarkMode ? '#F8FAFC' : '#0F172A';

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="rounded-lg">
      <Grid w={w} h={h} color={axis} />
      {/* L-shape vertical spine */}
      <line x1={120} y1={40} x2={120} y2={200} stroke={stroke} strokeWidth={3} />
      {/* horizontal segments at three levels */}
      <line x1={120} y1={200} x2={260} y2={200} stroke={seg} strokeWidth={5} />
      <line x1={120} y1={120} x2={340} y2={120} stroke={seg} strokeWidth={5} />
      <line x1={120} y1={40} x2={380} y2={40} stroke={seg} strokeWidth={5} />
      {/* Points and labels (bold) */}
      {[
        { x: 120, y: 200, t: 'A' },
        { x: 260, y: 200, t: 'B' },
        { x: 120, y: 120, t: 'C' },
        { x: 340, y: 120, t: 'E' },
        { x: 120, y: 40, t: 'F' },
        { x: 380, y: 40, t: 'G' },
        { x: 200, y: 120, t: 'D' },
      ].map(p => (
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r={4.2} fill={dot} stroke={stroke} strokeWidth={2} />
          <text x={p.x - 12} y={p.y + 5} fontSize="14" fill={stroke} fontWeight="bold">
            {p.t}
          </text>
        </g>
      ))}
    </svg>
  );
};

// Number line with points R and M (reflexive: RM ≅ RM)
const NumberLineFigure: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const w = 420;
  const h = 120;
  const axis = isDarkMode ? '#94A3B8' : '#64748B';
  const tick = isDarkMode ? '#E2E8F0' : '#334155';
  const blue = isDarkMode ? '#60A5FA' : '#2563EB';
  const red = isDarkMode ? '#FCA5A5' : '#EF4444';

  // scale
  const left = 30;
  const right = w - 30;
  const y = 70;
  const step = (right - left) / 10;

  const xFor = (val: number) => left + (val + 5) * step; // map [-5..5] -> [left..right]

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <line x1={left} y1={y} x2={right} y2={y} stroke={axis} strokeWidth={2} />
      {Array.from({ length: 11 }).map((_, i) => {
        const xv = left + i * step;
        return (
          <g key={i}>
            <line x1={xv} y1={y - 8} x2={xv} y2={y + 8} stroke={tick} />
            <text x={xv} y={y + 22} fontSize="12" fill={tick} textAnchor="middle">
              {i - 5}
            </text>
          </g>
        );
      })}
      {/* R at -4, M at -2 */}
      <circle cx={xFor(-4)} cy={y} r={5} fill={blue} />
      <text x={xFor(-4) - 12} y={y - 12} fontSize="14" fontWeight="bold" fill={tick}>
        R
      </text>
      <circle cx={xFor(-2)} cy={y} r={5} fill={red} />
      <text x={xFor(-2) - 12} y={y - 12} fontSize="14" fontWeight="bold" fill={tick}>
        M
      </text>
    </svg>
  );
};

// Grid L-layout for symmetry (Since CD ≅ EF, conclude EF ≅ CD)
const GridSymmetryFigure: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const w = 420;
  const h = 240;
  const axis = isDarkMode ? '#475569' : '#CBD5E1';
  const stroke = isDarkMode ? '#E2E8F0' : '#334155';
  const seg = isDarkMode ? '#60A5FA' : '#2563EB';

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <Grid w={w} h={h} color={axis} />
      {/* L spine */}
      <line x1={120} y1={40} x2={120} y2={200} stroke={stroke} strokeWidth={3} />
      {/* bottom horizontal */}
      <line x1={120} y1={200} x2={300} y2={200} stroke={seg} strokeWidth={5} />
      {/* middle short horizontal */}
      <line x1={120} y1={120} x2={220} y2={120} stroke={seg} strokeWidth={5} />
      {/* top tiny verticals like screenshot */}
      <line x1={300} y1={200} x2={300} y2={200} stroke={seg} strokeWidth={5} />
      {/* labels */}
      {[
        { x: 120, y: 200, t: 'A' },
        { x: 300, y: 200, t: 'B' },
        { x: 120, y: 160, t: 'C' },
        { x: 220, y: 120, t: 'E' },
        { x: 120, y: 80, t: 'D' },
        { x: 120, y: 40, t: 'H' },
        { x: 300, y: 80, t: 'F' },
      ].map(p => (
        <g key={p.t}>
          <text x={p.x - 12} y={p.y + 4} fontSize="14" fontWeight="bold" fill={stroke}>
            {p.t}
          </text>
        </g>
      ))}
      {/* explicit segments for CD and EF (colored) */}
      <line x1={120} y1={160} x2={120} y2={120} stroke={seg} strokeWidth={5} />
      <line x1={220} y1={120} x2={300} y2={120} stroke={seg} strokeWidth={5} />
    </svg>
  );
};

// Triangle + length equivalences for transitive
const TriangleTransitiveFigure: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const w = 420;
  const h = 240;
  const stroke = isDarkMode ? '#E2E8F0' : '#334155';
  const seg = isDarkMode ? '#60A5FA' : '#2563EB';
  const mark = isDarkMode ? '#F59E0B' : '#D97706';

  const A = { x: 100, y: 190 };
  const B = { x: 200, y: 190 };
  const C = { x: 160, y: 80 };
  const D = { x: 320, y: 80 };

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {/* triangle ABC */}
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
      />
      {/* congruence tick marks */}
      <line x1={(A.x + B.x) / 2 - 12} y1={A.y - 4} x2={(A.x + B.x) / 2 + 12} y2={A.y - 4} stroke={mark} strokeWidth={3} />
      <line x1={(A.x + C.x) / 2 - 8} y1={(A.y + C.y) / 2} x2={(A.x + C.x) / 2 + 8} y2={(A.y + C.y) / 2} stroke={mark} strokeWidth={3} />
      <line x1={(B.x + C.x) / 2 - 8} y1={(B.y + C.y) / 2} x2={(B.x + C.x) / 2 + 8} y2={(B.y + C.y) / 2} stroke={mark} strokeWidth={3} />

      {/* lone segment CD at top (equal to BC) */}
      <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} stroke={seg} strokeWidth={5} />
      <text x={D.x - 40} y={D.y - 8} fontSize="12" fill={stroke}>
        3 cm
      </text>

      {/* labels */}
      {[
        { ...A, t: 'A' },
        { ...B, t: 'B' },
        { ...C, t: 'C' },
        { ...D, t: 'D' },
      ].map(p => (
        <text key={p.t} x={p.x - 14} y={p.y + 16} fontSize="14" fontWeight="bold" fill={stroke}>
          {p.t}
        </text>
      ))}
    </svg>
  );
};

/* ------------------------------ SLIDE ------------------------------ */

interface QuizQuestion {
  id: string;
  question: string;
  figure: React.ReactNode;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function PropertiesSlide6() {
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
      id: 'properties-segment-congruence-app-quiz',
      conceptId: 'properties-segment-congruence-application',
      conceptName: 'Segment Congruence Application',
      type: 'judging',
      description: 'Testing application of equivalence properties for segments',
    },
  ];

  const questions: QuizQuestion[] = [
    {
      id: 'seg-q4-reflexive',
      question: 'Consider the true statement: RM ≅ RM. This is true by which property of congruence?',
      figure: <NumberLineFigure />,
      options: ['Reflexive Property of Congruence', 'Symmetric Property of Congruence', 'Transitive Property of Congruence'],
      correctAnswer: 'Reflexive Property of Congruence',
      explanation:
        'Reflexive says any segment is congruent to itself. So RM ≅ RM is always true.',
    },
    {
      id: 'seg-q5-symmetric',
     question: 'If CD ≅ EF, then EF ≅ CD. Which property allows us to reverse the congruence?',
      figure: <GridSymmetryFigure />,
      options: ['Reflexive Property of Congruence', 'Symmetric Property of Congruence', 'Transitive Property of Congruence'],
      correctAnswer: 'Symmetric Property of Congruence',
      explanation:
        'Symmetric lets you switch the order in a congruence statement: if first ≅ second, then second ≅ first.',
    },
    {
      id: 'seg-q6-transitive',
      question: 'If AB ≅ BC and BC ≅ CD, then AB ≅ CD. Which property is used?',
      figure: <TriangleTransitiveFigure />,
      options: ['Reflexive Property of Congruence', 'Symmetric Property of Congruence', 'Transitive Property of Congruence'],
      correctAnswer: 'Transitive Property of Congruence',
      explanation:
        'Transitive passes congruence along a chain: if AB ≅ BC and BC ≅ CD, then AB ≅ CD.',
    },
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response,
    }));
  };

  const handleQuizAnswer = (answerText: string) => {
    if (showFeedback || isQuizComplete) return;

    setSelectedAnswer(answerText);
    setShowFeedback(true);

    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);

    handleInteractionComplete({
      interactionId: `properties-segment-app-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'properties-segment-congruence-application',
      conceptName: 'Segment Congruence Application',
      conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
      question: {
        type: 'mcq',
        question: current.question,
        options: current.options,
      },
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

  const cardTextColor = isDarkMode ? 'text-slate-300' : 'text-slate-700';

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">
        {/* Left: Example + Explanation */}
        <div className="space-y-6">
          {/* Example card */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Segment Congruence</h2>
            <ExampleSegmentFigure />
           <p className={`mt-4 ${cardTextColor} text-lg leading-relaxed`}>
  Here, segment <span className="font-mono">AB</span> is equal to segment <span className="font-mono">AC</span>.
  So, we are allowed to write it the other way too:
  <span className="font-mono"> AC ≅ AB</span>.
  This happens because of the <strong>Symmetric Property</strong>,
  which says we can switch the order in a congruence statement.
</p>

          </div>

          {/* Properties explanation (like screenshot) */}
         <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
  <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
    Explanation: Properties of Congruence (Simple)
  </h3>

  <div className="space-y-5 text-lg leading-relaxed">

    {/* Reflexive */}
    <div>
      <strong className="text-blue-500">1. Reflexive Property</strong>
      <p className={`${cardTextColor} mt-1`}>
        Any segment is always congruent to itself.
      </p>
      <p className="font-mono mt-1">RM ≅ RM</p>
    </div>

    {/* Symmetric */}
    <div>
      <strong className="text-blue-500">2. Symmetric Property</strong>
      <p className={`${cardTextColor} mt-1`}>
        If one segment is congruent to another, we can switch the order.
      </p>
      <p className="font-mono mt-1">If AB ≅ AC, then AC ≅ AB</p>
    </div>

    {/* Transitive */}
    <div>
      <strong className="text-blue-500">3. Transitive Property</strong>
      <p className={`${cardTextColor} mt-1`}>
        If two segments are congruent to the same segment, then they are congruent to each other.
      </p>
      <p className="font-mono mt-1">If AB ≅ BC and BC ≅ CD, then AB ≅ CD</p>
    </div>

  </div>

  {/* Example Conclusion Box */}
  <div className="mt-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
    <p className="text-lg leading-relaxed">
      For example, if <span className="font-mono">AB ≅ AC</span>, then we can also say
      <span className="font-mono"> AC ≅ AB</span>.  
      This is using the <strong>Symmetric Property</strong>.
    </p>
  </div>
</div>
        </div>

        {/* Right: Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Identify the Property</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            {/* Progress bar */}
            <div className="flex space-x-2 mb-6">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded ${
                    idx === currentQuestionIndex
                      ? 'bg-blue-500'
                      : questionsAnswered[idx]
                      ? 'bg-blue-300 dark:bg-blue-800'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {/* Figure */}
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
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((opt, idx) => {
                    const disabled = showFeedback;
                    const selected = selectedAnswer === opt;
                    const correct = opt === questions[currentQuestionIndex].correctAnswer;
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-red-500 bg-red-100 dark:bg-red-800/40'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
                    } ${disabled ? 'cursor-default' : 'cursor-pointer'}`;

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleQuizAnswer(opt)}
                        disabled={disabled}
                        className={className}
                        whileHover={!disabled ? { scale: 1.02 } : {}}
                        whileTap={!disabled ? { scale: 0.98 } : {}}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mt-4 p-4 rounded-lg ${
                        selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700'
                          : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                      }`}
                    >
                      <div className="text-lg text-slate-600 dark:text-slate-300 mb-4">
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
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-3xl mb-4">✅</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "Perfect. Properties are locked in." : 'Nice work!'}
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
      slideId="properties-segment-applications"
      slideTitle="Segment Congruence: Examples and Practice"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}
