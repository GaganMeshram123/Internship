import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Interaction, InteractionResponse } from "../../../common-components/concept";
import SlideComponentWrapper from "../../../common-components/SlideComponentWrapper";
import { useThemeContext } from "@/lib/ThemeContext";

/* ---------- ANGLE COLLECTION FIGURE (top illustration) ---------- */
const AngleCollectionFigure: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const stroke = isDarkMode ? "#E2E8F0" : "#475569";
  const blue = isDarkMode ? "#60A5FA" : "#2563EB";

  const angles = [
    { x: 160, y: 60, r1: 40, r2: 25 },
    { x: 110, y: 55, r1: 60, r2: 40 },
    { x: 75,  y: 110, r1: 70, r2: 45 },
    { x: 160, y: 140, r1: 35, r2: 25 },
    { x: 120, y: 150, r1: 45, r2: 30 }
  ];

  return (
    <div className="flex justify-center">
      <svg width="260" height="200" viewBox="0 0 260 200">
        <circle cx="130" cy="100" r="80" stroke={stroke} strokeWidth="2" fill="none" />
        {angles.map((a, i) => (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={a.x + a.r1} y2={a.y + a.r2} stroke={blue} strokeWidth="4" />
            <line x1={a.x} y1={a.y} x2={a.x - a.r2} y2={a.y + a.r1} stroke={blue} strokeWidth="4" />
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ---------- MINI EXPLAINER ANIMATION (right column) ---------- */
const CongruenceVsEqualityAnimation: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? "#E2E8F0" : "#4A5568";
  const color1 = isDarkMode ? "#60A5FA" : "#2563EB";

  const item = (d: number) => ({
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { delay: d } }
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60">
      <svg width={400} height={220} viewBox="0 0 400 220">
        <motion.text
          x={200}
          y={28}
          fill={strokeColor}
          fontSize="18"
          textAnchor="middle"
          initial="hidden"
          animate="visible"
          variants={item(0.2)}
        >
          Congruence vs. Equality (Angles)
        </motion.text>

        {/* Equality side */}
        <motion.text x={100} y={70} fill={color1} fontSize="18" textAnchor="middle" variants={item(0.4)} initial="hidden" animate="visible">
          Equality (=)
        </motion.text>
        <motion.text x={100} y={98} fill={strokeColor} fontSize="14" textAnchor="middle" variants={item(0.5)} initial="hidden" animate="visible">
          For measures (numbers)
        </motion.text>
        <motion.text x={100} y={132} fill={color1} fontSize="16" textAnchor="middle" variants={item(0.6)} initial="hidden" animate="visible">
          {`m∠A = 45°`}
        </motion.text>
        <motion.text x={100} y={156} fill={color1} fontSize="16" textAnchor="middle" variants={item(0.7)} initial="hidden" animate="visible">
          {`m∠B = 45°`}
        </motion.text>
        <motion.text x={100} y={182} fill={color1} fontSize="16" textAnchor="middle" variants={item(0.8)} initial="hidden" animate="visible">
          {`m∠A = m∠B`}
        </motion.text>

        {/* Divider */}
        <motion.line x1={200} y1={55} x2={200} y2={190} stroke={strokeColor} strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} />

        {/* Congruence side */}
        <motion.text x={300} y={70} fill={color1} fontSize="18" textAnchor="middle" variants={item(1.0)} initial="hidden" animate="visible">
          {`Congruence (≅)`}
        </motion.text>
        <motion.text x={300} y={98} fill={strokeColor} fontSize="14" textAnchor="middle" variants={item(1.1)} initial="hidden" animate="visible">
          For figures (angles)
        </motion.text>
        <motion.text x={300} y={140} fill={color1} fontSize="16" textAnchor="middle" variants={item(1.2)} initial="hidden" animate="visible">
          {`∠A ≅ ∠B`}
        </motion.text>
        <motion.text x={300} y={166} fill={strokeColor} fontSize="14" textAnchor="middle" variants={item(1.3)} initial="hidden" animate="visible">
          Angles are congruent
        </motion.text>
      </svg>
    </div>
  );
};

/* ---------- QUIZ FIGURE PER QUESTION ---------- */
const AngleQuizFigure: React.FC<{ index: number }> = ({ index }) => {
  const { isDarkMode } = useThemeContext();
  const blue = isDarkMode ? "#60A5FA" : "#2563EB";

  return (
    <div className="flex justify-center p-4">
      <svg width="320" height="170" viewBox="0 0 320 170">
        {index === 0 && (
          <>
            <line x1="160" y1="140" x2="90" y2="40" stroke={blue} strokeWidth="5" />
            <line x1="160" y1="140" x2="230" y2="40" stroke={blue} strokeWidth="5" />
            <text x="160" y="30" textAnchor="middle" fill={blue}>
              {`∠A ≅ ∠A`}
            </text>
          </>
        )}
        {index === 1 && (
          <>
            {/* angle A */}
            <line x1="80" y1="120" x2="160" y2="40" stroke={blue} strokeWidth="5" />
            <line x1="80" y1="120" x2="160" y2="120" stroke={blue} strokeWidth="5" />
            <text x="80" y="138" textAnchor="middle" fill={blue}>
              {`∠A`}
            </text>
            {/* angle B */}
            <line x1="240" y1="120" x2="160" y2="40" stroke={blue} strokeWidth="5" />
            <line x1="240" y1="120" x2="160" y2="120" stroke={blue} strokeWidth="5" />
            <text x="240" y="138" textAnchor="middle" fill={blue}>
              {`∠B`}
            </text>

            <text x="160" y="22" textAnchor="middle" fill={blue}>
              {`∠A ≅ ∠B ⇒ ∠B ≅ ∠A`}
            </text>
          </>
        )}
        {index === 2 && (
          <>
            <text x="160" y="60" textAnchor="middle" fill={blue}>
              {`If ∠A ≅ ∠B`}
            </text>
            <text x="160" y="86" textAnchor="middle" fill={blue}>
              {`and ∠B ≅ ∠C`}
            </text>
            <text x="160" y="122" textAnchor="middle" fill={blue} fontWeight="bold">
              {`Then ∠A ≅ ∠C`}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

/* ================================================================
   MAIN SLIDE COMPONENT
================================================================ */
export default function PropertiesSlide7() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [answered, setAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);

  const slideInteractions: Interaction[] = [
    {
      id: "properties-angle-congruence-quiz",
      conceptId: "properties-angle-congruence",
      conceptName: "Congruence of Angles",
      type: "judging",
      description: "Identify R/S/T properties for angle congruence"
    }
  ];

  type Quiz = {
    id: string;
    question: string;
    options: string[];
    correct: string;
    explanation: string;
  };

  const questions: Quiz[] = [
    {
      id: "ang-q1",
      question: "Which property explains why ∠A ≅ ∠A is always true?",
      options: ["Reflexive Property", "Symmetric Property", "Transitive Property"],
      correct: "Reflexive Property",
      explanation: "Every angle is congruent to itself. That's the Reflexive Property of Congruence."
    },
    {
      id: "ang-q2",
      question: "If ∠A ≅ ∠B, then ∠B ≅ ∠A. Which property is used?",
      options: ["Reflexive Property", "Symmetric Property", "Transitive Property"],
      correct: "Symmetric Property",
      explanation: "We can flip a congruence statement: if first is congruent to second, then second is congruent to first."
    },
    {
      id: "ang-q3",
      question: "If ∠A ≅ ∠B and ∠B ≅ ∠C, then ∠A ≅ ∠C. Which property is used?",
      options: ["Reflexive Property", "Symmetric Property", "Transitive Property"],
      correct: "Transitive Property",
      explanation: "We pass congruence along a chain: A ≅ B and B ≅ C implies A ≅ C."
    }
  ];

  const logInteraction = (resp: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [resp.interactionId]: resp }));
  };

  const handleAnswer = (opt: string) => {
    if (showFeedback || complete) return;
    setSelected(opt);
    setShowFeedback(true);

    const current = questions[qIndex];
    const isCorrect = opt === current.correct;

    if (isCorrect) setScore(s => s + 1);

    logInteraction({
      interactionId: `angle-quiz-${current.id}-${Date.now()}`,
      value: opt,
      isCorrect,
      timestamp: Date.now(),
      conceptId: "properties-angle-congruence",
      conceptName: "Congruence of Angles",
      question: { type: "mcq", question: current.question, options: current.options }
    });
  };

  const next = () => {
    const a = [...answered];
    a[qIndex] = true;
    setAnswered(a);
    setSelected("");
    setShowFeedback(false);

    if (qIndex < questions.length - 1) setQIndex(qIndex + 1);
    else setComplete(true);
  };

  const { isDarkMode } = useThemeContext();

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">Congruence of Angles</h2>
            <AngleCollectionFigure />
            <p className="mt-4">
              Congruent <em>angles</em> satisfy the same three equivalence properties as equality:
              reflexive, symmetric, and transitive.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li><b>Reflexive:</b> {`∠a ≅ ∠a`}</li>
              <li><b>Symmetric:</b> {`If ∠a ≅ ∠b, then ∠b ≅ ∠a`}</li>
              <li><b>Transitive:</b> {`If ∠a ≅ ∠b and ∠b ≅ ∠c, then ∠a ≅ ∠c`}</li>
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3 text-center">Numbers vs Figures</h3>
            <CongruenceVsEqualityAnimation />
            <p className="text-sm text-center mt-2 opacity-80">
              Use "=" for measures (numbers). Use "≅" for the angles themselves (figures).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Name That Property</h3>
              <div>Question {qIndex + 1} of {questions.length}</div>
            </div>

            {/* Progress */}
            <div className="flex space-x-2 mb-6">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded ${
                    i === qIndex ? "bg-blue-500"
                      : answered[i] ? "bg-blue-300 dark:bg-blue-800"
                      : "bg-slate-300 dark:bg-slate-600"} `}
                />
              ))}
            </div>

            {/* Figure */}
            <AngleQuizFigure index={qIndex} />

            {/* Question + options */}
            {!complete ? (
              <>
                <div className="text-lg mb-4">{questions[qIndex].question}</div>
                <div className="space-y-3">
                  {questions[qIndex].options.map((opt, i) => {
                    const correct = opt === questions[qIndex].correct;
                    const selectedState = selected === opt;
                    const base = "w-full p-3 rounded-lg text-left transition-all border-2";
                    const visual =
                      selectedState && showFeedback
                        ? correct
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-red-500 bg-red-50 dark:bg-red-900/20"
                        : selectedState
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                        : "border-slate-300 dark:border-slate-600 hover:border-blue-400";
                    return (
                      <motion.button
                        key={i}
                        whileHover={!showFeedback ? { scale: 1.02 } : {}}
                        whileTap={!showFeedback ? { scale: 0.98 } : {}}
                        className={`${base} ${visual}`}
                        disabled={showFeedback}
                        onClick={() => handleAnswer(opt)}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className={`mt-4 p-4 rounded-lg border ${
                        selected === questions[qIndex].correct
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                          : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
                      }`}
                    >
                      <div className="mb-4">{questions[qIndex].explanation}</div>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={next}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        {qIndex < questions.length - 1 ? "Next Question" : "Complete Quiz"}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-3xl mb-2">✅</div>
                <div className="text-lg">You scored {score} / {questions.length}</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="properties-angle-congruence"
      slideTitle="Congruence of Angles"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}
