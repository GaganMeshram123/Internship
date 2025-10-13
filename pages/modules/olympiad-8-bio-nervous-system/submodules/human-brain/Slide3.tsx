import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function HumanBrainSlide3() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  const questions: QuizQuestion[] = [
    {
      id: 'cerebrum-structure',
      question: 'How is the cerebrum structurally organized?',
      options: [
        'Single hemisphere with no divisions',
        'Three hemispheres connected by nerves',
        'Two hemispheres connected by the corpus callosum',
        'Four separate lobes with no connections'
      ],
      correctAnswer: 'Two hemispheres connected by the corpus callosum',
      explanation: 'The cerebrum is divided into two hemispheres (left and right) that are connected by a bundle of nerve fibers called the corpus callosum, allowing communication between the hemispheres.'
    },
    {
      id: 'brain-surface-features',
      question: 'What are the folds and grooves on the brain surface called?',
      options: [
        'Dendrites and axons',
        'Gyri and sulci',
        'Lobes and ventricles',
        'Neurons and glia'
      ],
      correctAnswer: 'Gyri and sulci',
      explanation: 'The brain surface has gyri (folds) and sulci (grooves). These features significantly increase the surface area of the cerebral cortex, allowing for more neurons and greater processing capacity.'
    },
    {
      id: 'motor-cortex-function',
      question: 'What is the primary function of the motor cortex?',
      options: [
        'Processing sensory information',
        'Controlling voluntary actions',
        'Storing memories',
        'Regulating emotions'
      ],
      correctAnswer: 'Controlling voluntary actions',
      explanation: 'The motor cortex is responsible for controlling voluntary actions and movements. It sends signals through the nervous system to muscles to initiate and coordinate purposeful movements.'
    },
    {
      id: 'association-areas-role',
      question: 'What do association areas in the cerebrum do?',
      options: [
        'Only process visual information',
        'Only control muscle movement',
        'Integrate sensory and motor information',
        'Only store long-term memories'
      ],
      correctAnswer: 'Integrate sensory and motor information',
      explanation: 'Association areas integrate sensory and motor information, allowing for complex cognitive functions like reasoning, decision-making, and coordinated responses that require input from multiple brain regions.'
    },
    {
      id: 'broca-area-function',
      question: 'Which lobe contains Broca\'s area and what is its function?',
      options: [
        'Temporal lobe - speech understanding',
        'Frontal lobe - speech production',
        'Parietal lobe - sensory processing',
        'Occipital lobe - visual processing'
      ],
      correctAnswer: 'Frontal lobe - speech production',
      explanation: 'Broca\'s area is located in the frontal lobe and is responsible for speech production. Damage to this area can result in difficulty forming words and sentences, although comprehension remains intact.'
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
      interactionId: `cerebrum-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'cerebrum-understanding',
      conceptName: 'Cerebrum Quiz',
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

  const cerebrumFeatures = [
    {
      title: 'Structure',
      points: [
        'Largest part of the forebrain; divided into two hemispheres connected by the corpus callosum.',
        'Surface has gyri (folds) and sulci (grooves) → increases surface area.'
      ],
      color: '#3b82f6'
    },
    {
      title: 'Functions',
      points: [
        'Controls voluntary actions (motor cortex).',
        'Processes sensory input (somatosensory cortex).',
        'Handles reasoning, memory, intelligence, personality, decision-making.',
        'Association areas integrate sensory and motor information.'
      ],
      color: '#10b981'
    }
  ];

  const functionalLobes = [
    {
      title: 'Frontal Lobe',
      points: [
        'Reasoning, planning, voluntary movement, personality; Broca\'s area (speech production).'
      ],
      color: '#ef4444'
    },
    {
      title: 'Parietal Lobe',
      points: [
        'Processes sensory input (touch, pain, temperature) and spatial orientation.'
      ],
      color: '#f59e0b'
    },
    {
      title: 'Temporal Lobe',
      points: [
        'Hearing, memory, language comprehension; Wernicke\'s area (speech understanding, overlaps temporal + parietal).'
      ],
      color: '#8b5cf6'
    },
    {
      title: 'Occipital Lobe',
      points: [
        'Dedicated to visual processing.'
      ],
      color: '#06b6d4'
    }
  ];

  const corpusCallosumInfo = [
    {
      title: 'Corpus Callosum',
      points: [
        'The largest bundle of white matter fibers in the brain.',
        'Connects the left and right cerebral hemispheres, enabling them to communicate and coordinate.',
        'Integrates sensory, motor, and cognitive information between hemispheres.',
        'Important for coordinated bimanual tasks (e.g., using both hands together).'
      ],
      color: '#6366f1'
    }
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Cerebrum Features */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              {cerebrumFeatures.map((feature, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: feature.color }}
                    />
                    <h4 className="font-semibold text-lg">{feature.title}</h4>
                  </div>
                  {feature.points.map((point, pointIndex) => (
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

          {/* Functional Lobes */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Functional Lobes of the Cerebrum</h3>
            <div className="space-y-4">
              {functionalLobes.map((lobe, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: lobe.color }}
                    />
                    <h5 className="font-semibold text-lg">{lobe.title}</h5>
                  </div>
                  {lobe.points.map((point, pointIndex) => (
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

          {/* Corpus Callosum Information */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-4">
              {corpusCallosumInfo.map((info, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: info.color }}
                    />
                    <h4 className="font-semibold text-lg">{info.title}</h4>
                  </div>
                  {info.points.map((point, pointIndex) => (
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

        {/* Right Column - Images and Quiz */}
        <div className="space-y-6">
          {/* Cerebrum Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Cerebrum Structure</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/cerebrum.png"
                alt="Anatomical diagram of the cerebrum showing hemispheres, gyri, and sulci"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              Brain overview showing cerebrum, cerebellum and brainstem marked for size comparison.
            </p>
          </div>

          {/* Functional Lobes Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Functional Lobes</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/functional_lobes_cerebrum.png"
                alt="Lateral view of the cerebrum showing the four functional lobes: frontal, parietal, temporal, and occipital"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              Lateral view of the cerebrum showing the four functional lobes: frontal (reasoning, movement), parietal (sensory), temporal (hearing, memory), and occipital (vision).
            </p>
          </div>

          {/* Corpus Callosum Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/corpuscallosum.png"
                alt="Cross-sectional view showing the corpus callosum connecting the two cerebral hemispheres"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              Anatomical view of the cerebrum showing the two hemispheres with characteristic gyri (folds) and sulci (grooves) that increase surface area.
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
                <div className="text-3xl mb-4">🧠</div>
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
      slideId="cerebrum"
      slideTitle="Cerebrum"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="human-brain"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}