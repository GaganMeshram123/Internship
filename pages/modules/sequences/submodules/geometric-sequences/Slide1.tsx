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

interface GeometricSequencesSlide1Props {}

function GeometricSequencesSlide1({}: GeometricSequencesSlide1Props) {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | undefined>(undefined);

  const questions: QuizQuestion[] = [
    {
      id: 'geometric-identification',
      question: 'Why does the sequence 2, 6, 18, 54, ... demonstrate exponential rather than linear growth patterns?',
      options: [
        'Each term is 3 times larger than the previous term, creating multiplicative growth',
        'The differences between consecutive terms increase by a constant amount',
        'The sequence follows the pattern aₙ = 2 + 4n for exponential relationships',
        'Linear sequences cannot have ratios greater than 2 between consecutive terms'
      ],
      correctAnswer: 'Each term is 3 times larger than the previous term, creating multiplicative growth',
      explanation: 'This is geometric because each term is found by multiplying the previous term by the constant ratio r = 3. The growth is exponential: 2, 2×3, 2×3², 2×3³, ..., which creates the distinctive curved growth pattern of geometric sequences.'
    },
    {
      id: 'ratio-analysis',
      question: 'In the sequence 5, -15, 45, -135, ..., what mathematical insight explains both the magnitude growth and the alternating signs?',
      options: [
        'The sequence has two separate patterns: multiplication by 3 and sign alternation',
        'A single common ratio r = -3 simultaneously controls both growth and sign changes',
        'Negative sequences require different mathematical rules than positive sequences',
        'The alternating pattern indicates this is arithmetic rather than geometric'
      ],
      correctAnswer: 'A single common ratio r = -3 simultaneously controls both growth and sign changes',
      explanation: 'The common ratio r = -3 elegantly handles both aspects: the magnitude |r| = 3 creates exponential growth, while the negative sign creates alternation. Each term equals the previous term times (-3), unifying growth and sign pattern in one operation.'
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
      interactionId: `geometric-introduction-quiz-q${currentQuestionIndex + 1}-${currentQuestion.id}`,
      value: answer,
      isCorrect: correct,
      timestamp: Date.now(),
      conceptId: 'geometric-sequences',
      conceptName: 'Introduction to Geometric Sequences',
      conceptDescription: `Testing: ${currentQuestion.id === 'geometric-identification' ? 'Understanding exponential vs linear growth' : 'Analyzing negative common ratios'}`,
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
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">What is a Geometric Sequence?</h3>
            <p className="text-lg leading-relaxed mb-4">
              A geometric sequence is formed by multiplying each term by a fixed constant called the common ratio to get the next term.
            </p>
            <p className="text-lg leading-relaxed">
              Unlike arithmetic sequences that grow by addition, geometric sequences grow by multiplication, creating exponential patterns.
            </p>
          </div>

          {/* Pattern Recognition */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Pattern Recognition</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
                <p className="text-lg font-semibold mb-2">Example: Positive Growth</p>
                <div className="text-center mb-3">
                  <InlineMath math="3, 9, 27, 81, 243, ..." />
                </div>
                <div className="flex justify-center space-x-8 text-sm">
                  <span>×3</span>
                  <span>×3</span>
                  <span>×3</span>
                  <span>×3</span>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Common Ratio:</p>
                <div className="text-center">
                  <InlineMath math="r = \frac{a_{n+1}}{a_n} = \frac{9}{3} = 3" />
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">Example: Alternating Sequence</p>
                <div className="text-center mb-3">
                  <InlineMath math="4, -12, 36, -108, ..." />
                </div>
                <div className="text-center">
                  <InlineMath math="r = \frac{-12}{4} = -3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Examples, Applications, and Quiz */}
        <div className="space-y-6">
          
          {/* Worked Example */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Worked Example: Finding Terms</h3>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <p className="text-lg font-semibold mb-2">Find the 7th term: 1, 2, 4, 8, ...</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-lg mb-2 font-medium">Step 1: Identify the pattern</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p>Each term doubles: <InlineMath math="r = 2" /></p>
                  <p>First term: <InlineMath math="a_1 = 1" /></p>
                </div>
              </div>
              
              <div>
                <p className="text-lg mb-2 font-medium">Step 2: Continue the pattern</p>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                  <p><InlineMath math="a_5 = 8 \times 2 = 16" /></p>
                  <p><InlineMath math="a_6 = 16 \times 2 = 32" /></p>
                  <p><InlineMath math="a_7 = 32 \times 2 = 64" /></p>
                </div>
              </div>
              
              <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
                <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                  Answer: <InlineMath math="a_7 = 64" />
                </p>
              </div>
            </div>
          </div>

          {/* Key Properties */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Key Properties</h3>
            
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium mb-1">Multiplicative Growth</p>
                <p className="text-sm">Each term is previous term × common ratio</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium mb-1">Exponential Pattern</p>
                <p className="text-sm">Values grow (or decay) exponentially, not linearly</p>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="font-medium mb-1">Constant Ratio</p>
                <p className="text-sm"><InlineMath math="\frac{a_n}{a_{n-1}}" /> is the same for all terms</p>
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
      slideId="geometric-introduction"
      slideTitle="Introduction to Geometric Sequences"
      moduleId="sequences"
      submoduleId="geometric-sequences"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}

export default GeometricSequencesSlide1;