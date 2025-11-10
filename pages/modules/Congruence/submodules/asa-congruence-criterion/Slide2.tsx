import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
// Helper: Draw Clean Angle Arc
// Helper: Draw Clean Angle Arc
function angleArcPath(center: {x:number, y:number}, p1: {x:number, y:number}, p2:{x:number,y:number}, radius:number, sweep: 0 | 1) {
  const v1 = { x: p1.x - center.x, y: p1.y - center.y };
  const v2 = { x: p2.x - center.x, y: p2.y - center.y };

  const len1 = Math.hypot(v1.x, v1.y);
  const len2 = Math.hypot(v2.x, v2.y);

  const p1n = { x: center.x + (v1.x / len1) * radius, y: center.y + (v1.y / len1) * radius };
  const p2n = { x: center.x + (v2.x / len2) * radius, y: center.y + (v2.y / len2) * radius };

  return `M ${p1n.x} ${p1n.y} A ${radius} ${radius} 0 0 ${sweep} ${p2n.x} ${p2n.y}`;
}


// --- ASA IDENTIFICATION FIGURE ---
const AsaIdentificationFigure: React.FC = () => {
  const svgWidth = 400;
  const svgHeight = 280;
  const { isDarkMode } = useThemeContext();
  const strokeColor = isDarkMode ? '#E2E8F0' : '#4A5568';
  const labelColor = isDarkMode ? '#CBD5E1' : '#475569';

  const angle1Color = isDarkMode ? '#FDE047' : '#EAB308'; // Yellow
  const angle2Color = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const angle3Color = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const sideColor = strokeColor;
  const commonProps = { fill: 'none', strokeWidth: 2 };

  // Coordinates
  const P  = { A:{x:50,y:120}, B:{x:150,y:120}, C:{x:130,y:30} };
  const T1 = { A:{x:250,y:30}, B:{x:300,y:120}, C:{x:370,y:80} };
  const T2 = { A:{x:30,y:250}, B:{x:170,y:250}, C:{x:80,y:160} };
  const T3 = { A:{x:230,y:250}, B:{x:370,y:250}, C:{x:320,y:160} };

  return (
    <div className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60">
      <svg width={svgWidth} height={svgHeight}>


        {/* --- P TRIANGLE --- */}
        <g>
          <path d={`M ${P.A.x} ${P.A.y} L ${P.B.x} ${P.B.y} L ${P.C.x} ${P.C.y} Z`} stroke={strokeColor} {...commonProps}/>
          <text x={P.A.x - 8} y={P.A.y + 15} fill={labelColor} fontSize="14">A</text>
          <text x={P.B.x + 5} y={P.B.y + 15} fill={labelColor} fontSize="14">B</text>
          <text x={P.C.x} y={P.C.y - 10} fill={labelColor} fontSize="14" textAnchor="middle">C</text>

          <text x={P.A.x - 25} y={P.A.y + 5} fill={labelColor} fontSize="14">P</text>

          {/* Angle A */}
          <path d={angleArcPath(P.A, P.B, P.C, 14, 0)} stroke={angle1Color} {...commonProps} />

          {/* Side AB hash */}
          <line x1={90} y1={118} x2={95} y2={122} stroke={sideColor} strokeWidth="1.5" />
          <line x1={100} y1={118} x2={105} y2={122} stroke={sideColor} strokeWidth="1.5" />

          {/* Angle C */}
          <path d={angleArcPath(P.C, P.A, P.B, 14, 1)} stroke={angle2Color} {...commonProps} />
        </g>



        {/* --- T1 TRIANGLE --- */}
        <g>
          <path d={`M ${T1.A.x} ${T1.A.y} L ${T1.B.x} ${T1.B.y} L ${T1.C.x} ${T1.C.y} Z`} stroke={strokeColor} {...commonProps}/>
          <text x={T1.A.x - 8} y={T1.A.y - 8} fill={labelColor} fontSize="14">A</text>
          <text x={T1.B.x + 8} y={T1.B.y + 10} fill={labelColor} fontSize="14">B</text>
          <text x={T1.C.x + 5} y={T1.C.y - 5} fill={labelColor} fontSize="14">C</text>

          <text x={T1.A.x + 15} y={T1.A.y - 12} fill={labelColor} fontSize="14">T₁</text>

          {/* Angle A */}
          <path d={angleArcPath(T1.A, T1.B, T1.C, 14, 1)} stroke={angle2Color} {...commonProps} />
        </g>



        {/* --- T2 TRIANGLE --- */}
        <g>
          <path d={`M ${T2.A.x} ${T2.A.y} L ${T2.B.x} ${T2.B.y} L ${T2.C.x} ${T2.C.y} Z`} stroke={strokeColor} {...commonProps}/>
          <text x={T2.A.x - 8} y={T2.A.y + 15} fill={labelColor} fontSize="14">A</text>
          <text x={T2.B.x + 8} y={T2.B.y + 15} fill={labelColor} fontSize="14">B</text>
          <text x={T2.C.x} y={T2.C.y - 10} fill={labelColor} fontSize="14" textAnchor="middle">C</text>

          <text x={T2.C.x} y={T2.C.y - 25} fill={labelColor} fontSize="14" textAnchor="middle">T₂</text>

          <path d={angleArcPath(T2.A, T2.B, T2.C, 14, 1)} stroke={angle1Color} {...commonProps} />
          <path d={angleArcPath(T2.C, T2.A, T2.B, 14, 0)} stroke={angle2Color} {...commonProps} />
        </g>



        {/* --- T3 TRIANGLE --- */}
        <g>
          <path d={`M ${T3.A.x} ${T3.A.y} L ${T3.B.x} ${T3.B.y} L ${T3.C.x} ${T3.C.y} Z`} stroke={strokeColor} {...commonProps}/>
          <text x={T3.A.x - 8} y={T3.A.y + 15} fill={labelColor} fontSize="14">A</text>
          <text x={T3.B.x + 8} y={T3.B.y + 15} fill={labelColor} fontSize="14">B</text>
          <text x={T3.C.x} y={T3.C.y - 10} fill={labelColor} fontSize="14" textAnchor="middle">C</text>

          <text x={T3.C.x} y={T3.C.y - 25} fill={labelColor} fontSize="14" textAnchor="middle">T₃</text>

          <path d={angleArcPath(T3.A, T3.B, T3.C, 14, 1)} stroke={angle3Color} {...commonProps} />
          <path d={angleArcPath(T3.C, T3.A, T3.B, 14, 0)} stroke={angle2Color} {...commonProps} />
        </g>

      </svg>
    </div>
  );
};

export default function AsaSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  // --- UPDATED QUIZ STATE FOR 1 QUESTION ---
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'asa-identification-quiz',
      conceptId: 'asa-criterion-identification',
      conceptName: 'ASA Criterion Identification',
      type: 'judging',
      description: 'Testing ability to identify ASA vs. non-ASA cases'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED QUESTIONS ARRAY (from your image) ---
  const questions: QuizQuestion[] = [
    {
      id: 'asa-id-q1-example',
      question: 'According to the ASA criterion only, which of the following triangles are congruent to P?',
      options: [
        "T₁",
        "T₂",
        "T₃",
      ],
      correctAnswer: "T₃",
      explanation: "Correct! P ≅ T₃ by ASA because two angles and the included side of one are congruent to the corresponding parts of the other."
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
      interactionId: `asa-id-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'asa-criterion-identification',
      conceptName: 'ASA Criterion Identification',
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

        {/* Left Column - Content (UPDATED FROM YOUR IMAGE) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Example: Identifying Congruent Triangles</h2>
            
            <p className="text-lg leading-relaxed mb-4">
              Let's re-examine the ASA (angle-side-angle) congruence criterion:
            </p>

            <blockquote className="my-4 p-4 bg-slate-100 dark:bg-slate-700/60 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-lg italic font-medium leading-relaxed">
                Two triangles are congruent if and only if two angles and <strong>the included side</strong> of one triangle are congruent to two angles and the included side of the other triangle.
              </p>
            </blockquote>

            <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600 dark:text-blue-400">Let's examine each triangle:</h3>
            <ul className="list-disc list-inside mt-2 text-lg space-y-3 text-slate-700 dark:text-slate-300">
  <li>
    <strong>P vs. T₁:</strong> P is <strong>not congruent</strong> to T₁ by ASA because T₁ does not have both angles marked as congruent.
  </li>
  <li>
    <strong>P vs. T₂:</strong> P is <strong>not congruent</strong> to T₂ by ASA. T₂ does have two matching angles, but the matching side is <strong>not the side between those two angles</strong>. This makes it AAS, not ASA (this is a common trick).
  </li>
  <li>
    <strong>P vs. T₃:</strong> P is <strong>congruent</strong> to T₃ by ASA because it has two matching angles and the <strong>included side</strong> between them matching as well.
  </li>
</ul>

              <p className="text-lg leading-relaxed mt-4">
                Now, use this information to answer the question on the right.
              </p>
          </div>
        </div>

        {/* Right Column - Animation and Quiz (UPDATED) */}
        <div className="space-y-6">
          {/* --- KNOWLEDGE CHECK CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Identification Practice</h3>
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

            {/* --- USE THE NEW FIGURE COMPONENT --- */}
            <AsaIdentificationFigure />

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
                          : 'bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700' // Incorrect
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
                  {score === questions.length ? "Excellent! You've mastered identification." : 'Great job!'}
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
      slideId="asa-identifying-triangles" // UPDATED ID
      slideTitle="Identifying Congruent Triangles Using ASA" // UPDATED TITLE
      moduleId="congruence"
      submoduleId="asa-congruence-criterion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}