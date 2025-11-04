import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- SSA AMBIGUITY ANIMATION COMPONENT ---
const SsaAmbiguityAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const givenColor = isDarkMode ? '#F87171' : '#EF4444'; // Red
  const ambiguousColor = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  
  const A = { x: 50, y: 180 };
  const B = { x: 200, y: 50 };
  
  // Side 1 (Given)
  const S1_Length = Math.hypot(B.x - A.x, B.y - A.y); // approx 198
  
  // Angle A (Given)
  const angleA_rad = Math.atan2(B.y - A.y, B.x - A.x); // approx -0.92 rad
  
  // Side 2 (The swinging, ambiguous side)
  const S2_Length = 160;
  
  // Calculate the two intersection points
  const C1_x = 300;
  const C2_x = 96.5;
  const C_y = 180;

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Base line */}
        <line x1="0" y1={C_y} x2={svgWidth} y2={C_y} stroke={strokeColor} strokeWidth="2" />
        
        {/* Angle A and Vertex A */}
        <circle cx={A.x} cy={A.y} r="4" fill={givenColor} />
        <text x={A.x - 15} y={A.y + 15} fill={givenColor} fontSize="14">A</text>
        <path d={`M ${A.x + 20} ${A.y} A 20 20 0 0 0 ${A.x + 18} ${A.y - 9}`} fill="none" stroke={givenColor} strokeWidth="2" />
        <text x={A.x + 30} y={A.y - 15} fill={givenColor} fontSize="16" fontWeight="bold">A</text>

        {/* Side 1 (AB) */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={givenColor} strokeWidth="4" />
        <text x={B.x + 5} y={B.y - 5} fill={givenColor} fontSize="14">B</text>
        <text x={(A.x + B.x) / 2 - 20} y={(A.y + B.y) / 2} fill={givenColor} fontSize="16" fontWeight="bold">S</text>

        {/* Side 2 (Swinging side) - Arc */}
        <motion.path
          d={`M ${B.x} ${B.y} L ${B.x + S2_Length * Math.cos(Math.PI / 2)} ${B.y + S2_Length * Math.sin(Math.PI / 2)}`}
          style={{ transformOrigin: `${B.x}px ${B.y}px` }}
          initial={{ rotate: -15 }}
          animate={{ rotate: 33 }}
          transition={{ 
            duration: 2, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
          stroke={ambiguousColor}
          strokeWidth="4"
          strokeDasharray="6 6"
        />
        <text x={B.x + 70} y={B.y + 70} fill={ambiguousColor} fontSize="16" fontWeight="bold">S</text>

        {/* Triangle 1 (Obtuse) */}
        <line x1={B.x} y1={B.y} x2={C2_x} y2={C_y} stroke={ambiguousColor} strokeWidth="2" />
        <line x1={A.x} y1={A.y} x2={C2_x} y2={C_y} stroke={strokeColor} strokeWidth="2" />
        <text x={C2_x - 10} y={C_y + 15} fill={ambiguousColor} fontSize="14">C1</text>
        
        {/* Triangle 2 (Acute) */}
        <line x1={B.x} y1={B.y} x2={C1_x} y2={C_y} stroke={ambiguousColor} strokeWidth="2" />
        <line x1={A.x} y1={A.y} x2={C1_x} y2={C_y} stroke={strokeColor} strokeWidth="2" />
        <text x={C1_x + 5} y={C_y + 15} fill={ambiguousColor} fontSize="14">C2</text>
        
        <text x={svgWidth / 2} y={20} fill={ambiguousColor} fontSize="14" textAnchor="middle">
          The "swinging" side can form two different triangles!
        </text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function CombiningSlide5() {
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
      id: 'combining-no-ssa-quiz',
      conceptId: 'combining-criteria-no-ssa',
      conceptName: 'Why No SSA',
      type: 'judging',
      description: 'Testing understanding of why SSA fails'
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
      id: 'combining-no-ssa-q1',
      question: 'Why is SSA not a valid congruence criterion?',
      options: [
        "It is too difficult to measure the non-included angle.",
        "It can create two different possible triangles (the ambiguous case).",
        "It only works for isosceles triangles.",
        "It is the same as SSS."
      ],
      correctAnswer: "It can create two different possible triangles (the ambiguous case).",
      explanation: "Correct! As the animation shows, the non-included side can 'swing' to create two different valid triangles, so SSA is ambiguous."
    },
    {
      id: 'combining-no-ssa-q2',
      question: 'What is the ONE special exception where the SSA pattern *does* work?',
      options: [
        "When the triangle is isosceles (ASS)",
        "When all sides are equal (SSS)",
        "When the angle is obtuse",
        "When the angle is a right angle (HL)"
      ],
      correctAnswer: "When the angle is a right angle (HL)",
      explanation: "Correct! The Hypotenuse-Leg (HL) criterion is a special case of SSA that only works because the 90° angle locks the 'swinging' side into one unique position."
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
      interactionId: `combining-no-ssa-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'combining-criteria-no-ssa',
      conceptName: 'Why No SSA',
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
            <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">The Impostor: Why SSA Fails</h2>
            <p className="text-lg leading-relaxed">
              We've saved the biggest trap for last: <strong>SSA (Side-Side-Angle)</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              This criterion does not work because it is **ambiguous**. Given two sides and a *non-included* angle, you can often construct **two entirely different triangles**.
            </p>
          </div>

          {/* --- CARD 2 (The Strategy) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The "Swinging Side"</h3>
            <p className="text-lg leading-relaxed">
              Think of the second side (the one not connected to the angle) as a "swinging gate."
            </p>
            <p className="text-lg leading-relaxed mt-3">
              As the animation shows, this swinging side can often touch the base line in **two different places**, creating one acute triangle and one obtuse triangle.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <p className="text-lg">
                Since SSA can lead to two different triangles, it cannot be used to prove that two triangles are *congruent*.
              </p>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-green-100 dark:bg-green-900/30">
              <p className="text-lg text-green-700 dark:text-green-300">
                <strong>The Only Exception:</strong> The <strong>HL (Hypotenuse-Leg)</strong> criterion is a special type of SSA that *only* works because the 90° angle locks the "swinging" side into one place.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Ambiguous Case</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <SsaAmbiguityAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The same S-S-A information (Red Angle, Red Side, Blue Side) can create $\triangle ABC_1$ and $\triangle ABC_2$.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Final Check</h3>
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
                <div className="text-3xl mb-4">🚫</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered the SSA trap!" : 'Great job!'}
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
      slideId="combining-no-ssa"
      slideTitle="Why Is There No SSA Criterion?"
      moduleId="congruence"
      submoduleId="combining-congruence-criteria"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}