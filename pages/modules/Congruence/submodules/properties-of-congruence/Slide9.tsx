import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import  katex  from 'katex'; // Assuming you have katex for math rendering

// --- TABLE COMPONENT DEFINED INSIDE ---
type ProofRow = { num: string; statement: string; reason: string };

const ProofTableExample: React.FC<{ rows: ProofRow[] }> = ({ rows }) => {
  return (
    <div className="w-full my-4">
      <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow-md bg-white dark:bg-slate-800">
        <thead>
          <tr className="bg-slate-200 dark:bg-slate-700">
            <th className="p-3 w-12 text-center text-sm font-semibold text-slate-700 dark:text-slate-300"></th>
            <th className="p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Statement</th>
            <th className="p-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Reason</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-slate-300 dark:border-slate-600">
              <td className="p-3 text-center font-mono text-slate-500">{row.num}</td>
              <td className="p-3 font-mono" dangerouslySetInnerHTML={{ __html: katex.renderToString(row.statement, { throwOnError: false }) }}></td>
              <td className="p-3 text-slate-600 dark:text-slate-400">{row.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
// --- END OF TABLE COMPONENT DEFINITION ---


export default function PropertiesSlide9() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  // --- UPDATED: Now has 3 booleans for 3 questions ---
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'properties-omitting-symmetric-quiz',
      conceptId: 'properties-omitting-symmetric',
      conceptName: 'Omitting Symmetric Property',
      type: 'judging',
      description: 'Testing understanding of the symmetric property convention'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  // --- UPDATED: New questions array ---
  const questions: QuizQuestion[] = [
   {
  id: 'properties-omitting-q1',
  question: 'Why is the Symmetric Property often not written in proofs?',
  options: [
    "It is not a real property.",
    "It only works for segments, not angles.",
    "It is considered obvious, so we do not write it every time."
  ],
  correctAnswer: "It is considered obvious, so we do not write it every time.",
  explanation: "Correct! Most proofs assume that if A = B is true, then B = A is also true without needing to show it as a separate step."
},
{
  id: 'properties-omitting-q2',
  question: 'In the formal proof, how do we get y² = 2 on line 4?',
  options: [
    "From x = y² (line 1) and x = 2 (line 3)",
    "From y² = x (line 2) and x = 2 (line 3)",
    "From x = y² (line 1) and y² = x (line 2)"
  ],
  correctAnswer: "From y² = x (line 2) and x = 2 (line 3)",
  explanation: "Correct! The Transitive Property says if A = B and B = C, then A = C. Here A is y², B is x, and C is 2."
},
{
  id: 'properties-omitting-q3',
  question: 'In the shorter proof, how is the Transitive Property being used?',
  options: [
    "It uses x = y² and x = 2 directly.",
    "It secretly flips x = y² into y² = x first, then uses the Transitive Property.",
    "The shorter proof does not use the Transitive Property."
  ],
  correctAnswer: "It secretly flips x = y² into y² = x first, then uses the Transitive Property.",
  explanation: "Correct! The shorter proof hides the step where x = y² is rewritten as y² = x. This is the Symmetric Property used quietly before applying the Transitive Property."
}

  ];

  // --- Data for the tables ---
  const longProof: ProofRow[] = [
    { num: "1", statement: "x = y^2", reason: "Given" },
    { num: "2", statement: "y^2 = x", reason: "Symmetric property of equality" },
    { num: "3", statement: "x = 2", reason: "Given" },
    { num: "4", statement: "y^2 = 2", reason: "Transitive property of equality" },
  ];
  
  // Note: I numbered this 1, 2, 3 for clarity, as the '3' '3' in the image was likely a typo.
  const shortProof: ProofRow[] = [
    { num: "1", statement: "x = y^2", reason: "Given" },
    { num: "2", statement: "x = 2", reason: "Given" },
    { num: "3", statement: "y^2 = 2", reason: "Transitive property of equality" },
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    // ... (This function remains unchanged)
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const handleQuizAnswer = (answerText: string) => {
    // ... (This function remains unchanged, but I'll fix the template literal string)
    if (showFeedback || isQuizComplete) return;

    setSelectedAnswer(answerText);
    setShowFeedback(true);

    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    handleInteractionComplete({
      interactionId: `properties-omitting-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'properties-omitting-symmetric',
      conceptName: 'Omitting Symmetric Property',
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


  // --- UPDATED: All new slideContent ---
  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto">

        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* --- CARD 1 --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Omitting the Symmetric Property</h2>
            <p className="text-lg leading-relaxed">
              We occasionally skip referencing the symmetric property when proving mathematical statements involving equality and congruence. This helps to make our proofs a bit shorter.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              For example, suppose we have the following two equations:
            </p>
            <div className="flex justify-center font-mono text-xl p-4 my-4 rounded-lg bg-slate-100 dark:bg-slate-700/60">
              <span dangerouslySetInnerHTML={{ __html: katex.renderToString("x = y^2", { throwOnError: false }) }} />
              <span className="mx-8">,</span>
              <span dangerouslySetInnerHTML={{ __html: katex.renderToString("x = 2", { throwOnError: false }) }} />
            </div>
          </div>

          {/* --- CARD 2 (The Formal Proof) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">A Formal Proof</h3>
            <p className="text-lg leading-relaxed">
              We can construct a formal proof that <span dangerouslySetInnerHTML={{ __html: katex.renderToString("y^2 = 2", { throwOnError: false }) }} /> using a two-column format as follows:
            </p>
            
            {/* --- USE THE TABLE COMPONENT (Long) --- */}
            <ProofTableExample rows={longProof} />

            <p className="text-lg leading-relaxed mt-4">
              The last line is true because, from rows 2 and 3 respectively, we have <span dangerouslySetInnerHTML={{ __html: katex.renderToString("y^2 = x", { throwOnError: false }) }} /> and <span dangerouslySetInnerHTML={{ __html: katex.renderToString("x = 2", { throwOnError: false }) }} />, so by the transitive property of equality, <span dangerouslySetInnerHTML={{ __html: katex.renderToString("y^2 = 2", { throwOnError: false }) }} />.
            </p>
          </div>
        </div>

        {/* Right Column - Shorter Proof and Quiz */}
        <div className="space-y-6">
          {/* --- REPLACED ANIMATION CARD --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Shorter Proof</h3>
            <p className="text-lg leading-relaxed">
              We can construct a shorter proof by omitting the second line:
            </p>
            
            {/* --- USE THE TABLE COMPONENT (Short) --- */}
            <ProofTableExample rows={shortProof} />
            
            <p className="text-lg leading-relaxed mt-4 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              In this proof, the symmetric property is still applied <strong>"under the hood,"</strong> but we don't explicitly refer to it.
            </p>
          </div>

          {/* --- KNOWLEDGE CHECK CARD (Now reflects 3 questions) --- */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            {/* --- Progress Bar (updates automatically) --- */}
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

            {/* --- Quiz Logic (remains the same, but I'll fix the broken template literals) --- */}
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
                      >
                        {/* Render Katex in options if needed, but plain text is fine here */}
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
              // --- Quiz Complete State (unchanged) ---
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-3xl mb-4">👍</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? "You understand this convention!" : 'Great job!'}
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
      slideId="properties-omitting-symmetric"
      slideTitle="Omitting the Symmetric Property"
      moduleId="congruence"
      submoduleId="properties-of-congruence"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}