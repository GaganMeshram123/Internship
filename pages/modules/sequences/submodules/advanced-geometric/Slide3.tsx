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

interface AdvancedGeometricSlide3Props {}

function AdvancedGeometricSlide3({}: AdvancedGeometricSlide3Props) {
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
      id: 'transform-to-geometric',
      question: 'Given the recurrence relation c₁ = 7 and cₙ₊₁ = 2cₙ + 3, what constant should be added to both sides to create a geometric sequence?',
      options: [
        '2',
        '3',
        '5', 
        '6',
        '9'
      ],
      correctAnswer: '3',
      explanation: 'Adding 3 to both sides: cₙ₊₁ + 3 = 2cₙ + 3 + 3 = 2(cₙ + 3). Let dₙ = cₙ + 3, then dₙ₊₁ = 2dₙ, which is geometric with ratio r = 2.'
    },
    {
      id: 'find-transformed-sequence',
      question: 'After transforming c₁ = 7, cₙ₊₁ = 2cₙ + 3 into a geometric sequence dₙ = cₙ + 3, what is the first term d₁ and common ratio r?',
      options: [
        'd₁ = 7, r = 2',
        'd₁ = 10, r = 2',
        'd₁ = 10, r = 3',
        'd₁ = 13, r = 2',
        'd₁ = 7, r = 3'
      ],
      correctAnswer: 'd₁ = 10, r = 2',
      explanation: 'd₁ = c₁ + 3 = 7 + 3 = 10. From the transformation dₙ₊₁ = 2dₙ, the common ratio r = 2.'
    },
    {
      id: 'find-original-term',
      question: 'Using the transformation above, find c₅ in the original sequence.',
      options: [
        '157',
        '160',
        '163',
        '167',
        '170'
      ],
      correctAnswer: '157',
      explanation: 'First find d₅: d₅ = d₁ · r⁴ = 10 · 2⁴ = 10 · 16 = 160. Then c₅ = d₅ - 3 = 160 - 3 = 157.'
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
      interactionId: `advanced-geometric-transformation-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answer,
      isCorrect: correct,
      timestamp: Date.now(),
      conceptId: 'sequence-transformation',
      conceptName: 'Transforming Sequences to Geometric Progressions',
      conceptDescription: `Testing: ${currentQuestion.id === 'transform-to-geometric' ? 'Finding the correct transformation constant' : currentQuestion.id === 'find-transformed-sequence' ? 'Understanding the transformed sequence parameters' : 'Applying transformation to find original terms'}`,
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
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Non-Geometric Sequences</h3>
            <div className="space-y-4">
              <p className="text-lg">
                Some sequences look like they might be geometric, but they're not. However, we can often transform them into geometric sequences through clever substitutions.
              </p>
              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-3 text-red-700 dark:text-red-300">Example of Non-Geometric:</p>
                <div className="text-center">
                  <BlockMath math="c_1 = 7, \quad c_{n+1} = 2c_n + 3" />
                </div>
                <p className="text-lg mt-2">This isn't geometric because of the +3 term</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Transformation Technique</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="font-medium text-blue-700 dark:text-blue-300 mb-2">Step 1: Find the Right Constant</p>
                <p className="text-lg">For <InlineMath math="c_{n+1} = 2c_n + 3" />, we have <InlineMath math="r = 2, k = 3" /></p>
                <p className="text-lg">We need: <InlineMath math="x = \frac{k}{r-1} = \frac{3}{2-1} = 3" /></p>
                <BlockMath math="c_{n+1} + 3 = 2c_n + 3 + 3 = 2(c_n + 3)" />
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <p className="font-medium text-green-700 dark:text-green-300 mb-2">Step 2: Define New Sequence</p>
                <p className="text-lg">Let <InlineMath math="d_n = c_n + 3" />. Then:</p>
                <BlockMath math="d_{n+1} = 2d_n" />
                <p className="text-lg">This IS geometric with ratio r = 2!</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">General Pattern</h3>
            
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium mb-2">For recurrence: <InlineMath math="a_{n+1} = ra_n + k" /></p>
                <p className="text-lg">We need to find <InlineMath math="x" /> such that adding <InlineMath math="x" /> creates a geometric sequence.</p>
                <p className="text-lg">We want: <InlineMath math="a_{n+1} + x = r(a_n + x)" /></p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium mb-2">Expanding the desired form:</p>
                <BlockMath math="a_{n+1} + x = ra_n + rx" />
                <p className="text-lg">But we know <InlineMath math="a_{n+1} = ra_n + k" />, so:</p>
                <BlockMath math="ra_n + k + x = ra_n + rx" />
                <BlockMath math="k + x = rx" />
                <BlockMath math="x = \frac{k}{r-1}" />
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <p className="font-medium mb-2 text-green-700 dark:text-green-300">Solution:</p>
                <p className="text-lg">Let <InlineMath math="b_n = a_n + \frac{k}{r-1}" /></p>
                <p className="text-lg">Then <InlineMath math="b_{n+1} = rb_n" /> (geometric with ratio <InlineMath math="r" />)</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Why This Works</h3>
            
            <div className="space-y-3">
              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
                <p className="text-lg">
                  The constant term <InlineMath math="k" /> prevents the sequence from being geometric. We need to find the right "shift" that balances the equation.
                </p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="font-medium">Key insight:</p>
                <p className="text-lg">In our example, when we add 3 to both sides:</p>
                <p className="text-lg">• Left side gets: <InlineMath math="c_{n+1} + 3" /></p>
                <p className="text-lg">• Right side gets: <InlineMath math="2c_n + 3 + 3 = 2c_n + 6 = 2(c_n + 3)" /></p>
                <p className="text-lg">The formula <InlineMath math="x = \frac{k}{r-1} = \frac{3}{2-1} = 3" /> ensures this balance!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Examples and Quiz */}
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Complete Worked Example</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="font-medium text-black dark:text-white">
                Given: c₁ = 7 and cₙ₊₁ = 2cₙ + 3. Find c₅.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">
                  Step 1: Transform to geometric sequence
                </p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                  <p>Let <InlineMath math="d_n = c_n + 3" /></p>
                  <p>Then <InlineMath math="d_{n+1} = c_{n+1} + 3 = (2c_n + 3) + 3 = 2c_n + 6 = 2(c_n + 3) = 2d_n" /></p>
                </div>
              </div>

              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">
                  Step 2: Find parameters of geometric sequence
                </p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                  <p><InlineMath math="d_1 = c_1 + 3 = 7 + 3 = 10" /></p>
                  <p><InlineMath math="r = 2" /></p>
                  <p>So <InlineMath math="d_n = 10 \cdot 2^{n-1}" /></p>
                </div>
              </div>

              <div>
                <p className="font-medium text-blue-700 dark:text-blue-300">
                  Step 3: Find d₅ then convert back
                </p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg mt-2">
                  <BlockMath math="d_5 = 10 \cdot 2^{5-1} = 10 \cdot 2^4 = 10 \cdot 16 = 160" />
                  <BlockMath math="c_5 = d_5 - 3 = 160 - 3 = 157" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Verification</h3>
            
            <div className="space-y-3">
              <p className="font-medium">Let's verify by computing the first few terms directly:</p>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p><InlineMath math="c_1 = 7" /></p>
                <p><InlineMath math="c_2 = 2(7) + 3 = 17" /></p>
                <p><InlineMath math="c_3 = 2(17) + 3 = 37" /></p>
                <p><InlineMath math="c_4 = 2(37) + 3 = 77" /></p>
                <p><InlineMath math="c_5 = 2(77) + 3 = 157" /> ✓</p>
              </div>
              
              <p className="font-medium">And the transformed sequence dₙ:</p>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p><InlineMath math="d_1 = 10, d_2 = 20, d_3 = 40, d_4 = 80, d_5 = 160" /></p>
                <p className="text-lg text-green-600 dark:text-green-400">Perfect geometric progression with r = 2!</p>
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
                        Transformation Practice
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
                      ? "Perfect! You've mastered sequence transformation techniques."
                      : score >= questions.length * 0.7
                      ? "Excellent! You understand how to transform sequences to geometric progressions."
                      : score >= questions.length * 0.5
                      ? "Good work! Practice more transformation problems."
                      : "Keep practicing! Sequence transformation is a powerful advanced technique."}
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
      slideId="advanced-geometric-transformation"
      slideTitle="Transforming Sequences to Geometric Progressions"
      moduleId="sequences"
      submoduleId="advanced-geometric"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}

export default AdvancedGeometricSlide3;