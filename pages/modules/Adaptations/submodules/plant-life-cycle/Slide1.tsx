import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function PlantLifeCycleSlide1() {
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
      id: 'plant-lifecycle-intro-quiz',
      conceptId: 'plant-lifecycle-understanding',
      conceptName: 'Plant Life Cycle Intro Quiz',
      type: 'judging',
      description: 'Testing understanding of the plant life cycle and reproduction'
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
      id: 'reproduction-definition',
      question: 'What is plant reproduction?',
      options: [
        'The process of a plant growing taller',
        'The process by which a plant produces seeds to make a new plant',
        'The process of a plant absorbing water',
        'The process of a plant losing its leaves in winter'
      ],
      correctAnswer: 'The process by which a plant produces seeds to make a new plant',
      explanation: 'Correct! Reproduction is the process by which a plant produces seeds to make a new plant.'
    },
    {
      id: 'pollination-definition',
      question: 'What is the process called when pollen is carried from the anther to the stigma of a flower?',
      options: [
          'Germination',
          'Fertilisation',
          'Pollination',
          'Seed Dispersal'
      ],
      correctAnswer: 'Pollination',
      explanation: 'Correct! Pollination is the crucial step where pollen is transferred between flower parts, which is necessary for fertilization to occur.'
    },
    {
      id: 'germination-definition',
      question: 'What is germination?',
      options: [
        'When a flower develops on a plant',
        'When seeds spread out to new locations',
        'When a seed starts to grow after reaching a suitable place',
        'When pollen fuses with female sex cells'
      ],
      correctAnswer: 'When a seed starts to grow after reaching a suitable place',
      explanation: 'Exactly! Germination is the first stage of the life cycle, where a seed starts to grow once conditions are right.'
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
      interactionId: `plant-lifecycle-intro-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'plant-lifecycle-understanding',
      conceptName: 'Plant Life Cycle Intro Quiz',
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

  const lifeCycleStages = [
     { name: 'Germination', description: 'The seed starts to grow when it reaches a suitable place with enough water and warmth.', color: '#a16207' },
     { name: 'Flower', description: 'The plant grows and develops a flower, which contains the reproductive parts.', color: '#be123c' },
     { name: 'Pollination', description: 'Pollen is carried from the anther to the stigma, often by wind or insects.', color: '#f59e0b' },
     { name: 'Fertilisation', description: 'Seeds develop after pollen fuses with female sex cells. The fruit then forms to protect the seed.', color: '#16a34a' },
     { name: 'Seed Dispersal', description: 'Seeds are spread out by wind, water, or animals to grow with less competition.', color: '#3b82f6' },
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">The Life Cycle of a Plant</h2>
            <p className="text-lg leading-relaxed">
              Reproduction is the process by which a plant produces seeds to make a new plant. This life cycle shows the different stages in plant reproduction.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Stages of the Life Cycle</h3>
            <div className="space-y-4">
              {lifeCycleStages.map((stage) => (
                <div key={stage.name} className="flex items-start">
                  <div className="w-3 h-3 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: stage.color }}></div>
                  <div>
                    <p className="font-semibold text-lg">{stage.name}</p>
                    <p className="text-lg text-slate-600 dark:text-slate-400">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Annual Life Cycle</h3>
            <div className="flex justify-center">
              <img 
                src="https://cduebooks.pressbooks.pub/app/uploads/sites/135/2022/12/annual-life-cycle.png"
                alt="Diagram showing the annual life cycle of a plant from seed to flower and back to seed."
                className="max-w-full h-auto rounded-lg"
                style={{ width: '100%', maxWidth: '450px', height: 'auto', mixBlendMode: isDarkMode ? 'difference' : 'normal' }}
              />
            </div>
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
                  {score === questions.length ? 'Excellent! 🌱' : 'Great job! 👏'}
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
      slideId="plant-life-cycle-intro"
      slideTitle="The Life Cycle of a Plant"
      moduleId="olympiad-bio-adaptations"
      submoduleId="plant-life-cycle"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}