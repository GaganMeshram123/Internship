import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function HumanBrainSlide4() {
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
      id: 'diencephalon-definition',
      question: 'What does the term "diencephalon" mean etymologically?',
      options: [
        'Brain center',
        'Through brain',
        'Upper brain',
        'Deep brain'
      ],
      correctAnswer: 'Through brain',
      explanation: 'The etymology of the word diencephalon translates to "through brain," reflecting its role as the connection between the cerebrum and the rest of the nervous system.'
    },
    {
      id: 'diencephalon-components',
      question: 'What are the three major regions of the diencephalon?',
      options: [
        'Thalamus, hypothalamus, and epithalamus',
        'Cerebrum, cerebellum, and brainstem',
        'Frontal, parietal, and temporal lobes',
        'Medulla, pons, and midbrain'
      ],
      correctAnswer: 'Thalamus, hypothalamus, and epithalamus',
      explanation: 'The diencephalon is composed of three major regions: the thalamus, hypothalamus, and epithalamus, which together define the walls of the third ventricle.'
    },
    {
      id: 'hypothalamus-pituitary-connection',
      question: 'What connects the hypothalamus to the pituitary gland?',
      options: [
        'Corpus callosum',
        'Infundibulum',
        'Intermediate mass',
        'Mammillary bodies'
      ],
      correctAnswer: 'Infundibulum',
      explanation: 'The hypothalamus is attached to the pituitary gland by a stalk called the infundibulum, which allows the hypothalamus to control pituitary hormone release.'
    },
    {
      id: 'epithalamus-pineal-function',
      question: 'What hormone does the pineal gland in the epithalamus secrete?',
      options: [
        'Dopamine',
        'Oxytocin',
        'Melatonin',
        'ADH'
      ],
      correctAnswer: 'Melatonin',
      explanation: 'The pineal gland secretes melatonin in response to signals from the hypothalamus. Light exposure inhibits melatonin secretion (wakefulness), while darkness stimulates it (sleepiness).'
    },
    {
      id: 'olfactory-exception',
      question: 'Which sensory system bypasses the diencephalon?',
      options: [
        'Visual system',
        'Auditory system',
        'Olfactory system',
        'Somatosensory system'
      ],
      correctAnswer: 'Olfactory system',
      explanation: 'The olfactory system is the single exception that connects directly with the cerebrum, bypassing the diencephalon. This reflects the evolutionary importance of smell in early vertebrates.'
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
      interactionId: `diencephalon-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'diencephalon-understanding',
      conceptName: 'Diencephalon Quiz',
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

  const diencephalonStructures = [
    {
      title: 'Thalamus',
      points: [
        'Acts as the brain\'s relay station, passing messages between the brain and body.',
        'Almost all sensory information (except smell) must pass through the thalamus.',
        'Helps the brain decide what information is important to pay attention to.',
        'Has left and right halves connected in the middle.'
      ],
      color: '#3b82f6'
    },
    {
      title: 'Hypothalamus',
      points: [
        'Located below the thalamus and connected to the pituitary gland.',
        'Acts like the body\'s thermostat - controls body temperature.',
        'Controls automatic body functions like heart rate, breathing, and digestion.',
        'Controls hormone production through the pituitary gland.',
        'Makes you feel hungry or full, thirsty or satisfied.',
        'Controls sleep-wake cycles and feelings of pleasure or reward.'
      ],
      color: '#10b981'
    },
    {
      title: 'Epithalamus',
      points: [
        'Located behind the thalamus and contains the pineal gland.',
        'Pineal gland is a small structure that produces melatonin hormone.',
        'When it\'s bright, less melatonin is made → you feel awake.',
        'When it\'s dark, more melatonin is made → you feel sleepy.'
      ],
      color: '#f59e0b'
    }
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Brain Structures */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              <p className="mb-4 text-lg">The diencephalon retains its name from embryologic development, with etymology meaning "through brain." It serves as the connection between the cerebrum and the rest of the nervous system, located deep beneath the cerebrum. The single exception is the olfactory system, which connects directly with the cerebrum, bypassing the diencephalon entirely.</p>
              <p className="mb-4 text-lg">The diencephalon is composed primarily of the thalamus, hypothalamus and epithalamus:</p>
              {diencephalonStructures.map((structure, index) => (
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
          {/* Diencephalon Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">The Diencephalon</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/diencephalon.png"
                alt="Anatomical diagram showing the location of the thalamus, hypothalamus, epithalamus and pituitary gland in the brain"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              The diencephalon is composed primarily of the thalamus, hypothalamus and epithalamus, which together define the walls of the third ventricle. The thalami are two elongated, ovoid structures on either side of the midline that make contact in the middle.
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
      slideId="diencephalon"
      slideTitle="The Diencephalon"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="human-brain"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}