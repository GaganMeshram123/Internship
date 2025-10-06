import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

export default function DistanceDisplacementSlide4() {
  const { isDarkMode } = useThemeContext();
  const [localInteractions, setLocalInteractions] = useState<Record<string, InteractionResponse>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'compare-round-track',
      question: 'An athlete runs one full 400m lap around a track and stops at the starting line. What are their distance and displacement?',
      options: [
        'Distance = 0m, Displacement = 400m',
        'Distance = 400m, Displacement = 400m',
        'Distance = 400m, Displacement = 0m',
        'Distance = 0m, Displacement = 0m'
      ],
      correctAnswer: 'Distance = 400m, Displacement = 0m',
      explanation: 'The distance is the total path length (400m). The displacement is zero because they ended at the same point they started.'
    },
    {
      id: 'compare-equality',
      question: 'When is the distance an object travels EQUAL to the magnitude of its displacement?',
      options: [
        'Always',
        'Never',
        'Only when it travels in a circle',
        'Only when it travels in a straight line without changing direction'
      ],
      correctAnswer: 'Only when it travels in a straight line without changing direction',
      explanation: 'If you walk 10m in a straight line, your distance is 10m and your displacement is 10m in that direction. If you turn, the path length (distance) will become longer than the straight-line displacement.'
    },
    {
      id: 'compare-greater',
      question: 'Which statement is ALWAYS true about a moving object?',
      options: [
        'Distance is always greater than displacement.',
        'Displacement is always greater than distance.',
        'Distance can never be less than the magnitude of displacement.',
        'Distance and displacement are always equal.'
      ],
      correctAnswer: 'Distance can never be less than the magnitude of displacement.',
      explanation: 'Displacement is the shortest path between two points. The actual path taken (distance) can be equal to this (on a straight line) or longer, but it can never be shorter.'
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
             <h3 className="text-2xl font-bold mb-4 text-blue-500">Distance vs. Displacement</h3>
            <p className="text-lg leading-relaxed mb-4">
              Let's summarize the key differences. This is one of the most important fundamental concepts in physics!
            </p>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className={`p-2 border ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>Feature</th>
                  <th className={`p-2 border ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>Distance</th>
                  <th className={`p-2 border ${isDarkMode ? 'border-slate-600' : 'border-slate-300'}`}>Displacement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>Definition</td>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>Total path length</td>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>Change in position</td>
                </tr>
                <tr>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>Type</td>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>Scalar</td>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>Vector</td>
                </tr>
                 <tr>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>Path Dependent?</td>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>Yes</td>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>No</td>
                </tr>
                 <tr>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>Value</td>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>Always ≥ 0</td>
                  <td className={`p-2 border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>Can be +, -, or 0</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Key Scenarios</h3>
            {/* STYLE UPDATE: List item colors changed to neutral */}
            <ul className="list-disc list-inside space-y-2 text-lg">
                <li><strong>Distance &gt; Displacement:</strong> This happens on any path that isn't a straight line (e.g., a curved road, turning a corner).</li>
                <li><strong>Distance = Displacement:</strong> Only on a straight-line path with no change in direction.</li>
                <li><strong>Displacement = 0, but Distance &gt; 0:</strong> Any round trip that ends where it began.</li>
            </ul>
          </div>
        </div>

        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
           <div className="flex justify-between items-center mb-4"> <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Test Your Insight</h3><div className="text-lg text-slate-600 dark:text-slate-400">Question {isQuizComplete ? questions.length : currentQuestionIndex + 1} of {questions.length}</div></div>
           {/* STYLE UPDATE: Step indicator logic changed */}
           <div className="flex space-x-2 mb-6">{questions.map((_, index) => (<div key={index} className={`h-2 flex-1 rounded ${index < currentQuestionIndex ? 'bg-blue-500' : index === currentQuestionIndex ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}/>))}</div>
            {!isQuizComplete ? (
            <>
              <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p>
              <div className="space-y-3">{questions[currentQuestionIndex].options.map((option, index) => (
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
              ))}</div>
              <AnimatePresence>{showFeedback && (
                // STYLE UPDATE: Feedback box uses blue color
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700`}>
                  <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Perfect!' : 'Close...'}</div>
                  <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
                  <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
                </motion.div>
              )}</AnimatePresence>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="text-4xl mb-4">🧠</div>
              {/* STYLE UPDATE: Heading color applied */}
              <div className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">Comparison Complete!</div>
              <div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper 
      slideId="dd-comparison" 
      slideTitle="Comparing Distance and Displacement" 
      moduleId="motion" 
      submoduleId="distance-displacement"
      interactions={localInteractions}
    >
      {slideContent}
    </SlideComponentWrapper>
  );
}