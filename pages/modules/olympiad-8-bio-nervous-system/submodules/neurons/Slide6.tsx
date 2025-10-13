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
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'neuron-structure-quiz',
      conceptId: 'neuron-structure-understanding',
      conceptName: 'Neuron Structure Quiz',
      type: 'judging',
      description: 'Testing understanding of neuron types based on structure'
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
      id: 'multipolar-characteristics',
      question: 'What are the key characteristics of multipolar neurons?',
      options: [
        'One axon and one dendrite',
        'One axon and many dendrites',
        'Many axons and one dendrite',
        'Single process that branches'
      ],
      correctAnswer: 'One axon and many dendrites',
      explanation: 'Multipolar neurons have one axon and many dendrites, enabling them to integrate input from multiple sources. They are the most common type in humans.'
    },
    {
      id: 'bipolar-location',
      question: 'Where are bipolar neurons primarily found?',
      options: [
        'Cerebral cortex and spinal cord',
        'Retina and olfactory epithelium',
        'Peripheral nervous system only',
        'Embryonic tissue only'
      ],
      correctAnswer: 'Retina and olfactory epithelium',
      explanation: 'Bipolar neurons are found in the retina of the eye (vision) and the olfactory epithelium (smell), where their specialized structure suits specific sensory functions.'
    },
    {
      id: 'pseudounipolar-development',
      question: 'How do pseudounipolar neurons develop?',
      options: [
        'They start as multipolar and lose dendrites',
        'They develop from bipolar neurons whose processes shift and combine',
        'They are born as single-process neurons',
        'They split from unipolar neurons'
      ],
      correctAnswer: 'They develop from bipolar neurons whose processes shift and combine',
      explanation: 'Pseudounipolar neurons develop when the opposing processes of bipolar neurons shift around the cell body and combine into a single, short axon that then forms a T-shaped junction.'
    },
    {
      id: 'unipolar-vs-pseudounipolar',
      question: 'What is the main difference between true unipolar and pseudounipolar neurons?',
      options: [
        'Unipolar neurons have dendrites, pseudounipolar do not',
        'True unipolar neurons are rare in mature vertebrates, pseudounipolar are common sensory neurons',
        'Pseudounipolar neurons cannot conduct impulses',
        'Unipolar neurons are only found in the brain'
      ],
      correctAnswer: 'True unipolar neurons are rare in mature vertebrates, pseudounipolar are common sensory neurons',
      explanation: 'True unipolar neurons are predominantly found in invertebrates and are rare in mature vertebrates, while pseudounipolar neurons are common sensory neurons found in cranial and spinal nerve ganglia.'
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

  const neuronTypes = [
    {
      title: 'Unipolar Neurons (True)',
      points: [
        'Feature a single process extending from the cell body, which branches into dendrites or axon.',
        'Rare in mature vertebrate nervous system; predominantly found in invertebrates.',
        'May include some receptor cells like rod/cone cells in the retina and unipolar brush cells in cerebellum.'
      ],
      color: '#ef4444'
    },
    {
      title: 'Bipolar Neurons',
      points: [
        'Possess one axon and one dendrite, making them highly specialised for specific sensory functions.',
        'Found in the retina of the eye (vision) and the olfactory epithelium (smell).',
        'Both processes exhibit axonal characteristics and can be encased in myelin sheath.'
      ],
      color: '#10b981'
    },
    {
      title: 'Pseudounipolar Neurons',
      points: [
        'Have one short process that splits into two branches forming a T-shaped junction.',
        'Develop from bipolar neurons whose processes shift around the cell body and combine.',
        'Serve as sensory neurons found in all sensory ganglia of cranial and spinal nerves (except special senses).'
      ],
      color: '#f59e0b'
    },
    {
      title: 'Multipolar Neurons',
      points: [
        'Have one axon and many dendrites, enabling them to integrate input from multiple sources.',
        'They are the most common type of neuron in humans, found in the cerebral cortex and spinal cord.',
        'Notable for their extensive diversity in sizes, shapes and dendritic tree complexity.'
      ],
      color: '#3b82f6'
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
          {/* Structure Types Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Structural Types of Neurons</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/structure_types_neuron.png"
                alt="Diagram showing multipolar, bipolar, and unipolar neurons with their structural differences"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              Diagram illustrating the four structural types of neurons: multipolar (one axon, many dendrites), bipolar (one axon, one dendrite), pseudounipolar (T-shaped junction), and unipolar (single branching process).
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
      slideId="neuron-types-structure"
      slideTitle="Types of Neurons (Based on Structure)"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="neurons"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}