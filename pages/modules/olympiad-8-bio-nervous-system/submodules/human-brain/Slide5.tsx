import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function HumanBrainSlide5() {
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
      id: 'limbic-system-nickname',
      question: 'What is the limbic system commonly called?',
      options: [
        'The emotional brain',
        'The thinking brain',
        'The motor brain',
        'The sensory brain'
      ],
      correctAnswer: 'The emotional brain',
      explanation: 'The limbic system is commonly called the "emotional brain" because it is primarily responsible for processing emotions, feelings, and emotional responses.'
    },
    {
      id: 'amygdala-function',
      question: 'What is the primary function of the amygdala?',
      options: [
        'Learning and memory formation',
        'Linking emotions with behavior',
        'Temperature regulation',
        'Fear, anger, and threat response'
      ],
      correctAnswer: 'Fear, anger, and threat response',
      explanation: 'The amygdala is primarily responsible for processing fear, anger, and threat responses. It acts as the brain\'s alarm system, detecting danger and triggering appropriate emotional reactions.'
    },
    {
      id: 'hippocampus-memory',
      question: 'Which structure is crucial for learning and memory?',
      options: [
        'Amygdala',
        'Hippocampus',
        'Cingulate gyrus',
        'Thalamus'
      ],
      correctAnswer: 'Hippocampus',
      explanation: 'The hippocampus is crucial for learning and memory formation. It helps convert short-term memories into long-term memories and is one of the first areas affected in Alzheimer\'s disease.'
    },
    {
      id: 'cingulate-gyrus-role',
      question: 'What does the cingulate gyrus do?',
      options: [
        'Controls fear responses',
        'Forms new memories',
        'Links emotions with behavior',
        'Regulates body temperature'
      ],
      correctAnswer: 'Links emotions with behavior',
      explanation: 'The cingulate gyrus links emotions with behavior, helping to connect how we feel with how we act. It plays a key role in emotional decision-making and behavioral responses.'
    },
    {
      id: 'alzheimers-connection',
      question: 'Which limbic structure degenerates in Alzheimer\'s disease?',
      options: [
        'Amygdala',
        'Hippocampus',
        'Cingulate gyrus',
        'Hypothalamus'
      ],
      correctAnswer: 'Hippocampus',
      explanation: 'The hippocampus degenerates in Alzheimer\'s disease, which explains why memory loss is one of the earliest and most prominent symptoms of this condition.'
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
      interactionId: `limbic-system-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'limbic-system-understanding',
      conceptName: 'Limbic System Quiz',
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

  const limbicStructures = [
    {
      title: 'Amygdala',
      points: [
        'Handles fear, anger, and threat responses.',
        'Acts like the brain\'s alarm system when danger is detected.',
        'Triggers fight-or-flight responses to keep you safe.'
      ],
      color: '#ef4444'
    },
    {
      title: 'Hippocampus',
      points: [
        'Essential for learning and forming new memories.',
        'Helps turn short-term memories into long-term ones.',
        'One of the first areas damaged in Alzheimer\'s disease.'
      ],
      color: '#3b82f6'
    },
    {
      title: 'Hypothalamus',
      points: [
        'Connects emotions with physical body responses.',
        'Makes your heart race when you\'re scared or excited.',
        'Controls automatic body reactions to emotions.'
      ],
      color: '#f59e0b'
    },
    {
      title: 'Thalamus (parts)',
      points: [
        'Specific parts relay emotional and memory signals to the cortex.',
        'Helps emotional information reach the thinking parts of the brain.',
        'Acts as a messenger between limbic system and conscious thought.'
      ],
      color: '#8b5cf6'
    }
  ];

  const additionalStructures = [
    {
      title: 'Basal ganglia',
      points: [
        'Your reward processing center and is involved in emotions.',
        'Also regulates your movement and how you learn.'
      ],
      color: '#10b981'
    },
    {
      title: 'Cingulate gyrus',
      points: [
        'Important for emotional and social behaviors.',
        'Helps with imagining how someone else is feeling.'
      ],
      color: '#06b6d4'
    }
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Limbic System Overview */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              <p className="mb-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                The limbic system is a network of connected brain structures that work together as the "emotional brain." It includes the hippocampus, amygdala, hypothalamus, and parts of the thalamus.
              </p>
              <p className="mb-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                The main structures control emotions, memory, behavior, and how your body responds to feelings:
              </p>
              {limbicStructures.map((structure, index) => (
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

              {/* Additional Structures */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600">
                <p className="mb-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Some researchers identify additional components within the limbic system beyond the four main structures, which may include:
                </p>
                {additionalStructures.map((structure, index) => (
                  <div key={index} className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 mb-2">
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
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          {/* Limbic System Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Limbic System</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/lymbic_system.png"
                alt="Anatomical diagram showing the limbic system structures including hippocampus, amygdala, cingulate gyrus, and their connections"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              The limbic system network showing key emotional and memory structures: amygdala (fear/threat), hippocampus (memory), cingulate gyrus (emotion-behavior link), and their connections.
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
      slideId="limbic-system"
      slideTitle="Limbic System"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="human-brain"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}