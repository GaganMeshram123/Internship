import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function NeuronsSlide5() {
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
      id: 'neuron-types-quiz',
      conceptId: 'neuron-types-understanding',
      conceptName: 'Neuron Types Quiz',
      type: 'judging',
      description: 'Testing understanding of myelinated vs non-myelinated neurons'
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
      id: 'saltatory-conduction',
      question: 'What is saltatory conduction?',
      options: [
        'Impulse travels step by step along the membrane',
        'Impulse "jumps" between nodes of Ranvier in myelinated axons',
        'Impulse moves backward along the axon',
        'Impulse stops at the myelin sheath'
      ],
      correctAnswer: 'Impulse "jumps" between nodes of Ranvier in myelinated axons',
      explanation: 'Saltatory conduction occurs in myelinated axons where the impulse "jumps" between nodes of Ranvier, making conduction much faster (up to 120 m/s) compared to continuous conduction.'
    },
    {
      id: 'white-matter-composition',
      question: 'What makes up white matter in the brain?',
      options: [
        'Bundles of myelinated neuron tracts',
        'Collections of neuron cell bodies',
        'Synapses between neurons',
        'Non-myelinated nerve fibers'
      ],
      correctAnswer: 'Bundles of myelinated neuron tracts',
      explanation: 'White matter consists of bundled myelinated neuron tracts. The white appearance comes from the myelin sheaths, and these neurons carry information over long distances within the brain and spinal cord.'
    },
    {
      id: 'non-myelinated-advantage',
      question: 'What is the main advantage of non-myelinated neurons?',
      options: [
        'They conduct impulses faster',
        'They are cost-effective when speed is not necessary',
        'They can carry information over long distances',
        'They are found only in the brain'
      ],
      correctAnswer: 'They are cost-effective when speed is not necessary',
      explanation: 'Non-myelinated neurons are metabolically cost-effective. When high-speed conduction is not required (like for short-distance communication), they provide an efficient solution without the energy cost of maintaining myelin.'
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
      interactionId: `neuron-types-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'neuron-types-understanding',
      conceptName: 'Neuron Types Quiz',
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
      title: 'Myelinated Neurons',
      description: 'have myelin sheath; conduct impulses rapidly by saltatory conduction; found in cranial and spinal nerves.',
      color: '#3b82f6'
    },
    {
      title: 'Non-Myelinated Neurons',
      description: 'lack myelin; conduction is slower; typical in autonomic nervous system.',
      color: '#10b981'
    }
  ];

  const conductionTypes = [
    {
      title: 'Continuous Conduction',
      description: 'in unmyelinated axons, impulse travels step by step along the membrane; slower (0.5–2 m/s).',
      color: '#f59e0b'
    },
    {
      title: 'Saltatory Conduction',
      description: 'in myelinated axons, impulse "jumps" between nodes of Ranvier; very fast (up to 120 m/s).',
      color: '#8b5cf6'
    }
  ];

  const nonMyelinatedLocations = [
    'Gray Matter: Many non-myelinated neurons are located in the gray matter of the brain, facilitating short-distance communication between local neurons.',
    'Autonomic Nervous System: These fibers are prominent in the autonomic nervous system and are also found in other parts of the central nervous system.'
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Types of Neurons */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              {neuronTypes.map((type, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: type.color }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-1">{type.title}:</div>
                    <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{type.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nerve Impulse Conduction */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Nerve Impulse Conduction</h3>
            <div className="space-y-4 mb-4">
              {conductionTypes.map((type, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div 
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: type.color }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-1">{type.title}:</div>
                    <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{type.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Conduction speed depends on axon diameter, myelination, and temperature.
            </p>
          </div>

          {/* White vs Gray Matter */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">White Matter vs Gray Matter</h3>
            <p className="text-lg leading-relaxed mb-4">
              The brain contains both myelinated and non-myelinated neurons. Myelinated neurons are bundled in "tracts" called <strong>white matter</strong> - white because of the myelin sheaths. These carry information over long distances within the brain and spinal cord.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Unmyelinated neurons are found in <strong>gray matter</strong> (e.g., basal ganglia), facilitating short-distance communication between local neurons. They have both inhibitory and excitatory roles throughout the brain.
            </p>
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <p className="text-lg text-green-800 dark:text-green-300">
                <strong>Advantage:</strong> Non-myelinated neurons are cost-effective - when speed is not necessary, they provide efficient communication without the metabolic cost of maintaining myelin.
              </p>
            </div>
          </div>

          {/* Where Non-Myelinated Neurons Are Found */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Where Non-Myelinated Neurons Are Found</h3>
            <div className="space-y-3">
              {nonMyelinatedLocations.map((location, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Images and Quiz */}
        <div className="space-y-6">
          {/* First Image - Myelinated vs Non-myelinated */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Myelinated vs Non-Myelinated Neurons</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/myelinated_vs_nonmyelinated.png"
                alt="Comparison of myelinated and non-myelinated neurons"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '100%',
                  maxWidth: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              Comparison showing myelinated neurons (with white myelin sheaths for fast conduction) and non-myelinated neurons (slower but cost-effective). White matter contains myelinated tracts, while gray matter contains synapses and cell bodies.
            </p>
          </div>

          {/* Second Image - Signal Jump */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Saltatory Conduction</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/signal_jump.png"
                alt="Saltatory conduction showing signal jumping between nodes of Ranvier"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '100%',
                  maxWidth: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              Saltatory conduction: the nerve impulse "jumps" from node to node along myelinated axons, achieving speeds up to 120 m/s compared to 0.5-2 m/s in unmyelinated neurons.
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
      slideId="neuron-types-myelination"
      slideTitle="Types of Neurons (Based on Myelination)"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="neurons"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}