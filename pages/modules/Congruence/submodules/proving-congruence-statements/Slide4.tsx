import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import katex from 'katex';

// --- ANIMATION COMPONENT DEFINED INSIDE ---
const CpctcAsaFigure: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 200;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const angleColor1 = isDarkMode ? '#F59E0B' : '#D97706'; // Orange
  const angleColor2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const sideColor = isDarkMode ? '#60A5FA' : '#2563EB';   // Blue
  
  // Triangle 1 (ABC)
  const A = { x: 50, y: 150 };
  const B = { x: 190, y: 150 };
  const C = { x: 120, y: 50 };

  // Triangle 2 (KLM)
  const K = { x: 250, y: 150 };
  const L = { x: 390, y: 150 };
  const M = { x: 320, y: 50 };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {/* Triangle ABC */}
        <path d={`M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
        <text x={A.x - 15} y={A.y + 15} fill={strokeColor}>A</text>
        <text x={B.x + 5} y={B.y + 15} fill={strokeColor}>B</text>
        <text x={C.x - 5} y={C.y - 10} fill={strokeColor}>C</text>

        {/* Triangle KLM */}
        <path d={`M ${K.x} ${K.y} L ${L.x} ${L.y} L ${M.x} ${M.y} Z`} stroke={strokeColor} fill="none" strokeWidth="2" />
        <text x={K.x - 15} y={K.y + 15} fill={strokeColor}>K</text>
        <text x={L.x + 5} y={L.y + 15} fill={strokeColor}>L</text>
        <text x={M.x - 5} y={M.y - 10} fill={strokeColor}>M</text>

        {/* ASA Markings */}
        {/* Angle A & K (Orange) */}
        <path d={`M ${A.x + 20} ${A.y} A 20 20 0 0 1 ${A.x + 15} ${A.y - 14}`} stroke={angleColor1} fill="none" strokeWidth="2" />
        <path d={`M ${K.x + 20} ${K.y} A 20 20 0 0 1 ${K.x + 15} ${K.y - 14}`} stroke={angleColor1} fill="none" strokeWidth="2" />
        
        {/* Side AB & KL (Blue) */}
        <line x1={A.x + 65} y1={A.y} x2={A.x + 75} y2={A.y} stroke={sideColor} strokeWidth="3" />
        <line x1={K.x + 65} y1={K.y} x2={K.x + 75} y2={K.y} stroke={sideColor} strokeWidth="3" />
        
        {/* Angle B & L (Green) */}
        <path d={`M ${B.x - 20} ${B.y} A 20 20 0 0 0 ${B.x - 15} ${B.y - 14}`} stroke={angleColor2} fill="none" strokeWidth="2" />
        <path d={`M ${B.x - 23} ${B.y - 3} A 20 20 0 0 0 ${B.x - 18} ${B.y - 17}`} stroke={angleColor2} fill="none" strokeWidth="2" />
        
        <path d={`M ${L.x - 20} ${L.y} A 20 20 0 0 0 ${L.x - 15} ${L.y - 14}`} stroke={angleColor2} fill="none" strokeWidth="2" />
        <path d={`M ${L.x - 23} ${L.y - 3} A 20 20 0 0 0 ${L.x - 18} ${L.y - 17}`} stroke={angleColor2} fill="none" strokeWidth="2" />
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
  // --- UPDATED: Now 3 questions ---
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'proving-cpctc-asa-quiz',
      conceptId: 'proving-cpctc',
      conceptName: 'CPCTC (ASA Example)',
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

  // --- UPDATED: New questions based on ASA example ---
  const questions: QuizQuestion[] = [
    {
      id: 'proving-cpctc-q1',
      question: 'Based on the markings, $\\triangle ABC \\cong \\triangle KLM$ by which criterion?',
      options: [
        "SSS (Side-Side-Side)",
        "SAS (Side-Angle-Side)",
        "ASA (Angle-Side-Angle)",
        "CPCTC"
      ],
      correctAnswer: "ASA (Angle-Side-Angle)",
      explanation: "Correct! We are given two angles and the *included* side (the side between them), which is the ASA criterion."
    },
    {
      id: 'proving-cpctc-q2',
      question: 'The statement $AB \\cong KL$ is true because...',
      options: [
        "It is Given.",
        "It is proven by CPCTC.",
        "It is proven by the Reflexive Property."
      ],
      correctAnswer: "It is Given.",
      explanation: "Correct! The single tick mark on side $AB$ and $KL$ shows this was given. We don't need to use CPCTC to prove it."
    },
    {
      id: 'proving-cpctc-q3',
      question: 'Which of these statements is a conclusion from CPCTC (and *not* a "Given")?',
      options: [
        "$AB \\cong KL$",
        "$\\angle A \\cong \\angle K$",
        "$AC \\cong KM$",
        "$\\angle B \\cong \\angle L$"
      ],
      correctAnswer: "$AC \\cong KM$",
      explanation: "Correct! Once we prove the triangles are congruent by ASA, we can use CPCTC to state that the *other* corresponding parts, like $AC$ and $KM$, are also congruent."
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    // ... (This function remains unchanged)
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const handleQuizAnswer = (answerText: string) => {
    // ... (This function remains unchanged, but I'll fix the template literal)
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
    // ... (This function remains unchanged)
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


  // --- UPDATED: New slide content ---
  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* --- CARD 1 --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">CPCTC</h2>
            <p className="text-lg leading-relaxed">
              Before we proceed, we first need to state a theorem that's often abbreviated to CPCTC:
            </p>
            <div className="mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60">
              <p className="text-lg italic font-semibold text-center">
                Corresponding parts of congruent triangles are congruent.
              </p>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              When two triangles are shown to be congruent using a congruence criterion (like SSS, SAS, ASA), CPCTC allows us to conclude that **all** corresponding angles and sides of those triangles are congruent.
            </p>
          </div>

          {/* --- CARD 2 (The Figure) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Demonstration</h3>
            <p className="text-lg leading-relaxed mb-4">
              To demonstrate, consider the following congruent triangles:
            </p>
            {/* --- USE THE ANIMATION COMPONENT --- */}
            <CpctcAsaFigure />
          </div>
        </div>

        {/* Right Column - Logic and Quiz */}
        <div className="space-y-6">
          {/* --- LOGIC CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Using CPCTC</h3>
            <p className="text-lg leading-relaxed">
              We won't prove this formally, but it's easy to see that since:
            </p>
            <div className="my-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 font-mono text-center text-lg"
                 dangerouslySetInnerHTML={{ __html: katex.renderToString("\\angle A \\cong \\angle K, \\quad AB \\cong KL, \\quad \\angle B \\cong \\angle L", { throwOnError: false }) }}
            />
            <p className="text-lg leading-relaxed">
              ...then <span dangerouslySetInnerHTML={{ __html: katex.renderToString("\\triangle ABC \\cong \\triangle KLM", { throwOnError: false }) }} /> by the <strong>ASA criterion</strong>.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Now that triangle congruence has been established, we can use <strong>CPCTC</strong> to list *all other* congruent sides and angles:
            </p>
            <ul className="list-disc list-outside mt-4 ml-5 text-lg space-y-2">
              <li>
                According to CPCTC, the following statements about segment congruence must be true:
                <div className="my-2" dangerouslySetInnerHTML={{ __html: katex.renderToString("AC \\cong KM, \\quad BC \\cong LM", { throwOnError: false, displayMode: true }) }} />
              </li>
              <li>
                Also, according to CPCTC, we have:
                <div className="my-2" dangerouslySetInnerHTML={{ __html: katex.renderToString("\\angle C \\cong \\angle M", { throwOnError: false, displayMode: true }) }} />
              </li>
            </ul>
          </div>

          {/* --- KNOWLEDGE CHECK CARD (Now 3 questions) --- */}
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
                <div className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: katex.renderToString(questions[currentQuestionIndex].question, { throwOnError: false }) }}></div>
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
                        dangerouslySetInnerHTML={{ __html: katex.renderToString(option, { throwOnError: false }) }}
                      >
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
                      <div className="text-lg text-slate-600 dark:text-slate-400 mb-4"
                           dangerouslySetInnerHTML={{ __html: katex.renderToString(questions[currentQuestionIndex].explanation, { throwOnError: false }) }}
                      >
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
                  {score === questions.length ? "You've mastered this concept!" : 'Great job!'}
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
      // --- UPDATED Props ---
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