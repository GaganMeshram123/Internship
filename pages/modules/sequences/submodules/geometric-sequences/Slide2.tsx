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

interface GeometricSequencesSlide2Props {}

function GeometricSequencesSlide2({}: GeometricSequencesSlide2Props) {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | undefined>(undefined);

  const questions: QuizQuestion[] = [
    {
      id: 'solve-for-variable',
      question: 'Given that x, 2x, and 24 are the first three terms of a geometric sequence, find x.',
      options: [
        '2',
        '3',
        '4',
        '6',
        '8'
      ],
      correctAnswer: '6',
      explanation: 'In a geometric sequence, the ratio between consecutive terms is constant. So 2x/x = 24/(2x). Simplifying: 2 = 24/(2x) = 12/x. Therefore 2x = 12, so x = 6. Check: 6, 12, 24 has common ratio r = 2 throughout.'
    },
    {
      id: 'find-common-ratio',
      question: 'Find the common ratio of the following geometric sequence: 90, -30, 10, -10/3, ...',
      options: [
        '-1/3',
        '1/3',
        '-3',
        '3',
        '-1/2'
      ],
      correctAnswer: '-1/3',
      explanation: 'The common ratio r = a₂/a₁ = (-30)/90 = -1/3. We can verify: 10/(-30) = -1/3 and (-10/3)/10 = -1/3. All consecutive ratios equal -1/3.'
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
      interactionId: `geometric-common-ratio-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answer,
      isCorrect: correct,
      timestamp: Date.now(),
      conceptId: 'common-ratio-finding',
      conceptName: 'Finding Common Ratios in Geometric Sequences',
      conceptDescription: `Testing: ${currentQuestion.id === 'variable-solving-insight' ? 'Variable solving using constant ratio property' : 'Distinguishing geometric from arithmetic sequences'}`,
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
        
        {/* Left Column - Methods and Theory */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Finding Common Ratios</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-2">Formula:</p>
                <div className="text-center">
                  <BlockMath math="r = \frac{a_{n+1}}{a_n}" />
                </div>
              </div>
              <p className="text-lg">
                The common ratio is found by dividing any term by the previous term. This ratio remains constant throughout the sequence.
              </p>
            </div>
          </div>

          {/* Sequence Classification */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Identifying Geometric Sequences</h3>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-2 text-green-700 dark:text-green-300">✓ Geometric:</p>
                <p className="mb-2"><InlineMath math="2, 8, 32, 128, ..." /></p>
                <div className="text-sm">
                  <p>Ratios: <InlineMath math="\frac{8}{2} = 4, \frac{32}{8} = 4, \frac{128}{32} = 4" /></p>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-2 text-red-700 dark:text-red-300">✗ Not Geometric:</p>
                <p className="mb-2"><InlineMath math="3, 6, 12, 15, ..." /></p>
                <div className="text-sm">
                  <p>Ratios: <InlineMath math="\frac{6}{3} = 2, \frac{12}{6} = 2, \frac{15}{12} = 1.25" /></p>
                </div>
              </div>
            </div>
          </div>

          {/* Variable Solving Method */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Solving for Variables</h3>
            <div className="space-y-3">
              <p className="text-lg">When variables appear in geometric sequences:</p>
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium mb-2">Step 1: Set up ratio equations</p>
                <p className="font-medium mb-2">Step 2: Use the constant ratio property</p>
                <p className="font-medium mb-2">Step 3: Solve the resulting equation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Worked Examples */}
        <div className="space-y-6">
          
          {/* Complex Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Example: Solving for Variables</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Find x: 4, 2x, 4x</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Set up ratios</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p>First ratio: <InlineMath math="r_1 = \frac{2x}{4} = \frac{x}{2}" /></p>
                  <p>Second ratio: <InlineMath math="r_2 = \frac{4x}{2x} = 2" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Set ratios equal</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <BlockMath math="\frac{x}{2} = 2" />
                </div>
              </div>

              <div>
                <p className="text-lg mb-2 font-medium">Step 3: Solve</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="x = 4" /></p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Sequence: 4, 8, 16 with <InlineMath math="r = 2" />
                </p>
              </div>
            </div>
          </div>

          {/* Common Ratio Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Common Ratio Patterns</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-2">Growth (<InlineMath math="r > 1" />):</p>
                <p><InlineMath math="1, 3, 9, 27, ..." /> where <InlineMath math="r = 3" /></p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-2">Decay (<InlineMath math="0 < r < 1" />):</p>
                <p><InlineMath math="16, 8, 4, 2, ..." /> where <InlineMath math="r = \frac{1}{2}" /></p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <p className="font-semibold mb-2">Alternating (<InlineMath math="r < 0" />):</p>
                <p><InlineMath math="5, -10, 20, -40, ..." /> where <InlineMath math="r = -2" /></p>
              </div>
            </div>
          </div>

          {/* Strategy Box */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Key Strategy</h3>
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <p className="font-semibold mb-2">Always verify your answer!</p>
              <p className="text-sm">
                After finding variables, substitute back and check that all consecutive ratios are equal.
              </p>
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
      slideId="geometric-common-ratio"
      slideTitle="Finding Common Ratios"
      moduleId="sequences"
      submoduleId="geometric-sequences"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}

export default GeometricSequencesSlide2;