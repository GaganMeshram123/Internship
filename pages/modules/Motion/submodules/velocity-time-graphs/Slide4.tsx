import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

export default function VelocityTimeGraphsSlide4() {
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
      id: 'vtg-analysis-q1',
      question: 'In the "Constant Velocity" section of the graph (2s to 5s), what is the object\'s acceleration?',
      options: ['Positive', 'Negative', 'Zero', 'Cannot be determined'],
      correctAnswer: 'Zero',
      explanation: 'This section is a horizontal line, which has a slope of zero. A zero slope on a V-T graph means zero acceleration.'
    },
    {
      id: 'vtg-analysis-q2',
      question: 'In the "Slowing Down" section (5s to 7s), the slope is negative. What is the object doing?',
      options: ['Speeding up backwards', 'Stopping instantly', 'Slowing down but still moving forward', 'Moving backwards at a constant speed'],
      correctAnswer: 'Slowing down but still moving forward',
      explanation: 'The velocity is positive (the line is above the axis), but it is decreasing. This means the object is decelerating but hasn\'t changed direction yet.'
    },
    {
      id: 'vtg-analysis-q3',
      question: 'How would you find the TOTAL displacement for the entire 7-second journey shown?',
      options: [
        'Find the highest point on the graph.',
        'Find the slope of the final section.',
        'Calculate the area of all three sections (triangle, rectangle, triangle) and add them together.',
        'Just read the final velocity value.'
      ],
      correctAnswer: 'Calculate the area of all three sections (triangle, rectangle, triangle) and add them together.',
      explanation: 'The total displacement is the total area under the graph. You must calculate the area for each segment of motion and sum them up.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-orange-500">Telling a Complex Story</h3>
            <p className="text-lg leading-relaxed mb-4">
              We can combine everything we've learned—reading the axes, slope, and area—to analyze a complex journey shown on a single V-T graph.
            </p>
            {/* Visual Representation */}
            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <svg viewBox="0 0 100 60" className="w-full">
                {/* Axes and Grid */}
                <path d="M 5 5 L 5 55 L 95 55" stroke={isDarkMode ? '#64748b' : '#94a3b8'} strokeWidth="0.5" fill="none"/>
                <text x="0" y="5" fill={isDarkMode ? '#e2e8f0' : '#334155'} fontSize="4" textAnchor="end">v</text>
                <text x="98" y="58" fill={isDarkMode ? '#e2e8f0' : '#334155'} fontSize="4">t</text>
                {/* Graph Line */}
                <path d="M 5 55 L 30 10 L 65 10 L 90 55" stroke="#f97316" strokeWidth="2" fill="none" />
                {/* Labels */}
                <text x="10" y="58" fill={isDarkMode ? '#e2e8f0' : '#334155'} fontSize="4">0</text>
                <text x="28" y="58" fill={isDarkMode ? '#e2e8f0' : '#334155'} fontSize="4">2s</text>
                <text x="63" y="58" fill={isDarkMode ? '#e2e8f0' : '#334155'} fontSize="4">5s</text>
                <text x="88" y="58" fill={isDarkMode ? '#e2e8f0' : '#334155'} fontSize="4">7s</text>
                <text x="10" y="40" fill="#22c55e" fontSize="4">Speeding Up</text>
                <text x="35" y="5" fill="#3b82f6" fontSize="4">Constant Velocity</text>
                <text x="68" y="40" fill="#ef4444" fontSize="4">Slowing Down</text>
              </svg>
            </div>
             <div className="mt-4 space-y-3 text-lg">
                <p><strong>0s - 2s:</strong> A positive slope means <strong>constant positive acceleration</strong> (speeding up).</p>
                <p><strong>2s - 5s:</strong> A zero slope means <strong>zero acceleration</strong> (constant velocity).</p>
                <p><strong>5s - 7s:</strong> A negative slope means <strong>constant negative acceleration</strong> (slowing down).</p>
             </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400">Analyze the Story</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-orange-500' : questionsAnswered[index] ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct Interpretation!' : 'Look closer at the graph.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">📜</div><div className="text-2xl font-bold mb-2 text-orange-600 dark:text-orange-400">Story Read!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="vtg-analysis"
      slideTitle="Analyzing Complex Motion with V-T Graphs"
      moduleId="motion"
      submoduleId="velocity-time-graphs"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}