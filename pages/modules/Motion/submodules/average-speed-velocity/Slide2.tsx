import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function AvgSpeedVelocitySlide2() {
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
      id: 'avg-speed-q1',
      question: 'A student runs a total distance of 400 meters in 80 seconds. What is their average speed?',
      options: ['32,000 m/s', '0.2 m/s', '5 m/s', '480 m/s'],
      correctAnswer: '5 m/s',
      explanation: 'Average Speed = Total Distance / Total Time. So, 400 meters / 80 seconds = 5 m/s.'
    },
    {
      id: 'avg-speed-q2',
      question: 'Average speed depends on the total ______ traveled.',
      options: ['displacement', 'distance', 'time', 'direction'],
      correctAnswer: 'distance',
      explanation: 'The formula for average speed specifically uses the total path length, which is the distance.'
    },
    {
      id: 'avg-speed-q3',
      question: 'A car travels for 2 hours at an average speed of 60 km/h. What total distance did it cover?',
      options: ['30 km', '62 km', '120 km', '60 km'],
      correctAnswer: '120 km',
      explanation: 'By rearranging the formula, Distance = Speed × Time. So, 60 km/h × 2 hours = 120 km.'
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
            <h3 className="text-2xl font-bold mb-4 text-green-500">Average Speed</h3>
            <p className="text-lg leading-relaxed mb-4">
              <strong>Average Speed</strong> is the most common way we talk about how fast something is moving. It doesn't care about direction, only the total ground covered.
            </p>
            <p className="text-lg leading-relaxed">
              It is a <strong>scalar quantity</strong>, just like distance.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">The Formula</h3>
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
              <BlockMath math="\text{Average Speed} = \frac{\text{Total Distance}}{\text{Total Time}}" />
            </div>
             <p className="text-lg leading-relaxed mt-4">
              The standard units for speed in science are <strong>meters per second (m/s)</strong>, but we also commonly use kilometers per hour (km/h) or miles per hour (mph).
            </p>
          </div>
          
           <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">Worked Example</h3>
             <p className="text-lg leading-relaxed mb-4">
                A family drives a total distance of 150 km. The trip takes them 3 hours.
            </p>
            <div className="mt-2 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-mono text-center"><BlockMath math="\text{Average Speed} = \frac{150 \text{ km}}{3 \text{ hours}} = 50 \text{ km/h}" /></p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          {/* Quiz UI */}
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-green-600 dark:text-green-400">Test Your Calculation</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-green-500' : questionsAnswered[index] ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option, index) => (<motion.button key={index} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Perfect!' : 'Check the formula...'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">🏎️</div><div className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">Calculations Correct!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="asv-average-speed"
      slideTitle="Calculating Average Speed"
      moduleId="motion"
      submoduleId="average-speed-velocity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}