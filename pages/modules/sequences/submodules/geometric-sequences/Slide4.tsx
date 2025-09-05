import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

interface GeometricSequencesSlide4Props {}

function GeometricSequencesSlide4({}: GeometricSequencesSlide4Props) {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | undefined>(undefined);

  const questions: QuizQuestion[] = [
    {
      id: 'find-nth-term',
      question: 'The first term of a geometric sequence is 4, and the common ratio is 3. What is the 6th term?',
      options: [
        '324',
        '972',
        '728',
        '486',
        '1458'
      ],
      correctAnswer: '972',
      explanation: 'Using the formula aₙ = a₁ · r^(n-1) with a₁ = 4, r = 3, n = 6: a₆ = 4 · 3^(6-1) = 4 · 3⁵ = 4 · 243 = 972.'
    },
    {
      id: 'find-formula-from-term',
      question: 'Find the formula for the nth term of a geometric sequence if the fourth term is -1/8 and the common ratio is -1/2.',
      options: [
        'aₙ = (-1/8) · (-1/2)^(n-1)',
        'aₙ = 1 · (-1/2)^(n-1)', 
        'aₙ = -1 · (1/2)^(n-1)',
        'aₙ = (1/4) · (-2)^(n-1)',
        'aₙ = 2 · (-1/4)^(n-1)'
      ],
      correctAnswer: 'aₙ = 1 · (-1/2)^(n-1)',
      explanation: 'Given a₄ = -1/8 and r = -1/2. Using aₙ = a₁ · r^(n-1): a₄ = a₁ · (-1/2)³ = a₁ · (-1/8). So -1/8 = a₁ · (-1/8), giving a₁ = 1. Therefore aₙ = 1 · (-1/2)^(n-1).'
    },
    {
      id: 'find-specific-term',
      question: 'If the fifth term of a geometric sequence is 1/16, and the common ratio is 1/2, then the eighth term is:',
      options: [
        '1/32',
        '1/64',
        '1/128', 
        '1/256',
        '1/512'
      ],
      correctAnswer: '1/128',
      explanation: 'From a₅ to a₈ is 3 steps. Using aₙ = a₅ · r^(n-5): a₈ = (1/16) · (1/2)³ = (1/16) · (1/8) = 1/128.'
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

    handleInteractionComplete({
      interactionId: `geometric-nth-terms-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answer,
      isCorrect: correct,
      timestamp: Date.now(),
      conceptId: 'explicit-formulas',
      conceptName: 'Explicit Formulas and Nth Terms',
      conceptDescription: `Testing: ${currentQuestion.id === 'explicit-power-insight' ? 'Understanding exponent structure in explicit formulas' : 'Working backwards with explicit formulas'}`,
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
    }
  };

  const slideContent = (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Formulas and Theory */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Explicit Formula Structure</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-3">General Form:</p>
                <div className="text-center">
                  <BlockMath math="a_n = a_1 \cdot r^{n-1}" />
                </div>
                <div className="mt-3 text-sm space-y-1">
                  <p>• <InlineMath math="a_n" />: the nth term</p>
                  <p>• <InlineMath math="a_1" />: the first term</p>
                  <p>• <InlineMath math="r" />: the common ratio</p>
                  <p>• <InlineMath math="n" />: the position/index</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formula Construction */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Building the Formula</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium mb-2">From sequence to formula:</p>
                <div className="space-y-2">
                  <p><InlineMath math="a_1 = a_1 \cdot r^0 = a_1 \cdot 1" /></p>
                  <p><InlineMath math="a_2 = a_1 \cdot r^1 = a_1 \cdot r" /></p>
                  <p><InlineMath math="a_3 = a_1 \cdot r^2" /></p>
                  <p><InlineMath math="a_4 = a_1 \cdot r^3" /></p>
                  <p>⋮</p>
                  <p><InlineMath math="a_n = a_1 \cdot r^{n-1}" /></p>
                </div>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Formula Applications</h3>
            
            <div className="space-y-3">
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                <p className="font-medium text-green-700 dark:text-green-300">Find any term directly</p>
                <p className="text-sm">No need to calculate previous terms</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="font-medium text-blue-700 dark:text-blue-300">Solve for unknowns</p>
                <p className="text-sm">Find a₁, r, or n when others are known</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                <p className="font-medium text-purple-700 dark:text-purple-300">Compare sequences</p>
                <p className="text-sm">Analyze growth rates and patterns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Worked Examples */}
        <div className="space-y-6">
          
          {/* Complex Example 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Finding the 9th Term</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Find a₉ for sequence: 2, 6, 18, 54, ...</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Identify components</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_1 = 2" /></p>
                  <p><InlineMath math="r = \frac{6}{2} = 3" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Apply formula</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_9 = a_1 \cdot r^{9-1} = 2 \cdot 3^8" /></p>
                </div>
              </div>

              <div>
                <p className="text-lg mb-2 font-medium">Step 3: Calculate</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="3^8 = 6561" /></p>
                  <p><InlineMath math="a_9 = 2 \cdot 6561 = 13122" /></p>
                </div>
              </div>
            </div>
          </div>

          {/* Complex Example 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Working Backwards</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Find formula if a₆ = 80 and r = -2</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Set up equation</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="80 = a_1 \cdot (-2)^{6-1}" /></p>
                  <p><InlineMath math="80 = a_1 \cdot (-2)^5" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Evaluate exponent</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="(-2)^5 = -32" /></p>
                  <p><InlineMath math="80 = a_1 \cdot (-32)" /></p>
                </div>
              </div>

              <div>
                <p className="text-lg mb-2 font-medium">Step 3: Solve for a₁</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_1 = \frac{80}{-32} = -2.5" /></p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Formula: <InlineMath math="a_n = -2.5 \cdot (-2)^{n-1}" />
                </p>
              </div>
            </div>
          </div>

          {/* Formula Advantages */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Why Explicit Formulas?</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-2 text-green-700 dark:text-green-300">Direct Access</p>
                <p className="text-sm">Find a₁₀₀ without computing a₁ through a₉₉</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Algebraic Power</p>
                <p className="text-sm">Solve equations to find missing parameters</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Pattern Analysis</p>
                <p className="text-sm">Understand exponential growth/decay behavior</p>
              </div>
            </div>
          </div>

          {/* Quick Check */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  Quick Check
                </h3>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentQuestionIndex + 1} of {questions.length}
                </span>
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
                  
                  {currentQuestionIndex < questions.length - 1 && (
                    <button
                      onClick={nextQuestion}
                      className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Next Question
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="geometric-nth-terms"
      slideTitle="Explicit Formulas and Nth Terms"
      moduleId="sequences"
      submoduleId="geometric-sequences"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}

export default GeometricSequencesSlide4;