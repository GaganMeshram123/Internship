import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Interaction, InteractionResponse } from "../../../common-components/concept";
import SlideComponentWrapper from "../../../common-components/SlideComponentWrapper";
import { useThemeContext } from "@/lib/ThemeContext";

// --- FIGURE COMPONENT (Detailed Textbook Style) ---
const SegmentSetFigure: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const stroke = isDarkMode ? "#E2E8F0" : "#334155";
  const segment = isDarkMode ? "#60A5FA" : "#2563EB";

  return (
    <div className="flex justify-center items-center p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
      <svg width="300" height="260" viewBox="0 0 300 260">
        {/* Circle boundary */}
        <circle cx="150" cy="130" r="100" stroke={stroke} strokeWidth="2" fill="none" />

        {/* Segments + labels */}
        {/* AB */}
        <line x1="110" y1="80" x2="150" y2="90" stroke={segment} strokeWidth="3" />
        <text x="105" y="75" fill={stroke} fontSize="14">A</text>
        <text x="153" y="95" fill={stroke} fontSize="14">B</text>

        {/* CD */}
        <line x1="135" y1="130" x2="175" y2="130" stroke={segment} strokeWidth="3" />
        <text x="130" y="135" fill={stroke} fontSize="14">C</text>
        <text x="180" y="135" fill={stroke} fontSize="14">D</text>

        {/* EF */}
        <line x1="180" y1="95" x2="210" y2="120" stroke={segment} strokeWidth="3" />
        <text x="175" y="90" fill={stroke} fontSize="14">E</text>
        <text x="212" y="125" fill={stroke} fontSize="14">F</text>

        {/* GH */}
        <line x1="100" y1="170" x2="140" y2="175" stroke={segment} strokeWidth="3" />
        <text x="95" y="175" fill={stroke} fontSize="14">G</text>
        <text x="145" y="180" fill={stroke} fontSize="14">H</text>

        {/* IJ */}
        <line x1="200" y1="160" x2="200" y2="200" stroke={segment} strokeWidth="3" />
        <text x="190" y="155" fill={stroke} fontSize="14">I</text>
        <text x="190" y="205" fill={stroke} fontSize="14">J</text>
      </svg>
    </div>
  );
};

// --- SIMPLE ANIMATION (kept from previous slide) ---
const CongruenceVsEqualityAnimation: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const stroke = isDarkMode ? "#E2E8F0" : "#334155";
  const blue = isDarkMode ? "#60A5FA" : "#2563EB";

  return (
    <div className="w-full flex justify-center items-center p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
      <svg width="380" height="200" viewBox="0 0 380 200">
        <text x="190" y="25" fill={stroke} textAnchor="middle" fontSize="18">Congruence vs Equality</text>

        <text x="100" y="70" fill={blue} textAnchor="middle" fontSize="18">Equality (=)</text>
        <text x="100" y="100" fill={stroke} textAnchor="middle" fontSize="14">Compares Lengths</text>
        <text x="100" y="135" fill={blue} textAnchor="middle" fontFamily="monospace">AB = CD</text>

        <line x1="190" y1="60" x2="190" y2="160" stroke={stroke} strokeWidth="2" />

        <text x="280" y="70" fill={blue} textAnchor="middle" fontSize="18">Congruence (≅)</text>
        <text x="280" y="100" fill={stroke} textAnchor="middle" fontSize="14">Compares Segments</text>
        <text x="280" y="135" fill={blue} textAnchor="middle" fontFamily="monospace">¯AB ≅ ¯CD</text>
      </svg>
    </div>
  );
};

// --- MAIN SLIDE ---
export default function PropertiesSlide4() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [answered, setAnswered] = useState([false, false]);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const questions = [
    {
      question: "Which statement compares *lengths* (numbers)?",
      options: ["¯AB ≅ ¯CD", "AB = CD", "AB ≅ CD", "¯AB = CD"],
      correct: "AB = CD",
      explanation: "AB and CD (without bars) represent lengths → use '='."
    },
    {
      question: "Which statement compares the *segments themselves*?",
      options: ["¯AB ≅ ¯CD", "AB = CD", "AB ≅ CD", "¯AB = ¯CD"],
      correct: "¯AB ≅ ¯CD",
      explanation: "Bar notation means the actual segment → use '≅'."
    }
  ];

  const submitAnswer = (ans: string) => {
    if (showFeedback || done) return;
    setSelected(ans);
    setShowFeedback(true);
    if (ans === questions[index].correct) setScore(s => s + 1);
  };

  const next = () => {
    const updated = [...answered];
    updated[index] = true;
    setAnswered(updated);
    setSelected("");
    setShowFeedback(false);
    if (index < questions.length - 1) setIndex(i => i + 1);
    else setDone(true);
  };

  return (
    <SlideComponentWrapper
      slideId="properties-segment-congruence"
      slideTitle="Congruence of Segments"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            <h2 className="text-2xl text-blue-600 dark:text-blue-400 font-bold mb-4">Congruence of Segments</h2>

            <p>Two segments are <strong>congruent</strong> if they have the <strong>same length</strong>.</p>

            <p className="mt-3">Imagine a set containing every segment that has the same length as <strong>¯AB</strong>. All those segments belong to the same congruence class.</p>

            <div className="my-5"><SegmentSetFigure /></div>

            <p className="mt-4">
              Segment congruence obeys the **same three properties** as equality:
            </p>

            <ul className="list-disc list-inside space-y-2 mt-4">
              <li><strong>Reflexive:</strong> ¯AB ≅ ¯AB</li>
              <li><strong>Symmetric:</strong> If ¯AB ≅ ¯CD, then ¯CD ≅ ¯AB</li>
              <li><strong>Transitive:</strong> If ¯AB ≅ ¯CD and ¯CD ≅ ¯EF, then ¯AB ≅ ¯EF</li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            <CongruenceVsEqualityAnimation />
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            <h3 className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-3">Check Your Understanding</h3>

            {!done ? (
              <>
                <p className="mb-3">{questions[index].question}</p>

                {questions[index].options.map((opt, i) => {
                  const selectedState = selected === opt;
                  const correct = opt === questions[index].correct;
                  return (
                    <button
                      key={i}
                      onClick={() => submitAnswer(opt)}
                      className={`w-full p-3 rounded-lg border-2 text-left my-1 ${
                        selectedState ? (correct ? "border-blue-500 bg-blue-50" : "border-red-500 bg-red-50") :
                        "border-slate-300 dark:border-slate-600 hover:border-blue-400"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}

                {showFeedback && (
                  <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-700 rounded">
                    {questions[index].explanation}
                    <button onClick={next} className="w-full mt-3 bg-blue-600 text-white rounded-lg p-2">
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-3xl">✅</div>
                Score: {score} / {questions.length}
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
}
