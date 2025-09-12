import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import { TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function IrrationalSumPropertiesSlide() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [showQuizFeedback, setShowQuizFeedback] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const { isDarkMode } = useThemeContext();

  const slideInteractions: Interaction[] = [
    {
      id: 'irrational-sum-intro',
      conceptId: 'irrational-sum-intro',
      conceptName: 'Irrational Sum Properties',
      type: 'learning',
      description: 'Exploring the sum of irrational numbers and how it can be rational or irrational'
    },
    {
      id: 'sum-examples',
      conceptId: 'sum-examples-visualization',
      conceptName: 'Sum Examples Visualization',
      type: 'learning',
      description: 'Interactive visualization of various irrational number sums'
    },
    {
      id: 'irrational-sum-quiz',
      conceptId: 'irrational-sum-understanding',
      conceptName: 'Irrational Sum Properties Quiz',
      type: 'judging',
      description: 'Testing understanding of irrational sum properties'
    }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions((prev: Record<string, InteractionResponse>) => ({ ...prev, [response.interactionId]: response }));
  };

  const questions = [
    {
      id: 'sum-rational-irrational',
      question: '\\text{The sum of a rational number and an irrational number is always...}',
      options: [
        { text: '\\text{Rational}', isCorrect: false },
        { text: '\\text{Irrational}', isCorrect: true },
        { text: '\\text{Either rational or irrational}', isCorrect: false },
        { text: '\\text{Zero}', isCorrect: false }
      ],
      explanation: 'The sum of a rational and an irrational number always results in an irrational number. The rational part cannot cancel out the infinite, non-repeating decimal.'
    },
    {
      id: 'irrational-minus-irrational',
      question: '\\text{What is the result of } (\\sqrt{5} + 3) - \\sqrt{5}\\text{?}',
      options: [
        { text: '\\text{An irrational number}', isCorrect: false },
        { text: '\\text{A rational number}', isCorrect: true },
        { text: '\\text{Cannot be determined}', isCorrect: false },
        { text: '\\text{A negative number}', isCorrect: false }
      ],
      explanation: 'The result simplifies to `3`, which is a rational number. This shows that the difference of two irrationals can be rational.'
    },
    {
      id: 'product-irrational',
      question: '\\text{Is the product of two irrational numbers, such as } \\sqrt{2} \\cdot \\sqrt{8}, \\text{ always irrational?}',
      options: [
        { text: '\\text{Yes, it is always irrational.}', isCorrect: false },
        { text: '\\text{No, it can be rational.}', isCorrect: true },
        { text: '\\text{Only if the numbers are the same.}', isCorrect: false },
        { text: '\\text{The result is always 2.}', isCorrect: false }
      ],
      explanation: 'No, the product of two irrationals can be rational. For example, $\\sqrt{2} \\cdot \\sqrt{8} = \\sqrt{16} = 4$, which is a rational number.'
    },
    {
      id: 'quotient-irrational',
      question: '\\text{Which of the following expressions results in a rational number?}',
      options: [
        { text: '$\\sqrt{12} / \\sqrt{3}$', isCorrect: true },
        { text: '$\\sqrt{10} / \\sqrt{5}$', isCorrect: false },
        { text: '$\\sqrt{7} + \\sqrt{7}$', isCorrect: false },
        { text: '$\\pi / \\pi^2$', isCorrect: false }
      ],
      explanation: 'The expression $\\sqrt{12} / \\sqrt{3}$ simplifies to $\\sqrt{12/3} = \\sqrt{4} = 2$, which is a rational number.'
    },
    {
      id: 'pi-e-sum',
      question: '\\text{The sum of } \\pi + e \\text{ is...}',
      options: [
        { text: '\\text{Rational}', isCorrect: false },
        { text: '\\text{Irrational}', isCorrect: true },
        { text: '\\text{Equal to a whole number}', isCorrect: false },
        { text: '\\text{Not possible to determine}', isCorrect: false }
      ],
      explanation: "The sum of $\\pi$ (Pi) and $e$ (Euler's number) is an irrational number. While the sum of two irrationals *can* be rational, in this specific case, it remains irrational."
    },
    {
      id: 'rational-plus-irrational-true-false',
      question: '\\text{True or False: The sum of a rational number and an irrational number can sometimes be a rational number.}',
      options: [
        { text: '\\text{True}', isCorrect: false },
        { text: '\\text{False}', isCorrect: true }
      ],
      explanation: 'False. The sum of a rational and an irrational number is always irrational. The rational part cannot cancel out the non-repeating, non-terminating decimal of the irrational part.'
    },
    {
      id: 'complex-sum',
      question: '\\text{Evaluate the expression } (\\sqrt{7} - 1) + (3 - \\sqrt{7})\\text{.}',
      options: [
        { text: '$2 - 2\\sqrt{7}$', isCorrect: false },
        { text: '$2$', isCorrect: true },
        { text: '$2\\sqrt{7} - 2$', isCorrect: false },
        { text: '$-2$', isCorrect: false }
      ],
      explanation: 'By simplifying the expression, the two $\\sqrt{7}$ terms cancel each other out, leaving you with $-1 + 3$, which equals $2$.'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleQuizAnswer = (answerText: string) => {
    setSelectedQuizAnswer(answerText);
    setShowQuizFeedback(true);

    const correctOption = currentQuestion.options.find(o => o.isCorrect);
    const isCorrect = answerText === correctOption?.text;

    if (!questionsAnswered[currentQuestionIndex]) {
      const newQuestionsAnswered = [...questionsAnswered];
      newQuestionsAnswered[currentQuestionIndex] = true;
      setQuestionsAnswered(newQuestionsAnswered);

      if (isCorrect) {
        setScore(score + 1);
      }
    }

    const response: InteractionResponse = {
      interactionId: `quiz-${currentQuestion.id}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: currentQuestion.id,
      conceptName: 'Irrational Sum Properties Quiz',
      conceptDescription: 'Testing understanding of irrational sum properties',
      question: {
        type: 'mcq',
        question: currentQuestion.question,
        options: currentQuestion.options.map(o => o.text)
      }
    };

    handleInteractionComplete(response);
  };

  const handleNextQuestion = () => {
    setSelectedQuizAnswer(null);
    setShowQuizFeedback(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const sumExamples = [
    {
      title: "Case 1: Irrational + Irrational = Rational",
      description: "The sum of two irrational numbers can be rational if their irrational parts cancel.",
      math: "(5 + \\sqrt{3}) + (2 - \\sqrt{3}) = 7",
      resultType: "Rational"
    },
    {
      title: "Case 2: Irrational + Irrational = Irrational",
      description: "This is the more common case when the irrational parts do not cancel out.",
      math: "\\sqrt{2} + \\sqrt{3} \\approx 3.14626...",
      resultType: "Irrational"
    },
    {
      title: "Case 3: Rational + Irrational = Irrational",
      description: "The sum of a rational and an irrational number is always irrational.",
      math: "4 + \\pi \\approx 7.14159...",
      resultType: "Irrational"
    }
  ];

  const currentExample = sumExamples[currentExampleIndex];
  
  const slideContent = (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-slate-50 text-slate-800'
    }`}>
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Theory and Quiz */}
        <div className="space-y-6">
          <TrackedInteraction 
            interaction={slideInteractions[0]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800' 
                : 'bg-white'
            }`}>
              <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">
                Properties of Irrational Sums
              </h3>
              <div className="space-y-4 text-base">
                <p className="leading-relaxed">
                  When we perform operations with irrational numbers, the results can be counter-intuitive. Unlike integers or rational numbers, the set of irrational numbers is <strong>not closed</strong> under addition or subtraction. This means that adding two irrational numbers doesn't guarantee an irrational result.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Key Cases to Consider</h5>
                  <ul className="space-y-3">
                    <li>
                      <strong>1. Irrational ± Irrational = Rational</strong>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        This occurs when the irrational parts are equal and opposite, causing them to cancel out.
                        <br />
                        <em>Example: <InlineMath math="(10 + \sqrt{5}) + (3 - \sqrt{5}) = 13" /></em>
                      </p>
                    </li>
                    <li>
                      <strong>2. Irrational ± Irrational = Irrational</strong>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        This is the more common outcome when the irrational parts do not cancel.
                        <br />
                        <em>Example: <InlineMath math="5\sqrt{7} - 2\sqrt{7} = 3\sqrt{7}" /></em>
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
                  <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">A Special Rule: The Unbreakable Irrational</h5>
                  <p>
                    <strong>Rational ± Irrational = Always Irrational</strong>
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    <strong>Why?</strong> An irrational number has an infinite, non-repeating decimal. Adding a rational number only alters the digits but can never resolve the non-repeating pattern.
                    <br />
                    <em>Example: <InlineMath math="5 + \pi \approx 8.14159..." /></em>
                  </p>
                </div>
              </div>
            </div>
          </TrackedInteraction>

          {/* Quiz */}
          <TrackedInteraction 
            interaction={slideInteractions[2]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800' 
                : 'bg-white'
            }`}>
              <h4 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">Quick Check</h4>
              
              <div className="space-y-4">
                {isQuizComplete ? (
                  <div className="text-center">
                    <h5 className="text-lg font-medium mb-4">Quiz Complete!</h5>
                    <p className="text-lg mb-4">
                      You scored {score} out of {questions.length} questions correctly.
                    </p>
                    <button
                      onClick={() => {
                        setCurrentQuestionIndex(0);
                        setSelectedQuizAnswer(null);
                        setShowQuizFeedback(false);
                        setQuestionsAnswered([]);
                        setScore(0);
                        setIsQuizComplete(false);
                      }}
                      className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Restart Quiz
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Score: {score}/{questionsAnswered.filter(Boolean).length}
                      </p>
                    </div>
                    
                    <p className="text-lg">
                      <InlineMath math={currentQuestion.question} />
                    </p>
                    
                    <div className="space-y-2">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(option.text)}
                          disabled={showQuizFeedback}
                          className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-lg border-2 ${
                            selectedQuizAnswer === option.text
                              ? option.isCorrect
                                ? 'border-green-500 bg-green-100 dark:bg-green-900'
                                : 'border-red-500 bg-red-100 dark:bg-red-900'
                              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600'
                          }`}
                        >
                          <InlineMath math={option.text} />
                        </button>
                      ))}
                    </div>
                    
                    {showQuizFeedback && (
                      <div className={`mt-4 p-3 rounded-lg ${
                        selectedQuizAnswer === currentQuestion.options.find(o => o.isCorrect)?.text
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {selectedQuizAnswer === currentQuestion.options.find(o => o.isCorrect)?.text ? (
                          <p>✅ Correct! {currentQuestion.explanation}</p>
                        ) : (
                          <p>❌ Not quite. {currentQuestion.explanation}</p>
                        )}
                        <button
                          onClick={handleNextQuestion}
                          className="mt-3 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                          {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Complete Quiz'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </TrackedInteraction>
        </div>

        {/* Right Column - Summary Visualization */}
        <div className="space-y-6">
          <TrackedInteraction 
            interaction={slideInteractions[1]} 
            onInteractionComplete={handleInteractionComplete}
          >
            <div className={`rounded-lg p-6 shadow-lg ${
              isDarkMode 
                ? 'bg-slate-800' 
                : 'bg-white'
            }`}>
              <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">Interactive Sums and Differences</h3>
              
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <button
                    onClick={() => setCurrentExampleIndex(Math.max(0, currentExampleIndex - 1))}
                    disabled={currentExampleIndex === 0}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50'
                    }`}
                  >
                    ← Previous
                  </button>
                  
                  <h4 className="text-blue-700 dark:text-blue-300 font-medium text-center">
                    {currentExample?.title}
                  </h4>
                  
                  <button
                    onClick={() => setCurrentExampleIndex(Math.min(sumExamples.length - 1, currentExampleIndex + 1))}
                    disabled={currentExampleIndex === sumExamples.length - 1}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-blue-700 hover:bg-blue-600 text-white disabled:opacity-50'
                        : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'
                    }`}
                  >
                    Next →
                  </button>
                </div>
                
                <div className="text-center">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentExample?.description}
                  </p>
                </div>
              </div>

              <div className={`mt-6 rounded-lg p-6 text-center text-3xl font-bold transition-colors ${
                currentExample?.resultType === 'Rational'
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentExampleIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BlockMath math={currentExample?.math} />
                  </motion.div>
                </AnimatePresence>
                <p className={`mt-4 text-sm font-normal ${
                    currentExample?.resultType === 'Rational'
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}>
                    Result is <strong>{currentExample?.resultType}</strong>
                </p>
              </div>
            </div>
          </TrackedInteraction>

          {/* === NEW SECTION ADDED HERE === */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-700 rounded-lg px-6 py-4 shadow-sm">
              <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Deeper Dive: What Does "Not Closed" Mean?</h5>
              <div className="text-base text-gray-700 dark:text-gray-300 space-y-2">
                  <p>
                      Think of a box labeled <strong>"Integers."</strong> If you add any two numbers from the box (e.g., 2 + 5 = 7), the result is always another integer inside the box. The set is <strong>closed</strong>.
                  </p>
                  <p>
                      The box for <strong>"Irrational Numbers"</strong> is <strong>not closed</strong> because sometimes the result escapes! When you add <InlineMath math="(5 + \sqrt{3})"/> and <InlineMath math="(2 - \sqrt{3})"/>, the result is 7—a rational number that is outside the "Irrational Numbers" box.
                  </p>
              </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper
      slideId="irrational-sum-properties"
      slideTitle="Properties of Irrational Sums"
      moduleId="irrational-numbers"
      submoduleId="sum"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}