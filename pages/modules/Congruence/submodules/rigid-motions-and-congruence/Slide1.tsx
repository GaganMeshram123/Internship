import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- RIGID MOTIONS ANIMATION COMPONENT ---
const RigidMotionsAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const color2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green

  const triangle = "M 50 50 L 100 50 L 50 100 Z";
  
  const textAnim = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Pre-image */}
        <path d={triangle} fill={color1} opacity="0.5" />
        <text x="60" y="90" fill={color1} fontSize="14">Pre-Image</text>

        {/* 1. Translation (Slide) */}
        <motion.path 
          d={triangle} 
          fill={color2} 
          opacity="0.7"
          initial={{ x: 0, y: 0 }}
          animate={{ x: 120, y: 20 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.text x={170} y={110} fill={color2} fontSize="14"
          initial="hidden" animate="visible" variants={textAnim(1.5)}>
          Translation
        </motion.text>
        
        {/* 2. Rotation (Turn) */}
        <motion.path 
          d={triangle} 
          fill={color2} 
          opacity="0.7"
          initial={{ x: 0, y: 0, rotate: 0, transformOrigin: "50px 50px" }}
          animate={{ x: 200, y: 80, rotate: 90 }}
          transition={{ delay: 2.5, duration: 1 }}
        />
        <motion.text x={260} y={120} fill={color2} fontSize="14"
          initial="hidden" animate="visible" variants={textAnim(3.5)}>
          Rotation
        </motion.text>

        {/* 3. Reflection (Flip) */}
        <motion.path 
          d={triangle} 
          fill={color2} 
          opacity="0.7"
          initial={{ x: 0, y: 0, scaleX: 1, transformOrigin: "50px 50px" }}
          animate={{ x: 250, y: -20, scaleX: -1 }}
          transition={{ delay: 4.5, duration: 1 }}
        />
        <motion.text x={310} y={70} fill={color2} fontSize="14"
          initial="hidden" animate="visible" variants={textAnim(5.5)}>
          Reflection
        </motion.text>
        
        <motion.text x={200} y={190} fill={strokeColor} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={textAnim(6.0)}>
          All are <strong>congruent</strong> to the pre-image!
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function RigidMotionsSlide1() {
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
      id: 'rigid-motions-intro-quiz',
      conceptId: 'rigid-motions-intro',
      conceptName: 'Rigid Motions Introduction',
      type: 'judging',
      description: 'Testing understanding of rigid motions and congruence'
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
      id: 'rigid-motions-intro-q1',
      question: 'What is the formal definition of "congruent figures"?',
      options: [
        "They have the same area.",
        "One figure can be mapped onto the other using rigid motions.",
        "They have the same angles, but can be different sizes.",
        "They are both polygons."
      ],
      correctAnswer: "One figure can be mapped onto the other using rigid motions.",
      explanation: "Correct! This is the formal definition. The criteria (SSS, SAS, etc.) are just shortcuts for proving this is possible."
    },
    {
      id: 'rigid-motions-intro-q2',
      question: 'Which of these is NOT a rigid motion?',
      options: [
        "Translation (slide)",
        "Rotation (turn)",
        "Dilation (resize)",
        "Reflection (flip)"
      ],
      correctAnswer: "Dilation (resize)",
      explanation: "Correct! A dilation changes the *size* of a figure, so it is not 'rigid'. It creates a *similar* figure, not a *congruent* one."
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
      interactionId: `rigid-motions-intro-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'rigid-motions-intro',
      conceptName: 'Rigid Motions Introduction',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The Formal Definition of Congruence</h2>
            <p className="text-lg leading-relaxed">
              So far, we've used "same size, same shape" as our definition of congruence. The formal, mathematical definition is based on **transformations**.
            </p>
            <p className="text-lg leading-relaxed mt-4 font-semibold">
              Two figures are <strong>congruent</strong> if and only if one can be mapped onto the other by a sequence of <strong>rigid motions</strong>.
            </p>
          </div>

          {/* --- CARD 2 (The Motions) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">What is a "Rigid Motion"?</h3>
            <p className="text-lg leading-relaxed">
              A rigid motion (also called an **isometry**) is a transformation that "rigidly" moves a figure without changing its size or shape.
            </p>
            <p className="text-lg leading-relaxed mt-3">
              It <strong>preserves distance and angle measure</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-3">
              There are three rigid motions:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>Translation</strong> (a "slide")</li>
              <li><strong>Rotation</strong> (a "turn")</li>
              <li><strong>Reflection</strong> (a "flip")</li>
            </ul>
            <div className="mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900/30">
              <p className="text-lg text-red-700 dark:text-red-300">
                A <strong>Dilation</strong> (a "resize") is <strong>NOT</strong> a rigid motion because it changes the size!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Three Rigid Motions</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <RigidMotionsAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The "pre-image" (blue) is moved, but its size and shape (and thus, its congruence) are preserved.
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
                <div className="text-3xl mb-4">🔄</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've got the definition down!" : 'Great job!'}
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
      slideId="rigid-motions-introduction"
      slideTitle="Introduction to Rigid Motions"
      moduleId="congruence"
      submoduleId="rigid-motions-and-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}