import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

/* =========================
   ANGLE GRID DIAGRAM (350x250)
   ========================= */
type FigureKind = 'reflexive' | 'symmetric' | 'transitive';

const AngleGridDiagram: React.FC<{ kind: FigureKind }> = ({ kind }) => {
  const { isDarkMode } = useThemeContext();
  const W = 350;
  const H = 250;
  const gridColor = isDarkMode ? '#334155' : '#E2E8F0';
  const strokeColor = isDarkMode ? '#E2E8F0' : '#334155';
  const angleFill = isDarkMode ? '#60A5FA' : '#93C5FD';
  const labelColor = strokeColor;

  const grid = [];
  for (let x = 25; x <= W - 25; x += 25) {
    grid.push(<line key={`vx-${x}`} x1={x} y1={15} x2={x} y2={H - 15} stroke={gridColor} strokeWidth="1" />);
  }
  for (let y = 15; y <= H - 15; y += 25) {
    grid.push(<line key={`hz-${y}`} x1={15} y1={y} x2={W - 15} y2={y} stroke={gridColor} strokeWidth="1" />);
  }

  // Helpers
  const text = (x: number, y: number, s: string, fz = 12) => (
    <text x={x} y={y} fill={labelColor} fontSize={fz} textAnchor="middle" fontFamily="Inter, system-ui, Arial">
      {s}
    </text>
  );
  const dot = (cx: number, cy: number) => <circle cx={cx} cy={cy} r="3" fill={labelColor} />;

  // Scenes
  let scene: React.ReactNode = null;

  if (kind === 'reflexive') {
    // Triangle ABC with highlighted angle A, and statement ∠A ≅ ∠A
    const A = { x: 60, y: 200 };
    const B = { x: 290, y: 200 };
    const C = { x: 200, y: 80 };

    // angle wedge at A
    const wedge = (
      <path
        d={`M ${A.x} ${A.y} L ${A.x + 25} ${A.y - 10} A 25 25 0 0 1 ${A.x + 35} ${A.y} Z`}
        fill={angleFill}
        opacity="0.9"
      />
    );

    scene = (
      <>
        {/* triangle */}
        <polyline points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${A.x},${A.y}`} fill="none" stroke={strokeColor} strokeWidth="2" />
        {wedge}
        {dot(A.x, A.y)}{dot(B.x, B.y)}{dot(C.x, C.y)}
        {text(A.x - 10, A.y + 18, 'A')}
        {text(B.x + 10, B.y + 18, 'B')}
        {text(C.x, C.y - 10, 'C')}
        {text(W / 2, 28, 'Example: Reflexive', 14)}
        {text(W / 2, H - 20, 'Statement: ∠A ≅ ∠A', 14)}
      </>
    );
  }

  if (kind === 'symmetric') {
    // Two intersecting lines at A with blue region for ∠BAC, and text “Since ∠DAE ≅ ∠BAC ⇒ ∠BAC ≅ ∠DAE”
    const A = { x: 170, y: 130 };
    const line1 = { p1: { x: 40, y: 160 }, p2: { x: 320, y: 110 } };
    const line2 = { p1: { x: 210, y: 20 }, p2: { x: 140, y: 240 } };

    const wedge = (
      <path
        d={`M ${A.x} ${A.y} L ${A.x + 45} ${A.y - 9} A 45 45 0 0 1 ${A.x - 12} ${A.y + 40} Z`}
        fill={angleFill}
        opacity="0.9"
      />
    );

    scene = (
      <>
        <line {...{ x1: line1.p1.x, y1: line1.p1.y, x2: line1.p2.x, y2: line1.p2.y }} stroke={strokeColor} strokeWidth="2" />
        <line {...{ x1: line2.p1.x, y1: line2.p1.y, x2: line2.p2.x, y2: line2.p2.y }} stroke={strokeColor} strokeWidth="2" />
        {wedge}
        {dot(A.x, A.y)}
        {text(A.x + 10, A.y - 8, 'A')}
        {text(330, 30, 'C')}
        {text(330, 122, 'B')}
        {text(35, 170, 'D')}
        {text(135, 250, 'E')}
        {text(W / 2, 28, 'Example: Symmetric', 14)}
        {text(W / 2, H - 34, 'Given: ∠DAE ≅ ∠BAC', 13)}
        {text(W / 2, H - 16, 'Conclude: ∠BAC ≅ ∠DAE', 13)}
      </>
    );
  }

  if (kind === 'transitive') {
    // Rays around O with three adjacent equal angles: AOB, BOC, EOF
    const O = { x: 175, y: 130 };
    const rays = [
      { x: 320, y: 130, label: 'A' }, // horizontal right
      { x: 245, y: 65, label: 'B' },  // slanted up-right
      { x: 175, y: 15, label: 'C' },  // vertical up
      { x: 105, y: 195, label: 'E' }, // slanted down-left
      { x: 175, y: 245, label: 'F' }, // vertical down
    ];
    const seg = (end: { x: number; y: number }) => (
      <line x1={O.x} y1={O.y} x2={end.x} y2={end.y} stroke={strokeColor} strokeWidth="2" />
    );

    // wedge for ∠AOB, ∠BOC, ∠EOF
    const wedges = (
      <>
        {/* ∠AOB */}
        <path d={`M ${O.x} ${O.y} L ${O.x + 48} ${O.y} A 48 48 0 0 1 ${O.x + 34} ${O.y - 34} Z`} fill={angleFill} opacity="0.9" />
        {/* ∠BOC */}
        <path d={`M ${O.x} ${O.y} L ${O.x + 34} ${O.y - 34} A 48 48 0 0 1 ${O.x} ${O.y - 48} Z`} fill={angleFill} opacity="0.9" />
        {/* ∠EOF */}
        <path d={`M ${O.x} ${O.y} L ${O.x - 34} ${O.y + 34} A 48 48 0 0 1 ${O.x} ${O.y + 48} Z`} fill={angleFill} opacity="0.9" />
      </>
    );

    scene = (
      <>
        {rays.map((r, i) => <React.Fragment key={i}>{seg(r)}</React.Fragment>)}
        {wedges}
        {dot(O.x, O.y)}
        {text(O.x + 10, O.y - 8, 'O')}
        {text(325, 135, 'A')}
        {text(250, 60, 'B')}
        {text(175, 10, 'C')}
        {text(100, 200, 'E')}
        {text(175, 245, 'F')}
        {text(W / 2, 28, 'Example: Transitive', 14)}
        {text(W / 2, H - 34, 'Given: ∠AOB ≅ ∠BOC and ∠BOC ≅ ∠EOF', 12)}
        {text(W / 2, H - 16, 'Conclude: ∠AOB ≅ ∠EOF', 13)}
      </>
    );
  }

  return (
    <div className="w-full flex justify-center items-center p-3 rounded-lg bg-slate-100 dark:bg-slate-700/60">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {/* Grid */}
        {grid}
        {/* Frame */}
        <rect x="12" y="12" width={W - 24} height={H - 24} fill="none" stroke={gridColor} />
        {/* Scene */}
        {scene}
      </svg>
    </div>
  );
};

/* =========================
   SLIDE 8: ANGLE CONGRUENCE (APPLICATIONS)
   ========================= */
export default function PropertiesSlide8() {
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
      id: 'properties-angle-congruence-app-quiz',
      conceptId: 'properties-angle-congruence-application',
      conceptName: 'Angle Congruence Application',
      type: 'judging',
      description: 'Testing application of equivalence properties for angles'
    }
  ];

  interface QuizQuestion {
    id: string;
    figure: FigureKind;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  const questions: QuizQuestion[] = [
    {
      id: 'angle-q7',
      figure: 'reflexive',
      question: 'Which property of congruence justifies the statement “∠A ≅ ∠A”?',
      options: ['Reflexive Property of Congruence', 'Symmetric Property of Congruence', 'Transitive Property of Congruence'],
      correctAnswer: 'Reflexive Property of Congruence',
      explanation: 'Any figure is congruent to itself. That is exactly the reflexive property.'
    },
    {
      id: 'angle-q8',
      figure: 'symmetric',
      question: 'Since ∠DAE ≅ ∠BAC, which property lets us conclude ∠BAC ≅ ∠DAE?',
      options: ['Reflexive Property of Congruence', 'Symmetric Property of Congruence', 'Transitive Property of Congruence'],
      correctAnswer: 'Symmetric Property of Congruence',
      explanation: 'Symmetric lets you flip a congruence: if X ≅ Y then Y ≅ X.'
    },
    {
      id: 'angle-q9',
      figure: 'transitive',
      question: 'Since ∠AOB ≅ ∠BOC and ∠BOC ≅ ∠EOF, which property gives ∠AOB ≅ ∠EOF?',
      options: ['Reflexive Property of Congruence', 'Symmetric Property of Congruence', 'Transitive Property of Congruence'],
      correctAnswer: 'Transitive Property of Congruence',
      explanation: 'Transitive passes congruence along a chain: if X ≅ Y and Y ≅ Z, then X ≅ Z.'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };

  const handleQuizAnswer = (answerText: string) => {
    if (showFeedback || isQuizComplete) return;
    setSelectedAnswer(answerText);
    setShowFeedback(true);

    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);

    handleInteractionComplete({
      interactionId: `properties-angle-app-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'properties-angle-congruence-application',
      conceptName: 'Angle Congruence Application',
      conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
      question: { type: 'mcq', question: current.question, options: current.options }
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
        {/* Left column: Explanation */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Angle Congruence in Proofs</h2>
            <p className="text-lg leading-relaxed">
              Congruent angles follow the same three equivalence properties as equality: <b>reflexive</b>, <b>symmetric</b>, and <b>transitive</b>.
              These are the formal “reasons” you cite in two-column proofs.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The three properties (for angles)</h3>
            <ul className="list-disc list-inside mt-2 text-lg space-y-3">
              <li>
                <b>Reflexive:</b> every angle is congruent to itself. <code>∠a ≅ ∠a</code>
              </li>
              <li>
                <b>Symmetric:</b> if one angle is congruent to another, you may flip it. <code>If ∠a ≅ ∠b, then ∠b ≅ ∠a</code>
              </li>
              <li>
                <b>Transitive:</b> pass congruence along a chain. <code>If ∠a ≅ ∠b and ∠b ≅ ∠c, then ∠a ≅ ∠c</code>
              </li>
            </ul>
          </div>
        </div>

        {/* Right column: Figures + MCQ */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Grid Figure</h3>
            <AngleGridDiagram kind={questions[currentQuestionIndex].figure} />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Identify the Property</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            {/* Progress */}
            <div className="flex space-x-2 mb-6">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded ${
                    i === currentQuestionIndex
                      ? 'bg-blue-500'
                      : questionsAnswered[i]
                      ? 'bg-blue-300 dark:bg-blue-800'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((opt, idx) => {
                    const disabled = showFeedback;
                    const selected = selectedAnswer === opt;
                    const correct = opt === questions[currentQuestionIndex].correctAnswer;
                    const cls = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-red-500 bg-red-100 dark:bg-red-800 opacity-70'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
                    } ${disabled ? 'cursor-default' : 'cursor-pointer'}`;

                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleQuizAnswer(opt)}
                        disabled={disabled}
                        className={cls}
                        whileHover={!disabled ? { scale: 1.02 } : {}}
                        whileTap={!disabled ? { scale: 0.98 } : {}}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

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
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-3xl mb-4">✅</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
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
      slideId="properties-angle-applications"
      slideTitle="Angle Congruence"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}
