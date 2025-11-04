import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const MappingAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue (Start)
  const color2 = isDarkMode ? '#FDE047' : '#EAB308'; // Yellow (Intermediate)
  const color3 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green (End)

  // 'F' shape polygon points
  const fShape = "M 50 50 L 100 50 L 100 80 L 80 80 L 80 110 L 100 110 L 100 140 L 50 140 Z";

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* 1. Pre-image (Start) */}
        <motion.path 
          d={fShape} 
          fill={color1} 
          opacity="0.7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
        />
        <motion.text x="60" y="160" fill={color1} fontSize="14"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
          1. Pre-Image
        </motion.text>

        {/* 2. Translation (Intermediate) */}
        <motion.path 
          d={fShape} 
          fill={color2} 
          opacity="0.5"
          initial={{ x: 0 }}
          animate={{ x: 150 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        />
        <motion.text x="210" y="160" fill={color2} fontSize="14"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
          2. Translate
        </motion.text>

        {/* 3. Reflection (Final Image) */}
        <motion.path 
          d={fShape} 
          fill={color3} 
          opacity="0.7"
          initial={{ x: 150, scaleX: 1, transformOrigin: "200px 50px" }}
          animate={{ scaleX: -1 }}
          transition={{ delay: 3.5, duration: 1.5 }}
        />
        <motion.text x="260" y="160" fill={color3} fontSize="14"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.0 }}>
          3. Reflect (Image)
        </motion.text>
        
        <motion.text x={200} y="190" fill={isDarkMode ? '#E2E8F0' : '#4A5568'} fontSize="14" textAnchor="middle"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.0 }}>
          Pre-Image is <strong>congruent</strong> to the final Image.
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function RigidMotionsSlide3() {
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
      id: 'rigid-motions-mapping-quiz',
      conceptId: 'rigid-motions-mapping',
      conceptName: 'Mapping Polygons',
      type: 'judging',
      description: 'Testing identification of congruent figures by mapping'
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
      id: 'rigid-motions-map-q1',
      question: 'If $\triangle ABC$ can be mapped onto $\triangle XYZ$ by a reflection followed by a translation, what must be true?',
      options: [
        "$\triangle ABC$ is similar to $\triangle XYZ$.",
        "$\triangle ABC$ is congruent to $\triangle XYZ$.",
        "$\triangle ABC$ is larger than $\triangle XYZ$.",
        "$\triangle ABC$ and $\triangle XYZ$ are not related."
      ],
      correctAnswer: "$\triangle ABC$ is congruent to $\triangle XYZ$.",
      explanation: "Correct! Since both reflections and translations are rigid motions, they preserve size and shape. Therefore, the triangles must be congruent."
    },
    {
      id: 'rigid-motions-map-q2',
      question: 'A pre-image is mapped to an image using a translation, a rotation, and then a dilation with a scale factor of 2. Is the image congruent to the pre-image?',
      options: [
        "Yes, because it used rigid motions.",
        "No, because a dilation is not a rigid motion.",
        "Yes, because it used three transformations.",
        "Only if it's a right triangle."
      ],
      correctAnswer: "No, because a dilation is not a rigid motion.",
      explanation: "Correct! The sequence included a dilation, which changes the size. Since the size is different, the image is *not* congruent to the pre-image."
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
      interactionId: `rigid-motions-map-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'rigid-motions-mapping',
      conceptName: 'Mapping Polygons',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What Does "Map Onto" Mean?</h2>
            <p className="text-lg leading-relaxed">
              "Mapping" is the verb for a transformation. We **map** a pre-image **onto** an image.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              If you can find *any sequence* of rigid motions (translations, rotations, and/or reflections) that moves the pre-image to fit *perfectly* on top of the image, then the two figures are **congruent**.
            </p>
          </div>

          {/* --- CARD 2 (The Sequence) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">A Sequence of Motions</h3>
            <p className="text-lg leading-relaxed">
              You can (and often must) use more than one motion.
            </p>
            <p className="text-lg leading-relaxed mt-3">
              As the animation shows, to map the blue 'F' onto the green 'F', we need a sequence:
            </p>
            <ol className="list-decimal list-inside mt-2 text-lg space-y-1 text-slate-700 dark:text-slate-300">
              <li>First, <strong>Translate (slide)</strong> the figure to the right.</li>
              <li>Then, <strong>Reflect (flip)</strong> the figure over a vertical line.</li>
            </ol>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                Since we only used rigid motions, we have *proven* that the blue 'F' is congruent to the green 'F'.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Mapping by a Sequence</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <MappingAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              This mapping (Translate then Reflect) proves congruence.
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
                  {score === questions.length ? "You understand mapping!" : 'Great job!'}
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
      slideId="rigid-motions-mapping"
      slideTitle="Identifying Polygons That Map to Each Other"
      moduleId="congruence"
      submoduleId="rigid-motions-and-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}