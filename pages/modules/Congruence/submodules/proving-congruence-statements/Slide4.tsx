import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const CpctcProofAnimation: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 250; // Made taller for the 5th step
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#CBD5E1' : '#A0AEC0';
  const textColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const givenColor = isDarkMode ? '#F87171' : '#EF4444'; // Red
  const hiddenColor = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const triangleColor = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const proveColor = isDarkMode ? '#A78BFA' : '#8B5CF6'; // Purple (CPCTC step)
  
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
        <motion.line x1="200" y1="10" x2="200" y2={240} stroke={strokeColor} strokeWidth="2"
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
        
        {/* Step 4 (Triangle Congruence) */}
        <motion.line x1="10" y1="145" x2="390" y2="145" stroke={strokeColor} strokeWidth="1.5"
          initial="hidden" animate="visible" variants={itemAnim(3.1)} />
        <motion.text x={20} y={170} fill={triangleColor} fontSize="14" fontFamily="monospace" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(3.3)}>
          4. $\triangle ABD \cong \triangle CBD$
        </motion.text>
        <motion.text x={220} y={170} fill={triangleColor} fontSize="14" fontFamily="monospace" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(3.5)}>
          4. SAS (from 1, 2, 3)
        </motion.text>
        
        {/* Step 5 (CPCTC) */}
        <motion.line x1="10" y1="185" x2="390" y2="185" stroke={strokeColor} strokeWidth="1.5"
          initial="hidden" animate="visible" variants={itemAnim(4.0)} />
      {/*   <motion.text x={20} y={210} fill={proveColor} fontSize="14" fontFamily="monospace" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(4.2)}>
          5. $\overline{AD} \cong \overline{CD}$
        </motion.text> */}
        <motion.text x={220} y={210} fill={proveColor} fontSize="14" fontFamily="monospace" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(4.4)}>
          5. CPCTC
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function ProvingSlide4() {
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
      id: 'proving-cpctc-quiz',
      conceptId: 'proving-cpctc',
      conceptName: 'CPCTC',
      type: 'judging',
      description: 'Testing understanding of CPCTC'
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
      id: 'proving-cpctc-q1',
      question: 'What does the acronym "CPCTC" stand for?',
      options: [
        "Congruent Parts of Congruent Triangles are Congruent",
        "Corresponding Parts of Congruent Triangles are Congruent",
        "Congruent Polygons are Congruent Triangles",
        "Corresponding Parts of Corresponding Triangles are Congruent"
      ],
      correctAnswer: "Corresponding Parts of Congruent Triangles are Congruent",
      explanation: "Correct! This is the full name for this very important theorem."
    },
    {
      id: 'proving-cpctc-q2',
      question: 'In a proof, when is it valid to use "CPCTC" as a reason?',
      options: [
        "As the very first step, to state your 'Given'.",
        "At any time you want to prove two parts are equal.",
        "Only *after* you have already proven that the triangles are congruent.",
        "Only for sides, not for angles."
      ],
      correctAnswer: "Only *after* you have already proven that the triangles are congruent.",
      explanation: "Correct! This is the most important rule. You *must* prove the triangles are congruent first (using SSS, SAS, etc.). CPCTC is the reason you use for *all the steps that come after*."
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
      interactionId: `proving-cpctc-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-cpctc',
      conceptName: 'CPCTC',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The "Why" of Proofs: CPCTC</h2>
            <p className="text-lg leading-relaxed">
              You've proven two triangles are congruent. So what?
            </p>
            <p className="text-lg leading-relaxed mt-4">
              The main reason we do this is to then prove that their *other parts* are congruent. The reason we use is <strong>CPCTC</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4 font-semibold text-blue-600 dark:text-blue-400">
              <strong>C</strong>orresponding
              <strong>P</strong>arts of
              <strong>C</strong>ongruent
              <strong>T</strong>riangles are
              <strong>C</strong>ongruent.
            </p>
          </div>

          {/* --- CARD 2 (The 2-Step Process) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The 2-Step Proof Process</h3>
            <p className="text-lg leading-relaxed">
              Almost every congruence proof follows this pattern:
            </p>
            <ol className="list-decimal list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>Prove Triangles Congruent:</strong>
                <br/>Use your "Givens" and "Hidden Clues" to prove $\triangle ABC \cong \triangle DEF$ by SSS, SAS, ASA, AAS, or HL.
              </li>
              <li>
                <strong>Use CPCTC:</strong>
                <br/>Now that the triangles are congruent, you can state that *any* of their corresponding parts are congruent. The reason is "CPCTC".
              </li>
            </ol>
             <div className="mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900/30">
              <p className="text-lg text-red-700 dark:text-red-300">
                <strong>CRITICAL RULE:</strong> You can <strong>NEVER</strong> use CPCTC as a reason *until after* you have already proven the triangles are congruent.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Final Step</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <CpctcProofAnimation />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              We first prove the triangles congruent (Step 4, by SAS), *then* we can use CPCTC (Step 5).
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
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered the most important part of proofs!" : 'Great job!'}
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
      slideId="proving-cpctc"
      slideTitle="CPCTC"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}