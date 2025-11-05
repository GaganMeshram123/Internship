import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const SymmetricPropertyAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  
  const textProps = {
    fontSize: 20,
    fontFamily: "monospace",
    textAnchor: "middle",
    fill: color1
  };

  const itemAnim = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        
      {/*   <motion.text x={200} y={60} {...textProps} initial="hidden" animate="visible" variants={itemAnim(0.5)}>
          Given: $m\angle B = m\angle A$
        </motion.text>
         */}
        <motion.path 
          d="M 150 80 C 200 100, 200 100, 250 80" 
          stroke={strokeColor} 
          strokeWidth="2"
          strokeDasharray="4 4"
          fill="none"
          initial="hidden" animate="visible" variants={itemAnim(1.0)}
        />
        <motion.text x={280} y={90} fill={strokeColor} initial="hidden" animate="visible" variants={itemAnim(1.2)}>
          (Symmetric Property)
        </motion.text>
        
       {/*  <motion.text x={200} y={130} {...textProps} initial="hidden" animate="visible" variants={itemAnim(1.5)}>
          Use: $m\angle A = m\angle B$
        </motion.text> */}
        
        <motion.text x={200} y={180} fill={strokeColor} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(2.0)}>
          In proofs, we often do this "flip"
        </motion.text>
        <motion.text x={200} y={200} fill={strokeColor} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(2.2)}>
          without writing a separate step.
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function PropertiesSlide9() {
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
      id: 'properties-omitting-symmetric-quiz',
      conceptId: 'properties-omitting-symmetric',
      conceptName: 'Omitting Symmetric Property',
      type: 'judging',
      description: 'Testing understanding of the symmetric property convention'
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
      id: 'properties-omitting-q1',
      question: 'Why is the Symmetric Property often omitted in proofs?',
      options: [
        "It is not a real property.",
        "It is only for segments, not angles.",
        "It is considered obvious and is omitted for brevity (to save time)."
      ],
      correctAnswer: "It is considered obvious and is omitted for brevity (to save time).",
      explanation: "Correct! Most proofs assume that if $A \cong B$ is true, then $B \cong A$ is also true without needing a separate line item. It's a common convention."
    },
    {
      id: 'properties-omitting-q2',
      question: 'If a "Given" is $\overline{XY} \cong \overline{AB}$ and you write $\overline{AB} \cong \overline{XY}$ in your proof, what is the *technical* reason?',
      options: [
        "The Transitive Property",
        "The Symmetric Property",
        "The Reflexive Property"
      ],
      correctAnswer: "The Symmetric Property",
      explanation: "Correct! Even though we often skip this step, the Symmetric Property is the formal, logical reason that allows you to 'flip' the congruence statement."
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
      interactionId: `properties-omitting-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'properties-omitting-symmetric',
      conceptName: 'Omitting Symmetric Property',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">A Note on Proofs</h2>
            <p className="text-lg leading-relaxed">
              You may have noticed that the **Symmetric Property** feels a little... obvious.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              If $\triangle ABC \cong \triangle DEF$, *of course* $\triangle DEF \cong \triangle ABC$.
            </p>
          </div>

          {/* --- CARD 2 (The Convention) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Omitting the Step</h3>
            <p className="text-lg leading-relaxed">
              Because it is so obvious, most two-column proofs **omit** this step for brevity.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              {/* <p className="text-lg">
                For example, if your "Given" is $\overline{CD} \cong \overline{AB}$, you will often just write $\overline{AB} \cong \overline{CD}$ in your proof and re-use the reason "Given".
              </p> */}
            </div>
            <p className="text-lg leading-relaxed mt-4">
              Technically, this is not 100% precise, as the *real* reason is the Symmetric Property. However, it is a universally accepted convention to keep proofs from becoming too long and repetitive.
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">A Common Shortcut</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <SymmetricPropertyAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              We "flip" statements all the time without writing a new step.
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
                <div className="text-3xl mb-4">👍</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You understand this convention!" : 'Great job!'}
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
      slideId="properties-omitting-symmetric"
      slideTitle="Omitting the Symmetric Property"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}