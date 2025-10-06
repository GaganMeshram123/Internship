import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function VelocityTimeGraphsSlide3() {
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
      id: 'vtg-area-q1',
      question: 'The area between the line and the time-axis on a velocity-time graph represents the object\'s...',
      options: ['Acceleration', 'Total Time', 'Displacement', 'Average Speed'],
      correctAnswer: 'Displacement',
      explanation: 'Multiplying velocity (height) by time (width) gives displacement. This holds true for any shape under the graph.'
    },
    {
      id: 'vtg-area-q2',
      question: 'An object moves at a constant velocity of 8 m/s for 5 seconds. What is its displacement?',
      options: ['1.6 m', '13 m', '3 m', '40 m'],
      correctAnswer: '40 m',
      explanation: 'The area is a rectangle with height 8 m/s and width 5 s. Area (Displacement) = 8 m/s * 5 s = 40 m.'
    },
    {
      id: 'vtg-area-q3',
      question: 'A car starts from rest and accelerates to 10 m/s in 4 seconds (a triangle on the V-T graph). What is its displacement?',
      options: ['40 m', '14 m', '20 m', '2.5 m'],
      correctAnswer: '20 m',
      explanation: 'The area is a triangle with base 4s and height 10 m/s. Area = ½ * base * height = ½ * 4s * 10m/s = 20 m.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-purple-500">The Magic of the Area</h3>
            <p className="text-lg leading-relaxed mb-4">
              V-T graphs have another secret. While the slope gives us acceleration, the <strong>area under the line</strong> gives us something else: the object's displacement.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Constant Velocity (A Rectangle)</h3>
            <p className="text-lg leading-relaxed mb-4">
              If an object moves at a constant velocity `v` for a time `t`, the graph is a horizontal line. The area below it is a rectangle.
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Area = Height × Width = <BlockMath math="v \times t" /></li>
                <li>We know that for constant velocity: Displacement = <BlockMath math="v \times t" /></li>
            </ul>
          </div>
          
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Constant Acceleration (A Triangle)</h3>
            <p className="text-lg leading-relaxed">
              If an object starts from rest and accelerates, the area is a triangle. The area of a triangle is ½ × base × height. This also correctly calculates the displacement!
            </p>
             <div className="bg-purple-50 dark:bg-purple-900/30 p-4 mt-4 rounded-lg">
              <p className="text-xl font-bold text-center text-purple-800 dark:text-purple-200">
                The area under a V-T graph IS displacement!
              </p>
            </div>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Find the Area</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-purple-500' : questionsAnswered[index] ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Let\'s check the area formula.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">🏞️</div><div className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400">Area Understood!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="vtg-area"
      slideTitle="Area under a V-T Graph: Displacement"
      moduleId="motion"
      submoduleId="velocity-time-graphs"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}