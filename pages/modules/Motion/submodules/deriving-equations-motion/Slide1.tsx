import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function DerivingEquationsSlide1() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  
  const questions = [
    {
      id: 'de-intro-q1',
      question: 'The three equations of motion are only valid for situations involving...',
      options: ['Any type of motion', 'Motion in a circle', 'Constant acceleration', 'Constant velocity'],
      correctAnswer: 'Constant acceleration',
      explanation: 'This is the most important condition. If acceleration is changing, these specific equations cannot be used.'
    },
    {
      id: 'de-intro-q2',
      question: 'In the standard kinematic equations, what does the variable "u" represent?',
      options: ['Final velocity', 'Usual velocity', 'Uniform acceleration', 'Initial velocity'],
      correctAnswer: 'Initial velocity',
      explanation: 'We use "u" for the starting or initial velocity and "v" for the final velocity.'
    },
    {
      id: 'de-intro-q3',
      question: 'Why are these equations so powerful for physicists and engineers?',
      options: [
        'They look impressive.',
        'They allow for precise prediction of motion without drawing a graph every time.',
        'They are easy to memorize.',
        'They work even when acceleration changes.'
      ],
      correctAnswer: 'They allow for precise prediction of motion without drawing a graph every time.',
      explanation: 'Equations provide a fast, accurate, and powerful mathematical tool for analyzing and predicting the motion of objects.'
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
            <h3 className="text-2xl font-bold mb-4 text-blue-500">Beyond the Graphs</h3>
            <p className="text-lg leading-relaxed mb-4">
              Graphs are fantastic for visualizing motion, but what if we want to calculate an exact final velocity or the precise distance traveled without drawing a graph every time?
            </p>
            <p className="text-lg leading-relaxed font-semibold">
              For this, we use the <strong>Equations of Motion</strong> (also called kinematic equations). These are the mathematical backbone of describing motion.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            {/* STYLE UPDATE: Subheading style applied */}
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The One Big Rule</h3>
            <p className="text-lg leading-relaxed mb-4">
              There is one critical condition for using these equations:
            </p>
             {/* STYLE UPDATE: Info box color changed to blue */}
             <div className="bg-blue-50 dark:bg-blue-900/30 p-4 mt-4 rounded-lg border-l-4 border-blue-400">
              <p className="text-lg font-bold text-center text-blue-800 dark:text-blue-200">
                The acceleration must be UNIFORM (CONSTANT).
              </p>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            {/* STYLE UPDATE: Subheading style applied */}
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">The 5 Key Variables</h3>
            <p className="text-lg leading-relaxed mb-4">
              These equations relate five key variables of motion:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg font-mono">
                <li><InlineMath math="s" /> = displacement</li>
                <li><InlineMath math="u" /> = initial velocity</li>
                <li><InlineMath math="v" /> = final velocity</li>
                <li><InlineMath math="a" /> = acceleration</li>
                <li><InlineMath math="t" /> = time</li>
            </ul>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
          {/* STYLE UPDATE: Subheading style applied */}
          <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Ready for the Math?</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div></div>
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
              <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'This is the key rule.'}</div>
              <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
              <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
            </motion.div>
          )}</AnimatePresence></> ) : ( 
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-4xl mb-4">📜</div>
            {/* STYLE UPDATE: Heading color applied */}
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
      slideId="de-intro"
      slideTitle="The Power of Prediction: Equations of Motion"
      moduleId="motion"
      submoduleId="deriving-equations-motion"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}