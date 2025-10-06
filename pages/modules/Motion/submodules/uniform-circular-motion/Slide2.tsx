import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

export default function UCMotionSlide2() {
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
      id: 'ucm-velocity-q1',
      question: 'Which of the following is a key difference between speed and velocity?',
      options: ['Speed is measured in m/s, velocity is not.', 'Velocity includes direction, but speed does not.', 'Speed can be negative, but velocity cannot.', 'They are the same thing.'],
      correctAnswer: 'Velocity includes direction, but speed does not.',
      explanation: 'This is the crucial distinction. Speed is a scalar (magnitude only), while velocity is a vector (magnitude and direction).'
    },
    {
      id: 'ucm-velocity-q2',
      question: 'For an object in UCM, its speed is constant. Is its velocity also constant?',
      options: ['Yes, always.', 'Only if the circle is very large.', 'No, because its direction is always changing.', 'It depends on the mass.'],
      correctAnswer: 'No, because its direction is always changing.',
      explanation: 'Even if the speed value is unchanging, the direction of the velocity vector is constantly turning, so the velocity itself is changing.'
    },
    {
      id: 'ucm-velocity-q3',
      question: 'The velocity vector of an object in circular motion at any point is...',
      options: ['Directed towards the center of the circle.', 'Directed away from the center of the circle.', 'Tangent to the circle at that point.', 'Always pointing up.'],
      correctAnswer: 'Tangent to the circle at that point.',
      explanation: 'The instantaneous velocity is always in the direction the object would go if it were suddenly released—along a straight line tangent to the path.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-pink-500">The Core Concept of UCM</h3>
            <p className="text-lg leading-relaxed mb-4">
              Here is the most important—and sometimes tricky—idea about Uniform Circular Motion. It comes down to the difference between speed and velocity.
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg">
                <li><strong>Speed</strong> (scalar): Is <strong>CONSTANT</strong>.</li>
                <li><strong>Velocity</strong> (vector): Is <strong>CHANGING</strong>.</li>
            </ul>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-pink-600 dark:text-pink-400">Why is Velocity Changing?</h3>
            <p className="text-lg leading-relaxed mb-4">
              Remember, velocity has both magnitude (speed) and <strong>direction</strong>. In UCM, the magnitude doesn't change, but the direction of motion is changing at every single instant.
            </p>
            {/* Visual Representation */}
            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
              <svg viewBox="0 0 100 100" className="w-full">
                <defs><marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill={isDarkMode ? '#ec4899' : '#be185d'} /></marker></defs>
                <circle cx="50" cy="50" r="40" stroke={isDarkMode ? '#64748b' : '#94a3b8'} strokeWidth="1" fill="none" />
                <circle cx="50" cy="50" r="2" fill={isDarkMode ? '#e2e8f0' : '#334155'}/>
                {/* Velocity vectors */}
                <path d="M 50 10 L 70 10" stroke="#be185d" strokeWidth="1.5" markerEnd="url(#arrowhead2)"/>
                <path d="M 90 50 L 90 70" stroke="#be185d" strokeWidth="1.5" markerEnd="url(#arrowhead2)"/>
                <path d="M 50 90 L 30 90" stroke="#be185d" strokeWidth="1.5" markerEnd="url(#arrowhead2)"/>
                <path d="M 10 50 L 10 30" stroke="#be185d" strokeWidth="1.5" markerEnd="url(#arrowhead2)"/>
                <text x="72" y="12" fill={isDarkMode ? '#e2e8f0' : '#334155'} fontSize="5">v</text>
                <text x="92" y="72" fill={isDarkMode ? '#e2e8f0' : '#334155'} fontSize="5">v</text>
              </svg>
               <p className="text-center mt-2">The length of the 'v' arrow (speed) is the same, but its direction is always changing.</p>
            </div>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400">Speed vs. Velocity</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-pink-500' : questionsAnswered[index] ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Excellent!' : 'This is the key concept!'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">🤯</div><div className="text-2xl font-bold mb-2 text-pink-600 dark:text-pink-400">Core Concept Grasped!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="ucm-velocity"
      slideTitle="Constant Speed but Changing Velocity"
      moduleId="motion"
      submoduleId="uniform-circular-motion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}