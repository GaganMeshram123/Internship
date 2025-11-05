import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const TwoColumnProofAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#CBD5E1' : '#A0AEC0';
  const textColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const givenColor = isDarkMode ? '#F87171' : '#EF4444'; // Red
  const hiddenColor = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const proveColor = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  
  const itemAnim = (delay: number) => ({
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { delay: delay } },
  });

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Headers */}
        <motion.text x={100} y={30} fill={textColor} fontSize="18" textAnchor="middle" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(0.5)}>
          Statements
        </motion.text>
        <motion.text x={300} y={30} fill={textColor} fontSize="18" textAnchor="middle" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(0.5)}>
          Reasons
        </motion.text>
        <motion.line x1="200" y1="10" x2="200" y2={210} stroke={strokeColor} strokeWidth="2"
          initial="hidden" animate="visible" variants={itemAnim(0.5)} />
        <motion.line x1="10" y1="45" x2="390" y2="45" stroke={strokeColor} strokeWidth="2"
          initial="hidden" animate="visible" variants={itemAnim(0.5)} />
          
        {/* Step 1 (Given) */}
        <motion.text x={20} y={70} fill={givenColor} fontSize="14" fontFamily="monospace"
          initial="hidden" animate="visible" variants={itemAnim(1.0)}>
          1. $AB \cong CB$ (S)
        </motion.text>
        <motion.text x={220} y={70} fill={givenColor} fontSize="14" fontFamily="monospace"
          initial="hidden" animate="visible" variants={itemAnim(1.2)}>
          1. Given
        </motion.text>
        
        {/* Step 2 (Given) */}
        <motion.text x={20} y={100} fill={givenColor} fontSize="14" fontFamily="monospace"
          initial="hidden" animate="visible" variants={itemAnim(1.7)}>
          2. $\angle ABD \cong \angle CBD$ (A)
        </motion.text>
        <motion.text x={220} y={100} fill={givenColor} fontSize="14" fontFamily="monospace"
          initial="hidden" animate="visible" variants={itemAnim(1.9)}>
          2. Given
        </motion.text>
        
        {/* Step 3 (Reflexive) */}
        <motion.text x={20} y={130} fill={hiddenColor} fontSize="14" fontFamily="monospace"
          initial="hidden" animate="visible" variants={itemAnim(2.4)}>
          3. $BD \cong BD$ (S)
        </motion.text>
        <motion.text x={220} y={130} fill={hiddenColor} fontSize="14" fontFamily="monospace"
          initial="hidden" animate="visible" variants={itemAnim(2.6)}>
          3. Reflexive Property
        </motion.text>
        
        {/* Step 4 (Conclusion) */}
        <motion.line x1="10" y1="145" x2="390" y2="145" stroke={strokeColor} strokeWidth="1.5"
          initial="hidden" animate="visible" variants={itemAnim(3.1)} />
        <motion.text x={20} y={170} fill={proveColor} fontSize="14" fontFamily="monospace" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(3.3)}>
          4. $\triangle ABD \cong \triangle CBD$
        </motion.text>
        <motion.text x={220} y={170} fill={proveColor} fontSize="14" fontFamily="monospace" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(3.5)}>
          4. SAS (from 1, 2, 3)
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function ProvingSlide3() {
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
      id: 'proving-two-column-quiz',
      conceptId: 'proving-two-column',
      conceptName: 'Two-Column Proofs',
      type: 'judging',
      description: 'Testing understanding of two-column proof structure'
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
      id: 'proving-two-column-q1',
      question: 'In a two-column proof, what is the "Reason" for the statement $\overline{BD} \cong \overline{BD}$?',
      options: [
        "Given",
        "Reflexive Property of Congruence",
        "Symmetric Property of Congruence",
        "Definition of Midpoint"
      ],
      correctAnswer: "Reflexive Property of Congruence",
      explanation: "Correct! When a part is shared by two triangles, the reason it is congruent to itself is the Reflexive Property."
    },
    {
      id: 'proving-two-column-q2',
      question: 'The final "Reason" in this proof is "SAS". This reason refers to which previous steps?',
      options: [
        "Just step 1 (Side)",
        "Just step 2 (Angle)",
        "Steps 1, 2, and 3 (Side, Angle, Side)",
        "There is no reason for the last step."
      ],
      correctAnswer: "Steps 1, 2, and 3 (Side, Angle, Side)",
      explanation: "Correct! The final step is a conclusion based on all the evidence you've gathered. Steps 1, 2, and 3 give you the S, A, and S needed to conclude SAS."
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
      interactionId: `proving-two-column-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-two-column',
      conceptName: 'Two-Column Proofs',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The Two-Column Format</h2>
            <p className="text-lg leading-relaxed">
              The "paragraph proof" from the last slide is good for thinking, but most geometry classes use the **two-column proof**.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              It's a more organized way to show the exact same logic.
            </p>
            <ul className="list-disc list-inside mt-4 text-lg space-y-2">
              <li>
                <strong>Left Column (Statements):</strong> What you know. This is the step-by-step path of your logic.
              </li>
              <li>
                <strong>Right Column (Reasons):</strong> Why you know it. This is the definition, postulate, or "Given" that justifies each statement.
              </li>
            </ul>
          </div>

          {/* --- CARD 2 (The Logic) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Proof-Building Strategy</h3>
            <p className="text-lg leading-relaxed">
              Always follow this order:
            </p>
            <ol className="list-decimal list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>List all your **Givens** first.</li>
              <li>Look for **Hidden Clues** (Reflexive Side, Vertical Angles, etc.) and add them.</li>
              <li>Mark each S, A, or R (for Right Angle) as you find it.</li>
              <li>Once you have a full criterion (like SSS, SAS, etc.), state that the **triangles are congruent**.</li>
              <li>The "Reason" is the criterion you found (e.g., "SAS Postulate").</li>
            </ol>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Our Proof in Two Columns</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <TwoColumnProofAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              This is the same logic as the paragraph proof, just organized in a table.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Check Your Reasons</h3>
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
                <div className="text-3xl mb-4">🏛️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You're a logical thinker!" : 'Great job!'}
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
      slideId="proving-two-column"
      slideTitle="Stating the Full Proof Using the Two-Column Format"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}