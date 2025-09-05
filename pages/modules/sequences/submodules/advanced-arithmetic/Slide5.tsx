import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface AdvancedArithmeticSlide5Props {}

function AdvancedArithmeticSlide5({}: AdvancedArithmeticSlide5Props) {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | undefined>(undefined);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  const questions: QuizQuestion[] = [
    {
      id: 'symmetric-sum-problem',
      question: 'Three numbers in A.P. have a sum of 27 and the sum of their squares is 293. Find the middle number.',
      options: [
        '7',
        '8',
        '9',
        '10',
        '11'
      ],
      correctAnswer: '9',
      explanation: 'Using the symmetric form a-d, a, a+d: Sum = (a-d) + a + (a+d) = 3a = 27, so a = 9. The middle number is 9.'
    },
    {
      id: 'find-all-three-numbers',
      question: 'Three numbers in A.P. have a sum of 27 and the sum of their squares is 293. Find all three numbers.',
      options: [
        '5, 9, 13',
        '6, 9, 12', 
        '7, 9, 11',
        '8, 9, 10',
        '4, 9, 14'
      ],
      correctAnswer: '5, 9, 13',
      explanation: 'From previous: a = 9. Sum of squares: (a-d)² + a² + (a+d)² = (9-d)² + 81 + (9+d)² = 81 - 18d + d² + 81 + 81 + 18d + d² = 243 + 2d² = 293. So 2d² = 50, d² = 25, d = ±5. Taking d = 4: numbers are 5, 9, 13.'
    },
    {
      id: 'symmetric-product-problem',
      question: 'Three numbers in A.P. have a sum of 15 and their product is 80. Find the largest number.',
      options: [
        '8',
        '9',
        '10',
        '12',
        '15'
      ],
      correctAnswer: '8',
      explanation: 'Using a-d, a, a+d: Sum = 3a = 15, so a = 5. Product = (a-d)(a)(a+d) = a(a²-d²) = 5(25-d²) = 80. So 25-d² = 16, d² = 9, d = ±3. The numbers are 2, 5, 8. The largest is 8.'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsAnswerCorrect(correct);
    setShowExplanation(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    const newProgress = ((currentQuestionIndex + 1) / questions.length) * 100;
    setProgress(newProgress);

    handleInteractionComplete({
      interactionId: `advanced-arithmetic-symmetric-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answer,
      isCorrect: correct,
      timestamp: Date.now(),
      conceptId: 'symmetric-form-ap',
      conceptName: 'Symmetric Form of Arithmetic Progressions',
      conceptDescription: `Testing: ${currentQuestion.id === 'symmetric-sum-problem' ? 'Finding middle term using symmetric form' : currentQuestion.id === 'find-all-three-numbers' ? 'Complete solution using symmetric form' : 'Product conditions with symmetric form'}`,
      question: {
        type: 'mcq',
        question: currentQuestion.question,
        options: currentQuestion.options
      }
    });
  };

  const resetQuiz = () => {
    setSelectedAnswer('');
    setShowExplanation(false);
    setIsAnswerCorrect(undefined);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetQuiz();
    } else {
      setShowResults(true);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setProgress(0);
    setShowResults(false);
    resetQuiz();
  };

  const slideContent = (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            Somtimes instead of using the standard form, we can use the symmetric form.
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-3">Three Consecutive Terms:</p>
                <div className="text-center">
                  <BlockMath math="a-d, \quad a, \quad a+d" />
                </div>
              </div>
              <p className="text-lg">
                This symmetric representation makes calculations much simpler than using indexed terms. But remember, it only works for consecutive terms.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Why Symmetric Form Works</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="font-medium text-blue-700 dark:text-blue-300 mb-2">Sum Property:</p>
                <BlockMath math="(a-d) + a + (a+d) = 3a" />
                <p className="text-lg">The d terms cancel out, leaving only 3a</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <p className="font-medium text-green-700 dark:text-green-300 mb-2">Easier to Solve:</p>
                <p className="text-lg">Once you find a, you can find d from any additional condition</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Comparison with Standard Form</h3>
            
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="font-medium text-blue-700 dark:text-blue-300">Standard: a, a+d, a+2d</p>
                <p className="text-lg">Sum = 3a + 3d (harder to isolate variables)</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                <p className="font-medium text-green-700 dark:text-green-300">Symmetric: a-d, a, a+d</p>
                <p className="text-lg">Sum = 3a (directly gives middle term)</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">When to Use Each Form</h3>
            
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="font-medium text-blue-700 dark:text-blue-300">Use Symmetric Form When:</p>
                <ul className="text-lg list-disc list-inside">
                  <li>Given sum of three consecutive terms</li>
                  <li>Need to find the middle term quickly</li>
                  <li>Have one main condition (like sum or product)</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="font-medium text-blue-700 dark:text-blue-300">Use Standard Form When:</p>
                <ul className="text-lg list-disc list-inside">
                  <li>Have multiple independent conditions</li>
                  <li>Working with non-consecutive terms</li>
                  <li>Need specific term positions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Examples and Quiz */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="font-medium text-black dark:text-white">
                Find three numbers in A.P. whose sum is 27 and sum of squares is 293.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">
                  Step 1: Set up symmetric form
                </p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                  <p>Let the numbers be: <InlineMath math="a-d, a, a+d" /></p>
                </div>
              </div>

              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">
                  Step 2: Use sum condition
                </p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                  <BlockMath math="(a-d) + a + (a+d) = 27" />
                  <BlockMath math="3a = 27 \Rightarrow a = 9" />
                </div>
              </div>

              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">
                  Step 3: Use sum of squares
                </p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                  <BlockMath math="(a-d)^2 + a^2 + (a+d)^2 = 293" />
                  <BlockMath math="(9-d)^2 + 81 + (9+d)^2 = 293" />
                  <BlockMath math="2 \cdot 81 + 2d^2 = 293" />
                  <BlockMath math="162 + 2d^2 = 293" />
                  <BlockMath math="2d^2 = 131 \Rightarrow d^2 = 65.5" />
                </div>
              </div>

              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">
                  Step 4: Find the numbers
                </p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                  <p>Wait, let me recalculate step 3:</p>
                  <BlockMath math="81 - 18d + d^2 + 81 + 81 + 18d + d^2 = 293" />
                  <BlockMath math="243 + 2d^2 = 293" />
                  <BlockMath math="2d^2 = 50 \Rightarrow d^2 = 25 \Rightarrow d = \pm 5" />
                  <p>Taking d = 4: Numbers are <InlineMath math="5, 9, 13" /></p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Quiz */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                        Symmetric Form Practice
                      </h3>
                      <span className="text-lg text-gray-600 dark:text-gray-400">
                        {currentQuestionIndex + 1} of {questions.length}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="font-medium text-black dark:text-white">
                      {currentQuestion.question}
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => !showExplanation && handleAnswerSelect(option)}
                          disabled={showExplanation}
                          className={`p-3 text-left rounded-lg border transition-colors ${
                            showExplanation
                              ? option === currentQuestion.correctAnswer
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                                : option === selectedAnswer
                                  ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                                  : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-blue-500'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700"
                      >
                        <p className="font-medium mb-2 text-blue-700 dark:text-blue-300">
                          Explanation:
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {currentQuestion.explanation}
                        </p>
                        
                        <button
                          onClick={nextQuestion}
                          className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                    Quiz Complete!
                  </h3>
                  <div className="text-6xl mb-4">
                    {score === questions.length ? '🏆' : score >= questions.length * 0.7 ? '🎉' : score >= questions.length * 0.5 ? '👍' : '📚'}
                  </div>
                  <p className="text-xl font-semibold mb-2 text-black dark:text-white">
                    Score: {score}/{questions.length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {score === questions.length 
                      ? "Perfect! You've mastered the symmetric form technique."
                      : score >= questions.length * 0.7
                      ? "Excellent work! You understand the symmetric form well."
                      : score >= questions.length * 0.5
                      ? "Good effort! Practice more with symmetric form problems."
                      : "Keep practicing! The symmetric form is a powerful technique to master."}
                  </p>
                  <button
                    onClick={restartQuiz}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Restart Quiz
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="advanced-arithmetic-symmetric-form"
      slideTitle="Symmetric Form of Arithmetic Progressions"
      moduleId="sequences"
      submoduleId="advanced-arithmetic"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}

export default AdvancedArithmeticSlide5;