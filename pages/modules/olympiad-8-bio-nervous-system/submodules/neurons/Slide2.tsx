import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function NeuronsSlide2() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'neuron-structure-quiz',
      conceptId: 'neuron-structure-understanding',
      conceptName: 'Neuron Structure Quiz',
      type: 'judging',
      description: 'Testing understanding of neuron parts and functions'
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
      id: 'dendrites-function',
      question: 'What is the primary function of dendrites?',
      options: [
        'Conduct impulses away from the cell body',
        'Pick up signals from other neurons and carry information toward the cell body',
        'Produce neurotransmitters',
        'Insulate the neuron'
      ],
      correctAnswer: 'Pick up signals from other neurons and carry information toward the cell body',
      explanation: 'Dendrites are branch-like extensions that pick up signals from other neurons or receptors and carry information toward the cell body.'
    },
    {
      id: 'myelin-function',
      question: 'What is the function of the myelin sheath?',
      options: [
        'Store neurotransmitters',
        'Generate nerve impulses',
        'Insulate the axon and allow faster saltatory conduction',
        'Connect neurons together'
      ],
      correctAnswer: 'Insulate the axon and allow faster saltatory conduction',
      explanation: 'The myelin sheath insulates the axon and allows faster, saltatory conduction at the nodes of Ranvier, significantly increasing the speed of nerve impulse transmission.'
    },
    {
      id: 'axon-terminals',
      question: 'What do axon terminals contain?',
      options: [
        'Nucleus and organelles',
        'Myelin sheath',
        'Synaptic vesicles filled with neurotransmitters',
        'Nodes of Ranvier'
      ],
      correctAnswer: 'Synaptic vesicles filled with neurotransmitters',
      explanation: 'Axon terminals contain synaptic vesicles filled with neurotransmitters, which are released at synapses to transmit signals to other neurons or effector organs.'
    }
  ];
  
  const handleInteractionComplete = (response: InteractionResponse) => {
    setLocalInteractions(prev => ({
      ...prev,
      [response.interactionId]: response
    }));
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
      interactionId: `neuron-structure-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'neuron-structure-understanding',
      conceptName: 'Neuron Structure Quiz',
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

  const neuronParts = [
    {
      title: 'Dendrites',
      points: [
        'Branch-like extensions that pick up signals from other neurons or receptors.',
        'Carry information toward the cell body.'
      ],
      color: '#10b981'
    },
    {
      title: 'Cell Body (Soma)',
      points: [
        'Contains the nucleus and key organelles (Golgi body, ER, mitochondria, Nissl granules).',
        'Responsible for the metabolic and synthetic activities of the neuron.'
      ],
      color: '#3b82f6'
    },
    {
      title: 'Axon',
      points: [
        'A long, slender fibre that conducts impulses away from the cell body.',
        'Often surrounded by Schwann cells, which produce the myelin sheath.',
        'Myelin sheath → insulates the axon and allows faster, saltatory conduction at the nodes of Ranvier.'
      ],
      color: '#8b5cf6'
    },
    {
      title: 'Axon Terminals / Nerve Endings',
      points: [
        'The branched endings of an axon.',
        'Contain synaptic vesicles filled with neurotransmitters.',
        'Form synapses with dendrites/cell bodies of other neurons or with effector organs (muscles, glands).'
      ],
      color: '#f59e0b'
    },
    {
      title: 'Synapse',
      points: [
        'The junction between one neuron and the next (or between a neuron and an effector).',
        'Transmission usually occurs through chemical messengers (neurotransmitters).'
      ],
      color: '#ec4899'
    }
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <p className="text-lg leading-relaxed">
              Neurons may differ in shape and size depending on their role and location, but all share the same three basic parts: dendrites, cell body, and axon.
            </p>
          </div>

          {/* Parts of a Neuron */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Parts of a Neuron</h3>
            <div className="space-y-6">
              {neuronParts.map((part, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: part.color }}
                    />
                    <h4 className="font-semibold text-lg">{part.title}</h4>
                  </div>
                  {part.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="ml-7 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-2 flex-shrink-0" />
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Neuron Structure</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/neuron_structure.png"
                alt="Detailed Neuron Structure"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '100%',
                  maxWidth: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Detailed structure of a neuron showing all major components and their relationships.
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
      slideId="neuron-structure"
      slideTitle="Structure of a Neuron"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="neurons"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}