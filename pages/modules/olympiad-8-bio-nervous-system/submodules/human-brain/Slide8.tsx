import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';

export default function HumanBrainSlide8() {
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
      id: 'meninges-count',
      question: 'How many protective membranes make up the meninges?',
      options: [
        'Two membranes',
        'Four membranes',
        'Three membranes',
        'Five membranes'
      ],
      correctAnswer: 'Three membranes',
      explanation: 'The meninges consist of three protective membranes that cover the brain and spinal cord: dura mater, arachnoid mater, and pia mater.'
    },
    {
      id: 'dura-mater-characteristics',
      question: 'What are the characteristics of the dura mater?',
      options: [
        'Outermost, tough and protective',
        'Middle, web-like structure',
        'Innermost, thin membrane',
        'Contains cerebrospinal fluid'
      ],
      correctAnswer: 'Outermost, tough and protective',
      explanation: 'The dura mater is the outermost layer of the meninges. It is tough, thick, and provides strong protective covering for the brain and spinal cord.'
    },
    {
      id: 'arachnoid-mater-function',
      question: 'What is special about the arachnoid mater?',
      options: [
        'It adheres tightly to the brain surface',
        'It is the toughest protective layer',
        'It has a web-like structure and cushions the CNS',
        'It produces cerebrospinal fluid'
      ],
      correctAnswer: 'It has a web-like structure and cushions the CNS',
      explanation: 'The arachnoid mater is the middle layer with a web-like structure that helps cushion the central nervous system and contains spaces for cerebrospinal fluid.'
    },
    {
      id: 'pia-mater-location',
      question: 'Where is the pia mater located and what does it do?',
      options: [
        'Outermost layer providing protection',
        'Middle layer with web-like structure',
        'Innermost layer that adheres tightly to brain surface',
        'Between skull and dura mater'
      ],
      correctAnswer: 'Innermost layer that adheres tightly to brain surface',
      explanation: 'The pia mater is the innermost and thinnest layer of the meninges that adheres tightly to the surface of the brain and spinal cord, following all the contours.'
    },
    {
      id: 'meningitis-definition',
      question: 'What is meningitis?',
      options: [
        'A type of brain tumor',
        'Loss of cerebrospinal fluid',
        'Inflammation of the meninges due to infection',
        'Damage to the skull bones'
      ],
      correctAnswer: 'Inflammation of the meninges due to infection',
      explanation: 'Meningitis is the inflammation of the meninges, usually caused by bacterial, viral, or fungal infections. It can be serious and requires immediate medical attention.'
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
      interactionId: `meninges-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'meninges-understanding',
      conceptName: 'Meninges Quiz',
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

  const meningesLayers = [
    {
      title: 'Dura Mater',
      points: [
        'Outermost layer of the meninges.',
        'Tough, thick, and protective membrane.',
        'Acts like a strong shield for the brain and spinal cord.'
      ],
      color: '#ef4444'
    },
    {
      title: 'Arachnoid Mater',
      points: [
        'Middle layer with a web-like structure.',
        'Cushions the central nervous system.',
        'Contains spaces filled with cerebrospinal fluid.'
      ],
      color: '#10b981'
    },
    {
      title: 'Pia Mater',
      points: [
        'Innermost and thinnest layer.',
        'Adheres tightly to the brain and spinal cord surface.',
        'Follows all the curves and folds of the brain.'
      ],
      color: '#3b82f6'
    }
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Meninges Overview */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              <p className="mb-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                The meninges are three protective membranes that cover the brain and spinal cord. They work together like layers of protection to keep your central nervous system safe from damage.
              </p>
              <p className="mb-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                The three layers from outside to inside are:
              </p>
              {meningesLayers.map((layer, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: layer.color }}
                    />
                    <h4 className="font-semibold text-lg">{layer.title}</h4>
                  </div>
                  {layer.points.map((point, pointIndex) => (
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

          {/* Functions and Disorders */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Functions & Disorders</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-slate-700 dark:text-slate-300">Functions:</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-2 flex-shrink-0" />
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      Provide mechanical protection for the brain and spinal cord.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-2 flex-shrink-0" />
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      Enclose cerebrospinal fluid, which cushions the brain like a protective liquid pillow.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2 text-slate-700 dark:text-slate-300">Disorder:</h4>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    <span className="font-semibold text-red-600 dark:text-red-400">Meningitis</span> - inflammation of the meninges due to infection. This is a serious condition that requires immediate medical attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Image and Quiz */}
        <div className="space-y-6">
          {/* Meninges Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Meninges Structure</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/meninges.png"
                alt="Anatomical diagram showing the three layers of meninges: dura mater, arachnoid mater, and pia mater protecting the brain"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              Cross-sectional view showing the three protective layers of meninges: dura mater (tough outer layer), arachnoid mater (web-like middle layer), and pia mater (thin inner layer adhering to brain surface).
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
      slideId="meninges"
      slideTitle="Meninges"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="human-brain"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}