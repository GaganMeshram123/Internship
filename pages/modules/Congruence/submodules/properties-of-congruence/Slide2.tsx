import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const EqualityPropertiesAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const color1 = isDarkMode ? '#F87171' : '#EF4444'; // Red
  const color2 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  
  const itemAnim = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Title */}
        <motion.text x={200} y={30} fill={strokeColor} fontSize="18" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(0.5)}>
          Properties of Equality (=)
        </motion.text>
        
        {/* Reflexive */}
        <motion.text x={80} y={80} fill={color1} fontSize="20" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(1.0)}>
          a = a
        </motion.text>
        <motion.text x={80} y={110} fill={strokeColor} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(1.2)}>
          Reflexive
        </motion.text>

        {/* Symmetric */}
        <motion.text x={200} y={80} fill={color2} fontSize="18" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(1.8)}>
          If a = b,
        </motion.text>
        <motion.text x={200} y={105} fill={color2} fontSize="18" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(2.0)}>
          then b = a
        </motion.text>
        <motion.text x={200} y={135} fill={strokeColor} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(2.2)}>
          Symmetric
        </motion.text>
        
        {/* Transitive */}
        <motion.text x={320} y={80} fill={color1} fontSize="18" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(2.8)}>
          If a = b
        </motion.text>
        <motion.text x={320} y={105} fill={color1} fontSize="18" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(3.0)}>
          and b = c,
        </motion.text>
        <motion.text x={320} y={130} fill={color1} fontSize="18" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(3.2)}>
          then a = c
        </motion.text>
        <motion.text x={320} y={160} fill={strokeColor} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(3.4)}>
          Transitive
        </motion.text>
        
        <motion.text x={200} y={200} fill={strokeColor} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={itemAnim(4.0)}>
          Congruence ($\cong$) follows these exact same rules.
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function PropertiesSlide2() {
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
      id: 'properties-equality-quiz',
      conceptId: 'properties-of-equality',
      conceptName: 'Properties of Equality',
      type: 'judging',
      description: 'Testing identification of equivalence properties'
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
      id: 'properties-equality-q1',
      question: 'The statement "$AB = AB$" is an example of which property?',
      options: [
        "Symmetric Property",
        "Reflexive Property",
        "Transitive Property",
        "Distributive Property"
      ],
      correctAnswer: "Reflexive Property",
      explanation: "Correct! The Reflexive Property states that any value is equal to itself."
    },
    {
      id: 'properties-equality-q2',
      question: 'If $m\angle A = m\angle B$ and $m\angle B = m\angle C$, then $m\angle A = m\angle C$. This is an example of which property?',
      options: [
        "Symmetric Property",
        "Reflexive Property",
        "Transitive Property",
        "Associative Property"
      ],
      correctAnswer: "Transitive Property",
      explanation: "Correct! The Transitive Property allows you to build a logical chain: if A equals B, and B equals C, then A must equal C."
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
      interactionId: `properties-equality-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'properties-of-equality',
      conceptName: 'Properties of Equality',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Back to Basics: Properties of Equality (=)</h2>
            <p className="text-lg leading-relaxed">
              Before we apply these properties to *congruence* ($\cong$), let's review how they work for *equality* ($=$).
            </p>
            <p className="text-lg leading-relaxed mt-4">
              These are the fundamental rules of logic that you've been using in algebra for years, maybe without knowing their names.
            </p>
          </div>

          {/* --- CARD 2 (The Properties) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The 3 Equivalence Properties of Equality</h3>
            <p className="text-lg leading-relaxed">
              For any numbers (or measures) $a$, $b$, and $c$:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Reflexive Property of Equality:</strong>
                <br/>A value is equal to itself.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">a = a</span>
              </li>
              <li>
                <strong>Symmetric Property of Equality:</strong>
                <br/>You can flip an equation.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">If a = b, then b = a</span>
              </li>
              <li>
                <strong>Transitive Property of Equality:</strong>
                <br/>You can pass equality along a chain.
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">If a = b and b = c, then a = c</span>
              </li>
            </ul>
             <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                These properties allow us to substitute values and build logical arguments in proofs.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Algebraic Logic</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <EqualityPropertiesAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-16 text-center">
              These are the three "common sense" rules of equality.
            </p>
          </div>

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
                <div className="text-3xl mb-4">🟰</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered the properties of equality!" : 'Great review!'}
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
      slideId="properties-equality"
      slideTitle="Reflexivity, Symmetricity, and Transitivity of Equality"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}