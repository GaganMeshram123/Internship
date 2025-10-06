import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

export default function AccelerationSlide3() {
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
      id: 'accel-types-q1',
      question: 'A car is traveling forward and the driver hits the brakes. The car\'s acceleration is...',
      options: ['Positive', 'Negative', 'Zero', 'Circular'],
      correctAnswer: 'Negative',
      explanation: 'Slowing down while moving in the positive direction is called deceleration, which corresponds to a negative acceleration.'
    },
    {
      id: 'accel-types-q2',
      question: 'A cruise ship is moving at a steady 30 km/h in a perfectly straight line. What is its acceleration?',
      options: ['Positive', 'Negative', 'Zero', 'Cannot be determined'],
      correctAnswer: 'Zero',
      explanation: 'If the velocity is constant (same speed and same direction), there is no change in velocity, so the acceleration is zero.'
    },
    {
      id: 'accel-types-q3',
      question: 'You throw a ball straight up in the air. As it is rising to its highest point, what is the direction of its acceleration?',
      options: [
        'Upwards, in the direction of motion.',
        'Downwards, due to gravity.',
        'Zero, at the very top.',
        'Sideways, due to air.'
      ],
      correctAnswer: 'Downwards, due to gravity.',
      explanation: 'This is a classic trick question! Gravity is always pulling the ball down. This downward acceleration is what causes the ball to slow down as it rises.'
    }
  ];

  // handleQuizAnswer and handleNextQuestion logic
  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-orange-500">The Meaning of the Sign</h3>
            <p className="text-lg leading-relaxed mb-4">
              Since acceleration is a vector, its sign (+ or -) is very important. It tells us about the direction of the change in velocity.
            </p>
          </div>
          
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-green-500">Positive Acceleration</h3>
            <p className="text-lg leading-relaxed">
              This generally means the object is <strong>speeding up</strong> in the positive direction. The acceleration vector points in the same direction as the velocity vector.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-red-500">Negative Acceleration</h3>
            <p className="text-lg leading-relaxed">
              This generally means the object is <strong>slowing down</strong> (decelerating) while moving in the positive direction. The acceleration vector points in the opposite direction to the velocity vector.
            </p>
          </div>
          
           <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-500">Zero Acceleration</h3>
             <p className="text-lg leading-relaxed">
                This means the velocity is <strong>constant</strong>. The object is in "uniform motion."
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-semibold text-center text-lg">Important: Zero acceleration does NOT mean zero velocity! An object can be moving very fast with zero acceleration.</p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          {/* Quiz UI */}
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">What's the Sign?</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-orange-500' : questionsAnswered[index] ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'This is a tricky one!'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">🚦</div><div className="text-2xl font-bold mb-2 text-orange-600 dark:text-orange-400">Signs Understood!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="accel-types"
      slideTitle="Positive, Negative, and Zero Acceleration"
      moduleId="motion"
      submoduleId="acceleration"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}