import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const PropertiesAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const color2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  
  const T1 = "M 50 150 L 100 50 L 150 150 Z";
  const T2 = "M 170 150 L 220 50 L 270 150 Z";
  const T3 = "M 290 150 L 340 50 L 390 150 Z";

  const itemAnim = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Title */}
        <motion.text x={200} y={30} fill={strokeColor} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(0.5)}>
          Congruence is an <strong>Equivalence Relation</strong>
        </motion.text>
        
        {/* Reflexive */}
        <motion.path d={T1} fill={color1} opacity="0.7" initial="hidden" animate="visible" variants={itemAnim(1.0)} />
        <motion.text x={100} y={175} fill={color1} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(1.2)}>
          $\triangle A \cong \triangle A$
        </motion.text>
        <motion.text x={100} y={195} fill={strokeColor} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(1.4)}>
          (Reflexive)
        </motion.text>
        
        {/* Symmetric */}
        <motion.path d={T2} fill={color2} opacity="0.7" initial="hidden" animate="visible" variants={itemAnim(2.0)} />
        <motion.text x={220} y={175} fill={color2} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(2.2)}>
          If $\triangle A \cong \triangle B$
        </motion.text>
        <motion.text x={220} y={195} fill={color2} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(2.4)}>
          then $\triangle B \cong \triangle A$
        </motion.text>
        <motion.text x={220} y={215} fill={strokeColor} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(2.6)}>
          (Symmetric)
        </motion.text>

        {/* Transitive */}
        <motion.path d={T3} fill={color1} opacity="0.7" initial="hidden" animate="visible" variants={itemAnim(3.2)} />
        <motion.text x={340} y={175} fill={color1} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(3.4)}>
          If $\triangle A \cong \triangle B$
        </motion.text>
        <motion.text x={340} y={195} fill={color1} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(3.6)}>
          and $\triangle B \cong \triangle C$
        </motion.text>
         <motion.text x={340} y={215} fill={color1} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(3.8)}>
          then $\triangle A \cong \triangle C$
        </motion.text>
        <motion.text x={340} y={235} fill={strokeColor} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(4.0)}>
          (Transitive)
        </motion.text>
        
        {/* Arrows for Transitive */}
        <motion.path d="M 100 100 -> 220 100" stroke={color2} strokeWidth="2"
          initial="hidden" animate="visible" variants={itemAnim(3.4)} />
        <motion.path d="M 220 100 -> 340 100" stroke={color2} strokeWidth="2"
          initial="hidden" animate="visible" variants={itemAnim(3.6)} />
        <motion.path d="M 100 120 -> 340 120" stroke={color1} strokeWidth="2"
          initial="hidden" animate="visible" variants={itemAnim(3.8)} />

      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function PropertiesSlide1() {
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
      id: 'properties-intro-quiz',
      conceptId: 'properties-of-congruence-intro',
      conceptName: 'Properties of Congruence Intro',
      type: 'judging',
      description: 'Testing understanding of why properties are needed'
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
      id: 'properties-intro-q1',
      question: 'Why are properties like "Reflexive" or "Symmetric" important in geometry?',
      options: [
        "They help calculate the area of a triangle.",
        "They are the formal logic rules needed to write a valid proof.",
        "They are the same as SSS and SAS.",
        "They are only used for rigid motions."
      ],
      correctAnswer: "They are the formal logic rules needed to write a valid proof.",
      explanation: "Correct! These properties are the 'rules of the road' for logic, just like the properties of equality (like 'if a=b, then b=a') are the rules for algebra."
    },
    {
      id: 'properties-intro-q2',
      question: 'Congruence is an "equivalence relation," which means it behaves just like what other symbol?',
      options: [
        "The 'greater than' sign (>)",
        "The 'plus' sign (+)",
        "The 'equals' sign (=)",
        "The 'perpendicular' sign (⊥)"
      ],
      correctAnswer: "The 'equals' sign (=)",
      explanation: "Exactly! Congruence ($\cong$) for shapes works just like equality ($=$) for numbers. Both are reflexive, symmetric, and transitive."
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
      interactionId: `properties-intro-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'properties-of-congruence-intro',
      conceptName: 'Properties of Congruence Intro',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Properties of Congruence</h2>
            <p className="text-lg leading-relaxed">
              This submodule is about the formal "rules" of logic that govern congruence.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Just like you have properties for equality ($=$) in algebra (like $x = y$ means $y = x$), we have properties for congruence ($\cong$) in geometry.
            </p>
          </div>

          {/* --- CARD 2 (The Properties) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The 3 Equivalence Properties</h3>
            <p className="text-lg leading-relaxed">
              For any shapes $A$, $B$, and $C$:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Reflexive Property:</strong>
                <br/>Any figure is congruent to itself.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">$\triangle ABC \cong \triangle ABC$</span>
              </li>
              <li>
                <strong>Symmetric Property:</strong>
                <br/>If $A$ is congruent to $B$, then $B$ is congruent to $A$.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">If $\triangle A \cong \triangle B$, then $\triangle B \cong \triangle A$</span>
              </li>
              <li>
                <strong>Transitive Property:</strong>
                <br/>If $A \cong B$ and $B \cong C$, then $A \cong C$.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">If $\triangle A \cong \triangle B$ and $\triangle B \cong \triangle C$, then $\triangle A \cong \triangle C$</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The 3 Properties</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <PropertiesAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-20 text-center">
              These rules allow us to use logic in proofs, just like in algebra.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD --- */}
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
                  {score === questions.length ? "You understand the laws of logic!" : 'Great job!'}
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
      slideId="properties-introduction"
      slideTitle="Introduction to Properties of Congruence"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}