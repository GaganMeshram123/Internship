import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- SSA AMBIGUITY ANIMATION COMPONENT ---
const SsaAmbiguityAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 240; // Increased height
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const givenColor = isDarkMode ? '#F87171' : '#EF4444'; // Red
  const ambiguousColor = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const angleBlue = isDarkMode ? '#60A5FA' : '#2563EB';
  
  const commonProps = { fill: 'none', strokeWidth: 2 };

  // Points from image_b3c836.png
  const K = { x: 200, y: 50 };
  const L = { x: 130, y: 180 };
  const M1 = { x: 270, y: 180 };
  const M2 = { x: 183, y: 125 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`50 0 ${svgWidth} ${svgHeight}`}>
        {/* Base line */}
        <line x1={L.x - 20} y1={L.y} x2={M1.x + 20} y2={M1.y} stroke={strokeColor} strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Given Angle K and Side KL */}
        <text x={K.x} y={K.y - 10} fill={strokeColor} textAnchor="middle">K</text>
        <text x={L.x - 15} y={L.y + 5} fill={strokeColor}>L</text>
        <path d={`M ${K.x - 8} ${K.y + 13} A 15 15 0 0 1 ${K.x + 8} ${K.y + 13}`} stroke={angleBlue} {...commonProps} />
        <path d={`M ${K.x} ${K.y} L ${L.x} ${L.y}`} stroke={strokeColor} {...commonProps} />
        <line x1={160} y1={110} x2={170} y2={115} stroke={strokeColor} strokeWidth="2" /> {/* KL hash */}

        {/* Swinging side LM */}
        <motion.path
          d={`M ${L.x} ${L.y} L ${M1.x} ${M1.y}`}
          stroke={ambiguousColor}
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        <text x={M1.x + 5} y={M1.y + 5} fill={ambiguousColor}>M₁</text>
        {/* Markings for LM1 */}
        <line x1={195} y1={180} x2={205} y2={180} stroke={ambiguousColor} strokeWidth="2" />
        <line x1={198} y1={177} x2={208} y2={183} stroke={ambiguousColor} strokeWidth="2" />
        
        <motion.path
          d={`M ${L.x} ${L.y} L ${M2.x} ${M2.y}`}
          stroke={ambiguousColor}
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        />
        <text x={M2.x + 5} y={M2.y} fill={ambiguousColor}>M₂</text>
        {/* Markings for LM2 */}
        <line x1={154} y1={150} x2={164} y2={153} stroke={ambiguousColor} strokeWidth="2" />
        <line x1={157} y1={147} x2={167} y2={150} stroke={ambiguousColor} strokeWidth="2" />

        {/* The two possible bases */}
        <motion.path
          d={`M ${K.x} ${K.y} L ${M1.x} ${M1.y}`}
          stroke={strokeColor}
          {...commonProps}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        <motion.path
          d={`M ${K.x} ${K.y} L ${M2.x} ${M2.y}`}
          stroke={strokeColor}
          {...commonProps}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        />
        
        <motion.text 
          x={200} y={220} 
          fill={ambiguousColor} 
          fontSize="14" 
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Two possible triangles: ΔKLM₁ and ΔKLM₂
        </motion.text>
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
      explanation: "Correct! As the diagram shows, the non-included side can 'swing' to create two different valid triangles (ΔKLM₁ and ΔKLM₂), so SSA is ambiguous."
    },
    {
      id: 'combining-no-ssa-q2',
      question: 'What is the ONE special exception where the SSA pattern *does* work?',
      options: [
        "When the triangle is isosceles",
        "When all sides are equal",
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

        {/* Left Column - Content (UPDATED) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            
            <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Why Is There No SSA Criterion?</h2>
            <p className="text-lg leading-relaxed mb-4">
              The SAS congruence criterion states that if two triangles have two pairs of congruent sides and the <i>included</i> angles are also congruent, the triangles are congruent.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Why, then, is there no SSA congruence criterion? In other words, if two triangles have two pairs of congruent sides and a pair of congruent <i>non-included</i> angles, why is this not enough to conclude that they're congruent?
            </p>
            <p className="text-lg leading-relaxed mb-4">
              To understand why, we'll construct two triangles that are <strong>not congruent</strong> yet have two pairs of congruent sides and a pair of congruent, non-included angles.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">The "Swinging Side"</h3>
            
            <p className="text-lg leading-relaxed">
              Consider ΔABC. Let's create another triangle ΔKLM such that $AB \cong KL$, $BC \cong LM$, and $∠A \cong ∠K$. This is an SSA setup.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              We draw the congruent angle at K and the segment $KL$.
            </p>
             <p className="text-lg leading-relaxed mt-2">
              Now, here's the key point. There are <strong>two possible ways</strong> to pick the third vertex: $M_1$ and $M_2$, as shown in the animation.
            </p>
            
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-lg leading-relaxed">
                Clearly,
              </p>
              <ul className="list-disc list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
                <li>
                  <strong>ΔKLM₁</strong> is congruent to <strong>ΔABC</strong>.
                </li>
                <li>
                  <strong>ΔKLM₂</strong> is <strong>not congruent</strong> to <strong>ΔABC</strong>.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Ambiguous Case</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <SsaAmbiguityAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The same S-S-A information (blue angle, 1-hash side, 2-hash side) can create two different triangles.
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