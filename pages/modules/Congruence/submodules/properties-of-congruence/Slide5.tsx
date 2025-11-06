import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

const CongruencePropertiesFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB';
  const color2 = isDarkMode ? '#4ADE80' : '#22C55E';

  const textProps = {
    fontSize: 20,
    fontFamily: "monospace",
    textAnchor: "middle" as const,
    fill: color1
  };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60" style={{ minHeight: svgHeight }}>
      <svg width={svgWidth} height={svgHeight}>
        {questionIndex === 0 && (
          <text x={200} y={120} {...textProps}>¯AB ≅ ¯AB</text>
        )}
        {questionIndex === 1 && (
          <>
            <text x={200} y={90} {...textProps}>¯AB ≅ ¯CD</text>
            <text x={200} y={130} {...textProps}>⇒ ¯CD ≅ ¯AB</text>
          </>
        )}
        {questionIndex === 2 && (
          <>
            <text x={200} y={90} {...textProps}>¯AB ≅ ¯CD</text>
            <text x={200} y={130} {...textProps}>¯CD ≅ ¯EF</text>
            <text x={200} y={170} {...textProps} fill={color2}>⇒ ¯AB ≅ ¯EF</text>
          </>
        )}
      </svg>
    </div>
  );
};

export default function PropertiesSlide5() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const questions = [
    {
      question: 'Which property is being used if a segment is congruent to itself?',
      options: [
        "Reflexive Property of Congruence",
        "Symmetric Property of Congruence",
        "Transitive Property of Congruence"
      ],
      correctAnswer: "Reflexive Property of Congruence",
      explanation: "A segment always matches itself. That's reflexive."
    },
    {
      question: 'Which property allows us to flip a congruence statement?',
      options: [
        "Reflexive Property of Congruence",
        "Symmetric Property of Congruence",
        "Transitive Property of Congruence"
      ],
      correctAnswer: "Symmetric Property of Congruence",
      explanation: "If ¯AB ≅ ¯CD, then ¯CD ≅ ¯AB."
    },
    {
      question: 'Which property allows congruence to pass from one pair to another?',
      options: [
        "Reflexive Property of Congruence",
        "Symmetric Property of Congruence",
        "Transitive Property of Congruence"
      ],
      correctAnswer: "Transitive Property of Congruence",
      explanation: "If ¯AB ≅ ¯CD and ¯CD ≅ ¯EF, then ¯AB ≅ ¯EF."
    }
  ];

  const handleAnswer = (answer: string) => {
    if (showFeedback || isQuizComplete) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    const updated = [...questionsAnswered];
    updated[currentQuestionIndex] = true;
    setQuestionsAnswered(updated);
    setSelectedAnswer('');
    setShowFeedback(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  return (
    <SlideComponentWrapper
      slideId="properties-congruence-rst"
      slideTitle="Reflexivity, Symmetricity, and Transitivity of Congruence"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

        {/* LEFT SIDE WITH UPDATED EXPLANATION */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Reflexivity, Symmetricity, and Transitivity of Congruence
            </h2>

            <p>Suppose that <strong>a</strong>, <strong>b</strong>, and <strong>c</strong> are all segments. We can state the properties of segment congruence more generally:</p>

            <ul className="list-disc list-inside space-y-4 mt-4">
              <li>
                <strong>Reflexive Property:</strong>
                <br />Every segment is congruent to itself.
                <br /><span className="font-mono text-sm">a ≅ a</span>
              </li>

              <li>
                <strong>Symmetric Property:</strong>
                <br />If one segment is congruent to another, we can reverse the statement.
                <br /><span className="font-mono text-sm">If a ≅ b, then b ≅ a</span>
              </li>

              <li>
                <strong>Transitive Property:</strong>
                <br />If the first is congruent to the second and the second is congruent to the third, then the first is congruent to the third.
                <br /><span className="font-mono text-sm">If a ≅ b and b ≅ c, then a ≅ c</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE QUIZ & FIGURE */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            <CongruencePropertiesFigure questionIndex={currentQuestionIndex} />
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            {!isQuizComplete ? (
              <>
                <p className="text-lg mb-4">{questions[currentQuestionIndex].question}</p>

                {questions[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-3 rounded-lg border-2 my-2 text-left
                      ${selectedAnswer === option
                        ? selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? "border-blue-500 bg-blue-100"
                          : "border-red-500 bg-red-100"
                        : "border-slate-300 dark:border-slate-600 hover:border-blue-400"}`}
                  >
                    {option}
                  </button>
                ))}

                {showFeedback && (
                  <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-700 rounded">
                    {questions[currentQuestionIndex].explanation}
                    <button onClick={nextQuestion} className="w-full mt-3 bg-blue-600 text-white p-2 rounded-lg">
                      {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6 text-xl">
                ✅ Quiz Complete! Score: {score}/{questions.length}
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
}
