import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

export default function AccelerationSlide1() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'accel-concept-q1',
      question: 'Which of the following is a necessary condition for an object to be accelerating?',
      options: [
        'It must be moving very fast.',
        'Its speed must be increasing.',
        'Its velocity must be changing.',
        'It must be moving in a straight line.'
      ],
      correctAnswer: 'Its velocity must be changing.',
      explanation: 'Acceleration is the rate of change of velocity. This can mean a change in speed, a change in direction, or both.'
    },
    {
      id: 'accel-concept-q2',
      question: 'A car is driving at a constant speed of 50 km/h around a circular track. Is the car accelerating?',
      options: [
        'Yes, because its direction is changing.',
        'No, because its speed is constant.',
        'Only if it is also getting louder.',
        'It is impossible to tell.'
      ],
      correctAnswer: 'Yes, because its direction is changing.',
      explanation: 'Velocity includes direction. Since the car\'s direction is constantly changing, its velocity is changing, and therefore it is accelerating.'
    },
    {
      id: 'accel-concept-q3',
      question: 'Acceleration is to velocity as velocity is to ______.',
      options: [
        'speed',
        'position',
        'time',
        'distance'
      ],
      correctAnswer: 'position',
      explanation: 'This analogy highlights the relationships. Velocity is the rate of change of position, and acceleration is the rate of change of velocity.'
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
            <h3 className="text-2xl font-bold mb-4 text-blue-500">What is Acceleration?</h3>
            <p className="text-lg leading-relaxed mb-4">
              In everyday language, "accelerating" just means "speeding up." In physics, the definition is much broader and more powerful.
            </p>
            <p className="text-lg leading-relaxed font-semibold">
              <strong>Acceleration</strong> is the rate at which an object's <strong>velocity</strong> changes over time.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The Three Ways to Accelerate</h3>
            <p className="text-lg leading-relaxed mb-4">
              Since velocity includes both speed and direction, an object is accelerating if it is:
            </p>
            <ul className="list-decimal list-inside space-y-3 text-lg">
                <li><strong>Speeding up</strong> (e.g., a car when the gas pedal is pressed).</li>
                <li><strong>Slowing down</strong> (e.g., a car when the brakes are applied).</li>
                <li><strong>Changing direction</strong> (e.g., a car turning a corner, even at constant speed).</li>
            </ul>
          </div>
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
             <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                <strong>Key Insight:</strong> Any change in velocity, whether in speed or in direction, is an acceleration. This means acceleration is a <strong>vector quantity</strong>!
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Check Your Concept</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div></div>
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p>
          
          {/* RENDER BUG FIX: Removed the outer loop and now only mapping the options of the CURRENT question */}
          <div className="space-y-3">
            {questions[currentQuestionIndex].options.map((option, optionIndex) => (
              <motion.button 
                key={optionIndex} 
                onClick={() => handleQuizAnswer(option)} 
                disabled={showFeedback}
                className={`w-full p-3 my-1 rounded-lg border-2 text-left transition-all text-base md:text-lg ${
                  showFeedback && selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                    : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'
                } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                whileHover={!showFeedback ? { scale: 1.02 } : {}} 
                whileTap={!showFeedback ? { scale: 0.98 } : {}}
              >
                {option}
              </motion.button>
            ))}
          </div>
          
          <AnimatePresence>{showFeedback && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700`}>
              <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'A common misconception!'}</div>
              <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
              <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
            </motion.div>
          )}</AnimatePresence></> ) : ( 
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-4xl mb-4">🚀</div>
            <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Concept Clear!</div>
            <div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div>
          </motion.div> 
          )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="accel-intro"
      slideTitle="What is Acceleration?"
      moduleId="motion"
      submoduleId="acceleration"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}