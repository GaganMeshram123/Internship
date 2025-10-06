import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function AvgSpeedVelocitySlide4() {
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
      id: 'diff-q1',
      question: 'A race car completes one lap on a 2 km track in 1 minute. Which statement is correct?',
      options: [
        'Its average speed and average velocity are both non-zero.',
        'Its average speed is zero, but its average velocity is non-zero.',
        'Its average speed is non-zero, but its average velocity is zero.',
        'Its average speed and average velocity are both zero.'
      ],
      correctAnswer: 'Its average speed is non-zero, but its average velocity is zero.',
      explanation: 'It traveled a distance (2 km), so its speed is not zero. But since it ended where it started, its displacement is zero, making its average velocity zero.'
    },
    {
      id: 'diff-q2',
      question: 'Can an object have a constant speed but a changing velocity?',
      options: [
        'Yes, if it changes direction.',
        'No, if speed is constant, velocity must be constant.',
        'Yes, if it slows down.',
        'No, speed and velocity are the same thing.'
      ],
      correctAnswer: 'Yes, if it changes direction.',
      explanation: 'Velocity is speed AND direction. An object moving in a circle at a constant speed is always changing direction, so its velocity is always changing!'
    },
    {
      id: 'diff-q3',
      question: 'If you walk in a perfectly straight line for 100 meters, how does your average speed compare to the magnitude of your average velocity?',
      options: [
        'Speed is greater',
        'Velocity is greater',
        'They are equal',
        'It depends on the time'
      ],
      correctAnswer: 'They are equal',
      explanation: 'In the special case of moving in a straight line without changing direction, the distance traveled is equal to the magnitude of the displacement. Therefore, speed and velocity will have the same magnitude.'
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
            <h3 className="text-2xl font-bold mb-4 text-orange-500">The Critical Difference: A Round Trip</h3>
            <p className="text-lg leading-relaxed mb-4">
              The best way to see the difference between speed and velocity is to analyze a round trip.
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg border-l-4 border-orange-400">
                <h4 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-2">Scenario</h4>
                <p className="text-lg">You walk 50m to a mailbox and 50m back to your house. The total trip takes 100 seconds.</p>
            </div>
          </div>
          
           <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-2 text-green-500">Speed Calculation (Distance)</h3>
             <p className="text-lg leading-relaxed mb-4">Total Distance = 50m + 50m = 100m</p>
            <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <BlockMath math="\text{Average Speed} = \frac{100 \text{ m}}{100 \text{ s}} = 1 \text{ m/s}" />
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-2 text-purple-500">Velocity Calculation (Displacement)</h3>
             <p className="text-lg leading-relaxed mb-4">Total Displacement = (+50m) + (-50m) = 0m</p>
            <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <BlockMath math="\vec{v}_{\text{avg}} = \frac{0 \text{ m}}{100 \text{ s}} = 0 \text{ m/s}" />
            </div>
            <p className="text-lg mt-4 font-bold text-center">Your average speed was 1 m/s, but your average velocity was 0 m/s!</p>
          </div>
        </div>
        
        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          {/* Quiz UI */}
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">Scenario Puzzles</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-orange-500' : questionsAnswered[index] ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option, index) => (<motion.button key={index} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Excellent logic!' : 'Let\'s revisit the definitions...'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">💡</div><div className="text-2xl font-bold mb-2 text-orange-600 dark:text-orange-400">Difference Understood!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="asv-comparison"
      slideTitle="Key Differences: Speed vs. Velocity"
      moduleId="motion"
      submoduleId="average-speed-velocity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}