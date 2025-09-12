import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse, TrackedInteraction } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const quizQuestions = [
  {
    question: "What is the very first, most crucial assumption made in the proof by contradiction for the irrationality of the square root of 2?",
    options: [
      "Assume the square root of 2 is an integer.",
      "Assume the square root of 2 can be written as a simplified fraction p/q.",
      "Assume p and q are both even numbers.",
      "Assume the square root of 2 is equal to 1.414."
    ],
    correctAnswer: 1,
    explanation: "The proof starts by assuming the opposite of what we want to prove. We assume it's rational (a simplified fraction p/q) to show that this assumption leads to an impossibility."
  },
  {
    question: "What is the final contradiction that proves the initial assumption must be false?",
    options: [
      "We find that p=q.",
      "We find that the square root of 2 is negative.",
      "We find that both p and q must have a common factor of 2.",
      "We find that q can be zero."
    ],
    correctAnswer: 2,
    explanation: "The contradiction arises because we assumed p/q had no common factors, but the logical steps forced us to conclude that both p and q must be even, meaning they share a factor of 2."
  },
  {
    question: "Why was this proof so significant to the ancient Greeks?",
    options: [
      "It helped them build better triangles.",
      "It was the first proof to ever use variables.",
      "It was used to calculate the value of Pi.",
      "It shattered their belief that all numbers could be expressed as simple fractions."
    ],
    correctAnswer: 3,
    explanation: "The discovery of irrational numbers was a philosophical shock, proving that their understanding of the universe, built on whole numbers and their ratios, was incomplete."
  }
];

export default function ProvingIrrationalitySlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentStep, setCurrentStep] = useState(0);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<Record<number, { selected: number | null; isCorrect: boolean | null }>>({});

  const { isDarkMode } = useThemeContext();

  const proofSteps = [
    {
      title: "Step 1: The Assumption",
      text: "We begin by assuming the opposite of what we want to prove. Let's assume that the square root of 2 is a rational number. This means it can be written as a fraction p/q in its simplest form, where p and q are integers with no common factors.",
      math: "\\sqrt{2} = \\frac{p}{q}",
      result: null
    },
    {
      title: "Step 2: Eliminate the Root",
      text: "By squaring both sides of the equation, we remove the square root and rearrange the terms.",
      math: "2 = \\frac{p^2}{q^2} \\implies p^2 = 2q^2",
      result: "This shows that p² must be an even number. A key mathematical rule is that if a square is even, the number itself must be even. Therefore, p is even."
    },
    {
      title: "Step 3: A New Substitution",
      text: "Since we've established that p is even, we can express it as 2k for some integer k. Let's substitute this back into our equation.",
      math: "(2k)^2 = 2q^2 \\implies 4k^2 = 2q^2",
      result: "Dividing both sides by 2 gives us q² = 2k². This means q² is also an even number. Therefore, q must also be even."
    },
    {
      title: "Step 4: The Contradiction",
      text: "Our logic has led us to conclude that both p and q must be even. This means they share a common factor of 2. But this directly shatters our initial assumption that the fraction p/q was in its simplest form.",
      math: "\\text{p is even AND q is even}",
      result: "This is a logical contradiction! Our initial assumption must be false."
    },
    {
      title: "Final Conclusion",
      text: "Since our initial, perfectly reasonable assumption led to an impossible conclusion, the assumption itself must be wrong. The only possibility left is that the square root of 2 cannot be a rational number.",
      math: "\\sqrt{2} \\text{ is irrational}",
      result: null
    }
  ];

  const currentStepContent = proofSteps[currentStep];
  const slideInteractions: Interaction[] = [
    { id: 'proving-irrationality-intro', conceptId: 'proving-irrationality', conceptName: 'Proof by Contradiction', type: 'learning', description: 'Understanding the method of proof by contradiction for irrational numbers' },
    { id: 'sqrt2-proof-steps', conceptId: 'proof-of-sqrt2', conceptName: 'Proof for Square Root of 2', type: 'learning', description: 'Following the step-by-step logic to prove the irrationality of sqrt(2)' }
  ];

  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({ ...prev, [response.interactionId]: response }));
  };
  
  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (quizState[questionIndex]) return;

    const isCorrect = quizQuestions[questionIndex].correctAnswer === optionIndex;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setQuizState(prev => ({
      ...prev,
      [questionIndex]: { selected: optionIndex, isCorrect: isCorrect }
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleResetQuiz = () => {
    setScore(0);
    setQuizState({});
    setCurrentQuestionIndex(0);
  };

  const slideContent = (
    <div className={`transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="p-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-6">
            <TrackedInteraction interaction={slideInteractions[0]} onInteractionComplete={handleInteractionComplete}>
              <div className={`rounded-lg p-6 shadow-lg h-full ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">Proof by Contradiction</h3>
                <div className="space-y-4 text-lg">
                  <p className="leading-relaxed">To prove a statement is true, we can use a clever method called **proof by contradiction**. The ancient Greeks found this method both powerful and shocking.</p>
                  <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li>**Assume the Opposite:** Boldly assume the statement is false.</li>
                    <li>**Show a Contradiction:** Follow a path of flawless logic to a result that is impossible.</li>
                    <li>**Conclude:** The only thing wrong must be the initial assumption. Therefore, the original statement is true.</li>
                  </ol>
                  <p className="leading-relaxed mt-4">Legend says **Hippasus** used this to prove <InlineMath math="\sqrt{2}" /> was irrational, shattering the Greek worldview.</p>
                </div>
              </div>
            </TrackedInteraction>
          </div>
          <div className="space-y-6">
            <TrackedInteraction interaction={slideInteractions[1]} onInteractionComplete={handleInteractionComplete}>
              <div className={`rounded-lg p-6 shadow-lg h-full flex flex-col ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-4">Proof for <InlineMath math="\sqrt{2}" /></h3>
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex-grow flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-3">
                    <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50' : 'bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50'}`}>← Previous</button>
                    <h4 className="text-blue-700 dark:text-blue-300 font-medium text-lg flex-grow text-center mx-2">{currentStepContent.title}</h4>
                    <button onClick={() => setCurrentStep(Math.min(proofSteps.length - 1, currentStep + 1))} disabled={currentStep === proofSteps.length - 1} className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-blue-700 hover:bg-blue-600 text-white disabled:opacity-50' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50'}`}>Next →</button>
                  </div>
                  <div className="text-center"><p className="text-slate-700 dark:text-slate-300 leading-relaxed">{currentStepContent.text}</p></div>
                </div>
                <div className={`rounded-lg p-6 text-center transition-colors ${currentStepContent.result ? 'bg-green-100 dark:bg-green-900/80 text-green-800 dark:text-green-200' : 'bg-blue-100 dark:bg-blue-900/20'}`}>
                  <AnimatePresence mode="wait">
                    <motion.div key={currentStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                      <BlockMath math={currentStepContent.math} />
                      {currentStepContent.result && (<p className="mt-4 text-sm font-normal">{currentStepContent.result}</p>)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </TrackedInteraction>
          </div>
          <div className="space-y-6">
            <div className={`rounded-lg p-6 shadow-lg h-full ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
              <h3 className="text-xl font-medium text-teal-600 dark:text-teal-400 mb-4">Key Insights</h3>
              <div className="space-y-6 text-lg">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Why must <InlineMath math="p" /> be even if <InlineMath math="p^2" /> is even?</h4>
                  <p className="leading-relaxed text-base">An **odd** number squared is always **odd** (e.g., <InlineMath math="5^2 = 25" />). Since <InlineMath math="p^2" /> is even, <InlineMath math="p" /> itself cannot possibly be odd. It *must* be even.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">What's the Big Deal? 🤔</h4>
                  <p className="leading-relaxed text-base">For the Pythagoreans, this proof was a catastrophe! Their philosophy was that "All is number," meaning everything could be explained by whole numbers and their ratios. The existence of <InlineMath math="\sqrt{2}"/> shattered their worldview.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-12 rounded-lg p-8 shadow-lg ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <AnimatePresence mode="wait">
            {currentQuestionIndex < quizQuestions.length ? (
              <motion.div key={currentQuestionIndex} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-medium text-blue-600 dark:text-blue-400 mb-2 text-center">Check Your Understanding</h3>
                  <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                  
                  {(() => {
                    const q = quizQuestions[currentQuestionIndex];
                    const state = quizState[currentQuestionIndex];
                    const hasBeenAnswered = state && state.selected !== null;

                    return (
                      <div>
                        <p className="text-xl font-medium mb-4 text-center">{q.question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options.map((option, oIndex) => {
                            let buttonClass = isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300';
                            
                            // THIS IS THE CORRECTED LOGIC BLOCK
                            if (hasBeenAnswered) {
                              if (q.correctAnswer === oIndex) {
                                buttonClass = 'bg-green-600 text-white'; // Correct answer
                              } else if (state.selected === oIndex) {
                                buttonClass = 'bg-red-600 text-white'; // User's incorrect selection
                              }
                            }
                            
                            return <button key={oIndex} onClick={() => handleAnswerSelect(currentQuestionIndex, oIndex)} disabled={!!hasBeenAnswered} className={`p-4 rounded-lg text-left transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed ${buttonClass}`}>{option}</button>;
                          })}
                        </div>
                        {hasBeenAnswered && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                            <div className={`mt-4 p-3 rounded-lg text-base inline-block ${state.isCorrect ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'}`}>
                              <strong>{state.isCorrect ? 'Correct!' : 'Not quite.'}</strong> {q.explanation}
                            </div>
                            <button onClick={handleNextQuestion} className={`mt-4 px-8 py-3 rounded-lg text-white font-bold transition-colors ${isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-500'}`}>
                              {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                            </button>
                          </motion.div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            ) : (
              <motion.div key="score" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">Quiz Complete!</h3>
                <p className="text-xl mb-6">Your final score is:</p>
                <div className="text-6xl font-bold text-green-500 mb-8">{score} / {quizQuestions.length}</div>
                <button onClick={handleResetQuiz} className={`px-8 py-3 rounded-lg text-white font-bold transition-colors ${isDarkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-700 hover:bg-slate-600'}`}>
                  Restart Quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  return <SlideComponentWrapper slideId="proving-irrationality-sqrt2" slideTitle="Proof by Contradiction: √2" moduleId="irrational-numbers" submoduleId="proving-irrationality" interactions={localInteractions}>{slideContent}</SlideComponentWrapper>;
}