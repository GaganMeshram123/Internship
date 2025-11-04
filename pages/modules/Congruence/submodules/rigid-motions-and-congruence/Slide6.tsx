import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const FurtherPropertiesAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const color2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  
  // Parallelogram
  const preImage = "M 50 100 L 100 50 L 200 50 L 150 100 Z";
  
  // Translated image
  const image = "M 200 120 L 250 70 L 350 70 L 300 120 Z";

  const anim = (delay: number) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Pre-image */}
        <motion.path d={preImage} fill={color1} opacity="0.7" initial="hidden" animate="visible" variants={anim(0.5)} />
        <motion.line x1="100" y1="50" x2="200" y2="50" stroke={color1} strokeWidth="3" initial="hidden" animate="visible" variants={anim(1.0)} />
        <motion.line x1="50" y1="100" x2="150" y2="100" stroke={color1} strokeWidth="3" initial="hidden" animate="visible" variants={anim(1.0)} />
        <motion.text x="125" y="45" fill={color1} fontSize="12" initial="hidden" animate="visible" variants={anim(1.5)}>
          Parallel
        </motion.text>

        {/* Image */}
        <motion.path d={image} fill={color2} opacity="0.7" initial="hidden" animate="visible" variants={anim(2.0)} />
        <motion.line x1="250" y1="70" x2="350" y2="70" stroke={color2} strokeWidth="3" initial="hidden" animate="visible" variants={anim(2.5)} />
        <motion.line x1="200" y1="120" x2="300" y2="120" stroke={color2} strokeWidth="3" initial="hidden" animate="visible" variants={anim(2.5)} />
        <motion.text x="275" y="65" fill={color2} fontSize="12" initial="hidden" animate="visible" variants={anim(3.0)}>
          Still Parallel!
        </motion.text>
        
        <motion.text x={200} y={180} fill={isDarkMode ? '#E2E8F0' : '#4A5568'} fontSize="16" textAnchor="middle"
          initial="hidden" animate="visible" variants={anim(3.5)}>
          Rigid motions preserve <strong>parallelism</strong>.
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function RigidMotionsSlide6() {
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
      id: 'rigid-motions-further-props-quiz',
      conceptId: 'rigid-motions-further-properties',
      conceptName: 'Further Properties',
      type: 'judging',
      description: 'Testing understanding of further preserved properties'
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
      id: 'rigid-motions-further-q1',
      question: 'If $\triangle ABC$ is reflected to create $\triangle A\'B\'C\'$, and $m\angle A = 30°$, what is $m\angle A\'$?',
      options: [
        "30°",
        "-30°",
        "60°",
        "Cannot be determined"
      ],
      correctAnswer: "30°",
      explanation: "Correct! All rigid motions, including reflections, *preserve angle measure*. Therefore, $m\angle A = m\angle A\'$."
    },
    {
      id: 'rigid-motions-further-q2',
      question: 'Line $m$ is parallel to line $n$. If both lines are rotated 90°, what is true about their images, $m\'$ and $n\'$?',
      options: [
        "$m\'$ and $n\'$ are now perpendicular.",
        "$m\'$ and $n\'$ are still parallel.",
        "$m\'$ and $n\'$ will intersect, but are not perpendicular.",
        "This is impossible to know."
      ],
      correctAnswer: "$m\'$ and $n\'$ are still parallel.",
      explanation: "Correct! Rigid motions *preserve parallelism*. If two lines are parallel, their images after *any* rigid motion (or sequence) will also be parallel."
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
      interactionId: `rigid-motions-further-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'rigid-motions-further-properties',
      conceptName: 'Further Properties',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What Else is Preserved?</h2>
            <p className="text-lg leading-relaxed">
              Because rigid motions preserve **distance** and **angle measure**, they also preserve almost every other geometric property you can think of.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              This is the "common sense" part of rigid motions. If you move a shape, it's still the same shape.
            </p>
          </div>

          {/* --- CARD 2 (The Properties) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Properties Preserved by All Rigid Motions</h3>
            <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Distance (Length):</strong> $AB = A'B'$
              </li>
               <li>
                <strong>Angle Measure:</strong> $m\angle A = m\angle A'$
              </li>
              <li>
                <strong>Parallelism:</strong> If $m \parallel n$, then $m' \parallel n'$. (See animation)
              </li>
              <li>
                <strong>Perpendicularity:</strong> If $m \perp n$, then $m' \perp n'$.
              </li>
              <li>
                <strong>Collinearity:</strong> Points on a line stay on a line.
              </li>
               <li>
                <strong>Area & Perimeter:</strong> Since lengths and angles are preserved, so are area and perimeter.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Preserving Parallelism</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <FurtherPropertiesAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The blue parallelogram is translated. The image's opposite sides are still parallel, just like the pre-image's.
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
                <div className="text-3xl mb-4">✅</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered the properties!" : 'Great job!'}
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
      slideId="rigid-motions-further-properties"
      slideTitle="Further Properties of Rigid Motions"
      moduleId="congruence"
      submoduleId="rigid-motions-and-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}