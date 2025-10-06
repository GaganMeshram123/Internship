import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

export default function UCMotionSlide3() {
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
      id: 'ucm-accel-q1',
      question: 'An object in UCM is always accelerating. Why?',
      options: ['Because its speed is increasing.', 'Because it is getting heavier.', 'Because its velocity is changing.', 'It is not actually accelerating.'],
      correctAnswer: 'Because its velocity is changing.',
      explanation: 'Acceleration is defined as any change in velocity. Since the direction of velocity in UCM is always changing, it is always accelerating.'
    },
    {
      id: 'ucm-accel-q2',
      question: 'What is the direction of centripetal acceleration?',
      options: ['Tangent to the circle, in the direction of motion.', 'Away from the center of the circle.', 'Toward the center of the circle.', 'There is no direction.'],
      correctAnswer: 'Toward the center of the circle.',
      explanation: 'Centripetal means "center-seeking." The acceleration vector always points radially inward, pulling the object from a straight path into a circular one.'
    },
    {
      id: 'ucm-accel-q3',
      question: 'What is required to cause a centripetal acceleration?',
      options: ['A high speed', 'A centripetal force', 'A large mass', 'A perfect circle'],
      correctAnswer: 'A centripetal force',
      explanation: 'According to Newton\'s Second Law (F=ma), any acceleration must be caused by a net force. For UCM, this is called the centripetal force.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-teal-500">The Consequence of Changing Velocity</h3>
            <p className="text-lg leading-relaxed mb-4">
              Let's connect the dots from what we've learned so far:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-lg">
                <li>An object in UCM has a <strong>changing velocity</strong>.</li>
                <li>The definition of <strong>acceleration</strong> is a change in velocity.</li>
                <li className="font-bold">Therefore, an object in UCM is ALWAYS accelerating!</li>
            </ol>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-teal-600 dark:text-teal-400">Centripetal Acceleration (aₙ)</h3>
            <p className="text-lg leading-relaxed mb-4">
              This special, center-directed acceleration is called <strong>centripetal acceleration</strong>.
            </p>
            <div className="bg-teal-50 dark:bg-teal-900/30 p-4 rounded-lg border-l-4 border-teal-400">
              <p className="text-lg font-medium text-teal-800 dark:text-teal-200">
                It is always directed radially inward, <strong>toward the center of the circle</strong>. It's the acceleration that is responsible for constantly "pulling" the object and changing its direction.
              </p>
            </div>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400">Center-Seeking Change</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-teal-500' : questionsAnswered[index] ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'This follows from the definitions.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">🎯</div><div className="text-2xl font-bold mb-2 text-teal-600 dark:text-teal-400">Concept Understood!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="ucm-acceleration"
      slideTitle="Centripetal Acceleration: The Center-Seeking Change"
      moduleId="motion"
      submoduleId="uniform-circular-motion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}