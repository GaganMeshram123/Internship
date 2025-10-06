import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideComponentWrapper from '../../../common-components/SlideComponentWrapper';
import { InteractionResponse } from '../../../common-components/concept';
import { useThemeContext } from '@/lib/ThemeContext';
import 'katex/dist/katex.min.css';

export default function DistanceDisplacementSlide2() {
  const { isDarkMode } = useThemeContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  
  const questions = [
    {
      id: 'distance-round-trip',
      question: 'A student walks 10 meters from their desk to the classroom door, and then walks 10 meters back to their desk. What is the total distance they traveled?',
      options: ['0 m', '10 m', '20 m', 'Cannot be determined'],
      correctAnswer: '20 m',
      explanation: 'Distance is the total path length. The student traveled 10m there and 10m back, so the total distance is 10m + 10m = 20m.'
    },
    {
      id: 'distance-scalar',
      question: 'Distance is a ______ quantity because it only describes "how much" (magnitude) and not the direction.',
      options: ['scalar', 'vector', 'base', 'complex'],
      correctAnswer: 'scalar',
      explanation: 'Scalar quantities, like distance and speed, have only a magnitude (a numerical value). Vector quantities also have a direction.'
    },
    {
      id: 'distance-odometer',
      question: 'A car\'s odometer reads 25,100 km at the start of a trip and 25,450 km at the end. What was the distance traveled?',
      options: ['0 km', '25,450 km', '350 km', '-350 km'],
      correctAnswer: '350 km',
      explanation: 'Distance is the total path covered, regardless of direction. The change in the odometer reading gives the distance: 25,450 km - 25,100 km = 350 km.'
    }
  ];

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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const slideContent = (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto max-w-7xl">
        <div className="space-y-6">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-2xl font-bold mb-4 text-green-500">What is Distance?</h3>
            <p className="text-lg leading-relaxed mb-4">
              <strong>Distance</strong> is the total length of the path an object travels. Think of it as how many steps you take on a journey, regardless of the direction you are going.
            </p>
            <p className="text-lg leading-relaxed">
              It's like the reading on a car's odometer—it only ever increases as you move.
            </p>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Distance is a Scalar</h3>
            <p className="text-lg leading-relaxed mb-4">
              Distance is a <strong>scalar quantity</strong>. This means it only has a <strong>magnitude</strong> (a size or numerical value) and no direction.
            </p>
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-400">
              <p className="text-lg font-medium text-green-800 dark:text-green-200">
                <strong>Example:</strong> Saying "I walked 5 kilometers" describes a distance. It doesn't say *where* you walked.
              </p>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
            <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Calculating Total Distance</h3>
             <p className="text-lg leading-relaxed">
                To find the total distance, you simply add up the lengths of all the individual parts of the journey.
            </p>
            <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <p className="font-mono text-center">Path: 4m East, then 3m North</p>
                <p className="font-mono text-center text-2xl mt-2">Total Distance = 4m + 3m = 7m</p>
            </div>
          </div>
        </div>

        {/* Right Column - Concept Check Quiz */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
           {/* Quiz UI is identical to Slide1's logic, adapted for these questions */}
           <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">Check Your Understanding</h3>
            <div className="text-lg text-slate-600 dark:text-slate-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
           <div className="flex space-x-2 mb-6">
            {questions.map((_, index) => (
              <div key={index} className={`h-2 flex-1 rounded ${index === currentQuestionIndex ? 'bg-green-500' : questionsAnswered[index] ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
            ))}
          </div>

          {!isQuizComplete ? (
            <>
              <p className="text-lg mb-6 min-h-[6rem]">{questions[currentQuestionIndex].question}</p>
              <div className="space-y-3">
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <motion.button key={index} onClick={() => handleQuizAnswer(option)} disabled={showFeedback} className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base md:text-lg ${selectedAnswer === option ? (showFeedback ? (option === questions[currentQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-red-500 bg-red-50 dark:bg-red-900/30') : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30') : 'border-slate-300 dark:border-slate-600 hover:border-blue-400'} ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`} whileHover={!showFeedback ? { scale: 1.02 } : {}} whileTap={!showFeedback ? { scale: 0.98 } : {}}>{option}</motion.button>
                ))}
              </div>
              <AnimatePresence>
                {showFeedback && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mt-4 p-4 rounded-lg ${selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'}`}>
                    <div className="font-bold text-lg mb-2">{selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 'Correct!' : 'Not Quite...'}</div>
                    <div className="text-base">{questions[currentQuestionIndex].explanation}</div>
                    <motion.button onClick={handleNextQuestion} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}</motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <div className="text-2xl font-bold mb-2 text-green-600 dark:text-green-400">Concept Mastered!</div>
              <div className="text-lg text-slate-600 dark:text-slate-400">You scored {score} out of {questions.length}</div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <SlideComponentWrapper slideId="dd-what-is-distance" slideTitle="Understanding Distance (A Scalar Quantity)" moduleId="motion" submoduleId="distance-displacement">
      {slideContent}
    </SlideComponentWrapper>
  );
}