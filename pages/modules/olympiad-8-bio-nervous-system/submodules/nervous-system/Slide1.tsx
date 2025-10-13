import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function NervousSystemSlide1() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [functionExplorationCount, setFunctionExplorationCount] = useState<number>(0);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'nervous-system-exploration',
      conceptId: 'nervous-system-concept',
      conceptName: 'Nervous System Function Exploration',
      type: 'learning',
      description: 'Understanding nervous system functions through interactive exploration'
    },
    {
      id: 'function-selection',
      conceptId: 'function-selection-concept',
      conceptName: 'Function Selection and Learning',
      type: 'learning',
      description: 'Exploring different nervous system functions'
    },
    {
      id: 'nervous-system-quiz',
      conceptId: 'nervous-system-understanding',
      conceptName: 'Nervous System Quiz',
      type: 'judging',
      description: 'Testing understanding of nervous system functions'
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
      id: 'homeostasis-cooperation',
      question: 'How do the nervous and endocrine systems work together to maintain homeostasis?',
      options: [
        'Only through electrical impulses',
        'Only through hormones',
        'Both electrical impulses and hormones working together',
        'They work independently'
      ],
      correctAnswer: 'Both electrical impulses and hormones working together',
      explanation: 'The nervous and endocrine systems work together - the nervous system provides rapid, short-lived control through electrical impulses, while the endocrine system provides slower, long-lasting regulation through hormones.'
    },
    {
      id: 'cns-components',
      question: 'Which nervous system component includes the brain and spinal cord?',
      options: [
        'Central Nervous System (CNS)',
        'Peripheral Nervous System (PNS)',
        'Autonomic Nervous System',
        'Somatic Nervous System'
      ],
      correctAnswer: 'Central Nervous System (CNS)',
      explanation: 'The Central Nervous System (CNS) consists of the brain and spinal cord, which are the main processing centers of the nervous system.'
    }
  ];
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
  };

  const nervousSystemFunctions = {
    detection: { 
      title: 'Detects Stimuli', 
      description: 'Detects stimuli such as light, sound, temperature, pressure, and chemicals through specialized receptors.',
      color: '#3b82f6',
      icon: '👁️'
    },
    processing: { 
      title: 'Processes Information', 
      description: 'Processes this information in the brain and spinal cord to determine appropriate responses.',
      color: '#8b5cf6',
      icon: '🧠'
    },
    voluntary: { 
      title: 'Coordinates Voluntary Actions', 
      description: 'Coordinates voluntary actions like walking, writing, and speaking through conscious control.',
      color: '#10b981',
      icon: '🚶'
    },
    involuntary: { 
      title: 'Regulates Involuntary Actions', 
      description: 'Regulates involuntary actions such as heartbeat, breathing, and digestion automatically.',
      color: '#f59e0b',
      icon: '❤️'
    },
    higher: { 
      title: 'Higher Functions', 
      description: 'Enables higher functions including learning, memory, emotions, problem-solving, and reasoning.',
      color: '#ec4899',
      icon: '🎓'
    }
  };

  const handleFunctionSelection = (functionKey: string) => {
    setSelectedFunction(functionKey);
    setFunctionExplorationCount(prev => prev + 1);
    
    handleInteractionComplete({
      interactionId: 'function-selection',
      value: functionExplorationCount + 1,
      timestamp: Date.now(),
      conceptId: 'function-selection-concept',
      conceptName: 'Function Selection and Learning',
      conceptDescription: `Selected ${nervousSystemFunctions[functionKey as keyof typeof nervousSystemFunctions].title} for exploration`
    });
  };

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
      interactionId: `nervous-system-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'nervous-system-understanding',
      conceptName: 'Nervous System Quiz',
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

  const currentFunction = selectedFunction ? nervousSystemFunctions[selectedFunction as keyof typeof nervousSystemFunctions] : null;

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content and Interactive Elements */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <p className="text-lg leading-relaxed mb-4">
              The nervous system is the body's main control and communication network.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              It gathers information from the environment, processes it, and directs the body to make an appropriate response.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Works with the Endocrine System</h4>
              <p className="text-lg mb-2">
                <strong>Nervous system:</strong> provides rapid but short-lived control through electrical impulses.
              </p>
              <p className="text-lg">
                <strong>Endocrine system:</strong> provides slower but long-lasting regulation through hormones.
              </p>
            </div>
            <p className="text-lg leading-relaxed">
              Together, they maintain the body's stable internal environment (homeostasis).
            </p>
          </div>

          {/* Function Explorer */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Major Functions</h3>
            <div className="grid grid-cols-1 gap-3 mb-4">
              {Object.entries(nervousSystemFunctions).map(([key, func]) => (
                <div
                  key={key}
                  className="p-4 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: func.color }}
                    >
                      {func.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{func.title}</div>
                      <div className="text-lg text-slate-600 dark:text-slate-400">{func.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Nervous System Image */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Complete Nervous System</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/full_nervous_system.png"
                alt="Complete Nervous System Anatomy"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The nervous system includes the brain, spinal cord, and peripheral nerves that extend throughout the body.
            </p>
          </div>

          {/* Additional Info Panel */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Key Components</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                <div className="font-medium text-purple-600 dark:text-purple-400">Central Nervous System (CNS)</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Brain and spinal cord - the main processing centers</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                <div className="font-medium text-green-600 dark:text-green-400">Peripheral Nervous System (PNS)</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">All nerves outside the CNS - connects body to brain</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                <div className="font-medium text-orange-600 dark:text-orange-400">Autonomic System</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Controls involuntary functions like heartbeat and breathing</div>
              </div>
            </div>
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
      slideId="nervous-system-introduction"
      slideTitle="Introduction to Nervous System"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="nervous-system"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}