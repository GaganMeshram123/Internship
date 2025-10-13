import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function NeuronsSlide4() {
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
      id: 'membrane-potential-quiz',
      conceptId: 'membrane-potential-understanding',
      conceptName: 'Membrane Potential Quiz',
      type: 'judging',
      description: 'Testing understanding of membrane potential and action potentials'
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
      id: 'resting-potential',
      question: 'What is the typical resting membrane potential of a neuron?',
      options: [
        '-70 mV',
        '+30 mV',
        '-55 mV',
        '0 mV'
      ],
      correctAnswer: '-70 mV',
      explanation: 'The typical resting membrane potential of a neuron is -70 mV, meaning the inside of the neuron is 70 millivolts more negative than the outside.'
    },
    {
      id: 'sodium-potassium-pump',
      question: 'How many ions does the sodium-potassium pump move per cycle?',
      options: [
        '2 Na⁺ out, 3 K⁺ in',
        '3 Na⁺ out, 2 K⁺ in',
        '1 Na⁺ out, 1 K⁺ in',
        '4 Na⁺ out, 2 K⁺ in'
      ],
      correctAnswer: '3 Na⁺ out, 2 K⁺ in',
      explanation: 'The sodium-potassium pump moves 3 sodium ions out of the cell and 2 potassium ions into the cell per cycle, contributing to the negative resting potential.'
    },
    {
      id: 'action-potential-principle',
      question: 'What principle do action potentials follow?',
      options: [
        'Graded response principle',
        'All-or-none principle',
        'Partial activation principle',
        'Gradual increase principle'
      ],
      correctAnswer: 'All-or-none principle',
      explanation: 'Action potentials follow the all-or-none principle - once the threshold is reached, they always occur fully. There are no partial or varying action potentials.'
    },
    {
      id: 'negative-potential-reason',
      question: 'Why is the potential inside the neuron negative at rest?',
      options: [
        'Because more K⁺ ions are inside than outside',
        'Because the sodium-potassium pump moves 3 Na⁺ out and 2 K⁺ in, creating net positive charge outside',
        'Because there are no ions inside the cell',
        'Because the cell membrane blocks all ion movement'
      ],
      correctAnswer: 'Because the sodium-potassium pump moves 3 Na⁺ out and 2 K⁺ in, creating net positive charge outside',
      explanation: 'The sodium-potassium pump moves 3 positively charged Na⁺ ions out for every 2 positively charged K⁺ ions in. This creates a net loss of positive charge inside, making the interior negative relative to the outside.'
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
      interactionId: `membrane-potential-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'membrane-potential-understanding',
      conceptName: 'Membrane Potential Quiz',
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

  const restingPotentialPoints = [
    'Neuron at rest has an electrical difference across its membrane (resting potential ~ –70 mV).',
    'Inside of axon = negative (due to proteins and K⁺), outside = positive (due to Na⁺).',
    'Maintained by sodium–potassium pump: pumps 3 Na⁺ out, 2 K⁺ in per cycle.',
    'Resting potential keeps the neuron ready to fire when stimulated.'
  ];

  const actionPotentialPoints = [
    'When threshold (~-55 mV) is reached, gated Na⁺ channels open → sodium floods inside → depolarisation.',
    'Membrane potential reaches +30 mV, then Na⁺ channels inactivate and K⁺ channels open.',
    'Potassium flows out → restores negativity (repolarisation), with brief hyperpolarization.',
    'Action potentials follow the all-or-none principle → once triggered, they always occur fully.'
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Membrane Potential Introduction */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <p className="text-lg leading-relaxed mb-4">
              Membrane potential is the difference of the electric potential between the inside and the outside of the cell.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Scientists can measure this using a recording microelectrode inside the cell compared to a reference electrode outside. If the reference electrode is set at zero, the recording microelectrode shows how the electrical potential changes inside the cell.
            </p>
            <p className="text-lg leading-relaxed">
              For an excitable brain neuron, the resting membrane potential is typically <strong>-70 mV</strong>. This means the neuron is 70 millivolts more negative than its surroundings.
            </p>
          </div>

          {/* Resting Potential */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Resting Potential</h3>
            <p className="text-lg leading-relaxed mb-4">
              The sodium-potassium pump is critical in getting cells to their resting membrane potential. With the help of ATP, it moves ions against their concentration gradients.
            </p>
            <div className="space-y-3">
              {restingPotentialPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Sodium-Potassium Pump Video */}
            <div className="mt-6">
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-3 text-center">Sodium-Potassium Pump</h4>
                <div className="flex justify-center">
                  <video
                    className="max-w-full h-auto rounded-lg shadow-md"
                    style={{
                      width: '100%',
                      maxWidth: '550px',
                      height: 'auto'
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="https://d9dcoet1djtzh.cloudfront.net/sodium_potassium_pump.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 text-center">
                  Animation showing the sodium-potassium pump maintaining resting potential.
                </p>
              </div>
            </div>
          </div>

          {/* Action Potential */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Action Potential</h3>
            <p className="text-lg leading-relaxed mb-4">
              Initially, the cell is polarized with the inside negatively charged compared to its surroundings. An action potential requires gated sodium channels to open, allowing sodium to rush into the cell following its gradient.
            </p>
            <div className="space-y-3 mb-6">
              {actionPotentialPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Potential Video */}
            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-3 text-center">Action Potential Process</h4>
              <div className="flex justify-center">
                <video
                  className="max-w-full h-auto rounded-lg shadow-md"
                  style={{
                    width: '100%',
                    maxWidth: '550px',
                    height: 'auto'
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="https://d9dcoet1djtzh.cloudfront.net/action_potential.mov" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 text-center">
                Animation showing the phases of an action potential from depolarization to repolarization.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Graph and Quiz */}
        <div className="space-y-6">
          {/* Action Potential Graph */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Action Potential Graph</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/action_potential_graph.png"
                alt="Action Potential Graph showing membrane potential changes over time"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '100%',
                  maxWidth: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center leading-relaxed">
              This graph shows how membrane potential changes during an action potential. Starting at resting potential (-70 mV), the cell depolarizes when it reaches threshold (-55 mV), peaks at +30 mV, then repolarizes back past the resting potential (hyperpolarization) before returning to normal.
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
      slideId="membrane-potential"
      slideTitle="Membrane Potential"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="neurons"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}