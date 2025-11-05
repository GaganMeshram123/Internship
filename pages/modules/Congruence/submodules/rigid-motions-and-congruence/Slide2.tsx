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
  const color3 = isDarkMode ? '#F87171' : '#EF4444'; // Red

  const triangle = "M 50 150 L 130 50 L 150 150 Z";

  const anim = (delay: number) => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Pre-image */}
        <path d={triangle} fill={color1} opacity="0.5" />
        <text x="55" y="140" fill={color1} fontSize="14">A(50, 150)</text>
        <text x="135" y="140" fill={color1} fontSize="14">C(150, 150)</text>
        <text x="135" y="50" fill={color1} fontSize="14">B(130, 50)</text>
        <text x="90" y="165" fill={color1} fontSize="14">Side = 100</text>
        <path d="M 130 150 A 20 20 0 0 1 150 130" fill="none" stroke={color1} strokeWidth="2" />
        <text x="105" y="125" fill={color1} fontSize="14">Angle C</text>

        {/* Reflection (Image) */}
        <motion.path 
          d={triangle} 
          fill={color2} 
          opacity="0.7"
          initial={{ x: 0, scaleX: 1, transformOrigin: "150px 150px" }}
          animate={{ x: 100, scaleX: -1 }}
          transition={{ delay: 1.0, duration: 1 }}
          variants={anim(1.0)}
        />
        <motion.text x="255" y="140" fill={color2} fontSize="14" initial="hidden" animate="visible" variants={anim(2.0)}>A'</motion.text>
        <motion.text x="155" y="140" fill={color2} fontSize="14" initial="hidden" animate="visible" variants={anim(2.0)}>C'</motion.text>
        <motion.text x="175" y="50" fill={color2} fontSize="14" initial="hidden" animate="visible" variants={anim(2.0)}>B'</motion.text>
        <motion.text x="190" y="165" fill={color2} fontSize="14" initial="hidden" animate="visible" variants={anim(2.0)}>Side = 100</motion.text>
        <motion.path d="M 170 150 A 20 20 0 0 0 150 130" fill="none" stroke={color2} strokeWidth="2" initial="hidden" animate="visible" variants={anim(2.0)} />
        <motion.text x="195" y="125" fill={color2} fontSize="14" initial="hidden" animate="visible" variants={anim(2.0)}>Angle C'</motion.text>
        
        {/* Property labels */}
        <motion.text x="200" y="200" fill={isDarkMode ? '#E2E8F0' : '#4A5568'} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={anim(2.5)}>
          <strong>Distances</strong> and <strong>Angles</strong> are preserved!
        </motion.text>
        <motion.text x="200" y="20" fill={color3} fontSize="14" textAnchor="middle"
          initial="hidden" animate="visible" variants={anim(3.0)}>
          But <strong>Orientation</strong> is reversed (flipped).
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function RigidMotionsSlide2() {
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
      id: 'rigid-motions-properties-quiz',
      conceptId: 'rigid-motions-properties',
      conceptName: 'Properties of Rigid Motions',
      type: 'judging',
      description: 'Testing understanding of what rigid motions preserve'
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
      id: 'rigid-motions-prop-q1',
      question: 'What does it mean for a transformation to "preserve distance"?',
      options: [
        "The figure gets bigger.",
        "The figure moves far away.",
        "The lengths of line segments in the figure do not change.",
        "The figure's area is preserved, but not its shape."
      ],
      correctAnswer: "The lengths of line segments in the figure do not change.",
      explanation: "Correct! 'Preserving distance' means a line segment in the pre-image will have the exact same length in the image."
    },
    {
      id: 'rigid-motions-prop-q2',
      question: 'Which two rigid motions preserve "orientation" (which way it faces)?',
      options: [
        "Rotation and Reflection",
        "Translation and Dilation",
        "Translation and Rotation",
        "Reflection and Translation"
      ],
      correctAnswer: "Translation and Rotation",
      explanation: "Correct! A Translation (slide) and a Rotation (turn) do not 'flip' the figure, so they preserve orientation. A Reflection (flip) reverses the orientation."
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
      interactionId: `rigid-motions-prop-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'rigid-motions-properties',
      conceptName: 'Properties of Rigid Motions',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Key Properties</h2>
            <p className="text-lg leading-relaxed">
              Rigid motions have two main properties that make them the basis for congruence:
            </p>
            <ul className="list-disc list-inside mt-4 text-lg space-y-2">
              <li>
                <strong>Preservation of Distance:</strong> The length of any line segment in the pre-image is equal to the length of the corresponding segment in the image. (Side lengths don't change).
              </li>
              <li>
                <strong>Preservation of Angle Measure:</strong> The measure of any angle in the pre-image is equal to the measure of the corresponding angle in the image. (Angles don't change).
              </li>
            </ul>
          </div>

          {/* --- CARD 2 (Other Properties) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Other Properties</h3>
            <p className="text-lg leading-relaxed">
              Because they preserve distance and angles, rigid motions also preserve:
            </p>
            <ul className="list-disc list-inside mt-2 text-lg space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>Collinearity:</strong> If points are on a line, their images will also be on a line.</li>
              <li><strong>Betweenness:</strong> If $B$ is between $A$ and $C$, its image $B'$ will be between $A'$ and $C'$.</li>
              <li><strong>Parallelism:</strong> If two lines are parallel, their images will also be parallel.</li>
            </ul>
             <div className="mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900/30">
              <p className="text-lg text-red-700 dark:text-red-300">
                <strong>The One Exception: Orientation!</strong>
              </p>
              <p className="text-lg text-red-700 dark:text-red-300 mt-2">
                A <strong>Reflection</strong> (flip) *reverses* the orientation (clockwise vs. counter-clockwise order) of the vertices. Translations and Rotations preserve orientation.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Preserving Properties</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <PropertiesAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The blue pre-image is reflected to the green image. Notice the side lengths and angles match, but the orientation is flipped.
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
                <div className="text-3xl mb-4">📐📏</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You know what is preserved!" : 'Great job!'}
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
      slideId="rigid-motions-properties"
      slideTitle="Properties of Rigid Motions"
      moduleId="congruence"
      submoduleId="rigid-motions-and-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}