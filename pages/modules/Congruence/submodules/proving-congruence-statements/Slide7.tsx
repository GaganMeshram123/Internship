import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- QUIZ FIGURE COMPONENT DEFINED INSIDE ---
// This component shows a different figure based on the current quiz question
const FullProofFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const givenColor = isDarkMode ? '#F87171' : '#EF4444'; // Red
  const hiddenColor1 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const hiddenColor2 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  
  // Figure: Intersecting transversals between parallel lines
  const T1 = { A: { x: 50, y: 50 }, B: { x: 150, y: 50 }, C: { x: 180, y: 110 } };
  const T2 = { E: { x: 350, y: 170 }, D: { x: 250, y: 170 }, C: { x: 220, y: 110 } };
  // C is the intersection. Let's make C the same point.
  const C_intersect = { x: 200, y: 110 };
  const T1_A = { x: 50, y: 50 };
  const T1_B = { x: 150, y: 50 };
  const T2_E = { x: 350, y: 170 };
  const T2_D = { x: 250, y: 170 };


  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" style={{ minHeight: svgHeight }}>
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        
        {/* Parallel Lines */}
        <line x1="0" y1="50" x2="400" y2="50" stroke={strokeColor} strokeDasharray="4 4" />
        <line x1="0" y1="170" x2="400" y2="170" stroke={strokeColor} strokeDasharray="4 4" />
        
        {/* Transversals */}
        <line x1={T1_A.x} y1={T1_A.y} x2={T2_E.x} y2={T2_E.y} stroke={strokeColor} />
        <line x1={T1_B.x} y1={T1_B.y} x2={T2_D.x} y2={T2_D.y} stroke={strokeColor} />
        
        {/* Labels */}
        <text x={T1_A.x - 20} y={T1_A.y + 5} fill={strokeColor}>A</text>
        <text x={T1_B.x + 10} y={T1_B.y + 5} fill={strokeColor}>B</text>
        <text x={C_intersect.x - 5} y={C_intersect.y + 15} fill={strokeColor}>C</text>
        <text x={T2_D.x - 20} y={T2_D.y + 15} fill={strokeColor}>D</text>
        <text x={T2_E.x + 10} y={T2_E.y + 15} fill={strokeColor}>E</text>
        
        {/* Given: AB || DE */}
        <text x={100} y={40} fill={givenColor} fontSize="12">Given: $AB \parallel DE$</text>

        {/* Given: C is midpoint of AE */}
        <line x1={T1_A.x} y1={T1_A.y} x2={C_intersect.x} y2={C_intersect.y} stroke={givenColor} strokeWidth="4" />
        <line x1={T2_E.x} y1={T2_E.y} x2={C_intersect.x} y2={C_intersect.y} stroke={givenColor} strokeWidth="4" />
        <text x={100} y={90} fill={givenColor} fontSize="12">Given: $C$ is midpoint of $AE$ (S)</text>

        {/* Hidden 1: Vertical Angles */}
        <AnimatePresence>
        {(questionIndex === 0 || questionIndex === 1) && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <path d={`M ${C_intersect.x - 15} ${C_intersect.y - 10} A 20 20 0 0 1 ${C_intersect.x + 2} ${C_intersect.y - 18}`} stroke={hiddenColor1} fill="none" strokeWidth="2" />
            <path d={`M ${C_intersect.x + 15} ${C_intersect.y + 10} A 20 20 0 0 1 ${C_intersect.x - 2} ${C_intersect.y + 18}`} stroke={hiddenColor1} fill="none" strokeWidth="2" />
            <text x={220} y={100} fill={hiddenColor1} fontSize="12">Hidden 1: Vertical $\angle$s (A)</text>
          </motion.g>
        )}
        </AnimatePresence>

        {/* Hidden 2: Alternate Interior Angles */}
        <AnimatePresence>
        {(questionIndex === 0 || questionIndex === 1) && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
            <path d={`M ${T1_A.x + 20} ${T1_A.y} A 20 20 0 0 1 ${T1_A.x + 10} ${T1_A.y + 17}`} stroke={hiddenColor2} fill="none" strokeWidth="2" />
            <path d={`M ${T2_E.x - 20} ${T2_E.y} A 20 20 0 0 0 ${T2_E.x - 10} ${T2_E.y - 17}`} stroke={hiddenColor2} fill="none" strokeWidth="2" />
            <text x={300} y={150} fill={hiddenColor2} fontSize="12">Hidden 2: Alt. Int. $\angle$s (A)</text>
          </motion.g>
        )}
        </AnimatePresence>

      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function ProvingSlide7() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'proving-complete-proof-quiz',
      conceptId: 'proving-complete-proofs',
      conceptName: 'Constructing Complete Proofs',
      type: 'judging',
      description: 'Testing construction of a full proof'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }
  
  const allReasons = ["Given", "Definition of Midpoint", "Vertical Angles are Congruent", "Alternate Interior Angles", "ASA", "CPCTC"];

  const questions: QuizQuestion[] = [
    {
      id: 'proving-complete-q1',
      question: 'Given $AB \parallel DE$ and $C$ is the midpoint of $AE$. What is the reason for $\angle BAC \cong \angle DEC$?',
      options: allReasons,
      correctAnswer: "Alternate Interior Angles",
      explanation: "Correct! The parallel lines form a 'Z' shape with the transversal $AE$, creating congruent alternate interior angles."
    },
    {
      id: 'proving-complete-q2',
      question: 'We also know $AC \cong EC$ (Def. of Midpoint) and $\angle BCA \cong \angle DCE$ (Vertical Angles). Which criterion proves $\triangle BCA \cong \triangle DCE$?',
      options: ["SSS", "SAS", "ASA", "AAS", "HL"],
      correctAnswer: "ASA",
      explanation: "Correct! We have $\angle BAC$ (A), the *included* side $AC$ (S), and $\angle BCA$ (A). This is the ASA criterion."
    },
    {
      id: 'proving-complete-q3',
      question: 'Now that we know $\triangle BCA \cong \triangle DCE$, what is the reason for the final statement, $BC \cong DC$?',
      options: allReasons,
      correctAnswer: "CPCTC",
      explanation: "Correct! *After* proving the triangles are congruent, we use CPCTC (Corresponding Parts of Congruent Triangles are Congruent) to prove their other parts are congruent."
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
      interactionId: `proving-complete-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-complete-proofs',
      conceptName: 'Constructing Complete Proofs',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Constructing a Complete Proof</h2>
            <p className="text-lg leading-relaxed">
              This is the final challenge. Let's combine all our skills to build a complete proof from start to finish.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Look at the diagram. We have to use *multiple* definitions and properties to find all the pieces.
            </p>
          </div>

          {/* --- CARD 2 (The 5-Step Strategy) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The 5-Step Strategy</h3>
            <p className="text-lg leading-relaxed">
              For any proof, follow these steps:
            </p>
            <ol className="list-decimal list-inside mt-2 text-lg space-y-2 text-slate-700 dark:text-slate-300">
              <li>
                <strong>List Givens:</strong>
                <br/>
                $AB \parallel DE$
                <br/>
                $C$ is midpoint of $AE \implies AC \cong EC$ (S)
              </li>
              <li>
                <strong>Find Hidden Clues:</strong>
                <br/>
                $AB \parallel DE \implies \angle A \cong \angle E$ (A) (Alt. Int. Angles)
                <br/>
                $\angle BCA \cong \angle DCE$ (A) (Vertical Angles)
              </li>
              <li>
                <strong>Find Criterion:</strong>
                <br/>
                We have Angle-Side-Angle (ASA).
              </li>
              <li>
                <strong>State $\triangle$ Congruence:</strong>
                <br/>
                $\triangle BCA \cong \triangle DCE$ by ASA.
              </li>
              <li>
                <strong>Use CPCTC:</strong>
                <br/>
                Now we can prove $BC \cong DC$ by CPCTC.
              </li>
            </ol>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Complete the Proof</h3>
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

            {/* --- USE THE QUIZ FIGURE COMPONENT --- */}
            <FullProofFigure questionIndex={currentQuestionIndex} />

            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4 mt-6">{questions[currentQuestionIndex].question}</div>
                {/* --- Answer Options --- */}
                <div className="grid grid-cols-2 gap-3">
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
                          : 'bg-red-50 dark:bg-red-900/3s0 border border-red-200 dark:border-red-700' // Incorrect
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
                <div className="text-3xl mb-4">🏆</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Module Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You have mastered congruence proofs!" : 'Fantastic work!'}
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
      slideId="proving-constructing-complete"
      slideTitle="Constructing Complete Proofs of Congruence Statements"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}