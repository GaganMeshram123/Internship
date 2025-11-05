import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const SimpleProofFigure: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const givenColor = isDarkMode ? '#F87171' : '#EF4444'; // Red
  const hiddenColor = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  
  const itemAnim = (delay: number) => ({
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: delay } },
  });

  // Figure: Two triangles sharing a side
  const Q1 = { A: { x: 50, y: 110 }, B: { x: 200, y: 40 }, C: { x: 350, y: 110 }, D: { x: 200, y: 180 } };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        
        {/* Figure */}
        <motion.path d={`M ${Q1.A.x} ${Q1.A.y} L ${Q1.B.x} ${Q1.B.y} L ${Q1.D.x} ${Q1.D.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2"
          initial="hidden" animate="visible" variants={itemAnim(0.5)} />
        <motion.path d={`M ${Q1.C.x} ${Q1.C.y} L ${Q1.B.x} ${Q1.B.y} L ${Q1.D.x} ${Q1.D.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2"
          initial="hidden" animate="visible" variants={itemAnim(0.5)} />
        
        {/* Labels */}
        <motion.text x={Q1.A.x - 20} y={Q1.A.y} fill={strokeColor} initial="hidden" animate="visible" variants={itemAnim(0.7)}>A</motion.text>
        <motion.text x={Q1.B.x - 5} y={Q1.B.y - 10} fill={strokeColor} initial="hidden" animate="visible" variants={itemAnim(0.7)}>B</motion.text>
        <motion.text x={Q1.C.x + 10} y={Q1.C.y} fill={strokeColor} initial="hidden" animate="visible" variants={itemAnim(0.7)}>C</motion.text>
        <motion.text x={Q1.D.x - 5} y={Q1.D.y + 15} fill={strokeColor} initial="hidden" animate="visible" variants={itemAnim(0.7)}>D</motion.text>

        {/* Givens */}
        <motion.line x1={Q1.A.x} y1={Q1.A.y} x2={Q1.B.x} y2={Q1.B.y} stroke={givenColor} strokeWidth="4"
          initial="hidden" animate="visible" variants={itemAnim(1.0)} />
        <motion.line x1={Q1.C.x} y1={Q1.C.y} x2={Q1.B.x} y2={Q1.B.y} stroke={givenColor} strokeWidth="4"
          initial="hidden" animate="visible" variants={itemAnim(1.0)} />
        <motion.text x={125} y={65} fill={givenColor} fontSize="12" initial="hidden" animate="visible" variants={itemAnim(1.2)}>
          Given: $AB \cong CB$ (S)
        </motion.text>
        
        <motion.path d={`M ${Q1.B.x - 18} ${Q1.B.y + 10} A 20 20 0 0 1 ${Q1.B.x - 5} ${Q1.B.y + 19}`} stroke={givenColor} fill="none" strokeWidth="2"
          initial="hidden" animate="visible" variants={itemAnim(1.5)} />
        <motion.path d={`M ${Q1.B.x + 18} ${Q1.B.y + 10} A 20 20 0 0 0 ${Q1.B.x + 5} ${Q1.B.y + 19}`} stroke={givenColor} fill="none" strokeWidth="2"
          initial="hidden" animate="visible" variants={itemAnim(1.5)} />
        <motion.text x={210} y={65} fill={givenColor} fontSize="12" initial="hidden" animate="visible" variants={itemAnim(1.7)}>
          Given: $\angle ABD \cong \angle CBD$ (A)
        </motion.text>

        {/* Hidden Clue */}
        <motion.line x1={Q1.B.x} y1={Q1.B.y} x2={Q1.D.x} y2={Q1.D.y} stroke={hiddenColor} strokeWidth="4" strokeDasharray="5 5"
          initial="hidden" animate="visible" variants={itemAnim(2.0)} />
        <motion.text x={210} y={115} fill={hiddenColor} fontSize="12" initial="hidden" animate="visible" variants={itemAnim(2.2)}>
          Reflexive Prop: $BD \cong BD$ (S)
        </motion.text>
        
        {/* Conclusion */}
        <motion.text x={200} y={205} fill={strokeColor} fontSize="16" textAnchor="middle" fontWeight="bold"
          initial="hidden" animate="visible" variants={itemAnim(2.5)}>
          Conclusion: $\triangle ABD \cong \triangle CBD$ by SAS
        </motion.text>
      </svg>
    </div>
  );
};
// --- END OF ANIMATION COMPONENT DEFINITION ---


export default function ProvingSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false]); // Only one question
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'proving-statements-quiz',
      conceptId: 'proving-statements',
      conceptName: 'Proving Statements',
      type: 'judging',
      description: 'Testing the logical flow of a proof'
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
      id: 'proving-statements-q1',
      question: 'Based on the diagram, what is the *hidden* piece of information that we get for "free"?',
      options: [
        "$AB \cong CB$",
        "$\angle A \cong \angle C$",
        "$BD \cong BD$",
        "$\angle ABD \cong \angle CBD$"
      ],
      correctAnswer: "$BD \cong BD$",
      explanation: "Correct! The triangles share the side $BD$. By the Reflexive Property, $BD \cong BD$. This is the 'hidden' (S) in our SAS proof."
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
      interactionId: `proving-statements-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'proving-statements',
      conceptName: 'Proving Statements',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Anatomy of a Simple Proof</h2>
            <p className="text-lg leading-relaxed">
              Let's look at a typical problem. The diagram shows all the information we need.
            </p>
            <ul className="list-disc list-inside mt-4 text-lg space-y-2">
              <li>
                <strong>Given:</strong>
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">$AB \cong CB$</span>
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">$\angle ABD \cong \angle CBD$</span>
              </li>
              <li>
                <strong>Prove:</strong>
                <br/>
                <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 p-1 rounded">$\triangle ABD \cong \triangle CBD$</span>
              </li>
            </ul>
          </div>

          {/* --- CARD 2 (The Logic) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Logical Argument</h3>
            <p className="text-lg leading-relaxed">
              Before we write a formal proof, let's think it through in plain English.
            </p>
            <p className="text-lg leading-relaxed mt-3">
              "We are <strong>given</strong> that $AB \cong CB$, which is a <strong>Side (S)</strong>. We are also <strong>given</strong> that $\angle ABD \cong \angle CBD$, which is an <strong>Angle (A)</strong>.
              <br/><br/>
              Then, we can see from the diagram that both triangles <strong>share the side $BD$</strong>. By the <strong>Reflexive Property</strong>, $BD \cong BD$. This is our second <strong>Side (S)</strong>.
              <br/><br/>
              The angle is *included* between the two sides, so we have a <strong>S-A-S</strong> pattern. Therefore, the triangles are congruent by SAS."
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Visualizing the Proof</h3>
            
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <SimpleProofFigure />
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              We find a Side (Given), an Angle (Given), and a Side (Hidden) to prove SAS.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Finding the Clues</h3>
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
                <div className="text-3xl mb-4">🕵️‍♂️</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You found the hidden clue!" : 'Great job!'}
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
      slideId="proving-statements"
      slideTitle="Proving Congruence Statements"
      moduleId="congruence"
      submoduleId="proving-congruence-statements"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}