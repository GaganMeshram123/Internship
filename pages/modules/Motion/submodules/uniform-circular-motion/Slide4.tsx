import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

export default function UCMotionSlide4() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  const questions = [
    {
      id: 'ucm-examples-q1',
      question: 'When you swing a ball on a string in a circle, what provides the centripetal force?',
      options: ['Gravity', 'Your hand\'s speed', 'The tension in the string', 'The air'],
      correctAnswer: 'The tension in the string',
      explanation: 'The string is constantly pulling the ball inward, forcing it to deviate from a straight path and move in a circle. This inward pull is the tension.'
    },
    {
      id: 'ucm-examples-q2',
      question: 'A car is able to make a turn on a flat road because of the...',
      options: ['Engine\'s power', 'Force of gravity', 'Friction between the tires and the road', 'The car\'s steering wheel'],
      correctAnswer: 'Friction between the tires and the road',
      explanation: 'Friction provides the necessary inward "grip" or centripetal force. On an icy, low-friction road, it\'s very difficult to turn.'
    },
    {
      id: 'ucm-examples-q3',
      question: 'If the string breaks while you are swinging a ball in a circle, the ball will...',
      options: [
        'Continue to move in a circle.',
        'Fly directly away from the center.',
        'Fly off in a straight line tangent to the circle.',
        'Drop straight to the ground.'
      ],
      correctAnswer: 'Fly off in a straight line tangent to the circle.',
      explanation: 'Without the centripetal force from the string, the ball will continue to move in the direction of its instantaneous velocity, which is tangent to the circle.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-orange-500">The Centripetal Force</h3>
            <p className="text-lg leading-relaxed mb-4">
              An acceleration must be caused by a force (thanks, Newton!). The force that causes centripetal acceleration is called the <strong>centripetal force</strong>.
            </p>
            <p className="text-lg leading-relaxed">It's not a new kind of force—it's just the name we give to whatever existing force is pointing towards the center of the circle.</p>
          </div>
          
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Example 1: Ball on a String</h3>
            <p className="text-lg leading-relaxed">The <strong className="text-blue-400">tension</strong> in the string pulls the ball inward, forcing it to move in a circle.</p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Example 2: Planet in Orbit</h3>
            <p className="text-lg leading-relaxed">The Sun's <strong className="text-yellow-400">gravity</strong> pulls the Earth inward, keeping it in orbit.</p>
          </div>
          
           <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Example 3: Car Turning</h3>
            <p className="text-lg leading-relaxed"><strong className="text-green-400">Friction</strong> between the tires and the road pushes the car towards the center of the turn.</p>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">Identify the Force</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-orange-500' : questionsAnswered[index] ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Think about what\'s pulling inward.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">🌍</div><div className="text-2xl font-bold mb-2 text-orange-600 dark:text-orange-400">Examples Mastered!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="ucm-examples"
      slideTitle="Real-World Examples of Circular Motion"
      moduleId="motion"
      submoduleId="uniform-circular-motion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}