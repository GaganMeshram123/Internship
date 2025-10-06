import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

export default function UCMotionSlide1() {
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
      id: 'ucm-intro-q1',
      question: 'In the term "Uniform Circular Motion," what does the word "Uniform" refer to?',
      options: ['The object\'s direction is uniform.', 'The object\'s acceleration is uniform.', 'The object\'s speed is constant.', 'The circle\'s size is uniform.'],
      correctAnswer: 'The object\'s speed is constant.',
      explanation: '"Uniform" in this context specifically means that the object is not speeding up or slowing down; its speed remains the same throughout the motion.'
    },
    {
      id: 'ucm-intro-q2',
      question: 'Which of the following is the best example of uniform circular motion?',
      options: [
        'A car accelerating onto a highway.',
        'A ball dropped from a building.',
        'A planet in a near-perfect circular orbit around its star.',
        'A train slowing down as it arrives at a station.'
      ],
      correctAnswer: 'A planet in a near-perfect circular orbit around its star.',
      explanation: 'Planetary orbits are a classic example where an object (the planet) moves at a nearly constant speed in a circular path.'
    },
    {
      id: 'ucm-intro-q3',
      question: 'An object in UCM follows a path along the...',
      options: ['Diameter of a circle', 'Radius of a circle', 'A straight line', 'Circumference of a circle'],
      correctAnswer: 'Circumference of a circle',
      explanation: 'Circular motion, by definition, means the object is always at a fixed distance (the radius) from a central point, tracing the circle\'s edge.'
    }
  ];

  const handleQuizAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true); if (answer === questions[currentQuestionIndex].correctAnswer) setScore(prev => prev + 1); };
  const handleNextQuestion = () => { const newAnsweredState = [...questionsAnswered]; newAnsweredState[currentQuestionIndex] = true; setQuestionsAnswered(newAnsweredState); setSelectedAnswer(''); setShowFeedback(false); if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1); else setIsQuizComplete(true); };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-indigo-500">Motion in a New Dimension</h3>
            <p className="text-lg leading-relaxed mb-4">
              So far, we've mostly looked at motion in a straight line (linear motion). But what happens when an object moves in a circle, like a spinning ride or a satellite orbiting Earth?
            </p>
            <p className="text-lg leading-relaxed font-semibold">
              This is called <strong>Uniform Circular Motion (UCM)</strong>, and it has some very interesting and surprising properties.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Breaking Down the Name</h3>
            <ul className="list-disc list-inside space-y-3 text-lg">
                <li><strong>Circular:</strong> The path of the object is a perfect circle.</li>
                <li><strong>Motion:</strong> The object is moving.</li>
                <li><strong>Uniform:</strong> The object's <strong>speed</strong> is constant. It's not speeding up or slowing down.</li>
            </ul>
          </div>
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Examples Around Us</h3>
            <p className="text-lg leading-relaxed">
              You see UCM everywhere: the tip of a fan blade, a car on a Ferris wheel, or a spinning top.
            </p>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Check the Basics</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-indigo-500' : questionsAnswered[index] ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (<motion.button key={option} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>))}</div><AnimatePresence>{showFeedback && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}><div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Let\'s check the definition.'}</div><div className="text-base">{questions[currentQuestionIndex].explanation}</div><motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button></motion.div>)}</AnimatePresence></> ) : ( <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8"><div className="text-4xl mb-4">🎡</div><div className="text-2xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">Introduction Complete!</div><div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div></motion.div> )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="ucm-intro"
      slideTitle="Motion in a Circle: An Introduction"
      moduleId="motion"
      submoduleId="uniform-circular-motion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}