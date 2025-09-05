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

interface AdvancedGeometricSlide2Props {}

function AdvancedGeometricSlide2({}: AdvancedGeometricSlide2Props) {
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
      id: 'find-index-of-term',
      question: 'Given that a geometric sequence has a₁ = 4, r = 3, and aₙ = 108, what is the value of n?',
      options: [
        '3',
        '4', 
        '5',
        '6',
        '8'
      ],
      correctAnswer: '4',
      explanation: 'Using aₙ = a₁ · r^(n-1): 108 = 4 · 3^(n-1). Dividing both sides by 4: 27 = 3^(n-1). Since 27 = 3³, we have 3^(n-1) = 3³, so n-1 = 3, therefore n = 4.'
    },
    {
      id: 'find-index-complex',
      question: 'Given that a geometric sequence has a₁ = 3, r = 2, and aₙ = 24, what is the value of n?',
      options: [
        '2',
        '3',
        '4', 
        '5',
        '6'
      ],
      correctAnswer: '4',
      explanation: 'Using aₙ = a₁ · r^(n-1): 24 = 3 · 2^(n-1). Dividing by 3: 8 = 2^(n-1). Since 8 = 2³, we have 2^(n-1) = 2³, so n-1 = 3, therefore n = 4.'
    },
    {
      id: 'find-index-from-two-terms',
      question: 'Given that a positive geometric sequence has a₃ = 12, a₅ = 3, and aₖ = 48, what is the value of k?',
      options: [
        '1',
        '2',
        '3',
        '4',
        '6'
      ],
      correctAnswer: '1',
      explanation: 'First find r: r² = a₅/a₃ = 3/12 = 1/4, so r = 1/2. Find a₁: a₃ = a₁r², so 12 = a₁(1/4), giving a₁ = 48. Now find k where aₖ = 48: since a₁ = 48, we have k = 1.'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  // Handle completion of an interaction
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
      interactionId: `advanced-geometric-indices-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answer,
      isCorrect: correct,
      timestamp: Date.now(),
      conceptId: 'geometric-index-finding',
      conceptName: 'Finding Index and Position of Terms',
      conceptDescription: `Testing: ${currentQuestion.id === 'logarithmic-insight' ? 'Understanding exponential equation solving for indices' : currentQuestion.id === 'hard-index-transcendental' ? 'Complex transcendental equation analysis' : 'Advanced geometric sequence optimization proofs'}`,
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
        
        {/* Left Column - Theory and Methods */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Index Finding Strategy
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                To find which position n contains a specific term value:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <BlockMath math="a_n = a_1 \cdot r^{n-1} = \text{target value}" />
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Solve this equation for n using algebraic techniques.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Solution Techniques
            </h3>
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="font-medium text-blue-700 dark:text-blue-300">Method 1: Perfect Powers</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">When r^(n-1) equals a recognizable power</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="font-medium text-blue-700 dark:text-blue-300">Method 2: Logarithms</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">When direct power recognition isn't possible</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="font-medium text-blue-700 dark:text-blue-300">Method 3: System solving</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">When multiple unknowns are involved</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Advanced Transcendental Cases
            </h3>
            <div className="space-y-3">
              <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg">
                <p className="font-medium text-orange-700 dark:text-orange-300">Irrational Bases</p>
                <p className="text-sm">When r = e^(π/4) or similar transcendental values</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                <p className="font-medium text-purple-700 dark:text-purple-300">Numerical Methods</p>
                <p className="text-sm">When exact solutions require approximation</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Key Insight
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              The explicit formula transforms the index-finding problem from sequential computation into direct algebraic solution.
            </p>
          </div>
        </div>

        {/* Right Column - Worked Examples */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Example: Finding Index of a Known Term
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="font-medium text-black dark:text-white">
                  Find n where aₙ = 96 in sequence: 3, 6, 12, 24, ...
                </p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    Step 1: Identify sequence parameters
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                    <p><InlineMath math="a_1 = 3, r = 2" /></p>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    Step 2: Set up equation
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                    <BlockMath math="96 = 3 \cdot 2^{n-1}" />
                    <BlockMath math="32 = 2^{n-1}" />
                  </div>
                </div>

                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">
                    Step 3: Solve for n
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                    <p>Since <InlineMath math="32 = 2^5" />:</p>
                    <BlockMath math="2^{n-1} = 2^5 \Rightarrow n-1 = 5" />
                    <BlockMath math="n = 6" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Example: Complex System Solution
            </h3>
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <p className="font-medium text-black dark:text-white">
                  Given a₃ = 12, a₅ = 3, find k where aₖ = 48
                </p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    Step 1: Find common ratio
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                    <BlockMath math="r^2 = \frac{a_5}{a_3} = \frac{3}{12} = \frac{1}{4}" />
                    <BlockMath math="r = \frac{1}{2}" />
                  </div>
                </div>

                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    Step 2: Find first term
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                    <p>Using <InlineMath math="a_3 = a_1 \cdot r^2" />:</p>
                    <BlockMath math="12 = a_1 \cdot \left(\frac{1}{2}\right)^2 = \frac{a_1}{4}" />
                    <BlockMath math="a_1 = 48" />
                  </div>
                </div>

                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    Step 3: Find index k
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                    <BlockMath math="48 = 48 \cdot \left(\frac{1}{2}\right)^{k-1}" />
                    <BlockMath math="1 = \left(\frac{1}{2}\right)^{k-1} \Rightarrow k-1 = 0" />
                    <BlockMath math="k = 1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h4 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Verification Strategy
            </h4>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
              <p className="text-purple-700 dark:text-purple-300">
                Always verify your answer by substituting back into the original formula to ensure the computed index gives the correct term value.
              </p>
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
                        Advanced Challenge
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
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
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
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
                      ? "Perfect! You've mastered advanced geometric sequence index finding."
                      : score >= questions.length * 0.7
                      ? "Excellent work! You have a strong understanding of geometric indices."
                      : score >= questions.length * 0.5
                      ? "Good effort! Review the concepts and try again."
                      : "Keep practicing! Index finding in geometric sequences takes time to master."}
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
      slideId="advanced-geometric-indices"
      slideTitle="Finding Index and Position of Terms"
      moduleId="sequences"
      submoduleId="advanced-geometric"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}

export default AdvancedGeometricSlide2;