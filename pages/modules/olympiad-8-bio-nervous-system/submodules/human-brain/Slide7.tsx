import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function HumanBrainSlide7() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false, false, false, false]);
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
      id: 'hindbrain-main-function',
      question: 'What is the main function of the hindbrain?',
      options: [
        'Controls thinking and reasoning',
        'Processes emotions and memories',
        'Controls vital involuntary functions like breathing and heartbeat',
        'Controls speech and language'
      ],
      correctAnswer: 'Controls vital involuntary functions like breathing and heartbeat',
      explanation: 'The hindbrain controls vital involuntary functions such as breathing, heartbeat, balance, and posture - essential functions that keep you alive without conscious effort.'
    },
    {
      id: 'cerebellum-coordination',
      question: 'What happens when the cerebellum is damaged?',
      options: [
        'Loss of coordination and balance (ataxia)',
        'Loss of memory',
        'Loss of speech',
        'Loss of vision'
      ],
      correctAnswer: 'Loss of coordination and balance (ataxia)',
      explanation: 'Damage to the cerebellum causes ataxia, which is the loss of coordination and balance. This makes movements clumsy and uncoordinated.'
    },
    {
      id: 'pons-breathing',
      question: 'Which part of the hindbrain helps regulate breathing rhythm?',
      options: [
        'Cerebellum',
        'Medulla only',
        'Occipital lobe',
        'Pons'
      ],
      correctAnswer: 'Pons',
      explanation: 'The pons contains pneumotaxic and apneustic centers that regulate the rhythm of breathing, working together with the medulla to control respiration.'
    },
    {
      id: 'medulla-vital-centers',
      question: 'Why is the medulla oblongata critical for survival?',
      options: [
        'It controls thinking',
        'It contains vital centers for heartbeat and breathing',
        'It stores memories',
        'It processes emotions'
      ],
      correctAnswer: 'It contains vital centers for heartbeat and breathing',
      explanation: 'The medulla contains vital centers that control heartbeat, breathing, and other essential reflexes. Severe injury to this area is usually fatal because these functions are critical for survival.'
    },
    {
      id: 'cerebellum-motor-learning',
      question: 'How does the cerebellum help with motor learning?',
      options: [
        'It stores muscle memories',
        'It creates new muscles',
        'It refines movement patterns through practice',
        'It controls emotions during exercise'
      ],
      correctAnswer: 'It refines movement patterns through practice',
      explanation: 'The cerebellum is involved in motor learning by refining movement patterns through practice, helping you improve coordination and make movements more smooth and efficient.'
    },
    {
      id: 'hindbrain-components',
      question: 'What are the three major components of the hindbrain?',
      options: [
        'Cerebellum, pons, medulla oblongata',
        'Cerebrum, thalamus, hypothalamus',
        'Frontal, parietal, temporal lobes',
        'Amygdala, hippocampus, limbic system'
      ],
      correctAnswer: 'Cerebellum, pons, medulla oblongata',
      explanation: 'The hindbrain consists of three major components: the cerebellum (balance and coordination), pons (breathing rhythm and connections), and medulla oblongata (vital functions).'
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
      interactionId: `hindbrain-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'hindbrain-understanding',
      conceptName: 'Hindbrain Quiz',
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

  const hindbrainStructures = [
    {
      title: 'Cerebellum',
      points: [
        'Located at the back of the brain, beneath the occipital lobes and behind the pons and medulla.',
        'Coordinates voluntary movements like walking, writing, and speaking.',
        'Maintains balance, posture, and muscle tone.',
        'Involved in motor learning - refining movement patterns through practice.',
        'Damage causes ataxia (loss of coordination and balance).'
      ],
      color: '#3b82f6'
    },
    {
      title: 'Pons',
      points: [
        'Located in the brainstem above the medulla and below the midbrain.',
        'Connects forebrain with cerebellum and spinal cord via nerve tracts.',
        'Contains centers that regulate the rhythm of breathing.',
        'Plays a role in sleep, arousal, and facial sensation/movement.',
        'Damage may cause breathing problems, double vision, and facial weakness.'
      ],
      color: '#10b981'
    },
    {
      title: 'Medulla Oblongata',
      points: [
        'Lowest part of the brainstem, continuous with the spinal cord.',
        'Contains cardiac center that regulates heartbeat.',
        'Contains respiratory center that controls breathing rate and rhythm.',
        'Has reflex centers for swallowing, coughing, sneezing, and vomiting.',
        'Critical for survival - severe injury is usually fatal.'
      ],
      color: '#ef4444'
    }
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Hindbrain Overview */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              <p className="mb-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                The hindbrain (rhombencephalon) controls vital involuntary functions such as breathing and heartbeat, as well as balance and posture. It consists of three major components that work together to keep you alive and coordinated.
              </p>
              <p className="mb-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Major components: Cerebellum, Pons, and Medulla oblongata. Each has specific roles:
              </p>
              {hindbrainStructures.map((structure, index) => (
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
          {/* Hindbrain Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Hindbrain Structure</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/hindbrain.png"
                alt="Anatomical diagram of the hindbrain showing cerebellum, pons, and medulla oblongata"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              The hindbrain components: cerebellum (balance and coordination), pons (breathing rhythm and connections), and medulla oblongata (vital life functions like heartbeat and breathing).
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
      slideId="hindbrain"
      slideTitle="Hindbrain"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="human-brain"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}