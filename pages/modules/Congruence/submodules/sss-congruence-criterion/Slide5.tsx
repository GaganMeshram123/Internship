import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

// --- QUIZ FIGURE COMPONENT DEFINED INSIDE ---
// This component shows a different figure based on the current quiz question
const QuizFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const highlightColor = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const questionColor = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue

  // --- Figure 1: Isosceles Triangle ---
  const Q1 = { A: { x: 200, y: 50 }, B: { x: 100, y: 180 }, C: { x: 300, y: 180 }, M: { x: 200, y: 180 } };

  // --- Figure 2: Parallelogram ---
  const Q2 = { A: { x: 50, y: 180 }, B: { x: 150, y: 50 }, C: { x: 350, y: 50 }, D: { x: 250, y: 180 } };

  const commonProps = {
    fill: 'none',
    strokeWidth: 2,
  };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <AnimatePresence>
          {questionIndex === 0 && (
            <motion.g
              key="q1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Isosceles Triangle ABC with median AM */}
              <path d={`M ${Q1.A.x} ${Q1.A.y} L ${Q1.B.x} ${Q1.B.y} L ${Q1.C.x} ${Q1.C.y} Z`} stroke={strokeColor} {...commonProps} />
              <line x1={Q1.A.x} y1={Q1.A.y} x2={Q1.M.x} y2={Q1.M.y} stroke={strokeColor} {...commonProps} strokeDasharray="4 4" />
              
              {/* Labels */}
              <text x={Q1.A.x - 5} y={Q1.A.y - 10} fill={strokeColor}>A</text>
              <text x={Q1.B.x - 15} y={Q1.B.y + 10} fill={strokeColor}>B</text>
              <text x={Q1.C.x + 5} y={Q1.C.y + 10} fill={strokeColor}>C</text>
              <text x={Q1.M.x - 5} y={Q1.M.y + 15} fill={strokeColor}>M</text>

              {/* SSS Markings */}
              <line x1={Q1.A.x} y1={Q1.A.y} x2={Q1.B.x} y2={Q1.B.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={Q1.A.x} y1={Q1.A.y} x2={Q1.C.x} y2={Q1.C.y} stroke={highlightColor} strokeWidth="4" />
              <text x={150} y={100} fill={highlightColor} fontSize="12">Given: AB &cong; AC</text>
              
              <line x1={Q1.B.x} y1={Q1.B.y} x2={Q1.M.x} y2={Q1.M.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
              <line x1={Q1.C.x} y1={Q1.C.y} x2={Q1.M.x} y2={Q1.M.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
              <text x={250} y={100} fill={highlightColor} fontSize="12">Given: M is midpoint</text>

              <line x1={Q1.A.x} y1={Q1.A.y} x2={Q1.M.x} y2={Q1.M.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="1 5" />
              <text x={210} y={115} fill={highlightColor} fontSize="12">Shared Side</text>

              {/* Question */}
              <text x={Q1.B.x + 20} y={Q1.B.y - 20} fill={questionColor} fontSize="14" fontWeight="bold">x</text>
              <path d={`M ${Q1.B.x + 20} ${Q1.B.y} A 20 20 0 0 0 ${Q1.B.x + 10} ${Q1.B.y - 17}`} stroke={questionColor} {...commonProps} />
              
              <text x={Q1.C.x - 40} y={Q1.C.y - 20} fill={strokeColor} fontSize="14">32°</text>
              <path d={`M ${Q1.C.x - 20} ${Q1.C.y} A 20 20 0 0 1 ${Q1.C.x - 10} ${Q1.C.y - 17}`} stroke={strokeColor} {...commonProps} />
            </motion.g>
          )}

          {questionIndex === 1 && (
            <motion.g
              key="q2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Parallelogram ABCD with diagonal BD */}
              <path d={`M ${Q2.A.x} ${Q2.A.y} L ${Q2.B.x} ${Q2.B.y} L ${Q2.C.x} ${Q2.C.y} L ${Q2.D.x} ${Q2.D.y} Z`} stroke={strokeColor} {...commonProps} />
              <line x1={Q2.B.x} y1={Q2.B.y} x2={Q2.D.x} y2={Q2.D.y} stroke={strokeColor} {...commonProps} />
              
              {/* Labels */}
              <text x={Q2.A.x - 20} y={Q2.A.y} fill={strokeColor}>A</text>
              <text x={Q2.B.x - 10} y={Q2.B.y - 10} fill={strokeColor}>B</text>
              <text x={Q2.C.x + 10} y={Q2.C.y - 10} fill={strokeColor}>C</text>
              <text x={Q2.D.x + 10} y={Q2.D.y} fill={strokeColor}>D</text>

              {/* SSS Markings (Givens) */}
              <line x1={Q2.A.x} y1={Q2.A.y} x2={Q2.B.x} y2={Q2.B.y} stroke={highlightColor} strokeWidth="4" />
              <line x1={Q2.C.x} y1={Q2.C.y} x2={Q2.D.x} y2={Q2.D.y} stroke={highlightColor} strokeWidth="4" />
              
              <line x1={Q2.A.x} y1={Q2.A.y} x2={Q2.D.x} y2={Q2.D.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
              <line x1={Q2.B.x} y1={Q2.B.y} x2={Q2.C.x} y2={Q2.C.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="5 5" />
              
              {/* Shared Side */}
              <line x1={Q2.B.x} y1={Q2.B.y} x2={Q2.D.x} y2={Q2.D.y} stroke={highlightColor} strokeWidth="4" strokeDasharray="1 5" />

              {/* Question */}
              <text x={Q2.A.x + 10} y={Q2.A.y - 20} fill={questionColor} fontSize="14" fontWeight="bold">x</text>
              <path d={`M ${Q2.A.x + 20} ${Q2.A.y} A 20 20 0 0 0 ${Q2.A.x + 10} ${Q2.A.y - 17}`} stroke={questionColor} {...commonProps} />
              
              <text x={Q2.C.x - 30} y={Q2.C.y + 10} fill={strokeColor} fontSize="14">70°</text>
              <path d={`M ${Q2.C.x - 20} ${Q2.C.y} A 20 20 0 0 1 ${Q2.C.x - 10} ${Q2.C.y + 17}`} stroke={strokeColor} {...commonProps} />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};
// --- END OF QUIZ FIGURE COMPONENT DEFINITION ---


export default function SssSlide5() {
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
      id: 'sss-applications-quiz',
      conceptId: 'sss-applications',
      conceptName: 'SSS Applications',
      type: 'judging',
      description: 'Testing SSS applications in polygons'
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
      id: 'sss-app-q1-isosceles',
      question: 'Given Isosceles $\triangle ABC$ ($AB \cong AC$) and $M$ is the midpoint of $BC$. We can prove $\triangle ABM \cong \triangle ACM$ by SSS. What is the value of x?',
      options: [
        "32°",
        "58°",
        "90°",
        "Cannot be determined"
      ],
      correctAnswer: "32°",
      explanation: "Correct! We prove $\triangle ABM \cong \triangle ACM$ by SSS ($AB \cong AC$ given, $BM \cong CM$ by midpoint, $AM \cong AM$ by reflexive). By CPCTC, $\angle B \cong \angle C$. Since $m\angle C = 32°$, x must also be 32°."
    },
    {
      id: 'sss-app-q2-parallelogram',
      question: 'Given parallelogram $ABCD$ ($AB \cong CD$, $BC \cong DA$). We can prove $\triangle ABD \cong \triangle CDB$ by SSS. What is the value of x?',
      options: [
        "70°",
        "110°",
        "We need $\angle B$ to know",
        "Cannot be determined"
      ],
      correctAnswer: "70°",
      explanation: "Correct! We prove $\triangle ABD \cong \triangle CDB$ by SSS ($AB \cong CD$ given, $AD \cong CB$ given, $BD \cong DB$ reflexive). By CPCTC, the corresponding angles $\angle A$ and $\angle C$ are congruent. Since $m\angle C = 70°$, x must also be 70°."
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
      interactionId: `sss-app-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'sss-applications',
      conceptName: 'SSS Applications',
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
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Applications of SSS</h2>
            <p className="text-lg leading-relaxed">
              SSS is a powerful tool for proving properties of other shapes. By splitting a shape into triangles, we can use SSS and CPCTC to find hidden information.
            </p>
          </div>

          {/* --- CARD 2 (Isosceles Triangles) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Isosceles Triangles</h3>
            <p className="text-lg leading-relaxed">
              SSS is one way to prove the <strong>Isosceles Triangle Theorem</strong> (if two sides are congruent, the angles opposite them are congruent).
            </p>
            <ul className="mt-4 space-y-3 text-lg">
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">1.</span>
                <span>Draw a median from the vertex angle to the base. This splits the base in two (S).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">2.</span>
                <span>The two "leg" sides are congruent (S).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">3.</span>
                <span>The median is a shared side (S).</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 mr-2">4.</span>
                <span>The triangles are congruent by <strong>SSS</strong>, so by <strong>CPCTC</strong>, the base angles are congruent.</span>
              </li>
            </ul>
          </div>
          
          {/* --- CARD 3 (Parallelograms) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Parallelograms</h3>
            <p className="text-lg leading-relaxed">
              SSS is used to prove that <strong>opposite angles</strong> of a parallelogram are congruent.
            </p>
            <p className="text-lg leading-relaxed mt-2">
              As seen in the quiz, drawing a diagonal and using the property that opposite sides are congruent ($AB \cong CD$, $BC \cong DA$) gives you SSS. By CPCTC, $\angle A \cong \angle C$.
            </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Polygon Practice</h3>
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
            <QuizFigure questionIndex={currentQuestionIndex} />

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
                            : 'border-slate-400 bg-slate-100 dark:bg-slate-800 opacity-70' // INCORRECT
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
                <div className="text-3xl mb-4">🔷</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You've mastered SSS applications!" : 'Good practice!'}
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
      slideId="sss-applications"
      slideTitle="Applying the SSS Criterion in Isosceles Triangles and Parallelograms"
      moduleId="congruence"
      submoduleId="sss-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}