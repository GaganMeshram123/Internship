import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function NervousSystemSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'reflex-arc-quiz',
      conceptId: 'reflex-arc-understanding',
      conceptName: 'Reflex Arc Quiz',
      type: 'judging',
      description: 'Testing understanding of reflex arc characteristics'
    }
  ];

  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  const questions: QuizQuestion[] = [
    {
      id: 'reflex-speed',
      question: 'Why is a reflex arc faster than a normal stimulus-response pathway?',
      options: [
        'It bypasses the brain for faster response',
        'It uses stronger muscles',
        'It has fewer neurons involved',
        'It only works during emergencies'
      ],
      correctAnswer: 'It bypasses the brain for faster response',
      explanation: 'Reflex arcs are faster because they bypass conscious brain processing. The spinal cord handles the response directly, and the brain is informed afterward.'
    },
    {
      id: 'reflex-purpose',
      question: 'What is the main purpose of reflex actions?',
      options: [
        'To save energy',
        'To protect the body from injury or harm',
        'To improve coordination',
        'To strengthen muscles'
      ],
      correctAnswer: 'To protect the body from injury or harm',
      explanation: 'Reflex actions are designed to provide immediate protection from potential harm without waiting for conscious decision-making, which could be too slow in dangerous situations.'
    }
  ];
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const reflexSteps = [
    {
      step: 1,
      title: 'Stimulus',
      description: 'e.g., touching a hot object',
      color: '#3b82f6'
    },
    {
      step: 2,
      title: 'Receptor',
      description: 'skin detects heat/pain',
      color: '#3b82f6'
    },
    {
      step: 3,
      title: 'Sensory Neuron',
      description: 'carries impulse to spinal cord',
      color: '#3b82f6'
    },
    {
      step: 4,
      title: 'Interneuron',
      description: 'in the spinal cord processes the signal',
      color: '#3b82f6'
    },
    {
      step: 5,
      title: 'Motor Neuron',
      description: 'carries command from spinal cord',
      color: '#3b82f6'
    },
    {
      step: 6,
      title: 'Effector',
      description: 'muscle produces rapid response (hand withdraws)',
      color: '#3b82f6'
    }
  ];

  const reflexFeatures = [
    'Very fast and involuntary – does not require conscious thought',
    'Protects the body from injury or harm',
    'The brain is informed afterward (you feel the pain after the reflex is complete)'
  ];

  const reflexExamples = [
    'Knee-jerk reflex',
    'Blinking',
    'Withdrawal from sharp objects',
    'Withdrawal from hot objects'
  ];

  const handleQuizAnswer = (answerText: string) => {
    if (showFeedback || isQuizComplete) return;

    setSelectedAnswer(answerText);
    setShowFeedback(true);

    const current = questions[currentQuestionIndex];
    const isCorrect = answerText === current.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    handleInteractionComplete({
      interactionId: `reflex-arc-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'reflex-arc-understanding',
      conceptName: 'Reflex Arc Quiz',
      conceptDescription: `Answer to question ${currentQuestionIndex + 1}`,
      question: {
        type: 'mcq',
        question: current.question,
        options: current.options
      }
    });
  };

  const handleNextQuestion = () => {
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

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <p className="text-lg leading-relaxed mb-4">
              A reflex arc is a special type of stimulus–response pathway designed for quick, automatic actions.
            </p>
            <p className="text-lg leading-relaxed">
              It bypasses conscious brain involvement to ensure immediate protection.
            </p>
          </div>

          {/* Reflex Arc Steps */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Steps in the Pathway</h3>
            <div className="space-y-4">
              {reflexSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-1">{step.title}</div>
                    <div className="text-lg text-slate-600 dark:text-slate-400">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Features</h3>
            <div className="space-y-3">
              {reflexFeatures.map((feature, index) => (
                <div key={index} className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                  <div className="text-lg text-blue-800 dark:text-blue-300">{feature}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Examples</h3>
            <div className="grid grid-cols-2 gap-3">
              {reflexExamples.map((example, index) => (
                <div key={index} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600">
                  <div className="text-lg font-medium">{example}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Reflex Arc Pathway</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/reflex_arc.png"
                alt="Reflex Arc Diagram"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '100%',
                  maxWidth: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The reflex arc pathway showing how signals bypass the brain for rapid responses.
            </p>
          </div>

          {/* Knowledge Check Quiz */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex space-x-2 mb-6">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500'
                      : questionsAnswered[index]
                      ? 'bg-green-500'
                      : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {!isQuizComplete ? (
              <>
                <div className="text-lg mb-4">{questions[currentQuestionIndex].question}</div>

                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, idx) => {
                    const disabled = showFeedback;
                    const selected = selectedAnswer === option;
                    const correct = option === questions[currentQuestionIndex].correctAnswer;
                    const className = `w-full p-3 rounded-lg text-left transition-all border-2 ${
                      selected
                        ? showFeedback
                          ? correct
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                          : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-300'
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
                        {option}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`mt-4 p-4 rounded-lg ${
                        selectedAnswer === questions[currentQuestionIndex].correctAnswer
                          ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                          : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                      }`}
                    >
                      {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? (
                        <div>
                          <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Correct!</div>
                          <div className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                            {questions[currentQuestionIndex].explanation}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="font-semibold text-red-700 dark:text-red-300 mb-2">Not quite right.</div>
                          <div className="text-lg text-red-600 dark:text-red-400 mb-2">
                            The correct answer is: {questions[currentQuestionIndex].correctAnswer}
                          </div>
                          <div className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                            {questions[currentQuestionIndex].explanation}
                          </div>
                        </div>
                      )}

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
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="text-3xl mb-4">🎉</div>
                <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Quiz Complete!</div>
                <div className="text-lg text-slate-600 dark:text-slate-400">
                  You scored {score} out of {questions.length}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  {score === questions.length ? 'Perfect score! 🌟' : score >= questions.length * 0.7 ? 'Great job! 👏' : 'Keep practicing! 💪'}
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
      slideId="reflex-arc"
      slideTitle="Reflex Arc"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="nervous-system"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}