import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

export default function PositionTimeGraphsSlide4() {
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
      id: 'ptg-curves-q1',
      question: 'If the line on a position-time graph is curved, what does this tell you about the object\'s motion?',
      options: ['It is stationary.', 'It is moving at a constant velocity.', 'It is accelerating.', 'The graph is incorrect.'],
      correctAnswer: 'It is accelerating.',
      explanation: 'A curved line means the slope is changing. Since the slope is velocity, a changing velocity is, by definition, acceleration.'
    },
    {
      id: 'ptg-curves-q2',
      question: 'A P-T graph for a car is a curve that starts flat and gets steeper. The car is...',
      options: ['Slowing down', 'Moving at a constant speed', 'Speeding up', 'Moving backwards'],
      correctAnswer: 'Speeding up',
      explanation: 'A steeper slope means a higher velocity. If the curve is getting steeper, the velocity is increasing, which means the car is speeding up (positive acceleration).'
    },
    {
      id: 'ptg-curves-q3',
      question: 'A P-T graph for a braking train is a curve that gets flatter until it becomes horizontal. The train is...',
      options: ['Speeding up', 'Slowing down to a stop', 'Maintaining its speed', 'Instantly stopping'],
      correctAnswer: 'Slowing down to a stop',
      explanation: 'A flatter slope means a lower velocity. If the curve gets flatter, velocity is decreasing (negative acceleration). A final horizontal line means the velocity has become zero.'
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
            <h3 className="text-2xl font-bold mb-4 text-orange-500">What About Curves?</h3>
            <p className="text-lg leading-relaxed mb-4">
              What if the line on the graph isn't straight? A <strong>curved line</strong> means the slope is continuously changing.
            </p>
             <div className="bg-orange-50 dark:bg-orange-900/30 p-4 mt-4 rounded-lg border-l-4 border-orange-400">
              <p className="text-lg font-medium text-orange-800 dark:text-orange-200">
                Changing Slope → Changing Velocity → <strong>ACCELERATION!</strong>
              </p>
            </div>
          </div>
          
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-2 text-green-500">Positive Acceleration (Speeding Up)</h3>
            <p className="text-lg leading-relaxed">A curve that gets <strong>steeper</strong> (like a smile) shows an increasing slope. This means the velocity is increasing. The object is speeding up.</p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-2 text-red-500">Negative Acceleration (Slowing Down)</h3>
            <p className="text-lg leading-relaxed">A curve that gets <strong>flatter</strong> (like a frown) shows a decreasing slope. This means the velocity is decreasing. The object is slowing down.</p>
          </div>
        </div>
        
        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          {/* Quiz UI */}
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">Read the Curve</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-orange-500' : questionsAnswered[index] ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Excellent!' : 'Let\'s trace the slope.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">🎢</div><div className="text-2xl font-bold mb-2 text-orange-600 dark:text-orange-400">You've Mastered the Curves!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="ptg-curves"
      slideTitle="Interpreting Curved Lines: Acceleration"
      moduleId="motion"
      submoduleId="position-time-graphs"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}