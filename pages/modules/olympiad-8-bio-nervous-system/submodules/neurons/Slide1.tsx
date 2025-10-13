import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function NeuronsSlide1() {
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
      id: 'neuron-basics-quiz',
      conceptId: 'neuron-understanding',
      conceptName: 'Neuron Basics Quiz',
      type: 'judging',
      description: 'Testing understanding of neuron structure and function'
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
      id: 'neuron-definition',
      question: 'What is a neuron?',
      options: [
        'The structural and functional unit of the nervous system',
        'A type of muscle cell',
        'A blood vessel in the brain',
        'A hormone produced by the brain'
      ],
      correctAnswer: 'The structural and functional unit of the nervous system',
      explanation: 'A neuron is the structural and functional unit of the nervous system, specialized to receive, process, and transmit information in the form of electrochemical impulses.'
    },
    {
      id: 'neuron-polarity',
      question: 'What does neuron polarity mean?',
      options: [
        'Information flows in both directions',
        'Information flows only one way (dendrites → soma → axon → synapse)',
        'Neurons can change their shape',
        'Neurons only work in pairs'
      ],
      correctAnswer: 'Information flows only one way (dendrites → soma → axon → synapse)',
      explanation: 'Neuron polarity means information flows in only one direction: from dendrites (input) → soma (cell body) → axon (output) → synapse (connection to next neuron).'
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
      interactionId: `neuron-basics-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'neuron-understanding',
      conceptName: 'Neuron Basics Quiz',
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

  const neuronFeatures = [
    {
      title: 'Polarity',
      description: 'Information flows only one way (dendrites → soma → axon → synapse).',
      color: '#3b82f6'
    },
    {
      title: 'Excitability',
      description: 'They respond to stimuli like light, sound, chemicals, touch.',
      color: '#8b5cf6'
    },
    {
      title: 'Conductivity',
      description: 'They generate and transmit action potentials (nerve impulses).',
      color: '#10b981'
    },
    {
      title: 'Communication',
      description: 'They use both electrical signals (along axons) and chemical signals (at synapses).',
      color: '#f59e0b'
    }
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <p className="text-lg leading-relaxed mb-4">
              A neuron is the structural and functional unit of the nervous system.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              It is specialised to receive, process, and transmit information in the form of electrochemical impulses.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              The human brain, spinal cord, and nerves together contain about 86 billion neurons forming vast communication networks.
            </p>
            <p className="text-lg leading-relaxed">
              Each neuron can connect with thousands of others, allowing complex processing and coordination of information.
            </p>
          </div>

          {/* Why neurons are unique */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Why neurons are unique</h3>
            <div className="space-y-4">
              {neuronFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: feature.color }}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1">{feature.title}:</div>
                      <div className="text-lg text-slate-600 dark:text-slate-400">{feature.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Functional Properties */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Functional Properties of Neurons</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 bg-emerald-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-1">Excitability</div>
                    <div className="text-lg text-slate-600 dark:text-slate-400">ability to detect and respond to stimuli by generating an impulse.</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 bg-orange-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-1">Conductivity</div>
                    <div className="text-lg text-slate-600 dark:text-slate-400">ability to transmit the impulse along the axon without loss of strength.</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 bg-purple-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-1">Synaptic Transmission</div>
                    <div className="text-lg text-slate-600 dark:text-slate-400">ability to pass the signal to other neurons or effectors via chemical/electrical means.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Importance */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30">
              <p className="text-lg text-blue-800 dark:text-blue-300">
                Neurons are the basis of sensation, thought, memory, movement, emotion, and learning.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Neuron Structure</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/neuron.png"
                alt="Neuron Structure Diagram"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              The structure of a typical neuron showing dendrites, cell body (soma), axon, and synapses.
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
      slideId="neurons-basics"
      slideTitle="The Basic Unit of the Nervous System"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="neurons"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}