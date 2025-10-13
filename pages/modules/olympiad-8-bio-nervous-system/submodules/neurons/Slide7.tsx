import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function NeuronsSlide6() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'neuron-function-quiz',
      conceptId: 'neuron-function-understanding',
      conceptName: 'Neuron Function Quiz',
      type: 'judging',
      description: 'Testing understanding of neuron types based on function'
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
      id: 'sensory-neuron-function',
      question: 'What is the primary function of sensory neurons?',
      options: [
        'Carry instructions to muscles and glands',
        'Detect changes in the environment and carry information to the brain and spinal cord',
        'Connect other neurons for integration',
        'Process reflexes in the spinal cord'
      ],
      correctAnswer: 'Detect changes in the environment and carry information to the brain and spinal cord',
      explanation: 'Sensory neurons (afferent) detect environmental changes (stimuli) and carry this information from receptors to the brain and spinal cord for processing.'
    },
    {
      id: 'motor-neuron-structure',
      question: 'What is the typical structural type of motor neurons?',
      options: [
        'Unipolar',
        'Pseudounipolar',
        'Bipolar',
        'Multipolar'
      ],
      correctAnswer: 'Multipolar',
      explanation: 'Motor neurons are generally multipolar in structure, having multiple dendrites and one axon, which allows them to receive inputs from many sources and send commands to muscles and glands.'
    },
    {
      id: 'interneuron-role',
      question: 'What is the crucial role of interneurons in reflex arcs?',
      options: [
        'They detect the initial stimulus',
        'They provide quick responses by connecting sensory and motor neurons',
        'They control muscle contractions directly',
        'They store memories of past reflexes'
      ],
      correctAnswer: 'They provide quick responses by connecting sensory and motor neurons',
      explanation: 'Interneurons are crucial in reflex arcs because they connect sensory neurons with motor neurons inside the brain and spinal cord, enabling quick responses through integration and decision-making.'
    },
    {
      id: 'motor-neuron-axon-connection',
      question: 'In motor neurons, where are the axons typically connected to?',
      options: [
        'Sensory receptors in the skin',
        'Other neurons in the brain',
        'Muscles and glands (effector organs)',
        'Blood vessels and lymph nodes'
      ],
      correctAnswer: 'Muscles and glands (effector organs)',
      explanation: 'Motor neuron axons are connected to effector organs - primarily muscles and glands. This allows them to carry instructions from the brain or spinal cord to produce responses like muscle contractions or glandular secretions.'
    },
    {
      id: 'sensory-neuron-dendrite-connection',
      question: 'In sensory neurons, where are the dendrites typically connected to?',
      options: [
        'Muscles and glands',
        'Other sensory neurons',
        'Sensory receptors that detect stimuli',
        'Motor neurons directly'
      ],
      correctAnswer: 'Sensory receptors that detect stimuli',
      explanation: 'Sensory neuron dendrites are connected to specialized sensory receptors that detect various stimuli like touch, pressure, light, sound, chemicals, etc. This allows them to gather information from the environment and carry it to the central nervous system.'
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
      interactionId: `neuron-function-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'neuron-function-understanding',
      conceptName: 'Neuron Function Quiz',
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

  const neuronTypes = [
    {
      title: 'Sensory Neurons (Afferent)',
      points: [
        'Detect changes in the environment (stimuli) and carry information from receptors to the brain and spinal cord.',
        'Usually pseudounipolar in structure.',
        'Example: neurons in skin receptors (touch, pressure) or retina (light).'
      ],
      color: '#3b82f6'
    },
    {
      title: 'Motor Neurons (Efferent)',
      points: [
        'Carry instructions from the brain or spinal cord to muscles and glands.',
        'Generally multipolar in structure.',
        'Example: spinal motor neurons controlling skeletal muscles.'
      ],
      color: '#10b981'
    },
    {
      title: 'Interneurons (Association Neurons)',
      points: [
        'Connect sensory neurons with motor neurons inside the brain and spinal cord.',
        'Usually multipolar and specialised for integration and decision-making.',
        'Crucial in reflex arcs for quick responses.'
      ],
      color: '#f59e0b'
    }
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Types of Neurons */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              {neuronTypes.map((type, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: type.color }}
                    />
                    <h4 className="font-semibold text-lg">{type.title}</h4>
                  </div>
                  {type.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="ml-7 flex items-start gap-3">
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
          {/* Function Neurons Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Functional Types of Neurons</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/function_neurons.png"
                alt="Diagram showing sensory, motor, and interneurons with their functions"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              Diagram illustrating the three functional types of neurons: sensory neurons (afferent) detecting stimuli, interneurons processing information, and motor neurons (efferent) controlling responses.
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
      slideId="neuron-types-function"
      slideTitle="Types of Neurons (Based on Function)"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="neurons"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}