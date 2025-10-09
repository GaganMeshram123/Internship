import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function AccelerationSlide2() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'accel-calc-q1',
      question: 'A sprinter starts from rest and reaches a final velocity of 10 m/s in 2 seconds. What is her acceleration?',
      options: ['20 m/s²', '5 m/s²', '8 m/s²', '0.2 m/s²'],
      correctAnswer: '5 m/s²',
      explanation: 'a = (v_final - v_initial) / t = (10 m/s - 0 m/s) / 2 s = 5 m/s².'
    },
    {
      id: 'accel-calc-q2',
      question: 'The unit m/s² means "meters per second, per second". What does this signify?',
      options: [
        'How many meters are traveled every second.',
        'How many seconds it takes to travel a meter.',
        'The change in distance every second.',
        'The change in velocity every second.'
      ],
      correctAnswer: 'The change in velocity every second.',
      explanation: 'An acceleration of 5 m/s² means that for every second that passes, the object\'s velocity increases by 5 m/s.'
    },
    {
      id: 'accel-calc-q3',
      question: 'A car is traveling at 25 m/s and brakes, coming to a stop (0 m/s) in 5 seconds. What is its acceleration?',
      options: ['+5 m/s²', '-5 m/s²', '+25 m/s²', '-25 m/s²'],
      correctAnswer: '-5 m/s²',
      explanation: 'a = (0 m/s - 25 m/s) / 5 s = -25 / 5 = -5 m/s². The negative sign indicates deceleration.'
    }
  ];

  const isQuizComplete = currentQuestionIndex >= questions.length;

  const handleQuizAnswer = (answer: string) => { 
    setSelectedAnswer(answer); 
    setShowFeedback(true); 
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };
  
  const handleNextQuestion = () => { 
    const newAnsweredState = [...questionsAnswered]; 
    newAnsweredState[currentQuestionIndex] = true; 
    setQuestionsAnswered(newAnsweredState); 
    setSelectedAnswer(''); 
    setShowFeedback(false); 
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto /* max-w-7xl */">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            {/* STYLE UPDATE: Main heading style applied */}
            <h3 className="text-2xl font-bold mb-4 text-blue-500">Calculating Acceleration</h3>
            <p className="text-lg leading-relaxed mb-4">
              To calculate acceleration, we use a formula that directly matches its definition: the change in velocity divided by the time it took for that change to happen.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            {/* STYLE UPDATE: Subheading style applied */}
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Formula</h3>
            {/* STYLE UPDATE: Info box color changed to blue */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <BlockMath math="\vec{a}_{\text{avg}} = \frac{\Delta \vec{v}}{\Delta t} = \frac{\vec{v}_{final} - \vec{v}_{initial}}{t}" />
            </div>
            <ul className="list-disc list-inside space-y-2 text-lg mt-4">
                <li><InlineMath math="\vec{a}" /> = average acceleration</li>
                <li><InlineMath math="\vec{v}_{final}" /> = final velocity</li>
                <li><InlineMath math="\vec{v}_{initial}" /> = initial velocity</li>
                <li><InlineMath math="t" /> = time taken</li>
            </ul>
          </div>
          
           <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            {/* STYLE UPDATE: Subheading style applied */}
            <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Units of Acceleration</h3>
             <p className="text-lg leading-relaxed mb-4">
                Since velocity is in meters per second (m/s) and time is in seconds (s), the unit for acceleration is (m/s) / s, which is written as <strong className="font-mono">m/s²</strong>.
            </p>
            <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-semibold text-center text-lg">Read as: "meters per second squared" or "meters per second, per second".</p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          {/* STYLE UPDATE: Subheading style applied */}
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Calculate It!</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div></div>
          {/* STYLE UPDATE: Step indicator logic changed */}
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (
            <motion.button 
              key={option} 
              onClick={() => handleQuizAnswer(option)} 
              disabled={showFeedback}
              // STYLE UPDATE: Logic for answer feedback colors changed
              className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${
                showFeedback && selectedAnswer === option
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
              } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
              whileHover={!showFeedback ? { scale: 1.02 } : {}} 
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
            >
              {option}
            </motion.button>
          ))}</div><AnimatePresence>{showFeedback && (
            // STYLE UPDATE: Feedback box uses blue color
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700`}>
              <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Perfect calculation!' : 'Let\'s re-check the formula.'}</div>
              <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
              <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
            </motion.div>
          )}</AnimatePresence></> ) : ( 
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-4xl mb-4">📈</div>
            {/* STYLE UPDATE: Heading color applied */}
            <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Formula Mastered!</div>
            <div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div>
          </motion.div> 
          )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="accel-calculation"
      slideTitle="Calculating Acceleration"
      moduleId="motion"
      submoduleId="acceleration"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}