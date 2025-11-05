import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- QUIZ FIGURE COMPONENT DEFINED INSIDE ---
const CongruencePropertiesFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const color2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const color3 = isDarkMode ? '#F87171' : '#EF4444'; // Red

  const commonProps = {
    fill: 'none',
    strokeWidth: 2,
    stroke: strokeColor,
  };
  
  const textProps = {
    fontSize: 20,
    fontFamily: "monospace",
    textAnchor: "middle" as const, // <-- FIX: Added 'as const'
    fill: color1
  };
  
  const itemAnim = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <AnimatePresence>
          {questionIndex === 0 && (
            <motion.g key="q1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Figure: Shared Side */}
              <path d="M 100 50 L 200 180 L 100 180 Z" {...commonProps} />
              <path d="M 300 50 L 200 180 L 300 180 Z" {...commonProps} />
              <line x1="200" y1="180" x2="100" y2="180" stroke={color1} strokeWidth="4" />
              <line x1="200" y1="180" x2="300" y2="180" stroke={color1} strokeWidth="4" />
              <line x1="200" y1="180" x2="100" y2="50" stroke={color1} strokeWidth="4" />
              <line x1="200" y1="180" x2="300" y2="50" stroke={color1} strokeWidth="4" />
              <line x1="200" y1="180" x2="200" y2="50" stroke={color2} strokeWidth="4" strokeDasharray="5 5" />
              <text x={210} y={115} fill={color2} fontSize="14">Shared Side</text>
              <text x={200} y={30} fill={strokeColor} textAnchor="middle" fontSize="16">{"Statement: $\overline{BD} \cong \overline{BD}$"}</text>
            </motion.g>
          )}

          {questionIndex === 1 && (
            <motion.g key="q2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <text x={200} y={90} {...textProps}>{"Given: $\triangle ABC \cong \triangle DEF$"}</text>
              <text x={200} y={130} {...textProps}>{"Conclusion: $\triangle DEF \cong \triangle ABC$"}</text>
            </motion.g>
          )}
          
          {questionIndex === 2 && (
            <motion.g key="q3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <text x={200} y={90} {...textProps}>{"If: $\overline{AB} \cong \overline{CD}$"}</text>
              <text x={200} y={120} {...textProps}>{"and $\overline{CD} \cong \overline{EF}$"}</text>
              <text x={200} y={160} {...textProps} fill={color2} fontWeight="bold">{"Then: $\overline{AB} \cong \overline{EF}$"}</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function PropertiesSlide5() {
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
      id: 'properties-congruence-rst-quiz',
      conceptId: 'properties-congruence-rst',
      conceptName: 'RST of Congruence',
      type: 'judging',
      description: 'Testing identification of equivalence properties for congruence'
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
      id: 'properties-congruence-q1',
      question: 'Which property justifies the statement in the diagram?',
      options: [
        "Reflexive Property of Congruence",
        "Symmetric Property of Congruence",
        "Transitive Property of Congruence"
      ],
      correctAnswer: "Reflexive Property of Congruence",
      explanation: "Correct! The Reflexive Property states that any figure is congruent to itself. We use this in proofs as the reason for a 'shared side'."
    },
    {
      id: 'properties-congruence-q2',
      question: 'Which property is shown in the diagram?',
      options: [
        "Reflexive Property of Congruence",
        "Symmetric Property of Congruence",
        "Transitive Property of Congruence"
      ],
      correctAnswer: "Symmetric Property of Congruence",
      explanation: "Correct! The Symmetric Property allows us to 'flip' a congruence statement, just like an equation."
    },
    {
      id: 'properties-congruence-q3',
      question: 'Which property is shown in the diagram?',
      options: [
        "Reflexive Property of Congruence",
        "Symmetric Property of Congruence",
        "Transitive Property of Congruence"
      ],
      correctAnswer: "Transitive Property of Congruence",
      explanation: "Correct! The Transitive Property allows us to 'pass' congruence down a chain. If A $\cong$ B and B $\cong$ C, then A $\cong$ C."
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
      interactionId: `properties-congruence-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'properties-congruence-rst',
      conceptName: 'RST of Congruence',
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
          {/* --- CARD 1 --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The Properties of Congruence ($\cong$)</h2>
            <p className="text-lg leading-relaxed">
              These are the formal logic rules for proofs. They work just like the properties of equality, but they apply to *figures* (like segments, angles, and triangles).
            </p>
          </div>

          {/* --- CARD 2 (The Properties) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The 3 Equivalence Properties</h3>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Reflexive Property of Congruence:</strong>
                <br/>Any figure is congruent to itself.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">{"$\overline{AB} \cong \overline{AB}$"}</span>
              </li>
              <li>
                <strong>Symmetric Property of Congruence:</strong>
                <br/>Congruence statements can be flipped.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">{"If $\angle A \cong \angle B$, then $\angle B \cong \angle A$"}</span>
              </li>
              <li>
                <strong>Transitive Property of Congruence:</strong>
                <br/>Congruence can be passed along a chain.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">{"If $\triangle A \cong \triangle B$ and $\triangle B \cong \triangle C$, then $\triangle A \cong \triangle C$"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Name That Property</h3>
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

            {/* --- USE THE QUIZ FIGURE COMPONENT --- */}
            <CongruencePropertiesFigure questionIndex={currentQuestionIndex} />

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
                            : 'border-red-500 bg-red-100 dark:bg-red-800 opacity-70' // INCORRECT
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
                <div className="text-3xl mb-4">⚖️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered the properties of congruence!" : 'Great job!'}
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
      slideId="properties-congruence-rst"
      slideTitle="Reflexivity, Symmetricity, and Transitivity of Congruence"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}