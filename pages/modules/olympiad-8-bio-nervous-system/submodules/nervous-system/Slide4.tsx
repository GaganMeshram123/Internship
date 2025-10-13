import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Interaction, InteractionResponse } from '../../../common-components/concept';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { useThemeContext } from '@/lib/ThemeContext';

export default function NervousSystemSlide4() {
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(1);
  const { isDarkMode } = useThemeContext();
  
  const slideInteractions: Interaction[] = [
    {
      id: 'nervous-divisions-quiz',
      conceptId: 'nervous-divisions-understanding',
      conceptName: 'Nervous System Divisions Quiz',
      type: 'judging',
      description: 'Testing understanding of autonomic nervous system divisions'
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
      id: 'sympathetic-parasympathetic',
      question: 'What are the main functions of the sympathetic and parasympathetic nervous systems?',
      options: [
        'Sympathetic: fight or flight, Parasympathetic: rest and digest',
        'Sympathetic: rest and digest, Parasympathetic: fight or flight',
        'Both control voluntary movements',
        'Both control thinking and memory'
      ],
      correctAnswer: 'Sympathetic: fight or flight, Parasympathetic: rest and digest',
      explanation: 'The sympathetic system prepares the body for emergency action (fight or flight), while the parasympathetic system promotes rest and normal body maintenance (rest and digest).'
    },
    {
      id: 'pns-divisions',
      question: 'The Peripheral Nervous System (PNS) is divided into which two main parts?',
      options: [
        'Somatic and Autonomic nervous systems',
        'Central and Peripheral nervous systems',
        'Brain and Spinal cord',
        'Sympathetic and Parasympathetic nervous systems'
      ],
      correctAnswer: 'Somatic and Autonomic nervous systems',
      explanation: 'The PNS is divided into the Somatic nervous system (voluntary control) and the Autonomic nervous system (involuntary control). The Autonomic system is further divided into Sympathetic and Parasympathetic.'
    },
    {
      id: 'somatic-function',
      question: 'What type of actions does the Somatic nervous system control?',
      options: [
        'Heartbeat and breathing',
        'Voluntary muscle movements',
        'Digestion and metabolism',
        'Hormone production'
      ],
      correctAnswer: 'Voluntary muscle movements',
      explanation: 'The Somatic nervous system controls voluntary muscle movements like walking, writing, and speaking. It carries signals from the CNS to skeletal muscles.'
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
      interactionId: `nervous-divisions-quiz-q${currentQuestionIndex + 1}-${current.id}-${Date.now()}`,
      value: answerText,
      isCorrect,
      timestamp: Date.now(),
      conceptId: 'nervous-divisions-understanding',
      conceptName: 'Nervous System Divisions Quiz',
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

  const images = [
    {
      id: 1,
      src: "https://d9dcoet1djtzh.cloudfront.net/cns_pns.png",
      alt: "CNS and PNS Overview",
      title: "CNS & PNS Overview"
    },
    {
      id: 2,
      src: "https://d9dcoet1djtzh.cloudfront.net/cns_pns_nerves.png",
      alt: "CNS and PNS with Nerve Pathways",
      title: "CNS & PNS with Nerves"
    }
  ];

  const slideContent = (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="grid grid-cols-2 gap-8 p-8 mx-auto">
        
        {/* Left Column - Content */}
        <div className="space-y-6">
          {/* Central Nervous System */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Central Nervous System (CNS)</h3>
            <p className="text-lg leading-relaxed">
              The CNS consists of the brain and spinal cord, functioning as the body's command center. The brain processes complex information, stores memories, and controls consciousness, while the spinal cord serves as the main highway for nerve signals traveling between the brain and body. Together, they integrate sensory information, make decisions, and coordinate all bodily responses to maintain proper function and survival.
            </p>
          </div>

          {/* Peripheral Nervous System */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Peripheral Nervous System (PNS)</h3>
            <p className="text-lg leading-relaxed">
              The PNS includes all neural tissue outside the brain and spinal cord, consisting of 12 pairs of cranial nerves and 31 pairs of spinal nerves. These nerves form an extensive network that connects the CNS to every part of the body, including muscles, organs, and sensory receptors. The PNS acts as a communication bridge, carrying sensory information to the CNS and delivering motor commands back to target tissues throughout the body.
            </p>
          </div>

          {/* Nervous System Flow Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-center">
              <svg version="1.1" viewBox="50 0 450 400" preserveAspectRatio="xMinYMin meet" className="max-w-full h-auto">
                <defs>
                  <marker id="arrow" markerWidth="6" markerHeight="10" viewBox="-3 -5 6 10" refX="0" refY="0" markerUnits="strokeWidth" orient="auto">
                    <polyline points="-3,-3 0,0 -3,3" stroke="#2563eb" strokeWidth="1.5" fill="none"/>
                  </marker>
                </defs>

                {/* Main Nervous System */}
                <g transform="translate(120, 20)">
                  <rect fill="#1d4ed8" x="0" y="0" rx="8" ry="8" width="200" height="45" />
                  <text x="100" y="30" fontFamily="Arial" fontSize="18" stroke="none" fill="white" fontWeight="500" textAnchor="middle">NERVOUS SYSTEM</text>
                </g>

                {/* First split line */}
                <line x1="220" x2="220" y1="65" y2="90" strokeWidth="2" stroke="#2563eb" markerEnd="url(#arrow)" />
                <line x1="140" x2="300" y1="100" y2="100" strokeWidth="2" stroke="#2563eb" />

                {/* CNS Branch */}
                <g transform="translate(40, 120)">
                  <line x1="100" x2="100" y1="-20" y2="0" strokeWidth="2" stroke="#2563eb" markerEnd="url(#arrow)" />
                  <rect fill="#2563eb" x="30" y="0" rx="6" ry="6" width="140" height="40" />
                  <text x="100" y="25" fontFamily="Arial" fontSize="16" stroke="none" fill="white" fontWeight="500" textAnchor="middle">CNS</text>
                  <text x="100" y="55" fontFamily="Arial" fontSize="11" stroke="none" fill="black" textAnchor="middle">Brain & Spinal Cord</text>
                </g>

                {/* PNS Branch */}
                <g transform="translate(260, 120)">
                  <line x1="40" x2="40" y1="-20" y2="0" strokeWidth="2" stroke="#2563eb" markerEnd="url(#arrow)" />
                  <rect fill="#2563eb" x="0" y="0" rx="6" ry="6" width="140" height="40" />
                  <text x="70" y="25" fontFamily="Arial" fontSize="16" stroke="none" fill="white" fontWeight="500" textAnchor="middle">PNS</text>
                  <text x="120" y="55" fontFamily="Arial" fontSize="11" stroke="none" fill="black" textAnchor="middle">All other nerves</text>
                  
                  {/* PNS split */}
                  <line x1="70" x2="70" y1="40" y2="65" strokeWidth="2" stroke="#2563eb" markerEnd="url(#arrow)" />
                  <line x1="-40" x2="110" y1="75" y2="75" strokeWidth="2" stroke="#2563eb" />

                  {/* Somatic */}
                  <g transform="translate(-100, 95)">
                    <line x1="60" x2="60" y1="-20" y2="0" strokeWidth="2" stroke="#2563eb" markerEnd="url(#arrow)" />
                    <rect fill="#3b82f6" x="0" y="0" rx="5" ry="5" width="130" height="40" />
                    <text x="65" y="25" fontFamily="Arial" fontSize="14" stroke="none" fill="white" fontWeight="400" textAnchor="middle">Somatic</text>
                    <text x="65" y="55" fontFamily="Arial" fontSize="11" stroke="none" fill="black" textAnchor="middle">Voluntary</text>
                  </g>

                  {/* Autonomic */}
                  <g transform="translate(50, 95)">
                    <line x1="60" x2="60" y1="-20" y2="0" strokeWidth="2" stroke="#2563eb" markerEnd="url(#arrow)" />
                    <rect fill="#3b82f6" x="0" y="0" rx="5" ry="5" width="130" height="40" />
                    <text x="65" y="25" fontFamily="Arial" fontSize="14" stroke="none" fill="white" fontWeight="400" textAnchor="middle">Autonomic</text>
                    <text x="105" y="55" fontFamily="Arial" fontSize="11" stroke="none" fill="black" textAnchor="middle">Involuntary</text>
                    
                    {/* Autonomic split */}
                    <line x1="65" x2="65" y1="40" y2="65" strokeWidth="2" stroke="#2563eb" markerEnd="url(#arrow)" />
                    <line x1="-50" x2="105" y1="75" y2="75" strokeWidth="2" stroke="#2563eb" />

                    {/* Sympathetic */}
                    <g transform="translate(-100, 95)">
                      <line x1="50" x2="50" y1="-20" y2="0" strokeWidth="2" stroke="#2563eb" markerEnd="url(#arrow)" />
                      <rect fill="#60a5fa" x="0" y="0" rx="4" ry="4" width="120" height="35" />
                      <text x="60" y="23" fontFamily="Arial" fontSize="12" stroke="none" fill="white" fontWeight="400" textAnchor="middle">Sympathetic</text>
                      <text x="60" y="50" fontFamily="Arial" fontSize="11" stroke="none" fill="black" textAnchor="middle">Fight/Flight</text>
                    </g>

                    {/* Parasympathetic */}
                    <g transform="translate(55, 95)">
                      <line x1="50" x2="50" y1="-20" y2="0" strokeWidth="2" stroke="#2563eb" markerEnd="url(#arrow)" />
                      <rect fill="#60a5fa" x="0" y="0" rx="4" ry="4" width="120" height="35" />
                      <text x="60" y="23" fontFamily="Arial" fontSize="12" stroke="none" fill="white" fontWeight="400" textAnchor="middle">Parasympathetic</text>
                      <text x="60" y="50" fontFamily="Arial" fontSize="11" stroke="none" fill="black" textAnchor="middle">Rest/Digest</text>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column - Images and Quiz */}
        <div className="space-y-6">
          {/* First Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">CNS & PNS Overview</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/cns_pns.png"
                alt="CNS and PNS Overview"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '100%',
                  maxWidth: '550px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center">
              Basic structure showing the central and peripheral nervous systems.
            </p>
          </div>

          {/* Second Image */}
          <div className="bg-white dark:bg-slate-800 rounded-xl py-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400 text-center">Sympathetic vs Parasympathetic Control</h3>
            <div className="flex justify-center">
              <img 
                src="https://d9dcoet1djtzh.cloudfront.net/cns_pns_nerves_detailed.png"
                alt="Sympathetic and Parasympathetic Organ Control"
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  height: 'auto'
                }}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center px-6">
              Shows which organ actions are controlled by sympathetic vs parasympathetic nervous systems. Also notice the position in spinal cord where the nerves are located.
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
      slideId="nervous-system-divisions"
      slideTitle="Divisions of the Nervous System"
      moduleId="olympiad-8-bio-nervous-system"
      submoduleId="nervous-system"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}