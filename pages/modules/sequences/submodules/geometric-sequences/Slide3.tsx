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

interface GeometricSequencesSlide3Props {}

function GeometricSequencesSlide3({}: GeometricSequencesSlide3Props) {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | undefined>(undefined);

  const questions: QuizQuestion[] = [
    {
      id: 'find-recursive-formula',
      question: 'Consider the following geometric sequence: 100, 80, 64, ... The recursive formula is aₙ₊₁ = __ · aₙ, a₁ = __',
      options: [
        'aₙ₊₁ = 0.8aₙ, a₁ = 100',
        'aₙ₊₁ = 0.2aₙ, a₁ = 100',
        'aₙ₊₁ = 20aₙ, a₁ = 100',
        'aₙ₊₁ = 1.25aₙ, a₁ = 80',
        'aₙ₊₁ = 0.64aₙ, a₁ = 100'
      ],
      correctAnswer: 'aₙ₊₁ = 0.8aₙ, a₁ = 100',
      explanation: 'The common ratio r = 80/100 = 0.8. We can verify: 64/80 = 0.8. So the recursive formula is aₙ₊₁ = 0.8aₙ with a₁ = 100.'
    },
    {
      id: 'another-recursive-formula',
      question: 'Consider the geometric sequence: 243, -162, 108, ... The recursive formula is aₙ₊₁ = __ · aₙ, a₁ = __',
      options: [
        'aₙ₊₁ = -2/3 · aₙ, a₁ = 243',
        'aₙ₊₁ = 2/3 · aₙ, a₁ = 243', 
        'aₙ₊₁ = -3/2 · aₙ, a₁ = 243',
        'aₙ₊₁ = 1.5aₙ, a₁ = -162',
        'aₙ₊₁ = -0.67aₙ, a₁ = 243'
      ],
      correctAnswer: 'aₙ₊₁ = -2/3 · aₙ, a₁ = 243',
      explanation: 'The common ratio r = (-162)/243 = -2/3. We can verify: 108/(-162) = -2/3. So the recursive formula is aₙ₊₁ = (-2/3)aₙ with a₁ = 243.'
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
      interactionId: `geometric-recursive-formulas-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answer,
      isCorrect: correct,
      timestamp: Date.now(),
      conceptId: 'recursive-formulas',
      conceptName: 'Recursive Formulas for Geometric Sequences',
      conceptDescription: `Testing: ${currentQuestion.id === 'recursive-vs-explicit' ? 'Understanding algorithmic advantages of recursive formulas' : 'Analyzing decay patterns in recursive form'}`,
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
        
        {/* Left Column - Theory */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Recursive Formula Structure</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-3">General Form:</p>
                <div className="text-center space-y-2">
                  <BlockMath math="a_{n+1} = r \cdot a_n" />
                  <BlockMath math="a_1 = \text{first term}" />
                </div>
              </div>
              <p className="text-lg">
                The recursive formula shows how to get from any term to the next term by multiplying by the common ratio r.
              </p>
            </div>
          </div>

          {/* Step-by-step Process */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Building a Recursive Formula</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium mb-2">Step 1: Find the common ratio</p>
                <p className="text-sm">Calculate <InlineMath math="r = \frac{a_2}{a_1}" /></p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium mb-2">Step 2: Identify the first term</p>
                <p className="text-sm">Note the value of <InlineMath math="a_1" /></p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium mb-2">Step 3: Write the formula</p>
                <p className="text-sm"><InlineMath math="a_{n+1} = r \cdot a_n" /> with <InlineMath math="a_1 = \text{value}" /></p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium mb-2">Step 4: Specify domain</p>
                <p className="text-sm">Include <InlineMath math="n \geq 1" /></p>
              </div>
            </div>
          </div>

          {/* Types of Recursive Patterns */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Common Patterns</h3>
            
            <div className="space-y-3">
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                <p className="font-medium text-green-700 dark:text-green-300">Growth: <InlineMath math="r > 1" /></p>
                <p className="text-sm"><InlineMath math="a_{n+1} = 3a_n" /> (tripling)</p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg">
                <p className="font-medium text-orange-700 dark:text-orange-300">Decay: <InlineMath math="0 < r < 1" /></p>
                <p className="text-sm"><InlineMath math="a_{n+1} = 0.5a_n" /> (halving)</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                <p className="font-medium text-purple-700 dark:text-purple-300">Alternating: <InlineMath math="r < 0" /></p>
                <p className="text-sm"><InlineMath math="a_{n+1} = -2a_n" /> (double & flip)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Examples */}
        <div className="space-y-6">
          
          {/* Detailed Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Creating a Formula</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Find recursive formula: 2, 6, 18, 54, ...</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Calculate ratio</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="r = \frac{6}{2} = 3" /></p>
                  <p className="text-sm">Verify: <InlineMath math="\frac{18}{6} = 3, \frac{54}{18} = 3" /> ✓</p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Identify first term</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_1 = 2" /></p>
                </div>
              </div>

              <div>
                <p className="text-lg mb-2 font-medium">Step 3: Complete formula</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <BlockMath math="a_{n+1} = 3a_n" />
                  <BlockMath math="a_1 = 2, \quad n \geq 1" />
                </div>
              </div>
            </div>
          </div>

          {/* Formula Testing */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Testing the Formula</h3>
            
            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg mb-4">
              <p className="font-semibold mb-2">Using <InlineMath math="a_{n+1} = 3a_n, a_1 = 2" />:</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                <span><InlineMath math="a_2 = 3 \cdot a_1 = 3 \cdot 2 = 6" /></span>
                <span className="text-green-600">✓</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                <span><InlineMath math="a_3 = 3 \cdot a_2 = 3 \cdot 6 = 18" /></span>
                <span className="text-green-600">✓</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                <span><InlineMath math="a_4 = 3 \cdot a_3 = 3 \cdot 18 = 54" /></span>
                <span className="text-green-600">✓</span>
              </div>
            </div>
          </div>

          {/* Comparison Box */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Recursive vs Sequential</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                <p className="font-semibold mb-1 text-green-700 dark:text-green-300">Recursive Formula Benefits:</p>
                <ul className="text-sm space-y-1">
                  <li>• Clear, systematic rule</li>
                  <li>• Easy to program/compute</li>
                  <li>• Shows relationship between terms</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg">
                <p className="font-semibold mb-1 text-orange-700 dark:text-orange-300">Sequential Limitations:</p>
                <ul className="text-sm space-y-1">
                  <li>• Must compute all previous terms</li>
                  <li>• More prone to arithmetic errors</li>
                  <li>• Less efficient for large n</li>
                </ul>
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
      slideId="geometric-recursive-formulas"
      slideTitle="Recursive Formulas for Geometric Sequences"
      moduleId="sequences"
      submoduleId="geometric-sequences"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}

export default GeometricSequencesSlide3;