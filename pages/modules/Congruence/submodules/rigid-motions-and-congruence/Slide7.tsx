import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const TrueFalseAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const color2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const color3 = isDarkMode ? '#F87171' : '#EF4444'; // Red

  // Triangle
  const triangle = "M 50 150 L 100 50 L 150 150 Z";

  const anim = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Pre-image */}
        <motion.path d={triangle} fill={color1} opacity="0.7" initial="hidden" animate="visible" variants={anim(0.5)} />
        <motion.text x={90} y={165} fill={color1} fontSize="14" initial="hidden" animate="visible" variants={anim(0.7)}>
          $\triangle ABC$
        </motion.text>
        
        {/* Image 1 (Congruent) */}
        <motion.path 
          d={triangle} 
          fill={color2} 
          opacity="0.7"
          initial={{ opacity: 0, x: 0, rotate: 0 }}
          animate={{ opacity: 0.7, x: 150, rotate: 45, transformOrigin: "100px 100px" }}
          transition={{ delay: 1.0, duration: 1 }}
        />
        <motion.text x={240} y={165} fill={color2} fontSize="14" initial="hidden" animate="visible" variants={anim(1.5)}>
          $\triangle A'B'C'$
        </motion.text>
        <motion.text x={180} y={200} fill={color2} fontSize="14" initial="hidden" animate="visible" variants={anim(2.0)}>
          (Rotation - Rigid Motion)
        </motion.text>
        
        {/* Image 2 (Not Congruent) */}
        <motion.path 
          d={triangle} 
          fill={color3} 
          opacity="0.7"
          initial={{ opacity: 0, x: 0, scale: 1 }}
          animate={{ opacity: 0.7, x: 250, scale: 0.5, transformOrigin: "100px 100px" }}
          transition={{ delay: 2.5, duration: 1 }}
        />
        <motion.text x={315} y={145} fill={color3} fontSize="14" initial="hidden" animate="visible" variants={anim(3.0)}>
          $\triangle A''B''C''$
        </motion.text>
        <motion.text x={280} y={40} fill={color3} fontSize="14" initial="hidden" animate="visible" variants={anim(3.5)}>
          (Dilation - NOT Rigid)
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function RigidMotionsSlide7() {
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
      id: 'rigid-motions-true-statements-quiz',
      conceptId: 'rigid-motions-true-statements',
      conceptName: 'True Statements',
      type: 'judging',
      description: 'Testing validation of statements about rigid motions'
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
      id: 'rigid-motions-true-q1',
      question: 'True or False: If a sequence of rigid motions maps Figure A onto Figure B, then Figure A is congruent to Figure B.',
      options: [
        "True",
        "False"
      ],
      correctAnswer: "True",
      explanation: "Correct! This is the formal definition of congruence. Since rigid motions preserve size and shape, the figures must be congruent."
    },
    {
      id: 'rigid-motions-true-q2',
      question: 'True or False: The transformation $T(x, y) = (x, 3y)$ is a rigid motion.',
      options: [
        "True",
        "False"
      ],
      correctAnswer: "False",
      explanation: "Correct! This transformation multiplies the y-coordinate by 3, stretching the figure vertically. This is a dilation, not a rigid motion, as it does not preserve distance."
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
      interactionId: `rigid-motions-true-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'rigid-motions-true-statements',
      conceptName: 'True Statements',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Final Review: What is True?</h2>
            <p className="text-lg leading-relaxed">
              This submodule is all about the formal definition of congruence. Let's review the most important facts.
            </p>
          </div>

          {/* --- CARD 2 (The Checklist) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Core Truths</h3>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong className="text-green-600 dark:text-green-400">TRUE:</strong> Two figures are congruent if a sequence of rigid motions (translations, rotations, reflections) maps one onto the other.
              </li>
               <li>
                <strong className="text-green-600 dark:text-green-400">TRUE:</strong> Rigid motions preserve distance, angle measure, parallelism, and area.
              </li>
              <li>
                <strong className="text-green-600 dark:text-green-400">TRUE:</strong> Translations and Rotations preserve orientation.
              </li>
              <li>
                <strong className="text-red-600 dark:text-red-400">FALSE:</strong> A Reflection preserves orientation (it *reverses* it).
              </li>
              <li>
                <strong className="text-red-600 dark:text-red-400">FALSE:</strong> A Dilation is a rigid motion (it changes size).
              </li>
              <li>
                <strong className="text-red-600 dark:text-red-400">FALSE:</strong> Any transformation rule that multiplies coordinates (like $2x$ or $3y$) is a rigid motion.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Rigid vs. Non-Rigid</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <TrueFalseAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              $\triangle ABC \cong \triangle A'B'C'$ (Rigid).
              <br/>
              $\triangle ABC$ is <strong>NOT</strong> congruent to $\triangle A''B''C''$ (Non-Rigid).
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">True or False?</h3>
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
                <div className="text-3xl mb-4">✔️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You're an expert on congruence!" : 'Great job!'}
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
      slideId="rigid-motions-true-statements"
      slideTitle="Identifying True Statements About Rigid Motions"
      moduleId="congruence"
      submoduleId="rigid-motions-and-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}