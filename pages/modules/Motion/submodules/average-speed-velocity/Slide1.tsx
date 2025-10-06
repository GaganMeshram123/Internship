import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

export default function AvgSpeedVelocitySlide1() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'rate-of-motion-q1',
      question: 'To describe how fast an object is moving, what two quantities do you absolutely need to measure?',
      options: [
        'The object\'s weight and size',
        'The distance it traveled and the time it took',
        'The direction it went and its starting position',
        'The object\'s color and the weather'
      ],
      correctAnswer: 'The distance it traveled and the time it took',
      explanation: 'Rate of motion (speed or velocity) is all about how distance or position changes over time. You need both measurements to calculate it.'
    },
    {
      id: 'rate-of-motion-q2',
      question: 'Two cars travel the exact same distance of 100 km. Car A takes 1 hour. Car B takes 2 hours. Which car was moving faster?',
      options: [
        'Car A',
        'Car B',
        'They were equally fast',
        'Cannot be determined'
      ],
      correctAnswer: 'Car A',
      explanation: 'The faster car is the one that covers the same distance in less time. Car A took only 1 hour, so it had a higher rate of motion.'
    },
    {
      id: 'rate-of-motion-q3',
      question: 'In physics, the "rate of motion" describes...',
      options: [
        'How heavy an object is.',
        'How far an object is from the start.',
        'How quickly an object\'s position changes.',
        'The path an object takes.'
      ],
      correctAnswer: 'How quickly an object\'s position changes.',
      explanation: 'This is the core concept. Rate of motion connects the change in position (distance/displacement) with the change in time.'
    }
  ];

  const isQuizComplete = currentQuestionIndex >= questions.length;

  const handleQuizAnswer = (answer: string) => { 
    setSelectedAnswer(answer); 
    setShowFeedback(true); 
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => { 
    const newAnsweredState = [...questionsAnswered]; 
    newAnsweredState[currentQuestionIndex] = true; 
    setQuestionsAnswered(newAnsweredState); 
    setSelectedAnswer(''); 
    setShowFeedback(false); 
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-blue-500">How Fast is "Fast"?</h3>
            <p className="text-lg leading-relaxed mb-4">
              We often say things are "fast" or "slow," but what does that really mean in physics? It describes an object's <strong>rate of motion</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              A "rate" always compares two different quantities. To describe motion, we compare how much an object's <strong>position changes</strong> to how much <strong>time passes</strong>.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Two Key Ingredients</h3>
            <p className="text-lg leading-relaxed mb-4">
              To measure any rate of motion, you always need two pieces of information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg">
                <li><strong>A change in position:</strong> How far did it go? (This relates to distance and displacement).</li>
                <li><strong>A change in time:</strong> How long did it take?</li>
            </ul>
             <div className="bg-blue-50 dark:bg-blue-900/30 p-4 mt-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Core Idea:</strong> Rate of Motion = (Change in Position) / (Change in Time)
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Check Your Intuition</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div></div>
          {/* STYLE UPDATE: Step indicator logic changed */}
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option, index) => (
            <motion.button 
              key={index} 
              onClick={() => handleQuizAnswer(option)} 
              disabled={showFeedback}
              // STYLE UPDATE: Logic for answer feedback colors changed
              className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${
                showFeedback && selectedAnswer === option
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
              } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
              whileHover={!showFeedback ? { scale: 1.02 } : {}} 
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
            >
              {option}
            </motion.button>
          ))}</div><AnimatePresence>{showFeedback && (
            // STYLE UPDATE: Feedback box uses blue color
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700`}>
              <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Let\'s think about that...'}</div>
              <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
              <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
            </motion.div>
          )}</AnimatePresence></> ) : ( 
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-4xl mb-4">💡</div>
            <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Foundation Set!</div>
            <div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div>
          </motion.div> 
          )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="asv-intro"
      slideTitle="Introducing Rate of Motion: How Fast?"
      moduleId="motion"
      submoduleId="average-speed-velocity"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}