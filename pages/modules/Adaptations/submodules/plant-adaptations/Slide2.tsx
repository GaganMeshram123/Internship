import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function PlantAdaptationsSlide2() {
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
      id: 'seed-dispersal-quiz',
      conceptId: 'plant-adaptation-understanding',
      conceptName: 'Seed Dispersal Quiz',
      type: 'judging',
      description: 'Testing understanding of how plant seeds travel'
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
      id: 'dispersal-wind',
      question: 'A dandelion seed has a fluffy "parachute." Which dispersal method does this adaptation help with?',
      options: [
        'Carried by water',
        'Eaten by animals',
        'Carried by wind',
        'Bursting from a pod'
      ],
      correctAnswer: 'Carried by wind',
      explanation: 'Correct! Seeds with features like parachutes or wings are adapted to be carried away from the parent plant by the wind.'
    },
    {
      id: 'dispersal-attachment',
      question: 'A seed with tiny hooks or barbs is most likely adapted for which type of dispersal?',
      options: [
        'Wind Dispersal',
        'Water Dispersal',
        'Animal Dispersal (by attachment)',
        'Mechanical Dispersal (by bursting)'
      ],
      correctAnswer: 'Animal Dispersal (by attachment)',
      explanation: 'Correct! Seeds with hooks or barbs are adapted to attach to an animal\'s fur, allowing them to be carried to new locations.'
    },
    {
      id: 'dispersal-animal-ingestion',
      question: 'A plant produces a sweet, fleshy fruit like a cherry. How does this help its seeds disperse?',
      options: [
        'The fruit helps the seed float on water',
        'Animals eat the fruit and disperse the seed in their feces',
        'The fruit sticks to an animal\'s fur',
        'The fruit helps the seed catch the wind'
      ],
      correctAnswer: 'Animals eat the fruit and disperse the seed in their feces',
      explanation: 'Exactly! The fruit protects the seed and encourages animals to eat it. The seed then passes through the animal\'s digestive system and is deposited in a new location.'
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
      interactionId: `seed-dispersal-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'plant-adaptation-understanding',
      conceptName: 'Seed Dispersal Quiz',
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

  const dispersalMethods = [
    {
      method: 'By Wind',
      description: 'Seeds like dandelions or maple have wings or parachutes to travel on air currents.',
    },
    {
      method: 'By Animals',
      description: 'Some seeds use hooks to attach to fur, while others are eaten (like berries) and passed through feces.',
    },
    {
      method: 'By Water',
      description: 'Seeds like coconuts are buoyant and can float to new locations.',
    },
    {
      method: 'By Bursting',
      description: 'The plant mechanically throws or shoots the seeds from a pod.',
    },
    {
      method: 'By Humans',
      description: 'Humans disperse seeds through agriculture and gardening.',
    }
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Seed Dispersal: The Plant's Journey</h2>
            <p className="text-lg leading-relaxed">
              For plants to survive, their seeds must be dispersed or spread out away from the parent plant. This prevents overcrowding and competition for resources.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">How Seeds Travel</h3>
            <div className="space-y-4">
              {dispersalMethods.map((method, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 rounded-full mt-2.5 mr-3 flex-shrink-0 bg-blue-500"></div>
                  <div>
                    <p className="font-semibold text-lg">{method.method}</p>
                    <p className="text-lg text-slate-600 dark:text-slate-400">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Dispersal & Germination</h3>
            <div className="flex justify-center">
              <img 
                src="https://cdn.savemyexams.com/uploads/2023/08/dispersal-and-germination-of-seeds-.png"
                alt="A diagram showing seed dispersal by wind and animals, and the process of germination."
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Plants have evolved many clever ways to ensure their seeds travel to new places to germinate.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Knowledge Check</h3>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

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
                      <div className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                        {questions[currentQuestionIndex].explanation}
                      </div>
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
                  {score === questions.length ? 'Excellent! 🌟' : 'Great work! 👏'}
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
      slideId="seed-dispersal"
      slideTitle="Seed Dispersal"
      moduleId="olympiad-bio-adaptations"
      submoduleId="plant-adaptations"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}