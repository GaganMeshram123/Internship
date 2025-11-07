import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import katex from 'katex';

const CongruencePropertiesFigure: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const svgWidth = 400;
  const svgHeight = 220;
  const { isDarkMode } = useThemeContext();
  
  // --- Colors ---
  const color1 = isDarkMode ? '#60A5FA' : '#2563EB'; // Blue
  const color2 = isDarkMode ? '#4ADE80' : '#22C55E'; // Green
  const color3 = isDarkMode ? '#F59E0B' : '#D97706'; // Orange
  const textColor = isDarkMode ? '#E2E8F0' : '#4A5568';

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.3 } },
    exit: { opacity: 0, scale: 0.9 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div 
      className="w-full flex justify-center items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700/60 overflow-hidden" 
      style={{ minHeight: svgHeight }}
    >
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <AnimatePresence mode="wait">

          {/* === State 0: Reflexive === */}
          {questionIndex === 0 && (
            <motion.g
              key="reflexive"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.text x={200} y={40} textAnchor="middle" fontSize="18" fill={textColor} variants={itemVariants}>
                Reflexive Property
              </motion.text>
              {/* Segment AB */}
              <motion.line x1={100} y1={90} x2={300} y2={90} stroke={color1} strokeWidth="4" variants={itemVariants} />
              <motion.text x={95} y={110} fill={textColor} variants={itemVariants}>A</motion.text>
              <motion.text x={295} y={110} fill={textColor} variants={itemVariants}>B</motion.text>
              
              {/* Equation */}
              <foreignObject x="50" y="140" width="300" height="50">
                <motion.div 
                  variants={itemVariants} 
                  style={{ color: textColor, fontSize: '20px', textAlign: 'center' }}
                  dangerouslySetInnerHTML={{ __html: katex.renderToString("\\overline{AB} \\cong \\overline{AB}", { throwOnError: false }) }}
                />
              </foreignObject>
            </motion.g>
          )}

          {/* === State 1: Symmetric === */}
          {questionIndex === 1 && (
             <motion.g
              key="symmetric"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.text x={200} y={40} textAnchor="middle" fontSize="18" fill={textColor} variants={itemVariants}>
                Symmetric Property
              </motion.text>
              {/* Segment AB */}
              <motion.line x1={50} y1={90} x2={180} y2={90} stroke={color1} strokeWidth="4" variants={itemVariants} />
              <motion.text x={45} y={110} fill={textColor} variants={itemVariants}>A</motion.text>
              <motion.text x={175} y={110} fill={textColor} variants={itemVariants}>B</motion.text>
              
              {/* Segment CD */}
              <motion.line x1={220} y1={90} x2={350} y2={90} stroke={color2} strokeWidth="4" variants={itemVariants} />
              <motion.text x={215} y={110} fill={textColor} variants={itemVariants}>C</motion.text>
              <motion.text x={345} y={110} fill={textColor} variants={itemVariants}>D</motion.text>

              {/* Equations */}
              <foreignObject x="0" y="140" width="400" height="50">
                <motion.div 
                  variants={itemVariants} 
                  style={{ color: textColor, fontSize: '18px', textAlign: 'center' }}
                  dangerouslySetInnerHTML={{ __html: katex.renderToString(
                    "\\text{If } \\overline{AB} \\cong \\overline{CD} \\text{, then } \\overline{CD} \\cong \\overline{AB}", 
                    { throwOnError: false }) }}
                />
              </foreignObject>
            </motion.g>
          )}

          {/* === State 2: Transitive === */}
          {questionIndex === 2 && (
             <motion.g
              key="transitive"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.text x={200} y={40} textAnchor="middle" fontSize="18" fill={textColor} variants={itemVariants}>
                Transitive Property
              </motion.text>
              {/* Segment AB */}
              <motion.line x1={20} y1={90} x2={120} y2={90} stroke={color1} strokeWidth="4" variants={itemVariants} />
              <motion.text x={15} y={110} fill={textColor} variants={itemVariants}>A</motion.text>
              <motion.text x={115} y={110} fill={textColor} variants={itemVariants}>B</motion.text>

              {/* Segment CD */}
              <motion.line x1={150} y1={90} x2={250} y2={90} stroke={color2} strokeWidth="4" variants={itemVariants} />
              <motion.text x={145} y={110} fill={textColor} variants={itemVariants}>C</motion.text>
              <motion.text x={245} y={110} fill={textColor} variants={itemVariants}>D</motion.text>

              {/* Segment EF */}
              <motion.line x1={280} y1={90} x2={380} y2={90} stroke={color3} strokeWidth="4" variants={itemVariants} />
              <motion.text x={275} y={110} fill={textColor} variants={itemVariants}>E</motion.text>
              <motion.text x={375} y={110} fill={textColor} variants={itemVariants}>F</motion.text>

              {/* Equations */}
              <foreignObject x="0" y="130" width="400" height="80">
                <motion.div 
                  variants={itemVariants} 
                  style={{ color: textColor, fontSize: '16px', textAlign: 'center', lineHeight: '1.4' }}
                  dangerouslySetInnerHTML={{ __html: katex.renderToString(
                    "\\text{If } \\overline{AB} \\cong \\overline{CD} \\text{ and } \\overline{CD} \\cong \\overline{EF} \\\\ \\text{then } \\overline{AB} \\cong \\overline{EF}", 
                    { throwOnError: false, displayMode: true }) }}
                />
              </foreignObject>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
};

export default function PropertiesSlide5() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const questions = [
    {
      question: 'Which property is being used if a segment is congruent to itself?',
      options: [
        "Reflexive Property of Congruence",
        "Symmetric Property of Congruence",
        "Transitive Property of Congruence"
      ],
      correctAnswer: "Reflexive Property of Congruence",
      explanation: "A segment always matches itself. That's reflexive."
    },
    {
      question: 'Which property allows us to flip a congruence statement?',
      options: [
        "Reflexive Property of Congruence",
        "Symmetric Property of Congruence",
        "Transitive Property of Congruence"
      ],
      correctAnswer: "Symmetric Property of Congruence",
      explanation: "If ¯AB ≅ ¯CD, then ¯CD ≅ ¯AB."
    },
    {
      question: 'Which property allows congruence to pass from one pair to another?',
      options: [
        "Reflexive Property of Congruence",
        "Symmetric Property of Congruence",
        "Transitive Property of Congruence"
      ],
      correctAnswer: "Transitive Property of Congruence",
      explanation: "If ¯AB ≅ ¯CD and ¯CD ≅ ¯EF, then ¯AB ≅ ¯EF."
    }
  ];

  const handleAnswer = (answer: string) => {
    if (showFeedback || isQuizComplete) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    const updated = [...questionsAnswered];
    updated[currentQuestionIndex] = true;
    setQuestionsAnswered(updated);
    setSelectedAnswer('');
    setShowFeedback(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  return (
    <SlideComponentWrapper
      slideId="properties-congruence-rst"
      slideTitle="Reflexivity, Symmetricity, and Transitivity of Congruence"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

        {/* LEFT SIDE WITH UPDATED EXPLANATION */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Reflexivity, Symmetricity, and Transitivity of Congruence
            </h2>

            <p>Suppose that <strong>a</strong>, <strong>b</strong>, and <strong>c</strong> are all segments. We can state the properties of segment congruence more generally:</p>

            <ul className="list-disc list-inside space-y-4 mt-4">
              <li>
                <strong>Reflexive Property:</strong>
                <br />Every segment is congruent to itself.
                <br /><span className="font-mono text-sm">a ≅ a</span>
              </li>

              <li>
                <strong>Symmetric Property:</strong>
                <br />If one segment is congruent to another, we can reverse the statement.
                <br /><span className="font-mono text-sm">If a ≅ b, then b ≅ a</span>
              </li>

              <li>
                <strong>Transitive Property:</strong>
                <br />If the first is congruent to the second and the second is congruent to the third, then the first is congruent to the third.
                <br /><span className="font-mono text-sm">If a ≅ b and b ≅ c, then a ≅ c</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE QUIZ & FIGURE */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            <CongruencePropertiesFigure questionIndex={currentQuestionIndex} />
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
            {!isQuizComplete ? (
              <>
                <p className="text-lg mb-4">{questions[currentQuestionIndex].question}</p>

                {questions[currentQuestionIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-3 rounded-lg border-2 my-2 text-left
                      ${selectedAnswer === option
                        ? selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? "border-blue-500 bg-blue-100"
                          : "border-red-500 bg-red-100"
                        : "border-slate-300 dark:border-slate-600 hover:border-blue-400"}`}
                  >
                    {option}
                  </button>
                ))}

                {showFeedback && (
                  <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-700 rounded">
                    {questions[currentQuestionIndex].explanation}
                    <button onClick={nextQuestion} className="w-full mt-3 bg-blue-600 text-white p-2 rounded-lg">
                      {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6 text-xl">
                ✅ Quiz Complete! Score: {score}/{questions.length}
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideComponentWrapper>
  );
}
