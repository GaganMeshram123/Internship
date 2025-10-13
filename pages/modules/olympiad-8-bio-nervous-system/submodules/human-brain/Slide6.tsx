import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function HumanBrainSlide6() {
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
      id: 'midbrain-location',
      question: 'Where is the midbrain located?',
      options: [
        'Above the forebrain',
        'Below the hindbrain',
        'Between the forebrain and hindbrain',
        'Inside the cerebellum'
      ],
      correctAnswer: 'Between the forebrain and hindbrain',
      explanation: 'The midbrain (mesencephalon) is the portion of the brainstem located between the forebrain and hindbrain, connecting these major brain regions.'
    },
    {
      id: 'midbrain-primary-functions',
      question: 'What are the primary functions of the midbrain?',
      options: [
        'Vision, hearing, and motor control',
        'Memory and emotion processing',
        'Hormone production',
        'Language and speech'
      ],
      correctAnswer: 'Vision, hearing, and motor control',
      explanation: 'The midbrain functions as a relay center for vision, hearing, and motor control, processing and coordinating these essential sensory and movement functions.'
    },
    {
      id: 'midbrain-vision-function',
      question: 'How does the midbrain help with vision?',
      options: [
        'It stores visual memories',
        'It processes colors only',
        'It creates dreams',
        'It controls eye movements and visual reflexes'
      ],
      correctAnswer: 'It controls eye movements and visual reflexes',
      explanation: 'The midbrain controls eye movements and visual reflexes, helping you track moving objects and respond quickly to visual stimuli.'
    },
    {
      id: 'midbrain-consciousness-role',
      question: 'What role does the midbrain play in consciousness?',
      options: [
        'It stores all memories',
        'It helps maintain wakefulness and awareness',
        'It controls language',
        'It processes emotions only'
      ],
      correctAnswer: 'It helps maintain wakefulness and awareness',
      explanation: 'The midbrain plays an important role in consciousness, helping to maintain wakefulness and awareness. It acts like a switch for staying awake or falling asleep.'
    },
    {
      id: 'midbrain-size',
      question: 'How does the midbrain compare in size to other brain regions?',
      options: [
        'It is the largest part of the brain',
        'It is medium-sized',
        'It is the same size as the cerebrum',
        'It is the smallest part of the brainstem'
      ],
      correctAnswer: 'It is the smallest part of the brainstem',
      explanation: 'The midbrain is the smallest part of the brainstem, but despite its small size, it plays crucial roles in vision, hearing, movement, and consciousness.'
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
      interactionId: `midbrain-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'midbrain-understanding',
      conceptName: 'Midbrain Quiz',
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

  const midbrainInfo = [
    {
      title: 'Functions',
      points: [
        'Acts as a relay center for vision, hearing, and motor control.',
        'Connects the forebrain with the hindbrain.',
        'Controls eye movements and visual reflexes.',
        'Processes sound and helps locate where sounds come from.',
        'Helps coordinate body movements and balance.',
        'Plays a role in consciousness and staying awake.'
      ],
      color: '#3b82f6'
    }
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Midbrain Overview */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              <p className="mb-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                The midbrain (mesencephalon) is the smallest part of the brainstem, located between the forebrain and hindbrain. Despite its small size, it plays crucial roles in many important functions.
              </p>
              <p className="mb-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                The midbrain functions as a relay center for vision, hearing, and motor control. It contains important nuclei and fiber tracts that link higher and lower brain regions.
              </p>
              {midbrainInfo.map((structure, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: structure.color }}
                    />
                    <h4 className="font-semibold text-lg">{structure.title}</h4>
                  </div>
                  {structure.points.map((point, pointIndex) => (
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
          {/* Midbrain Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Midbrain Structure</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/midbrain.png"
                alt="Anatomical diagram of the midbrain showing superior colliculus, inferior colliculus, substantia nigra, and other key structures"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              The midbrain highlighted in the brain, showing its location between the forebrain and hindbrain as part of the brainstem.
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
      slideId="midbrain"
      slideTitle="Midbrain"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="human-brain"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}