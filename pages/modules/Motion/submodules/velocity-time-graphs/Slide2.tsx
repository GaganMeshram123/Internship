import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function VelocityTimeGraphsSlide2() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  
  const questions = [
    {
      id: 'vtg-slope-q1',
      question: 'The slope of a velocity-time graph represents the object\'s...',
      options: ['Displacement', 'Acceleration', 'Position', 'Speed'],
      correctAnswer: 'Acceleration',
      explanation: 'Slope is rise/run, which for a V-T graph is (Change in Velocity) / (Change in Time). This is the definition of acceleration.'
    },
    {
      id: 'vtg-slope-q2',
      question: 'A V-T graph shows a straight line going from (0s, 5m/s) to (5s, 25m/s). What is the acceleration?',
      options: ['5 m/s²', '4 m/s²', '6 m/s²', '20 m/s²'],
      correctAnswer: '4 m/s²',
      explanation: 'Rise = 25m/s - 5m/s = 20m/s. Run = 5s - 0s = 5s. Slope (Acceleration) = 20m/s / 5s = 4 m/s².'
    },
    {
      id: 'vtg-slope-q3',
      question: 'A horizontal line on a V-T graph has a slope of zero. This means the object\'s acceleration is...',
      options: ['Constant and positive', 'Constant and negative', 'Increasing', 'Zero'],
      correctAnswer: 'Zero',
      explanation: 'A zero slope means zero acceleration. This corresponds to motion at a constant velocity.'
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto /* max-w-7xl */">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            {/* STYLE UPDATE: Main heading style applied */}
            <h3 className="text-2xl font-bold mb-4 text-blue-500">The Slope Reveals Acceleration</h3>
            <p className="text-lg leading-relaxed mb-4">
              Just like with P-T graphs, the slope of the line on a V-T graph tells us something crucial. Here, it reveals the object's acceleration.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            {/* STYLE UPDATE: Subheading style applied */}
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Slope = Rise / Run = Acceleration</h3>
            <p className="text-lg leading-relaxed mb-4">
              Let's break down the slope formula for a V-T graph:
            </p>
             <ul className="list-disc list-inside space-y-2 text-lg">
                <li>The "Rise" is the Change in <strong>Velocity</strong> (<BlockMath math="\Delta v" />).</li>
                <li>The "Run" is the Change in <strong>Time</strong> (<BlockMath math="\Delta t" />).</li>
            </ul>
            {/* STYLE UPDATE: Info box color changed to blue */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 mt-4 rounded-lg border-l-4 border-blue-400">
              <BlockMath math="\text{Slope} = \frac{\text{Rise}}{\text{Run}} = \frac{\Delta v}{\Delta t} = \text{Acceleration}" />
            </div>
             <p className="text-lg mt-4 font-bold text-center">The slope of a Velocity-Time graph IS acceleration!</p>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          {/* STYLE UPDATE: Subheading style applied */}
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Calculate the Slope</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div></div>
          {/* STYLE UPDATE: Step indicator logic changed */}
          <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
          {!isQuizComplete ? ( <> <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p><div className="space-y-3">{questions[currentQuestionIndex].options.map((option) => (
            <motion.button 
              key={option} 
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
              <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Perfect!' : 'Let\'s re-check the calculation.'}</div>
              <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
              <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
            </motion.div>
          )}</AnimatePresence></> ) : ( 
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-4xl mb-4">🏔️</div>
            {/* STYLE UPDATE: Heading color applied */}
            <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Slope Mastered!</div>
            <div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div>
          </motion.div> 
          )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="vtg-slope"
      slideTitle="Slope of a V-T Graph: Acceleration"
      moduleId="motion"
      submoduleId="velocity-time-graphs"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}